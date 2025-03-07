import * as JSZip from "jszip"
import { lexer } from "./core/lexer"
import { TokenType, TokenFigure } from "./core/tokenTypes"
import { parser } from "./core/parser"
import { getAuthor, getTitle, getURL, getTime, getUpvote, getCommentNum, getRemark, getCommentSwitch, getLocation } from "./core/utils"
import savelex from "./core/savelex"
import { renderAllComments } from "./core/renderComments"

interface DealItemResult {
    zip?: JSZip;
    textString?: string;
    title?: string;
}

function detectScene(): string {
    const pathname = location.pathname
    let scene
    if (pathname == "/follow") scene = "follow"
    else if (pathname.includes("/people") || pathname.includes("/org")) scene = "people"
    else if (pathname.includes("/question") && !pathname.includes('answer')) scene = "question"
    else if (pathname.includes("/question") && pathname.includes('answer')) scene = "answer"
    else if (pathname.includes("/pin")) scene = "pin"
    else if (location.hostname == "zhuanlan.zhihu.com") scene = "article"
    else if (pathname.includes("/collection")) scene = "collection"
    else if (pathname.includes("/search")) scene = "collection"
    else if (location.href == "https://www.zhihu.com/") scene = "collection"//搜索、推荐、收藏夹似乎一样
    else console.log("未知场景")
    //https://www.zhihu.com/question/2377606804/answers/updated 按时间排序的问题
    if (pathname.slice(0, 9) == "/question" && !pathname.includes('updated')) scene = "question"
    return scene
}

function detectType(dom: HTMLElement): string {
    //ContentItem
    let type
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
    return type
}

