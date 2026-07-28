// 在window对象上创建存储空间
//window.ArticleComments = window.ArticleComments || {};

class CommentParser {
    constructor(articleKey) {
        this.articleKey = articleKey;
        window.ArticleComments = window.ArticleComments || {};
        // 确保文章的评论存储空间存在
        const current = window.ArticleComments[articleKey];
        window.ArticleComments[articleKey] = current && current.comments instanceof Map ? current : {
            comments: new Map(), // 使用Map存储评论，key为评论ID
            lastUpdateTime: null
        };
    }

    /**
     * 解析单条评论
     * @param {Element} commentElement - 评论元素
     * @returns {Object} 解析后的评论对象
     */
    parseComment(commentElement) {
        const commentId = commentElement.getAttribute('data-id');

        // 查找评论作者与被回复者。知乎评论 DOM 经常会增加一层包装，所有节点都按可选值处理。
        const authorContainer = commentElement.children[0]?.children[1]?.children[0] ||
            commentElement.querySelector('.CommentItem-meta, .AuthorInfo');
        const authorElement = authorContainer?.querySelectorAll('a') || [];
        const author = authorElement[0]?.textContent?.trim() ||
            commentElement.querySelector('.AuthorInfo-name, .UserLink-link')?.textContent?.trim() ||
            '匿名用户';
        let author2
        if (authorElement[1]) {
            author2 = authorElement[1].textContent?.trim()
        }

        // 查找评论内容
        const contentElement = commentElement.querySelector('.CommentContent');
        let textContentPlain = '' // string | string[]
        let img = ''
        Array.from(contentElement?.childNodes || []).forEach(node => {
            //评论内容最小元素
            if (node.nodeName == 'DIV') {
                if (node.classList.contains('comment_img') || node.classList.contains('comment_sticker')) {
                    const image = node.querySelector('img');
                    img = image?.getAttribute('data-original') || image?.getAttribute('src') || '';
                }
                else if (node.classList.contains('css-1gomreu')) {//评论中的@ answer/105002650041
                    const link = node.querySelector('a');
                    textContentPlain += link
                        ? '[' + (node.textContent || '') + '](' + ZhihuLink2NormalLink(link.href) + ')'
                        : node.textContent || '';
                }
            }
            else if (node.nodeName == 'IMG') textContentPlain += node.alt || ''//小表情
            else if (node.nodeName == 'A') {
                let link = ZhihuLink2NormalLink(node.href)
                textContentPlain += '[' + (node.textContent || '') + '](' + link + ')'
            }
            else if (node.nodeName == 'BR') textContentPlain += '\n'
            else if (node.nodeName == 'P') {//如果一条评论有且仅有多个小表情，会用P包裹，有时分段内容也会，还有带链接内容
                node.childNodes.forEach(c => {
                    if (c.nodeName == 'A') {
                        let link = ZhihuLink2NormalLink(c.href)
                        textContentPlain += '[' + (c.textContent || '') + '](' + link + ')'
                    }
                    else if (c.nodeName == 'BR') textContentPlain += '\n'
                    else textContentPlain += c.alt || c.textContent || ''
                })
            }
            else textContentPlain += node.textContent || ''
            //暂不处理图片，因为图片只会存在于文末。每条评论最多只有一张图片应该
        });

        let content = textContentPlain

        const timeElement = commentElement.querySelector('.css-12cl38p');
        const time = timeElement ? relativeToAbsoluteDate(timeElement.textContent || '') : '';

        const locationElement = commentElement.querySelector('.css-ntkn7q');
        const location = locationElement?.textContent?.trim() || '';

        const likeBox = commentElement.querySelector('.css-140jo2'),
            likeButton = likeBox?.querySelector('.css-1vd72tl') || likeBox?.querySelector('.css-1staphk') //赞过的
        const likeText = likeButton?.textContent || '';
        const likeMatch = likeText.match(/\d+/);
        const likes = likeMatch ? parseInt(likeMatch[0], 10) : 0

        //const isAuthor = !!commentElement.querySelector('.css-8v0dsd');

        return {
            id: commentId,
            author,
            content,
            time,
            location,
            likes,
            //isAuthor,
            img,
            beReplied: author2,
            parentId: null, // 将在后续处理中设置
            replies: [], // 子评论ID列表
            //updateTime: new Date().getTime()
        };
    }

