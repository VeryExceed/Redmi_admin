import Vue from "vue"
import Router from "vue-router"

import routes from "./common/config/router.js"

//解决vue-router重复点击报错问题（this.$router.push()）
// const originalPush = Router.prototype.push;
// Router.prototype.push= function push(location) {
//   return originalPush.call(this, location).catch(err => err);
// };
Vue.use(Router)

export default new Router({
	routes
})