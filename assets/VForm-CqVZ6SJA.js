import{m as p,p as b,bZ as v,h as F,x as V,b8 as h,b_ as y,N as R,d as P}from"./index-BJ5mKrdB.js";const k=b({...R(),...y()},"VForm"),C=p()({name:"VForm",props:k(),emits:{"update:modelValue":o=>!0,submit:o=>!0},setup(o,i){let{slots:n,emit:f}=i;const r=v(o),s=F();function l(t){t.preventDefault(),r.reset()}function u(t){const a=t,e=r.validate();a.then=e.then.bind(e),a.catch=e.catch.bind(e),a.finally=e.finally.bind(e),f("submit",a),a.defaultPrevented||e.then(c=>{var m;let{valid:d}=c;d&&((m=s.value)==null||m.submit())}),a.preventDefault()}return V(()=>{var t;return P("form",{ref:s,class:["v-form",o.class],style:o.style,novalidate:!0,onReset:l,onSubmit:u},[(t=n.default)==null?void 0:t.call(n,r)])}),h(r,s)}});export{C as V};
