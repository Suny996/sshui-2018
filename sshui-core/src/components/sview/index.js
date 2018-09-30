import Customise from './Customise'
import Select from './Select'
import Operator from './Operator'
import Cascader from './Cascader'
import FormItem from './FormItem'
import TreeGrid from './TreeGrid'
import TreeTable from './tree-table/TreeTable'

// 这里是重点
const sview = {
  install: function(Vue){
    Vue.component('sCustomise',Customise)
    Vue.component('sSelect',Select)
    Vue.component('sOperator',Operator)
    Vue.component('sCascader',Cascader)
    Vue.component('sFormItem',FormItem)
    Vue.component('sTreeGrid',TreeGrid)
    Vue.component('sTreeTable',TreeTable)
  }
}

// 导出组件
export default sview
