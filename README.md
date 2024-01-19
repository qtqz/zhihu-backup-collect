# 知乎备份剪藏

在这个互联网没有记忆的时代，帮你保存知乎上珍贵的内容。

* 一键复制知乎文章/回答/想法为Markdown
* 下载文章/回答/想法为zip（包含图片与文本，以及赞数时间等信息）
* 剪藏文章/回答/想法为图片
* 可选添加保存备注
* 可选保存当前页评论

注：此项目**非**爬蟲，仅用于用户**日常保存喜欢的内容**。请尊重内容作者权利，切勿用于洗稿、抄袭。

已支持的页面有关注页，个人主页，回答页，问题页，文章页，想法页，收藏夹页；已支持的内容有文章/回答/想法。

此项目基于[github.com/Howardzhangdqs/zhihu-copy-as-markdown](https://github.com/Howardzhangdqs/zhihu-copy-as-markdown)（MIT）开发而来，**感谢原作者的探索**。原作者实现了Markdown相关和zip下载，我进行优化并适配各种场景和内容类型，添加剪藏、备注和评论支持。

## Usage

安装油猴脚本：<https://greasyfork.org/zh-CN/scripts/>

鼠标移到知乎内容上，会出现保存按钮，点击即可保存（到下载目录）。具体功能解释：

* 复制Markdown：复制到剪贴板，语法见[Markdown Reference](https://commonmark.org/help/)
* 下载zip：将内容的图片、Markdown文本、信息（赞数、时间等）、当前页评论（如果启用）保存为zip，文件名格式`标题_作者_日期_备注.zip`
* 剪藏图片：将当前内容（和评论）截为PNG图片，会自动隐藏你的头像以保护隐私。
* 备注：备注会保存在文件名末尾，最长16字符，空格会转义为“-”，不能包含` \ / : * ? " < > |`。
* 保存评论：执行以上操作时包含**当前显示的评论**，只能保存内容下方的（弹出式窗口的评论不能），存到zip还未解析为Markdown，凑合用。

可能的问题：

* **能不能保存更多评论**？不能
* **能否添加保存PDF功能**？因实现过于复杂臃肿，暂不添加，可以右键-->打印-->打印为PDF
* **能否批量保存某答主/问题**？不能，请找爬蟲
* **已知问题**：保存图片时部分样式（点赞栏等）轻微异常
* **已知问题**：未适配视频回答

## Dev

1. 安装依赖

```bash
pnpm i
```

2. 测试

```bash
pnpm dev
```

需要在`/test`文件夹中放入测试html（F12-复制html节点获取）

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
- [ ] 解析当前页评论为Markdown
- [ ] 为Markdown添加frontmatter
- [ ] 快捷键支持


<!--
不显示我关注的人标识

## 当前页评论

40 条评论

### 因缺思听

第一次看见这么通俗的而且不含Alice和Bob的密码学介绍[飙泪笑]

2023-11-19 · IP 属地上海 ​54 赞

#### Duke

Alice和Bob真的在计算机网络和网络安全抹不去了[飙泪笑]

2023-11-20 · IP 属地江苏 ​8 赞

### Peter

居然公开的加密方式和公开的公式还能防住窃听，数学的力量太强大了[doge]

2023-11-17 · IP 属地湖北 ​26

#### 仰望星空者

加密算法最重要的就是，它的安全性取决于密钥的私有性而不是算法本身保密。

2023-11-18 · IP 属地江苏 ​51

#### 伤心的笔 > 夏益

实现的重要性在于不要有bug，算法不能保密

2023-11-19 · IP 属地山东 ​6

> 查看全部 6 条回复​

### Neurax生产姬

好，这让我想起了去年高三做的椭圆曲线导数题[捂脸][捂脸]

2023-11-20 · IP 属地北京 ​3

#### 偷吃狗狗的骨头

你们高中学椭圆曲线？怕不是把椭圆曲线和椭圆搞混了[捂嘴]

2023-11-20 · IP 属地上海 ​4

#### Neurax生产姬 > 偷吃狗狗的骨头

![]()

2023-11-20 · IP 属地北京 ​4

> 查看全部 8 条回复
​-->