import type { AuthorType } from "./types"

const textOf = (element: Element | null | undefined): string =>
    element?.textContent?.trim() || ""

const parseJsonObject = (value: string | null): Record<string, any> | null => {
    if (!value) return null
    try {
        const parsed = JSON.parse(value)
        return parsed && typeof parsed === "object" ? parsed : null
    } catch {
        return null
    }
}

const parseMetric = (value: unknown): number => {
    if (typeof value === "number" && Number.isFinite(value)) return value
    const parsed = Number.parseInt(String(value ?? "").replace(/[,\u200B]/g, ""), 10)
    return Number.isFinite(parsed) ? parsed : 0
}

/**
 * Make a user- or page-provided name safe for a single filesystem path segment.
 * The same normalization is used for downloaded ZIP assets and direct files so
 * that Markdown links keep pointing at the actual saved names.
 */
export const sanitizeFilename = (filename: unknown): string => {
    if (typeof filename !== "string") return "untitled"

    let safe = filename
        .replace(/[\x00-\x1f\x7f-\x9f]/g, "")
        .replace(/[<>:"/\\|?*]/g, "-")
        .replace(/[\u200B-\u200D\uFEFF]/g, "")
        .replace(/\s+/g, " ")
        .trim()
        .replace(/\.{2,}/g, ".")
        .replace(/^[.\s]+|[.\s]+$/g, "")
        .slice(0, 200)
        .replace(/[.\s]+$/g, "")

    if (/^(con|prn|aux|nul|com[1-9]|lpt[1-9])(?:\..*)?$/i.test(safe)) {
        safe = `_${safe}`
    }
    return safe || "untitled"
}

/**
 * Converts a Zhihu link to a normal link.
 * @param link - The Zhihu link to convert.
 * @returns The converted normal link.
 */
export const ZhihuLink2NormalLink = (link: string): string => {
    if (!link) return ""

    try {
        const base = typeof window !== "undefined" ? window.location.href : undefined
        const url = new URL(link, base)
        if (url.hostname == "link.zhihu.com") {
            const target = url.searchParams.get("target")
            if (!target) return link
            try {
                return decodeURIComponent(target)
            } catch {
                return target
            }
        }
        return url.hash ? url.hash : link
    } catch {
        return link
    }
}


/**
 * Get the title of the dom.
 * @param dom - The dom to get title.
 * @returns The title of the dom.
 */
export const getTitle = (dom: HTMLElement, scene: string, type: string): string => {
    let t = ""
    if (scene == "follow" || scene == "people" || scene == "collection" || scene == "pin") {
        const contentItem = dom.closest('.ContentItem')
        let title_dom = contentItem?.querySelector("h2.ContentItem-title a")
        if (type == "answer" || type == "article") {
            //搜索结果页最新讨论
            title_dom = title_dom || dom.closest('.HotLanding-contentItem')?.querySelector("h2.ContentItem-title a")
            t = textOf(title_dom)

        }
        else {//想法
            if (title_dom) {
                t = "想法：" + textOf(title_dom) + '-' + (dom.innerText || "").slice(0, 16).trim().replace(/\s/g, "")
            } else t = "想法：" + (dom.innerText || "").slice(0, 24).trim().replace(/\s/g, "")
        }
    }
    //问题/回答
    else if (scene == "question" || scene == "answer") {
        t = (dom.closest('.QuestionPage')?.querySelector("meta[itemprop=name]") as HTMLMetaElement | null)?.content || ""
    }
    //文章
    else if (scene == "article") {
        t = textOf(dom.closest('.Post-Main')?.querySelector("h1.Post-Title"))
    }
    else t = "无标题"
    t = t.trim() || "无标题"
    //替换英文问号为中文问号，因标题中间也可能有问号所以不去掉
    return sanitizeFilename(t.replace(/\?/g, "？"))
}

/**
 * Get the author of the dom.
 * @param dom - The dom to get author.
 * @returns The author of the dom.
 */
export const getAuthor = (dom: HTMLElement, scene: string, type: string): AuthorType => {
    let author_dom: Element | null = null
    //寻找包含昵称+链接+签名的节点

    if (scene == "follow") {
        let p = dom.closest('.ContentItem')
        //唯独关注页作者在ContentItem外面，原创内容没有作者栏
        author_dom = p?.querySelector(".AuthorInfo-content") ||
            dom.closest('.Feed')?.querySelector(".FeedSource .AuthorInfo-content") ||
            dom.closest('.Feed')?.querySelector(".FeedSource-firstline") || null
    }
    ///个人/问题/回答/想法/收藏夹
    else if (scene == "people" || scene == "question" || scene == "answer" || scene == "pin" || scene == "collection") {
        let p = dom.closest('.ContentItem')
        author_dom = p?.querySelector(".AuthorInfo-content") || null
        // 个人页的搜索结果的想法没有作者栏
        if (!author_dom && location.href.includes('search')) {
            author_dom = document.querySelector('.ProfileHeader-title')
            const profileChildren = author_dom?.children
            const profileUrl = location.href.match(/(https.*)\/search/)?.[1] || location.href
            return {
                name: textOf(profileChildren?.[0]),
                url: profileUrl,
                badge: textOf(profileChildren?.[1])
            }
        }
    }
    //文章
    else if (scene == "article") {
        author_dom = dom.closest('.Post-Main')?.querySelector(".Post-Author") || null
    }

    if (author_dom) {
        const authorName_dom = author_dom.querySelector(".AuthorInfo-name .UserLink-link") as HTMLAnchorElement | null ||
            author_dom.querySelector(".UserLink-link") as HTMLAnchorElement | null ||
            author_dom.querySelector(".UserLink.AuthorInfo-name") as HTMLAnchorElement | null //匿名用户
        const authorBadge_dom = author_dom.querySelector(".AuthorInfo-badge") as HTMLDivElement | null
        //console.log("authorName_dom", authorName_dom)
        return {
            name: authorName_dom?.innerText?.trim() || authorName_dom?.textContent?.trim() ||
                authorName_dom?.children[0]?.getAttribute("alt") || "匿名用户",
            url: authorName_dom?.href || authorName_dom?.getAttribute("href") || "",
            badge: authorBadge_dom?.innerText?.trim() || authorBadge_dom?.textContent?.trim() || ""
        }
    }
    console.error("未找到author_dom")
    return { name: "匿名用户", url: "", badge: "" }
}

/**
 * Get the URL of the dom.
 * 应该按每个内容获取URL，而非目前网址
 * @param dom - The dom to get URL.
 * @returns The URL of the dom.
 */
export const getURL = (dom: HTMLElement, scene: string, type: string): string => {
    const currentUrl = window.location.href.split("?")[0]
    //文章/想法/回答
    if (scene == "article" || scene == "pin" || scene == "answer") {
        return currentUrl
    }
    //关注/个人/问题/等
    // if (scene == "follow" || scene == "people" || scene == "question")
    else {
        if (type == "answer" || type == "article") {
            //普通
            let p = dom.closest('.ContentItem')
            let url_dom: Element | null = p?.querySelector(".ContentItem>meta[itemprop=url]") || null
            //搜索结果页
            if (!url_dom) {
                url_dom = p?.querySelector(".ContentItem h2 a") || null
            }
            //搜索结果页最新讨论
            if (!url_dom) {
                p = dom.closest('.HotLanding-contentItem')
                url_dom = p?.querySelector(".ContentItem h2 a") || null
            }
            const rawUrl = (url_dom as any)?.content || (url_dom as any)?.href
            if (!rawUrl) return currentUrl
            try {
                return new URL(rawUrl, window.location.href).href
            } catch {
                return rawUrl
            }
        }
        //pin
        else {
            const zopdata = parseJsonObject(dom.closest('.ContentItem')?.getAttribute("data-zop"))
            return zopdata?.itemId ? "https://www.zhihu.com/pin/" + zopdata.itemId : currentUrl
        }
    }
}

/**
 * 
 * 时间：
 * 使用内容下显示的时间
 * 
 */
export const getTime = async (dom: HTMLElement, scene: string, type?: string): Promise<{
    created: string,
    modified: string
}> => {
    //关注/个人/问题/回答页
    //if (scene == "follow" || scene == "people" || scene == "question" || scene == "answer") {//收藏夹
    //  if (type != "" || type == "article") {
    const stripTimePrefix = (value: string): string => value.replace(/^发布于\s*/, "").trim()
    if (scene != "article") {
        const timeDom = dom.closest('.ContentItem')?.querySelector(".ContentItem-time")
        const link = timeDom?.querySelector("a") as HTMLAnchorElement | null
        const tooltip = link?.getAttribute("data-tooltip") || ""
        const visible = link?.innerText || link?.textContent || ""
        return {
            created: stripTimePrefix(tooltip),
            modified: stripTimePrefix(visible)
        }
    }
    else {//文章
        const timeDom = dom.closest('.Post-content')?.querySelector(".ContentItem-time") as HTMLElement | null
        if (!timeDom) return { created: "", modified: "" }

        const readTime = (): string => stripTimePrefix(timeDom.childNodes[0]?.textContent || timeDom.textContent || "")
        const modified = readTime()
        let toggled = false
        try {
            timeDom.click()
            toggled = true
            await new Promise<void>((resolve) => setTimeout(resolve, 1000))
            return { created: readTime(), modified }
        } catch {
            return { created: modified, modified }
        } finally {
            if (toggled) timeDom.click()
        }
    }
    //  }
    //}
}

export const getUpvote = (dom: HTMLElement, scene: string | null, type: string): number => {
    //关注/个人/问题/回答页
    //if (scene == "follow" || scene == "people" || scene == "question" || scene == "answer") {//收藏夹
    //up_dom = (getParent(dom, "ContentItem") as HTMLElement).querySelector(".VoteButton--up") as HTMLElement//\n赞同 5.6 万
    let upvote: unknown = 0
    if (type == "pin") {
        //个人页的想法有2层ContentItem-actions，想法页有1层
        const contentItem = dom.closest('.ContentItem')
        const actionGroup = contentItem?.querySelector(".ContentItem-actions>.ContentItem-actions") ||
            contentItem?.querySelector(".ContentItem-actions")
        const action = actionGroup?.childNodes[0]
        upvote = action?.textContent?.replace(/,|\u200B/g, '').slice(3) || 0//0, -4
    }
    else if (scene == "article") {
        const action = dom.closest('.Post-content')?.querySelector(".ContentItem-actions .VoteButton")
        upvote = action?.textContent?.replace(/,|\u200B/g, '').slice(3) || 0
    }
    else {
        const contentItem = dom.closest('.ContentItem')
        //搜索结果页
        if (window.location.href.includes('/search?')) {
            const label = dom.closest('.RichContent')?.querySelector(".ContentItem-actions .VoteButton")?.getAttribute('aria-label') || ""
            upvote = label.slice(3)
        }
        else upvote = parseJsonObject(contentItem?.getAttribute("data-za-extra-module"))?.card?.content?.upvote_num || 0
    }
    return parseMetric(upvote)
    //  }
    //}
}

export const getCommentNum = (dom: HTMLElement, scene: string, type: string): number => {
    //关注/个人/问题/回答页
    //if (scene == "follow" || scene == "people" || scene == "question" || scene == "answer") {//收藏夹
    let cm: unknown = 0
    let cm_dom: Element | null = null
    //被展开的评论区
    const p = dom.closest('.ContentItem')
    cm_dom = p?.querySelector(".css-1k10w8f") || null
    if (cm_dom) {
        cm = cm_dom.textContent?.replace(/,|\u200B/g, "").slice(0, -4) || 0
    }
    else if (type == "pin") {
        const contentItem = dom.closest('.ContentItem')
        const actionGroup = contentItem?.querySelector(".ContentItem-actions>.ContentItem-actions") ||
            contentItem?.querySelector(".ContentItem-actions")
        cm_dom = actionGroup?.childNodes[1] as Element | null
        cm = cm_dom?.textContent?.replace(/,|\u200B/g, "").slice(0, -4) || 0
    }
    else if (scene == "article") {
        cm_dom = dom.closest('.Post-content')?.querySelector(".BottomActions-CommentBtn") || null
        cm = cm_dom?.textContent?.replace(/,|\u200B/g, '').slice(0, -4) || 0
    }
    else {
        const contentItem = dom.closest('.ContentItem')
        //搜索结果页
        if (window.location.href.includes('/search?')) {
            cm_dom = dom.closest('.RichContent')?.querySelector("button.ContentItem-action") || null
            cm = cm_dom?.textContent?.replace(/,|\u200B/g, "").slice(0, -4) || 0
        }
        else cm = parseJsonObject(contentItem?.getAttribute("data-za-extra-module"))?.card?.content?.comment_num || 0
    }
    return parseMetric(cm)
    //  }
    //}
}

export const getRemark = (dom: HTMLElement): string => {
    let remark = "", p = dom.closest('.ContentItem')//文章页没有，remark = remark.replace(/\/|\\|<|>|"|\*|\?|\||\:/g, "-")
    if (!p) p = dom.closest('.PinItem')
    if (!p) p = dom.closest('.Post-content')
    const input = p?.querySelector("textarea.to-remark") as HTMLInputElement | null
    if (input) remark = input.value.replace(/\s/g, "-")
    if (remark.match(/\/|\\|<|>|"|\*|\?|\||\:/g)) return "非法备注"
    return remark
}

/**
 * 获取是否需要保存评论，用于截图，zip
 */
export const getCommentSwitch = (dom: HTMLElement): boolean => {
    let p = dom.closest('.ContentItem')
    if (!p) p = dom.closest('.PinItem')
    if (!p) p = dom.closest('.Post-content')
    return (p?.querySelector("input.to-cm") as HTMLInputElement | null)?.checked || false
}

/**
 * Get the Location of the dom.
 * @param dom - The dom.
 * @returns string | null
 */
export const getLocation = (dom: HTMLElement, scene: string, type: string): string | null => {
    let location: string | null = null, el = dom.closest('.ContentItem')//想法类型、文章页没有
    if (!el) el = dom.closest('.PinItem')
    if (!el) el = dom.closest('.Post-content')
    try {
        if (el) {
            const time = el.querySelector('.ContentItem-time')
            location = time?.childNodes[1]?.textContent?.slice(6) || null
        }
        if (!location && scene == "people") {
            const profileName = document.querySelector('.ProfileHeader-name')
            const name = profileName?.childNodes[0]?.textContent || ""
            if (name == getAuthor(dom, scene, type).name) {
                location = document.querySelector('.css-1xfvezd')?.textContent?.slice(5) || null
            }
        }
    } catch (e) {
        console.error('保存location出错', e)
    }
    return location
}
