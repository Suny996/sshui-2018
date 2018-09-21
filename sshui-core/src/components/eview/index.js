import {
  Dialog
}  from   'element-ui'
// 这里是重点
const eview = {
  install: function(Vue){
    Vue.component('eDialog',Dialog)
  }
}

// 导出组件
export default eview
