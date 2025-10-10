import { saveAs } from "file-saver"
import dealItem from "./dealItem"
import * as JSZip from "jszip"
import { domToPng } from "modern-screenshot"
import { getCommentSwitch } from "./core/utils"
import { mountParseComments } from "./core/parseComments"
import { selectObsidianVault, saveFile } from "./core/obsidianSaver";
import { showToast } from './core/toast';
/**
 * 修改版
 * 
 * 适配关注推送时间线，用户时间线
 * 按钮改为鼠标悬停才显示，绝对定位，减少侵入
 * 代码风格：大部分改为空格缩进、无分号
 * 
 * 优化逻辑与性能，减少多余操作：
 * 无限循环改为每1秒监听滚动
 * 点击按钮后才开始处理内容
 * 
 * 文件名添加作者名、时间
 * 保存为HTML/PNG
 * 适配复杂的想法：转发、带卡片链接、带@
 * 
 * 
 * 页：推送页，个人/机构主页，回答页，问题页，文章页，想法页，收藏夹页，搜索结果页
 */

/**
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
 * 更多见 readme
 * 
 * 
 */


// @grant        GM_setValue
// @grant        GM_getValue
// @grant    GM_registerMenuCommand
// @grant    GM_unregisterMenuCommand

/**
 * 油猴按钮
 */
function registerBtn() {
    try {
        // @ts-ignore
        let skipEmpty = GM_registerMenuCommand(
            "（推荐）解析时跳过空白段落",
            function () {
                // @ts-ignore
                let ac = GM_getValue("skip_empty_p"), c
                !ac ? c = confirm("解析时跳过空白段落，避免产生大量多余的换行，你是否继续？") : alert('已取消跳过空白段落')
                if (c) {
                    // @ts-ignore
                    GM_setValue("skip_empty_p", true)
                    // @ts-ignore
                } else GM_setValue("skip_empty_p", false)
            }
        )
        // @ts-ignore
        let menuFM = GM_registerMenuCommand(
            "复制内容时添加fm元信息",
            function () {
                // @ts-ignore
                let ac = GM_getValue("copy_save_fm"), c
                !ac ? c = confirm("复制内容时，添加 frontmatter 信息，就像下载为纯文本的时候一样。你是否继续？") : alert('已取消复制添加fm')
                // @ts-ignore
                c ? GM_setValue("copy_save_fm", true) : GM_setValue("copy_save_fm", false)
                //alert(GM_getValue("copy_save_fm"))
            }
        )
        // @ts-ignore
        let menuSaveCM = GM_registerMenuCommand(
            "复制内容时同时复制评论",
            function () {
                // @ts-ignore
                let ns = GM_getValue("copy_save_cm"), c
                !ns ? c = confirm("启用后，复制时也会复制评论，就像直接复制了下载的纯文本。你是否继续？") : alert('已取消复制评论')
                // @ts-ignore
                c ? GM_setValue("copy_save_cm", true) : GM_setValue("copy_save_cm", false)
                //alert(GM_getValue("copy_save_cm"))
            }
        )
        // @ts-ignore
        let menuMergeCM = GM_registerMenuCommand(
            "下载zip时合并正文与评论",
            function () {
                // @ts-ignore
                let ns = GM_getValue("zip_merge_cm"), c
                !ns ? c = confirm("启用后，下载zip时会合并正文与评论到一个文件中。你是否继续？") : alert('已取消合并')
                // @ts-ignore
                c ? GM_setValue("zip_merge_cm", true) : GM_setValue("zip_merge_cm", false)
                //alert(GM_getValue("zip_merge_cm"))
            }
        )
        // @ts-ignore
        let menuSaveImg = GM_registerMenuCommand(
            "复制与下载纯文本时不保存图片",
            function () {
                // @ts-ignore
                let ns = GM_getValue("no_save_img"), c
                !ns ? c = confirm("启用后，复制、存文本时将所有图片替换为“[图片]”，不影响存zip。你是否继续？") : alert('已取消不存图')
                // @ts-ignore
                c ? GM_setValue("no_save_img", true) : GM_setValue("no_save_img", false)
                //alert(GM_getValue("no_save_img"))
            }
        )
        // @ts-ignore
        let menuFilename = GM_registerMenuCommand(
            "自定义保存后的文件名格式",
            function () {
                // @ts-ignore
                let efm = GM_getValue("edit_Filename")
                let fm = prompt(`是否自定义保存后的文件名格式？留空或填错恢复默认\n默认为title + "_" + author.name + "_" + time.modified.slice(0, 10) + remark，你可以调整它的顺序，使用其他属性需要阅读源码\n(new Date).toLocaleDateString().replaceAll('/','-')添加保存日期`,
                    efm ? efm : ''
                )
                // @ts-ignore
                GM_setValue("edit_Filename", fm)
                //alert(GM_getValue("edit_Filename"))
            }
        )
    } catch (e) {
        console.warn(e)
    }
}
registerBtn()

