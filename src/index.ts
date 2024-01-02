import { lexer } from "./core/lexer"
import { parser } from "./core/parser"
import saveLex from "./core/savelex"
import { saveAs } from "file-saver"
import { MakeButton, getParent } from "./core/utils"
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
            if (!RichText.children[0] || RichText.children[0].classList.contains("zhihucopier-button")) continue
            //想法，未展开不显示
            if (RichText.children[0].classList.contains("Image-Wrapper-Preview")) continue
            if (getParent(RichText, "PinItem")) {
                const richInner = getParent(RichText, "RichContent-inner")
                if (richInner && richInner.querySelector(".ContentItem-more")) continue
            }

            const ButtonContainer = document.createElement("div")
            RichText.prepend(ButtonContainer)
            ButtonContainer.classList.add("zhihucopier-button")

            let result: {
                markdown: string[],
                zip: JSZip,
                title: string,
            }

            const ButtonZipDownload = MakeButton()
            ButtonZipDownload.innerHTML = "下载全文为Zip"
            ButtonZipDownload.style.borderRadius = "0 1em 1em 0"
            ButtonZipDownload.style.width = "100px"
            ButtonZipDownload.style.paddingRight = ".4em"
            ButtonContainer.prepend(ButtonZipDownload)

            ButtonZipDownload.addEventListener("click", async () => {
                try {
                    if (getParent(RichText, "PinItem")) {
                        console.log("想法", RichText)
                        const res = await PinItem(RichText)
                        result = {
                            markdown: res.markdown,
                            zip: res.zip,
                            title: res.title,
                        }
                    } else {
                        console.log("非想法", RichText)
                        const res = await NormalItem(RichText)
                        result = {
                            markdown: res.markdown,
                            zip: res.zip,
                            title: res.title,
                        }
                    }

                    const blob = await result.zip.generateAsync({ type: "blob" })
                    saveAs(blob, result.title + ".zip")

                    ButtonZipDownload.innerHTML = "下载成功✅"
                    setTimeout(() => {
                        ButtonZipDownload.innerHTML = "下载全文为Zip"
                    }, 3000)
                } catch (e) {
                    console.log(e)
                    ButtonZipDownload.innerHTML = "发生未知错误<br>请联系开发者"
                    ButtonZipDownload.style.height = "4em"
                    setTimeout(() => {
                        ButtonZipDownload.style.height = "2em"
                        ButtonZipDownload.innerHTML = "下载全文为Zip"
                    }, 3000)
                }
            })

            const ButtonCopyMarkdown = MakeButton()
            ButtonCopyMarkdown.innerHTML = "复制为Markdown"
            ButtonCopyMarkdown.style.borderRadius = "1em 0 0 1em"
            ButtonCopyMarkdown.style.paddingLeft = ".4em"
            ButtonContainer.prepend(ButtonCopyMarkdown)

            ButtonCopyMarkdown.addEventListener("click", async () => {
                try {
                    if (getParent(RichText, "PinItem")) {
                        console.log("想法", RichText)
                        const res = await PinItem(RichText)
                        result = {
                            markdown: res.markdown,
                            zip: res.zip,
                            title: res.title,
                        }
                    } else {
                        console.log("回答", RichText)
                        const res = await NormalItem(RichText)
                        result = {
                            markdown: res.markdown,
                            zip: res.zip,
                            title: res.title,
                        }
                    }

                    navigator.clipboard.writeText(result.markdown.join("\n\n"))
                    ButtonCopyMarkdown.innerHTML = "复制成功✅"
                    setTimeout(() => {
                        ButtonCopyMarkdown.innerHTML = "复制为Markdown"
                    }, 3000)
                } catch {
                    ButtonCopyMarkdown.innerHTML = "发生未知错误<br>请联系开发者"
                    ButtonCopyMarkdown.style.height = "4em"
                    setTimeout(() => {
                        ButtonCopyMarkdown.style.height = "2em"
                        ButtonCopyMarkdown.innerHTML = "复制为Markdown"
                    }, 3000)
                }
            })

        } catch (e) {
            console.log(e)
        }
    }
}

setTimeout(main, 300)

let timer: any = null
window.addEventListener("scroll", () => {
    //debounce
    if (timer) {
        clearTimeout(timer)
    }
    timer = setTimeout(main, 3000)
})