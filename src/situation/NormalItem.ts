import * as JSZip from "jszip"
import { lexer } from "../core/lexer"
import { LexType } from "../core/tokenTypes"
import { parser } from "../core/parser"
import { MakeButton, getParent, getAuthor, getTitle, getURL, getTime, getUpvote, getCommentNum } from "../core/utils"
import savelex from "../core/savelex"
import { log } from "console"


export default async (dom: HTMLElement): Promise<{
    lex: LexType[],
    markdown: string[],
    zip: JSZip,
    title: string,
}> => {
    const lex = lexer(dom.childNodes as NodeListOf<Element>)
    const markdown = parser(lex)
    //确认场景
    let scene, type
    if (window.location.pathname == "/follow") scene = "follow"
    else if (window.location.pathname.slice(0, 7) == "/people") scene = "people"
    else if (window.location.pathname.slice(0, 9) == "/question" && !window.location.pathname.match(/answer/)) scene = "question"
    else if (window.location.pathname.slice(0, 9) == "/question" && window.location.pathname.match(/answer/)) scene = "answer"
    else if (window.location.pathname.slice(0, 4) == "/pin") scene = "pin"
    else if (window.location.hostname == "zhuanlan.zhihu.com") scene = "article"
    else console.log("未知场景")

    //ContentItem
    if (getParent(dom, "AnswerItem")) type = "answer"
    else if (getParent(dom, "ArticleItem")) type = "article"
    else if (getParent(dom, "PinItem")) type = "pin"
    else console.log("未知内容")

    scene = "follow"
    if (!scene || !type) return

    const title = getTitle(dom, scene, type),
        author = getAuthor(dom, scene, type),
        time = await getTime(dom),
        upvote = getUpvote(dom, scene, type),
        url = getURL(dom, scene, type),
        comment_num = getCommentNum(dom, scene, type)

    const zopQuestion = (() => {
        const element = document.querySelector("[data-zop-question]")
        try {
            if (element instanceof HTMLElement)
                return JSON.parse(decodeURIComponent(element.getAttribute("data-zop-question")))
        } catch { }
        return null
    })()

    const zop = (() => {
        let element = getParent(dom, "AnswerItem")
        if (!element) element = getParent(dom, "Post-content")
        try {
            if (element instanceof HTMLElement)
                return JSON.parse(decodeURIComponent(element.getAttribute("data-zop")))
        } catch { }
        return null
    })()

    const zaExtra = (() => {
        const element = getParent(dom, "ContentItem")//含信息节点，想法没有
        try {
            if (element instanceof HTMLElement)
                return JSON.parse(decodeURIComponent(element.getAttribute("data-za-extra-module")))
        } catch { }
        return null
    })()

    const zip = await savelex(lex)
    zip.file("info.json", JSON.stringify({
        title, url, author, time, upvote, comment_num,
        zop,
        "zop-question": zopQuestion,
        "zop-extra-module": zaExtra,
    }, null, 4))
    return { lex, markdown, zip, title: title + "_" + author.name + "_" + time.edited.slice(0, 10) }
}