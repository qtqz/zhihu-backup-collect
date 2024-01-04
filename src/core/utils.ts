import { stringify } from "querystring"
import type { AuthorType } from "./types"

/**
 * Converts a Zhihu link to a normal link.
 * @param link - The Zhihu link to convert.
 * @returns The converted normal link.
 */
export const ZhihuLink2NormalLink = (link: string): string => {
    console.log(link)
    const url = new URL(link)

    if (url.hostname == "link.zhihu.com") {
        const target = new URLSearchParams(url.search).get("target")
        console.log(decodeURIComponent(target))
        return decodeURIComponent(target)
    }
    return link
}


/**
 * Get the parent dom with the class name.
 * @param dom - The dom to get parent.
 * @param className - The class name of the parent.
 * @returns The parent dom.Maybe it's itself.
 */
export const getParent = (dom: HTMLElement, className: string): HTMLElement | false => {
    if (dom == null) return false
    if (dom.classList.contains(className)) return dom
    else return getParent(dom.parentElement, className)
}


/**
 * Get the title of the dom.
 * @param dom - The dom to get title.
 * @returns The title of the dom.
 */
export const getTitle = (dom: HTMLElement, scene: String, type: String) => {
    if (scene == "follow" || scene == "people"|| scene =="collection") {
        if (type == "answer" || type == "article") {
            return ((getParent(dom, "ContentItem") as HTMLElement).querySelector("h2.ContentItem-title a") as HTMLElement).innerText
        }
        else {
            return dom.innerText.slice(0, 36).trim().replace(" ", "").replace(/\/|\\|<|>|"|\*|\?|\||\:/g, "-")
        }
    }
    //问题/回答
    else if (scene == "question" || scene == "answer") {
        return ((getParent(dom, "QuestionPage") as HTMLElement).querySelector("meta[itemprop=name]") as HTMLMetaElement).content
    }
    //文章
    else if (scene == "article") {
        return ((getParent(dom, "Post-Main") as HTMLElement).querySelector("h1.Post-Title") as HTMLElement).innerText
    }
    //想法
    else if (scene == "pin") {
        return document.title.slice(0, 36).trim().replace(" ", "").replace(/\/|\\|<|>|"|\*|\?|\||\:/g, "-")
    }
    else return "无标题"
}

/**
 * Get the author of the dom.
 * @param dom - The dom to get author.
 * @returns The author of the dom.
 */
export const getAuthor = (dom: HTMLElement, scene: String, type: String): AuthorType | null => {
    let author_dom
    try {
        //寻找包含昵称+链接+签名的节点

        //关注/个人/问题/回答/想法/收藏夹
        if (scene == "follow" || scene == "people" || scene == "question" || scene == "answer"||scene == "pin"|| scene =="collection") {
            let p = getParent(dom, "ContentItem") as HTMLElement
            //关注页原创内容没有作者栏
            author_dom = p.querySelector(".AuthorInfo-content") || (getParent(dom, "Feed") as HTMLElement).querySelector(".FeedSource-firstline")
        }
        //文章
        else if (scene == "article") {
            author_dom = (getParent(dom, "Post-Main") as HTMLElement).querySelector(".Post-Author")
        }
        
        if (author_dom) {
            let authorName_dom = author_dom.querySelector(".AuthorInfo-name .UserLink-link") as HTMLAnchorElement ||
                author_dom.querySelector(".UserLink-link") as HTMLAnchorElement
            let authorBadge_dom = author_dom.querySelector(".AuthorInfo-badgeText") as HTMLDivElement
            //console.log("authorName_dom", authorName_dom)
            return {
                name: authorName_dom.innerText || authorName_dom.children[0].getAttribute("alt"),
                url: authorName_dom.href,
                badge: authorBadge_dom ? authorBadge_dom.innerText : ""
            }
        }
        else console.error("未找到author_dom")
    } catch (e) {
        console.log(e)
    }
    return null
}

/**
 * Get the URL of the dom.
 * 应该按每个内容获取URL，而非目前网址
 * @param dom - The dom to get URL.
 * @returns The URL of the dom.
 */
export const getURL = (dom: HTMLElement, scene: String, type: String): string => {
    let url
    //文章/想法/回答
    if (scene == "article" || scene == "pin" || scene == "answer") {
        url = window.location.href
        let q = url.match(/\?/).index
        if (q) url = url.slice(0, q)
        return url
    }
    //关注/个人/问题/等
    // if (scene == "follow" || scene == "people" || scene == "question")
    else {
        if (type == "answer" || type == "article") {
            let p = getParent(dom, "ContentItem") as HTMLElement
            url = (p.querySelector("meta[itemprop=url]") as HTMLMetaElement).content
            if (url.slice(0, 5) != "https") url = "https:" + url
            url ? 0 : console.error("无url")
            return url
        }
        //pin
        else {
            let zopdata = (getParent(dom, "ContentItem") as HTMLElement).getAttribute("data-zop")
            return "https://www.zhihu.com/pin/" + JSON.parse(zopdata).itemId
        }
    }
}

/**
 * 
 * 时间：
 * 使用内容下显示的时间
 * 
 */
export const getTime = async (dom: HTMLElement, scene?: String, type?: String): Promise<{
    published: String,
    edited: String
}> => {
    //关注/个人/问题/回答页
    //if (scene == "follow" || scene == "people" || scene == "question" || scene == "answer") {//收藏夹
    //  if (type != "" || type == "article") {
    let published, edited, time_dom = (getParent(dom, "ContentItem") as HTMLElement).querySelector(".ContentItem-time") as HTMLElement
    if (time_dom.querySelector("span")) {
        published = time_dom.querySelector("span").getAttribute("data-tooltip").slice(4)//2023-12-30 16:12
        edited = time_dom.querySelector("span").innerText.slice(4)
        return { published, edited }
    }
    else {//文章
        edited = time_dom.childNodes[0].textContent.slice(4)
        time_dom.click()
        await new Promise<void>((resolve) => {
            setTimeout(() => {
                resolve()
            }, 1000)
        })
        published = time_dom.childNodes[0].textContent.slice(4)
        time_dom.click()
        return { published, edited }
    }
    //  }
    //}
}


export const getUpvote = (dom: HTMLElement, scene: String | null, type: String): number => {
    //关注/个人/问题/回答页
    //if (scene == "follow" || scene == "people" || scene == "question" || scene == "answer") {//收藏夹
    //up_dom = (getParent(dom, "ContentItem") as HTMLElement).querySelector(".VoteButton--up") as HTMLElement//\n赞同 5.6 万
    let upvote, up_dom
    if (type == "pin") {
        up_dom = ((getParent(dom, "ContentItem") as HTMLElement).querySelector(".ContentItem-actions .ContentItem-actions") as HTMLElement).childNodes[0]
        upvote = up_dom.textContent.slice(0, -4)
        upvote ? 0 : upvote = "0"
    }
    else {
        let zaedata = (getParent(dom, "ContentItem") as HTMLElement).getAttribute("data-za-extra-module")
        upvote = JSON.parse(zaedata).card.content.upvote_num
    }
    return parseInt(upvote)
    //  }
    //}
}

export const getCommentNum = (dom: HTMLElement, scene: String, type: String): number => {
    //关注/个人/问题/回答页
    //if (scene == "follow" || scene == "people" || scene == "question" || scene == "answer") {//收藏夹
    let n, up_dom
    if (type == "pin") {
        up_dom = ((getParent(dom, "ContentItem") as HTMLElement).querySelector(".ContentItem-actions .ContentItem-actions") as HTMLElement).childNodes[1]
        n = up_dom.textContent.slice(0, -4).replace(",", "")
        n ? 0 : n = "0"
    }
    else {
        let zaedata = (getParent(dom, "ContentItem") as HTMLElement).getAttribute("data-za-extra-module")
        n = JSON.parse(zaedata).card.content.comment_num
    }
    return parseInt(n)
    //  }
    //}
}

export const getRemark = (dom: HTMLElement, scene?: String, type?: String): String => {
    let remark, p = getParent(dom, "ContentItem")//文章页没有remark = remark.replace(/\/|\\|<|>|"|\*|\?|\||\:/g, "-")
    if (!p) p = getParent(dom, "PinItem")
    if (!p) p = getParent(dom, "Post-content")
    if (p) remark = (p.querySelector(".to-remark input") as HTMLInputElement).value
    if (remark.match(/\/|\\|<|>|"|\*|\?|\||\:/g)) return "非法备注"
    return remark
    //  }
    //}
}