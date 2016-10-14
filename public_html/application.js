/*! jQuery v2.1.4 | (c) 2005, 2015 jQuery Foundation, Inc. | jquery.org/license */
!function(a,b){"object"==typeof module&&"object"==typeof module.exports?module.exports=a.document?b(a,!0):function(a){if(!a.document)throw new Error("jQuery requires a window with a document");return b(a)}:b(a)}("undefined"!=typeof window?window:this,function(a,b){var c=[],d=c.slice,e=c.concat,f=c.push,g=c.indexOf,h={},i=h.toString,j=h.hasOwnProperty,k={},l=a.document,m="2.1.4",n=function(a,b){return new n.fn.init(a,b)},o=/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,p=/^-ms-/,q=/-([\da-z])/gi,r=function(a,b){return b.toUpperCase()};n.fn=n.prototype={jquery:m,constructor:n,selector:"",length:0,toArray:function(){return d.call(this)},get:function(a){return null!=a?0>a?this[a+this.length]:this[a]:d.call(this)},pushStack:function(a){var b=n.merge(this.constructor(),a);return b.prevObject=this,b.context=this.context,b},each:function(a,b){return n.each(this,a,b)},map:function(a){return this.pushStack(n.map(this,function(b,c){return a.call(b,c,b)}))},slice:function(){return this.pushStack(d.apply(this,arguments))},first:function(){return this.eq(0)},last:function(){return this.eq(-1)},eq:function(a){var b=this.length,c=+a+(0>a?b:0);return this.pushStack(c>=0&&b>c?[this[c]]:[])},end:function(){return this.prevObject||this.constructor(null)},push:f,sort:c.sort,splice:c.splice},n.extend=n.fn.extend=function(){var a,b,c,d,e,f,g=arguments[0]||{},h=1,i=arguments.length,j=!1;for("boolean"==typeof g&&(j=g,g=arguments[h]||{},h++),"object"==typeof g||n.isFunction(g)||(g={}),h===i&&(g=this,h--);i>h;h++)if(null!=(a=arguments[h]))for(b in a)c=g[b],d=a[b],g!==d&&(j&&d&&(n.isPlainObject(d)||(e=n.isArray(d)))?(e?(e=!1,f=c&&n.isArray(c)?c:[]):f=c&&n.isPlainObject(c)?c:{},g[b]=n.extend(j,f,d)):void 0!==d&&(g[b]=d));return g},n.extend({expando:"jQuery"+(m+Math.random()).replace(/\D/g,""),isReady:!0,error:function(a){throw new Error(a)},noop:function(){},isFunction:function(a){return"function"===n.type(a)},isArray:Array.isArray,isWindow:function(a){return null!=a&&a===a.window},isNumeric:function(a){return!n.isArray(a)&&a-parseFloat(a)+1>=0},isPlainObject:function(a){return"object"!==n.type(a)||a.nodeType||n.isWindow(a)?!1:a.constructor&&!j.call(a.constructor.prototype,"isPrototypeOf")?!1:!0},isEmptyObject:function(a){var b;for(b in a)return!1;return!0},type:function(a){return null==a?a+"":"object"==typeof a||"function"==typeof a?h[i.call(a)]||"object":typeof a},globalEval:function(a){var b,c=eval;a=n.trim(a),a&&(1===a.indexOf("use strict")?(b=l.createElement("script"),b.text=a,l.head.appendChild(b).parentNode.removeChild(b)):c(a))},camelCase:function(a){return a.replace(p,"ms-").replace(q,r)},nodeName:function(a,b){return a.nodeName&&a.nodeName.toLowerCase()===b.toLowerCase()},each:function(a,b,c){var d,e=0,f=a.length,g=s(a);if(c){if(g){for(;f>e;e++)if(d=b.apply(a[e],c),d===!1)break}else for(e in a)if(d=b.apply(a[e],c),d===!1)break}else if(g){for(;f>e;e++)if(d=b.call(a[e],e,a[e]),d===!1)break}else for(e in a)if(d=b.call(a[e],e,a[e]),d===!1)break;return a},trim:function(a){return null==a?"":(a+"").replace(o,"")},makeArray:function(a,b){var c=b||[];return null!=a&&(s(Object(a))?n.merge(c,"string"==typeof a?[a]:a):f.call(c,a)),c},inArray:function(a,b,c){return null==b?-1:g.call(b,a,c)},merge:function(a,b){for(var c=+b.length,d=0,e=a.length;c>d;d++)a[e++]=b[d];return a.length=e,a},grep:function(a,b,c){for(var d,e=[],f=0,g=a.length,h=!c;g>f;f++)d=!b(a[f],f),d!==h&&e.push(a[f]);return e},map:function(a,b,c){var d,f=0,g=a.length,h=s(a),i=[];if(h)for(;g>f;f++)d=b(a[f],f,c),null!=d&&i.push(d);else for(f in a)d=b(a[f],f,c),null!=d&&i.push(d);return e.apply([],i)},guid:1,proxy:function(a,b){var c,e,f;return"string"==typeof b&&(c=a[b],b=a,a=c),n.isFunction(a)?(e=d.call(arguments,2),f=function(){return a.apply(b||this,e.concat(d.call(arguments)))},f.guid=a.guid=a.guid||n.guid++,f):void 0},now:Date.now,support:k}),n.each("Boolean Number String Function Array Date RegExp Object Error".split(" "),function(a,b){h["[object "+b+"]"]=b.toLowerCase()});function s(a){var b="length"in a&&a.length,c=n.type(a);return"function"===c||n.isWindow(a)?!1:1===a.nodeType&&b?!0:"array"===c||0===b||"number"==typeof b&&b>0&&b-1 in a}var t=function(a){var b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u="sizzle"+1*new Date,v=a.document,w=0,x=0,y=ha(),z=ha(),A=ha(),B=function(a,b){return a===b&&(l=!0),0},C=1<<31,D={}.hasOwnProperty,E=[],F=E.pop,G=E.push,H=E.push,I=E.slice,J=function(a,b){for(var c=0,d=a.length;d>c;c++)if(a[c]===b)return c;return-1},K="checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",L="[\\x20\\t\\r\\n\\f]",M="(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",N=M.replace("w","w#"),O="\\["+L+"*("+M+")(?:"+L+"*([*^$|!~]?=)"+L+"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|("+N+"))|)"+L+"*\\]",P=":("+M+")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|"+O+")*)|.*)\\)|)",Q=new RegExp(L+"+","g"),R=new RegExp("^"+L+"+|((?:^|[^\\\\])(?:\\\\.)*)"+L+"+$","g"),S=new RegExp("^"+L+"*,"+L+"*"),T=new RegExp("^"+L+"*([>+~]|"+L+")"+L+"*"),U=new RegExp("="+L+"*([^\\]'\"]*?)"+L+"*\\]","g"),V=new RegExp(P),W=new RegExp("^"+N+"$"),X={ID:new RegExp("^#("+M+")"),CLASS:new RegExp("^\\.("+M+")"),TAG:new RegExp("^("+M.replace("w","w*")+")"),ATTR:new RegExp("^"+O),PSEUDO:new RegExp("^"+P),CHILD:new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\("+L+"*(even|odd|(([+-]|)(\\d*)n|)"+L+"*(?:([+-]|)"+L+"*(\\d+)|))"+L+"*\\)|)","i"),bool:new RegExp("^(?:"+K+")$","i"),needsContext:new RegExp("^"+L+"*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\("+L+"*((?:-\\d)?\\d*)"+L+"*\\)|)(?=[^-]|$)","i")},Y=/^(?:input|select|textarea|button)$/i,Z=/^h\d$/i,$=/^[^{]+\{\s*\[native \w/,_=/^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,aa=/[+~]/,ba=/'|\\/g,ca=new RegExp("\\\\([\\da-f]{1,6}"+L+"?|("+L+")|.)","ig"),da=function(a,b,c){var d="0x"+b-65536;return d!==d||c?b:0>d?String.fromCharCode(d+65536):String.fromCharCode(d>>10|55296,1023&d|56320)},ea=function(){m()};try{H.apply(E=I.call(v.childNodes),v.childNodes),E[v.childNodes.length].nodeType}catch(fa){H={apply:E.length?function(a,b){G.apply(a,I.call(b))}:function(a,b){var c=a.length,d=0;while(a[c++]=b[d++]);a.length=c-1}}}function ga(a,b,d,e){var f,h,j,k,l,o,r,s,w,x;if((b?b.ownerDocument||b:v)!==n&&m(b),b=b||n,d=d||[],k=b.nodeType,"string"!=typeof a||!a||1!==k&&9!==k&&11!==k)return d;if(!e&&p){if(11!==k&&(f=_.exec(a)))if(j=f[1]){if(9===k){if(h=b.getElementById(j),!h||!h.parentNode)return d;if(h.id===j)return d.push(h),d}else if(b.ownerDocument&&(h=b.ownerDocument.getElementById(j))&&t(b,h)&&h.id===j)return d.push(h),d}else{if(f[2])return H.apply(d,b.getElementsByTagName(a)),d;if((j=f[3])&&c.getElementsByClassName)return H.apply(d,b.getElementsByClassName(j)),d}if(c.qsa&&(!q||!q.test(a))){if(s=r=u,w=b,x=1!==k&&a,1===k&&"object"!==b.nodeName.toLowerCase()){o=g(a),(r=b.getAttribute("id"))?s=r.replace(ba,"\\$&"):b.setAttribute("id",s),s="[id='"+s+"'] ",l=o.length;while(l--)o[l]=s+ra(o[l]);w=aa.test(a)&&pa(b.parentNode)||b,x=o.join(",")}if(x)try{return H.apply(d,w.querySelectorAll(x)),d}catch(y){}finally{r||b.removeAttribute("id")}}}return i(a.replace(R,"$1"),b,d,e)}function ha(){var a=[];function b(c,e){return a.push(c+" ")>d.cacheLength&&delete b[a.shift()],b[c+" "]=e}return b}function ia(a){return a[u]=!0,a}function ja(a){var b=n.createElement("div");try{return!!a(b)}catch(c){return!1}finally{b.parentNode&&b.parentNode.removeChild(b),b=null}}function ka(a,b){var c=a.split("|"),e=a.length;while(e--)d.attrHandle[c[e]]=b}function la(a,b){var c=b&&a,d=c&&1===a.nodeType&&1===b.nodeType&&(~b.sourceIndex||C)-(~a.sourceIndex||C);if(d)return d;if(c)while(c=c.nextSibling)if(c===b)return-1;return a?1:-1}function ma(a){return function(b){var c=b.nodeName.toLowerCase();return"input"===c&&b.type===a}}function na(a){return function(b){var c=b.nodeName.toLowerCase();return("input"===c||"button"===c)&&b.type===a}}function oa(a){return ia(function(b){return b=+b,ia(function(c,d){var e,f=a([],c.length,b),g=f.length;while(g--)c[e=f[g]]&&(c[e]=!(d[e]=c[e]))})})}function pa(a){return a&&"undefined"!=typeof a.getElementsByTagName&&a}c=ga.support={},f=ga.isXML=function(a){var b=a&&(a.ownerDocument||a).documentElement;return b?"HTML"!==b.nodeName:!1},m=ga.setDocument=function(a){var b,e,g=a?a.ownerDocument||a:v;return g!==n&&9===g.nodeType&&g.documentElement?(n=g,o=g.documentElement,e=g.defaultView,e&&e!==e.top&&(e.addEventListener?e.addEventListener("unload",ea,!1):e.attachEvent&&e.attachEvent("onunload",ea)),p=!f(g),c.attributes=ja(function(a){return a.className="i",!a.getAttribute("className")}),c.getElementsByTagName=ja(function(a){return a.appendChild(g.createComment("")),!a.getElementsByTagName("*").length}),c.getElementsByClassName=$.test(g.getElementsByClassName),c.getById=ja(function(a){return o.appendChild(a).id=u,!g.getElementsByName||!g.getElementsByName(u).length}),c.getById?(d.find.ID=function(a,b){if("undefined"!=typeof b.getElementById&&p){var c=b.getElementById(a);return c&&c.parentNode?[c]:[]}},d.filter.ID=function(a){var b=a.replace(ca,da);return function(a){return a.getAttribute("id")===b}}):(delete d.find.ID,d.filter.ID=function(a){var b=a.replace(ca,da);return function(a){var c="undefined"!=typeof a.getAttributeNode&&a.getAttributeNode("id");return c&&c.value===b}}),d.find.TAG=c.getElementsByTagName?function(a,b){return"undefined"!=typeof b.getElementsByTagName?b.getElementsByTagName(a):c.qsa?b.querySelectorAll(a):void 0}:function(a,b){var c,d=[],e=0,f=b.getElementsByTagName(a);if("*"===a){while(c=f[e++])1===c.nodeType&&d.push(c);return d}return f},d.find.CLASS=c.getElementsByClassName&&function(a,b){return p?b.getElementsByClassName(a):void 0},r=[],q=[],(c.qsa=$.test(g.querySelectorAll))&&(ja(function(a){o.appendChild(a).innerHTML="<a id='"+u+"'></a><select id='"+u+"-\f]' msallowcapture=''><option selected=''></option></select>",a.querySelectorAll("[msallowcapture^='']").length&&q.push("[*^$]="+L+"*(?:''|\"\")"),a.querySelectorAll("[selected]").length||q.push("\\["+L+"*(?:value|"+K+")"),a.querySelectorAll("[id~="+u+"-]").length||q.push("~="),a.querySelectorAll(":checked").length||q.push(":checked"),a.querySelectorAll("a#"+u+"+*").length||q.push(".#.+[+~]")}),ja(function(a){var b=g.createElement("input");b.setAttribute("type","hidden"),a.appendChild(b).setAttribute("name","D"),a.querySelectorAll("[name=d]").length&&q.push("name"+L+"*[*^$|!~]?="),a.querySelectorAll(":enabled").length||q.push(":enabled",":disabled"),a.querySelectorAll("*,:x"),q.push(",.*:")})),(c.matchesSelector=$.test(s=o.matches||o.webkitMatchesSelector||o.mozMatchesSelector||o.oMatchesSelector||o.msMatchesSelector))&&ja(function(a){c.disconnectedMatch=s.call(a,"div"),s.call(a,"[s!='']:x"),r.push("!=",P)}),q=q.length&&new RegExp(q.join("|")),r=r.length&&new RegExp(r.join("|")),b=$.test(o.compareDocumentPosition),t=b||$.test(o.contains)?function(a,b){var c=9===a.nodeType?a.documentElement:a,d=b&&b.parentNode;return a===d||!(!d||1!==d.nodeType||!(c.contains?c.contains(d):a.compareDocumentPosition&&16&a.compareDocumentPosition(d)))}:function(a,b){if(b)while(b=b.parentNode)if(b===a)return!0;return!1},B=b?function(a,b){if(a===b)return l=!0,0;var d=!a.compareDocumentPosition-!b.compareDocumentPosition;return d?d:(d=(a.ownerDocument||a)===(b.ownerDocument||b)?a.compareDocumentPosition(b):1,1&d||!c.sortDetached&&b.compareDocumentPosition(a)===d?a===g||a.ownerDocument===v&&t(v,a)?-1:b===g||b.ownerDocument===v&&t(v,b)?1:k?J(k,a)-J(k,b):0:4&d?-1:1)}:function(a,b){if(a===b)return l=!0,0;var c,d=0,e=a.parentNode,f=b.parentNode,h=[a],i=[b];if(!e||!f)return a===g?-1:b===g?1:e?-1:f?1:k?J(k,a)-J(k,b):0;if(e===f)return la(a,b);c=a;while(c=c.parentNode)h.unshift(c);c=b;while(c=c.parentNode)i.unshift(c);while(h[d]===i[d])d++;return d?la(h[d],i[d]):h[d]===v?-1:i[d]===v?1:0},g):n},ga.matches=function(a,b){return ga(a,null,null,b)},ga.matchesSelector=function(a,b){if((a.ownerDocument||a)!==n&&m(a),b=b.replace(U,"='$1']"),!(!c.matchesSelector||!p||r&&r.test(b)||q&&q.test(b)))try{var d=s.call(a,b);if(d||c.disconnectedMatch||a.document&&11!==a.document.nodeType)return d}catch(e){}return ga(b,n,null,[a]).length>0},ga.contains=function(a,b){return(a.ownerDocument||a)!==n&&m(a),t(a,b)},ga.attr=function(a,b){(a.ownerDocument||a)!==n&&m(a);var e=d.attrHandle[b.toLowerCase()],f=e&&D.call(d.attrHandle,b.toLowerCase())?e(a,b,!p):void 0;return void 0!==f?f:c.attributes||!p?a.getAttribute(b):(f=a.getAttributeNode(b))&&f.specified?f.value:null},ga.error=function(a){throw new Error("Syntax error, unrecognized expression: "+a)},ga.uniqueSort=function(a){var b,d=[],e=0,f=0;if(l=!c.detectDuplicates,k=!c.sortStable&&a.slice(0),a.sort(B),l){while(b=a[f++])b===a[f]&&(e=d.push(f));while(e--)a.splice(d[e],1)}return k=null,a},e=ga.getText=function(a){var b,c="",d=0,f=a.nodeType;if(f){if(1===f||9===f||11===f){if("string"==typeof a.textContent)return a.textContent;for(a=a.firstChild;a;a=a.nextSibling)c+=e(a)}else if(3===f||4===f)return a.nodeValue}else while(b=a[d++])c+=e(b);return c},d=ga.selectors={cacheLength:50,createPseudo:ia,match:X,attrHandle:{},find:{},relative:{">":{dir:"parentNode",first:!0}," ":{dir:"parentNode"},"+":{dir:"previousSibling",first:!0},"~":{dir:"previousSibling"}},preFilter:{ATTR:function(a){return a[1]=a[1].replace(ca,da),a[3]=(a[3]||a[4]||a[5]||"").replace(ca,da),"~="===a[2]&&(a[3]=" "+a[3]+" "),a.slice(0,4)},CHILD:function(a){return a[1]=a[1].toLowerCase(),"nth"===a[1].slice(0,3)?(a[3]||ga.error(a[0]),a[4]=+(a[4]?a[5]+(a[6]||1):2*("even"===a[3]||"odd"===a[3])),a[5]=+(a[7]+a[8]||"odd"===a[3])):a[3]&&ga.error(a[0]),a},PSEUDO:function(a){var b,c=!a[6]&&a[2];return X.CHILD.test(a[0])?null:(a[3]?a[2]=a[4]||a[5]||"":c&&V.test(c)&&(b=g(c,!0))&&(b=c.indexOf(")",c.length-b)-c.length)&&(a[0]=a[0].slice(0,b),a[2]=c.slice(0,b)),a.slice(0,3))}},filter:{TAG:function(a){var b=a.replace(ca,da).toLowerCase();return"*"===a?function(){return!0}:function(a){return a.nodeName&&a.nodeName.toLowerCase()===b}},CLASS:function(a){var b=y[a+" "];return b||(b=new RegExp("(^|"+L+")"+a+"("+L+"|$)"))&&y(a,function(a){return b.test("string"==typeof a.className&&a.className||"undefined"!=typeof a.getAttribute&&a.getAttribute("class")||"")})},ATTR:function(a,b,c){return function(d){var e=ga.attr(d,a);return null==e?"!="===b:b?(e+="","="===b?e===c:"!="===b?e!==c:"^="===b?c&&0===e.indexOf(c):"*="===b?c&&e.indexOf(c)>-1:"$="===b?c&&e.slice(-c.length)===c:"~="===b?(" "+e.replace(Q," ")+" ").indexOf(c)>-1:"|="===b?e===c||e.slice(0,c.length+1)===c+"-":!1):!0}},CHILD:function(a,b,c,d,e){var f="nth"!==a.slice(0,3),g="last"!==a.slice(-4),h="of-type"===b;return 1===d&&0===e?function(a){return!!a.parentNode}:function(b,c,i){var j,k,l,m,n,o,p=f!==g?"nextSibling":"previousSibling",q=b.parentNode,r=h&&b.nodeName.toLowerCase(),s=!i&&!h;if(q){if(f){while(p){l=b;while(l=l[p])if(h?l.nodeName.toLowerCase()===r:1===l.nodeType)return!1;o=p="only"===a&&!o&&"nextSibling"}return!0}if(o=[g?q.firstChild:q.lastChild],g&&s){k=q[u]||(q[u]={}),j=k[a]||[],n=j[0]===w&&j[1],m=j[0]===w&&j[2],l=n&&q.childNodes[n];while(l=++n&&l&&l[p]||(m=n=0)||o.pop())if(1===l.nodeType&&++m&&l===b){k[a]=[w,n,m];break}}else if(s&&(j=(b[u]||(b[u]={}))[a])&&j[0]===w)m=j[1];else while(l=++n&&l&&l[p]||(m=n=0)||o.pop())if((h?l.nodeName.toLowerCase()===r:1===l.nodeType)&&++m&&(s&&((l[u]||(l[u]={}))[a]=[w,m]),l===b))break;return m-=e,m===d||m%d===0&&m/d>=0}}},PSEUDO:function(a,b){var c,e=d.pseudos[a]||d.setFilters[a.toLowerCase()]||ga.error("unsupported pseudo: "+a);return e[u]?e(b):e.length>1?(c=[a,a,"",b],d.setFilters.hasOwnProperty(a.toLowerCase())?ia(function(a,c){var d,f=e(a,b),g=f.length;while(g--)d=J(a,f[g]),a[d]=!(c[d]=f[g])}):function(a){return e(a,0,c)}):e}},pseudos:{not:ia(function(a){var b=[],c=[],d=h(a.replace(R,"$1"));return d[u]?ia(function(a,b,c,e){var f,g=d(a,null,e,[]),h=a.length;while(h--)(f=g[h])&&(a[h]=!(b[h]=f))}):function(a,e,f){return b[0]=a,d(b,null,f,c),b[0]=null,!c.pop()}}),has:ia(function(a){return function(b){return ga(a,b).length>0}}),contains:ia(function(a){return a=a.replace(ca,da),function(b){return(b.textContent||b.innerText||e(b)).indexOf(a)>-1}}),lang:ia(function(a){return W.test(a||"")||ga.error("unsupported lang: "+a),a=a.replace(ca,da).toLowerCase(),function(b){var c;do if(c=p?b.lang:b.getAttribute("xml:lang")||b.getAttribute("lang"))return c=c.toLowerCase(),c===a||0===c.indexOf(a+"-");while((b=b.parentNode)&&1===b.nodeType);return!1}}),target:function(b){var c=a.location&&a.location.hash;return c&&c.slice(1)===b.id},root:function(a){return a===o},focus:function(a){return a===n.activeElement&&(!n.hasFocus||n.hasFocus())&&!!(a.type||a.href||~a.tabIndex)},enabled:function(a){return a.disabled===!1},disabled:function(a){return a.disabled===!0},checked:function(a){var b=a.nodeName.toLowerCase();return"input"===b&&!!a.checked||"option"===b&&!!a.selected},selected:function(a){return a.parentNode&&a.parentNode.selectedIndex,a.selected===!0},empty:function(a){for(a=a.firstChild;a;a=a.nextSibling)if(a.nodeType<6)return!1;return!0},parent:function(a){return!d.pseudos.empty(a)},header:function(a){return Z.test(a.nodeName)},input:function(a){return Y.test(a.nodeName)},button:function(a){var b=a.nodeName.toLowerCase();return"input"===b&&"button"===a.type||"button"===b},text:function(a){var b;return"input"===a.nodeName.toLowerCase()&&"text"===a.type&&(null==(b=a.getAttribute("type"))||"text"===b.toLowerCase())},first:oa(function(){return[0]}),last:oa(function(a,b){return[b-1]}),eq:oa(function(a,b,c){return[0>c?c+b:c]}),even:oa(function(a,b){for(var c=0;b>c;c+=2)a.push(c);return a}),odd:oa(function(a,b){for(var c=1;b>c;c+=2)a.push(c);return a}),lt:oa(function(a,b,c){for(var d=0>c?c+b:c;--d>=0;)a.push(d);return a}),gt:oa(function(a,b,c){for(var d=0>c?c+b:c;++d<b;)a.push(d);return a})}},d.pseudos.nth=d.pseudos.eq;for(b in{radio:!0,checkbox:!0,file:!0,password:!0,image:!0})d.pseudos[b]=ma(b);for(b in{submit:!0,reset:!0})d.pseudos[b]=na(b);function qa(){}qa.prototype=d.filters=d.pseudos,d.setFilters=new qa,g=ga.tokenize=function(a,b){var c,e,f,g,h,i,j,k=z[a+" "];if(k)return b?0:k.slice(0);h=a,i=[],j=d.preFilter;while(h){(!c||(e=S.exec(h)))&&(e&&(h=h.slice(e[0].length)||h),i.push(f=[])),c=!1,(e=T.exec(h))&&(c=e.shift(),f.push({value:c,type:e[0].replace(R," ")}),h=h.slice(c.length));for(g in d.filter)!(e=X[g].exec(h))||j[g]&&!(e=j[g](e))||(c=e.shift(),f.push({value:c,type:g,matches:e}),h=h.slice(c.length));if(!c)break}return b?h.length:h?ga.error(a):z(a,i).slice(0)};function ra(a){for(var b=0,c=a.length,d="";c>b;b++)d+=a[b].value;return d}function sa(a,b,c){var d=b.dir,e=c&&"parentNode"===d,f=x++;return b.first?function(b,c,f){while(b=b[d])if(1===b.nodeType||e)return a(b,c,f)}:function(b,c,g){var h,i,j=[w,f];if(g){while(b=b[d])if((1===b.nodeType||e)&&a(b,c,g))return!0}else while(b=b[d])if(1===b.nodeType||e){if(i=b[u]||(b[u]={}),(h=i[d])&&h[0]===w&&h[1]===f)return j[2]=h[2];if(i[d]=j,j[2]=a(b,c,g))return!0}}}function ta(a){return a.length>1?function(b,c,d){var e=a.length;while(e--)if(!a[e](b,c,d))return!1;return!0}:a[0]}function ua(a,b,c){for(var d=0,e=b.length;e>d;d++)ga(a,b[d],c);return c}function va(a,b,c,d,e){for(var f,g=[],h=0,i=a.length,j=null!=b;i>h;h++)(f=a[h])&&(!c||c(f,d,e))&&(g.push(f),j&&b.push(h));return g}function wa(a,b,c,d,e,f){return d&&!d[u]&&(d=wa(d)),e&&!e[u]&&(e=wa(e,f)),ia(function(f,g,h,i){var j,k,l,m=[],n=[],o=g.length,p=f||ua(b||"*",h.nodeType?[h]:h,[]),q=!a||!f&&b?p:va(p,m,a,h,i),r=c?e||(f?a:o||d)?[]:g:q;if(c&&c(q,r,h,i),d){j=va(r,n),d(j,[],h,i),k=j.length;while(k--)(l=j[k])&&(r[n[k]]=!(q[n[k]]=l))}if(f){if(e||a){if(e){j=[],k=r.length;while(k--)(l=r[k])&&j.push(q[k]=l);e(null,r=[],j,i)}k=r.length;while(k--)(l=r[k])&&(j=e?J(f,l):m[k])>-1&&(f[j]=!(g[j]=l))}}else r=va(r===g?r.splice(o,r.length):r),e?e(null,g,r,i):H.apply(g,r)})}function xa(a){for(var b,c,e,f=a.length,g=d.relative[a[0].type],h=g||d.relative[" "],i=g?1:0,k=sa(function(a){return a===b},h,!0),l=sa(function(a){return J(b,a)>-1},h,!0),m=[function(a,c,d){var e=!g&&(d||c!==j)||((b=c).nodeType?k(a,c,d):l(a,c,d));return b=null,e}];f>i;i++)if(c=d.relative[a[i].type])m=[sa(ta(m),c)];else{if(c=d.filter[a[i].type].apply(null,a[i].matches),c[u]){for(e=++i;f>e;e++)if(d.relative[a[e].type])break;return wa(i>1&&ta(m),i>1&&ra(a.slice(0,i-1).concat({value:" "===a[i-2].type?"*":""})).replace(R,"$1"),c,e>i&&xa(a.slice(i,e)),f>e&&xa(a=a.slice(e)),f>e&&ra(a))}m.push(c)}return ta(m)}function ya(a,b){var c=b.length>0,e=a.length>0,f=function(f,g,h,i,k){var l,m,o,p=0,q="0",r=f&&[],s=[],t=j,u=f||e&&d.find.TAG("*",k),v=w+=null==t?1:Math.random()||.1,x=u.length;for(k&&(j=g!==n&&g);q!==x&&null!=(l=u[q]);q++){if(e&&l){m=0;while(o=a[m++])if(o(l,g,h)){i.push(l);break}k&&(w=v)}c&&((l=!o&&l)&&p--,f&&r.push(l))}if(p+=q,c&&q!==p){m=0;while(o=b[m++])o(r,s,g,h);if(f){if(p>0)while(q--)r[q]||s[q]||(s[q]=F.call(i));s=va(s)}H.apply(i,s),k&&!f&&s.length>0&&p+b.length>1&&ga.uniqueSort(i)}return k&&(w=v,j=t),r};return c?ia(f):f}return h=ga.compile=function(a,b){var c,d=[],e=[],f=A[a+" "];if(!f){b||(b=g(a)),c=b.length;while(c--)f=xa(b[c]),f[u]?d.push(f):e.push(f);f=A(a,ya(e,d)),f.selector=a}return f},i=ga.select=function(a,b,e,f){var i,j,k,l,m,n="function"==typeof a&&a,o=!f&&g(a=n.selector||a);if(e=e||[],1===o.length){if(j=o[0]=o[0].slice(0),j.length>2&&"ID"===(k=j[0]).type&&c.getById&&9===b.nodeType&&p&&d.relative[j[1].type]){if(b=(d.find.ID(k.matches[0].replace(ca,da),b)||[])[0],!b)return e;n&&(b=b.parentNode),a=a.slice(j.shift().value.length)}i=X.needsContext.test(a)?0:j.length;while(i--){if(k=j[i],d.relative[l=k.type])break;if((m=d.find[l])&&(f=m(k.matches[0].replace(ca,da),aa.test(j[0].type)&&pa(b.parentNode)||b))){if(j.splice(i,1),a=f.length&&ra(j),!a)return H.apply(e,f),e;break}}}return(n||h(a,o))(f,b,!p,e,aa.test(a)&&pa(b.parentNode)||b),e},c.sortStable=u.split("").sort(B).join("")===u,c.detectDuplicates=!!l,m(),c.sortDetached=ja(function(a){return 1&a.compareDocumentPosition(n.createElement("div"))}),ja(function(a){return a.innerHTML="<a href='#'></a>","#"===a.firstChild.getAttribute("href")})||ka("type|href|height|width",function(a,b,c){return c?void 0:a.getAttribute(b,"type"===b.toLowerCase()?1:2)}),c.attributes&&ja(function(a){return a.innerHTML="<input/>",a.firstChild.setAttribute("value",""),""===a.firstChild.getAttribute("value")})||ka("value",function(a,b,c){return c||"input"!==a.nodeName.toLowerCase()?void 0:a.defaultValue}),ja(function(a){return null==a.getAttribute("disabled")})||ka(K,function(a,b,c){var d;return c?void 0:a[b]===!0?b.toLowerCase():(d=a.getAttributeNode(b))&&d.specified?d.value:null}),ga}(a);n.find=t,n.expr=t.selectors,n.expr[":"]=n.expr.pseudos,n.unique=t.uniqueSort,n.text=t.getText,n.isXMLDoc=t.isXML,n.contains=t.contains;var u=n.expr.match.needsContext,v=/^<(\w+)\s*\/?>(?:<\/\1>|)$/,w=/^.[^:#\[\.,]*$/;function x(a,b,c){if(n.isFunction(b))return n.grep(a,function(a,d){return!!b.call(a,d,a)!==c});if(b.nodeType)return n.grep(a,function(a){return a===b!==c});if("string"==typeof b){if(w.test(b))return n.filter(b,a,c);b=n.filter(b,a)}return n.grep(a,function(a){return g.call(b,a)>=0!==c})}n.filter=function(a,b,c){var d=b[0];return c&&(a=":not("+a+")"),1===b.length&&1===d.nodeType?n.find.matchesSelector(d,a)?[d]:[]:n.find.matches(a,n.grep(b,function(a){return 1===a.nodeType}))},n.fn.extend({find:function(a){var b,c=this.length,d=[],e=this;if("string"!=typeof a)return this.pushStack(n(a).filter(function(){for(b=0;c>b;b++)if(n.contains(e[b],this))return!0}));for(b=0;c>b;b++)n.find(a,e[b],d);return d=this.pushStack(c>1?n.unique(d):d),d.selector=this.selector?this.selector+" "+a:a,d},filter:function(a){return this.pushStack(x(this,a||[],!1))},not:function(a){return this.pushStack(x(this,a||[],!0))},is:function(a){return!!x(this,"string"==typeof a&&u.test(a)?n(a):a||[],!1).length}});var y,z=/^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,A=n.fn.init=function(a,b){var c,d;if(!a)return this;if("string"==typeof a){if(c="<"===a[0]&&">"===a[a.length-1]&&a.length>=3?[null,a,null]:z.exec(a),!c||!c[1]&&b)return!b||b.jquery?(b||y).find(a):this.constructor(b).find(a);if(c[1]){if(b=b instanceof n?b[0]:b,n.merge(this,n.parseHTML(c[1],b&&b.nodeType?b.ownerDocument||b:l,!0)),v.test(c[1])&&n.isPlainObject(b))for(c in b)n.isFunction(this[c])?this[c](b[c]):this.attr(c,b[c]);return this}return d=l.getElementById(c[2]),d&&d.parentNode&&(this.length=1,this[0]=d),this.context=l,this.selector=a,this}return a.nodeType?(this.context=this[0]=a,this.length=1,this):n.isFunction(a)?"undefined"!=typeof y.ready?y.ready(a):a(n):(void 0!==a.selector&&(this.selector=a.selector,this.context=a.context),n.makeArray(a,this))};A.prototype=n.fn,y=n(l);var B=/^(?:parents|prev(?:Until|All))/,C={children:!0,contents:!0,next:!0,prev:!0};n.extend({dir:function(a,b,c){var d=[],e=void 0!==c;while((a=a[b])&&9!==a.nodeType)if(1===a.nodeType){if(e&&n(a).is(c))break;d.push(a)}return d},sibling:function(a,b){for(var c=[];a;a=a.nextSibling)1===a.nodeType&&a!==b&&c.push(a);return c}}),n.fn.extend({has:function(a){var b=n(a,this),c=b.length;return this.filter(function(){for(var a=0;c>a;a++)if(n.contains(this,b[a]))return!0})},closest:function(a,b){for(var c,d=0,e=this.length,f=[],g=u.test(a)||"string"!=typeof a?n(a,b||this.context):0;e>d;d++)for(c=this[d];c&&c!==b;c=c.parentNode)if(c.nodeType<11&&(g?g.index(c)>-1:1===c.nodeType&&n.find.matchesSelector(c,a))){f.push(c);break}return this.pushStack(f.length>1?n.unique(f):f)},index:function(a){return a?"string"==typeof a?g.call(n(a),this[0]):g.call(this,a.jquery?a[0]:a):this[0]&&this[0].parentNode?this.first().prevAll().length:-1},add:function(a,b){return this.pushStack(n.unique(n.merge(this.get(),n(a,b))))},addBack:function(a){return this.add(null==a?this.prevObject:this.prevObject.filter(a))}});function D(a,b){while((a=a[b])&&1!==a.nodeType);return a}n.each({parent:function(a){var b=a.parentNode;return b&&11!==b.nodeType?b:null},parents:function(a){return n.dir(a,"parentNode")},parentsUntil:function(a,b,c){return n.dir(a,"parentNode",c)},next:function(a){return D(a,"nextSibling")},prev:function(a){return D(a,"previousSibling")},nextAll:function(a){return n.dir(a,"nextSibling")},prevAll:function(a){return n.dir(a,"previousSibling")},nextUntil:function(a,b,c){return n.dir(a,"nextSibling",c)},prevUntil:function(a,b,c){return n.dir(a,"previousSibling",c)},siblings:function(a){return n.sibling((a.parentNode||{}).firstChild,a)},children:function(a){return n.sibling(a.firstChild)},contents:function(a){return a.contentDocument||n.merge([],a.childNodes)}},function(a,b){n.fn[a]=function(c,d){var e=n.map(this,b,c);return"Until"!==a.slice(-5)&&(d=c),d&&"string"==typeof d&&(e=n.filter(d,e)),this.length>1&&(C[a]||n.unique(e),B.test(a)&&e.reverse()),this.pushStack(e)}});var E=/\S+/g,F={};function G(a){var b=F[a]={};return n.each(a.match(E)||[],function(a,c){b[c]=!0}),b}n.Callbacks=function(a){a="string"==typeof a?F[a]||G(a):n.extend({},a);var b,c,d,e,f,g,h=[],i=!a.once&&[],j=function(l){for(b=a.memory&&l,c=!0,g=e||0,e=0,f=h.length,d=!0;h&&f>g;g++)if(h[g].apply(l[0],l[1])===!1&&a.stopOnFalse){b=!1;break}d=!1,h&&(i?i.length&&j(i.shift()):b?h=[]:k.disable())},k={add:function(){if(h){var c=h.length;!function g(b){n.each(b,function(b,c){var d=n.type(c);"function"===d?a.unique&&k.has(c)||h.push(c):c&&c.length&&"string"!==d&&g(c)})}(arguments),d?f=h.length:b&&(e=c,j(b))}return this},remove:function(){return h&&n.each(arguments,function(a,b){var c;while((c=n.inArray(b,h,c))>-1)h.splice(c,1),d&&(f>=c&&f--,g>=c&&g--)}),this},has:function(a){return a?n.inArray(a,h)>-1:!(!h||!h.length)},empty:function(){return h=[],f=0,this},disable:function(){return h=i=b=void 0,this},disabled:function(){return!h},lock:function(){return i=void 0,b||k.disable(),this},locked:function(){return!i},fireWith:function(a,b){return!h||c&&!i||(b=b||[],b=[a,b.slice?b.slice():b],d?i.push(b):j(b)),this},fire:function(){return k.fireWith(this,arguments),this},fired:function(){return!!c}};return k},n.extend({Deferred:function(a){var b=[["resolve","done",n.Callbacks("once memory"),"resolved"],["reject","fail",n.Callbacks("once memory"),"rejected"],["notify","progress",n.Callbacks("memory")]],c="pending",d={state:function(){return c},always:function(){return e.done(arguments).fail(arguments),this},then:function(){var a=arguments;return n.Deferred(function(c){n.each(b,function(b,f){var g=n.isFunction(a[b])&&a[b];e[f[1]](function(){var a=g&&g.apply(this,arguments);a&&n.isFunction(a.promise)?a.promise().done(c.resolve).fail(c.reject).progress(c.notify):c[f[0]+"With"](this===d?c.promise():this,g?[a]:arguments)})}),a=null}).promise()},promise:function(a){return null!=a?n.extend(a,d):d}},e={};return d.pipe=d.then,n.each(b,function(a,f){var g=f[2],h=f[3];d[f[1]]=g.add,h&&g.add(function(){c=h},b[1^a][2].disable,b[2][2].lock),e[f[0]]=function(){return e[f[0]+"With"](this===e?d:this,arguments),this},e[f[0]+"With"]=g.fireWith}),d.promise(e),a&&a.call(e,e),e},when:function(a){var b=0,c=d.call(arguments),e=c.length,f=1!==e||a&&n.isFunction(a.promise)?e:0,g=1===f?a:n.Deferred(),h=function(a,b,c){return function(e){b[a]=this,c[a]=arguments.length>1?d.call(arguments):e,c===i?g.notifyWith(b,c):--f||g.resolveWith(b,c)}},i,j,k;if(e>1)for(i=new Array(e),j=new Array(e),k=new Array(e);e>b;b++)c[b]&&n.isFunction(c[b].promise)?c[b].promise().done(h(b,k,c)).fail(g.reject).progress(h(b,j,i)):--f;return f||g.resolveWith(k,c),g.promise()}});var H;n.fn.ready=function(a){return n.ready.promise().done(a),this},n.extend({isReady:!1,readyWait:1,holdReady:function(a){a?n.readyWait++:n.ready(!0)},ready:function(a){(a===!0?--n.readyWait:n.isReady)||(n.isReady=!0,a!==!0&&--n.readyWait>0||(H.resolveWith(l,[n]),n.fn.triggerHandler&&(n(l).triggerHandler("ready"),n(l).off("ready"))))}});function I(){l.removeEventListener("DOMContentLoaded",I,!1),a.removeEventListener("load",I,!1),n.ready()}n.ready.promise=function(b){return H||(H=n.Deferred(),"complete"===l.readyState?setTimeout(n.ready):(l.addEventListener("DOMContentLoaded",I,!1),a.addEventListener("load",I,!1))),H.promise(b)},n.ready.promise();var J=n.access=function(a,b,c,d,e,f,g){var h=0,i=a.length,j=null==c;if("object"===n.type(c)){e=!0;for(h in c)n.access(a,b,h,c[h],!0,f,g)}else if(void 0!==d&&(e=!0,n.isFunction(d)||(g=!0),j&&(g?(b.call(a,d),b=null):(j=b,b=function(a,b,c){return j.call(n(a),c)})),b))for(;i>h;h++)b(a[h],c,g?d:d.call(a[h],h,b(a[h],c)));return e?a:j?b.call(a):i?b(a[0],c):f};n.acceptData=function(a){return 1===a.nodeType||9===a.nodeType||!+a.nodeType};function K(){Object.defineProperty(this.cache={},0,{get:function(){return{}}}),this.expando=n.expando+K.uid++}K.uid=1,K.accepts=n.acceptData,K.prototype={key:function(a){if(!K.accepts(a))return 0;var b={},c=a[this.expando];if(!c){c=K.uid++;try{b[this.expando]={value:c},Object.defineProperties(a,b)}catch(d){b[this.expando]=c,n.extend(a,b)}}return this.cache[c]||(this.cache[c]={}),c},set:function(a,b,c){var d,e=this.key(a),f=this.cache[e];if("string"==typeof b)f[b]=c;else if(n.isEmptyObject(f))n.extend(this.cache[e],b);else for(d in b)f[d]=b[d];return f},get:function(a,b){var c=this.cache[this.key(a)];return void 0===b?c:c[b]},access:function(a,b,c){var d;return void 0===b||b&&"string"==typeof b&&void 0===c?(d=this.get(a,b),void 0!==d?d:this.get(a,n.camelCase(b))):(this.set(a,b,c),void 0!==c?c:b)},remove:function(a,b){var c,d,e,f=this.key(a),g=this.cache[f];if(void 0===b)this.cache[f]={};else{n.isArray(b)?d=b.concat(b.map(n.camelCase)):(e=n.camelCase(b),b in g?d=[b,e]:(d=e,d=d in g?[d]:d.match(E)||[])),c=d.length;while(c--)delete g[d[c]]}},hasData:function(a){return!n.isEmptyObject(this.cache[a[this.expando]]||{})},discard:function(a){a[this.expando]&&delete this.cache[a[this.expando]]}};var L=new K,M=new K,N=/^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,O=/([A-Z])/g;function P(a,b,c){var d;if(void 0===c&&1===a.nodeType)if(d="data-"+b.replace(O,"-$1").toLowerCase(),c=a.getAttribute(d),"string"==typeof c){try{c="true"===c?!0:"false"===c?!1:"null"===c?null:+c+""===c?+c:N.test(c)?n.parseJSON(c):c}catch(e){}M.set(a,b,c)}else c=void 0;return c}n.extend({hasData:function(a){return M.hasData(a)||L.hasData(a)},data:function(a,b,c){
return M.access(a,b,c)},removeData:function(a,b){M.remove(a,b)},_data:function(a,b,c){return L.access(a,b,c)},_removeData:function(a,b){L.remove(a,b)}}),n.fn.extend({data:function(a,b){var c,d,e,f=this[0],g=f&&f.attributes;if(void 0===a){if(this.length&&(e=M.get(f),1===f.nodeType&&!L.get(f,"hasDataAttrs"))){c=g.length;while(c--)g[c]&&(d=g[c].name,0===d.indexOf("data-")&&(d=n.camelCase(d.slice(5)),P(f,d,e[d])));L.set(f,"hasDataAttrs",!0)}return e}return"object"==typeof a?this.each(function(){M.set(this,a)}):J(this,function(b){var c,d=n.camelCase(a);if(f&&void 0===b){if(c=M.get(f,a),void 0!==c)return c;if(c=M.get(f,d),void 0!==c)return c;if(c=P(f,d,void 0),void 0!==c)return c}else this.each(function(){var c=M.get(this,d);M.set(this,d,b),-1!==a.indexOf("-")&&void 0!==c&&M.set(this,a,b)})},null,b,arguments.length>1,null,!0)},removeData:function(a){return this.each(function(){M.remove(this,a)})}}),n.extend({queue:function(a,b,c){var d;return a?(b=(b||"fx")+"queue",d=L.get(a,b),c&&(!d||n.isArray(c)?d=L.access(a,b,n.makeArray(c)):d.push(c)),d||[]):void 0},dequeue:function(a,b){b=b||"fx";var c=n.queue(a,b),d=c.length,e=c.shift(),f=n._queueHooks(a,b),g=function(){n.dequeue(a,b)};"inprogress"===e&&(e=c.shift(),d--),e&&("fx"===b&&c.unshift("inprogress"),delete f.stop,e.call(a,g,f)),!d&&f&&f.empty.fire()},_queueHooks:function(a,b){var c=b+"queueHooks";return L.get(a,c)||L.access(a,c,{empty:n.Callbacks("once memory").add(function(){L.remove(a,[b+"queue",c])})})}}),n.fn.extend({queue:function(a,b){var c=2;return"string"!=typeof a&&(b=a,a="fx",c--),arguments.length<c?n.queue(this[0],a):void 0===b?this:this.each(function(){var c=n.queue(this,a,b);n._queueHooks(this,a),"fx"===a&&"inprogress"!==c[0]&&n.dequeue(this,a)})},dequeue:function(a){return this.each(function(){n.dequeue(this,a)})},clearQueue:function(a){return this.queue(a||"fx",[])},promise:function(a,b){var c,d=1,e=n.Deferred(),f=this,g=this.length,h=function(){--d||e.resolveWith(f,[f])};"string"!=typeof a&&(b=a,a=void 0),a=a||"fx";while(g--)c=L.get(f[g],a+"queueHooks"),c&&c.empty&&(d++,c.empty.add(h));return h(),e.promise(b)}});var Q=/[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,R=["Top","Right","Bottom","Left"],S=function(a,b){return a=b||a,"none"===n.css(a,"display")||!n.contains(a.ownerDocument,a)},T=/^(?:checkbox|radio)$/i;!function(){var a=l.createDocumentFragment(),b=a.appendChild(l.createElement("div")),c=l.createElement("input");c.setAttribute("type","radio"),c.setAttribute("checked","checked"),c.setAttribute("name","t"),b.appendChild(c),k.checkClone=b.cloneNode(!0).cloneNode(!0).lastChild.checked,b.innerHTML="<textarea>x</textarea>",k.noCloneChecked=!!b.cloneNode(!0).lastChild.defaultValue}();var U="undefined";k.focusinBubbles="onfocusin"in a;var V=/^key/,W=/^(?:mouse|pointer|contextmenu)|click/,X=/^(?:focusinfocus|focusoutblur)$/,Y=/^([^.]*)(?:\.(.+)|)$/;function Z(){return!0}function $(){return!1}function _(){try{return l.activeElement}catch(a){}}n.event={global:{},add:function(a,b,c,d,e){var f,g,h,i,j,k,l,m,o,p,q,r=L.get(a);if(r){c.handler&&(f=c,c=f.handler,e=f.selector),c.guid||(c.guid=n.guid++),(i=r.events)||(i=r.events={}),(g=r.handle)||(g=r.handle=function(b){return typeof n!==U&&n.event.triggered!==b.type?n.event.dispatch.apply(a,arguments):void 0}),b=(b||"").match(E)||[""],j=b.length;while(j--)h=Y.exec(b[j])||[],o=q=h[1],p=(h[2]||"").split(".").sort(),o&&(l=n.event.special[o]||{},o=(e?l.delegateType:l.bindType)||o,l=n.event.special[o]||{},k=n.extend({type:o,origType:q,data:d,handler:c,guid:c.guid,selector:e,needsContext:e&&n.expr.match.needsContext.test(e),namespace:p.join(".")},f),(m=i[o])||(m=i[o]=[],m.delegateCount=0,l.setup&&l.setup.call(a,d,p,g)!==!1||a.addEventListener&&a.addEventListener(o,g,!1)),l.add&&(l.add.call(a,k),k.handler.guid||(k.handler.guid=c.guid)),e?m.splice(m.delegateCount++,0,k):m.push(k),n.event.global[o]=!0)}},remove:function(a,b,c,d,e){var f,g,h,i,j,k,l,m,o,p,q,r=L.hasData(a)&&L.get(a);if(r&&(i=r.events)){b=(b||"").match(E)||[""],j=b.length;while(j--)if(h=Y.exec(b[j])||[],o=q=h[1],p=(h[2]||"").split(".").sort(),o){l=n.event.special[o]||{},o=(d?l.delegateType:l.bindType)||o,m=i[o]||[],h=h[2]&&new RegExp("(^|\\.)"+p.join("\\.(?:.*\\.|)")+"(\\.|$)"),g=f=m.length;while(f--)k=m[f],!e&&q!==k.origType||c&&c.guid!==k.guid||h&&!h.test(k.namespace)||d&&d!==k.selector&&("**"!==d||!k.selector)||(m.splice(f,1),k.selector&&m.delegateCount--,l.remove&&l.remove.call(a,k));g&&!m.length&&(l.teardown&&l.teardown.call(a,p,r.handle)!==!1||n.removeEvent(a,o,r.handle),delete i[o])}else for(o in i)n.event.remove(a,o+b[j],c,d,!0);n.isEmptyObject(i)&&(delete r.handle,L.remove(a,"events"))}},trigger:function(b,c,d,e){var f,g,h,i,k,m,o,p=[d||l],q=j.call(b,"type")?b.type:b,r=j.call(b,"namespace")?b.namespace.split("."):[];if(g=h=d=d||l,3!==d.nodeType&&8!==d.nodeType&&!X.test(q+n.event.triggered)&&(q.indexOf(".")>=0&&(r=q.split("."),q=r.shift(),r.sort()),k=q.indexOf(":")<0&&"on"+q,b=b[n.expando]?b:new n.Event(q,"object"==typeof b&&b),b.isTrigger=e?2:3,b.namespace=r.join("."),b.namespace_re=b.namespace?new RegExp("(^|\\.)"+r.join("\\.(?:.*\\.|)")+"(\\.|$)"):null,b.result=void 0,b.target||(b.target=d),c=null==c?[b]:n.makeArray(c,[b]),o=n.event.special[q]||{},e||!o.trigger||o.trigger.apply(d,c)!==!1)){if(!e&&!o.noBubble&&!n.isWindow(d)){for(i=o.delegateType||q,X.test(i+q)||(g=g.parentNode);g;g=g.parentNode)p.push(g),h=g;h===(d.ownerDocument||l)&&p.push(h.defaultView||h.parentWindow||a)}f=0;while((g=p[f++])&&!b.isPropagationStopped())b.type=f>1?i:o.bindType||q,m=(L.get(g,"events")||{})[b.type]&&L.get(g,"handle"),m&&m.apply(g,c),m=k&&g[k],m&&m.apply&&n.acceptData(g)&&(b.result=m.apply(g,c),b.result===!1&&b.preventDefault());return b.type=q,e||b.isDefaultPrevented()||o._default&&o._default.apply(p.pop(),c)!==!1||!n.acceptData(d)||k&&n.isFunction(d[q])&&!n.isWindow(d)&&(h=d[k],h&&(d[k]=null),n.event.triggered=q,d[q](),n.event.triggered=void 0,h&&(d[k]=h)),b.result}},dispatch:function(a){a=n.event.fix(a);var b,c,e,f,g,h=[],i=d.call(arguments),j=(L.get(this,"events")||{})[a.type]||[],k=n.event.special[a.type]||{};if(i[0]=a,a.delegateTarget=this,!k.preDispatch||k.preDispatch.call(this,a)!==!1){h=n.event.handlers.call(this,a,j),b=0;while((f=h[b++])&&!a.isPropagationStopped()){a.currentTarget=f.elem,c=0;while((g=f.handlers[c++])&&!a.isImmediatePropagationStopped())(!a.namespace_re||a.namespace_re.test(g.namespace))&&(a.handleObj=g,a.data=g.data,e=((n.event.special[g.origType]||{}).handle||g.handler).apply(f.elem,i),void 0!==e&&(a.result=e)===!1&&(a.preventDefault(),a.stopPropagation()))}return k.postDispatch&&k.postDispatch.call(this,a),a.result}},handlers:function(a,b){var c,d,e,f,g=[],h=b.delegateCount,i=a.target;if(h&&i.nodeType&&(!a.button||"click"!==a.type))for(;i!==this;i=i.parentNode||this)if(i.disabled!==!0||"click"!==a.type){for(d=[],c=0;h>c;c++)f=b[c],e=f.selector+" ",void 0===d[e]&&(d[e]=f.needsContext?n(e,this).index(i)>=0:n.find(e,this,null,[i]).length),d[e]&&d.push(f);d.length&&g.push({elem:i,handlers:d})}return h<b.length&&g.push({elem:this,handlers:b.slice(h)}),g},props:"altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),fixHooks:{},keyHooks:{props:"char charCode key keyCode".split(" "),filter:function(a,b){return null==a.which&&(a.which=null!=b.charCode?b.charCode:b.keyCode),a}},mouseHooks:{props:"button buttons clientX clientY offsetX offsetY pageX pageY screenX screenY toElement".split(" "),filter:function(a,b){var c,d,e,f=b.button;return null==a.pageX&&null!=b.clientX&&(c=a.target.ownerDocument||l,d=c.documentElement,e=c.body,a.pageX=b.clientX+(d&&d.scrollLeft||e&&e.scrollLeft||0)-(d&&d.clientLeft||e&&e.clientLeft||0),a.pageY=b.clientY+(d&&d.scrollTop||e&&e.scrollTop||0)-(d&&d.clientTop||e&&e.clientTop||0)),a.which||void 0===f||(a.which=1&f?1:2&f?3:4&f?2:0),a}},fix:function(a){if(a[n.expando])return a;var b,c,d,e=a.type,f=a,g=this.fixHooks[e];g||(this.fixHooks[e]=g=W.test(e)?this.mouseHooks:V.test(e)?this.keyHooks:{}),d=g.props?this.props.concat(g.props):this.props,a=new n.Event(f),b=d.length;while(b--)c=d[b],a[c]=f[c];return a.target||(a.target=l),3===a.target.nodeType&&(a.target=a.target.parentNode),g.filter?g.filter(a,f):a},special:{load:{noBubble:!0},focus:{trigger:function(){return this!==_()&&this.focus?(this.focus(),!1):void 0},delegateType:"focusin"},blur:{trigger:function(){return this===_()&&this.blur?(this.blur(),!1):void 0},delegateType:"focusout"},click:{trigger:function(){return"checkbox"===this.type&&this.click&&n.nodeName(this,"input")?(this.click(),!1):void 0},_default:function(a){return n.nodeName(a.target,"a")}},beforeunload:{postDispatch:function(a){void 0!==a.result&&a.originalEvent&&(a.originalEvent.returnValue=a.result)}}},simulate:function(a,b,c,d){var e=n.extend(new n.Event,c,{type:a,isSimulated:!0,originalEvent:{}});d?n.event.trigger(e,null,b):n.event.dispatch.call(b,e),e.isDefaultPrevented()&&c.preventDefault()}},n.removeEvent=function(a,b,c){a.removeEventListener&&a.removeEventListener(b,c,!1)},n.Event=function(a,b){return this instanceof n.Event?(a&&a.type?(this.originalEvent=a,this.type=a.type,this.isDefaultPrevented=a.defaultPrevented||void 0===a.defaultPrevented&&a.returnValue===!1?Z:$):this.type=a,b&&n.extend(this,b),this.timeStamp=a&&a.timeStamp||n.now(),void(this[n.expando]=!0)):new n.Event(a,b)},n.Event.prototype={isDefaultPrevented:$,isPropagationStopped:$,isImmediatePropagationStopped:$,preventDefault:function(){var a=this.originalEvent;this.isDefaultPrevented=Z,a&&a.preventDefault&&a.preventDefault()},stopPropagation:function(){var a=this.originalEvent;this.isPropagationStopped=Z,a&&a.stopPropagation&&a.stopPropagation()},stopImmediatePropagation:function(){var a=this.originalEvent;this.isImmediatePropagationStopped=Z,a&&a.stopImmediatePropagation&&a.stopImmediatePropagation(),this.stopPropagation()}},n.each({mouseenter:"mouseover",mouseleave:"mouseout",pointerenter:"pointerover",pointerleave:"pointerout"},function(a,b){n.event.special[a]={delegateType:b,bindType:b,handle:function(a){var c,d=this,e=a.relatedTarget,f=a.handleObj;return(!e||e!==d&&!n.contains(d,e))&&(a.type=f.origType,c=f.handler.apply(this,arguments),a.type=b),c}}}),k.focusinBubbles||n.each({focus:"focusin",blur:"focusout"},function(a,b){var c=function(a){n.event.simulate(b,a.target,n.event.fix(a),!0)};n.event.special[b]={setup:function(){var d=this.ownerDocument||this,e=L.access(d,b);e||d.addEventListener(a,c,!0),L.access(d,b,(e||0)+1)},teardown:function(){var d=this.ownerDocument||this,e=L.access(d,b)-1;e?L.access(d,b,e):(d.removeEventListener(a,c,!0),L.remove(d,b))}}}),n.fn.extend({on:function(a,b,c,d,e){var f,g;if("object"==typeof a){"string"!=typeof b&&(c=c||b,b=void 0);for(g in a)this.on(g,b,c,a[g],e);return this}if(null==c&&null==d?(d=b,c=b=void 0):null==d&&("string"==typeof b?(d=c,c=void 0):(d=c,c=b,b=void 0)),d===!1)d=$;else if(!d)return this;return 1===e&&(f=d,d=function(a){return n().off(a),f.apply(this,arguments)},d.guid=f.guid||(f.guid=n.guid++)),this.each(function(){n.event.add(this,a,d,c,b)})},one:function(a,b,c,d){return this.on(a,b,c,d,1)},off:function(a,b,c){var d,e;if(a&&a.preventDefault&&a.handleObj)return d=a.handleObj,n(a.delegateTarget).off(d.namespace?d.origType+"."+d.namespace:d.origType,d.selector,d.handler),this;if("object"==typeof a){for(e in a)this.off(e,b,a[e]);return this}return(b===!1||"function"==typeof b)&&(c=b,b=void 0),c===!1&&(c=$),this.each(function(){n.event.remove(this,a,c,b)})},trigger:function(a,b){return this.each(function(){n.event.trigger(a,b,this)})},triggerHandler:function(a,b){var c=this[0];return c?n.event.trigger(a,b,c,!0):void 0}});var aa=/<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,ba=/<([\w:]+)/,ca=/<|&#?\w+;/,da=/<(?:script|style|link)/i,ea=/checked\s*(?:[^=]|=\s*.checked.)/i,fa=/^$|\/(?:java|ecma)script/i,ga=/^true\/(.*)/,ha=/^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,ia={option:[1,"<select multiple='multiple'>","</select>"],thead:[1,"<table>","</table>"],col:[2,"<table><colgroup>","</colgroup></table>"],tr:[2,"<table><tbody>","</tbody></table>"],td:[3,"<table><tbody><tr>","</tr></tbody></table>"],_default:[0,"",""]};ia.optgroup=ia.option,ia.tbody=ia.tfoot=ia.colgroup=ia.caption=ia.thead,ia.th=ia.td;function ja(a,b){return n.nodeName(a,"table")&&n.nodeName(11!==b.nodeType?b:b.firstChild,"tr")?a.getElementsByTagName("tbody")[0]||a.appendChild(a.ownerDocument.createElement("tbody")):a}function ka(a){return a.type=(null!==a.getAttribute("type"))+"/"+a.type,a}function la(a){var b=ga.exec(a.type);return b?a.type=b[1]:a.removeAttribute("type"),a}function ma(a,b){for(var c=0,d=a.length;d>c;c++)L.set(a[c],"globalEval",!b||L.get(b[c],"globalEval"))}function na(a,b){var c,d,e,f,g,h,i,j;if(1===b.nodeType){if(L.hasData(a)&&(f=L.access(a),g=L.set(b,f),j=f.events)){delete g.handle,g.events={};for(e in j)for(c=0,d=j[e].length;d>c;c++)n.event.add(b,e,j[e][c])}M.hasData(a)&&(h=M.access(a),i=n.extend({},h),M.set(b,i))}}function oa(a,b){var c=a.getElementsByTagName?a.getElementsByTagName(b||"*"):a.querySelectorAll?a.querySelectorAll(b||"*"):[];return void 0===b||b&&n.nodeName(a,b)?n.merge([a],c):c}function pa(a,b){var c=b.nodeName.toLowerCase();"input"===c&&T.test(a.type)?b.checked=a.checked:("input"===c||"textarea"===c)&&(b.defaultValue=a.defaultValue)}n.extend({clone:function(a,b,c){var d,e,f,g,h=a.cloneNode(!0),i=n.contains(a.ownerDocument,a);if(!(k.noCloneChecked||1!==a.nodeType&&11!==a.nodeType||n.isXMLDoc(a)))for(g=oa(h),f=oa(a),d=0,e=f.length;e>d;d++)pa(f[d],g[d]);if(b)if(c)for(f=f||oa(a),g=g||oa(h),d=0,e=f.length;e>d;d++)na(f[d],g[d]);else na(a,h);return g=oa(h,"script"),g.length>0&&ma(g,!i&&oa(a,"script")),h},buildFragment:function(a,b,c,d){for(var e,f,g,h,i,j,k=b.createDocumentFragment(),l=[],m=0,o=a.length;o>m;m++)if(e=a[m],e||0===e)if("object"===n.type(e))n.merge(l,e.nodeType?[e]:e);else if(ca.test(e)){f=f||k.appendChild(b.createElement("div")),g=(ba.exec(e)||["",""])[1].toLowerCase(),h=ia[g]||ia._default,f.innerHTML=h[1]+e.replace(aa,"<$1></$2>")+h[2],j=h[0];while(j--)f=f.lastChild;n.merge(l,f.childNodes),f=k.firstChild,f.textContent=""}else l.push(b.createTextNode(e));k.textContent="",m=0;while(e=l[m++])if((!d||-1===n.inArray(e,d))&&(i=n.contains(e.ownerDocument,e),f=oa(k.appendChild(e),"script"),i&&ma(f),c)){j=0;while(e=f[j++])fa.test(e.type||"")&&c.push(e)}return k},cleanData:function(a){for(var b,c,d,e,f=n.event.special,g=0;void 0!==(c=a[g]);g++){if(n.acceptData(c)&&(e=c[L.expando],e&&(b=L.cache[e]))){if(b.events)for(d in b.events)f[d]?n.event.remove(c,d):n.removeEvent(c,d,b.handle);L.cache[e]&&delete L.cache[e]}delete M.cache[c[M.expando]]}}}),n.fn.extend({text:function(a){return J(this,function(a){return void 0===a?n.text(this):this.empty().each(function(){(1===this.nodeType||11===this.nodeType||9===this.nodeType)&&(this.textContent=a)})},null,a,arguments.length)},append:function(){return this.domManip(arguments,function(a){if(1===this.nodeType||11===this.nodeType||9===this.nodeType){var b=ja(this,a);b.appendChild(a)}})},prepend:function(){return this.domManip(arguments,function(a){if(1===this.nodeType||11===this.nodeType||9===this.nodeType){var b=ja(this,a);b.insertBefore(a,b.firstChild)}})},before:function(){return this.domManip(arguments,function(a){this.parentNode&&this.parentNode.insertBefore(a,this)})},after:function(){return this.domManip(arguments,function(a){this.parentNode&&this.parentNode.insertBefore(a,this.nextSibling)})},remove:function(a,b){for(var c,d=a?n.filter(a,this):this,e=0;null!=(c=d[e]);e++)b||1!==c.nodeType||n.cleanData(oa(c)),c.parentNode&&(b&&n.contains(c.ownerDocument,c)&&ma(oa(c,"script")),c.parentNode.removeChild(c));return this},empty:function(){for(var a,b=0;null!=(a=this[b]);b++)1===a.nodeType&&(n.cleanData(oa(a,!1)),a.textContent="");return this},clone:function(a,b){return a=null==a?!1:a,b=null==b?a:b,this.map(function(){return n.clone(this,a,b)})},html:function(a){return J(this,function(a){var b=this[0]||{},c=0,d=this.length;if(void 0===a&&1===b.nodeType)return b.innerHTML;if("string"==typeof a&&!da.test(a)&&!ia[(ba.exec(a)||["",""])[1].toLowerCase()]){a=a.replace(aa,"<$1></$2>");try{for(;d>c;c++)b=this[c]||{},1===b.nodeType&&(n.cleanData(oa(b,!1)),b.innerHTML=a);b=0}catch(e){}}b&&this.empty().append(a)},null,a,arguments.length)},replaceWith:function(){var a=arguments[0];return this.domManip(arguments,function(b){a=this.parentNode,n.cleanData(oa(this)),a&&a.replaceChild(b,this)}),a&&(a.length||a.nodeType)?this:this.remove()},detach:function(a){return this.remove(a,!0)},domManip:function(a,b){a=e.apply([],a);var c,d,f,g,h,i,j=0,l=this.length,m=this,o=l-1,p=a[0],q=n.isFunction(p);if(q||l>1&&"string"==typeof p&&!k.checkClone&&ea.test(p))return this.each(function(c){var d=m.eq(c);q&&(a[0]=p.call(this,c,d.html())),d.domManip(a,b)});if(l&&(c=n.buildFragment(a,this[0].ownerDocument,!1,this),d=c.firstChild,1===c.childNodes.length&&(c=d),d)){for(f=n.map(oa(c,"script"),ka),g=f.length;l>j;j++)h=c,j!==o&&(h=n.clone(h,!0,!0),g&&n.merge(f,oa(h,"script"))),b.call(this[j],h,j);if(g)for(i=f[f.length-1].ownerDocument,n.map(f,la),j=0;g>j;j++)h=f[j],fa.test(h.type||"")&&!L.access(h,"globalEval")&&n.contains(i,h)&&(h.src?n._evalUrl&&n._evalUrl(h.src):n.globalEval(h.textContent.replace(ha,"")))}return this}}),n.each({appendTo:"append",prependTo:"prepend",insertBefore:"before",insertAfter:"after",replaceAll:"replaceWith"},function(a,b){n.fn[a]=function(a){for(var c,d=[],e=n(a),g=e.length-1,h=0;g>=h;h++)c=h===g?this:this.clone(!0),n(e[h])[b](c),f.apply(d,c.get());return this.pushStack(d)}});var qa,ra={};function sa(b,c){var d,e=n(c.createElement(b)).appendTo(c.body),f=a.getDefaultComputedStyle&&(d=a.getDefaultComputedStyle(e[0]))?d.display:n.css(e[0],"display");return e.detach(),f}function ta(a){var b=l,c=ra[a];return c||(c=sa(a,b),"none"!==c&&c||(qa=(qa||n("<iframe frameborder='0' width='0' height='0'/>")).appendTo(b.documentElement),b=qa[0].contentDocument,b.write(),b.close(),c=sa(a,b),qa.detach()),ra[a]=c),c}var ua=/^margin/,va=new RegExp("^("+Q+")(?!px)[a-z%]+$","i"),wa=function(b){return b.ownerDocument.defaultView.opener?b.ownerDocument.defaultView.getComputedStyle(b,null):a.getComputedStyle(b,null)};function xa(a,b,c){var d,e,f,g,h=a.style;return c=c||wa(a),c&&(g=c.getPropertyValue(b)||c[b]),c&&(""!==g||n.contains(a.ownerDocument,a)||(g=n.style(a,b)),va.test(g)&&ua.test(b)&&(d=h.width,e=h.minWidth,f=h.maxWidth,h.minWidth=h.maxWidth=h.width=g,g=c.width,h.width=d,h.minWidth=e,h.maxWidth=f)),void 0!==g?g+"":g}function ya(a,b){return{get:function(){return a()?void delete this.get:(this.get=b).apply(this,arguments)}}}!function(){var b,c,d=l.documentElement,e=l.createElement("div"),f=l.createElement("div");if(f.style){f.style.backgroundClip="content-box",f.cloneNode(!0).style.backgroundClip="",k.clearCloneStyle="content-box"===f.style.backgroundClip,e.style.cssText="border:0;width:0;height:0;top:0;left:-9999px;margin-top:1px;position:absolute",e.appendChild(f);function g(){f.style.cssText="-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;display:block;margin-top:1%;top:1%;border:1px;padding:1px;width:4px;position:absolute",f.innerHTML="",d.appendChild(e);var g=a.getComputedStyle(f,null);b="1%"!==g.top,c="4px"===g.width,d.removeChild(e)}a.getComputedStyle&&n.extend(k,{pixelPosition:function(){return g(),b},boxSizingReliable:function(){return null==c&&g(),c},reliableMarginRight:function(){var b,c=f.appendChild(l.createElement("div"));return c.style.cssText=f.style.cssText="-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;display:block;margin:0;border:0;padding:0",c.style.marginRight=c.style.width="0",f.style.width="1px",d.appendChild(e),b=!parseFloat(a.getComputedStyle(c,null).marginRight),d.removeChild(e),f.removeChild(c),b}})}}(),n.swap=function(a,b,c,d){var e,f,g={};for(f in b)g[f]=a.style[f],a.style[f]=b[f];e=c.apply(a,d||[]);for(f in b)a.style[f]=g[f];return e};var za=/^(none|table(?!-c[ea]).+)/,Aa=new RegExp("^("+Q+")(.*)$","i"),Ba=new RegExp("^([+-])=("+Q+")","i"),Ca={position:"absolute",visibility:"hidden",display:"block"},Da={letterSpacing:"0",fontWeight:"400"},Ea=["Webkit","O","Moz","ms"];function Fa(a,b){if(b in a)return b;var c=b[0].toUpperCase()+b.slice(1),d=b,e=Ea.length;while(e--)if(b=Ea[e]+c,b in a)return b;return d}function Ga(a,b,c){var d=Aa.exec(b);return d?Math.max(0,d[1]-(c||0))+(d[2]||"px"):b}function Ha(a,b,c,d,e){for(var f=c===(d?"border":"content")?4:"width"===b?1:0,g=0;4>f;f+=2)"margin"===c&&(g+=n.css(a,c+R[f],!0,e)),d?("content"===c&&(g-=n.css(a,"padding"+R[f],!0,e)),"margin"!==c&&(g-=n.css(a,"border"+R[f]+"Width",!0,e))):(g+=n.css(a,"padding"+R[f],!0,e),"padding"!==c&&(g+=n.css(a,"border"+R[f]+"Width",!0,e)));return g}function Ia(a,b,c){var d=!0,e="width"===b?a.offsetWidth:a.offsetHeight,f=wa(a),g="border-box"===n.css(a,"boxSizing",!1,f);if(0>=e||null==e){if(e=xa(a,b,f),(0>e||null==e)&&(e=a.style[b]),va.test(e))return e;d=g&&(k.boxSizingReliable()||e===a.style[b]),e=parseFloat(e)||0}return e+Ha(a,b,c||(g?"border":"content"),d,f)+"px"}function Ja(a,b){for(var c,d,e,f=[],g=0,h=a.length;h>g;g++)d=a[g],d.style&&(f[g]=L.get(d,"olddisplay"),c=d.style.display,b?(f[g]||"none"!==c||(d.style.display=""),""===d.style.display&&S(d)&&(f[g]=L.access(d,"olddisplay",ta(d.nodeName)))):(e=S(d),"none"===c&&e||L.set(d,"olddisplay",e?c:n.css(d,"display"))));for(g=0;h>g;g++)d=a[g],d.style&&(b&&"none"!==d.style.display&&""!==d.style.display||(d.style.display=b?f[g]||"":"none"));return a}n.extend({cssHooks:{opacity:{get:function(a,b){if(b){var c=xa(a,"opacity");return""===c?"1":c}}}},cssNumber:{columnCount:!0,fillOpacity:!0,flexGrow:!0,flexShrink:!0,fontWeight:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,widows:!0,zIndex:!0,zoom:!0},cssProps:{"float":"cssFloat"},style:function(a,b,c,d){if(a&&3!==a.nodeType&&8!==a.nodeType&&a.style){var e,f,g,h=n.camelCase(b),i=a.style;return b=n.cssProps[h]||(n.cssProps[h]=Fa(i,h)),g=n.cssHooks[b]||n.cssHooks[h],void 0===c?g&&"get"in g&&void 0!==(e=g.get(a,!1,d))?e:i[b]:(f=typeof c,"string"===f&&(e=Ba.exec(c))&&(c=(e[1]+1)*e[2]+parseFloat(n.css(a,b)),f="number"),null!=c&&c===c&&("number"!==f||n.cssNumber[h]||(c+="px"),k.clearCloneStyle||""!==c||0!==b.indexOf("background")||(i[b]="inherit"),g&&"set"in g&&void 0===(c=g.set(a,c,d))||(i[b]=c)),void 0)}},css:function(a,b,c,d){var e,f,g,h=n.camelCase(b);return b=n.cssProps[h]||(n.cssProps[h]=Fa(a.style,h)),g=n.cssHooks[b]||n.cssHooks[h],g&&"get"in g&&(e=g.get(a,!0,c)),void 0===e&&(e=xa(a,b,d)),"normal"===e&&b in Da&&(e=Da[b]),""===c||c?(f=parseFloat(e),c===!0||n.isNumeric(f)?f||0:e):e}}),n.each(["height","width"],function(a,b){n.cssHooks[b]={get:function(a,c,d){return c?za.test(n.css(a,"display"))&&0===a.offsetWidth?n.swap(a,Ca,function(){return Ia(a,b,d)}):Ia(a,b,d):void 0},set:function(a,c,d){var e=d&&wa(a);return Ga(a,c,d?Ha(a,b,d,"border-box"===n.css(a,"boxSizing",!1,e),e):0)}}}),n.cssHooks.marginRight=ya(k.reliableMarginRight,function(a,b){return b?n.swap(a,{display:"inline-block"},xa,[a,"marginRight"]):void 0}),n.each({margin:"",padding:"",border:"Width"},function(a,b){n.cssHooks[a+b]={expand:function(c){for(var d=0,e={},f="string"==typeof c?c.split(" "):[c];4>d;d++)e[a+R[d]+b]=f[d]||f[d-2]||f[0];return e}},ua.test(a)||(n.cssHooks[a+b].set=Ga)}),n.fn.extend({css:function(a,b){return J(this,function(a,b,c){var d,e,f={},g=0;if(n.isArray(b)){for(d=wa(a),e=b.length;e>g;g++)f[b[g]]=n.css(a,b[g],!1,d);return f}return void 0!==c?n.style(a,b,c):n.css(a,b)},a,b,arguments.length>1)},show:function(){return Ja(this,!0)},hide:function(){return Ja(this)},toggle:function(a){return"boolean"==typeof a?a?this.show():this.hide():this.each(function(){S(this)?n(this).show():n(this).hide()})}});function Ka(a,b,c,d,e){return new Ka.prototype.init(a,b,c,d,e)}n.Tween=Ka,Ka.prototype={constructor:Ka,init:function(a,b,c,d,e,f){this.elem=a,this.prop=c,this.easing=e||"swing",this.options=b,this.start=this.now=this.cur(),this.end=d,this.unit=f||(n.cssNumber[c]?"":"px")},cur:function(){var a=Ka.propHooks[this.prop];return a&&a.get?a.get(this):Ka.propHooks._default.get(this)},run:function(a){var b,c=Ka.propHooks[this.prop];return this.options.duration?this.pos=b=n.easing[this.easing](a,this.options.duration*a,0,1,this.options.duration):this.pos=b=a,this.now=(this.end-this.start)*b+this.start,this.options.step&&this.options.step.call(this.elem,this.now,this),c&&c.set?c.set(this):Ka.propHooks._default.set(this),this}},Ka.prototype.init.prototype=Ka.prototype,Ka.propHooks={_default:{get:function(a){var b;return null==a.elem[a.prop]||a.elem.style&&null!=a.elem.style[a.prop]?(b=n.css(a.elem,a.prop,""),b&&"auto"!==b?b:0):a.elem[a.prop]},set:function(a){n.fx.step[a.prop]?n.fx.step[a.prop](a):a.elem.style&&(null!=a.elem.style[n.cssProps[a.prop]]||n.cssHooks[a.prop])?n.style(a.elem,a.prop,a.now+a.unit):a.elem[a.prop]=a.now}}},Ka.propHooks.scrollTop=Ka.propHooks.scrollLeft={set:function(a){a.elem.nodeType&&a.elem.parentNode&&(a.elem[a.prop]=a.now)}},n.easing={linear:function(a){return a},swing:function(a){return.5-Math.cos(a*Math.PI)/2}},n.fx=Ka.prototype.init,n.fx.step={};var La,Ma,Na=/^(?:toggle|show|hide)$/,Oa=new RegExp("^(?:([+-])=|)("+Q+")([a-z%]*)$","i"),Pa=/queueHooks$/,Qa=[Va],Ra={"*":[function(a,b){var c=this.createTween(a,b),d=c.cur(),e=Oa.exec(b),f=e&&e[3]||(n.cssNumber[a]?"":"px"),g=(n.cssNumber[a]||"px"!==f&&+d)&&Oa.exec(n.css(c.elem,a)),h=1,i=20;if(g&&g[3]!==f){f=f||g[3],e=e||[],g=+d||1;do h=h||".5",g/=h,n.style(c.elem,a,g+f);while(h!==(h=c.cur()/d)&&1!==h&&--i)}return e&&(g=c.start=+g||+d||0,c.unit=f,c.end=e[1]?g+(e[1]+1)*e[2]:+e[2]),c}]};function Sa(){return setTimeout(function(){La=void 0}),La=n.now()}function Ta(a,b){var c,d=0,e={height:a};for(b=b?1:0;4>d;d+=2-b)c=R[d],e["margin"+c]=e["padding"+c]=a;return b&&(e.opacity=e.width=a),e}function Ua(a,b,c){for(var d,e=(Ra[b]||[]).concat(Ra["*"]),f=0,g=e.length;g>f;f++)if(d=e[f].call(c,b,a))return d}function Va(a,b,c){var d,e,f,g,h,i,j,k,l=this,m={},o=a.style,p=a.nodeType&&S(a),q=L.get(a,"fxshow");c.queue||(h=n._queueHooks(a,"fx"),null==h.unqueued&&(h.unqueued=0,i=h.empty.fire,h.empty.fire=function(){h.unqueued||i()}),h.unqueued++,l.always(function(){l.always(function(){h.unqueued--,n.queue(a,"fx").length||h.empty.fire()})})),1===a.nodeType&&("height"in b||"width"in b)&&(c.overflow=[o.overflow,o.overflowX,o.overflowY],j=n.css(a,"display"),k="none"===j?L.get(a,"olddisplay")||ta(a.nodeName):j,"inline"===k&&"none"===n.css(a,"float")&&(o.display="inline-block")),c.overflow&&(o.overflow="hidden",l.always(function(){o.overflow=c.overflow[0],o.overflowX=c.overflow[1],o.overflowY=c.overflow[2]}));for(d in b)if(e=b[d],Na.exec(e)){if(delete b[d],f=f||"toggle"===e,e===(p?"hide":"show")){if("show"!==e||!q||void 0===q[d])continue;p=!0}m[d]=q&&q[d]||n.style(a,d)}else j=void 0;if(n.isEmptyObject(m))"inline"===("none"===j?ta(a.nodeName):j)&&(o.display=j);else{q?"hidden"in q&&(p=q.hidden):q=L.access(a,"fxshow",{}),f&&(q.hidden=!p),p?n(a).show():l.done(function(){n(a).hide()}),l.done(function(){var b;L.remove(a,"fxshow");for(b in m)n.style(a,b,m[b])});for(d in m)g=Ua(p?q[d]:0,d,l),d in q||(q[d]=g.start,p&&(g.end=g.start,g.start="width"===d||"height"===d?1:0))}}function Wa(a,b){var c,d,e,f,g;for(c in a)if(d=n.camelCase(c),e=b[d],f=a[c],n.isArray(f)&&(e=f[1],f=a[c]=f[0]),c!==d&&(a[d]=f,delete a[c]),g=n.cssHooks[d],g&&"expand"in g){f=g.expand(f),delete a[d];for(c in f)c in a||(a[c]=f[c],b[c]=e)}else b[d]=e}function Xa(a,b,c){var d,e,f=0,g=Qa.length,h=n.Deferred().always(function(){delete i.elem}),i=function(){if(e)return!1;for(var b=La||Sa(),c=Math.max(0,j.startTime+j.duration-b),d=c/j.duration||0,f=1-d,g=0,i=j.tweens.length;i>g;g++)j.tweens[g].run(f);return h.notifyWith(a,[j,f,c]),1>f&&i?c:(h.resolveWith(a,[j]),!1)},j=h.promise({elem:a,props:n.extend({},b),opts:n.extend(!0,{specialEasing:{}},c),originalProperties:b,originalOptions:c,startTime:La||Sa(),duration:c.duration,tweens:[],createTween:function(b,c){var d=n.Tween(a,j.opts,b,c,j.opts.specialEasing[b]||j.opts.easing);return j.tweens.push(d),d},stop:function(b){var c=0,d=b?j.tweens.length:0;if(e)return this;for(e=!0;d>c;c++)j.tweens[c].run(1);return b?h.resolveWith(a,[j,b]):h.rejectWith(a,[j,b]),this}}),k=j.props;for(Wa(k,j.opts.specialEasing);g>f;f++)if(d=Qa[f].call(j,a,k,j.opts))return d;return n.map(k,Ua,j),n.isFunction(j.opts.start)&&j.opts.start.call(a,j),n.fx.timer(n.extend(i,{elem:a,anim:j,queue:j.opts.queue})),j.progress(j.opts.progress).done(j.opts.done,j.opts.complete).fail(j.opts.fail).always(j.opts.always)}n.Animation=n.extend(Xa,{tweener:function(a,b){n.isFunction(a)?(b=a,a=["*"]):a=a.split(" ");for(var c,d=0,e=a.length;e>d;d++)c=a[d],Ra[c]=Ra[c]||[],Ra[c].unshift(b)},prefilter:function(a,b){b?Qa.unshift(a):Qa.push(a)}}),n.speed=function(a,b,c){var d=a&&"object"==typeof a?n.extend({},a):{complete:c||!c&&b||n.isFunction(a)&&a,duration:a,easing:c&&b||b&&!n.isFunction(b)&&b};return d.duration=n.fx.off?0:"number"==typeof d.duration?d.duration:d.duration in n.fx.speeds?n.fx.speeds[d.duration]:n.fx.speeds._default,(null==d.queue||d.queue===!0)&&(d.queue="fx"),d.old=d.complete,d.complete=function(){n.isFunction(d.old)&&d.old.call(this),d.queue&&n.dequeue(this,d.queue)},d},n.fn.extend({fadeTo:function(a,b,c,d){return this.filter(S).css("opacity",0).show().end().animate({opacity:b},a,c,d)},animate:function(a,b,c,d){var e=n.isEmptyObject(a),f=n.speed(b,c,d),g=function(){var b=Xa(this,n.extend({},a),f);(e||L.get(this,"finish"))&&b.stop(!0)};return g.finish=g,e||f.queue===!1?this.each(g):this.queue(f.queue,g)},stop:function(a,b,c){var d=function(a){var b=a.stop;delete a.stop,b(c)};return"string"!=typeof a&&(c=b,b=a,a=void 0),b&&a!==!1&&this.queue(a||"fx",[]),this.each(function(){var b=!0,e=null!=a&&a+"queueHooks",f=n.timers,g=L.get(this);if(e)g[e]&&g[e].stop&&d(g[e]);else for(e in g)g[e]&&g[e].stop&&Pa.test(e)&&d(g[e]);for(e=f.length;e--;)f[e].elem!==this||null!=a&&f[e].queue!==a||(f[e].anim.stop(c),b=!1,f.splice(e,1));(b||!c)&&n.dequeue(this,a)})},finish:function(a){return a!==!1&&(a=a||"fx"),this.each(function(){var b,c=L.get(this),d=c[a+"queue"],e=c[a+"queueHooks"],f=n.timers,g=d?d.length:0;for(c.finish=!0,n.queue(this,a,[]),e&&e.stop&&e.stop.call(this,!0),b=f.length;b--;)f[b].elem===this&&f[b].queue===a&&(f[b].anim.stop(!0),f.splice(b,1));for(b=0;g>b;b++)d[b]&&d[b].finish&&d[b].finish.call(this);delete c.finish})}}),n.each(["toggle","show","hide"],function(a,b){var c=n.fn[b];n.fn[b]=function(a,d,e){return null==a||"boolean"==typeof a?c.apply(this,arguments):this.animate(Ta(b,!0),a,d,e)}}),n.each({slideDown:Ta("show"),slideUp:Ta("hide"),slideToggle:Ta("toggle"),fadeIn:{opacity:"show"},fadeOut:{opacity:"hide"},fadeToggle:{opacity:"toggle"}},function(a,b){n.fn[a]=function(a,c,d){return this.animate(b,a,c,d)}}),n.timers=[],n.fx.tick=function(){var a,b=0,c=n.timers;for(La=n.now();b<c.length;b++)a=c[b],a()||c[b]!==a||c.splice(b--,1);c.length||n.fx.stop(),La=void 0},n.fx.timer=function(a){n.timers.push(a),a()?n.fx.start():n.timers.pop()},n.fx.interval=13,n.fx.start=function(){Ma||(Ma=setInterval(n.fx.tick,n.fx.interval))},n.fx.stop=function(){clearInterval(Ma),Ma=null},n.fx.speeds={slow:600,fast:200,_default:400},n.fn.delay=function(a,b){return a=n.fx?n.fx.speeds[a]||a:a,b=b||"fx",this.queue(b,function(b,c){var d=setTimeout(b,a);c.stop=function(){clearTimeout(d)}})},function(){var a=l.createElement("input"),b=l.createElement("select"),c=b.appendChild(l.createElement("option"));a.type="checkbox",k.checkOn=""!==a.value,k.optSelected=c.selected,b.disabled=!0,k.optDisabled=!c.disabled,a=l.createElement("input"),a.value="t",a.type="radio",k.radioValue="t"===a.value}();var Ya,Za,$a=n.expr.attrHandle;n.fn.extend({attr:function(a,b){return J(this,n.attr,a,b,arguments.length>1)},removeAttr:function(a){return this.each(function(){n.removeAttr(this,a)})}}),n.extend({attr:function(a,b,c){var d,e,f=a.nodeType;if(a&&3!==f&&8!==f&&2!==f)return typeof a.getAttribute===U?n.prop(a,b,c):(1===f&&n.isXMLDoc(a)||(b=b.toLowerCase(),d=n.attrHooks[b]||(n.expr.match.bool.test(b)?Za:Ya)),
void 0===c?d&&"get"in d&&null!==(e=d.get(a,b))?e:(e=n.find.attr(a,b),null==e?void 0:e):null!==c?d&&"set"in d&&void 0!==(e=d.set(a,c,b))?e:(a.setAttribute(b,c+""),c):void n.removeAttr(a,b))},removeAttr:function(a,b){var c,d,e=0,f=b&&b.match(E);if(f&&1===a.nodeType)while(c=f[e++])d=n.propFix[c]||c,n.expr.match.bool.test(c)&&(a[d]=!1),a.removeAttribute(c)},attrHooks:{type:{set:function(a,b){if(!k.radioValue&&"radio"===b&&n.nodeName(a,"input")){var c=a.value;return a.setAttribute("type",b),c&&(a.value=c),b}}}}}),Za={set:function(a,b,c){return b===!1?n.removeAttr(a,c):a.setAttribute(c,c),c}},n.each(n.expr.match.bool.source.match(/\w+/g),function(a,b){var c=$a[b]||n.find.attr;$a[b]=function(a,b,d){var e,f;return d||(f=$a[b],$a[b]=e,e=null!=c(a,b,d)?b.toLowerCase():null,$a[b]=f),e}});var _a=/^(?:input|select|textarea|button)$/i;n.fn.extend({prop:function(a,b){return J(this,n.prop,a,b,arguments.length>1)},removeProp:function(a){return this.each(function(){delete this[n.propFix[a]||a]})}}),n.extend({propFix:{"for":"htmlFor","class":"className"},prop:function(a,b,c){var d,e,f,g=a.nodeType;if(a&&3!==g&&8!==g&&2!==g)return f=1!==g||!n.isXMLDoc(a),f&&(b=n.propFix[b]||b,e=n.propHooks[b]),void 0!==c?e&&"set"in e&&void 0!==(d=e.set(a,c,b))?d:a[b]=c:e&&"get"in e&&null!==(d=e.get(a,b))?d:a[b]},propHooks:{tabIndex:{get:function(a){return a.hasAttribute("tabindex")||_a.test(a.nodeName)||a.href?a.tabIndex:-1}}}}),k.optSelected||(n.propHooks.selected={get:function(a){var b=a.parentNode;return b&&b.parentNode&&b.parentNode.selectedIndex,null}}),n.each(["tabIndex","readOnly","maxLength","cellSpacing","cellPadding","rowSpan","colSpan","useMap","frameBorder","contentEditable"],function(){n.propFix[this.toLowerCase()]=this});var ab=/[\t\r\n\f]/g;n.fn.extend({addClass:function(a){var b,c,d,e,f,g,h="string"==typeof a&&a,i=0,j=this.length;if(n.isFunction(a))return this.each(function(b){n(this).addClass(a.call(this,b,this.className))});if(h)for(b=(a||"").match(E)||[];j>i;i++)if(c=this[i],d=1===c.nodeType&&(c.className?(" "+c.className+" ").replace(ab," "):" ")){f=0;while(e=b[f++])d.indexOf(" "+e+" ")<0&&(d+=e+" ");g=n.trim(d),c.className!==g&&(c.className=g)}return this},removeClass:function(a){var b,c,d,e,f,g,h=0===arguments.length||"string"==typeof a&&a,i=0,j=this.length;if(n.isFunction(a))return this.each(function(b){n(this).removeClass(a.call(this,b,this.className))});if(h)for(b=(a||"").match(E)||[];j>i;i++)if(c=this[i],d=1===c.nodeType&&(c.className?(" "+c.className+" ").replace(ab," "):"")){f=0;while(e=b[f++])while(d.indexOf(" "+e+" ")>=0)d=d.replace(" "+e+" "," ");g=a?n.trim(d):"",c.className!==g&&(c.className=g)}return this},toggleClass:function(a,b){var c=typeof a;return"boolean"==typeof b&&"string"===c?b?this.addClass(a):this.removeClass(a):this.each(n.isFunction(a)?function(c){n(this).toggleClass(a.call(this,c,this.className,b),b)}:function(){if("string"===c){var b,d=0,e=n(this),f=a.match(E)||[];while(b=f[d++])e.hasClass(b)?e.removeClass(b):e.addClass(b)}else(c===U||"boolean"===c)&&(this.className&&L.set(this,"__className__",this.className),this.className=this.className||a===!1?"":L.get(this,"__className__")||"")})},hasClass:function(a){for(var b=" "+a+" ",c=0,d=this.length;d>c;c++)if(1===this[c].nodeType&&(" "+this[c].className+" ").replace(ab," ").indexOf(b)>=0)return!0;return!1}});var bb=/\r/g;n.fn.extend({val:function(a){var b,c,d,e=this[0];{if(arguments.length)return d=n.isFunction(a),this.each(function(c){var e;1===this.nodeType&&(e=d?a.call(this,c,n(this).val()):a,null==e?e="":"number"==typeof e?e+="":n.isArray(e)&&(e=n.map(e,function(a){return null==a?"":a+""})),b=n.valHooks[this.type]||n.valHooks[this.nodeName.toLowerCase()],b&&"set"in b&&void 0!==b.set(this,e,"value")||(this.value=e))});if(e)return b=n.valHooks[e.type]||n.valHooks[e.nodeName.toLowerCase()],b&&"get"in b&&void 0!==(c=b.get(e,"value"))?c:(c=e.value,"string"==typeof c?c.replace(bb,""):null==c?"":c)}}}),n.extend({valHooks:{option:{get:function(a){var b=n.find.attr(a,"value");return null!=b?b:n.trim(n.text(a))}},select:{get:function(a){for(var b,c,d=a.options,e=a.selectedIndex,f="select-one"===a.type||0>e,g=f?null:[],h=f?e+1:d.length,i=0>e?h:f?e:0;h>i;i++)if(c=d[i],!(!c.selected&&i!==e||(k.optDisabled?c.disabled:null!==c.getAttribute("disabled"))||c.parentNode.disabled&&n.nodeName(c.parentNode,"optgroup"))){if(b=n(c).val(),f)return b;g.push(b)}return g},set:function(a,b){var c,d,e=a.options,f=n.makeArray(b),g=e.length;while(g--)d=e[g],(d.selected=n.inArray(d.value,f)>=0)&&(c=!0);return c||(a.selectedIndex=-1),f}}}}),n.each(["radio","checkbox"],function(){n.valHooks[this]={set:function(a,b){return n.isArray(b)?a.checked=n.inArray(n(a).val(),b)>=0:void 0}},k.checkOn||(n.valHooks[this].get=function(a){return null===a.getAttribute("value")?"on":a.value})}),n.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "),function(a,b){n.fn[b]=function(a,c){return arguments.length>0?this.on(b,null,a,c):this.trigger(b)}}),n.fn.extend({hover:function(a,b){return this.mouseenter(a).mouseleave(b||a)},bind:function(a,b,c){return this.on(a,null,b,c)},unbind:function(a,b){return this.off(a,null,b)},delegate:function(a,b,c,d){return this.on(b,a,c,d)},undelegate:function(a,b,c){return 1===arguments.length?this.off(a,"**"):this.off(b,a||"**",c)}});var cb=n.now(),db=/\?/;n.parseJSON=function(a){return JSON.parse(a+"")},n.parseXML=function(a){var b,c;if(!a||"string"!=typeof a)return null;try{c=new DOMParser,b=c.parseFromString(a,"text/xml")}catch(d){b=void 0}return(!b||b.getElementsByTagName("parsererror").length)&&n.error("Invalid XML: "+a),b};var eb=/#.*$/,fb=/([?&])_=[^&]*/,gb=/^(.*?):[ \t]*([^\r\n]*)$/gm,hb=/^(?:about|app|app-storage|.+-extension|file|res|widget):$/,ib=/^(?:GET|HEAD)$/,jb=/^\/\//,kb=/^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/,lb={},mb={},nb="*/".concat("*"),ob=a.location.href,pb=kb.exec(ob.toLowerCase())||[];function qb(a){return function(b,c){"string"!=typeof b&&(c=b,b="*");var d,e=0,f=b.toLowerCase().match(E)||[];if(n.isFunction(c))while(d=f[e++])"+"===d[0]?(d=d.slice(1)||"*",(a[d]=a[d]||[]).unshift(c)):(a[d]=a[d]||[]).push(c)}}function rb(a,b,c,d){var e={},f=a===mb;function g(h){var i;return e[h]=!0,n.each(a[h]||[],function(a,h){var j=h(b,c,d);return"string"!=typeof j||f||e[j]?f?!(i=j):void 0:(b.dataTypes.unshift(j),g(j),!1)}),i}return g(b.dataTypes[0])||!e["*"]&&g("*")}function sb(a,b){var c,d,e=n.ajaxSettings.flatOptions||{};for(c in b)void 0!==b[c]&&((e[c]?a:d||(d={}))[c]=b[c]);return d&&n.extend(!0,a,d),a}function tb(a,b,c){var d,e,f,g,h=a.contents,i=a.dataTypes;while("*"===i[0])i.shift(),void 0===d&&(d=a.mimeType||b.getResponseHeader("Content-Type"));if(d)for(e in h)if(h[e]&&h[e].test(d)){i.unshift(e);break}if(i[0]in c)f=i[0];else{for(e in c){if(!i[0]||a.converters[e+" "+i[0]]){f=e;break}g||(g=e)}f=f||g}return f?(f!==i[0]&&i.unshift(f),c[f]):void 0}function ub(a,b,c,d){var e,f,g,h,i,j={},k=a.dataTypes.slice();if(k[1])for(g in a.converters)j[g.toLowerCase()]=a.converters[g];f=k.shift();while(f)if(a.responseFields[f]&&(c[a.responseFields[f]]=b),!i&&d&&a.dataFilter&&(b=a.dataFilter(b,a.dataType)),i=f,f=k.shift())if("*"===f)f=i;else if("*"!==i&&i!==f){if(g=j[i+" "+f]||j["* "+f],!g)for(e in j)if(h=e.split(" "),h[1]===f&&(g=j[i+" "+h[0]]||j["* "+h[0]])){g===!0?g=j[e]:j[e]!==!0&&(f=h[0],k.unshift(h[1]));break}if(g!==!0)if(g&&a["throws"])b=g(b);else try{b=g(b)}catch(l){return{state:"parsererror",error:g?l:"No conversion from "+i+" to "+f}}}return{state:"success",data:b}}n.extend({active:0,lastModified:{},etag:{},ajaxSettings:{url:ob,type:"GET",isLocal:hb.test(pb[1]),global:!0,processData:!0,async:!0,contentType:"application/x-www-form-urlencoded; charset=UTF-8",accepts:{"*":nb,text:"text/plain",html:"text/html",xml:"application/xml, text/xml",json:"application/json, text/javascript"},contents:{xml:/xml/,html:/html/,json:/json/},responseFields:{xml:"responseXML",text:"responseText",json:"responseJSON"},converters:{"* text":String,"text html":!0,"text json":n.parseJSON,"text xml":n.parseXML},flatOptions:{url:!0,context:!0}},ajaxSetup:function(a,b){return b?sb(sb(a,n.ajaxSettings),b):sb(n.ajaxSettings,a)},ajaxPrefilter:qb(lb),ajaxTransport:qb(mb),ajax:function(a,b){"object"==typeof a&&(b=a,a=void 0),b=b||{};var c,d,e,f,g,h,i,j,k=n.ajaxSetup({},b),l=k.context||k,m=k.context&&(l.nodeType||l.jquery)?n(l):n.event,o=n.Deferred(),p=n.Callbacks("once memory"),q=k.statusCode||{},r={},s={},t=0,u="canceled",v={readyState:0,getResponseHeader:function(a){var b;if(2===t){if(!f){f={};while(b=gb.exec(e))f[b[1].toLowerCase()]=b[2]}b=f[a.toLowerCase()]}return null==b?null:b},getAllResponseHeaders:function(){return 2===t?e:null},setRequestHeader:function(a,b){var c=a.toLowerCase();return t||(a=s[c]=s[c]||a,r[a]=b),this},overrideMimeType:function(a){return t||(k.mimeType=a),this},statusCode:function(a){var b;if(a)if(2>t)for(b in a)q[b]=[q[b],a[b]];else v.always(a[v.status]);return this},abort:function(a){var b=a||u;return c&&c.abort(b),x(0,b),this}};if(o.promise(v).complete=p.add,v.success=v.done,v.error=v.fail,k.url=((a||k.url||ob)+"").replace(eb,"").replace(jb,pb[1]+"//"),k.type=b.method||b.type||k.method||k.type,k.dataTypes=n.trim(k.dataType||"*").toLowerCase().match(E)||[""],null==k.crossDomain&&(h=kb.exec(k.url.toLowerCase()),k.crossDomain=!(!h||h[1]===pb[1]&&h[2]===pb[2]&&(h[3]||("http:"===h[1]?"80":"443"))===(pb[3]||("http:"===pb[1]?"80":"443")))),k.data&&k.processData&&"string"!=typeof k.data&&(k.data=n.param(k.data,k.traditional)),rb(lb,k,b,v),2===t)return v;i=n.event&&k.global,i&&0===n.active++&&n.event.trigger("ajaxStart"),k.type=k.type.toUpperCase(),k.hasContent=!ib.test(k.type),d=k.url,k.hasContent||(k.data&&(d=k.url+=(db.test(d)?"&":"?")+k.data,delete k.data),k.cache===!1&&(k.url=fb.test(d)?d.replace(fb,"$1_="+cb++):d+(db.test(d)?"&":"?")+"_="+cb++)),k.ifModified&&(n.lastModified[d]&&v.setRequestHeader("If-Modified-Since",n.lastModified[d]),n.etag[d]&&v.setRequestHeader("If-None-Match",n.etag[d])),(k.data&&k.hasContent&&k.contentType!==!1||b.contentType)&&v.setRequestHeader("Content-Type",k.contentType),v.setRequestHeader("Accept",k.dataTypes[0]&&k.accepts[k.dataTypes[0]]?k.accepts[k.dataTypes[0]]+("*"!==k.dataTypes[0]?", "+nb+"; q=0.01":""):k.accepts["*"]);for(j in k.headers)v.setRequestHeader(j,k.headers[j]);if(k.beforeSend&&(k.beforeSend.call(l,v,k)===!1||2===t))return v.abort();u="abort";for(j in{success:1,error:1,complete:1})v[j](k[j]);if(c=rb(mb,k,b,v)){v.readyState=1,i&&m.trigger("ajaxSend",[v,k]),k.async&&k.timeout>0&&(g=setTimeout(function(){v.abort("timeout")},k.timeout));try{t=1,c.send(r,x)}catch(w){if(!(2>t))throw w;x(-1,w)}}else x(-1,"No Transport");function x(a,b,f,h){var j,r,s,u,w,x=b;2!==t&&(t=2,g&&clearTimeout(g),c=void 0,e=h||"",v.readyState=a>0?4:0,j=a>=200&&300>a||304===a,f&&(u=tb(k,v,f)),u=ub(k,u,v,j),j?(k.ifModified&&(w=v.getResponseHeader("Last-Modified"),w&&(n.lastModified[d]=w),w=v.getResponseHeader("etag"),w&&(n.etag[d]=w)),204===a||"HEAD"===k.type?x="nocontent":304===a?x="notmodified":(x=u.state,r=u.data,s=u.error,j=!s)):(s=x,(a||!x)&&(x="error",0>a&&(a=0))),v.status=a,v.statusText=(b||x)+"",j?o.resolveWith(l,[r,x,v]):o.rejectWith(l,[v,x,s]),v.statusCode(q),q=void 0,i&&m.trigger(j?"ajaxSuccess":"ajaxError",[v,k,j?r:s]),p.fireWith(l,[v,x]),i&&(m.trigger("ajaxComplete",[v,k]),--n.active||n.event.trigger("ajaxStop")))}return v},getJSON:function(a,b,c){return n.get(a,b,c,"json")},getScript:function(a,b){return n.get(a,void 0,b,"script")}}),n.each(["get","post"],function(a,b){n[b]=function(a,c,d,e){return n.isFunction(c)&&(e=e||d,d=c,c=void 0),n.ajax({url:a,type:b,dataType:e,data:c,success:d})}}),n._evalUrl=function(a){return n.ajax({url:a,type:"GET",dataType:"script",async:!1,global:!1,"throws":!0})},n.fn.extend({wrapAll:function(a){var b;return n.isFunction(a)?this.each(function(b){n(this).wrapAll(a.call(this,b))}):(this[0]&&(b=n(a,this[0].ownerDocument).eq(0).clone(!0),this[0].parentNode&&b.insertBefore(this[0]),b.map(function(){var a=this;while(a.firstElementChild)a=a.firstElementChild;return a}).append(this)),this)},wrapInner:function(a){return this.each(n.isFunction(a)?function(b){n(this).wrapInner(a.call(this,b))}:function(){var b=n(this),c=b.contents();c.length?c.wrapAll(a):b.append(a)})},wrap:function(a){var b=n.isFunction(a);return this.each(function(c){n(this).wrapAll(b?a.call(this,c):a)})},unwrap:function(){return this.parent().each(function(){n.nodeName(this,"body")||n(this).replaceWith(this.childNodes)}).end()}}),n.expr.filters.hidden=function(a){return a.offsetWidth<=0&&a.offsetHeight<=0},n.expr.filters.visible=function(a){return!n.expr.filters.hidden(a)};var vb=/%20/g,wb=/\[\]$/,xb=/\r?\n/g,yb=/^(?:submit|button|image|reset|file)$/i,zb=/^(?:input|select|textarea|keygen)/i;function Ab(a,b,c,d){var e;if(n.isArray(b))n.each(b,function(b,e){c||wb.test(a)?d(a,e):Ab(a+"["+("object"==typeof e?b:"")+"]",e,c,d)});else if(c||"object"!==n.type(b))d(a,b);else for(e in b)Ab(a+"["+e+"]",b[e],c,d)}n.param=function(a,b){var c,d=[],e=function(a,b){b=n.isFunction(b)?b():null==b?"":b,d[d.length]=encodeURIComponent(a)+"="+encodeURIComponent(b)};if(void 0===b&&(b=n.ajaxSettings&&n.ajaxSettings.traditional),n.isArray(a)||a.jquery&&!n.isPlainObject(a))n.each(a,function(){e(this.name,this.value)});else for(c in a)Ab(c,a[c],b,e);return d.join("&").replace(vb,"+")},n.fn.extend({serialize:function(){return n.param(this.serializeArray())},serializeArray:function(){return this.map(function(){var a=n.prop(this,"elements");return a?n.makeArray(a):this}).filter(function(){var a=this.type;return this.name&&!n(this).is(":disabled")&&zb.test(this.nodeName)&&!yb.test(a)&&(this.checked||!T.test(a))}).map(function(a,b){var c=n(this).val();return null==c?null:n.isArray(c)?n.map(c,function(a){return{name:b.name,value:a.replace(xb,"\r\n")}}):{name:b.name,value:c.replace(xb,"\r\n")}}).get()}}),n.ajaxSettings.xhr=function(){try{return new XMLHttpRequest}catch(a){}};var Bb=0,Cb={},Db={0:200,1223:204},Eb=n.ajaxSettings.xhr();a.attachEvent&&a.attachEvent("onunload",function(){for(var a in Cb)Cb[a]()}),k.cors=!!Eb&&"withCredentials"in Eb,k.ajax=Eb=!!Eb,n.ajaxTransport(function(a){var b;return k.cors||Eb&&!a.crossDomain?{send:function(c,d){var e,f=a.xhr(),g=++Bb;if(f.open(a.type,a.url,a.async,a.username,a.password),a.xhrFields)for(e in a.xhrFields)f[e]=a.xhrFields[e];a.mimeType&&f.overrideMimeType&&f.overrideMimeType(a.mimeType),a.crossDomain||c["X-Requested-With"]||(c["X-Requested-With"]="XMLHttpRequest");for(e in c)f.setRequestHeader(e,c[e]);b=function(a){return function(){b&&(delete Cb[g],b=f.onload=f.onerror=null,"abort"===a?f.abort():"error"===a?d(f.status,f.statusText):d(Db[f.status]||f.status,f.statusText,"string"==typeof f.responseText?{text:f.responseText}:void 0,f.getAllResponseHeaders()))}},f.onload=b(),f.onerror=b("error"),b=Cb[g]=b("abort");try{f.send(a.hasContent&&a.data||null)}catch(h){if(b)throw h}},abort:function(){b&&b()}}:void 0}),n.ajaxSetup({accepts:{script:"text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"},contents:{script:/(?:java|ecma)script/},converters:{"text script":function(a){return n.globalEval(a),a}}}),n.ajaxPrefilter("script",function(a){void 0===a.cache&&(a.cache=!1),a.crossDomain&&(a.type="GET")}),n.ajaxTransport("script",function(a){if(a.crossDomain){var b,c;return{send:function(d,e){b=n("<script>").prop({async:!0,charset:a.scriptCharset,src:a.url}).on("load error",c=function(a){b.remove(),c=null,a&&e("error"===a.type?404:200,a.type)}),l.head.appendChild(b[0])},abort:function(){c&&c()}}}});var Fb=[],Gb=/(=)\?(?=&|$)|\?\?/;n.ajaxSetup({jsonp:"callback",jsonpCallback:function(){var a=Fb.pop()||n.expando+"_"+cb++;return this[a]=!0,a}}),n.ajaxPrefilter("json jsonp",function(b,c,d){var e,f,g,h=b.jsonp!==!1&&(Gb.test(b.url)?"url":"string"==typeof b.data&&!(b.contentType||"").indexOf("application/x-www-form-urlencoded")&&Gb.test(b.data)&&"data");return h||"jsonp"===b.dataTypes[0]?(e=b.jsonpCallback=n.isFunction(b.jsonpCallback)?b.jsonpCallback():b.jsonpCallback,h?b[h]=b[h].replace(Gb,"$1"+e):b.jsonp!==!1&&(b.url+=(db.test(b.url)?"&":"?")+b.jsonp+"="+e),b.converters["script json"]=function(){return g||n.error(e+" was not called"),g[0]},b.dataTypes[0]="json",f=a[e],a[e]=function(){g=arguments},d.always(function(){a[e]=f,b[e]&&(b.jsonpCallback=c.jsonpCallback,Fb.push(e)),g&&n.isFunction(f)&&f(g[0]),g=f=void 0}),"script"):void 0}),n.parseHTML=function(a,b,c){if(!a||"string"!=typeof a)return null;"boolean"==typeof b&&(c=b,b=!1),b=b||l;var d=v.exec(a),e=!c&&[];return d?[b.createElement(d[1])]:(d=n.buildFragment([a],b,e),e&&e.length&&n(e).remove(),n.merge([],d.childNodes))};var Hb=n.fn.load;n.fn.load=function(a,b,c){if("string"!=typeof a&&Hb)return Hb.apply(this,arguments);var d,e,f,g=this,h=a.indexOf(" ");return h>=0&&(d=n.trim(a.slice(h)),a=a.slice(0,h)),n.isFunction(b)?(c=b,b=void 0):b&&"object"==typeof b&&(e="POST"),g.length>0&&n.ajax({url:a,type:e,dataType:"html",data:b}).done(function(a){f=arguments,g.html(d?n("<div>").append(n.parseHTML(a)).find(d):a)}).complete(c&&function(a,b){g.each(c,f||[a.responseText,b,a])}),this},n.each(["ajaxStart","ajaxStop","ajaxComplete","ajaxError","ajaxSuccess","ajaxSend"],function(a,b){n.fn[b]=function(a){return this.on(b,a)}}),n.expr.filters.animated=function(a){return n.grep(n.timers,function(b){return a===b.elem}).length};var Ib=a.document.documentElement;function Jb(a){return n.isWindow(a)?a:9===a.nodeType&&a.defaultView}n.offset={setOffset:function(a,b,c){var d,e,f,g,h,i,j,k=n.css(a,"position"),l=n(a),m={};"static"===k&&(a.style.position="relative"),h=l.offset(),f=n.css(a,"top"),i=n.css(a,"left"),j=("absolute"===k||"fixed"===k)&&(f+i).indexOf("auto")>-1,j?(d=l.position(),g=d.top,e=d.left):(g=parseFloat(f)||0,e=parseFloat(i)||0),n.isFunction(b)&&(b=b.call(a,c,h)),null!=b.top&&(m.top=b.top-h.top+g),null!=b.left&&(m.left=b.left-h.left+e),"using"in b?b.using.call(a,m):l.css(m)}},n.fn.extend({offset:function(a){if(arguments.length)return void 0===a?this:this.each(function(b){n.offset.setOffset(this,a,b)});var b,c,d=this[0],e={top:0,left:0},f=d&&d.ownerDocument;if(f)return b=f.documentElement,n.contains(b,d)?(typeof d.getBoundingClientRect!==U&&(e=d.getBoundingClientRect()),c=Jb(f),{top:e.top+c.pageYOffset-b.clientTop,left:e.left+c.pageXOffset-b.clientLeft}):e},position:function(){if(this[0]){var a,b,c=this[0],d={top:0,left:0};return"fixed"===n.css(c,"position")?b=c.getBoundingClientRect():(a=this.offsetParent(),b=this.offset(),n.nodeName(a[0],"html")||(d=a.offset()),d.top+=n.css(a[0],"borderTopWidth",!0),d.left+=n.css(a[0],"borderLeftWidth",!0)),{top:b.top-d.top-n.css(c,"marginTop",!0),left:b.left-d.left-n.css(c,"marginLeft",!0)}}},offsetParent:function(){return this.map(function(){var a=this.offsetParent||Ib;while(a&&!n.nodeName(a,"html")&&"static"===n.css(a,"position"))a=a.offsetParent;return a||Ib})}}),n.each({scrollLeft:"pageXOffset",scrollTop:"pageYOffset"},function(b,c){var d="pageYOffset"===c;n.fn[b]=function(e){return J(this,function(b,e,f){var g=Jb(b);return void 0===f?g?g[c]:b[e]:void(g?g.scrollTo(d?a.pageXOffset:f,d?f:a.pageYOffset):b[e]=f)},b,e,arguments.length,null)}}),n.each(["top","left"],function(a,b){n.cssHooks[b]=ya(k.pixelPosition,function(a,c){return c?(c=xa(a,b),va.test(c)?n(a).position()[b]+"px":c):void 0})}),n.each({Height:"height",Width:"width"},function(a,b){n.each({padding:"inner"+a,content:b,"":"outer"+a},function(c,d){n.fn[d]=function(d,e){var f=arguments.length&&(c||"boolean"!=typeof d),g=c||(d===!0||e===!0?"margin":"border");return J(this,function(b,c,d){var e;return n.isWindow(b)?b.document.documentElement["client"+a]:9===b.nodeType?(e=b.documentElement,Math.max(b.body["scroll"+a],e["scroll"+a],b.body["offset"+a],e["offset"+a],e["client"+a])):void 0===d?n.css(b,c,g):n.style(b,c,d,g)},b,f?d:void 0,f,null)}})}),n.fn.size=function(){return this.length},n.fn.andSelf=n.fn.addBack,"function"==typeof define&&define.amd&&define("jquery",[],function(){return n});var Kb=a.jQuery,Lb=a.$;return n.noConflict=function(b){return a.$===n&&(a.$=Lb),b&&a.jQuery===n&&(a.jQuery=Kb),n},typeof b===U&&(a.jQuery=a.$=n),n});
//# sourceMappingURL=jquery.min.map
/*!
 * jQuery Internationalization library
 *
 * Copyright (C) 2012 Santhosh Thottingal
 *
 * jquery.i18n is dual licensed GPLv2 or later and MIT. You don't have to do
 * anything special to choose one license or the other and you don't have to
 * notify anyone which license you are using. You are free to use
 * UniversalLanguageSelector in commercial projects as long as the copyright
 * header is left intact. See files GPL-LICENSE and MIT-LICENSE for details.
 *
 * @licence GNU General Public Licence 2.0 or later
 * @licence MIT License
 */

( function ( $ ) {
	'use strict';

	var nav, I18N,
		slice = Array.prototype.slice;
	/**
	 * @constructor
	 * @param {Object} options
	 */
	I18N = function ( options ) {
		// Load defaults
		this.options = $.extend( {}, I18N.defaults, options );

		this.parser = this.options.parser;
		this.locale = this.options.locale;
		this.messageStore = this.options.messageStore;
		this.languages = {};

		this.init();
	};

	I18N.prototype = {
		/**
		 * Initialize by loading locales and setting up
		 * String.prototype.toLocaleString and String.locale.
		 */
		init: function () {
			var i18n = this;

			// Set locale of String environment
			String.locale = i18n.locale;

			// Override String.localeString method
			String.prototype.toLocaleString = function () {
				var localeParts, localePartIndex, value, locale, fallbackIndex,
					tryingLocale, message;

				value = this.valueOf();
				locale = i18n.locale;
				fallbackIndex = 0;

				while ( locale ) {
					// Iterate through locales starting at most-specific until
					// localization is found. As in fi-Latn-FI, fi-Latn and fi.
					localeParts = locale.split( '-' );
					localePartIndex = localeParts.length;

					do {
						tryingLocale = localeParts.slice( 0, localePartIndex ).join( '-' );
						message = i18n.messageStore.get( tryingLocale, value );

						if ( message ) {
							return message;
						}

						localePartIndex--;
					} while ( localePartIndex );

					if ( locale === 'en' ) {
						break;
					}

					locale = ( $.i18n.fallbacks[ i18n.locale ] && $.i18n.fallbacks[ i18n.locale ][ fallbackIndex ] ) ||
						i18n.options.fallbackLocale;
					$.i18n.log( 'Trying fallback locale for ' + i18n.locale + ': ' + locale );

					fallbackIndex++;
				}

				// key not found
				return '';
			};
		},

		/*
		 * Destroy the i18n instance.
		 */
		destroy: function () {
			$.removeData( document, 'i18n' );
		},

		/**
		 * General message loading API This can take a URL string for
		 * the json formatted messages. Example:
		 * <code>load('path/to/all_localizations.json');</code>
		 *
		 * To load a localization file for a locale:
		 * <code>
		 * load('path/to/de-messages.json', 'de' );
		 * </code>
		 *
		 * To load a localization file from a directory:
		 * <code>
		 * load('path/to/i18n/directory', 'de' );
		 * </code>
		 * The above method has the advantage of fallback resolution.
		 * ie, it will automatically load the fallback locales for de.
		 * For most usecases, this is the recommended method.
		 * It is optional to have trailing slash at end.
		 *
		 * A data object containing message key- message translation mappings
		 * can also be passed. Example:
		 * <code>
		 * load( { 'hello' : 'Hello' }, optionalLocale );
		 * </code>
		 *
		 * A source map containing key-value pair of languagename and locations
		 * can also be passed. Example:
		 * <code>
		 * load( {
		 * bn: 'i18n/bn.json',
		 * he: 'i18n/he.json',
		 * en: 'i18n/en.json'
		 * } )
		 * </code>
		 *
		 * If the data argument is null/undefined/false,
		 * all cached messages for the i18n instance will get reset.
		 *
		 * @param {string|Object} source
		 * @param {string} locale Language tag
		 * @return {jQuery.Promise}
		 */
		load: function ( source, locale ) {
			var fallbackLocales, locIndex, fallbackLocale, sourceMap = {};
			if ( !source && !locale ) {
				source = 'i18n/' + $.i18n().locale + '.json';
				locale = $.i18n().locale;
			}
			if ( typeof source === 'string'	&&
				source.split( '.' ).pop() !== 'json'
			) {
				// Load specified locale then check for fallbacks when directory is specified in load()
				sourceMap[ locale ] = source + '/' + locale + '.json';
				fallbackLocales = ( $.i18n.fallbacks[ locale ] || [] )
					.concat( this.options.fallbackLocale );
				for ( locIndex in fallbackLocales ) {
					fallbackLocale = fallbackLocales[ locIndex ];
					sourceMap[ fallbackLocale ] = source + '/' + fallbackLocale + '.json';
				}
				return this.load( sourceMap );
			} else {
				return this.messageStore.load( source, locale );
			}

		},

		/**
		 * Does parameter and magic word substitution.
		 *
		 * @param {string} key Message key
		 * @param {Array} parameters Message parameters
		 * @return {string}
		 */
		parse: function ( key, parameters ) {
			var message = key.toLocaleString();
			// FIXME: This changes the state of the I18N object,
			// should probably not change the 'this.parser' but just
			// pass it to the parser.
			this.parser.language = $.i18n.languages[ $.i18n().locale ] || $.i18n.languages[ 'default' ];
			if ( message === '' ) {
				message = key;
			}
			return this.parser.parse( message, parameters );
		}
	};

	/**
	 * Process a message from the $.I18N instance
	 * for the current document, stored in jQuery.data(document).
	 *
	 * @param {string} key Key of the message.
	 * @param {string} param1 [param...] Variadic list of parameters for {key}.
	 * @return {string|$.I18N} Parsed message, or if no key was given
	 * the instance of $.I18N is returned.
	 */
	$.i18n = function ( key, param1 ) {
		var parameters,
			i18n = $.data( document, 'i18n' ),
			options = typeof key === 'object' && key;

		// If the locale option for this call is different then the setup so far,
		// update it automatically. This doesn't just change the context for this
		// call but for all future call as well.
		// If there is no i18n setup yet, don't do this. It will be taken care of
		// by the `new I18N` construction below.
		// NOTE: It should only change language for this one call.
		// Then cache instances of I18N somewhere.
		if ( options && options.locale && i18n && i18n.locale !== options.locale ) {
			String.locale = i18n.locale = options.locale;
		}

		if ( !i18n ) {
			i18n = new I18N( options );
			$.data( document, 'i18n', i18n );
		}

		if ( typeof key === 'string' ) {
			if ( param1 !== undefined ) {
				parameters = slice.call( arguments, 1 );
			} else {
				parameters = [];
			}

			return i18n.parse( key, parameters );
		} else {
			// FIXME: remove this feature/bug.
			return i18n;
		}
	};

	$.fn.i18n = function () {
		var i18n = $.data( document, 'i18n' );

		if ( !i18n ) {
			i18n = new I18N();
			$.data( document, 'i18n', i18n );
		}
		String.locale = i18n.locale;
		return this.each( function () {
			var $this = $( this ),
				messageKey = $this.data( 'i18n' );

			if ( messageKey ) {
				$this.text( i18n.parse( messageKey ) );
			} else {
				$this.find( '[data-i18n]' ).i18n();
			}
		} );
	};

	String.locale = String.locale || $( 'html' ).attr( 'lang' );

	if ( !String.locale ) {
		if ( typeof window.navigator !== undefined ) {
			nav = window.navigator;
			String.locale = nav.language || nav.userLanguage || '';
		} else {
			String.locale = '';
		}
	}

	$.i18n.languages = {};
	$.i18n.messageStore = $.i18n.messageStore || {};
	$.i18n.parser = {
		// The default parser only handles variable substitution
		parse: function ( message, parameters ) {
			return message.replace( /\$(\d+)/g, function ( str, match ) {
				var index = parseInt( match, 10 ) - 1;
				return parameters[ index ] !== undefined ? parameters[ index ] : '$' + match;
			} );
		},
		emitter: {}
	};
	$.i18n.fallbacks = {};
	$.i18n.debug = false;
	$.i18n.log = function ( /* arguments */ ) {
		if ( window.console && $.i18n.debug ) {
			window.console.log.apply( window.console, arguments );
		}
	};
	/* Static members */
	I18N.defaults = {
		locale: String.locale,
		fallbackLocale: 'en',
		parser: $.i18n.parser,
		messageStore: $.i18n.messageStore
	};

	// Expose constructor
	$.i18n.constructor = I18N;
}( jQuery ) );

/*!
 * jQuery Internationalization library - Message Store
 *
 * Copyright (C) 2012 Santhosh Thottingal
 *
 * jquery.i18n is dual licensed GPLv2 or later and MIT. You don't have to do anything special to
 * choose one license or the other and you don't have to notify anyone which license you are using.
 * You are free to use UniversalLanguageSelector in commercial projects as long as the copyright
 * header is left intact. See files GPL-LICENSE and MIT-LICENSE for details.
 *
 * @licence GNU General Public Licence 2.0 or later
 * @licence MIT License
 */

( function ( $, window, undefined ) {
	'use strict';

	var MessageStore = function () {
		this.messages = {};
		this.sources = {};
	};

	/**
	 * See https://github.com/wikimedia/jquery.i18n/wiki/Specification#wiki-Message_File_Loading
	 */
	MessageStore.prototype = {

		/**
		 * General message loading API This can take a URL string for
		 * the json formatted messages.
		 * <code>load('path/to/all_localizations.json');</code>
		 *
		 * This can also load a localization file for a locale <code>
		 * load( 'path/to/de-messages.json', 'de' );
		 * </code>
		 * A data object containing message key- message translation mappings
		 * can also be passed Eg:
		 * <code>
		 * load( { 'hello' : 'Hello' }, optionalLocale );
		 * </code> If the data argument is
		 * null/undefined/false,
		 * all cached messages for the i18n instance will get reset.
		 *
		 * @param {string|Object} source
		 * @param {string} locale Language tag
		 * @return {jQuery.Promise}
		 */
		load: function ( source, locale ) {
			var key = null,
				deferred = null,
				deferreds = [],
				messageStore = this;

			if ( typeof source === 'string' ) {
				// This is a URL to the messages file.
				$.i18n.log( 'Loading messages from: ' + source );
				deferred = jsonMessageLoader( source )
					.done( function ( localization ) {
						messageStore.set( locale, localization );
					} );

				return deferred.promise();
			}

			if ( locale ) {
				// source is an key-value pair of messages for given locale
				messageStore.set( locale, source );

				return $.Deferred().resolve();
			} else {
				// source is a key-value pair of locales and their source
				for ( key in source ) {
					if ( Object.prototype.hasOwnProperty.call( source, key ) ) {
						locale = key;
						// No {locale} given, assume data is a group of languages,
						// call this function again for each language.
						deferreds.push( messageStore.load( source[ key ], locale ) );
					}
				}
				return $.when.apply( $, deferreds );
			}

		},

		/**
		 * Set messages to the given locale.
		 * If locale exists, add messages to the locale.
		 *
		 * @param {string} locale
		 * @param {Object} messages
		 */
		set: function ( locale, messages ) {
			if ( !this.messages[ locale ] ) {
				this.messages[ locale ] = messages;
			} else {
				this.messages[ locale ] = $.extend( this.messages[ locale ], messages );
			}
		},

		/**
		 *
		 * @param {string} locale
		 * @param {string} messageKey
		 * @return {boolean}
		 */
		get: function ( locale, messageKey ) {
			return this.messages[ locale ] && this.messages[ locale ][ messageKey ];
		}
	};

	function jsonMessageLoader( url ) {
		var deferred = $.Deferred();

		$.getJSON( url )
			.done( deferred.resolve )
			.fail( function ( jqxhr, settings, exception ) {
				$.i18n.log( 'Error in loading messages from ' + url + ' Exception: ' + exception );
				// Ignore 404 exception, because we are handling fallabacks explicitly
				deferred.resolve();
			} );

		return deferred.promise();
	}

	$.extend( $.i18n.messageStore, new MessageStore() );
}( jQuery, window ) );

/*!
 * jQuery Internationalization library
 *
 * Copyright (C) 2011-2013 Santhosh Thottingal, Neil Kandalgaonkar
 *
 * jquery.i18n is dual licensed GPLv2 or later and MIT. You don't have to do
 * anything special to choose one license or the other and you don't have to
 * notify anyone which license you are using. You are free to use
 * UniversalLanguageSelector in commercial projects as long as the copyright
 * header is left intact. See files GPL-LICENSE and MIT-LICENSE for details.
 *
 * @licence GNU General Public Licence 2.0 or later
 * @licence MIT License
 */

( function ( $ ) {
	'use strict';

	var MessageParser = function ( options ) {
		this.options = $.extend( {}, $.i18n.parser.defaults, options );
		this.language = $.i18n.languages[ String.locale ] || $.i18n.languages[ 'default' ];
		this.emitter = $.i18n.parser.emitter;
	};

	MessageParser.prototype = {

		constructor: MessageParser,

		simpleParse: function ( message, parameters ) {
			return message.replace( /\$(\d+)/g, function ( str, match ) {
				var index = parseInt( match, 10 ) - 1;

				return parameters[ index ] !== undefined ? parameters[ index ] : '$' + match;
			} );
		},

		parse: function ( message, replacements ) {
			if ( message.indexOf( '{{' ) < 0 ) {
				return this.simpleParse( message, replacements );
			}

			this.emitter.language = $.i18n.languages[ $.i18n().locale ] ||
				$.i18n.languages[ 'default' ];

			return this.emitter.emit( this.ast( message ), replacements );
		},

		ast: function ( message ) {
			var pipe, colon, backslash, anyCharacter, dollar, digits, regularLiteral,
				regularLiteralWithoutBar, regularLiteralWithoutSpace, escapedOrLiteralWithoutBar,
				escapedOrRegularLiteral, templateContents, templateName, openTemplate,
				closeTemplate, expression, paramExpression, result,
				pos = 0;

			// Try parsers until one works, if none work return null
			function choice( parserSyntax ) {
				return function () {
					var i, result;

					for ( i = 0; i < parserSyntax.length; i++ ) {
						result = parserSyntax[ i ]();

						if ( result !== null ) {
							return result;
						}
					}

					return null;
				};
			}

			// Try several parserSyntax-es in a row.
			// All must succeed; otherwise, return null.
			// This is the only eager one.
			function sequence( parserSyntax ) {
				var i, res,
					originalPos = pos,
					result = [];

				for ( i = 0; i < parserSyntax.length; i++ ) {
					res = parserSyntax[ i ]();

					if ( res === null ) {
						pos = originalPos;

						return null;
					}

					result.push( res );
				}

				return result;
			}

			// Run the same parser over and over until it fails.
			// Must succeed a minimum of n times; otherwise, return null.
			function nOrMore( n, p ) {
				return function () {
					var originalPos = pos,
						result = [],
						parsed = p();

					while ( parsed !== null ) {
						result.push( parsed );
						parsed = p();
					}

					if ( result.length < n ) {
						pos = originalPos;

						return null;
					}

					return result;
				};
			}

			// Helpers -- just make parserSyntax out of simpler JS builtin types

			function makeStringParser( s ) {
				var len = s.length;

				return function () {
					var result = null;

					if ( message.substr( pos, len ) === s ) {
						result = s;
						pos += len;
					}

					return result;
				};
			}

			function makeRegexParser( regex ) {
				return function () {
					var matches = message.substr( pos ).match( regex );

					if ( matches === null ) {
						return null;
					}

					pos += matches[ 0 ].length;

					return matches[ 0 ];
				};
			}

			pipe = makeStringParser( '|' );
			colon = makeStringParser( ':' );
			backslash = makeStringParser( '\\' );
			anyCharacter = makeRegexParser( /^./ );
			dollar = makeStringParser( '$' );
			digits = makeRegexParser( /^\d+/ );
			regularLiteral = makeRegexParser( /^[^{}\[\]$\\]/ );
			regularLiteralWithoutBar = makeRegexParser( /^[^{}\[\]$\\|]/ );
			regularLiteralWithoutSpace = makeRegexParser( /^[^{}\[\]$\s]/ );

			// There is a general pattern:
			// parse a thing;
			// if it worked, apply transform,
			// otherwise return null.
			// But using this as a combinator seems to cause problems
			// when combined with nOrMore().
			// May be some scoping issue.
			function transform( p, fn ) {
				return function () {
					var result = p();

					return result === null ? null : fn( result );
				};
			}

			// Used to define "literals" within template parameters. The pipe
			// character is the parameter delimeter, so by default
			// it is not a literal in the parameter
			function literalWithoutBar() {
				var result = nOrMore( 1, escapedOrLiteralWithoutBar )();

				return result === null ? null : result.join( '' );
			}

			function literal() {
				var result = nOrMore( 1, escapedOrRegularLiteral )();

				return result === null ? null : result.join( '' );
			}

			function escapedLiteral() {
				var result = sequence( [ backslash, anyCharacter ] );

				return result === null ? null : result[ 1 ];
			}

			choice( [ escapedLiteral, regularLiteralWithoutSpace ] );
			escapedOrLiteralWithoutBar = choice( [ escapedLiteral, regularLiteralWithoutBar ] );
			escapedOrRegularLiteral = choice( [ escapedLiteral, regularLiteral ] );

			function replacement() {
				var result = sequence( [ dollar, digits ] );

				if ( result === null ) {
					return null;
				}

				return [ 'REPLACE', parseInt( result[ 1 ], 10 ) - 1 ];
			}

			templateName = transform(
				// see $wgLegalTitleChars
				// not allowing : due to the need to catch "PLURAL:$1"
				makeRegexParser( /^[ !"$&'()*,.\/0-9;=?@A-Z\^_`a-z~\x80-\xFF+\-]+/ ),

				function ( result ) {
					return result.toString();
				}
			);

			function templateParam() {
				var expr,
					result = sequence( [ pipe, nOrMore( 0, paramExpression ) ] );

				if ( result === null ) {
					return null;
				}

				expr = result[ 1 ];

				// use a "CONCAT" operator if there are multiple nodes,
				// otherwise return the first node, raw.
				return expr.length > 1 ? [ 'CONCAT' ].concat( expr ) : expr[ 0 ];
			}

			function templateWithReplacement() {
				var result = sequence( [ templateName, colon, replacement ] );

				return result === null ? null : [ result[ 0 ], result[ 2 ] ];
			}

			function templateWithOutReplacement() {
				var result = sequence( [ templateName, colon, paramExpression ] );

				return result === null ? null : [ result[ 0 ], result[ 2 ] ];
			}

			templateContents = choice( [
				function () {
					var res = sequence( [
						// templates can have placeholders for dynamic
						// replacement eg: {{PLURAL:$1|one car|$1 cars}}
						// or no placeholders eg:
						// {{GRAMMAR:genitive|{{SITENAME}}}
						choice( [ templateWithReplacement, templateWithOutReplacement ] ),
						nOrMore( 0, templateParam )
					] );

					return res === null ? null : res[ 0 ].concat( res[ 1 ] );
				},
				function () {
					var res = sequence( [ templateName, nOrMore( 0, templateParam ) ] );

					if ( res === null ) {
						return null;
					}

					return [ res[ 0 ] ].concat( res[ 1 ] );
				}
			] );

			openTemplate = makeStringParser( '{{' );
			closeTemplate = makeStringParser( '}}' );

			function template() {
				var result = sequence( [ openTemplate, templateContents, closeTemplate ] );

				return result === null ? null : result[ 1 ];
			}

			expression = choice( [ template, replacement, literal ] );
			paramExpression = choice( [ template, replacement, literalWithoutBar ] );

			function start() {
				var result = nOrMore( 0, expression )();

				if ( result === null ) {
					return null;
				}

				return [ 'CONCAT' ].concat( result );
			}

			result = start();

			/*
			 * For success, the pos must have gotten to the end of the input
			 * and returned a non-null.
			 * n.b. This is part of language infrastructure, so we do not throw an internationalizable message.
			 */
			if ( result === null || pos !== message.length ) {
				throw new Error( 'Parse error at position ' + pos.toString() + ' in input: ' + message );
			}

			return result;
		}

	};

	$.extend( $.i18n.parser, new MessageParser() );
}( jQuery ) );

/*!
 * jQuery Internationalization library
 *
 * Copyright (C) 2011-2013 Santhosh Thottingal, Neil Kandalgaonkar
 *
 * jquery.i18n is dual licensed GPLv2 or later and MIT. You don't have to do
 * anything special to choose one license or the other and you don't have to
 * notify anyone which license you are using. You are free to use
 * UniversalLanguageSelector in commercial projects as long as the copyright
 * header is left intact. See files GPL-LICENSE and MIT-LICENSE for details.
 *
 * @licence GNU General Public Licence 2.0 or later
 * @licence MIT License
 */

( function ( $ ) {
	'use strict';

	var MessageParserEmitter = function () {
		this.language = $.i18n.languages[ String.locale ] || $.i18n.languages[ 'default' ];
	};

	MessageParserEmitter.prototype = {
		constructor: MessageParserEmitter,

		/**
		 * (We put this method definition here, and not in prototype, to make
		 * sure it's not overwritten by any magic.) Walk entire node structure,
		 * applying replacements and template functions when appropriate
		 *
		 * @param {Mixed} node abstract syntax tree (top node or subnode)
		 * @param {Array} replacements for $1, $2, ... $n
		 * @return {Mixed} single-string node or array of nodes suitable for
		 *  jQuery appending.
		 */
		emit: function ( node, replacements ) {
			var ret, subnodes, operation,
				messageParserEmitter = this;

			switch ( typeof node ) {
			case 'string':
			case 'number':
				ret = node;
				break;
			case 'object':
				// node is an array of nodes
				subnodes = $.map( node.slice( 1 ), function ( n ) {
					return messageParserEmitter.emit( n, replacements );
				} );

				operation = node[ 0 ].toLowerCase();

				if ( typeof messageParserEmitter[ operation ] === 'function' ) {
					ret = messageParserEmitter[ operation ]( subnodes, replacements );
				} else {
					throw new Error( 'unknown operation "' + operation + '"' );
				}

				break;
			case 'undefined':
				// Parsing the empty string (as an entire expression, or as a
				// paramExpression in a template) results in undefined
				// Perhaps a more clever parser can detect this, and return the
				// empty string? Or is that useful information?
				// The logical thing is probably to return the empty string here
				// when we encounter undefined.
				ret = '';
				break;
			default:
				throw new Error( 'unexpected type in AST: ' + typeof node );
			}

			return ret;
		},

		/**
		 * Parsing has been applied depth-first we can assume that all nodes
		 * here are single nodes Must return a single node to parents -- a
		 * jQuery with synthetic span However, unwrap any other synthetic spans
		 * in our children and pass them upwards
		 *
		 * @param {Array} nodes Mixed, some single nodes, some arrays of nodes.
		 * @return {string}
		 */
		concat: function ( nodes ) {
			var result = '';

			$.each( nodes, function ( i, node ) {
				// strings, integers, anything else
				result += node;
			} );

			return result;
		},

		/**
		 * Return escaped replacement of correct index, or string if
		 * unavailable. Note that we expect the parsed parameter to be
		 * zero-based. i.e. $1 should have become [ 0 ]. if the specified
		 * parameter is not found return the same string (e.g. "$99" ->
		 * parameter 98 -> not found -> return "$99" ) TODO throw error if
		 * nodes.length > 1 ?
		 *
		 * @param {Array} nodes One element, integer, n >= 0
		 * @param {Array} replacements for $1, $2, ... $n
		 * @return {string} replacement
		 */
		replace: function ( nodes, replacements ) {
			var index = parseInt( nodes[ 0 ], 10 );

			if ( index < replacements.length ) {
				// replacement is not a string, don't touch!
				return replacements[ index ];
			} else {
				// index not found, fallback to displaying variable
				return '$' + ( index + 1 );
			}
		},

		/**
		 * Transform parsed structure into pluralization n.b. The first node may
		 * be a non-integer (for instance, a string representing an Arabic
		 * number). So convert it back with the current language's
		 * convertNumber.
		 *
		 * @param {Array} nodes List [ {String|Number}, {String}, {String} ... ]
		 * @return {string} selected pluralized form according to current
		 *  language.
		 */
		plural: function ( nodes ) {
			var count = parseFloat( this.language.convertNumber( nodes[ 0 ], 10 ) ),
				forms = nodes.slice( 1 );

			return forms.length ? this.language.convertPlural( count, forms ) : '';
		},

		/**
		 * Transform parsed structure into gender Usage
		 * {{gender:gender|masculine|feminine|neutral}}.
		 *
		 * @param {Array} nodes List [ {String}, {String}, {String} , {String} ]
		 * @return {string} selected gender form according to current language
		 */
		gender: function ( nodes ) {
			var gender = nodes[ 0 ],
				forms = nodes.slice( 1 );

			return this.language.gender( gender, forms );
		},

		/**
		 * Transform parsed structure into grammar conversion. Invoked by
		 * putting {{grammar:form|word}} in a message
		 *
		 * @param {Array} nodes List [{Grammar case eg: genitive}, {String word}]
		 * @return {string} selected grammatical form according to current
		 *  language.
		 */
		grammar: function ( nodes ) {
			var form = nodes[ 0 ],
				word = nodes[ 1 ];

			return word && form && this.language.convertGrammar( word, form );
		}
	};

	$.extend( $.i18n.parser.emitter, new MessageParserEmitter() );
}( jQuery ) );

/*global pluralRuleParser */
( function ( $ ) {
	'use strict';

	var language = {
		// CLDR plural rules generated using
		// libs/CLDRPluralRuleParser/tools/PluralXML2JSON.html
		pluralRules: {
			ak: {
				one: 'n = 0..1'
			},
			am: {
				one: 'i = 0 or n = 1'
			},
			ar: {
				zero: 'n = 0',
				one: 'n = 1',
				two: 'n = 2',
				few: 'n % 100 = 3..10',
				many: 'n % 100 = 11..99'
			},
			be: {
				one: 'n % 10 = 1 and n % 100 != 11',
				few: 'n % 10 = 2..4 and n % 100 != 12..14',
				many: 'n % 10 = 0 or n % 10 = 5..9 or n % 100 = 11..14'
			},
			bh: {
				one: 'n = 0..1'
			},
			bn: {
				one: 'i = 0 or n = 1'
			},
			br: {
				one: 'n % 10 = 1 and n % 100 != 11,71,91',
				two: 'n % 10 = 2 and n % 100 != 12,72,92',
				few: 'n % 10 = 3..4,9 and n % 100 != 10..19,70..79,90..99',
				many: 'n != 0 and n % 1000000 = 0'
			},
			bs: {
				one: 'v = 0 and i % 10 = 1 and i % 100 != 11 or f % 10 = 1 and f % 100 != 11',
				few: 'v = 0 and i % 10 = 2..4 and i % 100 != 12..14 or f % 10 = 2..4 and f % 100 != 12..14'
			},
			cs: {
				one: 'i = 1 and v = 0',
				few: 'i = 2..4 and v = 0',
				many: 'v != 0'
			},
			cy: {
				zero: 'n = 0',
				one: 'n = 1',
				two: 'n = 2',
				few: 'n = 3',
				many: 'n = 6'
			},
			da: {
				one: 'n = 1 or t != 0 and i = 0,1'
			},
			fa: {
				one: 'i = 0 or n = 1'
			},
			ff: {
				one: 'i = 0,1'
			},
			fil: {
				one: 'i = 0..1 and v = 0'
			},
			fr: {
				one: 'i = 0,1'
			},
			ga: {
				one: 'n = 1',
				two: 'n = 2',
				few: 'n = 3..6',
				many: 'n = 7..10'
			},
			gd: {
				one: 'n = 1,11',
				two: 'n = 2,12',
				few: 'n = 3..10,13..19'
			},
			gu: {
				one: 'i = 0 or n = 1'
			},
			guw: {
				one: 'n = 0..1'
			},
			gv: {
				one: 'n % 10 = 1',
				two: 'n % 10 = 2',
				few: 'n % 100 = 0,20,40,60'
			},
			he: {
				one: 'i = 1 and v = 0',
				two: 'i = 2 and v = 0',
				many: 'v = 0 and n != 0..10 and n % 10 = 0'
			},
			hi: {
				one: 'i = 0 or n = 1'
			},
			hr: {
				one: 'v = 0 and i % 10 = 1 and i % 100 != 11 or f % 10 = 1 and f % 100 != 11',
				few: 'v = 0 and i % 10 = 2..4 and i % 100 != 12..14 or f % 10 = 2..4 and f % 100 != 12..14'
			},
			hy: {
				one: 'i = 0,1'
			},
			is: {
				one: 't = 0 and i % 10 = 1 and i % 100 != 11 or t != 0'
			},
			iu: {
				one: 'n = 1',
				two: 'n = 2'
			},
			iw: {
				one: 'i = 1 and v = 0',
				two: 'i = 2 and v = 0',
				many: 'v = 0 and n != 0..10 and n % 10 = 0'
			},
			kab: {
				one: 'i = 0,1'
			},
			kn: {
				one: 'i = 0 or n = 1'
			},
			kw: {
				one: 'n = 1',
				two: 'n = 2'
			},
			lag: {
				zero: 'n = 0',
				one: 'i = 0,1 and n != 0'
			},
			ln: {
				one: 'n = 0..1'
			},
			lt: {
				one: 'n % 10 = 1 and n % 100 != 11..19',
				few: 'n % 10 = 2..9 and n % 100 != 11..19',
				many: 'f != 0'
			},
			lv: {
				zero: 'n % 10 = 0 or n % 100 = 11..19 or v = 2 and f % 100 = 11..19',
				one: 'n % 10 = 1 and n % 100 != 11 or v = 2 and f % 10 = 1 and f % 100 != 11 or v != 2 and f % 10 = 1'
			},
			mg: {
				one: 'n = 0..1'
			},
			mk: {
				one: 'v = 0 and i % 10 = 1 or f % 10 = 1'
			},
			mo: {
				one: 'i = 1 and v = 0',
				few: 'v != 0 or n = 0 or n != 1 and n % 100 = 1..19'
			},
			mr: {
				one: 'i = 0 or n = 1'
			},
			mt: {
				one: 'n = 1',
				few: 'n = 0 or n % 100 = 2..10',
				many: 'n % 100 = 11..19'
			},
			naq: {
				one: 'n = 1',
				two: 'n = 2'
			},
			nso: {
				one: 'n = 0..1'
			},
			pa: {
				one: 'n = 0..1'
			},
			pl: {
				one: 'i = 1 and v = 0',
				few: 'v = 0 and i % 10 = 2..4 and i % 100 != 12..14',
				many: 'v = 0 and i != 1 and i % 10 = 0..1 or v = 0 and i % 10 = 5..9 or v = 0 and i % 100 = 12..14'
			},
			pt: {
				one: 'i = 1 and v = 0 or i = 0 and t = 1'
			},
			// jscs:disable requireCamelCaseOrUpperCaseIdentifiers
			pt_PT: {
				one: 'n = 1 and v = 0'
			},
			// jscs:enable requireCamelCaseOrUpperCaseIdentifiers
			ro: {
				one: 'i = 1 and v = 0',
				few: 'v != 0 or n = 0 or n != 1 and n % 100 = 1..19'
			},
			ru: {
				one: 'v = 0 and i % 10 = 1 and i % 100 != 11',
				many: 'v = 0 and i % 10 = 0 or v = 0 and i % 10 = 5..9 or v = 0 and i % 100 = 11..14'
			},
			se: {
				one: 'n = 1',
				two: 'n = 2'
			},
			sh: {
				one: 'v = 0 and i % 10 = 1 and i % 100 != 11 or f % 10 = 1 and f % 100 != 11',
				few: 'v = 0 and i % 10 = 2..4 and i % 100 != 12..14 or f % 10 = 2..4 and f % 100 != 12..14'
			},
			shi: {
				one: 'i = 0 or n = 1',
				few: 'n = 2..10'
			},
			si: {
				one: 'n = 0,1 or i = 0 and f = 1'
			},
			sk: {
				one: 'i = 1 and v = 0',
				few: 'i = 2..4 and v = 0',
				many: 'v != 0'
			},
			sl: {
				one: 'v = 0 and i % 100 = 1',
				two: 'v = 0 and i % 100 = 2',
				few: 'v = 0 and i % 100 = 3..4 or v != 0'
			},
			sma: {
				one: 'n = 1',
				two: 'n = 2'
			},
			smi: {
				one: 'n = 1',
				two: 'n = 2'
			},
			smj: {
				one: 'n = 1',
				two: 'n = 2'
			},
			smn: {
				one: 'n = 1',
				two: 'n = 2'
			},
			sms: {
				one: 'n = 1',
				two: 'n = 2'
			},
			sr: {
				one: 'v = 0 and i % 10 = 1 and i % 100 != 11 or f % 10 = 1 and f % 100 != 11',
				few: 'v = 0 and i % 10 = 2..4 and i % 100 != 12..14 or f % 10 = 2..4 and f % 100 != 12..14'
			},
			ti: {
				one: 'n = 0..1'
			},
			tl: {
				one: 'i = 0..1 and v = 0'
			},
			tzm: {
				one: 'n = 0..1 or n = 11..99'
			},
			uk: {
				one: 'v = 0 and i % 10 = 1 and i % 100 != 11',
				few: 'v = 0 and i % 10 = 2..4 and i % 100 != 12..14',
				many: 'v = 0 and i % 10 = 0 or v = 0 and i % 10 = 5..9 or v = 0 and i % 100 = 11..14'
			},
			wa: {
				one: 'n = 0..1'
			},
			zu: {
				one: 'i = 0 or n = 1'
			}
		},

		/**
		 * Plural form transformations, needed for some languages.
		 *
		 * @param {integer} count
		 *            Non-localized quantifier
		 * @param {Array} forms
		 *            List of plural forms
		 * @return {string} Correct form for quantifier in this language
		 */
		convertPlural: function ( count, forms ) {
			var pluralRules,
				pluralFormIndex,
				index,
				explicitPluralPattern = new RegExp( '\\d+=', 'i' ),
				formCount,
				form;

			if ( !forms || forms.length === 0 ) {
				return '';
			}

			// Handle for Explicit 0= & 1= values
			for ( index = 0; index < forms.length; index++ ) {
				form = forms[ index ];
				if ( explicitPluralPattern.test( form ) ) {
					formCount = parseInt( form.substring( 0, form.indexOf( '=' ) ), 10 );
					if ( formCount === count ) {
						return ( form.substr( form.indexOf( '=' ) + 1 ) );
					}
					forms[ index ] = undefined;
				}
			}

			forms = $.map( forms, function ( form ) {
				if ( form !== undefined ) {
					return form;
				}
			} );

			pluralRules = this.pluralRules[ $.i18n().locale ];

			if ( !pluralRules ) {
				// default fallback.
				return ( count === 1 ) ? forms[ 0 ] : forms[ 1 ];
			}

			pluralFormIndex = this.getPluralForm( count, pluralRules );
			pluralFormIndex = Math.min( pluralFormIndex, forms.length - 1 );

			return forms[ pluralFormIndex ];
		},

		/**
		 * For the number, get the plural for index
		 *
		 * @param {integer} number
		 * @param {Object} pluralRules
		 * @return {integer} plural form index
		 */
		getPluralForm: function ( number, pluralRules ) {
			var i,
				pluralForms = [ 'zero', 'one', 'two', 'few', 'many', 'other' ],
				pluralFormIndex = 0;

			for ( i = 0; i < pluralForms.length; i++ ) {
				if ( pluralRules[ pluralForms[ i ] ] ) {
					if ( typeof pluralRuleParser === 'undefined' ) {
						return pluralFormIndex;
					} else {
						if ( pluralRuleParser( pluralRules[ pluralForms[ i ] ], number ) ) {
							return pluralFormIndex;
						}
					}

					pluralFormIndex++;
				}
			}

			return pluralFormIndex;
		},

		/**
		 * Converts a number using digitTransformTable.
		 *
		 * @param {number} num Value to be converted
		 * @param {boolean} integer Convert the return value to an integer
		 */
		convertNumber: function ( num, integer ) {
			var tmp, item, i,
				transformTable, numberString, convertedNumber;

			// Set the target Transform table:
			transformTable = this.digitTransformTable( $.i18n().locale );
			numberString = String( num );
			convertedNumber = '';

			if ( !transformTable ) {
				return num;
			}

			// Check if the restore to Latin number flag is set:
			if ( integer ) {
				if ( parseFloat( num, 10 ) === num ) {
					return num;
				}

				tmp = [];

				for ( item in transformTable ) {
					tmp[ transformTable[ item ] ] = item;
				}

				transformTable = tmp;
			}

			for ( i = 0; i < numberString.length; i++ ) {
				if ( transformTable[ numberString[ i ] ] ) {
					convertedNumber += transformTable[ numberString[ i ] ];
				} else {
					convertedNumber += numberString[ i ];
				}
			}

			return integer ? parseFloat( convertedNumber, 10 ) : convertedNumber;
		},

		/**
		 * Grammatical transformations, needed for inflected languages.
		 * Invoked by putting {{grammar:form|word}} in a message.
		 * Override this method for languages that need special grammar rules
		 * applied dynamically.
		 *
		 * @param {string} word
		 * @param {string} form
		 * @return {string}
		 */
		convertGrammar: function ( word, form ) { /*jshint unused: false */
			return word;
		},

		/**
		 * Provides an alternative text depending on specified gender. Usage
		 * {{gender:[gender|user object]|masculine|feminine|neutral}}. If second
		 * or third parameter are not specified, masculine is used.
		 *
		 * These details may be overriden per language.
		 *
		 * @param {string} gender
		 *      male, female, or anything else for neutral.
		 * @param {Array} forms
		 *      List of gender forms
		 *
		 * @return {string}
		 */
		gender: function ( gender, forms ) {
			if ( !forms || forms.length === 0 ) {
				return '';
			}

			while ( forms.length < 2 ) {
				forms.push( forms[ forms.length - 1 ] );
			}

			if ( gender === 'male' ) {
				return forms[ 0 ];
			}

			if ( gender === 'female' ) {
				return forms[ 1 ];
			}

			return ( forms.length === 3 ) ? forms[ 2 ] : forms[ 0 ];
		},

		/**
		 * Get the digit transform table for the given language
		 * See http://cldr.unicode.org/translation/numbering-systems
		 *
		 * @param {string} language
		 * @return {Array|boolean} List of digits in the passed language or false
		 * representation, or boolean false if there is no information.
		 */
		digitTransformTable: function ( language ) {
			var tables = {
				ar: '٠١٢٣٤٥٦٧٨٩',
				fa: '۰۱۲۳۴۵۶۷۸۹',
				ml: '൦൧൨൩൪൫൬൭൮൯',
				kn: '೦೧೨೩೪೫೬೭೮೯',
				lo: '໐໑໒໓໔໕໖໗໘໙',
				or: '୦୧୨୩୪୫୬୭୮୯',
				kh: '០១២៣៤៥៦៧៨៩',
				pa: '੦੧੨੩੪੫੬੭੮੯',
				gu: '૦૧૨૩૪૫૬૭૮૯',
				hi: '०१२३४५६७८९',
				my: '၀၁၂၃၄၅၆၇၈၉',
				ta: '௦௧௨௩௪௫௬௭௮௯',
				te: '౦౧౨౩౪౫౬౭౮౯',
				th: '๐๑๒๓๔๕๖๗๘๙', // FIXME use iso 639 codes
				bo: '༠༡༢༣༤༥༦༧༨༩' // FIXME use iso 639 codes
			};

			if ( !tables[ language ] ) {
				return false;
			}

			return tables[ language ].split( '' );
		}
	};

	$.extend( $.i18n.languages, {
		'default': language
	} );
}( jQuery ) );

//! moment.js
//! version : 2.10.6
//! authors : Tim Wood, Iskren Chernev, Moment.js contributors
//! license : MIT
//! momentjs.com
!function(a,b){"object"==typeof exports&&"undefined"!=typeof module?module.exports=b():"function"==typeof define&&define.amd?define(b):a.moment=b()}(this,function(){"use strict";function a(){return Hc.apply(null,arguments)}function b(a){Hc=a}function c(a){return"[object Array]"===Object.prototype.toString.call(a)}function d(a){return a instanceof Date||"[object Date]"===Object.prototype.toString.call(a)}function e(a,b){var c,d=[];for(c=0;c<a.length;++c)d.push(b(a[c],c));return d}function f(a,b){return Object.prototype.hasOwnProperty.call(a,b)}function g(a,b){for(var c in b)f(b,c)&&(a[c]=b[c]);return f(b,"toString")&&(a.toString=b.toString),f(b,"valueOf")&&(a.valueOf=b.valueOf),a}function h(a,b,c,d){return Ca(a,b,c,d,!0).utc()}function i(){return{empty:!1,unusedTokens:[],unusedInput:[],overflow:-2,charsLeftOver:0,nullInput:!1,invalidMonth:null,invalidFormat:!1,userInvalidated:!1,iso:!1}}function j(a){return null==a._pf&&(a._pf=i()),a._pf}function k(a){if(null==a._isValid){var b=j(a);a._isValid=!(isNaN(a._d.getTime())||!(b.overflow<0)||b.empty||b.invalidMonth||b.invalidWeekday||b.nullInput||b.invalidFormat||b.userInvalidated),a._strict&&(a._isValid=a._isValid&&0===b.charsLeftOver&&0===b.unusedTokens.length&&void 0===b.bigHour)}return a._isValid}function l(a){var b=h(NaN);return null!=a?g(j(b),a):j(b).userInvalidated=!0,b}function m(a,b){var c,d,e;if("undefined"!=typeof b._isAMomentObject&&(a._isAMomentObject=b._isAMomentObject),"undefined"!=typeof b._i&&(a._i=b._i),"undefined"!=typeof b._f&&(a._f=b._f),"undefined"!=typeof b._l&&(a._l=b._l),"undefined"!=typeof b._strict&&(a._strict=b._strict),"undefined"!=typeof b._tzm&&(a._tzm=b._tzm),"undefined"!=typeof b._isUTC&&(a._isUTC=b._isUTC),"undefined"!=typeof b._offset&&(a._offset=b._offset),"undefined"!=typeof b._pf&&(a._pf=j(b)),"undefined"!=typeof b._locale&&(a._locale=b._locale),Jc.length>0)for(c in Jc)d=Jc[c],e=b[d],"undefined"!=typeof e&&(a[d]=e);return a}function n(b){m(this,b),this._d=new Date(null!=b._d?b._d.getTime():NaN),Kc===!1&&(Kc=!0,a.updateOffset(this),Kc=!1)}function o(a){return a instanceof n||null!=a&&null!=a._isAMomentObject}function p(a){return 0>a?Math.ceil(a):Math.floor(a)}function q(a){var b=+a,c=0;return 0!==b&&isFinite(b)&&(c=p(b)),c}function r(a,b,c){var d,e=Math.min(a.length,b.length),f=Math.abs(a.length-b.length),g=0;for(d=0;e>d;d++)(c&&a[d]!==b[d]||!c&&q(a[d])!==q(b[d]))&&g++;return g+f}function s(){}function t(a){return a?a.toLowerCase().replace("_","-"):a}function u(a){for(var b,c,d,e,f=0;f<a.length;){for(e=t(a[f]).split("-"),b=e.length,c=t(a[f+1]),c=c?c.split("-"):null;b>0;){if(d=v(e.slice(0,b).join("-")))return d;if(c&&c.length>=b&&r(e,c,!0)>=b-1)break;b--}f++}return null}function v(a){var b=null;if(!Lc[a]&&"undefined"!=typeof module&&module&&module.exports)try{b=Ic._abbr,require("./locale/"+a),w(b)}catch(c){}return Lc[a]}function w(a,b){var c;return a&&(c="undefined"==typeof b?y(a):x(a,b),c&&(Ic=c)),Ic._abbr}function x(a,b){return null!==b?(b.abbr=a,Lc[a]=Lc[a]||new s,Lc[a].set(b),w(a),Lc[a]):(delete Lc[a],null)}function y(a){var b;if(a&&a._locale&&a._locale._abbr&&(a=a._locale._abbr),!a)return Ic;if(!c(a)){if(b=v(a))return b;a=[a]}return u(a)}function z(a,b){var c=a.toLowerCase();Mc[c]=Mc[c+"s"]=Mc[b]=a}function A(a){return"string"==typeof a?Mc[a]||Mc[a.toLowerCase()]:void 0}function B(a){var b,c,d={};for(c in a)f(a,c)&&(b=A(c),b&&(d[b]=a[c]));return d}function C(b,c){return function(d){return null!=d?(E(this,b,d),a.updateOffset(this,c),this):D(this,b)}}function D(a,b){return a._d["get"+(a._isUTC?"UTC":"")+b]()}function E(a,b,c){return a._d["set"+(a._isUTC?"UTC":"")+b](c)}function F(a,b){var c;if("object"==typeof a)for(c in a)this.set(c,a[c]);else if(a=A(a),"function"==typeof this[a])return this[a](b);return this}function G(a,b,c){var d=""+Math.abs(a),e=b-d.length,f=a>=0;return(f?c?"+":"":"-")+Math.pow(10,Math.max(0,e)).toString().substr(1)+d}function H(a,b,c,d){var e=d;"string"==typeof d&&(e=function(){return this[d]()}),a&&(Qc[a]=e),b&&(Qc[b[0]]=function(){return G(e.apply(this,arguments),b[1],b[2])}),c&&(Qc[c]=function(){return this.localeData().ordinal(e.apply(this,arguments),a)})}function I(a){return a.match(/\[[\s\S]/)?a.replace(/^\[|\]$/g,""):a.replace(/\\/g,"")}function J(a){var b,c,d=a.match(Nc);for(b=0,c=d.length;c>b;b++)Qc[d[b]]?d[b]=Qc[d[b]]:d[b]=I(d[b]);return function(e){var f="";for(b=0;c>b;b++)f+=d[b]instanceof Function?d[b].call(e,a):d[b];return f}}function K(a,b){return a.isValid()?(b=L(b,a.localeData()),Pc[b]=Pc[b]||J(b),Pc[b](a)):a.localeData().invalidDate()}function L(a,b){function c(a){return b.longDateFormat(a)||a}var d=5;for(Oc.lastIndex=0;d>=0&&Oc.test(a);)a=a.replace(Oc,c),Oc.lastIndex=0,d-=1;return a}function M(a){return"function"==typeof a&&"[object Function]"===Object.prototype.toString.call(a)}function N(a,b,c){dd[a]=M(b)?b:function(a){return a&&c?c:b}}function O(a,b){return f(dd,a)?dd[a](b._strict,b._locale):new RegExp(P(a))}function P(a){return a.replace("\\","").replace(/\\(\[)|\\(\])|\[([^\]\[]*)\]|\\(.)/g,function(a,b,c,d,e){return b||c||d||e}).replace(/[-\/\\^$*+?.()|[\]{}]/g,"\\$&")}function Q(a,b){var c,d=b;for("string"==typeof a&&(a=[a]),"number"==typeof b&&(d=function(a,c){c[b]=q(a)}),c=0;c<a.length;c++)ed[a[c]]=d}function R(a,b){Q(a,function(a,c,d,e){d._w=d._w||{},b(a,d._w,d,e)})}function S(a,b,c){null!=b&&f(ed,a)&&ed[a](b,c._a,c,a)}function T(a,b){return new Date(Date.UTC(a,b+1,0)).getUTCDate()}function U(a){return this._months[a.month()]}function V(a){return this._monthsShort[a.month()]}function W(a,b,c){var d,e,f;for(this._monthsParse||(this._monthsParse=[],this._longMonthsParse=[],this._shortMonthsParse=[]),d=0;12>d;d++){if(e=h([2e3,d]),c&&!this._longMonthsParse[d]&&(this._longMonthsParse[d]=new RegExp("^"+this.months(e,"").replace(".","")+"$","i"),this._shortMonthsParse[d]=new RegExp("^"+this.monthsShort(e,"").replace(".","")+"$","i")),c||this._monthsParse[d]||(f="^"+this.months(e,"")+"|^"+this.monthsShort(e,""),this._monthsParse[d]=new RegExp(f.replace(".",""),"i")),c&&"MMMM"===b&&this._longMonthsParse[d].test(a))return d;if(c&&"MMM"===b&&this._shortMonthsParse[d].test(a))return d;if(!c&&this._monthsParse[d].test(a))return d}}function X(a,b){var c;return"string"==typeof b&&(b=a.localeData().monthsParse(b),"number"!=typeof b)?a:(c=Math.min(a.date(),T(a.year(),b)),a._d["set"+(a._isUTC?"UTC":"")+"Month"](b,c),a)}function Y(b){return null!=b?(X(this,b),a.updateOffset(this,!0),this):D(this,"Month")}function Z(){return T(this.year(),this.month())}function $(a){var b,c=a._a;return c&&-2===j(a).overflow&&(b=c[gd]<0||c[gd]>11?gd:c[hd]<1||c[hd]>T(c[fd],c[gd])?hd:c[id]<0||c[id]>24||24===c[id]&&(0!==c[jd]||0!==c[kd]||0!==c[ld])?id:c[jd]<0||c[jd]>59?jd:c[kd]<0||c[kd]>59?kd:c[ld]<0||c[ld]>999?ld:-1,j(a)._overflowDayOfYear&&(fd>b||b>hd)&&(b=hd),j(a).overflow=b),a}function _(b){a.suppressDeprecationWarnings===!1&&"undefined"!=typeof console&&console.warn&&console.warn("Deprecation warning: "+b)}function aa(a,b){var c=!0;return g(function(){return c&&(_(a+"\n"+(new Error).stack),c=!1),b.apply(this,arguments)},b)}function ba(a,b){od[a]||(_(b),od[a]=!0)}function ca(a){var b,c,d=a._i,e=pd.exec(d);if(e){for(j(a).iso=!0,b=0,c=qd.length;c>b;b++)if(qd[b][1].exec(d)){a._f=qd[b][0];break}for(b=0,c=rd.length;c>b;b++)if(rd[b][1].exec(d)){a._f+=(e[6]||" ")+rd[b][0];break}d.match(ad)&&(a._f+="Z"),va(a)}else a._isValid=!1}function da(b){var c=sd.exec(b._i);return null!==c?void(b._d=new Date(+c[1])):(ca(b),void(b._isValid===!1&&(delete b._isValid,a.createFromInputFallback(b))))}function ea(a,b,c,d,e,f,g){var h=new Date(a,b,c,d,e,f,g);return 1970>a&&h.setFullYear(a),h}function fa(a){var b=new Date(Date.UTC.apply(null,arguments));return 1970>a&&b.setUTCFullYear(a),b}function ga(a){return ha(a)?366:365}function ha(a){return a%4===0&&a%100!==0||a%400===0}function ia(){return ha(this.year())}function ja(a,b,c){var d,e=c-b,f=c-a.day();return f>e&&(f-=7),e-7>f&&(f+=7),d=Da(a).add(f,"d"),{week:Math.ceil(d.dayOfYear()/7),year:d.year()}}function ka(a){return ja(a,this._week.dow,this._week.doy).week}function la(){return this._week.dow}function ma(){return this._week.doy}function na(a){var b=this.localeData().week(this);return null==a?b:this.add(7*(a-b),"d")}function oa(a){var b=ja(this,1,4).week;return null==a?b:this.add(7*(a-b),"d")}function pa(a,b,c,d,e){var f,g=6+e-d,h=fa(a,0,1+g),i=h.getUTCDay();return e>i&&(i+=7),c=null!=c?1*c:e,f=1+g+7*(b-1)-i+c,{year:f>0?a:a-1,dayOfYear:f>0?f:ga(a-1)+f}}function qa(a){var b=Math.round((this.clone().startOf("day")-this.clone().startOf("year"))/864e5)+1;return null==a?b:this.add(a-b,"d")}function ra(a,b,c){return null!=a?a:null!=b?b:c}function sa(a){var b=new Date;return a._useUTC?[b.getUTCFullYear(),b.getUTCMonth(),b.getUTCDate()]:[b.getFullYear(),b.getMonth(),b.getDate()]}function ta(a){var b,c,d,e,f=[];if(!a._d){for(d=sa(a),a._w&&null==a._a[hd]&&null==a._a[gd]&&ua(a),a._dayOfYear&&(e=ra(a._a[fd],d[fd]),a._dayOfYear>ga(e)&&(j(a)._overflowDayOfYear=!0),c=fa(e,0,a._dayOfYear),a._a[gd]=c.getUTCMonth(),a._a[hd]=c.getUTCDate()),b=0;3>b&&null==a._a[b];++b)a._a[b]=f[b]=d[b];for(;7>b;b++)a._a[b]=f[b]=null==a._a[b]?2===b?1:0:a._a[b];24===a._a[id]&&0===a._a[jd]&&0===a._a[kd]&&0===a._a[ld]&&(a._nextDay=!0,a._a[id]=0),a._d=(a._useUTC?fa:ea).apply(null,f),null!=a._tzm&&a._d.setUTCMinutes(a._d.getUTCMinutes()-a._tzm),a._nextDay&&(a._a[id]=24)}}function ua(a){var b,c,d,e,f,g,h;b=a._w,null!=b.GG||null!=b.W||null!=b.E?(f=1,g=4,c=ra(b.GG,a._a[fd],ja(Da(),1,4).year),d=ra(b.W,1),e=ra(b.E,1)):(f=a._locale._week.dow,g=a._locale._week.doy,c=ra(b.gg,a._a[fd],ja(Da(),f,g).year),d=ra(b.w,1),null!=b.d?(e=b.d,f>e&&++d):e=null!=b.e?b.e+f:f),h=pa(c,d,e,g,f),a._a[fd]=h.year,a._dayOfYear=h.dayOfYear}function va(b){if(b._f===a.ISO_8601)return void ca(b);b._a=[],j(b).empty=!0;var c,d,e,f,g,h=""+b._i,i=h.length,k=0;for(e=L(b._f,b._locale).match(Nc)||[],c=0;c<e.length;c++)f=e[c],d=(h.match(O(f,b))||[])[0],d&&(g=h.substr(0,h.indexOf(d)),g.length>0&&j(b).unusedInput.push(g),h=h.slice(h.indexOf(d)+d.length),k+=d.length),Qc[f]?(d?j(b).empty=!1:j(b).unusedTokens.push(f),S(f,d,b)):b._strict&&!d&&j(b).unusedTokens.push(f);j(b).charsLeftOver=i-k,h.length>0&&j(b).unusedInput.push(h),j(b).bigHour===!0&&b._a[id]<=12&&b._a[id]>0&&(j(b).bigHour=void 0),b._a[id]=wa(b._locale,b._a[id],b._meridiem),ta(b),$(b)}function wa(a,b,c){var d;return null==c?b:null!=a.meridiemHour?a.meridiemHour(b,c):null!=a.isPM?(d=a.isPM(c),d&&12>b&&(b+=12),d||12!==b||(b=0),b):b}function xa(a){var b,c,d,e,f;if(0===a._f.length)return j(a).invalidFormat=!0,void(a._d=new Date(NaN));for(e=0;e<a._f.length;e++)f=0,b=m({},a),null!=a._useUTC&&(b._useUTC=a._useUTC),b._f=a._f[e],va(b),k(b)&&(f+=j(b).charsLeftOver,f+=10*j(b).unusedTokens.length,j(b).score=f,(null==d||d>f)&&(d=f,c=b));g(a,c||b)}function ya(a){if(!a._d){var b=B(a._i);a._a=[b.year,b.month,b.day||b.date,b.hour,b.minute,b.second,b.millisecond],ta(a)}}function za(a){var b=new n($(Aa(a)));return b._nextDay&&(b.add(1,"d"),b._nextDay=void 0),b}function Aa(a){var b=a._i,e=a._f;return a._locale=a._locale||y(a._l),null===b||void 0===e&&""===b?l({nullInput:!0}):("string"==typeof b&&(a._i=b=a._locale.preparse(b)),o(b)?new n($(b)):(c(e)?xa(a):e?va(a):d(b)?a._d=b:Ba(a),a))}function Ba(b){var f=b._i;void 0===f?b._d=new Date:d(f)?b._d=new Date(+f):"string"==typeof f?da(b):c(f)?(b._a=e(f.slice(0),function(a){return parseInt(a,10)}),ta(b)):"object"==typeof f?ya(b):"number"==typeof f?b._d=new Date(f):a.createFromInputFallback(b)}function Ca(a,b,c,d,e){var f={};return"boolean"==typeof c&&(d=c,c=void 0),f._isAMomentObject=!0,f._useUTC=f._isUTC=e,f._l=c,f._i=a,f._f=b,f._strict=d,za(f)}function Da(a,b,c,d){return Ca(a,b,c,d,!1)}function Ea(a,b){var d,e;if(1===b.length&&c(b[0])&&(b=b[0]),!b.length)return Da();for(d=b[0],e=1;e<b.length;++e)(!b[e].isValid()||b[e][a](d))&&(d=b[e]);return d}function Fa(){var a=[].slice.call(arguments,0);return Ea("isBefore",a)}function Ga(){var a=[].slice.call(arguments,0);return Ea("isAfter",a)}function Ha(a){var b=B(a),c=b.year||0,d=b.quarter||0,e=b.month||0,f=b.week||0,g=b.day||0,h=b.hour||0,i=b.minute||0,j=b.second||0,k=b.millisecond||0;this._milliseconds=+k+1e3*j+6e4*i+36e5*h,this._days=+g+7*f,this._months=+e+3*d+12*c,this._data={},this._locale=y(),this._bubble()}function Ia(a){return a instanceof Ha}function Ja(a,b){H(a,0,0,function(){var a=this.utcOffset(),c="+";return 0>a&&(a=-a,c="-"),c+G(~~(a/60),2)+b+G(~~a%60,2)})}function Ka(a){var b=(a||"").match(ad)||[],c=b[b.length-1]||[],d=(c+"").match(xd)||["-",0,0],e=+(60*d[1])+q(d[2]);return"+"===d[0]?e:-e}function La(b,c){var e,f;return c._isUTC?(e=c.clone(),f=(o(b)||d(b)?+b:+Da(b))-+e,e._d.setTime(+e._d+f),a.updateOffset(e,!1),e):Da(b).local()}function Ma(a){return 15*-Math.round(a._d.getTimezoneOffset()/15)}function Na(b,c){var d,e=this._offset||0;return null!=b?("string"==typeof b&&(b=Ka(b)),Math.abs(b)<16&&(b=60*b),!this._isUTC&&c&&(d=Ma(this)),this._offset=b,this._isUTC=!0,null!=d&&this.add(d,"m"),e!==b&&(!c||this._changeInProgress?bb(this,Ya(b-e,"m"),1,!1):this._changeInProgress||(this._changeInProgress=!0,a.updateOffset(this,!0),this._changeInProgress=null)),this):this._isUTC?e:Ma(this)}function Oa(a,b){return null!=a?("string"!=typeof a&&(a=-a),this.utcOffset(a,b),this):-this.utcOffset()}function Pa(a){return this.utcOffset(0,a)}function Qa(a){return this._isUTC&&(this.utcOffset(0,a),this._isUTC=!1,a&&this.subtract(Ma(this),"m")),this}function Ra(){return this._tzm?this.utcOffset(this._tzm):"string"==typeof this._i&&this.utcOffset(Ka(this._i)),this}function Sa(a){return a=a?Da(a).utcOffset():0,(this.utcOffset()-a)%60===0}function Ta(){return this.utcOffset()>this.clone().month(0).utcOffset()||this.utcOffset()>this.clone().month(5).utcOffset()}function Ua(){if("undefined"!=typeof this._isDSTShifted)return this._isDSTShifted;var a={};if(m(a,this),a=Aa(a),a._a){var b=a._isUTC?h(a._a):Da(a._a);this._isDSTShifted=this.isValid()&&r(a._a,b.toArray())>0}else this._isDSTShifted=!1;return this._isDSTShifted}function Va(){return!this._isUTC}function Wa(){return this._isUTC}function Xa(){return this._isUTC&&0===this._offset}function Ya(a,b){var c,d,e,g=a,h=null;return Ia(a)?g={ms:a._milliseconds,d:a._days,M:a._months}:"number"==typeof a?(g={},b?g[b]=a:g.milliseconds=a):(h=yd.exec(a))?(c="-"===h[1]?-1:1,g={y:0,d:q(h[hd])*c,h:q(h[id])*c,m:q(h[jd])*c,s:q(h[kd])*c,ms:q(h[ld])*c}):(h=zd.exec(a))?(c="-"===h[1]?-1:1,g={y:Za(h[2],c),M:Za(h[3],c),d:Za(h[4],c),h:Za(h[5],c),m:Za(h[6],c),s:Za(h[7],c),w:Za(h[8],c)}):null==g?g={}:"object"==typeof g&&("from"in g||"to"in g)&&(e=_a(Da(g.from),Da(g.to)),g={},g.ms=e.milliseconds,g.M=e.months),d=new Ha(g),Ia(a)&&f(a,"_locale")&&(d._locale=a._locale),d}function Za(a,b){var c=a&&parseFloat(a.replace(",","."));return(isNaN(c)?0:c)*b}function $a(a,b){var c={milliseconds:0,months:0};return c.months=b.month()-a.month()+12*(b.year()-a.year()),a.clone().add(c.months,"M").isAfter(b)&&--c.months,c.milliseconds=+b-+a.clone().add(c.months,"M"),c}function _a(a,b){var c;return b=La(b,a),a.isBefore(b)?c=$a(a,b):(c=$a(b,a),c.milliseconds=-c.milliseconds,c.months=-c.months),c}function ab(a,b){return function(c,d){var e,f;return null===d||isNaN(+d)||(ba(b,"moment()."+b+"(period, number) is deprecated. Please use moment()."+b+"(number, period)."),f=c,c=d,d=f),c="string"==typeof c?+c:c,e=Ya(c,d),bb(this,e,a),this}}function bb(b,c,d,e){var f=c._milliseconds,g=c._days,h=c._months;e=null==e?!0:e,f&&b._d.setTime(+b._d+f*d),g&&E(b,"Date",D(b,"Date")+g*d),h&&X(b,D(b,"Month")+h*d),e&&a.updateOffset(b,g||h)}function cb(a,b){var c=a||Da(),d=La(c,this).startOf("day"),e=this.diff(d,"days",!0),f=-6>e?"sameElse":-1>e?"lastWeek":0>e?"lastDay":1>e?"sameDay":2>e?"nextDay":7>e?"nextWeek":"sameElse";return this.format(b&&b[f]||this.localeData().calendar(f,this,Da(c)))}function db(){return new n(this)}function eb(a,b){var c;return b=A("undefined"!=typeof b?b:"millisecond"),"millisecond"===b?(a=o(a)?a:Da(a),+this>+a):(c=o(a)?+a:+Da(a),c<+this.clone().startOf(b))}function fb(a,b){var c;return b=A("undefined"!=typeof b?b:"millisecond"),"millisecond"===b?(a=o(a)?a:Da(a),+a>+this):(c=o(a)?+a:+Da(a),+this.clone().endOf(b)<c)}function gb(a,b,c){return this.isAfter(a,c)&&this.isBefore(b,c)}function hb(a,b){var c;return b=A(b||"millisecond"),"millisecond"===b?(a=o(a)?a:Da(a),+this===+a):(c=+Da(a),+this.clone().startOf(b)<=c&&c<=+this.clone().endOf(b))}function ib(a,b,c){var d,e,f=La(a,this),g=6e4*(f.utcOffset()-this.utcOffset());return b=A(b),"year"===b||"month"===b||"quarter"===b?(e=jb(this,f),"quarter"===b?e/=3:"year"===b&&(e/=12)):(d=this-f,e="second"===b?d/1e3:"minute"===b?d/6e4:"hour"===b?d/36e5:"day"===b?(d-g)/864e5:"week"===b?(d-g)/6048e5:d),c?e:p(e)}function jb(a,b){var c,d,e=12*(b.year()-a.year())+(b.month()-a.month()),f=a.clone().add(e,"months");return 0>b-f?(c=a.clone().add(e-1,"months"),d=(b-f)/(f-c)):(c=a.clone().add(e+1,"months"),d=(b-f)/(c-f)),-(e+d)}function kb(){return this.clone().locale("en").format("ddd MMM DD YYYY HH:mm:ss [GMT]ZZ")}function lb(){var a=this.clone().utc();return 0<a.year()&&a.year()<=9999?"function"==typeof Date.prototype.toISOString?this.toDate().toISOString():K(a,"YYYY-MM-DD[T]HH:mm:ss.SSS[Z]"):K(a,"YYYYYY-MM-DD[T]HH:mm:ss.SSS[Z]")}function mb(b){var c=K(this,b||a.defaultFormat);return this.localeData().postformat(c)}function nb(a,b){return this.isValid()?Ya({to:this,from:a}).locale(this.locale()).humanize(!b):this.localeData().invalidDate()}function ob(a){return this.from(Da(),a)}function pb(a,b){return this.isValid()?Ya({from:this,to:a}).locale(this.locale()).humanize(!b):this.localeData().invalidDate()}function qb(a){return this.to(Da(),a)}function rb(a){var b;return void 0===a?this._locale._abbr:(b=y(a),null!=b&&(this._locale=b),this)}function sb(){return this._locale}function tb(a){switch(a=A(a)){case"year":this.month(0);case"quarter":case"month":this.date(1);case"week":case"isoWeek":case"day":this.hours(0);case"hour":this.minutes(0);case"minute":this.seconds(0);case"second":this.milliseconds(0)}return"week"===a&&this.weekday(0),"isoWeek"===a&&this.isoWeekday(1),"quarter"===a&&this.month(3*Math.floor(this.month()/3)),this}function ub(a){return a=A(a),void 0===a||"millisecond"===a?this:this.startOf(a).add(1,"isoWeek"===a?"week":a).subtract(1,"ms")}function vb(){return+this._d-6e4*(this._offset||0)}function wb(){return Math.floor(+this/1e3)}function xb(){return this._offset?new Date(+this):this._d}function yb(){var a=this;return[a.year(),a.month(),a.date(),a.hour(),a.minute(),a.second(),a.millisecond()]}function zb(){var a=this;return{years:a.year(),months:a.month(),date:a.date(),hours:a.hours(),minutes:a.minutes(),seconds:a.seconds(),milliseconds:a.milliseconds()}}function Ab(){return k(this)}function Bb(){return g({},j(this))}function Cb(){return j(this).overflow}function Db(a,b){H(0,[a,a.length],0,b)}function Eb(a,b,c){return ja(Da([a,11,31+b-c]),b,c).week}function Fb(a){var b=ja(this,this.localeData()._week.dow,this.localeData()._week.doy).year;return null==a?b:this.add(a-b,"y")}function Gb(a){var b=ja(this,1,4).year;return null==a?b:this.add(a-b,"y")}function Hb(){return Eb(this.year(),1,4)}function Ib(){var a=this.localeData()._week;return Eb(this.year(),a.dow,a.doy)}function Jb(a){return null==a?Math.ceil((this.month()+1)/3):this.month(3*(a-1)+this.month()%3)}function Kb(a,b){return"string"!=typeof a?a:isNaN(a)?(a=b.weekdaysParse(a),"number"==typeof a?a:null):parseInt(a,10)}function Lb(a){return this._weekdays[a.day()]}function Mb(a){return this._weekdaysShort[a.day()]}function Nb(a){return this._weekdaysMin[a.day()]}function Ob(a){var b,c,d;for(this._weekdaysParse=this._weekdaysParse||[],b=0;7>b;b++)if(this._weekdaysParse[b]||(c=Da([2e3,1]).day(b),d="^"+this.weekdays(c,"")+"|^"+this.weekdaysShort(c,"")+"|^"+this.weekdaysMin(c,""),this._weekdaysParse[b]=new RegExp(d.replace(".",""),"i")),this._weekdaysParse[b].test(a))return b}function Pb(a){var b=this._isUTC?this._d.getUTCDay():this._d.getDay();return null!=a?(a=Kb(a,this.localeData()),this.add(a-b,"d")):b}function Qb(a){var b=(this.day()+7-this.localeData()._week.dow)%7;return null==a?b:this.add(a-b,"d")}function Rb(a){return null==a?this.day()||7:this.day(this.day()%7?a:a-7)}function Sb(a,b){H(a,0,0,function(){return this.localeData().meridiem(this.hours(),this.minutes(),b)})}function Tb(a,b){return b._meridiemParse}function Ub(a){return"p"===(a+"").toLowerCase().charAt(0)}function Vb(a,b,c){return a>11?c?"pm":"PM":c?"am":"AM"}function Wb(a,b){b[ld]=q(1e3*("0."+a))}function Xb(){return this._isUTC?"UTC":""}function Yb(){return this._isUTC?"Coordinated Universal Time":""}function Zb(a){return Da(1e3*a)}function $b(){return Da.apply(null,arguments).parseZone()}function _b(a,b,c){var d=this._calendar[a];return"function"==typeof d?d.call(b,c):d}function ac(a){var b=this._longDateFormat[a],c=this._longDateFormat[a.toUpperCase()];return b||!c?b:(this._longDateFormat[a]=c.replace(/MMMM|MM|DD|dddd/g,function(a){return a.slice(1)}),this._longDateFormat[a])}function bc(){return this._invalidDate}function cc(a){return this._ordinal.replace("%d",a)}function dc(a){return a}function ec(a,b,c,d){var e=this._relativeTime[c];return"function"==typeof e?e(a,b,c,d):e.replace(/%d/i,a)}function fc(a,b){var c=this._relativeTime[a>0?"future":"past"];return"function"==typeof c?c(b):c.replace(/%s/i,b)}function gc(a){var b,c;for(c in a)b=a[c],"function"==typeof b?this[c]=b:this["_"+c]=b;this._ordinalParseLenient=new RegExp(this._ordinalParse.source+"|"+/\d{1,2}/.source)}function hc(a,b,c,d){var e=y(),f=h().set(d,b);return e[c](f,a)}function ic(a,b,c,d,e){if("number"==typeof a&&(b=a,a=void 0),a=a||"",null!=b)return hc(a,b,c,e);var f,g=[];for(f=0;d>f;f++)g[f]=hc(a,f,c,e);return g}function jc(a,b){return ic(a,b,"months",12,"month")}function kc(a,b){return ic(a,b,"monthsShort",12,"month")}function lc(a,b){return ic(a,b,"weekdays",7,"day")}function mc(a,b){return ic(a,b,"weekdaysShort",7,"day")}function nc(a,b){return ic(a,b,"weekdaysMin",7,"day")}function oc(){var a=this._data;return this._milliseconds=Wd(this._milliseconds),this._days=Wd(this._days),this._months=Wd(this._months),a.milliseconds=Wd(a.milliseconds),a.seconds=Wd(a.seconds),a.minutes=Wd(a.minutes),a.hours=Wd(a.hours),a.months=Wd(a.months),a.years=Wd(a.years),this}function pc(a,b,c,d){var e=Ya(b,c);return a._milliseconds+=d*e._milliseconds,a._days+=d*e._days,a._months+=d*e._months,a._bubble()}function qc(a,b){return pc(this,a,b,1)}function rc(a,b){return pc(this,a,b,-1)}function sc(a){return 0>a?Math.floor(a):Math.ceil(a)}function tc(){var a,b,c,d,e,f=this._milliseconds,g=this._days,h=this._months,i=this._data;return f>=0&&g>=0&&h>=0||0>=f&&0>=g&&0>=h||(f+=864e5*sc(vc(h)+g),g=0,h=0),i.milliseconds=f%1e3,a=p(f/1e3),i.seconds=a%60,b=p(a/60),i.minutes=b%60,c=p(b/60),i.hours=c%24,g+=p(c/24),e=p(uc(g)),h+=e,g-=sc(vc(e)),d=p(h/12),h%=12,i.days=g,i.months=h,i.years=d,this}function uc(a){return 4800*a/146097}function vc(a){return 146097*a/4800}function wc(a){var b,c,d=this._milliseconds;if(a=A(a),"month"===a||"year"===a)return b=this._days+d/864e5,c=this._months+uc(b),"month"===a?c:c/12;switch(b=this._days+Math.round(vc(this._months)),a){case"week":return b/7+d/6048e5;case"day":return b+d/864e5;case"hour":return 24*b+d/36e5;case"minute":return 1440*b+d/6e4;case"second":return 86400*b+d/1e3;case"millisecond":return Math.floor(864e5*b)+d;default:throw new Error("Unknown unit "+a)}}function xc(){return this._milliseconds+864e5*this._days+this._months%12*2592e6+31536e6*q(this._months/12)}function yc(a){return function(){return this.as(a)}}function zc(a){return a=A(a),this[a+"s"]()}function Ac(a){return function(){return this._data[a]}}function Bc(){return p(this.days()/7)}function Cc(a,b,c,d,e){return e.relativeTime(b||1,!!c,a,d)}function Dc(a,b,c){var d=Ya(a).abs(),e=ke(d.as("s")),f=ke(d.as("m")),g=ke(d.as("h")),h=ke(d.as("d")),i=ke(d.as("M")),j=ke(d.as("y")),k=e<le.s&&["s",e]||1===f&&["m"]||f<le.m&&["mm",f]||1===g&&["h"]||g<le.h&&["hh",g]||1===h&&["d"]||h<le.d&&["dd",h]||1===i&&["M"]||i<le.M&&["MM",i]||1===j&&["y"]||["yy",j];return k[2]=b,k[3]=+a>0,k[4]=c,Cc.apply(null,k)}function Ec(a,b){return void 0===le[a]?!1:void 0===b?le[a]:(le[a]=b,!0)}function Fc(a){var b=this.localeData(),c=Dc(this,!a,b);return a&&(c=b.pastFuture(+this,c)),b.postformat(c)}function Gc(){var a,b,c,d=me(this._milliseconds)/1e3,e=me(this._days),f=me(this._months);a=p(d/60),b=p(a/60),d%=60,a%=60,c=p(f/12),f%=12;var g=c,h=f,i=e,j=b,k=a,l=d,m=this.asSeconds();return m?(0>m?"-":"")+"P"+(g?g+"Y":"")+(h?h+"M":"")+(i?i+"D":"")+(j||k||l?"T":"")+(j?j+"H":"")+(k?k+"M":"")+(l?l+"S":""):"P0D"}var Hc,Ic,Jc=a.momentProperties=[],Kc=!1,Lc={},Mc={},Nc=/(\[[^\[]*\])|(\\)?(Mo|MM?M?M?|Do|DDDo|DD?D?D?|ddd?d?|do?|w[o|w]?|W[o|W]?|Q|YYYYYY|YYYYY|YYYY|YY|gg(ggg?)?|GG(GGG?)?|e|E|a|A|hh?|HH?|mm?|ss?|S{1,9}|x|X|zz?|ZZ?|.)/g,Oc=/(\[[^\[]*\])|(\\)?(LTS|LT|LL?L?L?|l{1,4})/g,Pc={},Qc={},Rc=/\d/,Sc=/\d\d/,Tc=/\d{3}/,Uc=/\d{4}/,Vc=/[+-]?\d{6}/,Wc=/\d\d?/,Xc=/\d{1,3}/,Yc=/\d{1,4}/,Zc=/[+-]?\d{1,6}/,$c=/\d+/,_c=/[+-]?\d+/,ad=/Z|[+-]\d\d:?\d\d/gi,bd=/[+-]?\d+(\.\d{1,3})?/,cd=/[0-9]*['a-z\u00A0-\u05FF\u0700-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+|[\u0600-\u06FF\/]+(\s*?[\u0600-\u06FF]+){1,2}/i,dd={},ed={},fd=0,gd=1,hd=2,id=3,jd=4,kd=5,ld=6;H("M",["MM",2],"Mo",function(){return this.month()+1}),H("MMM",0,0,function(a){return this.localeData().monthsShort(this,a)}),H("MMMM",0,0,function(a){return this.localeData().months(this,a)}),z("month","M"),N("M",Wc),N("MM",Wc,Sc),N("MMM",cd),N("MMMM",cd),Q(["M","MM"],function(a,b){b[gd]=q(a)-1}),Q(["MMM","MMMM"],function(a,b,c,d){var e=c._locale.monthsParse(a,d,c._strict);null!=e?b[gd]=e:j(c).invalidMonth=a});var md="January_February_March_April_May_June_July_August_September_October_November_December".split("_"),nd="Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_"),od={};a.suppressDeprecationWarnings=!1;var pd=/^\s*(?:[+-]\d{6}|\d{4})-(?:(\d\d-\d\d)|(W\d\d$)|(W\d\d-\d)|(\d\d\d))((T| )(\d\d(:\d\d(:\d\d(\.\d+)?)?)?)?([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?$/,qd=[["YYYYYY-MM-DD",/[+-]\d{6}-\d{2}-\d{2}/],["YYYY-MM-DD",/\d{4}-\d{2}-\d{2}/],["GGGG-[W]WW-E",/\d{4}-W\d{2}-\d/],["GGGG-[W]WW",/\d{4}-W\d{2}/],["YYYY-DDD",/\d{4}-\d{3}/]],rd=[["HH:mm:ss.SSSS",/(T| )\d\d:\d\d:\d\d\.\d+/],["HH:mm:ss",/(T| )\d\d:\d\d:\d\d/],["HH:mm",/(T| )\d\d:\d\d/],["HH",/(T| )\d\d/]],sd=/^\/?Date\((\-?\d+)/i;a.createFromInputFallback=aa("moment construction falls back to js Date. This is discouraged and will be removed in upcoming major release. Please refer to https://github.com/moment/moment/issues/1407 for more info.",function(a){a._d=new Date(a._i+(a._useUTC?" UTC":""))}),H(0,["YY",2],0,function(){return this.year()%100}),H(0,["YYYY",4],0,"year"),H(0,["YYYYY",5],0,"year"),H(0,["YYYYYY",6,!0],0,"year"),z("year","y"),N("Y",_c),N("YY",Wc,Sc),N("YYYY",Yc,Uc),N("YYYYY",Zc,Vc),N("YYYYYY",Zc,Vc),Q(["YYYYY","YYYYYY"],fd),Q("YYYY",function(b,c){c[fd]=2===b.length?a.parseTwoDigitYear(b):q(b)}),Q("YY",function(b,c){c[fd]=a.parseTwoDigitYear(b)}),a.parseTwoDigitYear=function(a){return q(a)+(q(a)>68?1900:2e3)};var td=C("FullYear",!1);H("w",["ww",2],"wo","week"),H("W",["WW",2],"Wo","isoWeek"),z("week","w"),z("isoWeek","W"),N("w",Wc),N("ww",Wc,Sc),N("W",Wc),N("WW",Wc,Sc),R(["w","ww","W","WW"],function(a,b,c,d){b[d.substr(0,1)]=q(a)});var ud={dow:0,doy:6};H("DDD",["DDDD",3],"DDDo","dayOfYear"),z("dayOfYear","DDD"),N("DDD",Xc),N("DDDD",Tc),Q(["DDD","DDDD"],function(a,b,c){c._dayOfYear=q(a)}),a.ISO_8601=function(){};var vd=aa("moment().min is deprecated, use moment.min instead. https://github.com/moment/moment/issues/1548",function(){var a=Da.apply(null,arguments);return this>a?this:a}),wd=aa("moment().max is deprecated, use moment.max instead. https://github.com/moment/moment/issues/1548",function(){var a=Da.apply(null,arguments);return a>this?this:a});Ja("Z",":"),Ja("ZZ",""),N("Z",ad),N("ZZ",ad),Q(["Z","ZZ"],function(a,b,c){c._useUTC=!0,c._tzm=Ka(a)});var xd=/([\+\-]|\d\d)/gi;a.updateOffset=function(){};var yd=/(\-)?(?:(\d*)\.)?(\d+)\:(\d+)(?:\:(\d+)\.?(\d{3})?)?/,zd=/^(-)?P(?:(?:([0-9,.]*)Y)?(?:([0-9,.]*)M)?(?:([0-9,.]*)D)?(?:T(?:([0-9,.]*)H)?(?:([0-9,.]*)M)?(?:([0-9,.]*)S)?)?|([0-9,.]*)W)$/;Ya.fn=Ha.prototype;var Ad=ab(1,"add"),Bd=ab(-1,"subtract");a.defaultFormat="YYYY-MM-DDTHH:mm:ssZ";var Cd=aa("moment().lang() is deprecated. Instead, use moment().localeData() to get the language configuration. Use moment().locale() to change languages.",function(a){return void 0===a?this.localeData():this.locale(a)});H(0,["gg",2],0,function(){return this.weekYear()%100}),H(0,["GG",2],0,function(){return this.isoWeekYear()%100}),Db("gggg","weekYear"),Db("ggggg","weekYear"),Db("GGGG","isoWeekYear"),Db("GGGGG","isoWeekYear"),z("weekYear","gg"),z("isoWeekYear","GG"),N("G",_c),N("g",_c),N("GG",Wc,Sc),N("gg",Wc,Sc),N("GGGG",Yc,Uc),N("gggg",Yc,Uc),N("GGGGG",Zc,Vc),N("ggggg",Zc,Vc),R(["gggg","ggggg","GGGG","GGGGG"],function(a,b,c,d){b[d.substr(0,2)]=q(a)}),R(["gg","GG"],function(b,c,d,e){c[e]=a.parseTwoDigitYear(b)}),H("Q",0,0,"quarter"),z("quarter","Q"),N("Q",Rc),Q("Q",function(a,b){b[gd]=3*(q(a)-1)}),H("D",["DD",2],"Do","date"),z("date","D"),N("D",Wc),N("DD",Wc,Sc),N("Do",function(a,b){return a?b._ordinalParse:b._ordinalParseLenient}),Q(["D","DD"],hd),Q("Do",function(a,b){b[hd]=q(a.match(Wc)[0],10)});var Dd=C("Date",!0);H("d",0,"do","day"),H("dd",0,0,function(a){return this.localeData().weekdaysMin(this,a)}),H("ddd",0,0,function(a){return this.localeData().weekdaysShort(this,a)}),H("dddd",0,0,function(a){return this.localeData().weekdays(this,a)}),H("e",0,0,"weekday"),H("E",0,0,"isoWeekday"),z("day","d"),z("weekday","e"),z("isoWeekday","E"),N("d",Wc),N("e",Wc),N("E",Wc),N("dd",cd),N("ddd",cd),N("dddd",cd),R(["dd","ddd","dddd"],function(a,b,c){var d=c._locale.weekdaysParse(a);null!=d?b.d=d:j(c).invalidWeekday=a}),R(["d","e","E"],function(a,b,c,d){b[d]=q(a)});var Ed="Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),Fd="Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_"),Gd="Su_Mo_Tu_We_Th_Fr_Sa".split("_");H("H",["HH",2],0,"hour"),H("h",["hh",2],0,function(){return this.hours()%12||12}),Sb("a",!0),Sb("A",!1),z("hour","h"),N("a",Tb),N("A",Tb),N("H",Wc),N("h",Wc),N("HH",Wc,Sc),N("hh",Wc,Sc),Q(["H","HH"],id),Q(["a","A"],function(a,b,c){c._isPm=c._locale.isPM(a),c._meridiem=a}),Q(["h","hh"],function(a,b,c){b[id]=q(a),j(c).bigHour=!0});var Hd=/[ap]\.?m?\.?/i,Id=C("Hours",!0);H("m",["mm",2],0,"minute"),z("minute","m"),N("m",Wc),N("mm",Wc,Sc),Q(["m","mm"],jd);var Jd=C("Minutes",!1);H("s",["ss",2],0,"second"),z("second","s"),N("s",Wc),N("ss",Wc,Sc),Q(["s","ss"],kd);var Kd=C("Seconds",!1);H("S",0,0,function(){return~~(this.millisecond()/100)}),H(0,["SS",2],0,function(){return~~(this.millisecond()/10)}),H(0,["SSS",3],0,"millisecond"),H(0,["SSSS",4],0,function(){return 10*this.millisecond()}),H(0,["SSSSS",5],0,function(){return 100*this.millisecond()}),H(0,["SSSSSS",6],0,function(){return 1e3*this.millisecond()}),H(0,["SSSSSSS",7],0,function(){return 1e4*this.millisecond()}),H(0,["SSSSSSSS",8],0,function(){return 1e5*this.millisecond()}),H(0,["SSSSSSSSS",9],0,function(){return 1e6*this.millisecond()}),z("millisecond","ms"),N("S",Xc,Rc),N("SS",Xc,Sc),N("SSS",Xc,Tc);var Ld;for(Ld="SSSS";Ld.length<=9;Ld+="S")N(Ld,$c);for(Ld="S";Ld.length<=9;Ld+="S")Q(Ld,Wb);var Md=C("Milliseconds",!1);H("z",0,0,"zoneAbbr"),H("zz",0,0,"zoneName");var Nd=n.prototype;Nd.add=Ad,Nd.calendar=cb,Nd.clone=db,Nd.diff=ib,Nd.endOf=ub,Nd.format=mb,Nd.from=nb,Nd.fromNow=ob,Nd.to=pb,Nd.toNow=qb,Nd.get=F,Nd.invalidAt=Cb,Nd.isAfter=eb,Nd.isBefore=fb,Nd.isBetween=gb,Nd.isSame=hb,Nd.isValid=Ab,Nd.lang=Cd,Nd.locale=rb,Nd.localeData=sb,Nd.max=wd,Nd.min=vd,Nd.parsingFlags=Bb,Nd.set=F,Nd.startOf=tb,Nd.subtract=Bd,Nd.toArray=yb,Nd.toObject=zb,Nd.toDate=xb,Nd.toISOString=lb,Nd.toJSON=lb,Nd.toString=kb,Nd.unix=wb,Nd.valueOf=vb,Nd.year=td,Nd.isLeapYear=ia,Nd.weekYear=Fb,Nd.isoWeekYear=Gb,Nd.quarter=Nd.quarters=Jb,Nd.month=Y,Nd.daysInMonth=Z,Nd.week=Nd.weeks=na,Nd.isoWeek=Nd.isoWeeks=oa,Nd.weeksInYear=Ib,Nd.isoWeeksInYear=Hb,Nd.date=Dd,Nd.day=Nd.days=Pb,Nd.weekday=Qb,Nd.isoWeekday=Rb,Nd.dayOfYear=qa,Nd.hour=Nd.hours=Id,Nd.minute=Nd.minutes=Jd,Nd.second=Nd.seconds=Kd,
Nd.millisecond=Nd.milliseconds=Md,Nd.utcOffset=Na,Nd.utc=Pa,Nd.local=Qa,Nd.parseZone=Ra,Nd.hasAlignedHourOffset=Sa,Nd.isDST=Ta,Nd.isDSTShifted=Ua,Nd.isLocal=Va,Nd.isUtcOffset=Wa,Nd.isUtc=Xa,Nd.isUTC=Xa,Nd.zoneAbbr=Xb,Nd.zoneName=Yb,Nd.dates=aa("dates accessor is deprecated. Use date instead.",Dd),Nd.months=aa("months accessor is deprecated. Use month instead",Y),Nd.years=aa("years accessor is deprecated. Use year instead",td),Nd.zone=aa("moment().zone is deprecated, use moment().utcOffset instead. https://github.com/moment/moment/issues/1779",Oa);var Od=Nd,Pd={sameDay:"[Today at] LT",nextDay:"[Tomorrow at] LT",nextWeek:"dddd [at] LT",lastDay:"[Yesterday at] LT",lastWeek:"[Last] dddd [at] LT",sameElse:"L"},Qd={LTS:"h:mm:ss A",LT:"h:mm A",L:"MM/DD/YYYY",LL:"MMMM D, YYYY",LLL:"MMMM D, YYYY h:mm A",LLLL:"dddd, MMMM D, YYYY h:mm A"},Rd="Invalid date",Sd="%d",Td=/\d{1,2}/,Ud={future:"in %s",past:"%s ago",s:"a few seconds",m:"a minute",mm:"%d minutes",h:"an hour",hh:"%d hours",d:"a day",dd:"%d days",M:"a month",MM:"%d months",y:"a year",yy:"%d years"},Vd=s.prototype;Vd._calendar=Pd,Vd.calendar=_b,Vd._longDateFormat=Qd,Vd.longDateFormat=ac,Vd._invalidDate=Rd,Vd.invalidDate=bc,Vd._ordinal=Sd,Vd.ordinal=cc,Vd._ordinalParse=Td,Vd.preparse=dc,Vd.postformat=dc,Vd._relativeTime=Ud,Vd.relativeTime=ec,Vd.pastFuture=fc,Vd.set=gc,Vd.months=U,Vd._months=md,Vd.monthsShort=V,Vd._monthsShort=nd,Vd.monthsParse=W,Vd.week=ka,Vd._week=ud,Vd.firstDayOfYear=ma,Vd.firstDayOfWeek=la,Vd.weekdays=Lb,Vd._weekdays=Ed,Vd.weekdaysMin=Nb,Vd._weekdaysMin=Gd,Vd.weekdaysShort=Mb,Vd._weekdaysShort=Fd,Vd.weekdaysParse=Ob,Vd.isPM=Ub,Vd._meridiemParse=Hd,Vd.meridiem=Vb,w("en",{ordinalParse:/\d{1,2}(th|st|nd|rd)/,ordinal:function(a){var b=a%10,c=1===q(a%100/10)?"th":1===b?"st":2===b?"nd":3===b?"rd":"th";return a+c}}),a.lang=aa("moment.lang is deprecated. Use moment.locale instead.",w),a.langData=aa("moment.langData is deprecated. Use moment.localeData instead.",y);var Wd=Math.abs,Xd=yc("ms"),Yd=yc("s"),Zd=yc("m"),$d=yc("h"),_d=yc("d"),ae=yc("w"),be=yc("M"),ce=yc("y"),de=Ac("milliseconds"),ee=Ac("seconds"),fe=Ac("minutes"),ge=Ac("hours"),he=Ac("days"),ie=Ac("months"),je=Ac("years"),ke=Math.round,le={s:45,m:45,h:22,d:26,M:11},me=Math.abs,ne=Ha.prototype;ne.abs=oc,ne.add=qc,ne.subtract=rc,ne.as=wc,ne.asMilliseconds=Xd,ne.asSeconds=Yd,ne.asMinutes=Zd,ne.asHours=$d,ne.asDays=_d,ne.asWeeks=ae,ne.asMonths=be,ne.asYears=ce,ne.valueOf=xc,ne._bubble=tc,ne.get=zc,ne.milliseconds=de,ne.seconds=ee,ne.minutes=fe,ne.hours=ge,ne.days=he,ne.weeks=Bc,ne.months=ie,ne.years=je,ne.humanize=Fc,ne.toISOString=Gc,ne.toString=Gc,ne.toJSON=Gc,ne.locale=rb,ne.localeData=sb,ne.toIsoString=aa("toIsoString() is deprecated. Please use toISOString() instead (notice the capitals)",Gc),ne.lang=Cd,H("X",0,0,"unix"),H("x",0,0,"valueOf"),N("x",_c),N("X",bd),Q("X",function(a,b,c){c._d=new Date(1e3*parseFloat(a,10))}),Q("x",function(a,b,c){c._d=new Date(q(a))}),a.version="2.10.6",b(Da),a.fn=Od,a.min=Fa,a.max=Ga,a.utc=h,a.unix=Zb,a.months=jc,a.isDate=d,a.locale=w,a.invalid=l,a.duration=Ya,a.isMoment=o,a.weekdays=lc,a.parseZone=$b,a.localeData=y,a.isDuration=Ia,a.monthsShort=kc,a.weekdaysMin=nc,a.defineLocale=x,a.weekdaysShort=mc,a.normalizeUnits=A,a.relativeTimeThreshold=Ec;var oe=a;return oe});
/*!
 * Bootstrap v3.3.5 (http://getbootstrap.com)
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under the MIT license
 */
if("undefined"==typeof jQuery)throw new Error("Bootstrap's JavaScript requires jQuery");+function(a){"use strict";var b=a.fn.jquery.split(" ")[0].split(".");if(b[0]<2&&b[1]<9||1==b[0]&&9==b[1]&&b[2]<1)throw new Error("Bootstrap's JavaScript requires jQuery version 1.9.1 or higher")}(jQuery),+function(a){"use strict";function b(){var a=document.createElement("bootstrap"),b={WebkitTransition:"webkitTransitionEnd",MozTransition:"transitionend",OTransition:"oTransitionEnd otransitionend",transition:"transitionend"};for(var c in b)if(void 0!==a.style[c])return{end:b[c]};return!1}a.fn.emulateTransitionEnd=function(b){var c=!1,d=this;a(this).one("bsTransitionEnd",function(){c=!0});var e=function(){c||a(d).trigger(a.support.transition.end)};return setTimeout(e,b),this},a(function(){a.support.transition=b(),a.support.transition&&(a.event.special.bsTransitionEnd={bindType:a.support.transition.end,delegateType:a.support.transition.end,handle:function(b){return a(b.target).is(this)?b.handleObj.handler.apply(this,arguments):void 0}})})}(jQuery),+function(a){"use strict";function b(b){return this.each(function(){var c=a(this),e=c.data("bs.alert");e||c.data("bs.alert",e=new d(this)),"string"==typeof b&&e[b].call(c)})}var c='[data-dismiss="alert"]',d=function(b){a(b).on("click",c,this.close)};d.VERSION="3.3.5",d.TRANSITION_DURATION=150,d.prototype.close=function(b){function c(){g.detach().trigger("closed.bs.alert").remove()}var e=a(this),f=e.attr("data-target");f||(f=e.attr("href"),f=f&&f.replace(/.*(?=#[^\s]*$)/,""));var g=a(f);b&&b.preventDefault(),g.length||(g=e.closest(".alert")),g.trigger(b=a.Event("close.bs.alert")),b.isDefaultPrevented()||(g.removeClass("in"),a.support.transition&&g.hasClass("fade")?g.one("bsTransitionEnd",c).emulateTransitionEnd(d.TRANSITION_DURATION):c())};var e=a.fn.alert;a.fn.alert=b,a.fn.alert.Constructor=d,a.fn.alert.noConflict=function(){return a.fn.alert=e,this},a(document).on("click.bs.alert.data-api",c,d.prototype.close)}(jQuery),+function(a){"use strict";function b(b){return this.each(function(){var d=a(this),e=d.data("bs.button"),f="object"==typeof b&&b;e||d.data("bs.button",e=new c(this,f)),"toggle"==b?e.toggle():b&&e.setState(b)})}var c=function(b,d){this.$element=a(b),this.options=a.extend({},c.DEFAULTS,d),this.isLoading=!1};c.VERSION="3.3.5",c.DEFAULTS={loadingText:"loading..."},c.prototype.setState=function(b){var c="disabled",d=this.$element,e=d.is("input")?"val":"html",f=d.data();b+="Text",null==f.resetText&&d.data("resetText",d[e]()),setTimeout(a.proxy(function(){d[e](null==f[b]?this.options[b]:f[b]),"loadingText"==b?(this.isLoading=!0,d.addClass(c).attr(c,c)):this.isLoading&&(this.isLoading=!1,d.removeClass(c).removeAttr(c))},this),0)},c.prototype.toggle=function(){var a=!0,b=this.$element.closest('[data-toggle="buttons"]');if(b.length){var c=this.$element.find("input");"radio"==c.prop("type")?(c.prop("checked")&&(a=!1),b.find(".active").removeClass("active"),this.$element.addClass("active")):"checkbox"==c.prop("type")&&(c.prop("checked")!==this.$element.hasClass("active")&&(a=!1),this.$element.toggleClass("active")),c.prop("checked",this.$element.hasClass("active")),a&&c.trigger("change")}else this.$element.attr("aria-pressed",!this.$element.hasClass("active")),this.$element.toggleClass("active")};var d=a.fn.button;a.fn.button=b,a.fn.button.Constructor=c,a.fn.button.noConflict=function(){return a.fn.button=d,this},a(document).on("click.bs.button.data-api",'[data-toggle^="button"]',function(c){var d=a(c.target);d.hasClass("btn")||(d=d.closest(".btn")),b.call(d,"toggle"),a(c.target).is('input[type="radio"]')||a(c.target).is('input[type="checkbox"]')||c.preventDefault()}).on("focus.bs.button.data-api blur.bs.button.data-api",'[data-toggle^="button"]',function(b){a(b.target).closest(".btn").toggleClass("focus",/^focus(in)?$/.test(b.type))})}(jQuery),+function(a){"use strict";function b(b){return this.each(function(){var d=a(this),e=d.data("bs.carousel"),f=a.extend({},c.DEFAULTS,d.data(),"object"==typeof b&&b),g="string"==typeof b?b:f.slide;e||d.data("bs.carousel",e=new c(this,f)),"number"==typeof b?e.to(b):g?e[g]():f.interval&&e.pause().cycle()})}var c=function(b,c){this.$element=a(b),this.$indicators=this.$element.find(".carousel-indicators"),this.options=c,this.paused=null,this.sliding=null,this.interval=null,this.$active=null,this.$items=null,this.options.keyboard&&this.$element.on("keydown.bs.carousel",a.proxy(this.keydown,this)),"hover"==this.options.pause&&!("ontouchstart"in document.documentElement)&&this.$element.on("mouseenter.bs.carousel",a.proxy(this.pause,this)).on("mouseleave.bs.carousel",a.proxy(this.cycle,this))};c.VERSION="3.3.5",c.TRANSITION_DURATION=600,c.DEFAULTS={interval:5e3,pause:"hover",wrap:!0,keyboard:!0},c.prototype.keydown=function(a){if(!/input|textarea/i.test(a.target.tagName)){switch(a.which){case 37:this.prev();break;case 39:this.next();break;default:return}a.preventDefault()}},c.prototype.cycle=function(b){return b||(this.paused=!1),this.interval&&clearInterval(this.interval),this.options.interval&&!this.paused&&(this.interval=setInterval(a.proxy(this.next,this),this.options.interval)),this},c.prototype.getItemIndex=function(a){return this.$items=a.parent().children(".item"),this.$items.index(a||this.$active)},c.prototype.getItemForDirection=function(a,b){var c=this.getItemIndex(b),d="prev"==a&&0===c||"next"==a&&c==this.$items.length-1;if(d&&!this.options.wrap)return b;var e="prev"==a?-1:1,f=(c+e)%this.$items.length;return this.$items.eq(f)},c.prototype.to=function(a){var b=this,c=this.getItemIndex(this.$active=this.$element.find(".item.active"));return a>this.$items.length-1||0>a?void 0:this.sliding?this.$element.one("slid.bs.carousel",function(){b.to(a)}):c==a?this.pause().cycle():this.slide(a>c?"next":"prev",this.$items.eq(a))},c.prototype.pause=function(b){return b||(this.paused=!0),this.$element.find(".next, .prev").length&&a.support.transition&&(this.$element.trigger(a.support.transition.end),this.cycle(!0)),this.interval=clearInterval(this.interval),this},c.prototype.next=function(){return this.sliding?void 0:this.slide("next")},c.prototype.prev=function(){return this.sliding?void 0:this.slide("prev")},c.prototype.slide=function(b,d){var e=this.$element.find(".item.active"),f=d||this.getItemForDirection(b,e),g=this.interval,h="next"==b?"left":"right",i=this;if(f.hasClass("active"))return this.sliding=!1;var j=f[0],k=a.Event("slide.bs.carousel",{relatedTarget:j,direction:h});if(this.$element.trigger(k),!k.isDefaultPrevented()){if(this.sliding=!0,g&&this.pause(),this.$indicators.length){this.$indicators.find(".active").removeClass("active");var l=a(this.$indicators.children()[this.getItemIndex(f)]);l&&l.addClass("active")}var m=a.Event("slid.bs.carousel",{relatedTarget:j,direction:h});return a.support.transition&&this.$element.hasClass("slide")?(f.addClass(b),f[0].offsetWidth,e.addClass(h),f.addClass(h),e.one("bsTransitionEnd",function(){f.removeClass([b,h].join(" ")).addClass("active"),e.removeClass(["active",h].join(" ")),i.sliding=!1,setTimeout(function(){i.$element.trigger(m)},0)}).emulateTransitionEnd(c.TRANSITION_DURATION)):(e.removeClass("active"),f.addClass("active"),this.sliding=!1,this.$element.trigger(m)),g&&this.cycle(),this}};var d=a.fn.carousel;a.fn.carousel=b,a.fn.carousel.Constructor=c,a.fn.carousel.noConflict=function(){return a.fn.carousel=d,this};var e=function(c){var d,e=a(this),f=a(e.attr("data-target")||(d=e.attr("href"))&&d.replace(/.*(?=#[^\s]+$)/,""));if(f.hasClass("carousel")){var g=a.extend({},f.data(),e.data()),h=e.attr("data-slide-to");h&&(g.interval=!1),b.call(f,g),h&&f.data("bs.carousel").to(h),c.preventDefault()}};a(document).on("click.bs.carousel.data-api","[data-slide]",e).on("click.bs.carousel.data-api","[data-slide-to]",e),a(window).on("load",function(){a('[data-ride="carousel"]').each(function(){var c=a(this);b.call(c,c.data())})})}(jQuery),+function(a){"use strict";function b(b){var c,d=b.attr("data-target")||(c=b.attr("href"))&&c.replace(/.*(?=#[^\s]+$)/,"");return a(d)}function c(b){return this.each(function(){var c=a(this),e=c.data("bs.collapse"),f=a.extend({},d.DEFAULTS,c.data(),"object"==typeof b&&b);!e&&f.toggle&&/show|hide/.test(b)&&(f.toggle=!1),e||c.data("bs.collapse",e=new d(this,f)),"string"==typeof b&&e[b]()})}var d=function(b,c){this.$element=a(b),this.options=a.extend({},d.DEFAULTS,c),this.$trigger=a('[data-toggle="collapse"][href="#'+b.id+'"],[data-toggle="collapse"][data-target="#'+b.id+'"]'),this.transitioning=null,this.options.parent?this.$parent=this.getParent():this.addAriaAndCollapsedClass(this.$element,this.$trigger),this.options.toggle&&this.toggle()};d.VERSION="3.3.5",d.TRANSITION_DURATION=350,d.DEFAULTS={toggle:!0},d.prototype.dimension=function(){var a=this.$element.hasClass("width");return a?"width":"height"},d.prototype.show=function(){if(!this.transitioning&&!this.$element.hasClass("in")){var b,e=this.$parent&&this.$parent.children(".panel").children(".in, .collapsing");if(!(e&&e.length&&(b=e.data("bs.collapse"),b&&b.transitioning))){var f=a.Event("show.bs.collapse");if(this.$element.trigger(f),!f.isDefaultPrevented()){e&&e.length&&(c.call(e,"hide"),b||e.data("bs.collapse",null));var g=this.dimension();this.$element.removeClass("collapse").addClass("collapsing")[g](0).attr("aria-expanded",!0),this.$trigger.removeClass("collapsed").attr("aria-expanded",!0),this.transitioning=1;var h=function(){this.$element.removeClass("collapsing").addClass("collapse in")[g](""),this.transitioning=0,this.$element.trigger("shown.bs.collapse")};if(!a.support.transition)return h.call(this);var i=a.camelCase(["scroll",g].join("-"));this.$element.one("bsTransitionEnd",a.proxy(h,this)).emulateTransitionEnd(d.TRANSITION_DURATION)[g](this.$element[0][i])}}}},d.prototype.hide=function(){if(!this.transitioning&&this.$element.hasClass("in")){var b=a.Event("hide.bs.collapse");if(this.$element.trigger(b),!b.isDefaultPrevented()){var c=this.dimension();this.$element[c](this.$element[c]())[0].offsetHeight,this.$element.addClass("collapsing").removeClass("collapse in").attr("aria-expanded",!1),this.$trigger.addClass("collapsed").attr("aria-expanded",!1),this.transitioning=1;var e=function(){this.transitioning=0,this.$element.removeClass("collapsing").addClass("collapse").trigger("hidden.bs.collapse")};return a.support.transition?void this.$element[c](0).one("bsTransitionEnd",a.proxy(e,this)).emulateTransitionEnd(d.TRANSITION_DURATION):e.call(this)}}},d.prototype.toggle=function(){this[this.$element.hasClass("in")?"hide":"show"]()},d.prototype.getParent=function(){return a(this.options.parent).find('[data-toggle="collapse"][data-parent="'+this.options.parent+'"]').each(a.proxy(function(c,d){var e=a(d);this.addAriaAndCollapsedClass(b(e),e)},this)).end()},d.prototype.addAriaAndCollapsedClass=function(a,b){var c=a.hasClass("in");a.attr("aria-expanded",c),b.toggleClass("collapsed",!c).attr("aria-expanded",c)};var e=a.fn.collapse;a.fn.collapse=c,a.fn.collapse.Constructor=d,a.fn.collapse.noConflict=function(){return a.fn.collapse=e,this},a(document).on("click.bs.collapse.data-api",'[data-toggle="collapse"]',function(d){var e=a(this);e.attr("data-target")||d.preventDefault();var f=b(e),g=f.data("bs.collapse"),h=g?"toggle":e.data();c.call(f,h)})}(jQuery),+function(a){"use strict";function b(b){var c=b.attr("data-target");c||(c=b.attr("href"),c=c&&/#[A-Za-z]/.test(c)&&c.replace(/.*(?=#[^\s]*$)/,""));var d=c&&a(c);return d&&d.length?d:b.parent()}function c(c){c&&3===c.which||(a(e).remove(),a(f).each(function(){var d=a(this),e=b(d),f={relatedTarget:this};e.hasClass("open")&&(c&&"click"==c.type&&/input|textarea/i.test(c.target.tagName)&&a.contains(e[0],c.target)||(e.trigger(c=a.Event("hide.bs.dropdown",f)),c.isDefaultPrevented()||(d.attr("aria-expanded","false"),e.removeClass("open").trigger("hidden.bs.dropdown",f))))}))}function d(b){return this.each(function(){var c=a(this),d=c.data("bs.dropdown");d||c.data("bs.dropdown",d=new g(this)),"string"==typeof b&&d[b].call(c)})}var e=".dropdown-backdrop",f='[data-toggle="dropdown"]',g=function(b){a(b).on("click.bs.dropdown",this.toggle)};g.VERSION="3.3.5",g.prototype.toggle=function(d){var e=a(this);if(!e.is(".disabled, :disabled")){var f=b(e),g=f.hasClass("open");if(c(),!g){"ontouchstart"in document.documentElement&&!f.closest(".navbar-nav").length&&a(document.createElement("div")).addClass("dropdown-backdrop").insertAfter(a(this)).on("click",c);var h={relatedTarget:this};if(f.trigger(d=a.Event("show.bs.dropdown",h)),d.isDefaultPrevented())return;e.trigger("focus").attr("aria-expanded","true"),f.toggleClass("open").trigger("shown.bs.dropdown",h)}return!1}},g.prototype.keydown=function(c){if(/(38|40|27|32)/.test(c.which)&&!/input|textarea/i.test(c.target.tagName)){var d=a(this);if(c.preventDefault(),c.stopPropagation(),!d.is(".disabled, :disabled")){var e=b(d),g=e.hasClass("open");if(!g&&27!=c.which||g&&27==c.which)return 27==c.which&&e.find(f).trigger("focus"),d.trigger("click");var h=" li:not(.disabled):visible a",i=e.find(".dropdown-menu"+h);if(i.length){var j=i.index(c.target);38==c.which&&j>0&&j--,40==c.which&&j<i.length-1&&j++,~j||(j=0),i.eq(j).trigger("focus")}}}};var h=a.fn.dropdown;a.fn.dropdown=d,a.fn.dropdown.Constructor=g,a.fn.dropdown.noConflict=function(){return a.fn.dropdown=h,this},a(document).on("click.bs.dropdown.data-api",c).on("click.bs.dropdown.data-api",".dropdown form",function(a){a.stopPropagation()}).on("click.bs.dropdown.data-api",f,g.prototype.toggle).on("keydown.bs.dropdown.data-api",f,g.prototype.keydown).on("keydown.bs.dropdown.data-api",".dropdown-menu",g.prototype.keydown)}(jQuery),+function(a){"use strict";function b(b,d){return this.each(function(){var e=a(this),f=e.data("bs.modal"),g=a.extend({},c.DEFAULTS,e.data(),"object"==typeof b&&b);f||e.data("bs.modal",f=new c(this,g)),"string"==typeof b?f[b](d):g.show&&f.show(d)})}var c=function(b,c){this.options=c,this.$body=a(document.body),this.$element=a(b),this.$dialog=this.$element.find(".modal-dialog"),this.$backdrop=null,this.isShown=null,this.originalBodyPad=null,this.scrollbarWidth=0,this.ignoreBackdropClick=!1,this.options.remote&&this.$element.find(".modal-content").load(this.options.remote,a.proxy(function(){this.$element.trigger("loaded.bs.modal")},this))};c.VERSION="3.3.5",c.TRANSITION_DURATION=300,c.BACKDROP_TRANSITION_DURATION=150,c.DEFAULTS={backdrop:!0,keyboard:!0,show:!0},c.prototype.toggle=function(a){return this.isShown?this.hide():this.show(a)},c.prototype.show=function(b){var d=this,e=a.Event("show.bs.modal",{relatedTarget:b});this.$element.trigger(e),this.isShown||e.isDefaultPrevented()||(this.isShown=!0,this.checkScrollbar(),this.setScrollbar(),this.$body.addClass("modal-open"),this.escape(),this.resize(),this.$element.on("click.dismiss.bs.modal",'[data-dismiss="modal"]',a.proxy(this.hide,this)),this.$dialog.on("mousedown.dismiss.bs.modal",function(){d.$element.one("mouseup.dismiss.bs.modal",function(b){a(b.target).is(d.$element)&&(d.ignoreBackdropClick=!0)})}),this.backdrop(function(){var e=a.support.transition&&d.$element.hasClass("fade");d.$element.parent().length||d.$element.appendTo(d.$body),d.$element.show().scrollTop(0),d.adjustDialog(),e&&d.$element[0].offsetWidth,d.$element.addClass("in"),d.enforceFocus();var f=a.Event("shown.bs.modal",{relatedTarget:b});e?d.$dialog.one("bsTransitionEnd",function(){d.$element.trigger("focus").trigger(f)}).emulateTransitionEnd(c.TRANSITION_DURATION):d.$element.trigger("focus").trigger(f)}))},c.prototype.hide=function(b){b&&b.preventDefault(),b=a.Event("hide.bs.modal"),this.$element.trigger(b),this.isShown&&!b.isDefaultPrevented()&&(this.isShown=!1,this.escape(),this.resize(),a(document).off("focusin.bs.modal"),this.$element.removeClass("in").off("click.dismiss.bs.modal").off("mouseup.dismiss.bs.modal"),this.$dialog.off("mousedown.dismiss.bs.modal"),a.support.transition&&this.$element.hasClass("fade")?this.$element.one("bsTransitionEnd",a.proxy(this.hideModal,this)).emulateTransitionEnd(c.TRANSITION_DURATION):this.hideModal())},c.prototype.enforceFocus=function(){a(document).off("focusin.bs.modal").on("focusin.bs.modal",a.proxy(function(a){this.$element[0]===a.target||this.$element.has(a.target).length||this.$element.trigger("focus")},this))},c.prototype.escape=function(){this.isShown&&this.options.keyboard?this.$element.on("keydown.dismiss.bs.modal",a.proxy(function(a){27==a.which&&this.hide()},this)):this.isShown||this.$element.off("keydown.dismiss.bs.modal")},c.prototype.resize=function(){this.isShown?a(window).on("resize.bs.modal",a.proxy(this.handleUpdate,this)):a(window).off("resize.bs.modal")},c.prototype.hideModal=function(){var a=this;this.$element.hide(),this.backdrop(function(){a.$body.removeClass("modal-open"),a.resetAdjustments(),a.resetScrollbar(),a.$element.trigger("hidden.bs.modal")})},c.prototype.removeBackdrop=function(){this.$backdrop&&this.$backdrop.remove(),this.$backdrop=null},c.prototype.backdrop=function(b){var d=this,e=this.$element.hasClass("fade")?"fade":"";if(this.isShown&&this.options.backdrop){var f=a.support.transition&&e;if(this.$backdrop=a(document.createElement("div")).addClass("modal-backdrop "+e).appendTo(this.$body),this.$element.on("click.dismiss.bs.modal",a.proxy(function(a){return this.ignoreBackdropClick?void(this.ignoreBackdropClick=!1):void(a.target===a.currentTarget&&("static"==this.options.backdrop?this.$element[0].focus():this.hide()))},this)),f&&this.$backdrop[0].offsetWidth,this.$backdrop.addClass("in"),!b)return;f?this.$backdrop.one("bsTransitionEnd",b).emulateTransitionEnd(c.BACKDROP_TRANSITION_DURATION):b()}else if(!this.isShown&&this.$backdrop){this.$backdrop.removeClass("in");var g=function(){d.removeBackdrop(),b&&b()};a.support.transition&&this.$element.hasClass("fade")?this.$backdrop.one("bsTransitionEnd",g).emulateTransitionEnd(c.BACKDROP_TRANSITION_DURATION):g()}else b&&b()},c.prototype.handleUpdate=function(){this.adjustDialog()},c.prototype.adjustDialog=function(){var a=this.$element[0].scrollHeight>document.documentElement.clientHeight;this.$element.css({paddingLeft:!this.bodyIsOverflowing&&a?this.scrollbarWidth:"",paddingRight:this.bodyIsOverflowing&&!a?this.scrollbarWidth:""})},c.prototype.resetAdjustments=function(){this.$element.css({paddingLeft:"",paddingRight:""})},c.prototype.checkScrollbar=function(){var a=window.innerWidth;if(!a){var b=document.documentElement.getBoundingClientRect();a=b.right-Math.abs(b.left)}this.bodyIsOverflowing=document.body.clientWidth<a,this.scrollbarWidth=this.measureScrollbar()},c.prototype.setScrollbar=function(){var a=parseInt(this.$body.css("padding-right")||0,10);this.originalBodyPad=document.body.style.paddingRight||"",this.bodyIsOverflowing&&this.$body.css("padding-right",a+this.scrollbarWidth)},c.prototype.resetScrollbar=function(){this.$body.css("padding-right",this.originalBodyPad)},c.prototype.measureScrollbar=function(){var a=document.createElement("div");a.className="modal-scrollbar-measure",this.$body.append(a);var b=a.offsetWidth-a.clientWidth;return this.$body[0].removeChild(a),b};var d=a.fn.modal;a.fn.modal=b,a.fn.modal.Constructor=c,a.fn.modal.noConflict=function(){return a.fn.modal=d,this},a(document).on("click.bs.modal.data-api",'[data-toggle="modal"]',function(c){var d=a(this),e=d.attr("href"),f=a(d.attr("data-target")||e&&e.replace(/.*(?=#[^\s]+$)/,"")),g=f.data("bs.modal")?"toggle":a.extend({remote:!/#/.test(e)&&e},f.data(),d.data());d.is("a")&&c.preventDefault(),f.one("show.bs.modal",function(a){a.isDefaultPrevented()||f.one("hidden.bs.modal",function(){d.is(":visible")&&d.trigger("focus")})}),b.call(f,g,this)})}(jQuery),+function(a){"use strict";function b(b){return this.each(function(){var d=a(this),e=d.data("bs.tooltip"),f="object"==typeof b&&b;(e||!/destroy|hide/.test(b))&&(e||d.data("bs.tooltip",e=new c(this,f)),"string"==typeof b&&e[b]())})}var c=function(a,b){this.type=null,this.options=null,this.enabled=null,this.timeout=null,this.hoverState=null,this.$element=null,this.inState=null,this.init("tooltip",a,b)};c.VERSION="3.3.5",c.TRANSITION_DURATION=150,c.DEFAULTS={animation:!0,placement:"top",selector:!1,template:'<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',trigger:"hover focus",title:"",delay:0,html:!1,container:!1,viewport:{selector:"body",padding:0}},c.prototype.init=function(b,c,d){if(this.enabled=!0,this.type=b,this.$element=a(c),this.options=this.getOptions(d),this.$viewport=this.options.viewport&&a(a.isFunction(this.options.viewport)?this.options.viewport.call(this,this.$element):this.options.viewport.selector||this.options.viewport),this.inState={click:!1,hover:!1,focus:!1},this.$element[0]instanceof document.constructor&&!this.options.selector)throw new Error("`selector` option must be specified when initializing "+this.type+" on the window.document object!");for(var e=this.options.trigger.split(" "),f=e.length;f--;){var g=e[f];if("click"==g)this.$element.on("click."+this.type,this.options.selector,a.proxy(this.toggle,this));else if("manual"!=g){var h="hover"==g?"mouseenter":"focusin",i="hover"==g?"mouseleave":"focusout";this.$element.on(h+"."+this.type,this.options.selector,a.proxy(this.enter,this)),this.$element.on(i+"."+this.type,this.options.selector,a.proxy(this.leave,this))}}this.options.selector?this._options=a.extend({},this.options,{trigger:"manual",selector:""}):this.fixTitle()},c.prototype.getDefaults=function(){return c.DEFAULTS},c.prototype.getOptions=function(b){return b=a.extend({},this.getDefaults(),this.$element.data(),b),b.delay&&"number"==typeof b.delay&&(b.delay={show:b.delay,hide:b.delay}),b},c.prototype.getDelegateOptions=function(){var b={},c=this.getDefaults();return this._options&&a.each(this._options,function(a,d){c[a]!=d&&(b[a]=d)}),b},c.prototype.enter=function(b){var c=b instanceof this.constructor?b:a(b.currentTarget).data("bs."+this.type);return c||(c=new this.constructor(b.currentTarget,this.getDelegateOptions()),a(b.currentTarget).data("bs."+this.type,c)),b instanceof a.Event&&(c.inState["focusin"==b.type?"focus":"hover"]=!0),c.tip().hasClass("in")||"in"==c.hoverState?void(c.hoverState="in"):(clearTimeout(c.timeout),c.hoverState="in",c.options.delay&&c.options.delay.show?void(c.timeout=setTimeout(function(){"in"==c.hoverState&&c.show()},c.options.delay.show)):c.show())},c.prototype.isInStateTrue=function(){for(var a in this.inState)if(this.inState[a])return!0;return!1},c.prototype.leave=function(b){var c=b instanceof this.constructor?b:a(b.currentTarget).data("bs."+this.type);return c||(c=new this.constructor(b.currentTarget,this.getDelegateOptions()),a(b.currentTarget).data("bs."+this.type,c)),b instanceof a.Event&&(c.inState["focusout"==b.type?"focus":"hover"]=!1),c.isInStateTrue()?void 0:(clearTimeout(c.timeout),c.hoverState="out",c.options.delay&&c.options.delay.hide?void(c.timeout=setTimeout(function(){"out"==c.hoverState&&c.hide()},c.options.delay.hide)):c.hide())},c.prototype.show=function(){var b=a.Event("show.bs."+this.type);if(this.hasContent()&&this.enabled){this.$element.trigger(b);var d=a.contains(this.$element[0].ownerDocument.documentElement,this.$element[0]);if(b.isDefaultPrevented()||!d)return;var e=this,f=this.tip(),g=this.getUID(this.type);this.setContent(),f.attr("id",g),this.$element.attr("aria-describedby",g),this.options.animation&&f.addClass("fade");var h="function"==typeof this.options.placement?this.options.placement.call(this,f[0],this.$element[0]):this.options.placement,i=/\s?auto?\s?/i,j=i.test(h);j&&(h=h.replace(i,"")||"top"),f.detach().css({top:0,left:0,display:"block"}).addClass(h).data("bs."+this.type,this),this.options.container?f.appendTo(this.options.container):f.insertAfter(this.$element),this.$element.trigger("inserted.bs."+this.type);var k=this.getPosition(),l=f[0].offsetWidth,m=f[0].offsetHeight;if(j){var n=h,o=this.getPosition(this.$viewport);h="bottom"==h&&k.bottom+m>o.bottom?"top":"top"==h&&k.top-m<o.top?"bottom":"right"==h&&k.right+l>o.width?"left":"left"==h&&k.left-l<o.left?"right":h,f.removeClass(n).addClass(h)}var p=this.getCalculatedOffset(h,k,l,m);this.applyPlacement(p,h);var q=function(){var a=e.hoverState;e.$element.trigger("shown.bs."+e.type),e.hoverState=null,"out"==a&&e.leave(e)};a.support.transition&&this.$tip.hasClass("fade")?f.one("bsTransitionEnd",q).emulateTransitionEnd(c.TRANSITION_DURATION):q()}},c.prototype.applyPlacement=function(b,c){var d=this.tip(),e=d[0].offsetWidth,f=d[0].offsetHeight,g=parseInt(d.css("margin-top"),10),h=parseInt(d.css("margin-left"),10);isNaN(g)&&(g=0),isNaN(h)&&(h=0),b.top+=g,b.left+=h,a.offset.setOffset(d[0],a.extend({using:function(a){d.css({top:Math.round(a.top),left:Math.round(a.left)})}},b),0),d.addClass("in");var i=d[0].offsetWidth,j=d[0].offsetHeight;"top"==c&&j!=f&&(b.top=b.top+f-j);var k=this.getViewportAdjustedDelta(c,b,i,j);k.left?b.left+=k.left:b.top+=k.top;var l=/top|bottom/.test(c),m=l?2*k.left-e+i:2*k.top-f+j,n=l?"offsetWidth":"offsetHeight";d.offset(b),this.replaceArrow(m,d[0][n],l)},c.prototype.replaceArrow=function(a,b,c){this.arrow().css(c?"left":"top",50*(1-a/b)+"%").css(c?"top":"left","")},c.prototype.setContent=function(){var a=this.tip(),b=this.getTitle();a.find(".tooltip-inner")[this.options.html?"html":"text"](b),a.removeClass("fade in top bottom left right")},c.prototype.hide=function(b){function d(){"in"!=e.hoverState&&f.detach(),e.$element.removeAttr("aria-describedby").trigger("hidden.bs."+e.type),b&&b()}var e=this,f=a(this.$tip),g=a.Event("hide.bs."+this.type);return this.$element.trigger(g),g.isDefaultPrevented()?void 0:(f.removeClass("in"),a.support.transition&&f.hasClass("fade")?f.one("bsTransitionEnd",d).emulateTransitionEnd(c.TRANSITION_DURATION):d(),this.hoverState=null,this)},c.prototype.fixTitle=function(){var a=this.$element;(a.attr("title")||"string"!=typeof a.attr("data-original-title"))&&a.attr("data-original-title",a.attr("title")||"").attr("title","")},c.prototype.hasContent=function(){return this.getTitle()},c.prototype.getPosition=function(b){b=b||this.$element;var c=b[0],d="BODY"==c.tagName,e=c.getBoundingClientRect();null==e.width&&(e=a.extend({},e,{width:e.right-e.left,height:e.bottom-e.top}));var f=d?{top:0,left:0}:b.offset(),g={scroll:d?document.documentElement.scrollTop||document.body.scrollTop:b.scrollTop()},h=d?{width:a(window).width(),height:a(window).height()}:null;return a.extend({},e,g,h,f)},c.prototype.getCalculatedOffset=function(a,b,c,d){return"bottom"==a?{top:b.top+b.height,left:b.left+b.width/2-c/2}:"top"==a?{top:b.top-d,left:b.left+b.width/2-c/2}:"left"==a?{top:b.top+b.height/2-d/2,left:b.left-c}:{top:b.top+b.height/2-d/2,left:b.left+b.width}},c.prototype.getViewportAdjustedDelta=function(a,b,c,d){var e={top:0,left:0};if(!this.$viewport)return e;var f=this.options.viewport&&this.options.viewport.padding||0,g=this.getPosition(this.$viewport);if(/right|left/.test(a)){var h=b.top-f-g.scroll,i=b.top+f-g.scroll+d;h<g.top?e.top=g.top-h:i>g.top+g.height&&(e.top=g.top+g.height-i)}else{var j=b.left-f,k=b.left+f+c;j<g.left?e.left=g.left-j:k>g.right&&(e.left=g.left+g.width-k)}return e},c.prototype.getTitle=function(){var a,b=this.$element,c=this.options;return a=b.attr("data-original-title")||("function"==typeof c.title?c.title.call(b[0]):c.title)},c.prototype.getUID=function(a){do a+=~~(1e6*Math.random());while(document.getElementById(a));return a},c.prototype.tip=function(){if(!this.$tip&&(this.$tip=a(this.options.template),1!=this.$tip.length))throw new Error(this.type+" `template` option must consist of exactly 1 top-level element!");return this.$tip},c.prototype.arrow=function(){return this.$arrow=this.$arrow||this.tip().find(".tooltip-arrow")},c.prototype.enable=function(){this.enabled=!0},c.prototype.disable=function(){this.enabled=!1},c.prototype.toggleEnabled=function(){this.enabled=!this.enabled},c.prototype.toggle=function(b){var c=this;b&&(c=a(b.currentTarget).data("bs."+this.type),c||(c=new this.constructor(b.currentTarget,this.getDelegateOptions()),a(b.currentTarget).data("bs."+this.type,c))),b?(c.inState.click=!c.inState.click,c.isInStateTrue()?c.enter(c):c.leave(c)):c.tip().hasClass("in")?c.leave(c):c.enter(c)},c.prototype.destroy=function(){var a=this;clearTimeout(this.timeout),this.hide(function(){a.$element.off("."+a.type).removeData("bs."+a.type),a.$tip&&a.$tip.detach(),a.$tip=null,a.$arrow=null,a.$viewport=null})};var d=a.fn.tooltip;a.fn.tooltip=b,a.fn.tooltip.Constructor=c,a.fn.tooltip.noConflict=function(){return a.fn.tooltip=d,this}}(jQuery),+function(a){"use strict";function b(b){return this.each(function(){var d=a(this),e=d.data("bs.popover"),f="object"==typeof b&&b;(e||!/destroy|hide/.test(b))&&(e||d.data("bs.popover",e=new c(this,f)),"string"==typeof b&&e[b]())})}var c=function(a,b){this.init("popover",a,b)};if(!a.fn.tooltip)throw new Error("Popover requires tooltip.js");c.VERSION="3.3.5",c.DEFAULTS=a.extend({},a.fn.tooltip.Constructor.DEFAULTS,{placement:"right",trigger:"click",content:"",template:'<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'}),c.prototype=a.extend({},a.fn.tooltip.Constructor.prototype),c.prototype.constructor=c,c.prototype.getDefaults=function(){return c.DEFAULTS},c.prototype.setContent=function(){var a=this.tip(),b=this.getTitle(),c=this.getContent();a.find(".popover-title")[this.options.html?"html":"text"](b),a.find(".popover-content").children().detach().end()[this.options.html?"string"==typeof c?"html":"append":"text"](c),a.removeClass("fade top bottom left right in"),a.find(".popover-title").html()||a.find(".popover-title").hide()},c.prototype.hasContent=function(){return this.getTitle()||this.getContent()},c.prototype.getContent=function(){var a=this.$element,b=this.options;return a.attr("data-content")||("function"==typeof b.content?b.content.call(a[0]):b.content)},c.prototype.arrow=function(){return this.$arrow=this.$arrow||this.tip().find(".arrow")};var d=a.fn.popover;a.fn.popover=b,a.fn.popover.Constructor=c,a.fn.popover.noConflict=function(){return a.fn.popover=d,this}}(jQuery),+function(a){"use strict";function b(c,d){this.$body=a(document.body),this.$scrollElement=a(a(c).is(document.body)?window:c),this.options=a.extend({},b.DEFAULTS,d),this.selector=(this.options.target||"")+" .nav li > a",this.offsets=[],this.targets=[],this.activeTarget=null,this.scrollHeight=0,this.$scrollElement.on("scroll.bs.scrollspy",a.proxy(this.process,this)),this.refresh(),this.process()}function c(c){return this.each(function(){var d=a(this),e=d.data("bs.scrollspy"),f="object"==typeof c&&c;e||d.data("bs.scrollspy",e=new b(this,f)),"string"==typeof c&&e[c]()})}b.VERSION="3.3.5",b.DEFAULTS={offset:10},b.prototype.getScrollHeight=function(){return this.$scrollElement[0].scrollHeight||Math.max(this.$body[0].scrollHeight,document.documentElement.scrollHeight)},b.prototype.refresh=function(){var b=this,c="offset",d=0;this.offsets=[],this.targets=[],this.scrollHeight=this.getScrollHeight(),a.isWindow(this.$scrollElement[0])||(c="position",d=this.$scrollElement.scrollTop()),this.$body.find(this.selector).map(function(){var b=a(this),e=b.data("target")||b.attr("href"),f=/^#./.test(e)&&a(e);return f&&f.length&&f.is(":visible")&&[[f[c]().top+d,e]]||null}).sort(function(a,b){return a[0]-b[0]}).each(function(){b.offsets.push(this[0]),b.targets.push(this[1])})},b.prototype.process=function(){var a,b=this.$scrollElement.scrollTop()+this.options.offset,c=this.getScrollHeight(),d=this.options.offset+c-this.$scrollElement.height(),e=this.offsets,f=this.targets,g=this.activeTarget;if(this.scrollHeight!=c&&this.refresh(),b>=d)return g!=(a=f[f.length-1])&&this.activate(a);if(g&&b<e[0])return this.activeTarget=null,this.clear();for(a=e.length;a--;)g!=f[a]&&b>=e[a]&&(void 0===e[a+1]||b<e[a+1])&&this.activate(f[a])},b.prototype.activate=function(b){this.activeTarget=b,this.clear();var c=this.selector+'[data-target="'+b+'"],'+this.selector+'[href="'+b+'"]',d=a(c).parents("li").addClass("active");d.parent(".dropdown-menu").length&&(d=d.closest("li.dropdown").addClass("active")),
d.trigger("activate.bs.scrollspy")},b.prototype.clear=function(){a(this.selector).parentsUntil(this.options.target,".active").removeClass("active")};var d=a.fn.scrollspy;a.fn.scrollspy=c,a.fn.scrollspy.Constructor=b,a.fn.scrollspy.noConflict=function(){return a.fn.scrollspy=d,this},a(window).on("load.bs.scrollspy.data-api",function(){a('[data-spy="scroll"]').each(function(){var b=a(this);c.call(b,b.data())})})}(jQuery),+function(a){"use strict";function b(b){return this.each(function(){var d=a(this),e=d.data("bs.tab");e||d.data("bs.tab",e=new c(this)),"string"==typeof b&&e[b]()})}var c=function(b){this.element=a(b)};c.VERSION="3.3.5",c.TRANSITION_DURATION=150,c.prototype.show=function(){var b=this.element,c=b.closest("ul:not(.dropdown-menu)"),d=b.data("target");if(d||(d=b.attr("href"),d=d&&d.replace(/.*(?=#[^\s]*$)/,"")),!b.parent("li").hasClass("active")){var e=c.find(".active:last a"),f=a.Event("hide.bs.tab",{relatedTarget:b[0]}),g=a.Event("show.bs.tab",{relatedTarget:e[0]});if(e.trigger(f),b.trigger(g),!g.isDefaultPrevented()&&!f.isDefaultPrevented()){var h=a(d);this.activate(b.closest("li"),c),this.activate(h,h.parent(),function(){e.trigger({type:"hidden.bs.tab",relatedTarget:b[0]}),b.trigger({type:"shown.bs.tab",relatedTarget:e[0]})})}}},c.prototype.activate=function(b,d,e){function f(){g.removeClass("active").find("> .dropdown-menu > .active").removeClass("active").end().find('[data-toggle="tab"]').attr("aria-expanded",!1),b.addClass("active").find('[data-toggle="tab"]').attr("aria-expanded",!0),h?(b[0].offsetWidth,b.addClass("in")):b.removeClass("fade"),b.parent(".dropdown-menu").length&&b.closest("li.dropdown").addClass("active").end().find('[data-toggle="tab"]').attr("aria-expanded",!0),e&&e()}var g=d.find("> .active"),h=e&&a.support.transition&&(g.length&&g.hasClass("fade")||!!d.find("> .fade").length);g.length&&h?g.one("bsTransitionEnd",f).emulateTransitionEnd(c.TRANSITION_DURATION):f(),g.removeClass("in")};var d=a.fn.tab;a.fn.tab=b,a.fn.tab.Constructor=c,a.fn.tab.noConflict=function(){return a.fn.tab=d,this};var e=function(c){c.preventDefault(),b.call(a(this),"show")};a(document).on("click.bs.tab.data-api",'[data-toggle="tab"]',e).on("click.bs.tab.data-api",'[data-toggle="pill"]',e)}(jQuery),+function(a){"use strict";function b(b){return this.each(function(){var d=a(this),e=d.data("bs.affix"),f="object"==typeof b&&b;e||d.data("bs.affix",e=new c(this,f)),"string"==typeof b&&e[b]()})}var c=function(b,d){this.options=a.extend({},c.DEFAULTS,d),this.$target=a(this.options.target).on("scroll.bs.affix.data-api",a.proxy(this.checkPosition,this)).on("click.bs.affix.data-api",a.proxy(this.checkPositionWithEventLoop,this)),this.$element=a(b),this.affixed=null,this.unpin=null,this.pinnedOffset=null,this.checkPosition()};c.VERSION="3.3.5",c.RESET="affix affix-top affix-bottom",c.DEFAULTS={offset:0,target:window},c.prototype.getState=function(a,b,c,d){var e=this.$target.scrollTop(),f=this.$element.offset(),g=this.$target.height();if(null!=c&&"top"==this.affixed)return c>e?"top":!1;if("bottom"==this.affixed)return null!=c?e+this.unpin<=f.top?!1:"bottom":a-d>=e+g?!1:"bottom";var h=null==this.affixed,i=h?e:f.top,j=h?g:b;return null!=c&&c>=e?"top":null!=d&&i+j>=a-d?"bottom":!1},c.prototype.getPinnedOffset=function(){if(this.pinnedOffset)return this.pinnedOffset;this.$element.removeClass(c.RESET).addClass("affix");var a=this.$target.scrollTop(),b=this.$element.offset();return this.pinnedOffset=b.top-a},c.prototype.checkPositionWithEventLoop=function(){setTimeout(a.proxy(this.checkPosition,this),1)},c.prototype.checkPosition=function(){if(this.$element.is(":visible")){var b=this.$element.height(),d=this.options.offset,e=d.top,f=d.bottom,g=Math.max(a(document).height(),a(document.body).height());"object"!=typeof d&&(f=e=d),"function"==typeof e&&(e=d.top(this.$element)),"function"==typeof f&&(f=d.bottom(this.$element));var h=this.getState(g,b,e,f);if(this.affixed!=h){null!=this.unpin&&this.$element.css("top","");var i="affix"+(h?"-"+h:""),j=a.Event(i+".bs.affix");if(this.$element.trigger(j),j.isDefaultPrevented())return;this.affixed=h,this.unpin="bottom"==h?this.getPinnedOffset():null,this.$element.removeClass(c.RESET).addClass(i).trigger(i.replace("affix","affixed")+".bs.affix")}"bottom"==h&&this.$element.offset({top:g-b-f})}};var d=a.fn.affix;a.fn.affix=b,a.fn.affix.Constructor=c,a.fn.affix.noConflict=function(){return a.fn.affix=d,this},a(window).on("load",function(){a('[data-spy="affix"]').each(function(){var c=a(this),d=c.data();d.offset=d.offset||{},null!=d.offsetBottom&&(d.offset.bottom=d.offsetBottom),null!=d.offsetTop&&(d.offset.top=d.offsetTop),b.call(c,d)})})}(jQuery);
!function(e){e(["jquery"],function(e){return function(){function t(e,t,n){return g({type:O.error,iconClass:m().iconClasses.error,message:e,optionsOverride:n,title:t})}function n(t,n){return t||(t=m()),v=e("#"+t.containerId),v.length?v:(n&&(v=d(t)),v)}function o(e,t,n){return g({type:O.info,iconClass:m().iconClasses.info,message:e,optionsOverride:n,title:t})}function s(e){C=e}function i(e,t,n){return g({type:O.success,iconClass:m().iconClasses.success,message:e,optionsOverride:n,title:t})}function a(e,t,n){return g({type:O.warning,iconClass:m().iconClasses.warning,message:e,optionsOverride:n,title:t})}function r(e,t){var o=m();v||n(o),u(e,o,t)||l(o)}function c(t){var o=m();return v||n(o),t&&0===e(":focus",t).length?void h(t):void(v.children().length&&v.remove())}function l(t){for(var n=v.children(),o=n.length-1;o>=0;o--)u(e(n[o]),t)}function u(t,n,o){var s=!(!o||!o.force)&&o.force;return!(!t||!s&&0!==e(":focus",t).length)&&(t[n.hideMethod]({duration:n.hideDuration,easing:n.hideEasing,complete:function(){h(t)}}),!0)}function d(t){return v=e("<div/>").attr("id",t.containerId).addClass(t.positionClass),v.appendTo(e(t.target)),v}function p(){return{tapToDismiss:!0,toastClass:"toast",containerId:"toast-container",debug:!1,showMethod:"fadeIn",showDuration:300,showEasing:"swing",onShown:void 0,hideMethod:"fadeOut",hideDuration:1e3,hideEasing:"swing",onHidden:void 0,closeMethod:!1,closeDuration:!1,closeEasing:!1,closeOnHover:!0,extendedTimeOut:1e3,iconClasses:{error:"toast-error",info:"toast-info",success:"toast-success",warning:"toast-warning"},iconClass:"toast-info",positionClass:"toast-top-right",timeOut:5e3,titleClass:"toast-title",messageClass:"toast-message",escapeHtml:!1,target:"body",closeHtml:'<button type="button">&times;</button>',closeClass:"toast-close-button",newestOnTop:!0,preventDuplicates:!1,progressBar:!1,progressClass:"toast-progress",rtl:!1}}function f(e){C&&C(e)}function g(t){function o(e){return null==e&&(e=""),e.replace(/&/g,"&amp;").replace(/"/g,"&quot;").replace(/'/g,"&#39;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}function s(){c(),u(),d(),p(),g(),C(),l(),i()}function i(){var e="";switch(t.iconClass){case"toast-success":case"toast-info":e="polite";break;default:e="assertive"}I.attr("aria-live",e)}function a(){E.closeOnHover&&I.hover(H,D),!E.onclick&&E.tapToDismiss&&I.click(b),E.closeButton&&j&&j.click(function(e){e.stopPropagation?e.stopPropagation():void 0!==e.cancelBubble&&e.cancelBubble!==!0&&(e.cancelBubble=!0),E.onCloseClick&&E.onCloseClick(e),b(!0)}),E.onclick&&I.click(function(e){E.onclick(e),b()})}function r(){I.hide(),I[E.showMethod]({duration:E.showDuration,easing:E.showEasing,complete:E.onShown}),E.timeOut>0&&(k=setTimeout(b,E.timeOut),F.maxHideTime=parseFloat(E.timeOut),F.hideEta=(new Date).getTime()+F.maxHideTime,E.progressBar&&(F.intervalId=setInterval(x,10)))}function c(){t.iconClass&&I.addClass(E.toastClass).addClass(y)}function l(){E.newestOnTop?v.prepend(I):v.append(I)}function u(){if(t.title){var e=t.title;E.escapeHtml&&(e=o(t.title)),M.append(e).addClass(E.titleClass),I.append(M)}}function d(){if(t.message){var e=t.message;E.escapeHtml&&(e=o(t.message)),B.append(e).addClass(E.messageClass),I.append(B)}}function p(){E.closeButton&&(j.addClass(E.closeClass).attr("role","button"),I.prepend(j))}function g(){E.progressBar&&(q.addClass(E.progressClass),I.prepend(q))}function C(){E.rtl&&I.addClass("rtl")}function O(e,t){if(e.preventDuplicates){if(t.message===w)return!0;w=t.message}return!1}function b(t){var n=t&&E.closeMethod!==!1?E.closeMethod:E.hideMethod,o=t&&E.closeDuration!==!1?E.closeDuration:E.hideDuration,s=t&&E.closeEasing!==!1?E.closeEasing:E.hideEasing;if(!e(":focus",I).length||t)return clearTimeout(F.intervalId),I[n]({duration:o,easing:s,complete:function(){h(I),clearTimeout(k),E.onHidden&&"hidden"!==P.state&&E.onHidden(),P.state="hidden",P.endTime=new Date,f(P)}})}function D(){(E.timeOut>0||E.extendedTimeOut>0)&&(k=setTimeout(b,E.extendedTimeOut),F.maxHideTime=parseFloat(E.extendedTimeOut),F.hideEta=(new Date).getTime()+F.maxHideTime)}function H(){clearTimeout(k),F.hideEta=0,I.stop(!0,!0)[E.showMethod]({duration:E.showDuration,easing:E.showEasing})}function x(){var e=(F.hideEta-(new Date).getTime())/F.maxHideTime*100;q.width(e+"%")}var E=m(),y=t.iconClass||E.iconClass;if("undefined"!=typeof t.optionsOverride&&(E=e.extend(E,t.optionsOverride),y=t.optionsOverride.iconClass||y),!O(E,t)){T++,v=n(E,!0);var k=null,I=e("<div/>"),M=e("<div/>"),B=e("<div/>"),q=e("<div/>"),j=e(E.closeHtml),F={intervalId:null,hideEta:null,maxHideTime:null},P={toastId:T,state:"visible",startTime:new Date,options:E,map:t};return s(),r(),a(),f(P),E.debug&&console&&console.log(P),I}}function m(){return e.extend({},p(),b.options)}function h(e){v||(v=n()),e.is(":visible")||(e.remove(),e=null,0===v.children().length&&(v.remove(),w=void 0))}var v,C,w,T=0,O={error:"error",info:"info",success:"success",warning:"warning"},b={clear:r,remove:c,error:t,getContainer:n,info:o,options:{},subscribe:s,success:i,version:"2.1.3",warning:a};return b}()})}("function"==typeof define&&define.amd?define:function(e,t){"undefined"!=typeof module&&module.exports?module.exports=t(require("jquery")):window.toastr=t(window.jQuery)});
//# sourceMappingURL=toastr.js.map

/**
 * @file Polyfills for users who refuse to upgrade their browsers
 *   Most code is adapted from [MDN](https://developer.mozilla.org)
 */

// Array.includes function polyfill
// This is not a full implementation, just a shorthand to indexOf !== -1
if ( !Array.prototype.includes ) {
  Array.prototype.includes = function(search) {
    return this.indexOf(search) !== -1;
  };
}

// String.includes function polyfill
if ( !String.prototype.includes ) {
  String.prototype.includes = function(search, start) {
    if (typeof start !== 'number') {
      start = 0;
    }

    if (start + search.length > this.length) {
      return false;
    } else {
      return this.indexOf(search,start) !== -1;
    }
  };
}

// Object.assign
if (typeof Object.assign !== 'function') {
  (function() {
    Object.assign = function(target) {
      if (target === undefined || target === null) {
        throw new TypeError('Cannot convert undefined or null to object');
      }

      let output = Object(target);
      for (let index = 1; index < arguments.length; index++) {
        let source = arguments[index];
        if (source !== undefined && source !== null) {
          for (let nextKey in source) {
            if (source.hasOwnProperty(nextKey)) {
              output[nextKey] = source[nextKey];
            }
          }
        }
      }
      return output;
    };
  })();
}

// ChildNode.remove
if (!('remove' in Element.prototype)) {
  Element.prototype.remove = function() {
    this.parentNode.removeChild(this);
  };
}

// String.startsWith
if (!String.prototype.startsWith) {
  String.prototype.startsWith = function(searchString, position) {
    position = position || 0;
    return this.substr(position, searchString.length) === searchString;
  };
}

// Array.of
if (!Array.of) {
  Array.of = function() {
    return Array.prototype.slice.call(arguments);
  };
}

// Array.find
if (!Array.prototype.find) {
  Array.prototype.find = function(predicate) {
    if (this === null) {
      throw new TypeError('Array.prototype.find called on null or undefined');
    }
    if (typeof predicate !== 'function') {
      throw new TypeError('predicate must be a function');
    }
    let list = Object(this);
    let length = list.length >>> 0;
    let thisArg = arguments[1];
    let value;

    for (let i = 0; i < length; i++) {
      value = list[i];
      if (predicate.call(thisArg, value, i, list)) {
        return value;
      }
    }
    return undefined;
  };
}

// Array.fill
if (!Array.prototype.fill) {
  Array.prototype.fill = function(value) {

    // Steps 1-2.
    if (this === null) {
      throw new TypeError('this is null or not defined');
    }

    let O = Object(this);

    // Steps 3-5.
    let len = O.length >>> 0;

    // Steps 6-7.
    let start = arguments[1];
    let relativeStart = start >> 0;

    // Step 8.
    let k = relativeStart < 0 ?
      Math.max(len + relativeStart, 0) :
      Math.min(relativeStart, len);

    // Steps 9-10.
    let end = arguments[2];
    let relativeEnd = end === undefined ?
      len : end >> 0;

    // Step 11.
    let final = relativeEnd < 0 ?
      Math.max(len + relativeEnd, 0) :
      Math.min(relativeEnd, len);

    // Step 12.
    while (k < final) {
      O[k] = value;
      k++;
    }

    // Step 13.
    return O;
  };
}

/**
 * @file Core JavaScript extensions, either to native JS or a library.
 *   Polyfills have their own file [polyfills.js](global.html#polyfills)
 * @author MusikAnimal
 * @copyright 2016 MusikAnimal
 * @license MIT License: https://opensource.org/licenses/MIT
 */

String.prototype.descore = function() {
  return this.replace(/_/g, ' ');
};
String.prototype.score = function() {
  return this.replace(/ /g, '_');
};
String.prototype.upcase = function() {
  return this.charAt(0).toUpperCase() + this.slice(1);
};
String.prototype.escape = function() {
  const entityMap = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
    '/': '&#x2F;'
  };

  return this.replace(/[&<>"'\/]/g, s => {
    return entityMap[s];
  });
};

// remove duplicate values from Array
Array.prototype.unique = function() {
  return this.filter(function(value, index, array) {
    return array.indexOf(value) === index;
  });
};

// Improve syntax to emulate mixins in ES6
window.mix = superclass => new MixinBuilder(superclass);
class MixinBuilder {
  constructor(superclass) {
    this.superclass = superclass;
  }

  with(...mixins) {
    return mixins.reduce((c, mixin) => mixin(c), this.superclass);
  }
}

/*
 * HOT PATCH for Chart.js getElementsAtEvent
 * https://github.com/chartjs/Chart.js/issues/2299
 * TODO: remove me when this gets implemented into Charts.js core
 */
if (typeof Chart !== 'undefined') {
  Chart.Controller.prototype.getElementsAtEvent = function(e) {
    let helpers = Chart.helpers;
    let eventPosition = helpers.getRelativePosition(e, this.chart);
    let elementsArray = [];

    let found = (function() {
      if (this.data.datasets) {
        for (let i = 0; i < this.data.datasets.length; i++) {
          const key = Object.keys(this.data.datasets[i]._meta)[0];
          for (let j = 0; j < this.data.datasets[i]._meta[key].data.length; j++) {
            /* eslint-disable max-depth */
            if (this.data.datasets[i]._meta[key].data[j].inLabelRange(eventPosition.x, eventPosition.y)) {
              return this.data.datasets[i]._meta[key].data[j];
            }
          }
        }
      }
    }).call(this);

    if (!found) {
      return elementsArray;
    }

    helpers.each(this.data.datasets, function(dataset, dsIndex) {
      const key = Object.keys(dataset._meta)[0];
      elementsArray.push(dataset._meta[key].data[found._index]);
    });

    return elementsArray;
  };
}

$.whenAll = function() {
  let dfd = $.Deferred(),
    counter = 0,
    state = 'resolved',
    promises = new Array(...arguments);

  const resolveOrReject = function() {
    if (this.state === 'rejected') {
      state = 'rejected';
    }
    counter++;

    if (counter === promises.length) {
      dfd[state === 'rejected' ? 'reject' : 'resolve']();
    }

  };

  $.each(promises, (_i, promise) => {
    promise.always(resolveOrReject);
  });

  return dfd.promise();
};

/* Note that this file is hacked to add i18n support via jquery.i18n.js. Please retain the hack when upgrading. */
/*! Select2 4.0.0 | https://github.com/select2/select2/blob/master/LICENSE.md */!function(a){"function"==typeof define&&define.amd?define(["jquery"],a):a("object"==typeof exports?require("jquery"):jQuery)}(function(a){var b=function(){if(a&&a.fn&&a.fn.select2&&a.fn.select2.amd)var b=a.fn.select2.amd;var b;return function(){if(!b||!b.requirejs){b?c=b:b={};var a,c,d;!function(b){function e(a,b){return u.call(a,b)}function f(a,b){var c,d,e,f,g,h,i,j,k,l,m,n=b&&b.split("/"),o=s.map,p=o&&o["*"]||{};if(a&&"."===a.charAt(0))if(b){for(n=n.slice(0,n.length-1),a=a.split("/"),g=a.length-1,s.nodeIdCompat&&w.test(a[g])&&(a[g]=a[g].replace(w,"")),a=n.concat(a),k=0;k<a.length;k+=1)if(m=a[k],"."===m)a.splice(k,1),k-=1;else if(".."===m){if(1===k&&(".."===a[2]||".."===a[0]))break;k>0&&(a.splice(k-1,2),k-=2)}a=a.join("/")}else 0===a.indexOf("./")&&(a=a.substring(2));if((n||p)&&o){for(c=a.split("/"),k=c.length;k>0;k-=1){if(d=c.slice(0,k).join("/"),n)for(l=n.length;l>0;l-=1)if(e=o[n.slice(0,l).join("/")],e&&(e=e[d])){f=e,h=k;break}if(f)break;!i&&p&&p[d]&&(i=p[d],j=k)}!f&&i&&(f=i,h=j),f&&(c.splice(0,h,f),a=c.join("/"))}return a}function g(a,c){return function(){return n.apply(b,v.call(arguments,0).concat([a,c]))}}function h(a){return function(b){return f(b,a)}}function i(a){return function(b){q[a]=b}}function j(a){if(e(r,a)){var c=r[a];delete r[a],t[a]=!0,m.apply(b,c)}if(!e(q,a)&&!e(t,a))throw new Error("No "+a);return q[a]}function k(a){var b,c=a?a.indexOf("!"):-1;return c>-1&&(b=a.substring(0,c),a=a.substring(c+1,a.length)),[b,a]}function l(a){return function(){return s&&s.config&&s.config[a]||{}}}var m,n,o,p,q={},r={},s={},t={},u=Object.prototype.hasOwnProperty,v=[].slice,w=/\.js$/;o=function(a,b){var c,d=k(a),e=d[0];return a=d[1],e&&(e=f(e,b),c=j(e)),e?a=c&&c.normalize?c.normalize(a,h(b)):f(a,b):(a=f(a,b),d=k(a),e=d[0],a=d[1],e&&(c=j(e))),{f:e?e+"!"+a:a,n:a,pr:e,p:c}},p={require:function(a){return g(a)},exports:function(a){var b=q[a];return"undefined"!=typeof b?b:q[a]={}},module:function(a){return{id:a,uri:"",exports:q[a],config:l(a)}}},m=function(a,c,d,f){var h,k,l,m,n,s,u=[],v=typeof d;if(f=f||a,"undefined"===v||"function"===v){for(c=!c.length&&d.length?["require","exports","module"]:c,n=0;n<c.length;n+=1)if(m=o(c[n],f),k=m.f,"require"===k)u[n]=p.require(a);else if("exports"===k)u[n]=p.exports(a),s=!0;else if("module"===k)h=u[n]=p.module(a);else if(e(q,k)||e(r,k)||e(t,k))u[n]=j(k);else{if(!m.p)throw new Error(a+" missing "+k);m.p.load(m.n,g(f,!0),i(k),{}),u[n]=q[k]}l=d?d.apply(q[a],u):void 0,a&&(h&&h.exports!==b&&h.exports!==q[a]?q[a]=h.exports:l===b&&s||(q[a]=l))}else a&&(q[a]=d)},a=c=n=function(a,c,d,e,f){if("string"==typeof a)return p[a]?p[a](c):j(o(a,c).f);if(!a.splice){if(s=a,s.deps&&n(s.deps,s.callback),!c)return;c.splice?(a=c,c=d,d=null):a=b}return c=c||function(){},"function"==typeof d&&(d=e,e=f),e?m(b,a,c,d):setTimeout(function(){m(b,a,c,d)},4),n},n.config=function(a){return n(a)},a._defined=q,d=function(a,b,c){b.splice||(c=b,b=[]),e(q,a)||e(r,a)||(r[a]=[a,b,c])},d.amd={jQuery:!0}}(),b.requirejs=a,b.require=c,b.define=d}}(),b.define("almond",function(){}),b.define("jquery",[],function(){var b=a||$;return null==b&&console&&console.error&&console.error("Select2: An instance of jQuery or a jQuery-compatible library was not found. Make sure that you are including jQuery before Select2 on your web page."),b}),b.define("select2/utils",["jquery"],function(a){function b(a){var b=a.prototype,c=[];for(var d in b){var e=b[d];"function"==typeof e&&"constructor"!==d&&c.push(d)}return c}var c={};c.Extend=function(a,b){function c(){this.constructor=a}var d={}.hasOwnProperty;for(var e in b)d.call(b,e)&&(a[e]=b[e]);return c.prototype=b.prototype,a.prototype=new c,a.__super__=b.prototype,a},c.Decorate=function(a,c){function d(){var b=Array.prototype.unshift,d=c.prototype.constructor.length,e=a.prototype.constructor;d>0&&(b.call(arguments,a.prototype.constructor),e=c.prototype.constructor),e.apply(this,arguments)}function e(){this.constructor=d}var f=b(c),g=b(a);c.displayName=a.displayName,d.prototype=new e;for(var h=0;h<g.length;h++){var i=g[h];d.prototype[i]=a.prototype[i]}for(var j=(function(a){var b=function(){};a in d.prototype&&(b=d.prototype[a]);var e=c.prototype[a];return function(){var a=Array.prototype.unshift;return a.call(arguments,b),e.apply(this,arguments)}}),k=0;k<f.length;k++){var l=f[k];d.prototype[l]=j(l)}return d};var d=function(){this.listeners={}};return d.prototype.on=function(a,b){this.listeners=this.listeners||{},a in this.listeners?this.listeners[a].push(b):this.listeners[a]=[b]},d.prototype.trigger=function(a){var b=Array.prototype.slice;this.listeners=this.listeners||{},a in this.listeners&&this.invoke(this.listeners[a],b.call(arguments,1)),"*"in this.listeners&&this.invoke(this.listeners["*"],arguments)},d.prototype.invoke=function(a,b){for(var c=0,d=a.length;d>c;c++)a[c].apply(this,b)},c.Observable=d,c.generateChars=function(a){for(var b="",c=0;a>c;c++){var d=Math.floor(36*Math.random());b+=d.toString(36)}return b},c.bind=function(a,b){return function(){a.apply(b,arguments)}},c._convertData=function(a){for(var b in a){var c=b.split("-"),d=a;if(1!==c.length){for(var e=0;e<c.length;e++){var f=c[e];f=f.substring(0,1).toLowerCase()+f.substring(1),f in d||(d[f]={}),e==c.length-1&&(d[f]=a[b]),d=d[f]}delete a[b]}}return a},c.hasScroll=function(b,c){var d=a(c),e=c.style.overflowX,f=c.style.overflowY;return e!==f||"hidden"!==f&&"visible"!==f?"scroll"===e||"scroll"===f?!0:d.innerHeight()<c.scrollHeight||d.innerWidth()<c.scrollWidth:!1},c.escapeMarkup=function(a){var b={"\\":"&#92;","&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;","/":"&#47;"};return"string"!=typeof a?a:String(a).replace(/[&<>"'\/\\]/g,function(a){return b[a]})},c.appendMany=function(b,c){if("1.7"===a.fn.jquery.substr(0,3)){var d=a();a.map(c,function(a){d=d.add(a)}),c=d}b.append(c)},c}),b.define("select2/results",["jquery","./utils"],function(a,b){function c(a,b,d){this.$element=a,this.data=d,this.options=b,c.__super__.constructor.call(this)}return b.Extend(c,b.Observable),c.prototype.render=function(){var b=a('<ul class="select2-results__options" role="tree"></ul>');return this.options.get("multiple")&&b.attr("aria-multiselectable","true"),this.$results=b,b},c.prototype.clear=function(){this.$results.empty()},c.prototype.displayMessage=function(b){var c=this.options.get("escapeMarkup");this.clear(),this.hideLoading();var d=a('<li role="treeitem" class="select2-results__option"></li>'),e=this.options.get("translations").get(b.message);d.append(c(e(b.args))),this.$results.append(d)},c.prototype.append=function(a){this.hideLoading();var b=[];if(null==a.results||0===a.results.length)return void(0===this.$results.children().length&&this.trigger("results:message",{message:"noResults"}));a.results=this.sort(a.results);for(var c=0;c<a.results.length;c++){var d=a.results[c],e=this.option(d);b.push(e)}this.$results.append(b)},c.prototype.position=function(a,b){var c=b.find(".select2-results");c.append(a)},c.prototype.sort=function(a){var b=this.options.get("sorter");return b(a)},c.prototype.setClasses=function(){var b=this;this.data.current(function(c){var d=a.map(c,function(a){return a.id.toString()}),e=b.$results.find(".select2-results__option[aria-selected]");e.each(function(){var b=a(this),c=a.data(this,"data"),e=""+c.id;null!=c.element&&c.element.selected||null==c.element&&a.inArray(e,d)>-1?b.attr("aria-selected","true"):b.attr("aria-selected","false")});var f=e.filter("[aria-selected=true]");f.length>0?f.first().trigger("mouseenter"):e.first().trigger("mouseenter")})},c.prototype.showLoading=function(a){this.hideLoading();var b=this.options.get("translations").get("searching"),c={disabled:!0,loading:!0,text:b(a)},d=this.option(c);d.className+=" loading-results",this.$results.prepend(d)},c.prototype.hideLoading=function(){this.$results.find(".loading-results").remove()},c.prototype.option=function(b){var c=document.createElement("li");c.className="select2-results__option";var d={role:"treeitem","aria-selected":"false"};b.disabled&&(delete d["aria-selected"],d["aria-disabled"]="true"),null==b.id&&delete d["aria-selected"],null!=b._resultId&&(c.id=b._resultId),b.title&&(c.title=b.title),b.children&&(d.role="group",d["aria-label"]=b.text,delete d["aria-selected"]);for(var e in d){var f=d[e];c.setAttribute(e,f)}if(b.children){var g=a(c),h=document.createElement("strong");h.className="select2-results__group";{a(h)}this.template(b,h);for(var i=[],j=0;j<b.children.length;j++){var k=b.children[j],l=this.option(k);i.push(l)}var m=a("<ul></ul>",{"class":"select2-results__options select2-results__options--nested"});m.append(i),g.append(h),g.append(m)}else this.template(b,c);return a.data(c,"data",b),c},c.prototype.bind=function(b){var c=this,d=b.id+"-results";this.$results.attr("id",d),b.on("results:all",function(a){c.clear(),c.append(a.data),b.isOpen()&&c.setClasses()}),b.on("results:append",function(a){c.append(a.data),b.isOpen()&&c.setClasses()}),b.on("query",function(a){c.showLoading(a)}),b.on("select",function(){b.isOpen()&&c.setClasses()}),b.on("unselect",function(){b.isOpen()&&c.setClasses()}),b.on("open",function(){c.$results.attr("aria-expanded","true"),c.$results.attr("aria-hidden","false"),c.setClasses(),c.ensureHighlightVisible()}),b.on("close",function(){c.$results.attr("aria-expanded","false"),c.$results.attr("aria-hidden","true"),c.$results.removeAttr("aria-activedescendant")}),b.on("results:toggle",function(){var a=c.getHighlightedResults();0!==a.length&&a.trigger("mouseup")}),b.on("results:select",function(){var a=c.getHighlightedResults();if(0!==a.length){var b=a.data("data");"true"==a.attr("aria-selected")?c.trigger("close"):c.trigger("select",{data:b})}}),b.on("results:previous",function(){var a=c.getHighlightedResults(),b=c.$results.find("[aria-selected]"),d=b.index(a);if(0!==d){var e=d-1;0===a.length&&(e=0);var f=b.eq(e);f.trigger("mouseenter");var g=c.$results.offset().top,h=f.offset().top,i=c.$results.scrollTop()+(h-g);0===e?c.$results.scrollTop(0):0>h-g&&c.$results.scrollTop(i)}}),b.on("results:next",function(){var a=c.getHighlightedResults(),b=c.$results.find("[aria-selected]"),d=b.index(a),e=d+1;if(!(e>=b.length)){var f=b.eq(e);f.trigger("mouseenter");var g=c.$results.offset().top+c.$results.outerHeight(!1),h=f.offset().top+f.outerHeight(!1),i=c.$results.scrollTop()+h-g;0===e?c.$results.scrollTop(0):h>g&&c.$results.scrollTop(i)}}),b.on("results:focus",function(a){a.element.addClass("select2-results__option--highlighted")}),b.on("results:message",function(a){c.displayMessage(a)}),a.fn.mousewheel&&this.$results.on("mousewheel",function(a){var b=c.$results.scrollTop(),d=c.$results.get(0).scrollHeight-c.$results.scrollTop()+a.deltaY,e=a.deltaY>0&&b-a.deltaY<=0,f=a.deltaY<0&&d<=c.$results.height();e?(c.$results.scrollTop(0),a.preventDefault(),a.stopPropagation()):f&&(c.$results.scrollTop(c.$results.get(0).scrollHeight-c.$results.height()),a.preventDefault(),a.stopPropagation())}),this.$results.on("mouseup",".select2-results__option[aria-selected]",function(b){var d=a(this),e=d.data("data");return"true"===d.attr("aria-selected")?void(c.options.get("multiple")?c.trigger("unselect",{originalEvent:b,data:e}):c.trigger("close")):void c.trigger("select",{originalEvent:b,data:e})}),this.$results.on("mouseenter",".select2-results__option[aria-selected]",function(){var b=a(this).data("data");c.getHighlightedResults().removeClass("select2-results__option--highlighted"),c.trigger("results:focus",{data:b,element:a(this)})})},c.prototype.getHighlightedResults=function(){var a=this.$results.find(".select2-results__option--highlighted");return a},c.prototype.destroy=function(){this.$results.remove()},c.prototype.ensureHighlightVisible=function(){var a=this.getHighlightedResults();if(0!==a.length){var b=this.$results.find("[aria-selected]"),c=b.index(a),d=this.$results.offset().top,e=a.offset().top,f=this.$results.scrollTop()+(e-d),g=e-d;f-=2*a.outerHeight(!1),2>=c?this.$results.scrollTop(0):(g>this.$results.outerHeight()||0>g)&&this.$results.scrollTop(f)}},c.prototype.template=function(b,c){var d=this.options.get("templateResult"),e=this.options.get("escapeMarkup"),f=d(b);null==f?c.style.display="none":"string"==typeof f?c.innerHTML=e(f):a(c).append(f)},c}),b.define("select2/keys",[],function(){var a={BACKSPACE:8,TAB:9,ENTER:13,SHIFT:16,CTRL:17,ALT:18,ESC:27,SPACE:32,PAGE_UP:33,PAGE_DOWN:34,END:35,HOME:36,LEFT:37,UP:38,RIGHT:39,DOWN:40,DELETE:46};return a}),b.define("select2/selection/base",["jquery","../utils","../keys"],function(a,b,c){function d(a,b){this.$element=a,this.options=b,d.__super__.constructor.call(this)}return b.Extend(d,b.Observable),d.prototype.render=function(){var b=a('<span class="select2-selection" role="combobox" aria-autocomplete="list" aria-haspopup="true" aria-expanded="false"></span>');return this._tabindex=0,null!=this.$element.data("old-tabindex")?this._tabindex=this.$element.data("old-tabindex"):null!=this.$element.attr("tabindex")&&(this._tabindex=this.$element.attr("tabindex")),b.attr("title",this.$element.attr("title")),b.attr("tabindex",this._tabindex),this.$selection=b,b},d.prototype.bind=function(a){var b=this,d=(a.id+"-container",a.id+"-results");this.container=a,this.$selection.on("focus",function(a){b.trigger("focus",a)}),this.$selection.on("blur",function(a){b.trigger("blur",a)}),this.$selection.on("keydown",function(a){b.trigger("keypress",a),a.which===c.SPACE&&a.preventDefault()}),a.on("results:focus",function(a){b.$selection.attr("aria-activedescendant",a.data._resultId)}),a.on("selection:update",function(a){b.update(a.data)}),a.on("open",function(){b.$selection.attr("aria-expanded","true"),b.$selection.attr("aria-owns",d),b._attachCloseHandler(a)}),a.on("close",function(){b.$selection.attr("aria-expanded","false"),b.$selection.removeAttr("aria-activedescendant"),b.$selection.removeAttr("aria-owns"),b.$selection.focus(),b._detachCloseHandler(a)}),a.on("enable",function(){b.$selection.attr("tabindex",b._tabindex)}),a.on("disable",function(){b.$selection.attr("tabindex","-1")})},d.prototype._attachCloseHandler=function(b){a(document.body).on("mousedown.select2."+b.id,function(b){var c=a(b.target),d=c.closest(".select2"),e=a(".select2.select2-container--open");e.each(function(){var b=a(this);if(this!=d[0]){var c=b.data("element");c.select2("close")}})})},d.prototype._detachCloseHandler=function(b){a(document.body).off("mousedown.select2."+b.id)},d.prototype.position=function(a,b){var c=b.find(".selection");c.append(a)},d.prototype.destroy=function(){this._detachCloseHandler(this.container)},d.prototype.update=function(){throw new Error("The `update` method must be defined in child classes.")},d}),b.define("select2/selection/single",["jquery","./base","../utils","../keys"],function(a,b,c){function d(){d.__super__.constructor.apply(this,arguments)}return c.Extend(d,b),d.prototype.render=function(){var a=d.__super__.render.call(this);return a.addClass("select2-selection--single"),a.html('<span class="select2-selection__rendered"></span><span class="select2-selection__arrow" role="presentation"><b role="presentation"></b></span>'),a},d.prototype.bind=function(a){var b=this;d.__super__.bind.apply(this,arguments);var c=a.id+"-container";this.$selection.find(".select2-selection__rendered").attr("id",c),this.$selection.attr("aria-labelledby",c),this.$selection.on("mousedown",function(a){1===a.which&&b.trigger("toggle",{originalEvent:a})}),this.$selection.on("focus",function(){}),this.$selection.on("blur",function(){}),a.on("selection:update",function(a){b.update(a.data)})},d.prototype.clear=function(){this.$selection.find(".select2-selection__rendered").empty()},d.prototype.display=function(a){var b=this.options.get("templateSelection"),c=this.options.get("escapeMarkup");return c(b(a))},d.prototype.selectionContainer=function(){return a("<span></span>")},d.prototype.update=function(a){if(0===a.length)return void this.clear();var b=a[0],c=this.display(b),d=this.$selection.find(".select2-selection__rendered");d.empty().append(c),d.prop("title",b.title||b.text)},d}),b.define("select2/selection/multiple",["jquery","./base","../utils"],function(a,b,c){function d(){d.__super__.constructor.apply(this,arguments)}return c.Extend(d,b),d.prototype.render=function(){var a=d.__super__.render.call(this);return a.addClass("select2-selection--multiple"),a.html('<ul class="select2-selection__rendered"></ul>'),a},d.prototype.bind=function(){var b=this;d.__super__.bind.apply(this,arguments),this.$selection.on("click",function(a){b.trigger("toggle",{originalEvent:a})}),this.$selection.on("click",".select2-selection__choice__remove",function(c){var d=a(this),e=d.parent(),f=e.data("data");b.trigger("unselect",{originalEvent:c,data:f})})},d.prototype.clear=function(){this.$selection.find(".select2-selection__rendered").empty()},d.prototype.display=function(a){var b=this.options.get("templateSelection"),c=this.options.get("escapeMarkup");return c(b(a))},d.prototype.selectionContainer=function(){var b=a('<li class="select2-selection__choice"><span class="select2-selection__choice__remove" role="presentation">&times;</span></li>');return b},d.prototype.update=function(a){if(this.clear(),0!==a.length){for(var b=[],d=0;d<a.length;d++){var e=a[d],f=this.display(e),g=this.selectionContainer();g.append(f),g.prop("title",e.title||e.text),g.data("data",e),b.push(g)}var h=this.$selection.find(".select2-selection__rendered");c.appendMany(h,b)}},d}),b.define("select2/selection/placeholder",["../utils"],function(){function a(a,b,c){this.placeholder=this.normalizePlaceholder(c.get("placeholder")),a.call(this,b,c)}return a.prototype.normalizePlaceholder=function(a,b){return"string"==typeof b&&(b={id:"",text:b}),b},a.prototype.createPlaceholder=function(a,b){var c=this.selectionContainer();return c.html(this.display(b)),c.addClass("select2-selection__placeholder").removeClass("select2-selection__choice"),c},a.prototype.update=function(a,b){var c=1==b.length&&b[0].id!=this.placeholder.id,d=b.length>1;if(d||c)return a.call(this,b);this.clear();var e=this.createPlaceholder(this.placeholder);this.$selection.find(".select2-selection__rendered").append(e)},a}),b.define("select2/selection/allowClear",["jquery","../keys"],function(a,b){function c(){}return c.prototype.bind=function(a,b,c){var d=this;a.call(this,b,c),null==this.placeholder&&this.options.get("debug")&&window.console&&console.error&&console.error("Select2: The `allowClear` option should be used in combination with the `placeholder` option."),this.$selection.on("mousedown",".select2-selection__clear",function(a){d._handleClear(a)}),b.on("keypress",function(a){d._handleKeyboardClear(a,b)})},c.prototype._handleClear=function(a,b){if(!this.options.get("disabled")){var c=this.$selection.find(".select2-selection__clear");if(0!==c.length){b.stopPropagation();for(var d=c.data("data"),e=0;e<d.length;e++){var f={data:d[e]};if(this.trigger("unselect",f),f.prevented)return}this.$element.val(this.placeholder.id).trigger("change"),this.trigger("toggle")}}},c.prototype._handleKeyboardClear=function(a,c,d){d.isOpen()||(c.which==b.DELETE||c.which==b.BACKSPACE)&&this._handleClear(c)},c.prototype.update=function(b,c){if(b.call(this,c),!(this.$selection.find(".select2-selection__placeholder").length>0||0===c.length)){var d=a('<span class="select2-selection__clear">&times;</span>');d.data("data",c),this.$selection.find(".select2-selection__rendered").prepend(d)}},c}),b.define("select2/selection/search",["jquery","../utils","../keys"],function(a,b,c){function d(a,b,c){a.call(this,b,c)}return d.prototype.render=function(b){var c=a('<li class="select2-search select2-search--inline"><input class="select2-search__field" type="search" tabindex="-1" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" role="textbox" /></li>');this.$searchContainer=c,this.$search=c.find("input");var d=b.call(this);return d},d.prototype.bind=function(a,b,d){var e=this;a.call(this,b,d),b.on("open",function(){e.$search.attr("tabindex",0),e.$search.focus()}),b.on("close",function(){e.$search.attr("tabindex",-1),e.$search.val(""),e.$search.focus()}),b.on("enable",function(){e.$search.prop("disabled",!1)}),b.on("disable",function(){e.$search.prop("disabled",!0)}),this.$selection.on("focusin",".select2-search--inline",function(a){e.trigger("focus",a)}),this.$selection.on("focusout",".select2-search--inline",function(a){e.trigger("blur",a)}),this.$selection.on("keydown",".select2-search--inline",function(a){a.stopPropagation(),e.trigger("keypress",a),e._keyUpPrevented=a.isDefaultPrevented();var b=a.which;if(b===c.BACKSPACE&&""===e.$search.val()){var d=e.$searchContainer.prev(".select2-selection__choice");if(d.length>0){var f=d.data("data");e.searchRemoveChoice(f),a.preventDefault()}}}),this.$selection.on("input",".select2-search--inline",function(){e.$selection.off("keyup.search")}),this.$selection.on("keyup.search input",".select2-search--inline",function(a){e.handleSearch(a)})},d.prototype.createPlaceholder=function(a,b){this.$search.attr("placeholder",b.text)},d.prototype.update=function(a,b){this.$search.attr("placeholder",""),a.call(this,b),this.$selection.find(".select2-selection__rendered").append(this.$searchContainer),this.resizeSearch()},d.prototype.handleSearch=function(){if(this.resizeSearch(),!this._keyUpPrevented){var a=this.$search.val();this.trigger("query",{term:a})}this._keyUpPrevented=!1},d.prototype.searchRemoveChoice=function(a,b){this.trigger("unselect",{data:b}),this.trigger("open"),this.$search.val(b.text+" ")},d.prototype.resizeSearch=function(){this.$search.css("width","25px");var a="";if(""!==this.$search.attr("placeholder"))a=this.$selection.find(".select2-selection__rendered").innerWidth();else{var b=this.$search.val().length+1;a=.75*b+"em"}this.$search.css("width",a)},d}),b.define("select2/selection/eventRelay",["jquery"],function(a){function b(){}return b.prototype.bind=function(b,c,d){var e=this,f=["open","opening","close","closing","select","selecting","unselect","unselecting"],g=["opening","closing","selecting","unselecting"];b.call(this,c,d),c.on("*",function(b,c){if(-1!==a.inArray(b,f)){c=c||{};var d=a.Event("select2:"+b,{params:c});e.$element.trigger(d),-1!==a.inArray(b,g)&&(c.prevented=d.isDefaultPrevented())}})},b}),b.define("select2/translation",["jquery","require"],function(a,b){function c(a){this.dict=a||{}}return c.prototype.all=function(){return this.dict},c.prototype.get=function(a){return this.dict[a]},c.prototype.extend=function(b){this.dict=a.extend({},b.all(),this.dict)},c._cache={},c.loadPath=function(a){if(!(a in c._cache)){var d=b(a);c._cache[a]=d}return new c(c._cache[a])},c}),b.define("select2/diacritics",[],function(){var a={"Ⓐ":"A","Ａ":"A","À":"A","Á":"A","Â":"A","Ầ":"A","Ấ":"A","Ẫ":"A","Ẩ":"A","Ã":"A","Ā":"A","Ă":"A","Ằ":"A","Ắ":"A","Ẵ":"A","Ẳ":"A","Ȧ":"A","Ǡ":"A","Ä":"A","Ǟ":"A","Ả":"A","Å":"A","Ǻ":"A","Ǎ":"A","Ȁ":"A","Ȃ":"A","Ạ":"A","Ậ":"A","Ặ":"A","Ḁ":"A","Ą":"A","Ⱥ":"A","Ɐ":"A","Ꜳ":"AA","Æ":"AE","Ǽ":"AE","Ǣ":"AE","Ꜵ":"AO","Ꜷ":"AU","Ꜹ":"AV","Ꜻ":"AV","Ꜽ":"AY","Ⓑ":"B","Ｂ":"B","Ḃ":"B","Ḅ":"B","Ḇ":"B","Ƀ":"B","Ƃ":"B","Ɓ":"B","Ⓒ":"C","Ｃ":"C","Ć":"C","Ĉ":"C","Ċ":"C","Č":"C","Ç":"C","Ḉ":"C","Ƈ":"C","Ȼ":"C","Ꜿ":"C","Ⓓ":"D","Ｄ":"D","Ḋ":"D","Ď":"D","Ḍ":"D","Ḑ":"D","Ḓ":"D","Ḏ":"D","Đ":"D","Ƌ":"D","Ɗ":"D","Ɖ":"D","Ꝺ":"D","Ǳ":"DZ","Ǆ":"DZ","ǲ":"Dz","ǅ":"Dz","Ⓔ":"E","Ｅ":"E","È":"E","É":"E","Ê":"E","Ề":"E","Ế":"E","Ễ":"E","Ể":"E","Ẽ":"E","Ē":"E","Ḕ":"E","Ḗ":"E","Ĕ":"E","Ė":"E","Ë":"E","Ẻ":"E","Ě":"E","Ȅ":"E","Ȇ":"E","Ẹ":"E","Ệ":"E","Ȩ":"E","Ḝ":"E","Ę":"E","Ḙ":"E","Ḛ":"E","Ɛ":"E","Ǝ":"E","Ⓕ":"F","Ｆ":"F","Ḟ":"F","Ƒ":"F","Ꝼ":"F","Ⓖ":"G","Ｇ":"G","Ǵ":"G","Ĝ":"G","Ḡ":"G","Ğ":"G","Ġ":"G","Ǧ":"G","Ģ":"G","Ǥ":"G","Ɠ":"G","Ꞡ":"G","Ᵹ":"G","Ꝿ":"G","Ⓗ":"H","Ｈ":"H","Ĥ":"H","Ḣ":"H","Ḧ":"H","Ȟ":"H","Ḥ":"H","Ḩ":"H","Ḫ":"H","Ħ":"H","Ⱨ":"H","Ⱶ":"H","Ɥ":"H","Ⓘ":"I","Ｉ":"I","Ì":"I","Í":"I","Î":"I","Ĩ":"I","Ī":"I","Ĭ":"I","İ":"I","Ï":"I","Ḯ":"I","Ỉ":"I","Ǐ":"I","Ȉ":"I","Ȋ":"I","Ị":"I","Į":"I","Ḭ":"I","Ɨ":"I","Ⓙ":"J","Ｊ":"J","Ĵ":"J","Ɉ":"J","Ⓚ":"K","Ｋ":"K","Ḱ":"K","Ǩ":"K","Ḳ":"K","Ķ":"K","Ḵ":"K","Ƙ":"K","Ⱪ":"K","Ꝁ":"K","Ꝃ":"K","Ꝅ":"K","Ꞣ":"K","Ⓛ":"L","Ｌ":"L","Ŀ":"L","Ĺ":"L","Ľ":"L","Ḷ":"L","Ḹ":"L","Ļ":"L","Ḽ":"L","Ḻ":"L","Ł":"L","Ƚ":"L","Ɫ":"L","Ⱡ":"L","Ꝉ":"L","Ꝇ":"L","Ꞁ":"L","Ǉ":"LJ","ǈ":"Lj","Ⓜ":"M","Ｍ":"M","Ḿ":"M","Ṁ":"M","Ṃ":"M","Ɱ":"M","Ɯ":"M","Ⓝ":"N","Ｎ":"N","Ǹ":"N","Ń":"N","Ñ":"N","Ṅ":"N","Ň":"N","Ṇ":"N","Ņ":"N","Ṋ":"N","Ṉ":"N","Ƞ":"N","Ɲ":"N","Ꞑ":"N","Ꞥ":"N","Ǌ":"NJ","ǋ":"Nj","Ⓞ":"O","Ｏ":"O","Ò":"O","Ó":"O","Ô":"O","Ồ":"O","Ố":"O","Ỗ":"O","Ổ":"O","Õ":"O","Ṍ":"O","Ȭ":"O","Ṏ":"O","Ō":"O","Ṑ":"O","Ṓ":"O","Ŏ":"O","Ȯ":"O","Ȱ":"O","Ö":"O","Ȫ":"O","Ỏ":"O","Ő":"O","Ǒ":"O","Ȍ":"O","Ȏ":"O","Ơ":"O","Ờ":"O","Ớ":"O","Ỡ":"O","Ở":"O","Ợ":"O","Ọ":"O","Ộ":"O","Ǫ":"O","Ǭ":"O","Ø":"O","Ǿ":"O","Ɔ":"O","Ɵ":"O","Ꝋ":"O","Ꝍ":"O","Ƣ":"OI","Ꝏ":"OO","Ȣ":"OU","Ⓟ":"P","Ｐ":"P","Ṕ":"P","Ṗ":"P","Ƥ":"P","Ᵽ":"P","Ꝑ":"P","Ꝓ":"P","Ꝕ":"P","Ⓠ":"Q","Ｑ":"Q","Ꝗ":"Q","Ꝙ":"Q","Ɋ":"Q","Ⓡ":"R","Ｒ":"R","Ŕ":"R","Ṙ":"R","Ř":"R","Ȑ":"R","Ȓ":"R","Ṛ":"R","Ṝ":"R","Ŗ":"R","Ṟ":"R","Ɍ":"R","Ɽ":"R","Ꝛ":"R","Ꞧ":"R","Ꞃ":"R","Ⓢ":"S","Ｓ":"S","ẞ":"S","Ś":"S","Ṥ":"S","Ŝ":"S","Ṡ":"S","Š":"S","Ṧ":"S","Ṣ":"S","Ṩ":"S","Ș":"S","Ş":"S","Ȿ":"S","Ꞩ":"S","Ꞅ":"S","Ⓣ":"T","Ｔ":"T","Ṫ":"T","Ť":"T","Ṭ":"T","Ț":"T","Ţ":"T","Ṱ":"T","Ṯ":"T","Ŧ":"T","Ƭ":"T","Ʈ":"T","Ⱦ":"T","Ꞇ":"T","Ꜩ":"TZ","Ⓤ":"U","Ｕ":"U","Ù":"U","Ú":"U","Û":"U","Ũ":"U","Ṹ":"U","Ū":"U","Ṻ":"U","Ŭ":"U","Ü":"U","Ǜ":"U","Ǘ":"U","Ǖ":"U","Ǚ":"U","Ủ":"U","Ů":"U","Ű":"U","Ǔ":"U","Ȕ":"U","Ȗ":"U","Ư":"U","Ừ":"U","Ứ":"U","Ữ":"U","Ử":"U","Ự":"U","Ụ":"U","Ṳ":"U","Ų":"U","Ṷ":"U","Ṵ":"U","Ʉ":"U","Ⓥ":"V","Ｖ":"V","Ṽ":"V","Ṿ":"V","Ʋ":"V","Ꝟ":"V","Ʌ":"V","Ꝡ":"VY","Ⓦ":"W","Ｗ":"W","Ẁ":"W","Ẃ":"W","Ŵ":"W","Ẇ":"W","Ẅ":"W","Ẉ":"W","Ⱳ":"W","Ⓧ":"X","Ｘ":"X","Ẋ":"X","Ẍ":"X","Ⓨ":"Y","Ｙ":"Y","Ỳ":"Y","Ý":"Y","Ŷ":"Y","Ỹ":"Y","Ȳ":"Y","Ẏ":"Y","Ÿ":"Y","Ỷ":"Y","Ỵ":"Y","Ƴ":"Y","Ɏ":"Y","Ỿ":"Y","Ⓩ":"Z","Ｚ":"Z","Ź":"Z","Ẑ":"Z","Ż":"Z","Ž":"Z","Ẓ":"Z","Ẕ":"Z","Ƶ":"Z","Ȥ":"Z","Ɀ":"Z","Ⱬ":"Z","Ꝣ":"Z","ⓐ":"a","ａ":"a","ẚ":"a","à":"a","á":"a","â":"a","ầ":"a","ấ":"a","ẫ":"a","ẩ":"a","ã":"a","ā":"a","ă":"a","ằ":"a","ắ":"a","ẵ":"a","ẳ":"a","ȧ":"a","ǡ":"a","ä":"a","ǟ":"a","ả":"a","å":"a","ǻ":"a","ǎ":"a","ȁ":"a","ȃ":"a","ạ":"a","ậ":"a","ặ":"a","ḁ":"a","ą":"a","ⱥ":"a","ɐ":"a","ꜳ":"aa","æ":"ae","ǽ":"ae","ǣ":"ae","ꜵ":"ao","ꜷ":"au","ꜹ":"av","ꜻ":"av","ꜽ":"ay","ⓑ":"b","ｂ":"b","ḃ":"b","ḅ":"b","ḇ":"b","ƀ":"b","ƃ":"b","ɓ":"b","ⓒ":"c","ｃ":"c","ć":"c","ĉ":"c","ċ":"c","č":"c","ç":"c","ḉ":"c","ƈ":"c","ȼ":"c","ꜿ":"c","ↄ":"c","ⓓ":"d","ｄ":"d","ḋ":"d","ď":"d","ḍ":"d","ḑ":"d","ḓ":"d","ḏ":"d","đ":"d","ƌ":"d","ɖ":"d","ɗ":"d","ꝺ":"d","ǳ":"dz","ǆ":"dz","ⓔ":"e","ｅ":"e","è":"e","é":"e","ê":"e","ề":"e","ế":"e","ễ":"e","ể":"e","ẽ":"e","ē":"e","ḕ":"e","ḗ":"e","ĕ":"e","ė":"e","ë":"e","ẻ":"e","ě":"e","ȅ":"e","ȇ":"e","ẹ":"e","ệ":"e","ȩ":"e","ḝ":"e","ę":"e","ḙ":"e","ḛ":"e","ɇ":"e","ɛ":"e","ǝ":"e","ⓕ":"f","ｆ":"f","ḟ":"f","ƒ":"f","ꝼ":"f","ⓖ":"g","ｇ":"g","ǵ":"g","ĝ":"g","ḡ":"g","ğ":"g","ġ":"g","ǧ":"g","ģ":"g","ǥ":"g","ɠ":"g","ꞡ":"g","ᵹ":"g","ꝿ":"g","ⓗ":"h","ｈ":"h","ĥ":"h","ḣ":"h","ḧ":"h","ȟ":"h","ḥ":"h","ḩ":"h","ḫ":"h","ẖ":"h","ħ":"h","ⱨ":"h","ⱶ":"h","ɥ":"h","ƕ":"hv","ⓘ":"i","ｉ":"i","ì":"i","í":"i","î":"i","ĩ":"i","ī":"i","ĭ":"i","ï":"i","ḯ":"i","ỉ":"i","ǐ":"i","ȉ":"i","ȋ":"i","ị":"i","į":"i","ḭ":"i","ɨ":"i","ı":"i","ⓙ":"j","ｊ":"j","ĵ":"j","ǰ":"j","ɉ":"j","ⓚ":"k","ｋ":"k","ḱ":"k","ǩ":"k","ḳ":"k","ķ":"k","ḵ":"k","ƙ":"k","ⱪ":"k","ꝁ":"k","ꝃ":"k","ꝅ":"k","ꞣ":"k","ⓛ":"l","ｌ":"l","ŀ":"l","ĺ":"l","ľ":"l","ḷ":"l","ḹ":"l","ļ":"l","ḽ":"l","ḻ":"l","ſ":"l","ł":"l","ƚ":"l","ɫ":"l","ⱡ":"l","ꝉ":"l","ꞁ":"l","ꝇ":"l","ǉ":"lj","ⓜ":"m","ｍ":"m","ḿ":"m","ṁ":"m","ṃ":"m","ɱ":"m","ɯ":"m","ⓝ":"n","ｎ":"n","ǹ":"n","ń":"n","ñ":"n","ṅ":"n","ň":"n","ṇ":"n","ņ":"n","ṋ":"n","ṉ":"n","ƞ":"n","ɲ":"n","ŉ":"n","ꞑ":"n","ꞥ":"n","ǌ":"nj","ⓞ":"o","ｏ":"o","ò":"o","ó":"o","ô":"o","ồ":"o","ố":"o","ỗ":"o","ổ":"o","õ":"o","ṍ":"o","ȭ":"o","ṏ":"o","ō":"o","ṑ":"o","ṓ":"o","ŏ":"o","ȯ":"o","ȱ":"o","ö":"o","ȫ":"o","ỏ":"o","ő":"o","ǒ":"o","ȍ":"o","ȏ":"o","ơ":"o","ờ":"o","ớ":"o","ỡ":"o","ở":"o","ợ":"o","ọ":"o","ộ":"o","ǫ":"o","ǭ":"o","ø":"o","ǿ":"o","ɔ":"o","ꝋ":"o","ꝍ":"o","ɵ":"o","ƣ":"oi","ȣ":"ou","ꝏ":"oo","ⓟ":"p","ｐ":"p","ṕ":"p","ṗ":"p","ƥ":"p","ᵽ":"p","ꝑ":"p","ꝓ":"p","ꝕ":"p","ⓠ":"q","ｑ":"q","ɋ":"q","ꝗ":"q","ꝙ":"q","ⓡ":"r","ｒ":"r","ŕ":"r","ṙ":"r","ř":"r","ȑ":"r","ȓ":"r","ṛ":"r","ṝ":"r","ŗ":"r","ṟ":"r","ɍ":"r","ɽ":"r","ꝛ":"r","ꞧ":"r","ꞃ":"r","ⓢ":"s","ｓ":"s","ß":"s","ś":"s","ṥ":"s","ŝ":"s","ṡ":"s","š":"s","ṧ":"s","ṣ":"s","ṩ":"s","ș":"s","ş":"s","ȿ":"s","ꞩ":"s","ꞅ":"s","ẛ":"s","ⓣ":"t","ｔ":"t","ṫ":"t","ẗ":"t","ť":"t","ṭ":"t","ț":"t","ţ":"t","ṱ":"t","ṯ":"t","ŧ":"t","ƭ":"t","ʈ":"t","ⱦ":"t","ꞇ":"t","ꜩ":"tz","ⓤ":"u","ｕ":"u","ù":"u","ú":"u","û":"u","ũ":"u","ṹ":"u","ū":"u","ṻ":"u","ŭ":"u","ü":"u","ǜ":"u","ǘ":"u","ǖ":"u","ǚ":"u","ủ":"u","ů":"u","ű":"u","ǔ":"u","ȕ":"u","ȗ":"u","ư":"u","ừ":"u","ứ":"u","ữ":"u","ử":"u","ự":"u","ụ":"u","ṳ":"u","ų":"u","ṷ":"u","ṵ":"u","ʉ":"u","ⓥ":"v","ｖ":"v","ṽ":"v","ṿ":"v","ʋ":"v","ꝟ":"v","ʌ":"v","ꝡ":"vy","ⓦ":"w","ｗ":"w","ẁ":"w","ẃ":"w","ŵ":"w","ẇ":"w","ẅ":"w","ẘ":"w","ẉ":"w","ⱳ":"w","ⓧ":"x","ｘ":"x","ẋ":"x","ẍ":"x","ⓨ":"y","ｙ":"y","ỳ":"y","ý":"y","ŷ":"y","ỹ":"y","ȳ":"y","ẏ":"y","ÿ":"y","ỷ":"y","ẙ":"y","ỵ":"y","ƴ":"y","ɏ":"y","ỿ":"y","ⓩ":"z","ｚ":"z","ź":"z","ẑ":"z","ż":"z","ž":"z","ẓ":"z","ẕ":"z","ƶ":"z","ȥ":"z","ɀ":"z","ⱬ":"z","ꝣ":"z","Ά":"Α","Έ":"Ε","Ή":"Η","Ί":"Ι","Ϊ":"Ι","Ό":"Ο","Ύ":"Υ","Ϋ":"Υ","Ώ":"Ω","ά":"α","έ":"ε","ή":"η","ί":"ι","ϊ":"ι","ΐ":"ι","ό":"ο","ύ":"υ","ϋ":"υ","ΰ":"υ","ω":"ω","ς":"σ"};return a}),b.define("select2/data/base",["../utils"],function(a){function b(){b.__super__.constructor.call(this)}return a.Extend(b,a.Observable),b.prototype.current=function(){throw new Error("The `current` method must be defined in child classes.")},b.prototype.query=function(){throw new Error("The `query` method must be defined in child classes.")},b.prototype.bind=function(){},b.prototype.destroy=function(){},b.prototype.generateResultId=function(b,c){var d=b.id+"-result-";return d+=a.generateChars(4),d+=null!=c.id?"-"+c.id.toString():"-"+a.generateChars(4)},b}),b.define("select2/data/select",["./base","../utils","jquery"],function(a,b,c){function d(a,b){this.$element=a,this.options=b,d.__super__.constructor.call(this)}return b.Extend(d,a),d.prototype.current=function(a){var b=[],d=this;this.$element.find(":selected").each(function(){var a=c(this),e=d.item(a);b.push(e)}),a(b)},d.prototype.select=function(a){var b=this;if(a.selected=!0,c(a.element).is("option"))return a.element.selected=!0,void this.$element.trigger("change");if(this.$element.prop("multiple"))this.current(function(d){var e=[];a=[a],a.push.apply(a,d);for(var f=0;f<a.length;f++){var g=a[f].id;-1===c.inArray(g,e)&&e.push(g)}b.$element.val(e),b.$element.trigger("change")});else{var d=a.id;this.$element.val(d),this.$element.trigger("change")}},d.prototype.unselect=function(a){var b=this;if(this.$element.prop("multiple"))return a.selected=!1,c(a.element).is("option")?(a.element.selected=!1,void this.$element.trigger("change")):void this.current(function(d){for(var e=[],f=0;f<d.length;f++){var g=d[f].id;g!==a.id&&-1===c.inArray(g,e)&&e.push(g)}b.$element.val(e),b.$element.trigger("change")})},d.prototype.bind=function(a){var b=this;this.container=a,a.on("select",function(a){b.select(a.data)}),a.on("unselect",function(a){b.unselect(a.data)})},d.prototype.destroy=function(){this.$element.find("*").each(function(){c.removeData(this,"data")})},d.prototype.query=function(a,b){var d=[],e=this,f=this.$element.children();f.each(function(){var b=c(this);if(b.is("option")||b.is("optgroup")){var f=e.item(b),g=e.matches(a,f);null!==g&&d.push(g)}}),b({results:d})},d.prototype.addOptions=function(a){b.appendMany(this.$element,a)},d.prototype.option=function(a){var b;a.children?(b=document.createElement("optgroup"),b.label=a.text):(b=document.createElement("option"),void 0!==b.textContent?b.textContent=a.text:b.innerText=a.text),a.id&&(b.value=a.id),a.disabled&&(b.disabled=!0),a.selected&&(b.selected=!0),a.title&&(b.title=a.title);var d=c(b),e=this._normalizeItem(a);return e.element=b,c.data(b,"data",e),d},d.prototype.item=function(a){var b={};
if(b=c.data(a[0],"data"),null!=b)return b;if(a.is("option"))b={id:a.val(),text:a.text(),disabled:a.prop("disabled"),selected:a.prop("selected"),title:a.prop("title")};else if(a.is("optgroup")){b={text:a.prop("label"),children:[],title:a.prop("title")};for(var d=a.children("option"),e=[],f=0;f<d.length;f++){var g=c(d[f]),h=this.item(g);e.push(h)}b.children=e}return b=this._normalizeItem(b),b.element=a[0],c.data(a[0],"data",b),b},d.prototype._normalizeItem=function(a){c.isPlainObject(a)||(a={id:a,text:a}),a=c.extend({},{text:""},a);var b={selected:!1,disabled:!1};return null!=a.id&&(a.id=a.id.toString()),null!=a.text&&(a.text=a.text.toString()),null==a._resultId&&a.id&&null!=this.container&&(a._resultId=this.generateResultId(this.container,a)),c.extend({},b,a)},d.prototype.matches=function(a,b){var c=this.options.get("matcher");return c(a,b)},d}),b.define("select2/data/array",["./select","../utils","jquery"],function(a,b,c){function d(a,b){var c=b.get("data")||[];d.__super__.constructor.call(this,a,b),this.addOptions(this.convertToOptions(c))}return b.Extend(d,a),d.prototype.select=function(a){var b=this.$element.find("option").filter(function(b,c){return c.value==a.id.toString()});0===b.length&&(b=this.option(a),this.addOptions(b)),d.__super__.select.call(this,a)},d.prototype.convertToOptions=function(a){function d(a){return function(){return c(this).val()==a.id}}for(var e=this,f=this.$element.find("option"),g=f.map(function(){return e.item(c(this)).id}).get(),h=[],i=0;i<a.length;i++){var j=this._normalizeItem(a[i]);if(c.inArray(j.id,g)>=0){var k=f.filter(d(j)),l=this.item(k),m=(c.extend(!0,{},l,j),this.option(l));k.replaceWith(m)}else{var n=this.option(j);if(j.children){var o=this.convertToOptions(j.children);b.appendMany(n,o)}h.push(n)}}return h},d}),b.define("select2/data/ajax",["./array","../utils","jquery"],function(a,b,c){function d(b,c){this.ajaxOptions=this._applyDefaults(c.get("ajax")),null!=this.ajaxOptions.processResults&&(this.processResults=this.ajaxOptions.processResults),a.__super__.constructor.call(this,b,c)}return b.Extend(d,a),d.prototype._applyDefaults=function(a){var b={data:function(a){return{q:a.term}},transport:function(a,b,d){var e=c.ajax(a);return e.then(b),e.fail(d),e}};return c.extend({},b,a,!0)},d.prototype.processResults=function(a){return a},d.prototype.query=function(a,b){function d(){var d=f.transport(f,function(d){var f=e.processResults(d,a);e.options.get("debug")&&window.console&&console.error&&(f&&f.results&&c.isArray(f.results)||console.error("Select2: The AJAX results did not return an array in the `results` key of the response.")),b(f)},function(){});e._request=d}var e=this;null!=this._request&&(c.isFunction(this._request.abort)&&this._request.abort(),this._request=null);var f=c.extend({type:"GET"},this.ajaxOptions);"function"==typeof f.url&&(f.url=f.url(a)),"function"==typeof f.data&&(f.data=f.data(a)),this.ajaxOptions.delay&&""!==a.term?(this._queryTimeout&&window.clearTimeout(this._queryTimeout),this._queryTimeout=window.setTimeout(d,this.ajaxOptions.delay)):d()},d}),b.define("select2/data/tags",["jquery"],function(a){function b(b,c,d){var e=d.get("tags"),f=d.get("createTag");if(void 0!==f&&(this.createTag=f),b.call(this,c,d),a.isArray(e))for(var g=0;g<e.length;g++){var h=e[g],i=this._normalizeItem(h),j=this.option(i);this.$element.append(j)}}return b.prototype.query=function(a,b,c){function d(a,f){for(var g=a.results,h=0;h<g.length;h++){var i=g[h],j=null!=i.children&&!d({results:i.children},!0),k=i.text===b.term;if(k||j)return f?!1:(a.data=g,void c(a))}if(f)return!0;var l=e.createTag(b);if(null!=l){var m=e.option(l);m.attr("data-select2-tag",!0),e.addOptions([m]),e.insertTag(g,l)}a.results=g,c(a)}var e=this;return this._removeOldTags(),null==b.term||null!=b.page?void a.call(this,b,c):void a.call(this,b,d)},b.prototype.createTag=function(b,c){var d=a.trim(c.term);return""===d?null:{id:d,text:d}},b.prototype.insertTag=function(a,b,c){b.unshift(c)},b.prototype._removeOldTags=function(){var b=(this._lastTag,this.$element.find("option[data-select2-tag]"));b.each(function(){this.selected||a(this).remove()})},b}),b.define("select2/data/tokenizer",["jquery"],function(a){function b(a,b,c){var d=c.get("tokenizer");void 0!==d&&(this.tokenizer=d),a.call(this,b,c)}return b.prototype.bind=function(a,b,c){a.call(this,b,c),this.$search=b.dropdown.$search||b.selection.$search||c.find(".select2-search__field")},b.prototype.query=function(a,b,c){function d(a){e.select(a)}var e=this;b.term=b.term||"";var f=this.tokenizer(b,this.options,d);f.term!==b.term&&(this.$search.length&&(this.$search.val(f.term),this.$search.focus()),b.term=f.term),a.call(this,b,c)},b.prototype.tokenizer=function(b,c,d,e){for(var f=d.get("tokenSeparators")||[],g=c.term,h=0,i=this.createTag||function(a){return{id:a.term,text:a.term}};h<g.length;){var j=g[h];if(-1!==a.inArray(j,f)){var k=g.substr(0,h),l=a.extend({},c,{term:k}),m=i(l);e(m),g=g.substr(h+1)||"",h=0}else h++}return{term:g}},b}),b.define("select2/data/minimumInputLength",[],function(){function a(a,b,c){this.minimumInputLength=c.get("minimumInputLength"),a.call(this,b,c)}return a.prototype.query=function(a,b,c){return b.term=b.term||"",b.term.length<this.minimumInputLength?void this.trigger("results:message",{message:"inputTooShort",args:{minimum:this.minimumInputLength,input:b.term,params:b}}):void a.call(this,b,c)},a}),b.define("select2/data/maximumInputLength",[],function(){function a(a,b,c){this.maximumInputLength=c.get("maximumInputLength"),a.call(this,b,c)}return a.prototype.query=function(a,b,c){return b.term=b.term||"",this.maximumInputLength>0&&b.term.length>this.maximumInputLength?void this.trigger("results:message",{message:"inputTooLong",args:{maximum:this.maximumInputLength,input:b.term,params:b}}):void a.call(this,b,c)},a}),b.define("select2/data/maximumSelectionLength",[],function(){function a(a,b,c){this.maximumSelectionLength=c.get("maximumSelectionLength"),a.call(this,b,c)}return a.prototype.query=function(a,b,c){var d=this;this.current(function(e){var f=null!=e?e.length:0;return d.maximumSelectionLength>0&&f>=d.maximumSelectionLength?void d.trigger("results:message",{message:"maximumSelected",args:{maximum:d.maximumSelectionLength}}):void a.call(d,b,c)})},a}),b.define("select2/dropdown",["jquery","./utils"],function(a,b){function c(a,b){this.$element=a,this.options=b,c.__super__.constructor.call(this)}return b.Extend(c,b.Observable),c.prototype.render=function(){var b=a('<span class="select2-dropdown"><span class="select2-results"></span></span>');return b.attr("dir",this.options.get("dir")),this.$dropdown=b,b},c.prototype.position=function(){},c.prototype.destroy=function(){this.$dropdown.remove()},c}),b.define("select2/dropdown/search",["jquery","../utils"],function(a){function b(){}return b.prototype.render=function(b){var c=b.call(this),d=a('<span class="select2-search select2-search--dropdown"><input class="select2-search__field" type="search" tabindex="-1" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" role="textbox" /></span>');return this.$searchContainer=d,this.$search=d.find("input"),c.prepend(d),c},b.prototype.bind=function(b,c,d){var e=this;b.call(this,c,d),this.$search.on("keydown",function(a){e.trigger("keypress",a),e._keyUpPrevented=a.isDefaultPrevented()}),this.$search.on("input",function(){a(this).off("keyup")}),this.$search.on("keyup input",function(a){e.handleSearch(a)}),c.on("open",function(){e.$search.attr("tabindex",0),e.$search.focus(),window.setTimeout(function(){e.$search.focus()},0)}),c.on("close",function(){e.$search.attr("tabindex",-1),e.$search.val("")}),c.on("results:all",function(a){if(null==a.query.term||""===a.query.term){var b=e.showSearch(a);b?e.$searchContainer.removeClass("select2-search--hide"):e.$searchContainer.addClass("select2-search--hide")}})},b.prototype.handleSearch=function(){if(!this._keyUpPrevented){var a=this.$search.val();this.trigger("query",{term:a})}this._keyUpPrevented=!1},b.prototype.showSearch=function(){return!0},b}),b.define("select2/dropdown/hidePlaceholder",[],function(){function a(a,b,c,d){this.placeholder=this.normalizePlaceholder(c.get("placeholder")),a.call(this,b,c,d)}return a.prototype.append=function(a,b){b.results=this.removePlaceholder(b.results),a.call(this,b)},a.prototype.normalizePlaceholder=function(a,b){return"string"==typeof b&&(b={id:"",text:b}),b},a.prototype.removePlaceholder=function(a,b){for(var c=b.slice(0),d=b.length-1;d>=0;d--){var e=b[d];this.placeholder.id===e.id&&c.splice(d,1)}return c},a}),b.define("select2/dropdown/infiniteScroll",["jquery"],function(a){function b(a,b,c,d){this.lastParams={},a.call(this,b,c,d),this.$loadingMore=this.createLoadingMore(),this.loading=!1}return b.prototype.append=function(a,b){this.$loadingMore.remove(),this.loading=!1,a.call(this,b),this.showLoadingMore(b)&&this.$results.append(this.$loadingMore)},b.prototype.bind=function(b,c,d){var e=this;b.call(this,c,d),c.on("query",function(a){e.lastParams=a,e.loading=!0}),c.on("query:append",function(a){e.lastParams=a,e.loading=!0}),this.$results.on("scroll",function(){var b=a.contains(document.documentElement,e.$loadingMore[0]);if(!e.loading&&b){var c=e.$results.offset().top+e.$results.outerHeight(!1),d=e.$loadingMore.offset().top+e.$loadingMore.outerHeight(!1);c+50>=d&&e.loadMore()}})},b.prototype.loadMore=function(){this.loading=!0;var b=a.extend({},{page:1},this.lastParams);b.page++,this.trigger("query:append",b)},b.prototype.showLoadingMore=function(a,b){return b.pagination&&b.pagination.more},b.prototype.createLoadingMore=function(){var b=a('<li class="option load-more" role="treeitem"></li>'),c=this.options.get("translations").get("loadingMore");return b.html(c(this.lastParams)),b},b}),b.define("select2/dropdown/attachBody",["jquery","../utils"],function(a,b){function c(a,b,c){this.$dropdownParent=c.get("dropdownParent")||document.body,a.call(this,b,c)}return c.prototype.bind=function(a,b,c){var d=this,e=!1;a.call(this,b,c),b.on("open",function(){d._showDropdown(),d._attachPositioningHandler(b),e||(e=!0,b.on("results:all",function(){d._positionDropdown(),d._resizeDropdown()}),b.on("results:append",function(){d._positionDropdown(),d._resizeDropdown()}))}),b.on("close",function(){d._hideDropdown(),d._detachPositioningHandler(b)}),this.$dropdownContainer.on("mousedown",function(a){a.stopPropagation()})},c.prototype.position=function(a,b,c){b.attr("class",c.attr("class")),b.removeClass("select2"),b.addClass("select2-container--open"),b.css({position:"absolute",top:-999999}),this.$container=c},c.prototype.render=function(b){var c=a("<span></span>"),d=b.call(this);return c.append(d),this.$dropdownContainer=c,c},c.prototype._hideDropdown=function(){this.$dropdownContainer.detach()},c.prototype._attachPositioningHandler=function(c){var d=this,e="scroll.select2."+c.id,f="resize.select2."+c.id,g="orientationchange.select2."+c.id,h=this.$container.parents().filter(b.hasScroll);h.each(function(){a(this).data("select2-scroll-position",{x:a(this).scrollLeft(),y:a(this).scrollTop()})}),h.on(e,function(){var b=a(this).data("select2-scroll-position");a(this).scrollTop(b.y)}),a(window).on(e+" "+f+" "+g,function(){d._positionDropdown(),d._resizeDropdown()})},c.prototype._detachPositioningHandler=function(c){var d="scroll.select2."+c.id,e="resize.select2."+c.id,f="orientationchange.select2."+c.id,g=this.$container.parents().filter(b.hasScroll);g.off(d),a(window).off(d+" "+e+" "+f)},c.prototype._positionDropdown=function(){var b=a(window),c=this.$dropdown.hasClass("select2-dropdown--above"),d=this.$dropdown.hasClass("select2-dropdown--below"),e=null,f=(this.$container.position(),this.$container.offset());f.bottom=f.top+this.$container.outerHeight(!1);var g={height:this.$container.outerHeight(!1)};g.top=f.top,g.bottom=f.top+g.height;var h={height:this.$dropdown.outerHeight(!1)},i={top:b.scrollTop(),bottom:b.scrollTop()+b.height()},j=i.top<f.top-h.height,k=i.bottom>f.bottom+h.height,l={left:f.left,top:g.bottom};c||d||(e="below"),k||!j||c?!j&&k&&c&&(e="below"):e="above",("above"==e||c&&"below"!==e)&&(l.top=g.top-h.height),null!=e&&(this.$dropdown.removeClass("select2-dropdown--below select2-dropdown--above").addClass("select2-dropdown--"+e),this.$container.removeClass("select2-container--below select2-container--above").addClass("select2-container--"+e)),this.$dropdownContainer.css(l)},c.prototype._resizeDropdown=function(){this.$dropdownContainer.width();var a={width:this.$container.outerWidth(!1)+"px"};this.options.get("dropdownAutoWidth")&&(a.minWidth=a.width,a.width="auto"),this.$dropdown.css(a)},c.prototype._showDropdown=function(){this.$dropdownContainer.appendTo(this.$dropdownParent),this._positionDropdown(),this._resizeDropdown()},c}),b.define("select2/dropdown/minimumResultsForSearch",[],function(){function a(b){for(var c=0,d=0;d<b.length;d++){var e=b[d];e.children?c+=a(e.children):c++}return c}function b(a,b,c,d){this.minimumResultsForSearch=c.get("minimumResultsForSearch"),this.minimumResultsForSearch<0&&(this.minimumResultsForSearch=1/0),a.call(this,b,c,d)}return b.prototype.showSearch=function(b,c){return a(c.data.results)<this.minimumResultsForSearch?!1:b.call(this,c)},b}),b.define("select2/dropdown/selectOnClose",[],function(){function a(){}return a.prototype.bind=function(a,b,c){var d=this;a.call(this,b,c),b.on("close",function(){d._handleSelectOnClose()})},a.prototype._handleSelectOnClose=function(){var a=this.getHighlightedResults();a.length<1||this.trigger("select",{data:a.data("data")})},a}),b.define("select2/dropdown/closeOnSelect",[],function(){function a(){}return a.prototype.bind=function(a,b,c){var d=this;a.call(this,b,c),b.on("select",function(a){d._selectTriggered(a)}),b.on("unselect",function(a){d._selectTriggered(a)})},a.prototype._selectTriggered=function(a,b){var c=b.originalEvent;c&&c.ctrlKey||this.trigger("close")},a}),b.define("select2/i18n/en",[],function(){return{errorLoading:function(){return"The results could not be loaded."},inputTooLong:function(a){var b=a.input.length-a.maximum,c=$.i18n('select2-max-chars',b);return 1!=b&&(c+="s"),c},inputTooShort:function(a){var b=a.minimum-a.input.length,c=$.i18n('select2-min-chars',b);return c},loadingMore:function(){return $.i18n('select2-loading')},maximumSelected:function(a){var b=$.i18n('select2-max-items', a.maximum);return 1!=a.maximum&&(b+=""),b},noResults:function(){return $.i18n('select2-no-results')},searching:function(){}}}),b.define("select2/defaults",["jquery","require","./results","./selection/single","./selection/multiple","./selection/placeholder","./selection/allowClear","./selection/search","./selection/eventRelay","./utils","./translation","./diacritics","./data/select","./data/array","./data/ajax","./data/tags","./data/tokenizer","./data/minimumInputLength","./data/maximumInputLength","./data/maximumSelectionLength","./dropdown","./dropdown/search","./dropdown/hidePlaceholder","./dropdown/infiniteScroll","./dropdown/attachBody","./dropdown/minimumResultsForSearch","./dropdown/selectOnClose","./dropdown/closeOnSelect","./i18n/en"],function(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z,A,B,C){function D(){this.reset()}D.prototype.apply=function(l){if(l=a.extend({},this.defaults,l),null==l.dataAdapter){if(l.dataAdapter=null!=l.ajax?o:null!=l.data?n:m,l.minimumInputLength>0&&(l.dataAdapter=j.Decorate(l.dataAdapter,r)),l.maximumInputLength>0&&(l.dataAdapter=j.Decorate(l.dataAdapter,s)),l.maximumSelectionLength>0&&(l.dataAdapter=j.Decorate(l.dataAdapter,t)),l.tags&&(l.dataAdapter=j.Decorate(l.dataAdapter,p)),(null!=l.tokenSeparators||null!=l.tokenizer)&&(l.dataAdapter=j.Decorate(l.dataAdapter,q)),null!=l.query){var C=b(l.amdBase+"compat/query");l.dataAdapter=j.Decorate(l.dataAdapter,C)}if(null!=l.initSelection){var D=b(l.amdBase+"compat/initSelection");l.dataAdapter=j.Decorate(l.dataAdapter,D)}}if(null==l.resultsAdapter&&(l.resultsAdapter=c,null!=l.ajax&&(l.resultsAdapter=j.Decorate(l.resultsAdapter,x)),null!=l.placeholder&&(l.resultsAdapter=j.Decorate(l.resultsAdapter,w)),l.selectOnClose&&(l.resultsAdapter=j.Decorate(l.resultsAdapter,A))),null==l.dropdownAdapter){if(l.multiple)l.dropdownAdapter=u;else{var E=j.Decorate(u,v);l.dropdownAdapter=E}if(0!==l.minimumResultsForSearch&&(l.dropdownAdapter=j.Decorate(l.dropdownAdapter,z)),l.closeOnSelect&&(l.dropdownAdapter=j.Decorate(l.dropdownAdapter,B)),null!=l.dropdownCssClass||null!=l.dropdownCss||null!=l.adaptDropdownCssClass){var F=b(l.amdBase+"compat/dropdownCss");l.dropdownAdapter=j.Decorate(l.dropdownAdapter,F)}l.dropdownAdapter=j.Decorate(l.dropdownAdapter,y)}if(null==l.selectionAdapter){if(l.selectionAdapter=l.multiple?e:d,null!=l.placeholder&&(l.selectionAdapter=j.Decorate(l.selectionAdapter,f)),l.allowClear&&(l.selectionAdapter=j.Decorate(l.selectionAdapter,g)),l.multiple&&(l.selectionAdapter=j.Decorate(l.selectionAdapter,h)),null!=l.containerCssClass||null!=l.containerCss||null!=l.adaptContainerCssClass){var G=b(l.amdBase+"compat/containerCss");l.selectionAdapter=j.Decorate(l.selectionAdapter,G)}l.selectionAdapter=j.Decorate(l.selectionAdapter,i)}if("string"==typeof l.language)if(l.language.indexOf("-")>0){var H=l.language.split("-"),I=H[0];l.language=[l.language,I]}else l.language=[l.language];if(a.isArray(l.language)){var J=new k;l.language.push("en");for(var K=l.language,L=0;L<K.length;L++){var M=K[L],N={};try{N=k.loadPath(M)}catch(O){try{M=this.defaults.amdLanguageBase+M,N=k.loadPath(M)}catch(P){l.debug&&window.console&&console.warn&&console.warn('Select2: The language file for "'+M+'" could not be automatically loaded. A fallback will be used instead.');continue}}J.extend(N)}l.translations=J}else{var Q=k.loadPath(this.defaults.amdLanguageBase+"en"),R=new k(l.language);R.extend(Q),l.translations=R}return l},D.prototype.reset=function(){function b(a){function b(a){return l[a]||a}return a.replace(/[^\u0000-\u007E]/g,b)}function c(d,e){if(""===a.trim(d.term))return e;if(e.children&&e.children.length>0){for(var f=a.extend(!0,{},e),g=e.children.length-1;g>=0;g--){var h=e.children[g],i=c(d,h);null==i&&f.children.splice(g,1)}return f.children.length>0?f:c(d,f)}var j=b(e.text).toUpperCase(),k=b(d.term).toUpperCase();return j.indexOf(k)>-1?e:null}this.defaults={amdBase:"./",amdLanguageBase:"./i18n/",closeOnSelect:!0,debug:!1,dropdownAutoWidth:!1,escapeMarkup:j.escapeMarkup,language:C,matcher:c,minimumInputLength:0,maximumInputLength:0,maximumSelectionLength:0,minimumResultsForSearch:0,selectOnClose:!1,sorter:function(a){return a},templateResult:function(a){return a.text},templateSelection:function(a){return a.text},theme:"default",width:"resolve"}},D.prototype.set=function(b,c){var d=a.camelCase(b),e={};e[d]=c;var f=j._convertData(e);a.extend(this.defaults,f)};var E=new D;return E}),b.define("select2/options",["require","jquery","./defaults","./utils"],function(a,b,c,d){function e(b,e){if(this.options=b,null!=e&&this.fromElement(e),this.options=c.apply(this.options),e&&e.is("input")){var f=a(this.get("amdBase")+"compat/inputData");this.options.dataAdapter=d.Decorate(this.options.dataAdapter,f)}}return e.prototype.fromElement=function(a){var c=["select2"];null==this.options.multiple&&(this.options.multiple=a.prop("multiple")),null==this.options.disabled&&(this.options.disabled=a.prop("disabled")),null==this.options.language&&(a.prop("lang")?this.options.language=a.prop("lang").toLowerCase():a.closest("[lang]").prop("lang")&&(this.options.language=a.closest("[lang]").prop("lang"))),null==this.options.dir&&(this.options.dir=a.prop("dir")?a.prop("dir"):a.closest("[dir]").prop("dir")?a.closest("[dir]").prop("dir"):"ltr"),a.prop("disabled",this.options.disabled),a.prop("multiple",this.options.multiple),a.data("select2Tags")&&(this.options.debug&&window.console&&console.warn&&console.warn('Select2: The `data-select2-tags` attribute has been changed to use the `data-data` and `data-tags="true"` attributes and will be removed in future versions of Select2.'),a.data("data",a.data("select2Tags")),a.data("tags",!0)),a.data("ajaxUrl")&&(this.options.debug&&window.console&&console.warn&&console.warn("Select2: The `data-ajax-url` attribute has been changed to `data-ajax--url` and support for the old attribute will be removed in future versions of Select2."),a.attr("ajax--url",a.data("ajaxUrl")),a.data("ajax--url",a.data("ajaxUrl")));var e={};e=b.fn.jquery&&"1."==b.fn.jquery.substr(0,2)&&a[0].dataset?b.extend(!0,{},a[0].dataset,a.data()):a.data();var f=b.extend(!0,{},e);f=d._convertData(f);for(var g in f)b.inArray(g,c)>-1||(b.isPlainObject(this.options[g])?b.extend(this.options[g],f[g]):this.options[g]=f[g]);return this},e.prototype.get=function(a){return this.options[a]},e.prototype.set=function(a,b){this.options[a]=b},e}),b.define("select2/core",["jquery","./options","./utils","./keys"],function(a,b,c,d){var e=function(a,c){null!=a.data("select2")&&a.data("select2").destroy(),this.$element=a,this.id=this._generateId(a),c=c||{},this.options=new b(c,a),e.__super__.constructor.call(this);var d=a.attr("tabindex")||0;a.data("old-tabindex",d),a.attr("tabindex","-1");var f=this.options.get("dataAdapter");this.dataAdapter=new f(a,this.options);var g=this.render();this._placeContainer(g);var h=this.options.get("selectionAdapter");this.selection=new h(a,this.options),this.$selection=this.selection.render(),this.selection.position(this.$selection,g);var i=this.options.get("dropdownAdapter");this.dropdown=new i(a,this.options),this.$dropdown=this.dropdown.render(),this.dropdown.position(this.$dropdown,g);var j=this.options.get("resultsAdapter");this.results=new j(a,this.options,this.dataAdapter),this.$results=this.results.render(),this.results.position(this.$results,this.$dropdown);var k=this;this._bindAdapters(),this._registerDomEvents(),this._registerDataEvents(),this._registerSelectionEvents(),this._registerDropdownEvents(),this._registerResultsEvents(),this._registerEvents(),this.dataAdapter.current(function(a){k.trigger("selection:update",{data:a})}),a.addClass("select2-hidden-accessible"),a.attr("aria-hidden","true"),this._syncAttributes(),a.data("select2",this)};return c.Extend(e,c.Observable),e.prototype._generateId=function(a){var b="";return b=null!=a.attr("id")?a.attr("id"):null!=a.attr("name")?a.attr("name")+"-"+c.generateChars(2):c.generateChars(4),b="select2-"+b},e.prototype._placeContainer=function(a){a.insertAfter(this.$element);var b=this._resolveWidth(this.$element,this.options.get("width"));null!=b&&a.css("width",b)},e.prototype._resolveWidth=function(a,b){var c=/^width:(([-+]?([0-9]*\.)?[0-9]+)(px|em|ex|%|in|cm|mm|pt|pc))/i;if("resolve"==b){var d=this._resolveWidth(a,"style");return null!=d?d:this._resolveWidth(a,"element")}if("element"==b){var e=a.outerWidth(!1);return 0>=e?"auto":e+"px"}if("style"==b){var f=a.attr("style");if("string"!=typeof f)return null;for(var g=f.split(";"),h=0,i=g.length;i>h;h+=1){var j=g[h].replace(/\s/g,""),k=j.match(c);if(null!==k&&k.length>=1)return k[1]}return null}return b},e.prototype._bindAdapters=function(){this.dataAdapter.bind(this,this.$container),this.selection.bind(this,this.$container),this.dropdown.bind(this,this.$container),this.results.bind(this,this.$container)},e.prototype._registerDomEvents=function(){var b=this;this.$element.on("change.select2",function(){b.dataAdapter.current(function(a){b.trigger("selection:update",{data:a})})}),this._sync=c.bind(this._syncAttributes,this),this.$element[0].attachEvent&&this.$element[0].attachEvent("onpropertychange",this._sync);var d=window.MutationObserver||window.WebKitMutationObserver||window.MozMutationObserver;null!=d?(this._observer=new d(function(c){a.each(c,b._sync)}),this._observer.observe(this.$element[0],{attributes:!0,subtree:!1})):this.$element[0].addEventListener&&this.$element[0].addEventListener("DOMAttrModified",b._sync,!1)},e.prototype._registerDataEvents=function(){var a=this;this.dataAdapter.on("*",function(b,c){a.trigger(b,c)})},e.prototype._registerSelectionEvents=function(){var b=this,c=["toggle"];this.selection.on("toggle",function(){b.toggleDropdown()}),this.selection.on("*",function(d,e){-1===a.inArray(d,c)&&b.trigger(d,e)})},e.prototype._registerDropdownEvents=function(){var a=this;this.dropdown.on("*",function(b,c){a.trigger(b,c)})},e.prototype._registerResultsEvents=function(){var a=this;this.results.on("*",function(b,c){a.trigger(b,c)})},e.prototype._registerEvents=function(){var a=this;this.on("open",function(){a.$container.addClass("select2-container--open")}),this.on("close",function(){a.$container.removeClass("select2-container--open")}),this.on("enable",function(){a.$container.removeClass("select2-container--disabled")}),this.on("disable",function(){a.$container.addClass("select2-container--disabled")}),this.on("focus",function(){a.$container.addClass("select2-container--focus")}),this.on("blur",function(){a.$container.removeClass("select2-container--focus")}),this.on("query",function(b){a.isOpen()||a.trigger("open"),this.dataAdapter.query(b,function(c){a.trigger("results:all",{data:c,query:b})})}),this.on("query:append",function(b){this.dataAdapter.query(b,function(c){a.trigger("results:append",{data:c,query:b})})}),this.on("keypress",function(b){var c=b.which;a.isOpen()?c===d.ENTER?(a.trigger("results:select"),b.preventDefault()):c===d.SPACE&&b.ctrlKey?(a.trigger("results:toggle"),b.preventDefault()):c===d.UP?(a.trigger("results:previous"),b.preventDefault()):c===d.DOWN?(a.trigger("results:next"),b.preventDefault()):(c===d.ESC||c===d.TAB)&&(a.close(),b.preventDefault()):(c===d.ENTER||c===d.SPACE||(c===d.DOWN||c===d.UP)&&b.altKey)&&(a.open(),b.preventDefault())})},e.prototype._syncAttributes=function(){this.options.set("disabled",this.$element.prop("disabled")),this.options.get("disabled")?(this.isOpen()&&this.close(),this.trigger("disable")):this.trigger("enable")},e.prototype.trigger=function(a,b){var c=e.__super__.trigger,d={open:"opening",close:"closing",select:"selecting",unselect:"unselecting"};if(a in d){var f=d[a],g={prevented:!1,name:a,args:b};if(c.call(this,f,g),g.prevented)return void(b.prevented=!0)}c.call(this,a,b)},e.prototype.toggleDropdown=function(){this.options.get("disabled")||(this.isOpen()?this.close():this.open())},e.prototype.open=function(){this.isOpen()||(this.trigger("query",{}),this.trigger("open"))},e.prototype.close=function(){this.isOpen()&&this.trigger("close")},e.prototype.isOpen=function(){return this.$container.hasClass("select2-container--open")},e.prototype.enable=function(a){this.options.get("debug")&&window.console&&console.warn&&console.warn('Select2: The `select2("enable")` method has been deprecated and will be removed in later Select2 versions. Use $element.prop("disabled") instead.'),(null==a||0===a.length)&&(a=[!0]);var b=!a[0];this.$element.prop("disabled",b)},e.prototype.data=function(){this.options.get("debug")&&arguments.length>0&&window.console&&console.warn&&console.warn('Select2: Data can no longer be set using `select2("data")`. You should consider setting the value instead using `$element.val()`.');var a=[];return this.dataAdapter.current(function(b){a=b}),a},e.prototype.val=function(b){if(this.options.get("debug")&&window.console&&console.warn&&console.warn('Select2: The `select2("val")` method has been deprecated and will be removed in later Select2 versions. Use $element.val() instead.'),null==b||0===b.length)return this.$element.val();var c=b[0];a.isArray(c)&&(c=a.map(c,function(a){return a.toString()})),this.$element.val(c).trigger("change")},e.prototype.destroy=function(){this.$container.remove(),this.$element[0].detachEvent&&this.$element[0].detachEvent("onpropertychange",this._sync),null!=this._observer?(this._observer.disconnect(),this._observer=null):this.$element[0].removeEventListener&&this.$element[0].removeEventListener("DOMAttrModified",this._sync,!1),this._sync=null,this.$element.off(".select2"),this.$element.attr("tabindex",this.$element.data("old-tabindex")),this.$element.removeClass("select2-hidden-accessible"),this.$element.attr("aria-hidden","false"),this.$element.removeData("select2"),this.dataAdapter.destroy(),this.selection.destroy(),this.dropdown.destroy(),this.results.destroy(),this.dataAdapter=null,this.selection=null,this.dropdown=null,this.results=null},e.prototype.render=function(){var b=a('<span class="select2 select2-container"><span class="selection"></span><span class="dropdown-wrapper" aria-hidden="true"></span></span>');return b.attr("dir",this.options.get("dir")),this.$container=b,this.$container.addClass("select2-container--"+this.options.get("theme")),b.data("element",this.$element),b},e}),b.define("jquery.select2",["jquery","require","./select2/core","./select2/defaults"],function(a,b,c,d){if(b("jquery.mousewheel"),null==a.fn.select2){var e=["open","close","destroy"];a.fn.select2=function(b){if(b=b||{},"object"==typeof b)return this.each(function(){{var d=a.extend({},b,!0);new c(a(this),d)}}),this;if("string"==typeof b){var d=this.data("select2");null==d&&window.console&&console.error&&console.error("The select2('"+b+"') method was called on an element that is not using Select2.");var f=Array.prototype.slice.call(arguments,1),g=d[b](f);return a.inArray(b,e)>-1?this:g}throw new Error("Invalid arguments for Select2: "+b)}}return null==a.fn.select2.defaults&&(a.fn.select2.defaults=d),c}),b.define("jquery.mousewheel",["jquery"],function(a){return a}),{define:b.define,require:b.require}}(),c=b.require("jquery.select2");return a.fn.select2.amd=b,c});
(function(a,b){if(typeof define==="function"&&define.amd){define(["moment","jquery","exports"],function(h,g,f){a.daterangepicker=b(a,f,h,g)})}else{if(typeof exports!=="undefined"){var d=require("moment");var e=(typeof window!="undefined")?window.jQuery:undefined;if(!e){try{e=require("jquery");if(!e.fn){e.fn={}}}catch(c){if(!e){throw new Error("jQuery dependency not found")}}}b(a,exports,d,e)}else{a.daterangepicker=b(a,{},a.moment||moment,(a.jQuery||a.Zepto||a.ender||a.$))}}}(this||{},function(b,c,e,d){var a=function(m,s,k){this.parentEl="body";this.element=d(m);this.startDate=e().startOf("day");this.endDate=e().endOf("day");this.minDate=false;this.maxDate=false;this.dateLimit=false;this.autoApply=false;this.singleDatePicker=false;this.showDropdowns=false;this.showWeekNumbers=false;this.timePicker=false;this.timePicker24Hour=false;this.timePickerIncrement=1;this.timePickerSeconds=false;this.linkedCalendars=true;this.autoUpdateInput=true;this.ranges={};this.opens="right";if(this.element.hasClass("pull-right")){this.opens="left"}this.drops="down";if(this.element.hasClass("dropup")){this.drops="up"}this.buttonClasses="btn btn-sm";this.applyClass="btn-success";this.cancelClass="btn-default";this.locale={format:"MM/DD/YYYY",separator:" - ",applyLabel:"Apply",cancelLabel:"Cancel",weekLabel:"W",customRangeLabel:"Custom Range",daysOfWeek:e.weekdaysMin(),monthNames:e.monthsShort(),firstDay:e.localeData().firstDayOfWeek()};this.callback=function(){};this.isShowing=false;this.leftCalendar={};this.rightCalendar={};if(typeof s!=="object"||s===null){s={}}s=d.extend(this.element.data(),s);if(typeof s.template!=="string"){s.template='<div class="daterangepicker dropdown-menu"><div class="calendar left"><div class="daterangepicker_input"><input class="input-mini" type="text" name="daterangepicker_start" value="" /><i class="fa fa-calendar glyphicon glyphicon-calendar"></i><div class="calendar-time"><div></div><i class="fa fa-clock-o glyphicon glyphicon-time"></i></div></div><div class="calendar-table"></div></div><div class="calendar right"><div class="daterangepicker_input"><input class="input-mini" type="text" name="daterangepicker_end" value="" /><i class="fa fa-calendar glyphicon glyphicon-calendar"></i><div class="calendar-time"><div></div><i class="fa fa-clock-o glyphicon glyphicon-time"></i></div></div><div class="calendar-table"></div></div><div class="ranges"><div class="range_inputs"><button class="applyBtn" disabled="disabled" type="button"></button> <button class="cancelBtn" type="button"></button></div></div></div>'}this.parentEl=(s.parentEl&&d(s.parentEl).length)?d(s.parentEl):d(this.parentEl);this.container=d(s.template).appendTo(this.parentEl);if(typeof s.locale==="object"){if(typeof s.locale.format==="string"){this.locale.format=s.locale.format}if(typeof s.locale.separator==="string"){this.locale.separator=s.locale.separator}if(typeof s.locale.daysOfWeek==="object"){this.locale.daysOfWeek=s.locale.daysOfWeek.slice()}if(typeof s.locale.monthNames==="object"){this.locale.monthNames=s.locale.monthNames.slice()}if(typeof s.locale.firstDay==="number"){this.locale.firstDay=s.locale.firstDay}if(typeof s.locale.applyLabel==="string"){this.locale.applyLabel=s.locale.applyLabel}if(typeof s.locale.cancelLabel==="string"){this.locale.cancelLabel=s.locale.cancelLabel}if(typeof s.locale.weekLabel==="string"){this.locale.weekLabel=s.locale.weekLabel}if(typeof s.locale.customRangeLabel==="string"){this.locale.customRangeLabel=s.locale.customRangeLabel}}if(typeof s.startDate==="string"){this.startDate=e(s.startDate,this.locale.format)}if(typeof s.endDate==="string"){this.endDate=e(s.endDate,this.locale.format)}if(typeof s.minDate==="string"){this.minDate=e(s.minDate,this.locale.format)}if(typeof s.maxDate==="string"){this.maxDate=e(s.maxDate,this.locale.format)}if(typeof s.startDate==="object"){this.startDate=e(s.startDate)}if(typeof s.endDate==="object"){this.endDate=e(s.endDate)}if(typeof s.minDate==="object"){this.minDate=e(s.minDate)}if(typeof s.maxDate==="object"){this.maxDate=e(s.maxDate)}if(this.minDate&&this.startDate.isBefore(this.minDate)){this.startDate=this.minDate.clone()}if(this.maxDate&&this.endDate.isAfter(this.maxDate)){this.endDate=this.maxDate.clone()}if(typeof s.applyClass==="string"){this.applyClass=s.applyClass}if(typeof s.cancelClass==="string"){this.cancelClass=s.cancelClass}if(typeof s.dateLimit==="object"){this.dateLimit=s.dateLimit}if(typeof s.opens==="string"){this.opens=s.opens}if(typeof s.drops==="string"){this.drops=s.drops}if(typeof s.showWeekNumbers==="boolean"){this.showWeekNumbers=s.showWeekNumbers}if(typeof s.buttonClasses==="string"){this.buttonClasses=s.buttonClasses}if(typeof s.buttonClasses==="object"){this.buttonClasses=s.buttonClasses.join(" ")}if(typeof s.showDropdowns==="boolean"){this.showDropdowns=s.showDropdowns}if(typeof s.singleDatePicker==="boolean"){this.singleDatePicker=s.singleDatePicker;if(this.singleDatePicker){this.endDate=this.startDate.clone()}}if(typeof s.timePicker==="boolean"){this.timePicker=s.timePicker}if(typeof s.timePickerSeconds==="boolean"){this.timePickerSeconds=s.timePickerSeconds}if(typeof s.timePickerIncrement==="number"){this.timePickerIncrement=s.timePickerIncrement}if(typeof s.timePicker24Hour==="boolean"){this.timePicker24Hour=s.timePicker24Hour}if(typeof s.autoApply==="boolean"){this.autoApply=s.autoApply}if(typeof s.autoUpdateInput==="boolean"){this.autoUpdateInput=s.autoUpdateInput}if(typeof s.linkedCalendars==="boolean"){this.linkedCalendars=s.linkedCalendars}if(typeof s.isInvalidDate==="function"){this.isInvalidDate=s.isInvalidDate}if(this.locale.firstDay!=0){var o=this.locale.firstDay;while(o>0){this.locale.daysOfWeek.push(this.locale.daysOfWeek.shift());o--}}var h,l,p;if(typeof s.startDate==="undefined"&&typeof s.endDate==="undefined"){if(d(this.element).is("input[type=text]")){var i=d(this.element).val(),r=i.split(this.locale.separator);h=l=null;if(r.length==2){h=e(r[0],this.locale.format);l=e(r[1],this.locale.format)}else{if(this.singleDatePicker&&i!==""){h=e(i,this.locale.format);l=e(i,this.locale.format)}}if(h!==null&&l!==null){this.setStartDate(h);this.setEndDate(l)}}}if(typeof s.ranges==="object"){for(p in s.ranges){if(typeof s.ranges[p][0]==="string"){h=e(s.ranges[p][0],this.locale.format)}else{h=e(s.ranges[p][0])}if(typeof s.ranges[p][1]==="string"){l=e(s.ranges[p][1],this.locale.format)}else{l=e(s.ranges[p][1])}if(this.minDate&&h.isBefore(this.minDate)){h=this.minDate.clone()}var g=this.maxDate;if(this.dateLimit&&h.clone().add(this.dateLimit).isAfter(g)){g=h.clone().add(this.dateLimit)}if(g&&l.isAfter(g)){l=g.clone()}if((this.minDate&&l.isBefore(this.minDate))||(g&&h.isAfter(g))){continue}var j=document.createElement("textarea");j.innerHTML=p;rangeHtml=j.value;this.ranges[rangeHtml]=[h,l]}var q="<ul>";for(p in this.ranges){q+="<li>"+p+"</li>"}q+="<li>"+this.locale.customRangeLabel+"</li>";q+="</ul>";this.container.find(".ranges").prepend(q)}if(typeof k==="function"){this.callback=k}if(!this.timePicker){this.startDate=this.startDate.startOf("day");this.endDate=this.endDate.endOf("day");this.container.find(".calendar-time").hide()}if(this.timePicker&&this.autoApply){this.autoApply=false}if(this.autoApply&&typeof s.ranges!=="object"){this.container.find(".ranges").hide()}else{if(this.autoApply){this.container.find(".applyBtn, .cancelBtn").addClass("hide")}}if(this.singleDatePicker){this.container.addClass("single");this.container.find(".calendar.left").addClass("single");this.container.find(".calendar.left").show();this.container.find(".calendar.right").hide();this.container.find(".daterangepicker_input input, .daterangepicker_input i").hide();if(!this.timePicker){this.container.find(".ranges").hide()}}if(typeof s.ranges==="undefined"&&!this.singleDatePicker){this.container.addClass("show-calendar")}this.container.addClass("opens"+this.opens);if(typeof s.ranges!=="undefined"&&this.opens=="right"){var f=this.container.find(".ranges");var n=f.clone();f.remove();this.container.find(".calendar.left").parent().prepend(n)}this.container.find(".applyBtn, .cancelBtn").addClass(this.buttonClasses);if(this.applyClass.length){this.container.find(".applyBtn").addClass(this.applyClass)}if(this.cancelClass.length){this.container.find(".cancelBtn").addClass(this.cancelClass)}this.container.find(".applyBtn").html(this.locale.applyLabel);this.container.find(".cancelBtn").html(this.locale.cancelLabel);this.container.find(".calendar").on("click.daterangepicker",".prev",d.proxy(this.clickPrev,this)).on("click.daterangepicker",".next",d.proxy(this.clickNext,this)).on("click.daterangepicker","td.available",d.proxy(this.clickDate,this)).on("mouseenter.daterangepicker","td.available",d.proxy(this.hoverDate,this)).on("mouseleave.daterangepicker","td.available",d.proxy(this.updateFormInputs,this)).on("change.daterangepicker","select.yearselect",d.proxy(this.monthOrYearChanged,this)).on("change.daterangepicker","select.monthselect",d.proxy(this.monthOrYearChanged,this)).on("change.daterangepicker","select.hourselect,select.minuteselect,select.secondselect,select.ampmselect",d.proxy(this.timeChanged,this)).on("click.daterangepicker",".daterangepicker_input input",d.proxy(this.showCalendars,this)).on("change.daterangepicker",".daterangepicker_input input",d.proxy(this.formInputsChanged,this));this.container.find(".ranges").on("click.daterangepicker","button.applyBtn",d.proxy(this.clickApply,this)).on("click.daterangepicker","button.cancelBtn",d.proxy(this.clickCancel,this)).on("click.daterangepicker","li",d.proxy(this.clickRange,this)).on("mouseenter.daterangepicker","li",d.proxy(this.hoverRange,this)).on("mouseleave.daterangepicker","li",d.proxy(this.updateFormInputs,this));if(this.element.is("input")){this.element.on({"click.daterangepicker":d.proxy(this.show,this),"focus.daterangepicker":d.proxy(this.show,this),"keyup.daterangepicker":d.proxy(this.elementChanged,this),"keydown.daterangepicker":d.proxy(this.keydown,this)})}else{this.element.on("click.daterangepicker",d.proxy(this.toggle,this))}if(this.element.is("input")&&!this.singleDatePicker&&this.autoUpdateInput){this.element.val(this.startDate.format(this.locale.format)+this.locale.separator+this.endDate.format(this.locale.format));this.element.trigger("change")}else{if(this.element.is("input")&&this.autoUpdateInput){this.element.val(this.startDate.format(this.locale.format));this.element.trigger("change")}}};a.prototype={constructor:a,setStartDate:function(f){if(typeof f==="string"){this.startDate=e(f,this.locale.format)}if(typeof f==="object"){this.startDate=e(f)}if(!this.timePicker){this.startDate=this.startDate.startOf("day")}if(this.timePicker&&this.timePickerIncrement){this.startDate.minute(Math.round(this.startDate.minute()/this.timePickerIncrement)*this.timePickerIncrement)}if(this.minDate&&this.startDate.isBefore(this.minDate)){this.startDate=this.minDate}if(this.maxDate&&this.startDate.isAfter(this.maxDate)){this.startDate=this.maxDate}if(!this.isShowing){this.updateElement()}this.updateMonthsInView()},setEndDate:function(f){if(typeof f==="string"){this.endDate=e(f,this.locale.format)}if(typeof f==="object"){this.endDate=e(f)}if(!this.timePicker){this.endDate=this.endDate.endOf("day")}if(this.timePicker&&this.timePickerIncrement){this.endDate.minute(Math.round(this.endDate.minute()/this.timePickerIncrement)*this.timePickerIncrement)}if(this.endDate.isBefore(this.startDate)){this.endDate=this.startDate.clone()}if(this.maxDate&&this.endDate.isAfter(this.maxDate)){this.endDate=this.maxDate}if(this.dateLimit&&this.startDate.clone().add(this.dateLimit).isBefore(this.endDate)){this.endDate=this.startDate.clone().add(this.dateLimit)}if(!this.isShowing){this.updateElement()}this.updateMonthsInView()},isInvalidDate:function(){return false},updateView:function(){if(this.timePicker){this.renderTimePicker("left");this.renderTimePicker("right");if(!this.endDate){this.container.find(".right .calendar-time select").attr("disabled","disabled").addClass("disabled")}else{this.container.find(".right .calendar-time select").removeAttr("disabled").removeClass("disabled")}}if(this.endDate){this.container.find('input[name="daterangepicker_end"]').removeClass("active");this.container.find('input[name="daterangepicker_start"]').addClass("active")}else{this.container.find('input[name="daterangepicker_end"]').addClass("active");this.container.find('input[name="daterangepicker_start"]').removeClass("active")}this.updateMonthsInView();this.updateCalendars();this.updateFormInputs()},updateMonthsInView:function(){if(this.endDate){if(!this.singleDatePicker&&this.leftCalendar.month&&this.rightCalendar.month&&(this.startDate.format("YYYY-MM")==this.leftCalendar.month.format("YYYY-MM")||this.startDate.format("YYYY-MM")==this.rightCalendar.month.format("YYYY-MM"))&&(this.endDate.format("YYYY-MM")==this.leftCalendar.month.format("YYYY-MM")||this.endDate.format("YYYY-MM")==this.rightCalendar.month.format("YYYY-MM"))){return}this.leftCalendar.month=this.startDate.clone().date(2);if(!this.linkedCalendars&&(this.endDate.month()!=this.startDate.month()||this.endDate.year()!=this.startDate.year())){this.rightCalendar.month=this.endDate.clone().date(2)}else{this.rightCalendar.month=this.startDate.clone().date(2).add(1,"month")}}else{if(this.leftCalendar.month.format("YYYY-MM")!=this.startDate.format("YYYY-MM")&&this.rightCalendar.month.format("YYYY-MM")!=this.startDate.format("YYYY-MM")){this.leftCalendar.month=this.startDate.clone().date(2);this.rightCalendar.month=this.startDate.clone().date(2).add(1,"month")}}},updateCalendars:function(){if(this.timePicker){var g,m,k;if(this.endDate){g=parseInt(this.container.find(".left .hourselect").val(),10);m=parseInt(this.container.find(".left .minuteselect").val(),10);k=this.timePickerSeconds?parseInt(this.container.find(".left .secondselect").val(),10):0;if(!this.timePicker24Hour){var j=this.container.find(".left .ampmselect").val();if(j==="PM"&&g<12){g+=12}if(j==="AM"&&g===12){g=0}}}else{g=parseInt(this.container.find(".right .hourselect").val(),10);m=parseInt(this.container.find(".right .minuteselect").val(),10);k=this.timePickerSeconds?parseInt(this.container.find(".right .secondselect").val(),10):0;if(!this.timePicker24Hour){var j=this.container.find(".left .ampmselect").val();if(j==="PM"&&g<12){g+=12}if(j==="AM"&&g===12){g=0}}}this.leftCalendar.month.hour(g).minute(m).second(k);this.rightCalendar.month.hour(g).minute(m).second(k)}this.renderCalendar("left");this.renderCalendar("right");this.container.find(".ranges li").removeClass("active");if(this.endDate==null){return}var f=true;var l=0;for(var h in this.ranges){if(this.timePicker){if(this.startDate.isSame(this.ranges[h][0])&&this.endDate.isSame(this.ranges[h][1])){f=false;this.chosenLabel=this.container.find(".ranges li:eq("+l+")").addClass("active").html();break}}else{if(this.startDate.format("YYYY-MM-DD")==this.ranges[h][0].format("YYYY-MM-DD")&&this.endDate.format("YYYY-MM-DD")==this.ranges[h][1].format("YYYY-MM-DD")){f=false;this.chosenLabel=this.container.find(".ranges li:eq("+l+")").addClass("active").html();break}}l++}if(f){this.chosenLabel=this.container.find(".ranges li:last").addClass("active").html();this.showCalendars()}},renderCalendar:function(A){var P=A=="left"?this.leftCalendar:this.rightCalendar;var g=P.month.month();var h=P.month.year();var C=P.month.hour();var q=P.month.minute();var F=P.month.second();var k=e([h,g]).daysInMonth();var B=e([h,g,1]);var L=e([h,g,k]);var I=e(B).subtract(1,"month").month();var v=e(B).subtract(1,"month").year();var z=e([v,I]).daysInMonth();var t=B.day();var P=[];P.firstDay=B;P.lastDay=L;for(var R=0;R<6;R++){P[R]=[]}var T=z-t+this.locale.firstDay+1;if(T>z){T-=7}if(t==this.locale.firstDay){T=z-6}var p=e([v,I,T,12,q,F]);var n,w;for(var R=0,n=0,w=0;R<42;R++,n++,p=e(p).add(24,"hour")){if(R>0&&n%7===0){n=0;w++}P[w][n]=p.clone().hour(C).minute(q).second(F);p.hour(12);if(this.minDate&&P[w][n].format("YYYY-MM-DD")==this.minDate.format("YYYY-MM-DD")&&P[w][n].isBefore(this.minDate)&&A=="left"){P[w][n]=this.minDate.clone()}if(this.maxDate&&P[w][n].format("YYYY-MM-DD")==this.maxDate.format("YYYY-MM-DD")&&P[w][n].isAfter(this.maxDate)&&A=="right"){P[w][n]=this.maxDate.clone()}}if(A=="left"){this.leftCalendar.calendar=P}else{this.rightCalendar.calendar=P}var j=A=="left"?this.minDate:this.startDate;var s=this.maxDate;var G=A=="left"?this.startDate:this.endDate;var H='<table class="table-condensed">';H+="<thead>";H+="<tr>";if(this.showWeekNumbers){H+="<th></th>"}if((!j||j.isBefore(P.firstDay))&&(!this.linkedCalendars||A=="left")){H+='<th class="prev available"><i class="fa fa-chevron-left glyphicon glyphicon-chevron-left"></i></th>'}else{H+="<th></th>"}var M=this.locale.monthNames[P[1][1].month()]+P[1][1].format(" YYYY");if(this.showDropdowns){var E=P[1][1].month();var u=P[1][1].year();var D=(s&&s.year())||(u+5);var x=(j&&j.year())||(u-50);var K=u==x;var O=u==D;var r='<select class="monthselect">';for(var Q=0;Q<12;Q++){if((!K||Q>=j.month())&&(!O||Q<=s.month())){r+="<option value='"+Q+"'"+(Q===E?" selected='selected'":"")+">"+this.locale.monthNames[Q]+"</option>"}else{r+="<option value='"+Q+"'"+(Q===E?" selected='selected'":"")+" disabled='disabled'>"+this.locale.monthNames[Q]+"</option>"}}r+="</select>";var f='<select class="yearselect">';for(var N=x;N<=D;N++){f+='<option value="'+N+'"'+(N===u?' selected="selected"':"")+">"+N+"</option>"}f+="</select>";M=r+f}H+='<th colspan="5" class="month">'+M+"</th>";if((!s||s.isAfter(P.lastDay))&&(!this.linkedCalendars||A=="right"||this.singleDatePicker)){H+='<th class="next available"><i class="fa fa-chevron-right glyphicon glyphicon-chevron-right"></i></th>'}else{H+="<th></th>"}H+="</tr>";H+="<tr>";if(this.showWeekNumbers){H+='<th class="week">'+this.locale.weekLabel+"</th>"}d.each(this.locale.daysOfWeek,function(m,i){H+="<th>"+i+"</th>"});H+="</tr>";H+="</thead>";H+="<tbody>";if(this.endDate==null&&this.dateLimit){var S=this.startDate.clone().add(this.dateLimit).endOf("day");if(!s||S.isBefore(s)){s=S}}for(var w=0;w<6;w++){H+="<tr>";if(this.showWeekNumbers){H+='<td class="week">'+P[w][0].week()+"</td>"}for(var n=0;n<7;n++){var l=[];if(P[w][n].isSame(new Date(),"day")){l.push("today")}if(P[w][n].isoWeekday()>5){l.push("weekend")}if(P[w][n].month()!=P[1][1].month()){l.push("off")}if(this.minDate&&P[w][n].isBefore(this.minDate,"day")){l.push("off","disabled")}if(s&&P[w][n].isAfter(s,"day")){l.push("off","disabled")}if(this.isInvalidDate(P[w][n])){l.push("off","disabled")}if(P[w][n].format("YYYY-MM-DD")==this.startDate.format("YYYY-MM-DD")){l.push("active","start-date")}if(this.endDate!=null&&P[w][n].format("YYYY-MM-DD")==this.endDate.format("YYYY-MM-DD")){l.push("active","end-date")}if(this.endDate!=null&&P[w][n]>this.startDate&&P[w][n]<this.endDate){l.push("in-range")}var o="",J=false;for(var R=0;R<l.length;R++){o+=l[R]+" ";if(l[R]=="disabled"){J=true}}if(!J){o+="available"}H+='<td class="'+o.replace(/^\s+|\s+$/g,"")+'" data-title="r'+w+"c"+n+'">'+P[w][n].date()+"</td>"}H+="</tr>"}H+="</tbody>";H+="</table>";this.container.find(".calendar."+A+" .calendar-table").html(H)},renderTimePicker:function(t){var s,q,p,g=this.maxDate;if(this.dateLimit&&(!this.maxDate||this.startDate.clone().add(this.dateLimit).isAfter(this.maxDate))){g=this.startDate.clone().add(this.dateLimit)}if(t=="left"){q=this.startDate.clone();p=this.minDate}else{if(t=="right"){q=this.endDate?this.endDate.clone():this.startDate.clone();p=this.startDate}}s='<select class="hourselect">';var h=this.timePicker24Hour?0:1;var n=this.timePicker24Hour?23:12;for(var r=h;r<=n;r++){var j=r;if(!this.timePicker24Hour){j=q.hour()>=12?(r==12?12:r+12):(r==12?0:r)}var l=q.clone().hour(j);var o=false;if(p&&l.minute(59).isBefore(p)){o=true}if(g&&l.minute(0).isAfter(g)){o=true}if(j==q.hour()&&!o){s+='<option value="'+r+'" selected="selected">'+r+"</option>"}else{if(o){s+='<option value="'+r+'" disabled="disabled" class="disabled">'+r+"</option>"}else{s+='<option value="'+r+'">'+r+"</option>"}}}s+="</select> ";s+=': <select class="minuteselect">';for(var r=0;r<60;r+=this.timePickerIncrement){var f=r<10?"0"+r:r;var l=q.clone().minute(r);var o=false;if(p&&l.second(59).isBefore(p)){o=true}if(g&&l.second(0).isAfter(g)){o=true}if(q.minute()==r&&!o){s+='<option value="'+r+'" selected="selected">'+f+"</option>"}else{if(o){s+='<option value="'+r+'" disabled="disabled" class="disabled">'+f+"</option>"}else{s+='<option value="'+r+'">'+f+"</option>"}}}s+="</select> ";if(this.timePickerSeconds){s+=': <select class="secondselect">';for(var r=0;r<60;r++){var f=r<10?"0"+r:r;var l=q.clone().second(r);var o=false;if(p&&l.isBefore(p)){o=true}if(g&&l.isAfter(g)){o=true}if(q.second()==r&&!o){s+='<option value="'+r+'" selected="selected">'+f+"</option>"}else{if(o){s+='<option value="'+r+'" disabled="disabled" class="disabled">'+f+"</option>"}else{s+='<option value="'+r+'">'+f+"</option>"}}}s+="</select> "}if(!this.timePicker24Hour){s+='<select class="ampmselect">';var k="";var m="";if(p&&q.clone().hour(12).minute(0).second(0).isBefore(p)){k=' disabled="disabled" class="disabled"'}if(g&&q.clone().hour(0).minute(0).second(0).isAfter(g)){m=' disabled="disabled" class="disabled"'}if(q.hour()>=12){s+='<option value="AM"'+k+'>AM</option><option value="PM" selected="selected"'+m+">PM</option>"}else{s+='<option value="AM" selected="selected"'+k+'>AM</option><option value="PM"'+m+">PM</option>"}s+="</select>"}this.container.find(".calendar."+t+" .calendar-time div").html(s)},updateFormInputs:function(){if(this.container.find("input[name=daterangepicker_start]").is(":focus")||this.container.find("input[name=daterangepicker_end]").is(":focus")){return}this.container.find("input[name=daterangepicker_start]").val(this.startDate.format(this.locale.format));if(this.endDate){this.container.find("input[name=daterangepicker_end]").val(this.endDate.format(this.locale.format))}if(this.singleDatePicker||(this.endDate&&(this.startDate.isBefore(this.endDate)||this.startDate.isSame(this.endDate)))){this.container.find("button.applyBtn").removeAttr("disabled")}else{this.container.find("button.applyBtn").attr("disabled","disabled")}},move:function(){var f={top:0,left:0},h;var g=d(window).width();if(!this.parentEl.is("body")){f={top:this.parentEl.offset().top-this.parentEl.scrollTop(),left:this.parentEl.offset().left-this.parentEl.scrollLeft()};g=this.parentEl[0].clientWidth+this.parentEl.offset().left}if(this.drops=="up"){h=this.element.offset().top-this.container.outerHeight()-f.top}else{h=this.element.offset().top+this.element.outerHeight()-f.top}this.container[this.drops=="up"?"addClass":"removeClass"]("dropup");if(this.opens=="left"){this.container.css({top:h,right:g-this.element.offset().left-this.element.outerWidth(),left:"auto"});if(this.container.offset().left<0){this.container.css({right:"auto",left:9})}}else{if(this.opens=="center"){this.container.css({top:h,left:this.element.offset().left-f.left+this.element.outerWidth()/2-this.container.outerWidth()/2,right:"auto"});if(this.container.offset().left<0){this.container.css({right:"auto",left:9})}}else{this.container.css({top:h,left:this.element.offset().left-f.left,right:"auto"});if(this.container.offset().left+this.container.outerWidth()>d(window).width()){this.container.css({left:"auto",right:0})}}}},show:function(f){if(this.isShowing){return}this._outsideClickProxy=d.proxy(function(g){this.outsideClick(g)},this);d(document).on("mousedown.daterangepicker",this._outsideClickProxy).on("touchend.daterangepicker",this._outsideClickProxy).on("click.daterangepicker","[data-toggle=dropdown]",this._outsideClickProxy).on("focusin.daterangepicker",this._outsideClickProxy);d(window).on("resize.daterangepicker",d.proxy(function(g){this.move(g)},this));this.oldStartDate=this.startDate.clone();this.oldEndDate=this.endDate.clone();this.updateView();this.container.show();this.move();this.element.trigger("show.daterangepicker",this);this.isShowing=true},hide:function(f){if(!this.isShowing){return}if(!this.endDate){this.startDate=this.oldStartDate.clone();this.endDate=this.oldEndDate.clone()}if(!this.startDate.isSame(this.oldStartDate)||!this.endDate.isSame(this.oldEndDate)){this.callback(this.startDate,this.endDate,this.chosenLabel)}this.updateElement();d(document).off(".daterangepicker");d(window).off(".daterangepicker");this.container.hide();this.element.trigger("hide.daterangepicker",this);this.isShowing=false},toggle:function(f){if(this.isShowing){this.hide()}else{this.show()}},outsideClick:function(g){var f=d(g.target);if(g.type=="focusin"||f.closest(this.element).length||f.closest(this.container).length||f.closest(".calendar-table").length){return}this.hide()},showCalendars:function(){this.container.addClass("show-calendar");this.move();this.element.trigger("showCalendar.daterangepicker",this)},hideCalendars:function(){this.container.removeClass("show-calendar");this.element.trigger("hideCalendar.daterangepicker",this)},hoverRange:function(h){if(this.container.find("input[name=daterangepicker_start]").is(":focus")||this.container.find("input[name=daterangepicker_end]").is(":focus")){return}var f=h.target.innerHTML;if(f==this.locale.customRangeLabel){this.updateView()}else{var g=this.ranges[f];this.container.find("input[name=daterangepicker_start]").val(g[0].format(this.locale.format));this.container.find("input[name=daterangepicker_end]").val(g[1].format(this.locale.format))}},clickRange:function(h){var f=h.target.innerHTML;this.chosenLabel=f;if(f==this.locale.customRangeLabel){this.showCalendars()}else{var g=this.ranges[f];this.startDate=g[0];this.endDate=g[1];if(!this.timePicker){this.startDate.startOf("day");this.endDate.endOf("day")}this.hideCalendars();this.clickApply()}},clickPrev:function(g){var f=d(g.target).parents(".calendar");if(f.hasClass("left")){this.leftCalendar.month.subtract(1,"month");if(this.linkedCalendars){this.rightCalendar.month.subtract(1,"month")}}else{this.rightCalendar.month.subtract(1,"month")}this.updateCalendars()},clickNext:function(g){var f=d(g.target).parents(".calendar");if(f.hasClass("left")){this.leftCalendar.month.add(1,"month")}else{this.rightCalendar.month.add(1,"month");if(this.linkedCalendars){this.leftCalendar.month.add(1,"month")}}this.updateCalendars()},hoverDate:function(k){if(this.container.find("input[name=daterangepicker_start]").is(":focus")||this.container.find("input[name=daterangepicker_end]").is(":focus")){return}if(!d(k.target).hasClass("available")){return}var m=d(k.target).attr("data-title");var n=m.substr(1,1);var h=m.substr(3,1);var f=d(k.target).parents(".calendar");var i=f.hasClass("left")?this.leftCalendar.calendar[n][h]:this.rightCalendar.calendar[n][h];if(this.endDate){this.container.find("input[name=daterangepicker_start]").val(i.format(this.locale.format))}else{this.container.find("input[name=daterangepicker_end]").val(i.format(this.locale.format))}var j=this.leftCalendar;var l=this.rightCalendar;var g=this.startDate;if(!this.endDate){this.container.find(".calendar td").each(function(p,q){if(d(q).hasClass("week")){return}var u=d(q).attr("data-title");var t=u.substr(1,1);var o=u.substr(3,1);var s=d(q).parents(".calendar");var r=s.hasClass("left")?j.calendar[t][o]:l.calendar[t][o];if(r.isAfter(g)&&r.isBefore(i)){d(q).addClass("in-range")}else{d(q).removeClass("in-range")}})}},clickDate:function(l){if(!d(l.target).hasClass("available")){return}var n=d(l.target).attr("data-title");var o=n.substr(1,1);var h=n.substr(3,1);var f=d(l.target).parents(".calendar");var i=f.hasClass("left")?this.leftCalendar.calendar[o][h]:this.rightCalendar.calendar[o][h];if(this.endDate||i.isBefore(this.startDate)){if(this.timePicker){var k=parseInt(this.container.find(".left .hourselect").val(),10);if(!this.timePicker24Hour){var m=f.find(".ampmselect").val();if(m==="PM"&&k<12){k+=12}if(m==="AM"&&k===12){k=0}}var j=parseInt(this.container.find(".left .minuteselect").val(),10);var g=this.timePickerSeconds?parseInt(this.container.find(".left .secondselect").val(),10):0;i=i.clone().hour(k).minute(j).second(g)}this.endDate=null;this.setStartDate(i.clone())}else{if(this.timePicker){var k=parseInt(this.container.find(".right .hourselect").val(),10);if(!this.timePicker24Hour){var m=this.container.find(".right .ampmselect").val();if(m==="PM"&&k<12){k+=12}if(m==="AM"&&k===12){k=0}}var j=parseInt(this.container.find(".right .minuteselect").val(),10);var g=this.timePickerSeconds?parseInt(this.container.find(".right .secondselect").val(),10):0;i=i.clone().hour(k).minute(j).second(g)}this.setEndDate(i.clone());if(this.autoApply){this.clickApply()}}if(this.singleDatePicker){this.setEndDate(this.startDate);if(!this.timePicker){this.clickApply()}}this.updateView()},clickApply:function(f){this.hide();this.element.trigger("apply.daterangepicker",this)},clickCancel:function(f){this.startDate=this.oldStartDate;this.endDate=this.oldEndDate;this.hide();this.element.trigger("cancel.daterangepicker",this)},monthOrYearChanged:function(i){var k=d(i.target).closest(".calendar").hasClass("left"),j=k?"left":"right",h=this.container.find(".calendar."+j);var g=parseInt(h.find(".monthselect").val(),10);var f=h.find(".yearselect").val();if(!k){if(f<this.startDate.year()||(f==this.startDate.year()&&g<this.startDate.month())){g=this.startDate.month();f=this.startDate.year()}}if(this.minDate){if(f<this.minDate.year()||(f==this.minDate.year()&&g<this.minDate.month())){g=this.minDate.month();f=this.minDate.year()}}if(this.maxDate){if(f>this.maxDate.year()||(f==this.maxDate.year()&&g>this.maxDate.month())){g=this.maxDate.month();f=this.maxDate.year()}}if(k){this.leftCalendar.month.month(g).year(f);if(this.linkedCalendars){this.rightCalendar.month=this.leftCalendar.month.clone().add(1,"month")}}else{this.rightCalendar.month.month(g).year(f);if(this.linkedCalendars){this.leftCalendar.month=this.rightCalendar.month.clone().subtract(1,"month")}}this.updateCalendars()},timeChanged:function(l){var f=d(l.target).closest(".calendar"),n=f.hasClass("left");var k=parseInt(f.find(".hourselect").val(),10);var i=parseInt(f.find(".minuteselect").val(),10);var h=this.timePickerSeconds?parseInt(f.find(".secondselect").val(),10):0;if(!this.timePicker24Hour){var m=f.find(".ampmselect").val();if(m==="PM"&&k<12){k+=12}if(m==="AM"&&k===12){k=0}}if(n){var g=this.startDate.clone();g.hour(k);g.minute(i);g.second(h);this.setStartDate(g);if(this.singleDatePicker){this.endDate=this.startDate.clone()}else{if(this.endDate&&this.endDate.format("YYYY-MM-DD")==g.format("YYYY-MM-DD")&&this.endDate.isBefore(g)){this.setEndDate(g.clone())}}}else{if(this.endDate){var j=this.endDate.clone();j.hour(k);j.minute(i);j.second(h);this.setEndDate(j)}}this.updateCalendars();this.updateFormInputs();this.renderTimePicker("left");this.renderTimePicker("right")},formInputsChanged:function(h){var g=d(h.target).closest(".calendar").hasClass("right");var i=e(this.container.find('input[name="daterangepicker_start"]').val(),this.locale.format);var f=e(this.container.find('input[name="daterangepicker_end"]').val(),this.locale.format);if(i.isValid()&&f.isValid()){if(g&&f.isBefore(i)){i=f.clone()}this.setStartDate(i);this.setEndDate(f);if(g){this.container.find('input[name="daterangepicker_start"]').val(this.startDate.format(this.locale.format))}else{this.container.find('input[name="daterangepicker_end"]').val(this.endDate.format(this.locale.format))}}this.updateCalendars();if(this.timePicker){this.renderTimePicker("left");this.renderTimePicker("right")}},elementChanged:function(){if(!this.element.is("input")){return}if(!this.element.val().length){return}if(this.element.val().length<this.locale.format.length){return}var g=this.element.val().split(this.locale.separator),h=null,f=null;if(g.length===2){h=e(g[0],this.locale.format);f=e(g[1],this.locale.format)}if(this.singleDatePicker||h===null||f===null){h=e(this.element.val(),this.locale.format);f=h}if(!h.isValid()||!f.isValid()){return}this.setStartDate(h);this.setEndDate(f);this.updateView()},keydown:function(f){if((f.keyCode===9)||(f.keyCode===13)){this.hide()}},updateElement:function(){if(this.element.is("input")&&!this.singleDatePicker&&this.autoUpdateInput){this.element.val(this.startDate.format(this.locale.format)+this.locale.separator+this.endDate.format(this.locale.format));this.element.trigger("change")}else{if(this.element.is("input")&&this.autoUpdateInput){this.element.val(this.startDate.format(this.locale.format));this.element.trigger("change")}}},remove:function(){this.container.remove();this.element.off(".daterangepicker");this.element.removeData()}};d.fn.daterangepicker=function(f,g){this.each(function(){var h=d(this);if(h.data("daterangepicker")){h.data("daterangepicker").remove()}h.data("daterangepicker",new a(h,f,g))});return this}}));
/*!
 * Chart.js
 * http://chartjs.org/
 * Version: 2.1.6
 *
 * Copyright 2016 Nick Downie
 * Released under the MIT license
 * https://github.com/chartjs/Chart.js/blob/master/LICENSE.md
 */
!function(t){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=t();else if("function"==typeof define&&define.amd)define([],t);else{var e;e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:this,e.Chart=t()}}(function(){return function t(e,a,i){function n(r,l){if(!a[r]){if(!e[r]){var s="function"==typeof require&&require;if(!l&&s)return s(r,!0);if(o)return o(r,!0);var d=new Error("Cannot find module '"+r+"'");throw d.code="MODULE_NOT_FOUND",d}var u=a[r]={exports:{}};e[r][0].call(u.exports,function(t){var a=e[r][1][t];return n(a?a:t)},u,u.exports,t,e,a,i)}return a[r].exports}for(var o="function"==typeof require&&require,r=0;r<i.length;r++)n(i[r]);return n}({1:[function(t,e,a){},{}],2:[function(t,e,a){function i(t){if(t){var e=/^#([a-fA-F0-9]{3})$/,a=/^#([a-fA-F0-9]{6})$/,i=/^rgba?\(\s*([+-]?\d+)\s*,\s*([+-]?\d+)\s*,\s*([+-]?\d+)\s*(?:,\s*([+-]?[\d\.]+)\s*)?\)$/,n=/^rgba?\(\s*([+-]?[\d\.]+)\%\s*,\s*([+-]?[\d\.]+)\%\s*,\s*([+-]?[\d\.]+)\%\s*(?:,\s*([+-]?[\d\.]+)\s*)?\)$/,o=/(\w+)/,r=[0,0,0],l=1,s=t.match(e);if(s){s=s[1];for(var d=0;d<r.length;d++)r[d]=parseInt(s[d]+s[d],16)}else if(s=t.match(a)){s=s[1];for(var d=0;d<r.length;d++)r[d]=parseInt(s.slice(2*d,2*d+2),16)}else if(s=t.match(i)){for(var d=0;d<r.length;d++)r[d]=parseInt(s[d+1]);l=parseFloat(s[4])}else if(s=t.match(n)){for(var d=0;d<r.length;d++)r[d]=Math.round(2.55*parseFloat(s[d+1]));l=parseFloat(s[4])}else if(s=t.match(o)){if("transparent"==s[1])return[0,0,0,0];if(r=y[s[1]],!r)return}for(var d=0;d<r.length;d++)r[d]=v(r[d],0,255);return l=l||0==l?v(l,0,1):1,r[3]=l,r}}function n(t){if(t){var e=/^hsla?\(\s*([+-]?\d+)(?:deg)?\s*,\s*([+-]?[\d\.]+)%\s*,\s*([+-]?[\d\.]+)%\s*(?:,\s*([+-]?[\d\.]+)\s*)?\)/,a=t.match(e);if(a){var i=parseFloat(a[4]),n=v(parseInt(a[1]),0,360),o=v(parseFloat(a[2]),0,100),r=v(parseFloat(a[3]),0,100),l=v(isNaN(i)?1:i,0,1);return[n,o,r,l]}}}function o(t){if(t){var e=/^hwb\(\s*([+-]?\d+)(?:deg)?\s*,\s*([+-]?[\d\.]+)%\s*,\s*([+-]?[\d\.]+)%\s*(?:,\s*([+-]?[\d\.]+)\s*)?\)/,a=t.match(e);if(a){var i=parseFloat(a[4]),n=v(parseInt(a[1]),0,360),o=v(parseFloat(a[2]),0,100),r=v(parseFloat(a[3]),0,100),l=v(isNaN(i)?1:i,0,1);return[n,o,r,l]}}}function r(t){var e=i(t);return e&&e.slice(0,3)}function l(t){var e=n(t);return e&&e.slice(0,3)}function s(t){var e=i(t);return e?e[3]:(e=n(t))?e[3]:(e=o(t))?e[3]:void 0}function d(t){return"#"+x(t[0])+x(t[1])+x(t[2])}function u(t,e){return 1>e||t[3]&&t[3]<1?c(t,e):"rgb("+t[0]+", "+t[1]+", "+t[2]+")"}function c(t,e){return void 0===e&&(e=void 0!==t[3]?t[3]:1),"rgba("+t[0]+", "+t[1]+", "+t[2]+", "+e+")"}function h(t,e){if(1>e||t[3]&&t[3]<1)return f(t,e);var a=Math.round(t[0]/255*100),i=Math.round(t[1]/255*100),n=Math.round(t[2]/255*100);return"rgb("+a+"%, "+i+"%, "+n+"%)"}function f(t,e){var a=Math.round(t[0]/255*100),i=Math.round(t[1]/255*100),n=Math.round(t[2]/255*100);return"rgba("+a+"%, "+i+"%, "+n+"%, "+(e||t[3]||1)+")"}function g(t,e){return 1>e||t[3]&&t[3]<1?p(t,e):"hsl("+t[0]+", "+t[1]+"%, "+t[2]+"%)"}function p(t,e){return void 0===e&&(e=void 0!==t[3]?t[3]:1),"hsla("+t[0]+", "+t[1]+"%, "+t[2]+"%, "+e+")"}function m(t,e){return void 0===e&&(e=void 0!==t[3]?t[3]:1),"hwb("+t[0]+", "+t[1]+"%, "+t[2]+"%"+(void 0!==e&&1!==e?", "+e:"")+")"}function b(t){return k[t.slice(0,3)]}function v(t,e,a){return Math.min(Math.max(e,t),a)}function x(t){var e=t.toString(16).toUpperCase();return e.length<2?"0"+e:e}var y=t(6);e.exports={getRgba:i,getHsla:n,getRgb:r,getHsl:l,getHwb:o,getAlpha:s,hexString:d,rgbString:u,rgbaString:c,percentString:h,percentaString:f,hslString:g,hslaString:p,hwbString:m,keyword:b};var k={};for(var S in y)k[y[S]]=S},{6:6}],3:[function(t,e,a){var i=t(5),n=t(2),o=function(t){if(t instanceof o)return t;if(!(this instanceof o))return new o(t);this.values={rgb:[0,0,0],hsl:[0,0,0],hsv:[0,0,0],hwb:[0,0,0],cmyk:[0,0,0,0],alpha:1};var e;if("string"==typeof t)if(e=n.getRgba(t))this.setValues("rgb",e);else if(e=n.getHsla(t))this.setValues("hsl",e);else{if(!(e=n.getHwb(t)))throw new Error('Unable to parse color from string "'+t+'"');this.setValues("hwb",e)}else if("object"==typeof t)if(e=t,void 0!==e.r||void 0!==e.red)this.setValues("rgb",e);else if(void 0!==e.l||void 0!==e.lightness)this.setValues("hsl",e);else if(void 0!==e.v||void 0!==e.value)this.setValues("hsv",e);else if(void 0!==e.w||void 0!==e.whiteness)this.setValues("hwb",e);else{if(void 0===e.c&&void 0===e.cyan)throw new Error("Unable to parse color from object "+JSON.stringify(t));this.setValues("cmyk",e)}};o.prototype={rgb:function(){return this.setSpace("rgb",arguments)},hsl:function(){return this.setSpace("hsl",arguments)},hsv:function(){return this.setSpace("hsv",arguments)},hwb:function(){return this.setSpace("hwb",arguments)},cmyk:function(){return this.setSpace("cmyk",arguments)},rgbArray:function(){return this.values.rgb},hslArray:function(){return this.values.hsl},hsvArray:function(){return this.values.hsv},hwbArray:function(){var t=this.values;return 1!==t.alpha?t.hwb.concat([t.alpha]):t.hwb},cmykArray:function(){return this.values.cmyk},rgbaArray:function(){var t=this.values;return t.rgb.concat([t.alpha])},hslaArray:function(){var t=this.values;return t.hsl.concat([t.alpha])},alpha:function(t){return void 0===t?this.values.alpha:(this.setValues("alpha",t),this)},red:function(t){return this.setChannel("rgb",0,t)},green:function(t){return this.setChannel("rgb",1,t)},blue:function(t){return this.setChannel("rgb",2,t)},hue:function(t){return t&&(t%=360,t=0>t?360+t:t),this.setChannel("hsl",0,t)},saturation:function(t){return this.setChannel("hsl",1,t)},lightness:function(t){return this.setChannel("hsl",2,t)},saturationv:function(t){return this.setChannel("hsv",1,t)},whiteness:function(t){return this.setChannel("hwb",1,t)},blackness:function(t){return this.setChannel("hwb",2,t)},value:function(t){return this.setChannel("hsv",2,t)},cyan:function(t){return this.setChannel("cmyk",0,t)},magenta:function(t){return this.setChannel("cmyk",1,t)},yellow:function(t){return this.setChannel("cmyk",2,t)},black:function(t){return this.setChannel("cmyk",3,t)},hexString:function(){return n.hexString(this.values.rgb)},rgbString:function(){return n.rgbString(this.values.rgb,this.values.alpha)},rgbaString:function(){return n.rgbaString(this.values.rgb,this.values.alpha)},percentString:function(){return n.percentString(this.values.rgb,this.values.alpha)},hslString:function(){return n.hslString(this.values.hsl,this.values.alpha)},hslaString:function(){return n.hslaString(this.values.hsl,this.values.alpha)},hwbString:function(){return n.hwbString(this.values.hwb,this.values.alpha)},keyword:function(){return n.keyword(this.values.rgb,this.values.alpha)},rgbNumber:function(){var t=this.values.rgb;return t[0]<<16|t[1]<<8|t[2]},luminosity:function(){for(var t=this.values.rgb,e=[],a=0;a<t.length;a++){var i=t[a]/255;e[a]=.03928>=i?i/12.92:Math.pow((i+.055)/1.055,2.4)}return.2126*e[0]+.7152*e[1]+.0722*e[2]},contrast:function(t){var e=this.luminosity(),a=t.luminosity();return e>a?(e+.05)/(a+.05):(a+.05)/(e+.05)},level:function(t){var e=this.contrast(t);return e>=7.1?"AAA":e>=4.5?"AA":""},dark:function(){var t=this.values.rgb,e=(299*t[0]+587*t[1]+114*t[2])/1e3;return 128>e},light:function(){return!this.dark()},negate:function(){for(var t=[],e=0;3>e;e++)t[e]=255-this.values.rgb[e];return this.setValues("rgb",t),this},lighten:function(t){var e=this.values.hsl;return e[2]+=e[2]*t,this.setValues("hsl",e),this},darken:function(t){var e=this.values.hsl;return e[2]-=e[2]*t,this.setValues("hsl",e),this},saturate:function(t){var e=this.values.hsl;return e[1]+=e[1]*t,this.setValues("hsl",e),this},desaturate:function(t){var e=this.values.hsl;return e[1]-=e[1]*t,this.setValues("hsl",e),this},whiten:function(t){var e=this.values.hwb;return e[1]+=e[1]*t,this.setValues("hwb",e),this},blacken:function(t){var e=this.values.hwb;return e[2]+=e[2]*t,this.setValues("hwb",e),this},greyscale:function(){var t=this.values.rgb,e=.3*t[0]+.59*t[1]+.11*t[2];return this.setValues("rgb",[e,e,e]),this},clearer:function(t){var e=this.values.alpha;return this.setValues("alpha",e-e*t),this},opaquer:function(t){var e=this.values.alpha;return this.setValues("alpha",e+e*t),this},rotate:function(t){var e=this.values.hsl,a=(e[0]+t)%360;return e[0]=0>a?360+a:a,this.setValues("hsl",e),this},mix:function(t,e){var a=this,i=t,n=void 0===e?.5:e,o=2*n-1,r=a.alpha()-i.alpha(),l=((o*r===-1?o:(o+r)/(1+o*r))+1)/2,s=1-l;return this.rgb(l*a.red()+s*i.red(),l*a.green()+s*i.green(),l*a.blue()+s*i.blue()).alpha(a.alpha()*n+i.alpha()*(1-n))},toJSON:function(){return this.rgb()},clone:function(){var t,e,a=new o,i=this.values,n=a.values;for(var r in i)i.hasOwnProperty(r)&&(t=i[r],e={}.toString.call(t),"[object Array]"===e?n[r]=t.slice(0):"[object Number]"===e?n[r]=t:console.error("unexpected color value:",t));return a}},o.prototype.spaces={rgb:["red","green","blue"],hsl:["hue","saturation","lightness"],hsv:["hue","saturation","value"],hwb:["hue","whiteness","blackness"],cmyk:["cyan","magenta","yellow","black"]},o.prototype.maxes={rgb:[255,255,255],hsl:[360,100,100],hsv:[360,100,100],hwb:[360,100,100],cmyk:[100,100,100,100]},o.prototype.getValues=function(t){for(var e=this.values,a={},i=0;i<t.length;i++)a[t.charAt(i)]=e[t][i];return 1!==e.alpha&&(a.a=e.alpha),a},o.prototype.setValues=function(t,e){var a,n=this.values,o=this.spaces,r=this.maxes,l=1;if("alpha"===t)l=e;else if(e.length)n[t]=e.slice(0,t.length),l=e[t.length];else if(void 0!==e[t.charAt(0)]){for(a=0;a<t.length;a++)n[t][a]=e[t.charAt(a)];l=e.a}else if(void 0!==e[o[t][0]]){var s=o[t];for(a=0;a<t.length;a++)n[t][a]=e[s[a]];l=e.alpha}if(n.alpha=Math.max(0,Math.min(1,void 0===l?n.alpha:l)),"alpha"===t)return!1;var d;for(a=0;a<t.length;a++)d=Math.max(0,Math.min(r[t][a],n[t][a])),n[t][a]=Math.round(d);for(var u in o)u!==t&&(n[u]=i[t][u](n[t]));return!0},o.prototype.setSpace=function(t,e){var a=e[0];return void 0===a?this.getValues(t):("number"==typeof a&&(a=Array.prototype.slice.call(e)),this.setValues(t,a),this)},o.prototype.setChannel=function(t,e,a){var i=this.values[t];return void 0===a?i[e]:a===i[e]?this:(i[e]=a,this.setValues(t,i),this)},"undefined"!=typeof window&&(window.Color=o),e.exports=o},{2:2,5:5}],4:[function(t,e,a){function i(t){var e,a,i,n=t[0]/255,o=t[1]/255,r=t[2]/255,l=Math.min(n,o,r),s=Math.max(n,o,r),d=s-l;return s==l?e=0:n==s?e=(o-r)/d:o==s?e=2+(r-n)/d:r==s&&(e=4+(n-o)/d),e=Math.min(60*e,360),0>e&&(e+=360),i=(l+s)/2,a=s==l?0:.5>=i?d/(s+l):d/(2-s-l),[e,100*a,100*i]}function n(t){var e,a,i,n=t[0],o=t[1],r=t[2],l=Math.min(n,o,r),s=Math.max(n,o,r),d=s-l;return a=0==s?0:d/s*1e3/10,s==l?e=0:n==s?e=(o-r)/d:o==s?e=2+(r-n)/d:r==s&&(e=4+(n-o)/d),e=Math.min(60*e,360),0>e&&(e+=360),i=s/255*1e3/10,[e,a,i]}function o(t){var e=t[0],a=t[1],n=t[2],o=i(t)[0],r=1/255*Math.min(e,Math.min(a,n)),n=1-1/255*Math.max(e,Math.max(a,n));return[o,100*r,100*n]}function l(t){var e,a,i,n,o=t[0]/255,r=t[1]/255,l=t[2]/255;return n=Math.min(1-o,1-r,1-l),e=(1-o-n)/(1-n)||0,a=(1-r-n)/(1-n)||0,i=(1-l-n)/(1-n)||0,[100*e,100*a,100*i,100*n]}function s(t){return Q[JSON.stringify(t)]}function d(t){var e=t[0]/255,a=t[1]/255,i=t[2]/255;e=e>.04045?Math.pow((e+.055)/1.055,2.4):e/12.92,a=a>.04045?Math.pow((a+.055)/1.055,2.4):a/12.92,i=i>.04045?Math.pow((i+.055)/1.055,2.4):i/12.92;var n=.4124*e+.3576*a+.1805*i,o=.2126*e+.7152*a+.0722*i,r=.0193*e+.1192*a+.9505*i;return[100*n,100*o,100*r]}function u(t){var e,a,i,n=d(t),o=n[0],r=n[1],l=n[2];return o/=95.047,r/=100,l/=108.883,o=o>.008856?Math.pow(o,1/3):7.787*o+16/116,r=r>.008856?Math.pow(r,1/3):7.787*r+16/116,l=l>.008856?Math.pow(l,1/3):7.787*l+16/116,e=116*r-16,a=500*(o-r),i=200*(r-l),[e,a,i]}function c(t){return W(u(t))}function h(t){var e,a,i,n,o,r=t[0]/360,l=t[1]/100,s=t[2]/100;if(0==l)return o=255*s,[o,o,o];a=.5>s?s*(1+l):s+l-s*l,e=2*s-a,n=[0,0,0];for(var d=0;3>d;d++)i=r+1/3*-(d-1),0>i&&i++,i>1&&i--,o=1>6*i?e+6*(a-e)*i:1>2*i?a:2>3*i?e+(a-e)*(2/3-i)*6:e,n[d]=255*o;return n}function f(t){var e,a,i=t[0],n=t[1]/100,o=t[2]/100;return 0===o?[0,0,0]:(o*=2,n*=1>=o?o:2-o,a=(o+n)/2,e=2*n/(o+n),[i,100*e,100*a])}function p(t){return o(h(t))}function m(t){return l(h(t))}function v(t){return s(h(t))}function x(t){var e=t[0]/60,a=t[1]/100,i=t[2]/100,n=Math.floor(e)%6,o=e-Math.floor(e),r=255*i*(1-a),l=255*i*(1-a*o),s=255*i*(1-a*(1-o)),i=255*i;switch(n){case 0:return[i,s,r];case 1:return[l,i,r];case 2:return[r,i,s];case 3:return[r,l,i];case 4:return[s,r,i];case 5:return[i,r,l]}}function y(t){var e,a,i=t[0],n=t[1]/100,o=t[2]/100;return a=(2-n)*o,e=n*o,e/=1>=a?a:2-a,e=e||0,a/=2,[i,100*e,100*a]}function k(t){return o(x(t))}function S(t){return l(x(t))}function w(t){return s(x(t))}function C(t){var e,a,i,n,o=t[0]/360,l=t[1]/100,s=t[2]/100,d=l+s;switch(d>1&&(l/=d,s/=d),e=Math.floor(6*o),a=1-s,i=6*o-e,0!=(1&e)&&(i=1-i),n=l+i*(a-l),e){default:case 6:case 0:r=a,g=n,b=l;break;case 1:r=n,g=a,b=l;break;case 2:r=l,g=a,b=n;break;case 3:r=l,g=n,b=a;break;case 4:r=n,g=l,b=a;break;case 5:r=a,g=l,b=n}return[255*r,255*g,255*b]}function M(t){return i(C(t))}function D(t){return n(C(t))}function A(t){return l(C(t))}function I(t){return s(C(t))}function F(t){var e,a,i,n=t[0]/100,o=t[1]/100,r=t[2]/100,l=t[3]/100;return e=1-Math.min(1,n*(1-l)+l),a=1-Math.min(1,o*(1-l)+l),i=1-Math.min(1,r*(1-l)+l),[255*e,255*a,255*i]}function T(t){return i(F(t))}function P(t){return n(F(t))}function _(t){return o(F(t))}function R(t){return s(F(t))}function V(t){var e,a,i,n=t[0]/100,o=t[1]/100,r=t[2]/100;return e=3.2406*n+-1.5372*o+r*-.4986,a=n*-.9689+1.8758*o+.0415*r,i=.0557*n+o*-.204+1.057*r,e=e>.0031308?1.055*Math.pow(e,1/2.4)-.055:e=12.92*e,a=a>.0031308?1.055*Math.pow(a,1/2.4)-.055:a=12.92*a,i=i>.0031308?1.055*Math.pow(i,1/2.4)-.055:i=12.92*i,e=Math.min(Math.max(0,e),1),a=Math.min(Math.max(0,a),1),i=Math.min(Math.max(0,i),1),[255*e,255*a,255*i]}function O(t){var e,a,i,n=t[0],o=t[1],r=t[2];return n/=95.047,o/=100,r/=108.883,n=n>.008856?Math.pow(n,1/3):7.787*n+16/116,o=o>.008856?Math.pow(o,1/3):7.787*o+16/116,r=r>.008856?Math.pow(r,1/3):7.787*r+16/116,e=116*o-16,a=500*(n-o),i=200*(o-r),[e,a,i]}function L(t){return W(O(t))}function B(t){var e,a,i,n,o=t[0],r=t[1],l=t[2];return 8>=o?(a=100*o/903.3,n=7.787*(a/100)+16/116):(a=100*Math.pow((o+16)/116,3),n=Math.pow(a/100,1/3)),e=.008856>=e/95.047?e=95.047*(r/500+n-16/116)/7.787:95.047*Math.pow(r/500+n,3),i=.008859>=i/108.883?i=108.883*(n-l/200-16/116)/7.787:108.883*Math.pow(n-l/200,3),[e,a,i]}function W(t){var e,a,i,n=t[0],o=t[1],r=t[2];return e=Math.atan2(r,o),a=360*e/2/Math.PI,0>a&&(a+=360),i=Math.sqrt(o*o+r*r),[n,i,a]}function z(t){return V(B(t))}function H(t){var e,a,i,n=t[0],o=t[1],r=t[2];return i=r/360*2*Math.PI,e=o*Math.cos(i),a=o*Math.sin(i),[n,e,a]}function N(t){return B(H(t))}function E(t){return z(H(t))}function U(t){return G[t]}function q(t){return i(U(t))}function j(t){return n(U(t))}function Y(t){return o(U(t))}function J(t){return l(U(t))}function X(t){return u(U(t))}function Z(t){return d(U(t))}e.exports={rgb2hsl:i,rgb2hsv:n,rgb2hwb:o,rgb2cmyk:l,rgb2keyword:s,rgb2xyz:d,rgb2lab:u,rgb2lch:c,hsl2rgb:h,hsl2hsv:f,hsl2hwb:p,hsl2cmyk:m,hsl2keyword:v,hsv2rgb:x,hsv2hsl:y,hsv2hwb:k,hsv2cmyk:S,hsv2keyword:w,hwb2rgb:C,hwb2hsl:M,hwb2hsv:D,hwb2cmyk:A,hwb2keyword:I,cmyk2rgb:F,cmyk2hsl:T,cmyk2hsv:P,cmyk2hwb:_,cmyk2keyword:R,keyword2rgb:U,keyword2hsl:q,keyword2hsv:j,keyword2hwb:Y,keyword2cmyk:J,keyword2lab:X,keyword2xyz:Z,xyz2rgb:V,xyz2lab:O,xyz2lch:L,lab2xyz:B,lab2rgb:z,lab2lch:W,lch2lab:H,lch2xyz:N,lch2rgb:E};var G={aliceblue:[240,248,255],antiquewhite:[250,235,215],aqua:[0,255,255],aquamarine:[127,255,212],azure:[240,255,255],beige:[245,245,220],bisque:[255,228,196],black:[0,0,0],blanchedalmond:[255,235,205],blue:[0,0,255],blueviolet:[138,43,226],brown:[165,42,42],burlywood:[222,184,135],cadetblue:[95,158,160],chartreuse:[127,255,0],chocolate:[210,105,30],coral:[255,127,80],cornflowerblue:[100,149,237],cornsilk:[255,248,220],crimson:[220,20,60],cyan:[0,255,255],darkblue:[0,0,139],darkcyan:[0,139,139],darkgoldenrod:[184,134,11],darkgray:[169,169,169],darkgreen:[0,100,0],darkgrey:[169,169,169],darkkhaki:[189,183,107],darkmagenta:[139,0,139],darkolivegreen:[85,107,47],darkorange:[255,140,0],darkorchid:[153,50,204],darkred:[139,0,0],darksalmon:[233,150,122],darkseagreen:[143,188,143],darkslateblue:[72,61,139],darkslategray:[47,79,79],darkslategrey:[47,79,79],darkturquoise:[0,206,209],darkviolet:[148,0,211],deeppink:[255,20,147],deepskyblue:[0,191,255],dimgray:[105,105,105],dimgrey:[105,105,105],dodgerblue:[30,144,255],firebrick:[178,34,34],floralwhite:[255,250,240],forestgreen:[34,139,34],fuchsia:[255,0,255],gainsboro:[220,220,220],ghostwhite:[248,248,255],gold:[255,215,0],goldenrod:[218,165,32],gray:[128,128,128],green:[0,128,0],greenyellow:[173,255,47],grey:[128,128,128],honeydew:[240,255,240],hotpink:[255,105,180],indianred:[205,92,92],indigo:[75,0,130],ivory:[255,255,240],khaki:[240,230,140],lavender:[230,230,250],lavenderblush:[255,240,245],lawngreen:[124,252,0],lemonchiffon:[255,250,205],lightblue:[173,216,230],lightcoral:[240,128,128],lightcyan:[224,255,255],lightgoldenrodyellow:[250,250,210],lightgray:[211,211,211],lightgreen:[144,238,144],lightgrey:[211,211,211],lightpink:[255,182,193],lightsalmon:[255,160,122],lightseagreen:[32,178,170],lightskyblue:[135,206,250],lightslategray:[119,136,153],lightslategrey:[119,136,153],lightsteelblue:[176,196,222],lightyellow:[255,255,224],lime:[0,255,0],limegreen:[50,205,50],linen:[250,240,230],magenta:[255,0,255],maroon:[128,0,0],mediumaquamarine:[102,205,170],mediumblue:[0,0,205],mediumorchid:[186,85,211],mediumpurple:[147,112,219],mediumseagreen:[60,179,113],mediumslateblue:[123,104,238],mediumspringgreen:[0,250,154],mediumturquoise:[72,209,204],mediumvioletred:[199,21,133],midnightblue:[25,25,112],mintcream:[245,255,250],mistyrose:[255,228,225],moccasin:[255,228,181],navajowhite:[255,222,173],navy:[0,0,128],oldlace:[253,245,230],olive:[128,128,0],olivedrab:[107,142,35],orange:[255,165,0],orangered:[255,69,0],orchid:[218,112,214],palegoldenrod:[238,232,170],palegreen:[152,251,152],paleturquoise:[175,238,238],palevioletred:[219,112,147],papayawhip:[255,239,213],peachpuff:[255,218,185],peru:[205,133,63],pink:[255,192,203],plum:[221,160,221],powderblue:[176,224,230],purple:[128,0,128],rebeccapurple:[102,51,153],red:[255,0,0],rosybrown:[188,143,143],royalblue:[65,105,225],saddlebrown:[139,69,19],salmon:[250,128,114],sandybrown:[244,164,96],seagreen:[46,139,87],seashell:[255,245,238],sienna:[160,82,45],silver:[192,192,192],skyblue:[135,206,235],slateblue:[106,90,205],slategray:[112,128,144],slategrey:[112,128,144],snow:[255,250,250],springgreen:[0,255,127],steelblue:[70,130,180],tan:[210,180,140],teal:[0,128,128],thistle:[216,191,216],tomato:[255,99,71],turquoise:[64,224,208],violet:[238,130,238],wheat:[245,222,179],white:[255,255,255],whitesmoke:[245,245,245],yellow:[255,255,0],yellowgreen:[154,205,50]},Q={};for(var $ in G)Q[JSON.stringify(G[$])]=$},{}],5:[function(t,e,a){var i=t(4),n=function(){return new d};for(var o in i){n[o+"Raw"]=function(t){return function(e){return"number"==typeof e&&(e=Array.prototype.slice.call(arguments)),i[t](e)}}(o);var r=/(\w+)2(\w+)/.exec(o),l=r[1],s=r[2];n[l]=n[l]||{},n[l][s]=n[o]=function(t){return function(e){"number"==typeof e&&(e=Array.prototype.slice.call(arguments));var a=i[t](e);if("string"==typeof a||void 0===a)return a;for(var n=0;n<a.length;n++)a[n]=Math.round(a[n]);return a}}(o)}var d=function(){this.convs={}};d.prototype.routeSpace=function(t,e){var a=e[0];return void 0===a?this.getValues(t):("number"==typeof a&&(a=Array.prototype.slice.call(e)),this.setValues(t,a))},d.prototype.setValues=function(t,e){return this.space=t,this.convs={},this.convs[t]=e,this},d.prototype.getValues=function(t){var e=this.convs[t];if(!e){var a=this.space,i=this.convs[a];e=n[a][t](i),this.convs[t]=e}return e},["rgb","hsl","hsv","cmyk","keyword"].forEach(function(t){d.prototype[t]=function(e){return this.routeSpace(t,arguments)}}),e.exports=n},{4:4}],6:[function(t,e,a){e.exports={aliceblue:[240,248,255],antiquewhite:[250,235,215],aqua:[0,255,255],aquamarine:[127,255,212],azure:[240,255,255],beige:[245,245,220],bisque:[255,228,196],black:[0,0,0],blanchedalmond:[255,235,205],blue:[0,0,255],blueviolet:[138,43,226],brown:[165,42,42],burlywood:[222,184,135],cadetblue:[95,158,160],chartreuse:[127,255,0],chocolate:[210,105,30],coral:[255,127,80],cornflowerblue:[100,149,237],cornsilk:[255,248,220],crimson:[220,20,60],cyan:[0,255,255],darkblue:[0,0,139],darkcyan:[0,139,139],darkgoldenrod:[184,134,11],darkgray:[169,169,169],darkgreen:[0,100,0],darkgrey:[169,169,169],darkkhaki:[189,183,107],darkmagenta:[139,0,139],darkolivegreen:[85,107,47],darkorange:[255,140,0],darkorchid:[153,50,204],darkred:[139,0,0],darksalmon:[233,150,122],darkseagreen:[143,188,143],darkslateblue:[72,61,139],darkslategray:[47,79,79],darkslategrey:[47,79,79],darkturquoise:[0,206,209],darkviolet:[148,0,211],deeppink:[255,20,147],deepskyblue:[0,191,255],dimgray:[105,105,105],dimgrey:[105,105,105],dodgerblue:[30,144,255],firebrick:[178,34,34],floralwhite:[255,250,240],forestgreen:[34,139,34],fuchsia:[255,0,255],gainsboro:[220,220,220],ghostwhite:[248,248,255],gold:[255,215,0],goldenrod:[218,165,32],gray:[128,128,128],green:[0,128,0],greenyellow:[173,255,47],grey:[128,128,128],honeydew:[240,255,240],hotpink:[255,105,180],indianred:[205,92,92],indigo:[75,0,130],ivory:[255,255,240],khaki:[240,230,140],lavender:[230,230,250],lavenderblush:[255,240,245],lawngreen:[124,252,0],lemonchiffon:[255,250,205],lightblue:[173,216,230],lightcoral:[240,128,128],lightcyan:[224,255,255],lightgoldenrodyellow:[250,250,210],lightgray:[211,211,211],lightgreen:[144,238,144],lightgrey:[211,211,211],lightpink:[255,182,193],lightsalmon:[255,160,122],lightseagreen:[32,178,170],lightskyblue:[135,206,250],lightslategray:[119,136,153],lightslategrey:[119,136,153],lightsteelblue:[176,196,222],lightyellow:[255,255,224],lime:[0,255,0],limegreen:[50,205,50],linen:[250,240,230],magenta:[255,0,255],maroon:[128,0,0],mediumaquamarine:[102,205,170],mediumblue:[0,0,205],mediumorchid:[186,85,211],mediumpurple:[147,112,219],mediumseagreen:[60,179,113],mediumslateblue:[123,104,238],mediumspringgreen:[0,250,154],mediumturquoise:[72,209,204],mediumvioletred:[199,21,133],midnightblue:[25,25,112],mintcream:[245,255,250],mistyrose:[255,228,225],moccasin:[255,228,181],navajowhite:[255,222,173],navy:[0,0,128],oldlace:[253,245,230],olive:[128,128,0],olivedrab:[107,142,35],orange:[255,165,0],orangered:[255,69,0],orchid:[218,112,214],palegoldenrod:[238,232,170],palegreen:[152,251,152],paleturquoise:[175,238,238],palevioletred:[219,112,147],papayawhip:[255,239,213],peachpuff:[255,218,185],peru:[205,133,63],pink:[255,192,203],plum:[221,160,221],powderblue:[176,224,230],purple:[128,0,128],rebeccapurple:[102,51,153],red:[255,0,0],rosybrown:[188,143,143],royalblue:[65,105,225],saddlebrown:[139,69,19],salmon:[250,128,114],sandybrown:[244,164,96],seagreen:[46,139,87],seashell:[255,245,238],sienna:[160,82,45],silver:[192,192,192],skyblue:[135,206,235],slateblue:[106,90,205],slategray:[112,128,144],slategrey:[112,128,144],snow:[255,250,250],springgreen:[0,255,127],steelblue:[70,130,180],tan:[210,180,140],teal:[0,128,128],thistle:[216,191,216],tomato:[255,99,71],turquoise:[64,224,208],violet:[238,130,238],wheat:[245,222,179],white:[255,255,255],whitesmoke:[245,245,245],yellow:[255,255,0],yellowgreen:[154,205,50]}},{}],7:[function(t,e,a){var i=t(26)();t(25)(i),t(24)(i),t(21)(i),t(22)(i),t(23)(i),t(27)(i),t(31)(i),t(29)(i),t(30)(i),t(32)(i),t(28)(i),t(33)(i),t(34)(i),t(35)(i),t(36)(i),t(37)(i),t(40)(i),t(38)(i),t(39)(i),t(41)(i),t(42)(i),t(43)(i),t(15)(i),t(16)(i),t(17)(i),t(18)(i),t(19)(i),t(20)(i),t(8)(i),t(9)(i),t(10)(i),t(11)(i),t(12)(i),t(13)(i),t(14)(i),window.Chart=e.exports=i},{10:10,11:11,12:12,13:13,14:14,15:15,16:16,17:17,18:18,19:19,20:20,21:21,22:22,23:23,24:24,25:25,26:26,27:27,28:28,29:29,30:30,31:31,32:32,33:33,34:34,35:35,36:36,37:37,38:38,39:39,40:40,41:41,42:42,43:43,8:8,9:9}],8:[function(t,e,a){"use strict";e.exports=function(t){t.Bar=function(e,a){return a.type="bar",new t(e,a)}}},{}],9:[function(t,e,a){"use strict";e.exports=function(t){t.Bubble=function(e,a){return a.type="bubble",new t(e,a)}}},{}],10:[function(t,e,a){"use strict";e.exports=function(t){t.Doughnut=function(e,a){return a.type="doughnut",new t(e,a)}}},{}],11:[function(t,e,a){"use strict";e.exports=function(t){t.Line=function(e,a){return a.type="line",new t(e,a)}}},{}],12:[function(t,e,a){"use strict";e.exports=function(t){t.PolarArea=function(e,a){return a.type="polarArea",new t(e,a)}}},{}],13:[function(t,e,a){"use strict";e.exports=function(t){t.Radar=function(e,a){return a.options=t.helpers.configMerge({aspectRatio:1},a.options),a.type="radar",new t(e,a)}}},{}],14:[function(t,e,a){"use strict";e.exports=function(t){var e={hover:{mode:"single"},scales:{xAxes:[{type:"linear",position:"bottom",id:"x-axis-1"}],yAxes:[{type:"linear",position:"left",id:"y-axis-1"}]},tooltips:{callbacks:{title:function(t,e){return""},label:function(t,e){return"("+t.xLabel+", "+t.yLabel+")"}}}};t.defaults.scatter=e,t.controllers.scatter=t.controllers.line,t.Scatter=function(e,a){return a.type="scatter",new t(e,a)}}},{}],15:[function(t,e,a){"use strict";e.exports=function(t){var e=t.helpers;t.defaults.bar={hover:{mode:"label"},scales:{xAxes:[{type:"category",categoryPercentage:.8,barPercentage:.9,gridLines:{offsetGridLines:!0}}],yAxes:[{type:"linear"}]}},t.controllers.bar=t.DatasetController.extend({dataElementType:t.elements.Rectangle,initialize:function(e,a){t.DatasetController.prototype.initialize.call(this,e,a),this.getMeta().bar=!0},getBarCount:function(){var t=this,a=0;return e.each(t.chart.data.datasets,function(e,i){var n=t.chart.getDatasetMeta(i);n.bar&&t.chart.isDatasetVisible(i)&&++a},t),a},update:function(t){var a=this;e.each(a.getMeta().data,function(e,i){a.updateElement(e,i,t)},a)},updateElement:function(t,a,i){var n=this,o=n.getMeta(),r=n.getScaleForId(o.xAxisID),l=n.getScaleForId(o.yAxisID),s=l.getBasePixel(),d=n.chart.options.elements.rectangle,u=t.custom||{},c=n.getDataset();e.extend(t,{_xScale:r,_yScale:l,_datasetIndex:n.index,_index:a,_model:{x:n.calculateBarX(a,n.index),y:i?s:n.calculateBarY(a,n.index),label:n.chart.data.labels[a],datasetLabel:c.label,base:i?s:n.calculateBarBase(n.index,a),width:n.calculateBarWidth(a),backgroundColor:u.backgroundColor?u.backgroundColor:e.getValueAtIndexOrDefault(c.backgroundColor,a,d.backgroundColor),borderSkipped:u.borderSkipped?u.borderSkipped:d.borderSkipped,borderColor:u.borderColor?u.borderColor:e.getValueAtIndexOrDefault(c.borderColor,a,d.borderColor),borderWidth:u.borderWidth?u.borderWidth:e.getValueAtIndexOrDefault(c.borderWidth,a,d.borderWidth)}}),t.pivot()},calculateBarBase:function(t,e){var a=this,i=a.getMeta(),n=a.getScaleForId(i.yAxisID),o=0;if(n.options.stacked){var r=a.chart,l=r.data.datasets,s=l[t].data[e];if(0>s)for(var d=0;t>d;d++){var u=l[d],c=r.getDatasetMeta(d);c.bar&&c.yAxisID===n.id&&r.isDatasetVisible(d)&&(o+=u.data[e]<0?u.data[e]:0)}else for(var h=0;t>h;h++){var f=l[h],g=r.getDatasetMeta(h);g.bar&&g.yAxisID===n.id&&r.isDatasetVisible(h)&&(o+=f.data[e]>0?f.data[e]:0)}return n.getPixelForValue(o)}return n.getBasePixel()},getRuler:function(t){var e,a=this,i=a.getMeta(),n=a.getScaleForId(i.xAxisID),o=a.getBarCount();e="category"===n.options.type?n.getPixelForTick(t+1)-n.getPixelForTick(t):n.width/n.ticks.length;var r=e*n.options.categoryPercentage,l=(e-e*n.options.categoryPercentage)/2,s=r/o;if(n.ticks.length!==a.chart.data.labels.length){var d=n.ticks.length/a.chart.data.labels.length;s*=d}var u=s*n.options.barPercentage,c=s-s*n.options.barPercentage;return{datasetCount:o,tickWidth:e,categoryWidth:r,categorySpacing:l,fullBarWidth:s,barWidth:u,barSpacing:c}},calculateBarWidth:function(t){var e=this.getScaleForId(this.getMeta().xAxisID),a=this.getRuler(t);return e.options.stacked?a.categoryWidth:a.barWidth},getBarIndex:function(t){var e,a,i=0;for(a=0;t>a;++a)e=this.chart.getDatasetMeta(a),e.bar&&this.chart.isDatasetVisible(a)&&++i;return i},calculateBarX:function(t,e){var a=this,i=a.getMeta(),n=a.getScaleForId(i.xAxisID),o=a.getBarIndex(e),r=a.getRuler(t),l=n.getPixelForValue(null,t,e,a.chart.isCombo);return l-=a.chart.isCombo?r.tickWidth/2:0,n.options.stacked?l+r.categoryWidth/2+r.categorySpacing:l+r.barWidth/2+r.categorySpacing+r.barWidth*o+r.barSpacing/2+r.barSpacing*o},calculateBarY:function(t,e){var a=this,i=a.getMeta(),n=a.getScaleForId(i.yAxisID),o=a.getDataset().data[t];if(n.options.stacked){for(var r=0,l=0,s=0;e>s;s++){var d=a.chart.data.datasets[s],u=a.chart.getDatasetMeta(s);u.bar&&u.yAxisID===n.id&&a.chart.isDatasetVisible(s)&&(d.data[t]<0?l+=d.data[t]||0:r+=d.data[t]||0)}return 0>o?n.getPixelForValue(l+o):n.getPixelForValue(r+o)}return n.getPixelForValue(o)},draw:function(t){var a=this,i=t||1;e.each(a.getMeta().data,function(t,e){var n=a.getDataset().data[e];null===n||void 0===n||isNaN(n)||t.transition(i).draw()},a)},setHoverStyle:function(t){var a=this.chart.data.datasets[t._datasetIndex],i=t._index,n=t.custom||{},o=t._model;o.backgroundColor=n.hoverBackgroundColor?n.hoverBackgroundColor:e.getValueAtIndexOrDefault(a.hoverBackgroundColor,i,e.getHoverColor(o.backgroundColor)),o.borderColor=n.hoverBorderColor?n.hoverBorderColor:e.getValueAtIndexOrDefault(a.hoverBorderColor,i,e.getHoverColor(o.borderColor)),o.borderWidth=n.hoverBorderWidth?n.hoverBorderWidth:e.getValueAtIndexOrDefault(a.hoverBorderWidth,i,o.borderWidth)},removeHoverStyle:function(t){var a=this.chart.data.datasets[t._datasetIndex],i=t._index,n=t.custom||{},o=t._model,r=this.chart.options.elements.rectangle;o.backgroundColor=n.backgroundColor?n.backgroundColor:e.getValueAtIndexOrDefault(a.backgroundColor,i,r.backgroundColor),o.borderColor=n.borderColor?n.borderColor:e.getValueAtIndexOrDefault(a.borderColor,i,r.borderColor),o.borderWidth=n.borderWidth?n.borderWidth:e.getValueAtIndexOrDefault(a.borderWidth,i,r.borderWidth)}}),t.defaults.horizontalBar={hover:{mode:"label"},scales:{xAxes:[{type:"linear",position:"bottom"}],yAxes:[{position:"left",type:"category",categoryPercentage:.8,barPercentage:.9,gridLines:{offsetGridLines:!0}}]},elements:{rectangle:{borderSkipped:"left"}},tooltips:{callbacks:{title:function(t,e){var a="";return t.length>0&&(t[0].yLabel?a=t[0].yLabel:e.labels.length>0&&t[0].index<e.labels.length&&(a=e.labels[t[0].index])),a},label:function(t,e){var a=e.datasets[t.datasetIndex].label||"";return a+": "+t.xLabel}}}},t.controllers.horizontalBar=t.controllers.bar.extend({updateElement:function(t,a,i,n){var o=this,r=o.getMeta(),l=o.getScaleForId(r.xAxisID),s=o.getScaleForId(r.yAxisID),d=l.getBasePixel(),u=t.custom||{},c=o.getDataset(),h=o.chart.options.elements.rectangle;e.extend(t,{_xScale:l,_yScale:s,_datasetIndex:o.index,_index:a,_model:{x:i?d:o.calculateBarX(a,o.index),y:o.calculateBarY(a,o.index),label:o.chart.data.labels[a],datasetLabel:c.label,base:i?d:o.calculateBarBase(o.index,a),height:o.calculateBarHeight(a),backgroundColor:u.backgroundColor?u.backgroundColor:e.getValueAtIndexOrDefault(c.backgroundColor,a,h.backgroundColor),borderSkipped:u.borderSkipped?u.borderSkipped:h.borderSkipped,borderColor:u.borderColor?u.borderColor:e.getValueAtIndexOrDefault(c.borderColor,a,h.borderColor),borderWidth:u.borderWidth?u.borderWidth:e.getValueAtIndexOrDefault(c.borderWidth,a,h.borderWidth)},draw:function(){function t(t){return s[(u+t)%4]}var e=this._chart.ctx,a=this._view,i=a.height/2,n=a.y-i,o=a.y+i,r=a.base-(a.base-a.x),l=a.borderWidth/2;a.borderWidth&&(n+=l,o-=l,r+=l),e.beginPath(),e.fillStyle=a.backgroundColor,e.strokeStyle=a.borderColor,e.lineWidth=a.borderWidth;var s=[[a.base,o],[a.base,n],[r,n],[r,o]],d=["bottom","left","top","right"],u=d.indexOf(a.borderSkipped,0);-1===u&&(u=0),e.moveTo.apply(e,t(0));for(var c=1;4>c;c++)e.lineTo.apply(e,t(c));e.fill(),a.borderWidth&&e.stroke()},inRange:function(t,e){var a=this._view,i=!1;return a&&(i=a.x<a.base?e>=a.y-a.height/2&&e<=a.y+a.height/2&&t>=a.x&&t<=a.base:e>=a.y-a.height/2&&e<=a.y+a.height/2&&t>=a.base&&t<=a.x),i}}),t.pivot()},calculateBarBase:function(t,e){
var a=this,i=a.getMeta(),n=a.getScaleForId(i.xAxisID),o=0;if(n.options.stacked){var r=a.chart.data.datasets[t].data[e];if(0>r)for(var l=0;t>l;l++){var s=a.chart.data.datasets[l],d=a.chart.getDatasetMeta(l);d.bar&&d.xAxisID===n.id&&a.chart.isDatasetVisible(l)&&(o+=s.data[e]<0?s.data[e]:0)}else for(var u=0;t>u;u++){var c=a.chart.data.datasets[u],h=a.chart.getDatasetMeta(u);h.bar&&h.xAxisID===n.id&&a.chart.isDatasetVisible(u)&&(o+=c.data[e]>0?c.data[e]:0)}return n.getPixelForValue(o)}return n.getBasePixel()},getRuler:function(t){var e,a=this,i=a.getMeta(),n=a.getScaleForId(i.yAxisID),o=a.getBarCount();e="category"===n.options.type?n.getPixelForTick(t+1)-n.getPixelForTick(t):n.width/n.ticks.length;var r=e*n.options.categoryPercentage,l=(e-e*n.options.categoryPercentage)/2,s=r/o;if(n.ticks.length!==a.chart.data.labels.length){var d=n.ticks.length/a.chart.data.labels.length;s*=d}var u=s*n.options.barPercentage,c=s-s*n.options.barPercentage;return{datasetCount:o,tickHeight:e,categoryHeight:r,categorySpacing:l,fullBarHeight:s,barHeight:u,barSpacing:c}},calculateBarHeight:function(t){var e=this,a=e.getScaleForId(e.getMeta().yAxisID),i=e.getRuler(t);return a.options.stacked?i.categoryHeight:i.barHeight},calculateBarX:function(t,e){var a=this,i=a.getMeta(),n=a.getScaleForId(i.xAxisID),o=a.getDataset().data[t];if(n.options.stacked){for(var r=0,l=0,s=0;e>s;s++){var d=a.chart.data.datasets[s],u=a.chart.getDatasetMeta(s);u.bar&&u.xAxisID===n.id&&a.chart.isDatasetVisible(s)&&(d.data[t]<0?l+=d.data[t]||0:r+=d.data[t]||0)}return 0>o?n.getPixelForValue(l+o):n.getPixelForValue(r+o)}return n.getPixelForValue(o)},calculateBarY:function(t,e){var a=this,i=a.getMeta(),n=a.getScaleForId(i.yAxisID),o=a.getBarIndex(e),r=a.getRuler(t),l=n.getPixelForValue(null,t,e,a.chart.isCombo);return l-=a.chart.isCombo?r.tickHeight/2:0,n.options.stacked?l+r.categoryHeight/2+r.categorySpacing:l+r.barHeight/2+r.categorySpacing+r.barHeight*o+r.barSpacing/2+r.barSpacing*o}})}},{}],16:[function(t,e,a){"use strict";e.exports=function(t){var e=t.helpers;t.defaults.bubble={hover:{mode:"single"},scales:{xAxes:[{type:"linear",position:"bottom",id:"x-axis-0"}],yAxes:[{type:"linear",position:"left",id:"y-axis-0"}]},tooltips:{callbacks:{title:function(t,e){return""},label:function(t,e){var a=e.datasets[t.datasetIndex].label||"",i=e.datasets[t.datasetIndex].data[t.index];return a+": ("+i.x+", "+i.y+", "+i.r+")"}}}},t.controllers.bubble=t.DatasetController.extend({dataElementType:t.elements.Point,update:function(t){var a=this,i=a.getMeta(),n=i.data;e.each(n,function(e,i){a.updateElement(e,i,t)})},updateElement:function(a,i,n){var o=this,r=o.getMeta(),l=o.getScaleForId(r.xAxisID),s=o.getScaleForId(r.yAxisID),d=a.custom||{},u=o.getDataset(),c=u.data[i],h=o.chart.options.elements.point,f=o.index;e.extend(a,{_xScale:l,_yScale:s,_datasetIndex:f,_index:i,_model:{x:n?l.getPixelForDecimal(.5):l.getPixelForValue(c,i,f,o.chart.isCombo),y:n?s.getBasePixel():s.getPixelForValue(c,i,f),radius:n?0:d.radius?d.radius:o.getRadius(c),hitRadius:d.hitRadius?d.hitRadius:e.getValueAtIndexOrDefault(u.hitRadius,i,h.hitRadius)}}),t.DatasetController.prototype.removeHoverStyle.call(o,a,h);var g=a._model;g.skip=d.skip?d.skip:isNaN(g.x)||isNaN(g.y),a.pivot()},getRadius:function(t){return t.r||this.chart.options.elements.point.radius},setHoverStyle:function(a){var i=this;t.DatasetController.prototype.setHoverStyle.call(i,a);var n=i.chart.data.datasets[a._datasetIndex],o=a._index,r=a.custom||{},l=a._model;l.radius=r.hoverRadius?r.hoverRadius:e.getValueAtIndexOrDefault(n.hoverRadius,o,i.chart.options.elements.point.hoverRadius)+i.getRadius(n.data[o])},removeHoverStyle:function(e){var a=this;t.DatasetController.prototype.removeHoverStyle.call(a,e,a.chart.options.elements.point);var i=a.chart.data.datasets[e._datasetIndex].data[e._index],n=e.custom||{},o=e._model;o.radius=n.radius?n.radius:a.getRadius(i)}})}},{}],17:[function(t,e,a){"use strict";e.exports=function(t){var e=t.helpers,a=t.defaults;a.doughnut={animation:{animateRotate:!0,animateScale:!1},aspectRatio:1,hover:{mode:"single"},legendCallback:function(t){var e=[];e.push('<ul class="'+t.id+'-legend">');var a=t.data,i=a.datasets,n=a.labels;if(i.length)for(var o=0;o<i[0].data.length;++o)e.push('<li><span style="background-color:'+i[0].backgroundColor[o]+'"></span>'),n[o]&&e.push(n[o]),e.push("</li>");return e.push("</ul>"),e.join("")},legend:{labels:{generateLabels:function(t){var a=t.data;return a.labels.length&&a.datasets.length?a.labels.map(function(i,n){var o=t.getDatasetMeta(0),r=a.datasets[0],l=o.data[n],s=l.custom||{},d=e.getValueAtIndexOrDefault,u=t.options.elements.arc,c=s.backgroundColor?s.backgroundColor:d(r.backgroundColor,n,u.backgroundColor),h=s.borderColor?s.borderColor:d(r.borderColor,n,u.borderColor),f=s.borderWidth?s.borderWidth:d(r.borderWidth,n,u.borderWidth);return{text:i,fillStyle:c,strokeStyle:h,lineWidth:f,hidden:isNaN(r.data[n])||o.data[n].hidden,index:n}}):[]}},onClick:function(t,e){var a,i,n,o=e.index,r=this.chart;for(a=0,i=(r.data.datasets||[]).length;i>a;++a)n=r.getDatasetMeta(a),n.data[o].hidden=!n.data[o].hidden;r.update()}},cutoutPercentage:50,rotation:Math.PI*-.5,circumference:2*Math.PI,tooltips:{callbacks:{title:function(){return""},label:function(t,e){return e.labels[t.index]+": "+e.datasets[t.datasetIndex].data[t.index]}}}},a.pie=e.clone(a.doughnut),e.extend(a.pie,{cutoutPercentage:0}),t.controllers.doughnut=t.controllers.pie=t.DatasetController.extend({dataElementType:t.elements.Arc,linkScales:e.noop,getRingIndex:function(t){for(var e=0,a=0;t>a;++a)this.chart.isDatasetVisible(a)&&++e;return e},update:function(t){var a=this,i=a.chart,n=i.chartArea,o=i.options,r=o.elements.arc,l=n.right-n.left-r.borderWidth,s=n.bottom-n.top-r.borderWidth,d=Math.min(l,s),u={x:0,y:0},c=a.getMeta(),h=o.cutoutPercentage,f=o.circumference;if(f<2*Math.PI){var g=o.rotation%(2*Math.PI);g+=2*Math.PI*(g>=Math.PI?-1:g<-Math.PI?1:0);var p=g+f,m={x:Math.cos(g),y:Math.sin(g)},b={x:Math.cos(p),y:Math.sin(p)},v=0>=g&&p>=0||g<=2*Math.PI&&2*Math.PI<=p,x=g<=.5*Math.PI&&.5*Math.PI<=p||g<=2.5*Math.PI&&2.5*Math.PI<=p,y=g<=-Math.PI&&-Math.PI<=p||g<=Math.PI&&Math.PI<=p,k=g<=.5*-Math.PI&&.5*-Math.PI<=p||g<=1.5*Math.PI&&1.5*Math.PI<=p,S=h/100,w={x:y?-1:Math.min(m.x*(m.x<0?1:S),b.x*(b.x<0?1:S)),y:k?-1:Math.min(m.y*(m.y<0?1:S),b.y*(b.y<0?1:S))},C={x:v?1:Math.max(m.x*(m.x>0?1:S),b.x*(b.x>0?1:S)),y:x?1:Math.max(m.y*(m.y>0?1:S),b.y*(b.y>0?1:S))},M={width:.5*(C.x-w.x),height:.5*(C.y-w.y)};d=Math.min(l/M.width,s/M.height),u={x:(C.x+w.x)*-.5,y:(C.y+w.y)*-.5}}i.outerRadius=Math.max(d/2,0),i.innerRadius=Math.max(h?i.outerRadius/100*h:1,0),i.radiusLength=(i.outerRadius-i.innerRadius)/i.getVisibleDatasetCount(),i.offsetX=u.x*i.outerRadius,i.offsetY=u.y*i.outerRadius,c.total=a.calculateTotal(),a.outerRadius=i.outerRadius-i.radiusLength*a.getRingIndex(a.index),a.innerRadius=a.outerRadius-i.radiusLength,e.each(c.data,function(e,i){a.updateElement(e,i,t)})},updateElement:function(t,a,i){var n=this,o=n.chart,r=o.chartArea,l=o.options,s=l.animation,d=(l.elements.arc,(r.left+r.right)/2),u=(r.top+r.bottom)/2,c=l.rotation,h=l.rotation,f=n.getDataset(),g=i&&s.animateRotate?0:t.hidden?0:n.calculateCircumference(f.data[a])*(l.circumference/(2*Math.PI)),p=i&&s.animateScale?0:n.innerRadius,m=i&&s.animateScale?0:n.outerRadius,b=(t.custom||{},e.getValueAtIndexOrDefault);e.extend(t,{_datasetIndex:n.index,_index:a,_model:{x:d+o.offsetX,y:u+o.offsetY,startAngle:c,endAngle:h,circumference:g,outerRadius:m,innerRadius:p,label:b(f.label,a,o.data.labels[a])}});var v=t._model;this.removeHoverStyle(t),i&&s.animateRotate||(0===a?v.startAngle=l.rotation:v.startAngle=n.getMeta().data[a-1]._model.endAngle,v.endAngle=v.startAngle+v.circumference),t.pivot()},removeHoverStyle:function(e){t.DatasetController.prototype.removeHoverStyle.call(this,e,this.chart.options.elements.arc)},calculateTotal:function(){var t,a=this.getDataset(),i=this.getMeta(),n=0;return e.each(i.data,function(e,i){t=a.data[i],isNaN(t)||e.hidden||(n+=Math.abs(t))}),n},calculateCircumference:function(t){var e=this.getMeta().total;return e>0&&!isNaN(t)?2*Math.PI*(t/e):0}})}},{}],18:[function(t,e,a){"use strict";e.exports=function(t){function e(t,e){return a.getValueOrDefault(t.showLine,e.showLines)}var a=t.helpers;t.defaults.line={showLines:!0,hover:{mode:"label"},scales:{xAxes:[{type:"category",id:"x-axis-0"}],yAxes:[{type:"linear",id:"y-axis-0"}]}},t.controllers.line=t.DatasetController.extend({datasetElementType:t.elements.Line,dataElementType:t.elements.Point,addElementAndReset:function(a){var i=this,n=i.chart.options,o=i.getMeta();t.DatasetController.prototype.addElementAndReset.call(i,a),e(i.getDataset(),n)&&0!==o.dataset._model.tension&&i.updateBezierControlPoints()},update:function(t){var i,n,o,r=this,l=r.getMeta(),s=l.dataset,d=l.data||[],u=r.chart.options,c=u.elements.line,h=r.getScaleForId(l.yAxisID),f=r.getDataset(),g=e(f,u);for(g&&(o=s.custom||{},void 0!==f.tension&&void 0===f.lineTension&&(f.lineTension=f.tension),s._scale=h,s._datasetIndex=r.index,s._children=d,s._model={spanGaps:f.spanGaps?f.spanGaps:!1,tension:o.tension?o.tension:a.getValueOrDefault(f.lineTension,c.tension),backgroundColor:o.backgroundColor?o.backgroundColor:f.backgroundColor||c.backgroundColor,borderWidth:o.borderWidth?o.borderWidth:f.borderWidth||c.borderWidth,borderColor:o.borderColor?o.borderColor:f.borderColor||c.borderColor,borderCapStyle:o.borderCapStyle?o.borderCapStyle:f.borderCapStyle||c.borderCapStyle,borderDash:o.borderDash?o.borderDash:f.borderDash||c.borderDash,borderDashOffset:o.borderDashOffset?o.borderDashOffset:f.borderDashOffset||c.borderDashOffset,borderJoinStyle:o.borderJoinStyle?o.borderJoinStyle:f.borderJoinStyle||c.borderJoinStyle,fill:o.fill?o.fill:void 0!==f.fill?f.fill:c.fill,scaleTop:h.top,scaleBottom:h.bottom,scaleZero:h.getBasePixel()},s.pivot()),i=0,n=d.length;n>i;++i)r.updateElement(d[i],i,t);for(g&&0!==s._model.tension&&r.updateBezierControlPoints(),i=0,n=d.length;n>i;++i)d[i].pivot()},getPointBackgroundColor:function(t,e){var i=this.chart.options.elements.point.backgroundColor,n=this.getDataset(),o=t.custom||{};return o.backgroundColor?i=o.backgroundColor:n.pointBackgroundColor?i=a.getValueAtIndexOrDefault(n.pointBackgroundColor,e,i):n.backgroundColor&&(i=n.backgroundColor),i},getPointBorderColor:function(t,e){var i=this.chart.options.elements.point.borderColor,n=this.getDataset(),o=t.custom||{};return o.borderColor?i=o.borderColor:n.pointBorderColor?i=a.getValueAtIndexOrDefault(n.pointBorderColor,e,i):n.borderColor&&(i=n.borderColor),i},getPointBorderWidth:function(t,e){var i=this.chart.options.elements.point.borderWidth,n=this.getDataset(),o=t.custom||{};return o.borderWidth?i=o.borderWidth:n.pointBorderWidth?i=a.getValueAtIndexOrDefault(n.pointBorderWidth,e,i):n.borderWidth&&(i=n.borderWidth),i},updateElement:function(t,e,i){var n,o,r=this,l=r.getMeta(),s=t.custom||{},d=r.getDataset(),u=r.index,c=d.data[e],h=r.getScaleForId(l.yAxisID),f=r.getScaleForId(l.xAxisID),g=r.chart.options.elements.point;void 0!==d.radius&&void 0===d.pointRadius&&(d.pointRadius=d.radius),void 0!==d.hitRadius&&void 0===d.pointHitRadius&&(d.pointHitRadius=d.hitRadius),n=f.getPixelForValue(c,e,u,r.chart.isCombo),o=i?h.getBasePixel():r.calculatePointY(c,e,u,r.chart.isCombo),t._xScale=f,t._yScale=h,t._datasetIndex=u,t._index=e,t._model={x:n,y:o,skip:s.skip||isNaN(n)||isNaN(o),radius:s.radius||a.getValueAtIndexOrDefault(d.pointRadius,e,g.radius),pointStyle:s.pointStyle||a.getValueAtIndexOrDefault(d.pointStyle,e,g.pointStyle),backgroundColor:r.getPointBackgroundColor(t,e),borderColor:r.getPointBorderColor(t,e),borderWidth:r.getPointBorderWidth(t,e),tension:l.dataset._model?l.dataset._model.tension:0,hitRadius:s.hitRadius||a.getValueAtIndexOrDefault(d.pointHitRadius,e,g.hitRadius)}},calculatePointY:function(t,e,a,i){var n,o,r,l=this,s=l.chart,d=l.getMeta(),u=l.getScaleForId(d.yAxisID),c=0,h=0;if(u.options.stacked){for(n=0;a>n;n++)o=s.data.datasets[n],r=s.getDatasetMeta(n),"line"===r.type&&s.isDatasetVisible(n)&&(o.data[e]<0?h+=o.data[e]||0:c+=o.data[e]||0);return 0>t?u.getPixelForValue(h+t):u.getPixelForValue(c+t)}return u.getPixelForValue(t)},updateBezierControlPoints:function(){var t,e,i,n,o,r=this.getMeta(),l=(this.chart.chartArea,r.data||[]);for(t=0,e=l.length;e>t;++t)i=l[t],n=i._model,o=a.splineCurve(a.previousItem(l,t)._model,n,a.nextItem(l,t)._model,r.dataset._model.tension),n.controlPointPreviousX=o.previous.x,n.controlPointPreviousY=o.previous.y,n.controlPointNextX=o.next.x,n.controlPointNextY=o.next.y},draw:function(t){var a,i,n=this,o=n.getMeta(),r=o.data||[],l=t||1;for(a=0,i=r.length;i>a;++a)r[a].transition(l);for(e(n.getDataset(),n.chart.options)&&o.dataset.transition(l).draw(),a=0,i=r.length;i>a;++a)r[a].draw()},setHoverStyle:function(t){var e=this.chart.data.datasets[t._datasetIndex],i=t._index,n=t.custom||{},o=t._model;o.radius=n.hoverRadius||a.getValueAtIndexOrDefault(e.pointHoverRadius,i,this.chart.options.elements.point.hoverRadius),o.backgroundColor=n.hoverBackgroundColor||a.getValueAtIndexOrDefault(e.pointHoverBackgroundColor,i,a.getHoverColor(o.backgroundColor)),o.borderColor=n.hoverBorderColor||a.getValueAtIndexOrDefault(e.pointHoverBorderColor,i,a.getHoverColor(o.borderColor)),o.borderWidth=n.hoverBorderWidth||a.getValueAtIndexOrDefault(e.pointHoverBorderWidth,i,o.borderWidth)},removeHoverStyle:function(t){var e=this,i=e.chart.data.datasets[t._datasetIndex],n=t._index,o=t.custom||{},r=t._model;void 0!==i.radius&&void 0===i.pointRadius&&(i.pointRadius=i.radius),r.radius=o.radius||a.getValueAtIndexOrDefault(i.pointRadius,n,e.chart.options.elements.point.radius),r.backgroundColor=e.getPointBackgroundColor(t,n),r.borderColor=e.getPointBorderColor(t,n),r.borderWidth=e.getPointBorderWidth(t,n)}})}},{}],19:[function(t,e,a){"use strict";e.exports=function(t){var e=t.helpers;t.defaults.polarArea={scale:{type:"radialLinear",lineArc:!0},animation:{animateRotate:!0,animateScale:!0},aspectRatio:1,legendCallback:function(t){var e=[];e.push('<ul class="'+t.id+'-legend">');var a=t.data,i=a.datasets,n=a.labels;if(i.length)for(var o=0;o<i[0].data.length;++o)e.push('<li><span style="background-color:'+i[0].backgroundColor[o]+'">'),n[o]&&e.push(n[o]),e.push("</span></li>");return e.push("</ul>"),e.join("")},legend:{labels:{generateLabels:function(t){var a=t.data;return a.labels.length&&a.datasets.length?a.labels.map(function(i,n){var o=t.getDatasetMeta(0),r=a.datasets[0],l=o.data[n],s=l.custom||{},d=e.getValueAtIndexOrDefault,u=t.options.elements.arc,c=s.backgroundColor?s.backgroundColor:d(r.backgroundColor,n,u.backgroundColor),h=s.borderColor?s.borderColor:d(r.borderColor,n,u.borderColor),f=s.borderWidth?s.borderWidth:d(r.borderWidth,n,u.borderWidth);return{text:i,fillStyle:c,strokeStyle:h,lineWidth:f,hidden:isNaN(r.data[n])||o.data[n].hidden,index:n}}):[]}},onClick:function(t,e){var a,i,n,o=e.index,r=this.chart;for(a=0,i=(r.data.datasets||[]).length;i>a;++a)n=r.getDatasetMeta(a),n.data[o].hidden=!n.data[o].hidden;r.update()}},tooltips:{callbacks:{title:function(){return""},label:function(t,e){return e.labels[t.index]+": "+t.yLabel}}}},t.controllers.polarArea=t.DatasetController.extend({dataElementType:t.elements.Arc,linkScales:e.noop,update:function(t){var a=this,i=a.chart,n=i.chartArea,o=a.getMeta(),r=i.options,l=r.elements.arc,s=Math.min(n.right-n.left,n.bottom-n.top);i.outerRadius=Math.max((s-l.borderWidth/2)/2,0),i.innerRadius=Math.max(r.cutoutPercentage?i.outerRadius/100*r.cutoutPercentage:1,0),i.radiusLength=(i.outerRadius-i.innerRadius)/i.getVisibleDatasetCount(),a.outerRadius=i.outerRadius-i.radiusLength*a.index,a.innerRadius=a.outerRadius-i.radiusLength,o.count=a.countVisibleElements(),e.each(o.data,function(e,i){a.updateElement(e,i,t)})},updateElement:function(t,a,i){for(var n=this,o=n.chart,r=o.chartArea,l=n.getDataset(),s=o.options,d=s.animation,u=(s.elements.arc,t.custom||{},o.scale),c=e.getValueAtIndexOrDefault,h=o.data.labels,f=n.calculateCircumference(l.data[a]),g=(r.left+r.right)/2,p=(r.top+r.bottom)/2,m=0,b=n.getMeta(),v=0;a>v;++v)isNaN(l.data[v])||b.data[v].hidden||++m;var x=-.5*Math.PI,y=t.hidden?0:u.getDistanceFromCenterForValue(l.data[a]),k=x+f*m,S=k+(t.hidden?0:f),w=d.animateScale?0:u.getDistanceFromCenterForValue(l.data[a]);e.extend(t,{_datasetIndex:n.index,_index:a,_scale:u,_model:{x:g,y:p,innerRadius:0,outerRadius:i?w:y,startAngle:i&&d.animateRotate?x:k,endAngle:i&&d.animateRotate?x:S,label:c(h,a,h[a])}}),n.removeHoverStyle(t),t.pivot()},removeHoverStyle:function(e){t.DatasetController.prototype.removeHoverStyle.call(this,e,this.chart.options.elements.arc)},countVisibleElements:function(){var t=this.getDataset(),a=this.getMeta(),i=0;return e.each(a.data,function(e,a){isNaN(t.data[a])||e.hidden||i++}),i},calculateCircumference:function(t){var e=this.getMeta().count;return e>0&&!isNaN(t)?2*Math.PI/e:0}})}},{}],20:[function(t,e,a){"use strict";e.exports=function(t){var e=t.helpers;t.defaults.radar={scale:{type:"radialLinear"},elements:{line:{tension:0}}},t.controllers.radar=t.DatasetController.extend({datasetElementType:t.elements.Line,dataElementType:t.elements.Point,linkScales:e.noop,addElementAndReset:function(e){t.DatasetController.prototype.addElementAndReset.call(this,e),this.updateBezierControlPoints()},update:function(t){var a=this,i=a.getMeta(),n=i.dataset,o=i.data,r=n.custom||{},l=a.getDataset(),s=a.chart.options.elements.line,d=a.chart.scale;void 0!==l.tension&&void 0===l.lineTension&&(l.lineTension=l.tension),e.extend(i.dataset,{_datasetIndex:a.index,_children:o,_loop:!0,_model:{tension:r.tension?r.tension:e.getValueOrDefault(l.lineTension,s.tension),backgroundColor:r.backgroundColor?r.backgroundColor:l.backgroundColor||s.backgroundColor,borderWidth:r.borderWidth?r.borderWidth:l.borderWidth||s.borderWidth,borderColor:r.borderColor?r.borderColor:l.borderColor||s.borderColor,fill:r.fill?r.fill:void 0!==l.fill?l.fill:s.fill,borderCapStyle:r.borderCapStyle?r.borderCapStyle:l.borderCapStyle||s.borderCapStyle,borderDash:r.borderDash?r.borderDash:l.borderDash||s.borderDash,borderDashOffset:r.borderDashOffset?r.borderDashOffset:l.borderDashOffset||s.borderDashOffset,borderJoinStyle:r.borderJoinStyle?r.borderJoinStyle:l.borderJoinStyle||s.borderJoinStyle,scaleTop:d.top,scaleBottom:d.bottom,scaleZero:d.getBasePosition()}}),i.dataset.pivot(),e.each(o,function(e,i){a.updateElement(e,i,t)},a),a.updateBezierControlPoints()},updateElement:function(t,a,i){var n=this,o=t.custom||{},r=n.getDataset(),l=n.chart.scale,s=n.chart.options.elements.point,d=l.getPointPositionForValue(a,r.data[a]);e.extend(t,{_datasetIndex:n.index,_index:a,_scale:l,_model:{x:i?l.xCenter:d.x,y:i?l.yCenter:d.y,tension:o.tension?o.tension:e.getValueOrDefault(r.tension,n.chart.options.elements.line.tension),radius:o.radius?o.radius:e.getValueAtIndexOrDefault(r.pointRadius,a,s.radius),backgroundColor:o.backgroundColor?o.backgroundColor:e.getValueAtIndexOrDefault(r.pointBackgroundColor,a,s.backgroundColor),borderColor:o.borderColor?o.borderColor:e.getValueAtIndexOrDefault(r.pointBorderColor,a,s.borderColor),borderWidth:o.borderWidth?o.borderWidth:e.getValueAtIndexOrDefault(r.pointBorderWidth,a,s.borderWidth),pointStyle:o.pointStyle?o.pointStyle:e.getValueAtIndexOrDefault(r.pointStyle,a,s.pointStyle),hitRadius:o.hitRadius?o.hitRadius:e.getValueAtIndexOrDefault(r.hitRadius,a,s.hitRadius)}}),t._model.skip=o.skip?o.skip:isNaN(t._model.x)||isNaN(t._model.y)},updateBezierControlPoints:function(){var t=this.chart.chartArea,a=this.getMeta();e.each(a.data,function(i,n){var o=i._model,r=e.splineCurve(e.previousItem(a.data,n,!0)._model,o,e.nextItem(a.data,n,!0)._model,o.tension);o.controlPointPreviousX=Math.max(Math.min(r.previous.x,t.right),t.left),o.controlPointPreviousY=Math.max(Math.min(r.previous.y,t.bottom),t.top),o.controlPointNextX=Math.max(Math.min(r.next.x,t.right),t.left),o.controlPointNextY=Math.max(Math.min(r.next.y,t.bottom),t.top),i.pivot()})},draw:function(t){var a=this.getMeta(),i=t||1;e.each(a.data,function(t,e){t.transition(i)}),a.dataset.transition(i).draw(),e.each(a.data,function(t){t.draw()})},setHoverStyle:function(t){var a=this.chart.data.datasets[t._datasetIndex],i=t.custom||{},n=t._index,o=t._model;o.radius=i.hoverRadius?i.hoverRadius:e.getValueAtIndexOrDefault(a.pointHoverRadius,n,this.chart.options.elements.point.hoverRadius),o.backgroundColor=i.hoverBackgroundColor?i.hoverBackgroundColor:e.getValueAtIndexOrDefault(a.pointHoverBackgroundColor,n,e.getHoverColor(o.backgroundColor)),o.borderColor=i.hoverBorderColor?i.hoverBorderColor:e.getValueAtIndexOrDefault(a.pointHoverBorderColor,n,e.getHoverColor(o.borderColor)),o.borderWidth=i.hoverBorderWidth?i.hoverBorderWidth:e.getValueAtIndexOrDefault(a.pointHoverBorderWidth,n,o.borderWidth)},removeHoverStyle:function(t){var a=this.chart.data.datasets[t._datasetIndex],i=t.custom||{},n=t._index,o=t._model,r=this.chart.options.elements.point;o.radius=i.radius?i.radius:e.getValueAtIndexOrDefault(a.radius,n,r.radius),o.backgroundColor=i.backgroundColor?i.backgroundColor:e.getValueAtIndexOrDefault(a.pointBackgroundColor,n,r.backgroundColor),o.borderColor=i.borderColor?i.borderColor:e.getValueAtIndexOrDefault(a.pointBorderColor,n,r.borderColor),o.borderWidth=i.borderWidth?i.borderWidth:e.getValueAtIndexOrDefault(a.pointBorderWidth,n,r.borderWidth)}})}},{}],21:[function(t,e,a){"use strict";e.exports=function(t){var e=t.helpers;t.defaults.global.animation={duration:1e3,easing:"easeOutQuart",onProgress:e.noop,onComplete:e.noop},t.Animation=t.Element.extend({currentStep:null,numSteps:60,easing:"",render:null,onAnimationProgress:null,onAnimationComplete:null}),t.animationService={frameDuration:17,animations:[],dropFrames:0,request:null,addAnimation:function(t,e,a,i){var n=this;i||(t.animating=!0);for(var o=0;o<n.animations.length;++o)if(n.animations[o].chartInstance===t)return void(n.animations[o].animationObject=e);n.animations.push({chartInstance:t,animationObject:e}),1===n.animations.length&&n.requestAnimationFrame()},cancelAnimation:function(t){var a=e.findIndex(this.animations,function(e){return e.chartInstance===t});-1!==a&&(this.animations.splice(a,1),t.animating=!1)},requestAnimationFrame:function(){var t=this;null===t.request&&(t.request=e.requestAnimFrame.call(window,function(){t.request=null,t.startDigest()}))},startDigest:function(){var t=this,e=Date.now(),a=0;t.dropFrames>1&&(a=Math.floor(t.dropFrames),t.dropFrames=t.dropFrames%1);for(var i=0;i<t.animations.length;)null===t.animations[i].animationObject.currentStep&&(t.animations[i].animationObject.currentStep=0),t.animations[i].animationObject.currentStep+=1+a,t.animations[i].animationObject.currentStep>t.animations[i].animationObject.numSteps&&(t.animations[i].animationObject.currentStep=t.animations[i].animationObject.numSteps),t.animations[i].animationObject.render(t.animations[i].chartInstance,t.animations[i].animationObject),t.animations[i].animationObject.onAnimationProgress&&t.animations[i].animationObject.onAnimationProgress.call&&t.animations[i].animationObject.onAnimationProgress.call(t.animations[i].chartInstance,t.animations[i]),t.animations[i].animationObject.currentStep===t.animations[i].animationObject.numSteps?(t.animations[i].animationObject.onAnimationComplete&&t.animations[i].animationObject.onAnimationComplete.call&&t.animations[i].animationObject.onAnimationComplete.call(t.animations[i].chartInstance,t.animations[i]),t.animations[i].chartInstance.animating=!1,t.animations.splice(i,1)):++i;var n=Date.now(),o=(n-e)/t.frameDuration;t.dropFrames+=o,t.animations.length>0&&t.requestAnimationFrame()}}}},{}],22:[function(t,e,a){"use strict";e.exports=function(t){var e=t.helpers;t.types={},t.instances={},t.controllers={},t.Controller=function(a){return this.chart=a,this.config=a.config,this.options=this.config.options=e.configMerge(t.defaults.global,t.defaults[this.config.type],this.config.options||{}),this.id=e.uid(),Object.defineProperty(this,"data",{get:function(){return this.config.data}}),t.instances[this.id]=this,this.options.responsive&&this.resize(!0),this.initialize(),this},e.extend(t.Controller.prototype,{initialize:function(){var e=this;return t.plugins.notify("beforeInit",[e]),e.bindEvents(),e.ensureScalesHaveIDs(),e.buildOrUpdateControllers(),e.buildScales(),e.updateLayout(),e.resetElements(),e.initToolTip(),e.update(),t.plugins.notify("afterInit",[e]),e},clear:function(){return e.clear(this.chart),this},stop:function(){return t.animationService.cancelAnimation(this),this},resize:function(a){var i=this,n=i.chart,o=n.canvas,r=e.getMaximumWidth(o),l=n.aspectRatio,s=i.options.maintainAspectRatio&&isNaN(l)===!1&&isFinite(l)&&0!==l?r/l:e.getMaximumHeight(o),d=n.width!==r||n.height!==s;if(!d)return i;o.width=n.width=r,o.height=n.height=s,e.retinaScale(n);var u={width:r,height:s};return t.plugins.notify("resize",[i,u]),i.options.onResize&&i.options.onResize(i,u),a||(i.stop(),i.update(i.options.responsiveAnimationDuration)),i},ensureScalesHaveIDs:function(){var t=this.options,a=t.scales||{},i=t.scale;e.each(a.xAxes,function(t,e){t.id=t.id||"x-axis-"+e}),e.each(a.yAxes,function(t,e){t.id=t.id||"y-axis-"+e}),i&&(i.id=i.id||"scale")},buildScales:function(){var a=this,i=a.options,n=a.scales={},o=[];i.scales&&(o=o.concat((i.scales.xAxes||[]).map(function(t){return{options:t,dtype:"category"}}),(i.scales.yAxes||[]).map(function(t){return{options:t,dtype:"linear"}}))),i.scale&&o.push({options:i.scale,dtype:"radialLinear",isDefault:!0}),e.each(o,function(i,o){var r=i.options,l=e.getValueOrDefault(r.type,i.dtype),s=t.scaleService.getScaleConstructor(l);if(s){var d=new s({id:r.id,options:r,ctx:a.chart.ctx,chart:a});n[d.id]=d,i.isDefault&&(a.scale=d)}}),t.scaleService.addScalesToLayout(this)},updateLayout:function(){t.layoutService.update(this,this.chart.width,this.chart.height)},buildOrUpdateControllers:function(){var a=this,i=[],n=[];if(e.each(a.data.datasets,function(e,o){var r=a.getDatasetMeta(o);r.type||(r.type=e.type||a.config.type),i.push(r.type),r.controller?r.controller.updateIndex(o):(r.controller=new t.controllers[r.type](a,o),n.push(r.controller))},a),i.length>1)for(var o=1;o<i.length;o++)if(i[o]!==i[o-1]){a.isCombo=!0;break}return n},resetElements:function(){var t=this;e.each(t.data.datasets,function(e,a){t.getDatasetMeta(a).controller.reset()},t)},update:function(a,i){var n=this;t.plugins.notify("beforeUpdate",[n]),n.tooltip._data=n.data;var o=n.buildOrUpdateControllers();e.each(n.data.datasets,function(t,e){n.getDatasetMeta(e).controller.buildOrUpdateElements()},n),t.layoutService.update(n,n.chart.width,n.chart.height),t.plugins.notify("afterScaleUpdate",[n]),e.each(o,function(t){t.reset()}),n.updateDatasets(),t.plugins.notify("afterUpdate",[n]),n.render(a,i)},updateDatasets:function(){var e,a,i=this;if(t.plugins.notify("beforeDatasetsUpdate",[i])){for(e=0,a=i.data.datasets.length;a>e;++e)i.getDatasetMeta(e).controller.update();t.plugins.notify("afterDatasetsUpdate",[i])}},render:function(a,i){var n=this;t.plugins.notify("beforeRender",[n]);var o=n.options.animation;if(o&&("undefined"!=typeof a&&0!==a||"undefined"==typeof a&&0!==o.duration)){var r=new t.Animation;r.numSteps=(a||o.duration)/16.66,r.easing=o.easing,r.render=function(t,a){var i=e.easingEffects[a.easing],n=a.currentStep/a.numSteps,o=i(n);t.draw(o,n,a.currentStep)},r.onAnimationProgress=o.onProgress,r.onAnimationComplete=o.onComplete,t.animationService.addAnimation(n,r,a,i)}else n.draw(),o&&o.onComplete&&o.onComplete.call&&o.onComplete.call(n);return n},draw:function(a){var i=this,n=a||1;i.clear(),t.plugins.notify("beforeDraw",[i,n]),e.each(i.boxes,function(t){t.draw(i.chartArea)},i),i.scale&&i.scale.draw(),t.plugins.notify("beforeDatasetsDraw",[i,n]),e.each(i.data.datasets,function(t,e){i.isDatasetVisible(e)&&i.getDatasetMeta(e).controller.draw(a)},i,!0),t.plugins.notify("afterDatasetsDraw",[i,n]),i.tooltip.transition(n).draw(),t.plugins.notify("afterDraw",[i,n])},getElementAtEvent:function(t){var a=this,i=e.getRelativePosition(t,a.chart),n=[];return e.each(a.data.datasets,function(t,o){if(a.isDatasetVisible(o)){var r=a.getDatasetMeta(o);e.each(r.data,function(t,e){return t.inRange(i.x,i.y)?(n.push(t),n):void 0})}}),n},getElementsAtEvent:function(t){var a=this,i=e.getRelativePosition(t,a.chart),n=[],o=function(){if(a.data.datasets)for(var t=0;t<a.data.datasets.length;t++){var e=a.getDatasetMeta(t);if(a.isDatasetVisible(t))for(var n=0;n<e.data.length;n++)if(e.data[n].inRange(i.x,i.y))return e.data[n]}}.call(a);return o?(e.each(a.data.datasets,function(t,e){if(a.isDatasetVisible(e)){var i=a.getDatasetMeta(e);n.push(i.data[o._index])}},a),n):n},getElementsAtEventForMode:function(t,e){var a=this;switch(e){case"single":return a.getElementAtEvent(t);case"label":return a.getElementsAtEvent(t);case"dataset":return a.getDatasetAtEvent(t);default:return t}},getDatasetAtEvent:function(t){var e=this.getElementAtEvent(t);return e.length>0&&(e=this.getDatasetMeta(e[0]._datasetIndex).data),e},getDatasetMeta:function(t){var e=this,a=e.data.datasets[t];a._meta||(a._meta={});var i=a._meta[e.id];return i||(i=a._meta[e.id]={type:null,data:[],dataset:null,controller:null,hidden:null,xAxisID:null,yAxisID:null}),i},getVisibleDatasetCount:function(){for(var t=0,e=0,a=this.data.datasets.length;a>e;++e)this.isDatasetVisible(e)&&t++;return t},isDatasetVisible:function(t){var e=this.getDatasetMeta(t);return"boolean"==typeof e.hidden?!e.hidden:!this.data.datasets[t].hidden},generateLegend:function(){return this.options.legendCallback(this)},destroy:function(){var a=this;a.stop(),a.clear(),e.unbindEvents(a,a.events),e.removeResizeListener(a.chart.canvas.parentNode);var i=a.chart.canvas;i.width=a.chart.width,i.height=a.chart.height,void 0!==a.chart.originalDevicePixelRatio&&a.chart.ctx.scale(1/a.chart.originalDevicePixelRatio,1/a.chart.originalDevicePixelRatio),i.style.width=a.chart.originalCanvasStyleWidth,i.style.height=a.chart.originalCanvasStyleHeight,t.plugins.notify("destroy",[a]),delete t.instances[a.id]},toBase64Image:function(){return this.chart.canvas.toDataURL.apply(this.chart.canvas,arguments)},initToolTip:function(){var e=this;e.tooltip=new t.Tooltip({_chart:e.chart,_chartInstance:e,_data:e.data,_options:e.options.tooltips},e)},bindEvents:function(){var t=this;e.bindEvents(t,t.options.events,function(e){t.eventHandler(e)})},updateHoverStyle:function(t,e,a){var i,n,o,r=a?"setHoverStyle":"removeHoverStyle";switch(e){case"single":t=[t[0]];break;case"label":case"dataset":break;default:return}for(n=0,o=t.length;o>n;++n)i=t[n],i&&this.getDatasetMeta(i._datasetIndex).controller[r](i)},eventHandler:function(t){var a=this,i=a.tooltip,n=a.options||{},o=n.hover,r=n.tooltips;return a.lastActive=a.lastActive||[],a.lastTooltipActive=a.lastTooltipActive||[],"mouseout"===t.type?(a.active=[],a.tooltipActive=[]):(a.active=a.getElementsAtEventForMode(t,o.mode),a.tooltipActive=a.getElementsAtEventForMode(t,r.mode)),o.onHover&&o.onHover.call(a,a.active),("mouseup"===t.type||"click"===t.type)&&(n.onClick&&n.onClick.call(a,t,a.active),a.legend&&a.legend.handleEvent&&a.legend.handleEvent(t)),a.lastActive.length&&a.updateHoverStyle(a.lastActive,o.mode,!1),a.active.length&&o.mode&&a.updateHoverStyle(a.active,o.mode,!0),(r.enabled||r.custom)&&(i.initialize(),i._active=a.tooltipActive,i.update(!0)),i.pivot(),a.animating||e.arrayEquals(a.active,a.lastActive)&&e.arrayEquals(a.tooltipActive,a.lastTooltipActive)||(a.stop(),(r.enabled||r.custom)&&i.update(!0),a.render(o.animationDuration,!0)),a.lastActive=a.active,a.lastTooltipActive=a.tooltipActive,a}})}},{}],23:[function(t,e,a){"use strict";e.exports=function(t){var e=t.helpers,a=e.noop;t.DatasetController=function(t,e){this.initialize.call(this,t,e)},e.extend(t.DatasetController.prototype,{datasetElementType:null,dataElementType:null,initialize:function(t,e){var a=this;a.chart=t,a.index=e,a.linkScales(),a.addElements()},updateIndex:function(t){this.index=t},linkScales:function(){var t=this,e=t.getMeta(),a=t.getDataset();null===e.xAxisID&&(e.xAxisID=a.xAxisID||t.chart.options.scales.xAxes[0].id),null===e.yAxisID&&(e.yAxisID=a.yAxisID||t.chart.options.scales.yAxes[0].id);
},getDataset:function(){return this.chart.data.datasets[this.index]},getMeta:function(){return this.chart.getDatasetMeta(this.index)},getScaleForId:function(t){return this.chart.scales[t]},reset:function(){this.update(!0)},createMetaDataset:function(){var t=this,e=t.datasetElementType;return e&&new e({_chart:t.chart.chart,_datasetIndex:t.index})},createMetaData:function(t){var e=this,a=e.dataElementType;return a&&new a({_chart:e.chart.chart,_datasetIndex:e.index,_index:t})},addElements:function(){var t,e,a=this,i=a.getMeta(),n=a.getDataset().data||[],o=i.data;for(t=0,e=n.length;e>t;++t)o[t]=o[t]||a.createMetaData(i,t);i.dataset=i.dataset||a.createMetaDataset()},addElementAndReset:function(t){var e=this,a=e.createMetaData(t);e.getMeta().data.splice(t,0,a),e.updateElement(a,t,!0)},buildOrUpdateElements:function(){var t=this.getMeta(),e=t.data,a=this.getDataset().data.length,i=e.length;if(i>a)e.splice(a,i-a);else if(a>i)for(var n=i;a>n;++n)this.addElementAndReset(n)},update:a,draw:function(t){var a=t||1;e.each(this.getMeta().data,function(t,e){t.transition(a).draw()})},removeHoverStyle:function(t,a){var i=this.chart.data.datasets[t._datasetIndex],n=t._index,o=t.custom||{},r=e.getValueAtIndexOrDefault,l=(e.color,t._model);l.backgroundColor=o.backgroundColor?o.backgroundColor:r(i.backgroundColor,n,a.backgroundColor),l.borderColor=o.borderColor?o.borderColor:r(i.borderColor,n,a.borderColor),l.borderWidth=o.borderWidth?o.borderWidth:r(i.borderWidth,n,a.borderWidth)},setHoverStyle:function(t){var a=this.chart.data.datasets[t._datasetIndex],i=t._index,n=t.custom||{},o=e.getValueAtIndexOrDefault,r=(e.color,e.getHoverColor),l=t._model;l.backgroundColor=n.hoverBackgroundColor?n.hoverBackgroundColor:o(a.hoverBackgroundColor,i,r(l.backgroundColor)),l.borderColor=n.hoverBorderColor?n.hoverBorderColor:o(a.hoverBorderColor,i,r(l.borderColor)),l.borderWidth=n.hoverBorderWidth?n.hoverBorderWidth:o(a.hoverBorderWidth,i,l.borderWidth)}}),t.DatasetController.extend=e.inherits}},{}],24:[function(t,e,a){"use strict";e.exports=function(t){var e=t.helpers;t.elements={},t.Element=function(t){e.extend(this,t),this.initialize.apply(this,arguments)},e.extend(t.Element.prototype,{initialize:function(){this.hidden=!1},pivot:function(){var t=this;return t._view||(t._view=e.clone(t._model)),t._start=e.clone(t._view),t},transition:function(t){var a=this;return a._view||(a._view=e.clone(a._model)),1===t?(a._view=a._model,a._start=null,a):(a._start||a.pivot(),e.each(a._model,function(i,n){if("_"===n[0]);else if(a._view.hasOwnProperty(n))if(i===a._view[n]);else if("string"==typeof i)try{var o=e.color(a._model[n]).mix(e.color(a._start[n]),t);a._view[n]=o.rgbString()}catch(r){a._view[n]=i}else if("number"==typeof i){var l=void 0!==a._start[n]&&isNaN(a._start[n])===!1?a._start[n]:0;a._view[n]=(a._model[n]-l)*t+l}else a._view[n]=i;else"number"!=typeof i||isNaN(a._view[n])?a._view[n]=i:a._view[n]=i*t},a),a)},tooltipPosition:function(){return{x:this._model.x,y:this._model.y}},hasValue:function(){return e.isNumber(this._model.x)&&e.isNumber(this._model.y)}}),t.Element.extend=e.inherits}},{}],25:[function(t,e,a){"use strict";var i=t(3);e.exports=function(t){function e(t,e,a){var i;return"string"==typeof t?(i=parseInt(t,10),-1!=t.indexOf("%")&&(i=i/100*e.parentNode[a])):i=t,i}function a(t){return void 0!==t&&null!==t&&"none"!==t}function n(t,i,n){var o=document.defaultView,r=t.parentNode,l=o.getComputedStyle(t)[i],s=o.getComputedStyle(r)[i],d=a(l),u=a(s),c=Number.POSITIVE_INFINITY;return d||u?Math.min(d?e(l,t,n):c,u?e(s,r,n):c):"none"}var o=t.helpers={};o.each=function(t,e,a,i){var n,r;if(o.isArray(t))if(r=t.length,i)for(n=r-1;n>=0;n--)e.call(a,t[n],n);else for(n=0;r>n;n++)e.call(a,t[n],n);else if("object"==typeof t){var l=Object.keys(t);for(r=l.length,n=0;r>n;n++)e.call(a,t[l[n]],l[n])}},o.clone=function(t){var e={};return o.each(t,function(t,a){o.isArray(t)?e[a]=t.slice(0):"object"==typeof t&&null!==t?e[a]=o.clone(t):e[a]=t}),e},o.extend=function(t){for(var e=function(e,a){t[a]=e},a=1,i=arguments.length;i>a;a++)o.each(arguments[a],e);return t},o.configMerge=function(e){var a=o.clone(e);return o.each(Array.prototype.slice.call(arguments,1),function(e){o.each(e,function(e,i){if("scales"===i)a[i]=o.scaleMerge(a.hasOwnProperty(i)?a[i]:{},e);else if("scale"===i)a[i]=o.configMerge(a.hasOwnProperty(i)?a[i]:{},t.scaleService.getScaleDefaults(e.type),e);else if(a.hasOwnProperty(i)&&o.isArray(a[i])&&o.isArray(e)){var n=a[i];o.each(e,function(t,e){e<n.length?"object"==typeof n[e]&&null!==n[e]&&"object"==typeof t&&null!==t?n[e]=o.configMerge(n[e],t):n[e]=t:n.push(t)})}else a.hasOwnProperty(i)&&"object"==typeof a[i]&&null!==a[i]&&"object"==typeof e?a[i]=o.configMerge(a[i],e):a[i]=e})}),a},o.scaleMerge=function(e,a){var i=o.clone(e);return o.each(a,function(e,a){"xAxes"===a||"yAxes"===a?i.hasOwnProperty(a)?o.each(e,function(e,n){var r=o.getValueOrDefault(e.type,"xAxes"===a?"category":"linear"),l=t.scaleService.getScaleDefaults(r);n>=i[a].length||!i[a][n].type?i[a].push(o.configMerge(l,e)):e.type&&e.type!==i[a][n].type?i[a][n]=o.configMerge(i[a][n],l,e):i[a][n]=o.configMerge(i[a][n],e)}):(i[a]=[],o.each(e,function(e){var n=o.getValueOrDefault(e.type,"xAxes"===a?"category":"linear");i[a].push(o.configMerge(t.scaleService.getScaleDefaults(n),e))})):i.hasOwnProperty(a)&&"object"==typeof i[a]&&null!==i[a]&&"object"==typeof e?i[a]=o.configMerge(i[a],e):i[a]=e}),i},o.getValueAtIndexOrDefault=function(t,e,a){return void 0===t||null===t?a:o.isArray(t)?e<t.length?t[e]:a:t},o.getValueOrDefault=function(t,e){return void 0===t?e:t},o.indexOf=Array.prototype.indexOf?function(t,e){return t.indexOf(e)}:function(t,e){for(var a=0,i=t.length;i>a;++a)if(t[a]===e)return a;return-1},o.where=function(t,e){if(o.isArray(t)&&Array.prototype.filter)return t.filter(e);var a=[];return o.each(t,function(t){e(t)&&a.push(t)}),a},o.findIndex=Array.prototype.findIndex?function(t,e,a){return t.findIndex(e,a)}:function(t,e,a){a=void 0===a?t:a;for(var i=0,n=t.length;n>i;++i)if(e.call(a,t[i],i,t))return i;return-1},o.findNextWhere=function(t,e,a){(void 0===a||null===a)&&(a=-1);for(var i=a+1;i<t.length;i++){var n=t[i];if(e(n))return n}},o.findPreviousWhere=function(t,e,a){(void 0===a||null===a)&&(a=t.length);for(var i=a-1;i>=0;i--){var n=t[i];if(e(n))return n}},o.inherits=function(t){var e=this,a=t&&t.hasOwnProperty("constructor")?t.constructor:function(){return e.apply(this,arguments)},i=function(){this.constructor=a};return i.prototype=e.prototype,a.prototype=new i,a.extend=o.inherits,t&&o.extend(a.prototype,t),a.__super__=e.prototype,a},o.noop=function(){},o.uid=function(){var t=0;return function(){return t++}}(),o.isNumber=function(t){return!isNaN(parseFloat(t))&&isFinite(t)},o.almostEquals=function(t,e,a){return Math.abs(t-e)<a},o.max=function(t){return t.reduce(function(t,e){return isNaN(e)?t:Math.max(t,e)},Number.NEGATIVE_INFINITY)},o.min=function(t){return t.reduce(function(t,e){return isNaN(e)?t:Math.min(t,e)},Number.POSITIVE_INFINITY)},o.sign=Math.sign?function(t){return Math.sign(t)}:function(t){return t=+t,0===t||isNaN(t)?t:t>0?1:-1},o.log10=Math.log10?function(t){return Math.log10(t)}:function(t){return Math.log(t)/Math.LN10},o.toRadians=function(t){return t*(Math.PI/180)},o.toDegrees=function(t){return t*(180/Math.PI)},o.getAngleFromPoint=function(t,e){var a=e.x-t.x,i=e.y-t.y,n=Math.sqrt(a*a+i*i),o=Math.atan2(i,a);return o<-.5*Math.PI&&(o+=2*Math.PI),{angle:o,distance:n}},o.aliasPixel=function(t){return t%2===0?0:.5},o.splineCurve=function(t,e,a,i){var n=t.skip?e:t,o=e,r=a.skip?e:a,l=Math.sqrt(Math.pow(o.x-n.x,2)+Math.pow(o.y-n.y,2)),s=Math.sqrt(Math.pow(r.x-o.x,2)+Math.pow(r.y-o.y,2)),d=l/(l+s),u=s/(l+s);d=isNaN(d)?0:d,u=isNaN(u)?0:u;var c=i*d,h=i*u;return{previous:{x:o.x-c*(r.x-n.x),y:o.y-c*(r.y-n.y)},next:{x:o.x+h*(r.x-n.x),y:o.y+h*(r.y-n.y)}}},o.nextItem=function(t,e,a){return a?e>=t.length-1?t[0]:t[e+1]:e>=t.length-1?t[t.length-1]:t[e+1]},o.previousItem=function(t,e,a){return a?0>=e?t[t.length-1]:t[e-1]:0>=e?t[0]:t[e-1]},o.niceNum=function(t,e){var a,i=Math.floor(o.log10(t)),n=t/Math.pow(10,i);return a=e?1.5>n?1:3>n?2:7>n?5:10:1>=n?1:2>=n?2:5>=n?5:10,a*Math.pow(10,i)};var r=o.easingEffects={linear:function(t){return t},easeInQuad:function(t){return t*t},easeOutQuad:function(t){return-1*t*(t-2)},easeInOutQuad:function(t){return(t/=.5)<1?.5*t*t:-0.5*(--t*(t-2)-1)},easeInCubic:function(t){return t*t*t},easeOutCubic:function(t){return 1*((t=t/1-1)*t*t+1)},easeInOutCubic:function(t){return(t/=.5)<1?.5*t*t*t:.5*((t-=2)*t*t+2)},easeInQuart:function(t){return t*t*t*t},easeOutQuart:function(t){return-1*((t=t/1-1)*t*t*t-1)},easeInOutQuart:function(t){return(t/=.5)<1?.5*t*t*t*t:-0.5*((t-=2)*t*t*t-2)},easeInQuint:function(t){return 1*(t/=1)*t*t*t*t},easeOutQuint:function(t){return 1*((t=t/1-1)*t*t*t*t+1)},easeInOutQuint:function(t){return(t/=.5)<1?.5*t*t*t*t*t:.5*((t-=2)*t*t*t*t+2)},easeInSine:function(t){return-1*Math.cos(t/1*(Math.PI/2))+1},easeOutSine:function(t){return 1*Math.sin(t/1*(Math.PI/2))},easeInOutSine:function(t){return-0.5*(Math.cos(Math.PI*t/1)-1)},easeInExpo:function(t){return 0===t?1:1*Math.pow(2,10*(t/1-1))},easeOutExpo:function(t){return 1===t?1:1*(-Math.pow(2,-10*t/1)+1)},easeInOutExpo:function(t){return 0===t?0:1===t?1:(t/=.5)<1?.5*Math.pow(2,10*(t-1)):.5*(-Math.pow(2,-10*--t)+2)},easeInCirc:function(t){return t>=1?t:-1*(Math.sqrt(1-(t/=1)*t)-1)},easeOutCirc:function(t){return 1*Math.sqrt(1-(t=t/1-1)*t)},easeInOutCirc:function(t){return(t/=.5)<1?-0.5*(Math.sqrt(1-t*t)-1):.5*(Math.sqrt(1-(t-=2)*t)+1)},easeInElastic:function(t){var e=1.70158,a=0,i=1;return 0===t?0:1===(t/=1)?1:(a||(a=.3),i<Math.abs(1)?(i=1,e=a/4):e=a/(2*Math.PI)*Math.asin(1/i),-(i*Math.pow(2,10*(t-=1))*Math.sin((1*t-e)*(2*Math.PI)/a)))},easeOutElastic:function(t){var e=1.70158,a=0,i=1;return 0===t?0:1===(t/=1)?1:(a||(a=.3),i<Math.abs(1)?(i=1,e=a/4):e=a/(2*Math.PI)*Math.asin(1/i),i*Math.pow(2,-10*t)*Math.sin((1*t-e)*(2*Math.PI)/a)+1)},easeInOutElastic:function(t){var e=1.70158,a=0,i=1;return 0===t?0:2===(t/=.5)?1:(a||(a=1*(.3*1.5)),i<Math.abs(1)?(i=1,e=a/4):e=a/(2*Math.PI)*Math.asin(1/i),1>t?-.5*(i*Math.pow(2,10*(t-=1))*Math.sin((1*t-e)*(2*Math.PI)/a)):i*Math.pow(2,-10*(t-=1))*Math.sin((1*t-e)*(2*Math.PI)/a)*.5+1)},easeInBack:function(t){var e=1.70158;return 1*(t/=1)*t*((e+1)*t-e)},easeOutBack:function(t){var e=1.70158;return 1*((t=t/1-1)*t*((e+1)*t+e)+1)},easeInOutBack:function(t){var e=1.70158;return(t/=.5)<1?.5*(t*t*(((e*=1.525)+1)*t-e)):.5*((t-=2)*t*(((e*=1.525)+1)*t+e)+2)},easeInBounce:function(t){return 1-r.easeOutBounce(1-t)},easeOutBounce:function(t){return(t/=1)<1/2.75?1*(7.5625*t*t):2/2.75>t?1*(7.5625*(t-=1.5/2.75)*t+.75):2.5/2.75>t?1*(7.5625*(t-=2.25/2.75)*t+.9375):1*(7.5625*(t-=2.625/2.75)*t+.984375)},easeInOutBounce:function(t){return.5>t?.5*r.easeInBounce(2*t):.5*r.easeOutBounce(2*t-1)+.5}};o.requestAnimFrame=function(){return window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||window.oRequestAnimationFrame||window.msRequestAnimationFrame||function(t){return window.setTimeout(t,1e3/60)}}(),o.cancelAnimFrame=function(){return window.cancelAnimationFrame||window.webkitCancelAnimationFrame||window.mozCancelAnimationFrame||window.oCancelAnimationFrame||window.msCancelAnimationFrame||function(t){return window.clearTimeout(t,1e3/60)}}(),o.getRelativePosition=function(t,e){var a,i,n=t.originalEvent||t,r=t.currentTarget||t.srcElement,l=r.getBoundingClientRect(),s=n.touches;s&&s.length>0?(a=s[0].clientX,i=s[0].clientY):(a=n.clientX,i=n.clientY);var d=parseFloat(o.getStyle(r,"padding-left")),u=parseFloat(o.getStyle(r,"padding-top")),c=parseFloat(o.getStyle(r,"padding-right")),h=parseFloat(o.getStyle(r,"padding-bottom")),f=l.right-l.left-d-c,g=l.bottom-l.top-u-h;return a=Math.round((a-l.left-d)/f*r.width/e.currentDevicePixelRatio),i=Math.round((i-l.top-u)/g*r.height/e.currentDevicePixelRatio),{x:a,y:i}},o.addEvent=function(t,e,a){t.addEventListener?t.addEventListener(e,a):t.attachEvent?t.attachEvent("on"+e,a):t["on"+e]=a},o.removeEvent=function(t,e,a){t.removeEventListener?t.removeEventListener(e,a,!1):t.detachEvent?t.detachEvent("on"+e,a):t["on"+e]=o.noop},o.bindEvents=function(t,e,a){var i=t.events=t.events||{};o.each(e,function(e){i[e]=function(){a.apply(t,arguments)},o.addEvent(t.chart.canvas,e,i[e])})},o.unbindEvents=function(t,e){var a=t.chart.canvas;o.each(e,function(t,e){o.removeEvent(a,e,t)})},o.getConstraintWidth=function(t){return n(t,"max-width","clientWidth")},o.getConstraintHeight=function(t){return n(t,"max-height","clientHeight")},o.getMaximumWidth=function(t){var e=t.parentNode,a=parseInt(o.getStyle(e,"padding-left"))+parseInt(o.getStyle(e,"padding-right")),i=e.clientWidth-a,n=o.getConstraintWidth(t);return isNaN(n)?i:Math.min(i,n)},o.getMaximumHeight=function(t){var e=t.parentNode,a=parseInt(o.getStyle(e,"padding-top"))+parseInt(o.getStyle(e,"padding-bottom")),i=e.clientHeight-a,n=o.getConstraintHeight(t);return isNaN(n)?i:Math.min(i,n)},o.getStyle=function(t,e){return t.currentStyle?t.currentStyle[e]:document.defaultView.getComputedStyle(t,null).getPropertyValue(e)},o.retinaScale=function(t){var e=t.ctx,a=t.canvas,i=a.width,n=a.height,o=t.currentDevicePixelRatio=window.devicePixelRatio||1;1!==o&&(a.height=n*o,a.width=i*o,e.scale(o,o),t.originalDevicePixelRatio=t.originalDevicePixelRatio||o),a.style.width=i+"px",a.style.height=n+"px"},o.clear=function(t){t.ctx.clearRect(0,0,t.width,t.height)},o.fontString=function(t,e,a){return e+" "+t+"px "+a},o.longestText=function(t,e,a,i){i=i||{};var n=i.data=i.data||{},r=i.garbageCollect=i.garbageCollect||[];i.font!==e&&(n=i.data={},r=i.garbageCollect=[],i.font=e),t.font=e;var l=0;o.each(a,function(e){void 0!==e&&null!==e&&o.isArray(e)!==!0?l=o.measureText(t,n,r,l,e):o.isArray(e)&&o.each(e,function(e){void 0===e||null===e||o.isArray(e)||(l=o.measureText(t,n,r,l,e))})});var s=r.length/2;if(s>a.length){for(var d=0;s>d;d++)delete n[r[d]];r.splice(0,s)}return l},o.measureText=function(t,e,a,i,n){var o=e[n];return o||(o=e[n]=t.measureText(n).width,a.push(n)),o>i&&(i=o),i},o.numberOfLabelLines=function(t){var e=1;return o.each(t,function(t){o.isArray(t)&&t.length>e&&(e=t.length)}),e},o.drawRoundedRectangle=function(t,e,a,i,n,o){t.beginPath(),t.moveTo(e+o,a),t.lineTo(e+i-o,a),t.quadraticCurveTo(e+i,a,e+i,a+o),t.lineTo(e+i,a+n-o),t.quadraticCurveTo(e+i,a+n,e+i-o,a+n),t.lineTo(e+o,a+n),t.quadraticCurveTo(e,a+n,e,a+n-o),t.lineTo(e,a+o),t.quadraticCurveTo(e,a,e+o,a),t.closePath()},o.color=function(e){return i?i(e instanceof CanvasGradient?t.defaults.global.defaultColor:e):(console.log("Color.js not found!"),e)},o.addResizeListener=function(t,e){var a=document.createElement("iframe"),i="chartjs-hidden-iframe";a.classlist?a.classlist.add(i):a.setAttribute("class",i);var n=a.style;n.width="100%",n.display="block",n.border=0,n.height=0,n.margin=0,n.position="absolute",n.left=0,n.right=0,n.top=0,n.bottom=0,t.insertBefore(a,t.firstChild),(a.contentWindow||a).onresize=function(){e&&e()}},o.removeResizeListener=function(t){var e=t.querySelector(".chartjs-hidden-iframe");e&&e.parentNode.removeChild(e)},o.isArray=Array.isArray?function(t){return Array.isArray(t)}:function(t){return"[object Array]"===Object.prototype.toString.call(t)},o.arrayEquals=function(t,e){var a,i,n,r;if(!t||!e||t.length!=e.length)return!1;for(a=0,i=t.length;i>a;++a)if(n=t[a],r=e[a],n instanceof Array&&r instanceof Array){if(!o.arrayEquals(n,r))return!1}else if(n!=r)return!1;return!0},o.callCallback=function(t,e,a){t&&"function"==typeof t.call&&t.apply(a,e)},o.getHoverColor=function(t){return t instanceof CanvasPattern?t:o.color(t).saturate(.5).darken(.1).rgbString()}}},{3:3}],26:[function(t,e,a){"use strict";e.exports=function(){var t=function(e,a){var i=this,n=t.helpers;return i.config=a,e.length&&e[0].getContext&&(e=e[0]),e.getContext&&(e=e.getContext("2d")),i.ctx=e,i.canvas=e.canvas,e.canvas.style.display=e.canvas.style.display||"block",i.width=e.canvas.width||parseInt(n.getStyle(e.canvas,"width"),10)||n.getMaximumWidth(e.canvas),i.height=e.canvas.height||parseInt(n.getStyle(e.canvas,"height"),10)||n.getMaximumHeight(e.canvas),i.aspectRatio=i.width/i.height,(isNaN(i.aspectRatio)||isFinite(i.aspectRatio)===!1)&&(i.aspectRatio=void 0!==a.aspectRatio?a.aspectRatio:2),i.originalCanvasStyleWidth=e.canvas.style.width,i.originalCanvasStyleHeight=e.canvas.style.height,n.retinaScale(i),a&&(i.controller=new t.Controller(i)),n.addResizeListener(e.canvas.parentNode,function(){i.controller&&i.controller.config.options.responsive&&i.controller.resize()}),i.controller?i.controller:i};return t.defaults={global:{responsive:!0,responsiveAnimationDuration:0,maintainAspectRatio:!0,events:["mousemove","mouseout","click","touchstart","touchmove"],hover:{onHover:null,mode:"single",animationDuration:400},onClick:null,defaultColor:"rgba(0,0,0,0.1)",defaultFontColor:"#666",defaultFontFamily:"'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",defaultFontSize:12,defaultFontStyle:"normal",showLines:!0,elements:{},legendCallback:function(t){var e=[];e.push('<ul class="'+t.id+'-legend">');for(var a=0;a<t.data.datasets.length;a++)e.push('<li><span style="background-color:'+t.data.datasets[a].backgroundColor+'"></span>'),t.data.datasets[a].label&&e.push(t.data.datasets[a].label),e.push("</li>");return e.push("</ul>"),e.join("")}}},t.Chart=t,t}},{}],27:[function(t,e,a){"use strict";e.exports=function(t){var e=t.helpers;t.layoutService={defaults:{},addBox:function(t,e){t.boxes||(t.boxes=[]),t.boxes.push(e)},removeBox:function(t,e){t.boxes&&t.boxes.splice(t.boxes.indexOf(e),1)},update:function(t,a,i){function n(t){var e,a=t.isHorizontal();a?(e=t.update(t.options.fullWidth?p:k,y),S-=e.height):(e=t.update(x,v),k-=e.width),w.push({horizontal:a,minSize:e,box:t})}function o(t){var a=e.findNextWhere(w,function(e){return e.box===t});if(a)if(t.isHorizontal()){var i={left:C,right:M,top:0,bottom:0};t.update(t.options.fullWidth?p:k,m/2,i)}else t.update(a.minSize.width,S)}function r(t){var a=e.findNextWhere(w,function(e){return e.box===t}),i={left:0,right:0,top:D,bottom:A};a&&t.update(a.minSize.width,S,i)}function l(t){t.isHorizontal()?(t.left=t.options.fullWidth?s:C,t.right=t.options.fullWidth?a-s:C+k,t.top=P,t.bottom=P+t.height,P=t.bottom):(t.left=T,t.right=T+t.width,t.top=D,t.bottom=D+S,T=t.right)}if(t){var s=0,d=0,u=e.where(t.boxes,function(t){return"left"===t.options.position}),c=e.where(t.boxes,function(t){return"right"===t.options.position}),h=e.where(t.boxes,function(t){return"top"===t.options.position}),f=e.where(t.boxes,function(t){return"bottom"===t.options.position}),g=e.where(t.boxes,function(t){return"chartArea"===t.options.position});h.sort(function(t,e){return(e.options.fullWidth?1:0)-(t.options.fullWidth?1:0)}),f.sort(function(t,e){return(t.options.fullWidth?1:0)-(e.options.fullWidth?1:0)});var p=a-2*s,m=i-2*d,b=p/2,v=m/2,x=(a-b)/(u.length+c.length),y=(i-v)/(h.length+f.length),k=p,S=m,w=[];e.each(u.concat(c,h,f),n);var C=s,M=s,D=d,A=d;e.each(u.concat(c),o),e.each(u,function(t){C+=t.width}),e.each(c,function(t){M+=t.width}),e.each(h.concat(f),o),e.each(h,function(t){D+=t.height}),e.each(f,function(t){A+=t.height}),e.each(u.concat(c),r),C=s,M=s,D=d,A=d,e.each(u,function(t){C+=t.width}),e.each(c,function(t){M+=t.width}),e.each(h,function(t){D+=t.height}),e.each(f,function(t){A+=t.height});var I=i-D-A,F=a-C-M;(F!==k||I!==S)&&(e.each(u,function(t){t.height=I}),e.each(c,function(t){t.height=I}),e.each(h,function(t){t.options.fullWidth||(t.width=F)}),e.each(f,function(t){t.options.fullWidth||(t.width=F)}),S=I,k=F);var T=s,P=d;e.each(u.concat(h),l),T+=k,P+=S,e.each(c,l),e.each(f,l),t.chartArea={left:C,top:D,right:C+k,bottom:D+S},e.each(g,function(e){e.left=t.chartArea.left,e.top=t.chartArea.top,e.right=t.chartArea.right,e.bottom=t.chartArea.bottom,e.update(k,S)})}}}}},{}],28:[function(t,e,a){"use strict";e.exports=function(t){var e=t.helpers,a=e.noop;t.defaults.global.legend={display:!0,position:"top",fullWidth:!0,reverse:!1,onClick:function(t,e){var a=e.datasetIndex,i=this.chart,n=i.getDatasetMeta(a);n.hidden=null===n.hidden?!i.data.datasets[a].hidden:null,i.update()},labels:{boxWidth:40,padding:10,generateLabels:function(t){var a=t.data;return e.isArray(a.datasets)?a.datasets.map(function(a,i){return{text:a.label,fillStyle:e.isArray(a.backgroundColor)?a.backgroundColor[0]:a.backgroundColor,hidden:!t.isDatasetVisible(i),lineCap:a.borderCapStyle,lineDash:a.borderDash,lineDashOffset:a.borderDashOffset,lineJoin:a.borderJoinStyle,lineWidth:a.borderWidth,strokeStyle:a.borderColor,datasetIndex:i}},this):[]}}},t.Legend=t.Element.extend({initialize:function(t){e.extend(this,t),this.legendHitBoxes=[],this.doughnutMode=!1},beforeUpdate:a,update:function(t,e,a){var i=this;return i.beforeUpdate(),i.maxWidth=t,i.maxHeight=e,i.margins=a,i.beforeSetDimensions(),i.setDimensions(),i.afterSetDimensions(),i.beforeBuildLabels(),i.buildLabels(),i.afterBuildLabels(),i.beforeFit(),i.fit(),i.afterFit(),i.afterUpdate(),i.minSize},afterUpdate:a,beforeSetDimensions:a,setDimensions:function(){var t=this;t.isHorizontal()?(t.width=t.maxWidth,t.left=0,t.right=t.width):(t.height=t.maxHeight,t.top=0,t.bottom=t.height),t.paddingLeft=0,t.paddingTop=0,t.paddingRight=0,t.paddingBottom=0,t.minSize={width:0,height:0}},afterSetDimensions:a,beforeBuildLabels:a,buildLabels:function(){var t=this;t.legendItems=t.options.labels.generateLabels.call(t,t.chart),t.options.reverse&&t.legendItems.reverse()},afterBuildLabels:a,beforeFit:a,fit:function(){var a=this,i=a.options,n=i.labels,o=i.display,r=a.ctx,l=t.defaults.global,s=e.getValueOrDefault,d=s(n.fontSize,l.defaultFontSize),u=s(n.fontStyle,l.defaultFontStyle),c=s(n.fontFamily,l.defaultFontFamily),h=e.fontString(d,u,c),f=a.legendHitBoxes=[],g=a.minSize,p=a.isHorizontal();if(p?(g.width=a.maxWidth,g.height=o?10:0):(g.width=o?10:0,g.height=a.maxHeight),o)if(r.font=h,p){var m=a.lineWidths=[0],b=a.legendItems.length?d+n.padding:0;r.textAlign="left",r.textBaseline="top",e.each(a.legendItems,function(t,e){var i=n.boxWidth+d/2+r.measureText(t.text).width;m[m.length-1]+i+n.padding>=a.width&&(b+=d+n.padding,m[m.length]=a.left),f[e]={left:0,top:0,width:i,height:d},m[m.length-1]+=i+n.padding}),g.height+=b}else{var v=n.padding,x=a.columnWidths=[],y=n.padding,k=0,S=0,w=d+v;e.each(a.legendItems,function(t,e){var a=n.boxWidth+d/2+r.measureText(t.text).width;S+w>g.height&&(y+=k+n.padding,x.push(k),k=0,S=0),k=Math.max(k,a),S+=w,f[e]={left:0,top:0,width:a,height:d}}),y+=k,x.push(k),g.width+=y}a.width=g.width,a.height=g.height},afterFit:a,isHorizontal:function(){return"top"===this.options.position||"bottom"===this.options.position},draw:function(){var a=this,i=a.options,n=i.labels,o=t.defaults.global,r=o.elements.line,l=a.width,s=(a.height,a.lineWidths);if(i.display){var d,u=a.ctx,c=e.getValueOrDefault,h=c(n.fontColor,o.defaultFontColor),f=c(n.fontSize,o.defaultFontSize),g=c(n.fontStyle,o.defaultFontStyle),p=c(n.fontFamily,o.defaultFontFamily),m=e.fontString(f,g,p);u.textAlign="left",u.textBaseline="top",u.lineWidth=.5,u.strokeStyle=h,u.fillStyle=h,u.font=m;var b=n.boxWidth,v=a.legendHitBoxes,x=function(t,e,a){u.save(),u.fillStyle=c(a.fillStyle,o.defaultColor),u.lineCap=c(a.lineCap,r.borderCapStyle),u.lineDashOffset=c(a.lineDashOffset,r.borderDashOffset),u.lineJoin=c(a.lineJoin,r.borderJoinStyle),u.lineWidth=c(a.lineWidth,r.borderWidth),u.strokeStyle=c(a.strokeStyle,o.defaultColor),u.setLineDash&&u.setLineDash(c(a.lineDash,r.borderDash)),u.strokeRect(t,e,b,f),u.fillRect(t,e,b,f),u.restore()},y=function(t,e,a,i){u.fillText(a.text,b+f/2+t,e),a.hidden&&(u.beginPath(),u.lineWidth=2,u.moveTo(b+f/2+t,e+f/2),u.lineTo(b+f/2+t+i,e+f/2),u.stroke())},k=a.isHorizontal();d=k?{x:a.left+(l-s[0])/2,y:a.top+n.padding,line:0}:{x:a.left+n.padding,y:a.top,line:0};var S=f+n.padding;e.each(a.legendItems,function(t,e){var i=u.measureText(t.text).width,o=b+f/2+i,r=d.x,c=d.y;k?r+o>=l&&(c=d.y+=f+n.padding,d.line++,r=d.x=a.left+(l-s[d.line])/2):c+S>a.bottom&&(r=d.x=r+a.columnWidths[d.line]+n.padding,c=d.y=a.top,d.line++),x(r,c,t),v[e].left=r,v[e].top=c,y(r,c,t,i),k?d.x+=o+n.padding:d.y+=S})}},handleEvent:function(t){var a=this,i=e.getRelativePosition(t,a.chart.chart),n=i.x,o=i.y,r=a.options;if(n>=a.left&&n<=a.right&&o>=a.top&&o<=a.bottom)for(var l=a.legendHitBoxes,s=0;s<l.length;++s){var d=l[s];if(n>=d.left&&n<=d.left+d.width&&o>=d.top&&o<=d.top+d.height){r.onClick&&r.onClick.call(a,t,a.legendItems[s]);break}}}}),t.plugins.register({beforeInit:function(e){var a=e.options,i=a.legend;i&&(e.legend=new t.Legend({ctx:e.chart.ctx,options:i,chart:e}),t.layoutService.addBox(e,e.legend))}})}},{}],29:[function(t,e,a){"use strict";e.exports=function(t){var e=t.helpers.noop;t.plugins={_plugins:[],register:function(t){var e=this._plugins;[].concat(t).forEach(function(t){-1===e.indexOf(t)&&e.push(t)})},unregister:function(t){var e=this._plugins;[].concat(t).forEach(function(t){var a=e.indexOf(t);-1!==a&&e.splice(a,1)})},clear:function(){this._plugins=[]},count:function(){return this._plugins.length},getAll:function(){return this._plugins},notify:function(t,e){var a,i,n=this._plugins,o=n.length;for(a=0;o>a;++a)if(i=n[a],"function"==typeof i[t]&&i[t].apply(i,e||[])===!1)return!1;return!0}},t.PluginBase=t.Element.extend({beforeInit:e,afterInit:e,beforeUpdate:e,afterUpdate:e,beforeDraw:e,afterDraw:e,destroy:e}),t.pluginService=t.plugins}},{}],30:[function(t,e,a){"use strict";e.exports=function(t){var e=t.helpers;t.defaults.scale={display:!0,position:"left",gridLines:{display:!0,color:"rgba(0, 0, 0, 0.1)",lineWidth:1,drawBorder:!0,drawOnChartArea:!0,drawTicks:!0,tickMarkLength:10,zeroLineWidth:1,zeroLineColor:"rgba(0,0,0,0.25)",offsetGridLines:!1},scaleLabel:{labelString:"",display:!1},ticks:{beginAtZero:!1,minRotation:0,maxRotation:50,mirror:!1,padding:10,reverse:!1,display:!0,autoSkip:!0,autoSkipPadding:0,labelOffset:0,callback:function(t){return e.isArray(t)?t:""+t}}},t.Scale=t.Element.extend({beforeUpdate:function(){e.callCallback(this.options.beforeUpdate,[this])},update:function(t,a,i){var n=this;return n.beforeUpdate(),n.maxWidth=t,n.maxHeight=a,n.margins=e.extend({left:0,right:0,top:0,bottom:0},i),n.beforeSetDimensions(),n.setDimensions(),n.afterSetDimensions(),n.beforeDataLimits(),n.determineDataLimits(),n.afterDataLimits(),n.beforeBuildTicks(),n.buildTicks(),n.afterBuildTicks(),n.beforeTickToLabelConversion(),n.convertTicksToLabels(),n.afterTickToLabelConversion(),n.beforeCalculateTickRotation(),n.calculateTickRotation(),n.afterCalculateTickRotation(),n.beforeFit(),n.fit(),n.afterFit(),n.afterUpdate(),n.minSize},afterUpdate:function(){e.callCallback(this.options.afterUpdate,[this])},beforeSetDimensions:function(){e.callCallback(this.options.beforeSetDimensions,[this])},setDimensions:function(){var t=this;t.isHorizontal()?(t.width=t.maxWidth,t.left=0,t.right=t.width):(t.height=t.maxHeight,t.top=0,t.bottom=t.height),t.paddingLeft=0,t.paddingTop=0,t.paddingRight=0,t.paddingBottom=0},afterSetDimensions:function(){e.callCallback(this.options.afterSetDimensions,[this])},beforeDataLimits:function(){e.callCallback(this.options.beforeDataLimits,[this])},determineDataLimits:e.noop,afterDataLimits:function(){e.callCallback(this.options.afterDataLimits,[this])},beforeBuildTicks:function(){e.callCallback(this.options.beforeBuildTicks,[this])},buildTicks:e.noop,afterBuildTicks:function(){e.callCallback(this.options.afterBuildTicks,[this])},beforeTickToLabelConversion:function(){e.callCallback(this.options.beforeTickToLabelConversion,[this])},convertTicksToLabels:function(){var t=this;t.ticks=t.ticks.map(function(e,a,i){return t.options.ticks.userCallback?t.options.ticks.userCallback(e,a,i):t.options.ticks.callback(e,a,i)},t)},afterTickToLabelConversion:function(){e.callCallback(this.options.afterTickToLabelConversion,[this])},beforeCalculateTickRotation:function(){e.callCallback(this.options.beforeCalculateTickRotation,[this])},calculateTickRotation:function(){var a=this,i=a.ctx,n=t.defaults.global,o=a.options.ticks,r=e.getValueOrDefault(o.fontSize,n.defaultFontSize),l=e.getValueOrDefault(o.fontStyle,n.defaultFontStyle),s=e.getValueOrDefault(o.fontFamily,n.defaultFontFamily),d=e.fontString(r,l,s);i.font=d;var u,c=i.measureText(a.ticks[0]).width,h=i.measureText(a.ticks[a.ticks.length-1]).width;if(a.labelRotation=o.minRotation||0,a.paddingRight=0,a.paddingLeft=0,a.options.display&&a.isHorizontal()){a.paddingRight=h/2+3,a.paddingLeft=c/2+3,a.longestTextCache||(a.longestTextCache={});for(var f,g,p=e.longestText(i,d,a.ticks,a.longestTextCache),m=p,b=a.getPixelForTick(1)-a.getPixelForTick(0)-6;m>b&&a.labelRotation<o.maxRotation;){if(f=Math.cos(e.toRadians(a.labelRotation)),g=Math.sin(e.toRadians(a.labelRotation)),u=f*c,u+r/2>a.yLabelWidth&&(a.paddingLeft=u+r/2),a.paddingRight=r/2,g*p>a.maxHeight){a.labelRotation--;break}a.labelRotation++,m=f*p}}a.margins&&(a.paddingLeft=Math.max(a.paddingLeft-a.margins.left,0),a.paddingRight=Math.max(a.paddingRight-a.margins.right,0))},afterCalculateTickRotation:function(){e.callCallback(this.options.afterCalculateTickRotation,[this])},beforeFit:function(){e.callCallback(this.options.beforeFit,[this])},fit:function(){var a=this,i=a.minSize={width:0,height:0},n=a.options,o=t.defaults.global,r=n.ticks,l=n.scaleLabel,s=n.display,d=a.isHorizontal(),u=e.getValueOrDefault(r.fontSize,o.defaultFontSize),c=e.getValueOrDefault(r.fontStyle,o.defaultFontStyle),h=e.getValueOrDefault(r.fontFamily,o.defaultFontFamily),f=e.fontString(u,c,h),g=e.getValueOrDefault(l.fontSize,o.defaultFontSize),p=e.getValueOrDefault(l.fontStyle,o.defaultFontStyle),m=e.getValueOrDefault(l.fontFamily,o.defaultFontFamily),b=(e.fontString(g,p,m),n.gridLines.tickMarkLength);if(d?i.width=a.isFullWidth()?a.maxWidth-a.margins.left-a.margins.right:a.maxWidth:i.width=s?b:0,d?i.height=s?b:0:i.height=a.maxHeight,l.display&&s&&(d?i.height+=1.5*g:i.width+=1.5*g),r.display&&s){a.longestTextCache||(a.longestTextCache={});var v=e.longestText(a.ctx,f,a.ticks,a.longestTextCache),x=e.numberOfLabelLines(a.ticks),y=.5*u;if(d){a.longestLabelWidth=v;var k=Math.sin(e.toRadians(a.labelRotation))*a.longestLabelWidth+u*x+y*x;i.height=Math.min(a.maxHeight,i.height+k),a.ctx.font=f;var S=a.ctx.measureText(a.ticks[0]).width,w=a.ctx.measureText(a.ticks[a.ticks.length-1]).width,C=Math.cos(e.toRadians(a.labelRotation)),M=Math.sin(e.toRadians(a.labelRotation));a.paddingLeft=0!==a.labelRotation?C*S+3:S/2+3,a.paddingRight=0!==a.labelRotation?M*(u/2)+3:w/2+3}else{var D=a.maxWidth-i.width,A=r.mirror;A?v=0:v+=a.options.ticks.padding,D>v?i.width+=v:i.width=a.maxWidth,a.paddingTop=u/2,a.paddingBottom=u/2}}a.margins&&(a.paddingLeft=Math.max(a.paddingLeft-a.margins.left,0),a.paddingTop=Math.max(a.paddingTop-a.margins.top,0),a.paddingRight=Math.max(a.paddingRight-a.margins.right,0),a.paddingBottom=Math.max(a.paddingBottom-a.margins.bottom,0)),a.width=i.width,a.height=i.height},afterFit:function(){e.callCallback(this.options.afterFit,[this])},isHorizontal:function(){return"top"===this.options.position||"bottom"===this.options.position},isFullWidth:function(){return this.options.fullWidth},getRightValue:function a(t){return null===t||"undefined"==typeof t?NaN:"number"==typeof t&&isNaN(t)?NaN:"object"==typeof t?t instanceof Date||t.isValid?t:a(this.isHorizontal()?t.x:t.y):t},getLabelForIndex:e.noop,getPixelForValue:e.noop,getValueForPixel:e.noop,getPixelForTick:function(t,e){var a=this;if(a.isHorizontal()){var i=a.width-(a.paddingLeft+a.paddingRight),n=i/Math.max(a.ticks.length-(a.options.gridLines.offsetGridLines?0:1),1),o=n*t+a.paddingLeft;e&&(o+=n/2);var r=a.left+Math.round(o);return r+=a.isFullWidth()?a.margins.left:0}var l=a.height-(a.paddingTop+a.paddingBottom);return a.top+t*(l/(a.ticks.length-1))},getPixelForDecimal:function(t){var e=this;if(e.isHorizontal()){var a=e.width-(e.paddingLeft+e.paddingRight),i=a*t+e.paddingLeft,n=e.left+Math.round(i);return n+=e.isFullWidth()?e.margins.left:0}return e.top+t*e.height},getBasePixel:function(){var t=this,e=t.min,a=t.max;return t.getPixelForValue(t.beginAtZero?0:0>e&&0>a?a:e>0&&a>0?e:0)},draw:function(a){var i=this,n=i.options;if(n.display){
var o,r,l=i.ctx,s=t.defaults.global,d=n.ticks,u=n.gridLines,c=n.scaleLabel,h=0!==i.labelRotation,f=d.autoSkip,g=i.isHorizontal();d.maxTicksLimit&&(r=d.maxTicksLimit);var p=e.getValueOrDefault(d.fontColor,s.defaultFontColor),m=e.getValueOrDefault(d.fontSize,s.defaultFontSize),b=e.getValueOrDefault(d.fontStyle,s.defaultFontStyle),v=e.getValueOrDefault(d.fontFamily,s.defaultFontFamily),x=e.fontString(m,b,v),y=u.tickMarkLength,k=e.getValueOrDefault(c.fontColor,s.defaultFontColor),S=e.getValueOrDefault(c.fontSize,s.defaultFontSize),w=e.getValueOrDefault(c.fontStyle,s.defaultFontStyle),C=e.getValueOrDefault(c.fontFamily,s.defaultFontFamily),M=e.fontString(S,w,C),D=e.toRadians(i.labelRotation),A=Math.cos(D),I=(Math.sin(D),i.longestLabelWidth*A);l.fillStyle=p;var F=[];if(g){if(o=!1,h&&(I/=2),(I+d.autoSkipPadding)*i.ticks.length>i.width-(i.paddingLeft+i.paddingRight)&&(o=1+Math.floor((I+d.autoSkipPadding)*i.ticks.length/(i.width-(i.paddingLeft+i.paddingRight)))),r&&i.ticks.length>r)for(;!o||i.ticks.length/(o||1)>r;)o||(o=1),o+=1;f||(o=!1)}var T="right"===n.position?i.left:i.right-y,P="right"===n.position?i.left+y:i.right,_="bottom"===n.position?i.top:i.bottom-y,R="bottom"===n.position?i.top+y:i.bottom;if(e.each(i.ticks,function(t,r){if(void 0!==t&&null!==t){var l=i.ticks.length===r+1,s=o>1&&r%o>0||r%o===0&&r+o>=i.ticks.length;if((!s||l)&&void 0!==t&&null!==t){var c,f;r===("undefined"!=typeof i.zeroLineIndex?i.zeroLineIndex:0)?(c=u.zeroLineWidth,f=u.zeroLineColor):(c=e.getValueAtIndexOrDefault(u.lineWidth,r),f=e.getValueAtIndexOrDefault(u.color,r));var p,m,b,v,x,k,S,w,C,M,A,I="middle";if(g){h||(I="top"===n.position?"bottom":"top"),A=h?"right":"center";var V=i.getPixelForTick(r)+e.aliasPixel(c);C=i.getPixelForTick(r,u.offsetGridLines)+d.labelOffset,M=h?i.top+12:"top"===n.position?i.bottom-y:i.top+y,p=b=x=S=V,m=_,v=R,k=a.top,w=a.bottom}else{"left"===n.position?d.mirror?(C=i.right+d.padding,A="left"):(C=i.right-d.padding,A="right"):d.mirror?(C=i.left-d.padding,A="right"):(C=i.left+d.padding,A="left");var O=i.getPixelForTick(r);O+=e.aliasPixel(c),M=i.getPixelForTick(r,u.offsetGridLines),p=T,b=P,x=a.left,S=a.right,m=v=k=w=O}F.push({tx1:p,ty1:m,tx2:b,ty2:v,x1:x,y1:k,x2:S,y2:w,labelX:C,labelY:M,glWidth:c,glColor:f,rotation:-1*D,label:t,textBaseline:I,textAlign:A})}}}),e.each(F,function(t){if(u.display&&(l.lineWidth=t.glWidth,l.strokeStyle=t.glColor,l.beginPath(),u.drawTicks&&(l.moveTo(t.tx1,t.ty1),l.lineTo(t.tx2,t.ty2)),u.drawOnChartArea&&(l.moveTo(t.x1,t.y1),l.lineTo(t.x2,t.y2)),l.stroke()),d.display){l.save(),l.translate(t.labelX,t.labelY),l.rotate(t.rotation),l.font=x,l.textBaseline=t.textBaseline,l.textAlign=t.textAlign;var a=t.label;if(e.isArray(a))for(var i=0,n=0;i<a.length;++i)l.fillText(""+a[i],0,n),n+=1.5*m;else l.fillText(a,0,0);l.restore()}}),c.display){var V,O,L=0;if(g)V=i.left+(i.right-i.left)/2,O="bottom"===n.position?i.bottom-S/2:i.top+S/2;else{var B="left"===n.position;V=B?i.left+S/2:i.right-S/2,O=i.top+(i.bottom-i.top)/2,L=B?-.5*Math.PI:.5*Math.PI}l.save(),l.translate(V,O),l.rotate(L),l.textAlign="center",l.textBaseline="middle",l.fillStyle=k,l.font=M,l.fillText(c.labelString,0,0),l.restore()}if(u.drawBorder){l.lineWidth=e.getValueAtIndexOrDefault(u.lineWidth,0),l.strokeStyle=e.getValueAtIndexOrDefault(u.color,0);var W=i.left,z=i.right,H=i.top,N=i.bottom,E=e.aliasPixel(l.lineWidth);g?(H=N="top"===n.position?i.bottom:i.top,H+=E,N+=E):(W=z="left"===n.position?i.right:i.left,W+=E,z+=E),l.beginPath(),l.moveTo(W,H),l.lineTo(z,N),l.stroke()}}}})}},{}],31:[function(t,e,a){"use strict";e.exports=function(t){var e=t.helpers;t.scaleService={constructors:{},defaults:{},registerScaleType:function(t,a,i){this.constructors[t]=a,this.defaults[t]=e.clone(i)},getScaleConstructor:function(t){return this.constructors.hasOwnProperty(t)?this.constructors[t]:void 0},getScaleDefaults:function(a){return this.defaults.hasOwnProperty(a)?e.scaleMerge(t.defaults.scale,this.defaults[a]):{}},updateScaleDefaults:function(t,a){var i=this.defaults;i.hasOwnProperty(t)&&(i[t]=e.extend(i[t],a))},addScalesToLayout:function(a){e.each(a.scales,function(e){t.layoutService.addBox(a,e)})}}}},{}],32:[function(t,e,a){"use strict";e.exports=function(t){var e=t.helpers;t.defaults.global.title={display:!1,position:"top",fullWidth:!0,fontStyle:"bold",padding:10,text:""};var a=e.noop;t.Title=t.Element.extend({initialize:function(a){var i=this;e.extend(i,a),i.options=e.configMerge(t.defaults.global.title,a.options),i.legendHitBoxes=[]},beforeUpdate:function(){var a=this.chart.options;a&&a.title&&(this.options=e.configMerge(t.defaults.global.title,a.title))},update:function(t,e,a){var i=this;return i.beforeUpdate(),i.maxWidth=t,i.maxHeight=e,i.margins=a,i.beforeSetDimensions(),i.setDimensions(),i.afterSetDimensions(),i.beforeBuildLabels(),i.buildLabels(),i.afterBuildLabels(),i.beforeFit(),i.fit(),i.afterFit(),i.afterUpdate(),i.minSize},afterUpdate:a,beforeSetDimensions:a,setDimensions:function(){var t=this;t.isHorizontal()?(t.width=t.maxWidth,t.left=0,t.right=t.width):(t.height=t.maxHeight,t.top=0,t.bottom=t.height),t.paddingLeft=0,t.paddingTop=0,t.paddingRight=0,t.paddingBottom=0,t.minSize={width:0,height:0}},afterSetDimensions:a,beforeBuildLabels:a,buildLabels:a,afterBuildLabels:a,beforeFit:a,fit:function(){var a=this,i=(a.ctx,e.getValueOrDefault),n=a.options,o=t.defaults.global,r=n.display,l=i(n.fontSize,o.defaultFontSize),s=a.minSize;a.isHorizontal()?(s.width=a.maxWidth,s.height=r?l+2*n.padding:0):(s.width=r?l+2*n.padding:0,s.height=a.maxHeight),a.width=s.width,a.height=s.height},afterFit:a,isHorizontal:function(){var t=this.options.position;return"top"===t||"bottom"===t},draw:function(){var a=this,i=a.ctx,n=e.getValueOrDefault,o=a.options,r=t.defaults.global;if(o.display){var l,s,d=n(o.fontSize,r.defaultFontSize),u=n(o.fontStyle,r.defaultFontStyle),c=n(o.fontFamily,r.defaultFontFamily),h=e.fontString(d,u,c),f=0,g=a.top,p=a.left,m=a.bottom,b=a.right;i.fillStyle=n(o.fontColor,r.defaultFontColor),i.font=h,a.isHorizontal()?(l=p+(b-p)/2,s=g+(m-g)/2):(l="left"===o.position?p+d/2:b-d/2,s=g+(m-g)/2,f=Math.PI*("left"===o.position?-.5:.5)),i.save(),i.translate(l,s),i.rotate(f),i.textAlign="center",i.textBaseline="middle",i.fillText(o.text,0,0),i.restore()}}}),t.plugins.register({beforeInit:function(e){var a=e.options,i=a.title;i&&(e.titleBlock=new t.Title({ctx:e.chart.ctx,options:i,chart:e}),t.layoutService.addBox(e,e.titleBlock))}})}},{}],33:[function(t,e,a){"use strict";e.exports=function(t){function e(t,e){return e&&(n.isArray(e)?Array.prototype.push.apply(t,e):t.push(e)),t}function a(t){if(!t.length)return!1;var e,a,i=[],n=[];for(e=0,a=t.length;a>e;++e){var o=t[e];if(o&&o.hasValue()){var r=o.tooltipPosition();i.push(r.x),n.push(r.y)}}var l=0,s=0;for(e=0,a-i.length;a>e;++e)l+=i[e],s+=n[e];return{x:Math.round(l/i.length),y:Math.round(s/i.length)}}function i(t){var e=t._xScale,a=t._yScale||t._scale,i=t._index,n=t._datasetIndex;return{xLabel:e?e.getLabelForIndex(i,n):"",yLabel:a?a.getLabelForIndex(i,n):"",index:i,datasetIndex:n}}var n=t.helpers;t.defaults.global.tooltips={enabled:!0,custom:null,mode:"single",backgroundColor:"rgba(0,0,0,0.8)",titleFontStyle:"bold",titleSpacing:2,titleMarginBottom:6,titleFontColor:"#fff",titleAlign:"left",bodySpacing:2,bodyFontColor:"#fff",bodyAlign:"left",footerFontStyle:"bold",footerSpacing:2,footerMarginTop:6,footerFontColor:"#fff",footerAlign:"left",yPadding:6,xPadding:6,yAlign:"center",xAlign:"center",caretSize:5,cornerRadius:6,multiKeyBackground:"#fff",callbacks:{beforeTitle:n.noop,title:function(t,e){var a="",i=e.labels,n=i?i.length:0;if(t.length>0){var o=t[0];o.xLabel?a=o.xLabel:n>0&&o.index<n&&(a=i[o.index])}return a},afterTitle:n.noop,beforeBody:n.noop,beforeLabel:n.noop,label:function(t,e){var a=e.datasets[t.datasetIndex].label||"";return a+": "+t.yLabel},labelColor:function(t,e){var a=e.getDatasetMeta(t.datasetIndex),i=a.data[t.index],n=i._view;return{borderColor:n.borderColor,backgroundColor:n.backgroundColor}},afterLabel:n.noop,afterBody:n.noop,beforeFooter:n.noop,footer:n.noop,afterFooter:n.noop}},t.Tooltip=t.Element.extend({initialize:function(){var e=this,a=t.defaults.global,i=e._options,o=n.getValueOrDefault;n.extend(e,{_model:{xPadding:i.xPadding,yPadding:i.yPadding,xAlign:i.yAlign,yAlign:i.xAlign,bodyFontColor:i.bodyFontColor,_bodyFontFamily:o(i.bodyFontFamily,a.defaultFontFamily),_bodyFontStyle:o(i.bodyFontStyle,a.defaultFontStyle),_bodyAlign:i.bodyAlign,bodyFontSize:o(i.bodyFontSize,a.defaultFontSize),bodySpacing:i.bodySpacing,titleFontColor:i.titleFontColor,_titleFontFamily:o(i.titleFontFamily,a.defaultFontFamily),_titleFontStyle:o(i.titleFontStyle,a.defaultFontStyle),titleFontSize:o(i.titleFontSize,a.defaultFontSize),_titleAlign:i.titleAlign,titleSpacing:i.titleSpacing,titleMarginBottom:i.titleMarginBottom,footerFontColor:i.footerFontColor,_footerFontFamily:o(i.footerFontFamily,a.defaultFontFamily),_footerFontStyle:o(i.footerFontStyle,a.defaultFontStyle),footerFontSize:o(i.footerFontSize,a.defaultFontSize),_footerAlign:i.footerAlign,footerSpacing:i.footerSpacing,footerMarginTop:i.footerMarginTop,caretSize:i.caretSize,cornerRadius:i.cornerRadius,backgroundColor:i.backgroundColor,opacity:0,legendColorBackground:i.multiKeyBackground}})},getTitle:function(){var t=this,a=t._options,i=a.callbacks,n=i.beforeTitle.apply(t,arguments),o=i.title.apply(t,arguments),r=i.afterTitle.apply(t,arguments),l=[];return l=e(l,n),l=e(l,o),l=e(l,r)},getBeforeBody:function(){var t=this._options.callbacks.beforeBody.apply(this,arguments);return n.isArray(t)?t:void 0!==t?[t]:[]},getBody:function(t,a){var i=this,o=i._options.callbacks,r=[];return n.each(t,function(t){var n={before:[],lines:[],after:[]};e(n.before,o.beforeLabel.call(i,t,a)),e(n.lines,o.label.call(i,t,a)),e(n.after,o.afterLabel.call(i,t,a)),r.push(n)}),r},getAfterBody:function(){var t=this._options.callbacks.afterBody.apply(this,arguments);return n.isArray(t)?t:void 0!==t?[t]:[]},getFooter:function(){var t=this,a=t._options.callbacks,i=a.beforeFooter.apply(t,arguments),n=a.footer.apply(t,arguments),o=a.afterFooter.apply(t,arguments),r=[];return r=e(r,i),r=e(r,n),r=e(r,o)},update:function(t){var e,o,r=this,l=r._options,s=r._model,d=r._active,u=r._data,c=r._chartInstance;if(d.length){s.opacity=1;var h=[],f=a(d),g=[];for(e=0,o=d.length;o>e;++e)g.push(i(d[e]));l.itemSort&&(g=g.sort(l.itemSort)),d.length>1&&n.each(g,function(t){h.push(l.callbacks.labelColor.call(r,t,c))}),n.extend(s,{title:r.getTitle(g,u),beforeBody:r.getBeforeBody(g,u),body:r.getBody(g,u),afterBody:r.getAfterBody(g,u),footer:r.getFooter(g,u),x:Math.round(f.x),y:Math.round(f.y),caretPadding:n.getValueOrDefault(f.padding,2),labelColors:h});var p=r.getTooltipSize(s);r.determineAlignment(p),n.extend(s,r.getBackgroundPoint(s,p))}else r._model.opacity=0;return t&&l.custom&&l.custom.call(r,s),r},getTooltipSize:function(t){var e=this._chart.ctx,a={height:2*t.yPadding,width:0},i=t.body,o=i.reduce(function(t,e){return t+e.before.length+e.lines.length+e.after.length},0);o+=t.beforeBody.length+t.afterBody.length;var r=t.title.length,l=t.footer.length,s=t.titleFontSize,d=t.bodyFontSize,u=t.footerFontSize;a.height+=r*s,a.height+=(r-1)*t.titleSpacing,a.height+=r?t.titleMarginBottom:0,a.height+=o*d,a.height+=o?(o-1)*t.bodySpacing:0,a.height+=l?t.footerMarginTop:0,a.height+=l*u,a.height+=l?(l-1)*t.footerSpacing:0;var c=0,h=function(t){a.width=Math.max(a.width,e.measureText(t).width+c)};return e.font=n.fontString(s,t._titleFontStyle,t._titleFontFamily),n.each(t.title,h),e.font=n.fontString(d,t._bodyFontStyle,t._bodyFontFamily),n.each(t.beforeBody.concat(t.afterBody),h),c=i.length>1?d+2:0,n.each(i,function(t){n.each(t.before,h),n.each(t.lines,h),n.each(t.after,h)}),c=0,e.font=n.fontString(u,t._footerFontStyle,t._footerFontFamily),n.each(t.footer,h),a.width+=2*t.xPadding,a},determineAlignment:function(t){var e=this,a=e._model,i=e._chart,n=e._chartInstance.chartArea;a.y<t.height?a.yAlign="top":a.y>i.height-t.height&&(a.yAlign="bottom");var o,r,l,s,d,u=(n.left+n.right)/2,c=(n.top+n.bottom)/2;"center"===a.yAlign?(o=function(t){return u>=t},r=function(t){return t>u}):(o=function(e){return e<=t.width/2},r=function(e){return e>=i.width-t.width/2}),l=function(e){return e+t.width>i.width},s=function(e){return e-t.width<0},d=function(t){return c>=t?"top":"bottom"},o(a.x)?(a.xAlign="left",l(a.x)&&(a.xAlign="center",a.yAlign=d(a.y))):r(a.x)&&(a.xAlign="right",s(a.x)&&(a.xAlign="center",a.yAlign=d(a.y)))},getBackgroundPoint:function(t,e){var a={x:t.x,y:t.y},i=t.caretSize,n=t.caretPadding,o=t.cornerRadius,r=t.xAlign,l=t.yAlign,s=i+n,d=o+n;return"right"===r?a.x-=e.width:"center"===r&&(a.x-=e.width/2),"top"===l?a.y+=s:"bottom"===l?a.y-=e.height+s:a.y-=e.height/2,"center"===l?"left"===r?a.x+=s:"right"===r&&(a.x-=s):"left"===r?a.x-=d:"right"===r&&(a.x+=d),a},drawCaret:function(t,e,a,i){var o,r,l,s,d,u,c=this._view,h=this._chart.ctx,f=c.caretSize,g=c.cornerRadius,p=c.xAlign,m=c.yAlign,b=t.x,v=t.y,x=e.width,y=e.height;"center"===m?("left"===p?(o=b,r=o-f,l=o):(o=b+x,r=o+f,l=o),d=v+y/2,s=d-f,u=d+f):("left"===p?(o=b+g,r=o+f,l=r+f):"right"===p?(o=b+x-g,r=o-f,l=r-f):(r=b+x/2,o=r-f,l=r+f),"top"===m?(s=v,d=s-f,u=s):(s=v+y,d=s+f,u=s));var k=n.color(c.backgroundColor);h.fillStyle=k.alpha(a*k.alpha()).rgbString(),h.beginPath(),h.moveTo(o,s),h.lineTo(r,d),h.lineTo(l,u),h.closePath(),h.fill()},drawTitle:function(t,e,a,i){var o=e.title;if(o.length){a.textAlign=e._titleAlign,a.textBaseline="top";var r=e.titleFontSize,l=e.titleSpacing,s=n.color(e.titleFontColor);a.fillStyle=s.alpha(i*s.alpha()).rgbString(),a.font=n.fontString(r,e._titleFontStyle,e._titleFontFamily);var d,u;for(d=0,u=o.length;u>d;++d)a.fillText(o[d],t.x,t.y),t.y+=r+l,d+1===o.length&&(t.y+=e.titleMarginBottom-l)}},drawBody:function(t,e,a,i){var o=e.bodyFontSize,r=e.bodySpacing,l=e.body;a.textAlign=e._bodyAlign,a.textBaseline="top";var s=n.color(e.bodyFontColor),d=s.alpha(i*s.alpha()).rgbString();a.fillStyle=d,a.font=n.fontString(o,e._bodyFontStyle,e._bodyFontFamily);var u=0,c=function(e){a.fillText(e,t.x+u,t.y),t.y+=o+r};n.each(e.beforeBody,c);var h=l.length>1;u=h?o+2:0,n.each(l,function(r,l){n.each(r.before,c),n.each(r.lines,function(r){h&&(a.fillStyle=n.color(e.legendColorBackground).alpha(i).rgbaString(),a.fillRect(t.x,t.y,o,o),a.strokeStyle=n.color(e.labelColors[l].borderColor).alpha(i).rgbaString(),a.strokeRect(t.x,t.y,o,o),a.fillStyle=n.color(e.labelColors[l].backgroundColor).alpha(i).rgbaString(),a.fillRect(t.x+1,t.y+1,o-2,o-2),a.fillStyle=d),c(r)}),n.each(r.after,c)}),u=0,n.each(e.afterBody,c),t.y-=r},drawFooter:function(t,e,a,i){var o=e.footer;if(o.length){t.y+=e.footerMarginTop,a.textAlign=e._footerAlign,a.textBaseline="top";var r=n.color(e.footerFontColor);a.fillStyle=r.alpha(i*r.alpha()).rgbString(),a.font=n.fontString(e.footerFontSize,e._footerFontStyle,e._footerFontFamily),n.each(o,function(i){a.fillText(i,t.x,t.y),t.y+=e.footerFontSize+e.footerSpacing})}},draw:function(){var t=this._chart.ctx,e=this._view;if(0!==e.opacity){var a=this.getTooltipSize(e),i={x:e.x,y:e.y},o=Math.abs(e.opacity<.001)?0:e.opacity;if(this._options.enabled){var r=n.color(e.backgroundColor);t.fillStyle=r.alpha(o*r.alpha()).rgbString(),n.drawRoundedRectangle(t,i.x,i.y,a.width,a.height,e.cornerRadius),t.fill(),this.drawCaret(i,a,o,e.caretPadding),i.x+=e.xPadding,i.y+=e.yPadding,this.drawTitle(i,e,t,o),this.drawBody(i,e,t,o),this.drawFooter(i,e,t,o)}}}})}},{}],34:[function(t,e,a){"use strict";e.exports=function(t,e){var a=t.helpers,i=t.defaults.global;i.elements.arc={backgroundColor:i.defaultColor,borderColor:"#fff",borderWidth:2},t.elements.Arc=t.Element.extend({inLabelRange:function(t){var e=this._view;return e?Math.pow(t-e.x,2)<Math.pow(e.radius+e.hoverRadius,2):!1},inRange:function(t,e){var i=this._view;if(i){for(var n=a.getAngleFromPoint(i,{x:t,y:e}),o=n.angle,r=n.distance,l=i.startAngle,s=i.endAngle;l>s;)s+=2*Math.PI;for(;o>s;)o-=2*Math.PI;for(;l>o;)o+=2*Math.PI;var d=o>=l&&s>=o,u=r>=i.innerRadius&&r<=i.outerRadius;return d&&u}return!1},tooltipPosition:function(){var t=this._view,e=t.startAngle+(t.endAngle-t.startAngle)/2,a=(t.outerRadius-t.innerRadius)/2+t.innerRadius;return{x:t.x+Math.cos(e)*a,y:t.y+Math.sin(e)*a}},draw:function(){var t=this._chart.ctx,e=this._view,a=e.startAngle,i=e.endAngle;t.beginPath(),t.arc(e.x,e.y,e.outerRadius,a,i),t.arc(e.x,e.y,e.innerRadius,i,a,!0),t.closePath(),t.strokeStyle=e.borderColor,t.lineWidth=e.borderWidth,t.fillStyle=e.backgroundColor,t.fill(),t.lineJoin="bevel",e.borderWidth&&t.stroke()}})}},{}],35:[function(t,e,a){"use strict";e.exports=function(t){var e=t.helpers,a=t.defaults.global;t.defaults.global.elements.line={tension:.4,backgroundColor:a.defaultColor,borderWidth:3,borderColor:a.defaultColor,borderCapStyle:"butt",borderDash:[],borderDashOffset:0,borderJoinStyle:"miter",fill:!0},t.elements.Line=t.Element.extend({lineToNextPoint:function(t,e,a,i,n){var o=this,r=o._chart.ctx,l=o._view?o._view.spanGaps:!1;e._view.skip&&!l?i.call(o,t,e,a):t._view.skip&&!l?n.call(o,t,e,a):0===e._view.tension?r.lineTo(e._view.x,e._view.y):r.bezierCurveTo(t._view.controlPointNextX,t._view.controlPointNextY,e._view.controlPointPreviousX,e._view.controlPointPreviousY,e._view.x,e._view.y)},draw:function(){function t(t){r._view.skip||l._view.skip?t&&o.lineTo(i._view.scaleZero.x,i._view.scaleZero.y):o.bezierCurveTo(l._view.controlPointNextX,l._view.controlPointNextY,r._view.controlPointPreviousX,r._view.controlPointPreviousY,r._view.x,r._view.y)}var i=this,n=i._view,o=i._chart.ctx,r=i._children[0],l=i._children[i._children.length-1];o.save(),i._children.length>0&&n.fill&&(o.beginPath(),e.each(i._children,function(t,a){var r=e.previousItem(i._children,a),l=e.nextItem(i._children,a);0===a?(i._loop?o.moveTo(n.scaleZero.x,n.scaleZero.y):o.moveTo(t._view.x,n.scaleZero),t._view.skip?i._loop||o.moveTo(l._view.x,i._view.scaleZero):o.lineTo(t._view.x,t._view.y)):i.lineToNextPoint(r,t,l,function(t,e,a){i._loop?o.lineTo(i._view.scaleZero.x,i._view.scaleZero.y):(o.lineTo(t._view.x,i._view.scaleZero),o.moveTo(a._view.x,i._view.scaleZero))},function(t,e){o.lineTo(e._view.x,e._view.y)})},i),i._loop?t(!0):(o.lineTo(i._children[i._children.length-1]._view.x,n.scaleZero),o.lineTo(i._children[0]._view.x,n.scaleZero)),o.fillStyle=n.backgroundColor||a.defaultColor,o.closePath(),o.fill());var s=a.elements.line;o.lineCap=n.borderCapStyle||s.borderCapStyle,o.setLineDash&&o.setLineDash(n.borderDash||s.borderDash),o.lineDashOffset=n.borderDashOffset||s.borderDashOffset,o.lineJoin=n.borderJoinStyle||s.borderJoinStyle,o.lineWidth=n.borderWidth||s.borderWidth,o.strokeStyle=n.borderColor||a.defaultColor,o.beginPath(),e.each(i._children,function(t,a){var n=e.previousItem(i._children,a),r=e.nextItem(i._children,a);0===a?o.moveTo(t._view.x,t._view.y):i.lineToNextPoint(n,t,r,function(t,e,a){o.moveTo(a._view.x,a._view.y)},function(t,e){o.moveTo(e._view.x,e._view.y)})},i),i._loop&&i._children.length>0&&t(),o.stroke(),o.restore()}})}},{}],36:[function(t,e,a){"use strict";e.exports=function(t){var e=t.helpers,a=t.defaults.global,i=a.defaultColor;a.elements.point={radius:3,pointStyle:"circle",backgroundColor:i,borderWidth:1,borderColor:i,hitRadius:1,hoverRadius:4,hoverBorderWidth:1},t.elements.Point=t.Element.extend({inRange:function(t,e){var a=this._view;return a?Math.pow(t-a.x,2)+Math.pow(e-a.y,2)<Math.pow(a.hitRadius+a.radius,2):!1},inLabelRange:function(t){var e=this._view;return e?Math.pow(t-e.x,2)<Math.pow(e.radius+e.hitRadius,2):!1},tooltipPosition:function(){var t=this._view;return{x:t.x,y:t.y,padding:t.radius+t.borderWidth}},draw:function(){var t,n,o,r,l,s,d=this._view,u=this._chart.ctx,c=d.pointStyle,h=d.radius,f=d.x,g=d.y;if(!d.skip){if("object"==typeof c&&(t=c.toString(),"[object HTMLImageElement]"===t||"[object HTMLCanvasElement]"===t))return void u.drawImage(c,f-c.width/2,g-c.height/2);if(!(isNaN(h)||0>=h)){switch(u.strokeStyle=d.borderColor||i,u.lineWidth=e.getValueOrDefault(d.borderWidth,a.elements.point.borderWidth),u.fillStyle=d.backgroundColor||i,c){default:u.beginPath(),u.arc(f,g,h,0,2*Math.PI),u.closePath(),u.fill();break;case"triangle":u.beginPath(),n=3*h/Math.sqrt(3),l=n*Math.sqrt(3)/2,u.moveTo(f-n/2,g+l/3),u.lineTo(f+n/2,g+l/3),u.lineTo(f,g-2*l/3),u.closePath(),u.fill();break;case"rect":s=1/Math.SQRT2*h,u.fillRect(f-s,g-s,2*s,2*s),u.strokeRect(f-s,g-s,2*s,2*s);break;case"rectRot":s=1/Math.SQRT2*h,u.beginPath(),u.moveTo(f-s,g),u.lineTo(f,g+s),u.lineTo(f+s,g),u.lineTo(f,g-s),u.closePath(),u.fill();break;case"cross":u.beginPath(),u.moveTo(f,g+h),u.lineTo(f,g-h),u.moveTo(f-h,g),u.lineTo(f+h,g),u.closePath();break;case"crossRot":u.beginPath(),o=Math.cos(Math.PI/4)*h,r=Math.sin(Math.PI/4)*h,u.moveTo(f-o,g-r),u.lineTo(f+o,g+r),u.moveTo(f-o,g+r),u.lineTo(f+o,g-r),u.closePath();break;case"star":u.beginPath(),u.moveTo(f,g+h),u.lineTo(f,g-h),u.moveTo(f-h,g),u.lineTo(f+h,g),o=Math.cos(Math.PI/4)*h,r=Math.sin(Math.PI/4)*h,u.moveTo(f-o,g-r),u.lineTo(f+o,g+r),u.moveTo(f-o,g+r),u.lineTo(f+o,g-r),u.closePath();break;case"line":u.beginPath(),u.moveTo(f-h,g),u.lineTo(f+h,g),u.closePath();break;case"dash":u.beginPath(),u.moveTo(f,g),u.lineTo(f+h,g),u.closePath()}u.stroke()}}}})}},{}],37:[function(t,e,a){"use strict";e.exports=function(t){var e=(t.helpers,t.defaults.global);e.elements.rectangle={backgroundColor:e.defaultColor,borderWidth:0,borderColor:e.defaultColor,borderSkipped:"bottom"},t.elements.Rectangle=t.Element.extend({draw:function(){function t(t){return s[(u+t)%4]}var e=this._chart.ctx,a=this._view,i=a.width/2,n=a.x-i,o=a.x+i,r=a.base-(a.base-a.y),l=a.borderWidth/2;a.borderWidth&&(n+=l,o-=l,r+=l),e.beginPath(),e.fillStyle=a.backgroundColor,e.strokeStyle=a.borderColor,e.lineWidth=a.borderWidth;var s=[[n,a.base],[n,r],[o,r],[o,a.base]],d=["bottom","left","top","right"],u=d.indexOf(a.borderSkipped,0);-1===u&&(u=0),e.moveTo.apply(e,t(0));for(var c=1;4>c;c++)e.lineTo.apply(e,t(c));e.fill(),a.borderWidth&&e.stroke()},height:function(){var t=this._view;return t.base-t.y},inRange:function(t,e){var a=this._view;return a?a.y<a.base?t>=a.x-a.width/2&&t<=a.x+a.width/2&&e>=a.y&&e<=a.base:t>=a.x-a.width/2&&t<=a.x+a.width/2&&e>=a.base&&e<=a.y:!1},inLabelRange:function(t){var e=this._view;return e?t>=e.x-e.width/2&&t<=e.x+e.width/2:!1},tooltipPosition:function(){var t=this._view;return{x:t.x,y:t.y}}})}},{}],38:[function(t,e,a){"use strict";e.exports=function(t){var e=t.helpers,a={position:"bottom"},i=t.Scale.extend({determineDataLimits:function(){var t=this;t.minIndex=0,t.maxIndex=t.chart.data.labels.length-1;var a;void 0!==t.options.ticks.min&&(a=e.indexOf(t.chart.data.labels,t.options.ticks.min),t.minIndex=-1!==a?a:t.minIndex),void 0!==t.options.ticks.max&&(a=e.indexOf(t.chart.data.labels,t.options.ticks.max),t.maxIndex=-1!==a?a:t.maxIndex),t.min=t.chart.data.labels[t.minIndex],t.max=t.chart.data.labels[t.maxIndex]},buildTicks:function(t){var e=this;e.ticks=0===e.minIndex&&e.maxIndex===e.chart.data.labels.length-1?e.chart.data.labels:e.chart.data.labels.slice(e.minIndex,e.maxIndex+1)},getLabelForIndex:function(t,e){return this.ticks[t]},getPixelForValue:function(t,e,a,i){var n=this,o=Math.max(n.maxIndex+1-n.minIndex-(n.options.gridLines.offsetGridLines?0:1),1);if(n.isHorizontal()){var r=n.width-(n.paddingLeft+n.paddingRight),l=r/o,s=l*(e-n.minIndex)+n.paddingLeft;return n.options.gridLines.offsetGridLines&&i&&(s+=l/2),n.left+Math.round(s)}var d=n.height-(n.paddingTop+n.paddingBottom),u=d/o,c=u*(e-n.minIndex)+n.paddingTop;return n.options.gridLines.offsetGridLines&&i&&(c+=u/2),n.top+Math.round(c)},getPixelForTick:function(t,e){return this.getPixelForValue(this.ticks[t],t+this.minIndex,null,e)},getValueForPixel:function(t){var e,a=this,i=Math.max(a.ticks.length-(a.options.gridLines.offsetGridLines?0:1),1),n=a.isHorizontal(),o=n?a.width-(a.paddingLeft+a.paddingRight):a.height-(a.paddingTop+a.paddingBottom),r=o/i;return a.options.gridLines.offsetGridLines&&(t-=r/2),t-=n?a.paddingLeft:a.paddingTop,e=0>=t?0:Math.round(t/r)}});t.scaleService.registerScaleType("category",i,a)}},{}],39:[function(t,e,a){"use strict";e.exports=function(t){var e=t.helpers,a={position:"left",ticks:{callback:function(t,a,i){var n=i.length>3?i[2]-i[1]:i[1]-i[0];Math.abs(n)>1&&t!==Math.floor(t)&&(n=t-Math.floor(t));var o=e.log10(Math.abs(n)),r="";if(0!==t){var l=-1*Math.floor(o);l=Math.max(Math.min(l,20),0),r=t.toFixed(l)}else r="0";return r}}},i=t.LinearScaleBase.extend({determineDataLimits:function(){function t(t){return l?t.xAxisID===a.id:t.yAxisID===a.id}var a=this,i=a.options,n=(i.ticks,a.chart),o=n.data,r=o.datasets,l=a.isHorizontal();if(a.min=null,a.max=null,i.stacked){var s={},d=!1,u=!1;e.each(r,function(o,r){var l=n.getDatasetMeta(r);void 0===s[l.type]&&(s[l.type]={positiveValues:[],negativeValues:[]});var c=s[l.type].positiveValues,h=s[l.type].negativeValues;n.isDatasetVisible(r)&&t(l)&&e.each(o.data,function(t,e){var n=+a.getRightValue(t);isNaN(n)||l.data[e].hidden||(c[e]=c[e]||0,h[e]=h[e]||0,i.relativePoints?c[e]=100:0>n?(u=!0,h[e]+=n):(d=!0,c[e]+=n))})}),e.each(s,function(t){var i=t.positiveValues.concat(t.negativeValues),n=e.min(i),o=e.max(i);a.min=null===a.min?n:Math.min(a.min,n),a.max=null===a.max?o:Math.max(a.max,o)})}else e.each(r,function(i,o){var r=n.getDatasetMeta(o);n.isDatasetVisible(o)&&t(r)&&e.each(i.data,function(t,e){var i=+a.getRightValue(t);isNaN(i)||r.data[e].hidden||(null===a.min?a.min=i:i<a.min&&(a.min=i),null===a.max?a.max=i:i>a.max&&(a.max=i))})});this.handleTickRangeOptions()},getTickLimit:function(){var a,i=this,n=i.options.ticks;if(i.isHorizontal())a=Math.min(n.maxTicksLimit?n.maxTicksLimit:11,Math.ceil(i.width/50));else{var o=e.getValueOrDefault(n.fontSize,t.defaults.global.defaultFontSize);a=Math.min(n.maxTicksLimit?n.maxTicksLimit:11,Math.ceil(i.height/(2*o)))}return a},handleDirectionalChanges:function(){this.isHorizontal()||this.ticks.reverse()},getLabelForIndex:function(t,e){return+this.getRightValue(this.chart.data.datasets[e].data[t])},getPixelForValue:function(t,e,a,i){var n,o,r=this,l=r.paddingLeft,s=r.paddingBottom,d=r.start,u=+r.getRightValue(t),c=r.end-d;return r.isHorizontal()?(o=r.width-(l+r.paddingRight),n=r.left+o/c*(u-d),Math.round(n+l)):(o=r.height-(r.paddingTop+s),n=r.bottom-s-o/c*(u-d),Math.round(n))},getValueForPixel:function(t){var e=this,a=e.isHorizontal(),i=e.paddingLeft,n=e.paddingBottom,o=a?e.width-(i+e.paddingRight):e.height-(e.paddingTop+n),r=(a?t-e.left-i:e.bottom-n-t)/o;return e.start+(e.end-e.start)*r},getPixelForTick:function(t,e){return this.getPixelForValue(this.ticksAsNumbers[t],null,null,e)}});t.scaleService.registerScaleType("linear",i,a)}},{}],40:[function(t,e,a){"use strict";e.exports=function(t){var e=t.helpers,a=e.noop;t.LinearScaleBase=t.Scale.extend({handleTickRangeOptions:function(){var t=this,a=t.options,i=a.ticks;if(i.beginAtZero){var n=e.sign(t.min),o=e.sign(t.max);0>n&&0>o?t.max=0:n>0&&o>0&&(t.min=0)}void 0!==i.min?t.min=i.min:void 0!==i.suggestedMin&&(t.min=Math.min(t.min,i.suggestedMin)),void 0!==i.max?t.max=i.max:void 0!==i.suggestedMax&&(t.max=Math.max(t.max,i.suggestedMax)),t.min===t.max&&(t.max++,i.beginAtZero||t.min--)},getTickLimit:a,handleDirectionalChanges:a,buildTicks:function(){var t=this,a=t.options,i=a.ticks,n=e.getValueOrDefault,o=(t.isHorizontal(),t.ticks=[]),r=t.getTickLimit();r=Math.max(2,r);var l,s=i.fixedStepSize&&i.fixedStepSize>0||i.stepSize&&i.stepSize>0;if(s)l=n(i.fixedStepSize,i.stepSize);else{var d=e.niceNum(t.max-t.min,!1);l=e.niceNum(d/(r-1),!0)}var u=Math.floor(t.min/l)*l,c=Math.ceil(t.max/l)*l,h=(c-u)/l;h=e.almostEquals(h,Math.round(h),l/1e3)?Math.round(h):Math.ceil(h),o.push(void 0!==i.min?i.min:u);for(var f=1;h>f;++f)o.push(u+f*l);o.push(void 0!==i.max?i.max:c),t.handleDirectionalChanges(),t.max=e.max(o),t.min=e.min(o),i.reverse?(o.reverse(),t.start=t.max,t.end=t.min):(t.start=t.min,t.end=t.max)},convertTicksToLabels:function(){var e=this;e.ticksAsNumbers=e.ticks.slice(),e.zeroLineIndex=e.ticks.indexOf(0),t.Scale.prototype.convertTicksToLabels.call(e)}})}},{}],41:[function(t,e,a){"use strict";e.exports=function(t){var e=t.helpers,a={position:"left",ticks:{callback:function(t,a,i){var n=t/Math.pow(10,Math.floor(e.log10(t)));return 1===n||2===n||5===n||0===a||a===i.length-1?t.toExponential():""}}},i=t.Scale.extend({determineDataLimits:function(){function t(t){return d?t.xAxisID===a.id:t.yAxisID===a.id}var a=this,i=a.options,n=i.ticks,o=a.chart,r=o.data,l=r.datasets,s=e.getValueOrDefault,d=a.isHorizontal();if(a.min=null,a.max=null,i.stacked){var u={};e.each(l,function(n,r){var l=o.getDatasetMeta(r);o.isDatasetVisible(r)&&t(l)&&(void 0===u[l.type]&&(u[l.type]=[]),e.each(n.data,function(t,e){var n=u[l.type],o=+a.getRightValue(t);isNaN(o)||l.data[e].hidden||(n[e]=n[e]||0,i.relativePoints?n[e]=100:n[e]+=o)}))}),e.each(u,function(t){var i=e.min(t),n=e.max(t);a.min=null===a.min?i:Math.min(a.min,i),a.max=null===a.max?n:Math.max(a.max,n)})}else e.each(l,function(i,n){var r=o.getDatasetMeta(n);o.isDatasetVisible(n)&&t(r)&&e.each(i.data,function(t,e){var i=+a.getRightValue(t);isNaN(i)||r.data[e].hidden||(null===a.min?a.min=i:i<a.min&&(a.min=i),null===a.max?a.max=i:i>a.max&&(a.max=i))})});a.min=s(n.min,a.min),a.max=s(n.max,a.max),a.min===a.max&&(0!==a.min&&null!==a.min?(a.min=Math.pow(10,Math.floor(e.log10(a.min))-1),a.max=Math.pow(10,Math.floor(e.log10(a.max))+1)):(a.min=1,a.max=10))},buildTicks:function(){for(var t=this,a=t.options,i=a.ticks,n=e.getValueOrDefault,o=t.ticks=[],r=n(i.min,Math.pow(10,Math.floor(e.log10(t.min))));r<t.max;){o.push(r);var l=Math.floor(e.log10(r)),s=Math.floor(r/Math.pow(10,l))+1;10===s&&(s=1,++l),r=s*Math.pow(10,l)}var d=n(i.max,r);o.push(d),t.isHorizontal()||o.reverse(),t.max=e.max(o),t.min=e.min(o),i.reverse?(o.reverse(),t.start=t.max,t.end=t.min):(t.start=t.min,t.end=t.max)},convertTicksToLabels:function(){this.tickValues=this.ticks.slice(),t.Scale.prototype.convertTicksToLabels.call(this)},getLabelForIndex:function(t,e){return+this.getRightValue(this.chart.data.datasets[e].data[t])},getPixelForTick:function(t,e){return this.getPixelForValue(this.tickValues[t],null,null,e)},getPixelForValue:function(t,a,i,n){var o,r,l=this,s=l.start,d=+l.getRightValue(t),u=e.log10(l.end)-e.log10(s),c=l.paddingTop,h=l.paddingBottom,f=l.paddingLeft;return l.isHorizontal()?0===d?r=l.left+f:(o=l.width-(f+l.paddingRight),r=l.left+o/u*(e.log10(d)-e.log10(s)),r+=f):0===d?r=l.top+c:(o=l.height-(c+h),r=l.bottom-h-o/u*(e.log10(d)-e.log10(s))),r},getValueForPixel:function(t){var a,i,n=this,o=e.log10(n.end)-e.log10(n.start);return n.isHorizontal()?(i=n.width-(n.paddingLeft+n.paddingRight),a=n.start*Math.pow(10,(t-n.left-n.paddingLeft)*o/i)):(i=n.height-(n.paddingTop+n.paddingBottom),a=Math.pow(10,(n.bottom-n.paddingBottom-t)*o/i)/n.start),a}});t.scaleService.registerScaleType("logarithmic",i,a)}},{}],42:[function(t,e,a){"use strict";e.exports=function(t){var e=t.helpers,a=t.defaults.global,i={display:!0,animate:!0,lineArc:!1,position:"chartArea",angleLines:{display:!0,color:"rgba(0, 0, 0, 0.1)",lineWidth:1},ticks:{showLabelBackdrop:!0,backdropColor:"rgba(255,255,255,0.75)",backdropPaddingY:2,backdropPaddingX:2},pointLabels:{fontSize:10,callback:function(t){return t}}},n=t.LinearScaleBase.extend({getValueCount:function(){return this.chart.data.labels.length},setDimensions:function(){var t=this,i=t.options,n=i.ticks;t.width=t.maxWidth,t.height=t.maxHeight,t.xCenter=Math.round(t.width/2),t.yCenter=Math.round(t.height/2);var o=e.min([t.height,t.width]),r=e.getValueOrDefault(n.fontSize,a.defaultFontSize);t.drawingArea=i.display?o/2-(r/2+n.backdropPaddingY):o/2},determineDataLimits:function(){var t=this,a=t.chart;t.min=null,t.max=null,e.each(a.data.datasets,function(i,n){if(a.isDatasetVisible(n)){var o=a.getDatasetMeta(n);e.each(i.data,function(e,a){var i=+t.getRightValue(e);isNaN(i)||o.data[a].hidden||(null===t.min?t.min=i:i<t.min&&(t.min=i),null===t.max?t.max=i:i>t.max&&(t.max=i))})}}),t.handleTickRangeOptions()},getTickLimit:function(){var t=this.options.ticks,i=e.getValueOrDefault(t.fontSize,a.defaultFontSize);return Math.min(t.maxTicksLimit?t.maxTicksLimit:11,Math.ceil(this.drawingArea/(1.5*i)))},convertTicksToLabels:function(){
var e=this;t.LinearScaleBase.prototype.convertTicksToLabels.call(e),e.pointLabels=e.chart.data.labels.map(e.options.pointLabels.callback,e)},getLabelForIndex:function(t,e){return+this.getRightValue(this.chart.data.datasets[e].data[t])},fit:function(){var t,i,n,o,r,l,s,d,u,c,h,f,g=this.options.pointLabels,p=e.getValueOrDefault(g.fontSize,a.defaultFontSize),m=e.getValueOrDefault(g.fontStyle,a.defaultFontStyle),b=e.getValueOrDefault(g.fontFamily,a.defaultFontFamily),v=e.fontString(p,m,b),x=e.min([this.height/2-p-5,this.width/2]),y=this.width,k=0;for(this.ctx.font=v,i=0;i<this.getValueCount();i++)t=this.getPointPosition(i,x),n=this.ctx.measureText(this.pointLabels[i]?this.pointLabels[i]:"").width+5,0===i||i===this.getValueCount()/2?(o=n/2,t.x+o>y&&(y=t.x+o,r=i),t.x-o<k&&(k=t.x-o,s=i)):i<this.getValueCount()/2?t.x+n>y&&(y=t.x+n,r=i):i>this.getValueCount()/2&&t.x-n<k&&(k=t.x-n,s=i);u=k,c=Math.ceil(y-this.width),l=this.getIndexAngle(r),d=this.getIndexAngle(s),h=c/Math.sin(l+Math.PI/2),f=u/Math.sin(d+Math.PI/2),h=e.isNumber(h)?h:0,f=e.isNumber(f)?f:0,this.drawingArea=Math.round(x-(f+h)/2),this.setCenterPoint(f,h)},setCenterPoint:function(t,e){var a=this,i=a.width-e-a.drawingArea,n=t+a.drawingArea;a.xCenter=Math.round((n+i)/2+a.left),a.yCenter=Math.round(a.height/2+a.top)},getIndexAngle:function(t){var e=2*Math.PI/this.getValueCount();return t*e-Math.PI/2},getDistanceFromCenterForValue:function(t){var e=this;if(null===t)return 0;var a=e.drawingArea/(e.max-e.min);return e.options.reverse?(e.max-t)*a:(t-e.min)*a},getPointPosition:function(t,e){var a=this,i=a.getIndexAngle(t);return{x:Math.round(Math.cos(i)*e)+a.xCenter,y:Math.round(Math.sin(i)*e)+a.yCenter}},getPointPositionForValue:function(t,e){return this.getPointPosition(t,this.getDistanceFromCenterForValue(e))},getBasePosition:function(){var t=this,e=t.min,a=t.max;return t.getPointPositionForValue(0,t.beginAtZero?0:0>e&&0>a?a:e>0&&a>0?e:0)},draw:function(){var t=this,i=t.options,n=i.gridLines,o=i.ticks,r=i.angleLines,l=i.pointLabels,s=e.getValueOrDefault;if(i.display){var d=t.ctx,u=s(o.fontSize,a.defaultFontSize),c=s(o.fontStyle,a.defaultFontStyle),h=s(o.fontFamily,a.defaultFontFamily),f=e.fontString(u,c,h);if(e.each(t.ticks,function(r,l){if(l>0||i.reverse){var c=t.getDistanceFromCenterForValue(t.ticksAsNumbers[l]),h=t.yCenter-c;if(n.display&&0!==l)if(d.strokeStyle=e.getValueAtIndexOrDefault(n.color,l-1),d.lineWidth=e.getValueAtIndexOrDefault(n.lineWidth,l-1),i.lineArc)d.beginPath(),d.arc(t.xCenter,t.yCenter,c,0,2*Math.PI),d.closePath(),d.stroke();else{d.beginPath();for(var g=0;g<t.getValueCount();g++){var p=t.getPointPosition(g,c);0===g?d.moveTo(p.x,p.y):d.lineTo(p.x,p.y)}d.closePath(),d.stroke()}if(o.display){var m=s(o.fontColor,a.defaultFontColor);if(d.font=f,o.showLabelBackdrop){var b=d.measureText(r).width;d.fillStyle=o.backdropColor,d.fillRect(t.xCenter-b/2-o.backdropPaddingX,h-u/2-o.backdropPaddingY,b+2*o.backdropPaddingX,u+2*o.backdropPaddingY)}d.textAlign="center",d.textBaseline="middle",d.fillStyle=m,d.fillText(r,t.xCenter,h)}}}),!i.lineArc){d.lineWidth=r.lineWidth,d.strokeStyle=r.color;for(var g=t.getDistanceFromCenterForValue(i.reverse?t.min:t.max),p=s(l.fontSize,a.defaultFontSize),m=s(l.fontStyle,a.defaultFontStyle),b=s(l.fontFamily,a.defaultFontFamily),v=e.fontString(p,m,b),x=t.getValueCount()-1;x>=0;x--){if(r.display){var y=t.getPointPosition(x,g);d.beginPath(),d.moveTo(t.xCenter,t.yCenter),d.lineTo(y.x,y.y),d.stroke(),d.closePath()}var k=t.getPointPosition(x,g+5),S=s(l.fontColor,a.defaultFontColor);d.font=v,d.fillStyle=S;var w=t.pointLabels,C=w.length,M=w.length/2,D=M/2,A=D>x||x>C-D,I=x===D||x===C-D;0===x?d.textAlign="center":x===M?d.textAlign="center":M>x?d.textAlign="left":d.textAlign="right",I?d.textBaseline="middle":A?d.textBaseline="bottom":d.textBaseline="top",d.fillText(w[x]?w[x]:"",k.x,k.y)}}}}});t.scaleService.registerScaleType("radialLinear",n,i)}},{}],43:[function(t,e,a){"use strict";var i=t(1);i="function"==typeof i?i:window.moment,e.exports=function(t){var e=t.helpers,a={units:[{name:"millisecond",steps:[1,2,5,10,20,50,100,250,500]},{name:"second",steps:[1,2,5,10,30]},{name:"minute",steps:[1,2,5,10,30]},{name:"hour",steps:[1,2,3,6,12]},{name:"day",steps:[1,2,5]},{name:"week",maxStep:4},{name:"month",maxStep:3},{name:"quarter",maxStep:4},{name:"year",maxStep:!1}]},n={position:"bottom",time:{parser:!1,format:!1,unit:!1,round:!1,displayFormat:!1,isoWeekday:!1,displayFormats:{millisecond:"h:mm:ss.SSS a",second:"h:mm:ss a",minute:"h:mm:ss a",hour:"MMM D, hA",day:"ll",week:"ll",month:"MMM YYYY",quarter:"[Q]Q - YYYY",year:"YYYY"}},ticks:{autoSkip:!1}},o=t.Scale.extend({initialize:function(){if(!i)throw new Error("Chart.js - Moment.js could not be found! You must include it before Chart.js to use the time scale. Download at https://momentjs.com");t.Scale.prototype.initialize.call(this)},getLabelMoment:function(t,e){return this.labelMoments[t][e]},getMomentStartOf:function(t){var e=this;return"week"===e.options.time.unit&&e.options.time.isoWeekday!==!1?t.clone().startOf("isoWeek").isoWeekday(e.options.time.isoWeekday):t.clone().startOf(e.tickUnit)},determineDataLimits:function(){var t=this;t.labelMoments=[];var a=[];t.chart.data.labels&&t.chart.data.labels.length>0?(e.each(t.chart.data.labels,function(e,i){var n=t.parseTime(e);n.isValid()&&(t.options.time.round&&n.startOf(t.options.time.round),a.push(n))},t),t.firstTick=i.min.call(t,a),t.lastTick=i.max.call(t,a)):(t.firstTick=null,t.lastTick=null),e.each(t.chart.data.datasets,function(n,o){var r=[],l=t.chart.isDatasetVisible(o);"object"==typeof n.data[0]&&null!==n.data[0]?e.each(n.data,function(e,a){var n=t.parseTime(t.getRightValue(e));n.isValid()&&(t.options.time.round&&n.startOf(t.options.time.round),r.push(n),l&&(t.firstTick=null!==t.firstTick?i.min(t.firstTick,n):n,t.lastTick=null!==t.lastTick?i.max(t.lastTick,n):n))},t):r=a,t.labelMoments.push(r)},t),t.options.time.min&&(t.firstTick=t.parseTime(t.options.time.min)),t.options.time.max&&(t.lastTick=t.parseTime(t.options.time.max)),t.firstTick=(t.firstTick||i()).clone(),t.lastTick=(t.lastTick||i()).clone()},buildTicks:function(i){var n=this;n.ctx.save();var o=e.getValueOrDefault(n.options.ticks.fontSize,t.defaults.global.defaultFontSize),r=e.getValueOrDefault(n.options.ticks.fontStyle,t.defaults.global.defaultFontStyle),l=e.getValueOrDefault(n.options.ticks.fontFamily,t.defaults.global.defaultFontFamily),s=e.fontString(o,r,l);if(n.ctx.font=s,n.ticks=[],n.unitScale=1,n.scaleSizeInUnits=0,n.options.time.unit)n.tickUnit=n.options.time.unit||"day",n.displayFormat=n.options.time.displayFormats[n.tickUnit],n.scaleSizeInUnits=n.lastTick.diff(n.firstTick,n.tickUnit,!0),n.unitScale=e.getValueOrDefault(n.options.time.unitStepSize,1);else{var d=n.isHorizontal()?n.width-(n.paddingLeft+n.paddingRight):n.height-(n.paddingTop+n.paddingBottom),u=n.tickFormatFunction(n.firstTick,0,[]),c=n.ctx.measureText(u).width,h=Math.cos(e.toRadians(n.options.ticks.maxRotation)),f=Math.sin(e.toRadians(n.options.ticks.maxRotation));c=c*h+o*f;var g=d/c;n.tickUnit="millisecond",n.scaleSizeInUnits=n.lastTick.diff(n.firstTick,n.tickUnit,!0),n.displayFormat=n.options.time.displayFormats[n.tickUnit];for(var p=0,m=a.units[p];p<a.units.length;){if(n.unitScale=1,e.isArray(m.steps)&&Math.ceil(n.scaleSizeInUnits/g)<e.max(m.steps)){for(var b=0;b<m.steps.length;++b)if(m.steps[b]>=Math.ceil(n.scaleSizeInUnits/g)){n.unitScale=e.getValueOrDefault(n.options.time.unitStepSize,m.steps[b]);break}break}if(m.maxStep===!1||Math.ceil(n.scaleSizeInUnits/g)<m.maxStep){n.unitScale=e.getValueOrDefault(n.options.time.unitStepSize,Math.ceil(n.scaleSizeInUnits/g));break}++p,m=a.units[p],n.tickUnit=m.name;var v=n.firstTick.diff(n.getMomentStartOf(n.firstTick),n.tickUnit,!0),x=n.getMomentStartOf(n.lastTick.clone().add(1,n.tickUnit)).diff(n.lastTick,n.tickUnit,!0);n.scaleSizeInUnits=n.lastTick.diff(n.firstTick,n.tickUnit,!0)+v+x,n.displayFormat=n.options.time.displayFormats[m.name]}}var y;if(n.options.time.min?y=n.getMomentStartOf(n.firstTick):(n.firstTick=n.getMomentStartOf(n.firstTick),y=n.firstTick),!n.options.time.max){var k=n.getMomentStartOf(n.lastTick);0!==k.diff(n.lastTick,n.tickUnit,!0)&&(n.lastTick=n.getMomentStartOf(n.lastTick.add(1,n.tickUnit)))}n.smallestLabelSeparation=n.width,e.each(n.chart.data.datasets,function(t,e){for(var a=1;a<n.labelMoments[e].length;a++)n.smallestLabelSeparation=Math.min(n.smallestLabelSeparation,n.labelMoments[e][a].diff(n.labelMoments[e][a-1],n.tickUnit,!0))},n),n.options.time.displayFormat&&(n.displayFormat=n.options.time.displayFormat),n.ticks.push(n.firstTick.clone());for(var S=1;S<=n.scaleSizeInUnits;++S){var w=y.clone().add(S,n.tickUnit);if(n.options.time.max&&w.diff(n.lastTick,n.tickUnit,!0)>=0)break;S%n.unitScale===0&&n.ticks.push(w)}var C=n.ticks[n.ticks.length-1].diff(n.lastTick,n.tickUnit);(0!==C||0===n.scaleSizeInUnits)&&(n.options.time.max?(n.ticks.push(n.lastTick.clone()),n.scaleSizeInUnits=n.lastTick.diff(n.ticks[0],n.tickUnit,!0)):(n.ticks.push(n.lastTick.clone()),n.scaleSizeInUnits=n.lastTick.diff(n.firstTick,n.tickUnit,!0))),n.ctx.restore()},getLabelForIndex:function(t,e){var a=this,i=a.chart.data.labels&&t<a.chart.data.labels.length?a.chart.data.labels[t]:"";return"object"==typeof a.chart.data.datasets[e].data[0]&&(i=a.getRightValue(a.chart.data.datasets[e].data[t])),a.options.time.tooltipFormat&&(i=a.parseTime(i).format(a.options.time.tooltipFormat)),i},tickFormatFunction:function(t,a,i){var n=t.format(this.displayFormat),o=this.options.ticks,r=e.getValueOrDefault(o.callback,o.userCallback);return r?r(n,a,i):n},convertTicksToLabels:function(){var t=this;t.tickMoments=t.ticks,t.ticks=t.ticks.map(t.tickFormatFunction,t)},getPixelForValue:function(t,e,a,i){var n=this,o=t&&t.isValid&&t.isValid()?t:n.getLabelMoment(a,e);if(o){var r=o.diff(n.firstTick,n.tickUnit,!0),l=r/n.scaleSizeInUnits;if(n.isHorizontal()){var s=n.width-(n.paddingLeft+n.paddingRight),d=(s/Math.max(n.ticks.length-1,1),s*l+n.paddingLeft);return n.left+Math.round(d)}var u=n.height-(n.paddingTop+n.paddingBottom),c=(u/Math.max(n.ticks.length-1,1),u*l+n.paddingTop);return n.top+Math.round(c)}},getPixelForTick:function(t,e){return this.getPixelForValue(this.tickMoments[t],null,null,e)},getValueForPixel:function(t){var e=this,a=e.isHorizontal()?e.width-(e.paddingLeft+e.paddingRight):e.height-(e.paddingTop+e.paddingBottom),n=(t-(e.isHorizontal()?e.left+e.paddingLeft:e.top+e.paddingTop))/a;return n*=e.scaleSizeInUnits,e.firstTick.clone().add(i.duration(n,e.tickUnit).asSeconds(),"seconds")},parseTime:function(t){var e=this;return"string"==typeof e.options.time.parser?i(t,e.options.time.parser):"function"==typeof e.options.time.parser?e.options.time.parser(t):"function"==typeof t.getMonth||"number"==typeof t?i(t):t.isValid&&t.isValid()?t:"string"!=typeof e.options.time.format&&e.options.time.format.call?(console.warn("options.time.format is deprecated and replaced by options.time.parser. See http://nnnick.github.io/Chart.js/docs-v2/#scales-time-scale"),e.options.time.format(t)):i(t,e.options.time.format)}});t.scaleService.registerScaleType("time",o,n)}},{1:1}]},{},[7])(7)});
(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/**
 * @file Configuration for Pageviews application
 * @author MusikAnimal
 * @copyright 2016 MusikAnimal
 */

const templates = require('./templates');

/**
 * Configuration for Pageviews application.
 * This includes selectors, defaults, and other constants specific to Pageviews
 * @type {Object}
 */
const config = {
  agentSelector: '#agent-select',
  chart: '.aqs-chart',
  chartLegend: templates.chartLegend,
  dateRangeSelector: '.aqs-date-range-selector',
  defaults: {
    dateRange: 'latest-20'
  },
  logarithmicCheckbox: '.logarithmic-scale-option',
  platformSelector: '#platform-select',
  projectInput: '.aqs-project-input',
  select2Input: '.aqs-select2-selector',
  validateParams: ['project', 'platform', 'agent']
};

module.exports = config;

},{"./templates":7}],2:[function(require,module,exports){
/**
 * Pageviews Analysis tool
 * @file Main file for Pageviews application
 * @author MusikAnimal, Kaldari, Marcelrf
 * @copyright 2016 MusikAnimal, Kaldari, Marcelrf
 * @license MIT License: https://opensource.org/licenses/MIT
 */

const config = require('./config');
const Pv = require('./shared/pv');
const ChartHelpers = require('./shared/chart_helpers');

/** Main PageViews class */
class PageViews extends mix(Pv).with(ChartHelpers) {
  constructor() {
    super(config);
    this.app = 'pageviews';

    this.entityInfo = false; /** let's us know if we've gotten the page info from API yet */
    this.specialRange = null;
    this.initialQuery = false;
    this.sort = 'title';
    this.direction = '-1';

    /**
     * Select2 library prints "Uncaught TypeError: XYZ is not a function" errors
     * caused by race conditions between consecutive ajax calls. They are actually
     * not critical and can be avoided with this empty function.
     */
    window.articleSuggestionCallback = $.noop;
  }

  /**
   * Initialize the application.
   * Called in `pv.js` after translations have loaded
   * @return {null} Nothing
   */
  initialize() {
    this.setupDateRangeSelector();
    this.setupSelect2();
    this.setupSelect2Colors();
    this.popParams();
    this.setupListeners();
    this.updateInterAppLinks();
  }

  /**
   * Query musikanimal API to get edit data about page within date range
   * @param {Array} pages - page names
   * @returns {Deferred} Promise resolving with editing data
   */
  getEditData(pages) {
    const dfd = $.Deferred();

    if (metaRoot) {
      $.ajax({
        url: `//${ metaRoot }/article_analysis/basic_info`,
        data: {
          pages: pages.join('|'),
          project: this.project,
          start: this.daterangepicker.startDate.format('YYYY-MM-DD'),
          end: this.daterangepicker.endDate.format('YYYY-MM-DD')
        }
      }).then(data => dfd.resolve(data));
    } else {
      dfd.resolve({
        num_edits: 0,
        num_users: 0
      });
    }

    return dfd;
  }

  /**
   * Link to /langviews for given page and chosen daterange
   * @param {String} page - page title
   * @returns {String} URL
   */
  getLangviewsURL(page) {
    return `/langviews?${ $.param(this.getParams()) }&page=${ page.replace(/[&%]/g, escape).score() }`;
  }

  /**
   * Link to /redirectviews for given page and chosen daterange
   * @param {String} page - page title
   * @returns {String} URL
   */
  getRedirectviewsURL(page) {
    return `/redirectviews?${ $.param(this.getParams()) }&page=${ page.replace(/[&%]/g, escape).score() }`;
  }

  /**
   * Construct query for API based on what type of search we're doing
   * @param {Object} query - as returned from Select2 input
   * @returns {Object} query params to be handed off to API
   */
  getSearchParams(query) {
    if (this.autocomplete === 'autocomplete') {
      return {
        action: 'query',
        list: 'prefixsearch',
        format: 'json',
        pssearch: query || '',
        cirrusUseCompletionSuggester: 'yes'
      };
    } else if (this.autocomplete === 'autocomplete_redirects') {
      return {
        action: 'query',
        generator: 'prefixsearch',
        format: 'json',
        gpssearch: query || '',
        gpslimit: '10',
        redirects: 'true',
        cirrusUseCompletionSuggester: 'no'
      };
    }
  }

  /**
   * Parses the URL query string and sets all the inputs accordingly
   * Should only be called on initial page load, until we decide to support pop states (probably never)
   * @returns {null} nothing
   */
  popParams() {
    /** show loading indicator and add error handling for timeouts */
    setTimeout(this.startSpinny.bind(this)); // use setTimeout to force rendering threads to catch up

    let params = this.validateParams(this.parseQueryString('pages'));

    $(this.config.projectInput).val(params.project);
    $(this.config.platformSelector).val(params.platform);
    $(this.config.agentSelector).val(params.agent);

    this.patchUsage();
    this.validateDateRange(params);

    this.resetSelect2();

    /**
     * Sets the Select2 defaults, which triggers the Select2 listener and calls this.processInput
     * @param {Array} pages - pages to query
     * @return {null} nothing
     */
    const getPageInfoAndSetDefaults = pages => {
      this.getPageAndEditInfo(pages).then(pageInfo => {
        this.initialQuery = true;
        const normalizedPageNames = Object.keys(pageInfo);
        this.setSelect2Defaults(this.underscorePageNames(normalizedPageNames));
      });
    };

    // set up default pages if none were passed in
    if (!params.pages || !params.pages.length) {
      // only set default of Cat and Dog for enwiki
      if (this.project === 'en.wikipedia') {
        params.pages = ['Cat', 'Dog'];
        this.setInitialChartType(params.pages.length);
        getPageInfoAndSetDefaults(params.pages);
      } else {
        // leave Select2 empty and put focus on it so they can type in pages
        this.focusSelect2();
        // manually hide spinny since we aren't drawing the chart,
        // again using setTimeout to let everything catch up
        setTimeout(this.stopSpinny.bind(this));
        this.setInitialChartType();
      }
      // If there's more than 10 articles attempt to create a PagePile and open it in Massviews
    } else if (params.pages.length > 10) {
        // If a PagePile is successfully created we are redirected to Massviews and the promise is never resolved,
        //   otherwise we just take the first 10 and process as we would normally
        this.massviewsRedirectWithPagePile(params.pages).then(getPageInfoAndSetDefaults);
      } else {
        this.setInitialChartType(params.pages.length);
        getPageInfoAndSetDefaults(params.pages);
      }
  }

  /**
   * Processes Mediawiki API results into Select2 format based on settings
   * @param {Object} data - data as received from the API
   * @returns {Object} data ready to handed over to Select2
   */
  processSearchResults(data) {
    const query = data ? data.query : {};
    let results = [];

    if (!query) return { results };

    if (this.autocomplete === 'autocomplete') {
      if (query.prefixsearch.length) {
        results = query.prefixsearch.map(function (elem) {
          return {
            id: elem.title.score(),
            text: elem.title
          };
        });
      }
    } else if (this.autocomplete === 'autocomplete_redirects') {
      /** first merge in redirects */
      if (query.redirects) {
        results = query.redirects.map(red => {
          return {
            id: red.from.score(),
            text: red.from
          };
        });
      }

      Object.keys(query.pages).forEach(pageId => {
        const pageData = query.pages[pageId];
        results.push({
          id: pageData.title.score(),
          text: pageData.title
        });
      });
    }

    return { results: results };
  }

  /**
   * Get all user-inputted parameters except the pages
   * @param {boolean} [specialRange] whether or not to include the special range instead of start/end, if applicable
   * @return {Object} project, platform, agent, etc.
   */
  getParams(specialRange = true) {
    let params = {
      project: $(this.config.projectInput).val(),
      platform: $(this.config.platformSelector).val(),
      agent: $(this.config.agentSelector).val()
    };

    /**
     * Override start and end with custom range values, if configured (set by URL params or setupDateRangeSelector)
     * Valid values are those defined in config.specialRanges, constructed like `{range: 'last-month'}`,
     *   or a relative range like `{range: 'latest-N'}` where N is the number of days.
     */
    if (this.specialRange && specialRange) {
      params.range = this.specialRange.range;
    } else {
      params.start = this.daterangepicker.startDate.format('YYYY-MM-DD');
      params.end = this.daterangepicker.endDate.format('YYYY-MM-DD');
    }

    /** add autolog param only if it was passed in originally, and only if it was false (true would be default) */
    if (this.noLogScale) params.autolog = 'false';

    return params;
  }

  /**
   * Replaces history state with new URL query string representing current user input
   * Called whenever we go to update the chart
   * @returns {null} nothing
   */
  pushParams() {
    const pages = $(this.config.select2Input).select2('val') || [],
          escapedPages = pages.join('|').replace(/[&%]/g, escape);

    if (window.history && window.history.replaceState) {
      window.history.replaceState({}, document.title, `?${ $.param(this.getParams()) }&pages=${ escapedPages }`);
    }

    $('.permalink').prop('href', `?${ $.param(this.getPermaLink()) }&pages=${ escapedPages }`);
  }

  /**
   * Sets up the article selector and adds listener to update chart
   * @returns {null} - nothing
   */
  setupSelect2() {
    const $select2Input = $(this.config.select2Input);

    let params = {
      ajax: this.getArticleSelectorAjax(),
      tags: this.autocomplete === 'no_autocomplete',
      placeholder: $.i18n('article-placeholder'),
      maximumSelectionLength: 10,
      minimumInputLength: 1
    };

    $select2Input.select2(params);
    $select2Input.on('change', this.processInput.bind(this));
    $select2Input.on('select2:open', e => {
      if ($(e.target).val() && $(e.target).val().length === 10) {
        $('.select2-search__field').one('keyup', () => {
          const message = $.i18n('massviews-notice', 10, `<strong><a href='/massviews/'>${ $.i18n('massviews') }</a></strong>`);
          this.writeMessage(message, 'info', 10000);
        });
      }
    });
  }

  /**
   * Get ajax parameters to be used in setupSelect2, based on this.autocomplete
   * @return {object|null} to be passed in as the value for `ajax` in setupSelect2
   */
  getArticleSelectorAjax() {
    if (this.autocomplete !== 'no_autocomplete') {
      /**
       * This ajax call queries the Mediawiki API for article name
       * suggestions given the search term inputed in the selector.
       * We ultimately want to make the endpoint configurable based on whether they want redirects
       */
      return {
        url: `https://${ this.project }.org/w/api.php`,
        dataType: 'jsonp',
        delay: 200,
        jsonpCallback: 'articleSuggestionCallback',
        data: search => this.getSearchParams(search.term),
        processResults: this.processSearchResults.bind(this),
        cache: true
      };
    } else {
      return null;
    }
  }

  /**
   * Calls parent setupProjectInput and updates the view if validations passed
   *   reverting to the old value if the new one is invalid
   * @returns {null} nothing
   * @override
   */
  validateProject() {
    if (super.validateProject()) {
      this.resetView(true);
      this.focusSelect2();
    }
  }

  /**
   * General place to add page-wide listeners
   * @override
   * @returns {null} - nothing
   */
  setupListeners() {
    super.setupListeners();
    $('#platform-select, #agent-select').on('change', this.processInput.bind(this));
    $('.sort-link').on('click', e => {
      const sortType = $(e.currentTarget).data('type');
      this.direction = this.sort === sortType ? -this.direction : 1;
      this.sort = sortType;
      this.updateTable();
    });
  }

  /**
   * Query the API for each page, building up the datasets and then calling renderData
   * @param {boolean} force - whether to force the chart to re-render, even if no params have changed
   * @returns {null} - nothin
   */
  processInput(force) {
    this.pushParams();

    /** prevent duplicate querying due to conflicting listeners */
    if (!force && location.search === this.params && this.prevChartType === this.chartType) {
      return;
    }

    this.params = location.search;

    const entities = $(config.select2Input).select2('val') || [];

    if (!entities.length) {
      return this.resetView();
    }

    this.setInitialChartType(entities.length);

    // clear out old error messages unless the is the first time rendering the chart
    this.clearMessages();

    this.prevChartType = this.chartType;
    this.destroyChart();
    this.startSpinny(); // show spinny and capture against fatal errors

    // We've already gotten data about the intial set of pages
    // This is because we need any page names given to be normalized when the app first loads
    if (this.initialQuery) {
      this.getPageViewsData(entities).done(xhrData => this.updateChart(xhrData));
      // set back to false so we get page and edit info for any newly entered pages
      this.initialQuery = false;
    } else {
      this.getPageAndEditInfo(entities).then(() => {
        this.getPageViewsData(entities).done(xhrData => this.updateChart(xhrData));
      });
    }
  }

  updateTable() {
    if (this.outputData.length === 1) return $('.table-view').hide();

    $('.output-list').html('');

    /** sort ascending by current sort setting */
    const datasets = this.outputData.sort((a, b) => {
      const before = this.getSortProperty(a, this.sort),
            after = this.getSortProperty(b, this.sort);

      if (before < after) {
        return this.direction;
      } else if (before > after) {
        return -this.direction;
      } else {
        return 0;
      }
    });

    $('.sort-link span').removeClass('glyphicon-sort-by-alphabet-alt glyphicon-sort-by-alphabet').addClass('glyphicon-sort');
    const newSortClassName = parseInt(this.direction, 10) === 1 ? 'glyphicon-sort-by-alphabet-alt' : 'glyphicon-sort-by-alphabet';
    $(`.sort-link--${ this.sort } span`).addClass(newSortClassName).removeClass('glyphicon-sort');

    let hasProtection = false;
    datasets.forEach((item, index) => {
      if (item.protection !== $.i18n('none')) hasProtection = true;

      $('.output-list').append(`<tr>
         <td class='table-view--color-col'>
          <span class='table-view--color-block' style="background:${ item.color }"></span>
         </td>
         <td>${ this.getPageLink(item.label) }</td>
         <td>${ this.formatNumber(item.sum) }</td>
         <td>${ this.formatNumber(item.average) }</td>
         <td>${ this.formatNumber(item.num_edits) }</td>
         <td>${ this.formatNumber(item.num_users) }</td>
         <td>${ this.formatNumber(item.length) }</td>
         <td>${ item.protection }</td>
         <td>${ this.formatNumber(item.watchers) }</td>
         <td>
          <a href="${ this.getLangviewsURL(item.label) }" target="_blank">${ $.i18n('all-languages') }</a>
          &bull;
          <a href="${ this.getRedirectviewsURL(item.label) }" target="_blank">${ $.i18n('redirects') }</a>
         </td>
         </tr>`);
    });

    // hide protection column if no pages are protected
    $('.table-view--protection').toggle(hasProtection);

    $('.table-view').show();
  }

  /**
   * Get value of given page for the purposes of column sorting in table view
   * @param  {object} item - page name
   * @param  {String} type - type of property to get
   * @return {String|Number} - value
   */
  getSortProperty(item, type) {
    switch (type) {
      case 'title':
        return item.label;
      case 'views':
        return Number(item.sum);
      case 'average':
        return Number(item.average);
      case 'edits':
        return Number(item.num_edits);
      case 'editors':
        return Number(item.num_users);
      case 'size':
        return Number(item.length);
      case 'watchers':
        return Number(item.watchers);
    }
  }

  /**
   * Get page info and editing info of given pages.
   * Also sets this.entityInfo
   * @param  {Array} pages - page names
   * @return {Deferred} Promise resolving with this.entityInfo
   */
  getPageAndEditInfo(pages) {
    const dfd = $.Deferred();

    this.getPageInfo(pages).done(data => {
      this.entityInfo = data;
      // use Object.keys(data) to get normalized page names
      this.getEditData(Object.keys(data)).done(editData => {
        for (let page in editData.pages) {
          Object.assign(this.entityInfo[page.descore()], editData.pages[page]);
        }
        dfd.resolve(this.entityInfo);
      }).fail(() => {
        dfd.resolve(this.entityInfo); // treat as if successful, simply won't show the data
      });
    }).fail(() => {
      dfd.resolve({}); // same, simply won't show the data if it failed
    });

    return dfd;
  }

  /**
   * Create a PagePile with given pages using the API and redirect to Massviews.
   * This is used when the user passes in more than 10 pages
   * @param {Array} pages - pages to convert to a PagePile and open in Massviews
   * @returns {Deferred} promise resolved only if creation of PagePile failed
   */
  massviewsRedirectWithPagePile(pages) {
    const dfd = $.Deferred();

    $.ajax({
      url: '//tools.wmflabs.org/pagepile/api.php',
      data: {
        action: 'create_pile_with_data',
        wiki: this.dbName(this.project),
        data: pages.join('\n')
      }
    }).success(pileData => {
      const params = this.getParams();
      delete params.project;
      document.location = `/massviews?overflow=1&${ $.param(params) }&source=pagepile&target=${ pileData.pile.id }`;
    }).fail(() => {
      // just grab first 10 pages and throw an error
      this.writeMessage($.i18n('auto-pagepile-error', 'PagePile', 10), 'error');
      dfd.resolve(pages.slice(0, 10));
    });

    return dfd;
  }
}

$(document).ready(() => {
  /** assume hash params are supposed to be query params */
  if (document.location.hash && !document.location.search) {
    return document.location.href = document.location.href.replace('#', '?');
  } else if (document.location.hash) {
    return document.location.href = document.location.href.replace(/\#.*/, '');
  }

  new PageViews();
});

},{"./config":1,"./shared/chart_helpers":3,"./shared/pv":4}],3:[function(require,module,exports){
/**
 * @file Shared chart-specific logic
 * @author MusikAnimal
 * @copyright 2016 MusikAnimal
 * @license MIT License: https://opensource.org/licenses/MIT
 */

/**
 * Shared chart-specific logic, used in all apps except Topviews
 * @param {class} superclass - base class
 * @returns {null} class extending superclass
 */
const ChartHelpers = superclass => class extends superclass {
  constructor(appConfig) {
    super(appConfig);

    this.chartObj = null;
    this.prevChartType = null;
    this.autoChartType = true; // will become false when they manually change the chart type

    /** ensure we have a valid chart type in localStorage, result of Chart.js 1.0 to 2.0 migration */
    const storedChartType = this.getFromLocalStorage('pageviews-chart-preference');
    if (!this.config.linearCharts.includes(storedChartType) && !this.config.circularCharts.includes(storedChartType)) {
      this.setLocalStorage('pageviews-chart-preference', this.config.defaults.chartType());
    }

    // leave if there's no chart configured
    if (!this.config.chart) return;

    /** @type {Boolean} add ability to disable auto-log detection */
    this.noLogScale = location.search.includes('autolog=false');

    /** copy over app-specific chart templates */
    this.config.linearCharts.forEach(linearChart => {
      this.config.chartConfig[linearChart].opts.legendTemplate = this.config.linearLegend;
    });
    this.config.circularCharts.forEach(circularChart => {
      this.config.chartConfig[circularChart].opts.legendTemplate = this.config.circularLegend;
    });

    Object.assign(Chart.defaults.global, { animation: false, responsive: true });

    /** changing of chart types */
    $('.modal-chart-type a').on('click', e => {
      this.chartType = $(e.currentTarget).data('type');
      this.autoChartType = false;

      $('.logarithmic-scale').toggle(this.isLogarithmicCapable());
      $('.begin-at-zero').toggle(this.config.linearCharts.includes(this.chartType));

      if (this.rememberChart === 'true') {
        this.setLocalStorage('pageviews-chart-preference', this.chartType);
      }

      this.isChartApp() ? this.updateChart(this.pageViewsData) : this.renderData();
    });

    $(this.config.logarithmicCheckbox).on('click', () => {
      this.autoLogDetection = 'false';
      this.isChartApp() ? this.updateChart(this.pageViewsData) : this.renderData();
    });

    /**
     * disabled/enable begin at zero checkbox accordingly,
     * but don't update chart since the log scale value can change pragmatically and not from user input
     */
    $(this.config.logarithmicCheckbox).on('change', () => {
      $('.begin-at-zero').toggleClass('disabled', this.checked);
    });

    if (this.beginAtZero === 'true') {
      $('.begin-at-zero-option').prop('checked', true);
    }

    $('.begin-at-zero-option').on('click', () => {
      this.isChartApp() ? this.updateChart(this.pageViewsData) : this.renderData();
    });

    /** chart download listeners */
    $('.download-png').on('click', this.exportPNG.bind(this));
    $('.print-chart').on('click', this.printChart.bind(this));
  }

  /**
   * Set the default chart type or the one from localStorage, based on settings
   * @param {Number} [numDatasets] - number of datasets
   * @returns {null} nothing
   */
  setInitialChartType(numDatasets = 1) {
    if (this.rememberChart === 'true') {
      this.chartType = this.getFromLocalStorage('pageviews-chart-preference') || this.config.defaults.chartType(numDatasets);
    } else {
      this.chartType = this.config.defaults.chartType(numDatasets);
    }
  }

  /**
   * Destroy previous chart, if needed.
   * @returns {null} nothing
   */
  destroyChart() {
    if (this.chartObj) {
      this.chartObj.destroy();
      $('.chart-legend').html('');
    }
  }

  /**
   * Exports current chart data to CSV format and loads it in a new tab
   * With the prepended data:text/csv this should cause the browser to download the data
   * @returns {null} Nothing
   */
  exportCSV() {
    let csvContent = 'data:text/csv;charset=utf-8,Date,';
    let titles = [];
    let dataRows = [];
    let dates = this.getDateHeadings(false);

    // Begin constructing the dataRows array by populating it with the dates
    dates.forEach((date, index) => {
      dataRows[index] = [date];
    });

    this.chartObj.data.datasets.forEach(site => {
      // Build an array of site titles for use in the CSV header
      let siteTitle = '"' + site.label.replace(/"/g, '""') + '"';
      titles.push(siteTitle);

      // Populate the dataRows array with the data for this site
      dates.forEach((date, index) => {
        dataRows[index].push(site.data[index]);
      });
    });

    // Finish the CSV header
    csvContent = csvContent + titles.join(',') + '\n';

    // Add the rows to the CSV
    dataRows.forEach(data => {
      csvContent += data.join(',') + '\n';
    });

    this.downloadData(csvContent, 'csv');
  }

  /**
   * Exports current chart data to JSON format and loads it in a new tab
   * @returns {null} Nothing
   */
  exportJSON() {
    let data = [];

    this.chartObj.data.datasets.forEach((page, index) => {
      let entry = {
        page: page.label.replace(/"/g, '\"').replace(/'/g, "\'"),
        color: page.strokeColor,
        sum: page.sum,
        daily_average: Math.round(page.sum / this.numDaysInRange())
      };

      this.getDateHeadings(false).forEach((heading, index) => {
        entry[heading.replace(/\\/, '')] = page.data[index];
      });

      data.push(entry);
    });

    const jsonContent = 'data:text/json;charset=utf-8,' + JSON.stringify(data);
    this.downloadData(jsonContent, 'json');
  }

  /**
   * Exports current data as PNG image, opening it in a new tab
   * @returns {null} nothing
   */
  exportPNG() {
    this.downloadData(this.chartObj.toBase64Image(), 'png');
  }

  /**
   * Fills in zero value to a timeseries, see:
   * https://wikitech.wikimedia.org/wiki/Analytics/AQS/Pageview_API#Gotchas
   *
   * @param {object} data fetched from API
   * @param {moment} startDate - start date of range to filter through
   * @param {moment} endDate - end date of range
   * @returns {object} dataset with zeros where nulls where
   */
  fillInZeros(data, startDate, endDate) {
    /** Extract the dates that are already in the timeseries */
    let alreadyThere = {};
    data.items.forEach(elem => {
      let date = moment(elem.timestamp, this.config.timestampFormat);
      alreadyThere[date] = elem;
    });
    data.items = [];

    /** Reconstruct with zeros instead of nulls */
    for (let date = moment(startDate); date <= endDate; date.add(1, 'd')) {
      if (alreadyThere[date]) {
        data.items.push(alreadyThere[date]);
      } else {
        const edgeCase = date.isSame(this.config.maxDate) || date.isSame(moment(this.config.maxDate).subtract(1, 'days'));
        data.items.push({
          timestamp: date.format(this.config.timestampFormat),
          [this.isPageviews() ? 'views' : 'devices']: edgeCase ? null : 0
        });
      }
    }

    return data;
  }

  /**
   * Get data formatted for Chart.js and the legend templates
   * @param {Array} datasets - as retrieved by getPageViewsData
   * @returns {object} - ready for chart rendering
   */
  buildChartData(datasets) {
    const labels = $(this.config.select2Input).val();

    /** preserve order of datasets due to async calls */
    return datasets.map((dataset, index) => {
      /** Build the article's dataset. */
      const values = dataset.map(elem => this.isPageviews() ? elem.views : elem.devices),
            sum = values.reduce((a, b) => a + b),
            average = Math.round(sum / values.length),
            max = Math.max(...values),
            min = Math.min(...values),
            color = this.config.colors[index % 10],
            label = labels[index].descore();

      const entityInfo = this.entityInfo ? this.entityInfo[label] : {};

      dataset = Object.assign({
        label,
        data: values,
        value: sum, // duplicated because Chart.js wants a single `value` for circular charts
        sum,
        average,
        max,
        min,
        color
      }, this.config.chartConfig[this.chartType].dataset(color), entityInfo);

      if (this.isLogarithmic()) {
        dataset.data = dataset.data.map(view => view || null);
      }

      return dataset;
    });
  }

  /**
   * Get url to query the API based on app and options
   * @param {String} entity - name of entity we're querying for (page name or project name)
   * @param {moment} startDate - start date
   * @param {moment} endDate - end date
   * @return {String} the URL
   */
  getApiUrl(entity, startDate, endDate) {
    const uriEncodedEntityName = encodeURIComponent(entity);

    if (this.app === 'siteviews') {
      return this.isPageviews() ? `https://wikimedia.org/api/rest_v1/metrics/pageviews/aggregate/${ uriEncodedEntityName }` + `/${ $(this.config.platformSelector).val() }/${ $(this.config.agentSelector).val() }/daily` + `/${ startDate.format(this.config.timestampFormat) }/${ endDate.format(this.config.timestampFormat) }` : `https://wikimedia.org/api/rest_v1/metrics/unique-devices/${ uriEncodedEntityName }/${ $(this.config.platformSelector).val() }/daily` + `/${ startDate.format(this.config.timestampFormat) }/${ endDate.format(this.config.timestampFormat) }`;
    } else {
      return `https://wikimedia.org/api/rest_v1/metrics/pageviews/per-article/${ this.project }` + `/${ $(this.config.platformSelector).val() }/${ $(this.config.agentSelector).val() }/${ uriEncodedEntityName }/daily` + `/${ startDate.format(this.config.timestampFormat) }/${ endDate.format(this.config.timestampFormat) }`;
    }
  }

  /**
   * Mother function for querying the API and processing data
   * @param  {Array}  entities - list of page names, or projects for Siteviews
   * @return {Deferred} Promise resolving with pageviews data and errors, if present
   */
  getPageViewsData(entities) {
    let dfd = $.Deferred(),
        count = 0,
        failureRetries = {},
        totalRequestCount = entities.length,
        failedEntities = [];

    /** @type {Object} everything we need to keep track of for the promises */
    let xhrData = {
      entities,
      labels: [], // Labels (dates) for the x-axis.
      datasets: [], // Data for each article timeseries
      errors: [], // Queue up errors to show after all requests have been made
      fatalErrors: [], // Unrecoverable JavaScript errors
      promises: []
    };

    const makeRequest = (entity, index) => {
      const startDate = this.daterangepicker.startDate.startOf('day'),
            endDate = this.daterangepicker.endDate.startOf('day'),
            url = this.getApiUrl(entity, startDate, endDate),
            promise = $.ajax({ url, dataType: 'json' });

      xhrData.promises.push(promise);

      promise.done(successData => {
        try {
          successData = this.fillInZeros(successData, startDate, endDate);

          xhrData.datasets.push(successData.items);

          /** fetch the labels for the x-axis on success if we haven't already */
          if (successData.items && !xhrData.labels.length) {
            xhrData.labels = successData.items.map(elem => {
              return moment(elem.timestamp, this.config.timestampFormat).format(this.dateFormat);
            });
          }
        } catch (err) {
          return xhrData.fatalErrors.push(err);
        }
      }).fail(errorData => {
        /** first detect if this was a Cassandra backend error, and if so, schedule a re-try */
        const cassandraError = errorData.responseJSON.title === 'Error in Cassandra table storage backend';

        if (cassandraError) {
          if (failureRetries[entity]) {
            failureRetries[entity]++;
          } else {
            failureRetries[entity] = 1;
          }

          /** maximum of 3 retries */
          if (failureRetries[entity] < 3) {
            totalRequestCount++;
            return this.rateLimit(makeRequest, this.config.apiThrottle, this)(entity, index);
          }
        }

        // remove this article from the list of entities to analyze
        xhrData.entities = xhrData.entities.filter(el => el !== entity);

        if (cassandraError) {
          failedEntities.push(entity);
        } else {
          let link = this.app === 'siteviews' ? this.getSiteLink(entity) : this.getPageLink(entity, this.project);
          xhrData.errors.push(`${ link }: ${ $.i18n('api-error', 'Pageviews API') } - ${ errorData.responseJSON.title }`);
        }
      }).always(() => {
        if (++count === totalRequestCount) {
          this.pageViewsData = xhrData;
          dfd.resolve(xhrData);

          if (failedEntities.length) {
            this.writeMessage($.i18n('api-error-timeout', '<ul>' + failedEntities.map(failedEntity => `<li>${ this.getPageLink(failedEntity, this.project.escape()) }</li>`).join('') + '</ul>'));
          }
        }
      });
    };

    entities.forEach((entity, index) => makeRequest(entity, index));

    return dfd;
  }

  /**
   * Get params needed to create a permanent link of visible data
   * @return {Object} hash of params
   */
  getPermaLink() {
    let params = this.getParams(false);
    delete params.range;
    return params;
  }

  /**
   * Are we currently in logarithmic mode?
   * @returns {Boolean} true or false
   */
  isLogarithmic() {
    return $(this.config.logarithmicCheckbox).is(':checked') && this.isLogarithmicCapable();
  }

  /**
   * Test if the current chart type supports a logarithmic scale
   * @returns {Boolean} log-friendly or not
   */
  isLogarithmicCapable() {
    return ['line', 'bar'].includes(this.chartType);
  }

  /**
   * Are we trying to show data on pageviews (as opposed to unique devices)?
   * @return {Boolean} true or false
   */
  isPageviews() {
    return this.app === 'pageviews' || $(this.config.dataSourceSelector).val() === 'pageviews';
  }

  /**
   * Are we trying to show data on pageviews (as opposed to unique devices)?
   * @return {Boolean} true or false
   */
  isUniqueDevices() {
    return !this.isPageviews();
  }

  /**
   * Print the chart!
   * @returns {null} Nothing
   */
  printChart() {
    let tab = window.open();
    tab.document.write(`<img src="${ this.chartObj.toBase64Image() }" />`);
    tab.print();
    tab.close();
  }

  /**
   * Removes chart, messages, and resets site selections
   * @param {boolean} [select2] whether or not to clear the Select2 input
   * @returns {null} nothing
   */
  resetView(select2 = false) {
    try {
      /** these can fail sometimes */
      this.destroyChart();
      if (select2) this.resetSelect2();
    } catch (e) {// nothing
    } finally {
      this.stopSpinny();
      $('.data-links').addClass('invisible');
      $(this.config.chart).hide();
      this.clearMessages();
    }
  }

  /**
   * Attempt to fine-tune the pointer detection spacing based on how cluttered the chart is
   * @returns {Number} radius
   */
  setChartPointDetectionRadius() {
    if (this.chartType !== 'line') return;

    if (this.numDaysInRange() > 50) {
      Chart.defaults.global.elements.point.hitRadius = 3;
    } else if (this.numDaysInRange() > 30) {
      Chart.defaults.global.elements.point.hitRadius = 5;
    } else if (this.numDaysInRange() > 20) {
      Chart.defaults.global.elements.point.hitRadius = 10;
    } else {
      Chart.defaults.global.elements.point.hitRadius = 30;
    }
  }

  /**
   * Determine if we should show a logarithmic chart for the given dataset, based on Theil index
   * @param  {Array} datasets - pageviews
   * @return {Boolean} yes or no
   */
  shouldBeLogarithmic(datasets) {
    if (!this.isLogarithmicCapable() || this.noLogScale) {
      return false;
    }

    let sets = [];
    // convert NaNs and nulls to zeros
    datasets.forEach(dataset => {
      sets.push(dataset.map(val => val || 0));
    });

    // overall max value
    const maxValue = Math.max(...[].concat(...sets));

    if (maxValue <= 10) return false;

    let logarithmicNeeded = false;

    sets.forEach(set => {
      set.push(maxValue);

      const sum = set.reduce((a, b) => a + b),
            average = sum / set.length;
      let theil = 0;
      set.forEach(v => theil += v ? v * Math.log(v / average) : 0);

      if (theil / sum > 0.5) {
        return logarithmicNeeded = true;
      }
    });

    return logarithmicNeeded;
  }

  /**
   * sets up the daterange selector and adds listeners
   * @returns {null} - nothing
   */
  setupDateRangeSelector() {
    super.setupDateRangeSelector();

    /** prevent duplicate setup since the list view apps also use charts */
    if (!this.isChartApp()) return;

    const dateRangeSelector = $(this.config.dateRangeSelector);

    /** the "Latest N days" links */
    $('.date-latest a').on('click', e => {
      this.setSpecialRange(`latest-${ $(e.target).data('value') }`);
    });

    dateRangeSelector.on('change', e => {
      this.setChartPointDetectionRadius();
      this.processInput();

      /** clear out specialRange if it doesn't match our input */
      if (this.specialRange && this.specialRange.value !== e.target.value) {
        this.specialRange = null;
      }
    });
  }

  /**
   * Update the chart with data provided by processInput()
   * @param {Object} xhrData - data as constructed by processInput()
   * @returns {null} - nothin
   */
  updateChart(xhrData) {
    $('.chart-legend').html(''); // clear old chart legend

    // show pending error messages if present, exiting if fatal
    if (this.showErrors(xhrData)) return;

    if (!xhrData.entities.length) {
      return this.stopSpinny();
    } else if (xhrData.entities.length === 1) {
      $('.multi-page-chart-node').hide();
    } else {
      $('.multi-page-chart-node').show();
    }

    this.outputData = this.buildChartData(xhrData.datasets, xhrData.entities);

    if (this.autoLogDetection === 'true') {
      const shouldBeLogarithmic = this.shouldBeLogarithmic(this.outputData.map(set => set.data));
      $(this.config.logarithmicCheckbox).prop('checked', shouldBeLogarithmic);
      $('.begin-at-zero').toggleClass('disabled', shouldBeLogarithmic);
    }

    let options = Object.assign({ scales: {} }, this.config.chartConfig[this.chartType].opts, this.config.globalChartOpts);

    if (this.isLogarithmic()) {
      options.scales = Object.assign({}, options.scales, {
        yAxes: [{
          type: 'logarithmic',
          ticks: {
            callback: (value, index, arr) => {
              const remain = value / Math.pow(10, Math.floor(Chart.helpers.log10(value)));

              if (remain === 1 || remain === 2 || remain === 5 || index === 0 || index === arr.length - 1) {
                return this.formatNumber(value);
              } else {
                return '';
              }
            }
          }
        }]
      });
    }

    this.stopSpinny();

    try {
      $('.chart-container').html('').append("<canvas class='aqs-chart'>");
      this.setChartPointDetectionRadius();
      const context = $(this.config.chart)[0].getContext('2d');

      if (this.config.linearCharts.includes(this.chartType)) {
        const linearData = { labels: xhrData.labels, datasets: this.outputData };

        if (this.chartType === 'radar') {
          options.scale.ticks.beginAtZero = $('.begin-at-zero-option').is(':checked');
        } else {
          options.scales.yAxes[0].ticks.beginAtZero = $('.begin-at-zero-option').is(':checked');
        }

        this.chartObj = new Chart(context, {
          type: this.chartType,
          data: linearData,
          options
        });
      } else {
        this.chartObj = new Chart(context, {
          type: this.chartType,
          data: {
            labels: this.outputData.map(d => d.label),
            datasets: [{
              data: this.outputData.map(d => d.value),
              backgroundColor: this.outputData.map(d => d.backgroundColor),
              hoverBackgroundColor: this.outputData.map(d => d.hoverBackgroundColor),
              averages: this.outputData.map(d => d.average)
            }]
          },
          options
        });
      }
    } catch (err) {
      return this.showErrors({
        errors: [],
        fatalErrors: [err]
      });
    }

    $('.chart-legend').html(this.chartObj.generateLegend());
    $('.data-links').removeClass('invisible');

    if (this.app === 'pageviews') this.updateTable();
  }

  /**
   * Show errors built in this.processInput
   * @param {object} xhrData - as built by this.processInput, like `{ errors: [], fatalErrors: [] }`
   * @returns {boolean} whether or not fatal errors occured
   */
  showErrors(xhrData) {
    if (xhrData.fatalErrors.length) {
      this.resetView(true);
      const fatalErrors = xhrData.fatalErrors.unique();
      this.showFatalErrors(fatalErrors);

      return true;
    }

    if (xhrData.errors.length) {
      // if everything failed, reset the view, clearing out space taken up by empty chart
      if (xhrData.entities && (xhrData.errors.length === xhrData.entities.length || !xhrData.entities.length)) {
        this.resetView();
      }

      xhrData.errors.unique().forEach(error => this.writeMessage(error));
    }

    return false;
  }
};

module.exports = ChartHelpers;

},{}],4:[function(require,module,exports){
/**
 * @file Shared code amongst all apps (Pageviews, Topviews, Langviews, Siteviews, Massviews, Redirect Views)
 * @author MusikAnimal, Kaldari
 * @copyright 2016 MusikAnimal
 * @license MIT License: https://opensource.org/licenses/MIT
 */

const PvConfig = require('./pv_config');
const siteMap = require('./site_map');
const siteDomains = Object.keys(siteMap).map(key => siteMap[key]);

/** Pv class, contains code amongst all apps (Pageviews, Topviews, Langviews, Siteviews, Massviews, Redirect Views) */
class Pv extends PvConfig {
  constructor(appConfig) {
    super(appConfig);

    /** assign initial class properties */
    const defaults = this.config.defaults,
          validParams = this.config.validParams;
    this.config = Object.assign({}, this.config, appConfig);
    this.config.defaults = Object.assign({}, defaults, appConfig.defaults);
    this.config.validParams = Object.assign({}, validParams, appConfig.validParams);

    this.colorsStyleEl = undefined;
    this.storage = {}; // used as fallback when localStorage is not supported

    ['localizeDateFormat', 'numericalFormatting', 'bezierCurve', 'autocomplete', 'autoLogDetection', 'beginAtZero', 'rememberChart'].forEach(setting => {
      this[setting] = this.getFromLocalStorage(`pageviews-settings-${ setting }`) || this.config.defaults[setting];
    });
    this.setupSettingsModal();

    this.params = null;
    this.siteInfo = {};

    /** @type {null|Date} tracking of elapsed time */
    this.processStart = null;

    /** assign app instance to window for debugging on local environment */
    if (location.host === 'localhost') {
      window.app = this;
    } else {
      this.splash();
    }

    this.debug = location.search.includes('debug=true') || location.host === 'localhost';

    /** show notice if on staging environment */
    if (/-test/.test(location.pathname)) {
      const actualPathName = location.pathname.replace(/-test\/?/, '');
      this.addSiteNotice('warning', `This is a staging environment. For the actual ${ document.title },
         see <a href='${ actualPathName }'>${ location.hostname }${ actualPathName }</a>`);
    }

    /**
     * Load translations then initialize the app.
     * Each app has it's own initialize method.
     * Make sure we load 'en.json' as a fallback
     */
    let messagesToLoad = {
      [i18nLang]: `/pageviews/messages/${ i18nLang }.json`
    };
    if (i18nLang !== 'en') {
      messagesToLoad.en = '/pageviews/messages/en.json';
    }
    $.i18n({
      locale: i18nLang
    }).load(messagesToLoad).then(this.initialize.bind(this));

    /** set up toastr config. The duration may be overriden later */
    toastr.options = {
      closeButton: true,
      debug: location.host === 'localhost',
      newestOnTop: false,
      progressBar: false,
      positionClass: 'toast-top-center',
      preventDuplicates: true,
      onclick: null,
      showDuration: '300',
      hideDuration: '1000',
      timeOut: '5000',
      extendedTimeOut: '3000',
      showEasing: 'swing',
      hideEasing: 'linear',
      showMethod: 'fadeIn',
      hideMethod: 'fadeOut',
      toastClass: 'alert',
      iconClasses: {
        error: 'alert-danger',
        info: 'alert-info',
        success: 'alert-success',
        warning: 'alert-warning'
      }
    };
  }

  /**
   * Add a site notice (Bootstrap alert)
   * @param {String} level - one of 'success', 'info', 'warning' or 'error'
   * @param {String} message - message to show
   * @param {String} [title] - will appear in bold and in front of the message
   * @param {Boolean} [dismissable] - whether or not to add a X
   *   that allows the user to dismiss the notice
   * @returns {null} nothing
   */
  addSiteNotice(level, message, title, dismissable) {
    title = title ? `<strong>${ title }</strong> ` : '';

    let markup = title + message;

    this.writeMessage(markup, level, dismissable ? 10000 : 0);
  }

  /**
   * Add site notice for invalid parameter
   * @param {String} param - name of parameter
   * @returns {null} nothing
   */
  addInvalidParamNotice(param) {
    const docLink = `<a href='/${ this.app }/url_structure'>${ $.i18n('documentation') }</a>`;
    this.addSiteNotice('error', $.i18n('param-error-3', param, docLink), $.i18n('invalid-params'), true);
  }

  /**
   * Validate the date range of given params
   *   and throw errors as necessary and/or set defaults
   * @param {Object} params - as returned by this.parseQueryString()
   * @returns {Boolean} true if there were no errors, false otherwise
   */
  validateDateRange(params) {
    if (params.range) {
      if (!this.setSpecialRange(params.range)) {
        this.addInvalidParamNotice('range');
        this.setSpecialRange(this.config.defaults.dateRange);
      }
    } else if (params.start) {
      const dateRegex = /\d{4}-\d{2}-\d{2}$/;

      // first set defaults
      let startDate, endDate;

      // then check format of start and end date
      if (params.start && dateRegex.test(params.start)) {
        startDate = moment(params.start);
      } else {
        this.addInvalidParamNotice('start');
        return false;
      }
      if (params.end && dateRegex.test(params.end)) {
        endDate = moment(params.end);
      } else {
        this.addInvalidParamNotice('end');
        return false;
      }

      // check if they are outside the valid range or if in the wrong order
      if (startDate < this.config.minDate || endDate < this.config.minDate) {
        this.addSiteNotice('error', $.i18n('param-error-1', moment(this.config.minDate).format(this.dateFormat)), $.i18n('invalid-params'), true);
        return false;
      } else if (startDate > endDate) {
        this.addSiteNotice('error', $.i18n('param-error-2'), $.i18n('invalid-params'), true);
        return false;
      }

      /** directly assign startDate before calling setEndDate so events will be fired once */
      this.daterangepicker.startDate = startDate;
      this.daterangepicker.setEndDate(endDate);
    } else {
      this.setSpecialRange(this.config.defaults.dateRange);
    }

    return true;
  }

  clearSiteNotices() {
    $('.site-notice').html('');
  }

  clearMessages() {
    $('.message-container').html('');
  }

  /**
   * Get date format to use based on settings
   * @returns {string} date format to passed to parser
   */
  get dateFormat() {
    if (this.localizeDateFormat === 'true') {
      return this.getLocaleDateString();
    } else {
      return this.config.defaults.dateFormat;
    }
  }

  /**
   * Get the daterangepicker instance. Plain and simple.
   * @return {Object} daterange picker
   */
  get daterangepicker() {
    return $(this.config.dateRangeSelector).data('daterangepicker');
  }

  /**
   * Get the database name of the given projet
   * @param  {String} project - with or without .org
   * @return {String} database name
   */
  dbName(project) {
    return Object.keys(siteMap).find(key => siteMap[key] === `${ project.replace(/\.org$/, '') }.org`);
  }

  /**
   * Force download of given data, or open in a new tab if HTML5 <a> download attribute is not supported
   * @param {String} data - Raw data prepended with data type, e.g. "data:text/csv;charset=utf-8,my data..."
   * @param {String} extension - the file extension to use
   * @returns {null} Nothing
   */
  downloadData(data, extension) {
    const encodedUri = encodeURI(data);

    // create HTML5 download element and force click so we can specify a filename
    const link = document.createElement('a');
    if (typeof link.download === 'string') {
      document.body.appendChild(link); // Firefox requires the link to be in the body

      const filename = `${ this.getExportFilename() }.${ extension }`;
      link.download = filename;
      link.href = encodedUri;
      link.click();

      document.body.removeChild(link); // remove the link when done
    } else {
        window.open(encodedUri); // open in new tab if download isn't supported (*cough* Safari)
      }
  }

  /**
   * Fill in values within settings modal with what's in the session object
   * @returns {null} nothing
   */
  fillInSettings() {
    $.each($('#settings-modal input'), (index, el) => {
      if (el.type === 'checkbox') {
        el.checked = this[el.name] === 'true';
      } else {
        el.checked = this[el.name] === el.value;
      }
    });
  }

  /**
   * Add focus to Select2 input field
   * @returns {null} nothing
   */
  focusSelect2() {
    $('.select2-selection').trigger('click');
    $('.select2-search__field').focus();
  }

  /**
   * Format number based on current settings, e.g. localize with comma delimeters
   * @param {number|string} num - number to format
   * @returns {string} formatted number
   */
  formatNumber(num) {
    const numericalFormatting = this.getFromLocalStorage('pageviews-settings-numericalFormatting') || this.config.defaults.numericalFormatting;
    if (numericalFormatting === 'true') {
      return this.n(num);
    } else {
      return num;
    }
  }

  formatYAxisNumber(num) {
    if (num % 1 === 0) {
      return this.formatNumber(num);
    } else {
      return null;
    }
  }

  /**
   * Gets the date headings as strings - i18n compliant
   * @param {boolean} localized - whether the dates should be localized per browser language
   * @returns {Array} the date headings as strings
   */
  getDateHeadings(localized) {
    const dateHeadings = [],
          endDate = moment(this.daterangepicker.endDate).add(1, 'd');

    for (let date = moment(this.daterangepicker.startDate); date.isBefore(endDate); date.add(1, 'd')) {
      if (localized) {
        dateHeadings.push(date.format(this.dateFormat));
      } else {
        dateHeadings.push(date.format('YYYY-MM-DD'));
      }
    }
    return dateHeadings;
  }

  /**
   * Get the explanded wiki URL given the page name
   * This should be used instead of getPageURL when you want to chain query string parameters
   *
   * @param {string} page name
   * @returns {string} URL for the page
   */
  getExpandedPageURL(page) {
    return `//${ this.project }.org/w/index.php?title=${ encodeURIComponent(page.score()).replace(/'/, escape) }`;
  }

  /**
   * Get informative filename without extension to be used for export options
   * @return {string} filename without an extension
   */
  getExportFilename() {
    const startDate = this.daterangepicker.startDate.startOf('day').format('YYYYMMDD'),
          endDate = this.daterangepicker.endDate.startOf('day').format('YYYYMMDD');
    return `${ this.app }-${ startDate }-${ endDate }`;
  }

  /**
   * Get a full link for the given page and project
   * @param  {string} page - page to link to
   * @param  {string} [project] - project link, defaults to `this.project`
   * @return {string} HTML markup
   */
  getPageLink(page, project) {
    return `<a target="_blank" href="${ this.getPageURL(page, project) }">${ page.descore().escape() }</a>`;
  }

  /**
   * Get the wiki URL given the page name
   *
   * @param {string} page - page name
   * @returns {string} URL for the page
   */
  getPageURL(page, project = this.project) {
    return `//${ project.replace(/\.org$/, '').escape() }.org/wiki/${ page.score().replace(/'/, escape) }`;
  }

  /**
   * Get the wiki URL given the page name
   *
   * @param {string} site - site name (e.g. en.wikipedia.org)
   * @returns {string} URL for the site
   */
  getSiteLink(site) {
    return `<a target="_blank" href="//${ site }.org">${ site }</a>`;
  }

  /**
   * Get the project name (without the .org)
   *
   * @returns {boolean} lang.projectname
   */
  get project() {
    const project = $(this.config.projectInput).val();
    /** Get the first 2 characters from the project code to get the language */
    return project ? project.toLowerCase().replace(/.org$/, '') : null;
  }

  getLocaleDateString() {
    if (!navigator.language) {
      return this.config.defaults.dateFormat;
    }

    const formats = {
      'ar-sa': 'DD/MM/YY',
      'bg-bg': 'DD.M.YYYY',
      'ca-es': 'DD/MM/YYYY',
      'zh-tw': 'YYYY/M/D',
      'cs-cz': 'D.M.YYYY',
      'da-dk': 'DD-MM-YYYY',
      'de-de': 'DD.MM.YYYY',
      'el-gr': 'D/M/YYYY',
      'en-us': 'M/D/YYYY',
      'fi-fi': 'D.M.YYYY',
      'fr-fr': 'DD/MM/YYYY',
      'he-il': 'DD/MM/YYYY',
      'hu-hu': 'YYYY. MM. DD.',
      'is-is': 'D.M.YYYY',
      'it-it': 'DD/MM/YYYY',
      'ja-jp': 'YYYY/MM/DD',
      'ko-kr': 'YYYY-MM-DD',
      'nl-nl': 'D-M-YYYY',
      'nb-no': 'DD.MM.YYYY',
      'pl-pl': 'YYYY-MM-DD',
      'pt-br': 'D/M/YYYY',
      'ro-ro': 'DD.MM.YYYY',
      'ru-ru': 'DD.MM.YYYY',
      'hr-hr': 'D.M.YYYY',
      'sk-sk': 'D. M. YYYY',
      'sq-al': 'YYYY-MM-DD',
      'sv-se': 'YYYY-MM-DD',
      'th-th': 'D/M/YYYY',
      'tr-tr': 'DD.MM.YYYY',
      'ur-pk': 'DD/MM/YYYY',
      'id-id': 'DD/MM/YYYY',
      'uk-ua': 'DD.MM.YYYY',
      'be-by': 'DD.MM.YYYY',
      'sl-si': 'D.M.YYYY',
      'et-ee': 'D.MM.YYYY',
      'lv-lv': 'YYYY.MM.DD.',
      'lt-lt': 'YYYY.MM.DD',
      'fa-ir': 'MM/DD/YYYY',
      'vi-vn': 'DD/MM/YYYY',
      'hy-am': 'DD.MM.YYYY',
      'az-latn-az': 'DD.MM.YYYY',
      'eu-es': 'YYYY/MM/DD',
      'mk-mk': 'DD.MM.YYYY',
      'af-za': 'YYYY/MM/DD',
      'ka-ge': 'DD.MM.YYYY',
      'fo-fo': 'DD-MM-YYYY',
      'hi-in': 'DD-MM-YYYY',
      'ms-my': 'DD/MM/YYYY',
      'kk-kz': 'DD.MM.YYYY',
      'ky-kg': 'DD.MM.YY',
      'sw-ke': 'M/d/YYYY',
      'uz-latn-uz': 'DD/MM YYYY',
      'tt-ru': 'DD.MM.YYYY',
      'pa-in': 'DD-MM-YY',
      'gu-in': 'DD-MM-YY',
      'ta-in': 'DD-MM-YYYY',
      'te-in': 'DD-MM-YY',
      'kn-in': 'DD-MM-YY',
      'mr-in': 'DD-MM-YYYY',
      'sa-in': 'DD-MM-YYYY',
      'mn-mn': 'YY.MM.DD',
      'gl-es': 'DD/MM/YY',
      'kok-in': 'DD-MM-YYYY',
      'syr-sy': 'DD/MM/YYYY',
      'dv-mv': 'DD/MM/YY',
      'ar-iq': 'DD/MM/YYYY',
      'zh-cn': 'YYYY/M/D',
      'de-ch': 'DD.MM.YYYY',
      'en-gb': 'DD/MM/YYYY',
      'es-mx': 'DD/MM/YYYY',
      'fr-be': 'D/MM/YYYY',
      'it-ch': 'DD.MM.YYYY',
      'nl-be': 'D/MM/YYYY',
      'nn-no': 'DD.MM.YYYY',
      'pt-pt': 'DD-MM-YYYY',
      'sr-latn-cs': 'D.M.YYYY',
      'sv-fi': 'D.M.YYYY',
      'az-cyrl-az': 'DD.MM.YYYY',
      'ms-bn': 'DD/MM/YYYY',
      'uz-cyrl-uz': 'DD.MM.YYYY',
      'ar-eg': 'DD/MM/YYYY',
      'zh-hk': 'D/M/YYYY',
      'de-at': 'DD.MM.YYYY',
      'en-au': 'D/MM/YYYY',
      'es-es': 'DD/MM/YYYY',
      'fr-ca': 'YYYY-MM-DD',
      'sr-cyrl-cs': 'D.M.YYYY',
      'ar-ly': 'DD/MM/YYYY',
      'zh-sg': 'D/M/YYYY',
      'de-lu': 'DD.MM.YYYY',
      'en-ca': 'DD/MM/YYYY',
      'es-gt': 'DD/MM/YYYY',
      'fr-ch': 'DD.MM.YYYY',
      'ar-dz': 'DD-MM-YYYY',
      'zh-mo': 'D/M/YYYY',
      'de-li': 'DD.MM.YYYY',
      'en-nz': 'D/MM/YYYY',
      'es-cr': 'DD/MM/YYYY',
      'fr-lu': 'DD/MM/YYYY',
      'ar-ma': 'DD-MM-YYYY',
      'en-ie': 'DD/MM/YYYY',
      'es-pa': 'MM/DD/YYYY',
      'fr-mc': 'DD/MM/YYYY',
      'ar-tn': 'DD-MM-YYYY',
      'en-za': 'YYYY/MM/DD',
      'es-do': 'DD/MM/YYYY',
      'ar-om': 'DD/MM/YYYY',
      'en-jm': 'DD/MM/YYYY',
      'es-ve': 'DD/MM/YYYY',
      'ar-ye': 'DD/MM/YYYY',
      'en-029': 'MM/DD/YYYY',
      'es-co': 'DD/MM/YYYY',
      'ar-sy': 'DD/MM/YYYY',
      'en-bz': 'DD/MM/YYYY',
      'es-pe': 'DD/MM/YYYY',
      'ar-jo': 'DD/MM/YYYY',
      'en-tt': 'DD/MM/YYYY',
      'es-ar': 'DD/MM/YYYY',
      'ar-lb': 'DD/MM/YYYY',
      'en-zw': 'M/D/YYYY',
      'es-ec': 'DD/MM/YYYY',
      'ar-kw': 'DD/MM/YYYY',
      'en-ph': 'M/D/YYYY',
      'es-cl': 'DD-MM-YYYY',
      'ar-ae': 'DD/MM/YYYY',
      'es-uy': 'DD/MM/YYYY',
      'ar-bh': 'DD/MM/YYYY',
      'es-py': 'DD/MM/YYYY',
      'ar-qa': 'DD/MM/YYYY',
      'es-bo': 'DD/MM/YYYY',
      'es-sv': 'DD/MM/YYYY',
      'es-hn': 'DD/MM/YYYY',
      'es-ni': 'DD/MM/YYYY',
      'es-pr': 'DD/MM/YYYY',
      'am-et': 'D/M/YYYY',
      'tzm-latn-dz': 'DD-MM-YYYY',
      'iu-latn-ca': 'D/MM/YYYY',
      'sma-no': 'DD.MM.YYYY',
      'mn-mong-cn': 'YYYY/M/D',
      'gd-gb': 'DD/MM/YYYY',
      'en-my': 'D/M/YYYY',
      'prs-af': 'DD/MM/YY',
      'bn-bd': 'DD-MM-YY',
      'wo-sn': 'DD/MM/YYYY',
      'rw-rw': 'M/D/YYYY',
      'qut-gt': 'DD/MM/YYYY',
      'sah-ru': 'MM.DD.YYYY',
      'gsw-fr': 'DD/MM/YYYY',
      'co-fr': 'DD/MM/YYYY',
      'oc-fr': 'DD/MM/YYYY',
      'mi-nz': 'DD/MM/YYYY',
      'ga-ie': 'DD/MM/YYYY',
      'se-se': 'YYYY-MM-DD',
      'br-fr': 'DD/MM/YYYY',
      'smn-fi': 'D.M.YYYY',
      'moh-ca': 'M/D/YYYY',
      'arn-cl': 'DD-MM-YYYY',
      'ii-cn': 'YYYY/M/D',
      'dsb-de': 'D. M. YYYY',
      'ig-ng': 'D/M/YYYY',
      'kl-gl': 'DD-MM-YYYY',
      'lb-lu': 'DD/MM/YYYY',
      'ba-ru': 'DD.MM.YY',
      'nso-za': 'YYYY/MM/DD',
      'quz-bo': 'DD/MM/YYYY',
      'yo-ng': 'D/M/YYYY',
      'ha-latn-ng': 'D/M/YYYY',
      'fil-ph': 'M/D/YYYY',
      'ps-af': 'DD/MM/YY',
      'fy-nl': 'D-M-YYYY',
      'ne-np': 'M/D/YYYY',
      'se-no': 'DD.MM.YYYY',
      'iu-cans-ca': 'D/M/YYYY',
      'sr-latn-rs': 'D.M.YYYY',
      'si-lk': 'YYYY-MM-DD',
      'sr-cyrl-rs': 'D.M.YYYY',
      'lo-la': 'DD/MM/YYYY',
      'km-kh': 'YYYY-MM-DD',
      'cy-gb': 'DD/MM/YYYY',
      'bo-cn': 'YYYY/M/D',
      'sms-fi': 'D.M.YYYY',
      'as-in': 'DD-MM-YYYY',
      'ml-in': 'DD-MM-YY',
      'en-in': 'DD-MM-YYYY',
      'or-in': 'DD-MM-YY',
      'bn-in': 'DD-MM-YY',
      'tk-tm': 'DD.MM.YY',
      'bs-latn-ba': 'D.M.YYYY',
      'mt-mt': 'DD/MM/YYYY',
      'sr-cyrl-me': 'D.M.YYYY',
      'se-fi': 'D.M.YYYY',
      'zu-za': 'YYYY/MM/DD',
      'xh-za': 'YYYY/MM/DD',
      'tn-za': 'YYYY/MM/DD',
      'hsb-de': 'D. M. YYYY',
      'bs-cyrl-ba': 'D.M.YYYY',
      'tg-cyrl-tj': 'DD.MM.yy',
      'sr-latn-ba': 'D.M.YYYY',
      'smj-no': 'DD.MM.YYYY',
      'rm-ch': 'DD/MM/YYYY',
      'smj-se': 'YYYY-MM-DD',
      'quz-ec': 'DD/MM/YYYY',
      'quz-pe': 'DD/MM/YYYY',
      'hr-ba': 'D.M.YYYY.',
      'sr-latn-me': 'D.M.YYYY',
      'sma-se': 'YYYY-MM-DD',
      'en-sg': 'D/M/YYYY',
      'ug-cn': 'YYYY-M-D',
      'sr-cyrl-ba': 'D.M.YYYY',
      'es-us': 'M/D/YYYY'
    };

    const key = navigator.language.toLowerCase();
    return formats[key] || this.config.defaults.dateFormat;
  }

  /**
   * Get a value from localStorage, using a temporary storage if localStorage is not supported
   * @param {string} key - key for the value to retrieve
   * @returns {Mixed} stored value
   */
  getFromLocalStorage(key) {
    // See if localStorage is supported and enabled
    try {
      return localStorage.getItem(key);
    } catch (err) {
      return storage[key];
    }
  }

  /**
   * Get URL to file a report on Meta, preloaded with permalink
   * @param {String} [phabPaste] URL to auto-generated error report on Phabricator
   * @return {String} URL
   */
  getBugReportURL(phabPaste) {
    const reportURL = 'https://meta.wikimedia.org/w/index.php?title=Talk:Pageviews_Analysis&action=edit' + `&section=new&preloadtitle=${ this.app.upcase() } bug report`;

    if (phabPaste) {
      return `${ reportURL }&preload=Talk:Pageviews_Analysis/Preload&preloadparams[]=${ phabPaste }`;
    } else {
      return reportURL;
    }
  }

  /**
   * Get general information about a project, such as namespaces, title of the main page, etc.
   * Data returned by the api is also stored in this.siteInfo
   * @param {String} project - project such as en.wikipedia (with or without .org)
   * @returns {Deferred} promise resolving with siteinfo,
   *   along with any other cached siteinfo for other projects
   */
  fetchSiteInfo(project) {
    project = project.replace(/\.org$/, '');
    const dfd = $.Deferred(),
          cacheKey = `pageviews-siteinfo-${ project }`;

    if (this.siteInfo[project]) return dfd.resolve(this.siteInfo);

    // use cached site info if present
    if (simpleStorage.hasKey(cacheKey)) {
      this.siteInfo[project] = simpleStorage.get(cacheKey);
      dfd.resolve(this.siteInfo);
    } else {
      // otherwise fetch siteinfo and store in cache
      $.ajax({
        url: `https://${ project }.org/w/api.php`,
        data: {
          action: 'query',
          meta: 'siteinfo',
          siprop: 'general|namespaces',
          format: 'json'
        },
        dataType: 'jsonp'
      }).done(data => {
        this.siteInfo[project] = data.query;

        // cache for one week (TTL is in milliseconds)
        simpleStorage.set(cacheKey, this.siteInfo[project], { TTL: 1000 * 60 * 60 * 24 * 7 });

        dfd.resolve(this.siteInfo);
      }).fail(data => {
        dfd.reject(data);
      });
    }

    return dfd;
  }

  /**
   * Helper to get siteinfo from this.siteInfo for given project, with or without .org
   * @param {String} project - project name, with or without .org
   * @returns {Object|undefined} site information if present
   */
  getSiteInfo(project) {
    return this.siteInfo[project.replace(/\.org$/, '')];
  }

  /**
   * Get user agent, if supported
   * @returns {string} user-agent
   */
  getUserAgent() {
    return navigator.userAgent ? navigator.userAgent : 'Unknown';
  }

  /**
   * Set a value to localStorage, using a temporary storage if localStorage is not supported
   * @param {string} key - key for the value to set
   * @param {Mixed} value - value to store
   * @returns {Mixed} stored value
   */
  setLocalStorage(key, value) {
    // See if localStorage is supported and enabled
    try {
      return localStorage.setItem(key, value);
    } catch (err) {
      return storage[key] = value;
    }
  }

  /**
   * Generate a unique hash code from given string
   * @param  {String} str - to be hashed
   * @return {String} the hash
   */
  hashCode(str) {
    return str.split('').reduce((prevHash, currVal) => (prevHash << 5) - prevHash + currVal.charCodeAt(0), 0);
  }

  /**
   * Is this one of the chart-view apps (that does not have a list view)?
   * @return {Boolean} true or false
   */
  isChartApp() {
    return !this.isListApp();
  }

  /**
   * Is this one of the list-view apps?
   * @return {Boolean} true or false
   */
  isListApp() {
    return ['langviews', 'massviews', 'redirectviews'].includes(this.app);
  }

  /**
   * Test if the current project is a multilingual project
   * @returns {Boolean} is multilingual or not
   */
  isMultilangProject() {
    return new RegExp(`.*?\\.(${ Pv.multilangProjects.join('|') })`).test(this.project);
  }

  /**
   * Map normalized pages from API into a string of page names
   * Used in normalizePageNames()
   *
   * @param {array} pages - array of page names
   * @param {array} normalizedPages - array of normalized mappings returned by the API
   * @returns {array} pages with the new normalized names, if given
   */
  mapNormalizedPageNames(pages, normalizedPages) {
    normalizedPages.forEach(normalPage => {
      /** do it this way to preserve ordering of pages */
      pages = pages.map(page => {
        if (normalPage.from === page) {
          return normalPage.to;
        } else {
          return page;
        }
      });
    });
    return pages;
  }

  /**
   * List of valid multilingual projects
   * @return {Array} base projects, without the language
   */
  static get multilangProjects() {
    return ['wikipedia', 'wikibooks', 'wikinews', 'wikiquote', 'wikisource', 'wikiversity', 'wikivoyage'];
  }

  /**
   * Make mass requests to MediaWiki API
   * The API normally limits to 500 pages, but gives you a 'continue' value
   *   to finish iterating through the resource.
   * @param {Object} params - parameters to pass to the API
   * @param {String} project - project to query, e.g. en.wikipedia (.org is optional)
   * @param {String} [continueKey] - the key to look in the continue hash, if present (e.g. cmcontinue for API:Categorymembers)
   * @param {String|Function} [dataKey] - the key for the main chunk of data, in the query hash (e.g. categorymembers for API:Categorymembers)
   *   If this is a function it is given the response data, and expected to return the data we want to concatentate.
   * @param {Number} [limit] - max number of pages to fetch
   * @return {Deferred} promise resolving with data
   */
  massApi(params, project, continueKey = 'continue', dataKey, limit = this.config.apiLimit) {
    if (!/\.org$/.test(project)) project += '.org';

    const dfd = $.Deferred();
    let resolveData = {
      pages: []
    };

    const makeRequest = continueValue => {
      let requestData = Object.assign({
        action: 'query',
        format: 'json',
        formatversion: '2'
      }, params);

      if (continueValue) requestData[continueKey] = continueValue;

      const promise = $.ajax({
        url: `https://${ project }/w/api.php`,
        jsonp: 'callback',
        dataType: 'jsonp',
        data: requestData
      });

      promise.done(data => {
        // some failures come back as 200s, so we still resolve and let the local app handle it
        if (data.error) return dfd.resolve(data);

        let isFinished;

        // allow custom function to parse the data we want, if provided
        if (typeof dataKey === 'function') {
          resolveData.pages = resolveData.pages.concat(dataKey(data.query));
          isFinished = resolveData.pages.length >= limit;
        } else {
          // append new data to data from last request. We might want both 'pages' and dataKey
          if (data.query.pages) {
            resolveData.pages = resolveData.pages.concat(data.query.pages);
          }
          if (data.query[dataKey]) {
            resolveData[dataKey] = (resolveData[dataKey] || []).concat(data.query[dataKey]);
          }
          // If pages is not the collection we want, it will be either an empty array or one entry with basic page info
          //   depending on what API we're hitting. So resolveData[dataKey] will hit the limit
          isFinished = resolveData.pages.length >= limit || resolveData[dataKey].length >= limit;
        }

        // make recursive call if needed, waiting 100ms
        if (!isFinished && data.continue && data.continue[continueKey]) {
          setTimeout(() => {
            makeRequest(data.continue[continueKey]);
          }, 100);
        } else {
          // indicate there were more entries than the limit
          if (data.continue) resolveData.continue = true;
          dfd.resolve(resolveData);
        }
      }).fail(data => {
        dfd.reject(data);
      });
    };

    makeRequest();

    return dfd;
  }

  /**
   * Localize Number object with delimiters
   *
   * @param {Number} value - the Number, e.g. 1234567
   * @returns {string} - with locale delimiters, e.g. 1,234,567 (en-US)
   */
  n(value) {
    return new Number(value).toLocaleString();
  }

  /**
   * Get basic info on given pages, including the normalized page names.
   * E.g. masculine versus feminine namespaces on dewiki
   * @param {array} pages - array of page names
   * @returns {Deferred} promise with data fetched from API
   */
  getPageInfo(pages) {
    let dfd = $.Deferred();

    return $.ajax({
      url: `https://${ this.project }.org/w/api.php?action=query&prop=info&inprop=protection|watchers` + `&formatversion=2&format=json&titles=${ pages.join('|') }`,
      dataType: 'jsonp'
    }).then(data => {
      let pageData = {};
      data.query.pages.forEach(page => {
        pageData[page.title] = page;
      });
      return dfd.resolve(pageData);
    });
  }

  /**
   * Compute how many days are in the selected date range
   * @returns {integer} number of days
   */
  numDaysInRange() {
    return this.daterangepicker.endDate.diff(this.daterangepicker.startDate, 'days') + 1;
  }

  /**
   * Generate key/value pairs of URL query string
   * @param {string} [multiParam] - parameter whose values needs to split by pipe character
   * @returns {Object} key/value pairs representation of query string
   */
  parseQueryString(multiParam) {
    const uri = decodeURI(location.search.slice(1)),
          chunks = uri.split('&');
    let params = {};

    for (let i = 0; i < chunks.length; i++) {
      let chunk = chunks[i].split('=');

      if (multiParam && chunk[0] === multiParam) {
        params[multiParam] = chunk[1].split('|').filter(param => !!param).unique();
      } else {
        params[chunk[0]] = chunk[1];
      }
    }

    return params;
  }

  /**
   * Simple metric to see how many use it (pageviews of the pageview, a meta-pageview, if you will :)
   * @param {string} app - one of: pv, lv, tv, sv, ms
   * @return {null} nothing
   */
  patchUsage(app) {
    if (metaRoot) {
      $.ajax({
        url: `//${ metaRoot }/usage/${ this.app }/${ this.project || i18nLang }`,
        method: 'PATCH'
      });
    }
  }

  /**
   * Set timestamp of when process started
   * @return {moment} start time
   */
  processStarted() {
    return this.processStart = moment();
  }

  /**
   * Get elapsed time from this.processStart, and show it
   * @return {moment} Elapsed time from `this.processStart` in milliseconds
   */
  processEnded() {
    const endTime = moment(),
          elapsedTime = endTime.diff(this.processStart, 'milliseconds');

    /** FIXME: report this bug: some languages don't parse PLURAL correctly ('he' for example) with the English fallback message */
    try {
      $('.elapsed-time').attr('datetime', endTime.format()).text($.i18n('elapsed-time', elapsedTime / 1000));
    } catch (e) {
      // intentionall nothing, everything will still show
    }

    return elapsedTime;
  }

  /**
   * Adapted from http://jsfiddle.net/dandv/47cbj/ courtesy of dandv
   *
   * Same as _.debounce but queues and executes all function calls
   * @param  {Function} fn - function to debounce
   * @param  {delay} delay - delay duration of milliseconds
   * @param  {object} context - scope the function should refer to
   * @return {Function} rate-limited function to call instead of your function
   */
  rateLimit(fn, delay, context) {
    let queue = [],
        timer;

    const processQueue = () => {
      const item = queue.shift();
      if (item) {
        fn.apply(item.context, item.arguments);
      }
      if (queue.length === 0) {
        clearInterval(timer), timer = null;
      }
    };

    return function limited() {
      queue.push({
        context: context || this,
        arguments: [].slice.call(arguments)
      });

      if (!timer) {
        processQueue(); // start immediately on the first invocation
        timer = setInterval(processQueue, delay);
      }
    };
  }

  /**
   * Removes all Select2 related stuff then adds it back
   * Also might result in the chart being re-rendered
   * @returns {null} nothing
   */
  resetSelect2() {
    const select2Input = $(this.config.select2Input);
    select2Input.off('change');
    select2Input.select2('val', null);
    select2Input.select2('data', null);
    select2Input.select2('destroy');
    this.setupSelect2();
  }

  /**
   * Change alpha level of an rgba value
   *
   * @param {string} value - rgba value
   * @param {float|string} alpha - transparency as float value
   * @returns {string} rgba value
   */
  rgba(value, alpha) {
    return value.replace(/,\s*\d\)/, `, ${ alpha })`);
  }

  /**
   * Save a particular setting to session and localStorage
   *
   * @param {string} key - settings key
   * @param {string|boolean} value - value to save
   * @returns {null} nothing
   */
  saveSetting(key, value) {
    this[key] = value;
    this.setLocalStorage(`pageviews-settings-${ key }`, value);
  }

  /**
   * Save the selected settings within the settings modal
   * Prefer this implementation over a large library like serializeObject or serializeJSON
   * @returns {null} nothing
   */
  saveSettings() {
    /** track if we're changing to no_autocomplete mode */
    const wasAutocomplete = this.autocomplete === 'no_autocomplete';

    $.each($('#settings-modal input'), (index, el) => {
      if (el.type === 'checkbox') {
        this.saveSetting(el.name, el.checked ? 'true' : 'false');
      } else if (el.checked) {
        this.saveSetting(el.name, el.value);
      }
    });

    if (this.app !== 'topviews') {
      this.daterangepicker.locale.format = this.dateFormat;
      this.daterangepicker.updateElement();

      this.setupSelect2Colors();

      /**
       * If we changed to/from no_autocomplete we have to reset Select2 entirely
       *   as setSelect2Defaults is super buggy due to Select2 constraints
       * So let's only reset if we have to
       */
      if (this.autocomplete === 'no_autocomplete' !== wasAutocomplete) {
        this.resetSelect2();
      }

      if (this.beginAtZero === 'true') {
        $('.begin-at-zero-option').prop('checked', true);
      }
    }

    this.processInput(true);
  }

  /**
   * Directly set items in Select2
   * Currently is not able to remove underscores from page names
   *
   * @param {array} items - page titles
   * @returns {array} - untouched array of items
   */
  setSelect2Defaults(items) {
    items.forEach(item => {
      const escapedText = $('<div>').text(item).html();
      $('<option>' + escapedText + '</option>').appendTo(this.config.select2Input);
    });
    $(this.config.select2Input).select2('val', items);
    $(this.config.select2Input).select2('close');

    return items;
  }

  /**
   * Sets the daterange picker values and this.specialRange based on provided special range key
   * WARNING: not to be called on daterange picker GUI events (e.g. special range buttons)
   *
   * @param {string} type - one of special ranges defined in this.config.specialRanges,
   *   including dynamic latest range, such as `latest-15` for latest 15 days
   * @returns {object|null} updated this.specialRange object or null if type was invalid
   */
  setSpecialRange(type) {
    const rangeIndex = Object.keys(this.config.specialRanges).indexOf(type);
    let startDate, endDate;

    if (type.includes('latest-')) {
      const offset = parseInt(type.replace('latest-', ''), 10) || 20; // fallback of 20
      [startDate, endDate] = this.config.specialRanges.latest(offset);
    } else if (rangeIndex >= 0) {
      /** treat 'latest' as a function */
      [startDate, endDate] = type === 'latest' ? this.config.specialRanges.latest() : this.config.specialRanges[type];
      $('.daterangepicker .ranges li').eq(rangeIndex).trigger('click');
    } else {
      return;
    }

    this.specialRange = {
      range: type,
      value: `${ startDate.format(this.dateFormat) } - ${ endDate.format(this.dateFormat) }`
    };

    /** directly assign startDate then use setEndDate so that the events will be fired once */
    this.daterangepicker.startDate = startDate;
    this.daterangepicker.setEndDate(endDate);

    return this.specialRange;
  }

  /**
   * Setup colors for Select2 entries so we can dynamically change them
   * This is a necessary evil, as we have to mark them as !important
   *   and since there are any number of entires, we need to use nth-child selectors
   * @returns {CSSStylesheet} our new stylesheet
   */
  setupSelect2Colors() {
    /** first delete old stylesheet, if present */
    if (this.colorsStyleEl) this.colorsStyleEl.remove();

    /** create new stylesheet */
    this.colorsStyleEl = document.createElement('style');
    this.colorsStyleEl.appendChild(document.createTextNode('')); // WebKit hack :(
    document.head.appendChild(this.colorsStyleEl);

    /** add color rules */
    this.config.colors.forEach((color, index) => {
      this.colorsStyleEl.sheet.insertRule(`.select2-selection__choice:nth-of-type(${ index + 1 }) { background: ${ color } !important }`, 0);
    });

    return this.colorsStyleEl.sheet;
  }

  /**
   * Cross-application listeners
   * Each app has it's own setupListeners() that should call super.setupListeners()
   * @return {null} nothing
   */
  setupListeners() {
    /** prevent browser's default behaviour for any link with href="#" */
    $("a[href='#']").on('click', e => e.preventDefault());

    /** download listeners */
    $('.download-csv').on('click', this.exportCSV.bind(this));
    $('.download-json').on('click', this.exportJSON.bind(this));

    /** project input listeners, saving and restoring old value if new one is invalid */
    $(this.config.projectInput).on('focusin', function () {
      this.dataset.value = this.value;
    });
    $(this.config.projectInput).on('change', e => this.validateProject(e));
  }

  /**
   * Set values of form based on localStorage or defaults, add listeners
   * @returns {null} nothing
   */
  setupSettingsModal() {
    /** fill in values, everything is either a checkbox or radio */
    this.fillInSettings();

    /** add listener */
    $('.save-settings-btn').on('click', this.saveSettings.bind(this));
    $('.cancel-settings-btn').on('click', this.fillInSettings.bind(this));
  }

  /**
   * sets up the daterange selector and adds listeners
   * @returns {null} - nothing
   */
  setupDateRangeSelector() {
    const dateRangeSelector = $(this.config.dateRangeSelector);

    /**
     * Transform this.config.specialRanges to have i18n as keys
     * This is what is shown as the special ranges (Last month, etc.) in the datepicker menu
     * @type {Object}
     */
    let ranges = {};
    Object.keys(this.config.specialRanges).forEach(key => {
      if (key === 'latest') return; // this is a function, not meant to be in the list of special ranges
      ranges[$.i18n(key)] = this.config.specialRanges[key];
    });

    let datepickerOptions = {
      locale: {
        format: this.dateFormat,
        applyLabel: $.i18n('apply'),
        cancelLabel: $.i18n('cancel'),
        customRangeLabel: $.i18n('custom-range'),
        daysOfWeek: [$.i18n('su'), $.i18n('mo'), $.i18n('tu'), $.i18n('we'), $.i18n('th'), $.i18n('fr'), $.i18n('sa')],
        monthNames: [$.i18n('january'), $.i18n('february'), $.i18n('march'), $.i18n('april'), $.i18n('may'), $.i18n('june'), $.i18n('july'), $.i18n('august'), $.i18n('september'), $.i18n('october'), $.i18n('november'), $.i18n('december')]
      },
      startDate: moment().subtract(this.config.daysAgo, 'days'),
      minDate: this.config.minDate,
      maxDate: this.config.maxDate,
      ranges: ranges
    };

    if (this.config.dateLimit) datepickerOptions.dateLimit = { days: this.config.dateLimit };

    dateRangeSelector.daterangepicker(datepickerOptions);

    /** so people know why they can't query data older than July 2015 */
    $('.daterangepicker').append($('<div>').addClass('daterange-notice').html($.i18n('date-notice', document.title, "<a href='http://stats.grok.se' target='_blank'>stats.grok.se</a>", `${ $.i18n('july') } 2015`)));

    /**
     * The special date range options (buttons the right side of the daterange picker)
     *
     * WARNING: we're unable to add class names or data attrs to the range options,
     * so checking which was clicked is hardcoded based on the index of the LI,
     * as defined in this.config.specialRanges
     */
    $('.daterangepicker .ranges li').on('click', e => {
      const index = $('.daterangepicker .ranges li').index(e.target),
            container = this.daterangepicker.container,
            inputs = container.find('.daterangepicker_input input');
      this.specialRange = {
        range: Object.keys(this.config.specialRanges)[index],
        value: `${ inputs[0].value } - ${ inputs[1].value }`
      };
    });

    $(this.config.dateRangeSelector).on('apply.daterangepicker', (e, action) => {
      if (action.chosenLabel === $.i18n('custom-range')) {
        this.specialRange = null;

        /** force events to re-fire since apply.daterangepicker occurs before 'change' event */
        this.daterangepicker.updateElement();
      }
    });
  }

  showFatalErrors(errors) {
    this.clearMessages();
    errors.forEach(error => {
      this.writeMessage(`<strong>${ $.i18n('fatal-error') }</strong>: <code>${ error }</code>`, 'error');
    });

    if (this.debug) {
      throw errors[0];
    } else if (errors && errors[0] && errors[0].stack) {
      $.ajax({
        method: 'POST',
        url: '//tools.wmflabs.org/musikanimal/paste',
        data: {
          content: '' + `\ndate:      ${ moment().utc().format() }` + `\ntool:      ${ this.app }` + `\nlanguage:  ${ i18nLang }` + `\nchart:     ${ this.chartType }` + `\nurl:       ${ document.location.href }` + `\nuserAgent: ${ this.getUserAgent() }` + `\ntrace:     ${ errors[0].stack }`,

          title: `Pageviews Analysis error report: ${ errors[0] }`
        }
      }).done(data => {
        if (data && data.result && data.result.objectName) {
          this.writeMessage($.i18n('error-please-report', this.getBugReportURL(data.result.objectName)), 'error');
        } else {
          this.writeMessage($.i18n('error-please-report', this.getBugReportURL()), 'error');
        }
      }).fail(() => {
        this.writeMessage($.i18n('error-please-report', this.getBugReportURL()), 'error');
      });
    }
  }

  /**
   * Splash in console, just for fun
   * @returns {String} output
   */
  splash() {
    const style = 'background: #eee; color: #555; padding: 4px; font-family:monospace';
    console.log('%c      ___            __ _                     _                             ', style);
    console.log('%c     | _ \\  __ _    / _` |   ___    __ __    (_)     ___   __ __ __  ___    ', style);
    console.log('%c     |  _/ / _` |   \\__, |  / -_)   \\ V /    | |    / -_)  \\ V  V / (_-<    ', style);
    console.log('%c    _|_|_  \\__,_|   |___/   \\___|   _\\_/_   _|_|_   \\___|   \\_/\\_/  /__/_   ', style);
    console.log('%c  _| """ |_|"""""|_|"""""|_|"""""|_|"""""|_|"""""|_|"""""|_|"""""|_|"""""|  ', style);
    console.log('%c  "`-0-0-\'"`-0-0-\'"`-0-0-\'"`-0-0-\'"`-0-0-\'"`-0-0-\'"`-0-0-\'"`-0-0-\'"`-0-0-\'  ', style);
    console.log('%c              ___                     _  _     _               _            ', style);
    console.log('%c      o O O  /   \\   _ _     __ _    | || |   | |     ___     (_)     ___   ', style);
    console.log('%c     o       | - |  | \' \\   / _` |    \\_, |   | |    (_-<     | |    (_-<   ', style);
    console.log('%c    TS__[O]  |_|_|  |_||_|  \\__,_|   _|__/   _|_|_   /__/_   _|_|_   /__/_  ', style);
    console.log('%c   {======|_|"""""|_|"""""|_|"""""|_| """"|_|"""""|_|"""""|_|"""""|_|"""""| ', style);
    console.log('%c  ./o--000\'"`-0-0-\'"`-0-0-\'"`-0-0-\'"`-0-0-\'"`-0-0-\'"`-0-0-\'"`-0-0-\'"`-0-0-\' ', style);
    console.log('%c                                                                            ', style);
    console.log(`%c  Copyright © ${ new Date().getFullYear() } MusikAnimal, Kaldari, Marcel Ruiz Forns                  `, style);
  }

  /**
   * Add the loading indicator class and set the safeguard timeout
   * @returns {null} nothing
   */
  startSpinny() {
    $('.chart-container').addClass('loading');
    clearTimeout(this.timeout);

    this.timeout = setTimeout(err => {
      this.resetView();
      this.writeMessage(`<strong>${ $.i18n('fatal-error') }</strong>:
        ${ $.i18n('error-timed-out') }
        ${ $.i18n('error-please-report', this.getBugReportURL()) }
      `, 'error', 0);
    }, 20 * 1000);
  }

  /**
   * Remove loading indicator class and clear the safeguard timeout
   * @returns {null} nothing
   */
  stopSpinny() {
    $('.chart-container').removeClass('loading');
    clearTimeout(this.timeout);
  }

  /**
   * Replace spaces with underscores
   *
   * @param {array} pages - array of page names
   * @returns {array} page names with underscores
   */
  underscorePageNames(pages) {
    return pages.map(page => {
      return decodeURIComponent(page).score();
    });
  }

  /**
   * Update hrefs of inter-app links to load currently selected project
   * @return {null} nuttin'
   */
  updateInterAppLinks() {
    $('.interapp-link').each((i, link) => {
      let url = link.href.split('?')[0];

      if (link.classList.contains('interapp-link--siteviews')) {
        link.href = `${ url }?sites=${ this.project.escape() }.org`;
      } else {
        link.href = `${ url }?project=${ this.project.escape() }.org`;
      }
    });
  }

  /**
   * Validate basic params against what is defined in the config,
   *   and if they are invalid set the default
   * @param {Object} params - params as fetched by this.parseQueryString()
   * @returns {Object} same params with some invalid parameters correted, as necessary
   */
  validateParams(params) {
    this.config.validateParams.forEach(paramKey => {
      if (paramKey === 'project' && params.project) {
        params.project = params.project.replace(/^www\./, '');
      }

      const defaultValue = this.config.defaults[paramKey],
            paramValue = params[paramKey];

      if (defaultValue && !this.config.validParams[paramKey].includes(paramValue)) {
        // only throw error if they tried to provide an invalid value
        if (!!paramValue) {
          this.addInvalidParamNotice(paramKey);
        }

        params[paramKey] = defaultValue;
      }
    });

    return params;
  }

  /**
   * Adds listeners to the project input for validations against the site map,
   *   reverting to the old value if the new one is invalid
   * @param {Boolean} [multilingual] - whether we should check if it is a multilingual project
   * @returns {Boolean} whether or not validations passed
   */
  validateProject(multilingual = false) {
    const projectInput = $(this.config.projectInput)[0];
    let project = projectInput.value.replace(/^www\./, ''),
        valid = false;

    if (multilingual && !this.isMultilangProject()) {
      this.writeMessage($.i18n('invalid-lang-project', `<a href='//${ project.escape() }'>${ project.escape() }</a>`), 'warning');
      project = projectInput.dataset.value;
    } else if (siteDomains.includes(project)) {
      this.clearMessages();
      this.updateInterAppLinks();
      valid = true;
    } else {
      this.writeMessage($.i18n('invalid-project', `<a href='//${ project.escape() }'>${ project.escape() }</a>`), 'warning');
      project = projectInput.dataset.value;
    }

    projectInput.value = project;

    return valid;
  }

  // FIXME: restore writeMessage to the way it used to be,
  // and make addSiteNotice do the toastr, and change instances of this.writeMessage
  // accordingly
  /**
   * Writes message just below the chart
   * @param {string} message - message to write
   * @param {Number} timeout - num seconds to show
   * @returns {jQuery} - jQuery object of message container
   */
  writeMessage(message, level = 'warning', timeout = 5000) {
    toastr.options.timeOut = timeout;
    toastr[level](message);
  }
}

module.exports = Pv;

},{"./pv_config":5,"./site_map":6}],5:[function(require,module,exports){
/**
 * @file Shared config amongst all apps
 * @author MusikAnimal
 * @copyright 2016 MusikAnimal
 * @license MIT License: https://opensource.org/licenses/MIT
 */

const siteMap = require('./site_map');
const siteDomains = Object.keys(siteMap).map(key => siteMap[key]);

/**
 * Configuration for all Pageviews applications.
 * Some properties may be overriden by app-specific configs
 */
class PvConfig {
  constructor() {
    let self = this;
    const formatXAxisTick = value => {
      const dayOfWeek = moment(value, this.dateFormat).weekday();
      if (dayOfWeek % 7) {
        return value;
      } else {
        return `• ${ value }`;
      }
    };

    this.config = {
      apiLimit: 5000,
      apiThrottle: 20,
      apps: ['pageviews', 'topviews', 'langviews', 'siteviews', 'massviews', 'redirectviews'],
      chartConfig: {
        line: {
          opts: {
            scales: {
              yAxes: [{
                ticks: {
                  callback: value => this.formatYAxisNumber(value)
                }
              }],
              xAxes: [{
                ticks: {
                  callback: value => {
                    return formatXAxisTick(value);
                  }
                }
              }]
            },
            legendCallback: chart => this.config.chartLegend(self),
            tooltips: this.linearTooltips
          },
          dataset(color) {
            return {
              color,
              backgroundColor: 'rgba(0,0,0,0)',
              borderWidth: 2,
              borderColor: color,
              pointColor: color,
              pointBackgroundColor: color,
              pointBorderColor: self.rgba(color, 0.2),
              pointHoverBackgroundColor: color,
              pointHoverBorderColor: color,
              pointHoverBorderWidth: 2,
              pointHoverRadius: 5,
              tension: self.bezierCurve === 'true' ? 0.4 : 0
            };
          }
        },
        bar: {
          opts: {
            scales: {
              yAxes: [{
                ticks: {
                  callback: value => this.formatYAxisNumber(value)
                }
              }],
              xAxes: [{
                barPercentage: 1.0,
                categoryPercentage: 0.85,
                ticks: {
                  callback: value => {
                    return formatXAxisTick(value);
                  }
                }
              }]
            },
            legendCallback: chart => this.config.chartLegend(self),
            tooltips: this.linearTooltips
          },
          dataset(color) {
            return {
              color,
              backgroundColor: self.rgba(color, 0.6),
              borderColor: self.rgba(color, 0.9),
              borderWidth: 2,
              hoverBackgroundColor: self.rgba(color, 0.75),
              hoverBorderColor: color
            };
          }
        },
        radar: {
          opts: {
            scale: {
              ticks: {
                callback: value => this.formatNumber(value)
              }
            },
            legendCallback: chart => this.config.chartLegend(self),
            tooltips: this.linearTooltips
          },
          dataset(color) {
            return {
              color,
              backgroundColor: self.rgba(color, 0.1),
              borderColor: color,
              borderWidth: 2,
              pointBackgroundColor: color,
              pointBorderColor: self.rgba(color, 0.8),
              pointHoverBackgroundColor: color,
              pointHoverBorderColor: color,
              pointHoverRadius: 5
            };
          }
        },
        pie: {
          opts: {
            legendCallback: chart => this.config.chartLegend(self),
            tooltips: this.circularTooltips
          },
          dataset(color) {
            return {
              color,
              backgroundColor: color,
              hoverBackgroundColor: self.rgba(color, 0.8)
            };
          }
        },
        doughnut: {
          opts: {
            legendCallback: chart => this.config.chartLegend(self),
            tooltips: this.circularTooltips
          },
          dataset(color) {
            return {
              color: color,
              backgroundColor: color,
              hoverBackgroundColor: self.rgba(color, 0.8)
            };
          }
        },
        polarArea: {
          opts: {
            scale: {
              ticks: {
                beginAtZero: true,
                callback: value => this.formatNumber(value)
              }
            },
            legendCallback: chart => this.config.chartLegend(self),
            tooltips: this.circularTooltips
          },
          dataset(color) {
            return {
              color: color,
              backgroundColor: self.rgba(color, 0.7),
              hoverBackgroundColor: self.rgba(color, 0.9)
            };
          }
        }
      },
      circularCharts: ['pie', 'doughnut', 'polarArea'],
      colors: ['rgba(171, 212, 235, 1)', 'rgba(178, 223, 138, 1)', 'rgba(251, 154, 153, 1)', 'rgba(253, 191, 111, 1)', 'rgba(202, 178, 214, 1)', 'rgba(207, 182, 128, 1)', 'rgba(141, 211, 199, 1)', 'rgba(252, 205, 229, 1)', 'rgba(255, 247, 161, 1)', 'rgba(217, 217, 217, 1)'],
      defaults: {
        autocomplete: 'autocomplete',
        chartType: numDatasets => numDatasets > 1 ? 'line' : 'bar',
        dateFormat: 'YYYY-MM-DD',
        localizeDateFormat: 'true',
        numericalFormatting: 'true',
        bezierCurve: 'false',
        autoLogDetection: 'true',
        beginAtZero: 'false',
        rememberChart: 'true',
        agent: 'user',
        platform: 'all-access',
        project: 'en.wikipedia.org'
      },
      globalChartOpts: {
        animation: {
          duration: 500,
          easing: 'easeInOutQuart'
        },
        hover: {
          animationDuration: 0
        },
        legend: {
          display: false
        }
      },
      linearCharts: ['line', 'bar', 'radar'],
      linearOpts: {
        scales: {
          yAxes: [{
            ticks: {
              callback: value => this.formatNumber(value)
            }
          }]
        },
        legendCallback: chart => this.config.chartLegend(chart.data.datasets, self)
      },
      daysAgo: 20,
      minDate: moment('2015-07-01').startOf('day'),
      maxDate: moment().subtract(1, 'days').startOf('day'),
      specialRanges: {
        'last-week': [moment().subtract(1, 'week').startOf('week'), moment().subtract(1, 'week').endOf('week')],
        'this-month': [moment().startOf('month'), moment().subtract(1, 'days').startOf('day')],
        'last-month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')],
        latest(offset = self.config.daysAgo) {
          return [moment().subtract(offset, 'days').startOf('day'), self.config.maxDate];
        }
      },
      timestampFormat: 'YYYYMMDD00',
      validParams: {
        agent: ['all-agents', 'user', 'spider', 'bot'],
        platform: ['all-access', 'desktop', 'mobile-app', 'mobile-web'],
        project: siteDomains
      }
    };
  }

  get linearTooltips() {
    return {
      mode: 'label',
      callbacks: {
        label: tooltipItem => {
          if (Number.isNaN(tooltipItem.yLabel)) {
            return ' ' + $.i18n('unknown');
          } else {
            return ' ' + this.formatNumber(tooltipItem.yLabel);
          }
        }
      },
      bodyFontSize: 14,
      bodySpacing: 7,
      caretSize: 0,
      titleFontSize: 14
    };
  }

  get circularTooltips() {
    return {
      callbacks: {
        label: (tooltipItem, chartInstance) => {
          const value = chartInstance.datasets[tooltipItem.datasetIndex].data[tooltipItem.index],
                label = chartInstance.labels[tooltipItem.index];

          if (Number.isNaN(value)) {
            return `${ label }: ${ $.i18n('unknown') }`;
          } else {
            return `${ label }: ${ this.formatNumber(value) }`;
          }
        }
      },
      bodyFontSize: 14,
      bodySpacing: 7,
      caretSize: 0,
      titleFontSize: 14
    };
  }
}

module.exports = PvConfig;

},{"./site_map":6}],6:[function(require,module,exports){
/**
 * @file WMF [site matrix](https://www.mediawiki.org/w/api.php?action=sitematrix), with some unsupported wikis removed
 */

/**
 * Sitematrix of all supported WMF wikis
 * @type {Object}
 */
const siteMap = {
  'aawiki': 'aa.wikipedia.org',
  'aawiktionary': 'aa.wiktionary.org',
  'aawikibooks': 'aa.wikibooks.org',
  'abwiki': 'ab.wikipedia.org',
  'abwiktionary': 'ab.wiktionary.org',
  'acewiki': 'ace.wikipedia.org',
  'adywiki': 'ady.wikipedia.org',
  'afwiki': 'af.wikipedia.org',
  'afwiktionary': 'af.wiktionary.org',
  'afwikibooks': 'af.wikibooks.org',
  'afwikiquote': 'af.wikiquote.org',
  'akwiki': 'ak.wikipedia.org',
  'akwiktionary': 'ak.wiktionary.org',
  'akwikibooks': 'ak.wikibooks.org',
  'alswiki': 'als.wikipedia.org',
  'alswiktionary': 'als.wiktionary.org',
  'alswikibooks': 'als.wikibooks.org',
  'alswikiquote': 'als.wikiquote.org',
  'amwiki': 'am.wikipedia.org',
  'amwiktionary': 'am.wiktionary.org',
  'amwikiquote': 'am.wikiquote.org',
  'anwiki': 'an.wikipedia.org',
  'anwiktionary': 'an.wiktionary.org',
  'angwiki': 'ang.wikipedia.org',
  'angwiktionary': 'ang.wiktionary.org',
  'angwikibooks': 'ang.wikibooks.org',
  'angwikiquote': 'ang.wikiquote.org',
  'angwikisource': 'ang.wikisource.org',
  'arwiki': 'ar.wikipedia.org',
  'arwiktionary': 'ar.wiktionary.org',
  'arwikibooks': 'ar.wikibooks.org',
  'arwikinews': 'ar.wikinews.org',
  'arwikiquote': 'ar.wikiquote.org',
  'arwikisource': 'ar.wikisource.org',
  'arwikiversity': 'ar.wikiversity.org',
  'arcwiki': 'arc.wikipedia.org',
  'arzwiki': 'arz.wikipedia.org',
  'aswiki': 'as.wikipedia.org',
  'aswiktionary': 'as.wiktionary.org',
  'aswikibooks': 'as.wikibooks.org',
  'aswikisource': 'as.wikisource.org',
  'astwiki': 'ast.wikipedia.org',
  'astwiktionary': 'ast.wiktionary.org',
  'astwikibooks': 'ast.wikibooks.org',
  'astwikiquote': 'ast.wikiquote.org',
  'avwiki': 'av.wikipedia.org',
  'avwiktionary': 'av.wiktionary.org',
  'aywiki': 'ay.wikipedia.org',
  'aywiktionary': 'ay.wiktionary.org',
  'aywikibooks': 'ay.wikibooks.org',
  'azwiki': 'az.wikipedia.org',
  'azwiktionary': 'az.wiktionary.org',
  'azwikibooks': 'az.wikibooks.org',
  'azwikiquote': 'az.wikiquote.org',
  'azwikisource': 'az.wikisource.org',
  'azbwiki': 'azb.wikipedia.org',
  'bawiki': 'ba.wikipedia.org',
  'bawikibooks': 'ba.wikibooks.org',
  'barwiki': 'bar.wikipedia.org',
  'bat_smgwiki': 'bat-smg.wikipedia.org',
  'bclwiki': 'bcl.wikipedia.org',
  'bewiki': 'be.wikipedia.org',
  'bewiktionary': 'be.wiktionary.org',
  'bewikibooks': 'be.wikibooks.org',
  'bewikiquote': 'be.wikiquote.org',
  'bewikisource': 'be.wikisource.org',
  'be_x_oldwiki': 'be-tarask.wikipedia.org',
  'bgwiki': 'bg.wikipedia.org',
  'bgwiktionary': 'bg.wiktionary.org',
  'bgwikibooks': 'bg.wikibooks.org',
  'bgwikinews': 'bg.wikinews.org',
  'bgwikiquote': 'bg.wikiquote.org',
  'bgwikisource': 'bg.wikisource.org',
  'bhwiki': 'bh.wikipedia.org',
  'bhwiktionary': 'bh.wiktionary.org',
  'biwiki': 'bi.wikipedia.org',
  'biwiktionary': 'bi.wiktionary.org',
  'biwikibooks': 'bi.wikibooks.org',
  'bjnwiki': 'bjn.wikipedia.org',
  'bmwiki': 'bm.wikipedia.org',
  'bmwiktionary': 'bm.wiktionary.org',
  'bmwikibooks': 'bm.wikibooks.org',
  'bmwikiquote': 'bm.wikiquote.org',
  'bnwiki': 'bn.wikipedia.org',
  'bnwiktionary': 'bn.wiktionary.org',
  'bnwikibooks': 'bn.wikibooks.org',
  'bnwikisource': 'bn.wikisource.org',
  'bowiki': 'bo.wikipedia.org',
  'bowiktionary': 'bo.wiktionary.org',
  'bowikibooks': 'bo.wikibooks.org',
  'bpywiki': 'bpy.wikipedia.org',
  'brwiki': 'br.wikipedia.org',
  'brwiktionary': 'br.wiktionary.org',
  'brwikiquote': 'br.wikiquote.org',
  'brwikisource': 'br.wikisource.org',
  'bswiki': 'bs.wikipedia.org',
  'bswiktionary': 'bs.wiktionary.org',
  'bswikibooks': 'bs.wikibooks.org',
  'bswikinews': 'bs.wikinews.org',
  'bswikiquote': 'bs.wikiquote.org',
  'bswikisource': 'bs.wikisource.org',
  'bugwiki': 'bug.wikipedia.org',
  'bxrwiki': 'bxr.wikipedia.org',
  'cawiki': 'ca.wikipedia.org',
  'cawiktionary': 'ca.wiktionary.org',
  'cawikibooks': 'ca.wikibooks.org',
  'cawikinews': 'ca.wikinews.org',
  'cawikiquote': 'ca.wikiquote.org',
  'cawikisource': 'ca.wikisource.org',
  'cbk_zamwiki': 'cbk-zam.wikipedia.org',
  'cdowiki': 'cdo.wikipedia.org',
  'cewiki': 'ce.wikipedia.org',
  'cebwiki': 'ceb.wikipedia.org',
  'chwiki': 'ch.wikipedia.org',
  'chwiktionary': 'ch.wiktionary.org',
  'chwikibooks': 'ch.wikibooks.org',
  'chowiki': 'cho.wikipedia.org',
  'chrwiki': 'chr.wikipedia.org',
  'chrwiktionary': 'chr.wiktionary.org',
  'chywiki': 'chy.wikipedia.org',
  'ckbwiki': 'ckb.wikipedia.org',
  'cowiki': 'co.wikipedia.org',
  'cowiktionary': 'co.wiktionary.org',
  'cowikibooks': 'co.wikibooks.org',
  'cowikiquote': 'co.wikiquote.org',
  'crwiki': 'cr.wikipedia.org',
  'crwiktionary': 'cr.wiktionary.org',
  'crwikiquote': 'cr.wikiquote.org',
  'crhwiki': 'crh.wikipedia.org',
  'cswiki': 'cs.wikipedia.org',
  'cswiktionary': 'cs.wiktionary.org',
  'cswikibooks': 'cs.wikibooks.org',
  'cswikinews': 'cs.wikinews.org',
  'cswikiquote': 'cs.wikiquote.org',
  'cswikisource': 'cs.wikisource.org',
  'cswikiversity': 'cs.wikiversity.org',
  'csbwiki': 'csb.wikipedia.org',
  'csbwiktionary': 'csb.wiktionary.org',
  'cuwiki': 'cu.wikipedia.org',
  'cvwiki': 'cv.wikipedia.org',
  'cvwikibooks': 'cv.wikibooks.org',
  'cywiki': 'cy.wikipedia.org',
  'cywiktionary': 'cy.wiktionary.org',
  'cywikibooks': 'cy.wikibooks.org',
  'cywikiquote': 'cy.wikiquote.org',
  'cywikisource': 'cy.wikisource.org',
  'dawiki': 'da.wikipedia.org',
  'dawiktionary': 'da.wiktionary.org',
  'dawikibooks': 'da.wikibooks.org',
  'dawikiquote': 'da.wikiquote.org',
  'dawikisource': 'da.wikisource.org',
  'dewiki': 'de.wikipedia.org',
  'dewiktionary': 'de.wiktionary.org',
  'dewikibooks': 'de.wikibooks.org',
  'dewikinews': 'de.wikinews.org',
  'dewikiquote': 'de.wikiquote.org',
  'dewikisource': 'de.wikisource.org',
  'dewikiversity': 'de.wikiversity.org',
  'dewikivoyage': 'de.wikivoyage.org',
  'diqwiki': 'diq.wikipedia.org',
  'dsbwiki': 'dsb.wikipedia.org',
  'dvwiki': 'dv.wikipedia.org',
  'dvwiktionary': 'dv.wiktionary.org',
  'dzwiki': 'dz.wikipedia.org',
  'dzwiktionary': 'dz.wiktionary.org',
  'eewiki': 'ee.wikipedia.org',
  'elwiki': 'el.wikipedia.org',
  'elwiktionary': 'el.wiktionary.org',
  'elwikibooks': 'el.wikibooks.org',
  'elwikinews': 'el.wikinews.org',
  'elwikiquote': 'el.wikiquote.org',
  'elwikisource': 'el.wikisource.org',
  'elwikiversity': 'el.wikiversity.org',
  'elwikivoyage': 'el.wikivoyage.org',
  'emlwiki': 'eml.wikipedia.org',
  'enwiki': 'en.wikipedia.org',
  'enwiktionary': 'en.wiktionary.org',
  'enwikibooks': 'en.wikibooks.org',
  'enwikinews': 'en.wikinews.org',
  'enwikiquote': 'en.wikiquote.org',
  'enwikisource': 'en.wikisource.org',
  'enwikiversity': 'en.wikiversity.org',
  'enwikivoyage': 'en.wikivoyage.org',
  'eowiki': 'eo.wikipedia.org',
  'eowiktionary': 'eo.wiktionary.org',
  'eowikibooks': 'eo.wikibooks.org',
  'eowikinews': 'eo.wikinews.org',
  'eowikiquote': 'eo.wikiquote.org',
  'eowikisource': 'eo.wikisource.org',
  'eswiki': 'es.wikipedia.org',
  'eswiktionary': 'es.wiktionary.org',
  'eswikibooks': 'es.wikibooks.org',
  'eswikinews': 'es.wikinews.org',
  'eswikiquote': 'es.wikiquote.org',
  'eswikisource': 'es.wikisource.org',
  'eswikiversity': 'es.wikiversity.org',
  'eswikivoyage': 'es.wikivoyage.org',
  'etwiki': 'et.wikipedia.org',
  'etwiktionary': 'et.wiktionary.org',
  'etwikibooks': 'et.wikibooks.org',
  'etwikiquote': 'et.wikiquote.org',
  'etwikisource': 'et.wikisource.org',
  'euwiki': 'eu.wikipedia.org',
  'euwiktionary': 'eu.wiktionary.org',
  'euwikibooks': 'eu.wikibooks.org',
  'euwikiquote': 'eu.wikiquote.org',
  'extwiki': 'ext.wikipedia.org',
  'fawiki': 'fa.wikipedia.org',
  'fawiktionary': 'fa.wiktionary.org',
  'fawikibooks': 'fa.wikibooks.org',
  'fawikinews': 'fa.wikinews.org',
  'fawikiquote': 'fa.wikiquote.org',
  'fawikisource': 'fa.wikisource.org',
  'fawikivoyage': 'fa.wikivoyage.org',
  'ffwiki': 'ff.wikipedia.org',
  'fiwiki': 'fi.wikipedia.org',
  'fiwiktionary': 'fi.wiktionary.org',
  'fiwikibooks': 'fi.wikibooks.org',
  'fiwikinews': 'fi.wikinews.org',
  'fiwikiquote': 'fi.wikiquote.org',
  'fiwikisource': 'fi.wikisource.org',
  'fiwikiversity': 'fi.wikiversity.org',
  'fiu_vrowiki': 'fiu-vro.wikipedia.org',
  'fjwiki': 'fj.wikipedia.org',
  'fjwiktionary': 'fj.wiktionary.org',
  'fowiki': 'fo.wikipedia.org',
  'fowiktionary': 'fo.wiktionary.org',
  'fowikisource': 'fo.wikisource.org',
  'frwiki': 'fr.wikipedia.org',
  'frwiktionary': 'fr.wiktionary.org',
  'frwikibooks': 'fr.wikibooks.org',
  'frwikinews': 'fr.wikinews.org',
  'frwikiquote': 'fr.wikiquote.org',
  'frwikisource': 'fr.wikisource.org',
  'frwikiversity': 'fr.wikiversity.org',
  'frwikivoyage': 'fr.wikivoyage.org',
  'frpwiki': 'frp.wikipedia.org',
  'frrwiki': 'frr.wikipedia.org',
  'furwiki': 'fur.wikipedia.org',
  'fywiki': 'fy.wikipedia.org',
  'fywiktionary': 'fy.wiktionary.org',
  'fywikibooks': 'fy.wikibooks.org',
  'gawiki': 'ga.wikipedia.org',
  'gawiktionary': 'ga.wiktionary.org',
  'gawikibooks': 'ga.wikibooks.org',
  'gawikiquote': 'ga.wikiquote.org',
  'gagwiki': 'gag.wikipedia.org',
  'ganwiki': 'gan.wikipedia.org',
  'gdwiki': 'gd.wikipedia.org',
  'gdwiktionary': 'gd.wiktionary.org',
  'glwiki': 'gl.wikipedia.org',
  'glwiktionary': 'gl.wiktionary.org',
  'glwikibooks': 'gl.wikibooks.org',
  'glwikiquote': 'gl.wikiquote.org',
  'glwikisource': 'gl.wikisource.org',
  'glkwiki': 'glk.wikipedia.org',
  'gnwiki': 'gn.wikipedia.org',
  'gnwiktionary': 'gn.wiktionary.org',
  'gnwikibooks': 'gn.wikibooks.org',
  'gomwiki': 'gom.wikipedia.org',
  'gotwiki': 'got.wikipedia.org',
  'gotwikibooks': 'got.wikibooks.org',
  'guwiki': 'gu.wikipedia.org',
  'guwiktionary': 'gu.wiktionary.org',
  'guwikibooks': 'gu.wikibooks.org',
  'guwikiquote': 'gu.wikiquote.org',
  'guwikisource': 'gu.wikisource.org',
  'gvwiki': 'gv.wikipedia.org',
  'gvwiktionary': 'gv.wiktionary.org',
  'hawiki': 'ha.wikipedia.org',
  'hawiktionary': 'ha.wiktionary.org',
  'hakwiki': 'hak.wikipedia.org',
  'hawwiki': 'haw.wikipedia.org',
  'hewiki': 'he.wikipedia.org',
  'hewiktionary': 'he.wiktionary.org',
  'hewikibooks': 'he.wikibooks.org',
  'hewikinews': 'he.wikinews.org',
  'hewikiquote': 'he.wikiquote.org',
  'hewikisource': 'he.wikisource.org',
  'hewikivoyage': 'he.wikivoyage.org',
  'hiwiki': 'hi.wikipedia.org',
  'hiwiktionary': 'hi.wiktionary.org',
  'hiwikibooks': 'hi.wikibooks.org',
  'hiwikiquote': 'hi.wikiquote.org',
  'hifwiki': 'hif.wikipedia.org',
  'howiki': 'ho.wikipedia.org',
  'hrwiki': 'hr.wikipedia.org',
  'hrwiktionary': 'hr.wiktionary.org',
  'hrwikibooks': 'hr.wikibooks.org',
  'hrwikiquote': 'hr.wikiquote.org',
  'hrwikisource': 'hr.wikisource.org',
  'hsbwiki': 'hsb.wikipedia.org',
  'hsbwiktionary': 'hsb.wiktionary.org',
  'htwiki': 'ht.wikipedia.org',
  'htwikisource': 'ht.wikisource.org',
  'huwiki': 'hu.wikipedia.org',
  'huwiktionary': 'hu.wiktionary.org',
  'huwikibooks': 'hu.wikibooks.org',
  'huwikinews': 'hu.wikinews.org',
  'huwikiquote': 'hu.wikiquote.org',
  'huwikisource': 'hu.wikisource.org',
  'hywiki': 'hy.wikipedia.org',
  'hywiktionary': 'hy.wiktionary.org',
  'hywikibooks': 'hy.wikibooks.org',
  'hywikiquote': 'hy.wikiquote.org',
  'hywikisource': 'hy.wikisource.org',
  'hzwiki': 'hz.wikipedia.org',
  'iawiki': 'ia.wikipedia.org',
  'iawiktionary': 'ia.wiktionary.org',
  'iawikibooks': 'ia.wikibooks.org',
  'idwiki': 'id.wikipedia.org',
  'idwiktionary': 'id.wiktionary.org',
  'idwikibooks': 'id.wikibooks.org',
  'idwikiquote': 'id.wikiquote.org',
  'idwikisource': 'id.wikisource.org',
  'iewiki': 'ie.wikipedia.org',
  'iewiktionary': 'ie.wiktionary.org',
  'iewikibooks': 'ie.wikibooks.org',
  'igwiki': 'ig.wikipedia.org',
  'iiwiki': 'ii.wikipedia.org',
  'ikwiki': 'ik.wikipedia.org',
  'ikwiktionary': 'ik.wiktionary.org',
  'ilowiki': 'ilo.wikipedia.org',
  'iowiki': 'io.wikipedia.org',
  'iowiktionary': 'io.wiktionary.org',
  'iswiki': 'is.wikipedia.org',
  'iswiktionary': 'is.wiktionary.org',
  'iswikibooks': 'is.wikibooks.org',
  'iswikiquote': 'is.wikiquote.org',
  'iswikisource': 'is.wikisource.org',
  'itwiki': 'it.wikipedia.org',
  'itwiktionary': 'it.wiktionary.org',
  'itwikibooks': 'it.wikibooks.org',
  'itwikinews': 'it.wikinews.org',
  'itwikiquote': 'it.wikiquote.org',
  'itwikisource': 'it.wikisource.org',
  'itwikiversity': 'it.wikiversity.org',
  'itwikivoyage': 'it.wikivoyage.org',
  'iuwiki': 'iu.wikipedia.org',
  'iuwiktionary': 'iu.wiktionary.org',
  'jawiki': 'ja.wikipedia.org',
  'jawiktionary': 'ja.wiktionary.org',
  'jawikibooks': 'ja.wikibooks.org',
  'jawikinews': 'ja.wikinews.org',
  'jawikiquote': 'ja.wikiquote.org',
  'jawikisource': 'ja.wikisource.org',
  'jawikiversity': 'ja.wikiversity.org',
  'jbowiki': 'jbo.wikipedia.org',
  'jbowiktionary': 'jbo.wiktionary.org',
  'jvwiki': 'jv.wikipedia.org',
  'jvwiktionary': 'jv.wiktionary.org',
  'kawiki': 'ka.wikipedia.org',
  'kawiktionary': 'ka.wiktionary.org',
  'kawikibooks': 'ka.wikibooks.org',
  'kawikiquote': 'ka.wikiquote.org',
  'kaawiki': 'kaa.wikipedia.org',
  'kabwiki': 'kab.wikipedia.org',
  'kbdwiki': 'kbd.wikipedia.org',
  'kgwiki': 'kg.wikipedia.org',
  'kiwiki': 'ki.wikipedia.org',
  'kjwiki': 'kj.wikipedia.org',
  'kkwiki': 'kk.wikipedia.org',
  'kkwiktionary': 'kk.wiktionary.org',
  'kkwikibooks': 'kk.wikibooks.org',
  'kkwikiquote': 'kk.wikiquote.org',
  'klwiki': 'kl.wikipedia.org',
  'klwiktionary': 'kl.wiktionary.org',
  'kmwiki': 'km.wikipedia.org',
  'kmwiktionary': 'km.wiktionary.org',
  'kmwikibooks': 'km.wikibooks.org',
  'knwiki': 'kn.wikipedia.org',
  'knwiktionary': 'kn.wiktionary.org',
  'knwikibooks': 'kn.wikibooks.org',
  'knwikiquote': 'kn.wikiquote.org',
  'knwikisource': 'kn.wikisource.org',
  'kowiki': 'ko.wikipedia.org',
  'kowiktionary': 'ko.wiktionary.org',
  'kowikibooks': 'ko.wikibooks.org',
  'kowikinews': 'ko.wikinews.org',
  'kowikiquote': 'ko.wikiquote.org',
  'kowikisource': 'ko.wikisource.org',
  'kowikiversity': 'ko.wikiversity.org',
  'koiwiki': 'koi.wikipedia.org',
  'krwiki': 'kr.wikipedia.org',
  'krwikiquote': 'kr.wikiquote.org',
  'krcwiki': 'krc.wikipedia.org',
  'kswiki': 'ks.wikipedia.org',
  'kswiktionary': 'ks.wiktionary.org',
  'kswikibooks': 'ks.wikibooks.org',
  'kswikiquote': 'ks.wikiquote.org',
  'kshwiki': 'ksh.wikipedia.org',
  'kuwiki': 'ku.wikipedia.org',
  'kuwiktionary': 'ku.wiktionary.org',
  'kuwikibooks': 'ku.wikibooks.org',
  'kuwikiquote': 'ku.wikiquote.org',
  'kvwiki': 'kv.wikipedia.org',
  'kwwiki': 'kw.wikipedia.org',
  'kwwiktionary': 'kw.wiktionary.org',
  'kwwikiquote': 'kw.wikiquote.org',
  'kywiki': 'ky.wikipedia.org',
  'kywiktionary': 'ky.wiktionary.org',
  'kywikibooks': 'ky.wikibooks.org',
  'kywikiquote': 'ky.wikiquote.org',
  'lawiki': 'la.wikipedia.org',
  'lawiktionary': 'la.wiktionary.org',
  'lawikibooks': 'la.wikibooks.org',
  'lawikiquote': 'la.wikiquote.org',
  'lawikisource': 'la.wikisource.org',
  'ladwiki': 'lad.wikipedia.org',
  'lbwiki': 'lb.wikipedia.org',
  'lbwiktionary': 'lb.wiktionary.org',
  'lbwikibooks': 'lb.wikibooks.org',
  'lbwikiquote': 'lb.wikiquote.org',
  'lbewiki': 'lbe.wikipedia.org',
  'lezwiki': 'lez.wikipedia.org',
  'lgwiki': 'lg.wikipedia.org',
  'liwiki': 'li.wikipedia.org',
  'liwiktionary': 'li.wiktionary.org',
  'liwikibooks': 'li.wikibooks.org',
  'liwikiquote': 'li.wikiquote.org',
  'liwikisource': 'li.wikisource.org',
  'lijwiki': 'lij.wikipedia.org',
  'lmowiki': 'lmo.wikipedia.org',
  'lnwiki': 'ln.wikipedia.org',
  'lnwiktionary': 'ln.wiktionary.org',
  'lnwikibooks': 'ln.wikibooks.org',
  'lowiki': 'lo.wikipedia.org',
  'lowiktionary': 'lo.wiktionary.org',
  'lrcwiki': 'lrc.wikipedia.org',
  'ltwiki': 'lt.wikipedia.org',
  'ltwiktionary': 'lt.wiktionary.org',
  'ltwikibooks': 'lt.wikibooks.org',
  'ltwikiquote': 'lt.wikiquote.org',
  'ltwikisource': 'lt.wikisource.org',
  'ltgwiki': 'ltg.wikipedia.org',
  'lvwiki': 'lv.wikipedia.org',
  'lvwiktionary': 'lv.wiktionary.org',
  'lvwikibooks': 'lv.wikibooks.org',
  'maiwiki': 'mai.wikipedia.org',
  'map_bmswiki': 'map-bms.wikipedia.org',
  'mdfwiki': 'mdf.wikipedia.org',
  'mgwiki': 'mg.wikipedia.org',
  'mgwiktionary': 'mg.wiktionary.org',
  'mgwikibooks': 'mg.wikibooks.org',
  'mhwiki': 'mh.wikipedia.org',
  'mhwiktionary': 'mh.wiktionary.org',
  'mhrwiki': 'mhr.wikipedia.org',
  'miwiki': 'mi.wikipedia.org',
  'miwiktionary': 'mi.wiktionary.org',
  'miwikibooks': 'mi.wikibooks.org',
  'minwiki': 'min.wikipedia.org',
  'mkwiki': 'mk.wikipedia.org',
  'mkwiktionary': 'mk.wiktionary.org',
  'mkwikibooks': 'mk.wikibooks.org',
  'mkwikisource': 'mk.wikisource.org',
  'mlwiki': 'ml.wikipedia.org',
  'mlwiktionary': 'ml.wiktionary.org',
  'mlwikibooks': 'ml.wikibooks.org',
  'mlwikiquote': 'ml.wikiquote.org',
  'mlwikisource': 'ml.wikisource.org',
  'mnwiki': 'mn.wikipedia.org',
  'mnwiktionary': 'mn.wiktionary.org',
  'mnwikibooks': 'mn.wikibooks.org',
  'mowiki': 'mo.wikipedia.org',
  'mowiktionary': 'mo.wiktionary.org',
  'mrwiki': 'mr.wikipedia.org',
  'mrwiktionary': 'mr.wiktionary.org',
  'mrwikibooks': 'mr.wikibooks.org',
  'mrwikiquote': 'mr.wikiquote.org',
  'mrwikisource': 'mr.wikisource.org',
  'mrjwiki': 'mrj.wikipedia.org',
  'mswiki': 'ms.wikipedia.org',
  'mswiktionary': 'ms.wiktionary.org',
  'mswikibooks': 'ms.wikibooks.org',
  'mtwiki': 'mt.wikipedia.org',
  'mtwiktionary': 'mt.wiktionary.org',
  'muswiki': 'mus.wikipedia.org',
  'mwlwiki': 'mwl.wikipedia.org',
  'mywiki': 'my.wikipedia.org',
  'mywiktionary': 'my.wiktionary.org',
  'mywikibooks': 'my.wikibooks.org',
  'myvwiki': 'myv.wikipedia.org',
  'mznwiki': 'mzn.wikipedia.org',
  'nawiki': 'na.wikipedia.org',
  'nawiktionary': 'na.wiktionary.org',
  'nawikibooks': 'na.wikibooks.org',
  'nawikiquote': 'na.wikiquote.org',
  'nahwiki': 'nah.wikipedia.org',
  'nahwiktionary': 'nah.wiktionary.org',
  'nahwikibooks': 'nah.wikibooks.org',
  'napwiki': 'nap.wikipedia.org',
  'ndswiki': 'nds.wikipedia.org',
  'ndswiktionary': 'nds.wiktionary.org',
  'ndswikibooks': 'nds.wikibooks.org',
  'ndswikiquote': 'nds.wikiquote.org',
  'nds_nlwiki': 'nds-nl.wikipedia.org',
  'newiki': 'ne.wikipedia.org',
  'newiktionary': 'ne.wiktionary.org',
  'newikibooks': 'ne.wikibooks.org',
  'newwiki': 'new.wikipedia.org',
  'ngwiki': 'ng.wikipedia.org',
  'nlwiki': 'nl.wikipedia.org',
  'nlwiktionary': 'nl.wiktionary.org',
  'nlwikibooks': 'nl.wikibooks.org',
  'nlwikinews': 'nl.wikinews.org',
  'nlwikiquote': 'nl.wikiquote.org',
  'nlwikisource': 'nl.wikisource.org',
  'nlwikivoyage': 'nl.wikivoyage.org',
  'nnwiki': 'nn.wikipedia.org',
  'nnwiktionary': 'nn.wiktionary.org',
  'nnwikiquote': 'nn.wikiquote.org',
  'nowiki': 'no.wikipedia.org',
  'nowiktionary': 'no.wiktionary.org',
  'nowikibooks': 'no.wikibooks.org',
  'nowikinews': 'no.wikinews.org',
  'nowikiquote': 'no.wikiquote.org',
  'nowikisource': 'no.wikisource.org',
  'novwiki': 'nov.wikipedia.org',
  'nrmwiki': 'nrm.wikipedia.org',
  'nsowiki': 'nso.wikipedia.org',
  'nvwiki': 'nv.wikipedia.org',
  'nywiki': 'ny.wikipedia.org',
  'ocwiki': 'oc.wikipedia.org',
  'ocwiktionary': 'oc.wiktionary.org',
  'ocwikibooks': 'oc.wikibooks.org',
  'omwiki': 'om.wikipedia.org',
  'omwiktionary': 'om.wiktionary.org',
  'orwiki': 'or.wikipedia.org',
  'orwiktionary': 'or.wiktionary.org',
  'orwikisource': 'or.wikisource.org',
  'oswiki': 'os.wikipedia.org',
  'pawiki': 'pa.wikipedia.org',
  'pawiktionary': 'pa.wiktionary.org',
  'pawikibooks': 'pa.wikibooks.org',
  'pagwiki': 'pag.wikipedia.org',
  'pamwiki': 'pam.wikipedia.org',
  'papwiki': 'pap.wikipedia.org',
  'pcdwiki': 'pcd.wikipedia.org',
  'pdcwiki': 'pdc.wikipedia.org',
  'pflwiki': 'pfl.wikipedia.org',
  'piwiki': 'pi.wikipedia.org',
  'piwiktionary': 'pi.wiktionary.org',
  'pihwiki': 'pih.wikipedia.org',
  'plwiki': 'pl.wikipedia.org',
  'plwiktionary': 'pl.wiktionary.org',
  'plwikibooks': 'pl.wikibooks.org',
  'plwikinews': 'pl.wikinews.org',
  'plwikiquote': 'pl.wikiquote.org',
  'plwikisource': 'pl.wikisource.org',
  'plwikivoyage': 'pl.wikivoyage.org',
  'pmswiki': 'pms.wikipedia.org',
  'pnbwiki': 'pnb.wikipedia.org',
  'pnbwiktionary': 'pnb.wiktionary.org',
  'pntwiki': 'pnt.wikipedia.org',
  'pswiki': 'ps.wikipedia.org',
  'pswiktionary': 'ps.wiktionary.org',
  'pswikibooks': 'ps.wikibooks.org',
  'ptwiki': 'pt.wikipedia.org',
  'ptwiktionary': 'pt.wiktionary.org',
  'ptwikibooks': 'pt.wikibooks.org',
  'ptwikinews': 'pt.wikinews.org',
  'ptwikiquote': 'pt.wikiquote.org',
  'ptwikisource': 'pt.wikisource.org',
  'ptwikiversity': 'pt.wikiversity.org',
  'ptwikivoyage': 'pt.wikivoyage.org',
  'quwiki': 'qu.wikipedia.org',
  'quwiktionary': 'qu.wiktionary.org',
  'quwikibooks': 'qu.wikibooks.org',
  'quwikiquote': 'qu.wikiquote.org',
  'rmwiki': 'rm.wikipedia.org',
  'rmwiktionary': 'rm.wiktionary.org',
  'rmwikibooks': 'rm.wikibooks.org',
  'rmywiki': 'rmy.wikipedia.org',
  'rnwiki': 'rn.wikipedia.org',
  'rnwiktionary': 'rn.wiktionary.org',
  'rowiki': 'ro.wikipedia.org',
  'rowiktionary': 'ro.wiktionary.org',
  'rowikibooks': 'ro.wikibooks.org',
  'rowikinews': 'ro.wikinews.org',
  'rowikiquote': 'ro.wikiquote.org',
  'rowikisource': 'ro.wikisource.org',
  'rowikivoyage': 'ro.wikivoyage.org',
  'roa_rupwiki': 'roa-rup.wikipedia.org',
  'roa_rupwiktionary': 'roa-rup.wiktionary.org',
  'roa_tarawiki': 'roa-tara.wikipedia.org',
  'ruwiki': 'ru.wikipedia.org',
  'ruwiktionary': 'ru.wiktionary.org',
  'ruwikibooks': 'ru.wikibooks.org',
  'ruwikinews': 'ru.wikinews.org',
  'ruwikiquote': 'ru.wikiquote.org',
  'ruwikisource': 'ru.wikisource.org',
  'ruwikiversity': 'ru.wikiversity.org',
  'ruwikivoyage': 'ru.wikivoyage.org',
  'ruewiki': 'rue.wikipedia.org',
  'rwwiki': 'rw.wikipedia.org',
  'rwwiktionary': 'rw.wiktionary.org',
  'sawiki': 'sa.wikipedia.org',
  'sawiktionary': 'sa.wiktionary.org',
  'sawikibooks': 'sa.wikibooks.org',
  'sawikiquote': 'sa.wikiquote.org',
  'sawikisource': 'sa.wikisource.org',
  'sahwiki': 'sah.wikipedia.org',
  'sahwikisource': 'sah.wikisource.org',
  'scwiki': 'sc.wikipedia.org',
  'scwiktionary': 'sc.wiktionary.org',
  'scnwiki': 'scn.wikipedia.org',
  'scnwiktionary': 'scn.wiktionary.org',
  'scowiki': 'sco.wikipedia.org',
  'sdwiki': 'sd.wikipedia.org',
  'sdwiktionary': 'sd.wiktionary.org',
  'sdwikinews': 'sd.wikinews.org',
  'sewiki': 'se.wikipedia.org',
  'sewikibooks': 'se.wikibooks.org',
  'sgwiki': 'sg.wikipedia.org',
  'sgwiktionary': 'sg.wiktionary.org',
  'shwiki': 'sh.wikipedia.org',
  'shwiktionary': 'sh.wiktionary.org',
  'siwiki': 'si.wikipedia.org',
  'siwiktionary': 'si.wiktionary.org',
  'siwikibooks': 'si.wikibooks.org',
  'simplewiki': 'simple.wikipedia.org',
  'simplewiktionary': 'simple.wiktionary.org',
  'simplewikibooks': 'simple.wikibooks.org',
  'simplewikiquote': 'simple.wikiquote.org',
  'skwiki': 'sk.wikipedia.org',
  'skwiktionary': 'sk.wiktionary.org',
  'skwikibooks': 'sk.wikibooks.org',
  'skwikiquote': 'sk.wikiquote.org',
  'skwikisource': 'sk.wikisource.org',
  'slwiki': 'sl.wikipedia.org',
  'slwiktionary': 'sl.wiktionary.org',
  'slwikibooks': 'sl.wikibooks.org',
  'slwikiquote': 'sl.wikiquote.org',
  'slwikisource': 'sl.wikisource.org',
  'slwikiversity': 'sl.wikiversity.org',
  'smwiki': 'sm.wikipedia.org',
  'smwiktionary': 'sm.wiktionary.org',
  'snwiki': 'sn.wikipedia.org',
  'snwiktionary': 'sn.wiktionary.org',
  'sowiki': 'so.wikipedia.org',
  'sowiktionary': 'so.wiktionary.org',
  'sqwiki': 'sq.wikipedia.org',
  'sqwiktionary': 'sq.wiktionary.org',
  'sqwikibooks': 'sq.wikibooks.org',
  'sqwikinews': 'sq.wikinews.org',
  'sqwikiquote': 'sq.wikiquote.org',
  'srwiki': 'sr.wikipedia.org',
  'srwiktionary': 'sr.wiktionary.org',
  'srwikibooks': 'sr.wikibooks.org',
  'srwikinews': 'sr.wikinews.org',
  'srwikiquote': 'sr.wikiquote.org',
  'srwikisource': 'sr.wikisource.org',
  'srnwiki': 'srn.wikipedia.org',
  'sswiki': 'ss.wikipedia.org',
  'sswiktionary': 'ss.wiktionary.org',
  'stwiki': 'st.wikipedia.org',
  'stwiktionary': 'st.wiktionary.org',
  'stqwiki': 'stq.wikipedia.org',
  'suwiki': 'su.wikipedia.org',
  'suwiktionary': 'su.wiktionary.org',
  'suwikibooks': 'su.wikibooks.org',
  'suwikiquote': 'su.wikiquote.org',
  'svwiki': 'sv.wikipedia.org',
  'svwiktionary': 'sv.wiktionary.org',
  'svwikibooks': 'sv.wikibooks.org',
  'svwikinews': 'sv.wikinews.org',
  'svwikiquote': 'sv.wikiquote.org',
  'svwikisource': 'sv.wikisource.org',
  'svwikiversity': 'sv.wikiversity.org',
  'svwikivoyage': 'sv.wikivoyage.org',
  'swwiki': 'sw.wikipedia.org',
  'swwiktionary': 'sw.wiktionary.org',
  'swwikibooks': 'sw.wikibooks.org',
  'szlwiki': 'szl.wikipedia.org',
  'tawiki': 'ta.wikipedia.org',
  'tawiktionary': 'ta.wiktionary.org',
  'tawikibooks': 'ta.wikibooks.org',
  'tawikinews': 'ta.wikinews.org',
  'tawikiquote': 'ta.wikiquote.org',
  'tawikisource': 'ta.wikisource.org',
  'tewiki': 'te.wikipedia.org',
  'tewiktionary': 'te.wiktionary.org',
  'tewikibooks': 'te.wikibooks.org',
  'tewikiquote': 'te.wikiquote.org',
  'tewikisource': 'te.wikisource.org',
  'tetwiki': 'tet.wikipedia.org',
  'tgwiki': 'tg.wikipedia.org',
  'tgwiktionary': 'tg.wiktionary.org',
  'tgwikibooks': 'tg.wikibooks.org',
  'thwiki': 'th.wikipedia.org',
  'thwiktionary': 'th.wiktionary.org',
  'thwikibooks': 'th.wikibooks.org',
  'thwikinews': 'th.wikinews.org',
  'thwikiquote': 'th.wikiquote.org',
  'thwikisource': 'th.wikisource.org',
  'tiwiki': 'ti.wikipedia.org',
  'tiwiktionary': 'ti.wiktionary.org',
  'tkwiki': 'tk.wikipedia.org',
  'tkwiktionary': 'tk.wiktionary.org',
  'tkwikibooks': 'tk.wikibooks.org',
  'tkwikiquote': 'tk.wikiquote.org',
  'tlwiki': 'tl.wikipedia.org',
  'tlwiktionary': 'tl.wiktionary.org',
  'tlwikibooks': 'tl.wikibooks.org',
  'tnwiki': 'tn.wikipedia.org',
  'tnwiktionary': 'tn.wiktionary.org',
  'towiki': 'to.wikipedia.org',
  'towiktionary': 'to.wiktionary.org',
  'tpiwiki': 'tpi.wikipedia.org',
  'tpiwiktionary': 'tpi.wiktionary.org',
  'trwiki': 'tr.wikipedia.org',
  'trwiktionary': 'tr.wiktionary.org',
  'trwikibooks': 'tr.wikibooks.org',
  'trwikinews': 'tr.wikinews.org',
  'trwikiquote': 'tr.wikiquote.org',
  'trwikisource': 'tr.wikisource.org',
  'tswiki': 'ts.wikipedia.org',
  'tswiktionary': 'ts.wiktionary.org',
  'ttwiki': 'tt.wikipedia.org',
  'ttwiktionary': 'tt.wiktionary.org',
  'ttwikibooks': 'tt.wikibooks.org',
  'ttwikiquote': 'tt.wikiquote.org',
  'tumwiki': 'tum.wikipedia.org',
  'twwiki': 'tw.wikipedia.org',
  'twwiktionary': 'tw.wiktionary.org',
  'tywiki': 'ty.wikipedia.org',
  'tyvwiki': 'tyv.wikipedia.org',
  'udmwiki': 'udm.wikipedia.org',
  'ugwiki': 'ug.wikipedia.org',
  'ugwiktionary': 'ug.wiktionary.org',
  'ugwikibooks': 'ug.wikibooks.org',
  'ugwikiquote': 'ug.wikiquote.org',
  'ukwiki': 'uk.wikipedia.org',
  'ukwiktionary': 'uk.wiktionary.org',
  'ukwikibooks': 'uk.wikibooks.org',
  'ukwikinews': 'uk.wikinews.org',
  'ukwikiquote': 'uk.wikiquote.org',
  'ukwikisource': 'uk.wikisource.org',
  'ukwikivoyage': 'uk.wikivoyage.org',
  'urwiki': 'ur.wikipedia.org',
  'urwiktionary': 'ur.wiktionary.org',
  'urwikibooks': 'ur.wikibooks.org',
  'urwikiquote': 'ur.wikiquote.org',
  'uzwiki': 'uz.wikipedia.org',
  'uzwiktionary': 'uz.wiktionary.org',
  'uzwikibooks': 'uz.wikibooks.org',
  'uzwikiquote': 'uz.wikiquote.org',
  'vewiki': 've.wikipedia.org',
  'vecwiki': 'vec.wikipedia.org',
  'vecwiktionary': 'vec.wiktionary.org',
  'vecwikisource': 'vec.wikisource.org',
  'vepwiki': 'vep.wikipedia.org',
  'viwiki': 'vi.wikipedia.org',
  'viwiktionary': 'vi.wiktionary.org',
  'viwikibooks': 'vi.wikibooks.org',
  'viwikiquote': 'vi.wikiquote.org',
  'viwikisource': 'vi.wikisource.org',
  'viwikivoyage': 'vi.wikivoyage.org',
  'vlswiki': 'vls.wikipedia.org',
  'vowiki': 'vo.wikipedia.org',
  'vowiktionary': 'vo.wiktionary.org',
  'vowikibooks': 'vo.wikibooks.org',
  'vowikiquote': 'vo.wikiquote.org',
  'wawiki': 'wa.wikipedia.org',
  'wawiktionary': 'wa.wiktionary.org',
  'wawikibooks': 'wa.wikibooks.org',
  'warwiki': 'war.wikipedia.org',
  'wowiki': 'wo.wikipedia.org',
  'wowiktionary': 'wo.wiktionary.org',
  'wowikiquote': 'wo.wikiquote.org',
  'wuuwiki': 'wuu.wikipedia.org',
  'xalwiki': 'xal.wikipedia.org',
  'xhwiki': 'xh.wikipedia.org',
  'xhwiktionary': 'xh.wiktionary.org',
  'xhwikibooks': 'xh.wikibooks.org',
  'xmfwiki': 'xmf.wikipedia.org',
  'yiwiki': 'yi.wikipedia.org',
  'yiwiktionary': 'yi.wiktionary.org',
  'yiwikisource': 'yi.wikisource.org',
  'yowiki': 'yo.wikipedia.org',
  'yowiktionary': 'yo.wiktionary.org',
  'yowikibooks': 'yo.wikibooks.org',
  'zawiki': 'za.wikipedia.org',
  'zawiktionary': 'za.wiktionary.org',
  'zawikibooks': 'za.wikibooks.org',
  'zawikiquote': 'za.wikiquote.org',
  'zeawiki': 'zea.wikipedia.org',
  'zhwiki': 'zh.wikipedia.org',
  'zhwiktionary': 'zh.wiktionary.org',
  'zhwikibooks': 'zh.wikibooks.org',
  'zhwikinews': 'zh.wikinews.org',
  'zhwikiquote': 'zh.wikiquote.org',
  'zhwikisource': 'zh.wikisource.org',
  'zhwikivoyage': 'zh.wikivoyage.org',
  'zh_classicalwiki': 'zh-classical.wikipedia.org',
  'zh_min_nanwiki': 'zh-min-nan.wikipedia.org',
  'zh_min_nanwiktionary': 'zh-min-nan.wiktionary.org',
  'zh_min_nanwikibooks': 'zh-min-nan.wikibooks.org',
  'zh_min_nanwikiquote': 'zh-min-nan.wikiquote.org',
  'zh_min_nanwikisource': 'zh-min-nan.wikisource.org',
  'zh_yuewiki': 'zh-yue.wikipedia.org',
  'zuwiki': 'zu.wikipedia.org',
  'zuwiktionary': 'zu.wiktionary.org',
  'zuwikibooks': 'zu.wikibooks.org',
  'advisorywiki': 'advisory.wikimedia.org',
  'arwikimedia': 'ar.wikimedia.org',
  'arbcom_dewiki': 'arbcom-de.wikipedia.org',
  'arbcom_enwiki': 'arbcom-en.wikipedia.org',
  'arbcom_fiwiki': 'arbcom-fi.wikipedia.org',
  'arbcom_nlwiki': 'arbcom-nl.wikipedia.org',
  'auditcomwiki': 'auditcom.wikimedia.org',
  'bdwikimedia': 'bd.wikimedia.org',
  'bewikimedia': 'be.wikimedia.org',
  'betawikiversity': 'beta.wikiversity.org',
  'boardwiki': 'board.wikimedia.org',
  'boardgovcomwiki': 'boardgovcom.wikimedia.org',
  'brwikimedia': 'br.wikimedia.org',
  'cawikimedia': 'ca.wikimedia.org',
  'chairwiki': 'chair.wikimedia.org',
  'chapcomwiki': 'affcom.wikimedia.org',
  'checkuserwiki': 'checkuser.wikimedia.org',
  'cnwikimedia': 'cn.wikimedia.org',
  'cowikimedia': 'co.wikimedia.org',
  'collabwiki': 'collab.wikimedia.org',
  'commonswiki': 'commons.wikimedia.org',
  'dkwikimedia': 'dk.wikimedia.org',
  'donatewiki': 'donate.wikimedia.org',
  'etwikimedia': 'ee.wikimedia.org',
  'execwiki': 'exec.wikimedia.org',
  'fdcwiki': 'fdc.wikimedia.org',
  'fiwikimedia': 'fi.wikimedia.org',
  'foundationwiki': 'wikimediafoundation.org',
  'grantswiki': 'grants.wikimedia.org',
  'iegcomwiki': 'iegcom.wikimedia.org',
  'ilwikimedia': 'il.wikimedia.org',
  'incubatorwiki': 'incubator.wikimedia.org',
  'internalwiki': 'internal.wikimedia.org',
  'labswiki': 'wikitech.wikimedia.org',
  'labtestwiki': 'labtestwikitech.wikimedia.org',
  'legalteamwiki': 'legalteam.wikimedia.org',
  'loginwiki': 'login.wikimedia.org',
  'mediawikiwiki': 'mediawiki.org',
  'metawiki': 'meta.wikimedia.org',
  'mkwikimedia': 'mk.wikimedia.org',
  'movementroleswiki': 'movementroles.wikimedia.org',
  'mxwikimedia': 'mx.wikimedia.org',
  'nlwikimedia': 'nl.wikimedia.org',
  'nowikimedia': 'no.wikimedia.org',
  'noboard_chapterswikimedia': 'noboard-chapters.wikimedia.org',
  'nostalgiawiki': 'nostalgia.wikipedia.org',
  'nycwikimedia': 'nyc.wikimedia.org',
  'nzwikimedia': 'nz.wikimedia.org',
  'officewiki': 'office.wikimedia.org',
  'ombudsmenwiki': 'ombudsmen.wikimedia.org',
  'otrs_wikiwiki': 'otrs-wiki.wikimedia.org',
  'outreachwiki': 'outreach.wikimedia.org',
  'pa_uswikimedia': 'pa-us.wikimedia.org',
  'plwikimedia': 'pl.wikimedia.org',
  'qualitywiki': 'quality.wikimedia.org',
  'rswikimedia': 'rs.wikimedia.org',
  'ruwikimedia': 'ru.wikimedia.org',
  'sewikimedia': 'se.wikimedia.org',
  'searchcomwiki': 'searchcom.wikimedia.org',
  'sourceswiki': 'wikisource.org',
  'spcomwiki': 'spcom.wikimedia.org',
  'specieswiki': 'species.wikimedia.org',
  'stewardwiki': 'steward.wikimedia.org',
  'strategywiki': 'strategy.wikimedia.org',
  'tenwiki': 'ten.wikipedia.org',
  'testwiki': 'test.wikipedia.org',
  'test2wiki': 'test2.wikipedia.org',
  'testwikidatawiki': 'test.wikidata.org',
  'trwikimedia': 'tr.wikimedia.org',
  'transitionteamwiki': 'transitionteam.wikimedia.org',
  'uawikimedia': 'ua.wikimedia.org',
  'ukwikimedia': 'uk.wikimedia.org',
  'usabilitywiki': 'usability.wikimedia.org',
  'votewiki': 'vote.wikimedia.org',
  'wg_enwiki': 'wg-en.wikipedia.org',
  'wikidatawiki': 'wikidata.org',
  'wikimania2005wiki': 'wikimania2005.wikimedia.org',
  'wikimania2006wiki': 'wikimania2006.wikimedia.org',
  'wikimania2007wiki': 'wikimania2007.wikimedia.org',
  'wikimania2008wiki': 'wikimania2008.wikimedia.org',
  'wikimania2009wiki': 'wikimania2009.wikimedia.org',
  'wikimania2010wiki': 'wikimania2010.wikimedia.org',
  'wikimania2011wiki': 'wikimania2011.wikimedia.org',
  'wikimania2012wiki': 'wikimania2012.wikimedia.org',
  'wikimania2013wiki': 'wikimania2013.wikimedia.org',
  'wikimania2014wiki': 'wikimania2014.wikimedia.org',
  'wikimania2015wiki': 'wikimania2015.wikimedia.org',
  'wikimania2016wiki': 'wikimania2016.wikimedia.org',
  'wikimania2017wiki': 'wikimania2017.wikimedia.org',
  'wikimaniateamwiki': 'wikimaniateam.wikimedia.org',
  'zerowiki': 'zero.wikimedia.org'
};

module.exports = siteMap;

},{}],7:[function(require,module,exports){
/**
 * @file Templates used by Chart.js for Pageviews app
 * @author MusikAnimal
 * @copyright 2016 MusikAnimal
 */

/**
 * Templates used by Chart.js.
 * Functions used within our app must be in the global scope.
 * All quotations must be double-quotes or properly escaped.
 * @type {Object}
 */
const templates = {
  chartLegend(scope) {
    const dataList = (entity, multiEntity = false) => {
      let editsLink;

      if (multiEntity) {
        editsLink = scope.formatNumber(entity.num_edits);
      } else {
        editsLink = `<a href="${ scope.getExpandedPageURL(entity.label) }&action=history" target="_blank" class="pull-right">
            ${ scope.formatNumber(entity.num_edits) }
          </a>`;
      }

      let infoHash = {
        'Pageviews': {
          'Pageviews': scope.formatNumber(entity.sum),
          'Daily average': scope.formatNumber(entity.average)
        },
        'Revisions': {
          'Edits': editsLink,
          'Editors': scope.formatNumber(entity.num_users)
        },
        'Basic information': {
          'Watchers': entity.watchers ? scope.formatNumber(entity.watchers) : $.i18n('unknown')
        }
      };

      if (!multiEntity) {
        Object.assign(infoHash['Basic information'], {
          'Size': entity.length ? scope.formatNumber(entity.length) : '',
          'Protection': entity.protection
        });
      }

      let markup = '';

      for (let block in infoHash) {
        markup += `<div class='legend-block'><h5>${ block }</h5><hr/>`;
        for (let key in infoHash[block]) {
          const value = infoHash[block][key];
          if (!value) continue;
          markup += `
            <div class="linear-legend--counts">
              ${ key }:
              <span class='pull-right'>
                ${ value }
              </span>
            </div>`;
        }
        markup += '</div>';
      }

      if (!multiEntity) {
        markup += `
          <div class="linear-legend--links">
            <a href="${ scope.getLangviewsURL(entity.label) }" target="_blank">${ $.i18n('all-languages') }</a>
            &bullet;
            <a href="${ scope.getRedirectviewsURL(entity.label) }" target="_blank">${ $.i18n('redirects') }</a>
          </div>`;
      }

      return markup;
    };

    // map out edit protection level for each entity
    const entities = scope.outputData.map(entity => {
      const protection = (entity.protection || []).find(prot => prot.type === 'edit');
      entity.protection = protection ? protection.level : $.i18n('none').toLowerCase();
      return entity;
    });

    if (scope.outputData.length === 1) {
      return dataList(entities[0]);
    }

    const sum = entities.reduce((a, b) => a + b.sum, 0);
    const totals = {
      sum,
      average: Math.round(sum / entities.length),
      num_edits: entities.reduce((a, b) => a + b.num_edits, 0),
      num_users: entities.reduce((a, b) => a + b.num_users, 0),
      watchers: entities.reduce((a, b) => a + b.watchers || 0, 0)
    };

    return dataList(totals, true);
  }
};

module.exports = templates;

},{}]},{},[2])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJqYXZhc2NyaXB0cy9jb25maWcuanMiLCJqYXZhc2NyaXB0cy9wYWdldmlld3MuanMiLCJqYXZhc2NyaXB0cy9zaGFyZWQvY2hhcnRfaGVscGVycy5qcyIsImphdmFzY3JpcHRzL3NoYXJlZC9wdi5qcyIsImphdmFzY3JpcHRzL3NoYXJlZC9wdl9jb25maWcuanMiLCJqYXZhc2NyaXB0cy9zaGFyZWQvc2l0ZV9tYXAuanMiLCJqYXZhc2NyaXB0cy90ZW1wbGF0ZXMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7QUNNQSxNQUFNLFlBQVksUUFBUSxhQUFSLENBQWxCOzs7Ozs7O0FBT0EsTUFBTSxTQUFTO0FBQ2IsaUJBQWUsZUFERjtBQUViLFNBQU8sWUFGTTtBQUdiLGVBQWEsVUFBVSxXQUhWO0FBSWIscUJBQW1CLDBCQUpOO0FBS2IsWUFBVTtBQUNSLGVBQVc7QUFESCxHQUxHO0FBUWIsdUJBQXFCLDJCQVJSO0FBU2Isb0JBQWtCLGtCQVRMO0FBVWIsZ0JBQWMsb0JBVkQ7QUFXYixnQkFBYyx1QkFYRDtBQVliLGtCQUFnQixDQUFDLFNBQUQsRUFBWSxVQUFaLEVBQXdCLE9BQXhCO0FBWkgsQ0FBZjs7QUFlQSxPQUFPLE9BQVAsR0FBaUIsTUFBakI7Ozs7Ozs7Ozs7O0FDcEJBLE1BQU0sU0FBUyxRQUFRLFVBQVIsQ0FBZjtBQUNBLE1BQU0sS0FBSyxRQUFRLGFBQVIsQ0FBWDtBQUNBLE1BQU0sZUFBZSxRQUFRLHdCQUFSLENBQXJCOzs7QUFHQSxNQUFNLFNBQU4sU0FBd0IsSUFBSSxFQUFKLEVBQVEsSUFBUixDQUFhLFlBQWIsQ0FBeEIsQ0FBbUQ7QUFDakQsZ0JBQWM7QUFDWixVQUFNLE1BQU47QUFDQSxTQUFLLEdBQUwsR0FBVyxXQUFYOztBQUVBLFNBQUssVUFBTCxHQUFrQixLQUFsQixDO0FBQ0EsU0FBSyxZQUFMLEdBQW9CLElBQXBCO0FBQ0EsU0FBSyxZ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QUFvQyxDQUFwQyxDQUFaO0FBQ0EsVUFBTSxTQUFTO0FBQ2IsU0FEYTtBQUViLGVBQVMsS0FBSyxLQUFMLENBQVcsTUFBTSxTQUFTLE1BQTFCLENBRkk7QUFHYixpQkFBVyxTQUFTLE1BQVQsQ0FBZ0IsQ0FBQyxDQUFELEVBQUksQ0FBSixLQUFVLElBQUksRUFBRSxTQUFoQyxFQUEyQyxDQUEzQyxDQUhFO0FBSWIsaUJBQVcsU0FBUyxNQUFULENBQWdCLENBQUMsQ0FBRCxFQUFJLENBQUosS0FBVSxJQUFJLEVBQUUsU0FBaEMsRUFBMkMsQ0FBM0MsQ0FKRTtBQUtiLGdCQUFVLFNBQVMsTUFBVCxDQUFnQixDQUFDLENBQUQsRUFBSSxDQUFKLEtBQVUsSUFBSSxFQUFFLFFBQU4sSUFBa0IsQ0FBNUMsRUFBK0MsQ0FBL0M7QUFMRyxLQUFmOztBQVFBLFdBQU8sU0FBUyxNQUFULEVBQWlCLElBQWpCLENBQVA7QUFDRDtBQXJGZSxDQUFsQjs7QUF3RkEsT0FBTyxPQUFQLEdBQWlCLFNBQWpCIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIi8qKlxuICogQGZpbGUgQ29uZmlndXJhdGlvbiBmb3IgUGFnZXZpZXdzIGFwcGxpY2F0aW9uXG4gKiBAYXV0aG9yIE11c2lrQW5pbWFsXG4gKiBAY29weXJpZ2h0IDIwMTYgTXVzaWtBbmltYWxcbiAqL1xuXG5jb25zdCB0ZW1wbGF0ZXMgPSByZXF1aXJlKCcuL3RlbXBsYXRlcycpO1xuXG4vKipcbiAqIENvbmZpZ3VyYXRpb24gZm9yIFBhZ2V2aWV3cyBhcHBsaWNhdGlvbi5cbiAqIFRoaXMgaW5jbHVkZXMgc2VsZWN0b3JzLCBkZWZhdWx0cywgYW5kIG90aGVyIGNvbnN0YW50cyBzcGVjaWZpYyB0byBQYWdldmlld3NcbiAqIEB0eXBlIHtPYmplY3R9XG4gKi9cbmNvbnN0IGNvbmZpZyA9IHtcbiAgYWdlbnRTZWxlY3RvcjogJyNhZ2VudC1zZWxlY3QnLFxuICBjaGFydDogJy5hcXMtY2hhcnQnLFxuICBjaGFydExlZ2VuZDogdGVtcGxhdGVzLmNoYXJ0TGVnZW5kLFxuICBkYXRlUmFuZ2VTZWxlY3RvcjogJy5hcXMtZGF0ZS1yYW5nZS1zZWxlY3RvcicsXG4gIGRlZmF1bHRzOiB7XG4gICAgZGF0ZVJhbmdlOiAnbGF0ZXN0LTIwJ1xuICB9LFxuICBsb2dhcml0aG1pY0NoZWNrYm94OiAnLmxvZ2FyaXRobWljLXNjYWxlLW9wdGlvbicsXG4gIHBsYXRmb3JtU2VsZWN0b3I6ICcjcGxhdGZvcm0tc2VsZWN0JyxcbiAgcHJvamVjdElucHV0OiAnLmFxcy1wcm9qZWN0LWlucHV0JyxcbiAgc2VsZWN0MklucHV0OiAnLmFxcy1zZWxlY3QyLXNlbGVjdG9yJyxcbiAgdmFsaWRhdGVQYXJhbXM6IFsncHJvamVjdCcsICdwbGF0Zm9ybScsICdhZ2VudCddXG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGNvbmZpZztcbiIsIi8qKlxuICogUGFnZXZpZXdzIEFuYWx5c2lzIHRvb2xcbiAqIEBmaWxlIE1haW4gZmlsZSBmb3IgUGFnZXZpZXdzIGFwcGxpY2F0aW9uXG4gKiBAYXV0aG9yIE11c2lrQW5pbWFsLCBLYWxkYXJpLCBNYXJjZWxyZlxuICogQGNvcHlyaWdodCAyMDE2IE11c2lrQW5pbWFsLCBLYWxkYXJpLCBNYXJjZWxyZlxuICogQGxpY2Vuc2UgTUlUIExpY2Vuc2U6IGh0dHBzOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvTUlUXG4gKi9cblxuY29uc3QgY29uZmlnID0gcmVxdWlyZSgnLi9jb25maWcnKTtcbmNvbnN0IFB2ID0gcmVxdWlyZSgnLi9zaGFyZWQvcHYnKTtcbmNvbnN0IENoYXJ0SGVscGVycyA9IHJlcXVpcmUoJy4vc2hhcmVkL2NoYXJ0X2hlbHBlcnMnKTtcblxuLyoqIE1haW4gUGFnZVZpZXdzIGNsYXNzICovXG5jbGFzcyBQYWdlVmlld3MgZXh0ZW5kcyBtaXgoUHYpLndpdGgoQ2hhcnRIZWxwZXJzKSB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHN1cGVyKGNvbmZpZyk7XG4gICAgdGhpcy5hcHAgPSAncGFnZXZpZXdzJztcblxuICAgIHRoaXMuZW50aXR5SW5mbyA9IGZhbHNlOyAvKiogbGV0J3MgdXMga25vdyBpZiB3ZSd2ZSBnb3R0ZW4gdGhlIHBhZ2UgaW5mbyBmcm9tIEFQSSB5ZXQgKi9cbiAgICB0aGlzLnNwZWNpYWxSYW5nZSA9IG51bGw7XG4gICAgdGhpcy5pbml0aWFsUXVlcnkgPSBmYWxzZTtcbiAgICB0aGlzLnNvcnQgPSAndGl0bGUnO1xuICAgIHRoaXMuZGlyZWN0aW9uID0gJy0xJztcblxuICAgIC8qKlxuICAgICAqIFNlbGVjdDIgbGlicmFyeSBwcmludHMgXCJVbmNhdWdodCBUeXBlRXJyb3I6IFhZWiBpcyBub3QgYSBmdW5jdGlvblwiIGVycm9yc1xuICAgICAqIGNhdXNlZCBieSByYWNlIGNvbmRpdGlvbnMgYmV0d2VlbiBjb25zZWN1dGl2ZSBhamF4IGNhbGxzLiBUaGV5IGFyZSBhY3R1YWxseVxuICAgICAqIG5vdCBjcml0aWNhbCBhbmQgY2FuIGJlIGF2b2lkZWQgd2l0aCB0aGlzIGVtcHR5IGZ1bmN0aW9uLlxuICAgICAqL1xuICAgIHdpbmRvdy5hcnRpY2xlU3VnZ2VzdGlvbkNhbGxiYWNrID0gJC5ub29wO1xuICB9XG5cbiAgLyoqXG4gICAqIEluaXRpYWxpemUgdGhlIGFwcGxpY2F0aW9uLlxuICAgKiBDYWxsZWQgaW4gYHB2LmpzYCBhZnRlciB0cmFuc2xhdGlvbnMgaGF2ZSBsb2FkZWRcbiAgICogQHJldHVybiB7bnVsbH0gTm90aGluZ1xuICAgKi9cbiAgaW5pdGlhbGl6ZSgpIHtcbiAgICB0aGlzLnNldHVwRGF0ZVJhbmdlU2VsZWN0b3IoKTtcbiAgICB0aGlzLnNldHVwU2VsZWN0MigpO1xuICAgIHRoaXMuc2V0dXBTZWxlY3QyQ29sb3JzKCk7XG4gICAgdGhpcy5wb3BQYXJhbXMoKTtcbiAgICB0aGlzLnNldHVwTGlzdGVuZXJzKCk7XG4gICAgdGhpcy51cGRhdGVJbnRlckFwcExpbmtzKCk7XG4gIH1cblxuICAvKipcbiAgICogUXVlcnkgbXVzaWthbmltYWwgQVBJIHRvIGdldCBlZGl0IGRhdGEgYWJvdXQgcGFnZSB3aXRoaW4gZGF0ZSByYW5nZVxuICAgKiBAcGFyYW0ge0FycmF5fSBwYWdlcyAtIHBhZ2UgbmFtZXNcbiAgICogQHJldHVybnMge0RlZmVycmVkfSBQcm9taXNlIHJlc29sdmluZyB3aXRoIGVkaXRpbmcgZGF0YVxuICAgKi9cbiAgZ2V0RWRpdERhdGEocGFnZXMpIHtcbiAgICBjb25zdCBkZmQgPSAkLkRlZmVycmVkKCk7XG5cbiAgICBpZiAobWV0YVJvb3QpIHtcbiAgICAgICQuYWpheCh7XG4gICAgICAgIHVybDogYC8vJHttZXRhUm9vdH0vYXJ0aWNsZV9hbmFseXNpcy9iYXNpY19pbmZvYCxcbiAgICAgICAgZGF0YToge1xuICAgICAgICAgIHBhZ2VzOiBwYWdlcy5qb2luKCd8JyksXG4gICAgICAgICAgcHJvamVjdDogdGhpcy5wcm9qZWN0LFxuICAgICAgICAgIHN0YXJ0OiB0aGlzLmRhdGVyYW5nZXBpY2tlci5zdGFydERhdGUuZm9ybWF0KCdZWVlZLU1NLUREJyksXG4gICAgICAgICAgZW5kOiB0aGlzLmRhdGVyYW5nZXBpY2tlci5lbmREYXRlLmZvcm1hdCgnWVlZWS1NTS1ERCcpXG4gICAgICAgIH1cbiAgICAgIH0pLnRoZW4oZGF0YSA9PiBkZmQucmVzb2x2ZShkYXRhKSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGRmZC5yZXNvbHZlKHtcbiAgICAgICAgbnVtX2VkaXRzOiAwLFxuICAgICAgICBudW1fdXNlcnM6IDBcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIHJldHVybiBkZmQ7XG4gIH1cblxuICAvKipcbiAgICogTGluayB0byAvbGFuZ3ZpZXdzIGZvciBnaXZlbiBwYWdlIGFuZCBjaG9zZW4gZGF0ZXJhbmdlXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBwYWdlIC0gcGFnZSB0aXRsZVxuICAgKiBAcmV0dXJucyB7U3RyaW5nfSBVUkxcbiAgICovXG4gIGdldExhbmd2aWV3c1VSTChwYWdlKSB7XG4gICAgcmV0dXJuIGAvbGFuZ3ZpZXdzPyR7JC5wYXJhbSh0aGlzLmdldFBhcmFtcygpKX0mcGFnZT0ke3BhZ2UucmVwbGFjZSgvWyYlXS9nLCBlc2NhcGUpLnNjb3JlKCl9YDtcbiAgfVxuXG4gIC8qKlxuICAgKiBMaW5rIHRvIC9yZWRpcmVjdHZpZXdzIGZvciBnaXZlbiBwYWdlIGFuZCBjaG9zZW4gZGF0ZXJhbmdlXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBwYWdlIC0gcGFnZSB0aXRsZVxuICAgKiBAcmV0dXJucyB7U3RyaW5nfSBVUkxcbiAgICovXG4gIGdldFJlZGlyZWN0dmlld3NVUkwocGFnZSkge1xuICAgIHJldHVybiBgL3JlZGlyZWN0dmlld3M/JHskLnBhcmFtKHRoaXMuZ2V0UGFyYW1zKCkpfSZwYWdlPSR7cGFnZS5yZXBsYWNlKC9bJiVdL2csIGVzY2FwZSkuc2NvcmUoKX1gO1xuICB9XG5cbiAgLyoqXG4gICAqIENvbnN0cnVjdCBxdWVyeSBmb3IgQVBJIGJhc2VkIG9uIHdoYXQgdHlwZSBvZiBzZWFyY2ggd2UncmUgZG9pbmdcbiAgICogQHBhcmFtIHtPYmplY3R9IHF1ZXJ5IC0gYXMgcmV0dXJuZWQgZnJvbSBTZWxlY3QyIGlucHV0XG4gICAqIEByZXR1cm5zIHtPYmplY3R9IHF1ZXJ5IHBhcmFtcyB0byBiZSBoYW5kZWQgb2ZmIHRvIEFQSVxuICAgKi9cbiAgZ2V0U2VhcmNoUGFyYW1zKHF1ZXJ5KSB7XG4gICAgaWYgKHRoaXMuYXV0b2NvbXBsZXRlID09PSAnYXV0b2NvbXBsZXRlJykge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgYWN0aW9uOiAncXVlcnknLFxuICAgICAgICBsaXN0OiAncHJlZml4c2VhcmNoJyxcbiAgICAgICAgZm9ybWF0OiAnanNvbicsXG4gICAgICAgIHBzc2VhcmNoOiBxdWVyeSB8fCAnJyxcbiAgICAgICAgY2lycnVzVXNlQ29tcGxldGlvblN1Z2dlc3RlcjogJ3llcydcbiAgICAgIH07XG4gICAgfSBlbHNlIGlmICh0aGlzLmF1dG9jb21wbGV0ZSA9PT0gJ2F1dG9jb21wbGV0ZV9yZWRpcmVjdHMnKSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBhY3Rpb246ICdxdWVyeScsXG4gICAgICAgIGdlbmVyYXRvcjogJ3ByZWZpeHNlYXJjaCcsXG4gICAgICAgIGZvcm1hdDogJ2pzb24nLFxuICAgICAgICBncHNzZWFyY2g6IHF1ZXJ5IHx8ICcnLFxuICAgICAgICBncHNsaW1pdDogJzEwJyxcbiAgICAgICAgcmVkaXJlY3RzOiAndHJ1ZScsXG4gICAgICAgIGNpcnJ1c1VzZUNvbXBsZXRpb25TdWdnZXN0ZXI6ICdubydcbiAgICAgIH07XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFBhcnNlcyB0aGUgVVJMIHF1ZXJ5IHN0cmluZyBhbmQgc2V0cyBhbGwgdGhlIGlucHV0cyBhY2NvcmRpbmdseVxuICAgKiBTaG91bGQgb25seSBiZSBjYWxsZWQgb24gaW5pdGlhbCBwYWdlIGxvYWQsIHVudGlsIHdlIGRlY2lkZSB0byBzdXBwb3J0IHBvcCBzdGF0ZXMgKHByb2JhYmx5IG5ldmVyKVxuICAgKiBAcmV0dXJucyB7bnVsbH0gbm90aGluZ1xuICAgKi9cbiAgcG9wUGFyYW1zKCkge1xuICAgIC8qKiBzaG93IGxvYWRpbmcgaW5kaWNhdG9yIGFuZCBhZGQgZXJyb3IgaGFuZGxpbmcgZm9yIHRpbWVvdXRzICovXG4gICAgc2V0VGltZW91dCh0aGlzLnN0YXJ0U3Bpbm55LmJpbmQodGhpcykpOyAvLyB1c2Ugc2V0VGltZW91dCB0byBmb3JjZSByZW5kZXJpbmcgdGhyZWFkcyB0byBjYXRjaCB1cFxuXG4gICAgbGV0IHBhcmFtcyA9IHRoaXMudmFsaWRhdGVQYXJhbXMoXG4gICAgICB0aGlzLnBhcnNlUXVlcnlTdHJpbmcoJ3BhZ2VzJylcbiAgICApO1xuXG4gICAgJCh0aGlzLmNvbmZpZy5wcm9qZWN0SW5wdXQpLnZhbChwYXJhbXMucHJvamVjdCk7XG4gICAgJCh0aGlzLmNvbmZpZy5wbGF0Zm9ybVNlbGVjdG9yKS52YWwocGFyYW1zLnBsYXRmb3JtKTtcbiAgICAkKHRoaXMuY29uZmlnLmFnZW50U2VsZWN0b3IpLnZhbChwYXJhbXMuYWdlbnQpO1xuXG4gICAgdGhpcy5wYXRjaFVzYWdlKCk7XG4gICAgdGhpcy52YWxpZGF0ZURhdGVSYW5nZShwYXJhbXMpO1xuXG4gICAgdGhpcy5yZXNldFNlbGVjdDIoKTtcblxuICAgIC8qKlxuICAgICAqIFNldHMgdGhlIFNlbGVjdDIgZGVmYXVsdHMsIHdoaWNoIHRyaWdnZXJzIHRoZSBTZWxlY3QyIGxpc3RlbmVyIGFuZCBjYWxscyB0aGlzLnByb2Nlc3NJbnB1dFxuICAgICAqIEBwYXJhbSB7QXJyYXl9IHBhZ2VzIC0gcGFnZXMgdG8gcXVlcnlcbiAgICAgKiBAcmV0dXJuIHtudWxsfSBub3RoaW5nXG4gICAgICovXG4gICAgY29uc3QgZ2V0UGFnZUluZm9BbmRTZXREZWZhdWx0cyA9IHBhZ2VzID0+IHtcbiAgICAgIHRoaXMuZ2V0UGFnZUFuZEVkaXRJbmZvKHBhZ2VzKS50aGVuKHBhZ2VJbmZvID0+IHtcbiAgICAgICAgdGhpcy5pbml0aWFsUXVlcnkgPSB0cnVlO1xuICAgICAgICBjb25zdCBub3JtYWxpemVkUGFnZU5hbWVzID0gT2JqZWN0LmtleXMocGFnZUluZm8pO1xuICAgICAgICB0aGlzLnNldFNlbGVjdDJEZWZhdWx0cyhcbiAgICAgICAgICB0aGlzLnVuZGVyc2NvcmVQYWdlTmFtZXMobm9ybWFsaXplZFBhZ2VOYW1lcylcbiAgICAgICAgKTtcbiAgICAgIH0pO1xuICAgIH07XG5cbiAgICAvLyBzZXQgdXAgZGVmYXVsdCBwYWdlcyBpZiBub25lIHdlcmUgcGFzc2VkIGluXG4gICAgaWYgKCFwYXJhbXMucGFnZXMgfHwgIXBhcmFtcy5wYWdlcy5sZW5ndGgpIHtcbiAgICAgIC8vIG9ubHkgc2V0IGRlZmF1bHQgb2YgQ2F0IGFuZCBEb2cgZm9yIGVud2lraVxuICAgICAgaWYgKHRoaXMucHJvamVjdCA9PT0gJ2VuLndpa2lwZWRpYScpIHtcbiAgICAgICAgcGFyYW1zLnBhZ2VzID0gWydDYXQnLCAnRG9nJ107XG4gICAgICAgIHRoaXMuc2V0SW5pdGlhbENoYXJ0VHlwZShwYXJhbXMucGFnZXMubGVuZ3RoKTtcbiAgICAgICAgZ2V0UGFnZUluZm9BbmRTZXREZWZhdWx0cyhwYXJhbXMucGFnZXMpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gbGVhdmUgU2VsZWN0MiBlbXB0eSBhbmQgcHV0IGZvY3VzIG9uIGl0IHNvIHRoZXkgY2FuIHR5cGUgaW4gcGFnZXNcbiAgICAgICAgdGhpcy5mb2N1c1NlbGVjdDIoKTtcbiAgICAgICAgLy8gbWFudWFsbHkgaGlkZSBzcGlubnkgc2luY2Ugd2UgYXJlbid0IGRyYXdpbmcgdGhlIGNoYXJ0LFxuICAgICAgICAvLyBhZ2FpbiB1c2luZyBzZXRUaW1lb3V0IHRvIGxldCBldmVyeXRoaW5nIGNhdGNoIHVwXG4gICAgICAgIHNldFRpbWVvdXQodGhpcy5zdG9wU3Bpbm55LmJpbmQodGhpcykpO1xuICAgICAgICB0aGlzLnNldEluaXRpYWxDaGFydFR5cGUoKTtcbiAgICAgIH1cbiAgICAvLyBJZiB0aGVyZSdzIG1vcmUgdGhhbiAxMCBhcnRpY2xlcyBhdHRlbXB0IHRvIGNyZWF0ZSBhIFBhZ2VQaWxlIGFuZCBvcGVuIGl0IGluIE1hc3N2aWV3c1xuICAgIH0gZWxzZSBpZiAocGFyYW1zLnBhZ2VzLmxlbmd0aCA+IDEwKSB7XG4gICAgICAvLyBJZiBhIFBhZ2VQaWxlIGlzIHN1Y2Nlc3NmdWxseSBjcmVhdGVkIHdlIGFyZSByZWRpcmVjdGVkIHRvIE1hc3N2aWV3cyBhbmQgdGhlIHByb21pc2UgaXMgbmV2ZXIgcmVzb2x2ZWQsXG4gICAgICAvLyAgIG90aGVyd2lzZSB3ZSBqdXN0IHRha2UgdGhlIGZpcnN0IDEwIGFuZCBwcm9jZXNzIGFzIHdlIHdvdWxkIG5vcm1hbGx5XG4gICAgICB0aGlzLm1hc3N2aWV3c1JlZGlyZWN0V2l0aFBhZ2VQaWxlKHBhcmFtcy5wYWdlcykudGhlbihnZXRQYWdlSW5mb0FuZFNldERlZmF1bHRzKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5zZXRJbml0aWFsQ2hhcnRUeXBlKHBhcmFtcy5wYWdlcy5sZW5ndGgpO1xuICAgICAgZ2V0UGFnZUluZm9BbmRTZXREZWZhdWx0cyhwYXJhbXMucGFnZXMpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBQcm9jZXNzZXMgTWVkaWF3aWtpIEFQSSByZXN1bHRzIGludG8gU2VsZWN0MiBmb3JtYXQgYmFzZWQgb24gc2V0dGluZ3NcbiAgICogQHBhcmFtIHtPYmplY3R9IGRhdGEgLSBkYXRhIGFzIHJlY2VpdmVkIGZyb20gdGhlIEFQSVxuICAgKiBAcmV0dXJucyB7T2JqZWN0fSBkYXRhIHJlYWR5IHRvIGhhbmRlZCBvdmVyIHRvIFNlbGVjdDJcbiAgICovXG4gIHByb2Nlc3NTZWFyY2hSZXN1bHRzKGRhdGEpIHtcbiAgICBjb25zdCBxdWVyeSA9IGRhdGEgPyBkYXRhLnF1ZXJ5IDoge307XG4gICAgbGV0IHJlc3VsdHMgPSBbXTtcblxuICAgIGlmICghcXVlcnkpIHJldHVybiB7cmVzdWx0c307XG5cbiAgICBpZiAodGhpcy5hdXRvY29tcGxldGUgPT09ICdhdXRvY29tcGxldGUnKSB7XG4gICAgICBpZiAocXVlcnkucHJlZml4c2VhcmNoLmxlbmd0aCkge1xuICAgICAgICByZXN1bHRzID0gcXVlcnkucHJlZml4c2VhcmNoLm1hcChmdW5jdGlvbihlbGVtKSB7XG4gICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGlkOiBlbGVtLnRpdGxlLnNjb3JlKCksXG4gICAgICAgICAgICB0ZXh0OiBlbGVtLnRpdGxlXG4gICAgICAgICAgfTtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmICh0aGlzLmF1dG9jb21wbGV0ZSA9PT0gJ2F1dG9jb21wbGV0ZV9yZWRpcmVjdHMnKSB7XG4gICAgICAvKiogZmlyc3QgbWVyZ2UgaW4gcmVkaXJlY3RzICovXG4gICAgICBpZiAocXVlcnkucmVkaXJlY3RzKSB7XG4gICAgICAgIHJlc3VsdHMgPSBxdWVyeS5yZWRpcmVjdHMubWFwKHJlZCA9PiB7XG4gICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGlkOiByZWQuZnJvbS5zY29yZSgpLFxuICAgICAgICAgICAgdGV4dDogcmVkLmZyb21cbiAgICAgICAgICB9O1xuICAgICAgICB9KTtcbiAgICAgIH1cblxuICAgICAgT2JqZWN0LmtleXMocXVlcnkucGFnZXMpLmZvckVhY2gocGFnZUlkID0+IHtcbiAgICAgICAgY29uc3QgcGFnZURhdGEgPSBxdWVyeS5wYWdlc1twYWdlSWRdO1xuICAgICAgICByZXN1bHRzLnB1c2goe1xuICAgICAgICAgIGlkOiBwYWdlRGF0YS50aXRsZS5zY29yZSgpLFxuICAgICAgICAgIHRleHQ6IHBhZ2VEYXRhLnRpdGxlXG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHtyZXN1bHRzOiByZXN1bHRzfTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgYWxsIHVzZXItaW5wdXR0ZWQgcGFyYW1ldGVycyBleGNlcHQgdGhlIHBhZ2VzXG4gICAqIEBwYXJhbSB7Ym9vbGVhbn0gW3NwZWNpYWxSYW5nZV0gd2hldGhlciBvciBub3QgdG8gaW5jbHVkZSB0aGUgc3BlY2lhbCByYW5nZSBpbnN0ZWFkIG9mIHN0YXJ0L2VuZCwgaWYgYXBwbGljYWJsZVxuICAgKiBAcmV0dXJuIHtPYmplY3R9IHByb2plY3QsIHBsYXRmb3JtLCBhZ2VudCwgZXRjLlxuICAgKi9cbiAgZ2V0UGFyYW1zKHNwZWNpYWxSYW5nZSA9IHRydWUpIHtcbiAgICBsZXQgcGFyYW1zID0ge1xuICAgICAgcHJvamVjdDogJCh0aGlzLmNvbmZpZy5wcm9qZWN0SW5wdXQpLnZhbCgpLFxuICAgICAgcGxhdGZvcm06ICQodGhpcy5jb25maWcucGxhdGZvcm1TZWxlY3RvcikudmFsKCksXG4gICAgICBhZ2VudDogJCh0aGlzLmNvbmZpZy5hZ2VudFNlbGVjdG9yKS52YWwoKVxuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBPdmVycmlkZSBzdGFydCBhbmQgZW5kIHdpdGggY3VzdG9tIHJhbmdlIHZhbHVlcywgaWYgY29uZmlndXJlZCAoc2V0IGJ5IFVSTCBwYXJhbXMgb3Igc2V0dXBEYXRlUmFuZ2VTZWxlY3RvcilcbiAgICAgKiBWYWxpZCB2YWx1ZXMgYXJlIHRob3NlIGRlZmluZWQgaW4gY29uZmlnLnNwZWNpYWxSYW5nZXMsIGNvbnN0cnVjdGVkIGxpa2UgYHtyYW5nZTogJ2xhc3QtbW9udGgnfWAsXG4gICAgICogICBvciBhIHJlbGF0aXZlIHJhbmdlIGxpa2UgYHtyYW5nZTogJ2xhdGVzdC1OJ31gIHdoZXJlIE4gaXMgdGhlIG51bWJlciBvZiBkYXlzLlxuICAgICAqL1xuICAgIGlmICh0aGlzLnNwZWNpYWxSYW5nZSAmJiBzcGVjaWFsUmFuZ2UpIHtcbiAgICAgIHBhcmFtcy5yYW5nZSA9IHRoaXMuc3BlY2lhbFJhbmdlLnJhbmdlO1xuICAgIH0gZWxzZSB7XG4gICAgICBwYXJhbXMuc3RhcnQgPSB0aGlzLmRhdGVyYW5nZXBpY2tlci5zdGFydERhdGUuZm9ybWF0KCdZWVlZLU1NLUREJyk7XG4gICAgICBwYXJhbXMuZW5kID0gdGhpcy5kYXRlcmFuZ2VwaWNrZXIuZW5kRGF0ZS5mb3JtYXQoJ1lZWVktTU0tREQnKTtcbiAgICB9XG5cbiAgICAvKiogYWRkIGF1dG9sb2cgcGFyYW0gb25seSBpZiBpdCB3YXMgcGFzc2VkIGluIG9yaWdpbmFsbHksIGFuZCBvbmx5IGlmIGl0IHdhcyBmYWxzZSAodHJ1ZSB3b3VsZCBiZSBkZWZhdWx0KSAqL1xuICAgIGlmICh0aGlzLm5vTG9nU2NhbGUpIHBhcmFtcy5hdXRvbG9nID0gJ2ZhbHNlJztcblxuICAgIHJldHVybiBwYXJhbXM7XG4gIH1cblxuICAvKipcbiAgICogUmVwbGFjZXMgaGlzdG9yeSBzdGF0ZSB3aXRoIG5ldyBVUkwgcXVlcnkgc3RyaW5nIHJlcHJlc2VudGluZyBjdXJyZW50IHVzZXIgaW5wdXRcbiAgICogQ2FsbGVkIHdoZW5ldmVyIHdlIGdvIHRvIHVwZGF0ZSB0aGUgY2hhcnRcbiAgICogQHJldHVybnMge251bGx9IG5vdGhpbmdcbiAgICovXG4gIHB1c2hQYXJhbXMoKSB7XG4gICAgY29uc3QgcGFnZXMgPSAkKHRoaXMuY29uZmlnLnNlbGVjdDJJbnB1dCkuc2VsZWN0MigndmFsJykgfHwgW10sXG4gICAgICBlc2NhcGVkUGFnZXMgPSBwYWdlcy5qb2luKCd8JykucmVwbGFjZSgvWyYlXS9nLCBlc2NhcGUpO1xuXG4gICAgaWYgKHdpbmRvdy5oaXN0b3J5ICYmIHdpbmRvdy5oaXN0b3J5LnJlcGxhY2VTdGF0ZSkge1xuICAgICAgd2luZG93Lmhpc3RvcnkucmVwbGFjZVN0YXRlKHt9LCBkb2N1bWVudC50aXRsZSxcbiAgICAgICAgYD8keyQucGFyYW0odGhpcy5nZXRQYXJhbXMoKSl9JnBhZ2VzPSR7ZXNjYXBlZFBhZ2VzfWBcbiAgICAgICk7XG4gICAgfVxuXG4gICAgJCgnLnBlcm1hbGluaycpLnByb3AoJ2hyZWYnLCBgPyR7JC5wYXJhbSh0aGlzLmdldFBlcm1hTGluaygpKX0mcGFnZXM9JHtlc2NhcGVkUGFnZXN9YCk7XG4gIH1cblxuICAvKipcbiAgICogU2V0cyB1cCB0aGUgYXJ0aWNsZSBzZWxlY3RvciBhbmQgYWRkcyBsaXN0ZW5lciB0byB1cGRhdGUgY2hhcnRcbiAgICogQHJldHVybnMge251bGx9IC0gbm90aGluZ1xuICAgKi9cbiAgc2V0dXBTZWxlY3QyKCkge1xuICAgIGNvbnN0ICRzZWxlY3QySW5wdXQgPSAkKHRoaXMuY29uZmlnLnNlbGVjdDJJbnB1dCk7XG5cbiAgICBsZXQgcGFyYW1zID0ge1xuICAgICAgYWpheDogdGhpcy5nZXRBcnRpY2xlU2VsZWN0b3JBamF4KCksXG4gICAgICB0YWdzOiB0aGlzLmF1dG9jb21wbGV0ZSA9PT0gJ25vX2F1dG9jb21wbGV0ZScsXG4gICAgICBwbGFjZWhvbGRlcjogJC5pMThuKCdhcnRpY2xlLXBsYWNlaG9sZGVyJyksXG4gICAgICBtYXhpbXVtU2VsZWN0aW9uTGVuZ3RoOiAxMCxcbiAgICAgIG1pbmltdW1JbnB1dExlbmd0aDogMVxuICAgIH07XG5cbiAgICAkc2VsZWN0MklucHV0LnNlbGVjdDIocGFyYW1zKTtcbiAgICAkc2VsZWN0MklucHV0Lm9uKCdjaGFuZ2UnLCB0aGlzLnByb2Nlc3NJbnB1dC5iaW5kKHRoaXMpKTtcbiAgICAkc2VsZWN0MklucHV0Lm9uKCdzZWxlY3QyOm9wZW4nLCBlID0+IHtcbiAgICAgIGlmICgkKGUudGFyZ2V0KS52YWwoKSAmJiAkKGUudGFyZ2V0KS52YWwoKS5sZW5ndGggPT09IDEwKSB7XG4gICAgICAgICQoJy5zZWxlY3QyLXNlYXJjaF9fZmllbGQnKS5vbmUoJ2tleXVwJywgKCkgPT4ge1xuICAgICAgICAgIGNvbnN0IG1lc3NhZ2UgPSAkLmkxOG4oXG4gICAgICAgICAgICAnbWFzc3ZpZXdzLW5vdGljZScsXG4gICAgICAgICAgICAxMCxcbiAgICAgICAgICAgIGA8c3Ryb25nPjxhIGhyZWY9Jy9tYXNzdmlld3MvJz4keyQuaTE4bignbWFzc3ZpZXdzJyl9PC9hPjwvc3Ryb25nPmBcbiAgICAgICAgICApO1xuICAgICAgICAgIHRoaXMud3JpdGVNZXNzYWdlKG1lc3NhZ2UsICdpbmZvJywgMTAwMDApO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgYWpheCBwYXJhbWV0ZXJzIHRvIGJlIHVzZWQgaW4gc2V0dXBTZWxlY3QyLCBiYXNlZCBvbiB0aGlzLmF1dG9jb21wbGV0ZVxuICAgKiBAcmV0dXJuIHtvYmplY3R8bnVsbH0gdG8gYmUgcGFzc2VkIGluIGFzIHRoZSB2YWx1ZSBmb3IgYGFqYXhgIGluIHNldHVwU2VsZWN0MlxuICAgKi9cbiAgZ2V0QXJ0aWNsZVNlbGVjdG9yQWpheCgpIHtcbiAgICBpZiAodGhpcy5hdXRvY29tcGxldGUgIT09ICdub19hdXRvY29tcGxldGUnKSB7XG4gICAgICAvKipcbiAgICAgICAqIFRoaXMgYWpheCBjYWxsIHF1ZXJpZXMgdGhlIE1lZGlhd2lraSBBUEkgZm9yIGFydGljbGUgbmFtZVxuICAgICAgICogc3VnZ2VzdGlvbnMgZ2l2ZW4gdGhlIHNlYXJjaCB0ZXJtIGlucHV0ZWQgaW4gdGhlIHNlbGVjdG9yLlxuICAgICAgICogV2UgdWx0aW1hdGVseSB3YW50IHRvIG1ha2UgdGhlIGVuZHBvaW50IGNvbmZpZ3VyYWJsZSBiYXNlZCBvbiB3aGV0aGVyIHRoZXkgd2FudCByZWRpcmVjdHNcbiAgICAgICAqL1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgdXJsOiBgaHR0cHM6Ly8ke3RoaXMucHJvamVjdH0ub3JnL3cvYXBpLnBocGAsXG4gICAgICAgIGRhdGFUeXBlOiAnanNvbnAnLFxuICAgICAgICBkZWxheTogMjAwLFxuICAgICAgICBqc29ucENhbGxiYWNrOiAnYXJ0aWNsZVN1Z2dlc3Rpb25DYWxsYmFjaycsXG4gICAgICAgIGRhdGE6IHNlYXJjaCA9PiB0aGlzLmdldFNlYXJjaFBhcmFtcyhzZWFyY2gudGVybSksXG4gICAgICAgIHByb2Nlc3NSZXN1bHRzOiB0aGlzLnByb2Nlc3NTZWFyY2hSZXN1bHRzLmJpbmQodGhpcyksXG4gICAgICAgIGNhY2hlOiB0cnVlXG4gICAgICB9O1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQ2FsbHMgcGFyZW50IHNldHVwUHJvamVjdElucHV0IGFuZCB1cGRhdGVzIHRoZSB2aWV3IGlmIHZhbGlkYXRpb25zIHBhc3NlZFxuICAgKiAgIHJldmVydGluZyB0byB0aGUgb2xkIHZhbHVlIGlmIHRoZSBuZXcgb25lIGlzIGludmFsaWRcbiAgICogQHJldHVybnMge251bGx9IG5vdGhpbmdcbiAgICogQG92ZXJyaWRlXG4gICAqL1xuICB2YWxpZGF0ZVByb2plY3QoKSB7XG4gICAgaWYgKHN1cGVyLnZhbGlkYXRlUHJvamVjdCgpKSB7XG4gICAgICB0aGlzLnJlc2V0Vmlldyh0cnVlKTtcbiAgICAgIHRoaXMuZm9jdXNTZWxlY3QyKCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEdlbmVyYWwgcGxhY2UgdG8gYWRkIHBhZ2Utd2lkZSBsaXN0ZW5lcnNcbiAgICogQG92ZXJyaWRlXG4gICAqIEByZXR1cm5zIHtudWxsfSAtIG5vdGhpbmdcbiAgICovXG4gIHNldHVwTGlzdGVuZXJzKCkge1xuICAgIHN1cGVyLnNldHVwTGlzdGVuZXJzKCk7XG4gICAgJCgnI3BsYXRmb3JtLXNlbGVjdCwgI2FnZW50LXNlbGVjdCcpLm9uKCdjaGFuZ2UnLCB0aGlzLnByb2Nlc3NJbnB1dC5iaW5kKHRoaXMpKTtcbiAgICAkKCcuc29ydC1saW5rJykub24oJ2NsaWNrJywgZSA9PiB7XG4gICAgICBjb25zdCBzb3J0VHlwZSA9ICQoZS5jdXJyZW50VGFyZ2V0KS5kYXRhKCd0eXBlJyk7XG4gICAgICB0aGlzLmRpcmVjdGlvbiA9IHRoaXMuc29ydCA9PT0gc29ydFR5cGUgPyAtdGhpcy5kaXJlY3Rpb24gOiAxO1xuICAgICAgdGhpcy5zb3J0ID0gc29ydFR5cGU7XG4gICAgICB0aGlzLnVwZGF0ZVRhYmxlKCk7XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogUXVlcnkgdGhlIEFQSSBmb3IgZWFjaCBwYWdlLCBidWlsZGluZyB1cCB0aGUgZGF0YXNldHMgYW5kIHRoZW4gY2FsbGluZyByZW5kZXJEYXRhXG4gICAqIEBwYXJhbSB7Ym9vbGVhbn0gZm9yY2UgLSB3aGV0aGVyIHRvIGZvcmNlIHRoZSBjaGFydCB0byByZS1yZW5kZXIsIGV2ZW4gaWYgbm8gcGFyYW1zIGhhdmUgY2hhbmdlZFxuICAgKiBAcmV0dXJucyB7bnVsbH0gLSBub3RoaW5cbiAgICovXG4gIHByb2Nlc3NJbnB1dChmb3JjZSkge1xuICAgIHRoaXMucHVzaFBhcmFtcygpO1xuXG4gICAgLyoqIHByZXZlbnQgZHVwbGljYXRlIHF1ZXJ5aW5nIGR1ZSB0byBjb25mbGljdGluZyBsaXN0ZW5lcnMgKi9cbiAgICBpZiAoIWZvcmNlICYmIChsb2NhdGlvbi5zZWFyY2ggPT09IHRoaXMucGFyYW1zICYmIHRoaXMucHJldkNoYXJ0VHlwZSA9PT0gdGhpcy5jaGFydFR5cGUpKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdGhpcy5wYXJhbXMgPSBsb2NhdGlvbi5zZWFyY2g7XG5cbiAgICBjb25zdCBlbnRpdGllcyA9ICQoY29uZmlnLnNlbGVjdDJJbnB1dCkuc2VsZWN0MigndmFsJykgfHwgW107XG5cbiAgICBpZiAoIWVudGl0aWVzLmxlbmd0aCkge1xuICAgICAgcmV0dXJuIHRoaXMucmVzZXRWaWV3KCk7XG4gICAgfVxuXG4gICAgdGhpcy5zZXRJbml0aWFsQ2hhcnRUeXBlKGVudGl0aWVzLmxlbmd0aCk7XG5cbiAgICAvLyBjbGVhciBvdXQgb2xkIGVycm9yIG1lc3NhZ2VzIHVubGVzcyB0aGUgaXMgdGhlIGZpcnN0IHRpbWUgcmVuZGVyaW5nIHRoZSBjaGFydFxuICAgIHRoaXMuY2xlYXJNZXNzYWdlcygpO1xuXG4gICAgdGhpcy5wcmV2Q2hhcnRUeXBlID0gdGhpcy5jaGFydFR5cGU7XG4gICAgdGhpcy5kZXN0cm95Q2hhcnQoKTtcbiAgICB0aGlzLnN0YXJ0U3Bpbm55KCk7IC8vIHNob3cgc3Bpbm55IGFuZCBjYXB0dXJlIGFnYWluc3QgZmF0YWwgZXJyb3JzXG5cbiAgICAvLyBXZSd2ZSBhbHJlYWR5IGdvdHRlbiBkYXRhIGFib3V0IHRoZSBpbnRpYWwgc2V0IG9mIHBhZ2VzXG4gICAgLy8gVGhpcyBpcyBiZWNhdXNlIHdlIG5lZWQgYW55IHBhZ2UgbmFtZXMgZ2l2ZW4gdG8gYmUgbm9ybWFsaXplZCB3aGVuIHRoZSBhcHAgZmlyc3QgbG9hZHNcbiAgICBpZiAodGhpcy5pbml0aWFsUXVlcnkpIHtcbiAgICAgIHRoaXMuZ2V0UGFnZVZpZXdzRGF0YShlbnRpdGllcykuZG9uZSh4aHJEYXRhID0+IHRoaXMudXBkYXRlQ2hhcnQoeGhyRGF0YSkpO1xuICAgICAgLy8gc2V0IGJhY2sgdG8gZmFsc2Ugc28gd2UgZ2V0IHBhZ2UgYW5kIGVkaXQgaW5mbyBmb3IgYW55IG5ld2x5IGVudGVyZWQgcGFnZXNcbiAgICAgIHRoaXMuaW5pdGlhbFF1ZXJ5ID0gZmFsc2U7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuZ2V0UGFnZUFuZEVkaXRJbmZvKGVudGl0aWVzKS50aGVuKCgpID0+IHtcbiAgICAgICAgdGhpcy5nZXRQYWdlVmlld3NEYXRhKGVudGl0aWVzKS5kb25lKHhockRhdGEgPT4gdGhpcy51cGRhdGVDaGFydCh4aHJEYXRhKSk7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICB1cGRhdGVUYWJsZSgpIHtcbiAgICBpZiAodGhpcy5vdXRwdXREYXRhLmxlbmd0aCA9PT0gMSkgcmV0dXJuICQoJy50YWJsZS12aWV3JykuaGlkZSgpO1xuXG4gICAgJCgnLm91dHB1dC1saXN0JykuaHRtbCgnJyk7XG5cbiAgICAvKiogc29ydCBhc2NlbmRpbmcgYnkgY3VycmVudCBzb3J0IHNldHRpbmcgKi9cbiAgICBjb25zdCBkYXRhc2V0cyA9IHRoaXMub3V0cHV0RGF0YS5zb3J0KChhLCBiKSA9PiB7XG4gICAgICBjb25zdCBiZWZvcmUgPSB0aGlzLmdldFNvcnRQcm9wZXJ0eShhLCB0aGlzLnNvcnQpLFxuICAgICAgICBhZnRlciA9IHRoaXMuZ2V0U29ydFByb3BlcnR5KGIsIHRoaXMuc29ydCk7XG5cbiAgICAgIGlmIChiZWZvcmUgPCBhZnRlcikge1xuICAgICAgICByZXR1cm4gdGhpcy5kaXJlY3Rpb247XG4gICAgICB9IGVsc2UgaWYgKGJlZm9yZSA+IGFmdGVyKSB7XG4gICAgICAgIHJldHVybiAtdGhpcy5kaXJlY3Rpb247XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gMDtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgICQoJy5zb3J0LWxpbmsgc3BhbicpLnJlbW92ZUNsYXNzKCdnbHlwaGljb24tc29ydC1ieS1hbHBoYWJldC1hbHQgZ2x5cGhpY29uLXNvcnQtYnktYWxwaGFiZXQnKS5hZGRDbGFzcygnZ2x5cGhpY29uLXNvcnQnKTtcbiAgICBjb25zdCBuZXdTb3J0Q2xhc3NOYW1lID0gcGFyc2VJbnQodGhpcy5kaXJlY3Rpb24sIDEwKSA9PT0gMSA/ICdnbHlwaGljb24tc29ydC1ieS1hbHBoYWJldC1hbHQnIDogJ2dseXBoaWNvbi1zb3J0LWJ5LWFscGhhYmV0JztcbiAgICAkKGAuc29ydC1saW5rLS0ke3RoaXMuc29ydH0gc3BhbmApLmFkZENsYXNzKG5ld1NvcnRDbGFzc05hbWUpLnJlbW92ZUNsYXNzKCdnbHlwaGljb24tc29ydCcpO1xuXG4gICAgbGV0IGhhc1Byb3RlY3Rpb24gPSBmYWxzZTtcbiAgICBkYXRhc2V0cy5mb3JFYWNoKChpdGVtLCBpbmRleCkgPT4ge1xuICAgICAgaWYgKGl0ZW0ucHJvdGVjdGlvbiAhPT0gJC5pMThuKCdub25lJykpIGhhc1Byb3RlY3Rpb24gPSB0cnVlO1xuXG4gICAgICAkKCcub3V0cHV0LWxpc3QnKS5hcHBlbmQoXG4gICAgICAgIGA8dHI+XG4gICAgICAgICA8dGQgY2xhc3M9J3RhYmxlLXZpZXctLWNvbG9yLWNvbCc+XG4gICAgICAgICAgPHNwYW4gY2xhc3M9J3RhYmxlLXZpZXctLWNvbG9yLWJsb2NrJyBzdHlsZT1cImJhY2tncm91bmQ6JHtpdGVtLmNvbG9yfVwiPjwvc3Bhbj5cbiAgICAgICAgIDwvdGQ+XG4gICAgICAgICA8dGQ+JHt0aGlzLmdldFBhZ2VMaW5rKGl0ZW0ubGFiZWwpfTwvdGQ+XG4gICAgICAgICA8dGQ+JHt0aGlzLmZvcm1hdE51bWJlcihpdGVtLnN1bSl9PC90ZD5cbiAgICAgICAgIDx0ZD4ke3RoaXMuZm9ybWF0TnVtYmVyKGl0ZW0uYXZlcmFnZSl9PC90ZD5cbiAgICAgICAgIDx0ZD4ke3RoaXMuZm9ybWF0TnVtYmVyKGl0ZW0ubnVtX2VkaXRzKX08L3RkPlxuICAgICAgICAgPHRkPiR7dGhpcy5mb3JtYXROdW1iZXIoaXRlbS5udW1fdXNlcnMpfTwvdGQ+XG4gICAgICAgICA8dGQ+JHt0aGlzLmZvcm1hdE51bWJlcihpdGVtLmxlbmd0aCl9PC90ZD5cbiAgICAgICAgIDx0ZD4ke2l0ZW0ucHJvdGVjdGlvbn08L3RkPlxuICAgICAgICAgPHRkPiR7dGhpcy5mb3JtYXROdW1iZXIoaXRlbS53YXRjaGVycyl9PC90ZD5cbiAgICAgICAgIDx0ZD5cbiAgICAgICAgICA8YSBocmVmPVwiJHt0aGlzLmdldExhbmd2aWV3c1VSTChpdGVtLmxhYmVsKX1cIiB0YXJnZXQ9XCJfYmxhbmtcIj4keyQuaTE4bignYWxsLWxhbmd1YWdlcycpfTwvYT5cbiAgICAgICAgICAmYnVsbDtcbiAgICAgICAgICA8YSBocmVmPVwiJHt0aGlzLmdldFJlZGlyZWN0dmlld3NVUkwoaXRlbS5sYWJlbCl9XCIgdGFyZ2V0PVwiX2JsYW5rXCI+JHskLmkxOG4oJ3JlZGlyZWN0cycpfTwvYT5cbiAgICAgICAgIDwvdGQ+XG4gICAgICAgICA8L3RyPmBcbiAgICAgICk7XG4gICAgfSk7XG5cbiAgICAvLyBoaWRlIHByb3RlY3Rpb24gY29sdW1uIGlmIG5vIHBhZ2VzIGFyZSBwcm90ZWN0ZWRcbiAgICAkKCcudGFibGUtdmlldy0tcHJvdGVjdGlvbicpLnRvZ2dsZShoYXNQcm90ZWN0aW9uKTtcblxuICAgICQoJy50YWJsZS12aWV3Jykuc2hvdygpO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCB2YWx1ZSBvZiBnaXZlbiBwYWdlIGZvciB0aGUgcHVycG9zZXMgb2YgY29sdW1uIHNvcnRpbmcgaW4gdGFibGUgdmlld1xuICAgKiBAcGFyYW0gIHtvYmplY3R9IGl0ZW0gLSBwYWdlIG5hbWVcbiAgICogQHBhcmFtICB7U3RyaW5nfSB0eXBlIC0gdHlwZSBvZiBwcm9wZXJ0eSB0byBnZXRcbiAgICogQHJldHVybiB7U3RyaW5nfE51bWJlcn0gLSB2YWx1ZVxuICAgKi9cbiAgZ2V0U29ydFByb3BlcnR5KGl0ZW0sIHR5cGUpIHtcbiAgICBzd2l0Y2ggKHR5cGUpIHtcbiAgICBjYXNlICd0aXRsZSc6XG4gICAgICByZXR1cm4gaXRlbS5sYWJlbDtcbiAgICBjYXNlICd2aWV3cyc6XG4gICAgICByZXR1cm4gTnVtYmVyKGl0ZW0uc3VtKTtcbiAgICBjYXNlICdhdmVyYWdlJzpcbiAgICAgIHJldHVybiBOdW1iZXIoaXRlbS5hdmVyYWdlKTtcbiAgICBjYXNlICdlZGl0cyc6XG4gICAgICByZXR1cm4gTnVtYmVyKGl0ZW0ubnVtX2VkaXRzKTtcbiAgICBjYXNlICdlZGl0b3JzJzpcbiAgICAgIHJldHVybiBOdW1iZXIoaXRlbS5udW1fdXNlcnMpO1xuICAgIGNhc2UgJ3NpemUnOlxuICAgICAgcmV0dXJuIE51bWJlcihpdGVtLmxlbmd0aCk7XG4gICAgY2FzZSAnd2F0Y2hlcnMnOlxuICAgICAgcmV0dXJuIE51bWJlcihpdGVtLndhdGNoZXJzKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogR2V0IHBhZ2UgaW5mbyBhbmQgZWRpdGluZyBpbmZvIG9mIGdpdmVuIHBhZ2VzLlxuICAgKiBBbHNvIHNldHMgdGhpcy5lbnRpdHlJbmZvXG4gICAqIEBwYXJhbSAge0FycmF5fSBwYWdlcyAtIHBhZ2UgbmFtZXNcbiAgICogQHJldHVybiB7RGVmZXJyZWR9IFByb21pc2UgcmVzb2x2aW5nIHdpdGggdGhpcy5lbnRpdHlJbmZvXG4gICAqL1xuICBnZXRQYWdlQW5kRWRpdEluZm8ocGFnZXMpIHtcbiAgICBjb25zdCBkZmQgPSAkLkRlZmVycmVkKCk7XG5cbiAgICB0aGlzLmdldFBhZ2VJbmZvKHBhZ2VzKS5kb25lKGRhdGEgPT4ge1xuICAgICAgdGhpcy5lbnRpdHlJbmZvID0gZGF0YTtcbiAgICAgIC8vIHVzZSBPYmplY3Qua2V5cyhkYXRhKSB0byBnZXQgbm9ybWFsaXplZCBwYWdlIG5hbWVzXG4gICAgICB0aGlzLmdldEVkaXREYXRhKE9iamVjdC5rZXlzKGRhdGEpKS5kb25lKGVkaXREYXRhID0+IHtcbiAgICAgICAgZm9yIChsZXQgcGFnZSBpbiBlZGl0RGF0YS5wYWdlcykge1xuICAgICAgICAgIE9iamVjdC5hc3NpZ24odGhpcy5lbnRpdHlJbmZvW3BhZ2UuZGVzY29yZSgpXSwgZWRpdERhdGEucGFnZXNbcGFnZV0pO1xuICAgICAgICB9XG4gICAgICAgIGRmZC5yZXNvbHZlKHRoaXMuZW50aXR5SW5mbyk7XG4gICAgICB9KS5mYWlsKCgpID0+IHtcbiAgICAgICAgZGZkLnJlc29sdmUodGhpcy5lbnRpdHlJbmZvKTsgLy8gdHJlYXQgYXMgaWYgc3VjY2Vzc2Z1bCwgc2ltcGx5IHdvbid0IHNob3cgdGhlIGRhdGFcbiAgICAgIH0pO1xuICAgIH0pLmZhaWwoKCkgPT4ge1xuICAgICAgZGZkLnJlc29sdmUoe30pOyAvLyBzYW1lLCBzaW1wbHkgd29uJ3Qgc2hvdyB0aGUgZGF0YSBpZiBpdCBmYWlsZWRcbiAgICB9KTtcblxuICAgIHJldHVybiBkZmQ7XG4gIH1cblxuICAvKipcbiAgICogQ3JlYXRlIGEgUGFnZVBpbGUgd2l0aCBnaXZlbiBwYWdlcyB1c2luZyB0aGUgQVBJIGFuZCByZWRpcmVjdCB0byBNYXNzdmlld3MuXG4gICAqIFRoaXMgaXMgdXNlZCB3aGVuIHRoZSB1c2VyIHBhc3NlcyBpbiBtb3JlIHRoYW4gMTAgcGFnZXNcbiAgICogQHBhcmFtIHtBcnJheX0gcGFnZXMgLSBwYWdlcyB0byBjb252ZXJ0IHRvIGEgUGFnZVBpbGUgYW5kIG9wZW4gaW4gTWFzc3ZpZXdzXG4gICAqIEByZXR1cm5zIHtEZWZlcnJlZH0gcHJvbWlzZSByZXNvbHZlZCBvbmx5IGlmIGNyZWF0aW9uIG9mIFBhZ2VQaWxlIGZhaWxlZFxuICAgKi9cbiAgbWFzc3ZpZXdzUmVkaXJlY3RXaXRoUGFnZVBpbGUocGFnZXMpIHtcbiAgICBjb25zdCBkZmQgPSAkLkRlZmVycmVkKCk7XG5cbiAgICAkLmFqYXgoe1xuICAgICAgdXJsOiAnLy90b29scy53bWZsYWJzLm9yZy9wYWdlcGlsZS9hcGkucGhwJyxcbiAgICAgIGRhdGE6IHtcbiAgICAgICAgYWN0aW9uOiAnY3JlYXRlX3BpbGVfd2l0aF9kYXRhJyxcbiAgICAgICAgd2lraTogdGhpcy5kYk5hbWUodGhpcy5wcm9qZWN0KSxcbiAgICAgICAgZGF0YTogcGFnZXMuam9pbignXFxuJylcbiAgICAgIH1cbiAgICB9KS5zdWNjZXNzKHBpbGVEYXRhID0+IHtcbiAgICAgIGNvbnN0IHBhcmFtcyA9IHRoaXMuZ2V0UGFyYW1zKCk7XG4gICAgICBkZWxldGUgcGFyYW1zLnByb2plY3Q7XG4gICAgICBkb2N1bWVudC5sb2NhdGlvbiA9IGAvbWFzc3ZpZXdzP292ZXJmbG93PTEmJHskLnBhcmFtKHBhcmFtcyl9JnNvdXJjZT1wYWdlcGlsZSZ0YXJnZXQ9JHtwaWxlRGF0YS5waWxlLmlkfWA7XG4gICAgfSkuZmFpbCgoKSA9PiB7XG4gICAgICAvLyBqdXN0IGdyYWIgZmlyc3QgMTAgcGFnZXMgYW5kIHRocm93IGFuIGVycm9yXG4gICAgICB0aGlzLndyaXRlTWVzc2FnZShcbiAgICAgICAgJC5pMThuKCdhdXRvLXBhZ2VwaWxlLWVycm9yJywgJ1BhZ2VQaWxlJywgMTApLFxuICAgICAgICAnZXJyb3InXG4gICAgICApO1xuICAgICAgZGZkLnJlc29sdmUocGFnZXMuc2xpY2UoMCwgMTApKTtcbiAgICB9KTtcblxuICAgIHJldHVybiBkZmQ7XG4gIH1cbn1cblxuJChkb2N1bWVudCkucmVhZHkoKCkgPT4ge1xuICAvKiogYXNzdW1lIGhhc2ggcGFyYW1zIGFyZSBzdXBwb3NlZCB0byBiZSBxdWVyeSBwYXJhbXMgKi9cbiAgaWYgKGRvY3VtZW50LmxvY2F0aW9uLmhhc2ggJiYgIWRvY3VtZW50LmxvY2F0aW9uLnNlYXJjaCkge1xuICAgIHJldHVybiBkb2N1bWVudC5sb2NhdGlvbi5ocmVmID0gZG9jdW1lbnQubG9jYXRpb24uaHJlZi5yZXBsYWNlKCcjJywgJz8nKTtcbiAgfSBlbHNlIGlmIChkb2N1bWVudC5sb2NhdGlvbi5oYXNoKSB7XG4gICAgcmV0dXJuIGRvY3VtZW50LmxvY2F0aW9uLmhyZWYgPSBkb2N1bWVudC5sb2NhdGlvbi5ocmVmLnJlcGxhY2UoL1xcIy4qLywgJycpO1xuICB9XG5cbiAgbmV3IFBhZ2VWaWV3cygpO1xufSk7XG4iLCIvKipcbiAqIEBmaWxlIFNoYXJlZCBjaGFydC1zcGVjaWZpYyBsb2dpY1xuICogQGF1dGhvciBNdXNpa0FuaW1hbFxuICogQGNvcHlyaWdodCAyMDE2IE11c2lrQW5pbWFsXG4gKiBAbGljZW5zZSBNSVQgTGljZW5zZTogaHR0cHM6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9NSVRcbiAqL1xuXG4vKipcbiAqIFNoYXJlZCBjaGFydC1zcGVjaWZpYyBsb2dpYywgdXNlZCBpbiBhbGwgYXBwcyBleGNlcHQgVG9wdmlld3NcbiAqIEBwYXJhbSB7Y2xhc3N9IHN1cGVyY2xhc3MgLSBiYXNlIGNsYXNzXG4gKiBAcmV0dXJucyB7bnVsbH0gY2xhc3MgZXh0ZW5kaW5nIHN1cGVyY2xhc3NcbiAqL1xuY29uc3QgQ2hhcnRIZWxwZXJzID0gc3VwZXJjbGFzcyA9PiBjbGFzcyBleHRlbmRzIHN1cGVyY2xhc3Mge1xuICBjb25zdHJ1Y3RvcihhcHBDb25maWcpIHtcbiAgICBzdXBlcihhcHBDb25maWcpO1xuXG4gICAgdGhpcy5jaGFydE9iaiA9IG51bGw7XG4gICAgdGhpcy5wcmV2Q2hhcnRUeXBlID0gbnVsbDtcbiAgICB0aGlzLmF1dG9DaGFydFR5cGUgPSB0cnVlOyAvLyB3aWxsIGJlY29tZSBmYWxzZSB3aGVuIHRoZXkgbWFudWFsbHkgY2hhbmdlIHRoZSBjaGFydCB0eXBlXG5cbiAgICAvKiogZW5zdXJlIHdlIGhhdmUgYSB2YWxpZCBjaGFydCB0eXBlIGluIGxvY2FsU3RvcmFnZSwgcmVzdWx0IG9mIENoYXJ0LmpzIDEuMCB0byAyLjAgbWlncmF0aW9uICovXG4gICAgY29uc3Qgc3RvcmVkQ2hhcnRUeXBlID0gdGhpcy5nZXRGcm9tTG9jYWxTdG9yYWdlKCdwYWdldmlld3MtY2hhcnQtcHJlZmVyZW5jZScpO1xuICAgIGlmICghdGhpcy5jb25maWcubGluZWFyQ2hhcnRzLmluY2x1ZGVzKHN0b3JlZENoYXJ0VHlwZSkgJiYgIXRoaXMuY29uZmlnLmNpcmN1bGFyQ2hhcnRzLmluY2x1ZGVzKHN0b3JlZENoYXJ0VHlwZSkpIHtcbiAgICAgIHRoaXMuc2V0TG9jYWxTdG9yYWdlKCdwYWdldmlld3MtY2hhcnQtcHJlZmVyZW5jZScsIHRoaXMuY29uZmlnLmRlZmF1bHRzLmNoYXJ0VHlwZSgpKTtcbiAgICB9XG5cbiAgICAvLyBsZWF2ZSBpZiB0aGVyZSdzIG5vIGNoYXJ0IGNvbmZpZ3VyZWRcbiAgICBpZiAoIXRoaXMuY29uZmlnLmNoYXJ0KSByZXR1cm47XG5cbiAgICAvKiogQHR5cGUge0Jvb2xlYW59IGFkZCBhYmlsaXR5IHRvIGRpc2FibGUgYXV0by1sb2cgZGV0ZWN0aW9uICovXG4gICAgdGhpcy5ub0xvZ1NjYWxlID0gbG9jYXRpb24uc2VhcmNoLmluY2x1ZGVzKCdhdXRvbG9nPWZhbHNlJyk7XG5cbiAgICAvKiogY29weSBvdmVyIGFwcC1zcGVjaWZpYyBjaGFydCB0ZW1wbGF0ZXMgKi9cbiAgICB0aGlzLmNvbmZpZy5saW5lYXJDaGFydHMuZm9yRWFjaChsaW5lYXJDaGFydCA9PiB7XG4gICAgICB0aGlzLmNvbmZpZy5jaGFydENvbmZpZ1tsaW5lYXJDaGFydF0ub3B0cy5sZWdlbmRUZW1wbGF0ZSA9IHRoaXMuY29uZmlnLmxpbmVhckxlZ2VuZDtcbiAgICB9KTtcbiAgICB0aGlzLmNvbmZpZy5jaXJjdWxhckNoYXJ0cy5mb3JFYWNoKGNpcmN1bGFyQ2hhcnQgPT4ge1xuICAgICAgdGhpcy5jb25maWcuY2hhcnRDb25maWdbY2lyY3VsYXJDaGFydF0ub3B0cy5sZWdlbmRUZW1wbGF0ZSA9IHRoaXMuY29uZmlnLmNpcmN1bGFyTGVnZW5kO1xuICAgIH0pO1xuXG4gICAgT2JqZWN0LmFzc2lnbihDaGFydC5kZWZhdWx0cy5nbG9iYWwsIHthbmltYXRpb246IGZhbHNlLCByZXNwb25zaXZlOiB0cnVlfSk7XG5cbiAgICAvKiogY2hhbmdpbmcgb2YgY2hhcnQgdHlwZXMgKi9cbiAgICAkKCcubW9kYWwtY2hhcnQtdHlwZSBhJykub24oJ2NsaWNrJywgZSA9PiB7XG4gICAgICB0aGlzLmNoYXJ0VHlwZSA9ICQoZS5jdXJyZW50VGFyZ2V0KS5kYXRhKCd0eXBlJyk7XG4gICAgICB0aGlzLmF1dG9DaGFydFR5cGUgPSBmYWxzZTtcblxuICAgICAgJCgnLmxvZ2FyaXRobWljLXNjYWxlJykudG9nZ2xlKHRoaXMuaXNMb2dhcml0aG1pY0NhcGFibGUoKSk7XG4gICAgICAkKCcuYmVnaW4tYXQtemVybycpLnRvZ2dsZSh0aGlzLmNvbmZpZy5saW5lYXJDaGFydHMuaW5jbHVkZXModGhpcy5jaGFydFR5cGUpKTtcblxuICAgICAgaWYgKHRoaXMucmVtZW1iZXJDaGFydCA9PT0gJ3RydWUnKSB7XG4gICAgICAgIHRoaXMuc2V0TG9jYWxTdG9yYWdlKCdwYWdldmlld3MtY2hhcnQtcHJlZmVyZW5jZScsIHRoaXMuY2hhcnRUeXBlKTtcbiAgICAgIH1cblxuICAgICAgdGhpcy5pc0NoYXJ0QXBwKCkgPyB0aGlzLnVwZGF0ZUNoYXJ0KHRoaXMucGFnZVZpZXdzRGF0YSkgOiB0aGlzLnJlbmRlckRhdGEoKTtcbiAgICB9KTtcblxuICAgICQodGhpcy5jb25maWcubG9nYXJpdGhtaWNDaGVja2JveCkub24oJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgdGhpcy5hdXRvTG9nRGV0ZWN0aW9uID0gJ2ZhbHNlJztcbiAgICAgIHRoaXMuaXNDaGFydEFwcCgpID8gdGhpcy51cGRhdGVDaGFydCh0aGlzLnBhZ2VWaWV3c0RhdGEpIDogdGhpcy5yZW5kZXJEYXRhKCk7XG4gICAgfSk7XG5cbiAgICAvKipcbiAgICAgKiBkaXNhYmxlZC9lbmFibGUgYmVnaW4gYXQgemVybyBjaGVja2JveCBhY2NvcmRpbmdseSxcbiAgICAgKiBidXQgZG9uJ3QgdXBkYXRlIGNoYXJ0IHNpbmNlIHRoZSBsb2cgc2NhbGUgdmFsdWUgY2FuIGNoYW5nZSBwcmFnbWF0aWNhbGx5IGFuZCBub3QgZnJvbSB1c2VyIGlucHV0XG4gICAgICovXG4gICAgJCh0aGlzLmNvbmZpZy5sb2dhcml0aG1pY0NoZWNrYm94KS5vbignY2hhbmdlJywgKCkgPT4ge1xuICAgICAgJCgnLmJlZ2luLWF0LXplcm8nKS50b2dnbGVDbGFzcygnZGlzYWJsZWQnLCB0aGlzLmNoZWNrZWQpO1xuICAgIH0pO1xuXG4gICAgaWYgKHRoaXMuYmVnaW5BdFplcm8gPT09ICd0cnVlJykge1xuICAgICAgJCgnLmJlZ2luLWF0LXplcm8tb3B0aW9uJykucHJvcCgnY2hlY2tlZCcsIHRydWUpO1xuICAgIH1cblxuICAgICQoJy5iZWdpbi1hdC16ZXJvLW9wdGlvbicpLm9uKCdjbGljaycsICgpID0+IHtcbiAgICAgIHRoaXMuaXNDaGFydEFwcCgpID8gdGhpcy51cGRhdGVDaGFydCh0aGlzLnBhZ2VWaWV3c0RhdGEpIDogdGhpcy5yZW5kZXJEYXRhKCk7XG4gICAgfSk7XG5cbiAgICAvKiogY2hhcnQgZG93bmxvYWQgbGlzdGVuZXJzICovXG4gICAgJCgnLmRvd25sb2FkLXBuZycpLm9uKCdjbGljaycsIHRoaXMuZXhwb3J0UE5HLmJpbmQodGhpcykpO1xuICAgICQoJy5wcmludC1jaGFydCcpLm9uKCdjbGljaycsIHRoaXMucHJpbnRDaGFydC5iaW5kKHRoaXMpKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZXQgdGhlIGRlZmF1bHQgY2hhcnQgdHlwZSBvciB0aGUgb25lIGZyb20gbG9jYWxTdG9yYWdlLCBiYXNlZCBvbiBzZXR0aW5nc1xuICAgKiBAcGFyYW0ge051bWJlcn0gW251bURhdGFzZXRzXSAtIG51bWJlciBvZiBkYXRhc2V0c1xuICAgKiBAcmV0dXJucyB7bnVsbH0gbm90aGluZ1xuICAgKi9cbiAgc2V0SW5pdGlhbENoYXJ0VHlwZShudW1EYXRhc2V0cyA9IDEpIHtcbiAgICBpZiAodGhpcy5yZW1lbWJlckNoYXJ0ID09PSAndHJ1ZScpIHtcbiAgICAgIHRoaXMuY2hhcnRUeXBlID0gdGhpcy5nZXRGcm9tTG9jYWxTdG9yYWdlKCdwYWdldmlld3MtY2hhcnQtcHJlZmVyZW5jZScpIHx8IHRoaXMuY29uZmlnLmRlZmF1bHRzLmNoYXJ0VHlwZShudW1EYXRhc2V0cyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuY2hhcnRUeXBlID0gdGhpcy5jb25maWcuZGVmYXVsdHMuY2hhcnRUeXBlKG51bURhdGFzZXRzKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogRGVzdHJveSBwcmV2aW91cyBjaGFydCwgaWYgbmVlZGVkLlxuICAgKiBAcmV0dXJucyB7bnVsbH0gbm90aGluZ1xuICAgKi9cbiAgZGVzdHJveUNoYXJ0KCkge1xuICAgIGlmICh0aGlzLmNoYXJ0T2JqKSB7XG4gICAgICB0aGlzLmNoYXJ0T2JqLmRlc3Ryb3koKTtcbiAgICAgICQoJy5jaGFydC1sZWdlbmQnKS5odG1sKCcnKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogRXhwb3J0cyBjdXJyZW50IGNoYXJ0IGRhdGEgdG8gQ1NWIGZvcm1hdCBhbmQgbG9hZHMgaXQgaW4gYSBuZXcgdGFiXG4gICAqIFdpdGggdGhlIHByZXBlbmRlZCBkYXRhOnRleHQvY3N2IHRoaXMgc2hvdWxkIGNhdXNlIHRoZSBicm93c2VyIHRvIGRvd25sb2FkIHRoZSBkYXRhXG4gICAqIEByZXR1cm5zIHtudWxsfSBOb3RoaW5nXG4gICAqL1xuICBleHBvcnRDU1YoKSB7XG4gICAgbGV0IGNzdkNvbnRlbnQgPSAnZGF0YTp0ZXh0L2NzdjtjaGFyc2V0PXV0Zi04LERhdGUsJztcbiAgICBsZXQgdGl0bGVzID0gW107XG4gICAgbGV0IGRhdGFSb3dzID0gW107XG4gICAgbGV0IGRhdGVzID0gdGhpcy5nZXREYXRlSGVhZGluZ3MoZmFsc2UpO1xuXG4gICAgLy8gQmVnaW4gY29uc3RydWN0aW5nIHRoZSBkYXRhUm93cyBhcnJheSBieSBwb3B1bGF0aW5nIGl0IHdpdGggdGhlIGRhdGVzXG4gICAgZGF0ZXMuZm9yRWFjaCgoZGF0ZSwgaW5kZXgpID0+IHtcbiAgICAgIGRhdGFSb3dzW2luZGV4XSA9IFtkYXRlXTtcbiAgICB9KTtcblxuICAgIHRoaXMuY2hhcnRPYmouZGF0YS5kYXRhc2V0cy5mb3JFYWNoKHNpdGUgPT4ge1xuICAgICAgLy8gQnVpbGQgYW4gYXJyYXkgb2Ygc2l0ZSB0aXRsZXMgZm9yIHVzZSBpbiB0aGUgQ1NWIGhlYWRlclxuICAgICAgbGV0IHNpdGVUaXRsZSA9ICdcIicgKyBzaXRlLmxhYmVsLnJlcGxhY2UoL1wiL2csICdcIlwiJykgKyAnXCInO1xuICAgICAgdGl0bGVzLnB1c2goc2l0ZVRpdGxlKTtcblxuICAgICAgLy8gUG9wdWxhdGUgdGhlIGRhdGFSb3dzIGFycmF5IHdpdGggdGhlIGRhdGEgZm9yIHRoaXMgc2l0ZVxuICAgICAgZGF0ZXMuZm9yRWFjaCgoZGF0ZSwgaW5kZXgpID0+IHtcbiAgICAgICAgZGF0YVJvd3NbaW5kZXhdLnB1c2goc2l0ZS5kYXRhW2luZGV4XSk7XG4gICAgICB9KTtcbiAgICB9KTtcblxuICAgIC8vIEZpbmlzaCB0aGUgQ1NWIGhlYWRlclxuICAgIGNzdkNvbnRlbnQgPSBjc3ZDb250ZW50ICsgdGl0bGVzLmpvaW4oJywnKSArICdcXG4nO1xuXG4gICAgLy8gQWRkIHRoZSByb3dzIHRvIHRoZSBDU1ZcbiAgICBkYXRhUm93cy5mb3JFYWNoKGRhdGEgPT4ge1xuICAgICAgY3N2Q29udGVudCArPSBkYXRhLmpvaW4oJywnKSArICdcXG4nO1xuICAgIH0pO1xuXG4gICAgdGhpcy5kb3dubG9hZERhdGEoY3N2Q29udGVudCwgJ2NzdicpO1xuICB9XG5cbiAgLyoqXG4gICAqIEV4cG9ydHMgY3VycmVudCBjaGFydCBkYXRhIHRvIEpTT04gZm9ybWF0IGFuZCBsb2FkcyBpdCBpbiBhIG5ldyB0YWJcbiAgICogQHJldHVybnMge251bGx9IE5vdGhpbmdcbiAgICovXG4gIGV4cG9ydEpTT04oKSB7XG4gICAgbGV0IGRhdGEgPSBbXTtcblxuICAgIHRoaXMuY2hhcnRPYmouZGF0YS5kYXRhc2V0cy5mb3JFYWNoKChwYWdlLCBpbmRleCkgPT4ge1xuICAgICAgbGV0IGVudHJ5ID0ge1xuICAgICAgICBwYWdlOiBwYWdlLmxhYmVsLnJlcGxhY2UoL1wiL2csICdcXFwiJykucmVwbGFjZSgvJy9nLCBcIlxcJ1wiKSxcbiAgICAgICAgY29sb3I6IHBhZ2Uuc3Ryb2tlQ29sb3IsXG4gICAgICAgIHN1bTogcGFnZS5zdW0sXG4gICAgICAgIGRhaWx5X2F2ZXJhZ2U6IE1hdGgucm91bmQocGFnZS5zdW0gLyB0aGlzLm51bURheXNJblJhbmdlKCkpXG4gICAgICB9O1xuXG4gICAgICB0aGlzLmdldERhdGVIZWFkaW5ncyhmYWxzZSkuZm9yRWFjaCgoaGVhZGluZywgaW5kZXgpID0+IHtcbiAgICAgICAgZW50cnlbaGVhZGluZy5yZXBsYWNlKC9cXFxcLywnJyldID0gcGFnZS5kYXRhW2luZGV4XTtcbiAgICAgIH0pO1xuXG4gICAgICBkYXRhLnB1c2goZW50cnkpO1xuICAgIH0pO1xuXG4gICAgY29uc3QganNvbkNvbnRlbnQgPSAnZGF0YTp0ZXh0L2pzb247Y2hhcnNldD11dGYtOCwnICsgSlNPTi5zdHJpbmdpZnkoZGF0YSk7XG4gICAgdGhpcy5kb3dubG9hZERhdGEoanNvbkNvbnRlbnQsICdqc29uJyk7XG4gIH1cblxuICAvKipcbiAgICogRXhwb3J0cyBjdXJyZW50IGRhdGEgYXMgUE5HIGltYWdlLCBvcGVuaW5nIGl0IGluIGEgbmV3IHRhYlxuICAgKiBAcmV0dXJucyB7bnVsbH0gbm90aGluZ1xuICAgKi9cbiAgZXhwb3J0UE5HKCkge1xuICAgIHRoaXMuZG93bmxvYWREYXRhKHRoaXMuY2hhcnRPYmoudG9CYXNlNjRJbWFnZSgpLCAncG5nJyk7XG4gIH1cblxuICAvKipcbiAgICogRmlsbHMgaW4gemVybyB2YWx1ZSB0byBhIHRpbWVzZXJpZXMsIHNlZTpcbiAgICogaHR0cHM6Ly93aWtpdGVjaC53aWtpbWVkaWEub3JnL3dpa2kvQW5hbHl0aWNzL0FRUy9QYWdldmlld19BUEkjR290Y2hhc1xuICAgKlxuICAgKiBAcGFyYW0ge29iamVjdH0gZGF0YSBmZXRjaGVkIGZyb20gQVBJXG4gICAqIEBwYXJhbSB7bW9tZW50fSBzdGFydERhdGUgLSBzdGFydCBkYXRlIG9mIHJhbmdlIHRvIGZpbHRlciB0aHJvdWdoXG4gICAqIEBwYXJhbSB7bW9tZW50fSBlbmREYXRlIC0gZW5kIGRhdGUgb2YgcmFuZ2VcbiAgICogQHJldHVybnMge29iamVjdH0gZGF0YXNldCB3aXRoIHplcm9zIHdoZXJlIG51bGxzIHdoZXJlXG4gICAqL1xuICBmaWxsSW5aZXJvcyhkYXRhLCBzdGFydERhdGUsIGVuZERhdGUpIHtcbiAgICAvKiogRXh0cmFjdCB0aGUgZGF0ZXMgdGhhdCBhcmUgYWxyZWFkeSBpbiB0aGUgdGltZXNlcmllcyAqL1xuICAgIGxldCBhbHJlYWR5VGhlcmUgPSB7fTtcbiAgICBkYXRhLml0ZW1zLmZvckVhY2goZWxlbSA9PiB7XG4gICAgICBsZXQgZGF0ZSA9IG1vbWVudChlbGVtLnRpbWVzdGFtcCwgdGhpcy5jb25maWcudGltZXN0YW1wRm9ybWF0KTtcbiAgICAgIGFscmVhZHlUaGVyZVtkYXRlXSA9IGVsZW07XG4gICAgfSk7XG4gICAgZGF0YS5pdGVtcyA9IFtdO1xuXG4gICAgLyoqIFJlY29uc3RydWN0IHdpdGggemVyb3MgaW5zdGVhZCBvZiBudWxscyAqL1xuICAgIGZvciAobGV0IGRhdGUgPSBtb21lbnQoc3RhcnREYXRlKTsgZGF0ZSA8PSBlbmREYXRlOyBkYXRlLmFkZCgxLCAnZCcpKSB7XG4gICAgICBpZiAoYWxyZWFkeVRoZXJlW2RhdGVdKSB7XG4gICAgICAgIGRhdGEuaXRlbXMucHVzaChhbHJlYWR5VGhlcmVbZGF0ZV0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29uc3QgZWRnZUNhc2UgPSBkYXRlLmlzU2FtZSh0aGlzLmNvbmZpZy5tYXhEYXRlKSB8fCBkYXRlLmlzU2FtZShtb21lbnQodGhpcy5jb25maWcubWF4RGF0ZSkuc3VidHJhY3QoMSwgJ2RheXMnKSk7XG4gICAgICAgIGRhdGEuaXRlbXMucHVzaCh7XG4gICAgICAgICAgdGltZXN0YW1wOiBkYXRlLmZvcm1hdCh0aGlzLmNvbmZpZy50aW1lc3RhbXBGb3JtYXQpLFxuICAgICAgICAgIFt0aGlzLmlzUGFnZXZpZXdzKCkgPyAndmlld3MnIDogJ2RldmljZXMnXTogZWRnZUNhc2UgPyBudWxsIDogMFxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gZGF0YTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgZGF0YSBmb3JtYXR0ZWQgZm9yIENoYXJ0LmpzIGFuZCB0aGUgbGVnZW5kIHRlbXBsYXRlc1xuICAgKiBAcGFyYW0ge0FycmF5fSBkYXRhc2V0cyAtIGFzIHJldHJpZXZlZCBieSBnZXRQYWdlVmlld3NEYXRhXG4gICAqIEByZXR1cm5zIHtvYmplY3R9IC0gcmVhZHkgZm9yIGNoYXJ0IHJlbmRlcmluZ1xuICAgKi9cbiAgYnVpbGRDaGFydERhdGEoZGF0YXNldHMpIHtcbiAgICBjb25zdCBsYWJlbHMgPSAkKHRoaXMuY29uZmlnLnNlbGVjdDJJbnB1dCkudmFsKCk7XG5cbiAgICAvKiogcHJlc2VydmUgb3JkZXIgb2YgZGF0YXNldHMgZHVlIHRvIGFzeW5jIGNhbGxzICovXG4gICAgcmV0dXJuIGRhdGFzZXRzLm1hcCgoZGF0YXNldCwgaW5kZXgpID0+IHtcbiAgICAgIC8qKiBCdWlsZCB0aGUgYXJ0aWNsZSdzIGRhdGFzZXQuICovXG4gICAgICBjb25zdCB2YWx1ZXMgPSBkYXRhc2V0Lm1hcChlbGVtID0+IHRoaXMuaXNQYWdldmlld3MoKSA/IGVsZW0udmlld3MgOiBlbGVtLmRldmljZXMpLFxuICAgICAgICBzdW0gPSB2YWx1ZXMucmVkdWNlKChhLCBiKSA9PiBhICsgYiksXG4gICAgICAgIGF2ZXJhZ2UgPSBNYXRoLnJvdW5kKHN1bSAvIHZhbHVlcy5sZW5ndGgpLFxuICAgICAgICBtYXggPSBNYXRoLm1heCguLi52YWx1ZXMpLFxuICAgICAgICBtaW4gPSBNYXRoLm1pbiguLi52YWx1ZXMpLFxuICAgICAgICBjb2xvciA9IHRoaXMuY29uZmlnLmNvbG9yc1tpbmRleCAlIDEwXSxcbiAgICAgICAgbGFiZWwgPSBsYWJlbHNbaW5kZXhdLmRlc2NvcmUoKTtcblxuICAgICAgY29uc3QgZW50aXR5SW5mbyA9IHRoaXMuZW50aXR5SW5mbyA/IHRoaXMuZW50aXR5SW5mb1tsYWJlbF0gOiB7fTtcblxuICAgICAgZGF0YXNldCA9IE9iamVjdC5hc3NpZ24oe1xuICAgICAgICBsYWJlbCxcbiAgICAgICAgZGF0YTogdmFsdWVzLFxuICAgICAgICB2YWx1ZTogc3VtLCAvLyBkdXBsaWNhdGVkIGJlY2F1c2UgQ2hhcnQuanMgd2FudHMgYSBzaW5nbGUgYHZhbHVlYCBmb3IgY2lyY3VsYXIgY2hhcnRzXG4gICAgICAgIHN1bSxcbiAgICAgICAgYXZlcmFnZSxcbiAgICAgICAgbWF4LFxuICAgICAgICBtaW4sXG4gICAgICAgIGNvbG9yXG4gICAgICB9LCB0aGlzLmNvbmZpZy5jaGFydENvbmZpZ1t0aGlzLmNoYXJ0VHlwZV0uZGF0YXNldChjb2xvciksIGVudGl0eUluZm8pO1xuXG4gICAgICBpZiAodGhpcy5pc0xvZ2FyaXRobWljKCkpIHtcbiAgICAgICAgZGF0YXNldC5kYXRhID0gZGF0YXNldC5kYXRhLm1hcCh2aWV3ID0+IHZpZXcgfHwgbnVsbCk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBkYXRhc2V0O1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCB1cmwgdG8gcXVlcnkgdGhlIEFQSSBiYXNlZCBvbiBhcHAgYW5kIG9wdGlvbnNcbiAgICogQHBhcmFtIHtTdHJpbmd9IGVudGl0eSAtIG5hbWUgb2YgZW50aXR5IHdlJ3JlIHF1ZXJ5aW5nIGZvciAocGFnZSBuYW1lIG9yIHByb2plY3QgbmFtZSlcbiAgICogQHBhcmFtIHttb21lbnR9IHN0YXJ0RGF0ZSAtIHN0YXJ0IGRhdGVcbiAgICogQHBhcmFtIHttb21lbnR9IGVuZERhdGUgLSBlbmQgZGF0ZVxuICAgKiBAcmV0dXJuIHtTdHJpbmd9IHRoZSBVUkxcbiAgICovXG4gIGdldEFwaVVybChlbnRpdHksIHN0YXJ0RGF0ZSwgZW5kRGF0ZSkge1xuICAgIGNvbnN0IHVyaUVuY29kZWRFbnRpdHlOYW1lID0gZW5jb2RlVVJJQ29tcG9uZW50KGVudGl0eSk7XG5cbiAgICBpZiAodGhpcy5hcHAgPT09ICdzaXRldmlld3MnKSB7XG4gICAgICByZXR1cm4gdGhpcy5pc1BhZ2V2aWV3cygpID8gKFxuICAgICAgICBgaHR0cHM6Ly93aWtpbWVkaWEub3JnL2FwaS9yZXN0X3YxL21ldHJpY3MvcGFnZXZpZXdzL2FnZ3JlZ2F0ZS8ke3VyaUVuY29kZWRFbnRpdHlOYW1lfWAgK1xuICAgICAgICBgLyR7JCh0aGlzLmNvbmZpZy5wbGF0Zm9ybVNlbGVjdG9yKS52YWwoKX0vJHskKHRoaXMuY29uZmlnLmFnZW50U2VsZWN0b3IpLnZhbCgpfS9kYWlseWAgK1xuICAgICAgICBgLyR7c3RhcnREYXRlLmZvcm1hdCh0aGlzLmNvbmZpZy50aW1lc3RhbXBGb3JtYXQpfS8ke2VuZERhdGUuZm9ybWF0KHRoaXMuY29uZmlnLnRpbWVzdGFtcEZvcm1hdCl9YFxuICAgICAgKSA6IChcbiAgICAgICAgYGh0dHBzOi8vd2lraW1lZGlhLm9yZy9hcGkvcmVzdF92MS9tZXRyaWNzL3VuaXF1ZS1kZXZpY2VzLyR7dXJpRW5jb2RlZEVudGl0eU5hbWV9LyR7JCh0aGlzLmNvbmZpZy5wbGF0Zm9ybVNlbGVjdG9yKS52YWwoKX0vZGFpbHlgICtcbiAgICAgICAgYC8ke3N0YXJ0RGF0ZS5mb3JtYXQodGhpcy5jb25maWcudGltZXN0YW1wRm9ybWF0KX0vJHtlbmREYXRlLmZvcm1hdCh0aGlzLmNvbmZpZy50aW1lc3RhbXBGb3JtYXQpfWBcbiAgICAgICk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiAoXG4gICAgICAgIGBodHRwczovL3dpa2ltZWRpYS5vcmcvYXBpL3Jlc3RfdjEvbWV0cmljcy9wYWdldmlld3MvcGVyLWFydGljbGUvJHt0aGlzLnByb2plY3R9YCArXG4gICAgICAgIGAvJHskKHRoaXMuY29uZmlnLnBsYXRmb3JtU2VsZWN0b3IpLnZhbCgpfS8keyQodGhpcy5jb25maWcuYWdlbnRTZWxlY3RvcikudmFsKCl9LyR7dXJpRW5jb2RlZEVudGl0eU5hbWV9L2RhaWx5YCArXG4gICAgICAgIGAvJHtzdGFydERhdGUuZm9ybWF0KHRoaXMuY29uZmlnLnRpbWVzdGFtcEZvcm1hdCl9LyR7ZW5kRGF0ZS5mb3JtYXQodGhpcy5jb25maWcudGltZXN0YW1wRm9ybWF0KX1gXG4gICAgICApO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBNb3RoZXIgZnVuY3Rpb24gZm9yIHF1ZXJ5aW5nIHRoZSBBUEkgYW5kIHByb2Nlc3NpbmcgZGF0YVxuICAgKiBAcGFyYW0gIHtBcnJheX0gIGVudGl0aWVzIC0gbGlzdCBvZiBwYWdlIG5hbWVzLCBvciBwcm9qZWN0cyBmb3IgU2l0ZXZpZXdzXG4gICAqIEByZXR1cm4ge0RlZmVycmVkfSBQcm9taXNlIHJlc29sdmluZyB3aXRoIHBhZ2V2aWV3cyBkYXRhIGFuZCBlcnJvcnMsIGlmIHByZXNlbnRcbiAgICovXG4gIGdldFBhZ2VWaWV3c0RhdGEoZW50aXRpZXMpIHtcbiAgICBsZXQgZGZkID0gJC5EZWZlcnJlZCgpLCBjb3VudCA9IDAsIGZhaWx1cmVSZXRyaWVzID0ge30sXG4gICAgICB0b3RhbFJlcXVlc3RDb3VudCA9IGVudGl0aWVzLmxlbmd0aCwgZmFpbGVkRW50aXRpZXMgPSBbXTtcblxuICAgIC8qKiBAdHlwZSB7T2JqZWN0fSBldmVyeXRoaW5nIHdlIG5lZWQgdG8ga2VlcCB0cmFjayBvZiBmb3IgdGhlIHByb21pc2VzICovXG4gICAgbGV0IHhockRhdGEgPSB7XG4gICAgICBlbnRpdGllcyxcbiAgICAgIGxhYmVsczogW10sIC8vIExhYmVscyAoZGF0ZXMpIGZvciB0aGUgeC1heGlzLlxuICAgICAgZGF0YXNldHM6IFtdLCAvLyBEYXRhIGZvciBlYWNoIGFydGljbGUgdGltZXNlcmllc1xuICAgICAgZXJyb3JzOiBbXSwgLy8gUXVldWUgdXAgZXJyb3JzIHRvIHNob3cgYWZ0ZXIgYWxsIHJlcXVlc3RzIGhhdmUgYmVlbiBtYWRlXG4gICAgICBmYXRhbEVycm9yczogW10sIC8vIFVucmVjb3ZlcmFibGUgSmF2YVNjcmlwdCBlcnJvcnNcbiAgICAgIHByb21pc2VzOiBbXVxuICAgIH07XG5cbiAgICBjb25zdCBtYWtlUmVxdWVzdCA9IChlbnRpdHksIGluZGV4KSA9PiB7XG4gICAgICBjb25zdCBzdGFydERhdGUgPSB0aGlzLmRhdGVyYW5nZXBpY2tlci5zdGFydERhdGUuc3RhcnRPZignZGF5JyksXG4gICAgICAgIGVuZERhdGUgPSB0aGlzLmRhdGVyYW5nZXBpY2tlci5lbmREYXRlLnN0YXJ0T2YoJ2RheScpLFxuICAgICAgICB1cmwgPSB0aGlzLmdldEFwaVVybChlbnRpdHksIHN0YXJ0RGF0ZSwgZW5kRGF0ZSksXG4gICAgICAgIHByb21pc2UgPSAkLmFqYXgoeyB1cmwsIGRhdGFUeXBlOiAnanNvbicgfSk7XG5cbiAgICAgIHhockRhdGEucHJvbWlzZXMucHVzaChwcm9taXNlKTtcblxuICAgICAgcHJvbWlzZS5kb25lKHN1Y2Nlc3NEYXRhID0+IHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICBzdWNjZXNzRGF0YSA9IHRoaXMuZmlsbEluWmVyb3Moc3VjY2Vzc0RhdGEsIHN0YXJ0RGF0ZSwgZW5kRGF0ZSk7XG5cbiAgICAgICAgICB4aHJEYXRhLmRhdGFzZXRzLnB1c2goc3VjY2Vzc0RhdGEuaXRlbXMpO1xuXG4gICAgICAgICAgLyoqIGZldGNoIHRoZSBsYWJlbHMgZm9yIHRoZSB4LWF4aXMgb24gc3VjY2VzcyBpZiB3ZSBoYXZlbid0IGFscmVhZHkgKi9cbiAgICAgICAgICBpZiAoc3VjY2Vzc0RhdGEuaXRlbXMgJiYgIXhockRhdGEubGFiZWxzLmxlbmd0aCkge1xuICAgICAgICAgICAgeGhyRGF0YS5sYWJlbHMgPSBzdWNjZXNzRGF0YS5pdGVtcy5tYXAoZWxlbSA9PiB7XG4gICAgICAgICAgICAgIHJldHVybiBtb21lbnQoZWxlbS50aW1lc3RhbXAsIHRoaXMuY29uZmlnLnRpbWVzdGFtcEZvcm1hdCkuZm9ybWF0KHRoaXMuZGF0ZUZvcm1hdCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICAgIHJldHVybiB4aHJEYXRhLmZhdGFsRXJyb3JzLnB1c2goZXJyKTtcbiAgICAgICAgfVxuICAgICAgfSkuZmFpbChlcnJvckRhdGEgPT4ge1xuICAgICAgICAvKiogZmlyc3QgZGV0ZWN0IGlmIHRoaXMgd2FzIGEgQ2Fzc2FuZHJhIGJhY2tlbmQgZXJyb3IsIGFuZCBpZiBzbywgc2NoZWR1bGUgYSByZS10cnkgKi9cbiAgICAgICAgY29uc3QgY2Fzc2FuZHJhRXJyb3IgPSBlcnJvckRhdGEucmVzcG9uc2VKU09OLnRpdGxlID09PSAnRXJyb3IgaW4gQ2Fzc2FuZHJhIHRhYmxlIHN0b3JhZ2UgYmFja2VuZCc7XG5cbiAgICAgICAgaWYgKGNhc3NhbmRyYUVycm9yKSB7XG4gICAgICAgICAgaWYgKGZhaWx1cmVSZXRyaWVzW2VudGl0eV0pIHtcbiAgICAgICAgICAgIGZhaWx1cmVSZXRyaWVzW2VudGl0eV0rKztcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZmFpbHVyZVJldHJpZXNbZW50aXR5XSA9IDE7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgLyoqIG1heGltdW0gb2YgMyByZXRyaWVzICovXG4gICAgICAgICAgaWYgKGZhaWx1cmVSZXRyaWVzW2VudGl0eV0gPCAzKSB7XG4gICAgICAgICAgICB0b3RhbFJlcXVlc3RDb3VudCsrO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMucmF0ZUxpbWl0KG1ha2VSZXF1ZXN0LCB0aGlzLmNvbmZpZy5hcGlUaHJvdHRsZSwgdGhpcykoZW50aXR5LCBpbmRleCk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgLy8gcmVtb3ZlIHRoaXMgYXJ0aWNsZSBmcm9tIHRoZSBsaXN0IG9mIGVudGl0aWVzIHRvIGFuYWx5emVcbiAgICAgICAgeGhyRGF0YS5lbnRpdGllcyA9IHhockRhdGEuZW50aXRpZXMuZmlsdGVyKGVsID0+IGVsICE9PSBlbnRpdHkpO1xuXG4gICAgICAgIGlmIChjYXNzYW5kcmFFcnJvcikge1xuICAgICAgICAgIGZhaWxlZEVudGl0aWVzLnB1c2goZW50aXR5KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBsZXQgbGluayA9IHRoaXMuYXBwID09PSAnc2l0ZXZpZXdzJyA/IHRoaXMuZ2V0U2l0ZUxpbmsoZW50aXR5KSA6IHRoaXMuZ2V0UGFnZUxpbmsoZW50aXR5LCB0aGlzLnByb2plY3QpO1xuICAgICAgICAgIHhockRhdGEuZXJyb3JzLnB1c2goXG4gICAgICAgICAgICBgJHtsaW5rfTogJHskLmkxOG4oJ2FwaS1lcnJvcicsICdQYWdldmlld3MgQVBJJyl9IC0gJHtlcnJvckRhdGEucmVzcG9uc2VKU09OLnRpdGxlfWBcbiAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICB9KS5hbHdheXMoKCkgPT4ge1xuICAgICAgICBpZiAoKytjb3VudCA9PT0gdG90YWxSZXF1ZXN0Q291bnQpIHtcbiAgICAgICAgICB0aGlzLnBhZ2VWaWV3c0RhdGEgPSB4aHJEYXRhO1xuICAgICAgICAgIGRmZC5yZXNvbHZlKHhockRhdGEpO1xuXG4gICAgICAgICAgaWYgKGZhaWxlZEVudGl0aWVzLmxlbmd0aCkge1xuICAgICAgICAgICAgdGhpcy53cml0ZU1lc3NhZ2UoJC5pMThuKFxuICAgICAgICAgICAgICAnYXBpLWVycm9yLXRpbWVvdXQnLFxuICAgICAgICAgICAgICAnPHVsPicgK1xuICAgICAgICAgICAgICBmYWlsZWRFbnRpdGllcy5tYXAoZmFpbGVkRW50aXR5ID0+IGA8bGk+JHt0aGlzLmdldFBhZ2VMaW5rKGZhaWxlZEVudGl0eSwgdGhpcy5wcm9qZWN0LmVzY2FwZSgpKX08L2xpPmApLmpvaW4oJycpICtcbiAgICAgICAgICAgICAgJzwvdWw+J1xuICAgICAgICAgICAgKSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9O1xuXG4gICAgZW50aXRpZXMuZm9yRWFjaCgoZW50aXR5LCBpbmRleCkgPT4gbWFrZVJlcXVlc3QoZW50aXR5LCBpbmRleCkpO1xuXG4gICAgcmV0dXJuIGRmZDtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgcGFyYW1zIG5lZWRlZCB0byBjcmVhdGUgYSBwZXJtYW5lbnQgbGluayBvZiB2aXNpYmxlIGRhdGFcbiAgICogQHJldHVybiB7T2JqZWN0fSBoYXNoIG9mIHBhcmFtc1xuICAgKi9cbiAgZ2V0UGVybWFMaW5rKCkge1xuICAgIGxldCBwYXJhbXMgPSB0aGlzLmdldFBhcmFtcyhmYWxzZSk7XG4gICAgZGVsZXRlIHBhcmFtcy5yYW5nZTtcbiAgICByZXR1cm4gcGFyYW1zO1xuICB9XG5cbiAgLyoqXG4gICAqIEFyZSB3ZSBjdXJyZW50bHkgaW4gbG9nYXJpdGhtaWMgbW9kZT9cbiAgICogQHJldHVybnMge0Jvb2xlYW59IHRydWUgb3IgZmFsc2VcbiAgICovXG4gIGlzTG9nYXJpdGhtaWMoKSB7XG4gICAgcmV0dXJuICQodGhpcy5jb25maWcubG9nYXJpdGhtaWNDaGVja2JveCkuaXMoJzpjaGVja2VkJykgJiYgdGhpcy5pc0xvZ2FyaXRobWljQ2FwYWJsZSgpO1xuICB9XG5cbiAgLyoqXG4gICAqIFRlc3QgaWYgdGhlIGN1cnJlbnQgY2hhcnQgdHlwZSBzdXBwb3J0cyBhIGxvZ2FyaXRobWljIHNjYWxlXG4gICAqIEByZXR1cm5zIHtCb29sZWFufSBsb2ctZnJpZW5kbHkgb3Igbm90XG4gICAqL1xuICBpc0xvZ2FyaXRobWljQ2FwYWJsZSgpIHtcbiAgICByZXR1cm4gWydsaW5lJywgJ2JhciddLmluY2x1ZGVzKHRoaXMuY2hhcnRUeXBlKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBcmUgd2UgdHJ5aW5nIHRvIHNob3cgZGF0YSBvbiBwYWdldmlld3MgKGFzIG9wcG9zZWQgdG8gdW5pcXVlIGRldmljZXMpP1xuICAgKiBAcmV0dXJuIHtCb29sZWFufSB0cnVlIG9yIGZhbHNlXG4gICAqL1xuICBpc1BhZ2V2aWV3cygpIHtcbiAgICByZXR1cm4gdGhpcy5hcHAgPT09ICdwYWdldmlld3MnIHx8ICQodGhpcy5jb25maWcuZGF0YVNvdXJjZVNlbGVjdG9yKS52YWwoKSA9PT0gJ3BhZ2V2aWV3cyc7XG4gIH1cblxuICAvKipcbiAgICogQXJlIHdlIHRyeWluZyB0byBzaG93IGRhdGEgb24gcGFnZXZpZXdzIChhcyBvcHBvc2VkIHRvIHVuaXF1ZSBkZXZpY2VzKT9cbiAgICogQHJldHVybiB7Qm9vbGVhbn0gdHJ1ZSBvciBmYWxzZVxuICAgKi9cbiAgaXNVbmlxdWVEZXZpY2VzKCkge1xuICAgIHJldHVybiAhdGhpcy5pc1BhZ2V2aWV3cygpO1xuICB9XG5cbiAgLyoqXG4gICAqIFByaW50IHRoZSBjaGFydCFcbiAgICogQHJldHVybnMge251bGx9IE5vdGhpbmdcbiAgICovXG4gIHByaW50Q2hhcnQoKSB7XG4gICAgbGV0IHRhYiA9IHdpbmRvdy5vcGVuKCk7XG4gICAgdGFiLmRvY3VtZW50LndyaXRlKFxuICAgICAgYDxpbWcgc3JjPVwiJHt0aGlzLmNoYXJ0T2JqLnRvQmFzZTY0SW1hZ2UoKX1cIiAvPmBcbiAgICApO1xuICAgIHRhYi5wcmludCgpO1xuICAgIHRhYi5jbG9zZSgpO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlbW92ZXMgY2hhcnQsIG1lc3NhZ2VzLCBhbmQgcmVzZXRzIHNpdGUgc2VsZWN0aW9uc1xuICAgKiBAcGFyYW0ge2Jvb2xlYW59IFtzZWxlY3QyXSB3aGV0aGVyIG9yIG5vdCB0byBjbGVhciB0aGUgU2VsZWN0MiBpbnB1dFxuICAgKiBAcmV0dXJucyB7bnVsbH0gbm90aGluZ1xuICAgKi9cbiAgcmVzZXRWaWV3KHNlbGVjdDIgPSBmYWxzZSkge1xuICAgIHRyeSB7XG4gICAgICAvKiogdGhlc2UgY2FuIGZhaWwgc29tZXRpbWVzICovXG4gICAgICB0aGlzLmRlc3Ryb3lDaGFydCgpO1xuICAgICAgaWYgKHNlbGVjdDIpIHRoaXMucmVzZXRTZWxlY3QyKCk7XG4gICAgfSBjYXRjaCAoZSkgeyAvLyBub3RoaW5nXG4gICAgfSBmaW5hbGx5IHtcbiAgICAgIHRoaXMuc3RvcFNwaW5ueSgpO1xuICAgICAgJCgnLmRhdGEtbGlua3MnKS5hZGRDbGFzcygnaW52aXNpYmxlJyk7XG4gICAgICAkKHRoaXMuY29uZmlnLmNoYXJ0KS5oaWRlKCk7XG4gICAgICB0aGlzLmNsZWFyTWVzc2FnZXMoKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQXR0ZW1wdCB0byBmaW5lLXR1bmUgdGhlIHBvaW50ZXIgZGV0ZWN0aW9uIHNwYWNpbmcgYmFzZWQgb24gaG93IGNsdXR0ZXJlZCB0aGUgY2hhcnQgaXNcbiAgICogQHJldHVybnMge051bWJlcn0gcmFkaXVzXG4gICAqL1xuICBzZXRDaGFydFBvaW50RGV0ZWN0aW9uUmFkaXVzKCkge1xuICAgIGlmICh0aGlzLmNoYXJ0VHlwZSAhPT0gJ2xpbmUnKSByZXR1cm47XG5cbiAgICBpZiAodGhpcy5udW1EYXlzSW5SYW5nZSgpID4gNTApIHtcbiAgICAgIENoYXJ0LmRlZmF1bHRzLmdsb2JhbC5lbGVtZW50cy5wb2ludC5oaXRSYWRpdXMgPSAzO1xuICAgIH0gZWxzZSBpZiAodGhpcy5udW1EYXlzSW5SYW5nZSgpID4gMzApIHtcbiAgICAgIENoYXJ0LmRlZmF1bHRzLmdsb2JhbC5lbGVtZW50cy5wb2ludC5oaXRSYWRpdXMgPSA1O1xuICAgIH0gZWxzZSBpZiAodGhpcy5udW1EYXlzSW5SYW5nZSgpID4gMjApIHtcbiAgICAgIENoYXJ0LmRlZmF1bHRzLmdsb2JhbC5lbGVtZW50cy5wb2ludC5oaXRSYWRpdXMgPSAxMDtcbiAgICB9IGVsc2Uge1xuICAgICAgQ2hhcnQuZGVmYXVsdHMuZ2xvYmFsLmVsZW1lbnRzLnBvaW50LmhpdFJhZGl1cyA9IDMwO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBEZXRlcm1pbmUgaWYgd2Ugc2hvdWxkIHNob3cgYSBsb2dhcml0aG1pYyBjaGFydCBmb3IgdGhlIGdpdmVuIGRhdGFzZXQsIGJhc2VkIG9uIFRoZWlsIGluZGV4XG4gICAqIEBwYXJhbSAge0FycmF5fSBkYXRhc2V0cyAtIHBhZ2V2aWV3c1xuICAgKiBAcmV0dXJuIHtCb29sZWFufSB5ZXMgb3Igbm9cbiAgICovXG4gIHNob3VsZEJlTG9nYXJpdGhtaWMoZGF0YXNldHMpIHtcbiAgICBpZiAoIXRoaXMuaXNMb2dhcml0aG1pY0NhcGFibGUoKSB8fCB0aGlzLm5vTG9nU2NhbGUpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBsZXQgc2V0cyA9IFtdO1xuICAgIC8vIGNvbnZlcnQgTmFOcyBhbmQgbnVsbHMgdG8gemVyb3NcbiAgICBkYXRhc2V0cy5mb3JFYWNoKGRhdGFzZXQgPT4ge1xuICAgICAgc2V0cy5wdXNoKGRhdGFzZXQubWFwKHZhbCA9PiB2YWwgfHwgMCkpO1xuICAgIH0pO1xuXG4gICAgLy8gb3ZlcmFsbCBtYXggdmFsdWVcbiAgICBjb25zdCBtYXhWYWx1ZSA9IE1hdGgubWF4KC4uLltdLmNvbmNhdCguLi5zZXRzKSk7XG5cbiAgICBpZiAobWF4VmFsdWUgPD0gMTApIHJldHVybiBmYWxzZTtcblxuICAgIGxldCBsb2dhcml0aG1pY05lZWRlZCA9IGZhbHNlO1xuXG4gICAgc2V0cy5mb3JFYWNoKHNldCA9PiB7XG4gICAgICBzZXQucHVzaChtYXhWYWx1ZSk7XG5cbiAgICAgIGNvbnN0IHN1bSA9IHNldC5yZWR1Y2UoKGEsIGIpID0+IGEgKyBiKSxcbiAgICAgICAgYXZlcmFnZSA9IHN1bSAvIHNldC5sZW5ndGg7XG4gICAgICBsZXQgdGhlaWwgPSAwO1xuICAgICAgc2V0LmZvckVhY2godiA9PiB0aGVpbCArPSB2ID8gdiAqIE1hdGgubG9nKHYgLyBhdmVyYWdlKSA6IDApO1xuXG4gICAgICBpZiAodGhlaWwgLyBzdW0gPiAwLjUpIHtcbiAgICAgICAgcmV0dXJuIGxvZ2FyaXRobWljTmVlZGVkID0gdHJ1ZTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHJldHVybiBsb2dhcml0aG1pY05lZWRlZDtcbiAgfVxuXG4gIC8qKlxuICAgKiBzZXRzIHVwIHRoZSBkYXRlcmFuZ2Ugc2VsZWN0b3IgYW5kIGFkZHMgbGlzdGVuZXJzXG4gICAqIEByZXR1cm5zIHtudWxsfSAtIG5vdGhpbmdcbiAgICovXG4gIHNldHVwRGF0ZVJhbmdlU2VsZWN0b3IoKSB7XG4gICAgc3VwZXIuc2V0dXBEYXRlUmFuZ2VTZWxlY3RvcigpO1xuXG4gICAgLyoqIHByZXZlbnQgZHVwbGljYXRlIHNldHVwIHNpbmNlIHRoZSBsaXN0IHZpZXcgYXBwcyBhbHNvIHVzZSBjaGFydHMgKi9cbiAgICBpZiAoIXRoaXMuaXNDaGFydEFwcCgpKSByZXR1cm47XG5cbiAgICBjb25zdCBkYXRlUmFuZ2VTZWxlY3RvciA9ICQodGhpcy5jb25maWcuZGF0ZVJhbmdlU2VsZWN0b3IpO1xuXG4gICAgLyoqIHRoZSBcIkxhdGVzdCBOIGRheXNcIiBsaW5rcyAqL1xuICAgICQoJy5kYXRlLWxhdGVzdCBhJykub24oJ2NsaWNrJywgZSA9PiB7XG4gICAgICB0aGlzLnNldFNwZWNpYWxSYW5nZShgbGF0ZXN0LSR7JChlLnRhcmdldCkuZGF0YSgndmFsdWUnKX1gKTtcbiAgICB9KTtcblxuICAgIGRhdGVSYW5nZVNlbGVjdG9yLm9uKCdjaGFuZ2UnLCBlID0+IHtcbiAgICAgIHRoaXMuc2V0Q2hhcnRQb2ludERldGVjdGlvblJhZGl1cygpO1xuICAgICAgdGhpcy5wcm9jZXNzSW5wdXQoKTtcblxuICAgICAgLyoqIGNsZWFyIG91dCBzcGVjaWFsUmFuZ2UgaWYgaXQgZG9lc24ndCBtYXRjaCBvdXIgaW5wdXQgKi9cbiAgICAgIGlmICh0aGlzLnNwZWNpYWxSYW5nZSAmJiB0aGlzLnNwZWNpYWxSYW5nZS52YWx1ZSAhPT0gZS50YXJnZXQudmFsdWUpIHtcbiAgICAgICAgdGhpcy5zcGVjaWFsUmFuZ2UgPSBudWxsO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIFVwZGF0ZSB0aGUgY2hhcnQgd2l0aCBkYXRhIHByb3ZpZGVkIGJ5IHByb2Nlc3NJbnB1dCgpXG4gICAqIEBwYXJhbSB7T2JqZWN0fSB4aHJEYXRhIC0gZGF0YSBhcyBjb25zdHJ1Y3RlZCBieSBwcm9jZXNzSW5wdXQoKVxuICAgKiBAcmV0dXJucyB7bnVsbH0gLSBub3RoaW5cbiAgICovXG4gIHVwZGF0ZUNoYXJ0KHhockRhdGEpIHtcbiAgICAkKCcuY2hhcnQtbGVnZW5kJykuaHRtbCgnJyk7IC8vIGNsZWFyIG9sZCBjaGFydCBsZWdlbmRcblxuICAgIC8vIHNob3cgcGVuZGluZyBlcnJvciBtZXNzYWdlcyBpZiBwcmVzZW50LCBleGl0aW5nIGlmIGZhdGFsXG4gICAgaWYgKHRoaXMuc2hvd0Vycm9ycyh4aHJEYXRhKSkgcmV0dXJuO1xuXG4gICAgaWYgKCF4aHJEYXRhLmVudGl0aWVzLmxlbmd0aCkge1xuICAgICAgcmV0dXJuIHRoaXMuc3RvcFNwaW5ueSgpO1xuICAgIH0gZWxzZSBpZiAoeGhyRGF0YS5lbnRpdGllcy5sZW5ndGggPT09IDEpIHtcbiAgICAgICQoJy5tdWx0aS1wYWdlLWNoYXJ0LW5vZGUnKS5oaWRlKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgICQoJy5tdWx0aS1wYWdlLWNoYXJ0LW5vZGUnKS5zaG93KCk7XG4gICAgfVxuXG4gICAgdGhpcy5vdXRwdXREYXRhID0gdGhpcy5idWlsZENoYXJ0RGF0YSh4aHJEYXRhLmRhdGFzZXRzLCB4aHJEYXRhLmVudGl0aWVzKTtcblxuICAgIGlmICh0aGlzLmF1dG9Mb2dEZXRlY3Rpb24gPT09ICd0cnVlJykge1xuICAgICAgY29uc3Qgc2hvdWxkQmVMb2dhcml0aG1pYyA9IHRoaXMuc2hvdWxkQmVMb2dhcml0aG1pYyh0aGlzLm91dHB1dERhdGEubWFwKHNldCA9PiBzZXQuZGF0YSkpO1xuICAgICAgJCh0aGlzLmNvbmZpZy5sb2dhcml0aG1pY0NoZWNrYm94KS5wcm9wKCdjaGVja2VkJywgc2hvdWxkQmVMb2dhcml0aG1pYyk7XG4gICAgICAkKCcuYmVnaW4tYXQtemVybycpLnRvZ2dsZUNsYXNzKCdkaXNhYmxlZCcsIHNob3VsZEJlTG9nYXJpdGhtaWMpO1xuICAgIH1cblxuICAgIGxldCBvcHRpb25zID0gT2JqZWN0LmFzc2lnbihcbiAgICAgIHtzY2FsZXM6IHt9fSxcbiAgICAgIHRoaXMuY29uZmlnLmNoYXJ0Q29uZmlnW3RoaXMuY2hhcnRUeXBlXS5vcHRzLFxuICAgICAgdGhpcy5jb25maWcuZ2xvYmFsQ2hhcnRPcHRzXG4gICAgKTtcblxuICAgIGlmICh0aGlzLmlzTG9nYXJpdGhtaWMoKSkge1xuICAgICAgb3B0aW9ucy5zY2FsZXMgPSBPYmplY3QuYXNzaWduKHt9LCBvcHRpb25zLnNjYWxlcywge1xuICAgICAgICB5QXhlczogW3tcbiAgICAgICAgICB0eXBlOiAnbG9nYXJpdGhtaWMnLFxuICAgICAgICAgIHRpY2tzOiB7XG4gICAgICAgICAgICBjYWxsYmFjazogKHZhbHVlLCBpbmRleCwgYXJyKSA9PiB7XG4gICAgICAgICAgICAgIGNvbnN0IHJlbWFpbiA9IHZhbHVlIC8gKE1hdGgucG93KDEwLCBNYXRoLmZsb29yKENoYXJ0LmhlbHBlcnMubG9nMTAodmFsdWUpKSkpO1xuXG4gICAgICAgICAgICAgIGlmIChyZW1haW4gPT09IDEgfHwgcmVtYWluID09PSAyIHx8IHJlbWFpbiA9PT0gNSB8fCBpbmRleCA9PT0gMCB8fCBpbmRleCA9PT0gYXJyLmxlbmd0aCAtIDEpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5mb3JtYXROdW1iZXIodmFsdWUpO1xuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHJldHVybiAnJztcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfV1cbiAgICAgIH0pO1xuICAgIH1cblxuICAgIHRoaXMuc3RvcFNwaW5ueSgpO1xuXG4gICAgdHJ5IHtcbiAgICAgICQoJy5jaGFydC1jb250YWluZXInKS5odG1sKCcnKS5hcHBlbmQoXCI8Y2FudmFzIGNsYXNzPSdhcXMtY2hhcnQnPlwiKTtcbiAgICAgIHRoaXMuc2V0Q2hhcnRQb2ludERldGVjdGlvblJhZGl1cygpO1xuICAgICAgY29uc3QgY29udGV4dCA9ICQodGhpcy5jb25maWcuY2hhcnQpWzBdLmdldENvbnRleHQoJzJkJyk7XG5cbiAgICAgIGlmICh0aGlzLmNvbmZpZy5saW5lYXJDaGFydHMuaW5jbHVkZXModGhpcy5jaGFydFR5cGUpKSB7XG4gICAgICAgIGNvbnN0IGxpbmVhckRhdGEgPSB7bGFiZWxzOiB4aHJEYXRhLmxhYmVscywgZGF0YXNldHM6IHRoaXMub3V0cHV0RGF0YX07XG5cbiAgICAgICAgaWYgKHRoaXMuY2hhcnRUeXBlID09PSAncmFkYXInKSB7XG4gICAgICAgICAgb3B0aW9ucy5zY2FsZS50aWNrcy5iZWdpbkF0WmVybyA9ICQoJy5iZWdpbi1hdC16ZXJvLW9wdGlvbicpLmlzKCc6Y2hlY2tlZCcpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIG9wdGlvbnMuc2NhbGVzLnlBeGVzWzBdLnRpY2tzLmJlZ2luQXRaZXJvID0gJCgnLmJlZ2luLWF0LXplcm8tb3B0aW9uJykuaXMoJzpjaGVja2VkJyk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmNoYXJ0T2JqID0gbmV3IENoYXJ0KGNvbnRleHQsIHtcbiAgICAgICAgICB0eXBlOiB0aGlzLmNoYXJ0VHlwZSxcbiAgICAgICAgICBkYXRhOiBsaW5lYXJEYXRhLFxuICAgICAgICAgIG9wdGlvbnNcbiAgICAgICAgfSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLmNoYXJ0T2JqID0gbmV3IENoYXJ0KGNvbnRleHQsIHtcbiAgICAgICAgICB0eXBlOiB0aGlzLmNoYXJ0VHlwZSxcbiAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICBsYWJlbHM6IHRoaXMub3V0cHV0RGF0YS5tYXAoZCA9PiBkLmxhYmVsKSxcbiAgICAgICAgICAgIGRhdGFzZXRzOiBbe1xuICAgICAgICAgICAgICBkYXRhOiB0aGlzLm91dHB1dERhdGEubWFwKGQgPT4gZC52YWx1ZSksXG4gICAgICAgICAgICAgIGJhY2tncm91bmRDb2xvcjogdGhpcy5vdXRwdXREYXRhLm1hcChkID0+IGQuYmFja2dyb3VuZENvbG9yKSxcbiAgICAgICAgICAgICAgaG92ZXJCYWNrZ3JvdW5kQ29sb3I6IHRoaXMub3V0cHV0RGF0YS5tYXAoZCA9PiBkLmhvdmVyQmFja2dyb3VuZENvbG9yKSxcbiAgICAgICAgICAgICAgYXZlcmFnZXM6IHRoaXMub3V0cHV0RGF0YS5tYXAoZCA9PiBkLmF2ZXJhZ2UpXG4gICAgICAgICAgICB9XVxuICAgICAgICAgIH0sXG4gICAgICAgICAgb3B0aW9uc1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIHJldHVybiB0aGlzLnNob3dFcnJvcnMoe1xuICAgICAgICBlcnJvcnM6IFtdLFxuICAgICAgICBmYXRhbEVycm9yczogW2Vycl1cbiAgICAgIH0pO1xuICAgIH1cblxuICAgICQoJy5jaGFydC1sZWdlbmQnKS5odG1sKHRoaXMuY2hhcnRPYmouZ2VuZXJhdGVMZWdlbmQoKSk7XG4gICAgJCgnLmRhdGEtbGlua3MnKS5yZW1vdmVDbGFzcygnaW52aXNpYmxlJyk7XG5cbiAgICBpZiAodGhpcy5hcHAgPT09ICdwYWdldmlld3MnKSB0aGlzLnVwZGF0ZVRhYmxlKCk7XG4gIH1cblxuICAvKipcbiAgICogU2hvdyBlcnJvcnMgYnVpbHQgaW4gdGhpcy5wcm9jZXNzSW5wdXRcbiAgICogQHBhcmFtIHtvYmplY3R9IHhockRhdGEgLSBhcyBidWlsdCBieSB0aGlzLnByb2Nlc3NJbnB1dCwgbGlrZSBgeyBlcnJvcnM6IFtdLCBmYXRhbEVycm9yczogW10gfWBcbiAgICogQHJldHVybnMge2Jvb2xlYW59IHdoZXRoZXIgb3Igbm90IGZhdGFsIGVycm9ycyBvY2N1cmVkXG4gICAqL1xuICBzaG93RXJyb3JzKHhockRhdGEpIHtcbiAgICBpZiAoeGhyRGF0YS5mYXRhbEVycm9ycy5sZW5ndGgpIHtcbiAgICAgIHRoaXMucmVzZXRWaWV3KHRydWUpO1xuICAgICAgY29uc3QgZmF0YWxFcnJvcnMgPSB4aHJEYXRhLmZhdGFsRXJyb3JzLnVuaXF1ZSgpO1xuICAgICAgdGhpcy5zaG93RmF0YWxFcnJvcnMoZmF0YWxFcnJvcnMpO1xuXG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICBpZiAoeGhyRGF0YS5lcnJvcnMubGVuZ3RoKSB7XG4gICAgICAvLyBpZiBldmVyeXRoaW5nIGZhaWxlZCwgcmVzZXQgdGhlIHZpZXcsIGNsZWFyaW5nIG91dCBzcGFjZSB0YWtlbiB1cCBieSBlbXB0eSBjaGFydFxuICAgICAgaWYgKHhockRhdGEuZW50aXRpZXMgJiYgKHhockRhdGEuZXJyb3JzLmxlbmd0aCA9PT0geGhyRGF0YS5lbnRpdGllcy5sZW5ndGggfHwgIXhockRhdGEuZW50aXRpZXMubGVuZ3RoKSkge1xuICAgICAgICB0aGlzLnJlc2V0VmlldygpO1xuICAgICAgfVxuXG4gICAgICB4aHJEYXRhLmVycm9ycy51bmlxdWUoKS5mb3JFYWNoKGVycm9yID0+IHRoaXMud3JpdGVNZXNzYWdlKGVycm9yKSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IENoYXJ0SGVscGVycztcbiIsIi8qKlxuICogQGZpbGUgU2hhcmVkIGNvZGUgYW1vbmdzdCBhbGwgYXBwcyAoUGFnZXZpZXdzLCBUb3B2aWV3cywgTGFuZ3ZpZXdzLCBTaXRldmlld3MsIE1hc3N2aWV3cywgUmVkaXJlY3QgVmlld3MpXG4gKiBAYXV0aG9yIE11c2lrQW5pbWFsLCBLYWxkYXJpXG4gKiBAY29weXJpZ2h0IDIwMTYgTXVzaWtBbmltYWxcbiAqIEBsaWNlbnNlIE1JVCBMaWNlbnNlOiBodHRwczovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL01JVFxuICovXG5cbmNvbnN0IFB2Q29uZmlnID0gcmVxdWlyZSgnLi9wdl9jb25maWcnKTtcbmNvbnN0IHNpdGVNYXAgPSByZXF1aXJlKCcuL3NpdGVfbWFwJyk7XG5jb25zdCBzaXRlRG9tYWlucyA9IE9iamVjdC5rZXlzKHNpdGVNYXApLm1hcChrZXkgPT4gc2l0ZU1hcFtrZXldKTtcblxuLyoqIFB2IGNsYXNzLCBjb250YWlucyBjb2RlIGFtb25nc3QgYWxsIGFwcHMgKFBhZ2V2aWV3cywgVG9wdmlld3MsIExhbmd2aWV3cywgU2l0ZXZpZXdzLCBNYXNzdmlld3MsIFJlZGlyZWN0IFZpZXdzKSAqL1xuY2xhc3MgUHYgZXh0ZW5kcyBQdkNvbmZpZyB7XG4gIGNvbnN0cnVjdG9yKGFwcENvbmZpZykge1xuICAgIHN1cGVyKGFwcENvbmZpZyk7XG5cbiAgICAvKiogYXNzaWduIGluaXRpYWwgY2xhc3MgcHJvcGVydGllcyAqL1xuICAgIGNvbnN0IGRlZmF1bHRzID0gdGhpcy5jb25maWcuZGVmYXVsdHMsXG4gICAgICB2YWxpZFBhcmFtcyA9IHRoaXMuY29uZmlnLnZhbGlkUGFyYW1zO1xuICAgIHRoaXMuY29uZmlnID0gT2JqZWN0LmFzc2lnbih7fSwgdGhpcy5jb25maWcsIGFwcENvbmZpZyk7XG4gICAgdGhpcy5jb25maWcuZGVmYXVsdHMgPSBPYmplY3QuYXNzaWduKHt9LCBkZWZhdWx0cywgYXBwQ29uZmlnLmRlZmF1bHRzKTtcbiAgICB0aGlzLmNvbmZpZy52YWxpZFBhcmFtcyA9IE9iamVjdC5hc3NpZ24oe30sIHZhbGlkUGFyYW1zLCBhcHBDb25maWcudmFsaWRQYXJhbXMpO1xuXG4gICAgdGhpcy5jb2xvcnNTdHlsZUVsID0gdW5kZWZpbmVkO1xuICAgIHRoaXMuc3RvcmFnZSA9IHt9OyAvLyB1c2VkIGFzIGZhbGxiYWNrIHdoZW4gbG9jYWxTdG9yYWdlIGlzIG5vdCBzdXBwb3J0ZWRcblxuICAgIFsnbG9jYWxpemVEYXRlRm9ybWF0JywgJ251bWVyaWNhbEZvcm1hdHRpbmcnLCAnYmV6aWVyQ3VydmUnLCAnYXV0b2NvbXBsZXRlJywgJ2F1dG9Mb2dEZXRlY3Rpb24nLCAnYmVnaW5BdFplcm8nLCAncmVtZW1iZXJDaGFydCddLmZvckVhY2goc2V0dGluZyA9PiB7XG4gICAgICB0aGlzW3NldHRpbmddID0gdGhpcy5nZXRGcm9tTG9jYWxTdG9yYWdlKGBwYWdldmlld3Mtc2V0dGluZ3MtJHtzZXR0aW5nfWApIHx8IHRoaXMuY29uZmlnLmRlZmF1bHRzW3NldHRpbmddO1xuICAgIH0pO1xuICAgIHRoaXMuc2V0dXBTZXR0aW5nc01vZGFsKCk7XG5cbiAgICB0aGlzLnBhcmFtcyA9IG51bGw7XG4gICAgdGhpcy5zaXRlSW5mbyA9IHt9O1xuXG4gICAgLyoqIEB0eXBlIHtudWxsfERhdGV9IHRyYWNraW5nIG9mIGVsYXBzZWQgdGltZSAqL1xuICAgIHRoaXMucHJvY2Vzc1N0YXJ0ID0gbnVsbDtcblxuICAgIC8qKiBhc3NpZ24gYXBwIGluc3RhbmNlIHRvIHdpbmRvdyBmb3IgZGVidWdnaW5nIG9uIGxvY2FsIGVudmlyb25tZW50ICovXG4gICAgaWYgKGxvY2F0aW9uLmhvc3QgPT09ICdsb2NhbGhvc3QnKSB7XG4gICAgICB3aW5kb3cuYXBwID0gdGhpcztcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5zcGxhc2goKTtcbiAgICB9XG5cbiAgICB0aGlzLmRlYnVnID0gbG9jYXRpb24uc2VhcmNoLmluY2x1ZGVzKCdkZWJ1Zz10cnVlJykgfHwgbG9jYXRpb24uaG9zdCA9PT0gJ2xvY2FsaG9zdCc7XG5cbiAgICAvKiogc2hvdyBub3RpY2UgaWYgb24gc3RhZ2luZyBlbnZpcm9ubWVudCAqL1xuICAgIGlmICgvLXRlc3QvLnRlc3QobG9jYXRpb24ucGF0aG5hbWUpKSB7XG4gICAgICBjb25zdCBhY3R1YWxQYXRoTmFtZSA9IGxvY2F0aW9uLnBhdGhuYW1lLnJlcGxhY2UoLy10ZXN0XFwvPy8sICcnKTtcbiAgICAgIHRoaXMuYWRkU2l0ZU5vdGljZSgnd2FybmluZycsXG4gICAgICAgIGBUaGlzIGlzIGEgc3RhZ2luZyBlbnZpcm9ubWVudC4gRm9yIHRoZSBhY3R1YWwgJHtkb2N1bWVudC50aXRsZX0sXG4gICAgICAgICBzZWUgPGEgaHJlZj0nJHthY3R1YWxQYXRoTmFtZX0nPiR7bG9jYXRpb24uaG9zdG5hbWV9JHthY3R1YWxQYXRoTmFtZX08L2E+YFxuICAgICAgKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBMb2FkIHRyYW5zbGF0aW9ucyB0aGVuIGluaXRpYWxpemUgdGhlIGFwcC5cbiAgICAgKiBFYWNoIGFwcCBoYXMgaXQncyBvd24gaW5pdGlhbGl6ZSBtZXRob2QuXG4gICAgICogTWFrZSBzdXJlIHdlIGxvYWQgJ2VuLmpzb24nIGFzIGEgZmFsbGJhY2tcbiAgICAgKi9cbiAgICBsZXQgbWVzc2FnZXNUb0xvYWQgPSB7XG4gICAgICBbaTE4bkxhbmddOiBgL3BhZ2V2aWV3cy9tZXNzYWdlcy8ke2kxOG5MYW5nfS5qc29uYFxuICAgIH07XG4gICAgaWYgKGkxOG5MYW5nICE9PSAnZW4nKSB7XG4gICAgICBtZXNzYWdlc1RvTG9hZC5lbiA9ICcvcGFnZXZpZXdzL21lc3NhZ2VzL2VuLmpzb24nO1xuICAgIH1cbiAgICAkLmkxOG4oe1xuICAgICAgbG9jYWxlOiBpMThuTGFuZ1xuICAgIH0pLmxvYWQobWVzc2FnZXNUb0xvYWQpLnRoZW4odGhpcy5pbml0aWFsaXplLmJpbmQodGhpcykpO1xuXG4gICAgLyoqIHNldCB1cCB0b2FzdHIgY29uZmlnLiBUaGUgZHVyYXRpb24gbWF5IGJlIG92ZXJyaWRlbiBsYXRlciAqL1xuICAgIHRvYXN0ci5vcHRpb25zID0ge1xuICAgICAgY2xvc2VCdXR0b246IHRydWUsXG4gICAgICBkZWJ1ZzogbG9jYXRpb24uaG9zdCA9PT0gJ2xvY2FsaG9zdCcsXG4gICAgICBuZXdlc3RPblRvcDogZmFsc2UsXG4gICAgICBwcm9ncmVzc0JhcjogZmFsc2UsXG4gICAgICBwb3NpdGlvbkNsYXNzOiAndG9hc3QtdG9wLWNlbnRlcicsXG4gICAgICBwcmV2ZW50RHVwbGljYXRlczogdHJ1ZSxcbiAgICAgIG9uY2xpY2s6IG51bGwsXG4gICAgICBzaG93RHVyYXRpb246ICczMDAnLFxuICAgICAgaGlkZUR1cmF0aW9uOiAnMTAwMCcsXG4gICAgICB0aW1lT3V0OiAnNTAwMCcsXG4gICAgICBleHRlbmRlZFRpbWVPdXQ6ICczMDAwJyxcbiAgICAgIHNob3dFYXNpbmc6ICdzd2luZycsXG4gICAgICBoaWRlRWFzaW5nOiAnbGluZWFyJyxcbiAgICAgIHNob3dNZXRob2Q6ICdmYWRlSW4nLFxuICAgICAgaGlkZU1ldGhvZDogJ2ZhZGVPdXQnLFxuICAgICAgdG9hc3RDbGFzczogJ2FsZXJ0JyxcbiAgICAgIGljb25DbGFzc2VzOiB7XG4gICAgICAgIGVycm9yOiAnYWxlcnQtZGFuZ2VyJyxcbiAgICAgICAgaW5mbzogJ2FsZXJ0LWluZm8nLFxuICAgICAgICBzdWNjZXNzOiAnYWxlcnQtc3VjY2VzcycsXG4gICAgICAgIHdhcm5pbmc6ICdhbGVydC13YXJuaW5nJ1xuICAgICAgfVxuICAgIH07XG4gIH1cblxuICAvKipcbiAgICogQWRkIGEgc2l0ZSBub3RpY2UgKEJvb3RzdHJhcCBhbGVydClcbiAgICogQHBhcmFtIHtTdHJpbmd9IGxldmVsIC0gb25lIG9mICdzdWNjZXNzJywgJ2luZm8nLCAnd2FybmluZycgb3IgJ2Vycm9yJ1xuICAgKiBAcGFyYW0ge1N0cmluZ30gbWVzc2FnZSAtIG1lc3NhZ2UgdG8gc2hvd1xuICAgKiBAcGFyYW0ge1N0cmluZ30gW3RpdGxlXSAtIHdpbGwgYXBwZWFyIGluIGJvbGQgYW5kIGluIGZyb250IG9mIHRoZSBtZXNzYWdlXG4gICAqIEBwYXJhbSB7Qm9vbGVhbn0gW2Rpc21pc3NhYmxlXSAtIHdoZXRoZXIgb3Igbm90IHRvIGFkZCBhIFhcbiAgICogICB0aGF0IGFsbG93cyB0aGUgdXNlciB0byBkaXNtaXNzIHRoZSBub3RpY2VcbiAgICogQHJldHVybnMge251bGx9IG5vdGhpbmdcbiAgICovXG4gIGFkZFNpdGVOb3RpY2UobGV2ZWwsIG1lc3NhZ2UsIHRpdGxlLCBkaXNtaXNzYWJsZSkge1xuICAgIHRpdGxlID0gdGl0bGUgPyBgPHN0cm9uZz4ke3RpdGxlfTwvc3Ryb25nPiBgIDogJyc7XG5cbiAgICBsZXQgbWFya3VwID0gdGl0bGUgKyBtZXNzYWdlO1xuXG4gICAgdGhpcy53cml0ZU1lc3NhZ2UoXG4gICAgICBtYXJrdXAsXG4gICAgICBsZXZlbCxcbiAgICAgIGRpc21pc3NhYmxlID8gMTAwMDAgOiAwXG4gICAgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBZGQgc2l0ZSBub3RpY2UgZm9yIGludmFsaWQgcGFyYW1ldGVyXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBwYXJhbSAtIG5hbWUgb2YgcGFyYW1ldGVyXG4gICAqIEByZXR1cm5zIHtudWxsfSBub3RoaW5nXG4gICAqL1xuICBhZGRJbnZhbGlkUGFyYW1Ob3RpY2UocGFyYW0pIHtcbiAgICBjb25zdCBkb2NMaW5rID0gYDxhIGhyZWY9Jy8ke3RoaXMuYXBwfS91cmxfc3RydWN0dXJlJz4keyQuaTE4bignZG9jdW1lbnRhdGlvbicpfTwvYT5gO1xuICAgIHRoaXMuYWRkU2l0ZU5vdGljZShcbiAgICAgICdlcnJvcicsXG4gICAgICAkLmkxOG4oJ3BhcmFtLWVycm9yLTMnLCBwYXJhbSwgZG9jTGluayksXG4gICAgICAkLmkxOG4oJ2ludmFsaWQtcGFyYW1zJyksXG4gICAgICB0cnVlXG4gICAgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBWYWxpZGF0ZSB0aGUgZGF0ZSByYW5nZSBvZiBnaXZlbiBwYXJhbXNcbiAgICogICBhbmQgdGhyb3cgZXJyb3JzIGFzIG5lY2Vzc2FyeSBhbmQvb3Igc2V0IGRlZmF1bHRzXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBwYXJhbXMgLSBhcyByZXR1cm5lZCBieSB0aGlzLnBhcnNlUXVlcnlTdHJpbmcoKVxuICAgKiBAcmV0dXJucyB7Qm9vbGVhbn0gdHJ1ZSBpZiB0aGVyZSB3ZXJlIG5vIGVycm9ycywgZmFsc2Ugb3RoZXJ3aXNlXG4gICAqL1xuICB2YWxpZGF0ZURhdGVSYW5nZShwYXJhbXMpIHtcbiAgICBpZiAocGFyYW1zLnJhbmdlKSB7XG4gICAgICBpZiAoIXRoaXMuc2V0U3BlY2lhbFJhbmdlKHBhcmFtcy5yYW5nZSkpIHtcbiAgICAgICAgdGhpcy5hZGRJbnZhbGlkUGFyYW1Ob3RpY2UoJ3JhbmdlJyk7XG4gICAgICAgIHRoaXMuc2V0U3BlY2lhbFJhbmdlKHRoaXMuY29uZmlnLmRlZmF1bHRzLmRhdGVSYW5nZSk7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmIChwYXJhbXMuc3RhcnQpIHtcbiAgICAgIGNvbnN0IGRhdGVSZWdleCA9IC9cXGR7NH0tXFxkezJ9LVxcZHsyfSQvO1xuXG4gICAgICAvLyBmaXJzdCBzZXQgZGVmYXVsdHNcbiAgICAgIGxldCBzdGFydERhdGUsIGVuZERhdGU7XG5cbiAgICAgIC8vIHRoZW4gY2hlY2sgZm9ybWF0IG9mIHN0YXJ0IGFuZCBlbmQgZGF0ZVxuICAgICAgaWYgKHBhcmFtcy5zdGFydCAmJiBkYXRlUmVnZXgudGVzdChwYXJhbXMuc3RhcnQpKSB7XG4gICAgICAgIHN0YXJ0RGF0ZSA9IG1vbWVudChwYXJhbXMuc3RhcnQpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5hZGRJbnZhbGlkUGFyYW1Ob3RpY2UoJ3N0YXJ0Jyk7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICAgIGlmIChwYXJhbXMuZW5kICYmIGRhdGVSZWdleC50ZXN0KHBhcmFtcy5lbmQpKSB7XG4gICAgICAgIGVuZERhdGUgPSBtb21lbnQocGFyYW1zLmVuZCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLmFkZEludmFsaWRQYXJhbU5vdGljZSgnZW5kJyk7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cblxuICAgICAgLy8gY2hlY2sgaWYgdGhleSBhcmUgb3V0c2lkZSB0aGUgdmFsaWQgcmFuZ2Ugb3IgaWYgaW4gdGhlIHdyb25nIG9yZGVyXG4gICAgICBpZiAoc3RhcnREYXRlIDwgdGhpcy5jb25maWcubWluRGF0ZSB8fCBlbmREYXRlIDwgdGhpcy5jb25maWcubWluRGF0ZSkge1xuICAgICAgICB0aGlzLmFkZFNpdGVOb3RpY2UoJ2Vycm9yJyxcbiAgICAgICAgICAkLmkxOG4oJ3BhcmFtLWVycm9yLTEnLCBtb21lbnQodGhpcy5jb25maWcubWluRGF0ZSkuZm9ybWF0KHRoaXMuZGF0ZUZvcm1hdCkpLFxuICAgICAgICAgICQuaTE4bignaW52YWxpZC1wYXJhbXMnKSxcbiAgICAgICAgICB0cnVlXG4gICAgICAgICk7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH0gZWxzZSBpZiAoc3RhcnREYXRlID4gZW5kRGF0ZSkge1xuICAgICAgICB0aGlzLmFkZFNpdGVOb3RpY2UoJ2Vycm9yJywgJC5pMThuKCdwYXJhbS1lcnJvci0yJyksICQuaTE4bignaW52YWxpZC1wYXJhbXMnKSwgdHJ1ZSk7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cblxuICAgICAgLyoqIGRpcmVjdGx5IGFzc2lnbiBzdGFydERhdGUgYmVmb3JlIGNhbGxpbmcgc2V0RW5kRGF0ZSBzbyBldmVudHMgd2lsbCBiZSBmaXJlZCBvbmNlICovXG4gICAgICB0aGlzLmRhdGVyYW5nZXBpY2tlci5zdGFydERhdGUgPSBzdGFydERhdGU7XG4gICAgICB0aGlzLmRhdGVyYW5nZXBpY2tlci5zZXRFbmREYXRlKGVuZERhdGUpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnNldFNwZWNpYWxSYW5nZSh0aGlzLmNvbmZpZy5kZWZhdWx0cy5kYXRlUmFuZ2UpO1xuICAgIH1cblxuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgY2xlYXJTaXRlTm90aWNlcygpIHtcbiAgICAkKCcuc2l0ZS1ub3RpY2UnKS5odG1sKCcnKTtcbiAgfVxuXG4gIGNsZWFyTWVzc2FnZXMoKSB7XG4gICAgJCgnLm1lc3NhZ2UtY29udGFpbmVyJykuaHRtbCgnJyk7XG4gIH1cblxuICAvKipcbiAgICogR2V0IGRhdGUgZm9ybWF0IHRvIHVzZSBiYXNlZCBvbiBzZXR0aW5nc1xuICAgKiBAcmV0dXJucyB7c3RyaW5nfSBkYXRlIGZvcm1hdCB0byBwYXNzZWQgdG8gcGFyc2VyXG4gICAqL1xuICBnZXQgZGF0ZUZvcm1hdCgpIHtcbiAgICBpZiAodGhpcy5sb2NhbGl6ZURhdGVGb3JtYXQgPT09ICd0cnVlJykge1xuICAgICAgcmV0dXJuIHRoaXMuZ2V0TG9jYWxlRGF0ZVN0cmluZygpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gdGhpcy5jb25maWcuZGVmYXVsdHMuZGF0ZUZvcm1hdDtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogR2V0IHRoZSBkYXRlcmFuZ2VwaWNrZXIgaW5zdGFuY2UuIFBsYWluIGFuZCBzaW1wbGUuXG4gICAqIEByZXR1cm4ge09iamVjdH0gZGF0ZXJhbmdlIHBpY2tlclxuICAgKi9cbiAgZ2V0IGRhdGVyYW5nZXBpY2tlcigpIHtcbiAgICByZXR1cm4gJCh0aGlzLmNvbmZpZy5kYXRlUmFuZ2VTZWxlY3RvcikuZGF0YSgnZGF0ZXJhbmdlcGlja2VyJyk7XG4gIH1cblxuICAvKipcbiAgICogR2V0IHRoZSBkYXRhYmFzZSBuYW1lIG9mIHRoZSBnaXZlbiBwcm9qZXRcbiAgICogQHBhcmFtICB7U3RyaW5nfSBwcm9qZWN0IC0gd2l0aCBvciB3aXRob3V0IC5vcmdcbiAgICogQHJldHVybiB7U3RyaW5nfSBkYXRhYmFzZSBuYW1lXG4gICAqL1xuICBkYk5hbWUocHJvamVjdCkge1xuICAgIHJldHVybiBPYmplY3Qua2V5cyhzaXRlTWFwKS5maW5kKGtleSA9PiBzaXRlTWFwW2tleV0gPT09IGAke3Byb2plY3QucmVwbGFjZSgvXFwub3JnJC8sJycpfS5vcmdgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBGb3JjZSBkb3dubG9hZCBvZiBnaXZlbiBkYXRhLCBvciBvcGVuIGluIGEgbmV3IHRhYiBpZiBIVE1MNSA8YT4gZG93bmxvYWQgYXR0cmlidXRlIGlzIG5vdCBzdXBwb3J0ZWRcbiAgICogQHBhcmFtIHtTdHJpbmd9IGRhdGEgLSBSYXcgZGF0YSBwcmVwZW5kZWQgd2l0aCBkYXRhIHR5cGUsIGUuZy4gXCJkYXRhOnRleHQvY3N2O2NoYXJzZXQ9dXRmLTgsbXkgZGF0YS4uLlwiXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBleHRlbnNpb24gLSB0aGUgZmlsZSBleHRlbnNpb24gdG8gdXNlXG4gICAqIEByZXR1cm5zIHtudWxsfSBOb3RoaW5nXG4gICAqL1xuICBkb3dubG9hZERhdGEoZGF0YSwgZXh0ZW5zaW9uKSB7XG4gICAgY29uc3QgZW5jb2RlZFVyaSA9IGVuY29kZVVSSShkYXRhKTtcblxuICAgIC8vIGNyZWF0ZSBIVE1MNSBkb3dubG9hZCBlbGVtZW50IGFuZCBmb3JjZSBjbGljayBzbyB3ZSBjYW4gc3BlY2lmeSBhIGZpbGVuYW1lXG4gICAgY29uc3QgbGluayA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2EnKTtcbiAgICBpZiAodHlwZW9mIGxpbmsuZG93bmxvYWQgPT09ICdzdHJpbmcnKSB7XG4gICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGxpbmspOyAvLyBGaXJlZm94IHJlcXVpcmVzIHRoZSBsaW5rIHRvIGJlIGluIHRoZSBib2R5XG5cbiAgICAgIGNvbnN0IGZpbGVuYW1lID0gYCR7dGhpcy5nZXRFeHBvcnRGaWxlbmFtZSgpfS4ke2V4dGVuc2lvbn1gO1xuICAgICAgbGluay5kb3dubG9hZCA9IGZpbGVuYW1lO1xuICAgICAgbGluay5ocmVmID0gZW5jb2RlZFVyaTtcbiAgICAgIGxpbmsuY2xpY2soKTtcblxuICAgICAgZG9jdW1lbnQuYm9keS5yZW1vdmVDaGlsZChsaW5rKTsgLy8gcmVtb3ZlIHRoZSBsaW5rIHdoZW4gZG9uZVxuICAgIH0gZWxzZSB7XG4gICAgICB3aW5kb3cub3BlbihlbmNvZGVkVXJpKTsgLy8gb3BlbiBpbiBuZXcgdGFiIGlmIGRvd25sb2FkIGlzbid0IHN1cHBvcnRlZCAoKmNvdWdoKiBTYWZhcmkpXG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEZpbGwgaW4gdmFsdWVzIHdpdGhpbiBzZXR0aW5ncyBtb2RhbCB3aXRoIHdoYXQncyBpbiB0aGUgc2Vzc2lvbiBvYmplY3RcbiAgICogQHJldHVybnMge251bGx9IG5vdGhpbmdcbiAgICovXG4gIGZpbGxJblNldHRpbmdzKCkge1xuICAgICQuZWFjaCgkKCcjc2V0dGluZ3MtbW9kYWwgaW5wdXQnKSwgKGluZGV4LCBlbCkgPT4ge1xuICAgICAgaWYgKGVsLnR5cGUgPT09ICdjaGVja2JveCcpIHtcbiAgICAgICAgZWwuY2hlY2tlZCA9IHRoaXNbZWwubmFtZV0gPT09ICd0cnVlJztcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGVsLmNoZWNrZWQgPSB0aGlzW2VsLm5hbWVdID09PSBlbC52YWx1ZTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBZGQgZm9jdXMgdG8gU2VsZWN0MiBpbnB1dCBmaWVsZFxuICAgKiBAcmV0dXJucyB7bnVsbH0gbm90aGluZ1xuICAgKi9cbiAgZm9jdXNTZWxlY3QyKCkge1xuICAgICQoJy5zZWxlY3QyLXNlbGVjdGlvbicpLnRyaWdnZXIoJ2NsaWNrJyk7XG4gICAgJCgnLnNlbGVjdDItc2VhcmNoX19maWVsZCcpLmZvY3VzKCk7XG4gIH1cblxuICAvKipcbiAgICogRm9ybWF0IG51bWJlciBiYXNlZCBvbiBjdXJyZW50IHNldHRpbmdzLCBlLmcuIGxvY2FsaXplIHdpdGggY29tbWEgZGVsaW1ldGVyc1xuICAgKiBAcGFyYW0ge251bWJlcnxzdHJpbmd9IG51bSAtIG51bWJlciB0byBmb3JtYXRcbiAgICogQHJldHVybnMge3N0cmluZ30gZm9ybWF0dGVkIG51bWJlclxuICAgKi9cbiAgZm9ybWF0TnVtYmVyKG51bSkge1xuICAgIGNvbnN0IG51bWVyaWNhbEZvcm1hdHRpbmcgPSB0aGlzLmdldEZyb21Mb2NhbFN0b3JhZ2UoJ3BhZ2V2aWV3cy1zZXR0aW5ncy1udW1lcmljYWxGb3JtYXR0aW5nJykgfHwgdGhpcy5jb25maWcuZGVmYXVsdHMubnVtZXJpY2FsRm9ybWF0dGluZztcbiAgICBpZiAobnVtZXJpY2FsRm9ybWF0dGluZyA9PT0gJ3RydWUnKSB7XG4gICAgICByZXR1cm4gdGhpcy5uKG51bSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBudW07XG4gICAgfVxuICB9XG5cbiAgZm9ybWF0WUF4aXNOdW1iZXIobnVtKSB7XG4gICAgaWYgKG51bSAlIDEgPT09IDApIHtcbiAgICAgIHJldHVybiB0aGlzLmZvcm1hdE51bWJlcihudW0pO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogR2V0cyB0aGUgZGF0ZSBoZWFkaW5ncyBhcyBzdHJpbmdzIC0gaTE4biBjb21wbGlhbnRcbiAgICogQHBhcmFtIHtib29sZWFufSBsb2NhbGl6ZWQgLSB3aGV0aGVyIHRoZSBkYXRlcyBzaG91bGQgYmUgbG9jYWxpemVkIHBlciBicm93c2VyIGxhbmd1YWdlXG4gICAqIEByZXR1cm5zIHtBcnJheX0gdGhlIGRhdGUgaGVhZGluZ3MgYXMgc3RyaW5nc1xuICAgKi9cbiAgZ2V0RGF0ZUhlYWRpbmdzKGxvY2FsaXplZCkge1xuICAgIGNvbnN0IGRhdGVIZWFkaW5ncyA9IFtdLFxuICAgICAgZW5kRGF0ZSA9IG1vbWVudCh0aGlzLmRhdGVyYW5nZXBpY2tlci5lbmREYXRlKS5hZGQoMSwgJ2QnKTtcblxuICAgIGZvciAobGV0IGRhdGUgPSBtb21lbnQodGhpcy5kYXRlcmFuZ2VwaWNrZXIuc3RhcnREYXRlKTsgZGF0ZS5pc0JlZm9yZShlbmREYXRlKTsgZGF0ZS5hZGQoMSwgJ2QnKSkge1xuICAgICAgaWYgKGxvY2FsaXplZCkge1xuICAgICAgICBkYXRlSGVhZGluZ3MucHVzaChkYXRlLmZvcm1hdCh0aGlzLmRhdGVGb3JtYXQpKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGRhdGVIZWFkaW5ncy5wdXNoKGRhdGUuZm9ybWF0KCdZWVlZLU1NLUREJykpO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gZGF0ZUhlYWRpbmdzO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCB0aGUgZXhwbGFuZGVkIHdpa2kgVVJMIGdpdmVuIHRoZSBwYWdlIG5hbWVcbiAgICogVGhpcyBzaG91bGQgYmUgdXNlZCBpbnN0ZWFkIG9mIGdldFBhZ2VVUkwgd2hlbiB5b3Ugd2FudCB0byBjaGFpbiBxdWVyeSBzdHJpbmcgcGFyYW1ldGVyc1xuICAgKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gcGFnZSBuYW1lXG4gICAqIEByZXR1cm5zIHtzdHJpbmd9IFVSTCBmb3IgdGhlIHBhZ2VcbiAgICovXG4gIGdldEV4cGFuZGVkUGFnZVVSTChwYWdlKSB7XG4gICAgcmV0dXJuIGAvLyR7dGhpcy5wcm9qZWN0fS5vcmcvdy9pbmRleC5waHA/dGl0bGU9JHtlbmNvZGVVUklDb21wb25lbnQocGFnZS5zY29yZSgpKS5yZXBsYWNlKC8nLywgZXNjYXBlKX1gO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCBpbmZvcm1hdGl2ZSBmaWxlbmFtZSB3aXRob3V0IGV4dGVuc2lvbiB0byBiZSB1c2VkIGZvciBleHBvcnQgb3B0aW9uc1xuICAgKiBAcmV0dXJuIHtzdHJpbmd9IGZpbGVuYW1lIHdpdGhvdXQgYW4gZXh0ZW5zaW9uXG4gICAqL1xuICBnZXRFeHBvcnRGaWxlbmFtZSgpIHtcbiAgICBjb25zdCBzdGFydERhdGUgPSB0aGlzLmRhdGVyYW5nZXBpY2tlci5zdGFydERhdGUuc3RhcnRPZignZGF5JykuZm9ybWF0KCdZWVlZTU1ERCcpLFxuICAgICAgZW5kRGF0ZSA9IHRoaXMuZGF0ZXJhbmdlcGlja2VyLmVuZERhdGUuc3RhcnRPZignZGF5JykuZm9ybWF0KCdZWVlZTU1ERCcpO1xuICAgIHJldHVybiBgJHt0aGlzLmFwcH0tJHtzdGFydERhdGV9LSR7ZW5kRGF0ZX1gO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCBhIGZ1bGwgbGluayBmb3IgdGhlIGdpdmVuIHBhZ2UgYW5kIHByb2plY3RcbiAgICogQHBhcmFtICB7c3RyaW5nfSBwYWdlIC0gcGFnZSB0byBsaW5rIHRvXG4gICAqIEBwYXJhbSAge3N0cmluZ30gW3Byb2plY3RdIC0gcHJvamVjdCBsaW5rLCBkZWZhdWx0cyB0byBgdGhpcy5wcm9qZWN0YFxuICAgKiBAcmV0dXJuIHtzdHJpbmd9IEhUTUwgbWFya3VwXG4gICAqL1xuICBnZXRQYWdlTGluayhwYWdlLCBwcm9qZWN0KSB7XG4gICAgcmV0dXJuIGA8YSB0YXJnZXQ9XCJfYmxhbmtcIiBocmVmPVwiJHt0aGlzLmdldFBhZ2VVUkwocGFnZSwgcHJvamVjdCl9XCI+JHtwYWdlLmRlc2NvcmUoKS5lc2NhcGUoKX08L2E+YDtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgdGhlIHdpa2kgVVJMIGdpdmVuIHRoZSBwYWdlIG5hbWVcbiAgICpcbiAgICogQHBhcmFtIHtzdHJpbmd9IHBhZ2UgLSBwYWdlIG5hbWVcbiAgICogQHJldHVybnMge3N0cmluZ30gVVJMIGZvciB0aGUgcGFnZVxuICAgKi9cbiAgZ2V0UGFnZVVSTChwYWdlLCBwcm9qZWN0ID0gdGhpcy5wcm9qZWN0KSB7XG4gICAgcmV0dXJuIGAvLyR7cHJvamVjdC5yZXBsYWNlKC9cXC5vcmckLywgJycpLmVzY2FwZSgpfS5vcmcvd2lraS8ke3BhZ2Uuc2NvcmUoKS5yZXBsYWNlKC8nLywgZXNjYXBlKX1gO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCB0aGUgd2lraSBVUkwgZ2l2ZW4gdGhlIHBhZ2UgbmFtZVxuICAgKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gc2l0ZSAtIHNpdGUgbmFtZSAoZS5nLiBlbi53aWtpcGVkaWEub3JnKVxuICAgKiBAcmV0dXJucyB7c3RyaW5nfSBVUkwgZm9yIHRoZSBzaXRlXG4gICAqL1xuICBnZXRTaXRlTGluayhzaXRlKSB7XG4gICAgcmV0dXJuIGA8YSB0YXJnZXQ9XCJfYmxhbmtcIiBocmVmPVwiLy8ke3NpdGV9Lm9yZ1wiPiR7c2l0ZX08L2E+YDtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgdGhlIHByb2plY3QgbmFtZSAod2l0aG91dCB0aGUgLm9yZylcbiAgICpcbiAgICogQHJldHVybnMge2Jvb2xlYW59IGxhbmcucHJvamVjdG5hbWVcbiAgICovXG4gIGdldCBwcm9qZWN0KCkge1xuICAgIGNvbnN0IHByb2plY3QgPSAkKHRoaXMuY29uZmlnLnByb2plY3RJbnB1dCkudmFsKCk7XG4gICAgLyoqIEdldCB0aGUgZmlyc3QgMiBjaGFyYWN0ZXJzIGZyb20gdGhlIHByb2plY3QgY29kZSB0byBnZXQgdGhlIGxhbmd1YWdlICovXG4gICAgcmV0dXJuIHByb2plY3QgPyBwcm9qZWN0LnRvTG93ZXJDYXNlKCkucmVwbGFjZSgvLm9yZyQvLCAnJykgOiBudWxsO1xuICB9XG5cbiAgZ2V0TG9jYWxlRGF0ZVN0cmluZygpIHtcbiAgICBpZiAoIW5hdmlnYXRvci5sYW5ndWFnZSkge1xuICAgICAgcmV0dXJuIHRoaXMuY29uZmlnLmRlZmF1bHRzLmRhdGVGb3JtYXQ7XG4gICAgfVxuXG4gICAgY29uc3QgZm9ybWF0cyA9IHtcbiAgICAgICdhci1zYSc6ICdERC9NTS9ZWScsXG4gICAgICAnYmctYmcnOiAnREQuTS5ZWVlZJyxcbiAgICAgICdjYS1lcyc6ICdERC9NTS9ZWVlZJyxcbiAgICAgICd6aC10dyc6ICdZWVlZL00vRCcsXG4gICAgICAnY3MtY3onOiAnRC5NLllZWVknLFxuICAgICAgJ2RhLWRrJzogJ0RELU1NLVlZWVknLFxuICAgICAgJ2RlLWRlJzogJ0RELk1NLllZWVknLFxuICAgICAgJ2VsLWdyJzogJ0QvTS9ZWVlZJyxcbiAgICAgICdlbi11cyc6ICdNL0QvWVlZWScsXG4gICAgICAnZmktZmknOiAnRC5NLllZWVknLFxuICAgICAgJ2ZyLWZyJzogJ0REL01NL1lZWVknLFxuICAgICAgJ2hlLWlsJzogJ0REL01NL1lZWVknLFxuICAgICAgJ2h1LWh1JzogJ1lZWVkuIE1NLiBERC4nLFxuICAgICAgJ2lzLWlzJzogJ0QuTS5ZWVlZJyxcbiAgICAgICdpdC1pdCc6ICdERC9NTS9ZWVlZJyxcbiAgICAgICdqYS1qcCc6ICdZWVlZL01NL0REJyxcbiAgICAgICdrby1rcic6ICdZWVlZLU1NLUREJyxcbiAgICAgICdubC1ubCc6ICdELU0tWVlZWScsXG4gICAgICAnbmItbm8nOiAnREQuTU0uWVlZWScsXG4gICAgICAncGwtcGwnOiAnWVlZWS1NTS1ERCcsXG4gICAgICAncHQtYnInOiAnRC9NL1lZWVknLFxuICAgICAgJ3JvLXJvJzogJ0RELk1NLllZWVknLFxuICAgICAgJ3J1LXJ1JzogJ0RELk1NLllZWVknLFxuICAgICAgJ2hyLWhyJzogJ0QuTS5ZWVlZJyxcbiAgICAgICdzay1zayc6ICdELiBNLiBZWVlZJyxcbiAgICAgICdzcS1hbCc6ICdZWVlZLU1NLUREJyxcbiAgICAgICdzdi1zZSc6ICdZWVlZLU1NLUREJyxcbiAgICAgICd0aC10aCc6ICdEL00vWVlZWScsXG4gICAgICAndHItdHInOiAnREQuTU0uWVlZWScsXG4gICAgICAndXItcGsnOiAnREQvTU0vWVlZWScsXG4gICAgICAnaWQtaWQnOiAnREQvTU0vWVlZWScsXG4gICAgICAndWstdWEnOiAnREQuTU0uWVlZWScsXG4gICAgICAnYmUtYnknOiAnREQuTU0uWVlZWScsXG4gICAgICAnc2wtc2knOiAnRC5NLllZWVknLFxuICAgICAgJ2V0LWVlJzogJ0QuTU0uWVlZWScsXG4gICAgICAnbHYtbHYnOiAnWVlZWS5NTS5ERC4nLFxuICAgICAgJ2x0LWx0JzogJ1lZWVkuTU0uREQnLFxuICAgICAgJ2ZhLWlyJzogJ01NL0REL1lZWVknLFxuICAgICAgJ3ZpLXZuJzogJ0REL01NL1lZWVknLFxuICAgICAgJ2h5LWFtJzogJ0RELk1NLllZWVknLFxuICAgICAgJ2F6LWxhdG4tYXonOiAnREQuTU0uWVlZWScsXG4gICAgICAnZXUtZXMnOiAnWVlZWS9NTS9ERCcsXG4gICAgICAnbWstbWsnOiAnREQuTU0uWVlZWScsXG4gICAgICAnYWYtemEnOiAnWVlZWS9NTS9ERCcsXG4gICAgICAna2EtZ2UnOiAnREQuTU0uWVlZWScsXG4gICAgICAnZm8tZm8nOiAnREQtTU0tWVlZWScsXG4gICAgICAnaGktaW4nOiAnREQtTU0tWVlZWScsXG4gICAgICAnbXMtbXknOiAnREQvTU0vWVlZWScsXG4gICAgICAna2sta3onOiAnREQuTU0uWVlZWScsXG4gICAgICAna3kta2cnOiAnREQuTU0uWVknLFxuICAgICAgJ3N3LWtlJzogJ00vZC9ZWVlZJyxcbiAgICAgICd1ei1sYXRuLXV6JzogJ0REL01NIFlZWVknLFxuICAgICAgJ3R0LXJ1JzogJ0RELk1NLllZWVknLFxuICAgICAgJ3BhLWluJzogJ0RELU1NLVlZJyxcbiAgICAgICdndS1pbic6ICdERC1NTS1ZWScsXG4gICAgICAndGEtaW4nOiAnREQtTU0tWVlZWScsXG4gICAgICAndGUtaW4nOiAnREQtTU0tWVknLFxuICAgICAgJ2tuLWluJzogJ0RELU1NLVlZJyxcbiAgICAgICdtci1pbic6ICdERC1NTS1ZWVlZJyxcbiAgICAgICdzYS1pbic6ICdERC1NTS1ZWVlZJyxcbiAgICAgICdtbi1tbic6ICdZWS5NTS5ERCcsXG4gICAgICAnZ2wtZXMnOiAnREQvTU0vWVknLFxuICAgICAgJ2tvay1pbic6ICdERC1NTS1ZWVlZJyxcbiAgICAgICdzeXItc3knOiAnREQvTU0vWVlZWScsXG4gICAgICAnZHYtbXYnOiAnREQvTU0vWVknLFxuICAgICAgJ2FyLWlxJzogJ0REL01NL1lZWVknLFxuICAgICAgJ3poLWNuJzogJ1lZWVkvTS9EJyxcbiAgICAgICdkZS1jaCc6ICdERC5NTS5ZWVlZJyxcbiAgICAgICdlbi1nYic6ICdERC9NTS9ZWVlZJyxcbiAgICAgICdlcy1teCc6ICdERC9NTS9ZWVlZJyxcbiAgICAgICdmci1iZSc6ICdEL01NL1lZWVknLFxuICAgICAgJ2l0LWNoJzogJ0RELk1NLllZWVknLFxuICAgICAgJ25sLWJlJzogJ0QvTU0vWVlZWScsXG4gICAgICAnbm4tbm8nOiAnREQuTU0uWVlZWScsXG4gICAgICAncHQtcHQnOiAnREQtTU0tWVlZWScsXG4gICAgICAnc3ItbGF0bi1jcyc6ICdELk0uWVlZWScsXG4gICAgICAnc3YtZmknOiAnRC5NLllZWVknLFxuICAgICAgJ2F6LWN5cmwtYXonOiAnREQuTU0uWVlZWScsXG4gICAgICAnbXMtYm4nOiAnREQvTU0vWVlZWScsXG4gICAgICAndXotY3lybC11eic6ICdERC5NTS5ZWVlZJyxcbiAgICAgICdhci1lZyc6ICdERC9NTS9ZWVlZJyxcbiAgICAgICd6aC1oayc6ICdEL00vWVlZWScsXG4gICAgICAnZGUtYXQnOiAnREQuTU0uWVlZWScsXG4gICAgICAnZW4tYXUnOiAnRC9NTS9ZWVlZJyxcbiAgICAgICdlcy1lcyc6ICdERC9NTS9ZWVlZJyxcbiAgICAgICdmci1jYSc6ICdZWVlZLU1NLUREJyxcbiAgICAgICdzci1jeXJsLWNzJzogJ0QuTS5ZWVlZJyxcbiAgICAgICdhci1seSc6ICdERC9NTS9ZWVlZJyxcbiAgICAgICd6aC1zZyc6ICdEL00vWVlZWScsXG4gICAgICAnZGUtbHUnOiAnREQuTU0uWVlZWScsXG4gICAgICAnZW4tY2EnOiAnREQvTU0vWVlZWScsXG4gICAgICAnZXMtZ3QnOiAnREQvTU0vWVlZWScsXG4gICAgICAnZnItY2gnOiAnREQuTU0uWVlZWScsXG4gICAgICAnYXItZHonOiAnREQtTU0tWVlZWScsXG4gICAgICAnemgtbW8nOiAnRC9NL1lZWVknLFxuICAgICAgJ2RlLWxpJzogJ0RELk1NLllZWVknLFxuICAgICAgJ2VuLW56JzogJ0QvTU0vWVlZWScsXG4gICAgICAnZXMtY3InOiAnREQvTU0vWVlZWScsXG4gICAgICAnZnItbHUnOiAnREQvTU0vWVlZWScsXG4gICAgICAnYXItbWEnOiAnREQtTU0tWVlZWScsXG4gICAgICAnZW4taWUnOiAnREQvTU0vWVlZWScsXG4gICAgICAnZXMtcGEnOiAnTU0vREQvWVlZWScsXG4gICAgICAnZnItbWMnOiAnREQvTU0vWVlZWScsXG4gICAgICAnYXItdG4nOiAnREQtTU0tWVlZWScsXG4gICAgICAnZW4temEnOiAnWVlZWS9NTS9ERCcsXG4gICAgICAnZXMtZG8nOiAnREQvTU0vWVlZWScsXG4gICAgICAnYXItb20nOiAnREQvTU0vWVlZWScsXG4gICAgICAnZW4tam0nOiAnREQvTU0vWVlZWScsXG4gICAgICAnZXMtdmUnOiAnREQvTU0vWVlZWScsXG4gICAgICAnYXIteWUnOiAnREQvTU0vWVlZWScsXG4gICAgICAnZW4tMDI5JzogJ01NL0REL1lZWVknLFxuICAgICAgJ2VzLWNvJzogJ0REL01NL1lZWVknLFxuICAgICAgJ2FyLXN5JzogJ0REL01NL1lZWVknLFxuICAgICAgJ2VuLWJ6JzogJ0REL01NL1lZWVknLFxuICAgICAgJ2VzLXBlJzogJ0REL01NL1lZWVknLFxuICAgICAgJ2FyLWpvJzogJ0REL01NL1lZWVknLFxuICAgICAgJ2VuLXR0JzogJ0REL01NL1lZWVknLFxuICAgICAgJ2VzLWFyJzogJ0REL01NL1lZWVknLFxuICAgICAgJ2FyLWxiJzogJ0REL01NL1lZWVknLFxuICAgICAgJ2VuLXp3JzogJ00vRC9ZWVlZJyxcbiAgICAgICdlcy1lYyc6ICdERC9NTS9ZWVlZJyxcbiAgICAgICdhci1rdyc6ICdERC9NTS9ZWVlZJyxcbiAgICAgICdlbi1waCc6ICdNL0QvWVlZWScsXG4gICAgICAnZXMtY2wnOiAnREQtTU0tWVlZWScsXG4gICAgICAnYXItYWUnOiAnREQvTU0vWVlZWScsXG4gICAgICAnZXMtdXknOiAnREQvTU0vWVlZWScsXG4gICAgICAnYXItYmgnOiAnREQvTU0vWVlZWScsXG4gICAgICAnZXMtcHknOiAnREQvTU0vWVlZWScsXG4gICAgICAnYXItcWEnOiAnREQvTU0vWVlZWScsXG4gICAgICAnZXMtYm8nOiAnREQvTU0vWVlZWScsXG4gICAgICAnZXMtc3YnOiAnREQvTU0vWVlZWScsXG4gICAgICAnZXMtaG4nOiAnREQvTU0vWVlZWScsXG4gICAgICAnZXMtbmknOiAnREQvTU0vWVlZWScsXG4gICAgICAnZXMtcHInOiAnREQvTU0vWVlZWScsXG4gICAgICAnYW0tZXQnOiAnRC9NL1lZWVknLFxuICAgICAgJ3R6bS1sYXRuLWR6JzogJ0RELU1NLVlZWVknLFxuICAgICAgJ2l1LWxhdG4tY2EnOiAnRC9NTS9ZWVlZJyxcbiAgICAgICdzbWEtbm8nOiAnREQuTU0uWVlZWScsXG4gICAgICAnbW4tbW9uZy1jbic6ICdZWVlZL00vRCcsXG4gICAgICAnZ2QtZ2InOiAnREQvTU0vWVlZWScsXG4gICAgICAnZW4tbXknOiAnRC9NL1lZWVknLFxuICAgICAgJ3Bycy1hZic6ICdERC9NTS9ZWScsXG4gICAgICAnYm4tYmQnOiAnREQtTU0tWVknLFxuICAgICAgJ3dvLXNuJzogJ0REL01NL1lZWVknLFxuICAgICAgJ3J3LXJ3JzogJ00vRC9ZWVlZJyxcbiAgICAgICdxdXQtZ3QnOiAnREQvTU0vWVlZWScsXG4gICAgICAnc2FoLXJ1JzogJ01NLkRELllZWVknLFxuICAgICAgJ2dzdy1mcic6ICdERC9NTS9ZWVlZJyxcbiAgICAgICdjby1mcic6ICdERC9NTS9ZWVlZJyxcbiAgICAgICdvYy1mcic6ICdERC9NTS9ZWVlZJyxcbiAgICAgICdtaS1ueic6ICdERC9NTS9ZWVlZJyxcbiAgICAgICdnYS1pZSc6ICdERC9NTS9ZWVlZJyxcbiAgICAgICdzZS1zZSc6ICdZWVlZLU1NLUREJyxcbiAgICAgICdici1mcic6ICdERC9NTS9ZWVlZJyxcbiAgICAgICdzbW4tZmknOiAnRC5NLllZWVknLFxuICAgICAgJ21vaC1jYSc6ICdNL0QvWVlZWScsXG4gICAgICAnYXJuLWNsJzogJ0RELU1NLVlZWVknLFxuICAgICAgJ2lpLWNuJzogJ1lZWVkvTS9EJyxcbiAgICAgICdkc2ItZGUnOiAnRC4gTS4gWVlZWScsXG4gICAgICAnaWctbmcnOiAnRC9NL1lZWVknLFxuICAgICAgJ2tsLWdsJzogJ0RELU1NLVlZWVknLFxuICAgICAgJ2xiLWx1JzogJ0REL01NL1lZWVknLFxuICAgICAgJ2JhLXJ1JzogJ0RELk1NLllZJyxcbiAgICAgICduc28temEnOiAnWVlZWS9NTS9ERCcsXG4gICAgICAncXV6LWJvJzogJ0REL01NL1lZWVknLFxuICAgICAgJ3lvLW5nJzogJ0QvTS9ZWVlZJyxcbiAgICAgICdoYS1sYXRuLW5nJzogJ0QvTS9ZWVlZJyxcbiAgICAgICdmaWwtcGgnOiAnTS9EL1lZWVknLFxuICAgICAgJ3BzLWFmJzogJ0REL01NL1lZJyxcbiAgICAgICdmeS1ubCc6ICdELU0tWVlZWScsXG4gICAgICAnbmUtbnAnOiAnTS9EL1lZWVknLFxuICAgICAgJ3NlLW5vJzogJ0RELk1NLllZWVknLFxuICAgICAgJ2l1LWNhbnMtY2EnOiAnRC9NL1lZWVknLFxuICAgICAgJ3NyLWxhdG4tcnMnOiAnRC5NLllZWVknLFxuICAgICAgJ3NpLWxrJzogJ1lZWVktTU0tREQnLFxuICAgICAgJ3NyLWN5cmwtcnMnOiAnRC5NLllZWVknLFxuICAgICAgJ2xvLWxhJzogJ0REL01NL1lZWVknLFxuICAgICAgJ2ttLWtoJzogJ1lZWVktTU0tREQnLFxuICAgICAgJ2N5LWdiJzogJ0REL01NL1lZWVknLFxuICAgICAgJ2JvLWNuJzogJ1lZWVkvTS9EJyxcbiAgICAgICdzbXMtZmknOiAnRC5NLllZWVknLFxuICAgICAgJ2FzLWluJzogJ0RELU1NLVlZWVknLFxuICAgICAgJ21sLWluJzogJ0RELU1NLVlZJyxcbiAgICAgICdlbi1pbic6ICdERC1NTS1ZWVlZJyxcbiAgICAgICdvci1pbic6ICdERC1NTS1ZWScsXG4gICAgICAnYm4taW4nOiAnREQtTU0tWVknLFxuICAgICAgJ3RrLXRtJzogJ0RELk1NLllZJyxcbiAgICAgICdicy1sYXRuLWJhJzogJ0QuTS5ZWVlZJyxcbiAgICAgICdtdC1tdCc6ICdERC9NTS9ZWVlZJyxcbiAgICAgICdzci1jeXJsLW1lJzogJ0QuTS5ZWVlZJyxcbiAgICAgICdzZS1maSc6ICdELk0uWVlZWScsXG4gICAgICAnenUtemEnOiAnWVlZWS9NTS9ERCcsXG4gICAgICAneGgtemEnOiAnWVlZWS9NTS9ERCcsXG4gICAgICAndG4temEnOiAnWVlZWS9NTS9ERCcsXG4gICAgICAnaHNiLWRlJzogJ0QuIE0uIFlZWVknLFxuICAgICAgJ2JzLWN5cmwtYmEnOiAnRC5NLllZWVknLFxuICAgICAgJ3RnLWN5cmwtdGonOiAnREQuTU0ueXknLFxuICAgICAgJ3NyLWxhdG4tYmEnOiAnRC5NLllZWVknLFxuICAgICAgJ3Ntai1ubyc6ICdERC5NTS5ZWVlZJyxcbiAgICAgICdybS1jaCc6ICdERC9NTS9ZWVlZJyxcbiAgICAgICdzbWotc2UnOiAnWVlZWS1NTS1ERCcsXG4gICAgICAncXV6LWVjJzogJ0REL01NL1lZWVknLFxuICAgICAgJ3F1ei1wZSc6ICdERC9NTS9ZWVlZJyxcbiAgICAgICdoci1iYSc6ICdELk0uWVlZWS4nLFxuICAgICAgJ3NyLWxhdG4tbWUnOiAnRC5NLllZWVknLFxuICAgICAgJ3NtYS1zZSc6ICdZWVlZLU1NLUREJyxcbiAgICAgICdlbi1zZyc6ICdEL00vWVlZWScsXG4gICAgICAndWctY24nOiAnWVlZWS1NLUQnLFxuICAgICAgJ3NyLWN5cmwtYmEnOiAnRC5NLllZWVknLFxuICAgICAgJ2VzLXVzJzogJ00vRC9ZWVlZJ1xuICAgIH07XG5cbiAgICBjb25zdCBrZXkgPSBuYXZpZ2F0b3IubGFuZ3VhZ2UudG9Mb3dlckNhc2UoKTtcbiAgICByZXR1cm4gZm9ybWF0c1trZXldIHx8IHRoaXMuY29uZmlnLmRlZmF1bHRzLmRhdGVGb3JtYXQ7XG4gIH1cblxuICAvKipcbiAgICogR2V0IGEgdmFsdWUgZnJvbSBsb2NhbFN0b3JhZ2UsIHVzaW5nIGEgdGVtcG9yYXJ5IHN0b3JhZ2UgaWYgbG9jYWxTdG9yYWdlIGlzIG5vdCBzdXBwb3J0ZWRcbiAgICogQHBhcmFtIHtzdHJpbmd9IGtleSAtIGtleSBmb3IgdGhlIHZhbHVlIHRvIHJldHJpZXZlXG4gICAqIEByZXR1cm5zIHtNaXhlZH0gc3RvcmVkIHZhbHVlXG4gICAqL1xuICBnZXRGcm9tTG9jYWxTdG9yYWdlKGtleSkge1xuICAgIC8vIFNlZSBpZiBsb2NhbFN0b3JhZ2UgaXMgc3VwcG9ydGVkIGFuZCBlbmFibGVkXG4gICAgdHJ5IHtcbiAgICAgIHJldHVybiBsb2NhbFN0b3JhZ2UuZ2V0SXRlbShrZXkpO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgcmV0dXJuIHN0b3JhZ2Vba2V5XTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogR2V0IFVSTCB0byBmaWxlIGEgcmVwb3J0IG9uIE1ldGEsIHByZWxvYWRlZCB3aXRoIHBlcm1hbGlua1xuICAgKiBAcGFyYW0ge1N0cmluZ30gW3BoYWJQYXN0ZV0gVVJMIHRvIGF1dG8tZ2VuZXJhdGVkIGVycm9yIHJlcG9ydCBvbiBQaGFicmljYXRvclxuICAgKiBAcmV0dXJuIHtTdHJpbmd9IFVSTFxuICAgKi9cbiAgZ2V0QnVnUmVwb3J0VVJMKHBoYWJQYXN0ZSkge1xuICAgIGNvbnN0IHJlcG9ydFVSTCA9ICdodHRwczovL21ldGEud2lraW1lZGlhLm9yZy93L2luZGV4LnBocD90aXRsZT1UYWxrOlBhZ2V2aWV3c19BbmFseXNpcyZhY3Rpb249ZWRpdCcgK1xuICAgICAgYCZzZWN0aW9uPW5ldyZwcmVsb2FkdGl0bGU9JHt0aGlzLmFwcC51cGNhc2UoKX0gYnVnIHJlcG9ydGA7XG5cbiAgICBpZiAocGhhYlBhc3RlKSB7XG4gICAgICByZXR1cm4gYCR7cmVwb3J0VVJMfSZwcmVsb2FkPVRhbGs6UGFnZXZpZXdzX0FuYWx5c2lzL1ByZWxvYWQmcHJlbG9hZHBhcmFtc1tdPSR7cGhhYlBhc3RlfWA7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiByZXBvcnRVUkw7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEdldCBnZW5lcmFsIGluZm9ybWF0aW9uIGFib3V0IGEgcHJvamVjdCwgc3VjaCBhcyBuYW1lc3BhY2VzLCB0aXRsZSBvZiB0aGUgbWFpbiBwYWdlLCBldGMuXG4gICAqIERhdGEgcmV0dXJuZWQgYnkgdGhlIGFwaSBpcyBhbHNvIHN0b3JlZCBpbiB0aGlzLnNpdGVJbmZvXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBwcm9qZWN0IC0gcHJvamVjdCBzdWNoIGFzIGVuLndpa2lwZWRpYSAod2l0aCBvciB3aXRob3V0IC5vcmcpXG4gICAqIEByZXR1cm5zIHtEZWZlcnJlZH0gcHJvbWlzZSByZXNvbHZpbmcgd2l0aCBzaXRlaW5mbyxcbiAgICogICBhbG9uZyB3aXRoIGFueSBvdGhlciBjYWNoZWQgc2l0ZWluZm8gZm9yIG90aGVyIHByb2plY3RzXG4gICAqL1xuICBmZXRjaFNpdGVJbmZvKHByb2plY3QpIHtcbiAgICBwcm9qZWN0ID0gcHJvamVjdC5yZXBsYWNlKC9cXC5vcmckLywgJycpO1xuICAgIGNvbnN0IGRmZCA9ICQuRGVmZXJyZWQoKSxcbiAgICAgIGNhY2hlS2V5ID0gYHBhZ2V2aWV3cy1zaXRlaW5mby0ke3Byb2plY3R9YDtcblxuICAgIGlmICh0aGlzLnNpdGVJbmZvW3Byb2plY3RdKSByZXR1cm4gZGZkLnJlc29sdmUodGhpcy5zaXRlSW5mbyk7XG5cbiAgICAvLyB1c2UgY2FjaGVkIHNpdGUgaW5mbyBpZiBwcmVzZW50XG4gICAgaWYgKHNpbXBsZVN0b3JhZ2UuaGFzS2V5KGNhY2hlS2V5KSkge1xuICAgICAgdGhpcy5zaXRlSW5mb1twcm9qZWN0XSA9IHNpbXBsZVN0b3JhZ2UuZ2V0KGNhY2hlS2V5KTtcbiAgICAgIGRmZC5yZXNvbHZlKHRoaXMuc2l0ZUluZm8pO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBvdGhlcndpc2UgZmV0Y2ggc2l0ZWluZm8gYW5kIHN0b3JlIGluIGNhY2hlXG4gICAgICAkLmFqYXgoe1xuICAgICAgICB1cmw6IGBodHRwczovLyR7cHJvamVjdH0ub3JnL3cvYXBpLnBocGAsXG4gICAgICAgIGRhdGE6IHtcbiAgICAgICAgICBhY3Rpb246ICdxdWVyeScsXG4gICAgICAgICAgbWV0YTogJ3NpdGVpbmZvJyxcbiAgICAgICAgICBzaXByb3A6ICdnZW5lcmFsfG5hbWVzcGFjZXMnLFxuICAgICAgICAgIGZvcm1hdDogJ2pzb24nXG4gICAgICAgIH0sXG4gICAgICAgIGRhdGFUeXBlOiAnanNvbnAnXG4gICAgICB9KS5kb25lKGRhdGEgPT4ge1xuICAgICAgICB0aGlzLnNpdGVJbmZvW3Byb2plY3RdID0gZGF0YS5xdWVyeTtcblxuICAgICAgICAvLyBjYWNoZSBmb3Igb25lIHdlZWsgKFRUTCBpcyBpbiBtaWxsaXNlY29uZHMpXG4gICAgICAgIHNpbXBsZVN0b3JhZ2Uuc2V0KGNhY2hlS2V5LCB0aGlzLnNpdGVJbmZvW3Byb2plY3RdLCB7VFRMOiAxMDAwICogNjAgKiA2MCAqIDI0ICogN30pO1xuXG4gICAgICAgIGRmZC5yZXNvbHZlKHRoaXMuc2l0ZUluZm8pO1xuICAgICAgfSkuZmFpbChkYXRhID0+IHtcbiAgICAgICAgZGZkLnJlamVjdChkYXRhKTtcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIHJldHVybiBkZmQ7XG4gIH1cblxuICAvKipcbiAgICogSGVscGVyIHRvIGdldCBzaXRlaW5mbyBmcm9tIHRoaXMuc2l0ZUluZm8gZm9yIGdpdmVuIHByb2plY3QsIHdpdGggb3Igd2l0aG91dCAub3JnXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBwcm9qZWN0IC0gcHJvamVjdCBuYW1lLCB3aXRoIG9yIHdpdGhvdXQgLm9yZ1xuICAgKiBAcmV0dXJucyB7T2JqZWN0fHVuZGVmaW5lZH0gc2l0ZSBpbmZvcm1hdGlvbiBpZiBwcmVzZW50XG4gICAqL1xuICBnZXRTaXRlSW5mbyhwcm9qZWN0KSB7XG4gICAgcmV0dXJuIHRoaXMuc2l0ZUluZm9bcHJvamVjdC5yZXBsYWNlKC9cXC5vcmckLywgJycpXTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgdXNlciBhZ2VudCwgaWYgc3VwcG9ydGVkXG4gICAqIEByZXR1cm5zIHtzdHJpbmd9IHVzZXItYWdlbnRcbiAgICovXG4gIGdldFVzZXJBZ2VudCgpIHtcbiAgICByZXR1cm4gbmF2aWdhdG9yLnVzZXJBZ2VudCA/IG5hdmlnYXRvci51c2VyQWdlbnQgOiAnVW5rbm93bic7XG4gIH1cblxuICAvKipcbiAgICogU2V0IGEgdmFsdWUgdG8gbG9jYWxTdG9yYWdlLCB1c2luZyBhIHRlbXBvcmFyeSBzdG9yYWdlIGlmIGxvY2FsU3RvcmFnZSBpcyBub3Qgc3VwcG9ydGVkXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgLSBrZXkgZm9yIHRoZSB2YWx1ZSB0byBzZXRcbiAgICogQHBhcmFtIHtNaXhlZH0gdmFsdWUgLSB2YWx1ZSB0byBzdG9yZVxuICAgKiBAcmV0dXJucyB7TWl4ZWR9IHN0b3JlZCB2YWx1ZVxuICAgKi9cbiAgc2V0TG9jYWxTdG9yYWdlKGtleSwgdmFsdWUpIHtcbiAgICAvLyBTZWUgaWYgbG9jYWxTdG9yYWdlIGlzIHN1cHBvcnRlZCBhbmQgZW5hYmxlZFxuICAgIHRyeSB7XG4gICAgICByZXR1cm4gbG9jYWxTdG9yYWdlLnNldEl0ZW0oa2V5LCB2YWx1ZSk7XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICByZXR1cm4gc3RvcmFnZVtrZXldID0gdmFsdWU7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEdlbmVyYXRlIGEgdW5pcXVlIGhhc2ggY29kZSBmcm9tIGdpdmVuIHN0cmluZ1xuICAgKiBAcGFyYW0gIHtTdHJpbmd9IHN0ciAtIHRvIGJlIGhhc2hlZFxuICAgKiBAcmV0dXJuIHtTdHJpbmd9IHRoZSBoYXNoXG4gICAqL1xuICBoYXNoQ29kZShzdHIpIHtcbiAgICByZXR1cm4gc3RyLnNwbGl0KCcnKS5yZWR1Y2UoKHByZXZIYXNoLCBjdXJyVmFsKSA9PlxuICAgICAgKChwcmV2SGFzaCA8PCA1KSAtIHByZXZIYXNoKSArIGN1cnJWYWwuY2hhckNvZGVBdCgwKSwgMCk7XG4gIH1cblxuICAvKipcbiAgICogSXMgdGhpcyBvbmUgb2YgdGhlIGNoYXJ0LXZpZXcgYXBwcyAodGhhdCBkb2VzIG5vdCBoYXZlIGEgbGlzdCB2aWV3KT9cbiAgICogQHJldHVybiB7Qm9vbGVhbn0gdHJ1ZSBvciBmYWxzZVxuICAgKi9cbiAgaXNDaGFydEFwcCgpIHtcbiAgICByZXR1cm4gIXRoaXMuaXNMaXN0QXBwKCk7XG4gIH1cblxuICAvKipcbiAgICogSXMgdGhpcyBvbmUgb2YgdGhlIGxpc3QtdmlldyBhcHBzP1xuICAgKiBAcmV0dXJuIHtCb29sZWFufSB0cnVlIG9yIGZhbHNlXG4gICAqL1xuICBpc0xpc3RBcHAoKSB7XG4gICAgcmV0dXJuIFsnbGFuZ3ZpZXdzJywgJ21hc3N2aWV3cycsICdyZWRpcmVjdHZpZXdzJ10uaW5jbHVkZXModGhpcy5hcHApO1xuICB9XG5cbiAgLyoqXG4gICAqIFRlc3QgaWYgdGhlIGN1cnJlbnQgcHJvamVjdCBpcyBhIG11bHRpbGluZ3VhbCBwcm9qZWN0XG4gICAqIEByZXR1cm5zIHtCb29sZWFufSBpcyBtdWx0aWxpbmd1YWwgb3Igbm90XG4gICAqL1xuICBpc011bHRpbGFuZ1Byb2plY3QoKSB7XG4gICAgcmV0dXJuIG5ldyBSZWdFeHAoYC4qP1xcXFwuKCR7UHYubXVsdGlsYW5nUHJvamVjdHMuam9pbignfCcpfSlgKS50ZXN0KHRoaXMucHJvamVjdCk7XG4gIH1cblxuICAvKipcbiAgICogTWFwIG5vcm1hbGl6ZWQgcGFnZXMgZnJvbSBBUEkgaW50byBhIHN0cmluZyBvZiBwYWdlIG5hbWVzXG4gICAqIFVzZWQgaW4gbm9ybWFsaXplUGFnZU5hbWVzKClcbiAgICpcbiAgICogQHBhcmFtIHthcnJheX0gcGFnZXMgLSBhcnJheSBvZiBwYWdlIG5hbWVzXG4gICAqIEBwYXJhbSB7YXJyYXl9IG5vcm1hbGl6ZWRQYWdlcyAtIGFycmF5IG9mIG5vcm1hbGl6ZWQgbWFwcGluZ3MgcmV0dXJuZWQgYnkgdGhlIEFQSVxuICAgKiBAcmV0dXJucyB7YXJyYXl9IHBhZ2VzIHdpdGggdGhlIG5ldyBub3JtYWxpemVkIG5hbWVzLCBpZiBnaXZlblxuICAgKi9cbiAgbWFwTm9ybWFsaXplZFBhZ2VOYW1lcyhwYWdlcywgbm9ybWFsaXplZFBhZ2VzKSB7XG4gICAgbm9ybWFsaXplZFBhZ2VzLmZvckVhY2gobm9ybWFsUGFnZSA9PiB7XG4gICAgICAvKiogZG8gaXQgdGhpcyB3YXkgdG8gcHJlc2VydmUgb3JkZXJpbmcgb2YgcGFnZXMgKi9cbiAgICAgIHBhZ2VzID0gcGFnZXMubWFwKHBhZ2UgPT4ge1xuICAgICAgICBpZiAobm9ybWFsUGFnZS5mcm9tID09PSBwYWdlKSB7XG4gICAgICAgICAgcmV0dXJuIG5vcm1hbFBhZ2UudG87XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuIHBhZ2U7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH0pO1xuICAgIHJldHVybiBwYWdlcztcbiAgfVxuXG4gIC8qKlxuICAgKiBMaXN0IG9mIHZhbGlkIG11bHRpbGluZ3VhbCBwcm9qZWN0c1xuICAgKiBAcmV0dXJuIHtBcnJheX0gYmFzZSBwcm9qZWN0cywgd2l0aG91dCB0aGUgbGFuZ3VhZ2VcbiAgICovXG4gIHN0YXRpYyBnZXQgbXVsdGlsYW5nUHJvamVjdHMoKSB7XG4gICAgcmV0dXJuIFtcbiAgICAgICd3aWtpcGVkaWEnLFxuICAgICAgJ3dpa2lib29rcycsXG4gICAgICAnd2lraW5ld3MnLFxuICAgICAgJ3dpa2lxdW90ZScsXG4gICAgICAnd2lraXNvdXJjZScsXG4gICAgICAnd2lraXZlcnNpdHknLFxuICAgICAgJ3dpa2l2b3lhZ2UnXG4gICAgXTtcbiAgfVxuXG4gIC8qKlxuICAgKiBNYWtlIG1hc3MgcmVxdWVzdHMgdG8gTWVkaWFXaWtpIEFQSVxuICAgKiBUaGUgQVBJIG5vcm1hbGx5IGxpbWl0cyB0byA1MDAgcGFnZXMsIGJ1dCBnaXZlcyB5b3UgYSAnY29udGludWUnIHZhbHVlXG4gICAqICAgdG8gZmluaXNoIGl0ZXJhdGluZyB0aHJvdWdoIHRoZSByZXNvdXJjZS5cbiAgICogQHBhcmFtIHtPYmplY3R9IHBhcmFtcyAtIHBhcmFtZXRlcnMgdG8gcGFzcyB0byB0aGUgQVBJXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBwcm9qZWN0IC0gcHJvamVjdCB0byBxdWVyeSwgZS5nLiBlbi53aWtpcGVkaWEgKC5vcmcgaXMgb3B0aW9uYWwpXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBbY29udGludWVLZXldIC0gdGhlIGtleSB0byBsb29rIGluIHRoZSBjb250aW51ZSBoYXNoLCBpZiBwcmVzZW50IChlLmcuIGNtY29udGludWUgZm9yIEFQSTpDYXRlZ29yeW1lbWJlcnMpXG4gICAqIEBwYXJhbSB7U3RyaW5nfEZ1bmN0aW9ufSBbZGF0YUtleV0gLSB0aGUga2V5IGZvciB0aGUgbWFpbiBjaHVuayBvZiBkYXRhLCBpbiB0aGUgcXVlcnkgaGFzaCAoZS5nLiBjYXRlZ29yeW1lbWJlcnMgZm9yIEFQSTpDYXRlZ29yeW1lbWJlcnMpXG4gICAqICAgSWYgdGhpcyBpcyBhIGZ1bmN0aW9uIGl0IGlzIGdpdmVuIHRoZSByZXNwb25zZSBkYXRhLCBhbmQgZXhwZWN0ZWQgdG8gcmV0dXJuIHRoZSBkYXRhIHdlIHdhbnQgdG8gY29uY2F0ZW50YXRlLlxuICAgKiBAcGFyYW0ge051bWJlcn0gW2xpbWl0XSAtIG1heCBudW1iZXIgb2YgcGFnZXMgdG8gZmV0Y2hcbiAgICogQHJldHVybiB7RGVmZXJyZWR9IHByb21pc2UgcmVzb2x2aW5nIHdpdGggZGF0YVxuICAgKi9cbiAgbWFzc0FwaShwYXJhbXMsIHByb2plY3QsIGNvbnRpbnVlS2V5ID0gJ2NvbnRpbnVlJywgZGF0YUtleSwgbGltaXQgPSB0aGlzLmNvbmZpZy5hcGlMaW1pdCkge1xuICAgIGlmICghL1xcLm9yZyQvLnRlc3QocHJvamVjdCkpIHByb2plY3QgKz0gJy5vcmcnO1xuXG4gICAgY29uc3QgZGZkID0gJC5EZWZlcnJlZCgpO1xuICAgIGxldCByZXNvbHZlRGF0YSA9IHtcbiAgICAgIHBhZ2VzOiBbXVxuICAgIH07XG5cbiAgICBjb25zdCBtYWtlUmVxdWVzdCA9IGNvbnRpbnVlVmFsdWUgPT4ge1xuICAgICAgbGV0IHJlcXVlc3REYXRhID0gT2JqZWN0LmFzc2lnbih7XG4gICAgICAgIGFjdGlvbjogJ3F1ZXJ5JyxcbiAgICAgICAgZm9ybWF0OiAnanNvbicsXG4gICAgICAgIGZvcm1hdHZlcnNpb246ICcyJ1xuICAgICAgfSwgcGFyYW1zKTtcblxuICAgICAgaWYgKGNvbnRpbnVlVmFsdWUpIHJlcXVlc3REYXRhW2NvbnRpbnVlS2V5XSA9IGNvbnRpbnVlVmFsdWU7XG5cbiAgICAgIGNvbnN0IHByb21pc2UgPSAkLmFqYXgoe1xuICAgICAgICB1cmw6IGBodHRwczovLyR7cHJvamVjdH0vdy9hcGkucGhwYCxcbiAgICAgICAganNvbnA6ICdjYWxsYmFjaycsXG4gICAgICAgIGRhdGFUeXBlOiAnanNvbnAnLFxuICAgICAgICBkYXRhOiByZXF1ZXN0RGF0YVxuICAgICAgfSk7XG5cbiAgICAgIHByb21pc2UuZG9uZShkYXRhID0+IHtcbiAgICAgICAgLy8gc29tZSBmYWlsdXJlcyBjb21lIGJhY2sgYXMgMjAwcywgc28gd2Ugc3RpbGwgcmVzb2x2ZSBhbmQgbGV0IHRoZSBsb2NhbCBhcHAgaGFuZGxlIGl0XG4gICAgICAgIGlmIChkYXRhLmVycm9yKSByZXR1cm4gZGZkLnJlc29sdmUoZGF0YSk7XG5cbiAgICAgICAgbGV0IGlzRmluaXNoZWQ7XG5cbiAgICAgICAgLy8gYWxsb3cgY3VzdG9tIGZ1bmN0aW9uIHRvIHBhcnNlIHRoZSBkYXRhIHdlIHdhbnQsIGlmIHByb3ZpZGVkXG4gICAgICAgIGlmICh0eXBlb2YgZGF0YUtleSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgIHJlc29sdmVEYXRhLnBhZ2VzID0gcmVzb2x2ZURhdGEucGFnZXMuY29uY2F0KGRhdGFLZXkoZGF0YS5xdWVyeSkpO1xuICAgICAgICAgIGlzRmluaXNoZWQgPSByZXNvbHZlRGF0YS5wYWdlcy5sZW5ndGggPj0gbGltaXQ7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgLy8gYXBwZW5kIG5ldyBkYXRhIHRvIGRhdGEgZnJvbSBsYXN0IHJlcXVlc3QuIFdlIG1pZ2h0IHdhbnQgYm90aCAncGFnZXMnIGFuZCBkYXRhS2V5XG4gICAgICAgICAgaWYgKGRhdGEucXVlcnkucGFnZXMpIHtcbiAgICAgICAgICAgIHJlc29sdmVEYXRhLnBhZ2VzID0gcmVzb2x2ZURhdGEucGFnZXMuY29uY2F0KGRhdGEucXVlcnkucGFnZXMpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAoZGF0YS5xdWVyeVtkYXRhS2V5XSkge1xuICAgICAgICAgICAgcmVzb2x2ZURhdGFbZGF0YUtleV0gPSAocmVzb2x2ZURhdGFbZGF0YUtleV0gfHwgW10pLmNvbmNhdChkYXRhLnF1ZXJ5W2RhdGFLZXldKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgLy8gSWYgcGFnZXMgaXMgbm90IHRoZSBjb2xsZWN0aW9uIHdlIHdhbnQsIGl0IHdpbGwgYmUgZWl0aGVyIGFuIGVtcHR5IGFycmF5IG9yIG9uZSBlbnRyeSB3aXRoIGJhc2ljIHBhZ2UgaW5mb1xuICAgICAgICAgIC8vICAgZGVwZW5kaW5nIG9uIHdoYXQgQVBJIHdlJ3JlIGhpdHRpbmcuIFNvIHJlc29sdmVEYXRhW2RhdGFLZXldIHdpbGwgaGl0IHRoZSBsaW1pdFxuICAgICAgICAgIGlzRmluaXNoZWQgPSByZXNvbHZlRGF0YS5wYWdlcy5sZW5ndGggPj0gbGltaXQgfHwgcmVzb2x2ZURhdGFbZGF0YUtleV0ubGVuZ3RoID49IGxpbWl0O1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gbWFrZSByZWN1cnNpdmUgY2FsbCBpZiBuZWVkZWQsIHdhaXRpbmcgMTAwbXNcbiAgICAgICAgaWYgKCFpc0ZpbmlzaGVkICYmIGRhdGEuY29udGludWUgJiYgZGF0YS5jb250aW51ZVtjb250aW51ZUtleV0pIHtcbiAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgIG1ha2VSZXF1ZXN0KGRhdGEuY29udGludWVbY29udGludWVLZXldKTtcbiAgICAgICAgICB9LCAxMDApO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIC8vIGluZGljYXRlIHRoZXJlIHdlcmUgbW9yZSBlbnRyaWVzIHRoYW4gdGhlIGxpbWl0XG4gICAgICAgICAgaWYgKGRhdGEuY29udGludWUpIHJlc29sdmVEYXRhLmNvbnRpbnVlID0gdHJ1ZTtcbiAgICAgICAgICBkZmQucmVzb2x2ZShyZXNvbHZlRGF0YSk7XG4gICAgICAgIH1cbiAgICAgIH0pLmZhaWwoZGF0YSA9PiB7XG4gICAgICAgIGRmZC5yZWplY3QoZGF0YSk7XG4gICAgICB9KTtcbiAgICB9O1xuXG4gICAgbWFrZVJlcXVlc3QoKTtcblxuICAgIHJldHVybiBkZmQ7XG4gIH1cblxuICAvKipcbiAgICogTG9jYWxpemUgTnVtYmVyIG9iamVjdCB3aXRoIGRlbGltaXRlcnNcbiAgICpcbiAgICogQHBhcmFtIHtOdW1iZXJ9IHZhbHVlIC0gdGhlIE51bWJlciwgZS5nLiAxMjM0NTY3XG4gICAqIEByZXR1cm5zIHtzdHJpbmd9IC0gd2l0aCBsb2NhbGUgZGVsaW1pdGVycywgZS5nLiAxLDIzNCw1NjcgKGVuLVVTKVxuICAgKi9cbiAgbih2YWx1ZSkge1xuICAgIHJldHVybiAobmV3IE51bWJlcih2YWx1ZSkpLnRvTG9jYWxlU3RyaW5nKCk7XG4gIH1cblxuICAvKipcbiAgICogR2V0IGJhc2ljIGluZm8gb24gZ2l2ZW4gcGFnZXMsIGluY2x1ZGluZyB0aGUgbm9ybWFsaXplZCBwYWdlIG5hbWVzLlxuICAgKiBFLmcuIG1hc2N1bGluZSB2ZXJzdXMgZmVtaW5pbmUgbmFtZXNwYWNlcyBvbiBkZXdpa2lcbiAgICogQHBhcmFtIHthcnJheX0gcGFnZXMgLSBhcnJheSBvZiBwYWdlIG5hbWVzXG4gICAqIEByZXR1cm5zIHtEZWZlcnJlZH0gcHJvbWlzZSB3aXRoIGRhdGEgZmV0Y2hlZCBmcm9tIEFQSVxuICAgKi9cbiAgZ2V0UGFnZUluZm8ocGFnZXMpIHtcbiAgICBsZXQgZGZkID0gJC5EZWZlcnJlZCgpO1xuXG4gICAgcmV0dXJuICQuYWpheCh7XG4gICAgICB1cmw6IGBodHRwczovLyR7dGhpcy5wcm9qZWN0fS5vcmcvdy9hcGkucGhwP2FjdGlvbj1xdWVyeSZwcm9wPWluZm8maW5wcm9wPXByb3RlY3Rpb258d2F0Y2hlcnNgICtcbiAgICAgICAgYCZmb3JtYXR2ZXJzaW9uPTImZm9ybWF0PWpzb24mdGl0bGVzPSR7cGFnZXMuam9pbignfCcpfWAsXG4gICAgICBkYXRhVHlwZTogJ2pzb25wJ1xuICAgIH0pLnRoZW4oZGF0YSA9PiB7XG4gICAgICBsZXQgcGFnZURhdGEgPSB7fTtcbiAgICAgIGRhdGEucXVlcnkucGFnZXMuZm9yRWFjaChwYWdlID0+IHtcbiAgICAgICAgcGFnZURhdGFbcGFnZS50aXRsZV0gPSBwYWdlO1xuICAgICAgfSk7XG4gICAgICByZXR1cm4gZGZkLnJlc29sdmUocGFnZURhdGEpO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIENvbXB1dGUgaG93IG1hbnkgZGF5cyBhcmUgaW4gdGhlIHNlbGVjdGVkIGRhdGUgcmFuZ2VcbiAgICogQHJldHVybnMge2ludGVnZXJ9IG51bWJlciBvZiBkYXlzXG4gICAqL1xuICBudW1EYXlzSW5SYW5nZSgpIHtcbiAgICByZXR1cm4gdGhpcy5kYXRlcmFuZ2VwaWNrZXIuZW5kRGF0ZS5kaWZmKHRoaXMuZGF0ZXJhbmdlcGlja2VyLnN0YXJ0RGF0ZSwgJ2RheXMnKSArIDE7XG4gIH1cblxuICAvKipcbiAgICogR2VuZXJhdGUga2V5L3ZhbHVlIHBhaXJzIG9mIFVSTCBxdWVyeSBzdHJpbmdcbiAgICogQHBhcmFtIHtzdHJpbmd9IFttdWx0aVBhcmFtXSAtIHBhcmFtZXRlciB3aG9zZSB2YWx1ZXMgbmVlZHMgdG8gc3BsaXQgYnkgcGlwZSBjaGFyYWN0ZXJcbiAgICogQHJldHVybnMge09iamVjdH0ga2V5L3ZhbHVlIHBhaXJzIHJlcHJlc2VudGF0aW9uIG9mIHF1ZXJ5IHN0cmluZ1xuICAgKi9cbiAgcGFyc2VRdWVyeVN0cmluZyhtdWx0aVBhcmFtKSB7XG4gICAgY29uc3QgdXJpID0gZGVjb2RlVVJJKGxvY2F0aW9uLnNlYXJjaC5zbGljZSgxKSksXG4gICAgICBjaHVua3MgPSB1cmkuc3BsaXQoJyYnKTtcbiAgICBsZXQgcGFyYW1zID0ge307XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGNodW5rcy5sZW5ndGg7IGkrKykge1xuICAgICAgbGV0IGNodW5rID0gY2h1bmtzW2ldLnNwbGl0KCc9Jyk7XG5cbiAgICAgIGlmIChtdWx0aVBhcmFtICYmIGNodW5rWzBdID09PSBtdWx0aVBhcmFtKSB7XG4gICAgICAgIHBhcmFtc1ttdWx0aVBhcmFtXSA9IGNodW5rWzFdLnNwbGl0KCd8JykuZmlsdGVyKHBhcmFtID0+ICEhcGFyYW0pLnVuaXF1ZSgpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcGFyYW1zW2NodW5rWzBdXSA9IGNodW5rWzFdO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBwYXJhbXM7XG4gIH1cblxuICAvKipcbiAgICogU2ltcGxlIG1ldHJpYyB0byBzZWUgaG93IG1hbnkgdXNlIGl0IChwYWdldmlld3Mgb2YgdGhlIHBhZ2V2aWV3LCBhIG1ldGEtcGFnZXZpZXcsIGlmIHlvdSB3aWxsIDopXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBhcHAgLSBvbmUgb2Y6IHB2LCBsdiwgdHYsIHN2LCBtc1xuICAgKiBAcmV0dXJuIHtudWxsfSBub3RoaW5nXG4gICAqL1xuICBwYXRjaFVzYWdlKGFwcCkge1xuICAgIGlmIChtZXRhUm9vdCkge1xuICAgICAgJC5hamF4KHtcbiAgICAgICAgdXJsOiBgLy8ke21ldGFSb290fS91c2FnZS8ke3RoaXMuYXBwfS8ke3RoaXMucHJvamVjdCB8fCBpMThuTGFuZ31gLFxuICAgICAgICBtZXRob2Q6ICdQQVRDSCdcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBTZXQgdGltZXN0YW1wIG9mIHdoZW4gcHJvY2VzcyBzdGFydGVkXG4gICAqIEByZXR1cm4ge21vbWVudH0gc3RhcnQgdGltZVxuICAgKi9cbiAgcHJvY2Vzc1N0YXJ0ZWQoKSB7XG4gICAgcmV0dXJuIHRoaXMucHJvY2Vzc1N0YXJ0ID0gbW9tZW50KCk7XG4gIH1cblxuICAvKipcbiAgICogR2V0IGVsYXBzZWQgdGltZSBmcm9tIHRoaXMucHJvY2Vzc1N0YXJ0LCBhbmQgc2hvdyBpdFxuICAgKiBAcmV0dXJuIHttb21lbnR9IEVsYXBzZWQgdGltZSBmcm9tIGB0aGlzLnByb2Nlc3NTdGFydGAgaW4gbWlsbGlzZWNvbmRzXG4gICAqL1xuICBwcm9jZXNzRW5kZWQoKSB7XG4gICAgY29uc3QgZW5kVGltZSA9IG1vbWVudCgpLFxuICAgICAgZWxhcHNlZFRpbWUgPSBlbmRUaW1lLmRpZmYodGhpcy5wcm9jZXNzU3RhcnQsICdtaWxsaXNlY29uZHMnKTtcblxuICAgIC8qKiBGSVhNRTogcmVwb3J0IHRoaXMgYnVnOiBzb21lIGxhbmd1YWdlcyBkb24ndCBwYXJzZSBQTFVSQUwgY29ycmVjdGx5ICgnaGUnIGZvciBleGFtcGxlKSB3aXRoIHRoZSBFbmdsaXNoIGZhbGxiYWNrIG1lc3NhZ2UgKi9cbiAgICB0cnkge1xuICAgICAgJCgnLmVsYXBzZWQtdGltZScpLmF0dHIoJ2RhdGV0aW1lJywgZW5kVGltZS5mb3JtYXQoKSlcbiAgICAgICAgLnRleHQoJC5pMThuKCdlbGFwc2VkLXRpbWUnLCBlbGFwc2VkVGltZSAvIDEwMDApKTtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICAvLyBpbnRlbnRpb25hbGwgbm90aGluZywgZXZlcnl0aGluZyB3aWxsIHN0aWxsIHNob3dcbiAgICB9XG5cbiAgICByZXR1cm4gZWxhcHNlZFRpbWU7XG4gIH1cblxuICAvKipcbiAgICogQWRhcHRlZCBmcm9tIGh0dHA6Ly9qc2ZpZGRsZS5uZXQvZGFuZHYvNDdjYmovIGNvdXJ0ZXN5IG9mIGRhbmR2XG4gICAqXG4gICAqIFNhbWUgYXMgXy5kZWJvdW5jZSBidXQgcXVldWVzIGFuZCBleGVjdXRlcyBhbGwgZnVuY3Rpb24gY2FsbHNcbiAgICogQHBhcmFtICB7RnVuY3Rpb259IGZuIC0gZnVuY3Rpb24gdG8gZGVib3VuY2VcbiAgICogQHBhcmFtICB7ZGVsYXl9IGRlbGF5IC0gZGVsYXkgZHVyYXRpb24gb2YgbWlsbGlzZWNvbmRzXG4gICAqIEBwYXJhbSAge29iamVjdH0gY29udGV4dCAtIHNjb3BlIHRoZSBmdW5jdGlvbiBzaG91bGQgcmVmZXIgdG9cbiAgICogQHJldHVybiB7RnVuY3Rpb259IHJhdGUtbGltaXRlZCBmdW5jdGlvbiB0byBjYWxsIGluc3RlYWQgb2YgeW91ciBmdW5jdGlvblxuICAgKi9cbiAgcmF0ZUxpbWl0KGZuLCBkZWxheSwgY29udGV4dCkge1xuICAgIGxldCBxdWV1ZSA9IFtdLCB0aW1lcjtcblxuICAgIGNvbnN0IHByb2Nlc3NRdWV1ZSA9ICgpID0+IHtcbiAgICAgIGNvbnN0IGl0ZW0gPSBxdWV1ZS5zaGlmdCgpO1xuICAgICAgaWYgKGl0ZW0pIHtcbiAgICAgICAgZm4uYXBwbHkoaXRlbS5jb250ZXh0LCBpdGVtLmFyZ3VtZW50cyk7XG4gICAgICB9XG4gICAgICBpZiAocXVldWUubGVuZ3RoID09PSAwKSB7XG4gICAgICAgIGNsZWFySW50ZXJ2YWwodGltZXIpLCB0aW1lciA9IG51bGw7XG4gICAgICB9XG4gICAgfTtcblxuICAgIHJldHVybiBmdW5jdGlvbiBsaW1pdGVkKCkge1xuICAgICAgcXVldWUucHVzaCh7XG4gICAgICAgIGNvbnRleHQ6IGNvbnRleHQgfHwgdGhpcyxcbiAgICAgICAgYXJndW1lbnRzOiBbXS5zbGljZS5jYWxsKGFyZ3VtZW50cylcbiAgICAgIH0pO1xuXG4gICAgICBpZiAoIXRpbWVyKSB7XG4gICAgICAgIHByb2Nlc3NRdWV1ZSgpOyAvLyBzdGFydCBpbW1lZGlhdGVseSBvbiB0aGUgZmlyc3QgaW52b2NhdGlvblxuICAgICAgICB0aW1lciA9IHNldEludGVydmFsKHByb2Nlc3NRdWV1ZSwgZGVsYXkpO1xuICAgICAgfVxuICAgIH07XG4gIH1cblxuICAvKipcbiAgICogUmVtb3ZlcyBhbGwgU2VsZWN0MiByZWxhdGVkIHN0dWZmIHRoZW4gYWRkcyBpdCBiYWNrXG4gICAqIEFsc28gbWlnaHQgcmVzdWx0IGluIHRoZSBjaGFydCBiZWluZyByZS1yZW5kZXJlZFxuICAgKiBAcmV0dXJucyB7bnVsbH0gbm90aGluZ1xuICAgKi9cbiAgcmVzZXRTZWxlY3QyKCkge1xuICAgIGNvbnN0IHNlbGVjdDJJbnB1dCA9ICQodGhpcy5jb25maWcuc2VsZWN0MklucHV0KTtcbiAgICBzZWxlY3QySW5wdXQub2ZmKCdjaGFuZ2UnKTtcbiAgICBzZWxlY3QySW5wdXQuc2VsZWN0MigndmFsJywgbnVsbCk7XG4gICAgc2VsZWN0MklucHV0LnNlbGVjdDIoJ2RhdGEnLCBudWxsKTtcbiAgICBzZWxlY3QySW5wdXQuc2VsZWN0MignZGVzdHJveScpO1xuICAgIHRoaXMuc2V0dXBTZWxlY3QyKCk7XG4gIH1cblxuICAvKipcbiAgICogQ2hhbmdlIGFscGhhIGxldmVsIG9mIGFuIHJnYmEgdmFsdWVcbiAgICpcbiAgICogQHBhcmFtIHtzdHJpbmd9IHZhbHVlIC0gcmdiYSB2YWx1ZVxuICAgKiBAcGFyYW0ge2Zsb2F0fHN0cmluZ30gYWxwaGEgLSB0cmFuc3BhcmVuY3kgYXMgZmxvYXQgdmFsdWVcbiAgICogQHJldHVybnMge3N0cmluZ30gcmdiYSB2YWx1ZVxuICAgKi9cbiAgcmdiYSh2YWx1ZSwgYWxwaGEpIHtcbiAgICByZXR1cm4gdmFsdWUucmVwbGFjZSgvLFxccypcXGRcXCkvLCBgLCAke2FscGhhfSlgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTYXZlIGEgcGFydGljdWxhciBzZXR0aW5nIHRvIHNlc3Npb24gYW5kIGxvY2FsU3RvcmFnZVxuICAgKlxuICAgKiBAcGFyYW0ge3N0cmluZ30ga2V5IC0gc2V0dGluZ3Mga2V5XG4gICAqIEBwYXJhbSB7c3RyaW5nfGJvb2xlYW59IHZhbHVlIC0gdmFsdWUgdG8gc2F2ZVxuICAgKiBAcmV0dXJucyB7bnVsbH0gbm90aGluZ1xuICAgKi9cbiAgc2F2ZVNldHRpbmcoa2V5LCB2YWx1ZSkge1xuICAgIHRoaXNba2V5XSA9IHZhbHVlO1xuICAgIHRoaXMuc2V0TG9jYWxTdG9yYWdlKGBwYWdldmlld3Mtc2V0dGluZ3MtJHtrZXl9YCwgdmFsdWUpO1xuICB9XG5cbiAgLyoqXG4gICAqIFNhdmUgdGhlIHNlbGVjdGVkIHNldHRpbmdzIHdpdGhpbiB0aGUgc2V0dGluZ3MgbW9kYWxcbiAgICogUHJlZmVyIHRoaXMgaW1wbGVtZW50YXRpb24gb3ZlciBhIGxhcmdlIGxpYnJhcnkgbGlrZSBzZXJpYWxpemVPYmplY3Qgb3Igc2VyaWFsaXplSlNPTlxuICAgKiBAcmV0dXJucyB7bnVsbH0gbm90aGluZ1xuICAgKi9cbiAgc2F2ZVNldHRpbmdzKCkge1xuICAgIC8qKiB0cmFjayBpZiB3ZSdyZSBjaGFuZ2luZyB0byBub19hdXRvY29tcGxldGUgbW9kZSAqL1xuICAgIGNvbnN0IHdhc0F1dG9jb21wbGV0ZSA9IHRoaXMuYXV0b2NvbXBsZXRlID09PSAnbm9fYXV0b2NvbXBsZXRlJztcblxuICAgICQuZWFjaCgkKCcjc2V0dGluZ3MtbW9kYWwgaW5wdXQnKSwgKGluZGV4LCBlbCkgPT4ge1xuICAgICAgaWYgKGVsLnR5cGUgPT09ICdjaGVja2JveCcpIHtcbiAgICAgICAgdGhpcy5zYXZlU2V0dGluZyhlbC5uYW1lLCBlbC5jaGVja2VkID8gJ3RydWUnIDogJ2ZhbHNlJyk7XG4gICAgICB9IGVsc2UgaWYgKGVsLmNoZWNrZWQpIHtcbiAgICAgICAgdGhpcy5zYXZlU2V0dGluZyhlbC5uYW1lLCBlbC52YWx1ZSk7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBpZiAodGhpcy5hcHAgIT09ICd0b3B2aWV3cycpIHtcbiAgICAgIHRoaXMuZGF0ZXJhbmdlcGlja2VyLmxvY2FsZS5mb3JtYXQgPSB0aGlzLmRhdGVGb3JtYXQ7XG4gICAgICB0aGlzLmRhdGVyYW5nZXBpY2tlci51cGRhdGVFbGVtZW50KCk7XG5cbiAgICAgIHRoaXMuc2V0dXBTZWxlY3QyQ29sb3JzKCk7XG5cbiAgICAgIC8qKlxuICAgICAgICogSWYgd2UgY2hhbmdlZCB0by9mcm9tIG5vX2F1dG9jb21wbGV0ZSB3ZSBoYXZlIHRvIHJlc2V0IFNlbGVjdDIgZW50aXJlbHlcbiAgICAgICAqICAgYXMgc2V0U2VsZWN0MkRlZmF1bHRzIGlzIHN1cGVyIGJ1Z2d5IGR1ZSB0byBTZWxlY3QyIGNvbnN0cmFpbnRzXG4gICAgICAgKiBTbyBsZXQncyBvbmx5IHJlc2V0IGlmIHdlIGhhdmUgdG9cbiAgICAgICAqL1xuICAgICAgaWYgKCh0aGlzLmF1dG9jb21wbGV0ZSA9PT0gJ25vX2F1dG9jb21wbGV0ZScpICE9PSB3YXNBdXRvY29tcGxldGUpIHtcbiAgICAgICAgdGhpcy5yZXNldFNlbGVjdDIoKTtcbiAgICAgIH1cblxuICAgICAgaWYgKHRoaXMuYmVnaW5BdFplcm8gPT09ICd0cnVlJykge1xuICAgICAgICAkKCcuYmVnaW4tYXQtemVyby1vcHRpb24nKS5wcm9wKCdjaGVja2VkJywgdHJ1ZSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgdGhpcy5wcm9jZXNzSW5wdXQodHJ1ZSk7XG4gIH1cblxuICAvKipcbiAgICogRGlyZWN0bHkgc2V0IGl0ZW1zIGluIFNlbGVjdDJcbiAgICogQ3VycmVudGx5IGlzIG5vdCBhYmxlIHRvIHJlbW92ZSB1bmRlcnNjb3JlcyBmcm9tIHBhZ2UgbmFtZXNcbiAgICpcbiAgICogQHBhcmFtIHthcnJheX0gaXRlbXMgLSBwYWdlIHRpdGxlc1xuICAgKiBAcmV0dXJucyB7YXJyYXl9IC0gdW50b3VjaGVkIGFycmF5IG9mIGl0ZW1zXG4gICAqL1xuICBzZXRTZWxlY3QyRGVmYXVsdHMoaXRlbXMpIHtcbiAgICBpdGVtcy5mb3JFYWNoKGl0ZW0gPT4ge1xuICAgICAgY29uc3QgZXNjYXBlZFRleHQgPSAkKCc8ZGl2PicpLnRleHQoaXRlbSkuaHRtbCgpO1xuICAgICAgJCgnPG9wdGlvbj4nICsgZXNjYXBlZFRleHQgKyAnPC9vcHRpb24+JykuYXBwZW5kVG8odGhpcy5jb25maWcuc2VsZWN0MklucHV0KTtcbiAgICB9KTtcbiAgICAkKHRoaXMuY29uZmlnLnNlbGVjdDJJbnB1dCkuc2VsZWN0MigndmFsJywgaXRlbXMpO1xuICAgICQodGhpcy5jb25maWcuc2VsZWN0MklucHV0KS5zZWxlY3QyKCdjbG9zZScpO1xuXG4gICAgcmV0dXJuIGl0ZW1zO1xuICB9XG5cbiAgLyoqXG4gICAqIFNldHMgdGhlIGRhdGVyYW5nZSBwaWNrZXIgdmFsdWVzIGFuZCB0aGlzLnNwZWNpYWxSYW5nZSBiYXNlZCBvbiBwcm92aWRlZCBzcGVjaWFsIHJhbmdlIGtleVxuICAgKiBXQVJOSU5HOiBub3QgdG8gYmUgY2FsbGVkIG9uIGRhdGVyYW5nZSBwaWNrZXIgR1VJIGV2ZW50cyAoZS5nLiBzcGVjaWFsIHJhbmdlIGJ1dHRvbnMpXG4gICAqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSB0eXBlIC0gb25lIG9mIHNwZWNpYWwgcmFuZ2VzIGRlZmluZWQgaW4gdGhpcy5jb25maWcuc3BlY2lhbFJhbmdlcyxcbiAgICogICBpbmNsdWRpbmcgZHluYW1pYyBsYXRlc3QgcmFuZ2UsIHN1Y2ggYXMgYGxhdGVzdC0xNWAgZm9yIGxhdGVzdCAxNSBkYXlzXG4gICAqIEByZXR1cm5zIHtvYmplY3R8bnVsbH0gdXBkYXRlZCB0aGlzLnNwZWNpYWxSYW5nZSBvYmplY3Qgb3IgbnVsbCBpZiB0eXBlIHdhcyBpbnZhbGlkXG4gICAqL1xuICBzZXRTcGVjaWFsUmFuZ2UodHlwZSkge1xuICAgIGNvbnN0IHJhbmdlSW5kZXggPSBPYmplY3Qua2V5cyh0aGlzLmNvbmZpZy5zcGVjaWFsUmFuZ2VzKS5pbmRleE9mKHR5cGUpO1xuICAgIGxldCBzdGFydERhdGUsIGVuZERhdGU7XG5cbiAgICBpZiAodHlwZS5pbmNsdWRlcygnbGF0ZXN0LScpKSB7XG4gICAgICBjb25zdCBvZmZzZXQgPSBwYXJzZUludCh0eXBlLnJlcGxhY2UoJ2xhdGVzdC0nLCAnJyksIDEwKSB8fCAyMDsgLy8gZmFsbGJhY2sgb2YgMjBcbiAgICAgIFtzdGFydERhdGUsIGVuZERhdGVdID0gdGhpcy5jb25maWcuc3BlY2lhbFJhbmdlcy5sYXRlc3Qob2Zmc2V0KTtcbiAgICB9IGVsc2UgaWYgKHJhbmdlSW5kZXggPj0gMCkge1xuICAgICAgLyoqIHRyZWF0ICdsYXRlc3QnIGFzIGEgZnVuY3Rpb24gKi9cbiAgICAgIFtzdGFydERhdGUsIGVuZERhdGVdID0gdHlwZSA9PT0gJ2xhdGVzdCcgPyB0aGlzLmNvbmZpZy5zcGVjaWFsUmFuZ2VzLmxhdGVzdCgpIDogdGhpcy5jb25maWcuc3BlY2lhbFJhbmdlc1t0eXBlXTtcbiAgICAgICQoJy5kYXRlcmFuZ2VwaWNrZXIgLnJhbmdlcyBsaScpLmVxKHJhbmdlSW5kZXgpLnRyaWdnZXIoJ2NsaWNrJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB0aGlzLnNwZWNpYWxSYW5nZSA9IHtcbiAgICAgIHJhbmdlOiB0eXBlLFxuICAgICAgdmFsdWU6IGAke3N0YXJ0RGF0ZS5mb3JtYXQodGhpcy5kYXRlRm9ybWF0KX0gLSAke2VuZERhdGUuZm9ybWF0KHRoaXMuZGF0ZUZvcm1hdCl9YFxuICAgIH07XG5cbiAgICAvKiogZGlyZWN0bHkgYXNzaWduIHN0YXJ0RGF0ZSB0aGVuIHVzZSBzZXRFbmREYXRlIHNvIHRoYXQgdGhlIGV2ZW50cyB3aWxsIGJlIGZpcmVkIG9uY2UgKi9cbiAgICB0aGlzLmRhdGVyYW5nZXBpY2tlci5zdGFydERhdGUgPSBzdGFydERhdGU7XG4gICAgdGhpcy5kYXRlcmFuZ2VwaWNrZXIuc2V0RW5kRGF0ZShlbmREYXRlKTtcblxuICAgIHJldHVybiB0aGlzLnNwZWNpYWxSYW5nZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZXR1cCBjb2xvcnMgZm9yIFNlbGVjdDIgZW50cmllcyBzbyB3ZSBjYW4gZHluYW1pY2FsbHkgY2hhbmdlIHRoZW1cbiAgICogVGhpcyBpcyBhIG5lY2Vzc2FyeSBldmlsLCBhcyB3ZSBoYXZlIHRvIG1hcmsgdGhlbSBhcyAhaW1wb3J0YW50XG4gICAqICAgYW5kIHNpbmNlIHRoZXJlIGFyZSBhbnkgbnVtYmVyIG9mIGVudGlyZXMsIHdlIG5lZWQgdG8gdXNlIG50aC1jaGlsZCBzZWxlY3RvcnNcbiAgICogQHJldHVybnMge0NTU1N0eWxlc2hlZXR9IG91ciBuZXcgc3R5bGVzaGVldFxuICAgKi9cbiAgc2V0dXBTZWxlY3QyQ29sb3JzKCkge1xuICAgIC8qKiBmaXJzdCBkZWxldGUgb2xkIHN0eWxlc2hlZXQsIGlmIHByZXNlbnQgKi9cbiAgICBpZiAodGhpcy5jb2xvcnNTdHlsZUVsKSB0aGlzLmNvbG9yc1N0eWxlRWwucmVtb3ZlKCk7XG5cbiAgICAvKiogY3JlYXRlIG5ldyBzdHlsZXNoZWV0ICovXG4gICAgdGhpcy5jb2xvcnNTdHlsZUVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3R5bGUnKTtcbiAgICB0aGlzLmNvbG9yc1N0eWxlRWwuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoJycpKTsgLy8gV2ViS2l0IGhhY2sgOihcbiAgICBkb2N1bWVudC5oZWFkLmFwcGVuZENoaWxkKHRoaXMuY29sb3JzU3R5bGVFbCk7XG5cbiAgICAvKiogYWRkIGNvbG9yIHJ1bGVzICovXG4gICAgdGhpcy5jb25maWcuY29sb3JzLmZvckVhY2goKGNvbG9yLCBpbmRleCkgPT4ge1xuICAgICAgdGhpcy5jb2xvcnNTdHlsZUVsLnNoZWV0Lmluc2VydFJ1bGUoYC5zZWxlY3QyLXNlbGVjdGlvbl9fY2hvaWNlOm50aC1vZi10eXBlKCR7aW5kZXggKyAxfSkgeyBiYWNrZ3JvdW5kOiAke2NvbG9yfSAhaW1wb3J0YW50IH1gLCAwKTtcbiAgICB9KTtcblxuICAgIHJldHVybiB0aGlzLmNvbG9yc1N0eWxlRWwuc2hlZXQ7XG4gIH1cblxuICAvKipcbiAgICogQ3Jvc3MtYXBwbGljYXRpb24gbGlzdGVuZXJzXG4gICAqIEVhY2ggYXBwIGhhcyBpdCdzIG93biBzZXR1cExpc3RlbmVycygpIHRoYXQgc2hvdWxkIGNhbGwgc3VwZXIuc2V0dXBMaXN0ZW5lcnMoKVxuICAgKiBAcmV0dXJuIHtudWxsfSBub3RoaW5nXG4gICAqL1xuICBzZXR1cExpc3RlbmVycygpIHtcbiAgICAvKiogcHJldmVudCBicm93c2VyJ3MgZGVmYXVsdCBiZWhhdmlvdXIgZm9yIGFueSBsaW5rIHdpdGggaHJlZj1cIiNcIiAqL1xuICAgICQoXCJhW2hyZWY9JyMnXVwiKS5vbignY2xpY2snLCBlID0+IGUucHJldmVudERlZmF1bHQoKSk7XG5cbiAgICAvKiogZG93bmxvYWQgbGlzdGVuZXJzICovXG4gICAgJCgnLmRvd25sb2FkLWNzdicpLm9uKCdjbGljaycsIHRoaXMuZXhwb3J0Q1NWLmJpbmQodGhpcykpO1xuICAgICQoJy5kb3dubG9hZC1qc29uJykub24oJ2NsaWNrJywgdGhpcy5leHBvcnRKU09OLmJpbmQodGhpcykpO1xuXG4gICAgLyoqIHByb2plY3QgaW5wdXQgbGlzdGVuZXJzLCBzYXZpbmcgYW5kIHJlc3RvcmluZyBvbGQgdmFsdWUgaWYgbmV3IG9uZSBpcyBpbnZhbGlkICovXG4gICAgJCh0aGlzLmNvbmZpZy5wcm9qZWN0SW5wdXQpLm9uKCdmb2N1c2luJywgZnVuY3Rpb24oKSB7XG4gICAgICB0aGlzLmRhdGFzZXQudmFsdWUgPSB0aGlzLnZhbHVlO1xuICAgIH0pO1xuICAgICQodGhpcy5jb25maWcucHJvamVjdElucHV0KS5vbignY2hhbmdlJywgZSA9PiB0aGlzLnZhbGlkYXRlUHJvamVjdChlKSk7XG4gIH1cblxuICAvKipcbiAgICogU2V0IHZhbHVlcyBvZiBmb3JtIGJhc2VkIG9uIGxvY2FsU3RvcmFnZSBvciBkZWZhdWx0cywgYWRkIGxpc3RlbmVyc1xuICAgKiBAcmV0dXJucyB7bnVsbH0gbm90aGluZ1xuICAgKi9cbiAgc2V0dXBTZXR0aW5nc01vZGFsKCkge1xuICAgIC8qKiBmaWxsIGluIHZhbHVlcywgZXZlcnl0aGluZyBpcyBlaXRoZXIgYSBjaGVja2JveCBvciByYWRpbyAqL1xuICAgIHRoaXMuZmlsbEluU2V0dGluZ3MoKTtcblxuICAgIC8qKiBhZGQgbGlzdGVuZXIgKi9cbiAgICAkKCcuc2F2ZS1zZXR0aW5ncy1idG4nKS5vbignY2xpY2snLCB0aGlzLnNhdmVTZXR0aW5ncy5iaW5kKHRoaXMpKTtcbiAgICAkKCcuY2FuY2VsLXNldHRpbmdzLWJ0bicpLm9uKCdjbGljaycsIHRoaXMuZmlsbEluU2V0dGluZ3MuYmluZCh0aGlzKSk7XG4gIH1cblxuICAvKipcbiAgICogc2V0cyB1cCB0aGUgZGF0ZXJhbmdlIHNlbGVjdG9yIGFuZCBhZGRzIGxpc3RlbmVyc1xuICAgKiBAcmV0dXJucyB7bnVsbH0gLSBub3RoaW5nXG4gICAqL1xuICBzZXR1cERhdGVSYW5nZVNlbGVjdG9yKCkge1xuICAgIGNvbnN0IGRhdGVSYW5nZVNlbGVjdG9yID0gJCh0aGlzLmNvbmZpZy5kYXRlUmFuZ2VTZWxlY3Rvcik7XG5cbiAgICAvKipcbiAgICAgKiBUcmFuc2Zvcm0gdGhpcy5jb25maWcuc3BlY2lhbFJhbmdlcyB0byBoYXZlIGkxOG4gYXMga2V5c1xuICAgICAqIFRoaXMgaXMgd2hhdCBpcyBzaG93biBhcyB0aGUgc3BlY2lhbCByYW5nZXMgKExhc3QgbW9udGgsIGV0Yy4pIGluIHRoZSBkYXRlcGlja2VyIG1lbnVcbiAgICAgKiBAdHlwZSB7T2JqZWN0fVxuICAgICAqL1xuICAgIGxldCByYW5nZXMgPSB7fTtcbiAgICBPYmplY3Qua2V5cyh0aGlzLmNvbmZpZy5zcGVjaWFsUmFuZ2VzKS5mb3JFYWNoKGtleSA9PiB7XG4gICAgICBpZiAoa2V5ID09PSAnbGF0ZXN0JykgcmV0dXJuOyAvLyB0aGlzIGlzIGEgZnVuY3Rpb24sIG5vdCBtZWFudCB0byBiZSBpbiB0aGUgbGlzdCBvZiBzcGVjaWFsIHJhbmdlc1xuICAgICAgcmFuZ2VzWyQuaTE4bihrZXkpXSA9IHRoaXMuY29uZmlnLnNwZWNpYWxSYW5nZXNba2V5XTtcbiAgICB9KTtcblxuICAgIGxldCBkYXRlcGlja2VyT3B0aW9ucyA9IHtcbiAgICAgIGxvY2FsZToge1xuICAgICAgICBmb3JtYXQ6IHRoaXMuZGF0ZUZvcm1hdCxcbiAgICAgICAgYXBwbHlMYWJlbDogJC5pMThuKCdhcHBseScpLFxuICAgICAgICBjYW5jZWxMYWJlbDogJC5pMThuKCdjYW5jZWwnKSxcbiAgICAgICAgY3VzdG9tUmFuZ2VMYWJlbDogJC5pMThuKCdjdXN0b20tcmFuZ2UnKSxcbiAgICAgICAgZGF5c09mV2VlazogW1xuICAgICAgICAgICQuaTE4bignc3UnKSxcbiAgICAgICAgICAkLmkxOG4oJ21vJyksXG4gICAgICAgICAgJC5pMThuKCd0dScpLFxuICAgICAgICAgICQuaTE4bignd2UnKSxcbiAgICAgICAgICAkLmkxOG4oJ3RoJyksXG4gICAgICAgICAgJC5pMThuKCdmcicpLFxuICAgICAgICAgICQuaTE4bignc2EnKVxuICAgICAgICBdLFxuICAgICAgICBtb250aE5hbWVzOiBbXG4gICAgICAgICAgJC5pMThuKCdqYW51YXJ5JyksXG4gICAgICAgICAgJC5pMThuKCdmZWJydWFyeScpLFxuICAgICAgICAgICQuaTE4bignbWFyY2gnKSxcbiAgICAgICAgICAkLmkxOG4oJ2FwcmlsJyksXG4gICAgICAgICAgJC5pMThuKCdtYXknKSxcbiAgICAgICAgICAkLmkxOG4oJ2p1bmUnKSxcbiAgICAgICAgICAkLmkxOG4oJ2p1bHknKSxcbiAgICAgICAgICAkLmkxOG4oJ2F1Z3VzdCcpLFxuICAgICAgICAgICQuaTE4bignc2VwdGVtYmVyJyksXG4gICAgICAgICAgJC5pMThuKCdvY3RvYmVyJyksXG4gICAgICAgICAgJC5pMThuKCdub3ZlbWJlcicpLFxuICAgICAgICAgICQuaTE4bignZGVjZW1iZXInKVxuICAgICAgICBdXG4gICAgICB9LFxuICAgICAgc3RhcnREYXRlOiBtb21lbnQoKS5zdWJ0cmFjdCh0aGlzLmNvbmZpZy5kYXlzQWdvLCAnZGF5cycpLFxuICAgICAgbWluRGF0ZTogdGhpcy5jb25maWcubWluRGF0ZSxcbiAgICAgIG1heERhdGU6IHRoaXMuY29uZmlnLm1heERhdGUsXG4gICAgICByYW5nZXM6IHJhbmdlc1xuICAgIH07XG5cbiAgICBpZiAodGhpcy5jb25maWcuZGF0ZUxpbWl0KSBkYXRlcGlja2VyT3B0aW9ucy5kYXRlTGltaXQgPSB7IGRheXM6IHRoaXMuY29uZmlnLmRhdGVMaW1pdCB9O1xuXG4gICAgZGF0ZVJhbmdlU2VsZWN0b3IuZGF0ZXJhbmdlcGlja2VyKGRhdGVwaWNrZXJPcHRpb25zKTtcblxuICAgIC8qKiBzbyBwZW9wbGUga25vdyB3aHkgdGhleSBjYW4ndCBxdWVyeSBkYXRhIG9sZGVyIHRoYW4gSnVseSAyMDE1ICovXG4gICAgJCgnLmRhdGVyYW5nZXBpY2tlcicpLmFwcGVuZChcbiAgICAgICQoJzxkaXY+JylcbiAgICAgICAgLmFkZENsYXNzKCdkYXRlcmFuZ2Utbm90aWNlJylcbiAgICAgICAgLmh0bWwoJC5pMThuKCdkYXRlLW5vdGljZScsIGRvY3VtZW50LnRpdGxlLFxuICAgICAgICAgIFwiPGEgaHJlZj0naHR0cDovL3N0YXRzLmdyb2suc2UnIHRhcmdldD0nX2JsYW5rJz5zdGF0cy5ncm9rLnNlPC9hPlwiLFxuICAgICAgICAgIGAkeyQuaTE4bignanVseScpfSAyMDE1YFxuICAgICAgICApKVxuICAgICk7XG5cbiAgICAvKipcbiAgICAgKiBUaGUgc3BlY2lhbCBkYXRlIHJhbmdlIG9wdGlvbnMgKGJ1dHRvbnMgdGhlIHJpZ2h0IHNpZGUgb2YgdGhlIGRhdGVyYW5nZSBwaWNrZXIpXG4gICAgICpcbiAgICAgKiBXQVJOSU5HOiB3ZSdyZSB1bmFibGUgdG8gYWRkIGNsYXNzIG5hbWVzIG9yIGRhdGEgYXR0cnMgdG8gdGhlIHJhbmdlIG9wdGlvbnMsXG4gICAgICogc28gY2hlY2tpbmcgd2hpY2ggd2FzIGNsaWNrZWQgaXMgaGFyZGNvZGVkIGJhc2VkIG9uIHRoZSBpbmRleCBvZiB0aGUgTEksXG4gICAgICogYXMgZGVmaW5lZCBpbiB0aGlzLmNvbmZpZy5zcGVjaWFsUmFuZ2VzXG4gICAgICovXG4gICAgJCgnLmRhdGVyYW5nZXBpY2tlciAucmFuZ2VzIGxpJykub24oJ2NsaWNrJywgZSA9PiB7XG4gICAgICBjb25zdCBpbmRleCA9ICQoJy5kYXRlcmFuZ2VwaWNrZXIgLnJhbmdlcyBsaScpLmluZGV4KGUudGFyZ2V0KSxcbiAgICAgICAgY29udGFpbmVyID0gdGhpcy5kYXRlcmFuZ2VwaWNrZXIuY29udGFpbmVyLFxuICAgICAgICBpbnB1dHMgPSBjb250YWluZXIuZmluZCgnLmRhdGVyYW5nZXBpY2tlcl9pbnB1dCBpbnB1dCcpO1xuICAgICAgdGhpcy5zcGVjaWFsUmFuZ2UgPSB7XG4gICAgICAgIHJhbmdlOiBPYmplY3Qua2V5cyh0aGlzLmNvbmZpZy5zcGVjaWFsUmFuZ2VzKVtpbmRleF0sXG4gICAgICAgIHZhbHVlOiBgJHtpbnB1dHNbMF0udmFsdWV9IC0gJHtpbnB1dHNbMV0udmFsdWV9YFxuICAgICAgfTtcbiAgICB9KTtcblxuICAgICQodGhpcy5jb25maWcuZGF0ZVJhbmdlU2VsZWN0b3IpLm9uKCdhcHBseS5kYXRlcmFuZ2VwaWNrZXInLCAoZSwgYWN0aW9uKSA9PiB7XG4gICAgICBpZiAoYWN0aW9uLmNob3NlbkxhYmVsID09PSAkLmkxOG4oJ2N1c3RvbS1yYW5nZScpKSB7XG4gICAgICAgIHRoaXMuc3BlY2lhbFJhbmdlID0gbnVsbDtcblxuICAgICAgICAvKiogZm9yY2UgZXZlbnRzIHRvIHJlLWZpcmUgc2luY2UgYXBwbHkuZGF0ZXJhbmdlcGlja2VyIG9jY3VycyBiZWZvcmUgJ2NoYW5nZScgZXZlbnQgKi9cbiAgICAgICAgdGhpcy5kYXRlcmFuZ2VwaWNrZXIudXBkYXRlRWxlbWVudCgpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgc2hvd0ZhdGFsRXJyb3JzKGVycm9ycykge1xuICAgIHRoaXMuY2xlYXJNZXNzYWdlcygpO1xuICAgIGVycm9ycy5mb3JFYWNoKGVycm9yID0+IHtcbiAgICAgIHRoaXMud3JpdGVNZXNzYWdlKFxuICAgICAgICBgPHN0cm9uZz4keyQuaTE4bignZmF0YWwtZXJyb3InKX08L3N0cm9uZz46IDxjb2RlPiR7ZXJyb3J9PC9jb2RlPmAsXG4gICAgICAgICdlcnJvcidcbiAgICAgICk7XG4gICAgfSk7XG5cbiAgICBpZiAodGhpcy5kZWJ1Zykge1xuICAgICAgdGhyb3cgZXJyb3JzWzBdO1xuICAgIH0gZWxzZSBpZiAoZXJyb3JzICYmIGVycm9yc1swXSAmJiBlcnJvcnNbMF0uc3RhY2spIHtcbiAgICAgICQuYWpheCh7XG4gICAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgICB1cmw6ICcvL3Rvb2xzLndtZmxhYnMub3JnL211c2lrYW5pbWFsL3Bhc3RlJyxcbiAgICAgICAgZGF0YToge1xuICAgICAgICAgIGNvbnRlbnQ6ICcnICtcbiAgICAgICAgICAgIGBcXG5kYXRlOiAgICAgICR7bW9tZW50KCkudXRjKCkuZm9ybWF0KCl9YCArXG4gICAgICAgICAgICBgXFxudG9vbDogICAgICAke3RoaXMuYXBwfWAgK1xuICAgICAgICAgICAgYFxcbmxhbmd1YWdlOiAgJHtpMThuTGFuZ31gICtcbiAgICAgICAgICAgIGBcXG5jaGFydDogICAgICR7dGhpcy5jaGFydFR5cGV9YCArXG4gICAgICAgICAgICBgXFxudXJsOiAgICAgICAke2RvY3VtZW50LmxvY2F0aW9uLmhyZWZ9YCArXG4gICAgICAgICAgICBgXFxudXNlckFnZW50OiAke3RoaXMuZ2V0VXNlckFnZW50KCl9YCArXG4gICAgICAgICAgICBgXFxudHJhY2U6ICAgICAke2Vycm9yc1swXS5zdGFja31gXG4gICAgICAgICAgLFxuICAgICAgICAgIHRpdGxlOiBgUGFnZXZpZXdzIEFuYWx5c2lzIGVycm9yIHJlcG9ydDogJHtlcnJvcnNbMF19YFxuICAgICAgICB9XG4gICAgICB9KS5kb25lKGRhdGEgPT4ge1xuICAgICAgICBpZiAoZGF0YSAmJiBkYXRhLnJlc3VsdCAmJiBkYXRhLnJlc3VsdC5vYmplY3ROYW1lKSB7XG4gICAgICAgICAgdGhpcy53cml0ZU1lc3NhZ2UoXG4gICAgICAgICAgICAkLmkxOG4oJ2Vycm9yLXBsZWFzZS1yZXBvcnQnLCB0aGlzLmdldEJ1Z1JlcG9ydFVSTChkYXRhLnJlc3VsdC5vYmplY3ROYW1lKSksXG4gICAgICAgICAgICAnZXJyb3InXG4gICAgICAgICAgKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLndyaXRlTWVzc2FnZShcbiAgICAgICAgICAgICQuaTE4bignZXJyb3ItcGxlYXNlLXJlcG9ydCcsIHRoaXMuZ2V0QnVnUmVwb3J0VVJMKCkpLFxuICAgICAgICAgICAgJ2Vycm9yJ1xuICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgIH0pLmZhaWwoKCkgPT4ge1xuICAgICAgICB0aGlzLndyaXRlTWVzc2FnZShcbiAgICAgICAgICAkLmkxOG4oJ2Vycm9yLXBsZWFzZS1yZXBvcnQnLCB0aGlzLmdldEJ1Z1JlcG9ydFVSTCgpKSxcbiAgICAgICAgICAnZXJyb3InXG4gICAgICAgICk7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogU3BsYXNoIGluIGNvbnNvbGUsIGp1c3QgZm9yIGZ1blxuICAgKiBAcmV0dXJucyB7U3RyaW5nfSBvdXRwdXRcbiAgICovXG4gIHNwbGFzaCgpIHtcbiAgICBjb25zdCBzdHlsZSA9ICdiYWNrZ3JvdW5kOiAjZWVlOyBjb2xvcjogIzU1NTsgcGFkZGluZzogNHB4OyBmb250LWZhbWlseTptb25vc3BhY2UnO1xuICAgIGNvbnNvbGUubG9nKCclYyAgICAgIF9fXyAgICAgICAgICAgIF9fIF8gICAgICAgICAgICAgICAgICAgICBfICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnLCBzdHlsZSk7XG4gICAgY29uc29sZS5sb2coJyVjICAgICB8IF8gXFxcXCAgX18gXyAgICAvIF9gIHwgICBfX18gICAgX18gX18gICAgKF8pICAgICBfX18gICBfXyBfXyBfXyAgX19fICAgICcsIHN0eWxlKTtcbiAgICBjb25zb2xlLmxvZygnJWMgICAgIHwgIF8vIC8gX2AgfCAgIFxcXFxfXywgfCAgLyAtXykgICBcXFxcIFYgLyAgICB8IHwgICAgLyAtXykgIFxcXFwgViAgViAvIChfLTwgICAgJywgc3R5bGUpO1xuICAgIGNvbnNvbGUubG9nKCclYyAgICBffF98XyAgXFxcXF9fLF98ICAgfF9fXy8gICBcXFxcX19ffCAgIF9cXFxcXy9fICAgX3xffF8gICBcXFxcX19ffCAgIFxcXFxfL1xcXFxfLyAgL19fL18gICAnLCBzdHlsZSk7XG4gICAgY29uc29sZS5sb2coJyVjICBffCBcIlwiXCIgfF98XCJcIlwiXCJcInxffFwiXCJcIlwiXCJ8X3xcIlwiXCJcIlwifF98XCJcIlwiXCJcInxffFwiXCJcIlwiXCJ8X3xcIlwiXCJcIlwifF98XCJcIlwiXCJcInxffFwiXCJcIlwiXCJ8ICAnLCBzdHlsZSk7XG4gICAgY29uc29sZS5sb2coJyVjICBcImAtMC0wLVxcJ1wiYC0wLTAtXFwnXCJgLTAtMC1cXCdcImAtMC0wLVxcJ1wiYC0wLTAtXFwnXCJgLTAtMC1cXCdcImAtMC0wLVxcJ1wiYC0wLTAtXFwnXCJgLTAtMC1cXCcgICcsIHN0eWxlKTtcbiAgICBjb25zb2xlLmxvZygnJWMgICAgICAgICAgICAgIF9fXyAgICAgICAgICAgICAgICAgICAgIF8gIF8gICAgIF8gICAgICAgICAgICAgICBfICAgICAgICAgICAgJywgc3R5bGUpO1xuICAgIGNvbnNvbGUubG9nKCclYyAgICAgIG8gTyBPICAvICAgXFxcXCAgIF8gXyAgICAgX18gXyAgICB8IHx8IHwgICB8IHwgICAgIF9fXyAgICAgKF8pICAgICBfX18gICAnLCBzdHlsZSk7XG4gICAgY29uc29sZS5sb2coJyVjICAgICBvICAgICAgIHwgLSB8ICB8IFxcJyBcXFxcICAgLyBfYCB8ICAgIFxcXFxfLCB8ICAgfCB8ICAgIChfLTwgICAgIHwgfCAgICAoXy08ICAgJywgc3R5bGUpO1xuICAgIGNvbnNvbGUubG9nKCclYyAgICBUU19fW09dICB8X3xffCAgfF98fF98ICBcXFxcX18sX3wgICBffF9fLyAgIF98X3xfICAgL19fL18gICBffF98XyAgIC9fXy9fICAnLCBzdHlsZSk7XG4gICAgY29uc29sZS5sb2coJyVjICAgez09PT09PXxffFwiXCJcIlwiXCJ8X3xcIlwiXCJcIlwifF98XCJcIlwiXCJcInxffCBcIlwiXCJcInxffFwiXCJcIlwiXCJ8X3xcIlwiXCJcIlwifF98XCJcIlwiXCJcInxffFwiXCJcIlwiXCJ8ICcsIHN0eWxlKTtcbiAgICBjb25zb2xlLmxvZygnJWMgIC4vby0tMDAwXFwnXCJgLTAtMC1cXCdcImAtMC0wLVxcJ1wiYC0wLTAtXFwnXCJgLTAtMC1cXCdcImAtMC0wLVxcJ1wiYC0wLTAtXFwnXCJgLTAtMC1cXCdcImAtMC0wLVxcJyAnLCBzdHlsZSk7XG4gICAgY29uc29sZS5sb2coJyVjICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICcsIHN0eWxlKTtcbiAgICBjb25zb2xlLmxvZyhgJWMgIENvcHlyaWdodCDCqSAke25ldyBEYXRlKCkuZ2V0RnVsbFllYXIoKX0gTXVzaWtBbmltYWwsIEthbGRhcmksIE1hcmNlbCBSdWl6IEZvcm5zICAgICAgICAgICAgICAgICAgYCwgc3R5bGUpO1xuICB9XG5cbiAgLyoqXG4gICAqIEFkZCB0aGUgbG9hZGluZyBpbmRpY2F0b3IgY2xhc3MgYW5kIHNldCB0aGUgc2FmZWd1YXJkIHRpbWVvdXRcbiAgICogQHJldHVybnMge251bGx9IG5vdGhpbmdcbiAgICovXG4gIHN0YXJ0U3Bpbm55KCkge1xuICAgICQoJy5jaGFydC1jb250YWluZXInKS5hZGRDbGFzcygnbG9hZGluZycpO1xuICAgIGNsZWFyVGltZW91dCh0aGlzLnRpbWVvdXQpO1xuXG4gICAgdGhpcy50aW1lb3V0ID0gc2V0VGltZW91dChlcnIgPT4ge1xuICAgICAgdGhpcy5yZXNldFZpZXcoKTtcbiAgICAgIHRoaXMud3JpdGVNZXNzYWdlKGA8c3Ryb25nPiR7JC5pMThuKCdmYXRhbC1lcnJvcicpfTwvc3Ryb25nPjpcbiAgICAgICAgJHskLmkxOG4oJ2Vycm9yLXRpbWVkLW91dCcpfVxuICAgICAgICAkeyQuaTE4bignZXJyb3ItcGxlYXNlLXJlcG9ydCcsIHRoaXMuZ2V0QnVnUmVwb3J0VVJMKCkpfVxuICAgICAgYCwgJ2Vycm9yJywgMCk7XG4gICAgfSwgMjAgKiAxMDAwKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZW1vdmUgbG9hZGluZyBpbmRpY2F0b3IgY2xhc3MgYW5kIGNsZWFyIHRoZSBzYWZlZ3VhcmQgdGltZW91dFxuICAgKiBAcmV0dXJucyB7bnVsbH0gbm90aGluZ1xuICAgKi9cbiAgc3RvcFNwaW5ueSgpIHtcbiAgICAkKCcuY2hhcnQtY29udGFpbmVyJykucmVtb3ZlQ2xhc3MoJ2xvYWRpbmcnKTtcbiAgICBjbGVhclRpbWVvdXQodGhpcy50aW1lb3V0KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXBsYWNlIHNwYWNlcyB3aXRoIHVuZGVyc2NvcmVzXG4gICAqXG4gICAqIEBwYXJhbSB7YXJyYXl9IHBhZ2VzIC0gYXJyYXkgb2YgcGFnZSBuYW1lc1xuICAgKiBAcmV0dXJucyB7YXJyYXl9IHBhZ2UgbmFtZXMgd2l0aCB1bmRlcnNjb3Jlc1xuICAgKi9cbiAgdW5kZXJzY29yZVBhZ2VOYW1lcyhwYWdlcykge1xuICAgIHJldHVybiBwYWdlcy5tYXAocGFnZSA9PiB7XG4gICAgICByZXR1cm4gZGVjb2RlVVJJQ29tcG9uZW50KHBhZ2UpLnNjb3JlKCk7XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogVXBkYXRlIGhyZWZzIG9mIGludGVyLWFwcCBsaW5rcyB0byBsb2FkIGN1cnJlbnRseSBzZWxlY3RlZCBwcm9qZWN0XG4gICAqIEByZXR1cm4ge251bGx9IG51dHRpbidcbiAgICovXG4gIHVwZGF0ZUludGVyQXBwTGlua3MoKSB7XG4gICAgJCgnLmludGVyYXBwLWxpbmsnKS5lYWNoKChpLCBsaW5rKSA9PiB7XG4gICAgICBsZXQgdXJsID0gbGluay5ocmVmLnNwbGl0KCc/JylbMF07XG5cbiAgICAgIGlmIChsaW5rLmNsYXNzTGlzdC5jb250YWlucygnaW50ZXJhcHAtbGluay0tc2l0ZXZpZXdzJykpIHtcbiAgICAgICAgbGluay5ocmVmID0gYCR7dXJsfT9zaXRlcz0ke3RoaXMucHJvamVjdC5lc2NhcGUoKX0ub3JnYDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGxpbmsuaHJlZiA9IGAke3VybH0/cHJvamVjdD0ke3RoaXMucHJvamVjdC5lc2NhcGUoKX0ub3JnYDtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBWYWxpZGF0ZSBiYXNpYyBwYXJhbXMgYWdhaW5zdCB3aGF0IGlzIGRlZmluZWQgaW4gdGhlIGNvbmZpZyxcbiAgICogICBhbmQgaWYgdGhleSBhcmUgaW52YWxpZCBzZXQgdGhlIGRlZmF1bHRcbiAgICogQHBhcmFtIHtPYmplY3R9IHBhcmFtcyAtIHBhcmFtcyBhcyBmZXRjaGVkIGJ5IHRoaXMucGFyc2VRdWVyeVN0cmluZygpXG4gICAqIEByZXR1cm5zIHtPYmplY3R9IHNhbWUgcGFyYW1zIHdpdGggc29tZSBpbnZhbGlkIHBhcmFtZXRlcnMgY29ycmV0ZWQsIGFzIG5lY2Vzc2FyeVxuICAgKi9cbiAgdmFsaWRhdGVQYXJhbXMocGFyYW1zKSB7XG4gICAgdGhpcy5jb25maWcudmFsaWRhdGVQYXJhbXMuZm9yRWFjaChwYXJhbUtleSA9PiB7XG4gICAgICBpZiAocGFyYW1LZXkgPT09ICdwcm9qZWN0JyAmJiBwYXJhbXMucHJvamVjdCkge1xuICAgICAgICBwYXJhbXMucHJvamVjdCA9IHBhcmFtcy5wcm9qZWN0LnJlcGxhY2UoL153d3dcXC4vLCAnJyk7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IGRlZmF1bHRWYWx1ZSA9IHRoaXMuY29uZmlnLmRlZmF1bHRzW3BhcmFtS2V5XSxcbiAgICAgICAgcGFyYW1WYWx1ZSA9IHBhcmFtc1twYXJhbUtleV07XG5cbiAgICAgIGlmIChkZWZhdWx0VmFsdWUgJiYgIXRoaXMuY29uZmlnLnZhbGlkUGFyYW1zW3BhcmFtS2V5XS5pbmNsdWRlcyhwYXJhbVZhbHVlKSkge1xuICAgICAgICAvLyBvbmx5IHRocm93IGVycm9yIGlmIHRoZXkgdHJpZWQgdG8gcHJvdmlkZSBhbiBpbnZhbGlkIHZhbHVlXG4gICAgICAgIGlmICghIXBhcmFtVmFsdWUpIHtcbiAgICAgICAgICB0aGlzLmFkZEludmFsaWRQYXJhbU5vdGljZShwYXJhbUtleSk7XG4gICAgICAgIH1cblxuICAgICAgICBwYXJhbXNbcGFyYW1LZXldID0gZGVmYXVsdFZhbHVlO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgcmV0dXJuIHBhcmFtcztcbiAgfVxuXG4gIC8qKlxuICAgKiBBZGRzIGxpc3RlbmVycyB0byB0aGUgcHJvamVjdCBpbnB1dCBmb3IgdmFsaWRhdGlvbnMgYWdhaW5zdCB0aGUgc2l0ZSBtYXAsXG4gICAqICAgcmV2ZXJ0aW5nIHRvIHRoZSBvbGQgdmFsdWUgaWYgdGhlIG5ldyBvbmUgaXMgaW52YWxpZFxuICAgKiBAcGFyYW0ge0Jvb2xlYW59IFttdWx0aWxpbmd1YWxdIC0gd2hldGhlciB3ZSBzaG91bGQgY2hlY2sgaWYgaXQgaXMgYSBtdWx0aWxpbmd1YWwgcHJvamVjdFxuICAgKiBAcmV0dXJucyB7Qm9vbGVhbn0gd2hldGhlciBvciBub3QgdmFsaWRhdGlvbnMgcGFzc2VkXG4gICAqL1xuICB2YWxpZGF0ZVByb2plY3QobXVsdGlsaW5ndWFsID0gZmFsc2UpIHtcbiAgICBjb25zdCBwcm9qZWN0SW5wdXQgPSAkKHRoaXMuY29uZmlnLnByb2plY3RJbnB1dClbMF07XG4gICAgbGV0IHByb2plY3QgPSBwcm9qZWN0SW5wdXQudmFsdWUucmVwbGFjZSgvXnd3d1xcLi8sICcnKSxcbiAgICAgIHZhbGlkID0gZmFsc2U7XG5cbiAgICBpZiAobXVsdGlsaW5ndWFsICYmICF0aGlzLmlzTXVsdGlsYW5nUHJvamVjdCgpKSB7XG4gICAgICB0aGlzLndyaXRlTWVzc2FnZShcbiAgICAgICAgJC5pMThuKCdpbnZhbGlkLWxhbmctcHJvamVjdCcsIGA8YSBocmVmPScvLyR7cHJvamVjdC5lc2NhcGUoKX0nPiR7cHJvamVjdC5lc2NhcGUoKX08L2E+YCksXG4gICAgICAgICd3YXJuaW5nJ1xuICAgICAgKTtcbiAgICAgIHByb2plY3QgPSBwcm9qZWN0SW5wdXQuZGF0YXNldC52YWx1ZTtcbiAgICB9IGVsc2UgaWYgKHNpdGVEb21haW5zLmluY2x1ZGVzKHByb2plY3QpKSB7XG4gICAgICB0aGlzLmNsZWFyTWVzc2FnZXMoKTtcbiAgICAgIHRoaXMudXBkYXRlSW50ZXJBcHBMaW5rcygpO1xuICAgICAgdmFsaWQgPSB0cnVlO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLndyaXRlTWVzc2FnZShcbiAgICAgICAgJC5pMThuKCdpbnZhbGlkLXByb2plY3QnLCBgPGEgaHJlZj0nLy8ke3Byb2plY3QuZXNjYXBlKCl9Jz4ke3Byb2plY3QuZXNjYXBlKCl9PC9hPmApLFxuICAgICAgICAnd2FybmluZydcbiAgICAgICk7XG4gICAgICBwcm9qZWN0ID0gcHJvamVjdElucHV0LmRhdGFzZXQudmFsdWU7XG4gICAgfVxuXG4gICAgcHJvamVjdElucHV0LnZhbHVlID0gcHJvamVjdDtcblxuICAgIHJldHVybiB2YWxpZDtcbiAgfVxuXG4gIC8vIEZJWE1FOiByZXN0b3JlIHdyaXRlTWVzc2FnZSB0byB0aGUgd2F5IGl0IHVzZWQgdG8gYmUsXG4gIC8vIGFuZCBtYWtlIGFkZFNpdGVOb3RpY2UgZG8gdGhlIHRvYXN0ciwgYW5kIGNoYW5nZSBpbnN0YW5jZXMgb2YgdGhpcy53cml0ZU1lc3NhZ2VcbiAgLy8gYWNjb3JkaW5nbHlcbiAgLyoqXG4gICAqIFdyaXRlcyBtZXNzYWdlIGp1c3QgYmVsb3cgdGhlIGNoYXJ0XG4gICAqIEBwYXJhbSB7c3RyaW5nfSBtZXNzYWdlIC0gbWVzc2FnZSB0byB3cml0ZVxuICAgKiBAcGFyYW0ge051bWJlcn0gdGltZW91dCAtIG51bSBzZWNvbmRzIHRvIHNob3dcbiAgICogQHJldHVybnMge2pRdWVyeX0gLSBqUXVlcnkgb2JqZWN0IG9mIG1lc3NhZ2UgY29udGFpbmVyXG4gICAqL1xuICB3cml0ZU1lc3NhZ2UobWVzc2FnZSwgbGV2ZWwgPSAnd2FybmluZycsIHRpbWVvdXQgPSA1MDAwKSB7XG4gICAgdG9hc3RyLm9wdGlvbnMudGltZU91dCA9IHRpbWVvdXQ7XG4gICAgdG9hc3RyW2xldmVsXShtZXNzYWdlKTtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IFB2O1xuIiwiLyoqXG4gKiBAZmlsZSBTaGFyZWQgY29uZmlnIGFtb25nc3QgYWxsIGFwcHNcbiAqIEBhdXRob3IgTXVzaWtBbmltYWxcbiAqIEBjb3B5cmlnaHQgMjAxNiBNdXNpa0FuaW1hbFxuICogQGxpY2Vuc2UgTUlUIExpY2Vuc2U6IGh0dHBzOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvTUlUXG4gKi9cblxuY29uc3Qgc2l0ZU1hcCA9IHJlcXVpcmUoJy4vc2l0ZV9tYXAnKTtcbmNvbnN0IHNpdGVEb21haW5zID0gT2JqZWN0LmtleXMoc2l0ZU1hcCkubWFwKGtleSA9PiBzaXRlTWFwW2tleV0pO1xuXG4vKipcbiAqIENvbmZpZ3VyYXRpb24gZm9yIGFsbCBQYWdldmlld3MgYXBwbGljYXRpb25zLlxuICogU29tZSBwcm9wZXJ0aWVzIG1heSBiZSBvdmVycmlkZW4gYnkgYXBwLXNwZWNpZmljIGNvbmZpZ3NcbiAqL1xuY2xhc3MgUHZDb25maWcge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBsZXQgc2VsZiA9IHRoaXM7XG4gICAgY29uc3QgZm9ybWF0WEF4aXNUaWNrID0gdmFsdWUgPT4ge1xuICAgICAgY29uc3QgZGF5T2ZXZWVrID0gbW9tZW50KHZhbHVlLCB0aGlzLmRhdGVGb3JtYXQpLndlZWtkYXkoKTtcbiAgICAgIGlmIChkYXlPZldlZWsgJSA3KSB7XG4gICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBg4oCiICR7dmFsdWV9YDtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgdGhpcy5jb25maWcgPSB7XG4gICAgICBhcGlMaW1pdDogNTAwMCxcbiAgICAgIGFwaVRocm90dGxlOiAyMCxcbiAgICAgIGFwcHM6IFsncGFnZXZpZXdzJywgJ3RvcHZpZXdzJywgJ2xhbmd2aWV3cycsICdzaXRldmlld3MnLCAnbWFzc3ZpZXdzJywgJ3JlZGlyZWN0dmlld3MnXSxcbiAgICAgIGNoYXJ0Q29uZmlnOiB7XG4gICAgICAgIGxpbmU6IHtcbiAgICAgICAgICBvcHRzOiB7XG4gICAgICAgICAgICBzY2FsZXM6IHtcbiAgICAgICAgICAgICAgeUF4ZXM6IFt7XG4gICAgICAgICAgICAgICAgdGlja3M6IHtcbiAgICAgICAgICAgICAgICAgIGNhbGxiYWNrOiB2YWx1ZSA9PiB0aGlzLmZvcm1hdFlBeGlzTnVtYmVyKHZhbHVlKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfV0sXG4gICAgICAgICAgICAgIHhBeGVzOiBbe1xuICAgICAgICAgICAgICAgIHRpY2tzOiB7XG4gICAgICAgICAgICAgICAgICBjYWxsYmFjazogdmFsdWUgPT4ge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZm9ybWF0WEF4aXNUaWNrKHZhbHVlKTtcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1dXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgbGVnZW5kQ2FsbGJhY2s6IGNoYXJ0ID0+IHRoaXMuY29uZmlnLmNoYXJ0TGVnZW5kKHNlbGYpLFxuICAgICAgICAgICAgdG9vbHRpcHM6IHRoaXMubGluZWFyVG9vbHRpcHNcbiAgICAgICAgICB9LFxuICAgICAgICAgIGRhdGFzZXQoY29sb3IpIHtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgIGNvbG9yLFxuICAgICAgICAgICAgICBiYWNrZ3JvdW5kQ29sb3I6ICdyZ2JhKDAsMCwwLDApJyxcbiAgICAgICAgICAgICAgYm9yZGVyV2lkdGg6IDIsXG4gICAgICAgICAgICAgIGJvcmRlckNvbG9yOiBjb2xvcixcbiAgICAgICAgICAgICAgcG9pbnRDb2xvcjogY29sb3IsXG4gICAgICAgICAgICAgIHBvaW50QmFja2dyb3VuZENvbG9yOiBjb2xvcixcbiAgICAgICAgICAgICAgcG9pbnRCb3JkZXJDb2xvcjogc2VsZi5yZ2JhKGNvbG9yLCAwLjIpLFxuICAgICAgICAgICAgICBwb2ludEhvdmVyQmFja2dyb3VuZENvbG9yOiBjb2xvcixcbiAgICAgICAgICAgICAgcG9pbnRIb3ZlckJvcmRlckNvbG9yOiBjb2xvcixcbiAgICAgICAgICAgICAgcG9pbnRIb3ZlckJvcmRlcldpZHRoOiAyLFxuICAgICAgICAgICAgICBwb2ludEhvdmVyUmFkaXVzOiA1LFxuICAgICAgICAgICAgICB0ZW5zaW9uOiBzZWxmLmJlemllckN1cnZlID09PSAndHJ1ZScgPyAwLjQgOiAwXG4gICAgICAgICAgICB9O1xuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgYmFyOiB7XG4gICAgICAgICAgb3B0czoge1xuICAgICAgICAgICAgc2NhbGVzOiB7XG4gICAgICAgICAgICAgIHlBeGVzOiBbe1xuICAgICAgICAgICAgICAgIHRpY2tzOiB7XG4gICAgICAgICAgICAgICAgICBjYWxsYmFjazogdmFsdWUgPT4gdGhpcy5mb3JtYXRZQXhpc051bWJlcih2YWx1ZSlcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1dLFxuICAgICAgICAgICAgICB4QXhlczogW3tcbiAgICAgICAgICAgICAgICBiYXJQZXJjZW50YWdlOiAxLjAsXG4gICAgICAgICAgICAgICAgY2F0ZWdvcnlQZXJjZW50YWdlOiAwLjg1LFxuICAgICAgICAgICAgICAgIHRpY2tzOiB7XG4gICAgICAgICAgICAgICAgICBjYWxsYmFjazogdmFsdWUgPT4ge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZm9ybWF0WEF4aXNUaWNrKHZhbHVlKTtcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1dXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgbGVnZW5kQ2FsbGJhY2s6IGNoYXJ0ID0+IHRoaXMuY29uZmlnLmNoYXJ0TGVnZW5kKHNlbGYpLFxuICAgICAgICAgICAgdG9vbHRpcHM6IHRoaXMubGluZWFyVG9vbHRpcHNcbiAgICAgICAgICB9LFxuICAgICAgICAgIGRhdGFzZXQoY29sb3IpIHtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgIGNvbG9yLFxuICAgICAgICAgICAgICBiYWNrZ3JvdW5kQ29sb3I6IHNlbGYucmdiYShjb2xvciwgMC42KSxcbiAgICAgICAgICAgICAgYm9yZGVyQ29sb3I6IHNlbGYucmdiYShjb2xvciwgMC45KSxcbiAgICAgICAgICAgICAgYm9yZGVyV2lkdGg6IDIsXG4gICAgICAgICAgICAgIGhvdmVyQmFja2dyb3VuZENvbG9yOiBzZWxmLnJnYmEoY29sb3IsIDAuNzUpLFxuICAgICAgICAgICAgICBob3ZlckJvcmRlckNvbG9yOiBjb2xvclxuICAgICAgICAgICAgfTtcbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIHJhZGFyOiB7XG4gICAgICAgICAgb3B0czoge1xuICAgICAgICAgICAgc2NhbGU6IHtcbiAgICAgICAgICAgICAgdGlja3M6IHtcbiAgICAgICAgICAgICAgICBjYWxsYmFjazogdmFsdWUgPT4gdGhpcy5mb3JtYXROdW1iZXIodmFsdWUpXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBsZWdlbmRDYWxsYmFjazogY2hhcnQgPT4gdGhpcy5jb25maWcuY2hhcnRMZWdlbmQoc2VsZiksXG4gICAgICAgICAgICB0b29sdGlwczogdGhpcy5saW5lYXJUb29sdGlwc1xuICAgICAgICAgIH0sXG4gICAgICAgICAgZGF0YXNldChjb2xvcikge1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgY29sb3IsXG4gICAgICAgICAgICAgIGJhY2tncm91bmRDb2xvcjogc2VsZi5yZ2JhKGNvbG9yLCAwLjEpLFxuICAgICAgICAgICAgICBib3JkZXJDb2xvcjogY29sb3IsXG4gICAgICAgICAgICAgIGJvcmRlcldpZHRoOiAyLFxuICAgICAgICAgICAgICBwb2ludEJhY2tncm91bmRDb2xvcjogY29sb3IsXG4gICAgICAgICAgICAgIHBvaW50Qm9yZGVyQ29sb3I6IHNlbGYucmdiYShjb2xvciwgMC44KSxcbiAgICAgICAgICAgICAgcG9pbnRIb3ZlckJhY2tncm91bmRDb2xvcjogY29sb3IsXG4gICAgICAgICAgICAgIHBvaW50SG92ZXJCb3JkZXJDb2xvcjogY29sb3IsXG4gICAgICAgICAgICAgIHBvaW50SG92ZXJSYWRpdXM6IDVcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBwaWU6IHtcbiAgICAgICAgICBvcHRzOiB7XG4gICAgICAgICAgICBsZWdlbmRDYWxsYmFjazogY2hhcnQgPT4gdGhpcy5jb25maWcuY2hhcnRMZWdlbmQoc2VsZiksXG4gICAgICAgICAgICB0b29sdGlwczogdGhpcy5jaXJjdWxhclRvb2x0aXBzXG4gICAgICAgICAgfSxcbiAgICAgICAgICBkYXRhc2V0KGNvbG9yKSB7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICBjb2xvcixcbiAgICAgICAgICAgICAgYmFja2dyb3VuZENvbG9yOiBjb2xvcixcbiAgICAgICAgICAgICAgaG92ZXJCYWNrZ3JvdW5kQ29sb3I6IHNlbGYucmdiYShjb2xvciwgMC44KVxuICAgICAgICAgICAgfTtcbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIGRvdWdobnV0OiB7XG4gICAgICAgICAgb3B0czoge1xuICAgICAgICAgICAgbGVnZW5kQ2FsbGJhY2s6IGNoYXJ0ID0+IHRoaXMuY29uZmlnLmNoYXJ0TGVnZW5kKHNlbGYpLFxuICAgICAgICAgICAgdG9vbHRpcHM6IHRoaXMuY2lyY3VsYXJUb29sdGlwc1xuICAgICAgICAgIH0sXG4gICAgICAgICAgZGF0YXNldChjb2xvcikge1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgY29sb3I6IGNvbG9yLFxuICAgICAgICAgICAgICBiYWNrZ3JvdW5kQ29sb3I6IGNvbG9yLFxuICAgICAgICAgICAgICBob3ZlckJhY2tncm91bmRDb2xvcjogc2VsZi5yZ2JhKGNvbG9yLCAwLjgpXG4gICAgICAgICAgICB9O1xuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgcG9sYXJBcmVhOiB7XG4gICAgICAgICAgb3B0czoge1xuICAgICAgICAgICAgc2NhbGU6IHtcbiAgICAgICAgICAgICAgdGlja3M6IHtcbiAgICAgICAgICAgICAgICBiZWdpbkF0WmVybzogdHJ1ZSxcbiAgICAgICAgICAgICAgICBjYWxsYmFjazogdmFsdWUgPT4gdGhpcy5mb3JtYXROdW1iZXIodmFsdWUpXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBsZWdlbmRDYWxsYmFjazogY2hhcnQgPT4gdGhpcy5jb25maWcuY2hhcnRMZWdlbmQoc2VsZiksXG4gICAgICAgICAgICB0b29sdGlwczogdGhpcy5jaXJjdWxhclRvb2x0aXBzXG4gICAgICAgICAgfSxcbiAgICAgICAgICBkYXRhc2V0KGNvbG9yKSB7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICBjb2xvcjogY29sb3IsXG4gICAgICAgICAgICAgIGJhY2tncm91bmRDb2xvcjogc2VsZi5yZ2JhKGNvbG9yLCAwLjcpLFxuICAgICAgICAgICAgICBob3ZlckJhY2tncm91bmRDb2xvcjogc2VsZi5yZ2JhKGNvbG9yLCAwLjkpXG4gICAgICAgICAgICB9O1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIGNpcmN1bGFyQ2hhcnRzOiBbJ3BpZScsICdkb3VnaG51dCcsICdwb2xhckFyZWEnXSxcbiAgICAgIGNvbG9yczogWydyZ2JhKDE3MSwgMjEyLCAyMzUsIDEpJywgJ3JnYmEoMTc4LCAyMjMsIDEzOCwgMSknLCAncmdiYSgyNTEsIDE1NCwgMTUzLCAxKScsICdyZ2JhKDI1MywgMTkxLCAxMTEsIDEpJywgJ3JnYmEoMjAyLCAxNzgsIDIxNCwgMSknLCAncmdiYSgyMDcsIDE4MiwgMTI4LCAxKScsICdyZ2JhKDE0MSwgMjExLCAxOTksIDEpJywgJ3JnYmEoMjUyLCAyMDUsIDIyOSwgMSknLCAncmdiYSgyNTUsIDI0NywgMTYxLCAxKScsICdyZ2JhKDIxNywgMjE3LCAyMTcsIDEpJ10sXG4gICAgICBkZWZhdWx0czoge1xuICAgICAgICBhdXRvY29tcGxldGU6ICdhdXRvY29tcGxldGUnLFxuICAgICAgICBjaGFydFR5cGU6IG51bURhdGFzZXRzID0+IG51bURhdGFzZXRzID4gMSA/ICdsaW5lJyA6ICdiYXInLFxuICAgICAgICBkYXRlRm9ybWF0OiAnWVlZWS1NTS1ERCcsXG4gICAgICAgIGxvY2FsaXplRGF0ZUZvcm1hdDogJ3RydWUnLFxuICAgICAgICBudW1lcmljYWxGb3JtYXR0aW5nOiAndHJ1ZScsXG4gICAgICAgIGJlemllckN1cnZlOiAnZmFsc2UnLFxuICAgICAgICBhdXRvTG9nRGV0ZWN0aW9uOiAndHJ1ZScsXG4gICAgICAgIGJlZ2luQXRaZXJvOiAnZmFsc2UnLFxuICAgICAgICByZW1lbWJlckNoYXJ0OiAndHJ1ZScsXG4gICAgICAgIGFnZW50OiAndXNlcicsXG4gICAgICAgIHBsYXRmb3JtOiAnYWxsLWFjY2VzcycsXG4gICAgICAgIHByb2plY3Q6ICdlbi53aWtpcGVkaWEub3JnJ1xuICAgICAgfSxcbiAgICAgIGdsb2JhbENoYXJ0T3B0czoge1xuICAgICAgICBhbmltYXRpb246IHtcbiAgICAgICAgICBkdXJhdGlvbjogNTAwLFxuICAgICAgICAgIGVhc2luZzogJ2Vhc2VJbk91dFF1YXJ0J1xuICAgICAgICB9LFxuICAgICAgICBob3Zlcjoge1xuICAgICAgICAgIGFuaW1hdGlvbkR1cmF0aW9uOiAwXG4gICAgICAgIH0sXG4gICAgICAgIGxlZ2VuZDoge1xuICAgICAgICAgIGRpc3BsYXk6IGZhbHNlXG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBsaW5lYXJDaGFydHM6IFsnbGluZScsICdiYXInLCAncmFkYXInXSxcbiAgICAgIGxpbmVhck9wdHM6IHtcbiAgICAgICAgc2NhbGVzOiB7XG4gICAgICAgICAgeUF4ZXM6IFt7XG4gICAgICAgICAgICB0aWNrczoge1xuICAgICAgICAgICAgICBjYWxsYmFjazogdmFsdWUgPT4gdGhpcy5mb3JtYXROdW1iZXIodmFsdWUpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfV1cbiAgICAgICAgfSxcbiAgICAgICAgbGVnZW5kQ2FsbGJhY2s6IGNoYXJ0ID0+IHRoaXMuY29uZmlnLmNoYXJ0TGVnZW5kKGNoYXJ0LmRhdGEuZGF0YXNldHMsIHNlbGYpXG4gICAgICB9LFxuICAgICAgZGF5c0FnbzogMjAsXG4gICAgICBtaW5EYXRlOiBtb21lbnQoJzIwMTUtMDctMDEnKS5zdGFydE9mKCdkYXknKSxcbiAgICAgIG1heERhdGU6IG1vbWVudCgpLnN1YnRyYWN0KDEsICdkYXlzJykuc3RhcnRPZignZGF5JyksXG4gICAgICBzcGVjaWFsUmFuZ2VzOiB7XG4gICAgICAgICdsYXN0LXdlZWsnOiBbbW9tZW50KCkuc3VidHJhY3QoMSwgJ3dlZWsnKS5zdGFydE9mKCd3ZWVrJyksIG1vbWVudCgpLnN1YnRyYWN0KDEsICd3ZWVrJykuZW5kT2YoJ3dlZWsnKV0sXG4gICAgICAgICd0aGlzLW1vbnRoJzogW21vbWVudCgpLnN0YXJ0T2YoJ21vbnRoJyksIG1vbWVudCgpLnN1YnRyYWN0KDEsICdkYXlzJykuc3RhcnRPZignZGF5JyldLFxuICAgICAgICAnbGFzdC1tb250aCc6IFttb21lbnQoKS5zdWJ0cmFjdCgxLCAnbW9udGgnKS5zdGFydE9mKCdtb250aCcpLCBtb21lbnQoKS5zdWJ0cmFjdCgxLCAnbW9udGgnKS5lbmRPZignbW9udGgnKV0sXG4gICAgICAgIGxhdGVzdChvZmZzZXQgPSBzZWxmLmNvbmZpZy5kYXlzQWdvKSB7XG4gICAgICAgICAgcmV0dXJuIFttb21lbnQoKS5zdWJ0cmFjdChvZmZzZXQsICdkYXlzJykuc3RhcnRPZignZGF5JyksIHNlbGYuY29uZmlnLm1heERhdGVdO1xuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgdGltZXN0YW1wRm9ybWF0OiAnWVlZWU1NREQwMCcsXG4gICAgICB2YWxpZFBhcmFtczoge1xuICAgICAgICBhZ2VudDogWydhbGwtYWdlbnRzJywgJ3VzZXInLCAnc3BpZGVyJywgJ2JvdCddLFxuICAgICAgICBwbGF0Zm9ybTogWydhbGwtYWNjZXNzJywgJ2Rlc2t0b3AnLCAnbW9iaWxlLWFwcCcsICdtb2JpbGUtd2ViJ10sXG4gICAgICAgIHByb2plY3Q6IHNpdGVEb21haW5zXG4gICAgICB9XG4gICAgfTtcbiAgfVxuXG4gIGdldCBsaW5lYXJUb29sdGlwcygpIHtcbiAgICByZXR1cm4ge1xuICAgICAgbW9kZTogJ2xhYmVsJyxcbiAgICAgIGNhbGxiYWNrczoge1xuICAgICAgICBsYWJlbDogdG9vbHRpcEl0ZW0gPT4ge1xuICAgICAgICAgIGlmIChOdW1iZXIuaXNOYU4odG9vbHRpcEl0ZW0ueUxhYmVsKSkge1xuICAgICAgICAgICAgcmV0dXJuICcgJyArICQuaTE4bigndW5rbm93bicpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gJyAnICsgdGhpcy5mb3JtYXROdW1iZXIodG9vbHRpcEl0ZW0ueUxhYmVsKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBib2R5Rm9udFNpemU6IDE0LFxuICAgICAgYm9keVNwYWNpbmc6IDcsXG4gICAgICBjYXJldFNpemU6IDAsXG4gICAgICB0aXRsZUZvbnRTaXplOiAxNFxuICAgIH07XG4gIH1cblxuICBnZXQgY2lyY3VsYXJUb29sdGlwcygpIHtcbiAgICByZXR1cm4ge1xuICAgICAgY2FsbGJhY2tzOiB7XG4gICAgICAgIGxhYmVsOiAodG9vbHRpcEl0ZW0sIGNoYXJ0SW5zdGFuY2UpID0+IHtcbiAgICAgICAgICBjb25zdCB2YWx1ZSA9IGNoYXJ0SW5zdGFuY2UuZGF0YXNldHNbdG9vbHRpcEl0ZW0uZGF0YXNldEluZGV4XS5kYXRhW3Rvb2x0aXBJdGVtLmluZGV4XSxcbiAgICAgICAgICAgIGxhYmVsID0gY2hhcnRJbnN0YW5jZS5sYWJlbHNbdG9vbHRpcEl0ZW0uaW5kZXhdO1xuXG4gICAgICAgICAgaWYgKE51bWJlci5pc05hTih2YWx1ZSkpIHtcbiAgICAgICAgICAgIHJldHVybiBgJHtsYWJlbH06ICR7JC5pMThuKCd1bmtub3duJyl9YDtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIGAke2xhYmVsfTogJHt0aGlzLmZvcm1hdE51bWJlcih2YWx1ZSl9YDtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBib2R5Rm9udFNpemU6IDE0LFxuICAgICAgYm9keVNwYWNpbmc6IDcsXG4gICAgICBjYXJldFNpemU6IDAsXG4gICAgICB0aXRsZUZvbnRTaXplOiAxNFxuICAgIH07XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBQdkNvbmZpZztcbiIsIi8qKlxuICogQGZpbGUgV01GIFtzaXRlIG1hdHJpeF0oaHR0cHM6Ly93d3cubWVkaWF3aWtpLm9yZy93L2FwaS5waHA/YWN0aW9uPXNpdGVtYXRyaXgpLCB3aXRoIHNvbWUgdW5zdXBwb3J0ZWQgd2lraXMgcmVtb3ZlZFxuICovXG5cbi8qKlxuICogU2l0ZW1hdHJpeCBvZiBhbGwgc3VwcG9ydGVkIFdNRiB3aWtpc1xuICogQHR5cGUge09iamVjdH1cbiAqL1xuY29uc3Qgc2l0ZU1hcCA9IHtcbiAgJ2Fhd2lraSc6ICdhYS53aWtpcGVkaWEub3JnJyxcbiAgJ2Fhd2lrdGlvbmFyeSc6ICdhYS53aWt0aW9uYXJ5Lm9yZycsXG4gICdhYXdpa2lib29rcyc6ICdhYS53aWtpYm9va3Mub3JnJyxcbiAgJ2Fid2lraSc6ICdhYi53aWtpcGVkaWEub3JnJyxcbiAgJ2Fid2lrdGlvbmFyeSc6ICdhYi53aWt0aW9uYXJ5Lm9yZycsXG4gICdhY2V3aWtpJzogJ2FjZS53aWtpcGVkaWEub3JnJyxcbiAgJ2FkeXdpa2knOiAnYWR5Lndpa2lwZWRpYS5vcmcnLFxuICAnYWZ3aWtpJzogJ2FmLndpa2lwZWRpYS5vcmcnLFxuICAnYWZ3aWt0aW9uYXJ5JzogJ2FmLndpa3Rpb25hcnkub3JnJyxcbiAgJ2Fmd2lraWJvb2tzJzogJ2FmLndpa2lib29rcy5vcmcnLFxuICAnYWZ3aWtpcXVvdGUnOiAnYWYud2lraXF1b3RlLm9yZycsXG4gICdha3dpa2knOiAnYWsud2lraXBlZGlhLm9yZycsXG4gICdha3dpa3Rpb25hcnknOiAnYWsud2lrdGlvbmFyeS5vcmcnLFxuICAnYWt3aWtpYm9va3MnOiAnYWsud2lraWJvb2tzLm9yZycsXG4gICdhbHN3aWtpJzogJ2Fscy53aWtpcGVkaWEub3JnJyxcbiAgJ2Fsc3dpa3Rpb25hcnknOiAnYWxzLndpa3Rpb25hcnkub3JnJyxcbiAgJ2Fsc3dpa2lib29rcyc6ICdhbHMud2lraWJvb2tzLm9yZycsXG4gICdhbHN3aWtpcXVvdGUnOiAnYWxzLndpa2lxdW90ZS5vcmcnLFxuICAnYW13aWtpJzogJ2FtLndpa2lwZWRpYS5vcmcnLFxuICAnYW13aWt0aW9uYXJ5JzogJ2FtLndpa3Rpb25hcnkub3JnJyxcbiAgJ2Ftd2lraXF1b3RlJzogJ2FtLndpa2lxdW90ZS5vcmcnLFxuICAnYW53aWtpJzogJ2FuLndpa2lwZWRpYS5vcmcnLFxuICAnYW53aWt0aW9uYXJ5JzogJ2FuLndpa3Rpb25hcnkub3JnJyxcbiAgJ2FuZ3dpa2knOiAnYW5nLndpa2lwZWRpYS5vcmcnLFxuICAnYW5nd2lrdGlvbmFyeSc6ICdhbmcud2lrdGlvbmFyeS5vcmcnLFxuICAnYW5nd2lraWJvb2tzJzogJ2FuZy53aWtpYm9va3Mub3JnJyxcbiAgJ2FuZ3dpa2lxdW90ZSc6ICdhbmcud2lraXF1b3RlLm9yZycsXG4gICdhbmd3aWtpc291cmNlJzogJ2FuZy53aWtpc291cmNlLm9yZycsXG4gICdhcndpa2knOiAnYXIud2lraXBlZGlhLm9yZycsXG4gICdhcndpa3Rpb25hcnknOiAnYXIud2lrdGlvbmFyeS5vcmcnLFxuICAnYXJ3aWtpYm9va3MnOiAnYXIud2lraWJvb2tzLm9yZycsXG4gICdhcndpa2luZXdzJzogJ2FyLndpa2luZXdzLm9yZycsXG4gICdhcndpa2lxdW90ZSc6ICdhci53aWtpcXVvdGUub3JnJyxcbiAgJ2Fyd2lraXNvdXJjZSc6ICdhci53aWtpc291cmNlLm9yZycsXG4gICdhcndpa2l2ZXJzaXR5JzogJ2FyLndpa2l2ZXJzaXR5Lm9yZycsXG4gICdhcmN3aWtpJzogJ2FyYy53aWtpcGVkaWEub3JnJyxcbiAgJ2Fyendpa2knOiAnYXJ6Lndpa2lwZWRpYS5vcmcnLFxuICAnYXN3aWtpJzogJ2FzLndpa2lwZWRpYS5vcmcnLFxuICAnYXN3aWt0aW9uYXJ5JzogJ2FzLndpa3Rpb25hcnkub3JnJyxcbiAgJ2Fzd2lraWJvb2tzJzogJ2FzLndpa2lib29rcy5vcmcnLFxuICAnYXN3aWtpc291cmNlJzogJ2FzLndpa2lzb3VyY2Uub3JnJyxcbiAgJ2FzdHdpa2knOiAnYXN0Lndpa2lwZWRpYS5vcmcnLFxuICAnYXN0d2lrdGlvbmFyeSc6ICdhc3Qud2lrdGlvbmFyeS5vcmcnLFxuICAnYXN0d2lraWJvb2tzJzogJ2FzdC53aWtpYm9va3Mub3JnJyxcbiAgJ2FzdHdpa2lxdW90ZSc6ICdhc3Qud2lraXF1b3RlLm9yZycsXG4gICdhdndpa2knOiAnYXYud2lraXBlZGlhLm9yZycsXG4gICdhdndpa3Rpb25hcnknOiAnYXYud2lrdGlvbmFyeS5vcmcnLFxuICAnYXl3aWtpJzogJ2F5Lndpa2lwZWRpYS5vcmcnLFxuICAnYXl3aWt0aW9uYXJ5JzogJ2F5Lndpa3Rpb25hcnkub3JnJyxcbiAgJ2F5d2lraWJvb2tzJzogJ2F5Lndpa2lib29rcy5vcmcnLFxuICAnYXp3aWtpJzogJ2F6Lndpa2lwZWRpYS5vcmcnLFxuICAnYXp3aWt0aW9uYXJ5JzogJ2F6Lndpa3Rpb25hcnkub3JnJyxcbiAgJ2F6d2lraWJvb2tzJzogJ2F6Lndpa2lib29rcy5vcmcnLFxuICAnYXp3aWtpcXVvdGUnOiAnYXoud2lraXF1b3RlLm9yZycsXG4gICdhendpa2lzb3VyY2UnOiAnYXoud2lraXNvdXJjZS5vcmcnLFxuICAnYXpid2lraSc6ICdhemIud2lraXBlZGlhLm9yZycsXG4gICdiYXdpa2knOiAnYmEud2lraXBlZGlhLm9yZycsXG4gICdiYXdpa2lib29rcyc6ICdiYS53aWtpYm9va3Mub3JnJyxcbiAgJ2Jhcndpa2knOiAnYmFyLndpa2lwZWRpYS5vcmcnLFxuICAnYmF0X3NtZ3dpa2knOiAnYmF0LXNtZy53aWtpcGVkaWEub3JnJyxcbiAgJ2JjbHdpa2knOiAnYmNsLndpa2lwZWRpYS5vcmcnLFxuICAnYmV3aWtpJzogJ2JlLndpa2lwZWRpYS5vcmcnLFxuICAnYmV3aWt0aW9uYXJ5JzogJ2JlLndpa3Rpb25hcnkub3JnJyxcbiAgJ2Jld2lraWJvb2tzJzogJ2JlLndpa2lib29rcy5vcmcnLFxuICAnYmV3aWtpcXVvdGUnOiAnYmUud2lraXF1b3RlLm9yZycsXG4gICdiZXdpa2lzb3VyY2UnOiAnYmUud2lraXNvdXJjZS5vcmcnLFxuICAnYmVfeF9vbGR3aWtpJzogJ2JlLXRhcmFzay53aWtpcGVkaWEub3JnJyxcbiAgJ2Jnd2lraSc6ICdiZy53aWtpcGVkaWEub3JnJyxcbiAgJ2Jnd2lrdGlvbmFyeSc6ICdiZy53aWt0aW9uYXJ5Lm9yZycsXG4gICdiZ3dpa2lib29rcyc6ICdiZy53aWtpYm9va3Mub3JnJyxcbiAgJ2Jnd2lraW5ld3MnOiAnYmcud2lraW5ld3Mub3JnJyxcbiAgJ2Jnd2lraXF1b3RlJzogJ2JnLndpa2lxdW90ZS5vcmcnLFxuICAnYmd3aWtpc291cmNlJzogJ2JnLndpa2lzb3VyY2Uub3JnJyxcbiAgJ2Jod2lraSc6ICdiaC53aWtpcGVkaWEub3JnJyxcbiAgJ2Jod2lrdGlvbmFyeSc6ICdiaC53aWt0aW9uYXJ5Lm9yZycsXG4gICdiaXdpa2knOiAnYmkud2lraXBlZGlhLm9yZycsXG4gICdiaXdpa3Rpb25hcnknOiAnYmkud2lrdGlvbmFyeS5vcmcnLFxuICAnYml3aWtpYm9va3MnOiAnYmkud2lraWJvb2tzLm9yZycsXG4gICdiam53aWtpJzogJ2Jqbi53aWtpcGVkaWEub3JnJyxcbiAgJ2Jtd2lraSc6ICdibS53aWtpcGVkaWEub3JnJyxcbiAgJ2Jtd2lrdGlvbmFyeSc6ICdibS53aWt0aW9uYXJ5Lm9yZycsXG4gICdibXdpa2lib29rcyc6ICdibS53aWtpYm9va3Mub3JnJyxcbiAgJ2Jtd2lraXF1b3RlJzogJ2JtLndpa2lxdW90ZS5vcmcnLFxuICAnYm53aWtpJzogJ2JuLndpa2lwZWRpYS5vcmcnLFxuICAnYm53aWt0aW9uYXJ5JzogJ2JuLndpa3Rpb25hcnkub3JnJyxcbiAgJ2Jud2lraWJvb2tzJzogJ2JuLndpa2lib29rcy5vcmcnLFxuICAnYm53aWtpc291cmNlJzogJ2JuLndpa2lzb3VyY2Uub3JnJyxcbiAgJ2Jvd2lraSc6ICdiby53aWtpcGVkaWEub3JnJyxcbiAgJ2Jvd2lrdGlvbmFyeSc6ICdiby53aWt0aW9uYXJ5Lm9yZycsXG4gICdib3dpa2lib29rcyc6ICdiby53aWtpYm9va3Mub3JnJyxcbiAgJ2JweXdpa2knOiAnYnB5Lndpa2lwZWRpYS5vcmcnLFxuICAnYnJ3aWtpJzogJ2JyLndpa2lwZWRpYS5vcmcnLFxuICAnYnJ3aWt0aW9uYXJ5JzogJ2JyLndpa3Rpb25hcnkub3JnJyxcbiAgJ2Jyd2lraXF1b3RlJzogJ2JyLndpa2lxdW90ZS5vcmcnLFxuICAnYnJ3aWtpc291cmNlJzogJ2JyLndpa2lzb3VyY2Uub3JnJyxcbiAgJ2Jzd2lraSc6ICdicy53aWtpcGVkaWEub3JnJyxcbiAgJ2Jzd2lrdGlvbmFyeSc6ICdicy53aWt0aW9uYXJ5Lm9yZycsXG4gICdic3dpa2lib29rcyc6ICdicy53aWtpYm9va3Mub3JnJyxcbiAgJ2Jzd2lraW5ld3MnOiAnYnMud2lraW5ld3Mub3JnJyxcbiAgJ2Jzd2lraXF1b3RlJzogJ2JzLndpa2lxdW90ZS5vcmcnLFxuICAnYnN3aWtpc291cmNlJzogJ2JzLndpa2lzb3VyY2Uub3JnJyxcbiAgJ2J1Z3dpa2knOiAnYnVnLndpa2lwZWRpYS5vcmcnLFxuICAnYnhyd2lraSc6ICdieHIud2lraXBlZGlhLm9yZycsXG4gICdjYXdpa2knOiAnY2Eud2lraXBlZGlhLm9yZycsXG4gICdjYXdpa3Rpb25hcnknOiAnY2Eud2lrdGlvbmFyeS5vcmcnLFxuICAnY2F3aWtpYm9va3MnOiAnY2Eud2lraWJvb2tzLm9yZycsXG4gICdjYXdpa2luZXdzJzogJ2NhLndpa2luZXdzLm9yZycsXG4gICdjYXdpa2lxdW90ZSc6ICdjYS53aWtpcXVvdGUub3JnJyxcbiAgJ2Nhd2lraXNvdXJjZSc6ICdjYS53aWtpc291cmNlLm9yZycsXG4gICdjYmtfemFtd2lraSc6ICdjYmstemFtLndpa2lwZWRpYS5vcmcnLFxuICAnY2Rvd2lraSc6ICdjZG8ud2lraXBlZGlhLm9yZycsXG4gICdjZXdpa2knOiAnY2Uud2lraXBlZGlhLm9yZycsXG4gICdjZWJ3aWtpJzogJ2NlYi53aWtpcGVkaWEub3JnJyxcbiAgJ2Nod2lraSc6ICdjaC53aWtpcGVkaWEub3JnJyxcbiAgJ2Nod2lrdGlvbmFyeSc6ICdjaC53aWt0aW9uYXJ5Lm9yZycsXG4gICdjaHdpa2lib29rcyc6ICdjaC53aWtpYm9va3Mub3JnJyxcbiAgJ2Nob3dpa2knOiAnY2hvLndpa2lwZWRpYS5vcmcnLFxuICAnY2hyd2lraSc6ICdjaHIud2lraXBlZGlhLm9yZycsXG4gICdjaHJ3aWt0aW9uYXJ5JzogJ2Noci53aWt0aW9uYXJ5Lm9yZycsXG4gICdjaHl3aWtpJzogJ2NoeS53aWtpcGVkaWEub3JnJyxcbiAgJ2NrYndpa2knOiAnY2tiLndpa2lwZWRpYS5vcmcnLFxuICAnY293aWtpJzogJ2NvLndpa2lwZWRpYS5vcmcnLFxuICAnY293aWt0aW9uYXJ5JzogJ2NvLndpa3Rpb25hcnkub3JnJyxcbiAgJ2Nvd2lraWJvb2tzJzogJ2NvLndpa2lib29rcy5vcmcnLFxuICAnY293aWtpcXVvdGUnOiAnY28ud2lraXF1b3RlLm9yZycsXG4gICdjcndpa2knOiAnY3Iud2lraXBlZGlhLm9yZycsXG4gICdjcndpa3Rpb25hcnknOiAnY3Iud2lrdGlvbmFyeS5vcmcnLFxuICAnY3J3aWtpcXVvdGUnOiAnY3Iud2lraXF1b3RlLm9yZycsXG4gICdjcmh3aWtpJzogJ2NyaC53aWtpcGVkaWEub3JnJyxcbiAgJ2Nzd2lraSc6ICdjcy53aWtpcGVkaWEub3JnJyxcbiAgJ2Nzd2lrdGlvbmFyeSc6ICdjcy53aWt0aW9uYXJ5Lm9yZycsXG4gICdjc3dpa2lib29rcyc6ICdjcy53aWtpYm9va3Mub3JnJyxcbiAgJ2Nzd2lraW5ld3MnOiAnY3Mud2lraW5ld3Mub3JnJyxcbiAgJ2Nzd2lraXF1b3RlJzogJ2NzLndpa2lxdW90ZS5vcmcnLFxuICAnY3N3aWtpc291cmNlJzogJ2NzLndpa2lzb3VyY2Uub3JnJyxcbiAgJ2Nzd2lraXZlcnNpdHknOiAnY3Mud2lraXZlcnNpdHkub3JnJyxcbiAgJ2NzYndpa2knOiAnY3NiLndpa2lwZWRpYS5vcmcnLFxuICAnY3Nid2lrdGlvbmFyeSc6ICdjc2Iud2lrdGlvbmFyeS5vcmcnLFxuICAnY3V3aWtpJzogJ2N1Lndpa2lwZWRpYS5vcmcnLFxuICAnY3Z3aWtpJzogJ2N2Lndpa2lwZWRpYS5vcmcnLFxuICAnY3Z3aWtpYm9va3MnOiAnY3Yud2lraWJvb2tzLm9yZycsXG4gICdjeXdpa2knOiAnY3kud2lraXBlZGlhLm9yZycsXG4gICdjeXdpa3Rpb25hcnknOiAnY3kud2lrdGlvbmFyeS5vcmcnLFxuICAnY3l3aWtpYm9va3MnOiAnY3kud2lraWJvb2tzLm9yZycsXG4gICdjeXdpa2lxdW90ZSc6ICdjeS53aWtpcXVvdGUub3JnJyxcbiAgJ2N5d2lraXNvdXJjZSc6ICdjeS53aWtpc291cmNlLm9yZycsXG4gICdkYXdpa2knOiAnZGEud2lraXBlZGlhLm9yZycsXG4gICdkYXdpa3Rpb25hcnknOiAnZGEud2lrdGlvbmFyeS5vcmcnLFxuICAnZGF3aWtpYm9va3MnOiAnZGEud2lraWJvb2tzLm9yZycsXG4gICdkYXdpa2lxdW90ZSc6ICdkYS53aWtpcXVvdGUub3JnJyxcbiAgJ2Rhd2lraXNvdXJjZSc6ICdkYS53aWtpc291cmNlLm9yZycsXG4gICdkZXdpa2knOiAnZGUud2lraXBlZGlhLm9yZycsXG4gICdkZXdpa3Rpb25hcnknOiAnZGUud2lrdGlvbmFyeS5vcmcnLFxuICAnZGV3aWtpYm9va3MnOiAnZGUud2lraWJvb2tzLm9yZycsXG4gICdkZXdpa2luZXdzJzogJ2RlLndpa2luZXdzLm9yZycsXG4gICdkZXdpa2lxdW90ZSc6ICdkZS53aWtpcXVvdGUub3JnJyxcbiAgJ2Rld2lraXNvdXJjZSc6ICdkZS53aWtpc291cmNlLm9yZycsXG4gICdkZXdpa2l2ZXJzaXR5JzogJ2RlLndpa2l2ZXJzaXR5Lm9yZycsXG4gICdkZXdpa2l2b3lhZ2UnOiAnZGUud2lraXZveWFnZS5vcmcnLFxuICAnZGlxd2lraSc6ICdkaXEud2lraXBlZGlhLm9yZycsXG4gICdkc2J3aWtpJzogJ2RzYi53aWtpcGVkaWEub3JnJyxcbiAgJ2R2d2lraSc6ICdkdi53aWtpcGVkaWEub3JnJyxcbiAgJ2R2d2lrdGlvbmFyeSc6ICdkdi53aWt0aW9uYXJ5Lm9yZycsXG4gICdkendpa2knOiAnZHoud2lraXBlZGlhLm9yZycsXG4gICdkendpa3Rpb25hcnknOiAnZHoud2lrdGlvbmFyeS5vcmcnLFxuICAnZWV3aWtpJzogJ2VlLndpa2lwZWRpYS5vcmcnLFxuICAnZWx3aWtpJzogJ2VsLndpa2lwZWRpYS5vcmcnLFxuICAnZWx3aWt0aW9uYXJ5JzogJ2VsLndpa3Rpb25hcnkub3JnJyxcbiAgJ2Vsd2lraWJvb2tzJzogJ2VsLndpa2lib29rcy5vcmcnLFxuICAnZWx3aWtpbmV3cyc6ICdlbC53aWtpbmV3cy5vcmcnLFxuICAnZWx3aWtpcXVvdGUnOiAnZWwud2lraXF1b3RlLm9yZycsXG4gICdlbHdpa2lzb3VyY2UnOiAnZWwud2lraXNvdXJjZS5vcmcnLFxuICAnZWx3aWtpdmVyc2l0eSc6ICdlbC53aWtpdmVyc2l0eS5vcmcnLFxuICAnZWx3aWtpdm95YWdlJzogJ2VsLndpa2l2b3lhZ2Uub3JnJyxcbiAgJ2VtbHdpa2knOiAnZW1sLndpa2lwZWRpYS5vcmcnLFxuICAnZW53aWtpJzogJ2VuLndpa2lwZWRpYS5vcmcnLFxuICAnZW53aWt0aW9uYXJ5JzogJ2VuLndpa3Rpb25hcnkub3JnJyxcbiAgJ2Vud2lraWJvb2tzJzogJ2VuLndpa2lib29rcy5vcmcnLFxuICAnZW53aWtpbmV3cyc6ICdlbi53aWtpbmV3cy5vcmcnLFxuICAnZW53aWtpcXVvdGUnOiAnZW4ud2lraXF1b3RlLm9yZycsXG4gICdlbndpa2lzb3VyY2UnOiAnZW4ud2lraXNvdXJjZS5vcmcnLFxuICAnZW53aWtpdmVyc2l0eSc6ICdlbi53aWtpdmVyc2l0eS5vcmcnLFxuICAnZW53aWtpdm95YWdlJzogJ2VuLndpa2l2b3lhZ2Uub3JnJyxcbiAgJ2Vvd2lraSc6ICdlby53aWtpcGVkaWEub3JnJyxcbiAgJ2Vvd2lrdGlvbmFyeSc6ICdlby53aWt0aW9uYXJ5Lm9yZycsXG4gICdlb3dpa2lib29rcyc6ICdlby53aWtpYm9va3Mub3JnJyxcbiAgJ2Vvd2lraW5ld3MnOiAnZW8ud2lraW5ld3Mub3JnJyxcbiAgJ2Vvd2lraXF1b3RlJzogJ2VvLndpa2lxdW90ZS5vcmcnLFxuICAnZW93aWtpc291cmNlJzogJ2VvLndpa2lzb3VyY2Uub3JnJyxcbiAgJ2Vzd2lraSc6ICdlcy53aWtpcGVkaWEub3JnJyxcbiAgJ2Vzd2lrdGlvbmFyeSc6ICdlcy53aWt0aW9uYXJ5Lm9yZycsXG4gICdlc3dpa2lib29rcyc6ICdlcy53aWtpYm9va3Mub3JnJyxcbiAgJ2Vzd2lraW5ld3MnOiAnZXMud2lraW5ld3Mub3JnJyxcbiAgJ2Vzd2lraXF1b3RlJzogJ2VzLndpa2lxdW90ZS5vcmcnLFxuICAnZXN3aWtpc291cmNlJzogJ2VzLndpa2lzb3VyY2Uub3JnJyxcbiAgJ2Vzd2lraXZlcnNpdHknOiAnZXMud2lraXZlcnNpdHkub3JnJyxcbiAgJ2Vzd2lraXZveWFnZSc6ICdlcy53aWtpdm95YWdlLm9yZycsXG4gICdldHdpa2knOiAnZXQud2lraXBlZGlhLm9yZycsXG4gICdldHdpa3Rpb25hcnknOiAnZXQud2lrdGlvbmFyeS5vcmcnLFxuICAnZXR3aWtpYm9va3MnOiAnZXQud2lraWJvb2tzLm9yZycsXG4gICdldHdpa2lxdW90ZSc6ICdldC53aWtpcXVvdGUub3JnJyxcbiAgJ2V0d2lraXNvdXJjZSc6ICdldC53aWtpc291cmNlLm9yZycsXG4gICdldXdpa2knOiAnZXUud2lraXBlZGlhLm9yZycsXG4gICdldXdpa3Rpb25hcnknOiAnZXUud2lrdGlvbmFyeS5vcmcnLFxuICAnZXV3aWtpYm9va3MnOiAnZXUud2lraWJvb2tzLm9yZycsXG4gICdldXdpa2lxdW90ZSc6ICdldS53aWtpcXVvdGUub3JnJyxcbiAgJ2V4dHdpa2knOiAnZXh0Lndpa2lwZWRpYS5vcmcnLFxuICAnZmF3aWtpJzogJ2ZhLndpa2lwZWRpYS5vcmcnLFxuICAnZmF3aWt0aW9uYXJ5JzogJ2ZhLndpa3Rpb25hcnkub3JnJyxcbiAgJ2Zhd2lraWJvb2tzJzogJ2ZhLndpa2lib29rcy5vcmcnLFxuICAnZmF3aWtpbmV3cyc6ICdmYS53aWtpbmV3cy5vcmcnLFxuICAnZmF3aWtpcXVvdGUnOiAnZmEud2lraXF1b3RlLm9yZycsXG4gICdmYXdpa2lzb3VyY2UnOiAnZmEud2lraXNvdXJjZS5vcmcnLFxuICAnZmF3aWtpdm95YWdlJzogJ2ZhLndpa2l2b3lhZ2Uub3JnJyxcbiAgJ2Zmd2lraSc6ICdmZi53aWtpcGVkaWEub3JnJyxcbiAgJ2Zpd2lraSc6ICdmaS53aWtpcGVkaWEub3JnJyxcbiAgJ2Zpd2lrdGlvbmFyeSc6ICdmaS53aWt0aW9uYXJ5Lm9yZycsXG4gICdmaXdpa2lib29rcyc6ICdmaS53aWtpYm9va3Mub3JnJyxcbiAgJ2Zpd2lraW5ld3MnOiAnZmkud2lraW5ld3Mub3JnJyxcbiAgJ2Zpd2lraXF1b3RlJzogJ2ZpLndpa2lxdW90ZS5vcmcnLFxuICAnZml3aWtpc291cmNlJzogJ2ZpLndpa2lzb3VyY2Uub3JnJyxcbiAgJ2Zpd2lraXZlcnNpdHknOiAnZmkud2lraXZlcnNpdHkub3JnJyxcbiAgJ2ZpdV92cm93aWtpJzogJ2ZpdS12cm8ud2lraXBlZGlhLm9yZycsXG4gICdmandpa2knOiAnZmoud2lraXBlZGlhLm9yZycsXG4gICdmandpa3Rpb25hcnknOiAnZmoud2lrdGlvbmFyeS5vcmcnLFxuICAnZm93aWtpJzogJ2ZvLndpa2lwZWRpYS5vcmcnLFxuICAnZm93aWt0aW9uYXJ5JzogJ2ZvLndpa3Rpb25hcnkub3JnJyxcbiAgJ2Zvd2lraXNvdXJjZSc6ICdmby53aWtpc291cmNlLm9yZycsXG4gICdmcndpa2knOiAnZnIud2lraXBlZGlhLm9yZycsXG4gICdmcndpa3Rpb25hcnknOiAnZnIud2lrdGlvbmFyeS5vcmcnLFxuICAnZnJ3aWtpYm9va3MnOiAnZnIud2lraWJvb2tzLm9yZycsXG4gICdmcndpa2luZXdzJzogJ2ZyLndpa2luZXdzLm9yZycsXG4gICdmcndpa2lxdW90ZSc6ICdmci53aWtpcXVvdGUub3JnJyxcbiAgJ2Zyd2lraXNvdXJjZSc6ICdmci53aWtpc291cmNlLm9yZycsXG4gICdmcndpa2l2ZXJzaXR5JzogJ2ZyLndpa2l2ZXJzaXR5Lm9yZycsXG4gICdmcndpa2l2b3lhZ2UnOiAnZnIud2lraXZveWFnZS5vcmcnLFxuICAnZnJwd2lraSc6ICdmcnAud2lraXBlZGlhLm9yZycsXG4gICdmcnJ3aWtpJzogJ2Zyci53aWtpcGVkaWEub3JnJyxcbiAgJ2Z1cndpa2knOiAnZnVyLndpa2lwZWRpYS5vcmcnLFxuICAnZnl3aWtpJzogJ2Z5Lndpa2lwZWRpYS5vcmcnLFxuICAnZnl3aWt0aW9uYXJ5JzogJ2Z5Lndpa3Rpb25hcnkub3JnJyxcbiAgJ2Z5d2lraWJvb2tzJzogJ2Z5Lndpa2lib29rcy5vcmcnLFxuICAnZ2F3aWtpJzogJ2dhLndpa2lwZWRpYS5vcmcnLFxuICAnZ2F3aWt0aW9uYXJ5JzogJ2dhLndpa3Rpb25hcnkub3JnJyxcbiAgJ2dhd2lraWJvb2tzJzogJ2dhLndpa2lib29rcy5vcmcnLFxuICAnZ2F3aWtpcXVvdGUnOiAnZ2Eud2lraXF1b3RlLm9yZycsXG4gICdnYWd3aWtpJzogJ2dhZy53aWtpcGVkaWEub3JnJyxcbiAgJ2dhbndpa2knOiAnZ2FuLndpa2lwZWRpYS5vcmcnLFxuICAnZ2R3aWtpJzogJ2dkLndpa2lwZWRpYS5vcmcnLFxuICAnZ2R3aWt0aW9uYXJ5JzogJ2dkLndpa3Rpb25hcnkub3JnJyxcbiAgJ2dsd2lraSc6ICdnbC53aWtpcGVkaWEub3JnJyxcbiAgJ2dsd2lrdGlvbmFyeSc6ICdnbC53aWt0aW9uYXJ5Lm9yZycsXG4gICdnbHdpa2lib29rcyc6ICdnbC53aWtpYm9va3Mub3JnJyxcbiAgJ2dsd2lraXF1b3RlJzogJ2dsLndpa2lxdW90ZS5vcmcnLFxuICAnZ2x3aWtpc291cmNlJzogJ2dsLndpa2lzb3VyY2Uub3JnJyxcbiAgJ2dsa3dpa2knOiAnZ2xrLndpa2lwZWRpYS5vcmcnLFxuICAnZ253aWtpJzogJ2duLndpa2lwZWRpYS5vcmcnLFxuICAnZ253aWt0aW9uYXJ5JzogJ2duLndpa3Rpb25hcnkub3JnJyxcbiAgJ2dud2lraWJvb2tzJzogJ2duLndpa2lib29rcy5vcmcnLFxuICAnZ29td2lraSc6ICdnb20ud2lraXBlZGlhLm9yZycsXG4gICdnb3R3aWtpJzogJ2dvdC53aWtpcGVkaWEub3JnJyxcbiAgJ2dvdHdpa2lib29rcyc6ICdnb3Qud2lraWJvb2tzLm9yZycsXG4gICdndXdpa2knOiAnZ3Uud2lraXBlZGlhLm9yZycsXG4gICdndXdpa3Rpb25hcnknOiAnZ3Uud2lrdGlvbmFyeS5vcmcnLFxuICAnZ3V3aWtpYm9va3MnOiAnZ3Uud2lraWJvb2tzLm9yZycsXG4gICdndXdpa2lxdW90ZSc6ICdndS53aWtpcXVvdGUub3JnJyxcbiAgJ2d1d2lraXNvdXJjZSc6ICdndS53aWtpc291cmNlLm9yZycsXG4gICdndndpa2knOiAnZ3Yud2lraXBlZGlhLm9yZycsXG4gICdndndpa3Rpb25hcnknOiAnZ3Yud2lrdGlvbmFyeS5vcmcnLFxuICAnaGF3aWtpJzogJ2hhLndpa2lwZWRpYS5vcmcnLFxuICAnaGF3aWt0aW9uYXJ5JzogJ2hhLndpa3Rpb25hcnkub3JnJyxcbiAgJ2hha3dpa2knOiAnaGFrLndpa2lwZWRpYS5vcmcnLFxuICAnaGF3d2lraSc6ICdoYXcud2lraXBlZGlhLm9yZycsXG4gICdoZXdpa2knOiAnaGUud2lraXBlZGlhLm9yZycsXG4gICdoZXdpa3Rpb25hcnknOiAnaGUud2lrdGlvbmFyeS5vcmcnLFxuICAnaGV3aWtpYm9va3MnOiAnaGUud2lraWJvb2tzLm9yZycsXG4gICdoZXdpa2luZXdzJzogJ2hlLndpa2luZXdzLm9yZycsXG4gICdoZXdpa2lxdW90ZSc6ICdoZS53aWtpcXVvdGUub3JnJyxcbiAgJ2hld2lraXNvdXJjZSc6ICdoZS53aWtpc291cmNlLm9yZycsXG4gICdoZXdpa2l2b3lhZ2UnOiAnaGUud2lraXZveWFnZS5vcmcnLFxuICAnaGl3aWtpJzogJ2hpLndpa2lwZWRpYS5vcmcnLFxuICAnaGl3aWt0aW9uYXJ5JzogJ2hpLndpa3Rpb25hcnkub3JnJyxcbiAgJ2hpd2lraWJvb2tzJzogJ2hpLndpa2lib29rcy5vcmcnLFxuICAnaGl3aWtpcXVvdGUnOiAnaGkud2lraXF1b3RlLm9yZycsXG4gICdoaWZ3aWtpJzogJ2hpZi53aWtpcGVkaWEub3JnJyxcbiAgJ2hvd2lraSc6ICdoby53aWtpcGVkaWEub3JnJyxcbiAgJ2hyd2lraSc6ICdoci53aWtpcGVkaWEub3JnJyxcbiAgJ2hyd2lrdGlvbmFyeSc6ICdoci53aWt0aW9uYXJ5Lm9yZycsXG4gICdocndpa2lib29rcyc6ICdoci53aWtpYm9va3Mub3JnJyxcbiAgJ2hyd2lraXF1b3RlJzogJ2hyLndpa2lxdW90ZS5vcmcnLFxuICAnaHJ3aWtpc291cmNlJzogJ2hyLndpa2lzb3VyY2Uub3JnJyxcbiAgJ2hzYndpa2knOiAnaHNiLndpa2lwZWRpYS5vcmcnLFxuICAnaHNid2lrdGlvbmFyeSc6ICdoc2Iud2lrdGlvbmFyeS5vcmcnLFxuICAnaHR3aWtpJzogJ2h0Lndpa2lwZWRpYS5vcmcnLFxuICAnaHR3aWtpc291cmNlJzogJ2h0Lndpa2lzb3VyY2Uub3JnJyxcbiAgJ2h1d2lraSc6ICdodS53aWtpcGVkaWEub3JnJyxcbiAgJ2h1d2lrdGlvbmFyeSc6ICdodS53aWt0aW9uYXJ5Lm9yZycsXG4gICdodXdpa2lib29rcyc6ICdodS53aWtpYm9va3Mub3JnJyxcbiAgJ2h1d2lraW5ld3MnOiAnaHUud2lraW5ld3Mub3JnJyxcbiAgJ2h1d2lraXF1b3RlJzogJ2h1Lndpa2lxdW90ZS5vcmcnLFxuICAnaHV3aWtpc291cmNlJzogJ2h1Lndpa2lzb3VyY2Uub3JnJyxcbiAgJ2h5d2lraSc6ICdoeS53aWtpcGVkaWEub3JnJyxcbiAgJ2h5d2lrdGlvbmFyeSc6ICdoeS53aWt0aW9uYXJ5Lm9yZycsXG4gICdoeXdpa2lib29rcyc6ICdoeS53aWtpYm9va3Mub3JnJyxcbiAgJ2h5d2lraXF1b3RlJzogJ2h5Lndpa2lxdW90ZS5vcmcnLFxuICAnaHl3aWtpc291cmNlJzogJ2h5Lndpa2lzb3VyY2Uub3JnJyxcbiAgJ2h6d2lraSc6ICdoei53aWtpcGVkaWEub3JnJyxcbiAgJ2lhd2lraSc6ICdpYS53aWtpcGVkaWEub3JnJyxcbiAgJ2lhd2lrdGlvbmFyeSc6ICdpYS53aWt0aW9uYXJ5Lm9yZycsXG4gICdpYXdpa2lib29rcyc6ICdpYS53aWtpYm9va3Mub3JnJyxcbiAgJ2lkd2lraSc6ICdpZC53aWtpcGVkaWEub3JnJyxcbiAgJ2lkd2lrdGlvbmFyeSc6ICdpZC53aWt0aW9uYXJ5Lm9yZycsXG4gICdpZHdpa2lib29rcyc6ICdpZC53aWtpYm9va3Mub3JnJyxcbiAgJ2lkd2lraXF1b3RlJzogJ2lkLndpa2lxdW90ZS5vcmcnLFxuICAnaWR3aWtpc291cmNlJzogJ2lkLndpa2lzb3VyY2Uub3JnJyxcbiAgJ2lld2lraSc6ICdpZS53aWtpcGVkaWEub3JnJyxcbiAgJ2lld2lrdGlvbmFyeSc6ICdpZS53aWt0aW9uYXJ5Lm9yZycsXG4gICdpZXdpa2lib29rcyc6ICdpZS53aWtpYm9va3Mub3JnJyxcbiAgJ2lnd2lraSc6ICdpZy53aWtpcGVkaWEub3JnJyxcbiAgJ2lpd2lraSc6ICdpaS53aWtpcGVkaWEub3JnJyxcbiAgJ2lrd2lraSc6ICdpay53aWtpcGVkaWEub3JnJyxcbiAgJ2lrd2lrdGlvbmFyeSc6ICdpay53aWt0aW9uYXJ5Lm9yZycsXG4gICdpbG93aWtpJzogJ2lsby53aWtpcGVkaWEub3JnJyxcbiAgJ2lvd2lraSc6ICdpby53aWtpcGVkaWEub3JnJyxcbiAgJ2lvd2lrdGlvbmFyeSc6ICdpby53aWt0aW9uYXJ5Lm9yZycsXG4gICdpc3dpa2knOiAnaXMud2lraXBlZGlhLm9yZycsXG4gICdpc3dpa3Rpb25hcnknOiAnaXMud2lrdGlvbmFyeS5vcmcnLFxuICAnaXN3aWtpYm9va3MnOiAnaXMud2lraWJvb2tzLm9yZycsXG4gICdpc3dpa2lxdW90ZSc6ICdpcy53aWtpcXVvdGUub3JnJyxcbiAgJ2lzd2lraXNvdXJjZSc6ICdpcy53aWtpc291cmNlLm9yZycsXG4gICdpdHdpa2knOiAnaXQud2lraXBlZGlhLm9yZycsXG4gICdpdHdpa3Rpb25hcnknOiAnaXQud2lrdGlvbmFyeS5vcmcnLFxuICAnaXR3aWtpYm9va3MnOiAnaXQud2lraWJvb2tzLm9yZycsXG4gICdpdHdpa2luZXdzJzogJ2l0Lndpa2luZXdzLm9yZycsXG4gICdpdHdpa2lxdW90ZSc6ICdpdC53aWtpcXVvdGUub3JnJyxcbiAgJ2l0d2lraXNvdXJjZSc6ICdpdC53aWtpc291cmNlLm9yZycsXG4gICdpdHdpa2l2ZXJzaXR5JzogJ2l0Lndpa2l2ZXJzaXR5Lm9yZycsXG4gICdpdHdpa2l2b3lhZ2UnOiAnaXQud2lraXZveWFnZS5vcmcnLFxuICAnaXV3aWtpJzogJ2l1Lndpa2lwZWRpYS5vcmcnLFxuICAnaXV3aWt0aW9uYXJ5JzogJ2l1Lndpa3Rpb25hcnkub3JnJyxcbiAgJ2phd2lraSc6ICdqYS53aWtpcGVkaWEub3JnJyxcbiAgJ2phd2lrdGlvbmFyeSc6ICdqYS53aWt0aW9uYXJ5Lm9yZycsXG4gICdqYXdpa2lib29rcyc6ICdqYS53aWtpYm9va3Mub3JnJyxcbiAgJ2phd2lraW5ld3MnOiAnamEud2lraW5ld3Mub3JnJyxcbiAgJ2phd2lraXF1b3RlJzogJ2phLndpa2lxdW90ZS5vcmcnLFxuICAnamF3aWtpc291cmNlJzogJ2phLndpa2lzb3VyY2Uub3JnJyxcbiAgJ2phd2lraXZlcnNpdHknOiAnamEud2lraXZlcnNpdHkub3JnJyxcbiAgJ2pib3dpa2knOiAnamJvLndpa2lwZWRpYS5vcmcnLFxuICAnamJvd2lrdGlvbmFyeSc6ICdqYm8ud2lrdGlvbmFyeS5vcmcnLFxuICAnanZ3aWtpJzogJ2p2Lndpa2lwZWRpYS5vcmcnLFxuICAnanZ3aWt0aW9uYXJ5JzogJ2p2Lndpa3Rpb25hcnkub3JnJyxcbiAgJ2thd2lraSc6ICdrYS53aWtpcGVkaWEub3JnJyxcbiAgJ2thd2lrdGlvbmFyeSc6ICdrYS53aWt0aW9uYXJ5Lm9yZycsXG4gICdrYXdpa2lib29rcyc6ICdrYS53aWtpYm9va3Mub3JnJyxcbiAgJ2thd2lraXF1b3RlJzogJ2thLndpa2lxdW90ZS5vcmcnLFxuICAna2Fhd2lraSc6ICdrYWEud2lraXBlZGlhLm9yZycsXG4gICdrYWJ3aWtpJzogJ2thYi53aWtpcGVkaWEub3JnJyxcbiAgJ2tiZHdpa2knOiAna2JkLndpa2lwZWRpYS5vcmcnLFxuICAna2d3aWtpJzogJ2tnLndpa2lwZWRpYS5vcmcnLFxuICAna2l3aWtpJzogJ2tpLndpa2lwZWRpYS5vcmcnLFxuICAna2p3aWtpJzogJ2tqLndpa2lwZWRpYS5vcmcnLFxuICAna2t3aWtpJzogJ2trLndpa2lwZWRpYS5vcmcnLFxuICAna2t3aWt0aW9uYXJ5JzogJ2trLndpa3Rpb25hcnkub3JnJyxcbiAgJ2trd2lraWJvb2tzJzogJ2trLndpa2lib29rcy5vcmcnLFxuICAna2t3aWtpcXVvdGUnOiAna2sud2lraXF1b3RlLm9yZycsXG4gICdrbHdpa2knOiAna2wud2lraXBlZGlhLm9yZycsXG4gICdrbHdpa3Rpb25hcnknOiAna2wud2lrdGlvbmFyeS5vcmcnLFxuICAna213aWtpJzogJ2ttLndpa2lwZWRpYS5vcmcnLFxuICAna213aWt0aW9uYXJ5JzogJ2ttLndpa3Rpb25hcnkub3JnJyxcbiAgJ2ttd2lraWJvb2tzJzogJ2ttLndpa2lib29rcy5vcmcnLFxuICAna253aWtpJzogJ2tuLndpa2lwZWRpYS5vcmcnLFxuICAna253aWt0aW9uYXJ5JzogJ2tuLndpa3Rpb25hcnkub3JnJyxcbiAgJ2tud2lraWJvb2tzJzogJ2tuLndpa2lib29rcy5vcmcnLFxuICAna253aWtpcXVvdGUnOiAna24ud2lraXF1b3RlLm9yZycsXG4gICdrbndpa2lzb3VyY2UnOiAna24ud2lraXNvdXJjZS5vcmcnLFxuICAna293aWtpJzogJ2tvLndpa2lwZWRpYS5vcmcnLFxuICAna293aWt0aW9uYXJ5JzogJ2tvLndpa3Rpb25hcnkub3JnJyxcbiAgJ2tvd2lraWJvb2tzJzogJ2tvLndpa2lib29rcy5vcmcnLFxuICAna293aWtpbmV3cyc6ICdrby53aWtpbmV3cy5vcmcnLFxuICAna293aWtpcXVvdGUnOiAna28ud2lraXF1b3RlLm9yZycsXG4gICdrb3dpa2lzb3VyY2UnOiAna28ud2lraXNvdXJjZS5vcmcnLFxuICAna293aWtpdmVyc2l0eSc6ICdrby53aWtpdmVyc2l0eS5vcmcnLFxuICAna29pd2lraSc6ICdrb2kud2lraXBlZGlhLm9yZycsXG4gICdrcndpa2knOiAna3Iud2lraXBlZGlhLm9yZycsXG4gICdrcndpa2lxdW90ZSc6ICdrci53aWtpcXVvdGUub3JnJyxcbiAgJ2tyY3dpa2knOiAna3JjLndpa2lwZWRpYS5vcmcnLFxuICAna3N3aWtpJzogJ2tzLndpa2lwZWRpYS5vcmcnLFxuICAna3N3aWt0aW9uYXJ5JzogJ2tzLndpa3Rpb25hcnkub3JnJyxcbiAgJ2tzd2lraWJvb2tzJzogJ2tzLndpa2lib29rcy5vcmcnLFxuICAna3N3aWtpcXVvdGUnOiAna3Mud2lraXF1b3RlLm9yZycsXG4gICdrc2h3aWtpJzogJ2tzaC53aWtpcGVkaWEub3JnJyxcbiAgJ2t1d2lraSc6ICdrdS53aWtpcGVkaWEub3JnJyxcbiAgJ2t1d2lrdGlvbmFyeSc6ICdrdS53aWt0aW9uYXJ5Lm9yZycsXG4gICdrdXdpa2lib29rcyc6ICdrdS53aWtpYm9va3Mub3JnJyxcbiAgJ2t1d2lraXF1b3RlJzogJ2t1Lndpa2lxdW90ZS5vcmcnLFxuICAna3Z3aWtpJzogJ2t2Lndpa2lwZWRpYS5vcmcnLFxuICAna3d3aWtpJzogJ2t3Lndpa2lwZWRpYS5vcmcnLFxuICAna3d3aWt0aW9uYXJ5JzogJ2t3Lndpa3Rpb25hcnkub3JnJyxcbiAgJ2t3d2lraXF1b3RlJzogJ2t3Lndpa2lxdW90ZS5vcmcnLFxuICAna3l3aWtpJzogJ2t5Lndpa2lwZWRpYS5vcmcnLFxuICAna3l3aWt0aW9uYXJ5JzogJ2t5Lndpa3Rpb25hcnkub3JnJyxcbiAgJ2t5d2lraWJvb2tzJzogJ2t5Lndpa2lib29rcy5vcmcnLFxuICAna3l3aWtpcXVvdGUnOiAna3kud2lraXF1b3RlLm9yZycsXG4gICdsYXdpa2knOiAnbGEud2lraXBlZGlhLm9yZycsXG4gICdsYXdpa3Rpb25hcnknOiAnbGEud2lrdGlvbmFyeS5vcmcnLFxuICAnbGF3aWtpYm9va3MnOiAnbGEud2lraWJvb2tzLm9yZycsXG4gICdsYXdpa2lxdW90ZSc6ICdsYS53aWtpcXVvdGUub3JnJyxcbiAgJ2xhd2lraXNvdXJjZSc6ICdsYS53aWtpc291cmNlLm9yZycsXG4gICdsYWR3aWtpJzogJ2xhZC53aWtpcGVkaWEub3JnJyxcbiAgJ2xid2lraSc6ICdsYi53aWtpcGVkaWEub3JnJyxcbiAgJ2xid2lrdGlvbmFyeSc6ICdsYi53aWt0aW9uYXJ5Lm9yZycsXG4gICdsYndpa2lib29rcyc6ICdsYi53aWtpYm9va3Mub3JnJyxcbiAgJ2xid2lraXF1b3RlJzogJ2xiLndpa2lxdW90ZS5vcmcnLFxuICAnbGJld2lraSc6ICdsYmUud2lraXBlZGlhLm9yZycsXG4gICdsZXp3aWtpJzogJ2xlei53aWtpcGVkaWEub3JnJyxcbiAgJ2xnd2lraSc6ICdsZy53aWtpcGVkaWEub3JnJyxcbiAgJ2xpd2lraSc6ICdsaS53aWtpcGVkaWEub3JnJyxcbiAgJ2xpd2lrdGlvbmFyeSc6ICdsaS53aWt0aW9uYXJ5Lm9yZycsXG4gICdsaXdpa2lib29rcyc6ICdsaS53aWtpYm9va3Mub3JnJyxcbiAgJ2xpd2lraXF1b3RlJzogJ2xpLndpa2lxdW90ZS5vcmcnLFxuICAnbGl3aWtpc291cmNlJzogJ2xpLndpa2lzb3VyY2Uub3JnJyxcbiAgJ2xpandpa2knOiAnbGlqLndpa2lwZWRpYS5vcmcnLFxuICAnbG1vd2lraSc6ICdsbW8ud2lraXBlZGlhLm9yZycsXG4gICdsbndpa2knOiAnbG4ud2lraXBlZGlhLm9yZycsXG4gICdsbndpa3Rpb25hcnknOiAnbG4ud2lrdGlvbmFyeS5vcmcnLFxuICAnbG53aWtpYm9va3MnOiAnbG4ud2lraWJvb2tzLm9yZycsXG4gICdsb3dpa2knOiAnbG8ud2lraXBlZGlhLm9yZycsXG4gICdsb3dpa3Rpb25hcnknOiAnbG8ud2lrdGlvbmFyeS5vcmcnLFxuICAnbHJjd2lraSc6ICdscmMud2lraXBlZGlhLm9yZycsXG4gICdsdHdpa2knOiAnbHQud2lraXBlZGlhLm9yZycsXG4gICdsdHdpa3Rpb25hcnknOiAnbHQud2lrdGlvbmFyeS5vcmcnLFxuICAnbHR3aWtpYm9va3MnOiAnbHQud2lraWJvb2tzLm9yZycsXG4gICdsdHdpa2lxdW90ZSc6ICdsdC53aWtpcXVvdGUub3JnJyxcbiAgJ2x0d2lraXNvdXJjZSc6ICdsdC53aWtpc291cmNlLm9yZycsXG4gICdsdGd3aWtpJzogJ2x0Zy53aWtpcGVkaWEub3JnJyxcbiAgJ2x2d2lraSc6ICdsdi53aWtpcGVkaWEub3JnJyxcbiAgJ2x2d2lrdGlvbmFyeSc6ICdsdi53aWt0aW9uYXJ5Lm9yZycsXG4gICdsdndpa2lib29rcyc6ICdsdi53aWtpYm9va3Mub3JnJyxcbiAgJ21haXdpa2knOiAnbWFpLndpa2lwZWRpYS5vcmcnLFxuICAnbWFwX2Jtc3dpa2knOiAnbWFwLWJtcy53aWtpcGVkaWEub3JnJyxcbiAgJ21kZndpa2knOiAnbWRmLndpa2lwZWRpYS5vcmcnLFxuICAnbWd3aWtpJzogJ21nLndpa2lwZWRpYS5vcmcnLFxuICAnbWd3aWt0aW9uYXJ5JzogJ21nLndpa3Rpb25hcnkub3JnJyxcbiAgJ21nd2lraWJvb2tzJzogJ21nLndpa2lib29rcy5vcmcnLFxuICAnbWh3aWtpJzogJ21oLndpa2lwZWRpYS5vcmcnLFxuICAnbWh3aWt0aW9uYXJ5JzogJ21oLndpa3Rpb25hcnkub3JnJyxcbiAgJ21ocndpa2knOiAnbWhyLndpa2lwZWRpYS5vcmcnLFxuICAnbWl3aWtpJzogJ21pLndpa2lwZWRpYS5vcmcnLFxuICAnbWl3aWt0aW9uYXJ5JzogJ21pLndpa3Rpb25hcnkub3JnJyxcbiAgJ21pd2lraWJvb2tzJzogJ21pLndpa2lib29rcy5vcmcnLFxuICAnbWlud2lraSc6ICdtaW4ud2lraXBlZGlhLm9yZycsXG4gICdta3dpa2knOiAnbWsud2lraXBlZGlhLm9yZycsXG4gICdta3dpa3Rpb25hcnknOiAnbWsud2lrdGlvbmFyeS5vcmcnLFxuICAnbWt3aWtpYm9va3MnOiAnbWsud2lraWJvb2tzLm9yZycsXG4gICdta3dpa2lzb3VyY2UnOiAnbWsud2lraXNvdXJjZS5vcmcnLFxuICAnbWx3aWtpJzogJ21sLndpa2lwZWRpYS5vcmcnLFxuICAnbWx3aWt0aW9uYXJ5JzogJ21sLndpa3Rpb25hcnkub3JnJyxcbiAgJ21sd2lraWJvb2tzJzogJ21sLndpa2lib29rcy5vcmcnLFxuICAnbWx3aWtpcXVvdGUnOiAnbWwud2lraXF1b3RlLm9yZycsXG4gICdtbHdpa2lzb3VyY2UnOiAnbWwud2lraXNvdXJjZS5vcmcnLFxuICAnbW53aWtpJzogJ21uLndpa2lwZWRpYS5vcmcnLFxuICAnbW53aWt0aW9uYXJ5JzogJ21uLndpa3Rpb25hcnkub3JnJyxcbiAgJ21ud2lraWJvb2tzJzogJ21uLndpa2lib29rcy5vcmcnLFxuICAnbW93aWtpJzogJ21vLndpa2lwZWRpYS5vcmcnLFxuICAnbW93aWt0aW9uYXJ5JzogJ21vLndpa3Rpb25hcnkub3JnJyxcbiAgJ21yd2lraSc6ICdtci53aWtpcGVkaWEub3JnJyxcbiAgJ21yd2lrdGlvbmFyeSc6ICdtci53aWt0aW9uYXJ5Lm9yZycsXG4gICdtcndpa2lib29rcyc6ICdtci53aWtpYm9va3Mub3JnJyxcbiAgJ21yd2lraXF1b3RlJzogJ21yLndpa2lxdW90ZS5vcmcnLFxuICAnbXJ3aWtpc291cmNlJzogJ21yLndpa2lzb3VyY2Uub3JnJyxcbiAgJ21yandpa2knOiAnbXJqLndpa2lwZWRpYS5vcmcnLFxuICAnbXN3aWtpJzogJ21zLndpa2lwZWRpYS5vcmcnLFxuICAnbXN3aWt0aW9uYXJ5JzogJ21zLndpa3Rpb25hcnkub3JnJyxcbiAgJ21zd2lraWJvb2tzJzogJ21zLndpa2lib29rcy5vcmcnLFxuICAnbXR3aWtpJzogJ210Lndpa2lwZWRpYS5vcmcnLFxuICAnbXR3aWt0aW9uYXJ5JzogJ210Lndpa3Rpb25hcnkub3JnJyxcbiAgJ211c3dpa2knOiAnbXVzLndpa2lwZWRpYS5vcmcnLFxuICAnbXdsd2lraSc6ICdtd2wud2lraXBlZGlhLm9yZycsXG4gICdteXdpa2knOiAnbXkud2lraXBlZGlhLm9yZycsXG4gICdteXdpa3Rpb25hcnknOiAnbXkud2lrdGlvbmFyeS5vcmcnLFxuICAnbXl3aWtpYm9va3MnOiAnbXkud2lraWJvb2tzLm9yZycsXG4gICdteXZ3aWtpJzogJ215di53aWtpcGVkaWEub3JnJyxcbiAgJ216bndpa2knOiAnbXpuLndpa2lwZWRpYS5vcmcnLFxuICAnbmF3aWtpJzogJ25hLndpa2lwZWRpYS5vcmcnLFxuICAnbmF3aWt0aW9uYXJ5JzogJ25hLndpa3Rpb25hcnkub3JnJyxcbiAgJ25hd2lraWJvb2tzJzogJ25hLndpa2lib29rcy5vcmcnLFxuICAnbmF3aWtpcXVvdGUnOiAnbmEud2lraXF1b3RlLm9yZycsXG4gICduYWh3aWtpJzogJ25haC53aWtpcGVkaWEub3JnJyxcbiAgJ25haHdpa3Rpb25hcnknOiAnbmFoLndpa3Rpb25hcnkub3JnJyxcbiAgJ25haHdpa2lib29rcyc6ICduYWgud2lraWJvb2tzLm9yZycsXG4gICduYXB3aWtpJzogJ25hcC53aWtpcGVkaWEub3JnJyxcbiAgJ25kc3dpa2knOiAnbmRzLndpa2lwZWRpYS5vcmcnLFxuICAnbmRzd2lrdGlvbmFyeSc6ICduZHMud2lrdGlvbmFyeS5vcmcnLFxuICAnbmRzd2lraWJvb2tzJzogJ25kcy53aWtpYm9va3Mub3JnJyxcbiAgJ25kc3dpa2lxdW90ZSc6ICduZHMud2lraXF1b3RlLm9yZycsXG4gICduZHNfbmx3aWtpJzogJ25kcy1ubC53aWtpcGVkaWEub3JnJyxcbiAgJ25ld2lraSc6ICduZS53aWtpcGVkaWEub3JnJyxcbiAgJ25ld2lrdGlvbmFyeSc6ICduZS53aWt0aW9uYXJ5Lm9yZycsXG4gICduZXdpa2lib29rcyc6ICduZS53aWtpYm9va3Mub3JnJyxcbiAgJ25ld3dpa2knOiAnbmV3Lndpa2lwZWRpYS5vcmcnLFxuICAnbmd3aWtpJzogJ25nLndpa2lwZWRpYS5vcmcnLFxuICAnbmx3aWtpJzogJ25sLndpa2lwZWRpYS5vcmcnLFxuICAnbmx3aWt0aW9uYXJ5JzogJ25sLndpa3Rpb25hcnkub3JnJyxcbiAgJ25sd2lraWJvb2tzJzogJ25sLndpa2lib29rcy5vcmcnLFxuICAnbmx3aWtpbmV3cyc6ICdubC53aWtpbmV3cy5vcmcnLFxuICAnbmx3aWtpcXVvdGUnOiAnbmwud2lraXF1b3RlLm9yZycsXG4gICdubHdpa2lzb3VyY2UnOiAnbmwud2lraXNvdXJjZS5vcmcnLFxuICAnbmx3aWtpdm95YWdlJzogJ25sLndpa2l2b3lhZ2Uub3JnJyxcbiAgJ25ud2lraSc6ICdubi53aWtpcGVkaWEub3JnJyxcbiAgJ25ud2lrdGlvbmFyeSc6ICdubi53aWt0aW9uYXJ5Lm9yZycsXG4gICdubndpa2lxdW90ZSc6ICdubi53aWtpcXVvdGUub3JnJyxcbiAgJ25vd2lraSc6ICduby53aWtpcGVkaWEub3JnJyxcbiAgJ25vd2lrdGlvbmFyeSc6ICduby53aWt0aW9uYXJ5Lm9yZycsXG4gICdub3dpa2lib29rcyc6ICduby53aWtpYm9va3Mub3JnJyxcbiAgJ25vd2lraW5ld3MnOiAnbm8ud2lraW5ld3Mub3JnJyxcbiAgJ25vd2lraXF1b3RlJzogJ25vLndpa2lxdW90ZS5vcmcnLFxuICAnbm93aWtpc291cmNlJzogJ25vLndpa2lzb3VyY2Uub3JnJyxcbiAgJ25vdndpa2knOiAnbm92Lndpa2lwZWRpYS5vcmcnLFxuICAnbnJtd2lraSc6ICducm0ud2lraXBlZGlhLm9yZycsXG4gICduc293aWtpJzogJ25zby53aWtpcGVkaWEub3JnJyxcbiAgJ252d2lraSc6ICdudi53aWtpcGVkaWEub3JnJyxcbiAgJ255d2lraSc6ICdueS53aWtpcGVkaWEub3JnJyxcbiAgJ29jd2lraSc6ICdvYy53aWtpcGVkaWEub3JnJyxcbiAgJ29jd2lrdGlvbmFyeSc6ICdvYy53aWt0aW9uYXJ5Lm9yZycsXG4gICdvY3dpa2lib29rcyc6ICdvYy53aWtpYm9va3Mub3JnJyxcbiAgJ29td2lraSc6ICdvbS53aWtpcGVkaWEub3JnJyxcbiAgJ29td2lrdGlvbmFyeSc6ICdvbS53aWt0aW9uYXJ5Lm9yZycsXG4gICdvcndpa2knOiAnb3Iud2lraXBlZGlhLm9yZycsXG4gICdvcndpa3Rpb25hcnknOiAnb3Iud2lrdGlvbmFyeS5vcmcnLFxuICAnb3J3aWtpc291cmNlJzogJ29yLndpa2lzb3VyY2Uub3JnJyxcbiAgJ29zd2lraSc6ICdvcy53aWtpcGVkaWEub3JnJyxcbiAgJ3Bhd2lraSc6ICdwYS53aWtpcGVkaWEub3JnJyxcbiAgJ3Bhd2lrdGlvbmFyeSc6ICdwYS53aWt0aW9uYXJ5Lm9yZycsXG4gICdwYXdpa2lib29rcyc6ICdwYS53aWtpYm9va3Mub3JnJyxcbiAgJ3BhZ3dpa2knOiAncGFnLndpa2lwZWRpYS5vcmcnLFxuICAncGFtd2lraSc6ICdwYW0ud2lraXBlZGlhLm9yZycsXG4gICdwYXB3aWtpJzogJ3BhcC53aWtpcGVkaWEub3JnJyxcbiAgJ3BjZHdpa2knOiAncGNkLndpa2lwZWRpYS5vcmcnLFxuICAncGRjd2lraSc6ICdwZGMud2lraXBlZGlhLm9yZycsXG4gICdwZmx3aWtpJzogJ3BmbC53aWtpcGVkaWEub3JnJyxcbiAgJ3Bpd2lraSc6ICdwaS53aWtpcGVkaWEub3JnJyxcbiAgJ3Bpd2lrdGlvbmFyeSc6ICdwaS53aWt0aW9uYXJ5Lm9yZycsXG4gICdwaWh3aWtpJzogJ3BpaC53aWtpcGVkaWEub3JnJyxcbiAgJ3Bsd2lraSc6ICdwbC53aWtpcGVkaWEub3JnJyxcbiAgJ3Bsd2lrdGlvbmFyeSc6ICdwbC53aWt0aW9uYXJ5Lm9yZycsXG4gICdwbHdpa2lib29rcyc6ICdwbC53aWtpYm9va3Mub3JnJyxcbiAgJ3Bsd2lraW5ld3MnOiAncGwud2lraW5ld3Mub3JnJyxcbiAgJ3Bsd2lraXF1b3RlJzogJ3BsLndpa2lxdW90ZS5vcmcnLFxuICAncGx3aWtpc291cmNlJzogJ3BsLndpa2lzb3VyY2Uub3JnJyxcbiAgJ3Bsd2lraXZveWFnZSc6ICdwbC53aWtpdm95YWdlLm9yZycsXG4gICdwbXN3aWtpJzogJ3Btcy53aWtpcGVkaWEub3JnJyxcbiAgJ3BuYndpa2knOiAncG5iLndpa2lwZWRpYS5vcmcnLFxuICAncG5id2lrdGlvbmFyeSc6ICdwbmIud2lrdGlvbmFyeS5vcmcnLFxuICAncG50d2lraSc6ICdwbnQud2lraXBlZGlhLm9yZycsXG4gICdwc3dpa2knOiAncHMud2lraXBlZGlhLm9yZycsXG4gICdwc3dpa3Rpb25hcnknOiAncHMud2lrdGlvbmFyeS5vcmcnLFxuICAncHN3aWtpYm9va3MnOiAncHMud2lraWJvb2tzLm9yZycsXG4gICdwdHdpa2knOiAncHQud2lraXBlZGlhLm9yZycsXG4gICdwdHdpa3Rpb25hcnknOiAncHQud2lrdGlvbmFyeS5vcmcnLFxuICAncHR3aWtpYm9va3MnOiAncHQud2lraWJvb2tzLm9yZycsXG4gICdwdHdpa2luZXdzJzogJ3B0Lndpa2luZXdzLm9yZycsXG4gICdwdHdpa2lxdW90ZSc6ICdwdC53aWtpcXVvdGUub3JnJyxcbiAgJ3B0d2lraXNvdXJjZSc6ICdwdC53aWtpc291cmNlLm9yZycsXG4gICdwdHdpa2l2ZXJzaXR5JzogJ3B0Lndpa2l2ZXJzaXR5Lm9yZycsXG4gICdwdHdpa2l2b3lhZ2UnOiAncHQud2lraXZveWFnZS5vcmcnLFxuICAncXV3aWtpJzogJ3F1Lndpa2lwZWRpYS5vcmcnLFxuICAncXV3aWt0aW9uYXJ5JzogJ3F1Lndpa3Rpb25hcnkub3JnJyxcbiAgJ3F1d2lraWJvb2tzJzogJ3F1Lndpa2lib29rcy5vcmcnLFxuICAncXV3aWtpcXVvdGUnOiAncXUud2lraXF1b3RlLm9yZycsXG4gICdybXdpa2knOiAncm0ud2lraXBlZGlhLm9yZycsXG4gICdybXdpa3Rpb25hcnknOiAncm0ud2lrdGlvbmFyeS5vcmcnLFxuICAncm13aWtpYm9va3MnOiAncm0ud2lraWJvb2tzLm9yZycsXG4gICdybXl3aWtpJzogJ3JteS53aWtpcGVkaWEub3JnJyxcbiAgJ3Jud2lraSc6ICdybi53aWtpcGVkaWEub3JnJyxcbiAgJ3Jud2lrdGlvbmFyeSc6ICdybi53aWt0aW9uYXJ5Lm9yZycsXG4gICdyb3dpa2knOiAncm8ud2lraXBlZGlhLm9yZycsXG4gICdyb3dpa3Rpb25hcnknOiAncm8ud2lrdGlvbmFyeS5vcmcnLFxuICAncm93aWtpYm9va3MnOiAncm8ud2lraWJvb2tzLm9yZycsXG4gICdyb3dpa2luZXdzJzogJ3JvLndpa2luZXdzLm9yZycsXG4gICdyb3dpa2lxdW90ZSc6ICdyby53aWtpcXVvdGUub3JnJyxcbiAgJ3Jvd2lraXNvdXJjZSc6ICdyby53aWtpc291cmNlLm9yZycsXG4gICdyb3dpa2l2b3lhZ2UnOiAncm8ud2lraXZveWFnZS5vcmcnLFxuICAncm9hX3J1cHdpa2knOiAncm9hLXJ1cC53aWtpcGVkaWEub3JnJyxcbiAgJ3JvYV9ydXB3aWt0aW9uYXJ5JzogJ3JvYS1ydXAud2lrdGlvbmFyeS5vcmcnLFxuICAncm9hX3RhcmF3aWtpJzogJ3JvYS10YXJhLndpa2lwZWRpYS5vcmcnLFxuICAncnV3aWtpJzogJ3J1Lndpa2lwZWRpYS5vcmcnLFxuICAncnV3aWt0aW9uYXJ5JzogJ3J1Lndpa3Rpb25hcnkub3JnJyxcbiAgJ3J1d2lraWJvb2tzJzogJ3J1Lndpa2lib29rcy5vcmcnLFxuICAncnV3aWtpbmV3cyc6ICdydS53aWtpbmV3cy5vcmcnLFxuICAncnV3aWtpcXVvdGUnOiAncnUud2lraXF1b3RlLm9yZycsXG4gICdydXdpa2lzb3VyY2UnOiAncnUud2lraXNvdXJjZS5vcmcnLFxuICAncnV3aWtpdmVyc2l0eSc6ICdydS53aWtpdmVyc2l0eS5vcmcnLFxuICAncnV3aWtpdm95YWdlJzogJ3J1Lndpa2l2b3lhZ2Uub3JnJyxcbiAgJ3J1ZXdpa2knOiAncnVlLndpa2lwZWRpYS5vcmcnLFxuICAncnd3aWtpJzogJ3J3Lndpa2lwZWRpYS5vcmcnLFxuICAncnd3aWt0aW9uYXJ5JzogJ3J3Lndpa3Rpb25hcnkub3JnJyxcbiAgJ3Nhd2lraSc6ICdzYS53aWtpcGVkaWEub3JnJyxcbiAgJ3Nhd2lrdGlvbmFyeSc6ICdzYS53aWt0aW9uYXJ5Lm9yZycsXG4gICdzYXdpa2lib29rcyc6ICdzYS53aWtpYm9va3Mub3JnJyxcbiAgJ3Nhd2lraXF1b3RlJzogJ3NhLndpa2lxdW90ZS5vcmcnLFxuICAnc2F3aWtpc291cmNlJzogJ3NhLndpa2lzb3VyY2Uub3JnJyxcbiAgJ3NhaHdpa2knOiAnc2FoLndpa2lwZWRpYS5vcmcnLFxuICAnc2Fod2lraXNvdXJjZSc6ICdzYWgud2lraXNvdXJjZS5vcmcnLFxuICAnc2N3aWtpJzogJ3NjLndpa2lwZWRpYS5vcmcnLFxuICAnc2N3aWt0aW9uYXJ5JzogJ3NjLndpa3Rpb25hcnkub3JnJyxcbiAgJ3Njbndpa2knOiAnc2NuLndpa2lwZWRpYS5vcmcnLFxuICAnc2Nud2lrdGlvbmFyeSc6ICdzY24ud2lrdGlvbmFyeS5vcmcnLFxuICAnc2Nvd2lraSc6ICdzY28ud2lraXBlZGlhLm9yZycsXG4gICdzZHdpa2knOiAnc2Qud2lraXBlZGlhLm9yZycsXG4gICdzZHdpa3Rpb25hcnknOiAnc2Qud2lrdGlvbmFyeS5vcmcnLFxuICAnc2R3aWtpbmV3cyc6ICdzZC53aWtpbmV3cy5vcmcnLFxuICAnc2V3aWtpJzogJ3NlLndpa2lwZWRpYS5vcmcnLFxuICAnc2V3aWtpYm9va3MnOiAnc2Uud2lraWJvb2tzLm9yZycsXG4gICdzZ3dpa2knOiAnc2cud2lraXBlZGlhLm9yZycsXG4gICdzZ3dpa3Rpb25hcnknOiAnc2cud2lrdGlvbmFyeS5vcmcnLFxuICAnc2h3aWtpJzogJ3NoLndpa2lwZWRpYS5vcmcnLFxuICAnc2h3aWt0aW9uYXJ5JzogJ3NoLndpa3Rpb25hcnkub3JnJyxcbiAgJ3Npd2lraSc6ICdzaS53aWtpcGVkaWEub3JnJyxcbiAgJ3Npd2lrdGlvbmFyeSc6ICdzaS53aWt0aW9uYXJ5Lm9yZycsXG4gICdzaXdpa2lib29rcyc6ICdzaS53aWtpYm9va3Mub3JnJyxcbiAgJ3NpbXBsZXdpa2knOiAnc2ltcGxlLndpa2lwZWRpYS5vcmcnLFxuICAnc2ltcGxld2lrdGlvbmFyeSc6ICdzaW1wbGUud2lrdGlvbmFyeS5vcmcnLFxuICAnc2ltcGxld2lraWJvb2tzJzogJ3NpbXBsZS53aWtpYm9va3Mub3JnJyxcbiAgJ3NpbXBsZXdpa2lxdW90ZSc6ICdzaW1wbGUud2lraXF1b3RlLm9yZycsXG4gICdza3dpa2knOiAnc2sud2lraXBlZGlhLm9yZycsXG4gICdza3dpa3Rpb25hcnknOiAnc2sud2lrdGlvbmFyeS5vcmcnLFxuICAnc2t3aWtpYm9va3MnOiAnc2sud2lraWJvb2tzLm9yZycsXG4gICdza3dpa2lxdW90ZSc6ICdzay53aWtpcXVvdGUub3JnJyxcbiAgJ3Nrd2lraXNvdXJjZSc6ICdzay53aWtpc291cmNlLm9yZycsXG4gICdzbHdpa2knOiAnc2wud2lraXBlZGlhLm9yZycsXG4gICdzbHdpa3Rpb25hcnknOiAnc2wud2lrdGlvbmFyeS5vcmcnLFxuICAnc2x3aWtpYm9va3MnOiAnc2wud2lraWJvb2tzLm9yZycsXG4gICdzbHdpa2lxdW90ZSc6ICdzbC53aWtpcXVvdGUub3JnJyxcbiAgJ3Nsd2lraXNvdXJjZSc6ICdzbC53aWtpc291cmNlLm9yZycsXG4gICdzbHdpa2l2ZXJzaXR5JzogJ3NsLndpa2l2ZXJzaXR5Lm9yZycsXG4gICdzbXdpa2knOiAnc20ud2lraXBlZGlhLm9yZycsXG4gICdzbXdpa3Rpb25hcnknOiAnc20ud2lrdGlvbmFyeS5vcmcnLFxuICAnc253aWtpJzogJ3NuLndpa2lwZWRpYS5vcmcnLFxuICAnc253aWt0aW9uYXJ5JzogJ3NuLndpa3Rpb25hcnkub3JnJyxcbiAgJ3Nvd2lraSc6ICdzby53aWtpcGVkaWEub3JnJyxcbiAgJ3Nvd2lrdGlvbmFyeSc6ICdzby53aWt0aW9uYXJ5Lm9yZycsXG4gICdzcXdpa2knOiAnc3Eud2lraXBlZGlhLm9yZycsXG4gICdzcXdpa3Rpb25hcnknOiAnc3Eud2lrdGlvbmFyeS5vcmcnLFxuICAnc3F3aWtpYm9va3MnOiAnc3Eud2lraWJvb2tzLm9yZycsXG4gICdzcXdpa2luZXdzJzogJ3NxLndpa2luZXdzLm9yZycsXG4gICdzcXdpa2lxdW90ZSc6ICdzcS53aWtpcXVvdGUub3JnJyxcbiAgJ3Nyd2lraSc6ICdzci53aWtpcGVkaWEub3JnJyxcbiAgJ3Nyd2lrdGlvbmFyeSc6ICdzci53aWt0aW9uYXJ5Lm9yZycsXG4gICdzcndpa2lib29rcyc6ICdzci53aWtpYm9va3Mub3JnJyxcbiAgJ3Nyd2lraW5ld3MnOiAnc3Iud2lraW5ld3Mub3JnJyxcbiAgJ3Nyd2lraXF1b3RlJzogJ3NyLndpa2lxdW90ZS5vcmcnLFxuICAnc3J3aWtpc291cmNlJzogJ3NyLndpa2lzb3VyY2Uub3JnJyxcbiAgJ3Nybndpa2knOiAnc3JuLndpa2lwZWRpYS5vcmcnLFxuICAnc3N3aWtpJzogJ3NzLndpa2lwZWRpYS5vcmcnLFxuICAnc3N3aWt0aW9uYXJ5JzogJ3NzLndpa3Rpb25hcnkub3JnJyxcbiAgJ3N0d2lraSc6ICdzdC53aWtpcGVkaWEub3JnJyxcbiAgJ3N0d2lrdGlvbmFyeSc6ICdzdC53aWt0aW9uYXJ5Lm9yZycsXG4gICdzdHF3aWtpJzogJ3N0cS53aWtpcGVkaWEub3JnJyxcbiAgJ3N1d2lraSc6ICdzdS53aWtpcGVkaWEub3JnJyxcbiAgJ3N1d2lrdGlvbmFyeSc6ICdzdS53aWt0aW9uYXJ5Lm9yZycsXG4gICdzdXdpa2lib29rcyc6ICdzdS53aWtpYm9va3Mub3JnJyxcbiAgJ3N1d2lraXF1b3RlJzogJ3N1Lndpa2lxdW90ZS5vcmcnLFxuICAnc3Z3aWtpJzogJ3N2Lndpa2lwZWRpYS5vcmcnLFxuICAnc3Z3aWt0aW9uYXJ5JzogJ3N2Lndpa3Rpb25hcnkub3JnJyxcbiAgJ3N2d2lraWJvb2tzJzogJ3N2Lndpa2lib29rcy5vcmcnLFxuICAnc3Z3aWtpbmV3cyc6ICdzdi53aWtpbmV3cy5vcmcnLFxuICAnc3Z3aWtpcXVvdGUnOiAnc3Yud2lraXF1b3RlLm9yZycsXG4gICdzdndpa2lzb3VyY2UnOiAnc3Yud2lraXNvdXJjZS5vcmcnLFxuICAnc3Z3aWtpdmVyc2l0eSc6ICdzdi53aWtpdmVyc2l0eS5vcmcnLFxuICAnc3Z3aWtpdm95YWdlJzogJ3N2Lndpa2l2b3lhZ2Uub3JnJyxcbiAgJ3N3d2lraSc6ICdzdy53aWtpcGVkaWEub3JnJyxcbiAgJ3N3d2lrdGlvbmFyeSc6ICdzdy53aWt0aW9uYXJ5Lm9yZycsXG4gICdzd3dpa2lib29rcyc6ICdzdy53aWtpYm9va3Mub3JnJyxcbiAgJ3N6bHdpa2knOiAnc3psLndpa2lwZWRpYS5vcmcnLFxuICAndGF3aWtpJzogJ3RhLndpa2lwZWRpYS5vcmcnLFxuICAndGF3aWt0aW9uYXJ5JzogJ3RhLndpa3Rpb25hcnkub3JnJyxcbiAgJ3Rhd2lraWJvb2tzJzogJ3RhLndpa2lib29rcy5vcmcnLFxuICAndGF3aWtpbmV3cyc6ICd0YS53aWtpbmV3cy5vcmcnLFxuICAndGF3aWtpcXVvdGUnOiAndGEud2lraXF1b3RlLm9yZycsXG4gICd0YXdpa2lzb3VyY2UnOiAndGEud2lraXNvdXJjZS5vcmcnLFxuICAndGV3aWtpJzogJ3RlLndpa2lwZWRpYS5vcmcnLFxuICAndGV3aWt0aW9uYXJ5JzogJ3RlLndpa3Rpb25hcnkub3JnJyxcbiAgJ3Rld2lraWJvb2tzJzogJ3RlLndpa2lib29rcy5vcmcnLFxuICAndGV3aWtpcXVvdGUnOiAndGUud2lraXF1b3RlLm9yZycsXG4gICd0ZXdpa2lzb3VyY2UnOiAndGUud2lraXNvdXJjZS5vcmcnLFxuICAndGV0d2lraSc6ICd0ZXQud2lraXBlZGlhLm9yZycsXG4gICd0Z3dpa2knOiAndGcud2lraXBlZGlhLm9yZycsXG4gICd0Z3dpa3Rpb25hcnknOiAndGcud2lrdGlvbmFyeS5vcmcnLFxuICAndGd3aWtpYm9va3MnOiAndGcud2lraWJvb2tzLm9yZycsXG4gICd0aHdpa2knOiAndGgud2lraXBlZGlhLm9yZycsXG4gICd0aHdpa3Rpb25hcnknOiAndGgud2lrdGlvbmFyeS5vcmcnLFxuICAndGh3aWtpYm9va3MnOiAndGgud2lraWJvb2tzLm9yZycsXG4gICd0aHdpa2luZXdzJzogJ3RoLndpa2luZXdzLm9yZycsXG4gICd0aHdpa2lxdW90ZSc6ICd0aC53aWtpcXVvdGUub3JnJyxcbiAgJ3Rod2lraXNvdXJjZSc6ICd0aC53aWtpc291cmNlLm9yZycsXG4gICd0aXdpa2knOiAndGkud2lraXBlZGlhLm9yZycsXG4gICd0aXdpa3Rpb25hcnknOiAndGkud2lrdGlvbmFyeS5vcmcnLFxuICAndGt3aWtpJzogJ3RrLndpa2lwZWRpYS5vcmcnLFxuICAndGt3aWt0aW9uYXJ5JzogJ3RrLndpa3Rpb25hcnkub3JnJyxcbiAgJ3Rrd2lraWJvb2tzJzogJ3RrLndpa2lib29rcy5vcmcnLFxuICAndGt3aWtpcXVvdGUnOiAndGsud2lraXF1b3RlLm9yZycsXG4gICd0bHdpa2knOiAndGwud2lraXBlZGlhLm9yZycsXG4gICd0bHdpa3Rpb25hcnknOiAndGwud2lrdGlvbmFyeS5vcmcnLFxuICAndGx3aWtpYm9va3MnOiAndGwud2lraWJvb2tzLm9yZycsXG4gICd0bndpa2knOiAndG4ud2lraXBlZGlhLm9yZycsXG4gICd0bndpa3Rpb25hcnknOiAndG4ud2lrdGlvbmFyeS5vcmcnLFxuICAndG93aWtpJzogJ3RvLndpa2lwZWRpYS5vcmcnLFxuICAndG93aWt0aW9uYXJ5JzogJ3RvLndpa3Rpb25hcnkub3JnJyxcbiAgJ3RwaXdpa2knOiAndHBpLndpa2lwZWRpYS5vcmcnLFxuICAndHBpd2lrdGlvbmFyeSc6ICd0cGkud2lrdGlvbmFyeS5vcmcnLFxuICAndHJ3aWtpJzogJ3RyLndpa2lwZWRpYS5vcmcnLFxuICAndHJ3aWt0aW9uYXJ5JzogJ3RyLndpa3Rpb25hcnkub3JnJyxcbiAgJ3Ryd2lraWJvb2tzJzogJ3RyLndpa2lib29rcy5vcmcnLFxuICAndHJ3aWtpbmV3cyc6ICd0ci53aWtpbmV3cy5vcmcnLFxuICAndHJ3aWtpcXVvdGUnOiAndHIud2lraXF1b3RlLm9yZycsXG4gICd0cndpa2lzb3VyY2UnOiAndHIud2lraXNvdXJjZS5vcmcnLFxuICAndHN3aWtpJzogJ3RzLndpa2lwZWRpYS5vcmcnLFxuICAndHN3aWt0aW9uYXJ5JzogJ3RzLndpa3Rpb25hcnkub3JnJyxcbiAgJ3R0d2lraSc6ICd0dC53aWtpcGVkaWEub3JnJyxcbiAgJ3R0d2lrdGlvbmFyeSc6ICd0dC53aWt0aW9uYXJ5Lm9yZycsXG4gICd0dHdpa2lib29rcyc6ICd0dC53aWtpYm9va3Mub3JnJyxcbiAgJ3R0d2lraXF1b3RlJzogJ3R0Lndpa2lxdW90ZS5vcmcnLFxuICAndHVtd2lraSc6ICd0dW0ud2lraXBlZGlhLm9yZycsXG4gICd0d3dpa2knOiAndHcud2lraXBlZGlhLm9yZycsXG4gICd0d3dpa3Rpb25hcnknOiAndHcud2lrdGlvbmFyeS5vcmcnLFxuICAndHl3aWtpJzogJ3R5Lndpa2lwZWRpYS5vcmcnLFxuICAndHl2d2lraSc6ICd0eXYud2lraXBlZGlhLm9yZycsXG4gICd1ZG13aWtpJzogJ3VkbS53aWtpcGVkaWEub3JnJyxcbiAgJ3Vnd2lraSc6ICd1Zy53aWtpcGVkaWEub3JnJyxcbiAgJ3Vnd2lrdGlvbmFyeSc6ICd1Zy53aWt0aW9uYXJ5Lm9yZycsXG4gICd1Z3dpa2lib29rcyc6ICd1Zy53aWtpYm9va3Mub3JnJyxcbiAgJ3Vnd2lraXF1b3RlJzogJ3VnLndpa2lxdW90ZS5vcmcnLFxuICAndWt3aWtpJzogJ3VrLndpa2lwZWRpYS5vcmcnLFxuICAndWt3aWt0aW9uYXJ5JzogJ3VrLndpa3Rpb25hcnkub3JnJyxcbiAgJ3Vrd2lraWJvb2tzJzogJ3VrLndpa2lib29rcy5vcmcnLFxuICAndWt3aWtpbmV3cyc6ICd1ay53aWtpbmV3cy5vcmcnLFxuICAndWt3aWtpcXVvdGUnOiAndWsud2lraXF1b3RlLm9yZycsXG4gICd1a3dpa2lzb3VyY2UnOiAndWsud2lraXNvdXJjZS5vcmcnLFxuICAndWt3aWtpdm95YWdlJzogJ3VrLndpa2l2b3lhZ2Uub3JnJyxcbiAgJ3Vyd2lraSc6ICd1ci53aWtpcGVkaWEub3JnJyxcbiAgJ3Vyd2lrdGlvbmFyeSc6ICd1ci53aWt0aW9uYXJ5Lm9yZycsXG4gICd1cndpa2lib29rcyc6ICd1ci53aWtpYm9va3Mub3JnJyxcbiAgJ3Vyd2lraXF1b3RlJzogJ3VyLndpa2lxdW90ZS5vcmcnLFxuICAndXp3aWtpJzogJ3V6Lndpa2lwZWRpYS5vcmcnLFxuICAndXp3aWt0aW9uYXJ5JzogJ3V6Lndpa3Rpb25hcnkub3JnJyxcbiAgJ3V6d2lraWJvb2tzJzogJ3V6Lndpa2lib29rcy5vcmcnLFxuICAndXp3aWtpcXVvdGUnOiAndXoud2lraXF1b3RlLm9yZycsXG4gICd2ZXdpa2knOiAndmUud2lraXBlZGlhLm9yZycsXG4gICd2ZWN3aWtpJzogJ3ZlYy53aWtpcGVkaWEub3JnJyxcbiAgJ3ZlY3dpa3Rpb25hcnknOiAndmVjLndpa3Rpb25hcnkub3JnJyxcbiAgJ3ZlY3dpa2lzb3VyY2UnOiAndmVjLndpa2lzb3VyY2Uub3JnJyxcbiAgJ3ZlcHdpa2knOiAndmVwLndpa2lwZWRpYS5vcmcnLFxuICAndml3aWtpJzogJ3ZpLndpa2lwZWRpYS5vcmcnLFxuICAndml3aWt0aW9uYXJ5JzogJ3ZpLndpa3Rpb25hcnkub3JnJyxcbiAgJ3Zpd2lraWJvb2tzJzogJ3ZpLndpa2lib29rcy5vcmcnLFxuICAndml3aWtpcXVvdGUnOiAndmkud2lraXF1b3RlLm9yZycsXG4gICd2aXdpa2lzb3VyY2UnOiAndmkud2lraXNvdXJjZS5vcmcnLFxuICAndml3aWtpdm95YWdlJzogJ3ZpLndpa2l2b3lhZ2Uub3JnJyxcbiAgJ3Zsc3dpa2knOiAndmxzLndpa2lwZWRpYS5vcmcnLFxuICAndm93aWtpJzogJ3ZvLndpa2lwZWRpYS5vcmcnLFxuICAndm93aWt0aW9uYXJ5JzogJ3ZvLndpa3Rpb25hcnkub3JnJyxcbiAgJ3Zvd2lraWJvb2tzJzogJ3ZvLndpa2lib29rcy5vcmcnLFxuICAndm93aWtpcXVvdGUnOiAndm8ud2lraXF1b3RlLm9yZycsXG4gICd3YXdpa2knOiAnd2Eud2lraXBlZGlhLm9yZycsXG4gICd3YXdpa3Rpb25hcnknOiAnd2Eud2lrdGlvbmFyeS5vcmcnLFxuICAnd2F3aWtpYm9va3MnOiAnd2Eud2lraWJvb2tzLm9yZycsXG4gICd3YXJ3aWtpJzogJ3dhci53aWtpcGVkaWEub3JnJyxcbiAgJ3dvd2lraSc6ICd3by53aWtpcGVkaWEub3JnJyxcbiAgJ3dvd2lrdGlvbmFyeSc6ICd3by53aWt0aW9uYXJ5Lm9yZycsXG4gICd3b3dpa2lxdW90ZSc6ICd3by53aWtpcXVvdGUub3JnJyxcbiAgJ3d1dXdpa2knOiAnd3V1Lndpa2lwZWRpYS5vcmcnLFxuICAneGFsd2lraSc6ICd4YWwud2lraXBlZGlhLm9yZycsXG4gICd4aHdpa2knOiAneGgud2lraXBlZGlhLm9yZycsXG4gICd4aHdpa3Rpb25hcnknOiAneGgud2lrdGlvbmFyeS5vcmcnLFxuICAneGh3aWtpYm9va3MnOiAneGgud2lraWJvb2tzLm9yZycsXG4gICd4bWZ3aWtpJzogJ3htZi53aWtpcGVkaWEub3JnJyxcbiAgJ3lpd2lraSc6ICd5aS53aWtpcGVkaWEub3JnJyxcbiAgJ3lpd2lrdGlvbmFyeSc6ICd5aS53aWt0aW9uYXJ5Lm9yZycsXG4gICd5aXdpa2lzb3VyY2UnOiAneWkud2lraXNvdXJjZS5vcmcnLFxuICAneW93aWtpJzogJ3lvLndpa2lwZWRpYS5vcmcnLFxuICAneW93aWt0aW9uYXJ5JzogJ3lvLndpa3Rpb25hcnkub3JnJyxcbiAgJ3lvd2lraWJvb2tzJzogJ3lvLndpa2lib29rcy5vcmcnLFxuICAnemF3aWtpJzogJ3phLndpa2lwZWRpYS5vcmcnLFxuICAnemF3aWt0aW9uYXJ5JzogJ3phLndpa3Rpb25hcnkub3JnJyxcbiAgJ3phd2lraWJvb2tzJzogJ3phLndpa2lib29rcy5vcmcnLFxuICAnemF3aWtpcXVvdGUnOiAnemEud2lraXF1b3RlLm9yZycsXG4gICd6ZWF3aWtpJzogJ3plYS53aWtpcGVkaWEub3JnJyxcbiAgJ3pod2lraSc6ICd6aC53aWtpcGVkaWEub3JnJyxcbiAgJ3pod2lrdGlvbmFyeSc6ICd6aC53aWt0aW9uYXJ5Lm9yZycsXG4gICd6aHdpa2lib29rcyc6ICd6aC53aWtpYm9va3Mub3JnJyxcbiAgJ3pod2lraW5ld3MnOiAnemgud2lraW5ld3Mub3JnJyxcbiAgJ3pod2lraXF1b3RlJzogJ3poLndpa2lxdW90ZS5vcmcnLFxuICAnemh3aWtpc291cmNlJzogJ3poLndpa2lzb3VyY2Uub3JnJyxcbiAgJ3pod2lraXZveWFnZSc6ICd6aC53aWtpdm95YWdlLm9yZycsXG4gICd6aF9jbGFzc2ljYWx3aWtpJzogJ3poLWNsYXNzaWNhbC53aWtpcGVkaWEub3JnJyxcbiAgJ3poX21pbl9uYW53aWtpJzogJ3poLW1pbi1uYW4ud2lraXBlZGlhLm9yZycsXG4gICd6aF9taW5fbmFud2lrdGlvbmFyeSc6ICd6aC1taW4tbmFuLndpa3Rpb25hcnkub3JnJyxcbiAgJ3poX21pbl9uYW53aWtpYm9va3MnOiAnemgtbWluLW5hbi53aWtpYm9va3Mub3JnJyxcbiAgJ3poX21pbl9uYW53aWtpcXVvdGUnOiAnemgtbWluLW5hbi53aWtpcXVvdGUub3JnJyxcbiAgJ3poX21pbl9uYW53aWtpc291cmNlJzogJ3poLW1pbi1uYW4ud2lraXNvdXJjZS5vcmcnLFxuICAnemhfeXVld2lraSc6ICd6aC15dWUud2lraXBlZGlhLm9yZycsXG4gICd6dXdpa2knOiAnenUud2lraXBlZGlhLm9yZycsXG4gICd6dXdpa3Rpb25hcnknOiAnenUud2lrdGlvbmFyeS5vcmcnLFxuICAnenV3aWtpYm9va3MnOiAnenUud2lraWJvb2tzLm9yZycsXG4gICdhZHZpc29yeXdpa2knOiAnYWR2aXNvcnkud2lraW1lZGlhLm9yZycsXG4gICdhcndpa2ltZWRpYSc6ICdhci53aWtpbWVkaWEub3JnJyxcbiAgJ2FyYmNvbV9kZXdpa2knOiAnYXJiY29tLWRlLndpa2lwZWRpYS5vcmcnLFxuICAnYXJiY29tX2Vud2lraSc6ICdhcmJjb20tZW4ud2lraXBlZGlhLm9yZycsXG4gICdhcmJjb21fZml3aWtpJzogJ2FyYmNvbS1maS53aWtpcGVkaWEub3JnJyxcbiAgJ2FyYmNvbV9ubHdpa2knOiAnYXJiY29tLW5sLndpa2lwZWRpYS5vcmcnLFxuICAnYXVkaXRjb213aWtpJzogJ2F1ZGl0Y29tLndpa2ltZWRpYS5vcmcnLFxuICAnYmR3aWtpbWVkaWEnOiAnYmQud2lraW1lZGlhLm9yZycsXG4gICdiZXdpa2ltZWRpYSc6ICdiZS53aWtpbWVkaWEub3JnJyxcbiAgJ2JldGF3aWtpdmVyc2l0eSc6ICdiZXRhLndpa2l2ZXJzaXR5Lm9yZycsXG4gICdib2FyZHdpa2knOiAnYm9hcmQud2lraW1lZGlhLm9yZycsXG4gICdib2FyZGdvdmNvbXdpa2knOiAnYm9hcmRnb3Zjb20ud2lraW1lZGlhLm9yZycsXG4gICdicndpa2ltZWRpYSc6ICdici53aWtpbWVkaWEub3JnJyxcbiAgJ2Nhd2lraW1lZGlhJzogJ2NhLndpa2ltZWRpYS5vcmcnLFxuICAnY2hhaXJ3aWtpJzogJ2NoYWlyLndpa2ltZWRpYS5vcmcnLFxuICAnY2hhcGNvbXdpa2knOiAnYWZmY29tLndpa2ltZWRpYS5vcmcnLFxuICAnY2hlY2t1c2Vyd2lraSc6ICdjaGVja3VzZXIud2lraW1lZGlhLm9yZycsXG4gICdjbndpa2ltZWRpYSc6ICdjbi53aWtpbWVkaWEub3JnJyxcbiAgJ2Nvd2lraW1lZGlhJzogJ2NvLndpa2ltZWRpYS5vcmcnLFxuICAnY29sbGFid2lraSc6ICdjb2xsYWIud2lraW1lZGlhLm9yZycsXG4gICdjb21tb25zd2lraSc6ICdjb21tb25zLndpa2ltZWRpYS5vcmcnLFxuICAnZGt3aWtpbWVkaWEnOiAnZGsud2lraW1lZGlhLm9yZycsXG4gICdkb25hdGV3aWtpJzogJ2RvbmF0ZS53aWtpbWVkaWEub3JnJyxcbiAgJ2V0d2lraW1lZGlhJzogJ2VlLndpa2ltZWRpYS5vcmcnLFxuICAnZXhlY3dpa2knOiAnZXhlYy53aWtpbWVkaWEub3JnJyxcbiAgJ2ZkY3dpa2knOiAnZmRjLndpa2ltZWRpYS5vcmcnLFxuICAnZml3aWtpbWVkaWEnOiAnZmkud2lraW1lZGlhLm9yZycsXG4gICdmb3VuZGF0aW9ud2lraSc6ICd3aWtpbWVkaWFmb3VuZGF0aW9uLm9yZycsXG4gICdncmFudHN3aWtpJzogJ2dyYW50cy53aWtpbWVkaWEub3JnJyxcbiAgJ2llZ2NvbXdpa2knOiAnaWVnY29tLndpa2ltZWRpYS5vcmcnLFxuICAnaWx3aWtpbWVkaWEnOiAnaWwud2lraW1lZGlhLm9yZycsXG4gICdpbmN1YmF0b3J3aWtpJzogJ2luY3ViYXRvci53aWtpbWVkaWEub3JnJyxcbiAgJ2ludGVybmFsd2lraSc6ICdpbnRlcm5hbC53aWtpbWVkaWEub3JnJyxcbiAgJ2xhYnN3aWtpJzogJ3dpa2l0ZWNoLndpa2ltZWRpYS5vcmcnLFxuICAnbGFidGVzdHdpa2knOiAnbGFidGVzdHdpa2l0ZWNoLndpa2ltZWRpYS5vcmcnLFxuICAnbGVnYWx0ZWFtd2lraSc6ICdsZWdhbHRlYW0ud2lraW1lZGlhLm9yZycsXG4gICdsb2dpbndpa2knOiAnbG9naW4ud2lraW1lZGlhLm9yZycsXG4gICdtZWRpYXdpa2l3aWtpJzogJ21lZGlhd2lraS5vcmcnLFxuICAnbWV0YXdpa2knOiAnbWV0YS53aWtpbWVkaWEub3JnJyxcbiAgJ21rd2lraW1lZGlhJzogJ21rLndpa2ltZWRpYS5vcmcnLFxuICAnbW92ZW1lbnRyb2xlc3dpa2knOiAnbW92ZW1lbnRyb2xlcy53aWtpbWVkaWEub3JnJyxcbiAgJ214d2lraW1lZGlhJzogJ214Lndpa2ltZWRpYS5vcmcnLFxuICAnbmx3aWtpbWVkaWEnOiAnbmwud2lraW1lZGlhLm9yZycsXG4gICdub3dpa2ltZWRpYSc6ICduby53aWtpbWVkaWEub3JnJyxcbiAgJ25vYm9hcmRfY2hhcHRlcnN3aWtpbWVkaWEnOiAnbm9ib2FyZC1jaGFwdGVycy53aWtpbWVkaWEub3JnJyxcbiAgJ25vc3RhbGdpYXdpa2knOiAnbm9zdGFsZ2lhLndpa2lwZWRpYS5vcmcnLFxuICAnbnljd2lraW1lZGlhJzogJ255Yy53aWtpbWVkaWEub3JnJyxcbiAgJ256d2lraW1lZGlhJzogJ256Lndpa2ltZWRpYS5vcmcnLFxuICAnb2ZmaWNld2lraSc6ICdvZmZpY2Uud2lraW1lZGlhLm9yZycsXG4gICdvbWJ1ZHNtZW53aWtpJzogJ29tYnVkc21lbi53aWtpbWVkaWEub3JnJyxcbiAgJ290cnNfd2lraXdpa2knOiAnb3Rycy13aWtpLndpa2ltZWRpYS5vcmcnLFxuICAnb3V0cmVhY2h3aWtpJzogJ291dHJlYWNoLndpa2ltZWRpYS5vcmcnLFxuICAncGFfdXN3aWtpbWVkaWEnOiAncGEtdXMud2lraW1lZGlhLm9yZycsXG4gICdwbHdpa2ltZWRpYSc6ICdwbC53aWtpbWVkaWEub3JnJyxcbiAgJ3F1YWxpdHl3aWtpJzogJ3F1YWxpdHkud2lraW1lZGlhLm9yZycsXG4gICdyc3dpa2ltZWRpYSc6ICdycy53aWtpbWVkaWEub3JnJyxcbiAgJ3J1d2lraW1lZGlhJzogJ3J1Lndpa2ltZWRpYS5vcmcnLFxuICAnc2V3aWtpbWVkaWEnOiAnc2Uud2lraW1lZGlhLm9yZycsXG4gICdzZWFyY2hjb213aWtpJzogJ3NlYXJjaGNvbS53aWtpbWVkaWEub3JnJyxcbiAgJ3NvdXJjZXN3aWtpJzogJ3dpa2lzb3VyY2Uub3JnJyxcbiAgJ3NwY29td2lraSc6ICdzcGNvbS53aWtpbWVkaWEub3JnJyxcbiAgJ3NwZWNpZXN3aWtpJzogJ3NwZWNpZXMud2lraW1lZGlhLm9yZycsXG4gICdzdGV3YXJkd2lraSc6ICdzdGV3YXJkLndpa2ltZWRpYS5vcmcnLFxuICAnc3RyYXRlZ3l3aWtpJzogJ3N0cmF0ZWd5Lndpa2ltZWRpYS5vcmcnLFxuICAndGVud2lraSc6ICd0ZW4ud2lraXBlZGlhLm9yZycsXG4gICd0ZXN0d2lraSc6ICd0ZXN0Lndpa2lwZWRpYS5vcmcnLFxuICAndGVzdDJ3aWtpJzogJ3Rlc3QyLndpa2lwZWRpYS5vcmcnLFxuICAndGVzdHdpa2lkYXRhd2lraSc6ICd0ZXN0Lndpa2lkYXRhLm9yZycsXG4gICd0cndpa2ltZWRpYSc6ICd0ci53aWtpbWVkaWEub3JnJyxcbiAgJ3RyYW5zaXRpb250ZWFtd2lraSc6ICd0cmFuc2l0aW9udGVhbS53aWtpbWVkaWEub3JnJyxcbiAgJ3Vhd2lraW1lZGlhJzogJ3VhLndpa2ltZWRpYS5vcmcnLFxuICAndWt3aWtpbWVkaWEnOiAndWsud2lraW1lZGlhLm9yZycsXG4gICd1c2FiaWxpdHl3aWtpJzogJ3VzYWJpbGl0eS53aWtpbWVkaWEub3JnJyxcbiAgJ3ZvdGV3aWtpJzogJ3ZvdGUud2lraW1lZGlhLm9yZycsXG4gICd3Z19lbndpa2knOiAnd2ctZW4ud2lraXBlZGlhLm9yZycsXG4gICd3aWtpZGF0YXdpa2knOiAnd2lraWRhdGEub3JnJyxcbiAgJ3dpa2ltYW5pYTIwMDV3aWtpJzogJ3dpa2ltYW5pYTIwMDUud2lraW1lZGlhLm9yZycsXG4gICd3aWtpbWFuaWEyMDA2d2lraSc6ICd3aWtpbWFuaWEyMDA2Lndpa2ltZWRpYS5vcmcnLFxuICAnd2lraW1hbmlhMjAwN3dpa2knOiAnd2lraW1hbmlhMjAwNy53aWtpbWVkaWEub3JnJyxcbiAgJ3dpa2ltYW5pYTIwMDh3aWtpJzogJ3dpa2ltYW5pYTIwMDgud2lraW1lZGlhLm9yZycsXG4gICd3aWtpbWFuaWEyMDA5d2lraSc6ICd3aWtpbWFuaWEyMDA5Lndpa2ltZWRpYS5vcmcnLFxuICAnd2lraW1hbmlhMjAxMHdpa2knOiAnd2lraW1hbmlhMjAxMC53aWtpbWVkaWEub3JnJyxcbiAgJ3dpa2ltYW5pYTIwMTF3aWtpJzogJ3dpa2ltYW5pYTIwMTEud2lraW1lZGlhLm9yZycsXG4gICd3aWtpbWFuaWEyMDEyd2lraSc6ICd3aWtpbWFuaWEyMDEyLndpa2ltZWRpYS5vcmcnLFxuICAnd2lraW1hbmlhMjAxM3dpa2knOiAnd2lraW1hbmlhMjAxMy53aWtpbWVkaWEub3JnJyxcbiAgJ3dpa2ltYW5pYTIwMTR3aWtpJzogJ3dpa2ltYW5pYTIwMTQud2lraW1lZGlhLm9yZycsXG4gICd3aWtpbWFuaWEyMDE1d2lraSc6ICd3aWtpbWFuaWEyMDE1Lndpa2ltZWRpYS5vcmcnLFxuICAnd2lraW1hbmlhMjAxNndpa2knOiAnd2lraW1hbmlhMjAxNi53aWtpbWVkaWEub3JnJyxcbiAgJ3dpa2ltYW5pYTIwMTd3aWtpJzogJ3dpa2ltYW5pYTIwMTcud2lraW1lZGlhLm9yZycsXG4gICd3aWtpbWFuaWF0ZWFtd2lraSc6ICd3aWtpbWFuaWF0ZWFtLndpa2ltZWRpYS5vcmcnLFxuICAnemVyb3dpa2knOiAnemVyby53aWtpbWVkaWEub3JnJ1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBzaXRlTWFwO1xuIiwiLyoqXG4gKiBAZmlsZSBUZW1wbGF0ZXMgdXNlZCBieSBDaGFydC5qcyBmb3IgUGFnZXZpZXdzIGFwcFxuICogQGF1dGhvciBNdXNpa0FuaW1hbFxuICogQGNvcHlyaWdodCAyMDE2IE11c2lrQW5pbWFsXG4gKi9cblxuLyoqXG4gKiBUZW1wbGF0ZXMgdXNlZCBieSBDaGFydC5qcy5cbiAqIEZ1bmN0aW9ucyB1c2VkIHdpdGhpbiBvdXIgYXBwIG11c3QgYmUgaW4gdGhlIGdsb2JhbCBzY29wZS5cbiAqIEFsbCBxdW90YXRpb25zIG11c3QgYmUgZG91YmxlLXF1b3RlcyBvciBwcm9wZXJseSBlc2NhcGVkLlxuICogQHR5cGUge09iamVjdH1cbiAqL1xuY29uc3QgdGVtcGxhdGVzID0ge1xuICBjaGFydExlZ2VuZChzY29wZSkge1xuICAgIGNvbnN0IGRhdGFMaXN0ID0gKGVudGl0eSwgbXVsdGlFbnRpdHkgPSBmYWxzZSkgPT4ge1xuICAgICAgbGV0IGVkaXRzTGluaztcblxuICAgICAgaWYgKG11bHRpRW50aXR5KSB7XG4gICAgICAgIGVkaXRzTGluayA9IHNjb3BlLmZvcm1hdE51bWJlcihlbnRpdHkubnVtX2VkaXRzKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGVkaXRzTGluayA9IGA8YSBocmVmPVwiJHtzY29wZS5nZXRFeHBhbmRlZFBhZ2VVUkwoZW50aXR5LmxhYmVsKX0mYWN0aW9uPWhpc3RvcnlcIiB0YXJnZXQ9XCJfYmxhbmtcIiBjbGFzcz1cInB1bGwtcmlnaHRcIj5cbiAgICAgICAgICAgICR7c2NvcGUuZm9ybWF0TnVtYmVyKGVudGl0eS5udW1fZWRpdHMpfVxuICAgICAgICAgIDwvYT5gO1xuICAgICAgfVxuXG4gICAgICBsZXQgaW5mb0hhc2ggPSB7XG4gICAgICAgICdQYWdldmlld3MnOiB7XG4gICAgICAgICAgJ1BhZ2V2aWV3cyc6IHNjb3BlLmZvcm1hdE51bWJlcihlbnRpdHkuc3VtKSxcbiAgICAgICAgICAnRGFpbHkgYXZlcmFnZSc6IHNjb3BlLmZvcm1hdE51bWJlcihlbnRpdHkuYXZlcmFnZSlcbiAgICAgICAgfSxcbiAgICAgICAgJ1JldmlzaW9ucyc6IHtcbiAgICAgICAgICAnRWRpdHMnOiBlZGl0c0xpbmssXG4gICAgICAgICAgJ0VkaXRvcnMnOiBzY29wZS5mb3JtYXROdW1iZXIoZW50aXR5Lm51bV91c2VycylcbiAgICAgICAgfSxcbiAgICAgICAgJ0Jhc2ljIGluZm9ybWF0aW9uJzoge1xuICAgICAgICAgICdXYXRjaGVycyc6IGVudGl0eS53YXRjaGVycyA/IHNjb3BlLmZvcm1hdE51bWJlcihlbnRpdHkud2F0Y2hlcnMpIDogJC5pMThuKCd1bmtub3duJylcbiAgICAgICAgfVxuICAgICAgfTtcblxuICAgICAgaWYgKCFtdWx0aUVudGl0eSkge1xuICAgICAgICBPYmplY3QuYXNzaWduKGluZm9IYXNoWydCYXNpYyBpbmZvcm1hdGlvbiddLCB7XG4gICAgICAgICAgJ1NpemUnOiBlbnRpdHkubGVuZ3RoID8gc2NvcGUuZm9ybWF0TnVtYmVyKGVudGl0eS5sZW5ndGgpIDogJycsXG4gICAgICAgICAgJ1Byb3RlY3Rpb24nOiBlbnRpdHkucHJvdGVjdGlvblxuICAgICAgICB9KTtcbiAgICAgIH1cblxuICAgICAgbGV0IG1hcmt1cCA9ICcnO1xuXG4gICAgICBmb3IgKGxldCBibG9jayBpbiBpbmZvSGFzaCkge1xuICAgICAgICBtYXJrdXAgKz0gYDxkaXYgY2xhc3M9J2xlZ2VuZC1ibG9jayc+PGg1PiR7YmxvY2t9PC9oNT48aHIvPmA7XG4gICAgICAgIGZvciAobGV0IGtleSBpbiBpbmZvSGFzaFtibG9ja10pIHtcbiAgICAgICAgICBjb25zdCB2YWx1ZSA9IGluZm9IYXNoW2Jsb2NrXVtrZXldO1xuICAgICAgICAgIGlmICghdmFsdWUpIGNvbnRpbnVlO1xuICAgICAgICAgIG1hcmt1cCArPSBgXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwibGluZWFyLWxlZ2VuZC0tY291bnRzXCI+XG4gICAgICAgICAgICAgICR7a2V5fTpcbiAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9J3B1bGwtcmlnaHQnPlxuICAgICAgICAgICAgICAgICR7dmFsdWV9XG4gICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgIDwvZGl2PmA7XG4gICAgICAgIH1cbiAgICAgICAgbWFya3VwICs9ICc8L2Rpdj4nO1xuICAgICAgfVxuXG4gICAgICBpZiAoIW11bHRpRW50aXR5KSB7XG4gICAgICAgIG1hcmt1cCArPSBgXG4gICAgICAgICAgPGRpdiBjbGFzcz1cImxpbmVhci1sZWdlbmQtLWxpbmtzXCI+XG4gICAgICAgICAgICA8YSBocmVmPVwiJHtzY29wZS5nZXRMYW5ndmlld3NVUkwoZW50aXR5LmxhYmVsKX1cIiB0YXJnZXQ9XCJfYmxhbmtcIj4keyQuaTE4bignYWxsLWxhbmd1YWdlcycpfTwvYT5cbiAgICAgICAgICAgICZidWxsZXQ7XG4gICAgICAgICAgICA8YSBocmVmPVwiJHtzY29wZS5nZXRSZWRpcmVjdHZpZXdzVVJMKGVudGl0eS5sYWJlbCl9XCIgdGFyZ2V0PVwiX2JsYW5rXCI+JHskLmkxOG4oJ3JlZGlyZWN0cycpfTwvYT5cbiAgICAgICAgICA8L2Rpdj5gO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gbWFya3VwO1xuICAgIH07XG5cbiAgICAvLyBtYXAgb3V0IGVkaXQgcHJvdGVjdGlvbiBsZXZlbCBmb3IgZWFjaCBlbnRpdHlcbiAgICBjb25zdCBlbnRpdGllcyA9IHNjb3BlLm91dHB1dERhdGEubWFwKGVudGl0eSA9PiB7XG4gICAgICBjb25zdCBwcm90ZWN0aW9uID0gKGVudGl0eS5wcm90ZWN0aW9uIHx8IFtdKS5maW5kKHByb3QgPT4gcHJvdC50eXBlID09PSAnZWRpdCcpO1xuICAgICAgZW50aXR5LnByb3RlY3Rpb24gPSBwcm90ZWN0aW9uID8gcHJvdGVjdGlvbi5sZXZlbCA6ICQuaTE4bignbm9uZScpLnRvTG93ZXJDYXNlKCk7XG4gICAgICByZXR1cm4gZW50aXR5O1xuICAgIH0pO1xuXG4gICAgaWYgKHNjb3BlLm91dHB1dERhdGEubGVuZ3RoID09PSAxKSB7XG4gICAgICByZXR1cm4gZGF0YUxpc3QoZW50aXRpZXNbMF0pO1xuICAgIH1cblxuICAgIGNvbnN0IHN1bSA9IGVudGl0aWVzLnJlZHVjZSgoYSxiKSA9PiBhICsgYi5zdW0sIDApO1xuICAgIGNvbnN0IHRvdGFscyA9IHtcbiAgICAgIHN1bSxcbiAgICAgIGF2ZXJhZ2U6IE1hdGgucm91bmQoc3VtIC8gZW50aXRpZXMubGVuZ3RoKSxcbiAgICAgIG51bV9lZGl0czogZW50aXRpZXMucmVkdWNlKChhLCBiKSA9PiBhICsgYi5udW1fZWRpdHMsIDApLFxuICAgICAgbnVtX3VzZXJzOiBlbnRpdGllcy5yZWR1Y2UoKGEsIGIpID0+IGEgKyBiLm51bV91c2VycywgMCksXG4gICAgICB3YXRjaGVyczogZW50aXRpZXMucmVkdWNlKChhLCBiKSA9PiBhICsgYi53YXRjaGVycyB8fCAwLCAwKVxuICAgIH07XG5cbiAgICByZXR1cm4gZGF0YUxpc3QodG90YWxzLCB0cnVlKTtcbiAgfVxufTtcblxubW9kdWxlLmV4cG9ydHMgPSB0ZW1wbGF0ZXM7XG4iXX0=
