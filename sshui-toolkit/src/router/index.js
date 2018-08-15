import Vue from 'vue'
import Router from 'vue-router'
//import HelloWorld from '@/components/HelloWorld'
import main from '../views/toolkit/main'
import CoderManage from '../views/toolkit/coder/CoderManage'
Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [{
    path: '/',
    name: 'main',
    component: main,
    redirect: "/coderManage",
    children: [{
      path: '/coderManage',
      name: 'CoderManage',
      component: CoderManage
    }]
  }
  ]
})
