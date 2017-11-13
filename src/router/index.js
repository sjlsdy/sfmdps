import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'

import login from '../page/login'

import main from '../page/main'

import lssuesList from '../page/issuesList'
import addIssues from '../page/addIssues'

Vue.use(Router)

export default new Router({
	routes: [{
			path: '/login',
			name: 'login',
			component: login
		},
		{
			path: '/main',
			name: 'main',
			component: main,
			children: [{
				path: 'issuesList',
				name: 'lssuesList',
				component: lssuesList
			}]
		},
		/*
		{
			path: '/main',
			name: 'main',
			component: HelloWorld,
			children: [{
				path: '/addIssues',
				name: 'addIssues',
				component: HelloWorld
			}]
		}
		*/
	]
})