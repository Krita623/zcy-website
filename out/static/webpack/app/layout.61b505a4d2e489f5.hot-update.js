"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("app/layout",{

/***/ "(app-pages-browser)/./site.config.js":
/*!************************!*\
  !*** ./site.config.js ***!
  \************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

eval(__webpack_require__.ts("/**\r\n * 网站配置文件\r\n * 所有网站的配置信息都集中在这里，方便修改\r\n */ \nconst siteConfig = {\n    // 网站基本信息\n    title: \"算法题解\",\n    description: \"算法题目与详细解答的个人网站\",\n    author: \"算法爱好者\",\n    siteUrl: \"https://Krita623.github.io/github-website\",\n    // 社交链接\n    social: {\n        github: \"https://github.com/yourusername\"\n    },\n    // 导航链接\n    navLinks: [\n        {\n            href: \"/\",\n            label: \"首页\"\n        },\n        {\n            href: \"/solutions\",\n            label: \"题解\"\n        },\n        {\n            href: \"/about\",\n            label: \"关于\"\n        }\n    ],\n    // 题解设置\n    solutions: {\n        // 主页显示的题解数量\n        homepageLimit: 6,\n        // 题解文件夹路径\n        contentPath: \"content/solutions\",\n        // 题解难度级别及对应颜色\n        difficultyLevels: {\n            easy: {\n                label: \"简单\",\n                color: \"#4ade80\"\n            },\n            medium: {\n                label: \"中等\",\n                color: \"#fb923c\"\n            },\n            hard: {\n                label: \"困难\",\n                color: \"#f87171\"\n            }\n        }\n    },\n    // 管理员 GitHub 用户名列表 (用于鉴权)\n    adminUsers: []\n};\nmodule.exports = siteConfig;\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports signature on update so we can compare the boundary\n                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)\n                module.hot.dispose(function (data) {\n                    data.prevSignature =\n                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevSignature !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevSignature !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwcC1wYWdlcy1icm93c2VyKS8uL3NpdGUuY29uZmlnLmpzIiwibWFwcGluZ3MiOiJBQUFBOzs7Q0FHQztBQUNELE1BQU1BLGFBQWE7SUFDakIsU0FBUztJQUNUQyxPQUFPO0lBQ1BDLGFBQWE7SUFDYkMsUUFBUTtJQUNSQyxTQUFTO0lBRVQsT0FBTztJQUNQQyxRQUFRO1FBQ05DLFFBQVE7SUFDVjtJQUVBLE9BQU87SUFDUEMsVUFBVTtRQUNSO1lBQUVDLE1BQU07WUFBS0MsT0FBTztRQUFLO1FBQ3pCO1lBQUVELE1BQU07WUFBY0MsT0FBTztRQUFLO1FBQ2xDO1lBQUVELE1BQU07WUFBVUMsT0FBTztRQUFLO0tBQy9CO0lBRUQsT0FBTztJQUNQQyxXQUFXO1FBQ1QsWUFBWTtRQUNaQyxlQUFlO1FBQ2YsVUFBVTtRQUNWQyxhQUFhO1FBQ2IsY0FBYztRQUNkQyxrQkFBa0I7WUFDaEJDLE1BQU07Z0JBQUVMLE9BQU87Z0JBQU1NLE9BQU87WUFBVTtZQUN0Q0MsUUFBUTtnQkFBRVAsT0FBTztnQkFBTU0sT0FBTztZQUFVO1lBQ3hDRSxNQUFNO2dCQUFFUixPQUFPO2dCQUFNTSxPQUFPO1lBQVU7UUFDeEM7SUFDRjtJQUVBLDBCQUEwQjtJQUMxQkcsWUFBWSxFQUdYO0FBQ0g7QUFFQUMsT0FBT0MsT0FBTyxHQUFHcEIiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9fTl9FLy4vc2l0ZS5jb25maWcuanM/ZmQ5OCJdLCJzb3VyY2VzQ29udGVudCI6WyIvKipcclxuICog572R56uZ6YWN572u5paH5Lu2XHJcbiAqIOaJgOaciee9keermeeahOmFjee9ruS/oeaBr+mDvembhuS4reWcqOi/memHjO+8jOaWueS+v+S/ruaUuVxyXG4gKi9cclxuY29uc3Qgc2l0ZUNvbmZpZyA9IHtcclxuICAvLyDnvZHnq5nln7rmnKzkv6Hmga9cclxuICB0aXRsZTogXCLnrpfms5Xpopjop6NcIixcclxuICBkZXNjcmlwdGlvbjogXCLnrpfms5Xpopjnm67kuI7or6bnu4bop6PnrZTnmoTkuKrkurrnvZHnq5lcIixcclxuICBhdXRob3I6IFwi566X5rOV54ix5aW96ICFXCIsXHJcbiAgc2l0ZVVybDogXCJodHRwczovL0tyaXRhNjIzLmdpdGh1Yi5pby9naXRodWItd2Vic2l0ZVwiLFxyXG4gIFxyXG4gIC8vIOekvuS6pOmTvuaOpVxyXG4gIHNvY2lhbDoge1xyXG4gICAgZ2l0aHViOiBcImh0dHBzOi8vZ2l0aHViLmNvbS95b3VydXNlcm5hbWVcIixcclxuICB9LFxyXG4gIFxyXG4gIC8vIOWvvOiIqumTvuaOpVxyXG4gIG5hdkxpbmtzOiBbXHJcbiAgICB7IGhyZWY6IFwiL1wiLCBsYWJlbDogXCLpppbpobVcIiB9LFxyXG4gICAgeyBocmVmOiBcIi9zb2x1dGlvbnNcIiwgbGFiZWw6IFwi6aKY6KejXCIgfSxcclxuICAgIHsgaHJlZjogXCIvYWJvdXRcIiwgbGFiZWw6IFwi5YWz5LqOXCIgfSxcclxuICBdLFxyXG4gIFxyXG4gIC8vIOmimOino+iuvue9rlxyXG4gIHNvbHV0aW9uczoge1xyXG4gICAgLy8g5Li76aG15pi+56S655qE6aKY6Kej5pWw6YePXHJcbiAgICBob21lcGFnZUxpbWl0OiA2LFxyXG4gICAgLy8g6aKY6Kej5paH5Lu25aS56Lev5b6EXHJcbiAgICBjb250ZW50UGF0aDogXCJjb250ZW50L3NvbHV0aW9uc1wiLFxyXG4gICAgLy8g6aKY6Kej6Zq+5bqm57qn5Yir5Y+K5a+55bqU6aKc6ImyXHJcbiAgICBkaWZmaWN1bHR5TGV2ZWxzOiB7XHJcbiAgICAgIGVhc3k6IHsgbGFiZWw6IFwi566A5Y2VXCIsIGNvbG9yOiBcIiM0YWRlODBcIiB9LFxyXG4gICAgICBtZWRpdW06IHsgbGFiZWw6IFwi5Lit562JXCIsIGNvbG9yOiBcIiNmYjkyM2NcIiB9LFxyXG4gICAgICBoYXJkOiB7IGxhYmVsOiBcIuWbsOmavlwiLCBjb2xvcjogXCIjZjg3MTcxXCIgfSxcclxuICAgIH0sXHJcbiAgfSxcclxuICBcclxuICAvLyDnrqHnkIblkZggR2l0SHViIOeUqOaIt+WQjeWIl+ihqCAo55So5LqO6Ym05p2DKVxyXG4gIGFkbWluVXNlcnM6IFtcclxuICAgIC8vIOWcqOatpOWkhOa3u+WKoOacieadg+mZkOiuv+mXrueuoeeQhuWKn+iDveeahCBHaXRIdWIg55So5oi35ZCNXHJcbiAgICAvLyDkvovlpoI6IFwieW91cmdpdGh1YnVzZXJuYW1lXCJcclxuICBdLFxyXG59O1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBzaXRlQ29uZmlnOyAiXSwibmFtZXMiOlsic2l0ZUNvbmZpZyIsInRpdGxlIiwiZGVzY3JpcHRpb24iLCJhdXRob3IiLCJzaXRlVXJsIiwic29jaWFsIiwiZ2l0aHViIiwibmF2TGlua3MiLCJocmVmIiwibGFiZWwiLCJzb2x1dGlvbnMiLCJob21lcGFnZUxpbWl0IiwiY29udGVudFBhdGgiLCJkaWZmaWN1bHR5TGV2ZWxzIiwiZWFzeSIsImNvbG9yIiwibWVkaXVtIiwiaGFyZCIsImFkbWluVXNlcnMiLCJtb2R1bGUiLCJleHBvcnRzIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(app-pages-browser)/./site.config.js\n"));

/***/ })

});