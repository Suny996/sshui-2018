<template>
  <div>
    <CoderQuery @on-query="d=>retData=d"></CoderQuery>
    <CoderList :data="retData" @on-change="d=>retData=d" @on-generate="goGenerate"></CoderList>
    <iModal v-model="generateDialog" width="90%"  title="代码生成" :draggable=true :fullscreen=true :footer-hide=true >
      <CoderGenerate :data="currentRow"></CoderGenerate>
    </iModal>
  </div>
</template>

<script>
  import CoderQuery from './CoderQuery'
  import CoderList from './CoderList'
  import CoderGenerate from './CoderGenerate'

  export default {
    name: "CoderManage",
    data() {
      return {
        retData: {},
        currentRow: {},
        generateDialog: false
      }
    },
    components: {CoderQuery, CoderList, CoderGenerate},
    methods: {
      goGenerate(r) {
        this.generateDialog = true;
        this.$axios.get("toolkit/coder/columnList/" + r["tableName"]).then(res => {
          console.log(JSON.stringify(res.data));
          //this.listData=[];
          this.currentRow = Object.assign(r, {rows: res.data});
          //console.log(this.listData);
        }).catch(error => {
          console.log(error);
        });
        //this.currentRow = r;
      }
    }
  }
</script>

<style scoped>

</style>
