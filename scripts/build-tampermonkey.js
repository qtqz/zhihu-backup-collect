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

${UserScriptContent}`, "utf-8")