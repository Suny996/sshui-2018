<template>
  <div>
    <iTabs type="card" @on-tab-remove="delCustomise" @on-click="handleTabChange">
      <iTabPane :label="$t('customise.label.defaultTabLabel')"></iTabPane>
      <template v-for="(customise,index) in customises">
        <iTabPane :label="customise.customiseName" :name="customise.customiseId" closable></iTabPane>
      </template>
      <div slot="extra">
        <iButton type="default" @click="hiddenDispCond" :icon="dispIcon"></iButton>
        <iButton type="default" @click="addModal = true" icon="ios-add"></iButton>
      </div>
    </iTabs>
    <div v-show="conditionShow">
      <slot></slot>
    </div>
    <iModal
      v-model="addModal"
      :title="$t('customise.title.addModalTitle')"
      @on-ok="addCustomise" :loading="loading">
      <iInput v-model="addCustomiseName"
             :placeholder="$t('placeholder.default',[$t('customise.label.customiseName')])"></iInput>
      <iTransfer
        :data="data"
        :target-keys="targetKeys"
        filterable
        :filter-method="filterMethod"
        @on-change="handleTransfer"></iTransfer>
    </iModal>
  </div>
</template>

<script>
  export default {
    name: "Customise",
    data() {
      return {
        addModal: false,
        loading: true,
        conditionShow: true,
        dispIcon: 'ios-arrow-up',
        customises: [],
        data: [],
        targetKeys: [],
        addCustomiseName: '',
        pageId: this.pageName
      }
    },
    props: {
      defaultFields: {
        type: Object, default: {}
      },
      pageName: {type: String}
    },
    created() {
      if (!this.pageName) {
        console.log('>>>>>>>>'+this.$parent.$options.name)
        this.pageId = this.$parent.$options.name;
      }
      this.$axios("/customise/" + this.pageId)
        .then(res => {
          this.customises = res.data;
        })
        .catch(error => {
          console.log(error);
        });

      for (var item in this.defaultFields) {
        this.data.push({"key": item, "label": item});
      }
      this.$emit("on-change", this.defaultFields);
    },
    methods: {
      handleTabChange(name) {//tab切换
        let custom = this.customises.find(c => c.customiseId === name);
        if (!custom) {
          this.$emit("on-change", this.defaultFields);
        } else {
          this.$emit("on-change", JSON.parse(custom.fieldContents));
        }
      },
      addCustomise() {//添加customise
        if (!this.addCustomiseName) {
          this.$Message.error(this.$t('placeholder.default', [this.$t('customise.label.customiseName')]));
          //this.$Message.error('Fail!');
          this.loading = false;
          this.$nextTick(() => {
            this.loading = true;
          });
          return false;
        }

        if (!this.targetKeys || this.targetKeys.length <= 0) {
          this.$Message.error(this.$t('placeholder.select', [this.$t('customise.label.customise')]));
          this.loading = false;
          this.$nextTick(() => {
            this.loading = true;
          });
          return false;
        }

        let fields = {};
        this.targetKeys.forEach(function (field) {
          fields[field] = true;
        })

        this.$axios.post("/customise/", {
          pageId: this.pageId,
          customiseName: this.addCustomiseName,
          fieldContents: JSON.stringify(fields)
        })
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
      delCustomise(name) {
        console.log('this.name:' + name);
        this.$Modal.confirm({
          title: '',
          content: this.$t('customise.text.dellCustomiseConfirmText'),
          cancelText: this.$t('delete'),
          okText: this.$t('hidden'),
          onCancel: () => {
            this.$axios.delete("/customise/" + name)
              .then(res => {
                console.log(res.data)
                this.$Modal.success({
                  title: '',
                  content: this.$t('text.delSuccess'),
                  onOk: () => {
                    this.addModal = false
                  }
                });
              })
              .catch(error => {
                console.log(error);
                this.$Modal.error({
                  title: '',
                  content: this.$t('text.delFail'),
                  onOk: () => {
                    //this.addModal = false
                  }
                });
              })
          },
          onOk: () => {

          }
        });
      },
      handleTransfer(newTargetKeys, direction, moveKeys) {//添加查询项
        console.log(newTargetKeys);
        console.log(direction);
        console.log(moveKeys);
        this.targetKeys = newTargetKeys;
      },
      filterMethod(data, query) {
        return data.label.indexOf(query) > -1;
      },
      hiddenDispCond() {
        this.conditionShow = !this.conditionShow;
        if (this.conditionShow) {
          this.dispIcon = 'ios-arrow-up';
        } else {
          this.dispIcon = 'ios-arrow-down';
        }
      }
    }
  }
</script>

<style scoped>
  .ivu-transfer-list {
    display: inline-block;
    width: 280px;
    height: 300px;
    font-size: 12px;
    vertical-align: middle;
    position: relative;
    padding-top: 35px;
  }
</style>
