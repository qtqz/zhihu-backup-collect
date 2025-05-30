// ==UserScript==
// @name         知乎备份剪藏
// @namespace    qtqz
// @source       https://github.com/qtqz/zhihu-backup-collect
// @version      0.10.40
// @description  将你喜欢的知乎回答/文章/想法保存为 markdown / zip / png
// @author       qtqz
// @match        https://www.zhihu.com/follow
// @match        https://www.zhihu.com/pin/*
// @match        https://www.zhihu.com/people/*
// @match        https://www.zhihu.com/org/*
// @match        https://www.zhihu.com/question/*
// @match        https://www.zhihu.com/answer/*
// @match        https://www.zhihu.com/collection/*
// @match        https://zhuanlan.zhihu.com/p/*
// @match        https://www.zhihu.com/search*content*
// @match        https://www.zhihu.com/
// @license      MIT
// @icon         https://static.zhihu.com/heifetz/favicon.ico
// @grant        GM_setValue
// @grant        GM_getValue
// @grant        GM_registerMenuCommand
// @grant        GM_unregisterMenuCommand
// ==/UserScript==

/** 
## Changelog

* 0.10.40（2025-05-30）:
    - 修复最近保存专栏文章出错问题
    - 修复保存赞过的评论赞数量错误问题
    - 支持保存被折叠的评论
    - 支持保存评论中的@
    - 补充多行评论中缺少的换行
    - 关注页关注问题的动态现在不会出按钮了
* 0.10.32（2025-05-10）:
    - 修复有时候油猴菜单会消失的问题
    - 修复在个人主页搜索后无法保存想法的问题
    - 修复某些页面下无法保存文章的评论的问题
    - 试图避免无法保存需重新保存的问题
    - 修复无法保存带下划线文字的问题（非链接）
    - 允许**删除文中多余的换行**（需通过油猴菜单手动开启）
* 0.10.25（2025-03-07）:
    - 点评论区提示按钮可以显示当前油猴选项了，避免忘记当前选的是什么
    - 下载 zip 按钮添加下载提示语
    - 修复未存评弹框点确定太快会无效的问题
    - 修复保存不了有且仅有多个小表情的评论的问题
    - 元信息中添加 IP属地（如果有）
    - **修复评论时间错误问题**，并且更精确一点了
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

 */

/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 227:
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function(a,b){if(true)!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = (b),
		__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
		(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));else {}})(this,function(){"use strict";function b(a,b){return"undefined"==typeof b?b={autoBom:!1}:"object"!=typeof b&&(console.warn("Deprecated: Expected third argument to be a object"),b={autoBom:!b}),b.autoBom&&/^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(a.type)?new Blob(["\uFEFF",a],{type:a.type}):a}function c(a,b,c){var d=new XMLHttpRequest;d.open("GET",a),d.responseType="blob",d.onload=function(){g(d.response,b,c)},d.onerror=function(){console.error("could not download file")},d.send()}function d(a){var b=new XMLHttpRequest;b.open("HEAD",a,!1);try{b.send()}catch(a){}return 200<=b.status&&299>=b.status}function e(a){try{a.dispatchEvent(new MouseEvent("click"))}catch(c){var b=document.createEvent("MouseEvents");b.initMouseEvent("click",!0,!0,window,0,0,0,80,20,!1,!1,!1,!1,0,null),a.dispatchEvent(b)}}var f="object"==typeof window&&window.window===window?window:"object"==typeof self&&self.self===self?self:"object"==typeof __webpack_require__.g&&__webpack_require__.g.global===__webpack_require__.g?__webpack_require__.g:void 0,a=f.navigator&&/Macintosh/.test(navigator.userAgent)&&/AppleWebKit/.test(navigator.userAgent)&&!/Safari/.test(navigator.userAgent),g=f.saveAs||("object"!=typeof window||window!==f?function(){}:"download"in HTMLAnchorElement.prototype&&!a?function(b,g,h){var i=f.URL||f.webkitURL,j=document.createElement("a");g=g||b.name||"download",j.download=g,j.rel="noopener","string"==typeof b?(j.href=b,j.origin===location.origin?e(j):d(j.href)?c(b,g,h):e(j,j.target="_blank")):(j.href=i.createObjectURL(b),setTimeout(function(){i.revokeObjectURL(j.href)},4E4),setTimeout(function(){e(j)},0))}:"msSaveOrOpenBlob"in navigator?function(f,g,h){if(g=g||f.name||"download","string"!=typeof f)navigator.msSaveOrOpenBlob(b(f,h),g);else if(d(f))c(f,g,h);else{var i=document.createElement("a");i.href=f,i.target="_blank",setTimeout(function(){e(i)})}}:function(b,d,e,g){if(g=g||open("","_blank"),g&&(g.document.title=g.document.body.innerText="downloading..."),"string"==typeof b)return c(b,d,e);var h="application/octet-stream"===b.type,i=/constructor/i.test(f.HTMLElement)||f.safari,j=/CriOS\/[\d]+/.test(navigator.userAgent);if((j||h&&i||a)&&"undefined"!=typeof FileReader){var k=new FileReader;k.onloadend=function(){var a=k.result;a=j?a:a.replace(/^data:[^;]*;/,"data:attachment/file;"),g?g.location.href=a:location=a,g=null},k.readAsDataURL(b)}else{var l=f.URL||f.webkitURL,m=l.createObjectURL(b);g?g.location=m:location.href=m,g=null,setTimeout(function(){l.revokeObjectURL(m)},4E4)}});f.saveAs=g.saveAs=g, true&&(module.exports=g)});

//# sourceMappingURL=FileSaver.min.js.map

/***/ }),

/***/ 434:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/*!

JSZip v3.9.1 - A JavaScript class for generating and reading zip files
<http://stuartk.com/jszip>

(c) 2009-2016 Stuart Knightley <stuart [at] stuartk.com>
Dual licenced under the MIT license or GPLv3. See https://raw.github.com/Stuk/jszip/master/LICENSE.markdown.

JSZip uses the library pako released under the MIT license :
https://github.com/nodeca/pako/blob/master/LICENSE
*/

