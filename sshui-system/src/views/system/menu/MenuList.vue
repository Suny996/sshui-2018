<template>
  <div width="100%">
    <TreeGrid :items="data" :columns="columns"></TreeGrid>
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
            text: '添加'
          }, {
            type: 'warning',
            icon:'ios-remove-circle',
            shape:'circle',
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
      generate:function(row){
        //alert(JSON.stringify(row))
        this.$emit("on-generate",row);
      }
    }
  }
</script>

<style scoped>

</style>
