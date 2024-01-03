import * as JSZip from "jszip"
import { parser } from "../core/parser"
import { lexer } from "../core/pinsLexer"
import { TokenType } from "../core/tokenTypes"
import type { LexType, TokenFigure } from "../core/tokenTypes"
import * as utils from "../core/utils"
import savelex from "../core/savelex"

export default async (dom: HTMLElement): Promise<{
    lex: LexType[],
    markdown: string[],
    zip: JSZip,
    title: string,
}> => {
    const lex = lexer(dom)
    const markdown = parser(lex)

    const pinItem = utils.getParent(dom, "PinItem")

    if (pinItem) {
        // 获取图片
        const imgs = Array.from(pinItem.querySelectorAll(".Image-PreviewVague > img")) as HTMLImageElement[]
        imgs.forEach((img) => {
            lex.push({
                type: TokenType.Figure,
                src: img.getAttribute("data-original") || img.getAttribute("data-actualsrc"),
            } as TokenFigure)
        })
    }

    const { zop, zaExtra } = (() => {
        let el = utils.getParent(dom, "PinItem") as HTMLElement
        return {
            zop: JSON.parse(decodeURIComponent(el.getAttribute("data-zop"))),
            zaExtra: JSON.parse(decodeURIComponent(el.getAttribute("data-za-extra-module")))
        }
    })()

    const author = utils.getAuthor(dom, "", ""),
        url = "https://www.zhihu.com/pin/" + zop.itemId

    const zip = await savelex(lex)

    zip.file("info.json", JSON.stringify({
        author, url: "https://www.zhihu.com/pin/" + zop.itemId,
        zop,
        "zop-extra-module": zaExtra,
    }, null, 4))

    return {
        lex,
        markdown,
        zip,
        title: "想法-" + zop.itemId,
    }
}