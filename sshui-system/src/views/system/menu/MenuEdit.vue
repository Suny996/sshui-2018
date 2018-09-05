<template>
  <div>
    <iForm :model="menu" ref="menuValidate" :rules='ruleValidate' :label-width="120" label-position="right">
      <iRow>
        <sFormItem :label="$t('system.label.menu.menuCode')" prop="menuCode">
          <iInput v-model="menu.menuCode" :placeholder="$t('placeholder.default',[$t('system.label.menu.menuCode')])"
          />
        </sFormItem>
        <sFormItem :label="$t('system.label.menu.menuName')" prop="menuName">
          <iInput v-model="menu.menuName"
                  :placeholder="$t('placeholder.default',[$t('system.label.menu.menuName')])"
          />
        </sFormItem>
      </iRow>
    </iForm>
  </div>
</template>

<script>
  export default {
    name: "MenuEdit",
    data() {
      return {
        menu: {},
        ruleValidate: {
          menuName: [
            {required: true, message: 'The name cannot be empty', trigger: 'blur'}
          ]
        }
      }
    },
    props: {
      data: {
        type: Object
      }
    },
    methods: {
      validate: function () {
          this.$refs['menuValidate'].validate((valid) => {
            if (valid) {
              return true;
            } else {
              return false;
            }
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
