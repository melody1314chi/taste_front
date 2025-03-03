import{u as j,W,av as Y,h as m,c as T,a4 as Z,b as G,d as l,w as o,aw as H,F as J,f as K,o as U,S as Q,T as n,Z as w,_ as p,g as X,R as _,a3 as ee,ai as ae,Y as te,ar as P,ax as le,e as s,as as re,at as oe,ay as se,az as ue}from"./index-DpGVHu_m.js";import{c as ie,a as de,b as A,d as ne,u as pe,e as g}from"./index.esm-CI4TANjg.js";import{b as M}from"./route-block-B_A1xBdJ.js";import{V as ce}from"./VContainer-BkSpNhML.js";import{V as me}from"./VRow-z9MLI__U.js";import{V as B}from"./VCol-CkO_qeVS.js";import{V as ge}from"./VDivider-Cb5NaCeE.js";import{V as ve}from"./VDataTable-BZIsfnE1.js";import{V as Ve}from"./VToolbar-HWMcMJou.js";import{V as fe}from"./VForm-BDFDZXXs.js";import{V as ye}from"./VSelect-DJielZ9S.js";import{V as be}from"./VCheckbox-DVZVZHUe.js";import{V as ke}from"./VTextarea-CACNW-4i.js";import"./VChip-FT46GCHy.js";import"./VList-CQIbQClo.js";import"./VMenu-DkXZtqyI.js";const Ce={class:"text-center"},we={__name:"products",setup($e){const{t:r}=j(),{apiAuth:$}=Z(),v=W(),V=Y([]),S=m(""),I=T(()=>[{title:"ID",key:"_id",sortable:!0},{title:r("product.image"),key:"image",sortable:!1},{title:r("product.name"),key:"name",sortable:!0},{title:r("product.description"),key:"description",sortable:!0},{title:r("product.price"),key:"price",sortable:!0},{title:r("product.category"),key:"category",sortable:!0},{title:r("product.sell"),key:"sell",sortable:!0},{title:r("product.createdAt"),key:"createdAt",sortable:!0},{title:r("product.updatedAt"),key:"updatedAt",sortable:!0},{title:r("adminProduct.edit"),key:"edit",sortable:!1}]),h=async()=>{var a,t;try{const{data:d}=await $.get("/product/all");V.push(...d.result)}catch(d){console.log(d),v({text:r("api."+(((t=(a=d==null?void 0:d.response)==null?void 0:a.data)==null?void 0:t.message)||"unknownError")),snackbarProps:{color:"red"}})}};h();const i=m({open:!1,id:""}),x=a=>{a&&(i.value.id=a._id,f.value.value=a.name,y.value.value=a.price,b.value.value=a.description,k.value.value=a.category,C.value.value=a.sell),i.value.open=!0},q=()=>{E(),i.value.id="",i.value.open=!1,R.value.deleteFileRecord()},N=ie({name:A().required(r("api.productNameRequired")),price:ne().typeError(r("api.productPriceRequired")).required(r("api.productPriceRequired")).min(0,r("api.productPriceTooSmall")),description:A().required(r("api.productDescriptionRequired")),category:A().required(r("api.productCategoryRequired")).oneOf(["food","drink","music","game"],r("api.productCategoryInvalid")),sell:de().required(r("api.productSellRequired"))}),{handleSubmit:z,isSubmitting:F,resetForm:E}=pe({validationSchema:N,initialValues:{name:"",price:0,description:"",category:"",sell:!1}}),f=g("name"),y=g("price"),b=g("description"),k=g("category"),C=g("sell"),L=T(()=>[{text:r("productCategory.food"),value:"food"},{text:r("productCategory.drink"),value:"drink"},{text:r("productCategory.music"),value:"music"},{text:r("productCategory.game"),value:"game"}]),R=m(null),c=m([]),D=m([]),O=z(async a=>{var t,d,e;if(!((t=c.value[0])!=null&&t.error)){if(i.value.id.length===0&&c.value.length===0){v({text:r("api.productImageRequired"),snackbarProps:{color:"red"}});return}try{const u=new FormData;u.append("name",a.name),u.append("price",a.price),u.append("description",a.description),u.append("category",a.category),u.append("sell",a.sell),c.value.length>0&&u.append("image",c.value[0].file),i.value.id.length>0?await $.patch("/product/"+i.value.id,u):await $.post("/product",u),V.splice(0,V.length),h(),v({text:r(i.value.id.length>0?"adminProduct.editSuccess":"adminProduct.newSuccess"),snackbarProps:{color:"green"}}),q()}catch(u){console.log(u),v({text:r("api."+(((e=(d=u==null?void 0:u.response)==null?void 0:d.data)==null?void 0:e.message)||"unknownError")),snackbarProps:{color:"red"}})}}});return(a,t)=>{const d=K("VueFileAgent");return U(),G(J,null,[l(ce,null,{default:o(()=>[l(me,null,{default:o(()=>[l(B,{cols:"12"},{default:o(()=>[Q("h1",Ce,n(a.$t("nav.adminProducts")),1)]),_:1}),l(ge),l(B,{cols:"12"},{default:o(()=>[l(ve,{items:V,headers:I.value,search:S.value},{top:o(()=>[l(Ve,null,{default:o(()=>[l(w,{onClick:t[0]||(t[0]=e=>x(null))},{default:o(()=>[p(n(a.$t("adminProduct.new")),1)]),_:1}),l(te),l(P,{modelValue:S.value,"onUpdate:modelValue":t[1]||(t[1]=e=>S.value=e),"prepend-inner-icon":"mdi-magnify",variant:"underlined"},null,8,["modelValue"])]),_:1})]),"item.image":o(({value:e})=>[l(ae,{src:e,height:"50"},null,8,["src"])]),"item.sell":o(({value:e})=>[e?(U(),X(ee,{key:0,icon:"mdi-check"})):_("",!0)]),"item.createdAt":o(({value:e})=>[p(n(new Date(e).toLocaleString()),1)]),"item.updatedAt":o(({value:e})=>[p(n(new Date(e).toLocaleString()),1)]),"item.category":o(({value:e})=>[p(n(a.$t("productCategory."+e)),1)]),"item.edit":o(({item:e})=>[l(w,{icon:"mdi-pencil",variant:"text",onClick:u=>x(e)},null,8,["onClick"])]),_:2},1032,["items","headers","search"])]),_:1})]),_:1})]),_:1}),l(H,{modelValue:i.value.open,"onUpdate:modelValue":t[9]||(t[9]=e=>i.value.open=e),persistent:""},{default:o(()=>[l(fe,{disabled:s(F),onSubmit:le(s(O),["prevent"])},{default:o(()=>[l(re,null,{default:o(()=>[l(oe,null,{default:o(()=>[p(n(a.$t(i.value.id?"adminProduct.edit":"adminProduct.new")),1)]),_:1}),l(se,null,{default:o(()=>[l(P,{modelValue:s(f).value.value,"onUpdate:modelValue":t[2]||(t[2]=e=>s(f).value.value=e),label:a.$t("product.name"),"error-messages":s(f).errorMessage.value},null,8,["modelValue","label","error-messages"]),l(P,{modelValue:s(y).value.value,"onUpdate:modelValue":t[3]||(t[3]=e=>s(y).value.value=e),label:a.$t("product.price"),"error-messages":s(y).errorMessage.value,type:"number",min:"0"},null,8,["modelValue","label","error-messages"]),l(ye,{modelValue:s(k).value.value,"onUpdate:modelValue":t[4]||(t[4]=e=>s(k).value.value=e),"error-messages":s(k).errorMessage.value,items:L.value,label:a.$t("product.category"),"item-title":"text","item-value":"value"},null,8,["modelValue","error-messages","items","label"]),l(be,{modelValue:s(C).value.value,"onUpdate:modelValue":t[5]||(t[5]=e=>s(C).value.value=e),label:a.$t("product.onSell"),"error-messages":s(C).errorMessage.value},null,8,["modelValue","label","error-messages"]),l(ke,{modelValue:s(b).value.value,"onUpdate:modelValue":t[6]||(t[6]=e=>s(b).value.value=e),label:a.$t("product.description"),"error-messages":s(b).errorMessage.value},null,8,["modelValue","label","error-messages"]),l(d,{ref_key:"fileAgent",ref:R,modelValue:c.value,"onUpdate:modelValue":t[7]||(t[7]=e=>c.value=e),"raw-model-value":D.value,"onUpdate:rawModelValue":t[8]||(t[8]=e=>D.value=e),accept:"image/jpeg,image/png",deletable:"","max-size":"1MB","help-text":a.$t("fileAgent.helpText"),"error-text":{type:a.$t("fileAgent.errorType"),size:a.$t("fileAgent.errorSize")}},null,8,["modelValue","raw-model-value","help-text","error-text"])]),_:1}),l(ue,null,{default:o(()=>[l(w,{onClick:q},{default:o(()=>[p(n(a.$t("adminProduct.cancel")),1)]),_:1}),l(w,{type:"submit",loading:s(F)},{default:o(()=>[p(n(a.$t("adminProduct.submit")),1)]),_:1},8,["loading"])]),_:1})]),_:1})]),_:1},8,["disabled","onSubmit"])]),_:1},8,["modelValue"])],64)}}};typeof M=="function"&&M(we);export{we as default};
