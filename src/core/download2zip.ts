import * as JSZip from "jszip"
import { sanitizeFilename } from "./utils"

/**
 * 下载文件并将其添加到zip文件中
 * @param url 下载文件的URL
 * @param zip JSZip对象，用于创建zip文件
 * @returns 添加了下载文件的zip文件
 */
export async function downloadAndZip(url: string, zip: JSZip): Promise<{ zip: JSZip, file_name: string }> {
    const response = await fetch(url)
    if (!response.ok) {
        throw new Error(`HTTP ${response.status} while downloading ${url}`)
    }

    const arrayBuffer = await response.arrayBuffer()
    let fileName = "download"

    try {
        const base = typeof window !== "undefined" ? window.location.href : undefined
        const parsedUrl = new URL(url, base)
        const rawName = parsedUrl.pathname.split("/").pop() || "download"
        try {
            fileName = decodeURIComponent(rawName)
        } catch {
            fileName = rawName
        }
    } catch {
        // Keep the fallback name for malformed or non-URL sources.
    }

    fileName = sanitizeFilename(fileName)

    if (/\.image$/i.test(fileName)) fileName += ".jpg"

    // Different remote files frequently share a basename. JSZip overwrites an
    // existing entry, so keep each downloaded asset addressable in the ZIP.
    const originalName = fileName
    let suffix = 1
    while (zip.file(fileName)) {
        const extensionIndex = originalName.lastIndexOf(".")
        const stem = extensionIndex > 0 ? originalName.slice(0, extensionIndex) : originalName
        const extension = extensionIndex > 0 ? originalName.slice(extensionIndex) : ""
        fileName = `${stem}-${suffix++}${extension}`
    }

    // 添加到zip文件
    zip.file(fileName, arrayBuffer)
    return { zip, file_name: fileName }
}

/**
 * 下载一系列文件并将其添加到zip文件中
 * @param urls 下载文件的URL
 * @param zip JSZip对象，用于创建zip文件
 * @returns 添加了下载文件的zip文件
 */
export async function downloadAndZipAll(urls: string[], zip: JSZip): Promise<JSZip> {
    for (let url of urls) zip = (await downloadAndZip(url, zip)).zip
    return zip
}
