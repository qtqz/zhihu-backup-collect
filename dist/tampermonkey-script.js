// ==UserScript==
// @name         知乎备份剪藏
// @namespace    qtqz
// @source       https://github.com/qtqz/zhihu-backup-collect
// @version      0.11.6
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

* 0.11.6（2026-02-01）:
    - 修复有时候无法保存评论中链接的问题
    - 修复无法保存想法中的用户的问题
    - 修复突然无法输入备注的问题
* 0.11.3（2025-12-04）:
    - 修复一大堆关于公式的问题
    - 修复脚注不能用的问题
    - 跳过更多空白段落
* 0.11.0（2025-12-03）:
    - **可以保存内容到本地的指定目录**，便于分类，支持以多种格式保存
    - 添加消息提示系统
    - 样式和体验优化
    - 删除无用的 info.json
    - 为自定义保存文件名添加了默认值，方便修改
    - 修复此问题：对于同一个内容，保存过 ZIP 后，评论中图片链接就永久变为本地链接，影响再次保存
* 0.10.52（2025-10-08）:
    - 修复知乎更新后无法保存想法中图片的问题
* 0.10.51（2025-09-29）:
    - 修复知...
...

 */

/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 972
(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function(a,b){if(true)!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = (b),
		__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
		(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));else // removed by dead control flow
{}})(this,function(){"use strict";function b(a,b){return"undefined"==typeof b?b={autoBom:!1}:"object"!=typeof b&&(console.warn("Deprecated: Expected third argument to be a object"),b={autoBom:!b}),b.autoBom&&/^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(a.type)?new Blob(["\uFEFF",a],{type:a.type}):a}function c(a,b,c){var d=new XMLHttpRequest;d.open("GET",a),d.responseType="blob",d.onload=function(){g(d.response,b,c)},d.onerror=function(){console.error("could not download file")},d.send()}function d(a){var b=new XMLHttpRequest;b.open("HEAD",a,!1);try{b.send()}catch(a){}return 200<=b.status&&299>=b.status}function e(a){try{a.dispatchEvent(new MouseEvent("click"))}catch(c){var b=document.createEvent("MouseEvents");b.initMouseEvent("click",!0,!0,window,0,0,0,80,20,!1,!1,!1,!1,0,null),a.dispatchEvent(b)}}var f="object"==typeof window&&window.window===window?window:"object"==typeof self&&self.self===self?self:"object"==typeof __webpack_require__.g&&__webpack_require__.g.global===__webpack_require__.g?__webpack_require__.g:void 0,a=f.navigator&&/Macintosh/.test(navigator.userAgent)&&/AppleWebKit/.test(navigator.userAgent)&&!/Safari/.test(navigator.userAgent),g=f.saveAs||("object"!=typeof window||window!==f?function(){}:"download"in HTMLAnchorElement.prototype&&!a?function(b,g,h){var i=f.URL||f.webkitURL,j=document.createElement("a");g=g||b.name||"download",j.download=g,j.rel="noopener","string"==typeof b?(j.href=b,j.origin===location.origin?e(j):d(j.href)?c(b,g,h):e(j,j.target="_blank")):(j.href=i.createObjectURL(b),setTimeout(function(){i.revokeObjectURL(j.href)},4E4),setTimeout(function(){e(j)},0))}:"msSaveOrOpenBlob"in navigator?function(f,g,h){if(g=g||f.name||"download","string"!=typeof f)navigator.msSaveOrOpenBlob(b(f,h),g);else if(d(f))c(f,g,h);else{var i=document.createElement("a");i.href=f,i.target="_blank",setTimeout(function(){e(i)})}}:function(b,d,e,g){if(g=g||open("","_blank"),g&&(g.document.title=g.document.body.innerText="downloading..."),"string"==typeof b)return c(b,d,e);var h="application/octet-stream"===b.type,i=/constructor/i.test(f.HTMLElement)||f.safari,j=/CriOS\/[\d]+/.test(navigator.userAgent);if((j||h&&i||a)&&"undefined"!=typeof FileReader){var k=new FileReader;k.onloadend=function(){var a=k.result;a=j?a:a.replace(/^data:[^;]*;/,"data:attachment/file;"),g?g.location.href=a:location=a,g=null},k.readAsDataURL(b)}else{var l=f.URL||f.webkitURL,m=l.createObjectURL(b);g?g.location=m:location.href=m,g=null,setTimeout(function(){l.revokeObjectURL(m)},4E4)}});f.saveAs=g.saveAs=g, true&&(module.exports=g)});

//# sourceMappingURL=FileSaver.min.js.map

/***/ },

