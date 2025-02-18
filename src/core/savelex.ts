import * as JSZip from "jszip"
import { TokenType, type LexType } from "./tokenTypes"
import { downloadAndZip } from "./download2zip"
import { parser } from "./parser"

export default async (
    lex: LexType[],
    assetsPath: string = "assets"
): Promise<{ zip: JSZip, localLex: LexType[] }> => {

    const zip = new JSZip()
    let FigureFlag = false

    for (let token of lex) {
        if (token.type == TokenType.Figure || token.type == TokenType.Video || token.type == TokenType.Gif) {
            FigureFlag = true
            break
        }
    }
    if (FigureFlag) {
        const assetsFolder = zip.folder(assetsPath)

        for (let token of lex) {
            try {
                switch (token.type) {
                    case TokenType.Figure:
                    case TokenType.Video:
                    case TokenType.Gif: {
                        const { file_name } = await downloadAndZip(token.src, assetsFolder)
                        token.localSrc = `./${assetsPath}/${file_name}`
                        token.local = true
                        break
                    }
                }
            } catch (e) {
                console.error('下载', token, e)
                alert('下载失败' + token.type + e)
            }
        }
    }

    /*const markdown = parser(lex).join("\n\n")
    zip.file("index.md", markdown)*/

    return { zip: zip, localLex: lex }
}