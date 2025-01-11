/**
 * 渲染单条评论
 * @param {Object} comment
 * @param {Map} comments
 * @param {number} level
 * @param {Boolean} isLocalImg
 */
function renderCommentToMarkdown(comment, comments, level = 0, isLocalImg) {
    //console.log(comment);
    // 基础模板
    const prefix = level ? '> '.repeat(level) : '';
    const titleLevel = level ? '####' : '###';

    // 处理评论内容中的换行符，确保在markdown中正确换行
    const formattedContent = comment.content/**/.replace('\n', '\n\n').split('\n')
        .map(line => `${prefix}${line}`)
        .join('\n');

    // 构建基本评论模板
    let markdown = [
        `${prefix}${titleLevel} ${comment.author}${comment.beReplied ? ` › ${comment.beReplied}` : ''}`,
        prefix,
        formattedContent,
        prefix
    ];

    if (comment.img) {
        if (isLocalImg) {
            commentsImgs.push(comment.img)
            comment.img = './assets/' + comment.img.replace(/\?.*?$/, "").split("/").pop()
        }
        markdown.push(`${prefix}![](${comment.img})`, prefix);
    }

    markdown.push(
        `${prefix}${comment.time} ${comment.location} ${comment.likes} 赞`,
        prefix
    );

    // 递归处理回复
    if (comment.replies && comment.replies.length) {
        const repliesMarkdown = comment.replies
            .map(replyId => comments.get(replyId))
            .filter(reply => reply) // 过滤掉可能的无效回复
            .map(reply => renderCommentToMarkdown(reply, comments, level + 1, isLocalImg))
            .join('\n');

        markdown.push(repliesMarkdown.replace(/> $/, ''));
    }

    return markdown.join('\n');
}

let commentsImgs = []
/**
 * 渲染所有评论
 * @param {Map<string, object>} commentsMap
 * @param {Boolean} isLocalImg
 * @returns {[string,string[]]}
 */
export function renderAllComments(commentsMap, isLocalImg) {
    // 找出所有顶级评论（没有parentId的评论）
    const topLevelComments = Array.from(commentsMap.values())
        .filter(comment => !comment.parentId)
    commentsImgs = []
    // 解析所有顶级评论及其回复
    return [
        topLevelComments
            .map(comment => renderCommentToMarkdown(comment, commentsMap, 0, isLocalImg))
            .join('\n'),
        commentsImgs
    ];
}

/* 使用示例：
const [markdown, imgs] = renderAllComments(comments, true);
console.log(markdown, imgs);*/