/***/ 1
(module, __unused_webpack_exports, __webpack_require__) {

/*!

JSZip v3.10.1 - A JavaScript class for generating and reading zip files
<http://stuartk.com/jszip>

(c) 2009-2016 Stuart Knightley <stuart [at] stuartk.com>
Dual licenced under the MIT license or GPLv3. See https://raw.github.com/Stuk/jszip/main/LICENSE.markdown.

JSZip uses the library pako released under the MIT license :
https://github.com/nodeca/pako/blob/main/LICENSE
*/

!function(e){if(true)module.exports=e();else // removed by dead control flow
{}}(function(){return function s(a,o,h){function u(r,e){if(!o[r]){if(!a[r]){var t=undefined;if(!e&&t)return require(r,!0);if(l)return l(r,!0);var n=new Error("Cannot find module '"+r+"'");throw n.code="MODULE_NOT_FOUND",n}var i=o[r]={exports:{}};a[r][0].call(i.exports,function(e){var t=a[r][1][e];return u(t||e)},i,i.exports,s,a,o,h)}return o[r].exports}for(var l=undefined,e=0;e<h.length;e++)u(h[e]);return u}({1:[function(e,t,r){"use strict";var d=e("./utils"),c=e("./support"),p="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";r.encode=function(e){for(var t,r,n,i,s,a,o,h=[],u=0,l=e.length,f=l,c="string"!==d.getTypeOf(e);u<e.length;)f=l-u,n=c?(t=e[u++],r=u<l?e[u++]:0,u<l?e[u++]:0):(t=e.charCodeAt(u++),r=u<l?e.charCodeAt(u++):0,u<l?e.charCodeAt(u++):0),i=t>>2,s=(3&t)<<4|r>>4,a=1<f?(15&r)<<2|n>>6:64,o=2<f?63&n:64,h.push(p.charAt(i)+p.charAt(s)+p.charAt(a)+p.charAt(o));return h.join("")},r.decode=function(e){var t,r,n,i,s,a,o=0,h=0,u="data:";if(e.substr(0,u.length)===u)throw new Error("Invalid base64 input, it looks like a data url.");var l,f=3*(e=e.replace(/[^A-Za-z0-9+/=]/g,"")).length/4;if(e.charAt(e.length-1)===p.charAt(64)&&f--,e.charAt(e.length-2)===p.charAt(64)&&f--,f%1!=0)throw new Error("Invalid base64 input, bad content length.");for(l=c.uint8array?new Uint8Array(0|f):new Array(0|f);o<e.length;)t=p.indexOf(e.charAt(o++))<<2|(i=p.indexOf(e.charAt(o++)))>>4,r=(15&i)<<4|(s=p.indexOf(e.charAt(o++)))>>2,n=(3&s)<<6|(a=p.indexOf(e.charAt(o++))),l[h++]=t,64!==s&&(l[h++]=r),64!==a&&(l[h++]=n);return l}},{"./support":30,"./utils":32}],2:[function(e,t,r){"use strict";var n=e("./external"),i=e("./stream/DataWorker"),s=e("./stream/Crc32Probe"),a=e("./stream/DataLengthProbe");function o(e,t,r,n,i){this.compressedSize=e,this.uncompressedSize=t,this.crc32=r,this.compression=n,this.compressedContent=i}o.prototype={getContentWorker:function(){var e=new i(n.Promise.resolve(this.compressedContent)).pipe(this.compression.uncompressWorker()).pipe(new a("data_length")),t=this;return e.on("end",function(){if(this.streamInfo.data_length!==t.uncompressedSize)throw new Error("Bug : uncompressed data size mismatch")}),e},getCompressedWorker:function(){return new i(n.Promise.resolve(this.compressedContent)).withStreamInfo("compressedSize",this.compressedSize).withStreamInfo("uncompressedSize",this.uncompressedSize).withStreamInfo("crc32",this.crc32).withStreamInfo("compression",this.compression)}},o.createWorkerFrom=function(e,t,r){return e.pipe(new s).pipe(new a("uncompressedSize")).pipe(t.compressWorker(r)).pipe(new a("compressedSize")).withStreamInfo("compression",t)},t.exports=o},{"./external":6,"./stream/Crc32Probe":25,"./stream/DataLengthProbe":26,"./stream/DataWorker":27}],3:[function(e,t,r){"use strict";var n=e("./stream/GenericWorker");r.STORE={magic:"\0\0",compressWorker:function(){return new n("STORE compression")},uncompressWorker:function(){return new n("STORE decompression")}},r.DEFLATE=e("./flate")},{"./flate":7,"./stream/GenericWorker":28}],4:[function(e,t,r){"use strict";var n=e("./utils");var o=function(){for(var e,t=[],r=0;r<256;r++){e=r;for(var n=0;n<8;n++)e=1&e?3988292384^e>>>1:e>>>1;t[r]=e}return t}();t.exports=function(e,t){return void 0!==e&&e.length?"string"!==n.getTypeOf(e)?function(e,t,r,n){var i=o,s=n+r;e^=-1;for(var a=n;a<s;a++)e=e>>>8^i[255&(e^t[a])];return-1^e}(0|t,e,e.length,0):function(e,t,r,n){var i=o,s=n+r;e^=-1;for(var a=n;a<s;a++)e=e>>>8^i[255&(e^t.charCodeAt(a))];return-1^e}(0|t,e,e.length,0):0}},{"./utils":32}],5:[function(e,t,r){"use strict";r.base64=!1,r.binary=!1,r.dir=!1,r.createFolders=!0,r.date=null,r.compression=null,r.compressionOptions=null,r.comment=null,r.unixPermissions=null,r.dosPermissions=null},{}],6:[function(e,t,r){"use strict";var n=null;n="undefined"!=typeof Promise?Promise:e("lie"),t.exports={Promise:n}},{lie:37}],7:[function(e,t,r){"use strict";var n="undefined"!=typeof Uint8Array&&"undefined"!=typeof Uint16Array&&"undefined"!=typeof Uint32Array,i=e("pako"),s=e("./utils"),a=e("./stream/GenericWorker"),o=n?"uint8array":"array";function h(e,t){a.call(this,"FlateWorker/"+e),this._pako=null,this._pakoAction=e,this._pakoOptions=t,this.meta={}}r.magic="\b\0",s.inherits(h,a),h.prototype.processChunk=function(e){this.meta=e.meta,null===this._pako&&this._createPako(),this._pako.push(s.transformTo(o,e.data),!1)},h.prototype.flush=function(){a.prototype.flush.call(this),null===this._pako&&this._createPako(),this._pako.push([],!0)},h.prototype.cleanUp=function(){a.prototype.cleanUp.call(this),this._pako=null},h.prototype._createPako=function(){this._pako=new i[this._pakoAction]({raw:!0,level:this._pakoOptions.level||-1});var t=this;this._pako.onData=function(e){t.push({data:e,meta:t.meta})}},r.compressWorker=function(e){return new h("Deflate",e)},r.uncompressWorker=function(){return new h("Inflate",{})}},{"./stream/GenericWorker":28,"./utils":32,pako:38}],8:[function(e,t,r){"use strict";function A(e,t){var r,n="";for(r=0;r<t;r++)n+=String.fromCharCode(255&e),e>>>=8;return n}function n(e,t,r,n,i,s){var a,o,h=e.file,u=e.compression,l=s!==O.utf8encode,f=I.transformTo("string",s(h.name)),c=I.transformTo("string",O.utf8encode(h.name)),d=h.comment,p=I.transformTo("string",s(d)),m=I.transformTo("string",O.utf8encode(d)),_=c.length!==h.name.length,g=m.length!==d.length,b="",v="",y="",w=h.dir,k=h.date,x={crc32:0,compressedSize:0,uncompressedSize:0};t&&!r||(x.crc32=e.crc32,x.compressedSize=e.compressedSize,x.uncompressedSize=e.uncompressedSize);var S=0;t&&(S|=8),l||!_&&!g||(S|=2048);var z=0,C=0;w&&(z|=16),"UNIX"===i?(C=798,z|=function(e,t){var r=e;return e||(r=t?16893:33204),(65535&r)<<16}(h.unixPermissions,w)):(C=20,z|=function(e){return 63&(e||0)}(h.dosPermissions)),a=k.getUTCHours(),a<<=6,a|=k.getUTCMinutes(),a<<=5,a|=k.getUTCSeconds()/2,o=k.getUTCFullYear()-1980,o<<=4,o|=k.getUTCMonth()+1,o<<=5,o|=k.getUTCDate(),_&&(v=A(1,1)+A(B(f),4)+c,b+="up"+A(v.length,2)+v),g&&(y=A(1,1)+A(B(p),4)+m,b+="uc"+A(y.length,2)+y);var E="";return E+="\n\0",E+=A(S,2),E+=u.magic,E+=A(a,2),E+=A(o,2),E+=A(x.crc32,4),E+=A(x.compressedSize,4),E+=A(x.uncompressedSize,4),E+=A(f.length,2),E+=A(b.length,2),{fileRecord:R.LOCAL_FILE_HEADER+E+f+b,dirRecord:R.CENTRAL_FILE_HEADER+A(C,2)+E+A(p.length,2)+"\0\0\0\0"+A(z,4)+A(n,4)+f+b+p}}var I=e("../utils"),i=e("../stream/GenericWorker"),O=e("../utf8"),B=e("../crc32"),R=e("../signature");function s(e,t,r,n){i.call(this,"ZipFileWorker"),this.bytesWritten=0,this.zipComment=t,this.zipPlatform=r,this.encodeFileName=n,this.streamFiles=e,this.accumulate=!1,this.contentBuffer=[],this.dirRecords=[],this.currentSourceOffset=0,this.entriesCount=0,this.currentFile=null,this._sources=[]}I.inherits(s,i),s.prototype.push=function(e){var t=e.meta.percent||0,r=this.entriesCount,n=this._sources.length;this.accumulate?this.contentBuffer.push(e):(this.bytesWritten+=e.data.length,i.prototype.push.call(this,{data:e.data,meta:{currentFile:this.currentFile,percent:r?(t+100*(r-n-1))/r:100}}))},s.prototype.openedSource=function(e){this.currentSourceOffset=this.bytesWritten,this.currentFile=e.file.name;var t=this.streamFiles&&!e.file.dir;if(t){var r=n(e,t,!1,this.currentSourceOffset,this.zipPlatform,this.encodeFileName);this.push({data:r.fileRecord,meta:{percent:0}})}else this.accumulate=!0},s.prototype.closedSource=function(e){this.accumulate=!1;var t=this.streamFiles&&!e.file.dir,r=n(e,t,!0,this.currentSourceOffset,this.zipPlatform,this.encodeFileName);if(this.dirRecords.push(r.dirRecord),t)this.push({data:function(e){return R.DATA_DESCRIPTOR+A(e.crc32,4)+A(e.compressedSize,4)+A(e.uncompressedSize,4)}(e),meta:{percent:100}});else for(this.push({data:r.fileRecord,meta:{percent:0}});this.contentBuffer.length;)this.push(this.contentBuffer.shift());this.currentFile=null},s.prototype.flush=function(){for(var e=this.bytesWritten,t=0;t<this.dirRecords.length;t++)this.push({data:this.dirRecords[t],meta:{percent:100}});var r=this.bytesWritten-e,n=function(e,t,r,n,i){var s=I.transformTo("string",i(n));return R.CENTRAL_DIRECTORY_END+"\0\0\0\0"+A(e,2)+A(e,2)+A(t,4)+A(r,4)+A(s.length,2)+s}(this.dirRecords.length,r,e,this.zipComment,this.encodeFileName);this.push({data:n,meta:{percent:100}})},s.prototype.prepareNextSource=function(){this.previous=this._sources.shift(),this.openedSource(this.previous.streamInfo),this.isPaused?this.previous.pause():this.previous.resume()},s.prototype.registerPrevious=function(e){this._sources.push(e);var t=this;return e.on("data",function(e){t.processChunk(e)}),e.on("end",function(){t.closedSource(t.previous.streamInfo),t._sources.length?t.prepareNextSource():t.end()}),e.on("error",function(e){t.error(e)}),this},s.prototype.resume=function(){return!!i.prototype.resume.call(this)&&(!this.previous&&this._sources.length?(this.prepareNextSource(),!0):this.previous||this._sources.length||this.generatedError?void 0:(this.end(),!0))},s.prototype.error=function(e){var t=this._sources;if(!i.prototype.error.call(this,e))return!1;for(var r=0;r<t.length;r++)try{t[r].error(e)}catch(e){}return!0},s.prototype.lock=function(){i.prototype.lock.call(this);for(var e=this._sources,t=0;t<e.length;t++)e[t].lock()},t.exports=s},{"../crc32":4,"../signature":23,"../stream/GenericWorker":28,"../utf8":31,"../utils":32}],9:[function(e,t,r){"use strict";var u=e("../compressions"),n=e("./ZipFileWorker");r.generateWorker=function(e,a,t){var o=new n(a.streamFiles,t,a.platform,a.encodeFileName),h=0;try{e.forEach(function(e,t){h++;var r=function(e,t){var r=e||t,n=u[r];if(!n)throw new Error(r+" is not a valid compression method !");return n}(t.options.compression,a.compression),n=t.options.compressionOptions||a.compressionOptions||{},i=t.dir,s=t.date;t._compressWorker(r,n).withStreamInfo("file",{name:e,dir:i,date:s,comment:t.comment||"",unixPermissions:t.unixPermissions,dosPermissions:t.dosPermissions}).pipe(o)}),o.entriesCount=h}catch(e){o.error(e)}return o}},{"../compressions":3,"./ZipFileWorker":8}],10:[function(e,t,r){"use strict";function n(){if(!(this instanceof n))return new n;if(arguments.length)throw new Error("The constructor with parameters has been removed in JSZip 3.0, please check the upgrade guide.");this.files=Object.create(null),this.comment=null,this.root="",this.clone=function(){var e=new n;for(var t in this)"function"!=typeof this[t]&&(e[t]=this[t]);return e}}(n.prototype=e("./object")).loadAsync=e("./load"),n.support=e("./support"),n.defaults=e("./defaults"),n.version="3.10.1",n.loadAsync=function(e,t){return(new n).loadAsync(e,t)},n.external=e("./external"),t.exports=n},{"./defaults":5,"./external":6,"./load":11,"./object":15,"./support":30}],11:[function(e,t,r){"use strict";var u=e("./utils"),i=e("./external"),n=e("./utf8"),s=e("./zipEntries"),a=e("./stream/Crc32Probe"),l=e("./nodejsUtils");function f(n){return new i.Promise(function(e,t){var r=n.decompressed.getContentWorker().pipe(new a);r.on("error",function(e){t(e)}).on("end",function(){r.streamInfo.crc32!==n.decompressed.crc32?t(new Error("Corrupted zip : CRC32 mismatch")):e()}).resume()})}t.exports=function(e,o){var h=this;return o=u.extend(o||{},{base64:!1,checkCRC32:!1,optimizedBinaryString:!1,createFolders:!1,decodeFileName:n.utf8decode}),l.isNode&&l.isStream(e)?i.Promise.reject(new Error("JSZip can't accept a stream when loading a zip file.")):u.prepareContent("the loaded zip file",e,!0,o.optimizedBinaryString,o.base64).then(function(e){var t=new s(o);return t.load(e),t}).then(function(e){var t=[i.Promise.resolve(e)],r=e.files;if(o.checkCRC32)for(var n=0;n<r.length;n++)t.push(f(r[n]));return i.Promise.all(t)}).then(function(e){for(var t=e.shift(),r=t.files,n=0;n<r.length;n++){var i=r[n],s=i.fileNameStr,a=u.resolve(i.fileNameStr);h.file(a,i.decompressed,{binary:!0,optimizedBinaryString:!0,date:i.date,dir:i.dir,comment:i.fileCommentStr.length?i.fileCommentStr:null,unixPermissions:i.unixPermissions,dosPermissions:i.dosPermissions,createFolders:o.createFolders}),i.dir||(h.file(a).unsafeOriginalName=s)}return t.zipComment.length&&(h.comment=t.zipComment),h})}},{"./external":6,"./nodejsUtils":14,"./stream/Crc32Probe":25,"./utf8":31,"./utils":32,"./zipEntries":33}],12:[function(e,t,r){"use strict";var n=e("../utils"),i=e("../stream/GenericWorker");function s(e,t){i.call(this,"Nodejs stream input adapter for "+e),this._upstreamEnded=!1,this._bindStream(t)}n.inherits(s,i),s.prototype._bindStream=function(e){var t=this;(this._stream=e).pause(),e.on("data",function(e){t.push({data:e,meta:{percent:0}})}).on("error",function(e){t.isPaused?this.generatedError=e:t.error(e)}).on("end",function(){t.isPaused?t._upstreamEnded=!0:t.end()})},s.prototype.pause=function(){return!!i.prototype.pause.call(this)&&(this._stream.pause(),!0)},s.prototype.resume=function(){return!!i.prototype.resume.call(this)&&(this._upstreamEnded?this.end():this._stream.resume(),!0)},t.exports=s},{"../stream/GenericWorker":28,"../utils":32}],13:[function(e,t,r){"use strict";var i=e("readable-stream").Readable;function n(e,t,r){i.call(this,t),this._helper=e;var n=this;e.on("data",function(e,t){n.push(e)||n._helper.pause(),r&&r(t)}).on("error",function(e){n.emit("error",e)}).on("end",function(){n.push(null)})}e("../utils").inherits(n,i),n.prototype._read=function(){this._helper.resume()},t.exports=n},{"../utils":32,"readable-stream":16}],14:[function(e,t,r){"use strict";t.exports={isNode:"undefined"!=typeof Buffer,newBufferFrom:function(e,t){if(Buffer.from&&Buffer.from!==Uint8Array.from)return Buffer.from(e,t);if("number"==typeof e)throw new Error('The "data" argument must not be a number');return new Buffer(e,t)},allocBuffer:function(e){if(Buffer.alloc)return Buffer.alloc(e);var t=new Buffer(e);return t.fill(0),t},isBuffer:function(e){return Buffer.isBuffer(e)},isStream:function(e){return e&&"function"==typeof e.on&&"function"==typeof e.pause&&"function"==typeof e.resume}}},{}],15:[function(e,t,r){"use strict";function s(e,t,r){var n,i=u.getTypeOf(t),s=u.extend(r||{},f);s.date=s.date||new Date,null!==s.compression&&(s.compression=s.compression.toUpperCase()),"string"==typeof s.unixPermissions&&(s.unixPermissions=parseInt(s.unixPermissions,8)),s.unixPermissions&&16384&s.unixPermissions&&(s.dir=!0),s.dosPermissions&&16&s.dosPermissions&&(s.dir=!0),s.dir&&(e=g(e)),s.createFolders&&(n=_(e))&&b.call(this,n,!0);var a="string"===i&&!1===s.binary&&!1===s.base64;r&&void 0!==r.binary||(s.binary=!a),(t instanceof c&&0===t.uncompressedSize||s.dir||!t||0===t.length)&&(s.base64=!1,s.binary=!0,t="",s.compression="STORE",i="string");var o=null;o=t instanceof c||t instanceof l?t:p.isNode&&p.isStream(t)?new m(e,t):u.prepareContent(e,t,s.binary,s.optimizedBinaryString,s.base64);var h=new d(e,o,s);this.files[e]=h}var i=e("./utf8"),u=e("./utils"),l=e("./stream/GenericWorker"),a=e("./stream/StreamHelper"),f=e("./defaults"),c=e("./compressedObject"),d=e("./zipObject"),o=e("./generate"),p=e("./nodejsUtils"),m=e("./nodejs/NodejsStreamInputAdapter"),_=function(e){"/"===e.slice(-1)&&(e=e.substring(0,e.length-1));var t=e.lastIndexOf("/");return 0<t?e.substring(0,t):""},g=function(e){return"/"!==e.slice(-1)&&(e+="/"),e},b=function(e,t){return t=void 0!==t?t:f.createFolders,e=g(e),this.files[e]||s.call(this,e,null,{dir:!0,createFolders:t}),this.files[e]};function h(e){return"[object RegExp]"===Object.prototype.toString.call(e)}var n={load:function(){throw new Error("This method has been removed in JSZip 3.0, please check the upgrade guide.")},forEach:function(e){var t,r,n;for(t in this.files)n=this.files[t],(r=t.slice(this.root.length,t.length))&&t.slice(0,this.root.length)===this.root&&e(r,n)},filter:function(r){var n=[];return this.forEach(function(e,t){r(e,t)&&n.push(t)}),n},file:function(e,t,r){if(1!==arguments.length)return e=this.root+e,s.call(this,e,t,r),this;if(h(e)){var n=e;return this.filter(function(e,t){return!t.dir&&n.test(e)})}var i=this.files[this.root+e];return i&&!i.dir?i:null},folder:function(r){if(!r)return this;if(h(r))return this.filter(function(e,t){return t.dir&&r.test(e)});var e=this.root+r,t=b.call(this,e),n=this.clone();return n.root=t.name,n},remove:function(r){r=this.root+r;var e=this.files[r];if(e||("/"!==r.slice(-1)&&(r+="/"),e=this.files[r]),e&&!e.dir)delete this.files[r];else for(var t=this.filter(function(e,t){return t.name.slice(0,r.length)===r}),n=0;n<t.length;n++)delete this.files[t[n].name];return this},generate:function(){throw new Error("This method has been removed in JSZip 3.0, please check the upgrade guide.")},generateInternalStream:function(e){var t,r={};try{if((r=u.extend(e||{},{streamFiles:!1,compression:"STORE",compressionOptions:null,type:"",platform:"DOS",comment:null,mimeType:"application/zip",encodeFileName:i.utf8encode})).type=r.type.toLowerCase(),r.compression=r.compression.toUpperCase(),"binarystring"===r.type&&(r.type="string"),!r.type)throw new Error("No output type specified.");u.checkSupport(r.type),"darwin"!==r.platform&&"freebsd"!==r.platform&&"linux"!==r.platform&&"sunos"!==r.platform||(r.platform="UNIX"),"win32"===r.platform&&(r.platform="DOS");var n=r.comment||this.comment||"";t=o.generateWorker(this,r,n)}catch(e){(t=new l("error")).error(e)}return new a(t,r.type||"string",r.mimeType)},generateAsync:function(e,t){return this.generateInternalStream(e).accumulate(t)},generateNodeStream:function(e,t){return(e=e||{}).type||(e.type="nodebuffer"),this.generateInternalStream(e).toNodejsStream(t)}};t.exports=n},{"./compressedObject":2,"./defaults":5,"./generate":9,"./nodejs/NodejsStreamInputAdapter":12,"./nodejsUtils":14,"./stream/GenericWorker":28,"./stream/StreamHelper":29,"./utf8":31,"./utils":32,"./zipObject":35}],16:[function(e,t,r){"use strict";t.exports=e("stream")},{stream:void 0}],17:[function(e,t,r){"use strict";var n=e("./DataReader");function i(e){n.call(this,e);for(var t=0;t<this.data.length;t++)e[t]=255&e[t]}e("../utils").inherits(i,n),i.prototype.byteAt=function(e){return this.data[this.zero+e]},i.prototype.lastIndexOfSignature=function(e){for(var t=e.charCodeAt(0),r=e.charCodeAt(1),n=e.charCodeAt(2),i=e.charCodeAt(3),s=this.length-4;0<=s;--s)if(this.data[s]===t&&this.data[s+1]===r&&this.data[s+2]===n&&this.data[s+3]===i)return s-this.zero;return-1},i.prototype.readAndCheckSignature=function(e){var t=e.charCodeAt(0),r=e.charCodeAt(1),n=e.charCodeAt(2),i=e.charCodeAt(3),s=this.readData(4);return t===s[0]&&r===s[1]&&n===s[2]&&i===s[3]},i.prototype.readData=function(e){if(this.checkOffset(e),0===e)return[];var t=this.data.slice(this.zero+this.index,this.zero+this.index+e);return this.index+=e,t},t.exports=i},{"../utils":32,"./DataReader":18}],18:[function(e,t,r){"use strict";var n=e("../utils");function i(e){this.data=e,this.length=e.length,this.index=0,this.zero=0}i.prototype={checkOffset:function(e){this.checkIndex(this.index+e)},checkIndex:function(e){if(this.length<this.zero+e||e<0)throw new Error("End of data reached (data length = "+this.length+", asked index = "+e+"). Corrupted zip ?")},setIndex:function(e){this.checkIndex(e),this.index=e},skip:function(e){this.setIndex(this.index+e)},byteAt:function(){},readInt:function(e){var t,r=0;for(this.checkOffset(e),t=this.index+e-1;t>=this.index;t--)r=(r<<8)+this.byteAt(t);return this.index+=e,r},readString:function(e){return n.transformTo("string",this.readData(e))},readData:function(){},lastIndexOfSignature:function(){},readAndCheckSignature:function(){},readDate:function(){var e=this.readInt(4);return new Date(Date.UTC(1980+(e>>25&127),(e>>21&15)-1,e>>16&31,e>>11&31,e>>5&63,(31&e)<<1))}},t.exports=i},{"../utils":32}],19:[function(e,t,r){"use strict";var n=e("./Uint8ArrayReader");function i(e){n.call(this,e)}e("../utils").inherits(i,n),i.prototype.readData=function(e){this.checkOffset(e);var t=this.data.slice(this.zero+this.index,this.zero+this.index+e);return this.index+=e,t},t.exports=i},{"../utils":32,"./Uint8ArrayReader":21}],20:[function(e,t,r){"use strict";var n=e("./DataReader");function i(e){n.call(this,e)}e("../utils").inherits(i,n),i.prototype.byteAt=function(e){return this.data.charCodeAt(this.zero+e)},i.prototype.lastIndexOfSignature=function(e){return this.data.lastIndexOf(e)-this.zero},i.prototype.readAndCheckSignature=function(e){return e===this.readData(4)},i.prototype.readData=function(e){this.checkOffset(e);var t=this.data.slice(this.zero+this.index,this.zero+this.index+e);return this.index+=e,t},t.exports=i},{"../utils":32,"./DataReader":18}],21:[function(e,t,r){"use strict";var n=e("./ArrayReader");function i(e){n.call(this,e)}e("../utils").inherits(i,n),i.prototype.readData=function(e){if(this.checkOffset(e),0===e)return new Uint8Array(0);var t=this.data.subarray(this.zero+this.index,this.zero+this.index+e);return this.index+=e,t},t.exports=i},{"../utils":32,"./ArrayReader":17}],22:[function(e,t,r){"use strict";var n=e("../utils"),i=e("../support"),s=e("./ArrayReader"),a=e("./StringReader"),o=e("./NodeBufferReader"),h=e("./Uint8ArrayReader");t.exports=function(e){var t=n.getTypeOf(e);return n.checkSupport(t),"string"!==t||i.uint8array?"nodebuffer"===t?new o(e):i.uint8array?new h(n.transformTo("uint8array",e)):new s(n.transformTo("array",e)):new a(e)}},{"../support":30,"../utils":32,"./ArrayReader":17,"./NodeBufferReader":19,"./StringReader":20,"./Uint8ArrayReader":21}],23:[function(e,t,r){"use strict";r.LOCAL_FILE_HEADER="PK",r.CENTRAL_FILE_HEADER="PK",r.CENTRAL_DIRECTORY_END="PK",r.ZIP64_CENTRAL_DIRECTORY_LOCATOR="PK",r.ZIP64_CENTRAL_DIRECTORY_END="PK",r.DATA_DESCRIPTOR="PK\b"},{}],24:[function(e,t,r){"use strict";var n=e("./GenericWorker"),i=e("../utils");function s(e){n.call(this,"ConvertWorker to "+e),this.destType=e}i.inherits(s,n),s.prototype.processChunk=function(e){this.push({data:i.transformTo(this.destType,e.data),meta:e.meta})},t.exports=s},{"../utils":32,"./GenericWorker":28}],25:[function(e,t,r){"use strict";var n=e("./GenericWorker"),i=e("../crc32");function s(){n.call(this,"Crc32Probe"),this.withStreamInfo("crc32",0)}e("../utils").inherits(s,n),s.prototype.processChunk=function(e){this.streamInfo.crc32=i(e.data,this.streamInfo.crc32||0),this.push(e)},t.exports=s},{"../crc32":4,"../utils":32,"./GenericWorker":28}],26:[function(e,t,r){"use strict";var n=e("../utils"),i=e("./GenericWorker");function s(e){i.call(this,"DataLengthProbe for "+e),this.propName=e,this.withStreamInfo(e,0)}n.inherits(s,i),s.prototype.processChunk=function(e){if(e){var t=this.streamInfo[this.propName]||0;this.streamInfo[this.propName]=t+e.data.length}i.prototype.processChunk.call(this,e)},t.exports=s},{"../utils":32,"./GenericWorker":28}],27:[function(e,t,r){"use strict";var n=e("../utils"),i=e("./GenericWorker");function s(e){i.call(this,"DataWorker");var t=this;this.dataIsReady=!1,this.index=0,this.max=0,this.data=null,this.type="",this._tickScheduled=!1,e.then(function(e){t.dataIsReady=!0,t.data=e,t.max=e&&e.length||0,t.type=n.getTypeOf(e),t.isPaused||t._tickAndRepeat()},function(e){t.error(e)})}n.inherits(s,i),s.prototype.cleanUp=function(){i.prototype.cleanUp.call(this),this.data=null},s.prototype.resume=function(){return!!i.prototype.resume.call(this)&&(!this._tickScheduled&&this.dataIsReady&&(this._tickScheduled=!0,n.delay(this._tickAndRepeat,[],this)),!0)},s.prototype._tickAndRepeat=function(){this._tickScheduled=!1,this.isPaused||this.isFinished||(this._tick(),this.isFinished||(n.delay(this._tickAndRepeat,[],this),this._tickScheduled=!0))},s.prototype._tick=function(){if(this.isPaused||this.isFinished)return!1;var e=null,t=Math.min(this.max,this.index+16384);if(this.index>=this.max)return this.end();switch(this.type){case"string":e=this.data.substring(this.index,t);break;case"uint8array":e=this.data.subarray(this.index,t);break;case"array":case"nodebuffer":e=this.data.slice(this.index,t)}return this.index=t,this.push({data:e,meta:{percent:this.max?this.index/this.max*100:0}})},t.exports=s},{"../utils":32,"./GenericWorker":28}],28:[function(e,t,r){"use strict";function n(e){this.name=e||"default",this.streamInfo={},this.generatedError=null,this.extraStreamInfo={},this.isPaused=!0,this.isFinished=!1,this.isLocked=!1,this._listeners={data:[],end:[],error:[]},this.previous=null}n.prototype={push:function(e){this.emit("data",e)},end:function(){if(this.isFinished)return!1;this.flush();try{this.emit("end"),this.cleanUp(),this.isFinished=!0}catch(e){this.emit("error",e)}return!0},error:function(e){return!this.isFinished&&(this.isPaused?this.generatedError=e:(this.isFinished=!0,this.emit("error",e),this.previous&&this.previous.error(e),this.cleanUp()),!0)},on:function(e,t){return this._listeners[e].push(t),this},cleanUp:function(){this.streamInfo=this.generatedError=this.extraStreamInfo=null,this._listeners=[]},emit:function(e,t){if(this._listeners[e])for(var r=0;r<this._listeners[e].length;r++)this._listeners[e][r].call(this,t)},pipe:function(e){return e.registerPrevious(this)},registerPrevious:function(e){if(this.isLocked)throw new Error("The stream '"+this+"' has already been used.");this.streamInfo=e.streamInfo,this.mergeStreamInfo(),this.previous=e;var t=this;return e.on("data",function(e){t.processChunk(e)}),e.on("end",function(){t.end()}),e.on("error",function(e){t.error(e)}),this},pause:function(){return!this.isPaused&&!this.isFinished&&(this.isPaused=!0,this.previous&&this.previous.pause(),!0)},resume:function(){if(!this.isPaused||this.isFinished)return!1;var e=this.isPaused=!1;return this.generatedError&&(this.error(this.generatedError),e=!0),this.previous&&this.previous.resume(),!e},flush:function(){},processChunk:function(e){this.push(e)},withStreamInfo:function(e,t){return this.extraStreamInfo[e]=t,this.mergeStreamInfo(),this},mergeStreamInfo:function(){for(var e in this.extraStreamInfo)Object.prototype.hasOwnProperty.call(this.extraStreamInfo,e)&&(this.streamInfo[e]=this.extraStreamInfo[e])},lock:function(){if(this.isLocked)throw new Error("The stream '"+this+"' has already been used.");this.isLocked=!0,this.previous&&this.previous.lock()},toString:function(){var e="Worker "+this.name;return this.previous?this.previous+" -> "+e:e}},t.exports=n},{}],29:[function(e,t,r){"use strict";var h=e("../utils"),i=e("./ConvertWorker"),s=e("./GenericWorker"),u=e("../base64"),n=e("../support"),a=e("../external"),o=null;if(n.nodestream)try{o=e("../nodejs/NodejsStreamOutputAdapter")}catch(e){}function l(e,o){return new a.Promise(function(t,r){var n=[],i=e._internalType,s=e._outputType,a=e._mimeType;e.on("data",function(e,t){n.push(e),o&&o(t)}).on("error",function(e){n=[],r(e)}).on("end",function(){try{var e=function(e,t,r){switch(e){case"blob":return h.newBlob(h.transformTo("arraybuffer",t),r);case"base64":return u.encode(t);default:return h.transformTo(e,t)}}(s,function(e,t){var r,n=0,i=null,s=0;for(r=0;r<t.length;r++)s+=t[r].length;switch(e){case"string":return t.join("");case"array":return Array.prototype.concat.apply([],t);case"uint8array":for(i=new Uint8Array(s),r=0;r<t.length;r++)i.set(t[r],n),n+=t[r].length;return i;case"nodebuffer":return Buffer.concat(t);default:throw new Error("concat : unsupported type '"+e+"'")}}(i,n),a);t(e)}catch(e){r(e)}n=[]}).resume()})}function f(e,t,r){var n=t;switch(t){case"blob":case"arraybuffer":n="uint8array";break;case"base64":n="string"}try{this._internalType=n,this._outputType=t,this._mimeType=r,h.checkSupport(n),this._worker=e.pipe(new i(n)),e.lock()}catch(e){this._worker=new s("error"),this._worker.error(e)}}f.prototype={accumulate:function(e){return l(this,e)},on:function(e,t){var r=this;return"data"===e?this._worker.on(e,function(e){t.call(r,e.data,e.meta)}):this._worker.on(e,function(){h.delay(t,arguments,r)}),this},resume:function(){return h.delay(this._worker.resume,[],this._worker),this},pause:function(){return this._worker.pause(),this},toNodejsStream:function(e){if(h.checkSupport("nodestream"),"nodebuffer"!==this._outputType)throw new Error(this._outputType+" is not supported by this method");return new o(this,{objectMode:"nodebuffer"!==this._outputType},e)}},t.exports=f},{"../base64":1,"../external":6,"../nodejs/NodejsStreamOutputAdapter":13,"../support":30,"../utils":32,"./ConvertWorker":24,"./GenericWorker":28}],30:[function(e,t,r){"use strict";if(r.base64=!0,r.array=!0,r.string=!0,r.arraybuffer="undefined"!=typeof ArrayBuffer&&"undefined"!=typeof Uint8Array,r.nodebuffer="undefined"!=typeof Buffer,r.uint8array="undefined"!=typeof Uint8Array,"undefined"==typeof ArrayBuffer)r.blob=!1;else{var n=new ArrayBuffer(0);try{r.blob=0===new Blob([n],{type:"application/zip"}).size}catch(e){try{var i=new(self.BlobBuilder||self.WebKitBlobBuilder||self.MozBlobBuilder||self.MSBlobBuilder);i.append(n),r.blob=0===i.getBlob("application/zip").size}catch(e){r.blob=!1}}}try{r.nodestream=!!e("readable-stream").Readable}catch(e){r.nodestream=!1}},{"readable-stream":16}],31:[function(e,t,s){"use strict";for(var o=e("./utils"),h=e("./support"),r=e("./nodejsUtils"),n=e("./stream/GenericWorker"),u=new Array(256),i=0;i<256;i++)u[i]=252<=i?6:248<=i?5:240<=i?4:224<=i?3:192<=i?2:1;u[254]=u[254]=1;function a(){n.call(this,"utf-8 decode"),this.leftOver=null}function l(){n.call(this,"utf-8 encode")}s.utf8encode=function(e){return h.nodebuffer?r.newBufferFrom(e,"utf-8"):function(e){var t,r,n,i,s,a=e.length,o=0;for(i=0;i<a;i++)55296==(64512&(r=e.charCodeAt(i)))&&i+1<a&&56320==(64512&(n=e.charCodeAt(i+1)))&&(r=65536+(r-55296<<10)+(n-56320),i++),o+=r<128?1:r<2048?2:r<65536?3:4;for(t=h.uint8array?new Uint8Array(o):new Array(o),i=s=0;s<o;i++)55296==(64512&(r=e.charCodeAt(i)))&&i+1<a&&56320==(64512&(n=e.charCodeAt(i+1)))&&(r=65536+(r-55296<<10)+(n-56320),i++),r<128?t[s++]=r:(r<2048?t[s++]=192|r>>>6:(r<65536?t[s++]=224|r>>>12:(t[s++]=240|r>>>18,t[s++]=128|r>>>12&63),t[s++]=128|r>>>6&63),t[s++]=128|63&r);return t}(e)},s.utf8decode=function(e){return h.nodebuffer?o.transformTo("nodebuffer",e).toString("utf-8"):function(e){var t,r,n,i,s=e.length,a=new Array(2*s);for(t=r=0;t<s;)if((n=e[t++])<128)a[r++]=n;else if(4<(i=u[n]))a[r++]=65533,t+=i-1;else{for(n&=2===i?31:3===i?15:7;1<i&&t<s;)n=n<<6|63&e[t++],i--;1<i?a[r++]=65533:n<65536?a[r++]=n:(n-=65536,a[r++]=55296|n>>10&1023,a[r++]=56320|1023&n)}return a.length!==r&&(a.subarray?a=a.subarray(0,r):a.length=r),o.applyFromCharCode(a)}(e=o.transformTo(h.uint8array?"uint8array":"array",e))},o.inherits(a,n),a.prototype.processChunk=function(e){var t=o.transformTo(h.uint8array?"uint8array":"array",e.data);if(this.leftOver&&this.leftOver.length){if(h.uint8array){var r=t;(t=new Uint8Array(r.length+this.leftOver.length)).set(this.leftOver,0),t.set(r,this.leftOver.length)}else t=this.leftOver.concat(t);this.leftOver=null}var n=function(e,t){var r;for((t=t||e.length)>e.length&&(t=e.length),r=t-1;0<=r&&128==(192&e[r]);)r--;return r<0?t:0===r?t:r+u[e[r]]>t?r:t}(t),i=t;n!==t.length&&(h.uint8array?(i=t.subarray(0,n),this.leftOver=t.subarray(n,t.length)):(i=t.slice(0,n),this.leftOver=t.slice(n,t.length))),this.push({data:s.utf8decode(i),meta:e.meta})},a.prototype.flush=function(){this.leftOver&&this.leftOver.length&&(this.push({data:s.utf8decode(this.leftOver),meta:{}}),this.leftOver=null)},s.Utf8DecodeWorker=a,o.inherits(l,n),l.prototype.processChunk=function(e){this.push({data:s.utf8encode(e.data),meta:e.meta})},s.Utf8EncodeWorker=l},{"./nodejsUtils":14,"./stream/GenericWorker":28,"./support":30,"./utils":32}],32:[function(e,t,a){"use strict";var o=e("./support"),h=e("./base64"),r=e("./nodejsUtils"),u=e("./external");function n(e){return e}function l(e,t){for(var r=0;r<e.length;++r)t[r]=255&e.charCodeAt(r);return t}e("setimmediate"),a.newBlob=function(t,r){a.checkSupport("blob");try{return new Blob([t],{type:r})}catch(e){try{var n=new(self.BlobBuilder||self.WebKitBlobBuilder||self.MozBlobBuilder||self.MSBlobBuilder);return n.append(t),n.getBlob(r)}catch(e){throw new Error("Bug : can't construct the Blob.")}}};var i={stringifyByChunk:function(e,t,r){var n=[],i=0,s=e.length;if(s<=r)return String.fromCharCode.apply(null,e);for(;i<s;)"array"===t||"nodebuffer"===t?n.push(String.fromCharCode.apply(null,e.slice(i,Math.min(i+r,s)))):n.push(String.fromCharCode.apply(null,e.subarray(i,Math.min(i+r,s)))),i+=r;return n.join("")},stringifyByChar:function(e){for(var t="",r=0;r<e.length;r++)t+=String.fromCharCode(e[r]);return t},applyCanBeUsed:{uint8array:function(){try{return o.uint8array&&1===String.fromCharCode.apply(null,new Uint8Array(1)).length}catch(e){return!1}}(),nodebuffer:function(){try{return o.nodebuffer&&1===String.fromCharCode.apply(null,r.allocBuffer(1)).length}catch(e){return!1}}()}};function s(e){var t=65536,r=a.getTypeOf(e),n=!0;if("uint8array"===r?n=i.applyCanBeUsed.uint8array:"nodebuffer"===r&&(n=i.applyCanBeUsed.nodebuffer),n)for(;1<t;)try{return i.stringifyByChunk(e,r,t)}catch(e){t=Math.floor(t/2)}return i.stringifyByChar(e)}function f(e,t){for(var r=0;r<e.length;r++)t[r]=e[r];return t}a.applyFromCharCode=s;var c={};c.string={string:n,array:function(e){return l(e,new Array(e.length))},arraybuffer:function(e){return c.string.uint8array(e).buffer},uint8array:function(e){return l(e,new Uint8Array(e.length))},nodebuffer:function(e){return l(e,r.allocBuffer(e.length))}},c.array={string:s,array:n,arraybuffer:function(e){return new Uint8Array(e).buffer},uint8array:function(e){return new Uint8Array(e)},nodebuffer:function(e){return r.newBufferFrom(e)}},c.arraybuffer={string:function(e){return s(new Uint8Array(e))},array:function(e){return f(new Uint8Array(e),new Array(e.byteLength))},arraybuffer:n,uint8array:function(e){return new Uint8Array(e)},nodebuffer:function(e){return r.newBufferFrom(new Uint8Array(e))}},c.uint8array={string:s,array:function(e){return f(e,new Array(e.length))},arraybuffer:function(e){return e.buffer},uint8array:n,nodebuffer:function(e){return r.newBufferFrom(e)}},c.nodebuffer={string:s,array:function(e){return f(e,new Array(e.length))},arraybuffer:function(e){return c.nodebuffer.uint8array(e).buffer},uint8array:function(e){return f(e,new Uint8Array(e.length))},nodebuffer:n},a.transformTo=function(e,t){if(t=t||"",!e)return t;a.checkSupport(e);var r=a.getTypeOf(t);return c[r][e](t)},a.resolve=function(e){for(var t=e.split("/"),r=[],n=0;n<t.length;n++){var i=t[n];"."===i||""===i&&0!==n&&n!==t.length-1||(".."===i?r.pop():r.push(i))}return r.join("/")},a.getTypeOf=function(e){return"string"==typeof e?"string":"[object Array]"===Object.prototype.toString.call(e)?"array":o.nodebuffer&&r.isBuffer(e)?"nodebuffer":o.uint8array&&e instanceof Uint8Array?"uint8array":o.arraybuffer&&e instanceof ArrayBuffer?"arraybuffer":void 0},a.checkSupport=function(e){if(!o[e.toLowerCase()])throw new Error(e+" is not supported by this platform")},a.MAX_VALUE_16BITS=65535,a.MAX_VALUE_32BITS=-1,a.pretty=function(e){var t,r,n="";for(r=0;r<(e||"").length;r++)n+="\\x"+((t=e.charCodeAt(r))<16?"0":"")+t.toString(16).toUpperCase();return n},a.delay=function(e,t,r){setImmediate(function(){e.apply(r||null,t||[])})},a.inherits=function(e,t){function r(){}r.prototype=t.prototype,e.prototype=new r},a.extend=function(){var e,t,r={};for(e=0;e<arguments.length;e++)for(t in arguments[e])Object.prototype.hasOwnProperty.call(arguments[e],t)&&void 0===r[t]&&(r[t]=arguments[e][t]);return r},a.prepareContent=function(r,e,n,i,s){return u.Promise.resolve(e).then(function(n){return o.blob&&(n instanceof Blob||-1!==["[object File]","[object Blob]"].indexOf(Object.prototype.toString.call(n)))&&"undefined"!=typeof FileReader?new u.Promise(function(t,r){var e=new FileReader;e.onload=function(e){t(e.target.result)},e.onerror=function(e){r(e.target.error)},e.readAsArrayBuffer(n)}):n}).then(function(e){var t=a.getTypeOf(e);return t?("arraybuffer"===t?e=a.transformTo("uint8array",e):"string"===t&&(s?e=h.decode(e):n&&!0!==i&&(e=function(e){return l(e,o.uint8array?new Uint8Array(e.length):new Array(e.length))}(e))),e):u.Promise.reject(new Error("Can't read the data of '"+r+"'. Is it in a supported JavaScript type (String, Blob, ArrayBuffer, etc) ?"))})}},{"./base64":1,"./external":6,"./nodejsUtils":14,"./support":30,setimmediate:54}],33:[function(e,t,r){"use strict";var n=e("./reader/readerFor"),i=e("./utils"),s=e("./signature"),a=e("./zipEntry"),o=e("./support");function h(e){this.files=[],this.loadOptions=e}h.prototype={checkSignature:function(e){if(!this.reader.readAndCheckSignature(e)){this.reader.index-=4;var t=this.reader.readString(4);throw new Error("Corrupted zip or bug: unexpected signature ("+i.pretty(t)+", expected "+i.pretty(e)+")")}},isSignature:function(e,t){var r=this.reader.index;this.reader.setIndex(e);var n=this.reader.readString(4)===t;return this.reader.setIndex(r),n},readBlockEndOfCentral:function(){this.diskNumber=this.reader.readInt(2),this.diskWithCentralDirStart=this.reader.readInt(2),this.centralDirRecordsOnThisDisk=this.reader.readInt(2),this.centralDirRecords=this.reader.readInt(2),this.centralDirSize=this.reader.readInt(4),this.centralDirOffset=this.reader.readInt(4),this.zipCommentLength=this.reader.readInt(2);var e=this.reader.readData(this.zipCommentLength),t=o.uint8array?"uint8array":"array",r=i.transformTo(t,e);this.zipComment=this.loadOptions.decodeFileName(r)},readBlockZip64EndOfCentral:function(){this.zip64EndOfCentralSize=this.reader.readInt(8),this.reader.skip(4),this.diskNumber=this.reader.readInt(4),this.diskWithCentralDirStart=this.reader.readInt(4),this.centralDirRecordsOnThisDisk=this.reader.readInt(8),this.centralDirRecords=this.reader.readInt(8),this.centralDirSize=this.reader.readInt(8),this.centralDirOffset=this.reader.readInt(8),this.zip64ExtensibleData={};for(var e,t,r,n=this.zip64EndOfCentralSize-44;0<n;)e=this.reader.readInt(2),t=this.reader.readInt(4),r=this.reader.readData(t),this.zip64ExtensibleData[e]={id:e,length:t,value:r}},readBlockZip64EndOfCentralLocator:function(){if(this.diskWithZip64CentralDirStart=this.reader.readInt(4),this.relativeOffsetEndOfZip64CentralDir=this.reader.readInt(8),this.disksCount=this.reader.readInt(4),1<this.disksCount)throw new Error("Multi-volumes zip are not supported")},readLocalFiles:function(){var e,t;for(e=0;e<this.files.length;e++)t=this.files[e],this.reader.setIndex(t.localHeaderOffset),this.checkSignature(s.LOCAL_FILE_HEADER),t.readLocalPart(this.reader),t.handleUTF8(),t.processAttributes()},readCentralDir:function(){var e;for(this.reader.setIndex(this.centralDirOffset);this.reader.readAndCheckSignature(s.CENTRAL_FILE_HEADER);)(e=new a({zip64:this.zip64},this.loadOptions)).readCentralPart(this.reader),this.files.push(e);if(this.centralDirRecords!==this.files.length&&0!==this.centralDirRecords&&0===this.files.length)throw new Error("Corrupted zip or bug: expected "+this.centralDirRecords+" records in central dir, got "+this.files.length)},readEndOfCentral:function(){var e=this.reader.lastIndexOfSignature(s.CENTRAL_DIRECTORY_END);if(e<0)throw!this.isSignature(0,s.LOCAL_FILE_HEADER)?new Error("Can't find end of central directory : is this a zip file ? If it is, see https://stuk.github.io/jszip/documentation/howto/read_zip.html"):new Error("Corrupted zip: can't find end of central directory");this.reader.setIndex(e);var t=e;if(this.checkSignature(s.CENTRAL_DIRECTORY_END),this.readBlockEndOfCentral(),this.diskNumber===i.MAX_VALUE_16BITS||this.diskWithCentralDirStart===i.MAX_VALUE_16BITS||this.centralDirRecordsOnThisDisk===i.MAX_VALUE_16BITS||this.centralDirRecords===i.MAX_VALUE_16BITS||this.centralDirSize===i.MAX_VALUE_32BITS||this.centralDirOffset===i.MAX_VALUE_32BITS){if(this.zip64=!0,(e=this.reader.lastIndexOfSignature(s.ZIP64_CENTRAL_DIRECTORY_LOCATOR))<0)throw new Error("Corrupted zip: can't find the ZIP64 end of central directory locator");if(this.reader.setIndex(e),this.checkSignature(s.ZIP64_CENTRAL_DIRECTORY_LOCATOR),this.readBlockZip64EndOfCentralLocator(),!this.isSignature(this.relativeOffsetEndOfZip64CentralDir,s.ZIP64_CENTRAL_DIRECTORY_END)&&(this.relativeOffsetEndOfZip64CentralDir=this.reader.lastIndexOfSignature(s.ZIP64_CENTRAL_DIRECTORY_END),this.relativeOffsetEndOfZip64CentralDir<0))throw new Error("Corrupted zip: can't find the ZIP64 end of central directory");this.reader.setIndex(this.relativeOffsetEndOfZip64CentralDir),this.checkSignature(s.ZIP64_CENTRAL_DIRECTORY_END),this.readBlockZip64EndOfCentral()}var r=this.centralDirOffset+this.centralDirSize;this.zip64&&(r+=20,r+=12+this.zip64EndOfCentralSize);var n=t-r;if(0<n)this.isSignature(t,s.CENTRAL_FILE_HEADER)||(this.reader.zero=n);else if(n<0)throw new Error("Corrupted zip: missing "+Math.abs(n)+" bytes.")},prepareReader:function(e){this.reader=n(e)},load:function(e){this.prepareReader(e),this.readEndOfCentral(),this.readCentralDir(),this.readLocalFiles()}},t.exports=h},{"./reader/readerFor":22,"./signature":23,"./support":30,"./utils":32,"./zipEntry":34}],34:[function(e,t,r){"use strict";var n=e("./reader/readerFor"),s=e("./utils"),i=e("./compressedObject"),a=e("./crc32"),o=e("./utf8"),h=e("./compressions"),u=e("./support");function l(e,t){this.options=e,this.loadOptions=t}l.prototype={isEncrypted:function(){return 1==(1&this.bitFlag)},useUTF8:function(){return 2048==(2048&this.bitFlag)},readLocalPart:function(e){var t,r;if(e.skip(22),this.fileNameLength=e.readInt(2),r=e.readInt(2),this.fileName=e.readData(this.fileNameLength),e.skip(r),-1===this.compressedSize||-1===this.uncompressedSize)throw new Error("Bug or corrupted zip : didn't get enough information from the central directory (compressedSize === -1 || uncompressedSize === -1)");if(null===(t=function(e){for(var t in h)if(Object.prototype.hasOwnProperty.call(h,t)&&h[t].magic===e)return h[t];return null}(this.compressionMethod)))throw new Error("Corrupted zip : compression "+s.pretty(this.compressionMethod)+" unknown (inner file : "+s.transformTo("string",this.fileName)+")");this.decompressed=new i(this.compressedSize,this.uncompressedSize,this.crc32,t,e.readData(this.compressedSize))},readCentralPart:function(e){this.versionMadeBy=e.readInt(2),e.skip(2),this.bitFlag=e.readInt(2),this.compressionMethod=e.readString(2),this.date=e.readDate(),this.crc32=e.readInt(4),this.compressedSize=e.readInt(4),this.uncompressedSize=e.readInt(4);var t=e.readInt(2);if(this.extraFieldsLength=e.readInt(2),this.fileCommentLength=e.readInt(2),this.diskNumberStart=e.readInt(2),this.internalFileAttributes=e.readInt(2),this.externalFileAttributes=e.readInt(4),this.localHeaderOffset=e.readInt(4),this.isEncrypted())throw new Error("Encrypted zip are not supported");e.skip(t),this.readExtraFields(e),this.parseZIP64ExtraField(e),this.fileComment=e.readData(this.fileCommentLength)},processAttributes:function(){this.unixPermissions=null,this.dosPermissions=null;var e=this.versionMadeBy>>8;this.dir=!!(16&this.externalFileAttributes),0==e&&(this.dosPermissions=63&this.externalFileAttributes),3==e&&(this.unixPermissions=this.externalFileAttributes>>16&65535),this.dir||"/"!==this.fileNameStr.slice(-1)||(this.dir=!0)},parseZIP64ExtraField:function(){if(this.extraFields[1]){var e=n(this.extraFields[1].value);this.uncompressedSize===s.MAX_VALUE_32BITS&&(this.uncompressedSize=e.readInt(8)),this.compressedSize===s.MAX_VALUE_32BITS&&(this.compressedSize=e.readInt(8)),this.localHeaderOffset===s.MAX_VALUE_32BITS&&(this.localHeaderOffset=e.readInt(8)),this.diskNumberStart===s.MAX_VALUE_32BITS&&(this.diskNumberStart=e.readInt(4))}},readExtraFields:function(e){var t,r,n,i=e.index+this.extraFieldsLength;for(this.extraFields||(this.extraFields={});e.index+4<i;)t=e.readInt(2),r=e.readInt(2),n=e.readData(r),this.extraFields[t]={id:t,length:r,value:n};e.setIndex(i)},handleUTF8:function(){var e=u.uint8array?"uint8array":"array";if(this.useUTF8())this.fileNameStr=o.utf8decode(this.fileName),this.fileCommentStr=o.utf8decode(this.fileComment);else{var t=this.findExtraFieldUnicodePath();if(null!==t)this.fileNameStr=t;else{var r=s.transformTo(e,this.fileName);this.fileNameStr=this.loadOptions.decodeFileName(r)}var n=this.findExtraFieldUnicodeComment();if(null!==n)this.fileCommentStr=n;else{var i=s.transformTo(e,this.fileComment);this.fileCommentStr=this.loadOptions.decodeFileName(i)}}},findExtraFieldUnicodePath:function(){var e=this.extraFields[28789];if(e){var t=n(e.value);return 1!==t.readInt(1)?null:a(this.fileName)!==t.readInt(4)?null:o.utf8decode(t.readData(e.length-5))}return null},findExtraFieldUnicodeComment:function(){var e=this.extraFields[25461];if(e){var t=n(e.value);return 1!==t.readInt(1)?null:a(this.fileComment)!==t.readInt(4)?null:o.utf8decode(t.readData(e.length-5))}return null}},t.exports=l},{"./compressedObject":2,"./compressions":3,"./crc32":4,"./reader/readerFor":22,"./support":30,"./utf8":31,"./utils":32}],35:[function(e,t,r){"use strict";function n(e,t,r){this.name=e,this.dir=r.dir,this.date=r.date,this.comment=r.comment,this.unixPermissions=r.unixPermissions,this.dosPermissions=r.dosPermissions,this._data=t,this._dataBinary=r.binary,this.options={compression:r.compression,compressionOptions:r.compressionOptions}}var s=e("./stream/StreamHelper"),i=e("./stream/DataWorker"),a=e("./utf8"),o=e("./compressedObject"),h=e("./stream/GenericWorker");n.prototype={internalStream:function(e){var t=null,r="string";try{if(!e)throw new Error("No output type specified.");var n="string"===(r=e.toLowerCase())||"text"===r;"binarystring"!==r&&"text"!==r||(r="string"),t=this._decompressWorker();var i=!this._dataBinary;i&&!n&&(t=t.pipe(new a.Utf8EncodeWorker)),!i&&n&&(t=t.pipe(new a.Utf8DecodeWorker))}catch(e){(t=new h("error")).error(e)}return new s(t,r,"")},async:function(e,t){return this.internalStream(e).accumulate(t)},nodeStream:function(e,t){return this.internalStream(e||"nodebuffer").toNodejsStream(t)},_compressWorker:function(e,t){if(this._data instanceof o&&this._data.compression.magic===e.magic)return this._data.getCompressedWorker();var r=this._decompressWorker();return this._dataBinary||(r=r.pipe(new a.Utf8EncodeWorker)),o.createWorkerFrom(r,e,t)},_decompressWorker:function(){return this._data instanceof o?this._data.getContentWorker():this._data instanceof h?this._data:new i(this._data)}};for(var u=["asText","asBinary","asNodeBuffer","asUint8Array","asArrayBuffer"],l=function(){throw new Error("This method has been removed in JSZip 3.0, please check the upgrade guide.")},f=0;f<u.length;f++)n.prototype[u[f]]=l;t.exports=n},{"./compressedObject":2,"./stream/DataWorker":27,"./stream/GenericWorker":28,"./stream/StreamHelper":29,"./utf8":31}],36:[function(e,l,t){(function(t){"use strict";var r,n,e=t.MutationObserver||t.WebKitMutationObserver;if(e){var i=0,s=new e(u),a=t.document.createTextNode("");s.observe(a,{characterData:!0}),r=function(){a.data=i=++i%2}}else if(t.setImmediate||void 0===t.MessageChannel)r="document"in t&&"onreadystatechange"in t.document.createElement("script")?function(){var e=t.document.createElement("script");e.onreadystatechange=function(){u(),e.onreadystatechange=null,e.parentNode.removeChild(e),e=null},t.document.documentElement.appendChild(e)}:function(){setTimeout(u,0)};else{var o=new t.MessageChannel;o.port1.onmessage=u,r=function(){o.port2.postMessage(0)}}var h=[];function u(){var e,t;n=!0;for(var r=h.length;r;){for(t=h,h=[],e=-1;++e<r;)t[e]();r=h.length}n=!1}l.exports=function(e){1!==h.push(e)||n||r()}}).call(this,"undefined"!=typeof __webpack_require__.g?__webpack_require__.g:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{}],37:[function(e,t,r){"use strict";var i=e("immediate");function u(){}var l={},s=["REJECTED"],a=["FULFILLED"],n=["PENDING"];function o(e){if("function"!=typeof e)throw new TypeError("resolver must be a function");this.state=n,this.queue=[],this.outcome=void 0,e!==u&&d(this,e)}function h(e,t,r){this.promise=e,"function"==typeof t&&(this.onFulfilled=t,this.callFulfilled=this.otherCallFulfilled),"function"==typeof r&&(this.onRejected=r,this.callRejected=this.otherCallRejected)}function f(t,r,n){i(function(){var e;try{e=r(n)}catch(e){return l.reject(t,e)}e===t?l.reject(t,new TypeError("Cannot resolve promise with itself")):l.resolve(t,e)})}function c(e){var t=e&&e.then;if(e&&("object"==typeof e||"function"==typeof e)&&"function"==typeof t)return function(){t.apply(e,arguments)}}function d(t,e){var r=!1;function n(e){r||(r=!0,l.reject(t,e))}function i(e){r||(r=!0,l.resolve(t,e))}var s=p(function(){e(i,n)});"error"===s.status&&n(s.value)}function p(e,t){var r={};try{r.value=e(t),r.status="success"}catch(e){r.status="error",r.value=e}return r}(t.exports=o).prototype.finally=function(t){if("function"!=typeof t)return this;var r=this.constructor;return this.then(function(e){return r.resolve(t()).then(function(){return e})},function(e){return r.resolve(t()).then(function(){throw e})})},o.prototype.catch=function(e){return this.then(null,e)},o.prototype.then=function(e,t){if("function"!=typeof e&&this.state===a||"function"!=typeof t&&this.state===s)return this;var r=new this.constructor(u);this.state!==n?f(r,this.state===a?e:t,this.outcome):this.queue.push(new h(r,e,t));return r},h.prototype.callFulfilled=function(e){l.resolve(this.promise,e)},h.prototype.otherCallFulfilled=function(e){f(this.promise,this.onFulfilled,e)},h.prototype.callRejected=function(e){l.reject(this.promise,e)},h.prototype.otherCallRejected=function(e){f(this.promise,this.onRejected,e)},l.resolve=function(e,t){var r=p(c,t);if("error"===r.status)return l.reject(e,r.value);var n=r.value;if(n)d(e,n);else{e.state=a,e.outcome=t;for(var i=-1,s=e.queue.length;++i<s;)e.queue[i].callFulfilled(t)}return e},l.reject=function(e,t){e.state=s,e.outcome=t;for(var r=-1,n=e.queue.length;++r<n;)e.queue[r].callRejected(t);return e},o.resolve=function(e){if(e instanceof this)return e;return l.resolve(new this(u),e)},o.reject=function(e){var t=new this(u);return l.reject(t,e)},o.all=function(e){var r=this;if("[object Array]"!==Object.prototype.toString.call(e))return this.reject(new TypeError("must be an array"));var n=e.length,i=!1;if(!n)return this.resolve([]);var s=new Array(n),a=0,t=-1,o=new this(u);for(;++t<n;)h(e[t],t);return o;function h(e,t){r.resolve(e).then(function(e){s[t]=e,++a!==n||i||(i=!0,l.resolve(o,s))},function(e){i||(i=!0,l.reject(o,e))})}},o.race=function(e){var t=this;if("[object Array]"!==Object.prototype.toString.call(e))return this.reject(new TypeError("must be an array"));var r=e.length,n=!1;if(!r)return this.resolve([]);var i=-1,s=new this(u);for(;++i<r;)a=e[i],t.resolve(a).then(function(e){n||(n=!0,l.resolve(s,e))},function(e){n||(n=!0,l.reject(s,e))});var a;return s}},{immediate:36}],38:[function(e,t,r){"use strict";var n={};(0,e("./lib/utils/common").assign)(n,e("./lib/deflate"),e("./lib/inflate"),e("./lib/zlib/constants")),t.exports=n},{"./lib/deflate":39,"./lib/inflate":40,"./lib/utils/common":41,"./lib/zlib/constants":44}],39:[function(e,t,r){"use strict";var a=e("./zlib/deflate"),o=e("./utils/common"),h=e("./utils/strings"),i=e("./zlib/messages"),s=e("./zlib/zstream"),u=Object.prototype.toString,l=0,f=-1,c=0,d=8;function p(e){if(!(this instanceof p))return new p(e);this.options=o.assign({level:f,method:d,chunkSize:16384,windowBits:15,memLevel:8,strategy:c,to:""},e||{});var t=this.options;t.raw&&0<t.windowBits?t.windowBits=-t.windowBits:t.gzip&&0<t.windowBits&&t.windowBits<16&&(t.windowBits+=16),this.err=0,this.msg="",this.ended=!1,this.chunks=[],this.strm=new s,this.strm.avail_out=0;var r=a.deflateInit2(this.strm,t.level,t.method,t.windowBits,t.memLevel,t.strategy);if(r!==l)throw new Error(i[r]);if(t.header&&a.deflateSetHeader(this.strm,t.header),t.dictionary){var n;if(n="string"==typeof t.dictionary?h.string2buf(t.dictionary):"[object ArrayBuffer]"===u.call(t.dictionary)?new Uint8Array(t.dictionary):t.dictionary,(r=a.deflateSetDictionary(this.strm,n))!==l)throw new Error(i[r]);this._dict_set=!0}}function n(e,t){var r=new p(t);if(r.push(e,!0),r.err)throw r.msg||i[r.err];return r.result}p.prototype.push=function(e,t){var r,n,i=this.strm,s=this.options.chunkSize;if(this.ended)return!1;n=t===~~t?t:!0===t?4:0,"string"==typeof e?i.input=h.string2buf(e):"[object ArrayBuffer]"===u.call(e)?i.input=new Uint8Array(e):i.input=e,i.next_in=0,i.avail_in=i.input.length;do{if(0===i.avail_out&&(i.output=new o.Buf8(s),i.next_out=0,i.avail_out=s),1!==(r=a.deflate(i,n))&&r!==l)return this.onEnd(r),!(this.ended=!0);0!==i.avail_out&&(0!==i.avail_in||4!==n&&2!==n)||("string"===this.options.to?this.onData(h.buf2binstring(o.shrinkBuf(i.output,i.next_out))):this.onData(o.shrinkBuf(i.output,i.next_out)))}while((0<i.avail_in||0===i.avail_out)&&1!==r);return 4===n?(r=a.deflateEnd(this.strm),this.onEnd(r),this.ended=!0,r===l):2!==n||(this.onEnd(l),!(i.avail_out=0))},p.prototype.onData=function(e){this.chunks.push(e)},p.prototype.onEnd=function(e){e===l&&("string"===this.options.to?this.result=this.chunks.join(""):this.result=o.flattenChunks(this.chunks)),this.chunks=[],this.err=e,this.msg=this.strm.msg},r.Deflate=p,r.deflate=n,r.deflateRaw=function(e,t){return(t=t||{}).raw=!0,n(e,t)},r.gzip=function(e,t){return(t=t||{}).gzip=!0,n(e,t)}},{"./utils/common":41,"./utils/strings":42,"./zlib/deflate":46,"./zlib/messages":51,"./zlib/zstream":53}],40:[function(e,t,r){"use strict";var c=e("./zlib/inflate"),d=e("./utils/common"),p=e("./utils/strings"),m=e("./zlib/constants"),n=e("./zlib/messages"),i=e("./zlib/zstream"),s=e("./zlib/gzheader"),_=Object.prototype.toString;function a(e){if(!(this instanceof a))return new a(e);this.options=d.assign({chunkSize:16384,windowBits:0,to:""},e||{});var t=this.options;t.raw&&0<=t.windowBits&&t.windowBits<16&&(t.windowBits=-t.windowBits,0===t.windowBits&&(t.windowBits=-15)),!(0<=t.windowBits&&t.windowBits<16)||e&&e.windowBits||(t.windowBits+=32),15<t.windowBits&&t.windowBits<48&&0==(15&t.windowBits)&&(t.windowBits|=15),this.err=0,this.msg="",this.ended=!1,this.chunks=[],this.strm=new i,this.strm.avail_out=0;var r=c.inflateInit2(this.strm,t.windowBits);if(r!==m.Z_OK)throw new Error(n[r]);this.header=new s,c.inflateGetHeader(this.strm,this.header)}function o(e,t){var r=new a(t);if(r.push(e,!0),r.err)throw r.msg||n[r.err];return r.result}a.prototype.push=function(e,t){var r,n,i,s,a,o,h=this.strm,u=this.options.chunkSize,l=this.options.dictionary,f=!1;if(this.ended)return!1;n=t===~~t?t:!0===t?m.Z_FINISH:m.Z_NO_FLUSH,"string"==typeof e?h.input=p.binstring2buf(e):"[object ArrayBuffer]"===_.call(e)?h.input=new Uint8Array(e):h.input=e,h.next_in=0,h.avail_in=h.input.length;do{if(0===h.avail_out&&(h.output=new d.Buf8(u),h.next_out=0,h.avail_out=u),(r=c.inflate(h,m.Z_NO_FLUSH))===m.Z_NEED_DICT&&l&&(o="string"==typeof l?p.string2buf(l):"[object ArrayBuffer]"===_.call(l)?new Uint8Array(l):l,r=c.inflateSetDictionary(this.strm,o)),r===m.Z_BUF_ERROR&&!0===f&&(r=m.Z_OK,f=!1),r!==m.Z_STREAM_END&&r!==m.Z_OK)return this.onEnd(r),!(this.ended=!0);h.next_out&&(0!==h.avail_out&&r!==m.Z_STREAM_END&&(0!==h.avail_in||n!==m.Z_FINISH&&n!==m.Z_SYNC_FLUSH)||("string"===this.options.to?(i=p.utf8border(h.output,h.next_out),s=h.next_out-i,a=p.buf2string(h.output,i),h.next_out=s,h.avail_out=u-s,s&&d.arraySet(h.output,h.output,i,s,0),this.onData(a)):this.onData(d.shrinkBuf(h.output,h.next_out)))),0===h.avail_in&&0===h.avail_out&&(f=!0)}while((0<h.avail_in||0===h.avail_out)&&r!==m.Z_STREAM_END);return r===m.Z_STREAM_END&&(n=m.Z_FINISH),n===m.Z_FINISH?(r=c.inflateEnd(this.strm),this.onEnd(r),this.ended=!0,r===m.Z_OK):n!==m.Z_SYNC_FLUSH||(this.onEnd(m.Z_OK),!(h.avail_out=0))},a.prototype.onData=function(e){this.chunks.push(e)},a.prototype.onEnd=function(e){e===m.Z_OK&&("string"===this.options.to?this.result=this.chunks.join(""):this.result=d.flattenChunks(this.chunks)),this.chunks=[],this.err=e,this.msg=this.strm.msg},r.Inflate=a,r.inflate=o,r.inflateRaw=function(e,t){return(t=t||{}).raw=!0,o(e,t)},r.ungzip=o},{"./utils/common":41,"./utils/strings":42,"./zlib/constants":44,"./zlib/gzheader":47,"./zlib/inflate":49,"./zlib/messages":51,"./zlib/zstream":53}],41:[function(e,t,r){"use strict";var n="undefined"!=typeof Uint8Array&&"undefined"!=typeof Uint16Array&&"undefined"!=typeof Int32Array;r.assign=function(e){for(var t=Array.prototype.slice.call(arguments,1);t.length;){var r=t.shift();if(r){if("object"!=typeof r)throw new TypeError(r+"must be non-object");for(var n in r)r.hasOwnProperty(n)&&(e[n]=r[n])}}return e},r.shrinkBuf=function(e,t){return e.length===t?e:e.subarray?e.subarray(0,t):(e.length=t,e)};var i={arraySet:function(e,t,r,n,i){if(t.subarray&&e.subarray)e.set(t.subarray(r,r+n),i);else for(var s=0;s<n;s++)e[i+s]=t[r+s]},flattenChunks:function(e){var t,r,n,i,s,a;for(t=n=0,r=e.length;t<r;t++)n+=e[t].length;for(a=new Uint8Array(n),t=i=0,r=e.length;t<r;t++)s=e[t],a.set(s,i),i+=s.length;return a}},s={arraySet:function(e,t,r,n,i){for(var s=0;s<n;s++)e[i+s]=t[r+s]},flattenChunks:function(e){return[].concat.apply([],e)}};r.setTyped=function(e){e?(r.Buf8=Uint8Array,r.Buf16=Uint16Array,r.Buf32=Int32Array,r.assign(r,i)):(r.Buf8=Array,r.Buf16=Array,r.Buf32=Array,r.assign(r,s))},r.setTyped(n)},{}],42:[function(e,t,r){"use strict";var h=e("./common"),i=!0,s=!0;try{String.fromCharCode.apply(null,[0])}catch(e){i=!1}try{String.fromCharCode.apply(null,new Uint8Array(1))}catch(e){s=!1}for(var u=new h.Buf8(256),n=0;n<256;n++)u[n]=252<=n?6:248<=n?5:240<=n?4:224<=n?3:192<=n?2:1;function l(e,t){if(t<65537&&(e.subarray&&s||!e.subarray&&i))return String.fromCharCode.apply(null,h.shrinkBuf(e,t));for(var r="",n=0;n<t;n++)r+=String.fromCharCode(e[n]);return r}u[254]=u[254]=1,r.string2buf=function(e){var t,r,n,i,s,a=e.length,o=0;for(i=0;i<a;i++)55296==(64512&(r=e.charCodeAt(i)))&&i+1<a&&56320==(64512&(n=e.charCodeAt(i+1)))&&(r=65536+(r-55296<<10)+(n-56320),i++),o+=r<128?1:r<2048?2:r<65536?3:4;for(t=new h.Buf8(o),i=s=0;s<o;i++)55296==(64512&(r=e.charCodeAt(i)))&&i+1<a&&56320==(64512&(n=e.charCodeAt(i+1)))&&(r=65536+(r-55296<<10)+(n-56320),i++),r<128?t[s++]=r:(r<2048?t[s++]=192|r>>>6:(r<65536?t[s++]=224|r>>>12:(t[s++]=240|r>>>18,t[s++]=128|r>>>12&63),t[s++]=128|r>>>6&63),t[s++]=128|63&r);return t},r.buf2binstring=function(e){return l(e,e.length)},r.binstring2buf=function(e){for(var t=new h.Buf8(e.length),r=0,n=t.length;r<n;r++)t[r]=e.charCodeAt(r);return t},r.buf2string=function(e,t){var r,n,i,s,a=t||e.length,o=new Array(2*a);for(r=n=0;r<a;)if((i=e[r++])<128)o[n++]=i;else if(4<(s=u[i]))o[n++]=65533,r+=s-1;else{for(i&=2===s?31:3===s?15:7;1<s&&r<a;)i=i<<6|63&e[r++],s--;1<s?o[n++]=65533:i<65536?o[n++]=i:(i-=65536,o[n++]=55296|i>>10&1023,o[n++]=56320|1023&i)}return l(o,n)},r.utf8border=function(e,t){var r;for((t=t||e.length)>e.length&&(t=e.length),r=t-1;0<=r&&128==(192&e[r]);)r--;return r<0?t:0===r?t:r+u[e[r]]>t?r:t}},{"./common":41}],43:[function(e,t,r){"use strict";t.exports=function(e,t,r,n){for(var i=65535&e|0,s=e>>>16&65535|0,a=0;0!==r;){for(r-=a=2e3<r?2e3:r;s=s+(i=i+t[n++]|0)|0,--a;);i%=65521,s%=65521}return i|s<<16|0}},{}],44:[function(e,t,r){"use strict";t.exports={Z_NO_FLUSH:0,Z_PARTIAL_FLUSH:1,Z_SYNC_FLUSH:2,Z_FULL_FLUSH:3,Z_FINISH:4,Z_BLOCK:5,Z_TREES:6,Z_OK:0,Z_STREAM_END:1,Z_NEED_DICT:2,Z_ERRNO:-1,Z_STREAM_ERROR:-2,Z_DATA_ERROR:-3,Z_BUF_ERROR:-5,Z_NO_COMPRESSION:0,Z_BEST_SPEED:1,Z_BEST_COMPRESSION:9,Z_DEFAULT_COMPRESSION:-1,Z_FILTERED:1,Z_HUFFMAN_ONLY:2,Z_RLE:3,Z_FIXED:4,Z_DEFAULT_STRATEGY:0,Z_BINARY:0,Z_TEXT:1,Z_UNKNOWN:2,Z_DEFLATED:8}},{}],45:[function(e,t,r){"use strict";var o=function(){for(var e,t=[],r=0;r<256;r++){e=r;for(var n=0;n<8;n++)e=1&e?3988292384^e>>>1:e>>>1;t[r]=e}return t}();t.exports=function(e,t,r,n){var i=o,s=n+r;e^=-1;for(var a=n;a<s;a++)e=e>>>8^i[255&(e^t[a])];return-1^e}},{}],46:[function(e,t,r){"use strict";var h,c=e("../utils/common"),u=e("./trees"),d=e("./adler32"),p=e("./crc32"),n=e("./messages"),l=0,f=4,m=0,_=-2,g=-1,b=4,i=2,v=8,y=9,s=286,a=30,o=19,w=2*s+1,k=15,x=3,S=258,z=S+x+1,C=42,E=113,A=1,I=2,O=3,B=4;function R(e,t){return e.msg=n[t],t}function T(e){return(e<<1)-(4<e?9:0)}function D(e){for(var t=e.length;0<=--t;)e[t]=0}function F(e){var t=e.state,r=t.pending;r>e.avail_out&&(r=e.avail_out),0!==r&&(c.arraySet(e.output,t.pending_buf,t.pending_out,r,e.next_out),e.next_out+=r,t.pending_out+=r,e.total_out+=r,e.avail_out-=r,t.pending-=r,0===t.pending&&(t.pending_out=0))}function N(e,t){u._tr_flush_block(e,0<=e.block_start?e.block_start:-1,e.strstart-e.block_start,t),e.block_start=e.strstart,F(e.strm)}function U(e,t){e.pending_buf[e.pending++]=t}function P(e,t){e.pending_buf[e.pending++]=t>>>8&255,e.pending_buf[e.pending++]=255&t}function L(e,t){var r,n,i=e.max_chain_length,s=e.strstart,a=e.prev_length,o=e.nice_match,h=e.strstart>e.w_size-z?e.strstart-(e.w_size-z):0,u=e.window,l=e.w_mask,f=e.prev,c=e.strstart+S,d=u[s+a-1],p=u[s+a];e.prev_length>=e.good_match&&(i>>=2),o>e.lookahead&&(o=e.lookahead);do{if(u[(r=t)+a]===p&&u[r+a-1]===d&&u[r]===u[s]&&u[++r]===u[s+1]){s+=2,r++;do{}while(u[++s]===u[++r]&&u[++s]===u[++r]&&u[++s]===u[++r]&&u[++s]===u[++r]&&u[++s]===u[++r]&&u[++s]===u[++r]&&u[++s]===u[++r]&&u[++s]===u[++r]&&s<c);if(n=S-(c-s),s=c-S,a<n){if(e.match_start=t,o<=(a=n))break;d=u[s+a-1],p=u[s+a]}}}while((t=f[t&l])>h&&0!=--i);return a<=e.lookahead?a:e.lookahead}function j(e){var t,r,n,i,s,a,o,h,u,l,f=e.w_size;do{if(i=e.window_size-e.lookahead-e.strstart,e.strstart>=f+(f-z)){for(c.arraySet(e.window,e.window,f,f,0),e.match_start-=f,e.strstart-=f,e.block_start-=f,t=r=e.hash_size;n=e.head[--t],e.head[t]=f<=n?n-f:0,--r;);for(t=r=f;n=e.prev[--t],e.prev[t]=f<=n?n-f:0,--r;);i+=f}if(0===e.strm.avail_in)break;if(a=e.strm,o=e.window,h=e.strstart+e.lookahead,u=i,l=void 0,l=a.avail_in,u<l&&(l=u),r=0===l?0:(a.avail_in-=l,c.arraySet(o,a.input,a.next_in,l,h),1===a.state.wrap?a.adler=d(a.adler,o,l,h):2===a.state.wrap&&(a.adler=p(a.adler,o,l,h)),a.next_in+=l,a.total_in+=l,l),e.lookahead+=r,e.lookahead+e.insert>=x)for(s=e.strstart-e.insert,e.ins_h=e.window[s],e.ins_h=(e.ins_h<<e.hash_shift^e.window[s+1])&e.hash_mask;e.insert&&(e.ins_h=(e.ins_h<<e.hash_shift^e.window[s+x-1])&e.hash_mask,e.prev[s&e.w_mask]=e.head[e.ins_h],e.head[e.ins_h]=s,s++,e.insert--,!(e.lookahead+e.insert<x)););}while(e.lookahead<z&&0!==e.strm.avail_in)}function Z(e,t){for(var r,n;;){if(e.lookahead<z){if(j(e),e.lookahead<z&&t===l)return A;if(0===e.lookahead)break}if(r=0,e.lookahead>=x&&(e.ins_h=(e.ins_h<<e.hash_shift^e.window[e.strstart+x-1])&e.hash_mask,r=e.prev[e.strstart&e.w_mask]=e.head[e.ins_h],e.head[e.ins_h]=e.strstart),0!==r&&e.strstart-r<=e.w_size-z&&(e.match_length=L(e,r)),e.match_length>=x)if(n=u._tr_tally(e,e.strstart-e.match_start,e.match_length-x),e.lookahead-=e.match_length,e.match_length<=e.max_lazy_match&&e.lookahead>=x){for(e.match_length--;e.strstart++,e.ins_h=(e.ins_h<<e.hash_shift^e.window[e.strstart+x-1])&e.hash_mask,r=e.prev[e.strstart&e.w_mask]=e.head[e.ins_h],e.head[e.ins_h]=e.strstart,0!=--e.match_length;);e.strstart++}else e.strstart+=e.match_length,e.match_length=0,e.ins_h=e.window[e.strstart],e.ins_h=(e.ins_h<<e.hash_shift^e.window[e.strstart+1])&e.hash_mask;else n=u._tr_tally(e,0,e.window[e.strstart]),e.lookahead--,e.strstart++;if(n&&(N(e,!1),0===e.strm.avail_out))return A}return e.insert=e.strstart<x-1?e.strstart:x-1,t===f?(N(e,!0),0===e.strm.avail_out?O:B):e.last_lit&&(N(e,!1),0===e.strm.avail_out)?A:I}function W(e,t){for(var r,n,i;;){if(e.lookahead<z){if(j(e),e.lookahead<z&&t===l)return A;if(0===e.lookahead)break}if(r=0,e.lookahead>=x&&(e.ins_h=(e.ins_h<<e.hash_shift^e.window[e.strstart+x-1])&e.hash_mask,r=e.prev[e.strstart&e.w_mask]=e.head[e.ins_h],e.head[e.ins_h]=e.strstart),e.prev_length=e.match_length,e.prev_match=e.match_start,e.match_length=x-1,0!==r&&e.prev_length<e.max_lazy_match&&e.strstart-r<=e.w_size-z&&(e.match_length=L(e,r),e.match_length<=5&&(1===e.strategy||e.match_length===x&&4096<e.strstart-e.match_start)&&(e.match_length=x-1)),e.prev_length>=x&&e.match_length<=e.prev_length){for(i=e.strstart+e.lookahead-x,n=u._tr_tally(e,e.strstart-1-e.prev_match,e.prev_length-x),e.lookahead-=e.prev_length-1,e.prev_length-=2;++e.strstart<=i&&(e.ins_h=(e.ins_h<<e.hash_shift^e.window[e.strstart+x-1])&e.hash_mask,r=e.prev[e.strstart&e.w_mask]=e.head[e.ins_h],e.head[e.ins_h]=e.strstart),0!=--e.prev_length;);if(e.match_available=0,e.match_length=x-1,e.strstart++,n&&(N(e,!1),0===e.strm.avail_out))return A}else if(e.match_available){if((n=u._tr_tally(e,0,e.window[e.strstart-1]))&&N(e,!1),e.strstart++,e.lookahead--,0===e.strm.avail_out)return A}else e.match_available=1,e.strstart++,e.lookahead--}return e.match_available&&(n=u._tr_tally(e,0,e.window[e.strstart-1]),e.match_available=0),e.insert=e.strstart<x-1?e.strstart:x-1,t===f?(N(e,!0),0===e.strm.avail_out?O:B):e.last_lit&&(N(e,!1),0===e.strm.avail_out)?A:I}function M(e,t,r,n,i){this.good_length=e,this.max_lazy=t,this.nice_length=r,this.max_chain=n,this.func=i}function H(){this.strm=null,this.status=0,this.pending_buf=null,this.pending_buf_size=0,this.pending_out=0,this.pending=0,this.wrap=0,this.gzhead=null,this.gzindex=0,this.method=v,this.last_flush=-1,this.w_size=0,this.w_bits=0,this.w_mask=0,this.window=null,this.window_size=0,this.prev=null,this.head=null,this.ins_h=0,this.hash_size=0,this.hash_bits=0,this.hash_mask=0,this.hash_shift=0,this.block_start=0,this.match_length=0,this.prev_match=0,this.match_available=0,this.strstart=0,this.match_start=0,this.lookahead=0,this.prev_length=0,this.max_chain_length=0,this.max_lazy_match=0,this.level=0,this.strategy=0,this.good_match=0,this.nice_match=0,this.dyn_ltree=new c.Buf16(2*w),this.dyn_dtree=new c.Buf16(2*(2*a+1)),this.bl_tree=new c.Buf16(2*(2*o+1)),D(this.dyn_ltree),D(this.dyn_dtree),D(this.bl_tree),this.l_desc=null,this.d_desc=null,this.bl_desc=null,this.bl_count=new c.Buf16(k+1),this.heap=new c.Buf16(2*s+1),D(this.heap),this.heap_len=0,this.heap_max=0,this.depth=new c.Buf16(2*s+1),D(this.depth),this.l_buf=0,this.lit_bufsize=0,this.last_lit=0,this.d_buf=0,this.opt_len=0,this.static_len=0,this.matches=0,this.insert=0,this.bi_buf=0,this.bi_valid=0}function G(e){var t;return e&&e.state?(e.total_in=e.total_out=0,e.data_type=i,(t=e.state).pending=0,t.pending_out=0,t.wrap<0&&(t.wrap=-t.wrap),t.status=t.wrap?C:E,e.adler=2===t.wrap?0:1,t.last_flush=l,u._tr_init(t),m):R(e,_)}function K(e){var t=G(e);return t===m&&function(e){e.window_size=2*e.w_size,D(e.head),e.max_lazy_match=h[e.level].max_lazy,e.good_match=h[e.level].good_length,e.nice_match=h[e.level].nice_length,e.max_chain_length=h[e.level].max_chain,e.strstart=0,e.block_start=0,e.lookahead=0,e.insert=0,e.match_length=e.prev_length=x-1,e.match_available=0,e.ins_h=0}(e.state),t}function Y(e,t,r,n,i,s){if(!e)return _;var a=1;if(t===g&&(t=6),n<0?(a=0,n=-n):15<n&&(a=2,n-=16),i<1||y<i||r!==v||n<8||15<n||t<0||9<t||s<0||b<s)return R(e,_);8===n&&(n=9);var o=new H;return(e.state=o).strm=e,o.wrap=a,o.gzhead=null,o.w_bits=n,o.w_size=1<<o.w_bits,o.w_mask=o.w_size-1,o.hash_bits=i+7,o.hash_size=1<<o.hash_bits,o.hash_mask=o.hash_size-1,o.hash_shift=~~((o.hash_bits+x-1)/x),o.window=new c.Buf8(2*o.w_size),o.head=new c.Buf16(o.hash_size),o.prev=new c.Buf16(o.w_size),o.lit_bufsize=1<<i+6,o.pending_buf_size=4*o.lit_bufsize,o.pending_buf=new c.Buf8(o.pending_buf_size),o.d_buf=1*o.lit_bufsize,o.l_buf=3*o.lit_bufsize,o.level=t,o.strategy=s,o.method=r,K(e)}h=[new M(0,0,0,0,function(e,t){var r=65535;for(r>e.pending_buf_size-5&&(r=e.pending_buf_size-5);;){if(e.lookahead<=1){if(j(e),0===e.lookahead&&t===l)return A;if(0===e.lookahead)break}e.strstart+=e.lookahead,e.lookahead=0;var n=e.block_start+r;if((0===e.strstart||e.strstart>=n)&&(e.lookahead=e.strstart-n,e.strstart=n,N(e,!1),0===e.strm.avail_out))return A;if(e.strstart-e.block_start>=e.w_size-z&&(N(e,!1),0===e.strm.avail_out))return A}return e.insert=0,t===f?(N(e,!0),0===e.strm.avail_out?O:B):(e.strstart>e.block_start&&(N(e,!1),e.strm.avail_out),A)}),new M(4,4,8,4,Z),new M(4,5,16,8,Z),new M(4,6,32,32,Z),new M(4,4,16,16,W),new M(8,16,32,32,W),new M(8,16,128,128,W),new M(8,32,128,256,W),new M(32,128,258,1024,W),new M(32,258,258,4096,W)],r.deflateInit=function(e,t){return Y(e,t,v,15,8,0)},r.deflateInit2=Y,r.deflateReset=K,r.deflateResetKeep=G,r.deflateSetHeader=function(e,t){return e&&e.state?2!==e.state.wrap?_:(e.state.gzhead=t,m):_},r.deflate=function(e,t){var r,n,i,s;if(!e||!e.state||5<t||t<0)return e?R(e,_):_;if(n=e.state,!e.output||!e.input&&0!==e.avail_in||666===n.status&&t!==f)return R(e,0===e.avail_out?-5:_);if(n.strm=e,r=n.last_flush,n.last_flush=t,n.status===C)if(2===n.wrap)e.adler=0,U(n,31),U(n,139),U(n,8),n.gzhead?(U(n,(n.gzhead.text?1:0)+(n.gzhead.hcrc?2:0)+(n.gzhead.extra?4:0)+(n.gzhead.name?8:0)+(n.gzhead.comment?16:0)),U(n,255&n.gzhead.time),U(n,n.gzhead.time>>8&255),U(n,n.gzhead.time>>16&255),U(n,n.gzhead.time>>24&255),U(n,9===n.level?2:2<=n.strategy||n.level<2?4:0),U(n,255&n.gzhead.os),n.gzhead.extra&&n.gzhead.extra.length&&(U(n,255&n.gzhead.extra.length),U(n,n.gzhead.extra.length>>8&255)),n.gzhead.hcrc&&(e.adler=p(e.adler,n.pending_buf,n.pending,0)),n.gzindex=0,n.status=69):(U(n,0),U(n,0),U(n,0),U(n,0),U(n,0),U(n,9===n.level?2:2<=n.strategy||n.level<2?4:0),U(n,3),n.status=E);else{var a=v+(n.w_bits-8<<4)<<8;a|=(2<=n.strategy||n.level<2?0:n.level<6?1:6===n.level?2:3)<<6,0!==n.strstart&&(a|=32),a+=31-a%31,n.status=E,P(n,a),0!==n.strstart&&(P(n,e.adler>>>16),P(n,65535&e.adler)),e.adler=1}if(69===n.status)if(n.gzhead.extra){for(i=n.pending;n.gzindex<(65535&n.gzhead.extra.length)&&(n.pending!==n.pending_buf_size||(n.gzhead.hcrc&&n.pending>i&&(e.adler=p(e.adler,n.pending_buf,n.pending-i,i)),F(e),i=n.pending,n.pending!==n.pending_buf_size));)U(n,255&n.gzhead.extra[n.gzindex]),n.gzindex++;n.gzhead.hcrc&&n.pending>i&&(e.adler=p(e.adler,n.pending_buf,n.pending-i,i)),n.gzindex===n.gzhead.extra.length&&(n.gzindex=0,n.status=73)}else n.status=73;if(73===n.status)if(n.gzhead.name){i=n.pending;do{if(n.pending===n.pending_buf_size&&(n.gzhead.hcrc&&n.pending>i&&(e.adler=p(e.adler,n.pending_buf,n.pending-i,i)),F(e),i=n.pending,n.pending===n.pending_buf_size)){s=1;break}s=n.gzindex<n.gzhead.name.length?255&n.gzhead.name.charCodeAt(n.gzindex++):0,U(n,s)}while(0!==s);n.gzhead.hcrc&&n.pending>i&&(e.adler=p(e.adler,n.pending_buf,n.pending-i,i)),0===s&&(n.gzindex=0,n.status=91)}else n.status=91;if(91===n.status)if(n.gzhead.comment){i=n.pending;do{if(n.pending===n.pending_buf_size&&(n.gzhead.hcrc&&n.pending>i&&(e.adler=p(e.adler,n.pending_buf,n.pending-i,i)),F(e),i=n.pending,n.pending===n.pending_buf_size)){s=1;break}s=n.gzindex<n.gzhead.comment.length?255&n.gzhead.comment.charCodeAt(n.gzindex++):0,U(n,s)}while(0!==s);n.gzhead.hcrc&&n.pending>i&&(e.adler=p(e.adler,n.pending_buf,n.pending-i,i)),0===s&&(n.status=103)}else n.status=103;if(103===n.status&&(n.gzhead.hcrc?(n.pending+2>n.pending_buf_size&&F(e),n.pending+2<=n.pending_buf_size&&(U(n,255&e.adler),U(n,e.adler>>8&255),e.adler=0,n.status=E)):n.status=E),0!==n.pending){if(F(e),0===e.avail_out)return n.last_flush=-1,m}else if(0===e.avail_in&&T(t)<=T(r)&&t!==f)return R(e,-5);if(666===n.status&&0!==e.avail_in)return R(e,-5);if(0!==e.avail_in||0!==n.lookahead||t!==l&&666!==n.status){var o=2===n.strategy?function(e,t){for(var r;;){if(0===e.lookahead&&(j(e),0===e.lookahead)){if(t===l)return A;break}if(e.match_length=0,r=u._tr_tally(e,0,e.window[e.strstart]),e.lookahead--,e.strstart++,r&&(N(e,!1),0===e.strm.avail_out))return A}return e.insert=0,t===f?(N(e,!0),0===e.strm.avail_out?O:B):e.last_lit&&(N(e,!1),0===e.strm.avail_out)?A:I}(n,t):3===n.strategy?function(e,t){for(var r,n,i,s,a=e.window;;){if(e.lookahead<=S){if(j(e),e.lookahead<=S&&t===l)return A;if(0===e.lookahead)break}if(e.match_length=0,e.lookahead>=x&&0<e.strstart&&(n=a[i=e.strstart-1])===a[++i]&&n===a[++i]&&n===a[++i]){s=e.strstart+S;do{}while(n===a[++i]&&n===a[++i]&&n===a[++i]&&n===a[++i]&&n===a[++i]&&n===a[++i]&&n===a[++i]&&n===a[++i]&&i<s);e.match_length=S-(s-i),e.match_length>e.lookahead&&(e.match_length=e.lookahead)}if(e.match_length>=x?(r=u._tr_tally(e,1,e.match_length-x),e.lookahead-=e.match_length,e.strstart+=e.match_length,e.match_length=0):(r=u._tr_tally(e,0,e.window[e.strstart]),e.lookahead--,e.strstart++),r&&(N(e,!1),0===e.strm.avail_out))return A}return e.insert=0,t===f?(N(e,!0),0===e.strm.avail_out?O:B):e.last_lit&&(N(e,!1),0===e.strm.avail_out)?A:I}(n,t):h[n.level].func(n,t);if(o!==O&&o!==B||(n.status=666),o===A||o===O)return 0===e.avail_out&&(n.last_flush=-1),m;if(o===I&&(1===t?u._tr_align(n):5!==t&&(u._tr_stored_block(n,0,0,!1),3===t&&(D(n.head),0===n.lookahead&&(n.strstart=0,n.block_start=0,n.insert=0))),F(e),0===e.avail_out))return n.last_flush=-1,m}return t!==f?m:n.wrap<=0?1:(2===n.wrap?(U(n,255&e.adler),U(n,e.adler>>8&255),U(n,e.adler>>16&255),U(n,e.adler>>24&255),U(n,255&e.total_in),U(n,e.total_in>>8&255),U(n,e.total_in>>16&255),U(n,e.total_in>>24&255)):(P(n,e.adler>>>16),P(n,65535&e.adler)),F(e),0<n.wrap&&(n.wrap=-n.wrap),0!==n.pending?m:1)},r.deflateEnd=function(e){var t;return e&&e.state?(t=e.state.status)!==C&&69!==t&&73!==t&&91!==t&&103!==t&&t!==E&&666!==t?R(e,_):(e.state=null,t===E?R(e,-3):m):_},r.deflateSetDictionary=function(e,t){var r,n,i,s,a,o,h,u,l=t.length;if(!e||!e.state)return _;if(2===(s=(r=e.state).wrap)||1===s&&r.status!==C||r.lookahead)return _;for(1===s&&(e.adler=d(e.adler,t,l,0)),r.wrap=0,l>=r.w_size&&(0===s&&(D(r.head),r.strstart=0,r.block_start=0,r.insert=0),u=new c.Buf8(r.w_size),c.arraySet(u,t,l-r.w_size,r.w_size,0),t=u,l=r.w_size),a=e.avail_in,o=e.next_in,h=e.input,e.avail_in=l,e.next_in=0,e.input=t,j(r);r.lookahead>=x;){for(n=r.strstart,i=r.lookahead-(x-1);r.ins_h=(r.ins_h<<r.hash_shift^r.window[n+x-1])&r.hash_mask,r.prev[n&r.w_mask]=r.head[r.ins_h],r.head[r.ins_h]=n,n++,--i;);r.strstart=n,r.lookahead=x-1,j(r)}return r.strstart+=r.lookahead,r.block_start=r.strstart,r.insert=r.lookahead,r.lookahead=0,r.match_length=r.prev_length=x-1,r.match_available=0,e.next_in=o,e.input=h,e.avail_in=a,r.wrap=s,m},r.deflateInfo="pako deflate (from Nodeca project)"},{"../utils/common":41,"./adler32":43,"./crc32":45,"./messages":51,"./trees":52}],47:[function(e,t,r){"use strict";t.exports=function(){this.text=0,this.time=0,this.xflags=0,this.os=0,this.extra=null,this.extra_len=0,this.name="",this.comment="",this.hcrc=0,this.done=!1}},{}],48:[function(e,t,r){"use strict";t.exports=function(e,t){var r,n,i,s,a,o,h,u,l,f,c,d,p,m,_,g,b,v,y,w,k,x,S,z,C;r=e.state,n=e.next_in,z=e.input,i=n+(e.avail_in-5),s=e.next_out,C=e.output,a=s-(t-e.avail_out),o=s+(e.avail_out-257),h=r.dmax,u=r.wsize,l=r.whave,f=r.wnext,c=r.window,d=r.hold,p=r.bits,m=r.lencode,_=r.distcode,g=(1<<r.lenbits)-1,b=(1<<r.distbits)-1;e:do{p<15&&(d+=z[n++]<<p,p+=8,d+=z[n++]<<p,p+=8),v=m[d&g];t:for(;;){if(d>>>=y=v>>>24,p-=y,0===(y=v>>>16&255))C[s++]=65535&v;else{if(!(16&y)){if(0==(64&y)){v=m[(65535&v)+(d&(1<<y)-1)];continue t}if(32&y){r.mode=12;break e}e.msg="invalid literal/length code",r.mode=30;break e}w=65535&v,(y&=15)&&(p<y&&(d+=z[n++]<<p,p+=8),w+=d&(1<<y)-1,d>>>=y,p-=y),p<15&&(d+=z[n++]<<p,p+=8,d+=z[n++]<<p,p+=8),v=_[d&b];r:for(;;){if(d>>>=y=v>>>24,p-=y,!(16&(y=v>>>16&255))){if(0==(64&y)){v=_[(65535&v)+(d&(1<<y)-1)];continue r}e.msg="invalid distance code",r.mode=30;break e}if(k=65535&v,p<(y&=15)&&(d+=z[n++]<<p,(p+=8)<y&&(d+=z[n++]<<p,p+=8)),h<(k+=d&(1<<y)-1)){e.msg="invalid distance too far back",r.mode=30;break e}if(d>>>=y,p-=y,(y=s-a)<k){if(l<(y=k-y)&&r.sane){e.msg="invalid distance too far back",r.mode=30;break e}if(S=c,(x=0)===f){if(x+=u-y,y<w){for(w-=y;C[s++]=c[x++],--y;);x=s-k,S=C}}else if(f<y){if(x+=u+f-y,(y-=f)<w){for(w-=y;C[s++]=c[x++],--y;);if(x=0,f<w){for(w-=y=f;C[s++]=c[x++],--y;);x=s-k,S=C}}}else if(x+=f-y,y<w){for(w-=y;C[s++]=c[x++],--y;);x=s-k,S=C}for(;2<w;)C[s++]=S[x++],C[s++]=S[x++],C[s++]=S[x++],w-=3;w&&(C[s++]=S[x++],1<w&&(C[s++]=S[x++]))}else{for(x=s-k;C[s++]=C[x++],C[s++]=C[x++],C[s++]=C[x++],2<(w-=3););w&&(C[s++]=C[x++],1<w&&(C[s++]=C[x++]))}break}}break}}while(n<i&&s<o);n-=w=p>>3,d&=(1<<(p-=w<<3))-1,e.next_in=n,e.next_out=s,e.avail_in=n<i?i-n+5:5-(n-i),e.avail_out=s<o?o-s+257:257-(s-o),r.hold=d,r.bits=p}},{}],49:[function(e,t,r){"use strict";var I=e("../utils/common"),O=e("./adler32"),B=e("./crc32"),R=e("./inffast"),T=e("./inftrees"),D=1,F=2,N=0,U=-2,P=1,n=852,i=592;function L(e){return(e>>>24&255)+(e>>>8&65280)+((65280&e)<<8)+((255&e)<<24)}function s(){this.mode=0,this.last=!1,this.wrap=0,this.havedict=!1,this.flags=0,this.dmax=0,this.check=0,this.total=0,this.head=null,this.wbits=0,this.wsize=0,this.whave=0,this.wnext=0,this.window=null,this.hold=0,this.bits=0,this.length=0,this.offset=0,this.extra=0,this.lencode=null,this.distcode=null,this.lenbits=0,this.distbits=0,this.ncode=0,this.nlen=0,this.ndist=0,this.have=0,this.next=null,this.lens=new I.Buf16(320),this.work=new I.Buf16(288),this.lendyn=null,this.distdyn=null,this.sane=0,this.back=0,this.was=0}function a(e){var t;return e&&e.state?(t=e.state,e.total_in=e.total_out=t.total=0,e.msg="",t.wrap&&(e.adler=1&t.wrap),t.mode=P,t.last=0,t.havedict=0,t.dmax=32768,t.head=null,t.hold=0,t.bits=0,t.lencode=t.lendyn=new I.Buf32(n),t.distcode=t.distdyn=new I.Buf32(i),t.sane=1,t.back=-1,N):U}function o(e){var t;return e&&e.state?((t=e.state).wsize=0,t.whave=0,t.wnext=0,a(e)):U}function h(e,t){var r,n;return e&&e.state?(n=e.state,t<0?(r=0,t=-t):(r=1+(t>>4),t<48&&(t&=15)),t&&(t<8||15<t)?U:(null!==n.window&&n.wbits!==t&&(n.window=null),n.wrap=r,n.wbits=t,o(e))):U}function u(e,t){var r,n;return e?(n=new s,(e.state=n).window=null,(r=h(e,t))!==N&&(e.state=null),r):U}var l,f,c=!0;function j(e){if(c){var t;for(l=new I.Buf32(512),f=new I.Buf32(32),t=0;t<144;)e.lens[t++]=8;for(;t<256;)e.lens[t++]=9;for(;t<280;)e.lens[t++]=7;for(;t<288;)e.lens[t++]=8;for(T(D,e.lens,0,288,l,0,e.work,{bits:9}),t=0;t<32;)e.lens[t++]=5;T(F,e.lens,0,32,f,0,e.work,{bits:5}),c=!1}e.lencode=l,e.lenbits=9,e.distcode=f,e.distbits=5}function Z(e,t,r,n){var i,s=e.state;return null===s.window&&(s.wsize=1<<s.wbits,s.wnext=0,s.whave=0,s.window=new I.Buf8(s.wsize)),n>=s.wsize?(I.arraySet(s.window,t,r-s.wsize,s.wsize,0),s.wnext=0,s.whave=s.wsize):(n<(i=s.wsize-s.wnext)&&(i=n),I.arraySet(s.window,t,r-n,i,s.wnext),(n-=i)?(I.arraySet(s.window,t,r-n,n,0),s.wnext=n,s.whave=s.wsize):(s.wnext+=i,s.wnext===s.wsize&&(s.wnext=0),s.whave<s.wsize&&(s.whave+=i))),0}r.inflateReset=o,r.inflateReset2=h,r.inflateResetKeep=a,r.inflateInit=function(e){return u(e,15)},r.inflateInit2=u,r.inflate=function(e,t){var r,n,i,s,a,o,h,u,l,f,c,d,p,m,_,g,b,v,y,w,k,x,S,z,C=0,E=new I.Buf8(4),A=[16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15];if(!e||!e.state||!e.output||!e.input&&0!==e.avail_in)return U;12===(r=e.state).mode&&(r.mode=13),a=e.next_out,i=e.output,h=e.avail_out,s=e.next_in,n=e.input,o=e.avail_in,u=r.hold,l=r.bits,f=o,c=h,x=N;e:for(;;)switch(r.mode){case P:if(0===r.wrap){r.mode=13;break}for(;l<16;){if(0===o)break e;o--,u+=n[s++]<<l,l+=8}if(2&r.wrap&&35615===u){E[r.check=0]=255&u,E[1]=u>>>8&255,r.check=B(r.check,E,2,0),l=u=0,r.mode=2;break}if(r.flags=0,r.head&&(r.head.done=!1),!(1&r.wrap)||(((255&u)<<8)+(u>>8))%31){e.msg="incorrect header check",r.mode=30;break}if(8!=(15&u)){e.msg="unknown compression method",r.mode=30;break}if(l-=4,k=8+(15&(u>>>=4)),0===r.wbits)r.wbits=k;else if(k>r.wbits){e.msg="invalid window size",r.mode=30;break}r.dmax=1<<k,e.adler=r.check=1,r.mode=512&u?10:12,l=u=0;break;case 2:for(;l<16;){if(0===o)break e;o--,u+=n[s++]<<l,l+=8}if(r.flags=u,8!=(255&r.flags)){e.msg="unknown compression method",r.mode=30;break}if(57344&r.flags){e.msg="unknown header flags set",r.mode=30;break}r.head&&(r.head.text=u>>8&1),512&r.flags&&(E[0]=255&u,E[1]=u>>>8&255,r.check=B(r.check,E,2,0)),l=u=0,r.mode=3;case 3:for(;l<32;){if(0===o)break e;o--,u+=n[s++]<<l,l+=8}r.head&&(r.head.time=u),512&r.flags&&(E[0]=255&u,E[1]=u>>>8&255,E[2]=u>>>16&255,E[3]=u>>>24&255,r.check=B(r.check,E,4,0)),l=u=0,r.mode=4;case 4:for(;l<16;){if(0===o)break e;o--,u+=n[s++]<<l,l+=8}r.head&&(r.head.xflags=255&u,r.head.os=u>>8),512&r.flags&&(E[0]=255&u,E[1]=u>>>8&255,r.check=B(r.check,E,2,0)),l=u=0,r.mode=5;case 5:if(1024&r.flags){for(;l<16;){if(0===o)break e;o--,u+=n[s++]<<l,l+=8}r.length=u,r.head&&(r.head.extra_len=u),512&r.flags&&(E[0]=255&u,E[1]=u>>>8&255,r.check=B(r.check,E,2,0)),l=u=0}else r.head&&(r.head.extra=null);r.mode=6;case 6:if(1024&r.flags&&(o<(d=r.length)&&(d=o),d&&(r.head&&(k=r.head.extra_len-r.length,r.head.extra||(r.head.extra=new Array(r.head.extra_len)),I.arraySet(r.head.extra,n,s,d,k)),512&r.flags&&(r.check=B(r.check,n,d,s)),o-=d,s+=d,r.length-=d),r.length))break e;r.length=0,r.mode=7;case 7:if(2048&r.flags){if(0===o)break e;for(d=0;k=n[s+d++],r.head&&k&&r.length<65536&&(r.head.name+=String.fromCharCode(k)),k&&d<o;);if(512&r.flags&&(r.check=B(r.check,n,d,s)),o-=d,s+=d,k)break e}else r.head&&(r.head.name=null);r.length=0,r.mode=8;case 8:if(4096&r.flags){if(0===o)break e;for(d=0;k=n[s+d++],r.head&&k&&r.length<65536&&(r.head.comment+=String.fromCharCode(k)),k&&d<o;);if(512&r.flags&&(r.check=B(r.check,n,d,s)),o-=d,s+=d,k)break e}else r.head&&(r.head.comment=null);r.mode=9;case 9:if(512&r.flags){for(;l<16;){if(0===o)break e;o--,u+=n[s++]<<l,l+=8}if(u!==(65535&r.check)){e.msg="header crc mismatch",r.mode=30;break}l=u=0}r.head&&(r.head.hcrc=r.flags>>9&1,r.head.done=!0),e.adler=r.check=0,r.mode=12;break;case 10:for(;l<32;){if(0===o)break e;o--,u+=n[s++]<<l,l+=8}e.adler=r.check=L(u),l=u=0,r.mode=11;case 11:if(0===r.havedict)return e.next_out=a,e.avail_out=h,e.next_in=s,e.avail_in=o,r.hold=u,r.bits=l,2;e.adler=r.check=1,r.mode=12;case 12:if(5===t||6===t)break e;case 13:if(r.last){u>>>=7&l,l-=7&l,r.mode=27;break}for(;l<3;){if(0===o)break e;o--,u+=n[s++]<<l,l+=8}switch(r.last=1&u,l-=1,3&(u>>>=1)){case 0:r.mode=14;break;case 1:if(j(r),r.mode=20,6!==t)break;u>>>=2,l-=2;break e;case 2:r.mode=17;break;case 3:e.msg="invalid block type",r.mode=30}u>>>=2,l-=2;break;case 14:for(u>>>=7&l,l-=7&l;l<32;){if(0===o)break e;o--,u+=n[s++]<<l,l+=8}if((65535&u)!=(u>>>16^65535)){e.msg="invalid stored block lengths",r.mode=30;break}if(r.length=65535&u,l=u=0,r.mode=15,6===t)break e;case 15:r.mode=16;case 16:if(d=r.length){if(o<d&&(d=o),h<d&&(d=h),0===d)break e;I.arraySet(i,n,s,d,a),o-=d,s+=d,h-=d,a+=d,r.length-=d;break}r.mode=12;break;case 17:for(;l<14;){if(0===o)break e;o--,u+=n[s++]<<l,l+=8}if(r.nlen=257+(31&u),u>>>=5,l-=5,r.ndist=1+(31&u),u>>>=5,l-=5,r.ncode=4+(15&u),u>>>=4,l-=4,286<r.nlen||30<r.ndist){e.msg="too many length or distance symbols",r.mode=30;break}r.have=0,r.mode=18;case 18:for(;r.have<r.ncode;){for(;l<3;){if(0===o)break e;o--,u+=n[s++]<<l,l+=8}r.lens[A[r.have++]]=7&u,u>>>=3,l-=3}for(;r.have<19;)r.lens[A[r.have++]]=0;if(r.lencode=r.lendyn,r.lenbits=7,S={bits:r.lenbits},x=T(0,r.lens,0,19,r.lencode,0,r.work,S),r.lenbits=S.bits,x){e.msg="invalid code lengths set",r.mode=30;break}r.have=0,r.mode=19;case 19:for(;r.have<r.nlen+r.ndist;){for(;g=(C=r.lencode[u&(1<<r.lenbits)-1])>>>16&255,b=65535&C,!((_=C>>>24)<=l);){if(0===o)break e;o--,u+=n[s++]<<l,l+=8}if(b<16)u>>>=_,l-=_,r.lens[r.have++]=b;else{if(16===b){for(z=_+2;l<z;){if(0===o)break e;o--,u+=n[s++]<<l,l+=8}if(u>>>=_,l-=_,0===r.have){e.msg="invalid bit length repeat",r.mode=30;break}k=r.lens[r.have-1],d=3+(3&u),u>>>=2,l-=2}else if(17===b){for(z=_+3;l<z;){if(0===o)break e;o--,u+=n[s++]<<l,l+=8}l-=_,k=0,d=3+(7&(u>>>=_)),u>>>=3,l-=3}else{for(z=_+7;l<z;){if(0===o)break e;o--,u+=n[s++]<<l,l+=8}l-=_,k=0,d=11+(127&(u>>>=_)),u>>>=7,l-=7}if(r.have+d>r.nlen+r.ndist){e.msg="invalid bit length repeat",r.mode=30;break}for(;d--;)r.lens[r.have++]=k}}if(30===r.mode)break;if(0===r.lens[256]){e.msg="invalid code -- missing end-of-block",r.mode=30;break}if(r.lenbits=9,S={bits:r.lenbits},x=T(D,r.lens,0,r.nlen,r.lencode,0,r.work,S),r.lenbits=S.bits,x){e.msg="invalid literal/lengths set",r.mode=30;break}if(r.distbits=6,r.distcode=r.distdyn,S={bits:r.distbits},x=T(F,r.lens,r.nlen,r.ndist,r.distcode,0,r.work,S),r.distbits=S.bits,x){e.msg="invalid distances set",r.mode=30;break}if(r.mode=20,6===t)break e;case 20:r.mode=21;case 21:if(6<=o&&258<=h){e.next_out=a,e.avail_out=h,e.next_in=s,e.avail_in=o,r.hold=u,r.bits=l,R(e,c),a=e.next_out,i=e.output,h=e.avail_out,s=e.next_in,n=e.input,o=e.avail_in,u=r.hold,l=r.bits,12===r.mode&&(r.back=-1);break}for(r.back=0;g=(C=r.lencode[u&(1<<r.lenbits)-1])>>>16&255,b=65535&C,!((_=C>>>24)<=l);){if(0===o)break e;o--,u+=n[s++]<<l,l+=8}if(g&&0==(240&g)){for(v=_,y=g,w=b;g=(C=r.lencode[w+((u&(1<<v+y)-1)>>v)])>>>16&255,b=65535&C,!(v+(_=C>>>24)<=l);){if(0===o)break e;o--,u+=n[s++]<<l,l+=8}u>>>=v,l-=v,r.back+=v}if(u>>>=_,l-=_,r.back+=_,r.length=b,0===g){r.mode=26;break}if(32&g){r.back=-1,r.mode=12;break}if(64&g){e.msg="invalid literal/length code",r.mode=30;break}r.extra=15&g,r.mode=22;case 22:if(r.extra){for(z=r.extra;l<z;){if(0===o)break e;o--,u+=n[s++]<<l,l+=8}r.length+=u&(1<<r.extra)-1,u>>>=r.extra,l-=r.extra,r.back+=r.extra}r.was=r.length,r.mode=23;case 23:for(;g=(C=r.distcode[u&(1<<r.distbits)-1])>>>16&255,b=65535&C,!((_=C>>>24)<=l);){if(0===o)break e;o--,u+=n[s++]<<l,l+=8}if(0==(240&g)){for(v=_,y=g,w=b;g=(C=r.distcode[w+((u&(1<<v+y)-1)>>v)])>>>16&255,b=65535&C,!(v+(_=C>>>24)<=l);){if(0===o)break e;o--,u+=n[s++]<<l,l+=8}u>>>=v,l-=v,r.back+=v}if(u>>>=_,l-=_,r.back+=_,64&g){e.msg="invalid distance code",r.mode=30;break}r.offset=b,r.extra=15&g,r.mode=24;case 24:if(r.extra){for(z=r.extra;l<z;){if(0===o)break e;o--,u+=n[s++]<<l,l+=8}r.offset+=u&(1<<r.extra)-1,u>>>=r.extra,l-=r.extra,r.back+=r.extra}if(r.offset>r.dmax){e.msg="invalid distance too far back",r.mode=30;break}r.mode=25;case 25:if(0===h)break e;if(d=c-h,r.offset>d){if((d=r.offset-d)>r.whave&&r.sane){e.msg="invalid distance too far back",r.mode=30;break}p=d>r.wnext?(d-=r.wnext,r.wsize-d):r.wnext-d,d>r.length&&(d=r.length),m=r.window}else m=i,p=a-r.offset,d=r.length;for(h<d&&(d=h),h-=d,r.length-=d;i[a++]=m[p++],--d;);0===r.length&&(r.mode=21);break;case 26:if(0===h)break e;i[a++]=r.length,h--,r.mode=21;break;case 27:if(r.wrap){for(;l<32;){if(0===o)break e;o--,u|=n[s++]<<l,l+=8}if(c-=h,e.total_out+=c,r.total+=c,c&&(e.adler=r.check=r.flags?B(r.check,i,c,a-c):O(r.check,i,c,a-c)),c=h,(r.flags?u:L(u))!==r.check){e.msg="incorrect data check",r.mode=30;break}l=u=0}r.mode=28;case 28:if(r.wrap&&r.flags){for(;l<32;){if(0===o)break e;o--,u+=n[s++]<<l,l+=8}if(u!==(4294967295&r.total)){e.msg="incorrect length check",r.mode=30;break}l=u=0}r.mode=29;case 29:x=1;break e;case 30:x=-3;break e;case 31:return-4;case 32:default:return U}return e.next_out=a,e.avail_out=h,e.next_in=s,e.avail_in=o,r.hold=u,r.bits=l,(r.wsize||c!==e.avail_out&&r.mode<30&&(r.mode<27||4!==t))&&Z(e,e.output,e.next_out,c-e.avail_out)?(r.mode=31,-4):(f-=e.avail_in,c-=e.avail_out,e.total_in+=f,e.total_out+=c,r.total+=c,r.wrap&&c&&(e.adler=r.check=r.flags?B(r.check,i,c,e.next_out-c):O(r.check,i,c,e.next_out-c)),e.data_type=r.bits+(r.last?64:0)+(12===r.mode?128:0)+(20===r.mode||15===r.mode?256:0),(0==f&&0===c||4===t)&&x===N&&(x=-5),x)},r.inflateEnd=function(e){if(!e||!e.state)return U;var t=e.state;return t.window&&(t.window=null),e.state=null,N},r.inflateGetHeader=function(e,t){var r;return e&&e.state?0==(2&(r=e.state).wrap)?U:((r.head=t).done=!1,N):U},r.inflateSetDictionary=function(e,t){var r,n=t.length;return e&&e.state?0!==(r=e.state).wrap&&11!==r.mode?U:11===r.mode&&O(1,t,n,0)!==r.check?-3:Z(e,t,n,n)?(r.mode=31,-4):(r.havedict=1,N):U},r.inflateInfo="pako inflate (from Nodeca project)"},{"../utils/common":41,"./adler32":43,"./crc32":45,"./inffast":48,"./inftrees":50}],50:[function(e,t,r){"use strict";var D=e("../utils/common"),F=[3,4,5,6,7,8,9,10,11,13,15,17,19,23,27,31,35,43,51,59,67,83,99,115,131,163,195,227,258,0,0],N=[16,16,16,16,16,16,16,16,17,17,17,17,18,18,18,18,19,19,19,19,20,20,20,20,21,21,21,21,16,72,78],U=[1,2,3,4,5,7,9,13,17,25,33,49,65,97,129,193,257,385,513,769,1025,1537,2049,3073,4097,6145,8193,12289,16385,24577,0,0],P=[16,16,16,16,17,17,18,18,19,19,20,20,21,21,22,22,23,23,24,24,25,25,26,26,27,27,28,28,29,29,64,64];t.exports=function(e,t,r,n,i,s,a,o){var h,u,l,f,c,d,p,m,_,g=o.bits,b=0,v=0,y=0,w=0,k=0,x=0,S=0,z=0,C=0,E=0,A=null,I=0,O=new D.Buf16(16),B=new D.Buf16(16),R=null,T=0;for(b=0;b<=15;b++)O[b]=0;for(v=0;v<n;v++)O[t[r+v]]++;for(k=g,w=15;1<=w&&0===O[w];w--);if(w<k&&(k=w),0===w)return i[s++]=20971520,i[s++]=20971520,o.bits=1,0;for(y=1;y<w&&0===O[y];y++);for(k<y&&(k=y),b=z=1;b<=15;b++)if(z<<=1,(z-=O[b])<0)return-1;if(0<z&&(0===e||1!==w))return-1;for(B[1]=0,b=1;b<15;b++)B[b+1]=B[b]+O[b];for(v=0;v<n;v++)0!==t[r+v]&&(a[B[t[r+v]]++]=v);if(d=0===e?(A=R=a,19):1===e?(A=F,I-=257,R=N,T-=257,256):(A=U,R=P,-1),b=y,c=s,S=v=E=0,l=-1,f=(C=1<<(x=k))-1,1===e&&852<C||2===e&&592<C)return 1;for(;;){for(p=b-S,_=a[v]<d?(m=0,a[v]):a[v]>d?(m=R[T+a[v]],A[I+a[v]]):(m=96,0),h=1<<b-S,y=u=1<<x;i[c+(E>>S)+(u-=h)]=p<<24|m<<16|_|0,0!==u;);for(h=1<<b-1;E&h;)h>>=1;if(0!==h?(E&=h-1,E+=h):E=0,v++,0==--O[b]){if(b===w)break;b=t[r+a[v]]}if(k<b&&(E&f)!==l){for(0===S&&(S=k),c+=y,z=1<<(x=b-S);x+S<w&&!((z-=O[x+S])<=0);)x++,z<<=1;if(C+=1<<x,1===e&&852<C||2===e&&592<C)return 1;i[l=E&f]=k<<24|x<<16|c-s|0}}return 0!==E&&(i[c+E]=b-S<<24|64<<16|0),o.bits=k,0}},{"../utils/common":41}],51:[function(e,t,r){"use strict";t.exports={2:"need dictionary",1:"stream end",0:"","-1":"file error","-2":"stream error","-3":"data error","-4":"insufficient memory","-5":"buffer error","-6":"incompatible version"}},{}],52:[function(e,t,r){"use strict";var i=e("../utils/common"),o=0,h=1;function n(e){for(var t=e.length;0<=--t;)e[t]=0}var s=0,a=29,u=256,l=u+1+a,f=30,c=19,_=2*l+1,g=15,d=16,p=7,m=256,b=16,v=17,y=18,w=[0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0],k=[0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13],x=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,3,7],S=[16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15],z=new Array(2*(l+2));n(z);var C=new Array(2*f);n(C);var E=new Array(512);n(E);var A=new Array(256);n(A);var I=new Array(a);n(I);var O,B,R,T=new Array(f);function D(e,t,r,n,i){this.static_tree=e,this.extra_bits=t,this.extra_base=r,this.elems=n,this.max_length=i,this.has_stree=e&&e.length}function F(e,t){this.dyn_tree=e,this.max_code=0,this.stat_desc=t}function N(e){return e<256?E[e]:E[256+(e>>>7)]}function U(e,t){e.pending_buf[e.pending++]=255&t,e.pending_buf[e.pending++]=t>>>8&255}function P(e,t,r){e.bi_valid>d-r?(e.bi_buf|=t<<e.bi_valid&65535,U(e,e.bi_buf),e.bi_buf=t>>d-e.bi_valid,e.bi_valid+=r-d):(e.bi_buf|=t<<e.bi_valid&65535,e.bi_valid+=r)}function L(e,t,r){P(e,r[2*t],r[2*t+1])}function j(e,t){for(var r=0;r|=1&e,e>>>=1,r<<=1,0<--t;);return r>>>1}function Z(e,t,r){var n,i,s=new Array(g+1),a=0;for(n=1;n<=g;n++)s[n]=a=a+r[n-1]<<1;for(i=0;i<=t;i++){var o=e[2*i+1];0!==o&&(e[2*i]=j(s[o]++,o))}}function W(e){var t;for(t=0;t<l;t++)e.dyn_ltree[2*t]=0;for(t=0;t<f;t++)e.dyn_dtree[2*t]=0;for(t=0;t<c;t++)e.bl_tree[2*t]=0;e.dyn_ltree[2*m]=1,e.opt_len=e.static_len=0,e.last_lit=e.matches=0}function M(e){8<e.bi_valid?U(e,e.bi_buf):0<e.bi_valid&&(e.pending_buf[e.pending++]=e.bi_buf),e.bi_buf=0,e.bi_valid=0}function H(e,t,r,n){var i=2*t,s=2*r;return e[i]<e[s]||e[i]===e[s]&&n[t]<=n[r]}function G(e,t,r){for(var n=e.heap[r],i=r<<1;i<=e.heap_len&&(i<e.heap_len&&H(t,e.heap[i+1],e.heap[i],e.depth)&&i++,!H(t,n,e.heap[i],e.depth));)e.heap[r]=e.heap[i],r=i,i<<=1;e.heap[r]=n}function K(e,t,r){var n,i,s,a,o=0;if(0!==e.last_lit)for(;n=e.pending_buf[e.d_buf+2*o]<<8|e.pending_buf[e.d_buf+2*o+1],i=e.pending_buf[e.l_buf+o],o++,0===n?L(e,i,t):(L(e,(s=A[i])+u+1,t),0!==(a=w[s])&&P(e,i-=I[s],a),L(e,s=N(--n),r),0!==(a=k[s])&&P(e,n-=T[s],a)),o<e.last_lit;);L(e,m,t)}function Y(e,t){var r,n,i,s=t.dyn_tree,a=t.stat_desc.static_tree,o=t.stat_desc.has_stree,h=t.stat_desc.elems,u=-1;for(e.heap_len=0,e.heap_max=_,r=0;r<h;r++)0!==s[2*r]?(e.heap[++e.heap_len]=u=r,e.depth[r]=0):s[2*r+1]=0;for(;e.heap_len<2;)s[2*(i=e.heap[++e.heap_len]=u<2?++u:0)]=1,e.depth[i]=0,e.opt_len--,o&&(e.static_len-=a[2*i+1]);for(t.max_code=u,r=e.heap_len>>1;1<=r;r--)G(e,s,r);for(i=h;r=e.heap[1],e.heap[1]=e.heap[e.heap_len--],G(e,s,1),n=e.heap[1],e.heap[--e.heap_max]=r,e.heap[--e.heap_max]=n,s[2*i]=s[2*r]+s[2*n],e.depth[i]=(e.depth[r]>=e.depth[n]?e.depth[r]:e.depth[n])+1,s[2*r+1]=s[2*n+1]=i,e.heap[1]=i++,G(e,s,1),2<=e.heap_len;);e.heap[--e.heap_max]=e.heap[1],function(e,t){var r,n,i,s,a,o,h=t.dyn_tree,u=t.max_code,l=t.stat_desc.static_tree,f=t.stat_desc.has_stree,c=t.stat_desc.extra_bits,d=t.stat_desc.extra_base,p=t.stat_desc.max_length,m=0;for(s=0;s<=g;s++)e.bl_count[s]=0;for(h[2*e.heap[e.heap_max]+1]=0,r=e.heap_max+1;r<_;r++)p<(s=h[2*h[2*(n=e.heap[r])+1]+1]+1)&&(s=p,m++),h[2*n+1]=s,u<n||(e.bl_count[s]++,a=0,d<=n&&(a=c[n-d]),o=h[2*n],e.opt_len+=o*(s+a),f&&(e.static_len+=o*(l[2*n+1]+a)));if(0!==m){do{for(s=p-1;0===e.bl_count[s];)s--;e.bl_count[s]--,e.bl_count[s+1]+=2,e.bl_count[p]--,m-=2}while(0<m);for(s=p;0!==s;s--)for(n=e.bl_count[s];0!==n;)u<(i=e.heap[--r])||(h[2*i+1]!==s&&(e.opt_len+=(s-h[2*i+1])*h[2*i],h[2*i+1]=s),n--)}}(e,t),Z(s,u,e.bl_count)}function X(e,t,r){var n,i,s=-1,a=t[1],o=0,h=7,u=4;for(0===a&&(h=138,u=3),t[2*(r+1)+1]=65535,n=0;n<=r;n++)i=a,a=t[2*(n+1)+1],++o<h&&i===a||(o<u?e.bl_tree[2*i]+=o:0!==i?(i!==s&&e.bl_tree[2*i]++,e.bl_tree[2*b]++):o<=10?e.bl_tree[2*v]++:e.bl_tree[2*y]++,s=i,u=(o=0)===a?(h=138,3):i===a?(h=6,3):(h=7,4))}function V(e,t,r){var n,i,s=-1,a=t[1],o=0,h=7,u=4;for(0===a&&(h=138,u=3),n=0;n<=r;n++)if(i=a,a=t[2*(n+1)+1],!(++o<h&&i===a)){if(o<u)for(;L(e,i,e.bl_tree),0!=--o;);else 0!==i?(i!==s&&(L(e,i,e.bl_tree),o--),L(e,b,e.bl_tree),P(e,o-3,2)):o<=10?(L(e,v,e.bl_tree),P(e,o-3,3)):(L(e,y,e.bl_tree),P(e,o-11,7));s=i,u=(o=0)===a?(h=138,3):i===a?(h=6,3):(h=7,4)}}n(T);var q=!1;function J(e,t,r,n){P(e,(s<<1)+(n?1:0),3),function(e,t,r,n){M(e),n&&(U(e,r),U(e,~r)),i.arraySet(e.pending_buf,e.window,t,r,e.pending),e.pending+=r}(e,t,r,!0)}r._tr_init=function(e){q||(function(){var e,t,r,n,i,s=new Array(g+1);for(n=r=0;n<a-1;n++)for(I[n]=r,e=0;e<1<<w[n];e++)A[r++]=n;for(A[r-1]=n,n=i=0;n<16;n++)for(T[n]=i,e=0;e<1<<k[n];e++)E[i++]=n;for(i>>=7;n<f;n++)for(T[n]=i<<7,e=0;e<1<<k[n]-7;e++)E[256+i++]=n;for(t=0;t<=g;t++)s[t]=0;for(e=0;e<=143;)z[2*e+1]=8,e++,s[8]++;for(;e<=255;)z[2*e+1]=9,e++,s[9]++;for(;e<=279;)z[2*e+1]=7,e++,s[7]++;for(;e<=287;)z[2*e+1]=8,e++,s[8]++;for(Z(z,l+1,s),e=0;e<f;e++)C[2*e+1]=5,C[2*e]=j(e,5);O=new D(z,w,u+1,l,g),B=new D(C,k,0,f,g),R=new D(new Array(0),x,0,c,p)}(),q=!0),e.l_desc=new F(e.dyn_ltree,O),e.d_desc=new F(e.dyn_dtree,B),e.bl_desc=new F(e.bl_tree,R),e.bi_buf=0,e.bi_valid=0,W(e)},r._tr_stored_block=J,r._tr_flush_block=function(e,t,r,n){var i,s,a=0;0<e.level?(2===e.strm.data_type&&(e.strm.data_type=function(e){var t,r=4093624447;for(t=0;t<=31;t++,r>>>=1)if(1&r&&0!==e.dyn_ltree[2*t])return o;if(0!==e.dyn_ltree[18]||0!==e.dyn_ltree[20]||0!==e.dyn_ltree[26])return h;for(t=32;t<u;t++)if(0!==e.dyn_ltree[2*t])return h;return o}(e)),Y(e,e.l_desc),Y(e,e.d_desc),a=function(e){var t;for(X(e,e.dyn_ltree,e.l_desc.max_code),X(e,e.dyn_dtree,e.d_desc.max_code),Y(e,e.bl_desc),t=c-1;3<=t&&0===e.bl_tree[2*S[t]+1];t--);return e.opt_len+=3*(t+1)+5+5+4,t}(e),i=e.opt_len+3+7>>>3,(s=e.static_len+3+7>>>3)<=i&&(i=s)):i=s=r+5,r+4<=i&&-1!==t?J(e,t,r,n):4===e.strategy||s===i?(P(e,2+(n?1:0),3),K(e,z,C)):(P(e,4+(n?1:0),3),function(e,t,r,n){var i;for(P(e,t-257,5),P(e,r-1,5),P(e,n-4,4),i=0;i<n;i++)P(e,e.bl_tree[2*S[i]+1],3);V(e,e.dyn_ltree,t-1),V(e,e.dyn_dtree,r-1)}(e,e.l_desc.max_code+1,e.d_desc.max_code+1,a+1),K(e,e.dyn_ltree,e.dyn_dtree)),W(e),n&&M(e)},r._tr_tally=function(e,t,r){return e.pending_buf[e.d_buf+2*e.last_lit]=t>>>8&255,e.pending_buf[e.d_buf+2*e.last_lit+1]=255&t,e.pending_buf[e.l_buf+e.last_lit]=255&r,e.last_lit++,0===t?e.dyn_ltree[2*r]++:(e.matches++,t--,e.dyn_ltree[2*(A[r]+u+1)]++,e.dyn_dtree[2*N(t)]++),e.last_lit===e.lit_bufsize-1},r._tr_align=function(e){P(e,2,3),L(e,m,z),function(e){16===e.bi_valid?(U(e,e.bi_buf),e.bi_buf=0,e.bi_valid=0):8<=e.bi_valid&&(e.pending_buf[e.pending++]=255&e.bi_buf,e.bi_buf>>=8,e.bi_valid-=8)}(e)}},{"../utils/common":41}],53:[function(e,t,r){"use strict";t.exports=function(){this.input=null,this.next_in=0,this.avail_in=0,this.total_in=0,this.output=null,this.next_out=0,this.avail_out=0,this.total_out=0,this.msg="",this.state=null,this.data_type=2,this.adler=0}},{}],54:[function(e,t,r){(function(e){!function(r,n){"use strict";if(!r.setImmediate){var i,s,t,a,o=1,h={},u=!1,l=r.document,e=Object.getPrototypeOf&&Object.getPrototypeOf(r);e=e&&e.setTimeout?e:r,i="[object process]"==={}.toString.call(r.process)?function(e){process.nextTick(function(){c(e)})}:function(){if(r.postMessage&&!r.importScripts){var e=!0,t=r.onmessage;return r.onmessage=function(){e=!1},r.postMessage("","*"),r.onmessage=t,e}}()?(a="setImmediate$"+Math.random()+"$",r.addEventListener?r.addEventListener("message",d,!1):r.attachEvent("onmessage",d),function(e){r.postMessage(a+e,"*")}):r.MessageChannel?((t=new MessageChannel).port1.onmessage=function(e){c(e.data)},function(e){t.port2.postMessage(e)}):l&&"onreadystatechange"in l.createElement("script")?(s=l.documentElement,function(e){var t=l.createElement("script");t.onreadystatechange=function(){c(e),t.onreadystatechange=null,s.removeChild(t),t=null},s.appendChild(t)}):function(e){setTimeout(c,0,e)},e.setImmediate=function(e){"function"!=typeof e&&(e=new Function(""+e));for(var t=new Array(arguments.length-1),r=0;r<t.length;r++)t[r]=arguments[r+1];var n={callback:e,args:t};return h[o]=n,i(o),o++},e.clearImmediate=f}function f(e){delete h[e]}function c(e){if(u)setTimeout(c,0,e);else{var t=h[e];if(t){u=!0;try{!function(e){var t=e.callback,r=e.args;switch(r.length){case 0:t();break;case 1:t(r[0]);break;case 2:t(r[0],r[1]);break;case 3:t(r[0],r[1],r[2]);break;default:t.apply(n,r)}}(t)}finally{f(e),u=!1}}}}function d(e){e.source===r&&"string"==typeof e.data&&0===e.data.indexOf(a)&&c(+e.data.slice(a.length))}}("undefined"==typeof self?void 0===e?this:e:self)}).call(this,"undefined"!=typeof __webpack_require__.g?__webpack_require__.g:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{}]},{},[10])(10)});

/***/ },

/***/ 664
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   l: () => (/* binding */ lexer)
/* harmony export */ });
/* harmony import */ var _tokenTypes__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(778);
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(175);


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
                type: _tokenTypes__WEBPACK_IMPORTED_MODULE_0__/* .TokenType */ .k.Text,
                content: Tokenize(p),
            });
        }
        // 在这里修复了保存想法时，很短的段落可能会消失的问题（从第二段起，变为空白行），请大家自查之前保存的想法 07.28
        // 例 pin/1862470667586396160 pin/1845764257590939648 pin/1930759768441591386
        let blocks = dom.innerHTML.replace(/\n\s*/g, "").split(/<br><br>|<br data-first-child=""><br>/);
        for (let block of blocks) {
            let p = document.createElement("p");
            p.innerHTML = block;
            pinParagraphs.push({
                type: _tokenTypes__WEBPACK_IMPORTED_MODULE_0__/* .TokenType */ .k.Text,
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
                    type: _tokenTypes__WEBPACK_IMPORTED_MODULE_0__/* .TokenType */ .k.Text,
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
                    type: _tokenTypes__WEBPACK_IMPORTED_MODULE_0__/* .TokenType */ .k.Text,
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
                    type: _tokenTypes__WEBPACK_IMPORTED_MODULE_0__/* .TokenType */ .k.H2,
                    text: node.textContent,
                    dom: node
                });
                break;
            }
            case "h3": {
                tokens.push({
                    type: _tokenTypes__WEBPACK_IMPORTED_MODULE_0__/* .TokenType */ .k.H3,
                    text: node.textContent,
                    dom: node
                });
                break;
            }
            case "div": {
                if (node.classList.contains("highlight")) {
                    tokens.push({
                        type: _tokenTypes__WEBPACK_IMPORTED_MODULE_0__/* .TokenType */ .k.Code,
                        content: node.textContent,
                        language: node.querySelector("pre > code").classList.value.slice(9),
                        dom: node
                    });
                }
                else if (node.classList.contains("RichText-LinkCardContainer")) {
                    const link = node.firstChild;
                    tokens.push({
                        type: _tokenTypes__WEBPACK_IMPORTED_MODULE_0__/* .TokenType */ .k.Link,
                        text: link.getAttribute("data-text"),
                        href: (0,_utils__WEBPACK_IMPORTED_MODULE_1__/* .ZhihuLink2NormalLink */ .IQ)(link.href),
                        dom: node
                    });
                }
                else if (node.querySelector("video")) {
                    tokens.push({
                        type: _tokenTypes__WEBPACK_IMPORTED_MODULE_0__/* .TokenType */ .k.Video,
                        src: node.querySelector("video").getAttribute("src"),
                        local: false,
                        dom: node
                    });
                }
                else if (node.classList.contains("RichText-ADLinkCardContainer")) {
                    tokens.push({
                        type: _tokenTypes__WEBPACK_IMPORTED_MODULE_0__/* .TokenType */ .k.Text,
                        content: [{
                                type: _tokenTypes__WEBPACK_IMPORTED_MODULE_0__/* .TokenType */ .k.PlainText,
                                text: node.textContent
                            }],
                        dom: node
                    });
                }
                break;
            }
            case "blockquote": {
                tokens.push({
                    type: _tokenTypes__WEBPACK_IMPORTED_MODULE_0__/* .TokenType */ .k.Blockquote,
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
                            type: _tokenTypes__WEBPACK_IMPORTED_MODULE_0__/* .TokenType */ .k.Gif,
                            src,
                            local: false,
                            dom: node
                        });
                    }
                }
                else if (img.getAttribute('data-actualsrc')?.includes('/equation?tex=')) {
                    // 图片格式的公式
                    const altText = img.getAttribute('alt') || '';
                    if (altText) {
                        tokens.push({
                            type: _tokenTypes__WEBPACK_IMPORTED_MODULE_0__/* .TokenType */ .k.Text,
                            content: [{
                                    type: _tokenTypes__WEBPACK_IMPORTED_MODULE_0__/* .TokenType */ .k.Math,
                                    content: altText.trim(),
                                    display: true,
                                    dom: img
                                }],
                            dom: node
                        });
                    }
                }
                else {
                    const src = img.getAttribute("data-actualsrc") || img.getAttribute("data-original") || img.src;
                    if (src) {
                        tokens.push({
                            type: _tokenTypes__WEBPACK_IMPORTED_MODULE_0__/* .TokenType */ .k.Figure,
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
                        type: _tokenTypes__WEBPACK_IMPORTED_MODULE_0__/* .TokenType */ .k.Text,
                        content: [{
                                type: _tokenTypes__WEBPACK_IMPORTED_MODULE_0__/* .TokenType */ .k.Italic,
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
                    type: _tokenTypes__WEBPACK_IMPORTED_MODULE_0__/* .TokenType */ .k.UList,
                    content: childNodes.map((el) => Tokenize(el)),
                    dom: node,
                });
                break;
            }
            case "ol": {
                // 检查是否为脚注/参考文献列表
                if (node.classList.contains('ReferenceList')) {
                    const childNodes = Array.from(node.querySelectorAll("li"));
                    const items = childNodes.map((li) => {
                        // 提取脚注编号，从 id="ref_1" 中提取 "1"
                        const id = li.id.replace('ref_', '');
                        // 提取脚注内容，跳过返回链接，只取 span 中的文本
                        const span = li.querySelector('span');
                        const content = span ? span.textContent || '' : li.textContent || '';
                        return { id, content: content.trim() };
                    });
                    tokens.push({
                        type: _tokenTypes__WEBPACK_IMPORTED_MODULE_0__/* .TokenType */ .k.FootnoteList,
                        items,
                        dom: node,
                    });
                }
                else {
                    // 普通有序列表
                    const childNodes = Array.from(node.querySelectorAll("li"));
                    tokens.push({
                        type: _tokenTypes__WEBPACK_IMPORTED_MODULE_0__/* .TokenType */ .k.Olist,
                        content: childNodes.map((el) => Tokenize(el)),
                        dom: node,
                    });
                }
                break;
            }
            case "p": {
                if (skipEmpty && (node.classList.contains('ztext-empty-paragraph') || node.textContent.length == 0))
                    break;
                tokens.push({
                    type: _tokenTypes__WEBPACK_IMPORTED_MODULE_0__/* .TokenType */ .k.Text,
                    content: Tokenize(node),
                    dom: node
                });
                break;
            }
            case "hr": {
                tokens.push({
                    type: _tokenTypes__WEBPACK_IMPORTED_MODULE_0__/* .TokenType */ .k.HR,
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
                    type: _tokenTypes__WEBPACK_IMPORTED_MODULE_0__/* .TokenType */ .k.Table,
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
                type: _tokenTypes__WEBPACK_IMPORTED_MODULE_0__/* .TokenType */ .k.PlainText,
                text: node.replace('\t', '').replace(/^\s{2,}/, ''), // 修复被误识别为代码块，修复公式后面缺少空格的问题
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
    catch { }
    for (let child of childs) {
        if (child.nodeType == child.TEXT_NODE) {
            res.push({
                type: _tokenTypes__WEBPACK_IMPORTED_MODULE_0__/* .TokenType */ .k.PlainText,
                text: child.textContent.replace(/\u200B/g, '').replace('\t', '').replace(/^\s{2,}/, ''), // 修复被误识别为代码块，修复公式后面缺少空格的问题
                dom: child,
            });
        }
        else {
            let el = child;
            switch (el.tagName.toLowerCase()) {
                case "b": {
                    res.push({
                        type: _tokenTypes__WEBPACK_IMPORTED_MODULE_0__/* .TokenType */ .k.Bold,
                        content: Tokenize(el),
                        dom: el,
                    });
                    break;
                }
                case "i": {
                    res.push({
                        type: _tokenTypes__WEBPACK_IMPORTED_MODULE_0__/* .TokenType */ .k.Italic,
                        content: Tokenize(el),
                        dom: el,
                    });
                    break;
                }
                case "br": {
                    res.push({
                        type: _tokenTypes__WEBPACK_IMPORTED_MODULE_0__/* .TokenType */ .k.BR,
                        dom: el,
                    });
                    break;
                }
                case "code": {
                    res.push({
                        type: _tokenTypes__WEBPACK_IMPORTED_MODULE_0__/* .TokenType */ .k.InlineCode,
                        content: el.innerText,
                        dom: el,
                    });
                    break;
                }
                case "span": {
                    try {
                        if (el.classList.contains("ztext-math")) {
                            // 根据是否存在 MathJax_SVG_Display 类来判断是否为块级公式
                            const hasDisplayClass = el.querySelector(".MathJax_SVG_Display") !== null;
                            const content = el.getAttribute("data-tex").trim();
                            // 如果公式包含 \tag 命令，也应该是块级公式（\tag 只能在 display mode 中使用）
                            const hasTag = content.includes('\\tag');
                            const isDisplayMath = hasDisplayClass || hasTag;
                            res.push({
                                type: _tokenTypes__WEBPACK_IMPORTED_MODULE_0__/* .TokenType */ .k.Math,
                                content: content,
                                display: isDisplayMath,
                                dom: el,
                            });
                        }
                        else if (el.children[0].classList.contains("RichContent-EntityWord")) { //搜索词
                            res.push({
                                type: _tokenTypes__WEBPACK_IMPORTED_MODULE_0__/* .TokenType */ .k.PlainText,
                                text: el.innerText,
                                dom: el,
                            });
                        }
                        else if (el.querySelector('a')) { //想法中的用户名片
                            res.push({
                                type: _tokenTypes__WEBPACK_IMPORTED_MODULE_0__/* .TokenType */ .k.InlineLink,
                                text: el.innerText,
                                href: (0,_utils__WEBPACK_IMPORTED_MODULE_1__/* .ZhihuLink2NormalLink */ .IQ)(el.querySelector("a").href),
                                dom: el,
                            });
                        }
                    }
                    catch (e) {
                        res.push({
                            type: _tokenTypes__WEBPACK_IMPORTED_MODULE_0__/* .TokenType */ .k.PlainText,
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
                            type: _tokenTypes__WEBPACK_IMPORTED_MODULE_0__/* .TokenType */ .k.PlainText,
                            text: el.innerText,
                            dom: el,
                        });
                    }
                    else
                        res.push({
                            type: _tokenTypes__WEBPACK_IMPORTED_MODULE_0__/* .TokenType */ .k.InlineLink,
                            text: el.textContent,
                            href: (0,_utils__WEBPACK_IMPORTED_MODULE_1__/* .ZhihuLink2NormalLink */ .IQ)(el.href),
                            dom: el,
                        });
                    break;
                }
                case "sup": {
                    const link = el.firstElementChild;
                    // 提取脚注编号，如 [1] -> 1
                    const footnoteText = link.textContent.replace(/[\[\]]/g, '');
                    res.push({
                        type: _tokenTypes__WEBPACK_IMPORTED_MODULE_0__/* .TokenType */ .k.PlainText,
                        text: `[^${footnoteText}]`,
                        dom: el,
                    });
                    break;
                }
                default: {
                    //下划线内容等question/478154391/answer/121816724037
                    res.push({
                        type: _tokenTypes__WEBPACK_IMPORTED_MODULE_0__/* .TokenType */ .k.PlainText,
                        text: child.textContent.replace(/\u200B/g, '').replace('\t', '').replace(/^\s{2,}/, ''),
                        dom: child,
                    });
                }
            }
        }
    }
    //console.log(res)
    return res;
};


/***/ },

/***/ 804
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   OJ: () => (/* binding */ saveFile),
/* harmony export */   XR: () => (/* binding */ hideObsidianModal),
/* harmony export */   yY: () => (/* binding */ selectObsidianVault)
/* harmony export */ });
/* unused harmony exports showObsidianModal, saveObsidianConfig */
/* harmony import */ var _toast__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(377);

// showToast('欢迎使用知乎助手-备份到obsidian插件');
/**
 * 下一步
 * 解决再次打开时，文件夹列表闪动的问题，尽量不重新读取文件夹
 *
 */
// ============= 1. 全局状态管理 =============
// 全局变量存储弹框元素和当前选择的文件夹
let obsidianModal = null;
let selectedVaultHandle = null; // 存储选择的文件夹
let rootVaultHandle = null; // 存储最初选择的根文件夹
let currentSelectedPath = ''; // 存储当前选择的相对路径
// ============= 2. 弹框生命周期管理 =============
/**
 * 注入 Obsidian 选择弹框到页面
 */
function injectObsidianModal() {
    if (obsidianModal) {
        return; // 已经注入过了
    }
    // 创建弹框容器
    obsidianModal = document.createElement('div');
    obsidianModal.id = 'zhihu-obsidian-modal';
    obsidianModal.innerHTML = `
        <div class="modal-overlay">
            <div class="modal-content">
                <div class="modal-header">
                    <h3><svg xmlns="http://www.w3.org/2000/svg" style="width: 2.5em;height: 2.5em;opacity: 0.7;" width="1.5em" height="1.5em" viewBox="0 0 512 512"><g fill-rule="evenodd"><path fill="#673ab7" d="M463.47 192H151.06c-13.77 0-26 8.82-30.35 21.89L64 384V160h384c0-17.67-14.33-32-32-32H241.98a32 32 0 0 1-20.48-7.42l-20.6-17.15c-5.75-4.8-13-7.43-20.48-7.43H64c-17.67 0-32 14.33-32 32v256c0 17.67 14.33 32 32 32h352l76.88-179.39c1.7-3.98 2.59-8.28 2.59-12.61c0-17.67-14.33-32-32-32"/><g fill="#d1c4e9"><path d="M336.2 318.24c8.07-1.51 12.6-2.02 21.66-2.02c-34.18-89.72 48.95-139.27 18.63-155.11c-17-8.88-52.32 37.77-72.93 56.26l-10.67 37.41c19.77 16.2 36.25 39.63 43.31 63.46m75.04 128.91c13.05 3.85 26.66-5.92 28.52-19.42c1.35-9.81 3.51-20.65 8.24-30.94c-2.66-7.51-25.72-71.18-104.74-56.39c7.6 31.4-4.15 64.54-22.83 91.02c33.14.31 59.29 6.45 90.81 15.73"/><path d="M478.76 346.86c7.02-12.43-16.61-22.28-28.74-50.78c-10.52-24.69 4.93-53.82-8.18-66.23l-40.17-38.02c-14.09 38.27-40.29 56.91-17.12 123.38c37.13 6.98 67.48 27.2 77.55 58.42c0 0 13.67-21.49 16.66-26.77m-221.26 5.78c-8.21 18.67 17.96 36.81 43.46 63.29c29-40.73 24.17-88.95-15.12-127.91z"/></g></g></svg>
                    <span>选择存储库</span></h3>
                    <button class="close-btn" type="button">&times;</button>
                </div>
                <div class="modal-body">
                    <div class="button-group">
                        <button id="btn-1" type="button" class="option-btn" data-text="zip-single" title="每个ZIP单独解包到一个文件夹，文件夹名称与ZIP名称相同，图片放到各自的文件夹内">
                            ZIP单独解包
                        </button>
                        <button id="btn-2" type="button" class="option-btn" data-text="zip-common" title="所有ZIP共同解包，所有图片放到同一个文件夹（assets），强制合并文本和评论，放在外面，文件名与ZIP名称相同">
                            ZIP共同解包
                        </button>
                        <button id="btn-3" type="button" class="option-btn" data-text="zip-none" title="不解压缩">
                            ZIP不解包
                        </button>
                        <button id="btn-4" type="button" class="option-btn" data-text="text" title="纯文本MD文件">
                            纯文本
                        </button>
                        <button id="btn-5" type="button" class="option-btn" data-text="png" title="图片PNG文件">
                            图片
                        </button>
                    </div>
                    <div class="folder-selection">
                        <div id="selected-folder-info" class="selected-folder-info">
                            未选择文件夹
                        </div>
                        <button id="select-folder-btn" type="button" class="select-folder-btn">
                            选择文件夹
                        </button>
                    </div>
                    <div class="folder-structure" id="folder-structure">
                        <!-- 文件夹结构将在这里显示 -->
                    </div>
                    <div class="user-notes">
                        <ul>
                            <li>首次使用需要选择您的存储库文件夹，如果您有 Obsidian，可以选择您的 Obsidian 仓库目录。建议专门建立一个存储库文件夹存放内容，避免与现有笔记混合</li>
                            <li>选择后可以点击任意子文件夹作为保存位置，便于分类保存。已过滤掉了长度超过25字符的文件夹，以及 assets 文件夹。鼠标移到保存选项，会浮现出详细说明</li>
                            <li>授权一次后，下次使用会自动记住您的选择。关闭所有页面后，下次打开可能需要重新授权，选择始终允许即可</li>
                            <li>使用此功能时，请确保此程序是从可信的来源获取的，并定期备份您的文件</li>
                            <li><a href="https://github.com/qtqz/zhihu-backup-collect" target="_blank" style="color: inherit!important;">点击前往项目主页，阅读更多内容/支持我</a></li>
                        </ul>
                    </div>
                </div>
                <div class="modal-footer">
                    <button id="confirm-save-btn" type="button" class="confirm-btn" disabled>
                        确认保存
                    </button>
                    <button id="cancel-btn" type="button" class="cancel-btn">
                        取消
                    </button>
                </div>
            </div>
        </div>
    `;
    // 添加CSS样式
    const style = document.createElement('style');
    style.textContent = `
        #zhihu-obsidian-modal {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 100;
            display: none;
            opacity: 1;
            transition: opacity 0.3s ease-in-out;
        }
        
        #zhihu-obsidian-modal .modal-overlay {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.5);
            display: flex;
            align-items: center;
            justify-content: center;
        }
        
        #zhihu-obsidian-modal .modal-content {
            background-color: white;
            border-radius: 8px;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
            width: 90%;
            max-width: 600px;
            max-height: 85vh;
            overflow: hidden;
            display: flex;
            flex-direction: column;
        }
        
        #zhihu-obsidian-modal .modal-header {
            background-color: rgb(221, 232, 249);
            padding: 16px 20px;
            border-bottom: 1px solid rgb(23, 114, 246);
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        
        #zhihu-obsidian-modal .modal-header h3 {
            margin: 0;
            color: black;
            font-size: 18px;
            font-weight: 600;
            display: flex;
            align-items: center;
            gap: 0.5em;
        }
        
        #zhihu-obsidian-modal .close-btn {
            background: none;
            border: none;
            font-size: 24px;
            cursor: pointer;
            color: black;
            padding: 0;
            width: 30px;
            height: 30px;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        
        #zhihu-obsidian-modal .close-btn:hover {
            background-color: rgba(23, 114, 246, 0.1);
            border-radius: 4px;
        }
        
        #zhihu-obsidian-modal .modal-body {
            padding: 20px;
            flex: 1;
            overflow-y: auto;
        }
        
        #zhihu-obsidian-modal .folder-selection {
            margin-bottom: 20px;
            display: flex;
            align-items: center;
            gap: 12px;
        }
        
        #zhihu-obsidian-modal .selected-folder-info {
            background-color: rgb(221, 232, 249);
            border: 1px solid rgb(23, 114, 246);
            border-radius: 4px;
            padding: 12px;
            color: black;
            font-size: 14px;
            min-height: 20px;
            flex: 1;
        }
        
        #zhihu-obsidian-modal .select-folder-btn {
            background-color: rgb(23, 114, 246);
            color: white;
            border: none;
            padding: 12px 20px;
            border-radius: 6px;
            cursor: pointer;
            font-size: 14px;
            font-weight: 500;
            transition: background-color 0.2s;
            white-space: nowrap;
        }
        
        #zhihu-obsidian-modal .select-folder-btn:hover {
            background-color: rgb(21, 101, 217);
        }
        
        #zhihu-obsidian-modal .select-folder-btn:disabled {
            background-color: #ccc;
            cursor: not-allowed;
        }
        
        #zhihu-obsidian-modal .folder-structure {
            background-color: #f8f9fa;
            border: 1px solid #dee2e6;
            border-radius: 4px;
            padding: 16px;
            min-height: 180px;
            max-height: 260px;
            overflow-y: auto;
            font-family: monospace;
            font-size: 14px;
            color: black;
            white-space: pre-wrap;
            line-height: 1.4;
        }
        
        #zhihu-obsidian-modal .folder-item {
            cursor: pointer;
            padding: 2px 4px;
            border-radius: 3px;
            transition: background-color 0.2s;
        }
        
        #zhihu-obsidian-modal .folder-item:hover {
            background-color: rgba(23, 114, 246, 0.1);
        }
        
        #zhihu-obsidian-modal .folder-item.selected {
            background-color: rgb(221, 232, 249);
            font-weight: bold;
        }
        
        #zhihu-obsidian-modal .modal-footer {
            background-color: rgb(221, 232, 249);
            padding: 16px 20px;
            border-top: 1px solid rgb(23, 114, 246);
            display: flex;
            gap: 12px;
            justify-content: center;
        }
        
        #zhihu-obsidian-modal .confirm-btn {
            background-color: rgb(23, 114, 246);
            color: white;
            border: none;
            padding: 10px 20px;
            border-radius: 6px;
            cursor: pointer;
            font-size: 14px;
            font-weight: 500;
        }
        
        #zhihu-obsidian-modal .confirm-btn:hover:not(:disabled) {
            background-color: rgb(21, 101, 217);
        }
        
        #zhihu-obsidian-modal .confirm-btn:disabled {
            background-color: #ccc;
            cursor: not-allowed;
        }
        
        #zhihu-obsidian-modal .cancel-btn {
            background-color: white;
            color: black;
            border: 1px solid rgb(23, 114, 246);
            padding: 10px 20px;
            border-radius: 6px;
            cursor: pointer;
            font-size: 14px;
            font-weight: 500;
        }
        
        #zhihu-obsidian-modal .cancel-btn:hover {
            background-color: rgb(221, 232, 249);
        }
        
        #zhihu-obsidian-modal .button-group {
            display: flex;
            gap: 8px;
            margin-bottom: 20px;
        }
        
        #zhihu-obsidian-modal .option-btn {
            flex: 1;
            padding: 10px;
            border: 1px solid rgb(23, 114, 246);
            border-radius: 6px;
            background-color: white;
            color: rgb(23, 114, 246);
            font-size: 14px;
            font-weight: 500;
            cursor: pointer;
            transition: all 0.2s;
        }
        
        #zhihu-obsidian-modal .option-btn:hover {
            background-color: rgba(23, 114, 246, 0.1);
        }
        
        #zhihu-obsidian-modal .option-btn.selected {
            background-color: rgb(23, 114, 246);
            color: white;
        }
        
        #zhihu-obsidian-modal .user-notes {
            margin-top: 20px;
            padding: 16px;
            background-color: #f8f9fa;
            border: 1px solid #dee2e6;
            border-radius: 4px;
            font-size: 12px;
            color: #666;
        }
        
        #zhihu-obsidian-modal .user-notes ul {
            margin: 0;
            padding-left: 16px;
        }
        
        #zhihu-obsidian-modal .user-notes li {
            margin-bottom: 4px;
            line-height: 1.4;
        }
    `;
    // 将样式和弹框添加到页面
    document.head.appendChild(style);
    document.body.appendChild(obsidianModal);
    // 绑定事件监听器
    bindModalEvents();
}
/**
 * 绑定选项按钮事件
 */
function bindOptionButtons() {
    const optionButtons = obsidianModal?.querySelectorAll('.option-btn');
    optionButtons?.forEach(button => {
        button.addEventListener('click', () => {
            // 移除所有按钮的选中状态
            optionButtons.forEach(btn => btn.classList.remove('selected'));
            // 添加当前按钮的选中状态
            button.classList.add('selected');
            // 获取按钮文字并保存到localStorage
            const buttonText = button.getAttribute('data-text');
            if (buttonText) {
                saveSelectedOption(buttonText);
                console.log('选中选项:', buttonText);
            }
        });
    });
}
/**
 * 保存选中的选项到localStorage
 */
function saveSelectedOption(optionText) {
    localStorage.setItem('zhihu-obsidian-selected-option', optionText);
}
/**
 * 从localStorage加载选中的选项
 */
function loadSelectedOption() {
    return localStorage.getItem('zhihu-obsidian-selected-option');
}
/**
 * 恢复按钮选中状态
 */
function restoreButtonSelection() {
    const selectedOption = loadSelectedOption();
    let targetButton;
    if (selectedOption) {
        targetButton = obsidianModal?.querySelector(`[data-text="${selectedOption}"]`);
    }
    // 如果没有保存的选项，默认选中第4个按钮
    if (!targetButton) {
        targetButton = obsidianModal?.querySelector('#btn-4');
        if (targetButton) {
            // 保存默认选择到localStorage
            const defaultText = targetButton.getAttribute('data-text');
            if (defaultText) {
                saveSelectedOption(defaultText);
            }
        }
    }
    if (targetButton) {
        // 移除所有按钮的选中状态
        const optionButtons = obsidianModal?.querySelectorAll('.option-btn');
        optionButtons?.forEach(btn => btn.classList.remove('selected'));
        // 添加目标按钮的选中状态
        targetButton.classList.add('selected');
        const buttonText = targetButton.getAttribute('data-text');
        console.log('恢复选中状态:', buttonText);
    }
}
/**
 * 绑定弹框事件监听器
 */
function bindModalEvents() {
    if (!obsidianModal)
        return;
    // 关闭按钮
    const closeBtn = obsidianModal.querySelector('.close-btn');
    closeBtn?.addEventListener('click', hideObsidianModal);
    // 取消按钮
    const cancelBtn = obsidianModal.querySelector('#cancel-btn');
    cancelBtn?.addEventListener('click', hideObsidianModal);
    // 绑定选项按钮事件
    bindOptionButtons();
    // 选择文件夹按钮
    const selectFolderBtn = obsidianModal.querySelector('#select-folder-btn');
    selectFolderBtn?.addEventListener('click', async () => {
        try {
            selectedVaultHandle = await selectObsidianVaultInternal();
            if (selectedVaultHandle) {
                rootVaultHandle = selectedVaultHandle; // 保存根路径
                currentSelectedPath = ''; // 重置为根路径
                // 保存到IndexedDB
                await fileHandleManager.saveRootFolderHandle(selectedVaultHandle);
                await fileHandleManager.saveCurrentSelectedHandle(selectedVaultHandle);
                fileHandleManager.setRootFolder(selectedVaultHandle);
                fileHandleManager.setCurrentSelected(selectedVaultHandle);
                updateSelectedFolderInfo();
                await updateFolderStructure();
                enableConfirmButton();
                console.log('新文件夹选择完成:', selectedVaultHandle.name);
            }
        }
        catch (error) {
            console.error('选择文件夹失败:', error);
        }
    });
    // 确认保存按钮的事件监听器将在 selectObsidianVault 函数中动态添加
    // 点击遮罩层关闭弹框
    const overlay = obsidianModal.querySelector('.modal-overlay');
    overlay?.addEventListener('click', (e) => {
        if (e.target === overlay) {
            hideObsidianModal();
        }
    });
}
/**
 * 显示 Obsidian 选择弹框
 */
function showObsidianModal() {
    if (!obsidianModal) {
        injectObsidianModal();
    }
    if (obsidianModal) {
        obsidianModal.style.display = 'block';
        // 恢复按钮选中状态
        restoreButtonSelection();
        // 加载上次的选择状态
        loadLastSelection();
    }
}
/**
 * 隐藏 Obsidian 选择弹框
 */
function hideObsidianModal() {
    if (obsidianModal) {
        // 先设置透明度过渡
        obsidianModal.style.opacity = '0';
        // 等待过渡完成后再彻底隐藏
        setTimeout(() => {
            if (obsidianModal) {
                obsidianModal.style.display = 'none';
                // 重置透明度，为下次显示做准备
                obsidianModal.style.opacity = '1';
            }
        }, 300);
    }
}
/**
 * 加载上次的选择状态
 */
async function loadLastSelection() {
    console.log('尝试恢复文件夹访问权限...');
    // 显示加载状态
    const structureElement = obsidianModal?.querySelector('#folder-structure');
    if (structureElement) {
        structureElement.innerHTML = `
            <div style="padding: 20px; text-align: center; color: #666;">
                <p>正在恢复文件夹访问权限...</p>
            </div>
        `;
    }
    // 尝试从IndexedDB恢复根文件夹句柄
    const rootHandle = await fileHandleManager.loadAndVerifyRootFolderHandle();
    if (rootHandle) {
        console.log('成功恢复根文件夹访问权限:', rootHandle.name);
        // 设置根目录状态
        rootVaultHandle = rootHandle;
        fileHandleManager.setRootFolder(rootHandle);
        // 尝试恢复当前选择的文件夹句柄
        const currentSelectedHandle = await fileHandleManager.loadAndVerifyCurrentSelectedHandle();
        if (currentSelectedHandle) {
            console.log('成功恢复当前选择文件夹访问权限:', currentSelectedHandle.name);
            selectedVaultHandle = currentSelectedHandle;
            fileHandleManager.setCurrentSelected(currentSelectedHandle);
        }
        else {
            console.log('未找到当前选择的文件夹，使用根目录');
            selectedVaultHandle = rootHandle;
            fileHandleManager.setCurrentSelected(null);
        }
        // 加载保存的路径配置
        const saved = loadDirectorySelection();
        currentSelectedPath = saved.selectedPath || '';
        /* if (currentSelectedPath != rootHandle.name) { */
        // 更新UI显示，高亮显示
        updateSelectedFolderInfo(currentSelectedPath);
        updateFolderHighlight(currentSelectedPath);
        /* }
        else {
            updateSelectedFolderInfo('');
            updateFolderHighlight('');
        } */
        // 打开一次后，可能不需要更新了
        await updateFolderStructure();
        // 启用确认按钮
        enableConfirmButton();
        console.log('文件夹结构已恢复，当前路径:', currentSelectedPath);
        console.log('当前选择的句柄:', selectedVaultHandle.name);
    }
    else {
        console.log('需要重新选择文件夹');
        // 显示默认状态
        const infoElement = obsidianModal?.querySelector('#selected-folder-info');
        if (infoElement) {
            infoElement.textContent = '未选择文件夹';
        }
        const structureElement = obsidianModal?.querySelector('#folder-structure');
        if (structureElement) {
            structureElement.innerHTML = `
                <div style="padding: 20px; text-align: center; color: #666;">
                    <p>点击"选择文件夹"开始选择您的存储仓库</p>
                </div>
            `;
        }
    }
}
// ============= 3. 辅助函数 =============
/**
 * 更新选中的文件夹信息显示
 */
function updateSelectedFolderInfo(customPath) {
    const infoElement = obsidianModal?.querySelector('#selected-folder-info');
    if (infoElement && selectedVaultHandle && rootVaultHandle) {
        let displayPath;
        if (customPath) {
            // 如果提供了自定义路径，从根路径开始显示
            displayPath = `${rootVaultHandle.name}/${customPath}`;
        }
        else {
            // 显示当前选择的文件夹名称
            displayPath = selectedVaultHandle.name;
        }
        infoElement.textContent = `已选择: ${displayPath}`;
    }
}
/**
 * 更新文件夹高亮显示
 */
function updateFolderHighlight(selectedPath) {
    const structureElement = obsidianModal?.querySelector('#folder-structure');
    if (!structureElement)
        return;
    // 移除所有高亮
    const allItems = structureElement.querySelectorAll('.folder-item');
    allItems.forEach(item => {
        item.classList.remove('selected');
    });
    // 高亮选中的文件夹
    setTimeout(() => {
        const selectedItem = structureElement.querySelector(`[data-path="${selectedPath}"]`);
        if (selectedItem) {
            selectedItem.classList.add('selected');
        }
    }, 100);
}
/**
 * 启用确认按钮
 */
function enableConfirmButton() {
    (obsidianModal?.querySelector('#confirm-save-btn')).disabled = false;
}
// ============= 4. 文件夹管理 =============
/**
 * 更新文件夹结构显示
 */
async function updateFolderStructure() {
    const structureElement = obsidianModal?.querySelector('#folder-structure');
    if (!structureElement || !rootVaultHandle)
        return;
    try {
        // 清除之前的事件监听器
        structureElement.innerHTML = '';
        // 创建根文件夹显示（始终从根文件夹开始）
        const rootElement = createFolderElement(rootVaultHandle.name, rootVaultHandle, '');
        structureElement.appendChild(rootElement);
        // 添加子文件夹（从根文件夹开始展开）
        await addSubFolders(structureElement, rootVaultHandle, '', 4);
    }
    catch (error) {
        structureElement.innerHTML = '<div class="error">无法读取文件夹结构</div>';
    }
}
/**
 * 创建文件夹元素
 */
function createFolderElement(name, handle, path) {
    const element = document.createElement('div');
    element.className = 'folder-item';
    element.textContent = '📁 ' + name;
    element.dataset.path = path;
    element.dataset.name = name;
    element.dataset.handle = JSON.stringify({ name: handle.name }); // 存储句柄信息
    element.addEventListener('click', async () => {
        await selectFolder(handle, path);
    });
    return element;
}
/**
 * 添加子文件夹
 */
async function addSubFolders(container, dirHandle, currentPath, maxDepth, indent = '') {
    if (maxDepth <= 0)
        return;
    try {
        const entries = [];
        for await (const [name, handle] of dirHandle.entries()) {
            entries.push({ name, handle });
        }
        // 只筛选出文件夹，并过滤掉名称长度超过25字符的文件夹
        const folders = entries.filter(entry => entry.handle.kind === 'directory' &&
            entry.name.length <= 25 &&
            entry.name !== 'assets');
        // 限制显示条目数量
        const limitedFolders = folders.slice(0, 20);
        for (const { name, handle } of limitedFolders) {
            const fullPath = currentPath ? `${currentPath}/${name}` : name;
            const folderElement = createFolderElement(name, handle, fullPath);
            // 添加缩进（增加每一级的缩进量）
            folderElement.style.paddingLeft = `${indent.length * 20 + 20}px`;
            container.appendChild(folderElement);
            // 递归添加子文件夹
            if (maxDepth > 1) {
                await addSubFolders(container, handle, fullPath, maxDepth - 1, indent + ' ');
            }
        }
        if (folders.length > 20) {
            const moreElement = document.createElement('div');
            moreElement.textContent = indent + `... 还有 ${folders.length - 20} 个文件夹`;
            moreElement.style.paddingLeft = `${indent.length * 20 + 20}px`;
            moreElement.style.color = '#666';
            container.appendChild(moreElement);
        }
    }
    catch (error) {
        console.error('读取子文件夹失败:', error);
    }
}
/**
 * 点击后选择文件夹
 */
async function selectFolder(handle, path) {
    // 更新全局变量
    selectedVaultHandle = handle;
    currentSelectedPath = path;
    // 保存当前选择的句柄到IndexedDB
    await fileHandleManager.saveCurrentSelectedHandle(handle);
    fileHandleManager.setCurrentSelected(handle);
    // 保存到localStorage
    if (rootVaultHandle) {
        saveDirectorySelection(rootVaultHandle.name, path);
    }
    // 更新显示路径
    updateSelectedFolderInfo(path);
    // 更新高亮显示
    updateFolderHighlight(path);
    // 启用确认按钮
    enableConfirmButton();
    console.log('点击选择子文件夹:', path, '句柄:', handle.name);
}
/**
 * 内部的选择文件夹函数（实际执行选择操作）
 */
async function selectObsidianVaultInternal() {
    try {
        const dirHandle = await window.showDirectoryPicker({
            mode: "readwrite",
        });
        return dirHandle;
    }
    catch (err) {
        if (err.name !== "AbortError") {
            console.error("选择目录失败:", err);
        }
        return null;
    }
}
// ============= 5. IndexedDB 持久化 =============
/**
 * 简化的 IndexedDB 操作类
 */
class SimpleDB {
    constructor(dbName, version = 1) {
        this.dbName = dbName;
        this.version = version;
    }
    async open() {
        return new Promise((resolve, reject) => {
            const request = indexedDB.open(this.dbName, this.version);
            request.onerror = () => reject(request.error);
            request.onsuccess = () => resolve(request.result);
            request.onupgradeneeded = (event) => {
                const db = event.target.result;
                if (!db.objectStoreNames.contains('handles')) {
                    db.createObjectStore('handles');
                }
            };
        });
    }
    async put(storeName, value, key) {
        const db = await this.open();
        const transaction = db.transaction([storeName], 'readwrite');
        const store = transaction.objectStore(storeName);
        return new Promise((resolve, reject) => {
            const request = store.put(value, key);
            request.onsuccess = () => resolve();
            request.onerror = () => reject(request.error);
        });
    }
    async get(storeName, key) {
        const db = await this.open();
        const transaction = db.transaction([storeName], 'readonly');
        const store = transaction.objectStore(storeName);
        return new Promise((resolve, reject) => {
            const request = store.get(key);
            request.onsuccess = () => resolve(request.result);
            request.onerror = () => reject(request.error);
        });
    }
    async delete(storeName, key) {
        const db = await this.open();
        const transaction = db.transaction([storeName], 'readwrite');
        const store = transaction.objectStore(storeName);
        return new Promise((resolve, reject) => {
            const request = store.delete(key);
            request.onsuccess = () => resolve();
            request.onerror = () => reject(request.error);
        });
    }
}
/**
 * FileSystemDirectoryHandle 管理器
 */
class FileHandleManager {
    constructor() {
        this.storeName = 'handles';
        this.rootFolderHandle = null;
        this.currentSelectedHandle = null;
        this.db = new SimpleDB('zhihu-obsidian-handles');
    }
    // 保存根文件夹句柄
    async saveRootFolderHandle(folderHandle) {
        try {
            await this.db.put(this.storeName, folderHandle, 'rootFolder');
            console.log('根文件夹句柄已保存到 IndexedDB');
            return true;
        }
        catch (error) {
            console.error('保存根文件夹句柄失败:', error);
            return false;
        }
    }
    // 保存当前选择的文件夹句柄
    async saveCurrentSelectedHandle(folderHandle) {
        try {
            await this.db.put(this.storeName, folderHandle, 'currentSelected');
            console.log('当前选择文件夹句柄已保存到 IndexedDB');
            return true;
        }
        catch (error) {
            console.error('保存当前选择文件夹句柄失败:', error);
            return false;
        }
    }
    // 加载并验证根文件夹句柄
    async loadAndVerifyRootFolderHandle() {
        try {
            const folderHandle = await this.db.get(this.storeName, 'rootFolder');
            if (!folderHandle) {
                console.log('未找到保存的根文件夹句柄');
                return null;
            }
            return await this.verifyFolderHandle(folderHandle, 'rootFolder');
        }
        catch (error) {
            console.error('加载根文件夹句柄失败:', error);
            return null;
        }
    }
    // 加载并验证当前选择的文件夹句柄
    async loadAndVerifyCurrentSelectedHandle() {
        try {
            const folderHandle = await this.db.get(this.storeName, 'currentSelected');
            if (!folderHandle) {
                console.log('未找到保存的当前选择文件夹句柄');
                return null;
            }
            return await this.verifyFolderHandle(folderHandle, 'currentSelected');
        }
        catch (error) {
            console.error('加载当前选择文件夹句柄失败:', error);
            return null;
        }
    }
    // 验证文件夹句柄权限
    async verifyFolderHandle(folderHandle, key) {
        try {
            // 检查权限
            const permissionStatus = await folderHandle.queryPermission();
            console.log(`${key} 权限状态: ${permissionStatus}`);
            if (permissionStatus === 'granted') {
                console.log(`${key} 文件夹权限仍然有效`);
                return folderHandle;
            }
            // 尝试重新请求权限
            console.log(`尝试重新请求 ${key} 文件夹权限...`);
            const newPermissionStatus = await folderHandle.requestPermission();
            if (newPermissionStatus === 'granted') {
                console.log(`重新获得 ${key} 文件夹权限`);
                return folderHandle;
            }
            // 权限被拒绝，从存储中移除
            console.log(`${key} 权限被拒绝，清除保存的句柄`);
            await this.db.delete(this.storeName, key);
            return null;
        }
        catch (error) {
            console.error(`验证 ${key} 文件夹句柄失败:`, error);
            return null;
        }
    }
    // 设置根文件夹句柄
    setRootFolder(folderHandle) {
        this.rootFolderHandle = folderHandle;
    }
    // 设置当前选择的文件夹句柄
    setCurrentSelected(folderHandle) {
        this.currentSelectedHandle = folderHandle;
    }
    // 获取根文件夹句柄
    getRootFolder() {
        return this.rootFolderHandle;
    }
    // 获取当前选择的文件夹句柄
    getCurrentSelected() {
        return this.currentSelectedHandle;
    }
    // 兼容性方法：获取当前文件夹句柄（返回当前选择的，如果没有则返回根目录）
    getCurrentFolder() {
        return this.currentSelectedHandle || this.rootFolderHandle;
    }
}
// 全局文件句柄管理器实例
const fileHandleManager = new FileHandleManager();
/**
 * 从 localStorage 加载 Obsidian 配置
 */
function loadObsidianConfig() {
    const config = localStorage.getItem("zhihu-obsidian-config");
    if (config) {
        const parsed = JSON.parse(config);
        return {
            attachmentFolder: parsed.attachmentFolder || "assets",
            lastRootName: parsed.lastRootName,
            lastSelectedPath: parsed.lastSelectedPath,
        };
    }
    return {
        attachmentFolder: "assets",
    };
}
/**
 * 保存 Obsidian 配置到 localStorage
 */
function saveObsidianConfig(config) {
    const current = loadObsidianConfig();
    const updated = { ...current, ...config };
    localStorage.setItem("zhihu-obsidian-config", JSON.stringify(updated));
}
/**
 * 保存目录选择状态到 localStorage
 */
function saveDirectorySelection(rootName, selectedPath) {
    saveObsidianConfig({
        lastRootName: rootName,
        lastSelectedPath: selectedPath,
    });
}
/**
 * 从 localStorage 加载目录选择状态
 */
function loadDirectorySelection() {
    const config = loadObsidianConfig();
    return {
        rootName: config.lastRootName,
        selectedPath: config.lastSelectedPath,
    };
}
/**
 * 清理文件名，移除所有不允许的字符
 * Windows/macOS/Linux 文件系统禁止的字符：< > : " / \ | ? * 以及控制字符
 */
function sanitizeFilename(filename) {
    if (!filename || typeof filename !== 'string') {
        return 'untitled';
    }
    return filename
        // 移除所有控制字符（包括换行、回车、制表符等）
        .replace(/[\x00-\x1f\x7f-\x9f]/g, '')
        // 移除或替换文件系统非法字符
        .replace(/[<>:"/\\|?*]/g, '-')
        // 移除 Unicode 零宽字符和其他不可见字符
        .replace(/[\u200B-\u200D\uFEFF]/g, '')
        // 替换连续空白字符为单个空格
        .replace(/\s+/g, ' ')
        // 移除前后空格
        .trim()
        // 移除连续的点（避免 .. 等）
        .replace(/\.{2,}/g, '.')
        // 移除文件名开头和结尾的点和空格
        .replace(/^[.\s]+|[.\s]+$/g, '')
        // 限制长度（Windows 文件名最大255字节，保守起见限制200字符）
        .substring(0, 200)
        // 再次移除末尾的空格和点
        .replace(/[.\s]+$/, '')
        // 如果清理后为空，使用默认名称
        || 'untitled';
}
// ============= 7. 主函数 =============
/**
 * 请求选择 Obsidian vault 目录
 * 现在打开弹框，通过弹框界面进行选择
 * Promise<FileSystemDirectoryHandle | null>
 */
async function selectObsidianVault() {
    // 检查浏览器是否支持 File System Access API
    if (!window.showDirectoryPicker) {
        alert("您的浏览器不支持文件系统访问功能，请使用 Chrome 或 Edge 浏览器");
        return null;
    }
    return new Promise((resolve) => {
        // 显示弹框
        showObsidianModal();
        // 监听确认按钮点击事件
        const confirmBtn = obsidianModal?.querySelector('#confirm-save-btn');
        const cancelBtn = obsidianModal?.querySelector('#cancel-btn');
        const closeBtn = obsidianModal?.querySelector('.close-btn');
        const cleanup = () => {
            confirmBtn?.removeEventListener('click', onConfirm);
            cancelBtn?.removeEventListener('click', onCancel);
            closeBtn?.removeEventListener('click', onCancel);
        };
        const onConfirm = async () => {
            cleanup();
            // hideObsidianModal();
            // 获取当前选中的按钮内容
            const selectedButton = obsidianModal?.querySelector('.option-btn.selected');
            const selectedOption = selectedButton?.getAttribute('data-text');
            console.log('确认保存 - selectedVaultHandle:', selectedVaultHandle?.name);
            console.log('确认保存 - currentSelectedPath:', currentSelectedPath);
            console.log('确认保存 - 选择的按钮内容:', selectedOption);
            if (selectedOption) {
                // 优先使用当前选择的句柄（可能是子文件夹）
                let finalHandle = selectedVaultHandle;
                // 如果当前没有选择句柄，则使用IndexedDB中保存的当前选择句柄
                if (!finalHandle) {
                    finalHandle = fileHandleManager.getCurrentSelected();
                }
                // 如果还是没有，使用根目录句柄
                if (!finalHandle) {
                    finalHandle = fileHandleManager.getRootFolder();
                }
                if (finalHandle && rootVaultHandle) {
                    const currentPath = currentSelectedPath
                        ? `${rootVaultHandle.name}/${currentSelectedPath}`
                        : rootVaultHandle.name;
                    console.log('当前保存的路径:', currentPath);
                }
            }
            resolve(selectedOption || null);
        };
        const onCancel = () => {
            cleanup();
            hideObsidianModal();
            resolve(null);
        };
        confirmBtn?.addEventListener('click', onConfirm);
        cancelBtn?.addEventListener('click', onCancel);
        closeBtn?.addEventListener('click', onCancel);
    });
}
/**
 * 将dataUrl转换为Blob
 * @param dataUrl 图片的data URL
 * @returns Blob对象
 */
function dataUrlToBlob(dataUrl) {
    // 分离dataUrl的元数据和数据部分
    const parts = dataUrl.split(',');
    const mime = parts[0].match(/:(.*?);/)?.[1] || 'image/png';
    const bstr = atob(parts[1]); // base64解码
    // 将字符串转换为Uint8Array
    const n = bstr.length;
    const u8arr = new Uint8Array(n);
    for (let i = 0; i < n; i++) {
        u8arr[i] = bstr.charCodeAt(i);
    }
    // 创建Blob
    return new Blob([u8arr], { type: mime });
}
/**
 * 解包ZIP文件到指定文件夹
 * @param zip JSZip对象
 * @param targetFolder 目标文件夹句柄
 */
async function unpackZipToFolder(zip, targetFolder) {
    const files = Object.keys(zip.files);
    for (const filepath of files) {
        const file = zip.files[filepath];
        // 跳过文件夹条目
        if (file.dir) {
            continue;
        }
        try {
            // 分割路径，处理嵌套文件夹
            const pathParts = filepath.split('/');
            const filename = pathParts.pop(); // 最后一部分是文件名
            if (!filename) {
                continue;
            }
            // 如果有子文件夹，先创建子文件夹
            let currentFolder = targetFolder;
            for (const folderName of pathParts) {
                if (folderName) {
                    const safeFolderName = sanitizeFilename(folderName);
                    currentFolder = await currentFolder.getDirectoryHandle(safeFolderName, { create: true });
                }
            }
            // 获取文件内容
            const content = await file.async('uint8array');
            const safeFilename = sanitizeFilename(filename);
            // 创建并写入文件
            const fileHandle = await currentFolder.getFileHandle(safeFilename, { create: true });
            const writable = await fileHandle.createWritable();
            await writable.write(content);
            await writable.close();
            console.log(`已保存文件: ${filepath} -> ${safeFilename}`);
        }
        catch (error) {
            console.error(`保存文件失败 ${filepath}:`, error);
            // 继续处理其他文件
        }
    }
}
/**
 * 保存文件到本地文件系统
 * @param result 保存结果数据
 * @param saveType 保存类型
 */
async function saveFile(result, saveType) {
    const finalHandle = selectedVaultHandle || fileHandleManager.getCurrentSelected() || fileHandleManager.getRootFolder();
    if (!finalHandle) {
        throw new Error('未选择保存文件夹');
    }
    if (saveType === 'zip-single') {
        if (!result.zip) {
            throw new Error('ZIP数据不存在');
        }
        const folderName = sanitizeFilename(result.title);
        try {
            const targetFolder = await finalHandle.getDirectoryHandle(folderName, { create: true });
            await unpackZipToFolder(result.zip, targetFolder);
            console.log(`成功解包ZIP文件到文件夹: ${folderName}`);
            (0,_toast__WEBPACK_IMPORTED_MODULE_0__/* .showToast */ .P)('✅ 保存成功');
        }
        catch (error) {
            console.error('解包ZIP文件失败:', error);
            (0,_toast__WEBPACK_IMPORTED_MODULE_0__/* .showToast */ .P)('❌ 保存失败');
            throw error;
        }
    }
    else if (saveType === 'zip-common') {
        if (!result.zip) {
            throw new Error('ZIP数据不存在');
        }
        try {
            await unpackZipCommon(result.zip, result.title, finalHandle);
            console.log(`成功共同解包ZIP文件: ${result.title}`);
            (0,_toast__WEBPACK_IMPORTED_MODULE_0__/* .showToast */ .P)('✅ 保存成功');
        }
        catch (error) {
            console.error('共同解包ZIP文件失败:', error);
            (0,_toast__WEBPACK_IMPORTED_MODULE_0__/* .showToast */ .P)('❌ 保存失败');
            throw error;
        }
    }
    else if (saveType === 'zip-none') {
        if (!result.zip) {
            throw new Error('ZIP数据不存在');
        }
        const filename = result.title + '.zip';
        try {
            const zipBlob = await result.zip.generateAsync({ type: 'blob' });
            const fileHandle = await finalHandle.getFileHandle(filename, { create: true });
            const writable = await fileHandle.createWritable();
            await writable.write(zipBlob);
            await writable.close();
            console.log(`成功保存ZIP文件: ${filename}`);
            (0,_toast__WEBPACK_IMPORTED_MODULE_0__/* .showToast */ .P)('✅ 保存成功');
        }
        catch (error) {
            console.error('保存ZIP文件失败:', error);
            (0,_toast__WEBPACK_IMPORTED_MODULE_0__/* .showToast */ .P)('❌ 保存失败');
            throw error;
        }
    }
    else if (saveType === 'png') {
        if (!result.textString) {
            throw new Error('图片数据不存在');
        }
        const filename = result.title + '.png';
        try {
            const blob = dataUrlToBlob(result.textString);
            const fileHandle = await finalHandle.getFileHandle(filename, { create: true });
            const writable = await fileHandle.createWritable();
            await writable.write(blob);
            await writable.close();
            console.log(`成功保存图片文件: ${filename}`);
            (0,_toast__WEBPACK_IMPORTED_MODULE_0__/* .showToast */ .P)('✅ 保存成功');
        }
        catch (error) {
            console.error('保存图片文件失败:', error);
            (0,_toast__WEBPACK_IMPORTED_MODULE_0__/* .showToast */ .P)('❌ 保存失败');
            throw error;
        }
    }
    else if (saveType === 'text') {
        if (!result.textString) {
            throw new Error('文本内容不存在');
        }
        const filename = result.title + '.md';
        try {
            const fileHandle = await finalHandle.getFileHandle(filename, { create: true });
            const writable = await fileHandle.createWritable();
            await writable.write(result.textString);
            await writable.close();
            console.log(`成功保存MD文件: ${filename}`);
            (0,_toast__WEBPACK_IMPORTED_MODULE_0__/* .showToast */ .P)('✅ 保存成功');
        }
        catch (error) {
            console.error('保存MD文件失败:', error);
            (0,_toast__WEBPACK_IMPORTED_MODULE_0__/* .showToast */ .P)('❌ 保存失败');
            throw error;
        }
    }
    // 等保存成功后再隐藏弹框，不然共同解包ZIP会出问题，不能正常合并评论
    hideObsidianModal();
}
/**
 * 共同解包ZIP文件
 * @param zip JSZip对象
 * @param title 文件标题
 * @param targetFolder 目标文件夹句柄
 * @param assetsFolder assets文件夹名称，默认为'assets'
 */
async function unpackZipCommon(zip, title, targetFolder, assetsFolder = 'assets') {
    const safeAssetsFolder = sanitizeFilename(assetsFolder);
    // 1. 创建或获取assets文件夹
    const assetsDirHandle = await targetFolder.getDirectoryHandle(safeAssetsFolder, { create: true });
    // 2. 遍历ZIP中的所有文件
    const files = Object.keys(zip.files);
    for (const filepath of files) {
        const file = zip.files[filepath];
        // 跳过文件夹条目
        if (file.dir) {
            continue;
        }
        try {
            const content = await file.async('uint8array');
            const pureFilename = filepath.split('/').pop();
            if (!pureFilename) {
                continue;
            }
            const safeFilename = sanitizeFilename(pureFilename);
            // 判断是md文件还是资源文件
            if (pureFilename.endsWith('.md')) {
                // MD文件保存到目标文件夹根目录
                const safeTitle = sanitizeFilename(title);
                const mdFilename = `${safeTitle}.md`;
                const mdFileHandle = await targetFolder.getFileHandle(mdFilename, {
                    create: true,
                });
                const writable = await mdFileHandle.createWritable();
                await writable.write(content);
                await writable.close();
                console.log(`已保存MD文件: ${mdFilename}`);
            }
            else {
                // 其他文件（图片等）保存到assets文件夹
                const fileHandle = await assetsDirHandle.getFileHandle(safeFilename, {
                    create: true,
                });
                const writable = await fileHandle.createWritable();
                await writable.write(content);
                await writable.close();
                console.log(`已保存资源文件: ${safeAssetsFolder}/${safeFilename}`);
            }
        }
        catch (error) {
            console.error(`保存文件失败 ${filepath}:`, error);
            // 继续处理其他文件
        }
    }
}


/***/ },

/***/ 619
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   K: () => (/* binding */ parser)
/* harmony export */ });
/* harmony import */ var _tokenTypes__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(778);

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
            case _tokenTypes__WEBPACK_IMPORTED_MODULE_0__/* .TokenType */ .k.Code: {
                output.push(`\`\`\`${token.language ? token.language : ""}\n${token.content}${token.content.endsWith("\n") ? "" : "\n"}\`\`\``);
                break;
            }
            case _tokenTypes__WEBPACK_IMPORTED_MODULE_0__/* .TokenType */ .k.UList: {
                output.push(token.content.map((item) => `- ${renderRich(item)}`).join("\n"));
                break;
            }
            case _tokenTypes__WEBPACK_IMPORTED_MODULE_0__/* .TokenType */ .k.Olist: {
                output.push(token.content.map((item, index) => `${index + 1}. ${renderRich(item)}`).join("\n"));
                break;
            }
            case _tokenTypes__WEBPACK_IMPORTED_MODULE_0__/* .TokenType */ .k.H2: {
                output.push(`## ${token.text}`);
                break;
            }
            case _tokenTypes__WEBPACK_IMPORTED_MODULE_0__/* .TokenType */ .k.H3: {
                output.push(`### ${token.text}`);
                break;
            }
            case _tokenTypes__WEBPACK_IMPORTED_MODULE_0__/* .TokenType */ .k.Blockquote: {
                output.push(renderRich(token.content, "> ").replace(/\n/g, '\n> \n')); // 修复部分引用不分段问题
                break;
            }
            case _tokenTypes__WEBPACK_IMPORTED_MODULE_0__/* .TokenType */ .k.Text: {
                output.push(renderRich(token.content));
                break;
            }
            case _tokenTypes__WEBPACK_IMPORTED_MODULE_0__/* .TokenType */ .k.HR: {
                output.push("\n---\n");
                break;
            }
            case _tokenTypes__WEBPACK_IMPORTED_MODULE_0__/* .TokenType */ .k.Link: {
                output.push(`[${token.text}](${token.href})`);
                break;
            }
            case _tokenTypes__WEBPACK_IMPORTED_MODULE_0__/* .TokenType */ .k.Figure:
            case _tokenTypes__WEBPACK_IMPORTED_MODULE_0__/* .TokenType */ .k.Gif: {
                // @ts-ignore
                window.no_save_img && !token.local ?
                    output.push(`[图片]`) :
                    output.push(`![](${token.local ? token.localSrc : token.src})`);
                break;
            }
            case _tokenTypes__WEBPACK_IMPORTED_MODULE_0__/* .TokenType */ .k.Video: {
                // 创建一个虚拟的 DOM 节点
                const dom = document.createElement("video");
                dom.setAttribute("src", token.local ? token.localSrc : token.src);
                if (!token.local)
                    dom.setAttribute("data-info", "文件还未下载，随时可能失效，请使用`下载全文为Zip`将视频一同下载下来");
                output.push(dom.outerHTML);
                break;
            }
            case _tokenTypes__WEBPACK_IMPORTED_MODULE_0__/* .TokenType */ .k.Table: {
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
            case _tokenTypes__WEBPACK_IMPORTED_MODULE_0__/* .TokenType */ .k.FootnoteList: {
                // 渲染脚注定义列表
                const footnotes = token.items.map(item => `[^${item.id}]: ${item.content}`);
                output.push(footnotes.join("\n"));
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
            case _tokenTypes__WEBPACK_IMPORTED_MODULE_0__/* .TokenType */ .k.Bold: {
                res += `**${renderRich(el.content)}** `; // 修复md阅读器识别带标点符号的加粗内容有误问题
                break;
            }
            case _tokenTypes__WEBPACK_IMPORTED_MODULE_0__/* .TokenType */ .k.Italic: {
                res += `*${renderRich(el.content)}*`;
                break;
            }
            case _tokenTypes__WEBPACK_IMPORTED_MODULE_0__/* .TokenType */ .k.InlineLink: {
                res += `[${el.text}](${el.href})`;
                break;
            }
            case _tokenTypes__WEBPACK_IMPORTED_MODULE_0__/* .TokenType */ .k.PlainText: {
                res += el.text;
                break;
            }
            case _tokenTypes__WEBPACK_IMPORTED_MODULE_0__/* .TokenType */ .k.BR: {
                res += "\n" + joint;
                break;
            }
            case _tokenTypes__WEBPACK_IMPORTED_MODULE_0__/* .TokenType */ .k.InlineCode: {
                res += `\`${el.content}\``;
                break;
            }
            case _tokenTypes__WEBPACK_IMPORTED_MODULE_0__/* .TokenType */ .k.Math: {
                const mathToken = el;
                if (mathToken.display) {
                    res += `\n\n$$\n${mathToken.content}\n$$\n\n`;
                }
                else {
                    res += `$${mathToken.content}$`;
                }
                break;
            }
        }
    }
    //console.log(joint +res)
    return joint + res;
};


