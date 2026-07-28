/**
 * 返回评论图片在 ZIP 中使用的安全文件名。
 */
function imageBaseName(url) {
    const fallback = 'comment-image';
    let name = fallback;
    try {
        const base = typeof window !== 'undefined' ? window.location.href : undefined;
        const parsed = new URL(url, base);
        const rawName = parsed.pathname.split('/').pop();
        if (rawName) {
            try {
                name = decodeURIComponent(rawName);
            } catch {
                name = rawName;
            }
        }
    } catch {
        const rawName = String(url || '').split('?')[0].split('/').pop();
        if (rawName) name = rawName;
    }

    name = name
        .replace(/[\x00-\x1f\x7f-\x9f]/g, '')
        .replace(/[<>:"/\\|?*]/g, '-')
        .replace(/[\u200B-\u200D\uFEFF]/g, '')
        .replace(/\s+/g, ' ')
        .trim()
        .replace(/\.{2,}/g, '.')
        .replace(/^[.\s]+|[.\s]+$/g, '')
        .slice(0, 200)
        .replace(/[.\s]+$/g, '') || fallback;

    if (/^(con|prn|aux|nul|com[1-9]|lpt[1-9])(?:\..*)?$/i.test(name)) {
        name = `_${name}`;
    }
    return name;
}

function uniqueImageName(url, namesByUrl, usedNames) {
    if (namesByUrl.has(url)) return namesByUrl.get(url);

    const originalName = imageBaseName(url);
    const extensionIndex = originalName.lastIndexOf('.');
    const stem = extensionIndex > 0 ? originalName.slice(0, extensionIndex) : originalName;
    const extension = extensionIndex > 0 ? originalName.slice(extensionIndex) : '';
    let fileName = originalName;
    let suffix = 1;
    while (usedNames.has(fileName)) {
        fileName = `${stem}-${suffix++}${extension}`;
    }

    usedNames.add(fileName);
    namesByUrl.set(url, fileName);
    return fileName;
}

/**
 * 渲染单条评论。
 */
function renderCommentToMarkdown(
    comment,
    comments,
    level = 0,
    isLocalImg,
    commentsImgs,
    namesByUrl,
    usedNames,
    ancestors
) {
    if (!comment || !comments) return '';

    const commentId = comment.id;
    if (commentId && ancestors.has(commentId)) return '';
    if (commentId) ancestors.add(commentId);

    try {
        const prefix = level ? '> '.repeat(level) : '';
        const titleLevel = level ? '####' : '###';
        const content = String(comment.content ?? '');

        // 将每个换行转换为 Markdown 段落换行，并为回复补上引用前缀。
        const formattedContent = content.replace(/\n/g, '\n\n').split('\n')
            .map(line => `${prefix}${line}`)
            .join('\n');

        let markdown = [
            `${prefix}${titleLevel} ${String(comment.author || '匿名用户')}${comment.beReplied ? ` › ${comment.beReplied}` : ''}`,
            prefix,
            formattedContent,
            prefix
        ];

        if (comment.img) {
            const imageUrl = String(comment.img);
            let image = imageUrl;
            if (isLocalImg) {
                const fileName = uniqueImageName(imageUrl, namesByUrl, usedNames);
                if (!commentsImgs.some(item => item.url === imageUrl)) {
                    commentsImgs.push({ url: imageUrl, fileName });
                }
                image = './assets/' + fileName;
            }

            const noSaveImage = typeof window !== 'undefined' && window.no_save_img;
            noSaveImage && !isLocalImg
                ? markdown.push(`${prefix}[图片]`, prefix)
                : markdown.push(`${prefix}![](${image})`, prefix);
        }

        markdown.push(
            `${prefix}${comment.time || ''} ${comment.location || ''} ${comment.likes || 0} 赞`,
            prefix
        );

        const replies = Array.isArray(comment.replies) ? comment.replies : [];
        if (replies.length) {
            const repliesMarkdown = replies
                .map(replyId => comments.get(replyId))
                .filter(Boolean)
                .map(reply => renderCommentToMarkdown(
                    reply,
                    comments,
                    level + 1,
                    isLocalImg,
                    commentsImgs,
                    namesByUrl,
                    usedNames,
                    ancestors
                ))
                .filter(Boolean)
                .join('\n');

            if (repliesMarkdown) markdown.push(repliesMarkdown.replace(/> $/, ''));
        }

        return markdown.join('\n');
    } finally {
        if (commentId) ancestors.delete(commentId);
    }
}

/**
 * 渲染所有评论。
 * @param {Map<string, object>} commentsMap
 * @param {Boolean} isLocalImg
 * @returns {[String, Array<{url: String, fileName: String}>]}
 */
export function renderAllComments(commentsMap, isLocalImg) {
    const comments = commentsMap && typeof commentsMap.values === 'function' ? commentsMap : new Map();
    const commentsImgs = [];
    const namesByUrl = new Map();
    const usedNames = new Set();
    const topLevelComments = Array.from(comments.values())
        // 父评论可能尚未暂存；孤立回复仍应作为顶级评论导出，不能静默丢失。
        .filter(comment => comment && (!comment.parentId || !comments.has(comment.parentId)));

    return [
        topLevelComments
            .map(comment => renderCommentToMarkdown(
                comment,
                comments,
                0,
                isLocalImg,
                commentsImgs,
                namesByUrl,
                usedNames,
                new Set()
            ))
            .filter(Boolean)
            .join('\n'),
        commentsImgs
    ];
}
