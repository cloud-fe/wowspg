define("common/lib/wowspg/declare",["require","exports"],function(e,t){var n;return function(e){e.win=window,e.$=e.win.jQuery,e.win.wow={},e.promise=function(){if(e.win.when)return e.win.wow.promise=e.win.when,e.win.wow.promise;if(e.$&&e.$.Deferred){var t=function(){var t=e.$.Deferred();return t.promise=t.promise(),t};return e.win.wow.promise={defer:t},e.win.wow.promise}}(),e.selector=function(){if(e.win.Sizzle)return e.win.wow.selector=e.win.Sizzle,e.win.wow.selector;if(e.$)return e.win.wow.selector=e.$,e.win.wow.promise}(),e.eventTrigger=function(){if(e.win.$)return e.win.wow.eventTrigger=function(t,n,r){e.$(t).trigger(n,r)}}()}(n||(n={})),n}),define("common/lib/wowspg/utils",["require","exports","./declare"],function(e,t,n){var r=n.win,i;(function(t){function n(e,t,n){e.addEventListener?e.addEventListener(t,n,!1):e.attachEvent&&e.attachEvent("on"+t,n)}function i(e){e&&e.preventDefault?e.preventDefault():window.event.returnValue=!1}function s(e,t){for(var n=0,r=e.length;n<r;n++)if(t(e[n],n)===!1)break}function o(e,t){for(var n in e)if(e.hasOwnProperty(n)&&t(e[n],n)===!1)break}function u(){}function a(){var e=r.wow.promise.defer();return e.resolve(),e.promise}function f(e){if(!e||typeof e!="string")return null;if(r.JSON&&r.JSON.parse)return r.JSON.parse(e);if(/^[\],:{}\s]*$/.test(e.replace(/\\(?:["\\\/bfnrt]|u[\da-fA-F]{4})/g,"@").replace(/"[^"\\\r\n]*"|true|false|null|-?(?:\d\d*\.|)\d+(?:[eE][\-+]?\d+|)/g,"]").replace(/(?:^|:|,)(?:\s*\[)+/g,"")))return(new Function("return "+e))();throw new Error("Invalid JSON: "+e)}function l(){var e=[];for(var t=0;t<arguments.length;t++)e[t-0]=arguments[t];var n={};return s(e,function(e){typeof e=="object"&&o(e,function(e,t){n[t]=e})}),n}function c(t){var n=r.wow.promise.defer();return e(t,function(){var e=[];for(var t=0;t<arguments.length;t++)e[t-0]=arguments[t];n.resolve(e)},function(e){n.reject(e)}),n.promise}function h(e){return e===void 0&&(e=""),"wowId"+e+(new Date).getTime()}t.addEventListener=n,t.eventPreventDefault=i,t.arrayForEach=s,t.objForIn=o,t.fnEmpty=u,t.fnThenEmpty=a,t.parseJson=f,t.objExtend=l,t._require=c,t.generateRandomId=h})(i=t.lang||(t.lang={}));var s;(function(e){function t(e,t){var n;return e.indexOf(t)>-1?n=e.replace(t,""):!/^(http|https|ftp):\/\//.test(e)&&!/^#/.test(e)&&!/javascript:/.test(e)&&(n=e),n}function n(e){var t=new RegExp(e),n=[];if(e==="/")t=/^\/(\?[^#]*)?$/;else{var r="";/^\//.test(e)&&(r="^"+r),/\/$/.test(e)?r+=e.replace(/\/$/,"/?(\\?[^#]*)?$"):r+=e,r=r.replace(/\(:([^\)]+)\)/g,function(e,t){return n.push(t),"([^\\)/?#]+)"}),t=new RegExp(r)}return t}function r(e){if(!/\?/.test(e))return{};var e=e.replace(/[^?]*\?/,""),t=e.split("&"),n={};return i.arrayForEach(t,function(e,t){var r=e.split("=");r.length===2&&(n[r[0]]=r[1])}),n}e.getRenderUrl=t,e.getRenderReg=n,e.getUrlParams=r})(s=t.cus||(t.cus={}));var o;(function(e){e.supportHistory=!!history.pushState})(o=t.flag||(t.flag={}))}),define("common/lib/wowspg/RenderOption",["require","exports"],function(e,t){var n=function(){function e(e,t,n,r,i,s,o,u,a){e===void 0&&(e=location.protocol+"//"+location.host),t===void 0&&(t=30),n===void 0&&(n=!0),r===void 0&&(r="all"),i===void 0&&(i=function(){}),this.baseUrl=e,this.timeout=t,this.supportHistory=n,this.type=r==="hash"?"hash":"all",this.loader=i,this.url=s,this.promise=o,this.selector=u,this.eventTrigger=a}return e.prototype.getBaseUrl=function(){return this.baseUrl},e.prototype.getTimeout=function(){return this.timeout},e.prototype.geUrl=function(){return this.url},e.prototype.getType=function(){return this.type},e.prototype.getSupportHistory=function(){return this.supportHistory},e.prototype.getLoader=function(){return this.loader},e.prototype.getPromise=function(){return this.promise},e.prototype.getSelector=function(){return this.selector},e.prototype.getEventTrigger=function(){return this.eventTrigger},e}();return n}),define("common/lib/wowspg/Config",["require","exports","./RenderOption"],function(e,t,n){var r=function(){function e(){}return e.setRouterConfig=function(t){e.routerConfig=t},e.setOption=function(t){e.option=new n(t.baseUrl,t.timeout,t.supportHistory,t.type,t.loader,t.url,t.promise,t.selector,t.eventTrigger)},e.getOption=function(){return e.option},e.getRouterConfig=function(){return e.routerConfig},e}();return r}),define("common/lib/wowspg/UrlListener",["require","exports","./utils","./Config"],function(e,t,n,r){function i(e){n.lang.addEventListener(window,"popstate",function(t){var n=history.state;if(!n||!n._id)return;e(n._id)})}function s(e){n.lang.addEventListener(window,"hashchange",function(t){e()})}var o=function(){function e(){}return e.linkListener=function(e){var t=document.body,i=r.getOption();n.lang.addEventListener(t,"click",function(t){var r=t.target||t.srcElement;if(r&&r.nodeType===1&&r.nodeName.toLocaleLowerCase()==="a"){var s=r.getAttribute("target");if(s==="_blank")return;var o=r.getAttribute("href");if(typeof o=="undefined")return;var u=n.cus.getRenderUrl(o,i.getBaseUrl());typeof u!="undefined"&&(n.lang.eventPreventDefault(t),e(u))}})},e.historyListener=function(){return n.flag.supportHistory?i:s}(),e}();return o}),define("common/lib/wowspg/Error",["require","exports","./utils"],function(e,t,n){(function(e){e[e.CONFIG_ERROR=101]="CONFIG_ERROR",e[e.TIMEOUT_ERROR=202]="TIMEOUT_ERROR",e[e.BLOCK_ERROR=303]="BLOCK_ERROR",e[e.BLOCK_SELECTOR_IS_EMPTY=310]="BLOCK_SELECTOR_IS_EMPTY",e[e.BLOCK_DEPENDS_BLOCK_NOT_READY=311]="BLOCK_DEPENDS_BLOCK_NOT_READY",e[e.BLOCK_CONTAINER_NOT_EXIST=311]="BLOCK_CONTAINER_NOT_EXIST",e[e.PAGE_NOT_FOUND=404]="PAGE_NOT_FOUND",e[e.RUNTIME_ERROR=505]="RUNTIME_ERROR",e[e.RESOURCE_LOAD_ERROR=606]="RESOURCE_LOAD_ERROR",e[e.RESOURCE_DATASOURCE_LOAD_FAIL=610]="RESOURCE_DATASOURCE_LOAD_FAIL"})(t.ErrorType||(t.ErrorType={}));var r=t.ErrorType,i=function(){function e(e,t){this.code=e,this.message=t}return e.prototype.getCode=function(){return this.code},e.prototype.getMessage=function(){return this.message},e}();t.ErrorInfo=i;var s=function(){function e(){}return e.getError=function(e){var t;return n.lang.arrayForEach(this.ErrorList,function(n,r){if(n.code===e)return t=n,!1}),t},e.trigger=function(e){n.lang.arrayForEach(this.ErrorList,function(t,n){if(t.code===e)throw new Error(t.message)})},e.ErrorList=[new i(101,"Config is error!"),new i(202,"Page load timeout!"),new i(303,"Block render error!"),new i(310,"Block's selector is empty!"),new i(311,"The blocks depend on is not rendered!"),new i(311,"The block's container is not exist!"),new i(404,"Page is not found!"),new i(505,"Error found in page code!"),new i(606,"Resouce load unsuccessful!"),new i(610,"Data source load unsuccessful!")],e}();t.ErrorController=s}),define("common/lib/wowspg/History",["require","exports"],function(e,t){var n=function(){function e(e,t,n,r){this._id=e,this.url=t,this.title=n,this.data=r}return e.prototype.addBlockData=function(e,t){this.data[e]=t},e.prototype.getId=function(){return this._id},e.prototype.getData=function(){return this.data},e.prototype.getTitle=function(){return this.title},e.prototype.getUrl=function(){return this.url},e}();return n}),define("common/lib/wowspg/HistoryStack",["require","exports","./History","./utils","./Config","./declare"],function(e,t,n,r,i,s){var o=s.win,u=function(){function e(){}return e.generateHistory=function(t,s,o){var u=i.getOption(),a=r.cus.getRenderUrl(t,u.getBaseUrl()),f=r.lang.generateRandomId("His"),l=new n(f,a,s,o);return e.currentHistory=l,e.allHis[f]=l,l},e.push=function(t,n,r){var i=e.generateHistory(t,n,r);history.pushState({_id:i.getId()},i.getTitle(),i.getUrl())},e.replace=function(t,n,r){e.currentHistory&&delete e.allHis[e.currentHistory.getId()];var i=e.generateHistory(t,n,r);history.replaceState({_id:i.getId()},i.getTitle(),i.getUrl())},e.getHistory=function(t){return e.allHis[t]?e.allHis[t]:null},e.getCurrentHistory=function(){return e.currentHistory},e.setCurrentHistory=function(t){e.currentHistory=t},e.allHis={},e.currentHistory=null,e}();return u}),define("common/lib/wowspg/DSGetter",["require","exports","./utils","./declare"],function(e,t,n,r){var i=r.win,s=function(){function e(e){this.url=e}return e.prototype.getXhr=function(){if(this.xhr)return this.xhr;try{return i.ActiveXObject?this.xhr=new i.ActiveXObject("Microsoft.XMLHTTP"):this.xhr=new i.XMLHttpRequest}catch(e){}},e.prototype.callback=function(){var e=i.wow.promise.defer();if(o.cancelTime>this.sendTime)return e.promise;var t=this.xhr;try{if(t.readyState===4){var r=t.status,s=t.responseText;r?r===1223&&(r=204):r=s?200:404;if(r>=200&&r<300){var u=n.lang.parseJson(s);e.resolve(u)}else e.reject(t)}else e.reject(t)}catch(a){e.reject(t)}return e.promise},e.prototype.send=function(){var e=i.wow.promise.defer(),t=this,n=t.getXhr(),r=t.callback;return t.sendTime=(new Date).getTime(),t.sendTime<o.cancelTime?(e.reject(),e.promise):(n.open("GET",t.url,!0),n.send(),n.readyState===4?setTimeout(function(){t.callback().done(function(t){e.resolve(t)})},0):n.onreadystatechange=function(){t.callback().done(function(t){e.resolve(t)})},e.promise)},e}(),o=function(){function e(){}return e.get=function(e){var t=new s(e);return t.send()},e.cancelAll=function(){e.cancelTime=(new Date).getTime()},e.cancelTime=0,e}();return o}),define("common/lib/wowspg/Block",["require","exports","./utils","./HistoryStack","./DSGetter","./Error","./declare"],function(e,t,n,r,i,s,o){var u=o.win,a=s.ErrorType,f=s.ErrorController,l=function(){function e(e,t,n,r,i,s,o,u,a,f,l){t===void 0&&(t=null),n===void 0&&(n=null),r===void 0&&(r=null),i===void 0&&(i=""),s===void 0&&(s=[]),o===void 0&&(o=[]),u===void 0&&(u=[]),a===void 0&&(a=[]),f===void 0&&(f=[]),l===void 0&&(l=[]),this.name=e,this.selector=t,this.tpl=n,this.ds=r,this.dt=i,this.css=s,this.startHandlers=o,this.readyHandlers=u,this.usableHandlers=a,this.childrenBlocks=f,this.depsBlocks=l,this.nextBlocks=[],this.wrapper=document.body,this.rendered=!1,this.dsReady=!1,this.renderData={}}return e.prototype.initBlockHandlers=function(e){var t=this;n.lang.arrayForEach(e,function(e){e.init&&e.init(t.container,t.renderData)})},e.prototype.renderStart=function(e,t){t===void 0&&(t={});var i=this,s=r.getCurrentHistory(),o=s.getUrl();if(!i.dsReady||!e.length)return;var u=[],a=0,f=e[a++],l;i.dt&&(l=e[a++]);if(i.startHandlers.length)for(var c=e.length;a<c;a++)u.push(e[a]);l&&typeof l=="function"&&(i.ds=l(i.ds)),i.renderData={data:i.ds,urlkeys:t,params:n.cus.getUrlParams(o),location:location,title:document.title};var h=f(i.renderData);i.container.innerHTML=h,i.initBlockHandlers(u)},e.prototype.render=function(e,t){var s=u.wow.promise.defer(),o=this,a=o.name,l=r.getCurrentHistory(),c=l.getData();o.wrapper=e;if(!o.selector)s.reject(f.getError(310));else{var h=u.wow.selector(o.selector,o.wrapper);if(h&&h[0]){o.container=h[0];var p=!1;o.depsBlocks.length&&n.lang.arrayForEach(o.depsBlocks,function(e,t){if(!e.isRendered())return s.reject(f.getError(311)),p=!0,!1});if(!p&&(o.tpl||o.tpl==="")){var d=[];c&&c[a]?(o.ds=c[a],o.dsReady=!0,o.renderStart(d)):typeof o.ds=="string"?(o.ds=o.ds.replace(/\{([^\{\}]+)\}/g,function(e,r){if(t&&t[r])return t[r];var i=l.getUrl(),s=n.cus.getUrlParams(i);return i&&s&&s[r]?s[r]:u.wow.data&&u.wow.data[r]?u.wow.data[r]:""}),i.get(o.ds).done(function(e){o.ds=e,o.dsReady=!0,o.renderStart(d)},function(){s.reject(f.getError(610))})):o.dsReady=!0;var v=[o.tpl];o.dt&&v.push(o.dt),v=v.concat(o.startHandlers),o.css&&n.lang.arrayForEach(o.css,function(e,t){v.push("css!"+e)}),n.lang._require(v).then(function(e){o.renderStart(e),d=e,o.rendered=!0,s.resolve()}).then(function(e){return n.lang._require(o.readyHandlers)}).then(function(e){o.initBlockHandlers(e),s.resolve()}).then(function(e){return n.lang._require(o.usableHandlers)}).then(function(e){o.initBlockHandlers(e),s.resolve()},function(e){s.reject(e)})}else s.resolve(),o.rendered=!0}else s.reject(f.getError(311))}return s.promise},e.prototype.equal=function(e){var t=this.ds,r=e.ds,i=!1;return this.tpl===e.tpl&&(typeof r=="string"&&r===t?i=!0:typeof r=="object"&&typeof t=="object"&&(i=!0,n.lang.objForIn(r,function(e,n){if(e!=t[name])return i=!1,!1}),n.lang.objForIn(t,function(e,t){if(e!=r[name])return i=!1,!1}))),i},e.prototype.destroy=function(){var e=u.wow.promise.defer();return this.rendered=!1,this.dsReady=!1,e.promise},e.prototype.setDepsBlocks=function(e){this.depsBlocks=e},e.prototype.setNextBlocks=function(e){this.nextBlocks=e},e.prototype.setChildrenBlocks=function(e){this.childrenBlocks=e},e.prototype.setRendered=function(e){this.rendered=e},e.prototype.mergeOtherBlock=function(e){if(this.name!==e.getName())return;this.selector=e.getSelector()||this.selector,this.tpl=e.getTpl()||this.tpl,this.ds=e.getDs()||this.ds,this.dt=e.getDt()||this.dt,this.css=e.getCss()||this.css,this.startHandlers=e.getStartHandlers()||this.startHandlers,this.readyHandlers=e.getReadyHandlers()||this.readyHandlers,this.usableHandlers=e.getUsableHandlers()||this.usableHandlers,this.childrenBlocks=e.getChildrenBlocks()||this.childrenBlocks},e.prototype.getName=function(){return this.name},e.prototype.getSelector=function(){return this.selector},e.prototype.getTpl=function(){return this.tpl},e.prototype.getDs=function(){return this.ds},e.prototype.getDt=function(){return this.dt},e.prototype.getCss=function(){return this.css},e.prototype.getStartHandlers=function(){return this.startHandlers},e.prototype.getReadyHandlers=function(){return this.readyHandlers},e.prototype.getUsableHandlers=function(){return this.usableHandlers},e.prototype.getChildrenBlocks=function(){return this.childrenBlocks},e.prototype.getDepsBlocks=function(){return this.depsBlocks},e.prototype.getNextBlocks=function(){return this.nextBlocks},e.prototype.getConteiner=function(){return this.container},e.prototype.isRendered=function(){return this.rendered},e}();return l}),define("common/lib/wowspg/Router",["require","exports","./Block","./utils"],function(e,t,n,r){var i=function(){function e(e,t,n,i){n===void 0&&(n=[]),i===void 0&&(i=[]);var s=this;s.urlReg=r.cus.getRenderReg(e),s.title=t,s.setBlocks(n),s.setChildrenRouters(i),s.urlKeys=[]}return e.prototype.setChildrenRouters=function(t){var n=this;t&&typeof t.length=="undefined"?(n.childrenRouters=[],r.lang.objForIn(t,function(t,r){typeof t=="string"?n.childrenRouters.push(new e(r,null,t)):n.childrenRouters.push(new e(r,null,t.block,t.router))})):n.childrenRouters=t},e.prototype.setBlocks=function(e){var t=this;e&&typeof e.length=="undefined"?(t.blocks=[],r.lang.objForIn(e,function(e,i){var s=e.handler||{},o=[],u=[];e.block&&r.lang.objForIn(e.block,function(e,t){var r=e.handler||{};o.push(new n(t,e.selector,e.tpl,e.ds,e.dt,e.css,r.start,r.ready,r.usable))}),e.deps&&r.lang.arrayForEach(e.deps,function(e){u.push(new n(e))}),t.blocks.push(new n(i,e.selector,e.tpl,e.ds,e.dt,e.css,s.start,s.ready,s.usable,o,u))}),r.lang.arrayForEach(t.blocks,function(e){var n=e.getDepsBlocks(),i=[];r.lang.arrayForEach(n,function(n){var s=n.getName();r.lang.arrayForEach(t.blocks,function(t){if(t.getName()===s){i.push(t);var n=t.getNextBlocks();return n.push(e),t.setNextBlocks(n),!1}})}),e.setDepsBlocks(i)})):t.blocks=e||[]},e.prototype.getTitle=function(){return this.title},e.prototype.getUrlReg=function(){return this.urlReg},e.prototype.getBlocks=function(){return this.blocks},e.prototype.getChildrenNods=function(){return this.childrenRouters},e.prototype.getUrlKeys=function(){return this.urlKeys},e.prototype.equal=function(e){return e.getUrlReg()===this.urlReg&&e.getBlocks()===this.blocks?!0:!1},e}();return i}),define("common/lib/wowspg/Tree",["require","exports","./utils","./declare"],function(e,t,n,r){var i=r.win,s=function(){function e(e){this.rootNode=e}return e.prototype.dfTraversalNode=function(e,t){var r=i.wow.promise.defer(),s=t(e),o=this;if(s===!1)r.resolve();else if(s===!0)r.resolve();else{var u=s;u.then||(u=n.lang.fnThenEmpty()),u.then(function(){var i=e.getChildrenNods(),s=i.length;if(!i||!s)r.resolve();else{var u=1;n.lang.arrayForEach(i,function(e,n){o.dfTraversalNode(e,t).done(function(){++u>s&&r.resolve()})})}})}return r.promise},e.prototype.traversal=function(e){return this.dfTraversalNode(this.rootNode,e)},e}();return s}),define("common/lib/wowspg/RouterMatcher",["require","exports","./Router","./Error","./utils","./Tree","./declare"],function(e,t,n,r,i,s,o){var u=o.win,a=r.ErrorType,f=r.ErrorController,l=function(){function e(e){this.routerConf=e,this.routerConf=this.fixRouterConf(),this.routerParams={},this.currentRouterPath=[]}return e.prototype.fixRouterConf=function(){var e=this.routerConf,t=0;i.lang.objForIn(e,function(e,n){e&&(e.block||e.router)&&t++});if(t)return e;r.ErrorController.trigger(101)},e.prototype.routerMatch=function(e){var t=u.wow.promise.defer(),r=this;r.currentRouterPath=[];var o=1,a=0;return i.lang.objForIn(r.routerConf,function(f,l){var c=new n(l,f.title,f.block,f.router),h=new s(c),p;a++,h.traversal(function(t){var n=u.wow.promise.defer(),s=t.getUrlReg(),o=s.exec(e);if(!o||typeof o[0]=="undefined")return!0;if(p){if(!p.equal(t))return!0;p=null}else{var a=t.getChildrenNods();i.lang.arrayForEach(a,function(t){var n=t.getUrlReg(),r=n.exec(e);r&&typeof r[0]!="undefined"&&(p=t)});if(!p&&a.length)return!0}r.currentRouterPath.push(t);var f=t.getUrlKeys();return i.lang.arrayForEach(f,function(e,t){r.routerParams[e]=o[t+1]}),typeof t.blocks=="string"?i.lang._require([t.blocks]).then(function(e){var r=e[0];t.setBlocks(r.block),t.setChildrenRouters(r.router),n.resolve()}):n.resolve(),n.promise}).done(function(){++o>a&&t.resolve()})}),t.promise},e.prototype.findBlockByName=function(e,t){t===void 0&&(t=1);var n=0,r=null,s=this.currentRouterPath;for(var o=t,u=s.length;o<u;o++){var a=s[o],f=a.getBlocks();i.lang.arrayForEach(f,function(t,i){t.getName()===e&&(n=i,r=t)})}return{depth:n,block:r}},e.prototype.matchBlockTree=function(e,t){t===void 0&&(t=1);var n=this,r=n.findBlockByName(e.getName(),t),s=r.block,o=r.depth||t;s&&e.mergeOtherBlock(s);var u=e.getChildrenBlocks();return i.lang.arrayForEach(u,function(e){n.matchBlockTree(e,o)}),e},e.prototype.match=function(e){var t=u.wow.promise.defer(),n=this,r=[];return n.routerMatch(e).done(function(){var e=n.currentRouterPath;e.length?(r=e[0].getBlocks(),i.lang.arrayForEach(r,function(e,t){r[t]=n.matchBlockTree(e)}),t.resolve(r)):t.reject(f.getError(404))}),t.promise},e.prototype.getRouterParams=function(){return this.routerParams},e.prototype.getRouterTitle=function(){var e=this,t=document.title;return i.lang.arrayForEach(e.currentRouterPath,function(e){var n=e.getTitle();n&&(t=n)}),t},e}();return l}),define("common/lib/wowspg/Render",["require","exports","./utils","./Error","./declare"],function(e,t,n,r,i){var s=i.win,o=r.ErrorType,u=r.ErrorController,a=function(){function e(){}return e.destroyBlock=function(t){t.destroy();var r=t.getChildrenBlocks();n.lang.arrayForEach(r,function(t){e.destroyBlock(t)})},e.renderBlock=function(t,r,i){var o=s.wow.promise.defer(),a,f=null,l=t.getName();n.lang.arrayForEach(e.lastRenderBlocks,function(e){if(l===e.getName()){f=e;if(t.equal(e))return a=n.lang.fnThenEmpty(),t.setRendered(!0),!1}});if(!a||!a.then)a=t.render(r,i),f&&f.isRendered()&&e.destroyBlock(f);return a.then(function(){e.currentRenderBlocks.push(t);var s=t.getChildrenBlocks(),a=s.length,f=1,l=[];n.lang.arrayForEach(s,function(n){e.renderBlock(n,t.getConteiner(),i).then(function(){++f>a&&(l.length?o.reject(u.getError(303),l):o.resolve())},function(){l.push(n.getName()),++f>a&&o.reject(u.getError(303),l)})}),s.length||o.resolve();var c=t.getNextBlocks();n.lang.arrayForEach(c,function(t){e.renderBlock(t,r,i)})},function(e){o.reject(e)}),o.promise},e.page=function(t,r){var i=s.wow.promise.defer(),o=1,a=t.length,f=[];return e.lastRenderBlocks=e.currentRenderBlocks,e.currentRenderBlocks=[],n.lang.arrayForEach(t,function(t){e.renderBlock(t,document.body,r).then(function(){++o>a&&(f.length?i.reject(u.getError(303),f):i.resolve())},function(){f.push(t.getName()),++o>a&&i.reject(u.getError(303),f)})}),i.promise},e.lastRenderBlocks=[],e.currentRenderBlocks=[],e}();return a}),define("common/lib/wowspg/main",["require","exports","./declare","./UrlListener","./Error","./utils","./RouterMatcher","./Render","./HistoryStack","./Config"],function(e,t,n,r,i,s,o,u,a,f){var l=n.win,c;return function(e){function t(e,t){if(!e){i.ErrorController.trigger(101);return}f.setOption(t),f.setRouterConfig(e);var n=f.getOption().getPromise(),c=f.getOption().getSelector(),h=f.getOption().getEventTrigger();n&&(l.wow.promise=n),c&&(l.wow.selector=c),h&&(l.wow.eventTrigger=h);var p=f.getOption(),d=f.getRouterConfig(),v=new o(d),m=s.cus.getRenderUrl(location.href,p.getBaseUrl());if(!m)return;v.match(m).then(function(e){a.replace(m,v.getRouterTitle(),{}),u.page(e,v.getRouterParams()).then(function(){l.wow.eventTrigger(l,"wow.page.change",{his:a.getCurrentHistory(),url:m})},function(e){l.wow.eventTrigger(l,"wow.page.change",{error:e,url:m})})},function(e){l.wow.eventTrigger(l,"wow.page.change",{error:e,url:m})}),r.linkListener(function(e){v.match(e).then(function(t){a.push(e,v.getRouterTitle(),{}),u.page(t,v.getRouterParams()).then(function(){l.wow.eventTrigger(l,"wow.page.change",{his:a.getCurrentHistory(),url:e})},function(t){l.wow.eventTrigger(l,"wow.page.change",{error:t,url:e})})},function(t){l.wow.eventTrigger(l,"wow.page.change",{error:t,url:e})})}),r.historyListener(function(e){var t=a.getHistory(e);if(t){a.setCurrentHistory(t);var n=t.getUrl();v.match(n).then(function(e){u.page(e,v.getRouterParams()).then(function(){l.wow.eventTrigger(l,"wow.page.change",{his:a.getCurrentHistory(),url:n})},function(e){l.wow.eventTrigger(l,"wow.page.change",{error:e,url:n})})},function(e){l.wow.eventTrigger(l,"wow.page.change",{error:e,url:n})})}})}function n(e,t){l.wow=l.wow||{},l.wow.data=l.wow.data||{},l.wow.data[e]=t}e.init=t,e.define=n}(c||(c={})),c});