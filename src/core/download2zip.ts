import * as JSZip from "jszip"

/**
 * 下载文件并将其添加到zip文件中
 * @param url 下载文件的URL
 * @param zip JSZip对象，用于创建zip文件
 * @returns 添加了下载文件的zip文件
 */
export async function downloadAndZip(url: string, zip: JSZip): Promise<{ zip: JSZip, file_name: string }> {

    const response = await fetch(url)
    const arrayBuffer = await response.arrayBuffer()
    let fileName = url.replace(/\?.*?$/g, "").split("/").pop()
    fileName.endsWith('.image') ? fileName += '.jpg' : 0

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