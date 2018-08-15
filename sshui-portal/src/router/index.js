import Vue from 'vue'
import Router from 'vue-router'
import main from '../views/main'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'main',
      component: main,
      redirect: "/coderList",
      children: [{
        path: '/coderList',
        name: 'CoderList',
        component: () => import('sshui-toolkit/src/views/toolkit/coder/CoderList')
      }]
    }
  ]
})
