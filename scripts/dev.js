// ==UserScript==
// @name         知乎备份剪藏-本地测试
// @namespace    qtqz
// @source       https://github.com/qtqz/zhihu-backup-collect
// @version      0.7.10
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
// @require      file://C:/code/zhihu/zhihu-backup-collect/dist/bundle.js
// @license      MIT
// @icon         https://static.zhihu.com/heifetz/favicon.ico
// @grant        none
// ==/UserScript==

/*file://C:\code\zhihu\zhihu-backup-collect/dist/bundle.js
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./config/empty.cjs":
/*!**************************!*\
  !*** ./config/empty.cjs ***!
  \**************************/
/***/ (() => {

    eval("/**\n * This is an empty javascript file for webpack to generate a development UserScript without real code.\n * So we could make UserScript manager load script file from local file path.\n * See webpack.config.dev.js for more details.\n */\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9jb25maWcvZW1wdHkuY2pzIiwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly93ZWJwYWNrLXVzZXJzY3JpcHQtdGVtcGxhdGUvLi9jb25maWcvZW1wdHkuY2pzP2Y4NGUiXSwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBUaGlzIGlzIGFuIGVtcHR5IGphdmFzY3JpcHQgZmlsZSBmb3Igd2VicGFjayB0byBnZW5lcmF0ZSBhIGRldmVsb3BtZW50IFVzZXJTY3JpcHQgd2l0aG91dCByZWFsIGNvZGUuXG4gKiBTbyB3ZSBjb3VsZCBtYWtlIFVzZXJTY3JpcHQgbWFuYWdlciBsb2FkIHNjcmlwdCBmaWxlIGZyb20gbG9jYWwgZmlsZSBwYXRoLlxuICogU2VlIHdlYnBhY2suY29uZmlnLmRldi5qcyBmb3IgbW9yZSBkZXRhaWxzLlxuICovXG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./config/empty.cjs\n");

    /***/ })
    
    /******/ 	});
    /************************************************************************/
    /******/
    /******/ 	// startup
    /******/ 	// Load entry module and return exports
    /******/ 	// This entry module can't be inlined because the eval-source-map devtool is used.
    /******/ 	var __webpack_exports__ = {};
    /******/ 	__webpack_modules__["./config/empty.cjs"]();
    /******/
    /******/ })()/*file://C:\code\zhihu\zhihu-follow-fliter\dist\index.debug.js
     * ATTENTION: An "eval-source-map" devtool has been used.
     * This devtool is neither made for production nor for readable output files.
     * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
     * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
     * or disable the default devtool with "devtool: false".
     * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
     */
    /******/ (() => { // webpackBootstrap
    /******/ 	var __webpack_modules__ = ({
    
    /***/ "./config/empty.cjs":
    /*!**************************!*\
      !*** ./config/empty.cjs ***!
      \**************************/
    /***/ (() => {
    
    eval("/**\n * This is an empty javascript file for webpack to generate a development UserScript without real code.\n * So we could make UserScript manager load script file from local file path.\n * See webpack.config.dev.js for more details.\n */\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9jb25maWcvZW1wdHkuY2pzIiwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly93ZWJwYWNrLXVzZXJzY3JpcHQtdGVtcGxhdGUvLi9jb25maWcvZW1wdHkuY2pzP2Y4NGUiXSwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBUaGlzIGlzIGFuIGVtcHR5IGphdmFzY3JpcHQgZmlsZSBmb3Igd2VicGFjayB0byBnZW5lcmF0ZSBhIGRldmVsb3BtZW50IFVzZXJTY3JpcHQgd2l0aG91dCByZWFsIGNvZGUuXG4gKiBTbyB3ZSBjb3VsZCBtYWtlIFVzZXJTY3JpcHQgbWFuYWdlciBsb2FkIHNjcmlwdCBmaWxlIGZyb20gbG9jYWwgZmlsZSBwYXRoLlxuICogU2VlIHdlYnBhY2suY29uZmlnLmRldi5qcyBmb3IgbW9yZSBkZXRhaWxzLlxuICovXG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./config/empty.cjs\n");
    
    /***/ })
    
    /******/ 	});
    /************************************************************************/
    /******/
    /******/ 	// startup
    /******/ 	// Load entry module and return exports
    /******/ 	// This entry module can't be inlined because the eval-source-map devtool is used.
    /******/ 	var __webpack_exports__ = {};
    /******/ 	__webpack_modules__["./config/empty.cjs"]();
    /******/
    /******/ })()