/***/ },

/***/ 162
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  A: () => (/* binding */ savelex)
});

// EXTERNAL MODULE: ./node_modules/.pnpm/jszip@3.10.1/node_modules/jszip/dist/jszip.min.js
var jszip_min = __webpack_require__(1);
// EXTERNAL MODULE: ./src/core/tokenTypes.ts
var tokenTypes = __webpack_require__(778);
;// ./src/core/download2zip.ts
/**
 * 下载文件并将其添加到zip文件中
 * @param url 下载文件的URL
 * @param zip JSZip对象，用于创建zip文件
 * @returns 添加了下载文件的zip文件
 */
async function downloadAndZip(url, zip) {
    const response = await fetch(url);
    const arrayBuffer = await response.arrayBuffer();
    let fileName = url.replace(/\?.*?$/g, "").split("/").pop();
    fileName.endsWith('.image') ? fileName += '.jpg' : 0;
    // 添加到zip文件
    zip.file(fileName, arrayBuffer);
    return { zip, file_name: fileName };
}
/**
 * 下载一系列文件并将其添加到zip文件中
 * @param urls 下载文件的URL
 * @param zip JSZip对象，用于创建zip文件
 * @returns 添加了下载文件的zip文件
 */
async function downloadAndZipAll(urls, zip) {
    for (let url of urls)
        zip = (await downloadAndZip(url, zip)).zip;
    return zip;
}

