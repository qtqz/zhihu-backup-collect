// 在window对象上创建存储空间
//window.ArticleComments = window.ArticleComments || {};

class CommentParser {
    constructor(articleKey) {
        this.articleKey = articleKey;
        // 确保文章的评论存储空间存在
        window.ArticleComments[articleKey] = window.ArticleComments[articleKey] || {
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

        // 查找评论作者与被回复者
        const authorElement = commentElement.children[0].children[1].children[0].querySelectorAll('a');
        const author = authorElement[0].textContent
        let author2
        if (authorElement[1]) {
            author2 = authorElement[1].textContent
        }

        // 查找评论内容
        const contentElement = commentElement.querySelector('.CommentContent');
        let textContentPlain = '' // string | string[]
        let img = ''
        Array.from(contentElement.childNodes).map(node => {
            //评论内容最小元素
            if (node.nodeName == 'DIV') {
                if (node.classList.contains('comment_img') || node.classList.contains('comment_sticker')) {
                    img = node.querySelector('img').getAttribute('data-original')
                }
            }
            else if (node.nodeName == 'IMG') textContentPlain += node.alt//小表情
            else if (node.nodeName == 'A') {
                let link = ZhihuLink2NormalLink(node.href)
                textContentPlain += '[' + link + '](' + link + ')'
            }
            else if (node.nodeName == 'BR') textContentPlain += '\n'
            else textContentPlain += node.textContent
            //暂不处理图片，因为图片只会存在于文末。每条评论最多只有一张图片应该
        });

        let content = textContentPlain

        const timeElement = commentElement.querySelector('.css-12cl38p');
        const time = timeElement ? relativeToAbsoluteDate(timeElement.textContent) : '';

        const locationElement = commentElement.querySelector('.css-ntkn7q');
        const location = locationElement ? locationElement.textContent : '';

        const likeButton = commentElement.querySelector('.css-1vd72tl');
        const likes = likeButton ?
            (likeButton.textContent.match(/\d+/) ? parseInt(likeButton.textContent.match(/\d+/)[0]) : 0) :
            0;

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

        commentElements.forEach(element => {
            //console.log(element)
            const commentId = element.getAttribute('data-id');
            const comment = this.parseComment(element);

            // 判断是否为回复评论
            // 如果当前评论元素的子元素有css-1kwt8l8类名（一个缩进），说明这是一条回复评论
            let parentElement, isReplyComment = element.firstElementChild.classList.contains('css-1kwt8l8');
            // 另一种情况，弹出框的回复评论（因回复太多而弹出的，和弹出框子页面的，非单纯弹出框）
            if (!isReplyComment) {
                isReplyComment = element.closest('.css-16zdamy')
                parentElement = container.querySelector('.css-tpyajk [data-id]')
            } else parentElement = element.parentElement;
            if (isReplyComment) {
                // 向上或向里查找最近的不是回复评论的data-id元素
                const parentCommentElement = parentElement.closest('[data-id]');

                const parentId = parentCommentElement.getAttribute('data-id');
                comment.parentId = parentId;

                // 更新父评论的replies
                const parentComment = commentsData.get(parentId);
                if (parentComment && !parentComment.replies.includes(commentId)) {
                    parentComment.replies.push(commentId);
                }
            }

            // 更新或添加评论
            if (commentsData.has(commentId)) {
                // 合并新数据，保留原有的replies
                const oldComment = commentsData.get(commentId);
                comment.replies = oldComment.replies;
                commentsData.set(commentId, { ...oldComment, ...comment });
            } else {
                commentsData.set(commentId, comment);
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
    &nbsp;<button class="save Button VoteButton">暂存当前页评论</button>
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
        toolbar = cc?.querySelector('.css-1onritu')
        cc.querySelector('.comment-parser-container-wrap')?.remove()// 避免重复添加
    }
    else if (cc) {
        toolbar = cc.querySelector('.css-1onritu')
        cc.querySelector('.comment-parser-container-wrap')?.remove()// 避免重复添加
    }

    if (!cc) return;

    toolbar.appendChild(buttonContainer.cloneNode(true))

    cc.querySelector(".save").addEventListener('click', () => {
        const parser = new CommentParser(itemId);
        parser.parseComments(cc);
        //const comments = parser.getComments();
        //console.log(cc, comments);
    })
    cc.querySelector(".unsave").addEventListener('click', () => {
        window.ArticleComments[itemId] = undefined
    })
    cc.querySelector(".sum").addEventListener('click', () => {
        try {
            alert('已存 ' + window.ArticleComments[itemId].comments.size + ' 条')
        } catch (e) {
            alert('已存 0 条')
        }
    })
}

//console.log(0)
/*
let timer3 = null
window.addEventListener("scroll", () => {
    //debounce
    if (timer3 || timer3 === 0) {
        clearTimeout(timer3)
    }
    timer3 = setTimeout(addParseButtons, 1000)
})*/

/**
 * Modal评论处理方案
 * 添加按钮并正确传入主人ID
 * 来源：
 * 1 点击底栏按钮（弹出Modal）
 * 2 点击评论区查看子评论
 * 3 点击评论区查看全部评论（div.css-wu78cf）
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
    if (location.href.match(/\/pin\/|\/p\//)) {
        // 想法页文章页直接呈现评论
        let c = document.querySelector('.ContentItem')
        let itemId = getItemId(c, c)
        addParseButton(c, itemId)
    }
    document.addEventListener("click", (e) => {
        let itemId
        // 1
        if (e.target.closest('.ContentItem-action') && /评论/.test(e.target.closest('.ContentItem-action').textContent)) {

            let father = e.target.closest(".ContentItem") || e.target.closest(".Post-Main")
            //注意文章页，搜索结果页
            itemId = getItemId(father, e.target)
            setTimeout(() => {
                let modal = document.querySelector('.Modal-content')
                if (modal) {
                    modal.setAttribute('itemId', itemId)
                    addParseButton(modal, itemId)
                }
                else addParseButton(father, itemId)
            }, 1500);
            return;
        }
        // 23 4
        else if (e.target.closest('button') || e.target.closest('.css-wu78cf') || e.target.closest('.css-tpyajk .css-1jm49l2')) {
            let click = e.target.closest('button') || e.target.closest('.css-wu78cf') || e.target.closest('.css-tpyajk .css-1jm49l2')
            if (click.textContent.match(/(查看全部.*(评论|回复))|评论回复/)) {

                let father = e.target.closest(".ContentItem") || e.target.closest(".Post-Main")
                //注意文章页，搜索结果页
                setTimeout(() => {
                    let modal = document.querySelector('.Modal-content')
                    if (father) {// 4:false，不需要获取
                        //非Modal内 23
                        console.log(2233)
                        itemId = getItemId(father, e.target)
                        modal.setAttribute('itemId', itemId)
                    }
                    addParseButton(modal, itemId)// 最终都是给Modal挂
                }, 1500);
            }
        }
        if (e.target.closest('button.hint')) {
            alert(HINT)
        }
        if (e.target.closest('.ContentItem-more')) {
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
    let zopdata = JSON.parse(father.getAttribute("data-zop") || '{}')
    if (!zopdata.itemId) {
        // 搜索结果页
        father = etg.closest(".Card")
        let zem = JSON.parse(father.getAttribute("data-za-extra-module")).card.content
        zopdata.type = zem.type
        zopdata.itemId = zem.token
    }
    return zopdata.type + zopdata.itemId
}

const ZhihuLink2NormalLink = (link) => {
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
 * 相对时间转绝对时间
 * @param {String} relativeTime
 * @returns {String}
 */
function relativeToAbsoluteDate(relativeTime) {
    //const now = new Date();
    let result = new Date();

    if (relativeTime.includes('分钟前')) {
        const minutes = parseInt(relativeTime);
        result.setMinutes(result.getMinutes() - minutes);
    }
    else if (relativeTime.includes('小时前')) {
        const hours = parseInt(relativeTime);
        result.setHours(result.getHours() - hours);
    }
    else if (relativeTime.includes('昨天')) {
        result.setDate(result.getDate() - 1);
    }
    // 处理 "MM-DD" 格式
    else if (/^\d{2}-\d{2}$/.test(relativeTime)) {
        const [month, day] = relativeTime.split('-').map(num => parseInt(num));
        result.setMonth(month - 1);
        result.setDate(day);
    }
    // "刚刚" 无需处理
    // 返回 YYYY-MM-DD 格式的字符串
    return result.toISOString().split('T')[0];
}