"use strict";(self["webpackChunkdormitory"]=self["webpackChunkdormitory"]||[]).push([[439],{439:function(e,t,a){a.r(t),a.d(t,{default:function(){return f}});var n=a(3396);const o={class:"table"};function c(e,t,a,c,d,s){const i=(0,n.up)("a-switch"),l=(0,n.up)("a-table");return(0,n.wg)(),(0,n.iD)("div",o,[(0,n.Wm)(l,{style:{"min-width":"1000px"},columns:e.columns,"data-source":e.dataSource,bordered:""},{bodyCell:(0,n.w5)((({column:t,record:a})=>["status"===t.dataIndex?((0,n.wg)(),(0,n.j4)(i,{key:0,onClick:e.showConfirm,checked:a.status,"onUpdate:checked":e=>a.status=e,"checked-children":"开","un-checked-children":"关"},null,8,["onClick","checked","onUpdate:checked"])):(0,n.kq)("",!0)])),_:1},8,["columns","data-source"])])}a(7658);var d=a(6468),s=a(2574),i=a(3495),l=a(4870),r=a(252),u=a(4311),h=a(65),m=(0,n.aZ)({name:"AdminInfo",setup(){const e=(0,h.oR)(),t=[{title:"编号",width:15,dataIndex:"id"},{title:"名字",width:25,dataIndex:"name"},{title:"电话",dataIndex:"phone",width:30},{title:"账号",dataIndex:"account",width:15},{title:"角色",dataIndex:"type",width:15},{title:"状态",dataIndex:"status",key:"status",width:15}],a=(0,l.iH)([]),o=(0,l.iH)([]),c=()=>{var t=new URLSearchParams;t.append("op","getAllManager"),u.Z.post(e.state.path+"/info.action",t).then((e=>{if(1==e.data.code){o.value=e.data.data;for(const[e,t]of Object.entries(o.value))console.log(e),a.value.push(t);r.ZP.success("获取管理员信息成功")}else r.ZP.error("获取管理员信息失败")})).catch((function(e){console.log(e)}))},m=(0,l.qj)({}),p=e=>{m[e]=(0,d.Z)(a.value.filter((t=>e===t.id))[0])},w=e=>{delete m[e]},f=()=>{i.Z.confirm({title:"Do you want to delete these items?",icon:(0,n.Wm)(s.Z),content:"When clicked the OK button, this dialog will be closed after 1 second",async onOk(){try{return new Promise(((e,t)=>{setTimeout(Math.random()>.5?e:t,1e3)}))}catch(e){return console.log("Oops errors!")}},onCancel(){}})};return(0,n.bv)((()=>{c()})),{dataSource:a,columns:t,editingKey:"",editableData:m,edit:p,cancel:w,showConfirm:f}}}),p=a(89);const w=(0,p.Z)(m,[["render",c],["__scopeId","data-v-2d63f79c"]]);var f=w}}]);
//# sourceMappingURL=439.ba607af9.js.map