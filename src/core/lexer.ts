import { log } from "console"
import type {
    TokenH2,
    TokenH3,
    TokenCode,
    TokenText,
    TokenUList,
    TokenOList,
    TokenFigure,
    TokenBlockquote,
    TokenTextPlain,
    LexType,
    TokenTextType,
    TokenTextBr,
    TokenTextBold,
    TokenTextLink,
    TokenTextItalic,
    TokenTextCode,
    TokenTextInlineMath,
    TokenHR,
    TokenLink,
    TokenTable,
    TokenVideo,
    TokenGif,
    TokenFootnoteList,
    FootnoteItem,
} from "./tokenTypes"

import { TokenType } from "./tokenTypes"
import { ZhihuLink2NormalLink } from "./utils"


/**
 * Tokenizes a NodeListOf<Element> and returns an array of LexType tokens.
 * @param input - The NodeListOf<Element> to tokenize.
 * @returns An array of LexType tokens.
 */
export const lexer = (input: NodeListOf<Element> | Element[], type?: string): LexType[] => {

    /**
     * 想法,文字没有节点，非#标签和非@链接被<br>隔开，是单独的一行
     * 将每一段转为p段落处理
     */
    if (type == "pin") {
        //console.log(input)
        if (input.length == 0) {
            return [] as LexType[]
        }
        let pinParagraphs: LexType[] = []//二级包-一级
        let dom = input[0].parentNode as HTMLElement//RichText

        //被转发的想法，首行添加主人
        if (dom.closest('.PinItem-content-originpin')) {
            let p = document.createElement("p")
            p.innerHTML = (dom.closest('.PinItem-content-originpin') as HTMLElement).firstElementChild.textContent
            pinParagraphs.push({
                type: TokenType.Text,
                content: Tokenize(p),
            })
        }
        // 在这里修复了保存想法时，很短的段落可能会消失的问题（从第二段起，变为空白行），请大家自查之前保存的想法 07.28
        // 例 pin/1862470667586396160 pin/1845764257590939648 pin/1930759768441591386
        let blocks = dom.innerHTML.replace(/\n\s*/g, "").split(/<br><br>|<br data-first-child=""><br>/)
        for (let block of blocks) {
            let p = document.createElement("p")
            p.innerHTML = block
            pinParagraphs.push({
                type: TokenType.Text,
                content: Tokenize(p),
            })
        }

        //检查想法有无引用回答，仅检查当前层级
        if (dom.closest('.PinItem-content-originpin')) {
            let a = (dom.closest('.PinItem-content-originpin') as HTMLElement).querySelector("a.LinkCard") as HTMLAnchorElement
            if (a) {
                let p = document.createElement("p")
                let a2 = document.createElement("a")
                a2.href = a.href
                a2.innerHTML = a.innerText.replace(/\n\s*/g, " ")
                p.innerHTML = a2.outerHTML
                pinParagraphs.push({
                    type: TokenType.Text,
                    content: Tokenize(p),
                })
            }
        } else {
            //此时dom不在源想法内
            let parent = dom.closest('.PinItem') as HTMLElement
            if (!parent.querySelector(".PinItem-content-originpin") && parent.querySelector("a.LinkCard")) {
                let a = parent.querySelector("a.LinkCard") as HTMLAnchorElement
                let p = document.createElement("p")
                let a2 = document.createElement("a")
                a2.href = a.href
                a2.innerHTML = a.innerText.replace(/\n\s*/g, " ")
                p.innerHTML = a2.outerHTML
                pinParagraphs.push({
                    type: TokenType.Text,
                    content: Tokenize(p),
                })
            }
        }

        //console.log('pinParagraphs', pinParagraphs)
        return pinParagraphs
    }


    const tokens: LexType[] = []

    // @ts-ignore
    let skipEmpty = window.skip_empty_p

    for (let i = 0; i < input.length; i++) {
        const node = input[i]
        //console.log(node)
        const tagName = node.nodeName.toLowerCase()

        switch (tagName) {
            case "h2": {
                tokens.push({
                    type: TokenType.H2,
                    text: node.textContent,
                    dom: node
                } as TokenH2)
                break
            }

            case "h3": {
                tokens.push({
                    type: TokenType.H3,
                    text: node.textContent,
                    dom: node
                } as TokenH3)
                break
            }

            case "div": {
                if (node.classList.contains("highlight")) {
                    tokens.push({
                        type: TokenType.Code,
                        content: node.textContent,
                        language: node.querySelector("pre > code").classList.value.slice(9),
                        dom: node
                    } as TokenCode)
                } else if (node.classList.contains("RichText-LinkCardContainer")) {
                    const link = node.firstChild as HTMLAnchorElement
                    tokens.push({
                        type: TokenType.Link,
                        text: link.getAttribute("data-text"),
                        href: ZhihuLink2NormalLink(link.href),
                        dom: node as HTMLDivElement
                    } as TokenLink)
                } else if (node.querySelector("video")) {
                    tokens.push({
                        type: TokenType.Video,
                        src: node.querySelector("video").getAttribute("src"),
                        local: false,
                        dom: node
                    } as TokenVideo)
                } else if (node.classList.contains("RichText-ADLinkCardContainer")) {
                    tokens.push({
                        type: TokenType.Text,
                        content: [{
                            type: TokenType.PlainText,
                            text: node.textContent
                        }],
                        dom: node
                    } as TokenText)
                }
                break
            }

            case "blockquote": {
                tokens.push({
                    type: TokenType.Blockquote,
                    content: Tokenize(node),
                    dom: node as HTMLQuoteElement
                } as TokenBlockquote)
                break
            }

            case "figure": {
                const img = node.querySelector("img")
                if (img.classList.contains("ztext-gif")) {
                    const guessSrc = (src: string): string => {
                        return src.replace(/\..{3,4}$/g, ".gif")
                    }
                    const src = guessSrc(img.getAttribute("src") || img.getAttribute("data-thumbnail"))
                    if (src) {
                        tokens.push({
                            type: TokenType.Gif,
                            src,
                            local: false,
                            dom: node
                        } as TokenGif)
                    }
                }
                else if (img.getAttribute('data-actualsrc')?.includes('/equation?tex=')) {
                    // 图片格式的公式
                    const altText = img.getAttribute('alt') || '';
                    if (altText) {
                        tokens.push({
                            type: TokenType.Text,
                            content: [{
                                type: TokenType.Math,
                                content: altText.trim(),
                                display: true,
                                dom: img
                            } as TokenTextInlineMath],
                            dom: node
                        } as TokenText)
                    }
                }
                else {
                    const src = img.getAttribute("data-actualsrc") || img.getAttribute("data-original") || img.src
                    if (src) {
                        tokens.push({
                            type: TokenType.Figure,
                            src,
                            local: false,
                            dom: node as HTMLElement
                        } as TokenFigure)
                    }
                }
                //保存图片题注Tokenize(text),
                const text = node.querySelector("figcaption")
                if (text) {
                    tokens.push({
                        type: TokenType.Text,
                        content: [{
                            type: TokenType.Italic,
                            content: Tokenize(text),
                            dom: text,
                        }],
                        dom: text
                    } as TokenText)
                }
                break
            }

            case "ul": {
                const childNodes = Array.from(node.querySelectorAll("li"))
                tokens.push({
                    type: TokenType.UList,
                    content: childNodes.map((el) => Tokenize(el)),
                    dom: node,
                } as TokenUList)

                break
            }

            case "ol": {
                // 检查是否为脚注/参考文献列表
                if (node.classList.contains('ReferenceList')) {
                    const childNodes = Array.from(node.querySelectorAll("li"))
                    const items: FootnoteItem[] = childNodes.map((li) => {
                        // 提取脚注编号，从 id="ref_1" 中提取 "1"
                        const id = li.id.replace('ref_', '')
                        // 提取脚注内容，跳过返回链接，只取 span 中的文本
                        const span = li.querySelector('span')
                        const content = span ? span.textContent || '' : li.textContent || ''
                        return { id, content: content.trim() }
                    })
                    tokens.push({
                        type: TokenType.FootnoteList,
                        items,
                        dom: node,
                    } as TokenFootnoteList)
                } else {
                    // 普通有序列表
                    const childNodes = Array.from(node.querySelectorAll("li"))
                    tokens.push({
                        type: TokenType.Olist,
                        content: childNodes.map((el) => Tokenize(el)),
                        dom: node,
                    } as TokenOList)
                }

                break
            }

            case "p": {
                if (skipEmpty && (node.classList.contains('ztext-empty-paragraph') || node.textContent.length == 0))
                    break

                tokens.push({
                    type: TokenType.Text,
                    content: Tokenize(node),
                    dom: node as HTMLParagraphElement
                } as TokenText)

                break
            }

            case "hr": {

                tokens.push({
                    type: TokenType.HR,
                    dom: node
                } as TokenHR)

                break
            }

            case "table": {

                const el = node as HTMLTableElement

                const table2array = (table: HTMLTableElement): string[][] => {
                    const res: string[][] = []
                    const rows = Array.from(table.rows)

                    for (let row of rows) {
                        const cells = Array.from(row.cells)
                        res.push(cells.map((cell) => cell.innerHTML.replace(
                            /<a.*?href.*?>(.*?)<svg.*?>.*?<\/svg><\/a>/gms,
                            "$1"
                        ).replace(
                            /<span>(.*?)<\/span>/gms,
                            "$1"
                        )))
                    }

                    return res
                }
                const table = table2array(el)

                tokens.push({
                    type: TokenType.Table,
                    content: table,
                    dom: node,
                } as TokenTable)

                break
            }
        }
    }
    //console.log(tokens)

    return tokens
}


