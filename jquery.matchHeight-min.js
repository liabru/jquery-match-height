/*
* jquery-match-height 0.6.0 by @liabru
* http://brm.io/jquery-match-height/
* License MIT
*/
!function(t){"use strict";"function"==typeof define&&define.amd?define(["jquery"],t):"undefined"!=typeof module&&module.exports?module.exports=t(require("jquery")):t(jQuery)}(function(t){var e=-1,o=-1,n=function(t){return parseFloat(t)||0},i=function(e){var o=1,i=t(e),a=null,r=[];return i.each(function(){var e=t(this),i=e.offset().top-n(e.css("margin-top")),s=r.length>0?r[r.length-1]:null;null===s?r.push(e):Math.floor(Math.abs(a-i))<=o?r[r.length-1]=s.add(e):r.push(e),a=i}),r},a=function(e){var o={
byRow:!0,property:"height",target:null,remove:!1};return"object"==typeof e?t.extend(o,e):("boolean"==typeof e?o.byRow=e:"remove"===e&&(o.remove=!0),o)},r=t.fn.matchHeight=function(e){var o=a(e);if(o.remove){var n=this;return this.css(o.property,""),t.each(r._groups,function(t,e){e.elements=e.elements.not(n)}),this}return this.length<=1&&!o.target?this:(r._groups.push({elements:this,options:o}),r._apply(this,o),this)};r.version="0.6.0",r._groups=[],r._throttle=80,r._maintainScroll=!1,r._beforeUpdate=null,
r._afterUpdate=null,r._rows=i,r._parse=n,r._parseOptions=a,r._apply=function(e,o){var s=a(o),h=t(e),c=[h],l=t(window).scrollTop(),p=t("html").outerHeight(!0),u=h.parents().filter(":hidden");return u.each(function(){var e=t(this);e.data("style-cache",e.attr("style"))}),u.css("display","block"),s.byRow&&!s.target&&(h.each(function(){var e=t(this),o=e.css("display");"inline-block"!==o&&"flex"!==o&&"inline-flex"!==o&&(o="block"),e.data("style-cache",e.attr("style")),e.css({display:o,"padding-top":"0",
"padding-bottom":"0","margin-top":"0","margin-bottom":"0","border-top-width":"0","border-bottom-width":"0",height:"100px",overflow:"hidden"})}),c=i(h),h.each(function(){var e=t(this);e.attr("style",e.data("style-cache")||"")})),t.each(c,function(e,o){var i=t(o),a=0;if(s.target)a=s.target.outerHeight(!1);else{if(s.byRow&&i.length<=1)return void i.css(s.property,"");i.each(function(){var e=t(this),o=e.css("display");"inline-block"!==o&&"flex"!==o&&"inline-flex"!==o&&(o="block");var n={display:o};n[s.property]="",
e.css(n),e.outerHeight(!1)>a&&(a=e.outerHeight(!1)),e.css("display","")})}i.each(function(){var e=t(this),o=0;s.target&&e.is(s.target)||("border-box"!==e.css("box-sizing")&&(o+=n(e.css("border-top-width"))+n(e.css("border-bottom-width")),o+=n(e.css("padding-top"))+n(e.css("padding-bottom"))),e.css(s.property,a-o+"px"))})}),u.each(function(){var e=t(this);e.attr("style",e.data("style-cache")||null)}),r._maintainScroll&&t(window).scrollTop(l/p*t("html").outerHeight(!0)),this},r._applyDataApi=function(){
var e={};t("[data-match-height], [data-mh]").each(function(){var o=t(this),n=o.attr("data-mh")||o.attr("data-match-height");n in e?e[n]=e[n].add(o):e[n]=o}),t.each(e,function(){this.matchHeight(!0)})};var s=function(e){r._beforeUpdate&&r._beforeUpdate(e,r._groups),t.each(r._groups,function(){r._apply(this.elements,this.options)}),r._afterUpdate&&r._afterUpdate(e,r._groups)};r._update=function(n,i){if(i&&"resize"===i.type){var a=t(window).width();if(a===e)return;e=a}n?-1===o&&(o=setTimeout(function(){
s(i),o=-1},r._throttle)):s(i)},t(r._applyDataApi),t(window).on("load",function(t){r._update(!1,t)}),t(window).on("resize orientationchange",function(t){r._update(!0,t)})});