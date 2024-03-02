import * as JSZip from "jszip"
import { lexer,lexerComment } from "./core/lexer"
import { LexType, TokenType, TokenFigure } from "./core/tokenTypes"
import { parser,parserComment } from "./core/parser"
import { getParent, getAuthor, getTitle, getURL, getTime, getUpvote, getCommentNum, getRemark, getCommentSwitch } from "./core/utils"
import savelex from "./core/savelex"

export default async (dom: HTMLElement, button?: string): Promise<{
    markdown?: string[],
    zip?: JSZip,
    title?: string,
}> => {
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
    //console.log(dom)
    //console.log(getParent(dom, "AnswerItem"), getParent(dom, "ArticleItem"), getParent(dom, "PinItem"))
    //ContentItem
    if (getParent(dom, "AnswerItem")) type = "answer"
    else if (getParent(dom, "ArticleItem")) type = "article"
    else if (getParent(dom, "Post-content")) type = "article"
    else if (getParent(dom, "PinItem")) type = "pin"
    else console.log("未知内容")

    if (!window.location.href.match(/https/)) {//仅供测试
        scene = "follow"
        scene = "article"
        if (window.location.pathname.match(/a/)) scene = "answer"
        if (window.location.pathname.match(/pin/)) scene = "pin"
        if (window.location.pathname.match(/peo/)) scene = "people"
    }
    if (!scene || !type) return

    const title = getTitle(dom, scene, type),
        author = getAuthor(dom, scene, type),
        time = await getTime(dom, scene),//?????????
        url = getURL(dom, scene, type),
        upvote_num = getUpvote(dom, scene, type),
        comment_num = getCommentNum(dom, scene, type)
    let remark = getRemark(dom)

    if (remark === "非法备注") {
        alert(decodeURIComponent("备注不可包含%20%20%2F%20%3A%20*%20%3F%20%22%20%3C%20%3E%20%7C"))
        return
    }
    remark ? remark = "_" + remark : 0

    if (button == 'png') return {
        title: title + "_" + author.name + "_" + time.modified.slice(0, 10) + remark
    }


    /**
     * 生成frontmatter
     * 标题，链接，作者名，赞数，评论数，创建时间，修改时间
     */
    const getFrontmatter = (): string => {
        let fm = '---'
            + '\ntitle: ' + title
            + '\nurl: ' + url
            + '\nauthor: ' + author.name
            + '\ncreated: ' + time.created
            + '\nmodified: ' + time.modified
            + '\nupvote_num: ' + upvote_num
            + '\ncomment_num: ' + comment_num
            + '\n---\n'
        return fm
    }

    const lex = lexer(dom.childNodes as NodeListOf<Element>, type)
    //console.log("lex", lex)
//alert(11)
    if (button == 'copy') {
        //放到剪贴板
        var markdown = parser(lex)
    }
    else {
        //对lex的再处理，保存资产，并将lex中链接改为本地
        var { zip, localLex } = await savelex(lex)
        markdown = parser(localLex)
    }

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

    if (button == 'copy') {
        let p=getParent(dom,'ContentItem')as HTMLElement
        let l=lexerComment(p.querySelector('.Comments-container').childNodes[0].childNodes[1].childNodes[1].childNodes[0].childNodes as NodeListOf<Element>)
        let m=parserComment(l)
        console.log(l,m.join(''))
        return {
            markdown
        }
    }

    zip.file("index.md", getFrontmatter() + markdown.join("\n\n"))

    //暂时：粗略解析评论
    let openComment = (getParent(dom, "ContentItem") || getParent(dom, "Post-content") as HTMLElement).querySelector(".Comments-container")
    if (getCommentSwitch(dom) && openComment) {
        let cm = document.createElement("div")
        cm.innerHTML = document.querySelector(".Comments-container").innerHTML
        try {
            cm.querySelector(".css-1fo89v5").remove()//发评论
            cm.querySelector(".css-kt4t4n").remove()//发评论
            cm.querySelector(".css-1j8bif6").remove()//默认最新
            cm.querySelector(".css-97fdvh").remove()//默认最新
            cm.querySelectorAll(".css-1ij6qqc").forEach((e) => e.remove())//回复
            cm.querySelectorAll(".css-1qe0v6x").forEach((e) => e.remove())//我关注的
        } catch (e) {
            console.log("a minor bug:", e)
        }
        cm.innerHTML = cm.innerHTML.replace(/></g, ">\n<").replace(/\n+/g, "\n")
        let cmt = cm.innerText.replace(/,|\u200B/g, "").replace(/\n+/g, "\n").replace(/\n · \n/g, " · ").replace(/\n · \n/g, " · ").replace(/\n(?<n>\d+)\n/g, ' $<n>\n\n')
        zip.file("comments.txt", cmt)
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
        try {
            if (el) return {
                zop: JSON.parse(el.getAttribute("data-zop")),
                zaExtra: JSON.parse(el.getAttribute("data-za-extra-module"))
            }
        } catch (e) {
            console.error(e)
        }
        return null
    })()

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