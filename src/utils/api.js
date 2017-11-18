import axios from 'axios'
//import store from '../store'
import router from '../router'
import qs from 'qs'
import iView from 'iview'
import 'iview/dist/styles/iview.css'
const service = axios.create({
	timeout: 5000, // 请求超时时间
});
// http request 拦截器
service.interceptors.request.use(
	config => {
		if(config.method === 'post_urlencoded') {
			config.method = 'post';
			config.headers = {
					'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
				},
				config.data = qs.stringify(config.data);
		}
		const userInfo = JSON.parse(
			localStorage.getItem('userInfo')
		);
		config.headers.token = userInfo.token;
		return config;
	},
	err => {
		console.log(err)
		return promise.reject(err);
	}
);
// http response 拦截器
service.interceptors.response.use(
	response => {
		if(response.data.status) {
			switch(response.data.status) {
				case 99:
					// 返回 99 清除token信息并跳转到登录页面
					localStorage.removeItem('userInfo');
					router.replace({
						path: '/login',
						query: {
							redirect: router.currentRoute.fullPath
						}
					})
					// window.location.href = '/admin';
					break;

			}
		}
		return response;
	},
	error => {
		console.log(error)
		if(error.response) {
			iView.Message.warning('请求超时！')
			switch(error.response.data.status) {
				case 99:
					// 返回 99 清除token信息并跳转到登录页面
					localStorage.removeItem('userInfo');
					router.replace({
						path: '/login',
						query: {
							redirect: router.currentRoute.fullPath
						}
					})
			}
		}
		return Promise.reject(error.response.data);
	}
)

export default service