import fs from "fs"

const packageJson = JSON.parse(fs.readFileSync("./package.json"))
const version = packageJson.version.split(".").map((val) => parseInt(val))

version[version.length - 1] += 1

packageJson.version = version.join(".")

fs.writeFileSync("./package.json", JSON.stringify(packageJson, null, 2))