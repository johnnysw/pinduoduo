import Vue from 'vue'
import App from './App'

import Json from './Json'

const json = type=>{
	//模拟异步请求数据
	return new Promise(resolve=>{
		setTimeout(()=>{
			resolve(Json[type]);
		}, 500)
	})
}
Vue.config.productionTip = false
Vue.prototype.$api = {json};

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
