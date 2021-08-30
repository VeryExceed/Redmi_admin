import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import router from './router.js'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import store from './store'



// 引入拖拽排序
import VueDND from 'awe-dnd'
Vue.use(VueDND)
// 引入全局配置文件
import $conf from "./common/config/config.js"
Vue.prototype.$conf = $conf

Vue.config.productionTip = false
Vue.use(ElementUI);
import { 
	Message
} from 'element-ui'
// 添加请求拦截器
axios.interceptors.request.use((config)=>{
	// 添加header头的token
	let token = window.sessionStorage.getItem('token')
	if (config.token === true) {
		config.headers['token'] = token
	}
	// 在发送请求之前做些什么
	return config
},(error)=>{
	// 对请求错误做些什么
	return Promise.reject(error)
})

// 添加响应拦截器
axios.interceptors.response.use((response)=>{
	console.log('响应拦截器 成功');
	// 响应数据
	return response
},(err)=>{
	// 全局错误提示
	if (err.response && err.response.data && err.response.data.errorCode) {
		Message.error(err.response.data.msg)
	}
	// 响应错误
	return Promise.reject(err)
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
