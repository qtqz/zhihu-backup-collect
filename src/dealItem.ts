import * as JSZip from "jszip"
import { lexer } from "./core/lexer"
import { TokenType, TokenFigure } from "./core/tokenTypes"
import { parser } from "./core/parser"
import { getAuthor, getTitle, getURL, getTime, getUpvote, getCommentNum, getRemark, getCommentSwitch } from "./core/utils"
import savelex from "./core/savelex"
import { renderAllComments } from "./core/renderComments"

export default async (dom: HTMLElement, button?: string): Promise<{
    markdown?: string[],
    zip?: JSZip,
    textString?: string,
    title?: string,
}> => {
    //确认场景
    let scene, type
    if (window.location.pathname == "/follow") scene = "follow"
    else if (window.location.pathname.slice(0, 7) == "/people" || window.location.pathname.slice(0, 4) == "/org") scene = "people"
    else if (window.location.pathname.slice(0, 9) == "/question" && !window.location.pathname.includes('answer')) scene = "question"
    else if (window.location.pathname.slice(0, 9) == "/question" && window.location.pathname.includes('answer')) scene = "answer"
    else if (window.location.pathname.slice(0, 4) == "/pin") scene = "pin"
    else if (window.location.hostname == "zhuanlan.zhihu.com") scene = "article"
    else if (window.location.pathname.slice(0, 11) == "/collection") scene = "collection"
    else if (window.location.pathname.slice(0, 11) == "/search") scene = "collection"
    else if (window.location.href == "https://www.zhihu.com/") scene = "collection"//搜索、推荐、收藏夹似乎一样
    else console.log("未知场景")
    //https://www.zhihu.com/question/2377606804/answers/updated 按时间排序的问题
    if (window.location.pathname.slice(0, 9) == "/question" && !window.location.pathname.includes('updated')) scene = "question"
    //console.log(dom)
    //console.log(getParent(dom, "AnswerItem"), getParent(dom, "ArticleItem"), getParent(dom, "PinItem"))
    //ContentItem
    if (dom.closest('.AnswerItem')) type = "answer"
    else if (dom.closest('.ArticleItem')) type = "article"
    else if (dom.closest('.Post-content')) type = "article"
    else if (dom.closest('.PinItem')) type = "pin"
    else {
        console.log("未知内容")
        alert('请勿收起又展开内容，否则会保存失败。请重新保存。')
        document.querySelectorAll('.zhihubackup-wrap').forEach((w) => w.remove())
        // @ts-ignore
        setTimeout(window.zhbf, 100)
    }

    if (!scene || !type) return;

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
     * (author.badge ? ('\nauthor_badge: ' + author.badge) : '')
     */
    const getFrontmatter = (): string => {
        let fm = '---'
            + '\ntitle: ' + title
            + '\nurl: ' + url
            + '\nauthor: ' + author.name
            + '\nauthor_badge: ' + author.badge
            + '\ncreated: ' + time.created
            + '\nmodified: ' + time.modified
            + '\nupvote_num: ' + upvote_num
            + '\ncomment_num: ' + comment_num
            + '\n---\n'
        return fm
    }

    /**
     * 生成目录
     */
    const getTOC = (): string[] | null => {
        let toc = (dom.closest('.ContentItem') || dom.closest('.Post-content') as HTMLElement).querySelector(".Catalog-content")
        let items: string[] = []
        if (toc) {
            let i = 1, j = 1
            toc.childNodes.forEach((e) => {
                if ((e as HTMLElement).classList.contains('Catalog-FirstLevelTitle')) {
                    items.push(i++ + '. ' + e.textContent)
                    j = 1
                }
                else {
                    items.push('    ' + j++ + '. ' + e.textContent)
                }
            })
            return ['## 目录', items.join('\n')]
        }
        else return null
    }

    const lex = lexer(dom.childNodes as NodeListOf<Element>, type)
    //保存文章头图
    let headImg = document.querySelector('span>picture>img')
    if (scene == 'article' && headImg) {
        const src = headImg.getAttribute("src")
        if (src) lex.unshift({
            type: TokenType.Figure,
            src,
            local: false,
            dom: headImg
        } as TokenFigure)
    }

    //console.log("lex", lex)
    var markdown = []

    if (type == "pin" && (dom.closest('.PinItem') as HTMLElement).querySelector(".PinItem-content-originpin")) {
        //是转发的想法，对原想法解析，并附加到新想法下面
        const dom2 = (dom.closest('.PinItem') as HTMLElement).querySelector(".PinItem-content-originpin .RichText")
        const lex2 = lexer(dom2.childNodes as NodeListOf<Element>, type)
        //markdown = markdown.concat(parser(lex2).map((l) => "> " + l))
        markdown.push('\n\n' + parser(lex2).map((l) => "> " + l).join("\n> \n"))
    }
    if (type == "pin") {
        // 获取图片/标题
        const pinItem = dom.closest('.PinItem') as HTMLElement
        if (pinItem.querySelector(".ContentItem-title")) lex.unshift({
            type: TokenType.Text,
            content: [{
                type: TokenType.PlainText,
                text: pinItem.querySelector(".ContentItem-title").textContent
            }]
        })
        if (pinItem.querySelector(".Image-PreviewVague")) {
            const imgs = pinItem.querySelectorAll(".Image-PreviewVague > img")
            imgs.forEach((img) => {
                lex.push({
                    type: TokenType.Figure,
                    src: img.getAttribute("data-original") || img.getAttribute("data-actualsrc"),
                } as TokenFigure)
            })
        }
    }

    if (button == 'copy') {
        //放到剪贴板，string[]
        try {
            // @ts-ignore
            var copy_save_fm = GM_getValue("copy_save_fm")//false
        } catch (e) {
            console.warn(e)
        }
        let md = getTOC() ? getTOC().concat(parser(lex)) : parser(lex)
        if (type == "pin" && (dom.closest('.PinItem') as HTMLElement).querySelector(".PinItem-content-originpin")) {
            md = md.concat(markdown) //解决保存转发的想法异常
        }
        if (copy_save_fm) {
            md = [getFrontmatter()].concat(md)
        }
        if (type != 'pin' && !copy_save_fm) {
            return { markdown: [title].concat(md) }//复制内容增加标题
        } else
            return { markdown: md }
        // ============================以下只有 text 或 zip 2种情况===========================
    } else if (button == 'zip') {
        //对lex的再处理，保存资产，并将lex中链接改为本地
        var { zip, localLex } = await savelex(lex)
        if (type == "pin" && (dom.closest('.PinItem') as HTMLElement).querySelector(".PinItem-content-originpin")) {
            markdown = parser(localLex).concat(markdown)
        }
        else markdown = parser(localLex)
        zip.file("index.md", getFrontmatter() + (getTOC() ? getTOC().join("\n\n") + '\n\n' : '') + markdown.join("\n\n"))
    }

    //解析评论
    let commentText = '', commentsImgs: string[] = []
    try {
        if (getCommentSwitch(dom)) {
            let p = dom.closest('.ContentItem') || dom.closest('.Post-content') as HTMLElement
            let openComment = p.querySelector(".Comments-container")
            let itemId = type + url.split('/').pop()
            let tip = ''

            if (openComment && openComment.querySelector('.css-189h5o3')) {
                let t = '**' + openComment.querySelector('.css-189h5o3').textContent + '**' //评论区已关闭|暂无评论
                if (button == 'text') commentText = t
                else zip.file("comments.md", t)
            }
            else {
                if (openComment && openComment.querySelector('.css-1tdhe7b')) tip = '**评论内容由作者筛选后展示**\n\n'

                // @ts-ignore 
                let commentsData = window.ArticleComments[itemId]?.comments as Map<string, object>
                if (!commentsData) {
                    if (!openComment) return;//既没评论数据也没展开评论区
                    let s = confirm('您还未暂存任何评论，却展开了评论区，是否立即【暂存当前页评论并保存】？【否】则什么也不做\n（若不想存评，请收起评论区或取消勾选框）')
                    if (!s) return;
                    else {
                        (openComment.querySelector('.save') as HTMLElement).click()
                        setTimeout(() => {
                            (p.querySelector(`.zhihubackup-wrap .to-${button}`) as HTMLElement).click()
                        }, 1000)
                        return;
                    }
                }
                let num_text = tip + '共 ' + comment_num + ' 条评论，已存 ' + commentsData.size + ' 条' + '\n\n'
                if (button == 'text') {
                    [commentText, commentsImgs] = renderAllComments(commentsData, false)
                    commentText = num_text + commentText
                }
                else if (button == 'zip') {
                    [commentText, commentsImgs] = renderAllComments(commentsData, true)
                    commentText = num_text + commentText
                    zip.file("comments.md", commentText)
                    if (commentsImgs.length) {
                        const assetsFolder = zip.folder('assets')
                        for (let i = 0; i < commentsImgs.length; i++) {
                            const response = await fetch(commentsImgs[i])
                            const arrayBuffer = await response.arrayBuffer()
                            const fileName = commentsImgs[i].replace(/\?.*?$/, "").split("/").pop()
                            assetsFolder.file(fileName, arrayBuffer)
                        }
                    }
                }
            }
        }
    } catch (e) {
        console.log("评论:", e)
        alert('主要工作已完成，但是评论保存出错了')
    }

    if (button == 'text') {
        commentText ? commentText = '\n\n---\n\n## 评论\n\n' + commentText : 0
        let md2: string[] = []
        if (type == "pin" && (dom.closest('.PinItem') as HTMLElement).querySelector(".PinItem-content-originpin")) {
            md2 = markdown
        }
        return {
            textString: getFrontmatter() + (getTOC() ? getTOC().join("\n\n") + '\n\n' : '') + parser(lex).join("\n\n") + md2.join("\n\n") + commentText,
            title: title + "_" + author.name + "_" + time.modified.slice(0, 10) + remark
        }
    }

    const zopQuestion = (() => {
        try {
            let el = document.querySelector("[data-zop-question]")
            if (el) return JSON.parse(el.getAttribute("data-zop-question"))
            return null
        } catch (e) {
            console.error('data-zop-question', e)
            alert('保存data-zop-question出错')
        }
    })()

    const { zop, zaExtra, location } = (() => {
        let el = dom.closest('.ContentItem')//想法类型、文章页没有
        if (!el) el = dom.closest('.PinItem')
        if (!el) el = dom.closest('.Post-content')
        try {
            if (el) return {
                zop: JSON.parse(el.getAttribute("data-zop")),
                zaExtra: JSON.parse(el.getAttribute("data-za-extra-module")),
                location: el.querySelector('.ContentItem-time').childNodes[1]?.textContent.slice(6)
            }
        } catch (e) {
            console.error('zop, zaExtra ,location', e)
            alert('保存zop, zaExtra ,location出错')
        }
        return null
    })()

    zip.file("info.json", JSON.stringify({
        title, url, author, time, upvote_num, comment_num,
        zop, location,
        "zop-question": zopQuestion,
        "zop-extra-module": zaExtra,
    }, null, 4))

    return {
        zip,
        title: title + "_" + author.name + "_" + time.modified.slice(0, 10) + remark
    }
}