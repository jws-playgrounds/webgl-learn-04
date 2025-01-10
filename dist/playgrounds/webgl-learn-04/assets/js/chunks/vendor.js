var y_="1.1.19";function wp(r,t,e){return Math.max(r,Math.min(t,e))}function M_(r,t,e){return(1-e)*r+e*t}function S_(r,t,e,n){return M_(r,t,1-Math.exp(-e*n))}function b_(r,t){return(r%t+t)%t}var w_=class{isRunning=!1;value=0;from=0;to=0;currentTime=0;lerp;duration;easing;onUpdate;advance(r){if(!this.isRunning)return;let t=!1;if(this.duration&&this.easing){this.currentTime+=r;const e=wp(0,this.currentTime/this.duration,1);t=e>=1;const n=t?1:this.easing(e);this.value=this.from+(this.to-this.from)*n}else this.lerp?(this.value=S_(this.value,this.to,this.lerp*60,r),Math.round(this.value)===this.to&&(this.value=this.to,t=!0)):(this.value=this.to,t=!0);t&&this.stop(),this.onUpdate?.(this.value,t)}stop(){this.isRunning=!1}fromTo(r,t,{lerp:e,duration:n,easing:i,onStart:s,onUpdate:o}){this.from=this.value=r,this.to=t,this.lerp=e,this.duration=n,this.easing=i,this.currentTime=0,this.isRunning=!0,s?.(),this.onUpdate=o}};function T_(r,t){let e;return function(...n){let i=this;clearTimeout(e),e=setTimeout(()=>{e=void 0,r.apply(i,n)},t)}}var E_=class{constructor(r,t,{autoResize:e=!0,debounce:n=250}={}){this.wrapper=r,this.content=t,e&&(this.debouncedResize=T_(this.resize,n),this.wrapper instanceof Window?window.addEventListener("resize",this.debouncedResize,!1):(this.wrapperResizeObserver=new ResizeObserver(this.debouncedResize),this.wrapperResizeObserver.observe(this.wrapper)),this.contentResizeObserver=new ResizeObserver(this.debouncedResize),this.contentResizeObserver.observe(this.content)),this.resize()}width=0;height=0;scrollHeight=0;scrollWidth=0;debouncedResize;wrapperResizeObserver;contentResizeObserver;destroy(){this.wrapperResizeObserver?.disconnect(),this.contentResizeObserver?.disconnect(),this.wrapper===window&&this.debouncedResize&&window.removeEventListener("resize",this.debouncedResize,!1)}resize=()=>{this.onWrapperResize(),this.onContentResize()};onWrapperResize=()=>{this.wrapper instanceof Window?(this.width=window.innerWidth,this.height=window.innerHeight):(this.width=this.wrapper.clientWidth,this.height=this.wrapper.clientHeight)};onContentResize=()=>{this.wrapper instanceof Window?(this.scrollHeight=this.content.scrollHeight,this.scrollWidth=this.content.scrollWidth):(this.scrollHeight=this.wrapper.scrollHeight,this.scrollWidth=this.wrapper.scrollWidth)};get limit(){return{x:this.scrollWidth-this.width,y:this.scrollHeight-this.height}}},Tp=class{events={};emit(r,...t){let e=this.events[r]||[];for(let n=0,i=e.length;n<i;n++)e[n]?.(...t)}on(r,t){return this.events[r]?.push(t)||(this.events[r]=[t]),()=>{this.events[r]=this.events[r]?.filter(e=>t!==e)}}off(r,t){this.events[r]=this.events[r]?.filter(e=>t!==e)}destroy(){this.events={}}},tf=100/6,Ji={passive:!1},C_=class{constructor(r,t={wheelMultiplier:1,touchMultiplier:1}){this.element=r,this.options=t,window.addEventListener("resize",this.onWindowResize,!1),this.onWindowResize(),this.element.addEventListener("wheel",this.onWheel,Ji),this.element.addEventListener("touchstart",this.onTouchStart,Ji),this.element.addEventListener("touchmove",this.onTouchMove,Ji),this.element.addEventListener("touchend",this.onTouchEnd,Ji)}touchStart={x:0,y:0};lastDelta={x:0,y:0};window={width:0,height:0};emitter=new Tp;on(r,t){return this.emitter.on(r,t)}destroy(){this.emitter.destroy(),window.removeEventListener("resize",this.onWindowResize,!1),this.element.removeEventListener("wheel",this.onWheel,Ji),this.element.removeEventListener("touchstart",this.onTouchStart,Ji),this.element.removeEventListener("touchmove",this.onTouchMove,Ji),this.element.removeEventListener("touchend",this.onTouchEnd,Ji)}onTouchStart=r=>{const{clientX:t,clientY:e}=r.targetTouches?r.targetTouches[0]:r;this.touchStart.x=t,this.touchStart.y=e,this.lastDelta={x:0,y:0},this.emitter.emit("scroll",{deltaX:0,deltaY:0,event:r})};onTouchMove=r=>{const{clientX:t,clientY:e}=r.targetTouches?r.targetTouches[0]:r,n=-(t-this.touchStart.x)*this.options.touchMultiplier,i=-(e-this.touchStart.y)*this.options.touchMultiplier;this.touchStart.x=t,this.touchStart.y=e,this.lastDelta={x:n,y:i},this.emitter.emit("scroll",{deltaX:n,deltaY:i,event:r})};onTouchEnd=r=>{this.emitter.emit("scroll",{deltaX:this.lastDelta.x,deltaY:this.lastDelta.y,event:r})};onWheel=r=>{let{deltaX:t,deltaY:e,deltaMode:n}=r;const i=n===1?tf:n===2?this.window.width:1,s=n===1?tf:n===2?this.window.height:1;t*=i,e*=s,t*=this.options.wheelMultiplier,e*=this.options.wheelMultiplier,this.emitter.emit("scroll",{deltaX:t,deltaY:e,event:r})};onWindowResize=()=>{this.window={width:window.innerWidth,height:window.innerHeight}}},j1=class{_isScrolling=!1;_isStopped=!1;_isLocked=!1;_preventNextNativeScrollEvent=!1;_resetVelocityTimeout=null;__rafID=null;isTouching;time=0;userData={};lastVelocity=0;velocity=0;direction=0;options;targetScroll;animatedScroll;animate=new w_;emitter=new Tp;dimensions;virtualScroll;constructor({wrapper:r=window,content:t=document.documentElement,eventsTarget:e=r,smoothWheel:n=!0,syncTouch:i=!1,syncTouchLerp:s=.075,touchInertiaMultiplier:o=35,duration:a,easing:l=E=>Math.min(1,1.001-Math.pow(2,-10*E)),lerp:c=.1,infinite:u=!1,orientation:h="vertical",gestureOrientation:f="vertical",touchMultiplier:d=1,wheelMultiplier:g=1,autoResize:p=!0,prevent:m,virtualScroll:_,overscroll:M=!0,autoRaf:b=!1,anchors:x=!1,__experimental__naiveDimensions:v=!1}={}){window.lenisVersion=y_,(!r||r===document.documentElement)&&(r=window),this.options={wrapper:r,content:t,eventsTarget:e,smoothWheel:n,syncTouch:i,syncTouchLerp:s,touchInertiaMultiplier:o,duration:a,easing:l,lerp:c,infinite:u,gestureOrientation:f,orientation:h,touchMultiplier:d,wheelMultiplier:g,autoResize:p,prevent:m,virtualScroll:_,overscroll:M,autoRaf:b,anchors:x,__experimental__naiveDimensions:v},this.dimensions=new E_(r,t,{autoResize:p}),this.updateClassName(),this.targetScroll=this.animatedScroll=this.actualScroll,this.options.wrapper.addEventListener("scroll",this.onNativeScroll,!1),this.options.wrapper.addEventListener("scrollend",this.onScrollEnd,{capture:!0}),this.options.anchors&&this.options.wrapper===window&&this.options.wrapper.addEventListener("click",this.onClick,!1),this.options.wrapper.addEventListener("pointerdown",this.onPointerDown,!1),this.virtualScroll=new C_(e,{touchMultiplier:d,wheelMultiplier:g}),this.virtualScroll.on("scroll",this.onVirtualScroll),this.options.autoRaf&&(this.__rafID=requestAnimationFrame(this.raf))}destroy(){this.emitter.destroy(),this.options.wrapper.removeEventListener("scroll",this.onNativeScroll,!1),this.options.wrapper.removeEventListener("scrollend",this.onScrollEnd,{capture:!0}),this.options.wrapper.removeEventListener("pointerdown",this.onPointerDown,!1),this.options.anchors&&this.options.wrapper===window&&this.options.wrapper.removeEventListener("click",this.onClick,!1),this.virtualScroll.destroy(),this.dimensions.destroy(),this.cleanUpClassName(),this.__rafID&&cancelAnimationFrame(this.__rafID)}on(r,t){return this.emitter.on(r,t)}off(r,t){return this.emitter.off(r,t)}onScrollEnd=r=>{r instanceof CustomEvent||(this.isScrolling==="smooth"||this.isScrolling===!1)&&r.stopPropagation()};dispatchScrollendEvent=()=>{this.options.wrapper.dispatchEvent(new CustomEvent("scrollend",{bubbles:this.options.wrapper===window,detail:{lenisScrollEnd:!0}}))};setScroll(r){this.isHorizontal?this.options.wrapper.scrollTo({left:r,behavior:"instant"}):this.options.wrapper.scrollTo({top:r,behavior:"instant"})}onClick=r=>{const e=r.composedPath().find(n=>n instanceof HTMLAnchorElement&&n.getAttribute("href")?.startsWith("#"));if(e){const n=e.getAttribute("href");if(n){const i=typeof this.options.anchors=="object"&&this.options.anchors?this.options.anchors:void 0;this.scrollTo(n,i)}}};onPointerDown=r=>{r.button===1&&this.reset()};onVirtualScroll=r=>{if(typeof this.options.virtualScroll=="function"&&this.options.virtualScroll(r)===!1)return;const{deltaX:t,deltaY:e,event:n}=r;if(this.emitter.emit("virtual-scroll",{deltaX:t,deltaY:e,event:n}),n.ctrlKey||n.lenisStopPropagation)return;const i=n.type.includes("touch"),s=n.type.includes("wheel");this.isTouching=n.type==="touchstart"||n.type==="touchmove";const o=t===0&&e===0;if(this.options.syncTouch&&i&&n.type==="touchstart"&&o&&!this.isStopped&&!this.isLocked){this.reset();return}const l=this.options.gestureOrientation==="vertical"&&e===0||this.options.gestureOrientation==="horizontal"&&t===0;if(o||l)return;let c=n.composedPath();c=c.slice(0,c.indexOf(this.rootElement));const u=this.options.prevent;if(c.find(m=>m instanceof HTMLElement&&(typeof u=="function"&&u?.(m)||m.hasAttribute?.("data-lenis-prevent")||i&&m.hasAttribute?.("data-lenis-prevent-touch")||s&&m.hasAttribute?.("data-lenis-prevent-wheel"))))return;if(this.isStopped||this.isLocked){n.preventDefault();return}if(!(this.options.syncTouch&&i||this.options.smoothWheel&&s)){this.isScrolling="native",this.animate.stop(),n.lenisStopPropagation=!0;return}let f=e;this.options.gestureOrientation==="both"?f=Math.abs(e)>Math.abs(t)?e:t:this.options.gestureOrientation==="horizontal"&&(f=t),(!this.options.overscroll||this.options.infinite||this.options.wrapper!==window&&(this.animatedScroll>0&&this.animatedScroll<this.limit||this.animatedScroll===0&&e>0||this.animatedScroll===this.limit&&e<0))&&(n.lenisStopPropagation=!0),n.preventDefault();const d=i&&this.options.syncTouch,p=i&&n.type==="touchend"&&Math.abs(f)>5;p&&(f=this.velocity*this.options.touchInertiaMultiplier),this.scrollTo(this.targetScroll+f,{programmatic:!1,...d?{lerp:p?this.options.syncTouchLerp:1}:{lerp:this.options.lerp,duration:this.options.duration,easing:this.options.easing}})};resize(){this.dimensions.resize(),this.animatedScroll=this.targetScroll=this.actualScroll,this.emit()}emit(){this.emitter.emit("scroll",this)}onNativeScroll=()=>{if(this._resetVelocityTimeout!==null&&(clearTimeout(this._resetVelocityTimeout),this._resetVelocityTimeout=null),this._preventNextNativeScrollEvent){this._preventNextNativeScrollEvent=!1;return}if(this.isScrolling===!1||this.isScrolling==="native"){const r=this.animatedScroll;this.animatedScroll=this.targetScroll=this.actualScroll,this.lastVelocity=this.velocity,this.velocity=this.animatedScroll-r,this.direction=Math.sign(this.animatedScroll-r),this.isStopped||(this.isScrolling="native"),this.emit(),this.velocity!==0&&(this._resetVelocityTimeout=setTimeout(()=>{this.lastVelocity=this.velocity,this.velocity=0,this.isScrolling=!1,this.emit()},400))}};reset(){this.isLocked=!1,this.isScrolling=!1,this.animatedScroll=this.targetScroll=this.actualScroll,this.lastVelocity=this.velocity=0,this.animate.stop()}start(){this.isStopped&&(this.reset(),this.isStopped=!1)}stop(){this.isStopped||(this.reset(),this.isStopped=!0)}raf=r=>{const t=r-(this.time||r);this.time=r,this.animate.advance(t*.001),this.options.autoRaf&&(this.__rafID=requestAnimationFrame(this.raf))};scrollTo(r,{offset:t=0,immediate:e=!1,lock:n=!1,duration:i=this.options.duration,easing:s=this.options.easing,lerp:o=this.options.lerp,onStart:a,onComplete:l,force:c=!1,programmatic:u=!0,userData:h}={}){if(!((this.isStopped||this.isLocked)&&!c)){if(typeof r=="string"&&["top","left","start"].includes(r))r=0;else if(typeof r=="string"&&["bottom","right","end"].includes(r))r=this.limit;else{let f;if(typeof r=="string"?f=document.querySelector(r):r instanceof HTMLElement&&r?.nodeType&&(f=r),f){if(this.options.wrapper!==window){const g=this.rootElement.getBoundingClientRect();t-=this.isHorizontal?g.left:g.top}const d=f.getBoundingClientRect();r=(this.isHorizontal?d.left:d.top)+this.animatedScroll}}if(typeof r=="number"){if(r+=t,r=Math.round(r),this.options.infinite?u&&(this.targetScroll=this.animatedScroll=this.scroll):r=wp(0,r,this.limit),r===this.targetScroll){a?.(this),l?.(this);return}if(this.userData=h??{},e){this.animatedScroll=this.targetScroll=r,this.setScroll(this.scroll),this.reset(),this.preventNextNativeScrollEvent(),this.emit(),l?.(this),this.userData={},requestAnimationFrame(()=>{this.dispatchScrollendEvent()});return}u||(this.targetScroll=r),this.animate.fromTo(this.animatedScroll,r,{duration:i,easing:s,lerp:o,onStart:()=>{n&&(this.isLocked=!0),this.isScrolling="smooth",a?.(this)},onUpdate:(f,d)=>{this.isScrolling="smooth",this.lastVelocity=this.velocity,this.velocity=f-this.animatedScroll,this.direction=Math.sign(this.velocity),this.animatedScroll=f,this.setScroll(this.scroll),u&&(this.targetScroll=f),d||this.emit(),d&&(this.reset(),this.emit(),l?.(this),this.userData={},requestAnimationFrame(()=>{this.dispatchScrollendEvent()}),this.preventNextNativeScrollEvent())}})}}}preventNextNativeScrollEvent(){this._preventNextNativeScrollEvent=!0,requestAnimationFrame(()=>{this._preventNextNativeScrollEvent=!1})}get rootElement(){return this.options.wrapper===window?document.documentElement:this.options.wrapper}get limit(){return this.options.__experimental__naiveDimensions?this.isHorizontal?this.rootElement.scrollWidth-this.rootElement.clientWidth:this.rootElement.scrollHeight-this.rootElement.clientHeight:this.dimensions.limit[this.isHorizontal?"x":"y"]}get isHorizontal(){return this.options.orientation==="horizontal"}get actualScroll(){const r=this.options.wrapper;return this.isHorizontal?r.scrollX??r.scrollLeft:r.scrollY??r.scrollTop}get scroll(){return this.options.infinite?b_(this.animatedScroll,this.limit):this.animatedScroll}get progress(){return this.limit===0?1:this.scroll/this.limit}get isScrolling(){return this._isScrolling}set isScrolling(r){this._isScrolling!==r&&(this._isScrolling=r,this.updateClassName())}get isStopped(){return this._isStopped}set isStopped(r){this._isStopped!==r&&(this._isStopped=r,this.updateClassName())}get isLocked(){return this._isLocked}set isLocked(r){this._isLocked!==r&&(this._isLocked=r,this.updateClassName())}get isSmooth(){return this.isScrolling==="smooth"}get className(){let r="lenis";return this.isStopped&&(r+=" lenis-stopped"),this.isLocked&&(r+=" lenis-locked"),this.isScrolling&&(r+=" lenis-scrolling"),this.isScrolling==="smooth"&&(r+=" lenis-smooth"),r}updateClassName(){this.cleanUpClassName(),this.rootElement.className=`${this.rootElement.className} ${this.className}`.trim()}cleanUpClassName(){this.rootElement.className=this.rootElement.className.replace(/lenis(-\w+)?/g,"").trim()}};function Fi(r){if(r===void 0)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return r}function Ep(r,t){r.prototype=Object.create(t.prototype),r.prototype.constructor=r,r.__proto__=t}/*!
 * GSAP 3.12.5
 * https://gsap.com
 *
 * @license Copyright 2008-2024, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license or for
 * Club GSAP members, the agreement issued with that membership.
 * @author: Jack Doyle, jack@greensock.com
*/var Rn={autoSleep:120,force3D:"auto",nullTargetWarn:1,units:{lineHeight:""}},Zs={duration:.5,overwrite:!1,delay:0},lh,je,fe,vi=1e8,Ye=1/vi,hu=Math.PI*2,A_=hu/4,P_=0,Cp=Math.sqrt,L_=Math.cos,D_=Math.sin,Fe=function(t){return typeof t=="string"},ye=function(t){return typeof t=="function"},qi=function(t){return typeof t=="number"},ch=function(t){return typeof t>"u"},Ti=function(t){return typeof t=="object"},gn=function(t){return t!==!1},uh=function(){return typeof window<"u"},ga=function(t){return ye(t)||Fe(t)},Ap=typeof ArrayBuffer=="function"&&ArrayBuffer.isView||function(){},Ze=Array.isArray,fu=/(?:-?\.?\d|\.)+/gi,Pp=/[-+=.]*\d+[.e\-+]*\d*[e\-+]*\d*/g,Is=/[-+=.]*\d+[.e-]*\d*[a-z%]*/g,lc=/[-+=.]*\d+\.?\d*(?:e-|e\+)?\d*/gi,Lp=/[+-]=-?[.\d]+/,Dp=/[^,'"\[\]\s]+/gi,R_=/^[+\-=e\s\d]*\d+[.\d]*([a-z]*|%)\s*$/i,ge,fi,du,hh,On={},vl={},Rp,Ip=function(t){return(vl=es(t,On))&&yn},fh=function(t,e){return console.warn("Invalid property",t,"set to",e,"Missing plugin? gsap.registerPlugin()")},Xo=function(t,e){return!e&&console.warn(t)},Op=function(t,e){return t&&(On[t]=e)&&vl&&(vl[t]=e)||On},qo=function(){return 0},I_={suppressEvents:!0,isStart:!0,kill:!1},il={suppressEvents:!0,kill:!1},O_={suppressEvents:!0},dh={},dr=[],pu={},Np,En={},cc={},ef=30,rl=[],ph="",mh=function(t){var e=t[0],n,i;if(Ti(e)||ye(e)||(t=[t]),!(n=(e._gsap||{}).harness)){for(i=rl.length;i--&&!rl[i].targetTest(e););n=rl[i]}for(i=t.length;i--;)t[i]&&(t[i]._gsap||(t[i]._gsap=new sm(t[i],n)))||t.splice(i,1);return t},Xr=function(t){return t._gsap||mh(Hn(t))[0]._gsap},Fp=function(t,e,n){return(n=t[e])&&ye(n)?t[e]():ch(n)&&t.getAttribute&&t.getAttribute(e)||n},_n=function(t,e){return(t=t.split(",")).forEach(e)||t},Se=function(t){return Math.round(t*1e5)/1e5||0},Oe=function(t){return Math.round(t*1e7)/1e7||0},Us=function(t,e){var n=e.charAt(0),i=parseFloat(e.substr(2));return t=parseFloat(t),n==="+"?t+i:n==="-"?t-i:n==="*"?t*i:t/i},N_=function(t,e){for(var n=e.length,i=0;t.indexOf(e[i])<0&&++i<n;);return i<n},yl=function(){var t=dr.length,e=dr.slice(0),n,i;for(pu={},dr.length=0,n=0;n<t;n++)i=e[n],i&&i._lazy&&(i.render(i._lazy[0],i._lazy[1],!0)._lazy=0)},zp=function(t,e,n,i){dr.length&&!je&&yl(),t.render(e,n,je&&e<0&&(t._initted||t._startAt)),dr.length&&!je&&yl()},kp=function(t){var e=parseFloat(t);return(e||e===0)&&(t+"").match(Dp).length<2?e:Fe(t)?t.trim():t},Up=function(t){return t},Xn=function(t,e){for(var n in e)n in t||(t[n]=e[n]);return t},F_=function(t){return function(e,n){for(var i in n)i in e||i==="duration"&&t||i==="ease"||(e[i]=n[i])}},es=function(t,e){for(var n in e)t[n]=e[n];return t},nf=function r(t,e){for(var n in e)n!=="__proto__"&&n!=="constructor"&&n!=="prototype"&&(t[n]=Ti(e[n])?r(t[n]||(t[n]={}),e[n]):e[n]);return t},Ml=function(t,e){var n={},i;for(i in t)i in e||(n[i]=t[i]);return n},Do=function(t){var e=t.parent||ge,n=t.keyframes?F_(Ze(t.keyframes)):Xn;if(gn(t.inherit))for(;e;)n(t,e.vars.defaults),e=e.parent||e._dp;return t},z_=function(t,e){for(var n=t.length,i=n===e.length;i&&n--&&t[n]===e[n];);return n<0},Bp=function(t,e,n,i,s){var o=t[i],a;if(s)for(a=e[s];o&&o[s]>a;)o=o._prev;return o?(e._next=o._next,o._next=e):(e._next=t[n],t[n]=e),e._next?e._next._prev=e:t[i]=e,e._prev=o,e.parent=e._dp=t,e},Vl=function(t,e,n,i){n===void 0&&(n="_first"),i===void 0&&(i="_last");var s=e._prev,o=e._next;s?s._next=o:t[n]===e&&(t[n]=o),o?o._prev=s:t[i]===e&&(t[i]=s),e._next=e._prev=e.parent=null},yr=function(t,e){t.parent&&(!e||t.parent.autoRemoveChildren)&&t.parent.remove&&t.parent.remove(t),t._act=0},qr=function(t,e){if(t&&(!e||e._end>t._dur||e._start<0))for(var n=t;n;)n._dirty=1,n=n.parent;return t},k_=function(t){for(var e=t.parent;e&&e.parent;)e._dirty=1,e.totalDuration(),e=e.parent;return t},mu=function(t,e,n,i){return t._startAt&&(je?t._startAt.revert(il):t.vars.immediateRender&&!t.vars.autoRevert||t._startAt.render(e,!0,i))},U_=function r(t){return!t||t._ts&&r(t.parent)},rf=function(t){return t._repeat?Js(t._tTime,t=t.duration()+t._rDelay)*t:0},Js=function(t,e){var n=Math.floor(t/=e);return t&&n===t?n-1:n},Sl=function(t,e){return(t-e._start)*e._ts+(e._ts>=0?0:e._dirty?e.totalDuration():e._tDur)},Gl=function(t){return t._end=Oe(t._start+(t._tDur/Math.abs(t._ts||t._rts||Ye)||0))},Hl=function(t,e){var n=t._dp;return n&&n.smoothChildTiming&&t._ts&&(t._start=Oe(n._time-(t._ts>0?e/t._ts:((t._dirty?t.totalDuration():t._tDur)-e)/-t._ts)),Gl(t),n._dirty||qr(n,t)),t},Vp=function(t,e){var n;if((e._time||!e._dur&&e._initted||e._start<t._time&&(e._dur||!e.add))&&(n=Sl(t.rawTime(),e),(!e._dur||ca(0,e.totalDuration(),n)-e._tTime>Ye)&&e.render(n,!0)),qr(t,e)._dp&&t._initted&&t._time>=t._dur&&t._ts){if(t._dur<t.duration())for(n=t;n._dp;)n.rawTime()>=0&&n.totalTime(n._tTime),n=n._dp;t._zTime=-1e-8}},mi=function(t,e,n,i){return e.parent&&yr(e),e._start=Oe((qi(n)?n:n||t!==ge?Un(t,n,e):t._time)+e._delay),e._end=Oe(e._start+(e.totalDuration()/Math.abs(e.timeScale())||0)),Bp(t,e,"_first","_last",t._sort?"_start":0),gu(e)||(t._recent=e),i||Vp(t,e),t._ts<0&&Hl(t,t._tTime),t},Gp=function(t,e){return(On.ScrollTrigger||fh("scrollTrigger",e))&&On.ScrollTrigger.create(e,t)},Hp=function(t,e,n,i,s){if(_h(t,e,s),!t._initted)return 1;if(!n&&t._pt&&!je&&(t._dur&&t.vars.lazy!==!1||!t._dur&&t.vars.lazy)&&Np!==Cn.frame)return dr.push(t),t._lazy=[s,i],1},B_=function r(t){var e=t.parent;return e&&e._ts&&e._initted&&!e._lock&&(e.rawTime()<0||r(e))},gu=function(t){var e=t.data;return e==="isFromStart"||e==="isStart"},V_=function(t,e,n,i){var s=t.ratio,o=e<0||!e&&(!t._start&&B_(t)&&!(!t._initted&&gu(t))||(t._ts<0||t._dp._ts<0)&&!gu(t))?0:1,a=t._rDelay,l=0,c,u,h;if(a&&t._repeat&&(l=ca(0,t._tDur,e),u=Js(l,a),t._yoyo&&u&1&&(o=1-o),u!==Js(t._tTime,a)&&(s=1-o,t.vars.repeatRefresh&&t._initted&&t.invalidate())),o!==s||je||i||t._zTime===Ye||!e&&t._zTime){if(!t._initted&&Hp(t,e,i,n,l))return;for(h=t._zTime,t._zTime=e||(n?Ye:0),n||(n=e&&!h),t.ratio=o,t._from&&(o=1-o),t._time=0,t._tTime=l,c=t._pt;c;)c.r(o,c.d),c=c._next;e<0&&mu(t,e,n,!0),t._onUpdate&&!n&&Dn(t,"onUpdate"),l&&t._repeat&&!n&&t.parent&&Dn(t,"onRepeat"),(e>=t._tDur||e<0)&&t.ratio===o&&(o&&yr(t,1),!n&&!je&&(Dn(t,o?"onComplete":"onReverseComplete",!0),t._prom&&t._prom()))}else t._zTime||(t._zTime=e)},G_=function(t,e,n){var i;if(n>e)for(i=t._first;i&&i._start<=n;){if(i.data==="isPause"&&i._start>e)return i;i=i._next}else for(i=t._last;i&&i._start>=n;){if(i.data==="isPause"&&i._start<e)return i;i=i._prev}},Ks=function(t,e,n,i){var s=t._repeat,o=Oe(e)||0,a=t._tTime/t._tDur;return a&&!i&&(t._time*=o/t._dur),t._dur=o,t._tDur=s?s<0?1e10:Oe(o*(s+1)+t._rDelay*s):o,a>0&&!i&&Hl(t,t._tTime=t._tDur*a),t.parent&&Gl(t),n||qr(t.parent,t),t},sf=function(t){return t instanceof sn?qr(t):Ks(t,t._dur)},H_={_start:0,endTime:qo,totalDuration:qo},Un=function r(t,e,n){var i=t.labels,s=t._recent||H_,o=t.duration()>=vi?s.endTime(!1):t._dur,a,l,c;return Fe(e)&&(isNaN(e)||e in i)?(l=e.charAt(0),c=e.substr(-1)==="%",a=e.indexOf("="),l==="<"||l===">"?(a>=0&&(e=e.replace(/=/,"")),(l==="<"?s._start:s.endTime(s._repeat>=0))+(parseFloat(e.substr(1))||0)*(c?(a<0?s:n).totalDuration()/100:1)):a<0?(e in i||(i[e]=o),i[e]):(l=parseFloat(e.charAt(a-1)+e.substr(a+1)),c&&n&&(l=l/100*(Ze(n)?n[0]:n).totalDuration()),a>1?r(t,e.substr(0,a-1),n)+l:o+l)):e==null?o:+e},Ro=function(t,e,n){var i=qi(e[1]),s=(i?2:1)+(t<2?0:1),o=e[s],a,l;if(i&&(o.duration=e[1]),o.parent=n,t){for(a=o,l=n;l&&!("immediateRender"in a);)a=l.vars.defaults||{},l=gn(l.vars.inherit)&&l.parent;o.immediateRender=gn(a.immediateRender),t<2?o.runBackwards=1:o.startAt=e[s-1]}return new Ce(e[0],o,e[s+1])},wr=function(t,e){return t||t===0?e(t):e},ca=function(t,e,n){return n<t?t:n>e?e:n},qe=function(t,e){return!Fe(t)||!(e=R_.exec(t))?"":e[1]},W_=function(t,e,n){return wr(n,function(i){return ca(t,e,i)})},_u=[].slice,Wp=function(t,e){return t&&Ti(t)&&"length"in t&&(!e&&!t.length||t.length-1 in t&&Ti(t[0]))&&!t.nodeType&&t!==fi},X_=function(t,e,n){return n===void 0&&(n=[]),t.forEach(function(i){var s;return Fe(i)&&!e||Wp(i,1)?(s=n).push.apply(s,Hn(i)):n.push(i)})||n},Hn=function(t,e,n){return fe&&!e&&fe.selector?fe.selector(t):Fe(t)&&!n&&(du||!Qs())?_u.call((e||hh).querySelectorAll(t),0):Ze(t)?X_(t,n):Wp(t)?_u.call(t,0):t?[t]:[]},xu=function(t){return t=Hn(t)[0]||Xo("Invalid scope")||{},function(e){var n=t.current||t.nativeElement||t;return Hn(e,n.querySelectorAll?n:n===t?Xo("Invalid scope")||hh.createElement("div"):t)}},Xp=function(t){return t.sort(function(){return .5-Math.random()})},qp=function(t){if(ye(t))return t;var e=Ti(t)?t:{each:t},n=Yr(e.ease),i=e.from||0,s=parseFloat(e.base)||0,o={},a=i>0&&i<1,l=isNaN(i)||a,c=e.axis,u=i,h=i;return Fe(i)?u=h={center:.5,edges:.5,end:1}[i]||0:!a&&l&&(u=i[0],h=i[1]),function(f,d,g){var p=(g||e).length,m=o[p],_,M,b,x,v,E,C,y,w;if(!m){if(w=e.grid==="auto"?0:(e.grid||[1,vi])[1],!w){for(C=-1e8;C<(C=g[w++].getBoundingClientRect().left)&&w<p;);w<p&&w--}for(m=o[p]=[],_=l?Math.min(w,p)*u-.5:i%w,M=w===vi?0:l?p*h/w-.5:i/w|0,C=0,y=vi,E=0;E<p;E++)b=E%w-_,x=M-(E/w|0),m[E]=v=c?Math.abs(c==="y"?x:b):Cp(b*b+x*x),v>C&&(C=v),v<y&&(y=v);i==="random"&&Xp(m),m.max=C-y,m.min=y,m.v=p=(parseFloat(e.amount)||parseFloat(e.each)*(w>p?p-1:c?c==="y"?p/w:w:Math.max(w,p/w))||0)*(i==="edges"?-1:1),m.b=p<0?s-p:s,m.u=qe(e.amount||e.each)||0,n=n&&p<0?nm(n):n}return p=(m[f]-m.min)/m.max||0,Oe(m.b+(n?n(p):p)*m.v)+m.u}},vu=function(t){var e=Math.pow(10,((t+"").split(".")[1]||"").length);return function(n){var i=Oe(Math.round(parseFloat(n)/t)*t*e);return(i-i%1)/e+(qi(n)?0:qe(n))}},Yp=function(t,e){var n=Ze(t),i,s;return!n&&Ti(t)&&(i=n=t.radius||vi,t.values?(t=Hn(t.values),(s=!qi(t[0]))&&(i*=i)):t=vu(t.increment)),wr(e,n?ye(t)?function(o){return s=t(o),Math.abs(s-o)<=i?s:o}:function(o){for(var a=parseFloat(s?o.x:o),l=parseFloat(s?o.y:0),c=vi,u=0,h=t.length,f,d;h--;)s?(f=t[h].x-a,d=t[h].y-l,f=f*f+d*d):f=Math.abs(t[h]-a),f<c&&(c=f,u=h);return u=!i||c<=i?t[u]:o,s||u===o||qi(o)?u:u+qe(o)}:vu(t))},$p=function(t,e,n,i){return wr(Ze(t)?!e:n===!0?!!(n=0):!i,function(){return Ze(t)?t[~~(Math.random()*t.length)]:(n=n||1e-5)&&(i=n<1?Math.pow(10,(n+"").length-2):1)&&Math.floor(Math.round((t-n/2+Math.random()*(e-t+n*.99))/n)*n*i)/i})},q_=function(){for(var t=arguments.length,e=new Array(t),n=0;n<t;n++)e[n]=arguments[n];return function(i){return e.reduce(function(s,o){return o(s)},i)}},Y_=function(t,e){return function(n){return t(parseFloat(n))+(e||qe(n))}},$_=function(t,e,n){return Zp(t,e,0,1,n)},jp=function(t,e,n){return wr(n,function(i){return t[~~e(i)]})},j_=function r(t,e,n){var i=e-t;return Ze(t)?jp(t,r(0,t.length),e):wr(n,function(s){return(i+(s-t)%i)%i+t})},Z_=function r(t,e,n){var i=e-t,s=i*2;return Ze(t)?jp(t,r(0,t.length-1),e):wr(n,function(o){return o=(s+(o-t)%s)%s||0,t+(o>i?s-o:o)})},Yo=function(t){for(var e=0,n="",i,s,o,a;~(i=t.indexOf("random(",e));)o=t.indexOf(")",i),a=t.charAt(i+7)==="[",s=t.substr(i+7,o-i-7).match(a?Dp:fu),n+=t.substr(e,i-e)+$p(a?s:+s[0],a?0:+s[1],+s[2]||1e-5),e=o+1;return n+t.substr(e,t.length-e)},Zp=function(t,e,n,i,s){var o=e-t,a=i-n;return wr(s,function(l){return n+((l-t)/o*a||0)})},J_=function r(t,e,n,i){var s=isNaN(t+e)?0:function(d){return(1-d)*t+d*e};if(!s){var o=Fe(t),a={},l,c,u,h,f;if(n===!0&&(i=1)&&(n=null),o)t={p:t},e={p:e};else if(Ze(t)&&!Ze(e)){for(u=[],h=t.length,f=h-2,c=1;c<h;c++)u.push(r(t[c-1],t[c]));h--,s=function(g){g*=h;var p=Math.min(f,~~g);return u[p](g-p)},n=e}else i||(t=es(Ze(t)?[]:{},t));if(!u){for(l in e)gh.call(a,t,l,"get",e[l]);s=function(g){return yh(g,a)||(o?t.p:t)}}}return wr(n,s)},of=function(t,e,n){var i=t.labels,s=vi,o,a,l;for(o in i)a=i[o]-e,a<0==!!n&&a&&s>(a=Math.abs(a))&&(l=o,s=a);return l},Dn=function(t,e,n){var i=t.vars,s=i[e],o=fe,a=t._ctx,l,c,u;if(s)return l=i[e+"Params"],c=i.callbackScope||t,n&&dr.length&&yl(),a&&(fe=a),u=l?s.apply(c,l):s.call(c),fe=o,u},So=function(t){return yr(t),t.scrollTrigger&&t.scrollTrigger.kill(!!je),t.progress()<1&&Dn(t,"onInterrupt"),t},Os,Jp=[],Kp=function(t){if(t)if(t=!t.name&&t.default||t,uh()||t.headless){var e=t.name,n=ye(t),i=e&&!n&&t.init?function(){this._props=[]}:t,s={init:qo,render:yh,add:gh,kill:d0,modifier:f0,rawVars:0},o={targetTest:0,get:0,getSetter:vh,aliases:{},register:0};if(Qs(),t!==i){if(En[e])return;Xn(i,Xn(Ml(t,s),o)),es(i.prototype,es(s,Ml(t,o))),En[i.prop=e]=i,t.targetTest&&(rl.push(i),dh[e]=1),e=(e==="css"?"CSS":e.charAt(0).toUpperCase()+e.substr(1))+"Plugin"}Op(e,i),t.register&&t.register(yn,i,xn)}else Jp.push(t)},ae=255,bo={aqua:[0,ae,ae],lime:[0,ae,0],silver:[192,192,192],black:[0,0,0],maroon:[128,0,0],teal:[0,128,128],blue:[0,0,ae],navy:[0,0,128],white:[ae,ae,ae],olive:[128,128,0],yellow:[ae,ae,0],orange:[ae,165,0],gray:[128,128,128],purple:[128,0,128],green:[0,128,0],red:[ae,0,0],pink:[ae,192,203],cyan:[0,ae,ae],transparent:[ae,ae,ae,0]},uc=function(t,e,n){return t+=t<0?1:t>1?-1:0,(t*6<1?e+(n-e)*t*6:t<.5?n:t*3<2?e+(n-e)*(2/3-t)*6:e)*ae+.5|0},Qp=function(t,e,n){var i=t?qi(t)?[t>>16,t>>8&ae,t&ae]:0:bo.black,s,o,a,l,c,u,h,f,d,g;if(!i){if(t.substr(-1)===","&&(t=t.substr(0,t.length-1)),bo[t])i=bo[t];else if(t.charAt(0)==="#"){if(t.length<6&&(s=t.charAt(1),o=t.charAt(2),a=t.charAt(3),t="#"+s+s+o+o+a+a+(t.length===5?t.charAt(4)+t.charAt(4):"")),t.length===9)return i=parseInt(t.substr(1,6),16),[i>>16,i>>8&ae,i&ae,parseInt(t.substr(7),16)/255];t=parseInt(t.substr(1),16),i=[t>>16,t>>8&ae,t&ae]}else if(t.substr(0,3)==="hsl"){if(i=g=t.match(fu),!e)l=+i[0]%360/360,c=+i[1]/100,u=+i[2]/100,o=u<=.5?u*(c+1):u+c-u*c,s=u*2-o,i.length>3&&(i[3]*=1),i[0]=uc(l+1/3,s,o),i[1]=uc(l,s,o),i[2]=uc(l-1/3,s,o);else if(~t.indexOf("="))return i=t.match(Pp),n&&i.length<4&&(i[3]=1),i}else i=t.match(fu)||bo.transparent;i=i.map(Number)}return e&&!g&&(s=i[0]/ae,o=i[1]/ae,a=i[2]/ae,h=Math.max(s,o,a),f=Math.min(s,o,a),u=(h+f)/2,h===f?l=c=0:(d=h-f,c=u>.5?d/(2-h-f):d/(h+f),l=h===s?(o-a)/d+(o<a?6:0):h===o?(a-s)/d+2:(s-o)/d+4,l*=60),i[0]=~~(l+.5),i[1]=~~(c*100+.5),i[2]=~~(u*100+.5)),n&&i.length<4&&(i[3]=1),i},tm=function(t){var e=[],n=[],i=-1;return t.split(pr).forEach(function(s){var o=s.match(Is)||[];e.push.apply(e,o),n.push(i+=o.length+1)}),e.c=n,e},af=function(t,e,n){var i="",s=(t+i).match(pr),o=e?"hsla(":"rgba(",a=0,l,c,u,h;if(!s)return t;if(s=s.map(function(f){return(f=Qp(f,e,1))&&o+(e?f[0]+","+f[1]+"%,"+f[2]+"%,"+f[3]:f.join(","))+")"}),n&&(u=tm(t),l=n.c,l.join(i)!==u.c.join(i)))for(c=t.replace(pr,"1").split(Is),h=c.length-1;a<h;a++)i+=c[a]+(~l.indexOf(a)?s.shift()||o+"0,0,0,0)":(u.length?u:s.length?s:n).shift());if(!c)for(c=t.split(pr),h=c.length-1;a<h;a++)i+=c[a]+s[a];return i+c[h]},pr=function(){var r="(?:\\b(?:(?:rgb|rgba|hsl|hsla)\\(.+?\\))|\\B#(?:[0-9a-f]{3,4}){1,2}\\b",t;for(t in bo)r+="|"+t+"\\b";return new RegExp(r+")","gi")}(),K_=/hsl[a]?\(/,em=function(t){var e=t.join(" "),n;if(pr.lastIndex=0,pr.test(e))return n=K_.test(e),t[1]=af(t[1],n),t[0]=af(t[0],n,tm(t[1])),!0},$o,Cn=function(){var r=Date.now,t=500,e=33,n=r(),i=n,s=1e3/240,o=s,a=[],l,c,u,h,f,d,g=function p(m){var _=r()-i,M=m===!0,b,x,v,E;if((_>t||_<0)&&(n+=_-e),i+=_,v=i-n,b=v-o,(b>0||M)&&(E=++h.frame,f=v-h.time*1e3,h.time=v=v/1e3,o+=b+(b>=s?4:s-b),x=1),M||(l=c(p)),x)for(d=0;d<a.length;d++)a[d](v,f,E,m)};return h={time:0,frame:0,tick:function(){g(!0)},deltaRatio:function(m){return f/(1e3/(m||60))},wake:function(){Rp&&(!du&&uh()&&(fi=du=window,hh=fi.document||{},On.gsap=yn,(fi.gsapVersions||(fi.gsapVersions=[])).push(yn.version),Ip(vl||fi.GreenSockGlobals||!fi.gsap&&fi||{}),Jp.forEach(Kp)),u=typeof requestAnimationFrame<"u"&&requestAnimationFrame,l&&h.sleep(),c=u||function(m){return setTimeout(m,o-h.time*1e3+1|0)},$o=1,g(2))},sleep:function(){(u?cancelAnimationFrame:clearTimeout)(l),$o=0,c=qo},lagSmoothing:function(m,_){t=m||1/0,e=Math.min(_||33,t)},fps:function(m){s=1e3/(m||240),o=h.time*1e3+s},add:function(m,_,M){var b=_?function(x,v,E,C){m(x,v,E,C),h.remove(b)}:m;return h.remove(m),a[M?"unshift":"push"](b),Qs(),b},remove:function(m,_){~(_=a.indexOf(m))&&a.splice(_,1)&&d>=_&&d--},_listeners:a},h}(),Qs=function(){return!$o&&Cn.wake()},ee={},Q_=/^[\d.\-M][\d.\-,\s]/,t0=/["']/g,e0=function(t){for(var e={},n=t.substr(1,t.length-3).split(":"),i=n[0],s=1,o=n.length,a,l,c;s<o;s++)l=n[s],a=s!==o-1?l.lastIndexOf(","):l.length,c=l.substr(0,a),e[i]=isNaN(c)?c.replace(t0,"").trim():+c,i=l.substr(a+1).trim();return e},n0=function(t){var e=t.indexOf("(")+1,n=t.indexOf(")"),i=t.indexOf("(",e);return t.substring(e,~i&&i<n?t.indexOf(")",n+1):n)},i0=function(t){var e=(t+"").split("("),n=ee[e[0]];return n&&e.length>1&&n.config?n.config.apply(null,~t.indexOf("{")?[e0(e[1])]:n0(t).split(",").map(kp)):ee._CE&&Q_.test(t)?ee._CE("",t):n},nm=function(t){return function(e){return 1-t(1-e)}},im=function r(t,e){for(var n=t._first,i;n;)n instanceof sn?r(n,e):n.vars.yoyoEase&&(!n._yoyo||!n._repeat)&&n._yoyo!==e&&(n.timeline?r(n.timeline,e):(i=n._ease,n._ease=n._yEase,n._yEase=i,n._yoyo=e)),n=n._next},Yr=function(t,e){return t&&(ye(t)?t:ee[t]||i0(t))||e},cs=function(t,e,n,i){n===void 0&&(n=function(l){return 1-e(1-l)}),i===void 0&&(i=function(l){return l<.5?e(l*2)/2:1-e((1-l)*2)/2});var s={easeIn:e,easeOut:n,easeInOut:i},o;return _n(t,function(a){ee[a]=On[a]=s,ee[o=a.toLowerCase()]=n;for(var l in s)ee[o+(l==="easeIn"?".in":l==="easeOut"?".out":".inOut")]=ee[a+"."+l]=s[l]}),s},rm=function(t){return function(e){return e<.5?(1-t(1-e*2))/2:.5+t((e-.5)*2)/2}},hc=function r(t,e,n){var i=e>=1?e:1,s=(n||(t?.3:.45))/(e<1?e:1),o=s/hu*(Math.asin(1/i)||0),a=function(u){return u===1?1:i*Math.pow(2,-10*u)*D_((u-o)*s)+1},l=t==="out"?a:t==="in"?function(c){return 1-a(1-c)}:rm(a);return s=hu/s,l.config=function(c,u){return r(t,c,u)},l},fc=function r(t,e){e===void 0&&(e=1.70158);var n=function(o){return o?--o*o*((e+1)*o+e)+1:0},i=t==="out"?n:t==="in"?function(s){return 1-n(1-s)}:rm(n);return i.config=function(s){return r(t,s)},i};_n("Linear,Quad,Cubic,Quart,Quint,Strong",function(r,t){var e=t<5?t+1:t;cs(r+",Power"+(e-1),t?function(n){return Math.pow(n,e)}:function(n){return n},function(n){return 1-Math.pow(1-n,e)},function(n){return n<.5?Math.pow(n*2,e)/2:1-Math.pow((1-n)*2,e)/2})});ee.Linear.easeNone=ee.none=ee.Linear.easeIn;cs("Elastic",hc("in"),hc("out"),hc());(function(r,t){var e=1/t,n=2*e,i=2.5*e,s=function(a){return a<e?r*a*a:a<n?r*Math.pow(a-1.5/t,2)+.75:a<i?r*(a-=2.25/t)*a+.9375:r*Math.pow(a-2.625/t,2)+.984375};cs("Bounce",function(o){return 1-s(1-o)},s)})(7.5625,2.75);cs("Expo",function(r){return r?Math.pow(2,10*(r-1)):0});cs("Circ",function(r){return-(Cp(1-r*r)-1)});cs("Sine",function(r){return r===1?1:-L_(r*A_)+1});cs("Back",fc("in"),fc("out"),fc());ee.SteppedEase=ee.steps=On.SteppedEase={config:function(t,e){t===void 0&&(t=1);var n=1/t,i=t+(e?0:1),s=e?1:0,o=1-Ye;return function(a){return((i*ca(0,o,a)|0)+s)*n}}};Zs.ease=ee["quad.out"];_n("onComplete,onUpdate,onStart,onRepeat,onReverseComplete,onInterrupt",function(r){return ph+=r+","+r+"Params,"});var sm=function(t,e){this.id=P_++,t._gsap=this,this.target=t,this.harness=e,this.get=e?e.get:Fp,this.set=e?e.getSetter:vh},jo=function(){function r(e){this.vars=e,this._delay=+e.delay||0,(this._repeat=e.repeat===1/0?-2:e.repeat||0)&&(this._rDelay=e.repeatDelay||0,this._yoyo=!!e.yoyo||!!e.yoyoEase),this._ts=1,Ks(this,+e.duration,1,1),this.data=e.data,fe&&(this._ctx=fe,fe.data.push(this)),$o||Cn.wake()}var t=r.prototype;return t.delay=function(n){return n||n===0?(this.parent&&this.parent.smoothChildTiming&&this.startTime(this._start+n-this._delay),this._delay=n,this):this._delay},t.duration=function(n){return arguments.length?this.totalDuration(this._repeat>0?n+(n+this._rDelay)*this._repeat:n):this.totalDuration()&&this._dur},t.totalDuration=function(n){return arguments.length?(this._dirty=0,Ks(this,this._repeat<0?n:(n-this._repeat*this._rDelay)/(this._repeat+1))):this._tDur},t.totalTime=function(n,i){if(Qs(),!arguments.length)return this._tTime;var s=this._dp;if(s&&s.smoothChildTiming&&this._ts){for(Hl(this,n),!s._dp||s.parent||Vp(s,this);s&&s.parent;)s.parent._time!==s._start+(s._ts>=0?s._tTime/s._ts:(s.totalDuration()-s._tTime)/-s._ts)&&s.totalTime(s._tTime,!0),s=s.parent;!this.parent&&this._dp.autoRemoveChildren&&(this._ts>0&&n<this._tDur||this._ts<0&&n>0||!this._tDur&&!n)&&mi(this._dp,this,this._start-this._delay)}return(this._tTime!==n||!this._dur&&!i||this._initted&&Math.abs(this._zTime)===Ye||!n&&!this._initted&&(this.add||this._ptLookup))&&(this._ts||(this._pTime=n),zp(this,n,i)),this},t.time=function(n,i){return arguments.length?this.totalTime(Math.min(this.totalDuration(),n+rf(this))%(this._dur+this._rDelay)||(n?this._dur:0),i):this._time},t.totalProgress=function(n,i){return arguments.length?this.totalTime(this.totalDuration()*n,i):this.totalDuration()?Math.min(1,this._tTime/this._tDur):this.rawTime()>0?1:0},t.progress=function(n,i){return arguments.length?this.totalTime(this.duration()*(this._yoyo&&!(this.iteration()&1)?1-n:n)+rf(this),i):this.duration()?Math.min(1,this._time/this._dur):this.rawTime()>0?1:0},t.iteration=function(n,i){var s=this.duration()+this._rDelay;return arguments.length?this.totalTime(this._time+(n-1)*s,i):this._repeat?Js(this._tTime,s)+1:1},t.timeScale=function(n,i){if(!arguments.length)return this._rts===-1e-8?0:this._rts;if(this._rts===n)return this;var s=this.parent&&this._ts?Sl(this.parent._time,this):this._tTime;return this._rts=+n||0,this._ts=this._ps||n===-1e-8?0:this._rts,this.totalTime(ca(-Math.abs(this._delay),this._tDur,s),i!==!1),Gl(this),k_(this)},t.paused=function(n){return arguments.length?(this._ps!==n&&(this._ps=n,n?(this._pTime=this._tTime||Math.max(-this._delay,this.rawTime()),this._ts=this._act=0):(Qs(),this._ts=this._rts,this.totalTime(this.parent&&!this.parent.smoothChildTiming?this.rawTime():this._tTime||this._pTime,this.progress()===1&&Math.abs(this._zTime)!==Ye&&(this._tTime-=Ye)))),this):this._ps},t.startTime=function(n){if(arguments.length){this._start=n;var i=this.parent||this._dp;return i&&(i._sort||!this.parent)&&mi(i,this,n-this._delay),this}return this._start},t.endTime=function(n){return this._start+(gn(n)?this.totalDuration():this.duration())/Math.abs(this._ts||1)},t.rawTime=function(n){var i=this.parent||this._dp;return i?n&&(!this._ts||this._repeat&&this._time&&this.totalProgress()<1)?this._tTime%(this._dur+this._rDelay):this._ts?Sl(i.rawTime(n),this):this._tTime:this._tTime},t.revert=function(n){n===void 0&&(n=O_);var i=je;return je=n,(this._initted||this._startAt)&&(this.timeline&&this.timeline.revert(n),this.totalTime(-.01,n.suppressEvents)),this.data!=="nested"&&n.kill!==!1&&this.kill(),je=i,this},t.globalTime=function(n){for(var i=this,s=arguments.length?n:i.rawTime();i;)s=i._start+s/(Math.abs(i._ts)||1),i=i._dp;return!this.parent&&this._sat?this._sat.globalTime(n):s},t.repeat=function(n){return arguments.length?(this._repeat=n===1/0?-2:n,sf(this)):this._repeat===-2?1/0:this._repeat},t.repeatDelay=function(n){if(arguments.length){var i=this._time;return this._rDelay=n,sf(this),i?this.time(i):this}return this._rDelay},t.yoyo=function(n){return arguments.length?(this._yoyo=n,this):this._yoyo},t.seek=function(n,i){return this.totalTime(Un(this,n),gn(i))},t.restart=function(n,i){return this.play().totalTime(n?-this._delay:0,gn(i))},t.play=function(n,i){return n!=null&&this.seek(n,i),this.reversed(!1).paused(!1)},t.reverse=function(n,i){return n!=null&&this.seek(n||this.totalDuration(),i),this.reversed(!0).paused(!1)},t.pause=function(n,i){return n!=null&&this.seek(n,i),this.paused(!0)},t.resume=function(){return this.paused(!1)},t.reversed=function(n){return arguments.length?(!!n!==this.reversed()&&this.timeScale(-this._rts||(n?-1e-8:0)),this):this._rts<0},t.invalidate=function(){return this._initted=this._act=0,this._zTime=-1e-8,this},t.isActive=function(){var n=this.parent||this._dp,i=this._start,s;return!!(!n||this._ts&&this._initted&&n.isActive()&&(s=n.rawTime(!0))>=i&&s<this.endTime(!0)-Ye)},t.eventCallback=function(n,i,s){var o=this.vars;return arguments.length>1?(i?(o[n]=i,s&&(o[n+"Params"]=s),n==="onUpdate"&&(this._onUpdate=i)):delete o[n],this):o[n]},t.then=function(n){var i=this;return new Promise(function(s){var o=ye(n)?n:Up,a=function(){var c=i.then;i.then=null,ye(o)&&(o=o(i))&&(o.then||o===i)&&(i.then=c),s(o),i.then=c};i._initted&&i.totalProgress()===1&&i._ts>=0||!i._tTime&&i._ts<0?a():i._prom=a})},t.kill=function(){So(this)},r}();Xn(jo.prototype,{_time:0,_start:0,_end:0,_tTime:0,_tDur:0,_dirty:0,_repeat:0,_yoyo:!1,parent:null,_initted:!1,_rDelay:0,_ts:1,_dp:0,ratio:0,_zTime:-1e-8,_prom:0,_ps:!1,_rts:1});var sn=function(r){Ep(t,r);function t(n,i){var s;return n===void 0&&(n={}),s=r.call(this,n)||this,s.labels={},s.smoothChildTiming=!!n.smoothChildTiming,s.autoRemoveChildren=!!n.autoRemoveChildren,s._sort=gn(n.sortChildren),ge&&mi(n.parent||ge,Fi(s),i),n.reversed&&s.reverse(),n.paused&&s.paused(!0),n.scrollTrigger&&Gp(Fi(s),n.scrollTrigger),s}var e=t.prototype;return e.to=function(i,s,o){return Ro(0,arguments,this),this},e.from=function(i,s,o){return Ro(1,arguments,this),this},e.fromTo=function(i,s,o,a){return Ro(2,arguments,this),this},e.set=function(i,s,o){return s.duration=0,s.parent=this,Do(s).repeatDelay||(s.repeat=0),s.immediateRender=!!s.immediateRender,new Ce(i,s,Un(this,o),1),this},e.call=function(i,s,o){return mi(this,Ce.delayedCall(0,i,s),o)},e.staggerTo=function(i,s,o,a,l,c,u){return o.duration=s,o.stagger=o.stagger||a,o.onComplete=c,o.onCompleteParams=u,o.parent=this,new Ce(i,o,Un(this,l)),this},e.staggerFrom=function(i,s,o,a,l,c,u){return o.runBackwards=1,Do(o).immediateRender=gn(o.immediateRender),this.staggerTo(i,s,o,a,l,c,u)},e.staggerFromTo=function(i,s,o,a,l,c,u,h){return a.startAt=o,Do(a).immediateRender=gn(a.immediateRender),this.staggerTo(i,s,a,l,c,u,h)},e.render=function(i,s,o){var a=this._time,l=this._dirty?this.totalDuration():this._tDur,c=this._dur,u=i<=0?0:Oe(i),h=this._zTime<0!=i<0&&(this._initted||!c),f,d,g,p,m,_,M,b,x,v,E,C;if(this!==ge&&u>l&&i>=0&&(u=l),u!==this._tTime||o||h){if(a!==this._time&&c&&(u+=this._time-a,i+=this._time-a),f=u,x=this._start,b=this._ts,_=!b,h&&(c||(a=this._zTime),(i||!s)&&(this._zTime=i)),this._repeat){if(E=this._yoyo,m=c+this._rDelay,this._repeat<-1&&i<0)return this.totalTime(m*100+i,s,o);if(f=Oe(u%m),u===l?(p=this._repeat,f=c):(p=~~(u/m),p&&p===u/m&&(f=c,p--),f>c&&(f=c)),v=Js(this._tTime,m),!a&&this._tTime&&v!==p&&this._tTime-v*m-this._dur<=0&&(v=p),E&&p&1&&(f=c-f,C=1),p!==v&&!this._lock){var y=E&&v&1,w=y===(E&&p&1);if(p<v&&(y=!y),a=y?0:u%c?c:u,this._lock=1,this.render(a||(C?0:Oe(p*m)),s,!c)._lock=0,this._tTime=u,!s&&this.parent&&Dn(this,"onRepeat"),this.vars.repeatRefresh&&!C&&(this.invalidate()._lock=1),a&&a!==this._time||_!==!this._ts||this.vars.onRepeat&&!this.parent&&!this._act)return this;if(c=this._dur,l=this._tDur,w&&(this._lock=2,a=y?c:-1e-4,this.render(a,!0),this.vars.repeatRefresh&&!C&&this.invalidate()),this._lock=0,!this._ts&&!_)return this;im(this,C)}}if(this._hasPause&&!this._forcing&&this._lock<2&&(M=G_(this,Oe(a),Oe(f)),M&&(u-=f-(f=M._start))),this._tTime=u,this._time=f,this._act=!b,this._initted||(this._onUpdate=this.vars.onUpdate,this._initted=1,this._zTime=i,a=0),!a&&f&&!s&&!p&&(Dn(this,"onStart"),this._tTime!==u))return this;if(f>=a&&i>=0)for(d=this._first;d;){if(g=d._next,(d._act||f>=d._start)&&d._ts&&M!==d){if(d.parent!==this)return this.render(i,s,o);if(d.render(d._ts>0?(f-d._start)*d._ts:(d._dirty?d.totalDuration():d._tDur)+(f-d._start)*d._ts,s,o),f!==this._time||!this._ts&&!_){M=0,g&&(u+=this._zTime=-1e-8);break}}d=g}else{d=this._last;for(var D=i<0?i:f;d;){if(g=d._prev,(d._act||D<=d._end)&&d._ts&&M!==d){if(d.parent!==this)return this.render(i,s,o);if(d.render(d._ts>0?(D-d._start)*d._ts:(d._dirty?d.totalDuration():d._tDur)+(D-d._start)*d._ts,s,o||je&&(d._initted||d._startAt)),f!==this._time||!this._ts&&!_){M=0,g&&(u+=this._zTime=D?-1e-8:Ye);break}}d=g}}if(M&&!s&&(this.pause(),M.render(f>=a?0:-1e-8)._zTime=f>=a?1:-1,this._ts))return this._start=x,Gl(this),this.render(i,s,o);this._onUpdate&&!s&&Dn(this,"onUpdate",!0),(u===l&&this._tTime>=this.totalDuration()||!u&&a)&&(x===this._start||Math.abs(b)!==Math.abs(this._ts))&&(this._lock||((i||!c)&&(u===l&&this._ts>0||!u&&this._ts<0)&&yr(this,1),!s&&!(i<0&&!a)&&(u||a||!l)&&(Dn(this,u===l&&i>=0?"onComplete":"onReverseComplete",!0),this._prom&&!(u<l&&this.timeScale()>0)&&this._prom())))}return this},e.add=function(i,s){var o=this;if(qi(s)||(s=Un(this,s,i)),!(i instanceof jo)){if(Ze(i))return i.forEach(function(a){return o.add(a,s)}),this;if(Fe(i))return this.addLabel(i,s);if(ye(i))i=Ce.delayedCall(0,i);else return this}return this!==i?mi(this,i,s):this},e.getChildren=function(i,s,o,a){i===void 0&&(i=!0),s===void 0&&(s=!0),o===void 0&&(o=!0),a===void 0&&(a=-1e8);for(var l=[],c=this._first;c;)c._start>=a&&(c instanceof Ce?s&&l.push(c):(o&&l.push(c),i&&l.push.apply(l,c.getChildren(!0,s,o)))),c=c._next;return l},e.getById=function(i){for(var s=this.getChildren(1,1,1),o=s.length;o--;)if(s[o].vars.id===i)return s[o]},e.remove=function(i){return Fe(i)?this.removeLabel(i):ye(i)?this.killTweensOf(i):(Vl(this,i),i===this._recent&&(this._recent=this._last),qr(this))},e.totalTime=function(i,s){return arguments.length?(this._forcing=1,!this._dp&&this._ts&&(this._start=Oe(Cn.time-(this._ts>0?i/this._ts:(this.totalDuration()-i)/-this._ts))),r.prototype.totalTime.call(this,i,s),this._forcing=0,this):this._tTime},e.addLabel=function(i,s){return this.labels[i]=Un(this,s),this},e.removeLabel=function(i){return delete this.labels[i],this},e.addPause=function(i,s,o){var a=Ce.delayedCall(0,s||qo,o);return a.data="isPause",this._hasPause=1,mi(this,a,Un(this,i))},e.removePause=function(i){var s=this._first;for(i=Un(this,i);s;)s._start===i&&s.data==="isPause"&&yr(s),s=s._next},e.killTweensOf=function(i,s,o){for(var a=this.getTweensOf(i,o),l=a.length;l--;)ar!==a[l]&&a[l].kill(i,s);return this},e.getTweensOf=function(i,s){for(var o=[],a=Hn(i),l=this._first,c=qi(s),u;l;)l instanceof Ce?N_(l._targets,a)&&(c?(!ar||l._initted&&l._ts)&&l.globalTime(0)<=s&&l.globalTime(l.totalDuration())>s:!s||l.isActive())&&o.push(l):(u=l.getTweensOf(a,s)).length&&o.push.apply(o,u),l=l._next;return o},e.tweenTo=function(i,s){s=s||{};var o=this,a=Un(o,i),l=s,c=l.startAt,u=l.onStart,h=l.onStartParams,f=l.immediateRender,d,g=Ce.to(o,Xn({ease:s.ease||"none",lazy:!1,immediateRender:!1,time:a,overwrite:"auto",duration:s.duration||Math.abs((a-(c&&"time"in c?c.time:o._time))/o.timeScale())||Ye,onStart:function(){if(o.pause(),!d){var m=s.duration||Math.abs((a-(c&&"time"in c?c.time:o._time))/o.timeScale());g._dur!==m&&Ks(g,m,0,1).render(g._time,!0,!0),d=1}u&&u.apply(g,h||[])}},s));return f?g.render(0):g},e.tweenFromTo=function(i,s,o){return this.tweenTo(s,Xn({startAt:{time:Un(this,i)}},o))},e.recent=function(){return this._recent},e.nextLabel=function(i){return i===void 0&&(i=this._time),of(this,Un(this,i))},e.previousLabel=function(i){return i===void 0&&(i=this._time),of(this,Un(this,i),1)},e.currentLabel=function(i){return arguments.length?this.seek(i,!0):this.previousLabel(this._time+Ye)},e.shiftChildren=function(i,s,o){o===void 0&&(o=0);for(var a=this._first,l=this.labels,c;a;)a._start>=o&&(a._start+=i,a._end+=i),a=a._next;if(s)for(c in l)l[c]>=o&&(l[c]+=i);return qr(this)},e.invalidate=function(i){var s=this._first;for(this._lock=0;s;)s.invalidate(i),s=s._next;return r.prototype.invalidate.call(this,i)},e.clear=function(i){i===void 0&&(i=!0);for(var s=this._first,o;s;)o=s._next,this.remove(s),s=o;return this._dp&&(this._time=this._tTime=this._pTime=0),i&&(this.labels={}),qr(this)},e.totalDuration=function(i){var s=0,o=this,a=o._last,l=vi,c,u,h;if(arguments.length)return o.timeScale((o._repeat<0?o.duration():o.totalDuration())/(o.reversed()?-i:i));if(o._dirty){for(h=o.parent;a;)c=a._prev,a._dirty&&a.totalDuration(),u=a._start,u>l&&o._sort&&a._ts&&!o._lock?(o._lock=1,mi(o,a,u-a._delay,1)._lock=0):l=u,u<0&&a._ts&&(s-=u,(!h&&!o._dp||h&&h.smoothChildTiming)&&(o._start+=u/o._ts,o._time-=u,o._tTime-=u),o.shiftChildren(-u,!1,-1/0),l=0),a._end>s&&a._ts&&(s=a._end),a=c;Ks(o,o===ge&&o._time>s?o._time:s,1,1),o._dirty=0}return o._tDur},t.updateRoot=function(i){if(ge._ts&&(zp(ge,Sl(i,ge)),Np=Cn.frame),Cn.frame>=ef){ef+=Rn.autoSleep||120;var s=ge._first;if((!s||!s._ts)&&Rn.autoSleep&&Cn._listeners.length<2){for(;s&&!s._ts;)s=s._next;s||Cn.sleep()}}},t}(jo);Xn(sn.prototype,{_lock:0,_hasPause:0,_forcing:0});var r0=function(t,e,n,i,s,o,a){var l=new xn(this._pt,t,e,0,1,hm,null,s),c=0,u=0,h,f,d,g,p,m,_,M;for(l.b=n,l.e=i,n+="",i+="",(_=~i.indexOf("random("))&&(i=Yo(i)),o&&(M=[n,i],o(M,t,e),n=M[0],i=M[1]),f=n.match(lc)||[];h=lc.exec(i);)g=h[0],p=i.substring(c,h.index),d?d=(d+1)%5:p.substr(-5)==="rgba("&&(d=1),g!==f[u++]&&(m=parseFloat(f[u-1])||0,l._pt={_next:l._pt,p:p||u===1?p:",",s:m,c:g.charAt(1)==="="?Us(m,g)-m:parseFloat(g)-m,m:d&&d<4?Math.round:0},c=lc.lastIndex);return l.c=c<i.length?i.substring(c,i.length):"",l.fp=a,(Lp.test(i)||_)&&(l.e=0),this._pt=l,l},gh=function(t,e,n,i,s,o,a,l,c,u){ye(i)&&(i=i(s||0,t,o));var h=t[e],f=n!=="get"?n:ye(h)?c?t[e.indexOf("set")||!ye(t["get"+e.substr(3)])?e:"get"+e.substr(3)](c):t[e]():h,d=ye(h)?c?c0:cm:xh,g;if(Fe(i)&&(~i.indexOf("random(")&&(i=Yo(i)),i.charAt(1)==="="&&(g=Us(f,i)+(qe(f)||0),(g||g===0)&&(i=g))),!u||f!==i||yu)return!isNaN(f*i)&&i!==""?(g=new xn(this._pt,t,e,+f||0,i-(f||0),typeof h=="boolean"?h0:um,0,d),c&&(g.fp=c),a&&g.modifier(a,this,t),this._pt=g):(!h&&!(e in t)&&fh(e,i),r0.call(this,t,e,f,i,d,l||Rn.stringFilter,c))},s0=function(t,e,n,i,s){if(ye(t)&&(t=Io(t,s,e,n,i)),!Ti(t)||t.style&&t.nodeType||Ze(t)||Ap(t))return Fe(t)?Io(t,s,e,n,i):t;var o={},a;for(a in t)o[a]=Io(t[a],s,e,n,i);return o},om=function(t,e,n,i,s,o){var a,l,c,u;if(En[t]&&(a=new En[t]).init(s,a.rawVars?e[t]:s0(e[t],i,s,o,n),n,i,o)!==!1&&(n._pt=l=new xn(n._pt,s,t,0,1,a.render,a,0,a.priority),n!==Os))for(c=n._ptLookup[n._targets.indexOf(s)],u=a._props.length;u--;)c[a._props[u]]=l;return a},ar,yu,_h=function r(t,e,n){var i=t.vars,s=i.ease,o=i.startAt,a=i.immediateRender,l=i.lazy,c=i.onUpdate,u=i.runBackwards,h=i.yoyoEase,f=i.keyframes,d=i.autoRevert,g=t._dur,p=t._startAt,m=t._targets,_=t.parent,M=_&&_.data==="nested"?_.vars.targets:m,b=t._overwrite==="auto"&&!lh,x=t.timeline,v,E,C,y,w,D,B,k,Z,V,$,Y,H;if(x&&(!f||!s)&&(s="none"),t._ease=Yr(s,Zs.ease),t._yEase=h?nm(Yr(h===!0?s:h,Zs.ease)):0,h&&t._yoyo&&!t._repeat&&(h=t._yEase,t._yEase=t._ease,t._ease=h),t._from=!x&&!!i.runBackwards,!x||f&&!i.stagger){if(k=m[0]?Xr(m[0]).harness:0,Y=k&&i[k.prop],v=Ml(i,dh),p&&(p._zTime<0&&p.progress(1),e<0&&u&&a&&!d?p.render(-1,!0):p.revert(u&&g?il:I_),p._lazy=0),o){if(yr(t._startAt=Ce.set(m,Xn({data:"isStart",overwrite:!1,parent:_,immediateRender:!0,lazy:!p&&gn(l),startAt:null,delay:0,onUpdate:c&&function(){return Dn(t,"onUpdate")},stagger:0},o))),t._startAt._dp=0,t._startAt._sat=t,e<0&&(je||!a&&!d)&&t._startAt.revert(il),a&&g&&e<=0&&n<=0){e&&(t._zTime=e);return}}else if(u&&g&&!p){if(e&&(a=!1),C=Xn({overwrite:!1,data:"isFromStart",lazy:a&&!p&&gn(l),immediateRender:a,stagger:0,parent:_},v),Y&&(C[k.prop]=Y),yr(t._startAt=Ce.set(m,C)),t._startAt._dp=0,t._startAt._sat=t,e<0&&(je?t._startAt.revert(il):t._startAt.render(-1,!0)),t._zTime=e,!a)r(t._startAt,Ye,Ye);else if(!e)return}for(t._pt=t._ptCache=0,l=g&&gn(l)||l&&!g,E=0;E<m.length;E++){if(w=m[E],B=w._gsap||mh(m)[E]._gsap,t._ptLookup[E]=V={},pu[B.id]&&dr.length&&yl(),$=M===m?E:M.indexOf(w),k&&(Z=new k).init(w,Y||v,t,$,M)!==!1&&(t._pt=y=new xn(t._pt,w,Z.name,0,1,Z.render,Z,0,Z.priority),Z._props.forEach(function(G){V[G]=y}),Z.priority&&(D=1)),!k||Y)for(C in v)En[C]&&(Z=om(C,v,t,$,w,M))?Z.priority&&(D=1):V[C]=y=gh.call(t,w,C,"get",v[C],$,M,0,i.stringFilter);t._op&&t._op[E]&&t.kill(w,t._op[E]),b&&t._pt&&(ar=t,ge.killTweensOf(w,V,t.globalTime(e)),H=!t.parent,ar=0),t._pt&&l&&(pu[B.id]=1)}D&&fm(t),t._onInit&&t._onInit(t)}t._onUpdate=c,t._initted=(!t._op||t._pt)&&!H,f&&e<=0&&x.render(vi,!0,!0)},o0=function(t,e,n,i,s,o,a,l){var c=(t._pt&&t._ptCache||(t._ptCache={}))[e],u,h,f,d;if(!c)for(c=t._ptCache[e]=[],f=t._ptLookup,d=t._targets.length;d--;){if(u=f[d][e],u&&u.d&&u.d._pt)for(u=u.d._pt;u&&u.p!==e&&u.fp!==e;)u=u._next;if(!u)return yu=1,t.vars[e]="+=0",_h(t,a),yu=0,l?Xo(e+" not eligible for reset"):1;c.push(u)}for(d=c.length;d--;)h=c[d],u=h._pt||h,u.s=(i||i===0)&&!s?i:u.s+(i||0)+o*u.c,u.c=n-u.s,h.e&&(h.e=Se(n)+qe(h.e)),h.b&&(h.b=u.s+qe(h.b))},a0=function(t,e){var n=t[0]?Xr(t[0]).harness:0,i=n&&n.aliases,s,o,a,l;if(!i)return e;s=es({},e);for(o in i)if(o in s)for(l=i[o].split(","),a=l.length;a--;)s[l[a]]=s[o];return s},l0=function(t,e,n,i){var s=e.ease||i||"power1.inOut",o,a;if(Ze(e))a=n[t]||(n[t]=[]),e.forEach(function(l,c){return a.push({t:c/(e.length-1)*100,v:l,e:s})});else for(o in e)a=n[o]||(n[o]=[]),o==="ease"||a.push({t:parseFloat(t),v:e[o],e:s})},Io=function(t,e,n,i,s){return ye(t)?t.call(e,n,i,s):Fe(t)&&~t.indexOf("random(")?Yo(t):t},am=ph+"repeat,repeatDelay,yoyo,repeatRefresh,yoyoEase,autoRevert",lm={};_n(am+",id,stagger,delay,duration,paused,scrollTrigger",function(r){return lm[r]=1});var Ce=function(r){Ep(t,r);function t(n,i,s,o){var a;typeof i=="number"&&(s.duration=i,i=s,s=null),a=r.call(this,o?i:Do(i))||this;var l=a.vars,c=l.duration,u=l.delay,h=l.immediateRender,f=l.stagger,d=l.overwrite,g=l.keyframes,p=l.defaults,m=l.scrollTrigger,_=l.yoyoEase,M=i.parent||ge,b=(Ze(n)||Ap(n)?qi(n[0]):"length"in i)?[n]:Hn(n),x,v,E,C,y,w,D,B;if(a._targets=b.length?mh(b):Xo("GSAP target "+n+" not found. https://gsap.com",!Rn.nullTargetWarn)||[],a._ptLookup=[],a._overwrite=d,g||f||ga(c)||ga(u)){if(i=a.vars,x=a.timeline=new sn({data:"nested",defaults:p||{},targets:M&&M.data==="nested"?M.vars.targets:b}),x.kill(),x.parent=x._dp=Fi(a),x._start=0,f||ga(c)||ga(u)){if(C=b.length,D=f&&qp(f),Ti(f))for(y in f)~am.indexOf(y)&&(B||(B={}),B[y]=f[y]);for(v=0;v<C;v++)E=Ml(i,lm),E.stagger=0,_&&(E.yoyoEase=_),B&&es(E,B),w=b[v],E.duration=+Io(c,Fi(a),v,w,b),E.delay=(+Io(u,Fi(a),v,w,b)||0)-a._delay,!f&&C===1&&E.delay&&(a._delay=u=E.delay,a._start+=u,E.delay=0),x.to(w,E,D?D(v,w,b):0),x._ease=ee.none;x.duration()?c=u=0:a.timeline=0}else if(g){Do(Xn(x.vars.defaults,{ease:"none"})),x._ease=Yr(g.ease||i.ease||"none");var k=0,Z,V,$;if(Ze(g))g.forEach(function(Y){return x.to(b,Y,">")}),x.duration();else{E={};for(y in g)y==="ease"||y==="easeEach"||l0(y,g[y],E,g.easeEach);for(y in E)for(Z=E[y].sort(function(Y,H){return Y.t-H.t}),k=0,v=0;v<Z.length;v++)V=Z[v],$={ease:V.e,duration:(V.t-(v?Z[v-1].t:0))/100*c},$[y]=V.v,x.to(b,$,k),k+=$.duration;x.duration()<c&&x.to({},{duration:c-x.duration()})}}c||a.duration(c=x.duration())}else a.timeline=0;return d===!0&&!lh&&(ar=Fi(a),ge.killTweensOf(b),ar=0),mi(M,Fi(a),s),i.reversed&&a.reverse(),i.paused&&a.paused(!0),(h||!c&&!g&&a._start===Oe(M._time)&&gn(h)&&U_(Fi(a))&&M.data!=="nested")&&(a._tTime=-1e-8,a.render(Math.max(0,-u)||0)),m&&Gp(Fi(a),m),a}var e=t.prototype;return e.render=function(i,s,o){var a=this._time,l=this._tDur,c=this._dur,u=i<0,h=i>l-Ye&&!u?l:i<Ye?0:i,f,d,g,p,m,_,M,b,x;if(!c)V_(this,i,s,o);else if(h!==this._tTime||!i||o||!this._initted&&this._tTime||this._startAt&&this._zTime<0!==u){if(f=h,b=this.timeline,this._repeat){if(p=c+this._rDelay,this._repeat<-1&&u)return this.totalTime(p*100+i,s,o);if(f=Oe(h%p),h===l?(g=this._repeat,f=c):(g=~~(h/p),g&&g===Oe(h/p)&&(f=c,g--),f>c&&(f=c)),_=this._yoyo&&g&1,_&&(x=this._yEase,f=c-f),m=Js(this._tTime,p),f===a&&!o&&this._initted&&g===m)return this._tTime=h,this;g!==m&&(b&&this._yEase&&im(b,_),this.vars.repeatRefresh&&!_&&!this._lock&&this._time!==p&&this._initted&&(this._lock=o=1,this.render(Oe(p*g),!0).invalidate()._lock=0))}if(!this._initted){if(Hp(this,u?i:f,o,s,h))return this._tTime=0,this;if(a!==this._time&&!(o&&this.vars.repeatRefresh&&g!==m))return this;if(c!==this._dur)return this.render(i,s,o)}if(this._tTime=h,this._time=f,!this._act&&this._ts&&(this._act=1,this._lazy=0),this.ratio=M=(x||this._ease)(f/c),this._from&&(this.ratio=M=1-M),f&&!a&&!s&&!g&&(Dn(this,"onStart"),this._tTime!==h))return this;for(d=this._pt;d;)d.r(M,d.d),d=d._next;b&&b.render(i<0?i:b._dur*b._ease(f/this._dur),s,o)||this._startAt&&(this._zTime=i),this._onUpdate&&!s&&(u&&mu(this,i,s,o),Dn(this,"onUpdate")),this._repeat&&g!==m&&this.vars.onRepeat&&!s&&this.parent&&Dn(this,"onRepeat"),(h===this._tDur||!h)&&this._tTime===h&&(u&&!this._onUpdate&&mu(this,i,!0,!0),(i||!c)&&(h===this._tDur&&this._ts>0||!h&&this._ts<0)&&yr(this,1),!s&&!(u&&!a)&&(h||a||_)&&(Dn(this,h===l?"onComplete":"onReverseComplete",!0),this._prom&&!(h<l&&this.timeScale()>0)&&this._prom()))}return this},e.targets=function(){return this._targets},e.invalidate=function(i){return(!i||!this.vars.runBackwards)&&(this._startAt=0),this._pt=this._op=this._onUpdate=this._lazy=this.ratio=0,this._ptLookup=[],this.timeline&&this.timeline.invalidate(i),r.prototype.invalidate.call(this,i)},e.resetTo=function(i,s,o,a,l){$o||Cn.wake(),this._ts||this.play();var c=Math.min(this._dur,(this._dp._time-this._start)*this._ts),u;return this._initted||_h(this,c),u=this._ease(c/this._dur),o0(this,i,s,o,a,u,c,l)?this.resetTo(i,s,o,a,1):(Hl(this,0),this.parent||Bp(this._dp,this,"_first","_last",this._dp._sort?"_start":0),this.render(0))},e.kill=function(i,s){if(s===void 0&&(s="all"),!i&&(!s||s==="all"))return this._lazy=this._pt=0,this.parent?So(this):this;if(this.timeline){var o=this.timeline.totalDuration();return this.timeline.killTweensOf(i,s,ar&&ar.vars.overwrite!==!0)._first||So(this),this.parent&&o!==this.timeline.totalDuration()&&Ks(this,this._dur*this.timeline._tDur/o,0,1),this}var a=this._targets,l=i?Hn(i):a,c=this._ptLookup,u=this._pt,h,f,d,g,p,m,_;if((!s||s==="all")&&z_(a,l))return s==="all"&&(this._pt=0),So(this);for(h=this._op=this._op||[],s!=="all"&&(Fe(s)&&(p={},_n(s,function(M){return p[M]=1}),s=p),s=a0(a,s)),_=a.length;_--;)if(~l.indexOf(a[_])){f=c[_],s==="all"?(h[_]=s,g=f,d={}):(d=h[_]=h[_]||{},g=s);for(p in g)m=f&&f[p],m&&((!("kill"in m.d)||m.d.kill(p)===!0)&&Vl(this,m,"_pt"),delete f[p]),d!=="all"&&(d[p]=1)}return this._initted&&!this._pt&&u&&So(this),this},t.to=function(i,s){return new t(i,s,arguments[2])},t.from=function(i,s){return Ro(1,arguments)},t.delayedCall=function(i,s,o,a){return new t(s,0,{immediateRender:!1,lazy:!1,overwrite:!1,delay:i,onComplete:s,onReverseComplete:s,onCompleteParams:o,onReverseCompleteParams:o,callbackScope:a})},t.fromTo=function(i,s,o){return Ro(2,arguments)},t.set=function(i,s){return s.duration=0,s.repeatDelay||(s.repeat=0),new t(i,s)},t.killTweensOf=function(i,s,o){return ge.killTweensOf(i,s,o)},t}(jo);Xn(Ce.prototype,{_targets:[],_lazy:0,_startAt:0,_op:0,_onInit:0});_n("staggerTo,staggerFrom,staggerFromTo",function(r){Ce[r]=function(){var t=new sn,e=_u.call(arguments,0);return e.splice(r==="staggerFromTo"?5:4,0,0),t[r].apply(t,e)}});var xh=function(t,e,n){return t[e]=n},cm=function(t,e,n){return t[e](n)},c0=function(t,e,n,i){return t[e](i.fp,n)},u0=function(t,e,n){return t.setAttribute(e,n)},vh=function(t,e){return ye(t[e])?cm:ch(t[e])&&t.setAttribute?u0:xh},um=function(t,e){return e.set(e.t,e.p,Math.round((e.s+e.c*t)*1e6)/1e6,e)},h0=function(t,e){return e.set(e.t,e.p,!!(e.s+e.c*t),e)},hm=function(t,e){var n=e._pt,i="";if(!t&&e.b)i=e.b;else if(t===1&&e.e)i=e.e;else{for(;n;)i=n.p+(n.m?n.m(n.s+n.c*t):Math.round((n.s+n.c*t)*1e4)/1e4)+i,n=n._next;i+=e.c}e.set(e.t,e.p,i,e)},yh=function(t,e){for(var n=e._pt;n;)n.r(t,n.d),n=n._next},f0=function(t,e,n,i){for(var s=this._pt,o;s;)o=s._next,s.p===i&&s.modifier(t,e,n),s=o},d0=function(t){for(var e=this._pt,n,i;e;)i=e._next,e.p===t&&!e.op||e.op===t?Vl(this,e,"_pt"):e.dep||(n=1),e=i;return!n},p0=function(t,e,n,i){i.mSet(t,e,i.m.call(i.tween,n,i.mt),i)},fm=function(t){for(var e=t._pt,n,i,s,o;e;){for(n=e._next,i=s;i&&i.pr>e.pr;)i=i._next;(e._prev=i?i._prev:o)?e._prev._next=e:s=e,(e._next=i)?i._prev=e:o=e,e=n}t._pt=s},xn=function(){function r(e,n,i,s,o,a,l,c,u){this.t=n,this.s=s,this.c=o,this.p=i,this.r=a||um,this.d=l||this,this.set=c||xh,this.pr=u||0,this._next=e,e&&(e._prev=this)}var t=r.prototype;return t.modifier=function(n,i,s){this.mSet=this.mSet||this.set,this.set=p0,this.m=n,this.mt=s,this.tween=i},r}();_n(ph+"parent,duration,ease,delay,overwrite,runBackwards,startAt,yoyo,immediateRender,repeat,repeatDelay,data,paused,reversed,lazy,callbackScope,stringFilter,id,yoyoEase,stagger,inherit,repeatRefresh,keyframes,autoRevert,scrollTrigger",function(r){return dh[r]=1});On.TweenMax=On.TweenLite=Ce;On.TimelineLite=On.TimelineMax=sn;ge=new sn({sortChildren:!1,defaults:Zs,autoRemoveChildren:!0,id:"root",smoothChildTiming:!0});Rn.stringFilter=em;var $r=[],sl={},m0=[],lf=0,g0=0,dc=function(t){return(sl[t]||m0).map(function(e){return e()})},Mu=function(){var t=Date.now(),e=[];t-lf>2&&(dc("matchMediaInit"),$r.forEach(function(n){var i=n.queries,s=n.conditions,o,a,l,c;for(a in i)o=fi.matchMedia(i[a]).matches,o&&(l=1),o!==s[a]&&(s[a]=o,c=1);c&&(n.revert(),l&&e.push(n))}),dc("matchMediaRevert"),e.forEach(function(n){return n.onMatch(n,function(i){return n.add(null,i)})}),lf=t,dc("matchMedia"))},dm=function(){function r(e,n){this.selector=n&&xu(n),this.data=[],this._r=[],this.isReverted=!1,this.id=g0++,e&&this.add(e)}var t=r.prototype;return t.add=function(n,i,s){ye(n)&&(s=i,i=n,n=ye);var o=this,a=function(){var c=fe,u=o.selector,h;return c&&c!==o&&c.data.push(o),s&&(o.selector=xu(s)),fe=o,h=i.apply(o,arguments),ye(h)&&o._r.push(h),fe=c,o.selector=u,o.isReverted=!1,h};return o.last=a,n===ye?a(o,function(l){return o.add(null,l)}):n?o[n]=a:a},t.ignore=function(n){var i=fe;fe=null,n(this),fe=i},t.getTweens=function(){var n=[];return this.data.forEach(function(i){return i instanceof r?n.push.apply(n,i.getTweens()):i instanceof Ce&&!(i.parent&&i.parent.data==="nested")&&n.push(i)}),n},t.clear=function(){this._r.length=this.data.length=0},t.kill=function(n,i){var s=this;if(n?function(){for(var a=s.getTweens(),l=s.data.length,c;l--;)c=s.data[l],c.data==="isFlip"&&(c.revert(),c.getChildren(!0,!0,!1).forEach(function(u){return a.splice(a.indexOf(u),1)}));for(a.map(function(u){return{g:u._dur||u._delay||u._sat&&!u._sat.vars.immediateRender?u.globalTime(0):-1/0,t:u}}).sort(function(u,h){return h.g-u.g||-1/0}).forEach(function(u){return u.t.revert(n)}),l=s.data.length;l--;)c=s.data[l],c instanceof sn?c.data!=="nested"&&(c.scrollTrigger&&c.scrollTrigger.revert(),c.kill()):!(c instanceof Ce)&&c.revert&&c.revert(n);s._r.forEach(function(u){return u(n,s)}),s.isReverted=!0}():this.data.forEach(function(a){return a.kill&&a.kill()}),this.clear(),i)for(var o=$r.length;o--;)$r[o].id===this.id&&$r.splice(o,1)},t.revert=function(n){this.kill(n||{})},r}(),_0=function(){function r(e){this.contexts=[],this.scope=e,fe&&fe.data.push(this)}var t=r.prototype;return t.add=function(n,i,s){Ti(n)||(n={matches:n});var o=new dm(0,s||this.scope),a=o.conditions={},l,c,u;fe&&!o.selector&&(o.selector=fe.selector),this.contexts.push(o),i=o.add("onMatch",i),o.queries=n;for(c in n)c==="all"?u=1:(l=fi.matchMedia(n[c]),l&&($r.indexOf(o)<0&&$r.push(o),(a[c]=l.matches)&&(u=1),l.addListener?l.addListener(Mu):l.addEventListener("change",Mu)));return u&&i(o,function(h){return o.add(null,h)}),this},t.revert=function(n){this.kill(n||{})},t.kill=function(n){this.contexts.forEach(function(i){return i.kill(n,!0)})},r}(),bl={registerPlugin:function(){for(var t=arguments.length,e=new Array(t),n=0;n<t;n++)e[n]=arguments[n];e.forEach(function(i){return Kp(i)})},timeline:function(t){return new sn(t)},getTweensOf:function(t,e){return ge.getTweensOf(t,e)},getProperty:function(t,e,n,i){Fe(t)&&(t=Hn(t)[0]);var s=Xr(t||{}).get,o=n?Up:kp;return n==="native"&&(n=""),t&&(e?o((En[e]&&En[e].get||s)(t,e,n,i)):function(a,l,c){return o((En[a]&&En[a].get||s)(t,a,l,c))})},quickSetter:function(t,e,n){if(t=Hn(t),t.length>1){var i=t.map(function(u){return yn.quickSetter(u,e,n)}),s=i.length;return function(u){for(var h=s;h--;)i[h](u)}}t=t[0]||{};var o=En[e],a=Xr(t),l=a.harness&&(a.harness.aliases||{})[e]||e,c=o?function(u){var h=new o;Os._pt=0,h.init(t,n?u+n:u,Os,0,[t]),h.render(1,h),Os._pt&&yh(1,Os)}:a.set(t,l);return o?c:function(u){return c(t,l,n?u+n:u,a,1)}},quickTo:function(t,e,n){var i,s=yn.to(t,es((i={},i[e]="+=0.1",i.paused=!0,i),n||{})),o=function(l,c,u){return s.resetTo(e,l,c,u)};return o.tween=s,o},isTweening:function(t){return ge.getTweensOf(t,!0).length>0},defaults:function(t){return t&&t.ease&&(t.ease=Yr(t.ease,Zs.ease)),nf(Zs,t||{})},config:function(t){return nf(Rn,t||{})},registerEffect:function(t){var e=t.name,n=t.effect,i=t.plugins,s=t.defaults,o=t.extendTimeline;(i||"").split(",").forEach(function(a){return a&&!En[a]&&!On[a]&&Xo(e+" effect requires "+a+" plugin.")}),cc[e]=function(a,l,c){return n(Hn(a),Xn(l||{},s),c)},o&&(sn.prototype[e]=function(a,l,c){return this.add(cc[e](a,Ti(l)?l:(c=l)&&{},this),c)})},registerEase:function(t,e){ee[t]=Yr(e)},parseEase:function(t,e){return arguments.length?Yr(t,e):ee},getById:function(t){return ge.getById(t)},exportRoot:function(t,e){t===void 0&&(t={});var n=new sn(t),i,s;for(n.smoothChildTiming=gn(t.smoothChildTiming),ge.remove(n),n._dp=0,n._time=n._tTime=ge._time,i=ge._first;i;)s=i._next,(e||!(!i._dur&&i instanceof Ce&&i.vars.onComplete===i._targets[0]))&&mi(n,i,i._start-i._delay),i=s;return mi(ge,n,0),n},context:function(t,e){return t?new dm(t,e):fe},matchMedia:function(t){return new _0(t)},matchMediaRefresh:function(){return $r.forEach(function(t){var e=t.conditions,n,i;for(i in e)e[i]&&(e[i]=!1,n=1);n&&t.revert()})||Mu()},addEventListener:function(t,e){var n=sl[t]||(sl[t]=[]);~n.indexOf(e)||n.push(e)},removeEventListener:function(t,e){var n=sl[t],i=n&&n.indexOf(e);i>=0&&n.splice(i,1)},utils:{wrap:j_,wrapYoyo:Z_,distribute:qp,random:$p,snap:Yp,normalize:$_,getUnit:qe,clamp:W_,splitColor:Qp,toArray:Hn,selector:xu,mapRange:Zp,pipe:q_,unitize:Y_,interpolate:J_,shuffle:Xp},install:Ip,effects:cc,ticker:Cn,updateRoot:sn.updateRoot,plugins:En,globalTimeline:ge,core:{PropTween:xn,globals:Op,Tween:Ce,Timeline:sn,Animation:jo,getCache:Xr,_removeLinkedListItem:Vl,reverting:function(){return je},context:function(t){return t&&fe&&(fe.data.push(t),t._ctx=fe),fe},suppressOverwrites:function(t){return lh=t}}};_n("to,from,fromTo,delayedCall,set,killTweensOf",function(r){return bl[r]=Ce[r]});Cn.add(sn.updateRoot);Os=bl.to({},{duration:0});var x0=function(t,e){for(var n=t._pt;n&&n.p!==e&&n.op!==e&&n.fp!==e;)n=n._next;return n},v0=function(t,e){var n=t._targets,i,s,o;for(i in e)for(s=n.length;s--;)o=t._ptLookup[s][i],o&&(o=o.d)&&(o._pt&&(o=x0(o,i)),o&&o.modifier&&o.modifier(e[i],t,n[s],i))},pc=function(t,e){return{name:t,rawVars:1,init:function(i,s,o){o._onInit=function(a){var l,c;if(Fe(s)&&(l={},_n(s,function(u){return l[u]=1}),s=l),e){l={};for(c in s)l[c]=e(s[c]);s=l}v0(a,s)}}}},yn=bl.registerPlugin({name:"attr",init:function(t,e,n,i,s){var o,a,l;this.tween=n;for(o in e)l=t.getAttribute(o)||"",a=this.add(t,"setAttribute",(l||0)+"",e[o],i,s,0,0,o),a.op=o,a.b=l,this._props.push(o)},render:function(t,e){for(var n=e._pt;n;)je?n.set(n.t,n.p,n.b,n):n.r(t,n.d),n=n._next}},{name:"endArray",init:function(t,e){for(var n=e.length;n--;)this.add(t,n,t[n]||0,e[n],0,0,0,0,0,1)}},pc("roundProps",vu),pc("modifiers"),pc("snap",Yp))||bl;Ce.version=sn.version=yn.version="3.12.5";Rp=1;uh()&&Qs();ee.Power0;ee.Power1;ee.Power2;ee.Power3;ee.Power4;ee.Linear;ee.Quad;ee.Cubic;ee.Quart;ee.Quint;ee.Strong;ee.Elastic;ee.Back;ee.SteppedEase;ee.Bounce;ee.Sine;ee.Expo;ee.Circ;/*!
 * CSSPlugin 3.12.5
 * https://gsap.com
 *
 * Copyright 2008-2024, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license or for
 * Club GSAP members, the agreement issued with that membership.
 * @author: Jack Doyle, jack@greensock.com
*/var cf,lr,Bs,Mh,kr,uf,Sh,y0=function(){return typeof window<"u"},Yi={},Rr=180/Math.PI,Vs=Math.PI/180,hs=Math.atan2,hf=1e8,bh=/([A-Z])/g,M0=/(left|right|width|margin|padding|x)/i,S0=/[\s,\(]\S/,gi={autoAlpha:"opacity,visibility",scale:"scaleX,scaleY",alpha:"opacity"},Su=function(t,e){return e.set(e.t,e.p,Math.round((e.s+e.c*t)*1e4)/1e4+e.u,e)},b0=function(t,e){return e.set(e.t,e.p,t===1?e.e:Math.round((e.s+e.c*t)*1e4)/1e4+e.u,e)},w0=function(t,e){return e.set(e.t,e.p,t?Math.round((e.s+e.c*t)*1e4)/1e4+e.u:e.b,e)},T0=function(t,e){var n=e.s+e.c*t;e.set(e.t,e.p,~~(n+(n<0?-.5:.5))+e.u,e)},pm=function(t,e){return e.set(e.t,e.p,t?e.e:e.b,e)},mm=function(t,e){return e.set(e.t,e.p,t!==1?e.b:e.e,e)},E0=function(t,e,n){return t.style[e]=n},C0=function(t,e,n){return t.style.setProperty(e,n)},A0=function(t,e,n){return t._gsap[e]=n},P0=function(t,e,n){return t._gsap.scaleX=t._gsap.scaleY=n},L0=function(t,e,n,i,s){var o=t._gsap;o.scaleX=o.scaleY=n,o.renderTransform(s,o)},D0=function(t,e,n,i,s){var o=t._gsap;o[e]=n,o.renderTransform(s,o)},_e="transform",vn=_e+"Origin",R0=function r(t,e){var n=this,i=this.target,s=i.style,o=i._gsap;if(t in Yi&&s){if(this.tfm=this.tfm||{},t!=="transform")t=gi[t]||t,~t.indexOf(",")?t.split(",").forEach(function(a){return n.tfm[a]=Bi(i,a)}):this.tfm[t]=o.x?o[t]:Bi(i,t),t===vn&&(this.tfm.zOrigin=o.zOrigin);else return gi.transform.split(",").forEach(function(a){return r.call(n,a,e)});if(this.props.indexOf(_e)>=0)return;o.svg&&(this.svgo=i.getAttribute("data-svg-origin"),this.props.push(vn,e,"")),t=_e}(s||e)&&this.props.push(t,e,s[t])},gm=function(t){t.translate&&(t.removeProperty("translate"),t.removeProperty("scale"),t.removeProperty("rotate"))},I0=function(){var t=this.props,e=this.target,n=e.style,i=e._gsap,s,o;for(s=0;s<t.length;s+=3)t[s+1]?e[t[s]]=t[s+2]:t[s+2]?n[t[s]]=t[s+2]:n.removeProperty(t[s].substr(0,2)==="--"?t[s]:t[s].replace(bh,"-$1").toLowerCase());if(this.tfm){for(o in this.tfm)i[o]=this.tfm[o];i.svg&&(i.renderTransform(),e.setAttribute("data-svg-origin",this.svgo||"")),s=Sh(),(!s||!s.isStart)&&!n[_e]&&(gm(n),i.zOrigin&&n[vn]&&(n[vn]+=" "+i.zOrigin+"px",i.zOrigin=0,i.renderTransform()),i.uncache=1)}},_m=function(t,e){var n={target:t,props:[],revert:I0,save:R0};return t._gsap||yn.core.getCache(t),e&&e.split(",").forEach(function(i){return n.save(i)}),n},xm,bu=function(t,e){var n=lr.createElementNS?lr.createElementNS((e||"http://www.w3.org/1999/xhtml").replace(/^https/,"http"),t):lr.createElement(t);return n&&n.style?n:lr.createElement(t)},yi=function r(t,e,n){var i=getComputedStyle(t);return i[e]||i.getPropertyValue(e.replace(bh,"-$1").toLowerCase())||i.getPropertyValue(e)||!n&&r(t,to(e)||e,1)||""},ff="O,Moz,ms,Ms,Webkit".split(","),to=function(t,e,n){var i=e||kr,s=i.style,o=5;if(t in s&&!n)return t;for(t=t.charAt(0).toUpperCase()+t.substr(1);o--&&!(ff[o]+t in s););return o<0?null:(o===3?"ms":o>=0?ff[o]:"")+t},wu=function(){y0()&&window.document&&(cf=window,lr=cf.document,Bs=lr.documentElement,kr=bu("div")||{style:{}},bu("div"),_e=to(_e),vn=_e+"Origin",kr.style.cssText="border-width:0;line-height:0;position:absolute;padding:0",xm=!!to("perspective"),Sh=yn.core.reverting,Mh=1)},mc=function r(t){var e=bu("svg",this.ownerSVGElement&&this.ownerSVGElement.getAttribute("xmlns")||"http://www.w3.org/2000/svg"),n=this.parentNode,i=this.nextSibling,s=this.style.cssText,o;if(Bs.appendChild(e),e.appendChild(this),this.style.display="block",t)try{o=this.getBBox(),this._gsapBBox=this.getBBox,this.getBBox=r}catch{}else this._gsapBBox&&(o=this._gsapBBox());return n&&(i?n.insertBefore(this,i):n.appendChild(this)),Bs.removeChild(e),this.style.cssText=s,o},df=function(t,e){for(var n=e.length;n--;)if(t.hasAttribute(e[n]))return t.getAttribute(e[n])},vm=function(t){var e;try{e=t.getBBox()}catch{e=mc.call(t,!0)}return e&&(e.width||e.height)||t.getBBox===mc||(e=mc.call(t,!0)),e&&!e.width&&!e.x&&!e.y?{x:+df(t,["x","cx","x1"])||0,y:+df(t,["y","cy","y1"])||0,width:0,height:0}:e},ym=function(t){return!!(t.getCTM&&(!t.parentNode||t.ownerSVGElement)&&vm(t))},ns=function(t,e){if(e){var n=t.style,i;e in Yi&&e!==vn&&(e=_e),n.removeProperty?(i=e.substr(0,2),(i==="ms"||e.substr(0,6)==="webkit")&&(e="-"+e),n.removeProperty(i==="--"?e:e.replace(bh,"-$1").toLowerCase())):n.removeAttribute(e)}},cr=function(t,e,n,i,s,o){var a=new xn(t._pt,e,n,0,1,o?mm:pm);return t._pt=a,a.b=i,a.e=s,t._props.push(n),a},pf={deg:1,rad:1,turn:1},O0={grid:1,flex:1},Mr=function r(t,e,n,i){var s=parseFloat(n)||0,o=(n+"").trim().substr((s+"").length)||"px",a=kr.style,l=M0.test(e),c=t.tagName.toLowerCase()==="svg",u=(c?"client":"offset")+(l?"Width":"Height"),h=100,f=i==="px",d=i==="%",g,p,m,_;if(i===o||!s||pf[i]||pf[o])return s;if(o!=="px"&&!f&&(s=r(t,e,n,"px")),_=t.getCTM&&ym(t),(d||o==="%")&&(Yi[e]||~e.indexOf("adius")))return g=_?t.getBBox()[l?"width":"height"]:t[u],Se(d?s/g*h:s/100*g);if(a[l?"width":"height"]=h+(f?o:i),p=~e.indexOf("adius")||i==="em"&&t.appendChild&&!c?t:t.parentNode,_&&(p=(t.ownerSVGElement||{}).parentNode),(!p||p===lr||!p.appendChild)&&(p=lr.body),m=p._gsap,m&&d&&m.width&&l&&m.time===Cn.time&&!m.uncache)return Se(s/m.width*h);if(d&&(e==="height"||e==="width")){var M=t.style[e];t.style[e]=h+i,g=t[u],M?t.style[e]=M:ns(t,e)}else(d||o==="%")&&!O0[yi(p,"display")]&&(a.position=yi(t,"position")),p===t&&(a.position="static"),p.appendChild(kr),g=kr[u],p.removeChild(kr),a.position="absolute";return l&&d&&(m=Xr(p),m.time=Cn.time,m.width=p[u]),Se(f?g*s/h:g&&s?h/g*s:0)},Bi=function(t,e,n,i){var s;return Mh||wu(),e in gi&&e!=="transform"&&(e=gi[e],~e.indexOf(",")&&(e=e.split(",")[0])),Yi[e]&&e!=="transform"?(s=Jo(t,i),s=e!=="transformOrigin"?s[e]:s.svg?s.origin:Tl(yi(t,vn))+" "+s.zOrigin+"px"):(s=t.style[e],(!s||s==="auto"||i||~(s+"").indexOf("calc("))&&(s=wl[e]&&wl[e](t,e,n)||yi(t,e)||Fp(t,e)||(e==="opacity"?1:0))),n&&!~(s+"").trim().indexOf(" ")?Mr(t,e,s,n)+n:s},N0=function(t,e,n,i){if(!n||n==="none"){var s=to(e,t,1),o=s&&yi(t,s,1);o&&o!==n?(e=s,n=o):e==="borderColor"&&(n=yi(t,"borderTopColor"))}var a=new xn(this._pt,t.style,e,0,1,hm),l=0,c=0,u,h,f,d,g,p,m,_,M,b,x,v;if(a.b=n,a.e=i,n+="",i+="",i==="auto"&&(p=t.style[e],t.style[e]=i,i=yi(t,e)||i,p?t.style[e]=p:ns(t,e)),u=[n,i],em(u),n=u[0],i=u[1],f=n.match(Is)||[],v=i.match(Is)||[],v.length){for(;h=Is.exec(i);)m=h[0],M=i.substring(l,h.index),g?g=(g+1)%5:(M.substr(-5)==="rgba("||M.substr(-5)==="hsla(")&&(g=1),m!==(p=f[c++]||"")&&(d=parseFloat(p)||0,x=p.substr((d+"").length),m.charAt(1)==="="&&(m=Us(d,m)+x),_=parseFloat(m),b=m.substr((_+"").length),l=Is.lastIndex-b.length,b||(b=b||Rn.units[e]||x,l===i.length&&(i+=b,a.e+=b)),x!==b&&(d=Mr(t,e,p,b)||0),a._pt={_next:a._pt,p:M||c===1?M:",",s:d,c:_-d,m:g&&g<4||e==="zIndex"?Math.round:0});a.c=l<i.length?i.substring(l,i.length):""}else a.r=e==="display"&&i==="none"?mm:pm;return Lp.test(i)&&(a.e=0),this._pt=a,a},mf={top:"0%",bottom:"100%",left:"0%",right:"100%",center:"50%"},F0=function(t){var e=t.split(" "),n=e[0],i=e[1]||"50%";return(n==="top"||n==="bottom"||i==="left"||i==="right")&&(t=n,n=i,i=t),e[0]=mf[n]||n,e[1]=mf[i]||i,e.join(" ")},z0=function(t,e){if(e.tween&&e.tween._time===e.tween._dur){var n=e.t,i=n.style,s=e.u,o=n._gsap,a,l,c;if(s==="all"||s===!0)i.cssText="",l=1;else for(s=s.split(","),c=s.length;--c>-1;)a=s[c],Yi[a]&&(l=1,a=a==="transformOrigin"?vn:_e),ns(n,a);l&&(ns(n,_e),o&&(o.svg&&n.removeAttribute("transform"),Jo(n,1),o.uncache=1,gm(i)))}},wl={clearProps:function(t,e,n,i,s){if(s.data!=="isFromStart"){var o=t._pt=new xn(t._pt,e,n,0,0,z0);return o.u=i,o.pr=-10,o.tween=s,t._props.push(n),1}}},Zo=[1,0,0,1,0,0],Mm={},Sm=function(t){return t==="matrix(1, 0, 0, 1, 0, 0)"||t==="none"||!t},gf=function(t){var e=yi(t,_e);return Sm(e)?Zo:e.substr(7).match(Pp).map(Se)},wh=function(t,e){var n=t._gsap||Xr(t),i=t.style,s=gf(t),o,a,l,c;return n.svg&&t.getAttribute("transform")?(l=t.transform.baseVal.consolidate().matrix,s=[l.a,l.b,l.c,l.d,l.e,l.f],s.join(",")==="1,0,0,1,0,0"?Zo:s):(s===Zo&&!t.offsetParent&&t!==Bs&&!n.svg&&(l=i.display,i.display="block",o=t.parentNode,(!o||!t.offsetParent)&&(c=1,a=t.nextElementSibling,Bs.appendChild(t)),s=gf(t),l?i.display=l:ns(t,"display"),c&&(a?o.insertBefore(t,a):o?o.appendChild(t):Bs.removeChild(t))),e&&s.length>6?[s[0],s[1],s[4],s[5],s[12],s[13]]:s)},Tu=function(t,e,n,i,s,o){var a=t._gsap,l=s||wh(t,!0),c=a.xOrigin||0,u=a.yOrigin||0,h=a.xOffset||0,f=a.yOffset||0,d=l[0],g=l[1],p=l[2],m=l[3],_=l[4],M=l[5],b=e.split(" "),x=parseFloat(b[0])||0,v=parseFloat(b[1])||0,E,C,y,w;n?l!==Zo&&(C=d*m-g*p)&&(y=x*(m/C)+v*(-p/C)+(p*M-m*_)/C,w=x*(-g/C)+v*(d/C)-(d*M-g*_)/C,x=y,v=w):(E=vm(t),x=E.x+(~b[0].indexOf("%")?x/100*E.width:x),v=E.y+(~(b[1]||b[0]).indexOf("%")?v/100*E.height:v)),i||i!==!1&&a.smooth?(_=x-c,M=v-u,a.xOffset=h+(_*d+M*p)-_,a.yOffset=f+(_*g+M*m)-M):a.xOffset=a.yOffset=0,a.xOrigin=x,a.yOrigin=v,a.smooth=!!i,a.origin=e,a.originIsAbsolute=!!n,t.style[vn]="0px 0px",o&&(cr(o,a,"xOrigin",c,x),cr(o,a,"yOrigin",u,v),cr(o,a,"xOffset",h,a.xOffset),cr(o,a,"yOffset",f,a.yOffset)),t.setAttribute("data-svg-origin",x+" "+v)},Jo=function(t,e){var n=t._gsap||new sm(t);if("x"in n&&!e&&!n.uncache)return n;var i=t.style,s=n.scaleX<0,o="px",a="deg",l=getComputedStyle(t),c=yi(t,vn)||"0",u,h,f,d,g,p,m,_,M,b,x,v,E,C,y,w,D,B,k,Z,V,$,Y,H,G,q,P,nt,A,O,T,I;return u=h=f=p=m=_=M=b=x=0,d=g=1,n.svg=!!(t.getCTM&&ym(t)),l.translate&&((l.translate!=="none"||l.scale!=="none"||l.rotate!=="none")&&(i[_e]=(l.translate!=="none"?"translate3d("+(l.translate+" 0 0").split(" ").slice(0,3).join(", ")+") ":"")+(l.rotate!=="none"?"rotate("+l.rotate+") ":"")+(l.scale!=="none"?"scale("+l.scale.split(" ").join(",")+") ":"")+(l[_e]!=="none"?l[_e]:"")),i.scale=i.rotate=i.translate="none"),C=wh(t,n.svg),n.svg&&(n.uncache?(G=t.getBBox(),c=n.xOrigin-G.x+"px "+(n.yOrigin-G.y)+"px",H=""):H=!e&&t.getAttribute("data-svg-origin"),Tu(t,H||c,!!H||n.originIsAbsolute,n.smooth!==!1,C)),v=n.xOrigin||0,E=n.yOrigin||0,C!==Zo&&(B=C[0],k=C[1],Z=C[2],V=C[3],u=$=C[4],h=Y=C[5],C.length===6?(d=Math.sqrt(B*B+k*k),g=Math.sqrt(V*V+Z*Z),p=B||k?hs(k,B)*Rr:0,M=Z||V?hs(Z,V)*Rr+p:0,M&&(g*=Math.abs(Math.cos(M*Vs))),n.svg&&(u-=v-(v*B+E*Z),h-=E-(v*k+E*V))):(I=C[6],O=C[7],P=C[8],nt=C[9],A=C[10],T=C[11],u=C[12],h=C[13],f=C[14],y=hs(I,A),m=y*Rr,y&&(w=Math.cos(-y),D=Math.sin(-y),H=$*w+P*D,G=Y*w+nt*D,q=I*w+A*D,P=$*-D+P*w,nt=Y*-D+nt*w,A=I*-D+A*w,T=O*-D+T*w,$=H,Y=G,I=q),y=hs(-Z,A),_=y*Rr,y&&(w=Math.cos(-y),D=Math.sin(-y),H=B*w-P*D,G=k*w-nt*D,q=Z*w-A*D,T=V*D+T*w,B=H,k=G,Z=q),y=hs(k,B),p=y*Rr,y&&(w=Math.cos(y),D=Math.sin(y),H=B*w+k*D,G=$*w+Y*D,k=k*w-B*D,Y=Y*w-$*D,B=H,$=G),m&&Math.abs(m)+Math.abs(p)>359.9&&(m=p=0,_=180-_),d=Se(Math.sqrt(B*B+k*k+Z*Z)),g=Se(Math.sqrt(Y*Y+I*I)),y=hs($,Y),M=Math.abs(y)>2e-4?y*Rr:0,x=T?1/(T<0?-T:T):0),n.svg&&(H=t.getAttribute("transform"),n.forceCSS=t.setAttribute("transform","")||!Sm(yi(t,_e)),H&&t.setAttribute("transform",H))),Math.abs(M)>90&&Math.abs(M)<270&&(s?(d*=-1,M+=p<=0?180:-180,p+=p<=0?180:-180):(g*=-1,M+=M<=0?180:-180)),e=e||n.uncache,n.x=u-((n.xPercent=u&&(!e&&n.xPercent||(Math.round(t.offsetWidth/2)===Math.round(-u)?-50:0)))?t.offsetWidth*n.xPercent/100:0)+o,n.y=h-((n.yPercent=h&&(!e&&n.yPercent||(Math.round(t.offsetHeight/2)===Math.round(-h)?-50:0)))?t.offsetHeight*n.yPercent/100:0)+o,n.z=f+o,n.scaleX=Se(d),n.scaleY=Se(g),n.rotation=Se(p)+a,n.rotationX=Se(m)+a,n.rotationY=Se(_)+a,n.skewX=M+a,n.skewY=b+a,n.transformPerspective=x+o,(n.zOrigin=parseFloat(c.split(" ")[2])||!e&&n.zOrigin||0)&&(i[vn]=Tl(c)),n.xOffset=n.yOffset=0,n.force3D=Rn.force3D,n.renderTransform=n.svg?U0:xm?bm:k0,n.uncache=0,n},Tl=function(t){return(t=t.split(" "))[0]+" "+t[1]},gc=function(t,e,n){var i=qe(e);return Se(parseFloat(e)+parseFloat(Mr(t,"x",n+"px",i)))+i},k0=function(t,e){e.z="0px",e.rotationY=e.rotationX="0deg",e.force3D=0,bm(t,e)},Er="0deg",go="0px",Cr=") ",bm=function(t,e){var n=e||this,i=n.xPercent,s=n.yPercent,o=n.x,a=n.y,l=n.z,c=n.rotation,u=n.rotationY,h=n.rotationX,f=n.skewX,d=n.skewY,g=n.scaleX,p=n.scaleY,m=n.transformPerspective,_=n.force3D,M=n.target,b=n.zOrigin,x="",v=_==="auto"&&t&&t!==1||_===!0;if(b&&(h!==Er||u!==Er)){var E=parseFloat(u)*Vs,C=Math.sin(E),y=Math.cos(E),w;E=parseFloat(h)*Vs,w=Math.cos(E),o=gc(M,o,C*w*-b),a=gc(M,a,-Math.sin(E)*-b),l=gc(M,l,y*w*-b+b)}m!==go&&(x+="perspective("+m+Cr),(i||s)&&(x+="translate("+i+"%, "+s+"%) "),(v||o!==go||a!==go||l!==go)&&(x+=l!==go||v?"translate3d("+o+", "+a+", "+l+") ":"translate("+o+", "+a+Cr),c!==Er&&(x+="rotate("+c+Cr),u!==Er&&(x+="rotateY("+u+Cr),h!==Er&&(x+="rotateX("+h+Cr),(f!==Er||d!==Er)&&(x+="skew("+f+", "+d+Cr),(g!==1||p!==1)&&(x+="scale("+g+", "+p+Cr),M.style[_e]=x||"translate(0, 0)"},U0=function(t,e){var n=e||this,i=n.xPercent,s=n.yPercent,o=n.x,a=n.y,l=n.rotation,c=n.skewX,u=n.skewY,h=n.scaleX,f=n.scaleY,d=n.target,g=n.xOrigin,p=n.yOrigin,m=n.xOffset,_=n.yOffset,M=n.forceCSS,b=parseFloat(o),x=parseFloat(a),v,E,C,y,w;l=parseFloat(l),c=parseFloat(c),u=parseFloat(u),u&&(u=parseFloat(u),c+=u,l+=u),l||c?(l*=Vs,c*=Vs,v=Math.cos(l)*h,E=Math.sin(l)*h,C=Math.sin(l-c)*-f,y=Math.cos(l-c)*f,c&&(u*=Vs,w=Math.tan(c-u),w=Math.sqrt(1+w*w),C*=w,y*=w,u&&(w=Math.tan(u),w=Math.sqrt(1+w*w),v*=w,E*=w)),v=Se(v),E=Se(E),C=Se(C),y=Se(y)):(v=h,y=f,E=C=0),(b&&!~(o+"").indexOf("px")||x&&!~(a+"").indexOf("px"))&&(b=Mr(d,"x",o,"px"),x=Mr(d,"y",a,"px")),(g||p||m||_)&&(b=Se(b+g-(g*v+p*C)+m),x=Se(x+p-(g*E+p*y)+_)),(i||s)&&(w=d.getBBox(),b=Se(b+i/100*w.width),x=Se(x+s/100*w.height)),w="matrix("+v+","+E+","+C+","+y+","+b+","+x+")",d.setAttribute("transform",w),M&&(d.style[_e]=w)},B0=function(t,e,n,i,s){var o=360,a=Fe(s),l=parseFloat(s)*(a&&~s.indexOf("rad")?Rr:1),c=l-i,u=i+c+"deg",h,f;return a&&(h=s.split("_")[1],h==="short"&&(c%=o,c!==c%(o/2)&&(c+=c<0?o:-360)),h==="cw"&&c<0?c=(c+o*hf)%o-~~(c/o)*o:h==="ccw"&&c>0&&(c=(c-o*hf)%o-~~(c/o)*o)),t._pt=f=new xn(t._pt,e,n,i,c,b0),f.e=u,f.u="deg",t._props.push(n),f},_f=function(t,e){for(var n in e)t[n]=e[n];return t},V0=function(t,e,n){var i=_f({},n._gsap),s="perspective,force3D,transformOrigin,svgOrigin",o=n.style,a,l,c,u,h,f,d,g;i.svg?(c=n.getAttribute("transform"),n.setAttribute("transform",""),o[_e]=e,a=Jo(n,1),ns(n,_e),n.setAttribute("transform",c)):(c=getComputedStyle(n)[_e],o[_e]=e,a=Jo(n,1),o[_e]=c);for(l in Yi)c=i[l],u=a[l],c!==u&&s.indexOf(l)<0&&(d=qe(c),g=qe(u),h=d!==g?Mr(n,l,c,g):parseFloat(c),f=parseFloat(u),t._pt=new xn(t._pt,a,l,h,f-h,Su),t._pt.u=g||0,t._props.push(l));_f(a,i)};_n("padding,margin,Width,Radius",function(r,t){var e="Top",n="Right",i="Bottom",s="Left",o=(t<3?[e,n,i,s]:[e+s,e+n,i+n,i+s]).map(function(a){return t<2?r+a:"border"+a+r});wl[t>1?"border"+r:r]=function(a,l,c,u,h){var f,d;if(arguments.length<4)return f=o.map(function(g){return Bi(a,g,c)}),d=f.join(" "),d.split(f[0]).length===5?f[0]:d;f=(u+"").split(" "),d={},o.forEach(function(g,p){return d[g]=f[p]=f[p]||f[(p-1)/2|0]}),a.init(l,d,h)}});var wm={name:"css",register:wu,targetTest:function(t){return t.style&&t.nodeType},init:function(t,e,n,i,s){var o=this._props,a=t.style,l=n.vars.startAt,c,u,h,f,d,g,p,m,_,M,b,x,v,E,C,y;Mh||wu(),this.styles=this.styles||_m(t),y=this.styles.props,this.tween=n;for(p in e)if(p!=="autoRound"&&(u=e[p],!(En[p]&&om(p,e,n,i,t,s)))){if(d=typeof u,g=wl[p],d==="function"&&(u=u.call(n,i,t,s),d=typeof u),d==="string"&&~u.indexOf("random(")&&(u=Yo(u)),g)g(this,t,p,u,n)&&(C=1);else if(p.substr(0,2)==="--")c=(getComputedStyle(t).getPropertyValue(p)+"").trim(),u+="",pr.lastIndex=0,pr.test(c)||(m=qe(c),_=qe(u)),_?m!==_&&(c=Mr(t,p,c,_)+_):m&&(u+=m),this.add(a,"setProperty",c,u,i,s,0,0,p),o.push(p),y.push(p,0,a[p]);else if(d!=="undefined"){if(l&&p in l?(c=typeof l[p]=="function"?l[p].call(n,i,t,s):l[p],Fe(c)&&~c.indexOf("random(")&&(c=Yo(c)),qe(c+"")||c==="auto"||(c+=Rn.units[p]||qe(Bi(t,p))||""),(c+"").charAt(1)==="="&&(c=Bi(t,p))):c=Bi(t,p),f=parseFloat(c),M=d==="string"&&u.charAt(1)==="="&&u.substr(0,2),M&&(u=u.substr(2)),h=parseFloat(u),p in gi&&(p==="autoAlpha"&&(f===1&&Bi(t,"visibility")==="hidden"&&h&&(f=0),y.push("visibility",0,a.visibility),cr(this,a,"visibility",f?"inherit":"hidden",h?"inherit":"hidden",!h)),p!=="scale"&&p!=="transform"&&(p=gi[p],~p.indexOf(",")&&(p=p.split(",")[0]))),b=p in Yi,b){if(this.styles.save(p),x||(v=t._gsap,v.renderTransform&&!e.parseTransform||Jo(t,e.parseTransform),E=e.smoothOrigin!==!1&&v.smooth,x=this._pt=new xn(this._pt,a,_e,0,1,v.renderTransform,v,0,-1),x.dep=1),p==="scale")this._pt=new xn(this._pt,v,"scaleY",v.scaleY,(M?Us(v.scaleY,M+h):h)-v.scaleY||0,Su),this._pt.u=0,o.push("scaleY",p),p+="X";else if(p==="transformOrigin"){y.push(vn,0,a[vn]),u=F0(u),v.svg?Tu(t,u,0,E,0,this):(_=parseFloat(u.split(" ")[2])||0,_!==v.zOrigin&&cr(this,v,"zOrigin",v.zOrigin,_),cr(this,a,p,Tl(c),Tl(u)));continue}else if(p==="svgOrigin"){Tu(t,u,1,E,0,this);continue}else if(p in Mm){B0(this,v,p,f,M?Us(f,M+u):u);continue}else if(p==="smoothOrigin"){cr(this,v,"smooth",v.smooth,u);continue}else if(p==="force3D"){v[p]=u;continue}else if(p==="transform"){V0(this,u,t);continue}}else p in a||(p=to(p)||p);if(b||(h||h===0)&&(f||f===0)&&!S0.test(u)&&p in a)m=(c+"").substr((f+"").length),h||(h=0),_=qe(u)||(p in Rn.units?Rn.units[p]:m),m!==_&&(f=Mr(t,p,c,_)),this._pt=new xn(this._pt,b?v:a,p,f,(M?Us(f,M+h):h)-f,!b&&(_==="px"||p==="zIndex")&&e.autoRound!==!1?T0:Su),this._pt.u=_||0,m!==_&&_!=="%"&&(this._pt.b=c,this._pt.r=w0);else if(p in a)N0.call(this,t,p,c,M?M+u:u);else if(p in t)this.add(t,p,c||t[p],M?M+u:u,i,s);else if(p!=="parseTransform"){fh(p,u);continue}b||(p in a?y.push(p,0,a[p]):y.push(p,1,c||t[p])),o.push(p)}}C&&fm(this)},render:function(t,e){if(e.tween._time||!Sh())for(var n=e._pt;n;)n.r(t,n.d),n=n._next;else e.styles.revert()},get:Bi,aliases:gi,getSetter:function(t,e,n){var i=gi[e];return i&&i.indexOf(",")<0&&(e=i),e in Yi&&e!==vn&&(t._gsap.x||Bi(t,"x"))?n&&uf===n?e==="scale"?P0:A0:(uf=n||{})&&(e==="scale"?L0:D0):t.style&&!ch(t.style[e])?E0:~e.indexOf("-")?C0:vh(t,e)},core:{_removeProperty:ns,_getMatrix:wh}};yn.utils.checkPrefix=to;yn.core.getStyleSaver=_m;(function(r,t,e,n){var i=_n(r+","+t+","+e,function(s){Yi[s]=1});_n(t,function(s){Rn.units[s]="deg",Mm[s]=1}),gi[i[13]]=r+","+t,_n(n,function(s){var o=s.split(":");gi[o[1]]=i[o[0]]})})("x,y,z,scale,scaleX,scaleY,xPercent,yPercent","rotation,rotationX,rotationY,skewX,skewY","transform,transformOrigin,svgOrigin,force3D,smoothOrigin,transformPerspective","0:translateX,1:translateY,2:translateZ,8:rotate,8:rotationZ,8:rotateZ,9:rotateX,10:rotateY");_n("x,y,z,top,right,bottom,left,width,height,fontSize,padding,margin,perspective",function(r){Rn.units[r]="px"});yn.registerPlugin(wm);var G0=yn.registerPlugin(wm)||yn;G0.core.Tween;function H0(r,t){for(var e=0;e<t.length;e++){var n=t[e];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(r,n.key,n)}}function W0(r,t,e){return H0(r.prototype,t),r}/*!
 * Observer 3.12.5
 * https://gsap.com
 *
 * @license Copyright 2008-2024, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license or for
 * Club GSAP members, the agreement issued with that membership.
 * @author: Jack Doyle, jack@greensock.com
*/var Ue,ol,An,ur,hr,Gs,Tm,Ir,Oo,Em,Hi,ti,Cm,Am=function(){return Ue||typeof window<"u"&&(Ue=window.gsap)&&Ue.registerPlugin&&Ue},Pm=1,Ns=[],Kt=[],Mi=[],No=Date.now,Eu=function(t,e){return e},X0=function(){var t=Oo.core,e=t.bridge||{},n=t._scrollers,i=t._proxies;n.push.apply(n,Kt),i.push.apply(i,Mi),Kt=n,Mi=i,Eu=function(o,a){return e[o](a)}},mr=function(t,e){return~Mi.indexOf(t)&&Mi[Mi.indexOf(t)+1][e]},Fo=function(t){return!!~Em.indexOf(t)},tn=function(t,e,n,i,s){return t.addEventListener(e,n,{passive:i!==!1,capture:!!s})},Qe=function(t,e,n,i){return t.removeEventListener(e,n,!!i)},_a="scrollLeft",xa="scrollTop",Cu=function(){return Hi&&Hi.isPressed||Kt.cache++},El=function(t,e){var n=function i(s){if(s||s===0){Pm&&(An.history.scrollRestoration="manual");var o=Hi&&Hi.isPressed;s=i.v=Math.round(s)||(Hi&&Hi.iOS?1:0),t(s),i.cacheID=Kt.cache,o&&Eu("ss",s)}else(e||Kt.cache!==i.cacheID||Eu("ref"))&&(i.cacheID=Kt.cache,i.v=t());return i.v+i.offset};return n.offset=0,t&&n},on={s:_a,p:"left",p2:"Left",os:"right",os2:"Right",d:"width",d2:"Width",a:"x",sc:El(function(r){return arguments.length?An.scrollTo(r,Le.sc()):An.pageXOffset||ur[_a]||hr[_a]||Gs[_a]||0})},Le={s:xa,p:"top",p2:"Top",os:"bottom",os2:"Bottom",d:"height",d2:"Height",a:"y",op:on,sc:El(function(r){return arguments.length?An.scrollTo(on.sc(),r):An.pageYOffset||ur[xa]||hr[xa]||Gs[xa]||0})},dn=function(t,e){return(e&&e._ctx&&e._ctx.selector||Ue.utils.toArray)(t)[0]||(typeof t=="string"&&Ue.config().nullTargetWarn!==!1?console.warn("Element not found:",t):null)},Sr=function(t,e){var n=e.s,i=e.sc;Fo(t)&&(t=ur.scrollingElement||hr);var s=Kt.indexOf(t),o=i===Le.sc?1:2;!~s&&(s=Kt.push(t)-1),Kt[s+o]||tn(t,"scroll",Cu);var a=Kt[s+o],l=a||(Kt[s+o]=El(mr(t,n),!0)||(Fo(t)?i:El(function(c){return arguments.length?t[n]=c:t[n]})));return l.target=t,a||(l.smooth=Ue.getProperty(t,"scrollBehavior")==="smooth"),l},Au=function(t,e,n){var i=t,s=t,o=No(),a=o,l=e||50,c=Math.max(500,l*3),u=function(g,p){var m=No();p||m-o>l?(s=i,i=g,a=o,o=m):n?i+=g:i=s+(g-s)/(m-a)*(o-a)},h=function(){s=i=n?0:i,a=o=0},f=function(g){var p=a,m=s,_=No();return(g||g===0)&&g!==i&&u(g),o===a||_-a>c?0:(i+(n?m:-m))/((n?_:o)-p)*1e3};return{update:u,reset:h,getVelocity:f}},_o=function(t,e){return e&&!t._gsapAllow&&t.preventDefault(),t.changedTouches?t.changedTouches[0]:t},xf=function(t){var e=Math.max.apply(Math,t),n=Math.min.apply(Math,t);return Math.abs(e)>=Math.abs(n)?e:n},Lm=function(){Oo=Ue.core.globals().ScrollTrigger,Oo&&Oo.core&&X0()},Dm=function(t){return Ue=t||Am(),!ol&&Ue&&typeof document<"u"&&document.body&&(An=window,ur=document,hr=ur.documentElement,Gs=ur.body,Em=[An,ur,hr,Gs],Ue.utils.clamp,Cm=Ue.core.context||function(){},Ir="onpointerenter"in Gs?"pointer":"mouse",Tm=be.isTouch=An.matchMedia&&An.matchMedia("(hover: none), (pointer: coarse)").matches?1:"ontouchstart"in An||navigator.maxTouchPoints>0||navigator.msMaxTouchPoints>0?2:0,ti=be.eventTypes=("ontouchstart"in hr?"touchstart,touchmove,touchcancel,touchend":"onpointerdown"in hr?"pointerdown,pointermove,pointercancel,pointerup":"mousedown,mousemove,mouseup,mouseup").split(","),setTimeout(function(){return Pm=0},500),Lm(),ol=1),ol};on.op=Le;Kt.cache=0;var be=function(){function r(e){this.init(e)}var t=r.prototype;return t.init=function(n){ol||Dm(Ue)||console.warn("Please gsap.registerPlugin(Observer)"),Oo||Lm();var i=n.tolerance,s=n.dragMinimum,o=n.type,a=n.target,l=n.lineHeight,c=n.debounce,u=n.preventDefault,h=n.onStop,f=n.onStopDelay,d=n.ignore,g=n.wheelSpeed,p=n.event,m=n.onDragStart,_=n.onDragEnd,M=n.onDrag,b=n.onPress,x=n.onRelease,v=n.onRight,E=n.onLeft,C=n.onUp,y=n.onDown,w=n.onChangeX,D=n.onChangeY,B=n.onChange,k=n.onToggleX,Z=n.onToggleY,V=n.onHover,$=n.onHoverEnd,Y=n.onMove,H=n.ignoreCheck,G=n.isNormalizer,q=n.onGestureStart,P=n.onGestureEnd,nt=n.onWheel,A=n.onEnable,O=n.onDisable,T=n.onClick,I=n.scrollSpeed,z=n.capture,U=n.allowClicks,j=n.lockAxis,rt=n.onLockAxis;this.target=a=dn(a)||hr,this.vars=n,d&&(d=Ue.utils.toArray(d)),i=i||1e-9,s=s||0,g=g||1,I=I||1,o=o||"wheel,touch,pointer",c=c!==!1,l||(l=parseFloat(An.getComputedStyle(Gs).lineHeight)||22);var tt,ut,ot,at,it,dt,W,S=this,pt=0,yt=0,Lt=n.passive||!u,Et=Sr(a,on),F=Sr(a,Le),L=Et(),st=F(),ht=~o.indexOf("touch")&&!~o.indexOf("pointer")&&ti[0]==="pointerdown",xt=Fo(a),_t=a.ownerDocument||ur,Ct=[0,0,0],N=[0,0,0],ft=0,St=function(){return ft=No()},mt=function(Ft,Qt){return(S.event=Ft)&&d&&~d.indexOf(Ft.target)||Qt&&ht&&Ft.pointerType!=="touch"||H&&H(Ft,Qt)},X=function(){S._vx.reset(),S._vy.reset(),ut.pause(),h&&h(S)},gt=function(){var Ft=S.deltaX=xf(Ct),Qt=S.deltaY=xf(N),wt=Math.abs(Ft)>=i,qt=Math.abs(Qt)>=i;B&&(wt||qt)&&B(S,Ft,Qt,Ct,N),wt&&(v&&S.deltaX>0&&v(S),E&&S.deltaX<0&&E(S),w&&w(S),k&&S.deltaX<0!=pt<0&&k(S),pt=S.deltaX,Ct[0]=Ct[1]=Ct[2]=0),qt&&(y&&S.deltaY>0&&y(S),C&&S.deltaY<0&&C(S),D&&D(S),Z&&S.deltaY<0!=yt<0&&Z(S),yt=S.deltaY,N[0]=N[1]=N[2]=0),(at||ot)&&(Y&&Y(S),ot&&(M(S),ot=!1),at=!1),dt&&!(dt=!1)&&rt&&rt(S),it&&(nt(S),it=!1),tt=0},Mt=function(Ft,Qt,wt){Ct[wt]+=Ft,N[wt]+=Qt,S._vx.update(Ft),S._vy.update(Qt),c?tt||(tt=requestAnimationFrame(gt)):gt()},Ot=function(Ft,Qt){j&&!W&&(S.axis=W=Math.abs(Ft)>Math.abs(Qt)?"x":"y",dt=!0),W!=="y"&&(Ct[2]+=Ft,S._vx.update(Ft,!0)),W!=="x"&&(N[2]+=Qt,S._vy.update(Qt,!0)),c?tt||(tt=requestAnimationFrame(gt)):gt()},bt=function(Ft){if(!mt(Ft,1)){Ft=_o(Ft,u);var Qt=Ft.clientX,wt=Ft.clientY,qt=Qt-S.x,zt=wt-S.y,R=S.isDragging;S.x=Qt,S.y=wt,(R||Math.abs(S.startX-Qt)>=s||Math.abs(S.startY-wt)>=s)&&(M&&(ot=!0),R||(S.isDragging=!0),Ot(qt,zt),R||m&&m(S))}},Pt=S.onPress=function(Bt){mt(Bt,1)||Bt&&Bt.button||(S.axis=W=null,ut.pause(),S.isPressed=!0,Bt=_o(Bt),pt=yt=0,S.startX=S.x=Bt.clientX,S.startY=S.y=Bt.clientY,S._vx.reset(),S._vy.reset(),tn(G?a:_t,ti[1],bt,Lt,!0),S.deltaX=S.deltaY=0,b&&b(S))},lt=S.onRelease=function(Bt){if(!mt(Bt,1)){Qe(G?a:_t,ti[1],bt,!0);var Ft=!isNaN(S.y-S.startY),Qt=S.isDragging,wt=Qt&&(Math.abs(S.x-S.startX)>3||Math.abs(S.y-S.startY)>3),qt=_o(Bt);!wt&&Ft&&(S._vx.reset(),S._vy.reset(),u&&U&&Ue.delayedCall(.08,function(){if(No()-ft>300&&!Bt.defaultPrevented){if(Bt.target.click)Bt.target.click();else if(_t.createEvent){var zt=_t.createEvent("MouseEvents");zt.initMouseEvent("click",!0,!0,An,1,qt.screenX,qt.screenY,qt.clientX,qt.clientY,!1,!1,!1,!1,0,null),Bt.target.dispatchEvent(zt)}}})),S.isDragging=S.isGesturing=S.isPressed=!1,h&&Qt&&!G&&ut.restart(!0),_&&Qt&&_(S),x&&x(S,wt)}},Nt=function(Ft){return Ft.touches&&Ft.touches.length>1&&(S.isGesturing=!0)&&q(Ft,S.isDragging)},Xt=function(){return(S.isGesturing=!1)||P(S)},Gt=function(Ft){if(!mt(Ft)){var Qt=Et(),wt=F();Mt((Qt-L)*I,(wt-st)*I,1),L=Qt,st=wt,h&&ut.restart(!0)}},se=function(Ft){if(!mt(Ft)){Ft=_o(Ft,u),nt&&(it=!0);var Qt=(Ft.deltaMode===1?l:Ft.deltaMode===2?An.innerHeight:1)*g;Mt(Ft.deltaX*Qt,Ft.deltaY*Qt,0),h&&!G&&ut.restart(!0)}},we=function(Ft){if(!mt(Ft)){var Qt=Ft.clientX,wt=Ft.clientY,qt=Qt-S.x,zt=wt-S.y;S.x=Qt,S.y=wt,at=!0,h&&ut.restart(!0),(qt||zt)&&Ot(qt,zt)}},zn=function(Ft){S.event=Ft,V(S)},Ve=function(Ft){S.event=Ft,$(S)},Je=function(Ft){return mt(Ft)||_o(Ft,u)&&T(S)};ut=S._dc=Ue.delayedCall(f||.25,X).pause(),S.deltaX=S.deltaY=0,S._vx=Au(0,50,!0),S._vy=Au(0,50,!0),S.scrollX=Et,S.scrollY=F,S.isDragging=S.isGesturing=S.isPressed=!1,Cm(this),S.enable=function(Bt){return S.isEnabled||(tn(xt?_t:a,"scroll",Cu),o.indexOf("scroll")>=0&&tn(xt?_t:a,"scroll",Gt,Lt,z),o.indexOf("wheel")>=0&&tn(a,"wheel",se,Lt,z),(o.indexOf("touch")>=0&&Tm||o.indexOf("pointer")>=0)&&(tn(a,ti[0],Pt,Lt,z),tn(_t,ti[2],lt),tn(_t,ti[3],lt),U&&tn(a,"click",St,!0,!0),T&&tn(a,"click",Je),q&&tn(_t,"gesturestart",Nt),P&&tn(_t,"gestureend",Xt),V&&tn(a,Ir+"enter",zn),$&&tn(a,Ir+"leave",Ve),Y&&tn(a,Ir+"move",we)),S.isEnabled=!0,Bt&&Bt.type&&Pt(Bt),A&&A(S)),S},S.disable=function(){S.isEnabled&&(Ns.filter(function(Bt){return Bt!==S&&Fo(Bt.target)}).length||Qe(xt?_t:a,"scroll",Cu),S.isPressed&&(S._vx.reset(),S._vy.reset(),Qe(G?a:_t,ti[1],bt,!0)),Qe(xt?_t:a,"scroll",Gt,z),Qe(a,"wheel",se,z),Qe(a,ti[0],Pt,z),Qe(_t,ti[2],lt),Qe(_t,ti[3],lt),Qe(a,"click",St,!0),Qe(a,"click",Je),Qe(_t,"gesturestart",Nt),Qe(_t,"gestureend",Xt),Qe(a,Ir+"enter",zn),Qe(a,Ir+"leave",Ve),Qe(a,Ir+"move",we),S.isEnabled=S.isPressed=S.isDragging=!1,O&&O(S))},S.kill=S.revert=function(){S.disable();var Bt=Ns.indexOf(S);Bt>=0&&Ns.splice(Bt,1),Hi===S&&(Hi=0)},Ns.push(S),G&&Fo(a)&&(Hi=S),S.enable(p)},W0(r,[{key:"velocityX",get:function(){return this._vx.getVelocity()}},{key:"velocityY",get:function(){return this._vy.getVelocity()}}]),r}();be.version="3.12.5";be.create=function(r){return new be(r)};be.register=Dm;be.getAll=function(){return Ns.slice()};be.getById=function(r){return Ns.filter(function(t){return t.vars.id===r})[0]};Am()&&Ue.registerPlugin(be);/*!
 * ScrollTrigger 3.12.5
 * https://gsap.com
 *
 * @license Copyright 2008-2024, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license or for
 * Club GSAP members, the agreement issued with that membership.
 * @author: Jack Doyle, jack@greensock.com
*/var It,Ls,te,pe,ei,ue,Rm,Cl,Ko,zo,wo,va,Ge,Wl,Pu,nn,vf,yf,Ds,Im,_c,Om,en,Lu,Nm,Fm,sr,Du,Th,Hs,Eh,Al,Ru,xc,ya=1,We=Date.now,vc=We(),Wn=0,To=0,Mf=function(t,e,n){var i=wn(t)&&(t.substr(0,6)==="clamp("||t.indexOf("max")>-1);return n["_"+e+"Clamp"]=i,i?t.substr(6,t.length-7):t},Sf=function(t,e){return e&&(!wn(t)||t.substr(0,6)!=="clamp(")?"clamp("+t+")":t},q0=function r(){return To&&requestAnimationFrame(r)},bf=function(){return Wl=1},wf=function(){return Wl=0},di=function(t){return t},Eo=function(t){return Math.round(t*1e5)/1e5||0},zm=function(){return typeof window<"u"},km=function(){return It||zm()&&(It=window.gsap)&&It.registerPlugin&&It},is=function(t){return!!~Rm.indexOf(t)},Um=function(t){return(t==="Height"?Eh:te["inner"+t])||ei["client"+t]||ue["client"+t]},Bm=function(t){return mr(t,"getBoundingClientRect")||(is(t)?function(){return hl.width=te.innerWidth,hl.height=Eh,hl}:function(){return Vi(t)})},Y0=function(t,e,n){var i=n.d,s=n.d2,o=n.a;return(o=mr(t,"getBoundingClientRect"))?function(){return o()[i]}:function(){return(e?Um(s):t["client"+s])||0}},$0=function(t,e){return!e||~Mi.indexOf(t)?Bm(t):function(){return hl}},_i=function(t,e){var n=e.s,i=e.d2,s=e.d,o=e.a;return Math.max(0,(n="scroll"+i)&&(o=mr(t,n))?o()-Bm(t)()[s]:is(t)?(ei[n]||ue[n])-Um(i):t[n]-t["offset"+i])},Ma=function(t,e){for(var n=0;n<Ds.length;n+=3)(!e||~e.indexOf(Ds[n+1]))&&t(Ds[n],Ds[n+1],Ds[n+2])},wn=function(t){return typeof t=="string"},an=function(t){return typeof t=="function"},Co=function(t){return typeof t=="number"},Or=function(t){return typeof t=="object"},xo=function(t,e,n){return t&&t.progress(e?0:1)&&n&&t.pause()},yc=function(t,e){if(t.enabled){var n=t._ctx?t._ctx.add(function(){return e(t)}):e(t);n&&n.totalTime&&(t.callbackAnimation=n)}},fs=Math.abs,Vm="left",Gm="top",Ch="right",Ah="bottom",jr="width",Zr="height",ko="Right",Uo="Left",Bo="Top",Vo="Bottom",Ee="padding",Bn="margin",eo="Width",Ph="Height",Pe="px",Vn=function(t){return te.getComputedStyle(t)},j0=function(t){var e=Vn(t).position;t.style.position=e==="absolute"||e==="fixed"?e:"relative"},Tf=function(t,e){for(var n in e)n in t||(t[n]=e[n]);return t},Vi=function(t,e){var n=e&&Vn(t)[Pu]!=="matrix(1, 0, 0, 1, 0, 0)"&&It.to(t,{x:0,y:0,xPercent:0,yPercent:0,rotation:0,rotationX:0,rotationY:0,scale:1,skewX:0,skewY:0}).progress(1),i=t.getBoundingClientRect();return n&&n.progress(0).kill(),i},Pl=function(t,e){var n=e.d2;return t["offset"+n]||t["client"+n]||0},Hm=function(t){var e=[],n=t.labels,i=t.duration(),s;for(s in n)e.push(n[s]/i);return e},Z0=function(t){return function(e){return It.utils.snap(Hm(t),e)}},Lh=function(t){var e=It.utils.snap(t),n=Array.isArray(t)&&t.slice(0).sort(function(i,s){return i-s});return n?function(i,s,o){o===void 0&&(o=.001);var a;if(!s)return e(i);if(s>0){for(i-=o,a=0;a<n.length;a++)if(n[a]>=i)return n[a];return n[a-1]}else for(a=n.length,i+=o;a--;)if(n[a]<=i)return n[a];return n[0]}:function(i,s,o){o===void 0&&(o=.001);var a=e(i);return!s||Math.abs(a-i)<o||a-i<0==s<0?a:e(s<0?i-t:i+t)}},J0=function(t){return function(e,n){return Lh(Hm(t))(e,n.direction)}},Sa=function(t,e,n,i){return n.split(",").forEach(function(s){return t(e,s,i)})},Ie=function(t,e,n,i,s){return t.addEventListener(e,n,{passive:!i,capture:!!s})},Re=function(t,e,n,i){return t.removeEventListener(e,n,!!i)},ba=function(t,e,n){n=n&&n.wheelHandler,n&&(t(e,"wheel",n),t(e,"touchmove",n))},Ef={startColor:"green",endColor:"red",indent:0,fontSize:"16px",fontWeight:"normal"},wa={toggleActions:"play",anticipatePin:0},Ll={top:0,left:0,center:.5,bottom:1,right:1},al=function(t,e){if(wn(t)){var n=t.indexOf("="),i=~n?+(t.charAt(n-1)+1)*parseFloat(t.substr(n+1)):0;~n&&(t.indexOf("%")>n&&(i*=e/100),t=t.substr(0,n-1)),t=i+(t in Ll?Ll[t]*e:~t.indexOf("%")?parseFloat(t)*e/100:parseFloat(t)||0)}return t},Ta=function(t,e,n,i,s,o,a,l){var c=s.startColor,u=s.endColor,h=s.fontSize,f=s.indent,d=s.fontWeight,g=pe.createElement("div"),p=is(n)||mr(n,"pinType")==="fixed",m=t.indexOf("scroller")!==-1,_=p?ue:n,M=t.indexOf("start")!==-1,b=M?c:u,x="border-color:"+b+";font-size:"+h+";color:"+b+";font-weight:"+d+";pointer-events:none;white-space:nowrap;font-family:sans-serif,Arial;z-index:1000;padding:4px 8px;border-width:0;border-style:solid;";return x+="position:"+((m||l)&&p?"fixed;":"absolute;"),(m||l||!p)&&(x+=(i===Le?Ch:Ah)+":"+(o+parseFloat(f))+"px;"),a&&(x+="box-sizing:border-box;text-align:left;width:"+a.offsetWidth+"px;"),g._isStart=M,g.setAttribute("class","gsap-marker-"+t+(e?" marker-"+e:"")),g.style.cssText=x,g.innerText=e||e===0?t+"-"+e:t,_.children[0]?_.insertBefore(g,_.children[0]):_.appendChild(g),g._offset=g["offset"+i.op.d2],ll(g,0,i,M),g},ll=function(t,e,n,i){var s={display:"block"},o=n[i?"os2":"p2"],a=n[i?"p2":"os2"];t._isFlipped=i,s[n.a+"Percent"]=i?-100:0,s[n.a]=i?"1px":0,s["border"+o+eo]=1,s["border"+a+eo]=0,s[n.p]=e+"px",It.set(t,s)},Zt=[],Iu={},Qo,Cf=function(){return We()-Wn>34&&(Qo||(Qo=requestAnimationFrame(Wi)))},ds=function(){(!en||!en.isPressed||en.startX>ue.clientWidth)&&(Kt.cache++,en?Qo||(Qo=requestAnimationFrame(Wi)):Wi(),Wn||ss("scrollStart"),Wn=We())},Mc=function(){Fm=te.innerWidth,Nm=te.innerHeight},Ao=function(){Kt.cache++,!Ge&&!Om&&!pe.fullscreenElement&&!pe.webkitFullscreenElement&&(!Lu||Fm!==te.innerWidth||Math.abs(te.innerHeight-Nm)>te.innerHeight*.25)&&Cl.restart(!0)},rs={},K0=[],Wm=function r(){return Re(ne,"scrollEnd",r)||Ur(!0)},ss=function(t){return rs[t]&&rs[t].map(function(e){return e()})||K0},bn=[],Xm=function(t){for(var e=0;e<bn.length;e+=5)(!t||bn[e+4]&&bn[e+4].query===t)&&(bn[e].style.cssText=bn[e+1],bn[e].getBBox&&bn[e].setAttribute("transform",bn[e+2]||""),bn[e+3].uncache=1)},Dh=function(t,e){var n;for(nn=0;nn<Zt.length;nn++)n=Zt[nn],n&&(!e||n._ctx===e)&&(t?n.kill(1):n.revert(!0,!0));Al=!0,e&&Xm(e),e||ss("revert")},qm=function(t,e){Kt.cache++,(e||!rn)&&Kt.forEach(function(n){return an(n)&&n.cacheID++&&(n.rec=0)}),wn(t)&&(te.history.scrollRestoration=Th=t)},rn,Jr=0,Af,Q0=function(){if(Af!==Jr){var t=Af=Jr;requestAnimationFrame(function(){return t===Jr&&Ur(!0)})}},Ym=function(){ue.appendChild(Hs),Eh=!en&&Hs.offsetHeight||te.innerHeight,ue.removeChild(Hs)},Pf=function(t){return Ko(".gsap-marker-start, .gsap-marker-end, .gsap-marker-scroller-start, .gsap-marker-scroller-end").forEach(function(e){return e.style.display=t?"none":"block"})},Ur=function(t,e){if(Wn&&!t&&!Al){Ie(ne,"scrollEnd",Wm);return}Ym(),rn=ne.isRefreshing=!0,Kt.forEach(function(i){return an(i)&&++i.cacheID&&(i.rec=i())});var n=ss("refreshInit");Im&&ne.sort(),e||Dh(),Kt.forEach(function(i){an(i)&&(i.smooth&&(i.target.style.scrollBehavior="auto"),i(0))}),Zt.slice(0).forEach(function(i){return i.refresh()}),Al=!1,Zt.forEach(function(i){if(i._subPinOffset&&i.pin){var s=i.vars.horizontal?"offsetWidth":"offsetHeight",o=i.pin[s];i.revert(!0,1),i.adjustPinSpacing(i.pin[s]-o),i.refresh()}}),Ru=1,Pf(!0),Zt.forEach(function(i){var s=_i(i.scroller,i._dir),o=i.vars.end==="max"||i._endClamp&&i.end>s,a=i._startClamp&&i.start>=s;(o||a)&&i.setPositions(a?s-1:i.start,o?Math.max(a?s:i.start+1,s):i.end,!0)}),Pf(!1),Ru=0,n.forEach(function(i){return i&&i.render&&i.render(-1)}),Kt.forEach(function(i){an(i)&&(i.smooth&&requestAnimationFrame(function(){return i.target.style.scrollBehavior="smooth"}),i.rec&&i(i.rec))}),qm(Th,1),Cl.pause(),Jr++,rn=2,Wi(2),Zt.forEach(function(i){return an(i.vars.onRefresh)&&i.vars.onRefresh(i)}),rn=ne.isRefreshing=!1,ss("refresh")},Ou=0,cl=1,Go,Wi=function(t){if(t===2||!rn&&!Al){ne.isUpdating=!0,Go&&Go.update(0);var e=Zt.length,n=We(),i=n-vc>=50,s=e&&Zt[0].scroll();if(cl=Ou>s?-1:1,rn||(Ou=s),i&&(Wn&&!Wl&&n-Wn>200&&(Wn=0,ss("scrollEnd")),wo=vc,vc=n),cl<0){for(nn=e;nn-- >0;)Zt[nn]&&Zt[nn].update(0,i);cl=1}else for(nn=0;nn<e;nn++)Zt[nn]&&Zt[nn].update(0,i);ne.isUpdating=!1}Qo=0},Nu=[Vm,Gm,Ah,Ch,Bn+Vo,Bn+ko,Bn+Bo,Bn+Uo,"display","flexShrink","float","zIndex","gridColumnStart","gridColumnEnd","gridRowStart","gridRowEnd","gridArea","justifySelf","alignSelf","placeSelf","order"],ul=Nu.concat([jr,Zr,"boxSizing","max"+eo,"max"+Ph,"position",Bn,Ee,Ee+Bo,Ee+ko,Ee+Vo,Ee+Uo]),tx=function(t,e,n){Ws(n);var i=t._gsap;if(i.spacerIsNative)Ws(i.spacerState);else if(t._gsap.swappedIn){var s=e.parentNode;s&&(s.insertBefore(t,e),s.removeChild(e))}t._gsap.swappedIn=!1},Sc=function(t,e,n,i){if(!t._gsap.swappedIn){for(var s=Nu.length,o=e.style,a=t.style,l;s--;)l=Nu[s],o[l]=n[l];o.position=n.position==="absolute"?"absolute":"relative",n.display==="inline"&&(o.display="inline-block"),a[Ah]=a[Ch]="auto",o.flexBasis=n.flexBasis||"auto",o.overflow="visible",o.boxSizing="border-box",o[jr]=Pl(t,on)+Pe,o[Zr]=Pl(t,Le)+Pe,o[Ee]=a[Bn]=a[Gm]=a[Vm]="0",Ws(i),a[jr]=a["max"+eo]=n[jr],a[Zr]=a["max"+Ph]=n[Zr],a[Ee]=n[Ee],t.parentNode!==e&&(t.parentNode.insertBefore(e,t),e.appendChild(t)),t._gsap.swappedIn=!0}},ex=/([A-Z])/g,Ws=function(t){if(t){var e=t.t.style,n=t.length,i=0,s,o;for((t.t._gsap||It.core.getCache(t.t)).uncache=1;i<n;i+=2)o=t[i+1],s=t[i],o?e[s]=o:e[s]&&e.removeProperty(s.replace(ex,"-$1").toLowerCase())}},Ea=function(t){for(var e=ul.length,n=t.style,i=[],s=0;s<e;s++)i.push(ul[s],n[ul[s]]);return i.t=t,i},nx=function(t,e,n){for(var i=[],s=t.length,o=n?8:0,a;o<s;o+=2)a=t[o],i.push(a,a in e?e[a]:t[o+1]);return i.t=t.t,i},hl={left:0,top:0},Lf=function(t,e,n,i,s,o,a,l,c,u,h,f,d,g){an(t)&&(t=t(l)),wn(t)&&t.substr(0,3)==="max"&&(t=f+(t.charAt(4)==="="?al("0"+t.substr(3),n):0));var p=d?d.time():0,m,_,M;if(d&&d.seek(0),isNaN(t)||(t=+t),Co(t))d&&(t=It.utils.mapRange(d.scrollTrigger.start,d.scrollTrigger.end,0,f,t)),a&&ll(a,n,i,!0);else{an(e)&&(e=e(l));var b=(t||"0").split(" "),x,v,E,C;M=dn(e,l)||ue,x=Vi(M)||{},(!x||!x.left&&!x.top)&&Vn(M).display==="none"&&(C=M.style.display,M.style.display="block",x=Vi(M),C?M.style.display=C:M.style.removeProperty("display")),v=al(b[0],x[i.d]),E=al(b[1]||"0",n),t=x[i.p]-c[i.p]-u+v+s-E,a&&ll(a,E,i,n-E<20||a._isStart&&E>20),n-=n-E}if(g&&(l[g]=t||-.001,t<0&&(t=0)),o){var y=t+n,w=o._isStart;m="scroll"+i.d2,ll(o,y,i,w&&y>20||!w&&(h?Math.max(ue[m],ei[m]):o.parentNode[m])<=y+1),h&&(c=Vi(a),h&&(o.style[i.op.p]=c[i.op.p]-i.op.m-o._offset+Pe))}return d&&M&&(m=Vi(M),d.seek(f),_=Vi(M),d._caScrollDist=m[i.p]-_[i.p],t=t/d._caScrollDist*f),d&&d.seek(p),d?t:Math.round(t)},ix=/(webkit|moz|length|cssText|inset)/i,Df=function(t,e,n,i){if(t.parentNode!==e){var s=t.style,o,a;if(e===ue){t._stOrig=s.cssText,a=Vn(t);for(o in a)!+o&&!ix.test(o)&&a[o]&&typeof s[o]=="string"&&o!=="0"&&(s[o]=a[o]);s.top=n,s.left=i}else s.cssText=t._stOrig;It.core.getCache(t).uncache=1,e.appendChild(t)}},$m=function(t,e,n){var i=e,s=i;return function(o){var a=Math.round(t());return a!==i&&a!==s&&Math.abs(a-i)>3&&Math.abs(a-s)>3&&(o=a,n&&n()),s=i,i=o,o}},Ca=function(t,e,n){var i={};i[e.p]="+="+n,It.set(t,i)},Rf=function(t,e){var n=Sr(t,e),i="_scroll"+e.p2,s=function o(a,l,c,u,h){var f=o.tween,d=l.onComplete,g={};c=c||n();var p=$m(n,c,function(){f.kill(),o.tween=0});return h=u&&h||0,u=u||a-c,f&&f.kill(),l[i]=a,l.inherit=!1,l.modifiers=g,g[i]=function(){return p(c+u*f.ratio+h*f.ratio*f.ratio)},l.onUpdate=function(){Kt.cache++,o.tween&&Wi()},l.onComplete=function(){o.tween=0,d&&d.call(f)},f=o.tween=It.to(t,l),f};return t[i]=n,n.wheelHandler=function(){return s.tween&&s.tween.kill()&&(s.tween=0)},Ie(t,"wheel",n.wheelHandler),ne.isTouch&&Ie(t,"touchmove",n.wheelHandler),s},ne=function(){function r(e,n){Ls||r.register(It)||console.warn("Please gsap.registerPlugin(ScrollTrigger)"),Du(this),this.init(e,n)}var t=r.prototype;return t.init=function(n,i){if(this.progress=this.start=0,this.vars&&this.kill(!0,!0),!To){this.update=this.refresh=this.kill=di;return}n=Tf(wn(n)||Co(n)||n.nodeType?{trigger:n}:n,wa);var s=n,o=s.onUpdate,a=s.toggleClass,l=s.id,c=s.onToggle,u=s.onRefresh,h=s.scrub,f=s.trigger,d=s.pin,g=s.pinSpacing,p=s.invalidateOnRefresh,m=s.anticipatePin,_=s.onScrubComplete,M=s.onSnapComplete,b=s.once,x=s.snap,v=s.pinReparent,E=s.pinSpacer,C=s.containerAnimation,y=s.fastScrollEnd,w=s.preventOverlaps,D=n.horizontal||n.containerAnimation&&n.horizontal!==!1?on:Le,B=!h&&h!==0,k=dn(n.scroller||te),Z=It.core.getCache(k),V=is(k),$=("pinType"in n?n.pinType:mr(k,"pinType")||V&&"fixed")==="fixed",Y=[n.onEnter,n.onLeave,n.onEnterBack,n.onLeaveBack],H=B&&n.toggleActions.split(" "),G="markers"in n?n.markers:wa.markers,q=V?0:parseFloat(Vn(k)["border"+D.p2+eo])||0,P=this,nt=n.onRefreshInit&&function(){return n.onRefreshInit(P)},A=Y0(k,V,D),O=$0(k,V),T=0,I=0,z=0,U=Sr(k,D),j,rt,tt,ut,ot,at,it,dt,W,S,pt,yt,Lt,Et,F,L,st,ht,xt,_t,Ct,N,ft,St,mt,X,gt,Mt,Ot,bt,Pt,lt,Nt,Xt,Gt,se,we,zn,Ve;if(P._startClamp=P._endClamp=!1,P._dir=D,m*=45,P.scroller=k,P.scroll=C?C.time.bind(C):U,ut=U(),P.vars=n,i=i||n.animation,"refreshPriority"in n&&(Im=1,n.refreshPriority===-9999&&(Go=P)),Z.tweenScroll=Z.tweenScroll||{top:Rf(k,Le),left:Rf(k,on)},P.tweenTo=j=Z.tweenScroll[D.p],P.scrubDuration=function(wt){Nt=Co(wt)&&wt,Nt?lt?lt.duration(wt):lt=It.to(i,{ease:"expo",totalProgress:"+=0",inherit:!1,duration:Nt,paused:!0,onComplete:function(){return _&&_(P)}}):(lt&&lt.progress(1).kill(),lt=0)},i&&(i.vars.lazy=!1,i._initted&&!P.isReverted||i.vars.immediateRender!==!1&&n.immediateRender!==!1&&i.duration()&&i.render(0,!0,!0),P.animation=i.pause(),i.scrollTrigger=P,P.scrubDuration(h),bt=0,l||(l=i.vars.id)),x&&((!Or(x)||x.push)&&(x={snapTo:x}),"scrollBehavior"in ue.style&&It.set(V?[ue,ei]:k,{scrollBehavior:"auto"}),Kt.forEach(function(wt){return an(wt)&&wt.target===(V?pe.scrollingElement||ei:k)&&(wt.smooth=!1)}),tt=an(x.snapTo)?x.snapTo:x.snapTo==="labels"?Z0(i):x.snapTo==="labelsDirectional"?J0(i):x.directional!==!1?function(wt,qt){return Lh(x.snapTo)(wt,We()-I<500?0:qt.direction)}:It.utils.snap(x.snapTo),Xt=x.duration||{min:.1,max:2},Xt=Or(Xt)?zo(Xt.min,Xt.max):zo(Xt,Xt),Gt=It.delayedCall(x.delay||Nt/2||.1,function(){var wt=U(),qt=We()-I<500,zt=j.tween;if((qt||Math.abs(P.getVelocity())<10)&&!zt&&!Wl&&T!==wt){var R=(wt-at)/Et,K=i&&!B?i.totalProgress():R,Q=qt?0:(K-Pt)/(We()-wo)*1e3||0,et=It.utils.clamp(-R,1-R,fs(Q/2)*Q/.185),ct=R+(x.inertia===!1?0:et),At,Dt,Rt=x,Ut=Rt.onStart,kt=Rt.onInterrupt,Ht=Rt.onComplete;if(At=tt(ct,P),Co(At)||(At=ct),Dt=Math.round(at+At*Et),wt<=it&&wt>=at&&Dt!==wt){if(zt&&!zt._initted&&zt.data<=fs(Dt-wt))return;x.inertia===!1&&(et=At-R),j(Dt,{duration:Xt(fs(Math.max(fs(ct-K),fs(At-K))*.185/Q/.05||0)),ease:x.ease||"power3",data:fs(Dt-wt),onInterrupt:function(){return Gt.restart(!0)&&kt&&kt(P)},onComplete:function(){P.update(),T=U(),i&&(lt?lt.resetTo("totalProgress",At,i._tTime/i._tDur):i.progress(At)),bt=Pt=i&&!B?i.totalProgress():P.progress,M&&M(P),Ht&&Ht(P)}},wt,et*Et,Dt-wt-et*Et),Ut&&Ut(P,j.tween)}}else P.isActive&&T!==wt&&Gt.restart(!0)}).pause()),l&&(Iu[l]=P),f=P.trigger=dn(f||d!==!0&&d),Ve=f&&f._gsap&&f._gsap.stRevert,Ve&&(Ve=Ve(P)),d=d===!0?f:dn(d),wn(a)&&(a={targets:f,className:a}),d&&(g===!1||g===Bn||(g=!g&&d.parentNode&&d.parentNode.style&&Vn(d.parentNode).display==="flex"?!1:Ee),P.pin=d,rt=It.core.getCache(d),rt.spacer?F=rt.pinState:(E&&(E=dn(E),E&&!E.nodeType&&(E=E.current||E.nativeElement),rt.spacerIsNative=!!E,E&&(rt.spacerState=Ea(E))),rt.spacer=ht=E||pe.createElement("div"),ht.classList.add("pin-spacer"),l&&ht.classList.add("pin-spacer-"+l),rt.pinState=F=Ea(d)),n.force3D!==!1&&It.set(d,{force3D:!0}),P.spacer=ht=rt.spacer,Ot=Vn(d),St=Ot[g+D.os2],_t=It.getProperty(d),Ct=It.quickSetter(d,D.a,Pe),Sc(d,ht,Ot),st=Ea(d)),G){yt=Or(G)?Tf(G,Ef):Ef,S=Ta("scroller-start",l,k,D,yt,0),pt=Ta("scroller-end",l,k,D,yt,0,S),xt=S["offset"+D.op.d2];var Je=dn(mr(k,"content")||k);dt=this.markerStart=Ta("start",l,Je,D,yt,xt,0,C),W=this.markerEnd=Ta("end",l,Je,D,yt,xt,0,C),C&&(zn=It.quickSetter([dt,W],D.a,Pe)),!$&&!(Mi.length&&mr(k,"fixedMarkers")===!0)&&(j0(V?ue:k),It.set([S,pt],{force3D:!0}),X=It.quickSetter(S,D.a,Pe),Mt=It.quickSetter(pt,D.a,Pe))}if(C){var Bt=C.vars.onUpdate,Ft=C.vars.onUpdateParams;C.eventCallback("onUpdate",function(){P.update(0,0,1),Bt&&Bt.apply(C,Ft||[])})}if(P.previous=function(){return Zt[Zt.indexOf(P)-1]},P.next=function(){return Zt[Zt.indexOf(P)+1]},P.revert=function(wt,qt){if(!qt)return P.kill(!0);var zt=wt!==!1||!P.enabled,R=Ge;zt!==P.isReverted&&(zt&&(se=Math.max(U(),P.scroll.rec||0),z=P.progress,we=i&&i.progress()),dt&&[dt,W,S,pt].forEach(function(K){return K.style.display=zt?"none":"block"}),zt&&(Ge=P,P.update(zt)),d&&(!v||!P.isActive)&&(zt?tx(d,ht,F):Sc(d,ht,Vn(d),mt)),zt||P.update(zt),Ge=R,P.isReverted=zt)},P.refresh=function(wt,qt,zt,R){if(!((Ge||!P.enabled)&&!qt)){if(d&&wt&&Wn){Ie(r,"scrollEnd",Wm);return}!rn&&nt&&nt(P),Ge=P,j.tween&&!zt&&(j.tween.kill(),j.tween=0),lt&&lt.pause(),p&&i&&i.revert({kill:!1}).invalidate(),P.isReverted||P.revert(!0,!0),P._subPinOffset=!1;var K=A(),Q=O(),et=C?C.duration():_i(k,D),ct=Et<=.01,At=0,Dt=R||0,Rt=Or(zt)?zt.end:n.end,Ut=n.endTrigger||f,kt=Or(zt)?zt.start:n.start||(n.start===0||!f?0:d?"0 0":"0 100%"),Ht=P.pinnedContainer=n.pinnedContainer&&dn(n.pinnedContainer,P),Yt=f&&Math.max(0,Zt.indexOf(P))||0,jt=Yt,ce,de,un,Ke,Wt,le,re,hn,$n,jn,fn,Me,ai;for(G&&Or(zt)&&(Me=It.getProperty(S,D.p),ai=It.getProperty(pt,D.p));jt--;)le=Zt[jt],le.end||le.refresh(0,1)||(Ge=P),re=le.pin,re&&(re===f||re===d||re===Ht)&&!le.isReverted&&(jn||(jn=[]),jn.unshift(le),le.revert(!0,!0)),le!==Zt[jt]&&(Yt--,jt--);for(an(kt)&&(kt=kt(P)),kt=Mf(kt,"start",P),at=Lf(kt,f,K,D,U(),dt,S,P,Q,q,$,et,C,P._startClamp&&"_startClamp")||(d?-.001:0),an(Rt)&&(Rt=Rt(P)),wn(Rt)&&!Rt.indexOf("+=")&&(~Rt.indexOf(" ")?Rt=(wn(kt)?kt.split(" ")[0]:"")+Rt:(At=al(Rt.substr(2),K),Rt=wn(kt)?kt:(C?It.utils.mapRange(0,C.duration(),C.scrollTrigger.start,C.scrollTrigger.end,at):at)+At,Ut=f)),Rt=Mf(Rt,"end",P),it=Math.max(at,Lf(Rt||(Ut?"100% 0":et),Ut,K,D,U()+At,W,pt,P,Q,q,$,et,C,P._endClamp&&"_endClamp"))||-.001,At=0,jt=Yt;jt--;)le=Zt[jt],re=le.pin,re&&le.start-le._pinPush<=at&&!C&&le.end>0&&(ce=le.end-(P._startClamp?Math.max(0,le.start):le.start),(re===f&&le.start-le._pinPush<at||re===Ht)&&isNaN(kt)&&(At+=ce*(1-le.progress)),re===d&&(Dt+=ce));if(at+=At,it+=At,P._startClamp&&(P._startClamp+=At),P._endClamp&&!rn&&(P._endClamp=it||-.001,it=Math.min(it,_i(k,D))),Et=it-at||(at-=.01)&&.001,ct&&(z=It.utils.clamp(0,1,It.utils.normalize(at,it,se))),P._pinPush=Dt,dt&&At&&(ce={},ce[D.a]="+="+At,Ht&&(ce[D.p]="-="+U()),It.set([dt,W],ce)),d&&!(Ru&&P.end>=_i(k,D)))ce=Vn(d),Ke=D===Le,un=U(),N=parseFloat(_t(D.a))+Dt,!et&&it>1&&(fn=(V?pe.scrollingElement||ei:k).style,fn={style:fn,value:fn["overflow"+D.a.toUpperCase()]},V&&Vn(ue)["overflow"+D.a.toUpperCase()]!=="scroll"&&(fn.style["overflow"+D.a.toUpperCase()]="scroll")),Sc(d,ht,ce),st=Ea(d),de=Vi(d,!0),hn=$&&Sr(k,Ke?on:Le)(),g?(mt=[g+D.os2,Et+Dt+Pe],mt.t=ht,jt=g===Ee?Pl(d,D)+Et+Dt:0,jt&&(mt.push(D.d,jt+Pe),ht.style.flexBasis!=="auto"&&(ht.style.flexBasis=jt+Pe)),Ws(mt),Ht&&Zt.forEach(function(Pi){Pi.pin===Ht&&Pi.vars.pinSpacing!==!1&&(Pi._subPinOffset=!0)}),$&&U(se)):(jt=Pl(d,D),jt&&ht.style.flexBasis!=="auto"&&(ht.style.flexBasis=jt+Pe)),$&&(Wt={top:de.top+(Ke?un-at:hn)+Pe,left:de.left+(Ke?hn:un-at)+Pe,boxSizing:"border-box",position:"fixed"},Wt[jr]=Wt["max"+eo]=Math.ceil(de.width)+Pe,Wt[Zr]=Wt["max"+Ph]=Math.ceil(de.height)+Pe,Wt[Bn]=Wt[Bn+Bo]=Wt[Bn+ko]=Wt[Bn+Vo]=Wt[Bn+Uo]="0",Wt[Ee]=ce[Ee],Wt[Ee+Bo]=ce[Ee+Bo],Wt[Ee+ko]=ce[Ee+ko],Wt[Ee+Vo]=ce[Ee+Vo],Wt[Ee+Uo]=ce[Ee+Uo],L=nx(F,Wt,v),rn&&U(0)),i?($n=i._initted,_c(1),i.render(i.duration(),!0,!0),ft=_t(D.a)-N+Et+Dt,gt=Math.abs(Et-ft)>1,$&&gt&&L.splice(L.length-2,2),i.render(0,!0,!0),$n||i.invalidate(!0),i.parent||i.totalTime(i.totalTime()),_c(0)):ft=Et,fn&&(fn.value?fn.style["overflow"+D.a.toUpperCase()]=fn.value:fn.style.removeProperty("overflow-"+D.a));else if(f&&U()&&!C)for(de=f.parentNode;de&&de!==ue;)de._pinOffset&&(at-=de._pinOffset,it-=de._pinOffset),de=de.parentNode;jn&&jn.forEach(function(Pi){return Pi.revert(!1,!0)}),P.start=at,P.end=it,ut=ot=rn?se:U(),!C&&!rn&&(ut<se&&U(se),P.scroll.rec=0),P.revert(!1,!0),I=We(),Gt&&(T=-1,Gt.restart(!0)),Ge=0,i&&B&&(i._initted||we)&&i.progress()!==we&&i.progress(we||0,!0).render(i.time(),!0,!0),(ct||z!==P.progress||C||p)&&(i&&!B&&i.totalProgress(C&&at<-.001&&!z?It.utils.normalize(at,it,0):z,!0),P.progress=ct||(ut-at)/Et===z?0:z),d&&g&&(ht._pinOffset=Math.round(P.progress*ft)),lt&&lt.invalidate(),isNaN(Me)||(Me-=It.getProperty(S,D.p),ai-=It.getProperty(pt,D.p),Ca(S,D,Me),Ca(dt,D,Me-(R||0)),Ca(pt,D,ai),Ca(W,D,ai-(R||0))),ct&&!rn&&P.update(),u&&!rn&&!Lt&&(Lt=!0,u(P),Lt=!1)}},P.getVelocity=function(){return(U()-ot)/(We()-wo)*1e3||0},P.endAnimation=function(){xo(P.callbackAnimation),i&&(lt?lt.progress(1):i.paused()?B||xo(i,P.direction<0,1):xo(i,i.reversed()))},P.labelToScroll=function(wt){return i&&i.labels&&(at||P.refresh()||at)+i.labels[wt]/i.duration()*Et||0},P.getTrailing=function(wt){var qt=Zt.indexOf(P),zt=P.direction>0?Zt.slice(0,qt).reverse():Zt.slice(qt+1);return(wn(wt)?zt.filter(function(R){return R.vars.preventOverlaps===wt}):zt).filter(function(R){return P.direction>0?R.end<=at:R.start>=it})},P.update=function(wt,qt,zt){if(!(C&&!zt&&!wt)){var R=rn===!0?se:P.scroll(),K=wt?0:(R-at)/Et,Q=K<0?0:K>1?1:K||0,et=P.progress,ct,At,Dt,Rt,Ut,kt,Ht,Yt;if(qt&&(ot=ut,ut=C?U():R,x&&(Pt=bt,bt=i&&!B?i.totalProgress():Q)),m&&d&&!Ge&&!ya&&Wn&&(!Q&&at<R+(R-ot)/(We()-wo)*m?Q=1e-4:Q===1&&it>R+(R-ot)/(We()-wo)*m&&(Q=.9999)),Q!==et&&P.enabled){if(ct=P.isActive=!!Q&&Q<1,At=!!et&&et<1,kt=ct!==At,Ut=kt||!!Q!=!!et,P.direction=Q>et?1:-1,P.progress=Q,Ut&&!Ge&&(Dt=Q&&!et?0:Q===1?1:et===1?2:3,B&&(Rt=!kt&&H[Dt+1]!=="none"&&H[Dt+1]||H[Dt],Yt=i&&(Rt==="complete"||Rt==="reset"||Rt in i))),w&&(kt||Yt)&&(Yt||h||!i)&&(an(w)?w(P):P.getTrailing(w).forEach(function(un){return un.endAnimation()})),B||(lt&&!Ge&&!ya?(lt._dp._time-lt._start!==lt._time&&lt.render(lt._dp._time-lt._start),lt.resetTo?lt.resetTo("totalProgress",Q,i._tTime/i._tDur):(lt.vars.totalProgress=Q,lt.invalidate().restart())):i&&i.totalProgress(Q,!!(Ge&&(I||wt)))),d){if(wt&&g&&(ht.style[g+D.os2]=St),!$)Ct(Eo(N+ft*Q));else if(Ut){if(Ht=!wt&&Q>et&&it+1>R&&R+1>=_i(k,D),v)if(!wt&&(ct||Ht)){var jt=Vi(d,!0),ce=R-at;Df(d,ue,jt.top+(D===Le?ce:0)+Pe,jt.left+(D===Le?0:ce)+Pe)}else Df(d,ht);Ws(ct||Ht?L:st),gt&&Q<1&&ct||Ct(N+(Q===1&&!Ht?ft:0))}}x&&!j.tween&&!Ge&&!ya&&Gt.restart(!0),a&&(kt||b&&Q&&(Q<1||!xc))&&Ko(a.targets).forEach(function(un){return un.classList[ct||b?"add":"remove"](a.className)}),o&&!B&&!wt&&o(P),Ut&&!Ge?(B&&(Yt&&(Rt==="complete"?i.pause().totalProgress(1):Rt==="reset"?i.restart(!0).pause():Rt==="restart"?i.restart(!0):i[Rt]()),o&&o(P)),(kt||!xc)&&(c&&kt&&yc(P,c),Y[Dt]&&yc(P,Y[Dt]),b&&(Q===1?P.kill(!1,1):Y[Dt]=0),kt||(Dt=Q===1?1:3,Y[Dt]&&yc(P,Y[Dt]))),y&&!ct&&Math.abs(P.getVelocity())>(Co(y)?y:2500)&&(xo(P.callbackAnimation),lt?lt.progress(1):xo(i,Rt==="reverse"?1:!Q,1))):B&&o&&!Ge&&o(P)}if(Mt){var de=C?R/C.duration()*(C._caScrollDist||0):R;X(de+(S._isFlipped?1:0)),Mt(de)}zn&&zn(-R/C.duration()*(C._caScrollDist||0))}},P.enable=function(wt,qt){P.enabled||(P.enabled=!0,Ie(k,"resize",Ao),V||Ie(k,"scroll",ds),nt&&Ie(r,"refreshInit",nt),wt!==!1&&(P.progress=z=0,ut=ot=T=U()),qt!==!1&&P.refresh())},P.getTween=function(wt){return wt&&j?j.tween:lt},P.setPositions=function(wt,qt,zt,R){if(C){var K=C.scrollTrigger,Q=C.duration(),et=K.end-K.start;wt=K.start+et*wt/Q,qt=K.start+et*qt/Q}P.refresh(!1,!1,{start:Sf(wt,zt&&!!P._startClamp),end:Sf(qt,zt&&!!P._endClamp)},R),P.update()},P.adjustPinSpacing=function(wt){if(mt&&wt){var qt=mt.indexOf(D.d)+1;mt[qt]=parseFloat(mt[qt])+wt+Pe,mt[1]=parseFloat(mt[1])+wt+Pe,Ws(mt)}},P.disable=function(wt,qt){if(P.enabled&&(wt!==!1&&P.revert(!0,!0),P.enabled=P.isActive=!1,qt||lt&&lt.pause(),se=0,rt&&(rt.uncache=1),nt&&Re(r,"refreshInit",nt),Gt&&(Gt.pause(),j.tween&&j.tween.kill()&&(j.tween=0)),!V)){for(var zt=Zt.length;zt--;)if(Zt[zt].scroller===k&&Zt[zt]!==P)return;Re(k,"resize",Ao),V||Re(k,"scroll",ds)}},P.kill=function(wt,qt){P.disable(wt,qt),lt&&!qt&&lt.kill(),l&&delete Iu[l];var zt=Zt.indexOf(P);zt>=0&&Zt.splice(zt,1),zt===nn&&cl>0&&nn--,zt=0,Zt.forEach(function(R){return R.scroller===P.scroller&&(zt=1)}),zt||rn||(P.scroll.rec=0),i&&(i.scrollTrigger=null,wt&&i.revert({kill:!1}),qt||i.kill()),dt&&[dt,W,S,pt].forEach(function(R){return R.parentNode&&R.parentNode.removeChild(R)}),Go===P&&(Go=0),d&&(rt&&(rt.uncache=1),zt=0,Zt.forEach(function(R){return R.pin===d&&zt++}),zt||(rt.spacer=0)),n.onKill&&n.onKill(P)},Zt.push(P),P.enable(!1,!1),Ve&&Ve(P),i&&i.add&&!Et){var Qt=P.update;P.update=function(){P.update=Qt,at||it||P.refresh()},It.delayedCall(.01,P.update),Et=.01,at=it=0}else P.refresh();d&&Q0()},r.register=function(n){return Ls||(It=n||km(),zm()&&window.document&&r.enable(),Ls=To),Ls},r.defaults=function(n){if(n)for(var i in n)wa[i]=n[i];return wa},r.disable=function(n,i){To=0,Zt.forEach(function(o){return o[i?"kill":"disable"](n)}),Re(te,"wheel",ds),Re(pe,"scroll",ds),clearInterval(va),Re(pe,"touchcancel",di),Re(ue,"touchstart",di),Sa(Re,pe,"pointerdown,touchstart,mousedown",bf),Sa(Re,pe,"pointerup,touchend,mouseup",wf),Cl.kill(),Ma(Re);for(var s=0;s<Kt.length;s+=3)ba(Re,Kt[s],Kt[s+1]),ba(Re,Kt[s],Kt[s+2])},r.enable=function(){if(te=window,pe=document,ei=pe.documentElement,ue=pe.body,It&&(Ko=It.utils.toArray,zo=It.utils.clamp,Du=It.core.context||di,_c=It.core.suppressOverwrites||di,Th=te.history.scrollRestoration||"auto",Ou=te.pageYOffset,It.core.globals("ScrollTrigger",r),ue)){To=1,Hs=document.createElement("div"),Hs.style.height="100vh",Hs.style.position="absolute",Ym(),q0(),be.register(It),r.isTouch=be.isTouch,sr=be.isTouch&&/(iPad|iPhone|iPod|Mac)/g.test(navigator.userAgent),Lu=be.isTouch===1,Ie(te,"wheel",ds),Rm=[te,pe,ei,ue],It.matchMedia?(r.matchMedia=function(l){var c=It.matchMedia(),u;for(u in l)c.add(u,l[u]);return c},It.addEventListener("matchMediaInit",function(){return Dh()}),It.addEventListener("matchMediaRevert",function(){return Xm()}),It.addEventListener("matchMedia",function(){Ur(0,1),ss("matchMedia")}),It.matchMedia("(orientation: portrait)",function(){return Mc(),Mc})):console.warn("Requires GSAP 3.11.0 or later"),Mc(),Ie(pe,"scroll",ds);var n=ue.style,i=n.borderTopStyle,s=It.core.Animation.prototype,o,a;for(s.revert||Object.defineProperty(s,"revert",{value:function(){return this.time(-.01,!0)}}),n.borderTopStyle="solid",o=Vi(ue),Le.m=Math.round(o.top+Le.sc())||0,on.m=Math.round(o.left+on.sc())||0,i?n.borderTopStyle=i:n.removeProperty("border-top-style"),va=setInterval(Cf,250),It.delayedCall(.5,function(){return ya=0}),Ie(pe,"touchcancel",di),Ie(ue,"touchstart",di),Sa(Ie,pe,"pointerdown,touchstart,mousedown",bf),Sa(Ie,pe,"pointerup,touchend,mouseup",wf),Pu=It.utils.checkPrefix("transform"),ul.push(Pu),Ls=We(),Cl=It.delayedCall(.2,Ur).pause(),Ds=[pe,"visibilitychange",function(){var l=te.innerWidth,c=te.innerHeight;pe.hidden?(vf=l,yf=c):(vf!==l||yf!==c)&&Ao()},pe,"DOMContentLoaded",Ur,te,"load",Ur,te,"resize",Ao],Ma(Ie),Zt.forEach(function(l){return l.enable(0,1)}),a=0;a<Kt.length;a+=3)ba(Re,Kt[a],Kt[a+1]),ba(Re,Kt[a],Kt[a+2])}},r.config=function(n){"limitCallbacks"in n&&(xc=!!n.limitCallbacks);var i=n.syncInterval;i&&clearInterval(va)||(va=i)&&setInterval(Cf,i),"ignoreMobileResize"in n&&(Lu=r.isTouch===1&&n.ignoreMobileResize),"autoRefreshEvents"in n&&(Ma(Re)||Ma(Ie,n.autoRefreshEvents||"none"),Om=(n.autoRefreshEvents+"").indexOf("resize")===-1)},r.scrollerProxy=function(n,i){var s=dn(n),o=Kt.indexOf(s),a=is(s);~o&&Kt.splice(o,a?6:2),i&&(a?Mi.unshift(te,i,ue,i,ei,i):Mi.unshift(s,i))},r.clearMatchMedia=function(n){Zt.forEach(function(i){return i._ctx&&i._ctx.query===n&&i._ctx.kill(!0,!0)})},r.isInViewport=function(n,i,s){var o=(wn(n)?dn(n):n).getBoundingClientRect(),a=o[s?jr:Zr]*i||0;return s?o.right-a>0&&o.left+a<te.innerWidth:o.bottom-a>0&&o.top+a<te.innerHeight},r.positionInViewport=function(n,i,s){wn(n)&&(n=dn(n));var o=n.getBoundingClientRect(),a=o[s?jr:Zr],l=i==null?a/2:i in Ll?Ll[i]*a:~i.indexOf("%")?parseFloat(i)*a/100:parseFloat(i)||0;return s?(o.left+l)/te.innerWidth:(o.top+l)/te.innerHeight},r.killAll=function(n){if(Zt.slice(0).forEach(function(s){return s.vars.id!=="ScrollSmoother"&&s.kill()}),n!==!0){var i=rs.killAll||[];rs={},i.forEach(function(s){return s()})}},r}();ne.version="3.12.5";ne.saveStyles=function(r){return r?Ko(r).forEach(function(t){if(t&&t.style){var e=bn.indexOf(t);e>=0&&bn.splice(e,5),bn.push(t,t.style.cssText,t.getBBox&&t.getAttribute("transform"),It.core.getCache(t),Du())}}):bn};ne.revert=function(r,t){return Dh(!r,t)};ne.create=function(r,t){return new ne(r,t)};ne.refresh=function(r){return r?Ao():(Ls||ne.register())&&Ur(!0)};ne.update=function(r){return++Kt.cache&&Wi(r===!0?2:0)};ne.clearScrollMemory=qm;ne.maxScroll=function(r,t){return _i(r,t?on:Le)};ne.getScrollFunc=function(r,t){return Sr(dn(r),t?on:Le)};ne.getById=function(r){return Iu[r]};ne.getAll=function(){return Zt.filter(function(r){return r.vars.id!=="ScrollSmoother"})};ne.isScrolling=function(){return!!Wn};ne.snapDirectional=Lh;ne.addEventListener=function(r,t){var e=rs[r]||(rs[r]=[]);~e.indexOf(t)||e.push(t)};ne.removeEventListener=function(r,t){var e=rs[r],n=e&&e.indexOf(t);n>=0&&e.splice(n,1)};ne.batch=function(r,t){var e=[],n={},i=t.interval||.016,s=t.batchMax||1e9,o=function(c,u){var h=[],f=[],d=It.delayedCall(i,function(){u(h,f),h=[],f=[]}).pause();return function(g){h.length||d.restart(!0),h.push(g.trigger),f.push(g),s<=h.length&&d.progress(1)}},a;for(a in t)n[a]=a.substr(0,2)==="on"&&an(t[a])&&a!=="onRefreshInit"?o(a,t[a]):t[a];return an(s)&&(s=s(),Ie(ne,"refresh",function(){return s=t.batchMax()})),Ko(r).forEach(function(l){var c={};for(a in n)c[a]=n[a];c.trigger=l,e.push(ne.create(c))}),e};var If=function(t,e,n,i){return e>i?t(i):e<0&&t(0),n>i?(i-e)/(n-e):n<0?e/(e-n):1},bc=function r(t,e){e===!0?t.style.removeProperty("touch-action"):t.style.touchAction=e===!0?"auto":e?"pan-"+e+(be.isTouch?" pinch-zoom":""):"none",t===ei&&r(ue,e)},Aa={auto:1,scroll:1},rx=function(t){var e=t.event,n=t.target,i=t.axis,s=(e.changedTouches?e.changedTouches[0]:e).target,o=s._gsap||It.core.getCache(s),a=We(),l;if(!o._isScrollT||a-o._isScrollT>2e3){for(;s&&s!==ue&&(s.scrollHeight<=s.clientHeight&&s.scrollWidth<=s.clientWidth||!(Aa[(l=Vn(s)).overflowY]||Aa[l.overflowX]));)s=s.parentNode;o._isScroll=s&&s!==n&&!is(s)&&(Aa[(l=Vn(s)).overflowY]||Aa[l.overflowX]),o._isScrollT=a}(o._isScroll||i==="x")&&(e.stopPropagation(),e._gsapAllow=!0)},jm=function(t,e,n,i){return be.create({target:t,capture:!0,debounce:!1,lockAxis:!0,type:e,onWheel:i=i&&rx,onPress:i,onDrag:i,onScroll:i,onEnable:function(){return n&&Ie(pe,be.eventTypes[0],Nf,!1,!0)},onDisable:function(){return Re(pe,be.eventTypes[0],Nf,!0)}})},sx=/(input|label|select|textarea)/i,Of,Nf=function(t){var e=sx.test(t.target.tagName);(e||Of)&&(t._gsapAllow=!0,Of=e)},ox=function(t){Or(t)||(t={}),t.preventDefault=t.isNormalizer=t.allowClicks=!0,t.type||(t.type="wheel,touch"),t.debounce=!!t.debounce,t.id=t.id||"normalizer";var e=t,n=e.normalizeScrollX,i=e.momentum,s=e.allowNestedScroll,o=e.onRelease,a,l,c=dn(t.target)||ei,u=It.core.globals().ScrollSmoother,h=u&&u.get(),f=sr&&(t.content&&dn(t.content)||h&&t.content!==!1&&!h.smooth()&&h.content()),d=Sr(c,Le),g=Sr(c,on),p=1,m=(be.isTouch&&te.visualViewport?te.visualViewport.scale*te.visualViewport.width:te.outerWidth)/te.innerWidth,_=0,M=an(i)?function(){return i(a)}:function(){return i||2.8},b,x,v=jm(c,t.type,!0,s),E=function(){return x=!1},C=di,y=di,w=function(){l=_i(c,Le),y=zo(sr?1:0,l),n&&(C=zo(0,_i(c,on))),b=Jr},D=function(){f._gsap.y=Eo(parseFloat(f._gsap.y)+d.offset)+"px",f.style.transform="matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, "+parseFloat(f._gsap.y)+", 0, 1)",d.offset=d.cacheID=0},B=function(){if(x){requestAnimationFrame(E);var G=Eo(a.deltaY/2),q=y(d.v-G);if(f&&q!==d.v+d.offset){d.offset=q-d.v;var P=Eo((parseFloat(f&&f._gsap.y)||0)-d.offset);f.style.transform="matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, "+P+", 0, 1)",f._gsap.y=P+"px",d.cacheID=Kt.cache,Wi()}return!0}d.offset&&D(),x=!0},k,Z,V,$,Y=function(){w(),k.isActive()&&k.vars.scrollY>l&&(d()>l?k.progress(1)&&d(l):k.resetTo("scrollY",l))};return f&&It.set(f,{y:"+=0"}),t.ignoreCheck=function(H){return sr&&H.type==="touchmove"&&B()||p>1.05&&H.type!=="touchstart"||a.isGesturing||H.touches&&H.touches.length>1},t.onPress=function(){x=!1;var H=p;p=Eo((te.visualViewport&&te.visualViewport.scale||1)/m),k.pause(),H!==p&&bc(c,p>1.01?!0:n?!1:"x"),Z=g(),V=d(),w(),b=Jr},t.onRelease=t.onGestureStart=function(H,G){if(d.offset&&D(),!G)$.restart(!0);else{Kt.cache++;var q=M(),P,nt;n&&(P=g(),nt=P+q*.05*-H.velocityX/.227,q*=If(g,P,nt,_i(c,on)),k.vars.scrollX=C(nt)),P=d(),nt=P+q*.05*-H.velocityY/.227,q*=If(d,P,nt,_i(c,Le)),k.vars.scrollY=y(nt),k.invalidate().duration(q).play(.01),(sr&&k.vars.scrollY>=l||P>=l-1)&&It.to({},{onUpdate:Y,duration:q})}o&&o(H)},t.onWheel=function(){k._ts&&k.pause(),We()-_>1e3&&(b=0,_=We())},t.onChange=function(H,G,q,P,nt){if(Jr!==b&&w(),G&&n&&g(C(P[2]===G?Z+(H.startX-H.x):g()+G-P[1])),q){d.offset&&D();var A=nt[2]===q,O=A?V+H.startY-H.y:d()+q-nt[1],T=y(O);A&&O!==T&&(V+=T-O),d(T)}(q||G)&&Wi()},t.onEnable=function(){bc(c,n?!1:"x"),ne.addEventListener("refresh",Y),Ie(te,"resize",Y),d.smooth&&(d.target.style.scrollBehavior="auto",d.smooth=g.smooth=!1),v.enable()},t.onDisable=function(){bc(c,!0),Re(te,"resize",Y),ne.removeEventListener("refresh",Y),v.kill()},t.lockAxis=t.lockAxis!==!1,a=new be(t),a.iOS=sr,sr&&!d()&&d(1),sr&&It.ticker.add(di),$=a._dc,k=It.to(a,{ease:"power4",paused:!0,inherit:!1,scrollX:n?"+=0.1":"+=0",scrollY:"+=0.1",modifiers:{scrollY:$m(d,d(),function(){return k.pause()})},onUpdate:Wi,onComplete:$.vars.onComplete}),a};ne.sort=function(r){return Zt.sort(r||function(t,e){return(t.vars.refreshPriority||0)*-1e6+t.start-(e.start+(e.vars.refreshPriority||0)*-1e6)})};ne.observe=function(r){return new be(r)};ne.normalizeScroll=function(r){if(typeof r>"u")return en;if(r===!0&&en)return en.enable();if(r===!1){en&&en.kill(),en=r;return}var t=r instanceof be?r:ox(r);return en&&en.target===t.target&&en.kill(),is(t.target)&&(en=t),t};ne.core={_getVelocityProp:Au,_inputObserver:jm,_scrollers:Kt,_proxies:Mi,bridge:{ss:function(){Wn||ss("scrollStart"),Wn=We()},ref:function(){return Ge}}};km()&&It.registerPlugin(ne);/*!
 * OverlayScrollbars
 * Version: 2.10.1
 *
 * Copyright (c) Rene Haas | KingSora.
 * https://github.com/KingSora
 *
 * Released under the MIT license.
 */const Tn=(r,t)=>{const{o:e,i:n,u:i}=r;let s=e,o;const a=(u,h)=>{const f=s,d=u,g=h||(n?!n(f,d):f!==d);return(g||i)&&(s=d,o=f),[s,g,o]};return[t?u=>a(t(s,o),u):a,u=>[s,!!u,o]]},ax=typeof window<"u"&&typeof HTMLElement<"u"&&!!window.document,mn=ax?window:{},Dl=Math.max,lx=Math.min,Fu=Math.round,Rl=Math.abs,Ff=Math.sign,Rh=mn.cancelAnimationFrame,Xl=mn.requestAnimationFrame,Il=mn.setTimeout,zu=mn.clearTimeout,ql=r=>typeof mn[r]<"u"?mn[r]:void 0,cx=ql("MutationObserver"),zf=ql("IntersectionObserver"),Ol=ql("ResizeObserver"),fl=ql("ScrollTimeline"),Ih=r=>r===void 0,Yl=r=>r===null,Si=r=>typeof r=="number",ua=r=>typeof r=="string",Oh=r=>typeof r=="boolean",Nn=r=>typeof r=="function",Ei=r=>Array.isArray(r),Nl=r=>typeof r=="object"&&!Ei(r)&&!Yl(r),Nh=r=>{const t=!!r&&r.length,e=Si(t)&&t>-1&&t%1==0;return Ei(r)||!Nn(r)&&e?t>0&&Nl(r)?t-1 in r:!0:!1},Fl=r=>!!r&&r.constructor===Object,zl=r=>r instanceof HTMLElement,$l=r=>r instanceof Element,kf=()=>performance.now(),wc=(r,t,e,n,i)=>{let s=0;const o=kf(),a=Dl(0,e),l=c=>{const u=kf(),f=u-o>=a,d=c?1:1-(Dl(0,o+a-u)/a||0),g=(t-r)*(Nn(i)?i(d,d*a,0,1,a):d)+r,p=f||d===1;n&&n(g,d,p),s=p?0:Xl(()=>l())};return l(),c=>{Rh(s),c&&l(c)}};function oe(r,t){if(Nh(r))for(let e=0;e<r.length&&t(r[e],e,r)!==!1;e++);else r&&oe(Object.keys(r),e=>t(r[e],e,r));return r}const Zm=(r,t)=>r.indexOf(t)>=0,ta=(r,t)=>r.concat(t),xe=(r,t,e)=>(!ua(t)&&Nh(t)?Array.prototype.push.apply(r,t):r.push(t),r),Tr=r=>Array.from(r||[]),Fh=r=>Ei(r)?r:!ua(r)&&Nh(r)?Tr(r):[r],ku=r=>!!r&&!r.length,Uu=r=>Tr(new Set(r)),In=(r,t,e)=>{oe(r,i=>i?i.apply(void 0,t||[]):!0),!e&&(r.length=0)},Jm="paddingTop",Km="paddingRight",Qm="paddingLeft",tg="paddingBottom",eg="marginLeft",ng="marginRight",ig="marginBottom",rg="overflowX",sg="overflowY",jl="width",Zl="height",or="visible",Br="hidden",no="scroll",ux=r=>{const t=String(r||"");return t?t[0].toUpperCase()+t.slice(1):""},Jl=(r,t,e,n)=>{if(r&&t){let i=!0;return oe(e,s=>{const o=r[s],a=t[s];o!==a&&(i=!1)}),i}return!1},og=(r,t)=>Jl(r,t,["w","h"]),dl=(r,t)=>Jl(r,t,["x","y"]),hx=(r,t)=>Jl(r,t,["t","r","b","l"]),gr=()=>{},Vt=(r,...t)=>r.bind(0,...t),Vr=r=>{let t;const e=r?Il:Xl,n=r?zu:Rh;return[i=>{n(t),t=e(()=>i(),Nn(r)?r():r)},()=>n(t)]},Bu=(r,t)=>{const{_:e,p:n,v:i,S:s}=t||{};let o,a,l,c,u=gr;const h=function(m){u(),zu(o),c=o=a=void 0,u=gr,r.apply(this,m)},f=p=>s&&a?s(a,p):p,d=()=>{u!==gr&&h(f(l)||l)},g=function(){const m=Tr(arguments),_=Nn(e)?e():e;if(Si(_)&&_>=0){const b=Nn(n)?n():n,x=Si(b)&&b>=0,v=_>0?Il:Xl,E=_>0?zu:Rh,y=f(m)||m,w=h.bind(0,y);let D;u(),i&&!c?(w(),c=!0,D=v(()=>c=void 0,_)):(D=v(w,_),x&&!o&&(o=Il(d,b))),u=()=>E(D),a=l=y}else h(m)};return g.m=d,g},ag=(r,t)=>Object.prototype.hasOwnProperty.call(r,t),oi=r=>r?Object.keys(r):[],ie=(r,t,e,n,i,s,o)=>{const a=[t,e,n,i,s,o];return(typeof r!="object"||Yl(r))&&!Nn(r)&&(r={}),oe(a,l=>{oe(l,(c,u)=>{const h=l[u];if(r===h)return!0;const f=Ei(h);if(h&&Fl(h)){const d=r[u];let g=d;f&&!Ei(d)?g=[]:!f&&!Fl(d)&&(g={}),r[u]=ie(g,h)}else r[u]=f?h.slice():h})}),r},lg=(r,t)=>oe(ie({},r),(e,n,i)=>{e===void 0?delete i[n]:e&&Fl(e)&&(i[n]=lg(e))}),zh=r=>!oi(r).length,cg=(r,t,e)=>Dl(r,lx(t,e)),Kr=r=>Uu((Ei(r)?r:(r||"").split(" ")).filter(t=>t)),kh=(r,t)=>r&&r.getAttribute(t),Uf=(r,t)=>r&&r.hasAttribute(t),zi=(r,t,e)=>{oe(Kr(t),n=>{r&&r.setAttribute(n,String(e||""))})},hi=(r,t)=>{oe(Kr(t),e=>r&&r.removeAttribute(e))},Kl=(r,t)=>{const e=Kr(kh(r,t)),n=Vt(zi,r,t),i=(s,o)=>{const a=new Set(e);return oe(Kr(s),l=>{a[o](l)}),Tr(a).join(" ")};return{O:s=>n(i(s,"delete")),$:s=>n(i(s,"add")),C:s=>{const o=Kr(s);return o.reduce((a,l)=>a&&e.includes(l),o.length>0)}}},ug=(r,t,e)=>(Kl(r,t).O(e),Vt(Uh,r,t,e)),Uh=(r,t,e)=>(Kl(r,t).$(e),Vt(ug,r,t,e)),kl=(r,t,e,n)=>(n?Uh:ug)(r,t,e),Bh=(r,t,e)=>Kl(r,t).C(e),hg=r=>Kl(r,"class"),fg=(r,t)=>{hg(r).O(t)},Vh=(r,t)=>(hg(r).$(t),Vt(fg,r,t)),dg=(r,t)=>{const e=t?$l(t)&&t:document;return e?Tr(e.querySelectorAll(r)):[]},fx=(r,t)=>{const e=t?$l(t)&&t:document;return e&&e.querySelector(r)},Vu=(r,t)=>$l(r)&&r.matches(t),pg=r=>Vu(r,"body"),Gu=r=>r?Tr(r.childNodes):[],ea=r=>r&&r.parentElement,Fs=(r,t)=>$l(r)&&r.closest(t),Hu=r=>document.activeElement,dx=(r,t,e)=>{const n=Fs(r,t),i=r&&fx(e,n),s=Fs(i,t)===n;return n&&i?n===r||i===r||s&&Fs(Fs(r,e),t)!==n:!1},io=r=>{oe(Fh(r),t=>{const e=ea(t);t&&e&&e.removeChild(t)})},Pn=(r,t)=>Vt(io,r&&t&&oe(Fh(t),e=>{e&&r.appendChild(e)})),Xs=r=>{const t=document.createElement("div");return zi(t,"class",r),t},mg=r=>{const t=Xs();return t.innerHTML=r.trim(),oe(Gu(t),e=>io(e))},Bf=(r,t)=>r.getPropertyValue(t)||r[t]||"",gg=r=>{const t=r||0;return isFinite(t)?t:0},Pa=r=>gg(parseFloat(r||"")),Wu=r=>Math.round(r*1e4)/1e4,_g=r=>`${Wu(gg(r))}px`;function na(r,t){r&&t&&oe(t,(e,n)=>{try{const i=r.style,s=Yl(e)||Oh(e)?"":Si(e)?_g(e):e;n.indexOf("--")===0?i.setProperty(n,s):i[n]=s}catch{}})}function $i(r,t,e){const n=ua(t);let i=n?"":{};if(r){const s=mn.getComputedStyle(r,e)||r.style;i=n?Bf(s,t):Tr(t).reduce((o,a)=>(o[a]=Bf(s,a),o),i)}return i}const Vf=(r,t,e)=>{const n=t?`${t}-`:"",i=e?`-${e}`:"",s=`${n}top${i}`,o=`${n}right${i}`,a=`${n}bottom${i}`,l=`${n}left${i}`,c=$i(r,[s,o,a,l]);return{t:Pa(c[s]),r:Pa(c[o]),b:Pa(c[a]),l:Pa(c[l])}},px=(r,t)=>`translate${Nl(r)?`(${r.x},${r.y})`:`Y(${r})`}`,mx=r=>!!(r.offsetWidth||r.offsetHeight||r.getClientRects().length),gx={w:0,h:0},Ql=(r,t)=>t?{w:t[`${r}Width`],h:t[`${r}Height`]}:gx,_x=r=>Ql("inner",r||mn),qs=Vt(Ql,"offset"),xg=Vt(Ql,"client"),Ul=Vt(Ql,"scroll"),Gh=r=>{const t=parseFloat($i(r,jl))||0,e=parseFloat($i(r,Zl))||0;return{w:t-Fu(t),h:e-Fu(e)}},Tc=r=>r.getBoundingClientRect(),xx=r=>!!r&&mx(r),Xu=r=>!!(r&&(r[Zl]||r[jl])),vg=(r,t)=>{const e=Xu(r);return!Xu(t)&&e},Gf=(r,t,e,n)=>{oe(Kr(t),i=>{r&&r.removeEventListener(i,e,n)})},he=(r,t,e,n)=>{var i;const s=(i=n&&n.H)!=null?i:!0,o=n&&n.I||!1,a=n&&n.A||!1,l={passive:s,capture:o};return Vt(In,Kr(t).map(c=>{const u=a?h=>{Gf(r,c,u,o),e&&e(h)}:e;return r&&r.addEventListener(c,u,l),Vt(Gf,r,c,u,o)}))},yg=r=>r.stopPropagation(),qu=r=>r.preventDefault(),Mg=r=>yg(r)||qu(r),xi=(r,t)=>{const{x:e,y:n}=Si(t)?{x:t,y:t}:t||{};Si(e)&&(r.scrollLeft=e),Si(n)&&(r.scrollTop=n)},Ln=r=>({x:r.scrollLeft,y:r.scrollTop}),Sg=()=>({D:{x:0,y:0},M:{x:0,y:0}}),vx=(r,t)=>{const{D:e,M:n}=r,{w:i,h:s}=t,o=(h,f,d)=>{let g=Ff(h)*d,p=Ff(f)*d;if(g===p){const m=Rl(h),_=Rl(f);p=m>_?0:p,g=m<_?0:g}return g=g===p?0:g,[g+0,p+0]},[a,l]=o(e.x,n.x,i),[c,u]=o(e.y,n.y,s);return{D:{x:a,y:c},M:{x:l,y:u}}},Hf=({D:r,M:t})=>{const e=(n,i)=>n===0&&n<=i;return{x:e(r.x,t.x),y:e(r.y,t.y)}},Wf=({D:r,M:t},e)=>{const n=(i,s,o)=>cg(0,1,(i-o)/(i-s)||0);return{x:n(r.x,t.x,e.x),y:n(r.y,t.y,e.y)}},Yu=r=>{r&&r.focus&&r.focus({preventScroll:!0})},Xf=(r,t)=>{oe(Fh(t),r)},$u=r=>{const t=new Map,e=(s,o)=>{if(s){const a=t.get(s);Xf(l=>{a&&a[l?"delete":"clear"](l)},o)}else t.forEach(a=>{a.clear()}),t.clear()},n=(s,o)=>{if(ua(s)){const c=t.get(s)||new Set;return t.set(s,c),Xf(u=>{Nn(u)&&c.add(u)},o),Vt(e,s,o)}Oh(o)&&o&&e();const a=oi(s),l=[];return oe(a,c=>{const u=s[c];u&&xe(l,n(c,u))}),Vt(In,l)},i=(s,o)=>{oe(Tr(t.get(s)),a=>{o&&!ku(o)?a.apply(0,o):a()})};return n(r||{}),[n,e,i]},bg={},wg={},yx=r=>{oe(r,t=>oe(t,(e,n)=>{bg[n]=t[n]}))},Tg=(r,t,e)=>oi(r).map(n=>{const{static:i,instance:s}=r[n],[o,a,l]=e||[],c=e?s:i;if(c){const u=e?c(o,a,t):c(t);return(l||wg)[n]=u}}),ha=r=>wg[r],Mx="__osOptionsValidationPlugin",ho="data-overlayscrollbars",pl="os-environment",La=`${pl}-scrollbar-hidden`,Ec=`${ho}-initialize`,ml="noClipping",qf=`${ho}-body`,_r=ho,Sx="host",ki=`${ho}-viewport`,bx=rg,wx=sg,Tx="arrange",Eg="measuring",Ex="scrolling",Cg="scrollbarHidden",Cx="noContent",ju=`${ho}-padding`,Yf=`${ho}-content`,Hh="os-size-observer",Ax=`${Hh}-appear`,Px=`${Hh}-listener`,Lx="os-trinsic-observer",Dx="os-theme-none",Fn="os-scrollbar",Rx=`${Fn}-rtl`,Ix=`${Fn}-horizontal`,Ox=`${Fn}-vertical`,Ag=`${Fn}-track`,Wh=`${Fn}-handle`,Nx=`${Fn}-visible`,Fx=`${Fn}-cornerless`,$f=`${Fn}-interaction`,jf=`${Fn}-unusable`,Zu=`${Fn}-auto-hide`,Zf=`${Zu}-hidden`,Jf=`${Fn}-wheel`,zx=`${Ag}-interactive`,kx=`${Wh}-interactive`,Ux="__osSizeObserverPlugin",Bx=(r,t)=>{const{T:e}=t,[n,i]=r("showNativeOverlaidScrollbars");return[n&&e.x&&e.y,i]},ro=r=>r.indexOf(or)===0,Vx=(r,t)=>{const e=(i,s,o,a)=>{const l=i===or?Br:i.replace(`${or}-`,""),c=ro(i),u=ro(o);return!s&&!a?Br:c&&u?or:c?s&&a?l:s?or:Br:s?l:u&&a?or:Br},n={x:e(t.x,r.x,t.y,r.y),y:e(t.y,r.y,t.x,r.x)};return{k:n,R:{x:n.x===no,y:n.y===no}}},Pg="__osScrollbarsHidingPlugin",Lg="__osClickScrollPlugin",Z1={[Lg]:{static:()=>(r,t,e,n)=>{let i=!1,s=gr;const o=133,a=222,[l,c]=Vr(o),u=Math.sign(t),h=e*u,f=h/2,d=_=>1-(1-_)*(1-_),g=(_,M)=>wc(_,M,a,r,d),p=(_,M)=>wc(_,t-h,o*M,(b,x,v)=>{r(b),v&&(s=g(b,t))}),m=wc(0,h,a,(_,M,b)=>{if(r(_),b&&(n(i),!i)){const x=t-_;Math.sign(x-f)===u&&l(()=>{const E=x-h;s=Math.sign(E)===u?p(_,Math.abs(E)/e):g(_,t)})}},d);return _=>{i=!0,_&&m(),c(),s()}}}},Kf=r=>JSON.stringify(r,(t,e)=>{if(Nn(e))throw 0;return e}),Qf=(r,t)=>r?`${t}`.split(".").reduce((e,n)=>e&&ag(e,n)?e[n]:void 0,r):void 0,Gx={paddingAbsolute:!1,showNativeOverlaidScrollbars:!1,update:{elementEvents:[["img","load"]],debounce:[0,33],attributes:null,ignoreMutation:null},overflow:{x:"scroll",y:"scroll"},scrollbars:{theme:"os-theme-dark",visibility:"auto",autoHide:"never",autoHideDelay:1300,autoHideSuspend:!1,dragScroll:!0,clickScroll:!1,pointers:["mouse","touch","pen"]}},Dg=(r,t)=>{const e={},n=ta(oi(t),oi(r));return oe(n,i=>{const s=r[i],o=t[i];if(Nl(s)&&Nl(o))ie(e[i]={},Dg(s,o)),zh(e[i])&&delete e[i];else if(ag(t,i)&&o!==s){let a=!0;if(Ei(s)||Ei(o))try{Kf(s)===Kf(o)&&(a=!1)}catch{}a&&(e[i]=o)}}),e},td=(r,t,e)=>n=>[Qf(r,n),e||Qf(t,n)!==void 0];let Rg;const Hx=()=>Rg,Wx=r=>{Rg=r};let Cc;const Xx=()=>{const r=(x,v,E)=>{Pn(document.body,x),Pn(document.body,x);const C=xg(x),y=qs(x),w=Gh(v);return E&&io(x),{x:y.h-C.h+w.h,y:y.w-C.w+w.w}},t=x=>{let v=!1;const E=Vh(x,La);try{v=$i(x,"scrollbar-width")==="none"||$i(x,"display","::-webkit-scrollbar")==="none"}catch{}return E(),v},e=`.${pl}{scroll-behavior:auto!important;position:fixed;opacity:0;visibility:hidden;overflow:scroll;height:200px;width:200px;z-index:-1}.${pl} div{width:200%;height:200%;margin:10px 0}.${La}{scrollbar-width:none!important}.${La}::-webkit-scrollbar,.${La}::-webkit-scrollbar-corner{appearance:none!important;display:none!important;width:0!important;height:0!important}`,i=mg(`<div class="${pl}"><div></div><style>${e}</style></div>`)[0],s=i.firstChild,o=i.lastChild,a=Hx();a&&(o.nonce=a);const[l,,c]=$u(),[u,h]=Tn({o:r(i,s),i:dl},Vt(r,i,s,!0)),[f]=h(),d=t(i),g={x:f.x===0,y:f.y===0},p={elements:{host:null,padding:!d,viewport:x=>d&&pg(x)&&x,content:!1},scrollbars:{slot:!0},cancel:{nativeScrollbarsOverlaid:!1,body:null}},m=ie({},Gx),_=Vt(ie,{},m),M=Vt(ie,{},p),b={N:f,T:g,P:d,G:!!fl,K:Vt(l,"r"),Z:M,tt:x=>ie(p,x)&&M(),nt:_,ot:x=>ie(m,x)&&_(),st:ie({},p),et:ie({},m)};if(hi(i,"style"),io(i),he(mn,"resize",()=>{c("r",[])}),Nn(mn.matchMedia)&&!d&&(!g.x||!g.y)){const x=v=>{const E=mn.matchMedia(`(resolution: ${mn.devicePixelRatio}dppx)`);he(E,"change",()=>{v(),x(v)},{A:!0})};x(()=>{const[v,E]=u();ie(b.N,v),c("r",[E])})}return b},Ci=()=>(Cc||(Cc=Xx()),Cc),qx=(r,t,e)=>{let n=!1;const i=e?new WeakMap:!1,s=()=>{n=!0},o=a=>{if(i&&e){const l=e.map(c=>{const[u,h]=c||[];return[h&&u?(a||dg)(u,r):[],h]});oe(l,c=>oe(c[0],u=>{const h=c[1],f=i.get(u)||[];if(r.contains(u)&&h){const g=he(u,h,p=>{n?(g(),i.delete(u)):t(p)});i.set(u,xe(f,g))}else In(f),i.delete(u)}))}};return o(),[s,o]},ed=(r,t,e,n)=>{let i=!1;const{ct:s,rt:o,lt:a,it:l,ut:c,_t:u}=n||{},h=Bu(()=>i&&e(!0),{_:33,p:99}),[f,d]=qx(r,h,a),g=s||[],p=o||[],m=ta(g,p),_=(b,x)=>{if(!ku(x)){const v=c||gr,E=u||gr,C=[],y=[];let w=!1,D=!1;if(oe(x,B=>{const{attributeName:k,target:Z,type:V,oldValue:$,addedNodes:Y,removedNodes:H}=B,G=V==="attributes",q=V==="childList",P=r===Z,nt=G&&k,A=nt&&kh(Z,k||""),O=ua(A)?A:null,T=nt&&$!==O,I=Zm(p,k)&&T;if(t&&(q||!P)){const z=G&&T,U=z&&l&&Vu(Z,l),rt=(U?!v(Z,k,$,O):!G||z)&&!E(B,!!U,r,n);oe(Y,tt=>xe(C,tt)),oe(H,tt=>xe(C,tt)),D=D||rt}!t&&P&&T&&!v(Z,k,$,O)&&(xe(y,k),w=w||I)}),d(B=>Uu(C).reduce((k,Z)=>(xe(k,dg(B,Z)),Vu(Z,B)?xe(k,Z):k),[])),t)return!b&&D&&e(!1),[!1];if(!ku(y)||w){const B=[Uu(y),w];return!b&&e.apply(0,B),B}}},M=new cx(Vt(_,!1));return[()=>(M.observe(r,{attributes:!0,attributeOldValue:!0,attributeFilter:m,subtree:t,childList:t,characterData:t}),i=!0,()=>{i&&(f(),M.disconnect(),i=!1)}),()=>{if(i)return h.m(),_(!0,M.takeRecords())}]},Ig=(r,t,e)=>{const{dt:n}=e||{},i=ha(Ux),[s]=Tn({o:!1,u:!0});return()=>{const o=[],l=mg(`<div class="${Hh}"><div class="${Px}"></div></div>`)[0],c=l.firstChild,u=h=>{const f=h instanceof ResizeObserverEntry;let d=!1,g=!1;if(f){const[p,,m]=s(h.contentRect),_=Xu(p);g=vg(p,m),d=!g&&!_}else g=h===!0;d||t({ft:!0,dt:g})};if(Ol){const h=new Ol(f=>u(f.pop()));h.observe(c),xe(o,()=>{h.disconnect()})}else if(i){const[h,f]=i(c,u,n);xe(o,ta([Vh(l,Ax),he(l,"animationstart",h)],f))}else return gr;return Vt(In,xe(o,Pn(r,l)))}},Yx=(r,t)=>{let e;const n=l=>l.h===0||l.isIntersecting||l.intersectionRatio>0,i=Xs(Lx),[s]=Tn({o:!1}),o=(l,c)=>{if(l){const u=s(n(l)),[,h]=u;return h&&!c&&t(u)&&[u]}},a=(l,c)=>o(c.pop(),l);return[()=>{const l=[];if(zf)e=new zf(Vt(a,!1),{root:r}),e.observe(i),xe(l,()=>{e.disconnect()});else{const c=()=>{const u=qs(i);o(u)};xe(l,Ig(i,c)()),c()}return Vt(In,xe(l,Pn(r,i)))},()=>e&&a(!0,e.takeRecords())]},$x=(r,t,e,n)=>{let i,s,o,a,l,c;const u=`[${_r}]`,h=`[${ki}]`,f=["id","class","style","open","wrap","cols","rows"],{vt:d,ht:g,U:p,gt:m,bt:_,L:M,wt:b,yt:x,St:v,Ot:E}=r,C=I=>$i(I,"direction")==="rtl",y={$t:!1,F:C(d)},w=Ci(),D=ha(Pg),[B]=Tn({i:og,o:{w:0,h:0}},()=>{const I=D&&D.V(r,t,y,w,e).X,U=!(b&&M)&&Bh(g,_r,ml),j=!M&&x(Tx),rt=j&&Ln(m),tt=rt&&E(),ut=v(Eg,U),ot=j&&I&&I()[0],at=Ul(p),it=Gh(p);return ot&&ot(),xi(m,rt),tt&&tt(),U&&ut(),{w:at.w+it.w,h:at.h+it.h}}),k=Bu(n,{_:()=>i,p:()=>s,S(I,z){const[U]=I,[j]=z;return[ta(oi(U),oi(j)).reduce((rt,tt)=>(rt[tt]=U[tt]||j[tt],rt),{})]}}),Z=I=>{const z=C(d);ie(I,{Ct:c!==z}),ie(y,{F:z}),c=z},V=(I,z)=>{const[U,j]=I,rt={xt:j};return ie(y,{$t:U}),!z&&n(rt),rt},$=({ft:I,dt:z})=>{const j=!(I&&!z)&&w.P?k:n,rt={ft:I||z,dt:z};Z(rt),j(rt)},Y=(I,z)=>{const[,U]=B(),j={Ht:U};return Z(j),U&&!z&&(I?n:k)(j),j},H=(I,z,U)=>{const j={Et:z};return Z(j),z&&!U&&k(j),j},[G,q]=_?Yx(g,V):[],P=!M&&Ig(g,$,{dt:!0}),[nt,A]=ed(g,!1,H,{rt:f,ct:f}),O=M&&Ol&&new Ol(I=>{const z=I[I.length-1].contentRect;$({ft:!0,dt:vg(z,l)}),l=z}),T=Bu(()=>{const[,I]=B();n({Ht:I})},{_:222,v:!0});return[()=>{O&&O.observe(g);const I=P&&P(),z=G&&G(),U=nt(),j=w.K(rt=>{rt?k({zt:rt}):T()});return()=>{O&&O.disconnect(),I&&I(),z&&z(),a&&a(),U(),j()}},({It:I,At:z,Dt:U})=>{const j={},[rt]=I("update.ignoreMutation"),[tt,ut]=I("update.attributes"),[ot,at]=I("update.elementEvents"),[it,dt]=I("update.debounce"),W=at||ut,S=z||U,pt=yt=>Nn(rt)&&rt(yt);if(W){o&&o(),a&&a();const[yt,Lt]=ed(_||p,!0,Y,{ct:ta(f,tt||[]),lt:ot,it:u,_t:(Et,F)=>{const{target:L,attributeName:st}=Et;return(!F&&st&&!M?dx(L,u,h):!1)||!!Fs(L,`.${Fn}`)||!!pt(Et)}});a=yt(),o=Lt}if(dt)if(k.m(),Ei(it)){const yt=it[0],Lt=it[1];i=Si(yt)&&yt,s=Si(Lt)&&Lt}else Si(it)?(i=it,s=!1):(i=!1,s=!1);if(S){const yt=A(),Lt=q&&q(),Et=o&&o();yt&&ie(j,H(yt[0],yt[1],S)),Lt&&ie(j,V(Lt[0],S)),Et&&ie(j,Y(Et[0],S))}return Z(j),j},y]},Og=(r,t)=>Nn(t)?t.apply(0,r):t,jx=(r,t,e,n)=>{const i=Ih(n)?e:n;return Og(r,i)||t.apply(0,r)},Ng=(r,t,e,n)=>{const i=Ih(n)?e:n,s=Og(r,i);return!!s&&(zl(s)?s:t.apply(0,r))},Zx=(r,t)=>{const{nativeScrollbarsOverlaid:e,body:n}=t||{},{T:i,P:s,Z:o}=Ci(),{nativeScrollbarsOverlaid:a,body:l}=o().cancel,c=e??a,u=Ih(n)?l:n,h=(i.x||i.y)&&c,f=r&&(Yl(u)?!s:u);return!!h||!!f},Jx=(r,t,e,n)=>{const i="--os-viewport-percent",s="--os-scroll-percent",o="--os-scroll-direction",{Z:a}=Ci(),{scrollbars:l}=a(),{slot:c}=l,{vt:u,ht:h,U:f,Mt:d,gt:g,wt:p,L:m}=t,{scrollbars:_}=d?{}:r,{slot:M}=_||{},b=[],x=[],v=[],E=Ng([u,h,f],()=>m&&p?u:h,c,M),C=nt=>{if(fl){const A=new fl({source:g,axis:nt});return{kt:T=>{const I=T.Tt.animate({clear:["left"],[s]:[0,1]},{timeline:A});return()=>I.cancel()}}}},y={x:C("x"),y:C("y")},w=()=>{const{Rt:nt,Vt:A}=e,O=(T,I)=>cg(0,1,T/(T+I)||0);return{x:O(A.x,nt.x),y:O(A.y,nt.y)}},D=(nt,A,O)=>{const T=O?Vh:fg;oe(nt,I=>{T(I.Tt,A)})},B=(nt,A)=>{oe(nt,O=>{const[T,I]=A(O);na(T,I)})},k=(nt,A,O)=>{const T=Oh(O),I=T?O:!0,z=T?!O:!0;I&&D(x,nt,A),z&&D(v,nt,A)},Z=()=>{const nt=w(),A=O=>T=>[T.Tt,{[i]:Wu(O)+""}];B(x,A(nt.x)),B(v,A(nt.y))},V=()=>{if(!fl){const{Lt:nt}=e,A=Wf(nt,Ln(g)),O=T=>I=>[I.Tt,{[s]:Wu(T)+""}];B(x,O(A.x)),B(v,O(A.y))}},$=()=>{const{Lt:nt}=e,A=Hf(nt),O=T=>I=>[I.Tt,{[o]:T?"0":"1"}];B(x,O(A.x)),B(v,O(A.y))},Y=()=>{if(m&&!p){const{Rt:nt,Lt:A}=e,O=Hf(A),T=Wf(A,Ln(g)),I=z=>{const{Tt:U}=z,j=ea(U)===f&&U,rt=(tt,ut,ot)=>{const at=ut*tt;return _g(ot?at:-at)};return[j,j&&{transform:px({x:rt(T.x,nt.x,O.x),y:rt(T.y,nt.y,O.y)})}]};B(x,I),B(v,I)}},H=nt=>{const A=nt?"x":"y",T=Xs(`${Fn} ${nt?Ix:Ox}`),I=Xs(Ag),z=Xs(Wh),U={Tt:T,Ut:I,Pt:z},j=y[A];return xe(nt?x:v,U),xe(b,[Pn(T,I),Pn(I,z),Vt(io,T),j&&j.kt(U),n(U,k,nt)]),U},G=Vt(H,!0),q=Vt(H,!1),P=()=>(Pn(E,x[0].Tt),Pn(E,v[0].Tt),Vt(In,b));return G(),q(),[{Nt:Z,qt:V,Bt:$,Ft:Y,jt:k,Yt:{Wt:x,Xt:G,Jt:Vt(B,x)},Gt:{Wt:v,Xt:q,Jt:Vt(B,v)}},P]},Kx=(r,t,e,n)=>(i,s,o)=>{const{ht:a,U:l,L:c,gt:u,Kt:h,Ot:f}=t,{Tt:d,Ut:g,Pt:p}=i,[m,_]=Vr(333),[M,b]=Vr(444),x=C=>{Nn(u.scrollBy)&&u.scrollBy({behavior:"smooth",left:C.x,top:C.y})},v=()=>{const C="pointerup pointercancel lostpointercapture",y=`client${o?"X":"Y"}`,w=o?jl:Zl,D=o?"left":"top",B=o?"w":"h",k=o?"x":"y",Z=($,Y)=>H=>{const{Rt:G}=e,q=qs(g)[B]-qs(p)[B],nt=Y*H/q*G[k];xi(u,{[k]:$+nt})},V=[];return he(g,"pointerdown",$=>{const Y=Fs($.target,`.${Wh}`)===p,H=Y?p:g,G=r.scrollbars,q=G[Y?"dragScroll":"clickScroll"],{button:P,isPrimary:nt,pointerType:A}=$,{pointers:O}=G;if(P===0&&nt&&q&&(O||[]).includes(A)){In(V),b();const I=!Y&&($.shiftKey||q==="instant"),z=Vt(Tc,p),U=Vt(Tc,g),j=(F,L)=>(F||z())[D]-(L||U())[D],rt=Fu(Tc(u)[w])/qs(u)[B]||1,tt=Z(Ln(u)[k],1/rt),ut=$[y],ot=z(),at=U(),it=ot[w],dt=j(ot,at)+it/2,W=ut-at[D],S=Y?0:W-dt,pt=F=>{In(Et),H.releasePointerCapture(F.pointerId)},yt=Y||I,Lt=f(),Et=[he(h,C,pt),he(h,"selectstart",F=>qu(F),{H:!1}),he(g,C,pt),yt&&he(g,"pointermove",F=>tt(S+(F[y]-ut))),yt&&(()=>{const F=Ln(u);Lt();const L=Ln(u),st={x:L.x-F.x,y:L.y-F.y};(Rl(st.x)>3||Rl(st.y)>3)&&(f(),xi(u,F),x(st),M(Lt))})];if(H.setPointerCapture($.pointerId),I)tt(S);else if(!Y){const F=ha(Lg);if(F){const L=F(tt,S,it,st=>{st?Lt():xe(Et,Lt)});xe(Et,L),xe(V,Vt(L,!0))}}}})};let E=!0;return Vt(In,[he(p,"pointermove pointerleave",n),he(d,"pointerenter",()=>{s($f,!0)}),he(d,"pointerleave pointercancel",()=>{s($f,!1)}),!c&&he(d,"mousedown",()=>{const C=Hu();(Uf(C,ki)||Uf(C,_r)||C===document.body)&&Il(Vt(Yu,l),25)}),he(d,"wheel",C=>{const{deltaX:y,deltaY:w,deltaMode:D}=C;E&&D===0&&ea(d)===a&&x({x:y,y:w}),E=!1,s(Jf,!0),m(()=>{E=!0,s(Jf)}),qu(C)},{H:!1,I:!0}),he(d,"pointerdown",Vt(he,h,"click",Mg,{A:!0,I:!0,H:!1}),{I:!0}),v(),_,b])},Qx=(r,t,e,n,i,s)=>{let o,a,l,c,u,h=gr,f=0;const d=["mouse","pen"],g=A=>d.includes(A.pointerType),[p,m]=Vr(),[_,M]=Vr(100),[b,x]=Vr(100),[v,E]=Vr(()=>f),[C,y]=Jx(r,i,n,Kx(t,i,n,A=>g(A)&&G())),{ht:w,Qt:D,wt:B}=i,{jt:k,Nt:Z,qt:V,Bt:$,Ft:Y}=C,H=(A,O)=>{if(E(),A)k(Zf);else{const T=Vt(k,Zf,!0);f>0&&!O?v(T):T()}},G=()=>{(l?!o:!c)&&(H(!0),_(()=>{H(!1)}))},q=A=>{k(Zu,A,!0),k(Zu,A,!1)},P=A=>{g(A)&&(o=l,l&&H(!0))},nt=[E,M,x,m,()=>h(),he(w,"pointerover",P,{A:!0}),he(w,"pointerenter",P),he(w,"pointerleave",A=>{g(A)&&(o=!1,l&&H(!1))}),he(w,"pointermove",A=>{g(A)&&a&&G()}),he(D,"scroll",A=>{p(()=>{V(),G()}),s(A),Y()})];return[()=>Vt(In,xe(nt,y())),({It:A,Dt:O,Zt:T,tn:I})=>{const{nn:z,sn:U,en:j,cn:rt}=I||{},{Ct:tt,dt:ut}=T||{},{F:ot}=e,{T:at}=Ci(),{k:it,rn:dt}=n,[W,S]=A("showNativeOverlaidScrollbars"),[pt,yt]=A("scrollbars.theme"),[Lt,Et]=A("scrollbars.visibility"),[F,L]=A("scrollbars.autoHide"),[st,ht]=A("scrollbars.autoHideSuspend"),[xt]=A("scrollbars.autoHideDelay"),[_t,Ct]=A("scrollbars.dragScroll"),[N,ft]=A("scrollbars.clickScroll"),[St,mt]=A("overflow"),X=ut&&!O,gt=dt.x||dt.y,Mt=z||U||rt||tt||O,Ot=j||Et||mt,bt=W&&at.x&&at.y,Pt=(lt,Nt,Xt)=>{const Gt=lt.includes(no)&&(Lt===or||Lt==="auto"&&Nt===no);return k(Nx,Gt,Xt),Gt};if(f=xt,X&&(st&&gt?(q(!1),h(),b(()=>{h=he(D,"scroll",Vt(q,!0),{A:!0})})):q(!0)),S&&k(Dx,bt),yt&&(k(u),k(pt,!0),u=pt),ht&&!st&&q(!0),L&&(a=F==="move",l=F==="leave",c=F==="never",H(c,!0)),Ct&&k(kx,_t),ft&&k(zx,!!N),Ot){const lt=Pt(St.x,it.x,!0),Nt=Pt(St.y,it.y,!1);k(Fx,!(lt&&Nt))}Mt&&(V(),Z(),Y(),rt&&$(),k(jf,!dt.x,!0),k(jf,!dt.y,!1),k(Rx,ot&&!B))},{},C]},tv=r=>{const t=Ci(),{Z:e,P:n}=t,{elements:i}=e(),{padding:s,viewport:o,content:a}=i,l=zl(r),c=l?{}:r,{elements:u}=c,{padding:h,viewport:f,content:d}=u||{},g=l?r:c.target,p=pg(g),m=g.ownerDocument,_=m.documentElement,M=()=>m.defaultView||mn,b=Vt(jx,[g]),x=Vt(Ng,[g]),v=Vt(Xs,""),E=Vt(b,v,o),C=Vt(x,v,a),y=it=>{const dt=qs(it),W=Ul(it),S=$i(it,rg),pt=$i(it,sg);return W.w-dt.w>0&&!ro(S)||W.h-dt.h>0&&!ro(pt)},w=E(f),D=w===g,B=D&&p,k=!D&&C(d),Z=!D&&w===k,V=B?_:w,$=B?V:g,Y=!D&&x(v,s,h),H=!Z&&k,G=[H,V,Y,$].map(it=>zl(it)&&!ea(it)&&it),q=it=>it&&Zm(G,it),P=!q(V)&&y(V)?V:g,nt=B?_:V,O={vt:g,ht:$,U:V,ln:Y,bt:H,gt:nt,Qt:B?m:V,an:p?_:P,Kt:m,wt:p,Mt:l,L:D,un:M,yt:it=>Bh(V,ki,it),St:(it,dt)=>kl(V,ki,it,dt),Ot:()=>kl(nt,ki,Ex,!0)},{vt:T,ht:I,ln:z,U,bt:j}=O,rt=[()=>{hi(I,[_r,Ec]),hi(T,Ec),p&&hi(_,[Ec,_r])}];let tt=Gu([j,U,z,I,T].find(it=>it&&!q(it)));const ut=B?T:j||U,ot=Vt(In,rt);return[O,()=>{const it=M(),dt=Hu(),W=Et=>{Pn(ea(Et),Gu(Et)),io(Et)},S=Et=>he(Et,"focusin focusout focus blur",Mg,{I:!0,H:!1}),pt="tabindex",yt=kh(U,pt),Lt=S(dt);return zi(I,_r,D?"":Sx),zi(z,ju,""),zi(U,ki,""),zi(j,Yf,""),D||(zi(U,pt,yt||"-1"),p&&zi(_,qf,"")),Pn(ut,tt),Pn(I,z),Pn(z||I,!D&&U),Pn(U,j),xe(rt,[Lt,()=>{const Et=Hu(),F=q(U),L=F&&Et===U?T:Et,st=S(L);hi(z,ju),hi(j,Yf),hi(U,ki),p&&hi(_,qf),yt?zi(U,pt,yt):hi(U,pt),q(j)&&W(j),F&&W(U),q(z)&&W(z),Yu(L),st()}]),n&&!D&&(Uh(U,ki,Cg),xe(rt,Vt(hi,U,ki))),Yu(!D&&p&&dt===T&&it.top===it?U:dt),Lt(),tt=0,ot},ot]},ev=({bt:r})=>({Zt:t,_n:e,Dt:n})=>{const{xt:i}=t||{},{$t:s}=e;r&&(i||n)&&na(r,{[Zl]:s&&"100%"})},nv=({ht:r,ln:t,U:e,L:n},i)=>{const[s,o]=Tn({i:hx,o:Vf()},Vt(Vf,r,"padding",""));return({It:a,Zt:l,_n:c,Dt:u})=>{let[h,f]=o(u);const{P:d}=Ci(),{ft:g,Ht:p,Ct:m}=l||{},{F:_}=c,[M,b]=a("paddingAbsolute");(g||f||(u||p))&&([h,f]=s(u));const v=!n&&(b||m||f);if(v){const E=!M||!t&&!d,C=h.r+h.l,y=h.t+h.b,w={[ng]:E&&!_?-C:0,[ig]:E?-y:0,[eg]:E&&_?-C:0,top:E?-h.t:0,right:E?_?-h.r:"auto":0,left:E?_?"auto":-h.l:0,[jl]:E&&`calc(100% + ${C}px)`},D={[Jm]:E?h.t:0,[Km]:E?h.r:0,[tg]:E?h.b:0,[Qm]:E?h.l:0};na(t||e,w),na(e,D),ie(i,{ln:h,dn:!E,j:t?D:ie({},w,D)})}return{fn:v}}},iv=(r,t)=>{const e=Ci(),{ht:n,ln:i,U:s,L:o,Qt:a,gt:l,wt:c,St:u,un:h}=r,{P:f}=e,d=c&&o,g=Vt(Dl,0),p={display:()=>!1,direction:A=>A!=="ltr",flexDirection:A=>A.endsWith("-reverse"),writingMode:A=>A!=="horizontal-tb"},m=oi(p),_={i:og,o:{w:0,h:0}},M={i:dl,o:{}},b=A=>{u(Eg,!d&&A)},x=A=>{if(!m.some(ut=>{const ot=A[ut];return ot&&p[ut](ot)}))return{D:{x:0,y:0},M:{x:1,y:1}};b(!0);const T=Ln(l),I=u(Cx,!0),z=he(a,no,ut=>{const ot=Ln(l);ut.isTrusted&&ot.x===T.x&&ot.y===T.y&&yg(ut)},{I:!0,A:!0});xi(l,{x:0,y:0}),I();const U=Ln(l),j=Ul(l);xi(l,{x:j.w,y:j.h});const rt=Ln(l);xi(l,{x:rt.x-U.x<1&&-j.w,y:rt.y-U.y<1&&-j.h});const tt=Ln(l);return xi(l,T),Xl(()=>z()),{D:U,M:tt}},v=(A,O)=>{const T=mn.devicePixelRatio%1!==0?1:0,I={w:g(A.w-O.w),h:g(A.h-O.h)};return{w:I.w>T?I.w:0,h:I.h>T?I.h:0}},[E,C]=Tn(_,Vt(Gh,s)),[y,w]=Tn(_,Vt(Ul,s)),[D,B]=Tn(_),[k]=Tn(M),[Z,V]=Tn(_),[$]=Tn(M),[Y]=Tn({i:(A,O)=>Jl(A,O,m),o:{}},()=>xx(s)?$i(s,m):{}),[H,G]=Tn({i:(A,O)=>dl(A.D,O.D)&&dl(A.M,O.M),o:Sg()}),q=ha(Pg),P=(A,O)=>`${O?bx:wx}${ux(A)}`,nt=A=>{const O=I=>[or,Br,no].map(z=>P(z,I)),T=O(!0).concat(O()).join(" ");u(T),u(oi(A).map(I=>P(A[I],I==="x")).join(" "),!0)};return({It:A,Zt:O,_n:T,Dt:I},{fn:z})=>{const{ft:U,Ht:j,Ct:rt,dt:tt,zt:ut}=O||{},ot=q&&q.V(r,t,T,e,A),{W:at,X:it,J:dt}=ot||{},[W,S]=Bx(A,e),[pt,yt]=A("overflow"),Lt=ro(pt.x),Et=ro(pt.y);let F=C(I),L=w(I),st=B(I),ht=V(I);S&&f&&u(Cg,!W);{Bh(n,_r,ml)&&b(!0);const[zn]=it?it():[],[Ve]=F=E(I),[Je]=L=y(I),Bt=xg(s),Ft=d&&_x(h()),Qt={w:g(Je.w+Ve.w),h:g(Je.h+Ve.h)},wt={w:g((Ft?Ft.w:Bt.w+g(Bt.w-Je.w))+Ve.w),h:g((Ft?Ft.h:Bt.h+g(Bt.h-Je.h))+Ve.h)};zn&&zn(),ht=Z(wt),st=D(v(Qt,wt),I)}const[xt,_t]=ht,[Ct,N]=st,[ft,St]=L,[mt,X]=F,[gt,Mt]=k({x:Ct.w>0,y:Ct.h>0}),Ot=Lt&&Et&&(gt.x||gt.y)||Lt&&gt.x&&!gt.y||Et&&gt.y&&!gt.x,bt=Vx(gt,pt),[Pt,lt]=$(bt.k),[Nt,Xt]=Y(I),Gt=rt||tt||Xt||Mt||I,[se,we]=Gt?H(x(Nt),I):G();return lt&&nt(bt.k),dt&&at&&na(s,dt(bt,T,at(bt,ft,mt))),b(!1),kl(n,_r,ml,Ot),kl(i,ju,ml,Ot),ie(t,{k:Pt,Vt:{x:xt.w,y:xt.h},Rt:{x:Ct.w,y:Ct.h},rn:gt,Lt:vx(se,Ct)}),{en:lt,nn:_t,sn:N,cn:we||N,pn:Gt}}},rv=r=>{const[t,e,n]=tv(r),i={ln:{t:0,r:0,b:0,l:0},dn:!1,j:{[ng]:0,[ig]:0,[eg]:0,[Jm]:0,[Km]:0,[tg]:0,[Qm]:0},Vt:{x:0,y:0},Rt:{x:0,y:0},k:{x:Br,y:Br},rn:{x:!1,y:!1},Lt:Sg()},{vt:s,gt:o,L:a,Ot:l}=t,{P:c,T:u}=Ci(),h=!c&&(u.x||u.y),f=[ev(t),nv(t,i),iv(t,i)];return[e,d=>{const g={},m=h&&Ln(o),_=m&&l();return oe(f,M=>{ie(g,M(d,g)||{})}),xi(o,m),_&&_(),!a&&xi(s,0),g},i,t,n]},sv=(r,t,e,n,i)=>{let s=!1;const o=td(t,{}),[a,l,c,u,h]=rv(r),[f,d,g]=$x(u,c,o,x=>{b({},x)}),[p,m,,_]=Qx(r,t,g,c,u,i),M=x=>oi(x).some(v=>!!x[v]),b=(x,v)=>{if(e())return!1;const{vn:E,Dt:C,At:y,hn:w}=x,D=E||{},B=!!C||!s,k={It:td(t,D,B),vn:D,Dt:B};if(w)return m(k),!1;const Z=v||d(ie({},k,{At:y})),V=l(ie({},k,{_n:g,Zt:Z}));m(ie({},k,{Zt:Z,tn:V}));const $=M(Z),Y=M(V),H=$||Y||!zh(D)||B;return s=!0,H&&n(x,{Zt:Z,tn:V}),H};return[()=>{const{an:x,gt:v,Ot:E}=u,C=Ln(x),y=[f(),a(),p()],w=E();return xi(v,C),w(),Vt(In,y)},b,()=>({gn:g,bn:c}),{wn:u,yn:_},h]},Xh=new WeakMap,ov=(r,t)=>{Xh.set(r,t)},av=r=>{Xh.delete(r)},Fg=r=>Xh.get(r),so=(r,t,e)=>{const{nt:n}=Ci(),i=zl(r),s=i?r:r.target,o=Fg(s);if(t&&!o){let a=!1;const l=[],c={},u=D=>{const B=lg(D),k=ha(Mx);return k?k(B,!0):B},h=ie({},n(),u(t)),[f,d,g]=$u(),[p,m,_]=$u(e),M=(D,B)=>{_(D,B),g(D,B)},[b,x,v,E,C]=sv(r,h,()=>a,({vn:D,Dt:B},{Zt:k,tn:Z})=>{const{ft:V,Ct:$,xt:Y,Ht:H,Et:G,dt:q}=k,{nn:P,sn:nt,en:A,cn:O}=Z;M("updated",[w,{updateHints:{sizeChanged:!!V,directionChanged:!!$,heightIntrinsicChanged:!!Y,overflowEdgeChanged:!!P,overflowAmountChanged:!!nt,overflowStyleChanged:!!A,scrollCoordinatesChanged:!!O,contentMutation:!!H,hostMutation:!!G,appear:!!q},changedOptions:D||{},force:!!B}])},D=>M("scroll",[w,D])),y=D=>{av(s),In(l),a=!0,M("destroyed",[w,D]),d(),m()},w={options(D,B){if(D){const k=B?n():{},Z=Dg(h,ie(k,u(D)));zh(Z)||(ie(h,Z),x({vn:Z}))}return ie({},h)},on:p,off:(D,B)=>{D&&B&&m(D,B)},state(){const{gn:D,bn:B}=v(),{F:k}=D,{Vt:Z,Rt:V,k:$,rn:Y,ln:H,dn:G,Lt:q}=B;return ie({},{overflowEdge:Z,overflowAmount:V,overflowStyle:$,hasOverflow:Y,scrollCoordinates:{start:q.D,end:q.M},padding:H,paddingAbsolute:G,directionRTL:k,destroyed:a})},elements(){const{vt:D,ht:B,ln:k,U:Z,bt:V,gt:$,Qt:Y}=E.wn,{Yt:H,Gt:G}=E.yn,q=nt=>{const{Pt:A,Ut:O,Tt:T}=nt;return{scrollbar:T,track:O,handle:A}},P=nt=>{const{Wt:A,Xt:O}=nt,T=q(A[0]);return ie({},T,{clone:()=>{const I=q(O());return x({hn:!0}),I}})};return ie({},{target:D,host:B,padding:k||Z,viewport:Z,content:V||Z,scrollOffsetElement:$,scrollEventElement:Y,scrollbarHorizontal:P(H),scrollbarVertical:P(G)})},update:D=>x({Dt:D,At:!0}),destroy:Vt(y,!1),plugin:D=>c[oi(D)[0]]};return xe(l,[C]),ov(s,w),Tg(bg,so,[w,f,c]),Zx(E.wn.wt,!i&&r.cancel)?(y(!0),w):(xe(l,b()),M("initialized",[w]),w.update(),w)}return o};so.plugin=r=>{const t=Ei(r),e=t?r:[r],n=e.map(i=>Tg(i,so)[0]);return yx(e),t?n:n[0]};so.valid=r=>{const t=r&&r.elements,e=Nn(t)&&t();return Fl(e)&&!!Fg(e.target)};so.env=()=>{const{N:r,T:t,P:e,G:n,st:i,et:s,Z:o,tt:a,nt:l,ot:c}=Ci();return ie({},{scrollbarsSize:r,scrollbarsOverlaid:t,scrollbarsHiding:e,scrollTimeline:n,staticDefaultInitialization:i,staticDefaultOptions:s,getDefaultInitialization:o,setDefaultInitialization:a,getDefaultOptions:l,setDefaultOptions:c})};so.nonce=Wx;/**
 * @license
 * Copyright 2010-2022 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const qh="141",ps={LEFT:0,MIDDLE:1,RIGHT:2,ROTATE:0,DOLLY:1,PAN:2},ms={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},lv=0,nd=1,cv=2,zg=1,uv=2,Po=3,ia=0,si=1,oo=2,hv=1,xr=0,Ys=1,id=2,rd=3,sd=4,fv=5,Rs=100,dv=101,pv=102,od=103,ad=104,mv=200,gv=201,_v=202,xv=203,kg=204,Ug=205,vv=206,yv=207,Mv=208,Sv=209,bv=210,wv=0,Tv=1,Ev=2,Ju=3,Cv=4,Av=5,Pv=6,Lv=7,tc=0,Dv=1,Rv=2,Xi=0,Iv=1,Ov=2,Nv=3,Fv=4,zv=5,Bg=300,ao=301,lo=302,Ku=303,Qu=304,ec=306,th=1e3,ii=1001,eh=1002,pn=1003,ld=1004,cd=1005,Gn=1006,kv=1007,nc=1008,os=1009,Uv=1010,Bv=1011,Vg=1012,Vv=1013,Gr=1014,Hr=1015,ra=1016,Gv=1017,Hv=1018,$s=1020,Wv=1021,Xv=1022,ri=1023,qv=1024,Yv=1025,Qr=1026,co=1027,$v=1028,jv=1029,Zv=1030,Jv=1031,Kv=1033,Ac=33776,Pc=33777,Lc=33778,Dc=33779,ud=35840,hd=35841,fd=35842,dd=35843,Qv=36196,pd=37492,md=37496,gd=37808,_d=37809,xd=37810,vd=37811,yd=37812,Md=37813,Sd=37814,bd=37815,wd=37816,Td=37817,Ed=37818,Cd=37819,Ad=37820,Pd=37821,Ld=36492,as=3e3,me=3001,ty=3200,ey=3201,fo=0,ny=1,Ui="srgb",Wr="srgb-linear",Rc=7680,iy=519,Dd=35044,Rd="300 es",nh=1035;class us{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[t]===void 0&&(n[t]=[]),n[t].indexOf(e)===-1&&n[t].push(e)}hasEventListener(t,e){if(this._listeners===void 0)return!1;const n=this._listeners;return n[t]!==void 0&&n[t].indexOf(e)!==-1}removeEventListener(t,e){if(this._listeners===void 0)return;const i=this._listeners[t];if(i!==void 0){const s=i.indexOf(e);s!==-1&&i.splice(s,1)}}dispatchEvent(t){if(this._listeners===void 0)return;const n=this._listeners[t.type];if(n!==void 0){t.target=this;const i=n.slice(0);for(let s=0,o=i.length;s<o;s++)i[s].call(this,t);t.target=null}}}const ze=[];for(let r=0;r<256;r++)ze[r]=(r<16?"0":"")+r.toString(16);const Ic=Math.PI/180,Id=180/Math.PI;function po(){const r=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(ze[r&255]+ze[r>>8&255]+ze[r>>16&255]+ze[r>>24&255]+"-"+ze[t&255]+ze[t>>8&255]+"-"+ze[t>>16&15|64]+ze[t>>24&255]+"-"+ze[e&63|128]+ze[e>>8&255]+"-"+ze[e>>16&255]+ze[e>>24&255]+ze[n&255]+ze[n>>8&255]+ze[n>>16&255]+ze[n>>24&255]).toLowerCase()}function ke(r,t,e){return Math.max(t,Math.min(e,r))}function ry(r,t){return(r%t+t)%t}function Oc(r,t,e){return(1-e)*r+e*t}function Od(r){return(r&r-1)===0&&r!==0}function ih(r){return Math.pow(2,Math.floor(Math.log(r)/Math.LN2))}class vt{constructor(t=0,e=0){this.isVector2=!0,this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t,e){return e!==void 0?(console.warn("THREE.Vector2: .add() now only accepts one argument. Use .addVectors( a, b ) instead."),this.addVectors(t,e)):(this.x+=t.x,this.y+=t.y,this)}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t,e){return e!==void 0?(console.warn("THREE.Vector2: .sub() now only accepts one argument. Use .subVectors( a, b ) instead."),this.subVectors(t,e)):(this.x-=t.x,this.y-=t.y,this)}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){const e=this.x,n=this.y,i=t.elements;return this.x=i[0]*e+i[3]*n+i[6],this.y=i[1]*e+i[4]*n+i[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=this.x<0?Math.ceil(this.x):Math.floor(this.x),this.y=this.y<0?Math.ceil(this.y):Math.floor(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y;return e*e+n*n}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e,n){return n!==void 0&&console.warn("THREE.Vector2: offset has been removed from .fromBufferAttribute()."),this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){const n=Math.cos(e),i=Math.sin(e),s=this.x-t.x,o=this.y-t.y;return this.x=s*n-o*i+t.x,this.y=s*i+o*n+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class Xe{constructor(){this.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],arguments.length>0&&console.error("THREE.Matrix3: the constructor no longer reads arguments. use .set() instead.")}set(t,e,n,i,s,o,a,l,c){const u=this.elements;return u[0]=t,u[1]=i,u[2]=a,u[3]=e,u[4]=s,u[5]=l,u[6]=n,u[7]=o,u[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],this}extractBasis(t,e,n){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(t){const e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,i=e.elements,s=this.elements,o=n[0],a=n[3],l=n[6],c=n[1],u=n[4],h=n[7],f=n[2],d=n[5],g=n[8],p=i[0],m=i[3],_=i[6],M=i[1],b=i[4],x=i[7],v=i[2],E=i[5],C=i[8];return s[0]=o*p+a*M+l*v,s[3]=o*m+a*b+l*E,s[6]=o*_+a*x+l*C,s[1]=c*p+u*M+h*v,s[4]=c*m+u*b+h*E,s[7]=c*_+u*x+h*C,s[2]=f*p+d*M+g*v,s[5]=f*m+d*b+g*E,s[8]=f*_+d*x+g*C,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[1],i=t[2],s=t[3],o=t[4],a=t[5],l=t[6],c=t[7],u=t[8];return e*o*u-e*a*c-n*s*u+n*a*l+i*s*c-i*o*l}invert(){const t=this.elements,e=t[0],n=t[1],i=t[2],s=t[3],o=t[4],a=t[5],l=t[6],c=t[7],u=t[8],h=u*o-a*c,f=a*l-u*s,d=c*s-o*l,g=e*h+n*f+i*d;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);const p=1/g;return t[0]=h*p,t[1]=(i*c-u*n)*p,t[2]=(a*n-i*o)*p,t[3]=f*p,t[4]=(u*e-i*l)*p,t[5]=(i*s-a*e)*p,t[6]=d*p,t[7]=(n*l-c*e)*p,t[8]=(o*e-n*s)*p,this}transpose(){let t;const e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){const e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,n,i,s,o,a){const l=Math.cos(s),c=Math.sin(s);return this.set(n*l,n*c,-n*(l*o+c*a)+o+t,-i*c,i*l,-i*(-c*o+l*a)+a+e,0,0,1),this}scale(t,e){const n=this.elements;return n[0]*=t,n[3]*=t,n[6]*=t,n[1]*=e,n[4]*=e,n[7]*=e,this}rotate(t){const e=Math.cos(t),n=Math.sin(t),i=this.elements,s=i[0],o=i[3],a=i[6],l=i[1],c=i[4],u=i[7];return i[0]=e*s+n*l,i[3]=e*o+n*c,i[6]=e*a+n*u,i[1]=-n*s+e*l,i[4]=-n*o+e*c,i[7]=-n*a+e*u,this}translate(t,e){const n=this.elements;return n[0]+=t*n[2],n[3]+=t*n[5],n[6]+=t*n[8],n[1]+=e*n[2],n[4]+=e*n[5],n[7]+=e*n[8],this}equals(t){const e=this.elements,n=t.elements;for(let i=0;i<9;i++)if(e[i]!==n[i])return!1;return!0}fromArray(t,e=0){for(let n=0;n<9;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t}clone(){return new this.constructor().fromArray(this.elements)}}function Gg(r){for(let t=r.length-1;t>=0;--t)if(r[t]>65535)return!0;return!1}function sa(r){return document.createElementNS("http://www.w3.org/1999/xhtml",r)}function ts(r){return r<.04045?r*.0773993808:Math.pow(r*.9478672986+.0521327014,2.4)}function gl(r){return r<.0031308?r*12.92:1.055*Math.pow(r,.41666)-.055}const Nc={[Ui]:{[Wr]:ts},[Wr]:{[Ui]:gl}},Zn={legacyMode:!0,get workingColorSpace(){return Wr},set workingColorSpace(r){console.warn("THREE.ColorManagement: .workingColorSpace is readonly.")},convert:function(r,t,e){if(this.legacyMode||t===e||!t||!e)return r;if(Nc[t]&&Nc[t][e]!==void 0){const n=Nc[t][e];return r.r=n(r.r),r.g=n(r.g),r.b=n(r.b),r}throw new Error("Unsupported color space conversion.")},fromWorkingColorSpace:function(r,t){return this.convert(r,this.workingColorSpace,t)},toWorkingColorSpace:function(r,t){return this.convert(r,t,this.workingColorSpace)}},Hg={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Ae={r:0,g:0,b:0},Jn={h:0,s:0,l:0},Da={h:0,s:0,l:0};function Fc(r,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?r+(t-r)*6*e:e<1/2?t:e<2/3?r+(t-r)*6*(2/3-e):r}function Ra(r,t){return t.r=r.r,t.g=r.g,t.b=r.b,t}class $t{constructor(t,e,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,e===void 0&&n===void 0?this.set(t):this.setRGB(t,e,n)}set(t){return t&&t.isColor?this.copy(t):typeof t=="number"?this.setHex(t):typeof t=="string"&&this.setStyle(t),this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=Ui){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,Zn.toWorkingColorSpace(this,e),this}setRGB(t,e,n,i=Wr){return this.r=t,this.g=e,this.b=n,Zn.toWorkingColorSpace(this,i),this}setHSL(t,e,n,i=Wr){if(t=ry(t,1),e=ke(e,0,1),n=ke(n,0,1),e===0)this.r=this.g=this.b=n;else{const s=n<=.5?n*(1+e):n+e-n*e,o=2*n-s;this.r=Fc(o,s,t+1/3),this.g=Fc(o,s,t),this.b=Fc(o,s,t-1/3)}return Zn.toWorkingColorSpace(this,i),this}setStyle(t,e=Ui){function n(s){s!==void 0&&parseFloat(s)<1&&console.warn("THREE.Color: Alpha component of "+t+" will be ignored.")}let i;if(i=/^((?:rgb|hsl)a?)\(([^\)]*)\)/.exec(t)){let s;const o=i[1],a=i[2];switch(o){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return this.r=Math.min(255,parseInt(s[1],10))/255,this.g=Math.min(255,parseInt(s[2],10))/255,this.b=Math.min(255,parseInt(s[3],10))/255,Zn.toWorkingColorSpace(this,e),n(s[4]),this;if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return this.r=Math.min(100,parseInt(s[1],10))/100,this.g=Math.min(100,parseInt(s[2],10))/100,this.b=Math.min(100,parseInt(s[3],10))/100,Zn.toWorkingColorSpace(this,e),n(s[4]),this;break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a)){const l=parseFloat(s[1])/360,c=parseInt(s[2],10)/100,u=parseInt(s[3],10)/100;return n(s[4]),this.setHSL(l,c,u,e)}break}}else if(i=/^\#([A-Fa-f\d]+)$/.exec(t)){const s=i[1],o=s.length;if(o===3)return this.r=parseInt(s.charAt(0)+s.charAt(0),16)/255,this.g=parseInt(s.charAt(1)+s.charAt(1),16)/255,this.b=parseInt(s.charAt(2)+s.charAt(2),16)/255,Zn.toWorkingColorSpace(this,e),this;if(o===6)return this.r=parseInt(s.charAt(0)+s.charAt(1),16)/255,this.g=parseInt(s.charAt(2)+s.charAt(3),16)/255,this.b=parseInt(s.charAt(4)+s.charAt(5),16)/255,Zn.toWorkingColorSpace(this,e),this}return t&&t.length>0?this.setColorName(t,e):this}setColorName(t,e=Ui){const n=Hg[t.toLowerCase()];return n!==void 0?this.setHex(n,e):console.warn("THREE.Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=ts(t.r),this.g=ts(t.g),this.b=ts(t.b),this}copyLinearToSRGB(t){return this.r=gl(t.r),this.g=gl(t.g),this.b=gl(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=Ui){return Zn.fromWorkingColorSpace(Ra(this,Ae),t),ke(Ae.r*255,0,255)<<16^ke(Ae.g*255,0,255)<<8^ke(Ae.b*255,0,255)<<0}getHexString(t=Ui){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=Wr){Zn.fromWorkingColorSpace(Ra(this,Ae),e);const n=Ae.r,i=Ae.g,s=Ae.b,o=Math.max(n,i,s),a=Math.min(n,i,s);let l,c;const u=(a+o)/2;if(a===o)l=0,c=0;else{const h=o-a;switch(c=u<=.5?h/(o+a):h/(2-o-a),o){case n:l=(i-s)/h+(i<s?6:0);break;case i:l=(s-n)/h+2;break;case s:l=(n-i)/h+4;break}l/=6}return t.h=l,t.s=c,t.l=u,t}getRGB(t,e=Wr){return Zn.fromWorkingColorSpace(Ra(this,Ae),e),t.r=Ae.r,t.g=Ae.g,t.b=Ae.b,t}getStyle(t=Ui){return Zn.fromWorkingColorSpace(Ra(this,Ae),t),t!==Ui?`color(${t} ${Ae.r} ${Ae.g} ${Ae.b})`:`rgb(${Ae.r*255|0},${Ae.g*255|0},${Ae.b*255|0})`}offsetHSL(t,e,n){return this.getHSL(Jn),Jn.h+=t,Jn.s+=e,Jn.l+=n,this.setHSL(Jn.h,Jn.s,Jn.l),this}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,n){return this.r=t.r+(e.r-t.r)*n,this.g=t.g+(e.g-t.g)*n,this.b=t.b+(e.b-t.b)*n,this}lerpHSL(t,e){this.getHSL(Jn),t.getHSL(Da);const n=Oc(Jn.h,Da.h,e),i=Oc(Jn.s,Da.s,e),s=Oc(Jn.l,Da.l,e);return this.setHSL(n,i,s),this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),t.normalized===!0&&(this.r/=255,this.g/=255,this.b/=255),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}$t.NAMES=Hg;let gs;class Wg{static getDataURL(t){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let e;if(t instanceof HTMLCanvasElement)e=t;else{gs===void 0&&(gs=sa("canvas")),gs.width=t.width,gs.height=t.height;const n=gs.getContext("2d");t instanceof ImageData?n.putImageData(t,0,0):n.drawImage(t,0,0,t.width,t.height),e=gs}return e.width>2048||e.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",t),e.toDataURL("image/jpeg",.6)):e.toDataURL("image/png")}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){const e=sa("canvas");e.width=t.width,e.height=t.height;const n=e.getContext("2d");n.drawImage(t,0,0,t.width,t.height);const i=n.getImageData(0,0,t.width,t.height),s=i.data;for(let o=0;o<s.length;o++)s[o]=ts(s[o]/255)*255;return n.putImageData(i,0,0),e}else if(t.data){const e=t.data.slice(0);for(let n=0;n<e.length;n++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[n]=Math.floor(ts(e[n]/255)*255):e[n]=ts(e[n]);return{data:e,width:t.width,height:t.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}}class Xg{constructor(t=null){this.isSource=!0,this.uuid=po(),this.data=t,this.version=0}set needsUpdate(t){t===!0&&this.version++}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];const n={uuid:this.uuid,url:""},i=this.data;if(i!==null){let s;if(Array.isArray(i)){s=[];for(let o=0,a=i.length;o<a;o++)i[o].isDataTexture?s.push(zc(i[o].image)):s.push(zc(i[o]))}else s=zc(i);n.url=s}return e||(t.images[this.uuid]=n),n}}function zc(r){return typeof HTMLImageElement<"u"&&r instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&r instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&r instanceof ImageBitmap?Wg.getDataURL(r):r.data?{data:Array.prototype.slice.call(r.data),width:r.width,height:r.height,type:r.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let sy=0;class qn extends us{constructor(t=qn.DEFAULT_IMAGE,e=qn.DEFAULT_MAPPING,n=ii,i=ii,s=Gn,o=nc,a=ri,l=os,c=1,u=as){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:sy++}),this.uuid=po(),this.name="",this.source=new Xg(t),this.mipmaps=[],this.mapping=e,this.wrapS=n,this.wrapT=i,this.magFilter=s,this.minFilter=o,this.anisotropy=c,this.format=a,this.internalFormat=null,this.type=l,this.offset=new vt(0,0),this.repeat=new vt(1,1),this.center=new vt(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Xe,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.encoding=u,this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.needsPMREMUpdate=!1}get image(){return this.source.data}set image(t){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.encoding=t.encoding,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];const n={metadata:{version:4.5,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,type:this.type,encoding:this.encoding,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return JSON.stringify(this.userData)!=="{}"&&(n.userData=this.userData),e||(t.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==Bg)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case th:t.x=t.x-Math.floor(t.x);break;case ii:t.x=t.x<0?0:1;break;case eh:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case th:t.y=t.y-Math.floor(t.y);break;case ii:t.y=t.y<0?0:1;break;case eh:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}}qn.DEFAULT_IMAGE=null;qn.DEFAULT_MAPPING=Bg;class $e{constructor(t=0,e=0,n=0,i=1){this.isVector4=!0,this.x=t,this.y=e,this.z=n,this.w=i}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,n,i){return this.x=t,this.y=e,this.z=n,this.w=i,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t,e){return e!==void 0?(console.warn("THREE.Vector4: .add() now only accepts one argument. Use .addVectors( a, b ) instead."),this.addVectors(t,e)):(this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this)}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t,e){return e!==void 0?(console.warn("THREE.Vector4: .sub() now only accepts one argument. Use .subVectors( a, b ) instead."),this.subVectors(t,e)):(this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this)}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){const e=this.x,n=this.y,i=this.z,s=this.w,o=t.elements;return this.x=o[0]*e+o[4]*n+o[8]*i+o[12]*s,this.y=o[1]*e+o[5]*n+o[9]*i+o[13]*s,this.z=o[2]*e+o[6]*n+o[10]*i+o[14]*s,this.w=o[3]*e+o[7]*n+o[11]*i+o[15]*s,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);const e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,n,i,s;const l=t.elements,c=l[0],u=l[4],h=l[8],f=l[1],d=l[5],g=l[9],p=l[2],m=l[6],_=l[10];if(Math.abs(u-f)<.01&&Math.abs(h-p)<.01&&Math.abs(g-m)<.01){if(Math.abs(u+f)<.1&&Math.abs(h+p)<.1&&Math.abs(g+m)<.1&&Math.abs(c+d+_-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;const b=(c+1)/2,x=(d+1)/2,v=(_+1)/2,E=(u+f)/4,C=(h+p)/4,y=(g+m)/4;return b>x&&b>v?b<.01?(n=0,i=.707106781,s=.707106781):(n=Math.sqrt(b),i=E/n,s=C/n):x>v?x<.01?(n=.707106781,i=0,s=.707106781):(i=Math.sqrt(x),n=E/i,s=y/i):v<.01?(n=.707106781,i=.707106781,s=0):(s=Math.sqrt(v),n=C/s,i=y/s),this.set(n,i,s,e),this}let M=Math.sqrt((m-g)*(m-g)+(h-p)*(h-p)+(f-u)*(f-u));return Math.abs(M)<.001&&(M=1),this.x=(m-g)/M,this.y=(h-p)/M,this.z=(f-u)/M,this.w=Math.acos((c+d+_-1)/2),this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this.w=Math.max(t.w,Math.min(e.w,this.w)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this.w=Math.max(t,Math.min(e,this.w)),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=this.x<0?Math.ceil(this.x):Math.floor(this.x),this.y=this.y<0?Math.ceil(this.y):Math.floor(this.y),this.z=this.z<0?Math.ceil(this.z):Math.floor(this.z),this.w=this.w<0?Math.ceil(this.w):Math.floor(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this.w=t.w+(e.w-t.w)*n,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e,n){return n!==void 0&&console.warn("THREE.Vector4: offset has been removed from .fromBufferAttribute()."),this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class vr extends us{constructor(t,e,n={}){super(),this.isWebGLRenderTarget=!0,this.width=t,this.height=e,this.depth=1,this.scissor=new $e(0,0,t,e),this.scissorTest=!1,this.viewport=new $e(0,0,t,e);const i={width:t,height:e,depth:1};this.texture=new qn(i,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.encoding),this.texture.isRenderTargetTexture=!0,this.texture.flipY=!1,this.texture.generateMipmaps=n.generateMipmaps!==void 0?n.generateMipmaps:!1,this.texture.internalFormat=n.internalFormat!==void 0?n.internalFormat:null,this.texture.minFilter=n.minFilter!==void 0?n.minFilter:Gn,this.depthBuffer=n.depthBuffer!==void 0?n.depthBuffer:!0,this.stencilBuffer=n.stencilBuffer!==void 0?n.stencilBuffer:!1,this.depthTexture=n.depthTexture!==void 0?n.depthTexture:null,this.samples=n.samples!==void 0?n.samples:0}setSize(t,e,n=1){(this.width!==t||this.height!==e||this.depth!==n)&&(this.width=t,this.height=e,this.depth=n,this.texture.image.width=t,this.texture.image.height=e,this.texture.image.depth=n,this.dispose()),this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.viewport.copy(t.viewport),this.texture=t.texture.clone(),this.texture.isRenderTargetTexture=!0;const e=Object.assign({},t.texture.image);return this.texture.source=new Xg(e),this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,t.depthTexture!==null&&(this.depthTexture=t.depthTexture.clone()),this.samples=t.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class qg extends qn{constructor(t=null,e=1,n=1,i=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:n,depth:i},this.magFilter=pn,this.minFilter=pn,this.wrapR=ii,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class oy extends qn{constructor(t=null,e=1,n=1,i=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:n,depth:i},this.magFilter=pn,this.minFilter=pn,this.wrapR=ii,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class ls{constructor(t=0,e=0,n=0,i=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=n,this._w=i}static slerp(t,e,n,i){return console.warn("THREE.Quaternion: Static .slerp() has been deprecated. Use qm.slerpQuaternions( qa, qb, t ) instead."),n.slerpQuaternions(t,e,i)}static slerpFlat(t,e,n,i,s,o,a){let l=n[i+0],c=n[i+1],u=n[i+2],h=n[i+3];const f=s[o+0],d=s[o+1],g=s[o+2],p=s[o+3];if(a===0){t[e+0]=l,t[e+1]=c,t[e+2]=u,t[e+3]=h;return}if(a===1){t[e+0]=f,t[e+1]=d,t[e+2]=g,t[e+3]=p;return}if(h!==p||l!==f||c!==d||u!==g){let m=1-a;const _=l*f+c*d+u*g+h*p,M=_>=0?1:-1,b=1-_*_;if(b>Number.EPSILON){const v=Math.sqrt(b),E=Math.atan2(v,_*M);m=Math.sin(m*E)/v,a=Math.sin(a*E)/v}const x=a*M;if(l=l*m+f*x,c=c*m+d*x,u=u*m+g*x,h=h*m+p*x,m===1-a){const v=1/Math.sqrt(l*l+c*c+u*u+h*h);l*=v,c*=v,u*=v,h*=v}}t[e]=l,t[e+1]=c,t[e+2]=u,t[e+3]=h}static multiplyQuaternionsFlat(t,e,n,i,s,o){const a=n[i],l=n[i+1],c=n[i+2],u=n[i+3],h=s[o],f=s[o+1],d=s[o+2],g=s[o+3];return t[e]=a*g+u*h+l*d-c*f,t[e+1]=l*g+u*f+c*h-a*d,t[e+2]=c*g+u*d+a*f-l*h,t[e+3]=u*g-a*h-l*f-c*d,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,n,i){return this._x=t,this._y=e,this._z=n,this._w=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e){if(!(t&&t.isEuler))throw new Error("THREE.Quaternion: .setFromEuler() now expects an Euler rotation rather than a Vector3 and order.");const n=t._x,i=t._y,s=t._z,o=t._order,a=Math.cos,l=Math.sin,c=a(n/2),u=a(i/2),h=a(s/2),f=l(n/2),d=l(i/2),g=l(s/2);switch(o){case"XYZ":this._x=f*u*h+c*d*g,this._y=c*d*h-f*u*g,this._z=c*u*g+f*d*h,this._w=c*u*h-f*d*g;break;case"YXZ":this._x=f*u*h+c*d*g,this._y=c*d*h-f*u*g,this._z=c*u*g-f*d*h,this._w=c*u*h+f*d*g;break;case"ZXY":this._x=f*u*h-c*d*g,this._y=c*d*h+f*u*g,this._z=c*u*g+f*d*h,this._w=c*u*h-f*d*g;break;case"ZYX":this._x=f*u*h-c*d*g,this._y=c*d*h+f*u*g,this._z=c*u*g-f*d*h,this._w=c*u*h+f*d*g;break;case"YZX":this._x=f*u*h+c*d*g,this._y=c*d*h+f*u*g,this._z=c*u*g-f*d*h,this._w=c*u*h-f*d*g;break;case"XZY":this._x=f*u*h-c*d*g,this._y=c*d*h-f*u*g,this._z=c*u*g+f*d*h,this._w=c*u*h+f*d*g;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+o)}return e!==!1&&this._onChangeCallback(),this}setFromAxisAngle(t,e){const n=e/2,i=Math.sin(n);return this._x=t.x*i,this._y=t.y*i,this._z=t.z*i,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(t){const e=t.elements,n=e[0],i=e[4],s=e[8],o=e[1],a=e[5],l=e[9],c=e[2],u=e[6],h=e[10],f=n+a+h;if(f>0){const d=.5/Math.sqrt(f+1);this._w=.25/d,this._x=(u-l)*d,this._y=(s-c)*d,this._z=(o-i)*d}else if(n>a&&n>h){const d=2*Math.sqrt(1+n-a-h);this._w=(u-l)/d,this._x=.25*d,this._y=(i+o)/d,this._z=(s+c)/d}else if(a>h){const d=2*Math.sqrt(1+a-n-h);this._w=(s-c)/d,this._x=(i+o)/d,this._y=.25*d,this._z=(l+u)/d}else{const d=2*Math.sqrt(1+h-n-a);this._w=(o-i)/d,this._x=(s+c)/d,this._y=(l+u)/d,this._z=.25*d}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let n=t.dot(e)+1;return n<Number.EPSILON?(n=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=n):(this._x=0,this._y=-t.z,this._z=t.y,this._w=n)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=n),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(ke(this.dot(t),-1,1)))}rotateTowards(t,e){const n=this.angleTo(t);if(n===0)return this;const i=Math.min(1,e/n);return this.slerp(t,i),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t,e){return e!==void 0?(console.warn("THREE.Quaternion: .multiply() now only accepts one argument. Use .multiplyQuaternions( a, b ) instead."),this.multiplyQuaternions(t,e)):this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){const n=t._x,i=t._y,s=t._z,o=t._w,a=e._x,l=e._y,c=e._z,u=e._w;return this._x=n*u+o*a+i*c-s*l,this._y=i*u+o*l+s*a-n*c,this._z=s*u+o*c+n*l-i*a,this._w=o*u-n*a-i*l-s*c,this._onChangeCallback(),this}slerp(t,e){if(e===0)return this;if(e===1)return this.copy(t);const n=this._x,i=this._y,s=this._z,o=this._w;let a=o*t._w+n*t._x+i*t._y+s*t._z;if(a<0?(this._w=-t._w,this._x=-t._x,this._y=-t._y,this._z=-t._z,a=-a):this.copy(t),a>=1)return this._w=o,this._x=n,this._y=i,this._z=s,this;const l=1-a*a;if(l<=Number.EPSILON){const d=1-e;return this._w=d*o+e*this._w,this._x=d*n+e*this._x,this._y=d*i+e*this._y,this._z=d*s+e*this._z,this.normalize(),this._onChangeCallback(),this}const c=Math.sqrt(l),u=Math.atan2(c,a),h=Math.sin((1-e)*u)/c,f=Math.sin(e*u)/c;return this._w=o*h+this._w*f,this._x=n*h+this._x*f,this._y=i*h+this._y*f,this._z=s*h+this._z*f,this._onChangeCallback(),this}slerpQuaternions(t,e,n){return this.copy(t).slerp(e,n)}random(){const t=Math.random(),e=Math.sqrt(1-t),n=Math.sqrt(t),i=2*Math.PI*Math.random(),s=2*Math.PI*Math.random();return this.set(e*Math.cos(i),n*Math.sin(s),n*Math.cos(s),e*Math.sin(i))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class J{constructor(t=0,e=0,n=0){this.isVector3=!0,this.x=t,this.y=e,this.z=n}set(t,e,n){return n===void 0&&(n=this.z),this.x=t,this.y=e,this.z=n,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t,e){return e!==void 0?(console.warn("THREE.Vector3: .add() now only accepts one argument. Use .addVectors( a, b ) instead."),this.addVectors(t,e)):(this.x+=t.x,this.y+=t.y,this.z+=t.z,this)}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t,e){return e!==void 0?(console.warn("THREE.Vector3: .sub() now only accepts one argument. Use .subVectors( a, b ) instead."),this.subVectors(t,e)):(this.x-=t.x,this.y-=t.y,this.z-=t.z,this)}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t,e){return e!==void 0?(console.warn("THREE.Vector3: .multiply() now only accepts one argument. Use .multiplyVectors( a, b ) instead."),this.multiplyVectors(t,e)):(this.x*=t.x,this.y*=t.y,this.z*=t.z,this)}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return t&&t.isEuler||console.error("THREE.Vector3: .applyEuler() now expects an Euler rotation rather than a Vector3 and order."),this.applyQuaternion(Nd.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(Nd.setFromAxisAngle(t,e))}applyMatrix3(t){const e=this.x,n=this.y,i=this.z,s=t.elements;return this.x=s[0]*e+s[3]*n+s[6]*i,this.y=s[1]*e+s[4]*n+s[7]*i,this.z=s[2]*e+s[5]*n+s[8]*i,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){const e=this.x,n=this.y,i=this.z,s=t.elements,o=1/(s[3]*e+s[7]*n+s[11]*i+s[15]);return this.x=(s[0]*e+s[4]*n+s[8]*i+s[12])*o,this.y=(s[1]*e+s[5]*n+s[9]*i+s[13])*o,this.z=(s[2]*e+s[6]*n+s[10]*i+s[14])*o,this}applyQuaternion(t){const e=this.x,n=this.y,i=this.z,s=t.x,o=t.y,a=t.z,l=t.w,c=l*e+o*i-a*n,u=l*n+a*e-s*i,h=l*i+s*n-o*e,f=-s*e-o*n-a*i;return this.x=c*l+f*-s+u*-a-h*-o,this.y=u*l+f*-o+h*-s-c*-a,this.z=h*l+f*-a+c*-o-u*-s,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){const e=this.x,n=this.y,i=this.z,s=t.elements;return this.x=s[0]*e+s[4]*n+s[8]*i,this.y=s[1]*e+s[5]*n+s[9]*i,this.z=s[2]*e+s[6]*n+s[10]*i,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=this.x<0?Math.ceil(this.x):Math.floor(this.x),this.y=this.y<0?Math.ceil(this.y):Math.floor(this.y),this.z=this.z<0?Math.ceil(this.z):Math.floor(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this}cross(t,e){return e!==void 0?(console.warn("THREE.Vector3: .cross() now only accepts one argument. Use .crossVectors( a, b ) instead."),this.crossVectors(t,e)):this.crossVectors(this,t)}crossVectors(t,e){const n=t.x,i=t.y,s=t.z,o=e.x,a=e.y,l=e.z;return this.x=i*l-s*a,this.y=s*o-n*l,this.z=n*a-i*o,this}projectOnVector(t){const e=t.lengthSq();if(e===0)return this.set(0,0,0);const n=t.dot(this)/e;return this.copy(t).multiplyScalar(n)}projectOnPlane(t){return kc.copy(this).projectOnVector(t),this.sub(kc)}reflect(t){return this.sub(kc.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const n=this.dot(t)/e;return Math.acos(ke(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y,i=this.z-t.z;return e*e+n*n+i*i}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,n){const i=Math.sin(e)*t;return this.x=i*Math.sin(n),this.y=Math.cos(e)*t,this.z=i*Math.cos(n),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,n){return this.x=t*Math.sin(e),this.y=n,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){const e=this.setFromMatrixColumn(t,0).length(),n=this.setFromMatrixColumn(t,1).length(),i=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=n,this.z=i,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e,n){return n!==void 0&&console.warn("THREE.Vector3: offset has been removed from .fromBufferAttribute()."),this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const t=(Math.random()-.5)*2,e=Math.random()*Math.PI*2,n=Math.sqrt(1-t**2);return this.x=n*Math.cos(e),this.y=n*Math.sin(e),this.z=t,this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const kc=new J,Nd=new ls;class fa{constructor(t=new J(1/0,1/0,1/0),e=new J(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){let e=1/0,n=1/0,i=1/0,s=-1/0,o=-1/0,a=-1/0;for(let l=0,c=t.length;l<c;l+=3){const u=t[l],h=t[l+1],f=t[l+2];u<e&&(e=u),h<n&&(n=h),f<i&&(i=f),u>s&&(s=u),h>o&&(o=h),f>a&&(a=f)}return this.min.set(e,n,i),this.max.set(s,o,a),this}setFromBufferAttribute(t){let e=1/0,n=1/0,i=1/0,s=-1/0,o=-1/0,a=-1/0;for(let l=0,c=t.count;l<c;l++){const u=t.getX(l),h=t.getY(l),f=t.getZ(l);u<e&&(e=u),h<n&&(n=h),f<i&&(i=f),u>s&&(s=u),h>o&&(o=h),f>a&&(a=f)}return this.min.set(e,n,i),this.max.set(s,o,a),this}setFromPoints(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){const n=Ar.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(n),this.max.copy(t).add(n),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);const n=t.geometry;if(n!==void 0)if(e&&n.attributes!=null&&n.attributes.position!==void 0){const s=n.attributes.position;for(let o=0,a=s.count;o<a;o++)Ar.fromBufferAttribute(s,o).applyMatrix4(t.matrixWorld),this.expandByPoint(Ar)}else n.boundingBox===null&&n.computeBoundingBox(),Uc.copy(n.boundingBox),Uc.applyMatrix4(t.matrixWorld),this.union(Uc);const i=t.children;for(let s=0,o=i.length;s<o;s++)this.expandByObject(i[s],e);return this}containsPoint(t){return!(t.x<this.min.x||t.x>this.max.x||t.y<this.min.y||t.y>this.max.y||t.z<this.min.z||t.z>this.max.z)}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return!(t.max.x<this.min.x||t.min.x>this.max.x||t.max.y<this.min.y||t.min.y>this.max.y||t.max.z<this.min.z||t.min.z>this.max.z)}intersectsSphere(t){return this.clampPoint(t.center,Ar),Ar.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,n;return t.normal.x>0?(e=t.normal.x*this.min.x,n=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,n=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,n+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,n+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,n+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,n+=t.normal.z*this.min.z),e<=-t.constant&&n>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(vo),Ia.subVectors(this.max,vo),_s.subVectors(t.a,vo),xs.subVectors(t.b,vo),vs.subVectors(t.c,vo),Ki.subVectors(xs,_s),Qi.subVectors(vs,xs),Pr.subVectors(_s,vs);let e=[0,-Ki.z,Ki.y,0,-Qi.z,Qi.y,0,-Pr.z,Pr.y,Ki.z,0,-Ki.x,Qi.z,0,-Qi.x,Pr.z,0,-Pr.x,-Ki.y,Ki.x,0,-Qi.y,Qi.x,0,-Pr.y,Pr.x,0];return!Bc(e,_s,xs,vs,Ia)||(e=[1,0,0,0,1,0,0,0,1],!Bc(e,_s,xs,vs,Ia))?!1:(Oa.crossVectors(Ki,Qi),e=[Oa.x,Oa.y,Oa.z],Bc(e,_s,xs,vs,Ia))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return Ar.copy(t).clamp(this.min,this.max).sub(t).length()}getBoundingSphere(t){return this.getCenter(t.center),t.radius=this.getSize(Ar).length()*.5,t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(Li[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),Li[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),Li[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),Li[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),Li[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),Li[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),Li[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),Li[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(Li),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}}const Li=[new J,new J,new J,new J,new J,new J,new J,new J],Ar=new J,Uc=new fa,_s=new J,xs=new J,vs=new J,Ki=new J,Qi=new J,Pr=new J,vo=new J,Ia=new J,Oa=new J,Lr=new J;function Bc(r,t,e,n,i){for(let s=0,o=r.length-3;s<=o;s+=3){Lr.fromArray(r,s);const a=i.x*Math.abs(Lr.x)+i.y*Math.abs(Lr.y)+i.z*Math.abs(Lr.z),l=t.dot(Lr),c=e.dot(Lr),u=n.dot(Lr);if(Math.max(-Math.max(l,c,u),Math.min(l,c,u))>a)return!1}return!0}const ay=new fa,Fd=new J,Na=new J,Vc=new J;class ic{constructor(t=new J,e=-1){this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){const n=this.center;e!==void 0?n.copy(e):ay.setFromPoints(t).getCenter(n);let i=0;for(let s=0,o=t.length;s<o;s++)i=Math.max(i,n.distanceToSquared(t[s]));return this.radius=Math.sqrt(i),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){const e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){const n=this.center.distanceToSquared(t);return e.copy(t),n>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){Vc.subVectors(t,this.center);const e=Vc.lengthSq();if(e>this.radius*this.radius){const n=Math.sqrt(e),i=(n-this.radius)*.5;this.center.add(Vc.multiplyScalar(i/n)),this.radius+=i}return this}union(t){return this.center.equals(t.center)===!0?Na.set(0,0,1).multiplyScalar(t.radius):Na.subVectors(t.center,this.center).normalize().multiplyScalar(t.radius),this.expandByPoint(Fd.copy(t.center).add(Na)),this.expandByPoint(Fd.copy(t.center).sub(Na)),this}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}}const Di=new J,Gc=new J,Fa=new J,tr=new J,Hc=new J,za=new J,Wc=new J;class Yg{constructor(t=new J,e=new J(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.direction).multiplyScalar(t).add(this.origin)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,Di)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);const n=e.dot(this.direction);return n<0?e.copy(this.origin):e.copy(this.direction).multiplyScalar(n).add(this.origin)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){const e=Di.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(Di.copy(this.direction).multiplyScalar(e).add(this.origin),Di.distanceToSquared(t))}distanceSqToSegment(t,e,n,i){Gc.copy(t).add(e).multiplyScalar(.5),Fa.copy(e).sub(t).normalize(),tr.copy(this.origin).sub(Gc);const s=t.distanceTo(e)*.5,o=-this.direction.dot(Fa),a=tr.dot(this.direction),l=-tr.dot(Fa),c=tr.lengthSq(),u=Math.abs(1-o*o);let h,f,d,g;if(u>0)if(h=o*l-a,f=o*a-l,g=s*u,h>=0)if(f>=-g)if(f<=g){const p=1/u;h*=p,f*=p,d=h*(h+o*f+2*a)+f*(o*h+f+2*l)+c}else f=s,h=Math.max(0,-(o*f+a)),d=-h*h+f*(f+2*l)+c;else f=-s,h=Math.max(0,-(o*f+a)),d=-h*h+f*(f+2*l)+c;else f<=-g?(h=Math.max(0,-(-o*s+a)),f=h>0?-s:Math.min(Math.max(-s,-l),s),d=-h*h+f*(f+2*l)+c):f<=g?(h=0,f=Math.min(Math.max(-s,-l),s),d=f*(f+2*l)+c):(h=Math.max(0,-(o*s+a)),f=h>0?s:Math.min(Math.max(-s,-l),s),d=-h*h+f*(f+2*l)+c);else f=o>0?-s:s,h=Math.max(0,-(o*f+a)),d=-h*h+f*(f+2*l)+c;return n&&n.copy(this.direction).multiplyScalar(h).add(this.origin),i&&i.copy(Fa).multiplyScalar(f).add(Gc),d}intersectSphere(t,e){Di.subVectors(t.center,this.origin);const n=Di.dot(this.direction),i=Di.dot(Di)-n*n,s=t.radius*t.radius;if(i>s)return null;const o=Math.sqrt(s-i),a=n-o,l=n+o;return a<0&&l<0?null:a<0?this.at(l,e):this.at(a,e)}intersectsSphere(t){return this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){const e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(t.normal)+t.constant)/e;return n>=0?n:null}intersectPlane(t,e){const n=this.distanceToPlane(t);return n===null?null:this.at(n,e)}intersectsPlane(t){const e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let n,i,s,o,a,l;const c=1/this.direction.x,u=1/this.direction.y,h=1/this.direction.z,f=this.origin;return c>=0?(n=(t.min.x-f.x)*c,i=(t.max.x-f.x)*c):(n=(t.max.x-f.x)*c,i=(t.min.x-f.x)*c),u>=0?(s=(t.min.y-f.y)*u,o=(t.max.y-f.y)*u):(s=(t.max.y-f.y)*u,o=(t.min.y-f.y)*u),n>o||s>i||((s>n||n!==n)&&(n=s),(o<i||i!==i)&&(i=o),h>=0?(a=(t.min.z-f.z)*h,l=(t.max.z-f.z)*h):(a=(t.max.z-f.z)*h,l=(t.min.z-f.z)*h),n>l||a>i)||((a>n||n!==n)&&(n=a),(l<i||i!==i)&&(i=l),i<0)?null:this.at(n>=0?n:i,e)}intersectsBox(t){return this.intersectBox(t,Di)!==null}intersectTriangle(t,e,n,i,s){Hc.subVectors(e,t),za.subVectors(n,t),Wc.crossVectors(Hc,za);let o=this.direction.dot(Wc),a;if(o>0){if(i)return null;a=1}else if(o<0)a=-1,o=-o;else return null;tr.subVectors(this.origin,t);const l=a*this.direction.dot(za.crossVectors(tr,za));if(l<0)return null;const c=a*this.direction.dot(Hc.cross(tr));if(c<0||l+c>o)return null;const u=-a*tr.dot(Wc);return u<0?null:this.at(u/o,s)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class Ne{constructor(){this.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],arguments.length>0&&console.error("THREE.Matrix4: the constructor no longer reads arguments. use .set() instead.")}set(t,e,n,i,s,o,a,l,c,u,h,f,d,g,p,m){const _=this.elements;return _[0]=t,_[4]=e,_[8]=n,_[12]=i,_[1]=s,_[5]=o,_[9]=a,_[13]=l,_[2]=c,_[6]=u,_[10]=h,_[14]=f,_[3]=d,_[7]=g,_[11]=p,_[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new Ne().fromArray(this.elements)}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],e[9]=n[9],e[10]=n[10],e[11]=n[11],e[12]=n[12],e[13]=n[13],e[14]=n[14],e[15]=n[15],this}copyPosition(t){const e=this.elements,n=t.elements;return e[12]=n[12],e[13]=n[13],e[14]=n[14],this}setFromMatrix3(t){const e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,n){return t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(t,e,n){return this.set(t.x,e.x,n.x,0,t.y,e.y,n.y,0,t.z,e.z,n.z,0,0,0,0,1),this}extractRotation(t){const e=this.elements,n=t.elements,i=1/ys.setFromMatrixColumn(t,0).length(),s=1/ys.setFromMatrixColumn(t,1).length(),o=1/ys.setFromMatrixColumn(t,2).length();return e[0]=n[0]*i,e[1]=n[1]*i,e[2]=n[2]*i,e[3]=0,e[4]=n[4]*s,e[5]=n[5]*s,e[6]=n[6]*s,e[7]=0,e[8]=n[8]*o,e[9]=n[9]*o,e[10]=n[10]*o,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){t&&t.isEuler||console.error("THREE.Matrix4: .makeRotationFromEuler() now expects a Euler rotation rather than a Vector3 and order.");const e=this.elements,n=t.x,i=t.y,s=t.z,o=Math.cos(n),a=Math.sin(n),l=Math.cos(i),c=Math.sin(i),u=Math.cos(s),h=Math.sin(s);if(t.order==="XYZ"){const f=o*u,d=o*h,g=a*u,p=a*h;e[0]=l*u,e[4]=-l*h,e[8]=c,e[1]=d+g*c,e[5]=f-p*c,e[9]=-a*l,e[2]=p-f*c,e[6]=g+d*c,e[10]=o*l}else if(t.order==="YXZ"){const f=l*u,d=l*h,g=c*u,p=c*h;e[0]=f+p*a,e[4]=g*a-d,e[8]=o*c,e[1]=o*h,e[5]=o*u,e[9]=-a,e[2]=d*a-g,e[6]=p+f*a,e[10]=o*l}else if(t.order==="ZXY"){const f=l*u,d=l*h,g=c*u,p=c*h;e[0]=f-p*a,e[4]=-o*h,e[8]=g+d*a,e[1]=d+g*a,e[5]=o*u,e[9]=p-f*a,e[2]=-o*c,e[6]=a,e[10]=o*l}else if(t.order==="ZYX"){const f=o*u,d=o*h,g=a*u,p=a*h;e[0]=l*u,e[4]=g*c-d,e[8]=f*c+p,e[1]=l*h,e[5]=p*c+f,e[9]=d*c-g,e[2]=-c,e[6]=a*l,e[10]=o*l}else if(t.order==="YZX"){const f=o*l,d=o*c,g=a*l,p=a*c;e[0]=l*u,e[4]=p-f*h,e[8]=g*h+d,e[1]=h,e[5]=o*u,e[9]=-a*u,e[2]=-c*u,e[6]=d*h+g,e[10]=f-p*h}else if(t.order==="XZY"){const f=o*l,d=o*c,g=a*l,p=a*c;e[0]=l*u,e[4]=-h,e[8]=c*u,e[1]=f*h+p,e[5]=o*u,e[9]=d*h-g,e[2]=g*h-d,e[6]=a*u,e[10]=p*h+f}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(ly,t,cy)}lookAt(t,e,n){const i=this.elements;return Mn.subVectors(t,e),Mn.lengthSq()===0&&(Mn.z=1),Mn.normalize(),er.crossVectors(n,Mn),er.lengthSq()===0&&(Math.abs(n.z)===1?Mn.x+=1e-4:Mn.z+=1e-4,Mn.normalize(),er.crossVectors(n,Mn)),er.normalize(),ka.crossVectors(Mn,er),i[0]=er.x,i[4]=ka.x,i[8]=Mn.x,i[1]=er.y,i[5]=ka.y,i[9]=Mn.y,i[2]=er.z,i[6]=ka.z,i[10]=Mn.z,this}multiply(t,e){return e!==void 0?(console.warn("THREE.Matrix4: .multiply() now only accepts one argument. Use .multiplyMatrices( a, b ) instead."),this.multiplyMatrices(t,e)):this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,i=e.elements,s=this.elements,o=n[0],a=n[4],l=n[8],c=n[12],u=n[1],h=n[5],f=n[9],d=n[13],g=n[2],p=n[6],m=n[10],_=n[14],M=n[3],b=n[7],x=n[11],v=n[15],E=i[0],C=i[4],y=i[8],w=i[12],D=i[1],B=i[5],k=i[9],Z=i[13],V=i[2],$=i[6],Y=i[10],H=i[14],G=i[3],q=i[7],P=i[11],nt=i[15];return s[0]=o*E+a*D+l*V+c*G,s[4]=o*C+a*B+l*$+c*q,s[8]=o*y+a*k+l*Y+c*P,s[12]=o*w+a*Z+l*H+c*nt,s[1]=u*E+h*D+f*V+d*G,s[5]=u*C+h*B+f*$+d*q,s[9]=u*y+h*k+f*Y+d*P,s[13]=u*w+h*Z+f*H+d*nt,s[2]=g*E+p*D+m*V+_*G,s[6]=g*C+p*B+m*$+_*q,s[10]=g*y+p*k+m*Y+_*P,s[14]=g*w+p*Z+m*H+_*nt,s[3]=M*E+b*D+x*V+v*G,s[7]=M*C+b*B+x*$+v*q,s[11]=M*y+b*k+x*Y+v*P,s[15]=M*w+b*Z+x*H+v*nt,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[4],i=t[8],s=t[12],o=t[1],a=t[5],l=t[9],c=t[13],u=t[2],h=t[6],f=t[10],d=t[14],g=t[3],p=t[7],m=t[11],_=t[15];return g*(+s*l*h-i*c*h-s*a*f+n*c*f+i*a*d-n*l*d)+p*(+e*l*d-e*c*f+s*o*f-i*o*d+i*c*u-s*l*u)+m*(+e*c*h-e*a*d-s*o*h+n*o*d+s*a*u-n*c*u)+_*(-i*a*u-e*l*h+e*a*f+i*o*h-n*o*f+n*l*u)}transpose(){const t=this.elements;let e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,n){const i=this.elements;return t.isVector3?(i[12]=t.x,i[13]=t.y,i[14]=t.z):(i[12]=t,i[13]=e,i[14]=n),this}invert(){const t=this.elements,e=t[0],n=t[1],i=t[2],s=t[3],o=t[4],a=t[5],l=t[6],c=t[7],u=t[8],h=t[9],f=t[10],d=t[11],g=t[12],p=t[13],m=t[14],_=t[15],M=h*m*c-p*f*c+p*l*d-a*m*d-h*l*_+a*f*_,b=g*f*c-u*m*c-g*l*d+o*m*d+u*l*_-o*f*_,x=u*p*c-g*h*c+g*a*d-o*p*d-u*a*_+o*h*_,v=g*h*l-u*p*l-g*a*f+o*p*f+u*a*m-o*h*m,E=e*M+n*b+i*x+s*v;if(E===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const C=1/E;return t[0]=M*C,t[1]=(p*f*s-h*m*s-p*i*d+n*m*d+h*i*_-n*f*_)*C,t[2]=(a*m*s-p*l*s+p*i*c-n*m*c-a*i*_+n*l*_)*C,t[3]=(h*l*s-a*f*s-h*i*c+n*f*c+a*i*d-n*l*d)*C,t[4]=b*C,t[5]=(u*m*s-g*f*s+g*i*d-e*m*d-u*i*_+e*f*_)*C,t[6]=(g*l*s-o*m*s-g*i*c+e*m*c+o*i*_-e*l*_)*C,t[7]=(o*f*s-u*l*s+u*i*c-e*f*c-o*i*d+e*l*d)*C,t[8]=x*C,t[9]=(g*h*s-u*p*s-g*n*d+e*p*d+u*n*_-e*h*_)*C,t[10]=(o*p*s-g*a*s+g*n*c-e*p*c-o*n*_+e*a*_)*C,t[11]=(u*a*s-o*h*s-u*n*c+e*h*c+o*n*d-e*a*d)*C,t[12]=v*C,t[13]=(u*p*i-g*h*i+g*n*f-e*p*f-u*n*m+e*h*m)*C,t[14]=(g*a*i-o*p*i-g*n*l+e*p*l+o*n*m-e*a*m)*C,t[15]=(o*h*i-u*a*i+u*n*l-e*h*l-o*n*f+e*a*f)*C,this}scale(t){const e=this.elements,n=t.x,i=t.y,s=t.z;return e[0]*=n,e[4]*=i,e[8]*=s,e[1]*=n,e[5]*=i,e[9]*=s,e[2]*=n,e[6]*=i,e[10]*=s,e[3]*=n,e[7]*=i,e[11]*=s,this}getMaxScaleOnAxis(){const t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],n=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],i=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,n,i))}makeTranslation(t,e,n){return this.set(1,0,0,t,0,1,0,e,0,0,1,n,0,0,0,1),this}makeRotationX(t){const e=Math.cos(t),n=Math.sin(t);return this.set(1,0,0,0,0,e,-n,0,0,n,e,0,0,0,0,1),this}makeRotationY(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,0,n,0,0,1,0,0,-n,0,e,0,0,0,0,1),this}makeRotationZ(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,0,n,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){const n=Math.cos(e),i=Math.sin(e),s=1-n,o=t.x,a=t.y,l=t.z,c=s*o,u=s*a;return this.set(c*o+n,c*a-i*l,c*l+i*a,0,c*a+i*l,u*a+n,u*l-i*o,0,c*l-i*a,u*l+i*o,s*l*l+n,0,0,0,0,1),this}makeScale(t,e,n){return this.set(t,0,0,0,0,e,0,0,0,0,n,0,0,0,0,1),this}makeShear(t,e,n,i,s,o){return this.set(1,n,s,0,t,1,o,0,e,i,1,0,0,0,0,1),this}compose(t,e,n){const i=this.elements,s=e._x,o=e._y,a=e._z,l=e._w,c=s+s,u=o+o,h=a+a,f=s*c,d=s*u,g=s*h,p=o*u,m=o*h,_=a*h,M=l*c,b=l*u,x=l*h,v=n.x,E=n.y,C=n.z;return i[0]=(1-(p+_))*v,i[1]=(d+x)*v,i[2]=(g-b)*v,i[3]=0,i[4]=(d-x)*E,i[5]=(1-(f+_))*E,i[6]=(m+M)*E,i[7]=0,i[8]=(g+b)*C,i[9]=(m-M)*C,i[10]=(1-(f+p))*C,i[11]=0,i[12]=t.x,i[13]=t.y,i[14]=t.z,i[15]=1,this}decompose(t,e,n){const i=this.elements;let s=ys.set(i[0],i[1],i[2]).length();const o=ys.set(i[4],i[5],i[6]).length(),a=ys.set(i[8],i[9],i[10]).length();this.determinant()<0&&(s=-s),t.x=i[12],t.y=i[13],t.z=i[14],Kn.copy(this);const c=1/s,u=1/o,h=1/a;return Kn.elements[0]*=c,Kn.elements[1]*=c,Kn.elements[2]*=c,Kn.elements[4]*=u,Kn.elements[5]*=u,Kn.elements[6]*=u,Kn.elements[8]*=h,Kn.elements[9]*=h,Kn.elements[10]*=h,e.setFromRotationMatrix(Kn),n.x=s,n.y=o,n.z=a,this}makePerspective(t,e,n,i,s,o){o===void 0&&console.warn("THREE.Matrix4: .makePerspective() has been redefined and has a new signature. Please check the docs.");const a=this.elements,l=2*s/(e-t),c=2*s/(n-i),u=(e+t)/(e-t),h=(n+i)/(n-i),f=-(o+s)/(o-s),d=-2*o*s/(o-s);return a[0]=l,a[4]=0,a[8]=u,a[12]=0,a[1]=0,a[5]=c,a[9]=h,a[13]=0,a[2]=0,a[6]=0,a[10]=f,a[14]=d,a[3]=0,a[7]=0,a[11]=-1,a[15]=0,this}makeOrthographic(t,e,n,i,s,o){const a=this.elements,l=1/(e-t),c=1/(n-i),u=1/(o-s),h=(e+t)*l,f=(n+i)*c,d=(o+s)*u;return a[0]=2*l,a[4]=0,a[8]=0,a[12]=-h,a[1]=0,a[5]=2*c,a[9]=0,a[13]=-f,a[2]=0,a[6]=0,a[10]=-2*u,a[14]=-d,a[3]=0,a[7]=0,a[11]=0,a[15]=1,this}equals(t){const e=this.elements,n=t.elements;for(let i=0;i<16;i++)if(e[i]!==n[i])return!1;return!0}fromArray(t,e=0){for(let n=0;n<16;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t[e+9]=n[9],t[e+10]=n[10],t[e+11]=n[11],t[e+12]=n[12],t[e+13]=n[13],t[e+14]=n[14],t[e+15]=n[15],t}}const ys=new J,Kn=new Ne,ly=new J(0,0,0),cy=new J(1,1,1),er=new J,ka=new J,Mn=new J,zd=new Ne,kd=new ls;class da{constructor(t=0,e=0,n=0,i=da.DefaultOrder){this.isEuler=!0,this._x=t,this._y=e,this._z=n,this._order=i}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,n,i=this._order){return this._x=t,this._y=e,this._z=n,this._order=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,n=!0){const i=t.elements,s=i[0],o=i[4],a=i[8],l=i[1],c=i[5],u=i[9],h=i[2],f=i[6],d=i[10];switch(e){case"XYZ":this._y=Math.asin(ke(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-u,d),this._z=Math.atan2(-o,s)):(this._x=Math.atan2(f,c),this._z=0);break;case"YXZ":this._x=Math.asin(-ke(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(a,d),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-h,s),this._z=0);break;case"ZXY":this._x=Math.asin(ke(f,-1,1)),Math.abs(f)<.9999999?(this._y=Math.atan2(-h,d),this._z=Math.atan2(-o,c)):(this._y=0,this._z=Math.atan2(l,s));break;case"ZYX":this._y=Math.asin(-ke(h,-1,1)),Math.abs(h)<.9999999?(this._x=Math.atan2(f,d),this._z=Math.atan2(l,s)):(this._x=0,this._z=Math.atan2(-o,c));break;case"YZX":this._z=Math.asin(ke(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-u,c),this._y=Math.atan2(-h,s)):(this._x=0,this._y=Math.atan2(a,d));break;case"XZY":this._z=Math.asin(-ke(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(f,c),this._y=Math.atan2(a,s)):(this._x=Math.atan2(-u,d),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,n===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,n){return zd.makeRotationFromQuaternion(t),this.setFromRotationMatrix(zd,e,n)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return kd.setFromEuler(this),this.setFromQuaternion(kd,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}toVector3(){console.error("THREE.Euler: .toVector3() has been removed. Use Vector3.setFromEuler() instead")}}da.DefaultOrder="XYZ";da.RotationOrders=["XYZ","YZX","ZXY","XZY","YXZ","ZYX"];class $g{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}}let uy=0;const Ud=new J,Ms=new ls,Ri=new Ne,Ua=new J,yo=new J,hy=new J,fy=new ls,Bd=new J(1,0,0),Vd=new J(0,1,0),Gd=new J(0,0,1),dy={type:"added"},Hd={type:"removed"};class Yn extends us{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:uy++}),this.uuid=po(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=Yn.DefaultUp.clone();const t=new J,e=new da,n=new ls,i=new J(1,1,1);function s(){n.setFromEuler(e,!1)}function o(){e.setFromQuaternion(n,void 0,!1)}e._onChange(s),n._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:i},modelViewMatrix:{value:new Ne},normalMatrix:{value:new Xe}}),this.matrix=new Ne,this.matrixWorld=new Ne,this.matrixAutoUpdate=Yn.DefaultMatrixAutoUpdate,this.matrixWorldNeedsUpdate=!1,this.layers=new $g,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return Ms.setFromAxisAngle(t,e),this.quaternion.multiply(Ms),this}rotateOnWorldAxis(t,e){return Ms.setFromAxisAngle(t,e),this.quaternion.premultiply(Ms),this}rotateX(t){return this.rotateOnAxis(Bd,t)}rotateY(t){return this.rotateOnAxis(Vd,t)}rotateZ(t){return this.rotateOnAxis(Gd,t)}translateOnAxis(t,e){return Ud.copy(t).applyQuaternion(this.quaternion),this.position.add(Ud.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(Bd,t)}translateY(t){return this.translateOnAxis(Vd,t)}translateZ(t){return this.translateOnAxis(Gd,t)}localToWorld(t){return t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return t.applyMatrix4(Ri.copy(this.matrixWorld).invert())}lookAt(t,e,n){t.isVector3?Ua.copy(t):Ua.set(t,e,n);const i=this.parent;this.updateWorldMatrix(!0,!1),yo.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Ri.lookAt(yo,Ua,this.up):Ri.lookAt(Ua,yo,this.up),this.quaternion.setFromRotationMatrix(Ri),i&&(Ri.extractRotation(i.matrixWorld),Ms.setFromRotationMatrix(Ri),this.quaternion.premultiply(Ms.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.parent!==null&&t.parent.remove(t),t.parent=this,this.children.push(t),t.dispatchEvent(dy)):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(Hd)),this}removeFromParent(){const t=this.parent;return t!==null&&t.remove(this),this}clear(){for(let t=0;t<this.children.length;t++){const e=this.children[t];e.parent=null,e.dispatchEvent(Hd)}return this.children.length=0,this}attach(t){return this.updateWorldMatrix(!0,!1),Ri.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),Ri.multiply(t.parent.matrixWorld)),t.applyMatrix4(Ri),this.add(t),t.updateWorldMatrix(!1,!0),this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let n=0,i=this.children.length;n<i;n++){const o=this.children[n].getObjectByProperty(t,e);if(o!==void 0)return o}}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(yo,t,hy),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(yo,fy,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);const e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}traverse(t){t(this);const e=this.children;for(let n=0,i=e.length;n<i;n++)e[n].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);const e=this.children;for(let n=0,i=e.length;n<i;n++)e[n].traverseVisible(t)}traverseAncestors(t){const e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),this.matrixWorldNeedsUpdate=!1,t=!0);const e=this.children;for(let n=0,i=e.length;n<i;n++)e[n].updateMatrixWorld(t)}updateWorldMatrix(t,e){const n=this.parent;if(t===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),e===!0){const i=this.children;for(let s=0,o=i.length;s<o;s++)i[s].updateWorldMatrix(!1,!0)}}toJSON(t){const e=t===void 0||typeof t=="string",n={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.5,type:"Object",generator:"Object3D.toJSON"});const i={};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.castShadow===!0&&(i.castShadow=!0),this.receiveShadow===!0&&(i.receiveShadow=!0),this.visible===!1&&(i.visible=!1),this.frustumCulled===!1&&(i.frustumCulled=!1),this.renderOrder!==0&&(i.renderOrder=this.renderOrder),JSON.stringify(this.userData)!=="{}"&&(i.userData=this.userData),i.layers=this.layers.mask,i.matrix=this.matrix.toArray(),this.matrixAutoUpdate===!1&&(i.matrixAutoUpdate=!1),this.isInstancedMesh&&(i.type="InstancedMesh",i.count=this.count,i.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(i.instanceColor=this.instanceColor.toJSON()));function s(a,l){return a[l.uuid]===void 0&&(a[l.uuid]=l.toJSON(t)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?i.background=this.background.toJSON():this.background.isTexture&&(i.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&(i.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){i.geometry=s(t.geometries,this.geometry);const a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){const l=a.shapes;if(Array.isArray(l))for(let c=0,u=l.length;c<u;c++){const h=l[c];s(t.shapes,h)}else s(t.shapes,l)}}if(this.isSkinnedMesh&&(i.bindMode=this.bindMode,i.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(t.skeletons,this.skeleton),i.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const a=[];for(let l=0,c=this.material.length;l<c;l++)a.push(s(t.materials,this.material[l]));i.material=a}else i.material=s(t.materials,this.material);if(this.children.length>0){i.children=[];for(let a=0;a<this.children.length;a++)i.children.push(this.children[a].toJSON(t).object)}if(this.animations.length>0){i.animations=[];for(let a=0;a<this.animations.length;a++){const l=this.animations[a];i.animations.push(s(t.animations,l))}}if(e){const a=o(t.geometries),l=o(t.materials),c=o(t.textures),u=o(t.images),h=o(t.shapes),f=o(t.skeletons),d=o(t.animations),g=o(t.nodes);a.length>0&&(n.geometries=a),l.length>0&&(n.materials=l),c.length>0&&(n.textures=c),u.length>0&&(n.images=u),h.length>0&&(n.shapes=h),f.length>0&&(n.skeletons=f),d.length>0&&(n.animations=d),g.length>0&&(n.nodes=g)}return n.object=i,n;function o(a){const l=[];for(const c in a){const u=a[c];delete u.metadata,l.push(u)}return l}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let n=0;n<t.children.length;n++){const i=t.children[n];this.add(i.clone())}return this}}Yn.DefaultUp=new J(0,1,0);Yn.DefaultMatrixAutoUpdate=!0;const Qn=new J,Ii=new J,Xc=new J,Oi=new J,Ss=new J,bs=new J,Wd=new J,qc=new J,Yc=new J,$c=new J;class Gi{constructor(t=new J,e=new J,n=new J){this.a=t,this.b=e,this.c=n}static getNormal(t,e,n,i){i.subVectors(n,e),Qn.subVectors(t,e),i.cross(Qn);const s=i.lengthSq();return s>0?i.multiplyScalar(1/Math.sqrt(s)):i.set(0,0,0)}static getBarycoord(t,e,n,i,s){Qn.subVectors(i,e),Ii.subVectors(n,e),Xc.subVectors(t,e);const o=Qn.dot(Qn),a=Qn.dot(Ii),l=Qn.dot(Xc),c=Ii.dot(Ii),u=Ii.dot(Xc),h=o*c-a*a;if(h===0)return s.set(-2,-1,-1);const f=1/h,d=(c*l-a*u)*f,g=(o*u-a*l)*f;return s.set(1-d-g,g,d)}static containsPoint(t,e,n,i){return this.getBarycoord(t,e,n,i,Oi),Oi.x>=0&&Oi.y>=0&&Oi.x+Oi.y<=1}static getUV(t,e,n,i,s,o,a,l){return this.getBarycoord(t,e,n,i,Oi),l.set(0,0),l.addScaledVector(s,Oi.x),l.addScaledVector(o,Oi.y),l.addScaledVector(a,Oi.z),l}static isFrontFacing(t,e,n,i){return Qn.subVectors(n,e),Ii.subVectors(t,e),Qn.cross(Ii).dot(i)<0}set(t,e,n){return this.a.copy(t),this.b.copy(e),this.c.copy(n),this}setFromPointsAndIndices(t,e,n,i){return this.a.copy(t[e]),this.b.copy(t[n]),this.c.copy(t[i]),this}setFromAttributeAndIndices(t,e,n,i){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,n),this.c.fromBufferAttribute(t,i),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return Qn.subVectors(this.c,this.b),Ii.subVectors(this.a,this.b),Qn.cross(Ii).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return Gi.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return Gi.getBarycoord(t,this.a,this.b,this.c,e)}getUV(t,e,n,i,s){return Gi.getUV(t,this.a,this.b,this.c,e,n,i,s)}containsPoint(t){return Gi.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return Gi.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){const n=this.a,i=this.b,s=this.c;let o,a;Ss.subVectors(i,n),bs.subVectors(s,n),qc.subVectors(t,n);const l=Ss.dot(qc),c=bs.dot(qc);if(l<=0&&c<=0)return e.copy(n);Yc.subVectors(t,i);const u=Ss.dot(Yc),h=bs.dot(Yc);if(u>=0&&h<=u)return e.copy(i);const f=l*h-u*c;if(f<=0&&l>=0&&u<=0)return o=l/(l-u),e.copy(n).addScaledVector(Ss,o);$c.subVectors(t,s);const d=Ss.dot($c),g=bs.dot($c);if(g>=0&&d<=g)return e.copy(s);const p=d*c-l*g;if(p<=0&&c>=0&&g<=0)return a=c/(c-g),e.copy(n).addScaledVector(bs,a);const m=u*g-d*h;if(m<=0&&h-u>=0&&d-g>=0)return Wd.subVectors(s,i),a=(h-u)/(h-u+(d-g)),e.copy(i).addScaledVector(Wd,a);const _=1/(m+p+f);return o=p*_,a=f*_,e.copy(n).addScaledVector(Ss,o).addScaledVector(bs,a)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}}let py=0;class Be extends us{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:py++}),this.uuid=po(),this.name="",this.type="Material",this.blending=Ys,this.side=ia,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.blendSrc=kg,this.blendDst=Ug,this.blendEquation=Rs,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.depthFunc=Ju,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=iy,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Rc,this.stencilZFail=Rc,this.stencilZPass=Rc,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBuild(){}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(const e in t){const n=t[e];if(n===void 0){console.warn("THREE.Material: '"+e+"' parameter is undefined.");continue}if(e==="shading"){console.warn("THREE."+this.type+": .shading has been removed. Use the boolean .flatShading instead."),this.flatShading=n===hv;continue}const i=this[e];if(i===void 0){console.warn("THREE."+this.type+": '"+e+"' is not a property of this material.");continue}i&&i.isColor?i.set(n):i&&i.isVector3&&n&&n.isVector3?i.copy(n):this[e]=n}}toJSON(t){const e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});const n={metadata:{version:4.5,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(t).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(t).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(t).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(t).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(t).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==Ys&&(n.blending=this.blending),this.side!==ia&&(n.side=this.side),this.vertexColors&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=this.transparent),n.depthFunc=this.depthFunc,n.depthTest=this.depthTest,n.depthWrite=this.depthWrite,n.colorWrite=this.colorWrite,n.stencilWrite=this.stencilWrite,n.stencilWriteMask=this.stencilWriteMask,n.stencilFunc=this.stencilFunc,n.stencilRef=this.stencilRef,n.stencilFuncMask=this.stencilFuncMask,n.stencilFail=this.stencilFail,n.stencilZFail=this.stencilZFail,n.stencilZPass=this.stencilZPass,this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaToCoverage===!0&&(n.alphaToCoverage=this.alphaToCoverage),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=this.premultipliedAlpha),this.wireframe===!0&&(n.wireframe=this.wireframe),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=this.flatShading),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),JSON.stringify(this.userData)!=="{}"&&(n.userData=this.userData);function i(s){const o=[];for(const a in s){const l=s[a];delete l.metadata,o.push(l)}return o}if(e){const s=i(t.textures),o=i(t.images);s.length>0&&(n.textures=s),o.length>0&&(n.images=o)}return n}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;const e=t.clippingPlanes;let n=null;if(e!==null){const i=e.length;n=new Array(i);for(let s=0;s!==i;++s)n[s]=e[s].clone()}return this.clippingPlanes=n,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}get vertexTangents(){return console.warn("THREE."+this.type+": .vertexTangents has been removed."),!1}set vertexTangents(t){console.warn("THREE."+this.type+": .vertexTangents has been removed.")}}Be.fromType=function(){return null};class Yh extends Be{constructor(t){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new $t(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.combine=tc,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}}const Te=new J,Ba=new vt;class bi{constructor(t,e,n){if(Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=n===!0,this.usage=Dd,this.updateRange={offset:0,count:-1},this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this}copyAt(t,e,n){t*=this.itemSize,n*=e.itemSize;for(let i=0,s=this.itemSize;i<s;i++)this.array[t+i]=e.array[n+i];return this}copyArray(t){return this.array.set(t),this}copyColorsArray(t){const e=this.array;let n=0;for(let i=0,s=t.length;i<s;i++){let o=t[i];o===void 0&&(console.warn("THREE.BufferAttribute.copyColorsArray(): color is undefined",i),o=new $t),e[n++]=o.r,e[n++]=o.g,e[n++]=o.b}return this}copyVector2sArray(t){const e=this.array;let n=0;for(let i=0,s=t.length;i<s;i++){let o=t[i];o===void 0&&(console.warn("THREE.BufferAttribute.copyVector2sArray(): vector is undefined",i),o=new vt),e[n++]=o.x,e[n++]=o.y}return this}copyVector3sArray(t){const e=this.array;let n=0;for(let i=0,s=t.length;i<s;i++){let o=t[i];o===void 0&&(console.warn("THREE.BufferAttribute.copyVector3sArray(): vector is undefined",i),o=new J),e[n++]=o.x,e[n++]=o.y,e[n++]=o.z}return this}copyVector4sArray(t){const e=this.array;let n=0;for(let i=0,s=t.length;i<s;i++){let o=t[i];o===void 0&&(console.warn("THREE.BufferAttribute.copyVector4sArray(): vector is undefined",i),o=new $e),e[n++]=o.x,e[n++]=o.y,e[n++]=o.z,e[n++]=o.w}return this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,n=this.count;e<n;e++)Ba.fromBufferAttribute(this,e),Ba.applyMatrix3(t),this.setXY(e,Ba.x,Ba.y);else if(this.itemSize===3)for(let e=0,n=this.count;e<n;e++)Te.fromBufferAttribute(this,e),Te.applyMatrix3(t),this.setXYZ(e,Te.x,Te.y,Te.z);return this}applyMatrix4(t){for(let e=0,n=this.count;e<n;e++)Te.fromBufferAttribute(this,e),Te.applyMatrix4(t),this.setXYZ(e,Te.x,Te.y,Te.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)Te.fromBufferAttribute(this,e),Te.applyNormalMatrix(t),this.setXYZ(e,Te.x,Te.y,Te.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)Te.fromBufferAttribute(this,e),Te.transformDirection(t),this.setXYZ(e,Te.x,Te.y,Te.z);return this}set(t,e=0){return this.array.set(t,e),this}getX(t){return this.array[t*this.itemSize]}setX(t,e){return this.array[t*this.itemSize]=e,this}getY(t){return this.array[t*this.itemSize+1]}setY(t,e){return this.array[t*this.itemSize+1]=e,this}getZ(t){return this.array[t*this.itemSize+2]}setZ(t,e){return this.array[t*this.itemSize+2]=e,this}getW(t){return this.array[t*this.itemSize+3]}setW(t,e){return this.array[t*this.itemSize+3]=e,this}setXY(t,e,n){return t*=this.itemSize,this.array[t+0]=e,this.array[t+1]=n,this}setXYZ(t,e,n,i){return t*=this.itemSize,this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=i,this}setXYZW(t,e,n,i,s){return t*=this.itemSize,this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=i,this.array[t+3]=s,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.prototype.slice.call(this.array),normalized:this.normalized};return this.name!==""&&(t.name=this.name),this.usage!==Dd&&(t.usage=this.usage),(this.updateRange.offset!==0||this.updateRange.count!==-1)&&(t.updateRange=this.updateRange),t}}class jg extends bi{constructor(t,e,n){super(new Uint16Array(t),e,n)}}class Zg extends bi{constructor(t,e,n){super(new Uint32Array(t),e,n)}}class wi extends bi{constructor(t,e,n){super(new Float32Array(t),e,n)}}let my=0;const kn=new Ne,jc=new Yn,ws=new J,Sn=new fa,Mo=new fa,De=new J;class Zi extends us{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:my++}),this.uuid=po(),this.name="",this.type="BufferGeometry",this.index=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(Gg(t)?Zg:jg)(t,1):this.index=t,this}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,n=0){this.groups.push({start:t,count:e,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){const e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const s=new Xe().getNormalMatrix(t);n.applyNormalMatrix(s),n.needsUpdate=!0}const i=this.attributes.tangent;return i!==void 0&&(i.transformDirection(t),i.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(t){return kn.makeRotationFromQuaternion(t),this.applyMatrix4(kn),this}rotateX(t){return kn.makeRotationX(t),this.applyMatrix4(kn),this}rotateY(t){return kn.makeRotationY(t),this.applyMatrix4(kn),this}rotateZ(t){return kn.makeRotationZ(t),this.applyMatrix4(kn),this}translate(t,e,n){return kn.makeTranslation(t,e,n),this.applyMatrix4(kn),this}scale(t,e,n){return kn.makeScale(t,e,n),this.applyMatrix4(kn),this}lookAt(t){return jc.lookAt(t),jc.updateMatrix(),this.applyMatrix4(jc.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(ws).negate(),this.translate(ws.x,ws.y,ws.z),this}setFromPoints(t){const e=[];for(let n=0,i=t.length;n<i;n++){const s=t[n];e.push(s.x,s.y,s.z||0)}return this.setAttribute("position",new wi(e,3)),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new fa);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error('THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box. Alternatively set "mesh.frustumCulled" to "false".',this),this.boundingBox.set(new J(-1/0,-1/0,-1/0),new J(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let n=0,i=e.length;n<i;n++){const s=e[n];Sn.setFromBufferAttribute(s),this.morphTargetsRelative?(De.addVectors(this.boundingBox.min,Sn.min),this.boundingBox.expandByPoint(De),De.addVectors(this.boundingBox.max,Sn.max),this.boundingBox.expandByPoint(De)):(this.boundingBox.expandByPoint(Sn.min),this.boundingBox.expandByPoint(Sn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new ic);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error('THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere. Alternatively set "mesh.frustumCulled" to "false".',this),this.boundingSphere.set(new J,1/0);return}if(t){const n=this.boundingSphere.center;if(Sn.setFromBufferAttribute(t),e)for(let s=0,o=e.length;s<o;s++){const a=e[s];Mo.setFromBufferAttribute(a),this.morphTargetsRelative?(De.addVectors(Sn.min,Mo.min),Sn.expandByPoint(De),De.addVectors(Sn.max,Mo.max),Sn.expandByPoint(De)):(Sn.expandByPoint(Mo.min),Sn.expandByPoint(Mo.max))}Sn.getCenter(n);let i=0;for(let s=0,o=t.count;s<o;s++)De.fromBufferAttribute(t,s),i=Math.max(i,n.distanceToSquared(De));if(e)for(let s=0,o=e.length;s<o;s++){const a=e[s],l=this.morphTargetsRelative;for(let c=0,u=a.count;c<u;c++)De.fromBufferAttribute(a,c),l&&(ws.fromBufferAttribute(t,c),De.add(ws)),i=Math.max(i,n.distanceToSquared(De))}this.boundingSphere.radius=Math.sqrt(i),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=t.array,i=e.position.array,s=e.normal.array,o=e.uv.array,a=i.length/3;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new bi(new Float32Array(4*a),4));const l=this.getAttribute("tangent").array,c=[],u=[];for(let D=0;D<a;D++)c[D]=new J,u[D]=new J;const h=new J,f=new J,d=new J,g=new vt,p=new vt,m=new vt,_=new J,M=new J;function b(D,B,k){h.fromArray(i,D*3),f.fromArray(i,B*3),d.fromArray(i,k*3),g.fromArray(o,D*2),p.fromArray(o,B*2),m.fromArray(o,k*2),f.sub(h),d.sub(h),p.sub(g),m.sub(g);const Z=1/(p.x*m.y-m.x*p.y);isFinite(Z)&&(_.copy(f).multiplyScalar(m.y).addScaledVector(d,-p.y).multiplyScalar(Z),M.copy(d).multiplyScalar(p.x).addScaledVector(f,-m.x).multiplyScalar(Z),c[D].add(_),c[B].add(_),c[k].add(_),u[D].add(M),u[B].add(M),u[k].add(M))}let x=this.groups;x.length===0&&(x=[{start:0,count:n.length}]);for(let D=0,B=x.length;D<B;++D){const k=x[D],Z=k.start,V=k.count;for(let $=Z,Y=Z+V;$<Y;$+=3)b(n[$+0],n[$+1],n[$+2])}const v=new J,E=new J,C=new J,y=new J;function w(D){C.fromArray(s,D*3),y.copy(C);const B=c[D];v.copy(B),v.sub(C.multiplyScalar(C.dot(B))).normalize(),E.crossVectors(y,B);const Z=E.dot(u[D])<0?-1:1;l[D*4]=v.x,l[D*4+1]=v.y,l[D*4+2]=v.z,l[D*4+3]=Z}for(let D=0,B=x.length;D<B;++D){const k=x[D],Z=k.start,V=k.count;for(let $=Z,Y=Z+V;$<Y;$+=3)w(n[$+0]),w(n[$+1]),w(n[$+2])}}computeVertexNormals(){const t=this.index,e=this.getAttribute("position");if(e!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new bi(new Float32Array(e.count*3),3),this.setAttribute("normal",n);else for(let f=0,d=n.count;f<d;f++)n.setXYZ(f,0,0,0);const i=new J,s=new J,o=new J,a=new J,l=new J,c=new J,u=new J,h=new J;if(t)for(let f=0,d=t.count;f<d;f+=3){const g=t.getX(f+0),p=t.getX(f+1),m=t.getX(f+2);i.fromBufferAttribute(e,g),s.fromBufferAttribute(e,p),o.fromBufferAttribute(e,m),u.subVectors(o,s),h.subVectors(i,s),u.cross(h),a.fromBufferAttribute(n,g),l.fromBufferAttribute(n,p),c.fromBufferAttribute(n,m),a.add(u),l.add(u),c.add(u),n.setXYZ(g,a.x,a.y,a.z),n.setXYZ(p,l.x,l.y,l.z),n.setXYZ(m,c.x,c.y,c.z)}else for(let f=0,d=e.count;f<d;f+=3)i.fromBufferAttribute(e,f+0),s.fromBufferAttribute(e,f+1),o.fromBufferAttribute(e,f+2),u.subVectors(o,s),h.subVectors(i,s),u.cross(h),n.setXYZ(f+0,u.x,u.y,u.z),n.setXYZ(f+1,u.x,u.y,u.z),n.setXYZ(f+2,u.x,u.y,u.z);this.normalizeNormals(),n.needsUpdate=!0}}merge(t,e){if(!(t&&t.isBufferGeometry)){console.error("THREE.BufferGeometry.merge(): geometry not an instance of THREE.BufferGeometry.",t);return}e===void 0&&(e=0,console.warn("THREE.BufferGeometry.merge(): Overwriting original geometry, starting at offset=0. Use BufferGeometryUtils.mergeBufferGeometries() for lossless merge."));const n=this.attributes;for(const i in n){if(t.attributes[i]===void 0)continue;const o=n[i].array,a=t.attributes[i],l=a.array,c=a.itemSize*e,u=Math.min(l.length,o.length-c);for(let h=0,f=c;h<u;h++,f++)o[f]=l[h]}return this}normalizeNormals(){const t=this.attributes.normal;for(let e=0,n=t.count;e<n;e++)De.fromBufferAttribute(t,e),De.normalize(),t.setXYZ(e,De.x,De.y,De.z)}toNonIndexed(){function t(a,l){const c=a.array,u=a.itemSize,h=a.normalized,f=new c.constructor(l.length*u);let d=0,g=0;for(let p=0,m=l.length;p<m;p++){a.isInterleavedBufferAttribute?d=l[p]*a.data.stride+a.offset:d=l[p]*u;for(let _=0;_<u;_++)f[g++]=c[d++]}return new bi(f,u,h)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const e=new Zi,n=this.index.array,i=this.attributes;for(const a in i){const l=i[a],c=t(l,n);e.setAttribute(a,c)}const s=this.morphAttributes;for(const a in s){const l=[],c=s[a];for(let u=0,h=c.length;u<h;u++){const f=c[u],d=t(f,n);l.push(d)}e.morphAttributes[a]=l}e.morphTargetsRelative=this.morphTargetsRelative;const o=this.groups;for(let a=0,l=o.length;a<l;a++){const c=o[a];e.addGroup(c.start,c.count,c.materialIndex)}return e}toJSON(){const t={metadata:{version:4.5,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.type,this.name!==""&&(t.name=this.name),Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(t[c]=l[c]);return t}t.data={attributes:{}};const e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});const n=this.attributes;for(const l in n){const c=n[l];t.data.attributes[l]=c.toJSON(t.data)}const i={};let s=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],u=[];for(let h=0,f=c.length;h<f;h++){const d=c[h];u.push(d.toJSON(t.data))}u.length>0&&(i[l]=u,s=!0)}s&&(t.data.morphAttributes=i,t.data.morphTargetsRelative=this.morphTargetsRelative);const o=this.groups;o.length>0&&(t.data.groups=JSON.parse(JSON.stringify(o)));const a=this.boundingSphere;return a!==null&&(t.data.boundingSphere={center:a.center.toArray(),radius:a.radius}),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const e={};this.name=t.name;const n=t.index;n!==null&&this.setIndex(n.clone(e));const i=t.attributes;for(const c in i){const u=i[c];this.setAttribute(c,u.clone(e))}const s=t.morphAttributes;for(const c in s){const u=[],h=s[c];for(let f=0,d=h.length;f<d;f++)u.push(h[f].clone(e));this.morphAttributes[c]=u}this.morphTargetsRelative=t.morphTargetsRelative;const o=t.groups;for(let c=0,u=o.length;c<u;c++){const h=o[c];this.addGroup(h.start,h.count,h.materialIndex)}const a=t.boundingBox;a!==null&&(this.boundingBox=a.clone());const l=t.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,t.parameters!==void 0&&(this.parameters=Object.assign({},t.parameters)),this}dispose(){this.dispatchEvent({type:"dispose"})}}const Xd=new Ne,Ts=new Yg,Zc=new ic,nr=new J,ir=new J,rr=new J,Jc=new J,Kc=new J,Qc=new J,Va=new J,Ga=new J,Ha=new J,Wa=new vt,Xa=new vt,qa=new vt,tu=new J,Ya=new J;class fr extends Yn{constructor(t=new Zi,e=new Yh){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=t.material,this.geometry=t.geometry,this}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const i=e[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,o=i.length;s<o;s++){const a=i[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=s}}}}raycast(t,e){const n=this.geometry,i=this.material,s=this.matrixWorld;if(i===void 0||(n.boundingSphere===null&&n.computeBoundingSphere(),Zc.copy(n.boundingSphere),Zc.applyMatrix4(s),t.ray.intersectsSphere(Zc)===!1)||(Xd.copy(s).invert(),Ts.copy(t.ray).applyMatrix4(Xd),n.boundingBox!==null&&Ts.intersectsBox(n.boundingBox)===!1))return;let o;const a=n.index,l=n.attributes.position,c=n.morphAttributes.position,u=n.morphTargetsRelative,h=n.attributes.uv,f=n.attributes.uv2,d=n.groups,g=n.drawRange;if(a!==null)if(Array.isArray(i))for(let p=0,m=d.length;p<m;p++){const _=d[p],M=i[_.materialIndex],b=Math.max(_.start,g.start),x=Math.min(a.count,Math.min(_.start+_.count,g.start+g.count));for(let v=b,E=x;v<E;v+=3){const C=a.getX(v),y=a.getX(v+1),w=a.getX(v+2);o=$a(this,M,t,Ts,l,c,u,h,f,C,y,w),o&&(o.faceIndex=Math.floor(v/3),o.face.materialIndex=_.materialIndex,e.push(o))}}else{const p=Math.max(0,g.start),m=Math.min(a.count,g.start+g.count);for(let _=p,M=m;_<M;_+=3){const b=a.getX(_),x=a.getX(_+1),v=a.getX(_+2);o=$a(this,i,t,Ts,l,c,u,h,f,b,x,v),o&&(o.faceIndex=Math.floor(_/3),e.push(o))}}else if(l!==void 0)if(Array.isArray(i))for(let p=0,m=d.length;p<m;p++){const _=d[p],M=i[_.materialIndex],b=Math.max(_.start,g.start),x=Math.min(l.count,Math.min(_.start+_.count,g.start+g.count));for(let v=b,E=x;v<E;v+=3){const C=v,y=v+1,w=v+2;o=$a(this,M,t,Ts,l,c,u,h,f,C,y,w),o&&(o.faceIndex=Math.floor(v/3),o.face.materialIndex=_.materialIndex,e.push(o))}}else{const p=Math.max(0,g.start),m=Math.min(l.count,g.start+g.count);for(let _=p,M=m;_<M;_+=3){const b=_,x=_+1,v=_+2;o=$a(this,i,t,Ts,l,c,u,h,f,b,x,v),o&&(o.faceIndex=Math.floor(_/3),e.push(o))}}}}function gy(r,t,e,n,i,s,o,a){let l;if(t.side===si?l=n.intersectTriangle(o,s,i,!0,a):l=n.intersectTriangle(i,s,o,t.side!==oo,a),l===null)return null;Ya.copy(a),Ya.applyMatrix4(r.matrixWorld);const c=e.ray.origin.distanceTo(Ya);return c<e.near||c>e.far?null:{distance:c,point:Ya.clone(),object:r}}function $a(r,t,e,n,i,s,o,a,l,c,u,h){nr.fromBufferAttribute(i,c),ir.fromBufferAttribute(i,u),rr.fromBufferAttribute(i,h);const f=r.morphTargetInfluences;if(s&&f){Va.set(0,0,0),Ga.set(0,0,0),Ha.set(0,0,0);for(let g=0,p=s.length;g<p;g++){const m=f[g],_=s[g];m!==0&&(Jc.fromBufferAttribute(_,c),Kc.fromBufferAttribute(_,u),Qc.fromBufferAttribute(_,h),o?(Va.addScaledVector(Jc,m),Ga.addScaledVector(Kc,m),Ha.addScaledVector(Qc,m)):(Va.addScaledVector(Jc.sub(nr),m),Ga.addScaledVector(Kc.sub(ir),m),Ha.addScaledVector(Qc.sub(rr),m)))}nr.add(Va),ir.add(Ga),rr.add(Ha)}r.isSkinnedMesh&&(r.boneTransform(c,nr),r.boneTransform(u,ir),r.boneTransform(h,rr));const d=gy(r,t,e,n,nr,ir,rr,tu);if(d){a&&(Wa.fromBufferAttribute(a,c),Xa.fromBufferAttribute(a,u),qa.fromBufferAttribute(a,h),d.uv=Gi.getUV(tu,nr,ir,rr,Wa,Xa,qa,new vt)),l&&(Wa.fromBufferAttribute(l,c),Xa.fromBufferAttribute(l,u),qa.fromBufferAttribute(l,h),d.uv2=Gi.getUV(tu,nr,ir,rr,Wa,Xa,qa,new vt));const g={a:c,b:u,c:h,normal:new J,materialIndex:0};Gi.getNormal(nr,ir,rr,g.normal),d.face=g}return d}class pa extends Zi{constructor(t=1,e=1,n=1,i=1,s=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:n,widthSegments:i,heightSegments:s,depthSegments:o};const a=this;i=Math.floor(i),s=Math.floor(s),o=Math.floor(o);const l=[],c=[],u=[],h=[];let f=0,d=0;g("z","y","x",-1,-1,n,e,t,o,s,0),g("z","y","x",1,-1,n,e,-t,o,s,1),g("x","z","y",1,1,t,n,e,i,o,2),g("x","z","y",1,-1,t,n,-e,i,o,3),g("x","y","z",1,-1,t,e,n,i,s,4),g("x","y","z",-1,-1,t,e,-n,i,s,5),this.setIndex(l),this.setAttribute("position",new wi(c,3)),this.setAttribute("normal",new wi(u,3)),this.setAttribute("uv",new wi(h,2));function g(p,m,_,M,b,x,v,E,C,y,w){const D=x/C,B=v/y,k=x/2,Z=v/2,V=E/2,$=C+1,Y=y+1;let H=0,G=0;const q=new J;for(let P=0;P<Y;P++){const nt=P*B-Z;for(let A=0;A<$;A++){const O=A*D-k;q[p]=O*M,q[m]=nt*b,q[_]=V,c.push(q.x,q.y,q.z),q[p]=0,q[m]=0,q[_]=E>0?1:-1,u.push(q.x,q.y,q.z),h.push(A/C),h.push(1-P/y),H+=1}}for(let P=0;P<y;P++)for(let nt=0;nt<C;nt++){const A=f+nt+$*P,O=f+nt+$*(P+1),T=f+(nt+1)+$*(P+1),I=f+(nt+1)+$*P;l.push(A,O,I),l.push(O,T,I),G+=6}a.addGroup(d,G,w),d+=G,f+=H}}static fromJSON(t){return new pa(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}}function uo(r){const t={};for(const e in r){t[e]={};for(const n in r[e]){const i=r[e][n];i&&(i.isColor||i.isMatrix3||i.isMatrix4||i.isVector2||i.isVector3||i.isVector4||i.isTexture||i.isQuaternion)?t[e][n]=i.clone():Array.isArray(i)?t[e][n]=i.slice():t[e][n]=i}}return t}function He(r){const t={};for(let e=0;e<r.length;e++){const n=uo(r[e]);for(const i in n)t[i]=n[i]}return t}const _y={clone:uo,merge:He};var xy=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,vy=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class ji extends Be{constructor(t){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.vertexShader=xy,this.fragmentShader=vy,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.extensions={derivatives:!1,fragDepth:!1,drawBuffers:!1,shaderTextureLOD:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv2:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&(t.attributes!==void 0&&console.error("THREE.ShaderMaterial: attributes should now be defined in THREE.BufferGeometry instead."),this.setValues(t))}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=uo(t.uniforms),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this}toJSON(t){const e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(const i in this.uniforms){const o=this.uniforms[i].value;o&&o.isTexture?e.uniforms[i]={type:"t",value:o.toJSON(t).uuid}:o&&o.isColor?e.uniforms[i]={type:"c",value:o.getHex()}:o&&o.isVector2?e.uniforms[i]={type:"v2",value:o.toArray()}:o&&o.isVector3?e.uniforms[i]={type:"v3",value:o.toArray()}:o&&o.isVector4?e.uniforms[i]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?e.uniforms[i]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?e.uniforms[i]={type:"m4",value:o.toArray()}:e.uniforms[i]={value:o}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader;const n={};for(const i in this.extensions)this.extensions[i]===!0&&(n[i]=!0);return Object.keys(n).length>0&&(e.extensions=n),e}}class Jg extends Yn{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Ne,this.projectionMatrix=new Ne,this.projectionMatrixInverse=new Ne}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this}getWorldDirection(t){this.updateWorldMatrix(!0,!1);const e=this.matrixWorld.elements;return t.set(-e[8],-e[9],-e[10]).normalize()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(t,e){super.updateWorldMatrix(t,e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}class ni extends Jg{constructor(t=50,e=1,n=.1,i=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=n,this.far=i,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){const e=.5*this.getFilmHeight()/t;this.fov=Id*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){const t=Math.tan(Ic*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return Id*2*Math.atan(Math.tan(Ic*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}setViewOffset(t,e,n,i,s,o){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=i,this.view.width=s,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=this.near;let e=t*Math.tan(Ic*.5*this.fov)/this.zoom,n=2*e,i=this.aspect*n,s=-.5*i;const o=this.view;if(this.view!==null&&this.view.enabled){const l=o.fullWidth,c=o.fullHeight;s+=o.offsetX*i/l,e-=o.offsetY*n/c,i*=o.width/l,n*=o.height/c}const a=this.filmOffset;a!==0&&(s+=t*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+i,e,e-n,t,this.far),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}}const Es=90,Cs=1;class yy extends Yn{constructor(t,e,n){if(super(),this.type="CubeCamera",n.isWebGLCubeRenderTarget!==!0){console.error("THREE.CubeCamera: The constructor now expects an instance of WebGLCubeRenderTarget as third parameter.");return}this.renderTarget=n;const i=new ni(Es,Cs,t,e);i.layers=this.layers,i.up.set(0,-1,0),i.lookAt(new J(1,0,0)),this.add(i);const s=new ni(Es,Cs,t,e);s.layers=this.layers,s.up.set(0,-1,0),s.lookAt(new J(-1,0,0)),this.add(s);const o=new ni(Es,Cs,t,e);o.layers=this.layers,o.up.set(0,0,1),o.lookAt(new J(0,1,0)),this.add(o);const a=new ni(Es,Cs,t,e);a.layers=this.layers,a.up.set(0,0,-1),a.lookAt(new J(0,-1,0)),this.add(a);const l=new ni(Es,Cs,t,e);l.layers=this.layers,l.up.set(0,-1,0),l.lookAt(new J(0,0,1)),this.add(l);const c=new ni(Es,Cs,t,e);c.layers=this.layers,c.up.set(0,-1,0),c.lookAt(new J(0,0,-1)),this.add(c)}update(t,e){this.parent===null&&this.updateMatrixWorld();const n=this.renderTarget,[i,s,o,a,l,c]=this.children,u=t.getRenderTarget(),h=t.toneMapping,f=t.xr.enabled;t.toneMapping=Xi,t.xr.enabled=!1;const d=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,t.setRenderTarget(n,0),t.render(e,i),t.setRenderTarget(n,1),t.render(e,s),t.setRenderTarget(n,2),t.render(e,o),t.setRenderTarget(n,3),t.render(e,a),t.setRenderTarget(n,4),t.render(e,l),n.texture.generateMipmaps=d,t.setRenderTarget(n,5),t.render(e,c),t.setRenderTarget(u),t.toneMapping=h,t.xr.enabled=f,n.texture.needsPMREMUpdate=!0}}class Kg extends qn{constructor(t,e,n,i,s,o,a,l,c,u){t=t!==void 0?t:[],e=e!==void 0?e:ao,super(t,e,n,i,s,o,a,l,c,u),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}}class My extends vr{constructor(t,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;const n={width:t,height:t,depth:1},i=[n,n,n,n,n,n];this.texture=new Kg(i,e.mapping,e.wrapS,e.wrapT,e.magFilter,e.minFilter,e.format,e.type,e.anisotropy,e.encoding),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=e.generateMipmaps!==void 0?e.generateMipmaps:!1,this.texture.minFilter=e.minFilter!==void 0?e.minFilter:Gn}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.encoding=e.encoding,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},i=new pa(5,5,5),s=new ji({name:"CubemapFromEquirect",uniforms:uo(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:si,blending:xr});s.uniforms.tEquirect.value=e;const o=new fr(i,s),a=e.minFilter;return e.minFilter===nc&&(e.minFilter=Gn),new yy(1,10,this).update(t,o),e.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(t,e,n,i){const s=t.getRenderTarget();for(let o=0;o<6;o++)t.setRenderTarget(this,o),t.clear(e,n,i);t.setRenderTarget(s)}}const eu=new J,Sy=new J,by=new Xe;class Nr{constructor(t=new J(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,n,i){return this.normal.set(t,e,n),this.constant=i,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,n){const i=eu.subVectors(n,e).cross(Sy.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(i,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){const t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(this.normal).multiplyScalar(-this.distanceToPoint(t)).add(t)}intersectLine(t,e){const n=t.delta(eu),i=this.normal.dot(n);if(i===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;const s=-(t.start.dot(this.normal)+this.constant)/i;return s<0||s>1?null:e.copy(n).multiplyScalar(s).add(t.start)}intersectsLine(t){const e=this.distanceToPoint(t.start),n=this.distanceToPoint(t.end);return e<0&&n>0||n<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){const n=e||by.getNormalMatrix(t),i=this.coplanarPoint(eu).applyMatrix4(t),s=this.normal.applyMatrix3(n).normalize();return this.constant=-i.dot(s),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}}const As=new ic,ja=new J;class Qg{constructor(t=new Nr,e=new Nr,n=new Nr,i=new Nr,s=new Nr,o=new Nr){this.planes=[t,e,n,i,s,o]}set(t,e,n,i,s,o){const a=this.planes;return a[0].copy(t),a[1].copy(e),a[2].copy(n),a[3].copy(i),a[4].copy(s),a[5].copy(o),this}copy(t){const e=this.planes;for(let n=0;n<6;n++)e[n].copy(t.planes[n]);return this}setFromProjectionMatrix(t){const e=this.planes,n=t.elements,i=n[0],s=n[1],o=n[2],a=n[3],l=n[4],c=n[5],u=n[6],h=n[7],f=n[8],d=n[9],g=n[10],p=n[11],m=n[12],_=n[13],M=n[14],b=n[15];return e[0].setComponents(a-i,h-l,p-f,b-m).normalize(),e[1].setComponents(a+i,h+l,p+f,b+m).normalize(),e[2].setComponents(a+s,h+c,p+d,b+_).normalize(),e[3].setComponents(a-s,h-c,p-d,b-_).normalize(),e[4].setComponents(a-o,h-u,p-g,b-M).normalize(),e[5].setComponents(a+o,h+u,p+g,b+M).normalize(),this}intersectsObject(t){const e=t.geometry;return e.boundingSphere===null&&e.computeBoundingSphere(),As.copy(e.boundingSphere).applyMatrix4(t.matrixWorld),this.intersectsSphere(As)}intersectsSprite(t){return As.center.set(0,0,0),As.radius=.7071067811865476,As.applyMatrix4(t.matrixWorld),this.intersectsSphere(As)}intersectsSphere(t){const e=this.planes,n=t.center,i=-t.radius;for(let s=0;s<6;s++)if(e[s].distanceToPoint(n)<i)return!1;return!0}intersectsBox(t){const e=this.planes;for(let n=0;n<6;n++){const i=e[n];if(ja.x=i.normal.x>0?t.max.x:t.min.x,ja.y=i.normal.y>0?t.max.y:t.min.y,ja.z=i.normal.z>0?t.max.z:t.min.z,i.distanceToPoint(ja)<0)return!1}return!0}containsPoint(t){const e=this.planes;for(let n=0;n<6;n++)if(e[n].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function t_(){let r=null,t=!1,e=null,n=null;function i(s,o){e(s,o),n=r.requestAnimationFrame(i)}return{start:function(){t!==!0&&e!==null&&(n=r.requestAnimationFrame(i),t=!0)},stop:function(){r.cancelAnimationFrame(n),t=!1},setAnimationLoop:function(s){e=s},setContext:function(s){r=s}}}function wy(r,t){const e=t.isWebGL2,n=new WeakMap;function i(c,u){const h=c.array,f=c.usage,d=r.createBuffer();r.bindBuffer(u,d),r.bufferData(u,h,f),c.onUploadCallback();let g;if(h instanceof Float32Array)g=5126;else if(h instanceof Uint16Array)if(c.isFloat16BufferAttribute)if(e)g=5131;else throw new Error("THREE.WebGLAttributes: Usage of Float16BufferAttribute requires WebGL2.");else g=5123;else if(h instanceof Int16Array)g=5122;else if(h instanceof Uint32Array)g=5125;else if(h instanceof Int32Array)g=5124;else if(h instanceof Int8Array)g=5120;else if(h instanceof Uint8Array)g=5121;else if(h instanceof Uint8ClampedArray)g=5121;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+h);return{buffer:d,type:g,bytesPerElement:h.BYTES_PER_ELEMENT,version:c.version}}function s(c,u,h){const f=u.array,d=u.updateRange;r.bindBuffer(h,c),d.count===-1?r.bufferSubData(h,0,f):(e?r.bufferSubData(h,d.offset*f.BYTES_PER_ELEMENT,f,d.offset,d.count):r.bufferSubData(h,d.offset*f.BYTES_PER_ELEMENT,f.subarray(d.offset,d.offset+d.count)),d.count=-1)}function o(c){return c.isInterleavedBufferAttribute&&(c=c.data),n.get(c)}function a(c){c.isInterleavedBufferAttribute&&(c=c.data);const u=n.get(c);u&&(r.deleteBuffer(u.buffer),n.delete(c))}function l(c,u){if(c.isGLBufferAttribute){const f=n.get(c);(!f||f.version<c.version)&&n.set(c,{buffer:c.buffer,type:c.type,bytesPerElement:c.elementSize,version:c.version});return}c.isInterleavedBufferAttribute&&(c=c.data);const h=n.get(c);h===void 0?n.set(c,i(c,u)):h.version<c.version&&(s(h.buffer,c,u),h.version=c.version)}return{get:o,remove:a,update:l}}class $h extends Zi{constructor(t=1,e=1,n=1,i=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:n,heightSegments:i};const s=t/2,o=e/2,a=Math.floor(n),l=Math.floor(i),c=a+1,u=l+1,h=t/a,f=e/l,d=[],g=[],p=[],m=[];for(let _=0;_<u;_++){const M=_*f-o;for(let b=0;b<c;b++){const x=b*h-s;g.push(x,-M,0),p.push(0,0,1),m.push(b/a),m.push(1-_/l)}}for(let _=0;_<l;_++)for(let M=0;M<a;M++){const b=M+c*_,x=M+c*(_+1),v=M+1+c*(_+1),E=M+1+c*_;d.push(b,x,E),d.push(x,v,E)}this.setIndex(d),this.setAttribute("position",new wi(g,3)),this.setAttribute("normal",new wi(p,3)),this.setAttribute("uv",new wi(m,2))}static fromJSON(t){return new $h(t.width,t.height,t.widthSegments,t.heightSegments)}}var Ty=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vUv ).g;
#endif`,Ey=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Cy=`#ifdef USE_ALPHATEST
	if ( diffuseColor.a < alphaTest ) discard;
#endif`,Ay=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Py=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vUv2 ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometry.normal, geometry.viewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,Ly=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Dy="vec3 transformed = vec3( position );",Ry=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Iy=`vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 f0, const in float f90, const in float roughness ) {
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
	float D = D_GGX( alpha, dotNH );
	return F * ( V * D );
}
#ifdef USE_IRIDESCENCE
vec3 BRDF_GGX_Iridescence( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 f0, const in float f90, const in float iridescence, const in vec3 iridescenceFresnel, const in float roughness ) {
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = mix(F_Schlick( f0, f90, dotVH ), iridescenceFresnel, iridescence);
	float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
	float D = D_GGX( alpha, dotNH );
	return F * ( V * D );
}
#endif
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif`,Oy=`#ifdef USE_IRIDESCENCE
const mat3 XYZ_TO_REC709 = mat3(
    3.2404542, -0.9692660,  0.0556434,
   -1.5371385,  1.8760108, -0.2040259,
   -0.4985314,  0.0415560,  1.0572252
);
vec3 Fresnel0ToIor( vec3 fresnel0 ) {
   vec3 sqrtF0 = sqrt( fresnel0 );
   return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
}
vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
   return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
}
float IorToFresnel0( float transmittedIor, float incidentIor ) {
   return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
}
vec3 evalSensitivity( float OPD, vec3 shift ) {
   float phase = 2.0 * PI * OPD * 1.0e-9;
   vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
   vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
   vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
   vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( -pow2( phase ) * var );
   xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[0] ) * exp( -4.5282e+09 * pow2( phase ) );
   xyz /= 1.0685e-7;
   vec3 srgb = XYZ_TO_REC709 * xyz;
   return srgb;
}
vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
   vec3 I;
   float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
   float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
   float cosTheta2Sq = 1.0 - sinTheta2Sq;
   if ( cosTheta2Sq < 0.0 ) {
       return vec3( 1.0 );
   }
   float cosTheta2 = sqrt( cosTheta2Sq );
   float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
   float R12 = F_Schlick( R0, 1.0, cosTheta1 );
   float R21 = R12;
   float T121 = 1.0 - R12;
   float phi12 = 0.0;
   if ( iridescenceIOR < outsideIOR ) phi12 = PI;
   float phi21 = PI - phi12;
   vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );   vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
   vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
   vec3 phi23 = vec3( 0.0 );
   if ( baseIOR[0] < iridescenceIOR ) phi23[0] = PI;
   if ( baseIOR[1] < iridescenceIOR ) phi23[1] = PI;
   if ( baseIOR[2] < iridescenceIOR ) phi23[2] = PI;
   float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
   vec3 phi = vec3( phi21 ) + phi23;
   vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
   vec3 r123 = sqrt( R123 );
   vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
   vec3 C0 = R12 + Rs;
   I = C0;
   vec3 Cm = Rs - T121;
   for ( int m = 1; m <= 2; ++m ) {
       Cm *= r123;
       vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
       I += Cm * Sm;
   }
   return max( I, vec3( 0.0 ) );
}
#endif`,Ny=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vUv );
		vec2 dSTdy = dFdy( vUv );
		float Hll = bumpScale * texture2D( bumpMap, vUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = vec3( dFdx( surf_pos.x ), dFdx( surf_pos.y ), dFdx( surf_pos.z ) );
		vec3 vSigmaY = vec3( dFdy( surf_pos.x ), dFdy( surf_pos.y ), dFdy( surf_pos.z ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,Fy=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#pragma unroll_loop_start
	for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
		plane = clippingPlanes[ i ];
		if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
	}
	#pragma unroll_loop_end
	#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
		bool clipped = true;
		#pragma unroll_loop_start
		for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
		}
		#pragma unroll_loop_end
		if ( clipped ) discard;
	#endif
#endif`,zy=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,ky=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Uy=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,By=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,Vy=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,Gy=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	varying vec3 vColor;
#endif`,Hy=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif`,Wy=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 color ) { return dot( color, vec3( 0.3333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
struct GeometricContext {
	vec3 position;
	vec3 normal;
	vec3 viewDir;
#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal;
#endif
};
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
float linearToRelativeLuminance( const in vec3 color ) {
	vec3 weights = vec3( 0.2126, 0.7152, 0.0722 );
	return dot( weights, color.rgb );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}`,Xy=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define r0 1.0
	#define v0 0.339
	#define m0 - 2.0
	#define r1 0.8
	#define v1 0.276
	#define m1 - 1.0
	#define r4 0.4
	#define v4 0.046
	#define m4 2.0
	#define r5 0.305
	#define v5 0.016
	#define m5 3.0
	#define r6 0.21
	#define v6 0.0038
	#define m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= r1 ) {
			mip = ( r0 - roughness ) * ( m1 - m0 ) / ( r0 - r1 ) + m0;
		} else if ( roughness >= r4 ) {
			mip = ( r1 - roughness ) * ( m4 - m1 ) / ( r1 - r4 ) + m1;
		} else if ( roughness >= r5 ) {
			mip = ( r4 - roughness ) * ( m5 - m4 ) / ( r4 - r5 ) + m4;
		} else if ( roughness >= r6 ) {
			mip = ( r5 - roughness ) * ( m6 - m5 ) / ( r5 - r6 ) + m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,qy=`vec3 transformedNormal = objectNormal;
#ifdef USE_INSTANCING
	mat3 m = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( m[ 0 ], m[ 0 ] ), dot( m[ 1 ], m[ 1 ] ), dot( m[ 2 ], m[ 2 ] ) );
	transformedNormal = m * transformedNormal;
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	vec3 transformedTangent = ( modelViewMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,Yy=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,$y=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vUv ).x * displacementScale + displacementBias );
#endif`,jy=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vUv );
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Zy=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Jy="gl_FragColor = linearToOutputTexel( gl_FragColor );",Ky=`vec4 LinearToLinear( in vec4 value ) {
	return value;
}
vec4 LinearTosRGB( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,Qy=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 envColor = textureCubeUV( envMap, reflectVec, 0.0 );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,tM=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,eM=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,nM=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) ||defined( PHONG )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,iM=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,rM=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,sM=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,oM=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,aM=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,lM=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		return ( coord.x < 0.7 ) ? vec3( 0.7 ) : vec3( 1.0 );
	#endif
}`,cM=`#ifdef USE_LIGHTMAP
	vec4 lightMapTexel = texture2D( lightMap, vUv2 );
	vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
	reflectedLight.indirectDiffuse += lightMapIrradiance;
#endif`,uM=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,hM=`vec3 diffuse = vec3( 1.0 );
GeometricContext geometry;
geometry.position = mvPosition.xyz;
geometry.normal = normalize( transformedNormal );
geometry.viewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( -mvPosition.xyz );
GeometricContext backGeometry;
backGeometry.position = geometry.position;
backGeometry.normal = -geometry.normal;
backGeometry.viewDir = geometry.viewDir;
vLightFront = vec3( 0.0 );
vIndirectFront = vec3( 0.0 );
#ifdef DOUBLE_SIDED
	vLightBack = vec3( 0.0 );
	vIndirectBack = vec3( 0.0 );
#endif
IncidentLight directLight;
float dotNL;
vec3 directLightColor_Diffuse;
vIndirectFront += getAmbientLightIrradiance( ambientLightColor );
vIndirectFront += getLightProbeIrradiance( lightProbe, geometry.normal );
#ifdef DOUBLE_SIDED
	vIndirectBack += getAmbientLightIrradiance( ambientLightColor );
	vIndirectBack += getLightProbeIrradiance( lightProbe, backGeometry.normal );
#endif
#if NUM_POINT_LIGHTS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		getPointLightInfo( pointLights[ i ], geometry, directLight );
		dotNL = dot( geometry.normal, directLight.direction );
		directLightColor_Diffuse = directLight.color;
		vLightFront += saturate( dotNL ) * directLightColor_Diffuse;
		#ifdef DOUBLE_SIDED
			vLightBack += saturate( - dotNL ) * directLightColor_Diffuse;
		#endif
	}
	#pragma unroll_loop_end
#endif
#if NUM_SPOT_LIGHTS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		getSpotLightInfo( spotLights[ i ], geometry, directLight );
		dotNL = dot( geometry.normal, directLight.direction );
		directLightColor_Diffuse = directLight.color;
		vLightFront += saturate( dotNL ) * directLightColor_Diffuse;
		#ifdef DOUBLE_SIDED
			vLightBack += saturate( - dotNL ) * directLightColor_Diffuse;
		#endif
	}
	#pragma unroll_loop_end
#endif
#if NUM_DIR_LIGHTS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		getDirectionalLightInfo( directionalLights[ i ], geometry, directLight );
		dotNL = dot( geometry.normal, directLight.direction );
		directLightColor_Diffuse = directLight.color;
		vLightFront += saturate( dotNL ) * directLightColor_Diffuse;
		#ifdef DOUBLE_SIDED
			vLightBack += saturate( - dotNL ) * directLightColor_Diffuse;
		#endif
	}
	#pragma unroll_loop_end
#endif
#if NUM_HEMI_LIGHTS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
		vIndirectFront += getHemisphereLightIrradiance( hemisphereLights[ i ], geometry.normal );
		#ifdef DOUBLE_SIDED
			vIndirectBack += getHemisphereLightIrradiance( hemisphereLights[ i ], backGeometry.normal );
		#endif
	}
	#pragma unroll_loop_end
#endif`,fM=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
uniform vec3 lightProbe[ 9 ];
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	#if defined ( PHYSICALLY_CORRECT_LIGHTS )
		float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
		if ( cutoffDistance > 0.0 ) {
			distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
		}
		return distanceFalloff;
	#else
		if ( cutoffDistance > 0.0 && decayExponent > 0.0 ) {
			return pow( saturate( - lightDistance / cutoffDistance + 1.0 ), decayExponent );
		}
		return 1.0;
	#endif
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, const in GeometricContext geometry, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in GeometricContext geometry, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometry.position;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in GeometricContext geometry, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometry.position;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,dM=`#if defined( USE_ENVMAP )
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#if defined( ENVMAP_TYPE_CUBE_UV )
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#if defined( ENVMAP_TYPE_CUBE_UV )
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
#endif`,pM=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,mM=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in GeometricContext geometry, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometry.normal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in GeometricContext geometry, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon
#define Material_LightProbeLOD( material )	(0)`,gM=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,_M=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in GeometricContext geometry, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometry.normal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometry.viewDir, geometry.normal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in GeometricContext geometry, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong
#define Material_LightProbeLOD( material )	(0)`,xM=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( geometryNormal ) ), abs( dFdy( geometryNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	#ifdef SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULARINTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vUv ).a;
		#endif
		#ifdef USE_SPECULARCOLORMAP
			specularColorFactor *= texture2D( specularColorMap, vUv ).rgb;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( ior - 1.0 ) / ( ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEENCOLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEENROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vUv ).a;
	#endif
#endif`,vM=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
};
vec3 clearcoatSpecular = vec3( 0.0 );
vec3 sheenSpecular = vec3( 0.0 );
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in GeometricContext geometry, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometry.normal;
		vec3 viewDir = geometry.viewDir;
		vec3 position = geometry.position;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in GeometricContext geometry, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometry.normal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometry.clearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecular += ccIrradiance * BRDF_GGX( directLight.direction, geometry.viewDir, geometry.clearcoatNormal, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecular += irradiance * BRDF_Sheen( directLight.direction, geometry.viewDir, geometry.normal, material.sheenColor, material.sheenRoughness );
	#endif
	#ifdef USE_IRIDESCENCE
		reflectedLight.directSpecular += irradiance * BRDF_GGX_Iridescence( directLight.direction, geometry.viewDir, geometry.normal, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness );
	#else
		reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometry.viewDir, geometry.normal, material.specularColor, material.specularF90, material.roughness );
	#endif
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in GeometricContext geometry, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in GeometricContext geometry, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecular += clearcoatRadiance * EnvironmentBRDF( geometry.clearcoatNormal, geometry.viewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecular += irradiance * material.sheenColor * IBLSheenBRDF( geometry.normal, geometry.viewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometry.normal, geometry.viewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometry.normal, geometry.viewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,yM=`
GeometricContext geometry;
geometry.position = - vViewPosition;
geometry.normal = normal;
geometry.viewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
#ifdef USE_CLEARCOAT
	geometry.clearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
float dotNVi = saturate( dot( normal, geometry.viewDir ) );
if ( material.iridescenceThickness == 0.0 ) {
	material.iridescence = 0.0;
} else {
	material.iridescence = saturate( material.iridescence );
}
if ( material.iridescence > 0.0 ) {
	material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
	material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometry, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= all( bvec2( directLight.visible, receiveShadow ) ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometry, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometry, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= all( bvec2( directLight.visible, receiveShadow ) ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometry, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, geometry, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= all( bvec2( directLight.visible, receiveShadow ) ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometry, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometry, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	irradiance += getLightProbeIrradiance( lightProbe, geometry.normal );
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometry.normal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,MM=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vUv2 );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometry.normal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	radiance += getIBLRadiance( geometry.viewDir, geometry.normal, material.roughness );
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometry.viewDir, geometry.clearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,SM=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometry, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometry, material, reflectedLight );
#endif`,bM=`#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	gl_FragDepthEXT = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,wM=`#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,TM=`#ifdef USE_LOGDEPTHBUF
	#ifdef USE_LOGDEPTHBUF_EXT
		varying float vFragDepth;
		varying float vIsPerspective;
	#else
		uniform float logDepthBufFC;
	#endif
#endif`,EM=`#ifdef USE_LOGDEPTHBUF
	#ifdef USE_LOGDEPTHBUF_EXT
		vFragDepth = 1.0 + gl_Position.w;
		vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
	#else
		if ( isPerspectiveMatrix( projectionMatrix ) ) {
			gl_Position.z = log2( max( EPSILON, gl_Position.w + 1.0 ) ) * logDepthBufFC - 1.0;
			gl_Position.z *= gl_Position.w;
		}
	#endif
#endif`,CM=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = vec4( mix( pow( sampledDiffuseColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), sampledDiffuseColor.rgb * 0.0773993808, vec3( lessThanEqual( sampledDiffuseColor.rgb, vec3( 0.04045 ) ) ) ), sampledDiffuseColor.w );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,AM=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,PM=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,LM=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	uniform mat3 uvTransform;
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,DM=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vUv );
	metalnessFactor *= texelMetalness.b;
#endif`,RM=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,IM=`#if defined( USE_MORPHCOLORS ) && defined( MORPHTARGETS_TEXTURE )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,OM=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	#ifdef MORPHTARGETS_TEXTURE
		for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
			if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
		}
	#else
		objectNormal += morphNormal0 * morphTargetInfluences[ 0 ];
		objectNormal += morphNormal1 * morphTargetInfluences[ 1 ];
		objectNormal += morphNormal2 * morphTargetInfluences[ 2 ];
		objectNormal += morphNormal3 * morphTargetInfluences[ 3 ];
	#endif
#endif`,NM=`#ifdef USE_MORPHTARGETS
	uniform float morphTargetBaseInfluence;
	#ifdef MORPHTARGETS_TEXTURE
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
		uniform sampler2DArray morphTargetsTexture;
		uniform ivec2 morphTargetsTextureSize;
		vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
			int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
			int y = texelIndex / morphTargetsTextureSize.x;
			int x = texelIndex - y * morphTargetsTextureSize.x;
			ivec3 morphUV = ivec3( x, y, morphTargetIndex );
			return texelFetch( morphTargetsTexture, morphUV, 0 );
		}
	#else
		#ifndef USE_MORPHNORMALS
			uniform float morphTargetInfluences[ 8 ];
		#else
			uniform float morphTargetInfluences[ 4 ];
		#endif
	#endif
#endif`,FM=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	#ifdef MORPHTARGETS_TEXTURE
		for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
			if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
		}
	#else
		transformed += morphTarget0 * morphTargetInfluences[ 0 ];
		transformed += morphTarget1 * morphTargetInfluences[ 1 ];
		transformed += morphTarget2 * morphTargetInfluences[ 2 ];
		transformed += morphTarget3 * morphTargetInfluences[ 3 ];
		#ifndef USE_MORPHNORMALS
			transformed += morphTarget4 * morphTargetInfluences[ 4 ];
			transformed += morphTarget5 * morphTargetInfluences[ 5 ];
			transformed += morphTarget6 * morphTargetInfluences[ 6 ];
			transformed += morphTarget7 * morphTargetInfluences[ 7 ];
		#endif
	#endif
#endif`,zM=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = vec3( dFdx( vViewPosition.x ), dFdx( vViewPosition.y ), dFdx( vViewPosition.z ) );
	vec3 fdy = vec3( dFdy( vViewPosition.x ), dFdy( vViewPosition.y ), dFdy( vViewPosition.z ) );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	#ifdef USE_TANGENT
		vec3 tangent = normalize( vTangent );
		vec3 bitangent = normalize( vBitangent );
		#ifdef DOUBLE_SIDED
			tangent = tangent * faceDirection;
			bitangent = bitangent * faceDirection;
		#endif
		#if defined( TANGENTSPACE_NORMALMAP ) || defined( USE_CLEARCOAT_NORMALMAP )
			mat3 vTBN = mat3( tangent, bitangent, normal );
		#endif
	#endif
#endif
vec3 geometryNormal = normal;`,kM=`#ifdef OBJECTSPACE_NORMALMAP
	normal = texture2D( normalMap, vUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( TANGENTSPACE_NORMALMAP )
	vec3 mapN = texture2D( normalMap, vUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	#ifdef USE_TANGENT
		normal = normalize( vTBN * mapN );
	#else
		normal = perturbNormal2Arb( - vViewPosition, normal, mapN, faceDirection );
	#endif
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,UM=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,BM=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,VM=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,GM=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef OBJECTSPACE_NORMALMAP
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( TANGENTSPACE_NORMALMAP ) || defined ( USE_CLEARCOAT_NORMALMAP ) )
	vec3 perturbNormal2Arb( vec3 eye_pos, vec3 surf_norm, vec3 mapN, float faceDirection ) {
		vec3 q0 = vec3( dFdx( eye_pos.x ), dFdx( eye_pos.y ), dFdx( eye_pos.z ) );
		vec3 q1 = vec3( dFdy( eye_pos.x ), dFdy( eye_pos.y ), dFdy( eye_pos.z ) );
		vec2 st0 = dFdx( vUv.st );
		vec2 st1 = dFdy( vUv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : faceDirection * inversesqrt( det );
		return normalize( T * ( mapN.x * scale ) + B * ( mapN.y * scale ) + N * mapN.z );
	}
#endif`,HM=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = geometryNormal;
#endif`,WM=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	#ifdef USE_TANGENT
		clearcoatNormal = normalize( vTBN * clearcoatMapN );
	#else
		clearcoatNormal = perturbNormal2Arb( - vViewPosition, clearcoatNormal, clearcoatMapN, faceDirection );
	#endif
#endif`,XM=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif`,qM=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,YM=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= transmissionAlpha + 0.1;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,$M=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;
const vec3 PackFactors = vec3( 256. * 256. * 256., 256. * 256., 256. );
const vec4 UnpackFactors = UnpackDownscale / vec4( PackFactors, 1. );
const float ShiftRight8 = 1. / 256.;
vec4 packDepthToRGBA( const in float v ) {
	vec4 r = vec4( fract( v * PackFactors ), v );
	r.yzw -= r.xyz * ShiftRight8;	return r * PackUpscale;
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors );
}
vec4 pack2HalfToRGBA( vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float linearClipZ, const in float near, const in float far ) {
	return linearClipZ * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float invClipZ, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * invClipZ - far );
}`,jM=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,ZM=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,JM=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,KM=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,QM=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vUv );
	roughnessFactor *= texelRoughness.g;
#endif`,tS=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,eS=`#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		varying vec4 vSpotShadowCoord[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		return step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow (sampler2D shadow, vec2 uv, float compare ){
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		float hard_shadow = step( compare , distribution.x );
		if (hard_shadow != 1.0 ) {
			float distance = compare - distribution.x ;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bvec4 inFrustumVec = bvec4 ( shadowCoord.x >= 0.0, shadowCoord.x <= 1.0, shadowCoord.y >= 0.0, shadowCoord.y <= 1.0 );
		bool inFrustum = all( inFrustumVec );
		bvec2 frustumTestVec = bvec2( inFrustum, shadowCoord.z <= 1.0 );
		bool frustumTest = all( frustumTestVec );
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ), 
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ), 
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ), 
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ), 
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ), 
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ), 
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return shadow;
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
		vec3 lightToPosition = shadowCoord.xyz;
		float dp = ( length( lightToPosition ) - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );		dp += shadowBias;
		vec3 bd3D = normalize( lightToPosition );
		#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
			vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
			return (
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
			) * ( 1.0 / 9.0 );
		#else
			return texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
		#endif
	}
#endif`,nS=`#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform mat4 spotShadowMatrix[ NUM_SPOT_LIGHT_SHADOWS ];
		varying vec4 vSpotShadowCoord[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,iS=`#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0 || NUM_SPOT_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0
		vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		vec4 shadowWorldPosition;
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
		vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias, 0 );
		vSpotShadowCoord[ i ] = spotShadowMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
		vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
	#endif
#endif`,rS=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowBias, spotLight.shadowRadius, vSpotShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,sS=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,oS=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	uniform int boneTextureSize;
	mat4 getBoneMatrix( const in float i ) {
		float j = i * 4.0;
		float x = mod( j, float( boneTextureSize ) );
		float y = floor( j / float( boneTextureSize ) );
		float dx = 1.0 / float( boneTextureSize );
		float dy = 1.0 / float( boneTextureSize );
		y = dy * ( y + 0.5 );
		vec4 v1 = texture2D( boneTexture, vec2( dx * ( x + 0.5 ), y ) );
		vec4 v2 = texture2D( boneTexture, vec2( dx * ( x + 1.5 ), y ) );
		vec4 v3 = texture2D( boneTexture, vec2( dx * ( x + 2.5 ), y ) );
		vec4 v4 = texture2D( boneTexture, vec2( dx * ( x + 3.5 ), y ) );
		mat4 bone = mat4( v1, v2, v3, v4 );
		return bone;
	}
#endif`,aS=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,lS=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,cS=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,uS=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,hS=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,fS=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return toneMappingExposure * color;
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 OptimizedCineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,dS=`#ifdef USE_TRANSMISSION
	float transmissionAlpha = 1.0;
	float transmissionFactor = transmission;
	float thicknessFactor = thickness;
	#ifdef USE_TRANSMISSIONMAP
		transmissionFactor *= texture2D( transmissionMap, vUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		thicknessFactor *= texture2D( thicknessMap, vUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmission = getIBLVolumeRefraction(
		n, v, roughnessFactor, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, ior, thicknessFactor,
		attenuationColor, attenuationDistance );
	totalDiffuse = mix( totalDiffuse, transmission.rgb, transmissionFactor );
	transmissionAlpha = mix( transmissionAlpha, transmission.a, transmissionFactor );
#endif`,pS=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float framebufferLod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		#ifdef texture2DLodEXT
			return texture2DLodEXT( transmissionSamplerMap, fragCoord.xy, framebufferLod );
		#else
			return texture2D( transmissionSamplerMap, fragCoord.xy, framebufferLod );
		#endif
	}
	vec3 applyVolumeAttenuation( const in vec3 radiance, const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( attenuationDistance == 0.0 ) {
			return radiance;
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance * radiance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
		vec3 refractedRayExit = position + transmissionRay;
		vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
		vec2 refractionCoords = ndcPos.xy / ndcPos.w;
		refractionCoords += 1.0;
		refractionCoords /= 2.0;
		vec4 transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
		vec3 attenuatedColor = applyVolumeAttenuation( transmittedLight.rgb, length( transmissionRay ), attenuationColor, attenuationDistance );
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		return vec4( ( 1.0 - F ) * attenuatedColor * diffuseColor, transmittedLight.a );
	}
#endif`,mS=`#if ( defined( USE_UV ) && ! defined( UVS_VERTEX_ONLY ) )
	varying vec2 vUv;
#endif`,gS=`#ifdef USE_UV
	#ifdef UVS_VERTEX_ONLY
		vec2 vUv;
	#else
		varying vec2 vUv;
	#endif
	uniform mat3 uvTransform;
#endif`,_S=`#ifdef USE_UV
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
#endif`,xS=`#if defined( USE_LIGHTMAP ) || defined( USE_AOMAP )
	varying vec2 vUv2;
#endif`,vS=`#if defined( USE_LIGHTMAP ) || defined( USE_AOMAP )
	attribute vec2 uv2;
	varying vec2 vUv2;
	uniform mat3 uv2Transform;
#endif`,yS=`#if defined( USE_LIGHTMAP ) || defined( USE_AOMAP )
	vUv2 = ( uv2Transform * vec3( uv2, 1 ) ).xy;
#endif`,MS=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION )
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const SS=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,bS=`uniform sampler2D t2D;
varying vec2 vUv;
void main() {
	gl_FragColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		gl_FragColor = vec4( mix( pow( gl_FragColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), gl_FragColor.rgb * 0.0773993808, vec3( lessThanEqual( gl_FragColor.rgb, vec3( 0.04045 ) ) ) ), gl_FragColor.w );
	#endif
	#include <tonemapping_fragment>
	#include <encodings_fragment>
}`,wS=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,TS=`#include <envmap_common_pars_fragment>
uniform float opacity;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	vec3 vReflect = vWorldDirection;
	#include <envmap_fragment>
	gl_FragColor = envColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <encodings_fragment>
}`,ES=`#include <common>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <skinbase_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,CS=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( 1.0 );
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <logdepthbuf_fragment>
	float fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#endif
}`,AS=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <skinbase_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,PS=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( 1.0 );
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,LS=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,DS=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <encodings_fragment>
}`,RS=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,IS=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <output_fragment>
	#include <tonemapping_fragment>
	#include <encodings_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,OS=`#include <common>
#include <uv_pars_vertex>
#include <uv2_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <uv2_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,NS=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <uv2_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vUv2 );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <output_fragment>
	#include <tonemapping_fragment>
	#include <encodings_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,FS=`#define LAMBERT
varying vec3 vLightFront;
varying vec3 vIndirectFront;
#ifdef DOUBLE_SIDED
	varying vec3 vLightBack;
	varying vec3 vIndirectBack;
#endif
#include <common>
#include <uv_pars_vertex>
#include <uv2_pars_vertex>
#include <envmap_pars_vertex>
#include <bsdfs>
#include <lights_pars_begin>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <uv2_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <lights_lambert_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,zS=`uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
varying vec3 vLightFront;
varying vec3 vIndirectFront;
#ifdef DOUBLE_SIDED
	varying vec3 vLightBack;
	varying vec3 vIndirectBack;
#endif
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <uv2_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <fog_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <specularmap_fragment>
	#include <emissivemap_fragment>
	#ifdef DOUBLE_SIDED
		reflectedLight.indirectDiffuse += ( gl_FrontFacing ) ? vIndirectFront : vIndirectBack;
	#else
		reflectedLight.indirectDiffuse += vIndirectFront;
	#endif
	#include <lightmap_fragment>
	reflectedLight.indirectDiffuse *= BRDF_Lambert( diffuseColor.rgb );
	#ifdef DOUBLE_SIDED
		reflectedLight.directDiffuse = ( gl_FrontFacing ) ? vLightFront : vLightBack;
	#else
		reflectedLight.directDiffuse = vLightFront;
	#endif
	reflectedLight.directDiffuse *= BRDF_Lambert( diffuseColor.rgb ) * getShadowMask();
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <output_fragment>
	#include <tonemapping_fragment>
	#include <encodings_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,kS=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,US=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <output_fragment>
	#include <tonemapping_fragment>
	#include <encodings_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,BS=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( TANGENTSPACE_NORMALMAP )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( TANGENTSPACE_NORMALMAP )
	vViewPosition = - mvPosition.xyz;
#endif
}`,VS=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( TANGENTSPACE_NORMALMAP )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), opacity );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,GS=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <uv_pars_vertex>
#include <uv2_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <uv2_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,HS=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <uv2_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <output_fragment>
	#include <tonemapping_fragment>
	#include <encodings_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,WS=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <uv_pars_vertex>
#include <uv2_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <uv2_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,XS=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULARINTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
	#ifdef USE_SPECULARCOLORMAP
		uniform sampler2D specularColorMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEENCOLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEENROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <uv2_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <bsdfs>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecular;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometry.clearcoatNormal, geometry.viewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + clearcoatSpecular * material.clearcoat;
	#endif
	#include <output_fragment>
	#include <tonemapping_fragment>
	#include <encodings_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,qS=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <uv_pars_vertex>
#include <uv2_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <uv2_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,YS=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <uv2_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <output_fragment>
	#include <tonemapping_fragment>
	#include <encodings_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,$S=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,jS=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <output_fragment>
	#include <tonemapping_fragment>
	#include <encodings_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,ZS=`#include <common>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,JS=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <encodings_fragment>
	#include <fog_fragment>
}`,KS=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix * vec4( 0.0, 0.0, 0.0, 1.0 );
	vec2 scale;
	scale.x = length( vec3( modelMatrix[ 0 ].x, modelMatrix[ 0 ].y, modelMatrix[ 0 ].z ) );
	scale.y = length( vec3( modelMatrix[ 1 ].x, modelMatrix[ 1 ].y, modelMatrix[ 1 ].z ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,QS=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <output_fragment>
	#include <tonemapping_fragment>
	#include <encodings_fragment>
	#include <fog_fragment>
}`,Jt={alphamap_fragment:Ty,alphamap_pars_fragment:Ey,alphatest_fragment:Cy,alphatest_pars_fragment:Ay,aomap_fragment:Py,aomap_pars_fragment:Ly,begin_vertex:Dy,beginnormal_vertex:Ry,bsdfs:Iy,iridescence_fragment:Oy,bumpmap_pars_fragment:Ny,clipping_planes_fragment:Fy,clipping_planes_pars_fragment:zy,clipping_planes_pars_vertex:ky,clipping_planes_vertex:Uy,color_fragment:By,color_pars_fragment:Vy,color_pars_vertex:Gy,color_vertex:Hy,common:Wy,cube_uv_reflection_fragment:Xy,defaultnormal_vertex:qy,displacementmap_pars_vertex:Yy,displacementmap_vertex:$y,emissivemap_fragment:jy,emissivemap_pars_fragment:Zy,encodings_fragment:Jy,encodings_pars_fragment:Ky,envmap_fragment:Qy,envmap_common_pars_fragment:tM,envmap_pars_fragment:eM,envmap_pars_vertex:nM,envmap_physical_pars_fragment:dM,envmap_vertex:iM,fog_vertex:rM,fog_pars_vertex:sM,fog_fragment:oM,fog_pars_fragment:aM,gradientmap_pars_fragment:lM,lightmap_fragment:cM,lightmap_pars_fragment:uM,lights_lambert_vertex:hM,lights_pars_begin:fM,lights_toon_fragment:pM,lights_toon_pars_fragment:mM,lights_phong_fragment:gM,lights_phong_pars_fragment:_M,lights_physical_fragment:xM,lights_physical_pars_fragment:vM,lights_fragment_begin:yM,lights_fragment_maps:MM,lights_fragment_end:SM,logdepthbuf_fragment:bM,logdepthbuf_pars_fragment:wM,logdepthbuf_pars_vertex:TM,logdepthbuf_vertex:EM,map_fragment:CM,map_pars_fragment:AM,map_particle_fragment:PM,map_particle_pars_fragment:LM,metalnessmap_fragment:DM,metalnessmap_pars_fragment:RM,morphcolor_vertex:IM,morphnormal_vertex:OM,morphtarget_pars_vertex:NM,morphtarget_vertex:FM,normal_fragment_begin:zM,normal_fragment_maps:kM,normal_pars_fragment:UM,normal_pars_vertex:BM,normal_vertex:VM,normalmap_pars_fragment:GM,clearcoat_normal_fragment_begin:HM,clearcoat_normal_fragment_maps:WM,clearcoat_pars_fragment:XM,iridescence_pars_fragment:qM,output_fragment:YM,packing:$M,premultiplied_alpha_fragment:jM,project_vertex:ZM,dithering_fragment:JM,dithering_pars_fragment:KM,roughnessmap_fragment:QM,roughnessmap_pars_fragment:tS,shadowmap_pars_fragment:eS,shadowmap_pars_vertex:nS,shadowmap_vertex:iS,shadowmask_pars_fragment:rS,skinbase_vertex:sS,skinning_pars_vertex:oS,skinning_vertex:aS,skinnormal_vertex:lS,specularmap_fragment:cS,specularmap_pars_fragment:uS,tonemapping_fragment:hS,tonemapping_pars_fragment:fS,transmission_fragment:dS,transmission_pars_fragment:pS,uv_pars_fragment:mS,uv_pars_vertex:gS,uv_vertex:_S,uv2_pars_fragment:xS,uv2_pars_vertex:vS,uv2_vertex:yS,worldpos_vertex:MS,background_vert:SS,background_frag:bS,cube_vert:wS,cube_frag:TS,depth_vert:ES,depth_frag:CS,distanceRGBA_vert:AS,distanceRGBA_frag:PS,equirect_vert:LS,equirect_frag:DS,linedashed_vert:RS,linedashed_frag:IS,meshbasic_vert:OS,meshbasic_frag:NS,meshlambert_vert:FS,meshlambert_frag:zS,meshmatcap_vert:kS,meshmatcap_frag:US,meshnormal_vert:BS,meshnormal_frag:VS,meshphong_vert:GS,meshphong_frag:HS,meshphysical_vert:WS,meshphysical_frag:XS,meshtoon_vert:qS,meshtoon_frag:YS,points_vert:$S,points_frag:jS,shadow_vert:ZS,shadow_frag:JS,sprite_vert:KS,sprite_frag:QS},Tt={common:{diffuse:{value:new $t(16777215)},opacity:{value:1},map:{value:null},uvTransform:{value:new Xe},uv2Transform:{value:new Xe},alphaMap:{value:null},alphaTest:{value:0}},specularmap:{specularMap:{value:null}},envmap:{envMap:{value:null},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1}},emissivemap:{emissiveMap:{value:null}},bumpmap:{bumpMap:{value:null},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalScale:{value:new vt(1,1)}},displacementmap:{displacementMap:{value:null},displacementScale:{value:1},displacementBias:{value:0}},roughnessmap:{roughnessMap:{value:null}},metalnessmap:{metalnessMap:{value:null}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new $t(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotShadowMap:{value:[]},spotShadowMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new $t(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaTest:{value:0},uvTransform:{value:new Xe}},sprite:{diffuse:{value:new $t(16777215)},opacity:{value:1},center:{value:new vt(.5,.5)},rotation:{value:0},map:{value:null},alphaMap:{value:null},alphaTest:{value:0},uvTransform:{value:new Xe}}},pi={basic:{uniforms:He([Tt.common,Tt.specularmap,Tt.envmap,Tt.aomap,Tt.lightmap,Tt.fog]),vertexShader:Jt.meshbasic_vert,fragmentShader:Jt.meshbasic_frag},lambert:{uniforms:He([Tt.common,Tt.specularmap,Tt.envmap,Tt.aomap,Tt.lightmap,Tt.emissivemap,Tt.fog,Tt.lights,{emissive:{value:new $t(0)}}]),vertexShader:Jt.meshlambert_vert,fragmentShader:Jt.meshlambert_frag},phong:{uniforms:He([Tt.common,Tt.specularmap,Tt.envmap,Tt.aomap,Tt.lightmap,Tt.emissivemap,Tt.bumpmap,Tt.normalmap,Tt.displacementmap,Tt.fog,Tt.lights,{emissive:{value:new $t(0)},specular:{value:new $t(1118481)},shininess:{value:30}}]),vertexShader:Jt.meshphong_vert,fragmentShader:Jt.meshphong_frag},standard:{uniforms:He([Tt.common,Tt.envmap,Tt.aomap,Tt.lightmap,Tt.emissivemap,Tt.bumpmap,Tt.normalmap,Tt.displacementmap,Tt.roughnessmap,Tt.metalnessmap,Tt.fog,Tt.lights,{emissive:{value:new $t(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Jt.meshphysical_vert,fragmentShader:Jt.meshphysical_frag},toon:{uniforms:He([Tt.common,Tt.aomap,Tt.lightmap,Tt.emissivemap,Tt.bumpmap,Tt.normalmap,Tt.displacementmap,Tt.gradientmap,Tt.fog,Tt.lights,{emissive:{value:new $t(0)}}]),vertexShader:Jt.meshtoon_vert,fragmentShader:Jt.meshtoon_frag},matcap:{uniforms:He([Tt.common,Tt.bumpmap,Tt.normalmap,Tt.displacementmap,Tt.fog,{matcap:{value:null}}]),vertexShader:Jt.meshmatcap_vert,fragmentShader:Jt.meshmatcap_frag},points:{uniforms:He([Tt.points,Tt.fog]),vertexShader:Jt.points_vert,fragmentShader:Jt.points_frag},dashed:{uniforms:He([Tt.common,Tt.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Jt.linedashed_vert,fragmentShader:Jt.linedashed_frag},depth:{uniforms:He([Tt.common,Tt.displacementmap]),vertexShader:Jt.depth_vert,fragmentShader:Jt.depth_frag},normal:{uniforms:He([Tt.common,Tt.bumpmap,Tt.normalmap,Tt.displacementmap,{opacity:{value:1}}]),vertexShader:Jt.meshnormal_vert,fragmentShader:Jt.meshnormal_frag},sprite:{uniforms:He([Tt.sprite,Tt.fog]),vertexShader:Jt.sprite_vert,fragmentShader:Jt.sprite_frag},background:{uniforms:{uvTransform:{value:new Xe},t2D:{value:null}},vertexShader:Jt.background_vert,fragmentShader:Jt.background_frag},cube:{uniforms:He([Tt.envmap,{opacity:{value:1}}]),vertexShader:Jt.cube_vert,fragmentShader:Jt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Jt.equirect_vert,fragmentShader:Jt.equirect_frag},distanceRGBA:{uniforms:He([Tt.common,Tt.displacementmap,{referencePosition:{value:new J},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Jt.distanceRGBA_vert,fragmentShader:Jt.distanceRGBA_frag},shadow:{uniforms:He([Tt.lights,Tt.fog,{color:{value:new $t(0)},opacity:{value:1}}]),vertexShader:Jt.shadow_vert,fragmentShader:Jt.shadow_frag}};pi.physical={uniforms:He([pi.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatNormalScale:{value:new vt(1,1)},clearcoatNormalMap:{value:null},iridescence:{value:0},iridescenceMap:{value:null},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},sheen:{value:0},sheenColor:{value:new $t(0)},sheenColorMap:{value:null},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},transmission:{value:0},transmissionMap:{value:null},transmissionSamplerSize:{value:new vt},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},attenuationDistance:{value:0},attenuationColor:{value:new $t(0)},specularIntensity:{value:1},specularIntensityMap:{value:null},specularColor:{value:new $t(1,1,1)},specularColorMap:{value:null}}]),vertexShader:Jt.meshphysical_vert,fragmentShader:Jt.meshphysical_frag};function tb(r,t,e,n,i,s){const o=new $t(0);let a=i===!0?0:1,l,c,u=null,h=0,f=null;function d(p,m){let _=!1,M=m.isScene===!0?m.background:null;M&&M.isTexture&&(M=t.get(M));const b=r.xr,x=b.getSession&&b.getSession();x&&x.environmentBlendMode==="additive"&&(M=null),M===null?g(o,a):M&&M.isColor&&(g(M,1),_=!0),(r.autoClear||_)&&r.clear(r.autoClearColor,r.autoClearDepth,r.autoClearStencil),M&&(M.isCubeTexture||M.mapping===ec)?(c===void 0&&(c=new fr(new pa(1,1,1),new ji({name:"BackgroundCubeMaterial",uniforms:uo(pi.cube.uniforms),vertexShader:pi.cube.vertexShader,fragmentShader:pi.cube.fragmentShader,side:si,depthTest:!1,depthWrite:!1,fog:!1})),c.geometry.deleteAttribute("normal"),c.geometry.deleteAttribute("uv"),c.onBeforeRender=function(v,E,C){this.matrixWorld.copyPosition(C.matrixWorld)},Object.defineProperty(c.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),n.update(c)),c.material.uniforms.envMap.value=M,c.material.uniforms.flipEnvMap.value=M.isCubeTexture&&M.isRenderTargetTexture===!1?-1:1,(u!==M||h!==M.version||f!==r.toneMapping)&&(c.material.needsUpdate=!0,u=M,h=M.version,f=r.toneMapping),c.layers.enableAll(),p.unshift(c,c.geometry,c.material,0,0,null)):M&&M.isTexture&&(l===void 0&&(l=new fr(new $h(2,2),new ji({name:"BackgroundMaterial",uniforms:uo(pi.background.uniforms),vertexShader:pi.background.vertexShader,fragmentShader:pi.background.fragmentShader,side:ia,depthTest:!1,depthWrite:!1,fog:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),n.update(l)),l.material.uniforms.t2D.value=M,M.matrixAutoUpdate===!0&&M.updateMatrix(),l.material.uniforms.uvTransform.value.copy(M.matrix),(u!==M||h!==M.version||f!==r.toneMapping)&&(l.material.needsUpdate=!0,u=M,h=M.version,f=r.toneMapping),l.layers.enableAll(),p.unshift(l,l.geometry,l.material,0,0,null))}function g(p,m){e.buffers.color.setClear(p.r,p.g,p.b,m,s)}return{getClearColor:function(){return o},setClearColor:function(p,m=1){o.set(p),a=m,g(o,a)},getClearAlpha:function(){return a},setClearAlpha:function(p){a=p,g(o,a)},render:d}}function eb(r,t,e,n){const i=r.getParameter(34921),s=n.isWebGL2?null:t.get("OES_vertex_array_object"),o=n.isWebGL2||s!==null,a={},l=m(null);let c=l,u=!1;function h(V,$,Y,H,G){let q=!1;if(o){const P=p(H,Y,$);c!==P&&(c=P,d(c.object)),q=_(V,H,Y,G),q&&M(V,H,Y,G)}else{const P=$.wireframe===!0;(c.geometry!==H.id||c.program!==Y.id||c.wireframe!==P)&&(c.geometry=H.id,c.program=Y.id,c.wireframe=P,q=!0)}G!==null&&e.update(G,34963),(q||u)&&(u=!1,y(V,$,Y,H),G!==null&&r.bindBuffer(34963,e.get(G).buffer))}function f(){return n.isWebGL2?r.createVertexArray():s.createVertexArrayOES()}function d(V){return n.isWebGL2?r.bindVertexArray(V):s.bindVertexArrayOES(V)}function g(V){return n.isWebGL2?r.deleteVertexArray(V):s.deleteVertexArrayOES(V)}function p(V,$,Y){const H=Y.wireframe===!0;let G=a[V.id];G===void 0&&(G={},a[V.id]=G);let q=G[$.id];q===void 0&&(q={},G[$.id]=q);let P=q[H];return P===void 0&&(P=m(f()),q[H]=P),P}function m(V){const $=[],Y=[],H=[];for(let G=0;G<i;G++)$[G]=0,Y[G]=0,H[G]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:$,enabledAttributes:Y,attributeDivisors:H,object:V,attributes:{},index:null}}function _(V,$,Y,H){const G=c.attributes,q=$.attributes;let P=0;const nt=Y.getAttributes();for(const A in nt)if(nt[A].location>=0){const T=G[A];let I=q[A];if(I===void 0&&(A==="instanceMatrix"&&V.instanceMatrix&&(I=V.instanceMatrix),A==="instanceColor"&&V.instanceColor&&(I=V.instanceColor)),T===void 0||T.attribute!==I||I&&T.data!==I.data)return!0;P++}return c.attributesNum!==P||c.index!==H}function M(V,$,Y,H){const G={},q=$.attributes;let P=0;const nt=Y.getAttributes();for(const A in nt)if(nt[A].location>=0){let T=q[A];T===void 0&&(A==="instanceMatrix"&&V.instanceMatrix&&(T=V.instanceMatrix),A==="instanceColor"&&V.instanceColor&&(T=V.instanceColor));const I={};I.attribute=T,T&&T.data&&(I.data=T.data),G[A]=I,P++}c.attributes=G,c.attributesNum=P,c.index=H}function b(){const V=c.newAttributes;for(let $=0,Y=V.length;$<Y;$++)V[$]=0}function x(V){v(V,0)}function v(V,$){const Y=c.newAttributes,H=c.enabledAttributes,G=c.attributeDivisors;Y[V]=1,H[V]===0&&(r.enableVertexAttribArray(V),H[V]=1),G[V]!==$&&((n.isWebGL2?r:t.get("ANGLE_instanced_arrays"))[n.isWebGL2?"vertexAttribDivisor":"vertexAttribDivisorANGLE"](V,$),G[V]=$)}function E(){const V=c.newAttributes,$=c.enabledAttributes;for(let Y=0,H=$.length;Y<H;Y++)$[Y]!==V[Y]&&(r.disableVertexAttribArray(Y),$[Y]=0)}function C(V,$,Y,H,G,q){n.isWebGL2===!0&&(Y===5124||Y===5125)?r.vertexAttribIPointer(V,$,Y,G,q):r.vertexAttribPointer(V,$,Y,H,G,q)}function y(V,$,Y,H){if(n.isWebGL2===!1&&(V.isInstancedMesh||H.isInstancedBufferGeometry)&&t.get("ANGLE_instanced_arrays")===null)return;b();const G=H.attributes,q=Y.getAttributes(),P=$.defaultAttributeValues;for(const nt in q){const A=q[nt];if(A.location>=0){let O=G[nt];if(O===void 0&&(nt==="instanceMatrix"&&V.instanceMatrix&&(O=V.instanceMatrix),nt==="instanceColor"&&V.instanceColor&&(O=V.instanceColor)),O!==void 0){const T=O.normalized,I=O.itemSize,z=e.get(O);if(z===void 0)continue;const U=z.buffer,j=z.type,rt=z.bytesPerElement;if(O.isInterleavedBufferAttribute){const tt=O.data,ut=tt.stride,ot=O.offset;if(tt.isInstancedInterleavedBuffer){for(let at=0;at<A.locationSize;at++)v(A.location+at,tt.meshPerAttribute);V.isInstancedMesh!==!0&&H._maxInstanceCount===void 0&&(H._maxInstanceCount=tt.meshPerAttribute*tt.count)}else for(let at=0;at<A.locationSize;at++)x(A.location+at);r.bindBuffer(34962,U);for(let at=0;at<A.locationSize;at++)C(A.location+at,I/A.locationSize,j,T,ut*rt,(ot+I/A.locationSize*at)*rt)}else{if(O.isInstancedBufferAttribute){for(let tt=0;tt<A.locationSize;tt++)v(A.location+tt,O.meshPerAttribute);V.isInstancedMesh!==!0&&H._maxInstanceCount===void 0&&(H._maxInstanceCount=O.meshPerAttribute*O.count)}else for(let tt=0;tt<A.locationSize;tt++)x(A.location+tt);r.bindBuffer(34962,U);for(let tt=0;tt<A.locationSize;tt++)C(A.location+tt,I/A.locationSize,j,T,I*rt,I/A.locationSize*tt*rt)}}else if(P!==void 0){const T=P[nt];if(T!==void 0)switch(T.length){case 2:r.vertexAttrib2fv(A.location,T);break;case 3:r.vertexAttrib3fv(A.location,T);break;case 4:r.vertexAttrib4fv(A.location,T);break;default:r.vertexAttrib1fv(A.location,T)}}}}E()}function w(){k();for(const V in a){const $=a[V];for(const Y in $){const H=$[Y];for(const G in H)g(H[G].object),delete H[G];delete $[Y]}delete a[V]}}function D(V){if(a[V.id]===void 0)return;const $=a[V.id];for(const Y in $){const H=$[Y];for(const G in H)g(H[G].object),delete H[G];delete $[Y]}delete a[V.id]}function B(V){for(const $ in a){const Y=a[$];if(Y[V.id]===void 0)continue;const H=Y[V.id];for(const G in H)g(H[G].object),delete H[G];delete Y[V.id]}}function k(){Z(),u=!0,c!==l&&(c=l,d(c.object))}function Z(){l.geometry=null,l.program=null,l.wireframe=!1}return{setup:h,reset:k,resetDefaultState:Z,dispose:w,releaseStatesOfGeometry:D,releaseStatesOfProgram:B,initAttributes:b,enableAttribute:x,disableUnusedAttributes:E}}function nb(r,t,e,n){const i=n.isWebGL2;let s;function o(c){s=c}function a(c,u){r.drawArrays(s,c,u),e.update(u,s,1)}function l(c,u,h){if(h===0)return;let f,d;if(i)f=r,d="drawArraysInstanced";else if(f=t.get("ANGLE_instanced_arrays"),d="drawArraysInstancedANGLE",f===null){console.error("THREE.WebGLBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");return}f[d](s,c,u,h),e.update(u,s,h)}this.setMode=o,this.render=a,this.renderInstances=l}function ib(r,t,e){let n;function i(){if(n!==void 0)return n;if(t.has("EXT_texture_filter_anisotropic")===!0){const C=t.get("EXT_texture_filter_anisotropic");n=r.getParameter(C.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else n=0;return n}function s(C){if(C==="highp"){if(r.getShaderPrecisionFormat(35633,36338).precision>0&&r.getShaderPrecisionFormat(35632,36338).precision>0)return"highp";C="mediump"}return C==="mediump"&&r.getShaderPrecisionFormat(35633,36337).precision>0&&r.getShaderPrecisionFormat(35632,36337).precision>0?"mediump":"lowp"}const o=typeof WebGL2RenderingContext<"u"&&r instanceof WebGL2RenderingContext||typeof WebGL2ComputeRenderingContext<"u"&&r instanceof WebGL2ComputeRenderingContext;let a=e.precision!==void 0?e.precision:"highp";const l=s(a);l!==a&&(console.warn("THREE.WebGLRenderer:",a,"not supported, using",l,"instead."),a=l);const c=o||t.has("WEBGL_draw_buffers"),u=e.logarithmicDepthBuffer===!0,h=r.getParameter(34930),f=r.getParameter(35660),d=r.getParameter(3379),g=r.getParameter(34076),p=r.getParameter(34921),m=r.getParameter(36347),_=r.getParameter(36348),M=r.getParameter(36349),b=f>0,x=o||t.has("OES_texture_float"),v=b&&x,E=o?r.getParameter(36183):0;return{isWebGL2:o,drawBuffers:c,getMaxAnisotropy:i,getMaxPrecision:s,precision:a,logarithmicDepthBuffer:u,maxTextures:h,maxVertexTextures:f,maxTextureSize:d,maxCubemapSize:g,maxAttributes:p,maxVertexUniforms:m,maxVaryings:_,maxFragmentUniforms:M,vertexTextures:b,floatFragmentTextures:x,floatVertexTextures:v,maxSamples:E}}function rb(r){const t=this;let e=null,n=0,i=!1,s=!1;const o=new Nr,a=new Xe,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(h,f,d){const g=h.length!==0||f||n!==0||i;return i=f,e=u(h,d,0),n=h.length,g},this.beginShadows=function(){s=!0,u(null)},this.endShadows=function(){s=!1,c()},this.setState=function(h,f,d){const g=h.clippingPlanes,p=h.clipIntersection,m=h.clipShadows,_=r.get(h);if(!i||g===null||g.length===0||s&&!m)s?u(null):c();else{const M=s?0:n,b=M*4;let x=_.clippingState||null;l.value=x,x=u(g,f,b,d);for(let v=0;v!==b;++v)x[v]=e[v];_.clippingState=x,this.numIntersection=p?this.numPlanes:0,this.numPlanes+=M}};function c(){l.value!==e&&(l.value=e,l.needsUpdate=n>0),t.numPlanes=n,t.numIntersection=0}function u(h,f,d,g){const p=h!==null?h.length:0;let m=null;if(p!==0){if(m=l.value,g!==!0||m===null){const _=d+p*4,M=f.matrixWorldInverse;a.getNormalMatrix(M),(m===null||m.length<_)&&(m=new Float32Array(_));for(let b=0,x=d;b!==p;++b,x+=4)o.copy(h[b]).applyMatrix4(M,a),o.normal.toArray(m,x),m[x+3]=o.constant}l.value=m,l.needsUpdate=!0}return t.numPlanes=p,t.numIntersection=0,m}}function sb(r){let t=new WeakMap;function e(o,a){return a===Ku?o.mapping=ao:a===Qu&&(o.mapping=lo),o}function n(o){if(o&&o.isTexture&&o.isRenderTargetTexture===!1){const a=o.mapping;if(a===Ku||a===Qu)if(t.has(o)){const l=t.get(o).texture;return e(l,o.mapping)}else{const l=o.image;if(l&&l.height>0){const c=new My(l.height/2);return c.fromEquirectangularTexture(r,o),t.set(o,c),o.addEventListener("dispose",i),e(c.texture,o.mapping)}else return null}}return o}function i(o){const a=o.target;a.removeEventListener("dispose",i);const l=t.get(a);l!==void 0&&(t.delete(a),l.dispose())}function s(){t=new WeakMap}return{get:n,dispose:s}}class ob extends Jg{constructor(t=-1,e=1,n=1,i=-1,s=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=n,this.bottom=i,this.near=s,this.far=o,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,n,i,s,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=i,this.view.width=s,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,i=(this.top+this.bottom)/2;let s=n-t,o=n+t,a=i+e,l=i-e;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=c*this.view.offsetX,o=s+c*this.view.width,a-=u*this.view.offsetY,l=a-u*this.view.height}this.projectionMatrix.makeOrthographic(s,o,a,l,this.near,this.far),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}}const zs=4,qd=[.125,.215,.35,.446,.526,.582],zr=20,nu=new ob,Yd=new $t;let iu=null;const Fr=(1+Math.sqrt(5))/2,Ps=1/Fr,$d=[new J(1,1,1),new J(-1,1,1),new J(1,1,-1),new J(-1,1,-1),new J(0,Fr,Ps),new J(0,Fr,-Ps),new J(Ps,0,Fr),new J(-Ps,0,Fr),new J(Fr,Ps,0),new J(-Fr,Ps,0)];class jd{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(t,e=0,n=.1,i=100){iu=this._renderer.getRenderTarget(),this._setSize(256);const s=this._allocateTargets();return s.depthBuffer=!0,this._sceneToCubeUV(t,n,i,s),e>0&&this._blur(s,0,0,e),this._applyPMREM(s),this._cleanup(s),s}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Kd(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Jd(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodPlanes.length;t++)this._lodPlanes[t].dispose()}_cleanup(t){this._renderer.setRenderTarget(iu),t.scissorTest=!1,Za(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===ao||t.mapping===lo?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),iu=this._renderer.getRenderTarget();const n=e||this._allocateTargets();return this._textureToCubeUV(t,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,n={magFilter:Gn,minFilter:Gn,generateMipmaps:!1,type:ra,format:ri,encoding:as,depthBuffer:!1},i=Zd(t,e,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Zd(t,e,n);const{_lodMax:s}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=ab(s)),this._blurMaterial=lb(s,t,e)}return i}_compileMaterial(t){const e=new fr(this._lodPlanes[0],t);this._renderer.compile(e,nu)}_sceneToCubeUV(t,e,n,i){const a=new ni(90,1,e,n),l=[1,-1,1,1,1,1],c=[1,1,1,-1,-1,-1],u=this._renderer,h=u.autoClear,f=u.toneMapping;u.getClearColor(Yd),u.toneMapping=Xi,u.autoClear=!1;const d=new Yh({name:"PMREM.Background",side:si,depthWrite:!1,depthTest:!1}),g=new fr(new pa,d);let p=!1;const m=t.background;m?m.isColor&&(d.color.copy(m),t.background=null,p=!0):(d.color.copy(Yd),p=!0);for(let _=0;_<6;_++){const M=_%3;M===0?(a.up.set(0,l[_],0),a.lookAt(c[_],0,0)):M===1?(a.up.set(0,0,l[_]),a.lookAt(0,c[_],0)):(a.up.set(0,l[_],0),a.lookAt(0,0,c[_]));const b=this._cubeSize;Za(i,M*b,_>2?b:0,b,b),u.setRenderTarget(i),p&&u.render(g,a),u.render(t,a)}g.geometry.dispose(),g.material.dispose(),u.toneMapping=f,u.autoClear=h,t.background=m}_textureToCubeUV(t,e){const n=this._renderer,i=t.mapping===ao||t.mapping===lo;i?(this._cubemapMaterial===null&&(this._cubemapMaterial=Kd()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Jd());const s=i?this._cubemapMaterial:this._equirectMaterial,o=new fr(this._lodPlanes[0],s),a=s.uniforms;a.envMap.value=t;const l=this._cubeSize;Za(e,0,0,3*l,2*l),n.setRenderTarget(e),n.render(o,nu)}_applyPMREM(t){const e=this._renderer,n=e.autoClear;e.autoClear=!1;for(let i=1;i<this._lodPlanes.length;i++){const s=Math.sqrt(this._sigmas[i]*this._sigmas[i]-this._sigmas[i-1]*this._sigmas[i-1]),o=$d[(i-1)%$d.length];this._blur(t,i-1,i,s,o)}e.autoClear=n}_blur(t,e,n,i,s){const o=this._pingPongRenderTarget;this._halfBlur(t,o,e,n,i,"latitudinal",s),this._halfBlur(o,t,n,n,i,"longitudinal",s)}_halfBlur(t,e,n,i,s,o,a){const l=this._renderer,c=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const u=3,h=new fr(this._lodPlanes[i],c),f=c.uniforms,d=this._sizeLods[n]-1,g=isFinite(s)?Math.PI/(2*d):2*Math.PI/(2*zr-1),p=s/g,m=isFinite(s)?1+Math.floor(u*p):zr;m>zr&&console.warn(`sigmaRadians, ${s}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${zr}`);const _=[];let M=0;for(let C=0;C<zr;++C){const y=C/p,w=Math.exp(-y*y/2);_.push(w),C===0?M+=w:C<m&&(M+=2*w)}for(let C=0;C<_.length;C++)_[C]=_[C]/M;f.envMap.value=t.texture,f.samples.value=m,f.weights.value=_,f.latitudinal.value=o==="latitudinal",a&&(f.poleAxis.value=a);const{_lodMax:b}=this;f.dTheta.value=g,f.mipInt.value=b-n;const x=this._sizeLods[i],v=3*x*(i>b-zs?i-b+zs:0),E=4*(this._cubeSize-x);Za(e,v,E,3*x,2*x),l.setRenderTarget(e),l.render(h,nu)}}function ab(r){const t=[],e=[],n=[];let i=r;const s=r-zs+1+qd.length;for(let o=0;o<s;o++){const a=Math.pow(2,i);e.push(a);let l=1/a;o>r-zs?l=qd[o-r+zs-1]:o===0&&(l=0),n.push(l);const c=1/(a-2),u=-c,h=1+c,f=[u,u,h,u,h,h,u,u,h,h,u,h],d=6,g=6,p=3,m=2,_=1,M=new Float32Array(p*g*d),b=new Float32Array(m*g*d),x=new Float32Array(_*g*d);for(let E=0;E<d;E++){const C=E%3*2/3-1,y=E>2?0:-1,w=[C,y,0,C+2/3,y,0,C+2/3,y+1,0,C,y,0,C+2/3,y+1,0,C,y+1,0];M.set(w,p*g*E),b.set(f,m*g*E);const D=[E,E,E,E,E,E];x.set(D,_*g*E)}const v=new Zi;v.setAttribute("position",new bi(M,p)),v.setAttribute("uv",new bi(b,m)),v.setAttribute("faceIndex",new bi(x,_)),t.push(v),i>zs&&i--}return{lodPlanes:t,sizeLods:e,sigmas:n}}function Zd(r,t,e){const n=new vr(r,t,e);return n.texture.mapping=ec,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function Za(r,t,e,n,i){r.viewport.set(t,e,n,i),r.scissor.set(t,e,n,i)}function lb(r,t,e){const n=new Float32Array(zr),i=new J(0,1,0);return new ji({name:"SphericalGaussianBlur",defines:{n:zr,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${r}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:i}},vertexShader:jh(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:xr,depthTest:!1,depthWrite:!1})}function Jd(){return new ji({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:jh(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:xr,depthTest:!1,depthWrite:!1})}function Kd(){return new ji({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:jh(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:xr,depthTest:!1,depthWrite:!1})}function jh(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function cb(r){let t=new WeakMap,e=null;function n(a){if(a&&a.isTexture){const l=a.mapping,c=l===Ku||l===Qu,u=l===ao||l===lo;if(c||u)if(a.isRenderTargetTexture&&a.needsPMREMUpdate===!0){a.needsPMREMUpdate=!1;let h=t.get(a);return e===null&&(e=new jd(r)),h=c?e.fromEquirectangular(a,h):e.fromCubemap(a,h),t.set(a,h),h.texture}else{if(t.has(a))return t.get(a).texture;{const h=a.image;if(c&&h&&h.height>0||u&&h&&i(h)){e===null&&(e=new jd(r));const f=c?e.fromEquirectangular(a):e.fromCubemap(a);return t.set(a,f),a.addEventListener("dispose",s),f.texture}else return null}}}return a}function i(a){let l=0;const c=6;for(let u=0;u<c;u++)a[u]!==void 0&&l++;return l===c}function s(a){const l=a.target;l.removeEventListener("dispose",s);const c=t.get(l);c!==void 0&&(t.delete(l),c.dispose())}function o(){t=new WeakMap,e!==null&&(e.dispose(),e=null)}return{get:n,dispose:o}}function ub(r){const t={};function e(n){if(t[n]!==void 0)return t[n];let i;switch(n){case"WEBGL_depth_texture":i=r.getExtension("WEBGL_depth_texture")||r.getExtension("MOZ_WEBGL_depth_texture")||r.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":i=r.getExtension("EXT_texture_filter_anisotropic")||r.getExtension("MOZ_EXT_texture_filter_anisotropic")||r.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":i=r.getExtension("WEBGL_compressed_texture_s3tc")||r.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||r.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":i=r.getExtension("WEBGL_compressed_texture_pvrtc")||r.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:i=r.getExtension(n)}return t[n]=i,i}return{has:function(n){return e(n)!==null},init:function(n){n.isWebGL2?e("EXT_color_buffer_float"):(e("WEBGL_depth_texture"),e("OES_texture_float"),e("OES_texture_half_float"),e("OES_texture_half_float_linear"),e("OES_standard_derivatives"),e("OES_element_index_uint"),e("OES_vertex_array_object"),e("ANGLE_instanced_arrays")),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture")},get:function(n){const i=e(n);return i===null&&console.warn("THREE.WebGLRenderer: "+n+" extension not supported."),i}}}function hb(r,t,e,n){const i={},s=new WeakMap;function o(h){const f=h.target;f.index!==null&&t.remove(f.index);for(const g in f.attributes)t.remove(f.attributes[g]);f.removeEventListener("dispose",o),delete i[f.id];const d=s.get(f);d&&(t.remove(d),s.delete(f)),n.releaseStatesOfGeometry(f),f.isInstancedBufferGeometry===!0&&delete f._maxInstanceCount,e.memory.geometries--}function a(h,f){return i[f.id]===!0||(f.addEventListener("dispose",o),i[f.id]=!0,e.memory.geometries++),f}function l(h){const f=h.attributes;for(const g in f)t.update(f[g],34962);const d=h.morphAttributes;for(const g in d){const p=d[g];for(let m=0,_=p.length;m<_;m++)t.update(p[m],34962)}}function c(h){const f=[],d=h.index,g=h.attributes.position;let p=0;if(d!==null){const M=d.array;p=d.version;for(let b=0,x=M.length;b<x;b+=3){const v=M[b+0],E=M[b+1],C=M[b+2];f.push(v,E,E,C,C,v)}}else{const M=g.array;p=g.version;for(let b=0,x=M.length/3-1;b<x;b+=3){const v=b+0,E=b+1,C=b+2;f.push(v,E,E,C,C,v)}}const m=new(Gg(f)?Zg:jg)(f,1);m.version=p;const _=s.get(h);_&&t.remove(_),s.set(h,m)}function u(h){const f=s.get(h);if(f){const d=h.index;d!==null&&f.version<d.version&&c(h)}else c(h);return s.get(h)}return{get:a,update:l,getWireframeAttribute:u}}function fb(r,t,e,n){const i=n.isWebGL2;let s;function o(f){s=f}let a,l;function c(f){a=f.type,l=f.bytesPerElement}function u(f,d){r.drawElements(s,d,a,f*l),e.update(d,s,1)}function h(f,d,g){if(g===0)return;let p,m;if(i)p=r,m="drawElementsInstanced";else if(p=t.get("ANGLE_instanced_arrays"),m="drawElementsInstancedANGLE",p===null){console.error("THREE.WebGLIndexedBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");return}p[m](s,d,a,f*l,g),e.update(d,s,g)}this.setMode=o,this.setIndex=c,this.render=u,this.renderInstances=h}function db(r){const t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function n(s,o,a){switch(e.calls++,o){case 4:e.triangles+=a*(s/3);break;case 1:e.lines+=a*(s/2);break;case 3:e.lines+=a*(s-1);break;case 2:e.lines+=a*s;break;case 0:e.points+=a*s;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",o);break}}function i(){e.frame++,e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:i,update:n}}function pb(r,t){return r[0]-t[0]}function mb(r,t){return Math.abs(t[1])-Math.abs(r[1])}function ru(r,t){let e=1;const n=t.isInterleavedBufferAttribute?t.data.array:t.array;n instanceof Int8Array?e=127:n instanceof Int16Array?e=32767:n instanceof Int32Array?e=2147483647:console.error("THREE.WebGLMorphtargets: Unsupported morph attribute data type: ",n),r.divideScalar(e)}function gb(r,t,e){const n={},i=new Float32Array(8),s=new WeakMap,o=new $e,a=[];for(let c=0;c<8;c++)a[c]=[c,0];function l(c,u,h,f){const d=c.morphTargetInfluences;if(t.isWebGL2===!0){const g=u.morphAttributes.position||u.morphAttributes.normal||u.morphAttributes.color,p=g!==void 0?g.length:0;let m=s.get(u);if(m===void 0||m.count!==p){let $=function(){Z.dispose(),s.delete(u),u.removeEventListener("dispose",$)};m!==void 0&&m.texture.dispose();const b=u.morphAttributes.position!==void 0,x=u.morphAttributes.normal!==void 0,v=u.morphAttributes.color!==void 0,E=u.morphAttributes.position||[],C=u.morphAttributes.normal||[],y=u.morphAttributes.color||[];let w=0;b===!0&&(w=1),x===!0&&(w=2),v===!0&&(w=3);let D=u.attributes.position.count*w,B=1;D>t.maxTextureSize&&(B=Math.ceil(D/t.maxTextureSize),D=t.maxTextureSize);const k=new Float32Array(D*B*4*p),Z=new qg(k,D,B,p);Z.type=Hr,Z.needsUpdate=!0;const V=w*4;for(let Y=0;Y<p;Y++){const H=E[Y],G=C[Y],q=y[Y],P=D*B*4*Y;for(let nt=0;nt<H.count;nt++){const A=nt*V;b===!0&&(o.fromBufferAttribute(H,nt),H.normalized===!0&&ru(o,H),k[P+A+0]=o.x,k[P+A+1]=o.y,k[P+A+2]=o.z,k[P+A+3]=0),x===!0&&(o.fromBufferAttribute(G,nt),G.normalized===!0&&ru(o,G),k[P+A+4]=o.x,k[P+A+5]=o.y,k[P+A+6]=o.z,k[P+A+7]=0),v===!0&&(o.fromBufferAttribute(q,nt),q.normalized===!0&&ru(o,q),k[P+A+8]=o.x,k[P+A+9]=o.y,k[P+A+10]=o.z,k[P+A+11]=q.itemSize===4?o.w:1)}}m={count:p,texture:Z,size:new vt(D,B)},s.set(u,m),u.addEventListener("dispose",$)}let _=0;for(let b=0;b<d.length;b++)_+=d[b];const M=u.morphTargetsRelative?1:1-_;f.getUniforms().setValue(r,"morphTargetBaseInfluence",M),f.getUniforms().setValue(r,"morphTargetInfluences",d),f.getUniforms().setValue(r,"morphTargetsTexture",m.texture,e),f.getUniforms().setValue(r,"morphTargetsTextureSize",m.size)}else{const g=d===void 0?0:d.length;let p=n[u.id];if(p===void 0||p.length!==g){p=[];for(let x=0;x<g;x++)p[x]=[x,0];n[u.id]=p}for(let x=0;x<g;x++){const v=p[x];v[0]=x,v[1]=d[x]}p.sort(mb);for(let x=0;x<8;x++)x<g&&p[x][1]?(a[x][0]=p[x][0],a[x][1]=p[x][1]):(a[x][0]=Number.MAX_SAFE_INTEGER,a[x][1]=0);a.sort(pb);const m=u.morphAttributes.position,_=u.morphAttributes.normal;let M=0;for(let x=0;x<8;x++){const v=a[x],E=v[0],C=v[1];E!==Number.MAX_SAFE_INTEGER&&C?(m&&u.getAttribute("morphTarget"+x)!==m[E]&&u.setAttribute("morphTarget"+x,m[E]),_&&u.getAttribute("morphNormal"+x)!==_[E]&&u.setAttribute("morphNormal"+x,_[E]),i[x]=C,M+=C):(m&&u.hasAttribute("morphTarget"+x)===!0&&u.deleteAttribute("morphTarget"+x),_&&u.hasAttribute("morphNormal"+x)===!0&&u.deleteAttribute("morphNormal"+x),i[x]=0)}const b=u.morphTargetsRelative?1:1-M;f.getUniforms().setValue(r,"morphTargetBaseInfluence",b),f.getUniforms().setValue(r,"morphTargetInfluences",i)}}return{update:l}}function _b(r,t,e,n){let i=new WeakMap;function s(l){const c=n.render.frame,u=l.geometry,h=t.get(l,u);return i.get(h)!==c&&(t.update(h),i.set(h,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",a)===!1&&l.addEventListener("dispose",a),e.update(l.instanceMatrix,34962),l.instanceColor!==null&&e.update(l.instanceColor,34962)),h}function o(){i=new WeakMap}function a(l){const c=l.target;c.removeEventListener("dispose",a),e.remove(c.instanceMatrix),c.instanceColor!==null&&e.remove(c.instanceColor)}return{update:s,dispose:o}}const e_=new qn,n_=new qg,i_=new oy,r_=new Kg,Qd=[],tp=[],ep=new Float32Array(16),np=new Float32Array(9),ip=new Float32Array(4);function mo(r,t,e){const n=r[0];if(n<=0||n>0)return r;const i=t*e;let s=Qd[i];if(s===void 0&&(s=new Float32Array(i),Qd[i]=s),t!==0){n.toArray(s,0);for(let o=1,a=0;o!==t;++o)a+=e,r[o].toArray(s,a)}return s}function ln(r,t){if(r.length!==t.length)return!1;for(let e=0,n=r.length;e<n;e++)if(r[e]!==t[e])return!1;return!0}function cn(r,t){for(let e=0,n=t.length;e<n;e++)r[e]=t[e]}function rc(r,t){let e=tp[t];e===void 0&&(e=new Int32Array(t),tp[t]=e);for(let n=0;n!==t;++n)e[n]=r.allocateTextureUnit();return e}function xb(r,t){const e=this.cache;e[0]!==t&&(r.uniform1f(this.addr,t),e[0]=t)}function vb(r,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(r.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(ln(e,t))return;r.uniform2fv(this.addr,t),cn(e,t)}}function yb(r,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(r.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(r.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(ln(e,t))return;r.uniform3fv(this.addr,t),cn(e,t)}}function Mb(r,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(r.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(ln(e,t))return;r.uniform4fv(this.addr,t),cn(e,t)}}function Sb(r,t){const e=this.cache,n=t.elements;if(n===void 0){if(ln(e,t))return;r.uniformMatrix2fv(this.addr,!1,t),cn(e,t)}else{if(ln(e,n))return;ip.set(n),r.uniformMatrix2fv(this.addr,!1,ip),cn(e,n)}}function bb(r,t){const e=this.cache,n=t.elements;if(n===void 0){if(ln(e,t))return;r.uniformMatrix3fv(this.addr,!1,t),cn(e,t)}else{if(ln(e,n))return;np.set(n),r.uniformMatrix3fv(this.addr,!1,np),cn(e,n)}}function wb(r,t){const e=this.cache,n=t.elements;if(n===void 0){if(ln(e,t))return;r.uniformMatrix4fv(this.addr,!1,t),cn(e,t)}else{if(ln(e,n))return;ep.set(n),r.uniformMatrix4fv(this.addr,!1,ep),cn(e,n)}}function Tb(r,t){const e=this.cache;e[0]!==t&&(r.uniform1i(this.addr,t),e[0]=t)}function Eb(r,t){const e=this.cache;ln(e,t)||(r.uniform2iv(this.addr,t),cn(e,t))}function Cb(r,t){const e=this.cache;ln(e,t)||(r.uniform3iv(this.addr,t),cn(e,t))}function Ab(r,t){const e=this.cache;ln(e,t)||(r.uniform4iv(this.addr,t),cn(e,t))}function Pb(r,t){const e=this.cache;e[0]!==t&&(r.uniform1ui(this.addr,t),e[0]=t)}function Lb(r,t){const e=this.cache;ln(e,t)||(r.uniform2uiv(this.addr,t),cn(e,t))}function Db(r,t){const e=this.cache;ln(e,t)||(r.uniform3uiv(this.addr,t),cn(e,t))}function Rb(r,t){const e=this.cache;ln(e,t)||(r.uniform4uiv(this.addr,t),cn(e,t))}function Ib(r,t,e){const n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i),e.setTexture2D(t||e_,i)}function Ob(r,t,e){const n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i),e.setTexture3D(t||i_,i)}function Nb(r,t,e){const n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i),e.setTextureCube(t||r_,i)}function Fb(r,t,e){const n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i),e.setTexture2DArray(t||n_,i)}function zb(r){switch(r){case 5126:return xb;case 35664:return vb;case 35665:return yb;case 35666:return Mb;case 35674:return Sb;case 35675:return bb;case 35676:return wb;case 5124:case 35670:return Tb;case 35667:case 35671:return Eb;case 35668:case 35672:return Cb;case 35669:case 35673:return Ab;case 5125:return Pb;case 36294:return Lb;case 36295:return Db;case 36296:return Rb;case 35678:case 36198:case 36298:case 36306:case 35682:return Ib;case 35679:case 36299:case 36307:return Ob;case 35680:case 36300:case 36308:case 36293:return Nb;case 36289:case 36303:case 36311:case 36292:return Fb}}function kb(r,t){r.uniform1fv(this.addr,t)}function Ub(r,t){const e=mo(t,this.size,2);r.uniform2fv(this.addr,e)}function Bb(r,t){const e=mo(t,this.size,3);r.uniform3fv(this.addr,e)}function Vb(r,t){const e=mo(t,this.size,4);r.uniform4fv(this.addr,e)}function Gb(r,t){const e=mo(t,this.size,4);r.uniformMatrix2fv(this.addr,!1,e)}function Hb(r,t){const e=mo(t,this.size,9);r.uniformMatrix3fv(this.addr,!1,e)}function Wb(r,t){const e=mo(t,this.size,16);r.uniformMatrix4fv(this.addr,!1,e)}function Xb(r,t){r.uniform1iv(this.addr,t)}function qb(r,t){r.uniform2iv(this.addr,t)}function Yb(r,t){r.uniform3iv(this.addr,t)}function $b(r,t){r.uniform4iv(this.addr,t)}function jb(r,t){r.uniform1uiv(this.addr,t)}function Zb(r,t){r.uniform2uiv(this.addr,t)}function Jb(r,t){r.uniform3uiv(this.addr,t)}function Kb(r,t){r.uniform4uiv(this.addr,t)}function Qb(r,t,e){const n=t.length,i=rc(e,n);r.uniform1iv(this.addr,i);for(let s=0;s!==n;++s)e.setTexture2D(t[s]||e_,i[s])}function tw(r,t,e){const n=t.length,i=rc(e,n);r.uniform1iv(this.addr,i);for(let s=0;s!==n;++s)e.setTexture3D(t[s]||i_,i[s])}function ew(r,t,e){const n=t.length,i=rc(e,n);r.uniform1iv(this.addr,i);for(let s=0;s!==n;++s)e.setTextureCube(t[s]||r_,i[s])}function nw(r,t,e){const n=t.length,i=rc(e,n);r.uniform1iv(this.addr,i);for(let s=0;s!==n;++s)e.setTexture2DArray(t[s]||n_,i[s])}function iw(r){switch(r){case 5126:return kb;case 35664:return Ub;case 35665:return Bb;case 35666:return Vb;case 35674:return Gb;case 35675:return Hb;case 35676:return Wb;case 5124:case 35670:return Xb;case 35667:case 35671:return qb;case 35668:case 35672:return Yb;case 35669:case 35673:return $b;case 5125:return jb;case 36294:return Zb;case 36295:return Jb;case 36296:return Kb;case 35678:case 36198:case 36298:case 36306:case 35682:return Qb;case 35679:case 36299:case 36307:return tw;case 35680:case 36300:case 36308:case 36293:return ew;case 36289:case 36303:case 36311:case 36292:return nw}}class rw{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.setValue=zb(e.type)}}class sw{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.size=e.size,this.setValue=iw(e.type)}}class ow{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,n){const i=this.seq;for(let s=0,o=i.length;s!==o;++s){const a=i[s];a.setValue(t,e[a.id],n)}}}const su=/(\w+)(\])?(\[|\.)?/g;function rp(r,t){r.seq.push(t),r.map[t.id]=t}function aw(r,t,e){const n=r.name,i=n.length;for(su.lastIndex=0;;){const s=su.exec(n),o=su.lastIndex;let a=s[1];const l=s[2]==="]",c=s[3];if(l&&(a=a|0),c===void 0||c==="["&&o+2===i){rp(e,c===void 0?new rw(a,r,t):new sw(a,r,t));break}else{let h=e.map[a];h===void 0&&(h=new ow(a),rp(e,h)),e=h}}}class _l{constructor(t,e){this.seq=[],this.map={};const n=t.getProgramParameter(e,35718);for(let i=0;i<n;++i){const s=t.getActiveUniform(e,i),o=t.getUniformLocation(e,s.name);aw(s,o,this)}}setValue(t,e,n,i){const s=this.map[e];s!==void 0&&s.setValue(t,n,i)}setOptional(t,e,n){const i=e[n];i!==void 0&&this.setValue(t,n,i)}static upload(t,e,n,i){for(let s=0,o=e.length;s!==o;++s){const a=e[s],l=n[a.id];l.needsUpdate!==!1&&a.setValue(t,l.value,i)}}static seqWithValue(t,e){const n=[];for(let i=0,s=t.length;i!==s;++i){const o=t[i];o.id in e&&n.push(o)}return n}}function sp(r,t,e){const n=r.createShader(t);return r.shaderSource(n,e),r.compileShader(n),n}let lw=0;function cw(r,t){const e=r.split(`
`),n=[],i=Math.max(t-6,0),s=Math.min(t+6,e.length);for(let o=i;o<s;o++){const a=o+1;n.push(`${a===t?">":" "} ${a}: ${e[o]}`)}return n.join(`
`)}function uw(r){switch(r){case as:return["Linear","( value )"];case me:return["sRGB","( value )"];default:return console.warn("THREE.WebGLProgram: Unsupported encoding:",r),["Linear","( value )"]}}function op(r,t,e){const n=r.getShaderParameter(t,35713),i=r.getShaderInfoLog(t).trim();if(n&&i==="")return"";const s=/ERROR: 0:(\d+)/.exec(i);if(s){const o=parseInt(s[1]);return e.toUpperCase()+`

`+i+`

`+cw(r.getShaderSource(t),o)}else return i}function hw(r,t){const e=uw(t);return"vec4 "+r+"( vec4 value ) { return LinearTo"+e[0]+e[1]+"; }"}function fw(r,t){let e;switch(t){case Iv:e="Linear";break;case Ov:e="Reinhard";break;case Nv:e="OptimizedCineon";break;case Fv:e="ACESFilmic";break;case zv:e="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",t),e="Linear"}return"vec3 "+r+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}function dw(r){return[r.extensionDerivatives||r.envMapCubeUVHeight||r.bumpMap||r.tangentSpaceNormalMap||r.clearcoatNormalMap||r.flatShading||r.shaderID==="physical"?"#extension GL_OES_standard_derivatives : enable":"",(r.extensionFragDepth||r.logarithmicDepthBuffer)&&r.rendererExtensionFragDepth?"#extension GL_EXT_frag_depth : enable":"",r.extensionDrawBuffers&&r.rendererExtensionDrawBuffers?"#extension GL_EXT_draw_buffers : require":"",(r.extensionShaderTextureLOD||r.envMap||r.transmission)&&r.rendererExtensionShaderTextureLod?"#extension GL_EXT_shader_texture_lod : enable":""].filter(Lo).join(`
`)}function pw(r){const t=[];for(const e in r){const n=r[e];n!==!1&&t.push("#define "+e+" "+n)}return t.join(`
`)}function mw(r,t){const e={},n=r.getProgramParameter(t,35721);for(let i=0;i<n;i++){const s=r.getActiveAttrib(t,i),o=s.name;let a=1;s.type===35674&&(a=2),s.type===35675&&(a=3),s.type===35676&&(a=4),e[o]={type:s.type,location:r.getAttribLocation(t,o),locationSize:a}}return e}function Lo(r){return r!==""}function ap(r,t){return r.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function lp(r,t){return r.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}const gw=/^[ \t]*#include +<([\w\d./]+)>/gm;function rh(r){return r.replace(gw,_w)}function _w(r,t){const e=Jt[t];if(e===void 0)throw new Error("Can not resolve #include <"+t+">");return rh(e)}const xw=/#pragma unroll_loop[\s]+?for \( int i \= (\d+)\; i < (\d+)\; i \+\+ \) \{([\s\S]+?)(?=\})\}/g,vw=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function cp(r){return r.replace(vw,s_).replace(xw,yw)}function yw(r,t,e,n){return console.warn("WebGLProgram: #pragma unroll_loop shader syntax is deprecated. Please use #pragma unroll_loop_start syntax instead."),s_(r,t,e,n)}function s_(r,t,e,n){let i="";for(let s=parseInt(t);s<parseInt(e);s++)i+=n.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return i}function up(r){let t="precision "+r.precision+` float;
precision `+r.precision+" int;";return r.precision==="highp"?t+=`
#define HIGH_PRECISION`:r.precision==="mediump"?t+=`
#define MEDIUM_PRECISION`:r.precision==="lowp"&&(t+=`
#define LOW_PRECISION`),t}function Mw(r){let t="SHADOWMAP_TYPE_BASIC";return r.shadowMapType===zg?t="SHADOWMAP_TYPE_PCF":r.shadowMapType===uv?t="SHADOWMAP_TYPE_PCF_SOFT":r.shadowMapType===Po&&(t="SHADOWMAP_TYPE_VSM"),t}function Sw(r){let t="ENVMAP_TYPE_CUBE";if(r.envMap)switch(r.envMapMode){case ao:case lo:t="ENVMAP_TYPE_CUBE";break;case ec:t="ENVMAP_TYPE_CUBE_UV";break}return t}function bw(r){let t="ENVMAP_MODE_REFLECTION";if(r.envMap)switch(r.envMapMode){case lo:t="ENVMAP_MODE_REFRACTION";break}return t}function ww(r){let t="ENVMAP_BLENDING_NONE";if(r.envMap)switch(r.combine){case tc:t="ENVMAP_BLENDING_MULTIPLY";break;case Dv:t="ENVMAP_BLENDING_MIX";break;case Rv:t="ENVMAP_BLENDING_ADD";break}return t}function Tw(r){const t=r.envMapCubeUVHeight;if(t===null)return null;const e=Math.log2(t)-2,n=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,e),7*16)),texelHeight:n,maxMip:e}}function Ew(r,t,e,n){const i=r.getContext(),s=e.defines;let o=e.vertexShader,a=e.fragmentShader;const l=Mw(e),c=Sw(e),u=bw(e),h=ww(e),f=Tw(e),d=e.isWebGL2?"":dw(e),g=pw(s),p=i.createProgram();let m,_,M=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(m=[g].filter(Lo).join(`
`),m.length>0&&(m+=`
`),_=[d,g].filter(Lo).join(`
`),_.length>0&&(_+=`
`)):(m=[up(e),"#define SHADER_NAME "+e.shaderName,g,e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.supportsVertexTextures?"#define VERTEX_TEXTURES":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+u:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMap&&e.objectSpaceNormalMap?"#define OBJECTSPACE_NORMALMAP":"",e.normalMap&&e.tangentSpaceNormalMap?"#define TANGENTSPACE_NORMALMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.displacementMap&&e.supportsVertexTextures?"#define USE_DISPLACEMENTMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularIntensityMap?"#define USE_SPECULARINTENSITYMAP":"",e.specularColorMap?"#define USE_SPECULARCOLORMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEENCOLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEENROUGHNESSMAP":"",e.vertexTangents?"#define USE_TANGENT":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUvs?"#define USE_UV":"",e.uvsVertexOnly?"#define UVS_VERTEX_ONLY":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors&&e.isWebGL2?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0&&e.isWebGL2?"#define MORPHTARGETS_TEXTURE":"",e.morphTargetsCount>0&&e.isWebGL2?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0&&e.isWebGL2?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.logarithmicDepthBuffer&&e.rendererExtensionFragDepth?"#define USE_LOGDEPTHBUF_EXT":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#if ( defined( USE_MORPHTARGETS ) && ! defined( MORPHTARGETS_TEXTURE ) )","	attribute vec3 morphTarget0;","	attribute vec3 morphTarget1;","	attribute vec3 morphTarget2;","	attribute vec3 morphTarget3;","	#ifdef USE_MORPHNORMALS","		attribute vec3 morphNormal0;","		attribute vec3 morphNormal1;","		attribute vec3 morphNormal2;","		attribute vec3 morphNormal3;","	#else","		attribute vec3 morphTarget4;","		attribute vec3 morphTarget5;","		attribute vec3 morphTarget6;","		attribute vec3 morphTarget7;","	#endif","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Lo).join(`
`),_=[d,up(e),"#define SHADER_NAME "+e.shaderName,g,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+c:"",e.envMap?"#define "+u:"",e.envMap?"#define "+h:"",f?"#define CUBEUV_TEXEL_WIDTH "+f.texelWidth:"",f?"#define CUBEUV_TEXEL_HEIGHT "+f.texelHeight:"",f?"#define CUBEUV_MAX_MIP "+f.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMap&&e.objectSpaceNormalMap?"#define OBJECTSPACE_NORMALMAP":"",e.normalMap&&e.tangentSpaceNormalMap?"#define TANGENTSPACE_NORMALMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularIntensityMap?"#define USE_SPECULARINTENSITYMAP":"",e.specularColorMap?"#define USE_SPECULARCOLORMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEENCOLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEENROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.vertexTangents?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUvs?"#define USE_UV":"",e.uvsVertexOnly?"#define UVS_VERTEX_ONLY":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.physicallyCorrectLights?"#define PHYSICALLY_CORRECT_LIGHTS":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.logarithmicDepthBuffer&&e.rendererExtensionFragDepth?"#define USE_LOGDEPTHBUF_EXT":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==Xi?"#define TONE_MAPPING":"",e.toneMapping!==Xi?Jt.tonemapping_pars_fragment:"",e.toneMapping!==Xi?fw("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",Jt.encodings_pars_fragment,hw("linearToOutputTexel",e.outputEncoding),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(Lo).join(`
`)),o=rh(o),o=ap(o,e),o=lp(o,e),a=rh(a),a=ap(a,e),a=lp(a,e),o=cp(o),a=cp(a),e.isWebGL2&&e.isRawShaderMaterial!==!0&&(M=`#version 300 es
`,m=["precision mediump sampler2DArray;","#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,_=["#define varying in",e.glslVersion===Rd?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===Rd?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+_);const b=M+m+o,x=M+_+a,v=sp(i,35633,b),E=sp(i,35632,x);if(i.attachShader(p,v),i.attachShader(p,E),e.index0AttributeName!==void 0?i.bindAttribLocation(p,0,e.index0AttributeName):e.morphTargets===!0&&i.bindAttribLocation(p,0,"position"),i.linkProgram(p),r.debug.checkShaderErrors){const w=i.getProgramInfoLog(p).trim(),D=i.getShaderInfoLog(v).trim(),B=i.getShaderInfoLog(E).trim();let k=!0,Z=!0;if(i.getProgramParameter(p,35714)===!1){k=!1;const V=op(i,v,"vertex"),$=op(i,E,"fragment");console.error("THREE.WebGLProgram: Shader Error "+i.getError()+" - VALIDATE_STATUS "+i.getProgramParameter(p,35715)+`

Program Info Log: `+w+`
`+V+`
`+$)}else w!==""?console.warn("THREE.WebGLProgram: Program Info Log:",w):(D===""||B==="")&&(Z=!1);Z&&(this.diagnostics={runnable:k,programLog:w,vertexShader:{log:D,prefix:m},fragmentShader:{log:B,prefix:_}})}i.deleteShader(v),i.deleteShader(E);let C;this.getUniforms=function(){return C===void 0&&(C=new _l(i,p)),C};let y;return this.getAttributes=function(){return y===void 0&&(y=mw(i,p)),y},this.destroy=function(){n.releaseStatesOfProgram(this),i.deleteProgram(p),this.program=void 0},this.name=e.shaderName,this.id=lw++,this.cacheKey=t,this.usedTimes=1,this.program=p,this.vertexShader=v,this.fragmentShader=E,this}let Cw=0;class Aw{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t){const e=t.vertexShader,n=t.fragmentShader,i=this._getShaderStage(e),s=this._getShaderStage(n),o=this._getShaderCacheForMaterial(t);return o.has(i)===!1&&(o.add(i),i.usedTimes++),o.has(s)===!1&&(o.add(s),s.usedTimes++),this}remove(t){const e=this.materialCache.get(t);for(const n of e)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(t),this}getVertexShaderID(t){return this._getShaderStage(t.vertexShader).id}getFragmentShaderID(t){return this._getShaderStage(t.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){const e=this.materialCache;return e.has(t)===!1&&e.set(t,new Set),e.get(t)}_getShaderStage(t){const e=this.shaderCache;if(e.has(t)===!1){const n=new Pw(t);e.set(t,n)}return e.get(t)}}class Pw{constructor(t){this.id=Cw++,this.code=t,this.usedTimes=0}}function Lw(r,t,e,n,i,s,o){const a=new $g,l=new Aw,c=[],u=i.isWebGL2,h=i.logarithmicDepthBuffer,f=i.vertexTextures;let d=i.precision;const g={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function p(y,w,D,B,k){const Z=B.fog,V=k.geometry,$=y.isMeshStandardMaterial?B.environment:null,Y=(y.isMeshStandardMaterial?e:t).get(y.envMap||$),H=Y&&Y.mapping===ec?Y.image.height:null,G=g[y.type];y.precision!==null&&(d=i.getMaxPrecision(y.precision),d!==y.precision&&console.warn("THREE.WebGLProgram.getParameters:",y.precision,"not supported, using",d,"instead."));const q=V.morphAttributes.position||V.morphAttributes.normal||V.morphAttributes.color,P=q!==void 0?q.length:0;let nt=0;V.morphAttributes.position!==void 0&&(nt=1),V.morphAttributes.normal!==void 0&&(nt=2),V.morphAttributes.color!==void 0&&(nt=3);let A,O,T,I;if(G){const ut=pi[G];A=ut.vertexShader,O=ut.fragmentShader}else A=y.vertexShader,O=y.fragmentShader,l.update(y),T=l.getVertexShaderID(y),I=l.getFragmentShaderID(y);const z=r.getRenderTarget(),U=y.alphaTest>0,j=y.clearcoat>0,rt=y.iridescence>0;return{isWebGL2:u,shaderID:G,shaderName:y.type,vertexShader:A,fragmentShader:O,defines:y.defines,customVertexShaderID:T,customFragmentShaderID:I,isRawShaderMaterial:y.isRawShaderMaterial===!0,glslVersion:y.glslVersion,precision:d,instancing:k.isInstancedMesh===!0,instancingColor:k.isInstancedMesh===!0&&k.instanceColor!==null,supportsVertexTextures:f,outputEncoding:z===null?r.outputEncoding:z.isXRRenderTarget===!0?z.texture.encoding:as,map:!!y.map,matcap:!!y.matcap,envMap:!!Y,envMapMode:Y&&Y.mapping,envMapCubeUVHeight:H,lightMap:!!y.lightMap,aoMap:!!y.aoMap,emissiveMap:!!y.emissiveMap,bumpMap:!!y.bumpMap,normalMap:!!y.normalMap,objectSpaceNormalMap:y.normalMapType===ny,tangentSpaceNormalMap:y.normalMapType===fo,decodeVideoTexture:!!y.map&&y.map.isVideoTexture===!0&&y.map.encoding===me,clearcoat:j,clearcoatMap:j&&!!y.clearcoatMap,clearcoatRoughnessMap:j&&!!y.clearcoatRoughnessMap,clearcoatNormalMap:j&&!!y.clearcoatNormalMap,iridescence:rt,iridescenceMap:rt&&!!y.iridescenceMap,iridescenceThicknessMap:rt&&!!y.iridescenceThicknessMap,displacementMap:!!y.displacementMap,roughnessMap:!!y.roughnessMap,metalnessMap:!!y.metalnessMap,specularMap:!!y.specularMap,specularIntensityMap:!!y.specularIntensityMap,specularColorMap:!!y.specularColorMap,opaque:y.transparent===!1&&y.blending===Ys,alphaMap:!!y.alphaMap,alphaTest:U,gradientMap:!!y.gradientMap,sheen:y.sheen>0,sheenColorMap:!!y.sheenColorMap,sheenRoughnessMap:!!y.sheenRoughnessMap,transmission:y.transmission>0,transmissionMap:!!y.transmissionMap,thicknessMap:!!y.thicknessMap,combine:y.combine,vertexTangents:!!y.normalMap&&!!V.attributes.tangent,vertexColors:y.vertexColors,vertexAlphas:y.vertexColors===!0&&!!V.attributes.color&&V.attributes.color.itemSize===4,vertexUvs:!!y.map||!!y.bumpMap||!!y.normalMap||!!y.specularMap||!!y.alphaMap||!!y.emissiveMap||!!y.roughnessMap||!!y.metalnessMap||!!y.clearcoatMap||!!y.clearcoatRoughnessMap||!!y.clearcoatNormalMap||!!y.iridescenceMap||!!y.iridescenceThicknessMap||!!y.displacementMap||!!y.transmissionMap||!!y.thicknessMap||!!y.specularIntensityMap||!!y.specularColorMap||!!y.sheenColorMap||!!y.sheenRoughnessMap,uvsVertexOnly:!(y.map||y.bumpMap||y.normalMap||y.specularMap||y.alphaMap||y.emissiveMap||y.roughnessMap||y.metalnessMap||y.clearcoatNormalMap||y.iridescenceMap||y.iridescenceThicknessMap||y.transmission>0||y.transmissionMap||y.thicknessMap||y.specularIntensityMap||y.specularColorMap||y.sheen>0||y.sheenColorMap||y.sheenRoughnessMap)&&!!y.displacementMap,fog:!!Z,useFog:y.fog===!0,fogExp2:Z&&Z.isFogExp2,flatShading:!!y.flatShading,sizeAttenuation:y.sizeAttenuation,logarithmicDepthBuffer:h,skinning:k.isSkinnedMesh===!0,morphTargets:V.morphAttributes.position!==void 0,morphNormals:V.morphAttributes.normal!==void 0,morphColors:V.morphAttributes.color!==void 0,morphTargetsCount:P,morphTextureStride:nt,numDirLights:w.directional.length,numPointLights:w.point.length,numSpotLights:w.spot.length,numRectAreaLights:w.rectArea.length,numHemiLights:w.hemi.length,numDirLightShadows:w.directionalShadowMap.length,numPointLightShadows:w.pointShadowMap.length,numSpotLightShadows:w.spotShadowMap.length,numClippingPlanes:o.numPlanes,numClipIntersection:o.numIntersection,dithering:y.dithering,shadowMapEnabled:r.shadowMap.enabled&&D.length>0,shadowMapType:r.shadowMap.type,toneMapping:y.toneMapped?r.toneMapping:Xi,physicallyCorrectLights:r.physicallyCorrectLights,premultipliedAlpha:y.premultipliedAlpha,doubleSided:y.side===oo,flipSided:y.side===si,useDepthPacking:!!y.depthPacking,depthPacking:y.depthPacking||0,index0AttributeName:y.index0AttributeName,extensionDerivatives:y.extensions&&y.extensions.derivatives,extensionFragDepth:y.extensions&&y.extensions.fragDepth,extensionDrawBuffers:y.extensions&&y.extensions.drawBuffers,extensionShaderTextureLOD:y.extensions&&y.extensions.shaderTextureLOD,rendererExtensionFragDepth:u||n.has("EXT_frag_depth"),rendererExtensionDrawBuffers:u||n.has("WEBGL_draw_buffers"),rendererExtensionShaderTextureLod:u||n.has("EXT_shader_texture_lod"),customProgramCacheKey:y.customProgramCacheKey()}}function m(y){const w=[];if(y.shaderID?w.push(y.shaderID):(w.push(y.customVertexShaderID),w.push(y.customFragmentShaderID)),y.defines!==void 0)for(const D in y.defines)w.push(D),w.push(y.defines[D]);return y.isRawShaderMaterial===!1&&(_(w,y),M(w,y),w.push(r.outputEncoding)),w.push(y.customProgramCacheKey),w.join()}function _(y,w){y.push(w.precision),y.push(w.outputEncoding),y.push(w.envMapMode),y.push(w.envMapCubeUVHeight),y.push(w.combine),y.push(w.vertexUvs),y.push(w.fogExp2),y.push(w.sizeAttenuation),y.push(w.morphTargetsCount),y.push(w.morphAttributeCount),y.push(w.numDirLights),y.push(w.numPointLights),y.push(w.numSpotLights),y.push(w.numHemiLights),y.push(w.numRectAreaLights),y.push(w.numDirLightShadows),y.push(w.numPointLightShadows),y.push(w.numSpotLightShadows),y.push(w.shadowMapType),y.push(w.toneMapping),y.push(w.numClippingPlanes),y.push(w.numClipIntersection),y.push(w.depthPacking)}function M(y,w){a.disableAll(),w.isWebGL2&&a.enable(0),w.supportsVertexTextures&&a.enable(1),w.instancing&&a.enable(2),w.instancingColor&&a.enable(3),w.map&&a.enable(4),w.matcap&&a.enable(5),w.envMap&&a.enable(6),w.lightMap&&a.enable(7),w.aoMap&&a.enable(8),w.emissiveMap&&a.enable(9),w.bumpMap&&a.enable(10),w.normalMap&&a.enable(11),w.objectSpaceNormalMap&&a.enable(12),w.tangentSpaceNormalMap&&a.enable(13),w.clearcoat&&a.enable(14),w.clearcoatMap&&a.enable(15),w.clearcoatRoughnessMap&&a.enable(16),w.clearcoatNormalMap&&a.enable(17),w.iridescence&&a.enable(18),w.iridescenceMap&&a.enable(19),w.iridescenceThicknessMap&&a.enable(20),w.displacementMap&&a.enable(21),w.specularMap&&a.enable(22),w.roughnessMap&&a.enable(23),w.metalnessMap&&a.enable(24),w.gradientMap&&a.enable(25),w.alphaMap&&a.enable(26),w.alphaTest&&a.enable(27),w.vertexColors&&a.enable(28),w.vertexAlphas&&a.enable(29),w.vertexUvs&&a.enable(30),w.vertexTangents&&a.enable(31),w.uvsVertexOnly&&a.enable(32),w.fog&&a.enable(33),y.push(a.mask),a.disableAll(),w.useFog&&a.enable(0),w.flatShading&&a.enable(1),w.logarithmicDepthBuffer&&a.enable(2),w.skinning&&a.enable(3),w.morphTargets&&a.enable(4),w.morphNormals&&a.enable(5),w.morphColors&&a.enable(6),w.premultipliedAlpha&&a.enable(7),w.shadowMapEnabled&&a.enable(8),w.physicallyCorrectLights&&a.enable(9),w.doubleSided&&a.enable(10),w.flipSided&&a.enable(11),w.useDepthPacking&&a.enable(12),w.dithering&&a.enable(13),w.specularIntensityMap&&a.enable(14),w.specularColorMap&&a.enable(15),w.transmission&&a.enable(16),w.transmissionMap&&a.enable(17),w.thicknessMap&&a.enable(18),w.sheen&&a.enable(19),w.sheenColorMap&&a.enable(20),w.sheenRoughnessMap&&a.enable(21),w.decodeVideoTexture&&a.enable(22),w.opaque&&a.enable(23),y.push(a.mask)}function b(y){const w=g[y.type];let D;if(w){const B=pi[w];D=_y.clone(B.uniforms)}else D=y.uniforms;return D}function x(y,w){let D;for(let B=0,k=c.length;B<k;B++){const Z=c[B];if(Z.cacheKey===w){D=Z,++D.usedTimes;break}}return D===void 0&&(D=new Ew(r,w,y,s),c.push(D)),D}function v(y){if(--y.usedTimes===0){const w=c.indexOf(y);c[w]=c[c.length-1],c.pop(),y.destroy()}}function E(y){l.remove(y)}function C(){l.dispose()}return{getParameters:p,getProgramCacheKey:m,getUniforms:b,acquireProgram:x,releaseProgram:v,releaseShaderCache:E,programs:c,dispose:C}}function Dw(){let r=new WeakMap;function t(s){let o=r.get(s);return o===void 0&&(o={},r.set(s,o)),o}function e(s){r.delete(s)}function n(s,o,a){r.get(s)[o]=a}function i(){r=new WeakMap}return{get:t,remove:e,update:n,dispose:i}}function Rw(r,t){return r.groupOrder!==t.groupOrder?r.groupOrder-t.groupOrder:r.renderOrder!==t.renderOrder?r.renderOrder-t.renderOrder:r.material.id!==t.material.id?r.material.id-t.material.id:r.z!==t.z?r.z-t.z:r.id-t.id}function hp(r,t){return r.groupOrder!==t.groupOrder?r.groupOrder-t.groupOrder:r.renderOrder!==t.renderOrder?r.renderOrder-t.renderOrder:r.z!==t.z?t.z-r.z:r.id-t.id}function fp(){const r=[];let t=0;const e=[],n=[],i=[];function s(){t=0,e.length=0,n.length=0,i.length=0}function o(h,f,d,g,p,m){let _=r[t];return _===void 0?(_={id:h.id,object:h,geometry:f,material:d,groupOrder:g,renderOrder:h.renderOrder,z:p,group:m},r[t]=_):(_.id=h.id,_.object=h,_.geometry=f,_.material=d,_.groupOrder=g,_.renderOrder=h.renderOrder,_.z=p,_.group=m),t++,_}function a(h,f,d,g,p,m){const _=o(h,f,d,g,p,m);d.transmission>0?n.push(_):d.transparent===!0?i.push(_):e.push(_)}function l(h,f,d,g,p,m){const _=o(h,f,d,g,p,m);d.transmission>0?n.unshift(_):d.transparent===!0?i.unshift(_):e.unshift(_)}function c(h,f){e.length>1&&e.sort(h||Rw),n.length>1&&n.sort(f||hp),i.length>1&&i.sort(f||hp)}function u(){for(let h=t,f=r.length;h<f;h++){const d=r[h];if(d.id===null)break;d.id=null,d.object=null,d.geometry=null,d.material=null,d.group=null}}return{opaque:e,transmissive:n,transparent:i,init:s,push:a,unshift:l,finish:u,sort:c}}function Iw(){let r=new WeakMap;function t(n,i){let s;return r.has(n)===!1?(s=new fp,r.set(n,[s])):i>=r.get(n).length?(s=new fp,r.get(n).push(s)):s=r.get(n)[i],s}function e(){r=new WeakMap}return{get:t,dispose:e}}function Ow(){const r={};return{get:function(t){if(r[t.id]!==void 0)return r[t.id];let e;switch(t.type){case"DirectionalLight":e={direction:new J,color:new $t};break;case"SpotLight":e={position:new J,direction:new J,color:new $t,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new J,color:new $t,distance:0,decay:0};break;case"HemisphereLight":e={direction:new J,skyColor:new $t,groundColor:new $t};break;case"RectAreaLight":e={color:new $t,position:new J,halfWidth:new J,halfHeight:new J};break}return r[t.id]=e,e}}}function Nw(){const r={};return{get:function(t){if(r[t.id]!==void 0)return r[t.id];let e;switch(t.type){case"DirectionalLight":e={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new vt};break;case"SpotLight":e={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new vt};break;case"PointLight":e={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new vt,shadowCameraNear:1,shadowCameraFar:1e3};break}return r[t.id]=e,e}}}let Fw=0;function zw(r,t){return(t.castShadow?1:0)-(r.castShadow?1:0)}function kw(r,t){const e=new Ow,n=Nw(),i={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotShadow:[],spotShadowMap:[],spotShadowMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[]};for(let u=0;u<9;u++)i.probe.push(new J);const s=new J,o=new Ne,a=new Ne;function l(u,h){let f=0,d=0,g=0;for(let w=0;w<9;w++)i.probe[w].set(0,0,0);let p=0,m=0,_=0,M=0,b=0,x=0,v=0,E=0;u.sort(zw);const C=h!==!0?Math.PI:1;for(let w=0,D=u.length;w<D;w++){const B=u[w],k=B.color,Z=B.intensity,V=B.distance,$=B.shadow&&B.shadow.map?B.shadow.map.texture:null;if(B.isAmbientLight)f+=k.r*Z*C,d+=k.g*Z*C,g+=k.b*Z*C;else if(B.isLightProbe)for(let Y=0;Y<9;Y++)i.probe[Y].addScaledVector(B.sh.coefficients[Y],Z);else if(B.isDirectionalLight){const Y=e.get(B);if(Y.color.copy(B.color).multiplyScalar(B.intensity*C),B.castShadow){const H=B.shadow,G=n.get(B);G.shadowBias=H.bias,G.shadowNormalBias=H.normalBias,G.shadowRadius=H.radius,G.shadowMapSize=H.mapSize,i.directionalShadow[p]=G,i.directionalShadowMap[p]=$,i.directionalShadowMatrix[p]=B.shadow.matrix,x++}i.directional[p]=Y,p++}else if(B.isSpotLight){const Y=e.get(B);if(Y.position.setFromMatrixPosition(B.matrixWorld),Y.color.copy(k).multiplyScalar(Z*C),Y.distance=V,Y.coneCos=Math.cos(B.angle),Y.penumbraCos=Math.cos(B.angle*(1-B.penumbra)),Y.decay=B.decay,B.castShadow){const H=B.shadow,G=n.get(B);G.shadowBias=H.bias,G.shadowNormalBias=H.normalBias,G.shadowRadius=H.radius,G.shadowMapSize=H.mapSize,i.spotShadow[_]=G,i.spotShadowMap[_]=$,i.spotShadowMatrix[_]=B.shadow.matrix,E++}i.spot[_]=Y,_++}else if(B.isRectAreaLight){const Y=e.get(B);Y.color.copy(k).multiplyScalar(Z),Y.halfWidth.set(B.width*.5,0,0),Y.halfHeight.set(0,B.height*.5,0),i.rectArea[M]=Y,M++}else if(B.isPointLight){const Y=e.get(B);if(Y.color.copy(B.color).multiplyScalar(B.intensity*C),Y.distance=B.distance,Y.decay=B.decay,B.castShadow){const H=B.shadow,G=n.get(B);G.shadowBias=H.bias,G.shadowNormalBias=H.normalBias,G.shadowRadius=H.radius,G.shadowMapSize=H.mapSize,G.shadowCameraNear=H.camera.near,G.shadowCameraFar=H.camera.far,i.pointShadow[m]=G,i.pointShadowMap[m]=$,i.pointShadowMatrix[m]=B.shadow.matrix,v++}i.point[m]=Y,m++}else if(B.isHemisphereLight){const Y=e.get(B);Y.skyColor.copy(B.color).multiplyScalar(Z*C),Y.groundColor.copy(B.groundColor).multiplyScalar(Z*C),i.hemi[b]=Y,b++}}M>0&&(t.isWebGL2||r.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=Tt.LTC_FLOAT_1,i.rectAreaLTC2=Tt.LTC_FLOAT_2):r.has("OES_texture_half_float_linear")===!0?(i.rectAreaLTC1=Tt.LTC_HALF_1,i.rectAreaLTC2=Tt.LTC_HALF_2):console.error("THREE.WebGLRenderer: Unable to use RectAreaLight. Missing WebGL extensions.")),i.ambient[0]=f,i.ambient[1]=d,i.ambient[2]=g;const y=i.hash;(y.directionalLength!==p||y.pointLength!==m||y.spotLength!==_||y.rectAreaLength!==M||y.hemiLength!==b||y.numDirectionalShadows!==x||y.numPointShadows!==v||y.numSpotShadows!==E)&&(i.directional.length=p,i.spot.length=_,i.rectArea.length=M,i.point.length=m,i.hemi.length=b,i.directionalShadow.length=x,i.directionalShadowMap.length=x,i.pointShadow.length=v,i.pointShadowMap.length=v,i.spotShadow.length=E,i.spotShadowMap.length=E,i.directionalShadowMatrix.length=x,i.pointShadowMatrix.length=v,i.spotShadowMatrix.length=E,y.directionalLength=p,y.pointLength=m,y.spotLength=_,y.rectAreaLength=M,y.hemiLength=b,y.numDirectionalShadows=x,y.numPointShadows=v,y.numSpotShadows=E,i.version=Fw++)}function c(u,h){let f=0,d=0,g=0,p=0,m=0;const _=h.matrixWorldInverse;for(let M=0,b=u.length;M<b;M++){const x=u[M];if(x.isDirectionalLight){const v=i.directional[f];v.direction.setFromMatrixPosition(x.matrixWorld),s.setFromMatrixPosition(x.target.matrixWorld),v.direction.sub(s),v.direction.transformDirection(_),f++}else if(x.isSpotLight){const v=i.spot[g];v.position.setFromMatrixPosition(x.matrixWorld),v.position.applyMatrix4(_),v.direction.setFromMatrixPosition(x.matrixWorld),s.setFromMatrixPosition(x.target.matrixWorld),v.direction.sub(s),v.direction.transformDirection(_),g++}else if(x.isRectAreaLight){const v=i.rectArea[p];v.position.setFromMatrixPosition(x.matrixWorld),v.position.applyMatrix4(_),a.identity(),o.copy(x.matrixWorld),o.premultiply(_),a.extractRotation(o),v.halfWidth.set(x.width*.5,0,0),v.halfHeight.set(0,x.height*.5,0),v.halfWidth.applyMatrix4(a),v.halfHeight.applyMatrix4(a),p++}else if(x.isPointLight){const v=i.point[d];v.position.setFromMatrixPosition(x.matrixWorld),v.position.applyMatrix4(_),d++}else if(x.isHemisphereLight){const v=i.hemi[m];v.direction.setFromMatrixPosition(x.matrixWorld),v.direction.transformDirection(_),m++}}}return{setup:l,setupView:c,state:i}}function dp(r,t){const e=new kw(r,t),n=[],i=[];function s(){n.length=0,i.length=0}function o(h){n.push(h)}function a(h){i.push(h)}function l(h){e.setup(n,h)}function c(h){e.setupView(n,h)}return{init:s,state:{lightsArray:n,shadowsArray:i,lights:e},setupLights:l,setupLightsView:c,pushLight:o,pushShadow:a}}function Uw(r,t){let e=new WeakMap;function n(s,o=0){let a;return e.has(s)===!1?(a=new dp(r,t),e.set(s,[a])):o>=e.get(s).length?(a=new dp(r,t),e.get(s).push(a)):a=e.get(s)[o],a}function i(){e=new WeakMap}return{get:n,dispose:i}}class o_ extends Be{constructor(t){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=ty,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}}class a_ extends Be{constructor(t){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.referencePosition=new J,this.nearDistance=1,this.farDistance=1e3,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.referencePosition.copy(t.referencePosition),this.nearDistance=t.nearDistance,this.farDistance=t.farDistance,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}}const Bw=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,Vw=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function Gw(r,t,e){let n=new Qg;const i=new vt,s=new vt,o=new $e,a=new o_({depthPacking:ey}),l=new a_,c={},u=e.maxTextureSize,h={0:si,1:ia,2:oo},f=new ji({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new vt},radius:{value:4}},vertexShader:Bw,fragmentShader:Vw}),d=f.clone();d.defines.HORIZONTAL_PASS=1;const g=new Zi;g.setAttribute("position",new bi(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const p=new fr(g,f),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=zg,this.render=function(x,v,E){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||x.length===0)return;const C=r.getRenderTarget(),y=r.getActiveCubeFace(),w=r.getActiveMipmapLevel(),D=r.state;D.setBlending(xr),D.buffers.color.setClear(1,1,1,1),D.buffers.depth.setTest(!0),D.setScissorTest(!1);for(let B=0,k=x.length;B<k;B++){const Z=x[B],V=Z.shadow;if(V===void 0){console.warn("THREE.WebGLShadowMap:",Z,"has no shadow.");continue}if(V.autoUpdate===!1&&V.needsUpdate===!1)continue;i.copy(V.mapSize);const $=V.getFrameExtents();if(i.multiply($),s.copy(V.mapSize),(i.x>u||i.y>u)&&(i.x>u&&(s.x=Math.floor(u/$.x),i.x=s.x*$.x,V.mapSize.x=s.x),i.y>u&&(s.y=Math.floor(u/$.y),i.y=s.y*$.y,V.mapSize.y=s.y)),V.map===null&&!V.isPointLightShadow&&this.type===Po&&(V.map=new vr(i.x,i.y),V.map.texture.name=Z.name+".shadowMap",V.mapPass=new vr(i.x,i.y),V.camera.updateProjectionMatrix()),V.map===null){const H={minFilter:pn,magFilter:pn,format:ri};V.map=new vr(i.x,i.y,H),V.map.texture.name=Z.name+".shadowMap",V.camera.updateProjectionMatrix()}r.setRenderTarget(V.map),r.clear();const Y=V.getViewportCount();for(let H=0;H<Y;H++){const G=V.getViewport(H);o.set(s.x*G.x,s.y*G.y,s.x*G.z,s.y*G.w),D.viewport(o),V.updateMatrices(Z,H),n=V.getFrustum(),b(v,E,V.camera,Z,this.type)}!V.isPointLightShadow&&this.type===Po&&_(V,E),V.needsUpdate=!1}m.needsUpdate=!1,r.setRenderTarget(C,y,w)};function _(x,v){const E=t.update(p);f.defines.VSM_SAMPLES!==x.blurSamples&&(f.defines.VSM_SAMPLES=x.blurSamples,d.defines.VSM_SAMPLES=x.blurSamples,f.needsUpdate=!0,d.needsUpdate=!0),f.uniforms.shadow_pass.value=x.map.texture,f.uniforms.resolution.value=x.mapSize,f.uniforms.radius.value=x.radius,r.setRenderTarget(x.mapPass),r.clear(),r.renderBufferDirect(v,null,E,f,p,null),d.uniforms.shadow_pass.value=x.mapPass.texture,d.uniforms.resolution.value=x.mapSize,d.uniforms.radius.value=x.radius,r.setRenderTarget(x.map),r.clear(),r.renderBufferDirect(v,null,E,d,p,null)}function M(x,v,E,C,y,w){let D=null;const B=E.isPointLight===!0?x.customDistanceMaterial:x.customDepthMaterial;if(B!==void 0?D=B:D=E.isPointLight===!0?l:a,r.localClippingEnabled&&v.clipShadows===!0&&v.clippingPlanes.length!==0||v.displacementMap&&v.displacementScale!==0||v.alphaMap&&v.alphaTest>0){const k=D.uuid,Z=v.uuid;let V=c[k];V===void 0&&(V={},c[k]=V);let $=V[Z];$===void 0&&($=D.clone(),V[Z]=$),D=$}return D.visible=v.visible,D.wireframe=v.wireframe,w===Po?D.side=v.shadowSide!==null?v.shadowSide:v.side:D.side=v.shadowSide!==null?v.shadowSide:h[v.side],D.alphaMap=v.alphaMap,D.alphaTest=v.alphaTest,D.clipShadows=v.clipShadows,D.clippingPlanes=v.clippingPlanes,D.clipIntersection=v.clipIntersection,D.displacementMap=v.displacementMap,D.displacementScale=v.displacementScale,D.displacementBias=v.displacementBias,D.wireframeLinewidth=v.wireframeLinewidth,D.linewidth=v.linewidth,E.isPointLight===!0&&D.isMeshDistanceMaterial===!0&&(D.referencePosition.setFromMatrixPosition(E.matrixWorld),D.nearDistance=C,D.farDistance=y),D}function b(x,v,E,C,y){if(x.visible===!1)return;if(x.layers.test(v.layers)&&(x.isMesh||x.isLine||x.isPoints)&&(x.castShadow||x.receiveShadow&&y===Po)&&(!x.frustumCulled||n.intersectsObject(x))){x.modelViewMatrix.multiplyMatrices(E.matrixWorldInverse,x.matrixWorld);const B=t.update(x),k=x.material;if(Array.isArray(k)){const Z=B.groups;for(let V=0,$=Z.length;V<$;V++){const Y=Z[V],H=k[Y.materialIndex];if(H&&H.visible){const G=M(x,H,C,E.near,E.far,y);r.renderBufferDirect(E,null,B,G,x,Y)}}}else if(k.visible){const Z=M(x,k,C,E.near,E.far,y);r.renderBufferDirect(E,null,B,Z,x,null)}}const D=x.children;for(let B=0,k=D.length;B<k;B++)b(D[B],v,E,C,y)}}function Hw(r,t,e){const n=e.isWebGL2;function i(){let X=!1;const gt=new $e;let Mt=null;const Ot=new $e(0,0,0,0);return{setMask:function(bt){Mt!==bt&&!X&&(r.colorMask(bt,bt,bt,bt),Mt=bt)},setLocked:function(bt){X=bt},setClear:function(bt,Pt,lt,Nt,Xt){Xt===!0&&(bt*=Nt,Pt*=Nt,lt*=Nt),gt.set(bt,Pt,lt,Nt),Ot.equals(gt)===!1&&(r.clearColor(bt,Pt,lt,Nt),Ot.copy(gt))},reset:function(){X=!1,Mt=null,Ot.set(-1,0,0,0)}}}function s(){let X=!1,gt=null,Mt=null,Ot=null;return{setTest:function(bt){bt?I(2929):z(2929)},setMask:function(bt){gt!==bt&&!X&&(r.depthMask(bt),gt=bt)},setFunc:function(bt){if(Mt!==bt){if(bt)switch(bt){case wv:r.depthFunc(512);break;case Tv:r.depthFunc(519);break;case Ev:r.depthFunc(513);break;case Ju:r.depthFunc(515);break;case Cv:r.depthFunc(514);break;case Av:r.depthFunc(518);break;case Pv:r.depthFunc(516);break;case Lv:r.depthFunc(517);break;default:r.depthFunc(515)}else r.depthFunc(515);Mt=bt}},setLocked:function(bt){X=bt},setClear:function(bt){Ot!==bt&&(r.clearDepth(bt),Ot=bt)},reset:function(){X=!1,gt=null,Mt=null,Ot=null}}}function o(){let X=!1,gt=null,Mt=null,Ot=null,bt=null,Pt=null,lt=null,Nt=null,Xt=null;return{setTest:function(Gt){X||(Gt?I(2960):z(2960))},setMask:function(Gt){gt!==Gt&&!X&&(r.stencilMask(Gt),gt=Gt)},setFunc:function(Gt,se,we){(Mt!==Gt||Ot!==se||bt!==we)&&(r.stencilFunc(Gt,se,we),Mt=Gt,Ot=se,bt=we)},setOp:function(Gt,se,we){(Pt!==Gt||lt!==se||Nt!==we)&&(r.stencilOp(Gt,se,we),Pt=Gt,lt=se,Nt=we)},setLocked:function(Gt){X=Gt},setClear:function(Gt){Xt!==Gt&&(r.clearStencil(Gt),Xt=Gt)},reset:function(){X=!1,gt=null,Mt=null,Ot=null,bt=null,Pt=null,lt=null,Nt=null,Xt=null}}}const a=new i,l=new s,c=new o;let u={},h={},f=new WeakMap,d=[],g=null,p=!1,m=null,_=null,M=null,b=null,x=null,v=null,E=null,C=!1,y=null,w=null,D=null,B=null,k=null;const Z=r.getParameter(35661);let V=!1,$=0;const Y=r.getParameter(7938);Y.indexOf("WebGL")!==-1?($=parseFloat(/^WebGL (\d)/.exec(Y)[1]),V=$>=1):Y.indexOf("OpenGL ES")!==-1&&($=parseFloat(/^OpenGL ES (\d)/.exec(Y)[1]),V=$>=2);let H=null,G={};const q=r.getParameter(3088),P=r.getParameter(2978),nt=new $e().fromArray(q),A=new $e().fromArray(P);function O(X,gt,Mt){const Ot=new Uint8Array(4),bt=r.createTexture();r.bindTexture(X,bt),r.texParameteri(X,10241,9728),r.texParameteri(X,10240,9728);for(let Pt=0;Pt<Mt;Pt++)r.texImage2D(gt+Pt,0,6408,1,1,0,6408,5121,Ot);return bt}const T={};T[3553]=O(3553,3553,1),T[34067]=O(34067,34069,6),a.setClear(0,0,0,1),l.setClear(1),c.setClear(0),I(2929),l.setFunc(Ju),it(!1),dt(nd),I(2884),ot(xr);function I(X){u[X]!==!0&&(r.enable(X),u[X]=!0)}function z(X){u[X]!==!1&&(r.disable(X),u[X]=!1)}function U(X,gt){return h[X]!==gt?(r.bindFramebuffer(X,gt),h[X]=gt,n&&(X===36009&&(h[36160]=gt),X===36160&&(h[36009]=gt)),!0):!1}function j(X,gt){let Mt=d,Ot=!1;if(X)if(Mt=f.get(gt),Mt===void 0&&(Mt=[],f.set(gt,Mt)),X.isWebGLMultipleRenderTargets){const bt=X.texture;if(Mt.length!==bt.length||Mt[0]!==36064){for(let Pt=0,lt=bt.length;Pt<lt;Pt++)Mt[Pt]=36064+Pt;Mt.length=bt.length,Ot=!0}}else Mt[0]!==36064&&(Mt[0]=36064,Ot=!0);else Mt[0]!==1029&&(Mt[0]=1029,Ot=!0);Ot&&(e.isWebGL2?r.drawBuffers(Mt):t.get("WEBGL_draw_buffers").drawBuffersWEBGL(Mt))}function rt(X){return g!==X?(r.useProgram(X),g=X,!0):!1}const tt={[Rs]:32774,[dv]:32778,[pv]:32779};if(n)tt[od]=32775,tt[ad]=32776;else{const X=t.get("EXT_blend_minmax");X!==null&&(tt[od]=X.MIN_EXT,tt[ad]=X.MAX_EXT)}const ut={[mv]:0,[gv]:1,[_v]:768,[kg]:770,[bv]:776,[Mv]:774,[vv]:772,[xv]:769,[Ug]:771,[Sv]:775,[yv]:773};function ot(X,gt,Mt,Ot,bt,Pt,lt,Nt){if(X===xr){p===!0&&(z(3042),p=!1);return}if(p===!1&&(I(3042),p=!0),X!==fv){if(X!==m||Nt!==C){if((_!==Rs||x!==Rs)&&(r.blendEquation(32774),_=Rs,x=Rs),Nt)switch(X){case Ys:r.blendFuncSeparate(1,771,1,771);break;case id:r.blendFunc(1,1);break;case rd:r.blendFuncSeparate(0,769,0,1);break;case sd:r.blendFuncSeparate(0,768,0,770);break;default:console.error("THREE.WebGLState: Invalid blending: ",X);break}else switch(X){case Ys:r.blendFuncSeparate(770,771,1,771);break;case id:r.blendFunc(770,1);break;case rd:r.blendFuncSeparate(0,769,0,1);break;case sd:r.blendFunc(0,768);break;default:console.error("THREE.WebGLState: Invalid blending: ",X);break}M=null,b=null,v=null,E=null,m=X,C=Nt}return}bt=bt||gt,Pt=Pt||Mt,lt=lt||Ot,(gt!==_||bt!==x)&&(r.blendEquationSeparate(tt[gt],tt[bt]),_=gt,x=bt),(Mt!==M||Ot!==b||Pt!==v||lt!==E)&&(r.blendFuncSeparate(ut[Mt],ut[Ot],ut[Pt],ut[lt]),M=Mt,b=Ot,v=Pt,E=lt),m=X,C=null}function at(X,gt){X.side===oo?z(2884):I(2884);let Mt=X.side===si;gt&&(Mt=!Mt),it(Mt),X.blending===Ys&&X.transparent===!1?ot(xr):ot(X.blending,X.blendEquation,X.blendSrc,X.blendDst,X.blendEquationAlpha,X.blendSrcAlpha,X.blendDstAlpha,X.premultipliedAlpha),l.setFunc(X.depthFunc),l.setTest(X.depthTest),l.setMask(X.depthWrite),a.setMask(X.colorWrite);const Ot=X.stencilWrite;c.setTest(Ot),Ot&&(c.setMask(X.stencilWriteMask),c.setFunc(X.stencilFunc,X.stencilRef,X.stencilFuncMask),c.setOp(X.stencilFail,X.stencilZFail,X.stencilZPass)),S(X.polygonOffset,X.polygonOffsetFactor,X.polygonOffsetUnits),X.alphaToCoverage===!0?I(32926):z(32926)}function it(X){y!==X&&(X?r.frontFace(2304):r.frontFace(2305),y=X)}function dt(X){X!==lv?(I(2884),X!==w&&(X===nd?r.cullFace(1029):X===cv?r.cullFace(1028):r.cullFace(1032))):z(2884),w=X}function W(X){X!==D&&(V&&r.lineWidth(X),D=X)}function S(X,gt,Mt){X?(I(32823),(B!==gt||k!==Mt)&&(r.polygonOffset(gt,Mt),B=gt,k=Mt)):z(32823)}function pt(X){X?I(3089):z(3089)}function yt(X){X===void 0&&(X=33984+Z-1),H!==X&&(r.activeTexture(X),H=X)}function Lt(X,gt){H===null&&yt();let Mt=G[H];Mt===void 0&&(Mt={type:void 0,texture:void 0},G[H]=Mt),(Mt.type!==X||Mt.texture!==gt)&&(r.bindTexture(X,gt||T[X]),Mt.type=X,Mt.texture=gt)}function Et(){const X=G[H];X!==void 0&&X.type!==void 0&&(r.bindTexture(X.type,null),X.type=void 0,X.texture=void 0)}function F(){try{r.compressedTexImage2D.apply(r,arguments)}catch(X){console.error("THREE.WebGLState:",X)}}function L(){try{r.texSubImage2D.apply(r,arguments)}catch(X){console.error("THREE.WebGLState:",X)}}function st(){try{r.texSubImage3D.apply(r,arguments)}catch(X){console.error("THREE.WebGLState:",X)}}function ht(){try{r.compressedTexSubImage2D.apply(r,arguments)}catch(X){console.error("THREE.WebGLState:",X)}}function xt(){try{r.texStorage2D.apply(r,arguments)}catch(X){console.error("THREE.WebGLState:",X)}}function _t(){try{r.texStorage3D.apply(r,arguments)}catch(X){console.error("THREE.WebGLState:",X)}}function Ct(){try{r.texImage2D.apply(r,arguments)}catch(X){console.error("THREE.WebGLState:",X)}}function N(){try{r.texImage3D.apply(r,arguments)}catch(X){console.error("THREE.WebGLState:",X)}}function ft(X){nt.equals(X)===!1&&(r.scissor(X.x,X.y,X.z,X.w),nt.copy(X))}function St(X){A.equals(X)===!1&&(r.viewport(X.x,X.y,X.z,X.w),A.copy(X))}function mt(){r.disable(3042),r.disable(2884),r.disable(2929),r.disable(32823),r.disable(3089),r.disable(2960),r.disable(32926),r.blendEquation(32774),r.blendFunc(1,0),r.blendFuncSeparate(1,0,1,0),r.colorMask(!0,!0,!0,!0),r.clearColor(0,0,0,0),r.depthMask(!0),r.depthFunc(513),r.clearDepth(1),r.stencilMask(4294967295),r.stencilFunc(519,0,4294967295),r.stencilOp(7680,7680,7680),r.clearStencil(0),r.cullFace(1029),r.frontFace(2305),r.polygonOffset(0,0),r.activeTexture(33984),r.bindFramebuffer(36160,null),n===!0&&(r.bindFramebuffer(36009,null),r.bindFramebuffer(36008,null)),r.useProgram(null),r.lineWidth(1),r.scissor(0,0,r.canvas.width,r.canvas.height),r.viewport(0,0,r.canvas.width,r.canvas.height),u={},H=null,G={},h={},f=new WeakMap,d=[],g=null,p=!1,m=null,_=null,M=null,b=null,x=null,v=null,E=null,C=!1,y=null,w=null,D=null,B=null,k=null,nt.set(0,0,r.canvas.width,r.canvas.height),A.set(0,0,r.canvas.width,r.canvas.height),a.reset(),l.reset(),c.reset()}return{buffers:{color:a,depth:l,stencil:c},enable:I,disable:z,bindFramebuffer:U,drawBuffers:j,useProgram:rt,setBlending:ot,setMaterial:at,setFlipSided:it,setCullFace:dt,setLineWidth:W,setPolygonOffset:S,setScissorTest:pt,activeTexture:yt,bindTexture:Lt,unbindTexture:Et,compressedTexImage2D:F,texImage2D:Ct,texImage3D:N,texStorage2D:xt,texStorage3D:_t,texSubImage2D:L,texSubImage3D:st,compressedTexSubImage2D:ht,scissor:ft,viewport:St,reset:mt}}function Ww(r,t,e,n,i,s,o){const a=i.isWebGL2,l=i.maxTextures,c=i.maxCubemapSize,u=i.maxTextureSize,h=i.maxSamples,f=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,d=/OculusBrowser/g.test(navigator.userAgent),g=new WeakMap;let p;const m=new WeakMap;let _=!1;try{_=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function M(F,L){return _?new OffscreenCanvas(F,L):sa("canvas")}function b(F,L,st,ht){let xt=1;if((F.width>ht||F.height>ht)&&(xt=ht/Math.max(F.width,F.height)),xt<1||L===!0)if(typeof HTMLImageElement<"u"&&F instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&F instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&F instanceof ImageBitmap){const _t=L?ih:Math.floor,Ct=_t(xt*F.width),N=_t(xt*F.height);p===void 0&&(p=M(Ct,N));const ft=st?M(Ct,N):p;return ft.width=Ct,ft.height=N,ft.getContext("2d").drawImage(F,0,0,Ct,N),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+F.width+"x"+F.height+") to ("+Ct+"x"+N+")."),ft}else return"data"in F&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+F.width+"x"+F.height+")."),F;return F}function x(F){return Od(F.width)&&Od(F.height)}function v(F){return a?!1:F.wrapS!==ii||F.wrapT!==ii||F.minFilter!==pn&&F.minFilter!==Gn}function E(F,L){return F.generateMipmaps&&L&&F.minFilter!==pn&&F.minFilter!==Gn}function C(F){r.generateMipmap(F)}function y(F,L,st,ht,xt=!1){if(a===!1)return L;if(F!==null){if(r[F]!==void 0)return r[F];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+F+"'")}let _t=L;return L===6403&&(st===5126&&(_t=33326),st===5131&&(_t=33325),st===5121&&(_t=33321)),L===33319&&(st===5126&&(_t=33328),st===5131&&(_t=33327),st===5121&&(_t=33323)),L===6408&&(st===5126&&(_t=34836),st===5131&&(_t=34842),st===5121&&(_t=ht===me&&xt===!1?35907:32856),st===32819&&(_t=32854),st===32820&&(_t=32855)),(_t===33325||_t===33326||_t===33327||_t===33328||_t===34842||_t===34836)&&t.get("EXT_color_buffer_float"),_t}function w(F,L,st){return E(F,st)===!0||F.isFramebufferTexture&&F.minFilter!==pn&&F.minFilter!==Gn?Math.log2(Math.max(L.width,L.height))+1:F.mipmaps!==void 0&&F.mipmaps.length>0?F.mipmaps.length:F.isCompressedTexture&&Array.isArray(F.image)?L.mipmaps.length:1}function D(F){return F===pn||F===ld||F===cd?9728:9729}function B(F){const L=F.target;L.removeEventListener("dispose",B),Z(L),L.isVideoTexture&&g.delete(L)}function k(F){const L=F.target;L.removeEventListener("dispose",k),$(L)}function Z(F){const L=n.get(F);if(L.__webglInit===void 0)return;const st=F.source,ht=m.get(st);if(ht){const xt=ht[L.__cacheKey];xt.usedTimes--,xt.usedTimes===0&&V(F),Object.keys(ht).length===0&&m.delete(st)}n.remove(F)}function V(F){const L=n.get(F);r.deleteTexture(L.__webglTexture);const st=F.source,ht=m.get(st);delete ht[L.__cacheKey],o.memory.textures--}function $(F){const L=F.texture,st=n.get(F),ht=n.get(L);if(ht.__webglTexture!==void 0&&(r.deleteTexture(ht.__webglTexture),o.memory.textures--),F.depthTexture&&F.depthTexture.dispose(),F.isWebGLCubeRenderTarget)for(let xt=0;xt<6;xt++)r.deleteFramebuffer(st.__webglFramebuffer[xt]),st.__webglDepthbuffer&&r.deleteRenderbuffer(st.__webglDepthbuffer[xt]);else{if(r.deleteFramebuffer(st.__webglFramebuffer),st.__webglDepthbuffer&&r.deleteRenderbuffer(st.__webglDepthbuffer),st.__webglMultisampledFramebuffer&&r.deleteFramebuffer(st.__webglMultisampledFramebuffer),st.__webglColorRenderbuffer)for(let xt=0;xt<st.__webglColorRenderbuffer.length;xt++)st.__webglColorRenderbuffer[xt]&&r.deleteRenderbuffer(st.__webglColorRenderbuffer[xt]);st.__webglDepthRenderbuffer&&r.deleteRenderbuffer(st.__webglDepthRenderbuffer)}if(F.isWebGLMultipleRenderTargets)for(let xt=0,_t=L.length;xt<_t;xt++){const Ct=n.get(L[xt]);Ct.__webglTexture&&(r.deleteTexture(Ct.__webglTexture),o.memory.textures--),n.remove(L[xt])}n.remove(L),n.remove(F)}let Y=0;function H(){Y=0}function G(){const F=Y;return F>=l&&console.warn("THREE.WebGLTextures: Trying to use "+F+" texture units while this GPU supports only "+l),Y+=1,F}function q(F){const L=[];return L.push(F.wrapS),L.push(F.wrapT),L.push(F.magFilter),L.push(F.minFilter),L.push(F.anisotropy),L.push(F.internalFormat),L.push(F.format),L.push(F.type),L.push(F.generateMipmaps),L.push(F.premultiplyAlpha),L.push(F.flipY),L.push(F.unpackAlignment),L.push(F.encoding),L.join()}function P(F,L){const st=n.get(F);if(F.isVideoTexture&&Lt(F),F.isRenderTargetTexture===!1&&F.version>0&&st.__version!==F.version){const ht=F.image;if(ht===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(ht.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{j(st,F,L);return}}e.activeTexture(33984+L),e.bindTexture(3553,st.__webglTexture)}function nt(F,L){const st=n.get(F);if(F.version>0&&st.__version!==F.version){j(st,F,L);return}e.activeTexture(33984+L),e.bindTexture(35866,st.__webglTexture)}function A(F,L){const st=n.get(F);if(F.version>0&&st.__version!==F.version){j(st,F,L);return}e.activeTexture(33984+L),e.bindTexture(32879,st.__webglTexture)}function O(F,L){const st=n.get(F);if(F.version>0&&st.__version!==F.version){rt(st,F,L);return}e.activeTexture(33984+L),e.bindTexture(34067,st.__webglTexture)}const T={[th]:10497,[ii]:33071,[eh]:33648},I={[pn]:9728,[ld]:9984,[cd]:9986,[Gn]:9729,[kv]:9985,[nc]:9987};function z(F,L,st){if(st?(r.texParameteri(F,10242,T[L.wrapS]),r.texParameteri(F,10243,T[L.wrapT]),(F===32879||F===35866)&&r.texParameteri(F,32882,T[L.wrapR]),r.texParameteri(F,10240,I[L.magFilter]),r.texParameteri(F,10241,I[L.minFilter])):(r.texParameteri(F,10242,33071),r.texParameteri(F,10243,33071),(F===32879||F===35866)&&r.texParameteri(F,32882,33071),(L.wrapS!==ii||L.wrapT!==ii)&&console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.wrapS and Texture.wrapT should be set to THREE.ClampToEdgeWrapping."),r.texParameteri(F,10240,D(L.magFilter)),r.texParameteri(F,10241,D(L.minFilter)),L.minFilter!==pn&&L.minFilter!==Gn&&console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.minFilter should be set to THREE.NearestFilter or THREE.LinearFilter.")),t.has("EXT_texture_filter_anisotropic")===!0){const ht=t.get("EXT_texture_filter_anisotropic");if(L.type===Hr&&t.has("OES_texture_float_linear")===!1||a===!1&&L.type===ra&&t.has("OES_texture_half_float_linear")===!1)return;(L.anisotropy>1||n.get(L).__currentAnisotropy)&&(r.texParameterf(F,ht.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(L.anisotropy,i.getMaxAnisotropy())),n.get(L).__currentAnisotropy=L.anisotropy)}}function U(F,L){let st=!1;F.__webglInit===void 0&&(F.__webglInit=!0,L.addEventListener("dispose",B));const ht=L.source;let xt=m.get(ht);xt===void 0&&(xt={},m.set(ht,xt));const _t=q(L);if(_t!==F.__cacheKey){xt[_t]===void 0&&(xt[_t]={texture:r.createTexture(),usedTimes:0},o.memory.textures++,st=!0),xt[_t].usedTimes++;const Ct=xt[F.__cacheKey];Ct!==void 0&&(xt[F.__cacheKey].usedTimes--,Ct.usedTimes===0&&V(L)),F.__cacheKey=_t,F.__webglTexture=xt[_t].texture}return st}function j(F,L,st){let ht=3553;L.isDataArrayTexture&&(ht=35866),L.isData3DTexture&&(ht=32879);const xt=U(F,L),_t=L.source;if(e.activeTexture(33984+st),e.bindTexture(ht,F.__webglTexture),_t.version!==_t.__currentVersion||xt===!0){r.pixelStorei(37440,L.flipY),r.pixelStorei(37441,L.premultiplyAlpha),r.pixelStorei(3317,L.unpackAlignment),r.pixelStorei(37443,0);const Ct=v(L)&&x(L.image)===!1;let N=b(L.image,Ct,!1,u);N=Et(L,N);const ft=x(N)||a,St=s.convert(L.format,L.encoding);let mt=s.convert(L.type),X=y(L.internalFormat,St,mt,L.encoding,L.isVideoTexture);z(ht,L,ft);let gt;const Mt=L.mipmaps,Ot=a&&L.isVideoTexture!==!0,bt=_t.__currentVersion===void 0||xt===!0,Pt=w(L,N,ft);if(L.isDepthTexture)X=6402,a?L.type===Hr?X=36012:L.type===Gr?X=33190:L.type===$s?X=35056:X=33189:L.type===Hr&&console.error("WebGLRenderer: Floating point depth texture requires WebGL2."),L.format===Qr&&X===6402&&L.type!==Vg&&L.type!==Gr&&(console.warn("THREE.WebGLRenderer: Use UnsignedShortType or UnsignedIntType for DepthFormat DepthTexture."),L.type=Gr,mt=s.convert(L.type)),L.format===co&&X===6402&&(X=34041,L.type!==$s&&(console.warn("THREE.WebGLRenderer: Use UnsignedInt248Type for DepthStencilFormat DepthTexture."),L.type=$s,mt=s.convert(L.type))),bt&&(Ot?e.texStorage2D(3553,1,X,N.width,N.height):e.texImage2D(3553,0,X,N.width,N.height,0,St,mt,null));else if(L.isDataTexture)if(Mt.length>0&&ft){Ot&&bt&&e.texStorage2D(3553,Pt,X,Mt[0].width,Mt[0].height);for(let lt=0,Nt=Mt.length;lt<Nt;lt++)gt=Mt[lt],Ot?e.texSubImage2D(3553,lt,0,0,gt.width,gt.height,St,mt,gt.data):e.texImage2D(3553,lt,X,gt.width,gt.height,0,St,mt,gt.data);L.generateMipmaps=!1}else Ot?(bt&&e.texStorage2D(3553,Pt,X,N.width,N.height),e.texSubImage2D(3553,0,0,0,N.width,N.height,St,mt,N.data)):e.texImage2D(3553,0,X,N.width,N.height,0,St,mt,N.data);else if(L.isCompressedTexture){Ot&&bt&&e.texStorage2D(3553,Pt,X,Mt[0].width,Mt[0].height);for(let lt=0,Nt=Mt.length;lt<Nt;lt++)gt=Mt[lt],L.format!==ri?St!==null?Ot?e.compressedTexSubImage2D(3553,lt,0,0,gt.width,gt.height,St,gt.data):e.compressedTexImage2D(3553,lt,X,gt.width,gt.height,0,gt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Ot?e.texSubImage2D(3553,lt,0,0,gt.width,gt.height,St,mt,gt.data):e.texImage2D(3553,lt,X,gt.width,gt.height,0,St,mt,gt.data)}else if(L.isDataArrayTexture)Ot?(bt&&e.texStorage3D(35866,Pt,X,N.width,N.height,N.depth),e.texSubImage3D(35866,0,0,0,0,N.width,N.height,N.depth,St,mt,N.data)):e.texImage3D(35866,0,X,N.width,N.height,N.depth,0,St,mt,N.data);else if(L.isData3DTexture)Ot?(bt&&e.texStorage3D(32879,Pt,X,N.width,N.height,N.depth),e.texSubImage3D(32879,0,0,0,0,N.width,N.height,N.depth,St,mt,N.data)):e.texImage3D(32879,0,X,N.width,N.height,N.depth,0,St,mt,N.data);else if(L.isFramebufferTexture){if(bt)if(Ot)e.texStorage2D(3553,Pt,X,N.width,N.height);else{let lt=N.width,Nt=N.height;for(let Xt=0;Xt<Pt;Xt++)e.texImage2D(3553,Xt,X,lt,Nt,0,St,mt,null),lt>>=1,Nt>>=1}}else if(Mt.length>0&&ft){Ot&&bt&&e.texStorage2D(3553,Pt,X,Mt[0].width,Mt[0].height);for(let lt=0,Nt=Mt.length;lt<Nt;lt++)gt=Mt[lt],Ot?e.texSubImage2D(3553,lt,0,0,St,mt,gt):e.texImage2D(3553,lt,X,St,mt,gt);L.generateMipmaps=!1}else Ot?(bt&&e.texStorage2D(3553,Pt,X,N.width,N.height),e.texSubImage2D(3553,0,0,0,St,mt,N)):e.texImage2D(3553,0,X,St,mt,N);E(L,ft)&&C(ht),_t.__currentVersion=_t.version,L.onUpdate&&L.onUpdate(L)}F.__version=L.version}function rt(F,L,st){if(L.image.length!==6)return;const ht=U(F,L),xt=L.source;if(e.activeTexture(33984+st),e.bindTexture(34067,F.__webglTexture),xt.version!==xt.__currentVersion||ht===!0){r.pixelStorei(37440,L.flipY),r.pixelStorei(37441,L.premultiplyAlpha),r.pixelStorei(3317,L.unpackAlignment),r.pixelStorei(37443,0);const _t=L.isCompressedTexture||L.image[0].isCompressedTexture,Ct=L.image[0]&&L.image[0].isDataTexture,N=[];for(let lt=0;lt<6;lt++)!_t&&!Ct?N[lt]=b(L.image[lt],!1,!0,c):N[lt]=Ct?L.image[lt].image:L.image[lt],N[lt]=Et(L,N[lt]);const ft=N[0],St=x(ft)||a,mt=s.convert(L.format,L.encoding),X=s.convert(L.type),gt=y(L.internalFormat,mt,X,L.encoding),Mt=a&&L.isVideoTexture!==!0,Ot=xt.__currentVersion===void 0||ht===!0;let bt=w(L,ft,St);z(34067,L,St);let Pt;if(_t){Mt&&Ot&&e.texStorage2D(34067,bt,gt,ft.width,ft.height);for(let lt=0;lt<6;lt++){Pt=N[lt].mipmaps;for(let Nt=0;Nt<Pt.length;Nt++){const Xt=Pt[Nt];L.format!==ri?mt!==null?Mt?e.compressedTexSubImage2D(34069+lt,Nt,0,0,Xt.width,Xt.height,mt,Xt.data):e.compressedTexImage2D(34069+lt,Nt,gt,Xt.width,Xt.height,0,Xt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Mt?e.texSubImage2D(34069+lt,Nt,0,0,Xt.width,Xt.height,mt,X,Xt.data):e.texImage2D(34069+lt,Nt,gt,Xt.width,Xt.height,0,mt,X,Xt.data)}}}else{Pt=L.mipmaps,Mt&&Ot&&(Pt.length>0&&bt++,e.texStorage2D(34067,bt,gt,N[0].width,N[0].height));for(let lt=0;lt<6;lt++)if(Ct){Mt?e.texSubImage2D(34069+lt,0,0,0,N[lt].width,N[lt].height,mt,X,N[lt].data):e.texImage2D(34069+lt,0,gt,N[lt].width,N[lt].height,0,mt,X,N[lt].data);for(let Nt=0;Nt<Pt.length;Nt++){const Gt=Pt[Nt].image[lt].image;Mt?e.texSubImage2D(34069+lt,Nt+1,0,0,Gt.width,Gt.height,mt,X,Gt.data):e.texImage2D(34069+lt,Nt+1,gt,Gt.width,Gt.height,0,mt,X,Gt.data)}}else{Mt?e.texSubImage2D(34069+lt,0,0,0,mt,X,N[lt]):e.texImage2D(34069+lt,0,gt,mt,X,N[lt]);for(let Nt=0;Nt<Pt.length;Nt++){const Xt=Pt[Nt];Mt?e.texSubImage2D(34069+lt,Nt+1,0,0,mt,X,Xt.image[lt]):e.texImage2D(34069+lt,Nt+1,gt,mt,X,Xt.image[lt])}}}E(L,St)&&C(34067),xt.__currentVersion=xt.version,L.onUpdate&&L.onUpdate(L)}F.__version=L.version}function tt(F,L,st,ht,xt){const _t=s.convert(st.format,st.encoding),Ct=s.convert(st.type),N=y(st.internalFormat,_t,Ct,st.encoding);n.get(L).__hasExternalTextures||(xt===32879||xt===35866?e.texImage3D(xt,0,N,L.width,L.height,L.depth,0,_t,Ct,null):e.texImage2D(xt,0,N,L.width,L.height,0,_t,Ct,null)),e.bindFramebuffer(36160,F),yt(L)?f.framebufferTexture2DMultisampleEXT(36160,ht,xt,n.get(st).__webglTexture,0,pt(L)):r.framebufferTexture2D(36160,ht,xt,n.get(st).__webglTexture,0),e.bindFramebuffer(36160,null)}function ut(F,L,st){if(r.bindRenderbuffer(36161,F),L.depthBuffer&&!L.stencilBuffer){let ht=33189;if(st||yt(L)){const xt=L.depthTexture;xt&&xt.isDepthTexture&&(xt.type===Hr?ht=36012:xt.type===Gr&&(ht=33190));const _t=pt(L);yt(L)?f.renderbufferStorageMultisampleEXT(36161,_t,ht,L.width,L.height):r.renderbufferStorageMultisample(36161,_t,ht,L.width,L.height)}else r.renderbufferStorage(36161,ht,L.width,L.height);r.framebufferRenderbuffer(36160,36096,36161,F)}else if(L.depthBuffer&&L.stencilBuffer){const ht=pt(L);st&&yt(L)===!1?r.renderbufferStorageMultisample(36161,ht,35056,L.width,L.height):yt(L)?f.renderbufferStorageMultisampleEXT(36161,ht,35056,L.width,L.height):r.renderbufferStorage(36161,34041,L.width,L.height),r.framebufferRenderbuffer(36160,33306,36161,F)}else{const ht=L.isWebGLMultipleRenderTargets===!0?L.texture:[L.texture];for(let xt=0;xt<ht.length;xt++){const _t=ht[xt],Ct=s.convert(_t.format,_t.encoding),N=s.convert(_t.type),ft=y(_t.internalFormat,Ct,N,_t.encoding),St=pt(L);st&&yt(L)===!1?r.renderbufferStorageMultisample(36161,St,ft,L.width,L.height):yt(L)?f.renderbufferStorageMultisampleEXT(36161,St,ft,L.width,L.height):r.renderbufferStorage(36161,ft,L.width,L.height)}}r.bindRenderbuffer(36161,null)}function ot(F,L){if(L&&L.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(e.bindFramebuffer(36160,F),!(L.depthTexture&&L.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");(!n.get(L.depthTexture).__webglTexture||L.depthTexture.image.width!==L.width||L.depthTexture.image.height!==L.height)&&(L.depthTexture.image.width=L.width,L.depthTexture.image.height=L.height,L.depthTexture.needsUpdate=!0),P(L.depthTexture,0);const ht=n.get(L.depthTexture).__webglTexture,xt=pt(L);if(L.depthTexture.format===Qr)yt(L)?f.framebufferTexture2DMultisampleEXT(36160,36096,3553,ht,0,xt):r.framebufferTexture2D(36160,36096,3553,ht,0);else if(L.depthTexture.format===co)yt(L)?f.framebufferTexture2DMultisampleEXT(36160,33306,3553,ht,0,xt):r.framebufferTexture2D(36160,33306,3553,ht,0);else throw new Error("Unknown depthTexture format")}function at(F){const L=n.get(F),st=F.isWebGLCubeRenderTarget===!0;if(F.depthTexture&&!L.__autoAllocateDepthBuffer){if(st)throw new Error("target.depthTexture not supported in Cube render targets");ot(L.__webglFramebuffer,F)}else if(st){L.__webglDepthbuffer=[];for(let ht=0;ht<6;ht++)e.bindFramebuffer(36160,L.__webglFramebuffer[ht]),L.__webglDepthbuffer[ht]=r.createRenderbuffer(),ut(L.__webglDepthbuffer[ht],F,!1)}else e.bindFramebuffer(36160,L.__webglFramebuffer),L.__webglDepthbuffer=r.createRenderbuffer(),ut(L.__webglDepthbuffer,F,!1);e.bindFramebuffer(36160,null)}function it(F,L,st){const ht=n.get(F);L!==void 0&&tt(ht.__webglFramebuffer,F,F.texture,36064,3553),st!==void 0&&at(F)}function dt(F){const L=F.texture,st=n.get(F),ht=n.get(L);F.addEventListener("dispose",k),F.isWebGLMultipleRenderTargets!==!0&&(ht.__webglTexture===void 0&&(ht.__webglTexture=r.createTexture()),ht.__version=L.version,o.memory.textures++);const xt=F.isWebGLCubeRenderTarget===!0,_t=F.isWebGLMultipleRenderTargets===!0,Ct=x(F)||a;if(xt){st.__webglFramebuffer=[];for(let N=0;N<6;N++)st.__webglFramebuffer[N]=r.createFramebuffer()}else{if(st.__webglFramebuffer=r.createFramebuffer(),_t)if(i.drawBuffers){const N=F.texture;for(let ft=0,St=N.length;ft<St;ft++){const mt=n.get(N[ft]);mt.__webglTexture===void 0&&(mt.__webglTexture=r.createTexture(),o.memory.textures++)}}else console.warn("THREE.WebGLRenderer: WebGLMultipleRenderTargets can only be used with WebGL2 or WEBGL_draw_buffers extension.");if(a&&F.samples>0&&yt(F)===!1){const N=_t?L:[L];st.__webglMultisampledFramebuffer=r.createFramebuffer(),st.__webglColorRenderbuffer=[],e.bindFramebuffer(36160,st.__webglMultisampledFramebuffer);for(let ft=0;ft<N.length;ft++){const St=N[ft];st.__webglColorRenderbuffer[ft]=r.createRenderbuffer(),r.bindRenderbuffer(36161,st.__webglColorRenderbuffer[ft]);const mt=s.convert(St.format,St.encoding),X=s.convert(St.type),gt=y(St.internalFormat,mt,X,St.encoding),Mt=pt(F);r.renderbufferStorageMultisample(36161,Mt,gt,F.width,F.height),r.framebufferRenderbuffer(36160,36064+ft,36161,st.__webglColorRenderbuffer[ft])}r.bindRenderbuffer(36161,null),F.depthBuffer&&(st.__webglDepthRenderbuffer=r.createRenderbuffer(),ut(st.__webglDepthRenderbuffer,F,!0)),e.bindFramebuffer(36160,null)}}if(xt){e.bindTexture(34067,ht.__webglTexture),z(34067,L,Ct);for(let N=0;N<6;N++)tt(st.__webglFramebuffer[N],F,L,36064,34069+N);E(L,Ct)&&C(34067),e.unbindTexture()}else if(_t){const N=F.texture;for(let ft=0,St=N.length;ft<St;ft++){const mt=N[ft],X=n.get(mt);e.bindTexture(3553,X.__webglTexture),z(3553,mt,Ct),tt(st.__webglFramebuffer,F,mt,36064+ft,3553),E(mt,Ct)&&C(3553)}e.unbindTexture()}else{let N=3553;(F.isWebGL3DRenderTarget||F.isWebGLArrayRenderTarget)&&(a?N=F.isWebGL3DRenderTarget?32879:35866:console.error("THREE.WebGLTextures: THREE.Data3DTexture and THREE.DataArrayTexture only supported with WebGL2.")),e.bindTexture(N,ht.__webglTexture),z(N,L,Ct),tt(st.__webglFramebuffer,F,L,36064,N),E(L,Ct)&&C(N),e.unbindTexture()}F.depthBuffer&&at(F)}function W(F){const L=x(F)||a,st=F.isWebGLMultipleRenderTargets===!0?F.texture:[F.texture];for(let ht=0,xt=st.length;ht<xt;ht++){const _t=st[ht];if(E(_t,L)){const Ct=F.isWebGLCubeRenderTarget?34067:3553,N=n.get(_t).__webglTexture;e.bindTexture(Ct,N),C(Ct),e.unbindTexture()}}}function S(F){if(a&&F.samples>0&&yt(F)===!1){const L=F.isWebGLMultipleRenderTargets?F.texture:[F.texture],st=F.width,ht=F.height;let xt=16384;const _t=[],Ct=F.stencilBuffer?33306:36096,N=n.get(F),ft=F.isWebGLMultipleRenderTargets===!0;if(ft)for(let St=0;St<L.length;St++)e.bindFramebuffer(36160,N.__webglMultisampledFramebuffer),r.framebufferRenderbuffer(36160,36064+St,36161,null),e.bindFramebuffer(36160,N.__webglFramebuffer),r.framebufferTexture2D(36009,36064+St,3553,null,0);e.bindFramebuffer(36008,N.__webglMultisampledFramebuffer),e.bindFramebuffer(36009,N.__webglFramebuffer);for(let St=0;St<L.length;St++){_t.push(36064+St),F.depthBuffer&&_t.push(Ct);const mt=N.__ignoreDepthValues!==void 0?N.__ignoreDepthValues:!1;if(mt===!1&&(F.depthBuffer&&(xt|=256),F.stencilBuffer&&(xt|=1024)),ft&&r.framebufferRenderbuffer(36008,36064,36161,N.__webglColorRenderbuffer[St]),mt===!0&&(r.invalidateFramebuffer(36008,[Ct]),r.invalidateFramebuffer(36009,[Ct])),ft){const X=n.get(L[St]).__webglTexture;r.framebufferTexture2D(36009,36064,3553,X,0)}r.blitFramebuffer(0,0,st,ht,0,0,st,ht,xt,9728),d&&r.invalidateFramebuffer(36008,_t)}if(e.bindFramebuffer(36008,null),e.bindFramebuffer(36009,null),ft)for(let St=0;St<L.length;St++){e.bindFramebuffer(36160,N.__webglMultisampledFramebuffer),r.framebufferRenderbuffer(36160,36064+St,36161,N.__webglColorRenderbuffer[St]);const mt=n.get(L[St]).__webglTexture;e.bindFramebuffer(36160,N.__webglFramebuffer),r.framebufferTexture2D(36009,36064+St,3553,mt,0)}e.bindFramebuffer(36009,N.__webglMultisampledFramebuffer)}}function pt(F){return Math.min(h,F.samples)}function yt(F){const L=n.get(F);return a&&F.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&L.__useRenderToTexture!==!1}function Lt(F){const L=o.render.frame;g.get(F)!==L&&(g.set(F,L),F.update())}function Et(F,L){const st=F.encoding,ht=F.format,xt=F.type;return F.isCompressedTexture===!0||F.isVideoTexture===!0||F.format===nh||st!==as&&(st===me?a===!1?t.has("EXT_sRGB")===!0&&ht===ri?(F.format=nh,F.minFilter=Gn,F.generateMipmaps=!1):L=Wg.sRGBToLinear(L):(ht!==ri||xt!==os)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture encoding:",st)),L}this.allocateTextureUnit=G,this.resetTextureUnits=H,this.setTexture2D=P,this.setTexture2DArray=nt,this.setTexture3D=A,this.setTextureCube=O,this.rebindTextures=it,this.setupRenderTarget=dt,this.updateRenderTargetMipmap=W,this.updateMultisampleRenderTarget=S,this.setupDepthRenderbuffer=at,this.setupFrameBufferTexture=tt,this.useMultisampledRTT=yt}function Xw(r,t,e){const n=e.isWebGL2;function i(s,o=null){let a;if(s===os)return 5121;if(s===Gv)return 32819;if(s===Hv)return 32820;if(s===Uv)return 5120;if(s===Bv)return 5122;if(s===Vg)return 5123;if(s===Vv)return 5124;if(s===Gr)return 5125;if(s===Hr)return 5126;if(s===ra)return n?5131:(a=t.get("OES_texture_half_float"),a!==null?a.HALF_FLOAT_OES:null);if(s===Wv)return 6406;if(s===ri)return 6408;if(s===qv)return 6409;if(s===Yv)return 6410;if(s===Qr)return 6402;if(s===co)return 34041;if(s===$v)return 6403;if(s===Xv)return console.warn("THREE.WebGLRenderer: THREE.RGBFormat has been removed. Use THREE.RGBAFormat instead. https://github.com/mrdoob/three.js/pull/23228"),6408;if(s===nh)return a=t.get("EXT_sRGB"),a!==null?a.SRGB_ALPHA_EXT:null;if(s===jv)return 36244;if(s===Zv)return 33319;if(s===Jv)return 33320;if(s===Kv)return 36249;if(s===Ac||s===Pc||s===Lc||s===Dc)if(o===me)if(a=t.get("WEBGL_compressed_texture_s3tc_srgb"),a!==null){if(s===Ac)return a.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(s===Pc)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(s===Lc)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(s===Dc)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(a=t.get("WEBGL_compressed_texture_s3tc"),a!==null){if(s===Ac)return a.COMPRESSED_RGB_S3TC_DXT1_EXT;if(s===Pc)return a.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(s===Lc)return a.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(s===Dc)return a.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(s===ud||s===hd||s===fd||s===dd)if(a=t.get("WEBGL_compressed_texture_pvrtc"),a!==null){if(s===ud)return a.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(s===hd)return a.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(s===fd)return a.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(s===dd)return a.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(s===Qv)return a=t.get("WEBGL_compressed_texture_etc1"),a!==null?a.COMPRESSED_RGB_ETC1_WEBGL:null;if(s===pd||s===md)if(a=t.get("WEBGL_compressed_texture_etc"),a!==null){if(s===pd)return o===me?a.COMPRESSED_SRGB8_ETC2:a.COMPRESSED_RGB8_ETC2;if(s===md)return o===me?a.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:a.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(s===gd||s===_d||s===xd||s===vd||s===yd||s===Md||s===Sd||s===bd||s===wd||s===Td||s===Ed||s===Cd||s===Ad||s===Pd)if(a=t.get("WEBGL_compressed_texture_astc"),a!==null){if(s===gd)return o===me?a.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:a.COMPRESSED_RGBA_ASTC_4x4_KHR;if(s===_d)return o===me?a.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:a.COMPRESSED_RGBA_ASTC_5x4_KHR;if(s===xd)return o===me?a.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:a.COMPRESSED_RGBA_ASTC_5x5_KHR;if(s===vd)return o===me?a.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:a.COMPRESSED_RGBA_ASTC_6x5_KHR;if(s===yd)return o===me?a.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:a.COMPRESSED_RGBA_ASTC_6x6_KHR;if(s===Md)return o===me?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:a.COMPRESSED_RGBA_ASTC_8x5_KHR;if(s===Sd)return o===me?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:a.COMPRESSED_RGBA_ASTC_8x6_KHR;if(s===bd)return o===me?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:a.COMPRESSED_RGBA_ASTC_8x8_KHR;if(s===wd)return o===me?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:a.COMPRESSED_RGBA_ASTC_10x5_KHR;if(s===Td)return o===me?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:a.COMPRESSED_RGBA_ASTC_10x6_KHR;if(s===Ed)return o===me?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:a.COMPRESSED_RGBA_ASTC_10x8_KHR;if(s===Cd)return o===me?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:a.COMPRESSED_RGBA_ASTC_10x10_KHR;if(s===Ad)return o===me?a.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:a.COMPRESSED_RGBA_ASTC_12x10_KHR;if(s===Pd)return o===me?a.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:a.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(s===Ld)if(a=t.get("EXT_texture_compression_bptc"),a!==null){if(s===Ld)return o===me?a.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:a.COMPRESSED_RGBA_BPTC_UNORM_EXT}else return null;return s===$s?n?34042:(a=t.get("WEBGL_depth_texture"),a!==null?a.UNSIGNED_INT_24_8_WEBGL:null):r[s]!==void 0?r[s]:null}return{convert:i}}class qw extends ni{constructor(t=[]){super(),this.isArrayCamera=!0,this.cameras=t}}class Ja extends Yn{constructor(){super(),this.isGroup=!0,this.type="Group"}}const Yw={type:"move"};class ou{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Ja,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Ja,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new J,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new J),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Ja,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new J,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new J),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,n){let i=null,s=null,o=null;const a=this._targetRay,l=this._grip,c=this._hand;if(t&&e.session.visibilityState!=="visible-blurred")if(a!==null&&(i=e.getPose(t.targetRaySpace,n),i!==null&&(a.matrix.fromArray(i.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),i.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(i.linearVelocity)):a.hasLinearVelocity=!1,i.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(i.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(Yw))),c&&t.hand){o=!0;for(const p of t.hand.values()){const m=e.getJointPose(p,n);if(c.joints[p.jointName]===void 0){const M=new Ja;M.matrixAutoUpdate=!1,M.visible=!1,c.joints[p.jointName]=M,c.add(M)}const _=c.joints[p.jointName];m!==null&&(_.matrix.fromArray(m.transform.matrix),_.matrix.decompose(_.position,_.rotation,_.scale),_.jointRadius=m.radius),_.visible=m!==null}const u=c.joints["index-finger-tip"],h=c.joints["thumb-tip"],f=u.position.distanceTo(h.position),d=.02,g=.005;c.inputState.pinching&&f>d+g?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!c.inputState.pinching&&f<=d-g&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else l!==null&&t.gripSpace&&(s=e.getPose(t.gripSpace,n),s!==null&&(l.matrix.fromArray(s.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),s.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(s.linearVelocity)):l.hasLinearVelocity=!1,s.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(s.angularVelocity)):l.hasAngularVelocity=!1));return a!==null&&(a.visible=i!==null),l!==null&&(l.visible=s!==null),c!==null&&(c.visible=o!==null),this}}class $w extends qn{constructor(t,e,n,i,s,o,a,l,c,u){if(u=u!==void 0?u:Qr,u!==Qr&&u!==co)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");n===void 0&&u===Qr&&(n=Gr),n===void 0&&u===co&&(n=$s),super(null,i,s,o,a,l,u,n,c),this.isDepthTexture=!0,this.image={width:t,height:e},this.magFilter=a!==void 0?a:pn,this.minFilter=l!==void 0?l:pn,this.flipY=!1,this.generateMipmaps=!1}}class jw extends us{constructor(t,e){super();const n=this;let i=null,s=1,o=null,a="local-floor",l=null,c=null,u=null,h=null,f=null,d=null;const g=e.getContextAttributes();let p=null,m=null;const _=[],M=new Map,b=new ni;b.layers.enable(1),b.viewport=new $e;const x=new ni;x.layers.enable(2),x.viewport=new $e;const v=[b,x],E=new qw;E.layers.enable(1),E.layers.enable(2);let C=null,y=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(q){let P=_[q];return P===void 0&&(P=new ou,_[q]=P),P.getTargetRaySpace()},this.getControllerGrip=function(q){let P=_[q];return P===void 0&&(P=new ou,_[q]=P),P.getGripSpace()},this.getHand=function(q){let P=_[q];return P===void 0&&(P=new ou,_[q]=P),P.getHandSpace()};function w(q){const P=M.get(q.inputSource);P!==void 0&&P.dispatchEvent({type:q.type,data:q.inputSource})}function D(){i.removeEventListener("select",w),i.removeEventListener("selectstart",w),i.removeEventListener("selectend",w),i.removeEventListener("squeeze",w),i.removeEventListener("squeezestart",w),i.removeEventListener("squeezeend",w),i.removeEventListener("end",D),i.removeEventListener("inputsourceschange",B),M.forEach(function(q,P){q!==void 0&&q.disconnect(P)}),M.clear(),C=null,y=null,t.setRenderTarget(p),f=null,h=null,u=null,i=null,m=null,G.stop(),n.isPresenting=!1,n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(q){s=q,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(q){a=q,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||o},this.setReferenceSpace=function(q){l=q},this.getBaseLayer=function(){return h!==null?h:f},this.getBinding=function(){return u},this.getFrame=function(){return d},this.getSession=function(){return i},this.setSession=async function(q){if(i=q,i!==null){if(p=t.getRenderTarget(),i.addEventListener("select",w),i.addEventListener("selectstart",w),i.addEventListener("selectend",w),i.addEventListener("squeeze",w),i.addEventListener("squeezestart",w),i.addEventListener("squeezeend",w),i.addEventListener("end",D),i.addEventListener("inputsourceschange",B),g.xrCompatible!==!0&&await e.makeXRCompatible(),i.renderState.layers===void 0||t.capabilities.isWebGL2===!1){const P={antialias:i.renderState.layers===void 0?g.antialias:!0,alpha:g.alpha,depth:g.depth,stencil:g.stencil,framebufferScaleFactor:s};f=new XRWebGLLayer(i,e,P),i.updateRenderState({baseLayer:f}),m=new vr(f.framebufferWidth,f.framebufferHeight,{format:ri,type:os,encoding:t.outputEncoding})}else{let P=null,nt=null,A=null;g.depth&&(A=g.stencil?35056:33190,P=g.stencil?co:Qr,nt=g.stencil?$s:Gr);const O={colorFormat:t.outputEncoding===me?35907:32856,depthFormat:A,scaleFactor:s};u=new XRWebGLBinding(i,e),h=u.createProjectionLayer(O),i.updateRenderState({layers:[h]}),m=new vr(h.textureWidth,h.textureHeight,{format:ri,type:os,depthTexture:new $w(h.textureWidth,h.textureHeight,nt,void 0,void 0,void 0,void 0,void 0,void 0,P),stencilBuffer:g.stencil,encoding:t.outputEncoding,samples:g.antialias?4:0});const T=t.properties.get(m);T.__ignoreDepthValues=h.ignoreDepthValues}m.isXRRenderTarget=!0,this.setFoveation(1),l=null,o=await i.requestReferenceSpace(a),G.setContext(i),G.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}};function B(q){const P=i.inputSources;for(let nt=0;nt<P.length;nt++){const A=P[nt].handedness==="right"?1:0;M.set(P[nt],_[A])}for(let nt=0;nt<q.removed.length;nt++){const A=q.removed[nt],O=M.get(A);O&&(O.dispatchEvent({type:"disconnected",data:A}),M.delete(A))}for(let nt=0;nt<q.added.length;nt++){const A=q.added[nt],O=M.get(A);O&&O.dispatchEvent({type:"connected",data:A})}}const k=new J,Z=new J;function V(q,P,nt){k.setFromMatrixPosition(P.matrixWorld),Z.setFromMatrixPosition(nt.matrixWorld);const A=k.distanceTo(Z),O=P.projectionMatrix.elements,T=nt.projectionMatrix.elements,I=O[14]/(O[10]-1),z=O[14]/(O[10]+1),U=(O[9]+1)/O[5],j=(O[9]-1)/O[5],rt=(O[8]-1)/O[0],tt=(T[8]+1)/T[0],ut=I*rt,ot=I*tt,at=A/(-rt+tt),it=at*-rt;P.matrixWorld.decompose(q.position,q.quaternion,q.scale),q.translateX(it),q.translateZ(at),q.matrixWorld.compose(q.position,q.quaternion,q.scale),q.matrixWorldInverse.copy(q.matrixWorld).invert();const dt=I+at,W=z+at,S=ut-it,pt=ot+(A-it),yt=U*z/W*dt,Lt=j*z/W*dt;q.projectionMatrix.makePerspective(S,pt,yt,Lt,dt,W)}function $(q,P){P===null?q.matrixWorld.copy(q.matrix):q.matrixWorld.multiplyMatrices(P.matrixWorld,q.matrix),q.matrixWorldInverse.copy(q.matrixWorld).invert()}this.updateCamera=function(q){if(i===null)return;E.near=x.near=b.near=q.near,E.far=x.far=b.far=q.far,(C!==E.near||y!==E.far)&&(i.updateRenderState({depthNear:E.near,depthFar:E.far}),C=E.near,y=E.far);const P=q.parent,nt=E.cameras;$(E,P);for(let O=0;O<nt.length;O++)$(nt[O],P);E.matrixWorld.decompose(E.position,E.quaternion,E.scale),q.position.copy(E.position),q.quaternion.copy(E.quaternion),q.scale.copy(E.scale),q.matrix.copy(E.matrix),q.matrixWorld.copy(E.matrixWorld);const A=q.children;for(let O=0,T=A.length;O<T;O++)A[O].updateMatrixWorld(!0);nt.length===2?V(E,b,x):E.projectionMatrix.copy(b.projectionMatrix)},this.getCamera=function(){return E},this.getFoveation=function(){if(h!==null)return h.fixedFoveation;if(f!==null)return f.fixedFoveation},this.setFoveation=function(q){h!==null&&(h.fixedFoveation=q),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=q)};let Y=null;function H(q,P){if(c=P.getViewerPose(l||o),d=P,c!==null){const A=c.views;f!==null&&(t.setRenderTargetFramebuffer(m,f.framebuffer),t.setRenderTarget(m));let O=!1;A.length!==E.cameras.length&&(E.cameras.length=0,O=!0);for(let T=0;T<A.length;T++){const I=A[T];let z=null;if(f!==null)z=f.getViewport(I);else{const j=u.getViewSubImage(h,I);z=j.viewport,T===0&&(t.setRenderTargetTextures(m,j.colorTexture,h.ignoreDepthValues?void 0:j.depthStencilTexture),t.setRenderTarget(m))}let U=v[T];U===void 0&&(U=new ni,U.layers.enable(T),U.viewport=new $e,v[T]=U),U.matrix.fromArray(I.transform.matrix),U.projectionMatrix.fromArray(I.projectionMatrix),U.viewport.set(z.x,z.y,z.width,z.height),T===0&&E.matrix.copy(U.matrix),O===!0&&E.cameras.push(U)}}const nt=i.inputSources;for(let A=0;A<_.length;A++){const O=nt[A],T=M.get(O);T!==void 0&&T.update(O,P,l||o)}Y&&Y(q,P),d=null}const G=new t_;G.setAnimationLoop(H),this.setAnimationLoop=function(q){Y=q},this.dispose=function(){}}}function Zw(r,t){function e(p,m){p.fogColor.value.copy(m.color),m.isFog?(p.fogNear.value=m.near,p.fogFar.value=m.far):m.isFogExp2&&(p.fogDensity.value=m.density)}function n(p,m,_,M,b){m.isMeshBasicMaterial||m.isMeshLambertMaterial?i(p,m):m.isMeshToonMaterial?(i(p,m),u(p,m)):m.isMeshPhongMaterial?(i(p,m),c(p,m)):m.isMeshStandardMaterial?(i(p,m),h(p,m),m.isMeshPhysicalMaterial&&f(p,m,b)):m.isMeshMatcapMaterial?(i(p,m),d(p,m)):m.isMeshDepthMaterial?i(p,m):m.isMeshDistanceMaterial?(i(p,m),g(p,m)):m.isMeshNormalMaterial?i(p,m):m.isLineBasicMaterial?(s(p,m),m.isLineDashedMaterial&&o(p,m)):m.isPointsMaterial?a(p,m,_,M):m.isSpriteMaterial?l(p,m):m.isShadowMaterial?(p.color.value.copy(m.color),p.opacity.value=m.opacity):m.isShaderMaterial&&(m.uniformsNeedUpdate=!1)}function i(p,m){p.opacity.value=m.opacity,m.color&&p.diffuse.value.copy(m.color),m.emissive&&p.emissive.value.copy(m.emissive).multiplyScalar(m.emissiveIntensity),m.map&&(p.map.value=m.map),m.alphaMap&&(p.alphaMap.value=m.alphaMap),m.bumpMap&&(p.bumpMap.value=m.bumpMap,p.bumpScale.value=m.bumpScale,m.side===si&&(p.bumpScale.value*=-1)),m.displacementMap&&(p.displacementMap.value=m.displacementMap,p.displacementScale.value=m.displacementScale,p.displacementBias.value=m.displacementBias),m.emissiveMap&&(p.emissiveMap.value=m.emissiveMap),m.normalMap&&(p.normalMap.value=m.normalMap,p.normalScale.value.copy(m.normalScale),m.side===si&&p.normalScale.value.negate()),m.specularMap&&(p.specularMap.value=m.specularMap),m.alphaTest>0&&(p.alphaTest.value=m.alphaTest);const _=t.get(m).envMap;if(_&&(p.envMap.value=_,p.flipEnvMap.value=_.isCubeTexture&&_.isRenderTargetTexture===!1?-1:1,p.reflectivity.value=m.reflectivity,p.ior.value=m.ior,p.refractionRatio.value=m.refractionRatio),m.lightMap){p.lightMap.value=m.lightMap;const x=r.physicallyCorrectLights!==!0?Math.PI:1;p.lightMapIntensity.value=m.lightMapIntensity*x}m.aoMap&&(p.aoMap.value=m.aoMap,p.aoMapIntensity.value=m.aoMapIntensity);let M;m.map?M=m.map:m.specularMap?M=m.specularMap:m.displacementMap?M=m.displacementMap:m.normalMap?M=m.normalMap:m.bumpMap?M=m.bumpMap:m.roughnessMap?M=m.roughnessMap:m.metalnessMap?M=m.metalnessMap:m.alphaMap?M=m.alphaMap:m.emissiveMap?M=m.emissiveMap:m.clearcoatMap?M=m.clearcoatMap:m.clearcoatNormalMap?M=m.clearcoatNormalMap:m.clearcoatRoughnessMap?M=m.clearcoatRoughnessMap:m.iridescenceMap?M=m.iridescenceMap:m.iridescenceThicknessMap?M=m.iridescenceThicknessMap:m.specularIntensityMap?M=m.specularIntensityMap:m.specularColorMap?M=m.specularColorMap:m.transmissionMap?M=m.transmissionMap:m.thicknessMap?M=m.thicknessMap:m.sheenColorMap?M=m.sheenColorMap:m.sheenRoughnessMap&&(M=m.sheenRoughnessMap),M!==void 0&&(M.isWebGLRenderTarget&&(M=M.texture),M.matrixAutoUpdate===!0&&M.updateMatrix(),p.uvTransform.value.copy(M.matrix));let b;m.aoMap?b=m.aoMap:m.lightMap&&(b=m.lightMap),b!==void 0&&(b.isWebGLRenderTarget&&(b=b.texture),b.matrixAutoUpdate===!0&&b.updateMatrix(),p.uv2Transform.value.copy(b.matrix))}function s(p,m){p.diffuse.value.copy(m.color),p.opacity.value=m.opacity}function o(p,m){p.dashSize.value=m.dashSize,p.totalSize.value=m.dashSize+m.gapSize,p.scale.value=m.scale}function a(p,m,_,M){p.diffuse.value.copy(m.color),p.opacity.value=m.opacity,p.size.value=m.size*_,p.scale.value=M*.5,m.map&&(p.map.value=m.map),m.alphaMap&&(p.alphaMap.value=m.alphaMap),m.alphaTest>0&&(p.alphaTest.value=m.alphaTest);let b;m.map?b=m.map:m.alphaMap&&(b=m.alphaMap),b!==void 0&&(b.matrixAutoUpdate===!0&&b.updateMatrix(),p.uvTransform.value.copy(b.matrix))}function l(p,m){p.diffuse.value.copy(m.color),p.opacity.value=m.opacity,p.rotation.value=m.rotation,m.map&&(p.map.value=m.map),m.alphaMap&&(p.alphaMap.value=m.alphaMap),m.alphaTest>0&&(p.alphaTest.value=m.alphaTest);let _;m.map?_=m.map:m.alphaMap&&(_=m.alphaMap),_!==void 0&&(_.matrixAutoUpdate===!0&&_.updateMatrix(),p.uvTransform.value.copy(_.matrix))}function c(p,m){p.specular.value.copy(m.specular),p.shininess.value=Math.max(m.shininess,1e-4)}function u(p,m){m.gradientMap&&(p.gradientMap.value=m.gradientMap)}function h(p,m){p.roughness.value=m.roughness,p.metalness.value=m.metalness,m.roughnessMap&&(p.roughnessMap.value=m.roughnessMap),m.metalnessMap&&(p.metalnessMap.value=m.metalnessMap),t.get(m).envMap&&(p.envMapIntensity.value=m.envMapIntensity)}function f(p,m,_){p.ior.value=m.ior,m.sheen>0&&(p.sheenColor.value.copy(m.sheenColor).multiplyScalar(m.sheen),p.sheenRoughness.value=m.sheenRoughness,m.sheenColorMap&&(p.sheenColorMap.value=m.sheenColorMap),m.sheenRoughnessMap&&(p.sheenRoughnessMap.value=m.sheenRoughnessMap)),m.clearcoat>0&&(p.clearcoat.value=m.clearcoat,p.clearcoatRoughness.value=m.clearcoatRoughness,m.clearcoatMap&&(p.clearcoatMap.value=m.clearcoatMap),m.clearcoatRoughnessMap&&(p.clearcoatRoughnessMap.value=m.clearcoatRoughnessMap),m.clearcoatNormalMap&&(p.clearcoatNormalScale.value.copy(m.clearcoatNormalScale),p.clearcoatNormalMap.value=m.clearcoatNormalMap,m.side===si&&p.clearcoatNormalScale.value.negate())),m.iridescence>0&&(p.iridescence.value=m.iridescence,p.iridescenceIOR.value=m.iridescenceIOR,p.iridescenceThicknessMinimum.value=m.iridescenceThicknessRange[0],p.iridescenceThicknessMaximum.value=m.iridescenceThicknessRange[1],m.iridescenceMap&&(p.iridescenceMap.value=m.iridescenceMap),m.iridescenceThicknessMap&&(p.iridescenceThicknessMap.value=m.iridescenceThicknessMap)),m.transmission>0&&(p.transmission.value=m.transmission,p.transmissionSamplerMap.value=_.texture,p.transmissionSamplerSize.value.set(_.width,_.height),m.transmissionMap&&(p.transmissionMap.value=m.transmissionMap),p.thickness.value=m.thickness,m.thicknessMap&&(p.thicknessMap.value=m.thicknessMap),p.attenuationDistance.value=m.attenuationDistance,p.attenuationColor.value.copy(m.attenuationColor)),p.specularIntensity.value=m.specularIntensity,p.specularColor.value.copy(m.specularColor),m.specularIntensityMap&&(p.specularIntensityMap.value=m.specularIntensityMap),m.specularColorMap&&(p.specularColorMap.value=m.specularColorMap)}function d(p,m){m.matcap&&(p.matcap.value=m.matcap)}function g(p,m){p.referencePosition.value.copy(m.referencePosition),p.nearDistance.value=m.nearDistance,p.farDistance.value=m.farDistance}return{refreshFogUniforms:e,refreshMaterialUniforms:n}}function Jw(){const r=sa("canvas");return r.style.display="block",r}function Kw(r={}){this.isWebGLRenderer=!0;const t=r.canvas!==void 0?r.canvas:Jw(),e=r.context!==void 0?r.context:null,n=r.depth!==void 0?r.depth:!0,i=r.stencil!==void 0?r.stencil:!0,s=r.antialias!==void 0?r.antialias:!1,o=r.premultipliedAlpha!==void 0?r.premultipliedAlpha:!0,a=r.preserveDrawingBuffer!==void 0?r.preserveDrawingBuffer:!1,l=r.powerPreference!==void 0?r.powerPreference:"default",c=r.failIfMajorPerformanceCaveat!==void 0?r.failIfMajorPerformanceCaveat:!1;let u;e!==null?u=e.getContextAttributes().alpha:u=r.alpha!==void 0?r.alpha:!1;let h=null,f=null;const d=[],g=[];this.domElement=t,this.debug={checkShaderErrors:!0},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.outputEncoding=as,this.physicallyCorrectLights=!1,this.toneMapping=Xi,this.toneMappingExposure=1,Object.defineProperties(this,{gammaFactor:{get:function(){return console.warn("THREE.WebGLRenderer: .gammaFactor has been removed."),2},set:function(){console.warn("THREE.WebGLRenderer: .gammaFactor has been removed.")}}});const p=this;let m=!1,_=0,M=0,b=null,x=-1,v=null;const E=new $e,C=new $e;let y=null,w=t.width,D=t.height,B=1,k=null,Z=null;const V=new $e(0,0,w,D),$=new $e(0,0,w,D);let Y=!1;const H=new Qg;let G=!1,q=!1,P=null;const nt=new Ne,A=new vt,O=new J,T={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};function I(){return b===null?B:1}let z=e;function U(R,K){for(let Q=0;Q<R.length;Q++){const et=R[Q],ct=t.getContext(et,K);if(ct!==null)return ct}return null}try{const R={alpha:!0,depth:n,stencil:i,antialias:s,premultipliedAlpha:o,preserveDrawingBuffer:a,powerPreference:l,failIfMajorPerformanceCaveat:c};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${qh}`),t.addEventListener("webglcontextlost",X,!1),t.addEventListener("webglcontextrestored",gt,!1),t.addEventListener("webglcontextcreationerror",Mt,!1),z===null){const K=["webgl2","webgl","experimental-webgl"];if(p.isWebGL1Renderer===!0&&K.shift(),z=U(K,R),z===null)throw U(K)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}z.getShaderPrecisionFormat===void 0&&(z.getShaderPrecisionFormat=function(){return{rangeMin:1,rangeMax:1,precision:1}})}catch(R){throw console.error("THREE.WebGLRenderer: "+R.message),R}let j,rt,tt,ut,ot,at,it,dt,W,S,pt,yt,Lt,Et,F,L,st,ht,xt,_t,Ct,N,ft;function St(){j=new ub(z),rt=new ib(z,j,r),j.init(rt),N=new Xw(z,j,rt),tt=new Hw(z,j,rt),ut=new db,ot=new Dw,at=new Ww(z,j,tt,ot,rt,N,ut),it=new sb(p),dt=new cb(p),W=new wy(z,rt),ft=new eb(z,j,W,rt),S=new hb(z,W,ut,ft),pt=new _b(z,S,W,ut),xt=new gb(z,rt,at),L=new rb(ot),yt=new Lw(p,it,dt,j,rt,ft,L),Lt=new Zw(p,ot),Et=new Iw,F=new Uw(j,rt),ht=new tb(p,it,tt,pt,u,o),st=new Gw(p,pt,rt),_t=new nb(z,j,ut,rt),Ct=new fb(z,j,ut,rt),ut.programs=yt.programs,p.capabilities=rt,p.extensions=j,p.properties=ot,p.renderLists=Et,p.shadowMap=st,p.state=tt,p.info=ut}St();const mt=new jw(p,z);this.xr=mt,this.getContext=function(){return z},this.getContextAttributes=function(){return z.getContextAttributes()},this.forceContextLoss=function(){const R=j.get("WEBGL_lose_context");R&&R.loseContext()},this.forceContextRestore=function(){const R=j.get("WEBGL_lose_context");R&&R.restoreContext()},this.getPixelRatio=function(){return B},this.setPixelRatio=function(R){R!==void 0&&(B=R,this.setSize(w,D,!1))},this.getSize=function(R){return R.set(w,D)},this.setSize=function(R,K,Q){if(mt.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}w=R,D=K,t.width=Math.floor(R*B),t.height=Math.floor(K*B),Q!==!1&&(t.style.width=R+"px",t.style.height=K+"px"),this.setViewport(0,0,R,K)},this.getDrawingBufferSize=function(R){return R.set(w*B,D*B).floor()},this.setDrawingBufferSize=function(R,K,Q){w=R,D=K,B=Q,t.width=Math.floor(R*Q),t.height=Math.floor(K*Q),this.setViewport(0,0,R,K)},this.getCurrentViewport=function(R){return R.copy(E)},this.getViewport=function(R){return R.copy(V)},this.setViewport=function(R,K,Q,et){R.isVector4?V.set(R.x,R.y,R.z,R.w):V.set(R,K,Q,et),tt.viewport(E.copy(V).multiplyScalar(B).floor())},this.getScissor=function(R){return R.copy($)},this.setScissor=function(R,K,Q,et){R.isVector4?$.set(R.x,R.y,R.z,R.w):$.set(R,K,Q,et),tt.scissor(C.copy($).multiplyScalar(B).floor())},this.getScissorTest=function(){return Y},this.setScissorTest=function(R){tt.setScissorTest(Y=R)},this.setOpaqueSort=function(R){k=R},this.setTransparentSort=function(R){Z=R},this.getClearColor=function(R){return R.copy(ht.getClearColor())},this.setClearColor=function(){ht.setClearColor.apply(ht,arguments)},this.getClearAlpha=function(){return ht.getClearAlpha()},this.setClearAlpha=function(){ht.setClearAlpha.apply(ht,arguments)},this.clear=function(R=!0,K=!0,Q=!0){let et=0;R&&(et|=16384),K&&(et|=256),Q&&(et|=1024),z.clear(et)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",X,!1),t.removeEventListener("webglcontextrestored",gt,!1),t.removeEventListener("webglcontextcreationerror",Mt,!1),Et.dispose(),F.dispose(),ot.dispose(),it.dispose(),dt.dispose(),pt.dispose(),ft.dispose(),yt.dispose(),mt.dispose(),mt.removeEventListener("sessionstart",Xt),mt.removeEventListener("sessionend",Gt),P&&(P.dispose(),P=null),se.stop()};function X(R){R.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),m=!0}function gt(){console.log("THREE.WebGLRenderer: Context Restored."),m=!1;const R=ut.autoReset,K=st.enabled,Q=st.autoUpdate,et=st.needsUpdate,ct=st.type;St(),ut.autoReset=R,st.enabled=K,st.autoUpdate=Q,st.needsUpdate=et,st.type=ct}function Mt(R){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",R.statusMessage)}function Ot(R){const K=R.target;K.removeEventListener("dispose",Ot),bt(K)}function bt(R){Pt(R),ot.remove(R)}function Pt(R){const K=ot.get(R).programs;K!==void 0&&(K.forEach(function(Q){yt.releaseProgram(Q)}),R.isShaderMaterial&&yt.releaseShaderCache(R))}this.renderBufferDirect=function(R,K,Q,et,ct,At){K===null&&(K=T);const Dt=ct.isMesh&&ct.matrixWorld.determinant()<0,Rt=wt(R,K,Q,et,ct);tt.setMaterial(et,Dt);let Ut=Q.index;const kt=Q.attributes.position;if(Ut===null){if(kt===void 0||kt.count===0)return}else if(Ut.count===0)return;let Ht=1;et.wireframe===!0&&(Ut=S.getWireframeAttribute(Q),Ht=2),ft.setup(ct,et,Rt,Q,Ut);let Yt,jt=_t;Ut!==null&&(Yt=W.get(Ut),jt=Ct,jt.setIndex(Yt));const ce=Ut!==null?Ut.count:kt.count,de=Q.drawRange.start*Ht,un=Q.drawRange.count*Ht,Ke=At!==null?At.start*Ht:0,Wt=At!==null?At.count*Ht:1/0,le=Math.max(de,Ke),re=Math.min(ce,de+un,Ke+Wt)-1,hn=Math.max(0,re-le+1);if(hn!==0){if(ct.isMesh)et.wireframe===!0?(tt.setLineWidth(et.wireframeLinewidth*I()),jt.setMode(1)):jt.setMode(4);else if(ct.isLine){let $n=et.linewidth;$n===void 0&&($n=1),tt.setLineWidth($n*I()),ct.isLineSegments?jt.setMode(1):ct.isLineLoop?jt.setMode(2):jt.setMode(3)}else ct.isPoints?jt.setMode(0):ct.isSprite&&jt.setMode(4);if(ct.isInstancedMesh)jt.renderInstances(le,hn,ct.count);else if(Q.isInstancedBufferGeometry){const $n=Math.min(Q.instanceCount,Q._maxInstanceCount);jt.renderInstances(le,hn,$n)}else jt.render(le,hn)}},this.compile=function(R,K){f=F.get(R),f.init(),g.push(f),R.traverseVisible(function(Q){Q.isLight&&Q.layers.test(K.layers)&&(f.pushLight(Q),Q.castShadow&&f.pushShadow(Q))}),f.setupLights(p.physicallyCorrectLights),R.traverse(function(Q){const et=Q.material;if(et)if(Array.isArray(et))for(let ct=0;ct<et.length;ct++){const At=et[ct];Ft(At,R,Q)}else Ft(et,R,Q)}),g.pop(),f=null};let lt=null;function Nt(R){lt&&lt(R)}function Xt(){se.stop()}function Gt(){se.start()}const se=new t_;se.setAnimationLoop(Nt),typeof self<"u"&&se.setContext(self),this.setAnimationLoop=function(R){lt=R,mt.setAnimationLoop(R),R===null?se.stop():se.start()},mt.addEventListener("sessionstart",Xt),mt.addEventListener("sessionend",Gt),this.render=function(R,K){if(K!==void 0&&K.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(m===!0)return;R.autoUpdate===!0&&R.updateMatrixWorld(),K.parent===null&&K.updateMatrixWorld(),mt.enabled===!0&&mt.isPresenting===!0&&(mt.cameraAutoUpdate===!0&&mt.updateCamera(K),K=mt.getCamera()),R.isScene===!0&&R.onBeforeRender(p,R,K,b),f=F.get(R,g.length),f.init(),g.push(f),nt.multiplyMatrices(K.projectionMatrix,K.matrixWorldInverse),H.setFromProjectionMatrix(nt),q=this.localClippingEnabled,G=L.init(this.clippingPlanes,q,K),h=Et.get(R,d.length),h.init(),d.push(h),we(R,K,0,p.sortObjects),h.finish(),p.sortObjects===!0&&h.sort(k,Z),G===!0&&L.beginShadows();const Q=f.state.shadowsArray;if(st.render(Q,R,K),G===!0&&L.endShadows(),this.info.autoReset===!0&&this.info.reset(),ht.render(h,R),f.setupLights(p.physicallyCorrectLights),K.isArrayCamera){const et=K.cameras;for(let ct=0,At=et.length;ct<At;ct++){const Dt=et[ct];zn(h,R,Dt,Dt.viewport)}}else zn(h,R,K);b!==null&&(at.updateMultisampleRenderTarget(b),at.updateRenderTargetMipmap(b)),R.isScene===!0&&R.onAfterRender(p,R,K),ft.resetDefaultState(),x=-1,v=null,g.pop(),g.length>0?f=g[g.length-1]:f=null,d.pop(),d.length>0?h=d[d.length-1]:h=null};function we(R,K,Q,et){if(R.visible===!1)return;if(R.layers.test(K.layers)){if(R.isGroup)Q=R.renderOrder;else if(R.isLOD)R.autoUpdate===!0&&R.update(K);else if(R.isLight)f.pushLight(R),R.castShadow&&f.pushShadow(R);else if(R.isSprite){if(!R.frustumCulled||H.intersectsSprite(R)){et&&O.setFromMatrixPosition(R.matrixWorld).applyMatrix4(nt);const Dt=pt.update(R),Rt=R.material;Rt.visible&&h.push(R,Dt,Rt,Q,O.z,null)}}else if((R.isMesh||R.isLine||R.isPoints)&&(R.isSkinnedMesh&&R.skeleton.frame!==ut.render.frame&&(R.skeleton.update(),R.skeleton.frame=ut.render.frame),!R.frustumCulled||H.intersectsObject(R))){et&&O.setFromMatrixPosition(R.matrixWorld).applyMatrix4(nt);const Dt=pt.update(R),Rt=R.material;if(Array.isArray(Rt)){const Ut=Dt.groups;for(let kt=0,Ht=Ut.length;kt<Ht;kt++){const Yt=Ut[kt],jt=Rt[Yt.materialIndex];jt&&jt.visible&&h.push(R,Dt,jt,Q,O.z,Yt)}}else Rt.visible&&h.push(R,Dt,Rt,Q,O.z,null)}}const At=R.children;for(let Dt=0,Rt=At.length;Dt<Rt;Dt++)we(At[Dt],K,Q,et)}function zn(R,K,Q,et){const ct=R.opaque,At=R.transmissive,Dt=R.transparent;f.setupLightsView(Q),At.length>0&&Ve(ct,K,Q),et&&tt.viewport(E.copy(et)),ct.length>0&&Je(ct,K,Q),At.length>0&&Je(At,K,Q),Dt.length>0&&Je(Dt,K,Q),tt.buffers.depth.setTest(!0),tt.buffers.depth.setMask(!0),tt.buffers.color.setMask(!0),tt.setPolygonOffset(!1)}function Ve(R,K,Q){const et=rt.isWebGL2;P===null&&(P=new vr(1,1,{generateMipmaps:!0,type:j.has("EXT_color_buffer_half_float")?ra:os,minFilter:nc,samples:et&&s===!0?4:0})),p.getDrawingBufferSize(A),et?P.setSize(A.x,A.y):P.setSize(ih(A.x),ih(A.y));const ct=p.getRenderTarget();p.setRenderTarget(P),p.clear();const At=p.toneMapping;p.toneMapping=Xi,Je(R,K,Q),p.toneMapping=At,at.updateMultisampleRenderTarget(P),at.updateRenderTargetMipmap(P),p.setRenderTarget(ct)}function Je(R,K,Q){const et=K.isScene===!0?K.overrideMaterial:null;for(let ct=0,At=R.length;ct<At;ct++){const Dt=R[ct],Rt=Dt.object,Ut=Dt.geometry,kt=et===null?Dt.material:et,Ht=Dt.group;Rt.layers.test(Q.layers)&&Bt(Rt,K,Q,Ut,kt,Ht)}}function Bt(R,K,Q,et,ct,At){R.onBeforeRender(p,K,Q,et,ct,At),R.modelViewMatrix.multiplyMatrices(Q.matrixWorldInverse,R.matrixWorld),R.normalMatrix.getNormalMatrix(R.modelViewMatrix),ct.onBeforeRender(p,K,Q,et,R,At),ct.transparent===!0&&ct.side===oo?(ct.side=si,ct.needsUpdate=!0,p.renderBufferDirect(Q,K,et,ct,R,At),ct.side=ia,ct.needsUpdate=!0,p.renderBufferDirect(Q,K,et,ct,R,At),ct.side=oo):p.renderBufferDirect(Q,K,et,ct,R,At),R.onAfterRender(p,K,Q,et,ct,At)}function Ft(R,K,Q){K.isScene!==!0&&(K=T);const et=ot.get(R),ct=f.state.lights,At=f.state.shadowsArray,Dt=ct.state.version,Rt=yt.getParameters(R,ct.state,At,K,Q),Ut=yt.getProgramCacheKey(Rt);let kt=et.programs;et.environment=R.isMeshStandardMaterial?K.environment:null,et.fog=K.fog,et.envMap=(R.isMeshStandardMaterial?dt:it).get(R.envMap||et.environment),kt===void 0&&(R.addEventListener("dispose",Ot),kt=new Map,et.programs=kt);let Ht=kt.get(Ut);if(Ht!==void 0){if(et.currentProgram===Ht&&et.lightsStateVersion===Dt)return Qt(R,Rt),Ht}else Rt.uniforms=yt.getUniforms(R),R.onBuild(Q,Rt,p),R.onBeforeCompile(Rt,p),Ht=yt.acquireProgram(Rt,Ut),kt.set(Ut,Ht),et.uniforms=Rt.uniforms;const Yt=et.uniforms;(!R.isShaderMaterial&&!R.isRawShaderMaterial||R.clipping===!0)&&(Yt.clippingPlanes=L.uniform),Qt(R,Rt),et.needsLights=zt(R),et.lightsStateVersion=Dt,et.needsLights&&(Yt.ambientLightColor.value=ct.state.ambient,Yt.lightProbe.value=ct.state.probe,Yt.directionalLights.value=ct.state.directional,Yt.directionalLightShadows.value=ct.state.directionalShadow,Yt.spotLights.value=ct.state.spot,Yt.spotLightShadows.value=ct.state.spotShadow,Yt.rectAreaLights.value=ct.state.rectArea,Yt.ltc_1.value=ct.state.rectAreaLTC1,Yt.ltc_2.value=ct.state.rectAreaLTC2,Yt.pointLights.value=ct.state.point,Yt.pointLightShadows.value=ct.state.pointShadow,Yt.hemisphereLights.value=ct.state.hemi,Yt.directionalShadowMap.value=ct.state.directionalShadowMap,Yt.directionalShadowMatrix.value=ct.state.directionalShadowMatrix,Yt.spotShadowMap.value=ct.state.spotShadowMap,Yt.spotShadowMatrix.value=ct.state.spotShadowMatrix,Yt.pointShadowMap.value=ct.state.pointShadowMap,Yt.pointShadowMatrix.value=ct.state.pointShadowMatrix);const jt=Ht.getUniforms(),ce=_l.seqWithValue(jt.seq,Yt);return et.currentProgram=Ht,et.uniformsList=ce,Ht}function Qt(R,K){const Q=ot.get(R);Q.outputEncoding=K.outputEncoding,Q.instancing=K.instancing,Q.skinning=K.skinning,Q.morphTargets=K.morphTargets,Q.morphNormals=K.morphNormals,Q.morphColors=K.morphColors,Q.morphTargetsCount=K.morphTargetsCount,Q.numClippingPlanes=K.numClippingPlanes,Q.numIntersection=K.numClipIntersection,Q.vertexAlphas=K.vertexAlphas,Q.vertexTangents=K.vertexTangents,Q.toneMapping=K.toneMapping}function wt(R,K,Q,et,ct){K.isScene!==!0&&(K=T),at.resetTextureUnits();const At=K.fog,Dt=et.isMeshStandardMaterial?K.environment:null,Rt=b===null?p.outputEncoding:b.isXRRenderTarget===!0?b.texture.encoding:as,Ut=(et.isMeshStandardMaterial?dt:it).get(et.envMap||Dt),kt=et.vertexColors===!0&&!!Q.attributes.color&&Q.attributes.color.itemSize===4,Ht=!!et.normalMap&&!!Q.attributes.tangent,Yt=!!Q.morphAttributes.position,jt=!!Q.morphAttributes.normal,ce=!!Q.morphAttributes.color,de=et.toneMapped?p.toneMapping:Xi,un=Q.morphAttributes.position||Q.morphAttributes.normal||Q.morphAttributes.color,Ke=un!==void 0?un.length:0,Wt=ot.get(et),le=f.state.lights;if(G===!0&&(q===!0||R!==v)){const li=R===v&&et.id===x;L.setState(et,R,li)}let re=!1;et.version===Wt.__version?(Wt.needsLights&&Wt.lightsStateVersion!==le.state.version||Wt.outputEncoding!==Rt||ct.isInstancedMesh&&Wt.instancing===!1||!ct.isInstancedMesh&&Wt.instancing===!0||ct.isSkinnedMesh&&Wt.skinning===!1||!ct.isSkinnedMesh&&Wt.skinning===!0||Wt.envMap!==Ut||et.fog===!0&&Wt.fog!==At||Wt.numClippingPlanes!==void 0&&(Wt.numClippingPlanes!==L.numPlanes||Wt.numIntersection!==L.numIntersection)||Wt.vertexAlphas!==kt||Wt.vertexTangents!==Ht||Wt.morphTargets!==Yt||Wt.morphNormals!==jt||Wt.morphColors!==ce||Wt.toneMapping!==de||rt.isWebGL2===!0&&Wt.morphTargetsCount!==Ke)&&(re=!0):(re=!0,Wt.__version=et.version);let hn=Wt.currentProgram;re===!0&&(hn=Ft(et,K,ct));let $n=!1,jn=!1,fn=!1;const Me=hn.getUniforms(),ai=Wt.uniforms;if(tt.useProgram(hn.program)&&($n=!0,jn=!0,fn=!0),et.id!==x&&(x=et.id,jn=!0),$n||v!==R){if(Me.setValue(z,"projectionMatrix",R.projectionMatrix),rt.logarithmicDepthBuffer&&Me.setValue(z,"logDepthBufFC",2/(Math.log(R.far+1)/Math.LN2)),v!==R&&(v=R,jn=!0,fn=!0),et.isShaderMaterial||et.isMeshPhongMaterial||et.isMeshToonMaterial||et.isMeshStandardMaterial||et.envMap){const li=Me.map.cameraPosition;li!==void 0&&li.setValue(z,O.setFromMatrixPosition(R.matrixWorld))}(et.isMeshPhongMaterial||et.isMeshToonMaterial||et.isMeshLambertMaterial||et.isMeshBasicMaterial||et.isMeshStandardMaterial||et.isShaderMaterial)&&Me.setValue(z,"isOrthographic",R.isOrthographicCamera===!0),(et.isMeshPhongMaterial||et.isMeshToonMaterial||et.isMeshLambertMaterial||et.isMeshBasicMaterial||et.isMeshStandardMaterial||et.isShaderMaterial||et.isShadowMaterial||ct.isSkinnedMesh)&&Me.setValue(z,"viewMatrix",R.matrixWorldInverse)}if(ct.isSkinnedMesh){Me.setOptional(z,ct,"bindMatrix"),Me.setOptional(z,ct,"bindMatrixInverse");const li=ct.skeleton;li&&(rt.floatVertexTextures?(li.boneTexture===null&&li.computeBoneTexture(),Me.setValue(z,"boneTexture",li.boneTexture,at),Me.setValue(z,"boneTextureSize",li.boneTextureSize)):console.warn("THREE.WebGLRenderer: SkinnedMesh can only be used with WebGL 2. With WebGL 1 OES_texture_float and vertex textures support is required."))}const Pi=Q.morphAttributes;return(Pi.position!==void 0||Pi.normal!==void 0||Pi.color!==void 0&&rt.isWebGL2===!0)&&xt.update(ct,Q,et,hn),(jn||Wt.receiveShadow!==ct.receiveShadow)&&(Wt.receiveShadow=ct.receiveShadow,Me.setValue(z,"receiveShadow",ct.receiveShadow)),jn&&(Me.setValue(z,"toneMappingExposure",p.toneMappingExposure),Wt.needsLights&&qt(ai,fn),At&&et.fog===!0&&Lt.refreshFogUniforms(ai,At),Lt.refreshMaterialUniforms(ai,et,B,D,P),_l.upload(z,Wt.uniformsList,ai,at)),et.isShaderMaterial&&et.uniformsNeedUpdate===!0&&(_l.upload(z,Wt.uniformsList,ai,at),et.uniformsNeedUpdate=!1),et.isSpriteMaterial&&Me.setValue(z,"center",ct.center),Me.setValue(z,"modelViewMatrix",ct.modelViewMatrix),Me.setValue(z,"normalMatrix",ct.normalMatrix),Me.setValue(z,"modelMatrix",ct.matrixWorld),hn}function qt(R,K){R.ambientLightColor.needsUpdate=K,R.lightProbe.needsUpdate=K,R.directionalLights.needsUpdate=K,R.directionalLightShadows.needsUpdate=K,R.pointLights.needsUpdate=K,R.pointLightShadows.needsUpdate=K,R.spotLights.needsUpdate=K,R.spotLightShadows.needsUpdate=K,R.rectAreaLights.needsUpdate=K,R.hemisphereLights.needsUpdate=K}function zt(R){return R.isMeshLambertMaterial||R.isMeshToonMaterial||R.isMeshPhongMaterial||R.isMeshStandardMaterial||R.isShadowMaterial||R.isShaderMaterial&&R.lights===!0}this.getActiveCubeFace=function(){return _},this.getActiveMipmapLevel=function(){return M},this.getRenderTarget=function(){return b},this.setRenderTargetTextures=function(R,K,Q){ot.get(R.texture).__webglTexture=K,ot.get(R.depthTexture).__webglTexture=Q;const et=ot.get(R);et.__hasExternalTextures=!0,et.__hasExternalTextures&&(et.__autoAllocateDepthBuffer=Q===void 0,et.__autoAllocateDepthBuffer||j.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),et.__useRenderToTexture=!1))},this.setRenderTargetFramebuffer=function(R,K){const Q=ot.get(R);Q.__webglFramebuffer=K,Q.__useDefaultFramebuffer=K===void 0},this.setRenderTarget=function(R,K=0,Q=0){b=R,_=K,M=Q;let et=!0;if(R){const Ut=ot.get(R);Ut.__useDefaultFramebuffer!==void 0?(tt.bindFramebuffer(36160,null),et=!1):Ut.__webglFramebuffer===void 0?at.setupRenderTarget(R):Ut.__hasExternalTextures&&at.rebindTextures(R,ot.get(R.texture).__webglTexture,ot.get(R.depthTexture).__webglTexture)}let ct=null,At=!1,Dt=!1;if(R){const Ut=R.texture;(Ut.isData3DTexture||Ut.isDataArrayTexture)&&(Dt=!0);const kt=ot.get(R).__webglFramebuffer;R.isWebGLCubeRenderTarget?(ct=kt[K],At=!0):rt.isWebGL2&&R.samples>0&&at.useMultisampledRTT(R)===!1?ct=ot.get(R).__webglMultisampledFramebuffer:ct=kt,E.copy(R.viewport),C.copy(R.scissor),y=R.scissorTest}else E.copy(V).multiplyScalar(B).floor(),C.copy($).multiplyScalar(B).floor(),y=Y;if(tt.bindFramebuffer(36160,ct)&&rt.drawBuffers&&et&&tt.drawBuffers(R,ct),tt.viewport(E),tt.scissor(C),tt.setScissorTest(y),At){const Ut=ot.get(R.texture);z.framebufferTexture2D(36160,36064,34069+K,Ut.__webglTexture,Q)}else if(Dt){const Ut=ot.get(R.texture),kt=K||0;z.framebufferTextureLayer(36160,36064,Ut.__webglTexture,Q||0,kt)}x=-1},this.readRenderTargetPixels=function(R,K,Q,et,ct,At,Dt){if(!(R&&R.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Rt=ot.get(R).__webglFramebuffer;if(R.isWebGLCubeRenderTarget&&Dt!==void 0&&(Rt=Rt[Dt]),Rt){tt.bindFramebuffer(36160,Rt);try{const Ut=R.texture,kt=Ut.format,Ht=Ut.type;if(kt!==ri&&N.convert(kt)!==z.getParameter(35739)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}const Yt=Ht===ra&&(j.has("EXT_color_buffer_half_float")||rt.isWebGL2&&j.has("EXT_color_buffer_float"));if(Ht!==os&&N.convert(Ht)!==z.getParameter(35738)&&!(Ht===Hr&&(rt.isWebGL2||j.has("OES_texture_float")||j.has("WEBGL_color_buffer_float")))&&!Yt){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}K>=0&&K<=R.width-et&&Q>=0&&Q<=R.height-ct&&z.readPixels(K,Q,et,ct,N.convert(kt),N.convert(Ht),At)}finally{const Ut=b!==null?ot.get(b).__webglFramebuffer:null;tt.bindFramebuffer(36160,Ut)}}},this.copyFramebufferToTexture=function(R,K,Q=0){const et=Math.pow(2,-Q),ct=Math.floor(K.image.width*et),At=Math.floor(K.image.height*et);at.setTexture2D(K,0),z.copyTexSubImage2D(3553,Q,0,0,R.x,R.y,ct,At),tt.unbindTexture()},this.copyTextureToTexture=function(R,K,Q,et=0){const ct=K.image.width,At=K.image.height,Dt=N.convert(Q.format),Rt=N.convert(Q.type);at.setTexture2D(Q,0),z.pixelStorei(37440,Q.flipY),z.pixelStorei(37441,Q.premultiplyAlpha),z.pixelStorei(3317,Q.unpackAlignment),K.isDataTexture?z.texSubImage2D(3553,et,R.x,R.y,ct,At,Dt,Rt,K.image.data):K.isCompressedTexture?z.compressedTexSubImage2D(3553,et,R.x,R.y,K.mipmaps[0].width,K.mipmaps[0].height,Dt,K.mipmaps[0].data):z.texSubImage2D(3553,et,R.x,R.y,Dt,Rt,K.image),et===0&&Q.generateMipmaps&&z.generateMipmap(3553),tt.unbindTexture()},this.copyTextureToTexture3D=function(R,K,Q,et,ct=0){if(p.isWebGL1Renderer){console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: can only be used with WebGL2.");return}const At=R.max.x-R.min.x+1,Dt=R.max.y-R.min.y+1,Rt=R.max.z-R.min.z+1,Ut=N.convert(et.format),kt=N.convert(et.type);let Ht;if(et.isData3DTexture)at.setTexture3D(et,0),Ht=32879;else if(et.isDataArrayTexture)at.setTexture2DArray(et,0),Ht=35866;else{console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: only supports THREE.DataTexture3D and THREE.DataTexture2DArray.");return}z.pixelStorei(37440,et.flipY),z.pixelStorei(37441,et.premultiplyAlpha),z.pixelStorei(3317,et.unpackAlignment);const Yt=z.getParameter(3314),jt=z.getParameter(32878),ce=z.getParameter(3316),de=z.getParameter(3315),un=z.getParameter(32877),Ke=Q.isCompressedTexture?Q.mipmaps[0]:Q.image;z.pixelStorei(3314,Ke.width),z.pixelStorei(32878,Ke.height),z.pixelStorei(3316,R.min.x),z.pixelStorei(3315,R.min.y),z.pixelStorei(32877,R.min.z),Q.isDataTexture||Q.isData3DTexture?z.texSubImage3D(Ht,ct,K.x,K.y,K.z,At,Dt,Rt,Ut,kt,Ke.data):Q.isCompressedTexture?(console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: untested support for compressed srcTexture."),z.compressedTexSubImage3D(Ht,ct,K.x,K.y,K.z,At,Dt,Rt,Ut,Ke.data)):z.texSubImage3D(Ht,ct,K.x,K.y,K.z,At,Dt,Rt,Ut,kt,Ke),z.pixelStorei(3314,Yt),z.pixelStorei(32878,jt),z.pixelStorei(3316,ce),z.pixelStorei(3315,de),z.pixelStorei(32877,un),ct===0&&et.generateMipmaps&&z.generateMipmap(Ht),tt.unbindTexture()},this.initTexture=function(R){at.setTexture2D(R,0),tt.unbindTexture()},this.resetState=function(){_=0,M=0,b=null,tt.reset(),ft.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}class Qw extends Kw{}Qw.prototype.isWebGL1Renderer=!0;class J1 extends Yn{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.overrideMaterial=null,this.autoUpdate=!0,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.autoUpdate=t.autoUpdate,this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){const e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),e}}class t1 extends Be{constructor(t){super(),this.isSpriteMaterial=!0,this.type="SpriteMaterial",this.color=new $t(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.rotation=t.rotation,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}}class l_ extends Be{constructor(t){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new $t(16777215),this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.linewidth=t.linewidth,this.linecap=t.linecap,this.linejoin=t.linejoin,this.fog=t.fog,this}}class c_ extends Be{constructor(t){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new $t(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.size=t.size,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}}const pp=new Ne,sh=new Yg,Ka=new ic,Qa=new J;class K1 extends Yn{constructor(t=new Zi,e=new c_){super(),this.isPoints=!0,this.type="Points",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=t.material,this.geometry=t.geometry,this}raycast(t,e){const n=this.geometry,i=this.matrixWorld,s=t.params.Points.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Ka.copy(n.boundingSphere),Ka.applyMatrix4(i),Ka.radius+=s,t.ray.intersectsSphere(Ka)===!1)return;pp.copy(i).invert(),sh.copy(t.ray).applyMatrix4(pp);const a=s/((this.scale.x+this.scale.y+this.scale.z)/3),l=a*a,c=n.index,h=n.attributes.position;if(c!==null){const f=Math.max(0,o.start),d=Math.min(c.count,o.start+o.count);for(let g=f,p=d;g<p;g++){const m=c.getX(g);Qa.fromBufferAttribute(h,m),mp(Qa,m,l,i,t,e,this)}}else{const f=Math.max(0,o.start),d=Math.min(h.count,o.start+o.count);for(let g=f,p=d;g<p;g++)Qa.fromBufferAttribute(h,g),mp(Qa,g,l,i,t,e,this)}}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const i=e[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,o=i.length;s<o;s++){const a=i[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=s}}}}}function mp(r,t,e,n,i,s,o){const a=sh.distanceSqToPoint(r);if(a<e){const l=new J;sh.closestPointToPoint(r,l),l.applyMatrix4(n);const c=i.ray.origin.distanceTo(l);if(c<i.near||c>i.far)return;s.push({distance:c,distanceToRay:Math.sqrt(a),point:l,index:t,face:null,object:o})}}class Ai{constructor(){this.type="Curve",this.arcLengthDivisions=200}getPoint(){return console.warn("THREE.Curve: .getPoint() not implemented."),null}getPointAt(t,e){const n=this.getUtoTmapping(t);return this.getPoint(n,e)}getPoints(t=5){const e=[];for(let n=0;n<=t;n++)e.push(this.getPoint(n/t));return e}getSpacedPoints(t=5){const e=[];for(let n=0;n<=t;n++)e.push(this.getPointAt(n/t));return e}getLength(){const t=this.getLengths();return t[t.length-1]}getLengths(t=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===t+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;const e=[];let n,i=this.getPoint(0),s=0;e.push(0);for(let o=1;o<=t;o++)n=this.getPoint(o/t),s+=n.distanceTo(i),e.push(s),i=n;return this.cacheArcLengths=e,e}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(t,e){const n=this.getLengths();let i=0;const s=n.length;let o;e?o=e:o=t*n[s-1];let a=0,l=s-1,c;for(;a<=l;)if(i=Math.floor(a+(l-a)/2),c=n[i]-o,c<0)a=i+1;else if(c>0)l=i-1;else{l=i;break}if(i=l,n[i]===o)return i/(s-1);const u=n[i],f=n[i+1]-u,d=(o-u)/f;return(i+d)/(s-1)}getTangent(t,e){let i=t-1e-4,s=t+1e-4;i<0&&(i=0),s>1&&(s=1);const o=this.getPoint(i),a=this.getPoint(s),l=e||(o.isVector2?new vt:new J);return l.copy(a).sub(o).normalize(),l}getTangentAt(t,e){const n=this.getUtoTmapping(t);return this.getTangent(n,e)}computeFrenetFrames(t,e){const n=new J,i=[],s=[],o=[],a=new J,l=new Ne;for(let d=0;d<=t;d++){const g=d/t;i[d]=this.getTangentAt(g,new J)}s[0]=new J,o[0]=new J;let c=Number.MAX_VALUE;const u=Math.abs(i[0].x),h=Math.abs(i[0].y),f=Math.abs(i[0].z);u<=c&&(c=u,n.set(1,0,0)),h<=c&&(c=h,n.set(0,1,0)),f<=c&&n.set(0,0,1),a.crossVectors(i[0],n).normalize(),s[0].crossVectors(i[0],a),o[0].crossVectors(i[0],s[0]);for(let d=1;d<=t;d++){if(s[d]=s[d-1].clone(),o[d]=o[d-1].clone(),a.crossVectors(i[d-1],i[d]),a.length()>Number.EPSILON){a.normalize();const g=Math.acos(ke(i[d-1].dot(i[d]),-1,1));s[d].applyMatrix4(l.makeRotationAxis(a,g))}o[d].crossVectors(i[d],s[d])}if(e===!0){let d=Math.acos(ke(s[0].dot(s[t]),-1,1));d/=t,i[0].dot(a.crossVectors(s[0],s[t]))>0&&(d=-d);for(let g=1;g<=t;g++)s[g].applyMatrix4(l.makeRotationAxis(i[g],d*g)),o[g].crossVectors(i[g],s[g])}return{tangents:i,normals:s,binormals:o}}clone(){return new this.constructor().copy(this)}copy(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}toJSON(){const t={metadata:{version:4.5,type:"Curve",generator:"Curve.toJSON"}};return t.arcLengthDivisions=this.arcLengthDivisions,t.type=this.type,t}fromJSON(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}}class Zh extends Ai{constructor(t=0,e=0,n=1,i=1,s=0,o=Math.PI*2,a=!1,l=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=t,this.aY=e,this.xRadius=n,this.yRadius=i,this.aStartAngle=s,this.aEndAngle=o,this.aClockwise=a,this.aRotation=l}getPoint(t,e){const n=e||new vt,i=Math.PI*2;let s=this.aEndAngle-this.aStartAngle;const o=Math.abs(s)<Number.EPSILON;for(;s<0;)s+=i;for(;s>i;)s-=i;s<Number.EPSILON&&(o?s=0:s=i),this.aClockwise===!0&&!o&&(s===i?s=-i:s=s-i);const a=this.aStartAngle+t*s;let l=this.aX+this.xRadius*Math.cos(a),c=this.aY+this.yRadius*Math.sin(a);if(this.aRotation!==0){const u=Math.cos(this.aRotation),h=Math.sin(this.aRotation),f=l-this.aX,d=c-this.aY;l=f*u-d*h+this.aX,c=f*h+d*u+this.aY}return n.set(l,c)}copy(t){return super.copy(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}toJSON(){const t=super.toJSON();return t.aX=this.aX,t.aY=this.aY,t.xRadius=this.xRadius,t.yRadius=this.yRadius,t.aStartAngle=this.aStartAngle,t.aEndAngle=this.aEndAngle,t.aClockwise=this.aClockwise,t.aRotation=this.aRotation,t}fromJSON(t){return super.fromJSON(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}}class e1 extends Zh{constructor(t,e,n,i,s,o){super(t,e,n,n,i,s,o),this.isArcCurve=!0,this.type="ArcCurve"}}function Jh(){let r=0,t=0,e=0,n=0;function i(s,o,a,l){r=s,t=a,e=-3*s+3*o-2*a-l,n=2*s-2*o+a+l}return{initCatmullRom:function(s,o,a,l,c){i(o,a,c*(a-s),c*(l-o))},initNonuniformCatmullRom:function(s,o,a,l,c,u,h){let f=(o-s)/c-(a-s)/(c+u)+(a-o)/u,d=(a-o)/u-(l-o)/(u+h)+(l-a)/h;f*=u,d*=u,i(o,a,f,d)},calc:function(s){const o=s*s,a=o*s;return r+t*s+e*o+n*a}}}const tl=new J,au=new Jh,lu=new Jh,cu=new Jh;class n1 extends Ai{constructor(t=[],e=!1,n="centripetal",i=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=t,this.closed=e,this.curveType=n,this.tension=i}getPoint(t,e=new J){const n=e,i=this.points,s=i.length,o=(s-(this.closed?0:1))*t;let a=Math.floor(o),l=o-a;this.closed?a+=a>0?0:(Math.floor(Math.abs(a)/s)+1)*s:l===0&&a===s-1&&(a=s-2,l=1);let c,u;this.closed||a>0?c=i[(a-1)%s]:(tl.subVectors(i[0],i[1]).add(i[0]),c=tl);const h=i[a%s],f=i[(a+1)%s];if(this.closed||a+2<s?u=i[(a+2)%s]:(tl.subVectors(i[s-1],i[s-2]).add(i[s-1]),u=tl),this.curveType==="centripetal"||this.curveType==="chordal"){const d=this.curveType==="chordal"?.5:.25;let g=Math.pow(c.distanceToSquared(h),d),p=Math.pow(h.distanceToSquared(f),d),m=Math.pow(f.distanceToSquared(u),d);p<1e-4&&(p=1),g<1e-4&&(g=p),m<1e-4&&(m=p),au.initNonuniformCatmullRom(c.x,h.x,f.x,u.x,g,p,m),lu.initNonuniformCatmullRom(c.y,h.y,f.y,u.y,g,p,m),cu.initNonuniformCatmullRom(c.z,h.z,f.z,u.z,g,p,m)}else this.curveType==="catmullrom"&&(au.initCatmullRom(c.x,h.x,f.x,u.x,this.tension),lu.initCatmullRom(c.y,h.y,f.y,u.y,this.tension),cu.initCatmullRom(c.z,h.z,f.z,u.z,this.tension));return n.set(au.calc(l),lu.calc(l),cu.calc(l)),n}copy(t){super.copy(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const i=t.points[e];this.points.push(i.clone())}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}toJSON(){const t=super.toJSON();t.points=[];for(let e=0,n=this.points.length;e<n;e++){const i=this.points[e];t.points.push(i.toArray())}return t.closed=this.closed,t.curveType=this.curveType,t.tension=this.tension,t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const i=t.points[e];this.points.push(new J().fromArray(i))}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}}function gp(r,t,e,n,i){const s=(n-t)*.5,o=(i-e)*.5,a=r*r,l=r*a;return(2*e-2*n+s+o)*l+(-3*e+3*n-2*s-o)*a+s*r+e}function i1(r,t){const e=1-r;return e*e*t}function r1(r,t){return 2*(1-r)*r*t}function s1(r,t){return r*r*t}function Ho(r,t,e,n){return i1(r,t)+r1(r,e)+s1(r,n)}function o1(r,t){const e=1-r;return e*e*e*t}function a1(r,t){const e=1-r;return 3*e*e*r*t}function l1(r,t){return 3*(1-r)*r*r*t}function c1(r,t){return r*r*r*t}function Wo(r,t,e,n,i){return o1(r,t)+a1(r,e)+l1(r,n)+c1(r,i)}class u_ extends Ai{constructor(t=new vt,e=new vt,n=new vt,i=new vt){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=t,this.v1=e,this.v2=n,this.v3=i}getPoint(t,e=new vt){const n=e,i=this.v0,s=this.v1,o=this.v2,a=this.v3;return n.set(Wo(t,i.x,s.x,o.x,a.x),Wo(t,i.y,s.y,o.y,a.y)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}}class u1 extends Ai{constructor(t=new J,e=new J,n=new J,i=new J){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=t,this.v1=e,this.v2=n,this.v3=i}getPoint(t,e=new J){const n=e,i=this.v0,s=this.v1,o=this.v2,a=this.v3;return n.set(Wo(t,i.x,s.x,o.x,a.x),Wo(t,i.y,s.y,o.y,a.y),Wo(t,i.z,s.z,o.z,a.z)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}}class Kh extends Ai{constructor(t=new vt,e=new vt){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=t,this.v2=e}getPoint(t,e=new vt){const n=e;return t===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(t).add(this.v1)),n}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e){const n=e||new vt;return n.copy(this.v2).sub(this.v1).normalize(),n}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class h1 extends Ai{constructor(t=new J,e=new J){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=t,this.v2=e}getPoint(t,e=new J){const n=e;return t===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(t).add(this.v1)),n}getPointAt(t,e){return this.getPoint(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class h_ extends Ai{constructor(t=new vt,e=new vt,n=new vt){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=t,this.v1=e,this.v2=n}getPoint(t,e=new vt){const n=e,i=this.v0,s=this.v1,o=this.v2;return n.set(Ho(t,i.x,s.x,o.x),Ho(t,i.y,s.y,o.y)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class f1 extends Ai{constructor(t=new J,e=new J,n=new J){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=t,this.v1=e,this.v2=n}getPoint(t,e=new J){const n=e,i=this.v0,s=this.v1,o=this.v2;return n.set(Ho(t,i.x,s.x,o.x),Ho(t,i.y,s.y,o.y),Ho(t,i.z,s.z,o.z)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class f_ extends Ai{constructor(t=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=t}getPoint(t,e=new vt){const n=e,i=this.points,s=(i.length-1)*t,o=Math.floor(s),a=s-o,l=i[o===0?o:o-1],c=i[o],u=i[o>i.length-2?i.length-1:o+1],h=i[o>i.length-3?i.length-1:o+2];return n.set(gp(a,l.x,c.x,u.x,h.x),gp(a,l.y,c.y,u.y,h.y)),n}copy(t){super.copy(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const i=t.points[e];this.points.push(i.clone())}return this}toJSON(){const t=super.toJSON();t.points=[];for(let e=0,n=this.points.length;e<n;e++){const i=this.points[e];t.points.push(i.toArray())}return t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const i=t.points[e];this.points.push(new vt().fromArray(i))}return this}}var d1=Object.freeze({__proto__:null,ArcCurve:e1,CatmullRomCurve3:n1,CubicBezierCurve:u_,CubicBezierCurve3:u1,EllipseCurve:Zh,LineCurve:Kh,LineCurve3:h1,QuadraticBezierCurve:h_,QuadraticBezierCurve3:f1,SplineCurve:f_});class p1 extends Ai{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(t){this.curves.push(t)}closePath(){const t=this.curves[0].getPoint(0),e=this.curves[this.curves.length-1].getPoint(1);t.equals(e)||this.curves.push(new Kh(e,t))}getPoint(t,e){const n=t*this.getLength(),i=this.getCurveLengths();let s=0;for(;s<i.length;){if(i[s]>=n){const o=i[s]-n,a=this.curves[s],l=a.getLength(),c=l===0?0:1-o/l;return a.getPointAt(c,e)}s++}return null}getLength(){const t=this.getCurveLengths();return t[t.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;const t=[];let e=0;for(let n=0,i=this.curves.length;n<i;n++)e+=this.curves[n].getLength(),t.push(e);return this.cacheLengths=t,t}getSpacedPoints(t=40){const e=[];for(let n=0;n<=t;n++)e.push(this.getPoint(n/t));return this.autoClose&&e.push(e[0]),e}getPoints(t=12){const e=[];let n;for(let i=0,s=this.curves;i<s.length;i++){const o=s[i],a=o.isEllipseCurve?t*2:o.isLineCurve||o.isLineCurve3?1:o.isSplineCurve?t*o.points.length:t,l=o.getPoints(a);for(let c=0;c<l.length;c++){const u=l[c];n&&n.equals(u)||(e.push(u),n=u)}}return this.autoClose&&e.length>1&&!e[e.length-1].equals(e[0])&&e.push(e[0]),e}copy(t){super.copy(t),this.curves=[];for(let e=0,n=t.curves.length;e<n;e++){const i=t.curves[e];this.curves.push(i.clone())}return this.autoClose=t.autoClose,this}toJSON(){const t=super.toJSON();t.autoClose=this.autoClose,t.curves=[];for(let e=0,n=this.curves.length;e<n;e++){const i=this.curves[e];t.curves.push(i.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.autoClose=t.autoClose,this.curves=[];for(let e=0,n=t.curves.length;e<n;e++){const i=t.curves[e];this.curves.push(new d1[i.type]().fromJSON(i))}return this}}class js extends p1{constructor(t){super(),this.type="Path",this.currentPoint=new vt,t&&this.setFromPoints(t)}setFromPoints(t){this.moveTo(t[0].x,t[0].y);for(let e=1,n=t.length;e<n;e++)this.lineTo(t[e].x,t[e].y);return this}moveTo(t,e){return this.currentPoint.set(t,e),this}lineTo(t,e){const n=new Kh(this.currentPoint.clone(),new vt(t,e));return this.curves.push(n),this.currentPoint.set(t,e),this}quadraticCurveTo(t,e,n,i){const s=new h_(this.currentPoint.clone(),new vt(t,e),new vt(n,i));return this.curves.push(s),this.currentPoint.set(n,i),this}bezierCurveTo(t,e,n,i,s,o){const a=new u_(this.currentPoint.clone(),new vt(t,e),new vt(n,i),new vt(s,o));return this.curves.push(a),this.currentPoint.set(s,o),this}splineThru(t){const e=[this.currentPoint.clone()].concat(t),n=new f_(e);return this.curves.push(n),this.currentPoint.copy(t[t.length-1]),this}arc(t,e,n,i,s,o){const a=this.currentPoint.x,l=this.currentPoint.y;return this.absarc(t+a,e+l,n,i,s,o),this}absarc(t,e,n,i,s,o){return this.absellipse(t,e,n,n,i,s,o),this}ellipse(t,e,n,i,s,o,a,l){const c=this.currentPoint.x,u=this.currentPoint.y;return this.absellipse(t+c,e+u,n,i,s,o,a,l),this}absellipse(t,e,n,i,s,o,a,l){const c=new Zh(t,e,n,i,s,o,a,l);if(this.curves.length>0){const h=c.getPoint(0);h.equals(this.currentPoint)||this.lineTo(h.x,h.y)}this.curves.push(c);const u=c.getPoint(1);return this.currentPoint.copy(u),this}copy(t){return super.copy(t),this.currentPoint.copy(t.currentPoint),this}toJSON(){const t=super.toJSON();return t.currentPoint=this.currentPoint.toArray(),t}fromJSON(t){return super.fromJSON(t),this.currentPoint.fromArray(t.currentPoint),this}}class xl extends js{constructor(t){super(t),this.uuid=po(),this.type="Shape",this.holes=[]}getPointsHoles(t){const e=[];for(let n=0,i=this.holes.length;n<i;n++)e[n]=this.holes[n].getPoints(t);return e}extractPoints(t){return{shape:this.getPoints(t),holes:this.getPointsHoles(t)}}copy(t){super.copy(t),this.holes=[];for(let e=0,n=t.holes.length;e<n;e++){const i=t.holes[e];this.holes.push(i.clone())}return this}toJSON(){const t=super.toJSON();t.uuid=this.uuid,t.holes=[];for(let e=0,n=this.holes.length;e<n;e++){const i=this.holes[e];t.holes.push(i.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.uuid=t.uuid,this.holes=[];for(let e=0,n=t.holes.length;e<n;e++){const i=t.holes[e];this.holes.push(new js().fromJSON(i))}return this}}const m1={triangulate:function(r,t,e=2){const n=t&&t.length,i=n?t[0]*e:r.length;let s=d_(r,0,i,e,!0);const o=[];if(!s||s.next===s.prev)return o;let a,l,c,u,h,f,d;if(n&&(s=y1(r,t,s,e)),r.length>80*e){a=c=r[0],l=u=r[1];for(let g=e;g<i;g+=e)h=r[g],f=r[g+1],h<a&&(a=h),f<l&&(l=f),h>c&&(c=h),f>u&&(u=f);d=Math.max(c-a,u-l),d=d!==0?1/d:0}return oa(s,o,e,a,l,d),o}};function d_(r,t,e,n,i){let s,o;if(i===D1(r,t,e,n)>0)for(s=t;s<e;s+=n)o=_p(s,r[s],r[s+1],o);else for(s=e-n;s>=t;s-=n)o=_p(s,r[s],r[s+1],o);return o&&sc(o,o.next)&&(la(o),o=o.next),o}function br(r,t){if(!r)return r;t||(t=r);let e=r,n;do if(n=!1,!e.steiner&&(sc(e,e.next)||ve(e.prev,e,e.next)===0)){if(la(e),e=t=e.prev,e===e.next)break;n=!0}else e=e.next;while(n||e!==t);return t}function oa(r,t,e,n,i,s,o){if(!r)return;!o&&s&&T1(r,n,i,s);let a=r,l,c;for(;r.prev!==r.next;){if(l=r.prev,c=r.next,s?_1(r,n,i,s):g1(r)){t.push(l.i/e),t.push(r.i/e),t.push(c.i/e),la(r),r=c.next,a=c.next;continue}if(r=c,r===a){o?o===1?(r=x1(br(r),t,e),oa(r,t,e,n,i,s,2)):o===2&&v1(r,t,e,n,i,s):oa(br(r),t,e,n,i,s,1);break}}}function g1(r){const t=r.prev,e=r,n=r.next;if(ve(t,e,n)>=0)return!1;let i=r.next.next;for(;i!==r.prev;){if(ks(t.x,t.y,e.x,e.y,n.x,n.y,i.x,i.y)&&ve(i.prev,i,i.next)>=0)return!1;i=i.next}return!0}function _1(r,t,e,n){const i=r.prev,s=r,o=r.next;if(ve(i,s,o)>=0)return!1;const a=i.x<s.x?i.x<o.x?i.x:o.x:s.x<o.x?s.x:o.x,l=i.y<s.y?i.y<o.y?i.y:o.y:s.y<o.y?s.y:o.y,c=i.x>s.x?i.x>o.x?i.x:o.x:s.x>o.x?s.x:o.x,u=i.y>s.y?i.y>o.y?i.y:o.y:s.y>o.y?s.y:o.y,h=oh(a,l,t,e,n),f=oh(c,u,t,e,n);let d=r.prevZ,g=r.nextZ;for(;d&&d.z>=h&&g&&g.z<=f;){if(d!==r.prev&&d!==r.next&&ks(i.x,i.y,s.x,s.y,o.x,o.y,d.x,d.y)&&ve(d.prev,d,d.next)>=0||(d=d.prevZ,g!==r.prev&&g!==r.next&&ks(i.x,i.y,s.x,s.y,o.x,o.y,g.x,g.y)&&ve(g.prev,g,g.next)>=0))return!1;g=g.nextZ}for(;d&&d.z>=h;){if(d!==r.prev&&d!==r.next&&ks(i.x,i.y,s.x,s.y,o.x,o.y,d.x,d.y)&&ve(d.prev,d,d.next)>=0)return!1;d=d.prevZ}for(;g&&g.z<=f;){if(g!==r.prev&&g!==r.next&&ks(i.x,i.y,s.x,s.y,o.x,o.y,g.x,g.y)&&ve(g.prev,g,g.next)>=0)return!1;g=g.nextZ}return!0}function x1(r,t,e){let n=r;do{const i=n.prev,s=n.next.next;!sc(i,s)&&p_(i,n,n.next,s)&&aa(i,s)&&aa(s,i)&&(t.push(i.i/e),t.push(n.i/e),t.push(s.i/e),la(n),la(n.next),n=r=s),n=n.next}while(n!==r);return br(n)}function v1(r,t,e,n,i,s){let o=r;do{let a=o.next.next;for(;a!==o.prev;){if(o.i!==a.i&&A1(o,a)){let l=m_(o,a);o=br(o,o.next),l=br(l,l.next),oa(o,t,e,n,i,s),oa(l,t,e,n,i,s);return}a=a.next}o=o.next}while(o!==r)}function y1(r,t,e,n){const i=[];let s,o,a,l,c;for(s=0,o=t.length;s<o;s++)a=t[s]*n,l=s<o-1?t[s+1]*n:r.length,c=d_(r,a,l,n,!1),c===c.next&&(c.steiner=!0),i.push(C1(c));for(i.sort(M1),s=0;s<i.length;s++)S1(i[s],e),e=br(e,e.next);return e}function M1(r,t){return r.x-t.x}function S1(r,t){if(t=b1(r,t),t){const e=m_(t,r);br(t,t.next),br(e,e.next)}}function b1(r,t){let e=t;const n=r.x,i=r.y;let s=-1/0,o;do{if(i<=e.y&&i>=e.next.y&&e.next.y!==e.y){const f=e.x+(i-e.y)*(e.next.x-e.x)/(e.next.y-e.y);if(f<=n&&f>s){if(s=f,f===n){if(i===e.y)return e;if(i===e.next.y)return e.next}o=e.x<e.next.x?e:e.next}}e=e.next}while(e!==t);if(!o)return null;if(n===s)return o;const a=o,l=o.x,c=o.y;let u=1/0,h;e=o;do n>=e.x&&e.x>=l&&n!==e.x&&ks(i<c?n:s,i,l,c,i<c?s:n,i,e.x,e.y)&&(h=Math.abs(i-e.y)/(n-e.x),aa(e,r)&&(h<u||h===u&&(e.x>o.x||e.x===o.x&&w1(o,e)))&&(o=e,u=h)),e=e.next;while(e!==a);return o}function w1(r,t){return ve(r.prev,r,t.prev)<0&&ve(t.next,r,r.next)<0}function T1(r,t,e,n){let i=r;do i.z===null&&(i.z=oh(i.x,i.y,t,e,n)),i.prevZ=i.prev,i.nextZ=i.next,i=i.next;while(i!==r);i.prevZ.nextZ=null,i.prevZ=null,E1(i)}function E1(r){let t,e,n,i,s,o,a,l,c=1;do{for(e=r,r=null,s=null,o=0;e;){for(o++,n=e,a=0,t=0;t<c&&(a++,n=n.nextZ,!!n);t++);for(l=c;a>0||l>0&&n;)a!==0&&(l===0||!n||e.z<=n.z)?(i=e,e=e.nextZ,a--):(i=n,n=n.nextZ,l--),s?s.nextZ=i:r=i,i.prevZ=s,s=i;e=n}s.nextZ=null,c*=2}while(o>1);return r}function oh(r,t,e,n,i){return r=32767*(r-e)*i,t=32767*(t-n)*i,r=(r|r<<8)&16711935,r=(r|r<<4)&252645135,r=(r|r<<2)&858993459,r=(r|r<<1)&1431655765,t=(t|t<<8)&16711935,t=(t|t<<4)&252645135,t=(t|t<<2)&858993459,t=(t|t<<1)&1431655765,r|t<<1}function C1(r){let t=r,e=r;do(t.x<e.x||t.x===e.x&&t.y<e.y)&&(e=t),t=t.next;while(t!==r);return e}function ks(r,t,e,n,i,s,o,a){return(i-o)*(t-a)-(r-o)*(s-a)>=0&&(r-o)*(n-a)-(e-o)*(t-a)>=0&&(e-o)*(s-a)-(i-o)*(n-a)>=0}function A1(r,t){return r.next.i!==t.i&&r.prev.i!==t.i&&!P1(r,t)&&(aa(r,t)&&aa(t,r)&&L1(r,t)&&(ve(r.prev,r,t.prev)||ve(r,t.prev,t))||sc(r,t)&&ve(r.prev,r,r.next)>0&&ve(t.prev,t,t.next)>0)}function ve(r,t,e){return(t.y-r.y)*(e.x-t.x)-(t.x-r.x)*(e.y-t.y)}function sc(r,t){return r.x===t.x&&r.y===t.y}function p_(r,t,e,n){const i=nl(ve(r,t,e)),s=nl(ve(r,t,n)),o=nl(ve(e,n,r)),a=nl(ve(e,n,t));return!!(i!==s&&o!==a||i===0&&el(r,e,t)||s===0&&el(r,n,t)||o===0&&el(e,r,n)||a===0&&el(e,t,n))}function el(r,t,e){return t.x<=Math.max(r.x,e.x)&&t.x>=Math.min(r.x,e.x)&&t.y<=Math.max(r.y,e.y)&&t.y>=Math.min(r.y,e.y)}function nl(r){return r>0?1:r<0?-1:0}function P1(r,t){let e=r;do{if(e.i!==r.i&&e.next.i!==r.i&&e.i!==t.i&&e.next.i!==t.i&&p_(e,e.next,r,t))return!0;e=e.next}while(e!==r);return!1}function aa(r,t){return ve(r.prev,r,r.next)<0?ve(r,t,r.next)>=0&&ve(r,r.prev,t)>=0:ve(r,t,r.prev)<0||ve(r,r.next,t)<0}function L1(r,t){let e=r,n=!1;const i=(r.x+t.x)/2,s=(r.y+t.y)/2;do e.y>s!=e.next.y>s&&e.next.y!==e.y&&i<(e.next.x-e.x)*(s-e.y)/(e.next.y-e.y)+e.x&&(n=!n),e=e.next;while(e!==r);return n}function m_(r,t){const e=new ah(r.i,r.x,r.y),n=new ah(t.i,t.x,t.y),i=r.next,s=t.prev;return r.next=t,t.prev=r,e.next=i,i.prev=e,n.next=e,e.prev=n,s.next=n,n.prev=s,n}function _p(r,t,e,n){const i=new ah(r,t,e);return n?(i.next=n.next,i.prev=n,n.next.prev=i,n.next=i):(i.prev=i,i.next=i),i}function la(r){r.next.prev=r.prev,r.prev.next=r.next,r.prevZ&&(r.prevZ.nextZ=r.nextZ),r.nextZ&&(r.nextZ.prevZ=r.prevZ)}function ah(r,t,e){this.i=r,this.x=t,this.y=e,this.prev=null,this.next=null,this.z=null,this.prevZ=null,this.nextZ=null,this.steiner=!1}function D1(r,t,e,n){let i=0;for(let s=t,o=e-n;s<e;s+=n)i+=(r[o]-r[s])*(r[s+1]+r[o+1]),o=s;return i}class oc{static area(t){const e=t.length;let n=0;for(let i=e-1,s=0;s<e;i=s++)n+=t[i].x*t[s].y-t[s].x*t[i].y;return n*.5}static isClockWise(t){return oc.area(t)<0}static triangulateShape(t,e){const n=[],i=[],s=[];xp(t),vp(n,t);let o=t.length;e.forEach(xp);for(let l=0;l<e.length;l++)i.push(o),o+=e[l].length,vp(n,e[l]);const a=m1.triangulate(n,i);for(let l=0;l<a.length;l+=3)s.push(a.slice(l,l+3));return s}}function xp(r){const t=r.length;t>2&&r[t-1].equals(r[0])&&r.pop()}function vp(r,t){for(let e=0;e<t.length;e++)r.push(t[e].x),r.push(t[e].y)}class R1 extends Be{constructor(t){super(),this.isShadowMaterial=!0,this.type="ShadowMaterial",this.color=new $t(0),this.transparent=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.fog=t.fog,this}}class I1 extends ji{constructor(t){super(t),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}}class g_ extends Be{constructor(t){super(),this.isMeshStandardMaterial=!0,this.defines={STANDARD:""},this.type="MeshStandardMaterial",this.color=new $t(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new $t(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=fo,this.normalScale=new vt(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.defines={STANDARD:""},this.color.copy(t.color),this.roughness=t.roughness,this.metalness=t.metalness,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.roughnessMap=t.roughnessMap,this.metalnessMap=t.metalnessMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapIntensity=t.envMapIntensity,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}}class O1 extends g_{constructor(t){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.type="MeshPhysicalMaterial",this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new vt(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return ke(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(e){this.ior=(1+.4*e)/(1-.4*e)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new $t(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=0,this.attenuationColor=new $t(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new $t(1,1,1),this.specularColorMap=null,this._sheen=0,this._clearcoat=0,this._iridescence=0,this._transmission=0,this.setValues(t)}get sheen(){return this._sheen}set sheen(t){this._sheen>0!=t>0&&this.version++,this._sheen=t}get clearcoat(){return this._clearcoat}set clearcoat(t){this._clearcoat>0!=t>0&&this.version++,this._clearcoat=t}get iridescence(){return this._iridescence}set iridescence(t){this._iridescence>0!=t>0&&this.version++,this._iridescence=t}get transmission(){return this._transmission}set transmission(t){this._transmission>0!=t>0&&this.version++,this._transmission=t}copy(t){return super.copy(t),this.defines={STANDARD:"",PHYSICAL:""},this.clearcoat=t.clearcoat,this.clearcoatMap=t.clearcoatMap,this.clearcoatRoughness=t.clearcoatRoughness,this.clearcoatRoughnessMap=t.clearcoatRoughnessMap,this.clearcoatNormalMap=t.clearcoatNormalMap,this.clearcoatNormalScale.copy(t.clearcoatNormalScale),this.ior=t.ior,this.iridescence=t.iridescence,this.iridescenceMap=t.iridescenceMap,this.iridescenceIOR=t.iridescenceIOR,this.iridescenceThicknessRange=[...t.iridescenceThicknessRange],this.iridescenceThicknessMap=t.iridescenceThicknessMap,this.sheen=t.sheen,this.sheenColor.copy(t.sheenColor),this.sheenColorMap=t.sheenColorMap,this.sheenRoughness=t.sheenRoughness,this.sheenRoughnessMap=t.sheenRoughnessMap,this.transmission=t.transmission,this.transmissionMap=t.transmissionMap,this.thickness=t.thickness,this.thicknessMap=t.thicknessMap,this.attenuationDistance=t.attenuationDistance,this.attenuationColor.copy(t.attenuationColor),this.specularIntensity=t.specularIntensity,this.specularIntensityMap=t.specularIntensityMap,this.specularColor.copy(t.specularColor),this.specularColorMap=t.specularColorMap,this}}class N1 extends Be{constructor(t){super(),this.isMeshPhongMaterial=!0,this.type="MeshPhongMaterial",this.color=new $t(16777215),this.specular=new $t(1118481),this.shininess=30,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new $t(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=fo,this.normalScale=new vt(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.combine=tc,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.specular.copy(t.specular),this.shininess=t.shininess,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}}class F1 extends Be{constructor(t){super(),this.isMeshToonMaterial=!0,this.defines={TOON:""},this.type="MeshToonMaterial",this.color=new $t(16777215),this.map=null,this.gradientMap=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new $t(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=fo,this.normalScale=new vt(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.alphaMap=null,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.gradientMap=t.gradientMap,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.alphaMap=t.alphaMap,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}}class z1 extends Be{constructor(t){super(),this.isMeshNormalMaterial=!0,this.type="MeshNormalMaterial",this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=fo,this.normalScale=new vt(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.flatShading=!1,this.setValues(t)}copy(t){return super.copy(t),this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.flatShading=t.flatShading,this}}class k1 extends Be{constructor(t){super(),this.isMeshLambertMaterial=!0,this.type="MeshLambertMaterial",this.color=new $t(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new $t(0),this.emissiveIntensity=1,this.emissiveMap=null,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.combine=tc,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}}class U1 extends Be{constructor(t){super(),this.isMeshMatcapMaterial=!0,this.defines={MATCAP:""},this.type="MeshMatcapMaterial",this.color=new $t(16777215),this.matcap=null,this.map=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=fo,this.normalScale=new vt(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.alphaMap=null,this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.defines={MATCAP:""},this.color.copy(t.color),this.matcap=t.matcap,this.map=t.map,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.alphaMap=t.alphaMap,this.flatShading=t.flatShading,this.fog=t.fog,this}}class B1 extends l_{constructor(t){super(),this.isLineDashedMaterial=!0,this.type="LineDashedMaterial",this.scale=1,this.dashSize=3,this.gapSize=1,this.setValues(t)}copy(t){return super.copy(t),this.scale=t.scale,this.dashSize=t.dashSize,this.gapSize=t.gapSize,this}}const V1={ShadowMaterial:R1,SpriteMaterial:t1,RawShaderMaterial:I1,ShaderMaterial:ji,PointsMaterial:c_,MeshPhysicalMaterial:O1,MeshStandardMaterial:g_,MeshPhongMaterial:N1,MeshToonMaterial:F1,MeshNormalMaterial:z1,MeshLambertMaterial:k1,MeshDepthMaterial:o_,MeshDistanceMaterial:a_,MeshBasicMaterial:Yh,MeshMatcapMaterial:U1,LineDashedMaterial:B1,LineBasicMaterial:l_,Material:Be};Be.fromType=function(r){return new V1[r]};const Bl={enabled:!1,files:{},add:function(r,t){this.enabled!==!1&&(this.files[r]=t)},get:function(r){if(this.enabled!==!1)return this.files[r]},remove:function(r){delete this.files[r]},clear:function(){this.files={}}};class G1{constructor(t,e,n){const i=this;let s=!1,o=0,a=0,l;const c=[];this.onStart=void 0,this.onLoad=t,this.onProgress=e,this.onError=n,this.itemStart=function(u){a++,s===!1&&i.onStart!==void 0&&i.onStart(u,o,a),s=!0},this.itemEnd=function(u){o++,i.onProgress!==void 0&&i.onProgress(u,o,a),o===a&&(s=!1,i.onLoad!==void 0&&i.onLoad())},this.itemError=function(u){i.onError!==void 0&&i.onError(u)},this.resolveURL=function(u){return l?l(u):u},this.setURLModifier=function(u){return l=u,this},this.addHandler=function(u,h){return c.push(u,h),this},this.removeHandler=function(u){const h=c.indexOf(u);return h!==-1&&c.splice(h,2),this},this.getHandler=function(u){for(let h=0,f=c.length;h<f;h+=2){const d=c[h],g=c[h+1];if(d.global&&(d.lastIndex=0),d.test(u))return g}return null}}}const H1=new G1;class ac{constructor(t){this.manager=t!==void 0?t:H1,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(t,e){const n=this;return new Promise(function(i,s){n.load(t,i,e,s)})}parse(){}setCrossOrigin(t){return this.crossOrigin=t,this}setWithCredentials(t){return this.withCredentials=t,this}setPath(t){return this.path=t,this}setResourcePath(t){return this.resourcePath=t,this}setRequestHeader(t){return this.requestHeader=t,this}}const Ni={};class W1 extends ac{constructor(t){super(t)}load(t,e,n,i){t===void 0&&(t=""),this.path!==void 0&&(t=this.path+t),t=this.manager.resolveURL(t);const s=Bl.get(t);if(s!==void 0)return this.manager.itemStart(t),setTimeout(()=>{e&&e(s),this.manager.itemEnd(t)},0),s;if(Ni[t]!==void 0){Ni[t].push({onLoad:e,onProgress:n,onError:i});return}Ni[t]=[],Ni[t].push({onLoad:e,onProgress:n,onError:i});const o=new Request(t,{headers:new Headers(this.requestHeader),credentials:this.withCredentials?"include":"same-origin"}),a=this.mimeType,l=this.responseType;fetch(o).then(c=>{if(c.status===200||c.status===0){if(c.status===0&&console.warn("THREE.FileLoader: HTTP Status 0 received."),typeof ReadableStream>"u"||c.body===void 0||c.body.getReader===void 0)return c;const u=Ni[t],h=c.body.getReader(),f=c.headers.get("Content-Length"),d=f?parseInt(f):0,g=d!==0;let p=0;const m=new ReadableStream({start(_){M();function M(){h.read().then(({done:b,value:x})=>{if(b)_.close();else{p+=x.byteLength;const v=new ProgressEvent("progress",{lengthComputable:g,loaded:p,total:d});for(let E=0,C=u.length;E<C;E++){const y=u[E];y.onProgress&&y.onProgress(v)}_.enqueue(x),M()}})}}});return new Response(m)}else throw Error(`fetch for "${c.url}" responded with ${c.status}: ${c.statusText}`)}).then(c=>{switch(l){case"arraybuffer":return c.arrayBuffer();case"blob":return c.blob();case"document":return c.text().then(u=>new DOMParser().parseFromString(u,a));case"json":return c.json();default:if(a===void 0)return c.text();{const h=/charset="?([^;"\s]*)"?/i.exec(a),f=h&&h[1]?h[1].toLowerCase():void 0,d=new TextDecoder(f);return c.arrayBuffer().then(g=>d.decode(g))}}}).then(c=>{Bl.add(t,c);const u=Ni[t];delete Ni[t];for(let h=0,f=u.length;h<f;h++){const d=u[h];d.onLoad&&d.onLoad(c)}}).catch(c=>{const u=Ni[t];if(u===void 0)throw this.manager.itemError(t),c;delete Ni[t];for(let h=0,f=u.length;h<f;h++){const d=u[h];d.onError&&d.onError(c)}this.manager.itemError(t)}).finally(()=>{this.manager.itemEnd(t)}),this.manager.itemStart(t)}setResponseType(t){return this.responseType=t,this}setMimeType(t){return this.mimeType=t,this}}class X1 extends ac{constructor(t){super(t)}load(t,e,n,i){this.path!==void 0&&(t=this.path+t),t=this.manager.resolveURL(t);const s=this,o=Bl.get(t);if(o!==void 0)return s.manager.itemStart(t),setTimeout(function(){e&&e(o),s.manager.itemEnd(t)},0),o;const a=sa("img");function l(){u(),Bl.add(t,this),e&&e(this),s.manager.itemEnd(t)}function c(h){u(),i&&i(h),s.manager.itemError(t),s.manager.itemEnd(t)}function u(){a.removeEventListener("load",l,!1),a.removeEventListener("error",c,!1)}return a.addEventListener("load",l,!1),a.addEventListener("error",c,!1),t.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(a.crossOrigin=this.crossOrigin),s.manager.itemStart(t),a.src=t,a}}class Q1 extends ac{constructor(t){super(t)}load(t,e,n,i){const s=new qn,o=new X1(this.manager);return o.setCrossOrigin(this.crossOrigin),o.setPath(this.path),o.load(t,function(a){s.image=a,s.needsUpdate=!0,e!==void 0&&e(s)},n,i),s}}const __="\\[\\]\\.:\\/",Qh="[^"+__+"]",q1="[^"+__.replace("\\.","")+"]";/((?:WC+[\/:])*)/.source.replace("WC",Qh);/(WCOD+)?/.source.replace("WCOD",q1);/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",Qh);/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",Qh);class yp{constructor(t=1,e=0,n=0){return this.radius=t,this.phi=e,this.theta=n,this}set(t,e,n){return this.radius=t,this.phi=e,this.theta=n,this}copy(t){return this.radius=t.radius,this.phi=t.phi,this.theta=t.theta,this}makeSafe(){return this.phi=Math.max(1e-6,Math.min(Math.PI-1e-6,this.phi)),this}setFromVector3(t){return this.setFromCartesianCoords(t.x,t.y,t.z)}setFromCartesianCoords(t,e,n){return this.radius=Math.sqrt(t*t+e*e+n*n),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(t,n),this.phi=Math.acos(ke(e/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}}const Mp=new vt;class Y1{constructor(t=new vt(1/0,1/0),e=new vt(-1/0,-1/0)){this.isBox2=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromPoints(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){const n=Mp.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(n),this.max.copy(t).add(n),this}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=1/0,this.max.x=this.max.y=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y}getCenter(t){return this.isEmpty()?t.set(0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}containsPoint(t){return!(t.x<this.min.x||t.x>this.max.x||t.y<this.min.y||t.y>this.max.y)}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y))}intersectsBox(t){return!(t.max.x<this.min.x||t.min.x>this.max.x||t.max.y<this.min.y||t.min.y>this.max.y)}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return Mp.copy(t).clamp(this.min,this.max).sub(t).length()}intersect(t){return this.min.max(t.min),this.max.min(t.max),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}}class Dr{constructor(){this.type="ShapePath",this.color=new $t,this.subPaths=[],this.currentPath=null}moveTo(t,e){return this.currentPath=new js,this.subPaths.push(this.currentPath),this.currentPath.moveTo(t,e),this}lineTo(t,e){return this.currentPath.lineTo(t,e),this}quadraticCurveTo(t,e,n,i){return this.currentPath.quadraticCurveTo(t,e,n,i),this}bezierCurveTo(t,e,n,i,s,o){return this.currentPath.bezierCurveTo(t,e,n,i,s,o),this}splineThru(t){return this.currentPath.splineThru(t),this}toShapes(t,e){function n(M){const b=[];for(let x=0,v=M.length;x<v;x++){const E=M[x],C=new xl;C.curves=E.curves,b.push(C)}return b}function i(M,b){const x=b.length;let v=!1;for(let E=x-1,C=0;C<x;E=C++){let y=b[E],w=b[C],D=w.x-y.x,B=w.y-y.y;if(Math.abs(B)>Number.EPSILON){if(B<0&&(y=b[C],D=-D,w=b[E],B=-B),M.y<y.y||M.y>w.y)continue;if(M.y===y.y){if(M.x===y.x)return!0}else{const k=B*(M.x-y.x)-D*(M.y-y.y);if(k===0)return!0;if(k<0)continue;v=!v}}else{if(M.y!==y.y)continue;if(w.x<=M.x&&M.x<=y.x||y.x<=M.x&&M.x<=w.x)return!0}}return v}const s=oc.isClockWise,o=this.subPaths;if(o.length===0)return[];if(e===!0)return n(o);let a,l,c;const u=[];if(o.length===1)return l=o[0],c=new xl,c.curves=l.curves,u.push(c),u;let h=!s(o[0].getPoints());h=t?!h:h;const f=[],d=[];let g=[],p=0,m;d[p]=void 0,g[p]=[];for(let M=0,b=o.length;M<b;M++)l=o[M],m=l.getPoints(),a=s(m),a=t?!a:a,a?(!h&&d[p]&&p++,d[p]={s:new xl,p:m},d[p].s.curves=l.curves,h&&p++,g[p]=[]):g[p].push({h:l,p:m[0]});if(!d[0])return n(o);if(d.length>1){let M=!1,b=0;for(let x=0,v=d.length;x<v;x++)f[x]=[];for(let x=0,v=d.length;x<v;x++){const E=g[x];for(let C=0;C<E.length;C++){const y=E[C];let w=!0;for(let D=0;D<d.length;D++)i(y.p,d[D].p)&&(x!==D&&b++,w?(w=!1,f[D].push(y)):M=!0);w&&f[x].push(y)}}b>0&&M===!1&&(g=f)}let _;for(let M=0,b=d.length;M<b;M++){c=d[M].s,u.push(c),_=g[M];for(let x=0,v=_.length;x<v;x++)c.holes.push(_[x].h)}return u}}const ci=new Uint32Array(512),ui=new Uint32Array(512);for(let r=0;r<256;++r){const t=r-127;t<-27?(ci[r]=0,ci[r|256]=32768,ui[r]=24,ui[r|256]=24):t<-14?(ci[r]=1024>>-t-14,ci[r|256]=1024>>-t-14|32768,ui[r]=-t-1,ui[r|256]=-t-1):t<=15?(ci[r]=t+15<<10,ci[r|256]=t+15<<10|32768,ui[r]=13,ui[r|256]=13):t<128?(ci[r]=31744,ci[r|256]=64512,ui[r]=24,ui[r|256]=24):(ci[r]=31744,ci[r|256]=64512,ui[r]=13,ui[r|256]=13)}const x_=new Uint32Array(2048),ma=new Uint32Array(64),$1=new Uint32Array(64);for(let r=1;r<1024;++r){let t=r<<13,e=0;for(;!(t&8388608);)t<<=1,e-=8388608;t&=-8388609,e+=947912704,x_[r]=t|e}for(let r=1024;r<2048;++r)x_[r]=939524096+(r-1024<<13);for(let r=1;r<31;++r)ma[r]=r<<23;ma[31]=1199570944;ma[32]=2147483648;for(let r=33;r<63;++r)ma[r]=2147483648+(r-32<<23);ma[63]=3347054592;for(let r=1;r<64;++r)r!==32&&($1[r]=1024);typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:qh}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=qh);class v_ extends ac{constructor(t){super(t),this.defaultDPI=90,this.defaultUnit="px"}load(t,e,n,i){const s=this,o=new W1(s.manager);o.setPath(s.path),o.setRequestHeader(s.requestHeader),o.setWithCredentials(s.withCredentials),o.load(t,function(a){try{e(s.parse(a))}catch(l){i?i(l):console.error(l),s.manager.itemError(t)}},n,i)}parse(t){const e=this;function n(A,O){if(A.nodeType!==1)return;const T=x(A);let I=!1,z=null;switch(A.nodeName){case"svg":break;case"style":s(A);break;case"g":O=g(A,O);break;case"path":O=g(A,O),A.hasAttribute("d")&&(z=i(A));break;case"rect":O=g(A,O),z=l(A);break;case"polygon":O=g(A,O),z=c(A);break;case"polyline":O=g(A,O),z=u(A);break;case"circle":O=g(A,O),z=h(A);break;case"ellipse":O=g(A,O),z=f(A);break;case"line":O=g(A,O),z=d(A);break;case"defs":I=!0;break;case"use":O=g(A,O);const rt=(A.getAttributeNS("http://www.w3.org/1999/xlink","href")||"").substring(1),tt=A.viewportElement.getElementById(rt);tt?n(tt,O):console.warn("SVGLoader: 'use node' references non-existent node id: "+rt);break}z&&(O.fill!==void 0&&O.fill!=="none"&&z.color.setStyle(O.fill),E(z,q),D.push(z),z.userData={node:A,style:O});const U=A.childNodes;for(let j=0;j<U.length;j++){const rt=U[j];I&&rt.nodeName!=="style"&&rt.nodeName!=="defs"||n(rt,O)}T&&(k.pop(),k.length>0?q.copy(k[k.length-1]):q.identity())}function i(A){const O=new Dr,T=new vt,I=new vt,z=new vt;let U=!0,j=!1;const tt=A.getAttribute("d").match(/[a-df-z][^a-df-z]*/ig);for(let ut=0,ot=tt.length;ut<ot;ut++){const at=tt[ut],it=at.charAt(0),dt=at.slice(1).trim();U===!0&&(j=!0,U=!1);let W;switch(it){case"M":W=m(dt);for(let S=0,pt=W.length;S<pt;S+=2)T.x=W[S+0],T.y=W[S+1],I.x=T.x,I.y=T.y,S===0?O.moveTo(T.x,T.y):O.lineTo(T.x,T.y),S===0&&z.copy(T);break;case"H":W=m(dt);for(let S=0,pt=W.length;S<pt;S++)T.x=W[S],I.x=T.x,I.y=T.y,O.lineTo(T.x,T.y),S===0&&j===!0&&z.copy(T);break;case"V":W=m(dt);for(let S=0,pt=W.length;S<pt;S++)T.y=W[S],I.x=T.x,I.y=T.y,O.lineTo(T.x,T.y),S===0&&j===!0&&z.copy(T);break;case"L":W=m(dt);for(let S=0,pt=W.length;S<pt;S+=2)T.x=W[S+0],T.y=W[S+1],I.x=T.x,I.y=T.y,O.lineTo(T.x,T.y),S===0&&j===!0&&z.copy(T);break;case"C":W=m(dt);for(let S=0,pt=W.length;S<pt;S+=6)O.bezierCurveTo(W[S+0],W[S+1],W[S+2],W[S+3],W[S+4],W[S+5]),I.x=W[S+2],I.y=W[S+3],T.x=W[S+4],T.y=W[S+5],S===0&&j===!0&&z.copy(T);break;case"S":W=m(dt);for(let S=0,pt=W.length;S<pt;S+=4)O.bezierCurveTo(p(T.x,I.x),p(T.y,I.y),W[S+0],W[S+1],W[S+2],W[S+3]),I.x=W[S+0],I.y=W[S+1],T.x=W[S+2],T.y=W[S+3],S===0&&j===!0&&z.copy(T);break;case"Q":W=m(dt);for(let S=0,pt=W.length;S<pt;S+=4)O.quadraticCurveTo(W[S+0],W[S+1],W[S+2],W[S+3]),I.x=W[S+0],I.y=W[S+1],T.x=W[S+2],T.y=W[S+3],S===0&&j===!0&&z.copy(T);break;case"T":W=m(dt);for(let S=0,pt=W.length;S<pt;S+=2){const yt=p(T.x,I.x),Lt=p(T.y,I.y);O.quadraticCurveTo(yt,Lt,W[S+0],W[S+1]),I.x=yt,I.y=Lt,T.x=W[S+0],T.y=W[S+1],S===0&&j===!0&&z.copy(T)}break;case"A":W=m(dt,[3,4],7);for(let S=0,pt=W.length;S<pt;S+=7){if(W[S+5]==T.x&&W[S+6]==T.y)continue;const yt=T.clone();T.x=W[S+5],T.y=W[S+6],I.x=T.x,I.y=T.y,o(O,W[S],W[S+1],W[S+2],W[S+3],W[S+4],yt,T),S===0&&j===!0&&z.copy(T)}break;case"m":W=m(dt);for(let S=0,pt=W.length;S<pt;S+=2)T.x+=W[S+0],T.y+=W[S+1],I.x=T.x,I.y=T.y,S===0?O.moveTo(T.x,T.y):O.lineTo(T.x,T.y),S===0&&z.copy(T);break;case"h":W=m(dt);for(let S=0,pt=W.length;S<pt;S++)T.x+=W[S],I.x=T.x,I.y=T.y,O.lineTo(T.x,T.y),S===0&&j===!0&&z.copy(T);break;case"v":W=m(dt);for(let S=0,pt=W.length;S<pt;S++)T.y+=W[S],I.x=T.x,I.y=T.y,O.lineTo(T.x,T.y),S===0&&j===!0&&z.copy(T);break;case"l":W=m(dt);for(let S=0,pt=W.length;S<pt;S+=2)T.x+=W[S+0],T.y+=W[S+1],I.x=T.x,I.y=T.y,O.lineTo(T.x,T.y),S===0&&j===!0&&z.copy(T);break;case"c":W=m(dt);for(let S=0,pt=W.length;S<pt;S+=6)O.bezierCurveTo(T.x+W[S+0],T.y+W[S+1],T.x+W[S+2],T.y+W[S+3],T.x+W[S+4],T.y+W[S+5]),I.x=T.x+W[S+2],I.y=T.y+W[S+3],T.x+=W[S+4],T.y+=W[S+5],S===0&&j===!0&&z.copy(T);break;case"s":W=m(dt);for(let S=0,pt=W.length;S<pt;S+=4)O.bezierCurveTo(p(T.x,I.x),p(T.y,I.y),T.x+W[S+0],T.y+W[S+1],T.x+W[S+2],T.y+W[S+3]),I.x=T.x+W[S+0],I.y=T.y+W[S+1],T.x+=W[S+2],T.y+=W[S+3],S===0&&j===!0&&z.copy(T);break;case"q":W=m(dt);for(let S=0,pt=W.length;S<pt;S+=4)O.quadraticCurveTo(T.x+W[S+0],T.y+W[S+1],T.x+W[S+2],T.y+W[S+3]),I.x=T.x+W[S+0],I.y=T.y+W[S+1],T.x+=W[S+2],T.y+=W[S+3],S===0&&j===!0&&z.copy(T);break;case"t":W=m(dt);for(let S=0,pt=W.length;S<pt;S+=2){const yt=p(T.x,I.x),Lt=p(T.y,I.y);O.quadraticCurveTo(yt,Lt,T.x+W[S+0],T.y+W[S+1]),I.x=yt,I.y=Lt,T.x=T.x+W[S+0],T.y=T.y+W[S+1],S===0&&j===!0&&z.copy(T)}break;case"a":W=m(dt,[3,4],7);for(let S=0,pt=W.length;S<pt;S+=7){if(W[S+5]==0&&W[S+6]==0)continue;const yt=T.clone();T.x+=W[S+5],T.y+=W[S+6],I.x=T.x,I.y=T.y,o(O,W[S],W[S+1],W[S+2],W[S+3],W[S+4],yt,T),S===0&&j===!0&&z.copy(T)}break;case"Z":case"z":O.currentPath.autoClose=!0,O.currentPath.curves.length>0&&(T.copy(z),O.currentPath.currentPoint.copy(T),U=!0);break;default:console.warn(at)}j=!1}return O}function s(A){if(!(!A.sheet||!A.sheet.cssRules||!A.sheet.cssRules.length))for(let O=0;O<A.sheet.cssRules.length;O++){const T=A.sheet.cssRules[O];if(T.type!==1)continue;const I=T.selectorText.split(/,/gm).filter(Boolean).map(z=>z.trim());for(let z=0;z<I.length;z++){const U=Object.fromEntries(Object.entries(T.style).filter(([,j])=>j!==""));B[I[z]]=Object.assign(B[I[z]]||{},U)}}}function o(A,O,T,I,z,U,j,rt){if(O==0||T==0){A.lineTo(rt.x,rt.y);return}I=I*Math.PI/180,O=Math.abs(O),T=Math.abs(T);const tt=(j.x-rt.x)/2,ut=(j.y-rt.y)/2,ot=Math.cos(I)*tt+Math.sin(I)*ut,at=-Math.sin(I)*tt+Math.cos(I)*ut;let it=O*O,dt=T*T;const W=ot*ot,S=at*at,pt=W/it+S/dt;if(pt>1){const Ct=Math.sqrt(pt);O=Ct*O,T=Ct*T,it=O*O,dt=T*T}const yt=it*S+dt*W,Lt=(it*dt-yt)/yt;let Et=Math.sqrt(Math.max(0,Lt));z===U&&(Et=-Et);const F=Et*O*at/T,L=-Et*T*ot/O,st=Math.cos(I)*F-Math.sin(I)*L+(j.x+rt.x)/2,ht=Math.sin(I)*F+Math.cos(I)*L+(j.y+rt.y)/2,xt=a(1,0,(ot-F)/O,(at-L)/T),_t=a((ot-F)/O,(at-L)/T,(-ot-F)/O,(-at-L)/T)%(Math.PI*2);A.currentPath.absellipse(st,ht,O,T,xt,xt+_t,U===0,I)}function a(A,O,T,I){const z=A*T+O*I,U=Math.sqrt(A*A+O*O)*Math.sqrt(T*T+I*I);let j=Math.acos(Math.max(-1,Math.min(1,z/U)));return A*I-O*T<0&&(j=-j),j}function l(A){const O=b(A.getAttribute("x")||0),T=b(A.getAttribute("y")||0),I=b(A.getAttribute("rx")||A.getAttribute("ry")||0),z=b(A.getAttribute("ry")||A.getAttribute("rx")||0),U=b(A.getAttribute("width")),j=b(A.getAttribute("height")),rt=1-.551915024494,tt=new Dr;return tt.moveTo(O+I,T),tt.lineTo(O+U-I,T),(I!==0||z!==0)&&tt.bezierCurveTo(O+U-I*rt,T,O+U,T+z*rt,O+U,T+z),tt.lineTo(O+U,T+j-z),(I!==0||z!==0)&&tt.bezierCurveTo(O+U,T+j-z*rt,O+U-I*rt,T+j,O+U-I,T+j),tt.lineTo(O+I,T+j),(I!==0||z!==0)&&tt.bezierCurveTo(O+I*rt,T+j,O,T+j-z*rt,O,T+j-z),tt.lineTo(O,T+z),(I!==0||z!==0)&&tt.bezierCurveTo(O,T+z*rt,O+I*rt,T,O+I,T),tt}function c(A){function O(U,j,rt){const tt=b(j),ut=b(rt);z===0?I.moveTo(tt,ut):I.lineTo(tt,ut),z++}const T=/(-?[\d\.?]+)[,|\s](-?[\d\.?]+)/g,I=new Dr;let z=0;return A.getAttribute("points").replace(T,O),I.currentPath.autoClose=!0,I}function u(A){function O(U,j,rt){const tt=b(j),ut=b(rt);z===0?I.moveTo(tt,ut):I.lineTo(tt,ut),z++}const T=/(-?[\d\.?]+)[,|\s](-?[\d\.?]+)/g,I=new Dr;let z=0;return A.getAttribute("points").replace(T,O),I.currentPath.autoClose=!1,I}function h(A){const O=b(A.getAttribute("cx")||0),T=b(A.getAttribute("cy")||0),I=b(A.getAttribute("r")||0),z=new js;z.absarc(O,T,I,0,Math.PI*2);const U=new Dr;return U.subPaths.push(z),U}function f(A){const O=b(A.getAttribute("cx")||0),T=b(A.getAttribute("cy")||0),I=b(A.getAttribute("rx")||0),z=b(A.getAttribute("ry")||0),U=new js;U.absellipse(O,T,I,z,0,Math.PI*2);const j=new Dr;return j.subPaths.push(U),j}function d(A){const O=b(A.getAttribute("x1")||0),T=b(A.getAttribute("y1")||0),I=b(A.getAttribute("x2")||0),z=b(A.getAttribute("y2")||0),U=new Dr;return U.moveTo(O,T),U.lineTo(I,z),U.currentPath.autoClose=!1,U}function g(A,O){O=Object.assign({},O);let T={};if(A.hasAttribute("class")){const j=A.getAttribute("class").split(/\s/).filter(Boolean).map(rt=>rt.trim());for(let rt=0;rt<j.length;rt++)T=Object.assign(T,B["."+j[rt]])}A.hasAttribute("id")&&(T=Object.assign(T,B["#"+A.getAttribute("id")]));function I(j,rt,tt){tt===void 0&&(tt=function(ot){return ot.startsWith("url")&&console.warn("SVGLoader: url access in attributes is not implemented."),ot}),A.hasAttribute(j)&&(O[rt]=tt(A.getAttribute(j))),T[j]&&(O[rt]=tt(T[j])),A.style&&A.style[j]!==""&&(O[rt]=tt(A.style[j]))}function z(j){return Math.max(0,Math.min(1,b(j)))}function U(j){return Math.max(0,b(j))}return I("fill","fill"),I("fill-opacity","fillOpacity",z),I("fill-rule","fillRule"),I("opacity","opacity",z),I("stroke","stroke"),I("stroke-opacity","strokeOpacity",z),I("stroke-width","strokeWidth",U),I("stroke-linejoin","strokeLineJoin"),I("stroke-linecap","strokeLineCap"),I("stroke-miterlimit","strokeMiterLimit",U),I("visibility","visibility"),O}function p(A,O){return A-(O-A)}function m(A,O,T){if(typeof A!="string")throw new TypeError("Invalid input: "+typeof A);const I={SEPARATOR:/[ \t\r\n\,.\-+]/,WHITESPACE:/[ \t\r\n]/,DIGIT:/[\d]/,SIGN:/[-+]/,POINT:/\./,COMMA:/,/,EXP:/e/i,FLAGS:/[01]/},z=0,U=1,j=2,rt=3;let tt=z,ut=!0,ot="",at="";const it=[];function dt(yt,Lt,Et){const F=new SyntaxError('Unexpected character "'+yt+'" at index '+Lt+".");throw F.partial=Et,F}function W(){ot!==""&&(at===""?it.push(Number(ot)):it.push(Number(ot)*Math.pow(10,Number(at)))),ot="",at=""}let S;const pt=A.length;for(let yt=0;yt<pt;yt++){if(S=A[yt],Array.isArray(O)&&O.includes(it.length%T)&&I.FLAGS.test(S)){tt=U,ot=S,W();continue}if(tt===z){if(I.WHITESPACE.test(S))continue;if(I.DIGIT.test(S)||I.SIGN.test(S)){tt=U,ot=S;continue}if(I.POINT.test(S)){tt=j,ot=S;continue}I.COMMA.test(S)&&(ut&&dt(S,yt,it),ut=!0)}if(tt===U){if(I.DIGIT.test(S)){ot+=S;continue}if(I.POINT.test(S)){ot+=S,tt=j;continue}if(I.EXP.test(S)){tt=rt;continue}I.SIGN.test(S)&&ot.length===1&&I.SIGN.test(ot[0])&&dt(S,yt,it)}if(tt===j){if(I.DIGIT.test(S)){ot+=S;continue}if(I.EXP.test(S)){tt=rt;continue}I.POINT.test(S)&&ot[ot.length-1]==="."&&dt(S,yt,it)}if(tt===rt){if(I.DIGIT.test(S)){at+=S;continue}if(I.SIGN.test(S)){if(at===""){at+=S;continue}at.length===1&&I.SIGN.test(at)&&dt(S,yt,it)}}I.WHITESPACE.test(S)?(W(),tt=z,ut=!1):I.COMMA.test(S)?(W(),tt=z,ut=!0):I.SIGN.test(S)?(W(),tt=U,ot=S):I.POINT.test(S)?(W(),tt=j,ot=S):dt(S,yt,it)}return W(),it}const _=["mm","cm","in","pt","pc","px"],M={mm:{mm:1,cm:.1,in:1/25.4,pt:72/25.4,pc:6/25.4,px:-1},cm:{mm:10,cm:1,in:1/2.54,pt:72/2.54,pc:6/2.54,px:-1},in:{mm:25.4,cm:2.54,in:1,pt:72,pc:6,px:-1},pt:{mm:25.4/72,cm:2.54/72,in:1/72,pt:1,pc:6/72,px:-1},pc:{mm:25.4/6,cm:2.54/6,in:1/6,pt:72/6,pc:1,px:-1},px:{px:1}};function b(A){let O="px";if(typeof A=="string"||A instanceof String)for(let I=0,z=_.length;I<z;I++){const U=_[I];if(A.endsWith(U)){O=U,A=A.substring(0,A.length-U.length);break}}let T;return O==="px"&&e.defaultUnit!=="px"?T=M.in[e.defaultUnit]/e.defaultDPI:(T=M[O][e.defaultUnit],T<0&&(T=M[O].in*e.defaultDPI)),T*parseFloat(A)}function x(A){if(!(A.hasAttribute("transform")||A.nodeName==="use"&&(A.hasAttribute("x")||A.hasAttribute("y"))))return null;const O=v(A);return k.length>0&&O.premultiply(k[k.length-1]),q.copy(O),k.push(O),O}function v(A){const O=new Xe,T=Z;if(A.nodeName==="use"&&(A.hasAttribute("x")||A.hasAttribute("y"))){const I=b(A.getAttribute("x")),z=b(A.getAttribute("y"));O.translate(I,z)}if(A.hasAttribute("transform")){const I=A.getAttribute("transform").split(")");for(let z=I.length-1;z>=0;z--){const U=I[z].trim();if(U==="")continue;const j=U.indexOf("("),rt=U.length;if(j>0&&j<rt){const tt=U.slice(0,j),ut=m(U.slice(j+1));switch(T.identity(),tt){case"translate":if(ut.length>=1){const ot=ut[0];let at=ot;ut.length>=2&&(at=ut[1]),T.translate(ot,at)}break;case"rotate":if(ut.length>=1){let ot=0,at=0,it=0;ot=-ut[0]*Math.PI/180,ut.length>=3&&(at=ut[1],it=ut[2]),V.identity().translate(-at,-it),$.identity().rotate(ot),Y.multiplyMatrices($,V),V.identity().translate(at,it),T.multiplyMatrices(V,Y)}break;case"scale":if(ut.length>=1){const ot=ut[0];let at=ot;ut.length>=2&&(at=ut[1]),T.scale(ot,at)}break;case"skewX":ut.length===1&&T.set(1,Math.tan(ut[0]*Math.PI/180),0,0,1,0,0,0,1);break;case"skewY":ut.length===1&&T.set(1,0,0,Math.tan(ut[0]*Math.PI/180),1,0,0,0,1);break;case"matrix":ut.length===6&&T.set(ut[0],ut[2],ut[4],ut[1],ut[3],ut[5],0,0,1);break}}O.premultiply(T)}}return O}function E(A,O){function T(U){G.set(U.x,U.y,1).applyMatrix3(O),U.set(G.x,G.y)}const I=C(O),z=A.subPaths;for(let U=0,j=z.length;U<j;U++){const tt=z[U].curves;for(let ut=0;ut<tt.length;ut++){const ot=tt[ut];ot.isLineCurve?(T(ot.v1),T(ot.v2)):ot.isCubicBezierCurve?(T(ot.v0),T(ot.v1),T(ot.v2),T(ot.v3)):ot.isQuadraticBezierCurve?(T(ot.v0),T(ot.v1),T(ot.v2)):ot.isEllipseCurve&&(I&&console.warn("SVGLoader: Elliptic arc or ellipse rotation or skewing is not implemented."),H.set(ot.aX,ot.aY),T(H),ot.aX=H.x,ot.aY=H.y,ot.xRadius*=y(O),ot.yRadius*=w(O))}}}function C(A){return A.elements[1]!==0||A.elements[3]!==0}function y(A){const O=A.elements;return Math.sqrt(O[0]*O[0]+O[1]*O[1])}function w(A){const O=A.elements;return Math.sqrt(O[3]*O[3]+O[4]*O[4])}const D=[],B={},k=[],Z=new Xe,V=new Xe,$=new Xe,Y=new Xe,H=new vt,G=new J,q=new Xe,P=new DOMParser().parseFromString(t,"image/svg+xml");return n(P.documentElement,{fill:"#000",fillOpacity:1,strokeOpacity:1,strokeWidth:1,strokeLineJoin:"miter",strokeLineCap:"butt",strokeMiterLimit:4}),{paths:D,xml:P.documentElement}}static createShapes(t){const n={ORIGIN:0,DESTINATION:1,BETWEEN:2,LEFT:3,RIGHT:4,BEHIND:5,BEYOND:6},i={loc:n.ORIGIN,t:0};function s(m,_,M,b){const x=m.x,v=_.x,E=M.x,C=b.x,y=m.y,w=_.y,D=M.y,B=b.y,k=(C-E)*(y-D)-(B-D)*(x-E),Z=(v-x)*(y-D)-(w-y)*(x-E),V=(B-D)*(v-x)-(C-E)*(w-y),$=k/V,Y=Z/V;if(V===0&&k!==0||$<=0||$>=1||Y<0||Y>1)return null;if(k===0&&V===0){for(let H=0;H<2;H++)if(o(H===0?M:b,m,_),i.loc==n.ORIGIN){const G=H===0?M:b;return{x:G.x,y:G.y,t:i.t}}else if(i.loc==n.BETWEEN){const G=+(x+i.t*(v-x)).toPrecision(10),q=+(y+i.t*(w-y)).toPrecision(10);return{x:G,y:q,t:i.t}}return null}else{for(let q=0;q<2;q++)if(o(q===0?M:b,m,_),i.loc==n.ORIGIN){const P=q===0?M:b;return{x:P.x,y:P.y,t:i.t}}const H=+(x+$*(v-x)).toPrecision(10),G=+(y+$*(w-y)).toPrecision(10);return{x:H,y:G,t:$}}}function o(m,_,M){const b=M.x-_.x,x=M.y-_.y,v=m.x-_.x,E=m.y-_.y,C=b*E-v*x;if(m.x===_.x&&m.y===_.y){i.loc=n.ORIGIN,i.t=0;return}if(m.x===M.x&&m.y===M.y){i.loc=n.DESTINATION,i.t=1;return}if(C<-Number.EPSILON){i.loc=n.LEFT;return}if(C>Number.EPSILON){i.loc=n.RIGHT;return}if(b*v<0||x*E<0){i.loc=n.BEHIND;return}if(Math.sqrt(b*b+x*x)<Math.sqrt(v*v+E*E)){i.loc=n.BEYOND;return}let y;b!==0?y=v/b:y=E/x,i.loc=n.BETWEEN,i.t=y}function a(m,_){const M=[],b=[];for(let x=1;x<m.length;x++){const v=m[x-1],E=m[x];for(let C=1;C<_.length;C++){const y=_[C-1],w=_[C],D=s(v,E,y,w);D!==null&&M.find(B=>B.t<=D.t+Number.EPSILON&&B.t>=D.t-Number.EPSILON)===void 0&&(M.push(D),b.push(new vt(D.x,D.y)))}}return b}function l(m,_,M){const b=new vt;_.getCenter(b);const x=[];return M.forEach(v=>{v.boundingBox.containsPoint(b)&&a(m,v.points).forEach(C=>{x.push({identifier:v.identifier,isCW:v.isCW,point:C})})}),x.sort((v,E)=>v.point.x-E.point.x),x}function c(m,_,M,b,x){(x==null||x==="")&&(x="nonzero");const v=new vt;m.boundingBox.getCenter(v);const E=[new vt(M,v.y),new vt(b,v.y)],C=l(E,m.boundingBox,_);C.sort((Z,V)=>Z.point.x-V.point.x);const y=[],w=[];C.forEach(Z=>{Z.identifier===m.identifier?y.push(Z):w.push(Z)});const D=y[0].point.x,B=[];let k=0;for(;k<w.length&&w[k].point.x<D;)B.length>0&&B[B.length-1]===w[k].identifier?B.pop():B.push(w[k].identifier),k++;if(B.push(m.identifier),x==="evenodd"){const Z=B.length%2===0,V=B[B.length-2];return{identifier:m.identifier,isHole:Z,for:V}}else if(x==="nonzero"){let Z=!0,V=null,$=null;for(let Y=0;Y<B.length;Y++){const H=B[Y];Z?($=_[H].isCW,Z=!1,V=H):$!==_[H].isCW&&($=_[H].isCW,Z=!0)}return{identifier:m.identifier,isHole:Z,for:V}}else console.warn('fill-rule: "'+x+'" is currently not implemented.')}let u=0,h=999999999,f=-999999999,d=t.subPaths.map(m=>{const _=m.getPoints();let M=-999999999,b=999999999,x=-999999999,v=999999999;for(let E=0;E<_.length;E++){const C=_[E];C.y>M&&(M=C.y),C.y<b&&(b=C.y),C.x>x&&(x=C.x),C.x<v&&(v=C.x)}return f<=x&&(f=x+1),h>=v&&(h=v-1),{curves:m.curves,points:_,isCW:oc.isClockWise(_),identifier:u++,boundingBox:new Y1(new vt(v,b),new vt(x,M))}});d=d.filter(m=>m.points.length>1);const g=d.map(m=>c(m,d,h,f,t.userData.style.fillRule)),p=[];return d.forEach(m=>{if(!g[m.identifier].isHole){const M=new xl;M.curves=m.curves,g.filter(x=>x.isHole&&x.for===m.identifier).forEach(x=>{const v=d[x.identifier],E=new js;E.curves=v.curves,M.holes.push(E)}),p.push(M)}}),p}static getStrokeStyle(t,e,n,i,s){return t=t!==void 0?t:1,e=e!==void 0?e:"#000",n=n!==void 0?n:"miter",i=i!==void 0?i:"butt",s=s!==void 0?s:4,{strokeColor:e,strokeWidth:t,strokeLineJoin:n,strokeLineCap:i,strokeMiterLimit:s}}static pointsToStroke(t,e,n,i){const s=[],o=[],a=[];if(v_.pointsToStrokeWithBuffers(t,e,n,i,s,o,a)===0)return null;const l=new Zi;return l.setAttribute("position",new wi(s,3)),l.setAttribute("normal",new wi(o,3)),l.setAttribute("uv",new wi(a,2)),l}static pointsToStrokeWithBuffers(t,e,n,i,s,o,a,l){const c=new vt,u=new vt,h=new vt,f=new vt,d=new vt,g=new vt,p=new vt,m=new vt,_=new vt,M=new vt,b=new vt,x=new vt,v=new vt,E=new vt,C=new vt,y=new vt,w=new vt;n=n!==void 0?n:12,i=i!==void 0?i:.001,l=l!==void 0?l:0,t=at(t);const D=t.length;if(D<2)return 0;const B=t[0].equals(t[D-1]);let k,Z=t[0],V;const $=e.strokeWidth/2,Y=1/(D-1);let H=0,G,q,P,nt,A=!1,O=0,T=l*3,I=l*2;z(t[0],t[1],c).multiplyScalar($),m.copy(t[0]).sub(c),_.copy(t[0]).add(c),M.copy(m),b.copy(_);for(let it=1;it<D;it++){k=t[it],it===D-1?B?V=t[1]:V=void 0:V=t[it+1];const dt=c;if(z(Z,k,dt),h.copy(dt).multiplyScalar($),x.copy(k).sub(h),v.copy(k).add(h),G=H+Y,q=!1,V!==void 0){z(k,V,u),h.copy(u).multiplyScalar($),E.copy(k).sub(h),C.copy(k).add(h),P=!0,h.subVectors(V,Z),dt.dot(h)<0&&(P=!1),it===1&&(A=P),h.subVectors(V,k),h.normalize();const W=Math.abs(dt.dot(h));if(W!==0){const S=$/W;h.multiplyScalar(-S),f.subVectors(k,Z),d.copy(f).setLength(S).add(h),y.copy(d).negate();const pt=d.length(),yt=f.length();f.divideScalar(yt),g.subVectors(V,k);const Lt=g.length();switch(g.divideScalar(Lt),f.dot(y)<yt&&g.dot(y)<Lt&&(q=!0),w.copy(d).add(k),y.add(k),nt=!1,q?P?(C.copy(y),v.copy(y)):(E.copy(y),x.copy(y)):rt(),e.strokeLineJoin){case"bevel":tt(P,q,G);break;case"round":ut(P,q),P?j(k,x,E,G,0):j(k,C,v,G,1);break;case"miter":case"miter-clip":default:const Et=$*e.strokeMiterLimit/pt;if(Et<1)if(e.strokeLineJoin!=="miter-clip"){tt(P,q,G);break}else ut(P,q),P?(g.subVectors(w,x).multiplyScalar(Et).add(x),p.subVectors(w,E).multiplyScalar(Et).add(E),U(x,G,0),U(g,G,0),U(k,G,.5),U(k,G,.5),U(g,G,0),U(p,G,0),U(k,G,.5),U(p,G,0),U(E,G,0)):(g.subVectors(w,v).multiplyScalar(Et).add(v),p.subVectors(w,C).multiplyScalar(Et).add(C),U(v,G,1),U(g,G,1),U(k,G,.5),U(k,G,.5),U(g,G,1),U(p,G,1),U(k,G,.5),U(p,G,1),U(C,G,1));else q?(P?(U(_,H,1),U(m,H,0),U(w,G,0),U(_,H,1),U(w,G,0),U(y,G,1)):(U(_,H,1),U(m,H,0),U(w,G,1),U(m,H,0),U(y,G,0),U(w,G,1)),P?E.copy(w):C.copy(w)):P?(U(x,G,0),U(w,G,0),U(k,G,.5),U(k,G,.5),U(w,G,0),U(E,G,0)):(U(v,G,1),U(w,G,1),U(k,G,.5),U(k,G,.5),U(w,G,1),U(C,G,1)),nt=!0;break}}else rt()}else rt();!B&&it===D-1&&ot(t[0],M,b,P,!0,H),H=G,Z=k,m.copy(E),_.copy(C)}if(!B)ot(k,x,v,P,!1,G);else if(q&&s){let it=w,dt=y;A!==P&&(it=y,dt=w),P?(nt||A)&&(dt.toArray(s,0*3),dt.toArray(s,3*3),nt&&it.toArray(s,1*3)):(nt||!A)&&(dt.toArray(s,1*3),dt.toArray(s,3*3),nt&&it.toArray(s,0*3))}return O;function z(it,dt,W){return W.subVectors(dt,it),W.set(-W.y,W.x).normalize()}function U(it,dt,W){s&&(s[T]=it.x,s[T+1]=it.y,s[T+2]=0,o&&(o[T]=0,o[T+1]=0,o[T+2]=1),T+=3,a&&(a[I]=dt,a[I+1]=W,I+=2)),O+=3}function j(it,dt,W,S,pt){c.copy(dt).sub(it).normalize(),u.copy(W).sub(it).normalize();let yt=Math.PI;const Lt=c.dot(u);Math.abs(Lt)<1&&(yt=Math.abs(Math.acos(Lt))),yt/=n,h.copy(dt);for(let Et=0,F=n-1;Et<F;Et++)f.copy(h).rotateAround(it,yt),U(h,S,pt),U(f,S,pt),U(it,S,.5),h.copy(f);U(f,S,pt),U(W,S,pt),U(it,S,.5)}function rt(){U(_,H,1),U(m,H,0),U(x,G,0),U(_,H,1),U(x,G,1),U(v,G,0)}function tt(it,dt,W){dt?it?(U(_,H,1),U(m,H,0),U(x,G,0),U(_,H,1),U(x,G,0),U(y,G,1),U(x,W,0),U(E,W,0),U(y,W,.5)):(U(_,H,1),U(m,H,0),U(v,G,1),U(m,H,0),U(y,G,0),U(v,G,1),U(v,W,1),U(C,W,0),U(y,W,.5)):it?(U(x,W,0),U(E,W,0),U(k,W,.5)):(U(v,W,1),U(C,W,0),U(k,W,.5))}function ut(it,dt){dt&&(it?(U(_,H,1),U(m,H,0),U(x,G,0),U(_,H,1),U(x,G,0),U(y,G,1),U(x,H,0),U(k,G,.5),U(y,G,1),U(k,G,.5),U(E,H,0),U(y,G,1)):(U(_,H,1),U(m,H,0),U(v,G,1),U(m,H,0),U(y,G,0),U(v,G,1),U(v,H,1),U(y,G,0),U(k,G,.5),U(k,G,.5),U(y,G,0),U(C,H,1)))}function ot(it,dt,W,S,pt,yt){switch(e.strokeLineCap){case"round":pt?j(it,W,dt,yt,.5):j(it,dt,W,yt,.5);break;case"square":if(pt)c.subVectors(dt,it),u.set(c.y,-c.x),h.addVectors(c,u).add(it),f.subVectors(u,c).add(it),S?(h.toArray(s,1*3),f.toArray(s,0*3),f.toArray(s,3*3)):(h.toArray(s,1*3),h.toArray(s,3*3),f.toArray(s,0*3));else{c.subVectors(W,it),u.set(c.y,-c.x),h.addVectors(c,u).add(it),f.subVectors(u,c).add(it);const Lt=s.length;S?(h.toArray(s,Lt-1*3),f.toArray(s,Lt-2*3),f.toArray(s,Lt-4*3)):(h.toArray(s,Lt-2*3),f.toArray(s,Lt-1*3),f.toArray(s,Lt-4*3))}break}}function at(it){let dt=!1;for(let S=1,pt=it.length-1;S<pt;S++)if(it[S].distanceTo(it[S+1])<i){dt=!0;break}if(!dt)return it;const W=[];W.push(it[0]);for(let S=1,pt=it.length-1;S<pt;S++)it[S].distanceTo(it[S+1])>=i&&W.push(it[S]);return W.push(it[it.length-1]),W}}}const Sp={type:"change"},uu={type:"start"},bp={type:"end"};class tT extends us{constructor(t,e){super(),e===void 0&&console.warn('THREE.OrbitControls: The second parameter "domElement" is now mandatory.'),e===document&&console.error('THREE.OrbitControls: "document" should not be used as the target "domElement". Please use "renderer.domElement" instead.'),this.object=t,this.domElement=e,this.domElement.style.touchAction="none",this.enabled=!0,this.target=new J,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:ps.ROTATE,MIDDLE:ps.DOLLY,RIGHT:ps.PAN},this.touches={ONE:ms.ROTATE,TWO:ms.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._domElementKeyEvents=null,this.getPolarAngle=function(){return a.phi},this.getAzimuthalAngle=function(){return a.theta},this.getDistance=function(){return this.object.position.distanceTo(this.target)},this.listenToKeyEvents=function(N){N.addEventListener("keydown",Et),this._domElementKeyEvents=N},this.saveState=function(){n.target0.copy(n.target),n.position0.copy(n.object.position),n.zoom0=n.object.zoom},this.reset=function(){n.target.copy(n.target0),n.object.position.copy(n.position0),n.object.zoom=n.zoom0,n.object.updateProjectionMatrix(),n.dispatchEvent(Sp),n.update(),s=i.NONE},this.update=function(){const N=new J,ft=new ls().setFromUnitVectors(t.up,new J(0,1,0)),St=ft.clone().invert(),mt=new J,X=new ls,gt=2*Math.PI;return function(){const Ot=n.object.position;N.copy(Ot).sub(n.target),N.applyQuaternion(ft),a.setFromVector3(N),n.autoRotate&&s===i.NONE&&w(C()),n.enableDamping?(a.theta+=l.theta*n.dampingFactor,a.phi+=l.phi*n.dampingFactor):(a.theta+=l.theta,a.phi+=l.phi);let bt=n.minAzimuthAngle,Pt=n.maxAzimuthAngle;return isFinite(bt)&&isFinite(Pt)&&(bt<-Math.PI?bt+=gt:bt>Math.PI&&(bt-=gt),Pt<-Math.PI?Pt+=gt:Pt>Math.PI&&(Pt-=gt),bt<=Pt?a.theta=Math.max(bt,Math.min(Pt,a.theta)):a.theta=a.theta>(bt+Pt)/2?Math.max(bt,a.theta):Math.min(Pt,a.theta)),a.phi=Math.max(n.minPolarAngle,Math.min(n.maxPolarAngle,a.phi)),a.makeSafe(),a.radius*=c,a.radius=Math.max(n.minDistance,Math.min(n.maxDistance,a.radius)),n.enableDamping===!0?n.target.addScaledVector(u,n.dampingFactor):n.target.add(u),N.setFromSpherical(a),N.applyQuaternion(St),Ot.copy(n.target).add(N),n.object.lookAt(n.target),n.enableDamping===!0?(l.theta*=1-n.dampingFactor,l.phi*=1-n.dampingFactor,u.multiplyScalar(1-n.dampingFactor)):(l.set(0,0,0),u.set(0,0,0)),c=1,h||mt.distanceToSquared(n.object.position)>o||8*(1-X.dot(n.object.quaternion))>o?(n.dispatchEvent(Sp),mt.copy(n.object.position),X.copy(n.object.quaternion),h=!1,!0):!1}}(),this.dispose=function(){n.domElement.removeEventListener("contextmenu",st),n.domElement.removeEventListener("pointerdown",it),n.domElement.removeEventListener("pointercancel",S),n.domElement.removeEventListener("wheel",Lt),n.domElement.removeEventListener("pointermove",dt),n.domElement.removeEventListener("pointerup",W),n._domElementKeyEvents!==null&&n._domElementKeyEvents.removeEventListener("keydown",Et)};const n=this,i={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6};let s=i.NONE;const o=1e-6,a=new yp,l=new yp;let c=1;const u=new J;let h=!1;const f=new vt,d=new vt,g=new vt,p=new vt,m=new vt,_=new vt,M=new vt,b=new vt,x=new vt,v=[],E={};function C(){return 2*Math.PI/60/60*n.autoRotateSpeed}function y(){return Math.pow(.95,n.zoomSpeed)}function w(N){l.theta-=N}function D(N){l.phi-=N}const B=function(){const N=new J;return function(St,mt){N.setFromMatrixColumn(mt,0),N.multiplyScalar(-St),u.add(N)}}(),k=function(){const N=new J;return function(St,mt){n.screenSpacePanning===!0?N.setFromMatrixColumn(mt,1):(N.setFromMatrixColumn(mt,0),N.crossVectors(n.object.up,N)),N.multiplyScalar(St),u.add(N)}}(),Z=function(){const N=new J;return function(St,mt){const X=n.domElement;if(n.object.isPerspectiveCamera){const gt=n.object.position;N.copy(gt).sub(n.target);let Mt=N.length();Mt*=Math.tan(n.object.fov/2*Math.PI/180),B(2*St*Mt/X.clientHeight,n.object.matrix),k(2*mt*Mt/X.clientHeight,n.object.matrix)}else n.object.isOrthographicCamera?(B(St*(n.object.right-n.object.left)/n.object.zoom/X.clientWidth,n.object.matrix),k(mt*(n.object.top-n.object.bottom)/n.object.zoom/X.clientHeight,n.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),n.enablePan=!1)}}();function V(N){n.object.isPerspectiveCamera?c/=N:n.object.isOrthographicCamera?(n.object.zoom=Math.max(n.minZoom,Math.min(n.maxZoom,n.object.zoom*N)),n.object.updateProjectionMatrix(),h=!0):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),n.enableZoom=!1)}function $(N){n.object.isPerspectiveCamera?c*=N:n.object.isOrthographicCamera?(n.object.zoom=Math.max(n.minZoom,Math.min(n.maxZoom,n.object.zoom/N)),n.object.updateProjectionMatrix(),h=!0):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),n.enableZoom=!1)}function Y(N){f.set(N.clientX,N.clientY)}function H(N){M.set(N.clientX,N.clientY)}function G(N){p.set(N.clientX,N.clientY)}function q(N){d.set(N.clientX,N.clientY),g.subVectors(d,f).multiplyScalar(n.rotateSpeed);const ft=n.domElement;w(2*Math.PI*g.x/ft.clientHeight),D(2*Math.PI*g.y/ft.clientHeight),f.copy(d),n.update()}function P(N){b.set(N.clientX,N.clientY),x.subVectors(b,M),x.y>0?V(y()):x.y<0&&$(y()),M.copy(b),n.update()}function nt(N){m.set(N.clientX,N.clientY),_.subVectors(m,p).multiplyScalar(n.panSpeed),Z(_.x,_.y),p.copy(m),n.update()}function A(N){N.deltaY<0?$(y()):N.deltaY>0&&V(y()),n.update()}function O(N){let ft=!1;switch(N.code){case n.keys.UP:Z(0,n.keyPanSpeed),ft=!0;break;case n.keys.BOTTOM:Z(0,-n.keyPanSpeed),ft=!0;break;case n.keys.LEFT:Z(n.keyPanSpeed,0),ft=!0;break;case n.keys.RIGHT:Z(-n.keyPanSpeed,0),ft=!0;break}ft&&(N.preventDefault(),n.update())}function T(){if(v.length===1)f.set(v[0].pageX,v[0].pageY);else{const N=.5*(v[0].pageX+v[1].pageX),ft=.5*(v[0].pageY+v[1].pageY);f.set(N,ft)}}function I(){if(v.length===1)p.set(v[0].pageX,v[0].pageY);else{const N=.5*(v[0].pageX+v[1].pageX),ft=.5*(v[0].pageY+v[1].pageY);p.set(N,ft)}}function z(){const N=v[0].pageX-v[1].pageX,ft=v[0].pageY-v[1].pageY,St=Math.sqrt(N*N+ft*ft);M.set(0,St)}function U(){n.enableZoom&&z(),n.enablePan&&I()}function j(){n.enableZoom&&z(),n.enableRotate&&T()}function rt(N){if(v.length==1)d.set(N.pageX,N.pageY);else{const St=Ct(N),mt=.5*(N.pageX+St.x),X=.5*(N.pageY+St.y);d.set(mt,X)}g.subVectors(d,f).multiplyScalar(n.rotateSpeed);const ft=n.domElement;w(2*Math.PI*g.x/ft.clientHeight),D(2*Math.PI*g.y/ft.clientHeight),f.copy(d)}function tt(N){if(v.length===1)m.set(N.pageX,N.pageY);else{const ft=Ct(N),St=.5*(N.pageX+ft.x),mt=.5*(N.pageY+ft.y);m.set(St,mt)}_.subVectors(m,p).multiplyScalar(n.panSpeed),Z(_.x,_.y),p.copy(m)}function ut(N){const ft=Ct(N),St=N.pageX-ft.x,mt=N.pageY-ft.y,X=Math.sqrt(St*St+mt*mt);b.set(0,X),x.set(0,Math.pow(b.y/M.y,n.zoomSpeed)),V(x.y),M.copy(b)}function ot(N){n.enableZoom&&ut(N),n.enablePan&&tt(N)}function at(N){n.enableZoom&&ut(N),n.enableRotate&&rt(N)}function it(N){n.enabled!==!1&&(v.length===0&&(n.domElement.setPointerCapture(N.pointerId),n.domElement.addEventListener("pointermove",dt),n.domElement.addEventListener("pointerup",W)),ht(N),N.pointerType==="touch"?F(N):pt(N))}function dt(N){n.enabled!==!1&&(N.pointerType==="touch"?L(N):yt(N))}function W(N){xt(N),v.length===0&&(n.domElement.releasePointerCapture(N.pointerId),n.domElement.removeEventListener("pointermove",dt),n.domElement.removeEventListener("pointerup",W)),n.dispatchEvent(bp),s=i.NONE}function S(N){xt(N)}function pt(N){let ft;switch(N.button){case 0:ft=n.mouseButtons.LEFT;break;case 1:ft=n.mouseButtons.MIDDLE;break;case 2:ft=n.mouseButtons.RIGHT;break;default:ft=-1}switch(ft){case ps.DOLLY:if(n.enableZoom===!1)return;H(N),s=i.DOLLY;break;case ps.ROTATE:if(N.ctrlKey||N.metaKey||N.shiftKey){if(n.enablePan===!1)return;G(N),s=i.PAN}else{if(n.enableRotate===!1)return;Y(N),s=i.ROTATE}break;case ps.PAN:if(N.ctrlKey||N.metaKey||N.shiftKey){if(n.enableRotate===!1)return;Y(N),s=i.ROTATE}else{if(n.enablePan===!1)return;G(N),s=i.PAN}break;default:s=i.NONE}s!==i.NONE&&n.dispatchEvent(uu)}function yt(N){if(n.enabled!==!1)switch(s){case i.ROTATE:if(n.enableRotate===!1)return;q(N);break;case i.DOLLY:if(n.enableZoom===!1)return;P(N);break;case i.PAN:if(n.enablePan===!1)return;nt(N);break}}function Lt(N){n.enabled===!1||n.enableZoom===!1||s!==i.NONE||(N.preventDefault(),n.dispatchEvent(uu),A(N),n.dispatchEvent(bp))}function Et(N){n.enabled===!1||n.enablePan===!1||O(N)}function F(N){switch(_t(N),v.length){case 1:switch(n.touches.ONE){case ms.ROTATE:if(n.enableRotate===!1)return;T(),s=i.TOUCH_ROTATE;break;case ms.PAN:if(n.enablePan===!1)return;I(),s=i.TOUCH_PAN;break;default:s=i.NONE}break;case 2:switch(n.touches.TWO){case ms.DOLLY_PAN:if(n.enableZoom===!1&&n.enablePan===!1)return;U(),s=i.TOUCH_DOLLY_PAN;break;case ms.DOLLY_ROTATE:if(n.enableZoom===!1&&n.enableRotate===!1)return;j(),s=i.TOUCH_DOLLY_ROTATE;break;default:s=i.NONE}break;default:s=i.NONE}s!==i.NONE&&n.dispatchEvent(uu)}function L(N){switch(_t(N),s){case i.TOUCH_ROTATE:if(n.enableRotate===!1)return;rt(N),n.update();break;case i.TOUCH_PAN:if(n.enablePan===!1)return;tt(N),n.update();break;case i.TOUCH_DOLLY_PAN:if(n.enableZoom===!1&&n.enablePan===!1)return;ot(N),n.update();break;case i.TOUCH_DOLLY_ROTATE:if(n.enableZoom===!1&&n.enableRotate===!1)return;at(N),n.update();break;default:s=i.NONE}}function st(N){n.enabled!==!1&&N.preventDefault()}function ht(N){v.push(N)}function xt(N){delete E[N.pointerId];for(let ft=0;ft<v.length;ft++)if(v[ft].pointerId==N.pointerId){v.splice(ft,1);return}}function _t(N){let ft=E[N.pointerId];ft===void 0&&(ft=new vt,E[N.pointerId]=ft),ft.set(N.pageX,N.pageY)}function Ct(N){const ft=N.pointerId===v[0].pointerId?v[1]:v[0];return E[ft.pointerId]}n.domElement.addEventListener("contextmenu",st),n.domElement.addEventListener("pointerdown",it),n.domElement.addEventListener("pointercancel",S),n.domElement.addEventListener("wheel",Lt,{passive:!1}),this.update()}}export{Zi as B,$t as C,Z1 as E,j1 as L,so as O,K1 as P,ne as S,Q1 as T,J as V,Kw as W,v_ as a,bi as b,ji as c,J1 as d,ni as e,tT as f,G0 as g};
