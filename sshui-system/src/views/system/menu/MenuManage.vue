<template>
  <div>

    <iLayout>
      <!--<iSider breakpoint="md" collapsible :collapsed-width="78" v-model="isCollapsed" hide-trigger
              :style="{background: '#fff'}">-->
        <MenuQuery @on-query="d=>retData=d"></MenuQuery>
        <MenuList :data="[retData]" @on-change="d=>currentRow=d"></MenuList>
      <!--</iSider>-->
     <!-- <iContent :style="{padding: '24px', minHeight: '280px', background: '#fff'}">
        菜单编辑

      </iContent>-->
    </iLayout>
    <iModal v-model="editDialog" width="90%" title="代码生成" :draggable=true :fullscreen=true :footer-hide=true>
      <MenuEdit :data="currentRow"></MenuEdit>
    </iModal>
  </div>
</template>

<script>
  import MenuQuery from './MenuQuery'
  import MenuList from './MenuList'
  import MenuEdit from './MenuEdit'

  export default {
    name: "MenuManage",
    data() {
      return {
        retData: {},
        currentRow: {},
        editDialog: false,
        isCollapsed:false
      }
    },
    components: {MenuQuery, MenuList, MenuEdit},
    methods: {
     /* buildTree(menu) {
        let m = this.addTitle(menu);
        console.log(m)
        this.retData = m;
      },
      addTitle(m) {
        m.title = m.menuName;
        m.expand=true;
        console.log(JSON.stringify(m));
        if (m.children) {
          for (var i = 0; i < m.children.length; i++) {
             this.addTitle(m.children[i]);
          }
        }
        return m;
      }*/
    }
  }
</script>

<style scoped>

</style>
