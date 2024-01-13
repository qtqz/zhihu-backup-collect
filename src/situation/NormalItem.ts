import * as JSZip from "jszip"
import { lexer } from "../core/lexer"
import { LexType, TokenType, TokenFigure } from "../core/tokenTypes"
import { parser } from "../core/parser"
import { getParent, getAuthor, getTitle, getURL, getTime, getUpvote, getCommentNum, getRemark } from "../core/utils"
import savelex from "../core/savelex"

export default async (dom: HTMLElement, onlyTitle?: boolean): Promise<{
    markdown?: string[],
    zip?: JSZip,
    title: string,
}> => {
    console.log(dom)
    //确认场景
    let scene, type
    if (window.location.pathname == "/follow") scene = "follow"
    else if (window.location.pathname.slice(0, 7) == "/people") scene = "people"
    else if (window.location.pathname.slice(0, 9) == "/question" && !window.location.pathname.match(/answer/)) scene = "question"
    else if (window.location.pathname.slice(0, 9) == "/question" && window.location.pathname.match(/answer/)) scene = "answer"
    else if (window.location.pathname.slice(0, 4) == "/pin") scene = "pin"
    else if (window.location.hostname == "zhuanlan.zhihu.com") scene = "article"
    else if (window.location.pathname.slice(0, 11) == "/collection") scene = "collection"
    else console.log("未知场景")

    //ContentItem
    if (getParent(dom, "AnswerItem")) type = "answer"
    else if (getParent(dom, "ArticleItem")) type = "article"
    else if (getParent(dom, "PinItem")) type = "pin"
    else console.log("未知内容")

    if (!window.location.href.match(/https/)) {
        scene = "follow"
        if (window.location.pathname.match(/a/)) scene = "answer"
        if (window.location.pathname.match(/pin/)) scene = "pin"
        if (window.location.pathname.match(/peo/)) scene = "pin"
    }
    if (!scene || !type) return

    const title = getTitle(dom, scene, type),
        author = getAuthor(dom, scene, type),
        time = await getTime(dom),//?????????
        url = getURL(dom, scene, type),
        upvote_num = getUpvote(dom, scene, type),
        comment_num = getCommentNum(dom, scene, type)
    let remark = getRemark(dom)

    if (remark === "非法备注") {
        alert(decodeURIComponent("备注不可包含%20%20%2F%20%3A%20*%20%3F%20%22%20%3C%20%3E%20%7C"))
        return
    }
    remark ? remark = "_" + remark : 0

    if (onlyTitle) return {
        title: title + "_" + author.name + "_" + time.modified.slice(0, 10) + remark
    }

    const lex = lexer(dom.childNodes as NodeListOf<Element>, type)
    console.log("lex", lex)
    let markdown = parser(lex)

    if (type == "pin" && (getParent(dom, "PinItem") as HTMLElement).querySelector(".PinItem-content-originpin")) {
        //是转发的想法，对原想法解析，并附加到新想法下面
        const dom2 = (getParent(dom, "PinItem") as HTMLElement).querySelector(".PinItem-content-originpin .RichText")
        const lex2 = lexer(dom2.childNodes as NodeListOf<Element>, type)
        //markdown = markdown.concat(parser(lex2).map((l) => "> " + l))
        markdown.push(parser(lex2).map((l) => "> " + l).join("\n> \n"))
    }

    if (type == "pin") {
        // 获取图片
        const pinItem = getParent(dom, "PinItem") as HTMLElement
        if (pinItem.querySelector("img")) {
            const imgs = Array.from(pinItem.querySelectorAll(".Image-PreviewVague > img")) as HTMLImageElement[]
            imgs.forEach((img) => {
                lex.push({
                    type: TokenType.Figure,
                    src: img.getAttribute("data-original") || img.getAttribute("data-actualsrc"),
                } as TokenFigure)
            })
        }
    }

    const zopQuestion = (() => {
        let el = document.querySelector("[data-zop-question]")
        if (el) return JSON.parse(decodeURIComponent(el.getAttribute("data-zop-question")))
        return null
    })()

    const { zop, zaExtra } = (() => {
        let el = getParent(dom, "ContentItem")//想法类型、文章页没有
        if (!el) el = getParent(dom, "PinItem")
        if (!el) el = getParent(dom, "Post-content")

        if (el) return {
            zop: JSON.parse(decodeURIComponent(el.getAttribute("data-zop"))),
            zaExtra: JSON.parse(decodeURIComponent(el.getAttribute("data-za-extra-module")))
        }
        return null
    })()

    const zip = await savelex(lex)
    zip.file("info.json", JSON.stringify({
        title, url, author, time, upvote_num, comment_num,
        zop,
        "zop-question": zopQuestion,
        "zop-extra-module": zaExtra,
    }, null, 4))
    return {
        markdown,
        zip,
        title: title + "_" + author.name + "_" + time.modified.slice(0, 10) + remark
    }
}