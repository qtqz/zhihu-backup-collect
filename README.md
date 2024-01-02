# 知乎备份工具

在这个互联网没有记忆的时代，帮你保存知乎上珍贵的内容。

* 一键复制知乎文章/回答/想法为Markdown
* 下载文章/回答/想法为zip（包含图片与文本，以及赞数评论数等信息）
* 剪藏文章/回答/想法为图片/PDF
* 可选保存当前页评论

此项目基于[]()（MIT）开发而来，感谢原作者的探索。原作者实现了基础功能和Markdown相关，我进行优化并适配各种场景和内容类型，添加剪藏和评论支持。

## Usage

安装油猴脚本：<https://greasyfork.org/zh-CN/scripts/>

## Dev

1. 安装依赖

```bash
pnpm i
```

2. 测试

```bash
pnpm dev
```

3. 打包

```bash
pnpm build
```

`dist/tampermonkey-script.js` 即为脚本，复制到油猴即可使用。


## 原理

1. 获取页面中所有的富文本框 `RichText` 为 `DOM`
2. 将 `DOM` 使用 `./src/lexer.ts` 转换为 `Lex`
3. 将 `Lex` 使用 `./src/parser.ts` 转换为 `Markdown`
4. 根据每个 `DOM` 获取标题等信息


## TODO

- [ ] 下载文章时同时包含头图
- [ ] TOC解析
- [ ] Markdown纯文本转义
- [ ] 保存更多评论？

