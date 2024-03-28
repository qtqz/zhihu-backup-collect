import { saveAs } from "file-saver"
import { getParent } from "./core/utils"
import dealItem from "./dealItem"
import * as JSZip from "jszip"
import { domToPng } from "modern-screenshot"
import { getCommentSwitch } from "./core/utils"

/**
 * 修改版
 * 
 * 适配关注推送时间线，用户时间线
 * 按钮改为鼠标悬停才显示，绝对定位，减少侵入
 * 代码风格：大部分改为空格缩进、无分号
 * 
 * 优化逻辑与性能，减少多余操作：
 * 无限循环改为每3秒监听滚动
 * 点击按钮后才开始处理内容
 * 
 * 文件名添加作者名、时间
 * 保存为HTML/PNG
 * 适配复杂的想法：转发、带卡片链接、带@
 * 
 * 
 * 页：推送页，个人主页，回答页，问题页，文章页，想法页，收藏夹页
 */

/**
 * 下一步
 * 剪藏，显示与预期不一致问题：点赞栏、专栏
 * 添加ip属地
 * 
 * 路线图
 * 
 * 03-原版
 * 04-接手
 * 05-截图
 * 054-想法
 * 06-想法完全支持
 * 07-zip添加评论
 * 071-测试
 * 072-预发布
 * 073-修复文章截图
 * 
 * 10-完全测试所有场景+类型
 * -评论md解析
 * -md添加frontmatter
 * -快捷键
 * -按钮节流
 * 
 * 
 */