;// ./src/core/savelex.ts



/* harmony default export */ const savelex = (async (lex, assetsPath = "assets") => {
    const zip = new jszip_min();
    let FigureFlag = false;
    for (let token of lex) {
        if (token.type == tokenTypes/* TokenType */.k.Figure || token.type == tokenTypes/* TokenType */.k.Video || token.type == tokenTypes/* TokenType */.k.Gif) {
            FigureFlag = true;
            break;
        }
    }
    if (FigureFlag) {
        const assetsFolder = zip.folder(assetsPath);
        for (let token of lex) {
            try {
                switch (token.type) {
                    case tokenTypes/* TokenType */.k.Figure:
                    case tokenTypes/* TokenType */.k.Video:
                    case tokenTypes/* TokenType */.k.Gif: {
                        const { file_name } = await downloadAndZip(token.src, assetsFolder);
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
});
(Object.getOwnPropertyDescriptor(savelex, "name") || {}).writable || Object.defineProperty(savelex, "name", { value: "default", configurable: true });


/***/ },

/***/ 377
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   P: () => (/* binding */ showToast)
/* harmony export */ });
// 维护活动的 toast 列表
const activeToasts = [];
const TOAST_HEIGHT = 60; // 每个 toast 的高度间隔
// 初始化样式
const initStyles = () => {
    if (document.getElementById('toast-styles'))
        return;
    const style = document.createElement('style');
    style.id = 'toast-styles';
    style.textContent = `
    .toast-message {
      position: fixed;
      top: 30px;
      left: 50%;
      background: white;
      color: #333;
      padding: 12px 24px;
      border-radius: 4px;
      font-size: 14px;
      box-shadow: 0 2px 12px rgba(0, 0, 0, 0.15);
      z-index: 1000;
      pointer-events: none;
      opacity: 0;
      transition: transform 0.3s ease;
    }
    
    .toast-message.show {
      opacity: 1;
      animation: toast-float-in 0.5s ease forwards;
    }
    
    .toast-message.hide {
      animation: toast-float-out 0.5s ease forwards;
    }
    
    @keyframes toast-float-in {
      from {
        opacity: 0;
      }
      to {
        opacity: 1;
      }
    }
    
    @keyframes toast-float-out {
      from {
        opacity: 1;
      }
      to {
        opacity: 0;
      }
    }
  `;
    document.head.appendChild(style);
};
// 显示消息
const showToast = (message, duration = 4000) => {
    initStyles();
    const toast = document.createElement('div');
    toast.className = 'toast-message';
    toast.textContent = message;
    // 计算当前 toast 应该显示的位置（根据已有 toast 数量）
    const offset = activeToasts.length * TOAST_HEIGHT;
    toast.style.transform = `translate(-50%, ${offset}px)`;
    document.body.appendChild(toast);
    activeToasts.push(toast);
    // 淡入显示
    setTimeout(() => toast.classList.add('show'), 10);
    // 淡出消失
    setTimeout(() => {
        toast.classList.remove('show');
        toast.classList.add('hide');
        setTimeout(() => {
            toast.remove();
            // 从列表中移除
            const index = activeToasts.indexOf(toast);
            if (index > -1) {
                activeToasts.splice(index, 1);
                // 更新剩余 toast 的位置
                updateToastPositions();
            }
        }, 500);
    }, duration);
};
// 更新所有 toast 的位置
const updateToastPositions = () => {
    activeToasts.forEach((toast, index) => {
        toast.style.transform = `translate(-50%, ${index * TOAST_HEIGHT}px)`;
    });
};


/***/ },

/***/ 778
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   k: () => (/* binding */ TokenType)
/* harmony export */ });
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
    TokenType[TokenType["FootnoteList"] = 20] = "FootnoteList";
})(TokenType || (TokenType = {}));


