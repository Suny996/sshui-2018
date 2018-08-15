<template>
  <div>
    <Customise @customises="c=>customise=c" :defaultFields="defaultFields">
      <Form :model="formItem" ref="formValidate" :rules="ruleValidate" :label-width="120" label-position="right">
        <Row>
          <Col :xs="24" :sm="12" :md="8" :lg="6" v-show="customise.name">
            <FormItem label="Name" prop="name">
              <Input v-model="formItem.name" placeholder="Enter name...">
              <Select v-model="select3" slot="prepend" style="width: 80px">
                <Option value="day">Day</Option>
                <Option value="month">Month</Option>
              </Select>
              </Input>
            </FormItem>
          </Col>
          <Col :xs="24" :sm="12" :md="8" :lg="6" v-show="customise.gender">
            <FormItem label="Gender" prop="gender">
              <RadioGroup v-model="formItem.gender">
                <Radio label="male">Male</Radio>
                <Radio label="female">Female</Radio>
              </RadioGroup>
            </FormItem>
          </Col>
          <Col :xs="24" :sm="12" :md="8" :lg="6" v-show="customise.date">
            <FormItem label="Date" prop="date">
              <DatePicker type="date" v-model="formItem.date"></DatePicker>
            </FormItem>
          </Col>
          <Col :xs="24" :sm="12" :md="8" :lg="6" v-show="customise.city">
            <FormItem label="City" label-for="city" prop="city">
              <Select v-model="formItem.city" clearable element-id="city">
                <Option value="beijing">New York</Option>
                <Option value="shanghai">London</Option>
                <Option value="shenzhen">Sydney</Option>
              </Select>
            </FormItem>
          </Col>
          <Col :xs="24" :sm="12" :md="8" :lg="6" v-show="customise.mail">
            <FormItem label="E-mail" prop="mail">
              <Input v-model="formItem.mail" placeholder="Enter your e-mail"></Input>
            </FormItem>
          </Col>
          <Col :xs="24" :sm="12" :md="8" :lg="6">
            <FormItem :label="$t('switchLangTitle')">
              <RadioGroup :value="lang" @on-change="handleSwitch" vertical>
                <Radio label="zh-CN">
                  <span>中文简体</span>
                </Radio>
                <Radio label="zh-TW">
                  <span>中文繁體</span>
                </Radio>
                <Radio label="en-US">
                  <span>English</span>
                </Radio>
              </RadioGroup>
            </FormItem>
          </Col>
          <Col :xs="24" :sm="12" :md="8" :lg="6">
            <FormItem>
              <Button type="primary" @click="handleSubmit('formValidate')">Submit</Button>
              <Button type="ghost" @click="handleReset('formValidate')" style="margin-left: 8px">Reset</Button>
            </FormItem>
          </Col>
        </Row>
      </Form>
    </Customise>
  </div>
</template>

<script>


  export default {
    name: "Test",
    data() {
      return {
        lang: 'zh-CN',
        defaultFields: {name: true, city: true, date: false, mail: false, gender: false},
        customise: {},
        select3: '',
        formItem: {
          name: '',
          mail:
            '',
          city:
            '',
          date:
            '',
          gender:
            ''
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
              {required: true, message: 'Please select the city', trigger: 'change'}
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
        this.$refs[name].resetFields();
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
