import { lexer } from "./core/lexer"
import { parser } from "./core/parser"
import saveLex from "./core/savelex"
import { saveAs } from "file-saver"
import { getParent } from "./core/utils"
import NormalItem from "./situation/NormalItem"
import * as JSZip from "jszip"
import PinItem from "./situation/PinItem"
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
 * 保存为HTML/PDF/PNG
 * 
 * 
 * 
 * 页：推送页，个人主页，回答页，问题页，文章页，想法页，收藏夹页
 */

/**
 * 下一步
 * 添加保存备注
 * 适配收藏夹页
 * 尝试保存评论
 * 
 */

const main = async () => {

    console.log("Starting…")
    const RichTexts = Array.from(document.querySelectorAll(".RichText")) as HTMLElement[]
    for (let RichText of RichTexts) {

        try {
            //console.log(RichText)
            //console.log(RichText.children[0])
            if (RichText.parentElement.classList.contains("Editable")) continue
            //未展开的回答没有孩子
            if (!RichText.children[0] || RichText.children[0].classList.contains("zhihubackup-button")) continue
            //想法，未展开不显示
            if (RichText.children[0].classList.contains("Image-Wrapper-Preview")) continue
            if (getParent(RichText, "PinItem")) {
                const richInner = getParent(RichText, "RichContent-inner")
                if (richInner && richInner.querySelector(".ContentItem-more")) continue
            }

            const ButtonContainer = document.createElement("div");
            (getParent(RichText, "RichContent") as HTMLElement).prepend(ButtonContainer)
            ButtonContainer.classList.add("zhihubackup-container")

            let result: {
                markdown: string[],
                zip: JSZip,
                title: string,
            }
            //按钮们
            ButtonContainer.innerHTML = `
                <button class="to-md Button VoteButton">复制为Markdown</button>
                <button class="to-zip Button VoteButton">下载为Zip</button>
                <button class="to-pdf Button VoteButton">剪藏为PDF</button>
                <button class="to-png Button VoteButton">剪藏为PNG</button>
                <button class="Button VoteButton">
                    <input class="to-remark" type="text" placeholder="添加备注" style="
                    width: 90%;
                    background-color: #0000;
                    font-size: 14px;
                    color: #1772f6;
                    border: unset;
                    text-align: center;
                " maxlength="12"></button>
                <button class="Button VoteButton">
                    <input type="checkbox" checked id="to-cm" style="
                    border: 1px solid #777;
                    background-color: #0000;
                    font-size: 14px;
                    color: #1772f6;
                    border: unset;
                    text-align: center;
                    vertical-align: middle;
                "><label for="to-cm"> 保存<br>当前页评论</label></button>`
            
            const ButtonMarkdown = document.querySelector(".to-md")
            ButtonMarkdown.addEventListener("click", async () => {
                try {
                    const res = await NormalItem(RichText)
                    result = {
                        markdown: res.markdown,
                        zip: res.zip,
                        title: res.title,
                    }
                    navigator.clipboard.writeText(result.markdown.join("\n\n"))
                    ButtonMarkdown.innerHTML = "复制成功✅"
                    setTimeout(() => {
                        ButtonMarkdown.innerHTML = "复制为Markdown"
                    }, 3000)
                } catch {
                    ButtonMarkdown.innerHTML = "发生未知错误<br>请联系开发者"
                    //ButtonCopyMarkdown.style.height = "4em"
                    setTimeout(() => {
                        //ButtonCopyMarkdown.style.height = "2em"
                        ButtonMarkdown.innerHTML = "复制为Markdown"
                    }, 3000)
                }
            })

            const ButtonZip = document.querySelector(".to-zip")
            ButtonZip.addEventListener("click", async () => {
                try {
                    const res = await NormalItem(RichText)
                    result = {
                        markdown: res.markdown,
                        zip: res.zip,
                        title: res.title,
                    }
                    const blob = await result.zip.generateAsync({ type: "blob" })
                    saveAs(blob, result.title + ".zip")
                    ButtonZip.innerHTML = "下载成功✅"
                    setTimeout(() => {
                        ButtonZip.innerHTML = "下载全文为Zip"
                    }, 3000)
                } catch (e) {
                    console.log(e)
                    ButtonZip.innerHTML = "发生未知错误<br>请联系开发者"
                    //ButtonZip.style.height = "4em"
                    setTimeout(() => {
                        ButtonZip.innerHTML = "下载全文为Zip"
                        //ButtonZip.style.height = "2em"
                    }, 3000)
                }
            })

            /*
            
            */
        } catch (e) {
            console.log(e)
        }
    }
}

setTimeout(() => {
    let node = document.createElement("style")//!important
    node.appendChild(document.createTextNode(`
    .RichContent {
        position: relative;
    }
    .RichContent:hover .zhihubackup-container{
        opacity: 1;
        pointer-events: initial;
    }
    .zhihubackup-container {
        opacity: 0;
        transition: opacity 1s;
        pointer-events: none;
        position: absolute;
        left: -10em;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        height: 22em;
        width: 12em;
    }
    .zhihubackup-container button {
        width: 8em;
    }
    .zhihubackup-container input{
        width: 90%;
        border: 1px solid #777;
        background-color: #0000;
        font-size: 14px;
        color: #1772f6;
        border: unset;
        text-align: center;
        outline:unset;        
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
    timer = setTimeout(main, 3000)
})