/**
 * Tokenizes an HTML element or string into an array of TokenTextType objects.
 * 处理行内内容
 * @param node The HTML element or string to tokenize.
 * @returns An array of TokenTextType objects representing the tokenized input.
 */
const Tokenize = (node: Element | string): TokenTextType[] => {

    if (typeof node == "string") {
        return [{
            type: TokenType.PlainText,
            text: node.replace('\t', '').replace(/^\s{2,}/, ''), // 修复被误识别为代码块，修复公式后面缺少空格的问题
        } as TokenTextPlain]
    }

    let childs = Array.from(node.childNodes)
    const res: TokenTextType[] = []

    // 处理 <blockquote><p></p></blockquote> 的奇观
    try {
        if (childs.length == 1 && (childs[0] as HTMLElement).tagName.toLowerCase() == "p") {
            childs = Array.from((childs[0] as HTMLElement).childNodes)
        }
    } catch { }

    for (let child of childs) {

        if (child.nodeType == child.TEXT_NODE) {
            res.push({
                type: TokenType.PlainText,
                text: child.textContent.replace(/\u200B/g, '').replace('\t', '').replace(/^\s{2,}/, ''), // 修复被误识别为代码块，修复公式后面缺少空格的问题
                dom: child,
            } as TokenTextPlain)
        } else {
            let el = child as HTMLElement

            switch (el.tagName.toLowerCase()) {
                case "b": {
                    res.push({
                        type: TokenType.Bold,
                        content: Tokenize(el),
                        dom: el,
                    } as TokenTextBold)
                    break
                }

                case "i": {
                    res.push({
                        type: TokenType.Italic,
                        content: Tokenize(el),
                        dom: el,
                    } as TokenTextItalic)
                    break
                }

                case "br": {
                    res.push({
                        type: TokenType.BR,
                        dom: el,
                    } as TokenTextBr)
                    break
                }

                case "code": {
                    res.push({
                        type: TokenType.InlineCode,
                        content: el.innerText,
                        dom: el,
                    } as TokenTextCode)
                    break
                }

                case "span": {
                    try {
                        if (el.classList.contains("ztext-math")) {
                            // 根据是否存在 MathJax_SVG_Display 类来判断是否为块级公式
                            const hasDisplayClass = el.querySelector(".MathJax_SVG_Display") !== null;
                            const content = el.getAttribute("data-tex").trim();
                            // 如果公式包含 \tag 命令，也应该是块级公式（\tag 只能在 display mode 中使用）
                            const hasTag = content.includes('\\tag');
                            const isDisplayMath = hasDisplayClass || hasTag;
                            res.push({
                                type: TokenType.Math,
                                content: content,
                                display: isDisplayMath,
                                dom: el,
                            } as TokenTextInlineMath)
                        } else if (el.children[0].classList.contains("RichContent-EntityWord")) {//搜索词
                            res.push({
                                type: TokenType.PlainText,
                                text: el.innerText,
                                dom: el,
                            } as TokenTextPlain)
                        }
                        else if (el.querySelector('a')) {//想法中的用户名片
                            res.push({
                                type: TokenType.InlineLink,
                                text: el.innerText,
                                href: ZhihuLink2NormalLink((el.querySelector("a") as HTMLAnchorElement).href),
                                dom: el,
                            } as TokenTextLink)
                        }
                    } catch (e) {
                        res.push({
                            type: TokenType.PlainText,
                            text: el.innerText,
                            dom: el,
                        } as TokenTextPlain)
                        //console.error(el, el.innerText)
                    }
                    break
                }

                case "a": {
                    //console.log(el)
                    // 移除另一种搜索推荐
                    if ((el as HTMLAnchorElement).href.startsWith('https://zhida.zhihu.com/search')) {
                        res.push({
                            type: TokenType.PlainText,
                            text: el.innerText,
                            dom: el,
                        } as TokenTextPlain)
                    } else
                        res.push({
                            type: TokenType.InlineLink,
                            text: el.textContent,
                            href: ZhihuLink2NormalLink((el as HTMLAnchorElement).href),
                            dom: el,
                        } as TokenTextLink)
                    break
                }

                case "sup": {
                    const link = el.firstElementChild as HTMLAnchorElement
                    // 提取脚注编号，如 [1] -> 1
                    const footnoteText = link.textContent.replace(/[\[\]]/g, '')
                    res.push({
                        type: TokenType.PlainText,
                        text: `[^${footnoteText}]`,
                        dom: el,
                    } as TokenTextPlain)
                    break
                }

                default: {
                    //下划线内容等question/478154391/answer/121816724037
                    res.push({
                        type: TokenType.PlainText,
                        text: child.textContent.replace(/\u200B/g, '').replace('\t', '').replace(/^\s{2,}/, ''),
                        dom: child,
                    } as TokenTextPlain)
                }
            }
        }
    }
    //console.log(res)
    return res
}