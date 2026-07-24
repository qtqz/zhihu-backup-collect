import { saveAs } from "file-saver"
import dealItem from "./dealItem"
import * as JSZip from "jszip"
import { domToPng } from "modern-screenshot"
import { getCommentSwitch } from "./core/utils"
import { mountParseComments } from "./core/parseComments"
import { selectObsidianVault, saveFile } from "./core/obsidianSaver";
import { showToast } from './core/toast';

// @grant        GM_setValue
// @grant        GM_getValue
// @grant        GM_registerMenuCommand
// @grant        GM_unregisterMenuCommand
// @grant        GM_setClipboard

const copyToClipboard = (text: string): boolean => {
    try {
        // @ts-ignore
        if (typeof GM_setClipboard !== "undefined") {
            // @ts-ignore
            GM_setClipboard(text, "text");
            return true;
        }
    } catch (e) {}
    try {
        if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(text);
            return true;
        }
    } catch (e) {}
    try {
        const textarea = document.createElement("textarea");
        textarea.value = text;
        textarea.style.position = "fixed";
        textarea.style.opacity = "0";
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand("copy");
        document.body.removeChild(textarea);
        return true;
    } catch (e) {}
    return false;
};

/**
 * 油猴按钮 - 保留所有原生设置
 */
function registerBtn() {
    try {
        // @ts-ignore
        let uiMode = GM_getValue("ui_mode", "minimal");
        // @ts-ignore
        GM_registerMenuCommand(
            `🎨 UI界面模式：${uiMode === 'minimal' ? '【老版极简居中】(点击切换新版)' : '【新版增强侧边栏】(点击切换老版)'}`,
            function () {
                let nextMode = uiMode === 'minimal' ? 'full' : 'minimal';
                // @ts-ignore
                GM_setValue("ui_mode", nextMode);
                alert(`已切换为：${nextMode === 'minimal' ? '老版极简居中 UI' : '新版增强侧边栏 UI'}\n刷新页面后生效。`);
                location.reload();
            }
        );

        // @ts-ignore
        let sidebarTriggerMode = GM_getValue("sidebar_trigger_mode", "hover_content");
        // @ts-ignore
        GM_registerMenuCommand(
            `🔘 侧边栏展开方式：${sidebarTriggerMode === 'chevron' ? '【Chevron图标触发】(点击切换为【鼠标悬停正文】)' : '【鼠标悬停正文触发(原版)】(点击切换为【Chevron图标】)'}`,
            function () {
                let nextMode = sidebarTriggerMode === 'chevron' ? 'hover_content' : 'chevron';
                // @ts-ignore
                GM_setValue("sidebar_trigger_mode", nextMode);
                alert(`已切换为：${nextMode === 'chevron' ? 'Chevron 图标触发模式' : '鼠标悬停正文触发模式 (原版)'}\n刷新页面后生效。`);
                location.reload();
            }
        );

        // @ts-ignore
        GM_registerMenuCommand(
            "（推荐）解析时跳过空白段落",
            function () {
                // @ts-ignore
                let ac = GM_getValue("skip_empty_p"), c
                !ac ? c = confirm("解析时跳过空白段落，避免产生大量多余的换行，你是否继续？") : alert('已取消跳过空白段落')
                if (c) {
                    // @ts-ignore
                    GM_setValue("skip_empty_p", true)
                } else GM_setValue("skip_empty_p", false)
            }
        )

        // @ts-ignore
        GM_registerMenuCommand(
            "复制内容时添加fm元信息",
            function () {
                // @ts-ignore
                let ac = GM_getValue("copy_save_fm"), c
                !ac ? c = confirm("复制内容时，添加 frontmatter 信息，就像下载为纯文本的时候一样。你是否继续？") : alert('已取消复制添加fm')
                // @ts-ignore
                c ? GM_setValue("copy_save_fm", true) : GM_setValue("copy_save_fm", false)
            }
        )

        // @ts-ignore
        GM_registerMenuCommand(
            "复制内容时同时复制评论",
            function () {
                // @ts-ignore
                let ns = GM_getValue("copy_save_cm"), c
                !ns ? c = confirm("启用后，复制时也会复制评论，就像直接复制了下载的纯文本。你是否继续？") : alert('已取消复制评论')
                // @ts-ignore
                c ? GM_setValue("copy_save_cm", true) : GM_setValue("copy_save_cm", false)
            }
        )

        // @ts-ignore
        GM_registerMenuCommand(
            "下载zip时合并正文与评论",
            function () {
                // @ts-ignore
                let ns = GM_getValue("zip_merge_cm"), c
                !ns ? c = confirm("启用后，下载zip时会合并正文与评论到一个文件中。你是否继续？") : alert('已取消合并')
                // @ts-ignore
                c ? GM_setValue("zip_merge_cm", true) : GM_setValue("zip_merge_cm", false)
            }
        )

        // @ts-ignore
        GM_registerMenuCommand(
            "复制与下载纯文本时不保存图片",
            function () {
                // @ts-ignore
                let ns = GM_getValue("no_save_img"), c
                !ns ? c = confirm("启用后，复制、存文本时将所有图片替换为“[图片]”，不影响存zip。你是否继续？") : alert('已取消不存图')
                // @ts-ignore
                c ? GM_setValue("no_save_img", true) : GM_setValue("no_save_img", false)
            }
        )

        // @ts-ignore
        GM_registerMenuCommand(
            "自定义保存后的文件名格式",
            function () {
                // @ts-ignore
                let efm = GM_getValue("edit_Filename")
                let fm = prompt(`是否自定义保存后的文件名格式？留空或填错恢复默认\n默认为title + "_" + author.name + "_" + time.modified.slice(0, 10) + remark，你可以调整它的顺序，使用其他属性需要阅读源码\n(new Date).toLocaleDateString().replaceAll('/','-')添加保存日期`,
                    efm ? efm : 'title + "_" + author.name + "_" + time.modified.slice(0, 10) + remark'
                )
                // @ts-ignore
                GM_setValue("edit_Filename", fm)
            }
        )
    } catch (e) {
        console.warn(e)
    }
}
registerBtn()

