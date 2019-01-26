!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t(require("react"),require("react-dom")):"function"==typeof define&&define.amd?define(["react","react-dom"],t):"object"==typeof exports?exports.DragAndDock=t(require("react"),require("react-dom")):e.DragAndDock=t(e.React,e.ReactDOM)}(window,function(e,t){return function(e){var t={};function n(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}return n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(r,o,function(t){return e[t]}.bind(null,o));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=6)}([function(e,t,n){e.exports=n(4)()},function(t,n){t.exports=e},function(e,n){e.exports=t},function(e,t,n){e.exports=function(e,t){"use strict";function n(e,t){return e(t={exports:{}},t.exports),t.exports}function r(e){return function(){return e}}e=e&&e.hasOwnProperty("default")?e.default:e,t=t&&t.hasOwnProperty("default")?t.default:t;var o=function(){};o.thatReturns=r,o.thatReturnsFalse=r(!1),o.thatReturnsTrue=r(!0),o.thatReturnsNull=r(null),o.thatReturnsThis=function(){return this},o.thatReturnsArgument=function(e){return e};var a=o,i=function(e){};i=function(e){if(void 0===e)throw new Error("invariant requires an error message argument")};var u=function(e,t,n,r,o,a,u,s){if(i(t),!e){var c;if(void 0===t)c=new Error("Minified exception occurred; use the non-minified dev environment for the full error message and additional helpful warnings.");else{var l=[n,r,o,a,u,s],f=0;(c=new Error(t.replace(/%s/g,function(){return l[f++]}))).name="Invariant Violation"}throw c.framesToPop=1,c}},s=function(e,t){if(void 0===t)throw new Error("`warning(condition, format, ...args)` requires a warning message argument");if(0!==t.indexOf("Failed Composite propType: ")&&!e){for(var n=arguments.length,r=Array(n>2?n-2:0),o=2;o<n;o++)r[o-2]=arguments[o];(function(e){for(var t=arguments.length,n=Array(t>1?t-1:0),r=1;r<t;r++)n[r-1]=arguments[r];var o=0,a="Warning: "+e.replace(/%s/g,function(){return n[o++]});"undefined"!=typeof console&&console.error(a);try{throw new Error(a)}catch(e){}}).apply(void 0,[t].concat(r))}},c=Object.getOwnPropertySymbols,l=Object.prototype.hasOwnProperty,f=Object.prototype.propertyIsEnumerable,p=function(){try{if(!Object.assign)return!1;var e=new String("abc");if(e[5]="de","5"===Object.getOwnPropertyNames(e)[0])return!1;for(var t={},n=0;n<10;n++)t["_"+String.fromCharCode(n)]=n;var r=Object.getOwnPropertyNames(t).map(function(e){return t[e]});if("0123456789"!==r.join(""))return!1;var o={};return"abcdefghijklmnopqrst".split("").forEach(function(e){o[e]=e}),"abcdefghijklmnopqrst"===Object.keys(Object.assign({},o)).join("")}catch(e){return!1}}()?Object.assign:function(e,t){for(var n,r,o=function(e){if(null==e)throw new TypeError("Object.assign cannot be called with null or undefined");return Object(e)}(e),a=1;a<arguments.length;a++){for(var i in n=Object(arguments[a]))l.call(n,i)&&(o[i]=n[i]);if(c){r=c(n);for(var u=0;u<r.length;u++)f.call(n,r[u])&&(o[r[u]]=n[r[u]])}}return o},d="SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED",y=u,h=s,g=d,b={},m=function(e,t,n,r,o){for(var a in e)if(e.hasOwnProperty(a)){var i;try{y("function"==typeof e[a],"%s: %s type `%s` is invalid; it must be a function, usually from the `prop-types` package, but received `%s`.",r||"React class",n,a,typeof e[a]),i=e[a](t,a,r,n,null,g)}catch(e){i=e}if(h(!i||i instanceof Error,"%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).",r||"React class",n,a,typeof i),i instanceof Error&&!(i.message in b)){b[i.message]=!0;var u=o?o():"";h(!1,"Failed %s type: %s%s",n,i.message,null!=u?u:"")}}},v=function(e,t){var n="function"==typeof Symbol&&Symbol.iterator,r="@@iterator",o="<<anonymous>>",i={array:f("array"),bool:f("boolean"),func:f("function"),number:f("number"),object:f("object"),string:f("string"),symbol:f("symbol"),any:l(a.thatReturnsNull),arrayOf:function(e){return l(function(t,n,r,o,a){if("function"!=typeof e)return new c("Property `"+a+"` of component `"+r+"` has invalid PropType notation inside arrayOf.");var i=t[n];if(!Array.isArray(i)){var u=h(i);return new c("Invalid "+o+" `"+a+"` of type `"+u+"` supplied to `"+r+"`, expected an array.")}for(var s=0;s<i.length;s++){var l=e(i,s,r,o,a+"["+s+"]",d);if(l instanceof Error)return l}return null})},element:l(function(t,n,r,o,a){var i=t[n];if(!e(i)){var u=h(i);return new c("Invalid "+o+" `"+a+"` of type `"+u+"` supplied to `"+r+"`, expected a single ReactElement.")}return null}),instanceOf:function(e){return l(function(t,n,r,a,i){if(!(t[n]instanceof e)){var u=e.name||o,s=(l=t[n]).constructor&&l.constructor.name?l.constructor.name:o;return new c("Invalid "+a+" `"+i+"` of type `"+s+"` supplied to `"+r+"`, expected instance of `"+u+"`.")}var l;return null})},node:l(function(e,t,n,r,o){return y(e[t])?null:new c("Invalid "+r+" `"+o+"` supplied to `"+n+"`, expected a ReactNode.")}),objectOf:function(e){return l(function(t,n,r,o,a){if("function"!=typeof e)return new c("Property `"+a+"` of component `"+r+"` has invalid PropType notation inside objectOf.");var i=t[n],u=h(i);if("object"!==u)return new c("Invalid "+o+" `"+a+"` of type `"+u+"` supplied to `"+r+"`, expected an object.");for(var s in i)if(i.hasOwnProperty(s)){var l=e(i,s,r,o,a+"."+s,d);if(l instanceof Error)return l}return null})},oneOf:function(e){return Array.isArray(e)?l(function(t,n,r,o,a){for(var i=t[n],u=0;u<e.length;u++)if(s=i,l=e[u],s===l?0!==s||1/s==1/l:s!=s&&l!=l)return null;var s,l,f=JSON.stringify(e);return new c("Invalid "+o+" `"+a+"` of value `"+i+"` supplied to `"+r+"`, expected one of "+f+".")}):(s(!1,"Invalid argument supplied to oneOf, expected an instance of array."),a.thatReturnsNull)},oneOfType:function(e){if(!Array.isArray(e))return s(!1,"Invalid argument supplied to oneOfType, expected an instance of array."),a.thatReturnsNull;for(var t=0;t<e.length;t++){var n=e[t];if("function"!=typeof n)return s(!1,"Invalid argument supplied to oneOfType. Expected an array of check functions, but received %s at index %s.",b(n),t),a.thatReturnsNull}return l(function(t,n,r,o,a){for(var i=0;i<e.length;i++){var u=e[i];if(null==u(t,n,r,o,a,d))return null}return new c("Invalid "+o+" `"+a+"` supplied to `"+r+"`.")})},shape:function(e){return l(function(t,n,r,o,a){var i=t[n],u=h(i);if("object"!==u)return new c("Invalid "+o+" `"+a+"` of type `"+u+"` supplied to `"+r+"`, expected `object`.");for(var s in e){var l=e[s];if(l){var f=l(i,s,r,o,a+"."+s,d);if(f)return f}}return null})},exact:function(e){return l(function(t,n,r,o,a){var i=t[n],u=h(i);if("object"!==u)return new c("Invalid "+o+" `"+a+"` of type `"+u+"` supplied to `"+r+"`, expected `object`.");var s=p({},t[n],e);for(var l in s){var f=e[l];if(!f)return new c("Invalid "+o+" `"+a+"` key `"+l+"` supplied to `"+r+"`.\nBad object: "+JSON.stringify(t[n],null,"  ")+"\nValid keys: "+JSON.stringify(Object.keys(e),null,"  "));var y=f(i,l,r,o,a+"."+l,d);if(y)return y}return null})}};function c(e){this.message=e,this.stack=""}function l(e){var n={},r=0;function a(a,i,l,f,p,y,h){if(f=f||o,y=y||l,h!==d)if(t)u(!1,"Calling PropTypes validators directly is not supported by the `prop-types` package. Use `PropTypes.checkPropTypes()` to call them. Read more at http://fb.me/use-check-prop-types");else if("undefined"!=typeof console){var g=f+":"+l;!n[g]&&r<3&&(s(!1,"You are manually calling a React.PropTypes validation function for the `%s` prop on `%s`. This is deprecated and will throw in the standalone `prop-types` package. You may be seeing this warning due to a third-party PropTypes library. See https://fb.me/react-warning-dont-call-proptypes for details.",y,f),n[g]=!0,r++)}return null==i[l]?a?null===i[l]?new c("The "+p+" `"+y+"` is marked as required in `"+f+"`, but its value is `null`."):new c("The "+p+" `"+y+"` is marked as required in `"+f+"`, but its value is `undefined`."):null:e(i,l,f,p,y)}var i=a.bind(null,!1);return i.isRequired=a.bind(null,!0),i}function f(e){return l(function(t,n,r,o,a,i){var u=t[n];if(h(u)!==e){var s=g(u);return new c("Invalid "+o+" `"+a+"` of type `"+s+"` supplied to `"+r+"`, expected `"+e+"`.")}return null})}function y(t){switch(typeof t){case"number":case"string":case"undefined":return!0;case"boolean":return!t;case"object":if(Array.isArray(t))return t.every(y);if(null===t||e(t))return!0;var o=function(e){var t=e&&(n&&e[n]||e[r]);if("function"==typeof t)return t}(t);if(!o)return!1;var a,i=o.call(t);if(o!==t.entries){for(;!(a=i.next()).done;)if(!y(a.value))return!1}else for(;!(a=i.next()).done;){var u=a.value;if(u&&!y(u[1]))return!1}return!0;default:return!1}}function h(e){var t=typeof e;return Array.isArray(e)?"array":e instanceof RegExp?"object":function(e,t){return"symbol"===e||("Symbol"===t["@@toStringTag"]||"function"==typeof Symbol&&t instanceof Symbol)}(t,e)?"symbol":t}function g(e){if(null==e)return""+e;var t=h(e);if("object"===t){if(e instanceof Date)return"date";if(e instanceof RegExp)return"regexp"}return t}function b(e){var t=g(e);switch(t){case"array":case"object":return"an "+t;case"boolean":case"date":case"regexp":return"a "+t;default:return t}}return c.prototype=Error.prototype,i.checkPropTypes=m,i.PropTypes=i,i},w=n(function(e){var t="function"==typeof Symbol&&Symbol.for&&Symbol.for("react.element")||60103;e.exports=v(function(e){return"object"==typeof e&&null!==e&&e.$$typeof===t},!0)}),O=n(function(e){
/*!
	  Copyright (c) 2016 Jed Watson.
	  Licensed under the MIT License (MIT), see
	  http://jedwatson.github.io/classnames
	*/
!function(){var t={}.hasOwnProperty;function n(){for(var e=[],r=0;r<arguments.length;r++){var o=arguments[r];if(o){var a=typeof o;if("string"===a||"number"===a)e.push(o);else if(Array.isArray(o))e.push(n.apply(null,o));else if("object"===a)for(var i in o)t.call(o,i)&&o[i]&&e.push(i)}}return e.join(" ")}e.exports?e.exports=n:window.classNames=n}()});function S(e,t){for(var n=0,r=e.length;n<r;n++)if(t.apply(t,[e[n],n,e]))return e[n]}function j(e){return"function"==typeof e||"[object Function]"===Object.prototype.toString.call(e)}function T(e){return"number"==typeof e&&!isNaN(e)}function x(e){return parseInt(e,10)}function P(e,t,n){if(e[t])return new Error("Invalid prop "+t+" passed to "+n+" - do not set this, set it on the child.")}var D=["Moz","Webkit","O","ms"];function E(e,t){return t?""+t+function(e){for(var t="",n=!0,r=0;r<e.length;r++)n?(t+=e[r].toUpperCase(),n=!1):"-"===e[r]?n=!0:t+=e[r];return t}(e):e}var _=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"transform";if("undefined"==typeof window||void 0===window.document)return"";var t=window.document.documentElement.style;if(e in t)return"";for(var n=0;n<D.length;n++)if(E(e,D[n])in t)return D[n];return""}(),k=function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")},R=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),C=function(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e},N=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},M=function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)},A=function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t},Y=function(e,t){if(Array.isArray(e))return e;if(Symbol.iterator in Object(e))return function(e,t){var n=[],r=!0,o=!1,a=void 0;try{for(var i,u=e[Symbol.iterator]();!(r=(i=u.next()).done)&&(n.push(i.value),!t||n.length!==t);r=!0);}catch(e){o=!0,a=e}finally{try{!r&&u.return&&u.return()}finally{if(o)throw a}}return n}(e,t);throw new TypeError("Invalid attempt to destructure non-iterable instance")},I="";function q(e,t){return I||(I=S(["matches","webkitMatchesSelector","mozMatchesSelector","msMatchesSelector","oMatchesSelector"],function(t){return j(e[t])})),!!j(e[I])&&e[I](t)}function X(e,t,n){var r=e;do{if(q(r,t))return!0;if(r===n)return!1;r=r.parentNode}while(r);return!1}function L(e,t,n){e&&(e.attachEvent?e.attachEvent("on"+t,n):e.addEventListener?e.addEventListener(t,n,!0):e["on"+t]=n)}function U(e,t,n){e&&(e.detachEvent?e.detachEvent("on"+t,n):e.removeEventListener?e.removeEventListener(t,n,!0):e["on"+t]=null)}function W(e){var t=e.clientHeight,n=e.ownerDocument.defaultView.getComputedStyle(e);return t+=x(n.borderTopWidth),t+=x(n.borderBottomWidth)}function B(e){var t=e.clientWidth,n=e.ownerDocument.defaultView.getComputedStyle(e);return t+=x(n.borderLeftWidth),t+=x(n.borderRightWidth)}function V(e){var t=e.clientHeight,n=e.ownerDocument.defaultView.getComputedStyle(e);return t-=x(n.paddingTop),t-=x(n.paddingBottom)}function H(e){var t=e.clientWidth,n=e.ownerDocument.defaultView.getComputedStyle(e);return t-=x(n.paddingLeft),t-=x(n.paddingRight)}function F(e){if(e){var t,n,r=e.getElementById("react-draggable-style-el");r||((r=e.createElement("style")).type="text/css",r.id="react-draggable-style-el",r.innerHTML=".react-draggable-transparent-selection *::-moz-selection {background: transparent;}\n",r.innerHTML+=".react-draggable-transparent-selection *::selection {background: transparent;}\n",e.getElementsByTagName("head")[0].appendChild(r)),e.body&&(t=e.body,n="react-draggable-transparent-selection",t.classList?t.classList.add(n):t.className.match(new RegExp("(?:^|\\s)"+n+"(?!\\S)"))||(t.className+=" "+n))}}function z(e){try{e&&e.body&&(t=e.body,n="react-draggable-transparent-selection",t.classList?t.classList.remove(n):t.className=t.className.replace(new RegExp("(?:^|\\s)"+n+"(?!\\S)","g"),"")),e.selection?e.selection.empty():window.getSelection().removeAllRanges()}catch(e){}var t,n}function G(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return N({touchAction:"none"},e)}function J(e){return"both"===e.props.axis||"x"===e.props.axis}function $(e){return"both"===e.props.axis||"y"===e.props.axis}function K(e,t,n){var r="number"==typeof t?function(e,t){return e.targetTouches&&S(e.targetTouches,function(e){return t===e.identifier})||e.changedTouches&&S(e.changedTouches,function(e){return t===e.identifier})}(e,t):null;if("number"==typeof t&&!r)return null;var o=ee(n),a=n.props.offsetParent||o.offsetParent||o.ownerDocument.body;return function(e,t){var n=t===t.ownerDocument.body?{left:0,top:0}:t.getBoundingClientRect(),r=e.clientX+t.scrollLeft-n.left,o=e.clientY+t.scrollTop-n.top;return{x:r,y:o}}(r||e,a)}function Q(e,t,n){var r=e.state,o=!T(r.lastX),a=ee(e);return o?{node:a,deltaX:0,deltaY:0,lastX:t,lastY:n,x:t,y:n}:{node:a,deltaX:t-r.lastX,deltaY:n-r.lastY,lastX:r.lastX,lastY:r.lastY,x:t,y:n}}function Z(e,t){var n=e.props.scale;return{node:t.node,x:e.state.x+t.deltaX/n,y:e.state.y+t.deltaY/n,deltaX:t.deltaX/n,deltaY:t.deltaY/n,lastX:e.state.x,lastY:e.state.y}}function ee(t){var n=e.findDOMNode(t);if(!n)throw new Error("<DraggableCore>: Unmounted during event!");return n}var te={touch:{start:"touchstart",move:"touchmove",stop:"touchend"},mouse:{start:"mousedown",move:"mousemove",stop:"mouseup"}},ne=te.mouse,re=function(n){function r(){var t,n,o;k(this,r);for(var a=arguments.length,i=Array(a),u=0;u<a;u++)i[u]=arguments[u];return o=A(this,(t=r.__proto__||Object.getPrototypeOf(r)).call.apply(t,[this].concat(i))),n=o,o.state={dragging:!1,lastX:NaN,lastY:NaN,touchIdentifier:null},o.handleDragStart=function(t){if(o.props.onMouseDown(t),!o.props.allowAnyClick&&"number"==typeof t.button&&0!==t.button)return!1;var n=e.findDOMNode(o);if(!n||!n.ownerDocument||!n.ownerDocument.body)throw new Error("<DraggableCore> not mounted on DragStart!");var r=n.ownerDocument;if(!(o.props.disabled||!(t.target instanceof r.defaultView.Node)||o.props.handle&&!X(t.target,o.props.handle,n)||o.props.cancel&&X(t.target,o.props.cancel,n))){var a=function(e){return e.targetTouches&&e.targetTouches[0]?e.targetTouches[0].identifier:e.changedTouches&&e.changedTouches[0]?e.changedTouches[0].identifier:void 0}(t);o.setState({touchIdentifier:a});var i=K(t,a,o);if(null!=i){var u=i.x,s=i.y,c=Q(o,u,s);o.props.onStart;var l=o.props.onStart(t,c);!1!==l&&(o.props.enableUserSelectHack&&F(r),o.setState({dragging:!0,lastX:u,lastY:s}),L(r,ne.move,o.handleDrag),L(r,ne.stop,o.handleDragStop))}}},o.handleDrag=function(e){"touchmove"===e.type&&e.preventDefault();var t=K(e,o.state.touchIdentifier,o);if(null!=t){var n=t.x,r=t.y;if(Array.isArray(o.props.grid)){var a=n-o.state.lastX,i=r-o.state.lastY,u=function(e,t,n){var r=Math.round(t/e[0])*e[0],o=Math.round(n/e[1])*e[1];return[r,o]}(o.props.grid,a,i),s=Y(u,2);if(a=s[0],i=s[1],!a&&!i)return;n=o.state.lastX+a,r=o.state.lastY+i}var c=Q(o,n,r),l=o.props.onDrag(e,c);if(!1!==l)o.setState({lastX:n,lastY:r});else try{o.handleDragStop(new MouseEvent("mouseup"))}catch(e){var f=document.createEvent("MouseEvents");f.initMouseEvent("mouseup",!0,!0,window,0,0,0,0,0,!1,!1,!1,!1,0,null),o.handleDragStop(f)}}},o.handleDragStop=function(t){if(o.state.dragging){var n=K(t,o.state.touchIdentifier,o);if(null!=n){var r=n.x,a=n.y,i=Q(o,r,a),u=e.findDOMNode(o);u&&o.props.enableUserSelectHack&&z(u.ownerDocument),o.setState({dragging:!1,lastX:NaN,lastY:NaN}),o.props.onStop(t,i),u&&(U(u.ownerDocument,ne.move,o.handleDrag),U(u.ownerDocument,ne.stop,o.handleDragStop))}}},o.onMouseDown=function(e){return ne=te.mouse,o.handleDragStart(e)},o.onMouseUp=function(e){return ne=te.mouse,o.handleDragStop(e)},o.onTouchStart=function(e){return ne=te.touch,o.handleDragStart(e)},o.onTouchEnd=function(e){return ne=te.touch,o.handleDragStop(e)},A(o,n)}return M(r,n),R(r,[{key:"componentWillUnmount",value:function(){var t=e.findDOMNode(this);if(t){var n=t.ownerDocument;U(n,te.mouse.move,this.handleDrag),U(n,te.touch.move,this.handleDrag),U(n,te.mouse.stop,this.handleDragStop),U(n,te.touch.stop,this.handleDragStop),this.props.enableUserSelectHack&&z(n)}}},{key:"render",value:function(){return t.cloneElement(t.Children.only(this.props.children),{style:G(this.props.children.props.style),onMouseDown:this.onMouseDown,onTouchStart:this.onTouchStart,onMouseUp:this.onMouseUp,onTouchEnd:this.onTouchEnd})}}]),r}(t.Component);re.displayName="DraggableCore",re.propTypes={allowAnyClick:w.bool,disabled:w.bool,enableUserSelectHack:w.bool,offsetParent:function(e,t){if(e[t]&&1!==e[t].nodeType)throw new Error("Draggable's offsetParent must be a DOM Node.")},grid:w.arrayOf(w.number),scale:w.number,handle:w.string,cancel:w.string,onStart:w.func,onDrag:w.func,onStop:w.func,onMouseDown:w.func,className:P,style:P,transform:P},re.defaultProps={allowAnyClick:!1,cancel:null,disabled:!1,enableUserSelectHack:!0,offsetParent:null,handle:null,grid:null,transform:null,onStart:function(){},onDrag:function(){},onStop:function(){},onMouseDown:function(){}};var oe=function(n){function r(e){k(this,r);var t=A(this,(r.__proto__||Object.getPrototypeOf(r)).call(this,e));return t.onDragStart=function(e,n){var r=t.props.onStart(e,Z(t,n));if(!1===r)return!1;t.setState({dragging:!0,dragged:!0})},t.onDrag=function(e,n){if(!t.state.dragging)return!1;var r=Z(t,n),o={x:r.x,y:r.y};if(t.props.bounds){var a=o.x,i=o.y;o.x+=t.state.slackX,o.y+=t.state.slackY;var u=function(e,t,n){if(!e.props.bounds)return[t,n];var r=e.props.bounds;r="string"==typeof r?r:function(e){return{left:e.left,top:e.top,right:e.right,bottom:e.bottom}}(r);var o=ee(e);if("string"==typeof r){var a=o.ownerDocument,i=a.defaultView,u=void 0;if(!((u="parent"===r?o.parentNode:a.querySelector(r))instanceof i.HTMLElement))throw new Error('Bounds selector "'+r+'" could not find an element.');var s=i.getComputedStyle(o),c=i.getComputedStyle(u);r={left:-o.offsetLeft+x(c.paddingLeft)+x(s.marginLeft),top:-o.offsetTop+x(c.paddingTop)+x(s.marginTop),right:H(u)-B(o)-o.offsetLeft+x(c.paddingRight)-x(s.marginRight),bottom:V(u)-W(o)-o.offsetTop+x(c.paddingBottom)-x(s.marginBottom)}}return T(r.right)&&(t=Math.min(t,r.right)),T(r.bottom)&&(n=Math.min(n,r.bottom)),T(r.left)&&(t=Math.max(t,r.left)),T(r.top)&&(n=Math.max(n,r.top)),[t,n]}(t,o.x,o.y),s=Y(u,2),c=s[0],l=s[1];o.x=c,o.y=l,o.slackX=t.state.slackX+(a-o.x),o.slackY=t.state.slackY+(i-o.y),r.x=o.x,r.y=o.y,r.deltaX=o.x-t.state.x,r.deltaY=o.y-t.state.y}var f=t.props.onDrag(e,r);if(!1===f)return!1;t.setState(o)},t.onDragStop=function(e,n){if(!t.state.dragging)return!1;var r=t.props.onStop(e,Z(t,n));if(!1===r)return!1;var o={dragging:!1,slackX:0,slackY:0},a=Boolean(t.props.position);if(a){var i=t.props.position,u=i.x,s=i.y;o.x=u,o.y=s}t.setState(o)},t.state={dragging:!1,dragged:!1,x:e.position?e.position.x:e.defaultPosition.x,y:e.position?e.position.y:e.defaultPosition.y,slackX:0,slackY:0,isElementSVG:!1},t}return M(r,n),R(r,[{key:"componentWillMount",value:function(){!this.props.position||this.props.onDrag||this.props.onStop||console.warn("A `position` was applied to this <Draggable>, without drag handlers. This will make this component effectively undraggable. Please attach `onDrag` or `onStop` handlers so you can adjust the `position` of this element.")}},{key:"componentDidMount",value:function(){void 0!==window.SVGElement&&e.findDOMNode(this)instanceof window.SVGElement&&this.setState({isElementSVG:!0})}},{key:"componentWillReceiveProps",value:function(e){!e.position||this.props.position&&e.position.x===this.props.position.x&&e.position.y===this.props.position.y||this.setState({x:e.position.x,y:e.position.y})}},{key:"componentWillUnmount",value:function(){this.setState({dragging:!1})}},{key:"render",value:function(){var e,n,r,o,a={},i=null,u=Boolean(this.props.position),s=!u||this.state.dragging,c=this.props.position||this.props.defaultPosition,l={x:J(this)&&s?this.state.x:c.x,y:$(this)&&s?this.state.y:c.y};this.state.isElementSVG?(r=(n=l).x,o=n.y,i="translate("+r+","+o+")"):a=function(e){var t=e.x,n=e.y;return C({},E("transform",_),"translate("+t+"px,"+n+"px)")}(l);var f=this.props,p=f.defaultClassName,d=f.defaultClassNameDragging,y=f.defaultClassNameDragged,h=t.Children.only(this.props.children),g=O(h.props.className||"",p,(C(e={},d,this.state.dragging),C(e,y,this.state.dragged),e));return t.createElement(re,N({},this.props,{onStart:this.onDragStart,onDrag:this.onDrag,onStop:this.onDragStop}),t.cloneElement(h,{className:g,style:N({},h.props.style,a),transform:i}))}}]),r}(t.Component);return oe.displayName="Draggable",oe.propTypes=N({},re.propTypes,{axis:w.oneOf(["both","x","y","none"]),bounds:w.oneOfType([w.shape({left:w.number,right:w.number,top:w.number,bottom:w.number}),w.string,w.oneOf([!1])]),defaultClassName:w.string,defaultClassNameDragging:w.string,defaultClassNameDragged:w.string,defaultPosition:w.shape({x:w.number,y:w.number}),position:w.shape({x:w.number,y:w.number}),className:P,style:P,transform:P}),oe.defaultProps=N({},re.defaultProps,{axis:"both",bounds:!1,defaultClassName:"react-draggable",defaultClassNameDragging:"react-draggable-dragging",defaultClassNameDragged:"react-draggable-dragged",defaultPosition:{x:0,y:0},position:null,scale:1}),oe.default=oe,oe.DraggableCore=re,oe}(n(2),n(1))},function(e,t,n){"use strict";var r=n(5);function o(){}e.exports=function(){function e(e,t,n,o,a,i){if(i!==r){var u=new Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types");throw u.name="Invariant Violation",u}}function t(){return e}e.isRequired=e;var n={array:e,bool:e,func:e,number:e,object:e,string:e,symbol:e,any:e,arrayOf:t,element:e,instanceOf:t,node:e,objectOf:t,oneOf:t,oneOfType:t,shape:t,exact:t};return n.checkPropTypes=o,n.PropTypes=n,n}},function(e,t,n){"use strict";e.exports="SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED"},function(e,t,n){"use strict";n.r(t);var r=n(1),o=n.n(r),a=n(0),i=n.n(a),u=o.a.createContext(null),s=n(2),c=n.n(s),l=n(3),f=n.n(l);function p(e){return(p="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function d(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{},r=Object.keys(n);"function"==typeof Object.getOwnPropertySymbols&&(r=r.concat(Object.getOwnPropertySymbols(n).filter(function(e){return Object.getOwnPropertyDescriptor(n,e).enumerable}))),r.forEach(function(t){m(e,t,n[t])})}return e}function y(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function h(e){return(h=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function g(e,t){return(g=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function b(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function m(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var v=function(e){return e&&e.current?e.current.getBoundingClientRect():{}},w=function(e){function t(e){var n,r,a;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t),r=this,a=h(t).call(this,e),n=!a||"object"!==p(a)&&"function"!=typeof a?b(r):a,m(b(b(n)),"didSnappedTargetChange",function(){var e=n.getSnappedTarget(),t=v(e),r=t.height,o=t.width,a=t.left,i=t.top,u=n.prevSnappedTargeDimensions,s=u.height,c=u.width,l=u.left,f=u.top;return n.prevSnappedTargeDimensions={height:r,width:o,left:a,top:i},r!==s||o!==c||a!==l||i!==f}),m(b(b(n)),"getDraggedOverTarget",function(e){var t=n.props.context.targets,r=null;return t.forEach(function(t){var n=v(t.ref),o=n.bottom,a=n.left,i=n.right,u=n.top,s=e.clientX>a&&e.clientX<i,c=e.clientY>u&&e.clientY<o;s&&c&&(r=t.ref)}),r}),m(b(b(n)),"getSnappedTarget",function(){return n.props.context.panels.get(n.ref).snappedTarget}),m(b(b(n)),"handleDrag",function(e){n.draggedOverTarget=n.getDraggedOverTarget(e)}),m(b(b(n)),"handleDragStop",function(e,t){n.deltaX=t.x,n.deltaY=t.y,(0,n.props.context.onDrop)(n.ref,n.draggedOverTarget)}),n.deltaX=0,n.deltaY=0,n.el=document.createElement("div"),n.isDraggedOverTarget=!1,n.ref=o.a.createRef(),n.prevSnappedTargeDimensions={},n.state={height:null,width:null,left:null,top:null},n}var n,r,a;return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&g(e,t)}(t,o.a.Component),n=t,(r=[{key:"componentDidMount",value:function(){document.body.appendChild(this.el),this.props.context.registerPanel(this.ref)}},{key:"componentDidUpdate",value:function(){var e=this.getSnappedTarget(),t=this.didSnappedTargetChange();if(e&&t){var n=v(e),r=n.height,o=n.width,a=n.left,i=n.top;this.setState({height:r,width:o,left:a-this.deltaX,top:i-this.deltaY})}}},{key:"componentWillUnmount",value:function(){document.body.removeChild(this.el)}},{key:"render",value:function(){var e=this.props,t=e.children,n=e.styles,r=e.title,a=this.state,i=a.height,u=a.width,s=a.left,l=a.top,p=n.handle||{},y=n.root||{},h=o.a.createElement(f.a,{handle:".handle",onStart:this.handleDragStart,onDrag:this.handleDrag,onStop:this.handleDragStop},o.a.createElement("div",{ref:this.ref,style:d({background:"white",border:"1px solid black",boxSizing:"border-box",height:i,width:u,position:"fixed",left:s,top:l},y)},o.a.createElement("div",{className:"handle",style:d({background:"#ccc"},p)},r),o.a.createElement("div",null,t)));return c.a.createPortal(h,this.el)}}])&&y(n.prototype,r),a&&y(n,a),t}();w.propTypes={children:i.a.oneOfType([i.a.element,i.a.string]).isRequired,context:i.a.shape({onDrop:i.a.func.isRequired,panels:i.a.instanceOf(Map).isRequired,registerPanel:i.a.func.isRequired,registerTarget:i.a.func.isRequired,targets:i.a.instanceOf(Map).isRequired}).isRequired,styles:i.a.shape({handle:i.a.object,root:i.a.object}),title:i.a.string},w.defaultProps={styles:{},title:"Panel"};var O=w;function S(e){return(S="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function j(){return(j=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e}).apply(this,arguments)}function T(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function x(e,t){return!t||"object"!==S(t)&&"function"!=typeof t?function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e):t}function P(e){return(P=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function D(e,t){return(D=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}var E=function(e){function t(){return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t),x(this,P(t).apply(this,arguments))}var n,a,i;return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&D(e,t)}(t,r["Component"]),n=t,(a=[{key:"render",value:function(){var e=this,t=this.props.children;return o.a.createElement(u.Consumer,null,function(n){return o.a.createElement(O,j({},e.props,{context:n}),t)})}}])&&T(n.prototype,a),i&&T(n,i),t}();E.propTypes={children:i.a.oneOfType([i.a.arrayOf(i.a.node),i.a.node]).isRequired};var _=E;function k(e){return(k="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function R(e){return function(e){if(Array.isArray(e)){for(var t=0,n=new Array(e.length);t<e.length;t++)n[t]=e[t];return n}}(e)||function(e){if(Symbol.iterator in Object(e)||"[object Arguments]"===Object.prototype.toString.call(e))return Array.from(e)}(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance")}()}function C(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function N(e){return(N=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function M(e,t){return(M=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function A(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function Y(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var I=function(e){function t(){var e,n,r;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t),n=this,r=N(t).call(this),e=!r||"object"!==k(r)&&"function"!=typeof r?A(n):r,Y(A(A(e)),"registerPanel",function(t){var n=A(A(e)).panels;if(!n.has(t)){var r=new Map(R(n)),o={ref:t,snappedTarget:null};r.set(t,o),e.panels=r,e.setState({panels:e.panels})}}),Y(A(A(e)),"registerTarget",function(t){var n=A(A(e)).targets;if(!n.has(t)){var r=new Map(R(n)),o={ref:t};r.set(t,o),e.targets=r,e.setState({targets:e.targets})}}),Y(A(A(e)),"updateTarget",function(t){var n=A(A(e)).targets,r=new Map(R(n)),o={ref:t};r.set(t,o),e.targets=r,e.setState({targets:e.targets})}),Y(A(A(e)),"handleDrop",function(t,n){var r=function(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{},r=Object.keys(n);"function"==typeof Object.getOwnPropertySymbols&&(r=r.concat(Object.getOwnPropertySymbols(n).filter(function(e){return Object.getOwnPropertyDescriptor(n,e).enumerable}))),r.forEach(function(t){Y(e,t,n[t])})}return e}({},e.panels.get(t),{snappedTarget:n||null});e.panels.set(t,r),e.setState({panels:e.panels})}),e.panels=new Map,e.targets=new Map,e.state={panels:e.panels,targets:e.targets},e}var n,a,i;return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&M(e,t)}(t,r["Component"]),n=t,(a=[{key:"render",value:function(){var e=this.props.children,t=this.state,n=t.panels,r=t.targets,a={onDrop:this.handleDrop,panels:n,registerPanel:this.registerPanel,registerTarget:this.registerTarget,targets:r,updateTarget:this.updateTarget};return o.a.createElement(u.Provider,{value:a},e)}}])&&C(n.prototype,a),i&&C(n,i),t}();I.propTypes={children:i.a.oneOfType([i.a.element,i.a.arrayOf(i.a.element)]).isRequired};var q=I;function X(e){return(X="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function L(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function U(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function W(e,t){return!t||"object"!==X(t)&&"function"!=typeof t?function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e):t}function B(e){return(B=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function V(e,t){return(V=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}var H=function(e){function t(){var e;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t),(e=W(this,B(t).call(this))).ref=o.a.createRef(),e}var n,a,i;return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&V(e,t)}(t,r["Component"]),n=t,(a=[{key:"componentDidMount",value:function(){var e=this,t=this.props.context;t.registerTarget(this.ref);var n=this.ref.current;new ResizeObserver(function(){t.updateTarget(e.ref)}).observe(n)}},{key:"render",value:function(){var e=this.props.children,t=function(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{},r=Object.keys(n);"function"==typeof Object.getOwnPropertySymbols&&(r=r.concat(Object.getOwnPropertySymbols(n).filter(function(e){return Object.getOwnPropertyDescriptor(n,e).enumerable}))),r.forEach(function(t){L(e,t,n[t])})}return e}({},e.props,{ref:this.ref});return o.a.cloneElement(e,t)}}])&&U(n.prototype,a),i&&U(n,i),t}();H.propTypes={children:i.a.element.isRequired,context:i.a.shape({panels:i.a.instanceOf(Map).isRequired,registerPanel:i.a.func.isRequired,registerTarget:i.a.func.isRequired,onDrop:i.a.func.isRequired,targets:i.a.instanceOf(Map).isRequired}).isRequired};var F=H;function z(e){return(z="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function G(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function J(e,t){return!t||"object"!==z(t)&&"function"!=typeof t?function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e):t}function $(e){return($=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function K(e,t){return(K=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}var Q=function(e){function t(){return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t),J(this,$(t).apply(this,arguments))}var n,a,i;return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&K(e,t)}(t,r["Component"]),n=t,(a=[{key:"render",value:function(){var e=this.props.children;return o.a.createElement(u.Consumer,null,function(t){return o.a.createElement(F,{context:t},e)})}}])&&G(n.prototype,a),i&&G(n,i),t}();Q.propTypes={children:i.a.element.isRequired};var Z=Q;function ee(e){return(ee="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function te(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function ne(e,t){return!t||"object"!==ee(t)&&"function"!=typeof t?function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e):t}function re(e){return(re=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function oe(e,t){return(oe=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}var ae=function(e){function t(){return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t),ne(this,re(t).apply(this,arguments))}var n,o,a;return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&oe(e,t)}(t,r["Component"]),n=t,(o=[{key:"render",value:function(){return null}}])&&te(n.prototype,o),a&&te(n,a),t}();ae.Panel=_,ae.Provider=q,ae.Target=Z;t.default=ae}]).default});