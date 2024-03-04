import type {
	TokenH1,
	TokenH2,
	TokenCode,
	TokenText,
	TokenUList,
	TokenOList,
	TokenFigure,
	TokenBlockquote,
	TokenTextPlain,
	LexType,
	TokenTextType,
	TokenTextBr,
	TokenTextBold,
	TokenTextLink,
	TokenTextItalic,
	TokenTextCode,
	TokenTextInlineMath,
	TokenHR,
	TokenLink,
	TokenTable,
	TokenVideo,
	TokenGif,
	TokenComment,
	TokenCommentReply,
} from "./tokenTypes";

import { TokenType } from "./tokenTypes";
import { ZhihuLink2NormalLink } from "./utils";
import { getParent } from "../core/utils"


/**
 * Tokenizes a NodeListOf<Element> and returns an array of LexType tokens.
 * @param input - The NodeListOf<Element> to tokenize.
 * @returns An array of LexType tokens.
 */
export const lexer = (input: NodeListOf<Element> | Element[], type?: string): LexType[] => {

	/**
	 * 想法,文字没有节点，非#标签和非@链接被<br>隔开，是单独的一行
	 * 将每一段转为p段落处理
	 */
	if (type == "pin") {
		//console.log(input)
		let pinParagraphs: LexType[] = []//二级包-一级
		let dom = input[0].parentNode as HTMLElement//RichText

		//被转发的想法，首行添加主人
		if (getParent(dom, "PinItem-content-originpin")) {
			let p = document.createElement("p")
			p.innerHTML = (getParent(dom, "PinItem-content-originpin") as HTMLElement).firstElementChild.textContent
			pinParagraphs.push({
				type: TokenType.Text,
				content: Tokenize(p),
			})
		}

		let blocks = dom.innerHTML.replace(/\n\s*/g, "").split(/<br.{0,20}>/g)
		for (let block of blocks) {
			let p = document.createElement("p")
			p.innerHTML = block
			pinParagraphs.push({
				type: TokenType.Text,
				content: Tokenize(p),
			})
		}

		//检查想法有无引用回答，仅检查当前层级
		if (getParent(dom, "PinItem-content-originpin")) {
			let a = (getParent(dom, "PinItem-content-originpin") as HTMLElement).querySelector("a.LinkCard") as HTMLAnchorElement
			if (a) {
				let p = document.createElement("p")
				let a2 = document.createElement("a")
				a2.href = a.href
				a2.innerHTML = a.innerText.replace(/\n\s*/g, " ")
				p.innerHTML = a2.outerHTML
				pinParagraphs.push({
					type: TokenType.Text,
					content: Tokenize(p),
				})
			}
		} else {
			//此时dom不在源想法内
			let parent = getParent(dom, "PinItem") as HTMLElement
			if (!parent.querySelector(".PinItem-content-originpin") && parent.querySelector("a.LinkCard")) {
				let a = parent.querySelector("a.LinkCard") as HTMLAnchorElement
				let p = document.createElement("p")
				let a2 = document.createElement("a")
				a2.href = a.href
				a2.innerHTML = a.innerText.replace(/\n\s*/g, " ")
				p.innerHTML = a2.outerHTML
				pinParagraphs.push({
					type: TokenType.Text,
					content: Tokenize(p),
				})
			}
		}

		//console.log('pinParagraphs', pinParagraphs)
		return pinParagraphs
	}


	const tokens: LexType[] = [];

	for (let i = 0; i < input.length; i++) {
		const node = input[i];
		//console.log(node)
		const tagName = node.tagName.toLowerCase();

		//console.log(node, tagName);

		switch (tagName) {

			case "h2": {
				tokens.push({
					type: TokenType.H1,
					text: node.textContent,
					dom: node
				} as TokenH1);
				break;
			}

			case "h3": {
				tokens.push({
					type: TokenType.H2,
					text: node.textContent,
					dom: node
				} as TokenH2);
				break;
			}

			case "div": {
				if (node.classList.contains("highlight")) {
					tokens.push({
						type: TokenType.Code,
						content: node.textContent,
						language: node.querySelector("pre > code").classList.value.slice(9),
						dom: node
					} as TokenCode);
				} else if (node.classList.contains("RichText-LinkCardContainer")) {
					const link = node.firstChild as HTMLAnchorElement;
					tokens.push({
						type: TokenType.Link,
						text: link.getAttribute("data-text"),
						href: ZhihuLink2NormalLink(link.href),
						dom: node as HTMLDivElement
					} as TokenLink);
				} else if (node.querySelector("video")) {
					tokens.push({
						type: TokenType.Video,
						src: node.querySelector("video").getAttribute("src"),
						local: false,
						dom: node
					} as TokenVideo);
				} else if (node.classList.contains("RichText-ADLinkCardContainer")) {
					tokens.push({
						type: TokenType.Text,
						content: [{
							type: TokenType.PlainText,
							text: node.textContent
						}],
						dom: node
					} as TokenText);
				}
				break;
			}

			case "blockquote": {
				tokens.push({
					type: TokenType.Blockquote,
					content: Tokenize(node),
					dom: node as HTMLQuoteElement
				} as TokenBlockquote);
				break;
			}

			case "figure": {
				const img = node.querySelector("img");

				if (img.classList.contains("ztext-gif")) {

					const guessSrc = (src: string): string => {
						return src.replace(/\..{3,4}$/g, ".gif");
					};

					const src = guessSrc(img.getAttribute("src") || img.getAttribute("data-thumbnail"));

					if (src) {
						tokens.push({
							type: TokenType.Gif,
							src,
							local: false,
							dom: node
						} as TokenGif);
					}
				} else {
					const src = img.getAttribute("data-actualsrc") || img.getAttribute("data-original");
					if (src) {
						tokens.push({
							type: TokenType.Figure, src,
							local: false,
							dom: node as HTMLElement
						} as TokenFigure);
					}
				}
				break;
			}

			case "ul": {
				const childNodes = Array.from(node.querySelectorAll("li"));

				tokens.push({
					type: TokenType.UList,
					content: childNodes.map((el) => Tokenize(el)),
					dom: node,
				} as TokenUList);

				break;
			}

			case "ol": {
				const childNodes = Array.from(node.querySelectorAll("li"));

				tokens.push({
					type: TokenType.Olist,
					content: childNodes.map((el) => Tokenize(el)),
					dom: node,
				} as TokenOList);

				break;
			}

			case "p": {

				tokens.push({
					type: TokenType.Text,
					content: Tokenize(node),
					dom: node as HTMLParagraphElement
				} as TokenText)

				break;
			}

			case "hr": {

				tokens.push({
					type: TokenType.HR,
					dom: node
				} as TokenHR);

				break;
			}

			case "table": {

				const el = node as HTMLTableElement;

				const table2array = (table: HTMLTableElement): string[][] => {
					const res: string[][] = [];
					const rows = Array.from(table.rows);

					for (let row of rows) {
						const cells = Array.from(row.cells);
						res.push(cells.map((cell) => cell.innerHTML));
					}

					return res;
				};
				const table = table2array(el);

				tokens.push({
					type: TokenType.Table,
					content: table,
					dom: node,
				} as TokenTable);

				break;
			}
		}
	}
	//console.log(tokens);

	return tokens;
};

