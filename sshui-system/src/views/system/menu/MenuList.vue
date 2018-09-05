<template>
  <div width="100%">
    <TreeGrid :items="data" :columns="columns" @on-row-click='rowClick'></TreeGrid>
  </div>
</template>

<script>
  import TreeGrid from '@/components/treegrid/treeGrid2.0'

  export default {
    name: "MenuList",
    data() {
      return {
        columns: [ {
          title: '编码',
          key: 'menuCode',
          sortable: true,
          //width: '150',
        }, {
          title: '名称',
          key: 'menuName',
         // width: '150',
        } , {
          title: '链接',
          key: 'menuUrl',
          // width: '150',
        } ,{
          title:'操作',
          type: 'action',
          actions: [{
            //type: 'primary',
            icon:'ios-add-circle',
            shape:'circle',
            name:'add',
            text: '添加'
          }, {
            type: 'dashed',
            icon:'ios-remove-circle',
            shape:'circle',
            name:'del',
            text: '删除'
          }],
          width: '50',
        }],
      }
    },
    props: {
      data: {
        type: Array
      }
    },
    components:{TreeGrid},
    methods: {
      changePage: function (currPage) {
        this.$PageUtil.change(this, {currPage: currPage});
      },
      changePageSize: function (pageSize) {
        this.$PageUtil.change(this, {pageSize: pageSize});
      },
      rowClick:function(data, event, index,name, text) {
        console.log('当前行数据:' + data)
        console.log('点击行号:' + index)
        console.log('点击事件:' + event)
        console.log('点击内容:' +name+ text)
        if(name==='add'){
          this.toAdd(data);
        }
      },
      toAdd:function(row){
        //alert(row.menuName)
        this.$emit("on-add", row);
      }
    }
  }
</script>

<style scoped>

</style>