    /**
     * 构建评论层级关系
     * @param {Element} container - 评论容器元素
     */
    buildCommentHierarchy(container) {
        const commentElements = Array.from(container.querySelectorAll('[data-id]'));
        const commentsData = window.ArticleComments[this.articleKey].comments;

        // 先完整收集评论，再统一建立父子关系，避免回复先于父评论出现在 DOM 时丢失关系。
        const parsedComments = [];
        commentElements.forEach(element => {
            const commentId = element.getAttribute('data-id');
            if (!commentId) return;

            const comment = this.parseComment(element);
            let parentElement;
            let isReplyComment = !!element.firstElementChild?.classList.contains('css-1kwt8l8');

            // 另一种情况，弹出框的回复评论（因回复太多而弹出的，和弹出框子页面的，非单纯弹出框）
            if (!isReplyComment) {
                isReplyComment = !!element.closest('.css-16zdamy');
                parentElement = container.querySelector('.css-tpyajk [data-id]');
            } else {
                parentElement = element.parentElement;
            }

            const parentCommentElement = isReplyComment ? parentElement?.closest('[data-id]') : null;
            const parentId = parentCommentElement?.getAttribute('data-id');
            if (parentId && parentId !== commentId) comment.parentId = parentId;
            parsedComments.push(comment);
        });

        parsedComments.forEach(comment => {
            const oldComment = commentsData.get(comment.id);
            commentsData.set(comment.id, oldComment ? {
                ...oldComment,
                ...comment,
                // 增量解析时新 DOM 可能暂时没有父评论上下文，保留已知关系。
                parentId: comment.parentId || oldComment.parentId || null,
                replies: []
            } : comment);
        });

        commentsData.forEach(comment => {
            comment.replies = [];
        });
        commentsData.forEach(comment => {
            if (!comment.parentId) return;
            const parentComment = commentsData.get(comment.parentId);
            if (parentComment && !parentComment.replies.includes(comment.id)) {
                parentComment.replies.push(comment.id);
            }
        });

        // 更新最后更新时间
        window.ArticleComments[this.articleKey].lastUpdateTime = new Date().getTime();
    }

    /**
     * 解析评论区
     * @param {string} selector - 评论容器的选择器
     * @param {HtmlElement} c - 评论容器 .Comments-container
     */
    parseComments(c) {
        const container = c || document.querySelector('.Comments-container');
        if (!container) {
            console.error('找不到评论容器');
            return;
        }
        this.buildCommentHierarchy(container);
    }

    /**
     * 获取评论数据
     * @returns {Object} 评论数据
     */
    getComments() {
        return window.ArticleComments[this.articleKey];
    }
}

const buttonContainer = document.createElement("div")
buttonContainer.innerHTML = `<div class="comment-parser-container">
    <button class="hint Button VoteButton" title="说明"><svg style="vertical-align: middle;" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10s-4.477 10-10 10m0-2a8 8 0 1 0 0-16a8 8 0 0 0 0 16M11 7h2v2h-2zm0 4h2v6h-2z"/></svg></button>
    &nbsp;<button class="save Button VoteButton">暂存此页评论</button>
    &nbsp;<button class="unsave Button VoteButton">清空暂存区</button>
    &nbsp;<button class="sum Button VoteButton">查看暂存数</button></div>`
buttonContainer.classList.add("comment-parser-container-wrap")
buttonContainer.style.position = "absolute"
buttonContainer.style.right = "20%"

const HINT = '此为评论解析器，用于暂存评论，以便后续保存\n每次点击会暂存当前页评论，支持弹出框，支持增量保存（自动去重），评论顺序取决于暂存顺序\n暂存的评论仅当前页可用，在页面刷新后会消失'
/**
 * 1 获取评论容器
 * 4 获取回答唯一KEY
 * 3 添加按钮
 * 5 绑定点击事件
 * 保存在window对象上，
 */
/**
 * ContentItem下有本次要添加按钮的评论区的位置
 * @param {HtmlElement} ContentItem .ContentItem 或 .Modal-content，作为评论区容器
 */
