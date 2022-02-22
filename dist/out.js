(()=>{var Lt=Object.create;var Oe=Object.defineProperty;var Rt=Object.getOwnPropertyDescriptor;var Nt=Object.getOwnPropertyNames;var At=Object.getPrototypeOf,Bt=Object.prototype.hasOwnProperty;var Mt=i=>Oe(i,"__esModule",{value:!0});var ce=(i=>typeof require!="undefined"?require:typeof Proxy!="undefined"?new Proxy(i,{get:(s,g)=>(typeof require!="undefined"?require:s)[g]}):i)(function(i){if(typeof require!="undefined")return require.apply(this,arguments);throw new Error('Dynamic require of "'+i+'" is not supported')});var Pt=(i,s)=>()=>(s||i((s={exports:{}}).exports,s),s.exports);var Ct=(i,s,g,y)=>{if(s&&typeof s=="object"||typeof s=="function")for(let w of Nt(s))!Bt.call(i,w)&&(g||w!=="default")&&Oe(i,w,{get:()=>s[w],enumerable:!(y=Rt(s,w))||y.enumerable});return i},Dt=(i,s)=>Ct(Mt(Oe(i!=null?Lt(At(i)):{},"default",!s&&i&&i.__esModule?{get:()=>i.default,enumerable:!0}:{value:i,enumerable:!0})),i);var dr=Pt((lr,Ue)=>{(function(i){if(typeof lr=="object"&&typeof Ue<"u")Ue.exports=i();else if(typeof define=="function"&&define.amd)define([],i);else{var s;typeof window<"u"?s=window:typeof global<"u"?s=global:typeof self<"u"?s=self:s=this,s.localforage=i()}})(function(){var i,s,g;return function y(w,M,I){function W(k,K){if(!M[k]){if(!w[k]){var p=typeof ce=="function"&&ce;if(!K&&p)return p(k,!0);if(x)return x(k,!0);var b=new Error("Cannot find module '"+k+"'");throw b.code="MODULE_NOT_FOUND",b}var C=M[k]={exports:{}};w[k][0].call(C.exports,function(U){var V=w[k][1][U];return W(V||U)},C,C.exports,y,w,M,I)}return M[k].exports}for(var x=typeof ce=="function"&&ce,O=0;O<I.length;O++)W(I[O]);return W}({1:[function(y,w,M){(function(I){"use strict";var W=I.MutationObserver||I.WebKitMutationObserver,x;if(W){var O=0,k=new W(U),K=I.document.createTextNode("");k.observe(K,{characterData:!0}),x=function(){K.data=O=++O%2}}else if(!I.setImmediate&&typeof I.MessageChannel<"u"){var p=new I.MessageChannel;p.port1.onmessage=U,x=function(){p.port2.postMessage(0)}}else"document"in I&&"onreadystatechange"in I.document.createElement("script")?x=function(){var F=I.document.createElement("script");F.onreadystatechange=function(){U(),F.onreadystatechange=null,F.parentNode.removeChild(F),F=null},I.document.documentElement.appendChild(F)}:x=function(){setTimeout(U,0)};var b,C=[];function U(){b=!0;for(var F,Q,$=C.length;$;){for(Q=C,C=[],F=-1;++F<$;)Q[F]();$=C.length}b=!1}w.exports=V;function V(F){C.push(F)===1&&!b&&x()}}).call(this,typeof global<"u"?global:typeof self<"u"?self:typeof window<"u"?window:{})},{}],2:[function(y,w,M){"use strict";var I=y(1);function W(){}var x={},O=["REJECTED"],k=["FULFILLED"],K=["PENDING"];w.exports=p;function p(m){if(typeof m!="function")throw new TypeError("resolver must be a function");this.state=K,this.queue=[],this.outcome=void 0,m!==W&&V(this,m)}p.prototype.catch=function(m){return this.then(null,m)},p.prototype.then=function(m,L){if(typeof m!="function"&&this.state===k||typeof L!="function"&&this.state===O)return this;var E=new this.constructor(W);if(this.state!==K){var A=this.state===k?m:L;C(E,A,this.outcome)}else this.queue.push(new b(E,m,L));return E};function b(m,L,E){this.promise=m,typeof L=="function"&&(this.onFulfilled=L,this.callFulfilled=this.otherCallFulfilled),typeof E=="function"&&(this.onRejected=E,this.callRejected=this.otherCallRejected)}b.prototype.callFulfilled=function(m){x.resolve(this.promise,m)},b.prototype.otherCallFulfilled=function(m){C(this.promise,this.onFulfilled,m)},b.prototype.callRejected=function(m){x.reject(this.promise,m)},b.prototype.otherCallRejected=function(m){C(this.promise,this.onRejected,m)};function C(m,L,E){I(function(){var A;try{A=L(E)}catch(H){return x.reject(m,H)}A===m?x.reject(m,new TypeError("Cannot resolve promise with itself")):x.resolve(m,A)})}x.resolve=function(m,L){var E=F(U,L);if(E.status==="error")return x.reject(m,E.value);var A=E.value;if(A)V(m,A);else{m.state=k,m.outcome=L;for(var H=-1,Y=m.queue.length;++H<Y;)m.queue[H].callFulfilled(L)}return m},x.reject=function(m,L){m.state=O,m.outcome=L;for(var E=-1,A=m.queue.length;++E<A;)m.queue[E].callRejected(L);return m};function U(m){var L=m&&m.then;if(m&&(typeof m=="object"||typeof m=="function")&&typeof L=="function")return function(){L.apply(m,arguments)}}function V(m,L){var E=!1;function A(z){E||(E=!0,x.reject(m,z))}function H(z){E||(E=!0,x.resolve(m,z))}function Y(){L(H,A)}var X=F(Y);X.status==="error"&&A(X.value)}function F(m,L){var E={};try{E.value=m(L),E.status="success"}catch(A){E.status="error",E.value=A}return E}p.resolve=Q;function Q(m){return m instanceof this?m:x.resolve(new this(W),m)}p.reject=$;function $(m){var L=new this(W);return x.reject(L,m)}p.all=Ie;function Ie(m){var L=this;if(Object.prototype.toString.call(m)!=="[object Array]")return this.reject(new TypeError("must be an array"));var E=m.length,A=!1;if(!E)return this.resolve([]);for(var H=new Array(E),Y=0,X=-1,z=new this(W);++X<E;)J(m[X],X);return z;function J(fe,he){L.resolve(fe).then(Te,function(te){A||(A=!0,x.reject(z,te))});function Te(te){H[he]=te,++Y===E&&!A&&(A=!0,x.resolve(z,H))}}}p.race=re;function re(m){var L=this;if(Object.prototype.toString.call(m)!=="[object Array]")return this.reject(new TypeError("must be an array"));var E=m.length,A=!1;if(!E)return this.resolve([]);for(var H=-1,Y=new this(W);++H<E;)X(m[H]);return Y;function X(z){L.resolve(z).then(function(J){A||(A=!0,x.resolve(Y,J))},function(J){A||(A=!0,x.reject(Y,J))})}}},{"1":1}],3:[function(y,w,M){(function(I){"use strict";typeof I.Promise!="function"&&(I.Promise=y(2))}).call(this,typeof global<"u"?global:typeof self<"u"?self:typeof window<"u"?window:{})},{"2":2}],4:[function(y,w,M){"use strict";var I=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(e){return typeof e}:function(e){return e&&typeof Symbol=="function"&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e};function W(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function x(){try{if(typeof indexedDB<"u")return indexedDB;if(typeof webkitIndexedDB<"u")return webkitIndexedDB;if(typeof mozIndexedDB<"u")return mozIndexedDB;if(typeof OIndexedDB<"u")return OIndexedDB;if(typeof msIndexedDB<"u")return msIndexedDB}catch(e){return}}var O=x();function k(){try{if(!O||!O.open)return!1;var e=typeof openDatabase<"u"&&/(Safari|iPhone|iPad|iPod)/.test(navigator.userAgent)&&!/Chrome/.test(navigator.userAgent)&&!/BlackBerry/.test(navigator.platform),t=typeof fetch=="function"&&fetch.toString().indexOf("[native code")!==-1;return(!e||t)&&typeof indexedDB<"u"&&typeof IDBKeyRange<"u"}catch(r){return!1}}function K(e,t){e=e||[],t=t||{};try{return new Blob(e,t)}catch(n){if(n.name!=="TypeError")throw n;for(var r=typeof BlobBuilder<"u"?BlobBuilder:typeof MSBlobBuilder<"u"?MSBlobBuilder:typeof MozBlobBuilder<"u"?MozBlobBuilder:WebKitBlobBuilder,o=new r,a=0;a<e.length;a+=1)o.append(e[a]);return o.getBlob(t.type)}}typeof Promise>"u"&&y(3);var p=Promise;function b(e,t){t&&e.then(function(r){t(null,r)},function(r){t(r)})}function C(e,t,r){typeof t=="function"&&e.then(t),typeof r=="function"&&e.catch(r)}function U(e){return typeof e!="string"&&(console.warn(e+" used as a key, but it is not a string."),e=String(e)),e}function V(){if(arguments.length&&typeof arguments[arguments.length-1]=="function")return arguments[arguments.length-1]}var F="local-forage-detect-blob-support",Q=void 0,$={},Ie=Object.prototype.toString,re="readonly",m="readwrite";function L(e){for(var t=e.length,r=new ArrayBuffer(t),o=new Uint8Array(r),a=0;a<t;a++)o[a]=e.charCodeAt(a);return r}function E(e){return new p(function(t){var r=e.transaction(F,m),o=K([""]);r.objectStore(F).put(o,"key"),r.onabort=function(a){a.preventDefault(),a.stopPropagation(),t(!1)},r.oncomplete=function(){var a=navigator.userAgent.match(/Chrome\/(\d+)/),n=navigator.userAgent.match(/Edge\//);t(n||!a||parseInt(a[1],10)>=43)}}).catch(function(){return!1})}function A(e){return typeof Q=="boolean"?p.resolve(Q):E(e).then(function(t){return Q=t,Q})}function H(e){var t=$[e.name],r={};r.promise=new p(function(o,a){r.resolve=o,r.reject=a}),t.deferredOperations.push(r),t.dbReady?t.dbReady=t.dbReady.then(function(){return r.promise}):t.dbReady=r.promise}function Y(e){var t=$[e.name],r=t.deferredOperations.pop();if(r)return r.resolve(),r.promise}function X(e,t){var r=$[e.name],o=r.deferredOperations.pop();if(o)return o.reject(t),o.promise}function z(e,t){return new p(function(r,o){if($[e.name]=$[e.name]||ze(),e.db)if(t)H(e),e.db.close();else return r(e.db);var a=[e.name];t&&a.push(e.version);var n=O.open.apply(O,a);t&&(n.onupgradeneeded=function(f){var u=n.result;try{u.createObjectStore(e.storeName),f.oldVersion<=1&&u.createObjectStore(F)}catch(c){if(c.name==="ConstraintError")console.warn('The database "'+e.name+'" has been upgraded from version '+f.oldVersion+" to version "+f.newVersion+', but the storage "'+e.storeName+'" already exists.');else throw c}}),n.onerror=function(f){f.preventDefault(),o(n.error)},n.onsuccess=function(){var f=n.result;f.onversionchange=function(u){u.target.close()},r(f),Y(e)}})}function J(e){return z(e,!1)}function fe(e){return z(e,!0)}function he(e,t){if(!e.db)return!0;var r=!e.db.objectStoreNames.contains(e.storeName),o=e.version<e.db.version,a=e.version>e.db.version;if(o&&(e.version!==t&&console.warn('The database "'+e.name+`" can't be downgraded from version `+e.db.version+" to version "+e.version+"."),e.version=e.db.version),a||r){if(r){var n=e.db.version+1;n>e.version&&(e.version=n)}return!0}return!1}function Te(e){return new p(function(t,r){var o=new FileReader;o.onerror=r,o.onloadend=function(a){var n=btoa(a.target.result||"");t({__local_forage_encoded_blob:!0,data:n,type:e.type})},o.readAsBinaryString(e)})}function te(e){var t=L(atob(e.data));return K([t],{type:e.type})}function Xe(e){return e&&e.__local_forage_encoded_blob}function Rr(e){var t=this,r=t._initReady().then(function(){var o=$[t._dbInfo.name];if(o&&o.dbReady)return o.dbReady});return C(r,e,e),r}function Nr(e){H(e);for(var t=$[e.name],r=t.forages,o=0;o<r.length;o++){var a=r[o];a._dbInfo.db&&(a._dbInfo.db.close(),a._dbInfo.db=null)}return e.db=null,J(e).then(function(n){return e.db=n,he(e)?fe(e):n}).then(function(n){e.db=t.db=n;for(var f=0;f<r.length;f++)r[f]._dbInfo.db=n}).catch(function(n){throw X(e,n),n})}function Z(e,t,r,o){o===void 0&&(o=1);try{var a=e.db.transaction(e.storeName,t);r(null,a)}catch(n){if(o>0&&(!e.db||n.name==="InvalidStateError"||n.name==="NotFoundError"))return p.resolve().then(function(){if(!e.db||n.name==="NotFoundError"&&!e.db.objectStoreNames.contains(e.storeName)&&e.version<=e.db.version)return e.db&&(e.version=e.db.version+1),fe(e)}).then(function(){return Nr(e).then(function(){Z(e,t,r,o-1)})}).catch(r);r(n)}}function ze(){return{forages:[],db:null,dbReady:null,deferredOperations:[]}}function Ar(e){var t=this,r={db:null};if(e)for(var o in e)r[o]=e[o];var a=$[r.name];a||(a=ze(),$[r.name]=a),a.forages.push(t),t._initReady||(t._initReady=t.ready,t.ready=Rr);var n=[];function f(){return p.resolve()}for(var u=0;u<a.forages.length;u++){var c=a.forages[u];c!==t&&n.push(c._initReady().catch(f))}var l=a.forages.slice(0);return p.all(n).then(function(){return r.db=a.db,J(r)}).then(function(v){return r.db=v,he(r,t._defaultConfig.version)?fe(r):v}).then(function(v){r.db=a.db=v,t._dbInfo=r;for(var h=0;h<l.length;h++){var _=l[h];_!==t&&(_._dbInfo.db=r.db,_._dbInfo.version=r.version)}})}function Br(e,t){var r=this;e=U(e);var o=new p(function(a,n){r.ready().then(function(){Z(r._dbInfo,re,function(f,u){if(f)return n(f);try{var c=u.objectStore(r._dbInfo.storeName),l=c.get(e);l.onsuccess=function(){var v=l.result;v===void 0&&(v=null),Xe(v)&&(v=te(v)),a(v)},l.onerror=function(){n(l.error)}}catch(v){n(v)}})}).catch(n)});return b(o,t),o}function Mr(e,t){var r=this,o=new p(function(a,n){r.ready().then(function(){Z(r._dbInfo,re,function(f,u){if(f)return n(f);try{var c=u.objectStore(r._dbInfo.storeName),l=c.openCursor(),v=1;l.onsuccess=function(){var h=l.result;if(h){var _=h.value;Xe(_)&&(_=te(_));var R=e(_,h.key,v++);R!==void 0?a(R):h.continue()}else a()},l.onerror=function(){n(l.error)}}catch(h){n(h)}})}).catch(n)});return b(o,t),o}function Pr(e,t,r){var o=this;e=U(e);var a=new p(function(n,f){var u;o.ready().then(function(){return u=o._dbInfo,Ie.call(t)==="[object Blob]"?A(u.db).then(function(c){return c?t:Te(t)}):t}).then(function(c){Z(o._dbInfo,m,function(l,v){if(l)return f(l);try{var h=v.objectStore(o._dbInfo.storeName);c===null&&(c=void 0);var _=h.put(c,e);v.oncomplete=function(){c===void 0&&(c=null),n(c)},v.onabort=v.onerror=function(){var R=_.error?_.error:_.transaction.error;f(R)}}catch(R){f(R)}})}).catch(f)});return b(a,r),a}function Cr(e,t){var r=this;e=U(e);var o=new p(function(a,n){r.ready().then(function(){Z(r._dbInfo,m,function(f,u){if(f)return n(f);try{var c=u.objectStore(r._dbInfo.storeName),l=c.delete(e);u.oncomplete=function(){a()},u.onerror=function(){n(l.error)},u.onabort=function(){var v=l.error?l.error:l.transaction.error;n(v)}}catch(v){n(v)}})}).catch(n)});return b(o,t),o}function Dr(e){var t=this,r=new p(function(o,a){t.ready().then(function(){Z(t._dbInfo,m,function(n,f){if(n)return a(n);try{var u=f.objectStore(t._dbInfo.storeName),c=u.clear();f.oncomplete=function(){o()},f.onabort=f.onerror=function(){var l=c.error?c.error:c.transaction.error;a(l)}}catch(l){a(l)}})}).catch(a)});return b(r,e),r}function Or(e){var t=this,r=new p(function(o,a){t.ready().then(function(){Z(t._dbInfo,re,function(n,f){if(n)return a(n);try{var u=f.objectStore(t._dbInfo.storeName),c=u.count();c.onsuccess=function(){o(c.result)},c.onerror=function(){a(c.error)}}catch(l){a(l)}})}).catch(a)});return b(r,e),r}function Ur(e,t){var r=this,o=new p(function(a,n){if(e<0){a(null);return}r.ready().then(function(){Z(r._dbInfo,re,function(f,u){if(f)return n(f);try{var c=u.objectStore(r._dbInfo.storeName),l=!1,v=c.openKeyCursor();v.onsuccess=function(){var h=v.result;if(!h){a(null);return}e===0||l?a(h.key):(l=!0,h.advance(e))},v.onerror=function(){n(v.error)}}catch(h){n(h)}})}).catch(n)});return b(o,t),o}function Fr(e){var t=this,r=new p(function(o,a){t.ready().then(function(){Z(t._dbInfo,re,function(n,f){if(n)return a(n);try{var u=f.objectStore(t._dbInfo.storeName),c=u.openKeyCursor(),l=[];c.onsuccess=function(){var v=c.result;if(!v){o(l);return}l.push(v.key),v.continue()},c.onerror=function(){a(c.error)}}catch(v){a(v)}})}).catch(a)});return b(r,e),r}function $r(e,t){t=V.apply(this,arguments);var r=this.config();e=typeof e!="function"&&e||{},e.name||(e.name=e.name||r.name,e.storeName=e.storeName||r.storeName);var o=this,a;if(!e.name)a=p.reject("Invalid arguments");else{var n=e.name===r.name&&o._dbInfo.db,f=n?p.resolve(o._dbInfo.db):J(e).then(function(u){var c=$[e.name],l=c.forages;c.db=u;for(var v=0;v<l.length;v++)l[v]._dbInfo.db=u;return u});e.storeName?a=f.then(function(u){if(!!u.objectStoreNames.contains(e.storeName)){var c=u.version+1;H(e);var l=$[e.name],v=l.forages;u.close();for(var h=0;h<v.length;h++){var _=v[h];_._dbInfo.db=null,_._dbInfo.version=c}var R=new p(function(N,D){var P=O.open(e.name,c);P.onerror=function(G){var ue=P.result;ue.close(),D(G)},P.onupgradeneeded=function(){var G=P.result;G.deleteObjectStore(e.storeName)},P.onsuccess=function(){var G=P.result;G.close(),N(G)}});return R.then(function(N){l.db=N;for(var D=0;D<v.length;D++){var P=v[D];P._dbInfo.db=N,Y(P._dbInfo)}}).catch(function(N){throw(X(e,N)||p.resolve()).catch(function(){}),N})}}):a=f.then(function(u){H(e);var c=$[e.name],l=c.forages;u.close();for(var v=0;v<l.length;v++){var h=l[v];h._dbInfo.db=null}var _=new p(function(R,N){var D=O.deleteDatabase(e.name);D.onerror=function(){var P=D.result;P&&P.close(),N(D.error)},D.onblocked=function(){console.warn('dropInstance blocked for database "'+e.name+'" until all open connections are closed')},D.onsuccess=function(){var P=D.result;P&&P.close(),R(P)}});return _.then(function(R){c.db=R;for(var N=0;N<l.length;N++){var D=l[N];Y(D._dbInfo)}}).catch(function(R){throw(X(e,R)||p.resolve()).catch(function(){}),R})})}return b(a,t),a}var Wr={_driver:"asyncStorage",_initStorage:Ar,_support:k(),iterate:Mr,getItem:Br,setItem:Pr,removeItem:Cr,clear:Dr,length:Or,key:Ur,keys:Fr,dropInstance:$r};function kr(){return typeof openDatabase=="function"}var q="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",Hr="~~local_forage_type~",Ge=/^~~local_forage_type~([^~]+)~/,ye="__lfsc__:",Le=ye.length,Re="arbf",Ne="blob",Ke="si08",Ve="ui08",Qe="uic8",Je="si16",Ze="si32",qe="ur16",je="ui32",er="fl32",rr="fl64",tr=Le+Re.length,nr=Object.prototype.toString;function or(e){var t=e.length*.75,r=e.length,o,a=0,n,f,u,c;e[e.length-1]==="="&&(t--,e[e.length-2]==="="&&t--);var l=new ArrayBuffer(t),v=new Uint8Array(l);for(o=0;o<r;o+=4)n=q.indexOf(e[o]),f=q.indexOf(e[o+1]),u=q.indexOf(e[o+2]),c=q.indexOf(e[o+3]),v[a++]=n<<2|f>>4,v[a++]=(f&15)<<4|u>>2,v[a++]=(u&3)<<6|c&63;return l}function Ae(e){var t=new Uint8Array(e),r="",o;for(o=0;o<t.length;o+=3)r+=q[t[o]>>2],r+=q[(t[o]&3)<<4|t[o+1]>>4],r+=q[(t[o+1]&15)<<2|t[o+2]>>6],r+=q[t[o+2]&63];return t.length%3===2?r=r.substring(0,r.length-1)+"=":t.length%3===1&&(r=r.substring(0,r.length-2)+"=="),r}function Yr(e,t){var r="";if(e&&(r=nr.call(e)),e&&(r==="[object ArrayBuffer]"||e.buffer&&nr.call(e.buffer)==="[object ArrayBuffer]")){var o,a=ye;e instanceof ArrayBuffer?(o=e,a+=Re):(o=e.buffer,r==="[object Int8Array]"?a+=Ke:r==="[object Uint8Array]"?a+=Ve:r==="[object Uint8ClampedArray]"?a+=Qe:r==="[object Int16Array]"?a+=Je:r==="[object Uint16Array]"?a+=qe:r==="[object Int32Array]"?a+=Ze:r==="[object Uint32Array]"?a+=je:r==="[object Float32Array]"?a+=er:r==="[object Float64Array]"?a+=rr:t(new Error("Failed to get type for BinaryArray"))),t(a+Ae(o))}else if(r==="[object Blob]"){var n=new FileReader;n.onload=function(){var f=Hr+e.type+"~"+Ae(this.result);t(ye+Ne+f)},n.readAsArrayBuffer(e)}else try{t(JSON.stringify(e))}catch(f){console.error("Couldn't convert value into a JSON string: ",e),t(null,f)}}function Xr(e){if(e.substring(0,Le)!==ye)return JSON.parse(e);var t=e.substring(tr),r=e.substring(Le,tr),o;if(r===Ne&&Ge.test(t)){var a=t.match(Ge);o=a[1],t=t.substring(a[0].length)}var n=or(t);switch(r){case Re:return n;case Ne:return K([n],{type:o});case Ke:return new Int8Array(n);case Ve:return new Uint8Array(n);case Qe:return new Uint8ClampedArray(n);case Je:return new Int16Array(n);case qe:return new Uint16Array(n);case Ze:return new Int32Array(n);case je:return new Uint32Array(n);case er:return new Float32Array(n);case rr:return new Float64Array(n);default:throw new Error("Unkown type: "+r)}}var Be={serialize:Yr,deserialize:Xr,stringToBuffer:or,bufferToString:Ae};function ar(e,t,r,o){e.executeSql("CREATE TABLE IF NOT EXISTS "+t.storeName+" (id INTEGER PRIMARY KEY, key unique, value)",[],r,o)}function zr(e){var t=this,r={db:null};if(e)for(var o in e)r[o]=typeof e[o]!="string"?e[o].toString():e[o];var a=new p(function(n,f){try{r.db=openDatabase(r.name,String(r.version),r.description,r.size)}catch(u){return f(u)}r.db.transaction(function(u){ar(u,r,function(){t._dbInfo=r,n()},function(c,l){f(l)})},f)});return r.serializer=Be,a}function j(e,t,r,o,a,n){e.executeSql(r,o,a,function(f,u){u.code===u.SYNTAX_ERR?f.executeSql("SELECT name FROM sqlite_master WHERE type='table' AND name = ?",[t.storeName],function(c,l){l.rows.length?n(c,u):ar(c,t,function(){c.executeSql(r,o,a,n)},n)},n):n(f,u)},n)}function Gr(e,t){var r=this;e=U(e);var o=new p(function(a,n){r.ready().then(function(){var f=r._dbInfo;f.db.transaction(function(u){j(u,f,"SELECT * FROM "+f.storeName+" WHERE key = ? LIMIT 1",[e],function(c,l){var v=l.rows.length?l.rows.item(0).value:null;v&&(v=f.serializer.deserialize(v)),a(v)},function(c,l){n(l)})})}).catch(n)});return b(o,t),o}function Kr(e,t){var r=this,o=new p(function(a,n){r.ready().then(function(){var f=r._dbInfo;f.db.transaction(function(u){j(u,f,"SELECT * FROM "+f.storeName,[],function(c,l){for(var v=l.rows,h=v.length,_=0;_<h;_++){var R=v.item(_),N=R.value;if(N&&(N=f.serializer.deserialize(N)),N=e(N,R.key,_+1),N!==void 0){a(N);return}}a()},function(c,l){n(l)})})}).catch(n)});return b(o,t),o}function ir(e,t,r,o){var a=this;e=U(e);var n=new p(function(f,u){a.ready().then(function(){t===void 0&&(t=null);var c=t,l=a._dbInfo;l.serializer.serialize(t,function(v,h){h?u(h):l.db.transaction(function(_){j(_,l,"INSERT OR REPLACE INTO "+l.storeName+" (key, value) VALUES (?, ?)",[e,v],function(){f(c)},function(R,N){u(N)})},function(_){if(_.code===_.QUOTA_ERR){if(o>0){f(ir.apply(a,[e,c,r,o-1]));return}u(_)}})})}).catch(u)});return b(n,r),n}function Vr(e,t,r){return ir.apply(this,[e,t,r,1])}function Qr(e,t){var r=this;e=U(e);var o=new p(function(a,n){r.ready().then(function(){var f=r._dbInfo;f.db.transaction(function(u){j(u,f,"DELETE FROM "+f.storeName+" WHERE key = ?",[e],function(){a()},function(c,l){n(l)})})}).catch(n)});return b(o,t),o}function Jr(e){var t=this,r=new p(function(o,a){t.ready().then(function(){var n=t._dbInfo;n.db.transaction(function(f){j(f,n,"DELETE FROM "+n.storeName,[],function(){o()},function(u,c){a(c)})})}).catch(a)});return b(r,e),r}function Zr(e){var t=this,r=new p(function(o,a){t.ready().then(function(){var n=t._dbInfo;n.db.transaction(function(f){j(f,n,"SELECT COUNT(key) as c FROM "+n.storeName,[],function(u,c){var l=c.rows.item(0).c;o(l)},function(u,c){a(c)})})}).catch(a)});return b(r,e),r}function qr(e,t){var r=this,o=new p(function(a,n){r.ready().then(function(){var f=r._dbInfo;f.db.transaction(function(u){j(u,f,"SELECT key FROM "+f.storeName+" WHERE id = ? LIMIT 1",[e+1],function(c,l){var v=l.rows.length?l.rows.item(0).key:null;a(v)},function(c,l){n(l)})})}).catch(n)});return b(o,t),o}function jr(e){var t=this,r=new p(function(o,a){t.ready().then(function(){var n=t._dbInfo;n.db.transaction(function(f){j(f,n,"SELECT key FROM "+n.storeName,[],function(u,c){for(var l=[],v=0;v<c.rows.length;v++)l.push(c.rows.item(v).key);o(l)},function(u,c){a(c)})})}).catch(a)});return b(r,e),r}function et(e){return new p(function(t,r){e.transaction(function(o){o.executeSql("SELECT name FROM sqlite_master WHERE type='table' AND name <> '__WebKitDatabaseInfoTable__'",[],function(a,n){for(var f=[],u=0;u<n.rows.length;u++)f.push(n.rows.item(u).name);t({db:e,storeNames:f})},function(a,n){r(n)})},function(o){r(o)})})}function rt(e,t){t=V.apply(this,arguments);var r=this.config();e=typeof e!="function"&&e||{},e.name||(e.name=e.name||r.name,e.storeName=e.storeName||r.storeName);var o=this,a;return e.name?a=new p(function(n){var f;e.name===r.name?f=o._dbInfo.db:f=openDatabase(e.name,"","",0),e.storeName?n({db:f,storeNames:[e.storeName]}):n(et(f))}).then(function(n){return new p(function(f,u){n.db.transaction(function(c){function l(R){return new p(function(N,D){c.executeSql("DROP TABLE IF EXISTS "+R,[],function(){N()},function(P,G){D(G)})})}for(var v=[],h=0,_=n.storeNames.length;h<_;h++)v.push(l(n.storeNames[h]));p.all(v).then(function(){f()}).catch(function(R){u(R)})},function(c){u(c)})})}):a=p.reject("Invalid arguments"),b(a,t),a}var tt={_driver:"webSQLStorage",_initStorage:zr,_support:kr(),iterate:Kr,getItem:Gr,setItem:Vr,removeItem:Qr,clear:Jr,length:Zr,key:qr,keys:jr,dropInstance:rt};function nt(){try{return typeof localStorage<"u"&&"setItem"in localStorage&&!!localStorage.setItem}catch(e){return!1}}function fr(e,t){var r=e.name+"/";return e.storeName!==t.storeName&&(r+=e.storeName+"/"),r}function ot(){var e="_localforage_support_test";try{return localStorage.setItem(e,!0),localStorage.removeItem(e),!1}catch(t){return!0}}function at(){return!ot()||localStorage.length>0}function it(e){var t=this,r={};if(e)for(var o in e)r[o]=e[o];return r.keyPrefix=fr(e,t._defaultConfig),at()?(t._dbInfo=r,r.serializer=Be,p.resolve()):p.reject()}function ft(e){var t=this,r=t.ready().then(function(){for(var o=t._dbInfo.keyPrefix,a=localStorage.length-1;a>=0;a--){var n=localStorage.key(a);n.indexOf(o)===0&&localStorage.removeItem(n)}});return b(r,e),r}function st(e,t){var r=this;e=U(e);var o=r.ready().then(function(){var a=r._dbInfo,n=localStorage.getItem(a.keyPrefix+e);return n&&(n=a.serializer.deserialize(n)),n});return b(o,t),o}function ut(e,t){var r=this,o=r.ready().then(function(){for(var a=r._dbInfo,n=a.keyPrefix,f=n.length,u=localStorage.length,c=1,l=0;l<u;l++){var v=localStorage.key(l);if(v.indexOf(n)===0){var h=localStorage.getItem(v);if(h&&(h=a.serializer.deserialize(h)),h=e(h,v.substring(f),c++),h!==void 0)return h}}});return b(o,t),o}function ct(e,t){var r=this,o=r.ready().then(function(){var a=r._dbInfo,n;try{n=localStorage.key(e)}catch(f){n=null}return n&&(n=n.substring(a.keyPrefix.length)),n});return b(o,t),o}function lt(e){var t=this,r=t.ready().then(function(){for(var o=t._dbInfo,a=localStorage.length,n=[],f=0;f<a;f++){var u=localStorage.key(f);u.indexOf(o.keyPrefix)===0&&n.push(u.substring(o.keyPrefix.length))}return n});return b(r,e),r}function dt(e){var t=this,r=t.keys().then(function(o){return o.length});return b(r,e),r}function vt(e,t){var r=this;e=U(e);var o=r.ready().then(function(){var a=r._dbInfo;localStorage.removeItem(a.keyPrefix+e)});return b(o,t),o}function mt(e,t,r){var o=this;e=U(e);var a=o.ready().then(function(){t===void 0&&(t=null);var n=t;return new p(function(f,u){var c=o._dbInfo;c.serializer.serialize(t,function(l,v){if(v)u(v);else try{localStorage.setItem(c.keyPrefix+e,l),f(n)}catch(h){(h.name==="QuotaExceededError"||h.name==="NS_ERROR_DOM_QUOTA_REACHED")&&u(h),u(h)}})})});return b(a,r),a}function pt(e,t){if(t=V.apply(this,arguments),e=typeof e!="function"&&e||{},!e.name){var r=this.config();e.name=e.name||r.name,e.storeName=e.storeName||r.storeName}var o=this,a;return e.name?a=new p(function(n){e.storeName?n(fr(e,o._defaultConfig)):n(e.name+"/")}).then(function(n){for(var f=localStorage.length-1;f>=0;f--){var u=localStorage.key(f);u.indexOf(n)===0&&localStorage.removeItem(u)}}):a=p.reject("Invalid arguments"),b(a,t),a}var ht={_driver:"localStorageWrapper",_initStorage:it,_support:nt(),iterate:ut,getItem:st,setItem:mt,removeItem:vt,clear:ft,length:dt,key:ct,keys:lt,dropInstance:pt},yt=function(t,r){return t===r||typeof t=="number"&&typeof r=="number"&&isNaN(t)&&isNaN(r)},gt=function(t,r){for(var o=t.length,a=0;a<o;){if(yt(t[a],r))return!0;a++}return!1},sr=Array.isArray||function(e){return Object.prototype.toString.call(e)==="[object Array]"},se={},ur={},ne={INDEXEDDB:Wr,WEBSQL:tt,LOCALSTORAGE:ht},bt=[ne.INDEXEDDB._driver,ne.WEBSQL._driver,ne.LOCALSTORAGE._driver],ge=["dropInstance"],Me=["clear","getItem","iterate","key","keys","length","removeItem","setItem"].concat(ge),wt={description:"",driver:bt.slice(),name:"localforage",size:4980736,storeName:"keyvaluepairs",version:1};function _t(e,t){e[t]=function(){var r=arguments;return e.ready().then(function(){return e[t].apply(e,r)})}}function Pe(){for(var e=1;e<arguments.length;e++){var t=arguments[e];if(t)for(var r in t)t.hasOwnProperty(r)&&(sr(t[r])?arguments[0][r]=t[r].slice():arguments[0][r]=t[r])}return arguments[0]}var Et=function(){function e(t){W(this,e);for(var r in ne)if(ne.hasOwnProperty(r)){var o=ne[r],a=o._driver;this[r]=a,se[a]||this.defineDriver(o)}this._defaultConfig=Pe({},wt),this._config=Pe({},this._defaultConfig,t),this._driverSet=null,this._initDriver=null,this._ready=!1,this._dbInfo=null,this._wrapLibraryMethodsWithReady(),this.setDriver(this._config.driver).catch(function(){})}return e.prototype.config=function(r){if((typeof r>"u"?"undefined":I(r))==="object"){if(this._ready)return new Error("Can't call config() after localforage has been used.");for(var o in r){if(o==="storeName"&&(r[o]=r[o].replace(/\W/g,"_")),o==="version"&&typeof r[o]!="number")return new Error("Database version must be a number.");this._config[o]=r[o]}return"driver"in r&&r.driver?this.setDriver(this._config.driver):!0}else return typeof r=="string"?this._config[r]:this._config},e.prototype.defineDriver=function(r,o,a){var n=new p(function(f,u){try{var c=r._driver,l=new Error("Custom driver not compliant; see https://mozilla.github.io/localForage/#definedriver");if(!r._driver){u(l);return}for(var v=Me.concat("_initStorage"),h=0,_=v.length;h<_;h++){var R=v[h],N=!gt(ge,R);if((N||r[R])&&typeof r[R]!="function"){u(l);return}}var D=function(){for(var ue=function(It){return function(){var Tt=new Error("Method "+It+" is not implemented by the current driver"),cr=p.reject(Tt);return b(cr,arguments[arguments.length-1]),cr}},Ce=0,xt=ge.length;Ce<xt;Ce++){var De=ge[Ce];r[De]||(r[De]=ue(De))}};D();var P=function(ue){se[c]&&console.info("Redefining LocalForage driver: "+c),se[c]=r,ur[c]=ue,f()};"_support"in r?r._support&&typeof r._support=="function"?r._support().then(P,u):P(!!r._support):P(!0)}catch(G){u(G)}});return C(n,o,a),n},e.prototype.driver=function(){return this._driver||null},e.prototype.getDriver=function(r,o,a){var n=se[r]?p.resolve(se[r]):p.reject(new Error("Driver not found."));return C(n,o,a),n},e.prototype.getSerializer=function(r){var o=p.resolve(Be);return C(o,r),o},e.prototype.ready=function(r){var o=this,a=o._driverSet.then(function(){return o._ready===null&&(o._ready=o._initDriver()),o._ready});return C(a,r,r),a},e.prototype.setDriver=function(r,o,a){var n=this;sr(r)||(r=[r]);var f=this._getSupportedDrivers(r);function u(){n._config.driver=n.driver()}function c(h){return n._extend(h),u(),n._ready=n._initStorage(n._config),n._ready}function l(h){return function(){var _=0;function R(){for(;_<h.length;){var N=h[_];return _++,n._dbInfo=null,n._ready=null,n.getDriver(N).then(c).catch(R)}u();var D=new Error("No available storage method found.");return n._driverSet=p.reject(D),n._driverSet}return R()}}var v=this._driverSet!==null?this._driverSet.catch(function(){return p.resolve()}):p.resolve();return this._driverSet=v.then(function(){var h=f[0];return n._dbInfo=null,n._ready=null,n.getDriver(h).then(function(_){n._driver=_._driver,u(),n._wrapLibraryMethodsWithReady(),n._initDriver=l(f)})}).catch(function(){u();var h=new Error("No available storage method found.");return n._driverSet=p.reject(h),n._driverSet}),C(this._driverSet,o,a),this._driverSet},e.prototype.supports=function(r){return!!ur[r]},e.prototype._extend=function(r){Pe(this,r)},e.prototype._getSupportedDrivers=function(r){for(var o=[],a=0,n=r.length;a<n;a++){var f=r[a];this.supports(f)&&o.push(f)}return o},e.prototype._wrapLibraryMethodsWithReady=function(){for(var r=0,o=Me.length;r<o;r++)_t(this,Me[r])},e.prototype.createInstance=function(r){return new e(r)},e}(),St=new Et;w.exports=St},{"3":3}]},{},[4])(4)})});var ie=Dt(dr());var be=i=>{let s=typeof i;return i!==null&&(s==="object"||s==="function")},Fe=new Set(["__proto__","prototype","constructor"]),Ot=new Set("0123456789");function vr(i){let s=[],g="",y="start",w=!1;for(let M of i)switch(M){case"\\":if(y==="index")throw new Error("Invalid character in an index");if(y==="indexEnd")throw new Error("Invalid character after an index");w&&(g+=M),y="property",w=!w;break;case".":if(y==="index")throw new Error("Invalid character in an index");if(y==="indexEnd"){y="property";break}if(w){w=!1,g+=M;break}if(Fe.has(g))return[];s.push(g),g="",y="property";break;case"[":if(y==="index")throw new Error("Invalid character in an index");if(y==="indexEnd"){y="index";break}if(w){w=!1,g+=M;break}if(y==="property"){if(Fe.has(g))return[];s.push(g),g=""}y="index";break;case"]":if(y==="index"){s.push(Number.parseInt(g,10)),g="",y="indexEnd";break}if(y==="indexEnd")throw new Error("Invalid character after an index");default:if(y==="index"&&!Ot.has(M))throw new Error("Invalid character in an index");if(y==="indexEnd")throw new Error("Invalid character after an index");y==="start"&&(y="property"),w&&(w=!1,g+="\\"),g+=M}switch(w&&(g+="\\"),y){case"property":{if(Fe.has(g))return[];s.push(g);break}case"index":throw new Error("Index was not closed");case"start":{s.push("");break}}return s}function mr(i,s){if(typeof s!="number"&&Array.isArray(i)){let g=Number.parseInt(s,10);return Number.isInteger(g)&&i[g]===i[s]}return!1}function Ut(i,s){if(mr(i,s))throw new Error("Cannot use string index")}function pr(i,s,g){if(!be(i)||typeof s!="string")return i;let y=i,w=vr(s);for(let M=0;M<w.length;M++){let I=w[M];Ut(i,I),M===w.length-1?i[I]=g:be(i[I])||(i[I]=typeof w[M+1]=="number"?[]:{}),i=i[I]}return y}function hr(i,s){if(!be(i)||typeof s!="string")return!1;let g=vr(s);if(g.length===0)return!1;for(let y of g){if(!be(i)||!(y in i)||mr(i,y))return!1;i=i[y]}return!0}var B=(i,s=0)=>{if(i<0)return"-"+B(-i,s);if(i>=1e6){let O=Math.floor(Math.log10(i));return i/=Math.pow(10,O),B(i,2)+"e"+B(O)}let g=Math.floor(i),y=i-g,w=g.toLocaleString(),M=s>0&&i!==0,I=Math.pow(10,s)*y,W=1e-6;Math.ceil(I)-I<W&&(I=Math.ceil(I));let x=M?Math.floor(I).toString():"";if(x!==""){for(;x.length<s;)x="0"+x;x="."+x}return w+x};var T=(i,s)=>{if(document.visibilityState==="hidden")return;let g=Object.entries(s);for(let[y,w]of g)i[y]=w;return i};var le=i=>{T(S("mainTab").style,{display:"none"}),T(S("upgradeTab").style,{display:"none"}),i==="Main"?T(S("mainTab").style,{display:"block"}):i==="Upgrades"&&T(S("upgradeTab").style,{display:"block"})},S=i=>document.getElementById(i);var de=class{constructor(s=0){this.amount=s,this.updateHTML()}spend(s){this.amount>=s&&(this.amount-=s,this.updateHTML())}gain(s){this.amount+=s,this.updateHTML()}set(s){this.amount=s,this.updateHTML()}};var we=class extends de{updateHTML(){T(S("gold-amount"),{textContent:B(this.amount)})}};var _e=class extends de{updateHTML(){T(S("fragment-amount"),{textContent:B(this.amount)}),T(S("fragment-bonus"),{textContent:B(this.amount)}),T(S("fragment-gain"),{textContent:B(this.getAmountOnRefresh())})}getAmountOnRefresh(s=0){d!==void 0&&(s=d.barLevel);let g=25;return g*=Math.pow(1.04,s),Math.floor(g)}unspentBonus(){return 1+1/100*this.amount}};var Ft=10,Ee=0,yr=0,ve=()=>{let i=0;return i+=Ft*Math.pow(d.barLevel+1,2),i*=Math.min(1,(d.barLevel+20)/40),d.barLevel>50&&(i*=Math.pow(2,1/10*(d.barLevel-50))),d.barLevel>100&&(i*=Math.pow(2,1/50*(d.barLevel-100))),d.barLevel>200&&(i*=Math.pow(2,1/200*(d.barLevel-200))),i},$t=()=>{let i=0;return d.barLevel>=5&&(i=.2),d.barLevel>=10&&(i+=.8*(1-Math.pow(Math.E,-(d.barLevel-10)/90))),i},Wt=()=>{let i=$t();return 1-Math.max(0,i*(1-d.barEXP/d.barTNL))},gr=i=>{if(i==null)return;let s=1;s+=d.coinUpgrades.barSpeed.upgradeEffect(),s*=d.barFragments.unspentBonus(),s*=Math.pow(1+d.coinUpgrades.barMomentum.upgradeEffect(),100*Math.min(1,d.barEXP/d.barTNL)),s*=Wt();let g=s*i;d.barEXP+=g,Ee+=g,T(S("perSecCurr"),{textContent:`+${B(Ee,2)} this sec`})},oe=(i,s)=>Math.min(100,.1*Math.floor(1e3*i/s)),ae=i=>{T(S("progression").style,{width:`${i}%`})};function $e(){let i=(128+d.barLevel).toString(16),s=(2*d.barLevel).toString(16),g=(128+d.barLevel).toString(16);return d.barLevel<128?`#${i}${s}${g}`:"#ffffff"}var br=()=>{d.coins.gain(ee()),d.barEXP-=d.barTNL,d.barLevel+=1,d.barLevel>d.highestBarLevel&&(d.highestBarLevel=d.barLevel),T(S("progression").style,{backgroundColor:$e()}),d.barTNL=ve();let i=oe(d.barEXP,d.barTNL);ae(i),T(S("coinWorth"),{textContent:`Worth ${B(ee())} coins`}),d.barFragments.updateHTML()},wr=()=>{T(S("level"),{textContent:`Level: ${d.barLevel}`}),T(S("exp"),{textContent:`EXP: ${B(d.barEXP)}/${B(d.barTNL)}`})},_r=()=>{yr=Ee,Ee=0,T(S("perSecPrev"),{textContent:`+${B(yr,2)} prev sec`})},ee=()=>{let i=0,s=d.barLevel+1;return i+=Math.floor((s+7)/10),s>d.highestBarLevel&&(i+=Math.floor(s/10)+3),s%10===0&&(i+=Math.floor(s/5)+3),i};document.addEventListener("visibilitychange",()=>{document.visibilityState!=="hidden"&&(d.coins.updateHTML(),d.coinUpgrades.barMomentum.updateHTML(),d.coinUpgrades.barSpeed.updateHTML(),d.barFragments.updateHTML(),T(S("coinWorth"),{textContent:`Worth ${B(ee())} coins`}))});var We=class{constructor(s,g){this.level=s,this.cost=g}};var ke=class extends We{constructor(s,g){super(s,g);this.updateHTML()}purchaseLevels(s,g){g.shiftKey&&(s=-1),s===-1&&(s=Math.floor(d.coins.amount/this.cost)),this.cost*s<=d.coins.amount&&(d.coins.spend(this.cost*s),this.level+=s,this.updateHTML())}},me={barSpeed:1,barMomentum:10},Se=class extends ke{upgradeEffect(){return this.level/5}updateHTML(){T(S("coin-bar-speed-effect"),{textContent:`+${B(this.upgradeEffect(),2)} Progress Per Second`})}},xe=class extends ke{upgradeEffect(){return 4/100*(1-Math.pow(Math.E,-this.level/100))}updateHTML(){T(S("coin-bar-momentum-effect"),{textContent:`+${B(100*this.upgradeEffect(),3)}% Progress Per 1% Bar Filled`})}};var Er=i=>{if(i==="Refresh"&&d.barLevel>=5){if(d.refreshTime<60)return alert("currently, refreshes have a 60 second cooldown. Sorry!");d.barFragments.set(d.barFragments.getAmountOnRefresh()),d.barEXP=0,d.barLevel=0,d.barTNL=ve(),ae(oe(d.barEXP,d.barTNL)),T(S("coinWorth"),{textContent:`Worth ${B(ee())} coins`}),d.barFragments.updateHTML(),d.refreshCount+=1,d.refreshTime=0,T(S("refresh-counter"),{textContent:B(d.refreshCount)})}else alert("You cannot refresh yet. Get to level 5 lol")};var Sr=()=>{S("main-tab-nav").addEventListener("click",()=>le("Main")),S("upgrade-tab-nav").addEventListener("click",()=>le("Upgrades")),S("buy-coin-bar-speed").addEventListener("click",i=>d.coinUpgrades.barSpeed.purchaseLevels(1,i)),S("buy-coin-bar-momentum").addEventListener("click",i=>d.coinUpgrades.barMomentum.purchaseLevels(1,i)),S("buy-reset").addEventListener("click",()=>Er("Refresh")),S("reset-game").addEventListener("click",()=>void xr())};var d={firstPlayed:new Date,barEXP:0,barTNL:0,totalEXP:0,barLevel:0,highestBarLevel:0,coins:new we,coinUpgrades:{barSpeed:new Se(0,me.barSpeed),barMomentum:new xe(0,me.barMomentum)},barFragments:new _e,refreshCount:0,refreshTime:0},Tr=Object.assign({},d),kt=async()=>{let i=Object.assign({},d,{});await ie.default.removeItem("UPBSave");let s=btoa(JSON.stringify(i));s!==null&&await ie.default.setItem("UPBSave",s)},Ir=new Map([["coins",i=>new we(Number(i.coins.amount))],["barFragments",i=>new _e(Number(i.barFragments.amount))],["coinUpgrades.barSpeed",i=>new Se(i.coinUpgrades.barSpeed.level,me.barSpeed)],["coinUpgrades.barMomentum",i=>new xe(i.coinUpgrades.barMomentum.level,me.barMomentum)]]),Ht=async()=>{console.log("load attempted");let i=await ie.default.getItem("UPBSave"),s=i?JSON.parse(atob(i)):null;if(!s)return;let g=Object.keys(s);for(let y of g)y in Tr&&(Ir.has(y)||Object.defineProperty(d,y,{value:s[y]}));for(let[y,w]of Ir)hr(d,y)&&pr(d,y,w(s))},pe=new Set,He=new Proxy(setInterval,{apply(i,s,g){let y=i.apply(s,g);return pe.add(y),y}}),Yt=new Proxy(clearInterval,{apply(i,s,g){let y=g[0];return pe.has(y)&&pe.delete(y),i.apply(s,g)}});window.addEventListener("load",()=>{Sr(),Lr()});window.addEventListener("unload",()=>{window.scrollTo(0,0)});var Ye=0,Xt=50,zt=5e3,Lr=async()=>{for(let i of pe)Yt(i);pe.clear(),await Ht(),d.barTNL=ve(),Object.defineProperty(window,"player",{value:d}),ae(oe(d.barEXP,d.barTNL)),d.barFragments.updateHTML(),le("Main"),T(S("progression").style,{backgroundColor:$e()}),T(S("coinWorth"),{textContent:`Worth ${B(ee())} coins`}),Ye=performance.now(),He(Gt,1e3/Xt),He(_r,1e3),He(kt,zt)},xr=async()=>{await ie.default.removeItem("UPBSave");let i=btoa(JSON.stringify(Tr));await ie.default.setItem("UPBSave",i),await Lr()},Gt=()=>{let s=performance.now()-Ye;Kt(s/1e3),Ye+=s},Kt=i=>{gr(i),d.refreshTime+=i,T(S("refresh-timer"),{textContent:`${B(d.refreshTime,2)}s`});let s=oe(d.barEXP,d.barTNL);s<100?ae(s):br(),wr()};})();
/*!
    localForage -- Offline Storage, Improved
    Version 1.10.0
    https://localforage.github.io/localForage
    (c) 2013-2017 Mozilla, Apache License 2.0
*/
//# sourceMappingURL=out.js.map