/**
 * 解析评论的入口
 * @param input 子级们应为评论序列，嵌套子评论
 * @param type 暂未使用
 * @returns 评论的数组，和评论带的图的数组
 */
export const lexerComment = (input: NodeListOf<Element>, type?: string): [TokenComment[], string[]] => {
	const tokens: TokenComment[] = []
	commentImg = []

	for (let i = 0; i < input.length; i++) {
		const node = input[i]
		//console.log(node)

		if (node.getAttribute('data-id')) {
			tokens.push({
				type: TokenType.Comment,
				content: getCommentReplys(node),
				dom: node,
			} as TokenComment)
		}
	}
	console.log(commentImg)
	return [tokens, commentImg]
}

let commentImg: string[] = []

/**
 * 解析具体每一条评论元素（带id号），不嵌套子评论
 * @param node 带id号元素
 * @returns 评论信息
 */
const getCommentReplys = (node: Element): TokenCommentReply[] => {
	const res = [] as TokenCommentReply[]
	const nodes = node.childNodes//顶层id号评论的下层

	for (let i = 0; i < nodes.length; i++) {
		const reply = nodes[i] as HTMLElement
		let tgt
		if (reply.tagName == 'BUTTON') res.push({
			type: TokenType.CommentReply,
			level: 2,
			content: reply.textContent
		})
		else if (!reply.getAttribute('data-id')) {
			tgt = reply
			res.push(getCommentReplyInfo(tgt, 1))
		} else {
			tgt = reply.childNodes[0] as HTMLElement
			res.push(getCommentReplyInfo(tgt, 2))
		}
	}
	return res
}

/**
 * 获取每条评论信息
 * @param reply 包含3行信息的元素
 * @param level 深度
 * @returns 评论信息对象
 */
