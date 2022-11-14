(this["webpackJsonpit-incubator-todolist-ts"]=this["webpackJsonpit-incubator-todolist-ts"]||[]).push([[0],{165:function(t,e,a){t.exports=a(204)},170:function(t,e,a){},171:function(t,e,a){},204:function(t,e,a){"use strict";a.r(e);var n=a(0),o=a.n(n),i=a(22),r=a.n(i);a(170),Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));a(171);var c,l,s=a(289),u=a(310),d=a(290),m=a(291),f=a(292),b=a(278),E=a(294),O=a(281),T=a(295),g=a(296),p=a(293),h=a(87),v=h.b,j=h.c,k=a(21),I=a(19),S=a(135),C=a.n(S).a.create(Object(k.a)({baseURL:"https://social-network.samuraijs.com/api/1.1/"},{withCredentials:!0,headers:{"API-KEY":"f6e09271-9951-4ca7-8fbf-c73bc4098a4f"}})),y=function(){return C.get("todo-lists")},D=function(t){return C.post("todo-lists",{title:t})},A=function(t){return C.delete("todo-lists/".concat(t))},w=function(t,e){return C.put("todo-lists/".concat(t),{title:e})},L=function(t){return C.get("todo-lists/".concat(t,"/tasks"))},P=function(t,e){return C.post("todo-lists/".concat(t,"/tasks"),{title:e})},N=function(t,e,a){return C.put("/todo-lists/".concat(t,"/tasks/").concat(e),a)},R=function(t,e){return C.delete("todo-lists/".concat(t,"/tasks/").concat(e))},F=function(t){return C.post("auth/login",t)},G=function(){return C.delete("auth/login")},x=function(){return C.get("auth/me")};!function(t){t[t.New=0]="New",t[t.InProgress=1]="InProgress",t[t.Completed=2]="Completed",t[t.Draft=3]="Draft"}(c||(c={})),function(t){t[t.Low=0]="Low",t[t.Middle=1]="Middle",t[t.Hi=2]="Hi",t[t.Urgently=3]="Urgently",t[t.Later=4]="Later"}(l||(l={}));var K=function(t,e){t.messages.length?e(B(t.messages[0])):e(B("Some error occurred")),e(Z("failed"))},M=function(t,e){e(B(t.message?t.message:"Some error occurred")),e(Z("failed"))},U={isLoggedIn:!1},H=function(t){return{type:"login/SET-IS-LOGGED-IN",value:t}},V={status:"idle",error:null,isInitialized:!1},B=function(t){return{type:"APP/SET-ERROR",error:t}},Z=function(t){return{type:"APP/SET-STATUS",status:t}},q=[],z=a(5),Y={},J=function(t,e,a){return function(n,o){var i=o().tasks[a].find((function(e){return e.id===t}));if(!i)throw new Error("task not found in the state");var r=Object(k.a)({deadline:i.deadline,description:i.description,priority:i.priority,startDate:i.startDate,title:i.title,status:i.status},e);N(a,t,r).then((function(o){0===o.data.resultCode?n(function(t,e,a){return{type:"UPDATE-TASK",taskId:t,model:e,todolistId:a}}(t,e,a)):K(o.data,n)})).catch((function(t){M(t,n)}))}},W=a(282),$=a(205),_=a(11),Q=a(298),X=a(279),tt=o.a.memo((function(t){var e=t.addItem,a=t.disabled,i=void 0!==a&&a;console.log("Additem is called");var r=Object(n.useState)(""),c=Object(_.a)(r,2),l=c[0],s=c[1],u=Object(n.useState)(null),d=Object(_.a)(u,2),m=d[0],f=d[1],E=function(){""!==l.trim()?(e(l.trim()),s("")):f("Title is required")};return o.a.createElement("div",null,o.a.createElement(Q.a,{disabled:i,label:"Type value",variant:"outlined",value:l,onChange:function(t){s(t.currentTarget.value)},onKeyPress:function(t){null!==m&&f(null),13===t.charCode&&(E(),s(""))},error:!!m,helperText:m}),o.a.createElement(b.a,{onClick:E,color:"primary",disabled:i},o.a.createElement(X.a,null)))})),et=a(146),at=o.a.memo((function(t){console.log("EditableSpan");var e=Object(n.useState)(""),a=Object(_.a)(e,2),i=a[0],r=a[1],c=Object(n.useState)(!1),l=Object(_.a)(c,2),s=l[0],u=l[1];return s?o.a.createElement(Q.a,{onBlur:function(){u(!1),t.onChange(i)},onChange:function(t){return r(t.currentTarget.value)},value:i,autoFocus:!0}):o.a.createElement("span",{onDoubleClick:function(){u(!0),r(t.title)}},t.title)})),nt=a(280),ot=a(302),it=o.a.memo((function(t){var e=Object(n.useCallback)((function(){return t.removeTask(t.task.id,t.todolistID)}),[t.task.id,t.todolistID]),a=Object(n.useCallback)((function(e){var a=e.currentTarget.checked;t.changeTaskStatus(t.task.id,a?c.Completed:c.New,t.todolistID)}),[t.task.id,t.todolistID]),i=Object(n.useCallback)((function(e){t.changeTaskTitle(t.task.id,e,t.todolistID)}),[t.task.id,t.todolistID]);return o.a.createElement("div",{key:t.task.id,className:t.task.status===c.Completed?"is-done":""},o.a.createElement(ot.a,{onChange:a,checked:t.task.status===c.Completed}),o.a.createElement(at,{title:t.task.title,onChange:i}),o.a.createElement(b.a,{onClick:e},o.a.createElement(nt.a,null)))})),rt=["demo"],ct=o.a.memo((function(t){var e=t.demo,a=void 0!==e&&e,i=Object(et.a)(t,rt);console.log("Todolist called");var r=v();Object(n.useEffect)((function(){var t;a||r((t=i.todolist.id,function(e){e(Z("loading")),L(t).then((function(a){e(function(t,e){return{type:"SET-TASK",todolistId:t,tasks:e}}(t,a.data.items)),e(Z("succeeded"))}))}))}),[]);var l=Object(n.useCallback)((function(){return i.changeFilter("all",i.todolist.id)}),[i.changeFilter,i.todolist.id]),s=Object(n.useCallback)((function(){return i.changeFilter("active",i.todolist.id)}),[i.changeFilter,i.todolist.id]),u=Object(n.useCallback)((function(){return i.changeFilter("completed",i.todolist.id)}),[i.changeFilter,i.todolist.id]),d=Object(n.useCallback)((function(t){i.changeTodolistTitle(i.todolist.id,t)}),[i.todolist.id,i.changeTodolistTitle]),m=Object(n.useCallback)((function(t){i.addTask(t,i.todolist.id)}),[i.addTask,i.todolist.id]),f=i.tasks;return"completed"===i.todolist.filter&&(f=i.tasks.filter((function(t){return t.status===c.New}))),"active"===i.todolist.filter&&(f=i.tasks.filter((function(t){return t.status===c.Completed}))),o.a.createElement("div",null,o.a.createElement("h3",null,o.a.createElement(at,{title:i.todolist.title,onChange:d}),o.a.createElement(b.a,{onClick:function(){i.removeTodolist(i.todolist.id)},disabled:"loading"===i.todolist.entityStatus},o.a.createElement(nt.a,null))),o.a.createElement(tt,{addItem:m,disabled:"loading"===i.todolist.entityStatus}),o.a.createElement("div",null,f.map((function(t){return o.a.createElement(it,{todolistID:i.todolist.id,task:t,changeTaskStatus:i.changeTaskStatus,changeTaskTitle:i.changeTaskTitle,removeTask:i.removeTask,key:t.id})}))),o.a.createElement("div",null,o.a.createElement(O.a,{variant:"all"===i.todolist.filter?"contained":"text",onClick:l},"All"),o.a.createElement(O.a,{color:"primary",variant:"active"===i.todolist.filter?"contained":"text",onClick:s},"Active"),o.a.createElement(O.a,{color:"secondary",variant:"completed"===i.todolist.filter?"contained":"text",onClick:u},"Completed")))})),lt=a(13),st=function(t){var e=t.demo,a=void 0!==e&&e,i=j((function(t){return t.todolists})),r=j((function(t){return t.tasks})),c=j((function(t){return t.auth.isLoggedIn})),l=v();Object(n.useEffect)((function(){!a&&c&&l((function(t){t(Z("loading")),y().then((function(e){t({type:"SET-TODOLISTS",todolists:e.data}),t(Z("succeeded"))})).catch((function(e){M(e,t)}))}))}),[]);var s=Object(n.useCallback)((function(t,e){l(function(t,e){return function(a){R(t,e).then((function(){var n=function(t,e){return{type:"REMOVE-TASK",taskId:t,todolistId:e}}(e,t);a(n)}))}}(e,t))}),[l]),u=Object(n.useCallback)((function(t,e){var a=function(t,e){return function(a){a(Z("loading")),P(e,t).then((function(t){0===t.data.resultCode?(a({type:"ADD-TASK",task:t.data.data.item}),a(Z("succeeded"))):K(t.data,a)})).catch((function(t){M(t,a)}))}}(t,e);l(a)}),[l]),d=Object(n.useCallback)((function(t,e,a){l(J(t,{status:e},a))}),[l]),m=Object(n.useCallback)((function(t,e,a){l(J(t,{title:e},a))}),[l]),f=Object(n.useCallback)((function(t,e){l({type:"CHANGE-TODOLIST-FILTER",filter:t,id:e})}),[l]),b=Object(n.useCallback)((function(t){l(function(t){return function(e){e(Z("loading")),e({type:"CHANGE-TODOLIST-ENTITY-STATUS",status:"loading",id:t}),A(t).then((function(){e(function(t){return{type:"REMOVE-TODOLIST",id:t}}(t)),e(Z("succeeded"))}))}}(t))}),[l]),E=Object(n.useCallback)((function(t,e){var a,n;l((a=t,n=e,function(t){w(a,n).then((function(){t(function(t,e){return{type:"CHANGE-TODOLIST-TITLE",title:e,id:t}}(a,n))}))}))}),[l]),O=Object(n.useCallback)((function(t){l(function(t){return function(e){e(Z("loading")),D(t).then((function(t){e({type:"ADD-TODOLIST",todolist:t.data.data.item}),e(Z("succeeded"))}))}}(t))}),[l]);return c?o.a.createElement(o.a.Fragment,null,o.a.createElement(W.a,{container:!0,style:{padding:"20px"},justifyContent:"center"},o.a.createElement(tt,{addItem:O})),o.a.createElement(W.a,{container:!0,spacing:3,justifyContent:"center"},i.map((function(t){var e=r[t.id];return o.a.createElement(W.a,{item:!0,key:t.id},o.a.createElement($.a,{style:{padding:"10px"}},o.a.createElement(ct,{todolist:t,removeTodolist:b,key:t.id,tasks:e,removeTask:s,changeFilter:f,addTask:u,changeTaskStatus:d,changeTaskTitle:m,changeTodolistTitle:E,demo:a})))})))):o.a.createElement(lt.a,{to:"/login"})},ut=a(303),dt=a(300),mt=o.a.forwardRef((function(t,e){return o.a.createElement(dt.a,Object.assign({elevation:6,ref:e,variant:"filled"},t))}));function ft(){var t=j((function(t){return t.app.error})),e=v(),a=function(t,a){"clickaway"!==a&&e(B(null))},n=null!==t;return o.a.createElement(ut.a,{open:n,autoHideDuration:6e3,onClose:a},o.a.createElement(mt,{onClose:a,severity:"error",sx:{width:"100%"}},t," \ud83d\ude20"))}var bt=a(92),Et=a(307),Ot=a(301),Tt=a(304),gt=a(305),pt=a(309),ht=a(287),vt=a(297),jt=a(308),kt=a(145),It=function(){var t=v(),e=j((function(t){return t.auth.isLoggedIn})),a=Object(kt.a)({initialValues:{email:"",password:"",rememberMe:!1},validate:function(t){var e={};return t.email?/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(t.email)||(e.email="Invalid email address"):e.email="Required",t.password?t.password.length<=2?{password:"Password length should be 2 or more"}:e:{password:"Password is required"}},onSubmit:function(e){var a;t((a=e,function(t){t(Z("loading")),F(a).then((function(e){0===e.data.resultCode?(t(H(!0)),t(Z("succeeded"))):K(e.data,t)})).catch((function(e){M(e,t)}))}))}});return e?o.a.createElement(lt.a,{to:"/"}):o.a.createElement(Et.a,{container:!0,justifyContent:"center"},o.a.createElement(Et.a,{item:!0,justifyContent:"center"},o.a.createElement("form",{onSubmit:a.handleSubmit},o.a.createElement(Tt.a,null,o.a.createElement(ht.a,null,o.a.createElement("p",null,"Email: free@samuraijs.com"),o.a.createElement("p",null,"Password: free")),o.a.createElement(pt.a,null,o.a.createElement(vt.a,Object.assign({label:"Email",margin:"normal"},a.getFieldProps("email"))),a.errors.email?o.a.createElement("div",null,a.errors.email):null,o.a.createElement(vt.a,Object.assign({type:"password",label:"Password",margin:"normal"},a.getFieldProps("password"))),a.errors.password?o.a.createElement("div",null,a.errors.password):null,o.a.createElement(gt.a,{label:"Remember me",control:o.a.createElement(Ot.a,Object.assign({},a.getFieldProps("rememberMe"),{checked:a.values.rememberMe}))}),o.a.createElement(jt.a,{type:"submit",variant:"contained",color:"primary"},"Login"))))))},St=Object(s.a)((function(t){return Object(u.a)({root:{flexGrow:1},menuButton:{marginRight:t.spacing(2)},title:{flexGrow:1}})}));var Ct=function(t){var e=t.demo,a=void 0!==e&&e,i=St(),r=v(),c=j((function(t){return t.app.status})),l=j((function(t){return t.app.isInitialized})),s=j((function(t){return t.auth.isLoggedIn}));Object(n.useEffect)((function(){r((function(t){x().then((function(e){0===e.data.resultCode&&t(H(!0)),t({type:"APP/SET-IS-INITIALIZED",value:!0})}))}))}),[]);var u=Object(n.useCallback)((function(){r((function(t){t(Z("loading")),G().then((function(e){0===e.data.resultCode?(t(H(!1)),t(Z("succeeded"))):K(e.data,t)})).catch((function(e){M(e,t)}))}))}),[]);return l?o.a.createElement(bt.a,null,o.a.createElement("div",{className:"App"},o.a.createElement(ft,null),o.a.createElement(m.a,{position:"static"},o.a.createElement(f.a,null,o.a.createElement(b.a,{edge:"start",color:"inherit","aria-label":"menu",className:i.menuButton},o.a.createElement(p.a,null)),o.a.createElement(E.a,{variant:"h6",className:i.title},"Todolists"),s&&o.a.createElement(O.a,{color:"inherit",onClick:u},"Log out")),"loading"===c&&o.a.createElement(T.a,null)),o.a.createElement(g.a,{fixed:!0},o.a.createElement(lt.d,null,o.a.createElement(lt.b,{path:"/",element:o.a.createElement(st,{demo:a})}),o.a.createElement(lt.b,{path:"/login",element:o.a.createElement(It,null)}),o.a.createElement(lt.b,{path:"*",element:o.a.createElement("h1",null,"404: PAGE NOT FOUND")}))))):o.a.createElement("div",{style:{textAlign:"center",marginTop:"20%"}},o.a.createElement(d.a,null))},yt=a(104),Dt=a(144),At=Object(yt.b)({todolists:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:q,e=arguments.length>1?arguments[1]:void 0;switch(e.type){case"REMOVE-TODOLIST":return t.filter((function(t){return t.id!==e.id}));case"ADD-TODOLIST":return[Object(k.a)(Object(k.a)({},e.todolist),{},{filter:"all",entityStatus:"idle"})].concat(Object(I.a)(t));case"CHANGE-TODOLIST-TITLE":return t.map((function(t){return t.id===e.id?Object(k.a)(Object(k.a)({},t),{},{title:e.title}):t}));case"CHANGE-TODOLIST-FILTER":return t.map((function(t){return t.id===e.id?Object(k.a)(Object(k.a)({},t),{},{filter:e.filter}):t}));case"CHANGE-TODOLIST-ENTITY-STATUS":return t.map((function(t){return t.id===e.id?Object(k.a)(Object(k.a)({},t),{},{entityStatus:e.status}):t}));case"SET-TODOLISTS":return e.todolists.map((function(t){return Object(k.a)(Object(k.a)({},t),{},{filter:"all",entityStatus:"idle"})}));default:return t}},tasks:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:Y,e=arguments.length>1?arguments[1]:void 0;switch(e.type){case"REMOVE-TASK":return Object(k.a)(Object(k.a)({},t),{},Object(z.a)({},e.todolistId,t[e.todolistId].filter((function(t){return t.id!==e.taskId}))));case"ADD-TASK":return Object(k.a)(Object(k.a)({},t),{},Object(z.a)({},e.task.todoListId,[e.task].concat(Object(I.a)(t[e.task.todoListId]))));case"UPDATE-TASK":return Object(k.a)(Object(k.a)({},t),{},Object(z.a)({},e.todolistId,t[e.todolistId].map((function(t){return t.id===e.taskId?Object(k.a)(Object(k.a)({},t),e.model):t}))));case"ADD-TODOLIST":return Object(k.a)(Object(k.a)({},t),{},Object(z.a)({},e.todolist.id,[]));case"REMOVE-TODOLIST":var a=Object(k.a)({},t);return delete a[e.id],a;case"SET-TODOLISTS":var n=Object(k.a)({},t);return e.todolists.forEach((function(t){n[t.id]=[]})),n;case"SET-TASK":return Object(k.a)(Object(k.a)({},t),{},Object(z.a)({},e.todolistId,e.tasks));default:return t}},app:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:V,e=arguments.length>1?arguments[1]:void 0;switch(e.type){case"APP/SET-STATUS":return Object(k.a)(Object(k.a)({},t),{},{status:e.status});case"APP/SET-ERROR":return Object(k.a)(Object(k.a)({},t),{},{error:e.error});case"APP/SET-IS-INITIALIZED":return Object(k.a)(Object(k.a)({},t),{},{isInitialized:e.value});default:return Object(k.a)({},t)}},auth:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:U,e=arguments.length>1?arguments[1]:void 0;switch(e.type){case"login/SET-IS-LOGGED-IN":return Object(k.a)(Object(k.a)({},t),{},{isLoggedIn:e.value});default:return t}}}),wt=Object(yt.c)(At,Object(yt.a)(Dt.a));window.store=wt,r.a.render(o.a.createElement(h.a,{store:wt},o.a.createElement(Ct,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(t){t.unregister()})).catch((function(t){console.error(t.message)}))}},[[165,1,2]]]);
//# sourceMappingURL=main.a4ab72e0.chunk.js.map