!function(t){if(true)module.exports=t();else {}}(function(){return function s(a,o,h){function u(r,t){if(!o[r]){if(!a[r]){var e=undefined;if(!t&&e)return require(r,!0);if(l)return l(r,!0);var i=new Error("Cannot find module '"+r+"'");throw i.code="MODULE_NOT_FOUND",i}var n=o[r]={exports:{}};a[r][0].call(n.exports,function(t){var e=a[r][1][t];return u(e||t)},n,n.exports,s,a,o,h)}return o[r].exports}for(var l=undefined,t=0;t<h.length;t++)u(h[t]);return u}({1:[function(t,e,r){"use strict";var c=t("./utils"),d=t("./support"),p="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";r.encode=function(t){for(var e,r,i,n,s,a,o,h=[],u=0,l=t.length,f=l,d="string"!==c.getTypeOf(t);u<t.length;)f=l-u,i=d?(e=t[u++],r=u<l?t[u++]:0,u<l?t[u++]:0):(e=t.charCodeAt(u++),r=u<l?t.charCodeAt(u++):0,u<l?t.charCodeAt(u++):0),n=e>>2,s=(3&e)<<4|r>>4,a=1<f?(15&r)<<2|i>>6:64,o=2<f?63&i:64,h.push(p.charAt(n)+p.charAt(s)+p.charAt(a)+p.charAt(o));return h.join("")},r.decode=function(t){var e,r,i,n,s,a,o=0,h=0,u="data:";if(t.substr(0,u.length)===u)throw new Error("Invalid base64 input, it looks like a data url.");var l,f=3*(t=t.replace(/[^A-Za-z0-9\+\/\=]/g,"")).length/4;if(t.charAt(t.length-1)===p.charAt(64)&&f--,t.charAt(t.length-2)===p.charAt(64)&&f--,f%1!=0)throw new Error("Invalid base64 input, bad content length.");for(l=d.uint8array?new Uint8Array(0|f):new Array(0|f);o<t.length;)e=p.indexOf(t.charAt(o++))<<2|(n=p.indexOf(t.charAt(o++)))>>4,r=(15&n)<<4|(s=p.indexOf(t.charAt(o++)))>>2,i=(3&s)<<6|(a=p.indexOf(t.charAt(o++))),l[h++]=e,64!==s&&(l[h++]=r),64!==a&&(l[h++]=i);return l}},{"./support":30,"./utils":32}],2:[function(t,e,r){"use strict";var i=t("./external"),n=t("./stream/DataWorker"),s=t("./stream/Crc32Probe"),a=t("./stream/DataLengthProbe");function o(t,e,r,i,n){this.compressedSize=t,this.uncompressedSize=e,this.crc32=r,this.compression=i,this.compressedContent=n}o.prototype={getContentWorker:function(){var t=new n(i.Promise.resolve(this.compressedContent)).pipe(this.compression.uncompressWorker()).pipe(new a("data_length")),e=this;return t.on("end",function(){if(this.streamInfo.data_length!==e.uncompressedSize)throw new Error("Bug : uncompressed data size mismatch")}),t},getCompressedWorker:function(){return new n(i.Promise.resolve(this.compressedContent)).withStreamInfo("compressedSize",this.compressedSize).withStreamInfo("uncompressedSize",this.uncompressedSize).withStreamInfo("crc32",this.crc32).withStreamInfo("compression",this.compression)}},o.createWorkerFrom=function(t,e,r){return t.pipe(new s).pipe(new a("uncompressedSize")).pipe(e.compressWorker(r)).pipe(new a("compressedSize")).withStreamInfo("compression",e)},e.exports=o},{"./external":6,"./stream/Crc32Probe":25,"./stream/DataLengthProbe":26,"./stream/DataWorker":27}],3:[function(t,e,r){"use strict";var i=t("./stream/GenericWorker");r.STORE={magic:"\0\0",compressWorker:function(t){return new i("STORE compression")},uncompressWorker:function(){return new i("STORE decompression")}},r.DEFLATE=t("./flate")},{"./flate":7,"./stream/GenericWorker":28}],4:[function(t,e,r){"use strict";var i=t("./utils");var o=function(){for(var t,e=[],r=0;r<256;r++){t=r;for(var i=0;i<8;i++)t=1&t?3988292384^t>>>1:t>>>1;e[r]=t}return e}();e.exports=function(t,e){return void 0!==t&&t.length?"string"!==i.getTypeOf(t)?function(t,e,r,i){var n=o,s=i+r;t^=-1;for(var a=i;a<s;a++)t=t>>>8^n[255&(t^e[a])];return-1^t}(0|e,t,t.length,0):function(t,e,r,i){var n=o,s=i+r;t^=-1;for(var a=i;a<s;a++)t=t>>>8^n[255&(t^e.charCodeAt(a))];return-1^t}(0|e,t,t.length,0):0}},{"./utils":32}],5:[function(t,e,r){"use strict";r.base64=!1,r.binary=!1,r.dir=!1,r.createFolders=!0,r.date=null,r.compression=null,r.compressionOptions=null,r.comment=null,r.unixPermissions=null,r.dosPermissions=null},{}],6:[function(t,e,r){"use strict";var i=null;i="undefined"!=typeof Promise?Promise:t("lie"),e.exports={Promise:i}},{lie:37}],7:[function(t,e,r){"use strict";var i="undefined"!=typeof Uint8Array&&"undefined"!=typeof Uint16Array&&"undefined"!=typeof Uint32Array,n=t("pako"),s=t("./utils"),a=t("./stream/GenericWorker"),o=i?"uint8array":"array";function h(t,e){a.call(this,"FlateWorker/"+t),this._pako=null,this._pakoAction=t,this._pakoOptions=e,this.meta={}}r.magic="\b\0",s.inherits(h,a),h.prototype.processChunk=function(t){this.meta=t.meta,null===this._pako&&this._createPako(),this._pako.push(s.transformTo(o,t.data),!1)},h.prototype.flush=function(){a.prototype.flush.call(this),null===this._pako&&this._createPako(),this._pako.push([],!0)},h.prototype.cleanUp=function(){a.prototype.cleanUp.call(this),this._pako=null},h.prototype._createPako=function(){this._pako=new n[this._pakoAction]({raw:!0,level:this._pakoOptions.level||-1});var e=this;this._pako.onData=function(t){e.push({data:t,meta:e.meta})}},r.compressWorker=function(t){return new h("Deflate",t)},r.uncompressWorker=function(){return new h("Inflate",{})}},{"./stream/GenericWorker":28,"./utils":32,pako:38}],8:[function(t,e,r){"use strict";function A(t,e){var r,i="";for(r=0;r<e;r++)i+=String.fromCharCode(255&t),t>>>=8;return i}function i(t,e,r,i,n,s){var a,o,h=t.file,u=t.compression,l=s!==O.utf8encode,f=I.transformTo("string",s(h.name)),d=I.transformTo("string",O.utf8encode(h.name)),c=h.comment,p=I.transformTo("string",s(c)),m=I.transformTo("string",O.utf8encode(c)),_=d.length!==h.name.length,g=m.length!==c.length,b="",v="",y="",w=h.dir,k=h.date,x={crc32:0,compressedSize:0,uncompressedSize:0};e&&!r||(x.crc32=t.crc32,x.compressedSize=t.compressedSize,x.uncompressedSize=t.uncompressedSize);var S=0;e&&(S|=8),l||!_&&!g||(S|=2048);var z=0,C=0;w&&(z|=16),"UNIX"===n?(C=798,z|=function(t,e){var r=t;return t||(r=e?16893:33204),(65535&r)<<16}(h.unixPermissions,w)):(C=20,z|=function(t){return 63&(t||0)}(h.dosPermissions)),a=k.getHours(),a<<=6,a|=k.getMinutes(),a<<=5,a|=k.getSeconds()/2,o=k.getFullYear()-1980,o<<=4,o|=k.getMonth()+1,o<<=5,o|=k.getDate(),_&&(v=A(1,1)+A(B(f),4)+d,b+="up"+A(v.length,2)+v),g&&(y=A(1,1)+A(B(p),4)+m,b+="uc"+A(y.length,2)+y);var E="";return E+="\n\0",E+=A(S,2),E+=u.magic,E+=A(a,2),E+=A(o,2),E+=A(x.crc32,4),E+=A(x.compressedSize,4),E+=A(x.uncompressedSize,4),E+=A(f.length,2),E+=A(b.length,2),{fileRecord:R.LOCAL_FILE_HEADER+E+f+b,dirRecord:R.CENTRAL_FILE_HEADER+A(C,2)+E+A(p.length,2)+"\0\0\0\0"+A(z,4)+A(i,4)+f+b+p}}var I=t("../utils"),n=t("../stream/GenericWorker"),O=t("../utf8"),B=t("../crc32"),R=t("../signature");function s(t,e,r,i){n.call(this,"ZipFileWorker"),this.bytesWritten=0,this.zipComment=e,this.zipPlatform=r,this.encodeFileName=i,this.streamFiles=t,this.accumulate=!1,this.contentBuffer=[],this.dirRecords=[],this.currentSourceOffset=0,this.entriesCount=0,this.currentFile=null,this._sources=[]}I.inherits(s,n),s.prototype.push=function(t){var e=t.meta.percent||0,r=this.entriesCount,i=this._sources.length;this.accumulate?this.contentBuffer.push(t):(this.bytesWritten+=t.data.length,n.prototype.push.call(this,{data:t.data,meta:{currentFile:this.currentFile,percent:r?(e+100*(r-i-1))/r:100}}))},s.prototype.openedSource=function(t){this.currentSourceOffset=this.bytesWritten,this.currentFile=t.file.name;var e=this.streamFiles&&!t.file.dir;if(e){var r=i(t,e,!1,this.currentSourceOffset,this.zipPlatform,this.encodeFileName);this.push({data:r.fileRecord,meta:{percent:0}})}else this.accumulate=!0},s.prototype.closedSource=function(t){this.accumulate=!1;var e=this.streamFiles&&!t.file.dir,r=i(t,e,!0,this.currentSourceOffset,this.zipPlatform,this.encodeFileName);if(this.dirRecords.push(r.dirRecord),e)this.push({data:function(t){return R.DATA_DESCRIPTOR+A(t.crc32,4)+A(t.compressedSize,4)+A(t.uncompressedSize,4)}(t),meta:{percent:100}});else for(this.push({data:r.fileRecord,meta:{percent:0}});this.contentBuffer.length;)this.push(this.contentBuffer.shift());this.currentFile=null},s.prototype.flush=function(){for(var t=this.bytesWritten,e=0;e<this.dirRecords.length;e++)this.push({data:this.dirRecords[e],meta:{percent:100}});var r=this.bytesWritten-t,i=function(t,e,r,i,n){var s=I.transformTo("string",n(i));return R.CENTRAL_DIRECTORY_END+"\0\0\0\0"+A(t,2)+A(t,2)+A(e,4)+A(r,4)+A(s.length,2)+s}(this.dirRecords.length,r,t,this.zipComment,this.encodeFileName);this.push({data:i,meta:{percent:100}})},s.prototype.prepareNextSource=function(){this.previous=this._sources.shift(),this.openedSource(this.previous.streamInfo),this.isPaused?this.previous.pause():this.previous.resume()},s.prototype.registerPrevious=function(t){this._sources.push(t);var e=this;return t.on("data",function(t){e.processChunk(t)}),t.on("end",function(){e.closedSource(e.previous.streamInfo),e._sources.length?e.prepareNextSource():e.end()}),t.on("error",function(t){e.error(t)}),this},s.prototype.resume=function(){return!!n.prototype.resume.call(this)&&(!this.previous&&this._sources.length?(this.prepareNextSource(),!0):this.previous||this._sources.length||this.generatedError?void 0:(this.end(),!0))},s.prototype.error=function(t){var e=this._sources;if(!n.prototype.error.call(this,t))return!1;for(var r=0;r<e.length;r++)try{e[r].error(t)}catch(t){}return!0},s.prototype.lock=function(){n.prototype.lock.call(this);for(var t=this._sources,e=0;e<t.length;e++)t[e].lock()},e.exports=s},{"../crc32":4,"../signature":23,"../stream/GenericWorker":28,"../utf8":31,"../utils":32}],9:[function(t,e,r){"use strict";var u=t("../compressions"),i=t("./ZipFileWorker");r.generateWorker=function(t,a,e){var o=new i(a.streamFiles,e,a.platform,a.encodeFileName),h=0;try{t.forEach(function(t,e){h++;var r=function(t,e){var r=t||e,i=u[r];if(!i)throw new Error(r+" is not a valid compression method !");return i}(e.options.compression,a.compression),i=e.options.compressionOptions||a.compressionOptions||{},n=e.dir,s=e.date;e._compressWorker(r,i).withStreamInfo("file",{name:t,dir:n,date:s,comment:e.comment||"",unixPermissions:e.unixPermissions,dosPermissions:e.dosPermissions}).pipe(o)}),o.entriesCount=h}catch(t){o.error(t)}return o}},{"../compressions":3,"./ZipFileWorker":8}],10:[function(t,e,r){"use strict";function i(){if(!(this instanceof i))return new i;if(arguments.length)throw new Error("The constructor with parameters has been removed in JSZip 3.0, please check the upgrade guide.");this.files=Object.create(null),this.comment=null,this.root="",this.clone=function(){var t=new i;for(var e in this)"function"!=typeof this[e]&&(t[e]=this[e]);return t}}(i.prototype=t("./object")).loadAsync=t("./load"),i.support=t("./support"),i.defaults=t("./defaults"),i.version="3.9.1",i.loadAsync=function(t,e){return(new i).loadAsync(t,e)},i.external=t("./external"),e.exports=i},{"./defaults":5,"./external":6,"./load":11,"./object":15,"./support":30}],11:[function(t,e,r){"use strict";var u=t("./utils"),n=t("./external"),i=t("./utf8"),s=t("./zipEntries"),a=t("./stream/Crc32Probe"),l=t("./nodejsUtils");function f(i){return new n.Promise(function(t,e){var r=i.decompressed.getContentWorker().pipe(new a);r.on("error",function(t){e(t)}).on("end",function(){r.streamInfo.crc32!==i.decompressed.crc32?e(new Error("Corrupted zip : CRC32 mismatch")):t()}).resume()})}e.exports=function(t,o){var h=this;return o=u.extend(o||{},{base64:!1,checkCRC32:!1,optimizedBinaryString:!1,createFolders:!1,decodeFileName:i.utf8decode}),l.isNode&&l.isStream(t)?n.Promise.reject(new Error("JSZip can't accept a stream when loading a zip file.")):u.prepareContent("the loaded zip file",t,!0,o.optimizedBinaryString,o.base64).then(function(t){var e=new s(o);return e.load(t),e}).then(function(t){var e=[n.Promise.resolve(t)],r=t.files;if(o.checkCRC32)for(var i=0;i<r.length;i++)e.push(f(r[i]));return n.Promise.all(e)}).then(function(t){for(var e=t.shift(),r=e.files,i=0;i<r.length;i++){var n=r[i],s=n.fileNameStr,a=u.resolve(n.fileNameStr);h.file(a,n.decompressed,{binary:!0,optimizedBinaryString:!0,date:n.date,dir:n.dir,comment:n.fileCommentStr.length?n.fileCommentStr:null,unixPermissions:n.unixPermissions,dosPermissions:n.dosPermissions,createFolders:o.createFolders}),n.dir||(h.file(a).unsafeOriginalName=s)}return e.zipComment.length&&(h.comment=e.zipComment),h})}},{"./external":6,"./nodejsUtils":14,"./stream/Crc32Probe":25,"./utf8":31,"./utils":32,"./zipEntries":33}],12:[function(t,e,r){"use strict";var i=t("../utils"),n=t("../stream/GenericWorker");function s(t,e){n.call(this,"Nodejs stream input adapter for "+t),this._upstreamEnded=!1,this._bindStream(e)}i.inherits(s,n),s.prototype._bindStream=function(t){var e=this;(this._stream=t).pause(),t.on("data",function(t){e.push({data:t,meta:{percent:0}})}).on("error",function(t){e.isPaused?this.generatedError=t:e.error(t)}).on("end",function(){e.isPaused?e._upstreamEnded=!0:e.end()})},s.prototype.pause=function(){return!!n.prototype.pause.call(this)&&(this._stream.pause(),!0)},s.prototype.resume=function(){return!!n.prototype.resume.call(this)&&(this._upstreamEnded?this.end():this._stream.resume(),!0)},e.exports=s},{"../stream/GenericWorker":28,"../utils":32}],13:[function(t,e,r){"use strict";var n=t("readable-stream").Readable;function i(t,e,r){n.call(this,e),this._helper=t;var i=this;t.on("data",function(t,e){i.push(t)||i._helper.pause(),r&&r(e)}).on("error",function(t){i.emit("error",t)}).on("end",function(){i.push(null)})}t("../utils").inherits(i,n),i.prototype._read=function(){this._helper.resume()},e.exports=i},{"../utils":32,"readable-stream":16}],14:[function(t,e,r){"use strict";e.exports={isNode:"undefined"!=typeof Buffer,newBufferFrom:function(t,e){if(Buffer.from&&Buffer.from!==Uint8Array.from)return Buffer.from(t,e);if("number"==typeof t)throw new Error('The "data" argument must not be a number');return new Buffer(t,e)},allocBuffer:function(t){if(Buffer.alloc)return Buffer.alloc(t);var e=new Buffer(t);return e.fill(0),e},isBuffer:function(t){return Buffer.isBuffer(t)},isStream:function(t){return t&&"function"==typeof t.on&&"function"==typeof t.pause&&"function"==typeof t.resume}}},{}],15:[function(t,e,r){"use strict";function s(t,e,r){var i,n=u.getTypeOf(e),s=u.extend(r||{},f);s.date=s.date||new Date,null!==s.compression&&(s.compression=s.compression.toUpperCase()),"string"==typeof s.unixPermissions&&(s.unixPermissions=parseInt(s.unixPermissions,8)),s.unixPermissions&&16384&s.unixPermissions&&(s.dir=!0),s.dosPermissions&&16&s.dosPermissions&&(s.dir=!0),s.dir&&(t=g(t)),s.createFolders&&(i=_(t))&&b.call(this,i,!0);var a="string"===n&&!1===s.binary&&!1===s.base64;r&&void 0!==r.binary||(s.binary=!a),(e instanceof d&&0===e.uncompressedSize||s.dir||!e||0===e.length)&&(s.base64=!1,s.binary=!0,e="",s.compression="STORE",n="string");var o=null;o=e instanceof d||e instanceof l?e:p.isNode&&p.isStream(e)?new m(t,e):u.prepareContent(t,e,s.binary,s.optimizedBinaryString,s.base64);var h=new c(t,o,s);this.files[t]=h}var n=t("./utf8"),u=t("./utils"),l=t("./stream/GenericWorker"),a=t("./stream/StreamHelper"),f=t("./defaults"),d=t("./compressedObject"),c=t("./zipObject"),o=t("./generate"),p=t("./nodejsUtils"),m=t("./nodejs/NodejsStreamInputAdapter"),_=function(t){"/"===t.slice(-1)&&(t=t.substring(0,t.length-1));var e=t.lastIndexOf("/");return 0<e?t.substring(0,e):""},g=function(t){return"/"!==t.slice(-1)&&(t+="/"),t},b=function(t,e){return e=void 0!==e?e:f.createFolders,t=g(t),this.files[t]||s.call(this,t,null,{dir:!0,createFolders:e}),this.files[t]};function h(t){return"[object RegExp]"===Object.prototype.toString.call(t)}var i={load:function(){throw new Error("This method has been removed in JSZip 3.0, please check the upgrade guide.")},forEach:function(t){var e,r,i;for(e in this.files)i=this.files[e],(r=e.slice(this.root.length,e.length))&&e.slice(0,this.root.length)===this.root&&t(r,i)},filter:function(r){var i=[];return this.forEach(function(t,e){r(t,e)&&i.push(e)}),i},file:function(t,e,r){if(1!==arguments.length)return t=this.root+t,s.call(this,t,e,r),this;if(h(t)){var i=t;return this.filter(function(t,e){return!e.dir&&i.test(t)})}var n=this.files[this.root+t];return n&&!n.dir?n:null},folder:function(r){if(!r)return this;if(h(r))return this.filter(function(t,e){return e.dir&&r.test(t)});var t=this.root+r,e=b.call(this,t),i=this.clone();return i.root=e.name,i},remove:function(r){r=this.root+r;var t=this.files[r];if(t||("/"!==r.slice(-1)&&(r+="/"),t=this.files[r]),t&&!t.dir)delete this.files[r];else for(var e=this.filter(function(t,e){return e.name.slice(0,r.length)===r}),i=0;i<e.length;i++)delete this.files[e[i].name];return this},generate:function(t){throw new Error("This method has been removed in JSZip 3.0, please check the upgrade guide.")},generateInternalStream:function(t){var e,r={};try{if((r=u.extend(t||{},{streamFiles:!1,compression:"STORE",compressionOptions:null,type:"",platform:"DOS",comment:null,mimeType:"application/zip",encodeFileName:n.utf8encode})).type=r.type.toLowerCase(),r.compression=r.compression.toUpperCase(),"binarystring"===r.type&&(r.type="string"),!r.type)throw new Error("No output type specified.");u.checkSupport(r.type),"darwin"!==r.platform&&"freebsd"!==r.platform&&"linux"!==r.platform&&"sunos"!==r.platform||(r.platform="UNIX"),"win32"===r.platform&&(r.platform="DOS");var i=r.comment||this.comment||"";e=o.generateWorker(this,r,i)}catch(t){(e=new l("error")).error(t)}return new a(e,r.type||"string",r.mimeType)},generateAsync:function(t,e){return this.generateInternalStream(t).accumulate(e)},generateNodeStream:function(t,e){return(t=t||{}).type||(t.type="nodebuffer"),this.generateInternalStream(t).toNodejsStream(e)}};e.exports=i},{"./compressedObject":2,"./defaults":5,"./generate":9,"./nodejs/NodejsStreamInputAdapter":12,"./nodejsUtils":14,"./stream/GenericWorker":28,"./stream/StreamHelper":29,"./utf8":31,"./utils":32,"./zipObject":35}],16:[function(t,e,r){e.exports=t("stream")},{stream:void 0}],17:[function(t,e,r){"use strict";var i=t("./DataReader");function n(t){i.call(this,t);for(var e=0;e<this.data.length;e++)t[e]=255&t[e]}t("../utils").inherits(n,i),n.prototype.byteAt=function(t){return this.data[this.zero+t]},n.prototype.lastIndexOfSignature=function(t){for(var e=t.charCodeAt(0),r=t.charCodeAt(1),i=t.charCodeAt(2),n=t.charCodeAt(3),s=this.length-4;0<=s;--s)if(this.data[s]===e&&this.data[s+1]===r&&this.data[s+2]===i&&this.data[s+3]===n)return s-this.zero;return-1},n.prototype.readAndCheckSignature=function(t){var e=t.charCodeAt(0),r=t.charCodeAt(1),i=t.charCodeAt(2),n=t.charCodeAt(3),s=this.readData(4);return e===s[0]&&r===s[1]&&i===s[2]&&n===s[3]},n.prototype.readData=function(t){if(this.checkOffset(t),0===t)return[];var e=this.data.slice(this.zero+this.index,this.zero+this.index+t);return this.index+=t,e},e.exports=n},{"../utils":32,"./DataReader":18}],18:[function(t,e,r){"use strict";var i=t("../utils");function n(t){this.data=t,this.length=t.length,this.index=0,this.zero=0}n.prototype={checkOffset:function(t){this.checkIndex(this.index+t)},checkIndex:function(t){if(this.length<this.zero+t||t<0)throw new Error("End of data reached (data length = "+this.length+", asked index = "+t+"). Corrupted zip ?")},setIndex:function(t){this.checkIndex(t),this.index=t},skip:function(t){this.setIndex(this.index+t)},byteAt:function(t){},readInt:function(t){var e,r=0;for(this.checkOffset(t),e=this.index+t-1;e>=this.index;e--)r=(r<<8)+this.byteAt(e);return this.index+=t,r},readString:function(t){return i.transformTo("string",this.readData(t))},readData:function(t){},lastIndexOfSignature:function(t){},readAndCheckSignature:function(t){},readDate:function(){var t=this.readInt(4);return new Date(1980+(t>>25&127),(t>>21&15)-1,t>>16&31,t>>11&31,t>>5&63,(31&t)<<1)}},e.exports=n},{"../utils":32}],19:[function(t,e,r){"use strict";var i=t("./Uint8ArrayReader");function n(t){i.call(this,t)}t("../utils").inherits(n,i),n.prototype.readData=function(t){this.checkOffset(t);var e=this.data.slice(this.zero+this.index,this.zero+this.index+t);return this.index+=t,e},e.exports=n},{"../utils":32,"./Uint8ArrayReader":21}],20:[function(t,e,r){"use strict";var i=t("./DataReader");function n(t){i.call(this,t)}t("../utils").inherits(n,i),n.prototype.byteAt=function(t){return this.data.charCodeAt(this.zero+t)},n.prototype.lastIndexOfSignature=function(t){return this.data.lastIndexOf(t)-this.zero},n.prototype.readAndCheckSignature=function(t){return t===this.readData(4)},n.prototype.readData=function(t){this.checkOffset(t);var e=this.data.slice(this.zero+this.index,this.zero+this.index+t);return this.index+=t,e},e.exports=n},{"../utils":32,"./DataReader":18}],21:[function(t,e,r){"use strict";var i=t("./ArrayReader");function n(t){i.call(this,t)}t("../utils").inherits(n,i),n.prototype.readData=function(t){if(this.checkOffset(t),0===t)return new Uint8Array(0);var e=this.data.subarray(this.zero+this.index,this.zero+this.index+t);return this.index+=t,e},e.exports=n},{"../utils":32,"./ArrayReader":17}],22:[function(t,e,r){"use strict";var i=t("../utils"),n=t("../support"),s=t("./ArrayReader"),a=t("./StringReader"),o=t("./NodeBufferReader"),h=t("./Uint8ArrayReader");e.exports=function(t){var e=i.getTypeOf(t);return i.checkSupport(e),"string"!==e||n.uint8array?"nodebuffer"===e?new o(t):n.uint8array?new h(i.transformTo("uint8array",t)):new s(i.transformTo("array",t)):new a(t)}},{"../support":30,"../utils":32,"./ArrayReader":17,"./NodeBufferReader":19,"./StringReader":20,"./Uint8ArrayReader":21}],23:[function(t,e,r){"use strict";r.LOCAL_FILE_HEADER="PK",r.CENTRAL_FILE_HEADER="PK",r.CENTRAL_DIRECTORY_END="PK",r.ZIP64_CENTRAL_DIRECTORY_LOCATOR="PK",r.ZIP64_CENTRAL_DIRECTORY_END="PK",r.DATA_DESCRIPTOR="PK\b"},{}],24:[function(t,e,r){"use strict";var i=t("./GenericWorker"),n=t("../utils");function s(t){i.call(this,"ConvertWorker to "+t),this.destType=t}n.inherits(s,i),s.prototype.processChunk=function(t){this.push({data:n.transformTo(this.destType,t.data),meta:t.meta})},e.exports=s},{"../utils":32,"./GenericWorker":28}],25:[function(t,e,r){"use strict";var i=t("./GenericWorker"),n=t("../crc32");function s(){i.call(this,"Crc32Probe"),this.withStreamInfo("crc32",0)}t("../utils").inherits(s,i),s.prototype.processChunk=function(t){this.streamInfo.crc32=n(t.data,this.streamInfo.crc32||0),this.push(t)},e.exports=s},{"../crc32":4,"../utils":32,"./GenericWorker":28}],26:[function(t,e,r){"use strict";var i=t("../utils"),n=t("./GenericWorker");function s(t){n.call(this,"DataLengthProbe for "+t),this.propName=t,this.withStreamInfo(t,0)}i.inherits(s,n),s.prototype.processChunk=function(t){if(t){var e=this.streamInfo[this.propName]||0;this.streamInfo[this.propName]=e+t.data.length}n.prototype.processChunk.call(this,t)},e.exports=s},{"../utils":32,"./GenericWorker":28}],27:[function(t,e,r){"use strict";var i=t("../utils"),n=t("./GenericWorker");function s(t){n.call(this,"DataWorker");var e=this;this.dataIsReady=!1,this.index=0,this.max=0,this.data=null,this.type="",this._tickScheduled=!1,t.then(function(t){e.dataIsReady=!0,e.data=t,e.max=t&&t.length||0,e.type=i.getTypeOf(t),e.isPaused||e._tickAndRepeat()},function(t){e.error(t)})}i.inherits(s,n),s.prototype.cleanUp=function(){n.prototype.cleanUp.call(this),this.data=null},s.prototype.resume=function(){return!!n.prototype.resume.call(this)&&(!this._tickScheduled&&this.dataIsReady&&(this._tickScheduled=!0,i.delay(this._tickAndRepeat,[],this)),!0)},s.prototype._tickAndRepeat=function(){this._tickScheduled=!1,this.isPaused||this.isFinished||(this._tick(),this.isFinished||(i.delay(this._tickAndRepeat,[],this),this._tickScheduled=!0))},s.prototype._tick=function(){if(this.isPaused||this.isFinished)return!1;var t=null,e=Math.min(this.max,this.index+16384);if(this.index>=this.max)return this.end();switch(this.type){case"string":t=this.data.substring(this.index,e);break;case"uint8array":t=this.data.subarray(this.index,e);break;case"array":case"nodebuffer":t=this.data.slice(this.index,e)}return this.index=e,this.push({data:t,meta:{percent:this.max?this.index/this.max*100:0}})},e.exports=s},{"../utils":32,"./GenericWorker":28}],28:[function(t,e,r){"use strict";function i(t){this.name=t||"default",this.streamInfo={},this.generatedError=null,this.extraStreamInfo={},this.isPaused=!0,this.isFinished=!1,this.isLocked=!1,this._listeners={data:[],end:[],error:[]},this.previous=null}i.prototype={push:function(t){this.emit("data",t)},end:function(){if(this.isFinished)return!1;this.flush();try{this.emit("end"),this.cleanUp(),this.isFinished=!0}catch(t){this.emit("error",t)}return!0},error:function(t){return!this.isFinished&&(this.isPaused?this.generatedError=t:(this.isFinished=!0,this.emit("error",t),this.previous&&this.previous.error(t),this.cleanUp()),!0)},on:function(t,e){return this._listeners[t].push(e),this},cleanUp:function(){this.streamInfo=this.generatedError=this.extraStreamInfo=null,this._listeners=[]},emit:function(t,e){if(this._listeners[t])for(var r=0;r<this._listeners[t].length;r++)this._listeners[t][r].call(this,e)},pipe:function(t){return t.registerPrevious(this)},registerPrevious:function(t){if(this.isLocked)throw new Error("The stream '"+this+"' has already been used.");this.streamInfo=t.streamInfo,this.mergeStreamInfo(),this.previous=t;var e=this;return t.on("data",function(t){e.processChunk(t)}),t.on("end",function(){e.end()}),t.on("error",function(t){e.error(t)}),this},pause:function(){return!this.isPaused&&!this.isFinished&&(this.isPaused=!0,this.previous&&this.previous.pause(),!0)},resume:function(){if(!this.isPaused||this.isFinished)return!1;var t=this.isPaused=!1;return this.generatedError&&(this.error(this.generatedError),t=!0),this.previous&&this.previous.resume(),!t},flush:function(){},processChunk:function(t){this.push(t)},withStreamInfo:function(t,e){return this.extraStreamInfo[t]=e,this.mergeStreamInfo(),this},mergeStreamInfo:function(){for(var t in this.extraStreamInfo)this.extraStreamInfo.hasOwnProperty(t)&&(this.streamInfo[t]=this.extraStreamInfo[t])},lock:function(){if(this.isLocked)throw new Error("The stream '"+this+"' has already been used.");this.isLocked=!0,this.previous&&this.previous.lock()},toString:function(){var t="Worker "+this.name;return this.previous?this.previous+" -> "+t:t}},e.exports=i},{}],29:[function(t,e,r){"use strict";var h=t("../utils"),n=t("./ConvertWorker"),s=t("./GenericWorker"),u=t("../base64"),i=t("../support"),a=t("../external"),o=null;if(i.nodestream)try{o=t("../nodejs/NodejsStreamOutputAdapter")}catch(t){}function l(t,o){return new a.Promise(function(e,r){var i=[],n=t._internalType,s=t._outputType,a=t._mimeType;t.on("data",function(t,e){i.push(t),o&&o(e)}).on("error",function(t){i=[],r(t)}).on("end",function(){try{var t=function(t,e,r){switch(t){case"blob":return h.newBlob(h.transformTo("arraybuffer",e),r);case"base64":return u.encode(e);default:return h.transformTo(t,e)}}(s,function(t,e){var r,i=0,n=null,s=0;for(r=0;r<e.length;r++)s+=e[r].length;switch(t){case"string":return e.join("");case"array":return Array.prototype.concat.apply([],e);case"uint8array":for(n=new Uint8Array(s),r=0;r<e.length;r++)n.set(e[r],i),i+=e[r].length;return n;case"nodebuffer":return Buffer.concat(e);default:throw new Error("concat : unsupported type '"+t+"'")}}(n,i),a);e(t)}catch(t){r(t)}i=[]}).resume()})}function f(t,e,r){var i=e;switch(e){case"blob":case"arraybuffer":i="uint8array";break;case"base64":i="string"}try{this._internalType=i,this._outputType=e,this._mimeType=r,h.checkSupport(i),this._worker=t.pipe(new n(i)),t.lock()}catch(t){this._worker=new s("error"),this._worker.error(t)}}f.prototype={accumulate:function(t){return l(this,t)},on:function(t,e){var r=this;return"data"===t?this._worker.on(t,function(t){e.call(r,t.data,t.meta)}):this._worker.on(t,function(){h.delay(e,arguments,r)}),this},resume:function(){return h.delay(this._worker.resume,[],this._worker),this},pause:function(){return this._worker.pause(),this},toNodejsStream:function(t){if(h.checkSupport("nodestream"),"nodebuffer"!==this._outputType)throw new Error(this._outputType+" is not supported by this method");return new o(this,{objectMode:"nodebuffer"!==this._outputType},t)}},e.exports=f},{"../base64":1,"../external":6,"../nodejs/NodejsStreamOutputAdapter":13,"../support":30,"../utils":32,"./ConvertWorker":24,"./GenericWorker":28}],30:[function(t,e,r){"use strict";if(r.base64=!0,r.array=!0,r.string=!0,r.arraybuffer="undefined"!=typeof ArrayBuffer&&"undefined"!=typeof Uint8Array,r.nodebuffer="undefined"!=typeof Buffer,r.uint8array="undefined"!=typeof Uint8Array,"undefined"==typeof ArrayBuffer)r.blob=!1;else{var i=new ArrayBuffer(0);try{r.blob=0===new Blob([i],{type:"application/zip"}).size}catch(t){try{var n=new(self.BlobBuilder||self.WebKitBlobBuilder||self.MozBlobBuilder||self.MSBlobBuilder);n.append(i),r.blob=0===n.getBlob("application/zip").size}catch(t){r.blob=!1}}}try{r.nodestream=!!t("readable-stream").Readable}catch(t){r.nodestream=!1}},{"readable-stream":16}],31:[function(t,e,s){"use strict";for(var o=t("./utils"),h=t("./support"),r=t("./nodejsUtils"),i=t("./stream/GenericWorker"),u=new Array(256),n=0;n<256;n++)u[n]=252<=n?6:248<=n?5:240<=n?4:224<=n?3:192<=n?2:1;u[254]=u[254]=1;function a(){i.call(this,"utf-8 decode"),this.leftOver=null}function l(){i.call(this,"utf-8 encode")}s.utf8encode=function(t){return h.nodebuffer?r.newBufferFrom(t,"utf-8"):function(t){var e,r,i,n,s,a=t.length,o=0;for(n=0;n<a;n++)55296==(64512&(r=t.charCodeAt(n)))&&n+1<a&&56320==(64512&(i=t.charCodeAt(n+1)))&&(r=65536+(r-55296<<10)+(i-56320),n++),o+=r<128?1:r<2048?2:r<65536?3:4;for(e=h.uint8array?new Uint8Array(o):new Array(o),n=s=0;s<o;n++)55296==(64512&(r=t.charCodeAt(n)))&&n+1<a&&56320==(64512&(i=t.charCodeAt(n+1)))&&(r=65536+(r-55296<<10)+(i-56320),n++),r<128?e[s++]=r:(r<2048?e[s++]=192|r>>>6:(r<65536?e[s++]=224|r>>>12:(e[s++]=240|r>>>18,e[s++]=128|r>>>12&63),e[s++]=128|r>>>6&63),e[s++]=128|63&r);return e}(t)},s.utf8decode=function(t){return h.nodebuffer?o.transformTo("nodebuffer",t).toString("utf-8"):function(t){var e,r,i,n,s=t.length,a=new Array(2*s);for(e=r=0;e<s;)if((i=t[e++])<128)a[r++]=i;else if(4<(n=u[i]))a[r++]=65533,e+=n-1;else{for(i&=2===n?31:3===n?15:7;1<n&&e<s;)i=i<<6|63&t[e++],n--;1<n?a[r++]=65533:i<65536?a[r++]=i:(i-=65536,a[r++]=55296|i>>10&1023,a[r++]=56320|1023&i)}return a.length!==r&&(a.subarray?a=a.subarray(0,r):a.length=r),o.applyFromCharCode(a)}(t=o.transformTo(h.uint8array?"uint8array":"array",t))},o.inherits(a,i),a.prototype.processChunk=function(t){var e=o.transformTo(h.uint8array?"uint8array":"array",t.data);if(this.leftOver&&this.leftOver.length){if(h.uint8array){var r=e;(e=new Uint8Array(r.length+this.leftOver.length)).set(this.leftOver,0),e.set(r,this.leftOver.length)}else e=this.leftOver.concat(e);this.leftOver=null}var i=function(t,e){var r;for((e=e||t.length)>t.length&&(e=t.length),r=e-1;0<=r&&128==(192&t[r]);)r--;return r<0?e:0===r?e:r+u[t[r]]>e?r:e}(e),n=e;i!==e.length&&(h.uint8array?(n=e.subarray(0,i),this.leftOver=e.subarray(i,e.length)):(n=e.slice(0,i),this.leftOver=e.slice(i,e.length))),this.push({data:s.utf8decode(n),meta:t.meta})},a.prototype.flush=function(){this.leftOver&&this.leftOver.length&&(this.push({data:s.utf8decode(this.leftOver),meta:{}}),this.leftOver=null)},s.Utf8DecodeWorker=a,o.inherits(l,i),l.prototype.processChunk=function(t){this.push({data:s.utf8encode(t.data),meta:t.meta})},s.Utf8EncodeWorker=l},{"./nodejsUtils":14,"./stream/GenericWorker":28,"./support":30,"./utils":32}],32:[function(t,e,a){"use strict";var o=t("./support"),h=t("./base64"),r=t("./nodejsUtils"),i=t("set-immediate-shim"),u=t("./external");function n(t){return t}function l(t,e){for(var r=0;r<t.length;++r)e[r]=255&t.charCodeAt(r);return e}a.newBlob=function(e,r){a.checkSupport("blob");try{return new Blob([e],{type:r})}catch(t){try{var i=new(self.BlobBuilder||self.WebKitBlobBuilder||self.MozBlobBuilder||self.MSBlobBuilder);return i.append(e),i.getBlob(r)}catch(t){throw new Error("Bug : can't construct the Blob.")}}};var s={stringifyByChunk:function(t,e,r){var i=[],n=0,s=t.length;if(s<=r)return String.fromCharCode.apply(null,t);for(;n<s;)"array"===e||"nodebuffer"===e?i.push(String.fromCharCode.apply(null,t.slice(n,Math.min(n+r,s)))):i.push(String.fromCharCode.apply(null,t.subarray(n,Math.min(n+r,s)))),n+=r;return i.join("")},stringifyByChar:function(t){for(var e="",r=0;r<t.length;r++)e+=String.fromCharCode(t[r]);return e},applyCanBeUsed:{uint8array:function(){try{return o.uint8array&&1===String.fromCharCode.apply(null,new Uint8Array(1)).length}catch(t){return!1}}(),nodebuffer:function(){try{return o.nodebuffer&&1===String.fromCharCode.apply(null,r.allocBuffer(1)).length}catch(t){return!1}}()}};function f(t){var e=65536,r=a.getTypeOf(t),i=!0;if("uint8array"===r?i=s.applyCanBeUsed.uint8array:"nodebuffer"===r&&(i=s.applyCanBeUsed.nodebuffer),i)for(;1<e;)try{return s.stringifyByChunk(t,r,e)}catch(t){e=Math.floor(e/2)}return s.stringifyByChar(t)}function d(t,e){for(var r=0;r<t.length;r++)e[r]=t[r];return e}a.applyFromCharCode=f;var c={};c.string={string:n,array:function(t){return l(t,new Array(t.length))},arraybuffer:function(t){return c.string.uint8array(t).buffer},uint8array:function(t){return l(t,new Uint8Array(t.length))},nodebuffer:function(t){return l(t,r.allocBuffer(t.length))}},c.array={string:f,array:n,arraybuffer:function(t){return new Uint8Array(t).buffer},uint8array:function(t){return new Uint8Array(t)},nodebuffer:function(t){return r.newBufferFrom(t)}},c.arraybuffer={string:function(t){return f(new Uint8Array(t))},array:function(t){return d(new Uint8Array(t),new Array(t.byteLength))},arraybuffer:n,uint8array:function(t){return new Uint8Array(t)},nodebuffer:function(t){return r.newBufferFrom(new Uint8Array(t))}},c.uint8array={string:f,array:function(t){return d(t,new Array(t.length))},arraybuffer:function(t){return t.buffer},uint8array:n,nodebuffer:function(t){return r.newBufferFrom(t)}},c.nodebuffer={string:f,array:function(t){return d(t,new Array(t.length))},arraybuffer:function(t){return c.nodebuffer.uint8array(t).buffer},uint8array:function(t){return d(t,new Uint8Array(t.length))},nodebuffer:n},a.transformTo=function(t,e){if(e=e||"",!t)return e;a.checkSupport(t);var r=a.getTypeOf(e);return c[r][t](e)},a.resolve=function(t){for(var e=t.split("/"),r=[],i=0;i<e.length;i++){var n=e[i];"."===n||""===n&&0!==i&&i!==e.length-1||(".."===n?r.pop():r.push(n))}return r.join("/")},a.getTypeOf=function(t){return"string"==typeof t?"string":"[object Array]"===Object.prototype.toString.call(t)?"array":o.nodebuffer&&r.isBuffer(t)?"nodebuffer":o.uint8array&&t instanceof Uint8Array?"uint8array":o.arraybuffer&&t instanceof ArrayBuffer?"arraybuffer":void 0},a.checkSupport=function(t){if(!o[t.toLowerCase()])throw new Error(t+" is not supported by this platform")},a.MAX_VALUE_16BITS=65535,a.MAX_VALUE_32BITS=-1,a.pretty=function(t){var e,r,i="";for(r=0;r<(t||"").length;r++)i+="\\x"+((e=t.charCodeAt(r))<16?"0":"")+e.toString(16).toUpperCase();return i},a.delay=function(t,e,r){i(function(){t.apply(r||null,e||[])})},a.inherits=function(t,e){function r(){}r.prototype=e.prototype,t.prototype=new r},a.extend=function(){var t,e,r={};for(t=0;t<arguments.length;t++)for(e in arguments[t])arguments[t].hasOwnProperty(e)&&void 0===r[e]&&(r[e]=arguments[t][e]);return r},a.prepareContent=function(r,t,i,n,s){return u.Promise.resolve(t).then(function(i){return o.blob&&(i instanceof Blob||-1!==["[object File]","[object Blob]"].indexOf(Object.prototype.toString.call(i)))&&"undefined"!=typeof FileReader?new u.Promise(function(e,r){var t=new FileReader;t.onload=function(t){e(t.target.result)},t.onerror=function(t){r(t.target.error)},t.readAsArrayBuffer(i)}):i}).then(function(t){var e=a.getTypeOf(t);return e?("arraybuffer"===e?t=a.transformTo("uint8array",t):"string"===e&&(s?t=h.decode(t):i&&!0!==n&&(t=function(t){return l(t,o.uint8array?new Uint8Array(t.length):new Array(t.length))}(t))),t):u.Promise.reject(new Error("Can't read the data of '"+r+"'. Is it in a supported JavaScript type (String, Blob, ArrayBuffer, etc) ?"))})}},{"./base64":1,"./external":6,"./nodejsUtils":14,"./support":30,"set-immediate-shim":54}],33:[function(t,e,r){"use strict";var i=t("./reader/readerFor"),n=t("./utils"),s=t("./signature"),a=t("./zipEntry"),o=(t("./utf8"),t("./support"));function h(t){this.files=[],this.loadOptions=t}h.prototype={checkSignature:function(t){if(!this.reader.readAndCheckSignature(t)){this.reader.index-=4;var e=this.reader.readString(4);throw new Error("Corrupted zip or bug: unexpected signature ("+n.pretty(e)+", expected "+n.pretty(t)+")")}},isSignature:function(t,e){var r=this.reader.index;this.reader.setIndex(t);var i=this.reader.readString(4)===e;return this.reader.setIndex(r),i},readBlockEndOfCentral:function(){this.diskNumber=this.reader.readInt(2),this.diskWithCentralDirStart=this.reader.readInt(2),this.centralDirRecordsOnThisDisk=this.reader.readInt(2),this.centralDirRecords=this.reader.readInt(2),this.centralDirSize=this.reader.readInt(4),this.centralDirOffset=this.reader.readInt(4),this.zipCommentLength=this.reader.readInt(2);var t=this.reader.readData(this.zipCommentLength),e=o.uint8array?"uint8array":"array",r=n.transformTo(e,t);this.zipComment=this.loadOptions.decodeFileName(r)},readBlockZip64EndOfCentral:function(){this.zip64EndOfCentralSize=this.reader.readInt(8),this.reader.skip(4),this.diskNumber=this.reader.readInt(4),this.diskWithCentralDirStart=this.reader.readInt(4),this.centralDirRecordsOnThisDisk=this.reader.readInt(8),this.centralDirRecords=this.reader.readInt(8),this.centralDirSize=this.reader.readInt(8),this.centralDirOffset=this.reader.readInt(8),this.zip64ExtensibleData={};for(var t,e,r,i=this.zip64EndOfCentralSize-44;0<i;)t=this.reader.readInt(2),e=this.reader.readInt(4),r=this.reader.readData(e),this.zip64ExtensibleData[t]={id:t,length:e,value:r}},readBlockZip64EndOfCentralLocator:function(){if(this.diskWithZip64CentralDirStart=this.reader.readInt(4),this.relativeOffsetEndOfZip64CentralDir=this.reader.readInt(8),this.disksCount=this.reader.readInt(4),1<this.disksCount)throw new Error("Multi-volumes zip are not supported")},readLocalFiles:function(){var t,e;for(t=0;t<this.files.length;t++)e=this.files[t],this.reader.setIndex(e.localHeaderOffset),this.checkSignature(s.LOCAL_FILE_HEADER),e.readLocalPart(this.reader),e.handleUTF8(),e.processAttributes()},readCentralDir:function(){var t;for(this.reader.setIndex(this.centralDirOffset);this.reader.readAndCheckSignature(s.CENTRAL_FILE_HEADER);)(t=new a({zip64:this.zip64},this.loadOptions)).readCentralPart(this.reader),this.files.push(t);if(this.centralDirRecords!==this.files.length&&0!==this.centralDirRecords&&0===this.files.length)throw new Error("Corrupted zip or bug: expected "+this.centralDirRecords+" records in central dir, got "+this.files.length)},readEndOfCentral:function(){var t=this.reader.lastIndexOfSignature(s.CENTRAL_DIRECTORY_END);if(t<0)throw!this.isSignature(0,s.LOCAL_FILE_HEADER)?new Error("Can't find end of central directory : is this a zip file ? If it is, see https://stuk.github.io/jszip/documentation/howto/read_zip.html"):new Error("Corrupted zip: can't find end of central directory");this.reader.setIndex(t);var e=t;if(this.checkSignature(s.CENTRAL_DIRECTORY_END),this.readBlockEndOfCentral(),this.diskNumber===n.MAX_VALUE_16BITS||this.diskWithCentralDirStart===n.MAX_VALUE_16BITS||this.centralDirRecordsOnThisDisk===n.MAX_VALUE_16BITS||this.centralDirRecords===n.MAX_VALUE_16BITS||this.centralDirSize===n.MAX_VALUE_32BITS||this.centralDirOffset===n.MAX_VALUE_32BITS){if(this.zip64=!0,(t=this.reader.lastIndexOfSignature(s.ZIP64_CENTRAL_DIRECTORY_LOCATOR))<0)throw new Error("Corrupted zip: can't find the ZIP64 end of central directory locator");if(this.reader.setIndex(t),this.checkSignature(s.ZIP64_CENTRAL_DIRECTORY_LOCATOR),this.readBlockZip64EndOfCentralLocator(),!this.isSignature(this.relativeOffsetEndOfZip64CentralDir,s.ZIP64_CENTRAL_DIRECTORY_END)&&(this.relativeOffsetEndOfZip64CentralDir=this.reader.lastIndexOfSignature(s.ZIP64_CENTRAL_DIRECTORY_END),this.relativeOffsetEndOfZip64CentralDir<0))throw new Error("Corrupted zip: can't find the ZIP64 end of central directory");this.reader.setIndex(this.relativeOffsetEndOfZip64CentralDir),this.checkSignature(s.ZIP64_CENTRAL_DIRECTORY_END),this.readBlockZip64EndOfCentral()}var r=this.centralDirOffset+this.centralDirSize;this.zip64&&(r+=20,r+=12+this.zip64EndOfCentralSize);var i=e-r;if(0<i)this.isSignature(e,s.CENTRAL_FILE_HEADER)||(this.reader.zero=i);else if(i<0)throw new Error("Corrupted zip: missing "+Math.abs(i)+" bytes.")},prepareReader:function(t){this.reader=i(t)},load:function(t){this.prepareReader(t),this.readEndOfCentral(),this.readCentralDir(),this.readLocalFiles()}},e.exports=h},{"./reader/readerFor":22,"./signature":23,"./support":30,"./utf8":31,"./utils":32,"./zipEntry":34}],34:[function(t,e,r){"use strict";var i=t("./reader/readerFor"),s=t("./utils"),n=t("./compressedObject"),a=t("./crc32"),o=t("./utf8"),h=t("./compressions"),u=t("./support");function l(t,e){this.options=t,this.loadOptions=e}l.prototype={isEncrypted:function(){return 1==(1&this.bitFlag)},useUTF8:function(){return 2048==(2048&this.bitFlag)},readLocalPart:function(t){var e,r;if(t.skip(22),this.fileNameLength=t.readInt(2),r=t.readInt(2),this.fileName=t.readData(this.fileNameLength),t.skip(r),-1===this.compressedSize||-1===this.uncompressedSize)throw new Error("Bug or corrupted zip : didn't get enough information from the central directory (compressedSize === -1 || uncompressedSize === -1)");if(null===(e=function(t){for(var e in h)if(h.hasOwnProperty(e)&&h[e].magic===t)return h[e];return null}(this.compressionMethod)))throw new Error("Corrupted zip : compression "+s.pretty(this.compressionMethod)+" unknown (inner file : "+s.transformTo("string",this.fileName)+")");this.decompressed=new n(this.compressedSize,this.uncompressedSize,this.crc32,e,t.readData(this.compressedSize))},readCentralPart:function(t){this.versionMadeBy=t.readInt(2),t.skip(2),this.bitFlag=t.readInt(2),this.compressionMethod=t.readString(2),this.date=t.readDate(),this.crc32=t.readInt(4),this.compressedSize=t.readInt(4),this.uncompressedSize=t.readInt(4);var e=t.readInt(2);if(this.extraFieldsLength=t.readInt(2),this.fileCommentLength=t.readInt(2),this.diskNumberStart=t.readInt(2),this.internalFileAttributes=t.readInt(2),this.externalFileAttributes=t.readInt(4),this.localHeaderOffset=t.readInt(4),this.isEncrypted())throw new Error("Encrypted zip are not supported");t.skip(e),this.readExtraFields(t),this.parseZIP64ExtraField(t),this.fileComment=t.readData(this.fileCommentLength)},processAttributes:function(){this.unixPermissions=null,this.dosPermissions=null;var t=this.versionMadeBy>>8;this.dir=!!(16&this.externalFileAttributes),0==t&&(this.dosPermissions=63&this.externalFileAttributes),3==t&&(this.unixPermissions=this.externalFileAttributes>>16&65535),this.dir||"/"!==this.fileNameStr.slice(-1)||(this.dir=!0)},parseZIP64ExtraField:function(t){if(this.extraFields[1]){var e=i(this.extraFields[1].value);this.uncompressedSize===s.MAX_VALUE_32BITS&&(this.uncompressedSize=e.readInt(8)),this.compressedSize===s.MAX_VALUE_32BITS&&(this.compressedSize=e.readInt(8)),this.localHeaderOffset===s.MAX_VALUE_32BITS&&(this.localHeaderOffset=e.readInt(8)),this.diskNumberStart===s.MAX_VALUE_32BITS&&(this.diskNumberStart=e.readInt(4))}},readExtraFields:function(t){var e,r,i,n=t.index+this.extraFieldsLength;for(this.extraFields||(this.extraFields={});t.index+4<n;)e=t.readInt(2),r=t.readInt(2),i=t.readData(r),this.extraFields[e]={id:e,length:r,value:i};t.setIndex(n)},handleUTF8:function(){var t=u.uint8array?"uint8array":"array";if(this.useUTF8())this.fileNameStr=o.utf8decode(this.fileName),this.fileCommentStr=o.utf8decode(this.fileComment);else{var e=this.findExtraFieldUnicodePath();if(null!==e)this.fileNameStr=e;else{var r=s.transformTo(t,this.fileName);this.fileNameStr=this.loadOptions.decodeFileName(r)}var i=this.findExtraFieldUnicodeComment();if(null!==i)this.fileCommentStr=i;else{var n=s.transformTo(t,this.fileComment);this.fileCommentStr=this.loadOptions.decodeFileName(n)}}},findExtraFieldUnicodePath:function(){var t=this.extraFields[28789];if(t){var e=i(t.value);return 1!==e.readInt(1)?null:a(this.fileName)!==e.readInt(4)?null:o.utf8decode(e.readData(t.length-5))}return null},findExtraFieldUnicodeComment:function(){var t=this.extraFields[25461];if(t){var e=i(t.value);return 1!==e.readInt(1)?null:a(this.fileComment)!==e.readInt(4)?null:o.utf8decode(e.readData(t.length-5))}return null}},e.exports=l},{"./compressedObject":2,"./compressions":3,"./crc32":4,"./reader/readerFor":22,"./support":30,"./utf8":31,"./utils":32}],35:[function(t,e,r){"use strict";function i(t,e,r){this.name=t,this.dir=r.dir,this.date=r.date,this.comment=r.comment,this.unixPermissions=r.unixPermissions,this.dosPermissions=r.dosPermissions,this._data=e,this._dataBinary=r.binary,this.options={compression:r.compression,compressionOptions:r.compressionOptions}}var s=t("./stream/StreamHelper"),n=t("./stream/DataWorker"),a=t("./utf8"),o=t("./compressedObject"),h=t("./stream/GenericWorker");i.prototype={internalStream:function(t){var e=null,r="string";try{if(!t)throw new Error("No output type specified.");var i="string"===(r=t.toLowerCase())||"text"===r;"binarystring"!==r&&"text"!==r||(r="string"),e=this._decompressWorker();var n=!this._dataBinary;n&&!i&&(e=e.pipe(new a.Utf8EncodeWorker)),!n&&i&&(e=e.pipe(new a.Utf8DecodeWorker))}catch(t){(e=new h("error")).error(t)}return new s(e,r,"")},async:function(t,e){return this.internalStream(t).accumulate(e)},nodeStream:function(t,e){return this.internalStream(t||"nodebuffer").toNodejsStream(e)},_compressWorker:function(t,e){if(this._data instanceof o&&this._data.compression.magic===t.magic)return this._data.getCompressedWorker();var r=this._decompressWorker();return this._dataBinary||(r=r.pipe(new a.Utf8EncodeWorker)),o.createWorkerFrom(r,t,e)},_decompressWorker:function(){return this._data instanceof o?this._data.getContentWorker():this._data instanceof h?this._data:new n(this._data)}};for(var u=["asText","asBinary","asNodeBuffer","asUint8Array","asArrayBuffer"],l=function(){throw new Error("This method has been removed in JSZip 3.0, please check the upgrade guide.")},f=0;f<u.length;f++)i.prototype[u[f]]=l;e.exports=i},{"./compressedObject":2,"./stream/DataWorker":27,"./stream/GenericWorker":28,"./stream/StreamHelper":29,"./utf8":31}],36:[function(t,l,e){(function(e){"use strict";var r,i,t=e.MutationObserver||e.WebKitMutationObserver;if(t){var n=0,s=new t(u),a=e.document.createTextNode("");s.observe(a,{characterData:!0}),r=function(){a.data=n=++n%2}}else if(e.setImmediate||void 0===e.MessageChannel)r="document"in e&&"onreadystatechange"in e.document.createElement("script")?function(){var t=e.document.createElement("script");t.onreadystatechange=function(){u(),t.onreadystatechange=null,t.parentNode.removeChild(t),t=null},e.document.documentElement.appendChild(t)}:function(){setTimeout(u,0)};else{var o=new e.MessageChannel;o.port1.onmessage=u,r=function(){o.port2.postMessage(0)}}var h=[];function u(){var t,e;i=!0;for(var r=h.length;r;){for(e=h,h=[],t=-1;++t<r;)e[t]();r=h.length}i=!1}l.exports=function(t){1!==h.push(t)||i||r()}}).call(this,"undefined"!=typeof __webpack_require__.g?__webpack_require__.g:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{}],37:[function(t,e,r){"use strict";var n=t("immediate");function u(){}var l={},s=["REJECTED"],a=["FULFILLED"],i=["PENDING"];function o(t){if("function"!=typeof t)throw new TypeError("resolver must be a function");this.state=i,this.queue=[],this.outcome=void 0,t!==u&&c(this,t)}function h(t,e,r){this.promise=t,"function"==typeof e&&(this.onFulfilled=e,this.callFulfilled=this.otherCallFulfilled),"function"==typeof r&&(this.onRejected=r,this.callRejected=this.otherCallRejected)}function f(e,r,i){n(function(){var t;try{t=r(i)}catch(t){return l.reject(e,t)}t===e?l.reject(e,new TypeError("Cannot resolve promise with itself")):l.resolve(e,t)})}function d(t){var e=t&&t.then;if(t&&("object"==typeof t||"function"==typeof t)&&"function"==typeof e)return function(){e.apply(t,arguments)}}function c(e,t){var r=!1;function i(t){r||(r=!0,l.reject(e,t))}function n(t){r||(r=!0,l.resolve(e,t))}var s=p(function(){t(n,i)});"error"===s.status&&i(s.value)}function p(t,e){var r={};try{r.value=t(e),r.status="success"}catch(t){r.status="error",r.value=t}return r}(e.exports=o).prototype.finally=function(e){if("function"!=typeof e)return this;var r=this.constructor;return this.then(function(t){return r.resolve(e()).then(function(){return t})},function(t){return r.resolve(e()).then(function(){throw t})})},o.prototype.catch=function(t){return this.then(null,t)},o.prototype.then=function(t,e){if("function"!=typeof t&&this.state===a||"function"!=typeof e&&this.state===s)return this;var r=new this.constructor(u);this.state!==i?f(r,this.state===a?t:e,this.outcome):this.queue.push(new h(r,t,e));return r},h.prototype.callFulfilled=function(t){l.resolve(this.promise,t)},h.prototype.otherCallFulfilled=function(t){f(this.promise,this.onFulfilled,t)},h.prototype.callRejected=function(t){l.reject(this.promise,t)},h.prototype.otherCallRejected=function(t){f(this.promise,this.onRejected,t)},l.resolve=function(t,e){var r=p(d,e);if("error"===r.status)return l.reject(t,r.value);var i=r.value;if(i)c(t,i);else{t.state=a,t.outcome=e;for(var n=-1,s=t.queue.length;++n<s;)t.queue[n].callFulfilled(e)}return t},l.reject=function(t,e){t.state=s,t.outcome=e;for(var r=-1,i=t.queue.length;++r<i;)t.queue[r].callRejected(e);return t},o.resolve=function(t){if(t instanceof this)return t;return l.resolve(new this(u),t)},o.reject=function(t){var e=new this(u);return l.reject(e,t)},o.all=function(t){var r=this;if("[object Array]"!==Object.prototype.toString.call(t))return this.reject(new TypeError("must be an array"));var i=t.length,n=!1;if(!i)return this.resolve([]);var s=new Array(i),a=0,e=-1,o=new this(u);for(;++e<i;)h(t[e],e);return o;function h(t,e){r.resolve(t).then(function(t){s[e]=t,++a!==i||n||(n=!0,l.resolve(o,s))},function(t){n||(n=!0,l.reject(o,t))})}},o.race=function(t){var e=this;if("[object Array]"!==Object.prototype.toString.call(t))return this.reject(new TypeError("must be an array"));var r=t.length,i=!1;if(!r)return this.resolve([]);var n=-1,s=new this(u);for(;++n<r;)a=t[n],e.resolve(a).then(function(t){i||(i=!0,l.resolve(s,t))},function(t){i||(i=!0,l.reject(s,t))});var a;return s}},{immediate:36}],38:[function(t,e,r){"use strict";var i={};(0,t("./lib/utils/common").assign)(i,t("./lib/deflate"),t("./lib/inflate"),t("./lib/zlib/constants")),e.exports=i},{"./lib/deflate":39,"./lib/inflate":40,"./lib/utils/common":41,"./lib/zlib/constants":44}],39:[function(t,e,r){"use strict";var a=t("./zlib/deflate"),o=t("./utils/common"),h=t("./utils/strings"),n=t("./zlib/messages"),s=t("./zlib/zstream"),u=Object.prototype.toString,l=0,f=-1,d=0,c=8;function p(t){if(!(this instanceof p))return new p(t);this.options=o.assign({level:f,method:c,chunkSize:16384,windowBits:15,memLevel:8,strategy:d,to:""},t||{});var e=this.options;e.raw&&0<e.windowBits?e.windowBits=-e.windowBits:e.gzip&&0<e.windowBits&&e.windowBits<16&&(e.windowBits+=16),this.err=0,this.msg="",this.ended=!1,this.chunks=[],this.strm=new s,this.strm.avail_out=0;var r=a.deflateInit2(this.strm,e.level,e.method,e.windowBits,e.memLevel,e.strategy);if(r!==l)throw new Error(n[r]);if(e.header&&a.deflateSetHeader(this.strm,e.header),e.dictionary){var i;if(i="string"==typeof e.dictionary?h.string2buf(e.dictionary):"[object ArrayBuffer]"===u.call(e.dictionary)?new Uint8Array(e.dictionary):e.dictionary,(r=a.deflateSetDictionary(this.strm,i))!==l)throw new Error(n[r]);this._dict_set=!0}}function i(t,e){var r=new p(e);if(r.push(t,!0),r.err)throw r.msg||n[r.err];return r.result}p.prototype.push=function(t,e){var r,i,n=this.strm,s=this.options.chunkSize;if(this.ended)return!1;i=e===~~e?e:!0===e?4:0,"string"==typeof t?n.input=h.string2buf(t):"[object ArrayBuffer]"===u.call(t)?n.input=new Uint8Array(t):n.input=t,n.next_in=0,n.avail_in=n.input.length;do{if(0===n.avail_out&&(n.output=new o.Buf8(s),n.next_out=0,n.avail_out=s),1!==(r=a.deflate(n,i))&&r!==l)return this.onEnd(r),!(this.ended=!0);0!==n.avail_out&&(0!==n.avail_in||4!==i&&2!==i)||("string"===this.options.to?this.onData(h.buf2binstring(o.shrinkBuf(n.output,n.next_out))):this.onData(o.shrinkBuf(n.output,n.next_out)))}while((0<n.avail_in||0===n.avail_out)&&1!==r);return 4===i?(r=a.deflateEnd(this.strm),this.onEnd(r),this.ended=!0,r===l):2!==i||(this.onEnd(l),!(n.avail_out=0))},p.prototype.onData=function(t){this.chunks.push(t)},p.prototype.onEnd=function(t){t===l&&("string"===this.options.to?this.result=this.chunks.join(""):this.result=o.flattenChunks(this.chunks)),this.chunks=[],this.err=t,this.msg=this.strm.msg},r.Deflate=p,r.deflate=i,r.deflateRaw=function(t,e){return(e=e||{}).raw=!0,i(t,e)},r.gzip=function(t,e){return(e=e||{}).gzip=!0,i(t,e)}},{"./utils/common":41,"./utils/strings":42,"./zlib/deflate":46,"./zlib/messages":51,"./zlib/zstream":53}],40:[function(t,e,r){"use strict";var d=t("./zlib/inflate"),c=t("./utils/common"),p=t("./utils/strings"),m=t("./zlib/constants"),i=t("./zlib/messages"),n=t("./zlib/zstream"),s=t("./zlib/gzheader"),_=Object.prototype.toString;function a(t){if(!(this instanceof a))return new a(t);this.options=c.assign({chunkSize:16384,windowBits:0,to:""},t||{});var e=this.options;e.raw&&0<=e.windowBits&&e.windowBits<16&&(e.windowBits=-e.windowBits,0===e.windowBits&&(e.windowBits=-15)),!(0<=e.windowBits&&e.windowBits<16)||t&&t.windowBits||(e.windowBits+=32),15<e.windowBits&&e.windowBits<48&&0==(15&e.windowBits)&&(e.windowBits|=15),this.err=0,this.msg="",this.ended=!1,this.chunks=[],this.strm=new n,this.strm.avail_out=0;var r=d.inflateInit2(this.strm,e.windowBits);if(r!==m.Z_OK)throw new Error(i[r]);this.header=new s,d.inflateGetHeader(this.strm,this.header)}function o(t,e){var r=new a(e);if(r.push(t,!0),r.err)throw r.msg||i[r.err];return r.result}a.prototype.push=function(t,e){var r,i,n,s,a,o,h=this.strm,u=this.options.chunkSize,l=this.options.dictionary,f=!1;if(this.ended)return!1;i=e===~~e?e:!0===e?m.Z_FINISH:m.Z_NO_FLUSH,"string"==typeof t?h.input=p.binstring2buf(t):"[object ArrayBuffer]"===_.call(t)?h.input=new Uint8Array(t):h.input=t,h.next_in=0,h.avail_in=h.input.length;do{if(0===h.avail_out&&(h.output=new c.Buf8(u),h.next_out=0,h.avail_out=u),(r=d.inflate(h,m.Z_NO_FLUSH))===m.Z_NEED_DICT&&l&&(o="string"==typeof l?p.string2buf(l):"[object ArrayBuffer]"===_.call(l)?new Uint8Array(l):l,r=d.inflateSetDictionary(this.strm,o)),r===m.Z_BUF_ERROR&&!0===f&&(r=m.Z_OK,f=!1),r!==m.Z_STREAM_END&&r!==m.Z_OK)return this.onEnd(r),!(this.ended=!0);h.next_out&&(0!==h.avail_out&&r!==m.Z_STREAM_END&&(0!==h.avail_in||i!==m.Z_FINISH&&i!==m.Z_SYNC_FLUSH)||("string"===this.options.to?(n=p.utf8border(h.output,h.next_out),s=h.next_out-n,a=p.buf2string(h.output,n),h.next_out=s,h.avail_out=u-s,s&&c.arraySet(h.output,h.output,n,s,0),this.onData(a)):this.onData(c.shrinkBuf(h.output,h.next_out)))),0===h.avail_in&&0===h.avail_out&&(f=!0)}while((0<h.avail_in||0===h.avail_out)&&r!==m.Z_STREAM_END);return r===m.Z_STREAM_END&&(i=m.Z_FINISH),i===m.Z_FINISH?(r=d.inflateEnd(this.strm),this.onEnd(r),this.ended=!0,r===m.Z_OK):i!==m.Z_SYNC_FLUSH||(this.onEnd(m.Z_OK),!(h.avail_out=0))},a.prototype.onData=function(t){this.chunks.push(t)},a.prototype.onEnd=function(t){t===m.Z_OK&&("string"===this.options.to?this.result=this.chunks.join(""):this.result=c.flattenChunks(this.chunks)),this.chunks=[],this.err=t,this.msg=this.strm.msg},r.Inflate=a,r.inflate=o,r.inflateRaw=function(t,e){return(e=e||{}).raw=!0,o(t,e)},r.ungzip=o},{"./utils/common":41,"./utils/strings":42,"./zlib/constants":44,"./zlib/gzheader":47,"./zlib/inflate":49,"./zlib/messages":51,"./zlib/zstream":53}],41:[function(t,e,r){"use strict";var i="undefined"!=typeof Uint8Array&&"undefined"!=typeof Uint16Array&&"undefined"!=typeof Int32Array;r.assign=function(t){for(var e=Array.prototype.slice.call(arguments,1);e.length;){var r=e.shift();if(r){if("object"!=typeof r)throw new TypeError(r+"must be non-object");for(var i in r)r.hasOwnProperty(i)&&(t[i]=r[i])}}return t},r.shrinkBuf=function(t,e){return t.length===e?t:t.subarray?t.subarray(0,e):(t.length=e,t)};var n={arraySet:function(t,e,r,i,n){if(e.subarray&&t.subarray)t.set(e.subarray(r,r+i),n);else for(var s=0;s<i;s++)t[n+s]=e[r+s]},flattenChunks:function(t){var e,r,i,n,s,a;for(e=i=0,r=t.length;e<r;e++)i+=t[e].length;for(a=new Uint8Array(i),e=n=0,r=t.length;e<r;e++)s=t[e],a.set(s,n),n+=s.length;return a}},s={arraySet:function(t,e,r,i,n){for(var s=0;s<i;s++)t[n+s]=e[r+s]},flattenChunks:function(t){return[].concat.apply([],t)}};r.setTyped=function(t){t?(r.Buf8=Uint8Array,r.Buf16=Uint16Array,r.Buf32=Int32Array,r.assign(r,n)):(r.Buf8=Array,r.Buf16=Array,r.Buf32=Array,r.assign(r,s))},r.setTyped(i)},{}],42:[function(t,e,r){"use strict";var h=t("./common"),n=!0,s=!0;try{String.fromCharCode.apply(null,[0])}catch(t){n=!1}try{String.fromCharCode.apply(null,new Uint8Array(1))}catch(t){s=!1}for(var u=new h.Buf8(256),i=0;i<256;i++)u[i]=252<=i?6:248<=i?5:240<=i?4:224<=i?3:192<=i?2:1;function l(t,e){if(e<65537&&(t.subarray&&s||!t.subarray&&n))return String.fromCharCode.apply(null,h.shrinkBuf(t,e));for(var r="",i=0;i<e;i++)r+=String.fromCharCode(t[i]);return r}u[254]=u[254]=1,r.string2buf=function(t){var e,r,i,n,s,a=t.length,o=0;for(n=0;n<a;n++)55296==(64512&(r=t.charCodeAt(n)))&&n+1<a&&56320==(64512&(i=t.charCodeAt(n+1)))&&(r=65536+(r-55296<<10)+(i-56320),n++),o+=r<128?1:r<2048?2:r<65536?3:4;for(e=new h.Buf8(o),n=s=0;s<o;n++)55296==(64512&(r=t.charCodeAt(n)))&&n+1<a&&56320==(64512&(i=t.charCodeAt(n+1)))&&(r=65536+(r-55296<<10)+(i-56320),n++),r<128?e[s++]=r:(r<2048?e[s++]=192|r>>>6:(r<65536?e[s++]=224|r>>>12:(e[s++]=240|r>>>18,e[s++]=128|r>>>12&63),e[s++]=128|r>>>6&63),e[s++]=128|63&r);return e},r.buf2binstring=function(t){return l(t,t.length)},r.binstring2buf=function(t){for(var e=new h.Buf8(t.length),r=0,i=e.length;r<i;r++)e[r]=t.charCodeAt(r);return e},r.buf2string=function(t,e){var r,i,n,s,a=e||t.length,o=new Array(2*a);for(r=i=0;r<a;)if((n=t[r++])<128)o[i++]=n;else if(4<(s=u[n]))o[i++]=65533,r+=s-1;else{for(n&=2===s?31:3===s?15:7;1<s&&r<a;)n=n<<6|63&t[r++],s--;1<s?o[i++]=65533:n<65536?o[i++]=n:(n-=65536,o[i++]=55296|n>>10&1023,o[i++]=56320|1023&n)}return l(o,i)},r.utf8border=function(t,e){var r;for((e=e||t.length)>t.length&&(e=t.length),r=e-1;0<=r&&128==(192&t[r]);)r--;return r<0?e:0===r?e:r+u[t[r]]>e?r:e}},{"./common":41}],43:[function(t,e,r){"use strict";e.exports=function(t,e,r,i){for(var n=65535&t|0,s=t>>>16&65535|0,a=0;0!==r;){for(r-=a=2e3<r?2e3:r;s=s+(n=n+e[i++]|0)|0,--a;);n%=65521,s%=65521}return n|s<<16|0}},{}],44:[function(t,e,r){"use strict";e.exports={Z_NO_FLUSH:0,Z_PARTIAL_FLUSH:1,Z_SYNC_FLUSH:2,Z_FULL_FLUSH:3,Z_FINISH:4,Z_BLOCK:5,Z_TREES:6,Z_OK:0,Z_STREAM_END:1,Z_NEED_DICT:2,Z_ERRNO:-1,Z_STREAM_ERROR:-2,Z_DATA_ERROR:-3,Z_BUF_ERROR:-5,Z_NO_COMPRESSION:0,Z_BEST_SPEED:1,Z_BEST_COMPRESSION:9,Z_DEFAULT_COMPRESSION:-1,Z_FILTERED:1,Z_HUFFMAN_ONLY:2,Z_RLE:3,Z_FIXED:4,Z_DEFAULT_STRATEGY:0,Z_BINARY:0,Z_TEXT:1,Z_UNKNOWN:2,Z_DEFLATED:8}},{}],45:[function(t,e,r){"use strict";var o=function(){for(var t,e=[],r=0;r<256;r++){t=r;for(var i=0;i<8;i++)t=1&t?3988292384^t>>>1:t>>>1;e[r]=t}return e}();e.exports=function(t,e,r,i){var n=o,s=i+r;t^=-1;for(var a=i;a<s;a++)t=t>>>8^n[255&(t^e[a])];return-1^t}},{}],46:[function(t,e,r){"use strict";var h,d=t("../utils/common"),u=t("./trees"),c=t("./adler32"),p=t("./crc32"),i=t("./messages"),l=0,f=4,m=0,_=-2,g=-1,b=4,n=2,v=8,y=9,s=286,a=30,o=19,w=2*s+1,k=15,x=3,S=258,z=S+x+1,C=42,E=113,A=1,I=2,O=3,B=4;function R(t,e){return t.msg=i[e],e}function T(t){return(t<<1)-(4<t?9:0)}function D(t){for(var e=t.length;0<=--e;)t[e]=0}function F(t){var e=t.state,r=e.pending;r>t.avail_out&&(r=t.avail_out),0!==r&&(d.arraySet(t.output,e.pending_buf,e.pending_out,r,t.next_out),t.next_out+=r,e.pending_out+=r,t.total_out+=r,t.avail_out-=r,e.pending-=r,0===e.pending&&(e.pending_out=0))}function N(t,e){u._tr_flush_block(t,0<=t.block_start?t.block_start:-1,t.strstart-t.block_start,e),t.block_start=t.strstart,F(t.strm)}function U(t,e){t.pending_buf[t.pending++]=e}function P(t,e){t.pending_buf[t.pending++]=e>>>8&255,t.pending_buf[t.pending++]=255&e}function L(t,e){var r,i,n=t.max_chain_length,s=t.strstart,a=t.prev_length,o=t.nice_match,h=t.strstart>t.w_size-z?t.strstart-(t.w_size-z):0,u=t.window,l=t.w_mask,f=t.prev,d=t.strstart+S,c=u[s+a-1],p=u[s+a];t.prev_length>=t.good_match&&(n>>=2),o>t.lookahead&&(o=t.lookahead);do{if(u[(r=e)+a]===p&&u[r+a-1]===c&&u[r]===u[s]&&u[++r]===u[s+1]){s+=2,r++;do{}while(u[++s]===u[++r]&&u[++s]===u[++r]&&u[++s]===u[++r]&&u[++s]===u[++r]&&u[++s]===u[++r]&&u[++s]===u[++r]&&u[++s]===u[++r]&&u[++s]===u[++r]&&s<d);if(i=S-(d-s),s=d-S,a<i){if(t.match_start=e,o<=(a=i))break;c=u[s+a-1],p=u[s+a]}}}while((e=f[e&l])>h&&0!=--n);return a<=t.lookahead?a:t.lookahead}function j(t){var e,r,i,n,s,a,o,h,u,l,f=t.w_size;do{if(n=t.window_size-t.lookahead-t.strstart,t.strstart>=f+(f-z)){for(d.arraySet(t.window,t.window,f,f,0),t.match_start-=f,t.strstart-=f,t.block_start-=f,e=r=t.hash_size;i=t.head[--e],t.head[e]=f<=i?i-f:0,--r;);for(e=r=f;i=t.prev[--e],t.prev[e]=f<=i?i-f:0,--r;);n+=f}if(0===t.strm.avail_in)break;if(a=t.strm,o=t.window,h=t.strstart+t.lookahead,u=n,l=void 0,l=a.avail_in,u<l&&(l=u),r=0===l?0:(a.avail_in-=l,d.arraySet(o,a.input,a.next_in,l,h),1===a.state.wrap?a.adler=c(a.adler,o,l,h):2===a.state.wrap&&(a.adler=p(a.adler,o,l,h)),a.next_in+=l,a.total_in+=l,l),t.lookahead+=r,t.lookahead+t.insert>=x)for(s=t.strstart-t.insert,t.ins_h=t.window[s],t.ins_h=(t.ins_h<<t.hash_shift^t.window[s+1])&t.hash_mask;t.insert&&(t.ins_h=(t.ins_h<<t.hash_shift^t.window[s+x-1])&t.hash_mask,t.prev[s&t.w_mask]=t.head[t.ins_h],t.head[t.ins_h]=s,s++,t.insert--,!(t.lookahead+t.insert<x)););}while(t.lookahead<z&&0!==t.strm.avail_in)}function Z(t,e){for(var r,i;;){if(t.lookahead<z){if(j(t),t.lookahead<z&&e===l)return A;if(0===t.lookahead)break}if(r=0,t.lookahead>=x&&(t.ins_h=(t.ins_h<<t.hash_shift^t.window[t.strstart+x-1])&t.hash_mask,r=t.prev[t.strstart&t.w_mask]=t.head[t.ins_h],t.head[t.ins_h]=t.strstart),0!==r&&t.strstart-r<=t.w_size-z&&(t.match_length=L(t,r)),t.match_length>=x)if(i=u._tr_tally(t,t.strstart-t.match_start,t.match_length-x),t.lookahead-=t.match_length,t.match_length<=t.max_lazy_match&&t.lookahead>=x){for(t.match_length--;t.strstart++,t.ins_h=(t.ins_h<<t.hash_shift^t.window[t.strstart+x-1])&t.hash_mask,r=t.prev[t.strstart&t.w_mask]=t.head[t.ins_h],t.head[t.ins_h]=t.strstart,0!=--t.match_length;);t.strstart++}else t.strstart+=t.match_length,t.match_length=0,t.ins_h=t.window[t.strstart],t.ins_h=(t.ins_h<<t.hash_shift^t.window[t.strstart+1])&t.hash_mask;else i=u._tr_tally(t,0,t.window[t.strstart]),t.lookahead--,t.strstart++;if(i&&(N(t,!1),0===t.strm.avail_out))return A}return t.insert=t.strstart<x-1?t.strstart:x-1,e===f?(N(t,!0),0===t.strm.avail_out?O:B):t.last_lit&&(N(t,!1),0===t.strm.avail_out)?A:I}function W(t,e){for(var r,i,n;;){if(t.lookahead<z){if(j(t),t.lookahead<z&&e===l)return A;if(0===t.lookahead)break}if(r=0,t.lookahead>=x&&(t.ins_h=(t.ins_h<<t.hash_shift^t.window[t.strstart+x-1])&t.hash_mask,r=t.prev[t.strstart&t.w_mask]=t.head[t.ins_h],t.head[t.ins_h]=t.strstart),t.prev_length=t.match_length,t.prev_match=t.match_start,t.match_length=x-1,0!==r&&t.prev_length<t.max_lazy_match&&t.strstart-r<=t.w_size-z&&(t.match_length=L(t,r),t.match_length<=5&&(1===t.strategy||t.match_length===x&&4096<t.strstart-t.match_start)&&(t.match_length=x-1)),t.prev_length>=x&&t.match_length<=t.prev_length){for(n=t.strstart+t.lookahead-x,i=u._tr_tally(t,t.strstart-1-t.prev_match,t.prev_length-x),t.lookahead-=t.prev_length-1,t.prev_length-=2;++t.strstart<=n&&(t.ins_h=(t.ins_h<<t.hash_shift^t.window[t.strstart+x-1])&t.hash_mask,r=t.prev[t.strstart&t.w_mask]=t.head[t.ins_h],t.head[t.ins_h]=t.strstart),0!=--t.prev_length;);if(t.match_available=0,t.match_length=x-1,t.strstart++,i&&(N(t,!1),0===t.strm.avail_out))return A}else if(t.match_available){if((i=u._tr_tally(t,0,t.window[t.strstart-1]))&&N(t,!1),t.strstart++,t.lookahead--,0===t.strm.avail_out)return A}else t.match_available=1,t.strstart++,t.lookahead--}return t.match_available&&(i=u._tr_tally(t,0,t.window[t.strstart-1]),t.match_available=0),t.insert=t.strstart<x-1?t.strstart:x-1,e===f?(N(t,!0),0===t.strm.avail_out?O:B):t.last_lit&&(N(t,!1),0===t.strm.avail_out)?A:I}function M(t,e,r,i,n){this.good_length=t,this.max_lazy=e,this.nice_length=r,this.max_chain=i,this.func=n}function H(){this.strm=null,this.status=0,this.pending_buf=null,this.pending_buf_size=0,this.pending_out=0,this.pending=0,this.wrap=0,this.gzhead=null,this.gzindex=0,this.method=v,this.last_flush=-1,this.w_size=0,this.w_bits=0,this.w_mask=0,this.window=null,this.window_size=0,this.prev=null,this.head=null,this.ins_h=0,this.hash_size=0,this.hash_bits=0,this.hash_mask=0,this.hash_shift=0,this.block_start=0,this.match_length=0,this.prev_match=0,this.match_available=0,this.strstart=0,this.match_start=0,this.lookahead=0,this.prev_length=0,this.max_chain_length=0,this.max_lazy_match=0,this.level=0,this.strategy=0,this.good_match=0,this.nice_match=0,this.dyn_ltree=new d.Buf16(2*w),this.dyn_dtree=new d.Buf16(2*(2*a+1)),this.bl_tree=new d.Buf16(2*(2*o+1)),D(this.dyn_ltree),D(this.dyn_dtree),D(this.bl_tree),this.l_desc=null,this.d_desc=null,this.bl_desc=null,this.bl_count=new d.Buf16(k+1),this.heap=new d.Buf16(2*s+1),D(this.heap),this.heap_len=0,this.heap_max=0,this.depth=new d.Buf16(2*s+1),D(this.depth),this.l_buf=0,this.lit_bufsize=0,this.last_lit=0,this.d_buf=0,this.opt_len=0,this.static_len=0,this.matches=0,this.insert=0,this.bi_buf=0,this.bi_valid=0}function G(t){var e;return t&&t.state?(t.total_in=t.total_out=0,t.data_type=n,(e=t.state).pending=0,e.pending_out=0,e.wrap<0&&(e.wrap=-e.wrap),e.status=e.wrap?C:E,t.adler=2===e.wrap?0:1,e.last_flush=l,u._tr_init(e),m):R(t,_)}function K(t){var e=G(t);return e===m&&function(t){t.window_size=2*t.w_size,D(t.head),t.max_lazy_match=h[t.level].max_lazy,t.good_match=h[t.level].good_length,t.nice_match=h[t.level].nice_length,t.max_chain_length=h[t.level].max_chain,t.strstart=0,t.block_start=0,t.lookahead=0,t.insert=0,t.match_length=t.prev_length=x-1,t.match_available=0,t.ins_h=0}(t.state),e}function Y(t,e,r,i,n,s){if(!t)return _;var a=1;if(e===g&&(e=6),i<0?(a=0,i=-i):15<i&&(a=2,i-=16),n<1||y<n||r!==v||i<8||15<i||e<0||9<e||s<0||b<s)return R(t,_);8===i&&(i=9);var o=new H;return(t.state=o).strm=t,o.wrap=a,o.gzhead=null,o.w_bits=i,o.w_size=1<<o.w_bits,o.w_mask=o.w_size-1,o.hash_bits=n+7,o.hash_size=1<<o.hash_bits,o.hash_mask=o.hash_size-1,o.hash_shift=~~((o.hash_bits+x-1)/x),o.window=new d.Buf8(2*o.w_size),o.head=new d.Buf16(o.hash_size),o.prev=new d.Buf16(o.w_size),o.lit_bufsize=1<<n+6,o.pending_buf_size=4*o.lit_bufsize,o.pending_buf=new d.Buf8(o.pending_buf_size),o.d_buf=1*o.lit_bufsize,o.l_buf=3*o.lit_bufsize,o.level=e,o.strategy=s,o.method=r,K(t)}h=[new M(0,0,0,0,function(t,e){var r=65535;for(r>t.pending_buf_size-5&&(r=t.pending_buf_size-5);;){if(t.lookahead<=1){if(j(t),0===t.lookahead&&e===l)return A;if(0===t.lookahead)break}t.strstart+=t.lookahead,t.lookahead=0;var i=t.block_start+r;if((0===t.strstart||t.strstart>=i)&&(t.lookahead=t.strstart-i,t.strstart=i,N(t,!1),0===t.strm.avail_out))return A;if(t.strstart-t.block_start>=t.w_size-z&&(N(t,!1),0===t.strm.avail_out))return A}return t.insert=0,e===f?(N(t,!0),0===t.strm.avail_out?O:B):(t.strstart>t.block_start&&(N(t,!1),t.strm.avail_out),A)}),new M(4,4,8,4,Z),new M(4,5,16,8,Z),new M(4,6,32,32,Z),new M(4,4,16,16,W),new M(8,16,32,32,W),new M(8,16,128,128,W),new M(8,32,128,256,W),new M(32,128,258,1024,W),new M(32,258,258,4096,W)],r.deflateInit=function(t,e){return Y(t,e,v,15,8,0)},r.deflateInit2=Y,r.deflateReset=K,r.deflateResetKeep=G,r.deflateSetHeader=function(t,e){return t&&t.state?2!==t.state.wrap?_:(t.state.gzhead=e,m):_},r.deflate=function(t,e){var r,i,n,s;if(!t||!t.state||5<e||e<0)return t?R(t,_):_;if(i=t.state,!t.output||!t.input&&0!==t.avail_in||666===i.status&&e!==f)return R(t,0===t.avail_out?-5:_);if(i.strm=t,r=i.last_flush,i.last_flush=e,i.status===C)if(2===i.wrap)t.adler=0,U(i,31),U(i,139),U(i,8),i.gzhead?(U(i,(i.gzhead.text?1:0)+(i.gzhead.hcrc?2:0)+(i.gzhead.extra?4:0)+(i.gzhead.name?8:0)+(i.gzhead.comment?16:0)),U(i,255&i.gzhead.time),U(i,i.gzhead.time>>8&255),U(i,i.gzhead.time>>16&255),U(i,i.gzhead.time>>24&255),U(i,9===i.level?2:2<=i.strategy||i.level<2?4:0),U(i,255&i.gzhead.os),i.gzhead.extra&&i.gzhead.extra.length&&(U(i,255&i.gzhead.extra.length),U(i,i.gzhead.extra.length>>8&255)),i.gzhead.hcrc&&(t.adler=p(t.adler,i.pending_buf,i.pending,0)),i.gzindex=0,i.status=69):(U(i,0),U(i,0),U(i,0),U(i,0),U(i,0),U(i,9===i.level?2:2<=i.strategy||i.level<2?4:0),U(i,3),i.status=E);else{var a=v+(i.w_bits-8<<4)<<8;a|=(2<=i.strategy||i.level<2?0:i.level<6?1:6===i.level?2:3)<<6,0!==i.strstart&&(a|=32),a+=31-a%31,i.status=E,P(i,a),0!==i.strstart&&(P(i,t.adler>>>16),P(i,65535&t.adler)),t.adler=1}if(69===i.status)if(i.gzhead.extra){for(n=i.pending;i.gzindex<(65535&i.gzhead.extra.length)&&(i.pending!==i.pending_buf_size||(i.gzhead.hcrc&&i.pending>n&&(t.adler=p(t.adler,i.pending_buf,i.pending-n,n)),F(t),n=i.pending,i.pending!==i.pending_buf_size));)U(i,255&i.gzhead.extra[i.gzindex]),i.gzindex++;i.gzhead.hcrc&&i.pending>n&&(t.adler=p(t.adler,i.pending_buf,i.pending-n,n)),i.gzindex===i.gzhead.extra.length&&(i.gzindex=0,i.status=73)}else i.status=73;if(73===i.status)if(i.gzhead.name){n=i.pending;do{if(i.pending===i.pending_buf_size&&(i.gzhead.hcrc&&i.pending>n&&(t.adler=p(t.adler,i.pending_buf,i.pending-n,n)),F(t),n=i.pending,i.pending===i.pending_buf_size)){s=1;break}s=i.gzindex<i.gzhead.name.length?255&i.gzhead.name.charCodeAt(i.gzindex++):0,U(i,s)}while(0!==s);i.gzhead.hcrc&&i.pending>n&&(t.adler=p(t.adler,i.pending_buf,i.pending-n,n)),0===s&&(i.gzindex=0,i.status=91)}else i.status=91;if(91===i.status)if(i.gzhead.comment){n=i.pending;do{if(i.pending===i.pending_buf_size&&(i.gzhead.hcrc&&i.pending>n&&(t.adler=p(t.adler,i.pending_buf,i.pending-n,n)),F(t),n=i.pending,i.pending===i.pending_buf_size)){s=1;break}s=i.gzindex<i.gzhead.comment.length?255&i.gzhead.comment.charCodeAt(i.gzindex++):0,U(i,s)}while(0!==s);i.gzhead.hcrc&&i.pending>n&&(t.adler=p(t.adler,i.pending_buf,i.pending-n,n)),0===s&&(i.status=103)}else i.status=103;if(103===i.status&&(i.gzhead.hcrc?(i.pending+2>i.pending_buf_size&&F(t),i.pending+2<=i.pending_buf_size&&(U(i,255&t.adler),U(i,t.adler>>8&255),t.adler=0,i.status=E)):i.status=E),0!==i.pending){if(F(t),0===t.avail_out)return i.last_flush=-1,m}else if(0===t.avail_in&&T(e)<=T(r)&&e!==f)return R(t,-5);if(666===i.status&&0!==t.avail_in)return R(t,-5);if(0!==t.avail_in||0!==i.lookahead||e!==l&&666!==i.status){var o=2===i.strategy?function(t,e){for(var r;;){if(0===t.lookahead&&(j(t),0===t.lookahead)){if(e===l)return A;break}if(t.match_length=0,r=u._tr_tally(t,0,t.window[t.strstart]),t.lookahead--,t.strstart++,r&&(N(t,!1),0===t.strm.avail_out))return A}return t.insert=0,e===f?(N(t,!0),0===t.strm.avail_out?O:B):t.last_lit&&(N(t,!1),0===t.strm.avail_out)?A:I}(i,e):3===i.strategy?function(t,e){for(var r,i,n,s,a=t.window;;){if(t.lookahead<=S){if(j(t),t.lookahead<=S&&e===l)return A;if(0===t.lookahead)break}if(t.match_length=0,t.lookahead>=x&&0<t.strstart&&(i=a[n=t.strstart-1])===a[++n]&&i===a[++n]&&i===a[++n]){s=t.strstart+S;do{}while(i===a[++n]&&i===a[++n]&&i===a[++n]&&i===a[++n]&&i===a[++n]&&i===a[++n]&&i===a[++n]&&i===a[++n]&&n<s);t.match_length=S-(s-n),t.match_length>t.lookahead&&(t.match_length=t.lookahead)}if(t.match_length>=x?(r=u._tr_tally(t,1,t.match_length-x),t.lookahead-=t.match_length,t.strstart+=t.match_length,t.match_length=0):(r=u._tr_tally(t,0,t.window[t.strstart]),t.lookahead--,t.strstart++),r&&(N(t,!1),0===t.strm.avail_out))return A}return t.insert=0,e===f?(N(t,!0),0===t.strm.avail_out?O:B):t.last_lit&&(N(t,!1),0===t.strm.avail_out)?A:I}(i,e):h[i.level].func(i,e);if(o!==O&&o!==B||(i.status=666),o===A||o===O)return 0===t.avail_out&&(i.last_flush=-1),m;if(o===I&&(1===e?u._tr_align(i):5!==e&&(u._tr_stored_block(i,0,0,!1),3===e&&(D(i.head),0===i.lookahead&&(i.strstart=0,i.block_start=0,i.insert=0))),F(t),0===t.avail_out))return i.last_flush=-1,m}return e!==f?m:i.wrap<=0?1:(2===i.wrap?(U(i,255&t.adler),U(i,t.adler>>8&255),U(i,t.adler>>16&255),U(i,t.adler>>24&255),U(i,255&t.total_in),U(i,t.total_in>>8&255),U(i,t.total_in>>16&255),U(i,t.total_in>>24&255)):(P(i,t.adler>>>16),P(i,65535&t.adler)),F(t),0<i.wrap&&(i.wrap=-i.wrap),0!==i.pending?m:1)},r.deflateEnd=function(t){var e;return t&&t.state?(e=t.state.status)!==C&&69!==e&&73!==e&&91!==e&&103!==e&&e!==E&&666!==e?R(t,_):(t.state=null,e===E?R(t,-3):m):_},r.deflateSetDictionary=function(t,e){var r,i,n,s,a,o,h,u,l=e.length;if(!t||!t.state)return _;if(2===(s=(r=t.state).wrap)||1===s&&r.status!==C||r.lookahead)return _;for(1===s&&(t.adler=c(t.adler,e,l,0)),r.wrap=0,l>=r.w_size&&(0===s&&(D(r.head),r.strstart=0,r.block_start=0,r.insert=0),u=new d.Buf8(r.w_size),d.arraySet(u,e,l-r.w_size,r.w_size,0),e=u,l=r.w_size),a=t.avail_in,o=t.next_in,h=t.input,t.avail_in=l,t.next_in=0,t.input=e,j(r);r.lookahead>=x;){for(i=r.strstart,n=r.lookahead-(x-1);r.ins_h=(r.ins_h<<r.hash_shift^r.window[i+x-1])&r.hash_mask,r.prev[i&r.w_mask]=r.head[r.ins_h],r.head[r.ins_h]=i,i++,--n;);r.strstart=i,r.lookahead=x-1,j(r)}return r.strstart+=r.lookahead,r.block_start=r.strstart,r.insert=r.lookahead,r.lookahead=0,r.match_length=r.prev_length=x-1,r.match_available=0,t.next_in=o,t.input=h,t.avail_in=a,r.wrap=s,m},r.deflateInfo="pako deflate (from Nodeca project)"},{"../utils/common":41,"./adler32":43,"./crc32":45,"./messages":51,"./trees":52}],47:[function(t,e,r){"use strict";e.exports=function(){this.text=0,this.time=0,this.xflags=0,this.os=0,this.extra=null,this.extra_len=0,this.name="",this.comment="",this.hcrc=0,this.done=!1}},{}],48:[function(t,e,r){"use strict";e.exports=function(t,e){var r,i,n,s,a,o,h,u,l,f,d,c,p,m,_,g,b,v,y,w,k,x,S,z,C;r=t.state,i=t.next_in,z=t.input,n=i+(t.avail_in-5),s=t.next_out,C=t.output,a=s-(e-t.avail_out),o=s+(t.avail_out-257),h=r.dmax,u=r.wsize,l=r.whave,f=r.wnext,d=r.window,c=r.hold,p=r.bits,m=r.lencode,_=r.distcode,g=(1<<r.lenbits)-1,b=(1<<r.distbits)-1;t:do{p<15&&(c+=z[i++]<<p,p+=8,c+=z[i++]<<p,p+=8),v=m[c&g];e:for(;;){if(c>>>=y=v>>>24,p-=y,0===(y=v>>>16&255))C[s++]=65535&v;else{if(!(16&y)){if(0==(64&y)){v=m[(65535&v)+(c&(1<<y)-1)];continue e}if(32&y){r.mode=12;break t}t.msg="invalid literal/length code",r.mode=30;break t}w=65535&v,(y&=15)&&(p<y&&(c+=z[i++]<<p,p+=8),w+=c&(1<<y)-1,c>>>=y,p-=y),p<15&&(c+=z[i++]<<p,p+=8,c+=z[i++]<<p,p+=8),v=_[c&b];r:for(;;){if(c>>>=y=v>>>24,p-=y,!(16&(y=v>>>16&255))){if(0==(64&y)){v=_[(65535&v)+(c&(1<<y)-1)];continue r}t.msg="invalid distance code",r.mode=30;break t}if(k=65535&v,p<(y&=15)&&(c+=z[i++]<<p,(p+=8)<y&&(c+=z[i++]<<p,p+=8)),h<(k+=c&(1<<y)-1)){t.msg="invalid distance too far back",r.mode=30;break t}if(c>>>=y,p-=y,(y=s-a)<k){if(l<(y=k-y)&&r.sane){t.msg="invalid distance too far back",r.mode=30;break t}if(S=d,(x=0)===f){if(x+=u-y,y<w){for(w-=y;C[s++]=d[x++],--y;);x=s-k,S=C}}else if(f<y){if(x+=u+f-y,(y-=f)<w){for(w-=y;C[s++]=d[x++],--y;);if(x=0,f<w){for(w-=y=f;C[s++]=d[x++],--y;);x=s-k,S=C}}}else if(x+=f-y,y<w){for(w-=y;C[s++]=d[x++],--y;);x=s-k,S=C}for(;2<w;)C[s++]=S[x++],C[s++]=S[x++],C[s++]=S[x++],w-=3;w&&(C[s++]=S[x++],1<w&&(C[s++]=S[x++]))}else{for(x=s-k;C[s++]=C[x++],C[s++]=C[x++],C[s++]=C[x++],2<(w-=3););w&&(C[s++]=C[x++],1<w&&(C[s++]=C[x++]))}break}}break}}while(i<n&&s<o);i-=w=p>>3,c&=(1<<(p-=w<<3))-1,t.next_in=i,t.next_out=s,t.avail_in=i<n?n-i+5:5-(i-n),t.avail_out=s<o?o-s+257:257-(s-o),r.hold=c,r.bits=p}},{}],49:[function(t,e,r){"use strict";var I=t("../utils/common"),O=t("./adler32"),B=t("./crc32"),R=t("./inffast"),T=t("./inftrees"),D=1,F=2,N=0,U=-2,P=1,i=852,n=592;function L(t){return(t>>>24&255)+(t>>>8&65280)+((65280&t)<<8)+((255&t)<<24)}function s(){this.mode=0,this.last=!1,this.wrap=0,this.havedict=!1,this.flags=0,this.dmax=0,this.check=0,this.total=0,this.head=null,this.wbits=0,this.wsize=0,this.whave=0,this.wnext=0,this.window=null,this.hold=0,this.bits=0,this.length=0,this.offset=0,this.extra=0,this.lencode=null,this.distcode=null,this.lenbits=0,this.distbits=0,this.ncode=0,this.nlen=0,this.ndist=0,this.have=0,this.next=null,this.lens=new I.Buf16(320),this.work=new I.Buf16(288),this.lendyn=null,this.distdyn=null,this.sane=0,this.back=0,this.was=0}function a(t){var e;return t&&t.state?(e=t.state,t.total_in=t.total_out=e.total=0,t.msg="",e.wrap&&(t.adler=1&e.wrap),e.mode=P,e.last=0,e.havedict=0,e.dmax=32768,e.head=null,e.hold=0,e.bits=0,e.lencode=e.lendyn=new I.Buf32(i),e.distcode=e.distdyn=new I.Buf32(n),e.sane=1,e.back=-1,N):U}function o(t){var e;return t&&t.state?((e=t.state).wsize=0,e.whave=0,e.wnext=0,a(t)):U}function h(t,e){var r,i;return t&&t.state?(i=t.state,e<0?(r=0,e=-e):(r=1+(e>>4),e<48&&(e&=15)),e&&(e<8||15<e)?U:(null!==i.window&&i.wbits!==e&&(i.window=null),i.wrap=r,i.wbits=e,o(t))):U}function u(t,e){var r,i;return t?(i=new s,(t.state=i).window=null,(r=h(t,e))!==N&&(t.state=null),r):U}var l,f,d=!0;function j(t){if(d){var e;for(l=new I.Buf32(512),f=new I.Buf32(32),e=0;e<144;)t.lens[e++]=8;for(;e<256;)t.lens[e++]=9;for(;e<280;)t.lens[e++]=7;for(;e<288;)t.lens[e++]=8;for(T(D,t.lens,0,288,l,0,t.work,{bits:9}),e=0;e<32;)t.lens[e++]=5;T(F,t.lens,0,32,f,0,t.work,{bits:5}),d=!1}t.lencode=l,t.lenbits=9,t.distcode=f,t.distbits=5}function Z(t,e,r,i){var n,s=t.state;return null===s.window&&(s.wsize=1<<s.wbits,s.wnext=0,s.whave=0,s.window=new I.Buf8(s.wsize)),i>=s.wsize?(I.arraySet(s.window,e,r-s.wsize,s.wsize,0),s.wnext=0,s.whave=s.wsize):(i<(n=s.wsize-s.wnext)&&(n=i),I.arraySet(s.window,e,r-i,n,s.wnext),(i-=n)?(I.arraySet(s.window,e,r-i,i,0),s.wnext=i,s.whave=s.wsize):(s.wnext+=n,s.wnext===s.wsize&&(s.wnext=0),s.whave<s.wsize&&(s.whave+=n))),0}r.inflateReset=o,r.inflateReset2=h,r.inflateResetKeep=a,r.inflateInit=function(t){return u(t,15)},r.inflateInit2=u,r.inflate=function(t,e){var r,i,n,s,a,o,h,u,l,f,d,c,p,m,_,g,b,v,y,w,k,x,S,z,C=0,E=new I.Buf8(4),A=[16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15];if(!t||!t.state||!t.output||!t.input&&0!==t.avail_in)return U;12===(r=t.state).mode&&(r.mode=13),a=t.next_out,n=t.output,h=t.avail_out,s=t.next_in,i=t.input,o=t.avail_in,u=r.hold,l=r.bits,f=o,d=h,x=N;t:for(;;)switch(r.mode){case P:if(0===r.wrap){r.mode=13;break}for(;l<16;){if(0===o)break t;o--,u+=i[s++]<<l,l+=8}if(2&r.wrap&&35615===u){E[r.check=0]=255&u,E[1]=u>>>8&255,r.check=B(r.check,E,2,0),l=u=0,r.mode=2;break}if(r.flags=0,r.head&&(r.head.done=!1),!(1&r.wrap)||(((255&u)<<8)+(u>>8))%31){t.msg="incorrect header check",r.mode=30;break}if(8!=(15&u)){t.msg="unknown compression method",r.mode=30;break}if(l-=4,k=8+(15&(u>>>=4)),0===r.wbits)r.wbits=k;else if(k>r.wbits){t.msg="invalid window size",r.mode=30;break}r.dmax=1<<k,t.adler=r.check=1,r.mode=512&u?10:12,l=u=0;break;case 2:for(;l<16;){if(0===o)break t;o--,u+=i[s++]<<l,l+=8}if(r.flags=u,8!=(255&r.flags)){t.msg="unknown compression method",r.mode=30;break}if(57344&r.flags){t.msg="unknown header flags set",r.mode=30;break}r.head&&(r.head.text=u>>8&1),512&r.flags&&(E[0]=255&u,E[1]=u>>>8&255,r.check=B(r.check,E,2,0)),l=u=0,r.mode=3;case 3:for(;l<32;){if(0===o)break t;o--,u+=i[s++]<<l,l+=8}r.head&&(r.head.time=u),512&r.flags&&(E[0]=255&u,E[1]=u>>>8&255,E[2]=u>>>16&255,E[3]=u>>>24&255,r.check=B(r.check,E,4,0)),l=u=0,r.mode=4;case 4:for(;l<16;){if(0===o)break t;o--,u+=i[s++]<<l,l+=8}r.head&&(r.head.xflags=255&u,r.head.os=u>>8),512&r.flags&&(E[0]=255&u,E[1]=u>>>8&255,r.check=B(r.check,E,2,0)),l=u=0,r.mode=5;case 5:if(1024&r.flags){for(;l<16;){if(0===o)break t;o--,u+=i[s++]<<l,l+=8}r.length=u,r.head&&(r.head.extra_len=u),512&r.flags&&(E[0]=255&u,E[1]=u>>>8&255,r.check=B(r.check,E,2,0)),l=u=0}else r.head&&(r.head.extra=null);r.mode=6;case 6:if(1024&r.flags&&(o<(c=r.length)&&(c=o),c&&(r.head&&(k=r.head.extra_len-r.length,r.head.extra||(r.head.extra=new Array(r.head.extra_len)),I.arraySet(r.head.extra,i,s,c,k)),512&r.flags&&(r.check=B(r.check,i,c,s)),o-=c,s+=c,r.length-=c),r.length))break t;r.length=0,r.mode=7;case 7:if(2048&r.flags){if(0===o)break t;for(c=0;k=i[s+c++],r.head&&k&&r.length<65536&&(r.head.name+=String.fromCharCode(k)),k&&c<o;);if(512&r.flags&&(r.check=B(r.check,i,c,s)),o-=c,s+=c,k)break t}else r.head&&(r.head.name=null);r.length=0,r.mode=8;case 8:if(4096&r.flags){if(0===o)break t;for(c=0;k=i[s+c++],r.head&&k&&r.length<65536&&(r.head.comment+=String.fromCharCode(k)),k&&c<o;);if(512&r.flags&&(r.check=B(r.check,i,c,s)),o-=c,s+=c,k)break t}else r.head&&(r.head.comment=null);r.mode=9;case 9:if(512&r.flags){for(;l<16;){if(0===o)break t;o--,u+=i[s++]<<l,l+=8}if(u!==(65535&r.check)){t.msg="header crc mismatch",r.mode=30;break}l=u=0}r.head&&(r.head.hcrc=r.flags>>9&1,r.head.done=!0),t.adler=r.check=0,r.mode=12;break;case 10:for(;l<32;){if(0===o)break t;o--,u+=i[s++]<<l,l+=8}t.adler=r.check=L(u),l=u=0,r.mode=11;case 11:if(0===r.havedict)return t.next_out=a,t.avail_out=h,t.next_in=s,t.avail_in=o,r.hold=u,r.bits=l,2;t.adler=r.check=1,r.mode=12;case 12:if(5===e||6===e)break t;case 13:if(r.last){u>>>=7&l,l-=7&l,r.mode=27;break}for(;l<3;){if(0===o)break t;o--,u+=i[s++]<<l,l+=8}switch(r.last=1&u,l-=1,3&(u>>>=1)){case 0:r.mode=14;break;case 1:if(j(r),r.mode=20,6!==e)break;u>>>=2,l-=2;break t;case 2:r.mode=17;break;case 3:t.msg="invalid block type",r.mode=30}u>>>=2,l-=2;break;case 14:for(u>>>=7&l,l-=7&l;l<32;){if(0===o)break t;o--,u+=i[s++]<<l,l+=8}if((65535&u)!=(u>>>16^65535)){t.msg="invalid stored block lengths",r.mode=30;break}if(r.length=65535&u,l=u=0,r.mode=15,6===e)break t;case 15:r.mode=16;case 16:if(c=r.length){if(o<c&&(c=o),h<c&&(c=h),0===c)break t;I.arraySet(n,i,s,c,a),o-=c,s+=c,h-=c,a+=c,r.length-=c;break}r.mode=12;break;case 17:for(;l<14;){if(0===o)break t;o--,u+=i[s++]<<l,l+=8}if(r.nlen=257+(31&u),u>>>=5,l-=5,r.ndist=1+(31&u),u>>>=5,l-=5,r.ncode=4+(15&u),u>>>=4,l-=4,286<r.nlen||30<r.ndist){t.msg="too many length or distance symbols",r.mode=30;break}r.have=0,r.mode=18;case 18:for(;r.have<r.ncode;){for(;l<3;){if(0===o)break t;o--,u+=i[s++]<<l,l+=8}r.lens[A[r.have++]]=7&u,u>>>=3,l-=3}for(;r.have<19;)r.lens[A[r.have++]]=0;if(r.lencode=r.lendyn,r.lenbits=7,S={bits:r.lenbits},x=T(0,r.lens,0,19,r.lencode,0,r.work,S),r.lenbits=S.bits,x){t.msg="invalid code lengths set",r.mode=30;break}r.have=0,r.mode=19;case 19:for(;r.have<r.nlen+r.ndist;){for(;g=(C=r.lencode[u&(1<<r.lenbits)-1])>>>16&255,b=65535&C,!((_=C>>>24)<=l);){if(0===o)break t;o--,u+=i[s++]<<l,l+=8}if(b<16)u>>>=_,l-=_,r.lens[r.have++]=b;else{if(16===b){for(z=_+2;l<z;){if(0===o)break t;o--,u+=i[s++]<<l,l+=8}if(u>>>=_,l-=_,0===r.have){t.msg="invalid bit length repeat",r.mode=30;break}k=r.lens[r.have-1],c=3+(3&u),u>>>=2,l-=2}else if(17===b){for(z=_+3;l<z;){if(0===o)break t;o--,u+=i[s++]<<l,l+=8}l-=_,k=0,c=3+(7&(u>>>=_)),u>>>=3,l-=3}else{for(z=_+7;l<z;){if(0===o)break t;o--,u+=i[s++]<<l,l+=8}l-=_,k=0,c=11+(127&(u>>>=_)),u>>>=7,l-=7}if(r.have+c>r.nlen+r.ndist){t.msg="invalid bit length repeat",r.mode=30;break}for(;c--;)r.lens[r.have++]=k}}if(30===r.mode)break;if(0===r.lens[256]){t.msg="invalid code -- missing end-of-block",r.mode=30;break}if(r.lenbits=9,S={bits:r.lenbits},x=T(D,r.lens,0,r.nlen,r.lencode,0,r.work,S),r.lenbits=S.bits,x){t.msg="invalid literal/lengths set",r.mode=30;break}if(r.distbits=6,r.distcode=r.distdyn,S={bits:r.distbits},x=T(F,r.lens,r.nlen,r.ndist,r.distcode,0,r.work,S),r.distbits=S.bits,x){t.msg="invalid distances set",r.mode=30;break}if(r.mode=20,6===e)break t;case 20:r.mode=21;case 21:if(6<=o&&258<=h){t.next_out=a,t.avail_out=h,t.next_in=s,t.avail_in=o,r.hold=u,r.bits=l,R(t,d),a=t.next_out,n=t.output,h=t.avail_out,s=t.next_in,i=t.input,o=t.avail_in,u=r.hold,l=r.bits,12===r.mode&&(r.back=-1);break}for(r.back=0;g=(C=r.lencode[u&(1<<r.lenbits)-1])>>>16&255,b=65535&C,!((_=C>>>24)<=l);){if(0===o)break t;o--,u+=i[s++]<<l,l+=8}if(g&&0==(240&g)){for(v=_,y=g,w=b;g=(C=r.lencode[w+((u&(1<<v+y)-1)>>v)])>>>16&255,b=65535&C,!(v+(_=C>>>24)<=l);){if(0===o)break t;o--,u+=i[s++]<<l,l+=8}u>>>=v,l-=v,r.back+=v}if(u>>>=_,l-=_,r.back+=_,r.length=b,0===g){r.mode=26;break}if(32&g){r.back=-1,r.mode=12;break}if(64&g){t.msg="invalid literal/length code",r.mode=30;break}r.extra=15&g,r.mode=22;case 22:if(r.extra){for(z=r.extra;l<z;){if(0===o)break t;o--,u+=i[s++]<<l,l+=8}r.length+=u&(1<<r.extra)-1,u>>>=r.extra,l-=r.extra,r.back+=r.extra}r.was=r.length,r.mode=23;case 23:for(;g=(C=r.distcode[u&(1<<r.distbits)-1])>>>16&255,b=65535&C,!((_=C>>>24)<=l);){if(0===o)break t;o--,u+=i[s++]<<l,l+=8}if(0==(240&g)){for(v=_,y=g,w=b;g=(C=r.distcode[w+((u&(1<<v+y)-1)>>v)])>>>16&255,b=65535&C,!(v+(_=C>>>24)<=l);){if(0===o)break t;o--,u+=i[s++]<<l,l+=8}u>>>=v,l-=v,r.back+=v}if(u>>>=_,l-=_,r.back+=_,64&g){t.msg="invalid distance code",r.mode=30;break}r.offset=b,r.extra=15&g,r.mode=24;case 24:if(r.extra){for(z=r.extra;l<z;){if(0===o)break t;o--,u+=i[s++]<<l,l+=8}r.offset+=u&(1<<r.extra)-1,u>>>=r.extra,l-=r.extra,r.back+=r.extra}if(r.offset>r.dmax){t.msg="invalid distance too far back",r.mode=30;break}r.mode=25;case 25:if(0===h)break t;if(c=d-h,r.offset>c){if((c=r.offset-c)>r.whave&&r.sane){t.msg="invalid distance too far back",r.mode=30;break}p=c>r.wnext?(c-=r.wnext,r.wsize-c):r.wnext-c,c>r.length&&(c=r.length),m=r.window}else m=n,p=a-r.offset,c=r.length;for(h<c&&(c=h),h-=c,r.length-=c;n[a++]=m[p++],--c;);0===r.length&&(r.mode=21);break;case 26:if(0===h)break t;n[a++]=r.length,h--,r.mode=21;break;case 27:if(r.wrap){for(;l<32;){if(0===o)break t;o--,u|=i[s++]<<l,l+=8}if(d-=h,t.total_out+=d,r.total+=d,d&&(t.adler=r.check=r.flags?B(r.check,n,d,a-d):O(r.check,n,d,a-d)),d=h,(r.flags?u:L(u))!==r.check){t.msg="incorrect data check",r.mode=30;break}l=u=0}r.mode=28;case 28:if(r.wrap&&r.flags){for(;l<32;){if(0===o)break t;o--,u+=i[s++]<<l,l+=8}if(u!==(4294967295&r.total)){t.msg="incorrect length check",r.mode=30;break}l=u=0}r.mode=29;case 29:x=1;break t;case 30:x=-3;break t;case 31:return-4;case 32:default:return U}return t.next_out=a,t.avail_out=h,t.next_in=s,t.avail_in=o,r.hold=u,r.bits=l,(r.wsize||d!==t.avail_out&&r.mode<30&&(r.mode<27||4!==e))&&Z(t,t.output,t.next_out,d-t.avail_out)?(r.mode=31,-4):(f-=t.avail_in,d-=t.avail_out,t.total_in+=f,t.total_out+=d,r.total+=d,r.wrap&&d&&(t.adler=r.check=r.flags?B(r.check,n,d,t.next_out-d):O(r.check,n,d,t.next_out-d)),t.data_type=r.bits+(r.last?64:0)+(12===r.mode?128:0)+(20===r.mode||15===r.mode?256:0),(0==f&&0===d||4===e)&&x===N&&(x=-5),x)},r.inflateEnd=function(t){if(!t||!t.state)return U;var e=t.state;return e.window&&(e.window=null),t.state=null,N},r.inflateGetHeader=function(t,e){var r;return t&&t.state?0==(2&(r=t.state).wrap)?U:((r.head=e).done=!1,N):U},r.inflateSetDictionary=function(t,e){var r,i=e.length;return t&&t.state?0!==(r=t.state).wrap&&11!==r.mode?U:11===r.mode&&O(1,e,i,0)!==r.check?-3:Z(t,e,i,i)?(r.mode=31,-4):(r.havedict=1,N):U},r.inflateInfo="pako inflate (from Nodeca project)"},{"../utils/common":41,"./adler32":43,"./crc32":45,"./inffast":48,"./inftrees":50}],50:[function(t,e,r){"use strict";var D=t("../utils/common"),F=[3,4,5,6,7,8,9,10,11,13,15,17,19,23,27,31,35,43,51,59,67,83,99,115,131,163,195,227,258,0,0],N=[16,16,16,16,16,16,16,16,17,17,17,17,18,18,18,18,19,19,19,19,20,20,20,20,21,21,21,21,16,72,78],U=[1,2,3,4,5,7,9,13,17,25,33,49,65,97,129,193,257,385,513,769,1025,1537,2049,3073,4097,6145,8193,12289,16385,24577,0,0],P=[16,16,16,16,17,17,18,18,19,19,20,20,21,21,22,22,23,23,24,24,25,25,26,26,27,27,28,28,29,29,64,64];e.exports=function(t,e,r,i,n,s,a,o){var h,u,l,f,d,c,p,m,_,g=o.bits,b=0,v=0,y=0,w=0,k=0,x=0,S=0,z=0,C=0,E=0,A=null,I=0,O=new D.Buf16(16),B=new D.Buf16(16),R=null,T=0;for(b=0;b<=15;b++)O[b]=0;for(v=0;v<i;v++)O[e[r+v]]++;for(k=g,w=15;1<=w&&0===O[w];w--);if(w<k&&(k=w),0===w)return n[s++]=20971520,n[s++]=20971520,o.bits=1,0;for(y=1;y<w&&0===O[y];y++);for(k<y&&(k=y),b=z=1;b<=15;b++)if(z<<=1,(z-=O[b])<0)return-1;if(0<z&&(0===t||1!==w))return-1;for(B[1]=0,b=1;b<15;b++)B[b+1]=B[b]+O[b];for(v=0;v<i;v++)0!==e[r+v]&&(a[B[e[r+v]]++]=v);if(c=0===t?(A=R=a,19):1===t?(A=F,I-=257,R=N,T-=257,256):(A=U,R=P,-1),b=y,d=s,S=v=E=0,l=-1,f=(C=1<<(x=k))-1,1===t&&852<C||2===t&&592<C)return 1;for(;;){for(p=b-S,_=a[v]<c?(m=0,a[v]):a[v]>c?(m=R[T+a[v]],A[I+a[v]]):(m=96,0),h=1<<b-S,y=u=1<<x;n[d+(E>>S)+(u-=h)]=p<<24|m<<16|_|0,0!==u;);for(h=1<<b-1;E&h;)h>>=1;if(0!==h?(E&=h-1,E+=h):E=0,v++,0==--O[b]){if(b===w)break;b=e[r+a[v]]}if(k<b&&(E&f)!==l){for(0===S&&(S=k),d+=y,z=1<<(x=b-S);x+S<w&&!((z-=O[x+S])<=0);)x++,z<<=1;if(C+=1<<x,1===t&&852<C||2===t&&592<C)return 1;n[l=E&f]=k<<24|x<<16|d-s|0}}return 0!==E&&(n[d+E]=b-S<<24|64<<16|0),o.bits=k,0}},{"../utils/common":41}],51:[function(t,e,r){"use strict";e.exports={2:"need dictionary",1:"stream end",0:"","-1":"file error","-2":"stream error","-3":"data error","-4":"insufficient memory","-5":"buffer error","-6":"incompatible version"}},{}],52:[function(t,e,r){"use strict";var n=t("../utils/common"),o=0,h=1;function i(t){for(var e=t.length;0<=--e;)t[e]=0}var s=0,a=29,u=256,l=u+1+a,f=30,d=19,_=2*l+1,g=15,c=16,p=7,m=256,b=16,v=17,y=18,w=[0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0],k=[0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13],x=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,3,7],S=[16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15],z=new Array(2*(l+2));i(z);var C=new Array(2*f);i(C);var E=new Array(512);i(E);var A=new Array(256);i(A);var I=new Array(a);i(I);var O,B,R,T=new Array(f);function D(t,e,r,i,n){this.static_tree=t,this.extra_bits=e,this.extra_base=r,this.elems=i,this.max_length=n,this.has_stree=t&&t.length}function F(t,e){this.dyn_tree=t,this.max_code=0,this.stat_desc=e}function N(t){return t<256?E[t]:E[256+(t>>>7)]}function U(t,e){t.pending_buf[t.pending++]=255&e,t.pending_buf[t.pending++]=e>>>8&255}function P(t,e,r){t.bi_valid>c-r?(t.bi_buf|=e<<t.bi_valid&65535,U(t,t.bi_buf),t.bi_buf=e>>c-t.bi_valid,t.bi_valid+=r-c):(t.bi_buf|=e<<t.bi_valid&65535,t.bi_valid+=r)}function L(t,e,r){P(t,r[2*e],r[2*e+1])}function j(t,e){for(var r=0;r|=1&t,t>>>=1,r<<=1,0<--e;);return r>>>1}function Z(t,e,r){var i,n,s=new Array(g+1),a=0;for(i=1;i<=g;i++)s[i]=a=a+r[i-1]<<1;for(n=0;n<=e;n++){var o=t[2*n+1];0!==o&&(t[2*n]=j(s[o]++,o))}}function W(t){var e;for(e=0;e<l;e++)t.dyn_ltree[2*e]=0;for(e=0;e<f;e++)t.dyn_dtree[2*e]=0;for(e=0;e<d;e++)t.bl_tree[2*e]=0;t.dyn_ltree[2*m]=1,t.opt_len=t.static_len=0,t.last_lit=t.matches=0}function M(t){8<t.bi_valid?U(t,t.bi_buf):0<t.bi_valid&&(t.pending_buf[t.pending++]=t.bi_buf),t.bi_buf=0,t.bi_valid=0}function H(t,e,r,i){var n=2*e,s=2*r;return t[n]<t[s]||t[n]===t[s]&&i[e]<=i[r]}function G(t,e,r){for(var i=t.heap[r],n=r<<1;n<=t.heap_len&&(n<t.heap_len&&H(e,t.heap[n+1],t.heap[n],t.depth)&&n++,!H(e,i,t.heap[n],t.depth));)t.heap[r]=t.heap[n],r=n,n<<=1;t.heap[r]=i}function K(t,e,r){var i,n,s,a,o=0;if(0!==t.last_lit)for(;i=t.pending_buf[t.d_buf+2*o]<<8|t.pending_buf[t.d_buf+2*o+1],n=t.pending_buf[t.l_buf+o],o++,0===i?L(t,n,e):(L(t,(s=A[n])+u+1,e),0!==(a=w[s])&&P(t,n-=I[s],a),L(t,s=N(--i),r),0!==(a=k[s])&&P(t,i-=T[s],a)),o<t.last_lit;);L(t,m,e)}function Y(t,e){var r,i,n,s=e.dyn_tree,a=e.stat_desc.static_tree,o=e.stat_desc.has_stree,h=e.stat_desc.elems,u=-1;for(t.heap_len=0,t.heap_max=_,r=0;r<h;r++)0!==s[2*r]?(t.heap[++t.heap_len]=u=r,t.depth[r]=0):s[2*r+1]=0;for(;t.heap_len<2;)s[2*(n=t.heap[++t.heap_len]=u<2?++u:0)]=1,t.depth[n]=0,t.opt_len--,o&&(t.static_len-=a[2*n+1]);for(e.max_code=u,r=t.heap_len>>1;1<=r;r--)G(t,s,r);for(n=h;r=t.heap[1],t.heap[1]=t.heap[t.heap_len--],G(t,s,1),i=t.heap[1],t.heap[--t.heap_max]=r,t.heap[--t.heap_max]=i,s[2*n]=s[2*r]+s[2*i],t.depth[n]=(t.depth[r]>=t.depth[i]?t.depth[r]:t.depth[i])+1,s[2*r+1]=s[2*i+1]=n,t.heap[1]=n++,G(t,s,1),2<=t.heap_len;);t.heap[--t.heap_max]=t.heap[1],function(t,e){var r,i,n,s,a,o,h=e.dyn_tree,u=e.max_code,l=e.stat_desc.static_tree,f=e.stat_desc.has_stree,d=e.stat_desc.extra_bits,c=e.stat_desc.extra_base,p=e.stat_desc.max_length,m=0;for(s=0;s<=g;s++)t.bl_count[s]=0;for(h[2*t.heap[t.heap_max]+1]=0,r=t.heap_max+1;r<_;r++)p<(s=h[2*h[2*(i=t.heap[r])+1]+1]+1)&&(s=p,m++),h[2*i+1]=s,u<i||(t.bl_count[s]++,a=0,c<=i&&(a=d[i-c]),o=h[2*i],t.opt_len+=o*(s+a),f&&(t.static_len+=o*(l[2*i+1]+a)));if(0!==m){do{for(s=p-1;0===t.bl_count[s];)s--;t.bl_count[s]--,t.bl_count[s+1]+=2,t.bl_count[p]--,m-=2}while(0<m);for(s=p;0!==s;s--)for(i=t.bl_count[s];0!==i;)u<(n=t.heap[--r])||(h[2*n+1]!==s&&(t.opt_len+=(s-h[2*n+1])*h[2*n],h[2*n+1]=s),i--)}}(t,e),Z(s,u,t.bl_count)}function X(t,e,r){var i,n,s=-1,a=e[1],o=0,h=7,u=4;for(0===a&&(h=138,u=3),e[2*(r+1)+1]=65535,i=0;i<=r;i++)n=a,a=e[2*(i+1)+1],++o<h&&n===a||(o<u?t.bl_tree[2*n]+=o:0!==n?(n!==s&&t.bl_tree[2*n]++,t.bl_tree[2*b]++):o<=10?t.bl_tree[2*v]++:t.bl_tree[2*y]++,s=n,u=(o=0)===a?(h=138,3):n===a?(h=6,3):(h=7,4))}function V(t,e,r){var i,n,s=-1,a=e[1],o=0,h=7,u=4;for(0===a&&(h=138,u=3),i=0;i<=r;i++)if(n=a,a=e[2*(i+1)+1],!(++o<h&&n===a)){if(o<u)for(;L(t,n,t.bl_tree),0!=--o;);else 0!==n?(n!==s&&(L(t,n,t.bl_tree),o--),L(t,b,t.bl_tree),P(t,o-3,2)):o<=10?(L(t,v,t.bl_tree),P(t,o-3,3)):(L(t,y,t.bl_tree),P(t,o-11,7));s=n,u=(o=0)===a?(h=138,3):n===a?(h=6,3):(h=7,4)}}i(T);var q=!1;function J(t,e,r,i){P(t,(s<<1)+(i?1:0),3),function(t,e,r,i){M(t),i&&(U(t,r),U(t,~r)),n.arraySet(t.pending_buf,t.window,e,r,t.pending),t.pending+=r}(t,e,r,!0)}r._tr_init=function(t){q||(function(){var t,e,r,i,n,s=new Array(g+1);for(i=r=0;i<a-1;i++)for(I[i]=r,t=0;t<1<<w[i];t++)A[r++]=i;for(A[r-1]=i,i=n=0;i<16;i++)for(T[i]=n,t=0;t<1<<k[i];t++)E[n++]=i;for(n>>=7;i<f;i++)for(T[i]=n<<7,t=0;t<1<<k[i]-7;t++)E[256+n++]=i;for(e=0;e<=g;e++)s[e]=0;for(t=0;t<=143;)z[2*t+1]=8,t++,s[8]++;for(;t<=255;)z[2*t+1]=9,t++,s[9]++;for(;t<=279;)z[2*t+1]=7,t++,s[7]++;for(;t<=287;)z[2*t+1]=8,t++,s[8]++;for(Z(z,l+1,s),t=0;t<f;t++)C[2*t+1]=5,C[2*t]=j(t,5);O=new D(z,w,u+1,l,g),B=new D(C,k,0,f,g),R=new D(new Array(0),x,0,d,p)}(),q=!0),t.l_desc=new F(t.dyn_ltree,O),t.d_desc=new F(t.dyn_dtree,B),t.bl_desc=new F(t.bl_tree,R),t.bi_buf=0,t.bi_valid=0,W(t)},r._tr_stored_block=J,r._tr_flush_block=function(t,e,r,i){var n,s,a=0;0<t.level?(2===t.strm.data_type&&(t.strm.data_type=function(t){var e,r=4093624447;for(e=0;e<=31;e++,r>>>=1)if(1&r&&0!==t.dyn_ltree[2*e])return o;if(0!==t.dyn_ltree[18]||0!==t.dyn_ltree[20]||0!==t.dyn_ltree[26])return h;for(e=32;e<u;e++)if(0!==t.dyn_ltree[2*e])return h;return o}(t)),Y(t,t.l_desc),Y(t,t.d_desc),a=function(t){var e;for(X(t,t.dyn_ltree,t.l_desc.max_code),X(t,t.dyn_dtree,t.d_desc.max_code),Y(t,t.bl_desc),e=d-1;3<=e&&0===t.bl_tree[2*S[e]+1];e--);return t.opt_len+=3*(e+1)+5+5+4,e}(t),n=t.opt_len+3+7>>>3,(s=t.static_len+3+7>>>3)<=n&&(n=s)):n=s=r+5,r+4<=n&&-1!==e?J(t,e,r,i):4===t.strategy||s===n?(P(t,2+(i?1:0),3),K(t,z,C)):(P(t,4+(i?1:0),3),function(t,e,r,i){var n;for(P(t,e-257,5),P(t,r-1,5),P(t,i-4,4),n=0;n<i;n++)P(t,t.bl_tree[2*S[n]+1],3);V(t,t.dyn_ltree,e-1),V(t,t.dyn_dtree,r-1)}(t,t.l_desc.max_code+1,t.d_desc.max_code+1,a+1),K(t,t.dyn_ltree,t.dyn_dtree)),W(t),i&&M(t)},r._tr_tally=function(t,e,r){return t.pending_buf[t.d_buf+2*t.last_lit]=e>>>8&255,t.pending_buf[t.d_buf+2*t.last_lit+1]=255&e,t.pending_buf[t.l_buf+t.last_lit]=255&r,t.last_lit++,0===e?t.dyn_ltree[2*r]++:(t.matches++,e--,t.dyn_ltree[2*(A[r]+u+1)]++,t.dyn_dtree[2*N(e)]++),t.last_lit===t.lit_bufsize-1},r._tr_align=function(t){P(t,2,3),L(t,m,z),function(t){16===t.bi_valid?(U(t,t.bi_buf),t.bi_buf=0,t.bi_valid=0):8<=t.bi_valid&&(t.pending_buf[t.pending++]=255&t.bi_buf,t.bi_buf>>=8,t.bi_valid-=8)}(t)}},{"../utils/common":41}],53:[function(t,e,r){"use strict";e.exports=function(){this.input=null,this.next_in=0,this.avail_in=0,this.total_in=0,this.output=null,this.next_out=0,this.avail_out=0,this.total_out=0,this.msg="",this.state=null,this.data_type=2,this.adler=0}},{}],54:[function(t,e,r){"use strict";e.exports="function"==typeof setImmediate?setImmediate:function(){var t=[].slice.apply(arguments);t.splice(1,0,0),setTimeout.apply(null,t)}},{}]},{},[10])(10)});

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";

// EXTERNAL MODULE: ./node_modules/.pnpm/file-saver@2.0.5/node_modules/file-saver/dist/FileSaver.min.js
var FileSaver_min = __webpack_require__(227);
;// CONCATENATED MODULE: ./src/core/tokenTypes.ts
/**
 * Enum representing the different types of tokens in the parsed markdown.
 */
var TokenType;
(function (TokenType) {
    TokenType[TokenType["H2"] = 0] = "H2";
    TokenType[TokenType["H3"] = 1] = "H3";
    TokenType[TokenType["Text"] = 2] = "Text";
    TokenType[TokenType["Figure"] = 3] = "Figure";
    TokenType[TokenType["Gif"] = 4] = "Gif";
    TokenType[TokenType["InlineLink"] = 5] = "InlineLink";
    TokenType[TokenType["InlineCode"] = 6] = "InlineCode";
    TokenType[TokenType["Math"] = 7] = "Math";
    TokenType[TokenType["Italic"] = 8] = "Italic";
    TokenType[TokenType["Bold"] = 9] = "Bold";
    TokenType[TokenType["PlainText"] = 10] = "PlainText";
    TokenType[TokenType["UList"] = 11] = "UList";
    TokenType[TokenType["Olist"] = 12] = "Olist";
    TokenType[TokenType["BR"] = 13] = "BR";
    TokenType[TokenType["HR"] = 14] = "HR";
    TokenType[TokenType["Blockquote"] = 15] = "Blockquote";
    TokenType[TokenType["Code"] = 16] = "Code";
    TokenType[TokenType["Link"] = 17] = "Link";
    TokenType[TokenType["Table"] = 18] = "Table";
    TokenType[TokenType["Video"] = 19] = "Video";
})(TokenType || (TokenType = {}));

;// CONCATENATED MODULE: ./src/core/utils.ts
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
/**
 * Converts a Zhihu link to a normal link.
 * @param link - The Zhihu link to convert.
 * @returns The converted normal link.
 */
const ZhihuLink2NormalLink = (link) => {
    const url = new URL(link);
    if (url.hostname == "link.zhihu.com") {
        const target = new URLSearchParams(url.search).get("target");
        return decodeURIComponent(target);
    }
    else {
        if (link.match(/#/))
            return '#' + link.split('#')[1];
        else
            return link;
    }
};
/**
 * Get the title of the dom.
 * @param dom - The dom to get title.
 * @returns The title of the dom.
 */
const getTitle = (dom, scene, type) => {
    let t;
    if (scene == "follow" || scene == "people" || scene == "collection" || scene == "pin") {
        let title_dom = dom.closest('.ContentItem').querySelector("h2.ContentItem-title a");
        if (type == "answer" || type == "article") {
            //搜索结果页最新讨论
            !title_dom ? title_dom = dom.closest('.HotLanding-contentItem').querySelector("h2.ContentItem-title a") : 0;
            t = title_dom.textContent;
        }
        else { //想法
            if (title_dom) {
                t = "想法：" + title_dom.textContent + '-' + dom.innerText.slice(0, 16).trim().replace(/\s/g, "");
            }
            else
                t = "想法：" + dom.innerText.slice(0, 24).trim().replace(/\s/g, "");
        }
    }
    //问题/回答
    else if (scene == "question" || scene == "answer") {
        t = dom.closest('.QuestionPage').querySelector("meta[itemprop=name]").content;
    }
    //文章
    else if (scene == "article") {
        t = dom.closest('.Post-Main').querySelector("h1.Post-Title").textContent;
    }
    else
        t = "无标题";
    //替换英文问号为中文问号，因标题中间也可能有问号所以不去掉
    return t.replace(/\?/g, "？").replace(/\/|\\|<|>|"|\*|\?|\||\:/g, "-");
};
/**
 * Get the author of the dom.
 * @param dom - The dom to get author.
 * @returns The author of the dom.
 */
const getAuthor = (dom, scene, type) => {
    let author_dom;
    //寻找包含昵称+链接+签名的节点
    if (scene == "follow") {
        let p = dom.closest('.ContentItem');
        //唯独关注页作者在ContentItem外面，原创内容没有作者栏
        author_dom = p.querySelector(".AuthorInfo-content") ||
            dom.closest('.Feed').querySelector(".FeedSource .AuthorInfo-content") ||
            dom.closest('.Feed').querySelector(".FeedSource-firstline");
    }
    ///个人/问题/回答/想法/收藏夹
    else if (scene == "people" || scene == "question" || scene == "answer" || scene == "pin" || scene == "collection") {
        let p = dom.closest('.ContentItem');
        author_dom = p.querySelector(".AuthorInfo-content");
        // 个人页的搜索结果的想法没有作者栏
        if (!author_dom && location.href.includes('search')) {
            author_dom = document.querySelector('.ProfileHeader-title');
            return {
                name: author_dom.children[0].textContent,
                url: location.href.match(/(https.*)\/search/)[1],
                badge: author_dom.children[1].textContent
            };
        }
    }
    //文章
    else if (scene == "article") {
        author_dom = dom.closest('.Post-Main').querySelector(".Post-Author");
    }
    if (author_dom) {
        let authorName_dom = author_dom.querySelector(".AuthorInfo-name .UserLink-link") ||
            author_dom.querySelector(".UserLink-link") ||
            author_dom.querySelector(".UserLink.AuthorInfo-name"); //匿名用户
        let authorBadge_dom = author_dom.querySelector(".AuthorInfo-badge");
        //console.log("authorName_dom", authorName_dom)
        return {
            name: authorName_dom.innerText || (authorName_dom.children[0] ? authorName_dom.children[0].getAttribute("alt") : ''), //???//没有名字的用户https://www.zhihu.com/people/8-90-74/answers
            url: authorName_dom.href,
            badge: authorBadge_dom ? authorBadge_dom.innerText : ""
        };
    }
    else
        console.error("未找到author_dom");
};
/**
 * Get the URL of the dom.
 * 应该按每个内容获取URL，而非目前网址
 * @param dom - The dom to get URL.
 * @returns The URL of the dom.
 */
const getURL = (dom, scene, type) => {
    let url;
    //文章/想法/回答
    if (scene == "article" || scene == "pin" || scene == "answer") {
        url = window.location.href;
        let q = url.match(/\?/) ? url.match(/\?/).index : 0;
        if (q)
            url = url.slice(0, q);
        return url;
    }
    //关注/个人/问题/等
    // if (scene == "follow" || scene == "people" || scene == "question")
    else {
        if (type == "answer" || type == "article") {
            //普通
            let p = dom.closest('.ContentItem');
            let url_dom = p.querySelector(".ContentItem>meta[itemprop=url]");
            //搜索结果页
            if (!url_dom) {
                url_dom = p.querySelector(".ContentItem h2 a");
            }
            //搜索结果页最新讨论
            if (!url_dom) {
                p = dom.closest('.HotLanding-contentItem');
                url_dom = p.querySelector(".ContentItem h2 a");
            }
            url = url_dom.content || (url_dom.href);
            if (url.slice(0, 5) != "https")
                url = "https:" + url;
            return url;
        }
        //pin
        else {
            let zopdata = dom.closest('.ContentItem').getAttribute("data-zop");
            return "https://www.zhihu.com/pin/" + JSON.parse(zopdata).itemId;
        }
    }
};
/**
 *
 * 时间：
 * 使用内容下显示的时间
 *
 */
const getTime = (dom, scene, type) => __awaiter(void 0, void 0, void 0, function* () {
    //关注/个人/问题/回答页
    //if (scene == "follow" || scene == "people" || scene == "question" || scene == "answer") {//收藏夹
    //  if (type != "" || type == "article") {
    let created, modified, time_dom;
    if (scene != "article") {
        time_dom = dom.closest('.ContentItem').querySelector(".ContentItem-time");
        created = time_dom.querySelector("span").getAttribute("data-tooltip").slice(4); //2023-12-30 16:12
        modified = time_dom.querySelector("span").innerText.slice(4);
        return { created, modified };
    }
    else { //文章
        time_dom = dom.closest('.Post-content').querySelector(".ContentItem-time");
        modified = time_dom.childNodes[0].textContent.slice(4);
        time_dom.click();
        yield new Promise((resolve) => {
            setTimeout(() => {
                resolve();
            }, 1000);
        });
        created = time_dom.childNodes[0].textContent.slice(4);
        time_dom.click();
        return { created, modified };
    }
    //  }
    //}
});
const getUpvote = (dom, scene, type) => {
    //关注/个人/问题/回答页
    //if (scene == "follow" || scene == "people" || scene == "question" || scene == "answer") {//收藏夹
    //up_dom = (getParent(dom, "ContentItem") as HTMLElement).querySelector(".VoteButton--up") as HTMLElement//\n赞同 5.6 万
    let upvote, up_dom;
    if (type == "pin") {
        //个人页的想法有2层ContentItem-actions，想法页有1层
        up_dom = dom.closest('.ContentItem').querySelector(".ContentItem-actions>.ContentItem-actions") ||
            dom.closest('.ContentItem').querySelector(".ContentItem-actions");
        up_dom = up_dom.childNodes[0];
        upvote = up_dom.textContent.replace(/,|\u200B/g, '').slice(3); //0, -4
        upvote ? 0 : upvote = 0;
    }
    else if (scene == "article") {
        up_dom = dom.closest('.Post-content').querySelector(".ContentItem-actions .VoteButton");
        upvote = up_dom.textContent.replace(/,|\u200B/g, '').slice(3);
        upvote ? 0 : upvote = 0;
    }
    else {
        let zaedata = dom.closest('.ContentItem').getAttribute("data-za-extra-module");
        //搜索结果页
        if (window.location.href.includes('/search?')) {
            upvote = dom.closest('.RichContent').querySelector(".VoteButton--up").getAttribute('aria-label').slice(3) || 0;
        }
        else
            upvote = JSON.parse(zaedata).card.content.upvote_num;
    }
    return parseInt(upvote);
    //  }
    //}
};
const getCommentNum = (dom, scene, type) => {
    //关注/个人/问题/回答页
    //if (scene == "follow" || scene == "people" || scene == "question" || scene == "answer") {//收藏夹
    let cm, cm_dom, p;
    //被展开的评论区
    p = dom.closest('.ContentItem');
    p ? cm_dom = p.querySelector(".css-1k10w8f") : 0;
    if (cm_dom) {
        cm = cm_dom.textContent.replace(/,|\u200B/g, "").slice(0, -4);
    }
    else if (type == "pin") {
        cm_dom = dom.closest('.ContentItem').querySelector(".ContentItem-actions>.ContentItem-actions") ||
            dom.closest('.ContentItem').querySelector(".ContentItem-actions");
        cm_dom = cm_dom.childNodes[1];
        cm = cm_dom.textContent.replace(/,|\u200B/g, "").slice(0, -4);
        cm ? 0 : cm = 0;
    }
    else if (scene == "article") {
        cm_dom = dom.closest('.Post-content').querySelector(".BottomActions-CommentBtn");
        cm = cm_dom.textContent.replace(/,|\u200B/g, '').slice(0, -4);
        cm ? 0 : cm = 0;
    }
    else {
        let zaedata = dom.closest('.ContentItem').getAttribute("data-za-extra-module");
        //搜索结果页
        if (window.location.href.includes('/search?')) {
            cm_dom = dom.closest('.RichContent').querySelector("button.ContentItem-action");
            cm = cm_dom.textContent.replace(/,|\u200B/g, "").slice(0, -4);
        }
        else
            cm = JSON.parse(zaedata).card.content.comment_num;
    }
    return parseInt(cm);
    //  }
    //}
};
const getRemark = (dom) => {
    let remark, p = dom.closest('.ContentItem'); //文章页没有，remark = remark.replace(/\/|\\|<|>|"|\*|\?|\||\:/g, "-")
    if (!p)
        p = dom.closest('.PinItem');
    if (!p)
        p = dom.closest('.Post-content');
    if (p)
        remark = p.querySelector("textarea.to-remark").value.replace(/\s/g, "-");
    if (remark.match(/\/|\\|<|>|"|\*|\?|\||\:/g))
        return "非法备注";
    return remark;
};
/**
 * 获取是否需要保存评论，用于截图，zip
 */
const getCommentSwitch = (dom) => {
    let s, p = dom.closest('.ContentItem');
    if (!p)
        p = dom.closest('.PinItem');
    if (!p)
        p = dom.closest('.Post-content');
    if (p)
        s = p.querySelector("input.to-cm").checked;
    return s;
};
/**
 * Get the Location of the dom.
 * @param dom - The dom.
 * @returns string | null
 */
const getLocation = (dom, scene, type) => {
    var _a;
    let location, el = dom.closest('.ContentItem'); //想法类型、文章页没有
    if (!el)
        el = dom.closest('.PinItem');
    if (!el)
        el = dom.closest('.Post-content');
    try {
        if (el) {
            location = (_a = el.querySelector('.ContentItem-time').childNodes[1]) === null || _a === void 0 ? void 0 : _a.textContent.slice(6);
        }
        if (!location && scene == "people") {
            let name = document.querySelector('.ProfileHeader-name').childNodes[0].textContent;
            if (name == getAuthor(dom, scene, type).name) {
                location = document.querySelector('.css-1xfvezd').textContent.slice(5);
            }
        }
    }
    catch (e) {
        console.error('保存location出错', e);
    }
    return location;
};

;// CONCATENATED MODULE: ./src/core/lexer.ts


/**
 * Tokenizes a NodeListOf<Element> and returns an array of LexType tokens.
 * @param input - The NodeListOf<Element> to tokenize.
 * @returns An array of LexType tokens.
 */
const lexer = (input, type) => {
    /**
     * 想法,文字没有节点，非#标签和非@链接被<br>隔开，是单独的一行
     * 将每一段转为p段落处理
     */
    if (type == "pin") {
        //console.log(input)
        if (input.length == 0) {
            return [];
        }
        let pinParagraphs = []; //二级包-一级
        let dom = input[0].parentNode; //RichText
        //被转发的想法，首行添加主人
        if (dom.closest('.PinItem-content-originpin')) {
            let p = document.createElement("p");
            p.innerHTML = dom.closest('.PinItem-content-originpin').firstElementChild.textContent;
            pinParagraphs.push({
                type: TokenType.Text,
                content: Tokenize(p),
            });
        }
        let blocks = dom.innerHTML.replace(/\n\s*/g, "").split(/<br.{0,20}>/g);
        for (let block of blocks) {
            let p = document.createElement("p");
            p.innerHTML = block;
            pinParagraphs.push({
                type: TokenType.Text,
                content: Tokenize(p),
            });
        }
        //检查想法有无引用回答，仅检查当前层级
        if (dom.closest('.PinItem-content-originpin')) {
            let a = dom.closest('.PinItem-content-originpin').querySelector("a.LinkCard");
            if (a) {
                let p = document.createElement("p");
                let a2 = document.createElement("a");
                a2.href = a.href;
                a2.innerHTML = a.innerText.replace(/\n\s*/g, " ");
                p.innerHTML = a2.outerHTML;
                pinParagraphs.push({
                    type: TokenType.Text,
                    content: Tokenize(p),
                });
            }
        }
        else {
            //此时dom不在源想法内
            let parent = dom.closest('.PinItem');
            if (!parent.querySelector(".PinItem-content-originpin") && parent.querySelector("a.LinkCard")) {
                let a = parent.querySelector("a.LinkCard");
                let p = document.createElement("p");
                let a2 = document.createElement("a");
                a2.href = a.href;
                a2.innerHTML = a.innerText.replace(/\n\s*/g, " ");
                p.innerHTML = a2.outerHTML;
                pinParagraphs.push({
                    type: TokenType.Text,
                    content: Tokenize(p),
                });
            }
        }
        //console.log('pinParagraphs', pinParagraphs)
        return pinParagraphs;
    }
    const tokens = [];
    // @ts-ignore
    let skipEmpty = window.skip_empty_p;
    for (let i = 0; i < input.length; i++) {
        const node = input[i];
        //console.log(node)
        const tagName = node.nodeName.toLowerCase();
        switch (tagName) {
            case "h2": {
                tokens.push({
                    type: TokenType.H2,
                    text: node.textContent,
                    dom: node
                });
                break;
            }
            case "h3": {
                tokens.push({
                    type: TokenType.H3,
                    text: node.textContent,
                    dom: node
                });
                break;
            }
            case "div": {
                if (node.classList.contains("highlight")) {
                    tokens.push({
                        type: TokenType.Code,
                        content: node.textContent,
                        language: node.querySelector("pre > code").classList.value.slice(9),
                        dom: node
                    });
                }
                else if (node.classList.contains("RichText-LinkCardContainer")) {
                    const link = node.firstChild;
                    tokens.push({
                        type: TokenType.Link,
                        text: link.getAttribute("data-text"),
                        href: ZhihuLink2NormalLink(link.href),
                        dom: node
                    });
                }
                else if (node.querySelector("video")) {
                    tokens.push({
                        type: TokenType.Video,
                        src: node.querySelector("video").getAttribute("src"),
                        local: false,
                        dom: node
                    });
                }
                else if (node.classList.contains("RichText-ADLinkCardContainer")) {
                    tokens.push({
                        type: TokenType.Text,
                        content: [{
                                type: TokenType.PlainText,
                                text: node.textContent
                            }],
                        dom: node
                    });
                }
                break;
            }
            case "blockquote": {
                tokens.push({
                    type: TokenType.Blockquote,
                    content: Tokenize(node),
                    dom: node
                });
                break;
            }
            case "figure": {
                const img = node.querySelector("img");
                if (img.classList.contains("ztext-gif")) {
                    const guessSrc = (src) => {
                        return src.replace(/\..{3,4}$/g, ".gif");
                    };
                    const src = guessSrc(img.getAttribute("src") || img.getAttribute("data-thumbnail"));
                    if (src) {
                        tokens.push({
                            type: TokenType.Gif,
                            src,
                            local: false,
                            dom: node
                        });
                    }
                }
                else {
                    const src = img.getAttribute("data-actualsrc") || img.getAttribute("data-original") || img.src;
                    if (src) {
                        tokens.push({
                            type: TokenType.Figure,
                            src,
                            local: false,
                            dom: node
                        });
                    }
                }
                //保存图片题注Tokenize(text),
                const text = node.querySelector("figcaption");
                if (text) {
                    tokens.push({
                        type: TokenType.Text,
                        content: [{
                                type: TokenType.Italic,
                                content: Tokenize(text),
                                dom: text,
                            }],
                        dom: text
                    });
                }
                break;
            }
            case "ul": {
                const childNodes = Array.from(node.querySelectorAll("li"));
                tokens.push({
                    type: TokenType.UList,
                    content: childNodes.map((el) => Tokenize(el)),
                    dom: node,
                });
                break;
            }
            case "ol": {
                const childNodes = Array.from(node.querySelectorAll("li"));
                tokens.push({
                    type: TokenType.Olist,
                    content: childNodes.map((el) => Tokenize(el)),
                    dom: node,
                });
                break;
            }
            case "p": {
                if (node.classList.contains('ztext-empty-paragraph') && skipEmpty)
                    break;
                tokens.push({
                    type: TokenType.Text,
                    content: Tokenize(node),
                    dom: node
                });
                break;
            }
            case "hr": {
                tokens.push({
                    type: TokenType.HR,
                    dom: node
                });
                break;
            }
            case "table": {
                const el = node;
                const table2array = (table) => {
                    const res = [];
                    const rows = Array.from(table.rows);
                    for (let row of rows) {
                        const cells = Array.from(row.cells);
                        res.push(cells.map((cell) => cell.innerHTML.replace(/<a.*?href.*?>(.*?)<svg.*?>.*?<\/svg><\/a>/gms, "$1").replace(/<span>(.*?)<\/span>/gms, "$1")));
                    }
                    return res;
                };
                const table = table2array(el);
                tokens.push({
                    type: TokenType.Table,
                    content: table,
                    dom: node,
                });
                break;
            }
        }
    }
    //console.log(tokens)
    return tokens;
};
/**
 * Tokenizes an HTML element or string into an array of TokenTextType objects.
 * 处理行内内容
 * @param node The HTML element or string to tokenize.
 * @returns An array of TokenTextType objects representing the tokenized input.
 */
const Tokenize = (node) => {
    if (typeof node == "string") {
        return [{
                type: TokenType.PlainText,
                text: node.trimStart(), // 修复被误识别为代码块
            }];
    }
    let childs = Array.from(node.childNodes);
    const res = [];
    // 处理 <blockquote><p></p></blockquote> 的奇观
    try {
        if (childs.length == 1 && childs[0].tagName.toLowerCase() == "p") {
            childs = Array.from(childs[0].childNodes);
        }
    }
    catch (_a) { }
    for (let child of childs) {
        if (child.nodeType == child.TEXT_NODE) {
            res.push({
                type: TokenType.PlainText,
                text: child.textContent.replace(/\u200B/g, '').trimStart(), // 修复被误识别为代码块
                dom: child,
            });
        }
        else {
            let el = child;
            switch (el.tagName.toLowerCase()) {
                case "b": {
                    res.push({
                        type: TokenType.Bold,
                        content: Tokenize(el),
                        dom: el,
                    });
                    break;
                }
                case "i": {
                    res.push({
                        type: TokenType.Italic,
                        content: Tokenize(el),
                        dom: el,
                    });
                    break;
                }
                case "br": {
                    res.push({
                        type: TokenType.BR,
                        dom: el,
                    });
                    break;
                }
                case "code": {
                    res.push({
                        type: TokenType.InlineCode,
                        content: el.innerText,
                        dom: el,
                    });
                    break;
                }
                case "span": {
                    try {
                        if (el.classList.contains("ztext-math")) {
                            res.push({
                                type: TokenType.Math,
                                content: el.getAttribute("data-tex"),
                                dom: el,
                            });
                        }
                        else if (el.children[0].classList.contains("RichContent-EntityWord")) { //搜索词
                            res.push({
                                type: TokenType.PlainText,
                                text: el.innerText,
                                dom: el,
                            });
                        }
                        else if (el.children[0].classList.contains("UserLink")) { //想法中的@
                            res.push({
                                type: TokenType.InlineLink,
                                text: el.innerText,
                                href: ZhihuLink2NormalLink(el.querySelector("a").href),
                                dom: el,
                            });
                        }
                    }
                    catch (e) {
                        res.push({
                            type: TokenType.PlainText,
                            text: el.innerText,
                            dom: el,
                        });
                        //console.error(el, el.innerText)
                    }
                    break;
                }
                case "a": {
                    //console.log(el)
                    // 移除另一种搜索推荐
                    if (el.href.startsWith('https://zhida.zhihu.com/search')) {
                        res.push({
                            type: TokenType.PlainText,
                            text: el.innerText,
                            dom: el,
                        });
                    }
                    else
                        res.push({
                            type: TokenType.InlineLink,
                            text: el.textContent,
                            href: ZhihuLink2NormalLink(el.href),
                            dom: el,
                        });
                    break;
                }
                case "sup": {
                    //参考文献引用
                    res.push({
                        type: TokenType.InlineLink,
                        text: el.firstElementChild.textContent,
                        href: ZhihuLink2NormalLink(el.firstElementChild.href),
                        dom: el.firstElementChild,
                    });
                    break;
                }
                default: {
                    //下划线内容等question/478154391/answer/121816724037
                    res.push({
                        type: TokenType.PlainText,
                        text: child.textContent.replace(/\u200B/g, '').trimStart(),
                        dom: child,
                    });
                }
            }
        }
    }
    //console.log(res)
    return res;
};

;// CONCATENATED MODULE: ./src/core/parser.ts

/**
 * Parses an array of LexType objects and returns an array of strings representing the parsed output.
 * @param input An array of LexType objects to be parsed.
 * @returns An array of strings representing the parsed output.
 */
const parser = (input) => {
    const output = [];
    for (let i = 0; i < input.length; i++) {
        const token = input[i];
        switch (token.type) {
            case TokenType.Code: {
                output.push(`\`\`\`${token.language ? token.language : ""}\n${token.content}${token.content.endsWith("\n") ? "" : "\n"}\`\`\``);
                break;
            }
            case TokenType.UList: {
                output.push(token.content.map((item) => `- ${renderRich(item)}`).join("\n"));
                break;
            }
            case TokenType.Olist: {
                output.push(token.content.map((item, index) => `${index + 1}. ${renderRich(item)}`).join("\n"));
                break;
            }
            case TokenType.H2: {
                output.push(`## ${token.text}`);
                break;
            }
            case TokenType.H3: {
                output.push(`### ${token.text}`);
                break;
            }
            case TokenType.Blockquote: {
                output.push(renderRich(token.content, "> ").replace(/\n/g, '\n> \n')); // 修复部分引用不分段问题
                break;
            }
            case TokenType.Text: {
                output.push(renderRich(token.content));
                break;
            }
            case TokenType.HR: {
                output.push("\n---\n");
                break;
            }
            case TokenType.Link: {
                output.push(`[${token.text}](${token.href})`);
                break;
            }
            case TokenType.Figure:
            case TokenType.Gif: {
                // @ts-ignore
                window.no_save_img && !token.local ?
                    output.push(`[图片]`) :
                    output.push(`![](${token.local ? token.localSrc : token.src})`);
                break;
            }
            case TokenType.Video: {
                // 创建一个虚拟的 DOM 节点
                const dom = document.createElement("video");
                dom.setAttribute("src", token.local ? token.localSrc : token.src);
                if (!token.local)
                    dom.setAttribute("data-info", "文件还未下载，随时可能失效，请使用`下载全文为Zip`将视频一同下载下来");
                output.push(dom.outerHTML);
                break;
            }
            case TokenType.Table: {
                //console.log(token)
                const rows = token.content;
                const cols = rows[0].length;
                const widths = new Array(cols).fill(0);
                const res = [];
                for (let i in rows) {
                    for (let j in rows[i]) {
                        widths[j] = Math.max(widths[j], rows[i][j].length);
                    }
                }
                const renderRow = (row) => {
                    let res = "";
                    for (let i = 0; i < cols; i++) {
                        res += `| ${row[i].padEnd(widths[i])} `;
                    }
                    res += "|";
                    return res;
                };
                const renderSep = () => {
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
            }
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
const renderRich = (input, joint = "") => {
    let res = "";
    for (let el of input) {
        switch (el.type) {
            case TokenType.Bold: {
                res += `**${renderRich(el.content)}** `; // 修复md阅读器识别带标点符号的加粗内容有误问题
                break;
            }
            case TokenType.Italic: {
                res += `*${renderRich(el.content)}*`;
                break;
            }
            case TokenType.InlineLink: {
                res += `[${el.text}](${el.href})`;
                break;
            }
            case TokenType.PlainText: {
                res += el.text;
                break;
            }
            case TokenType.BR: {
                res += "\n" + joint;
                break;
            }
            case TokenType.InlineCode: {
                res += `\`${el.content}\``;
                break;
            }
            case TokenType.Math: {
                if (input.length == 1)
                    res += `$$\n${el.content}\n$$`;
                else
                    res += `$${el.content}$`;
                break;
            }
        }
    }
    //console.log(joint +res)
    return joint + res;
};

// EXTERNAL MODULE: ./node_modules/.pnpm/jszip@3.9.1/node_modules/jszip/dist/jszip.min.js
var jszip_min = __webpack_require__(434);
;// CONCATENATED MODULE: ./src/core/download2zip.ts
var download2zip_awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
/**
 * 下载文件并将其添加到zip文件中
 * @param url 下载文件的URL
 * @param zip JSZip对象，用于创建zip文件
 * @returns 添加了下载文件的zip文件
 */
function downloadAndZip(url, zip) {
    return download2zip_awaiter(this, void 0, void 0, function* () {
        const response = yield fetch(url);
        const arrayBuffer = yield response.arrayBuffer();
        let fileName = url.replace(/\?.*?$/g, "").split("/").pop();
        fileName.endsWith('.image') ? fileName += '.jpg' : 0;
        // 添加到zip文件
        zip.file(fileName, arrayBuffer);
        return { zip, file_name: fileName };
    });
}
/**
 * 下载一系列文件并将其添加到zip文件中
 * @param urls 下载文件的URL
 * @param zip JSZip对象，用于创建zip文件
 * @returns 添加了下载文件的zip文件
 */
function downloadAndZipAll(urls, zip) {
    return download2zip_awaiter(this, void 0, void 0, function* () {
        for (let url of urls)
            zip = (yield downloadAndZip(url, zip)).zip;
        return zip;
    });
}

;// CONCATENATED MODULE: ./src/core/savelex.ts
var savelex_awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};



/* harmony default export */ const savelex = ((lex, assetsPath = "assets") => savelex_awaiter(void 0, void 0, void 0, function* () {
    const zip = new jszip_min();
    let FigureFlag = false;
    for (let token of lex) {
        if (token.type == TokenType.Figure || token.type == TokenType.Video || token.type == TokenType.Gif) {
            FigureFlag = true;
            break;
        }
    }
    if (FigureFlag) {
        const assetsFolder = zip.folder(assetsPath);
        for (let token of lex) {
            try {
                switch (token.type) {
                    case TokenType.Figure:
                    case TokenType.Video:
                    case TokenType.Gif: {
                        const { file_name } = yield downloadAndZip(token.src, assetsFolder);
                        token.localSrc = `./${assetsPath}/${file_name}`;
                        token.local = true;
                        break;
                    }
                }
            }
            catch (e) {
                console.error('下载', token, e);
                alert('下载失败' + token.type + e);
            }
        }
    }
    /*const markdown = parser(lex).join("\n\n")
    zip.file("index.md", markdown)*/
    return { zip: zip, localLex: lex };
}));

;// CONCATENATED MODULE: ./src/core/renderComments.js
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
    const formattedContent = comment.content.replace('\n', '\n\n').split('\n')
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
        // @ts-ignore
        window.no_save_img && !isLocalImg ?
            markdown.push(`${prefix}[图片]`, prefix) :
            markdown.push(`${prefix}![](${comment.img})`, prefix)
        // @ts-ignore
        console.log('comment.img', window.no_save_img);
    }

    markdown.push(
        `${prefix}${comment.time} ${comment.location} ${comment.likes} 赞`,
        prefix
    );

    // 递归处理回复
    if (comment.replies && comment.replies.length) {
        const repliesMarkdown = comment.replies
            .map(replyId => comments.get(replyId))
            //.filter(reply => reply) // 过滤掉可能的无效回复
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
 * @returns {[String,String[]]}
 */
function renderAllComments(commentsMap, isLocalImg) {
    // 找出所有顶级评论（没有parentId的评论）
    //console.log(commentsMap)
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
;// CONCATENATED MODULE: ./src/dealItem.ts
var dealItem_awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};






function detectScene() {
    const pathname = location.pathname;
    let scene;
    if (pathname == "/follow")
        scene = "follow";
    else if (pathname.includes("/people") || pathname.includes("/org"))
        scene = "people";
    else if (pathname.includes("/question") && !pathname.includes('answer'))
        scene = "question";
    else if (pathname.includes("/question") && pathname.includes('answer'))
        scene = "answer";
    else if (pathname.includes("/pin"))
        scene = "pin";
    else if (location.hostname == "zhuanlan.zhihu.com")
        scene = "article";
    else if (pathname.includes("/collection"))
        scene = "collection";
    else if (pathname.includes("/search"))
        scene = "collection";
    else if (location.href == "https://www.zhihu.com/")
        scene = "collection"; //搜索、推荐、收藏夹似乎一样
    else
        console.log("未知场景");
    //https://www.zhihu.com/question/2377606804/answers/updated 按时间排序的问题
    if (pathname.slice(0, 9) == "/question" && !pathname.includes('updated'))
        scene = "question";
    return scene;
}
function detectType(dom, bt, ev) {
    //ContentItem
    let type;
    if (dom.closest('.AnswerItem'))
        type = "answer";
    else if (dom.closest('.ArticleItem'))
        type = "article";
    else if (dom.closest('.Post-content'))
        type = "article";
    else if (dom.closest('.PinItem'))
        type = "pin";
    else {
        console.log("未知内容");
        let zhw = ev.target.closest('.zhihubackup-wrap'), bz = zhw.querySelector('textarea').value, fa = zhw.closest('.ContentItem') || zhw.closest('.Post-content') || zhw.closest('.HotLanding-contentItem');
        !fa ? alert('请勿收起又展开内容，否则会保存失败。请重新保存。') : 0;
        document.querySelectorAll('.zhihubackup-wrap').forEach((w) => w.remove());
        // @ts-ignore
        setTimeout(window.zhbf, 100);
        setTimeout(() => {
            fa.querySelector('textarea').value = bz;
        }, 200);
        setTimeout(() => {
            fa.querySelector(`.to-${bt}`).click();
        }, 250);
        return;
    }
    return type;
}
/* harmony default export */ const dealItem = ((dom, button, event) => dealItem_awaiter(void 0, void 0, void 0, function* () {
    //console.log(dom)
    //确认场景
    let scene = detectScene();
    let type = detectType(dom, button, event);
    if (!type) {
        return;
    }
    //console.log(scene + type)
    if (!scene || !type)
        return;
    /*     try {
            // @ts-ignore 仅供调试
            var gminfo = GM_info
            console.log(gminfo)
            script.name
        } catch (e) {
        } */
    const title = getTitle(dom, scene, type), author = getAuthor(dom, scene, type), time = yield getTime(dom, scene), //?????????
    url = getURL(dom, scene, type), upvote_num = getUpvote(dom, scene, type), comment_num = getCommentNum(dom, scene, type), Location = getLocation(dom, scene, type);
    let remark = getRemark(dom);
    if (remark === "非法备注") {
        alert(decodeURIComponent("备注不可包含%20%20%2F%20%3A%20*%20%3F%20%22%20%3C%20%3E%20%7C"));
        return;
    }
    remark ? remark = "_" + remark : 0;
    if (button == 'png') {
        const imgs = dom.querySelectorAll('figure img');
        let noload;
        imgs.forEach((i) => {
            if (i.src.match(/data\:image\/svg\+xml;.*><\/svg>/))
                noload = 1;
        });
        if (noload) {
            alert('内容中还有未加载的图片，请滚动到底，使图都加载后再保存\n若效果不好，可使用其他软件保存');
            return;
        }
        return {
            title: title + "_" + author.name + "_" + time.modified.slice(0, 10) + remark
        };
    }
    // 复制与下载纯文本时不保存图片，影响所有parser()，还有评论的图片，暂存到window
    var no_save_img = false, skip_empty_p = false;
    try {
        // @ts-ignore
        no_save_img = GM_getValue("no_save_img");
        // @ts-ignore
        window.no_save_img = no_save_img;
        // @ts-ignore
        skip_empty_p = GM_getValue("skip_empty_p");
        // @ts-ignore
        window.skip_empty_p = skip_empty_p;
    }
    catch (e) {
        console.warn(e);
    }
    /**
     * 生成frontmatter
     * 标题，链接，作者名，赞数，评论数，创建时间，修改时间
     * (author.badge ? ('\nauthor_badge: ' + author.badge) : '')
     */
    const getFrontmatter = () => {
        let fm = '---'
            + '\ntitle: ' + title
            + '\nurl: ' + url
            + '\nauthor: ' + author.name
            + '\nauthor_badge: ' + author.badge
            + `${Location ? '\nlocation: ' + Location : ''}`
            + '\ncreated: ' + time.created
            + '\nmodified: ' + time.modified
            + '\nupvote_num: ' + upvote_num
            + '\ncomment_num: ' + comment_num
            + '\n---\n';
        return fm;
    };
    /**
     * 生成目录
     */
    const TOC = (() => {
        let toc = (dom.closest('.ContentItem') || dom.closest('.Post-content')).querySelector(".Catalog-content");
        let items = [];
        if (toc) {
            let i = 1, j = 1;
            toc.childNodes.forEach((e) => {
                if (e.classList.contains('Catalog-FirstLevelTitle')) {
                    items.push(i++ + '. ' + e.textContent);
                    j = 1;
                }
                else {
                    items.push('    ' + j++ + '. ' + e.textContent);
                }
            });
            return ['## 目录', items.join('\n')];
        }
        else
            return null;
    })();
    const lex = lexer(dom.childNodes, type);
    var md = [], originPinMD = [];
    //console.log("lex", lex)
    //保存文章头图
    let headImg = document.querySelector('span>picture>img');
    if (scene == 'article' && headImg) {
        const src = headImg.getAttribute("src");
        if (src)
            lex.unshift({
                type: TokenType.Figure,
                src,
                local: false,
                dom: headImg
            });
    }
    //是转发的想法，对源想法解析，并准备附加到新想法下面
    if (type == "pin" && dom.closest('.PinItem').querySelector(".PinItem-content-originpin")) {
        const dom2 = dom.closest('.PinItem').querySelector(".PinItem-content-originpin .RichText");
        const lex2 = lexer(dom2.childNodes, type);
        //markdown = markdown.concat(parser(lex2).map((l) => "> " + l))
        originPinMD.push('\n\n' + parser(lex2).map((l) => "> " + l).join("\n> \n"));
    }
    // 获取想法图片/标题
    if (type == "pin") {
        const pinItem = dom.closest('.PinItem');
        if (pinItem.querySelector(".ContentItem-title"))
            lex.unshift({
                type: TokenType.Text,
                content: [{
                        type: TokenType.PlainText,
                        text: '**' + pinItem.querySelector(".ContentItem-title").textContent + '**'
                    }]
            });
        if (pinItem.querySelector(".Image-PreviewVague")) {
            const imgs = pinItem.querySelectorAll(".Image-PreviewVague > img");
            imgs.forEach((img) => {
                lex.push({
                    type: TokenType.Figure,
                    src: img.getAttribute("data-original") || img.getAttribute("data-actualsrc"),
                });
            });
        }
    }
    //解析评论
    let commentText = '', commentsImgs = [];
    const dealComments = () => dealItem_awaiter(void 0, void 0, void 0, function* () {
        var _a;
        try {
            if (getCommentSwitch(dom)) {
                let p = dom.closest('.ContentItem') || dom.closest('.Post-content');
                let openComment = p.querySelector(".Comments-container");
                let itemId = type + url.split('/').pop();
                let tip = '';
                if (openComment && openComment.querySelector('.css-189h5o3')) {
                    let t = '**' + openComment.querySelector('.css-189h5o3').textContent + '**'; //评论区已关闭|暂无评论
                    if (button == 'text')
                        commentText = t;
                    else
                        zip.file("comments.md", t);
                }
                else {
                    if (openComment && openComment.querySelector('.css-1tdhe7b'))
                        tip = '**评论内容由作者筛选后展示**\n\n';
                    // @ts-ignore 
                    let commentsData = (_a = window.ArticleComments[itemId]) === null || _a === void 0 ? void 0 : _a.comments;
                    if (!commentsData) {
                        if (!openComment)
                            return; //既没评论数据也没展开评论区
                        let s = confirm('您还未暂存任何评论，却展开了评论区，是否立即【暂存当前页评论并保存】？【否】则什么也不做\n（若不想存评，请收起评论区或取消勾选框）');
                        if (!s)
                            return 'return';
                        else {
                            openComment.querySelector('.save').click();
                            setTimeout(() => {
                                p.querySelector(`.zhihubackup-wrap .to-${button}`).click();
                            }, 1900);
                            return 'return';
                        }
                    }
                    let num_text = tip + '共 ' + comment_num + ' 条评论，已存 ' + commentsData.size + ' 条' + '\n\n';
                    if (button == 'text' || button == 'copy') {
                        // 准备添加第三种图片归宿，完全舍弃
                        [commentText, commentsImgs] = renderAllComments(commentsData, false);
                        commentText = num_text + commentText;
                    }
                    else if (button == 'zip') {
                        [commentText, commentsImgs] = renderAllComments(commentsData, true);
                        commentText = num_text + commentText;
                        if (commentsImgs.length) {
                            const assetsFolder = zip.folder('assets');
                            for (let i = 0; i < commentsImgs.length; i++) {
                                const response = yield fetch(commentsImgs[i]);
                                const arrayBuffer = yield response.arrayBuffer();
                                const fileName = commentsImgs[i].replace(/\?.*?$/, "").split("/").pop();
                                assetsFolder.file(fileName, arrayBuffer);
                            }
                        }
                    }
                }
            }
        }
        catch (e) {
            console.warn("评论:", e);
            alert('主要工作已完成，但是评论保存出错了');
        }
    });
    if (button == 'copy') {
        try {
            // @ts-ignore
            var copy_save_fm = GM_getValue("copy_save_fm"), 
            // @ts-ignore
            copy_save_cm = GM_getValue("copy_save_cm");
        }
        catch (e) {
            console.warn(e);
        }
        md = TOC ? TOC.concat(parser(lex)) : parser(lex);
        if (type == "pin" && dom.closest('.PinItem').querySelector(".PinItem-content-originpin")) {
            md = md.concat(originPinMD); //解决保存转发的想法异常
        }
        if (copy_save_fm) {
            md = [getFrontmatter()].concat(md); //放到剪贴板，string[]
        }
        if (copy_save_cm) {
            if ((yield dealComments()) == 'return')
                return;
            commentText ? commentText = '\n\n---\n\n## 评论\n\n' + commentText : 0;
            md.push(commentText);
        }
        if (type != 'pin' && !copy_save_fm)
            return { textString: [title].concat(md).join('\n\n') }; //复制内容增加标题
        else
            return { textString: md.join('\n\n') };
    }
    // ============================以下只有 text 或 zip 2种情况===========================
    if (button == 'text') {
        if ((yield dealComments()) == 'return')
            return;
        commentText ? commentText = '\n\n---\n\n## 评论\n\n' + commentText : 0;
        let md2 = [];
        if (type == "pin" && dom.closest('.PinItem').querySelector(".PinItem-content-originpin")) {
            md2 = originPinMD;
        }
        return {
            textString: getFrontmatter() + (TOC ? TOC.join("\n\n") + '\n\n' : '') + parser(lex).join("\n\n") + md2.join("\n\n") + commentText,
            title: title + "_" + author.name + "_" + time.modified.slice(0, 10) + remark
        };
    }
    if (button == 'zip') {
        //对lex的再处理，保存资产，并将lex中链接改为本地
        var { zip, localLex } = yield savelex(lex);
        if ((yield dealComments()) == 'return')
            return;
        if (type == "pin" && dom.closest('.PinItem').querySelector(".PinItem-content-originpin")) {
            md = parser(localLex).concat(md);
        }
        else
            md = parser(localLex);
        try {
            // @ts-ignore
            var zip_merge_cm = GM_getValue("zip_merge_cm");
        }
        catch (e) {
            console.warn(e);
        }
        if (zip_merge_cm) {
            commentText ? commentText = '\n\n---\n\n## 评论\n\n' + commentText : 0;
            md.push(commentText);
        }
        else
            zip.file("comments.md", commentText);
        zip.file("index.md", getFrontmatter() + (TOC ? TOC.join("\n\n") + '\n\n' : '') + md.join("\n\n"));
    }
    const zopQuestion = (() => {
        try {
            let el = document.querySelector("[data-zop-question]");
            if (el)
                return JSON.parse(el.getAttribute("data-zop-question"));
            return null;
        }
        catch (e) {
            console.error('保存data-zop-question出错', e);
        }
    })();
    const { zop, zaExtra } = (() => {
        let el = dom.closest('.ContentItem'); //想法类型、文章页没有
        if (!el)
            el = dom.closest('.PinItem');
        if (!el)
            el = dom.closest('.Post-content');
        try {
            if (el)
                return {
                    zop: JSON.parse(el.getAttribute("data-zop")),
                    zaExtra: JSON.parse(el.getAttribute("data-za-extra-module"))
                };
        }
        catch (e) {
            console.error('保存zop, zaExtra出错', e);
        }
        return null;
    })();
    zip.file("info.json", JSON.stringify({
        title, url, author, time, upvote_num, comment_num,
        zop,
        "location": Location,
        "zop-question": zopQuestion,
        "zop-extra-module": zaExtra,
    }, null, 4));
    return {
        zip,
        title: title + "_" + author.name + "_" + time.modified.slice(0, 10) + remark
    };
}));

;// CONCATENATED MODULE: ./node_modules/.pnpm/modern-screenshot@4.4.37/node_modules/modern-screenshot/dist/index.mjs
var _e = Object.defineProperty, Ue = Object.defineProperties;
var Pe = Object.getOwnPropertyDescriptors;
var B = Object.getOwnPropertySymbols;
var Z = Object.prototype.hasOwnProperty, ee = Object.prototype.propertyIsEnumerable;
var te = Math.pow, Q = (e, t, r) => t in e ? _e(e, t, { enumerable: !0, configurable: !0, writable: !0, value: r }) : e[t] = r, T = (e, t) => {
  for (var r in t || (t = {}))
    Z.call(t, r) && Q(e, r, t[r]);
  if (B)
    for (var r of B(t))
      ee.call(t, r) && Q(e, r, t[r]);
  return e;
}, R = (e, t) => Ue(e, Pe(t));
var re = (e, t) => {
  var r = {};
  for (var n in e)
    Z.call(e, n) && t.indexOf(n) < 0 && (r[n] = e[n]);
  if (e != null && B)
    for (var n of B(e))
      t.indexOf(n) < 0 && ee.call(e, n) && (r[n] = e[n]);
  return r;
};
var S = (e, t, r) => new Promise((n, a) => {
  var s = (l) => {
    try {
      i(r.next(l));
    } catch (u) {
      a(u);
    }
  }, o = (l) => {
    try {
      i(r.throw(l));
    } catch (u) {
      a(u);
    }
  }, i = (l) => l.done ? n(l.value) : Promise.resolve(l.value).then(s, o);
  i((r = r.apply(e, t)).next());
});
function ue(e, t) {
  return e[13] = 1, e[14] = t >> 8, e[15] = t & 255, e[16] = t >> 8, e[17] = t & 255, e;
}
const fe = "p".charCodeAt(0), de = "H".charCodeAt(0), ge = "Y".charCodeAt(0), me = "s".charCodeAt(0);
let j;
function $e() {
  const e = new Int32Array(256);
  for (let t = 0; t < 256; t++) {
    let r = t;
    for (let n = 0; n < 8; n++)
      r = r & 1 ? 3988292384 ^ r >>> 1 : r >>> 1;
    e[t] = r;
  }
  return e;
}
function Be(e) {
  let t = -1;
  j || (j = $e());
  for (let r = 0; r < e.length; r++)
    t = j[(t ^ e[r]) & 255] ^ t >>> 8;
  return t ^ -1;
}
function Le(e) {
  const t = e.length - 1;
  for (let r = t; r >= 4; r--)
    if (e[r - 4] === 9 && e[r - 3] === fe && e[r - 2] === de && e[r - 1] === ge && e[r] === me)
      return r - 3;
  return 0;
}
function he(e, t, r = !1) {
  const n = new Uint8Array(13);
  t *= 39.3701, n[0] = fe, n[1] = de, n[2] = ge, n[3] = me, n[4] = t >>> 24, n[5] = t >>> 16, n[6] = t >>> 8, n[7] = t & 255, n[8] = n[4], n[9] = n[5], n[10] = n[6], n[11] = n[7], n[12] = 1;
  const a = Be(n), s = new Uint8Array(4);
  if (s[0] = a >>> 24, s[1] = a >>> 16, s[2] = a >>> 8, s[3] = a & 255, r) {
    const o = Le(e);
    return e.set(n, o), e.set(s, o + 13), e;
  } else {
    const o = new Uint8Array(4);
    o[0] = 0, o[1] = 0, o[2] = 0, o[3] = 9;
    const i = new Uint8Array(54);
    return i.set(e, 0), i.set(o, 33), i.set(n, 37), i.set(s, 50), i;
  }
}
const Me = "AAlwSFlz", Oe = "AAAJcEhZ", We = "AAAACXBI";
function qe(e) {
  let t = e.indexOf(Me);
  return t === -1 && (t = e.indexOf(Oe)), t === -1 && (t = e.indexOf(We)), t;
}
const H = "[modern-screenshot]", x = typeof window != "undefined", je = x && "Worker" in window, we = x && "atob" in window, Ve = x && "btoa" in window;
var le;
const z = x ? (le = window.navigator) == null ? void 0 : le.userAgent : "", pe = z.includes("Chrome"), L = z.includes("AppleWebKit") && !pe, X = z.includes("Firefox"), He = (e) => e && "__CONTEXT__" in e, ze = (e) => e.constructor.name === "CSSFontFaceRule", Xe = (e) => e.constructor.name === "CSSImportRule", A = (e) => e.nodeType === 1, U = (e) => typeof e.className == "object", ye = (e) => e.tagName === "image", Ge = (e) => e.tagName === "use", G = (e) => A(e) && typeof e.style != "undefined" && !U(e), Ye = (e) => e.nodeType === 8, Je = (e) => e.nodeType === 3, D = (e) => e.tagName === "IMG", M = (e) => e.tagName === "VIDEO", Ke = (e) => e.tagName === "CANVAS", ne = (e) => e.tagName === "TEXTAREA", Qe = (e) => e.tagName === "INPUT", Ze = (e) => e.tagName === "STYLE", et = (e) => e.tagName === "SCRIPT", tt = (e) => e.tagName === "SELECT", rt = (e) => e.tagName === "SLOT", nt = (e) => e.tagName === "IFRAME", E = (...e) => console.warn(H, ...e), ot = (e) => console.time(`${H} ${e}`), at = (e) => console.timeEnd(`${H} ${e}`), st = (e) => {
  var r;
  const t = (r = e == null ? void 0 : e.createElement) == null ? void 0 : r.call(e, "canvas");
  return t && (t.height = t.width = 1), t && "toDataURL" in t && Boolean(t.toDataURL("image/webp").includes("image/webp"));
}, V = (e) => e.startsWith("data:");
function be(e, t) {
  if (e.match(/^[a-z]+:\/\//i))
    return e;
  if (x && e.match(/^\/\//))
    return window.location.protocol + e;
  if (e.match(/^[a-z]+:/i) || !x)
    return e;
  const r = O().implementation.createHTMLDocument(), n = r.createElement("base"), a = r.createElement("a");
  return r.head.appendChild(n), r.body.appendChild(a), t && (n.href = t), a.href = e, a.href;
}
function O(e) {
  var t;
  return (t = e && A(e) ? e == null ? void 0 : e.ownerDocument : e) != null ? t : window.document;
}
const W = "http://www.w3.org/2000/svg";
function Se(e, t, r) {
  const n = O(r).createElementNS(W, "svg");
  return n.setAttributeNS(null, "width", e.toString()), n.setAttributeNS(null, "height", t.toString()), n.setAttributeNS(null, "viewBox", `0 0 ${e} ${t}`), n;
}
function Ee(e, t) {
  let r = new XMLSerializer().serializeToString(e);
  return t && (r = r.replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\uD800-\uDFFF\uFFFE\uFFFF]/ug, "")), `data:image/svg+xml;charset=utf-8,${encodeURIComponent(r)}`;
}
function it(e, t = "image/png", r = 1) {
  return S(this, null, function* () {
    try {
      return yield new Promise((n, a) => {
        e.toBlob((s) => {
          s ? n(s) : a(new Error("Blob is null"));
        }, t, r);
      });
    } catch (n) {
      if (we)
        return E("Failed canvas to blob", { type: t, quality: r }, n), ct(e.toDataURL(t, r));
      throw n;
    }
  });
}
function ct(e) {
  var i, l;
  const [t, r] = e.split(","), n = (l = (i = t.match(/data:(.+);/)) == null ? void 0 : i[1]) != null ? l : void 0, a = window.atob(r), s = a.length, o = new Uint8Array(s);
  for (let u = 0; u < s; u += 1)
    o[u] = a.charCodeAt(u);
  return new Blob([o], { type: n });
}
function Ce(e, t) {
  return new Promise((r, n) => {
    const a = new FileReader();
    a.onload = () => r(a.result), a.onerror = () => n(a.error), a.onabort = () => n(new Error(`Failed read blob to ${t}`)), t === "dataUrl" ? a.readAsDataURL(e) : t === "arrayBuffer" && a.readAsArrayBuffer(e);
  });
}
const lt = (e) => Ce(e, "dataUrl"), ut = (e) => Ce(e, "arrayBuffer");
function k(e, t) {
  const r = O(t).createElement("img");
  return r.decoding = "sync", r.loading = "eager", r.src = e, r;
}
function F(e, t) {
  return new Promise((r) => {
    const { timeout: n, ownerDocument: a, onError: s } = t != null ? t : {}, o = typeof e == "string" ? k(e, O(a)) : e;
    let i = null, l = null;
    function u() {
      r(o), i && clearTimeout(i), l == null || l();
    }
    if (n && (i = setTimeout(u, n)), M(o)) {
      const c = o.currentSrc || o.src;
      if (!c)
        return o.poster ? F(o.poster, t).then(r) : u();
      if (o.readyState >= 2)
        return u();
      const f = u, d = (g) => {
        E(
          "Failed video load",
          c,
          g
        ), s == null || s(g), u();
      };
      l = () => {
        o.removeEventListener("loadeddata", f), o.removeEventListener("error", d);
      }, o.addEventListener("loadeddata", f, { once: !0 }), o.addEventListener("error", d, { once: !0 });
    } else {
      const c = ye(o) ? o.href.baseVal : o.currentSrc || o.src;
      if (!c)
        return u();
      const f = () => S(this, null, function* () {
        if (D(o) && "decode" in o)
          try {
            yield o.decode();
          } catch (g) {
            E(
              "Failed to decode image, trying to render anyway",
              o.dataset.originalSrc || c,
              g
            );
          }
        u();
      }), d = (g) => {
        E(
          "Failed image load",
          o.dataset.originalSrc || c,
          g
        ), u();
      };
      if (D(o) && o.complete)
        return f();
      l = () => {
        o.removeEventListener("load", f), o.removeEventListener("error", d);
      }, o.addEventListener("load", f, { once: !0 }), o.addEventListener("error", d, { once: !0 });
    }
  });
}
function ft(e, t) {
  return S(this, null, function* () {
    G(e) && (D(e) || M(e) ? yield F(e, { timeout: t }) : yield Promise.all(
      ["img", "video"].flatMap((r) => Array.from(e.querySelectorAll(r)).map((n) => F(n, { timeout: t })))
    ));
  });
}
const ve = function() {
  let t = 0;
  const r = () => (
    // eslint-disable-next-line no-bitwise
    `0000${(Math.random() * te(36, 4) << 0).toString(36)}`.slice(-4)
  );
  return () => (t += 1, `u${r()}${t}`);
}();
function Te(e) {
  return e == null ? void 0 : e.split(",").map((t) => t.trim().replace(/"|'/g, "").toLowerCase()).filter(Boolean);
}
function dt(e) {
  return {
    time: (t) => e && ot(t),
    timeEnd: (t) => e && at(t),
    warn: (...t) => e && E(...t)
  };
}
function gt(e) {
  return {
    cache: e ? "no-cache" : "force-cache"
  };
}
function N(e, t) {
  return S(this, null, function* () {
    return He(e) ? e : mt(e, R(T({}, t), { autoDestruct: !0 }));
  });
}
function mt(e, t) {
  return S(this, null, function* () {
    var g, h, w, y, m;
    const { scale: r = 1, workerUrl: n, workerNumber: a = 1 } = t || {}, s = Boolean(t == null ? void 0 : t.debug), o = (g = t == null ? void 0 : t.features) != null ? g : !0, i = (h = e.ownerDocument) != null ? h : x ? window.document : void 0, l = (y = (w = e.ownerDocument) == null ? void 0 : w.defaultView) != null ? y : x ? window : void 0, u = /* @__PURE__ */ new Map(), c = R(T({
      // Options
      width: 0,
      height: 0,
      quality: 1,
      type: "image/png",
      scale: r,
      backgroundColor: null,
      style: null,
      filter: null,
      maximumCanvasSize: 0,
      timeout: 3e4,
      progress: null,
      debug: s,
      fetch: T({
        requestInit: gt((m = t == null ? void 0 : t.fetch) == null ? void 0 : m.bypassingCache),
        placeholderImage: "data:image/png;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7",
        bypassingCache: !1
      }, t == null ? void 0 : t.fetch),
      fetchFn: null,
      font: {},
      drawImageInterval: 100,
      workerUrl: null,
      workerNumber: a,
      onCloneNode: null,
      onEmbedNode: null,
      onCreateForeignObjectSvg: null,
      includeStyleProperties: null,
      autoDestruct: !1
    }, t), {
      // InternalContext
      __CONTEXT__: !0,
      log: dt(s),
      node: e,
      ownerDocument: i,
      ownerWindow: l,
      dpi: r === 1 ? null : 96 * r,
      svgStyleElement: Ae(i),
      svgDefsElement: i == null ? void 0 : i.createElementNS(W, "defs"),
      svgStyles: /* @__PURE__ */ new Map(),
      defaultComputedStyles: /* @__PURE__ */ new Map(),
      workers: [
        ...new Array(
          je && n && a ? a : 0
        )
      ].map(() => {
        try {
          const b = new Worker(n);
          return b.onmessage = (p) => S(this, null, function* () {
            var I, J, $, K;
            const { url: C, result: v } = p.data;
            v ? (J = (I = u.get(C)) == null ? void 0 : I.resolve) == null || J.call(I, v) : (K = ($ = u.get(C)) == null ? void 0 : $.reject) == null || K.call($, new Error(`Error receiving message from worker: ${C}`));
          }), b.onmessageerror = (p) => {
            var v, I;
            const { url: C } = p.data;
            (I = (v = u.get(C)) == null ? void 0 : v.reject) == null || I.call(v, new Error(`Error receiving message from worker: ${C}`));
          }, b;
        } catch (b) {
          return E("Failed to new Worker", b), null;
        }
      }).filter(Boolean),
      fontFamilies: /* @__PURE__ */ new Set(),
      fontCssTexts: /* @__PURE__ */ new Map(),
      acceptOfImage: `${[
        st(i) && "image/webp",
        "image/svg+xml",
        "image/*",
        "*/*"
      ].filter(Boolean).join(",")};q=0.8`,
      requests: u,
      drawImageCount: 0,
      tasks: [],
      features: o,
      isEnable: (b) => {
        var p;
        return typeof o == "boolean" ? o : (p = o[b]) != null ? p : !0;
      }
    });
    c.log.time("wait until load"), yield ft(e, c.timeout), c.log.timeEnd("wait until load");
    const { width: f, height: d } = ht(e, c);
    return c.width = f, c.height = d, c;
  });
}
function Ae(e) {
  if (!e)
    return;
  const t = e.createElement("style"), r = t.ownerDocument.createTextNode(`
.______background-clip--text {
  background-clip: text;
  -webkit-background-clip: text;
}
`);
  return t.appendChild(r), t;
}
function ht(e, t) {
  let { width: r, height: n } = t;
  if (A(e) && (!r || !n)) {
    const a = e.getBoundingClientRect();
    r = r || a.width || Number(e.getAttribute("width")) || 0, n = n || a.height || Number(e.getAttribute("height")) || 0;
  }
  return { width: r, height: n };
}
function wt(e, t) {
  return S(this, null, function* () {
    const {
      log: r,
      timeout: n,
      drawImageCount: a,
      drawImageInterval: s
    } = t;
    r.time("image to canvas");
    const o = yield F(e, { timeout: n }), { canvas: i, context2d: l } = pt(e.ownerDocument, t), u = () => {
      try {
        l == null || l.drawImage(o, 0, 0, i.width, i.height);
      } catch (c) {
        E("Failed to drawImage", c);
      }
    };
    if (u(), t.isEnable("fixSvgXmlDecode"))
      for (let c = 0; c < a; c++)
        yield new Promise((f) => {
          setTimeout(() => {
            u(), f();
          }, c + s);
        });
    return t.drawImageCount = 0, r.timeEnd("image to canvas"), i;
  });
}
function pt(e, t) {
  const { width: r, height: n, scale: a, backgroundColor: s, maximumCanvasSize: o } = t, i = e.createElement("canvas");
  i.width = Math.floor(r * a), i.height = Math.floor(n * a), i.style.width = `${r}px`, i.style.height = `${n}px`, o && (i.width > o || i.height > o) && (i.width > o && i.height > o ? i.width > i.height ? (i.height *= o / i.width, i.width = o) : (i.width *= o / i.height, i.height = o) : i.width > o ? (i.height *= o / i.width, i.width = o) : (i.width *= o / i.height, i.height = o));
  const l = i.getContext("2d");
  return l && s && (l.fillStyle = s, l.fillRect(0, 0, i.width, i.height)), { canvas: i, context2d: l };
}
const yt = [
  "width",
  "height",
  "-webkit-text-fill-color"
], bt = [
  "stroke",
  "fill"
];
function Ne(e, t, r) {
  var y;
  const { defaultComputedStyles: n, ownerDocument: a } = r, s = e.nodeName.toLowerCase(), o = U(e) && s !== "svg", i = o ? bt.map((m) => [m, e.getAttribute(m)]).filter(([, m]) => m !== null) : [], l = [
    o && "svg",
    s,
    i.map((m, b) => `${m}=${b}`).join(","),
    t
  ].filter(Boolean).join(":");
  if (n.has(l))
    return n.get(l);
  let u = r.sandbox;
  if (!u)
    try {
      a && (u = a.createElement("iframe"), u.id = `__SANDBOX__-${ve()}`, u.width = "0", u.height = "0", u.style.visibility = "hidden", u.style.position = "fixed", a.body.appendChild(u), (y = u.contentWindow) == null || y.document.write('<!DOCTYPE html><meta charset="UTF-8"><title></title><body>'), r.sandbox = u);
    } catch (m) {
      E("Failed to create iframe sandbox", m);
    }
  if (!u)
    return /* @__PURE__ */ new Map();
  const c = u.contentWindow;
  if (!c)
    return /* @__PURE__ */ new Map();
  const f = c.document;
  let d, g;
  o ? (d = f.createElementNS(W, "svg"), g = d.ownerDocument.createElementNS(d.namespaceURI, s), i.forEach(([m, b]) => {
    g.setAttributeNS(null, m, b);
  }), d.appendChild(g)) : d = g = f.createElement(s), g.textContent = " ", f.body.appendChild(d);
  const h = c.getComputedStyle(g, t), w = /* @__PURE__ */ new Map();
  for (let m = h.length, b = 0; b < m; b++) {
    const p = h.item(b);
    yt.includes(p) || w.set(p, h.getPropertyValue(p));
  }
  return f.body.removeChild(d), n.set(l, w), w;
}
function Ie(e, t, r) {
  var i;
  const n = /* @__PURE__ */ new Map(), a = [], s = /* @__PURE__ */ new Map();
  if (r)
    for (const l of r)
      o(l);
  else
    for (let l = e.length, u = 0; u < l; u++) {
      const c = e.item(u);
      o(c);
    }
  for (let l = a.length, u = 0; u < l; u++)
    (i = s.get(a[u])) == null || i.forEach((c, f) => n.set(f, c));
  function o(l) {
    const u = e.getPropertyValue(l), c = e.getPropertyPriority(l), f = l.lastIndexOf("-"), d = f > -1 ? l.substring(0, f) : void 0;
    if (d) {
      let g = s.get(d);
      g || (g = /* @__PURE__ */ new Map(), s.set(d, g)), g.set(l, [u, c]);
    }
    t.get(l) === u && !c || (d ? a.push(d) : n.set(l, [u, c]));
  }
  return n;
}
const St = [
  ":before",
  ":after"
  // ':placeholder', TODO
], Et = [
  ":-webkit-scrollbar",
  ":-webkit-scrollbar-button",
  // ':-webkit-scrollbar:horizontal', TODO
  ":-webkit-scrollbar-thumb",
  ":-webkit-scrollbar-track",
  ":-webkit-scrollbar-track-piece",
  // ':-webkit-scrollbar:vertical', TODO
  ":-webkit-scrollbar-corner",
  ":-webkit-resizer"
];
function Ct(e, t, r, n) {
  const { ownerWindow: a, svgStyleElement: s, svgStyles: o, currentNodeStyle: i } = n;
  if (!s || !a)
    return;
  function l(u) {
    var b;
    const c = a.getComputedStyle(e, u);
    let f = c.getPropertyValue("content");
    if (!f || f === "none")
      return;
    f = f.replace(/(')|(")|(counter\(.+\))/g, "");
    const d = [ve()], g = Ne(e, u, n);
    i == null || i.forEach((p, C) => {
      g.delete(C);
    });
    const h = Ie(c, g, n.includeStyleProperties);
    h.delete("content"), h.delete("-webkit-locale"), ((b = h.get("background-clip")) == null ? void 0 : b[0]) === "text" && t.classList.add("______background-clip--text");
    const w = [
      `content: '${f}';`
    ];
    if (h.forEach(([p, C], v) => {
      w.push(`${v}: ${p}${C ? " !important" : ""};`);
    }), w.length === 1)
      return;
    try {
      t.className = [t.className, ...d].join(" ");
    } catch (p) {
      return;
    }
    const y = w.join(`
  `);
    let m = o.get(y);
    m || (m = [], o.set(y, m)), m.push(`.${d[0]}:${u}`);
  }
  St.forEach(l), r && Et.forEach(l);
}
function vt(e, t) {
  ne(e) && (t.innerHTML = e.value), (ne(e) || Qe(e) || tt(e)) && t.setAttribute("value", e.value);
}
function Tt(e, t, r, n) {
  var f, d, g, h;
  const { ownerWindow: a, includeStyleProperties: s, currentParentNodeStyle: o } = n, i = t.style, l = a.getComputedStyle(e), u = Ne(e, null, n);
  o == null || o.forEach((w, y) => {
    u.delete(y);
  });
  const c = Ie(l, u, s);
  return c.delete("transition-property"), c.delete("all"), c.delete("d"), c.delete("content"), r && (c.delete("margin-top"), c.delete("margin-right"), c.delete("margin-bottom"), c.delete("margin-left"), c.delete("margin-block-start"), c.delete("margin-block-end"), c.delete("margin-inline-start"), c.delete("margin-inline-end"), c.set("box-sizing", ["border-box", ""])), ((f = c.get("background-clip")) == null ? void 0 : f[0]) === "text" && t.classList.add("______background-clip--text"), pe && (c.has("font-kerning") || c.set("font-kerning", ["normal", ""]), (((d = c.get("overflow-x")) == null ? void 0 : d[0]) === "hidden" || ((g = c.get("overflow-y")) == null ? void 0 : g[0]) === "hidden") && ((h = c.get("text-overflow")) == null ? void 0 : h[0]) === "ellipsis" && e.scrollWidth === e.clientWidth && c.set("text-overflow", ["clip", ""])), c.forEach(([w, y], m) => {
    i.setProperty(m, w, y);
  }), c;
}
function At(e, t) {
  var r;
  try {
    if ((r = e == null ? void 0 : e.contentDocument) != null && r.body)
      return q(e.contentDocument.body, t);
  } catch (n) {
    E("Failed to clone iframe", n);
  }
  return e.cloneNode(!1);
}
function xe(e) {
  if (e.ownerDocument)
    try {
      const a = e.toDataURL();
      if (a !== "data:,")
        return k(a, e.ownerDocument);
    } catch (a) {
    }
  const t = e.cloneNode(!1), r = e.getContext("2d"), n = t.getContext("2d");
  try {
    return r && n && n.putImageData(
      r.getImageData(0, 0, e.width, e.height),
      0,
      0
    ), t;
  } catch (a) {
    E("Failed to clone canvas", a);
  }
  return t;
}
function Nt(e) {
  return S(this, null, function* () {
    if (e.ownerDocument && !e.currentSrc && e.poster)
      return k(e.poster, e.ownerDocument);
    const t = e.cloneNode(!1);
    t.crossOrigin = "anonymous", e.currentSrc && e.currentSrc !== e.src && (t.src = e.currentSrc);
    const r = t.ownerDocument;
    if (r) {
      let n = !0;
      if (yield F(t, {
        onError: () => n = !1
      }), !n)
        return e.poster ? k(e.poster, e.ownerDocument) : t;
      t.currentTime = e.currentTime, yield new Promise((s) => {
        t.addEventListener("seeked", s, { once: !0 });
      });
      const a = r.createElement("canvas");
      a.width = e.offsetWidth, a.height = e.offsetHeight;
      try {
        const s = a.getContext("2d");
        s && s.drawImage(t, 0, 0, a.width, a.height);
      } catch (s) {
        return E("Failed to clone video", s), e.poster ? k(e.poster, e.ownerDocument) : t;
      }
      return xe(a);
    }
    return t;
  });
}
function It(e) {
  const t = e.cloneNode(!1);
  return e.currentSrc && e.currentSrc !== e.src && (t.src = e.currentSrc, t.srcset = ""), t.loading === "lazy" && (t.loading = "eager"), t;
}
function xt(e, t) {
  return Ke(e) ? xe(e) : nt(e) ? At(e, t) : D(e) ? It(e) : M(e) ? Nt(e) : e.cloneNode(!1);
}
const oe = /* @__PURE__ */ new Set([
  "symbol"
  // test/fixtures/svg.symbol.html
]);
function ae(e, t, r) {
  return S(this, null, function* () {
    A(t) && (Ze(t) || et(t)) || r.filter && !r.filter(t) || (oe.has(e.nodeName) || oe.has(t.nodeName) ? r.currentParentNodeStyle = void 0 : r.currentParentNodeStyle = r.currentNodeStyle, e.appendChild(yield q(t, r)));
  });
}
function se(e, t, r) {
  return S(this, null, function* () {
    var a, s;
    const n = (s = A(e) ? (a = e.shadowRoot) == null ? void 0 : a.firstChild : void 0) != null ? s : e.firstChild;
    for (let o = n; o; o = o.nextSibling)
      if (!Ye(o))
        if (A(o) && rt(o) && typeof o.assignedNodes == "function") {
          const i = o.assignedNodes();
          for (let l = 0; l < i.length; l++)
            yield ae(t, i[l], r);
        } else
          yield ae(t, o, r);
  });
}
function kt(e, t) {
  const { backgroundColor: r, width: n, height: a, style: s } = t, o = e.style;
  if (r && o.setProperty("background-color", r, "important"), n && o.setProperty("width", `${n}px`, "important"), a && o.setProperty("height", `${a}px`, "important"), s)
    for (const i in s)
      o[i] = s[i];
}
const Rt = /^[\w-:]+$/;
function q(e, t, r = !1) {
  return S(this, null, function* () {
    var i, l, u, c;
    const { ownerDocument: n, ownerWindow: a, fontFamilies: s } = t;
    if (n && Je(e))
      return n.createTextNode(e.data);
    if (n && a && A(e) && (G(e) || U(e))) {
      const f = yield xt(e, t);
      if (t.isEnable("removeAbnormalAttributes")) {
        const h = f.getAttributeNames();
        for (let w = h.length, y = 0; y < w; y++) {
          const m = h[y];
          Rt.test(m) || f.removeAttribute(m);
        }
      }
      const d = t.currentNodeStyle = Tt(e, f, r, t);
      r && kt(f, t);
      let g = !1;
      if (t.isEnable("copyScrollbar")) {
        const h = [
          (i = d.get("overflow-x")) == null ? void 0 : i[0],
          (l = d.get("overflow-y")) == null ? void 0 : l[1]
        ];
        g = h.includes("scroll") || (h.includes("auto") || h.includes("overlay")) && (e.scrollHeight > e.clientHeight || e.scrollWidth > e.clientWidth);
      }
      return Ct(e, f, g, t), vt(e, f), (c = Te((u = d.get("font-family")) == null ? void 0 : u[0])) == null || c.forEach((h) => s.add(h)), M(e) || (yield se(e, f, t)), f;
    }
    const o = e.cloneNode(!1);
    return yield se(e, o, t), o;
  });
}
function Dt(e) {
  if (e.ownerDocument = void 0, e.ownerWindow = void 0, e.svgStyleElement = void 0, e.svgDefsElement = void 0, e.svgStyles.clear(), e.defaultComputedStyles.clear(), e.sandbox) {
    try {
      e.sandbox.remove();
    } catch (t) {
    }
    e.sandbox = void 0;
  }
  e.workers = [], e.fontFamilies.clear(), e.fontCssTexts.clear(), e.requests.clear(), e.tasks = [];
}
function Ft(e) {
  const i = e, { url: t, timeout: r, responseType: n } = i, a = re(i, ["url", "timeout", "responseType"]), s = new AbortController(), o = r ? setTimeout(() => s.abort(), r) : void 0;
  return fetch(t, T({ signal: s.signal }, a)).then((l) => {
    if (!l.ok)
      throw new Error("Failed fetch, not 2xx response", { cause: l });
    switch (n) {
      case "dataUrl":
        return l.blob().then(lt);
      case "text":
      default:
        return l.text();
    }
  }).finally(() => clearTimeout(o));
}
function _(e, t) {
  const { url: r, requestType: n = "text", responseType: a = "text", imageDom: s } = t;
  let o = r;
  const {
    timeout: i,
    acceptOfImage: l,
    requests: u,
    fetchFn: c,
    fetch: {
      requestInit: f,
      bypassingCache: d,
      placeholderImage: g
    },
    workers: h
  } = e;
  n === "image" && (L || X) && e.drawImageCount++;
  let w = u.get(r);
  if (!w) {
    d && d instanceof RegExp && d.test(o) && (o += (/\?/.test(o) ? "&" : "?") + new Date().getTime());
    const y = T({
      url: o,
      timeout: i,
      responseType: a,
      headers: n === "image" ? { accept: l } : void 0
    }, f);
    w = {
      type: n,
      resolve: void 0,
      reject: void 0,
      response: null
    }, w.response = (() => S(this, null, function* () {
      if (c && n === "image") {
        const m = yield c(r);
        if (m)
          return m;
      }
      return !L && r.startsWith("http") && h.length ? new Promise((m, b) => {
        h[u.size & h.length - 1].postMessage(T({ rawUrl: r }, y)), w.resolve = m, w.reject = b;
      }) : Ft(y);
    }))().catch((m) => {
      if (u.delete(r), n === "image" && g)
        return E("Failed to fetch image base64, trying to use placeholder image", o), typeof g == "string" ? g : g(s);
      throw m;
    }), u.set(r, w);
  }
  return w.response;
}
function ke(e, t, r, n) {
  return S(this, null, function* () {
    if (!Re(e))
      return e;
    for (const [a, s] of _t(e, t))
      try {
        const o = yield _(
          r,
          {
            url: s,
            requestType: n ? "image" : "text",
            responseType: "dataUrl"
          }
        );
        e = e.replace(Ut(a), `$1${o}$3`);
      } catch (o) {
        E("Failed to fetch css data url", a, o);
      }
    return e;
  });
}
function Re(e) {
  return /url\((['"]?)([^'"]+?)\1\)/.test(e);
}
const De = /url\((['"]?)([^'"]+?)\1\)/g;
function _t(e, t) {
  const r = [];
  return e.replace(De, (n, a, s) => (r.push([s, be(s, t)]), n)), r.filter(([n]) => !V(n));
}
function Ut(e) {
  const t = e.replace(/([.*+?^${}()|\[\]\/\\])/g, "\\$1");
  return new RegExp(`(url\\(['"]?)(${t})(['"]?\\))`, "g");
}
function Pt(e, t) {
  return S(this, null, function* () {
    const {
      ownerDocument: r,
      svgStyleElement: n,
      fontFamilies: a,
      fontCssTexts: s,
      tasks: o,
      font: i
    } = t;
    if (!(!r || !n || !a.size))
      if (i && i.cssText) {
        const l = ce(i.cssText, t);
        n.appendChild(r.createTextNode(`${l}
`));
      } else {
        const l = Array.from(r.styleSheets).filter((c) => {
          try {
            return "cssRules" in c && Boolean(c.cssRules.length);
          } catch (f) {
            return E(`Error while reading CSS rules from ${c.href}`, f), !1;
          }
        });
        yield Promise.all(
          l.flatMap((c) => Array.from(c.cssRules).map((f, d) => S(this, null, function* () {
            if (Xe(f)) {
              let g = d + 1;
              const h = f.href;
              let w = "";
              try {
                w = yield _(t, {
                  url: h,
                  requestType: "text",
                  responseType: "text"
                });
              } catch (m) {
                E(`Error fetch remote css import from ${h}`, m);
              }
              const y = w.replace(
                De,
                (m, b, p) => m.replace(p, be(p, h))
              );
              for (const m of Bt(y))
                try {
                  c.insertRule(
                    m,
                    m.startsWith("@import") ? g += 1 : c.cssRules.length
                  );
                } catch (b) {
                  E("Error inserting rule from remote css import", { rule: m, error: b });
                }
            }
          })))
        ), l.flatMap((c) => Array.from(c.cssRules)).filter((c) => {
          var f;
          return ze(c) && Re(c.style.getPropertyValue("src")) && ((f = Te(c.style.getPropertyValue("font-family"))) == null ? void 0 : f.some((d) => a.has(d)));
        }).forEach((c) => {
          const f = c, d = s.get(f.cssText);
          d ? n.appendChild(r.createTextNode(`${d}
`)) : o.push(
            ke(
              f.cssText,
              f.parentStyleSheet ? f.parentStyleSheet.href : null,
              t
            ).then((g) => {
              g = ce(g, t), s.set(f.cssText, g), n.appendChild(r.createTextNode(`${g}
`));
            })
          );
        });
      }
  });
}
const $t = /(\/\*[\s\S]*?\*\/)/gi, ie = /((@.*?keyframes [\s\S]*?){([\s\S]*?}\s*?)})/gi;
function Bt(e) {
  if (e == null)
    return [];
  const t = [];
  let r = e.replace($t, "");
  for (; ; ) {
    const s = ie.exec(r);
    if (!s)
      break;
    t.push(s[0]);
  }
  r = r.replace(ie, "");
  const n = /@import[\s\S]*?url\([^)]*\)[\s\S]*?;/gi, a = new RegExp(
    "((\\s*?(?:\\/\\*[\\s\\S]*?\\*\\/)?\\s*?@media[\\s\\S]*?){([\\s\\S]*?)}\\s*?})|(([\\s\\S]*?){([\\s\\S]*?)})",
    "gi"
  );
  for (; ; ) {
    let s = n.exec(r);
    if (s)
      a.lastIndex = n.lastIndex;
    else if (s = a.exec(r), s)
      n.lastIndex = a.lastIndex;
    else
      break;
    t.push(s[0]);
  }
  return t;
}
const Lt = /url\([^)]+\)\s*format\((["']?)([^"']+)\1\)/g, Mt = /src:\s*(?:url\([^)]+\)\s*format\([^)]+\)[,;]\s*)+/g;
function ce(e, t) {
  const { font: r } = t, n = r ? r == null ? void 0 : r.preferredFormat : void 0;
  return n ? e.replace(Mt, (a) => {
    for (; ; ) {
      const [s, , o] = Lt.exec(a) || [];
      if (!o)
        return "";
      if (o === n)
        return `src: ${s};`;
    }
  }) : e;
}
function Ot(e, t) {
  if (D(e)) {
    const r = e.currentSrc || e.src;
    if (!V(r))
      return [
        _(t, {
          url: r,
          imageDom: e,
          requestType: "image",
          responseType: "dataUrl"
        }).then((n) => {
          n && (e.srcset = "", e.dataset.originalSrc = r, e.src = n || "");
        })
      ];
    (L || X) && t.drawImageCount++;
  } else if (U(e) && !V(e.href.baseVal)) {
    const r = e.href.baseVal;
    return [
      _(t, {
        url: r,
        imageDom: e,
        requestType: "image",
        responseType: "dataUrl"
      }).then((n) => {
        n && (e.dataset.originalSrc = r, e.href.baseVal = n || "");
      })
    ];
  }
  return [];
}
const Wt = [
  "background-image",
  "border-image-source",
  "-webkit-border-image",
  "-webkit-mask-image",
  "list-style-image"
];
function qt(e, t) {
  return Wt.map((r) => {
    const n = e.getPropertyValue(r);
    return !n || n === "none" ? null : ((L || X) && t.drawImageCount++, ke(n, null, t, !0).then((a) => {
      !a || n === a || e.setProperty(
        r,
        a,
        e.getPropertyPriority(r)
      );
    }));
  }).filter(Boolean);
}
function jt(e, t) {
  var i;
  const { ownerDocument: r, svgDefsElement: n } = t, a = (i = e.getAttribute("href")) != null ? i : e.getAttribute("xlink:href");
  if (!a)
    return [];
  const [s, o] = a.split("#");
  if (o) {
    const l = `#${o}`, u = r == null ? void 0 : r.querySelector(`svg ${l}`);
    if (s && e.setAttribute("href", l), n != null && n.querySelector(l))
      return [];
    if (u)
      return [
        q(u, t).then((c) => {
          n != null && n.querySelector(l) || n == null || n.appendChild(c);
        })
      ];
    if (s)
      return [
        _(t, {
          url: s,
          responseType: "text"
        }).then((c) => {
          n == null || n.insertAdjacentHTML("beforeend", c);
        })
      ];
  }
  return [];
}
function Fe(e, t) {
  const { tasks: r } = t;
  A(e) && ((D(e) || ye(e)) && r.push(...Ot(e, t)), Ge(e) && r.push(...jt(e, t))), G(e) && r.push(...qt(e.style, t)), e.childNodes.forEach((n) => {
    Fe(n, t);
  });
}
function Vt(e, t) {
  return S(this, null, function* () {
    const r = yield N(e, t);
    if (A(r.node) && U(r.node))
      return r.node;
    const {
      ownerDocument: n,
      log: a,
      tasks: s,
      svgStyleElement: o,
      svgDefsElement: i,
      svgStyles: l,
      font: u,
      progress: c,
      autoDestruct: f,
      onCloneNode: d,
      onEmbedNode: g,
      onCreateForeignObjectSvg: h
    } = r;
    a.time("clone node");
    const w = yield q(r.node, r, !0);
    if (o && n) {
      let C = "";
      l.forEach((v, I) => {
        C += `${v.join(`,
`)} {
  ${I}
}
`;
      }), o.appendChild(n.createTextNode(C));
    }
    a.timeEnd("clone node"), d == null || d(w), u !== !1 && A(w) && (a.time("embed web font"), yield Pt(w, r), a.timeEnd("embed web font")), a.time("embed node"), Fe(w, r);
    const y = s.length;
    let m = 0;
    const b = () => S(this, null, function* () {
      for (; ; ) {
        const C = s.pop();
        if (!C)
          break;
        try {
          yield C;
        } catch (v) {
          E("Failed to run task", v);
        }
        c == null || c(++m, y);
      }
    });
    c == null || c(m, y), yield Promise.all([...Array(4)].map(b)), a.timeEnd("embed node"), g == null || g(w);
    const p = Ht(w, r);
    return i && p.insertBefore(i, p.children[0]), o && p.insertBefore(o, p.children[0]), f && Dt(r), h == null || h(p), p;
  });
}
function Ht(e, t) {
  const { width: r, height: n } = t, a = Se(r, n, e.ownerDocument), s = a.ownerDocument.createElementNS(a.namespaceURI, "foreignObject");
  return s.setAttributeNS(null, "x", "0%"), s.setAttributeNS(null, "y", "0%"), s.setAttributeNS(null, "width", "100%"), s.setAttributeNS(null, "height", "100%"), s.append(e), a.appendChild(s), a;
}
function Y(e, t) {
  return S(this, null, function* () {
    var o;
    const r = yield N(e, t), n = yield Vt(r), a = Ee(n, r.isEnable("removeControlCharacter"));
    r.autoDestruct || (r.svgStyleElement = Ae(r.ownerDocument), r.svgDefsElement = (o = r.ownerDocument) == null ? void 0 : o.createElementNS(W, "defs"), r.svgStyles.clear());
    const s = k(a, n.ownerDocument);
    return yield wt(s, r);
  });
}
function Gt(e, t) {
  return S(this, null, function* () {
    const r = yield N(e, t), { log: n, type: a, quality: s, dpi: o } = r, i = yield Y(r);
    n.time("canvas to blob");
    const l = yield it(i, a, s);
    if (["image/png", "image/jpeg"].includes(a) && o) {
      const u = yield ut(l.slice(0, 33));
      let c = new Uint8Array(u);
      return a === "image/png" ? c = he(c, o) : a === "image/jpeg" && (c = ue(c, o)), n.timeEnd("canvas to blob"), new Blob([c, l.slice(33)], { type: a });
    }
    return n.timeEnd("canvas to blob"), l;
  });
}
function P(e, t) {
  return S(this, null, function* () {
    const r = yield N(e, t), { log: n, quality: a, type: s, dpi: o } = r, i = yield Y(r);
    n.time("canvas to data url");
    let l = i.toDataURL(s, a);
    if (["image/png", "image/jpeg"].includes(s) && o && we && Ve) {
      const [u, c] = l.split(",");
      let f = 0, d = !1;
      if (s === "image/png") {
        const p = qe(c);
        p >= 0 ? (f = Math.ceil((p + 28) / 3) * 4, d = !0) : f = 33 / 3 * 4;
      } else
        s === "image/jpeg" && (f = 18 / 3 * 4);
      const g = c.substring(0, f), h = c.substring(f), w = window.atob(g), y = new Uint8Array(w.length);
      for (let p = 0; p < y.length; p++)
        y[p] = w.charCodeAt(p);
      const m = s === "image/png" ? he(y, o, d) : ue(y, o), b = window.btoa(String.fromCharCode(...m));
      l = [u, ",", b, h].join("");
    }
    return n.timeEnd("canvas to data url"), l;
  });
}
function zt(e, t) {
  return S(this, null, function* () {
    const r = yield N(e, t), { width: n, height: a, ownerDocument: s } = r, o = yield P(r), i = Se(n, a, s), l = i.ownerDocument.createElementNS(i.namespaceURI, "image");
    return l.setAttributeNS(null, "href", o), l.setAttributeNS(null, "height", "100%"), l.setAttributeNS(null, "width", "100%"), i.appendChild(l), Ee(i, r.isEnable("removeControlCharacter"));
  });
}
function Yt(e, t) {
  return S(this, null, function* () {
    const r = yield N(e, t), { ownerDocument: n, width: a, height: s, scale: o, type: i } = r, l = i === "image/svg+xml" ? yield zt(r) : yield P(r), u = k(l, n);
    return u.width = Math.floor(a * o), u.height = Math.floor(s * o), u.style.width = `${a}px`, u.style.height = `${s}px`, u;
  });
}
function Jt(e, t) {
  return S(this, null, function* () {
    return P(
      yield N(e, R(T({}, t), { type: "image/jpeg" }))
    );
  });
}
function Kt(e, t) {
  return S(this, null, function* () {
    const r = yield N(e, t), n = yield Y(r);
    return n.getContext("2d").getImageData(0, 0, n.width, n.height).data;
  });
}
function Qt(e, t) {
  return S(this, null, function* () {
    return P(
      yield N(e, R(T({}, t), { type: "image/png" }))
    );
  });
}
function Zt(e, t) {
  return S(this, null, function* () {
    return P(
      yield N(e, R(T({}, t), { type: "image/webp" }))
    );
  });
}


;// CONCATENATED MODULE: ./src/core/parseComments.js
// 在window对象上创建存储空间
//window.ArticleComments = window.ArticleComments || {};

class CommentParser {
    constructor(articleKey) {
        this.articleKey = articleKey;
        // 确保文章的评论存储空间存在
        window.ArticleComments[articleKey] = window.ArticleComments[articleKey] || {
            comments: new Map(), // 使用Map存储评论，key为评论ID
            lastUpdateTime: null
        };
    }

    /**
     * 解析单条评论
     * @param {Element} commentElement - 评论元素
     * @returns {Object} 解析后的评论对象
     */
    parseComment(commentElement) {
        const commentId = commentElement.getAttribute('data-id');

        // 查找评论作者与被回复者
        const authorElement = commentElement.children[0].children[1].children[0].querySelectorAll('a');
        const author = authorElement[0].textContent
        let author2
        if (authorElement[1]) {
            author2 = authorElement[1].textContent
        }

        // 查找评论内容
        const contentElement = commentElement.querySelector('.CommentContent');
        let textContentPlain = '' // string | string[]
        let img = ''
        Array.from(contentElement.childNodes).map(node => {
            //评论内容最小元素
            if (node.nodeName == 'DIV') {
                if (node.classList.contains('comment_img') || node.classList.contains('comment_sticker')) {
                    img = node.querySelector('img').getAttribute('data-original')
                }
                else if (node.classList.contains('css-1gomreu')) {//评论中的@ answer/105002650041
                    let link = node.querySelector('a').href
                    textContentPlain += '[' + node.textContent + '](' + link + ')'
                }
            }
            else if (node.nodeName == 'IMG') textContentPlain += node.alt//小表情
            else if (node.nodeName == 'A') {
                let link = parseComments_ZhihuLink2NormalLink(node.href)
                textContentPlain += '[' + node.textContent + '](' + link + ')'
            }
            else if (node.nodeName == 'BR') textContentPlain += '\n\n'
            else if (node.nodeName == 'P') {//如果一条评论有且仅有多个小表情，会用P包裹，有时分段内容也会
                node.childNodes.forEach(c => {
                    textContentPlain += c.alt || c.textContent
                    if (c.nodeName == 'BR') textContentPlain += '\n\n'
                })
            }
            else textContentPlain += node.textContent
            //暂不处理图片，因为图片只会存在于文末。每条评论最多只有一张图片应该
        });

        let content = textContentPlain

        const timeElement = commentElement.querySelector('.css-12cl38p');
        const time = timeElement ? relativeToAbsoluteDate(timeElement.textContent) : '';

        const locationElement = commentElement.querySelector('.css-ntkn7q');
        const location = locationElement ? locationElement.textContent : '';

        const likeBox = commentElement.querySelector('.css-140jo2'),
            likeButton = likeBox.querySelector('.css-1vd72tl') || likeBox.querySelector('.css-1staphk') //赞过的
        const likes = likeButton?.textContent.match(/\d+/) ? parseInt(likeButton.textContent.match(/\d+/)[0]) : 0

        //const isAuthor = !!commentElement.querySelector('.css-8v0dsd');

        return {
            id: commentId,
            author,
            content,
            time,
            location,
            likes,
            //isAuthor,
            img,
            beReplied: author2,
            parentId: null, // 将在后续处理中设置
            replies: [], // 子评论ID列表
            //updateTime: new Date().getTime()
        };
    }

    /**
     * 构建评论层级关系
     * @param {Element} container - 评论容器元素
     */
    buildCommentHierarchy(container) {
        const commentElements = Array.from(container.querySelectorAll('[data-id]'));
        const commentsData = window.ArticleComments[this.articleKey].comments;

        commentElements.forEach(element => {
            //console.log(element)
            const commentId = element.getAttribute('data-id');
            const comment = this.parseComment(element);

            // 判断是否为回复评论
            // 如果当前评论元素的子元素有css-1kwt8l8类名（一个缩进），说明这是一条回复评论
            let parentElement, isReplyComment = element.firstElementChild.classList.contains('css-1kwt8l8');
            // 另一种情况，弹出框的回复评论（因回复太多而弹出的，和弹出框子页面的，非单纯弹出框）
            if (!isReplyComment) {
                isReplyComment = element.closest('.css-16zdamy')
                parentElement = container.querySelector('.css-tpyajk [data-id]')
            } else parentElement = element.parentElement;
            if (isReplyComment) {
                // 向上或向里查找最近的不是回复评论的data-id元素
                const parentCommentElement = parentElement.closest('[data-id]');

                const parentId = parentCommentElement.getAttribute('data-id');
                comment.parentId = parentId;

                // 更新父评论的replies
                const parentComment = commentsData.get(parentId);
                if (parentComment && !parentComment.replies.includes(commentId)) {
                    parentComment.replies.push(commentId);
                }
            }

            // 更新或添加评论
            if (commentsData.has(commentId)) {
                // 合并新数据，保留原有的replies
                const oldComment = commentsData.get(commentId);
                comment.replies = oldComment.replies;
                commentsData.set(commentId, { ...oldComment, ...comment });
            } else {
                commentsData.set(commentId, comment);
            }
        });

        // 更新最后更新时间
        window.ArticleComments[this.articleKey].lastUpdateTime = new Date().getTime();
    }

    /**
     * 解析评论区
     * @param {string} selector - 评论容器的选择器
     * @param {HtmlElement} c - 评论容器 .Comments-container
     */
    parseComments(c) {
        const container = c || document.querySelector('.Comments-container');
        if (!container) {
            console.error('找不到评论容器');
            return;
        }
        this.buildCommentHierarchy(container);
    }

    /**
     * 获取评论数据
     * @returns {Object} 评论数据
     */
    getComments() {
        return window.ArticleComments[this.articleKey];
    }
}

const buttonContainer = document.createElement("div")
buttonContainer.innerHTML = `<div class="comment-parser-container">
    <button class="hint Button VoteButton" title="说明"><svg style="vertical-align: middle;" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10s-4.477 10-10 10m0-2a8 8 0 1 0 0-16a8 8 0 0 0 0 16M11 7h2v2h-2zm0 4h2v6h-2z"/></svg></button>
    &nbsp;<button class="save Button VoteButton">暂存此页评论</button>
    &nbsp;<button class="unsave Button VoteButton">清空暂存区</button>
    &nbsp;<button class="sum Button VoteButton">查看暂存数</button></div>`
buttonContainer.classList.add("comment-parser-container-wrap")
buttonContainer.style.position = "absolute"
buttonContainer.style.right = "20%"

const HINT = '此为评论解析器，用于暂存评论，以便后续保存\n每次点击会暂存当前页评论，支持弹出框，支持增量保存（自动去重），评论顺序取决于暂存顺序\n暂存的评论仅当前页可用，在页面刷新后会消失'
/**
 * 1 获取评论容器
 * 4 获取回答唯一KEY
 * 3 添加按钮
 * 5 绑定点击事件
 * 保存在window对象上，
 */
/**
 * ContentItem下有本次要添加按钮的评论区的位置
 * @param {HtmlElement} ContentItem .ContentItem 或 .Modal-content，作为评论区容器
 */
function addParseButton(ContentItem, itemId) {

    if (!ContentItem) return;
    //cc下有所有本次要处理的评论，层级不限
    let cc = ContentItem.querySelector('.Comments-container')
    let toolbar//功能栏，css-1onritu

    // 另一种情况，此时ContentItem为Modal-content，触发来源为点击查看按钮后延时cc = ContentItem
    let modal = document.querySelector('.Modal-content')
    if (modal) {
        itemId = modal.getAttribute('itemId')
        cc = ContentItem.querySelector('.css-tpyajk')
        toolbar = cc?.querySelector('.css-1onritu')
        cc.querySelector('.comment-parser-container-wrap')?.remove()// 避免重复添加
    }
    else if (cc) {
        toolbar = cc.querySelector('.css-1onritu')
        cc.querySelector('.comment-parser-container-wrap')?.remove()// 避免重复添加
    }

    if (!cc || cc.querySelector('.css-189h5o3')?.textContent.match('还没有')) return;

    toolbar.appendChild(buttonContainer.cloneNode(true))

    cc.querySelector(".save").addEventListener('click', (e) => {
        e.target.textContent = ' 暂存中……… '
        setTimeout(() => {
            e.target.textContent = '暂存此页评论'
        }, 700)
        const parser = new CommentParser(itemId);
        parser.parseComments(cc);
        //const comments = parser.getComments();
        //console.log(cc, comments);
    })
    cc.querySelector(".unsave").addEventListener('click', (e) => {
        e.target.textContent = ' 清空中……… '
        setTimeout(() => {
            e.target.textContent = '清空暂存区'
        }, 700)
        window.ArticleComments[itemId] = undefined
    })
    cc.querySelector(".sum").addEventListener('click', () => {
        try {
            alert('已存 ' + window.ArticleComments[itemId].comments.size + ' 条')
        } catch (e) {
            alert('已存 0 条')
        }
    })
}
/**
 * Modal评论处理方案
 * 添加按钮并正确传入主人ID
 * 来源：
 * 1 点击底栏按钮（弹出Modal）
 * 2 点击评论区查看子评论
 * 3 点击评论区查看全部评论（div.css-wu78cf）（折叠评论css-1r40vb1）
 * 4 打开Modal后，点击Modal内查看子评论（css-tpyajk下才是真的评论区）不可能在点击时直接获取ID
 * 
 * 计划：
 * 1
 * 点击时查找主人ID，延时触发添加按钮（同时会添加事件）
 * 问题是在 4 时仍然找不到
 * 
 * 2
 * 点击 123 时查找主人ID并存入window，延时触发添加按钮，不传ID
 * 点击 4 时只延时触发添加按钮，不传ID
 * 使用按钮时如果没有主人ID（发生在由 1234 创造的 Modal 内按钮），使用window中的
 * 延时后只在Modal内添加（ 1 有时并不会创造Modal，此时由滚动添加）
 * 
 * 3
 * （可替代非Modal场景）
 * 点击 123 时查找主人ID，延时添加到 Modal DOM 上，延时触发添加按钮，不传ID
 * 点击 1 时额外判断如果延时后没有Modal，就传ID添加按钮
 * 23时没有可以再试一次
 * 使用按钮时如果没有主人ID（发生在由 1234 创造的 Modal 内按钮），使用 Modal DOM 中的
 * 
 * 
 * 路线
 * 
 * 基本解析功能
 * 挂载按钮与事件
 * 合并入主程序
 * 基本渲染功能
 * 渲染合并入主程序
 * 处理图片（下载和文本链接）
 * 细节处理（筛选后显示、已关闭、待展开子项）
 * 人性化提示（保存正文前、暂存反馈）
 * 专栏与搜索结果页
 * 
 */
/**
 * 调用后挂载document点击事件
 */
const mountParseComments = () => {
    const autoAdd = () => setTimeout(() => {
        let c = document.querySelector('.Post-content') || document.querySelector('.ContentItem')
        let itemId = getItemId(c, c)
        addParseButton(c, itemId)
    }, 2000)
    if (location.href.match(/\/pin\/|\/p\//)) {
        // 想法页文章页直接呈现评论
        autoAdd()
    }
    document.addEventListener("click", (e) => {
        let itemId
        const btn = e.target.closest('button')
        // 1
        if (btn?.closest('.ContentItem-actions') && /评论/.test(btn.textContent)) {
            let father = e.target.closest(".ContentItem") || e.target.closest(".Post-content")
            //注意文章页，搜索结果页
            itemId = getItemId(father, e.target)
            setTimeout(() => {
                let modal = document.querySelector('.Modal-content')
                if (modal) {
                    modal.setAttribute('itemId', itemId)
                    addParseButton(modal, itemId)
                }
                else addParseButton(father, itemId)
            }, 1200);
            return;
        }
        // 23 4
        else if (btn || e.target.closest('.css-wu78cf') || e.target.closest('.css-tpyajk .css-1jm49l2') || e.target.closest('.css-1r40vb1')) {
            let click = btn || e.target.closest('.css-wu78cf') || e.target.closest('.css-tpyajk .css-1jm49l2') || e.target.closest('.css-1r40vb1')
            if (click.textContent.match(/(查看.*(评论|回复))|评论回复/)) {

                let father = e.target.closest(".ContentItem") || e.target.closest(".Post-content")
                //注意文章页，搜索结果页
                setTimeout(() => {
                    let modal = document.querySelector('.Modal-content')
                    if (father) {// 4:false，不需要获取
                        //非Modal内 23
                        //console.log(2233)
                        itemId = getItemId(father, e.target)
                        modal.setAttribute('itemId', itemId)
                    }
                    addParseButton(modal, itemId)// 最终都是给Modal挂
                }, 1200);
            }
        }
        if (e.target.closest('button.hint')) {
            try {
                var skip_empty_p = GM_getValue("skip_empty_p"),
                    zip_merge_cm = GM_getValue("zip_merge_cm"),
                    copy_save_fm = GM_getValue("copy_save_fm"),
                    copy_save_cm = GM_getValue("copy_save_cm"),
                    no_save_img = GM_getValue("no_save_img"),
                    HINT2 = `\n当前设置：\n跳过空白段落：${skip_empty_p}\n复制保存评论：${copy_save_cm}\n复制保存FM：${copy_save_fm}\nzip合并评论：${zip_merge_cm}\n复制与纯文本不存图片：${no_save_img}`
            } catch (e) {
            }
            alert(HINT + HINT2)
        }
        else if (btn?.getAttribute('aria-label') == "关闭") {
            autoAdd()// 文章页关闭弹出框后按钮消失
        }
        if (e.target.closest('.ContentItem-more')) {
            setTimeout(window.zhbf, 200)// 评论无关功能，展开后无需滚动即可保存
        }
    })
}

/**
 * 
 * @param {HtmlElement} father 含有itemId zop
 * @param {HtmlElement} etg e.target
 * @returns {String}
 */
const getItemId = (father, etg) => {
    let zopdata = JSON.parse(father.getAttribute("data-zop") || '{}')
    if (!zopdata.itemId) {
        // 搜索结果页
        father = etg.closest(".Card")
        let zem = JSON.parse(father.getAttribute("data-za-extra-module")).card.content
        zopdata.type = zem.type
        if (zopdata.type == 'Post') zopdata.type = 'article'
        zopdata.itemId = zem.token
    }
    return zopdata.type.toLowerCase() + zopdata.itemId
}

const parseComments_ZhihuLink2NormalLink = (link) => {
    const url = new URL(link)
    if (url.hostname == "link.zhihu.com") {
        const target = new URLSearchParams(url.search).get("target")
        return decodeURIComponent(target)
    }
    else {
        if (link.match(/#/)) return '#' + link.split('#')[1]
        else return link
    }
}

/**
 * 相对时间转绝对时间
 * @param {String} relativeTime
 * @returns {String}
 */
function relativeToAbsoluteDate(relativeTime) {
    //const now = new Date();
    //更精确一点了：推算日内可知部分并将不可知部分置为0
    let result = new Date();

    if (relativeTime.includes('分钟前')) {
        const minutes = parseInt(relativeTime);
        result.setMinutes(result.getMinutes() - minutes);
        result.setSeconds(0);
    }
    else if (relativeTime.includes('小时前')) {
        const hours = parseInt(relativeTime);
        result.setHours(result.getHours() - hours);
        result.setMinutes(0, 0);
    }
    else if (relativeTime.includes('昨天')) {
        result.setDate(result.getDate() - 1);
        result.setSeconds(0);
    }
    // 处理 "MM-DD" 格式
    else if (/^\d{2}-\d{2}$/.test(relativeTime)) {
        const [month, day] = relativeTime.split('-').map(num => parseInt(num));
        result.setMonth(month - 1);
        result.setDate(day);
        result.setHours(0, 0, 0);
    }
    // 处理 "YYYY-MM-DD" 格式
    else if (/^\d{4}-\d{2}-\d{2}$/.test(relativeTime)) return relativeTime
    // "刚刚" 无需处理
    // 返回 YYYY-MM-DD 格式的字符串2025-02-28 (14:41:32)
    return formatDate(result);
}

function formatDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');

    if (parseInt(hours + minutes + seconds))
        return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    return `${year}-${month}-${day}`;
}

;// CONCATENATED MODULE: ./src/index.ts
var src_awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};





/**
 * 修改版
 *
 * 适配关注推送时间线，用户时间线
 * 按钮改为鼠标悬停才显示，绝对定位，减少侵入
 * 代码风格：大部分改为空格缩进、无分号
 *
 * 优化逻辑与性能，减少多余操作：
 * 无限循环改为每1秒监听滚动
 * 点击按钮后才开始处理内容
 *
 * 文件名添加作者名、时间
 * 保存为HTML/PNG
 * 适配复杂的想法：转发、带卡片链接、带@
 *
 *
 * 页：推送页，个人/机构主页，回答页，问题页，文章页，想法页，收藏夹页，搜索结果页
 */
/**
 * 下一步
 * 剪藏，显示与预期不一致问题：点赞栏、专栏
 * 添加ip属地
 *
 * 路线图
 *
 * 03-原版
 * 04-接手
 * 05-截图
 * 054-想法
 * 06-想法完全支持
 * 07-zip添加评论
 * 071-测试
 * 072-预发布
 * 073-修复文章截图
 *
 * 10-完全测试所有场景+类型
 * -评论md解析
 * -md添加frontmatter
 * -快捷键
 * -按钮节流
 *
 *
 * 自定义配置以及更多
 * 保存为纯文本
 * zip内改index.md为zip文件名
 * 评论合并到主md内
 * 添加笔记
 * 不保存图片
 *
 * 更多见 readme
 *
 *
 */
// @grant        GM_setValue
// @grant        GM_getValue
// @grant    GM_registerMenuCommand
// @grant    GM_unregisterMenuCommand
/**
 * 油猴按钮
 */
function registerBtn() {
    try {
        // @ts-ignore
        let skipEmpty = GM_registerMenuCommand("（推荐）解析时跳过空白段落", function () {
            // @ts-ignore
            let ac = GM_getValue("skip_empty_p"), c;
            !ac ? c = confirm("解析时跳过空白段落，避免产生大量多余的换行，你是否继续？") : alert('已取消跳过空白段落');
            if (c) {
                // @ts-ignore
                GM_setValue("skip_empty_p", true);
                // @ts-ignore
            }
            else
                GM_setValue("skip_empty_p", false);
        });
        // @ts-ignore
        let menuFM = GM_registerMenuCommand("复制内容时添加fm元信息", function () {
            // @ts-ignore
            let ac = GM_getValue("copy_save_fm"), c;
            !ac ? c = confirm("复制内容时，添加 frontmatter 信息，就像下载为纯文本的时候一样。你是否继续？") : alert('已取消复制添加fm');
            // @ts-ignore
            c ? GM_setValue("copy_save_fm", true) : GM_setValue("copy_save_fm", false);
            //alert(GM_getValue("copy_save_fm"))
        });
        // @ts-ignore
        let menuSaveCM = GM_registerMenuCommand("复制内容时同时复制评论", function () {
            // @ts-ignore
            let ns = GM_getValue("copy_save_cm"), c;
            !ns ? c = confirm("启用后，复制时也会复制评论，就像直接复制了下载的纯文本。你是否继续？") : alert('已取消复制评论');
            // @ts-ignore
            c ? GM_setValue("copy_save_cm", true) : GM_setValue("copy_save_cm", false);
            //alert(GM_getValue("copy_save_cm"))
        });
        // @ts-ignore
        let menuMergeCM = GM_registerMenuCommand("下载zip时合并正文与评论", function () {
            // @ts-ignore
            let ns = GM_getValue("zip_merge_cm"), c;
            !ns ? c = confirm("启用后，下载zip时会合并正文与评论到一个文件中。你是否继续？") : alert('已取消合并');
            // @ts-ignore
            c ? GM_setValue("zip_merge_cm", true) : GM_setValue("zip_merge_cm", false);
            //alert(GM_getValue("zip_merge_cm"))
        });
        // @ts-ignore
        let menuSaveImg = GM_registerMenuCommand("复制与下载纯文本时不保存图片", function () {
            // @ts-ignore
            let ns = GM_getValue("no_save_img"), c;
            !ns ? c = confirm("启用后，复制、存文本时将所有图片替换为“[图片]”，不影响存zip。你是否继续？") : alert('已取消不存图');
            // @ts-ignore
            c ? GM_setValue("no_save_img", true) : GM_setValue("no_save_img", false);
            //alert(GM_getValue("no_save_img"))
        });
    }
    catch (e) {
        console.warn(e);
    }
}
registerBtn();
const ButtonContainer = document.createElement("div");
ButtonContainer.classList.add("zhihubackup-wrap");
ButtonContainer.innerHTML = `<div class="zhihubackup-container">
    <button class="to-copy Button VoteButton">复制为Markdown</button>
    <button class="to-zip Button VoteButton">下载为 ZIP</button>
    <button class="to-text Button VoteButton">下载为纯文本</button>
    <button class="to-png Button VoteButton">剪藏为 PNG</button>
    <button class="Button VoteButton">
        <textarea class="to-remark" type="text" placeholder="添加备注" style="width: 100%;" maxlength="60"></textarea>
    </button>
    <button class="Button VoteButton">
        <label><input type="checkbox" checked class="to-cm"> 保存评论</label>
    </button></div>`;
const main = () => src_awaiter(void 0, void 0, void 0, function* () {
    //console.log("Starting…")
    const RichTexts = Array.from(document.querySelectorAll(".RichText"));
    for (let RichText of RichTexts) {
        try {
            let result;
            //console.log(RichText)
            if (RichText.parentElement.classList.contains("Editable"))
                continue;
            if (window.location.hostname.includes('zhuanlan')) {
                if (RichText.closest('.Post-Main').querySelector(".zhihubackup-container"))
                    continue;
            }
            else {
                if (RichText.closest('.PinItem')) {
                    if (!RichText.closest('.RichContent-inner'))
                        continue; //每个带图想法有3个RichText，除掉图、假转发
                    //if (RichText.children[0].classList.contains("Image-Wrapper-Preview")) continue
                    if (RichText.closest('.PinItem-content-originpin'))
                        continue; //被转发想法
                }
                if (RichText.closest('.RichContent').querySelector(".zhihubackup-container"))
                    continue;
                const richInner = RichText.closest('.RichContent-inner');
                if (richInner && richInner.querySelector(".ContentItem-more"))
                    continue; //未展开
                if (RichText.closest('.RichContent').querySelector(".ContentItem-expandButton"))
                    continue;
                if (RichText.querySelector(".RichContent-inner").textContent.length == 0)
                    continue;
            }
            const aButtonContainer = ButtonContainer.cloneNode(true);
            //父级
            let parent_dom = RichText.closest('.List-item') ||
                RichText.closest('.Post-content') ||
                RichText.closest('.PinItem') ||
                RichText.closest('.CollectionDetailPageItem') ||
                RichText.closest('.Card');
            if (parent_dom.querySelector('.Catalog')) {
                aButtonContainer.firstElementChild.style.position = 'fixed';
                aButtonContainer.firstElementChild.style.top = 'unset';
                aButtonContainer.firstElementChild.style.bottom = '60px';
            }
            let p = RichText.closest('.RichContent') || RichText.closest('.Post-RichTextContainer');
            p.prepend(aButtonContainer);
            const ButtonMarkdown = parent_dom.querySelector(".to-copy");
            ButtonMarkdown.addEventListener("click", throttle((event) => src_awaiter(void 0, void 0, void 0, function* () {
                try {
                    const res = yield dealItem(RichText, 'copy', event);
                    if (!res)
                        return; // 取消保存
                    result = {
                        textString: res.textString,
                        zip: res.zip,
                        title: res.title,
                    };
                    /*console.log(result.markdown.join("\n\n"))*/
                    navigator.clipboard.writeText(result.textString);
                    ButtonMarkdown.innerHTML = "复制成功✅";
                    setTimeout(() => {
                        ButtonMarkdown.innerHTML = "复制为Markdown";
                    }, 3000);
                }
                catch (e) {
                    console.log(e);
                    ButtonMarkdown.innerHTML = "发生错误❌<br>请打开控制台查看";
                    setTimeout(() => {
                        ButtonMarkdown.innerHTML = "复制为Markdown";
                    }, 3000);
                }
            })));
            const ButtonZip = parent_dom.querySelector(".to-zip");
            ButtonZip.addEventListener("click", throttle((event) => src_awaiter(void 0, void 0, void 0, function* () {
                try {
                    ButtonZip.innerHTML = "下载中……";
                    const res = yield dealItem(RichText, 'zip', event);
                    if (!res)
                        return ButtonZip.innerHTML = "下载为 Zip"; // 取消保存
                    result = {
                        zip: res.zip,
                        title: res.title,
                    };
                    const blob = yield result.zip.generateAsync({ type: "blob" });
                    (0,FileSaver_min.saveAs)(blob, result.title + ".zip");
                    ButtonZip.innerHTML = "下载成功✅<br>请看下载记录";
                    setTimeout(() => {
                        ButtonZip.innerHTML = "下载为 Zip";
                    }, 5000);
                }
                catch (e) {
                    console.log(e);
                    ButtonZip.innerHTML = "发生错误❌<br>请打开控制台查看";
                    setTimeout(() => {
                        ButtonZip.innerHTML = "下载为 Zip";
                    }, 5000);
                }
            })));
            const ButtonPNG = parent_dom.querySelector(".to-png");
            ButtonPNG.addEventListener("click", throttle((event) => src_awaiter(void 0, void 0, void 0, function* () {
                try {
                    const res = yield dealItem(RichText, 'png', event);
                    if (!res)
                        return; // 取消保存
                    result = {
                        title: res.title,
                    };
                    let clip = parent_dom;
                    clip.classList.add("to-screenshot");
                    let saveCM = getCommentSwitch(RichText);
                    !saveCM ? clip.classList.add("no-cm") : 0;
                    let svgDefs = document.querySelector("#MathJax_SVG_glyphs");
                    svgDefs ? svgDefs.style.visibility = "visible" : 0;
                    Qt(clip, {
                        backgroundColor: "#fff",
                        filter(el) {
                            if (el.tagName == 'DIV' && el.classList.contains('zhihubackup-wrap'))
                                return false;
                            else
                                return true;
                        },
                    }).then((dataUrl) => {
                        const link = document.createElement('a');
                        link.download = result.title + ".png";
                        link.href = dataUrl;
                        link.click();
                        setTimeout(() => {
                            clip.classList.remove("to-screenshot");
                            !saveCM ? clip.classList.remove("no-cm") : 0;
                            //svgDefs2.remove()
                            ButtonPNG.innerHTML = "剪藏为 PNG";
                        }, 5000);
                    });
                    ButtonPNG.innerHTML = "请稍待片刻✅<br>查看下载记录";
                }
                catch (e) {
                    console.log(e);
                    ButtonPNG.innerHTML = "发生错误❌<br>请打开控制台查看";
                    setTimeout(() => {
                        ButtonPNG.innerHTML = "剪藏为 PNG";
                    }, 5000);
                }
            })));
            const ButtonText = parent_dom.querySelector(".to-text");
            ButtonText.addEventListener("click", throttle((event) => src_awaiter(void 0, void 0, void 0, function* () {
                try {
                    const res = yield dealItem(RichText, 'text', event);
                    if (!res)
                        return; // 取消保存
                    result = {
                        textString: res.textString,
                        title: res.title,
                    };
                    const blob = new Blob([result.textString], { type: 'text/plain' });
                    (0,FileSaver_min.saveAs)(blob, result.title + ".md");
                    ButtonText.innerHTML = "下载成功✅<br>请看下载记录，以文本方式打开";
                    setTimeout(() => {
                        ButtonText.innerHTML = "下载为纯文本";
                    }, 5000);
                }
                catch (e) {
                    console.log(e);
                    ButtonText.innerHTML = "发生错误❌<br>请打开控制台查看";
                    setTimeout(() => {
                        ButtonText.innerHTML = "下载为纯文本";
                    }, 5000);
                }
            })));
        }
        catch (e) {
            console.log(e);
        }
    }
});
function throttle(fn, delay = 2000) {
    let flag = true;
    return function (...args) {
        if (flag) {
            flag = false;
            setTimeout(() => {
                flag = true;
            }, delay);
            return fn.apply(this, args); // 通过 apply 传递参数和 this
        }
    };
}
setTimeout(() => {
    let node = document.createElement("style"); //!important
    node.appendChild(document.createTextNode(`
    .RichContent {
        position: relative;
    }
    .zhihubackup-wrap {
        opacity: 0;
        pointer-events: none;
        transition: opacity 0.5s;
        position: absolute;
        left: -10em;
        top: -50px;
        height: 100%;
        user-select: none;
        width: 12em;
    }
    .RichContent:hover .zhihubackup-wrap,
    .Post-RichTextContainer:hover .zhihubackup-wrap{
        opacity: 1;
        pointer-events: initial;
    }
    .zhihubackup-container {
        position: sticky;
        top: 120px;
        /*display: flex;
        flex-direction: column;
        justify-content: space-around;
        height: 22em;*/
        width: min-content;
        max-width: 8em;
        z-index: 2;
    }
    .zhihubackup-container button {
        width: 8em;
        margin-bottom: 8px;
        line-height: 24px !important;
        padding: 4px 10px!important;
    }
    .zhihubackup-container input,
    .zhihubackup-container textarea {
        /*border: 1px solid #777;*/
        background-color: #0000;
        font-size: 14px;
        color: #1772f6;
        border: unset;
        text-align: center;
        outline: unset;
        height: 100%;
        resize: none;
        overflow: hidden;
        line-height: 1.5em;
        vertical-align: middle;
    }
    button.Button.VoteButton:has(input:focus),
    button.Button.VoteButton:has(textarea:focus),
    button.Button.VoteButton:has(textarea:hover) {
        resize: both;
        overflow: hidden;
    }
    .to-screenshot .ContentItem-actions {
        position: initial!important;
        box-shadow: unset!important;
        margin: 0 -20px -10px!important;
    }
    .to-screenshot.Post-content .RichContent-actions {
        position: initial!important;/*专栏*/
        box-shadow: unset!important;
    }
    .to-screenshot.Post-content {
        width: 780px;
        margin: 0 auto;
        min-width: unset!important;
    }
    .to-screenshot .Post-Main {
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    .to-screenshot.PinItem .RichText>.RichText:has(a[data-first-child]) {
        display: flex;/*想法-卡片链接*/
        flex-direction: column;
        align-items: center;
    }
    .to-screenshot .ContentItem-actions>.ContentItem-actions {
        margin-top: -10px!important;/*想法*/
    }
    .to-screenshot .css-m4psdq{
        opacity: 0;
    }
    .to-screenshot .AppHeader-profileAvatar{
        opacity: 0;
    }
    .to-screenshot.no-cm .Comments-container{
        display: none;
    }
    .to-screenshot noscript{
        display: none;
    }
    .to-screenshot .RichText-LinkCardContainer{
        display: flex;
        justify-content: center;
    }
    .to-screenshot .LinkCard.new{
        margin: 0!important;
    }
    .to-screenshot .FeedSource{
        margin-bottom: 14px !important;
    }
    .to-screenshot .Comments-container>div>div{
        margin-bottom: 10px !important;
    }
    .to-screenshot .Comments-container{
        margin: 0 !important;
    }
    .to-screenshot.PinItem{
        margin: 16px 0;/*想法增加留白*/
        padding: 0 16px;
        width: 690px;
    }
    .PinDetail:has(.to-screenshot){
        max-width: 706px!important;
    }
    .to-screenshot .Recommendations-Main{
        display: none;/*文章推荐阅读*/
    }
    .to-screenshot .css-kt4t4n{
        display: none;/*下方黏性评论栏*/
    }
    .to-screenshot .zhihubackup-container{
        /*display: none;*/
    }
    .RichContent:has(.ContentItem-more) .zhihubackup-wrap,
    .Post-RichTextContainer:has(.ContentItem-more) .zhihubackup-wrap{
        display:none;
    }
    .comment-parser-container{
        opacity: 0;
        pointer-events: none;
        transition: opacity 0.5s;
    }
    .Comments-container:hover .comment-parser-container,
    .Modal-content:hover .comment-parser-container{
        opacity: 1;
        pointer-events: initial;
    }
    .Card:has(.zhihubackup-wrap){
        overflow: visible!important;
    }
    `));
    let head = document.querySelector("head");
    head.appendChild(node);
    if (window.innerWidth < 1275) {
        let node2 = document.createElement("style");
        node2.appendChild(document.createTextNode(`
        .zhihubackup-wrap {
            left: unset;
            right: -10em;
            z-index: 2;
        }
        .zhihubackup-container {
            float: right;
            background-color: rgb(244, 246, 249);
        }
        .RichContent {
            z-index: 2;
        }
        `));
        head.appendChild(node2);
    }
}, 30);
setTimeout(() => {
    var _a;
    main();
    mountParseComments();
    // @ts-ignore
    window.zhbf = main;
    // 在window对象上创建存储空间
    // @ts-ignore
    window.ArticleComments = window.ArticleComments || {};
    (_a = document.querySelector('.Topstory-tabs')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', () => {
        setTimeout(registerBtn, 100);
    });
}, 300);
let timer = null;
window.addEventListener("scroll", () => {
    //debounce
    if (timer) {
        clearTimeout(timer);
    }
    timer = setTimeout(main, 1000);
});

;// CONCATENATED MODULE: ./src/entry.ts


})();

/******/ })()
;