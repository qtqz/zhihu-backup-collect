# 知乎备份剪藏

在这个信息纷繁复杂、互联网没有记忆的时代，帮你保存知乎上珍贵的内容，方便日后查阅。

* 📑复制知乎文章/回答/想法为 Markdown
* 📁下载文章/回答/想法为 zip（包含图片与文本，以及赞数时间等信息）
* 📝下载文章/回答/想法为纯文本
* 🖼剪藏文章/回答/想法为图片
* ✏可选添加保存备注
* 💬可选保存评论（已支持弹出框）

（未进行全面测试，可能存在bug）注：此项目**非**爬蟲🐛，仅用于用户**日常保存喜欢的内容**。我们因热爱知乎而走到一起，请尊重内容作者权利，切勿用于抄袭与盈利。被保存的内容亦不能作为证据使用。使用此脚本即表示**您同意此页内容**，若引发任何纠纷后果自行承担。

此脚本目前已断断续续进行了一年的开发维护，期间适配了各种场景和内容类型，添加了存图、备注和评论解析功能。基本的 Markdown 解析和 zip 下载使用了这里的代码，[Howardzhangdqs/zhihu-copy-as-markdown](https://github.com/Howardzhangdqs/zhihu-copy-as-markdown)（MIT），感谢他的探索。

如果你喜欢此项目，想要**赞赏支持**💰，可扫描[赞赏码](https://qtqz.github.io/img/sponsor.png)。

## 使用

安装油猴脚本：[greasyfork - 知乎备份剪藏](https://greasyfork.org/zh-CN/scripts/486538-%E7%9F%A5%E4%B9%8E%E5%A4%87%E4%BB%BD%E5%89%AA%E8%97%8F)。或者在这里将`dist/tampermonkey-script.js`复制粘贴进脚本管理器中。在此之前，你需要有一个脚本管理器，如 Tampermonkey（油猴，篡改猴）。⚠ 2024-10-29 起，新版油猴中（5.3.2），您必须至浏览器 - 扩展 - **打开开发者选项**后才能使用用户脚本。[如何](https://www.tampermonkey.net/faq.php#Q209)。如果点击安装没反应，请至浏览器 - 下载，查看脚本是否被拦截。

鼠标移到知乎内容上，会出现保存按钮，点击即可保存（到下载目录）。已支持的页面有关注页、个人主页、回答页、问题页、文章页、想法页、收藏夹页、推荐页、搜索结果页；已支持的内容有文章、回答、想法。具体功能解释：

* 复制 Markdown：复制到剪贴板，语法见[Markdown Reference](https://commonmark.org/help/)，可选是否保存元信息和评论
* 下载 zip：将内容的图片、Markdown 文本、信息（赞数、时间等）、当前页评论（如果启用）保存为 zip，文件名格式`标题_作者_日期_备注.zip`。`.md`文件请用文本方式打开（如使用 Notepad3），语法同上。
* 下载纯文本：将内容转为 Markdown 文本，并添加信息与评论（如果启用），保存为 `.md`单文件。
* 剪藏图片：将当前内容（和评论）截为 PNG 图片，会自动隐藏你的头像以保护隐私。**请先滚动到底确保所有图片都加载**，否则图片会是空白（太长的截图建议用下面推荐软件保存）
* 备注：备注会保存在文件名末尾，最长60字符，空格会转义为“-”，不能包含` \ / : * ? " < > |`。提示：可以选中拖动内容中的字到备注栏。
* 保存评论：需要先**手动逐页暂存**，详情按评论区的按钮操作。

选项开关：

在目标页点击油猴，再点击脚本下方的开关以调整

可能的问题：

* 能不能保存更多评论？已经可以😋
* 如何保存PDF？右键-->打印-->打印为PDF
* 能否批量保存某答主/问题？不能，请找爬蟲，或使用下面推荐
* 已知问题：保存为图片时部分样式轻微异常
* 已知问题：未适配视频页和部分视频
* 已知问题：如果**想法**有大于 4 张图，则只能保存前 4 张
* 在关注页等页面，无法获取作者个性签名
* 提示：个人页的**想法**，点击发布时间，即可进到想法页，截图评论
* 如果脚本安装后无法运行（管理器中显示已启用未执行），请至浏览器 - 扩展 - 打开开发者选项，这是[油猴的要求](https://www.tampermonkey.net/faq.php#Q209)

其他推荐：

- **SingleFile**，浏览器扩展，扩展商店自寻，可以将网页的全部或部分（比如个人主页的一串回答、弹出窗口中的一串评论）保存为`html`单文件。
- **FSCapture**，网页长截图工具。可以先将网页缩放以节省空间。
- **系统自带画图**，截图后拼长图保存评论
- [chenluda/zhihu-download: 将知乎专栏文章转换为 Markdown 文件保存到本地](https://github.com/chenluda/zhihu-download)

## 开发

```bash
pnpm i
```

`0.7.11+`已启用更方便的测试：

1. 允许脚本管理器 Tampermonkey 访问文件网址 右键插件图标-插件管理页面-访问文件网址 或者参照官方 [faq](https://tampermonkey.net/faq.php?ext=dhdg#Q204)
2. 在脚本管理器中安装`scripts/dev.js`，并且修改其`@require `为正确的路径，以调用本地的`dist/bundle.js`。
3. `pnpm dev`
4. 刷新目标网页

```bash
pnpm build
```

> 需修改以解决[压缩包时间错误问题](https://github.com/Stuk/jszip/pull/735/files)，并且，[不可安装 3.10.1](https://github.com/Stuk/jszip/issues/814#issuecomment-1139378561)

## 原理

技术路线为**解析 DOM**，而非**请求 api**，所以不易受限，更直观，更可靠

1. 获取页面中所有的富文本框 `RichText` 为 `DOM`
5. 根据需要将评论暂存，以备保存
2. 将 `DOM` 使用 `./src/lexer.ts` 转换为 `Lex`
3. 将 `Lex` 使用 `./src/parser.ts` 转换为 `Markdown`
4. 根据每个 `DOM` 获取标题等信息

## TODO

- [X] 下载文章时包含头图
- [X] TOC解析
- [X] 解析当前页评论为Markdown
- [X] 为Markdown添加frontmatter
- ~~[ ] 考虑移除info.json~~
- ~~[ ] 用户自定义配置（麻烦，脚本开源，请自行修改）~~
- [X] 可选是否保存图片
- [X] 存长图时自动使图都加载
- [ ] 可选是否自动展开评论
- [X] 整理程序框图
- [ ] 检查与 *知乎增强* 脚本的兼容性
- [ ] 下载想法中的视频
- [X] 评论解析器，用于解析弹出框中的评论
- [X] 更多可配置项（开关）
- [X] 评论相对时间转绝对时间
- [X] 更好的代码组织，以处理不同的任务，并且配合自定义开关
- [X] 评论暂存的反馈
- [X] 下载zip时允许合并正文和评论
- [ ] 消息弹框提示系统

## Changelog

* 0.10.25（2025-03-07）:
    - 点评论区提示按钮可以显示当前油猴选项了，避免忘记当前选的是什么
    - 下载 zip 按钮添加下载提示语
    - 修复未存评弹框点确定太快会无效的问题
    - 修复保存不了有且仅有多个小表情的评论的问题
    - 元信息中添加 IP属地（如果有）
    - **修复评论时间错误问题**，并且更精确
* 0.10.19（2025-02-25）:
    - 下载 zip 时允许合并正文和评论（需通过油猴菜单手动开启）
    - 修复未存评弹框点确定后无法自动复制的问题
    - 修复在个人页搜索内容后按钮被隐藏的问题
    - 修复文章页有时不出现评论按钮的问题
    - 存长图时，若有图片未加载，给出提示
    - 修复不存图选项影响 zip 内文本的问题
* 0.10.13（2025-02-18）:
    - **重构主线程**，整理代码
    - 复制时支持复制评论了（需通过油猴菜单手动开启）
    - 支持复制或存文本时不保存图片（改为“[图片]”，需通过油猴菜单手动开启）
    - 修复在搜索结果页和文章页不能存评论的问题
    - 修复评论按钮显示突变
    - 点击存评论按钮后有了反馈
* 0.10.2（2025-02-15）:
    - 修复想法页可能不显示存评论按钮的问题
    - 修复存 zip 可能无法存评论的问题
* 0.10.0（2025-01-13）:
    - **全新的评论解析器**，可以解析弹出框中的评论
    - 优化代码与性能
    - 评论相对时间转绝对时间
    - 补充转发想法中缺少的换行
* 25.1.3（0.9.32）:
    - 保存想法的标题
    - 移除更多的搜索推荐词
* 24.12.20（0.9.30）:
    - 修复无法保存无字想法问题
    - 修复下载 zip 与油猴菜单的冲突
    - 现在提示保存失败后无需滚动即可重新保存
* 24.12.3（0.9.26）:
    - 修复突然无法下载 zip 问题
    - 现在展开内容后无需滚动即可保存
    - 开启复制带 fm 时不再额外带标题
* 24.11.21（0.9.23）:
    - 复制时可以包含 frontmatter 信息了（需通过油猴菜单手动打开）
    - 添加了油猴脚本选项**菜单**
* 24.11.13（0.9.22）:
    - 修复两处截图样式异常问题
    - 修复浏览器窗口过窄时按钮溢出屏幕的问题
    - 修复按时间排序的问题被误判为回答的问题
* 24.10.24（0.9.18）:
    - 修复保存分段引用内容未分段问题
    - 修复保存带标点加粗内容在阅读器中误加粗问题
    - 修复保存段首有空格内容在阅读器中误判为代码块问题
    - 修复收藏夹页无法保存部分图片问题
    - 保存图注（图片下方灰字）作为斜体的普通段落
    - 复制除想法外内容时添加标题
* 24.8.26（0.9.11）:
    - 修复保存转发的想法异常
    - 修复新的样式异常
    - frontmatter 添加作者个性签名
* 24.7.10（0.9.7）:
    - 修复搜索结果页保存报错
    - 修复获取评论数量不对
* 24.6.13（0.9.6）:
    - 修复新的截图出错问题
* 24.6.12（0.9.5）:
    - 文章页截图不会再截到按钮了
    - 移除没图片时多余的 assets 文件夹
    - **添加保存为单文件功能**
    - 支持保存评论中贴纸表情
    - 修复评论中图片重复的问题
    - 优化体验，写备注时可以把文本框拖大
* 24.3.29（0.8.25）:
    - 移除没图片评论时多余的 assets 文件夹
    - 修复新的无法保存评论问题
    - 下载文章时包含头图
* 24.3.28（0.8.22）:
    - 隐藏已折叠内容下的按钮
    - 修复保存无名用户内容出错
    - 修复按钮干扰选择文字的问题
    - 修复点击保存评论时奇怪的跳转问题
* 24.3.27（0.8.18）:
    - 保存失败时给予补救机会
    - 修复按钮被目录遮挡无法点击
    - 修复无法保存机构号主页内容
    - 修复 url 获取错误
    - 内容子标题从 h2 开始
    - 解析参考文献
    - 解析目录
* 24.3.20（0.8.8）:
    - 修复保存匿名用户内容出错
    - 增加保存失败原因提示
* 24.3.4（0.8.7）:
    - 更方便的测试
    - 解析评论为Markdown
    - 评论图片本地化
    - **完善解析评论**修复bug
    - 修复zip内文件日期错误问题
    - 修复无法下载视频问题
    - 适配推荐页、搜索结果页
    - info中添加ip属地（如果有）
    - 修复想法无法保存图片
* 24.2.29（0.7.10）:
    - 备注改为最长60字
    - 修复个人页无法保存想法问题
    - 修复保存zip处理评论可能出错问题
* 24.2.4（0.7.7）:
    - 为Markdown添加frontmatter
    - 修正下载md内的图片路径为本地路径
    - 对于有目录的内容，减轻按钮与目录的重叠
* 24.1.19（0.7.4）:
    - 截图适配专栏文章
* 24.1.13（0.7.x）:
    - 粗略**解析评论**并添加到zip
    - 修复大量bug
    - 准备发布
* 24.1.13（0.6.x）:
    - **适配想法**中的复杂情形
* 24.1.11（0.5.x）:
    - **添加截图功能**
    - 初步适配想法
* 24.1.2（0.4.x）:
    - 初步重制
* 23.12.29:
    - 立项
