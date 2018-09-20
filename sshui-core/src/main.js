// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import iView from './components/iview'
import eView from './components/eview'
import { Message,MessageBox} from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
//import iView from 'iview'
//import { Modal } from 'iview';
import 'babel-polyfill'
//import store from './store'
import 'iview/dist/styles/iview.css'

import VueI18n from 'vue-i18n'
import messages from './locale'
import sView from './components/sview'
import Axios from "axios"
import i18ns from "./locale"

Vue.use(VueI18n)
const i18n = new VueI18n({
  locale: navigator.language || 'zh-CN',
  messages
});

Vue.prototype._compSize = 'large'
Vue.prototype._lg = 6
Vue.prototype._md = 8
Vue.prototype._sm = 12
Vue.prototype._xs = 24

Vue.use(iView, {
  i18n: function (path, options) {
    let value = i18n.t(path, options)
    if (value !== null && value !== undefined) {
      return value
    }
    return ''
  },
  transfer: true,
  size: 'large'
})
Vue.use(eView, {
  i18n: function (path, options) {
    let value = i18n.t(path, options)
    if (value !== null && value !== undefined) {
      return value
    }
    return ''
  },
  transfer: true,
  size: 'large'
})
Vue.use(sView)

Vue.locale = () => {
};

Vue.prototype.$message = Message
Vue.prototype.$messageBox = MessageBox

Vue.prototype.$axios = Axios
Vue.config.productionTip = false
Axios.defaults.baseURL = '/api';
//Axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
Axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
//Dict.load(Axios);

/* eslint-disable no-new */
const SshuiCore = new Vue({
  el: '#app',
  router,
 // store: store,
  i18n: i18n,
  components: {App},
  template: '<App/>'
});

//module.exports = { SshuiCore}
