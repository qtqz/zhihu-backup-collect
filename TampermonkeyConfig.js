import fs from "fs"
import md5 from "md5"

const packageInfo = JSON.parse(fs.readFileSync("./package.json", "utf-8").toString())

export const UserScriptContent = fs
    .readFileSync("./dist/bundle.min.js", "utf-8")
    .toString()
    .replace(/\/\*[\s\S]*?\*\/|([^\\:]|^)\/\/.*$/gm, "").trim()

export const UserScript = {
    "name": "知乎备份剪藏",
    "namespace": "",
    "source": "https://github.com/",
    "version": packageInfo.version + "-" + md5(UserScriptContent).slice(0, 6),
    "description": "保存知乎上珍贵的内容。",
    "author": packageInfo.author,
    "match": [
        "*:\/\/www.zhihu.com\/*",
        "*:\/\/zhuanlan.zhihu.com\/*"
    ],
    "license": packageInfo.license,
    "icon": "https://static.zhihu.com/heifetz/favicon.ico",
    "grant": "none",
}