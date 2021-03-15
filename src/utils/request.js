import Vue from 'vue'
import axios from 'axios'
import router from '../router/index'
//这里柚子引入的是element-ui中的提示框和加载框，用其他ui组件的要换一下
import {
	Toast
} from 'vant';
// 响应时间
axios.defaults.timeout = 30 * 1000
// 配置cookie
// axios.defaults.withCredentials = true
// 配置请求头
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'
axios.defaults.validateStatus = function validateStatus(status) {
	//=>自定义成功失败规则：RESOLVE / REJECT（默认规则：状态码以2开头算作成功）
	return status
};
// 静态资源
Vue.prototype.$static = ''
// 配置接口地址
//这里的接口地址是你地址的相同的前半部分，方便管理
// http://192.168.8.104:9080    刘
// http://192.168.8.106:9080    何
// 'http://111.6.78.120:9080/'
axios.defaults.baseURL = 'http://124.70.217.116:9001/'
var loadingInstance
// POST传参序列化(添加请求拦截器)
axios.interceptors.request.use(
	config => {
		
		loadingInstance = Toast.loading({
			message: '加载中...',
			forbidClick: true,
		});
		config.headers.createTime = 1
		config.headers.token = 2
		if (config.method === 'post') {
			config.data = config.data

		}
		return config
	},
	err => {
		loadingInstance.close()
		Toast.fail('请求错误')
		return Promise.reject(err)
	}
)


// http response 响应拦截器
axios.interceptors.response.use(
	response => {

		if (response.status) {

			// 			switch (response.data.code) {
			// 				case 401:
			// 					// 401 清除token信息并跳转到登录页面
			// 					store.commit(types.LOGOUT)
			// 					if (document.getElementsByClassName('el-message').length === 0) {
			// 						Message({
			// 							message: '抱歉，您的登录已过期，请重新登录。',
			// 							type: 'warning',
			// 							duration: 2000
			// 						});
			// 					}
			// 
			// 					setTimeout(function() {
			// 						// 只有在当前路由不是登录页面才跳转
			// 						router.currentRoute.path !== 'login' &&
			// 							router.replace({
			// 								path: 'login',
			// 								query: {
			// 									redirect: router.currentRoute.path
			// 								},
			// 							})
			// 					}, 2000)
			// 
			// 			}
			loadingInstance.close()
			return response
		}

	},
	error => {
		loadingInstance.close()
		Toast.fail('请求失败，请稍后再试')
		return Promise.reject(err)
	},
)
// 发送请求
export function post(url, params) {
	return new Promise((resolve, reject) => {
		axios
			.post(url, params)
			.then(
				res => {
					resolve(res.data)
				},
				err => {
					reject(err.data)
				}
			)
			.catch(err => {})
	})
}
export function get(url, params) {
	return new Promise((resolve, reject) => {
		axios
			.get(url, {
				params: params
			})
			.then(res => {
				resolve(res.data)
			})
			.catch(err => {

			})
	})
}
/**
 * put方法，对应put请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export function put(url, params) {

	return new Promise((resolve, reject) => {
		axios.put(url, params)

			.then(res => {
				resolve(res.data);
			})
			.catch(err => {

				reject(err.data)

			})
	});
}


export function deletefn(url, params) {
	return new Promise((resolve, reject) => {
		axios.delete(url, params)
			.then(res => {
				resolve(res.data);

			})
			.catch(err => {
				reject(err.data)
			})
	});
}
