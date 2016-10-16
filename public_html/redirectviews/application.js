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

/* jshint browser: true */
/* global define: false, module: false */

// AMD shim
(function(root, factory) {

    'use strict';

    if (typeof define === 'function' && define.amd) {
        define(factory);
    } else if (typeof exports !== 'undefined') {
        module.exports = factory();
    } else {
        root.simpleStorage = factory();
    }

}(this, function() {

    'use strict';

    var VERSION = '0.2.1';

    /* This is the object, that holds the cached values */
    var _storage = false;

    /* How much space does the storage take */
    var _storage_size = 0;

    var _storage_available = false;
    var _ttl_timeout = null;

    var _lsStatus = 'OK';
    var LS_NOT_AVAILABLE = 'LS_NOT_AVAILABLE';
    var LS_DISABLED = 'LS_DISABLED';
    var LS_QUOTA_EXCEEDED = 'LS_QUOTA_EXCEEDED';

    // This method might throw as it touches localStorage and doing so
    // can be prohibited in some environments
    function _init() {

        // this method throws if localStorage is not usable, otherwise returns true
        _storage_available = _checkAvailability();

        // Load data from storage
        _loadStorage();

        // remove dead keys
        _handleTTL();

        // start listening for changes
        _setupUpdateObserver();

        // handle cached navigation
        if ('addEventListener' in window) {
            window.addEventListener('pageshow', function(event) {
                if (event.persisted) {
                    _reloadData();
                }
            }, false);
        }

        _storage_available = true;
    }

    /**
     * Sets up a storage change observer
     */
    function _setupUpdateObserver() {
        if ('addEventListener' in window) {
            window.addEventListener('storage', _reloadData, false);
        } else {
            document.attachEvent('onstorage', _reloadData);
        }
    }

    /**
     * Reload data from storage when needed
     */
    function _reloadData() {
        try {
            _loadStorage();
        } catch (E) {
            _storage_available = false;
            return;
        }
        _handleTTL();
    }

    function _loadStorage() {
        var source = localStorage.getItem('simpleStorage');

        try {
            _storage = JSON.parse(source) || {};
        } catch (E) {
            _storage = {};
        }

        _storage_size = _get_storage_size();
    }

    function _save() {
        try {
            localStorage.setItem('simpleStorage', JSON.stringify(_storage));
            _storage_size = _get_storage_size();
        } catch (E) {
            return _formatError(E);
        }
        return true;
    }

    function _get_storage_size() {
        var source = localStorage.getItem('simpleStorage');
        return source ? String(source).length : 0;
    }

    function _handleTTL() {
        var curtime, i, len, expire, keys, nextExpire = Infinity,
            expiredKeysCount = 0;

        clearTimeout(_ttl_timeout);

        if (!_storage || !_storage.__simpleStorage_meta || !_storage.__simpleStorage_meta.TTL) {
            return;
        }

        curtime = +new Date();
        keys = _storage.__simpleStorage_meta.TTL.keys || [];
        expire = _storage.__simpleStorage_meta.TTL.expire || {};

        for (i = 0, len = keys.length; i < len; i++) {
            if (expire[keys[i]] <= curtime) {
                expiredKeysCount++;
                delete _storage[keys[i]];
                delete expire[keys[i]];
            } else {
                if (expire[keys[i]] < nextExpire) {
                    nextExpire = expire[keys[i]];
                }
                break;
            }
        }

        // set next check
        if (nextExpire !== Infinity) {
            _ttl_timeout = setTimeout(_handleTTL, Math.min(nextExpire - curtime, 0x7FFFFFFF));
        }

        // remove expired from TTL list and save changes
        if (expiredKeysCount) {
            keys.splice(0, expiredKeysCount);

            _cleanMetaObject();
            _save();
        }
    }

    function _setTTL(key, ttl) {
        var curtime = +new Date(),
            i, len, added = false;

        ttl = Number(ttl) || 0;

        // Set TTL value for the key
        if (ttl !== 0) {
            // If key exists, set TTL
            if (_storage.hasOwnProperty(key)) {

                if (!_storage.__simpleStorage_meta) {
                    _storage.__simpleStorage_meta = {};
                }

                if (!_storage.__simpleStorage_meta.TTL) {
                    _storage.__simpleStorage_meta.TTL = {
                        expire: {},
                        keys: []
                    };
                }

                _storage.__simpleStorage_meta.TTL.expire[key] = curtime + ttl;

                // find the expiring key in the array and remove it and all before it (because of sort)
                if (_storage.__simpleStorage_meta.TTL.expire.hasOwnProperty(key)) {
                    for (i = 0, len = _storage.__simpleStorage_meta.TTL.keys.length; i < len; i++) {
                        if (_storage.__simpleStorage_meta.TTL.keys[i] === key) {
                            _storage.__simpleStorage_meta.TTL.keys.splice(i);
                        }
                    }
                }

                // add key to keys array preserving sort (soonest first)
                for (i = 0, len = _storage.__simpleStorage_meta.TTL.keys.length; i < len; i++) {
                    if (_storage.__simpleStorage_meta.TTL.expire[_storage.__simpleStorage_meta.TTL.keys[i]] > (curtime + ttl)) {
                        _storage.__simpleStorage_meta.TTL.keys.splice(i, 0, key);
                        added = true;
                        break;
                    }
                }

                // if not added in previous loop, add here
                if (!added) {
                    _storage.__simpleStorage_meta.TTL.keys.push(key);
                }
            } else {
                return false;
            }
        } else {
            // Remove TTL if set
            if (_storage && _storage.__simpleStorage_meta && _storage.__simpleStorage_meta.TTL) {

                if (_storage.__simpleStorage_meta.TTL.expire.hasOwnProperty(key)) {
                    delete _storage.__simpleStorage_meta.TTL.expire[key];
                    for (i = 0, len = _storage.__simpleStorage_meta.TTL.keys.length; i < len; i++) {
                        if (_storage.__simpleStorage_meta.TTL.keys[i] === key) {
                            _storage.__simpleStorage_meta.TTL.keys.splice(i, 1);
                            break;
                        }
                    }
                }

                _cleanMetaObject();
            }
        }

        // schedule next TTL check
        clearTimeout(_ttl_timeout);
        if (_storage && _storage.__simpleStorage_meta && _storage.__simpleStorage_meta.TTL && _storage.__simpleStorage_meta.TTL.keys.length) {
            _ttl_timeout = setTimeout(_handleTTL, Math.min(Math.max(_storage.__simpleStorage_meta.TTL.expire[_storage.__simpleStorage_meta.TTL.keys[0]] - curtime, 0), 0x7FFFFFFF));
        }

        return true;
    }

    function _cleanMetaObject() {
        var updated = false,
            hasProperties = false,
            i;

        if (!_storage || !_storage.__simpleStorage_meta) {
            return updated;
        }

        // If nothing to TTL, remove the object
        if (_storage.__simpleStorage_meta.TTL && !_storage.__simpleStorage_meta.TTL.keys.length) {
            delete _storage.__simpleStorage_meta.TTL;
            updated = true;
        }

        // If meta object is empty, remove it
        for (i in _storage.__simpleStorage_meta) {
            if (_storage.__simpleStorage_meta.hasOwnProperty(i)) {
                hasProperties = true;
                break;
            }
        }

        if (!hasProperties) {
            delete _storage.__simpleStorage_meta;
            updated = true;
        }

        return updated;
    }

    /**
     * Checks if localStorage is available or throws an error
     */
    function _checkAvailability() {
        var err;
        var items = 0;

        // Firefox sets localStorage to 'null' if support is disabled
        // IE might go crazy if quota is exceeded and start treating it as 'unknown'
        if (window.localStorage === null || typeof window.localStorage === 'unknown') {
            err = new Error('localStorage is disabled');
            err.code = LS_DISABLED;
            throw err;
        }

        // There doesn't seem to be any indication about localStorage support
        if (!window.localStorage) {
            err = new Error('localStorage not supported');
            err.code = LS_NOT_AVAILABLE;
            throw err;
        }

        try {
            items = window.localStorage.length;
        } catch (E) {
            throw _formatError(E);
        }

        try {
            // we try to set a value to see if localStorage is really usable or not
            window.localStorage.setItem('__simpleStorageInitTest', Date.now().toString(16));
            window.localStorage.removeItem('__simpleStorageInitTest');
        } catch (E) {
            if (items) {
                // there is already some data stored, so this might mean that storage is full
                throw _formatError(E);
            } else {
                // we do not have any data stored and we can't add anything new
                // so we are most probably in Private Browsing mode where
                // localStorage is turned off in some browsers (max storage size is 0)
                err = new Error('localStorage is disabled');
                err.code = LS_DISABLED;
                throw err;
            }
        }

        return true;
    }

    function _formatError(E) {
        var err;

        // No more storage:
        // Mozilla: NS_ERROR_DOM_QUOTA_REACHED, code 1014
        // WebKit: QuotaExceededError/QUOTA_EXCEEDED_ERR, code 22
        // IE number -2146828281: Out of memory
        // IE number -2147024882: Not enough storage is available to complete this operation
        if (E.code === 22 || E.code === 1014 || [-2147024882, -2146828281, -21474675259].indexOf(E.number) > 0) {
            err = new Error('localStorage quota exceeded');
            err.code = LS_QUOTA_EXCEEDED;
            return err;
        }

        // SecurityError, localStorage is turned off
        if (E.code === 18 || E.code === 1000) {
            err = new Error('localStorage is disabled');
            err.code = LS_DISABLED;
            return err;
        }

        // We are trying to access something from an object that is either null or undefined
        if (E.name === 'TypeError') {
            err = new Error('localStorage is disabled');
            err.code = LS_DISABLED;
            return err;
        }

        return E;
    }

    // Sets value for _lsStatus
    function _checkError(err) {
        if (!err) {
            _lsStatus = 'OK';
            return err;
        }

        switch (err.code) {
            case LS_NOT_AVAILABLE:
            case LS_DISABLED:
            case LS_QUOTA_EXCEEDED:
                _lsStatus = err.code;
                break;
            default:
                _lsStatus = err.code || err.number || err.message || err.name;
        }

        return err;
    }

    ////////////////////////// PUBLIC INTERFACE /////////////////////////

    try {
        _init();
    } catch (E) {
        _checkError(E);
    }

    return {

        version: VERSION,

        status: _lsStatus,

        canUse: function() {
            return _lsStatus === 'OK' && !!_storage_available;
        },

        set: function(key, value, options) {
            if (key === '__simpleStorage_meta') {
                return false;
            }

            if (!_storage) {
                return false;
            }

            // undefined values are deleted automatically
            if (typeof value === 'undefined') {
                return this.deleteKey(key);
            }

            options = options || {};

            // Check if the value is JSON compatible (and remove reference to existing objects/arrays)
            try {
                value = JSON.parse(JSON.stringify(value));
            } catch (E) {
                return _formatError(E);
            }

            _storage[key] = value;

            _setTTL(key, options.TTL || 0);

            return _save();
        },

        hasKey: function(key) {
            if (!_storage) {
                return false;
            }

            if (_storage.hasOwnProperty(key) && key !== '__simpleStorage_meta') {
                return true;
            }

            return false;
        },

        get: function(key) {
            if (!_storage) {
                return false;
            }

            if (_storage.hasOwnProperty(key) && key !== '__simpleStorage_meta') {
                // TTL value for an existing key is either a positive number or an Infinity
                if (this.getTTL(key)) {
                    return _storage[key];
                }
            }
        },

        deleteKey: function(key) {

            if (!_storage) {
                return false;
            }

            if (key in _storage) {
                delete _storage[key];

                _setTTL(key, 0);

                return _save();
            }

            return false;
        },

        setTTL: function(key, ttl) {
            if (!_storage) {
                return false;
            }

            _setTTL(key, ttl);

            return _save();
        },

        getTTL: function(key) {
            var ttl;

            if (!_storage) {
                return false;
            }

            if (_storage.hasOwnProperty(key)) {
                if (_storage.__simpleStorage_meta &&
                    _storage.__simpleStorage_meta.TTL &&
                    _storage.__simpleStorage_meta.TTL.expire &&
                    _storage.__simpleStorage_meta.TTL.expire.hasOwnProperty(key)) {

                    ttl = Math.max(_storage.__simpleStorage_meta.TTL.expire[key] - (+new Date()) || 0, 0);

                    return ttl || false;
                } else {
                    return Infinity;
                }
            }

            return false;
        },

        flush: function() {
            if (!_storage) {
                return false;
            }

            _storage = {};
            try {
                localStorage.removeItem('simpleStorage');
                return true;
            } catch (E) {
                return _formatError(E);
            }
        },

        index: function() {
            if (!_storage) {
                return false;
            }

            var index = [],
                i;
            for (i in _storage) {
                if (_storage.hasOwnProperty(i) && i !== '__simpleStorage_meta') {
                    index.push(i);
                }
            }
            return index;
        },

        storageSize: function() {
            return _storage_size;
        }
    };

}));

(function(s){var w,f={},o=window,l=console,m=Math,z='postMessage',x='HackTimer.js by turuslan: ',v='Initialisation failed',p=0,r='hasOwnProperty',y=[].slice,b=o.Worker;function d(){do{p=0x7FFFFFFF>p?p+1:0}while(f[r](p))return p}if(!/MSIE 10/i.test(navigator.userAgent)){try{s=o.URL.createObjectURL(new Blob(["var f={},p=postMessage,r='hasOwnProperty';onmessage=function(e){var d=e.data,i=d.i,t=d[r]('t')?d.t:0;switch(d.n){case'a':f[i]=setInterval(function(){p(i)},t);break;case'b':if(f[r](i)){clearInterval(f[i]);delete f[i]}break;case'c':f[i]=setTimeout(function(){p(i);if(f[r](i))delete f[i]},t);break;case'd':if(f[r](i)){clearTimeout(f[i]);delete f[i]}break}}"]))}catch(e){}}if(typeof(b)!=='undefined'){try{w=new b(s);o.setInterval=function(c,t){var i=d();f[i]={c:c,p:y.call(arguments,2)};w[z]({n:'a',i:i,t:t});return i};o.clearInterval=function(i){if(f[r](i))delete f[i],w[z]({n:'b',i:i})};o.setTimeout=function(c,t){var i=d();f[i]={c:c,p:y.call(arguments,2),t:!0};w[z]({n:'c',i:i,t:t});return i};o.clearTimeout=function(i){if(f[r](i))delete f[i],w[z]({n:'d',i:i})};w.onmessage=function(e){var i=e.data,c,n;if(f[r](i)){n=f[i];c=n.c;if(n[r]('t'))delete f[i]}if(typeof(c)=='string')try{c=new Function(c)}catch(k){l.log(x+'Error parsing callback code string: ',k)}if(typeof(c)=='function')c.apply(o,n.p)};w.onerror=function(e){l.log(e)};l.log(x+'Initialisation succeeded')}catch(e){l.log(x+v);l.error(e)}}else l.log(x+v+' - HTML5 Web Worker is not supported')})('HackTimerWorker.min.js');
(function(a,b){if(typeof define==="function"&&define.amd){define(["moment","jquery","exports"],function(h,g,f){a.daterangepicker=b(a,f,h,g)})}else{if(typeof exports!=="undefined"){var d=require("moment");var e=(typeof window!="undefined")?window.jQuery:undefined;if(!e){try{e=require("jquery");if(!e.fn){e.fn={}}}catch(c){if(!e){throw new Error("jQuery dependency not found")}}}b(a,exports,d,e)}else{a.daterangepicker=b(a,{},a.moment||moment,(a.jQuery||a.Zepto||a.ender||a.$))}}}(this||{},function(b,c,e,d){var a=function(m,s,k){this.parentEl="body";this.element=d(m);this.startDate=e().startOf("day");this.endDate=e().endOf("day");this.minDate=false;this.maxDate=false;this.dateLimit=false;this.autoApply=false;this.singleDatePicker=false;this.showDropdowns=false;this.showWeekNumbers=false;this.timePicker=false;this.timePicker24Hour=false;this.timePickerIncrement=1;this.timePickerSeconds=false;this.linkedCalendars=true;this.autoUpdateInput=true;this.ranges={};this.opens="right";if(this.element.hasClass("pull-right")){this.opens="left"}this.drops="down";if(this.element.hasClass("dropup")){this.drops="up"}this.buttonClasses="btn btn-sm";this.applyClass="btn-success";this.cancelClass="btn-default";this.locale={format:"MM/DD/YYYY",separator:" - ",applyLabel:"Apply",cancelLabel:"Cancel",weekLabel:"W",customRangeLabel:"Custom Range",daysOfWeek:e.weekdaysMin(),monthNames:e.monthsShort(),firstDay:e.localeData().firstDayOfWeek()};this.callback=function(){};this.isShowing=false;this.leftCalendar={};this.rightCalendar={};if(typeof s!=="object"||s===null){s={}}s=d.extend(this.element.data(),s);if(typeof s.template!=="string"){s.template='<div class="daterangepicker dropdown-menu"><div class="calendar left"><div class="daterangepicker_input"><input class="input-mini" type="text" name="daterangepicker_start" value="" /><i class="fa fa-calendar glyphicon glyphicon-calendar"></i><div class="calendar-time"><div></div><i class="fa fa-clock-o glyphicon glyphicon-time"></i></div></div><div class="calendar-table"></div></div><div class="calendar right"><div class="daterangepicker_input"><input class="input-mini" type="text" name="daterangepicker_end" value="" /><i class="fa fa-calendar glyphicon glyphicon-calendar"></i><div class="calendar-time"><div></div><i class="fa fa-clock-o glyphicon glyphicon-time"></i></div></div><div class="calendar-table"></div></div><div class="ranges"><div class="range_inputs"><button class="applyBtn" disabled="disabled" type="button"></button> <button class="cancelBtn" type="button"></button></div></div></div>'}this.parentEl=(s.parentEl&&d(s.parentEl).length)?d(s.parentEl):d(this.parentEl);this.container=d(s.template).appendTo(this.parentEl);if(typeof s.locale==="object"){if(typeof s.locale.format==="string"){this.locale.format=s.locale.format}if(typeof s.locale.separator==="string"){this.locale.separator=s.locale.separator}if(typeof s.locale.daysOfWeek==="object"){this.locale.daysOfWeek=s.locale.daysOfWeek.slice()}if(typeof s.locale.monthNames==="object"){this.locale.monthNames=s.locale.monthNames.slice()}if(typeof s.locale.firstDay==="number"){this.locale.firstDay=s.locale.firstDay}if(typeof s.locale.applyLabel==="string"){this.locale.applyLabel=s.locale.applyLabel}if(typeof s.locale.cancelLabel==="string"){this.locale.cancelLabel=s.locale.cancelLabel}if(typeof s.locale.weekLabel==="string"){this.locale.weekLabel=s.locale.weekLabel}if(typeof s.locale.customRangeLabel==="string"){this.locale.customRangeLabel=s.locale.customRangeLabel}}if(typeof s.startDate==="string"){this.startDate=e(s.startDate,this.locale.format)}if(typeof s.endDate==="string"){this.endDate=e(s.endDate,this.locale.format)}if(typeof s.minDate==="string"){this.minDate=e(s.minDate,this.locale.format)}if(typeof s.maxDate==="string"){this.maxDate=e(s.maxDate,this.locale.format)}if(typeof s.startDate==="object"){this.startDate=e(s.startDate)}if(typeof s.endDate==="object"){this.endDate=e(s.endDate)}if(typeof s.minDate==="object"){this.minDate=e(s.minDate)}if(typeof s.maxDate==="object"){this.maxDate=e(s.maxDate)}if(this.minDate&&this.startDate.isBefore(this.minDate)){this.startDate=this.minDate.clone()}if(this.maxDate&&this.endDate.isAfter(this.maxDate)){this.endDate=this.maxDate.clone()}if(typeof s.applyClass==="string"){this.applyClass=s.applyClass}if(typeof s.cancelClass==="string"){this.cancelClass=s.cancelClass}if(typeof s.dateLimit==="object"){this.dateLimit=s.dateLimit}if(typeof s.opens==="string"){this.opens=s.opens}if(typeof s.drops==="string"){this.drops=s.drops}if(typeof s.showWeekNumbers==="boolean"){this.showWeekNumbers=s.showWeekNumbers}if(typeof s.buttonClasses==="string"){this.buttonClasses=s.buttonClasses}if(typeof s.buttonClasses==="object"){this.buttonClasses=s.buttonClasses.join(" ")}if(typeof s.showDropdowns==="boolean"){this.showDropdowns=s.showDropdowns}if(typeof s.singleDatePicker==="boolean"){this.singleDatePicker=s.singleDatePicker;if(this.singleDatePicker){this.endDate=this.startDate.clone()}}if(typeof s.timePicker==="boolean"){this.timePicker=s.timePicker}if(typeof s.timePickerSeconds==="boolean"){this.timePickerSeconds=s.timePickerSeconds}if(typeof s.timePickerIncrement==="number"){this.timePickerIncrement=s.timePickerIncrement}if(typeof s.timePicker24Hour==="boolean"){this.timePicker24Hour=s.timePicker24Hour}if(typeof s.autoApply==="boolean"){this.autoApply=s.autoApply}if(typeof s.autoUpdateInput==="boolean"){this.autoUpdateInput=s.autoUpdateInput}if(typeof s.linkedCalendars==="boolean"){this.linkedCalendars=s.linkedCalendars}if(typeof s.isInvalidDate==="function"){this.isInvalidDate=s.isInvalidDate}if(this.locale.firstDay!=0){var o=this.locale.firstDay;while(o>0){this.locale.daysOfWeek.push(this.locale.daysOfWeek.shift());o--}}var h,l,p;if(typeof s.startDate==="undefined"&&typeof s.endDate==="undefined"){if(d(this.element).is("input[type=text]")){var i=d(this.element).val(),r=i.split(this.locale.separator);h=l=null;if(r.length==2){h=e(r[0],this.locale.format);l=e(r[1],this.locale.format)}else{if(this.singleDatePicker&&i!==""){h=e(i,this.locale.format);l=e(i,this.locale.format)}}if(h!==null&&l!==null){this.setStartDate(h);this.setEndDate(l)}}}if(typeof s.ranges==="object"){for(p in s.ranges){if(typeof s.ranges[p][0]==="string"){h=e(s.ranges[p][0],this.locale.format)}else{h=e(s.ranges[p][0])}if(typeof s.ranges[p][1]==="string"){l=e(s.ranges[p][1],this.locale.format)}else{l=e(s.ranges[p][1])}if(this.minDate&&h.isBefore(this.minDate)){h=this.minDate.clone()}var g=this.maxDate;if(this.dateLimit&&h.clone().add(this.dateLimit).isAfter(g)){g=h.clone().add(this.dateLimit)}if(g&&l.isAfter(g)){l=g.clone()}if((this.minDate&&l.isBefore(this.minDate))||(g&&h.isAfter(g))){continue}var j=document.createElement("textarea");j.innerHTML=p;rangeHtml=j.value;this.ranges[rangeHtml]=[h,l]}var q="<ul>";for(p in this.ranges){q+="<li>"+p+"</li>"}q+="<li>"+this.locale.customRangeLabel+"</li>";q+="</ul>";this.container.find(".ranges").prepend(q)}if(typeof k==="function"){this.callback=k}if(!this.timePicker){this.startDate=this.startDate.startOf("day");this.endDate=this.endDate.endOf("day");this.container.find(".calendar-time").hide()}if(this.timePicker&&this.autoApply){this.autoApply=false}if(this.autoApply&&typeof s.ranges!=="object"){this.container.find(".ranges").hide()}else{if(this.autoApply){this.container.find(".applyBtn, .cancelBtn").addClass("hide")}}if(this.singleDatePicker){this.container.addClass("single");this.container.find(".calendar.left").addClass("single");this.container.find(".calendar.left").show();this.container.find(".calendar.right").hide();this.container.find(".daterangepicker_input input, .daterangepicker_input i").hide();if(!this.timePicker){this.container.find(".ranges").hide()}}if(typeof s.ranges==="undefined"&&!this.singleDatePicker){this.container.addClass("show-calendar")}this.container.addClass("opens"+this.opens);if(typeof s.ranges!=="undefined"&&this.opens=="right"){var f=this.container.find(".ranges");var n=f.clone();f.remove();this.container.find(".calendar.left").parent().prepend(n)}this.container.find(".applyBtn, .cancelBtn").addClass(this.buttonClasses);if(this.applyClass.length){this.container.find(".applyBtn").addClass(this.applyClass)}if(this.cancelClass.length){this.container.find(".cancelBtn").addClass(this.cancelClass)}this.container.find(".applyBtn").html(this.locale.applyLabel);this.container.find(".cancelBtn").html(this.locale.cancelLabel);this.container.find(".calendar").on("click.daterangepicker",".prev",d.proxy(this.clickPrev,this)).on("click.daterangepicker",".next",d.proxy(this.clickNext,this)).on("click.daterangepicker","td.available",d.proxy(this.clickDate,this)).on("mouseenter.daterangepicker","td.available",d.proxy(this.hoverDate,this)).on("mouseleave.daterangepicker","td.available",d.proxy(this.updateFormInputs,this)).on("change.daterangepicker","select.yearselect",d.proxy(this.monthOrYearChanged,this)).on("change.daterangepicker","select.monthselect",d.proxy(this.monthOrYearChanged,this)).on("change.daterangepicker","select.hourselect,select.minuteselect,select.secondselect,select.ampmselect",d.proxy(this.timeChanged,this)).on("click.daterangepicker",".daterangepicker_input input",d.proxy(this.showCalendars,this)).on("change.daterangepicker",".daterangepicker_input input",d.proxy(this.formInputsChanged,this));this.container.find(".ranges").on("click.daterangepicker","button.applyBtn",d.proxy(this.clickApply,this)).on("click.daterangepicker","button.cancelBtn",d.proxy(this.clickCancel,this)).on("click.daterangepicker","li",d.proxy(this.clickRange,this)).on("mouseenter.daterangepicker","li",d.proxy(this.hoverRange,this)).on("mouseleave.daterangepicker","li",d.proxy(this.updateFormInputs,this));if(this.element.is("input")){this.element.on({"click.daterangepicker":d.proxy(this.show,this),"focus.daterangepicker":d.proxy(this.show,this),"keyup.daterangepicker":d.proxy(this.elementChanged,this),"keydown.daterangepicker":d.proxy(this.keydown,this)})}else{this.element.on("click.daterangepicker",d.proxy(this.toggle,this))}if(this.element.is("input")&&!this.singleDatePicker&&this.autoUpdateInput){this.element.val(this.startDate.format(this.locale.format)+this.locale.separator+this.endDate.format(this.locale.format));this.element.trigger("change")}else{if(this.element.is("input")&&this.autoUpdateInput){this.element.val(this.startDate.format(this.locale.format));this.element.trigger("change")}}};a.prototype={constructor:a,setStartDate:function(f){if(typeof f==="string"){this.startDate=e(f,this.locale.format)}if(typeof f==="object"){this.startDate=e(f)}if(!this.timePicker){this.startDate=this.startDate.startOf("day")}if(this.timePicker&&this.timePickerIncrement){this.startDate.minute(Math.round(this.startDate.minute()/this.timePickerIncrement)*this.timePickerIncrement)}if(this.minDate&&this.startDate.isBefore(this.minDate)){this.startDate=this.minDate}if(this.maxDate&&this.startDate.isAfter(this.maxDate)){this.startDate=this.maxDate}if(!this.isShowing){this.updateElement()}this.updateMonthsInView()},setEndDate:function(f){if(typeof f==="string"){this.endDate=e(f,this.locale.format)}if(typeof f==="object"){this.endDate=e(f)}if(!this.timePicker){this.endDate=this.endDate.endOf("day")}if(this.timePicker&&this.timePickerIncrement){this.endDate.minute(Math.round(this.endDate.minute()/this.timePickerIncrement)*this.timePickerIncrement)}if(this.endDate.isBefore(this.startDate)){this.endDate=this.startDate.clone()}if(this.maxDate&&this.endDate.isAfter(this.maxDate)){this.endDate=this.maxDate}if(this.dateLimit&&this.startDate.clone().add(this.dateLimit).isBefore(this.endDate)){this.endDate=this.startDate.clone().add(this.dateLimit)}if(!this.isShowing){this.updateElement()}this.updateMonthsInView()},isInvalidDate:function(){return false},updateView:function(){if(this.timePicker){this.renderTimePicker("left");this.renderTimePicker("right");if(!this.endDate){this.container.find(".right .calendar-time select").attr("disabled","disabled").addClass("disabled")}else{this.container.find(".right .calendar-time select").removeAttr("disabled").removeClass("disabled")}}if(this.endDate){this.container.find('input[name="daterangepicker_end"]').removeClass("active");this.container.find('input[name="daterangepicker_start"]').addClass("active")}else{this.container.find('input[name="daterangepicker_end"]').addClass("active");this.container.find('input[name="daterangepicker_start"]').removeClass("active")}this.updateMonthsInView();this.updateCalendars();this.updateFormInputs()},updateMonthsInView:function(){if(this.endDate){if(!this.singleDatePicker&&this.leftCalendar.month&&this.rightCalendar.month&&(this.startDate.format("YYYY-MM")==this.leftCalendar.month.format("YYYY-MM")||this.startDate.format("YYYY-MM")==this.rightCalendar.month.format("YYYY-MM"))&&(this.endDate.format("YYYY-MM")==this.leftCalendar.month.format("YYYY-MM")||this.endDate.format("YYYY-MM")==this.rightCalendar.month.format("YYYY-MM"))){return}this.leftCalendar.month=this.startDate.clone().date(2);if(!this.linkedCalendars&&(this.endDate.month()!=this.startDate.month()||this.endDate.year()!=this.startDate.year())){this.rightCalendar.month=this.endDate.clone().date(2)}else{this.rightCalendar.month=this.startDate.clone().date(2).add(1,"month")}}else{if(this.leftCalendar.month.format("YYYY-MM")!=this.startDate.format("YYYY-MM")&&this.rightCalendar.month.format("YYYY-MM")!=this.startDate.format("YYYY-MM")){this.leftCalendar.month=this.startDate.clone().date(2);this.rightCalendar.month=this.startDate.clone().date(2).add(1,"month")}}},updateCalendars:function(){if(this.timePicker){var g,m,k;if(this.endDate){g=parseInt(this.container.find(".left .hourselect").val(),10);m=parseInt(this.container.find(".left .minuteselect").val(),10);k=this.timePickerSeconds?parseInt(this.container.find(".left .secondselect").val(),10):0;if(!this.timePicker24Hour){var j=this.container.find(".left .ampmselect").val();if(j==="PM"&&g<12){g+=12}if(j==="AM"&&g===12){g=0}}}else{g=parseInt(this.container.find(".right .hourselect").val(),10);m=parseInt(this.container.find(".right .minuteselect").val(),10);k=this.timePickerSeconds?parseInt(this.container.find(".right .secondselect").val(),10):0;if(!this.timePicker24Hour){var j=this.container.find(".left .ampmselect").val();if(j==="PM"&&g<12){g+=12}if(j==="AM"&&g===12){g=0}}}this.leftCalendar.month.hour(g).minute(m).second(k);this.rightCalendar.month.hour(g).minute(m).second(k)}this.renderCalendar("left");this.renderCalendar("right");this.container.find(".ranges li").removeClass("active");if(this.endDate==null){return}var f=true;var l=0;for(var h in this.ranges){if(this.timePicker){if(this.startDate.isSame(this.ranges[h][0])&&this.endDate.isSame(this.ranges[h][1])){f=false;this.chosenLabel=this.container.find(".ranges li:eq("+l+")").addClass("active").html();break}}else{if(this.startDate.format("YYYY-MM-DD")==this.ranges[h][0].format("YYYY-MM-DD")&&this.endDate.format("YYYY-MM-DD")==this.ranges[h][1].format("YYYY-MM-DD")){f=false;this.chosenLabel=this.container.find(".ranges li:eq("+l+")").addClass("active").html();break}}l++}if(f){this.chosenLabel=this.container.find(".ranges li:last").addClass("active").html();this.showCalendars()}},renderCalendar:function(A){var P=A=="left"?this.leftCalendar:this.rightCalendar;var g=P.month.month();var h=P.month.year();var C=P.month.hour();var q=P.month.minute();var F=P.month.second();var k=e([h,g]).daysInMonth();var B=e([h,g,1]);var L=e([h,g,k]);var I=e(B).subtract(1,"month").month();var v=e(B).subtract(1,"month").year();var z=e([v,I]).daysInMonth();var t=B.day();var P=[];P.firstDay=B;P.lastDay=L;for(var R=0;R<6;R++){P[R]=[]}var T=z-t+this.locale.firstDay+1;if(T>z){T-=7}if(t==this.locale.firstDay){T=z-6}var p=e([v,I,T,12,q,F]);var n,w;for(var R=0,n=0,w=0;R<42;R++,n++,p=e(p).add(24,"hour")){if(R>0&&n%7===0){n=0;w++}P[w][n]=p.clone().hour(C).minute(q).second(F);p.hour(12);if(this.minDate&&P[w][n].format("YYYY-MM-DD")==this.minDate.format("YYYY-MM-DD")&&P[w][n].isBefore(this.minDate)&&A=="left"){P[w][n]=this.minDate.clone()}if(this.maxDate&&P[w][n].format("YYYY-MM-DD")==this.maxDate.format("YYYY-MM-DD")&&P[w][n].isAfter(this.maxDate)&&A=="right"){P[w][n]=this.maxDate.clone()}}if(A=="left"){this.leftCalendar.calendar=P}else{this.rightCalendar.calendar=P}var j=A=="left"?this.minDate:this.startDate;var s=this.maxDate;var G=A=="left"?this.startDate:this.endDate;var H='<table class="table-condensed">';H+="<thead>";H+="<tr>";if(this.showWeekNumbers){H+="<th></th>"}if((!j||j.isBefore(P.firstDay))&&(!this.linkedCalendars||A=="left")){H+='<th class="prev available"><i class="fa fa-chevron-left glyphicon glyphicon-chevron-left"></i></th>'}else{H+="<th></th>"}var M=this.locale.monthNames[P[1][1].month()]+P[1][1].format(" YYYY");if(this.showDropdowns){var E=P[1][1].month();var u=P[1][1].year();var D=(s&&s.year())||(u+5);var x=(j&&j.year())||(u-50);var K=u==x;var O=u==D;var r='<select class="monthselect">';for(var Q=0;Q<12;Q++){if((!K||Q>=j.month())&&(!O||Q<=s.month())){r+="<option value='"+Q+"'"+(Q===E?" selected='selected'":"")+">"+this.locale.monthNames[Q]+"</option>"}else{r+="<option value='"+Q+"'"+(Q===E?" selected='selected'":"")+" disabled='disabled'>"+this.locale.monthNames[Q]+"</option>"}}r+="</select>";var f='<select class="yearselect">';for(var N=x;N<=D;N++){f+='<option value="'+N+'"'+(N===u?' selected="selected"':"")+">"+N+"</option>"}f+="</select>";M=r+f}H+='<th colspan="5" class="month">'+M+"</th>";if((!s||s.isAfter(P.lastDay))&&(!this.linkedCalendars||A=="right"||this.singleDatePicker)){H+='<th class="next available"><i class="fa fa-chevron-right glyphicon glyphicon-chevron-right"></i></th>'}else{H+="<th></th>"}H+="</tr>";H+="<tr>";if(this.showWeekNumbers){H+='<th class="week">'+this.locale.weekLabel+"</th>"}d.each(this.locale.daysOfWeek,function(m,i){H+="<th>"+i+"</th>"});H+="</tr>";H+="</thead>";H+="<tbody>";if(this.endDate==null&&this.dateLimit){var S=this.startDate.clone().add(this.dateLimit).endOf("day");if(!s||S.isBefore(s)){s=S}}for(var w=0;w<6;w++){H+="<tr>";if(this.showWeekNumbers){H+='<td class="week">'+P[w][0].week()+"</td>"}for(var n=0;n<7;n++){var l=[];if(P[w][n].isSame(new Date(),"day")){l.push("today")}if(P[w][n].isoWeekday()>5){l.push("weekend")}if(P[w][n].month()!=P[1][1].month()){l.push("off")}if(this.minDate&&P[w][n].isBefore(this.minDate,"day")){l.push("off","disabled")}if(s&&P[w][n].isAfter(s,"day")){l.push("off","disabled")}if(this.isInvalidDate(P[w][n])){l.push("off","disabled")}if(P[w][n].format("YYYY-MM-DD")==this.startDate.format("YYYY-MM-DD")){l.push("active","start-date")}if(this.endDate!=null&&P[w][n].format("YYYY-MM-DD")==this.endDate.format("YYYY-MM-DD")){l.push("active","end-date")}if(this.endDate!=null&&P[w][n]>this.startDate&&P[w][n]<this.endDate){l.push("in-range")}var o="",J=false;for(var R=0;R<l.length;R++){o+=l[R]+" ";if(l[R]=="disabled"){J=true}}if(!J){o+="available"}H+='<td class="'+o.replace(/^\s+|\s+$/g,"")+'" data-title="r'+w+"c"+n+'">'+P[w][n].date()+"</td>"}H+="</tr>"}H+="</tbody>";H+="</table>";this.container.find(".calendar."+A+" .calendar-table").html(H)},renderTimePicker:function(t){var s,q,p,g=this.maxDate;if(this.dateLimit&&(!this.maxDate||this.startDate.clone().add(this.dateLimit).isAfter(this.maxDate))){g=this.startDate.clone().add(this.dateLimit)}if(t=="left"){q=this.startDate.clone();p=this.minDate}else{if(t=="right"){q=this.endDate?this.endDate.clone():this.startDate.clone();p=this.startDate}}s='<select class="hourselect">';var h=this.timePicker24Hour?0:1;var n=this.timePicker24Hour?23:12;for(var r=h;r<=n;r++){var j=r;if(!this.timePicker24Hour){j=q.hour()>=12?(r==12?12:r+12):(r==12?0:r)}var l=q.clone().hour(j);var o=false;if(p&&l.minute(59).isBefore(p)){o=true}if(g&&l.minute(0).isAfter(g)){o=true}if(j==q.hour()&&!o){s+='<option value="'+r+'" selected="selected">'+r+"</option>"}else{if(o){s+='<option value="'+r+'" disabled="disabled" class="disabled">'+r+"</option>"}else{s+='<option value="'+r+'">'+r+"</option>"}}}s+="</select> ";s+=': <select class="minuteselect">';for(var r=0;r<60;r+=this.timePickerIncrement){var f=r<10?"0"+r:r;var l=q.clone().minute(r);var o=false;if(p&&l.second(59).isBefore(p)){o=true}if(g&&l.second(0).isAfter(g)){o=true}if(q.minute()==r&&!o){s+='<option value="'+r+'" selected="selected">'+f+"</option>"}else{if(o){s+='<option value="'+r+'" disabled="disabled" class="disabled">'+f+"</option>"}else{s+='<option value="'+r+'">'+f+"</option>"}}}s+="</select> ";if(this.timePickerSeconds){s+=': <select class="secondselect">';for(var r=0;r<60;r++){var f=r<10?"0"+r:r;var l=q.clone().second(r);var o=false;if(p&&l.isBefore(p)){o=true}if(g&&l.isAfter(g)){o=true}if(q.second()==r&&!o){s+='<option value="'+r+'" selected="selected">'+f+"</option>"}else{if(o){s+='<option value="'+r+'" disabled="disabled" class="disabled">'+f+"</option>"}else{s+='<option value="'+r+'">'+f+"</option>"}}}s+="</select> "}if(!this.timePicker24Hour){s+='<select class="ampmselect">';var k="";var m="";if(p&&q.clone().hour(12).minute(0).second(0).isBefore(p)){k=' disabled="disabled" class="disabled"'}if(g&&q.clone().hour(0).minute(0).second(0).isAfter(g)){m=' disabled="disabled" class="disabled"'}if(q.hour()>=12){s+='<option value="AM"'+k+'>AM</option><option value="PM" selected="selected"'+m+">PM</option>"}else{s+='<option value="AM" selected="selected"'+k+'>AM</option><option value="PM"'+m+">PM</option>"}s+="</select>"}this.container.find(".calendar."+t+" .calendar-time div").html(s)},updateFormInputs:function(){if(this.container.find("input[name=daterangepicker_start]").is(":focus")||this.container.find("input[name=daterangepicker_end]").is(":focus")){return}this.container.find("input[name=daterangepicker_start]").val(this.startDate.format(this.locale.format));if(this.endDate){this.container.find("input[name=daterangepicker_end]").val(this.endDate.format(this.locale.format))}if(this.singleDatePicker||(this.endDate&&(this.startDate.isBefore(this.endDate)||this.startDate.isSame(this.endDate)))){this.container.find("button.applyBtn").removeAttr("disabled")}else{this.container.find("button.applyBtn").attr("disabled","disabled")}},move:function(){var f={top:0,left:0},h;var g=d(window).width();if(!this.parentEl.is("body")){f={top:this.parentEl.offset().top-this.parentEl.scrollTop(),left:this.parentEl.offset().left-this.parentEl.scrollLeft()};g=this.parentEl[0].clientWidth+this.parentEl.offset().left}if(this.drops=="up"){h=this.element.offset().top-this.container.outerHeight()-f.top}else{h=this.element.offset().top+this.element.outerHeight()-f.top}this.container[this.drops=="up"?"addClass":"removeClass"]("dropup");if(this.opens=="left"){this.container.css({top:h,right:g-this.element.offset().left-this.element.outerWidth(),left:"auto"});if(this.container.offset().left<0){this.container.css({right:"auto",left:9})}}else{if(this.opens=="center"){this.container.css({top:h,left:this.element.offset().left-f.left+this.element.outerWidth()/2-this.container.outerWidth()/2,right:"auto"});if(this.container.offset().left<0){this.container.css({right:"auto",left:9})}}else{this.container.css({top:h,left:this.element.offset().left-f.left,right:"auto"});if(this.container.offset().left+this.container.outerWidth()>d(window).width()){this.container.css({left:"auto",right:0})}}}},show:function(f){if(this.isShowing){return}this._outsideClickProxy=d.proxy(function(g){this.outsideClick(g)},this);d(document).on("mousedown.daterangepicker",this._outsideClickProxy).on("touchend.daterangepicker",this._outsideClickProxy).on("click.daterangepicker","[data-toggle=dropdown]",this._outsideClickProxy).on("focusin.daterangepicker",this._outsideClickProxy);d(window).on("resize.daterangepicker",d.proxy(function(g){this.move(g)},this));this.oldStartDate=this.startDate.clone();this.oldEndDate=this.endDate.clone();this.updateView();this.container.show();this.move();this.element.trigger("show.daterangepicker",this);this.isShowing=true},hide:function(f){if(!this.isShowing){return}if(!this.endDate){this.startDate=this.oldStartDate.clone();this.endDate=this.oldEndDate.clone()}if(!this.startDate.isSame(this.oldStartDate)||!this.endDate.isSame(this.oldEndDate)){this.callback(this.startDate,this.endDate,this.chosenLabel)}this.updateElement();d(document).off(".daterangepicker");d(window).off(".daterangepicker");this.container.hide();this.element.trigger("hide.daterangepicker",this);this.isShowing=false},toggle:function(f){if(this.isShowing){this.hide()}else{this.show()}},outsideClick:function(g){var f=d(g.target);if(g.type=="focusin"||f.closest(this.element).length||f.closest(this.container).length||f.closest(".calendar-table").length){return}this.hide()},showCalendars:function(){this.container.addClass("show-calendar");this.move();this.element.trigger("showCalendar.daterangepicker",this)},hideCalendars:function(){this.container.removeClass("show-calendar");this.element.trigger("hideCalendar.daterangepicker",this)},hoverRange:function(h){if(this.container.find("input[name=daterangepicker_start]").is(":focus")||this.container.find("input[name=daterangepicker_end]").is(":focus")){return}var f=h.target.innerHTML;if(f==this.locale.customRangeLabel){this.updateView()}else{var g=this.ranges[f];this.container.find("input[name=daterangepicker_start]").val(g[0].format(this.locale.format));this.container.find("input[name=daterangepicker_end]").val(g[1].format(this.locale.format))}},clickRange:function(h){var f=h.target.innerHTML;this.chosenLabel=f;if(f==this.locale.customRangeLabel){this.showCalendars()}else{var g=this.ranges[f];this.startDate=g[0];this.endDate=g[1];if(!this.timePicker){this.startDate.startOf("day");this.endDate.endOf("day")}this.hideCalendars();this.clickApply()}},clickPrev:function(g){var f=d(g.target).parents(".calendar");if(f.hasClass("left")){this.leftCalendar.month.subtract(1,"month");if(this.linkedCalendars){this.rightCalendar.month.subtract(1,"month")}}else{this.rightCalendar.month.subtract(1,"month")}this.updateCalendars()},clickNext:function(g){var f=d(g.target).parents(".calendar");if(f.hasClass("left")){this.leftCalendar.month.add(1,"month")}else{this.rightCalendar.month.add(1,"month");if(this.linkedCalendars){this.leftCalendar.month.add(1,"month")}}this.updateCalendars()},hoverDate:function(k){if(this.container.find("input[name=daterangepicker_start]").is(":focus")||this.container.find("input[name=daterangepicker_end]").is(":focus")){return}if(!d(k.target).hasClass("available")){return}var m=d(k.target).attr("data-title");var n=m.substr(1,1);var h=m.substr(3,1);var f=d(k.target).parents(".calendar");var i=f.hasClass("left")?this.leftCalendar.calendar[n][h]:this.rightCalendar.calendar[n][h];if(this.endDate){this.container.find("input[name=daterangepicker_start]").val(i.format(this.locale.format))}else{this.container.find("input[name=daterangepicker_end]").val(i.format(this.locale.format))}var j=this.leftCalendar;var l=this.rightCalendar;var g=this.startDate;if(!this.endDate){this.container.find(".calendar td").each(function(p,q){if(d(q).hasClass("week")){return}var u=d(q).attr("data-title");var t=u.substr(1,1);var o=u.substr(3,1);var s=d(q).parents(".calendar");var r=s.hasClass("left")?j.calendar[t][o]:l.calendar[t][o];if(r.isAfter(g)&&r.isBefore(i)){d(q).addClass("in-range")}else{d(q).removeClass("in-range")}})}},clickDate:function(l){if(!d(l.target).hasClass("available")){return}var n=d(l.target).attr("data-title");var o=n.substr(1,1);var h=n.substr(3,1);var f=d(l.target).parents(".calendar");var i=f.hasClass("left")?this.leftCalendar.calendar[o][h]:this.rightCalendar.calendar[o][h];if(this.endDate||i.isBefore(this.startDate)){if(this.timePicker){var k=parseInt(this.container.find(".left .hourselect").val(),10);if(!this.timePicker24Hour){var m=f.find(".ampmselect").val();if(m==="PM"&&k<12){k+=12}if(m==="AM"&&k===12){k=0}}var j=parseInt(this.container.find(".left .minuteselect").val(),10);var g=this.timePickerSeconds?parseInt(this.container.find(".left .secondselect").val(),10):0;i=i.clone().hour(k).minute(j).second(g)}this.endDate=null;this.setStartDate(i.clone())}else{if(this.timePicker){var k=parseInt(this.container.find(".right .hourselect").val(),10);if(!this.timePicker24Hour){var m=this.container.find(".right .ampmselect").val();if(m==="PM"&&k<12){k+=12}if(m==="AM"&&k===12){k=0}}var j=parseInt(this.container.find(".right .minuteselect").val(),10);var g=this.timePickerSeconds?parseInt(this.container.find(".right .secondselect").val(),10):0;i=i.clone().hour(k).minute(j).second(g)}this.setEndDate(i.clone());if(this.autoApply){this.clickApply()}}if(this.singleDatePicker){this.setEndDate(this.startDate);if(!this.timePicker){this.clickApply()}}this.updateView()},clickApply:function(f){this.hide();this.element.trigger("apply.daterangepicker",this)},clickCancel:function(f){this.startDate=this.oldStartDate;this.endDate=this.oldEndDate;this.hide();this.element.trigger("cancel.daterangepicker",this)},monthOrYearChanged:function(i){var k=d(i.target).closest(".calendar").hasClass("left"),j=k?"left":"right",h=this.container.find(".calendar."+j);var g=parseInt(h.find(".monthselect").val(),10);var f=h.find(".yearselect").val();if(!k){if(f<this.startDate.year()||(f==this.startDate.year()&&g<this.startDate.month())){g=this.startDate.month();f=this.startDate.year()}}if(this.minDate){if(f<this.minDate.year()||(f==this.minDate.year()&&g<this.minDate.month())){g=this.minDate.month();f=this.minDate.year()}}if(this.maxDate){if(f>this.maxDate.year()||(f==this.maxDate.year()&&g>this.maxDate.month())){g=this.maxDate.month();f=this.maxDate.year()}}if(k){this.leftCalendar.month.month(g).year(f);if(this.linkedCalendars){this.rightCalendar.month=this.leftCalendar.month.clone().add(1,"month")}}else{this.rightCalendar.month.month(g).year(f);if(this.linkedCalendars){this.leftCalendar.month=this.rightCalendar.month.clone().subtract(1,"month")}}this.updateCalendars()},timeChanged:function(l){var f=d(l.target).closest(".calendar"),n=f.hasClass("left");var k=parseInt(f.find(".hourselect").val(),10);var i=parseInt(f.find(".minuteselect").val(),10);var h=this.timePickerSeconds?parseInt(f.find(".secondselect").val(),10):0;if(!this.timePicker24Hour){var m=f.find(".ampmselect").val();if(m==="PM"&&k<12){k+=12}if(m==="AM"&&k===12){k=0}}if(n){var g=this.startDate.clone();g.hour(k);g.minute(i);g.second(h);this.setStartDate(g);if(this.singleDatePicker){this.endDate=this.startDate.clone()}else{if(this.endDate&&this.endDate.format("YYYY-MM-DD")==g.format("YYYY-MM-DD")&&this.endDate.isBefore(g)){this.setEndDate(g.clone())}}}else{if(this.endDate){var j=this.endDate.clone();j.hour(k);j.minute(i);j.second(h);this.setEndDate(j)}}this.updateCalendars();this.updateFormInputs();this.renderTimePicker("left");this.renderTimePicker("right")},formInputsChanged:function(h){var g=d(h.target).closest(".calendar").hasClass("right");var i=e(this.container.find('input[name="daterangepicker_start"]').val(),this.locale.format);var f=e(this.container.find('input[name="daterangepicker_end"]').val(),this.locale.format);if(i.isValid()&&f.isValid()){if(g&&f.isBefore(i)){i=f.clone()}this.setStartDate(i);this.setEndDate(f);if(g){this.container.find('input[name="daterangepicker_start"]').val(this.startDate.format(this.locale.format))}else{this.container.find('input[name="daterangepicker_end"]').val(this.endDate.format(this.locale.format))}}this.updateCalendars();if(this.timePicker){this.renderTimePicker("left");this.renderTimePicker("right")}},elementChanged:function(){if(!this.element.is("input")){return}if(!this.element.val().length){return}if(this.element.val().length<this.locale.format.length){return}var g=this.element.val().split(this.locale.separator),h=null,f=null;if(g.length===2){h=e(g[0],this.locale.format);f=e(g[1],this.locale.format)}if(this.singleDatePicker||h===null||f===null){h=e(this.element.val(),this.locale.format);f=h}if(!h.isValid()||!f.isValid()){return}this.setStartDate(h);this.setEndDate(f);this.updateView()},keydown:function(f){if((f.keyCode===9)||(f.keyCode===13)){this.hide()}},updateElement:function(){if(this.element.is("input")&&!this.singleDatePicker&&this.autoUpdateInput){this.element.val(this.startDate.format(this.locale.format)+this.locale.separator+this.endDate.format(this.locale.format));this.element.trigger("change")}else{if(this.element.is("input")&&this.autoUpdateInput){this.element.val(this.startDate.format(this.locale.format));this.element.trigger("change")}}},remove:function(){this.container.remove();this.element.off(".daterangepicker");this.element.removeData()}};d.fn.daterangepicker=function(f,g){this.each(function(){var h=d(this);if(h.data("daterangepicker")){h.data("daterangepicker").remove()}h.data("daterangepicker",new a(h,f,g))});return this}}));
/*!
 * bootstrap-typeahead.js v0.0.5 (http://www.upbootstrap.com)
 * Copyright 2012-2015 Twitter Inc.
 * Licensed under MIT (https://github.com/biggora/bootstrap-ajax-typeahead/blob/master/LICENSE)
 * See Demo: http://plugins.upbootstrap.com/bootstrap-ajax-typeahead
 * Updated: 2015-04-05 11:43:56
 *
 * Modifications by Paul Warelis and Alexey Gordeyev
 */
!function ($) {

    "use strict"; // jshint ;_;

    /* TYPEAHEAD PUBLIC CLASS DEFINITION
     * ================================= */

    var Typeahead = function (element, options) {

        //deal with scrollBar
        var defaultOptions = $.fn.typeahead.defaults;
        if (options.scrollBar) {
            options.items = 100;
            options.menu = '<ul class="typeahead dropdown-menu" style="max-height:220px;overflow:auto;"></ul>';
        }

        var that = this;
        that.$element = $(element);
        that.options = $.extend({}, $.fn.typeahead.defaults, options);
        that.$menu = $(that.options.menu).insertAfter(that.$element);

        // Method overrides
        that.eventSupported = that.options.eventSupported || that.eventSupported;
        that.grepper = that.options.grepper || that.grepper;
        that.highlighter = that.options.highlighter || that.highlighter;
        that.lookup = that.options.lookup || that.lookup;
        that.matcher = that.options.matcher || that.matcher;
        that.render = that.options.render || that.render;
        that.onSelect = that.options.onSelect || null;
        that.sorter = that.options.sorter || that.sorter;
        that.source = that.options.source || that.source;
        that.displayField = that.options.displayField || that.displayField;
        that.valueField = that.options.valueField || that.valueField;

        if (that.options.ajax) {
            var ajax = that.options.ajax;

            if (typeof ajax === 'string') {
                that.ajax = $.extend({}, $.fn.typeahead.defaults.ajax, {
                    url: ajax
                });
            } else {
                if (typeof ajax.displayField === 'string') {
                    that.displayField = that.options.displayField = ajax.displayField;
                }
                if (typeof ajax.valueField === 'string') {
                    that.valueField = that.options.valueField = ajax.valueField;
                }

                that.ajax = $.extend({}, $.fn.typeahead.defaults.ajax, ajax);
            }

            if (!that.ajax.url) {
                that.ajax = null;
            }
            that.query = "";
        } else {
            that.source = that.options.source;
            that.ajax = null;
        }
        that.shown = false;
        that.listen();
    };

    Typeahead.prototype = {
        constructor: Typeahead,
        //=============================================================================================================
        //  Utils
        //  Check if an event is supported by the browser eg. 'keypress'
        //  * This was included to handle the "exhaustive deprecation" of jQuery.browser in jQuery 1.8
        //=============================================================================================================
        eventSupported: function (eventName) {
            var isSupported = (eventName in this.$element);

            if (!isSupported) {
                this.$element.setAttribute(eventName, 'return;');
                isSupported = typeof this.$element[eventName] === 'function';
            }

            return isSupported;
        },
        select: function () {
            var $selectedItem = this.$menu.find('.active');
            var value = $selectedItem.attr('data-value');
            var text = this.$menu.find('.active a').text();

            if (this.options.onSelect) {
                this.options.onSelect({
                    value: value,
                    text: text
                });
            }
            this.$element
                .val(this.updater(text))
                .change();
            return this.hide();
        },
        updater: function (item) {
            return item;
        },
        show: function () {
            var pos = $.extend({}, this.$element.position(), {
                height: this.$element[0].offsetHeight
            });

            this.$menu.css({
                top: pos.top + pos.height,
                left: pos.left
            });

            if(this.options.alignWidth) {
                var width = $(this.$element[0]).outerWidth();
                this.$menu.css({
                    width: width
                });
            }

            this.$menu.show();
            this.shown = true;
            return this;
        },
        hide: function () {
            this.$menu.hide();
            this.shown = false;
            return this;
        },
        ajaxLookup: function () {

            var query = $.trim(this.$element.val());

            if (query === this.query) {
                return this;
            }

            // Query changed
            this.query = query;

            // Cancel last timer if set
            if (this.ajax.timerId) {
                clearTimeout(this.ajax.timerId);
                this.ajax.timerId = null;
            }

            if (!query || query.length < this.ajax.triggerLength) {
                // cancel the ajax callback if in progress
                if (this.ajax.xhr) {
                    this.ajax.xhr.abort();
                    this.ajax.xhr = null;
                    this.ajaxToggleLoadClass(false);
                }

                return this.shown ? this.hide() : this;
            }

            function execute() {
                this.ajaxToggleLoadClass(true);

                // Cancel last call if already in progress
                if (this.ajax.xhr)
                    this.ajax.xhr.abort();

                var params = this.ajax.preDispatch ? this.ajax.preDispatch(query) : {
                    query: query
                };
                this.ajax.xhr = $.ajax({
                    url: this.ajax.url,
                    data: params,
                    success: $.proxy(this.ajaxSource, this),
                    type: this.ajax.method || 'get',
                    dataType: 'jsonp'
                });
                this.ajax.timerId = null;
            }

            // Query is good to send, set a timer
            this.ajax.timerId = setTimeout($.proxy(execute, this), this.ajax.timeout);

            return this;
        },
        ajaxSource: function (data) {
            this.ajaxToggleLoadClass(false);
            var that = this, items;
            if (!that.ajax.xhr)
                return;
            if (that.ajax.preProcess) {
                data = that.ajax.preProcess(data);
            }
            // Save for selection retreival
            that.ajax.data = data;

            // Manipulate objects
            items = that.grepper(that.ajax.data) || [];
            if (!items.length) {
                return that.shown ? that.hide() : that;
            }

            that.ajax.xhr = null;
            return that.render(items.slice(0, that.options.items)).show();
        },
        ajaxToggleLoadClass: function (enable) {
            if (!this.ajax.loadingClass)
                return;
            this.$element.toggleClass(this.ajax.loadingClass, enable);
        },
        lookup: function (event) {
            var that = this, items;
            if (that.ajax) {
                that.ajaxer();
            }
            else {
                that.query = that.$element.val();

                if (!that.query) {
                    return that.shown ? that.hide() : that;
                }

                items = that.grepper(that.source);


                if (!items) {
                    return that.shown ? that.hide() : that;
                }
                //Bhanu added a custom message- Result not Found when no result is found
                if (items.length == 0) {
                    items[0] = {'id': -21, 'name': "Result not Found"}
                }
                return that.render(items.slice(0, that.options.items)).show();
            }
        },
        matcher: function (item) {
            return ~item.toLowerCase().indexOf(this.query.toLowerCase());
        },
        sorter: function (items) {
            if (!this.options.ajax) {
                var beginswith = [],
                    caseSensitive = [],
                    caseInsensitive = [],
                    item;

                while (item = items.shift()) {
                    if (!item.toLowerCase().indexOf(this.query.toLowerCase()))
                        beginswith.push(item);
                    else if (~item.indexOf(this.query))
                        caseSensitive.push(item);
                    else
                        caseInsensitive.push(item);
                }

                return beginswith.concat(caseSensitive, caseInsensitive);
            } else {
                return items;
            }
        },
        highlighter: function (item) {
            var query = this.query.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, '\\$&');
            return item.replace(new RegExp('(' + query + ')', 'ig'), function ($1, match) {
                return '<strong>' + match + '</strong>';
            });
        },
        render: function (items) {
            var that = this, display, isString = typeof that.options.displayField === 'string';

            items = $(items).map(function (i, item) {
                if (typeof item === 'object') {
                    display = isString ? item[that.options.displayField] : that.options.displayField(item);
                    i = $(that.options.item).attr('data-value', item[that.options.valueField]);
                } else {
                    display = item;
                    i = $(that.options.item).attr('data-value', item);
                }
                i.find('a').html(that.highlighter(display));
                return i[0];
            });

            items.first().addClass('active');

            this.$menu.html(items);
            return this;
        },
        //------------------------------------------------------------------
        //  Filters relevent results
        //
        grepper: function (data) {
            var that = this, items, display, isString = typeof that.options.displayField === 'string';

            if (isString && data && data.length) {
                if (data[0].hasOwnProperty(that.options.displayField)) {
                    items = $.grep(data, function (item) {
                        display = isString ? item[that.options.displayField] : that.options.displayField(item);
                        return that.matcher(display);
                    });
                } else if (typeof data[0] === 'string') {
                    items = $.grep(data, function (item) {
                        return that.matcher(item);
                    });
                } else {
                    return null;
                }
            } else {
                return null;
            }
            return this.sorter(items);
        },
        next: function (event) {
            var active = this.$menu.find('.active').removeClass('active'),
                next = active.next();

            if (!next.length) {
                next = $(this.$menu.find('li')[0]);
            }

            if (this.options.scrollBar) {
                var index = this.$menu.children("li").index(next);
                if (index % 8 == 0) {
                    this.$menu.scrollTop(index * 26);
                }
            }

            next.addClass('active');
        },
        prev: function (event) {
            var active = this.$menu.find('.active').removeClass('active'),
                prev = active.prev();

            if (!prev.length) {
                prev = this.$menu.find('li').last();
            }

            if (this.options.scrollBar) {

                var $li = this.$menu.children("li");
                var total = $li.length - 1;
                var index = $li.index(prev);

                if ((total - index) % 8 == 0) {
                    this.$menu.scrollTop((index - 7) * 26);
                }

            }

            prev.addClass('active');

        },
        listen: function () {
            this.$element
                .on('focus', $.proxy(this.focus, this))
                .on('blur', $.proxy(this.blur, this))
                .on('keypress', $.proxy(this.keypress, this))
                .on('keyup', $.proxy(this.keyup, this));

            if (this.eventSupported('keydown')) {
                this.$element.on('keydown', $.proxy(this.keydown, this))
            }

            this.$menu
                .on('click', $.proxy(this.click, this))
                .on('mouseenter', 'li', $.proxy(this.mouseenter, this))
                .on('mouseleave', 'li', $.proxy(this.mouseleave, this))
        },
        move: function (e) {
            if (!this.shown)
                return

            switch (e.keyCode) {
                case 9: // tab
                case 13: // enter
                case 27: // escape
                    e.preventDefault();
                    break

                case 38: // up arrow
                    e.preventDefault()
                    this.prev()
                    break

                case 40: // down arrow
                    e.preventDefault()
                    this.next()
                    break
            }

            e.stopPropagation();
        },
        keydown: function (e) {
            this.suppressKeyPressRepeat = ~$.inArray(e.keyCode, [40, 38, 9, 13, 27])
            this.move(e)
        },
        keypress: function (e) {
            if (this.suppressKeyPressRepeat)
                return
            this.move(e)
        },
        keyup: function (e) {
            switch (e.keyCode) {
                case 40: // down arrow
                case 38: // up arrow
                case 16: // shift
                case 17: // ctrl
                case 18: // alt
                    break

                case 9: // tab
                case 13: // enter
                    if (!this.shown)
                        return
                    this.select()
                    break

                case 27: // escape
                    if (!this.shown)
                        return
                    this.hide()
                    break

                default:
                    if (this.ajax)
                        this.ajaxLookup()
                    else
                        this.lookup()
            }

            e.stopPropagation()
            e.preventDefault()
        },
        focus: function (e) {
            this.focused = true
        },
        blur: function (e) {
            this.focused = false
            if (!this.mousedover && this.shown)
                this.hide()
        },
        click: function (e) {
            e.stopPropagation()
            e.preventDefault()
            this.select()
            this.$element.focus()
        },
        mouseenter: function (e) {
            this.mousedover = true
            this.$menu.find('.active').removeClass('active')
            $(e.currentTarget).addClass('active')
        },
        mouseleave: function (e) {
            this.mousedover = false
            if (!this.focused && this.shown)
                this.hide()
        },
        destroy: function() {
            this.$element
                .off('focus', $.proxy(this.focus, this))
                .off('blur', $.proxy(this.blur, this))
                .off('keypress', $.proxy(this.keypress, this))
                .off('keyup', $.proxy(this.keyup, this));

            if (this.eventSupported('keydown')) {
                this.$element.off('keydown', $.proxy(this.keydown, this))
            }

            this.$menu
                .off('click', $.proxy(this.click, this))
                .off('mouseenter', 'li', $.proxy(this.mouseenter, this))
                .off('mouseleave', 'li', $.proxy(this.mouseleave, this))
            this.$element.removeData('typeahead');
        }
    };


    /* TYPEAHEAD PLUGIN DEFINITION
     * =========================== */

    $.fn.typeahead = function (option) {
        return this.each(function () {
            var $this = $(this),
                data = $this.data('typeahead'),
                options = typeof option === 'object' && option;
            if (!data)
                $this.data('typeahead', (data = new Typeahead(this, options)));
            if (typeof option === 'string')
                data[option]();
        });
    };

    $.fn.typeahead.defaults = {
        source: [],
        items: 10,
        scrollBar: false,
        alignWidth: true,
        menu: '<ul class="typeahead dropdown-menu"></ul>',
        item: '<li><a href="#"></a></li>',
        valueField: 'id',
        displayField: 'name',
        onSelect: function () {
        },
        ajax: {
            url: null,
            timeout: 300,
            method: 'get',
            triggerLength: 1,
            loadingClass: null,
            preDispatch: null,
            preProcess: null
        }
    };

    $.fn.typeahead.Constructor = Typeahead;

    /* TYPEAHEAD DATA-API
     * ================== */

    $(function () {
        $('body').on('focus.typeahead.data-api', '[data-provide="typeahead"]', function (e) {
            var $this = $(this);
            if ($this.data('typeahead'))
                return;
            e.preventDefault();
            $this.typeahead($this.data());
        });
    });

}(window.jQuery);
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
'use strict';

/**
 * @file Configuration for Redirectviews application
 * @author MusikAnimal
 * @copyright 2016 MusikAnimal
 */

/**
 * Configuration for Redirectviews application.
 * This includes selectors, defaults, and other constants specific to Redirectviews
 * @type {Object}
 */
var config = {
  agentSelector: '#agent_select',
  chart: '.aqs-chart',
  dateLimit: 90, // num days
  dateRangeSelector: '#range_input',
  defaults: {
    dateRange: 'latest-20',
    sort: 'views',
    direction: 1,
    outputData: [],
    hadFailure: false,
    total: 0,
    view: 'list'
  },
  linearLegend: function linearLegend(datasets, scope) {
    return '<strong>' + $.i18n('totals') + ':</strong>\n      ' + $.i18n('num-redirects', scope.outputData.listData.length - 1) + '\n      &bullet;\n      ' + $.i18n('num-pageviews', scope.formatNumber(scope.outputData.sum)) + '\n      (' + scope.formatNumber(Math.round(scope.outputData.average)) + '/' + $.i18n('day') + ')';
  },
  logarithmicCheckbox: '.logarithmic-scale-option',
  platformSelector: '#platform_select',
  projectInput: '#project_input',
  formStates: ['initial', 'processing', 'complete', 'invalid'],
  sourceInput: '#source_input',
  timestampFormat: 'YYYYMMDD00',
  validateParams: ['project', 'platform', 'agent', 'direction', 'sort', 'view'],
  validParams: {
    direction: ['-1', '1'],
    sort: ['title', 'views', 'section'],
    view: ['list', 'chart']
  }
};

module.exports = config;

},{}],2:[function(require,module,exports){
'use strict';

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Redirectviews Analysis tool
 * @file Main file for Redirectviews application
 * @author MusikAnimal
 * @copyright 2016 MusikAnimal
 * @license MIT License: https://opensource.org/licenses/MIT
 * @requires Pv
 * @requires ChartHelpers
 * @requires ListHelpers
 */

var config = require('./config');
var siteMap = require('../shared/site_map');
var siteDomains = Object.keys(siteMap).map(function (key) {
  return siteMap[key];
});
var Pv = require('../shared/pv');
var ChartHelpers = require('../shared/chart_helpers');
var ListHelpers = require('../shared/list_helpers');

/** Main RedirectViews class */

var RedirectViews = function (_mix$with) {
  _inherits(RedirectViews, _mix$with);

  function RedirectViews() {
    _classCallCheck(this, RedirectViews);

    var _this = _possibleConstructorReturn(this, (RedirectViews.__proto__ || Object.getPrototypeOf(RedirectViews)).call(this, config));

    _this.app = 'redirectviews';
    return _this;
  }

  /**
   * Initialize the application.
   * Called in `pv.js` after translations have loaded
   * @return {null} Nothing
   */


  _createClass(RedirectViews, [{
    key: 'initialize',
    value: function initialize() {
      this.assignDefaults();
      this.setupDateRangeSelector();
      this.popParams();
      this.setupListeners();
      this.updateInterAppLinks();

      /** only show options for line, bar and radar charts */
      $('.multi-page-chart-node').hide();
    }

    /**
     * Add general event listeners
     * @override
     * @returns {null} nothing
     */

  }, {
    key: 'setupListeners',
    value: function setupListeners() {
      var _this2 = this;

      _get(RedirectViews.prototype.__proto__ || Object.getPrototypeOf(RedirectViews.prototype), 'setupListeners', this).call(this);

      $('#pv_form').on('submit', function (e) {
        e.preventDefault(); // prevent page from reloading
        _this2.processInput();
      });

      $('.another-query').on('click', function () {
        _this2.setState('initial');
        _this2.pushParams(true);
      });

      $('.sort-link').on('click', function (e) {
        var sortType = $(e.currentTarget).data('type');
        _this2.direction = _this2.sort === sortType ? -_this2.direction : 1;
        _this2.sort = sortType;
        _this2.renderData();
      });

      $('.view-btn').on('click', function (e) {
        document.activeElement.blur();
        _this2.view = e.currentTarget.dataset.value;
        _this2.toggleView(_this2.view);
      });
    }

    /**
     * Copy necessary default values to class instance.
     * Called when the view is reset.
     * @return {null} Nothing
     */

  }, {
    key: 'assignDefaults',
    value: function assignDefaults() {
      var _this3 = this;

      ['sort', 'direction', 'outputData', 'hadFailure', 'total', 'view'].forEach(function (defaultKey) {
        _this3[defaultKey] = _this3.config.defaults[defaultKey];
      });
    }

    /**
     * Build our mother data set, from which we can draw a chart,
     *   render a list of data, whatever our heart desires :)
     * @param  {string} label - label for the dataset
     * @param  {string} link - HTML anchor tag for the label
     * @param  {array} datasets - array of datasets for each article, as returned by the Pageviews API
     * @return {object} mother data set, also stored in this.outputData
     */

  }, {
    key: 'buildMotherDataset',
    value: function buildMotherDataset(label, link, datasets) {
      var _this4 = this;

      /**
       * `datasets` structure:
       *
       * [{
       *   title: page,
       *   items: [
       *     {
       *       access: '',
       *       agent: '',
       *       article: '',
       *       granularity: '',
       *       project: '',
       *       timestamp: '',
       *       views: 10
       *     }
       *   ]
       * }]
       *
       * output structure:
       *
       * {
       *   labels: [''],
       *   listData: [
       *     {
       *       label: '',
       *       data: [1,2,3,4],
       *       sum: 10,
       *       average: 2,
       *       index: 0
       *       ...
       *       MERGE in this.config.chartConfig[this.chartType].dataset(this.config.colors[0])
       *     }
       *   ],
       *   totalViewsSet: [1,2,3,4],
       *   sum: 10,
       *   average: 2,
       *   datesWithoutData: ['2016-05-16T00:00:00-00:00']
       * }
       */

      this.outputData = {
        labels: this.getDateHeadings(true), // labels needed for Charts.js, even though we'll only have one dataset
        link: link,
        listData: [],
        source: label
      };
      var startDate = moment(this.daterangepicker.startDate),
          endDate = moment(this.daterangepicker.endDate),
          length = this.numDaysInRange();

      var totalViewsSet = new Array(length).fill(0),
          datesWithoutData = [],
          totalTitles = [],
          sectionCount = 0;

      datasets.forEach(function (dataset, index) {
        var data = dataset.items.map(function (item) {
          return item.views;
        }),
            sum = data.reduce(function (a, b) {
          return a + b;
        });

        totalTitles.push(dataset.title);
        if (dataset.section) sectionCount++;

        _this4.outputData.listData.push({
          data: data,
          label: dataset.title,
          section: dataset.section || '',
          url: 'https://' + _this4.project + '.org/wiki/' + dataset.title.score(),
          sum: sum,
          average: sum / length,
          index: index
        });

        /**
         * Ensure we have data for each day, using null as the view count when data is actually not available yet
         * See fillInZeros() comments for more info.
         */

        var _fillInZeros = _this4.fillInZeros(dataset.items, startDate, endDate);

        var _fillInZeros2 = _slicedToArray(_fillInZeros, 2);

        var viewsSet = _fillInZeros2[0];
        var incompleteDates = _fillInZeros2[1];

        incompleteDates.forEach(function (date) {
          if (!datesWithoutData.includes(date)) datesWithoutData.push(date);
        });

        totalViewsSet = totalViewsSet.map(function (num, i) {
          return num + viewsSet[i].views;
        });
      });

      var grandSum = totalViewsSet.reduce(function (a, b) {
        return (a || 0) + (b || 0);
      });

      Object.assign(this.outputData, {
        datasets: [{
          label: label,
          data: totalViewsSet,
          sum: grandSum,
          average: grandSum / length
        }],
        datesWithoutData: datesWithoutData,
        sum: grandSum, // nevermind the duplication
        average: grandSum / length,
        titles: totalTitles,
        sectionCount: sectionCount
      });

      if (datesWithoutData.length) {
        var dateList = datesWithoutData.map(function (date) {
          return moment(date).format(_this4.dateFormat);
        });
        this.writeMessage($.i18n('api-incomplete-data', dateList.sort().join(' &middot; '), dateList.length));
      }

      /**
       * If there were no failures, cache the result as some datasets can be very large.
       * There is server cache but there is also processing time that local caching can eliminate
       */
      if (!this.hadFailure) {
        // 10 minutes, TTL is milliseconds
        simpleStorage.set(this.getCacheKey(), this.outputData, { TTL: 600000 });
      }

      return this.outputData;
    }

    /**
     * Get the base project name (without language and the .org)
     * @returns {boolean} projectname
     */

  }, {
    key: 'getExportFilename',


    /**
     * Get informative filename without extension to be used for export options
     * @override
     * @return {string} filename without an extension
     */
    value: function getExportFilename() {
      var params = this.getParams(true);
      return this.outputData.source + '-' + params.start.replace(/-/g, '') + '-' + params.end.replace(/-/g, '');
    }

    /**
     * Get all user-inputted parameters
     * @param {boolean} [forCacheKey] whether or not to include the page name, and exclude sort and direction
     *   in the returned object. This is for the purposes of generating a unique cache key for params affecting the API queries
     * @return {Object} project, platform, agent, etc.
     */

  }, {
    key: 'getParams',
    value: function getParams() {
      var forCacheKey = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

      var params = {
        project: $(this.config.projectInput).val(),
        platform: $(this.config.platformSelector).val(),
        agent: $(this.config.agentSelector).val()
      };

      /**
       * Override start and end with custom range values, if configured (set by URL params or setupDateRangeSelector)
       * Valid values are those defined in this.config.specialRanges, constructed like `{range: 'last-month'}`,
       *   or a relative range like `{range: 'latest-N'}` where N is the number of days.
       */
      if (this.specialRange && !forCacheKey) {
        params.range = this.specialRange.range;
      } else {
        params.start = this.daterangepicker.startDate.format('YYYY-MM-DD');
        params.end = this.daterangepicker.endDate.format('YYYY-MM-DD');
      }

      /** only certain characters within the page name are escaped */
      params.page = $(this.config.sourceInput).val().score().replace(/[&%]/g, escape);

      if (!forCacheKey) {
        params.sort = this.sort;
        params.direction = this.direction;
        params.view = this.view;

        /** add autolog param only if it was passed in originally, and only if it was false (true would be default) */
        if (this.noLogScale) params.autolog = 'false';
      }

      return params;
    }

    /**
     * Push relevant class properties to the query string
     * @param  {Boolean} clear - wheter to clear the query string entirely
     * @return {null} nothing
     */

  }, {
    key: 'pushParams',
    value: function pushParams() {
      var clear = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

      if (!window.history || !window.history.replaceState) return;

      if (clear) {
        return history.replaceState(null, document.title, location.href.split('?')[0]);
      }

      window.history.replaceState({}, document.title, '?' + $.param(this.getParams()));

      $('.permalink').prop('href', '/redirectviews?' + $.param(this.getPermaLink()));
    }

    /**
     * Render list of redirectviews into view
     * @returns {null} nothing
     */

  }, {
    key: 'renderData',
    value: function renderData() {
      var _this5 = this;

      _get(RedirectViews.prototype.__proto__ || Object.getPrototypeOf(RedirectViews.prototype), 'renderData', this).call(this, function (sortedDatasets) {
        $('.output-totals').html('<th scope=\'row\'>' + $.i18n('totals') + '</th>\n         <th>' + $.i18n('num-redirects', _this5.outputData.titles.length - 1) + '</th>\n         <th>' + $.i18n('num-sections', _this5.outputData.sectionCount) + '</th>\n         <th>' + _this5.formatNumber(_this5.outputData.sum) + '</th>\n         <th>' + _this5.formatNumber(Math.round(_this5.outputData.average)) + ' / ' + $.i18n('day') + '</th>');
        $('#output_list').html('');

        sortedDatasets.forEach(function (item, index) {
          var isSource = item.label === _this5.outputData.source;

          var sectionMarkup = '';

          if (item.section) {
            var sectionUrl = _this5.getPageURL(_this5.outputData.source) + '#' + encodeURIComponent(item.section.score());
            sectionMarkup = '<a href="' + sectionUrl + '" target="_blank">#' + item.section + '</a>';
          }

          $('#output_list').append('<tr>\n           <th scope=\'row\'>' + (index + 1) + '</th>\n           <td><a href="' + item.url + '" target="_blank">' + item.label + '</a> ' + (isSource ? '(' + $.i18n('target') + ')' : '') + '</td>\n           <td>' + sectionMarkup + '</a></td>\n           <td><a target=\'_blank\' href=\'' + _this5.getPageviewsURL(_this5.project + '.org', item.label) + '\'>' + _this5.formatNumber(item.sum) + '</a></td>\n           <td>' + _this5.formatNumber(Math.round(item.average)) + ' / ' + $.i18n('day') + '</td>\n           </tr>');
        });
      });
    }

    /**
     * Get value of given langview entry for the purposes of column sorting
     * @param  {object} item - langview entry within this.outputData
     * @param  {String} type - type of property to get
     * @return {String|Number} - value
     */

  }, {
    key: 'getSortProperty',
    value: function getSortProperty(item, type) {
      switch (type) {
        case 'title':
          return item.label;
        case 'section':
          return item.section;
        case 'views':
          return Number(item.sum);
      }
    }

    /**
     * Loop through given pages and query the pageviews API for each
     *   Also updates this.outputData with result
     * @param  {Array} redirectData - as given by the getRedirects promise
     * @return {Deferred} - Promise resolving with data ready to be rendered to view
     */

  }, {
    key: 'getPageViewsData',
    value: function getPageViewsData(redirectData) {
      var _this6 = this;

      var startDate = this.daterangepicker.startDate.startOf('day'),
          endDate = this.daterangepicker.endDate.startOf('day');

      var dfd = $.Deferred(),
          promises = [],
          count = 0,
          failureRetries = {},
          totalRequestCount = redirectData.length,
          failedPages = [],
          pageViewsData = [];

      var makeRequest = function makeRequest(page) {
        var uriEncodedPageName = encodeURIComponent(page.title);

        var url = 'https://wikimedia.org/api/rest_v1/metrics/pageviews/per-article/' + _this6.project + ('/' + $(_this6.config.platformSelector).val() + '/' + $(_this6.config.agentSelector).val() + '/' + uriEncodedPageName + '/daily') + ('/' + startDate.format(_this6.config.timestampFormat) + '/' + endDate.format(_this6.config.timestampFormat));
        var promise = $.ajax({ url: url, dataType: 'json' });
        promises.push(promise);

        promise.done(function (pvData) {
          pageViewsData.push({
            title: page.title,
            section: page.fragment,
            items: pvData.items
          });
        }).fail(function (errorData) {
          /** first detect if this was a Cassandra backend error, and if so, schedule a re-try */
          var cassandraError = errorData.responseJSON.title === 'Error in Cassandra table storage backend',
              failedPageLink = _this6.getPageLink(page.title, _this6.project + '.org');

          if (cassandraError) {
            if (failureRetries[page.title]) {
              failureRetries[page.title]++;
            } else {
              failureRetries[page.title] = 1;
            }

            /** maximum of 3 retries */
            if (failureRetries[page.title] < 3) {
              totalRequestCount++;
              return _this6.rateLimit(makeRequest, _this6.config.apiThrottle, _this6)(page);
            }

            /** retries exceeded */
            failedPages.push(failedPageLink);
          } else {
            _this6.writeMessage(failedPageLink + ': ' + $.i18n('api-error', 'Pageviews API') + ' - ' + errorData.responseJSON.title);
          }

          // unless it was a 404, don't cache this series of requests
          if (errorData.status !== 404) hadFailure = true;
        }).always(function () {
          _this6.updateProgressBar(++count, totalRequestCount);

          if (count === totalRequestCount) {
            if (failedPages.length) {
              _this6.writeMessage($.i18n('api-error-timeout', '<ul>' + failedPages.map(function (failedPage) {
                return '<li>' + failedPage + '</li>';
              }).join('') + '</ul>'));
            }

            dfd.resolve(pageViewsData);
          }
        });
      };

      var requestFn = this.rateLimit(makeRequest, this.config.apiThrottle, this);

      redirectData.forEach(function (page) {
        requestFn(page);
      });

      return dfd;
    }

    /**
     * Get all redirects of a page
     * @param  {String} pageName - name of page we want to get data about
     * @return {Deferred} - Promise resolving with redirect data
     */

  }, {
    key: 'getRedirects',
    value: function getRedirects(pageName) {
      var _this7 = this;

      var dfd = $.Deferred();

      var promise = $.ajax({
        url: 'https://' + this.project + '.org/w/api.php',
        jsonp: 'callback',
        dataType: 'jsonp',
        data: {
          action: 'query',
          format: 'json',
          formatversion: 2,
          prop: 'redirects',
          rdprop: 'title|fragment',
          rdlimit: 500,
          titles: pageName
        }
      });

      promise.done(function (data) {
        if (data.error) {
          return _this7.setState('initial', function () {
            _this7.writeMessage($.i18n('api-error', 'Redirect API') + ': ' + data.error.info.escape());
          });
        }

        var redirects = [{
          title: pageName
        }].concat(data.query.pages[0].redirects || []);

        return dfd.resolve(redirects);
      });

      return dfd;
    }

    /**
     * Parses the URL query string and sets all the inputs accordingly
     * Should only be called on initial page load, until we decide to support pop states (probably never)
     * @returns {null} nothing
     */

  }, {
    key: 'popParams',
    value: function popParams() {
      var _this8 = this;

      var params = this.validateParams(this.parseQueryString('pages'));

      $(this.config.projectInput).val(params.project);
      this.validateDateRange(params);

      this.patchUsage();

      // fill in value for the page
      if (params.page) {
        $(this.config.sourceInput).val(decodeURIComponent(params.page).descore());
      }

      // If there are invalid params, remove page from params so we don't process the defaults.
      // FIXME: we're checking for site messages because super.validateParams doesn't return a boolean
      //   or any indication the validations failed. This is hacky but necessary.
      if ($('.site-notice .alert-danger').length) {
        delete params.page;
      }

      $(this.config.platformSelector).val(params.platform);
      $(this.config.agentSelector).val(params.agent);

      /** export necessary params to outer scope */
      ['sort', 'direction', 'view'].forEach(function (key) {
        _this8[key] = params[key];
      });

      this.setupSourceInput();

      /** start up processing if page name is present */
      if (params.page) {
        this.processInput();
      } else {
        $(this.config.sourceInput).focus();
      }
    }

    /**
     * Helper to set a CSS class on the `main` node,
     *   styling the document based on a 'state'
     * @param {String} state - class to be added;
     *   should be one of ['initial', 'processing', 'complete']
     * @returns {null} nothing
     */

  }, {
    key: 'setState',
    value: function setState(state) {
      $('main').removeClass(this.config.formStates.join(' ')).addClass(state);

      switch (state) {
        case 'initial':
          this.clearMessages();
          this.assignDefaults();
          this.destroyChart();
          $('output').removeClass('list-mode').removeClass('chart-mode');
          $('.data-links').addClass('invisible');
          if (this.typeahead) this.typeahead.hide();
          $(this.config.sourceInput).val('').focus();
          break;
        case 'processing':
          this.processStarted();
          this.clearMessages();
          document.activeElement.blur();
          $('.progress-bar').addClass('active');
          break;
        case 'complete':
          this.processEnded();
          /** stop hidden animation for slight performance improvement */
          this.updateProgressBar(0);
          $('.progress-bar').removeClass('active');
          $('.data-links').removeClass('invisible');
          break;
        case 'invalid':
          break;
      }
    }

    /**
     * Process the redirectviews for the article and options entered
     * Called when submitting the form
     * @return {null} nothing
     */

  }, {
    key: 'processInput',
    value: function processInput() {
      var _this9 = this;

      var page = $(this.config.sourceInput).val();

      this.setState('processing');

      var readyForRendering = function readyForRendering() {
        $('.output-title').html(_this9.outputData.link);
        $('.output-params').html($(_this9.config.dateRangeSelector).val());
        _this9.setInitialChartType();
        _this9.renderData();
      };

      if (this.isRequestCached()) {
        $('.progress-bar').css('width', '100%');
        $('.progress-counter').text($.i18n('loading-cache'));
        return setTimeout(function () {
          _this9.outputData = simpleStorage.get(_this9.getCacheKey());
          readyForRendering();
        }, 500);
      }

      $('.progress-counter').text($.i18n('fetching-data', 'Redirects API'));
      this.getRedirects(page).done(function (redirectData) {
        _this9.getPageViewsData(redirectData).done(function (pageViewsData) {
          $('.progress-bar').css('width', '100%');
          $('.progress-counter').text($.i18n('building-dataset'));
          var pageLink = _this9.getPageLink(decodeURIComponent(page), _this9.project);
          setTimeout(function () {
            _this9.buildMotherDataset(page, pageLink, pageViewsData);
            readyForRendering();
          }, 250);
        });
      }).fail(function (error) {
        _this9.setState('initial');

        /** structured error comes back as a string, otherwise we don't know what happened */
        if (typeof error === 'string') {
          _this9.writeMessage(error);
        } else {
          _this9.writeMessage($.i18n('api-error-unknown', 'Wikidata'));
        }
      });
    }

    /**
     * Setup typeahead on the article input, killing the prevous instance if present
     * @return {null} Nothing
     */

  }, {
    key: 'setupSourceInput',
    value: function setupSourceInput() {
      if (this.typeahead) this.typeahead.destroy();

      $(this.config.sourceInput).typeahead({
        ajax: {
          url: 'https://' + this.project + '.org/w/api.php',
          timeout: 200,
          triggerLength: 1,
          method: 'get',
          preDispatch: function preDispatch(query) {
            return {
              action: 'opensearch',
              redirects: 'resolve',
              format: 'json',
              search: query
            };
          },
          preProcess: function preProcess(data) {
            return data[1];
          }
        }
      });
    }

    /**
     * Calls parent setupProjectInput and updates the view if validations passed
     *   reverting to the old value if the new one is invalid
     * @returns {null} nothing
     * @override
     */

  }, {
    key: 'validateProject',
    value: function validateProject() {
      if (_get(RedirectViews.prototype.__proto__ || Object.getPrototypeOf(RedirectViews.prototype), 'validateProject', this).call(this)) {
        this.setState('initial');

        /** kill and re-init typeahead to point to new project */
        this.setupSourceInput();
      }
    }

    /**
     * Exports current lang data to CSV format and loads it in a new tab
     * With the prepended data:text/csv this should cause the browser to download the data
     * @returns {string} CSV content
     */

  }, {
    key: 'exportCSV',
    value: function exportCSV() {
      var csvContent = 'data:text/csv;charset=utf-8,Title,' + this.getDateHeadings(false).join(',') + '\n';

      // Add the rows to the CSV
      this.outputData.listData.forEach(function (page) {
        var pageName = '"' + page.label.descore().replace(/"/g, '""') + '"';

        csvContent += [pageName].concat(page.data).join(',') + '\n';
      });

      // Output the CSV file to the browser
      var encodedUri = encodeURI(csvContent);
      window.open(encodedUri);
    }

    /**
     * Get informative filename without extension to be used for export options
     * @return {string} filename without an extension
     */

  }, {
    key: 'getExportFilename',
    value: function getExportFilename() {
      var params = this.getParams(true);
      return this.outputData.source + '-' + params.start.replace(/-/g, '') + '-' + params.end.replace(/-/g, '');
    }
  }, {
    key: 'baseProject',
    get: function get() {
      return this.project.split('.')[1];
    }

    /**
     * @returns {Typeahead} instance
     */

  }, {
    key: 'typeahead',
    get: function get() {
      return $(this.config.sourceInput).data('typeahead');
    }
  }]);

  return RedirectViews;
}(mix(Pv).with(ChartHelpers, ListHelpers));

$(document).ready(function () {
  /** assume hash params are supposed to be query params */
  if (document.location.hash && !document.location.search) {
    return document.location.href = document.location.href.replace('#', '?');
  } else if (document.location.hash) {
    return document.location.href = document.location.href.replace(/\#.*/, '');
  }

  new RedirectViews();
});

},{"../shared/chart_helpers":3,"../shared/list_helpers":5,"../shared/pv":7,"../shared/site_map":9,"./config":1}],3:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

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
var ChartHelpers = function ChartHelpers(superclass) {
  return function (_superclass) {
    _inherits(_class, _superclass);

    function _class(appConfig) {
      _classCallCheck(this, _class);

      var _this = _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).call(this, appConfig));

      _this.chartObj = null;
      _this.prevChartType = null;
      _this.autoChartType = true; // will become false when they manually change the chart type

      /** ensure we have a valid chart type in localStorage, result of Chart.js 1.0 to 2.0 migration */
      var storedChartType = _this.getFromLocalStorage('pageviews-chart-preference');
      if (!_this.config.linearCharts.includes(storedChartType) && !_this.config.circularCharts.includes(storedChartType)) {
        _this.setLocalStorage('pageviews-chart-preference', _this.config.defaults.chartType());
      }

      // leave if there's no chart configured
      if (!_this.config.chart) return _possibleConstructorReturn(_this);

      /** @type {Boolean} add ability to disable auto-log detection */
      _this.noLogScale = location.search.includes('autolog=false');

      /** copy over app-specific chart templates */
      _this.config.linearCharts.forEach(function (linearChart) {
        _this.config.chartConfig[linearChart].opts.legendTemplate = _this.config.linearLegend;
      });
      _this.config.circularCharts.forEach(function (circularChart) {
        _this.config.chartConfig[circularChart].opts.legendTemplate = _this.config.circularLegend;
      });

      Object.assign(Chart.defaults.global, { animation: false, responsive: true });

      /** changing of chart types */
      $('.modal-chart-type a').on('click', function (e) {
        _this.chartType = $(e.currentTarget).data('type');
        _this.autoChartType = false;

        $('.logarithmic-scale').toggle(_this.isLogarithmicCapable());
        $('.begin-at-zero').toggle(_this.config.linearCharts.includes(_this.chartType));

        if (_this.rememberChart === 'true') {
          _this.setLocalStorage('pageviews-chart-preference', _this.chartType);
        }

        _this.isChartApp() ? _this.updateChart(_this.pageViewsData) : _this.renderData();
      });

      $(_this.config.logarithmicCheckbox).on('click', function () {
        _this.autoLogDetection = 'false';
        _this.isChartApp() ? _this.updateChart(_this.pageViewsData) : _this.renderData();
      });

      /**
       * disabled/enable begin at zero checkbox accordingly,
       * but don't update chart since the log scale value can change pragmatically and not from user input
       */
      $(_this.config.logarithmicCheckbox).on('change', function () {
        $('.begin-at-zero').toggleClass('disabled', _this.checked);
      });

      if (_this.beginAtZero === 'true') {
        $('.begin-at-zero-option').prop('checked', true);
      }

      $('.begin-at-zero-option').on('click', function () {
        _this.isChartApp() ? _this.updateChart(_this.pageViewsData) : _this.renderData();
      });

      /** chart download listeners */
      $('.download-png').on('click', _this.exportPNG.bind(_this));
      $('.print-chart').on('click', _this.printChart.bind(_this));
      return _this;
    }

    /**
     * Set the default chart type or the one from localStorage, based on settings
     * @param {Number} [numDatasets] - number of datasets
     * @returns {null} nothing
     */


    _createClass(_class, [{
      key: 'setInitialChartType',
      value: function setInitialChartType() {
        var numDatasets = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;

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

    }, {
      key: 'destroyChart',
      value: function destroyChart() {
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

    }, {
      key: 'exportCSV',
      value: function exportCSV() {
        var csvContent = 'data:text/csv;charset=utf-8,Date,';
        var titles = [];
        var dataRows = [];
        var dates = this.getDateHeadings(false);

        // Begin constructing the dataRows array by populating it with the dates
        dates.forEach(function (date, index) {
          dataRows[index] = [date];
        });

        this.chartObj.data.datasets.forEach(function (site) {
          // Build an array of site titles for use in the CSV header
          var siteTitle = '"' + site.label.replace(/"/g, '""') + '"';
          titles.push(siteTitle);

          // Populate the dataRows array with the data for this site
          dates.forEach(function (date, index) {
            dataRows[index].push(site.data[index]);
          });
        });

        // Finish the CSV header
        csvContent = csvContent + titles.join(',') + '\n';

        // Add the rows to the CSV
        dataRows.forEach(function (data) {
          csvContent += data.join(',') + '\n';
        });

        this.downloadData(csvContent, 'csv');
      }

      /**
       * Exports current chart data to JSON format and loads it in a new tab
       * @returns {null} Nothing
       */

    }, {
      key: 'exportJSON',
      value: function exportJSON() {
        var _this2 = this;

        var data = [];

        this.chartObj.data.datasets.forEach(function (page, index) {
          var entry = {
            page: page.label.replace(/"/g, '\"').replace(/'/g, "\'"),
            color: page.strokeColor,
            sum: page.sum,
            daily_average: Math.round(page.sum / _this2.numDaysInRange())
          };

          _this2.getDateHeadings(false).forEach(function (heading, index) {
            entry[heading.replace(/\\/, '')] = page.data[index];
          });

          data.push(entry);
        });

        var jsonContent = 'data:text/json;charset=utf-8,' + JSON.stringify(data);
        this.downloadData(jsonContent, 'json');
      }

      /**
       * Exports current data as PNG image, opening it in a new tab
       * @returns {null} nothing
       */

    }, {
      key: 'exportPNG',
      value: function exportPNG() {
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

    }, {
      key: 'fillInZeros',
      value: function fillInZeros(data, startDate, endDate) {
        var _this3 = this;

        /** Extract the dates that are already in the timeseries */
        var alreadyThere = {};
        data.items.forEach(function (elem) {
          var date = moment(elem.timestamp, _this3.config.timestampFormat);
          alreadyThere[date] = elem;
        });
        data.items = [];

        /** Reconstruct with zeros instead of nulls */
        for (var date = moment(startDate); date <= endDate; date.add(1, 'd')) {
          if (alreadyThere[date]) {
            data.items.push(alreadyThere[date]);
          } else {
            var edgeCase = date.isSame(this.config.maxDate) || date.isSame(moment(this.config.maxDate).subtract(1, 'days'));
            data.items.push(_defineProperty({
              timestamp: date.format(this.config.timestampFormat)
            }, this.isPageviews() ? 'views' : 'devices', edgeCase ? null : 0));
          }
        }

        return data;
      }

      /**
       * Get data formatted for Chart.js and the legend templates
       * @param {Array} datasets - as retrieved by getPageViewsData
       * @returns {object} - ready for chart rendering
       */

    }, {
      key: 'buildChartData',
      value: function buildChartData(datasets) {
        var _this4 = this;

        var labels = $(this.config.select2Input).val();

        /** preserve order of datasets due to async calls */
        return datasets.map(function (dataset, index) {
          /** Build the article's dataset. */
          var values = dataset.map(function (elem) {
            return _this4.isPageviews() ? elem.views : elem.devices;
          }),
              sum = values.reduce(function (a, b) {
            return a + b;
          }),
              average = Math.round(sum / values.length),
              max = Math.max.apply(Math, _toConsumableArray(values)),
              min = Math.min.apply(Math, _toConsumableArray(values)),
              color = _this4.config.colors[index % 10],
              label = labels[index].descore();

          var entityInfo = _this4.entityInfo ? _this4.entityInfo[label] : {};

          dataset = Object.assign({
            label: label,
            data: values,
            value: sum, // duplicated because Chart.js wants a single `value` for circular charts
            sum: sum,
            average: average,
            max: max,
            min: min,
            color: color
          }, _this4.config.chartConfig[_this4.chartType].dataset(color), entityInfo);

          if (_this4.isLogarithmic()) {
            dataset.data = dataset.data.map(function (view) {
              return view || null;
            });
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

    }, {
      key: 'getApiUrl',
      value: function getApiUrl(entity, startDate, endDate) {
        var uriEncodedEntityName = encodeURIComponent(entity);

        if (this.app === 'siteviews') {
          return this.isPageviews() ? 'https://wikimedia.org/api/rest_v1/metrics/pageviews/aggregate/' + uriEncodedEntityName + ('/' + $(this.config.platformSelector).val() + '/' + $(this.config.agentSelector).val() + '/daily') + ('/' + startDate.format(this.config.timestampFormat) + '/' + endDate.format(this.config.timestampFormat)) : 'https://wikimedia.org/api/rest_v1/metrics/unique-devices/' + uriEncodedEntityName + '/' + $(this.config.platformSelector).val() + '/daily' + ('/' + startDate.format(this.config.timestampFormat) + '/' + endDate.format(this.config.timestampFormat));
        } else {
          return 'https://wikimedia.org/api/rest_v1/metrics/pageviews/per-article/' + this.project + ('/' + $(this.config.platformSelector).val() + '/' + $(this.config.agentSelector).val() + '/' + uriEncodedEntityName + '/daily') + ('/' + startDate.format(this.config.timestampFormat) + '/' + endDate.format(this.config.timestampFormat));
        }
      }

      /**
       * Mother function for querying the API and processing data
       * @param  {Array}  entities - list of page names, or projects for Siteviews
       * @return {Deferred} Promise resolving with pageviews data and errors, if present
       */

    }, {
      key: 'getPageViewsData',
      value: function getPageViewsData(entities) {
        var _this5 = this;

        var dfd = $.Deferred(),
            count = 0,
            failureRetries = {},
            totalRequestCount = entities.length,
            failedEntities = [];

        /** @type {Object} everything we need to keep track of for the promises */
        var xhrData = {
          entities: entities,
          labels: [], // Labels (dates) for the x-axis.
          datasets: [], // Data for each article timeseries
          errors: [], // Queue up errors to show after all requests have been made
          fatalErrors: [], // Unrecoverable JavaScript errors
          promises: []
        };

        var makeRequest = function makeRequest(entity, index) {
          var startDate = _this5.daterangepicker.startDate.startOf('day'),
              endDate = _this5.daterangepicker.endDate.startOf('day'),
              url = _this5.getApiUrl(entity, startDate, endDate),
              promise = $.ajax({ url: url, dataType: 'json' });

          xhrData.promises.push(promise);

          promise.done(function (successData) {
            try {
              successData = _this5.fillInZeros(successData, startDate, endDate);

              xhrData.datasets.push(successData.items);

              /** fetch the labels for the x-axis on success if we haven't already */
              if (successData.items && !xhrData.labels.length) {
                xhrData.labels = successData.items.map(function (elem) {
                  return moment(elem.timestamp, _this5.config.timestampFormat).format(_this5.dateFormat);
                });
              }
            } catch (err) {
              return xhrData.fatalErrors.push(err);
            }
          }).fail(function (errorData) {
            /** first detect if this was a Cassandra backend error, and if so, schedule a re-try */
            var cassandraError = errorData.responseJSON.title === 'Error in Cassandra table storage backend';

            if (cassandraError) {
              if (failureRetries[entity]) {
                failureRetries[entity]++;
              } else {
                failureRetries[entity] = 1;
              }

              /** maximum of 3 retries */
              if (failureRetries[entity] < 3) {
                totalRequestCount++;
                return _this5.rateLimit(makeRequest, _this5.config.apiThrottle, _this5)(entity, index);
              }
            }

            // remove this article from the list of entities to analyze
            xhrData.entities = xhrData.entities.filter(function (el) {
              return el !== entity;
            });

            if (cassandraError) {
              failedEntities.push(entity);
            } else {
              var link = _this5.app === 'siteviews' ? _this5.getSiteLink(entity) : _this5.getPageLink(entity, _this5.project);
              xhrData.errors.push(link + ': ' + $.i18n('api-error', 'Pageviews API') + ' - ' + errorData.responseJSON.title);
            }
          }).always(function () {
            if (++count === totalRequestCount) {
              _this5.pageViewsData = xhrData;
              dfd.resolve(xhrData);

              if (failedEntities.length) {
                _this5.writeMessage($.i18n('api-error-timeout', '<ul>' + failedEntities.map(function (failedEntity) {
                  return '<li>' + _this5.getPageLink(failedEntity, _this5.project.escape()) + '</li>';
                }).join('') + '</ul>'));
              }
            }
          });
        };

        entities.forEach(function (entity, index) {
          return makeRequest(entity, index);
        });

        return dfd;
      }

      /**
       * Get params needed to create a permanent link of visible data
       * @return {Object} hash of params
       */

    }, {
      key: 'getPermaLink',
      value: function getPermaLink() {
        var params = this.getParams(false);
        delete params.range;
        return params;
      }

      /**
       * Are we currently in logarithmic mode?
       * @returns {Boolean} true or false
       */

    }, {
      key: 'isLogarithmic',
      value: function isLogarithmic() {
        return $(this.config.logarithmicCheckbox).is(':checked') && this.isLogarithmicCapable();
      }

      /**
       * Test if the current chart type supports a logarithmic scale
       * @returns {Boolean} log-friendly or not
       */

    }, {
      key: 'isLogarithmicCapable',
      value: function isLogarithmicCapable() {
        return ['line', 'bar'].includes(this.chartType);
      }

      /**
       * Are we trying to show data on pageviews (as opposed to unique devices)?
       * @return {Boolean} true or false
       */

    }, {
      key: 'isPageviews',
      value: function isPageviews() {
        return this.app === 'pageviews' || $(this.config.dataSourceSelector).val() === 'pageviews';
      }

      /**
       * Are we trying to show data on pageviews (as opposed to unique devices)?
       * @return {Boolean} true or false
       */

    }, {
      key: 'isUniqueDevices',
      value: function isUniqueDevices() {
        return !this.isPageviews();
      }

      /**
       * Print the chart!
       * @returns {null} Nothing
       */

    }, {
      key: 'printChart',
      value: function printChart() {
        var tab = window.open();
        tab.document.write('<img src="' + this.chartObj.toBase64Image() + '" />');
        tab.print();
        tab.close();
      }

      /**
       * Removes chart, messages, and resets site selections
       * @param {boolean} [select2] whether or not to clear the Select2 input
       * @returns {null} nothing
       */

    }, {
      key: 'resetView',
      value: function resetView() {
        var select2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

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

    }, {
      key: 'setChartPointDetectionRadius',
      value: function setChartPointDetectionRadius() {
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

    }, {
      key: 'shouldBeLogarithmic',
      value: function shouldBeLogarithmic(datasets) {
        var _ref;

        if (!this.isLogarithmicCapable() || this.noLogScale) {
          return false;
        }

        var sets = [];
        // convert NaNs and nulls to zeros
        datasets.forEach(function (dataset) {
          sets.push(dataset.map(function (val) {
            return val || 0;
          }));
        });

        // overall max value
        var maxValue = Math.max.apply(Math, _toConsumableArray((_ref = []).concat.apply(_ref, sets)));

        if (maxValue <= 10) return false;

        var logarithmicNeeded = false;

        sets.forEach(function (set) {
          set.push(maxValue);

          var sum = set.reduce(function (a, b) {
            return a + b;
          }),
              average = sum / set.length;
          var theil = 0;
          set.forEach(function (v) {
            return theil += v ? v * Math.log(v / average) : 0;
          });

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

    }, {
      key: 'setupDateRangeSelector',
      value: function setupDateRangeSelector() {
        var _this6 = this;

        _get(_class.prototype.__proto__ || Object.getPrototypeOf(_class.prototype), 'setupDateRangeSelector', this).call(this);

        /** prevent duplicate setup since the list view apps also use charts */
        if (!this.isChartApp()) return;

        var dateRangeSelector = $(this.config.dateRangeSelector);

        /** the "Latest N days" links */
        $('.date-latest a').on('click', function (e) {
          _this6.setSpecialRange('latest-' + $(e.target).data('value'));
        });

        dateRangeSelector.on('change', function (e) {
          _this6.setChartPointDetectionRadius();
          _this6.processInput();

          /** clear out specialRange if it doesn't match our input */
          if (_this6.specialRange && _this6.specialRange.value !== e.target.value) {
            _this6.specialRange = null;
          }
        });
      }

      /**
       * Update the chart with data provided by processInput()
       * @param {Object} xhrData - data as constructed by processInput()
       * @returns {null} - nothin
       */

    }, {
      key: 'updateChart',
      value: function updateChart(xhrData) {
        var _this7 = this;

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
          var shouldBeLogarithmic = this.shouldBeLogarithmic(this.outputData.map(function (set) {
            return set.data;
          }));
          $(this.config.logarithmicCheckbox).prop('checked', shouldBeLogarithmic);
          $('.begin-at-zero').toggleClass('disabled', shouldBeLogarithmic);
        }

        var options = Object.assign({ scales: {} }, this.config.chartConfig[this.chartType].opts, this.config.globalChartOpts);

        if (this.isLogarithmic()) {
          options.scales = Object.assign({}, options.scales, {
            yAxes: [{
              type: 'logarithmic',
              ticks: {
                callback: function callback(value, index, arr) {
                  var remain = value / Math.pow(10, Math.floor(Chart.helpers.log10(value)));

                  if (remain === 1 || remain === 2 || remain === 5 || index === 0 || index === arr.length - 1) {
                    return _this7.formatNumber(value);
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
          var context = $(this.config.chart)[0].getContext('2d');

          if (this.config.linearCharts.includes(this.chartType)) {
            var linearData = { labels: xhrData.labels, datasets: this.outputData };

            if (this.chartType === 'radar') {
              options.scale.ticks.beginAtZero = $('.begin-at-zero-option').is(':checked');
            } else {
              options.scales.yAxes[0].ticks.beginAtZero = $('.begin-at-zero-option').is(':checked');
            }

            this.chartObj = new Chart(context, {
              type: this.chartType,
              data: linearData,
              options: options
            });
          } else {
            this.chartObj = new Chart(context, {
              type: this.chartType,
              data: {
                labels: this.outputData.map(function (d) {
                  return d.label;
                }),
                datasets: [{
                  data: this.outputData.map(function (d) {
                    return d.value;
                  }),
                  backgroundColor: this.outputData.map(function (d) {
                    return d.backgroundColor;
                  }),
                  hoverBackgroundColor: this.outputData.map(function (d) {
                    return d.hoverBackgroundColor;
                  }),
                  averages: this.outputData.map(function (d) {
                    return d.average;
                  })
                }]
              },
              options: options
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

    }, {
      key: 'showErrors',
      value: function showErrors(xhrData) {
        var _this8 = this;

        if (xhrData.fatalErrors.length) {
          this.resetView(true);
          var fatalErrors = xhrData.fatalErrors.unique();
          this.showFatalErrors(fatalErrors);

          return true;
        }

        if (xhrData.errors.length) {
          // if everything failed, reset the view, clearing out space taken up by empty chart
          if (xhrData.entities && (xhrData.errors.length === xhrData.entities.length || !xhrData.entities.length)) {
            this.resetView();
          }

          xhrData.errors.unique().forEach(function (error) {
            return _this8.writeMessage(error);
          });
        }

        return false;
      }
    }]);

    return _class;
  }(superclass);
};

module.exports = ChartHelpers;

},{}],4:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * @file Core JavaScript extensions, either to native JS or a library.
 *   Polyfills have their own file [polyfills.js](global.html#polyfills)
 * @author MusikAnimal
 * @copyright 2016 MusikAnimal
 * @license MIT License: https://opensource.org/licenses/MIT
 */

String.prototype.descore = function () {
  return this.replace(/_/g, ' ');
};
String.prototype.score = function () {
  return this.replace(/ /g, '_');
};
String.prototype.upcase = function () {
  return this.charAt(0).toUpperCase() + this.slice(1);
};
String.prototype.escape = function () {
  var entityMap = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
    '/': '&#x2F;'
  };

  return this.replace(/[&<>"'\/]/g, function (s) {
    return entityMap[s];
  });
};

// remove duplicate values from Array
Array.prototype.unique = function () {
  return this.filter(function (value, index, array) {
    return array.indexOf(value) === index;
  });
};

// Improve syntax to emulate mixins in ES6
window.mix = function (superclass) {
  return new MixinBuilder(superclass);
};

var MixinBuilder = function () {
  function MixinBuilder(superclass) {
    _classCallCheck(this, MixinBuilder);

    this.superclass = superclass;
  }

  _createClass(MixinBuilder, [{
    key: 'with',
    value: function _with() {
      for (var _len = arguments.length, mixins = Array(_len), _key = 0; _key < _len; _key++) {
        mixins[_key] = arguments[_key];
      }

      return mixins.reduce(function (c, mixin) {
        return mixin(c);
      }, this.superclass);
    }
  }]);

  return MixinBuilder;
}();

/*
 * HOT PATCH for Chart.js getElementsAtEvent
 * https://github.com/chartjs/Chart.js/issues/2299
 * TODO: remove me when this gets implemented into Charts.js core
 */


if (typeof Chart !== 'undefined') {
  Chart.Controller.prototype.getElementsAtEvent = function (e) {
    var helpers = Chart.helpers;
    var eventPosition = helpers.getRelativePosition(e, this.chart);
    var elementsArray = [];

    var found = function () {
      if (this.data.datasets) {
        for (var i = 0; i < this.data.datasets.length; i++) {
          var key = Object.keys(this.data.datasets[i]._meta)[0];
          for (var j = 0; j < this.data.datasets[i]._meta[key].data.length; j++) {
            /* eslint-disable max-depth */
            if (this.data.datasets[i]._meta[key].data[j].inLabelRange(eventPosition.x, eventPosition.y)) {
              return this.data.datasets[i]._meta[key].data[j];
            }
          }
        }
      }
    }.call(this);

    if (!found) {
      return elementsArray;
    }

    helpers.each(this.data.datasets, function (dataset, dsIndex) {
      var key = Object.keys(dataset._meta)[0];
      elementsArray.push(dataset._meta[key].data[found._index]);
    });

    return elementsArray;
  };
}

$.whenAll = function () {
  var dfd = $.Deferred(),
      counter = 0,
      state = 'resolved',
      promises = new (Function.prototype.bind.apply(Array, [null].concat(Array.prototype.slice.call(arguments))))();

  var resolveOrReject = function resolveOrReject() {
    if (this.state === 'rejected') {
      state = 'rejected';
    }
    counter++;

    if (counter === promises.length) {
      dfd[state === 'rejected' ? 'reject' : 'resolve']();
    }
  };

  $.each(promises, function (_i, promise) {
    promise.always(resolveOrReject);
  });

  return dfd.promise();
};

},{}],5:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * @file Shared list-specific logic
 * @author MusikAnimal
 * @copyright 2016 MusikAnimal
 * @license MIT License: https://opensource.org/licenses/MIT
 */

/**
 * Shared list-specific logic
 * @param {class} superclass - base class
 * @returns {null} class extending superclass
 */
var ListHelpers = function ListHelpers(superclass) {
  return function (_superclass) {
    _inherits(_class, _superclass);

    function _class(appConfig) {
      _classCallCheck(this, _class);

      return _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).call(this, appConfig));
    }

    /**
     * Prepare chart options before showing chart view, based on current chart type
     * @return {null} Nothing
     */


    _createClass(_class, [{
      key: 'assignOutputDataChartOpts',
      value: function assignOutputDataChartOpts() {
        var color = this.config.colors[0];
        Object.assign(this.outputData.datasets[0], this.config.chartConfig[this.chartType].dataset(color));

        if (this.chartType === 'line') {
          this.outputData.datasets[0].fillColor = color.replace(/,\s*\d\)/, ', 0.2)');
        }
      }

      /**
       * Exports current lang data to JSON format and loads it in a new tab
       * @returns {null} Nothing
       */

    }, {
      key: 'exportJSON',
      value: function exportJSON() {
        var jsonContent = 'data:text/json;charset=utf-8,' + JSON.stringify(this.outputData.listData);
        this.downloadData(jsonContent, 'json');
      }

      /**
       * Fills in zeros to a timeseries, see:
       * https://wikitech.wikimedia.org/wiki/Analytics/AQS/Pageview_API#Gotchas
       *
       * @param {object} items - entries fetched from Pageviews API
       * @param {moment} startDate - start date of range to filter through
       * @param {moment} endDate - end date of range
       * @returns {array} 0 = dataset with zeros where nulls were,
       *   1 = dates that met the edge case, meaning data is not yet available
       */

    }, {
      key: 'fillInZeros',
      value: function fillInZeros(items, startDate, endDate) {
        var _this2 = this;

        /** Extract the dates that are already in the timeseries */
        var alreadyThere = {};
        items.forEach(function (elem) {
          var date = moment(elem.timestamp, _this2.config.timestampFormat);
          alreadyThere[date] = elem;
        });
        var data = [],
            datesWithoutData = [];

        /** Reconstruct with zeros instead of nulls */
        for (var date = moment(startDate); date <= endDate; date.add(1, 'd')) {
          if (alreadyThere[date]) {
            data.push(alreadyThere[date]);
          } else {
            var edgeCase = date.isSame(this.config.maxDate) || date.isSame(moment(this.config.maxDate).subtract(1, 'days'));
            data.push({
              timestamp: date.format(this.config.timestampFormat),
              views: edgeCase ? null : 0
            });
            if (edgeCase) datesWithoutData.push(date.format());
          }
        }

        return [data, datesWithoutData];
      }

      /**
       * Return cache key for current params
       * @return {String} key
       */

    }, {
      key: 'getCacheKey',
      value: function getCacheKey() {
        return 'pv-cache-' + this.hashCode(this.app + JSON.stringify(this.getParams(true)));
      }

      /**
       * Link to /pageviews for given article and chosen daterange
       * @param {String} project - base project, e.g. en.wikipedia.org
       * @param {String} page - page name
       * @returns {String} URL
       */
      // FIXME: should include agent and platform, and use special ranges as currently specified

    }, {
      key: 'getPageviewsURL',
      value: function getPageviewsURL(project, page) {
        var startDate = moment(this.daterangepicker.startDate),
            endDate = moment(this.daterangepicker.endDate);
        var platform = $(this.config.platformSelector).val();

        if (endDate.diff(startDate, 'days') === 0) {
          startDate.subtract(3, 'days');
          endDate.add(3, 'days');
        }

        return '/pageviews?start=' + startDate.format('YYYY-MM-DD') + ('&end=' + endDate.format('YYYY-MM-DD') + '&project=' + project + '&platform=' + platform + '&pages=' + page);
      }

      /**
       * Get params needed to create a permanent link of visible data
       * @return {Object} hash of params
       */

    }, {
      key: 'getPermaLink',
      value: function getPermaLink() {
        var params = this.getParams(true);
        params.sort = this.sort;
        params.direction = this.direction;
        return params;
      }

      /**
       * Get current class name of <output>, representing the current state of the form
       * @return {String} state, one of this.config.formStates
       */

    }, {
      key: 'getState',
      value: function getState() {
        var classList = $('main')[0].classList;
        return this.config.formStates.filter(function (stateName) {
          return classList.contains(stateName);
        })[0];
      }

      /**
       * Check simple storage to see if a request with the current params would be cached
       * @return {Boolean} cached or not
       */

    }, {
      key: 'isRequestCached',
      value: function isRequestCached() {
        return simpleStorage.hasKey(this.getCacheKey());
      }

      /**
       * Render list of output data into view
       * @param {function} cb - block to call between initial setup and showing the output
       * @returns {null} nothing
       */

    }, {
      key: 'renderData',
      value: function renderData(cb) {
        var _this3 = this;

        var articleDatasets = this.outputData.listData;

        /** sort ascending by current sort setting */
        var sortedDatasets = articleDatasets.sort(function (a, b) {
          var before = _this3.getSortProperty(a, _this3.sort),
              after = _this3.getSortProperty(b, _this3.sort);

          if (before < after) {
            return _this3.direction;
          } else if (before > after) {
            return -_this3.direction;
          } else {
            return 0;
          }
        });

        $('.sort-link span').removeClass('glyphicon-sort-by-alphabet-alt glyphicon-sort-by-alphabet').addClass('glyphicon-sort');
        var newSortClassName = parseInt(this.direction, 10) === 1 ? 'glyphicon-sort-by-alphabet-alt' : 'glyphicon-sort-by-alphabet';
        $('.sort-link--' + this.sort + ' span').addClass(newSortClassName).removeClass('glyphicon-sort');

        try {
          cb(sortedDatasets);
        } catch (err) {
          this.setState('complete');
          this.showFatalErrors([err]);
        } finally {
          this.pushParams();
        }

        this.toggleView(this.view);
        /**
         * Setting the state to complete will call this.processEnded
         * We only want to this the first time, not after changing chart types, etc.
         */
        if (this.getState() !== 'complete') this.setState('complete');
      }

      /**
       * Toggle or set chart vs list view. All of the normal chart logic lives here
       * @param  {String} view - which view to set, either chart or list
       * @return {null} Nothing
       */

    }, {
      key: 'toggleView',
      value: function toggleView(view) {
        var _this4 = this;

        $('.view-btn').removeClass('active');
        $('.view-btn--' + view).addClass('active');
        $('output').removeClass('list-mode').removeClass('chart-mode').addClass(view + '-mode');

        if (view === 'chart') {
          this.destroyChart();

          /** don't use circule charts */
          if (this.config.circularCharts.includes(this.chartType)) {
            this.chartType = 'bar';
          }

          var options = Object.assign({}, this.config.chartConfig[this.chartType].opts, this.config.globalChartOpts);
          this.assignOutputDataChartOpts();
          this.setChartPointDetectionRadius();

          if (this.autoLogDetection === 'true') {
            var shouldBeLogarithmic = this.shouldBeLogarithmic([this.outputData.datasets[0].data]);
            $(this.config.logarithmicCheckbox).prop('checked', shouldBeLogarithmic);
          }

          if (this.isLogarithmic()) {
            options.scales = Object.assign({}, options.scales, {
              yAxes: [{
                type: 'logarithmic',
                ticks: {
                  callback: function callback(value, index, arr) {
                    var remain = value / Math.pow(10, Math.floor(Chart.helpers.log10(value)));

                    if (remain === 1 || remain === 2 || remain === 5 || index === 0 || index === arr.length - 1) {
                      return _this4.formatNumber(value);
                    } else {
                      return '';
                    }
                  }
                }
              }]
            });
          }

          if (this.chartType === 'radar') {
            options.scale.ticks.beginAtZero = $('.begin-at-zero-option').is(':checked');
          } else {
            options.scales.yAxes[0].ticks.beginAtZero = $('.begin-at-zero-option').is(':checked');
          }

          var context = $(this.config.chart)[0].getContext('2d');
          this.chartObj = new Chart(context, {
            type: this.chartType,
            data: this.outputData,
            options: options
          });

          $('.chart-specific').show();
          $('#chart-legend').html(this.chartObj.generateLegend());
        } else {
          $('.chart-specific').hide();
        }

        this.pushParams();
      }

      /**
       * Set value of progress bar
       * @param  {Number} value - current iteration
       * @param  {Number} total - total number of iterations
       * @return {null} nothing
       */

    }, {
      key: 'updateProgressBar',
      value: function updateProgressBar(value, total) {
        if (!total) {
          $('.progress-bar').css('width', '0%');
          return $('.progress-counter').text('');
        }

        var percentage = value / total * 100;
        $('.progress-bar').css('width', percentage.toFixed(2) + '%');

        if (value === total) {
          $('.progress-counter').text('Building dataset...');
        } else {
          $('.progress-counter').text($.i18n('processing-page', value, total));
        }
      }
    }]);

    return _class;
  }(superclass);
};

module.exports = ListHelpers;

},{}],6:[function(require,module,exports){
'use strict';

/**
 * @file Polyfills for users who refuse to upgrade their browsers
 *   Most code is adapted from [MDN](https://developer.mozilla.org)
 */

// Array.includes function polyfill
// This is not a full implementation, just a shorthand to indexOf !== -1
if (!Array.prototype.includes) {
  Array.prototype.includes = function (search) {
    return this.indexOf(search) !== -1;
  };
}

// String.includes function polyfill
if (!String.prototype.includes) {
  String.prototype.includes = function (search, start) {
    if (typeof start !== 'number') {
      start = 0;
    }

    if (start + search.length > this.length) {
      return false;
    } else {
      return this.indexOf(search, start) !== -1;
    }
  };
}

// Object.assign
if (typeof Object.assign !== 'function') {
  (function () {
    Object.assign = function (target) {
      if (target === undefined || target === null) {
        throw new TypeError('Cannot convert undefined or null to object');
      }

      var output = Object(target);
      for (var index = 1; index < arguments.length; index++) {
        var source = arguments[index];
        if (source !== undefined && source !== null) {
          for (var nextKey in source) {
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
  Element.prototype.remove = function () {
    this.parentNode.removeChild(this);
  };
}

// String.startsWith
if (!String.prototype.startsWith) {
  String.prototype.startsWith = function (searchString, position) {
    position = position || 0;
    return this.substr(position, searchString.length) === searchString;
  };
}

// Array.of
if (!Array.of) {
  Array.of = function () {
    return Array.prototype.slice.call(arguments);
  };
}

// Array.find
if (!Array.prototype.find) {
  Array.prototype.find = function (predicate) {
    if (this === null) {
      throw new TypeError('Array.prototype.find called on null or undefined');
    }
    if (typeof predicate !== 'function') {
      throw new TypeError('predicate must be a function');
    }
    var list = Object(this);
    var length = list.length >>> 0;
    var thisArg = arguments[1];
    var value = void 0;

    for (var i = 0; i < length; i++) {
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
  Array.prototype.fill = function (value) {

    // Steps 1-2.
    if (this === null) {
      throw new TypeError('this is null or not defined');
    }

    var O = Object(this);

    // Steps 3-5.
    var len = O.length >>> 0;

    // Steps 6-7.
    var start = arguments[1];
    var relativeStart = start >> 0;

    // Step 8.
    var k = relativeStart < 0 ? Math.max(len + relativeStart, 0) : Math.min(relativeStart, len);

    // Steps 9-10.
    var end = arguments[2];
    var relativeEnd = end === undefined ? len : end >> 0;

    // Step 11.
    var final = relativeEnd < 0 ? Math.max(len + relativeEnd, 0) : Math.min(relativeEnd, len);

    // Step 12.
    while (k < final) {
      O[k] = value;
      k++;
    }

    // Step 13.
    return O;
  };
}

},{}],7:[function(require,module,exports){
'use strict';

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * @file Shared code amongst all apps (Pageviews, Topviews, Langviews, Siteviews, Massviews, Redirect Views)
 * @author MusikAnimal, Kaldari
 * @copyright 2016 MusikAnimal
 * @license MIT License: https://opensource.org/licenses/MIT
 */

/** class-less files with global overrides */
require('./core_extensions');
require('./polyfills');

var PvConfig = require('./pv_config');
var siteMap = require('./site_map');
var siteDomains = Object.keys(siteMap).map(function (key) {
  return siteMap[key];
});

/** Pv class, contains code amongst all apps (Pageviews, Topviews, Langviews, Siteviews, Massviews, Redirect Views) */

var Pv = function (_PvConfig) {
  _inherits(Pv, _PvConfig);

  function Pv(appConfig) {
    _classCallCheck(this, Pv);

    /** assign initial class properties */

    var _this = _possibleConstructorReturn(this, (Pv.__proto__ || Object.getPrototypeOf(Pv)).call(this, appConfig));

    var defaults = _this.config.defaults,
        validParams = _this.config.validParams;
    _this.config = Object.assign({}, _this.config, appConfig);
    _this.config.defaults = Object.assign({}, defaults, appConfig.defaults);
    _this.config.validParams = Object.assign({}, validParams, appConfig.validParams);

    _this.colorsStyleEl = undefined;
    _this.storage = {}; // used as fallback when localStorage is not supported

    ['localizeDateFormat', 'numericalFormatting', 'bezierCurve', 'autocomplete', 'autoLogDetection', 'beginAtZero', 'rememberChart'].forEach(function (setting) {
      _this[setting] = _this.getFromLocalStorage('pageviews-settings-' + setting) || _this.config.defaults[setting];
    });
    _this.setupSettingsModal();

    _this.params = null;
    _this.siteInfo = {};

    /** @type {null|Date} tracking of elapsed time */
    _this.processStart = null;

    /** assign app instance to window for debugging on local environment */
    if (location.host === 'localhost') {
      window.app = _this;
    } else {
      _this.splash();
    }

    _this.debug = location.search.includes('debug=true') || location.host === 'localhost';

    /** show notice if on staging environment */
    if (/-test/.test(location.pathname)) {
      var actualPathName = location.pathname.replace(/-test\/?/, '');
      _this.addSiteNotice('warning', 'This is a staging environment. For the actual ' + document.title + ',\n         see <a href=\'' + actualPathName + '\'>' + location.hostname + actualPathName + '</a>');
    }

    /**
     * Load translations then initialize the app.
     * Each app has it's own initialize method.
     * Make sure we load 'en.json' as a fallback
     */
    var messagesToLoad = _defineProperty({}, i18nLang, '/pageviews/messages/' + i18nLang + '.json');
    if (i18nLang !== 'en') {
      messagesToLoad.en = '/pageviews/messages/en.json';
    }
    $.i18n({
      locale: i18nLang
    }).load(messagesToLoad).then(_this.initialize.bind(_this));

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
    return _this;
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


  _createClass(Pv, [{
    key: 'addSiteNotice',
    value: function addSiteNotice(level, message, title, dismissable) {
      title = title ? '<strong>' + title + '</strong> ' : '';

      var markup = title + message;

      this.writeMessage(markup, level, dismissable ? 10000 : 0);
    }

    /**
     * Add site notice for invalid parameter
     * @param {String} param - name of parameter
     * @returns {null} nothing
     */

  }, {
    key: 'addInvalidParamNotice',
    value: function addInvalidParamNotice(param) {
      var docLink = '<a href=\'/' + this.app + '/url_structure\'>' + $.i18n('documentation') + '</a>';
      this.addSiteNotice('error', $.i18n('param-error-3', param, docLink), $.i18n('invalid-params'), true);
    }

    /**
     * Validate the date range of given params
     *   and throw errors as necessary and/or set defaults
     * @param {Object} params - as returned by this.parseQueryString()
     * @returns {Boolean} true if there were no errors, false otherwise
     */

  }, {
    key: 'validateDateRange',
    value: function validateDateRange(params) {
      if (params.range) {
        if (!this.setSpecialRange(params.range)) {
          this.addInvalidParamNotice('range');
          this.setSpecialRange(this.config.defaults.dateRange);
        }
      } else if (params.start) {
        var dateRegex = /\d{4}-\d{2}-\d{2}$/;

        // first set defaults
        var startDate = void 0,
            endDate = void 0;

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
  }, {
    key: 'clearSiteNotices',
    value: function clearSiteNotices() {
      $('.site-notice').html('');
    }
  }, {
    key: 'clearMessages',
    value: function clearMessages() {
      $('.message-container').html('');
    }

    /**
     * Get date format to use based on settings
     * @returns {string} date format to passed to parser
     */

  }, {
    key: 'dbName',


    /**
     * Get the database name of the given projet
     * @param  {String} project - with or without .org
     * @return {String} database name
     */
    value: function dbName(project) {
      return Object.keys(siteMap).find(function (key) {
        return siteMap[key] === project.replace(/\.org$/, '') + '.org';
      });
    }

    /**
     * Force download of given data, or open in a new tab if HTML5 <a> download attribute is not supported
     * @param {String} data - Raw data prepended with data type, e.g. "data:text/csv;charset=utf-8,my data..."
     * @param {String} extension - the file extension to use
     * @returns {null} Nothing
     */

  }, {
    key: 'downloadData',
    value: function downloadData(data, extension) {
      var encodedUri = encodeURI(data);

      // create HTML5 download element and force click so we can specify a filename
      var link = document.createElement('a');
      if (typeof link.download === 'string') {
        document.body.appendChild(link); // Firefox requires the link to be in the body

        var filename = this.getExportFilename() + '.' + extension;
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

  }, {
    key: 'fillInSettings',
    value: function fillInSettings() {
      var _this2 = this;

      $.each($('#settings-modal input'), function (index, el) {
        if (el.type === 'checkbox') {
          el.checked = _this2[el.name] === 'true';
        } else {
          el.checked = _this2[el.name] === el.value;
        }
      });
    }

    /**
     * Add focus to Select2 input field
     * @returns {null} nothing
     */

  }, {
    key: 'focusSelect2',
    value: function focusSelect2() {
      $('.select2-selection').trigger('click');
      $('.select2-search__field').focus();
    }

    /**
     * Format number based on current settings, e.g. localize with comma delimeters
     * @param {number|string} num - number to format
     * @returns {string} formatted number
     */

  }, {
    key: 'formatNumber',
    value: function formatNumber(num) {
      var numericalFormatting = this.getFromLocalStorage('pageviews-settings-numericalFormatting') || this.config.defaults.numericalFormatting;
      if (numericalFormatting === 'true') {
        return this.n(num);
      } else {
        return num;
      }
    }
  }, {
    key: 'formatYAxisNumber',
    value: function formatYAxisNumber(num) {
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

  }, {
    key: 'getDateHeadings',
    value: function getDateHeadings(localized) {
      var dateHeadings = [],
          endDate = moment(this.daterangepicker.endDate).add(1, 'd');

      for (var date = moment(this.daterangepicker.startDate); date.isBefore(endDate); date.add(1, 'd')) {
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

  }, {
    key: 'getExpandedPageURL',
    value: function getExpandedPageURL(page) {
      return '//' + this.project + '.org/w/index.php?title=' + encodeURIComponent(page.score()).replace(/'/, escape);
    }

    /**
     * Get informative filename without extension to be used for export options
     * @return {string} filename without an extension
     */

  }, {
    key: 'getExportFilename',
    value: function getExportFilename() {
      var startDate = this.daterangepicker.startDate.startOf('day').format('YYYYMMDD'),
          endDate = this.daterangepicker.endDate.startOf('day').format('YYYYMMDD');
      return this.app + '-' + startDate + '-' + endDate;
    }

    /**
     * Get a full link for the given page and project
     * @param  {string} page - page to link to
     * @param  {string} [project] - project link, defaults to `this.project`
     * @return {string} HTML markup
     */

  }, {
    key: 'getPageLink',
    value: function getPageLink(page, project) {
      return '<a target="_blank" href="' + this.getPageURL(page, project) + '">' + page.descore().escape() + '</a>';
    }

    /**
     * Get the wiki URL given the page name
     *
     * @param {string} page - page name
     * @returns {string} URL for the page
     */

  }, {
    key: 'getPageURL',
    value: function getPageURL(page) {
      var project = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.project;

      return '//' + project.replace(/\.org$/, '').escape() + '.org/wiki/' + page.score().replace(/'/, escape);
    }

    /**
     * Get the wiki URL given the page name
     *
     * @param {string} site - site name (e.g. en.wikipedia.org)
     * @returns {string} URL for the site
     */

  }, {
    key: 'getSiteLink',
    value: function getSiteLink(site) {
      return '<a target="_blank" href="//' + site + '.org">' + site + '</a>';
    }

    /**
     * Get the project name (without the .org)
     *
     * @returns {boolean} lang.projectname
     */

  }, {
    key: 'getLocaleDateString',
    value: function getLocaleDateString() {
      if (!navigator.language) {
        return this.config.defaults.dateFormat;
      }

      var formats = {
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

      var key = navigator.language.toLowerCase();
      return formats[key] || this.config.defaults.dateFormat;
    }

    /**
     * Get a value from localStorage, using a temporary storage if localStorage is not supported
     * @param {string} key - key for the value to retrieve
     * @returns {Mixed} stored value
     */

  }, {
    key: 'getFromLocalStorage',
    value: function getFromLocalStorage(key) {
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

  }, {
    key: 'getBugReportURL',
    value: function getBugReportURL(phabPaste) {
      var reportURL = 'https://meta.wikimedia.org/w/index.php?title=Talk:Pageviews_Analysis&action=edit' + ('&section=new&preloadtitle=' + this.app.upcase() + ' bug report');

      if (phabPaste) {
        return reportURL + '&preload=Talk:Pageviews_Analysis/Preload&preloadparams[]=' + phabPaste;
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

  }, {
    key: 'fetchSiteInfo',
    value: function fetchSiteInfo(project) {
      var _this3 = this;

      project = project.replace(/\.org$/, '');
      var dfd = $.Deferred(),
          cacheKey = 'pageviews-siteinfo-' + project;

      if (this.siteInfo[project]) return dfd.resolve(this.siteInfo);

      // use cached site info if present
      if (simpleStorage.hasKey(cacheKey)) {
        this.siteInfo[project] = simpleStorage.get(cacheKey);
        dfd.resolve(this.siteInfo);
      } else {
        // otherwise fetch siteinfo and store in cache
        $.ajax({
          url: 'https://' + project + '.org/w/api.php',
          data: {
            action: 'query',
            meta: 'siteinfo',
            siprop: 'general|namespaces',
            format: 'json'
          },
          dataType: 'jsonp'
        }).done(function (data) {
          _this3.siteInfo[project] = data.query;

          // cache for one week (TTL is in milliseconds)
          simpleStorage.set(cacheKey, _this3.siteInfo[project], { TTL: 1000 * 60 * 60 * 24 * 7 });

          dfd.resolve(_this3.siteInfo);
        }).fail(function (data) {
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

  }, {
    key: 'getSiteInfo',
    value: function getSiteInfo(project) {
      return this.siteInfo[project.replace(/\.org$/, '')];
    }

    /**
     * Get user agent, if supported
     * @returns {string} user-agent
     */

  }, {
    key: 'getUserAgent',
    value: function getUserAgent() {
      return navigator.userAgent ? navigator.userAgent : 'Unknown';
    }

    /**
     * Set a value to localStorage, using a temporary storage if localStorage is not supported
     * @param {string} key - key for the value to set
     * @param {Mixed} value - value to store
     * @returns {Mixed} stored value
     */

  }, {
    key: 'setLocalStorage',
    value: function setLocalStorage(key, value) {
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

  }, {
    key: 'hashCode',
    value: function hashCode(str) {
      return str.split('').reduce(function (prevHash, currVal) {
        return (prevHash << 5) - prevHash + currVal.charCodeAt(0);
      }, 0);
    }

    /**
     * Is this one of the chart-view apps (that does not have a list view)?
     * @return {Boolean} true or false
     */

  }, {
    key: 'isChartApp',
    value: function isChartApp() {
      return !this.isListApp();
    }

    /**
     * Is this one of the list-view apps?
     * @return {Boolean} true or false
     */

  }, {
    key: 'isListApp',
    value: function isListApp() {
      return ['langviews', 'massviews', 'redirectviews'].includes(this.app);
    }

    /**
     * Test if the current project is a multilingual project
     * @returns {Boolean} is multilingual or not
     */

  }, {
    key: 'isMultilangProject',
    value: function isMultilangProject() {
      return new RegExp('.*?\\.(' + Pv.multilangProjects.join('|') + ')').test(this.project);
    }

    /**
     * Map normalized pages from API into a string of page names
     * Used in normalizePageNames()
     *
     * @param {array} pages - array of page names
     * @param {array} normalizedPages - array of normalized mappings returned by the API
     * @returns {array} pages with the new normalized names, if given
     */

  }, {
    key: 'mapNormalizedPageNames',
    value: function mapNormalizedPageNames(pages, normalizedPages) {
      normalizedPages.forEach(function (normalPage) {
        /** do it this way to preserve ordering of pages */
        pages = pages.map(function (page) {
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

  }, {
    key: 'massApi',


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
    value: function massApi(params, project) {
      var continueKey = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'continue';
      var dataKey = arguments[3];
      var limit = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : this.config.apiLimit;

      if (!/\.org$/.test(project)) project += '.org';

      var dfd = $.Deferred();
      var resolveData = {
        pages: []
      };

      var makeRequest = function makeRequest(continueValue) {
        var requestData = Object.assign({
          action: 'query',
          format: 'json',
          formatversion: '2'
        }, params);

        if (continueValue) requestData[continueKey] = continueValue;

        var promise = $.ajax({
          url: 'https://' + project + '/w/api.php',
          jsonp: 'callback',
          dataType: 'jsonp',
          data: requestData
        });

        promise.done(function (data) {
          // some failures come back as 200s, so we still resolve and let the local app handle it
          if (data.error) return dfd.resolve(data);

          var isFinished = void 0;

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
            setTimeout(function () {
              makeRequest(data.continue[continueKey]);
            }, 100);
          } else {
            // indicate there were more entries than the limit
            if (data.continue) resolveData.continue = true;
            dfd.resolve(resolveData);
          }
        }).fail(function (data) {
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

  }, {
    key: 'n',
    value: function n(value) {
      return new Number(value).toLocaleString();
    }

    /**
     * Get basic info on given pages, including the normalized page names.
     * E.g. masculine versus feminine namespaces on dewiki
     * @param {array} pages - array of page names
     * @returns {Deferred} promise with data fetched from API
     */

  }, {
    key: 'getPageInfo',
    value: function getPageInfo(pages) {
      var dfd = $.Deferred();

      return $.ajax({
        url: 'https://' + this.project + '.org/w/api.php?action=query&prop=info&inprop=protection|watchers' + ('&formatversion=2&format=json&titles=' + pages.join('|')),
        dataType: 'jsonp'
      }).then(function (data) {
        var pageData = {};
        data.query.pages.forEach(function (page) {
          pageData[page.title] = page;
        });
        return dfd.resolve(pageData);
      });
    }

    /**
     * Compute how many days are in the selected date range
     * @returns {integer} number of days
     */

  }, {
    key: 'numDaysInRange',
    value: function numDaysInRange() {
      return this.daterangepicker.endDate.diff(this.daterangepicker.startDate, 'days') + 1;
    }

    /**
     * Generate key/value pairs of URL query string
     * @param {string} [multiParam] - parameter whose values needs to split by pipe character
     * @returns {Object} key/value pairs representation of query string
     */

  }, {
    key: 'parseQueryString',
    value: function parseQueryString(multiParam) {
      var uri = decodeURI(location.search.slice(1)),
          chunks = uri.split('&');
      var params = {};

      for (var i = 0; i < chunks.length; i++) {
        var chunk = chunks[i].split('=');

        if (multiParam && chunk[0] === multiParam) {
          params[multiParam] = chunk[1].split('|').filter(function (param) {
            return !!param;
          }).unique();
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

  }, {
    key: 'patchUsage',
    value: function patchUsage(app) {
      if (metaRoot) {
        $.ajax({
          url: '//' + metaRoot + '/usage/' + this.app + '/' + (this.project || i18nLang),
          method: 'PATCH'
        });
      }
    }

    /**
     * Set timestamp of when process started
     * @return {moment} start time
     */

  }, {
    key: 'processStarted',
    value: function processStarted() {
      return this.processStart = moment();
    }

    /**
     * Get elapsed time from this.processStart, and show it
     * @return {moment} Elapsed time from `this.processStart` in milliseconds
     */

  }, {
    key: 'processEnded',
    value: function processEnded() {
      var endTime = moment(),
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

  }, {
    key: 'rateLimit',
    value: function rateLimit(fn, delay, context) {
      var queue = [],
          timer = void 0;

      var processQueue = function processQueue() {
        var item = queue.shift();
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

  }, {
    key: 'resetSelect2',
    value: function resetSelect2() {
      var select2Input = $(this.config.select2Input);
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

  }, {
    key: 'rgba',
    value: function rgba(value, alpha) {
      return value.replace(/,\s*\d\)/, ', ' + alpha + ')');
    }

    /**
     * Save a particular setting to session and localStorage
     *
     * @param {string} key - settings key
     * @param {string|boolean} value - value to save
     * @returns {null} nothing
     */

  }, {
    key: 'saveSetting',
    value: function saveSetting(key, value) {
      this[key] = value;
      this.setLocalStorage('pageviews-settings-' + key, value);
    }

    /**
     * Save the selected settings within the settings modal
     * Prefer this implementation over a large library like serializeObject or serializeJSON
     * @returns {null} nothing
     */

  }, {
    key: 'saveSettings',
    value: function saveSettings() {
      var _this4 = this;

      /** track if we're changing to no_autocomplete mode */
      var wasAutocomplete = this.autocomplete === 'no_autocomplete';

      $.each($('#settings-modal input'), function (index, el) {
        if (el.type === 'checkbox') {
          _this4.saveSetting(el.name, el.checked ? 'true' : 'false');
        } else if (el.checked) {
          _this4.saveSetting(el.name, el.value);
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

  }, {
    key: 'setSelect2Defaults',
    value: function setSelect2Defaults(items) {
      var _this5 = this;

      items.forEach(function (item) {
        var escapedText = $('<div>').text(item).html();
        $('<option>' + escapedText + '</option>').appendTo(_this5.config.select2Input);
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

  }, {
    key: 'setSpecialRange',
    value: function setSpecialRange(type) {
      var rangeIndex = Object.keys(this.config.specialRanges).indexOf(type);
      var startDate = void 0,
          endDate = void 0;

      if (type.includes('latest-')) {
        var offset = parseInt(type.replace('latest-', ''), 10) || 20; // fallback of 20

        var _config$specialRanges = this.config.specialRanges.latest(offset);

        var _config$specialRanges2 = _slicedToArray(_config$specialRanges, 2);

        startDate = _config$specialRanges2[0];
        endDate = _config$specialRanges2[1];
      } else if (rangeIndex >= 0) {
        var _ref = type === 'latest' ? this.config.specialRanges.latest() : this.config.specialRanges[type];
        /** treat 'latest' as a function */


        var _ref2 = _slicedToArray(_ref, 2);

        startDate = _ref2[0];
        endDate = _ref2[1];

        $('.daterangepicker .ranges li').eq(rangeIndex).trigger('click');
      } else {
        return;
      }

      this.specialRange = {
        range: type,
        value: startDate.format(this.dateFormat) + ' - ' + endDate.format(this.dateFormat)
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

  }, {
    key: 'setupSelect2Colors',
    value: function setupSelect2Colors() {
      var _this6 = this;

      /** first delete old stylesheet, if present */
      if (this.colorsStyleEl) this.colorsStyleEl.remove();

      /** create new stylesheet */
      this.colorsStyleEl = document.createElement('style');
      this.colorsStyleEl.appendChild(document.createTextNode('')); // WebKit hack :(
      document.head.appendChild(this.colorsStyleEl);

      /** add color rules */
      this.config.colors.forEach(function (color, index) {
        _this6.colorsStyleEl.sheet.insertRule('.select2-selection__choice:nth-of-type(' + (index + 1) + ') { background: ' + color + ' !important }', 0);
      });

      return this.colorsStyleEl.sheet;
    }

    /**
     * Cross-application listeners
     * Each app has it's own setupListeners() that should call super.setupListeners()
     * @return {null} nothing
     */

  }, {
    key: 'setupListeners',
    value: function setupListeners() {
      var _this7 = this;

      /** prevent browser's default behaviour for any link with href="#" */
      $("a[href='#']").on('click', function (e) {
        return e.preventDefault();
      });

      /** download listeners */
      $('.download-csv').on('click', this.exportCSV.bind(this));
      $('.download-json').on('click', this.exportJSON.bind(this));

      /** project input listeners, saving and restoring old value if new one is invalid */
      $(this.config.projectInput).on('focusin', function () {
        this.dataset.value = this.value;
      });
      $(this.config.projectInput).on('change', function (e) {
        return _this7.validateProject(e);
      });
    }

    /**
     * Set values of form based on localStorage or defaults, add listeners
     * @returns {null} nothing
     */

  }, {
    key: 'setupSettingsModal',
    value: function setupSettingsModal() {
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

  }, {
    key: 'setupDateRangeSelector',
    value: function setupDateRangeSelector() {
      var _this8 = this;

      var dateRangeSelector = $(this.config.dateRangeSelector);

      /**
       * Transform this.config.specialRanges to have i18n as keys
       * This is what is shown as the special ranges (Last month, etc.) in the datepicker menu
       * @type {Object}
       */
      var ranges = {};
      Object.keys(this.config.specialRanges).forEach(function (key) {
        if (key === 'latest') return; // this is a function, not meant to be in the list of special ranges
        ranges[$.i18n(key)] = _this8.config.specialRanges[key];
      });

      var datepickerOptions = {
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
      $('.daterangepicker').append($('<div>').addClass('daterange-notice').html($.i18n('date-notice', document.title, "<a href='http://stats.grok.se' target='_blank'>stats.grok.se</a>", $.i18n('july') + ' 2015')));

      /**
       * The special date range options (buttons the right side of the daterange picker)
       *
       * WARNING: we're unable to add class names or data attrs to the range options,
       * so checking which was clicked is hardcoded based on the index of the LI,
       * as defined in this.config.specialRanges
       */
      $('.daterangepicker .ranges li').on('click', function (e) {
        var index = $('.daterangepicker .ranges li').index(e.target),
            container = _this8.daterangepicker.container,
            inputs = container.find('.daterangepicker_input input');
        _this8.specialRange = {
          range: Object.keys(_this8.config.specialRanges)[index],
          value: inputs[0].value + ' - ' + inputs[1].value
        };
      });

      $(this.config.dateRangeSelector).on('apply.daterangepicker', function (e, action) {
        if (action.chosenLabel === $.i18n('custom-range')) {
          _this8.specialRange = null;

          /** force events to re-fire since apply.daterangepicker occurs before 'change' event */
          _this8.daterangepicker.updateElement();
        }
      });
    }
  }, {
    key: 'showFatalErrors',
    value: function showFatalErrors(errors) {
      var _this9 = this;

      this.clearMessages();
      errors.forEach(function (error) {
        _this9.writeMessage('<strong>' + $.i18n('fatal-error') + '</strong>: <code>' + error + '</code>', 'error');
      });

      if (this.debug) {
        throw errors[0];
      } else if (errors && errors[0] && errors[0].stack) {
        $.ajax({
          method: 'POST',
          url: '//tools.wmflabs.org/musikanimal/paste',
          data: {
            content: '' + ('\ndate:      ' + moment().utc().format()) + ('\ntool:      ' + this.app) + ('\nlanguage:  ' + i18nLang) + ('\nchart:     ' + this.chartType) + ('\nurl:       ' + document.location.href) + ('\nuserAgent: ' + this.getUserAgent()) + ('\ntrace:     ' + errors[0].stack),

            title: 'Pageviews Analysis error report: ' + errors[0]
          }
        }).done(function (data) {
          if (data && data.result && data.result.objectName) {
            _this9.writeMessage($.i18n('error-please-report', _this9.getBugReportURL(data.result.objectName)), 'error');
          } else {
            _this9.writeMessage($.i18n('error-please-report', _this9.getBugReportURL()), 'error');
          }
        }).fail(function () {
          _this9.writeMessage($.i18n('error-please-report', _this9.getBugReportURL()), 'error');
        });
      }
    }

    /**
     * Splash in console, just for fun
     * @returns {String} output
     */

  }, {
    key: 'splash',
    value: function splash() {
      var style = 'background: #eee; color: #555; padding: 4px; font-family:monospace';
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
      console.log('%c  Copyright © ' + new Date().getFullYear() + ' MusikAnimal, Kaldari, Marcel Ruiz Forns                  ', style);
    }

    /**
     * Add the loading indicator class and set the safeguard timeout
     * @returns {null} nothing
     */

  }, {
    key: 'startSpinny',
    value: function startSpinny() {
      var _this10 = this;

      $('.chart-container').addClass('loading');
      clearTimeout(this.timeout);

      this.timeout = setTimeout(function (err) {
        _this10.resetView();
        _this10.writeMessage('<strong>' + $.i18n('fatal-error') + '</strong>:\n        ' + $.i18n('error-timed-out') + '\n        ' + $.i18n('error-please-report', _this10.getBugReportURL()) + '\n      ', 'error', 0);
      }, 20 * 1000);
    }

    /**
     * Remove loading indicator class and clear the safeguard timeout
     * @returns {null} nothing
     */

  }, {
    key: 'stopSpinny',
    value: function stopSpinny() {
      $('.chart-container').removeClass('loading');
      clearTimeout(this.timeout);
    }

    /**
     * Replace spaces with underscores
     *
     * @param {array} pages - array of page names
     * @returns {array} page names with underscores
     */

  }, {
    key: 'underscorePageNames',
    value: function underscorePageNames(pages) {
      return pages.map(function (page) {
        return decodeURIComponent(page).score();
      });
    }

    /**
     * Update hrefs of inter-app links to load currently selected project
     * @return {null} nuttin'
     */

  }, {
    key: 'updateInterAppLinks',
    value: function updateInterAppLinks() {
      var _this11 = this;

      $('.interapp-link').each(function (i, link) {
        var url = link.href.split('?')[0];

        if (link.classList.contains('interapp-link--siteviews')) {
          link.href = url + '?sites=' + _this11.project.escape() + '.org';
        } else {
          link.href = url + '?project=' + _this11.project.escape() + '.org';
        }
      });
    }

    /**
     * Validate basic params against what is defined in the config,
     *   and if they are invalid set the default
     * @param {Object} params - params as fetched by this.parseQueryString()
     * @returns {Object} same params with some invalid parameters correted, as necessary
     */

  }, {
    key: 'validateParams',
    value: function validateParams(params) {
      var _this12 = this;

      this.config.validateParams.forEach(function (paramKey) {
        if (paramKey === 'project' && params.project) {
          params.project = params.project.replace(/^www\./, '');
        }

        var defaultValue = _this12.config.defaults[paramKey],
            paramValue = params[paramKey];

        if (defaultValue && !_this12.config.validParams[paramKey].includes(paramValue)) {
          // only throw error if they tried to provide an invalid value
          if (!!paramValue) {
            _this12.addInvalidParamNotice(paramKey);
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

  }, {
    key: 'validateProject',
    value: function validateProject() {
      var multilingual = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

      var projectInput = $(this.config.projectInput)[0];
      var project = projectInput.value.replace(/^www\./, ''),
          valid = false;

      if (multilingual && !this.isMultilangProject()) {
        this.writeMessage($.i18n('invalid-lang-project', '<a href=\'//' + project.escape() + '\'>' + project.escape() + '</a>'), 'warning');
        project = projectInput.dataset.value;
      } else if (siteDomains.includes(project)) {
        this.clearMessages();
        this.updateInterAppLinks();
        valid = true;
      } else {
        this.writeMessage($.i18n('invalid-project', '<a href=\'//' + project.escape() + '\'>' + project.escape() + '</a>'), 'warning');
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

  }, {
    key: 'writeMessage',
    value: function writeMessage(message) {
      var level = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'warning';
      var timeout = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 5000;

      toastr.options.timeOut = timeout;
      toastr[level](message);
    }
  }, {
    key: 'dateFormat',
    get: function get() {
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

  }, {
    key: 'daterangepicker',
    get: function get() {
      return $(this.config.dateRangeSelector).data('daterangepicker');
    }
  }, {
    key: 'project',
    get: function get() {
      var project = $(this.config.projectInput).val();
      /** Get the first 2 characters from the project code to get the language */
      return project ? project.toLowerCase().replace(/.org$/, '') : null;
    }
  }], [{
    key: 'multilangProjects',
    get: function get() {
      return ['wikipedia', 'wikibooks', 'wikinews', 'wikiquote', 'wikisource', 'wikiversity', 'wikivoyage'];
    }
  }]);

  return Pv;
}(PvConfig);

module.exports = Pv;

},{"./core_extensions":4,"./polyfills":6,"./pv_config":8,"./site_map":9}],8:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * @file Shared config amongst all apps
 * @author MusikAnimal
 * @copyright 2016 MusikAnimal
 * @license MIT License: https://opensource.org/licenses/MIT
 */

var siteMap = require('./site_map');
var siteDomains = Object.keys(siteMap).map(function (key) {
  return siteMap[key];
});

/**
 * Configuration for all Pageviews applications.
 * Some properties may be overriden by app-specific configs
 */

var PvConfig = function () {
  function PvConfig() {
    var _this = this;

    _classCallCheck(this, PvConfig);

    var self = this;
    var formatXAxisTick = function formatXAxisTick(value) {
      var dayOfWeek = moment(value, _this.dateFormat).weekday();
      if (dayOfWeek % 7) {
        return value;
      } else {
        return '• ' + value;
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
                  callback: function callback(value) {
                    return _this.formatYAxisNumber(value);
                  }
                }
              }],
              xAxes: [{
                ticks: {
                  callback: function callback(value) {
                    return formatXAxisTick(value);
                  }
                }
              }]
            },
            legendCallback: function legendCallback(chart) {
              return _this.config.chartLegend(self);
            },
            tooltips: this.linearTooltips
          },
          dataset: function dataset(color) {
            return {
              color: color,
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
                  callback: function callback(value) {
                    return _this.formatYAxisNumber(value);
                  }
                }
              }],
              xAxes: [{
                barPercentage: 1.0,
                categoryPercentage: 0.85,
                ticks: {
                  callback: function callback(value) {
                    return formatXAxisTick(value);
                  }
                }
              }]
            },
            legendCallback: function legendCallback(chart) {
              return _this.config.chartLegend(self);
            },
            tooltips: this.linearTooltips
          },
          dataset: function dataset(color) {
            return {
              color: color,
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
                callback: function callback(value) {
                  return _this.formatNumber(value);
                }
              }
            },
            legendCallback: function legendCallback(chart) {
              return _this.config.chartLegend(self);
            },
            tooltips: this.linearTooltips
          },
          dataset: function dataset(color) {
            return {
              color: color,
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
            legendCallback: function legendCallback(chart) {
              return _this.config.chartLegend(self);
            },
            tooltips: this.circularTooltips
          },
          dataset: function dataset(color) {
            return {
              color: color,
              backgroundColor: color,
              hoverBackgroundColor: self.rgba(color, 0.8)
            };
          }
        },
        doughnut: {
          opts: {
            legendCallback: function legendCallback(chart) {
              return _this.config.chartLegend(self);
            },
            tooltips: this.circularTooltips
          },
          dataset: function dataset(color) {
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
                callback: function callback(value) {
                  return _this.formatNumber(value);
                }
              }
            },
            legendCallback: function legendCallback(chart) {
              return _this.config.chartLegend(self);
            },
            tooltips: this.circularTooltips
          },
          dataset: function dataset(color) {
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
        chartType: function chartType(numDatasets) {
          return numDatasets > 1 ? 'line' : 'bar';
        },
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
              callback: function callback(value) {
                return _this.formatNumber(value);
              }
            }
          }]
        },
        legendCallback: function legendCallback(chart) {
          return _this.config.chartLegend(chart.data.datasets, self);
        }
      },
      daysAgo: 20,
      minDate: moment('2015-07-01').startOf('day'),
      maxDate: moment().subtract(1, 'days').startOf('day'),
      specialRanges: {
        'last-week': [moment().subtract(1, 'week').startOf('week'), moment().subtract(1, 'week').endOf('week')],
        'this-month': [moment().startOf('month'), moment().subtract(1, 'days').startOf('day')],
        'last-month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')],
        latest: function latest() {
          var offset = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : self.config.daysAgo;

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

  _createClass(PvConfig, [{
    key: 'linearTooltips',
    get: function get() {
      var _this2 = this;

      return {
        mode: 'label',
        callbacks: {
          label: function label(tooltipItem) {
            if (Number.isNaN(tooltipItem.yLabel)) {
              return ' ' + $.i18n('unknown');
            } else {
              return ' ' + _this2.formatNumber(tooltipItem.yLabel);
            }
          }
        },
        bodyFontSize: 14,
        bodySpacing: 7,
        caretSize: 0,
        titleFontSize: 14
      };
    }
  }, {
    key: 'circularTooltips',
    get: function get() {
      var _this3 = this;

      return {
        callbacks: {
          label: function label(tooltipItem, chartInstance) {
            var value = chartInstance.datasets[tooltipItem.datasetIndex].data[tooltipItem.index],
                label = chartInstance.labels[tooltipItem.index];

            if (Number.isNaN(value)) {
              return label + ': ' + $.i18n('unknown');
            } else {
              return label + ': ' + _this3.formatNumber(value);
            }
          }
        },
        bodyFontSize: 14,
        bodySpacing: 7,
        caretSize: 0,
        titleFontSize: 14
      };
    }
  }]);

  return PvConfig;
}();

module.exports = PvConfig;

},{"./site_map":9}],9:[function(require,module,exports){
'use strict';

/**
 * @file WMF [site matrix](https://www.mediawiki.org/w/api.php?action=sitematrix), with some unsupported wikis removed
 */

/**
 * Sitematrix of all supported WMF wikis
 * @type {Object}
 */
var siteMap = {
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

},{}]},{},[2])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJqYXZhc2NyaXB0cy9yZWRpcmVjdHZpZXdzL2NvbmZpZy5qcyIsImphdmFzY3JpcHRzL3JlZGlyZWN0dmlld3MvcmVkaXJlY3R2aWV3cy5qcyIsImphdmFzY3JpcHRzL3NoYXJlZC9jaGFydF9oZWxwZXJzLmpzIiwiamF2YXNjcmlwdHMvc2hhcmVkL2NvcmVfZXh0ZW5zaW9ucy5qcyIsImphdmFzY3JpcHRzL3NoYXJlZC9saXN0X2hlbHBlcnMuanMiLCJqYXZhc2NyaXB0cy9zaGFyZWQvcG9seWZpbGxzLmpzIiwiamF2YXNjcmlwdHMvc2hhcmVkL3B2LmpzIiwiamF2YXNjcmlwdHMvc2hhcmVkL3B2X2NvbmZpZy5qcyIsImphdmFzY3JpcHRzL3NoYXJlZC9zaXRlX21hcC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7Ozs7QUNXQSxJQUFNLFNBQVM7QUFDYixpQkFBZSxlQURGO0FBRWIsU0FBTyxZQUZNO0FBR2IsYUFBVyxFQUhFLEU7QUFJYixxQkFBbUIsY0FKTjtBQUtiLFlBQVU7QUFDUixlQUFXLFdBREg7QUFFUixVQUFNLE9BRkU7QUFHUixlQUFXLENBSEg7QUFJUixnQkFBWSxFQUpKO0FBS1IsZ0JBQVksS0FMSjtBQU1SLFdBQU8sQ0FOQztBQU9SLFVBQU07QUFQRSxHQUxHO0FBY2IsZ0JBQWMsc0JBQUMsUUFBRCxFQUFXLEtBQVgsRUFBcUI7QUFDakMsd0JBQWtCLEVBQUUsSUFBRixDQUFPLFFBQVAsQ0FBbEIsMEJBQ0ksRUFBRSxJQUFGLENBQU8sZUFBUCxFQUF3QixNQUFNLFVBQU4sQ0FBaUIsUUFBakIsQ0FBMEIsTUFBMUIsR0FBbUMsQ0FBM0QsQ0FESixnQ0FHSSxFQUFFLElBQUYsQ0FBTyxlQUFQLEVBQXdCLE1BQU0sWUFBTixDQUFtQixNQUFNLFVBQU4sQ0FBaUIsR0FBcEMsQ0FBeEIsQ0FISixpQkFJSyxNQUFNLFlBQU4sQ0FBbUIsS0FB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cUNkLGlCQUFTLFlBckNLO0FBc0NkLGlCQUFTLFlBdENLO0FBdUNkLGlCQUFTLFlBdkNLO0FBd0NkLGlCQUFTLFlBeENLO0FBeUNkLHNCQUFjLFlBekNBO0FBMENkLGlCQUFTLFlBMUNLO0FBMkNkLGlCQUFTLFlBM0NLO0FBNENkLGlCQUFTLFlBNUNLO0FBNkNkLGlCQUFTLFlBN0NLO0FBOENkLGlCQUFTLFlBOUNLO0FBK0NkLGlCQUFTLFlBL0NLO0FBZ0RkLGlCQUFTLFlBaERLO0FBaURkLGlCQUFTLFlBakRLO0FBa0RkLGlCQUFTLFVBbERLO0FBbURkLGlCQUFTLFVBbkRLO0FBb0RkLHNCQUFjLFlBcERBO0FBcURkLGlCQUFTLFlBckRLO0FBc0RkLGlCQUFTLFVBdERLO0FBdURkLGlCQUFTLFVBdkRLO0FBd0RkLGlCQUFTLFlBeERLO0FBeURkLGlCQUFTLFVBekRLO0FBMERkLGlCQUFTLFVBMURLO0FBMkRkLGlCQUFTLFlBM0RLO0FBNERkLGlCQUFTLFlBNURLO0FBNkRkLGlCQUFTLFVBN0RLO0FBOERkLGlCQUFTLFVBOURLO0FBK0RkLGtCQUFVLFlBL0RJO0FBZ0VkLGtCQUFVLFlBaEVJO0FBaUVkLGlCQUFTLFVBakVLO0FBa0VkLGlCQUFTLFlBbEVLO0FBbUVkLGlCQUFTLFVBbkVLO0FBb0VkLGlCQUFTLFlBcEVLO0FBcUVkLGlCQUFTLFlBckVLO0FBc0VkLGlCQUFTLFlBdEVLO0FBdUVkLGlCQUFTLFdBdkVLO0FBd0VkLGlCQUFTLFlBeEVLO0FBeUVkLGlCQUFTLFdBekVLO0FBMEVkLGlCQUFTLFlBMUVLO0FBMkVkLGlCQUFTLFlBM0VLO0FBNEVkLHNCQUFjLFVBNUVBO0FBNkVkLGlCQUFTLFVBN0VLO0FBOEVkLHNCQUFjLFlBOUVBO0FBK0VkLGlCQUFTLFlBL0VLO0FBZ0ZkLHNCQUFjLFlBaEZBO0FBaUZkLGlCQUFTLFlBakZLO0FBa0ZkLGlCQUFTLFVBbEZLO0FBbUZkLGlCQUFTLFlBbkZLO0FBb0ZkLGlCQUFTLFdBcEZLO0FBcUZkLGlCQUFTLFlBckZLO0FBc0ZkLGlCQUFTLFlBdEZLO0FBdUZkLHNCQUFjLFVBdkZBO0FBd0ZkLGlCQUFTLFlBeEZLO0FBeUZkLGlCQUFTLFVBekZLO0FBMEZkLGlCQUFTLFlBMUZLO0FBMkZkLGlCQUFTLFlBM0ZLO0FBNEZkLGlCQUFTLFlBNUZLO0FBNkZkLGlCQUFTLFlBN0ZLO0FBOEZkLGlCQUFTLFlBOUZLO0FBK0ZkLGlCQUFTLFVBL0ZLO0FBZ0dkLGlCQUFTLFlBaEdLO0FBaUdkLGlCQUFTLFdBakdLO0FBa0dkLGlCQUFTLFlBbEdLO0FBbUdkLGlCQUFTLFlBbkdLO0FBb0dkLGlCQUFTLFlBcEdLO0FBcUdkLGlCQUFTLFlBckdLO0FBc0dkLGlCQUFTLFlBdEdLO0FBdUdkLGlCQUFTLFlBdkdLO0FBd0dkLGlCQUFTLFlBeEdLO0FBeUdkLGlCQUFTLFlBekdLO0FBMEdkLGlCQUFTLFlBMUdLO0FBMkdkLGlCQUFTLFlBM0dLO0FBNEdkLGlCQUFTLFlBNUdLO0FBNkdkLGlCQUFTLFlBN0dLO0FBOEdkLGlCQUFTLFlBOUdLO0FBK0dkLGtCQUFVLFlBL0dJO0FBZ0hkLGlCQUFTLFlBaEhLO0FBaUhkLGlCQUFTLFlBakhLO0FBa0hkLGlCQUFTLFlBbEhLO0FBbUhkLGlCQUFTLFlBbkhLO0FBb0hkLGlCQUFTLFlBcEhLO0FBcUhkLGlCQUFTLFlBckhLO0FBc0hkLGlCQUFTLFlBdEhLO0FBdUhkLGlCQUFTLFlBdkhLO0FBd0hkLGlCQUFTLFVBeEhLO0FBeUhkLGlCQUFTLFlBekhLO0FBMEhkLGlCQUFTLFlBMUhLO0FBMkhkLGlCQUFTLFVBM0hLO0FBNEhkLGlCQUFTLFlBNUhLO0FBNkhkLGlCQUFTLFlBN0hLO0FBOEhkLGlCQUFTLFlBOUhLO0FBK0hkLGlCQUFTLFlBL0hLO0FBZ0lkLGlCQUFTLFlBaElLO0FBaUlkLGlCQUFTLFlBaklLO0FBa0lkLGlCQUFTLFlBbElLO0FBbUlkLGlCQUFTLFlBbklLO0FBb0lkLGlCQUFTLFlBcElLO0FBcUlkLGlCQUFTLFlBcklLO0FBc0lkLGlCQUFTLFlBdElLO0FBdUlkLGlCQUFTLFVBdklLO0FBd0lkLHVCQUFlLFlBeElEO0FBeUlkLHNCQUFjLFdBeklBO0FBMElkLGtCQUFVLFlBMUlJO0FBMklkLHNCQUFjLFVBM0lBO0FBNElkLGlCQUFTLFlBNUlLO0FBNklkLGlCQUFTLFVBN0lLO0FBOElkLGtCQUFVLFVBOUlJO0FBK0lkLGlCQUFTLFVBL0lLO0FBZ0pkLGlCQUFTLFlBaEpLO0FBaUpkLGlCQUFTLFVBakpLO0FBa0pkLGtCQUFVLFlBbEpJO0FBbUpkLGtCQUFVLFlBbkpJO0FBb0pkLGtCQUFVLFlBcEpJO0FBcUpkLGlCQUFTLFlBckpLO0FBc0pkLGlCQUFTLFlBdEpLO0FBdUpkLGlCQUFTLFlBdkpLO0FBd0pkLGlCQUFTLFlBeEpLO0FBeUpkLGlCQUFTLFlBekpLO0FBMEpkLGlCQUFTLFlBMUpLO0FBMkpkLGtCQUFVLFVBM0pJO0FBNEpkLGtCQUFVLFVBNUpJO0FBNkpkLGtCQUFVLFlBN0pJO0FBOEpkLGlCQUFTLFVBOUpLO0FBK0pkLGtCQUFVLFlBL0pJO0FBZ0tkLGlCQUFTLFVBaEtLO0FBaUtkLGlCQUFTLFlBaktLO0FBa0tkLGlCQUFTLFlBbEtLO0FBbUtkLGlCQUFTLFVBbktLO0FBb0tkLGtCQUFVLFlBcEtJO0FBcUtkLGtCQUFVLFlBcktJO0FBc0tkLGlCQUFTLFVBdEtLO0FBdUtkLHNCQUFjLFVBdktBO0FBd0tkLGtCQUFVLFVBeEtJO0FBeUtkLGlCQUFTLFVBektLO0FBMEtkLGlCQUFTLFVBMUtLO0FBMktkLGlCQUFTLFVBM0tLO0FBNEtkLGlCQUFTLFlBNUtLO0FBNktkLHNCQUFjLFVBN0tBO0FBOEtkLHNCQUFjLFVBOUtBO0FBK0tkLGlCQUFTLFlBL0tLO0FBZ0xkLHNCQUFjLFVBaExBO0FBaUxkLGlCQUFTLFlBakxLO0FBa0xkLGlCQUFTLFlBbExLO0FBbUxkLGlCQUFTLFlBbkxLO0FBb0xkLGlCQUFTLFVBcExLO0FBcUxkLGtCQUFVLFVBckxJO0FBc0xkLGlCQUFTLFlBdExLO0FBdUxkLGlCQUFTLFVBdkxLO0FBd0xkLGlCQUFTLFlBeExLO0FBeUxkLGlCQUFTLFVBekxLO0FBMExkLGlCQUFTLFVBMUxLO0FB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M0JQO0FBdTNCZCx1QkFBcUIsNkJBdjNCUDtBQXczQmQsdUJBQXFCLDZCQXgzQlA7QUF5M0JkLHVCQUFxQiw2QkF6M0JQO0FBMDNCZCx1QkFBcUIsNkJBMTNCUDtBQTIzQmQsdUJBQXFCLDZCQTMzQlA7QUE0M0JkLHVCQUFxQiw2QkE1M0JQO0FBNjNCZCx1QkFBcUIsNkJBNzNCUDtBQTgzQmQsdUJBQXFCLDZCQTkzQlA7QUErM0JkLGNBQVk7QUEvM0JFLENBQWhCOztBQWs0QkEsT0FBTyxPQUFQLEdBQWlCLE9BQWpCIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIi8qKlxuICogQGZpbGUgQ29uZmlndXJhdGlvbiBmb3IgUmVkaXJlY3R2aWV3cyBhcHBsaWNhdGlvblxuICogQGF1dGhvciBNdXNpa0FuaW1hbFxuICogQGNvcHlyaWdodCAyMDE2IE11c2lrQW5pbWFsXG4gKi9cblxuLyoqXG4gKiBDb25maWd1cmF0aW9uIGZvciBSZWRpcmVjdHZpZXdzIGFwcGxpY2F0aW9uLlxuICogVGhpcyBpbmNsdWRlcyBzZWxlY3RvcnMsIGRlZmF1bHRzLCBhbmQgb3RoZXIgY29uc3RhbnRzIHNwZWNpZmljIHRvIFJlZGlyZWN0dmlld3NcbiAqIEB0eXBlIHtPYmplY3R9XG4gKi9cbmNvbnN0IGNvbmZpZyA9IHtcbiAgYWdlbnRTZWxlY3RvcjogJyNhZ2VudF9zZWxlY3QnLFxuICBjaGFydDogJy5hcXMtY2hhcnQnLFxuICBkYXRlTGltaXQ6IDkwLCAvLyBudW0gZGF5c1xuICBkYXRlUmFuZ2VTZWxlY3RvcjogJyNyYW5nZV9pbnB1dCcsXG4gIGRlZmF1bHRzOiB7XG4gICAgZGF0ZVJhbmdlOiAnbGF0ZXN0LTIwJyxcbiAgICBzb3J0OiAndmlld3MnLFxuICAgIGRpcmVjdGlvbjogMSxcbiAgICBvdXRwdXREYXRhOiBbXSxcbiAgICBoYWRGYWlsdXJlOiBmYWxzZSxcbiAgICB0b3RhbDogMCxcbiAgICB2aWV3OiAnbGlzdCdcbiAgfSxcbiAgbGluZWFyTGVnZW5kOiAoZGF0YXNldHMsIHNjb3BlKSA9PiB7XG4gICAgcmV0dXJuIGA8c3Ryb25nPiR7JC5pMThuKCd0b3RhbHMnKX06PC9zdHJvbmc+XG4gICAgICAkeyQuaTE4bignbnVtLXJlZGlyZWN0cycsIHNjb3BlLm91dHB1dERhdGEubGlzdERhdGEubGVuZ3RoIC0gMSl9XG4gICAgICAmYnVsbGV0O1xuICAgICAgJHskLmkxOG4oJ251bS1wYWdldmlld3MnLCBzY29wZS5mb3JtYXROdW1iZXIoc2NvcGUub3V0cHV0RGF0YS5zdW0pKX1cbiAgICAgICgke3Njb3BlLmZvcm1hdE51bWJlcihNYXRoLnJvdW5kKHNjb3BlLm91dHB1dERhdGEuYXZlcmFnZSkpfS8keyQuaTE4bignZGF5Jyl9KWA7XG4gIH0sXG4gIGxvZ2FyaXRobWljQ2hlY2tib3g6ICcubG9nYXJpdGhtaWMtc2NhbGUtb3B0aW9uJyxcbiAgcGxhdGZvcm1TZWxlY3RvcjogJyNwbGF0Zm9ybV9zZWxlY3QnLFxuICBwcm9qZWN0SW5wdXQ6ICcjcHJvamVjdF9pbnB1dCcsXG4gIGZvcm1TdGF0ZXM6IFsnaW5pdGlhbCcsICdwcm9jZXNzaW5nJywgJ2NvbXBsZXRlJywgJ2ludmFsaWQnXSxcbiAgc291cmNlSW5wdXQ6ICcjc291cmNlX2lucHV0JyxcbiAgdGltZXN0YW1wRm9ybWF0OiAnWVlZWU1NREQwMCcsXG4gIHZhbGlkYXRlUGFyYW1zOiBbJ3Byb2plY3QnLCAncGxhdGZvcm0nLCAnYWdlbnQnLCAnZGlyZWN0aW9uJywgJ3NvcnQnLCAndmlldyddLFxuICB2YWxpZFBhcmFtczoge1xuICAgIGRpcmVjdGlvbjogWyctMScsICcxJ10sXG4gICAgc29ydDogWyd0aXRsZScsICd2aWV3cycsICdzZWN0aW9uJ10sXG4gICAgdmlldzogWydsaXN0JywgJ2NoYXJ0J11cbiAgfVxufTtcblxubW9kdWxlLmV4cG9ydHMgPSBjb25maWc7XG4iLCIvKipcbiAqIFJlZGlyZWN0dmlld3MgQW5hbHlzaXMgdG9vbFxuICogQGZpbGUgTWFpbiBmaWxlIGZvciBSZWRpcmVjdHZpZXdzIGFwcGxpY2F0aW9uXG4gKiBAYXV0aG9yIE11c2lrQW5pbWFsXG4gKiBAY29weXJpZ2h0IDIwMTYgTXVzaWtBbmltYWxcbiAqIEBsaWNlbnNlIE1JVCBMaWNlbnNlOiBodHRwczovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL01JVFxuICogQHJlcXVpcmVzIFB2XG4gKiBAcmVxdWlyZXMgQ2hhcnRIZWxwZXJzXG4gKiBAcmVxdWlyZXMgTGlzdEhlbHBlcnNcbiAqL1xuXG5jb25zdCBjb25maWcgPSByZXF1aXJlKCcuL2NvbmZpZycpO1xuY29uc3Qgc2l0ZU1hcCA9IHJlcXVpcmUoJy4uL3NoYXJlZC9zaXRlX21hcCcpO1xuY29uc3Qgc2l0ZURvbWFpbnMgPSBPYmplY3Qua2V5cyhzaXRlTWFwKS5tYXAoa2V5ID0+IHNpdGVNYXBba2V5XSk7XG5jb25zdCBQdiA9IHJlcXVpcmUoJy4uL3NoYXJlZC9wdicpO1xuY29uc3QgQ2hhcnRIZWxwZXJzID0gcmVxdWlyZSgnLi4vc2hhcmVkL2NoYXJ0X2hlbHBlcnMnKTtcbmNvbnN0IExpc3RIZWxwZXJzID0gcmVxdWlyZSgnLi4vc2hhcmVkL2xpc3RfaGVscGVycycpO1xuXG4vKiogTWFpbiBSZWRpcmVjdFZpZXdzIGNsYXNzICovXG5jbGFzcyBSZWRpcmVjdFZpZXdzIGV4dGVuZHMgbWl4KFB2KS53aXRoKENoYXJ0SGVscGVycywgTGlzdEhlbHBlcnMpIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgc3VwZXIoY29uZmlnKTtcbiAgICB0aGlzLmFwcCA9ICdyZWRpcmVjdHZpZXdzJztcbiAgfVxuXG4gIC8qKlxuICAgKiBJbml0aWFsaXplIHRoZSBhcHBsaWNhdGlvbi5cbiAgICogQ2FsbGVkIGluIGBwdi5qc2AgYWZ0ZXIgdHJhbnNsYXRpb25zIGhhdmUgbG9hZGVkXG4gICAqIEByZXR1cm4ge251bGx9IE5vdGhpbmdcbiAgICovXG4gIGluaXRpYWxpemUoKSB7XG4gICAgdGhpcy5hc3NpZ25EZWZhdWx0cygpO1xuICAgIHRoaXMuc2V0dXBEYXRlUmFuZ2VTZWxlY3RvcigpO1xuICAgIHRoaXMucG9wUGFyYW1zKCk7XG4gICAgdGhpcy5zZXR1cExpc3RlbmVycygpO1xuICAgIHRoaXMudXBkYXRlSW50ZXJBcHBMaW5rcygpO1xuXG4gICAgLyoqIG9ubHkgc2hvdyBvcHRpb25zIGZvciBsaW5lLCBiYXIgYW5kIHJhZGFyIGNoYXJ0cyAqL1xuICAgICQoJy5tdWx0aS1wYWdlLWNoYXJ0LW5vZGUnKS5oaWRlKCk7XG4gIH1cblxuICAvKipcbiAgICogQWRkIGdlbmVyYWwgZXZlbnQgbGlzdGVuZXJzXG4gICAqIEBvdmVycmlkZVxuICAgKiBAcmV0dXJucyB7bnVsbH0gbm90aGluZ1xuICAgKi9cbiAgc2V0dXBMaXN0ZW5lcnMoKSB7XG4gICAgc3VwZXIuc2V0dXBMaXN0ZW5lcnMoKTtcblxuICAgICQoJyNwdl9mb3JtJykub24oJ3N1Ym1pdCcsIGUgPT4ge1xuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpOyAvLyBwcmV2ZW50IHBhZ2UgZnJvbSByZWxvYWRpbmdcbiAgICAgIHRoaXMucHJvY2Vzc0lucHV0KCk7XG4gICAgfSk7XG5cbiAgICAkKCcuYW5vdGhlci1xdWVyeScpLm9uKCdjbGljaycsICgpID0+IHtcbiAgICAgIHRoaXMuc2V0U3RhdGUoJ2luaXRpYWwnKTtcbiAgICAgIHRoaXMucHVzaFBhcmFtcyh0cnVlKTtcbiAgICB9KTtcblxuICAgICQoJy5zb3J0LWxpbmsnKS5vbignY2xpY2snLCBlID0+IHtcbiAgICAgIGNvbnN0IHNvcnRUeXBlID0gJChlLmN1cnJlbnRUYXJnZXQpLmRhdGEoJ3R5cGUnKTtcbiAgICAgIHRoaXMuZGlyZWN0aW9uID0gdGhpcy5zb3J0ID09PSBzb3J0VHlwZSA/IC10aGlzLmRpcmVjdGlvbiA6IDE7XG4gICAgICB0aGlzLnNvcnQgPSBzb3J0VHlwZTtcbiAgICAgIHRoaXMucmVuZGVyRGF0YSgpO1xuICAgIH0pO1xuXG4gICAgJCgnLnZpZXctYnRuJykub24oJ2NsaWNrJywgZSA9PiB7XG4gICAgICBkb2N1bWVudC5hY3RpdmVFbGVtZW50LmJsdXIoKTtcbiAgICAgIHRoaXMudmlldyA9IGUuY3VycmVudFRhcmdldC5kYXRhc2V0LnZhbHVlO1xuICAgICAgdGhpcy50b2dnbGVWaWV3KHRoaXMudmlldyk7XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogQ29weSBuZWNlc3NhcnkgZGVmYXVsdCB2YWx1ZXMgdG8gY2xhc3MgaW5zdGFuY2UuXG4gICAqIENhbGxlZCB3aGVuIHRoZSB2aWV3IGlzIHJlc2V0LlxuICAgKiBAcmV0dXJuIHtudWxsfSBOb3RoaW5nXG4gICAqL1xuICBhc3NpZ25EZWZhdWx0cygpIHtcbiAgICBbJ3NvcnQnLCAnZGlyZWN0aW9uJywgJ291dHB1dERhdGEnLCAnaGFkRmFpbHVyZScsICd0b3RhbCcsICd2aWV3J10uZm9yRWFjaChkZWZhdWx0S2V5ID0+IHtcbiAgICAgIHRoaXNbZGVmYXVsdEtleV0gPSB0aGlzLmNvbmZpZy5kZWZhdWx0c1tkZWZhdWx0S2V5XTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBCdWlsZCBvdXIgbW90aGVyIGRhdGEgc2V0LCBmcm9tIHdoaWNoIHdlIGNhbiBkcmF3IGEgY2hhcnQsXG4gICAqICAgcmVuZGVyIGEgbGlzdCBvZiBkYXRhLCB3aGF0ZXZlciBvdXIgaGVhcnQgZGVzaXJlcyA6KVxuICAgKiBAcGFyYW0gIHtzdHJpbmd9IGxhYmVsIC0gbGFiZWwgZm9yIHRoZSBkYXRhc2V0XG4gICAqIEBwYXJhbSAge3N0cmluZ30gbGluayAtIEhUTUwgYW5jaG9yIHRhZyBmb3IgdGhlIGxhYmVsXG4gICAqIEBwYXJhbSAge2FycmF5fSBkYXRhc2V0cyAtIGFycmF5IG9mIGRhdGFzZXRzIGZvciBlYWNoIGFydGljbGUsIGFzIHJldHVybmVkIGJ5IHRoZSBQYWdldmlld3MgQVBJXG4gICAqIEByZXR1cm4ge29iamVjdH0gbW90aGVyIGRhdGEgc2V0LCBhbHNvIHN0b3JlZCBpbiB0aGlzLm91dHB1dERhdGFcbiAgICovXG4gIGJ1aWxkTW90aGVyRGF0YXNldChsYWJlbCwgbGluaywgZGF0YXNldHMpIHtcbiAgICAvKipcbiAgICAgKiBgZGF0YXNldHNgIHN0cnVjdHVyZTpcbiAgICAgKlxuICAgICAqIFt7XG4gICAgICogICB0aXRsZTogcGFnZSxcbiAgICAgKiAgIGl0ZW1zOiBbXG4gICAgICogICAgIHtcbiAgICAgKiAgICAgICBhY2Nlc3M6ICcnLFxuICAgICAqICAgICAgIGFnZW50OiAnJyxcbiAgICAgKiAgICAgICBhcnRpY2xlOiAnJyxcbiAgICAgKiAgICAgICBncmFudWxhcml0eTogJycsXG4gICAgICogICAgICAgcHJvamVjdDogJycsXG4gICAgICogICAgICAgdGltZXN0YW1wOiAnJyxcbiAgICAgKiAgICAgICB2aWV3czogMTBcbiAgICAgKiAgICAgfVxuICAgICAqICAgXVxuICAgICAqIH1dXG4gICAgICpcbiAgICAgKiBvdXRwdXQgc3RydWN0dXJlOlxuICAgICAqXG4gICAgICoge1xuICAgICAqICAgbGFiZWxzOiBbJyddLFxuICAgICAqICAgbGlzdERhdGE6IFtcbiAgICAgKiAgICAge1xuICAgICAqICAgICAgIGxhYmVsOiAnJyxcbiAgICAgKiAgICAgICBkYXRhOiBbMSwyLDMsNF0sXG4gICAgICogICAgICAgc3VtOiAxMCxcbiAgICAgKiAgICAgICBhdmVyYWdlOiAyLFxuICAgICAqICAgICAgIGluZGV4OiAwXG4gICAgICogICAgICAgLi4uXG4gICAgICogICAgICAgTUVSR0UgaW4gdGhpcy5jb25maWcuY2hhcnRDb25maWdbdGhpcy5jaGFydFR5cGVdLmRhdGFzZXQodGhpcy5jb25maWcuY29sb3JzWzBdKVxuICAgICAqICAgICB9XG4gICAgICogICBdLFxuICAgICAqICAgdG90YWxWaWV3c1NldDogWzEsMiwzLDRdLFxuICAgICAqICAgc3VtOiAxMCxcbiAgICAgKiAgIGF2ZXJhZ2U6IDIsXG4gICAgICogICBkYXRlc1dpdGhvdXREYXRhOiBbJzIwMTYtMDUtMTZUMDA6MDA6MDAtMDA6MDAnXVxuICAgICAqIH1cbiAgICAgKi9cblxuICAgIHRoaXMub3V0cHV0RGF0YSA9IHtcbiAgICAgIGxhYmVsczogdGhpcy5nZXREYXRlSGVhZGluZ3ModHJ1ZSksIC8vIGxhYmVscyBuZWVkZWQgZm9yIENoYXJ0cy5qcywgZXZlbiB0aG91Z2ggd2UnbGwgb25seSBoYXZlIG9uZSBkYXRhc2V0XG4gICAgICBsaW5rLFxuICAgICAgbGlzdERhdGE6IFtdLFxuICAgICAgc291cmNlOiBsYWJlbFxuICAgIH07XG4gICAgY29uc3Qgc3RhcnREYXRlID0gbW9tZW50KHRoaXMuZGF0ZXJhbmdlcGlja2VyLnN0YXJ0RGF0ZSksXG4gICAgICBlbmREYXRlID0gbW9tZW50KHRoaXMuZGF0ZXJhbmdlcGlja2VyLmVuZERhdGUpLFxuICAgICAgbGVuZ3RoID0gdGhpcy5udW1EYXlzSW5SYW5nZSgpO1xuXG4gICAgbGV0IHRvdGFsVmlld3NTZXQgPSBuZXcgQXJyYXkobGVuZ3RoKS5maWxsKDApLFxuICAgICAgZGF0ZXNXaXRob3V0RGF0YSA9IFtdLFxuICAgICAgdG90YWxUaXRsZXMgPSBbXSxcbiAgICAgIHNlY3Rpb25Db3VudCA9IDA7XG5cbiAgICBkYXRhc2V0cy5mb3JFYWNoKChkYXRhc2V0LCBpbmRleCkgPT4ge1xuICAgICAgY29uc3QgZGF0YSA9IGRhdGFzZXQuaXRlbXMubWFwKGl0ZW0gPT4gaXRlbS52aWV3cyksXG4gICAgICAgIHN1bSA9IGRhdGEucmVkdWNlKChhLCBiKSA9PiBhICsgYik7XG5cbiAgICAgIHRvdGFsVGl0bGVzLnB1c2goZGF0YXNldC50aXRsZSk7XG4gICAgICBpZiAoZGF0YXNldC5zZWN0aW9uKSBzZWN0aW9uQ291bnQrKztcblxuICAgICAgdGhpcy5vdXRwdXREYXRhLmxpc3REYXRhLnB1c2goe1xuICAgICAgICBkYXRhLFxuICAgICAgICBsYWJlbDogZGF0YXNldC50aXRsZSxcbiAgICAgICAgc2VjdGlvbjogZGF0YXNldC5zZWN0aW9uIHx8ICcnLFxuICAgICAgICB1cmw6IGBodHRwczovLyR7dGhpcy5wcm9qZWN0fS5vcmcvd2lraS8ke2RhdGFzZXQudGl0bGUuc2NvcmUoKX1gLFxuICAgICAgICBzdW0sXG4gICAgICAgIGF2ZXJhZ2U6IHN1bSAvIGxlbmd0aCxcbiAgICAgICAgaW5kZXhcbiAgICAgIH0pO1xuXG4gICAgICAvKipcbiAgICAgICAqIEVuc3VyZSB3ZSBoYXZlIGRhdGEgZm9yIGVhY2ggZGF5LCB1c2luZyBudWxsIGFzIHRoZSB2aWV3IGNvdW50IHdoZW4gZGF0YSBpcyBhY3R1YWxseSBub3QgYXZhaWxhYmxlIHlldFxuICAgICAgICogU2VlIGZpbGxJblplcm9zKCkgY29tbWVudHMgZm9yIG1vcmUgaW5mby5cbiAgICAgICAqL1xuICAgICAgY29uc3QgW3ZpZXdzU2V0LCBpbmNvbXBsZXRlRGF0ZXNdID0gdGhpcy5maWxsSW5aZXJvcyhkYXRhc2V0Lml0ZW1zLCBzdGFydERhdGUsIGVuZERhdGUpO1xuICAgICAgaW5jb21wbGV0ZURhdGVzLmZvckVhY2goZGF0ZSA9PiB7XG4gICAgICAgIGlmICghZGF0ZXNXaXRob3V0RGF0YS5pbmNsdWRlcyhkYXRlKSkgZGF0ZXNXaXRob3V0RGF0YS5wdXNoKGRhdGUpO1xuICAgICAgfSk7XG5cbiAgICAgIHRvdGFsVmlld3NTZXQgPSB0b3RhbFZpZXdzU2V0Lm1hcCgobnVtLCBpKSA9PiBudW0gKyB2aWV3c1NldFtpXS52aWV3cyk7XG4gICAgfSk7XG5cbiAgICBjb25zdCBncmFuZFN1bSA9IHRvdGFsVmlld3NTZXQucmVkdWNlKChhLCBiKSA9PiAoYSB8fCAwKSArIChiIHx8IDApKTtcblxuICAgIE9iamVjdC5hc3NpZ24odGhpcy5vdXRwdXREYXRhLCB7XG4gICAgICBkYXRhc2V0czogW3tcbiAgICAgICAgbGFiZWwsXG4gICAgICAgIGRhdGE6IHRvdGFsVmlld3NTZXQsXG4gICAgICAgIHN1bTogZ3JhbmRTdW0sXG4gICAgICAgIGF2ZXJhZ2U6IGdyYW5kU3VtIC8gbGVuZ3RoXG4gICAgICB9XSxcbiAgICAgIGRhdGVzV2l0aG91dERhdGEsXG4gICAgICBzdW06IGdyYW5kU3VtLCAvLyBuZXZlcm1pbmQgdGhlIGR1cGxpY2F0aW9uXG4gICAgICBhdmVyYWdlOiBncmFuZFN1bSAvIGxlbmd0aCxcbiAgICAgIHRpdGxlczogdG90YWxUaXRsZXMsXG4gICAgICBzZWN0aW9uQ291bnRcbiAgICB9KTtcblxuICAgIGlmIChkYXRlc1dpdGhvdXREYXRhLmxlbmd0aCkge1xuICAgICAgY29uc3QgZGF0ZUxpc3QgPSBkYXRlc1dpdGhvdXREYXRhLm1hcChkYXRlID0+IG1vbWVudChkYXRlKS5mb3JtYXQodGhpcy5kYXRlRm9ybWF0KSk7XG4gICAgICB0aGlzLndyaXRlTWVzc2FnZSgkLmkxOG4oJ2FwaS1pbmNvbXBsZXRlLWRhdGEnLCBkYXRlTGlzdC5zb3J0KCkuam9pbignICZtaWRkb3Q7ICcpLCBkYXRlTGlzdC5sZW5ndGgpKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBJZiB0aGVyZSB3ZXJlIG5vIGZhaWx1cmVzLCBjYWNoZSB0aGUgcmVzdWx0IGFzIHNvbWUgZGF0YXNldHMgY2FuIGJlIHZlcnkgbGFyZ2UuXG4gICAgICogVGhlcmUgaXMgc2VydmVyIGNhY2hlIGJ1dCB0aGVyZSBpcyBhbHNvIHByb2Nlc3NpbmcgdGltZSB0aGF0IGxvY2FsIGNhY2hpbmcgY2FuIGVsaW1pbmF0ZVxuICAgICAqL1xuICAgIGlmICghdGhpcy5oYWRGYWlsdXJlKSB7XG4gICAgICAvLyAxMCBtaW51dGVzLCBUVEwgaXMgbWlsbGlzZWNvbmRzXG4gICAgICBzaW1wbGVTdG9yYWdlLnNldCh0aGlzLmdldENhY2hlS2V5KCksIHRoaXMub3V0cHV0RGF0YSwge1RUTDogNjAwMDAwfSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMub3V0cHV0RGF0YTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgdGhlIGJhc2UgcHJvamVjdCBuYW1lICh3aXRob3V0IGxhbmd1YWdlIGFuZCB0aGUgLm9yZylcbiAgICogQHJldHVybnMge2Jvb2xlYW59IHByb2plY3RuYW1lXG4gICAqL1xuICBnZXQgYmFzZVByb2plY3QoKSB7XG4gICAgcmV0dXJuIHRoaXMucHJvamVjdC5zcGxpdCgnLicpWzFdO1xuICB9XG5cbiAgLyoqXG4gICAqIEByZXR1cm5zIHtUeXBlYWhlYWR9IGluc3RhbmNlXG4gICAqL1xuICBnZXQgdHlwZWFoZWFkKCkge1xuICAgIHJldHVybiAkKHRoaXMuY29uZmlnLnNvdXJjZUlucHV0KS5kYXRhKCd0eXBlYWhlYWQnKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgaW5mb3JtYXRpdmUgZmlsZW5hbWUgd2l0aG91dCBleHRlbnNpb24gdG8gYmUgdXNlZCBmb3IgZXhwb3J0IG9wdGlvbnNcbiAgICogQG92ZXJyaWRlXG4gICAqIEByZXR1cm4ge3N0cmluZ30gZmlsZW5hbWUgd2l0aG91dCBhbiBleHRlbnNpb25cbiAgICovXG4gIGdldEV4cG9ydEZpbGVuYW1lKCkge1xuICAgIGNvbnN0IHBhcmFtcyA9IHRoaXMuZ2V0UGFyYW1zKHRydWUpO1xuICAgIHJldHVybiBgJHt0aGlzLm91dHB1dERhdGEuc291cmNlfS0ke3BhcmFtcy5zdGFydC5yZXBsYWNlKC8tL2csICcnKX0tJHtwYXJhbXMuZW5kLnJlcGxhY2UoLy0vZywgJycpfWA7XG4gIH1cblxuICAvKipcbiAgICogR2V0IGFsbCB1c2VyLWlucHV0dGVkIHBhcmFtZXRlcnNcbiAgICogQHBhcmFtIHtib29sZWFufSBbZm9yQ2FjaGVLZXldIHdoZXRoZXIgb3Igbm90IHRvIGluY2x1ZGUgdGhlIHBhZ2UgbmFtZSwgYW5kIGV4Y2x1ZGUgc29ydCBhbmQgZGlyZWN0aW9uXG4gICAqICAgaW4gdGhlIHJldHVybmVkIG9iamVjdC4gVGhpcyBpcyBmb3IgdGhlIHB1cnBvc2VzIG9mIGdlbmVyYXRpbmcgYSB1bmlxdWUgY2FjaGUga2V5IGZvciBwYXJhbXMgYWZmZWN0aW5nIHRoZSBBUEkgcXVlcmllc1xuICAgKiBAcmV0dXJuIHtPYmplY3R9IHByb2plY3QsIHBsYXRmb3JtLCBhZ2VudCwgZXRjLlxuICAgKi9cbiAgZ2V0UGFyYW1zKGZvckNhY2hlS2V5ID0gZmFsc2UpIHtcbiAgICBsZXQgcGFyYW1zID0ge1xuICAgICAgcHJvamVjdDogJCh0aGlzLmNvbmZpZy5wcm9qZWN0SW5wdXQpLnZhbCgpLFxuICAgICAgcGxhdGZvcm06ICQodGhpcy5jb25maWcucGxhdGZvcm1TZWxlY3RvcikudmFsKCksXG4gICAgICBhZ2VudDogJCh0aGlzLmNvbmZpZy5hZ2VudFNlbGVjdG9yKS52YWwoKVxuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBPdmVycmlkZSBzdGFydCBhbmQgZW5kIHdpdGggY3VzdG9tIHJhbmdlIHZhbHVlcywgaWYgY29uZmlndXJlZCAoc2V0IGJ5IFVSTCBwYXJhbXMgb3Igc2V0dXBEYXRlUmFuZ2VTZWxlY3RvcilcbiAgICAgKiBWYWxpZCB2YWx1ZXMgYXJlIHRob3NlIGRlZmluZWQgaW4gdGhpcy5jb25maWcuc3BlY2lhbFJhbmdlcywgY29uc3RydWN0ZWQgbGlrZSBge3JhbmdlOiAnbGFzdC1tb250aCd9YCxcbiAgICAgKiAgIG9yIGEgcmVsYXRpdmUgcmFuZ2UgbGlrZSBge3JhbmdlOiAnbGF0ZXN0LU4nfWAgd2hlcmUgTiBpcyB0aGUgbnVtYmVyIG9mIGRheXMuXG4gICAgICovXG4gICAgaWYgKHRoaXMuc3BlY2lhbFJhbmdlICYmICFmb3JDYWNoZUtleSkge1xuICAgICAgcGFyYW1zLnJhbmdlID0gdGhpcy5zcGVjaWFsUmFuZ2UucmFuZ2U7XG4gICAgfSBlbHNlIHtcbiAgICAgIHBhcmFtcy5zdGFydCA9IHRoaXMuZGF0ZXJhbmdlcGlja2VyLnN0YXJ0RGF0ZS5mb3JtYXQoJ1lZWVktTU0tREQnKTtcbiAgICAgIHBhcmFtcy5lbmQgPSB0aGlzLmRhdGVyYW5nZXBpY2tlci5lbmREYXRlLmZvcm1hdCgnWVlZWS1NTS1ERCcpO1xuICAgIH1cblxuICAgIC8qKiBvbmx5IGNlcnRhaW4gY2hhcmFjdGVycyB3aXRoaW4gdGhlIHBhZ2UgbmFtZSBhcmUgZXNjYXBlZCAqL1xuICAgIHBhcmFtcy5wYWdlID0gJCh0aGlzLmNvbmZpZy5zb3VyY2VJbnB1dCkudmFsKCkuc2NvcmUoKS5yZXBsYWNlKC9bJiVdL2csIGVzY2FwZSk7XG5cbiAgICBpZiAoIWZvckNhY2hlS2V5KSB7XG4gICAgICBwYXJhbXMuc29ydCA9IHRoaXMuc29ydDtcbiAgICAgIHBhcmFtcy5kaXJlY3Rpb24gPSB0aGlzLmRpcmVjdGlvbjtcbiAgICAgIHBhcmFtcy52aWV3ID0gdGhpcy52aWV3O1xuXG4gICAgICAvKiogYWRkIGF1dG9sb2cgcGFyYW0gb25seSBpZiBpdCB3YXMgcGFzc2VkIGluIG9yaWdpbmFsbHksIGFuZCBvbmx5IGlmIGl0IHdhcyBmYWxzZSAodHJ1ZSB3b3VsZCBiZSBkZWZhdWx0KSAqL1xuICAgICAgaWYgKHRoaXMubm9Mb2dTY2FsZSkgcGFyYW1zLmF1dG9sb2cgPSAnZmFsc2UnO1xuICAgIH1cblxuICAgIHJldHVybiBwYXJhbXM7XG4gIH1cblxuICAvKipcbiAgICogUHVzaCByZWxldmFudCBjbGFzcyBwcm9wZXJ0aWVzIHRvIHRoZSBxdWVyeSBzdHJpbmdcbiAgICogQHBhcmFtICB7Qm9vbGVhbn0gY2xlYXIgLSB3aGV0ZXIgdG8gY2xlYXIgdGhlIHF1ZXJ5IHN0cmluZyBlbnRpcmVseVxuICAgKiBAcmV0dXJuIHtudWxsfSBub3RoaW5nXG4gICAqL1xuICBwdXNoUGFyYW1zKGNsZWFyID0gZmFsc2UpIHtcbiAgICBpZiAoIXdpbmRvdy5oaXN0b3J5IHx8ICF3aW5kb3cuaGlzdG9yeS5yZXBsYWNlU3RhdGUpIHJldHVybjtcblxuICAgIGlmIChjbGVhcikge1xuICAgICAgcmV0dXJuIGhpc3RvcnkucmVwbGFjZVN0YXRlKG51bGwsIGRvY3VtZW50LnRpdGxlLCBsb2NhdGlvbi5ocmVmLnNwbGl0KCc/JylbMF0pO1xuICAgIH1cblxuICAgIHdpbmRvdy5oaXN0b3J5LnJlcGxhY2VTdGF0ZSh7fSwgZG9jdW1lbnQudGl0bGUsIGA/JHskLnBhcmFtKHRoaXMuZ2V0UGFyYW1zKCkpfWApO1xuXG4gICAgJCgnLnBlcm1hbGluaycpLnByb3AoJ2hyZWYnLCBgL3JlZGlyZWN0dmlld3M/JHskLnBhcmFtKHRoaXMuZ2V0UGVybWFMaW5rKCkpfWApO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlbmRlciBsaXN0IG9mIHJlZGlyZWN0dmlld3MgaW50byB2aWV3XG4gICAqIEByZXR1cm5zIHtudWxsfSBub3RoaW5nXG4gICAqL1xuICByZW5kZXJEYXRhKCkge1xuICAgIHN1cGVyLnJlbmRlckRhdGEoc29ydGVkRGF0YXNldHMgPT4ge1xuICAgICAgJCgnLm91dHB1dC10b3RhbHMnKS5odG1sKFxuICAgICAgICBgPHRoIHNjb3BlPSdyb3cnPiR7JC5pMThuKCd0b3RhbHMnKX08L3RoPlxuICAgICAgICAgPHRoPiR7JC5pMThuKCdudW0tcmVkaXJlY3RzJywgdGhpcy5vdXRwdXREYXRhLnRpdGxlcy5sZW5ndGggLSAxKX08L3RoPlxuICAgICAgICAgPHRoPiR7JC5pMThuKCdudW0tc2VjdGlvbnMnLCB0aGlzLm91dHB1dERhdGEuc2VjdGlvbkNvdW50KX08L3RoPlxuICAgICAgICAgPHRoPiR7dGhpcy5mb3JtYXROdW1iZXIodGhpcy5vdXRwdXREYXRhLnN1bSl9PC90aD5cbiAgICAgICAgIDx0aD4ke3RoaXMuZm9ybWF0TnVtYmVyKE1hdGgucm91bmQodGhpcy5vdXRwdXREYXRhLmF2ZXJhZ2UpKX0gLyAkeyQuaTE4bignZGF5Jyl9PC90aD5gXG4gICAgICApO1xuICAgICAgJCgnI291dHB1dF9saXN0JykuaHRtbCgnJyk7XG5cbiAgICAgIHNvcnRlZERhdGFzZXRzLmZvckVhY2goKGl0ZW0sIGluZGV4KSA9PiB7XG4gICAgICAgIGNvbnN0IGlzU291cmNlID0gaXRlbS5sYWJlbCA9PT0gdGhpcy5vdXRwdXREYXRhLnNvdXJjZTtcblxuICAgICAgICBsZXQgc2VjdGlvbk1hcmt1cCA9ICcnO1xuXG4gICAgICAgIGlmIChpdGVtLnNlY3Rpb24pIHtcbiAgICAgICAgICBjb25zdCBzZWN0aW9uVXJsID0gYCR7dGhpcy5nZXRQYWdlVVJMKHRoaXMub3V0cHV0RGF0YS5zb3VyY2UpfSMke2VuY29kZVVSSUNvbXBvbmVudChpdGVtLnNlY3Rpb24uc2NvcmUoKSl9YDtcbiAgICAgICAgICBzZWN0aW9uTWFya3VwID0gYDxhIGhyZWY9XCIke3NlY3Rpb25Vcmx9XCIgdGFyZ2V0PVwiX2JsYW5rXCI+IyR7aXRlbS5zZWN0aW9ufTwvYT5gO1xuICAgICAgICB9XG5cbiAgICAgICAgJCgnI291dHB1dF9saXN0JykuYXBwZW5kKFxuICAgICAgICAgIGA8dHI+XG4gICAgICAgICAgIDx0aCBzY29wZT0ncm93Jz4ke2luZGV4ICsgMX08L3RoPlxuICAgICAgICAgICA8dGQ+PGEgaHJlZj1cIiR7aXRlbS51cmx9XCIgdGFyZ2V0PVwiX2JsYW5rXCI+JHtpdGVtLmxhYmVsfTwvYT4gJHtpc1NvdXJjZSA/ICcoJyArICQuaTE4bigndGFyZ2V0JykgKyAnKScgOiAnJ308L3RkPlxuICAgICAgICAgICA8dGQ+JHtzZWN0aW9uTWFya3VwfTwvYT48L3RkPlxuICAgICAgICAgICA8dGQ+PGEgdGFyZ2V0PSdfYmxhbmsnIGhyZWY9JyR7dGhpcy5nZXRQYWdldmlld3NVUkwoYCR7dGhpcy5wcm9qZWN0fS5vcmdgLCBpdGVtLmxhYmVsKX0nPiR7dGhpcy5mb3JtYXROdW1iZXIoaXRlbS5zdW0pfTwvYT48L3RkPlxuICAgICAgICAgICA8dGQ+JHt0aGlzLmZvcm1hdE51bWJlcihNYXRoLnJvdW5kKGl0ZW0uYXZlcmFnZSkpfSAvICR7JC5pMThuKCdkYXknKX08L3RkPlxuICAgICAgICAgICA8L3RyPmBcbiAgICAgICAgKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCB2YWx1ZSBvZiBnaXZlbiBsYW5ndmlldyBlbnRyeSBmb3IgdGhlIHB1cnBvc2VzIG9mIGNvbHVtbiBzb3J0aW5nXG4gICAqIEBwYXJhbSAge29iamVjdH0gaXRlbSAtIGxhbmd2aWV3IGVudHJ5IHdpdGhpbiB0aGlzLm91dHB1dERhdGFcbiAgICogQHBhcmFtICB7U3RyaW5nfSB0eXBlIC0gdHlwZSBvZiBwcm9wZXJ0eSB0byBnZXRcbiAgICogQHJldHVybiB7U3RyaW5nfE51bWJlcn0gLSB2YWx1ZVxuICAgKi9cbiAgZ2V0U29ydFByb3BlcnR5KGl0ZW0sIHR5cGUpIHtcbiAgICBzd2l0Y2ggKHR5cGUpIHtcbiAgICBjYXNlICd0aXRsZSc6XG4gICAgICByZXR1cm4gaXRlbS5sYWJlbDtcbiAgICBjYXNlICdzZWN0aW9uJzpcbiAgICAgIHJldHVybiBpdGVtLnNlY3Rpb247XG4gICAgY2FzZSAndmlld3MnOlxuICAgICAgcmV0dXJuIE51bWJlcihpdGVtLnN1bSk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIExvb3AgdGhyb3VnaCBnaXZlbiBwYWdlcyBhbmQgcXVlcnkgdGhlIHBhZ2V2aWV3cyBBUEkgZm9yIGVhY2hcbiAgICogICBBbHNvIHVwZGF0ZXMgdGhpcy5vdXRwdXREYXRhIHdpdGggcmVzdWx0XG4gICAqIEBwYXJhbSAge0FycmF5fSByZWRpcmVjdERhdGEgLSBhcyBnaXZlbiBieSB0aGUgZ2V0UmVkaXJlY3RzIHByb21pc2VcbiAgICogQHJldHVybiB7RGVmZXJyZWR9IC0gUHJvbWlzZSByZXNvbHZpbmcgd2l0aCBkYXRhIHJlYWR5IHRvIGJlIHJlbmRlcmVkIHRvIHZpZXdcbiAgICovXG4gIGdldFBhZ2VWaWV3c0RhdGEocmVkaXJlY3REYXRhKSB7XG4gICAgY29uc3Qgc3RhcnREYXRlID0gdGhpcy5kYXRlcmFuZ2VwaWNrZXIuc3RhcnREYXRlLnN0YXJ0T2YoJ2RheScpLFxuICAgICAgZW5kRGF0ZSA9IHRoaXMuZGF0ZXJhbmdlcGlja2VyLmVuZERhdGUuc3RhcnRPZignZGF5Jyk7XG5cbiAgICBsZXQgZGZkID0gJC5EZWZlcnJlZCgpLCBwcm9taXNlcyA9IFtdLCBjb3VudCA9IDAsIGZhaWx1cmVSZXRyaWVzID0ge30sXG4gICAgICB0b3RhbFJlcXVlc3RDb3VudCA9IHJlZGlyZWN0RGF0YS5sZW5ndGgsIGZhaWxlZFBhZ2VzID0gW10sIHBhZ2VWaWV3c0RhdGEgPSBbXTtcblxuICAgIGNvbnN0IG1ha2VSZXF1ZXN0ID0gcGFnZSA9PiB7XG4gICAgICBjb25zdCB1cmlFbmNvZGVkUGFnZU5hbWUgPSBlbmNvZGVVUklDb21wb25lbnQocGFnZS50aXRsZSk7XG5cbiAgICAgIGNvbnN0IHVybCA9IChcbiAgICAgICAgYGh0dHBzOi8vd2lraW1lZGlhLm9yZy9hcGkvcmVzdF92MS9tZXRyaWNzL3BhZ2V2aWV3cy9wZXItYXJ0aWNsZS8ke3RoaXMucHJvamVjdH1gICtcbiAgICAgICAgYC8keyQodGhpcy5jb25maWcucGxhdGZvcm1TZWxlY3RvcikudmFsKCl9LyR7JCh0aGlzLmNvbmZpZy5hZ2VudFNlbGVjdG9yKS52YWwoKX0vJHt1cmlFbmNvZGVkUGFnZU5hbWV9L2RhaWx5YCArXG4gICAgICAgIGAvJHtzdGFydERhdGUuZm9ybWF0KHRoaXMuY29uZmlnLnRpbWVzdGFtcEZvcm1hdCl9LyR7ZW5kRGF0ZS5mb3JtYXQodGhpcy5jb25maWcudGltZXN0YW1wRm9ybWF0KX1gXG4gICAgICApO1xuICAgICAgY29uc3QgcHJvbWlzZSA9ICQuYWpheCh7IHVybCwgZGF0YVR5cGU6ICdqc29uJyB9KTtcbiAgICAgIHByb21pc2VzLnB1c2gocHJvbWlzZSk7XG5cbiAgICAgIHByb21pc2UuZG9uZShwdkRhdGEgPT4ge1xuICAgICAgICBwYWdlVmlld3NEYXRhLnB1c2goe1xuICAgICAgICAgIHRpdGxlOiBwYWdlLnRpdGxlLFxuICAgICAgICAgIHNlY3Rpb246IHBhZ2UuZnJhZ21lbnQsXG4gICAgICAgICAgaXRlbXM6IHB2RGF0YS5pdGVtc1xuICAgICAgICB9KTtcbiAgICAgIH0pLmZhaWwoZXJyb3JEYXRhID0+IHtcbiAgICAgICAgLyoqIGZpcnN0IGRldGVjdCBpZiB0aGlzIHdhcyBhIENhc3NhbmRyYSBiYWNrZW5kIGVycm9yLCBhbmQgaWYgc28sIHNjaGVkdWxlIGEgcmUtdHJ5ICovXG4gICAgICAgIGNvbnN0IGNhc3NhbmRyYUVycm9yID0gZXJyb3JEYXRhLnJlc3BvbnNlSlNPTi50aXRsZSA9PT0gJ0Vycm9yIGluIENhc3NhbmRyYSB0YWJsZSBzdG9yYWdlIGJhY2tlbmQnLFxuICAgICAgICAgIGZhaWxlZFBhZ2VMaW5rID0gdGhpcy5nZXRQYWdlTGluayhwYWdlLnRpdGxlLCBgJHt0aGlzLnByb2plY3R9Lm9yZ2ApO1xuXG4gICAgICAgIGlmIChjYXNzYW5kcmFFcnJvcikge1xuICAgICAgICAgIGlmIChmYWlsdXJlUmV0cmllc1twYWdlLnRpdGxlXSkge1xuICAgICAgICAgICAgZmFpbHVyZVJldHJpZXNbcGFnZS50aXRsZV0rKztcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZmFpbHVyZVJldHJpZXNbcGFnZS50aXRsZV0gPSAxO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIC8qKiBtYXhpbXVtIG9mIDMgcmV0cmllcyAqL1xuICAgICAgICAgIGlmIChmYWlsdXJlUmV0cmllc1twYWdlLnRpdGxlXSA8IDMpIHtcbiAgICAgICAgICAgIHRvdGFsUmVxdWVzdENvdW50Kys7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5yYXRlTGltaXQobWFrZVJlcXVlc3QsIHRoaXMuY29uZmlnLmFwaVRocm90dGxlLCB0aGlzKShwYWdlKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICAvKiogcmV0cmllcyBleGNlZWRlZCAqL1xuICAgICAgICAgIGZhaWxlZFBhZ2VzLnB1c2goZmFpbGVkUGFnZUxpbmspO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMud3JpdGVNZXNzYWdlKFxuICAgICAgICAgICAgYCR7ZmFpbGVkUGFnZUxpbmt9OiAkeyQuaTE4bignYXBpLWVycm9yJywgJ1BhZ2V2aWV3cyBBUEknKX0gLSAke2Vycm9yRGF0YS5yZXNwb25zZUpTT04udGl0bGV9YFxuICAgICAgICAgICk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyB1bmxlc3MgaXQgd2FzIGEgNDA0LCBkb24ndCBjYWNoZSB0aGlzIHNlcmllcyBvZiByZXF1ZXN0c1xuICAgICAgICBpZiAoZXJyb3JEYXRhLnN0YXR1cyAhPT0gNDA0KSBoYWRGYWlsdXJlID0gdHJ1ZTtcbiAgICAgIH0pLmFsd2F5cygoKSA9PiB7XG4gICAgICAgIHRoaXMudXBkYXRlUHJvZ3Jlc3NCYXIoKytjb3VudCwgdG90YWxSZXF1ZXN0Q291bnQpO1xuXG4gICAgICAgIGlmIChjb3VudCA9PT0gdG90YWxSZXF1ZXN0Q291bnQpIHtcbiAgICAgICAgICBpZiAoZmFpbGVkUGFnZXMubGVuZ3RoKSB7XG4gICAgICAgICAgICB0aGlzLndyaXRlTWVzc2FnZSgkLmkxOG4oXG4gICAgICAgICAgICAgICdhcGktZXJyb3ItdGltZW91dCcsXG4gICAgICAgICAgICAgICc8dWw+JyArXG4gICAgICAgICAgICAgIGZhaWxlZFBhZ2VzLm1hcChmYWlsZWRQYWdlID0+IGA8bGk+JHtmYWlsZWRQYWdlfTwvbGk+YCkuam9pbignJykgK1xuICAgICAgICAgICAgICAnPC91bD4nXG4gICAgICAgICAgICApKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBkZmQucmVzb2x2ZShwYWdlVmlld3NEYXRhKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfTtcblxuICAgIGNvbnN0IHJlcXVlc3RGbiA9IHRoaXMucmF0ZUxpbWl0KG1ha2VSZXF1ZXN0LCB0aGlzLmNvbmZpZy5hcGlUaHJvdHRsZSwgdGhpcyk7XG5cbiAgICByZWRpcmVjdERhdGEuZm9yRWFjaChwYWdlID0+IHtcbiAgICAgIHJlcXVlc3RGbihwYWdlKTtcbiAgICB9KTtcblxuICAgIHJldHVybiBkZmQ7XG4gIH1cblxuICAvKipcbiAgICogR2V0IGFsbCByZWRpcmVjdHMgb2YgYSBwYWdlXG4gICAqIEBwYXJhbSAge1N0cmluZ30gcGFnZU5hbWUgLSBuYW1lIG9mIHBhZ2Ugd2Ugd2FudCB0byBnZXQgZGF0YSBhYm91dFxuICAgKiBAcmV0dXJuIHtEZWZlcnJlZH0gLSBQcm9taXNlIHJlc29sdmluZyB3aXRoIHJlZGlyZWN0IGRhdGFcbiAgICovXG4gIGdldFJlZGlyZWN0cyhwYWdlTmFtZSkge1xuICAgIGNvbnN0IGRmZCA9ICQuRGVmZXJyZWQoKTtcblxuICAgIGNvbnN0IHByb21pc2UgPSAkLmFqYXgoe1xuICAgICAgdXJsOiBgaHR0cHM6Ly8ke3RoaXMucHJvamVjdH0ub3JnL3cvYXBpLnBocGAsXG4gICAgICBqc29ucDogJ2NhbGxiYWNrJyxcbiAgICAgIGRhdGFUeXBlOiAnanNvbnAnLFxuICAgICAgZGF0YToge1xuICAgICAgICBhY3Rpb246ICdxdWVyeScsXG4gICAgICAgIGZvcm1hdDogJ2pzb24nLFxuICAgICAgICBmb3JtYXR2ZXJzaW9uOiAyLFxuICAgICAgICBwcm9wOiAncmVkaXJlY3RzJyxcbiAgICAgICAgcmRwcm9wOiAndGl0bGV8ZnJhZ21lbnQnLFxuICAgICAgICByZGxpbWl0OiA1MDAsXG4gICAgICAgIHRpdGxlczogcGFnZU5hbWVcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHByb21pc2UuZG9uZShkYXRhID0+IHtcbiAgICAgIGlmIChkYXRhLmVycm9yKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnNldFN0YXRlKCdpbml0aWFsJywgKCkgPT4ge1xuICAgICAgICAgIHRoaXMud3JpdGVNZXNzYWdlKFxuICAgICAgICAgICAgYCR7JC5pMThuKCdhcGktZXJyb3InLCAnUmVkaXJlY3QgQVBJJyl9OiAke2RhdGEuZXJyb3IuaW5mby5lc2NhcGUoKX1gXG4gICAgICAgICAgKTtcbiAgICAgICAgfSk7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IHJlZGlyZWN0cyA9IFt7XG4gICAgICAgIHRpdGxlOiBwYWdlTmFtZVxuICAgICAgfV0uY29uY2F0KGRhdGEucXVlcnkucGFnZXNbMF0ucmVkaXJlY3RzIHx8IFtdKTtcblxuICAgICAgcmV0dXJuIGRmZC5yZXNvbHZlKHJlZGlyZWN0cyk7XG4gICAgfSk7XG5cbiAgICByZXR1cm4gZGZkO1xuICB9XG5cbiAgLyoqXG4gICAqIFBhcnNlcyB0aGUgVVJMIHF1ZXJ5IHN0cmluZyBhbmQgc2V0cyBhbGwgdGhlIGlucHV0cyBhY2NvcmRpbmdseVxuICAgKiBTaG91bGQgb25seSBiZSBjYWxsZWQgb24gaW5pdGlhbCBwYWdlIGxvYWQsIHVudGlsIHdlIGRlY2lkZSB0byBzdXBwb3J0IHBvcCBzdGF0ZXMgKHByb2JhYmx5IG5ldmVyKVxuICAgKiBAcmV0dXJucyB7bnVsbH0gbm90aGluZ1xuICAgKi9cbiAgcG9wUGFyYW1zKCkge1xuICAgIGxldCBwYXJhbXMgPSB0aGlzLnZhbGlkYXRlUGFyYW1zKFxuICAgICAgdGhpcy5wYXJzZVF1ZXJ5U3RyaW5nKCdwYWdlcycpXG4gICAgKTtcblxuICAgICQodGhpcy5jb25maWcucHJvamVjdElucHV0KS52YWwocGFyYW1zLnByb2plY3QpO1xuICAgIHRoaXMudmFsaWRhdGVEYXRlUmFuZ2UocGFyYW1zKTtcblxuICAgIHRoaXMucGF0Y2hVc2FnZSgpO1xuXG4gICAgLy8gZmlsbCBpbiB2YWx1ZSBmb3IgdGhlIHBhZ2VcbiAgICBpZiAocGFyYW1zLnBhZ2UpIHtcbiAgICAgICQodGhpcy5jb25maWcuc291cmNlSW5wdXQpLnZhbChkZWNvZGVVUklDb21wb25lbnQocGFyYW1zLnBhZ2UpLmRlc2NvcmUoKSk7XG4gICAgfVxuXG4gICAgLy8gSWYgdGhlcmUgYXJlIGludmFsaWQgcGFyYW1zLCByZW1vdmUgcGFnZSBmcm9tIHBhcmFtcyBzbyB3ZSBkb24ndCBwcm9jZXNzIHRoZSBkZWZhdWx0cy5cbiAgICAvLyBGSVhNRTogd2UncmUgY2hlY2tpbmcgZm9yIHNpdGUgbWVzc2FnZXMgYmVjYXVzZSBzdXBlci52YWxpZGF0ZVBhcmFtcyBkb2Vzbid0IHJldHVybiBhIGJvb2xlYW5cbiAgICAvLyAgIG9yIGFueSBpbmRpY2F0aW9uIHRoZSB2YWxpZGF0aW9ucyBmYWlsZWQuIFRoaXMgaXMgaGFja3kgYnV0IG5lY2Vzc2FyeS5cbiAgICBpZiAoJCgnLnNpdGUtbm90aWNlIC5hbGVydC1kYW5nZXInKS5sZW5ndGgpIHtcbiAgICAgIGRlbGV0ZSBwYXJhbXMucGFnZTtcbiAgICB9XG5cbiAgICAkKHRoaXMuY29uZmlnLnBsYXRmb3JtU2VsZWN0b3IpLnZhbChwYXJhbXMucGxhdGZvcm0pO1xuICAgICQodGhpcy5jb25maWcuYWdlbnRTZWxlY3RvcikudmFsKHBhcmFtcy5hZ2VudCk7XG5cbiAgICAvKiogZXhwb3J0IG5lY2Vzc2FyeSBwYXJhbXMgdG8gb3V0ZXIgc2NvcGUgKi9cbiAgICBbJ3NvcnQnLCAnZGlyZWN0aW9uJywgJ3ZpZXcnXS5mb3JFYWNoKGtleSA9PiB7XG4gICAgICB0aGlzW2tleV0gPSBwYXJhbXNba2V5XTtcbiAgICB9KTtcblxuICAgIHRoaXMuc2V0dXBTb3VyY2VJbnB1dCgpO1xuXG4gICAgLyoqIHN0YXJ0IHVwIHByb2Nlc3NpbmcgaWYgcGFnZSBuYW1lIGlzIHByZXNlbnQgKi9cbiAgICBpZiAocGFyYW1zLnBhZ2UpIHtcbiAgICAgIHRoaXMucHJvY2Vzc0lucHV0KCk7XG4gICAgfSBlbHNlIHtcbiAgICAgICQodGhpcy5jb25maWcuc291cmNlSW5wdXQpLmZvY3VzKCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEhlbHBlciB0byBzZXQgYSBDU1MgY2xhc3Mgb24gdGhlIGBtYWluYCBub2RlLFxuICAgKiAgIHN0eWxpbmcgdGhlIGRvY3VtZW50IGJhc2VkIG9uIGEgJ3N0YXRlJ1xuICAgKiBAcGFyYW0ge1N0cmluZ30gc3RhdGUgLSBjbGFzcyB0byBiZSBhZGRlZDtcbiAgICogICBzaG91bGQgYmUgb25lIG9mIFsnaW5pdGlhbCcsICdwcm9jZXNzaW5nJywgJ2NvbXBsZXRlJ11cbiAgICogQHJldHVybnMge251bGx9IG5vdGhpbmdcbiAgICovXG4gIHNldFN0YXRlKHN0YXRlKSB7XG4gICAgJCgnbWFpbicpLnJlbW92ZUNsYXNzKHRoaXMuY29uZmlnLmZvcm1TdGF0ZXMuam9pbignICcpKS5hZGRDbGFzcyhzdGF0ZSk7XG5cbiAgICBzd2l0Y2ggKHN0YXRlKSB7XG4gICAgY2FzZSAnaW5pdGlhbCc6XG4gICAgICB0aGlzLmNsZWFyTWVzc2FnZXMoKTtcbiAgICAgIHRoaXMuYXNzaWduRGVmYXVsdHMoKTtcbiAgICAgIHRoaXMuZGVzdHJveUNoYXJ0KCk7XG4gICAgICAkKCdvdXRwdXQnKS5yZW1vdmVDbGFzcygnbGlzdC1tb2RlJykucmVtb3ZlQ2xhc3MoJ2NoYXJ0LW1vZGUnKTtcbiAgICAgICQoJy5kYXRhLWxpbmtzJykuYWRkQ2xhc3MoJ2ludmlzaWJsZScpO1xuICAgICAgaWYgKHRoaXMudHlwZWFoZWFkKSB0aGlzLnR5cGVhaGVhZC5oaWRlKCk7XG4gICAgICAkKHRoaXMuY29uZmlnLnNvdXJjZUlucHV0KS52YWwoJycpLmZvY3VzKCk7XG4gICAgICBicmVhaztcbiAgICBjYXNlICdwcm9jZXNzaW5nJzpcbiAgICAgIHRoaXMucHJvY2Vzc1N0YXJ0ZWQoKTtcbiAgICAgIHRoaXMuY2xlYXJNZXNzYWdlcygpO1xuICAgICAgZG9jdW1lbnQuYWN0aXZlRWxlbWVudC5ibHVyKCk7XG4gICAgICAkKCcucHJvZ3Jlc3MtYmFyJykuYWRkQ2xhc3MoJ2FjdGl2ZScpO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSAnY29tcGxldGUnOlxuICAgICAgdGhpcy5wcm9jZXNzRW5kZWQoKTtcbiAgICAgIC8qKiBzdG9wIGhpZGRlbiBhbmltYXRpb24gZm9yIHNsaWdodCBwZXJmb3JtYW5jZSBpbXByb3ZlbWVudCAqL1xuICAgICAgdGhpcy51cGRhdGVQcm9ncmVzc0JhcigwKTtcbiAgICAgICQoJy5wcm9ncmVzcy1iYXInKS5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XG4gICAgICAkKCcuZGF0YS1saW5rcycpLnJlbW92ZUNsYXNzKCdpbnZpc2libGUnKTtcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgJ2ludmFsaWQnOlxuICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFByb2Nlc3MgdGhlIHJlZGlyZWN0dmlld3MgZm9yIHRoZSBhcnRpY2xlIGFuZCBvcHRpb25zIGVudGVyZWRcbiAgICogQ2FsbGVkIHdoZW4gc3VibWl0dGluZyB0aGUgZm9ybVxuICAgKiBAcmV0dXJuIHtudWxsfSBub3RoaW5nXG4gICAqL1xuICBwcm9jZXNzSW5wdXQoKSB7XG4gICAgY29uc3QgcGFnZSA9ICQodGhpcy5jb25maWcuc291cmNlSW5wdXQpLnZhbCgpO1xuXG4gICAgdGhpcy5zZXRTdGF0ZSgncHJvY2Vzc2luZycpO1xuXG4gICAgY29uc3QgcmVhZHlGb3JSZW5kZXJpbmcgPSAoKSA9PiB7XG4gICAgICAkKCcub3V0cHV0LXRpdGxlJykuaHRtbCh0aGlzLm91dHB1dERhdGEubGluayk7XG4gICAgICAkKCcub3V0cHV0LXBhcmFtcycpLmh0bWwoJCh0aGlzLmNvbmZpZy5kYXRlUmFuZ2VTZWxlY3RvcikudmFsKCkpO1xuICAgICAgdGhpcy5zZXRJbml0aWFsQ2hhcnRUeXBlKCk7XG4gICAgICB0aGlzLnJlbmRlckRhdGEoKTtcbiAgICB9O1xuXG4gICAgaWYgKHRoaXMuaXNSZXF1ZXN0Q2FjaGVkKCkpIHtcbiAgICAgICQoJy5wcm9ncmVzcy1iYXInKS5jc3MoJ3dpZHRoJywgJzEwMCUnKTtcbiAgICAgICQoJy5wcm9ncmVzcy1jb3VudGVyJykudGV4dCgkLmkxOG4oJ2xvYWRpbmctY2FjaGUnKSk7XG4gICAgICByZXR1cm4gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIHRoaXMub3V0cHV0RGF0YSA9IHNpbXBsZVN0b3JhZ2UuZ2V0KHRoaXMuZ2V0Q2FjaGVLZXkoKSk7XG4gICAgICAgIHJlYWR5Rm9yUmVuZGVyaW5nKCk7XG4gICAgICB9LCA1MDApO1xuICAgIH1cblxuICAgICQoJy5wcm9ncmVzcy1jb3VudGVyJykudGV4dCgkLmkxOG4oJ2ZldGNoaW5nLWRhdGEnLCAnUmVkaXJlY3RzIEFQSScpKTtcbiAgICB0aGlzLmdldFJlZGlyZWN0cyhwYWdlKS5kb25lKHJlZGlyZWN0RGF0YSA9PiB7XG4gICAgICB0aGlzLmdldFBhZ2VWaWV3c0RhdGEocmVkaXJlY3REYXRhKS5kb25lKHBhZ2VWaWV3c0RhdGEgPT4ge1xuICAgICAgICAkKCcucHJvZ3Jlc3MtYmFyJykuY3NzKCd3aWR0aCcsICcxMDAlJyk7XG4gICAgICAgICQoJy5wcm9ncmVzcy1jb3VudGVyJykudGV4dCgkLmkxOG4oJ2J1aWxkaW5nLWRhdGFzZXQnKSk7XG4gICAgICAgIGNvbnN0IHBhZ2VMaW5rID0gdGhpcy5nZXRQYWdlTGluayhkZWNvZGVVUklDb21wb25lbnQocGFnZSksIHRoaXMucHJvamVjdCk7XG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgIHRoaXMuYnVpbGRNb3RoZXJEYXRhc2V0KHBhZ2UsIHBhZ2VMaW5rLCBwYWdlVmlld3NEYXRhKTtcbiAgICAgICAgICByZWFkeUZvclJlbmRlcmluZygpO1xuICAgICAgICB9LCAyNTApO1xuICAgICAgfSk7XG4gICAgfSkuZmFpbChlcnJvciA9PiB7XG4gICAgICB0aGlzLnNldFN0YXRlKCdpbml0aWFsJyk7XG5cbiAgICAgIC8qKiBzdHJ1Y3R1cmVkIGVycm9yIGNvbWVzIGJhY2sgYXMgYSBzdHJpbmcsIG90aGVyd2lzZSB3ZSBkb24ndCBrbm93IHdoYXQgaGFwcGVuZWQgKi9cbiAgICAgIGlmICh0eXBlb2YgZXJyb3IgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgIHRoaXMud3JpdGVNZXNzYWdlKGVycm9yKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMud3JpdGVNZXNzYWdlKCQuaTE4bignYXBpLWVycm9yLXVua25vd24nLCAnV2lraWRhdGEnKSk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogU2V0dXAgdHlwZWFoZWFkIG9uIHRoZSBhcnRpY2xlIGlucHV0LCBraWxsaW5nIHRoZSBwcmV2b3VzIGluc3RhbmNlIGlmIHByZXNlbnRcbiAgICogQHJldHVybiB7bnVsbH0gTm90aGluZ1xuICAgKi9cbiAgc2V0dXBTb3VyY2VJbnB1dCgpIHtcbiAgICBpZiAodGhpcy50eXBlYWhlYWQpIHRoaXMudHlwZWFoZWFkLmRlc3Ryb3koKTtcblxuICAgICQodGhpcy5jb25maWcuc291cmNlSW5wdXQpLnR5cGVhaGVhZCh7XG4gICAgICBhamF4OiB7XG4gICAgICAgIHVybDogYGh0dHBzOi8vJHt0aGlzLnByb2plY3R9Lm9yZy93L2FwaS5waHBgLFxuICAgICAgICB0aW1lb3V0OiAyMDAsXG4gICAgICAgIHRyaWdnZXJMZW5ndGg6IDEsXG4gICAgICAgIG1ldGhvZDogJ2dldCcsXG4gICAgICAgIHByZURpc3BhdGNoOiBxdWVyeSA9PiB7XG4gICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGFjdGlvbjogJ29wZW5zZWFyY2gnLFxuICAgICAgICAgICAgcmVkaXJlY3RzOiAncmVzb2x2ZScsXG4gICAgICAgICAgICBmb3JtYXQ6ICdqc29uJyxcbiAgICAgICAgICAgIHNlYXJjaDogcXVlcnlcbiAgICAgICAgICB9O1xuICAgICAgICB9LFxuICAgICAgICBwcmVQcm9jZXNzOiBkYXRhID0+IGRhdGFbMV1cbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDYWxscyBwYXJlbnQgc2V0dXBQcm9qZWN0SW5wdXQgYW5kIHVwZGF0ZXMgdGhlIHZpZXcgaWYgdmFsaWRhdGlvbnMgcGFzc2VkXG4gICAqICAgcmV2ZXJ0aW5nIHRvIHRoZSBvbGQgdmFsdWUgaWYgdGhlIG5ldyBvbmUgaXMgaW52YWxpZFxuICAgKiBAcmV0dXJucyB7bnVsbH0gbm90aGluZ1xuICAgKiBAb3ZlcnJpZGVcbiAgICovXG4gIHZhbGlkYXRlUHJvamVjdCgpIHtcbiAgICBpZiAoc3VwZXIudmFsaWRhdGVQcm9qZWN0KCkpIHtcbiAgICAgIHRoaXMuc2V0U3RhdGUoJ2luaXRpYWwnKTtcblxuICAgICAgLyoqIGtpbGwgYW5kIHJlLWluaXQgdHlwZWFoZWFkIHRvIHBvaW50IHRvIG5ldyBwcm9qZWN0ICovXG4gICAgICB0aGlzLnNldHVwU291cmNlSW5wdXQoKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogRXhwb3J0cyBjdXJyZW50IGxhbmcgZGF0YSB0byBDU1YgZm9ybWF0IGFuZCBsb2FkcyBpdCBpbiBhIG5ldyB0YWJcbiAgICogV2l0aCB0aGUgcHJlcGVuZGVkIGRhdGE6dGV4dC9jc3YgdGhpcyBzaG91bGQgY2F1c2UgdGhlIGJyb3dzZXIgdG8gZG93bmxvYWQgdGhlIGRhdGFcbiAgICogQHJldHVybnMge3N0cmluZ30gQ1NWIGNvbnRlbnRcbiAgICovXG4gIGV4cG9ydENTVigpIHtcbiAgICBsZXQgY3N2Q29udGVudCA9IGBkYXRhOnRleHQvY3N2O2NoYXJzZXQ9dXRmLTgsVGl0bGUsJHt0aGlzLmdldERhdGVIZWFkaW5ncyhmYWxzZSkuam9pbignLCcpfVxcbmA7XG5cbiAgICAvLyBBZGQgdGhlIHJvd3MgdG8gdGhlIENTVlxuICAgIHRoaXMub3V0cHV0RGF0YS5saXN0RGF0YS5mb3JFYWNoKHBhZ2UgPT4ge1xuICAgICAgY29uc3QgcGFnZU5hbWUgPSAnXCInICsgcGFnZS5sYWJlbC5kZXNjb3JlKCkucmVwbGFjZSgvXCIvZywgJ1wiXCInKSArICdcIic7XG5cbiAgICAgIGNzdkNvbnRlbnQgKz0gW1xuICAgICAgICBwYWdlTmFtZSxcbiAgICAgIF0uY29uY2F0KHBhZ2UuZGF0YSkuam9pbignLCcpICsgJ1xcbic7XG4gICAgfSk7XG5cbiAgICAvLyBPdXRwdXQgdGhlIENTViBmaWxlIHRvIHRoZSBicm93c2VyXG4gICAgY29uc3QgZW5jb2RlZFVyaSA9IGVuY29kZVVSSShjc3ZDb250ZW50KTtcbiAgICB3aW5kb3cub3BlbihlbmNvZGVkVXJpKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgaW5mb3JtYXRpdmUgZmlsZW5hbWUgd2l0aG91dCBleHRlbnNpb24gdG8gYmUgdXNlZCBmb3IgZXhwb3J0IG9wdGlvbnNcbiAgICogQHJldHVybiB7c3RyaW5nfSBmaWxlbmFtZSB3aXRob3V0IGFuIGV4dGVuc2lvblxuICAgKi9cbiAgZ2V0RXhwb3J0RmlsZW5hbWUoKSB7XG4gICAgY29uc3QgcGFyYW1zID0gdGhpcy5nZXRQYXJhbXModHJ1ZSk7XG4gICAgcmV0dXJuIGAke3RoaXMub3V0cHV0RGF0YS5zb3VyY2V9LSR7cGFyYW1zLnN0YXJ0LnJlcGxhY2UoLy0vZywgJycpfS0ke3BhcmFtcy5lbmQucmVwbGFjZSgvLS9nLCAnJyl9YDtcbiAgfVxufVxuXG4kKGRvY3VtZW50KS5yZWFkeSgoKSA9PiB7XG4gIC8qKiBhc3N1bWUgaGFzaCBwYXJhbXMgYXJlIHN1cHBvc2VkIHRvIGJlIHF1ZXJ5IHBhcmFtcyAqL1xuICBpZiAoZG9jdW1lbnQubG9jYXRpb24uaGFzaCAmJiAhZG9jdW1lbnQubG9jYXRpb24uc2VhcmNoKSB7XG4gICAgcmV0dXJuIGRvY3VtZW50LmxvY2F0aW9uLmhyZWYgPSBkb2N1bWVudC5sb2NhdGlvbi5ocmVmLnJlcGxhY2UoJyMnLCAnPycpO1xuICB9IGVsc2UgaWYgKGRvY3VtZW50LmxvY2F0aW9uLmhhc2gpIHtcbiAgICByZXR1cm4gZG9jdW1lbnQubG9jYXRpb24uaHJlZiA9IGRvY3VtZW50LmxvY2F0aW9uLmhyZWYucmVwbGFjZSgvXFwjLiovLCAnJyk7XG4gIH1cblxuICBuZXcgUmVkaXJlY3RWaWV3cygpO1xufSk7XG4iLCIvKipcbiAqIEBmaWxlIFNoYXJlZCBjaGFydC1zcGVjaWZpYyBsb2dpY1xuICogQGF1dGhvciBNdXNpa0FuaW1hbFxuICogQGNvcHlyaWdodCAyMDE2IE11c2lrQW5pbWFsXG4gKiBAbGljZW5zZSBNSVQgTGljZW5zZTogaHR0cHM6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9NSVRcbiAqL1xuXG4vKipcbiAqIFNoYXJlZCBjaGFydC1zcGVjaWZpYyBsb2dpYywgdXNlZCBpbiBhbGwgYXBwcyBleGNlcHQgVG9wdmlld3NcbiAqIEBwYXJhbSB7Y2xhc3N9IHN1cGVyY2xhc3MgLSBiYXNlIGNsYXNzXG4gKiBAcmV0dXJucyB7bnVsbH0gY2xhc3MgZXh0ZW5kaW5nIHN1cGVyY2xhc3NcbiAqL1xuY29uc3QgQ2hhcnRIZWxwZXJzID0gc3VwZXJjbGFzcyA9PiBjbGFzcyBleHRlbmRzIHN1cGVyY2xhc3Mge1xuICBjb25zdHJ1Y3RvcihhcHBDb25maWcpIHtcbiAgICBzdXBlcihhcHBDb25maWcpO1xuXG4gICAgdGhpcy5jaGFydE9iaiA9IG51bGw7XG4gICAgdGhpcy5wcmV2Q2hhcnRUeXBlID0gbnVsbDtcbiAgICB0aGlzLmF1dG9DaGFydFR5cGUgPSB0cnVlOyAvLyB3aWxsIGJlY29tZSBmYWxzZSB3aGVuIHRoZXkgbWFudWFsbHkgY2hhbmdlIHRoZSBjaGFydCB0eXBlXG5cbiAgICAvKiogZW5zdXJlIHdlIGhhdmUgYSB2YWxpZCBjaGFydCB0eXBlIGluIGxvY2FsU3RvcmFnZSwgcmVzdWx0IG9mIENoYXJ0LmpzIDEuMCB0byAyLjAgbWlncmF0aW9uICovXG4gICAgY29uc3Qgc3RvcmVkQ2hhcnRUeXBlID0gdGhpcy5nZXRGcm9tTG9jYWxTdG9yYWdlKCdwYWdldmlld3MtY2hhcnQtcHJlZmVyZW5jZScpO1xuICAgIGlmICghdGhpcy5jb25maWcubGluZWFyQ2hhcnRzLmluY2x1ZGVzKHN0b3JlZENoYXJ0VHlwZSkgJiYgIXRoaXMuY29uZmlnLmNpcmN1bGFyQ2hhcnRzLmluY2x1ZGVzKHN0b3JlZENoYXJ0VHlwZSkpIHtcbiAgICAgIHRoaXMuc2V0TG9jYWxTdG9yYWdlKCdwYWdldmlld3MtY2hhcnQtcHJlZmVyZW5jZScsIHRoaXMuY29uZmlnLmRlZmF1bHRzLmNoYXJ0VHlwZSgpKTtcbiAgICB9XG5cbiAgICAvLyBsZWF2ZSBpZiB0aGVyZSdzIG5vIGNoYXJ0IGNvbmZpZ3VyZWRcbiAgICBpZiAoIXRoaXMuY29uZmlnLmNoYXJ0KSByZXR1cm47XG5cbiAgICAvKiogQHR5cGUge0Jvb2xlYW59IGFkZCBhYmlsaXR5IHRvIGRpc2FibGUgYXV0by1sb2cgZGV0ZWN0aW9uICovXG4gICAgdGhpcy5ub0xvZ1NjYWxlID0gbG9jYXRpb24uc2VhcmNoLmluY2x1ZGVzKCdhdXRvbG9nPWZhbHNlJyk7XG5cbiAgICAvKiogY29weSBvdmVyIGFwcC1zcGVjaWZpYyBjaGFydCB0ZW1wbGF0ZXMgKi9cbiAgICB0aGlzLmNvbmZpZy5saW5lYXJDaGFydHMuZm9yRWFjaChsaW5lYXJDaGFydCA9PiB7XG4gICAgICB0aGlzLmNvbmZpZy5jaGFydENvbmZpZ1tsaW5lYXJDaGFydF0ub3B0cy5sZWdlbmRUZW1wbGF0ZSA9IHRoaXMuY29uZmlnLmxpbmVhckxlZ2VuZDtcbiAgICB9KTtcbiAgICB0aGlzLmNvbmZpZy5jaXJjdWxhckNoYXJ0cy5mb3JFYWNoKGNpcmN1bGFyQ2hhcnQgPT4ge1xuICAgICAgdGhpcy5jb25maWcuY2hhcnRDb25maWdbY2lyY3VsYXJDaGFydF0ub3B0cy5sZWdlbmRUZW1wbGF0ZSA9IHRoaXMuY29uZmlnLmNpcmN1bGFyTGVnZW5kO1xuICAgIH0pO1xuXG4gICAgT2JqZWN0LmFzc2lnbihDaGFydC5kZWZhdWx0cy5nbG9iYWwsIHthbmltYXRpb246IGZhbHNlLCByZXNwb25zaXZlOiB0cnVlfSk7XG5cbiAgICAvKiogY2hhbmdpbmcgb2YgY2hhcnQgdHlwZXMgKi9cbiAgICAkKCcubW9kYWwtY2hhcnQtdHlwZSBhJykub24oJ2NsaWNrJywgZSA9PiB7XG4gICAgICB0aGlzLmNoYXJ0VHlwZSA9ICQoZS5jdXJyZW50VGFyZ2V0KS5kYXRhKCd0eXBlJyk7XG4gICAgICB0aGlzLmF1dG9DaGFydFR5cGUgPSBmYWxzZTtcblxuICAgICAgJCgnLmxvZ2FyaXRobWljLXNjYWxlJykudG9nZ2xlKHRoaXMuaXNMb2dhcml0aG1pY0NhcGFibGUoKSk7XG4gICAgICAkKCcuYmVnaW4tYXQtemVybycpLnRvZ2dsZSh0aGlzLmNvbmZpZy5saW5lYXJDaGFydHMuaW5jbHVkZXModGhpcy5jaGFydFR5cGUpKTtcblxuICAgICAgaWYgKHRoaXMucmVtZW1iZXJDaGFydCA9PT0gJ3RydWUnKSB7XG4gICAgICAgIHRoaXMuc2V0TG9jYWxTdG9yYWdlKCdwYWdldmlld3MtY2hhcnQtcHJlZmVyZW5jZScsIHRoaXMuY2hhcnRUeXBlKTtcbiAgICAgIH1cblxuICAgICAgdGhpcy5pc0NoYXJ0QXBwKCkgPyB0aGlzLnVwZGF0ZUNoYXJ0KHRoaXMucGFnZVZpZXdzRGF0YSkgOiB0aGlzLnJlbmRlckRhdGEoKTtcbiAgICB9KTtcblxuICAgICQodGhpcy5jb25maWcubG9nYXJpdGhtaWNDaGVja2JveCkub24oJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgdGhpcy5hdXRvTG9nRGV0ZWN0aW9uID0gJ2ZhbHNlJztcbiAgICAgIHRoaXMuaXNDaGFydEFwcCgpID8gdGhpcy51cGRhdGVDaGFydCh0aGlzLnBhZ2VWaWV3c0RhdGEpIDogdGhpcy5yZW5kZXJEYXRhKCk7XG4gICAgfSk7XG5cbiAgICAvKipcbiAgICAgKiBkaXNhYmxlZC9lbmFibGUgYmVnaW4gYXQgemVybyBjaGVja2JveCBhY2NvcmRpbmdseSxcbiAgICAgKiBidXQgZG9uJ3QgdXBkYXRlIGNoYXJ0IHNpbmNlIHRoZSBsb2cgc2NhbGUgdmFsdWUgY2FuIGNoYW5nZSBwcmFnbWF0aWNhbGx5IGFuZCBub3QgZnJvbSB1c2VyIGlucHV0XG4gICAgICovXG4gICAgJCh0aGlzLmNvbmZpZy5sb2dhcml0aG1pY0NoZWNrYm94KS5vbignY2hhbmdlJywgKCkgPT4ge1xuICAgICAgJCgnLmJlZ2luLWF0LXplcm8nKS50b2dnbGVDbGFzcygnZGlzYWJsZWQnLCB0aGlzLmNoZWNrZWQpO1xuICAgIH0pO1xuXG4gICAgaWYgKHRoaXMuYmVnaW5BdFplcm8gPT09ICd0cnVlJykge1xuICAgICAgJCgnLmJlZ2luLWF0LXplcm8tb3B0aW9uJykucHJvcCgnY2hlY2tlZCcsIHRydWUpO1xuICAgIH1cblxuICAgICQoJy5iZWdpbi1hdC16ZXJvLW9wdGlvbicpLm9uKCdjbGljaycsICgpID0+IHtcbiAgICAgIHRoaXMuaXNDaGFydEFwcCgpID8gdGhpcy51cGRhdGVDaGFydCh0aGlzLnBhZ2VWaWV3c0RhdGEpIDogdGhpcy5yZW5kZXJEYXRhKCk7XG4gICAgfSk7XG5cbiAgICAvKiogY2hhcnQgZG93bmxvYWQgbGlzdGVuZXJzICovXG4gICAgJCgnLmRvd25sb2FkLXBuZycpLm9uKCdjbGljaycsIHRoaXMuZXhwb3J0UE5HLmJpbmQodGhpcykpO1xuICAgICQoJy5wcmludC1jaGFydCcpLm9uKCdjbGljaycsIHRoaXMucHJpbnRDaGFydC5iaW5kKHRoaXMpKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZXQgdGhlIGRlZmF1bHQgY2hhcnQgdHlwZSBvciB0aGUgb25lIGZyb20gbG9jYWxTdG9yYWdlLCBiYXNlZCBvbiBzZXR0aW5nc1xuICAgKiBAcGFyYW0ge051bWJlcn0gW251bURhdGFzZXRzXSAtIG51bWJlciBvZiBkYXRhc2V0c1xuICAgKiBAcmV0dXJucyB7bnVsbH0gbm90aGluZ1xuICAgKi9cbiAgc2V0SW5pdGlhbENoYXJ0VHlwZShudW1EYXRhc2V0cyA9IDEpIHtcbiAgICBpZiAodGhpcy5yZW1lbWJlckNoYXJ0ID09PSAndHJ1ZScpIHtcbiAgICAgIHRoaXMuY2hhcnRUeXBlID0gdGhpcy5nZXRGcm9tTG9jYWxTdG9yYWdlKCdwYWdldmlld3MtY2hhcnQtcHJlZmVyZW5jZScpIHx8IHRoaXMuY29uZmlnLmRlZmF1bHRzLmNoYXJ0VHlwZShudW1EYXRhc2V0cyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuY2hhcnRUeXBlID0gdGhpcy5jb25maWcuZGVmYXVsdHMuY2hhcnRUeXBlKG51bURhdGFzZXRzKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogRGVzdHJveSBwcmV2aW91cyBjaGFydCwgaWYgbmVlZGVkLlxuICAgKiBAcmV0dXJucyB7bnVsbH0gbm90aGluZ1xuICAgKi9cbiAgZGVzdHJveUNoYXJ0KCkge1xuICAgIGlmICh0aGlzLmNoYXJ0T2JqKSB7XG4gICAgICB0aGlzLmNoYXJ0T2JqLmRlc3Ryb3koKTtcbiAgICAgICQoJy5jaGFydC1sZWdlbmQnKS5odG1sKCcnKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogRXhwb3J0cyBjdXJyZW50IGNoYXJ0IGRhdGEgdG8gQ1NWIGZvcm1hdCBhbmQgbG9hZHMgaXQgaW4gYSBuZXcgdGFiXG4gICAqIFdpdGggdGhlIHByZXBlbmRlZCBkYXRhOnRleHQvY3N2IHRoaXMgc2hvdWxkIGNhdXNlIHRoZSBicm93c2VyIHRvIGRvd25sb2FkIHRoZSBkYXRhXG4gICAqIEByZXR1cm5zIHtudWxsfSBOb3RoaW5nXG4gICAqL1xuICBleHBvcnRDU1YoKSB7XG4gICAgbGV0IGNzdkNvbnRlbnQgPSAnZGF0YTp0ZXh0L2NzdjtjaGFyc2V0PXV0Zi04LERhdGUsJztcbiAgICBsZXQgdGl0bGVzID0gW107XG4gICAgbGV0IGRhdGFSb3dzID0gW107XG4gICAgbGV0IGRhdGVzID0gdGhpcy5nZXREYXRlSGVhZGluZ3MoZmFsc2UpO1xuXG4gICAgLy8gQmVnaW4gY29uc3RydWN0aW5nIHRoZSBkYXRhUm93cyBhcnJheSBieSBwb3B1bGF0aW5nIGl0IHdpdGggdGhlIGRhdGVzXG4gICAgZGF0ZXMuZm9yRWFjaCgoZGF0ZSwgaW5kZXgpID0+IHtcbiAgICAgIGRhdGFSb3dzW2luZGV4XSA9IFtkYXRlXTtcbiAgICB9KTtcblxuICAgIHRoaXMuY2hhcnRPYmouZGF0YS5kYXRhc2V0cy5mb3JFYWNoKHNpdGUgPT4ge1xuICAgICAgLy8gQnVpbGQgYW4gYXJyYXkgb2Ygc2l0ZSB0aXRsZXMgZm9yIHVzZSBpbiB0aGUgQ1NWIGhlYWRlclxuICAgICAgbGV0IHNpdGVUaXRsZSA9ICdcIicgKyBzaXRlLmxhYmVsLnJlcGxhY2UoL1wiL2csICdcIlwiJykgKyAnXCInO1xuICAgICAgdGl0bGVzLnB1c2goc2l0ZVRpdGxlKTtcblxuICAgICAgLy8gUG9wdWxhdGUgdGhlIGRhdGFSb3dzIGFycmF5IHdpdGggdGhlIGRhdGEgZm9yIHRoaXMgc2l0ZVxuICAgICAgZGF0ZXMuZm9yRWFjaCgoZGF0ZSwgaW5kZXgpID0+IHtcbiAgICAgICAgZGF0YVJvd3NbaW5kZXhdLnB1c2goc2l0ZS5kYXRhW2luZGV4XSk7XG4gICAgICB9KTtcbiAgICB9KTtcblxuICAgIC8vIEZpbmlzaCB0aGUgQ1NWIGhlYWRlclxuICAgIGNzdkNvbnRlbnQgPSBjc3ZDb250ZW50ICsgdGl0bGVzLmpvaW4oJywnKSArICdcXG4nO1xuXG4gICAgLy8gQWRkIHRoZSByb3dzIHRvIHRoZSBDU1ZcbiAgICBkYXRhUm93cy5mb3JFYWNoKGRhdGEgPT4ge1xuICAgICAgY3N2Q29udGVudCArPSBkYXRhLmpvaW4oJywnKSArICdcXG4nO1xuICAgIH0pO1xuXG4gICAgdGhpcy5kb3dubG9hZERhdGEoY3N2Q29udGVudCwgJ2NzdicpO1xuICB9XG5cbiAgLyoqXG4gICAqIEV4cG9ydHMgY3VycmVudCBjaGFydCBkYXRhIHRvIEpTT04gZm9ybWF0IGFuZCBsb2FkcyBpdCBpbiBhIG5ldyB0YWJcbiAgICogQHJldHVybnMge251bGx9IE5vdGhpbmdcbiAgICovXG4gIGV4cG9ydEpTT04oKSB7XG4gICAgbGV0IGRhdGEgPSBbXTtcblxuICAgIHRoaXMuY2hhcnRPYmouZGF0YS5kYXRhc2V0cy5mb3JFYWNoKChwYWdlLCBpbmRleCkgPT4ge1xuICAgICAgbGV0IGVudHJ5ID0ge1xuICAgICAgICBwYWdlOiBwYWdlLmxhYmVsLnJlcGxhY2UoL1wiL2csICdcXFwiJykucmVwbGFjZSgvJy9nLCBcIlxcJ1wiKSxcbiAgICAgICAgY29sb3I6IHBhZ2Uuc3Ryb2tlQ29sb3IsXG4gICAgICAgIHN1bTogcGFnZS5zdW0sXG4gICAgICAgIGRhaWx5X2F2ZXJhZ2U6IE1hdGgucm91bmQocGFnZS5zdW0gLyB0aGlzLm51bURheXNJblJhbmdlKCkpXG4gICAgICB9O1xuXG4gICAgICB0aGlzLmdldERhdGVIZWFkaW5ncyhmYWxzZSkuZm9yRWFjaCgoaGVhZGluZywgaW5kZXgpID0+IHtcbiAgICAgICAgZW50cnlbaGVhZGluZy5yZXBsYWNlKC9cXFxcLywnJyldID0gcGFnZS5kYXRhW2luZGV4XTtcbiAgICAgIH0pO1xuXG4gICAgICBkYXRhLnB1c2goZW50cnkpO1xuICAgIH0pO1xuXG4gICAgY29uc3QganNvbkNvbnRlbnQgPSAnZGF0YTp0ZXh0L2pzb247Y2hhcnNldD11dGYtOCwnICsgSlNPTi5zdHJpbmdpZnkoZGF0YSk7XG4gICAgdGhpcy5kb3dubG9hZERhdGEoanNvbkNvbnRlbnQsICdqc29uJyk7XG4gIH1cblxuICAvKipcbiAgICogRXhwb3J0cyBjdXJyZW50IGRhdGEgYXMgUE5HIGltYWdlLCBvcGVuaW5nIGl0IGluIGEgbmV3IHRhYlxuICAgKiBAcmV0dXJucyB7bnVsbH0gbm90aGluZ1xuICAgKi9cbiAgZXhwb3J0UE5HKCkge1xuICAgIHRoaXMuZG93bmxvYWREYXRhKHRoaXMuY2hhcnRPYmoudG9CYXNlNjRJbWFnZSgpLCAncG5nJyk7XG4gIH1cblxuICAvKipcbiAgICogRmlsbHMgaW4gemVybyB2YWx1ZSB0byBhIHRpbWVzZXJpZXMsIHNlZTpcbiAgICogaHR0cHM6Ly93aWtpdGVjaC53aWtpbWVkaWEub3JnL3dpa2kvQW5hbHl0aWNzL0FRUy9QYWdldmlld19BUEkjR290Y2hhc1xuICAgKlxuICAgKiBAcGFyYW0ge29iamVjdH0gZGF0YSBmZXRjaGVkIGZyb20gQVBJXG4gICAqIEBwYXJhbSB7bW9tZW50fSBzdGFydERhdGUgLSBzdGFydCBkYXRlIG9mIHJhbmdlIHRvIGZpbHRlciB0aHJvdWdoXG4gICAqIEBwYXJhbSB7bW9tZW50fSBlbmREYXRlIC0gZW5kIGRhdGUgb2YgcmFuZ2VcbiAgICogQHJldHVybnMge29iamVjdH0gZGF0YXNldCB3aXRoIHplcm9zIHdoZXJlIG51bGxzIHdoZXJlXG4gICAqL1xuICBmaWxsSW5aZXJvcyhkYXRhLCBzdGFydERhdGUsIGVuZERhdGUpIHtcbiAgICAvKiogRXh0cmFjdCB0aGUgZGF0ZXMgdGhhdCBhcmUgYWxyZWFkeSBpbiB0aGUgdGltZXNlcmllcyAqL1xuICAgIGxldCBhbHJlYWR5VGhlcmUgPSB7fTtcbiAgICBkYXRhLml0ZW1zLmZvckVhY2goZWxlbSA9PiB7XG4gICAgICBsZXQgZGF0ZSA9IG1vbWVudChlbGVtLnRpbWVzdGFtcCwgdGhpcy5jb25maWcudGltZXN0YW1wRm9ybWF0KTtcbiAgICAgIGFscmVhZHlUaGVyZVtkYXRlXSA9IGVsZW07XG4gICAgfSk7XG4gICAgZGF0YS5pdGVtcyA9IFtdO1xuXG4gICAgLyoqIFJlY29uc3RydWN0IHdpdGggemVyb3MgaW5zdGVhZCBvZiBudWxscyAqL1xuICAgIGZvciAobGV0IGRhdGUgPSBtb21lbnQoc3RhcnREYXRlKTsgZGF0ZSA8PSBlbmREYXRlOyBkYXRlLmFkZCgxLCAnZCcpKSB7XG4gICAgICBpZiAoYWxyZWFkeVRoZXJlW2RhdGVdKSB7XG4gICAgICAgIGRhdGEuaXRlbXMucHVzaChhbHJlYWR5VGhlcmVbZGF0ZV0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29uc3QgZWRnZUNhc2UgPSBkYXRlLmlzU2FtZSh0aGlzLmNvbmZpZy5tYXhEYXRlKSB8fCBkYXRlLmlzU2FtZShtb21lbnQodGhpcy5jb25maWcubWF4RGF0ZSkuc3VidHJhY3QoMSwgJ2RheXMnKSk7XG4gICAgICAgIGRhdGEuaXRlbXMucHVzaCh7XG4gICAgICAgICAgdGltZXN0YW1wOiBkYXRlLmZvcm1hdCh0aGlzLmNvbmZpZy50aW1lc3RhbXBGb3JtYXQpLFxuICAgICAgICAgIFt0aGlzLmlzUGFnZXZpZXdzKCkgPyAndmlld3MnIDogJ2RldmljZXMnXTogZWRnZUNhc2UgPyBudWxsIDogMFxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gZGF0YTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgZGF0YSBmb3JtYXR0ZWQgZm9yIENoYXJ0LmpzIGFuZCB0aGUgbGVnZW5kIHRlbXBsYXRlc1xuICAgKiBAcGFyYW0ge0FycmF5fSBkYXRhc2V0cyAtIGFzIHJldHJpZXZlZCBieSBnZXRQYWdlVmlld3NEYXRhXG4gICAqIEByZXR1cm5zIHtvYmplY3R9IC0gcmVhZHkgZm9yIGNoYXJ0IHJlbmRlcmluZ1xuICAgKi9cbiAgYnVpbGRDaGFydERhdGEoZGF0YXNldHMpIHtcbiAgICBjb25zdCBsYWJlbHMgPSAkKHRoaXMuY29uZmlnLnNlbGVjdDJJbnB1dCkudmFsKCk7XG5cbiAgICAvKiogcHJlc2VydmUgb3JkZXIgb2YgZGF0YXNldHMgZHVlIHRvIGFzeW5jIGNhbGxzICovXG4gICAgcmV0dXJuIGRhdGFzZXRzLm1hcCgoZGF0YXNldCwgaW5kZXgpID0+IHtcbiAgICAgIC8qKiBCdWlsZCB0aGUgYXJ0aWNsZSdzIGRhdGFzZXQuICovXG4gICAgICBjb25zdCB2YWx1ZXMgPSBkYXRhc2V0Lm1hcChlbGVtID0+IHRoaXMuaXNQYWdldmlld3MoKSA/IGVsZW0udmlld3MgOiBlbGVtLmRldmljZXMpLFxuICAgICAgICBzdW0gPSB2YWx1ZXMucmVkdWNlKChhLCBiKSA9PiBhICsgYiksXG4gICAgICAgIGF2ZXJhZ2UgPSBNYXRoLnJvdW5kKHN1bSAvIHZhbHVlcy5sZW5ndGgpLFxuICAgICAgICBtYXggPSBNYXRoLm1heCguLi52YWx1ZXMpLFxuICAgICAgICBtaW4gPSBNYXRoLm1pbiguLi52YWx1ZXMpLFxuICAgICAgICBjb2xvciA9IHRoaXMuY29uZmlnLmNvbG9yc1tpbmRleCAlIDEwXSxcbiAgICAgICAgbGFiZWwgPSBsYWJlbHNbaW5kZXhdLmRlc2NvcmUoKTtcblxuICAgICAgY29uc3QgZW50aXR5SW5mbyA9IHRoaXMuZW50aXR5SW5mbyA/IHRoaXMuZW50aXR5SW5mb1tsYWJlbF0gOiB7fTtcblxuICAgICAgZGF0YXNldCA9IE9iamVjdC5hc3NpZ24oe1xuICAgICAgICBsYWJlbCxcbiAgICAgICAgZGF0YTogdmFsdWVzLFxuICAgICAgICB2YWx1ZTogc3VtLCAvLyBkdXBsaWNhdGVkIGJlY2F1c2UgQ2hhcnQuanMgd2FudHMgYSBzaW5nbGUgYHZhbHVlYCBmb3IgY2lyY3VsYXIgY2hhcnRzXG4gICAgICAgIHN1bSxcbiAgICAgICAgYXZlcmFnZSxcbiAgICAgICAgbWF4LFxuICAgICAgICBtaW4sXG4gICAgICAgIGNvbG9yXG4gICAgICB9LCB0aGlzLmNvbmZpZy5jaGFydENvbmZpZ1t0aGlzLmNoYXJ0VHlwZV0uZGF0YXNldChjb2xvciksIGVudGl0eUluZm8pO1xuXG4gICAgICBpZiAodGhpcy5pc0xvZ2FyaXRobWljKCkpIHtcbiAgICAgICAgZGF0YXNldC5kYXRhID0gZGF0YXNldC5kYXRhLm1hcCh2aWV3ID0+IHZpZXcgfHwgbnVsbCk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBkYXRhc2V0O1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCB1cmwgdG8gcXVlcnkgdGhlIEFQSSBiYXNlZCBvbiBhcHAgYW5kIG9wdGlvbnNcbiAgICogQHBhcmFtIHtTdHJpbmd9IGVudGl0eSAtIG5hbWUgb2YgZW50aXR5IHdlJ3JlIHF1ZXJ5aW5nIGZvciAocGFnZSBuYW1lIG9yIHByb2plY3QgbmFtZSlcbiAgICogQHBhcmFtIHttb21lbnR9IHN0YXJ0RGF0ZSAtIHN0YXJ0IGRhdGVcbiAgICogQHBhcmFtIHttb21lbnR9IGVuZERhdGUgLSBlbmQgZGF0ZVxuICAgKiBAcmV0dXJuIHtTdHJpbmd9IHRoZSBVUkxcbiAgICovXG4gIGdldEFwaVVybChlbnRpdHksIHN0YXJ0RGF0ZSwgZW5kRGF0ZSkge1xuICAgIGNvbnN0IHVyaUVuY29kZWRFbnRpdHlOYW1lID0gZW5jb2RlVVJJQ29tcG9uZW50KGVudGl0eSk7XG5cbiAgICBpZiAodGhpcy5hcHAgPT09ICdzaXRldmlld3MnKSB7XG4gICAgICByZXR1cm4gdGhpcy5pc1BhZ2V2aWV3cygpID8gKFxuICAgICAgICBgaHR0cHM6Ly93aWtpbWVkaWEub3JnL2FwaS9yZXN0X3YxL21ldHJpY3MvcGFnZXZpZXdzL2FnZ3JlZ2F0ZS8ke3VyaUVuY29kZWRFbnRpdHlOYW1lfWAgK1xuICAgICAgICBgLyR7JCh0aGlzLmNvbmZpZy5wbGF0Zm9ybVNlbGVjdG9yKS52YWwoKX0vJHskKHRoaXMuY29uZmlnLmFnZW50U2VsZWN0b3IpLnZhbCgpfS9kYWlseWAgK1xuICAgICAgICBgLyR7c3RhcnREYXRlLmZvcm1hdCh0aGlzLmNvbmZpZy50aW1lc3RhbXBGb3JtYXQpfS8ke2VuZERhdGUuZm9ybWF0KHRoaXMuY29uZmlnLnRpbWVzdGFtcEZvcm1hdCl9YFxuICAgICAgKSA6IChcbiAgICAgICAgYGh0dHBzOi8vd2lraW1lZGlhLm9yZy9hcGkvcmVzdF92MS9tZXRyaWNzL3VuaXF1ZS1kZXZpY2VzLyR7dXJpRW5jb2RlZEVudGl0eU5hbWV9LyR7JCh0aGlzLmNvbmZpZy5wbGF0Zm9ybVNlbGVjdG9yKS52YWwoKX0vZGFpbHlgICtcbiAgICAgICAgYC8ke3N0YXJ0RGF0ZS5mb3JtYXQodGhpcy5jb25maWcudGltZXN0YW1wRm9ybWF0KX0vJHtlbmREYXRlLmZvcm1hdCh0aGlzLmNvbmZpZy50aW1lc3RhbXBGb3JtYXQpfWBcbiAgICAgICk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiAoXG4gICAgICAgIGBodHRwczovL3dpa2ltZWRpYS5vcmcvYXBpL3Jlc3RfdjEvbWV0cmljcy9wYWdldmlld3MvcGVyLWFydGljbGUvJHt0aGlzLnByb2plY3R9YCArXG4gICAgICAgIGAvJHskKHRoaXMuY29uZmlnLnBsYXRmb3JtU2VsZWN0b3IpLnZhbCgpfS8keyQodGhpcy5jb25maWcuYWdlbnRTZWxlY3RvcikudmFsKCl9LyR7dXJpRW5jb2RlZEVudGl0eU5hbWV9L2RhaWx5YCArXG4gICAgICAgIGAvJHtzdGFydERhdGUuZm9ybWF0KHRoaXMuY29uZmlnLnRpbWVzdGFtcEZvcm1hdCl9LyR7ZW5kRGF0ZS5mb3JtYXQodGhpcy5jb25maWcudGltZXN0YW1wRm9ybWF0KX1gXG4gICAgICApO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBNb3RoZXIgZnVuY3Rpb24gZm9yIHF1ZXJ5aW5nIHRoZSBBUEkgYW5kIHByb2Nlc3NpbmcgZGF0YVxuICAgKiBAcGFyYW0gIHtBcnJheX0gIGVudGl0aWVzIC0gbGlzdCBvZiBwYWdlIG5hbWVzLCBvciBwcm9qZWN0cyBmb3IgU2l0ZXZpZXdzXG4gICAqIEByZXR1cm4ge0RlZmVycmVkfSBQcm9taXNlIHJlc29sdmluZyB3aXRoIHBhZ2V2aWV3cyBkYXRhIGFuZCBlcnJvcnMsIGlmIHByZXNlbnRcbiAgICovXG4gIGdldFBhZ2VWaWV3c0RhdGEoZW50aXRpZXMpIHtcbiAgICBsZXQgZGZkID0gJC5EZWZlcnJlZCgpLCBjb3VudCA9IDAsIGZhaWx1cmVSZXRyaWVzID0ge30sXG4gICAgICB0b3RhbFJlcXVlc3RDb3VudCA9IGVudGl0aWVzLmxlbmd0aCwgZmFpbGVkRW50aXRpZXMgPSBbXTtcblxuICAgIC8qKiBAdHlwZSB7T2JqZWN0fSBldmVyeXRoaW5nIHdlIG5lZWQgdG8ga2VlcCB0cmFjayBvZiBmb3IgdGhlIHByb21pc2VzICovXG4gICAgbGV0IHhockRhdGEgPSB7XG4gICAgICBlbnRpdGllcyxcbiAgICAgIGxhYmVsczogW10sIC8vIExhYmVscyAoZGF0ZXMpIGZvciB0aGUgeC1heGlzLlxuICAgICAgZGF0YXNldHM6IFtdLCAvLyBEYXRhIGZvciBlYWNoIGFydGljbGUgdGltZXNlcmllc1xuICAgICAgZXJyb3JzOiBbXSwgLy8gUXVldWUgdXAgZXJyb3JzIHRvIHNob3cgYWZ0ZXIgYWxsIHJlcXVlc3RzIGhhdmUgYmVlbiBtYWRlXG4gICAgICBmYXRhbEVycm9yczogW10sIC8vIFVucmVjb3ZlcmFibGUgSmF2YVNjcmlwdCBlcnJvcnNcbiAgICAgIHByb21pc2VzOiBbXVxuICAgIH07XG5cbiAgICBjb25zdCBtYWtlUmVxdWVzdCA9IChlbnRpdHksIGluZGV4KSA9PiB7XG4gICAgICBjb25zdCBzdGFydERhdGUgPSB0aGlzLmRhdGVyYW5nZXBpY2tlci5zdGFydERhdGUuc3RhcnRPZignZGF5JyksXG4gICAgICAgIGVuZERhdGUgPSB0aGlzLmRhdGVyYW5nZXBpY2tlci5lbmREYXRlLnN0YXJ0T2YoJ2RheScpLFxuICAgICAgICB1cmwgPSB0aGlzLmdldEFwaVVybChlbnRpdHksIHN0YXJ0RGF0ZSwgZW5kRGF0ZSksXG4gICAgICAgIHByb21pc2UgPSAkLmFqYXgoeyB1cmwsIGRhdGFUeXBlOiAnanNvbicgfSk7XG5cbiAgICAgIHhockRhdGEucHJvbWlzZXMucHVzaChwcm9taXNlKTtcblxuICAgICAgcHJvbWlzZS5kb25lKHN1Y2Nlc3NEYXRhID0+IHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICBzdWNjZXNzRGF0YSA9IHRoaXMuZmlsbEluWmVyb3Moc3VjY2Vzc0RhdGEsIHN0YXJ0RGF0ZSwgZW5kRGF0ZSk7XG5cbiAgICAgICAgICB4aHJEYXRhLmRhdGFzZXRzLnB1c2goc3VjY2Vzc0RhdGEuaXRlbXMpO1xuXG4gICAgICAgICAgLyoqIGZldGNoIHRoZSBsYWJlbHMgZm9yIHRoZSB4LWF4aXMgb24gc3VjY2VzcyBpZiB3ZSBoYXZlbid0IGFscmVhZHkgKi9cbiAgICAgICAgICBpZiAoc3VjY2Vzc0RhdGEuaXRlbXMgJiYgIXhockRhdGEubGFiZWxzLmxlbmd0aCkge1xuICAgICAgICAgICAgeGhyRGF0YS5sYWJlbHMgPSBzdWNjZXNzRGF0YS5pdGVtcy5tYXAoZWxlbSA9PiB7XG4gICAgICAgICAgICAgIHJldHVybiBtb21lbnQoZWxlbS50aW1lc3RhbXAsIHRoaXMuY29uZmlnLnRpbWVzdGFtcEZvcm1hdCkuZm9ybWF0KHRoaXMuZGF0ZUZvcm1hdCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICAgIHJldHVybiB4aHJEYXRhLmZhdGFsRXJyb3JzLnB1c2goZXJyKTtcbiAgICAgICAgfVxuICAgICAgfSkuZmFpbChlcnJvckRhdGEgPT4ge1xuICAgICAgICAvKiogZmlyc3QgZGV0ZWN0IGlmIHRoaXMgd2FzIGEgQ2Fzc2FuZHJhIGJhY2tlbmQgZXJyb3IsIGFuZCBpZiBzbywgc2NoZWR1bGUgYSByZS10cnkgKi9cbiAgICAgICAgY29uc3QgY2Fzc2FuZHJhRXJyb3IgPSBlcnJvckRhdGEucmVzcG9uc2VKU09OLnRpdGxlID09PSAnRXJyb3IgaW4gQ2Fzc2FuZHJhIHRhYmxlIHN0b3JhZ2UgYmFja2VuZCc7XG5cbiAgICAgICAgaWYgKGNhc3NhbmRyYUVycm9yKSB7XG4gICAgICAgICAgaWYgKGZhaWx1cmVSZXRyaWVzW2VudGl0eV0pIHtcbiAgICAgICAgICAgIGZhaWx1cmVSZXRyaWVzW2VudGl0eV0rKztcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZmFpbHVyZVJldHJpZXNbZW50aXR5XSA9IDE7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgLyoqIG1heGltdW0gb2YgMyByZXRyaWVzICovXG4gICAgICAgICAgaWYgKGZhaWx1cmVSZXRyaWVzW2VudGl0eV0gPCAzKSB7XG4gICAgICAgICAgICB0b3RhbFJlcXVlc3RDb3VudCsrO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMucmF0ZUxpbWl0KG1ha2VSZXF1ZXN0LCB0aGlzLmNvbmZpZy5hcGlUaHJvdHRsZSwgdGhpcykoZW50aXR5LCBpbmRleCk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgLy8gcmVtb3ZlIHRoaXMgYXJ0aWNsZSBmcm9tIHRoZSBsaXN0IG9mIGVudGl0aWVzIHRvIGFuYWx5emVcbiAgICAgICAgeGhyRGF0YS5lbnRpdGllcyA9IHhockRhdGEuZW50aXRpZXMuZmlsdGVyKGVsID0+IGVsICE9PSBlbnRpdHkpO1xuXG4gICAgICAgIGlmIChjYXNzYW5kcmFFcnJvcikge1xuICAgICAgICAgIGZhaWxlZEVudGl0aWVzLnB1c2goZW50aXR5KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBsZXQgbGluayA9IHRoaXMuYXBwID09PSAnc2l0ZXZpZXdzJyA/IHRoaXMuZ2V0U2l0ZUxpbmsoZW50aXR5KSA6IHRoaXMuZ2V0UGFnZUxpbmsoZW50aXR5LCB0aGlzLnByb2plY3QpO1xuICAgICAgICAgIHhockRhdGEuZXJyb3JzLnB1c2goXG4gICAgICAgICAgICBgJHtsaW5rfTogJHskLmkxOG4oJ2FwaS1lcnJvcicsICdQYWdldmlld3MgQVBJJyl9IC0gJHtlcnJvckRhdGEucmVzcG9uc2VKU09OLnRpdGxlfWBcbiAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICB9KS5hbHdheXMoKCkgPT4ge1xuICAgICAgICBpZiAoKytjb3VudCA9PT0gdG90YWxSZXF1ZXN0Q291bnQpIHtcbiAgICAgICAgICB0aGlzLnBhZ2VWaWV3c0RhdGEgPSB4aHJEYXRhO1xuICAgICAgICAgIGRmZC5yZXNvbHZlKHhockRhdGEpO1xuXG4gICAgICAgICAgaWYgKGZhaWxlZEVudGl0aWVzLmxlbmd0aCkge1xuICAgICAgICAgICAgdGhpcy53cml0ZU1lc3NhZ2UoJC5pMThuKFxuICAgICAgICAgICAgICAnYXBpLWVycm9yLXRpbWVvdXQnLFxuICAgICAgICAgICAgICAnPHVsPicgK1xuICAgICAgICAgICAgICBmYWlsZWRFbnRpdGllcy5tYXAoZmFpbGVkRW50aXR5ID0+IGA8bGk+JHt0aGlzLmdldFBhZ2VMaW5rKGZhaWxlZEVudGl0eSwgdGhpcy5wcm9qZWN0LmVzY2FwZSgpKX08L2xpPmApLmpvaW4oJycpICtcbiAgICAgICAgICAgICAgJzwvdWw+J1xuICAgICAgICAgICAgKSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9O1xuXG4gICAgZW50aXRpZXMuZm9yRWFjaCgoZW50aXR5LCBpbmRleCkgPT4gbWFrZVJlcXVlc3QoZW50aXR5LCBpbmRleCkpO1xuXG4gICAgcmV0dXJuIGRmZDtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgcGFyYW1zIG5lZWRlZCB0byBjcmVhdGUgYSBwZXJtYW5lbnQgbGluayBvZiB2aXNpYmxlIGRhdGFcbiAgICogQHJldHVybiB7T2JqZWN0fSBoYXNoIG9mIHBhcmFtc1xuICAgKi9cbiAgZ2V0UGVybWFMaW5rKCkge1xuICAgIGxldCBwYXJhbXMgPSB0aGlzLmdldFBhcmFtcyhmYWxzZSk7XG4gICAgZGVsZXRlIHBhcmFtcy5yYW5nZTtcbiAgICByZXR1cm4gcGFyYW1zO1xuICB9XG5cbiAgLyoqXG4gICAqIEFyZSB3ZSBjdXJyZW50bHkgaW4gbG9nYXJpdGhtaWMgbW9kZT9cbiAgICogQHJldHVybnMge0Jvb2xlYW59IHRydWUgb3IgZmFsc2VcbiAgICovXG4gIGlzTG9nYXJpdGhtaWMoKSB7XG4gICAgcmV0dXJuICQodGhpcy5jb25maWcubG9nYXJpdGhtaWNDaGVja2JveCkuaXMoJzpjaGVja2VkJykgJiYgdGhpcy5pc0xvZ2FyaXRobWljQ2FwYWJsZSgpO1xuICB9XG5cbiAgLyoqXG4gICAqIFRlc3QgaWYgdGhlIGN1cnJlbnQgY2hhcnQgdHlwZSBzdXBwb3J0cyBhIGxvZ2FyaXRobWljIHNjYWxlXG4gICAqIEByZXR1cm5zIHtCb29sZWFufSBsb2ctZnJpZW5kbHkgb3Igbm90XG4gICAqL1xuICBpc0xvZ2FyaXRobWljQ2FwYWJsZSgpIHtcbiAgICByZXR1cm4gWydsaW5lJywgJ2JhciddLmluY2x1ZGVzKHRoaXMuY2hhcnRUeXBlKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBcmUgd2UgdHJ5aW5nIHRvIHNob3cgZGF0YSBvbiBwYWdldmlld3MgKGFzIG9wcG9zZWQgdG8gdW5pcXVlIGRldmljZXMpP1xuICAgKiBAcmV0dXJuIHtCb29sZWFufSB0cnVlIG9yIGZhbHNlXG4gICAqL1xuICBpc1BhZ2V2aWV3cygpIHtcbiAgICByZXR1cm4gdGhpcy5hcHAgPT09ICdwYWdldmlld3MnIHx8ICQodGhpcy5jb25maWcuZGF0YVNvdXJjZVNlbGVjdG9yKS52YWwoKSA9PT0gJ3BhZ2V2aWV3cyc7XG4gIH1cblxuICAvKipcbiAgICogQXJlIHdlIHRyeWluZyB0byBzaG93IGRhdGEgb24gcGFnZXZpZXdzIChhcyBvcHBvc2VkIHRvIHVuaXF1ZSBkZXZpY2VzKT9cbiAgICogQHJldHVybiB7Qm9vbGVhbn0gdHJ1ZSBvciBmYWxzZVxuICAgKi9cbiAgaXNVbmlxdWVEZXZpY2VzKCkge1xuICAgIHJldHVybiAhdGhpcy5pc1BhZ2V2aWV3cygpO1xuICB9XG5cbiAgLyoqXG4gICAqIFByaW50IHRoZSBjaGFydCFcbiAgICogQHJldHVybnMge251bGx9IE5vdGhpbmdcbiAgICovXG4gIHByaW50Q2hhcnQoKSB7XG4gICAgbGV0IHRhYiA9IHdpbmRvdy5vcGVuKCk7XG4gICAgdGFiLmRvY3VtZW50LndyaXRlKFxuICAgICAgYDxpbWcgc3JjPVwiJHt0aGlzLmNoYXJ0T2JqLnRvQmFzZTY0SW1hZ2UoKX1cIiAvPmBcbiAgICApO1xuICAgIHRhYi5wcmludCgpO1xuICAgIHRhYi5jbG9zZSgpO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlbW92ZXMgY2hhcnQsIG1lc3NhZ2VzLCBhbmQgcmVzZXRzIHNpdGUgc2VsZWN0aW9uc1xuICAgKiBAcGFyYW0ge2Jvb2xlYW59IFtzZWxlY3QyXSB3aGV0aGVyIG9yIG5vdCB0byBjbGVhciB0aGUgU2VsZWN0MiBpbnB1dFxuICAgKiBAcmV0dXJucyB7bnVsbH0gbm90aGluZ1xuICAgKi9cbiAgcmVzZXRWaWV3KHNlbGVjdDIgPSBmYWxzZSkge1xuICAgIHRyeSB7XG4gICAgICAvKiogdGhlc2UgY2FuIGZhaWwgc29tZXRpbWVzICovXG4gICAgICB0aGlzLmRlc3Ryb3lDaGFydCgpO1xuICAgICAgaWYgKHNlbGVjdDIpIHRoaXMucmVzZXRTZWxlY3QyKCk7XG4gICAgfSBjYXRjaCAoZSkgeyAvLyBub3RoaW5nXG4gICAgfSBmaW5hbGx5IHtcbiAgICAgIHRoaXMuc3RvcFNwaW5ueSgpO1xuICAgICAgJCgnLmRhdGEtbGlua3MnKS5hZGRDbGFzcygnaW52aXNpYmxlJyk7XG4gICAgICAkKHRoaXMuY29uZmlnLmNoYXJ0KS5oaWRlKCk7XG4gICAgICB0aGlzLmNsZWFyTWVzc2FnZXMoKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQXR0ZW1wdCB0byBmaW5lLXR1bmUgdGhlIHBvaW50ZXIgZGV0ZWN0aW9uIHNwYWNpbmcgYmFzZWQgb24gaG93IGNsdXR0ZXJlZCB0aGUgY2hhcnQgaXNcbiAgICogQHJldHVybnMge051bWJlcn0gcmFkaXVzXG4gICAqL1xuICBzZXRDaGFydFBvaW50RGV0ZWN0aW9uUmFkaXVzKCkge1xuICAgIGlmICh0aGlzLmNoYXJ0VHlwZSAhPT0gJ2xpbmUnKSByZXR1cm47XG5cbiAgICBpZiAodGhpcy5udW1EYXlzSW5SYW5nZSgpID4gNTApIHtcbiAgICAgIENoYXJ0LmRlZmF1bHRzLmdsb2JhbC5lbGVtZW50cy5wb2ludC5oaXRSYWRpdXMgPSAzO1xuICAgIH0gZWxzZSBpZiAodGhpcy5udW1EYXlzSW5SYW5nZSgpID4gMzApIHtcbiAgICAgIENoYXJ0LmRlZmF1bHRzLmdsb2JhbC5lbGVtZW50cy5wb2ludC5oaXRSYWRpdXMgPSA1O1xuICAgIH0gZWxzZSBpZiAodGhpcy5udW1EYXlzSW5SYW5nZSgpID4gMjApIHtcbiAgICAgIENoYXJ0LmRlZmF1bHRzLmdsb2JhbC5lbGVtZW50cy5wb2ludC5oaXRSYWRpdXMgPSAxMDtcbiAgICB9IGVsc2Uge1xuICAgICAgQ2hhcnQuZGVmYXVsdHMuZ2xvYmFsLmVsZW1lbnRzLnBvaW50LmhpdFJhZGl1cyA9IDMwO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBEZXRlcm1pbmUgaWYgd2Ugc2hvdWxkIHNob3cgYSBsb2dhcml0aG1pYyBjaGFydCBmb3IgdGhlIGdpdmVuIGRhdGFzZXQsIGJhc2VkIG9uIFRoZWlsIGluZGV4XG4gICAqIEBwYXJhbSAge0FycmF5fSBkYXRhc2V0cyAtIHBhZ2V2aWV3c1xuICAgKiBAcmV0dXJuIHtCb29sZWFufSB5ZXMgb3Igbm9cbiAgICovXG4gIHNob3VsZEJlTG9nYXJpdGhtaWMoZGF0YXNldHMpIHtcbiAgICBpZiAoIXRoaXMuaXNMb2dhcml0aG1pY0NhcGFibGUoKSB8fCB0aGlzLm5vTG9nU2NhbGUpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBsZXQgc2V0cyA9IFtdO1xuICAgIC8vIGNvbnZlcnQgTmFOcyBhbmQgbnVsbHMgdG8gemVyb3NcbiAgICBkYXRhc2V0cy5mb3JFYWNoKGRhdGFzZXQgPT4ge1xuICAgICAgc2V0cy5wdXNoKGRhdGFzZXQubWFwKHZhbCA9PiB2YWwgfHwgMCkpO1xuICAgIH0pO1xuXG4gICAgLy8gb3ZlcmFsbCBtYXggdmFsdWVcbiAgICBjb25zdCBtYXhWYWx1ZSA9IE1hdGgubWF4KC4uLltdLmNvbmNhdCguLi5zZXRzKSk7XG5cbiAgICBpZiAobWF4VmFsdWUgPD0gMTApIHJldHVybiBmYWxzZTtcblxuICAgIGxldCBsb2dhcml0aG1pY05lZWRlZCA9IGZhbHNlO1xuXG4gICAgc2V0cy5mb3JFYWNoKHNldCA9PiB7XG4gICAgICBzZXQucHVzaChtYXhWYWx1ZSk7XG5cbiAgICAgIGNvbnN0IHN1bSA9IHNldC5yZWR1Y2UoKGEsIGIpID0+IGEgKyBiKSxcbiAgICAgICAgYXZlcmFnZSA9IHN1bSAvIHNldC5sZW5ndGg7XG4gICAgICBsZXQgdGhlaWwgPSAwO1xuICAgICAgc2V0LmZvckVhY2godiA9PiB0aGVpbCArPSB2ID8gdiAqIE1hdGgubG9nKHYgLyBhdmVyYWdlKSA6IDApO1xuXG4gICAgICBpZiAodGhlaWwgLyBzdW0gPiAwLjUpIHtcbiAgICAgICAgcmV0dXJuIGxvZ2FyaXRobWljTmVlZGVkID0gdHJ1ZTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHJldHVybiBsb2dhcml0aG1pY05lZWRlZDtcbiAgfVxuXG4gIC8qKlxuICAgKiBzZXRzIHVwIHRoZSBkYXRlcmFuZ2Ugc2VsZWN0b3IgYW5kIGFkZHMgbGlzdGVuZXJzXG4gICAqIEByZXR1cm5zIHtudWxsfSAtIG5vdGhpbmdcbiAgICovXG4gIHNldHVwRGF0ZVJhbmdlU2VsZWN0b3IoKSB7XG4gICAgc3VwZXIuc2V0dXBEYXRlUmFuZ2VTZWxlY3RvcigpO1xuXG4gICAgLyoqIHByZXZlbnQgZHVwbGljYXRlIHNldHVwIHNpbmNlIHRoZSBsaXN0IHZpZXcgYXBwcyBhbHNvIHVzZSBjaGFydHMgKi9cbiAgICBpZiAoIXRoaXMuaXNDaGFydEFwcCgpKSByZXR1cm47XG5cbiAgICBjb25zdCBkYXRlUmFuZ2VTZWxlY3RvciA9ICQodGhpcy5jb25maWcuZGF0ZVJhbmdlU2VsZWN0b3IpO1xuXG4gICAgLyoqIHRoZSBcIkxhdGVzdCBOIGRheXNcIiBsaW5rcyAqL1xuICAgICQoJy5kYXRlLWxhdGVzdCBhJykub24oJ2NsaWNrJywgZSA9PiB7XG4gICAgICB0aGlzLnNldFNwZWNpYWxSYW5nZShgbGF0ZXN0LSR7JChlLnRhcmdldCkuZGF0YSgndmFsdWUnKX1gKTtcbiAgICB9KTtcblxuICAgIGRhdGVSYW5nZVNlbGVjdG9yLm9uKCdjaGFuZ2UnLCBlID0+IHtcbiAgICAgIHRoaXMuc2V0Q2hhcnRQb2ludERldGVjdGlvblJhZGl1cygpO1xuICAgICAgdGhpcy5wcm9jZXNzSW5wdXQoKTtcblxuICAgICAgLyoqIGNsZWFyIG91dCBzcGVjaWFsUmFuZ2UgaWYgaXQgZG9lc24ndCBtYXRjaCBvdXIgaW5wdXQgKi9cbiAgICAgIGlmICh0aGlzLnNwZWNpYWxSYW5nZSAmJiB0aGlzLnNwZWNpYWxSYW5nZS52YWx1ZSAhPT0gZS50YXJnZXQudmFsdWUpIHtcbiAgICAgICAgdGhpcy5zcGVjaWFsUmFuZ2UgPSBudWxsO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIFVwZGF0ZSB0aGUgY2hhcnQgd2l0aCBkYXRhIHByb3ZpZGVkIGJ5IHByb2Nlc3NJbnB1dCgpXG4gICAqIEBwYXJhbSB7T2JqZWN0fSB4aHJEYXRhIC0gZGF0YSBhcyBjb25zdHJ1Y3RlZCBieSBwcm9jZXNzSW5wdXQoKVxuICAgKiBAcmV0dXJucyB7bnVsbH0gLSBub3RoaW5cbiAgICovXG4gIHVwZGF0ZUNoYXJ0KHhockRhdGEpIHtcbiAgICAkKCcuY2hhcnQtbGVnZW5kJykuaHRtbCgnJyk7IC8vIGNsZWFyIG9sZCBjaGFydCBsZWdlbmRcblxuICAgIC8vIHNob3cgcGVuZGluZyBlcnJvciBtZXNzYWdlcyBpZiBwcmVzZW50LCBleGl0aW5nIGlmIGZhdGFsXG4gICAgaWYgKHRoaXMuc2hvd0Vycm9ycyh4aHJEYXRhKSkgcmV0dXJuO1xuXG4gICAgaWYgKCF4aHJEYXRhLmVudGl0aWVzLmxlbmd0aCkge1xuICAgICAgcmV0dXJuIHRoaXMuc3RvcFNwaW5ueSgpO1xuICAgIH0gZWxzZSBpZiAoeGhyRGF0YS5lbnRpdGllcy5sZW5ndGggPT09IDEpIHtcbiAgICAgICQoJy5tdWx0aS1wYWdlLWNoYXJ0LW5vZGUnKS5oaWRlKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgICQoJy5tdWx0aS1wYWdlLWNoYXJ0LW5vZGUnKS5zaG93KCk7XG4gICAgfVxuXG4gICAgdGhpcy5vdXRwdXREYXRhID0gdGhpcy5idWlsZENoYXJ0RGF0YSh4aHJEYXRhLmRhdGFzZXRzLCB4aHJEYXRhLmVudGl0aWVzKTtcblxuICAgIGlmICh0aGlzLmF1dG9Mb2dEZXRlY3Rpb24gPT09ICd0cnVlJykge1xuICAgICAgY29uc3Qgc2hvdWxkQmVMb2dhcml0aG1pYyA9IHRoaXMuc2hvdWxkQmVMb2dhcml0aG1pYyh0aGlzLm91dHB1dERhdGEubWFwKHNldCA9PiBzZXQuZGF0YSkpO1xuICAgICAgJCh0aGlzLmNvbmZpZy5sb2dhcml0aG1pY0NoZWNrYm94KS5wcm9wKCdjaGVja2VkJywgc2hvdWxkQmVMb2dhcml0aG1pYyk7XG4gICAgICAkKCcuYmVnaW4tYXQtemVybycpLnRvZ2dsZUNsYXNzKCdkaXNhYmxlZCcsIHNob3VsZEJlTG9nYXJpdGhtaWMpO1xuICAgIH1cblxuICAgIGxldCBvcHRpb25zID0gT2JqZWN0LmFzc2lnbihcbiAgICAgIHtzY2FsZXM6IHt9fSxcbiAgICAgIHRoaXMuY29uZmlnLmNoYXJ0Q29uZmlnW3RoaXMuY2hhcnRUeXBlXS5vcHRzLFxuICAgICAgdGhpcy5jb25maWcuZ2xvYmFsQ2hhcnRPcHRzXG4gICAgKTtcblxuICAgIGlmICh0aGlzLmlzTG9nYXJpdGhtaWMoKSkge1xuICAgICAgb3B0aW9ucy5zY2FsZXMgPSBPYmplY3QuYXNzaWduKHt9LCBvcHRpb25zLnNjYWxlcywge1xuICAgICAgICB5QXhlczogW3tcbiAgICAgICAgICB0eXBlOiAnbG9nYXJpdGhtaWMnLFxuICAgICAgICAgIHRpY2tzOiB7XG4gICAgICAgICAgICBjYWxsYmFjazogKHZhbHVlLCBpbmRleCwgYXJyKSA9PiB7XG4gICAgICAgICAgICAgIGNvbnN0IHJlbWFpbiA9IHZhbHVlIC8gKE1hdGgucG93KDEwLCBNYXRoLmZsb29yKENoYXJ0LmhlbHBlcnMubG9nMTAodmFsdWUpKSkpO1xuXG4gICAgICAgICAgICAgIGlmIChyZW1haW4gPT09IDEgfHwgcmVtYWluID09PSAyIHx8IHJlbWFpbiA9PT0gNSB8fCBpbmRleCA9PT0gMCB8fCBpbmRleCA9PT0gYXJyLmxlbmd0aCAtIDEpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5mb3JtYXROdW1iZXIodmFsdWUpO1xuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHJldHVybiAnJztcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfV1cbiAgICAgIH0pO1xuICAgIH1cblxuICAgIHRoaXMuc3RvcFNwaW5ueSgpO1xuXG4gICAgdHJ5IHtcbiAgICAgICQoJy5jaGFydC1jb250YWluZXInKS5odG1sKCcnKS5hcHBlbmQoXCI8Y2FudmFzIGNsYXNzPSdhcXMtY2hhcnQnPlwiKTtcbiAgICAgIHRoaXMuc2V0Q2hhcnRQb2ludERldGVjdGlvblJhZGl1cygpO1xuICAgICAgY29uc3QgY29udGV4dCA9ICQodGhpcy5jb25maWcuY2hhcnQpWzBdLmdldENvbnRleHQoJzJkJyk7XG5cbiAgICAgIGlmICh0aGlzLmNvbmZpZy5saW5lYXJDaGFydHMuaW5jbHVkZXModGhpcy5jaGFydFR5cGUpKSB7XG4gICAgICAgIGNvbnN0IGxpbmVhckRhdGEgPSB7bGFiZWxzOiB4aHJEYXRhLmxhYmVscywgZGF0YXNldHM6IHRoaXMub3V0cHV0RGF0YX07XG5cbiAgICAgICAgaWYgKHRoaXMuY2hhcnRUeXBlID09PSAncmFkYXInKSB7XG4gICAgICAgICAgb3B0aW9ucy5zY2FsZS50aWNrcy5iZWdpbkF0WmVybyA9ICQoJy5iZWdpbi1hdC16ZXJvLW9wdGlvbicpLmlzKCc6Y2hlY2tlZCcpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIG9wdGlvbnMuc2NhbGVzLnlBeGVzWzBdLnRpY2tzLmJlZ2luQXRaZXJvID0gJCgnLmJlZ2luLWF0LXplcm8tb3B0aW9uJykuaXMoJzpjaGVja2VkJyk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmNoYXJ0T2JqID0gbmV3IENoYXJ0KGNvbnRleHQsIHtcbiAgICAgICAgICB0eXBlOiB0aGlzLmNoYXJ0VHlwZSxcbiAgICAgICAgICBkYXRhOiBsaW5lYXJEYXRhLFxuICAgICAgICAgIG9wdGlvbnNcbiAgICAgICAgfSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLmNoYXJ0T2JqID0gbmV3IENoYXJ0KGNvbnRleHQsIHtcbiAgICAgICAgICB0eXBlOiB0aGlzLmNoYXJ0VHlwZSxcbiAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICBsYWJlbHM6IHRoaXMub3V0cHV0RGF0YS5tYXAoZCA9PiBkLmxhYmVsKSxcbiAgICAgICAgICAgIGRhdGFzZXRzOiBbe1xuICAgICAgICAgICAgICBkYXRhOiB0aGlzLm91dHB1dERhdGEubWFwKGQgPT4gZC52YWx1ZSksXG4gICAgICAgICAgICAgIGJhY2tncm91bmRDb2xvcjogdGhpcy5vdXRwdXREYXRhLm1hcChkID0+IGQuYmFja2dyb3VuZENvbG9yKSxcbiAgICAgICAgICAgICAgaG92ZXJCYWNrZ3JvdW5kQ29sb3I6IHRoaXMub3V0cHV0RGF0YS5tYXAoZCA9PiBkLmhvdmVyQmFja2dyb3VuZENvbG9yKSxcbiAgICAgICAgICAgICAgYXZlcmFnZXM6IHRoaXMub3V0cHV0RGF0YS5tYXAoZCA9PiBkLmF2ZXJhZ2UpXG4gICAgICAgICAgICB9XVxuICAgICAgICAgIH0sXG4gICAgICAgICAgb3B0aW9uc1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIHJldHVybiB0aGlzLnNob3dFcnJvcnMoe1xuICAgICAgICBlcnJvcnM6IFtdLFxuICAgICAgICBmYXRhbEVycm9yczogW2Vycl1cbiAgICAgIH0pO1xuICAgIH1cblxuICAgICQoJy5jaGFydC1sZWdlbmQnKS5odG1sKHRoaXMuY2hhcnRPYmouZ2VuZXJhdGVMZWdlbmQoKSk7XG4gICAgJCgnLmRhdGEtbGlua3MnKS5yZW1vdmVDbGFzcygnaW52aXNpYmxlJyk7XG5cbiAgICBpZiAodGhpcy5hcHAgPT09ICdwYWdldmlld3MnKSB0aGlzLnVwZGF0ZVRhYmxlKCk7XG4gIH1cblxuICAvKipcbiAgICogU2hvdyBlcnJvcnMgYnVpbHQgaW4gdGhpcy5wcm9jZXNzSW5wdXRcbiAgICogQHBhcmFtIHtvYmplY3R9IHhockRhdGEgLSBhcyBidWlsdCBieSB0aGlzLnByb2Nlc3NJbnB1dCwgbGlrZSBgeyBlcnJvcnM6IFtdLCBmYXRhbEVycm9yczogW10gfWBcbiAgICogQHJldHVybnMge2Jvb2xlYW59IHdoZXRoZXIgb3Igbm90IGZhdGFsIGVycm9ycyBvY2N1cmVkXG4gICAqL1xuICBzaG93RXJyb3JzKHhockRhdGEpIHtcbiAgICBpZiAoeGhyRGF0YS5mYXRhbEVycm9ycy5sZW5ndGgpIHtcbiAgICAgIHRoaXMucmVzZXRWaWV3KHRydWUpO1xuICAgICAgY29uc3QgZmF0YWxFcnJvcnMgPSB4aHJEYXRhLmZhdGFsRXJyb3JzLnVuaXF1ZSgpO1xuICAgICAgdGhpcy5zaG93RmF0YWxFcnJvcnMoZmF0YWxFcnJvcnMpO1xuXG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICBpZiAoeGhyRGF0YS5lcnJvcnMubGVuZ3RoKSB7XG4gICAgICAvLyBpZiBldmVyeXRoaW5nIGZhaWxlZCwgcmVzZXQgdGhlIHZpZXcsIGNsZWFyaW5nIG91dCBzcGFjZSB0YWtlbiB1cCBieSBlbXB0eSBjaGFydFxuICAgICAgaWYgKHhockRhdGEuZW50aXRpZXMgJiYgKHhockRhdGEuZXJyb3JzLmxlbmd0aCA9PT0geGhyRGF0YS5lbnRpdGllcy5sZW5ndGggfHwgIXhockRhdGEuZW50aXRpZXMubGVuZ3RoKSkge1xuICAgICAgICB0aGlzLnJlc2V0VmlldygpO1xuICAgICAgfVxuXG4gICAgICB4aHJEYXRhLmVycm9ycy51bmlxdWUoKS5mb3JFYWNoKGVycm9yID0+IHRoaXMud3JpdGVNZXNzYWdlKGVycm9yKSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IENoYXJ0SGVscGVycztcbiIsIi8qKlxuICogQGZpbGUgQ29yZSBKYXZhU2NyaXB0IGV4dGVuc2lvbnMsIGVpdGhlciB0byBuYXRpdmUgSlMgb3IgYSBsaWJyYXJ5LlxuICogICBQb2x5ZmlsbHMgaGF2ZSB0aGVpciBvd24gZmlsZSBbcG9seWZpbGxzLmpzXShnbG9iYWwuaHRtbCNwb2x5ZmlsbHMpXG4gKiBAYXV0aG9yIE11c2lrQW5pbWFsXG4gKiBAY29weXJpZ2h0IDIwMTYgTXVzaWtBbmltYWxcbiAqIEBsaWNlbnNlIE1JVCBMaWNlbnNlOiBodHRwczovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL01JVFxuICovXG5cblN0cmluZy5wcm90b3R5cGUuZGVzY29yZSA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gdGhpcy5yZXBsYWNlKC9fL2csICcgJyk7XG59O1xuU3RyaW5nLnByb3RvdHlwZS5zY29yZSA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gdGhpcy5yZXBsYWNlKC8gL2csICdfJyk7XG59O1xuU3RyaW5nLnByb3RvdHlwZS51cGNhc2UgPSBmdW5jdGlvbigpIHtcbiAgcmV0dXJuIHRoaXMuY2hhckF0KDApLnRvVXBwZXJDYXNlKCkgKyB0aGlzLnNsaWNlKDEpO1xufTtcblN0cmluZy5wcm90b3R5cGUuZXNjYXBlID0gZnVuY3Rpb24oKSB7XG4gIGNvbnN0IGVudGl0eU1hcCA9IHtcbiAgICAnJic6ICcmYW1wOycsXG4gICAgJzwnOiAnJmx0OycsXG4gICAgJz4nOiAnJmd0OycsXG4gICAgJ1wiJzogJyZxdW90OycsXG4gICAgXCInXCI6ICcmIzM5OycsXG4gICAgJy8nOiAnJiN4MkY7J1xuICB9O1xuXG4gIHJldHVybiB0aGlzLnJlcGxhY2UoL1smPD5cIidcXC9dL2csIHMgPT4ge1xuICAgIHJldHVybiBlbnRpdHlNYXBbc107XG4gIH0pO1xufTtcblxuLy8gcmVtb3ZlIGR1cGxpY2F0ZSB2YWx1ZXMgZnJvbSBBcnJheVxuQXJyYXkucHJvdG90eXBlLnVuaXF1ZSA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gdGhpcy5maWx0ZXIoZnVuY3Rpb24odmFsdWUsIGluZGV4LCBhcnJheSkge1xuICAgIHJldHVybiBhcnJheS5pbmRleE9mKHZhbHVlKSA9PT0gaW5kZXg7XG4gIH0pO1xufTtcblxuLy8gSW1wcm92ZSBzeW50YXggdG8gZW11bGF0ZSBtaXhpbnMgaW4gRVM2XG53aW5kb3cubWl4ID0gc3VwZXJjbGFzcyA9PiBuZXcgTWl4aW5CdWlsZGVyKHN1cGVyY2xhc3MpO1xuY2xhc3MgTWl4aW5CdWlsZGVyIHtcbiAgY29uc3RydWN0b3Ioc3VwZXJjbGFzcykge1xuICAgIHRoaXMuc3VwZXJjbGFzcyA9IHN1cGVyY2xhc3M7XG4gIH1cblxuICB3aXRoKC4uLm1peGlucykge1xuICAgIHJldHVybiBtaXhpbnMucmVkdWNlKChjLCBtaXhpbikgPT4gbWl4aW4oYyksIHRoaXMuc3VwZXJjbGFzcyk7XG4gIH1cbn1cblxuLypcbiAqIEhPVCBQQVRDSCBmb3IgQ2hhcnQuanMgZ2V0RWxlbWVudHNBdEV2ZW50XG4gKiBodHRwczovL2dpdGh1Yi5jb20vY2hhcnRqcy9DaGFydC5qcy9pc3N1ZXMvMjI5OVxuICogVE9ETzogcmVtb3ZlIG1lIHdoZW4gdGhpcyBnZXRzIGltcGxlbWVudGVkIGludG8gQ2hhcnRzLmpzIGNvcmVcbiAqL1xuaWYgKHR5cGVvZiBDaGFydCAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgQ2hhcnQuQ29udHJvbGxlci5wcm90b3R5cGUuZ2V0RWxlbWVudHNBdEV2ZW50ID0gZnVuY3Rpb24oZSkge1xuICAgIGxldCBoZWxwZXJzID0gQ2hhcnQuaGVscGVycztcbiAgICBsZXQgZXZlbnRQb3NpdGlvbiA9IGhlbHBlcnMuZ2V0UmVsYXRpdmVQb3NpdGlvbihlLCB0aGlzLmNoYXJ0KTtcbiAgICBsZXQgZWxlbWVudHNBcnJheSA9IFtdO1xuXG4gICAgbGV0IGZvdW5kID0gKGZ1bmN0aW9uKCkge1xuICAgICAgaWYgKHRoaXMuZGF0YS5kYXRhc2V0cykge1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuZGF0YS5kYXRhc2V0cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgIGNvbnN0IGtleSA9IE9iamVjdC5rZXlzKHRoaXMuZGF0YS5kYXRhc2V0c1tpXS5fbWV0YSlbMF07XG4gICAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCB0aGlzLmRhdGEuZGF0YXNldHNbaV0uX21ldGFba2V5XS5kYXRhLmxlbmd0aDsgaisrKSB7XG4gICAgICAgICAgICAvKiBlc2xpbnQtZGlzYWJsZSBtYXgtZGVwdGggKi9cbiAgICAgICAgICAgIGlmICh0aGlzLmRhdGEuZGF0YXNldHNbaV0uX21ldGFba2V5XS5kYXRhW2pdLmluTGFiZWxSYW5nZShldmVudFBvc2l0aW9uLngsIGV2ZW50UG9zaXRpb24ueSkpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZGF0YS5kYXRhc2V0c1tpXS5fbWV0YVtrZXldLmRhdGFbal07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSkuY2FsbCh0aGlzKTtcblxuICAgIGlmICghZm91bmQpIHtcbiAgICAgIHJldHVybiBlbGVtZW50c0FycmF5O1xuICAgIH1cblxuICAgIGhlbHBlcnMuZWFjaCh0aGlzLmRhdGEuZGF0YXNldHMsIGZ1bmN0aW9uKGRhdGFzZXQsIGRzSW5kZXgpIHtcbiAgICAgIGNvbnN0IGtleSA9IE9iamVjdC5rZXlzKGRhdGFzZXQuX21ldGEpWzBdO1xuICAgICAgZWxlbWVudHNBcnJheS5wdXNoKGRhdGFzZXQuX21ldGFba2V5XS5kYXRhW2ZvdW5kLl9pbmRleF0pO1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIGVsZW1lbnRzQXJyYXk7XG4gIH07XG59XG5cbiQud2hlbkFsbCA9IGZ1bmN0aW9uKCkge1xuICBsZXQgZGZkID0gJC5EZWZlcnJlZCgpLFxuICAgIGNvdW50ZXIgPSAwLFxuICAgIHN0YXRlID0gJ3Jlc29sdmVkJyxcbiAgICBwcm9taXNlcyA9IG5ldyBBcnJheSguLi5hcmd1bWVudHMpO1xuXG4gIGNvbnN0IHJlc29sdmVPclJlamVjdCA9IGZ1bmN0aW9uKCkge1xuICAgIGlmICh0aGlzLnN0YXRlID09PSAncmVqZWN0ZWQnKSB7XG4gICAgICBzdGF0ZSA9ICdyZWplY3RlZCc7XG4gICAgfVxuICAgIGNvdW50ZXIrKztcblxuICAgIGlmIChjb3VudGVyID09PSBwcm9taXNlcy5sZW5ndGgpIHtcbiAgICAgIGRmZFtzdGF0ZSA9PT0gJ3JlamVjdGVkJyA/ICdyZWplY3QnIDogJ3Jlc29sdmUnXSgpO1xuICAgIH1cblxuICB9O1xuXG4gICQuZWFjaChwcm9taXNlcywgKF9pLCBwcm9taXNlKSA9PiB7XG4gICAgcHJvbWlzZS5hbHdheXMocmVzb2x2ZU9yUmVqZWN0KTtcbiAgfSk7XG5cbiAgcmV0dXJuIGRmZC5wcm9taXNlKCk7XG59O1xuIiwiLyoqXG4gKiBAZmlsZSBTaGFyZWQgbGlzdC1zcGVjaWZpYyBsb2dpY1xuICogQGF1dGhvciBNdXNpa0FuaW1hbFxuICogQGNvcHlyaWdodCAyMDE2IE11c2lrQW5pbWFsXG4gKiBAbGljZW5zZSBNSVQgTGljZW5zZTogaHR0cHM6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9NSVRcbiAqL1xuXG4vKipcbiAqIFNoYXJlZCBsaXN0LXNwZWNpZmljIGxvZ2ljXG4gKiBAcGFyYW0ge2NsYXNzfSBzdXBlcmNsYXNzIC0gYmFzZSBjbGFzc1xuICogQHJldHVybnMge251bGx9IGNsYXNzIGV4dGVuZGluZyBzdXBlcmNsYXNzXG4gKi9cbmNvbnN0IExpc3RIZWxwZXJzID0gc3VwZXJjbGFzcyA9PiBjbGFzcyBleHRlbmRzIHN1cGVyY2xhc3Mge1xuICBjb25zdHJ1Y3RvcihhcHBDb25maWcpIHtcbiAgICBzdXBlcihhcHBDb25maWcpO1xuICB9XG5cbiAgLyoqXG4gICAqIFByZXBhcmUgY2hhcnQgb3B0aW9ucyBiZWZvcmUgc2hvd2luZyBjaGFydCB2aWV3LCBiYXNlZCBvbiBjdXJyZW50IGNoYXJ0IHR5cGVcbiAgICogQHJldHVybiB7bnVsbH0gTm90aGluZ1xuICAgKi9cbiAgYXNzaWduT3V0cHV0RGF0YUNoYXJ0T3B0cygpIHtcbiAgICBjb25zdCBjb2xvciA9IHRoaXMuY29uZmlnLmNvbG9yc1swXTtcbiAgICBPYmplY3QuYXNzaWduKHRoaXMub3V0cHV0RGF0YS5kYXRhc2V0c1swXSwgdGhpcy5jb25maWcuY2hhcnRDb25maWdbdGhpcy5jaGFydFR5cGVdLmRhdGFzZXQoY29sb3IpKTtcblxuICAgIGlmICh0aGlzLmNoYXJ0VHlwZSA9PT0gJ2xpbmUnKSB7XG4gICAgICB0aGlzLm91dHB1dERhdGEuZGF0YXNldHNbMF0uZmlsbENvbG9yID0gY29sb3IucmVwbGFjZSgvLFxccypcXGRcXCkvLCAnLCAwLjIpJyk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEV4cG9ydHMgY3VycmVudCBsYW5nIGRhdGEgdG8gSlNPTiBmb3JtYXQgYW5kIGxvYWRzIGl0IGluIGEgbmV3IHRhYlxuICAgKiBAcmV0dXJucyB7bnVsbH0gTm90aGluZ1xuICAgKi9cbiAgZXhwb3J0SlNPTigpIHtcbiAgICBjb25zdCBqc29uQ29udGVudCA9ICdkYXRhOnRleHQvanNvbjtjaGFyc2V0PXV0Zi04LCcgKyBKU09OLnN0cmluZ2lmeSh0aGlzLm91dHB1dERhdGEubGlzdERhdGEpO1xuICAgIHRoaXMuZG93bmxvYWREYXRhKGpzb25Db250ZW50LCAnanNvbicpO1xuICB9XG5cbiAgLyoqXG4gICAqIEZpbGxzIGluIHplcm9zIHRvIGEgdGltZXNlcmllcywgc2VlOlxuICAgKiBodHRwczovL3dpa2l0ZWNoLndpa2ltZWRpYS5vcmcvd2lraS9BbmFseXRpY3MvQVFTL1BhZ2V2aWV3X0FQSSNHb3RjaGFzXG4gICAqXG4gICAqIEBwYXJhbSB7b2JqZWN0fSBpdGVtcyAtIGVudHJpZXMgZmV0Y2hlZCBmcm9tIFBhZ2V2aWV3cyBBUElcbiAgICogQHBhcmFtIHttb21lbnR9IHN0YXJ0RGF0ZSAtIHN0YXJ0IGRhdGUgb2YgcmFuZ2UgdG8gZmlsdGVyIHRocm91Z2hcbiAgICogQHBhcmFtIHttb21lbnR9IGVuZERhdGUgLSBlbmQgZGF0ZSBvZiByYW5nZVxuICAgKiBAcmV0dXJucyB7YXJyYXl9IDAgPSBkYXRhc2V0IHdpdGggemVyb3Mgd2hlcmUgbnVsbHMgd2VyZSxcbiAgICogICAxID0gZGF0ZXMgdGhhdCBtZXQgdGhlIGVkZ2UgY2FzZSwgbWVhbmluZyBkYXRhIGlzIG5vdCB5ZXQgYXZhaWxhYmxlXG4gICAqL1xuICBmaWxsSW5aZXJvcyhpdGVtcywgc3RhcnREYXRlLCBlbmREYXRlKSB7XG4gICAgLyoqIEV4dHJhY3QgdGhlIGRhdGVzIHRoYXQgYXJlIGFscmVhZHkgaW4gdGhlIHRpbWVzZXJpZXMgKi9cbiAgICBsZXQgYWxyZWFkeVRoZXJlID0ge307XG4gICAgaXRlbXMuZm9yRWFjaChlbGVtID0+IHtcbiAgICAgIGxldCBkYXRlID0gbW9tZW50KGVsZW0udGltZXN0YW1wLCB0aGlzLmNvbmZpZy50aW1lc3RhbXBGb3JtYXQpO1xuICAgICAgYWxyZWFkeVRoZXJlW2RhdGVdID0gZWxlbTtcbiAgICB9KTtcbiAgICBsZXQgZGF0YSA9IFtdLCBkYXRlc1dpdGhvdXREYXRhID0gW107XG5cbiAgICAvKiogUmVjb25zdHJ1Y3Qgd2l0aCB6ZXJvcyBpbnN0ZWFkIG9mIG51bGxzICovXG4gICAgZm9yIChsZXQgZGF0ZSA9IG1vbWVudChzdGFydERhdGUpOyBkYXRlIDw9IGVuZERhdGU7IGRhdGUuYWRkKDEsICdkJykpIHtcbiAgICAgIGlmIChhbHJlYWR5VGhlcmVbZGF0ZV0pIHtcbiAgICAgICAgZGF0YS5wdXNoKGFscmVhZHlUaGVyZVtkYXRlXSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBsZXQgZWRnZUNhc2UgPSBkYXRlLmlzU2FtZSh0aGlzLmNvbmZpZy5tYXhEYXRlKSB8fCBkYXRlLmlzU2FtZShtb21lbnQodGhpcy5jb25maWcubWF4RGF0ZSkuc3VidHJhY3QoMSwgJ2RheXMnKSk7XG4gICAgICAgIGRhdGEucHVzaCh7XG4gICAgICAgICAgdGltZXN0YW1wOiBkYXRlLmZvcm1hdCh0aGlzLmNvbmZpZy50aW1lc3RhbXBGb3JtYXQpLFxuICAgICAgICAgIHZpZXdzOiBlZGdlQ2FzZSA/IG51bGwgOiAwXG4gICAgICAgIH0pO1xuICAgICAgICBpZiAoZWRnZUNhc2UpIGRhdGVzV2l0aG91dERhdGEucHVzaChkYXRlLmZvcm1hdCgpKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gW2RhdGEsIGRhdGVzV2l0aG91dERhdGFdO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybiBjYWNoZSBrZXkgZm9yIGN1cnJlbnQgcGFyYW1zXG4gICAqIEByZXR1cm4ge1N0cmluZ30ga2V5XG4gICAqL1xuICBnZXRDYWNoZUtleSgpIHtcbiAgICByZXR1cm4gYHB2LWNhY2hlLSR7dGhpcy5oYXNoQ29kZShcbiAgICAgIHRoaXMuYXBwICsgSlNPTi5zdHJpbmdpZnkodGhpcy5nZXRQYXJhbXModHJ1ZSkpXG4gICAgKX1gO1xuICB9XG5cbiAgLyoqXG4gICAqIExpbmsgdG8gL3BhZ2V2aWV3cyBmb3IgZ2l2ZW4gYXJ0aWNsZSBhbmQgY2hvc2VuIGRhdGVyYW5nZVxuICAgKiBAcGFyYW0ge1N0cmluZ30gcHJvamVjdCAtIGJhc2UgcHJvamVjdCwgZS5nLiBlbi53aWtpcGVkaWEub3JnXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBwYWdlIC0gcGFnZSBuYW1lXG4gICAqIEByZXR1cm5zIHtTdHJpbmd9IFVSTFxuICAgKi9cbiAgLy8gRklYTUU6IHNob3VsZCBpbmNsdWRlIGFnZW50IGFuZCBwbGF0Zm9ybSwgYW5kIHVzZSBzcGVjaWFsIHJhbmdlcyBhcyBjdXJyZW50bHkgc3BlY2lmaWVkXG4gIGdldFBhZ2V2aWV3c1VSTChwcm9qZWN0LCBwYWdlKSB7XG4gICAgbGV0IHN0YXJ0RGF0ZSA9IG1vbWVudCh0aGlzLmRhdGVyYW5nZXBpY2tlci5zdGFydERhdGUpLFxuICAgICAgZW5kRGF0ZSA9IG1vbWVudCh0aGlzLmRhdGVyYW5nZXBpY2tlci5lbmREYXRlKTtcbiAgICBjb25zdCBwbGF0Zm9ybSA9ICQodGhpcy5jb25maWcucGxhdGZvcm1TZWxlY3RvcikudmFsKCk7XG5cbiAgICBpZiAoZW5kRGF0ZS5kaWZmKHN0YXJ0RGF0ZSwgJ2RheXMnKSA9PT0gMCkge1xuICAgICAgc3RhcnREYXRlLnN1YnRyYWN0KDMsICdkYXlzJyk7XG4gICAgICBlbmREYXRlLmFkZCgzLCAnZGF5cycpO1xuICAgIH1cblxuICAgIHJldHVybiBgL3BhZ2V2aWV3cz9zdGFydD0ke3N0YXJ0RGF0ZS5mb3JtYXQoJ1lZWVktTU0tREQnKX1gICtcbiAgICAgIGAmZW5kPSR7ZW5kRGF0ZS5mb3JtYXQoJ1lZWVktTU0tREQnKX0mcHJvamVjdD0ke3Byb2plY3R9JnBsYXRmb3JtPSR7cGxhdGZvcm19JnBhZ2VzPSR7cGFnZX1gO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCBwYXJhbXMgbmVlZGVkIHRvIGNyZWF0ZSBhIHBlcm1hbmVudCBsaW5rIG9mIHZpc2libGUgZGF0YVxuICAgKiBAcmV0dXJuIHtPYmplY3R9IGhhc2ggb2YgcGFyYW1zXG4gICAqL1xuICBnZXRQZXJtYUxpbmsoKSB7XG4gICAgbGV0IHBhcmFtcyA9IHRoaXMuZ2V0UGFyYW1zKHRydWUpO1xuICAgIHBhcmFtcy5zb3J0ID0gdGhpcy5zb3J0O1xuICAgIHBhcmFtcy5kaXJlY3Rpb24gPSB0aGlzLmRpcmVjdGlvbjtcbiAgICByZXR1cm4gcGFyYW1zO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCBjdXJyZW50IGNsYXNzIG5hbWUgb2YgPG91dHB1dD4sIHJlcHJlc2VudGluZyB0aGUgY3VycmVudCBzdGF0ZSBvZiB0aGUgZm9ybVxuICAgKiBAcmV0dXJuIHtTdHJpbmd9IHN0YXRlLCBvbmUgb2YgdGhpcy5jb25maWcuZm9ybVN0YXRlc1xuICAgKi9cbiAgZ2V0U3RhdGUoKSB7XG4gICAgY29uc3QgY2xhc3NMaXN0ID0gJCgnbWFpbicpWzBdLmNsYXNzTGlzdDtcbiAgICByZXR1cm4gdGhpcy5jb25maWcuZm9ybVN0YXRlcy5maWx0ZXIoc3RhdGVOYW1lID0+IHtcbiAgICAgIHJldHVybiBjbGFzc0xpc3QuY29udGFpbnMoc3RhdGVOYW1lKTtcbiAgICB9KVswXTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDaGVjayBzaW1wbGUgc3RvcmFnZSB0byBzZWUgaWYgYSByZXF1ZXN0IHdpdGggdGhlIGN1cnJlbnQgcGFyYW1zIHdvdWxkIGJlIGNhY2hlZFxuICAgKiBAcmV0dXJuIHtCb29sZWFufSBjYWNoZWQgb3Igbm90XG4gICAqL1xuICBpc1JlcXVlc3RDYWNoZWQoKSB7XG4gICAgcmV0dXJuIHNpbXBsZVN0b3JhZ2UuaGFzS2V5KHRoaXMuZ2V0Q2FjaGVLZXkoKSk7XG4gIH1cblxuICAvKipcbiAgICogUmVuZGVyIGxpc3Qgb2Ygb3V0cHV0IGRhdGEgaW50byB2aWV3XG4gICAqIEBwYXJhbSB7ZnVuY3Rpb259IGNiIC0gYmxvY2sgdG8gY2FsbCBiZXR3ZWVuIGluaXRpYWwgc2V0dXAgYW5kIHNob3dpbmcgdGhlIG91dHB1dFxuICAgKiBAcmV0dXJucyB7bnVsbH0gbm90aGluZ1xuICAgKi9cbiAgcmVuZGVyRGF0YShjYikge1xuICAgIGNvbnN0IGFydGljbGVEYXRhc2V0cyA9IHRoaXMub3V0cHV0RGF0YS5saXN0RGF0YTtcblxuICAgIC8qKiBzb3J0IGFzY2VuZGluZyBieSBjdXJyZW50IHNvcnQgc2V0dGluZyAqL1xuICAgIGNvbnN0IHNvcnRlZERhdGFzZXRzID0gYXJ0aWNsZURhdGFzZXRzLnNvcnQoKGEsIGIpID0+IHtcbiAgICAgIGNvbnN0IGJlZm9yZSA9IHRoaXMuZ2V0U29ydFByb3BlcnR5KGEsIHRoaXMuc29ydCksXG4gICAgICAgIGFmdGVyID0gdGhpcy5nZXRTb3J0UHJvcGVydHkoYiwgdGhpcy5zb3J0KTtcblxuICAgICAgaWYgKGJlZm9yZSA8IGFmdGVyKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmRpcmVjdGlvbjtcbiAgICAgIH0gZWxzZSBpZiAoYmVmb3JlID4gYWZ0ZXIpIHtcbiAgICAgICAgcmV0dXJuIC10aGlzLmRpcmVjdGlvbjtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiAwO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgJCgnLnNvcnQtbGluayBzcGFuJykucmVtb3ZlQ2xhc3MoJ2dseXBoaWNvbi1zb3J0LWJ5LWFscGhhYmV0LWFsdCBnbHlwaGljb24tc29ydC1ieS1hbHBoYWJldCcpLmFkZENsYXNzKCdnbHlwaGljb24tc29ydCcpO1xuICAgIGNvbnN0IG5ld1NvcnRDbGFzc05hbWUgPSBwYXJzZUludCh0aGlzLmRpcmVjdGlvbiwgMTApID09PSAxID8gJ2dseXBoaWNvbi1zb3J0LWJ5LWFscGhhYmV0LWFsdCcgOiAnZ2x5cGhpY29uLXNvcnQtYnktYWxwaGFiZXQnO1xuICAgICQoYC5zb3J0LWxpbmstLSR7dGhpcy5zb3J0fSBzcGFuYCkuYWRkQ2xhc3MobmV3U29ydENsYXNzTmFtZSkucmVtb3ZlQ2xhc3MoJ2dseXBoaWNvbi1zb3J0Jyk7XG5cbiAgICB0cnkge1xuICAgICAgY2Ioc29ydGVkRGF0YXNldHMpO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgdGhpcy5zZXRTdGF0ZSgnY29tcGxldGUnKTtcbiAgICAgIHRoaXMuc2hvd0ZhdGFsRXJyb3JzKFtlcnJdKTtcbiAgICB9IGZpbmFsbHkge1xuICAgICAgdGhpcy5wdXNoUGFyYW1zKCk7XG4gICAgfVxuXG4gICAgdGhpcy50b2dnbGVWaWV3KHRoaXMudmlldyk7XG4gICAgLyoqXG4gICAgICogU2V0dGluZyB0aGUgc3RhdGUgdG8gY29tcGxldGUgd2lsbCBjYWxsIHRoaXMucHJvY2Vzc0VuZGVkXG4gICAgICogV2Ugb25seSB3YW50IHRvIHRoaXMgdGhlIGZpcnN0IHRpbWUsIG5vdCBhZnRlciBjaGFuZ2luZyBjaGFydCB0eXBlcywgZXRjLlxuICAgICAqL1xuICAgIGlmICh0aGlzLmdldFN0YXRlKCkgIT09ICdjb21wbGV0ZScpIHRoaXMuc2V0U3RhdGUoJ2NvbXBsZXRlJyk7XG4gIH1cblxuICAvKipcbiAgICogVG9nZ2xlIG9yIHNldCBjaGFydCB2cyBsaXN0IHZpZXcuIEFsbCBvZiB0aGUgbm9ybWFsIGNoYXJ0IGxvZ2ljIGxpdmVzIGhlcmVcbiAgICogQHBhcmFtICB7U3RyaW5nfSB2aWV3IC0gd2hpY2ggdmlldyB0byBzZXQsIGVpdGhlciBjaGFydCBvciBsaXN0XG4gICAqIEByZXR1cm4ge251bGx9IE5vdGhpbmdcbiAgICovXG4gIHRvZ2dsZVZpZXcodmlldykge1xuICAgICQoJy52aWV3LWJ0bicpLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcbiAgICAkKGAudmlldy1idG4tLSR7dmlld31gKS5hZGRDbGFzcygnYWN0aXZlJyk7XG4gICAgJCgnb3V0cHV0JykucmVtb3ZlQ2xhc3MoJ2xpc3QtbW9kZScpXG4gICAgICAucmVtb3ZlQ2xhc3MoJ2NoYXJ0LW1vZGUnKVxuICAgICAgLmFkZENsYXNzKGAke3ZpZXd9LW1vZGVgKTtcblxuICAgIGlmICh2aWV3ID09PSAnY2hhcnQnKSB7XG4gICAgICB0aGlzLmRlc3Ryb3lDaGFydCgpO1xuXG4gICAgICAvKiogZG9uJ3QgdXNlIGNpcmN1bGUgY2hhcnRzICovXG4gICAgICBpZiAodGhpcy5jb25maWcuY2lyY3VsYXJDaGFydHMuaW5jbHVkZXModGhpcy5jaGFydFR5cGUpKSB7XG4gICAgICAgIHRoaXMuY2hhcnRUeXBlID0gJ2Jhcic7XG4gICAgICB9XG5cbiAgICAgIGxldCBvcHRpb25zID0gT2JqZWN0LmFzc2lnbih7fSxcbiAgICAgICAgdGhpcy5jb25maWcuY2hhcnRDb25maWdbdGhpcy5jaGFydFR5cGVdLm9wdHMsXG4gICAgICAgIHRoaXMuY29uZmlnLmdsb2JhbENoYXJ0T3B0c1xuICAgICAgKTtcbiAgICAgIHRoaXMuYXNzaWduT3V0cHV0RGF0YUNoYXJ0T3B0cygpO1xuICAgICAgdGhpcy5zZXRDaGFydFBvaW50RGV0ZWN0aW9uUmFkaXVzKCk7XG5cbiAgICAgIGlmICh0aGlzLmF1dG9Mb2dEZXRlY3Rpb24gPT09ICd0cnVlJykge1xuICAgICAgICBjb25zdCBzaG91bGRCZUxvZ2FyaXRobWljID0gdGhpcy5zaG91bGRCZUxvZ2FyaXRobWljKFt0aGlzLm91dHB1dERhdGEuZGF0YXNldHNbMF0uZGF0YV0pO1xuICAgICAgICAkKHRoaXMuY29uZmlnLmxvZ2FyaXRobWljQ2hlY2tib3gpLnByb3AoJ2NoZWNrZWQnLCBzaG91bGRCZUxvZ2FyaXRobWljKTtcbiAgICAgIH1cblxuICAgICAgaWYgKHRoaXMuaXNMb2dhcml0aG1pYygpKSB7XG4gICAgICAgIG9wdGlvbnMuc2NhbGVzID0gT2JqZWN0LmFzc2lnbih7fSwgb3B0aW9ucy5zY2FsZXMsIHtcbiAgICAgICAgICB5QXhlczogW3tcbiAgICAgICAgICAgIHR5cGU6ICdsb2dhcml0aG1pYycsXG4gICAgICAgICAgICB0aWNrczoge1xuICAgICAgICAgICAgICBjYWxsYmFjazogKHZhbHVlLCBpbmRleCwgYXJyKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgcmVtYWluID0gdmFsdWUgLyAoTWF0aC5wb3coMTAsIE1hdGguZmxvb3IoQ2hhcnQuaGVscGVycy5sb2cxMCh2YWx1ZSkpKSk7XG5cbiAgICAgICAgICAgICAgICBpZiAocmVtYWluID09PSAxIHx8IHJlbWFpbiA9PT0gMiB8fCByZW1haW4gPT09IDUgfHwgaW5kZXggPT09IDAgfHwgaW5kZXggPT09IGFyci5sZW5ndGggLSAxKSB7XG4gICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5mb3JtYXROdW1iZXIodmFsdWUpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICByZXR1cm4gJyc7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfV1cbiAgICAgICAgfSk7XG4gICAgICB9XG5cbiAgICAgIGlmICh0aGlzLmNoYXJ0VHlwZSA9PT0gJ3JhZGFyJykge1xuICAgICAgICBvcHRpb25zLnNjYWxlLnRpY2tzLmJlZ2luQXRaZXJvID0gJCgnLmJlZ2luLWF0LXplcm8tb3B0aW9uJykuaXMoJzpjaGVja2VkJyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBvcHRpb25zLnNjYWxlcy55QXhlc1swXS50aWNrcy5iZWdpbkF0WmVybyA9ICQoJy5iZWdpbi1hdC16ZXJvLW9wdGlvbicpLmlzKCc6Y2hlY2tlZCcpO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBjb250ZXh0ID0gJCh0aGlzLmNvbmZpZy5jaGFydClbMF0uZ2V0Q29udGV4dCgnMmQnKTtcbiAgICAgIHRoaXMuY2hhcnRPYmogPSBuZXcgQ2hhcnQoY29udGV4dCwge1xuICAgICAgICB0eXBlOiB0aGlzLmNoYXJ0VHlwZSxcbiAgICAgICAgZGF0YTogdGhpcy5vdXRwdXREYXRhLFxuICAgICAgICBvcHRpb25zXG4gICAgICB9KTtcblxuICAgICAgJCgnLmNoYXJ0LXNwZWNpZmljJykuc2hvdygpO1xuICAgICAgJCgnI2NoYXJ0LWxlZ2VuZCcpLmh0bWwodGhpcy5jaGFydE9iai5nZW5lcmF0ZUxlZ2VuZCgpKTtcbiAgICB9IGVsc2Uge1xuICAgICAgJCgnLmNoYXJ0LXNwZWNpZmljJykuaGlkZSgpO1xuICAgIH1cblxuICAgIHRoaXMucHVzaFBhcmFtcygpO1xuICB9XG5cbiAgLyoqXG4gICAqIFNldCB2YWx1ZSBvZiBwcm9ncmVzcyBiYXJcbiAgICogQHBhcmFtICB7TnVtYmVyfSB2YWx1ZSAtIGN1cnJlbnQgaXRlcmF0aW9uXG4gICAqIEBwYXJhbSAge051bWJlcn0gdG90YWwgLSB0b3RhbCBudW1iZXIgb2YgaXRlcmF0aW9uc1xuICAgKiBAcmV0dXJuIHtudWxsfSBub3RoaW5nXG4gICAqL1xuICB1cGRhdGVQcm9ncmVzc0Jhcih2YWx1ZSwgdG90YWwpIHtcbiAgICBpZiAoIXRvdGFsKSB7XG4gICAgICAkKCcucHJvZ3Jlc3MtYmFyJykuY3NzKCd3aWR0aCcsICcwJScpO1xuICAgICAgcmV0dXJuICQoJy5wcm9ncmVzcy1jb3VudGVyJykudGV4dCgnJyk7XG4gICAgfVxuXG4gICAgY29uc3QgcGVyY2VudGFnZSA9ICh2YWx1ZSAvIHRvdGFsKSAqIDEwMDtcbiAgICAkKCcucHJvZ3Jlc3MtYmFyJykuY3NzKCd3aWR0aCcsIGAke3BlcmNlbnRhZ2UudG9GaXhlZCgyKX0lYCk7XG5cbiAgICBpZiAodmFsdWUgPT09IHRvdGFsKSB7XG4gICAgICAkKCcucHJvZ3Jlc3MtY291bnRlcicpLnRleHQoJ0J1aWxkaW5nIGRhdGFzZXQuLi4nKTtcbiAgICB9IGVsc2Uge1xuICAgICAgJCgnLnByb2dyZXNzLWNvdW50ZXInKS50ZXh0KFxuICAgICAgICAkLmkxOG4oJ3Byb2Nlc3NpbmctcGFnZScsIHZhbHVlLCB0b3RhbClcbiAgICAgICk7XG4gICAgfVxuICB9XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IExpc3RIZWxwZXJzO1xuIiwiLyoqXG4gKiBAZmlsZSBQb2x5ZmlsbHMgZm9yIHVzZXJzIHdobyByZWZ1c2UgdG8gdXBncmFkZSB0aGVpciBicm93c2Vyc1xuICogICBNb3N0IGNvZGUgaXMgYWRhcHRlZCBmcm9tIFtNRE5dKGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnKVxuICovXG5cbi8vIEFycmF5LmluY2x1ZGVzIGZ1bmN0aW9uIHBvbHlmaWxsXG4vLyBUaGlzIGlzIG5vdCBhIGZ1bGwgaW1wbGVtZW50YXRpb24sIGp1c3QgYSBzaG9ydGhhbmQgdG8gaW5kZXhPZiAhPT0gLTFcbmlmICggIUFycmF5LnByb3RvdHlwZS5pbmNsdWRlcyApIHtcbiAgQXJyYXkucHJvdG90eXBlLmluY2x1ZGVzID0gZnVuY3Rpb24oc2VhcmNoKSB7XG4gICAgcmV0dXJuIHRoaXMuaW5kZXhPZihzZWFyY2gpICE9PSAtMTtcbiAgfTtcbn1cblxuLy8gU3RyaW5nLmluY2x1ZGVzIGZ1bmN0aW9uIHBvbHlmaWxsXG5pZiAoICFTdHJpbmcucHJvdG90eXBlLmluY2x1ZGVzICkge1xuICBTdHJpbmcucHJvdG90eXBlLmluY2x1ZGVzID0gZnVuY3Rpb24oc2VhcmNoLCBzdGFydCkge1xuICAgIGlmICh0eXBlb2Ygc3RhcnQgIT09ICdudW1iZXInKSB7XG4gICAgICBzdGFydCA9IDA7XG4gICAgfVxuXG4gICAgaWYgKHN0YXJ0ICsgc2VhcmNoLmxlbmd0aCA+IHRoaXMubGVuZ3RoKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiB0aGlzLmluZGV4T2Yoc2VhcmNoLHN0YXJ0KSAhPT0gLTE7XG4gICAgfVxuICB9O1xufVxuXG4vLyBPYmplY3QuYXNzaWduXG5pZiAodHlwZW9mIE9iamVjdC5hc3NpZ24gIT09ICdmdW5jdGlvbicpIHtcbiAgKGZ1bmN0aW9uKCkge1xuICAgIE9iamVjdC5hc3NpZ24gPSBmdW5jdGlvbih0YXJnZXQpIHtcbiAgICAgIGlmICh0YXJnZXQgPT09IHVuZGVmaW5lZCB8fCB0YXJnZXQgPT09IG51bGwpIHtcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignQ2Fubm90IGNvbnZlcnQgdW5kZWZpbmVkIG9yIG51bGwgdG8gb2JqZWN0Jyk7XG4gICAgICB9XG5cbiAgICAgIGxldCBvdXRwdXQgPSBPYmplY3QodGFyZ2V0KTtcbiAgICAgIGZvciAobGV0IGluZGV4ID0gMTsgaW5kZXggPCBhcmd1bWVudHMubGVuZ3RoOyBpbmRleCsrKSB7XG4gICAgICAgIGxldCBzb3VyY2UgPSBhcmd1bWVudHNbaW5kZXhdO1xuICAgICAgICBpZiAoc291cmNlICE9PSB1bmRlZmluZWQgJiYgc291cmNlICE9PSBudWxsKSB7XG4gICAgICAgICAgZm9yIChsZXQgbmV4dEtleSBpbiBzb3VyY2UpIHtcbiAgICAgICAgICAgIGlmIChzb3VyY2UuaGFzT3duUHJvcGVydHkobmV4dEtleSkpIHtcbiAgICAgICAgICAgICAgb3V0cHV0W25leHRLZXldID0gc291cmNlW25leHRLZXldO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIG91dHB1dDtcbiAgICB9O1xuICB9KSgpO1xufVxuXG4vLyBDaGlsZE5vZGUucmVtb3ZlXG5pZiAoISgncmVtb3ZlJyBpbiBFbGVtZW50LnByb3RvdHlwZSkpIHtcbiAgRWxlbWVudC5wcm90b3R5cGUucmVtb3ZlID0gZnVuY3Rpb24oKSB7XG4gICAgdGhpcy5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHRoaXMpO1xuICB9O1xufVxuXG4vLyBTdHJpbmcuc3RhcnRzV2l0aFxuaWYgKCFTdHJpbmcucHJvdG90eXBlLnN0YXJ0c1dpdGgpIHtcbiAgU3RyaW5nLnByb3RvdHlwZS5zdGFydHNXaXRoID0gZnVuY3Rpb24oc2VhcmNoU3RyaW5nLCBwb3NpdGlvbikge1xuICAgIHBvc2l0aW9uID0gcG9zaXRpb24gfHwgMDtcbiAgICByZXR1cm4gdGhpcy5zdWJzdHIocG9zaXRpb24sIHNlYXJjaFN0cmluZy5sZW5ndGgpID09PSBzZWFyY2hTdHJpbmc7XG4gIH07XG59XG5cbi8vIEFycmF5Lm9mXG5pZiAoIUFycmF5Lm9mKSB7XG4gIEFycmF5Lm9mID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cyk7XG4gIH07XG59XG5cbi8vIEFycmF5LmZpbmRcbmlmICghQXJyYXkucHJvdG90eXBlLmZpbmQpIHtcbiAgQXJyYXkucHJvdG90eXBlLmZpbmQgPSBmdW5jdGlvbihwcmVkaWNhdGUpIHtcbiAgICBpZiAodGhpcyA9PT0gbnVsbCkge1xuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignQXJyYXkucHJvdG90eXBlLmZpbmQgY2FsbGVkIG9uIG51bGwgb3IgdW5kZWZpbmVkJyk7XG4gICAgfVxuICAgIGlmICh0eXBlb2YgcHJlZGljYXRlICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdwcmVkaWNhdGUgbXVzdCBiZSBhIGZ1bmN0aW9uJyk7XG4gICAgfVxuICAgIGxldCBsaXN0ID0gT2JqZWN0KHRoaXMpO1xuICAgIGxldCBsZW5ndGggPSBsaXN0Lmxlbmd0aCA+Pj4gMDtcbiAgICBsZXQgdGhpc0FyZyA9IGFyZ3VtZW50c1sxXTtcbiAgICBsZXQgdmFsdWU7XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICB2YWx1ZSA9IGxpc3RbaV07XG4gICAgICBpZiAocHJlZGljYXRlLmNhbGwodGhpc0FyZywgdmFsdWUsIGksIGxpc3QpKSB7XG4gICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgfTtcbn1cblxuLy8gQXJyYXkuZmlsbFxuaWYgKCFBcnJheS5wcm90b3R5cGUuZmlsbCkge1xuICBBcnJheS5wcm90b3R5cGUuZmlsbCA9IGZ1bmN0aW9uKHZhbHVlKSB7XG5cbiAgICAvLyBTdGVwcyAxLTIuXG4gICAgaWYgKHRoaXMgPT09IG51bGwpIHtcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ3RoaXMgaXMgbnVsbCBvciBub3QgZGVmaW5lZCcpO1xuICAgIH1cblxuICAgIGxldCBPID0gT2JqZWN0KHRoaXMpO1xuXG4gICAgLy8gU3RlcHMgMy01LlxuICAgIGxldCBsZW4gPSBPLmxlbmd0aCA+Pj4gMDtcblxuICAgIC8vIFN0ZXBzIDYtNy5cbiAgICBsZXQgc3RhcnQgPSBhcmd1bWVudHNbMV07XG4gICAgbGV0IHJlbGF0aXZlU3RhcnQgPSBzdGFydCA+PiAwO1xuXG4gICAgLy8gU3RlcCA4LlxuICAgIGxldCBrID0gcmVsYXRpdmVTdGFydCA8IDAgP1xuICAgICAgTWF0aC5tYXgobGVuICsgcmVsYXRpdmVTdGFydCwgMCkgOlxuICAgICAgTWF0aC5taW4ocmVsYXRpdmVTdGFydCwgbGVuKTtcblxuICAgIC8vIFN0ZXBzIDktMTAuXG4gICAgbGV0IGVuZCA9IGFyZ3VtZW50c1syXTtcbiAgICBsZXQgcmVsYXRpdmVFbmQgPSBlbmQgPT09IHVuZGVmaW5lZCA/XG4gICAgICBsZW4gOiBlbmQgPj4gMDtcblxuICAgIC8vIFN0ZXAgMTEuXG4gICAgbGV0IGZpbmFsID0gcmVsYXRpdmVFbmQgPCAwID9cbiAgICAgIE1hdGgubWF4KGxlbiArIHJlbGF0aXZlRW5kLCAwKSA6XG4gICAgICBNYXRoLm1pbihyZWxhdGl2ZUVuZCwgbGVuKTtcblxuICAgIC8vIFN0ZXAgMTIuXG4gICAgd2hpbGUgKGsgPCBmaW5hbCkge1xuICAgICAgT1trXSA9IHZhbHVlO1xuICAgICAgaysrO1xuICAgIH1cblxuICAgIC8vIFN0ZXAgMTMuXG4gICAgcmV0dXJuIE87XG4gIH07XG59XG4iLCIvKipcbiAqIEBmaWxlIFNoYXJlZCBjb2RlIGFtb25nc3QgYWxsIGFwcHMgKFBhZ2V2aWV3cywgVG9wdmlld3MsIExhbmd2aWV3cywgU2l0ZXZpZXdzLCBNYXNzdmlld3MsIFJlZGlyZWN0IFZpZXdzKVxuICogQGF1dGhvciBNdXNpa0FuaW1hbCwgS2FsZGFyaVxuICogQGNvcHlyaWdodCAyMDE2IE11c2lrQW5pbWFsXG4gKiBAbGljZW5zZSBNSVQgTGljZW5zZTogaHR0cHM6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9NSVRcbiAqL1xuXG4vKiogY2xhc3MtbGVzcyBmaWxlcyB3aXRoIGdsb2JhbCBvdmVycmlkZXMgKi9cbnJlcXVpcmUoJy4vY29yZV9leHRlbnNpb25zJyk7XG5yZXF1aXJlKCcuL3BvbHlmaWxscycpO1xuXG5jb25zdCBQdkNvbmZpZyA9IHJlcXVpcmUoJy4vcHZfY29uZmlnJyk7XG5jb25zdCBzaXRlTWFwID0gcmVxdWlyZSgnLi9zaXRlX21hcCcpO1xuY29uc3Qgc2l0ZURvbWFpbnMgPSBPYmplY3Qua2V5cyhzaXRlTWFwKS5tYXAoa2V5ID0+IHNpdGVNYXBba2V5XSk7XG5cbi8qKiBQdiBjbGFzcywgY29udGFpbnMgY29kZSBhbW9uZ3N0IGFsbCBhcHBzIChQYWdldmlld3MsIFRvcHZpZXdzLCBMYW5ndmlld3MsIFNpdGV2aWV3cywgTWFzc3ZpZXdzLCBSZWRpcmVjdCBWaWV3cykgKi9cbmNsYXNzIFB2IGV4dGVuZHMgUHZDb25maWcge1xuICBjb25zdHJ1Y3RvcihhcHBDb25maWcpIHtcbiAgICBzdXBlcihhcHBDb25maWcpO1xuXG4gICAgLyoqIGFzc2lnbiBpbml0aWFsIGNsYXNzIHByb3BlcnRpZXMgKi9cbiAgICBjb25zdCBkZWZhdWx0cyA9IHRoaXMuY29uZmlnLmRlZmF1bHRzLFxuICAgICAgdmFsaWRQYXJhbXMgPSB0aGlzLmNvbmZpZy52YWxpZFBhcmFtcztcbiAgICB0aGlzLmNvbmZpZyA9IE9iamVjdC5hc3NpZ24oe30sIHRoaXMuY29uZmlnLCBhcHBDb25maWcpO1xuICAgIHRoaXMuY29uZmlnLmRlZmF1bHRzID0gT2JqZWN0LmFzc2lnbih7fSwgZGVmYXVsdHMsIGFwcENvbmZpZy5kZWZhdWx0cyk7XG4gICAgdGhpcy5jb25maWcudmFsaWRQYXJhbXMgPSBPYmplY3QuYXNzaWduKHt9LCB2YWxpZFBhcmFtcywgYXBwQ29uZmlnLnZhbGlkUGFyYW1zKTtcblxuICAgIHRoaXMuY29sb3JzU3R5bGVFbCA9IHVuZGVmaW5lZDtcbiAgICB0aGlzLnN0b3JhZ2UgPSB7fTsgLy8gdXNlZCBhcyBmYWxsYmFjayB3aGVuIGxvY2FsU3RvcmFnZSBpcyBub3Qgc3VwcG9ydGVkXG5cbiAgICBbJ2xvY2FsaXplRGF0ZUZvcm1hdCcsICdudW1lcmljYWxGb3JtYXR0aW5nJywgJ2JlemllckN1cnZlJywgJ2F1dG9jb21wbGV0ZScsICdhdXRvTG9nRGV0ZWN0aW9uJywgJ2JlZ2luQXRaZXJvJywgJ3JlbWVtYmVyQ2hhcnQnXS5mb3JFYWNoKHNldHRpbmcgPT4ge1xuICAgICAgdGhpc1tzZXR0aW5nXSA9IHRoaXMuZ2V0RnJvbUxvY2FsU3RvcmFnZShgcGFnZXZpZXdzLXNldHRpbmdzLSR7c2V0dGluZ31gKSB8fCB0aGlzLmNvbmZpZy5kZWZhdWx0c1tzZXR0aW5nXTtcbiAgICB9KTtcbiAgICB0aGlzLnNldHVwU2V0dGluZ3NNb2RhbCgpO1xuXG4gICAgdGhpcy5wYXJhbXMgPSBudWxsO1xuICAgIHRoaXMuc2l0ZUluZm8gPSB7fTtcblxuICAgIC8qKiBAdHlwZSB7bnVsbHxEYXRlfSB0cmFja2luZyBvZiBlbGFwc2VkIHRpbWUgKi9cbiAgICB0aGlzLnByb2Nlc3NTdGFydCA9IG51bGw7XG5cbiAgICAvKiogYXNzaWduIGFwcCBpbnN0YW5jZSB0byB3aW5kb3cgZm9yIGRlYnVnZ2luZyBvbiBsb2NhbCBlbnZpcm9ubWVudCAqL1xuICAgIGlmIChsb2NhdGlvbi5ob3N0ID09PSAnbG9jYWxob3N0Jykge1xuICAgICAgd2luZG93LmFwcCA9IHRoaXM7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuc3BsYXNoKCk7XG4gICAgfVxuXG4gICAgdGhpcy5kZWJ1ZyA9IGxvY2F0aW9uLnNlYXJjaC5pbmNsdWRlcygnZGVidWc9dHJ1ZScpIHx8IGxvY2F0aW9uLmhvc3QgPT09ICdsb2NhbGhvc3QnO1xuXG4gICAgLyoqIHNob3cgbm90aWNlIGlmIG9uIHN0YWdpbmcgZW52aXJvbm1lbnQgKi9cbiAgICBpZiAoLy10ZXN0Ly50ZXN0KGxvY2F0aW9uLnBhdGhuYW1lKSkge1xuICAgICAgY29uc3QgYWN0dWFsUGF0aE5hbWUgPSBsb2NhdGlvbi5wYXRobmFtZS5yZXBsYWNlKC8tdGVzdFxcLz8vLCAnJyk7XG4gICAgICB0aGlzLmFkZFNpdGVOb3RpY2UoJ3dhcm5pbmcnLFxuICAgICAgICBgVGhpcyBpcyBhIHN0YWdpbmcgZW52aXJvbm1lbnQuIEZvciB0aGUgYWN0dWFsICR7ZG9jdW1lbnQudGl0bGV9LFxuICAgICAgICAgc2VlIDxhIGhyZWY9JyR7YWN0dWFsUGF0aE5hbWV9Jz4ke2xvY2F0aW9uLmhvc3RuYW1lfSR7YWN0dWFsUGF0aE5hbWV9PC9hPmBcbiAgICAgICk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogTG9hZCB0cmFuc2xhdGlvbnMgdGhlbiBpbml0aWFsaXplIHRoZSBhcHAuXG4gICAgICogRWFjaCBhcHAgaGFzIGl0J3Mgb3duIGluaXRpYWxpemUgbWV0aG9kLlxuICAgICAqIE1ha2Ugc3VyZSB3ZSBsb2FkICdlbi5qc29uJyBhcyBhIGZhbGxiYWNrXG4gICAgICovXG4gICAgbGV0IG1lc3NhZ2VzVG9Mb2FkID0ge1xuICAgICAgW2kxOG5MYW5nXTogYC9wYWdldmlld3MvbWVzc2FnZXMvJHtpMThuTGFuZ30uanNvbmBcbiAgICB9O1xuICAgIGlmIChpMThuTGFuZyAhPT0gJ2VuJykge1xuICAgICAgbWVzc2FnZXNUb0xvYWQuZW4gPSAnL3BhZ2V2aWV3cy9tZXNzYWdlcy9lbi5qc29uJztcbiAgICB9XG4gICAgJC5pMThuKHtcbiAgICAgIGxvY2FsZTogaTE4bkxhbmdcbiAgICB9KS5sb2FkKG1lc3NhZ2VzVG9Mb2FkKS50aGVuKHRoaXMuaW5pdGlhbGl6ZS5iaW5kKHRoaXMpKTtcblxuICAgIC8qKiBzZXQgdXAgdG9hc3RyIGNvbmZpZy4gVGhlIGR1cmF0aW9uIG1heSBiZSBvdmVycmlkZW4gbGF0ZXIgKi9cbiAgICB0b2FzdHIub3B0aW9ucyA9IHtcbiAgICAgIGNsb3NlQnV0dG9uOiB0cnVlLFxuICAgICAgZGVidWc6IGxvY2F0aW9uLmhvc3QgPT09ICdsb2NhbGhvc3QnLFxuICAgICAgbmV3ZXN0T25Ub3A6IGZhbHNlLFxuICAgICAgcHJvZ3Jlc3NCYXI6IGZhbHNlLFxuICAgICAgcG9zaXRpb25DbGFzczogJ3RvYXN0LXRvcC1jZW50ZXInLFxuICAgICAgcHJldmVudER1cGxpY2F0ZXM6IHRydWUsXG4gICAgICBvbmNsaWNrOiBudWxsLFxuICAgICAgc2hvd0R1cmF0aW9uOiAnMzAwJyxcbiAgICAgIGhpZGVEdXJhdGlvbjogJzEwMDAnLFxuICAgICAgdGltZU91dDogJzUwMDAnLFxuICAgICAgZXh0ZW5kZWRUaW1lT3V0OiAnMzAwMCcsXG4gICAgICBzaG93RWFzaW5nOiAnc3dpbmcnLFxuICAgICAgaGlkZUVhc2luZzogJ2xpbmVhcicsXG4gICAgICBzaG93TWV0aG9kOiAnZmFkZUluJyxcbiAgICAgIGhpZGVNZXRob2Q6ICdmYWRlT3V0JyxcbiAgICAgIHRvYXN0Q2xhc3M6ICdhbGVydCcsXG4gICAgICBpY29uQ2xhc3Nlczoge1xuICAgICAgICBlcnJvcjogJ2FsZXJ0LWRhbmdlcicsXG4gICAgICAgIGluZm86ICdhbGVydC1pbmZvJyxcbiAgICAgICAgc3VjY2VzczogJ2FsZXJ0LXN1Y2Nlc3MnLFxuICAgICAgICB3YXJuaW5nOiAnYWxlcnQtd2FybmluZydcbiAgICAgIH1cbiAgICB9O1xuICB9XG5cbiAgLyoqXG4gICAqIEFkZCBhIHNpdGUgbm90aWNlIChCb290c3RyYXAgYWxlcnQpXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBsZXZlbCAtIG9uZSBvZiAnc3VjY2VzcycsICdpbmZvJywgJ3dhcm5pbmcnIG9yICdlcnJvcidcbiAgICogQHBhcmFtIHtTdHJpbmd9IG1lc3NhZ2UgLSBtZXNzYWdlIHRvIHNob3dcbiAgICogQHBhcmFtIHtTdHJpbmd9IFt0aXRsZV0gLSB3aWxsIGFwcGVhciBpbiBib2xkIGFuZCBpbiBmcm9udCBvZiB0aGUgbWVzc2FnZVxuICAgKiBAcGFyYW0ge0Jvb2xlYW59IFtkaXNtaXNzYWJsZV0gLSB3aGV0aGVyIG9yIG5vdCB0byBhZGQgYSBYXG4gICAqICAgdGhhdCBhbGxvd3MgdGhlIHVzZXIgdG8gZGlzbWlzcyB0aGUgbm90aWNlXG4gICAqIEByZXR1cm5zIHtudWxsfSBub3RoaW5nXG4gICAqL1xuICBhZGRTaXRlTm90aWNlKGxldmVsLCBtZXNzYWdlLCB0aXRsZSwgZGlzbWlzc2FibGUpIHtcbiAgICB0aXRsZSA9IHRpdGxlID8gYDxzdHJvbmc+JHt0aXRsZX08L3N0cm9uZz4gYCA6ICcnO1xuXG4gICAgbGV0IG1hcmt1cCA9IHRpdGxlICsgbWVzc2FnZTtcblxuICAgIHRoaXMud3JpdGVNZXNzYWdlKFxuICAgICAgbWFya3VwLFxuICAgICAgbGV2ZWwsXG4gICAgICBkaXNtaXNzYWJsZSA/IDEwMDAwIDogMFxuICAgICk7XG4gIH1cblxuICAvKipcbiAgICogQWRkIHNpdGUgbm90aWNlIGZvciBpbnZhbGlkIHBhcmFtZXRlclxuICAgKiBAcGFyYW0ge1N0cmluZ30gcGFyYW0gLSBuYW1lIG9mIHBhcmFtZXRlclxuICAgKiBAcmV0dXJucyB7bnVsbH0gbm90aGluZ1xuICAgKi9cbiAgYWRkSW52YWxpZFBhcmFtTm90aWNlKHBhcmFtKSB7XG4gICAgY29uc3QgZG9jTGluayA9IGA8YSBocmVmPScvJHt0aGlzLmFwcH0vdXJsX3N0cnVjdHVyZSc+JHskLmkxOG4oJ2RvY3VtZW50YXRpb24nKX08L2E+YDtcbiAgICB0aGlzLmFkZFNpdGVOb3RpY2UoXG4gICAgICAnZXJyb3InLFxuICAgICAgJC5pMThuKCdwYXJhbS1lcnJvci0zJywgcGFyYW0sIGRvY0xpbmspLFxuICAgICAgJC5pMThuKCdpbnZhbGlkLXBhcmFtcycpLFxuICAgICAgdHJ1ZVxuICAgICk7XG4gIH1cblxuICAvKipcbiAgICogVmFsaWRhdGUgdGhlIGRhdGUgcmFuZ2Ugb2YgZ2l2ZW4gcGFyYW1zXG4gICAqICAgYW5kIHRocm93IGVycm9ycyBhcyBuZWNlc3NhcnkgYW5kL29yIHNldCBkZWZhdWx0c1xuICAgKiBAcGFyYW0ge09iamVjdH0gcGFyYW1zIC0gYXMgcmV0dXJuZWQgYnkgdGhpcy5wYXJzZVF1ZXJ5U3RyaW5nKClcbiAgICogQHJldHVybnMge0Jvb2xlYW59IHRydWUgaWYgdGhlcmUgd2VyZSBubyBlcnJvcnMsIGZhbHNlIG90aGVyd2lzZVxuICAgKi9cbiAgdmFsaWRhdGVEYXRlUmFuZ2UocGFyYW1zKSB7XG4gICAgaWYgKHBhcmFtcy5yYW5nZSkge1xuICAgICAgaWYgKCF0aGlzLnNldFNwZWNpYWxSYW5nZShwYXJhbXMucmFuZ2UpKSB7XG4gICAgICAgIHRoaXMuYWRkSW52YWxpZFBhcmFtTm90aWNlKCdyYW5nZScpO1xuICAgICAgICB0aGlzLnNldFNwZWNpYWxSYW5nZSh0aGlzLmNvbmZpZy5kZWZhdWx0cy5kYXRlUmFuZ2UpO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAocGFyYW1zLnN0YXJ0KSB7XG4gICAgICBjb25zdCBkYXRlUmVnZXggPSAvXFxkezR9LVxcZHsyfS1cXGR7Mn0kLztcblxuICAgICAgLy8gZmlyc3Qgc2V0IGRlZmF1bHRzXG4gICAgICBsZXQgc3RhcnREYXRlLCBlbmREYXRlO1xuXG4gICAgICAvLyB0aGVuIGNoZWNrIGZvcm1hdCBvZiBzdGFydCBhbmQgZW5kIGRhdGVcbiAgICAgIGlmIChwYXJhbXMuc3RhcnQgJiYgZGF0ZVJlZ2V4LnRlc3QocGFyYW1zLnN0YXJ0KSkge1xuICAgICAgICBzdGFydERhdGUgPSBtb21lbnQocGFyYW1zLnN0YXJ0KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuYWRkSW52YWxpZFBhcmFtTm90aWNlKCdzdGFydCcpO1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgICBpZiAocGFyYW1zLmVuZCAmJiBkYXRlUmVnZXgudGVzdChwYXJhbXMuZW5kKSkge1xuICAgICAgICBlbmREYXRlID0gbW9tZW50KHBhcmFtcy5lbmQpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5hZGRJbnZhbGlkUGFyYW1Ob3RpY2UoJ2VuZCcpO1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG5cbiAgICAgIC8vIGNoZWNrIGlmIHRoZXkgYXJlIG91dHNpZGUgdGhlIHZhbGlkIHJhbmdlIG9yIGlmIGluIHRoZSB3cm9uZyBvcmRlclxuICAgICAgaWYgKHN0YXJ0RGF0ZSA8IHRoaXMuY29uZmlnLm1pbkRhdGUgfHwgZW5kRGF0ZSA8IHRoaXMuY29uZmlnLm1pbkRhdGUpIHtcbiAgICAgICAgdGhpcy5hZGRTaXRlTm90aWNlKCdlcnJvcicsXG4gICAgICAgICAgJC5pMThuKCdwYXJhbS1lcnJvci0xJywgbW9tZW50KHRoaXMuY29uZmlnLm1pbkRhdGUpLmZvcm1hdCh0aGlzLmRhdGVGb3JtYXQpKSxcbiAgICAgICAgICAkLmkxOG4oJ2ludmFsaWQtcGFyYW1zJyksXG4gICAgICAgICAgdHJ1ZVxuICAgICAgICApO1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9IGVsc2UgaWYgKHN0YXJ0RGF0ZSA+IGVuZERhdGUpIHtcbiAgICAgICAgdGhpcy5hZGRTaXRlTm90aWNlKCdlcnJvcicsICQuaTE4bigncGFyYW0tZXJyb3ItMicpLCAkLmkxOG4oJ2ludmFsaWQtcGFyYW1zJyksIHRydWUpO1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG5cbiAgICAgIC8qKiBkaXJlY3RseSBhc3NpZ24gc3RhcnREYXRlIGJlZm9yZSBjYWxsaW5nIHNldEVuZERhdGUgc28gZXZlbnRzIHdpbGwgYmUgZmlyZWQgb25jZSAqL1xuICAgICAgdGhpcy5kYXRlcmFuZ2VwaWNrZXIuc3RhcnREYXRlID0gc3RhcnREYXRlO1xuICAgICAgdGhpcy5kYXRlcmFuZ2VwaWNrZXIuc2V0RW5kRGF0ZShlbmREYXRlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5zZXRTcGVjaWFsUmFuZ2UodGhpcy5jb25maWcuZGVmYXVsdHMuZGF0ZVJhbmdlKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIGNsZWFyU2l0ZU5vdGljZXMoKSB7XG4gICAgJCgnLnNpdGUtbm90aWNlJykuaHRtbCgnJyk7XG4gIH1cblxuICBjbGVhck1lc3NhZ2VzKCkge1xuICAgICQoJy5tZXNzYWdlLWNvbnRhaW5lcicpLmh0bWwoJycpO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCBkYXRlIGZvcm1hdCB0byB1c2UgYmFzZWQgb24gc2V0dGluZ3NcbiAgICogQHJldHVybnMge3N0cmluZ30gZGF0ZSBmb3JtYXQgdG8gcGFzc2VkIHRvIHBhcnNlclxuICAgKi9cbiAgZ2V0IGRhdGVGb3JtYXQoKSB7XG4gICAgaWYgKHRoaXMubG9jYWxpemVEYXRlRm9ybWF0ID09PSAndHJ1ZScpIHtcbiAgICAgIHJldHVybiB0aGlzLmdldExvY2FsZURhdGVTdHJpbmcoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHRoaXMuY29uZmlnLmRlZmF1bHRzLmRhdGVGb3JtYXQ7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEdldCB0aGUgZGF0ZXJhbmdlcGlja2VyIGluc3RhbmNlLiBQbGFpbiBhbmQgc2ltcGxlLlxuICAgKiBAcmV0dXJuIHtPYmplY3R9IGRhdGVyYW5nZSBwaWNrZXJcbiAgICovXG4gIGdldCBkYXRlcmFuZ2VwaWNrZXIoKSB7XG4gICAgcmV0dXJuICQodGhpcy5jb25maWcuZGF0ZVJhbmdlU2VsZWN0b3IpLmRhdGEoJ2RhdGVyYW5nZXBpY2tlcicpO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCB0aGUgZGF0YWJhc2UgbmFtZSBvZiB0aGUgZ2l2ZW4gcHJvamV0XG4gICAqIEBwYXJhbSAge1N0cmluZ30gcHJvamVjdCAtIHdpdGggb3Igd2l0aG91dCAub3JnXG4gICAqIEByZXR1cm4ge1N0cmluZ30gZGF0YWJhc2UgbmFtZVxuICAgKi9cbiAgZGJOYW1lKHByb2plY3QpIHtcbiAgICByZXR1cm4gT2JqZWN0LmtleXMoc2l0ZU1hcCkuZmluZChrZXkgPT4gc2l0ZU1hcFtrZXldID09PSBgJHtwcm9qZWN0LnJlcGxhY2UoL1xcLm9yZyQvLCcnKX0ub3JnYCk7XG4gIH1cblxuICAvKipcbiAgICogRm9yY2UgZG93bmxvYWQgb2YgZ2l2ZW4gZGF0YSwgb3Igb3BlbiBpbiBhIG5ldyB0YWIgaWYgSFRNTDUgPGE+IGRvd25sb2FkIGF0dHJpYnV0ZSBpcyBub3Qgc3VwcG9ydGVkXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBkYXRhIC0gUmF3IGRhdGEgcHJlcGVuZGVkIHdpdGggZGF0YSB0eXBlLCBlLmcuIFwiZGF0YTp0ZXh0L2NzdjtjaGFyc2V0PXV0Zi04LG15IGRhdGEuLi5cIlxuICAgKiBAcGFyYW0ge1N0cmluZ30gZXh0ZW5zaW9uIC0gdGhlIGZpbGUgZXh0ZW5zaW9uIHRvIHVzZVxuICAgKiBAcmV0dXJucyB7bnVsbH0gTm90aGluZ1xuICAgKi9cbiAgZG93bmxvYWREYXRhKGRhdGEsIGV4dGVuc2lvbikge1xuICAgIGNvbnN0IGVuY29kZWRVcmkgPSBlbmNvZGVVUkkoZGF0YSk7XG5cbiAgICAvLyBjcmVhdGUgSFRNTDUgZG93bmxvYWQgZWxlbWVudCBhbmQgZm9yY2UgY2xpY2sgc28gd2UgY2FuIHNwZWNpZnkgYSBmaWxlbmFtZVxuICAgIGNvbnN0IGxpbmsgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdhJyk7XG4gICAgaWYgKHR5cGVvZiBsaW5rLmRvd25sb2FkID09PSAnc3RyaW5nJykge1xuICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChsaW5rKTsgLy8gRmlyZWZveCByZXF1aXJlcyB0aGUgbGluayB0byBiZSBpbiB0aGUgYm9keVxuXG4gICAgICBjb25zdCBmaWxlbmFtZSA9IGAke3RoaXMuZ2V0RXhwb3J0RmlsZW5hbWUoKX0uJHtleHRlbnNpb259YDtcbiAgICAgIGxpbmsuZG93bmxvYWQgPSBmaWxlbmFtZTtcbiAgICAgIGxpbmsuaHJlZiA9IGVuY29kZWRVcmk7XG4gICAgICBsaW5rLmNsaWNrKCk7XG5cbiAgICAgIGRvY3VtZW50LmJvZHkucmVtb3ZlQ2hpbGQobGluayk7IC8vIHJlbW92ZSB0aGUgbGluayB3aGVuIGRvbmVcbiAgICB9IGVsc2Uge1xuICAgICAgd2luZG93Lm9wZW4oZW5jb2RlZFVyaSk7IC8vIG9wZW4gaW4gbmV3IHRhYiBpZiBkb3dubG9hZCBpc24ndCBzdXBwb3J0ZWQgKCpjb3VnaCogU2FmYXJpKVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBGaWxsIGluIHZhbHVlcyB3aXRoaW4gc2V0dGluZ3MgbW9kYWwgd2l0aCB3aGF0J3MgaW4gdGhlIHNlc3Npb24gb2JqZWN0XG4gICAqIEByZXR1cm5zIHtudWxsfSBub3RoaW5nXG4gICAqL1xuICBmaWxsSW5TZXR0aW5ncygpIHtcbiAgICAkLmVhY2goJCgnI3NldHRpbmdzLW1vZGFsIGlucHV0JyksIChpbmRleCwgZWwpID0+IHtcbiAgICAgIGlmIChlbC50eXBlID09PSAnY2hlY2tib3gnKSB7XG4gICAgICAgIGVsLmNoZWNrZWQgPSB0aGlzW2VsLm5hbWVdID09PSAndHJ1ZSc7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBlbC5jaGVja2VkID0gdGhpc1tlbC5uYW1lXSA9PT0gZWwudmFsdWU7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogQWRkIGZvY3VzIHRvIFNlbGVjdDIgaW5wdXQgZmllbGRcbiAgICogQHJldHVybnMge251bGx9IG5vdGhpbmdcbiAgICovXG4gIGZvY3VzU2VsZWN0MigpIHtcbiAgICAkKCcuc2VsZWN0Mi1zZWxlY3Rpb24nKS50cmlnZ2VyKCdjbGljaycpO1xuICAgICQoJy5zZWxlY3QyLXNlYXJjaF9fZmllbGQnKS5mb2N1cygpO1xuICB9XG5cbiAgLyoqXG4gICAqIEZvcm1hdCBudW1iZXIgYmFzZWQgb24gY3VycmVudCBzZXR0aW5ncywgZS5nLiBsb2NhbGl6ZSB3aXRoIGNvbW1hIGRlbGltZXRlcnNcbiAgICogQHBhcmFtIHtudW1iZXJ8c3RyaW5nfSBudW0gLSBudW1iZXIgdG8gZm9ybWF0XG4gICAqIEByZXR1cm5zIHtzdHJpbmd9IGZvcm1hdHRlZCBudW1iZXJcbiAgICovXG4gIGZvcm1hdE51bWJlcihudW0pIHtcbiAgICBjb25zdCBudW1lcmljYWxGb3JtYXR0aW5nID0gdGhpcy5nZXRGcm9tTG9jYWxTdG9yYWdlKCdwYWdldmlld3Mtc2V0dGluZ3MtbnVtZXJpY2FsRm9ybWF0dGluZycpIHx8IHRoaXMuY29uZmlnLmRlZmF1bHRzLm51bWVyaWNhbEZvcm1hdHRpbmc7XG4gICAgaWYgKG51bWVyaWNhbEZvcm1hdHRpbmcgPT09ICd0cnVlJykge1xuICAgICAgcmV0dXJuIHRoaXMubihudW0pO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gbnVtO1xuICAgIH1cbiAgfVxuXG4gIGZvcm1hdFlBeGlzTnVtYmVyKG51bSkge1xuICAgIGlmIChudW0gJSAxID09PSAwKSB7XG4gICAgICByZXR1cm4gdGhpcy5mb3JtYXROdW1iZXIobnVtKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEdldHMgdGhlIGRhdGUgaGVhZGluZ3MgYXMgc3RyaW5ncyAtIGkxOG4gY29tcGxpYW50XG4gICAqIEBwYXJhbSB7Ym9vbGVhbn0gbG9jYWxpemVkIC0gd2hldGhlciB0aGUgZGF0ZXMgc2hvdWxkIGJlIGxvY2FsaXplZCBwZXIgYnJvd3NlciBsYW5ndWFnZVxuICAgKiBAcmV0dXJucyB7QXJyYXl9IHRoZSBkYXRlIGhlYWRpbmdzIGFzIHN0cmluZ3NcbiAgICovXG4gIGdldERhdGVIZWFkaW5ncyhsb2NhbGl6ZWQpIHtcbiAgICBjb25zdCBkYXRlSGVhZGluZ3MgPSBbXSxcbiAgICAgIGVuZERhdGUgPSBtb21lbnQodGhpcy5kYXRlcmFuZ2VwaWNrZXIuZW5kRGF0ZSkuYWRkKDEsICdkJyk7XG5cbiAgICBmb3IgKGxldCBkYXRlID0gbW9tZW50KHRoaXMuZGF0ZXJhbmdlcGlja2VyLnN0YXJ0RGF0ZSk7IGRhdGUuaXNCZWZvcmUoZW5kRGF0ZSk7IGRhdGUuYWRkKDEsICdkJykpIHtcbiAgICAgIGlmIChsb2NhbGl6ZWQpIHtcbiAgICAgICAgZGF0ZUhlYWRpbmdzLnB1c2goZGF0ZS5mb3JtYXQodGhpcy5kYXRlRm9ybWF0KSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBkYXRlSGVhZGluZ3MucHVzaChkYXRlLmZvcm1hdCgnWVlZWS1NTS1ERCcpKTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGRhdGVIZWFkaW5ncztcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgdGhlIGV4cGxhbmRlZCB3aWtpIFVSTCBnaXZlbiB0aGUgcGFnZSBuYW1lXG4gICAqIFRoaXMgc2hvdWxkIGJlIHVzZWQgaW5zdGVhZCBvZiBnZXRQYWdlVVJMIHdoZW4geW91IHdhbnQgdG8gY2hhaW4gcXVlcnkgc3RyaW5nIHBhcmFtZXRlcnNcbiAgICpcbiAgICogQHBhcmFtIHtzdHJpbmd9IHBhZ2UgbmFtZVxuICAgKiBAcmV0dXJucyB7c3RyaW5nfSBVUkwgZm9yIHRoZSBwYWdlXG4gICAqL1xuICBnZXRFeHBhbmRlZFBhZ2VVUkwocGFnZSkge1xuICAgIHJldHVybiBgLy8ke3RoaXMucHJvamVjdH0ub3JnL3cvaW5kZXgucGhwP3RpdGxlPSR7ZW5jb2RlVVJJQ29tcG9uZW50KHBhZ2Uuc2NvcmUoKSkucmVwbGFjZSgvJy8sIGVzY2FwZSl9YDtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgaW5mb3JtYXRpdmUgZmlsZW5hbWUgd2l0aG91dCBleHRlbnNpb24gdG8gYmUgdXNlZCBmb3IgZXhwb3J0IG9wdGlvbnNcbiAgICogQHJldHVybiB7c3RyaW5nfSBmaWxlbmFtZSB3aXRob3V0IGFuIGV4dGVuc2lvblxuICAgKi9cbiAgZ2V0RXhwb3J0RmlsZW5hbWUoKSB7XG4gICAgY29uc3Qgc3RhcnREYXRlID0gdGhpcy5kYXRlcmFuZ2VwaWNrZXIuc3RhcnREYXRlLnN0YXJ0T2YoJ2RheScpLmZvcm1hdCgnWVlZWU1NREQnKSxcbiAgICAgIGVuZERhdGUgPSB0aGlzLmRhdGVyYW5nZXBpY2tlci5lbmREYXRlLnN0YXJ0T2YoJ2RheScpLmZvcm1hdCgnWVlZWU1NREQnKTtcbiAgICByZXR1cm4gYCR7dGhpcy5hcHB9LSR7c3RhcnREYXRlfS0ke2VuZERhdGV9YDtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgYSBmdWxsIGxpbmsgZm9yIHRoZSBnaXZlbiBwYWdlIGFuZCBwcm9qZWN0XG4gICAqIEBwYXJhbSAge3N0cmluZ30gcGFnZSAtIHBhZ2UgdG8gbGluayB0b1xuICAgKiBAcGFyYW0gIHtzdHJpbmd9IFtwcm9qZWN0XSAtIHByb2plY3QgbGluaywgZGVmYXVsdHMgdG8gYHRoaXMucHJvamVjdGBcbiAgICogQHJldHVybiB7c3RyaW5nfSBIVE1MIG1hcmt1cFxuICAgKi9cbiAgZ2V0UGFnZUxpbmsocGFnZSwgcHJvamVjdCkge1xuICAgIHJldHVybiBgPGEgdGFyZ2V0PVwiX2JsYW5rXCIgaHJlZj1cIiR7dGhpcy5nZXRQYWdlVVJMKHBhZ2UsIHByb2plY3QpfVwiPiR7cGFnZS5kZXNjb3JlKCkuZXNjYXBlKCl9PC9hPmA7XG4gIH1cblxuICAvKipcbiAgICogR2V0IHRoZSB3aWtpIFVSTCBnaXZlbiB0aGUgcGFnZSBuYW1lXG4gICAqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBwYWdlIC0gcGFnZSBuYW1lXG4gICAqIEByZXR1cm5zIHtzdHJpbmd9IFVSTCBmb3IgdGhlIHBhZ2VcbiAgICovXG4gIGdldFBhZ2VVUkwocGFnZSwgcHJvamVjdCA9IHRoaXMucHJvamVjdCkge1xuICAgIHJldHVybiBgLy8ke3Byb2plY3QucmVwbGFjZSgvXFwub3JnJC8sICcnKS5lc2NhcGUoKX0ub3JnL3dpa2kvJHtwYWdlLnNjb3JlKCkucmVwbGFjZSgvJy8sIGVzY2FwZSl9YDtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgdGhlIHdpa2kgVVJMIGdpdmVuIHRoZSBwYWdlIG5hbWVcbiAgICpcbiAgICogQHBhcmFtIHtzdHJpbmd9IHNpdGUgLSBzaXRlIG5hbWUgKGUuZy4gZW4ud2lraXBlZGlhLm9yZylcbiAgICogQHJldHVybnMge3N0cmluZ30gVVJMIGZvciB0aGUgc2l0ZVxuICAgKi9cbiAgZ2V0U2l0ZUxpbmsoc2l0ZSkge1xuICAgIHJldHVybiBgPGEgdGFyZ2V0PVwiX2JsYW5rXCIgaHJlZj1cIi8vJHtzaXRlfS5vcmdcIj4ke3NpdGV9PC9hPmA7XG4gIH1cblxuICAvKipcbiAgICogR2V0IHRoZSBwcm9qZWN0IG5hbWUgKHdpdGhvdXQgdGhlIC5vcmcpXG4gICAqXG4gICAqIEByZXR1cm5zIHtib29sZWFufSBsYW5nLnByb2plY3RuYW1lXG4gICAqL1xuICBnZXQgcHJvamVjdCgpIHtcbiAgICBjb25zdCBwcm9qZWN0ID0gJCh0aGlzLmNvbmZpZy5wcm9qZWN0SW5wdXQpLnZhbCgpO1xuICAgIC8qKiBHZXQgdGhlIGZpcnN0IDIgY2hhcmFjdGVycyBmcm9tIHRoZSBwcm9qZWN0IGNvZGUgdG8gZ2V0IHRoZSBsYW5ndWFnZSAqL1xuICAgIHJldHVybiBwcm9qZWN0ID8gcHJvamVjdC50b0xvd2VyQ2FzZSgpLnJlcGxhY2UoLy5vcmckLywgJycpIDogbnVsbDtcbiAgfVxuXG4gIGdldExvY2FsZURhdGVTdHJpbmcoKSB7XG4gICAgaWYgKCFuYXZpZ2F0b3IubGFuZ3VhZ2UpIHtcbiAgICAgIHJldHVybiB0aGlzLmNvbmZpZy5kZWZhdWx0cy5kYXRlRm9ybWF0O1xuICAgIH1cblxuICAgIGNvbnN0IGZvcm1hdHMgPSB7XG4gICAgICAnYXItc2EnOiAnREQvTU0vWVknLFxuICAgICAgJ2JnLWJnJzogJ0RELk0uWVlZWScsXG4gICAgICAnY2EtZXMnOiAnREQvTU0vWVlZWScsXG4gICAgICAnemgtdHcnOiAnWVlZWS9NL0QnLFxuICAgICAgJ2NzLWN6JzogJ0QuTS5ZWVlZJyxcbiAgICAgICdkYS1kayc6ICdERC1NTS1ZWVlZJyxcbiAgICAgICdkZS1kZSc6ICdERC5NTS5ZWVlZJyxcbiAgICAgICdlbC1ncic6ICdEL00vWVlZWScsXG4gICAgICAnZW4tdXMnOiAnTS9EL1lZWVknLFxuICAgICAgJ2ZpLWZpJzogJ0QuTS5ZWVlZJyxcbiAgICAgICdmci1mcic6ICdERC9NTS9ZWVlZJyxcbiAgICAgICdoZS1pbCc6ICdERC9NTS9ZWVlZJyxcbiAgICAgICdodS1odSc6ICdZWVlZLiBNTS4gREQuJyxcbiAgICAgICdpcy1pcyc6ICdELk0uWVlZWScsXG4gICAgICAnaXQtaXQnOiAnREQvTU0vWVlZWScsXG4gICAgICAnamEtanAnOiAnWVlZWS9NTS9ERCcsXG4gICAgICAna28ta3InOiAnWVlZWS1NTS1ERCcsXG4gICAgICAnbmwtbmwnOiAnRC1NLVlZWVknLFxuICAgICAgJ25iLW5vJzogJ0RELk1NLllZWVknLFxuICAgICAgJ3BsLXBsJzogJ1lZWVktTU0tREQnLFxuICAgICAgJ3B0LWJyJzogJ0QvTS9ZWVlZJyxcbiAgICAgICdyby1ybyc6ICdERC5NTS5ZWVlZJyxcbiAgICAgICdydS1ydSc6ICdERC5NTS5ZWVlZJyxcbiAgICAgICdoci1ocic6ICdELk0uWVlZWScsXG4gICAgICAnc2stc2snOiAnRC4gTS4gWVlZWScsXG4gICAgICAnc3EtYWwnOiAnWVlZWS1NTS1ERCcsXG4gICAgICAnc3Ytc2UnOiAnWVlZWS1NTS1ERCcsXG4gICAgICAndGgtdGgnOiAnRC9NL1lZWVknLFxuICAgICAgJ3RyLXRyJzogJ0RELk1NLllZWVknLFxuICAgICAgJ3VyLXBrJzogJ0REL01NL1lZWVknLFxuICAgICAgJ2lkLWlkJzogJ0REL01NL1lZWVknLFxuICAgICAgJ3VrLXVhJzogJ0RELk1NLllZWVknLFxuICAgICAgJ2JlLWJ5JzogJ0RELk1NLllZWVknLFxuICAgICAgJ3NsLXNpJzogJ0QuTS5ZWVlZJyxcbiAgICAgICdldC1lZSc6ICdELk1NLllZWVknLFxuICAgICAgJ2x2LWx2JzogJ1lZWVkuTU0uREQuJyxcbiAgICAgICdsdC1sdCc6ICdZWVlZLk1NLkREJyxcbiAgICAgICdmYS1pcic6ICdNTS9ERC9ZWVlZJyxcbiAgICAgICd2aS12bic6ICdERC9NTS9ZWVlZJyxcbiAgICAgICdoeS1hbSc6ICdERC5NTS5ZWVlZJyxcbiAgICAgICdhei1sYXRuLWF6JzogJ0RELk1NLllZWVknLFxuICAgICAgJ2V1LWVzJzogJ1lZWVkvTU0vREQnLFxuICAgICAgJ21rLW1rJzogJ0RELk1NLllZWVknLFxuICAgICAgJ2FmLXphJzogJ1lZWVkvTU0vREQnLFxuICAgICAgJ2thLWdlJzogJ0RELk1NLllZWVknLFxuICAgICAgJ2ZvLWZvJzogJ0RELU1NLVlZWVknLFxuICAgICAgJ2hpLWluJzogJ0RELU1NLVlZWVknLFxuICAgICAgJ21zLW15JzogJ0REL01NL1lZWVknLFxuICAgICAgJ2trLWt6JzogJ0RELk1NLllZWVknLFxuICAgICAgJ2t5LWtnJzogJ0RELk1NLllZJyxcbiAgICAgICdzdy1rZSc6ICdNL2QvWVlZWScsXG4gICAgICAndXotbGF0bi11eic6ICdERC9NTSBZWVlZJyxcbiAgICAgICd0dC1ydSc6ICdERC5NTS5ZWVlZJyxcbiAgICAgICdwYS1pbic6ICdERC1NTS1ZWScsXG4gICAgICAnZ3UtaW4nOiAnREQtTU0tWVknLFxuICAgICAgJ3RhLWluJzogJ0RELU1NLVlZWVknLFxuICAgICAgJ3RlLWluJzogJ0RELU1NLVlZJyxcbiAgICAgICdrbi1pbic6ICdERC1NTS1ZWScsXG4gICAgICAnbXItaW4nOiAnREQtTU0tWVlZWScsXG4gICAgICAnc2EtaW4nOiAnREQtTU0tWVlZWScsXG4gICAgICAnbW4tbW4nOiAnWVkuTU0uREQnLFxuICAgICAgJ2dsLWVzJzogJ0REL01NL1lZJyxcbiAgICAgICdrb2staW4nOiAnREQtTU0tWVlZWScsXG4gICAgICAnc3lyLXN5JzogJ0REL01NL1lZWVknLFxuICAgICAgJ2R2LW12JzogJ0REL01NL1lZJyxcbiAgICAgICdhci1pcSc6ICdERC9NTS9ZWVlZJyxcbiAgICAgICd6aC1jbic6ICdZWVlZL00vRCcsXG4gICAgICAnZGUtY2gnOiAnREQuTU0uWVlZWScsXG4gICAgICAnZW4tZ2InOiAnREQvTU0vWVlZWScsXG4gICAgICAnZXMtbXgnOiAnREQvTU0vWVlZWScsXG4gICAgICAnZnItYmUnOiAnRC9NTS9ZWVlZJyxcbiAgICAgICdpdC1jaCc6ICdERC5NTS5ZWVlZJyxcbiAgICAgICdubC1iZSc6ICdEL01NL1lZWVknLFxuICAgICAgJ25uLW5vJzogJ0RELk1NLllZWVknLFxuICAgICAgJ3B0LXB0JzogJ0RELU1NLVlZWVknLFxuICAgICAgJ3NyLWxhdG4tY3MnOiAnRC5NLllZWVknLFxuICAgICAgJ3N2LWZpJzogJ0QuTS5ZWVlZJyxcbiAgICAgICdhei1jeXJsLWF6JzogJ0RELk1NLllZWVknLFxuICAgICAgJ21zLWJuJzogJ0REL01NL1lZWVknLFxuICAgICAgJ3V6LWN5cmwtdXonOiAnREQuTU0uWVlZWScsXG4gICAgICAnYXItZWcnOiAnREQvTU0vWVlZWScsXG4gICAgICAnemgtaGsnOiAnRC9NL1lZWVknLFxuICAgICAgJ2RlLWF0JzogJ0RELk1NLllZWVknLFxuICAgICAgJ2VuLWF1JzogJ0QvTU0vWVlZWScsXG4gICAgICAnZXMtZXMnOiAnREQvTU0vWVlZWScsXG4gICAgICAnZnItY2EnOiAnWVlZWS1NTS1ERCcsXG4gICAgICAnc3ItY3lybC1jcyc6ICdELk0uWVlZWScsXG4gICAgICAnYXItbHknOiAnREQvTU0vWVlZWScsXG4gICAgICAnemgtc2cnOiAnRC9NL1lZWVknLFxuICAgICAgJ2RlLWx1JzogJ0RELk1NLllZWVknLFxuICAgICAgJ2VuLWNhJzogJ0REL01NL1lZWVknLFxuICAgICAgJ2VzLWd0JzogJ0REL01NL1lZWVknLFxuICAgICAgJ2ZyLWNoJzogJ0RELk1NLllZWVknLFxuICAgICAgJ2FyLWR6JzogJ0RELU1NLVlZWVknLFxuICAgICAgJ3poLW1vJzogJ0QvTS9ZWVlZJyxcbiAgICAgICdkZS1saSc6ICdERC5NTS5ZWVlZJyxcbiAgICAgICdlbi1ueic6ICdEL01NL1lZWVknLFxuICAgICAgJ2VzLWNyJzogJ0REL01NL1lZWVknLFxuICAgICAgJ2ZyLWx1JzogJ0REL01NL1lZWVknLFxuICAgICAgJ2FyLW1hJzogJ0RELU1NLVlZWVknLFxuICAgICAgJ2VuLWllJzogJ0REL01NL1lZWVknLFxuICAgICAgJ2VzLXBhJzogJ01NL0REL1lZWVknLFxuICAgICAgJ2ZyLW1jJzogJ0REL01NL1lZWVknLFxuICAgICAgJ2FyLXRuJzogJ0RELU1NLVlZWVknLFxuICAgICAgJ2VuLXphJzogJ1lZWVkvTU0vREQnLFxuICAgICAgJ2VzLWRvJzogJ0REL01NL1lZWVknLFxuICAgICAgJ2FyLW9tJzogJ0REL01NL1lZWVknLFxuICAgICAgJ2VuLWptJzogJ0REL01NL1lZWVknLFxuICAgICAgJ2VzLXZlJzogJ0REL01NL1lZWVknLFxuICAgICAgJ2FyLXllJzogJ0REL01NL1lZWVknLFxuICAgICAgJ2VuLTAyOSc6ICdNTS9ERC9ZWVlZJyxcbiAgICAgICdlcy1jbyc6ICdERC9NTS9ZWVlZJyxcbiAgICAgICdhci1zeSc6ICdERC9NTS9ZWVlZJyxcbiAgICAgICdlbi1ieic6ICdERC9NTS9ZWVlZJyxcbiAgICAgICdlcy1wZSc6ICdERC9NTS9ZWVlZJyxcbiAgICAgICdhci1qbyc6ICdERC9NTS9ZWVlZJyxcbiAgICAgICdlbi10dCc6ICdERC9NTS9ZWVlZJyxcbiAgICAgICdlcy1hcic6ICdERC9NTS9ZWVlZJyxcbiAgICAgICdhci1sYic6ICdERC9NTS9ZWVlZJyxcbiAgICAgICdlbi16dyc6ICdNL0QvWVlZWScsXG4gICAgICAnZXMtZWMnOiAnREQvTU0vWVlZWScsXG4gICAgICAnYXIta3cnOiAnREQvTU0vWVlZWScsXG4gICAgICAnZW4tcGgnOiAnTS9EL1lZWVknLFxuICAgICAgJ2VzLWNsJzogJ0RELU1NLVlZWVknLFxuICAgICAgJ2FyLWFlJzogJ0REL01NL1lZWVknLFxuICAgICAgJ2VzLXV5JzogJ0REL01NL1lZWVknLFxuICAgICAgJ2FyLWJoJzogJ0REL01NL1lZWVknLFxuICAgICAgJ2VzLXB5JzogJ0REL01NL1lZWVknLFxuICAgICAgJ2FyLXFhJzogJ0REL01NL1lZWVknLFxuICAgICAgJ2VzLWJvJzogJ0REL01NL1lZWVknLFxuICAgICAgJ2VzLXN2JzogJ0REL01NL1lZWVknLFxuICAgICAgJ2VzLWhuJzogJ0REL01NL1lZWVknLFxuICAgICAgJ2VzLW5pJzogJ0REL01NL1lZWVknLFxuICAgICAgJ2VzLXByJzogJ0REL01NL1lZWVknLFxuICAgICAgJ2FtLWV0JzogJ0QvTS9ZWVlZJyxcbiAgICAgICd0em0tbGF0bi1keic6ICdERC1NTS1ZWVlZJyxcbiAgICAgICdpdS1sYXRuLWNhJzogJ0QvTU0vWVlZWScsXG4gICAgICAnc21hLW5vJzogJ0RELk1NLllZWVknLFxuICAgICAgJ21uLW1vbmctY24nOiAnWVlZWS9NL0QnLFxuICAgICAgJ2dkLWdiJzogJ0REL01NL1lZWVknLFxuICAgICAgJ2VuLW15JzogJ0QvTS9ZWVlZJyxcbiAgICAgICdwcnMtYWYnOiAnREQvTU0vWVknLFxuICAgICAgJ2JuLWJkJzogJ0RELU1NLVlZJyxcbiAgICAgICd3by1zbic6ICdERC9NTS9ZWVlZJyxcbiAgICAgICdydy1ydyc6ICdNL0QvWVlZWScsXG4gICAgICAncXV0LWd0JzogJ0REL01NL1lZWVknLFxuICAgICAgJ3NhaC1ydSc6ICdNTS5ERC5ZWVlZJyxcbiAgICAgICdnc3ctZnInOiAnREQvTU0vWVlZWScsXG4gICAgICAnY28tZnInOiAnREQvTU0vWVlZWScsXG4gICAgICAnb2MtZnInOiAnREQvTU0vWVlZWScsXG4gICAgICAnbWktbnonOiAnREQvTU0vWVlZWScsXG4gICAgICAnZ2EtaWUnOiAnREQvTU0vWVlZWScsXG4gICAgICAnc2Utc2UnOiAnWVlZWS1NTS1ERCcsXG4gICAgICAnYnItZnInOiAnREQvTU0vWVlZWScsXG4gICAgICAnc21uLWZpJzogJ0QuTS5ZWVlZJyxcbiAgICAgICdtb2gtY2EnOiAnTS9EL1lZWVknLFxuICAgICAgJ2Fybi1jbCc6ICdERC1NTS1ZWVlZJyxcbiAgICAgICdpaS1jbic6ICdZWVlZL00vRCcsXG4gICAgICAnZHNiLWRlJzogJ0QuIE0uIFlZWVknLFxuICAgICAgJ2lnLW5nJzogJ0QvTS9ZWVlZJyxcbiAgICAgICdrbC1nbCc6ICdERC1NTS1ZWVlZJyxcbiAgICAgICdsYi1sdSc6ICdERC9NTS9ZWVlZJyxcbiAgICAgICdiYS1ydSc6ICdERC5NTS5ZWScsXG4gICAgICAnbnNvLXphJzogJ1lZWVkvTU0vREQnLFxuICAgICAgJ3F1ei1ibyc6ICdERC9NTS9ZWVlZJyxcbiAgICAgICd5by1uZyc6ICdEL00vWVlZWScsXG4gICAgICAnaGEtbGF0bi1uZyc6ICdEL00vWVlZWScsXG4gICAgICAnZmlsLXBoJzogJ00vRC9ZWVlZJyxcbiAgICAgICdwcy1hZic6ICdERC9NTS9ZWScsXG4gICAgICAnZnktbmwnOiAnRC1NLVlZWVknLFxuICAgICAgJ25lLW5wJzogJ00vRC9ZWVlZJyxcbiAgICAgICdzZS1ubyc6ICdERC5NTS5ZWVlZJyxcbiAgICAgICdpdS1jYW5zLWNhJzogJ0QvTS9ZWVlZJyxcbiAgICAgICdzci1sYXRuLXJzJzogJ0QuTS5ZWVlZJyxcbiAgICAgICdzaS1sayc6ICdZWVlZLU1NLUREJyxcbiAgICAgICdzci1jeXJsLXJzJzogJ0QuTS5ZWVlZJyxcbiAgICAgICdsby1sYSc6ICdERC9NTS9ZWVlZJyxcbiAgICAgICdrbS1raCc6ICdZWVlZLU1NLUREJyxcbiAgICAgICdjeS1nYic6ICdERC9NTS9ZWVlZJyxcbiAgICAgICdiby1jbic6ICdZWVlZL00vRCcsXG4gICAgICAnc21zLWZpJzogJ0QuTS5ZWVlZJyxcbiAgICAgICdhcy1pbic6ICdERC1NTS1ZWVlZJyxcbiAgICAgICdtbC1pbic6ICdERC1NTS1ZWScsXG4gICAgICAnZW4taW4nOiAnREQtTU0tWVlZWScsXG4gICAgICAnb3ItaW4nOiAnREQtTU0tWVknLFxuICAgICAgJ2JuLWluJzogJ0RELU1NLVlZJyxcbiAgICAgICd0ay10bSc6ICdERC5NTS5ZWScsXG4gICAgICAnYnMtbGF0bi1iYSc6ICdELk0uWVlZWScsXG4gICAgICAnbXQtbXQnOiAnREQvTU0vWVlZWScsXG4gICAgICAnc3ItY3lybC1tZSc6ICdELk0uWVlZWScsXG4gICAgICAnc2UtZmknOiAnRC5NLllZWVknLFxuICAgICAgJ3p1LXphJzogJ1lZWVkvTU0vREQnLFxuICAgICAgJ3hoLXphJzogJ1lZWVkvTU0vREQnLFxuICAgICAgJ3RuLXphJzogJ1lZWVkvTU0vREQnLFxuICAgICAgJ2hzYi1kZSc6ICdELiBNLiBZWVlZJyxcbiAgICAgICdicy1jeXJsLWJhJzogJ0QuTS5ZWVlZJyxcbiAgICAgICd0Zy1jeXJsLXRqJzogJ0RELk1NLnl5JyxcbiAgICAgICdzci1sYXRuLWJhJzogJ0QuTS5ZWVlZJyxcbiAgICAgICdzbWotbm8nOiAnREQuTU0uWVlZWScsXG4gICAgICAncm0tY2gnOiAnREQvTU0vWVlZWScsXG4gICAgICAnc21qLXNlJzogJ1lZWVktTU0tREQnLFxuICAgICAgJ3F1ei1lYyc6ICdERC9NTS9ZWVlZJyxcbiAgICAgICdxdXotcGUnOiAnREQvTU0vWVlZWScsXG4gICAgICAnaHItYmEnOiAnRC5NLllZWVkuJyxcbiAgICAgICdzci1sYXRuLW1lJzogJ0QuTS5ZWVlZJyxcbiAgICAgICdzbWEtc2UnOiAnWVlZWS1NTS1ERCcsXG4gICAgICAnZW4tc2cnOiAnRC9NL1lZWVknLFxuICAgICAgJ3VnLWNuJzogJ1lZWVktTS1EJyxcbiAgICAgICdzci1jeXJsLWJhJzogJ0QuTS5ZWVlZJyxcbiAgICAgICdlcy11cyc6ICdNL0QvWVlZWSdcbiAgICB9O1xuXG4gICAgY29uc3Qga2V5ID0gbmF2aWdhdG9yLmxhbmd1YWdlLnRvTG93ZXJDYXNlKCk7XG4gICAgcmV0dXJuIGZvcm1hdHNba2V5XSB8fCB0aGlzLmNvbmZpZy5kZWZhdWx0cy5kYXRlRm9ybWF0O1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCBhIHZhbHVlIGZyb20gbG9jYWxTdG9yYWdlLCB1c2luZyBhIHRlbXBvcmFyeSBzdG9yYWdlIGlmIGxvY2FsU3RvcmFnZSBpcyBub3Qgc3VwcG9ydGVkXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgLSBrZXkgZm9yIHRoZSB2YWx1ZSB0byByZXRyaWV2ZVxuICAgKiBAcmV0dXJucyB7TWl4ZWR9IHN0b3JlZCB2YWx1ZVxuICAgKi9cbiAgZ2V0RnJvbUxvY2FsU3RvcmFnZShrZXkpIHtcbiAgICAvLyBTZWUgaWYgbG9jYWxTdG9yYWdlIGlzIHN1cHBvcnRlZCBhbmQgZW5hYmxlZFxuICAgIHRyeSB7XG4gICAgICByZXR1cm4gbG9jYWxTdG9yYWdlLmdldEl0ZW0oa2V5KTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIHJldHVybiBzdG9yYWdlW2tleV07XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEdldCBVUkwgdG8gZmlsZSBhIHJlcG9ydCBvbiBNZXRhLCBwcmVsb2FkZWQgd2l0aCBwZXJtYWxpbmtcbiAgICogQHBhcmFtIHtTdHJpbmd9IFtwaGFiUGFzdGVdIFVSTCB0byBhdXRvLWdlbmVyYXRlZCBlcnJvciByZXBvcnQgb24gUGhhYnJpY2F0b3JcbiAgICogQHJldHVybiB7U3RyaW5nfSBVUkxcbiAgICovXG4gIGdldEJ1Z1JlcG9ydFVSTChwaGFiUGFzdGUpIHtcbiAgICBjb25zdCByZXBvcnRVUkwgPSAnaHR0cHM6Ly9tZXRhLndpa2ltZWRpYS5vcmcvdy9pbmRleC5waHA/dGl0bGU9VGFsazpQYWdldmlld3NfQW5hbHlzaXMmYWN0aW9uPWVkaXQnICtcbiAgICAgIGAmc2VjdGlvbj1uZXcmcHJlbG9hZHRpdGxlPSR7dGhpcy5hcHAudXBjYXNlKCl9IGJ1ZyByZXBvcnRgO1xuXG4gICAgaWYgKHBoYWJQYXN0ZSkge1xuICAgICAgcmV0dXJuIGAke3JlcG9ydFVSTH0mcHJlbG9hZD1UYWxrOlBhZ2V2aWV3c19BbmFseXNpcy9QcmVsb2FkJnByZWxvYWRwYXJhbXNbXT0ke3BoYWJQYXN0ZX1gO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gcmVwb3J0VVJMO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgZ2VuZXJhbCBpbmZvcm1hdGlvbiBhYm91dCBhIHByb2plY3QsIHN1Y2ggYXMgbmFtZXNwYWNlcywgdGl0bGUgb2YgdGhlIG1haW4gcGFnZSwgZXRjLlxuICAgKiBEYXRhIHJldHVybmVkIGJ5IHRoZSBhcGkgaXMgYWxzbyBzdG9yZWQgaW4gdGhpcy5zaXRlSW5mb1xuICAgKiBAcGFyYW0ge1N0cmluZ30gcHJvamVjdCAtIHByb2plY3Qgc3VjaCBhcyBlbi53aWtpcGVkaWEgKHdpdGggb3Igd2l0aG91dCAub3JnKVxuICAgKiBAcmV0dXJucyB7RGVmZXJyZWR9IHByb21pc2UgcmVzb2x2aW5nIHdpdGggc2l0ZWluZm8sXG4gICAqICAgYWxvbmcgd2l0aCBhbnkgb3RoZXIgY2FjaGVkIHNpdGVpbmZvIGZvciBvdGhlciBwcm9qZWN0c1xuICAgKi9cbiAgZmV0Y2hTaXRlSW5mbyhwcm9qZWN0KSB7XG4gICAgcHJvamVjdCA9IHByb2plY3QucmVwbGFjZSgvXFwub3JnJC8sICcnKTtcbiAgICBjb25zdCBkZmQgPSAkLkRlZmVycmVkKCksXG4gICAgICBjYWNoZUtleSA9IGBwYWdldmlld3Mtc2l0ZWluZm8tJHtwcm9qZWN0fWA7XG5cbiAgICBpZiAodGhpcy5zaXRlSW5mb1twcm9qZWN0XSkgcmV0dXJuIGRmZC5yZXNvbHZlKHRoaXMuc2l0ZUluZm8pO1xuXG4gICAgLy8gdXNlIGNhY2hlZCBzaXRlIGluZm8gaWYgcHJlc2VudFxuICAgIGlmIChzaW1wbGVTdG9yYWdlLmhhc0tleShjYWNoZUtleSkpIHtcbiAgICAgIHRoaXMuc2l0ZUluZm9bcHJvamVjdF0gPSBzaW1wbGVTdG9yYWdlLmdldChjYWNoZUtleSk7XG4gICAgICBkZmQucmVzb2x2ZSh0aGlzLnNpdGVJbmZvKTtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gb3RoZXJ3aXNlIGZldGNoIHNpdGVpbmZvIGFuZCBzdG9yZSBpbiBjYWNoZVxuICAgICAgJC5hamF4KHtcbiAgICAgICAgdXJsOiBgaHR0cHM6Ly8ke3Byb2plY3R9Lm9yZy93L2FwaS5waHBgLFxuICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgYWN0aW9uOiAncXVlcnknLFxuICAgICAgICAgIG1ldGE6ICdzaXRlaW5mbycsXG4gICAgICAgICAgc2lwcm9wOiAnZ2VuZXJhbHxuYW1lc3BhY2VzJyxcbiAgICAgICAgICBmb3JtYXQ6ICdqc29uJ1xuICAgICAgICB9LFxuICAgICAgICBkYXRhVHlwZTogJ2pzb25wJ1xuICAgICAgfSkuZG9uZShkYXRhID0+IHtcbiAgICAgICAgdGhpcy5zaXRlSW5mb1twcm9qZWN0XSA9IGRhdGEucXVlcnk7XG5cbiAgICAgICAgLy8gY2FjaGUgZm9yIG9uZSB3ZWVrIChUVEwgaXMgaW4gbWlsbGlzZWNvbmRzKVxuICAgICAgICBzaW1wbGVTdG9yYWdlLnNldChjYWNoZUtleSwgdGhpcy5zaXRlSW5mb1twcm9qZWN0XSwge1RUTDogMTAwMCAqIDYwICogNjAgKiAyNCAqIDd9KTtcblxuICAgICAgICBkZmQucmVzb2x2ZSh0aGlzLnNpdGVJbmZvKTtcbiAgICAgIH0pLmZhaWwoZGF0YSA9PiB7XG4gICAgICAgIGRmZC5yZWplY3QoZGF0YSk7XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICByZXR1cm4gZGZkO1xuICB9XG5cbiAgLyoqXG4gICAqIEhlbHBlciB0byBnZXQgc2l0ZWluZm8gZnJvbSB0aGlzLnNpdGVJbmZvIGZvciBnaXZlbiBwcm9qZWN0LCB3aXRoIG9yIHdpdGhvdXQgLm9yZ1xuICAgKiBAcGFyYW0ge1N0cmluZ30gcHJvamVjdCAtIHByb2plY3QgbmFtZSwgd2l0aCBvciB3aXRob3V0IC5vcmdcbiAgICogQHJldHVybnMge09iamVjdHx1bmRlZmluZWR9IHNpdGUgaW5mb3JtYXRpb24gaWYgcHJlc2VudFxuICAgKi9cbiAgZ2V0U2l0ZUluZm8ocHJvamVjdCkge1xuICAgIHJldHVybiB0aGlzLnNpdGVJbmZvW3Byb2plY3QucmVwbGFjZSgvXFwub3JnJC8sICcnKV07XG4gIH1cblxuICAvKipcbiAgICogR2V0IHVzZXIgYWdlbnQsIGlmIHN1cHBvcnRlZFxuICAgKiBAcmV0dXJucyB7c3RyaW5nfSB1c2VyLWFnZW50XG4gICAqL1xuICBnZXRVc2VyQWdlbnQoKSB7XG4gICAgcmV0dXJuIG5hdmlnYXRvci51c2VyQWdlbnQgPyBuYXZpZ2F0b3IudXNlckFnZW50IDogJ1Vua25vd24nO1xuICB9XG5cbiAgLyoqXG4gICAqIFNldCBhIHZhbHVlIHRvIGxvY2FsU3RvcmFnZSwgdXNpbmcgYSB0ZW1wb3Jhcnkgc3RvcmFnZSBpZiBsb2NhbFN0b3JhZ2UgaXMgbm90IHN1cHBvcnRlZFxuICAgKiBAcGFyYW0ge3N0cmluZ30ga2V5IC0ga2V5IGZvciB0aGUgdmFsdWUgdG8gc2V0XG4gICAqIEBwYXJhbSB7TWl4ZWR9IHZhbHVlIC0gdmFsdWUgdG8gc3RvcmVcbiAgICogQHJldHVybnMge01peGVkfSBzdG9yZWQgdmFsdWVcbiAgICovXG4gIHNldExvY2FsU3RvcmFnZShrZXksIHZhbHVlKSB7XG4gICAgLy8gU2VlIGlmIGxvY2FsU3RvcmFnZSBpcyBzdXBwb3J0ZWQgYW5kIGVuYWJsZWRcbiAgICB0cnkge1xuICAgICAgcmV0dXJuIGxvY2FsU3RvcmFnZS5zZXRJdGVtKGtleSwgdmFsdWUpO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgcmV0dXJuIHN0b3JhZ2Vba2V5XSA9IHZhbHVlO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBHZW5lcmF0ZSBhIHVuaXF1ZSBoYXNoIGNvZGUgZnJvbSBnaXZlbiBzdHJpbmdcbiAgICogQHBhcmFtICB7U3RyaW5nfSBzdHIgLSB0byBiZSBoYXNoZWRcbiAgICogQHJldHVybiB7U3RyaW5nfSB0aGUgaGFzaFxuICAgKi9cbiAgaGFzaENvZGUoc3RyKSB7XG4gICAgcmV0dXJuIHN0ci5zcGxpdCgnJykucmVkdWNlKChwcmV2SGFzaCwgY3VyclZhbCkgPT5cbiAgICAgICgocHJldkhhc2ggPDwgNSkgLSBwcmV2SGFzaCkgKyBjdXJyVmFsLmNoYXJDb2RlQXQoMCksIDApO1xuICB9XG5cbiAgLyoqXG4gICAqIElzIHRoaXMgb25lIG9mIHRoZSBjaGFydC12aWV3IGFwcHMgKHRoYXQgZG9lcyBub3QgaGF2ZSBhIGxpc3Qgdmlldyk/XG4gICAqIEByZXR1cm4ge0Jvb2xlYW59IHRydWUgb3IgZmFsc2VcbiAgICovXG4gIGlzQ2hhcnRBcHAoKSB7XG4gICAgcmV0dXJuICF0aGlzLmlzTGlzdEFwcCgpO1xuICB9XG5cbiAgLyoqXG4gICAqIElzIHRoaXMgb25lIG9mIHRoZSBsaXN0LXZpZXcgYXBwcz9cbiAgICogQHJldHVybiB7Qm9vbGVhbn0gdHJ1ZSBvciBmYWxzZVxuICAgKi9cbiAgaXNMaXN0QXBwKCkge1xuICAgIHJldHVybiBbJ2xhbmd2aWV3cycsICdtYXNzdmlld3MnLCAncmVkaXJlY3R2aWV3cyddLmluY2x1ZGVzKHRoaXMuYXBwKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBUZXN0IGlmIHRoZSBjdXJyZW50IHByb2plY3QgaXMgYSBtdWx0aWxpbmd1YWwgcHJvamVjdFxuICAgKiBAcmV0dXJucyB7Qm9vbGVhbn0gaXMgbXVsdGlsaW5ndWFsIG9yIG5vdFxuICAgKi9cbiAgaXNNdWx0aWxhbmdQcm9qZWN0KCkge1xuICAgIHJldHVybiBuZXcgUmVnRXhwKGAuKj9cXFxcLigke1B2Lm11bHRpbGFuZ1Byb2plY3RzLmpvaW4oJ3wnKX0pYCkudGVzdCh0aGlzLnByb2plY3QpO1xuICB9XG5cbiAgLyoqXG4gICAqIE1hcCBub3JtYWxpemVkIHBhZ2VzIGZyb20gQVBJIGludG8gYSBzdHJpbmcgb2YgcGFnZSBuYW1lc1xuICAgKiBVc2VkIGluIG5vcm1hbGl6ZVBhZ2VOYW1lcygpXG4gICAqXG4gICAqIEBwYXJhbSB7YXJyYXl9IHBhZ2VzIC0gYXJyYXkgb2YgcGFnZSBuYW1lc1xuICAgKiBAcGFyYW0ge2FycmF5fSBub3JtYWxpemVkUGFnZXMgLSBhcnJheSBvZiBub3JtYWxpemVkIG1hcHBpbmdzIHJldHVybmVkIGJ5IHRoZSBBUElcbiAgICogQHJldHVybnMge2FycmF5fSBwYWdlcyB3aXRoIHRoZSBuZXcgbm9ybWFsaXplZCBuYW1lcywgaWYgZ2l2ZW5cbiAgICovXG4gIG1hcE5vcm1hbGl6ZWRQYWdlTmFtZXMocGFnZXMsIG5vcm1hbGl6ZWRQYWdlcykge1xuICAgIG5vcm1hbGl6ZWRQYWdlcy5mb3JFYWNoKG5vcm1hbFBhZ2UgPT4ge1xuICAgICAgLyoqIGRvIGl0IHRoaXMgd2F5IHRvIHByZXNlcnZlIG9yZGVyaW5nIG9mIHBhZ2VzICovXG4gICAgICBwYWdlcyA9IHBhZ2VzLm1hcChwYWdlID0+IHtcbiAgICAgICAgaWYgKG5vcm1hbFBhZ2UuZnJvbSA9PT0gcGFnZSkge1xuICAgICAgICAgIHJldHVybiBub3JtYWxQYWdlLnRvO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJldHVybiBwYWdlO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9KTtcbiAgICByZXR1cm4gcGFnZXM7XG4gIH1cblxuICAvKipcbiAgICogTGlzdCBvZiB2YWxpZCBtdWx0aWxpbmd1YWwgcHJvamVjdHNcbiAgICogQHJldHVybiB7QXJyYXl9IGJhc2UgcHJvamVjdHMsIHdpdGhvdXQgdGhlIGxhbmd1YWdlXG4gICAqL1xuICBzdGF0aWMgZ2V0IG11bHRpbGFuZ1Byb2plY3RzKCkge1xuICAgIHJldHVybiBbXG4gICAgICAnd2lraXBlZGlhJyxcbiAgICAgICd3aWtpYm9va3MnLFxuICAgICAgJ3dpa2luZXdzJyxcbiAgICAgICd3aWtpcXVvdGUnLFxuICAgICAgJ3dpa2lzb3VyY2UnLFxuICAgICAgJ3dpa2l2ZXJzaXR5JyxcbiAgICAgICd3aWtpdm95YWdlJ1xuICAgIF07XG4gIH1cblxuICAvKipcbiAgICogTWFrZSBtYXNzIHJlcXVlc3RzIHRvIE1lZGlhV2lraSBBUElcbiAgICogVGhlIEFQSSBub3JtYWxseSBsaW1pdHMgdG8gNTAwIHBhZ2VzLCBidXQgZ2l2ZXMgeW91IGEgJ2NvbnRpbnVlJyB2YWx1ZVxuICAgKiAgIHRvIGZpbmlzaCBpdGVyYXRpbmcgdGhyb3VnaCB0aGUgcmVzb3VyY2UuXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBwYXJhbXMgLSBwYXJhbWV0ZXJzIHRvIHBhc3MgdG8gdGhlIEFQSVxuICAgKiBAcGFyYW0ge1N0cmluZ30gcHJvamVjdCAtIHByb2plY3QgdG8gcXVlcnksIGUuZy4gZW4ud2lraXBlZGlhICgub3JnIGlzIG9wdGlvbmFsKVxuICAgKiBAcGFyYW0ge1N0cmluZ30gW2NvbnRpbnVlS2V5XSAtIHRoZSBrZXkgdG8gbG9vayBpbiB0aGUgY29udGludWUgaGFzaCwgaWYgcHJlc2VudCAoZS5nLiBjbWNvbnRpbnVlIGZvciBBUEk6Q2F0ZWdvcnltZW1iZXJzKVxuICAgKiBAcGFyYW0ge1N0cmluZ3xGdW5jdGlvbn0gW2RhdGFLZXldIC0gdGhlIGtleSBmb3IgdGhlIG1haW4gY2h1bmsgb2YgZGF0YSwgaW4gdGhlIHF1ZXJ5IGhhc2ggKGUuZy4gY2F0ZWdvcnltZW1iZXJzIGZvciBBUEk6Q2F0ZWdvcnltZW1iZXJzKVxuICAgKiAgIElmIHRoaXMgaXMgYSBmdW5jdGlvbiBpdCBpcyBnaXZlbiB0aGUgcmVzcG9uc2UgZGF0YSwgYW5kIGV4cGVjdGVkIHRvIHJldHVybiB0aGUgZGF0YSB3ZSB3YW50IHRvIGNvbmNhdGVudGF0ZS5cbiAgICogQHBhcmFtIHtOdW1iZXJ9IFtsaW1pdF0gLSBtYXggbnVtYmVyIG9mIHBhZ2VzIHRvIGZldGNoXG4gICAqIEByZXR1cm4ge0RlZmVycmVkfSBwcm9taXNlIHJlc29sdmluZyB3aXRoIGRhdGFcbiAgICovXG4gIG1hc3NBcGkocGFyYW1zLCBwcm9qZWN0LCBjb250aW51ZUtleSA9ICdjb250aW51ZScsIGRhdGFLZXksIGxpbWl0ID0gdGhpcy5jb25maWcuYXBpTGltaXQpIHtcbiAgICBpZiAoIS9cXC5vcmckLy50ZXN0KHByb2plY3QpKSBwcm9qZWN0ICs9ICcub3JnJztcblxuICAgIGNvbnN0IGRmZCA9ICQuRGVmZXJyZWQoKTtcbiAgICBsZXQgcmVzb2x2ZURhdGEgPSB7XG4gICAgICBwYWdlczogW11cbiAgICB9O1xuXG4gICAgY29uc3QgbWFrZVJlcXVlc3QgPSBjb250aW51ZVZhbHVlID0+IHtcbiAgICAgIGxldCByZXF1ZXN0RGF0YSA9IE9iamVjdC5hc3NpZ24oe1xuICAgICAgICBhY3Rpb246ICdxdWVyeScsXG4gICAgICAgIGZvcm1hdDogJ2pzb24nLFxuICAgICAgICBmb3JtYXR2ZXJzaW9uOiAnMidcbiAgICAgIH0sIHBhcmFtcyk7XG5cbiAgICAgIGlmIChjb250aW51ZVZhbHVlKSByZXF1ZXN0RGF0YVtjb250aW51ZUtleV0gPSBjb250aW51ZVZhbHVlO1xuXG4gICAgICBjb25zdCBwcm9taXNlID0gJC5hamF4KHtcbiAgICAgICAgdXJsOiBgaHR0cHM6Ly8ke3Byb2plY3R9L3cvYXBpLnBocGAsXG4gICAgICAgIGpzb25wOiAnY2FsbGJhY2snLFxuICAgICAgICBkYXRhVHlwZTogJ2pzb25wJyxcbiAgICAgICAgZGF0YTogcmVxdWVzdERhdGFcbiAgICAgIH0pO1xuXG4gICAgICBwcm9taXNlLmRvbmUoZGF0YSA9PiB7XG4gICAgICAgIC8vIHNvbWUgZmFpbHVyZXMgY29tZSBiYWNrIGFzIDIwMHMsIHNvIHdlIHN0aWxsIHJlc29sdmUgYW5kIGxldCB0aGUgbG9jYWwgYXBwIGhhbmRsZSBpdFxuICAgICAgICBpZiAoZGF0YS5lcnJvcikgcmV0dXJuIGRmZC5yZXNvbHZlKGRhdGEpO1xuXG4gICAgICAgIGxldCBpc0ZpbmlzaGVkO1xuXG4gICAgICAgIC8vIGFsbG93IGN1c3RvbSBmdW5jdGlvbiB0byBwYXJzZSB0aGUgZGF0YSB3ZSB3YW50LCBpZiBwcm92aWRlZFxuICAgICAgICBpZiAodHlwZW9mIGRhdGFLZXkgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICByZXNvbHZlRGF0YS5wYWdlcyA9IHJlc29sdmVEYXRhLnBhZ2VzLmNvbmNhdChkYXRhS2V5KGRhdGEucXVlcnkpKTtcbiAgICAgICAgICBpc0ZpbmlzaGVkID0gcmVzb2x2ZURhdGEucGFnZXMubGVuZ3RoID49IGxpbWl0O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIC8vIGFwcGVuZCBuZXcgZGF0YSB0byBkYXRhIGZyb20gbGFzdCByZXF1ZXN0LiBXZSBtaWdodCB3YW50IGJvdGggJ3BhZ2VzJyBhbmQgZGF0YUtleVxuICAgICAgICAgIGlmIChkYXRhLnF1ZXJ5LnBhZ2VzKSB7XG4gICAgICAgICAgICByZXNvbHZlRGF0YS5wYWdlcyA9IHJlc29sdmVEYXRhLnBhZ2VzLmNvbmNhdChkYXRhLnF1ZXJ5LnBhZ2VzKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKGRhdGEucXVlcnlbZGF0YUtleV0pIHtcbiAgICAgICAgICAgIHJlc29sdmVEYXRhW2RhdGFLZXldID0gKHJlc29sdmVEYXRhW2RhdGFLZXldIHx8IFtdKS5jb25jYXQoZGF0YS5xdWVyeVtkYXRhS2V5XSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIC8vIElmIHBhZ2VzIGlzIG5vdCB0aGUgY29sbGVjdGlvbiB3ZSB3YW50LCBpdCB3aWxsIGJlIGVpdGhlciBhbiBlbXB0eSBhcnJheSBvciBvbmUgZW50cnkgd2l0aCBiYXNpYyBwYWdlIGluZm9cbiAgICAgICAgICAvLyAgIGRlcGVuZGluZyBvbiB3aGF0IEFQSSB3ZSdyZSBoaXR0aW5nLiBTbyByZXNvbHZlRGF0YVtkYXRhS2V5XSB3aWxsIGhpdCB0aGUgbGltaXRcbiAgICAgICAgICBpc0ZpbmlzaGVkID0gcmVzb2x2ZURhdGEucGFnZXMubGVuZ3RoID49IGxpbWl0IHx8IHJlc29sdmVEYXRhW2RhdGFLZXldLmxlbmd0aCA+PSBsaW1pdDtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIG1ha2UgcmVjdXJzaXZlIGNhbGwgaWYgbmVlZGVkLCB3YWl0aW5nIDEwMG1zXG4gICAgICAgIGlmICghaXNGaW5pc2hlZCAmJiBkYXRhLmNvbnRpbnVlICYmIGRhdGEuY29udGludWVbY29udGludWVLZXldKSB7XG4gICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICBtYWtlUmVxdWVzdChkYXRhLmNvbnRpbnVlW2NvbnRpbnVlS2V5XSk7XG4gICAgICAgICAgfSwgMTAwKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAvLyBpbmRpY2F0ZSB0aGVyZSB3ZXJlIG1vcmUgZW50cmllcyB0aGFuIHRoZSBsaW1pdFxuICAgICAgICAgIGlmIChkYXRhLmNvbnRpbnVlKSByZXNvbHZlRGF0YS5jb250aW51ZSA9IHRydWU7XG4gICAgICAgICAgZGZkLnJlc29sdmUocmVzb2x2ZURhdGEpO1xuICAgICAgICB9XG4gICAgICB9KS5mYWlsKGRhdGEgPT4ge1xuICAgICAgICBkZmQucmVqZWN0KGRhdGEpO1xuICAgICAgfSk7XG4gICAgfTtcblxuICAgIG1ha2VSZXF1ZXN0KCk7XG5cbiAgICByZXR1cm4gZGZkO1xuICB9XG5cbiAgLyoqXG4gICAqIExvY2FsaXplIE51bWJlciBvYmplY3Qgd2l0aCBkZWxpbWl0ZXJzXG4gICAqXG4gICAqIEBwYXJhbSB7TnVtYmVyfSB2YWx1ZSAtIHRoZSBOdW1iZXIsIGUuZy4gMTIzNDU2N1xuICAgKiBAcmV0dXJucyB7c3RyaW5nfSAtIHdpdGggbG9jYWxlIGRlbGltaXRlcnMsIGUuZy4gMSwyMzQsNTY3IChlbi1VUylcbiAgICovXG4gIG4odmFsdWUpIHtcbiAgICByZXR1cm4gKG5ldyBOdW1iZXIodmFsdWUpKS50b0xvY2FsZVN0cmluZygpO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCBiYXNpYyBpbmZvIG9uIGdpdmVuIHBhZ2VzLCBpbmNsdWRpbmcgdGhlIG5vcm1hbGl6ZWQgcGFnZSBuYW1lcy5cbiAgICogRS5nLiBtYXNjdWxpbmUgdmVyc3VzIGZlbWluaW5lIG5hbWVzcGFjZXMgb24gZGV3aWtpXG4gICAqIEBwYXJhbSB7YXJyYXl9IHBhZ2VzIC0gYXJyYXkgb2YgcGFnZSBuYW1lc1xuICAgKiBAcmV0dXJucyB7RGVmZXJyZWR9IHByb21pc2Ugd2l0aCBkYXRhIGZldGNoZWQgZnJvbSBBUElcbiAgICovXG4gIGdldFBhZ2VJbmZvKHBhZ2VzKSB7XG4gICAgbGV0IGRmZCA9ICQuRGVmZXJyZWQoKTtcblxuICAgIHJldHVybiAkLmFqYXgoe1xuICAgICAgdXJsOiBgaHR0cHM6Ly8ke3RoaXMucHJvamVjdH0ub3JnL3cvYXBpLnBocD9hY3Rpb249cXVlcnkmcHJvcD1pbmZvJmlucHJvcD1wcm90ZWN0aW9ufHdhdGNoZXJzYCArXG4gICAgICAgIGAmZm9ybWF0dmVyc2lvbj0yJmZvcm1hdD1qc29uJnRpdGxlcz0ke3BhZ2VzLmpvaW4oJ3wnKX1gLFxuICAgICAgZGF0YVR5cGU6ICdqc29ucCdcbiAgICB9KS50aGVuKGRhdGEgPT4ge1xuICAgICAgbGV0IHBhZ2VEYXRhID0ge307XG4gICAgICBkYXRhLnF1ZXJ5LnBhZ2VzLmZvckVhY2gocGFnZSA9PiB7XG4gICAgICAgIHBhZ2VEYXRhW3BhZ2UudGl0bGVdID0gcGFnZTtcbiAgICAgIH0pO1xuICAgICAgcmV0dXJuIGRmZC5yZXNvbHZlKHBhZ2VEYXRhKTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDb21wdXRlIGhvdyBtYW55IGRheXMgYXJlIGluIHRoZSBzZWxlY3RlZCBkYXRlIHJhbmdlXG4gICAqIEByZXR1cm5zIHtpbnRlZ2VyfSBudW1iZXIgb2YgZGF5c1xuICAgKi9cbiAgbnVtRGF5c0luUmFuZ2UoKSB7XG4gICAgcmV0dXJuIHRoaXMuZGF0ZXJhbmdlcGlja2VyLmVuZERhdGUuZGlmZih0aGlzLmRhdGVyYW5nZXBpY2tlci5zdGFydERhdGUsICdkYXlzJykgKyAxO1xuICB9XG5cbiAgLyoqXG4gICAqIEdlbmVyYXRlIGtleS92YWx1ZSBwYWlycyBvZiBVUkwgcXVlcnkgc3RyaW5nXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBbbXVsdGlQYXJhbV0gLSBwYXJhbWV0ZXIgd2hvc2UgdmFsdWVzIG5lZWRzIHRvIHNwbGl0IGJ5IHBpcGUgY2hhcmFjdGVyXG4gICAqIEByZXR1cm5zIHtPYmplY3R9IGtleS92YWx1ZSBwYWlycyByZXByZXNlbnRhdGlvbiBvZiBxdWVyeSBzdHJpbmdcbiAgICovXG4gIHBhcnNlUXVlcnlTdHJpbmcobXVsdGlQYXJhbSkge1xuICAgIGNvbnN0IHVyaSA9IGRlY29kZVVSSShsb2NhdGlvbi5zZWFyY2guc2xpY2UoMSkpLFxuICAgICAgY2h1bmtzID0gdXJpLnNwbGl0KCcmJyk7XG4gICAgbGV0IHBhcmFtcyA9IHt9O1xuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjaHVua3MubGVuZ3RoOyBpKyspIHtcbiAgICAgIGxldCBjaHVuayA9IGNodW5rc1tpXS5zcGxpdCgnPScpO1xuXG4gICAgICBpZiAobXVsdGlQYXJhbSAmJiBjaHVua1swXSA9PT0gbXVsdGlQYXJhbSkge1xuICAgICAgICBwYXJhbXNbbXVsdGlQYXJhbV0gPSBjaHVua1sxXS5zcGxpdCgnfCcpLmZpbHRlcihwYXJhbSA9PiAhIXBhcmFtKS51bmlxdWUoKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHBhcmFtc1tjaHVua1swXV0gPSBjaHVua1sxXTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gcGFyYW1zO1xuICB9XG5cbiAgLyoqXG4gICAqIFNpbXBsZSBtZXRyaWMgdG8gc2VlIGhvdyBtYW55IHVzZSBpdCAocGFnZXZpZXdzIG9mIHRoZSBwYWdldmlldywgYSBtZXRhLXBhZ2V2aWV3LCBpZiB5b3Ugd2lsbCA6KVxuICAgKiBAcGFyYW0ge3N0cmluZ30gYXBwIC0gb25lIG9mOiBwdiwgbHYsIHR2LCBzdiwgbXNcbiAgICogQHJldHVybiB7bnVsbH0gbm90aGluZ1xuICAgKi9cbiAgcGF0Y2hVc2FnZShhcHApIHtcbiAgICBpZiAobWV0YVJvb3QpIHtcbiAgICAgICQuYWpheCh7XG4gICAgICAgIHVybDogYC8vJHttZXRhUm9vdH0vdXNhZ2UvJHt0aGlzLmFwcH0vJHt0aGlzLnByb2plY3QgfHwgaTE4bkxhbmd9YCxcbiAgICAgICAgbWV0aG9kOiAnUEFUQ0gnXG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogU2V0IHRpbWVzdGFtcCBvZiB3aGVuIHByb2Nlc3Mgc3RhcnRlZFxuICAgKiBAcmV0dXJuIHttb21lbnR9IHN0YXJ0IHRpbWVcbiAgICovXG4gIHByb2Nlc3NTdGFydGVkKCkge1xuICAgIHJldHVybiB0aGlzLnByb2Nlc3NTdGFydCA9IG1vbWVudCgpO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCBlbGFwc2VkIHRpbWUgZnJvbSB0aGlzLnByb2Nlc3NTdGFydCwgYW5kIHNob3cgaXRcbiAgICogQHJldHVybiB7bW9tZW50fSBFbGFwc2VkIHRpbWUgZnJvbSBgdGhpcy5wcm9jZXNzU3RhcnRgIGluIG1pbGxpc2Vjb25kc1xuICAgKi9cbiAgcHJvY2Vzc0VuZGVkKCkge1xuICAgIGNvbnN0IGVuZFRpbWUgPSBtb21lbnQoKSxcbiAgICAgIGVsYXBzZWRUaW1lID0gZW5kVGltZS5kaWZmKHRoaXMucHJvY2Vzc1N0YXJ0LCAnbWlsbGlzZWNvbmRzJyk7XG5cbiAgICAvKiogRklYTUU6IHJlcG9ydCB0aGlzIGJ1Zzogc29tZSBsYW5ndWFnZXMgZG9uJ3QgcGFyc2UgUExVUkFMIGNvcnJlY3RseSAoJ2hlJyBmb3IgZXhhbXBsZSkgd2l0aCB0aGUgRW5nbGlzaCBmYWxsYmFjayBtZXNzYWdlICovXG4gICAgdHJ5IHtcbiAgICAgICQoJy5lbGFwc2VkLXRpbWUnKS5hdHRyKCdkYXRldGltZScsIGVuZFRpbWUuZm9ybWF0KCkpXG4gICAgICAgIC50ZXh0KCQuaTE4bignZWxhcHNlZC10aW1lJywgZWxhcHNlZFRpbWUgLyAxMDAwKSk7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgLy8gaW50ZW50aW9uYWxsIG5vdGhpbmcsIGV2ZXJ5dGhpbmcgd2lsbCBzdGlsbCBzaG93XG4gICAgfVxuXG4gICAgcmV0dXJuIGVsYXBzZWRUaW1lO1xuICB9XG5cbiAgLyoqXG4gICAqIEFkYXB0ZWQgZnJvbSBodHRwOi8vanNmaWRkbGUubmV0L2RhbmR2LzQ3Y2JqLyBjb3VydGVzeSBvZiBkYW5kdlxuICAgKlxuICAgKiBTYW1lIGFzIF8uZGVib3VuY2UgYnV0IHF1ZXVlcyBhbmQgZXhlY3V0ZXMgYWxsIGZ1bmN0aW9uIGNhbGxzXG4gICAqIEBwYXJhbSAge0Z1bmN0aW9ufSBmbiAtIGZ1bmN0aW9uIHRvIGRlYm91bmNlXG4gICAqIEBwYXJhbSAge2RlbGF5fSBkZWxheSAtIGRlbGF5IGR1cmF0aW9uIG9mIG1pbGxpc2Vjb25kc1xuICAgKiBAcGFyYW0gIHtvYmplY3R9IGNvbnRleHQgLSBzY29wZSB0aGUgZnVuY3Rpb24gc2hvdWxkIHJlZmVyIHRvXG4gICAqIEByZXR1cm4ge0Z1bmN0aW9ufSByYXRlLWxpbWl0ZWQgZnVuY3Rpb24gdG8gY2FsbCBpbnN0ZWFkIG9mIHlvdXIgZnVuY3Rpb25cbiAgICovXG4gIHJhdGVMaW1pdChmbiwgZGVsYXksIGNvbnRleHQpIHtcbiAgICBsZXQgcXVldWUgPSBbXSwgdGltZXI7XG5cbiAgICBjb25zdCBwcm9jZXNzUXVldWUgPSAoKSA9PiB7XG4gICAgICBjb25zdCBpdGVtID0gcXVldWUuc2hpZnQoKTtcbiAgICAgIGlmIChpdGVtKSB7XG4gICAgICAgIGZuLmFwcGx5KGl0ZW0uY29udGV4dCwgaXRlbS5hcmd1bWVudHMpO1xuICAgICAgfVxuICAgICAgaWYgKHF1ZXVlLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICBjbGVhckludGVydmFsKHRpbWVyKSwgdGltZXIgPSBudWxsO1xuICAgICAgfVxuICAgIH07XG5cbiAgICByZXR1cm4gZnVuY3Rpb24gbGltaXRlZCgpIHtcbiAgICAgIHF1ZXVlLnB1c2goe1xuICAgICAgICBjb250ZXh0OiBjb250ZXh0IHx8IHRoaXMsXG4gICAgICAgIGFyZ3VtZW50czogW10uc2xpY2UuY2FsbChhcmd1bWVudHMpXG4gICAgICB9KTtcblxuICAgICAgaWYgKCF0aW1lcikge1xuICAgICAgICBwcm9jZXNzUXVldWUoKTsgLy8gc3RhcnQgaW1tZWRpYXRlbHkgb24gdGhlIGZpcnN0IGludm9jYXRpb25cbiAgICAgICAgdGltZXIgPSBzZXRJbnRlcnZhbChwcm9jZXNzUXVldWUsIGRlbGF5KTtcbiAgICAgIH1cbiAgICB9O1xuICB9XG5cbiAgLyoqXG4gICAqIFJlbW92ZXMgYWxsIFNlbGVjdDIgcmVsYXRlZCBzdHVmZiB0aGVuIGFkZHMgaXQgYmFja1xuICAgKiBBbHNvIG1pZ2h0IHJlc3VsdCBpbiB0aGUgY2hhcnQgYmVpbmcgcmUtcmVuZGVyZWRcbiAgICogQHJldHVybnMge251bGx9IG5vdGhpbmdcbiAgICovXG4gIHJlc2V0U2VsZWN0MigpIHtcbiAgICBjb25zdCBzZWxlY3QySW5wdXQgPSAkKHRoaXMuY29uZmlnLnNlbGVjdDJJbnB1dCk7XG4gICAgc2VsZWN0MklucHV0Lm9mZignY2hhbmdlJyk7XG4gICAgc2VsZWN0MklucHV0LnNlbGVjdDIoJ3ZhbCcsIG51bGwpO1xuICAgIHNlbGVjdDJJbnB1dC5zZWxlY3QyKCdkYXRhJywgbnVsbCk7XG4gICAgc2VsZWN0MklucHV0LnNlbGVjdDIoJ2Rlc3Ryb3knKTtcbiAgICB0aGlzLnNldHVwU2VsZWN0MigpO1xuICB9XG5cbiAgLyoqXG4gICAqIENoYW5nZSBhbHBoYSBsZXZlbCBvZiBhbiByZ2JhIHZhbHVlXG4gICAqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSB2YWx1ZSAtIHJnYmEgdmFsdWVcbiAgICogQHBhcmFtIHtmbG9hdHxzdHJpbmd9IGFscGhhIC0gdHJhbnNwYXJlbmN5IGFzIGZsb2F0IHZhbHVlXG4gICAqIEByZXR1cm5zIHtzdHJpbmd9IHJnYmEgdmFsdWVcbiAgICovXG4gIHJnYmEodmFsdWUsIGFscGhhKSB7XG4gICAgcmV0dXJuIHZhbHVlLnJlcGxhY2UoLyxcXHMqXFxkXFwpLywgYCwgJHthbHBoYX0pYCk7XG4gIH1cblxuICAvKipcbiAgICogU2F2ZSBhIHBhcnRpY3VsYXIgc2V0dGluZyB0byBzZXNzaW9uIGFuZCBsb2NhbFN0b3JhZ2VcbiAgICpcbiAgICogQHBhcmFtIHtzdHJpbmd9IGtleSAtIHNldHRpbmdzIGtleVxuICAgKiBAcGFyYW0ge3N0cmluZ3xib29sZWFufSB2YWx1ZSAtIHZhbHVlIHRvIHNhdmVcbiAgICogQHJldHVybnMge251bGx9IG5vdGhpbmdcbiAgICovXG4gIHNhdmVTZXR0aW5nKGtleSwgdmFsdWUpIHtcbiAgICB0aGlzW2tleV0gPSB2YWx1ZTtcbiAgICB0aGlzLnNldExvY2FsU3RvcmFnZShgcGFnZXZpZXdzLXNldHRpbmdzLSR7a2V5fWAsIHZhbHVlKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTYXZlIHRoZSBzZWxlY3RlZCBzZXR0aW5ncyB3aXRoaW4gdGhlIHNldHRpbmdzIG1vZGFsXG4gICAqIFByZWZlciB0aGlzIGltcGxlbWVudGF0aW9uIG92ZXIgYSBsYXJnZSBsaWJyYXJ5IGxpa2Ugc2VyaWFsaXplT2JqZWN0IG9yIHNlcmlhbGl6ZUpTT05cbiAgICogQHJldHVybnMge251bGx9IG5vdGhpbmdcbiAgICovXG4gIHNhdmVTZXR0aW5ncygpIHtcbiAgICAvKiogdHJhY2sgaWYgd2UncmUgY2hhbmdpbmcgdG8gbm9fYXV0b2NvbXBsZXRlIG1vZGUgKi9cbiAgICBjb25zdCB3YXNBdXRvY29tcGxldGUgPSB0aGlzLmF1dG9jb21wbGV0ZSA9PT0gJ25vX2F1dG9jb21wbGV0ZSc7XG5cbiAgICAkLmVhY2goJCgnI3NldHRpbmdzLW1vZGFsIGlucHV0JyksIChpbmRleCwgZWwpID0+IHtcbiAgICAgIGlmIChlbC50eXBlID09PSAnY2hlY2tib3gnKSB7XG4gICAgICAgIHRoaXMuc2F2ZVNldHRpbmcoZWwubmFtZSwgZWwuY2hlY2tlZCA/ICd0cnVlJyA6ICdmYWxzZScpO1xuICAgICAgfSBlbHNlIGlmIChlbC5jaGVja2VkKSB7XG4gICAgICAgIHRoaXMuc2F2ZVNldHRpbmcoZWwubmFtZSwgZWwudmFsdWUpO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgaWYgKHRoaXMuYXBwICE9PSAndG9wdmlld3MnKSB7XG4gICAgICB0aGlzLmRhdGVyYW5nZXBpY2tlci5sb2NhbGUuZm9ybWF0ID0gdGhpcy5kYXRlRm9ybWF0O1xuICAgICAgdGhpcy5kYXRlcmFuZ2VwaWNrZXIudXBkYXRlRWxlbWVudCgpO1xuXG4gICAgICB0aGlzLnNldHVwU2VsZWN0MkNvbG9ycygpO1xuXG4gICAgICAvKipcbiAgICAgICAqIElmIHdlIGNoYW5nZWQgdG8vZnJvbSBub19hdXRvY29tcGxldGUgd2UgaGF2ZSB0byByZXNldCBTZWxlY3QyIGVudGlyZWx5XG4gICAgICAgKiAgIGFzIHNldFNlbGVjdDJEZWZhdWx0cyBpcyBzdXBlciBidWdneSBkdWUgdG8gU2VsZWN0MiBjb25zdHJhaW50c1xuICAgICAgICogU28gbGV0J3Mgb25seSByZXNldCBpZiB3ZSBoYXZlIHRvXG4gICAgICAgKi9cbiAgICAgIGlmICgodGhpcy5hdXRvY29tcGxldGUgPT09ICdub19hdXRvY29tcGxldGUnKSAhPT0gd2FzQXV0b2NvbXBsZXRlKSB7XG4gICAgICAgIHRoaXMucmVzZXRTZWxlY3QyKCk7XG4gICAgICB9XG5cbiAgICAgIGlmICh0aGlzLmJlZ2luQXRaZXJvID09PSAndHJ1ZScpIHtcbiAgICAgICAgJCgnLmJlZ2luLWF0LXplcm8tb3B0aW9uJykucHJvcCgnY2hlY2tlZCcsIHRydWUpO1xuICAgICAgfVxuICAgIH1cblxuICAgIHRoaXMucHJvY2Vzc0lucHV0KHRydWUpO1xuICB9XG5cbiAgLyoqXG4gICAqIERpcmVjdGx5IHNldCBpdGVtcyBpbiBTZWxlY3QyXG4gICAqIEN1cnJlbnRseSBpcyBub3QgYWJsZSB0byByZW1vdmUgdW5kZXJzY29yZXMgZnJvbSBwYWdlIG5hbWVzXG4gICAqXG4gICAqIEBwYXJhbSB7YXJyYXl9IGl0ZW1zIC0gcGFnZSB0aXRsZXNcbiAgICogQHJldHVybnMge2FycmF5fSAtIHVudG91Y2hlZCBhcnJheSBvZiBpdGVtc1xuICAgKi9cbiAgc2V0U2VsZWN0MkRlZmF1bHRzKGl0ZW1zKSB7XG4gICAgaXRlbXMuZm9yRWFjaChpdGVtID0+IHtcbiAgICAgIGNvbnN0IGVzY2FwZWRUZXh0ID0gJCgnPGRpdj4nKS50ZXh0KGl0ZW0pLmh0bWwoKTtcbiAgICAgICQoJzxvcHRpb24+JyArIGVzY2FwZWRUZXh0ICsgJzwvb3B0aW9uPicpLmFwcGVuZFRvKHRoaXMuY29uZmlnLnNlbGVjdDJJbnB1dCk7XG4gICAgfSk7XG4gICAgJCh0aGlzLmNvbmZpZy5zZWxlY3QySW5wdXQpLnNlbGVjdDIoJ3ZhbCcsIGl0ZW1zKTtcbiAgICAkKHRoaXMuY29uZmlnLnNlbGVjdDJJbnB1dCkuc2VsZWN0MignY2xvc2UnKTtcblxuICAgIHJldHVybiBpdGVtcztcbiAgfVxuXG4gIC8qKlxuICAgKiBTZXRzIHRoZSBkYXRlcmFuZ2UgcGlja2VyIHZhbHVlcyBhbmQgdGhpcy5zcGVjaWFsUmFuZ2UgYmFzZWQgb24gcHJvdmlkZWQgc3BlY2lhbCByYW5nZSBrZXlcbiAgICogV0FSTklORzogbm90IHRvIGJlIGNhbGxlZCBvbiBkYXRlcmFuZ2UgcGlja2VyIEdVSSBldmVudHMgKGUuZy4gc3BlY2lhbCByYW5nZSBidXR0b25zKVxuICAgKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gdHlwZSAtIG9uZSBvZiBzcGVjaWFsIHJhbmdlcyBkZWZpbmVkIGluIHRoaXMuY29uZmlnLnNwZWNpYWxSYW5nZXMsXG4gICAqICAgaW5jbHVkaW5nIGR5bmFtaWMgbGF0ZXN0IHJhbmdlLCBzdWNoIGFzIGBsYXRlc3QtMTVgIGZvciBsYXRlc3QgMTUgZGF5c1xuICAgKiBAcmV0dXJucyB7b2JqZWN0fG51bGx9IHVwZGF0ZWQgdGhpcy5zcGVjaWFsUmFuZ2Ugb2JqZWN0IG9yIG51bGwgaWYgdHlwZSB3YXMgaW52YWxpZFxuICAgKi9cbiAgc2V0U3BlY2lhbFJhbmdlKHR5cGUpIHtcbiAgICBjb25zdCByYW5nZUluZGV4ID0gT2JqZWN0LmtleXModGhpcy5jb25maWcuc3BlY2lhbFJhbmdlcykuaW5kZXhPZih0eXBlKTtcbiAgICBsZXQgc3RhcnREYXRlLCBlbmREYXRlO1xuXG4gICAgaWYgKHR5cGUuaW5jbHVkZXMoJ2xhdGVzdC0nKSkge1xuICAgICAgY29uc3Qgb2Zmc2V0ID0gcGFyc2VJbnQodHlwZS5yZXBsYWNlKCdsYXRlc3QtJywgJycpLCAxMCkgfHwgMjA7IC8vIGZhbGxiYWNrIG9mIDIwXG4gICAgICBbc3RhcnREYXRlLCBlbmREYXRlXSA9IHRoaXMuY29uZmlnLnNwZWNpYWxSYW5nZXMubGF0ZXN0KG9mZnNldCk7XG4gICAgfSBlbHNlIGlmIChyYW5nZUluZGV4ID49IDApIHtcbiAgICAgIC8qKiB0cmVhdCAnbGF0ZXN0JyBhcyBhIGZ1bmN0aW9uICovXG4gICAgICBbc3RhcnREYXRlLCBlbmREYXRlXSA9IHR5cGUgPT09ICdsYXRlc3QnID8gdGhpcy5jb25maWcuc3BlY2lhbFJhbmdlcy5sYXRlc3QoKSA6IHRoaXMuY29uZmlnLnNwZWNpYWxSYW5nZXNbdHlwZV07XG4gICAgICAkKCcuZGF0ZXJhbmdlcGlja2VyIC5yYW5nZXMgbGknKS5lcShyYW5nZUluZGV4KS50cmlnZ2VyKCdjbGljaycpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdGhpcy5zcGVjaWFsUmFuZ2UgPSB7XG4gICAgICByYW5nZTogdHlwZSxcbiAgICAgIHZhbHVlOiBgJHtzdGFydERhdGUuZm9ybWF0KHRoaXMuZGF0ZUZvcm1hdCl9IC0gJHtlbmREYXRlLmZvcm1hdCh0aGlzLmRhdGVGb3JtYXQpfWBcbiAgICB9O1xuXG4gICAgLyoqIGRpcmVjdGx5IGFzc2lnbiBzdGFydERhdGUgdGhlbiB1c2Ugc2V0RW5kRGF0ZSBzbyB0aGF0IHRoZSBldmVudHMgd2lsbCBiZSBmaXJlZCBvbmNlICovXG4gICAgdGhpcy5kYXRlcmFuZ2VwaWNrZXIuc3RhcnREYXRlID0gc3RhcnREYXRlO1xuICAgIHRoaXMuZGF0ZXJhbmdlcGlja2VyLnNldEVuZERhdGUoZW5kRGF0ZSk7XG5cbiAgICByZXR1cm4gdGhpcy5zcGVjaWFsUmFuZ2U7XG4gIH1cblxuICAvKipcbiAgICogU2V0dXAgY29sb3JzIGZvciBTZWxlY3QyIGVudHJpZXMgc28gd2UgY2FuIGR5bmFtaWNhbGx5IGNoYW5nZSB0aGVtXG4gICAqIFRoaXMgaXMgYSBuZWNlc3NhcnkgZXZpbCwgYXMgd2UgaGF2ZSB0byBtYXJrIHRoZW0gYXMgIWltcG9ydGFudFxuICAgKiAgIGFuZCBzaW5jZSB0aGVyZSBhcmUgYW55IG51bWJlciBvZiBlbnRpcmVzLCB3ZSBuZWVkIHRvIHVzZSBudGgtY2hpbGQgc2VsZWN0b3JzXG4gICAqIEByZXR1cm5zIHtDU1NTdHlsZXNoZWV0fSBvdXIgbmV3IHN0eWxlc2hlZXRcbiAgICovXG4gIHNldHVwU2VsZWN0MkNvbG9ycygpIHtcbiAgICAvKiogZmlyc3QgZGVsZXRlIG9sZCBzdHlsZXNoZWV0LCBpZiBwcmVzZW50ICovXG4gICAgaWYgKHRoaXMuY29sb3JzU3R5bGVFbCkgdGhpcy5jb2xvcnNTdHlsZUVsLnJlbW92ZSgpO1xuXG4gICAgLyoqIGNyZWF0ZSBuZXcgc3R5bGVzaGVldCAqL1xuICAgIHRoaXMuY29sb3JzU3R5bGVFbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3N0eWxlJyk7XG4gICAgdGhpcy5jb2xvcnNTdHlsZUVsLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKCcnKSk7IC8vIFdlYktpdCBoYWNrIDooXG4gICAgZG9jdW1lbnQuaGVhZC5hcHBlbmRDaGlsZCh0aGlzLmNvbG9yc1N0eWxlRWwpO1xuXG4gICAgLyoqIGFkZCBjb2xvciBydWxlcyAqL1xuICAgIHRoaXMuY29uZmlnLmNvbG9ycy5mb3JFYWNoKChjb2xvciwgaW5kZXgpID0+IHtcbiAgICAgIHRoaXMuY29sb3JzU3R5bGVFbC5zaGVldC5pbnNlcnRSdWxlKGAuc2VsZWN0Mi1zZWxlY3Rpb25fX2Nob2ljZTpudGgtb2YtdHlwZSgke2luZGV4ICsgMX0pIHsgYmFja2dyb3VuZDogJHtjb2xvcn0gIWltcG9ydGFudCB9YCwgMCk7XG4gICAgfSk7XG5cbiAgICByZXR1cm4gdGhpcy5jb2xvcnNTdHlsZUVsLnNoZWV0O1xuICB9XG5cbiAgLyoqXG4gICAqIENyb3NzLWFwcGxpY2F0aW9uIGxpc3RlbmVyc1xuICAgKiBFYWNoIGFwcCBoYXMgaXQncyBvd24gc2V0dXBMaXN0ZW5lcnMoKSB0aGF0IHNob3VsZCBjYWxsIHN1cGVyLnNldHVwTGlzdGVuZXJzKClcbiAgICogQHJldHVybiB7bnVsbH0gbm90aGluZ1xuICAgKi9cbiAgc2V0dXBMaXN0ZW5lcnMoKSB7XG4gICAgLyoqIHByZXZlbnQgYnJvd3NlcidzIGRlZmF1bHQgYmVoYXZpb3VyIGZvciBhbnkgbGluayB3aXRoIGhyZWY9XCIjXCIgKi9cbiAgICAkKFwiYVtocmVmPScjJ11cIikub24oJ2NsaWNrJywgZSA9PiBlLnByZXZlbnREZWZhdWx0KCkpO1xuXG4gICAgLyoqIGRvd25sb2FkIGxpc3RlbmVycyAqL1xuICAgICQoJy5kb3dubG9hZC1jc3YnKS5vbignY2xpY2snLCB0aGlzLmV4cG9ydENTVi5iaW5kKHRoaXMpKTtcbiAgICAkKCcuZG93bmxvYWQtanNvbicpLm9uKCdjbGljaycsIHRoaXMuZXhwb3J0SlNPTi5iaW5kKHRoaXMpKTtcblxuICAgIC8qKiBwcm9qZWN0IGlucHV0IGxpc3RlbmVycywgc2F2aW5nIGFuZCByZXN0b3Jpbmcgb2xkIHZhbHVlIGlmIG5ldyBvbmUgaXMgaW52YWxpZCAqL1xuICAgICQodGhpcy5jb25maWcucHJvamVjdElucHV0KS5vbignZm9jdXNpbicsIGZ1bmN0aW9uKCkge1xuICAgICAgdGhpcy5kYXRhc2V0LnZhbHVlID0gdGhpcy52YWx1ZTtcbiAgICB9KTtcbiAgICAkKHRoaXMuY29uZmlnLnByb2plY3RJbnB1dCkub24oJ2NoYW5nZScsIGUgPT4gdGhpcy52YWxpZGF0ZVByb2plY3QoZSkpO1xuICB9XG5cbiAgLyoqXG4gICAqIFNldCB2YWx1ZXMgb2YgZm9ybSBiYXNlZCBvbiBsb2NhbFN0b3JhZ2Ugb3IgZGVmYXVsdHMsIGFkZCBsaXN0ZW5lcnNcbiAgICogQHJldHVybnMge251bGx9IG5vdGhpbmdcbiAgICovXG4gIHNldHVwU2V0dGluZ3NNb2RhbCgpIHtcbiAgICAvKiogZmlsbCBpbiB2YWx1ZXMsIGV2ZXJ5dGhpbmcgaXMgZWl0aGVyIGEgY2hlY2tib3ggb3IgcmFkaW8gKi9cbiAgICB0aGlzLmZpbGxJblNldHRpbmdzKCk7XG5cbiAgICAvKiogYWRkIGxpc3RlbmVyICovXG4gICAgJCgnLnNhdmUtc2V0dGluZ3MtYnRuJykub24oJ2NsaWNrJywgdGhpcy5zYXZlU2V0dGluZ3MuYmluZCh0aGlzKSk7XG4gICAgJCgnLmNhbmNlbC1zZXR0aW5ncy1idG4nKS5vbignY2xpY2snLCB0aGlzLmZpbGxJblNldHRpbmdzLmJpbmQodGhpcykpO1xuICB9XG5cbiAgLyoqXG4gICAqIHNldHMgdXAgdGhlIGRhdGVyYW5nZSBzZWxlY3RvciBhbmQgYWRkcyBsaXN0ZW5lcnNcbiAgICogQHJldHVybnMge251bGx9IC0gbm90aGluZ1xuICAgKi9cbiAgc2V0dXBEYXRlUmFuZ2VTZWxlY3RvcigpIHtcbiAgICBjb25zdCBkYXRlUmFuZ2VTZWxlY3RvciA9ICQodGhpcy5jb25maWcuZGF0ZVJhbmdlU2VsZWN0b3IpO1xuXG4gICAgLyoqXG4gICAgICogVHJhbnNmb3JtIHRoaXMuY29uZmlnLnNwZWNpYWxSYW5nZXMgdG8gaGF2ZSBpMThuIGFzIGtleXNcbiAgICAgKiBUaGlzIGlzIHdoYXQgaXMgc2hvd24gYXMgdGhlIHNwZWNpYWwgcmFuZ2VzIChMYXN0IG1vbnRoLCBldGMuKSBpbiB0aGUgZGF0ZXBpY2tlciBtZW51XG4gICAgICogQHR5cGUge09iamVjdH1cbiAgICAgKi9cbiAgICBsZXQgcmFuZ2VzID0ge307XG4gICAgT2JqZWN0LmtleXModGhpcy5jb25maWcuc3BlY2lhbFJhbmdlcykuZm9yRWFjaChrZXkgPT4ge1xuICAgICAgaWYgKGtleSA9PT0gJ2xhdGVzdCcpIHJldHVybjsgLy8gdGhpcyBpcyBhIGZ1bmN0aW9uLCBub3QgbWVhbnQgdG8gYmUgaW4gdGhlIGxpc3Qgb2Ygc3BlY2lhbCByYW5nZXNcbiAgICAgIHJhbmdlc1skLmkxOG4oa2V5KV0gPSB0aGlzLmNvbmZpZy5zcGVjaWFsUmFuZ2VzW2tleV07XG4gICAgfSk7XG5cbiAgICBsZXQgZGF0ZXBpY2tlck9wdGlvbnMgPSB7XG4gICAgICBsb2NhbGU6IHtcbiAgICAgICAgZm9ybWF0OiB0aGlzLmRhdGVGb3JtYXQsXG4gICAgICAgIGFwcGx5TGFiZWw6ICQuaTE4bignYXBwbHknKSxcbiAgICAgICAgY2FuY2VsTGFiZWw6ICQuaTE4bignY2FuY2VsJyksXG4gICAgICAgIGN1c3RvbVJhbmdlTGFiZWw6ICQuaTE4bignY3VzdG9tLXJhbmdlJyksXG4gICAgICAgIGRheXNPZldlZWs6IFtcbiAgICAgICAgICAkLmkxOG4oJ3N1JyksXG4gICAgICAgICAgJC5pMThuKCdtbycpLFxuICAgICAgICAgICQuaTE4bigndHUnKSxcbiAgICAgICAgICAkLmkxOG4oJ3dlJyksXG4gICAgICAgICAgJC5pMThuKCd0aCcpLFxuICAgICAgICAgICQuaTE4bignZnInKSxcbiAgICAgICAgICAkLmkxOG4oJ3NhJylcbiAgICAgICAgXSxcbiAgICAgICAgbW9udGhOYW1lczogW1xuICAgICAgICAgICQuaTE4bignamFudWFyeScpLFxuICAgICAgICAgICQuaTE4bignZmVicnVhcnknKSxcbiAgICAgICAgICAkLmkxOG4oJ21hcmNoJyksXG4gICAgICAgICAgJC5pMThuKCdhcHJpbCcpLFxuICAgICAgICAgICQuaTE4bignbWF5JyksXG4gICAgICAgICAgJC5pMThuKCdqdW5lJyksXG4gICAgICAgICAgJC5pMThuKCdqdWx5JyksXG4gICAgICAgICAgJC5pMThuKCdhdWd1c3QnKSxcbiAgICAgICAgICAkLmkxOG4oJ3NlcHRlbWJlcicpLFxuICAgICAgICAgICQuaTE4bignb2N0b2JlcicpLFxuICAgICAgICAgICQuaTE4bignbm92ZW1iZXInKSxcbiAgICAgICAgICAkLmkxOG4oJ2RlY2VtYmVyJylcbiAgICAgICAgXVxuICAgICAgfSxcbiAgICAgIHN0YXJ0RGF0ZTogbW9tZW50KCkuc3VidHJhY3QodGhpcy5jb25maWcuZGF5c0FnbywgJ2RheXMnKSxcbiAgICAgIG1pbkRhdGU6IHRoaXMuY29uZmlnLm1pbkRhdGUsXG4gICAgICBtYXhEYXRlOiB0aGlzLmNvbmZpZy5tYXhEYXRlLFxuICAgICAgcmFuZ2VzOiByYW5nZXNcbiAgICB9O1xuXG4gICAgaWYgKHRoaXMuY29uZmlnLmRhdGVMaW1pdCkgZGF0ZXBpY2tlck9wdGlvbnMuZGF0ZUxpbWl0ID0geyBkYXlzOiB0aGlzLmNvbmZpZy5kYXRlTGltaXQgfTtcblxuICAgIGRhdGVSYW5nZVNlbGVjdG9yLmRhdGVyYW5nZXBpY2tlcihkYXRlcGlja2VyT3B0aW9ucyk7XG5cbiAgICAvKiogc28gcGVvcGxlIGtub3cgd2h5IHRoZXkgY2FuJ3QgcXVlcnkgZGF0YSBvbGRlciB0aGFuIEp1bHkgMjAxNSAqL1xuICAgICQoJy5kYXRlcmFuZ2VwaWNrZXInKS5hcHBlbmQoXG4gICAgICAkKCc8ZGl2PicpXG4gICAgICAgIC5hZGRDbGFzcygnZGF0ZXJhbmdlLW5vdGljZScpXG4gICAgICAgIC5odG1sKCQuaTE4bignZGF0ZS1ub3RpY2UnLCBkb2N1bWVudC50aXRsZSxcbiAgICAgICAgICBcIjxhIGhyZWY9J2h0dHA6Ly9zdGF0cy5ncm9rLnNlJyB0YXJnZXQ9J19ibGFuayc+c3RhdHMuZ3Jvay5zZTwvYT5cIixcbiAgICAgICAgICBgJHskLmkxOG4oJ2p1bHknKX0gMjAxNWBcbiAgICAgICAgKSlcbiAgICApO1xuXG4gICAgLyoqXG4gICAgICogVGhlIHNwZWNpYWwgZGF0ZSByYW5nZSBvcHRpb25zIChidXR0b25zIHRoZSByaWdodCBzaWRlIG9mIHRoZSBkYXRlcmFuZ2UgcGlja2VyKVxuICAgICAqXG4gICAgICogV0FSTklORzogd2UncmUgdW5hYmxlIHRvIGFkZCBjbGFzcyBuYW1lcyBvciBkYXRhIGF0dHJzIHRvIHRoZSByYW5nZSBvcHRpb25zLFxuICAgICAqIHNvIGNoZWNraW5nIHdoaWNoIHdhcyBjbGlja2VkIGlzIGhhcmRjb2RlZCBiYXNlZCBvbiB0aGUgaW5kZXggb2YgdGhlIExJLFxuICAgICAqIGFzIGRlZmluZWQgaW4gdGhpcy5jb25maWcuc3BlY2lhbFJhbmdlc1xuICAgICAqL1xuICAgICQoJy5kYXRlcmFuZ2VwaWNrZXIgLnJhbmdlcyBsaScpLm9uKCdjbGljaycsIGUgPT4ge1xuICAgICAgY29uc3QgaW5kZXggPSAkKCcuZGF0ZXJhbmdlcGlja2VyIC5yYW5nZXMgbGknKS5pbmRleChlLnRhcmdldCksXG4gICAgICAgIGNvbnRhaW5lciA9IHRoaXMuZGF0ZXJhbmdlcGlja2VyLmNvbnRhaW5lcixcbiAgICAgICAgaW5wdXRzID0gY29udGFpbmVyLmZpbmQoJy5kYXRlcmFuZ2VwaWNrZXJfaW5wdXQgaW5wdXQnKTtcbiAgICAgIHRoaXMuc3BlY2lhbFJhbmdlID0ge1xuICAgICAgICByYW5nZTogT2JqZWN0LmtleXModGhpcy5jb25maWcuc3BlY2lhbFJhbmdlcylbaW5kZXhdLFxuICAgICAgICB2YWx1ZTogYCR7aW5wdXRzWzBdLnZhbHVlfSAtICR7aW5wdXRzWzFdLnZhbHVlfWBcbiAgICAgIH07XG4gICAgfSk7XG5cbiAgICAkKHRoaXMuY29uZmlnLmRhdGVSYW5nZVNlbGVjdG9yKS5vbignYXBwbHkuZGF0ZXJhbmdlcGlja2VyJywgKGUsIGFjdGlvbikgPT4ge1xuICAgICAgaWYgKGFjdGlvbi5jaG9zZW5MYWJlbCA9PT0gJC5pMThuKCdjdXN0b20tcmFuZ2UnKSkge1xuICAgICAgICB0aGlzLnNwZWNpYWxSYW5nZSA9IG51bGw7XG5cbiAgICAgICAgLyoqIGZvcmNlIGV2ZW50cyB0byByZS1maXJlIHNpbmNlIGFwcGx5LmRhdGVyYW5nZXBpY2tlciBvY2N1cnMgYmVmb3JlICdjaGFuZ2UnIGV2ZW50ICovXG4gICAgICAgIHRoaXMuZGF0ZXJhbmdlcGlja2VyLnVwZGF0ZUVsZW1lbnQoKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIHNob3dGYXRhbEVycm9ycyhlcnJvcnMpIHtcbiAgICB0aGlzLmNsZWFyTWVzc2FnZXMoKTtcbiAgICBlcnJvcnMuZm9yRWFjaChlcnJvciA9PiB7XG4gICAgICB0aGlzLndyaXRlTWVzc2FnZShcbiAgICAgICAgYDxzdHJvbmc+JHskLmkxOG4oJ2ZhdGFsLWVycm9yJyl9PC9zdHJvbmc+OiA8Y29kZT4ke2Vycm9yfTwvY29kZT5gLFxuICAgICAgICAnZXJyb3InXG4gICAgICApO1xuICAgIH0pO1xuXG4gICAgaWYgKHRoaXMuZGVidWcpIHtcbiAgICAgIHRocm93IGVycm9yc1swXTtcbiAgICB9IGVsc2UgaWYgKGVycm9ycyAmJiBlcnJvcnNbMF0gJiYgZXJyb3JzWzBdLnN0YWNrKSB7XG4gICAgICAkLmFqYXgoe1xuICAgICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgICAgdXJsOiAnLy90b29scy53bWZsYWJzLm9yZy9tdXNpa2FuaW1hbC9wYXN0ZScsXG4gICAgICAgIGRhdGE6IHtcbiAgICAgICAgICBjb250ZW50OiAnJyArXG4gICAgICAgICAgICBgXFxuZGF0ZTogICAgICAke21vbWVudCgpLnV0YygpLmZvcm1hdCgpfWAgK1xuICAgICAgICAgICAgYFxcbnRvb2w6ICAgICAgJHt0aGlzLmFwcH1gICtcbiAgICAgICAgICAgIGBcXG5sYW5ndWFnZTogICR7aTE4bkxhbmd9YCArXG4gICAgICAgICAgICBgXFxuY2hhcnQ6ICAgICAke3RoaXMuY2hhcnRUeXBlfWAgK1xuICAgICAgICAgICAgYFxcbnVybDogICAgICAgJHtkb2N1bWVudC5sb2NhdGlvbi5ocmVmfWAgK1xuICAgICAgICAgICAgYFxcbnVzZXJBZ2VudDogJHt0aGlzLmdldFVzZXJBZ2VudCgpfWAgK1xuICAgICAgICAgICAgYFxcbnRyYWNlOiAgICAgJHtlcnJvcnNbMF0uc3RhY2t9YFxuICAgICAgICAgICxcbiAgICAgICAgICB0aXRsZTogYFBhZ2V2aWV3cyBBbmFseXNpcyBlcnJvciByZXBvcnQ6ICR7ZXJyb3JzWzBdfWBcbiAgICAgICAgfVxuICAgICAgfSkuZG9uZShkYXRhID0+IHtcbiAgICAgICAgaWYgKGRhdGEgJiYgZGF0YS5yZXN1bHQgJiYgZGF0YS5yZXN1bHQub2JqZWN0TmFtZSkge1xuICAgICAgICAgIHRoaXMud3JpdGVNZXNzYWdlKFxuICAgICAgICAgICAgJC5pMThuKCdlcnJvci1wbGVhc2UtcmVwb3J0JywgdGhpcy5nZXRCdWdSZXBvcnRVUkwoZGF0YS5yZXN1bHQub2JqZWN0TmFtZSkpLFxuICAgICAgICAgICAgJ2Vycm9yJ1xuICAgICAgICAgICk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy53cml0ZU1lc3NhZ2UoXG4gICAgICAgICAgICAkLmkxOG4oJ2Vycm9yLXBsZWFzZS1yZXBvcnQnLCB0aGlzLmdldEJ1Z1JlcG9ydFVSTCgpKSxcbiAgICAgICAgICAgICdlcnJvcidcbiAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICB9KS5mYWlsKCgpID0+IHtcbiAgICAgICAgdGhpcy53cml0ZU1lc3NhZ2UoXG4gICAgICAgICAgJC5pMThuKCdlcnJvci1wbGVhc2UtcmVwb3J0JywgdGhpcy5nZXRCdWdSZXBvcnRVUkwoKSksXG4gICAgICAgICAgJ2Vycm9yJ1xuICAgICAgICApO1xuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFNwbGFzaCBpbiBjb25zb2xlLCBqdXN0IGZvciBmdW5cbiAgICogQHJldHVybnMge1N0cmluZ30gb3V0cHV0XG4gICAqL1xuICBzcGxhc2goKSB7XG4gICAgY29uc3Qgc3R5bGUgPSAnYmFja2dyb3VuZDogI2VlZTsgY29sb3I6ICM1NTU7IHBhZGRpbmc6IDRweDsgZm9udC1mYW1pbHk6bW9ub3NwYWNlJztcbiAgICBjb25zb2xlLmxvZygnJWMgICAgICBfX18gICAgICAgICAgICBfXyBfICAgICAgICAgICAgICAgICAgICAgXyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJywgc3R5bGUpO1xuICAgIGNvbnNvbGUubG9nKCclYyAgICAgfCBfIFxcXFwgIF9fIF8gICAgLyBfYCB8ICAgX19fICAgIF9fIF9fICAgIChfKSAgICAgX19fICAgX18gX18gX18gIF9fXyAgICAnLCBzdHlsZSk7XG4gICAgY29uc29sZS5sb2coJyVjICAgICB8ICBfLyAvIF9gIHwgICBcXFxcX18sIHwgIC8gLV8pICAgXFxcXCBWIC8gICAgfCB8ICAgIC8gLV8pICBcXFxcIFYgIFYgLyAoXy08ICAgICcsIHN0eWxlKTtcbiAgICBjb25zb2xlLmxvZygnJWMgICAgX3xffF8gIFxcXFxfXyxffCAgIHxfX18vICAgXFxcXF9fX3wgICBfXFxcXF8vXyAgIF98X3xfICAgXFxcXF9fX3wgICBcXFxcXy9cXFxcXy8gIC9fXy9fICAgJywgc3R5bGUpO1xuICAgIGNvbnNvbGUubG9nKCclYyAgX3wgXCJcIlwiIHxffFwiXCJcIlwiXCJ8X3xcIlwiXCJcIlwifF98XCJcIlwiXCJcInxffFwiXCJcIlwiXCJ8X3xcIlwiXCJcIlwifF98XCJcIlwiXCJcInxffFwiXCJcIlwiXCJ8X3xcIlwiXCJcIlwifCAgJywgc3R5bGUpO1xuICAgIGNvbnNvbGUubG9nKCclYyAgXCJgLTAtMC1cXCdcImAtMC0wLVxcJ1wiYC0wLTAtXFwnXCJgLTAtMC1cXCdcImAtMC0wLVxcJ1wiYC0wLTAtXFwnXCJgLTAtMC1cXCdcImAtMC0wLVxcJ1wiYC0wLTAtXFwnICAnLCBzdHlsZSk7XG4gICAgY29uc29sZS5sb2coJyVjICAgICAgICAgICAgICBfX18gICAgICAgICAgICAgICAgICAgICBfICBfICAgICBfICAgICAgICAgICAgICAgXyAgICAgICAgICAgICcsIHN0eWxlKTtcbiAgICBjb25zb2xlLmxvZygnJWMgICAgICBvIE8gTyAgLyAgIFxcXFwgICBfIF8gICAgIF9fIF8gICAgfCB8fCB8ICAgfCB8ICAgICBfX18gICAgIChfKSAgICAgX19fICAgJywgc3R5bGUpO1xuICAgIGNvbnNvbGUubG9nKCclYyAgICAgbyAgICAgICB8IC0gfCAgfCBcXCcgXFxcXCAgIC8gX2AgfCAgICBcXFxcXywgfCAgIHwgfCAgICAoXy08ICAgICB8IHwgICAgKF8tPCAgICcsIHN0eWxlKTtcbiAgICBjb25zb2xlLmxvZygnJWMgICAgVFNfX1tPXSAgfF98X3wgIHxffHxffCAgXFxcXF9fLF98ICAgX3xfXy8gICBffF98XyAgIC9fXy9fICAgX3xffF8gICAvX18vXyAgJywgc3R5bGUpO1xuICAgIGNvbnNvbGUubG9nKCclYyAgIHs9PT09PT18X3xcIlwiXCJcIlwifF98XCJcIlwiXCJcInxffFwiXCJcIlwiXCJ8X3wgXCJcIlwiXCJ8X3xcIlwiXCJcIlwifF98XCJcIlwiXCJcInxffFwiXCJcIlwiXCJ8X3xcIlwiXCJcIlwifCAnLCBzdHlsZSk7XG4gICAgY29uc29sZS5sb2coJyVjICAuL28tLTAwMFxcJ1wiYC0wLTAtXFwnXCJgLTAtMC1cXCdcImAtMC0wLVxcJ1wiYC0wLTAtXFwnXCJgLTAtMC1cXCdcImAtMC0wLVxcJ1wiYC0wLTAtXFwnXCJgLTAtMC1cXCcgJywgc3R5bGUpO1xuICAgIGNvbnNvbGUubG9nKCclYyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnLCBzdHlsZSk7XG4gICAgY29uc29sZS5sb2coYCVjICBDb3B5cmlnaHQgwqkgJHtuZXcgRGF0ZSgpLmdldEZ1bGxZZWFyKCl9IE11c2lrQW5pbWFsLCBLYWxkYXJpLCBNYXJjZWwgUnVpeiBGb3JucyAgICAgICAgICAgICAgICAgIGAsIHN0eWxlKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBZGQgdGhlIGxvYWRpbmcgaW5kaWNhdG9yIGNsYXNzIGFuZCBzZXQgdGhlIHNhZmVndWFyZCB0aW1lb3V0XG4gICAqIEByZXR1cm5zIHtudWxsfSBub3RoaW5nXG4gICAqL1xuICBzdGFydFNwaW5ueSgpIHtcbiAgICAkKCcuY2hhcnQtY29udGFpbmVyJykuYWRkQ2xhc3MoJ2xvYWRpbmcnKTtcbiAgICBjbGVhclRpbWVvdXQodGhpcy50aW1lb3V0KTtcblxuICAgIHRoaXMudGltZW91dCA9IHNldFRpbWVvdXQoZXJyID0+IHtcbiAgICAgIHRoaXMucmVzZXRWaWV3KCk7XG4gICAgICB0aGlzLndyaXRlTWVzc2FnZShgPHN0cm9uZz4keyQuaTE4bignZmF0YWwtZXJyb3InKX08L3N0cm9uZz46XG4gICAgICAgICR7JC5pMThuKCdlcnJvci10aW1lZC1vdXQnKX1cbiAgICAgICAgJHskLmkxOG4oJ2Vycm9yLXBsZWFzZS1yZXBvcnQnLCB0aGlzLmdldEJ1Z1JlcG9ydFVSTCgpKX1cbiAgICAgIGAsICdlcnJvcicsIDApO1xuICAgIH0sIDIwICogMTAwMCk7XG4gIH1cblxuICAvKipcbiAgICogUmVtb3ZlIGxvYWRpbmcgaW5kaWNhdG9yIGNsYXNzIGFuZCBjbGVhciB0aGUgc2FmZWd1YXJkIHRpbWVvdXRcbiAgICogQHJldHVybnMge251bGx9IG5vdGhpbmdcbiAgICovXG4gIHN0b3BTcGlubnkoKSB7XG4gICAgJCgnLmNoYXJ0LWNvbnRhaW5lcicpLnJlbW92ZUNsYXNzKCdsb2FkaW5nJyk7XG4gICAgY2xlYXJUaW1lb3V0KHRoaXMudGltZW91dCk7XG4gIH1cblxuICAvKipcbiAgICogUmVwbGFjZSBzcGFjZXMgd2l0aCB1bmRlcnNjb3Jlc1xuICAgKlxuICAgKiBAcGFyYW0ge2FycmF5fSBwYWdlcyAtIGFycmF5IG9mIHBhZ2UgbmFtZXNcbiAgICogQHJldHVybnMge2FycmF5fSBwYWdlIG5hbWVzIHdpdGggdW5kZXJzY29yZXNcbiAgICovXG4gIHVuZGVyc2NvcmVQYWdlTmFtZXMocGFnZXMpIHtcbiAgICByZXR1cm4gcGFnZXMubWFwKHBhZ2UgPT4ge1xuICAgICAgcmV0dXJuIGRlY29kZVVSSUNvbXBvbmVudChwYWdlKS5zY29yZSgpO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIFVwZGF0ZSBocmVmcyBvZiBpbnRlci1hcHAgbGlua3MgdG8gbG9hZCBjdXJyZW50bHkgc2VsZWN0ZWQgcHJvamVjdFxuICAgKiBAcmV0dXJuIHtudWxsfSBudXR0aW4nXG4gICAqL1xuICB1cGRhdGVJbnRlckFwcExpbmtzKCkge1xuICAgICQoJy5pbnRlcmFwcC1saW5rJykuZWFjaCgoaSwgbGluaykgPT4ge1xuICAgICAgbGV0IHVybCA9IGxpbmsuaHJlZi5zcGxpdCgnPycpWzBdO1xuXG4gICAgICBpZiAobGluay5jbGFzc0xpc3QuY29udGFpbnMoJ2ludGVyYXBwLWxpbmstLXNpdGV2aWV3cycpKSB7XG4gICAgICAgIGxpbmsuaHJlZiA9IGAke3VybH0/c2l0ZXM9JHt0aGlzLnByb2plY3QuZXNjYXBlKCl9Lm9yZ2A7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBsaW5rLmhyZWYgPSBgJHt1cmx9P3Byb2plY3Q9JHt0aGlzLnByb2plY3QuZXNjYXBlKCl9Lm9yZ2A7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogVmFsaWRhdGUgYmFzaWMgcGFyYW1zIGFnYWluc3Qgd2hhdCBpcyBkZWZpbmVkIGluIHRoZSBjb25maWcsXG4gICAqICAgYW5kIGlmIHRoZXkgYXJlIGludmFsaWQgc2V0IHRoZSBkZWZhdWx0XG4gICAqIEBwYXJhbSB7T2JqZWN0fSBwYXJhbXMgLSBwYXJhbXMgYXMgZmV0Y2hlZCBieSB0aGlzLnBhcnNlUXVlcnlTdHJpbmcoKVxuICAgKiBAcmV0dXJucyB7T2JqZWN0fSBzYW1lIHBhcmFtcyB3aXRoIHNvbWUgaW52YWxpZCBwYXJhbWV0ZXJzIGNvcnJldGVkLCBhcyBuZWNlc3NhcnlcbiAgICovXG4gIHZhbGlkYXRlUGFyYW1zKHBhcmFtcykge1xuICAgIHRoaXMuY29uZmlnLnZhbGlkYXRlUGFyYW1zLmZvckVhY2gocGFyYW1LZXkgPT4ge1xuICAgICAgaWYgKHBhcmFtS2V5ID09PSAncHJvamVjdCcgJiYgcGFyYW1zLnByb2plY3QpIHtcbiAgICAgICAgcGFyYW1zLnByb2plY3QgPSBwYXJhbXMucHJvamVjdC5yZXBsYWNlKC9ed3d3XFwuLywgJycpO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBkZWZhdWx0VmFsdWUgPSB0aGlzLmNvbmZpZy5kZWZhdWx0c1twYXJhbUtleV0sXG4gICAgICAgIHBhcmFtVmFsdWUgPSBwYXJhbXNbcGFyYW1LZXldO1xuXG4gICAgICBpZiAoZGVmYXVsdFZhbHVlICYmICF0aGlzLmNvbmZpZy52YWxpZFBhcmFtc1twYXJhbUtleV0uaW5jbHVkZXMocGFyYW1WYWx1ZSkpIHtcbiAgICAgICAgLy8gb25seSB0aHJvdyBlcnJvciBpZiB0aGV5IHRyaWVkIHRvIHByb3ZpZGUgYW4gaW52YWxpZCB2YWx1ZVxuICAgICAgICBpZiAoISFwYXJhbVZhbHVlKSB7XG4gICAgICAgICAgdGhpcy5hZGRJbnZhbGlkUGFyYW1Ob3RpY2UocGFyYW1LZXkpO1xuICAgICAgICB9XG5cbiAgICAgICAgcGFyYW1zW3BhcmFtS2V5XSA9IGRlZmF1bHRWYWx1ZTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHJldHVybiBwYXJhbXM7XG4gIH1cblxuICAvKipcbiAgICogQWRkcyBsaXN0ZW5lcnMgdG8gdGhlIHByb2plY3QgaW5wdXQgZm9yIHZhbGlkYXRpb25zIGFnYWluc3QgdGhlIHNpdGUgbWFwLFxuICAgKiAgIHJldmVydGluZyB0byB0aGUgb2xkIHZhbHVlIGlmIHRoZSBuZXcgb25lIGlzIGludmFsaWRcbiAgICogQHBhcmFtIHtCb29sZWFufSBbbXVsdGlsaW5ndWFsXSAtIHdoZXRoZXIgd2Ugc2hvdWxkIGNoZWNrIGlmIGl0IGlzIGEgbXVsdGlsaW5ndWFsIHByb2plY3RcbiAgICogQHJldHVybnMge0Jvb2xlYW59IHdoZXRoZXIgb3Igbm90IHZhbGlkYXRpb25zIHBhc3NlZFxuICAgKi9cbiAgdmFsaWRhdGVQcm9qZWN0KG11bHRpbGluZ3VhbCA9IGZhbHNlKSB7XG4gICAgY29uc3QgcHJvamVjdElucHV0ID0gJCh0aGlzLmNvbmZpZy5wcm9qZWN0SW5wdXQpWzBdO1xuICAgIGxldCBwcm9qZWN0ID0gcHJvamVjdElucHV0LnZhbHVlLnJlcGxhY2UoL153d3dcXC4vLCAnJyksXG4gICAgICB2YWxpZCA9IGZhbHNlO1xuXG4gICAgaWYgKG11bHRpbGluZ3VhbCAmJiAhdGhpcy5pc011bHRpbGFuZ1Byb2plY3QoKSkge1xuICAgICAgdGhpcy53cml0ZU1lc3NhZ2UoXG4gICAgICAgICQuaTE4bignaW52YWxpZC1sYW5nLXByb2plY3QnLCBgPGEgaHJlZj0nLy8ke3Byb2plY3QuZXNjYXBlKCl9Jz4ke3Byb2plY3QuZXNjYXBlKCl9PC9hPmApLFxuICAgICAgICAnd2FybmluZydcbiAgICAgICk7XG4gICAgICBwcm9qZWN0ID0gcHJvamVjdElucHV0LmRhdGFzZXQudmFsdWU7XG4gICAgfSBlbHNlIGlmIChzaXRlRG9tYWlucy5pbmNsdWRlcyhwcm9qZWN0KSkge1xuICAgICAgdGhpcy5jbGVhck1lc3NhZ2VzKCk7XG4gICAgICB0aGlzLnVwZGF0ZUludGVyQXBwTGlua3MoKTtcbiAgICAgIHZhbGlkID0gdHJ1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy53cml0ZU1lc3NhZ2UoXG4gICAgICAgICQuaTE4bignaW52YWxpZC1wcm9qZWN0JywgYDxhIGhyZWY9Jy8vJHtwcm9qZWN0LmVzY2FwZSgpfSc+JHtwcm9qZWN0LmVzY2FwZSgpfTwvYT5gKSxcbiAgICAgICAgJ3dhcm5pbmcnXG4gICAgICApO1xuICAgICAgcHJvamVjdCA9IHByb2plY3RJbnB1dC5kYXRhc2V0LnZhbHVlO1xuICAgIH1cblxuICAgIHByb2plY3RJbnB1dC52YWx1ZSA9IHByb2plY3Q7XG5cbiAgICByZXR1cm4gdmFsaWQ7XG4gIH1cblxuICAvLyBGSVhNRTogcmVzdG9yZSB3cml0ZU1lc3NhZ2UgdG8gdGhlIHdheSBpdCB1c2VkIHRvIGJlLFxuICAvLyBhbmQgbWFrZSBhZGRTaXRlTm90aWNlIGRvIHRoZSB0b2FzdHIsIGFuZCBjaGFuZ2UgaW5zdGFuY2VzIG9mIHRoaXMud3JpdGVNZXNzYWdlXG4gIC8vIGFjY29yZGluZ2x5XG4gIC8qKlxuICAgKiBXcml0ZXMgbWVzc2FnZSBqdXN0IGJlbG93IHRoZSBjaGFydFxuICAgKiBAcGFyYW0ge3N0cmluZ30gbWVzc2FnZSAtIG1lc3NhZ2UgdG8gd3JpdGVcbiAgICogQHBhcmFtIHtOdW1iZXJ9IHRpbWVvdXQgLSBudW0gc2Vjb25kcyB0byBzaG93XG4gICAqIEByZXR1cm5zIHtqUXVlcnl9IC0galF1ZXJ5IG9iamVjdCBvZiBtZXNzYWdlIGNvbnRhaW5lclxuICAgKi9cbiAgd3JpdGVNZXNzYWdlKG1lc3NhZ2UsIGxldmVsID0gJ3dhcm5pbmcnLCB0aW1lb3V0ID0gNTAwMCkge1xuICAgIHRvYXN0ci5vcHRpb25zLnRpbWVPdXQgPSB0aW1lb3V0O1xuICAgIHRvYXN0cltsZXZlbF0obWVzc2FnZSk7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBQdjtcbiIsIi8qKlxuICogQGZpbGUgU2hhcmVkIGNvbmZpZyBhbW9uZ3N0IGFsbCBhcHBzXG4gKiBAYXV0aG9yIE11c2lrQW5pbWFsXG4gKiBAY29weXJpZ2h0IDIwMTYgTXVzaWtBbmltYWxcbiAqIEBsaWNlbnNlIE1JVCBMaWNlbnNlOiBodHRwczovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL01JVFxuICovXG5cbmNvbnN0IHNpdGVNYXAgPSByZXF1aXJlKCcuL3NpdGVfbWFwJyk7XG5jb25zdCBzaXRlRG9tYWlucyA9IE9iamVjdC5rZXlzKHNpdGVNYXApLm1hcChrZXkgPT4gc2l0ZU1hcFtrZXldKTtcblxuLyoqXG4gKiBDb25maWd1cmF0aW9uIGZvciBhbGwgUGFnZXZpZXdzIGFwcGxpY2F0aW9ucy5cbiAqIFNvbWUgcHJvcGVydGllcyBtYXkgYmUgb3ZlcnJpZGVuIGJ5IGFwcC1zcGVjaWZpYyBjb25maWdzXG4gKi9cbmNsYXNzIFB2Q29uZmlnIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgbGV0IHNlbGYgPSB0aGlzO1xuICAgIGNvbnN0IGZvcm1hdFhBeGlzVGljayA9IHZhbHVlID0+IHtcbiAgICAgIGNvbnN0IGRheU9mV2VlayA9IG1vbWVudCh2YWx1ZSwgdGhpcy5kYXRlRm9ybWF0KS53ZWVrZGF5KCk7XG4gICAgICBpZiAoZGF5T2ZXZWVrICUgNykge1xuICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gYOKAoiAke3ZhbHVlfWA7XG4gICAgICB9XG4gICAgfTtcblxuICAgIHRoaXMuY29uZmlnID0ge1xuICAgICAgYXBpTGltaXQ6IDUwMDAsXG4gICAgICBhcGlUaHJvdHRsZTogMjAsXG4gICAgICBhcHBzOiBbJ3BhZ2V2aWV3cycsICd0b3B2aWV3cycsICdsYW5ndmlld3MnLCAnc2l0ZXZpZXdzJywgJ21hc3N2aWV3cycsICdyZWRpcmVjdHZpZXdzJ10sXG4gICAgICBjaGFydENvbmZpZzoge1xuICAgICAgICBsaW5lOiB7XG4gICAgICAgICAgb3B0czoge1xuICAgICAgICAgICAgc2NhbGVzOiB7XG4gICAgICAgICAgICAgIHlBeGVzOiBbe1xuICAgICAgICAgICAgICAgIHRpY2tzOiB7XG4gICAgICAgICAgICAgICAgICBjYWxsYmFjazogdmFsdWUgPT4gdGhpcy5mb3JtYXRZQXhpc051bWJlcih2YWx1ZSlcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1dLFxuICAgICAgICAgICAgICB4QXhlczogW3tcbiAgICAgICAgICAgICAgICB0aWNrczoge1xuICAgICAgICAgICAgICAgICAgY2FsbGJhY2s6IHZhbHVlID0+IHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZvcm1hdFhBeGlzVGljayh2YWx1ZSk7XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGxlZ2VuZENhbGxiYWNrOiBjaGFydCA9PiB0aGlzLmNvbmZpZy5jaGFydExlZ2VuZChzZWxmKSxcbiAgICAgICAgICAgIHRvb2x0aXBzOiB0aGlzLmxpbmVhclRvb2x0aXBzXG4gICAgICAgICAgfSxcbiAgICAgICAgICBkYXRhc2V0KGNvbG9yKSB7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICBjb2xvcixcbiAgICAgICAgICAgICAgYmFja2dyb3VuZENvbG9yOiAncmdiYSgwLDAsMCwwKScsXG4gICAgICAgICAgICAgIGJvcmRlcldpZHRoOiAyLFxuICAgICAgICAgICAgICBib3JkZXJDb2xvcjogY29sb3IsXG4gICAgICAgICAgICAgIHBvaW50Q29sb3I6IGNvbG9yLFxuICAgICAgICAgICAgICBwb2ludEJhY2tncm91bmRDb2xvcjogY29sb3IsXG4gICAgICAgICAgICAgIHBvaW50Qm9yZGVyQ29sb3I6IHNlbGYucmdiYShjb2xvciwgMC4yKSxcbiAgICAgICAgICAgICAgcG9pbnRIb3ZlckJhY2tncm91bmRDb2xvcjogY29sb3IsXG4gICAgICAgICAgICAgIHBvaW50SG92ZXJCb3JkZXJDb2xvcjogY29sb3IsXG4gICAgICAgICAgICAgIHBvaW50SG92ZXJCb3JkZXJXaWR0aDogMixcbiAgICAgICAgICAgICAgcG9pbnRIb3ZlclJhZGl1czogNSxcbiAgICAgICAgICAgICAgdGVuc2lvbjogc2VsZi5iZXppZXJDdXJ2ZSA9PT0gJ3RydWUnID8gMC40IDogMFxuICAgICAgICAgICAgfTtcbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIGJhcjoge1xuICAgICAgICAgIG9wdHM6IHtcbiAgICAgICAgICAgIHNjYWxlczoge1xuICAgICAgICAgICAgICB5QXhlczogW3tcbiAgICAgICAgICAgICAgICB0aWNrczoge1xuICAgICAgICAgICAgICAgICAgY2FsbGJhY2s6IHZhbHVlID0+IHRoaXMuZm9ybWF0WUF4aXNOdW1iZXIodmFsdWUpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XSxcbiAgICAgICAgICAgICAgeEF4ZXM6IFt7XG4gICAgICAgICAgICAgICAgYmFyUGVyY2VudGFnZTogMS4wLFxuICAgICAgICAgICAgICAgIGNhdGVnb3J5UGVyY2VudGFnZTogMC44NSxcbiAgICAgICAgICAgICAgICB0aWNrczoge1xuICAgICAgICAgICAgICAgICAgY2FsbGJhY2s6IHZhbHVlID0+IHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZvcm1hdFhBeGlzVGljayh2YWx1ZSk7XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGxlZ2VuZENhbGxiYWNrOiBjaGFydCA9PiB0aGlzLmNvbmZpZy5jaGFydExlZ2VuZChzZWxmKSxcbiAgICAgICAgICAgIHRvb2x0aXBzOiB0aGlzLmxpbmVhclRvb2x0aXBzXG4gICAgICAgICAgfSxcbiAgICAgICAgICBkYXRhc2V0KGNvbG9yKSB7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICBjb2xvcixcbiAgICAgICAgICAgICAgYmFja2dyb3VuZENvbG9yOiBzZWxmLnJnYmEoY29sb3IsIDAuNiksXG4gICAgICAgICAgICAgIGJvcmRlckNvbG9yOiBzZWxmLnJnYmEoY29sb3IsIDAuOSksXG4gICAgICAgICAgICAgIGJvcmRlcldpZHRoOiAyLFxuICAgICAgICAgICAgICBob3ZlckJhY2tncm91bmRDb2xvcjogc2VsZi5yZ2JhKGNvbG9yLCAwLjc1KSxcbiAgICAgICAgICAgICAgaG92ZXJCb3JkZXJDb2xvcjogY29sb3JcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICByYWRhcjoge1xuICAgICAgICAgIG9wdHM6IHtcbiAgICAgICAgICAgIHNjYWxlOiB7XG4gICAgICAgICAgICAgIHRpY2tzOiB7XG4gICAgICAgICAgICAgICAgY2FsbGJhY2s6IHZhbHVlID0+IHRoaXMuZm9ybWF0TnVtYmVyKHZhbHVlKVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgbGVnZW5kQ2FsbGJhY2s6IGNoYXJ0ID0+IHRoaXMuY29uZmlnLmNoYXJ0TGVnZW5kKHNlbGYpLFxuICAgICAgICAgICAgdG9vbHRpcHM6IHRoaXMubGluZWFyVG9vbHRpcHNcbiAgICAgICAgICB9LFxuICAgICAgICAgIGRhdGFzZXQoY29sb3IpIHtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgIGNvbG9yLFxuICAgICAgICAgICAgICBiYWNrZ3JvdW5kQ29sb3I6IHNlbGYucmdiYShjb2xvciwgMC4xKSxcbiAgICAgICAgICAgICAgYm9yZGVyQ29sb3I6IGNvbG9yLFxuICAgICAgICAgICAgICBib3JkZXJXaWR0aDogMixcbiAgICAgICAgICAgICAgcG9pbnRCYWNrZ3JvdW5kQ29sb3I6IGNvbG9yLFxuICAgICAgICAgICAgICBwb2ludEJvcmRlckNvbG9yOiBzZWxmLnJnYmEoY29sb3IsIDAuOCksXG4gICAgICAgICAgICAgIHBvaW50SG92ZXJCYWNrZ3JvdW5kQ29sb3I6IGNvbG9yLFxuICAgICAgICAgICAgICBwb2ludEhvdmVyQm9yZGVyQ29sb3I6IGNvbG9yLFxuICAgICAgICAgICAgICBwb2ludEhvdmVyUmFkaXVzOiA1XG4gICAgICAgICAgICB9O1xuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgcGllOiB7XG4gICAgICAgICAgb3B0czoge1xuICAgICAgICAgICAgbGVnZW5kQ2FsbGJhY2s6IGNoYXJ0ID0+IHRoaXMuY29uZmlnLmNoYXJ0TGVnZW5kKHNlbGYpLFxuICAgICAgICAgICAgdG9vbHRpcHM6IHRoaXMuY2lyY3VsYXJUb29sdGlwc1xuICAgICAgICAgIH0sXG4gICAgICAgICAgZGF0YXNldChjb2xvcikge1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgY29sb3IsXG4gICAgICAgICAgICAgIGJhY2tncm91bmRDb2xvcjogY29sb3IsXG4gICAgICAgICAgICAgIGhvdmVyQmFja2dyb3VuZENvbG9yOiBzZWxmLnJnYmEoY29sb3IsIDAuOClcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBkb3VnaG51dDoge1xuICAgICAgICAgIG9wdHM6IHtcbiAgICAgICAgICAgIGxlZ2VuZENhbGxiYWNrOiBjaGFydCA9PiB0aGlzLmNvbmZpZy5jaGFydExlZ2VuZChzZWxmKSxcbiAgICAgICAgICAgIHRvb2x0aXBzOiB0aGlzLmNpcmN1bGFyVG9vbHRpcHNcbiAgICAgICAgICB9LFxuICAgICAgICAgIGRhdGFzZXQoY29sb3IpIHtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgIGNvbG9yOiBjb2xvcixcbiAgICAgICAgICAgICAgYmFja2dyb3VuZENvbG9yOiBjb2xvcixcbiAgICAgICAgICAgICAgaG92ZXJCYWNrZ3JvdW5kQ29sb3I6IHNlbGYucmdiYShjb2xvciwgMC44KVxuICAgICAgICAgICAgfTtcbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIHBvbGFyQXJlYToge1xuICAgICAgICAgIG9wdHM6IHtcbiAgICAgICAgICAgIHNjYWxlOiB7XG4gICAgICAgICAgICAgIHRpY2tzOiB7XG4gICAgICAgICAgICAgICAgYmVnaW5BdFplcm86IHRydWUsXG4gICAgICAgICAgICAgICAgY2FsbGJhY2s6IHZhbHVlID0+IHRoaXMuZm9ybWF0TnVtYmVyKHZhbHVlKVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgbGVnZW5kQ2FsbGJhY2s6IGNoYXJ0ID0+IHRoaXMuY29uZmlnLmNoYXJ0TGVnZW5kKHNlbGYpLFxuICAgICAgICAgICAgdG9vbHRpcHM6IHRoaXMuY2lyY3VsYXJUb29sdGlwc1xuICAgICAgICAgIH0sXG4gICAgICAgICAgZGF0YXNldChjb2xvcikge1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgY29sb3I6IGNvbG9yLFxuICAgICAgICAgICAgICBiYWNrZ3JvdW5kQ29sb3I6IHNlbGYucmdiYShjb2xvciwgMC43KSxcbiAgICAgICAgICAgICAgaG92ZXJCYWNrZ3JvdW5kQ29sb3I6IHNlbGYucmdiYShjb2xvciwgMC45KVxuICAgICAgICAgICAgfTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBjaXJjdWxhckNoYXJ0czogWydwaWUnLCAnZG91Z2hudXQnLCAncG9sYXJBcmVhJ10sXG4gICAgICBjb2xvcnM6IFsncmdiYSgxNzEsIDIxMiwgMjM1LCAxKScsICdyZ2JhKDE3OCwgMjIzLCAxMzgsIDEpJywgJ3JnYmEoMjUxLCAxNTQsIDE1MywgMSknLCAncmdiYSgyNTMsIDE5MSwgMTExLCAxKScsICdyZ2JhKDIwMiwgMTc4LCAyMTQsIDEpJywgJ3JnYmEoMjA3LCAxODIsIDEyOCwgMSknLCAncmdiYSgxNDEsIDIxMSwgMTk5LCAxKScsICdyZ2JhKDI1MiwgMjA1LCAyMjksIDEpJywgJ3JnYmEoMjU1LCAyNDcsIDE2MSwgMSknLCAncmdiYSgyMTcsIDIxNywgMjE3LCAxKSddLFxuICAgICAgZGVmYXVsdHM6IHtcbiAgICAgICAgYXV0b2NvbXBsZXRlOiAnYXV0b2NvbXBsZXRlJyxcbiAgICAgICAgY2hhcnRUeXBlOiBudW1EYXRhc2V0cyA9PiBudW1EYXRhc2V0cyA+IDEgPyAnbGluZScgOiAnYmFyJyxcbiAgICAgICAgZGF0ZUZvcm1hdDogJ1lZWVktTU0tREQnLFxuICAgICAgICBsb2NhbGl6ZURhdGVGb3JtYXQ6ICd0cnVlJyxcbiAgICAgICAgbnVtZXJpY2FsRm9ybWF0dGluZzogJ3RydWUnLFxuICAgICAgICBiZXppZXJDdXJ2ZTogJ2ZhbHNlJyxcbiAgICAgICAgYXV0b0xvZ0RldGVjdGlvbjogJ3RydWUnLFxuICAgICAgICBiZWdpbkF0WmVybzogJ2ZhbHNlJyxcbiAgICAgICAgcmVtZW1iZXJDaGFydDogJ3RydWUnLFxuICAgICAgICBhZ2VudDogJ3VzZXInLFxuICAgICAgICBwbGF0Zm9ybTogJ2FsbC1hY2Nlc3MnLFxuICAgICAgICBwcm9qZWN0OiAnZW4ud2lraXBlZGlhLm9yZydcbiAgICAgIH0sXG4gICAgICBnbG9iYWxDaGFydE9wdHM6IHtcbiAgICAgICAgYW5pbWF0aW9uOiB7XG4gICAgICAgICAgZHVyYXRpb246IDUwMCxcbiAgICAgICAgICBlYXNpbmc6ICdlYXNlSW5PdXRRdWFydCdcbiAgICAgICAgfSxcbiAgICAgICAgaG92ZXI6IHtcbiAgICAgICAgICBhbmltYXRpb25EdXJhdGlvbjogMFxuICAgICAgICB9LFxuICAgICAgICBsZWdlbmQ6IHtcbiAgICAgICAgICBkaXNwbGF5OiBmYWxzZVxuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgbGluZWFyQ2hhcnRzOiBbJ2xpbmUnLCAnYmFyJywgJ3JhZGFyJ10sXG4gICAgICBsaW5lYXJPcHRzOiB7XG4gICAgICAgIHNjYWxlczoge1xuICAgICAgICAgIHlBeGVzOiBbe1xuICAgICAgICAgICAgdGlja3M6IHtcbiAgICAgICAgICAgICAgY2FsbGJhY2s6IHZhbHVlID0+IHRoaXMuZm9ybWF0TnVtYmVyKHZhbHVlKVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1dXG4gICAgICAgIH0sXG4gICAgICAgIGxlZ2VuZENhbGxiYWNrOiBjaGFydCA9PiB0aGlzLmNvbmZpZy5jaGFydExlZ2VuZChjaGFydC5kYXRhLmRhdGFzZXRzLCBzZWxmKVxuICAgICAgfSxcbiAgICAgIGRheXNBZ286IDIwLFxuICAgICAgbWluRGF0ZTogbW9tZW50KCcyMDE1LTA3LTAxJykuc3RhcnRPZignZGF5JyksXG4gICAgICBtYXhEYXRlOiBtb21lbnQoKS5zdWJ0cmFjdCgxLCAnZGF5cycpLnN0YXJ0T2YoJ2RheScpLFxuICAgICAgc3BlY2lhbFJhbmdlczoge1xuICAgICAgICAnbGFzdC13ZWVrJzogW21vbWVudCgpLnN1YnRyYWN0KDEsICd3ZWVrJykuc3RhcnRPZignd2VlaycpLCBtb21lbnQoKS5zdWJ0cmFjdCgxLCAnd2VlaycpLmVuZE9mKCd3ZWVrJyldLFxuICAgICAgICAndGhpcy1tb250aCc6IFttb21lbnQoKS5zdGFydE9mKCdtb250aCcpLCBtb21lbnQoKS5zdWJ0cmFjdCgxLCAnZGF5cycpLnN0YXJ0T2YoJ2RheScpXSxcbiAgICAgICAgJ2xhc3QtbW9udGgnOiBbbW9tZW50KCkuc3VidHJhY3QoMSwgJ21vbnRoJykuc3RhcnRPZignbW9udGgnKSwgbW9tZW50KCkuc3VidHJhY3QoMSwgJ21vbnRoJykuZW5kT2YoJ21vbnRoJyldLFxuICAgICAgICBsYXRlc3Qob2Zmc2V0ID0gc2VsZi5jb25maWcuZGF5c0Fnbykge1xuICAgICAgICAgIHJldHVybiBbbW9tZW50KCkuc3VidHJhY3Qob2Zmc2V0LCAnZGF5cycpLnN0YXJ0T2YoJ2RheScpLCBzZWxmLmNvbmZpZy5tYXhEYXRlXTtcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIHRpbWVzdGFtcEZvcm1hdDogJ1lZWVlNTUREMDAnLFxuICAgICAgdmFsaWRQYXJhbXM6IHtcbiAgICAgICAgYWdlbnQ6IFsnYWxsLWFnZW50cycsICd1c2VyJywgJ3NwaWRlcicsICdib3QnXSxcbiAgICAgICAgcGxhdGZvcm06IFsnYWxsLWFjY2VzcycsICdkZXNrdG9wJywgJ21vYmlsZS1hcHAnLCAnbW9iaWxlLXdlYiddLFxuICAgICAgICBwcm9qZWN0OiBzaXRlRG9tYWluc1xuICAgICAgfVxuICAgIH07XG4gIH1cblxuICBnZXQgbGluZWFyVG9vbHRpcHMoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIG1vZGU6ICdsYWJlbCcsXG4gICAgICBjYWxsYmFja3M6IHtcbiAgICAgICAgbGFiZWw6IHRvb2x0aXBJdGVtID0+IHtcbiAgICAgICAgICBpZiAoTnVtYmVyLmlzTmFOKHRvb2x0aXBJdGVtLnlMYWJlbCkpIHtcbiAgICAgICAgICAgIHJldHVybiAnICcgKyAkLmkxOG4oJ3Vua25vd24nKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuICcgJyArIHRoaXMuZm9ybWF0TnVtYmVyKHRvb2x0aXBJdGVtLnlMYWJlbCk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgYm9keUZvbnRTaXplOiAxNCxcbiAgICAgIGJvZHlTcGFjaW5nOiA3LFxuICAgICAgY2FyZXRTaXplOiAwLFxuICAgICAgdGl0bGVGb250U2l6ZTogMTRcbiAgICB9O1xuICB9XG5cbiAgZ2V0IGNpcmN1bGFyVG9vbHRpcHMoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGNhbGxiYWNrczoge1xuICAgICAgICBsYWJlbDogKHRvb2x0aXBJdGVtLCBjaGFydEluc3RhbmNlKSA9PiB7XG4gICAgICAgICAgY29uc3QgdmFsdWUgPSBjaGFydEluc3RhbmNlLmRhdGFzZXRzW3Rvb2x0aXBJdGVtLmRhdGFzZXRJbmRleF0uZGF0YVt0b29sdGlwSXRlbS5pbmRleF0sXG4gICAgICAgICAgICBsYWJlbCA9IGNoYXJ0SW5zdGFuY2UubGFiZWxzW3Rvb2x0aXBJdGVtLmluZGV4XTtcblxuICAgICAgICAgIGlmIChOdW1iZXIuaXNOYU4odmFsdWUpKSB7XG4gICAgICAgICAgICByZXR1cm4gYCR7bGFiZWx9OiAkeyQuaTE4bigndW5rbm93bicpfWA7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBgJHtsYWJlbH06ICR7dGhpcy5mb3JtYXROdW1iZXIodmFsdWUpfWA7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgYm9keUZvbnRTaXplOiAxNCxcbiAgICAgIGJvZHlTcGFjaW5nOiA3LFxuICAgICAgY2FyZXRTaXplOiAwLFxuICAgICAgdGl0bGVGb250U2l6ZTogMTRcbiAgICB9O1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gUHZDb25maWc7XG4iLCIvKipcbiAqIEBmaWxlIFdNRiBbc2l0ZSBtYXRyaXhdKGh0dHBzOi8vd3d3Lm1lZGlhd2lraS5vcmcvdy9hcGkucGhwP2FjdGlvbj1zaXRlbWF0cml4KSwgd2l0aCBzb21lIHVuc3VwcG9ydGVkIHdpa2lzIHJlbW92ZWRcbiAqL1xuXG4vKipcbiAqIFNpdGVtYXRyaXggb2YgYWxsIHN1cHBvcnRlZCBXTUYgd2lraXNcbiAqIEB0eXBlIHtPYmplY3R9XG4gKi9cbmNvbnN0IHNpdGVNYXAgPSB7XG4gICdhYXdpa2knOiAnYWEud2lraXBlZGlhLm9yZycsXG4gICdhYXdpa3Rpb25hcnknOiAnYWEud2lrdGlvbmFyeS5vcmcnLFxuICAnYWF3aWtpYm9va3MnOiAnYWEud2lraWJvb2tzLm9yZycsXG4gICdhYndpa2knOiAnYWIud2lraXBlZGlhLm9yZycsXG4gICdhYndpa3Rpb25hcnknOiAnYWIud2lrdGlvbmFyeS5vcmcnLFxuICAnYWNld2lraSc6ICdhY2Uud2lraXBlZGlhLm9yZycsXG4gICdhZHl3aWtpJzogJ2FkeS53aWtpcGVkaWEub3JnJyxcbiAgJ2Fmd2lraSc6ICdhZi53aWtpcGVkaWEub3JnJyxcbiAgJ2Fmd2lrdGlvbmFyeSc6ICdhZi53aWt0aW9uYXJ5Lm9yZycsXG4gICdhZndpa2lib29rcyc6ICdhZi53aWtpYm9va3Mub3JnJyxcbiAgJ2Fmd2lraXF1b3RlJzogJ2FmLndpa2lxdW90ZS5vcmcnLFxuICAnYWt3aWtpJzogJ2FrLndpa2lwZWRpYS5vcmcnLFxuICAnYWt3aWt0aW9uYXJ5JzogJ2FrLndpa3Rpb25hcnkub3JnJyxcbiAgJ2Frd2lraWJvb2tzJzogJ2FrLndpa2lib29rcy5vcmcnLFxuICAnYWxzd2lraSc6ICdhbHMud2lraXBlZGlhLm9yZycsXG4gICdhbHN3aWt0aW9uYXJ5JzogJ2Fscy53aWt0aW9uYXJ5Lm9yZycsXG4gICdhbHN3aWtpYm9va3MnOiAnYWxzLndpa2lib29rcy5vcmcnLFxuICAnYWxzd2lraXF1b3RlJzogJ2Fscy53aWtpcXVvdGUub3JnJyxcbiAgJ2Ftd2lraSc6ICdhbS53aWtpcGVkaWEub3JnJyxcbiAgJ2Ftd2lrdGlvbmFyeSc6ICdhbS53aWt0aW9uYXJ5Lm9yZycsXG4gICdhbXdpa2lxdW90ZSc6ICdhbS53aWtpcXVvdGUub3JnJyxcbiAgJ2Fud2lraSc6ICdhbi53aWtpcGVkaWEub3JnJyxcbiAgJ2Fud2lrdGlvbmFyeSc6ICdhbi53aWt0aW9uYXJ5Lm9yZycsXG4gICdhbmd3aWtpJzogJ2FuZy53aWtpcGVkaWEub3JnJyxcbiAgJ2FuZ3dpa3Rpb25hcnknOiAnYW5nLndpa3Rpb25hcnkub3JnJyxcbiAgJ2FuZ3dpa2lib29rcyc6ICdhbmcud2lraWJvb2tzLm9yZycsXG4gICdhbmd3aWtpcXVvdGUnOiAnYW5nLndpa2lxdW90ZS5vcmcnLFxuICAnYW5nd2lraXNvdXJjZSc6ICdhbmcud2lraXNvdXJjZS5vcmcnLFxuICAnYXJ3aWtpJzogJ2FyLndpa2lwZWRpYS5vcmcnLFxuICAnYXJ3aWt0aW9uYXJ5JzogJ2FyLndpa3Rpb25hcnkub3JnJyxcbiAgJ2Fyd2lraWJvb2tzJzogJ2FyLndpa2lib29rcy5vcmcnLFxuICAnYXJ3aWtpbmV3cyc6ICdhci53aWtpbmV3cy5vcmcnLFxuICAnYXJ3aWtpcXVvdGUnOiAnYXIud2lraXF1b3RlLm9yZycsXG4gICdhcndpa2lzb3VyY2UnOiAnYXIud2lraXNvdXJjZS5vcmcnLFxuICAnYXJ3aWtpdmVyc2l0eSc6ICdhci53aWtpdmVyc2l0eS5vcmcnLFxuICAnYXJjd2lraSc6ICdhcmMud2lraXBlZGlhLm9yZycsXG4gICdhcnp3aWtpJzogJ2Fyei53aWtpcGVkaWEub3JnJyxcbiAgJ2Fzd2lraSc6ICdhcy53aWtpcGVkaWEub3JnJyxcbiAgJ2Fzd2lrdGlvbmFyeSc6ICdhcy53aWt0aW9uYXJ5Lm9yZycsXG4gICdhc3dpa2lib29rcyc6ICdhcy53aWtpYm9va3Mub3JnJyxcbiAgJ2Fzd2lraXNvdXJjZSc6ICdhcy53aWtpc291cmNlLm9yZycsXG4gICdhc3R3aWtpJzogJ2FzdC53aWtpcGVkaWEub3JnJyxcbiAgJ2FzdHdpa3Rpb25hcnknOiAnYXN0Lndpa3Rpb25hcnkub3JnJyxcbiAgJ2FzdHdpa2lib29rcyc6ICdhc3Qud2lraWJvb2tzLm9yZycsXG4gICdhc3R3aWtpcXVvdGUnOiAnYXN0Lndpa2lxdW90ZS5vcmcnLFxuICAnYXZ3aWtpJzogJ2F2Lndpa2lwZWRpYS5vcmcnLFxuICAnYXZ3aWt0aW9uYXJ5JzogJ2F2Lndpa3Rpb25hcnkub3JnJyxcbiAgJ2F5d2lraSc6ICdheS53aWtpcGVkaWEub3JnJyxcbiAgJ2F5d2lrdGlvbmFyeSc6ICdheS53aWt0aW9uYXJ5Lm9yZycsXG4gICdheXdpa2lib29rcyc6ICdheS53aWtpYm9va3Mub3JnJyxcbiAgJ2F6d2lraSc6ICdhei53aWtpcGVkaWEub3JnJyxcbiAgJ2F6d2lrdGlvbmFyeSc6ICdhei53aWt0aW9uYXJ5Lm9yZycsXG4gICdhendpa2lib29rcyc6ICdhei53aWtpYm9va3Mub3JnJyxcbiAgJ2F6d2lraXF1b3RlJzogJ2F6Lndpa2lxdW90ZS5vcmcnLFxuICAnYXp3aWtpc291cmNlJzogJ2F6Lndpa2lzb3VyY2Uub3JnJyxcbiAgJ2F6Yndpa2knOiAnYXpiLndpa2lwZWRpYS5vcmcnLFxuICAnYmF3aWtpJzogJ2JhLndpa2lwZWRpYS5vcmcnLFxuICAnYmF3aWtpYm9va3MnOiAnYmEud2lraWJvb2tzLm9yZycsXG4gICdiYXJ3aWtpJzogJ2Jhci53aWtpcGVkaWEub3JnJyxcbiAgJ2JhdF9zbWd3aWtpJzogJ2JhdC1zbWcud2lraXBlZGlhLm9yZycsXG4gICdiY2x3aWtpJzogJ2JjbC53aWtpcGVkaWEub3JnJyxcbiAgJ2Jld2lraSc6ICdiZS53aWtpcGVkaWEub3JnJyxcbiAgJ2Jld2lrdGlvbmFyeSc6ICdiZS53aWt0aW9uYXJ5Lm9yZycsXG4gICdiZXdpa2lib29rcyc6ICdiZS53aWtpYm9va3Mub3JnJyxcbiAgJ2Jld2lraXF1b3RlJzogJ2JlLndpa2lxdW90ZS5vcmcnLFxuICAnYmV3aWtpc291cmNlJzogJ2JlLndpa2lzb3VyY2Uub3JnJyxcbiAgJ2JlX3hfb2xkd2lraSc6ICdiZS10YXJhc2sud2lraXBlZGlhLm9yZycsXG4gICdiZ3dpa2knOiAnYmcud2lraXBlZGlhLm9yZycsXG4gICdiZ3dpa3Rpb25hcnknOiAnYmcud2lrdGlvbmFyeS5vcmcnLFxuICAnYmd3aWtpYm9va3MnOiAnYmcud2lraWJvb2tzLm9yZycsXG4gICdiZ3dpa2luZXdzJzogJ2JnLndpa2luZXdzLm9yZycsXG4gICdiZ3dpa2lxdW90ZSc6ICdiZy53aWtpcXVvdGUub3JnJyxcbiAgJ2Jnd2lraXNvdXJjZSc6ICdiZy53aWtpc291cmNlLm9yZycsXG4gICdiaHdpa2knOiAnYmgud2lraXBlZGlhLm9yZycsXG4gICdiaHdpa3Rpb25hcnknOiAnYmgud2lrdGlvbmFyeS5vcmcnLFxuICAnYml3aWtpJzogJ2JpLndpa2lwZWRpYS5vcmcnLFxuICAnYml3aWt0aW9uYXJ5JzogJ2JpLndpa3Rpb25hcnkub3JnJyxcbiAgJ2Jpd2lraWJvb2tzJzogJ2JpLndpa2lib29rcy5vcmcnLFxuICAnYmpud2lraSc6ICdiam4ud2lraXBlZGlhLm9yZycsXG4gICdibXdpa2knOiAnYm0ud2lraXBlZGlhLm9yZycsXG4gICdibXdpa3Rpb25hcnknOiAnYm0ud2lrdGlvbmFyeS5vcmcnLFxuICAnYm13aWtpYm9va3MnOiAnYm0ud2lraWJvb2tzLm9yZycsXG4gICdibXdpa2lxdW90ZSc6ICdibS53aWtpcXVvdGUub3JnJyxcbiAgJ2Jud2lraSc6ICdibi53aWtpcGVkaWEub3JnJyxcbiAgJ2Jud2lrdGlvbmFyeSc6ICdibi53aWt0aW9uYXJ5Lm9yZycsXG4gICdibndpa2lib29rcyc6ICdibi53aWtpYm9va3Mub3JnJyxcbiAgJ2Jud2lraXNvdXJjZSc6ICdibi53aWtpc291cmNlLm9yZycsXG4gICdib3dpa2knOiAnYm8ud2lraXBlZGlhLm9yZycsXG4gICdib3dpa3Rpb25hcnknOiAnYm8ud2lrdGlvbmFyeS5vcmcnLFxuICAnYm93aWtpYm9va3MnOiAnYm8ud2lraWJvb2tzLm9yZycsXG4gICdicHl3aWtpJzogJ2JweS53aWtpcGVkaWEub3JnJyxcbiAgJ2Jyd2lraSc6ICdici53aWtpcGVkaWEub3JnJyxcbiAgJ2Jyd2lrdGlvbmFyeSc6ICdici53aWt0aW9uYXJ5Lm9yZycsXG4gICdicndpa2lxdW90ZSc6ICdici53aWtpcXVvdGUub3JnJyxcbiAgJ2Jyd2lraXNvdXJjZSc6ICdici53aWtpc291cmNlLm9yZycsXG4gICdic3dpa2knOiAnYnMud2lraXBlZGlhLm9yZycsXG4gICdic3dpa3Rpb25hcnknOiAnYnMud2lrdGlvbmFyeS5vcmcnLFxuICAnYnN3aWtpYm9va3MnOiAnYnMud2lraWJvb2tzLm9yZycsXG4gICdic3dpa2luZXdzJzogJ2JzLndpa2luZXdzLm9yZycsXG4gICdic3dpa2lxdW90ZSc6ICdicy53aWtpcXVvdGUub3JnJyxcbiAgJ2Jzd2lraXNvdXJjZSc6ICdicy53aWtpc291cmNlLm9yZycsXG4gICdidWd3aWtpJzogJ2J1Zy53aWtpcGVkaWEub3JnJyxcbiAgJ2J4cndpa2knOiAnYnhyLndpa2lwZWRpYS5vcmcnLFxuICAnY2F3aWtpJzogJ2NhLndpa2lwZWRpYS5vcmcnLFxuICAnY2F3aWt0aW9uYXJ5JzogJ2NhLndpa3Rpb25hcnkub3JnJyxcbiAgJ2Nhd2lraWJvb2tzJzogJ2NhLndpa2lib29rcy5vcmcnLFxuICAnY2F3aWtpbmV3cyc6ICdjYS53aWtpbmV3cy5vcmcnLFxuICAnY2F3aWtpcXVvdGUnOiAnY2Eud2lraXF1b3RlLm9yZycsXG4gICdjYXdpa2lzb3VyY2UnOiAnY2Eud2lraXNvdXJjZS5vcmcnLFxuICAnY2JrX3phbXdpa2knOiAnY2JrLXphbS53aWtpcGVkaWEub3JnJyxcbiAgJ2Nkb3dpa2knOiAnY2RvLndpa2lwZWRpYS5vcmcnLFxuICAnY2V3aWtpJzogJ2NlLndpa2lwZWRpYS5vcmcnLFxuICAnY2Vid2lraSc6ICdjZWIud2lraXBlZGlhLm9yZycsXG4gICdjaHdpa2knOiAnY2gud2lraXBlZGlhLm9yZycsXG4gICdjaHdpa3Rpb25hcnknOiAnY2gud2lrdGlvbmFyeS5vcmcnLFxuICAnY2h3aWtpYm9va3MnOiAnY2gud2lraWJvb2tzLm9yZycsXG4gICdjaG93aWtpJzogJ2Noby53aWtpcGVkaWEub3JnJyxcbiAgJ2Nocndpa2knOiAnY2hyLndpa2lwZWRpYS5vcmcnLFxuICAnY2hyd2lrdGlvbmFyeSc6ICdjaHIud2lrdGlvbmFyeS5vcmcnLFxuICAnY2h5d2lraSc6ICdjaHkud2lraXBlZGlhLm9yZycsXG4gICdja2J3aWtpJzogJ2NrYi53aWtpcGVkaWEub3JnJyxcbiAgJ2Nvd2lraSc6ICdjby53aWtpcGVkaWEub3JnJyxcbiAgJ2Nvd2lrdGlvbmFyeSc6ICdjby53aWt0aW9uYXJ5Lm9yZycsXG4gICdjb3dpa2lib29rcyc6ICdjby53aWtpYm9va3Mub3JnJyxcbiAgJ2Nvd2lraXF1b3RlJzogJ2NvLndpa2lxdW90ZS5vcmcnLFxuICAnY3J3aWtpJzogJ2NyLndpa2lwZWRpYS5vcmcnLFxuICAnY3J3aWt0aW9uYXJ5JzogJ2NyLndpa3Rpb25hcnkub3JnJyxcbiAgJ2Nyd2lraXF1b3RlJzogJ2NyLndpa2lxdW90ZS5vcmcnLFxuICAnY3Jod2lraSc6ICdjcmgud2lraXBlZGlhLm9yZycsXG4gICdjc3dpa2knOiAnY3Mud2lraXBlZGlhLm9yZycsXG4gICdjc3dpa3Rpb25hcnknOiAnY3Mud2lrdGlvbmFyeS5vcmcnLFxuICAnY3N3aWtpYm9va3MnOiAnY3Mud2lraWJvb2tzLm9yZycsXG4gICdjc3dpa2luZXdzJzogJ2NzLndpa2luZXdzLm9yZycsXG4gICdjc3dpa2lxdW90ZSc6ICdjcy53aWtpcXVvdGUub3JnJyxcbiAgJ2Nzd2lraXNvdXJjZSc6ICdjcy53aWtpc291cmNlLm9yZycsXG4gICdjc3dpa2l2ZXJzaXR5JzogJ2NzLndpa2l2ZXJzaXR5Lm9yZycsXG4gICdjc2J3aWtpJzogJ2NzYi53aWtpcGVkaWEub3JnJyxcbiAgJ2NzYndpa3Rpb25hcnknOiAnY3NiLndpa3Rpb25hcnkub3JnJyxcbiAgJ2N1d2lraSc6ICdjdS53aWtpcGVkaWEub3JnJyxcbiAgJ2N2d2lraSc6ICdjdi53aWtpcGVkaWEub3JnJyxcbiAgJ2N2d2lraWJvb2tzJzogJ2N2Lndpa2lib29rcy5vcmcnLFxuICAnY3l3aWtpJzogJ2N5Lndpa2lwZWRpYS5vcmcnLFxuICAnY3l3aWt0aW9uYXJ5JzogJ2N5Lndpa3Rpb25hcnkub3JnJyxcbiAgJ2N5d2lraWJvb2tzJzogJ2N5Lndpa2lib29rcy5vcmcnLFxuICAnY3l3aWtpcXVvdGUnOiAnY3kud2lraXF1b3RlLm9yZycsXG4gICdjeXdpa2lzb3VyY2UnOiAnY3kud2lraXNvdXJjZS5vcmcnLFxuICAnZGF3aWtpJzogJ2RhLndpa2lwZWRpYS5vcmcnLFxuICAnZGF3aWt0aW9uYXJ5JzogJ2RhLndpa3Rpb25hcnkub3JnJyxcbiAgJ2Rhd2lraWJvb2tzJzogJ2RhLndpa2lib29rcy5vcmcnLFxuICAnZGF3aWtpcXVvdGUnOiAnZGEud2lraXF1b3RlLm9yZycsXG4gICdkYXdpa2lzb3VyY2UnOiAnZGEud2lraXNvdXJjZS5vcmcnLFxuICAnZGV3aWtpJzogJ2RlLndpa2lwZWRpYS5vcmcnLFxuICAnZGV3aWt0aW9uYXJ5JzogJ2RlLndpa3Rpb25hcnkub3JnJyxcbiAgJ2Rld2lraWJvb2tzJzogJ2RlLndpa2lib29rcy5vcmcnLFxuICAnZGV3aWtpbmV3cyc6ICdkZS53aWtpbmV3cy5vcmcnLFxuICAnZGV3aWtpcXVvdGUnOiAnZGUud2lraXF1b3RlLm9yZycsXG4gICdkZXdpa2lzb3VyY2UnOiAnZGUud2lraXNvdXJjZS5vcmcnLFxuICAnZGV3aWtpdmVyc2l0eSc6ICdkZS53aWtpdmVyc2l0eS5vcmcnLFxuICAnZGV3aWtpdm95YWdlJzogJ2RlLndpa2l2b3lhZ2Uub3JnJyxcbiAgJ2RpcXdpa2knOiAnZGlxLndpa2lwZWRpYS5vcmcnLFxuICAnZHNid2lraSc6ICdkc2Iud2lraXBlZGlhLm9yZycsXG4gICdkdndpa2knOiAnZHYud2lraXBlZGlhLm9yZycsXG4gICdkdndpa3Rpb25hcnknOiAnZHYud2lrdGlvbmFyeS5vcmcnLFxuICAnZHp3aWtpJzogJ2R6Lndpa2lwZWRpYS5vcmcnLFxuICAnZHp3aWt0aW9uYXJ5JzogJ2R6Lndpa3Rpb25hcnkub3JnJyxcbiAgJ2Vld2lraSc6ICdlZS53aWtpcGVkaWEub3JnJyxcbiAgJ2Vsd2lraSc6ICdlbC53aWtpcGVkaWEub3JnJyxcbiAgJ2Vsd2lrdGlvbmFyeSc6ICdlbC53aWt0aW9uYXJ5Lm9yZycsXG4gICdlbHdpa2lib29rcyc6ICdlbC53aWtpYm9va3Mub3JnJyxcbiAgJ2Vsd2lraW5ld3MnOiAnZWwud2lraW5ld3Mub3JnJyxcbiAgJ2Vsd2lraXF1b3RlJzogJ2VsLndpa2lxdW90ZS5vcmcnLFxuICAnZWx3aWtpc291cmNlJzogJ2VsLndpa2lzb3VyY2Uub3JnJyxcbiAgJ2Vsd2lraXZlcnNpdHknOiAnZWwud2lraXZlcnNpdHkub3JnJyxcbiAgJ2Vsd2lraXZveWFnZSc6ICdlbC53aWtpdm95YWdlLm9yZycsXG4gICdlbWx3aWtpJzogJ2VtbC53aWtpcGVkaWEub3JnJyxcbiAgJ2Vud2lraSc6ICdlbi53aWtpcGVkaWEub3JnJyxcbiAgJ2Vud2lrdGlvbmFyeSc6ICdlbi53aWt0aW9uYXJ5Lm9yZycsXG4gICdlbndpa2lib29rcyc6ICdlbi53aWtpYm9va3Mub3JnJyxcbiAgJ2Vud2lraW5ld3MnOiAnZW4ud2lraW5ld3Mub3JnJyxcbiAgJ2Vud2lraXF1b3RlJzogJ2VuLndpa2lxdW90ZS5vcmcnLFxuICAnZW53aWtpc291cmNlJzogJ2VuLndpa2lzb3VyY2Uub3JnJyxcbiAgJ2Vud2lraXZlcnNpdHknOiAnZW4ud2lraXZlcnNpdHkub3JnJyxcbiAgJ2Vud2lraXZveWFnZSc6ICdlbi53aWtpdm95YWdlLm9yZycsXG4gICdlb3dpa2knOiAnZW8ud2lraXBlZGlhLm9yZycsXG4gICdlb3dpa3Rpb25hcnknOiAnZW8ud2lrdGlvbmFyeS5vcmcnLFxuICAnZW93aWtpYm9va3MnOiAnZW8ud2lraWJvb2tzLm9yZycsXG4gICdlb3dpa2luZXdzJzogJ2VvLndpa2luZXdzLm9yZycsXG4gICdlb3dpa2lxdW90ZSc6ICdlby53aWtpcXVvdGUub3JnJyxcbiAgJ2Vvd2lraXNvdXJjZSc6ICdlby53aWtpc291cmNlLm9yZycsXG4gICdlc3dpa2knOiAnZXMud2lraXBlZGlhLm9yZycsXG4gICdlc3dpa3Rpb25hcnknOiAnZXMud2lrdGlvbmFyeS5vcmcnLFxuICAnZXN3aWtpYm9va3MnOiAnZXMud2lraWJvb2tzLm9yZycsXG4gICdlc3dpa2luZXdzJzogJ2VzLndpa2luZXdzLm9yZycsXG4gICdlc3dpa2lxdW90ZSc6ICdlcy53aWtpcXVvdGUub3JnJyxcbiAgJ2Vzd2lraXNvdXJjZSc6ICdlcy53aWtpc291cmNlLm9yZycsXG4gICdlc3dpa2l2ZXJzaXR5JzogJ2VzLndpa2l2ZXJzaXR5Lm9yZycsXG4gICdlc3dpa2l2b3lhZ2UnOiAnZXMud2lraXZveWFnZS5vcmcnLFxuICAnZXR3aWtpJzogJ2V0Lndpa2lwZWRpYS5vcmcnLFxuICAnZXR3aWt0aW9uYXJ5JzogJ2V0Lndpa3Rpb25hcnkub3JnJyxcbiAgJ2V0d2lraWJvb2tzJzogJ2V0Lndpa2lib29rcy5vcmcnLFxuICAnZXR3aWtpcXVvdGUnOiAnZXQud2lraXF1b3RlLm9yZycsXG4gICdldHdpa2lzb3VyY2UnOiAnZXQud2lraXNvdXJjZS5vcmcnLFxuICAnZXV3aWtpJzogJ2V1Lndpa2lwZWRpYS5vcmcnLFxuICAnZXV3aWt0aW9uYXJ5JzogJ2V1Lndpa3Rpb25hcnkub3JnJyxcbiAgJ2V1d2lraWJvb2tzJzogJ2V1Lndpa2lib29rcy5vcmcnLFxuICAnZXV3aWtpcXVvdGUnOiAnZXUud2lraXF1b3RlLm9yZycsXG4gICdleHR3aWtpJzogJ2V4dC53aWtpcGVkaWEub3JnJyxcbiAgJ2Zhd2lraSc6ICdmYS53aWtpcGVkaWEub3JnJyxcbiAgJ2Zhd2lrdGlvbmFyeSc6ICdmYS53aWt0aW9uYXJ5Lm9yZycsXG4gICdmYXdpa2lib29rcyc6ICdmYS53aWtpYm9va3Mub3JnJyxcbiAgJ2Zhd2lraW5ld3MnOiAnZmEud2lraW5ld3Mub3JnJyxcbiAgJ2Zhd2lraXF1b3RlJzogJ2ZhLndpa2lxdW90ZS5vcmcnLFxuICAnZmF3aWtpc291cmNlJzogJ2ZhLndpa2lzb3VyY2Uub3JnJyxcbiAgJ2Zhd2lraXZveWFnZSc6ICdmYS53aWtpdm95YWdlLm9yZycsXG4gICdmZndpa2knOiAnZmYud2lraXBlZGlhLm9yZycsXG4gICdmaXdpa2knOiAnZmkud2lraXBlZGlhLm9yZycsXG4gICdmaXdpa3Rpb25hcnknOiAnZmkud2lrdGlvbmFyeS5vcmcnLFxuICAnZml3aWtpYm9va3MnOiAnZmkud2lraWJvb2tzLm9yZycsXG4gICdmaXdpa2luZXdzJzogJ2ZpLndpa2luZXdzLm9yZycsXG4gICdmaXdpa2lxdW90ZSc6ICdmaS53aWtpcXVvdGUub3JnJyxcbiAgJ2Zpd2lraXNvdXJjZSc6ICdmaS53aWtpc291cmNlLm9yZycsXG4gICdmaXdpa2l2ZXJzaXR5JzogJ2ZpLndpa2l2ZXJzaXR5Lm9yZycsXG4gICdmaXVfdnJvd2lraSc6ICdmaXUtdnJvLndpa2lwZWRpYS5vcmcnLFxuICAnZmp3aWtpJzogJ2ZqLndpa2lwZWRpYS5vcmcnLFxuICAnZmp3aWt0aW9uYXJ5JzogJ2ZqLndpa3Rpb25hcnkub3JnJyxcbiAgJ2Zvd2lraSc6ICdmby53aWtpcGVkaWEub3JnJyxcbiAgJ2Zvd2lrdGlvbmFyeSc6ICdmby53aWt0aW9uYXJ5Lm9yZycsXG4gICdmb3dpa2lzb3VyY2UnOiAnZm8ud2lraXNvdXJjZS5vcmcnLFxuICAnZnJ3aWtpJzogJ2ZyLndpa2lwZWRpYS5vcmcnLFxuICAnZnJ3aWt0aW9uYXJ5JzogJ2ZyLndpa3Rpb25hcnkub3JnJyxcbiAgJ2Zyd2lraWJvb2tzJzogJ2ZyLndpa2lib29rcy5vcmcnLFxuICAnZnJ3aWtpbmV3cyc6ICdmci53aWtpbmV3cy5vcmcnLFxuICAnZnJ3aWtpcXVvdGUnOiAnZnIud2lraXF1b3RlLm9yZycsXG4gICdmcndpa2lzb3VyY2UnOiAnZnIud2lraXNvdXJjZS5vcmcnLFxuICAnZnJ3aWtpdmVyc2l0eSc6ICdmci53aWtpdmVyc2l0eS5vcmcnLFxuICAnZnJ3aWtpdm95YWdlJzogJ2ZyLndpa2l2b3lhZ2Uub3JnJyxcbiAgJ2ZycHdpa2knOiAnZnJwLndpa2lwZWRpYS5vcmcnLFxuICAnZnJyd2lraSc6ICdmcnIud2lraXBlZGlhLm9yZycsXG4gICdmdXJ3aWtpJzogJ2Z1ci53aWtpcGVkaWEub3JnJyxcbiAgJ2Z5d2lraSc6ICdmeS53aWtpcGVkaWEub3JnJyxcbiAgJ2Z5d2lrdGlvbmFyeSc6ICdmeS53aWt0aW9uYXJ5Lm9yZycsXG4gICdmeXdpa2lib29rcyc6ICdmeS53aWtpYm9va3Mub3JnJyxcbiAgJ2dhd2lraSc6ICdnYS53aWtpcGVkaWEub3JnJyxcbiAgJ2dhd2lrdGlvbmFyeSc6ICdnYS53aWt0aW9uYXJ5Lm9yZycsXG4gICdnYXdpa2lib29rcyc6ICdnYS53aWtpYm9va3Mub3JnJyxcbiAgJ2dhd2lraXF1b3RlJzogJ2dhLndpa2lxdW90ZS5vcmcnLFxuICAnZ2Fnd2lraSc6ICdnYWcud2lraXBlZGlhLm9yZycsXG4gICdnYW53aWtpJzogJ2dhbi53aWtpcGVkaWEub3JnJyxcbiAgJ2dkd2lraSc6ICdnZC53aWtpcGVkaWEub3JnJyxcbiAgJ2dkd2lrdGlvbmFyeSc6ICdnZC53aWt0aW9uYXJ5Lm9yZycsXG4gICdnbHdpa2knOiAnZ2wud2lraXBlZGlhLm9yZycsXG4gICdnbHdpa3Rpb25hcnknOiAnZ2wud2lrdGlvbmFyeS5vcmcnLFxuICAnZ2x3aWtpYm9va3MnOiAnZ2wud2lraWJvb2tzLm9yZycsXG4gICdnbHdpa2lxdW90ZSc6ICdnbC53aWtpcXVvdGUub3JnJyxcbiAgJ2dsd2lraXNvdXJjZSc6ICdnbC53aWtpc291cmNlLm9yZycsXG4gICdnbGt3aWtpJzogJ2dsay53aWtpcGVkaWEub3JnJyxcbiAgJ2dud2lraSc6ICdnbi53aWtpcGVkaWEub3JnJyxcbiAgJ2dud2lrdGlvbmFyeSc6ICdnbi53aWt0aW9uYXJ5Lm9yZycsXG4gICdnbndpa2lib29rcyc6ICdnbi53aWtpYm9va3Mub3JnJyxcbiAgJ2dvbXdpa2knOiAnZ29tLndpa2lwZWRpYS5vcmcnLFxuICAnZ290d2lraSc6ICdnb3Qud2lraXBlZGlhLm9yZycsXG4gICdnb3R3aWtpYm9va3MnOiAnZ290Lndpa2lib29rcy5vcmcnLFxuICAnZ3V3aWtpJzogJ2d1Lndpa2lwZWRpYS5vcmcnLFxuICAnZ3V3aWt0aW9uYXJ5JzogJ2d1Lndpa3Rpb25hcnkub3JnJyxcbiAgJ2d1d2lraWJvb2tzJzogJ2d1Lndpa2lib29rcy5vcmcnLFxuICAnZ3V3aWtpcXVvdGUnOiAnZ3Uud2lraXF1b3RlLm9yZycsXG4gICdndXdpa2lzb3VyY2UnOiAnZ3Uud2lraXNvdXJjZS5vcmcnLFxuICAnZ3Z3aWtpJzogJ2d2Lndpa2lwZWRpYS5vcmcnLFxuICAnZ3Z3aWt0aW9uYXJ5JzogJ2d2Lndpa3Rpb25hcnkub3JnJyxcbiAgJ2hhd2lraSc6ICdoYS53aWtpcGVkaWEub3JnJyxcbiAgJ2hhd2lrdGlvbmFyeSc6ICdoYS53aWt0aW9uYXJ5Lm9yZycsXG4gICdoYWt3aWtpJzogJ2hhay53aWtpcGVkaWEub3JnJyxcbiAgJ2hhd3dpa2knOiAnaGF3Lndpa2lwZWRpYS5vcmcnLFxuICAnaGV3aWtpJzogJ2hlLndpa2lwZWRpYS5vcmcnLFxuICAnaGV3aWt0aW9uYXJ5JzogJ2hlLndpa3Rpb25hcnkub3JnJyxcbiAgJ2hld2lraWJvb2tzJzogJ2hlLndpa2lib29rcy5vcmcnLFxuICAnaGV3aWtpbmV3cyc6ICdoZS53aWtpbmV3cy5vcmcnLFxuICAnaGV3aWtpcXVvdGUnOiAnaGUud2lraXF1b3RlLm9yZycsXG4gICdoZXdpa2lzb3VyY2UnOiAnaGUud2lraXNvdXJjZS5vcmcnLFxuICAnaGV3aWtpdm95YWdlJzogJ2hlLndpa2l2b3lhZ2Uub3JnJyxcbiAgJ2hpd2lraSc6ICdoaS53aWtpcGVkaWEub3JnJyxcbiAgJ2hpd2lrdGlvbmFyeSc6ICdoaS53aWt0aW9uYXJ5Lm9yZycsXG4gICdoaXdpa2lib29rcyc6ICdoaS53aWtpYm9va3Mub3JnJyxcbiAgJ2hpd2lraXF1b3RlJzogJ2hpLndpa2lxdW90ZS5vcmcnLFxuICAnaGlmd2lraSc6ICdoaWYud2lraXBlZGlhLm9yZycsXG4gICdob3dpa2knOiAnaG8ud2lraXBlZGlhLm9yZycsXG4gICdocndpa2knOiAnaHIud2lraXBlZGlhLm9yZycsXG4gICdocndpa3Rpb25hcnknOiAnaHIud2lrdGlvbmFyeS5vcmcnLFxuICAnaHJ3aWtpYm9va3MnOiAnaHIud2lraWJvb2tzLm9yZycsXG4gICdocndpa2lxdW90ZSc6ICdoci53aWtpcXVvdGUub3JnJyxcbiAgJ2hyd2lraXNvdXJjZSc6ICdoci53aWtpc291cmNlLm9yZycsXG4gICdoc2J3aWtpJzogJ2hzYi53aWtpcGVkaWEub3JnJyxcbiAgJ2hzYndpa3Rpb25hcnknOiAnaHNiLndpa3Rpb25hcnkub3JnJyxcbiAgJ2h0d2lraSc6ICdodC53aWtpcGVkaWEub3JnJyxcbiAgJ2h0d2lraXNvdXJjZSc6ICdodC53aWtpc291cmNlLm9yZycsXG4gICdodXdpa2knOiAnaHUud2lraXBlZGlhLm9yZycsXG4gICdodXdpa3Rpb25hcnknOiAnaHUud2lrdGlvbmFyeS5vcmcnLFxuICAnaHV3aWtpYm9va3MnOiAnaHUud2lraWJvb2tzLm9yZycsXG4gICdodXdpa2luZXdzJzogJ2h1Lndpa2luZXdzLm9yZycsXG4gICdodXdpa2lxdW90ZSc6ICdodS53aWtpcXVvdGUub3JnJyxcbiAgJ2h1d2lraXNvdXJjZSc6ICdodS53aWtpc291cmNlLm9yZycsXG4gICdoeXdpa2knOiAnaHkud2lraXBlZGlhLm9yZycsXG4gICdoeXdpa3Rpb25hcnknOiAnaHkud2lrdGlvbmFyeS5vcmcnLFxuICAnaHl3aWtpYm9va3MnOiAnaHkud2lraWJvb2tzLm9yZycsXG4gICdoeXdpa2lxdW90ZSc6ICdoeS53aWtpcXVvdGUub3JnJyxcbiAgJ2h5d2lraXNvdXJjZSc6ICdoeS53aWtpc291cmNlLm9yZycsXG4gICdoendpa2knOiAnaHoud2lraXBlZGlhLm9yZycsXG4gICdpYXdpa2knOiAnaWEud2lraXBlZGlhLm9yZycsXG4gICdpYXdpa3Rpb25hcnknOiAnaWEud2lrdGlvbmFyeS5vcmcnLFxuICAnaWF3aWtpYm9va3MnOiAnaWEud2lraWJvb2tzLm9yZycsXG4gICdpZHdpa2knOiAnaWQud2lraXBlZGlhLm9yZycsXG4gICdpZHdpa3Rpb25hcnknOiAnaWQud2lrdGlvbmFyeS5vcmcnLFxuICAnaWR3aWtpYm9va3MnOiAnaWQud2lraWJvb2tzLm9yZycsXG4gICdpZHdpa2lxdW90ZSc6ICdpZC53aWtpcXVvdGUub3JnJyxcbiAgJ2lkd2lraXNvdXJjZSc6ICdpZC53aWtpc291cmNlLm9yZycsXG4gICdpZXdpa2knOiAnaWUud2lraXBlZGlhLm9yZycsXG4gICdpZXdpa3Rpb25hcnknOiAnaWUud2lrdGlvbmFyeS5vcmcnLFxuICAnaWV3aWtpYm9va3MnOiAnaWUud2lraWJvb2tzLm9yZycsXG4gICdpZ3dpa2knOiAnaWcud2lraXBlZGlhLm9yZycsXG4gICdpaXdpa2knOiAnaWkud2lraXBlZGlhLm9yZycsXG4gICdpa3dpa2knOiAnaWsud2lraXBlZGlhLm9yZycsXG4gICdpa3dpa3Rpb25hcnknOiAnaWsud2lrdGlvbmFyeS5vcmcnLFxuICAnaWxvd2lraSc6ICdpbG8ud2lraXBlZGlhLm9yZycsXG4gICdpb3dpa2knOiAnaW8ud2lraXBlZGlhLm9yZycsXG4gICdpb3dpa3Rpb25hcnknOiAnaW8ud2lrdGlvbmFyeS5vcmcnLFxuICAnaXN3aWtpJzogJ2lzLndpa2lwZWRpYS5vcmcnLFxuICAnaXN3aWt0aW9uYXJ5JzogJ2lzLndpa3Rpb25hcnkub3JnJyxcbiAgJ2lzd2lraWJvb2tzJzogJ2lzLndpa2lib29rcy5vcmcnLFxuICAnaXN3aWtpcXVvdGUnOiAnaXMud2lraXF1b3RlLm9yZycsXG4gICdpc3dpa2lzb3VyY2UnOiAnaXMud2lraXNvdXJjZS5vcmcnLFxuICAnaXR3aWtpJzogJ2l0Lndpa2lwZWRpYS5vcmcnLFxuICAnaXR3aWt0aW9uYXJ5JzogJ2l0Lndpa3Rpb25hcnkub3JnJyxcbiAgJ2l0d2lraWJvb2tzJzogJ2l0Lndpa2lib29rcy5vcmcnLFxuICAnaXR3aWtpbmV3cyc6ICdpdC53aWtpbmV3cy5vcmcnLFxuICAnaXR3aWtpcXVvdGUnOiAnaXQud2lraXF1b3RlLm9yZycsXG4gICdpdHdpa2lzb3VyY2UnOiAnaXQud2lraXNvdXJjZS5vcmcnLFxuICAnaXR3aWtpdmVyc2l0eSc6ICdpdC53aWtpdmVyc2l0eS5vcmcnLFxuICAnaXR3aWtpdm95YWdlJzogJ2l0Lndpa2l2b3lhZ2Uub3JnJyxcbiAgJ2l1d2lraSc6ICdpdS53aWtpcGVkaWEub3JnJyxcbiAgJ2l1d2lrdGlvbmFyeSc6ICdpdS53aWt0aW9uYXJ5Lm9yZycsXG4gICdqYXdpa2knOiAnamEud2lraXBlZGlhLm9yZycsXG4gICdqYXdpa3Rpb25hcnknOiAnamEud2lrdGlvbmFyeS5vcmcnLFxuICAnamF3aWtpYm9va3MnOiAnamEud2lraWJvb2tzLm9yZycsXG4gICdqYXdpa2luZXdzJzogJ2phLndpa2luZXdzLm9yZycsXG4gICdqYXdpa2lxdW90ZSc6ICdqYS53aWtpcXVvdGUub3JnJyxcbiAgJ2phd2lraXNvdXJjZSc6ICdqYS53aWtpc291cmNlLm9yZycsXG4gICdqYXdpa2l2ZXJzaXR5JzogJ2phLndpa2l2ZXJzaXR5Lm9yZycsXG4gICdqYm93aWtpJzogJ2piby53aWtpcGVkaWEub3JnJyxcbiAgJ2pib3dpa3Rpb25hcnknOiAnamJvLndpa3Rpb25hcnkub3JnJyxcbiAgJ2p2d2lraSc6ICdqdi53aWtpcGVkaWEub3JnJyxcbiAgJ2p2d2lrdGlvbmFyeSc6ICdqdi53aWt0aW9uYXJ5Lm9yZycsXG4gICdrYXdpa2knOiAna2Eud2lraXBlZGlhLm9yZycsXG4gICdrYXdpa3Rpb25hcnknOiAna2Eud2lrdGlvbmFyeS5vcmcnLFxuICAna2F3aWtpYm9va3MnOiAna2Eud2lraWJvb2tzLm9yZycsXG4gICdrYXdpa2lxdW90ZSc6ICdrYS53aWtpcXVvdGUub3JnJyxcbiAgJ2thYXdpa2knOiAna2FhLndpa2lwZWRpYS5vcmcnLFxuICAna2Fid2lraSc6ICdrYWIud2lraXBlZGlhLm9yZycsXG4gICdrYmR3aWtpJzogJ2tiZC53aWtpcGVkaWEub3JnJyxcbiAgJ2tnd2lraSc6ICdrZy53aWtpcGVkaWEub3JnJyxcbiAgJ2tpd2lraSc6ICdraS53aWtpcGVkaWEub3JnJyxcbiAgJ2tqd2lraSc6ICdrai53aWtpcGVkaWEub3JnJyxcbiAgJ2trd2lraSc6ICdray53aWtpcGVkaWEub3JnJyxcbiAgJ2trd2lrdGlvbmFyeSc6ICdray53aWt0aW9uYXJ5Lm9yZycsXG4gICdra3dpa2lib29rcyc6ICdray53aWtpYm9va3Mub3JnJyxcbiAgJ2trd2lraXF1b3RlJzogJ2trLndpa2lxdW90ZS5vcmcnLFxuICAna2x3aWtpJzogJ2tsLndpa2lwZWRpYS5vcmcnLFxuICAna2x3aWt0aW9uYXJ5JzogJ2tsLndpa3Rpb25hcnkub3JnJyxcbiAgJ2ttd2lraSc6ICdrbS53aWtpcGVkaWEub3JnJyxcbiAgJ2ttd2lrdGlvbmFyeSc6ICdrbS53aWt0aW9uYXJ5Lm9yZycsXG4gICdrbXdpa2lib29rcyc6ICdrbS53aWtpYm9va3Mub3JnJyxcbiAgJ2tud2lraSc6ICdrbi53aWtpcGVkaWEub3JnJyxcbiAgJ2tud2lrdGlvbmFyeSc6ICdrbi53aWt0aW9uYXJ5Lm9yZycsXG4gICdrbndpa2lib29rcyc6ICdrbi53aWtpYm9va3Mub3JnJyxcbiAgJ2tud2lraXF1b3RlJzogJ2tuLndpa2lxdW90ZS5vcmcnLFxuICAna253aWtpc291cmNlJzogJ2tuLndpa2lzb3VyY2Uub3JnJyxcbiAgJ2tvd2lraSc6ICdrby53aWtpcGVkaWEub3JnJyxcbiAgJ2tvd2lrdGlvbmFyeSc6ICdrby53aWt0aW9uYXJ5Lm9yZycsXG4gICdrb3dpa2lib29rcyc6ICdrby53aWtpYm9va3Mub3JnJyxcbiAgJ2tvd2lraW5ld3MnOiAna28ud2lraW5ld3Mub3JnJyxcbiAgJ2tvd2lraXF1b3RlJzogJ2tvLndpa2lxdW90ZS5vcmcnLFxuICAna293aWtpc291cmNlJzogJ2tvLndpa2lzb3VyY2Uub3JnJyxcbiAgJ2tvd2lraXZlcnNpdHknOiAna28ud2lraXZlcnNpdHkub3JnJyxcbiAgJ2tvaXdpa2knOiAna29pLndpa2lwZWRpYS5vcmcnLFxuICAna3J3aWtpJzogJ2tyLndpa2lwZWRpYS5vcmcnLFxuICAna3J3aWtpcXVvdGUnOiAna3Iud2lraXF1b3RlLm9yZycsXG4gICdrcmN3aWtpJzogJ2tyYy53aWtpcGVkaWEub3JnJyxcbiAgJ2tzd2lraSc6ICdrcy53aWtpcGVkaWEub3JnJyxcbiAgJ2tzd2lrdGlvbmFyeSc6ICdrcy53aWt0aW9uYXJ5Lm9yZycsXG4gICdrc3dpa2lib29rcyc6ICdrcy53aWtpYm9va3Mub3JnJyxcbiAgJ2tzd2lraXF1b3RlJzogJ2tzLndpa2lxdW90ZS5vcmcnLFxuICAna3Nod2lraSc6ICdrc2gud2lraXBlZGlhLm9yZycsXG4gICdrdXdpa2knOiAna3Uud2lraXBlZGlhLm9yZycsXG4gICdrdXdpa3Rpb25hcnknOiAna3Uud2lrdGlvbmFyeS5vcmcnLFxuICAna3V3aWtpYm9va3MnOiAna3Uud2lraWJvb2tzLm9yZycsXG4gICdrdXdpa2lxdW90ZSc6ICdrdS53aWtpcXVvdGUub3JnJyxcbiAgJ2t2d2lraSc6ICdrdi53aWtpcGVkaWEub3JnJyxcbiAgJ2t3d2lraSc6ICdrdy53aWtpcGVkaWEub3JnJyxcbiAgJ2t3d2lrdGlvbmFyeSc6ICdrdy53aWt0aW9uYXJ5Lm9yZycsXG4gICdrd3dpa2lxdW90ZSc6ICdrdy53aWtpcXVvdGUub3JnJyxcbiAgJ2t5d2lraSc6ICdreS53aWtpcGVkaWEub3JnJyxcbiAgJ2t5d2lrdGlvbmFyeSc6ICdreS53aWt0aW9uYXJ5Lm9yZycsXG4gICdreXdpa2lib29rcyc6ICdreS53aWtpYm9va3Mub3JnJyxcbiAgJ2t5d2lraXF1b3RlJzogJ2t5Lndpa2lxdW90ZS5vcmcnLFxuICAnbGF3aWtpJzogJ2xhLndpa2lwZWRpYS5vcmcnLFxuICAnbGF3aWt0aW9uYXJ5JzogJ2xhLndpa3Rpb25hcnkub3JnJyxcbiAgJ2xhd2lraWJvb2tzJzogJ2xhLndpa2lib29rcy5vcmcnLFxuICAnbGF3aWtpcXVvdGUnOiAnbGEud2lraXF1b3RlLm9yZycsXG4gICdsYXdpa2lzb3VyY2UnOiAnbGEud2lraXNvdXJjZS5vcmcnLFxuICAnbGFkd2lraSc6ICdsYWQud2lraXBlZGlhLm9yZycsXG4gICdsYndpa2knOiAnbGIud2lraXBlZGlhLm9yZycsXG4gICdsYndpa3Rpb25hcnknOiAnbGIud2lrdGlvbmFyeS5vcmcnLFxuICAnbGJ3aWtpYm9va3MnOiAnbGIud2lraWJvb2tzLm9yZycsXG4gICdsYndpa2lxdW90ZSc6ICdsYi53aWtpcXVvdGUub3JnJyxcbiAgJ2xiZXdpa2knOiAnbGJlLndpa2lwZWRpYS5vcmcnLFxuICAnbGV6d2lraSc6ICdsZXoud2lraXBlZGlhLm9yZycsXG4gICdsZ3dpa2knOiAnbGcud2lraXBlZGlhLm9yZycsXG4gICdsaXdpa2knOiAnbGkud2lraXBlZGlhLm9yZycsXG4gICdsaXdpa3Rpb25hcnknOiAnbGkud2lrdGlvbmFyeS5vcmcnLFxuICAnbGl3aWtpYm9va3MnOiAnbGkud2lraWJvb2tzLm9yZycsXG4gICdsaXdpa2lxdW90ZSc6ICdsaS53aWtpcXVvdGUub3JnJyxcbiAgJ2xpd2lraXNvdXJjZSc6ICdsaS53aWtpc291cmNlLm9yZycsXG4gICdsaWp3aWtpJzogJ2xpai53aWtpcGVkaWEub3JnJyxcbiAgJ2xtb3dpa2knOiAnbG1vLndpa2lwZWRpYS5vcmcnLFxuICAnbG53aWtpJzogJ2xuLndpa2lwZWRpYS5vcmcnLFxuICAnbG53aWt0aW9uYXJ5JzogJ2xuLndpa3Rpb25hcnkub3JnJyxcbiAgJ2xud2lraWJvb2tzJzogJ2xuLndpa2lib29rcy5vcmcnLFxuICAnbG93aWtpJzogJ2xvLndpa2lwZWRpYS5vcmcnLFxuICAnbG93aWt0aW9uYXJ5JzogJ2xvLndpa3Rpb25hcnkub3JnJyxcbiAgJ2xyY3dpa2knOiAnbHJjLndpa2lwZWRpYS5vcmcnLFxuICAnbHR3aWtpJzogJ2x0Lndpa2lwZWRpYS5vcmcnLFxuICAnbHR3aWt0aW9uYXJ5JzogJ2x0Lndpa3Rpb25hcnkub3JnJyxcbiAgJ2x0d2lraWJvb2tzJzogJ2x0Lndpa2lib29rcy5vcmcnLFxuICAnbHR3aWtpcXVvdGUnOiAnbHQud2lraXF1b3RlLm9yZycsXG4gICdsdHdpa2lzb3VyY2UnOiAnbHQud2lraXNvdXJjZS5vcmcnLFxuICAnbHRnd2lraSc6ICdsdGcud2lraXBlZGlhLm9yZycsXG4gICdsdndpa2knOiAnbHYud2lraXBlZGlhLm9yZycsXG4gICdsdndpa3Rpb25hcnknOiAnbHYud2lrdGlvbmFyeS5vcmcnLFxuICAnbHZ3aWtpYm9va3MnOiAnbHYud2lraWJvb2tzLm9yZycsXG4gICdtYWl3aWtpJzogJ21haS53aWtpcGVkaWEub3JnJyxcbiAgJ21hcF9ibXN3aWtpJzogJ21hcC1ibXMud2lraXBlZGlhLm9yZycsXG4gICdtZGZ3aWtpJzogJ21kZi53aWtpcGVkaWEub3JnJyxcbiAgJ21nd2lraSc6ICdtZy53aWtpcGVkaWEub3JnJyxcbiAgJ21nd2lrdGlvbmFyeSc6ICdtZy53aWt0aW9uYXJ5Lm9yZycsXG4gICdtZ3dpa2lib29rcyc6ICdtZy53aWtpYm9va3Mub3JnJyxcbiAgJ21od2lraSc6ICdtaC53aWtpcGVkaWEub3JnJyxcbiAgJ21od2lrdGlvbmFyeSc6ICdtaC53aWt0aW9uYXJ5Lm9yZycsXG4gICdtaHJ3aWtpJzogJ21oci53aWtpcGVkaWEub3JnJyxcbiAgJ21pd2lraSc6ICdtaS53aWtpcGVkaWEub3JnJyxcbiAgJ21pd2lrdGlvbmFyeSc6ICdtaS53aWt0aW9uYXJ5Lm9yZycsXG4gICdtaXdpa2lib29rcyc6ICdtaS53aWtpYm9va3Mub3JnJyxcbiAgJ21pbndpa2knOiAnbWluLndpa2lwZWRpYS5vcmcnLFxuICAnbWt3aWtpJzogJ21rLndpa2lwZWRpYS5vcmcnLFxuICAnbWt3aWt0aW9uYXJ5JzogJ21rLndpa3Rpb25hcnkub3JnJyxcbiAgJ21rd2lraWJvb2tzJzogJ21rLndpa2lib29rcy5vcmcnLFxuICAnbWt3aWtpc291cmNlJzogJ21rLndpa2lzb3VyY2Uub3JnJyxcbiAgJ21sd2lraSc6ICdtbC53aWtpcGVkaWEub3JnJyxcbiAgJ21sd2lrdGlvbmFyeSc6ICdtbC53aWt0aW9uYXJ5Lm9yZycsXG4gICdtbHdpa2lib29rcyc6ICdtbC53aWtpYm9va3Mub3JnJyxcbiAgJ21sd2lraXF1b3RlJzogJ21sLndpa2lxdW90ZS5vcmcnLFxuICAnbWx3aWtpc291cmNlJzogJ21sLndpa2lzb3VyY2Uub3JnJyxcbiAgJ21ud2lraSc6ICdtbi53aWtpcGVkaWEub3JnJyxcbiAgJ21ud2lrdGlvbmFyeSc6ICdtbi53aWt0aW9uYXJ5Lm9yZycsXG4gICdtbndpa2lib29rcyc6ICdtbi53aWtpYm9va3Mub3JnJyxcbiAgJ21vd2lraSc6ICdtby53aWtpcGVkaWEub3JnJyxcbiAgJ21vd2lrdGlvbmFyeSc6ICdtby53aWt0aW9uYXJ5Lm9yZycsXG4gICdtcndpa2knOiAnbXIud2lraXBlZGlhLm9yZycsXG4gICdtcndpa3Rpb25hcnknOiAnbXIud2lrdGlvbmFyeS5vcmcnLFxuICAnbXJ3aWtpYm9va3MnOiAnbXIud2lraWJvb2tzLm9yZycsXG4gICdtcndpa2lxdW90ZSc6ICdtci53aWtpcXVvdGUub3JnJyxcbiAgJ21yd2lraXNvdXJjZSc6ICdtci53aWtpc291cmNlLm9yZycsXG4gICdtcmp3aWtpJzogJ21yai53aWtpcGVkaWEub3JnJyxcbiAgJ21zd2lraSc6ICdtcy53aWtpcGVkaWEub3JnJyxcbiAgJ21zd2lrdGlvbmFyeSc6ICdtcy53aWt0aW9uYXJ5Lm9yZycsXG4gICdtc3dpa2lib29rcyc6ICdtcy53aWtpYm9va3Mub3JnJyxcbiAgJ210d2lraSc6ICdtdC53aWtpcGVkaWEub3JnJyxcbiAgJ210d2lrdGlvbmFyeSc6ICdtdC53aWt0aW9uYXJ5Lm9yZycsXG4gICdtdXN3aWtpJzogJ211cy53aWtpcGVkaWEub3JnJyxcbiAgJ213bHdpa2knOiAnbXdsLndpa2lwZWRpYS5vcmcnLFxuICAnbXl3aWtpJzogJ215Lndpa2lwZWRpYS5vcmcnLFxuICAnbXl3aWt0aW9uYXJ5JzogJ215Lndpa3Rpb25hcnkub3JnJyxcbiAgJ215d2lraWJvb2tzJzogJ215Lndpa2lib29rcy5vcmcnLFxuICAnbXl2d2lraSc6ICdteXYud2lraXBlZGlhLm9yZycsXG4gICdtem53aWtpJzogJ216bi53aWtpcGVkaWEub3JnJyxcbiAgJ25hd2lraSc6ICduYS53aWtpcGVkaWEub3JnJyxcbiAgJ25hd2lrdGlvbmFyeSc6ICduYS53aWt0aW9uYXJ5Lm9yZycsXG4gICduYXdpa2lib29rcyc6ICduYS53aWtpYm9va3Mub3JnJyxcbiAgJ25hd2lraXF1b3RlJzogJ25hLndpa2lxdW90ZS5vcmcnLFxuICAnbmFod2lraSc6ICduYWgud2lraXBlZGlhLm9yZycsXG4gICduYWh3aWt0aW9uYXJ5JzogJ25haC53aWt0aW9uYXJ5Lm9yZycsXG4gICduYWh3aWtpYm9va3MnOiAnbmFoLndpa2lib29rcy5vcmcnLFxuICAnbmFwd2lraSc6ICduYXAud2lraXBlZGlhLm9yZycsXG4gICduZHN3aWtpJzogJ25kcy53aWtpcGVkaWEub3JnJyxcbiAgJ25kc3dpa3Rpb25hcnknOiAnbmRzLndpa3Rpb25hcnkub3JnJyxcbiAgJ25kc3dpa2lib29rcyc6ICduZHMud2lraWJvb2tzLm9yZycsXG4gICduZHN3aWtpcXVvdGUnOiAnbmRzLndpa2lxdW90ZS5vcmcnLFxuICAnbmRzX25sd2lraSc6ICduZHMtbmwud2lraXBlZGlhLm9yZycsXG4gICduZXdpa2knOiAnbmUud2lraXBlZGlhLm9yZycsXG4gICduZXdpa3Rpb25hcnknOiAnbmUud2lrdGlvbmFyeS5vcmcnLFxuICAnbmV3aWtpYm9va3MnOiAnbmUud2lraWJvb2tzLm9yZycsXG4gICduZXd3aWtpJzogJ25ldy53aWtpcGVkaWEub3JnJyxcbiAgJ25nd2lraSc6ICduZy53aWtpcGVkaWEub3JnJyxcbiAgJ25sd2lraSc6ICdubC53aWtpcGVkaWEub3JnJyxcbiAgJ25sd2lrdGlvbmFyeSc6ICdubC53aWt0aW9uYXJ5Lm9yZycsXG4gICdubHdpa2lib29rcyc6ICdubC53aWtpYm9va3Mub3JnJyxcbiAgJ25sd2lraW5ld3MnOiAnbmwud2lraW5ld3Mub3JnJyxcbiAgJ25sd2lraXF1b3RlJzogJ25sLndpa2lxdW90ZS5vcmcnLFxuICAnbmx3aWtpc291cmNlJzogJ25sLndpa2lzb3VyY2Uub3JnJyxcbiAgJ25sd2lraXZveWFnZSc6ICdubC53aWtpdm95YWdlLm9yZycsXG4gICdubndpa2knOiAnbm4ud2lraXBlZGlhLm9yZycsXG4gICdubndpa3Rpb25hcnknOiAnbm4ud2lrdGlvbmFyeS5vcmcnLFxuICAnbm53aWtpcXVvdGUnOiAnbm4ud2lraXF1b3RlLm9yZycsXG4gICdub3dpa2knOiAnbm8ud2lraXBlZGlhLm9yZycsXG4gICdub3dpa3Rpb25hcnknOiAnbm8ud2lrdGlvbmFyeS5vcmcnLFxuICAnbm93aWtpYm9va3MnOiAnbm8ud2lraWJvb2tzLm9yZycsXG4gICdub3dpa2luZXdzJzogJ25vLndpa2luZXdzLm9yZycsXG4gICdub3dpa2lxdW90ZSc6ICduby53aWtpcXVvdGUub3JnJyxcbiAgJ25vd2lraXNvdXJjZSc6ICduby53aWtpc291cmNlLm9yZycsXG4gICdub3Z3aWtpJzogJ25vdi53aWtpcGVkaWEub3JnJyxcbiAgJ25ybXdpa2knOiAnbnJtLndpa2lwZWRpYS5vcmcnLFxuICAnbnNvd2lraSc6ICduc28ud2lraXBlZGlhLm9yZycsXG4gICdudndpa2knOiAnbnYud2lraXBlZGlhLm9yZycsXG4gICdueXdpa2knOiAnbnkud2lraXBlZGlhLm9yZycsXG4gICdvY3dpa2knOiAnb2Mud2lraXBlZGlhLm9yZycsXG4gICdvY3dpa3Rpb25hcnknOiAnb2Mud2lrdGlvbmFyeS5vcmcnLFxuICAnb2N3aWtpYm9va3MnOiAnb2Mud2lraWJvb2tzLm9yZycsXG4gICdvbXdpa2knOiAnb20ud2lraXBlZGlhLm9yZycsXG4gICdvbXdpa3Rpb25hcnknOiAnb20ud2lrdGlvbmFyeS5vcmcnLFxuICAnb3J3aWtpJzogJ29yLndpa2lwZWRpYS5vcmcnLFxuICAnb3J3aWt0aW9uYXJ5JzogJ29yLndpa3Rpb25hcnkub3JnJyxcbiAgJ29yd2lraXNvdXJjZSc6ICdvci53aWtpc291cmNlLm9yZycsXG4gICdvc3dpa2knOiAnb3Mud2lraXBlZGlhLm9yZycsXG4gICdwYXdpa2knOiAncGEud2lraXBlZGlhLm9yZycsXG4gICdwYXdpa3Rpb25hcnknOiAncGEud2lrdGlvbmFyeS5vcmcnLFxuICAncGF3aWtpYm9va3MnOiAncGEud2lraWJvb2tzLm9yZycsXG4gICdwYWd3aWtpJzogJ3BhZy53aWtpcGVkaWEub3JnJyxcbiAgJ3BhbXdpa2knOiAncGFtLndpa2lwZWRpYS5vcmcnLFxuICAncGFwd2lraSc6ICdwYXAud2lraXBlZGlhLm9yZycsXG4gICdwY2R3aWtpJzogJ3BjZC53aWtpcGVkaWEub3JnJyxcbiAgJ3BkY3dpa2knOiAncGRjLndpa2lwZWRpYS5vcmcnLFxuICAncGZsd2lraSc6ICdwZmwud2lraXBlZGlhLm9yZycsXG4gICdwaXdpa2knOiAncGkud2lraXBlZGlhLm9yZycsXG4gICdwaXdpa3Rpb25hcnknOiAncGkud2lrdGlvbmFyeS5vcmcnLFxuICAncGlod2lraSc6ICdwaWgud2lraXBlZGlhLm9yZycsXG4gICdwbHdpa2knOiAncGwud2lraXBlZGlhLm9yZycsXG4gICdwbHdpa3Rpb25hcnknOiAncGwud2lrdGlvbmFyeS5vcmcnLFxuICAncGx3aWtpYm9va3MnOiAncGwud2lraWJvb2tzLm9yZycsXG4gICdwbHdpa2luZXdzJzogJ3BsLndpa2luZXdzLm9yZycsXG4gICdwbHdpa2lxdW90ZSc6ICdwbC53aWtpcXVvdGUub3JnJyxcbiAgJ3Bsd2lraXNvdXJjZSc6ICdwbC53aWtpc291cmNlLm9yZycsXG4gICdwbHdpa2l2b3lhZ2UnOiAncGwud2lraXZveWFnZS5vcmcnLFxuICAncG1zd2lraSc6ICdwbXMud2lraXBlZGlhLm9yZycsXG4gICdwbmJ3aWtpJzogJ3BuYi53aWtpcGVkaWEub3JnJyxcbiAgJ3BuYndpa3Rpb25hcnknOiAncG5iLndpa3Rpb25hcnkub3JnJyxcbiAgJ3BudHdpa2knOiAncG50Lndpa2lwZWRpYS5vcmcnLFxuICAncHN3aWtpJzogJ3BzLndpa2lwZWRpYS5vcmcnLFxuICAncHN3aWt0aW9uYXJ5JzogJ3BzLndpa3Rpb25hcnkub3JnJyxcbiAgJ3Bzd2lraWJvb2tzJzogJ3BzLndpa2lib29rcy5vcmcnLFxuICAncHR3aWtpJzogJ3B0Lndpa2lwZWRpYS5vcmcnLFxuICAncHR3aWt0aW9uYXJ5JzogJ3B0Lndpa3Rpb25hcnkub3JnJyxcbiAgJ3B0d2lraWJvb2tzJzogJ3B0Lndpa2lib29rcy5vcmcnLFxuICAncHR3aWtpbmV3cyc6ICdwdC53aWtpbmV3cy5vcmcnLFxuICAncHR3aWtpcXVvdGUnOiAncHQud2lraXF1b3RlLm9yZycsXG4gICdwdHdpa2lzb3VyY2UnOiAncHQud2lraXNvdXJjZS5vcmcnLFxuICAncHR3aWtpdmVyc2l0eSc6ICdwdC53aWtpdmVyc2l0eS5vcmcnLFxuICAncHR3aWtpdm95YWdlJzogJ3B0Lndpa2l2b3lhZ2Uub3JnJyxcbiAgJ3F1d2lraSc6ICdxdS53aWtpcGVkaWEub3JnJyxcbiAgJ3F1d2lrdGlvbmFyeSc6ICdxdS53aWt0aW9uYXJ5Lm9yZycsXG4gICdxdXdpa2lib29rcyc6ICdxdS53aWtpYm9va3Mub3JnJyxcbiAgJ3F1d2lraXF1b3RlJzogJ3F1Lndpa2lxdW90ZS5vcmcnLFxuICAncm13aWtpJzogJ3JtLndpa2lwZWRpYS5vcmcnLFxuICAncm13aWt0aW9uYXJ5JzogJ3JtLndpa3Rpb25hcnkub3JnJyxcbiAgJ3Jtd2lraWJvb2tzJzogJ3JtLndpa2lib29rcy5vcmcnLFxuICAncm15d2lraSc6ICdybXkud2lraXBlZGlhLm9yZycsXG4gICdybndpa2knOiAncm4ud2lraXBlZGlhLm9yZycsXG4gICdybndpa3Rpb25hcnknOiAncm4ud2lrdGlvbmFyeS5vcmcnLFxuICAncm93aWtpJzogJ3JvLndpa2lwZWRpYS5vcmcnLFxuICAncm93aWt0aW9uYXJ5JzogJ3JvLndpa3Rpb25hcnkub3JnJyxcbiAgJ3Jvd2lraWJvb2tzJzogJ3JvLndpa2lib29rcy5vcmcnLFxuICAncm93aWtpbmV3cyc6ICdyby53aWtpbmV3cy5vcmcnLFxuICAncm93aWtpcXVvdGUnOiAncm8ud2lraXF1b3RlLm9yZycsXG4gICdyb3dpa2lzb3VyY2UnOiAncm8ud2lraXNvdXJjZS5vcmcnLFxuICAncm93aWtpdm95YWdlJzogJ3JvLndpa2l2b3lhZ2Uub3JnJyxcbiAgJ3JvYV9ydXB3aWtpJzogJ3JvYS1ydXAud2lraXBlZGlhLm9yZycsXG4gICdyb2FfcnVwd2lrdGlvbmFyeSc6ICdyb2EtcnVwLndpa3Rpb25hcnkub3JnJyxcbiAgJ3JvYV90YXJhd2lraSc6ICdyb2EtdGFyYS53aWtpcGVkaWEub3JnJyxcbiAgJ3J1d2lraSc6ICdydS53aWtpcGVkaWEub3JnJyxcbiAgJ3J1d2lrdGlvbmFyeSc6ICdydS53aWt0aW9uYXJ5Lm9yZycsXG4gICdydXdpa2lib29rcyc6ICdydS53aWtpYm9va3Mub3JnJyxcbiAgJ3J1d2lraW5ld3MnOiAncnUud2lraW5ld3Mub3JnJyxcbiAgJ3J1d2lraXF1b3RlJzogJ3J1Lndpa2lxdW90ZS5vcmcnLFxuICAncnV3aWtpc291cmNlJzogJ3J1Lndpa2lzb3VyY2Uub3JnJyxcbiAgJ3J1d2lraXZlcnNpdHknOiAncnUud2lraXZlcnNpdHkub3JnJyxcbiAgJ3J1d2lraXZveWFnZSc6ICdydS53aWtpdm95YWdlLm9yZycsXG4gICdydWV3aWtpJzogJ3J1ZS53aWtpcGVkaWEub3JnJyxcbiAgJ3J3d2lraSc6ICdydy53aWtpcGVkaWEub3JnJyxcbiAgJ3J3d2lrdGlvbmFyeSc6ICdydy53aWt0aW9uYXJ5Lm9yZycsXG4gICdzYXdpa2knOiAnc2Eud2lraXBlZGlhLm9yZycsXG4gICdzYXdpa3Rpb25hcnknOiAnc2Eud2lrdGlvbmFyeS5vcmcnLFxuICAnc2F3aWtpYm9va3MnOiAnc2Eud2lraWJvb2tzLm9yZycsXG4gICdzYXdpa2lxdW90ZSc6ICdzYS53aWtpcXVvdGUub3JnJyxcbiAgJ3Nhd2lraXNvdXJjZSc6ICdzYS53aWtpc291cmNlLm9yZycsXG4gICdzYWh3aWtpJzogJ3NhaC53aWtpcGVkaWEub3JnJyxcbiAgJ3NhaHdpa2lzb3VyY2UnOiAnc2FoLndpa2lzb3VyY2Uub3JnJyxcbiAgJ3Njd2lraSc6ICdzYy53aWtpcGVkaWEub3JnJyxcbiAgJ3Njd2lrdGlvbmFyeSc6ICdzYy53aWt0aW9uYXJ5Lm9yZycsXG4gICdzY253aWtpJzogJ3Njbi53aWtpcGVkaWEub3JnJyxcbiAgJ3Njbndpa3Rpb25hcnknOiAnc2NuLndpa3Rpb25hcnkub3JnJyxcbiAgJ3Njb3dpa2knOiAnc2NvLndpa2lwZWRpYS5vcmcnLFxuICAnc2R3aWtpJzogJ3NkLndpa2lwZWRpYS5vcmcnLFxuICAnc2R3aWt0aW9uYXJ5JzogJ3NkLndpa3Rpb25hcnkub3JnJyxcbiAgJ3Nkd2lraW5ld3MnOiAnc2Qud2lraW5ld3Mub3JnJyxcbiAgJ3Nld2lraSc6ICdzZS53aWtpcGVkaWEub3JnJyxcbiAgJ3Nld2lraWJvb2tzJzogJ3NlLndpa2lib29rcy5vcmcnLFxuICAnc2d3aWtpJzogJ3NnLndpa2lwZWRpYS5vcmcnLFxuICAnc2d3aWt0aW9uYXJ5JzogJ3NnLndpa3Rpb25hcnkub3JnJyxcbiAgJ3Nod2lraSc6ICdzaC53aWtpcGVkaWEub3JnJyxcbiAgJ3Nod2lrdGlvbmFyeSc6ICdzaC53aWt0aW9uYXJ5Lm9yZycsXG4gICdzaXdpa2knOiAnc2kud2lraXBlZGlhLm9yZycsXG4gICdzaXdpa3Rpb25hcnknOiAnc2kud2lrdGlvbmFyeS5vcmcnLFxuICAnc2l3aWtpYm9va3MnOiAnc2kud2lraWJvb2tzLm9yZycsXG4gICdzaW1wbGV3aWtpJzogJ3NpbXBsZS53aWtpcGVkaWEub3JnJyxcbiAgJ3NpbXBsZXdpa3Rpb25hcnknOiAnc2ltcGxlLndpa3Rpb25hcnkub3JnJyxcbiAgJ3NpbXBsZXdpa2lib29rcyc6ICdzaW1wbGUud2lraWJvb2tzLm9yZycsXG4gICdzaW1wbGV3aWtpcXVvdGUnOiAnc2ltcGxlLndpa2lxdW90ZS5vcmcnLFxuICAnc2t3aWtpJzogJ3NrLndpa2lwZWRpYS5vcmcnLFxuICAnc2t3aWt0aW9uYXJ5JzogJ3NrLndpa3Rpb25hcnkub3JnJyxcbiAgJ3Nrd2lraWJvb2tzJzogJ3NrLndpa2lib29rcy5vcmcnLFxuICAnc2t3aWtpcXVvdGUnOiAnc2sud2lraXF1b3RlLm9yZycsXG4gICdza3dpa2lzb3VyY2UnOiAnc2sud2lraXNvdXJjZS5vcmcnLFxuICAnc2x3aWtpJzogJ3NsLndpa2lwZWRpYS5vcmcnLFxuICAnc2x3aWt0aW9uYXJ5JzogJ3NsLndpa3Rpb25hcnkub3JnJyxcbiAgJ3Nsd2lraWJvb2tzJzogJ3NsLndpa2lib29rcy5vcmcnLFxuICAnc2x3aWtpcXVvdGUnOiAnc2wud2lraXF1b3RlLm9yZycsXG4gICdzbHdpa2lzb3VyY2UnOiAnc2wud2lraXNvdXJjZS5vcmcnLFxuICAnc2x3aWtpdmVyc2l0eSc6ICdzbC53aWtpdmVyc2l0eS5vcmcnLFxuICAnc213aWtpJzogJ3NtLndpa2lwZWRpYS5vcmcnLFxuICAnc213aWt0aW9uYXJ5JzogJ3NtLndpa3Rpb25hcnkub3JnJyxcbiAgJ3Nud2lraSc6ICdzbi53aWtpcGVkaWEub3JnJyxcbiAgJ3Nud2lrdGlvbmFyeSc6ICdzbi53aWt0aW9uYXJ5Lm9yZycsXG4gICdzb3dpa2knOiAnc28ud2lraXBlZGlhLm9yZycsXG4gICdzb3dpa3Rpb25hcnknOiAnc28ud2lrdGlvbmFyeS5vcmcnLFxuICAnc3F3aWtpJzogJ3NxLndpa2lwZWRpYS5vcmcnLFxuICAnc3F3aWt0aW9uYXJ5JzogJ3NxLndpa3Rpb25hcnkub3JnJyxcbiAgJ3Nxd2lraWJvb2tzJzogJ3NxLndpa2lib29rcy5vcmcnLFxuICAnc3F3aWtpbmV3cyc6ICdzcS53aWtpbmV3cy5vcmcnLFxuICAnc3F3aWtpcXVvdGUnOiAnc3Eud2lraXF1b3RlLm9yZycsXG4gICdzcndpa2knOiAnc3Iud2lraXBlZGlhLm9yZycsXG4gICdzcndpa3Rpb25hcnknOiAnc3Iud2lrdGlvbmFyeS5vcmcnLFxuICAnc3J3aWtpYm9va3MnOiAnc3Iud2lraWJvb2tzLm9yZycsXG4gICdzcndpa2luZXdzJzogJ3NyLndpa2luZXdzLm9yZycsXG4gICdzcndpa2lxdW90ZSc6ICdzci53aWtpcXVvdGUub3JnJyxcbiAgJ3Nyd2lraXNvdXJjZSc6ICdzci53aWtpc291cmNlLm9yZycsXG4gICdzcm53aWtpJzogJ3Nybi53aWtpcGVkaWEub3JnJyxcbiAgJ3Nzd2lraSc6ICdzcy53aWtpcGVkaWEub3JnJyxcbiAgJ3Nzd2lrdGlvbmFyeSc6ICdzcy53aWt0aW9uYXJ5Lm9yZycsXG4gICdzdHdpa2knOiAnc3Qud2lraXBlZGlhLm9yZycsXG4gICdzdHdpa3Rpb25hcnknOiAnc3Qud2lrdGlvbmFyeS5vcmcnLFxuICAnc3Rxd2lraSc6ICdzdHEud2lraXBlZGlhLm9yZycsXG4gICdzdXdpa2knOiAnc3Uud2lraXBlZGlhLm9yZycsXG4gICdzdXdpa3Rpb25hcnknOiAnc3Uud2lrdGlvbmFyeS5vcmcnLFxuICAnc3V3aWtpYm9va3MnOiAnc3Uud2lraWJvb2tzLm9yZycsXG4gICdzdXdpa2lxdW90ZSc6ICdzdS53aWtpcXVvdGUub3JnJyxcbiAgJ3N2d2lraSc6ICdzdi53aWtpcGVkaWEub3JnJyxcbiAgJ3N2d2lrdGlvbmFyeSc6ICdzdi53aWt0aW9uYXJ5Lm9yZycsXG4gICdzdndpa2lib29rcyc6ICdzdi53aWtpYm9va3Mub3JnJyxcbiAgJ3N2d2lraW5ld3MnOiAnc3Yud2lraW5ld3Mub3JnJyxcbiAgJ3N2d2lraXF1b3RlJzogJ3N2Lndpa2lxdW90ZS5vcmcnLFxuICAnc3Z3aWtpc291cmNlJzogJ3N2Lndpa2lzb3VyY2Uub3JnJyxcbiAgJ3N2d2lraXZlcnNpdHknOiAnc3Yud2lraXZlcnNpdHkub3JnJyxcbiAgJ3N2d2lraXZveWFnZSc6ICdzdi53aWtpdm95YWdlLm9yZycsXG4gICdzd3dpa2knOiAnc3cud2lraXBlZGlhLm9yZycsXG4gICdzd3dpa3Rpb25hcnknOiAnc3cud2lrdGlvbmFyeS5vcmcnLFxuICAnc3d3aWtpYm9va3MnOiAnc3cud2lraWJvb2tzLm9yZycsXG4gICdzemx3aWtpJzogJ3N6bC53aWtpcGVkaWEub3JnJyxcbiAgJ3Rhd2lraSc6ICd0YS53aWtpcGVkaWEub3JnJyxcbiAgJ3Rhd2lrdGlvbmFyeSc6ICd0YS53aWt0aW9uYXJ5Lm9yZycsXG4gICd0YXdpa2lib29rcyc6ICd0YS53aWtpYm9va3Mub3JnJyxcbiAgJ3Rhd2lraW5ld3MnOiAndGEud2lraW5ld3Mub3JnJyxcbiAgJ3Rhd2lraXF1b3RlJzogJ3RhLndpa2lxdW90ZS5vcmcnLFxuICAndGF3aWtpc291cmNlJzogJ3RhLndpa2lzb3VyY2Uub3JnJyxcbiAgJ3Rld2lraSc6ICd0ZS53aWtpcGVkaWEub3JnJyxcbiAgJ3Rld2lrdGlvbmFyeSc6ICd0ZS53aWt0aW9uYXJ5Lm9yZycsXG4gICd0ZXdpa2lib29rcyc6ICd0ZS53aWtpYm9va3Mub3JnJyxcbiAgJ3Rld2lraXF1b3RlJzogJ3RlLndpa2lxdW90ZS5vcmcnLFxuICAndGV3aWtpc291cmNlJzogJ3RlLndpa2lzb3VyY2Uub3JnJyxcbiAgJ3RldHdpa2knOiAndGV0Lndpa2lwZWRpYS5vcmcnLFxuICAndGd3aWtpJzogJ3RnLndpa2lwZWRpYS5vcmcnLFxuICAndGd3aWt0aW9uYXJ5JzogJ3RnLndpa3Rpb25hcnkub3JnJyxcbiAgJ3Rnd2lraWJvb2tzJzogJ3RnLndpa2lib29rcy5vcmcnLFxuICAndGh3aWtpJzogJ3RoLndpa2lwZWRpYS5vcmcnLFxuICAndGh3aWt0aW9uYXJ5JzogJ3RoLndpa3Rpb25hcnkub3JnJyxcbiAgJ3Rod2lraWJvb2tzJzogJ3RoLndpa2lib29rcy5vcmcnLFxuICAndGh3aWtpbmV3cyc6ICd0aC53aWtpbmV3cy5vcmcnLFxuICAndGh3aWtpcXVvdGUnOiAndGgud2lraXF1b3RlLm9yZycsXG4gICd0aHdpa2lzb3VyY2UnOiAndGgud2lraXNvdXJjZS5vcmcnLFxuICAndGl3aWtpJzogJ3RpLndpa2lwZWRpYS5vcmcnLFxuICAndGl3aWt0aW9uYXJ5JzogJ3RpLndpa3Rpb25hcnkub3JnJyxcbiAgJ3Rrd2lraSc6ICd0ay53aWtpcGVkaWEub3JnJyxcbiAgJ3Rrd2lrdGlvbmFyeSc6ICd0ay53aWt0aW9uYXJ5Lm9yZycsXG4gICd0a3dpa2lib29rcyc6ICd0ay53aWtpYm9va3Mub3JnJyxcbiAgJ3Rrd2lraXF1b3RlJzogJ3RrLndpa2lxdW90ZS5vcmcnLFxuICAndGx3aWtpJzogJ3RsLndpa2lwZWRpYS5vcmcnLFxuICAndGx3aWt0aW9uYXJ5JzogJ3RsLndpa3Rpb25hcnkub3JnJyxcbiAgJ3Rsd2lraWJvb2tzJzogJ3RsLndpa2lib29rcy5vcmcnLFxuICAndG53aWtpJzogJ3RuLndpa2lwZWRpYS5vcmcnLFxuICAndG53aWt0aW9uYXJ5JzogJ3RuLndpa3Rpb25hcnkub3JnJyxcbiAgJ3Rvd2lraSc6ICd0by53aWtpcGVkaWEub3JnJyxcbiAgJ3Rvd2lrdGlvbmFyeSc6ICd0by53aWt0aW9uYXJ5Lm9yZycsXG4gICd0cGl3aWtpJzogJ3RwaS53aWtpcGVkaWEub3JnJyxcbiAgJ3RwaXdpa3Rpb25hcnknOiAndHBpLndpa3Rpb25hcnkub3JnJyxcbiAgJ3Ryd2lraSc6ICd0ci53aWtpcGVkaWEub3JnJyxcbiAgJ3Ryd2lrdGlvbmFyeSc6ICd0ci53aWt0aW9uYXJ5Lm9yZycsXG4gICd0cndpa2lib29rcyc6ICd0ci53aWtpYm9va3Mub3JnJyxcbiAgJ3Ryd2lraW5ld3MnOiAndHIud2lraW5ld3Mub3JnJyxcbiAgJ3Ryd2lraXF1b3RlJzogJ3RyLndpa2lxdW90ZS5vcmcnLFxuICAndHJ3aWtpc291cmNlJzogJ3RyLndpa2lzb3VyY2Uub3JnJyxcbiAgJ3Rzd2lraSc6ICd0cy53aWtpcGVkaWEub3JnJyxcbiAgJ3Rzd2lrdGlvbmFyeSc6ICd0cy53aWt0aW9uYXJ5Lm9yZycsXG4gICd0dHdpa2knOiAndHQud2lraXBlZGlhLm9yZycsXG4gICd0dHdpa3Rpb25hcnknOiAndHQud2lrdGlvbmFyeS5vcmcnLFxuICAndHR3aWtpYm9va3MnOiAndHQud2lraWJvb2tzLm9yZycsXG4gICd0dHdpa2lxdW90ZSc6ICd0dC53aWtpcXVvdGUub3JnJyxcbiAgJ3R1bXdpa2knOiAndHVtLndpa2lwZWRpYS5vcmcnLFxuICAndHd3aWtpJzogJ3R3Lndpa2lwZWRpYS5vcmcnLFxuICAndHd3aWt0aW9uYXJ5JzogJ3R3Lndpa3Rpb25hcnkub3JnJyxcbiAgJ3R5d2lraSc6ICd0eS53aWtpcGVkaWEub3JnJyxcbiAgJ3R5dndpa2knOiAndHl2Lndpa2lwZWRpYS5vcmcnLFxuICAndWRtd2lraSc6ICd1ZG0ud2lraXBlZGlhLm9yZycsXG4gICd1Z3dpa2knOiAndWcud2lraXBlZGlhLm9yZycsXG4gICd1Z3dpa3Rpb25hcnknOiAndWcud2lrdGlvbmFyeS5vcmcnLFxuICAndWd3aWtpYm9va3MnOiAndWcud2lraWJvb2tzLm9yZycsXG4gICd1Z3dpa2lxdW90ZSc6ICd1Zy53aWtpcXVvdGUub3JnJyxcbiAgJ3Vrd2lraSc6ICd1ay53aWtpcGVkaWEub3JnJyxcbiAgJ3Vrd2lrdGlvbmFyeSc6ICd1ay53aWt0aW9uYXJ5Lm9yZycsXG4gICd1a3dpa2lib29rcyc6ICd1ay53aWtpYm9va3Mub3JnJyxcbiAgJ3Vrd2lraW5ld3MnOiAndWsud2lraW5ld3Mub3JnJyxcbiAgJ3Vrd2lraXF1b3RlJzogJ3VrLndpa2lxdW90ZS5vcmcnLFxuICAndWt3aWtpc291cmNlJzogJ3VrLndpa2lzb3VyY2Uub3JnJyxcbiAgJ3Vrd2lraXZveWFnZSc6ICd1ay53aWtpdm95YWdlLm9yZycsXG4gICd1cndpa2knOiAndXIud2lraXBlZGlhLm9yZycsXG4gICd1cndpa3Rpb25hcnknOiAndXIud2lrdGlvbmFyeS5vcmcnLFxuICAndXJ3aWtpYm9va3MnOiAndXIud2lraWJvb2tzLm9yZycsXG4gICd1cndpa2lxdW90ZSc6ICd1ci53aWtpcXVvdGUub3JnJyxcbiAgJ3V6d2lraSc6ICd1ei53aWtpcGVkaWEub3JnJyxcbiAgJ3V6d2lrdGlvbmFyeSc6ICd1ei53aWt0aW9uYXJ5Lm9yZycsXG4gICd1endpa2lib29rcyc6ICd1ei53aWtpYm9va3Mub3JnJyxcbiAgJ3V6d2lraXF1b3RlJzogJ3V6Lndpa2lxdW90ZS5vcmcnLFxuICAndmV3aWtpJzogJ3ZlLndpa2lwZWRpYS5vcmcnLFxuICAndmVjd2lraSc6ICd2ZWMud2lraXBlZGlhLm9yZycsXG4gICd2ZWN3aWt0aW9uYXJ5JzogJ3ZlYy53aWt0aW9uYXJ5Lm9yZycsXG4gICd2ZWN3aWtpc291cmNlJzogJ3ZlYy53aWtpc291cmNlLm9yZycsXG4gICd2ZXB3aWtpJzogJ3ZlcC53aWtpcGVkaWEub3JnJyxcbiAgJ3Zpd2lraSc6ICd2aS53aWtpcGVkaWEub3JnJyxcbiAgJ3Zpd2lrdGlvbmFyeSc6ICd2aS53aWt0aW9uYXJ5Lm9yZycsXG4gICd2aXdpa2lib29rcyc6ICd2aS53aWtpYm9va3Mub3JnJyxcbiAgJ3Zpd2lraXF1b3RlJzogJ3ZpLndpa2lxdW90ZS5vcmcnLFxuICAndml3aWtpc291cmNlJzogJ3ZpLndpa2lzb3VyY2Uub3JnJyxcbiAgJ3Zpd2lraXZveWFnZSc6ICd2aS53aWtpdm95YWdlLm9yZycsXG4gICd2bHN3aWtpJzogJ3Zscy53aWtpcGVkaWEub3JnJyxcbiAgJ3Zvd2lraSc6ICd2by53aWtpcGVkaWEub3JnJyxcbiAgJ3Zvd2lrdGlvbmFyeSc6ICd2by53aWt0aW9uYXJ5Lm9yZycsXG4gICd2b3dpa2lib29rcyc6ICd2by53aWtpYm9va3Mub3JnJyxcbiAgJ3Zvd2lraXF1b3RlJzogJ3ZvLndpa2lxdW90ZS5vcmcnLFxuICAnd2F3aWtpJzogJ3dhLndpa2lwZWRpYS5vcmcnLFxuICAnd2F3aWt0aW9uYXJ5JzogJ3dhLndpa3Rpb25hcnkub3JnJyxcbiAgJ3dhd2lraWJvb2tzJzogJ3dhLndpa2lib29rcy5vcmcnLFxuICAnd2Fyd2lraSc6ICd3YXIud2lraXBlZGlhLm9yZycsXG4gICd3b3dpa2knOiAnd28ud2lraXBlZGlhLm9yZycsXG4gICd3b3dpa3Rpb25hcnknOiAnd28ud2lrdGlvbmFyeS5vcmcnLFxuICAnd293aWtpcXVvdGUnOiAnd28ud2lraXF1b3RlLm9yZycsXG4gICd3dXV3aWtpJzogJ3d1dS53aWtpcGVkaWEub3JnJyxcbiAgJ3hhbHdpa2knOiAneGFsLndpa2lwZWRpYS5vcmcnLFxuICAneGh3aWtpJzogJ3hoLndpa2lwZWRpYS5vcmcnLFxuICAneGh3aWt0aW9uYXJ5JzogJ3hoLndpa3Rpb25hcnkub3JnJyxcbiAgJ3hod2lraWJvb2tzJzogJ3hoLndpa2lib29rcy5vcmcnLFxuICAneG1md2lraSc6ICd4bWYud2lraXBlZGlhLm9yZycsXG4gICd5aXdpa2knOiAneWkud2lraXBlZGlhLm9yZycsXG4gICd5aXdpa3Rpb25hcnknOiAneWkud2lrdGlvbmFyeS5vcmcnLFxuICAneWl3aWtpc291cmNlJzogJ3lpLndpa2lzb3VyY2Uub3JnJyxcbiAgJ3lvd2lraSc6ICd5by53aWtpcGVkaWEub3JnJyxcbiAgJ3lvd2lrdGlvbmFyeSc6ICd5by53aWt0aW9uYXJ5Lm9yZycsXG4gICd5b3dpa2lib29rcyc6ICd5by53aWtpYm9va3Mub3JnJyxcbiAgJ3phd2lraSc6ICd6YS53aWtpcGVkaWEub3JnJyxcbiAgJ3phd2lrdGlvbmFyeSc6ICd6YS53aWt0aW9uYXJ5Lm9yZycsXG4gICd6YXdpa2lib29rcyc6ICd6YS53aWtpYm9va3Mub3JnJyxcbiAgJ3phd2lraXF1b3RlJzogJ3phLndpa2lxdW90ZS5vcmcnLFxuICAnemVhd2lraSc6ICd6ZWEud2lraXBlZGlhLm9yZycsXG4gICd6aHdpa2knOiAnemgud2lraXBlZGlhLm9yZycsXG4gICd6aHdpa3Rpb25hcnknOiAnemgud2lrdGlvbmFyeS5vcmcnLFxuICAnemh3aWtpYm9va3MnOiAnemgud2lraWJvb2tzLm9yZycsXG4gICd6aHdpa2luZXdzJzogJ3poLndpa2luZXdzLm9yZycsXG4gICd6aHdpa2lxdW90ZSc6ICd6aC53aWtpcXVvdGUub3JnJyxcbiAgJ3pod2lraXNvdXJjZSc6ICd6aC53aWtpc291cmNlLm9yZycsXG4gICd6aHdpa2l2b3lhZ2UnOiAnemgud2lraXZveWFnZS5vcmcnLFxuICAnemhfY2xhc3NpY2Fsd2lraSc6ICd6aC1jbGFzc2ljYWwud2lraXBlZGlhLm9yZycsXG4gICd6aF9taW5fbmFud2lraSc6ICd6aC1taW4tbmFuLndpa2lwZWRpYS5vcmcnLFxuICAnemhfbWluX25hbndpa3Rpb25hcnknOiAnemgtbWluLW5hbi53aWt0aW9uYXJ5Lm9yZycsXG4gICd6aF9taW5fbmFud2lraWJvb2tzJzogJ3poLW1pbi1uYW4ud2lraWJvb2tzLm9yZycsXG4gICd6aF9taW5fbmFud2lraXF1b3RlJzogJ3poLW1pbi1uYW4ud2lraXF1b3RlLm9yZycsXG4gICd6aF9taW5fbmFud2lraXNvdXJjZSc6ICd6aC1taW4tbmFuLndpa2lzb3VyY2Uub3JnJyxcbiAgJ3poX3l1ZXdpa2knOiAnemgteXVlLndpa2lwZWRpYS5vcmcnLFxuICAnenV3aWtpJzogJ3p1Lndpa2lwZWRpYS5vcmcnLFxuICAnenV3aWt0aW9uYXJ5JzogJ3p1Lndpa3Rpb25hcnkub3JnJyxcbiAgJ3p1d2lraWJvb2tzJzogJ3p1Lndpa2lib29rcy5vcmcnLFxuICAnYWR2aXNvcnl3aWtpJzogJ2Fkdmlzb3J5Lndpa2ltZWRpYS5vcmcnLFxuICAnYXJ3aWtpbWVkaWEnOiAnYXIud2lraW1lZGlhLm9yZycsXG4gICdhcmJjb21fZGV3aWtpJzogJ2FyYmNvbS1kZS53aWtpcGVkaWEub3JnJyxcbiAgJ2FyYmNvbV9lbndpa2knOiAnYXJiY29tLWVuLndpa2lwZWRpYS5vcmcnLFxuICAnYXJiY29tX2Zpd2lraSc6ICdhcmJjb20tZmkud2lraXBlZGlhLm9yZycsXG4gICdhcmJjb21fbmx3aWtpJzogJ2FyYmNvbS1ubC53aWtpcGVkaWEub3JnJyxcbiAgJ2F1ZGl0Y29td2lraSc6ICdhdWRpdGNvbS53aWtpbWVkaWEub3JnJyxcbiAgJ2Jkd2lraW1lZGlhJzogJ2JkLndpa2ltZWRpYS5vcmcnLFxuICAnYmV3aWtpbWVkaWEnOiAnYmUud2lraW1lZGlhLm9yZycsXG4gICdiZXRhd2lraXZlcnNpdHknOiAnYmV0YS53aWtpdmVyc2l0eS5vcmcnLFxuICAnYm9hcmR3aWtpJzogJ2JvYXJkLndpa2ltZWRpYS5vcmcnLFxuICAnYm9hcmRnb3Zjb213aWtpJzogJ2JvYXJkZ292Y29tLndpa2ltZWRpYS5vcmcnLFxuICAnYnJ3aWtpbWVkaWEnOiAnYnIud2lraW1lZGlhLm9yZycsXG4gICdjYXdpa2ltZWRpYSc6ICdjYS53aWtpbWVkaWEub3JnJyxcbiAgJ2NoYWlyd2lraSc6ICdjaGFpci53aWtpbWVkaWEub3JnJyxcbiAgJ2NoYXBjb213aWtpJzogJ2FmZmNvbS53aWtpbWVkaWEub3JnJyxcbiAgJ2NoZWNrdXNlcndpa2knOiAnY2hlY2t1c2VyLndpa2ltZWRpYS5vcmcnLFxuICAnY253aWtpbWVkaWEnOiAnY24ud2lraW1lZGlhLm9yZycsXG4gICdjb3dpa2ltZWRpYSc6ICdjby53aWtpbWVkaWEub3JnJyxcbiAgJ2NvbGxhYndpa2knOiAnY29sbGFiLndpa2ltZWRpYS5vcmcnLFxuICAnY29tbW9uc3dpa2knOiAnY29tbW9ucy53aWtpbWVkaWEub3JnJyxcbiAgJ2Rrd2lraW1lZGlhJzogJ2RrLndpa2ltZWRpYS5vcmcnLFxuICAnZG9uYXRld2lraSc6ICdkb25hdGUud2lraW1lZGlhLm9yZycsXG4gICdldHdpa2ltZWRpYSc6ICdlZS53aWtpbWVkaWEub3JnJyxcbiAgJ2V4ZWN3aWtpJzogJ2V4ZWMud2lraW1lZGlhLm9yZycsXG4gICdmZGN3aWtpJzogJ2ZkYy53aWtpbWVkaWEub3JnJyxcbiAgJ2Zpd2lraW1lZGlhJzogJ2ZpLndpa2ltZWRpYS5vcmcnLFxuICAnZm91bmRhdGlvbndpa2knOiAnd2lraW1lZGlhZm91bmRhdGlvbi5vcmcnLFxuICAnZ3JhbnRzd2lraSc6ICdncmFudHMud2lraW1lZGlhLm9yZycsXG4gICdpZWdjb213aWtpJzogJ2llZ2NvbS53aWtpbWVkaWEub3JnJyxcbiAgJ2lsd2lraW1lZGlhJzogJ2lsLndpa2ltZWRpYS5vcmcnLFxuICAnaW5jdWJhdG9yd2lraSc6ICdpbmN1YmF0b3Iud2lraW1lZGlhLm9yZycsXG4gICdpbnRlcm5hbHdpa2knOiAnaW50ZXJuYWwud2lraW1lZGlhLm9yZycsXG4gICdsYWJzd2lraSc6ICd3aWtpdGVjaC53aWtpbWVkaWEub3JnJyxcbiAgJ2xhYnRlc3R3aWtpJzogJ2xhYnRlc3R3aWtpdGVjaC53aWtpbWVkaWEub3JnJyxcbiAgJ2xlZ2FsdGVhbXdpa2knOiAnbGVnYWx0ZWFtLndpa2ltZWRpYS5vcmcnLFxuICAnbG9naW53aWtpJzogJ2xvZ2luLndpa2ltZWRpYS5vcmcnLFxuICAnbWVkaWF3aWtpd2lraSc6ICdtZWRpYXdpa2kub3JnJyxcbiAgJ21ldGF3aWtpJzogJ21ldGEud2lraW1lZGlhLm9yZycsXG4gICdta3dpa2ltZWRpYSc6ICdtay53aWtpbWVkaWEub3JnJyxcbiAgJ21vdmVtZW50cm9sZXN3aWtpJzogJ21vdmVtZW50cm9sZXMud2lraW1lZGlhLm9yZycsXG4gICdteHdpa2ltZWRpYSc6ICdteC53aWtpbWVkaWEub3JnJyxcbiAgJ25sd2lraW1lZGlhJzogJ25sLndpa2ltZWRpYS5vcmcnLFxuICAnbm93aWtpbWVkaWEnOiAnbm8ud2lraW1lZGlhLm9yZycsXG4gICdub2JvYXJkX2NoYXB0ZXJzd2lraW1lZGlhJzogJ25vYm9hcmQtY2hhcHRlcnMud2lraW1lZGlhLm9yZycsXG4gICdub3N0YWxnaWF3aWtpJzogJ25vc3RhbGdpYS53aWtpcGVkaWEub3JnJyxcbiAgJ255Y3dpa2ltZWRpYSc6ICdueWMud2lraW1lZGlhLm9yZycsXG4gICduendpa2ltZWRpYSc6ICduei53aWtpbWVkaWEub3JnJyxcbiAgJ29mZmljZXdpa2knOiAnb2ZmaWNlLndpa2ltZWRpYS5vcmcnLFxuICAnb21idWRzbWVud2lraSc6ICdvbWJ1ZHNtZW4ud2lraW1lZGlhLm9yZycsXG4gICdvdHJzX3dpa2l3aWtpJzogJ290cnMtd2lraS53aWtpbWVkaWEub3JnJyxcbiAgJ291dHJlYWNod2lraSc6ICdvdXRyZWFjaC53aWtpbWVkaWEub3JnJyxcbiAgJ3BhX3Vzd2lraW1lZGlhJzogJ3BhLXVzLndpa2ltZWRpYS5vcmcnLFxuICAncGx3aWtpbWVkaWEnOiAncGwud2lraW1lZGlhLm9yZycsXG4gICdxdWFsaXR5d2lraSc6ICdxdWFsaXR5Lndpa2ltZWRpYS5vcmcnLFxuICAncnN3aWtpbWVkaWEnOiAncnMud2lraW1lZGlhLm9yZycsXG4gICdydXdpa2ltZWRpYSc6ICdydS53aWtpbWVkaWEub3JnJyxcbiAgJ3Nld2lraW1lZGlhJzogJ3NlLndpa2ltZWRpYS5vcmcnLFxuICAnc2VhcmNoY29td2lraSc6ICdzZWFyY2hjb20ud2lraW1lZGlhLm9yZycsXG4gICdzb3VyY2Vzd2lraSc6ICd3aWtpc291cmNlLm9yZycsXG4gICdzcGNvbXdpa2knOiAnc3Bjb20ud2lraW1lZGlhLm9yZycsXG4gICdzcGVjaWVzd2lraSc6ICdzcGVjaWVzLndpa2ltZWRpYS5vcmcnLFxuICAnc3Rld2FyZHdpa2knOiAnc3Rld2FyZC53aWtpbWVkaWEub3JnJyxcbiAgJ3N0cmF0ZWd5d2lraSc6ICdzdHJhdGVneS53aWtpbWVkaWEub3JnJyxcbiAgJ3Rlbndpa2knOiAndGVuLndpa2lwZWRpYS5vcmcnLFxuICAndGVzdHdpa2knOiAndGVzdC53aWtpcGVkaWEub3JnJyxcbiAgJ3Rlc3Qyd2lraSc6ICd0ZXN0Mi53aWtpcGVkaWEub3JnJyxcbiAgJ3Rlc3R3aWtpZGF0YXdpa2knOiAndGVzdC53aWtpZGF0YS5vcmcnLFxuICAndHJ3aWtpbWVkaWEnOiAndHIud2lraW1lZGlhLm9yZycsXG4gICd0cmFuc2l0aW9udGVhbXdpa2knOiAndHJhbnNpdGlvbnRlYW0ud2lraW1lZGlhLm9yZycsXG4gICd1YXdpa2ltZWRpYSc6ICd1YS53aWtpbWVkaWEub3JnJyxcbiAgJ3Vrd2lraW1lZGlhJzogJ3VrLndpa2ltZWRpYS5vcmcnLFxuICAndXNhYmlsaXR5d2lraSc6ICd1c2FiaWxpdHkud2lraW1lZGlhLm9yZycsXG4gICd2b3Rld2lraSc6ICd2b3RlLndpa2ltZWRpYS5vcmcnLFxuICAnd2dfZW53aWtpJzogJ3dnLWVuLndpa2lwZWRpYS5vcmcnLFxuICAnd2lraWRhdGF3aWtpJzogJ3dpa2lkYXRhLm9yZycsXG4gICd3aWtpbWFuaWEyMDA1d2lraSc6ICd3aWtpbWFuaWEyMDA1Lndpa2ltZWRpYS5vcmcnLFxuICAnd2lraW1hbmlhMjAwNndpa2knOiAnd2lraW1hbmlhMjAwNi53aWtpbWVkaWEub3JnJyxcbiAgJ3dpa2ltYW5pYTIwMDd3aWtpJzogJ3dpa2ltYW5pYTIwMDcud2lraW1lZGlhLm9yZycsXG4gICd3aWtpbWFuaWEyMDA4d2lraSc6ICd3aWtpbWFuaWEyMDA4Lndpa2ltZWRpYS5vcmcnLFxuICAnd2lraW1hbmlhMjAwOXdpa2knOiAnd2lraW1hbmlhMjAwOS53aWtpbWVkaWEub3JnJyxcbiAgJ3dpa2ltYW5pYTIwMTB3aWtpJzogJ3dpa2ltYW5pYTIwMTAud2lraW1lZGlhLm9yZycsXG4gICd3aWtpbWFuaWEyMDExd2lraSc6ICd3aWtpbWFuaWEyMDExLndpa2ltZWRpYS5vcmcnLFxuICAnd2lraW1hbmlhMjAxMndpa2knOiAnd2lraW1hbmlhMjAxMi53aWtpbWVkaWEub3JnJyxcbiAgJ3dpa2ltYW5pYTIwMTN3aWtpJzogJ3dpa2ltYW5pYTIwMTMud2lraW1lZGlhLm9yZycsXG4gICd3aWtpbWFuaWEyMDE0d2lraSc6ICd3aWtpbWFuaWEyMDE0Lndpa2ltZWRpYS5vcmcnLFxuICAnd2lraW1hbmlhMjAxNXdpa2knOiAnd2lraW1hbmlhMjAxNS53aWtpbWVkaWEub3JnJyxcbiAgJ3dpa2ltYW5pYTIwMTZ3aWtpJzogJ3dpa2ltYW5pYTIwMTYud2lraW1lZGlhLm9yZycsXG4gICd3aWtpbWFuaWEyMDE3d2lraSc6ICd3aWtpbWFuaWEyMDE3Lndpa2ltZWRpYS5vcmcnLFxuICAnd2lraW1hbmlhdGVhbXdpa2knOiAnd2lraW1hbmlhdGVhbS53aWtpbWVkaWEub3JnJyxcbiAgJ3plcm93aWtpJzogJ3plcm8ud2lraW1lZGlhLm9yZydcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gc2l0ZU1hcDtcbiJdfQ==