/***/ },

/***/ 175
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AP: () => (/* binding */ getURL),
/* harmony export */   IQ: () => (/* binding */ ZhihuLink2NormalLink),
/* harmony export */   LK: () => (/* binding */ getTitle),
/* harmony export */   P_: () => (/* binding */ getRemark),
/* harmony export */   UR: () => (/* binding */ getCommentNum),
/* harmony export */   WB: () => (/* binding */ getTime),
/* harmony export */   aJ: () => (/* binding */ getUpvote),
/* harmony export */   g$: () => (/* binding */ getLocation),
/* harmony export */   kn: () => (/* binding */ getAuthor),
/* harmony export */   mK: () => (/* binding */ getCommentSwitch)
/* harmony export */ });
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
            let profileUrl = location.href.match(/(https.*)\/search/)[1];
            let authorId = profileUrl ? profileUrl.match(/\/(?:people|org)\/([^/?#]+)/)?.[1] || '' : '';
            return {
                name: author_dom.children[0].textContent,
                url: location.href.match(/(https.*)\/search/)[1],
                id: authorId,
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
        let authorUrl = authorName_dom.href;
        let authorId = authorUrl ? authorUrl.match(/\/(?:people|org)\/([^/?#]+)/)?.[1] || '' : '';
        return {
            name: authorName_dom.innerText || (authorName_dom.children[0] ? authorName_dom.children[0].getAttribute("alt") : ''), //???//没有名字的用户https://www.zhihu.com/people/8-90-74/answers
            url: authorName_dom.href,
            id: authorId,
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
const getTime = async (dom, scene, type) => {
    //关注/个人/问题/回答页
    //if (scene == "follow" || scene == "people" || scene == "question" || scene == "answer") {//收藏夹
    //  if (type != "" || type == "article") {
    let created, modified, time_dom;
    if (scene != "article") {
        time_dom = dom.closest('.ContentItem').querySelector(".ContentItem-time");
        created = time_dom.querySelector("a").getAttribute("data-tooltip").slice(4); //2023-12-30 16:12
        modified = time_dom.querySelector("a").innerText.slice(4);
        return { created, modified };
    }
    else { //文章
        time_dom = dom.closest('.Post-content').querySelector(".ContentItem-time");
        modified = time_dom.childNodes[0].textContent.slice(4);
        time_dom.click();
        await new Promise((resolve) => {
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
};
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
            upvote = dom.closest('.RichContent').querySelector(".ContentItem-actions .VoteButton").getAttribute('aria-label').slice(3) || 0;
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
    let location, el = dom.closest('.ContentItem'); //想法类型、文章页没有
    if (!el)
        el = dom.closest('.PinItem');
    if (!el)
        el = dom.closest('.Post-content');
    try {
        if (el) {
            location = el.querySelector('.ContentItem-time').childNodes[1]?.textContent.slice(6);
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


/***/ },

/***/ 647
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _core_lexer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(664);
/* harmony import */ var _core_tokenTypes__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(778);
/* harmony import */ var _core_parser__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(619);
/* harmony import */ var _core_utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(175);
/* harmony import */ var _core_savelex__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(162);
/* harmony import */ var _core_renderComments__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(615);
/* harmony import */ var _core_toast__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(377);
/* harmony import */ var _core_obsidianSaver__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(804);








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
        if (!ev) {
            alert('请勿收起又展开内容，否则会保存失败。请手动重新保存。');
        }
        else {
            let zhw = ev.target.closest('.zhihubackup-wrap'), bz = zhw.querySelector('textarea').value, fa = zhw.closest('.ContentItem') || zhw.closest('.Post-content') || zhw.closest('.HotLanding-contentItem');
            !fa ? alert('请勿收起又展开内容，否则会保存失败。请重新保存。') : 0;
            setTimeout(() => {
                fa.querySelector('textarea').value = bz;
            }, 200);
            setTimeout(() => {
                fa.querySelector(`.to-${bt}`).click();
            }, 250);
        }
        document.querySelectorAll('.zhihubackup-wrap').forEach((w) => w.remove());
        // @ts-ignore
        setTimeout(window.zhbf, 100);
        return;
    }
    return type;
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (async (dom, button, event) => {
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
    (0,_core_toast__WEBPACK_IMPORTED_MODULE_6__/* .showToast */ .P)('✅ 开始保存');
    const title = (0,_core_utils__WEBPACK_IMPORTED_MODULE_3__/* .getTitle */ .LK)(dom, scene, type), author = (0,_core_utils__WEBPACK_IMPORTED_MODULE_3__/* .getAuthor */ .kn)(dom, scene, type), time = await (0,_core_utils__WEBPACK_IMPORTED_MODULE_3__/* .getTime */ .WB)(dom, scene), //?????????
    url = (0,_core_utils__WEBPACK_IMPORTED_MODULE_3__/* .getURL */ .AP)(dom, scene, type), upvote_num = (0,_core_utils__WEBPACK_IMPORTED_MODULE_3__/* .getUpvote */ .aJ)(dom, scene, type), comment_num = (0,_core_utils__WEBPACK_IMPORTED_MODULE_3__/* .getCommentNum */ .UR)(dom, scene, type), Location = (0,_core_utils__WEBPACK_IMPORTED_MODULE_3__/* .getLocation */ .g$)(dom, scene, type);
    let remark = (0,_core_utils__WEBPACK_IMPORTED_MODULE_3__/* .getRemark */ .P_)(dom);
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
            title: getFilename()
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
            + '\nauthor_id: ' + author.id
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
     * 生成文件名
     */
    function getFilename() {
        let fm = title + "_" + author.name + "_" + time.modified.slice(0, 10) + remark;
        try {
            // @ts-ignore
            var efm = GM_getValue("edit_Filename");
            if (efm) {
                fm = eval(efm);
            }
        }
        catch (e) {
            console.warn(e);
        }
        return fm;
    }
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
    const lex = (0,_core_lexer__WEBPACK_IMPORTED_MODULE_0__/* .lexer */ .l)(dom.childNodes, type);
    var md = [], originPinMD = [];
    //console.log("lex", lex)
    //保存文章头图
    let headImg = document.querySelector('span>picture>img');
    if (scene == 'article' && headImg) {
        const src = headImg.getAttribute("src");
        if (src)
            lex.unshift({
                type: _core_tokenTypes__WEBPACK_IMPORTED_MODULE_1__/* .TokenType */ .k.Figure,
                src,
                local: false,
                dom: headImg
            });
    }
    //是转发的想法，对源想法解析，并准备附加到新想法下面
    if (type == "pin" && dom.closest('.PinItem').querySelector(".PinItem-content-originpin")) {
        const dom2 = dom.closest('.PinItem').querySelector(".PinItem-content-originpin .RichText");
        const lex2 = (0,_core_lexer__WEBPACK_IMPORTED_MODULE_0__/* .lexer */ .l)(dom2.childNodes, type);
        //markdown = markdown.concat(parser(lex2).map((l) => "> " + l))
        originPinMD.push('\n\n' + (0,_core_parser__WEBPACK_IMPORTED_MODULE_2__/* .parser */ .K)(lex2).map((l) => "> " + l).join("\n> \n"));
    }
    // 获取想法图片/标题
    if (type == "pin") {
        const pinItem = dom.closest('.PinItem');
        if (pinItem.querySelector(".ContentItem-title"))
            lex.unshift({
                type: _core_tokenTypes__WEBPACK_IMPORTED_MODULE_1__/* .TokenType */ .k.Text,
                content: [{
                        type: _core_tokenTypes__WEBPACK_IMPORTED_MODULE_1__/* .TokenType */ .k.PlainText,
                        text: '**' + pinItem.querySelector(".ContentItem-title").textContent + '**'
                    }]
            });
        if (pinItem.querySelector(".PinItem-remainContentRichText")) {
            const imgs = pinItem.querySelectorAll(".PinItem-remainContentRichText img");
            imgs.forEach((img) => {
                lex.push({
                    type: _core_tokenTypes__WEBPACK_IMPORTED_MODULE_1__/* .TokenType */ .k.Figure,
                    src: img.getAttribute("data-original") || img.getAttribute("data-actualsrc"),
                });
            });
        }
    }
    //解析评论
    let commentText = '', commentsImgs = [];
    const dealComments = async () => {
        try {
            if ((0,_core_utils__WEBPACK_IMPORTED_MODULE_3__/* .getCommentSwitch */ .mK)(dom)) {
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
                    let commentsData = window.ArticleComments[itemId]?.comments;
                    if (!commentsData) {
                        if (!openComment)
                            return; //既没评论数据也没展开评论区
                        let s = confirm('您还未暂存任何评论，却展开了评论区，是否立即【暂存此页评论并保存】？【否】则什么也不做\n（若不想存评，请收起评论区或取消勾选框）');
                        let obsidian = document.querySelector("#zhihu-obsidian-modal");
                        let display = obsidian?.style.display;
                        if (!s) {
                            (0,_core_toast__WEBPACK_IMPORTED_MODULE_6__/* .showToast */ .P)('❎ 取消保存');
                            if (display == "block") {
                                (0,_core_obsidianSaver__WEBPACK_IMPORTED_MODULE_7__/* .hideObsidianModal */ .XR)();
                            }
                            return 'return';
                        }
                        else {
                            openComment.querySelector('.save').click();
                            setTimeout(() => {
                                if (display == "block") {
                                    (0,_core_toast__WEBPACK_IMPORTED_MODULE_6__/* .showToast */ .P)('❎ 取消保存');
                                    (0,_core_obsidianSaver__WEBPACK_IMPORTED_MODULE_7__/* .hideObsidianModal */ .XR)();
                                    return alert('已【暂存此页评论】，由于这次是自定义文件夹保存，请再次手动保存文件。');
                                }
                                p.querySelector(`.zhihubackup-wrap .to-${button}`).click();
                            }, 1900);
                            return 'return';
                        }
                    }
                    let num_text = tip + '共 ' + comment_num + ' 条评论，已存 ' + commentsData.size + ' 条' + '\n\n';
                    if (button == 'text' || button == 'copy') {
                        // 准备添加第三种图片归宿，完全舍弃
                        [commentText, commentsImgs] = (0,_core_renderComments__WEBPACK_IMPORTED_MODULE_5__/* .renderAllComments */ .Y)(commentsData, false);
                        commentText = num_text + commentText;
                    }
                    else if (button == 'zip') {
                        [commentText, commentsImgs] = (0,_core_renderComments__WEBPACK_IMPORTED_MODULE_5__/* .renderAllComments */ .Y)(commentsData, true);
                        commentText = num_text + commentText;
                        if (commentsImgs.length) {
                            const assetsFolder = zip.folder('assets');
                            for (let i = 0; i < commentsImgs.length; i++) {
                                const response = await fetch(commentsImgs[i]);
                                const arrayBuffer = await response.arrayBuffer();
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
    };
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
        md = TOC ? TOC.concat((0,_core_parser__WEBPACK_IMPORTED_MODULE_2__/* .parser */ .K)(lex)) : (0,_core_parser__WEBPACK_IMPORTED_MODULE_2__/* .parser */ .K)(lex);
        if (type == "pin" && dom.closest('.PinItem').querySelector(".PinItem-content-originpin")) {
            md = md.concat(originPinMD); //解决保存转发的想法异常
        }
        if (copy_save_fm) {
            md = [getFrontmatter()].concat(md); //放到剪贴板，string[]
        }
        if (copy_save_cm) {
            if (await dealComments() == 'return')
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
        if (await dealComments() == 'return')
            return;
        commentText ? commentText = '\n\n---\n\n## 评论\n\n' + commentText : 0;
        let md2 = [];
        if (type == "pin" && dom.closest('.PinItem').querySelector(".PinItem-content-originpin")) {
            md2 = originPinMD;
        }
        return {
            textString: getFrontmatter() + (TOC ? TOC.join("\n\n") + '\n\n' : '') + (0,_core_parser__WEBPACK_IMPORTED_MODULE_2__/* .parser */ .K)(lex).join("\n\n") + md2.join("\n\n") + commentText,
            title: getFilename()
        };
    }
    if (button == 'zip') {
        //对lex的再处理，保存资产，并将lex中链接改为本地
        var { zip, localLex } = await (0,_core_savelex__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .A)(lex);
        if (await dealComments() == 'return')
            return;
        if (type == "pin" && dom.closest('.PinItem').querySelector(".PinItem-content-originpin")) {
            md = (0,_core_parser__WEBPACK_IMPORTED_MODULE_2__/* .parser */ .K)(localLex).concat(md);
        }
        else
            md = (0,_core_parser__WEBPACK_IMPORTED_MODULE_2__/* .parser */ .K)(localLex);
        try {
            // @ts-ignore
            var zip_merge_cm = GM_getValue("zip_merge_cm");
            // ZIP共同解包模式下，强制合并文本和评论
            let obsidian = document.querySelector("#zhihu-obsidian-modal");
            let display = obsidian?.style.display;
            let btn2 = document.querySelector("#zhihu-obsidian-modal #btn-2");
            if (display == "block" && btn2?.classList.contains("selected")) {
                zip_merge_cm = true;
            }
        }
        catch (e) {
            console.warn(e);
        }
        if (zip_merge_cm) {
            commentText ? commentText = '\n\n---\n\n## 评论\n\n' + commentText : 0;
            md.push(commentText);
        }
        else if (commentText)
            zip.file("comments.md", commentText);
        zip.file("index.md", getFrontmatter() + (TOC ? TOC.join("\n\n") + '\n\n' : '') + md.join("\n\n"));
    }
    return {
        zip,
        title: getFilename()
    };
});
(Object.getOwnPropertyDescriptor(__WEBPACK_DEFAULT_EXPORT__, "name") || {}).writable || Object.defineProperty(__WEBPACK_DEFAULT_EXPORT__, "name", { value: "default", configurable: true });


/***/ },

/***/ 615
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Y: () => (/* binding */ renderAllComments)
/* harmony export */ });
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
        let img = comment.img
        if (isLocalImg) {
            commentsImgs.push(comment.img)
            img = './assets/' + comment.img.replace(/\?.*?$/, "").split("/").pop()
        }
        // @ts-ignore
        window.no_save_img && !isLocalImg ?
            markdown.push(`${prefix}[图片]`, prefix) :
            markdown.push(`${prefix}![](${img})`, prefix)
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

/***/ }

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
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
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
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be in strict mode.
(() => {
"use strict";

// EXTERNAL MODULE: ./node_modules/.pnpm/file-saver@2.0.5/node_modules/file-saver/dist/FileSaver.min.js
var FileSaver_min = __webpack_require__(972);
// EXTERNAL MODULE: ./src/dealItem.ts
var dealItem = __webpack_require__(647);
;// ./node_modules/.pnpm/modern-screenshot@4.7.0/node_modules/modern-screenshot/dist/index.mjs
function changeJpegDpi(uint8Array, dpi) {
  uint8Array[13] = 1;
  uint8Array[14] = dpi >> 8;
  uint8Array[15] = dpi & 255;
  uint8Array[16] = dpi >> 8;
  uint8Array[17] = dpi & 255;
  return uint8Array;
}

const _P = "p".charCodeAt(0);
const _H = "H".charCodeAt(0);
const _Y = "Y".charCodeAt(0);
const _S = "s".charCodeAt(0);
let pngDataTable;
function createPngDataTable() {
  const crcTable = new Int32Array(256);
  for (let n = 0; n < 256; n++) {
    let c = n;
    for (let k = 0; k < 8; k++) {
      c = c & 1 ? 3988292384 ^ c >>> 1 : c >>> 1;
    }
    crcTable[n] = c;
  }
  return crcTable;
}
function calcCrc(uint8Array) {
  let c = -1;
  if (!pngDataTable)
    pngDataTable = createPngDataTable();
  for (let n = 0; n < uint8Array.length; n++) {
    c = pngDataTable[(c ^ uint8Array[n]) & 255] ^ c >>> 8;
  }
  return c ^ -1;
}
function searchStartOfPhys(uint8Array) {
  const length = uint8Array.length - 1;
  for (let i = length; i >= 4; i--) {
    if (uint8Array[i - 4] === 9 && uint8Array[i - 3] === _P && uint8Array[i - 2] === _H && uint8Array[i - 1] === _Y && uint8Array[i] === _S) {
      return i - 3;
    }
  }
  return 0;
}
function changePngDpi(uint8Array, dpi, overwritepHYs = false) {
  const physChunk = new Uint8Array(13);
  dpi *= 39.3701;
  physChunk[0] = _P;
  physChunk[1] = _H;
  physChunk[2] = _Y;
  physChunk[3] = _S;
  physChunk[4] = dpi >>> 24;
  physChunk[5] = dpi >>> 16;
  physChunk[6] = dpi >>> 8;
  physChunk[7] = dpi & 255;
  physChunk[8] = physChunk[4];
  physChunk[9] = physChunk[5];
  physChunk[10] = physChunk[6];
  physChunk[11] = physChunk[7];
  physChunk[12] = 1;
  const crc = calcCrc(physChunk);
  const crcChunk = new Uint8Array(4);
  crcChunk[0] = crc >>> 24;
  crcChunk[1] = crc >>> 16;
  crcChunk[2] = crc >>> 8;
  crcChunk[3] = crc & 255;
  if (overwritepHYs) {
    const startingIndex = searchStartOfPhys(uint8Array);
    uint8Array.set(physChunk, startingIndex);
    uint8Array.set(crcChunk, startingIndex + 13);
    return uint8Array;
  } else {
    const chunkLength = new Uint8Array(4);
    chunkLength[0] = 0;
    chunkLength[1] = 0;
    chunkLength[2] = 0;
    chunkLength[3] = 9;
    const finalHeader = new Uint8Array(54);
    finalHeader.set(uint8Array, 0);
    finalHeader.set(chunkLength, 33);
    finalHeader.set(physChunk, 37);
    finalHeader.set(crcChunk, 50);
    return finalHeader;
  }
}
const b64PhysSignature1 = "AAlwSFlz";
const b64PhysSignature2 = "AAAJcEhZ";
const b64PhysSignature3 = "AAAACXBI";
function detectPhysChunkFromDataUrl(dataUrl) {
  let b64index = dataUrl.indexOf(b64PhysSignature1);
  if (b64index === -1) {
    b64index = dataUrl.indexOf(b64PhysSignature2);
  }
  if (b64index === -1) {
    b64index = dataUrl.indexOf(b64PhysSignature3);
  }
  return b64index;
}

const PREFIX = "[modern-screenshot]";
const IN_BROWSER = typeof window !== "undefined";
const SUPPORT_WEB_WORKER = IN_BROWSER && "Worker" in window;
const SUPPORT_ATOB = IN_BROWSER && "atob" in window;
const SUPPORT_BTOA = IN_BROWSER && "btoa" in window;
const USER_AGENT = IN_BROWSER ? window.navigator?.userAgent : "";
const IN_CHROME = USER_AGENT.includes("Chrome");
const IN_SAFARI = USER_AGENT.includes("AppleWebKit") && !IN_CHROME;
const IN_FIREFOX = USER_AGENT.includes("Firefox");
const isContext = (value) => value && "__CONTEXT__" in value;
const isCssFontFaceRule = (rule) => rule.constructor.name === "CSSFontFaceRule";
const isCSSImportRule = (rule) => rule.constructor.name === "CSSImportRule";
const isLayerBlockRule = (rule) => rule.constructor.name === "CSSLayerBlockRule";
const isElementNode = (node) => node.nodeType === 1;
const isSVGElementNode = (node) => typeof node.className === "object";
const isSVGImageElementNode = (node) => node.tagName === "image";
const isSVGUseElementNode = (node) => node.tagName === "use";
const isHTMLElementNode = (node) => isElementNode(node) && typeof node.style !== "undefined" && !isSVGElementNode(node);
const isCommentNode = (node) => node.nodeType === 8;
const isTextNode = (node) => node.nodeType === 3;
const isImageElement = (node) => node.tagName === "IMG";
const isVideoElement = (node) => node.tagName === "VIDEO";
const isCanvasElement = (node) => node.tagName === "CANVAS";
const isTextareaElement = (node) => node.tagName === "TEXTAREA";
const isInputElement = (node) => node.tagName === "INPUT";
const isStyleElement = (node) => node.tagName === "STYLE";
const isScriptElement = (node) => node.tagName === "SCRIPT";
const isSelectElement = (node) => node.tagName === "SELECT";
const isSlotElement = (node) => node.tagName === "SLOT";
const isIFrameElement = (node) => node.tagName === "IFRAME";
const consoleWarn = (...args) => console.warn(PREFIX, ...args);
function supportWebp(ownerDocument) {
  const canvas = ownerDocument?.createElement?.("canvas");
  if (canvas) {
    canvas.height = canvas.width = 1;
  }
  return Boolean(canvas) && "toDataURL" in canvas && Boolean(canvas.toDataURL("image/webp").includes("image/webp"));
}
const isDataUrl = (url) => url.startsWith("data:");
function resolveUrl(url, baseUrl) {
  if (url.match(/^[a-z]+:\/\//i))
    return url;
  if (IN_BROWSER && url.match(/^\/\//))
    return window.location.protocol + url;
  if (url.match(/^[a-z]+:/i))
    return url;
  if (!IN_BROWSER)
    return url;
  const doc = getDocument().implementation.createHTMLDocument();
  const base = doc.createElement("base");
  const a = doc.createElement("a");
  doc.head.appendChild(base);
  doc.body.appendChild(a);
  if (baseUrl)
    base.href = baseUrl;
  a.href = url;
  return a.href;
}
function getDocument(target) {
  return (target && isElementNode(target) ? target?.ownerDocument : target) ?? window.document;
}
const XMLNS = "http://www.w3.org/2000/svg";
function createSvg(width, height, ownerDocument) {
  const svg = getDocument(ownerDocument).createElementNS(XMLNS, "svg");
  svg.setAttributeNS(null, "width", width.toString());
  svg.setAttributeNS(null, "height", height.toString());
  svg.setAttributeNS(null, "viewBox", `0 0 ${width} ${height}`);
  return svg;
}
function svgToDataUrl(svg, removeControlCharacter) {
  let xhtml = new XMLSerializer().serializeToString(svg);
  if (removeControlCharacter) {
    xhtml = xhtml.replace(/[\u0000-\u0008\v\f\u000E-\u001F\uD800-\uDFFF\uFFFE\uFFFF]/gu, "");
  }
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(xhtml)}`;
}
async function canvasToBlob(canvas, type = "image/png", quality = 1) {
  try {
    return await new Promise((resolve, reject) => {
      canvas.toBlob((blob) => {
        if (blob) {
          resolve(blob);
        } else {
          reject(new Error("Blob is null"));
        }
      }, type, quality);
    });
  } catch (error) {
    if (SUPPORT_ATOB) {
      return dataUrlToBlob(canvas.toDataURL(type, quality));
    }
    throw error;
  }
}
function dataUrlToBlob(dataUrl) {
  const [header, base64] = dataUrl.split(",");
  const type = header.match(/data:(.+);/)?.[1] ?? void 0;
  const decoded = window.atob(base64);
  const length = decoded.length;
  const buffer = new Uint8Array(length);
  for (let i = 0; i < length; i += 1) {
    buffer[i] = decoded.charCodeAt(i);
  }
  return new Blob([buffer], { type });
}
function readBlob(blob, type) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = () => reject(reader.error);
    reader.onabort = () => reject(new Error(`Failed read blob to ${type}`));
    if (type === "dataUrl") {
      reader.readAsDataURL(blob);
    } else if (type === "arrayBuffer") {
      reader.readAsArrayBuffer(blob);
    }
  });
}
const blobToDataUrl = (blob) => readBlob(blob, "dataUrl");
const blobToArrayBuffer = (blob) => readBlob(blob, "arrayBuffer");
function createImage(url, ownerDocument) {
  const img = getDocument(ownerDocument).createElement("img");
  img.decoding = "sync";
  img.loading = "eager";
  img.src = url;
  return img;
}
function loadMedia(media, options) {
  return new Promise((resolve) => {
    const { timeout, ownerDocument, onError: userOnError, onWarn } = options ?? {};
    const node = typeof media === "string" ? createImage(media, getDocument(ownerDocument)) : media;
    let timer = null;
    let removeEventListeners = null;
    function onResolve() {
      resolve(node);
      timer && clearTimeout(timer);
      removeEventListeners?.();
    }
    if (timeout) {
      timer = setTimeout(onResolve, timeout);
    }
    if (isVideoElement(node)) {
      const currentSrc = node.currentSrc || node.src;
      if (!currentSrc) {
        if (node.poster) {
          return loadMedia(node.poster, options).then(resolve);
        }
        return onResolve();
      }
      if (node.readyState >= 2) {
        return onResolve();
      }
      const onLoadeddata = onResolve;
      const onError = (error) => {
        onWarn?.(
          "Failed video load",
          currentSrc,
          error
        );
        userOnError?.(error);
        onResolve();
      };
      removeEventListeners = () => {
        node.removeEventListener("loadeddata", onLoadeddata);
        node.removeEventListener("error", onError);
      };
      node.addEventListener("loadeddata", onLoadeddata, { once: true });
      node.addEventListener("error", onError, { once: true });
    } else {
      const currentSrc = isSVGImageElementNode(node) ? node.href.baseVal : node.currentSrc || node.src;
      if (!currentSrc) {
        return onResolve();
      }
      const onLoad = async () => {
        if (isImageElement(node) && "decode" in node) {
          try {
            await node.decode();
          } catch (error) {
            onWarn?.(
              "Failed to decode image, trying to render anyway",
              node.dataset.originalSrc || currentSrc,
              error
            );
          }
        }
        onResolve();
      };
      const onError = (error) => {
        onWarn?.(
          "Failed image load",
          node.dataset.originalSrc || currentSrc,
          error
        );
        onResolve();
      };
      if (isImageElement(node) && node.complete) {
        return onLoad();
      }
      removeEventListeners = () => {
        node.removeEventListener("load", onLoad);
        node.removeEventListener("error", onError);
      };
      node.addEventListener("load", onLoad, { once: true });
      node.addEventListener("error", onError, { once: true });
    }
  });
}
async function waitUntilLoad(node, options) {
  if (isHTMLElementNode(node)) {
    if (isImageElement(node) || isVideoElement(node)) {
      await loadMedia(node, options);
    } else {
      await Promise.all(
        ["img", "video"].flatMap((selectors) => {
          return Array.from(node.querySelectorAll(selectors)).map((el) => loadMedia(el, options));
        })
      );
    }
  }
}
const uuid = /* @__PURE__ */ function uuid2() {
  let counter = 0;
  const random = () => `0000${(Math.random() * 36 ** 4 << 0).toString(36)}`.slice(-4);
  return () => {
    counter += 1;
    return `u${random()}${counter}`;
  };
}();
function splitFontFamily(fontFamily) {
  return fontFamily?.split(",").map((val) => val.trim().replace(/"|'/g, "").toLowerCase()).filter(Boolean);
}

let uid = 0;
function createLogger(debug) {
  const prefix = `${PREFIX}[#${uid}]`;
  uid++;
  return {
    // eslint-disable-next-line no-console
    time: (label) => debug && console.time(`${prefix} ${label}`),
    // eslint-disable-next-line no-console
    timeEnd: (label) => debug && console.timeEnd(`${prefix} ${label}`),
    warn: (...args) => debug && consoleWarn(...args)
  };
}

function getDefaultRequestInit(bypassingCache) {
  return {
    cache: bypassingCache ? "no-cache" : "force-cache"
  };
}

async function orCreateContext(node, options) {
  return isContext(node) ? node : createContext(node, { ...options, autoDestruct: true });
}
async function createContext(node, options) {
  const { scale = 1, workerUrl, workerNumber = 1 } = options || {};
  const debug = Boolean(options?.debug);
  const features = options?.features ?? true;
  const ownerDocument = node.ownerDocument ?? (IN_BROWSER ? window.document : void 0);
  const ownerWindow = node.ownerDocument?.defaultView ?? (IN_BROWSER ? window : void 0);
  const requests = /* @__PURE__ */ new Map();
  const context = {
    // Options
    width: 0,
    height: 0,
    quality: 1,
    type: "image/png",
    scale,
    backgroundColor: null,
    style: null,
    filter: null,
    maximumCanvasSize: 0,
    timeout: 3e4,
    progress: null,
    debug,
    fetch: {
      requestInit: getDefaultRequestInit(options?.fetch?.bypassingCache),
      placeholderImage: "data:image/png;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7",
      bypassingCache: false,
      ...options?.fetch
    },
    fetchFn: null,
    font: {},
    drawImageInterval: 100,
    workerUrl: null,
    workerNumber,
    onCloneEachNode: null,
    onCloneNode: null,
    onEmbedNode: null,
    onCreateForeignObjectSvg: null,
    includeStyleProperties: null,
    autoDestruct: false,
    ...options,
    // InternalContext
    __CONTEXT__: true,
    log: createLogger(debug),
    node,
    ownerDocument,
    ownerWindow,
    dpi: scale === 1 ? null : 96 * scale,
    svgStyleElement: createStyleElement(ownerDocument),
    svgDefsElement: ownerDocument?.createElementNS(XMLNS, "defs"),
    svgStyles: /* @__PURE__ */ new Map(),
    defaultComputedStyles: /* @__PURE__ */ new Map(),
    workers: [
      ...Array.from({
        length: SUPPORT_WEB_WORKER && workerUrl && workerNumber ? workerNumber : 0
      })
    ].map(() => {
      try {
        const worker = new Worker(workerUrl);
        worker.onmessage = async (event) => {
          const { url, result } = event.data;
          if (result) {
            requests.get(url)?.resolve?.(result);
          } else {
            requests.get(url)?.reject?.(new Error(`Error receiving message from worker: ${url}`));
          }
        };
        worker.onmessageerror = (event) => {
          const { url } = event.data;
          requests.get(url)?.reject?.(new Error(`Error receiving message from worker: ${url}`));
        };
        return worker;
      } catch (error) {
        context.log.warn("Failed to new Worker", error);
        return null;
      }
    }).filter(Boolean),
    fontFamilies: /* @__PURE__ */ new Map(),
    fontCssTexts: /* @__PURE__ */ new Map(),
    acceptOfImage: `${[
      supportWebp(ownerDocument) && "image/webp",
      "image/svg+xml",
      "image/*",
      "*/*"
    ].filter(Boolean).join(",")};q=0.8`,
    requests,
    drawImageCount: 0,
    tasks: [],
    features,
    isEnable: (key) => {
      if (key === "restoreScrollPosition") {
        return typeof features === "boolean" ? false : features[key] ?? false;
      }
      if (typeof features === "boolean") {
        return features;
      }
      return features[key] ?? true;
    },
    shadowRoots: []
  };
  context.log.time("wait until load");
  await waitUntilLoad(node, { timeout: context.timeout, onWarn: context.log.warn });
  context.log.timeEnd("wait until load");
  const { width, height } = resolveBoundingBox(node, context);
  context.width = width;
  context.height = height;
  return context;
}
function createStyleElement(ownerDocument) {
  if (!ownerDocument)
    return void 0;
  const style = ownerDocument.createElement("style");
  const cssText = style.ownerDocument.createTextNode(`
.______background-clip--text {
  background-clip: text;
  -webkit-background-clip: text;
}
`);
  style.appendChild(cssText);
  return style;
}
function resolveBoundingBox(node, context) {
  let { width, height } = context;
  if (isElementNode(node) && (!width || !height)) {
    const box = node.getBoundingClientRect();
    width = width || box.width || Number(node.getAttribute("width")) || 0;
    height = height || box.height || Number(node.getAttribute("height")) || 0;
  }
  return { width, height };
}

async function imageToCanvas(image, context) {
  const {
    log,
    timeout,
    drawImageCount,
    drawImageInterval
  } = context;
  log.time("image to canvas");
  const loaded = await loadMedia(image, { timeout, onWarn: context.log.warn });
  const { canvas, context2d } = createCanvas(image.ownerDocument, context);
  const drawImage = () => {
    try {
      context2d?.drawImage(loaded, 0, 0, canvas.width, canvas.height);
    } catch (error) {
      context.log.warn("Failed to drawImage", error);
    }
  };
  drawImage();
  if (context.isEnable("fixSvgXmlDecode")) {
    for (let i = 0; i < drawImageCount; i++) {
      await new Promise((resolve) => {
        setTimeout(() => {
          context2d?.clearRect(0, 0, canvas.width, canvas.height);
          drawImage();
          resolve();
        }, i + drawImageInterval);
      });
    }
  }
  context.drawImageCount = 0;
  log.timeEnd("image to canvas");
  return canvas;
}
function createCanvas(ownerDocument, context) {
  const { width, height, scale, backgroundColor, maximumCanvasSize: max } = context;
  const canvas = ownerDocument.createElement("canvas");
  canvas.width = Math.floor(width * scale);
  canvas.height = Math.floor(height * scale);
  canvas.style.width = `${width}px`;
  canvas.style.height = `${height}px`;
  if (max) {
    if (canvas.width > max || canvas.height > max) {
      if (canvas.width > max && canvas.height > max) {
        if (canvas.width > canvas.height) {
          canvas.height *= max / canvas.width;
          canvas.width = max;
        } else {
          canvas.width *= max / canvas.height;
          canvas.height = max;
        }
      } else if (canvas.width > max) {
        canvas.height *= max / canvas.width;
        canvas.width = max;
      } else {
        canvas.width *= max / canvas.height;
        canvas.height = max;
      }
    }
  }
  const context2d = canvas.getContext("2d");
  if (context2d && backgroundColor) {
    context2d.fillStyle = backgroundColor;
    context2d.fillRect(0, 0, canvas.width, canvas.height);
  }
  return { canvas, context2d };
}

function cloneCanvas(canvas, context) {
  if (canvas.ownerDocument) {
    try {
      const dataURL = canvas.toDataURL();
      if (dataURL !== "data:,") {
        return createImage(dataURL, canvas.ownerDocument);
      }
    } catch (error) {
      context.log.warn("Failed to clone canvas", error);
    }
  }
  const cloned = canvas.cloneNode(false);
  const ctx = canvas.getContext("2d");
  const clonedCtx = cloned.getContext("2d");
  try {
    if (ctx && clonedCtx) {
      clonedCtx.putImageData(
        ctx.getImageData(0, 0, canvas.width, canvas.height),
        0,
        0
      );
    }
    return cloned;
  } catch (error) {
    context.log.warn("Failed to clone canvas", error);
  }
  return cloned;
}

function cloneIframe(iframe, context) {
  try {
    if (iframe?.contentDocument?.documentElement) {
      return cloneNode(iframe.contentDocument.documentElement, context);
    }
  } catch (error) {
    context.log.warn("Failed to clone iframe", error);
  }
  return iframe.cloneNode(false);
}

function cloneImage(image) {
  const cloned = image.cloneNode(false);
  if (image.currentSrc && image.currentSrc !== image.src) {
    cloned.src = image.currentSrc;
    cloned.srcset = "";
  }
  if (cloned.loading === "lazy") {
    cloned.loading = "eager";
  }
  return cloned;
}

async function cloneVideo(video, context) {
  if (video.ownerDocument && !video.currentSrc && video.poster) {
    return createImage(video.poster, video.ownerDocument);
  }
  const cloned = video.cloneNode(false);
  cloned.crossOrigin = "anonymous";
  if (video.currentSrc && video.currentSrc !== video.src) {
    cloned.src = video.currentSrc;
  }
  const ownerDocument = cloned.ownerDocument;
  if (ownerDocument) {
    let canPlay = true;
    await loadMedia(cloned, { onError: () => canPlay = false, onWarn: context.log.warn });
    if (!canPlay) {
      if (video.poster) {
        return createImage(video.poster, video.ownerDocument);
      }
      return cloned;
    }
    cloned.currentTime = video.currentTime;
    await new Promise((resolve) => {
      cloned.addEventListener("seeked", resolve, { once: true });
    });
    const canvas = ownerDocument.createElement("canvas");
    canvas.width = video.offsetWidth;
    canvas.height = video.offsetHeight;
    try {
      const ctx = canvas.getContext("2d");
      if (ctx)
        ctx.drawImage(cloned, 0, 0, canvas.width, canvas.height);
    } catch (error) {
      context.log.warn("Failed to clone video", error);
      if (video.poster) {
        return createImage(video.poster, video.ownerDocument);
      }
      return cloned;
    }
    return cloneCanvas(canvas, context);
  }
  return cloned;
}

function cloneElement(node, context) {
  if (isCanvasElement(node)) {
    return cloneCanvas(node, context);
  }
  if (isIFrameElement(node)) {
    return cloneIframe(node, context);
  }
  if (isImageElement(node)) {
    return cloneImage(node);
  }
  if (isVideoElement(node)) {
    return cloneVideo(node, context);
  }
  return node.cloneNode(false);
}

function getSandBox(context) {
  let sandbox = context.sandbox;
  if (!sandbox) {
    const { ownerDocument } = context;
    try {
      if (ownerDocument) {
        sandbox = ownerDocument.createElement("iframe");
        sandbox.id = `__SANDBOX__${uuid()}`;
        sandbox.width = "0";
        sandbox.height = "0";
        sandbox.style.visibility = "hidden";
        sandbox.style.position = "fixed";
        ownerDocument.body.appendChild(sandbox);
        sandbox.srcdoc = '<!DOCTYPE html><meta charset="UTF-8"><title></title><body>';
        context.sandbox = sandbox;
      }
    } catch (error) {
      context.log.warn("Failed to getSandBox", error);
    }
  }
  return sandbox;
}

const ignoredStyles = [
  "width",
  "height",
  "-webkit-text-fill-color"
];
const includedAttributes = [
  "stroke",
  "fill"
];
function getDefaultStyle(node, pseudoElement, context) {
  const { defaultComputedStyles } = context;
  const nodeName = node.nodeName.toLowerCase();
  const isSvgNode = isSVGElementNode(node) && nodeName !== "svg";
  const attributes = isSvgNode ? includedAttributes.map((name) => [name, node.getAttribute(name)]).filter(([, value]) => value !== null) : [];
  const key = [
    isSvgNode && "svg",
    nodeName,
    attributes.map((name, value) => `${name}=${value}`).join(","),
    pseudoElement
  ].filter(Boolean).join(":");
  if (defaultComputedStyles.has(key))
    return defaultComputedStyles.get(key);
  const sandbox = getSandBox(context);
  const sandboxWindow = sandbox?.contentWindow;
  if (!sandboxWindow)
    return /* @__PURE__ */ new Map();
  const sandboxDocument = sandboxWindow?.document;
  let root;
  let el;
  if (isSvgNode) {
    root = sandboxDocument.createElementNS(XMLNS, "svg");
    el = root.ownerDocument.createElementNS(root.namespaceURI, nodeName);
    attributes.forEach(([name, value]) => {
      el.setAttributeNS(null, name, value);
    });
    root.appendChild(el);
  } else {
    root = el = sandboxDocument.createElement(nodeName);
  }
  el.textContent = " ";
  sandboxDocument.body.appendChild(root);
  const computedStyle = sandboxWindow.getComputedStyle(el, pseudoElement);
  const styles = /* @__PURE__ */ new Map();
  for (let len = computedStyle.length, i = 0; i < len; i++) {
    const name = computedStyle.item(i);
    if (ignoredStyles.includes(name))
      continue;
    styles.set(name, computedStyle.getPropertyValue(name));
  }
  sandboxDocument.body.removeChild(root);
  defaultComputedStyles.set(key, styles);
  return styles;
}

function getDiffStyle(style, defaultStyle, includeStyleProperties) {
  const diffStyle = /* @__PURE__ */ new Map();
  const prefixs = [];
  const prefixTree = /* @__PURE__ */ new Map();
  if (includeStyleProperties) {
    for (const name of includeStyleProperties) {
      applyTo(name);
    }
  } else {
    for (let len = style.length, i = 0; i < len; i++) {
      const name = style.item(i);
      applyTo(name);
    }
  }
  for (let len = prefixs.length, i = 0; i < len; i++) {
    prefixTree.get(prefixs[i])?.forEach((value, name) => diffStyle.set(name, value));
  }
  function applyTo(name) {
    const value = style.getPropertyValue(name);
    const priority = style.getPropertyPriority(name);
    const subIndex = name.lastIndexOf("-");
    const prefix = subIndex > -1 ? name.substring(0, subIndex) : void 0;
    if (prefix) {
      let map = prefixTree.get(prefix);
      if (!map) {
        map = /* @__PURE__ */ new Map();
        prefixTree.set(prefix, map);
      }
      map.set(name, [value, priority]);
    }
    if (defaultStyle.get(name) === value && !priority)
      return;
    if (prefix) {
      prefixs.push(prefix);
    } else {
      diffStyle.set(name, [value, priority]);
    }
  }
  return diffStyle;
}

function copyCssStyles(node, cloned, isRoot, context) {
  const { ownerWindow, includeStyleProperties, currentParentNodeStyle } = context;
  const clonedStyle = cloned.style;
  const computedStyle = ownerWindow.getComputedStyle(node);
  const defaultStyle = getDefaultStyle(node, null, context);
  currentParentNodeStyle?.forEach((_, key) => {
    defaultStyle.delete(key);
  });
  const style = getDiffStyle(computedStyle, defaultStyle, includeStyleProperties);
  style.delete("transition-property");
  style.delete("all");
  style.delete("d");
  style.delete("content");
  if (isRoot) {
    style.delete("position");
    style.delete("margin-top");
    style.delete("margin-right");
    style.delete("margin-bottom");
    style.delete("margin-left");
    style.delete("margin-block-start");
    style.delete("margin-block-end");
    style.delete("margin-inline-start");
    style.delete("margin-inline-end");
    style.set("box-sizing", ["border-box", ""]);
  }
  if (style.get("background-clip")?.[0] === "text") {
    cloned.classList.add("______background-clip--text");
  }
  if (IN_CHROME) {
    if (!style.has("font-kerning"))
      style.set("font-kerning", ["normal", ""]);
    if ((style.get("overflow-x")?.[0] === "hidden" || style.get("overflow-y")?.[0] === "hidden") && style.get("text-overflow")?.[0] === "ellipsis" && node.scrollWidth === node.clientWidth) {
      style.set("text-overflow", ["clip", ""]);
    }
  }
  for (let len = clonedStyle.length, i = 0; i < len; i++) {
    clonedStyle.removeProperty(clonedStyle.item(i));
  }
  style.forEach(([value, priority], name) => {
    clonedStyle.setProperty(name, value, priority);
  });
  return style;
}

function copyInputValue(node, cloned) {
  if (isTextareaElement(node) || isInputElement(node) || isSelectElement(node)) {
    cloned.setAttribute("value", node.value);
  }
}

const pseudoClasses = [
  "::before",
  "::after"
  // '::placeholder', TODO
];
const scrollbarPseudoClasses = [
  "::-webkit-scrollbar",
  "::-webkit-scrollbar-button",
  // '::-webkit-scrollbar:horizontal', TODO
  "::-webkit-scrollbar-thumb",
  "::-webkit-scrollbar-track",
  "::-webkit-scrollbar-track-piece",
  // '::-webkit-scrollbar:vertical', TODO
  "::-webkit-scrollbar-corner",
  "::-webkit-resizer"
];
function copyPseudoClass(node, cloned, copyScrollbar, context, addWordToFontFamilies) {
  const { ownerWindow, svgStyleElement, svgStyles, currentNodeStyle } = context;
  if (!svgStyleElement || !ownerWindow)
    return;
  function copyBy(pseudoClass) {
    const computedStyle = ownerWindow.getComputedStyle(node, pseudoClass);
    let content = computedStyle.getPropertyValue("content");
    if (!content || content === "none")
      return;
    addWordToFontFamilies?.(content);
    content = content.replace(/(')|(")|(counter\(.+\))/g, "");
    const klasses = [uuid()];
    const defaultStyle = getDefaultStyle(node, pseudoClass, context);
    currentNodeStyle?.forEach((_, key) => {
      defaultStyle.delete(key);
    });
    const style = getDiffStyle(computedStyle, defaultStyle, context.includeStyleProperties);
    style.delete("content");
    style.delete("-webkit-locale");
    if (style.get("background-clip")?.[0] === "text") {
      cloned.classList.add("______background-clip--text");
    }
    const cloneStyle = [
      `content: '${content}';`
    ];
    style.forEach(([value, priority], name) => {
      cloneStyle.push(`${name}: ${value}${priority ? " !important" : ""};`);
    });
    if (cloneStyle.length === 1)
      return;
    try {
      cloned.className = [cloned.className, ...klasses].join(" ");
    } catch (err) {
      context.log.warn("Failed to copyPseudoClass", err);
      return;
    }
    const cssText = cloneStyle.join("\n  ");
    let allClasses = svgStyles.get(cssText);
    if (!allClasses) {
      allClasses = [];
      svgStyles.set(cssText, allClasses);
    }
    allClasses.push(`.${klasses[0]}${pseudoClass}`);
  }
  pseudoClasses.forEach(copyBy);
  if (copyScrollbar)
    scrollbarPseudoClasses.forEach(copyBy);
}

const excludeParentNodes = /* @__PURE__ */ new Set([
  "symbol"
  // test/fixtures/svg.symbol.html
]);
async function appendChildNode(node, cloned, child, context, addWordToFontFamilies) {
  if (isElementNode(child) && (isStyleElement(child) || isScriptElement(child)))
    return;
  if (context.filter && !context.filter(child))
    return;
  if (excludeParentNodes.has(cloned.nodeName) || excludeParentNodes.has(child.nodeName)) {
    context.currentParentNodeStyle = void 0;
  } else {
    context.currentParentNodeStyle = context.currentNodeStyle;
  }
  const childCloned = await cloneNode(child, context, false, addWordToFontFamilies);
  if (context.isEnable("restoreScrollPosition")) {
    restoreScrollPosition(node, childCloned);
  }
  cloned.appendChild(childCloned);
}
async function cloneChildNodes(node, cloned, context, addWordToFontFamilies) {
  let firstChild = node.firstChild;
  if (isElementNode(node)) {
    if (node.shadowRoot) {
      firstChild = node.shadowRoot?.firstChild;
      context.shadowRoots.push(node.shadowRoot);
    }
  }
  for (let child = firstChild; child; child = child.nextSibling) {
    if (isCommentNode(child))
      continue;
    if (isElementNode(child) && isSlotElement(child) && typeof child.assignedNodes === "function") {
      const nodes = child.assignedNodes();
      for (let i = 0; i < nodes.length; i++) {
        await appendChildNode(node, cloned, nodes[i], context, addWordToFontFamilies);
      }
    } else {
      await appendChildNode(node, cloned, child, context, addWordToFontFamilies);
    }
  }
}
function restoreScrollPosition(node, chlidCloned) {
  if (!isHTMLElementNode(node) || !isHTMLElementNode(chlidCloned))
    return;
  const { scrollTop, scrollLeft } = node;
  if (!scrollTop && !scrollLeft) {
    return;
  }
  const { transform } = chlidCloned.style;
  const matrix = new DOMMatrix(transform);
  const { a, b, c, d } = matrix;
  matrix.a = 1;
  matrix.b = 0;
  matrix.c = 0;
  matrix.d = 1;
  matrix.translateSelf(-scrollLeft, -scrollTop);
  matrix.a = a;
  matrix.b = b;
  matrix.c = c;
  matrix.d = d;
  chlidCloned.style.transform = matrix.toString();
}
function applyCssStyleWithOptions(cloned, context) {
  const { backgroundColor, width, height, style: styles } = context;
  const clonedStyle = cloned.style;
  if (backgroundColor)
    clonedStyle.setProperty("background-color", backgroundColor, "important");
  if (width)
    clonedStyle.setProperty("width", `${width}px`, "important");
  if (height)
    clonedStyle.setProperty("height", `${height}px`, "important");
  if (styles) {
    for (const name in styles) clonedStyle[name] = styles[name];
  }
}
const NORMAL_ATTRIBUTE_RE = /^[\w-:]+$/;
async function cloneNode(node, context, isRoot = false, addWordToFontFamilies) {
  const { ownerDocument, ownerWindow, fontFamilies, onCloneEachNode } = context;
  if (ownerDocument && isTextNode(node)) {
    if (addWordToFontFamilies && /\S/.test(node.data)) {
      addWordToFontFamilies(node.data);
    }
    return ownerDocument.createTextNode(node.data);
  }
  if (ownerDocument && ownerWindow && isElementNode(node) && (isHTMLElementNode(node) || isSVGElementNode(node))) {
    const cloned2 = await cloneElement(node, context);
    if (context.isEnable("removeAbnormalAttributes")) {
      const names = cloned2.getAttributeNames();
      for (let len = names.length, i = 0; i < len; i++) {
        const name = names[i];
        if (!NORMAL_ATTRIBUTE_RE.test(name)) {
          cloned2.removeAttribute(name);
        }
      }
    }
    const style = context.currentNodeStyle = copyCssStyles(node, cloned2, isRoot, context);
    if (isRoot)
      applyCssStyleWithOptions(cloned2, context);
    let copyScrollbar = false;
    if (context.isEnable("copyScrollbar")) {
      const overflow = [
        style.get("overflow-x")?.[0],
        style.get("overflow-y")?.[0]
      ];
      copyScrollbar = overflow.includes("scroll") || (overflow.includes("auto") || overflow.includes("overlay")) && (node.scrollHeight > node.clientHeight || node.scrollWidth > node.clientWidth);
    }
    const textTransform = style.get("text-transform")?.[0];
    const families = splitFontFamily(style.get("font-family")?.[0]);
    const addWordToFontFamilies2 = families ? (word) => {
      if (textTransform === "uppercase") {
        word = word.toUpperCase();
      } else if (textTransform === "lowercase") {
        word = word.toLowerCase();
      } else if (textTransform === "capitalize") {
        word = word[0].toUpperCase() + word.substring(1);
      }
      families.forEach((family) => {
        let fontFamily = fontFamilies.get(family);
        if (!fontFamily) {
          fontFamilies.set(family, fontFamily = /* @__PURE__ */ new Set());
        }
        word.split("").forEach((text) => fontFamily.add(text));
      });
    } : void 0;
    copyPseudoClass(
      node,
      cloned2,
      copyScrollbar,
      context,
      addWordToFontFamilies2
    );
    copyInputValue(node, cloned2);
    if (!isVideoElement(node)) {
      await cloneChildNodes(
        node,
        cloned2,
        context,
        addWordToFontFamilies2
      );
    }
    await onCloneEachNode?.(cloned2);
    return cloned2;
  }
  const cloned = node.cloneNode(false);
  await cloneChildNodes(node, cloned, context);
  await onCloneEachNode?.(cloned);
  return cloned;
}

function destroyContext(context) {
  context.ownerDocument = void 0;
  context.ownerWindow = void 0;
  context.svgStyleElement = void 0;
  context.svgDefsElement = void 0;
  context.svgStyles.clear();
  context.defaultComputedStyles.clear();
  if (context.sandbox) {
    try {
      context.sandbox.remove();
    } catch (err) {
      context.log.warn("Failed to destroyContext", err);
    }
    context.sandbox = void 0;
  }
  context.workers = [];
  context.fontFamilies.clear();
  context.fontCssTexts.clear();
  context.requests.clear();
  context.tasks = [];
  context.shadowRoots = [];
}

function baseFetch(options) {
  const { url, timeout, responseType, ...requestInit } = options;
  const controller = new AbortController();
  const timer = timeout ? setTimeout(() => controller.abort(), timeout) : void 0;
  return fetch(url, { signal: controller.signal, ...requestInit }).then((response) => {
    if (!response.ok) {
      throw new Error("Failed fetch, not 2xx response", { cause: response });
    }
    switch (responseType) {
      case "arrayBuffer":
        return response.arrayBuffer();
      case "dataUrl":
        return response.blob().then(blobToDataUrl);
      case "text":
      default:
        return response.text();
    }
  }).finally(() => clearTimeout(timer));
}
function contextFetch(context, options) {
  const { url: rawUrl, requestType = "text", responseType = "text", imageDom } = options;
  let url = rawUrl;
  const {
    timeout,
    acceptOfImage,
    requests,
    fetchFn,
    fetch: {
      requestInit,
      bypassingCache,
      placeholderImage
    },
    font,
    workers,
    fontFamilies
  } = context;
  if (requestType === "image" && (IN_SAFARI || IN_FIREFOX)) {
    context.drawImageCount++;
  }
  let request = requests.get(rawUrl);
  if (!request) {
    if (bypassingCache) {
      if (bypassingCache instanceof RegExp && bypassingCache.test(url)) {
        url += (/\?/.test(url) ? "&" : "?") + (/* @__PURE__ */ new Date()).getTime();
      }
    }
    const canFontMinify = requestType.startsWith("font") && font && font.minify;
    const fontTexts = /* @__PURE__ */ new Set();
    if (canFontMinify) {
      const families = requestType.split(";")[1].split(",");
      families.forEach((family) => {
        if (!fontFamilies.has(family))
          return;
        fontFamilies.get(family).forEach((text) => fontTexts.add(text));
      });
    }
    const needFontMinify = canFontMinify && fontTexts.size;
    const baseFetchOptions = {
      url,
      timeout,
      responseType: needFontMinify ? "arrayBuffer" : responseType,
      headers: requestType === "image" ? { accept: acceptOfImage } : void 0,
      ...requestInit
    };
    request = {
      type: requestType,
      resolve: void 0,
      reject: void 0,
      response: null
    };
    request.response = (async () => {
      if (fetchFn && requestType === "image") {
        const result = await fetchFn(rawUrl);
        if (result)
          return result;
      }
      if (!IN_SAFARI && rawUrl.startsWith("http") && workers.length) {
        return new Promise((resolve, reject) => {
          const worker = workers[requests.size & workers.length - 1];
          worker.postMessage({ rawUrl, ...baseFetchOptions });
          request.resolve = resolve;
          request.reject = reject;
        });
      }
      return baseFetch(baseFetchOptions);
    })().catch((error) => {
      requests.delete(rawUrl);
      if (requestType === "image" && placeholderImage) {
        context.log.warn("Failed to fetch image base64, trying to use placeholder image", url);
        return typeof placeholderImage === "string" ? placeholderImage : placeholderImage(imageDom);
      }
      throw error;
    });
    requests.set(rawUrl, request);
  }
  return request.response;
}

async function replaceCssUrlToDataUrl(cssText, baseUrl, context, isImage) {
  if (!hasCssUrl(cssText))
    return cssText;
  for (const [rawUrl, url] of parseCssUrls(cssText, baseUrl)) {
    try {
      const dataUrl = await contextFetch(
        context,
        {
          url,
          requestType: isImage ? "image" : "text",
          responseType: "dataUrl"
        }
      );
      cssText = cssText.replace(toRE(rawUrl), `$1${dataUrl}$3`);
    } catch (error) {
      context.log.warn("Failed to fetch css data url", rawUrl, error);
    }
  }
  return cssText;
}
function hasCssUrl(cssText) {
  return /url\((['"]?)([^'"]+?)\1\)/.test(cssText);
}
const URL_RE = /url\((['"]?)([^'"]+?)\1\)/g;
function parseCssUrls(cssText, baseUrl) {
  const result = [];
  cssText.replace(URL_RE, (raw, quotation, url) => {
    result.push([url, resolveUrl(url, baseUrl)]);
    return raw;
  });
  return result.filter(([url]) => !isDataUrl(url));
}
function toRE(url) {
  const escaped = url.replace(/([.*+?^${}()|\[\]\/\\])/g, "\\$1");
  return new RegExp(`(url\\(['"]?)(${escaped})(['"]?\\))`, "g");
}

const properties = [
  "background-image",
  "border-image-source",
  "-webkit-border-image",
  "-webkit-mask-image",
  "list-style-image"
];
function embedCssStyleImage(style, context) {
  return properties.map((property) => {
    const value = style.getPropertyValue(property);
    if (!value || value === "none") {
      return null;
    }
    if (IN_SAFARI || IN_FIREFOX) {
      context.drawImageCount++;
    }
    return replaceCssUrlToDataUrl(value, null, context, true).then((newValue) => {
      if (!newValue || value === newValue)
        return;
      style.setProperty(
        property,
        newValue,
        style.getPropertyPriority(property)
      );
    });
  }).filter(Boolean);
}

function embedImageElement(cloned, context) {
  if (isImageElement(cloned)) {
    const originalSrc = cloned.currentSrc || cloned.src;
    if (!isDataUrl(originalSrc)) {
      return [
        contextFetch(context, {
          url: originalSrc,
          imageDom: cloned,
          requestType: "image",
          responseType: "dataUrl"
        }).then((url) => {
          if (!url)
            return;
          cloned.srcset = "";
          cloned.dataset.originalSrc = originalSrc;
          cloned.src = url || "";
        })
      ];
    }
    if (IN_SAFARI || IN_FIREFOX) {
      context.drawImageCount++;
    }
  } else if (isSVGElementNode(cloned) && !isDataUrl(cloned.href.baseVal)) {
    const originalSrc = cloned.href.baseVal;
    return [
      contextFetch(context, {
        url: originalSrc,
        imageDom: cloned,
        requestType: "image",
        responseType: "dataUrl"
      }).then((url) => {
        if (!url)
          return;
        cloned.dataset.originalSrc = originalSrc;
        cloned.href.baseVal = url || "";
      })
    ];
  }
  return [];
}

function embedSvgUse(cloned, context) {
  const { ownerDocument, svgDefsElement } = context;
  const href = cloned.getAttribute("href") ?? cloned.getAttribute("xlink:href");
  if (!href)
    return [];
  const [svgUrl, id] = href.split("#");
  if (id) {
    const query = `#${id}`;
    const definition = context.shadowRoots.reduce(
      (res, root) => {
        return res ?? root.querySelector(`svg ${query}`);
      },
      ownerDocument?.querySelector(`svg ${query}`)
    );
    if (svgUrl) {
      cloned.setAttribute("href", query);
    }
    if (svgDefsElement?.querySelector(query))
      return [];
    if (definition) {
      svgDefsElement?.appendChild(definition.cloneNode(true));
      return [];
    } else if (svgUrl) {
      return [
        contextFetch(context, {
          url: svgUrl,
          responseType: "text"
        }).then((svgData) => {
          svgDefsElement?.insertAdjacentHTML("beforeend", svgData);
        })
      ];
    }
  }
  return [];
}

function embedNode(cloned, context) {
  const { tasks } = context;
  if (isElementNode(cloned)) {
    if (isImageElement(cloned) || isSVGImageElementNode(cloned)) {
      tasks.push(...embedImageElement(cloned, context));
    }
    if (isSVGUseElementNode(cloned)) {
      tasks.push(...embedSvgUse(cloned, context));
    }
  }
  if (isHTMLElementNode(cloned)) {
    tasks.push(...embedCssStyleImage(cloned.style, context));
  }
  cloned.childNodes.forEach((child) => {
    embedNode(child, context);
  });
}

async function embedWebFont(clone, context) {
  const {
    ownerDocument,
    svgStyleElement,
    fontFamilies,
    fontCssTexts,
    tasks,
    font
  } = context;
  if (!ownerDocument || !svgStyleElement || !fontFamilies.size) {
    return;
  }
  if (font && font.cssText) {
    const cssText = filterPreferredFormat(font.cssText, context);
    svgStyleElement.appendChild(ownerDocument.createTextNode(`${cssText}
`));
  } else {
    const styleSheets = Array.from(ownerDocument.styleSheets).filter((styleSheet) => {
      try {
        return "cssRules" in styleSheet && Boolean(styleSheet.cssRules.length);
      } catch (error) {
        context.log.warn(`Error while reading CSS rules from ${styleSheet.href}`, error);
        return false;
      }
    });
    const tempDoc = ownerDocument.implementation.createHTMLDocument("");
    const tempStyleEl = tempDoc.createElement("style");
    tempDoc.head.appendChild(tempStyleEl);
    const tempStyleSheet = tempStyleEl.sheet;
    await Promise.all(
      styleSheets.flatMap((styleSheet) => {
        return Array.from(styleSheet.cssRules).map(async (cssRule) => {
          if (isCSSImportRule(cssRule)) {
            const baseUrl = cssRule.href;
            let cssText = "";
            try {
              cssText = await contextFetch(context, {
                url: baseUrl,
                requestType: "text",
                responseType: "text"
              });
            } catch (error) {
              context.log.warn(`Error fetch remote css import from ${baseUrl}`, error);
            }
            const replacedCssText = cssText.replace(
              URL_RE,
              (raw, quotation, url) => raw.replace(url, resolveUrl(url, baseUrl))
            );
            for (const rule of parseCss(replacedCssText)) {
              try {
                tempStyleSheet.insertRule(rule, tempStyleSheet.cssRules.length);
              } catch (error) {
                context.log.warn("Error inserting rule from remote css import", { rule, error });
              }
            }
          }
        });
      })
    );
    if (tempStyleSheet.cssRules.length)
      styleSheets.push(tempStyleSheet);
    const cssRules = [];
    styleSheets.forEach((sheet) => {
      unwrapCssLayers(sheet.cssRules, cssRules);
    });
    cssRules.filter((cssRule) => isCssFontFaceRule(cssRule) && hasCssUrl(cssRule.style.getPropertyValue("src")) && splitFontFamily(cssRule.style.getPropertyValue("font-family"))?.some((val) => fontFamilies.has(val))).forEach((value) => {
      const rule = value;
      const cssText = fontCssTexts.get(rule.cssText);
      if (cssText) {
        svgStyleElement.appendChild(ownerDocument.createTextNode(`${cssText}
`));
      } else {
        tasks.push(
          replaceCssUrlToDataUrl(
            rule.cssText,
            rule.parentStyleSheet ? rule.parentStyleSheet.href : null,
            context
          ).then((cssText2) => {
            cssText2 = filterPreferredFormat(cssText2, context);
            fontCssTexts.set(rule.cssText, cssText2);
            svgStyleElement.appendChild(ownerDocument.createTextNode(`${cssText2}
`));
          })
        );
      }
    });
  }
}
const COMMENTS_RE = /(\/\*[\s\S]*?\*\/)/g;
const KEYFRAMES_RE = /((@.*?keyframes [\s\S]*?){([\s\S]*?}\s*?)})/gi;
function parseCss(source) {
  if (source == null)
    return [];
  const result = [];
  let cssText = source.replace(COMMENTS_RE, "");
  while (true) {
    const matches = KEYFRAMES_RE.exec(cssText);
    if (!matches)
      break;
    result.push(matches[0]);
  }
  cssText = cssText.replace(KEYFRAMES_RE, "");
  const IMPORT_RE = /@import[\s\S]*?url\([^)]*\)[\s\S]*?;/gi;
  const UNIFIED_RE = new RegExp(
    // eslint-disable-next-line
    "((\\s*?(?:\\/\\*[\\s\\S]*?\\*\\/)?\\s*?@media[\\s\\S]*?){([\\s\\S]*?)}\\s*?})|(([\\s\\S]*?){([\\s\\S]*?)})",
    "gi"
  );
  while (true) {
    let matches = IMPORT_RE.exec(cssText);
    if (!matches) {
      matches = UNIFIED_RE.exec(cssText);
      if (!matches) {
        break;
      } else {
        IMPORT_RE.lastIndex = UNIFIED_RE.lastIndex;
      }
    } else {
      UNIFIED_RE.lastIndex = IMPORT_RE.lastIndex;
    }
    result.push(matches[0]);
  }
  return result;
}
const URL_WITH_FORMAT_RE = /url\([^)]+\)\s*format\((["']?)([^"']+)\1\)/g;
const FONT_SRC_RE = /src:\s*(?:url\([^)]+\)\s*format\([^)]+\)[,;]\s*)+/g;
function filterPreferredFormat(str, context) {
  const { font } = context;
  const preferredFormat = font ? font?.preferredFormat : void 0;
  return preferredFormat ? str.replace(FONT_SRC_RE, (match) => {
    while (true) {
      const [src, , format] = URL_WITH_FORMAT_RE.exec(match) || [];
      if (!format)
        return "";
      if (format === preferredFormat)
        return `src: ${src};`;
    }
  }) : str;
}
function unwrapCssLayers(rules, out = []) {
  for (const rule of Array.from(rules)) {
    if (isLayerBlockRule(rule)) {
      out.push(...unwrapCssLayers(rule.cssRules));
    } else if ("cssRules" in rule) {
      unwrapCssLayers(rule.cssRules, out);
    } else {
      out.push(rule);
    }
  }
  return out;
}

const SVG_EXTERNAL_RESOURCE_REGEX = /\bx?link:?href\s*=\s*["'](?!data:)[^"']+["']/i;
function svgHasExternalResources(svg) {
  return SVG_EXTERNAL_RESOURCE_REGEX.test(svg.innerHTML);
}
async function domToForeignObjectSvg(node, options) {
  const context = await orCreateContext(node, options);
  if (isElementNode(context.node) && isSVGElementNode(context.node) && !svgHasExternalResources(context.node))
    return context.node;
  const {
    ownerDocument,
    log,
    tasks,
    svgStyleElement,
    svgDefsElement,
    svgStyles,
    font,
    progress,
    autoDestruct,
    onCloneNode,
    onEmbedNode,
    onCreateForeignObjectSvg
  } = context;
  log.time("clone node");
  const clone = await cloneNode(context.node, context, true);
  if (svgStyleElement && ownerDocument) {
    let allCssText = "";
    svgStyles.forEach((klasses, cssText) => {
      allCssText += `${klasses.join(",\n")} {
  ${cssText}
}
`;
    });
    svgStyleElement.appendChild(ownerDocument.createTextNode(allCssText));
  }
  log.timeEnd("clone node");
  await onCloneNode?.(clone);
  if (font !== false && isElementNode(clone)) {
    log.time("embed web font");
    await embedWebFont(clone, context);
    log.timeEnd("embed web font");
  }
  log.time("embed node");
  embedNode(clone, context);
  const count = tasks.length;
  let current = 0;
  const runTask = async () => {
    while (true) {
      const task = tasks.pop();
      if (!task)
        break;
      try {
        await task;
      } catch (error) {
        context.log.warn("Failed to run task", error);
      }
      progress?.(++current, count);
    }
  };
  progress?.(current, count);
  await Promise.all([...Array.from({ length: 4 })].map(runTask));
  log.timeEnd("embed node");
  await onEmbedNode?.(clone);
  const svg = createForeignObjectSvg(clone, context);
  svgDefsElement && svg.insertBefore(svgDefsElement, svg.children[0]);
  svgStyleElement && svg.insertBefore(svgStyleElement, svg.children[0]);
  autoDestruct && destroyContext(context);
  await onCreateForeignObjectSvg?.(svg);
  return svg;
}
function createForeignObjectSvg(clone, context) {
  const { width, height } = context;
  const svg = createSvg(width, height, clone.ownerDocument);
  const foreignObject = svg.ownerDocument.createElementNS(svg.namespaceURI, "foreignObject");
  foreignObject.setAttributeNS(null, "x", "0%");
  foreignObject.setAttributeNS(null, "y", "0%");
  foreignObject.setAttributeNS(null, "width", "100%");
  foreignObject.setAttributeNS(null, "height", "100%");
  foreignObject.append(clone);
  svg.appendChild(foreignObject);
  return svg;
}

async function domToCanvas(node, options) {
  const context = await orCreateContext(node, options);
  const svg = await domToForeignObjectSvg(context);
  const dataUrl = svgToDataUrl(svg, context.isEnable("removeControlCharacter"));
  if (!context.autoDestruct) {
    context.svgStyleElement = createStyleElement(context.ownerDocument);
    context.svgDefsElement = context.ownerDocument?.createElementNS(XMLNS, "defs");
    context.svgStyles.clear();
  }
  const image = createImage(dataUrl, svg.ownerDocument);
  return await imageToCanvas(image, context);
}

async function domToBlob(node, options) {
  const context = await orCreateContext(node, options);
  const { log, type, quality, dpi } = context;
  const canvas = await domToCanvas(context);
  log.time("canvas to blob");
  const blob = await canvasToBlob(canvas, type, quality);
  if (["image/png", "image/jpeg"].includes(type) && dpi) {
    const arrayBuffer = await blobToArrayBuffer(blob.slice(0, 33));
    let uint8Array = new Uint8Array(arrayBuffer);
    if (type === "image/png") {
      uint8Array = changePngDpi(uint8Array, dpi);
    } else if (type === "image/jpeg") {
      uint8Array = changeJpegDpi(uint8Array, dpi);
    }
    log.timeEnd("canvas to blob");
    return new Blob([uint8Array, blob.slice(33)], { type });
  }
  log.timeEnd("canvas to blob");
  return blob;
}

async function domToDataUrl(node, options) {
  const context = await orCreateContext(node, options);
  const { log, quality, type, dpi } = context;
  const canvas = await domToCanvas(context);
  log.time("canvas to data url");
  let dataUrl = canvas.toDataURL(type, quality);
  if (["image/png", "image/jpeg"].includes(type) && dpi && SUPPORT_ATOB && SUPPORT_BTOA) {
    const [format, body] = dataUrl.split(",");
    let headerLength = 0;
    let overwritepHYs = false;
    if (type === "image/png") {
      const b64Index = detectPhysChunkFromDataUrl(body);
      if (b64Index >= 0) {
        headerLength = Math.ceil((b64Index + 28) / 3) * 4;
        overwritepHYs = true;
      } else {
        headerLength = 33 / 3 * 4;
      }
    } else if (type === "image/jpeg") {
      headerLength = 18 / 3 * 4;
    }
    const stringHeader = body.substring(0, headerLength);
    const restOfData = body.substring(headerLength);
    const headerBytes = window.atob(stringHeader);
    const uint8Array = new Uint8Array(headerBytes.length);
    for (let i = 0; i < uint8Array.length; i++) {
      uint8Array[i] = headerBytes.charCodeAt(i);
    }
    const finalArray = type === "image/png" ? changePngDpi(uint8Array, dpi, overwritepHYs) : changeJpegDpi(uint8Array, dpi);
    const base64Header = window.btoa(String.fromCharCode(...finalArray));
    dataUrl = [format, ",", base64Header, restOfData].join("");
  }
  log.timeEnd("canvas to data url");
  return dataUrl;
}

async function domToSvg(node, options) {
  const context = await orCreateContext(node, options);
  const { width, height, ownerDocument } = context;
  const dataUrl = await domToDataUrl(context);
  const svg = createSvg(width, height, ownerDocument);
  const svgImage = svg.ownerDocument.createElementNS(svg.namespaceURI, "image");
  svgImage.setAttributeNS(null, "href", dataUrl);
  svgImage.setAttributeNS(null, "height", "100%");
  svgImage.setAttributeNS(null, "width", "100%");
  svg.appendChild(svgImage);
  return svgToDataUrl(svg, context.isEnable("removeControlCharacter"));
}

async function domToImage(node, options) {
  const context = await orCreateContext(node, options);
  const { ownerDocument, width, height, scale, type } = context;
  const url = type === "image/svg+xml" ? await domToSvg(context) : await domToDataUrl(context);
  const image = createImage(url, ownerDocument);
  image.width = Math.floor(width * scale);
  image.height = Math.floor(height * scale);
  image.style.width = `${width}px`;
  image.style.height = `${height}px`;
  return image;
}

async function domToJpeg(node, options) {
  return domToDataUrl(
    await orCreateContext(node, { ...options, type: "image/jpeg" })
  );
}

async function domToPixel(node, options) {
  const context = await orCreateContext(node, options);
  const canvas = await domToCanvas(context);
  return canvas.getContext("2d").getImageData(0, 0, canvas.width, canvas.height).data;
}

async function domToPng(node, options) {
  return domToDataUrl(
    await orCreateContext(node, { ...options, type: "image/png" })
  );
}

async function domToWebp(node, options) {
  return domToDataUrl(
    await orCreateContext(node, { ...options, type: "image/webp" })
  );
}



// EXTERNAL MODULE: ./src/core/utils.ts
var utils = __webpack_require__(175);
;// ./src/core/parseComments.js
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
                let link = ZhihuLink2NormalLink(node.href)
                textContentPlain += '[' + node.textContent + '](' + link + ')'
            }
            else if (node.nodeName == 'BR') textContentPlain += '\n'
            else if (node.nodeName == 'P') {//如果一条评论有且仅有多个小表情，会用P包裹，有时分段内容也会，还有带链接内容
                node.childNodes.forEach(c => {
                    if (c.nodeName == 'A') {
                        let link = ZhihuLink2NormalLink(c.href)
                        textContentPlain += '[' + c.textContent + '](' + link + ')'
                    }
                    else if (c.nodeName == 'BR') textContentPlain += '\n'
                    else textContentPlain += c.alt || c.textContent
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

    if (!toolbar) {
        toolbar = cc.querySelector('.css-14eeh9e')// 去兼容知乎美化 暗黑模式
        cc.querySelector('.comment-parser-container-wrap')?.remove()
    }
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
                    edit_Filename = GM_getValue("edit_Filename") || '未启用'
                if (edit_Filename == 'title + "_" + author.name + "_" + time.modified.slice(0, 10) + remark') {
                    edit_Filename = '与默认值相同'
                }
                var HINT2 = `\n当前设置：\n跳过空白段落：${skip_empty_p}\n复制保存评论：${copy_save_cm}\n复制保存FM：${copy_save_fm}\nzip合并评论：${zip_merge_cm}\n复制与纯文本不存图片：${no_save_img}\n自定义文件名：${edit_Filename}`
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

const ZhihuLink2NormalLink = (link) => {
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
    /*     else if (relativeTime.includes('天前')) {
            result.setDate(result.getDate() - relativeTime.match(/\d+/)[0]);
            result.setSeconds(0);
        } */
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

// EXTERNAL MODULE: ./src/core/obsidianSaver.ts
var obsidianSaver = __webpack_require__(804);
;// ./src/index.ts






/**
 * 适配复杂的想法：转发、带卡片链接、带@
 * 页：推送页，个人/机构主页，回答页，问题页，文章页，想法页，收藏夹页，搜索结果页
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
        // @ts-ignore
        let menuFilename = GM_registerMenuCommand("自定义保存后的文件名格式", function () {
            // @ts-ignore
            let efm = GM_getValue("edit_Filename");
            let fm = prompt(`是否自定义保存后的文件名格式？留空或填错恢复默认\n默认为title + "_" + author.name + "_" + time.modified.slice(0, 10) + remark，你可以调整它的顺序，使用其他属性需要阅读源码\n(new Date).toLocaleDateString().replaceAll('/','-')添加保存日期`, efm ? efm : 'title + "_" + author.name + "_" + time.modified.slice(0, 10) + remark');
            // @ts-ignore
            GM_setValue("edit_Filename", fm);
            //alert(GM_getValue("edit_Filename"))
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
    <button class="to-obsidian Button VoteButton">
    <svg style="width: 2em;height: 2em;width: 1.5em;height: 1.5em;opacity: 0.6;vertical-align: sub;" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M19.355 18.538a68.967 68.959 0 0 0 1.858-2.954a.81.81 0 0 0-.062-.9c-.516-.685-1.504-2.075-2.042-3.362c-.553-1.321-.636-3.375-.64-4.377a1.7 1.7 0 0 0-.358-1.05l-3.198-4.064a4 4 0 0 1-.076.543c-.106.503-.307 1.004-.536 1.5c-.134.29-.29.6-.446.914l-.31.626c-.516 1.068-.997 2.227-1.132 3.59c-.124 1.26.046 2.73.815 4.481q.192.016.386.044a6.36 6.36 0 0 1 3.326 1.505c.916.79 1.744 1.922 2.415 3.5zM8.199 22.569q.11.019.22.02c.78.024 2.095.092 3.16.29c.87.16 2.593.64 4.01 1.055c1.083.316 2.198-.548 2.355-1.664c.114-.814.33-1.735.725-2.58l-.01.005c-.67-1.87-1.522-3.078-2.416-3.849a5.3 5.3 0 0 0-2.778-1.257c-1.54-.216-2.952.19-3.84.45c.532 2.218.368 4.829-1.425 7.531zM5.533 9.938q-.035.15-.098.29L2.82 16.059a1.6 1.6 0 0 0 .313 1.772l4.116 4.24c2.103-3.101 1.796-6.02.836-8.3c-.728-1.73-1.832-3.081-2.55-3.831zM9.32 14.01c.615-.183 1.606-.465 2.745-.534c-.683-1.725-.848-3.233-.716-4.577c.154-1.552.7-2.847 1.235-3.95q.17-.35.328-.664c.149-.297.288-.577.419-.86c.217-.47.379-.885.46-1.27c.08-.38.08-.72-.014-1.043c-.095-.325-.297-.675-.68-1.06a1.6 1.6 0 0 0-1.475.36l-4.95 4.452a1.6 1.6 0 0 0-.513.952l-.427 2.83c.672.59 2.328 2.316 3.335 4.711q.136.317.253.653"></path></svg>
    保存到<br>指定文件夹</button>
    <div class="Button VoteButton" style="display: inline-block;box-sizing: border-box;overflow: hidden;">
        <textarea class="to-remark" type="text" placeholder="添加备注" style="width: 100%;" maxlength="60"></textarea>
    </div>
    <div class="Button VoteButton" style="display: inline-block;box-sizing: border-box;">
        <label><input type="checkbox" checked class="to-cm"> 保存评论</label>
    </div>`;
const main = async () => {
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
                //if (RichText.textContent.length == 0) continue
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
            // 为 textarea 添加事件监听器，阻止事件冒泡，确保可以正常输入
            const textareaRemark = parent_dom.querySelector(".to-remark");
            textareaRemark.addEventListener("click", (e) => {
                e.stopPropagation();
                e.preventDefault();
                textareaRemark.focus();
            }, true); // 使用捕获阶段
            const ButtonMarkdown = parent_dom.querySelector(".to-copy");
            ButtonMarkdown.addEventListener("click", throttle(async (event) => {
                try {
                    const res = await (0,dealItem/* default */.A)(RichText, 'copy', event);
                    if (!res)
                        return; // 取消保存
                    result = {
                        textString: res.textString,
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
            }));
            const ButtonZip = parent_dom.querySelector(".to-zip");
            ButtonZip.addEventListener("click", throttle(async (event) => {
                try {
                    ButtonZip.innerHTML = "下载中……";
                    const res = await (0,dealItem/* default */.A)(RichText, 'zip', event);
                    if (!res)
                        return ButtonZip.innerHTML = "下载为 ZIP"; // 取消保存
                    result = {
                        zip: res.zip,
                        title: res.title,
                    };
                    const blob = await result.zip.generateAsync({ type: "blob" });
                    (0,FileSaver_min.saveAs)(blob, result.title + ".zip");
                    ButtonZip.innerHTML = "下载成功✅<br>请看下载记录";
                    setTimeout(() => {
                        ButtonZip.innerHTML = "下载为 ZIP";
                    }, 5000);
                }
                catch (e) {
                    console.log(e);
                    ButtonZip.innerHTML = "发生错误❌<br>请打开控制台查看";
                    setTimeout(() => {
                        ButtonZip.innerHTML = "下载为 ZIP";
                    }, 5000);
                }
            }));
            const ButtonPNG = parent_dom.querySelector(".to-png");
            ButtonPNG.addEventListener("click", throttle(async (event) => {
                try {
                    const res = await (0,dealItem/* default */.A)(RichText, 'png', event);
                    if (!res)
                        return; // 取消保存
                    result = {
                        title: res.title,
                    };
                    let clip = parent_dom;
                    clip.classList.add("to-screenshot");
                    let saveCM = (0,utils/* getCommentSwitch */.mK)(RichText);
                    !saveCM ? clip.classList.add("no-cm") : 0;
                    let svgDefs = document.querySelector("#MathJax_SVG_glyphs");
                    svgDefs ? svgDefs.style.visibility = "visible" : 0;
                    domToPng(clip, {
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
            }));
            const ButtonText = parent_dom.querySelector(".to-text");
            ButtonText.addEventListener("click", throttle(async (event) => {
                try {
                    const res = await (0,dealItem/* default */.A)(RichText, 'text', event);
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
            }));
            const ButtonObsidian = parent_dom.querySelector(".to-obsidian");
            ButtonObsidian.addEventListener("click", throttle(async (event) => {
                try {
                    let saveType = await (0,obsidianSaver/* selectObsidianVault */.yY)();
                    if (!saveType)
                        return; // 取消保存
                    if (saveType == 'text') {
                        const res = await (0,dealItem/* default */.A)(RichText, 'text');
                        if (!res)
                            return; // 取消保存
                        result = {
                            textString: res.textString,
                            title: res.title,
                        };
                        await (0,obsidianSaver/* saveFile */.OJ)(result, saveType);
                    }
                    else if (saveType.slice(0, 3) == 'zip') {
                        const res = await (0,dealItem/* default */.A)(RichText, 'zip');
                        if (!res)
                            return; // 取消保存
                        result = {
                            zip: res.zip,
                            title: res.title,
                        };
                        await (0,obsidianSaver/* saveFile */.OJ)(result, saveType);
                    }
                    else if (saveType == 'png') {
                        const res = await (0,dealItem/* default */.A)(RichText, 'png');
                        if (!res)
                            return; // 取消保存
                        let clip = parent_dom;
                        clip.classList.add("to-screenshot");
                        let saveCM = (0,utils/* getCommentSwitch */.mK)(RichText);
                        !saveCM ? clip.classList.add("no-cm") : 0;
                        let svgDefs = document.querySelector("#MathJax_SVG_glyphs");
                        svgDefs ? svgDefs.style.visibility = "visible" : 0;
                        domToPng(clip, {
                            backgroundColor: "#fff",
                            filter(el) {
                                if (el.tagName == 'DIV' && el.classList.contains('zhihubackup-wrap'))
                                    return false;
                                else
                                    return true;
                            },
                        }).then(async (dataUrl) => {
                            result = {
                                textString: dataUrl,
                                title: res.title,
                            };
                            clip.classList.remove("to-screenshot");
                            !saveCM ? clip.classList.remove("no-cm") : 0;
                            await (0,obsidianSaver/* saveFile */.OJ)(result, saveType);
                        });
                    }
                }
                catch (e) {
                    console.log(e);
                    alert('发生错误❌请打开控制台查看\n你可以关闭窗口后再试一次！');
                }
            }));
        }
        catch (e) {
            console.log(e);
        }
    }
};
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
        top: -100px;
        height: 100%;
        min-height: 200px;
        user-select: none;
        width: 12em;
    }
    .RichContent:hover .zhihubackup-wrap,
    .ContentItem:hover .zhihubackup-wrap,
    .Post-content:hover .zhihubackup-wrap,
    .Post-RichTextContainer:hover .zhihubackup-wrap,
    .zhihubackup-wrap:hover {
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
    .zhihubackup-container .Button {
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
    div.Button.VoteButton:has(input:focus),
    div.Button.VoteButton:has(textarea:focus),
    div.Button.VoteButton:has(textarea:hover) {
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
    main();
    mountParseComments();
    // @ts-ignore
    window.zhbf = main;
    // 在window对象上创建存储空间
    // @ts-ignore
    window.ArticleComments = window.ArticleComments || {};
    document.querySelector('.Topstory-tabs')?.addEventListener('click', () => {
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

;// ./src/entry.ts


})();

/******/ })()
;