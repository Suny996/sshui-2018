import Vue from 'vue'
import Router from 'vue-router'
//import HelloWorld from '@/components/HelloWorld'
import main from '../views/system/main'
import MenuManage from '../views/system/menu/MenuManage'
import Test from '../components/Test'
Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [{
    path: '/',
    name: 'main',
    component: main,
    redirect: "/menuManage",
    children: [{
      path: '/menuManage',
      name: 'MenuManage',
      component: MenuManage
    },{
      path: '/test',
      name: 'Test',
      component: Test
    }]
  }
  ]
})
