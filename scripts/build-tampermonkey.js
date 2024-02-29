import fs from "fs"
import { UserScript, UserScriptContent } from "../TampermonkeyConfig.js"


// Padding 长度
const paddingLength = Object.entries(UserScript).reduce((maxLength, [key]) => {
    return Math.max(maxLength, key.length)
}, 0) + 1

// Tampermonkey UserScript Config
const TampermonkeyConfig = Object.entries(UserScript).map(([key, value]) => {
    if (!value) return

    if (typeof value == "object")
        return Object.entries(value).map(([_key, value]) => {
            return `// @${key.padEnd(paddingLength, " ")} ${value}`
        }).join("\n")

    return `// @${key.padEnd(paddingLength, " ")} ${value}`

}).filter((val) => val).join("\n")

//readme
const readme = fs.readFileSync("./README.md", "utf-8").toString().replace(/# .*?\n/s,'').replace(/## Dev.*?(?=##)/s,'').replace(/<!--.*-->/gs,'')

fs.writeFileSync("./dist/tampermonkey.md", `
源代码：https://github.com/qtqz/zhihu-backup-collect
修改自：[知乎下载器](https://greasyfork.org/zh-CN/scripts/478608-%E7%9F%A5%E4%B9%8E%E4%B8%8B%E8%BD%BD%E5%99%A8)

${readme}

`, "utf-8")

//?(?=(##)?)
fs.writeFileSync("./dist/tampermonkey-script.js", `// ==UserScript==
${TampermonkeyConfig}
// ==/UserScript==

/** 
${readme.match(/## Changelog.*/s)[0]}
 */

${UserScriptContent}`, "utf-8")