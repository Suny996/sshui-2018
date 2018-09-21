import Customise from './Customise'
import Select from './Select'
import Operator from './Operator'
import Cascader from './Cascader'
import FormItem from './FormItem'
import TreeGrid from './TreeGrid'
//import TreeTabe from './TreeTable/index'
// 这里是重点
const sview = {
  install: function(Vue){
    Vue.component('sCustomise',Customise)
    Vue.component('sSelect',Select)
    Vue.component('sOperator',Operator)
    Vue.component('sCascader',Cascader)
    Vue.component('sFormItem',FormItem)
    Vue.component('sTreeGrid',TreeGrid)
    //Vue.component('sTreeTabe',TreeTabe)
  }
}

// 导出组件
export default sview