export default async (dom: HTMLElement, button?: string): Promise<DealItemResult> => {
    //console.log(dom)
    //确认场景
    let scene = detectScene()
    let type = detectType(dom)
    //console.log(scene + type)

    if (!scene || !type) return;
    /*     try {
            // @ts-ignore 仅供调试
            var gminfo = GM_info
            console.log(gminfo)
            script.name
        } catch (e) {
        } */

    const title = getTitle(dom, scene, type),
        author = getAuthor(dom, scene, type),
        time = await getTime(dom, scene),//?????????
        url = getURL(dom, scene, type),
        upvote_num = getUpvote(dom, scene, type),
        comment_num = getCommentNum(dom, scene, type),
        Location = getLocation(dom, scene, type)
    let remark = getRemark(dom)

    if (remark === "非法备注") {
        alert(decodeURIComponent("备注不可包含%20%20%2F%20%3A%20*%20%3F%20%22%20%3C%20%3E%20%7C"))
        return;
    }
    remark ? remark = "_" + remark : 0

    if (button == 'png') {
        const imgs = dom.querySelectorAll('figure img')
        let noload
        imgs.forEach((i: HTMLImageElement) => {
            if (i.src.match(/data\:image\/svg\+xml;.*><\/svg>/)) noload = 1
        })
        if (noload) {
            alert('内容中还有未加载的图片，请滚动到底，使图都加载后再保存\n若效果不好，可使用其他软件保存')
            return;
        }
        return {
            title: title + "_" + author.name + "_" + time.modified.slice(0, 10) + remark
        }
    }

    // 复制与下载纯文本时不保存图片，影响所有parser()，还有评论的图片，暂存到window
    var no_save_img = false
    try {
        // @ts-ignore
        no_save_img = GM_getValue("no_save_img")
        // @ts-ignore
        window.no_save_img = no_save_img

    } catch (e) {
        console.warn(e)
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
            + `${Location ? '\nlocation :' + Location : ''}`
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
    const TOC = ((): string[] | null => {
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
    })()

    const lex = lexer(dom.childNodes as NodeListOf<Element>, type)
    var md: string[] = [], originPinMD = []

    //console.log("lex", lex)
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

    //是转发的想法，对源想法解析，并准备附加到新想法下面
    if (type == "pin" && dom.closest('.PinItem').querySelector(".PinItem-content-originpin")) {
        const dom2 = dom.closest('.PinItem').querySelector(".PinItem-content-originpin .RichText")
        const lex2 = lexer(dom2.childNodes as NodeListOf<Element>, type)
        //markdown = markdown.concat(parser(lex2).map((l) => "> " + l))
        originPinMD.push('\n\n' + parser(lex2).map((l) => "> " + l).join("\n> \n"))
    }

    // 获取想法图片/标题
    if (type == "pin") {
        const pinItem = dom.closest('.PinItem')
        if (pinItem.querySelector(".ContentItem-title"))
            lex.unshift({
                type: TokenType.Text,
                content: [{
                    type: TokenType.PlainText,
                    text: '**' + pinItem.querySelector(".ContentItem-title").textContent + '**'
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


    //解析评论
    let commentText = '', commentsImgs: string[] = []
    const dealComments = async () => {
        try {
            if (getCommentSwitch(dom)) {
                let p = dom.closest('.ContentItem') || dom.closest('.Post-content')
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
                        if (!s) return 'return'
                        else {
                            (openComment.querySelector('.save') as HTMLElement).click()
                            setTimeout(() => {
                                (p.querySelector(`.zhihubackup-wrap .to-${button}`) as HTMLElement).click()
                            }, 1900)
                            return 'return'
                        }
                    }
                    let num_text = tip + '共 ' + comment_num + ' 条评论，已存 ' + commentsData.size + ' 条' + '\n\n'
                    if (button == 'text' || button == 'copy') {
                        // 准备添加第三种图片归宿，完全舍弃
                        [commentText, commentsImgs] = renderAllComments(commentsData, false)
                        commentText = num_text + commentText
                    }
                    else if (button == 'zip') {
                        [commentText, commentsImgs] = renderAllComments(commentsData, true)
                        commentText = num_text + commentText
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
            console.warn("评论:", e)
            alert('主要工作已完成，但是评论保存出错了')
        }
    }


    if (button == 'copy') {
        try {
            // @ts-ignore
            var copy_save_fm = GM_getValue("copy_save_fm"),
                // @ts-ignore
                copy_save_cm = GM_getValue("copy_save_cm")
        } catch (e) {
            console.warn(e)
        }
        md = TOC ? TOC.concat(parser(lex)) : parser(lex)
        if (type == "pin" && dom.closest('.PinItem').querySelector(".PinItem-content-originpin")) {
            md = md.concat(originPinMD) //解决保存转发的想法异常
        }
        if (copy_save_fm) {
            md = [getFrontmatter()].concat(md)//放到剪贴板，string[]
        }
        if (copy_save_cm) {
            if (await dealComments() == 'return') return;
            commentText ? commentText = '\n\n---\n\n## 评论\n\n' + commentText : 0
            md.push(commentText)
        }
        if (type != 'pin' && !copy_save_fm)
            return { textString: [title].concat(md).join('\n\n') }//复制内容增加标题
        else
            return { textString: md.join('\n\n') }
    }
    // ============================以下只有 text 或 zip 2种情况===========================

    if (button == 'text') {
        if (await dealComments() == 'return') return;
        commentText ? commentText = '\n\n---\n\n## 评论\n\n' + commentText : 0
        let md2: string[] = []
        if (type == "pin" && dom.closest('.PinItem').querySelector(".PinItem-content-originpin")) {
            md2 = originPinMD
        }
        return {
            textString: getFrontmatter() + (TOC ? TOC.join("\n\n") + '\n\n' : '') + parser(lex).join("\n\n") + md2.join("\n\n") + commentText,
            title: title + "_" + author.name + "_" + time.modified.slice(0, 10) + remark
        }
    }

    if (button == 'zip') {
        //对lex的再处理，保存资产，并将lex中链接改为本地
        var { zip, localLex } = await savelex(lex)
        if (await dealComments() == 'return') return;
        if (type == "pin" && dom.closest('.PinItem').querySelector(".PinItem-content-originpin")) {
            md = parser(localLex).concat(md)
        }
        else md = parser(localLex)

        try {
            // @ts-ignore
            var zip_merge_cm = GM_getValue("zip_merge_cm")
        } catch (e) {
            console.warn(e)
        }
        if (zip_merge_cm) {
            commentText ? commentText = '\n\n---\n\n## 评论\n\n' + commentText : 0
            md.push(commentText)
        }
        else
            zip.file("comments.md", commentText)

        zip.file("index.md", getFrontmatter() + (TOC ? TOC.join("\n\n") + '\n\n' : '') + md.join("\n\n"))
    }

    const zopQuestion = (() => {
        try {
            let el = document.querySelector("[data-zop-question]")
            if (el) return JSON.parse(el.getAttribute("data-zop-question"))
            return null
        } catch (e) {
            console.error('保存data-zop-question出错', e)
        }
    })()

    const { zop, zaExtra } = (() => {
        let el = dom.closest('.ContentItem')//想法类型、文章页没有
        if (!el) el = dom.closest('.PinItem')
        if (!el) el = dom.closest('.Post-content')
        try {
            if (el)
                return {
                    zop: JSON.parse(el.getAttribute("data-zop")),
                    zaExtra: JSON.parse(el.getAttribute("data-za-extra-module"))
                }
        } catch (e) {
            console.error('保存zop, zaExtra出错', e)
        }
        return null
    })()

    zip.file("info.json", JSON.stringify({
        title, url, author, time, upvote_num, comment_num,
        zop,
        "location": Location,
        "zop-question": zopQuestion,
        "zop-extra-module": zaExtra,
    }, null, 4))

    return {
        zip,
        title: title + "_" + author.name + "_" + time.modified.slice(0, 10) + remark
    }
}