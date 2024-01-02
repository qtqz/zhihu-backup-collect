import { type LexType, TokenType, TokenText, TokenTextType, TokenTextCode, TokenTextInlineMath } from "./tokenTypes";

/**
 * Parses an array of LexType objects and returns an array of strings representing the parsed output.
 * @param input An array of LexType objects to be parsed.
 * @returns An array of strings representing the parsed output.
 */
export const parser = (input: LexType[]): string[] => {
	const output: string[] = [];

	for (let i = 0; i < input.length; i++) {
		const token = input[i];

		switch (token.type) {

			case TokenType.Code: {
				output.push(`\`\`\`${token.language ? token.language : ""}\n${token.content}${
					token.content.endsWith("\n") ? "" : "\n"
				}\`\`\``);
				break;
			};

			case TokenType.UList: {
				output.push(token.content.map((item) => `- ${renderRich(item)}`).join("\n"));
				break;
			};

			case TokenType.Olist: {
				output.push(token.content.map((item, index) => `${index + 1}. ${renderRich(item)}`).join("\n"));
				break;
			};

			case TokenType.H1: {
				output.push(`# ${token.text}`);
				break;
			};

			case TokenType.H2: {
				output.push(`## ${token.text}`);
				break;
			};

			case TokenType.Blockquote: {
				output.push(renderRich(token.content, "> "));
				break;
			};

			case TokenType.Text: {
				output.push(renderRich(token.content));
				break;
			};

			case TokenType.HR: {
				output.push("\n---\n");
				break;
			};

			case TokenType.Link: {
				output.push(`[${token.text}](${token.href})`);
				break;
			};

			case TokenType.Figure: {
				output.push(`![](${token.local ? token.localSrc : token.src})`);
				break;
			};

			case TokenType.Gif: {
				output.push(`![](${token.local ? token.localSrc : token.src})`);
				break;
			};

			case TokenType.Video: {
				// 创建一个虚拟的 DOM 节点
				const dom = document.createElement("video");
				dom.setAttribute("src", token.local ? token.localSrc : token.src)
				if (!token.local) dom.setAttribute("data-info", "文件还未下载，随时可能失效，请使用`下载全文为Zip`将视频一同下载下来");

				output.push(dom.outerHTML);
				break;
			};

			case TokenType.Table: {
				console.log(token);

				const rows = token.content;
				const cols = rows[0].length;
				const widths = new Array(cols).fill(0);

				const res = [];

				for (let i in rows) {
					for (let j in rows[i]) {
						widths[j] = Math.max(widths[j], rows[i][j].length);
					}
				}

				const renderRow = (row: string[]): string => {
					let res = "";

					for (let i = 0; i < cols; i++) {
						res += `| ${row[i].padEnd(widths[i])} `;
					}

					res += "|";

					return res;
				};

				const renderSep = (): string => {
					let res = "";

					for (let i = 0; i < cols; i++) {
						res += `| ${"-".repeat(widths[i])} `;
					}

					res += "|";

					return res;
				};

				res.push(renderRow(rows[0]));
				res.push(renderSep());

				for (let i = 1; i < rows.length; i++) {
					res.push(renderRow(rows[i]));
				}

				output.push(res.join("\n"));

				break;
			};
		}
	}

	return output;
};


/**
 * Renders rich text based on an array of tokens.
 * @param input An array of TokenTextType objects representing the rich text to render.
 * @param joint An optional string to join the rendered text with.
 * @returns A string representing the rendered rich text.
 */
const renderRich = (input: TokenTextType[], joint: string = ""): string => {
	let res = "";

	for (let el of input) {
		switch (el.type) {
			case TokenType.Bold: {
				res += `**${renderRich(el.content)}**`;
				break;
			};

			case TokenType.Italic: {
				res += `*${renderRich(el.content)}*`;
				break;
			};

			case TokenType.InlineLink: {
				res += `[${el.text}](${el.href})`;
				break;
			};

			case TokenType.PlainText: {
				res += el.text;
				break;
			};

			case TokenType.BR: {
				res += "\n" + joint;
				break;
			};

			case TokenType.InlineCode: {
				res += `\`${(el as TokenTextCode).content}\``;
				break;
			};

			case TokenType.Math: {
				if (input.length == 1) res += `$$\n${(el as TokenTextInlineMath).content}\n$$`;
				else res += `$${(el as TokenTextInlineMath).content}$`;
				break;
			};
		}
	}

	return joint + res;
};