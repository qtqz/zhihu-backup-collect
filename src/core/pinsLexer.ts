/** 想法 Lexer */

import { TokenType } from "./tokenTypes";
import type { LexType, TokenText, TokenTextBr, TokenTextPlain } from "./tokenTypes";

export const lexer = (dom: HTMLElement): LexType[] => {
	const res: TokenText = {
		type: TokenType.Text,
		content: [],
	};

	const text = dom.innerText;

	text.split("\n").forEach((line) => {
		res.content.push({
			type: TokenType.PlainText,
			text: line,
		} as TokenTextPlain);

		res.content.push({
			type: TokenType.BR,
		} as TokenTextBr);
	});

	return [res];
};