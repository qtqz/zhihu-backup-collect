# 知乎备份工具

在这个互联网没有记忆的时代，帮你保存知乎上珍贵的内容。

* 一键复制知乎文章/回答/想法为Markdown
* 下载文章/回答/想法为zip（包含图片与文本，以及赞数评论数等信息）
* 剪藏文章/回答/想法为图片/PDF
* 可选添加保存备注
* 可选保存当前页评论

注：此项目**非**爬蟲，仅用于用户日常保存喜欢的内容。请尊重内容作者权利，切勿用于洗稿、抄袭。

已支持的页面有关注页，个人主页，回答页，问题页，文章页，想法页，收藏夹页；已支持的内容有文章/回答/想法。

此项目基于[github.com/Howardzhangdqs/zhihu-copy-as-markdown](https://github.com/Howardzhangdqs/zhihu-copy-as-markdown)（MIT）开发而来，**感谢原作者的探索**。原作者实现了Markdown相关和zip下载，我进行优化并适配各种场景和内容类型，添加剪藏、备注和评论支持。

## Usage

安装油猴脚本：<https://greasyfork.org/zh-CN/scripts/>

鼠标移到知乎内容上，会出现保存按钮，点击即可保存（到下载目录）。具体功能解释：

* 复制Markdown：语法见[Markdown Reference](https://commonmark.org/help/)
* 下载zip：将内容的图片、Markdown文本、信息（赞数、时间等）、当前页评论（如果启用）保存为zip，文件名格式`标题_作者_日期_备注.zip`
* 剪藏PDF：**暂未实现**
* 剪藏图片：将当前内容（和评论）截为PNG图片，会自动隐藏你的头像以保护隐私。
* 备注：备注会保存在文件名末尾，最长16字符，不能包含` \ / : * ? " < > |`。
* 保存评论：执行以上操作时包含**当前显示的评论**，只能保存内容下方的（弹出式窗口的评论不能），已关闭将显示已关闭，**未展开将忽略**。

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
- [ ] PDF，用媒体查询 + window.print()，不使用jspdf

