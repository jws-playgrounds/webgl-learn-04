import{g as o,S as w,O as A,E as W,L as b,a as f,T as D,B as I,b as u,c as E,P as F,V as T,d as U,W as z,C as M,e as k,f as H}from"./chunks/vendor.js";o.registerPlugin(w);A.plugin(W);class _{scroller;constructor(){this.scroller=new b,this.setupLenis(),document.querySelectorAll(".js-scroll").forEach(e=>{A(e,{scrollbars:{clickScroll:!0}})})}getLenis(){return this.scroller}setupLenis(){this.scroller.on("scroll",w.update),o.ticker.add(e=>{this.scroller.raf(e*1e3)}),o.ticker.lagSmoothing(0)}stopLenis(e){this.scroller.stop()}startLenis(e){this.scroller.start()}}new f;const B=(i,e,r,t)=>{new Image;const a=document.createElement("canvas"),l=a.getContext("2d"),n=e,s=r;a.width=n,a.height=s,l.drawImage(i,0,0);const c=l.getImageData(0,0,n,s).data,p=[],v=[],g=[];for(let h=0;h<s;h+=t)for(let d=0;d<n;d+=t){const m=(h*n+d)*4,x=c[m]/255,C=c[m+1]/255,S=c[m+2]/255,R=c[m+3]/255,y=d-n/2,P=-(h-s/2),L=Math.random()*300;p.push(y,P,L),v.push(x,C,S),g.push(R)}return{position:p,color:v,alpha:g}},j="/playgrounds/webgl-learn-4/assets/css/main.png";var N=`precision mediump float;

varying vec3 vColor;
varying float vAlpla;
varying vec2 vUv;

uniform sampler2D uTex;

void main() {
  
  
  
  
  

  

  

  vec2 texcoord = vec2(0.5, 0.5);

  vec4 textureColor = texture2D(uTex, texcoord);
  vec4 color = vec4(vColor, vAlpla);

  

  
  
  

  gl_FragColor = vec4(vColor, vAlpla);

  
}`,O=`attribute float alpha;

uniform float uTime;
uniform float uRatio;

varying vec2 vUv;
varying vec3 vColor;
varying float vAlpla;

void main() {
  float power = 100.0;
  vec3 vertexDirection = vec3(normalize(position.xy), position.z);
  vec3 finalPosition = position + vertexDirection * power * uRatio;

  gl_Position = projectionMatrix * modelViewMatrix * vec4(finalPosition, 1.0 );
  gl_PointSize = 6.0;

  vColor = color;
  vAlpla = alpha;
  vUv = uv;
}`;const V="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADgAAAA4CAMAAACfWMssAAAA3lBMVEUAAAALCwsICAj19fXFxcX5+fns7Ozc3NzAwMBOTk45OTk1NTXp6em4uLg7OzsvLy8UFBTw8PDg4ODU1NSWlpYtLS0QEBD29vbLy8sdHR3j4+PY2NjR0dGxsbGcnJyLi4tWVlZSUlLOzs7Hx8etra15eXlhYWEXFxfCwsKioqKfn5+Tk5OPj498fHx2dnZxcXFlZWW9vb2vr68xMTErKyvy8vKpqamYmJh0dHRra2tFRUUgICC6urq1tbVoaGjn5+enp6daWlpCQkImJibl5eV1dXWEhISDg4NcXFxJSUluoXHUAAACtElEQVRIx+1U2XaiQBRs7KbZURZF2VHEBUHc9yUxmST//0PDIWceclh08jZzUm9QFH1v37oFfvA/Y7Bk94znMXux2ak9rGrVP4Lt20TdbNTJrzhhFo2HZMTC3TqjuUCjXg/RgjWaxC7Xuq87MNPQp7vURYIpJJ7q0nM1Zm73dPXAWQ8VHkqyOZzNkKlLkDeQ7yRctY7bqYJ5gfp8yoIM7NZ60XjlaE/FSt10TBsSXtezp1rt86WPV9Rw9FqhrO/GQwoaAQCdFpHKUinR6ABwpjQZjaal1R4Claa0NgGaxJfpNMGgTcrITm4lc2AcwYDt9OBcJQC0NWo28YoHupiuTclogWWeaoIGBRW/zxb6xQ2HFxx8npc/M8E82rwPiritr8B1+vNCNIFPGla/6H4+HJrXm4Ao8S9gLxiFXp4eBKMutEAHFCMlBNK8ng85YrmdU9IWlC1CSvShfIoWOYJ9E3iZLasUpISo45nznCP2E1oyASjd2pRQVihkcgQTIjisFiKtbbu5D7xNDwpZpaW1Hsnu+In4hnBWKGTUB0v93uWo+csRfwm8Xj2OF0w7+7wBYouSXu8YQIi4vOWS+5ZT1rtDvgdmkpp8AVplJhd5jFSvoJVFPDc0v3ytLJI6RWxRE66KeJyULfJZwj07KOyEi31lVRUdViQWt8E4R0orCytSpkN3AApxS+yhTBbGY5fUe+PdsjzIR0jWskBufA3kVHeNK6JcfB0hCmKfywZEEJkB2bkE5d61/1wDFcqpPVN48uX0J0LZvsCTWKHHcaqrApdM5sjAJNRN+nikTR2SmOpZ4U6sgWrcvP7GQqaMVxpJaissK+hkR+4S3EWDfe+H19MMtbvdNqKFtRoF4gA8ggHnnSNHtcdjW3Wincd2wKMgDotnxn16cpk9dyDAXyIbxw/+DfwGm0FI5v/o9OkAAAAASUVORK5CYII=";new f;class X{constructor(e){this.stage=e,this.promiseList=[],this.pathList=[j],this.imageList=[]}init(){this.pathList.forEach(e=>{this.promiseList.push(new Promise(r=>{const t=new Image;t.src=e,t.crossOrigin="anonymous",t.addEventListener("load",()=>{this.imageList.push(B(t,t.width,t.height,4)),r()})}))}),Promise.all(this.promiseList).then(()=>{this._setMesh(),this._setAutoPlay()})}_setMesh(){const r=new D().load(V),t=new I,a=new u(new Float32Array(this.imageList[0].position),3),l=new u(new Float32Array(this.imageList[0].color),3),n=new u(new Float32Array(this.imageList[0].alpha),1);t.setAttribute("position",a),t.setAttribute("color",l),t.setAttribute("alpha",n);const s=new E({vertexShader:O,fragmentShader:N,transparent:!0,vertexColors:!0,uniforms:{uTime:{value:0},uRatio:{value:0},uTex:{value:r}}});console.log("particleTexture :>> ",r),this.mesh=new F(t,s),this.stage.scene.add(this.mesh)}_setDiffusion(){o.to(this.mesh.material.uniforms.uRatio,{value:.1,duration:2,ease:"expo.out",repeat:1,yoyo:!0})}_setAutoPlay(){this._setDiffusion(),o.to({},{ease:"none",duration:4.2,repeat:-1,onRepeat:()=>{this._setDiffusion()}})}_render(){}onResize(){}onRaf(){this._render()}}class J{constructor(){this.renderParam={clearColor:0,width:window.innerWidth,height:window.innerHeight},this.cameraParam={fov:45,near:.1,far:3e3,lookAt:new T(0,0,0),x:0,y:0,z:2500},this.scene=null,this.camera=null,this.renderer=null,this.isInitialized=!1,this.orbitcontrols=null,this.isDev=!1}init(){this._setScene(),this._setRender(),this._setCamera(),this._setDev()}_setScene(){this.scene=new U}_setRender(){this.renderer=new z,this.renderer.setPixelRatio(window.devicePixelRatio),this.renderer.setClearColor(new M(this.renderParam.clearColor)),this.renderer.setSize(this.renderParam.width,this.renderParam.height),document.querySelector("#webgl").appendChild(this.renderer.domElement)}_setCamera(){this.isInitialized||(this.camera=new k(0,0,this.cameraParam.near,this.cameraParam.far),this.camera.position.set(this.cameraParam.x,this.cameraParam.y,this.cameraParam.z),this.camera.lookAt(this.cameraParam.lookAt),this.isInitialized=!0);const e=window.innerWidth,r=window.innerHeight;this.camera.aspect=e/r,this.camera.fov=this.cameraParam.fov,this.camera.updateProjectionMatrix(),this.renderer.setSize(e,r)}_setDev(){this.orbitcontrols=new H(this.camera,this.renderer.domElement),this.orbitcontrols.enableDamping=!0,this.isDev=!0}_render(){this.renderer.render(this.scene,this.camera),this.isDev&&this.orbitcontrols.update()}onResize(){this._setCamera()}onRaf(){this._render()}}class K{constructor(){const e=new J;e.init();const r=new X(e);r.init(),window.addEventListener("resize",()=>{e.onResize(),r.onResize()});const t=()=>{window.requestAnimationFrame(()=>{t(),e.onRaf(),r.onRaf()})};t()}}document.addEventListener("DOMContentLoaded",async()=>{new _,await Z()});const Z=async()=>{new K};
