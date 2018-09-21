<template>
  <div>
    <sCustomise @on-change="c=>customise=c" :defaultFields="defaultFields">
      <iForm :model="formItem" ref="formValidate" :rules="ruleValidate" :label-width="120" label-position="right">
        <iRow>
          <sFormItem label="Name" prop="name" v-show="customise.name">
            <iInput v-model="formItem.name" placeholder="Enter name...">
              <sOperator v-model="formItem.name_opt" slot="prepend"></sOperator>
            </iInput>
          </sFormItem>

          <sFormItem label="Gender" prop="gender" v-show="customise.gender">
            <iRadioGroup v-model="formItem.gender">
              <iRadio label="male">Male</iRadio>
              <iRadio label="female">Female</iRadio>
            </iRadioGroup>
          </sFormItem>

          <sFormItem label="Date" prop="date" v-show="customise.date">
            <iDatePicker type="date" v-model="formItem.date"></iDatePicker>
          </sFormItem>

          <sFormItem label="City" label-for="city" prop="city" v-show="customise.city">
            <sCascader v-model="formItem.city" dict="PROV" clearable filterable element-id="city">
            </sCascader>
          </sFormItem>

          <sFormItem label="E-mail" prop="mail" v-show="customise.mail">
            <iInput v-model="formItem.mail" placeholder="Enter your e-mail"></iInput>
          </sFormItem>

          <sFormItem :label="$t('switchLangTitle')">
            <iRadioGroup :value="lang" @on-change="handleSwitch" vertical>
              <iRadio label="zh-CN">
                <span>中文简体</span>
              </iRadio>
              <iRadio label="zh-TW">
                <span>中文繁體</span>
              </iRadio>
              <iRadio label="en-US">
                <span>English</span>
              </iRadio>
            </iRadioGroup>
          </sFormItem>


          <sFormItem>
            <iButton type="primary" @click="handleSubmit('formValidate')">Submit</iButton>
            <iButton type="warning" ghost @click="handleReset('formValidate')" style="margin-left: 8px">Reset</iButton>
            <iButton type="info" @click="EDialogVisible = true">打开 EDialog</iButton>
          </sFormItem>

        </iRow>
      </iForm>
    </sCustomise>
    <eDialog
      title="element-Dialog 提示"
      :visible.sync="EDialogVisible"
      width="30%">
      <span>这是一段信息</span>
      <span slot="footer" class="dialog-footer">
    <iButton @click="EDialogVisible = false">取 消</iButton>
    <iButton type="primary" @click="EDialogVisible = false">确 定</iButton>
  </span>
    </eDialog>
  </div>
</template>

<script>
  export default {
    name: "TestCustomise",
    data() {
      return {
        lang: 'zh-CN',
        defaultFields: {name: true, city: true, date: false, mail: false, gender: false},
        customise: {},
        select3: '',
        EDialogVisible: false,
        formItem: {
          name: '',
          name_opt: 'like',
          mail: '',
          city: [],
          date: '',
          gender: ''
        },
        ruleValidate: {
          name: [
            {required: true, message: 'The name cannot be empty', trigger: 'blur'}
          ],
          mail:
            [
              {required: true, message: 'Mailbox cannot be empty', trigger: 'blur'},
              {type: 'email', message: 'Incorrect email format', trigger: 'blur'}
            ],
          city:
            [
              {required: true, type: 'array', message: 'Please select the city', trigger: 'change'}
            ],
          gender:
            [
              {required: true, message: 'Please select gender', trigger: 'change'}
            ],
          date:
            [
              {required: true, type: 'date', message: 'Please select the date', trigger: 'change'}
            ]
        }
      }
    },
    methods: {
      /* getCustomise(data){
         this.customise = data;
       }*/
      handleSubmit(name) {
        this.$refs[name].validate((valid) => {
          if (valid) {
            this.$Message.success('Success!');
          } else {
            this.$Message.error('Fail!');
          }
        })
      },
      handleReset(name) {//重置查询条件默认方法

       this.$MessageBox.confirm('确定要重置查询条件吗?', '确认', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$refs[name].resetFields();
        }).catch(() => {
        });
      },
      handleSwitch(lang) {
        this.$i18n.locale = lang;
        //localStorage.lang = lang;
        //this.$store.commit('switchLang', lang); // 如果你要自己实现多语言切换，那么只需要执行这行代码即可，修改语言类型
        // 像iview的table组件这样一次渲染如果数据不更新视图就不更新的组件，如果切换语言需要更新一下数据才能切换组件内的多语言
      }
    }
  }
</script>

<style scoped>

</style>
