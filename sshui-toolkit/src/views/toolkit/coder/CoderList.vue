<template>
  <div width="100%">
    <iTable width="100%" border :columns="coderColumns" :data="data.rows" ></iTable>
    <iPage :total="data.totalCount" :current="data.currentPage" :page-size="data.pageSize"
          :page-size-opts="_pageSizeOpts" show-total show-elevator
          show-sizer @on-change="changePage" @on-page-size-change="changePageSize"></iPage>
  </div>
</template>

<script>
  export default {
    name: "CoderList",
    data() {
      return {
        coderColumns: [
          {
            title: this.$t('toolkit.label.coder.tableName'),
            key: 'tableName',
            width: 150,
            fixed: 'left',
            ellipsis: true
          },
          {
            title: this.$t('toolkit.label.coder.tableComment'),
            key: 'tableComment',
            width: 200,
            fixed: 'left',
            ellipsis: true
          },
          {
            title: this.$t('toolkit.label.coder.coderFlag'),
            key: 'coderFlag',
            //width: 100
          },
          {
            title: this.$t('toolkit.label.coder.title'),
            key: 'title',
            //width: 100
          },
          {
            title: this.$t('toolkit.label.coder.modelName'),
            key: 'modelName',
            //width: 100
          },
          {
            title: this.$t('toolkit.label.coder.functionName'),
            key: 'functionName',
            //width: 100
          },
          {
            title: this.$t('action'),
            key: 'action',
            fixed: 'right',
            width: 120,
            render: (h, params) => {
              return h('div', [
                h('iButton', {
                  props: {
                    type: 'primary'
                  },
                  on: {
                    click: () => {
                      this.generate(params.row)
                    }
                  }
                },this.$t('toolkit.label.coder.generate'))
              ]);
            }
          }]
      }
    },
    props: {
      data: {
        type: Object
      }
    },
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
