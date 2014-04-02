/**
* jquery.matchHeight-min.js v0.5.0
* http://brm.io/jquery-match-height/
* License: MIT
*/
(function(c){c.fn.matchHeight=function(b){if(1>=this.length)return this;b="undefined"!==typeof b?b:!0;c.fn.matchHeight._groups.push({elements:this,byRow:b});c.fn.matchHeight._apply(this,b);return this};c.fn.matchHeight._apply=function(b,d){var a=c(b),e=[a];d&&(a.css({display:"block","padding-top":"0","padding-bottom":"0","border-top":"0","border-bottom":"0",height:"100px"}),e=h(a),a.css({display:"","padding-top":"","padding-bottom":"","border-top":"","border-bottom":"",height:""}));c.each(e,function(a,
b){var d=c(b),e=0;d.each(function(){var a=c(this);a.css({display:"block",height:""});a.outerHeight(!1)>e&&(e=a.outerHeight(!1))});d.each(function(){var a=c(this),b=0;"border-box"!==a.css("box-sizing")&&(b+=parseInt(a.css("border-top-width"),10)+parseInt(a.css("border-bottom-width"),10),b+=parseInt(a.css("padding-top"),10)+parseInt(a.css("padding-bottom"),10));a.css("height",e-b)})});return this};c.fn.matchHeight._applyDataApi=function(){var b={};c("[data-match-height], [data-mh]").each(function(){var d=
c(this),a=d.attr("data-match-height");b[a]=a in b?b[a].add(d):d});c.each(b,function(){this.matchHeight(!0)})};c.fn.matchHeight._groups=[];c.fn.matchHeight._update=function(){c.each(c.fn.matchHeight._groups,function(){c.fn.matchHeight._apply(this.elements,this.byRow)})};c(c.fn.matchHeight._applyDataApi);c(window).bind("load resize orientationchange",c.fn.matchHeight._update);var h=function(b){var d=null,a=[];c(b).each(function(){var b=c(this),f=b.offset().top-parseInt(b.css("margin-top"),10),g=0<a.length?
a[a.length-1]:null;null===g?a.push(b):1>=Math.floor(Math.abs(d-f))?a[a.length-1]=g.add(b):a.push(b);d=f});return a}})(jQuery);
