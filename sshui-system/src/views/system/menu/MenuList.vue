<template>
    <div width="100%">
     <sTreeGrid :data="data" :columns="columns" @on-row-click='rowClick'></sTreeGrid>
        <!--  <iTree :data="data" show-checkbox :render="renderContent"></iTree>-->
   </div>
</template>

<script>
   //import TreeGrid from '@/components/treegrid/treeGrid2.0'

   export default {
       name: "MenuList",
       data() {
           return {
               columns: [{
                   title: '编码',
                   key: 'menuCode',
                   //sortable: true,
                   // width: '150px'
               }, {
                   title: '名称',
                   key: 'menuName',
                   //width: '150px'
               }, {
                   title: '链接',
                   key: 'menuUrl',
                   //width: '150px',
               }, {
                   title: '操作',
                   type: 'action',
                   actions: [{
                       //type: 'primary',
                       icon: 'ios-add-circle',
                       shape: 'circle',
                       name: 'add',
                       text: '添加'
                   }, {
                       type: 'dashed',
                       icon: 'ios-remove-circle',
                       shape: 'circle',
                       name: 'del',
                       text: '删除'
                   }],
                   //width: '50px',
               }],
           }
       },
       props: {
           data: {
               type: Array
           }
       },
       // components:{TreeGrid},
       methods: {
           changePage: function (currPage) {
               this.$PageUtil.change(this, {currPage: currPage});
           },
           changePageSize: function (pageSize) {
               this.$PageUtil.change(this, {pageSize: pageSize});
           },
           rowClick: function (data, event, index, name, text) {
               console.log('当前行数据:' + data)
               console.log('点击行号:' + index)
               console.log('点击事件:' + event)
               console.log('点击内容:' + name + text)
               if (name === 'add') {
                   this.$emit("on-add", data);
               }
               if (name === 'del') {
                   this.$emit("on-del", data);
               }
           },renderContent (h, { root, node, data }) {
               return h('span', {
                   style: {
                       display: 'inline-block',
                       width: '100%'
                   }
               }, [
                   h('span', [
                       h('iIcon', {
                           props: {
                               type: 'ios-paper-outline'
                           },
                           style: {
                               marginRight: '8px'
                           }
                       }),
                       h('span', data.menuName)
                   ]),
                   h('span', {
                       style: {
                           display: 'inline-block',
                           float: 'right',
                           marginRight: '32px'
                       }
                   }, [
                       h('iButton', {
                           props: Object.assign({}, this.buttonProps, {
                               icon: 'ios-add'
                           }),
                           style: {
                               marginRight: '8px'
                           },
                           on: {
                               click: () => { this.append(data) }
                           }
                       }),
                       h('iButton', {
                           props: Object.assign({}, this.buttonProps, {
                               icon: 'ios-remove'
                           }),
                           on: {
                               click: () => { this.remove(root, node, data) }
                           }
                       })
                   ])
               ]);
           },
           append (data) {
               const children = data.children || [];
               children.push({
                   title: 'appended node',
                   expand: true
               });
               this.$set(data, 'children', children);
           },
           remove (root, node, data) {
               const parentKey = root.find(el => el === node).parent;
               const parent = root.find(el => el.nodeKey === parentKey).node;
               const index = parent.children.indexOf(data);
               parent.children.splice(index, 1);
           }
       }
   }
</script>

<style scoped>
   .table table {
   / / table-layout: auto;
       width: 100% !important;
   }
</style>