const main = async () => {

    console.log("Starting…")
    const RichTexts = Array.from(document.querySelectorAll(".RichText")) as HTMLElement[]
    for (let RichText of RichTexts) {
        try {
            let result: {
                markdown?: string[],
                zip?: JSZip,
                title: string,
            }
            //console.log(RichText)
            if (RichText.parentElement.classList.contains("Editable")) continue
            if (window.location.hostname.match(/zhuanlan/)) {
                if ((getParent(RichText, "Post-Main") as HTMLElement).querySelector(".zhihubackup-container")) continue
            }
            else {
                if (getParent(RichText, "PinItem")) {
                    if (!getParent(RichText, "RichContent-inner")) continue//每个带图想法有3个RichText，除掉图、假转发
                    //if (RichText.children[0].classList.contains("Image-Wrapper-Preview")) continue
                    if (getParent(RichText, "PinItem-content-originpin")) continue//被转发想法
                }
                if ((getParent(RichText, "RichContent") as HTMLElement).querySelector(".zhihubackup-container")) continue
                const richInner = getParent(RichText, "RichContent-inner")
                if (richInner && richInner.querySelector(".ContentItem-more")) continue//未展开
                if ((getParent(RichText, "RichContent") as HTMLElement).querySelector(".ContentItem-expandButton")) continue
            }

            const ButtonContainer = document.createElement("div")
            let p = getParent(RichText, "RichContent") || getParent(RichText, "Post-RichTextContainer") as HTMLElement
            ButtonContainer.classList.add("zhihubackup-wrap")
            p.prepend(ButtonContainer)

            //父级
            let parent_dom = getParent(RichText, "List-item") ||
                getParent(RichText, "Post-content") ||
                getParent(RichText, "PinItem") ||
                getParent(RichText, "CollectionDetailPageItem") ||
                getParent(RichText, "Card") as HTMLElement

            //按钮们
            ButtonContainer.innerHTML = `<div class="zhihubackup-container">
                <button class="to-md Button VoteButton">复制为Markdown</button>
                <button class="to-zip Button VoteButton">下载为ZIP</button>
                <button class="to-png Button VoteButton">剪藏为PNG</button>
                <button class="Button VoteButton">
                    <input class="to-remark" type="text" placeholder="添加备注" style="width: 90%;" maxlength="60">
                </button>
                <button class="Button VoteButton">
                    <label><input type="checkbox" checked> 保存<br>当前页评论</label>
                </button></div>`
            if (parent_dom.querySelector('.Catalog')) {
                (ButtonContainer.firstElementChild as HTMLElement).style.position = 'fixed';
                (ButtonContainer.firstElementChild as HTMLElement).style.top = 'unset';
                (ButtonContainer.firstElementChild as HTMLElement).style.bottom = '60px'
            }
            
            const ButtonMarkdown = parent_dom.querySelector(".to-md")
            ButtonMarkdown.addEventListener("click", throttle(async () => {
                try {
                    const res = await dealItem(RichText, 'copy')
                    result = {
                        markdown: res.markdown,
                        zip: res.zip,
                        title: res.title,
                    }
                    /*console.log(result.markdown.join("\n\n"))*/
                    navigator.clipboard.writeText(result.markdown.join("\n\n"))
                    ButtonMarkdown.innerHTML = "复制成功✅"
                    setTimeout(() => {
                        ButtonMarkdown.innerHTML = "复制为Markdown"
                    }, 3000)
                } catch (e) {
                    console.log(e)
                    ButtonMarkdown.innerHTML = "发生错误❌<br>请打开控制台查看"
                    setTimeout(() => {
                        ButtonMarkdown.innerHTML = "复制为Markdown"
                    }, 3000)
                }
            }))

            const ButtonZip = parent_dom.querySelector(".to-zip")
            ButtonZip.addEventListener("click", throttle(async () => {
                try {
                    const res = await dealItem(RichText, 'zip')
                    result = {
                        zip: res.zip,
                        title: res.title,
                    }
                    const blob = await result.zip.generateAsync({ type: "blob" })
                    saveAs(blob, result.title + ".zip")
                    ButtonZip.innerHTML = "下载成功✅<br>请看下载记录"
                    setTimeout(() => {
                        ButtonZip.innerHTML = "下载为Zip"
                    }, 5000)
                } catch (e) {
                    console.log(e)
                    ButtonZip.innerHTML = "发生错误❌<br>请打开控制台查看"
                    setTimeout(() => {
                        ButtonZip.innerHTML = "下载为Zip"
                    }, 5000)
                }
            }))

            const ButtonPNG = parent_dom.querySelector(".to-png")
            ButtonPNG.addEventListener("click", throttle(async () => {
                try {
                    const res = await dealItem(RichText, 'png')
                    result = {
                        title: res.title,
                    }

                    let clip = parent_dom
                    clip.classList.add("to-screenshot")
                    let saveCM = getCommentSwitch(RichText)
                    !saveCM ? clip.classList.add("no-cm") : 0
                    let svgDefs = document.querySelector("#MathJax_SVG_glyphs") as HTMLElement
                    svgDefs ? svgDefs.style.visibility = "visible" : 0

                    domToPng(clip, {
                        backgroundColor: "#fff"
                    }).then((dataUrl: any) => {
                        const link = document.createElement('a')
                        link.download = result.title + ".png"
                        link.href = dataUrl
                        link.click()
                        setTimeout(() => {
                            clip.classList.remove("to-screenshot")
                            !saveCM ? clip.classList.remove("no-cm") : 0
                            //svgDefs2.remove()
                            ButtonPNG.innerHTML = "剪藏为PNG"
                        }, 5000)
                    })
                    ButtonPNG.innerHTML = "请稍待片刻✅<br>查看下载记录"
                } catch (e) {
                    console.log(e)
                    ButtonPNG.innerHTML = "发生错误❌<br>请打开控制台查看"
                    setTimeout(() => {
                        ButtonPNG.innerHTML = "剪藏为PNG"
                    }, 5000)
                }
            }))

            /*
            const ButtonGetFileName = parent_dom.querySelector(".to-cfn")
            ButtonGetFileName.addEventListener("click", async () => {
                try {
                    const res = await NormalItem(RichText, true)
                    result = {
                        title: res.title,
                    }
                    navigator.clipboard.writeText(result.title)
                    ButtonGetFileName.innerHTML = "复制成功✅"
                    setTimeout(() => {
                        ButtonGetFileName.innerHTML = "复制文件名"
                    }, 5000)
                } catch (e) {
                    console.log(e)
                    ButtonGetFileName.innerHTML = "发生错误❌<br>请打开控制台查看"
                    setTimeout(() => {
                        ButtonGetFileName.innerHTML = "复制文件名"
                    }, 5000)
                }
            })

            */
        } catch (e) {
            console.log(e)
        }
    }
}

