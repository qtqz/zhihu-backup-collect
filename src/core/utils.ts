import type { AuthorType } from "./types"

export const ZhihuLink2NormalLink = (link: string): string => {
    try {
        const url = new URL(link)
        if (url.hostname == "link.zhihu.com") {
            const target = new URLSearchParams(url.search).get("target")
            return decodeURIComponent(target || "")
        } else {
            if (link.match(/#/)) return '#' + link.split('#')[1]
            else return link
        }
    } catch (e) {
        return link
    }
}

export const getTitle = (dom: HTMLElement, scene?: string, type?: string): string => {
    try {
        // 1. Check Question Page (Answer pages like /question/123/answer/456)
        const qPage = dom.closest('.QuestionPage') || document.querySelector('.QuestionPage');
        if (qPage) {
            const metaName = qPage.querySelector('meta[itemprop=name]') as HTMLMetaElement;
            if (metaName && metaName.content) {
                return metaName.content.trim().replace(/\?/g, "？").replace(/\/|\\|<|>|"|\*|\||\:/g, "-");
            }
            const qTitle = qPage.querySelector('.QuestionHeader-title, h1.QuestionHeader-title') as HTMLElement;
            if (qTitle && qTitle.innerText) {
                return qTitle.innerText.trim().replace(/\?/g, "？").replace(/\/|\\|<|>|"|\*|\||\:/g, "-");
            }
        }

        // 2. Check Answer/Article Item in Feed/Lists/Collections
        const item = dom.closest('.AnswerItem') || dom.closest('.ArticleItem') || dom.closest('.ContentItem') || dom.closest('.Card');
        if (item) {
            const titleEl = item.querySelector('h2.ContentItem-title a, .ContentItem-title a, h2.ContentItem-title') as HTMLElement;
            if (titleEl && titleEl.innerText) {
                return titleEl.innerText.trim().replace(/\?/g, "？").replace(/\/|\\|<|>|"|\*|\||\:/g, "-");
            }
        }

        // 3. Check Zhuanlan Post/Article
        const postMain = dom.closest('.Post-Main') || document.querySelector('.Post-Main');
        if (postMain) {
            const postTitle = postMain.querySelector('h1.Post-Title') as HTMLElement;
            if (postTitle && postTitle.innerText) {
                return postTitle.innerText.trim().replace(/\?/g, "？").replace(/\/|\\|<|>|"|\*|\||\:/g, "-");
            }
        }

        // 4. Global Meta & H1 Fallback
        const globalMeta = document.querySelector('meta[itemprop=name]') as HTMLMetaElement;
        if (globalMeta && globalMeta.content) {
            return globalMeta.content.trim().replace(/\?/g, "？").replace(/\/|\\|<|>|"|\*|\||\:/g, "-");
        }

        const globalH1 = document.querySelector('h1.QuestionHeader-title, h1.Post-Title') as HTMLElement;
        if (globalH1 && globalH1.innerText) {
            return globalH1.innerText.trim().replace(/\?/g, "？").replace(/\/|\\|<|>|"|\*|\||\:/g, "-");
        }
    } catch (e) {}
    return "无标题";
}

export const getAuthor = (dom: HTMLElement, scene?: string, type?: string): AuthorType => {
    try {
        let item = dom.closest('.ContentItem') || dom.closest('.Post-Main') || dom.closest('.PinItem') || dom;
        if (item) {
            let authorName_dom = item.querySelector(".AuthorInfo-name .UserLink-link, .UserLink-link, .AuthorInfo-name") as HTMLElement;
            let authorBadge_dom = item.querySelector(".AuthorInfo-badge, .AuthorInfo-badgeText") as HTMLElement;
            if (authorName_dom) {
                let href = (authorName_dom as HTMLAnchorElement).href || "";
                let name = authorName_dom.innerText || (authorName_dom.children[0] ? authorName_dom.children[0].getAttribute("alt") || "" : "");
                return {
                    name: name.trim() || "匿名用户",
                    url: href,
                    badge: authorBadge_dom ? authorBadge_dom.innerText.trim() : ""
                };
            }
        }
    } catch (e) {}
    return { name: "匿名用户", url: "", badge: "" };
}

export const getURL = (dom: HTMLElement, scene?: string, type?: string): string => {
    try {
        if (window.location.pathname === "/") {
            let item = dom.closest('.ContentItem') || dom.closest('.AnswerItem') || dom.closest('.ArticleItem');
            if (item) {
                let a = item.querySelector("a[data-za-detail-view-id]") as HTMLAnchorElement;
                if (a && a.href) return a.href;
            }
        }
    } catch (e) {}
    return window.location.origin + window.location.pathname;
}

export const getTime = async (dom: HTMLElement, scene?: string) => {
    try {
        let item = dom.closest('.ContentItem') || dom.closest('.Post-content') || dom.closest('.PinItem') || dom;
        let timeEl = item.querySelector('.ContentItem-time, .Post-Time, .PinItem-time, .ContentItem-status');
        if (timeEl) {
            let text = (timeEl as HTMLElement).innerText.replace(/\s+/g, ' ').trim();
            return { created: text, modified: text };
        }
    } catch (e) {}
    return { created: "", modified: "" };
}

export const getUpvote = (dom: HTMLElement, scene?: string, type?: string): string => {
    try {
        let item = dom.closest('.ContentItem') || dom.closest('.Post-content') || dom.closest('.PinItem') || dom;
        let up = item.querySelector('.VoteButton--up, .AnswerItem-extraInfo, button[aria-label*="赞同"]');
        if (up) return (up as HTMLElement).innerText.replace(/\s+/g, ' ').trim();
    } catch (e) {}
    return "";
}

export const getCommentNum = (dom: HTMLElement, scene?: string, type?: string): string => {
    try {
        let item = dom.closest('.ContentItem') || dom.closest('.Post-content') || dom;
        let btn = item.querySelector('.ContentItem-actions button:has(.Zi--comment)');
        if (btn) return btn.textContent || "";
    } catch (e) {}
    return "";
}

export const getRemark = (dom: HTMLElement): string => {
    try {
        let wrap = dom.closest('.zhihubackup-wrap') || dom.closest('.zhcollect-minimal-btns');
        if (wrap) {
            let ta = wrap.querySelector('.to-remark') as HTMLTextAreaElement;
            if (ta) return ta.value;
        }
    } catch (e) {}
    return "";
}

export const getCommentSwitch = (dom: HTMLElement): boolean => {
    try {
        let wrap = dom.closest('.zhihubackup-wrap');
        if (wrap) {
            let cb = wrap.querySelector('.to-cm') as HTMLInputElement;
            if (cb) return cb.checked;
        }
    } catch (e) {}
    return false;
}

export const getLocation = (dom: HTMLElement, scene?: string, type?: string): string => {
    return "";
}
