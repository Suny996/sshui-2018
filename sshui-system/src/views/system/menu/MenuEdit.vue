<template>
  <div>
    <iForm :model="coder" ref="coderValidate" :label-width="120" label-position="right">
      <iRow>
        <sFormItem :label="$t('toolkit.label.coder.title')" span="4" prop="title">
          <iInput v-model="coder.title" :placeholder="$t('placeholder.default',[$t('toolkit.label.coder.title')])"
          />
        </sFormItem>
        <sFormItem :label="$t('toolkit.label.coder.modelName')" prop="modelName">
          <iInput v-model="coder.modelName"
                  :placeholder="$t('placeholder.default',[$t('toolkit.label.coder.modelName')])"
          />
        </sFormItem>
        <sFormItem :label="$t('toolkit.label.coder.modelNameCn')" prop="modelNameCn">
          <iInput v-model="coder.modelNameCn"
                  :placeholder="$t('placeholder.default',[$t('toolkit.label.coder.modelNameCn')])"
          />
        </sFormItem>
        <sFormItem :label="$t('toolkit.label.coder.functionName')" prop="functionName">
          <iInput v-model="coder.functionName"
                  :placeholder="$t('placeholder.default',[$t('toolkit.label.coder.functionName')])"
          />
        </sFormItem>
      </iRow>
      <iRow>
        <iButtonGroup>
          <iButton type="primary" icon="ios-checkmark"
                   @click="runCoder">{{$t('toolkit.label.coder.generate')}}
          </iButton>
          <iButton type="warning" icon="ios-refresh" @click="reset('coderValidate')">{{$t('reset')}}</iButton>
        </iButtonGroup>
      </iRow>
    </iForm>
    <iTable width="100%" border :columns="coderCols" :data="data.rows"></iTable>
  </div>
</template>

<script>
  export default {
    name: "MenuEdit",
    data() {
      return {
        coder: {title: null, modelName: null, modelNameCn: null, functionName: null},
        coderCols: [
          {
            title: this.$t('toolkit.label.coder.columnName'),
            key: 'columnName',
            width: 150,
            fixed: 'left',
            ellipsis: true
          },
          {
            title: this.$t('toolkit.label.coder.columnComment'),
            key: 'columnComment',
            width: 200,
            fixed: 'left',
            ellipsis: true
          },
          {
            title: this.$t('toolkit.label.coder.columnType'),
            key: 'columnType',
            width: 100
          },
          {
            title: this.$t('toolkit.label.coder.columnSize'),
            key: 'columnSize',
            width: 100
          },
          {
            title: this.$t('toolkit.label.coder.primaryKeyFlag'),
            key: 'primaryKeyFlag',
            width: 100
          },
          {
            title: this.$t('toolkit.label.coder.defaultValue'),
            key: 'defaultValue',
            width: 100,
            render: (h, params) => {
              return h('div', [
                h('iInput', {
                  props: {
                    value: params.row.defaultValue
                  },
                  on: {
                    'input': (value) => {//触发事件是on-change,用双引号括起来，
                      //参数value是回调值，并没有使用到
                      this.data.rows[params.index].defaultValue = value;
                    }
                  }
                })
              ]);
            }
          },
          {
            title: this.$t('toolkit.label.coder.requiredFlag'),
            key: 'requiredFlag',
            width: 120,
            render: (h, params) => {
              return h('div', [
                h('iSwitch', {
                  props: {
                    trueValue: 'on',
                    falseValue: 'off',
                    value: params.row.requiredFlag
                  },
                  on: {
                    'on-change': (value) => {//触发事件是on-change,用双引号括起来，
                      //参数value是回调值，并没有使用到
                      this.data.rows[params.index].requiredFlag = value;
                    }
                  }
                })
              ]);
            }
          },
          {
            title: this.$t('toolkit.label.coder.searchFlag'),
            key: 'searchFlag',
            width: 120,
            render: (h, params) => {
              return h('div', [
                h('iSwitch', {
                  props: {
                    trueValue: 'on',
                    falseValue: 'off',
                    value: params.row.searchFlag
                  },
                  on: {
                    'on-change': (value) => {//触发事件是on-change,用双引号括起来，
                      //参数value是回调值，并没有使用到
                      this.data.rows[params.index].searchFlag = value;
                    }
                  }
                })
              ]);
            }
          },
          {
            title: this.$t('toolkit.label.coder.listFlag'),
            key: 'listFlag',
            width: 120,
            render: (h, params) => {
              return h('div', [
                h('iSwitch', {
                  props: {
                    trueValue: 'on',
                    falseValue: 'off',
                    value: params.row.listFlag
                  },
                  on: {
                    'on-change': (value) => {//触发事件是on-change,用双引号括起来，
                      //参数value是回调值，并没有使用到
                      this.data.rows[params.index].listFlag = value;
                    }
                  }
                })
              ]);
            }
          },
          {
            title: this.$t('toolkit.label.coder.modifyFlag'),
            key: 'modifyFlag',
            width: 120,
            render: (h, params) => {
              return h('div', [
                h('iSwitch', {
                  props: {
                    trueValue: 'on',
                    falseValue: 'off',
                    value: params.row.modifyFlag
                  },
                  on: {
                    'on-change': (value) => {//触发事件是on-change,用双引号括起来，
                      //参数value是回调值，并没有使用到
                      this.data.rows[params.index].modifyFlag = value;
                    }
                  }
                })
              ]);
            }
          },
          {
            title: this.$t('toolkit.label.coder.addFlag'),
            key: 'addFlag',
            width: 120,
            render: (h, params) => {
              return h('div', [
                h('iSwitch', {
                  props: {
                    trueValue: 'on',
                    falseValue: 'off',
                    value: params.row.addFlag
                  },
                  on: {
                    'on-change': (value) => {//触发事件是on-change,用双引号括起来，
                      //参数value是回调值，并没有使用到
                      this.data.rows[params.index].addFlag = value;
                    }
                  }
                })
              ]);
            }
          },
          {
            title: this.$t('toolkit.label.coder.dictCode'),
            key: 'dictCode',
            width: 120,
            render: (h, params) => {
              return h('div', [
                h('iInput', {
                  props: {
                    value: params.row.dictCode
                  },
                  on: {
                    'input': (value) => {//触发事件是on-change,用双引号括起来，
                      //参数value是回调值，并没有使用到
                      this.data.rows[params.index].dictCode = value;
                    }
                  }
                })
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
      runCoder: function () {
        this.$axios.post("/toolkit/coder/run", Object.assign(this.coder, {
          fields: this.data.rows
        }))
          .then(res => {
            console.log(res.data)
            this.$Modal.success({
              title: '',
              content: this.$t('text.addSuccess'),
              onOk: () => {
                this.addModal = false
                this.customises.push(res.data);
              }
            });
          })
          .catch(error => {
            console.log(error);
            this.$Modal.error({
              title: '',
              content: this.$t('text.addFail'),
              onOk: () => {
                this.loading = false;
                this.$nextTick(() => {
                  this.loading = true;
                });
              }
            });
          })
      },
      reset: function (name) {//重置查询条件默认方法
        this.$refs[name].resetFields();
      }
    }
  }
</script>

<style scoped>

</style>