function addParseButton(ContentItem, itemId) {

    if (!ContentItem) return;
    //cc下有所有本次要处理的评论，层级不限
    let cc = ContentItem.querySelector('.Comments-container')
    let toolbar//功能栏，css-1onritu

    // 另一种情况，此时ContentItem为Modal-content，触发来源为点击查看按钮后延时cc = ContentItem
    let modal = document.querySelector('.Modal-content')
    if (modal) {
        itemId = modal.getAttribute('itemId')
        cc = ContentItem.querySelector('.css-tpyajk')
        if (!cc) return;
        toolbar = cc?.querySelector('.css-1onritu')
        cc.querySelector('.comment-parser-container-wrap')?.remove()// 避免重复添加
    }
    else if (cc) {
        toolbar = cc.querySelector('.css-1onritu')
        cc.querySelector('.comment-parser-container-wrap')?.remove()// 避免重复添加
    }

    if (!cc || !itemId || cc.querySelector('.css-189h5o3')?.textContent?.match('还没有')) return;

    if (!toolbar) {
        toolbar = cc.querySelector('.css-14eeh9e')// 去兼容知乎美化 暗黑模式
        cc.querySelector('.comment-parser-container-wrap')?.remove()
    }
    if (!toolbar) return;
    toolbar.appendChild(buttonContainer.cloneNode(true))

    const saveButton = cc.querySelector(".save");
    const unsaveButton = cc.querySelector(".unsave");
    const sumButton = cc.querySelector(".sum");

    saveButton?.addEventListener('click', (e) => {
        e.currentTarget.textContent = ' 暂存中……… '
        setTimeout(() => {
            e.currentTarget.textContent = '暂存此页评论'
        }, 700)
        const parser = new CommentParser(itemId);
        parser.parseComments(cc);
        //const comments = parser.getComments();
        //console.log(cc, comments);
    })
    unsaveButton?.addEventListener('click', (e) => {
        e.currentTarget.textContent = ' 清空中……… '
        setTimeout(() => {
            e.currentTarget.textContent = '清空暂存区'
        }, 700)
        window.ArticleComments = window.ArticleComments || {};
        window.ArticleComments[itemId] = undefined
    })
    sumButton?.addEventListener('click', () => {
        try {
            alert('已存 ' + window.ArticleComments[itemId].comments.size + ' 条')
        } catch (e) {
            alert('已存 0 条')
        }
    })
}
/**
 * Modal评论处理方案
 * 添加按钮并正确传入主人ID
 * 来源：
 * 1 点击底栏按钮（弹出Modal）
 * 2 点击评论区查看子评论
 * 3 点击评论区查看全部评论（div.css-wu78cf）（折叠评论css-1r40vb1）
 * 4 打开Modal后，点击Modal内查看子评论（css-tpyajk下才是真的评论区）不可能在点击时直接获取ID
 * 
 * 计划：
 * 1
 * 点击时查找主人ID，延时触发添加按钮（同时会添加事件）
 * 问题是在 4 时仍然找不到
 * 
 * 2
 * 点击 123 时查找主人ID并存入window，延时触发添加按钮，不传ID
 * 点击 4 时只延时触发添加按钮，不传ID
 * 使用按钮时如果没有主人ID（发生在由 1234 创造的 Modal 内按钮），使用window中的
 * 延时后只在Modal内添加（ 1 有时并不会创造Modal，此时由滚动添加）
 * 
 * 3
 * （可替代非Modal场景）
 * 点击 123 时查找主人ID，延时添加到 Modal DOM 上，延时触发添加按钮，不传ID
 * 点击 1 时额外判断如果延时后没有Modal，就传ID添加按钮
 * 23时没有可以再试一次
 * 使用按钮时如果没有主人ID（发生在由 1234 创造的 Modal 内按钮），使用 Modal DOM 中的
 * 
 * 
 * 路线
 * 
 * 基本解析功能
 * 挂载按钮与事件
 * 合并入主程序
 * 基本渲染功能
 * 渲染合并入主程序
 * 处理图片（下载和文本链接）
 * 细节处理（筛选后显示、已关闭、待展开子项）
 * 人性化提示（保存正文前、暂存反馈）
 * 专栏与搜索结果页
 * 
 */
/**
 * 调用后挂载document点击事件
 */
