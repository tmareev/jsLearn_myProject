!function(e){var t={};function n(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(r,o,function(t){return e[t]}.bind(null,o));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=0)}([function(e,t){function n(e,t={},n,r=[]){let o=document.createElement(e);for(let e in t)o.setAttribute(e,t[e]);n&&(o.textContent=n);for(let e=0;e<r.length;e++)o.appendChild(r[e]);return o}function r(){let e=document.getElementById("menuLeft"),t=document.querySelector(".mainRight > .content"),n=function(){let e=0,t="";return function n(r){let o=r.children;for(let r=0;r<o.length;r++){let u=`${"\t".repeat(e)}<${o[r].tagName}> \n`,i=`${"\t".repeat(e)}</${o[r].tagName}> \n`;t+=u,o[r].textContent&&0==o[r].children.length&&(t+="\t".repeat(e+1)+o[r].textContent+"\n"),0!==o[r].children.length&&(++e,n(o[r])),t+=i}return e=1,t}}();return e.textContent=t?n(t):""}function o(e,t){return document.querySelector(e).addEventListener("click",t)}function u(){return document.querySelector(".active")}function i(){return!!u()}function c(){if(i()){let e=u();e.parentElement.removeChild(e),document.getElementById("currentTag").textContent="Current tag: "}}function l(){let e=a();i()&&(u().textContent=e)}function a(){return document.getElementById("textField").value}function d(e){return u().appendChild(n(e,{class:"menuItem"},"DEFAULT TEXT",[]))}function s(){if(i){!function(){let e;for(let t=0;t<u().childNodes.length;t++)if(1==u().childNodes[t].nodeType){e=!0;break}if(!e)u().textContent=""}();let e=a(),t=e+" tag is not allowed. Choose one of: li, div, h1, h2, h3, h4, h5, h6, ul, ol, p";switch(e){case"div":d("div");break;case"p":d("p");break;case"h1":d("h1");break;case"h2":d("h2");break;case"h3":d("h3");break;case"h4":d("h4");break;case"h5":d("h5");break;case"h6":d("h6");break;case"ul":d("ul");break;case"ol":d("ol");break;case"li":d("li");break;default:alert(t)}}}function f(e){return function(){let t=e();return r(),t}}!function(e){let t=document.body,n=t.querySelector("script");t.insertBefore(e,n)}(n("div",{class:"container"},"",[n("div",{class:"mainDiv mainLeft"},"",[n("div",{class:"content",id:"menuLeft"},"",[]),n("div",{class:"footer"},"",[n("div",{class:"footerBox"},"",[n("input",{type:"text",id:"textField",value:""},"",[]),n("button",{class:"button",id:"setText"},"Set text",[]),n("button",{class:"button",id:"createTag"},"Create tag",[]),n("button",{class:"button",id:"remove"},"Remove",[])])])]),n("div",{class:"mainDiv mainRight"},"",[n("div",{class:"content",id:"menuRight"},"",[]),n("div",{class:"footer"},"",[n("div",{class:""},"",[n("h3",{id:"currentTag"},"Current tag: ",[])])])])])),function(){let e=document.getElementById("menuRight");(function(e,t){t.appendChild(e)})(n("div",{class:"menuItem"},"",[n("ul",{class:"menuItem"},"",[n("li",{class:"menuItem"},"hello",[]),n("li",{class:"menuItem"},"world",[])])]),e)}(),r(),o("#menuRight",function(){let e;return function(t){t.target!=e&&i()&&u().classList.remove("active"),t.target.classList.toggle("active"),function(e){if(!u())return document.getElementById("currentTag").textContent="Current tag: ";document.getElementById("currentTag").textContent="Current tag: "+e.tagName}(t.target),e=t.target}}()),c=f(c),l=f(l),s=f(s),o("#remove",c),o("#setText",l),o("#createTag",s)}]);