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

// 更新日志
const UpdateLog = fs.readFileSync("./changelog.txt", "utf-8").toString().split("\n").map((line) => {
    return ` * ${line}`
}).join("\n")

//readme
const readme = fs.readFileSync("./README.md", "utf-8").toString().replace(/# .*?\n/s,'').replace(/## Dev.*?(?=##)/s,'').replace(/<!--.*-->/gs,'')

fs.writeFileSync("./dist/tampermonkey.md", `
源代码：https://github.com/qtqz/zhihu-backup-collect
修改自：[知乎下载器](https://greasyfork.org/zh-CN/scripts/478608-%E7%9F%A5%E4%B9%8E%E4%B8%8B%E8%BD%BD%E5%99%A8)

${readme}

## 更新日志

\`\`\`text
${UpdateLog}
\`\`\`

`, "utf-8")


fs.writeFileSync("./dist/tampermonkey-script.js", `// ==UserScript==
${TampermonkeyConfig}
// ==/UserScript==

/** 更新日志
${UpdateLog}
 */

/* 我使用了webpack打包，已经禁用了最小化：设置optimization: minimize: false且禁用了UglifyJsPlugin*/
/* I used webpack packaging and have disabled minimization: set optimization: minimize: false and disabled UglifyJsPlugin*/

${UserScriptContent}`, "utf-8")