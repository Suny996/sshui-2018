<template>
  <div>
    <sCustomise @on-change="c=>customises=c" :default-fields="defaultFields">
      <iForm :model="variables" ref="coderValidate" :label-width="120" label-position="right">
        <iRow>

          <sFormItem :label="$t('toolkit.label.coder.title')" prop="title" v-show="customises.title">
            <iInput v-model="variables.title" :placeholder="$t('placeholder.default',[$t('toolkit.label.coder.title')])"
            >
              <sOperator slot="prepend" v-model="operators.title"></sOperator>
            </iInput>
          </sFormItem>

          <sFormItem :label="$t('toolkit.label.coder.tableName')" prop="tableName" v-show="customises.tableName">
            <iInput v-model="variables.tableName"
                    :placeholder="$t('placeholder.default',[$t('toolkit.label.coder.tableName')])">
              <sOperator slot="prepend" v-model="operators.tableName"></sOperator>
            </iInput>
          </sFormItem>

          <sFormItem :label="$t('toolkit.label.coder.tableComment')" prop="tableComment"
                     v-show="customises.tableComment">
            <iInput v-model="variables.tableComment"
                    :placeholder="$t('placeholder.default',[$t('toolkit.label.coder.tableComment')])"
            >
              <sOperator slot="prepend" v-model="operators.tableComment"></sOperator>
            </iInput>
          </sFormItem>

          <sFormItem :label="$t('toolkit.label.coder.coderDate')" prop="coderDate" v-show="customises.coderDate">
            <iDatePicker type="date" v-model="variables.coderDate"
                         :placeholder="$t('placeholder.select',[$t('toolkit.label.coder.coderDate')])"
                         clearable></iDatePicker>
          </sFormItem>

          <sFormItem :label="$t('toolkit.label.coder.coderFlag')" prop="coderFlag" v-show="customises.coderFlag">
            <sSelect v-model="variables.coderFlag" dict="YN"
                     :placeholder="$t('placeholder.select',[$t('toolkit.label.coder.coderFlag')])" clearable
            >
            </sSelect>
          </sFormItem>

          <sFormItem>
            <iButton type="primary" icon="ios-search" @click="query">{{$t('query')}}</iButton>
            <iButton type="warning" icon="ios-refresh" @click="reset('coderValidate')">
              {{$t('reset')}}
            </iButton>
          </sFormItem>

        </iRow>
      </iForm>
    </sCustomise>
  </div>
</template>

<script>

  export default {
    name: "CoderQuery",
    data() {
      return {
        defaultFields: {title: true, tableName: true, tableComment: true, coderDate: true, coderFlag: true},
        customises: {},
        variables: {
          title: null,
          tableName: null,
          tableComment: null,
          coderDate: null,
          coderFlag: null
        },
        operators: {
          title: null,
          tableComment: null
        }
      }
    },
    props: {
      listUrl: {type: String, default: '/toolkit/coder/tableList'},
      pageSize: {type: Number}
    },
    methods: {
      query: function () {
        this.$PageUtil.query(this);
        /*this.$axios.post("/toolkit/coder/tableList", {pageSize:20})
          .then(res => {
            console.log( res.data);
            this.$emit("dataList", res.data);
          })
          .catch(error => {
            console.log(error);
          });*/
      },
      reset: function (name) {//重置查询条件默认方法
        this.$refs[name].resetFields();
      }
    }
  }
</script>

<style scoped>

</style>
