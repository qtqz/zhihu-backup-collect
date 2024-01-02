import fs from "fs"

const dir = fs.readdirSync("./test")

for (const file of dir) {
    if (file.endsWith(".html")) {
        const html = fs.readFileSync(`./test/${file}`, "utf-8")
            .toString()
            .replace(/<script .*?>.*?<\/script>/gs, "")
        fs.writeFileSync(`./test/${file}`, html)
    }
}