const getCommentReplyInfo = (reply: HTMLElement, level: 1 | 2): TokenCommentReply => {
	//console.log(reply)
	let name = '';
	(reply.childNodes[1].childNodes[0] as HTMLElement).querySelectorAll('a').forEach((e, i) => {
		i ? name += ' › ' : 0
		name += e.textContent
	})

	let textContent = reply.childNodes[1].childNodes[1]
	let textContents = textContent.childNodes
	let picture = ''
	if ((textContent as HTMLElement).querySelector('.comment_img')) {
		picture = (textContent as HTMLElement).querySelector('.comment_img>img').getAttribute('data-original')
	}
	let textContentPlain: string | string[] = ''

	textContents.forEach(e => {
		if (e.nodeName == 'IMG') textContentPlain += (e as HTMLImageElement).alt
		else if (e.nodeName == 'A') {
			let link = ZhihuLink2NormalLink((e as HTMLAnchorElement).href)
			textContentPlain += '[' + link + '](' + link + ')'
		}
		else if (e.nodeName == 'BR') textContentPlain += '\n'
		else textContentPlain += e.textContent
		if (picture) {
			textContentPlain += '![图片]' + '(./assets/' + picture.replace(/\?.*?$/g, "").split("/").pop() + ')'
			commentImg.push(picture)
		}
	})
	//多行评论
	if ((textContentPlain as string).match('\n')) {
		textContentPlain = (textContentPlain as string).split('\n')
	}
	let info = reply.childNodes[1].childNodes[2]
	let time = info.childNodes[0].childNodes[0].childNodes[0].textContent
	let location = ''
	try {
		location = info.childNodes[0].childNodes[0].childNodes[2].textContent.replace('IP 属地', '')
	} catch (e) {
		console.error('location', e)
	}
	let likes = info.childNodes[1].childNodes[1].textContent.replace('喜欢', '0').match(/\d+/)[0]

	return {
		type: TokenType.CommentReply,
		level: level,
		content: {
			name: name,
			text: textContentPlain,
			likes: parseInt(likes),
			time: time,
			location: location
		}
	}
}

/**
 * Tokenizes an HTML element or string into an array of TokenTextType objects.
 * 处理行内内容
 * @param node The HTML element or string to tokenize.
 * @returns An array of TokenTextType objects representing the tokenized input.
 */
const Tokenize = (node: Element | string): TokenTextType[] => {

	if (typeof node == "string") {
		return [{
			type: TokenType.PlainText,
			text: node,
		} as TokenTextPlain];
	}

	let childs = Array.from(node.childNodes);
	const res: TokenTextType[] = [];

	// 处理 <blockquote><p></p></blockquote> 的奇观
	try {
		if (childs.length == 1 && (childs[0] as HTMLElement).tagName.toLowerCase() == "p") {
			childs = Array.from((childs[0] as HTMLElement).childNodes);
		}
	} catch { }

	for (let child of childs) {

		if (child.nodeType == child.TEXT_NODE) {
			res.push({
				type: TokenType.PlainText,
				text: child.textContent.replace(/\u200B/g, ''),
				dom: child,
			} as TokenTextPlain);
		} else {
			let el = child as HTMLElement;

			switch (el.tagName.toLowerCase()) {
				case "b": {
					res.push({
						type: TokenType.Bold,
						content: Tokenize(el),
						dom: el,
					} as TokenTextBold);
					break;
				}

				case "i": {
					res.push({
						type: TokenType.Italic,
						content: Tokenize(el),
						dom: el,
					} as TokenTextItalic);
					break;
				}

				case "br": {
					res.push({
						type: TokenType.BR,
						dom: el,
					} as TokenTextBr);
					break;
				}

				case "code": {
					res.push({
						type: TokenType.InlineCode,
						content: el.innerText,
						dom: el,
					} as TokenTextCode);
					break;
				}

				case "span": {
					if (el.classList.contains("ztext-math")) {
						res.push({
							type: TokenType.Math,
							content: el.getAttribute("data-tex"),
							dom: el,
						} as TokenTextInlineMath);
					} else if (el.children[0].classList.contains("RichContent-EntityWord")) {//搜索词
						res.push({
							type: TokenType.PlainText,
							text: el.innerText,
							dom: el,
						} as TokenTextPlain)
					}
					else if (el.children[0].classList.contains("UserLink")) {//想法中的@
						res.push({
							type: TokenType.InlineLink,
							text: el.innerText,
							href: ZhihuLink2NormalLink((el.querySelector("a") as HTMLAnchorElement).href),
							dom: el,
						} as TokenTextLink)
						break
					}
					break;
				}

				case "a": {
					//console.log(el)
					res.push({
						type: TokenType.InlineLink,
						text: el.textContent,
						href: ZhihuLink2NormalLink((el as HTMLAnchorElement).href),
						dom: el,
					} as TokenTextLink);
					break;
				}
			}
		}
	}

	return res;
};