const ButtonContainer = document.createElement("div")
ButtonContainer.classList.add("zhihubackup-wrap")
ButtonContainer.innerHTML = `<div class="zhihubackup-container">
    <button class="to-copy Button VoteButton">复制为Markdown</button>
    <button class="to-zip Button VoteButton">下载为 ZIP</button>
    <button class="to-text Button VoteButton">下载为纯文本</button>
    <button class="to-png Button VoteButton">剪藏为 PNG</button>
    <!--<button class="to-obsidian Button VoteButton">
    <svg style="width: 2em;height: 2em;" xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" d="M17.133 40.912c3.155-6.394 3.071-10.982 1.722-14.24c-1.229-3.014-3.527-4.913-5.333-6.095a2.3 2.3 0 0 1-.167.503L9.11 30.526c-.44.975-.237 2.12.512 2.885l6.784 6.98c.214.213.466.39.726.52Zm8.581-12.973c.847.083 1.675.27 2.494.567c2.587.968 4.942 3.146 6.887 7.343c.14-.242.279-.474.428-.698a114 114 0 0 0 3.415-5.388a1.3 1.3 0 0 0-.093-1.461a28.2 28.2 0 0 1-3.322-5.445c-.894-2.14-1.024-5.481-1.033-7.1c0-.615-.196-1.22-.577-1.704l-6.747-8.561l-.112-.14c.493 1.629.465 2.931.158 4.113c-.28 1.099-.8 2.094-1.35 3.146c-.185.354-.372.717-.548 1.089a13 13 0 0 0-1.47 5.398c-.094 2.252.362 5.072 1.86 8.84z" stroke-width="1"/><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" d="M25.704 27.939c-1.498-3.77-1.954-6.59-1.86-8.841c.092-2.234.744-3.91 1.47-5.398l.558-1.09c.54-1.05 1.052-2.047 1.34-3.145a7.3 7.3 0 0 0-.158-4.113a2.606 2.606 0 0 0-3.667-.186l-8.022 7.212c-.45.403-.746.949-.838 1.545L13.55 20.4c0 .065-.019.121-.028.186c1.806 1.173 4.095 3.072 5.333 6.078c.242.595.447 1.219.595 1.898a18.6 18.6 0 0 1 6.254-.633z" stroke-width="1"/><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" d="M29.91 43.406c1.732.475 3.472-.912 3.714-2.699c.198-1.695.7-3.34 1.48-4.858c-1.954-4.197-4.309-6.375-6.887-7.343c-2.745-1.023-5.733-.68-8.767.056c.68 3.08.28 7.11-2.308 12.35c.289.149.615.232.94.26l4.086.307c2.215.159 5.519 1.303 7.743 1.927Z" stroke-width="1"/></svg>
    <span>保存到指定文件夹</span></button>-->
    <button class="to-obsidian Button VoteButton">
    <svg style="width: 2em;height: 2em;width: 1.5em;height: 1.5em;opacity: 0.6;vertical-align: sub;" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M19.355 18.538a68.967 68.959 0 0 0 1.858-2.954a.81.81 0 0 0-.062-.9c-.516-.685-1.504-2.075-2.042-3.362c-.553-1.321-.636-3.375-.64-4.377a1.7 1.7 0 0 0-.358-1.05l-3.198-4.064a4 4 0 0 1-.076.543c-.106.503-.307 1.004-.536 1.5c-.134.29-.29.6-.446.914l-.31.626c-.516 1.068-.997 2.227-1.132 3.59c-.124 1.26.046 2.73.815 4.481q.192.016.386.044a6.36 6.36 0 0 1 3.326 1.505c.916.79 1.744 1.922 2.415 3.5zM8.199 22.569q.11.019.22.02c.78.024 2.095.092 3.16.29c.87.16 2.593.64 4.01 1.055c1.083.316 2.198-.548 2.355-1.664c.114-.814.33-1.735.725-2.58l-.01.005c-.67-1.87-1.522-3.078-2.416-3.849a5.3 5.3 0 0 0-2.778-1.257c-1.54-.216-2.952.19-3.84.45c.532 2.218.368 4.829-1.425 7.531zM5.533 9.938q-.035.15-.098.29L2.82 16.059a1.6 1.6 0 0 0 .313 1.772l4.116 4.24c2.103-3.101 1.796-6.02.836-8.3c-.728-1.73-1.832-3.081-2.55-3.831zM9.32 14.01c.615-.183 1.606-.465 2.745-.534c-.683-1.725-.848-3.233-.716-4.577c.154-1.552.7-2.847 1.235-3.95q.17-.35.328-.664c.149-.297.288-.577.419-.86c.217-.47.379-.885.46-1.27c.08-.38.08-.72-.014-1.043c-.095-.325-.297-.675-.68-1.06a1.6 1.6 0 0 0-1.475.36l-4.95 4.452a1.6 1.6 0 0 0-.513.952l-.427 2.83c.672.59 2.328 2.316 3.335 4.711q.136.317.253.653"></path></svg>
    保存到<br>指定文件夹</button>
    <button class="Button VoteButton">
        <textarea class="to-remark" type="text" placeholder="添加备注" style="width: 100%;" maxlength="60"></textarea>
    </button>
    <button class="Button VoteButton">
        <label><input type="checkbox" checked class="to-cm"> 保存评论</label>
    </button></div>`

