/**
 * Enum representing the different types of tokens in the parsed markdown.
 */
export enum TokenType {
    H2, H3,
    Text,
    Figure,
    Gif,
    InlineLink,
    InlineCode,
    Math,
    Italic,
    Bold,
    PlainText,
    UList,
    Olist,
    BR,
    HR,
    Blockquote,
    Code,
    Link,
    Table,
    Video,
    FootnoteList,
}



/**
 * Represents a token of italic text.
 */
export type TokenTextItalic = {
    type: TokenType.Italic;
    content: TokenTextType[];
    dom?: HTMLElement;
};

/**
 * Represents a bold token with its content and corresponding DOM element.
 */
export type TokenTextBold = {
    type: TokenType.Bold;
    content: TokenTextType[];
    dom?: HTMLElement;
};

/**
 * Represents a token that contains a link.
 */
export type TokenTextLink = {
    type: TokenType.InlineLink;
    text: string;
    href: string;
    dom?: HTMLAnchorElement;
};

/** 
 * Represents a token of plain text.
 */
export type TokenTextPlain = {
    type: TokenType.PlainText;
    text: string;
    dom?: ChildNode
};

/** 
 * Represents a token of <br>.
 */
export type TokenTextBr = {
    type: TokenType.BR;
    dom?: HTMLBRElement
};

/** 
 * Represents a token of inline code.
 */
export type TokenTextCode = {
    type: TokenType.InlineCode;
    content: string;
    dom?: HTMLElement;
};

/** 
 * Represents a token of inline math.
 */
export type TokenTextInlineMath = {
    type: TokenType.Math;
    content: string;
    display?: boolean; // true 表示块级公式，false 或 undefined 表示行内公式
    dom?: HTMLElement;
};

/** 
 * Represents a token of all kinds of text.
 */
export type TokenTextType =
    TokenTextPlain |
    TokenTextLink |
    TokenTextBold |
    TokenTextItalic |
    TokenTextBr |
    TokenTextCode |
    TokenTextInlineMath;

/** 
 * Represents a token of text.
 */
export type TokenText = {
    type: TokenType.Text;
    content: TokenTextType[];
    dom?: HTMLParagraphElement
};


/** 
 * Represents a token of blockquote.
 */
export type TokenBlockquote = {
    type: TokenType.Blockquote;
    content: TokenTextType[];
    dom?: HTMLQuoteElement
};


/** 
 * Represents a token of unordered list.
 */
export type TokenUList = {
    type: TokenType.UList;
    content: TokenTextType[][]; // 谢天谢地，知乎List不会嵌套
    dom?: HTMLUListElement;
};


/** 
 * Represents a token of ordered list.
 */
export type TokenOList = {
    type: TokenType.Olist;
    content: TokenTextType[][];
    dom?: HTMLOListElement;
};


/** 
 * Represents a token of code block.
 */
export type TokenCode = {
    type: TokenType.Code;
    content: string;
    language?: string;
    dom?: HTMLDivElement;
};


/** 
 * Represents a token of horizontal rule.
 */
export type TokenHR = {
    type: TokenType.HR;
    dom?: HTMLHRElement;
};


/**
 * Represents a token of link.
 */
export type TokenLink = {
    type: TokenType.Link;
    text: string;
    href: string;
    dom?: HTMLDivElement;
};


/**
 * Represents a token of type H1.
 */
export type TokenH2 = {
    type: TokenType.H2;
    text: string;
    dom?: HTMLHeadingElement;
};


/**
 * Represents a token of type H2.
 */
export type TokenH3 = {
    type: TokenType.H3;
    text: string;
    dom?: HTMLHeadingElement;
};


/**
 * Represents a token figure.
 */
export type TokenFigure = {
    type: TokenType.Figure;
    src: string;
    local: boolean; // 文件是否已经下载
    localSrc?: string;
    dom?: HTMLElement;
};


/**
 * Represents a token gif.
 */
export type TokenGif = {
    type: TokenType.Gif;
    src: string;
    local: boolean; // 文件是否已经下载
    localSrc?: string;
    dom?: HTMLElement;
};


/**
 * Represents a token table.
 */
export type TokenTable = {
    type: TokenType.Table;
    content: string[][];
    dom?: HTMLTableElement;
};


/**
 * Represents a token video.
 */
export type TokenVideo = {
    type: TokenType.Video;
    src: string;
    local: boolean; // 文件是否已经下载
    localSrc: string;
    dom?: HTMLDivElement;
}


/**
 * Represents a footnote/reference item.
 */
export type FootnoteItem = {
    id: string; // 如 "1", "2"
    content: string; // 脚注内容
};

/**
 * Represents a token footnote list.
 */
export type TokenFootnoteList = {
    type: TokenType.FootnoteList;
    items: FootnoteItem[];
    dom?: HTMLOListElement;
}


/** 
 * Represents a token of all kinds of lex.
 */
export type LexType =
    TokenH2 |
    TokenH3 |
    TokenCode |
    TokenText |
    TokenUList |
    TokenOList |
    TokenFigure |
    TokenBlockquote |
    TokenHR |
    TokenLink |
    TokenTable |
    TokenVideo |
    TokenGif |
    TokenFootnoteList 