const getUIMode = (): 'minimal' | 'full' => {
    try {
        // @ts-ignore
        return GM_getValue("ui_mode", "minimal");
    } catch (e) {
        return "minimal";
    }
};

const getSidebarTriggerMode = (): 'hover_content' | 'chevron' => {
    try {
        // @ts-ignore
        return GM_getValue("sidebar_trigger_mode", "hover_content");
    } catch (e) {
        return "hover_content";
    }
};

const renderContainerHTML = (): string => {
    const isMinimal = getUIMode() === 'minimal';
    if (isMinimal) {
        return `<div class="zhcollect-minimal-btns">
    <button class="to-copy-context zhcollect-btn" style="border-radius:1em 0 0 1em;padding-left:.4em;">复制标题+正文</button>
    <button class="to-copy-content zhcollect-btn" style="border-radius:0 1em 1em 0;padding-right:.4em;">复制正文</button>
</div>`;
    }
    const isChevronMode = getSidebarTriggerMode() === 'chevron';
    if (isChevronMode) {
        return `<div class="zhihubackup-sticky-box">
    <div class="zhihubackup-container">
        <button class="to-copy Button VoteButton">复制为Markdown</button>
        <button class="to-zip Button VoteButton">下载为 ZIP</button>
        <button class="to-text Button VoteButton">下载为纯文本</button>
        <button class="to-png Button VoteButton">剪藏为 PNG</button>
        <button class="to-obsidian Button VoteButton">
        <svg style="width: 2em;height: 2em;width: 1.5em;height: 1.5em;opacity: 0.6;vertical-align: sub;" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M19.355 18.538a68.967 68.959 0 0 0 1.858-2.954a.81.81 0 0 0-.062-.9c-.516-.685-1.504-2.075-2.042-3.362c-.553-1.321-.636-3.375-.64-4.377a1.7 1.7 0 0 0-.358-1.05l-3.198-4.064a4 4 0 0 1-.076.543c-.106.503-.307 1.004-.536 1.5c-.134.29-.29.6-.446.914l-.31.626c-.516 1.068-.997 2.227-1.132 3.59c-.124 1.26.046 2.73.815 4.481q.192.016.386.044a6.36 6.36 0 0 1 3.326 1.505c.916.79 1.744 1.922 2.415 3.5zM8.199 22.569q.11.019.22.02c.78.024 2.095.092 3.16.29c.87.16 2.593.64 4.01 1.055c1.083.316 2.198-.548 2.355-1.664c.114-.814.33-1.735.725-2.58l-.01.005c-.67-1.87-1.522-3.078-2.416-3.849a5.3 5.3 0 0 0-2.778-1.257c-1.54-.216-2.952.19-3.84.45c.532 2.218.368 4.829-1.425 7.531zM5.533 9.938q-.035.15-.098.29L2.82 16.059a1.6 1.6 0 0 0 .313 1.772l4.116 4.24c2.103-3.101 1.796-6.02.836-8.3c-.728-1.73-1.832-3.081-2.55-3.831zM9.32 14.01c.615-.183 1.606-.465 2.745-.534c-.683-1.725-.848-3.233-.716-4.577c.154-1.552.7-2.847 1.235-3.95q.17-.35.328-.664c.149-.297.288-.577.419-.86c.217-.47.379-.885.46-1.27c.08-.38.08-.72-.014-1.043c-.095-.325-.297-.675-.68-1.06a1.6 1.6 0 0 0-1.475.36l-4.95 4.452a1.6 1.6 0 0 0-.513.952l-.427 2.83c.672.59 2.328 2.316 3.335 4.711q.136.317.253.653"></path></svg>
        保存到<br>指定文件夹</button>
        <div class="Button VoteButton" style="display: inline-block;box-sizing: border-box;overflow: hidden;">
            <textarea class="to-remark" type="text" placeholder="添加备注" style="width: 100%;" maxlength="60"></textarea>
        </div>
        <div class="Button VoteButton" style="display: inline-block;box-sizing: border-box;">
            <label><input type="checkbox" checked class="to-cm"> 保存评论</label>
        </div>
    </div>
    <div class="zhihubackup-trigger" title="展开工具栏"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg></div>
</div>`;
    }
    return `<div class="zhihubackup-container">
    <button class="to-copy Button VoteButton">复制为Markdown</button>
    <button class="to-zip Button VoteButton">下载为 ZIP</button>
    <button class="to-text Button VoteButton">下载为纯文本</button>
    <button class="to-png Button VoteButton">剪藏为 PNG</button>
    <button class="to-obsidian Button VoteButton">
    <svg style="width: 2em;height: 2em;width: 1.5em;height: 1.5em;opacity: 0.6;vertical-align: sub;" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M19.355 18.538a68.967 68.959 0 0 0 1.858-2.954a.81.81 0 0 0-.062-.9c-.516-.685-1.504-2.075-2.042-3.362c-.553-1.321-.636-3.375-.64-4.377a1.7 1.7 0 0 0-.358-1.05l-3.198-4.064a4 4 0 0 1-.076.543c-.106.503-.307 1.004-.536 1.5c-.134.29-.29.6-.446.914l-.31.626c-.516 1.068-.997 2.227-1.132 3.59c-.124 1.26.046 2.73.815 4.481q.192.016.386.044a6.36 6.36 0 0 1 3.326 1.505c.916.79 1.744 1.922 2.415 3.5zM8.199 22.569q.11.019.22.02c.78.024 2.095.092 3.16.29c.87.16 2.593.64 4.01 1.055c1.083.316 2.198-.548 2.355-1.664c.114-.814.33-1.735.725-2.58l-.01.005c-.67-1.87-1.522-3.078-2.416-3.849a5.3 5.3 0 0 0-2.778-1.257c-1.54-.216-2.952.19-3.84.45c.532 2.218.368 4.829-1.425 7.531zM5.533 9.938q-.035.15-.098.29L2.82 16.059a1.6 1.6 0 0 0 .313 1.772l4.116 4.24c2.103-3.101 1.796-6.02.836-8.3c-.728-1.73-1.832-3.081-2.55-3.831zM9.32 14.01c.615-.183 1.606-.465 2.745-.534c-.683-1.725-.848-3.233-.716-4.577c.154-1.552.7-2.847 1.235-3.95q.17-.35.328-.664c.149-.297.288-.577.419-.86c.217-.47.379-.885.46-1.27c.08-.38.08-.72-.014-1.043c-.095-.325-.297-.675-.68-1.06a1.6 1.6 0 0 0-1.475.36l-4.95 4.452a1.6 1.6 0 0 0-.513.952l-.427 2.83c.672.59 2.328 2.316 3.335 4.711q.136.317.253.653"></path></svg>
    保存到<br>指定文件夹</button>
    <div class="Button VoteButton" style="display: inline-block;box-sizing: border-box;overflow: hidden;">
        <textarea class="to-remark" type="text" placeholder="添加备注" style="width: 100%;" maxlength="60"></textarea>
    </div>
    <div class="Button VoteButton" style="display: inline-block;box-sizing: border-box;">
        <label><input type="checkbox" checked class="to-cm"> 保存评论</label>
    </div>
</div>`;
};

