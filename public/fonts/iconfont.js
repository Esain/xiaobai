(function(window){var svgSprite='<svg><symbol id="icon-guanbi" viewBox="0 0 1024 1024"><path d="M535.791357 511.653099 915.999752 131.443681c6.661723-6.661723 6.661723-17.454534 0-24.11728-6.661723-6.661723-17.454534-6.661723-24.11728 0L511.674077 487.535819 131.464659 107.327424c-6.661723-6.661723-17.454534-6.661723-24.11728 0-6.661723 6.661723-6.661723 17.454534 0 24.11728L487.556796 511.653099 107.348402 891.861494c-6.661723 6.661723-6.661723 17.454534 0 24.11728 3.330862 3.330862 7.695263 4.996804 12.05864 4.996804s8.727779-1.665942 12.05864-4.996804L511.674077 535.77038l380.208395 380.208395c3.330862 3.330862 7.695263 4.996804 12.05864 4.996804 4.363378 0 8.727779-1.665942 12.05864-4.996804 6.661723-6.661723 6.661723-17.454534 0-24.11728L535.791357 511.653099z"  ></path></symbol><symbol id="icon-youjiantou-copy" viewBox="0 0 1024 1024"><path d="M720.369 511.579l-461.433 461.431c-8.085 8.085-8.085 21.184 0 29.269s21.184 8.085 29.269 0l476.067-476.067c8.085-8.085 8.085-21.184 0-29.269l-476.067-476.067c-4.043-4.043-9.339-6.064-14.636-6.064-5.295 0-10.593 2.021-14.636 6.064-8.085 8.085-8.085 21.184 0 29.269l461.433 461.431z"  ></path></symbol><symbol id="icon-zuojiantou-copy" viewBox="0 0 1024 1024"><path d="M302.838 511.579l461.433-461.433c8.085-8.085 8.085-21.184 0-29.269s-21.184-8.085-29.269 0l-476.068 476.068c-8.085 8.085-8.085 21.184 0 29.269l476.067 476.067c4.043 4.043 9.339 6.064 14.636 6.064s10.594-2.021 14.636-6.064c8.085-8.085 8.085-21.184 0-29.269l-461.431-461.431z"  ></path></symbol></svg>';var script=function(){var scripts=document.getElementsByTagName("script");return scripts[scripts.length-1]}();var shouldInjectCss=script.getAttribute("data-injectcss");var ready=function(fn){if(document.addEventListener){if(~["complete","loaded","interactive"].indexOf(document.readyState)){setTimeout(fn,0)}else{var loadFn=function(){document.removeEventListener("DOMContentLoaded",loadFn,false);fn()};document.addEventListener("DOMContentLoaded",loadFn,false)}}else if(document.attachEvent){IEContentLoaded(window,fn)}function IEContentLoaded(w,fn){var d=w.document,done=false,init=function(){if(!done){done=true;fn()}};var polling=function(){try{d.documentElement.doScroll("left")}catch(e){setTimeout(polling,50);return}init()};polling();d.onreadystatechange=function(){if(d.readyState=="complete"){d.onreadystatechange=null;init()}}}};var before=function(el,target){target.parentNode.insertBefore(el,target)};var prepend=function(el,target){if(target.firstChild){before(el,target.firstChild)}else{target.appendChild(el)}};function appendSvg(){var div,svg;div=document.createElement("div");div.innerHTML=svgSprite;svgSprite=null;svg=div.getElementsByTagName("svg")[0];if(svg){svg.setAttribute("aria-hidden","true");svg.style.position="absolute";svg.style.width=0;svg.style.height=0;svg.style.overflow="hidden";prepend(svg,document.body)}}if(shouldInjectCss&&!window.__iconfont__svg__cssinject__){window.__iconfont__svg__cssinject__=true;try{document.write("<style>.svgfont {display: inline-block;width: 1em;height: 1em;fill: currentColor;vertical-align: -0.1em;font-size:16px;}</style>")}catch(e){console&&console.log(e)}}ready(appendSvg)})(window)