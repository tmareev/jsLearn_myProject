!function(e){var t={};function n(o){if(t[o])return t[o].exports;var r=t[o]={i:o,l:!1,exports:{}};return e[o].call(r.exports,r,r.exports,n),r.l=!0,r.exports}n.m=e,n.c=t,n.d=function(e,t,o){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:o})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var o=Object.create(null);if(n.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)n.d(o,r,function(t){return e[t]}.bind(null,r));return o},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=0)}([function(e,t){function n(e,t={},n,o=[]){let r=document.createElement(e);for(let e in t)r.setAttribute(e,t[e]);n&&(r.textContent=n);for(let e=0;e<o.length;e++)r.appendChild(o[e]);return r}!function(e){let t=document.body,n=t.querySelector("script");t.insertBefore(e,n)}(n("div",{class:"container"},"",[n("div",{class:"mainDiv mainLeft"},"",[n("div",{class:"content",id:"menuLeft"},"",[]),n("div",{class:"footer"},"",[n("div",{class:"footerBox"},"",[n("input",{id:"textField"},"",[]),n("button",{class:"button",id:"setText"},"Set text",[]),n("button",{class:"button",id:"createTag"},"Create tag",[]),n("button",{class:"button",id:"remove"},"Remove",[])])])]),n("div",{class:"mainDiv mainRight"},"",[n("div",{class:"contentBox"},"",[n("div",{class:"content",id:"menuRight"},"",[])]),n("div",{class:"footer"},"",[n("div",{class:""},"",[n("h3",{id:"currentElement"},"Current tag: ",[])])])])])),function(){let e=document.getElementById("menuRight");(function(e,t){t.appendChild(e)})(n("ul",{class:"menuItem",contenteditable:!0},"",[n("li",{class:"menuItem",contenteditable:!0},"hello",[]),n("li",{class:"menuItem",contenteditable:!0},"world",[])]),e)}(),function(){let e=document.getElementById("menuLeft");e.textContent=document.querySelector(".contentBox").innerHTML}()}]);