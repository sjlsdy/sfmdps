import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'

import lssuesList from '../page/issuesList'
import addIssues from '../page/addIssues'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'issuesList',
      component: lssuesList
    },
    {
      path: '/addIssues',
      name: 'addIssues',
      component: addIssues
    }
  ]
})
