(this["webpackJsonpmanta-front-end"]=this["webpackJsonpmanta-front-end"]||[]).push([[0],{568:function(e){e.exports=JSON.parse('{"APP_NAME":"substrate-front-end-tutorial","DEVELOPMENT_KEYRING":true,"RPC":{}}')},613:function(e){e.exports=JSON.parse('{"PROVIDER_SOCKET":"wss://dev-node.substrate.dev"}')},614:function(e){e.exports=JSON.parse('{"SenderData":{"k":"[u8; 32]","void_number":"[u8; 32]","root":"[u8; 32]"},"ReceiverData":{"k":"[u8; 32]","cm":"[u8; 32]","sender_pk":"[u8; 32]","cipher":"[u8; 16]"},"PrivateTransferPayload":"[u8; 608]","ReclaimPayload":"[u8; 512]"}')},623:function(e,t){},644:function(e,t){},661:function(e,t){},663:function(e,t){},665:function(e,t){},675:function(e,t){},677:function(e,t){},708:function(e,t){},709:function(e,t){},778:function(e,t){},821:function(e,t,n){"use strict";n.r(t);var a=n(3),c=n.n(a),r=n(184),i=n.n(r),s=n(2),l=n(190),u=n(890),o=n(886),j=n(893),b=n(891),d=n(884),O=(n(602),n(15)),p=n.n(O),f=n(29),x=n(39),h=n(439),v=n(567),m=n.n(v),y=n(461),S=n(292),g=n(404),E=n.n(g),R=n(568),w=n(613),C=n(614),T=["REACT_APP_PROVIDER_SOCKET","REACT_APP_DEVELOPMENT_KEYRING"].reduce((function(e,t){return void 0!==Object({NODE_ENV:"production",PUBLIC_URL:"",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0,FAST_REFRESH:!0})[t]&&(e[t.slice(10)]=Object({NODE_ENV:"production",PUBLIC_URL:"",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0,FAST_REFRESH:!0})[t]),e}),{}),k=Object(x.a)(Object(x.a)(Object(x.a)(Object(x.a)({},R),w),T),{},{types:C}),N=n(10),P={socket:m.a.parse(window.location.search).rpc||k.PROVIDER_SOCKET,jsonrpc:Object(x.a)(Object(x.a)({},h.default),k.RPC),types:k.types,keyring:null,keyringState:null,api:null,apiError:null,apiState:null},A=function(e,t){switch(t.type){case"CONNECT_INIT":return Object(x.a)(Object(x.a)({},e),{},{apiState:"CONNECT_INIT"});case"CONNECT":return Object(x.a)(Object(x.a)({},e),{},{api:t.payload,apiState:"CONNECTING"});case"CONNECT_SUCCESS":return Object(x.a)(Object(x.a)({},e),{},{apiState:"READY"});case"CONNECT_ERROR":return Object(x.a)(Object(x.a)({},e),{},{apiState:"ERROR",apiError:t.payload});case"LOAD_KEYRING":return Object(x.a)(Object(x.a)({},e),{},{keyringState:"LOADING"});case"SET_KEYRING":return Object(x.a)(Object(x.a)({},e),{},{keyring:t.payload,keyringState:"READY"});case"KEYRING_ERROR":return Object(x.a)(Object(x.a)({},e),{},{keyring:null,keyringState:"ERROR"});default:throw new Error("Unknown type: ".concat(t.type))}},_=!1,D=c.a.createContext(),I=function(e){var t=Object(x.a)({},P);["socket","types"].forEach((function(n){t[n]="undefined"===typeof e[n]?t[n]:e[n]}));var n=Object(a.useReducer)(A,t),c=Object(s.a)(n,2),r=c[0],i=c[1];return function(e,t){var n=e.apiState,a=e.socket,c=e.jsonrpc,r=e.types;if(!n){t({type:"CONNECT_INIT"});var i=new y.WsProvider(a),s=new y.ApiPromise({provider:i,types:r,rpc:c});s.on("connected",(function(){t({type:"CONNECT",payload:s}),s.isReady.then((function(e){return t({type:"CONNECT_SUCCESS"})}))})),s.on("ready",(function(){return t({type:"CONNECT_SUCCESS"})})),s.on("error",(function(e){return t({type:"CONNECT_ERROR",payload:e})}))}}(r,i),function(e,t){var n=function(){var e=Object(f.a)(p.a.mark((function e(){var n;return p.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t({type:"LOAD_KEYRING"}),e.prev=1,e.next=4,Object(S.web3Enable)(k.APP_NAME);case 4:return e.next=6,Object(S.web3Accounts)();case 6:n=(n=e.sent).map((function(e){var t=e.address,n=e.meta;return{address:t,meta:Object(x.a)(Object(x.a)({},n),{},{name:"".concat(n.name," (").concat(n.source,")")})}})),E.a.loadAll({isDevelopment:k.DEVELOPMENT_KEYRING},n),t({type:"SET_KEYRING",payload:E.a}),e.next=16;break;case 12:e.prev=12,e.t0=e.catch(1),console.error(e.t0),t({type:"KEYRING_ERROR"});case 16:case"end":return e.stop()}}),e,null,[[1,12]])})));return function(){return e.apply(this,arguments)}}();if(!e.keyringState){if(_)return t({type:"SET_KEYRING",payload:E.a});_=!0,n()}}(r,i),Object(N.jsx)(D.Provider,{value:r,children:e.children})},F=function(){return Object(x.a)({},Object(a.useContext)(D))},U={paramConversion:{num:["Compact<Balance>","BalanceOf","u8","u16","u32","u64","u128","i8","i16","i32","i64","i128"]}},L=n(20),G=n(861);function K(e){var t=e.accountPair,n=void 0===t?null:t,c=e.label,r=e.setStatus,i=e.color,l=void 0===i?"blue":i,u=e.style,o=void 0===u?null:u,j=e.type,b=void 0===j?"QUERY":j,d=e.attrs,O=void 0===d?null:d,h=e.disabled,v=void 0!==h&&h,m=F().api,y=Object(a.useState)(null),g=Object(s.a)(y,2),E=g[0],R=g[1],w=Object(a.useState)(null),C=Object(s.a)(w,2),T=C[0],k=C[1],P=O.palletRpc,A=O.callable,_=O.inputParams,D=O.paramFields,I=function(){return"SUDO-TX"===b},K=function(){return"UNCHECKED-SUDO-TX"===b};Object(a.useEffect)((function(){Object(f.a)(p.a.mark((function e(){var t;return p.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(m&&m.query.sudo){e.next=2;break}return e.abrupt("return");case 2:return e.next=4,m.query.sudo.key();case 4:(t=e.sent).isEmpty?k(null):k(t.toString());case 6:case"end":return e.stop()}}),e)})))()}),[m]);var M,Y=function(){var e=Object(f.a)(p.a.mark((function e(){var t,a,c,r,i;return p.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(t=n.address,a=n.meta,c=a.source,!a.isInjected){e.next=9;break}return e.next=4,Object(S.web3FromSource)(c);case 4:i=e.sent,r=t,m.setSigner(i.signer),e.next=10;break;case 9:r=n;case 10:return e.abrupt("return",r);case 11:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),B=function(e){var t=e.status,n=(e.events,e.dispatchError);n&&t.isFinalized?r("Transaction failed. Block hash: ".concat(t.asFinalized.toString())):n&&t.isInBlock?r("Transaction failed. Block hash: ".concat(t.asInBlock.toString())):t.isFinalized?r("\ud83d\ude09 Finalized. Block hash: ".concat(t.asFinalized.toString())):r("Current transaction status: ".concat(t.type))},W=function(){var e=Object(f.a)(p.a.mark((function e(){var t,n,a,c,i;return p.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Y();case 2:t=e.sent,n=$(D,_);try{c=n?m.tx.sudo.sudo((a=m.tx[P])[A].apply(a,Object(L.a)(n))):m.tx.sudo.sudo(m.tx[P][A]()),i=c.signAndSend(t,B),R((function(){return i}))}catch(s){r("Transaction failed. ".concat(s.toString()))}case 5:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),V=function(){var e=Object(f.a)(p.a.mark((function e(){var t,n,a,c;return p.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Y();case 2:t=e.sent;try{a=m.tx.sudo.sudoUncheckedWeight((n=m.tx[P])[A].apply(n,Object(L.a)(_)),0),c=a.signAndSend(t,B),R((function(){return c}))}catch(i){r("Transaction failed. ".concat(i.toString()))}case 4:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),z=function(){var e=Object(f.a)(p.a.mark((function e(){var t,n,a,c,i;return p.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Y();case 2:return t=e.sent,n=$(D,_),e.prev=4,c=n?(a=m.tx[P])[A].apply(a,Object(L.a)(n)):m.tx[P][A](),e.next=8,c.signAndSend(t,B);case 8:i=e.sent,R((function(){return i})),e.next=15;break;case 12:e.prev=12,e.t0=e.catch(4),r("Transaction failed. ".concat(e.t0.toString()));case 15:case"end":return e.stop()}}),e,null,[[4,12]])})));return function(){return e.apply(this,arguments)}}(),H=function(){var e=Object(f.a)(p.a.mark((function e(){var t,n,a,c;return p.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=$(D,_),e.prev=1,a=t?(n=m.tx[P])[A].apply(n,Object(L.a)(t)):m.tx[P][A](),e.next=5,a.send(B);case 5:c=e.sent,R((function(){return c})),e.next=12;break;case 9:e.prev=9,e.t0=e.catch(1),r("Transaction failed. ".concat(e.t0.toString()));case 12:case"end":return e.stop()}}),e,null,[[1,9]])})));return function(){return e.apply(this,arguments)}}(),X=function(e){return e.isNone?r("None"):r(e.toString())},J=function(){var e=Object(f.a)(p.a.mark((function e(){var t,n,a;return p.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=$(D,_),e.prev=1,e.next=4,(n=m.query[P])[A].apply(n,Object(L.a)(t).concat([X]));case 4:a=e.sent,R((function(){return a})),e.next=11;break;case 8:e.prev=8,e.t0=e.catch(1),r("Query failed. ".concat(e.t0.toString()));case 11:case"end":return e.stop()}}),e,null,[[1,8]])})));return function(){return e.apply(this,arguments)}}(),q=function(){var e=Object(f.a)(p.a.mark((function e(){var t,n,a;return p.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=$(D,_,{emptyAsNull:!1}),e.prev=1,e.next=4,(n=m.rpc[P])[A].apply(n,Object(L.a)(t).concat([X]));case 4:a=e.sent,R((function(){return a})),e.next=11;break;case 8:e.prev=8,e.t0=e.catch(1),r("RPC failed. ".concat(e.t0.toString()));case 11:case"end":return e.stop()}}),e,null,[[1,8]])})));return function(){return e.apply(this,arguments)}}(),Q=function(){var e=m.consts[P][A];e.isNone?r("None"):r(e.toString())},Z=function(){var e=Object(f.a)(p.a.mark((function e(){return p.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:E&&(E(),R(null)),r("Sending..."),I()&&W()||K()&&V()||"SIGNED-TX"===b&&z()||"UNSIGNED-TX"===b&&H()||"QUERY"===b&&J()||"RPC"===b&&q()||"CONSTANT"===b&&Q();case 3:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),$=function(e,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{emptyAsNull:!0},a=t.map((function(e){return"object"===typeof e&&null!==e&&"string"===typeof e.value?e.value.trim():"string"===typeof e?e.trim():e})),c=e.map((function(e,t){return Object(x.a)(Object(x.a)({},e),{},{value:a[t]||null})}));return c.reduce((function(e,t){var a=t.type,c=void 0===a?"string":a,r=t.value;if(null==r||""===r)return n.emptyAsNull?[].concat(Object(L.a)(e),[null]):e;var i=r;return c.indexOf("Vec<")>=0?(i=(i=i.split(",").map((function(e){return e.trim()}))).map((function(e){return ee(c)?e.indexOf(".")>=0?Number.parseFloat(e):Number.parseInt(e):e})),[].concat(Object(L.a)(e),[i])):(ee(c)&&(i=i.indexOf(".")>=0?Number.parseFloat(i):Number.parseInt(i)),[].concat(Object(L.a)(e),[i]))}),[])},ee=function(e){return U.paramConversion.num.some((function(t){return e.indexOf(t)>=0}))};return Object(N.jsx)(G.a,{basic:!0,color:l,style:o,type:"submit",onClick:Z,disabled:v||!P||!A||!(0===D.length||D.every((function(e,t){var n=_[t];if(e.optional)return!0;if(null==n)return!1;var a="object"===typeof n?n.value:n;return null!==a&&""!==a})))||(I()||K())&&(M=n,!(T&&M&&M.address===T)),children:c})}function M(e){var t=F(),a=t.api,c=t.apiState,r=t.keyring,i=t.keyringState;return"READY"===c&&(window.api=a),"READY"===i&&(window.keyring=r),window.util=n(0),window.utilCrypto=n(14),null}var Y=n(581),B=n(883),W=n(888),V=n(887),z=n(296),H=n(583);function X(e){var t=F().keyring,n=e.setAccountAddress,c=Object(a.useState)(""),r=Object(s.a)(c,2),i=r[0],u=r[1],o=t.getPairs().map((function(e){return{key:e.address,value:e.address,text:e.meta.name.toUpperCase(),icon:"user"}})),j=o.length>0?o[0].value:"";Object(a.useEffect)((function(){n(j),u(j)}),[n,j]);var b=Object(a.createRef)();return Object(N.jsx)(B.a,{context:b,children:Object(N.jsx)(W.a,{attached:"top",tabular:!0,style:{backgroundColor:"MidnightBlue",borderColor:"MidnightBlue",paddingTop:"1em",paddingBottom:"1em"},children:Object(N.jsxs)(d.a,{children:[Object(N.jsxs)(W.a.Menu,{position:"left",style:{alignItems:"center"},children:[Object(N.jsx)(W.a.Item,{name:"MA Token",children:Object(N.jsx)(l.b,{to:"/ma_token",children:"MA Token"})}),Object(N.jsx)(W.a.Item,{name:"Labs",children:Object(N.jsx)(l.b,{to:"/labs",children:"Labs"})}),Object(N.jsx)(W.a.Item,{name:"Governance",children:Object(N.jsx)(l.b,{to:"/governance",children:"Governance"})})]}),Object(N.jsxs)(W.a.Menu,{position:"right",style:{alignItems:"center"},children:[i?null:Object(N.jsxs)("span",{children:["Add your account with the"," ",Object(N.jsx)("a",{target:"_blank",rel:"noopener noreferrer",href:"https://polkadot.js.org/extension/",children:"Polkadot JS Extension"})]}),Object(N.jsx)(Y.CopyToClipboard,{text:i,children:Object(N.jsx)(G.a,{basic:!0,circular:!0,size:"large",icon:"user",color:i?"blue":"red"})}),Object(N.jsx)(V.a,{search:!0,selection:!0,clearable:!0,placeholder:"Select an account",options:o,onChange:function(e,t){var a;a=t.value,n(a),u(a)},value:i}),Object(N.jsx)(J,{accountSelected:i})]})]})})})}function J(e){var t=e.accountSelected,n=F().api,c=Object(a.useState)(0),r=Object(s.a)(c,2),i=r[0],l=r[1];return Object(a.useEffect)((function(){var e;return t&&n.query.system.account(t,(function(e){l(e.data.free.toHuman())})).then((function(t){e=t})).catch(console.error),function(){return e&&e()}}),[n,t]),t?Object(N.jsxs)(z.a,{pointing:"left",children:[Object(N.jsx)(H.a,{src:"/assets/favicon.ico",wrapped:!0,style:{width:"1.3rem",height:"auto",marginRight:"0.5rem",marginBottom:"0.18rem"}}),i]}):null}function q(e){var t=F(),n=t.api;return t.keyring.getPairs&&n.query?Object(N.jsx)(X,Object(x.a)({},e)):null}var Q=n(50),Z=n(35),$=n(894),ee=n(889),te=n(885),ne=n(17),ae=n.n(ne);function ce(e){var t=F().api.registry.chainDecimals;return e*new ae.a(10).pow(new ae.a(t))}function re(e){var t=Object(a.useState)(null),n=Object(s.a)(t,2),c=n[0],r=n[1],i=Object(a.useState)({addressTo:null,amount:0}),l=Object(s.a)(i,2),u=l[0],o=l[1],b=e.accountPair,d=function(e,t){return o((function(e){return Object(x.a)(Object(x.a)({},e),{},Object(Z.a)({},t.state,t.value))}))},O=u.addressTo,p=u.amount;return Object(N.jsxs)(j.a.Column,{width:8,children:[Object(N.jsx)($.a,{textAlign:"center",children:"Transfer MA Token"}),Object(N.jsxs)(ee.a,{children:[Object(N.jsx)(ee.a.Field,{style:{width:"500px",textAlign:"center",marginLeft:"2em"},children:Object(N.jsx)(te.a,{fluid:!0,label:"To",type:"text",placeholder:"address",state:"addressTo",onChange:d})}),Object(N.jsx)(ee.a.Field,{style:{width:"500px",marginLeft:"2em"},children:Object(N.jsx)(te.a,{fluid:!0,label:"Amount",type:"number",placeholder:"MA",state:"amount",onChange:d})}),Object(N.jsx)(ee.a.Field,{style:{textAlign:"center"},children:Object(N.jsx)(K,{accountPair:b,label:"Submit",type:"SIGNED-TX",setStatus:r,attrs:{palletRpc:"balances",callable:"transfer",inputParams:[O,ce(p)],paramFields:[!0,!0]}})}),Object(N.jsx)("div",{style:{overflowWrap:"break-word"},children:c})]})]})}var ie=n(14),se=function(e){if(!e)return"";for(var t="\n",n=0;n<e.length;n++)t+=e.slice(n,n+75),t+="\n",n+=75;return t};function le(e){var t=e.accountPair,n=Object(a.useState)(null),c=Object(s.a)(n,2),r=c[0],i=c[1],l=Object(a.useState)(""),u=Object(s.a)(l,2),o=u[0],d=u[1],O=Object(a.useState)(""),x=Object(s.a)(O,2),h=x[0],v=x[1],m=Object(a.useState)(""),y=Object(s.a)(m,2),S=y[0],g=y[1],E=Object(a.useState)(""),R=Object(s.a)(E,2),w=R[0],C=R[1],T=Object(a.useState)(""),k=Object(s.a)(T,2),P=k[0],A=k[1],_=Object(a.useState)(null),D=Object(s.a)(_,2),I=D[0],F=D[1],U=Object(a.useRef)(),L=Object(a.useState)(""),G=Object(s.a)(L,2),M=G[0],Y=G[1],B=function(e){try{Object(ie.base64Validate)(e.trim())}catch(n){return U.current.value=null,Y("File is not valid base64"),!1}var t=Object(ie.base64Decode)(e.trim());return 608===t.length||(U.current.value=null,Y("File is ".concat(t.length," bytes, expected 608")),!1)};return Object(N.jsxs)(N.Fragment,{children:[Object(N.jsx)(j.a.Column,{width:2}),Object(N.jsxs)(j.a.Column,{width:12,textAlign:"center",children:[Object(N.jsx)($.a,{textAlign:"center",children:"Private Transfer"}),Object(N.jsxs)(ee.a,{children:[Object(N.jsx)(z.a,{basic:!0,color:"teal",children:"Upload a private transfer file (608 bytes)"}),Object(N.jsxs)(ee.a.Field,{inline:"true",style:{textAlign:"center"},children:[Object(N.jsx)("input",{accept:".txt",id:"file",type:"file",onChange:function(){Y(""),i(null),d(null),v(null),g(null),C(null),A(null);var e=U.current.files[0];if(e){var t=new FileReader;t.readAsText(e),t.onload=function(){var e=Object(f.a)(p.a.mark((function e(t){var n;return p.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:n=t.target.result,B(n)&&(a=Object(ie.base64Decode)(n),i(a),d(Object(ie.base64Encode)(a.slice(0,96))),v(Object(ie.base64Encode)(a.slice(96,192))),g(Object(ie.base64Encode)(a.slice(192,304))),C(Object(ie.base64Encode)(a.slice(304,416))),A(Object(ie.base64Encode)(a.slice(416,608))));case 2:case"end":return e.stop()}var a}),e)})));return function(t){return e.apply(this,arguments)}}()}},ref:U,style:{paddingLeft:"9em",paddingTop:"1em",border:"0px"}}),Object(N.jsx)(b.a,{error:!0,onDismiss:function(){return Y("")},header:"Upload failed",content:M,visible:M.length})]}),r&&Object(N.jsxs)(ee.a.Field,{style:{maxWidth:"40%",textAlign:"left",paddingLeft:"19em"},children:[Object(N.jsxs)("p",{children:[Object(N.jsx)("b",{children:"Sender1:"}),se(o)]}),Object(N.jsxs)("p",{children:[Object(N.jsx)("b",{children:"Sender2:"}),se(h)]}),Object(N.jsxs)("p",{children:[Object(N.jsx)("b",{children:"Receiver1:"}),se(S)]}),Object(N.jsxs)("p",{children:[Object(N.jsx)("b",{children:"Receiver2:"}),se(w)]}),Object(N.jsxs)("p",{children:[Object(N.jsx)("b",{children:"Proof:"}),se(P)]})]}),Object(N.jsx)(ee.a.Field,{style:{textAlign:"center"},children:Object(N.jsx)(K,{accountPair:t,label:"Submit",type:"SIGNED-TX",setStatus:F,attrs:{palletRpc:"mantaPay",callable:"privateTransfer",inputParams:[r],paramFields:[!0]}})}),Object(N.jsx)("div",{style:{overflowWrap:"break-word"},children:I})]})]}),Object(N.jsx)(j.a.Column,{width:2})]})}function ue(e){var t=e.accountPair,n=Object(a.useState)(null),c=Object(s.a)(n,2),r=c[0],i=c[1],l=Object(a.useState)(null),u=Object(s.a)(l,2),o=u[0],d=u[1],O=Object(a.useState)(null),x=Object(s.a)(O,2),h=x[0],v=x[1],m=Object(a.useState)(null),y=Object(s.a)(m,2),S=y[0],g=y[1],E=Object(a.useState)(null),R=Object(s.a)(E,2),w=R[0],C=R[1],T=Object(a.useState)(null),k=Object(s.a)(T,2),P=k[0],A=k[1],_=Object(a.useState)(null),D=Object(s.a)(_,2),I=D[0],F=D[1],U=Object(a.useState)(""),L=Object(s.a)(U,2),G=L[0],M=L[1],Y=Object(a.useRef)(),B=function(e){try{Object(ie.base64Validate)(e)}catch(n){return Y.current.value=null,M("File is not valid base64"),!1}var t=Object(ie.base64Decode)(e);return 112===t.length||(Y.current.value=null,M("File is ".concat(t.length," bytes, expected ").concat(112)),!1)};return Object(N.jsxs)(N.Fragment,{children:[Object(N.jsx)(j.a.Column,{width:2}),Object(N.jsxs)(j.a.Column,{width:10,children:[Object(N.jsx)($.a,{textAlign:"center",children:"Mint Private Asset"}),Object(N.jsxs)(ee.a,{children:[Object(N.jsx)(z.a,{basic:!0,color:"teal",children:"Upload a mint file (112 bytes)"}),Object(N.jsxs)(ee.a.Field,{inline:"true",style:{textAlign:"center"},children:[Object(N.jsx)("input",{accept:".txt",id:"file",type:"file",onChange:function(){M(""),i(null),d(null),v(null),g(null),C(null),A(null);var e=Y.current.files[0];if(e){var t=new FileReader;t.readAsText(e),t.onload=function(){var e=Object(f.a)(p.a.mark((function e(t){var n;return p.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:n=t.target.result.trim(),B(n)&&(a=Object(ie.base64Decode)(n),d(new ae.a(a.slice(0,8),10,"le")),v(new ae.a(a.slice(8,16),10,"le")),g(Object(ie.base64Encode)(a.slice(16,48))),C(Object(ie.base64Encode)(a.slice(48,80))),A(Object(ie.base64Encode)(a.slice(80,112))),i(a));case 2:case"end":return e.stop()}var a}),e)})));return function(t){return e.apply(this,arguments)}}()}},ref:Y,style:{marginLeft:"8em",paddingTop:"1em",border:"0px"}}),Object(N.jsx)(b.a,{error:!0,onDismiss:function(){return M("")},header:"Upload failed",content:G,visible:G.length})]}),r?Object(N.jsxs)(ee.a.Field,{style:{maxWidth:"40%",textAlign:"left",paddingLeft:"4em"},children:[Object(N.jsxs)("p",{children:[Object(N.jsx)("b",{children:"Asset ID:"}),"\n",o.toString(10)]}),Object(N.jsxs)("p",{children:[Object(N.jsx)("b",{children:"Mint amount:"}),"\n",h.toString(10)]}),Object(N.jsxs)("p",{children:[Object(N.jsx)("b",{children:"cm:"}),"\n",S]}),Object(N.jsxs)("p",{children:[Object(N.jsx)("b",{children:"k:"}),"\n",w]}),Object(N.jsxs)("p",{children:[Object(N.jsx)("b",{children:"s:"}),"\n",P]})]}):Object(N.jsx)("div",{}),Object(N.jsx)(ee.a.Field,{style:{textAlign:"center"},children:Object(N.jsx)(K,{accountPair:t,label:"Submit",type:"SIGNED-TX",setStatus:F,attrs:{palletRpc:"mantaPay",callable:"mintPrivateAsset",inputParams:[r],paramFields:[!0]}})}),Object(N.jsx)("div",{style:{overflowWrap:"break-word"},children:I})]})]}),Object(N.jsx)(j.a.Column,{width:2})]})}function oe(e){var t=e.accountPair,n=Object(a.useState)(null),c=Object(s.a)(n,2),r=c[0],i=c[1],l=Object(a.useState)(null),u=Object(s.a)(l,2),o=u[0],d=u[1],O=Object(a.useState)(null),x=Object(s.a)(O,2),h=x[0],v=x[1],m=Object(a.useState)(null),y=Object(s.a)(m,2),S=y[0],g=y[1],E=Object(a.useState)(null),R=Object(s.a)(E,2),w=R[0],C=R[1],T=Object(a.useState)(null),k=Object(s.a)(T,2),P=k[0],A=k[1],_=Object(a.useState)(null),D=Object(s.a)(_,2),I=D[0],F=D[1],U=Object(a.useState)(null),L=Object(s.a)(U,2),G=L[0],M=L[1],Y=Object(a.useState)(""),B=Object(s.a)(Y,2),W=B[0],V=B[1],H=Object(a.useRef)(),X=function(e){try{Object(ie.base64Validate)(e)}catch(n){return H.current.value=null,V("File is not valid base64"),!1}var t=Object(ie.base64Decode)(e);return 512===t.length||(H.current.value=null,V("File is ".concat(t.length," bytes, expected ").concat(512)),!1)};return console.log("assetID",o),Object(N.jsxs)(N.Fragment,{children:[Object(N.jsx)(j.a.Column,{width:2}),Object(N.jsxs)(j.a.Column,{width:12,children:[Object(N.jsx)($.a,{textAlign:"center",children:"Reclaim Private Asset"}),Object(N.jsxs)(ee.a,{children:[Object(N.jsx)(z.a,{basic:!0,color:"teal",children:"Upload a reclaim file (512 bytes)"}),Object(N.jsxs)(ee.a.Field,{inline:"true",style:{textAlign:"center"},children:[Object(N.jsx)("input",{accept:".txt",id:"file",type:"file",onChange:function(){V(""),i(null),d(null),v(null),g(null),C(null),A(null),F(null);var e=H.current.files[0];if(e){var t=new FileReader;t.readAsText(e),t.onload=function(){var e=Object(f.a)(p.a.mark((function e(t){var n;return p.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:n=t.target.result.trim(),X(n)&&(a=Object(ie.base64Decode)(n),d(new ae.a(a.slice(0,8),10,"le")),v(new ae.a(a.slice(8,16),10,"le")),g(Object(ie.base64Encode)(a.slice(16,112))),C(Object(ie.base64Encode)(a.slice(112,208))),A(Object(ie.base64Encode)(a.slice(208,320))),F(Object(ie.base64Encode)(a.slice(320,512))),i(a));case 2:case"end":return e.stop()}var a}),e)})));return function(t){return e.apply(this,arguments)}}()}},ref:H,style:{paddingLeft:"9em",paddingTop:"1em",border:"0px"}}),Object(N.jsx)(b.a,{error:!0,onDismiss:function(){return V("")},header:"Upload failed",content:W,visible:W.length})]}),r?Object(N.jsxs)(ee.a.Field,{style:{maxWidth:"40%",textAlign:"left",paddingLeft:"19em"},children:[Object(N.jsxs)("p",{children:[Object(N.jsx)("b",{children:"Asset ID:"}),"\n",o.toString(10)]}),Object(N.jsxs)("p",{children:[Object(N.jsx)("b",{children:"Reclaim amount:"}),"\n",h.toString(10)]}),Object(N.jsxs)("p",{children:[Object(N.jsx)("b",{children:"Sender1:"}),se(S)]}),Object(N.jsxs)("p",{children:[Object(N.jsx)("b",{children:"Sender2:"}),se(w)]}),Object(N.jsxs)("p",{children:[Object(N.jsx)("b",{children:"Receiver:"}),se(P)]}),Object(N.jsxs)("p",{children:[Object(N.jsx)("b",{children:"Proof:"}),se(I)]})]}):Object(N.jsx)("div",{}),Object(N.jsx)(ee.a.Field,{style:{textAlign:"center"},children:Object(N.jsx)(K,{accountPair:t,label:"Submit",type:"SIGNED-TX",setStatus:M,attrs:{palletRpc:"mantaPay",callable:"reclaim",inputParams:[r],paramFields:[!0]}})}),Object(N.jsx)("div",{style:{overflowWrap:"break-word"},children:G})]})]}),Object(N.jsx)(j.a.Column,{width:2})]})}function je(e){var t=e.accountPair,n=[{key:"Mint",text:"Mint",value:"Mint"},{key:"Private transfer",text:"Private transfer",value:"Private transfer"},{key:"Reclaim",text:"Reclaim",value:"Reclaim"}],c=Object(a.useState)(n[0].value),r=Object(s.a)(c,2),i=r[0],l=r[1];console.log(i);var u=Object(N.jsx)("div",{});return"Mint"===i?u=Object(N.jsx)(ue,{accountPair:t}):"Private transfer"===i?u=Object(N.jsx)(le,{accountPair:t}):"Reclaim"===i&&(u=Object(N.jsx)(oe,{accountPair:t})),Object(N.jsxs)("div",{textAlign:"left",children:[Object(N.jsx)(V.a,{onChange:function(e,t){var n=t.value;l(n),console.log("value",n)},defaultValue:"Mint",selection:!0,options:n,style:{marginBottom:"4em"}}),u]})}function be(e){return Object(N.jsx)("div",{children:"todo"})}function de(e){var t=e.accountPair;return Object(N.jsxs)(Q.d,{children:[Object(N.jsx)(Q.a,{exact:!0,from:"/",to:"/ma_token"}),Object(N.jsx)(Q.a,{exact:!0,from:"/substrate-front-end-template",to:"/ma_token"}),Object(N.jsx)(Q.b,{path:"/ma_token",component:function(){return Object(N.jsx)(re,{accountPair:t})}}),Object(N.jsx)(Q.b,{path:"/labs",component:function(){return Object(N.jsx)(je,{accountPair:t})}}),Object(N.jsx)(Q.b,{path:"/governance",component:be})]})}function Oe(){var e,t=Object(a.useState)(null),n=Object(s.a)(t,2),c=n[0],r=n[1],i=F(),O=i.apiState,p=i.keyring,f=i.keyringState,x=i.apiError,h=c&&"READY"===f&&p.getPair(c),v=function(e){return Object(N.jsx)(u.a,{active:!0,children:Object(N.jsx)(o.a,{size:"small",children:e})})};if("ERROR"===O)return e=x,Object(N.jsx)(j.a,{centered:!0,columns:2,padded:!0,children:Object(N.jsx)(j.a.Column,{children:Object(N.jsx)(b.a,{negative:!0,compact:!0,floating:!0,header:"Error Connecting to Substrate",content:"".concat(JSON.stringify(e,null,4))})})});if("READY"!==O)return v("Connecting to Substrate");if("READY"!==f)return v("Loading accounts (please review any extension's authorization)");var m=Object(a.createRef)();return Object(N.jsx)("div",{ref:m,children:Object(N.jsxs)(l.a,{children:[Object(N.jsx)(q,{setAccountAddress:r}),Object(N.jsx)(d.a,{style:{paddingTop:"3em"},children:Object(N.jsx)(j.a,{centered:!0,children:Object(N.jsx)(de,{accountPair:h})})}),Object(N.jsx)(M,{})]})})}function pe(){return Object(N.jsx)(I,{children:Object(N.jsx)(Oe,{})})}i.a.render(Object(N.jsx)(pe,{}),document.getElementById("root"))}},[[821,1,2]]]);
//# sourceMappingURL=main.5d46a0ad.chunk.js.map