const main = async () => {

    //console.log("Starting…")
    const RichTexts = Array.from(document.querySelectorAll(".RichText")) as HTMLElement[]
    for (let RichText of RichTexts) {
        try {
            let result: {
                zip?: JSZip,
                textString?: string,
                title: string,
            }
            //console.log(RichText)
            if (RichText.parentElement.classList.contains("Editable")) continue
            if (window.location.hostname.includes('zhuanlan')) {
                if (RichText.closest('.Post-Main').querySelector(".zhihubackup-container")) continue
            }
            else {
                if (RichText.closest('.PinItem')) {
                    if (!RichText.closest('.RichContent-inner')) continue//每个带图想法有3个RichText，除掉图、假转发
                    //if (RichText.children[0].classList.contains("Image-Wrapper-Preview")) continue
                    if (RichText.closest('.PinItem-content-originpin')) continue//被转发想法
                }
                if (RichText.closest('.RichContent').querySelector(".zhihubackup-container")) continue
                const richInner = RichText.closest('.RichContent-inner')
                if (richInner && richInner.querySelector(".ContentItem-more")) continue//未展开
                if (RichText.closest('.RichContent').querySelector(".ContentItem-expandButton")) continue
                //if (RichText.textContent.length == 0) continue
            }
            const aButtonContainer = ButtonContainer.cloneNode(true) as HTMLDivElement

            //父级
            let parent_dom = RichText.closest('.List-item') ||
                RichText.closest('.Post-content') ||
                RichText.closest('.PinItem') ||
                RichText.closest('.CollectionDetailPageItem') ||
                RichText.closest('.Card') as HTMLElement
            if (parent_dom.querySelector('.Catalog')) {
                (aButtonContainer.firstElementChild as HTMLElement).style.position = 'fixed';
                (aButtonContainer.firstElementChild as HTMLElement).style.top = 'unset';
                (aButtonContainer.firstElementChild as HTMLElement).style.bottom = '60px'
            }
            let p = RichText.closest('.RichContent') || RichText.closest('.Post-RichTextContainer') as HTMLElement
            p.prepend(aButtonContainer)

            const ButtonMarkdown = parent_dom.querySelector(".to-copy")
            ButtonMarkdown.addEventListener("click", throttle(async (event: Event) => {
                try {
                    const res = await dealItem(RichText, 'copy', event)
                    if (!res) return;// 取消保存
                    result = {
                        textString: res.textString,
                        title: res.title,
                    }
                    /*console.log(result.markdown.join("\n\n"))*/
                    navigator.clipboard.writeText(result.textString)
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
            ButtonZip.addEventListener("click", throttle(async (event: Event) => {
                try {
                    ButtonZip.innerHTML = "下载中……"
                    const res = await dealItem(RichText, 'zip', event)
                    if (!res)
                        return ButtonZip.innerHTML = "下载为 ZIP";// 取消保存
                    result = {
                        zip: res.zip,
                        title: res.title,
                    }
                    const blob = await result.zip.generateAsync({ type: "blob" })
                    saveAs(blob, result.title + ".zip")
                    ButtonZip.innerHTML = "下载成功✅<br>请看下载记录"
                    setTimeout(() => {
                        ButtonZip.innerHTML = "下载为 ZIP"
                    }, 5000)
                } catch (e) {
                    console.log(e)
                    ButtonZip.innerHTML = "发生错误❌<br>请打开控制台查看"
                    setTimeout(() => {
                        ButtonZip.innerHTML = "下载为 ZIP"
                    }, 5000)
                }
            },))

            const ButtonPNG = parent_dom.querySelector(".to-png")
            ButtonPNG.addEventListener("click", throttle(async (event: Event) => {
                try {
                    const res = await dealItem(RichText, 'png', event)
                    if (!res) return;// 取消保存
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
                        backgroundColor: "#fff",
                        filter(el) {
                            if ((el as HTMLElement).tagName == 'DIV' && (el as HTMLElement).classList.contains('zhihubackup-wrap')) return false
                            else return true
                        },
                    }).then((dataUrl: any) => {
                        const link = document.createElement('a')
                        link.download = result.title + ".png"
                        link.href = dataUrl
                        link.click()
                        setTimeout(() => {
                            clip.classList.remove("to-screenshot")
                            !saveCM ? clip.classList.remove("no-cm") : 0
                            //svgDefs2.remove()
                            ButtonPNG.innerHTML = "剪藏为 PNG"
                        }, 5000)
                    })
                    ButtonPNG.innerHTML = "请稍待片刻✅<br>查看下载记录"
                } catch (e) {
                    console.log(e)
                    ButtonPNG.innerHTML = "发生错误❌<br>请打开控制台查看"
                    setTimeout(() => {
                        ButtonPNG.innerHTML = "剪藏为 PNG"
                    }, 5000)
                }
            }))

            const ButtonText = parent_dom.querySelector(".to-text")
            ButtonText.addEventListener("click", throttle(async (event: Event) => {
                try {
                    const res = await dealItem(RichText, 'text', event)
                    if (!res) return;// 取消保存
                    result = {
                        textString: res.textString,
                        title: res.title,
                    }
                    const blob = new Blob([result.textString], { type: 'text/plain' })
                    saveAs(blob, result.title + ".md")
                    ButtonText.innerHTML = "下载成功✅<br>请看下载记录，以文本方式打开"
                    setTimeout(() => {
                        ButtonText.innerHTML = "下载为纯文本"
                    }, 5000)
                } catch (e) {
                    console.log(e)
                    ButtonText.innerHTML = "发生错误❌<br>请打开控制台查看"
                    setTimeout(() => {
                        ButtonText.innerHTML = "下载为纯文本"
                    }, 5000)
                }
            }))

            const ButtonObsidian = parent_dom.querySelector(".to-obsidian")
            ButtonObsidian.addEventListener("click", throttle(async (event: Event) => {
                try {
                    let saveType = await selectObsidianVault()
                    if (!saveType) return;// 取消保存

                    if (saveType == 'text') {
                        const res = await dealItem(RichText, 'text')
                        if (!res) return;// 取消保存
                        result = {
                            textString: res.textString,
                            title: res.title,
                        }
                        await saveFile(result, saveType as any)
                    }
                    else if (saveType.slice(0, 3) == 'zip') {
                        const res = await dealItem(RichText, 'zip')
                        if (!res) return;// 取消保存
                        result = {
                            zip: res.zip,
                            title: res.title,
                        }
                        await saveFile(result, saveType as any)
                    }
                    else if (saveType == 'png') {
                        const res = await dealItem(RichText, 'png')
                        if (!res) return;// 取消保存

                        let clip = parent_dom
                        clip.classList.add("to-screenshot")
                        let saveCM = getCommentSwitch(RichText)
                        !saveCM ? clip.classList.add("no-cm") : 0
                        let svgDefs = document.querySelector("#MathJax_SVG_glyphs") as HTMLElement
                        svgDefs ? svgDefs.style.visibility = "visible" : 0

                        domToPng(clip, {
                            backgroundColor: "#fff",
                            filter(el) {
                                if ((el as HTMLElement).tagName == 'DIV' && (el as HTMLElement).classList.contains('zhihubackup-wrap')) return false
                                else return true
                            },
                        }).then(async (dataUrl: any) => {
                            result = {
                                textString: dataUrl,
                                title: res.title,
                            }
                            clip.classList.remove("to-screenshot")
                            !saveCM ? clip.classList.remove("no-cm") : 0
                            await saveFile(result, saveType as any)
                        })
                    }
                } catch (e) {
                    console.log(e)
                    alert('发生错误❌请打开控制台查看')
                }
            }))

        } catch (e) {
            console.log(e)
        }
    }
}

function throttle(fn: Function, delay: number = 2000) {
    let flag = true
    return function (this: any, ...args: any[]) {  // 使用剩余参数接收所有参数
        if (flag) {
            flag = false
            setTimeout(() => {
                flag = true
            }, delay)
            return fn.apply(this, args);  // 通过 apply 传递参数和 this
        }
    }
}

setTimeout(() => {
    let node = document.createElement("style")//!important
    node.appendChild(document.createTextNode(`
    .RichContent {
        position: relative;
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
    .RichContent:hover .zhihubackup-wrap,
    .ContentItem:hover .zhihubackup-wrap,
    .Post-content:hover .zhihubackup-wrap,
    .zhihubackup-wrap:hover,
    .Post-RichTextContainer:hover .zhihubackup-wrap{
        opacity: 1;
        pointer-events: initial;
    }
    .zhihubackup-container {
        position: sticky;
        top: 120px;
        /*display: flex;
        flex-direction: column;
        justify-content: space-around;
        height: 22em;*/
        width: min-content;
        max-width: 8em;
        z-index: 2;
    }
    .zhihubackup-container button {
        width: 8em;
        margin-bottom: 8px;
        line-height: 24px !important;
        padding: 4px 10px!important;
    }
    .zhihubackup-container input,
    .zhihubackup-container textarea {
        /*border: 1px solid #777;*/
        background-color: #0000;
        font-size: 16px;
        color: #1772f6;
        border: unset;
        text-align: center;
        outline: unset;
        height: 100%;
        resize: none;
        overflow: hidden;
        line-height: 1.5em;
        vertical-align: middle;
    }
    button.Button.VoteButton:has(input:focus),
    button.Button.VoteButton:has(textarea:focus),
    button.Button.VoteButton:has(textarea:hover) {
        resize: both;
        overflow: hidden;
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
    .to-screenshot .FeedSource{
        margin-bottom: 14px !important;
    }
    .to-screenshot .Comments-container>div>div{
        margin-bottom: 10px !important;
    }
    .to-screenshot .Comments-container{
        margin: 0 !important;
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
    .comment-parser-container{
        opacity: 0;
        pointer-events: none;
        transition: opacity 0.5s;
    }
    .Comments-container:hover .comment-parser-container,
    .Modal-content:hover .comment-parser-container{
        opacity: 1;
        pointer-events: initial;
    }
    .Card:has(.zhihubackup-wrap){
        overflow: visible!important;
    }
    `))
    let head = document.querySelector("head")
    head.appendChild(node)

    if (window.innerWidth < 1275) {
        let node2 = document.createElement("style")
        node2.appendChild(document.createTextNode(`
        .zhihubackup-wrap {
            left: unset;
            right: -10em;
            z-index: 2;
        }
        .zhihubackup-container {
            float: right;
            background-color: rgb(244, 246, 249);
        }
        .RichContent {
            z-index: 2;
        }
        `))
        head.appendChild(node2)
    }
}, 30)

setTimeout(() => {
    main()
    mountParseComments()
    // @ts-ignore
    window.zhbf = main
    // 在window对象上创建存储空间
    // @ts-ignore
    window.ArticleComments = window.ArticleComments || {};
    document.querySelector('.Topstory-tabs')?.addEventListener('click', () => {
        setTimeout(registerBtn, 100);
    })
}, 300)

let timer: any = null
window.addEventListener("scroll", () => {
    //debounce
    if (timer) {
        clearTimeout(timer)
    }
    timer = setTimeout(main, 1000)
})
