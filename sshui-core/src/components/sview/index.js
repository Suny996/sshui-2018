import Customise from './Customise.vue'
import Select from './Select.vue'
import Operator from './Operator.vue'
import Cascader from './Cascader.vue'
import FormItem from './FormItem.vue'

// 这里是重点
const sview = {
  install: function(Vue){
    Vue.component('sCustomise',Customise)
    Vue.component('sSelect',Select)
    Vue.component('sOperator',Operator)
    Vue.component('sCascader',Cascader)
    Vue.component('sFormItem',FormItem)
  }
}

// 导出组件
export default sview
