import type { AuthorType } from "./types"

/**
 * Converts a Zhihu link to a normal link.
 * @param link - The Zhihu link to convert.
 * @returns The converted normal link.
 */
export const ZhihuLink2NormalLink = (link: string): string => {
    const url = new URL(link)
    if (url.hostname == "link.zhihu.com") {
        const target = new URLSearchParams(url.search).get("target")
        return decodeURIComponent(target)
    }
    else {
        if (link.match(/#/)) return '#' + link.split('#')[1]
        else return link
    }
}


/**
 * Get the title of the dom.
 * @param dom - The dom to get title.
 * @returns The title of the dom.
 */
export const getTitle = (dom: HTMLElement, scene: string, type: string) => {
    let t
    if (scene == "follow" || scene == "people" || scene == "collection" || scene == "pin") {
        let title_dom = ((dom.closest('.ContentItem') as HTMLElement).querySelector("h2.ContentItem-title a") as HTMLElement)
        if (type == "answer" || type == "article") {
            //搜索结果页最新讨论
            !title_dom ? title_dom = ((dom.closest('.HotLanding-contentItem') as HTMLElement).querySelector("h2.ContentItem-title a") as HTMLElement) : 0
            t = title_dom.innerText

        }
        else {//想法
            if (title_dom) {
                t = "想法：" + title_dom.innerText + '-' + dom.innerText.slice(0, 16).trim().replace(/\s/g, "")
            } else t = "想法：" + dom.innerText.slice(0, 24).trim().replace(/\s/g, "")
        }
    }
    //问题/回答
    else if (scene == "question" || scene == "answer") {
        t = ((dom.closest('.QuestionPage') as HTMLElement).querySelector("meta[itemprop=name]") as HTMLMetaElement).content
    }
    //文章
    else if (scene == "article") {
        t = ((dom.closest('.Post-Main') as HTMLElement).querySelector("h1.Post-Title") as HTMLElement).innerText
    }
    else t = "无标题"
    //替换英文问号为中文问号，因标题中间也可能有问号所以不去掉
    return t.replace(/\?/g, "？").replace(/\/|\\|<|>|"|\*|\?|\||\:/g, "-")
}

/**
 * Get the author of the dom.
 * @param dom - The dom to get author.
 * @returns The author of the dom.
 */
export const getAuthor = (dom: HTMLElement, scene: string, type: string): AuthorType => {
    let author_dom
    //寻找包含昵称+链接+签名的节点

    if (scene == "follow") {
        let p = dom.closest('.ContentItem') as HTMLElement
        //唯独关注页作者在ContentItem外面，原创内容没有作者栏
        author_dom = p.querySelector(".AuthorInfo-content") ||
            (dom.closest('.Feed') as HTMLElement).querySelector(".FeedSource .AuthorInfo-content") ||
            (dom.closest('.Feed') as HTMLElement).querySelector(".FeedSource-firstline")
    }
    ///个人/问题/回答/想法/收藏夹
    else if (scene == "people" || scene == "question" || scene == "answer" || scene == "pin" || scene == "collection") {
        let p = dom.closest('.ContentItem') as HTMLElement
        author_dom = p.querySelector(".AuthorInfo-content")
    }
    //文章
    else if (scene == "article") {
        author_dom = (dom.closest('.Post-Main') as HTMLElement).querySelector(".Post-Author")
    }

    if (author_dom) {
        let authorName_dom = author_dom.querySelector(".AuthorInfo-name .UserLink-link") as HTMLAnchorElement ||
            author_dom.querySelector(".UserLink-link") as HTMLAnchorElement ||
            author_dom.querySelector(".UserLink.AuthorInfo-name")//匿名用户
        let authorBadge_dom = author_dom.querySelector(".AuthorInfo-badge") as HTMLDivElement
        //console.log("authorName_dom", authorName_dom)
        return {
            name: authorName_dom.innerText || (authorName_dom.children[0] ? authorName_dom.children[0].getAttribute("alt") : ''),//???//没有名字的用户https://www.zhihu.com/people/8-90-74/answers
            url: authorName_dom.href,
            badge: authorBadge_dom ? authorBadge_dom.innerText : ""
        }
    }
    else console.error("未找到author_dom")
}

/**
 * Get the URL of the dom.
 * 应该按每个内容获取URL，而非目前网址
 * @param dom - The dom to get URL.
 * @returns The URL of the dom.
 */
export const getURL = (dom: HTMLElement, scene: string, type: string): string => {
    let url
    //文章/想法/回答
    if (scene == "article" || scene == "pin" || scene == "answer") {
        url = window.location.href
        let q = url.match(/\?/) ? url.match(/\?/).index : 0
        if (q) url = url.slice(0, q)
        return url
    }
    //关注/个人/问题/等
    // if (scene == "follow" || scene == "people" || scene == "question")
    else {
        if (type == "answer" || type == "article") {
            //普通
            let p = dom.closest('.ContentItem') as HTMLElement
            let url_dom = (p.querySelector(".ContentItem>meta[itemprop=url]") as any)
            //搜索结果页
            if (!url_dom) {
                url_dom = p.querySelector(".ContentItem h2 a")
            }
            //搜索结果页最新讨论
            if (!url_dom) {
                p = dom.closest('.HotLanding-contentItem') as HTMLElement
                url_dom = p.querySelector(".ContentItem h2 a")
            }
            url = url_dom.content || (url_dom.href)
            if (url.slice(0, 5) != "https") url = "https:" + url
            return url
        }
        //pin
        else {
            let zopdata = (dom.closest('.ContentItem') as HTMLElement).getAttribute("data-zop")
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
export const getTime = async (dom: HTMLElement, scene: string, type?: string): Promise<{
    created: string,
    modified: string
}> => {
    //关注/个人/问题/回答页
    //if (scene == "follow" || scene == "people" || scene == "question" || scene == "answer") {//收藏夹
    //  if (type != "" || type == "article") {
    let created, modified, time_dom
    if (scene != "article") {
        time_dom = (dom.closest('.ContentItem') as HTMLElement).querySelector(".ContentItem-time") as HTMLElement
        created = time_dom.querySelector("span").getAttribute("data-tooltip").slice(4)//2023-12-30 16:12
        modified = time_dom.querySelector("span").innerText.slice(4)
        return { created, modified }
    }
    else {//文章
        time_dom = (dom.closest('.Post-content') as HTMLElement).querySelector(".ContentItem-time") as HTMLElement
        modified = time_dom.childNodes[0].textContent.slice(4)
        time_dom.click()
        await new Promise<void>((resolve) => {
            setTimeout(() => {
                resolve()
            }, 1000)
        })
        created = time_dom.childNodes[0].textContent.slice(4)
        time_dom.click()
        return { created, modified }
    }
    //  }
    //}
}

export const getUpvote = (dom: HTMLElement, scene: string | null, type: string): number => {
    //关注/个人/问题/回答页
    //if (scene == "follow" || scene == "people" || scene == "question" || scene == "answer") {//收藏夹
    //up_dom = (getParent(dom, "ContentItem") as HTMLElement).querySelector(".VoteButton--up") as HTMLElement//\n赞同 5.6 万
    let upvote, up_dom
    if (type == "pin") {
        //个人页的想法有2层ContentItem-actions，想法页有1层
        up_dom = (dom.closest('.ContentItem') as HTMLElement).querySelector(".ContentItem-actions>.ContentItem-actions") ||
            (dom.closest('.ContentItem') as HTMLElement).querySelector(".ContentItem-actions") as HTMLElement
        up_dom = up_dom.childNodes[0]
        upvote = up_dom.textContent.replace(/,|\u200B/g, '').slice(3)//0, -4
        upvote ? 0 : upvote = 0
    }
    else if (scene == "article") {
        up_dom = (dom.closest('.Post-content') as HTMLElement).querySelector(".VoteButton--up")
        upvote = up_dom.textContent.replace(/,|\u200B/g, '').slice(3)
        upvote ? 0 : upvote = 0
    }
    else {
        let zaedata = (dom.closest('.ContentItem') as HTMLElement).getAttribute("data-za-extra-module")
        //搜索结果页
        if (window.location.href.includes('/search?')) {
            upvote = (dom.closest('.RichContent') as HTMLElement).querySelector(".VoteButton--up").getAttribute('aria-label').slice(3) || 0
        }
        else upvote = JSON.parse(zaedata).card.content.upvote_num
    }
    return parseInt(upvote)
    //  }
    //}
}

export const getCommentNum = (dom: HTMLElement, scene: string, type: string): number => {
    //关注/个人/问题/回答页
    //if (scene == "follow" || scene == "people" || scene == "question" || scene == "answer") {//收藏夹
    let cm, cm_dom, p
    //被展开的评论区
    p = (dom.closest('.ContentItem') as HTMLElement)
    p ? cm_dom = p.querySelector(".css-1k10w8f") : 0
    if (cm_dom) {
        cm = cm_dom.textContent.replace(/,|\u200B/g, "").slice(0, -4)
    }
    else if (type == "pin") {
        cm_dom = (dom.closest('.ContentItem') as HTMLElement).querySelector(".ContentItem-actions>.ContentItem-actions") ||
            (dom.closest('.ContentItem') as HTMLElement).querySelector(".ContentItem-actions") as HTMLElement
        cm_dom = cm_dom.childNodes[1]
        cm = cm_dom.textContent.replace(/,|\u200B/g, "").slice(0, -4)
        cm ? 0 : cm = 0
    }
    else if (scene == "article") {
        cm_dom = (dom.closest('.Post-content') as HTMLElement).querySelector(".BottomActions-CommentBtn")
        cm = cm_dom.textContent.replace(/,|\u200B/g, '').slice(0, -4)
        cm ? 0 : cm = 0
    }
    else {
        let zaedata = (dom.closest('.ContentItem') as HTMLElement).getAttribute("data-za-extra-module")
        //搜索结果页
        if (window.location.href.includes('/search?')) {
            cm_dom = (dom.closest('.RichContent') as HTMLElement).querySelector("button.ContentItem-action")
            cm = cm_dom.textContent.replace(/,|\u200B/g, "").slice(0, -4)
        }
        else cm = JSON.parse(zaedata).card.content.comment_num
    }
    return parseInt(cm)
    //  }
    //}
}

export const getRemark = (dom: HTMLElement): string => {
    let remark, p = dom.closest('.ContentItem')//文章页没有，remark = remark.replace(/\/|\\|<|>|"|\*|\?|\||\:/g, "-")
    if (!p) p = dom.closest('.PinItem')
    if (!p) p = dom.closest('.Post-content')
    if (p) remark = (p.querySelector("textarea.to-remark") as HTMLInputElement).value.replace(/\s/g, "-")
    if (remark.match(/\/|\\|<|>|"|\*|\?|\||\:/g)) return "非法备注"
    return remark
}

/**
 * 获取是否需要保存评论，用于截图，zip
 */
export const getCommentSwitch = (dom: HTMLElement): boolean => {
    let s, p = dom.closest('.ContentItem')
    if (!p) p = dom.closest('.PinItem')
    if (!p) p = dom.closest('.Post-content')
    if (p) s = (p.querySelector("input.to-cm") as HTMLInputElement).checked
    return s
}