export const mountParseComments = () => {
    const autoAdd = () => setTimeout(() => {
        let c = document.querySelector('.Post-content') || document.querySelector('.ContentItem')
        if (!c) return
        let itemId = getItemId(c, c)
        if (itemId) addParseButton(c, itemId)
    }, 2000)
    if (location.href.match(/\/pin\/|\/p\//)) {
        // 想法页文章页直接呈现评论
        autoAdd()
    }
    document.addEventListener("click", (e) => {
        let itemId
        const target = e.target instanceof Element ? e.target : null
        if (!target) return
        const btn = target.closest('button')
        // 1
        if (btn?.closest('.ContentItem-actions') && /评论/.test(btn.textContent)) {
            let father = target.closest(".ContentItem") || target.closest(".Post-content")
            //注意文章页，搜索结果页
            itemId = getItemId(father, target)
            if (!itemId) return
            setTimeout(() => {
                let modal = document.querySelector('.Modal-content')
                if (modal) {
                    modal.setAttribute('itemId', itemId)
                    addParseButton(modal, itemId)
                }
                else if (father) addParseButton(father, itemId)
            }, 1200);
            return;
        }
        // 23 4
        else if (btn || target.closest('.css-wu78cf') || target.closest('.css-tpyajk .css-1jm49l2') || target.closest('.css-1r40vb1')) {
            let click = btn || target.closest('.css-wu78cf') || target.closest('.css-tpyajk .css-1jm49l2') || target.closest('.css-1r40vb1')
            if (click?.textContent?.match(/(查看.*(评论|回复))|评论回复/)) {

                let father = target.closest(".ContentItem") || target.closest(".Post-content")
                //注意文章页，搜索结果页
                setTimeout(() => {
                    let modal = document.querySelector('.Modal-content')
                    if (father) {// 4:false，不需要获取
                        //非Modal内 23
                        //console.log(2233)
                        itemId = getItemId(father, target)
                        if (modal && itemId) modal.setAttribute('itemId', itemId)
                    }
                    if (modal && itemId) addParseButton(modal, itemId)// 最终都是给Modal挂
                }, 1200);
            }
        }
        if (target.closest('button.hint')) {
            try {
                var skip_empty_p = GM_getValue("skip_empty_p"),
                    zip_merge_cm = GM_getValue("zip_merge_cm"),
                    copy_save_fm = GM_getValue("copy_save_fm"),
                    copy_save_cm = GM_getValue("copy_save_cm"),
                    no_save_img = GM_getValue("no_save_img"),
                    edit_Filename = GM_getValue("edit_Filename") || '未启用'
                if (edit_Filename == 'title + "_" + author.name + "_" + time.modified.slice(0, 10) + remark') {
                    edit_Filename = '与默认值相同'
                }
                var HINT2 = `\n当前设置：\n跳过空白段落：${skip_empty_p}\n复制保存评论：${copy_save_cm}\n复制保存FM：${copy_save_fm}\nzip合并评论：${zip_merge_cm}\n复制与纯文本不存图片：${no_save_img}\n自定义文件名：${edit_Filename}`
            } catch (e) {
            }
            alert(HINT + HINT2)
        }
        else if (btn?.getAttribute('aria-label') == "关闭") {
            autoAdd()// 文章页关闭弹出框后按钮消失
        }
        if (target.closest('.ContentItem-more')) {
            setTimeout(window.zhbf, 200)// 评论无关功能，展开后无需滚动即可保存
        }
    })
}

/**
 * 
 * @param {HtmlElement} father 含有itemId zop
 * @param {HtmlElement} etg e.target
 * @returns {String}
 */
const getItemId = (father, etg) => {
    if (!father || !etg) return null

    let zopdata
    try {
        zopdata = JSON.parse(father.getAttribute("data-zop") || '{}')
    } catch {
        zopdata = {}
    }
    if (!zopdata.itemId) {
        // 搜索结果页
        father = etg.closest(".Card") || father.closest(".Card")
        if (!father) return null
        let zem
        try {
            zem = JSON.parse(father.getAttribute("data-za-extra-module") || '{}').card?.content
        } catch {
            zem = null
        }
        if (!zem?.type || !zem.token) return null
        zopdata.type = zem.type
        if (zopdata.type == 'Post') zopdata.type = 'article'
        zopdata.itemId = zem.token
    }
    if (!zopdata.type || !zopdata.itemId) return null
    return String(zopdata.type).toLowerCase() + String(zopdata.itemId)
}

function ZhihuLink2NormalLink(link) {
    if (!link) return ''
    try {
        const base = typeof window !== 'undefined' ? window.location.href : undefined
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
 * 相对时间转绝对时间
 * @param {String} relativeTime
 * @returns {String}
 */
function relativeToAbsoluteDate(relativeTime) {
    //const now = new Date();
    //更精确一点了：推算日内可知部分并将不可知部分置为0
    let result = new Date();
    relativeTime = String(relativeTime || '').trim();
    if (!relativeTime) return '';

    if (relativeTime.includes('分钟前')) {
        const minutes = parseInt(relativeTime);
        result.setMinutes(result.getMinutes() - minutes);
        result.setSeconds(0);
    }
    else if (relativeTime.includes('小时前')) {
        const hours = parseInt(relativeTime);
        result.setHours(result.getHours() - hours);
        result.setMinutes(0, 0);
    }
    else if (relativeTime.includes('昨天')) {
        result.setDate(result.getDate() - 1);
        result.setSeconds(0);
    }
    else if (/^\d+天前$/.test(relativeTime)) {
            result.setDate(result.getDate() - parseInt(relativeTime, 10));
            result.setSeconds(0);
    }
    // 处理 "MM-DD" 格式
    else if (/^\d{2}-\d{2}$/.test(relativeTime)) {
        const [month, day] = relativeTime.split('-').map(num => parseInt(num));
        result.setMonth(month - 1);
        result.setDate(day);
        result.setHours(0, 0, 0);
    }
    // 处理 "YYYY-MM-DD" 格式
    else if (/^\d{4}-\d{2}-\d{2}$/.test(relativeTime)) return relativeTime
    // "刚刚" 无需处理
    // 返回 YYYY-MM-DD 格式的字符串2025-02-28 (14:41:32)
    return formatDate(result);
}

function formatDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');

    if (parseInt(hours + minutes + seconds))
        return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    return `${year}-${month}-${day}`;
}