const ButtonContainer = document.createElement("div")
if (getUIMode() === 'full') {
    ButtonContainer.classList.add("zhihubackup-wrap")
}
ButtonContainer.innerHTML = renderContainerHTML()

function throttle(func: Function, wait = 1000) {
    let timer: any = null
    return function (this: any, ...args: any[]) {
        if (!timer) {
            func.apply(this, args)
            timer = setTimeout(() => {
                timer = null
            }, wait)
        }
    }
}

const main = async () => {
    const RichTexts = Array.from(document.querySelectorAll(".RichText")) as HTMLElement[]
    for (let RichText of RichTexts) {
        try {
            let result: {
                zip?: JSZip,
                textString?: string,
                title: string,
            }
            if (RichText.parentElement && RichText.parentElement.classList.contains("Editable")) continue
            if (window.location.hostname.includes('zhuanlan')) {
                if (RichText.closest('.Post-Main')?.querySelector(".zhcollect-minimal-btns, .zhihubackup-container")) continue
            }
            else {
                if (RichText.closest('.PinItem')) {
                    if (!RichText.closest('.RichContent-inner')) continue
                    if (RichText.closest('.PinItem-content-originpin')) continue
                }
                if (RichText.closest('.RichContent')?.querySelector(".zhcollect-minimal-btns, .zhihubackup-container")) continue
                const richInner = RichText.closest('.RichContent-inner')
                if (richInner && richInner.querySelector(".ContentItem-more")) continue
                if (RichText.closest('.RichContent')?.querySelector(".ContentItem-expandButton")) continue
            }

            const aButtonContainer = ButtonContainer.cloneNode(true) as HTMLDivElement

            let parent_dom = RichText.closest('.List-item') ||
                RichText.closest('.Post-content') ||
                RichText.closest('.PinItem') ||
                RichText.closest('.CollectionDetailPageItem') ||
                RichText.closest('.Card') as HTMLElement || RichText

            if (getUIMode() === 'full') {
                if (getSidebarTriggerMode() === 'chevron') {
                    aButtonContainer.classList.add('zhihubackup-chevron-mode');
                }
                const containerEl = aButtonContainer.querySelector('.zhihubackup-container') as HTMLElement;
                if (parent_dom.querySelector && parent_dom.querySelector('.Catalog') && containerEl) {
                    containerEl.style.position = 'fixed';
                    containerEl.style.top = 'unset';
                    containerEl.style.bottom = '60px'
                }
                let p = RichText.closest('.RichContent') || RichText.closest('.Post-RichTextContainer') as HTMLElement || RichText
                p.prepend(aButtonContainer)

                const closeAllSidebars = (except?: HTMLElement) => {
                    document.querySelectorAll('.zhihubackup-wrap.is-open').forEach((el) => {
                        if (el !== except) el.classList.remove('is-open');
                    });
                };

                // Chevron trigger: hover or click to open sidebar, single active panel globally
                const trigger = aButtonContainer.querySelector('.zhihubackup-trigger') as HTMLElement;
                if (trigger) {
                    trigger.addEventListener('mouseenter', () => {
                        closeAllSidebars(aButtonContainer);
                        aButtonContainer.classList.add('is-open');
                    });
                    trigger.addEventListener('click', (e) => {
                        e.stopPropagation();
                        const wasOpen = aButtonContainer.classList.contains('is-open');
                        closeAllSidebars();
                        if (!wasOpen) {
                            aButtonContainer.classList.add('is-open');
                        }
                    });
                    aButtonContainer.addEventListener('mouseleave', () => {
                        aButtonContainer.classList.remove('is-open');
                    });
                }
            } else {
                RichText.prepend(aButtonContainer)
            }

            const textareaRemark = parent_dom.querySelector(".to-remark") as HTMLTextAreaElement
            if (textareaRemark) {
                textareaRemark.addEventListener("click", (e) => {
                    e.stopPropagation()
                    e.preventDefault()
                    textareaRemark.focus()
                }, true)
            }

            const bindCopyBtn = (selector: string, mode: string, defaultText: string) => {
                const btn = parent_dom.querySelector(selector) as HTMLElement
                if (!btn) return
                btn.addEventListener("click", throttle(async (event: Event) => {
                    try {
                        const res = await dealItem(RichText, mode, event)
                        if (!res || !res.textString) {
                            btn.innerHTML = "发生错误❌"
                            setTimeout(() => { btn.innerHTML = defaultText }, 2000)
                            return
                        }
                        copyToClipboard(res.textString)
                        btn.innerHTML = "复制成功✅"
                        setTimeout(() => { btn.innerHTML = defaultText }, 1500)
                    } catch (e) {
                        console.error(e)
                        btn.innerHTML = "发生错误❌"
                        setTimeout(() => { btn.innerHTML = defaultText }, 2000)
                    }
                }))
            }

            bindCopyBtn(".to-copy-context", "copy_context", "复制标题+正文")
            bindCopyBtn(".to-copy-content", "copy_content", "复制正文")
            bindCopyBtn(".to-copy", "copy_content", "复制为Markdown")

            const bindSaveBtn = (selector: string, saveType: string) => {
                const btn = parent_dom.querySelector(selector) as HTMLElement
                if (!btn) return
                btn.addEventListener("click", throttle(async (event: Event) => {
                    try {
                        let result: {
                            zip?: JSZip,
                            textString?: string,
                            title: string,
                        }
                        if (saveType.slice(0, 4) == 'text') {
                            const res = await dealItem(RichText, 'text')
                            if (!res) return
                            result = {
                                textString: res.textString,
                                title: res.title,
                            }
                            await saveFile(result, saveType as any)
                        }
                        else if (saveType.slice(0, 3) == 'zip') {
                            const res = await dealItem(RichText, 'zip')
                            if (!res) return
                            result = {
                                zip: res.zip,
                                title: res.title,
                            }
                            await saveFile(result, saveType as any)
                        }
                        else if (saveType == 'png') {
                            const res = await dealItem(RichText, 'png')
                            if (!res) return

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
                        alert('发生错误❌请打开控制台查看\n你可以关闭窗口后再试一次！')
                    }
                }))
            }

            bindSaveBtn(".to-zip", "zip")
            bindSaveBtn(".to-text", "text")
            bindSaveBtn(".to-png", "png")

            const ButtonObsidian = parent_dom.querySelector(".to-obsidian")
            if (ButtonObsidian) {
                ButtonObsidian.addEventListener("click", throttle(async (event: Event) => {
                    try {
                        selectObsidianVault(async (vault: string, folder: string) => {
                            const res = await dealItem(RichText, 'obsidian', event)
                            if (!res) return
                            if (res.zip) {
                                saveFile(res.zip, vault, folder, res.title)
                            } else if (res.textString) {
                                const zip = new JSZip()
                                zip.file("index.md", res.textString)
                                saveFile(zip, vault, folder, res.title)
                            }
                            showToast('✅ 导出成功！')
                        })
                    } catch (e) {
                        console.error(e)
                        showToast('❌ 导出失败！')
                    }
                }))
            }
        } catch (e) {
            console.error(e)
        }
    }
}

mountParseComments()

setTimeout(() => {
    let node = document.createElement("style")
    node.appendChild(document.createTextNode(`
    /* ========== Minimal Mode: Joined Capsule Buttons ========== */
    .zhcollect-minimal-btns {
        user-select: none;
    }
    .zhcollect-btn {
        width: 120px;
        height: 2em;
        background-color: rgba(85, 85, 85, 0.9);
        color: white;
        outline: none;
        cursor: pointer;
        border: none;
        border-radius: 1em;
        margin: 0 .2em 1em .2em;
        font-size: .8em;
        z-index: 999;
    }
    .zhcollect-btn:hover {
        background-color: rgba(60, 60, 60, 0.95);
    }

    /* ========== Full Mode: Sidebar Layout Architecture ========== */
    .RichContent {
        position: relative;
    }
    .zhihubackup-wrap {
        position: absolute;
        left: -9.5em;
        top: -100px;
        height: 100%;
        min-height: 200px;
        user-select: none;
        width: 9.5em; /* 保证整体靠左侧外边距展开，绝不占用正文侧向空间 */
    }

    /* CRITICAL FIX: Allow Card containers to show overflowing sidebars without clipping or overlapping text! */
    .Card:has(.zhihubackup-wrap) {
        overflow: visible !important;
    }

    /* Default: Native Hover Mode */
    .zhihubackup-wrap:not(.zhihubackup-chevron-mode) {
        opacity: 0;
        pointer-events: none;
        transition: opacity 0.3s ease;
    }
    .RichContent:hover .zhihubackup-wrap:not(.zhihubackup-chevron-mode),
    .ContentItem:hover .zhihubackup-wrap:not(.zhihubackup-chevron-mode),
    .AnswerItem:hover .zhihubackup-wrap:not(.zhihubackup-chevron-mode),
    .ArticleItem:hover .zhihubackup-wrap:not(.zhihubackup-chevron-mode),
    .PinItem:hover .zhihubackup-wrap:not(.zhihubackup-chevron-mode),
    .Post-content:hover .zhihubackup-wrap:not(.zhihubackup-chevron-mode),
    .Post-RichTextContainer:hover .zhihubackup-wrap:not(.zhihubackup-chevron-mode),
    .List-item:hover .zhihubackup-wrap:not(.zhihubackup-chevron-mode),
    .Card:hover .zhihubackup-wrap:not(.zhihubackup-chevron-mode),
    .zhihubackup-wrap:not(.zhihubackup-chevron-mode):hover {
        opacity: 1 !important;
        pointer-events: initial !important;
    }
    .zhihubackup-wrap:not(.zhihubackup-chevron-mode) .zhihubackup-container {
        position: sticky;
        top: 120px;
        width: min-content;
        max-width: 8em;
        z-index: 2;
    }

    /* Chevron Mode Sticky Box */
    .zhihubackup-chevron-mode .zhihubackup-sticky-box {
        position: sticky;
        top: 200px; /* 悬浮吸顶高度（低于知乎顶部导航栏） */
        display: flex;
        flex-direction: row; /* 正向 Row：左侧为功能菜单，右侧紧贴正文的是 Chevron 按钮 */
        align-items: flex-start;
        justify-content: flex-end; /* 靠右对齐：触发按钮紧贴回答正文左边界 */
        gap: 8px;
        width: 100%;
    }
    .zhihubackup-chevron-mode .zhihubackup-trigger {
        position: relative;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        color: rgba(60, 60, 60, 0.7);
        background: rgba(255, 255, 255, 0.85);
        backdrop-filter: blur(10px);
        -webkit-backdrop-filter: blur(10px);
        border: 1px solid rgba(0, 0, 0, 0.08);
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
        transition: opacity 0.25s cubic-bezier(0.4, 0, 0.2, 1),
                    background 0.25s cubic-bezier(0.4, 0, 0.2, 1),
                    transform 0.25s cubic-bezier(0.4, 0, 0.2, 1),
                    box-shadow 0.25s cubic-bezier(0.4, 0, 0.2, 1),
                    color 0.25s cubic-bezier(0.4, 0, 0.2, 1);
        opacity: 0.35; /* 默认低透明度常驻浮现，能看清按钮位置但绝不刺眼 */
        z-index: 3;
        pointer-events: auto;
        box-sizing: border-box;
        width: 24px;
        height: 38px;
        border-radius: 12px;
        flex-shrink: 0;
        margin-right: 12px; /* ★ 向左平移12px骑在中线上（一半在卡片内，一半在卡片外） */
    }
    .zhihubackup-chevron-mode .zhihubackup-trigger::before {
        content: '';
        position: absolute;
        top: -16px;
        bottom: -16px;
        left: -16px;
        right: -16px;
        border-radius: inherit;
    }
    .zhihubackup-chevron-mode .zhihubackup-trigger svg {
        transition: transform 0.3s ease;
    }
    .zhihubackup-wrap.is-open .zhihubackup-trigger {
        opacity: 0.85;
    }

    .zhihubackup-trigger:hover {
        opacity: 1 !important;
        background: rgba(255, 255, 255, 0.98);
        border-color: rgba(23, 114, 246, 0.3);
        box-shadow: 0 6px 20px rgba(0, 0, 0, 0.14), 0 2px 6px rgba(0, 0, 0, 0.05);
        transform: scale(1.18);
        color: #1772f6;
    }

    .zhihubackup-chevron-mode .zhihubackup-container {
        position: static;
        opacity: 0;
        pointer-events: none;
        transition: opacity 0.3s ease;
    }

    .zhihubackup-wrap.is-open .zhihubackup-container {
        opacity: 1;
        pointer-events: auto;
    }
    .zhihubackup-wrap.is-open .zhihubackup-trigger svg {
        transform: rotate(180deg);
    }

    .zhihubackup-container .Button {
        width: 8em;
        margin-bottom: 8px;
        line-height: 24px !important;
        padding: 4px 10px!important;
    }
    .zhihubackup-container input,
    .zhihubackup-container textarea {
        background-color: #0000;
        font-size: 14px;
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
    div.Button.VoteButton:has(input:focus),
    div.Button.VoteButton:has(textarea:focus),
    div.Button.VoteButton:has(textarea:hover) {
        resize: both;
        overflow: hidden;
    }
    .to-screenshot .ContentItem-actions {
        position: initial!important;
        box-shadow: unset!important;
        margin: 0 -20px -10px!important;
    }
    .to-screenshot.Post-content .RichContent-actions {
        position: initial!important;
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
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    .to-screenshot .ContentItem-actions>.ContentItem-actions {
        margin-top: -10px!important;
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
        margin: 16px 0;
        padding: 0 16px;
        width: 690px;
    }
    .PinDetail:has(.to-screenshot){
        max-width: 706px!important;
    }
    .to-screenshot .Recommendations-Main{
        display: none;
    }
    .to-screenshot .css-kt4t4n{
        display: none;
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
    `))
    let head = document.querySelector("head")
    if (head) head.appendChild(node)

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
        if (head) head.appendChild(node2)
    }
}, 30)

setTimeout(() => {
    main()
    // @ts-ignore
    window.zhbf = main
    // @ts-ignore
    window.ArticleComments = window.ArticleComments || {};
    document.querySelector('.Topstory-tabs')?.addEventListener('click', () => {
        setTimeout(registerBtn, 100);
    })
}, 300)

let scrollTimer: any = null
window.addEventListener("scroll", () => {
    if (scrollTimer) {
        clearTimeout(scrollTimer)
    }
    scrollTimer = setTimeout(main, 1000)
})
