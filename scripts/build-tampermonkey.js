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
const UpdateLog = fs.readFileSync("./UpdateLog.txt", "utf-8").toString().split("\n").map((line) => {
    return ` * ${line}`
}).join("\n")


fs.writeFileSync("./dist/tampermonkey-script.js", `// ==UserScript==
${TampermonkeyConfig}
// ==/UserScript==

/** 更新日志
${UpdateLog}
 */

${UserScriptContent}`, "utf-8")