function throttle(fn: Function, delay?: number) {
    let flag = true
    delay ? 0 : delay = 1000
    return function () {
        if (flag) {
            flag = false
            setTimeout(() => {
                flag = true
            }, delay)
            return fn()
        }
    }
}

setTimeout(() => {
    let node = document.createElement("style")//!important
    node.appendChild(document.createTextNode(`
    .RichContent {
        position: relative;
    }
    .RichContent:hover .zhihubackup-wrap,
    .Post-RichTextContainer:hover .zhihubackup-wrap{
        opacity: 1;
        pointer-events: initial;
    }
    .zhihubackup-wrap {
        opacity: 0;
        pointer-events: none;
        transition: opacity 0.5s;
        position: absolute;
        left: -10em;
        top: -50px;
        height: 100%;
        user-select: none;
        width: 12em;
    }
    .zhihubackup-container {
        position: sticky;
        top: 120px;
        /*display: flex;
        flex-direction: column;
        justify-content: space-around;
        height: 22em;*/
        width: min-content;
        z-index: 2;
    }
    .zhihubackup-container button {
        width: 8em;
        margin-bottom: 8px;
        line-height: 32px!important;
    }
    .zhihubackup-container input{
        /*border: 1px solid #777;*/
        background-color: #0000;
        font-size: 14px;
        color: #1772f6;
        border: unset;
        text-align: center;
        outline: unset;        
    }
    .to-screenshot .ContentItem-actions {
        position: initial!important;
        box-shadow: unset!important;
        margin: 0 -20px -10px!important;
    }
    .to-screenshot.Post-content .RichContent-actions {
        position: initial!important;/*专栏*/
        box-shadow: unset!important;
    }
    .to-screenshot.Post-content {
        width: 780px;
        margin: 0 auto;
        min-width: unset!important;
    }
    .to-screenshot .Post-Main {
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    .to-screenshot.PinItem .RichText>.RichText:has(a[data-first-child]) {
        display: flex;/*想法-卡片链接*/
        flex-direction: column;
        align-items: center;
    }
    .to-screenshot .ContentItem-actions>.ContentItem-actions {
        margin-top: -10px!important;/*想法*/
    }
    .to-screenshot .css-m4psdq{
        opacity: 0;
    }
    .to-screenshot .AppHeader-profileAvatar{
        opacity: 0;
    }
    .to-screenshot.no-cm .Comments-container{
        display: none;
    }
    .to-screenshot noscript{
        display: none;
    }
    .to-screenshot .RichText-LinkCardContainer{
        display: flex;
        justify-content: center;
    }
    .to-screenshot .LinkCard.new{
        margin: 0!important;
    }
    .to-screenshot.PinItem{
        margin: 16px 0;/*想法增加留白*/
        padding: 0 16px;
        width: 690px;
    }
    .PinDetail:has(.to-screenshot){
        max-width: 706px!important;
    }
    .to-screenshot .Recommendations-Main{
        display: none;/*文章推荐阅读*/
    }
    .to-screenshot .css-kt4t4n{
        display: none;/*下方黏性评论栏*/
    }
    .to-screenshot .zhihubackup-container{
        /*display: none;*/
    }
    .RichContent:has(.ContentItem-more) .zhihubackup-wrap,
    .Post-RichTextContainer:has(.ContentItem-more) .zhihubackup-wrap{
        display:none;
    }
`))
    let heads = document.getElementsByTagName("head");
    if (heads.length > 0) {
        heads[0].appendChild(node)
    } else {
        document.documentElement.appendChild(node)
    }
}, 30)

setTimeout(main, 300)

let timer: any = null
window.addEventListener("scroll", () => {
    //debounce
    if (timer) {
        clearTimeout(timer)
    }
    timer = setTimeout(main, 2000)
})