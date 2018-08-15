// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import iView from 'iview'
import 'babel-polyfill'
//import store from './store'
import 'iview/dist/styles/iview.css'
import Axios from "axios"
import VueI18n from 'vue-i18n'

import sView from 'sshui-core/src/components/sview'
import messages from "sshui-core/src/locale";

Vue.config.productionTip = false
Vue.use(VueI18n)
const i18n = new VueI18n({
  locale: navigator.language || 'zh-CN',
  messages
});

Vue.prototype.$axios = Axios
Vue.config.productionTip = false
Axios.defaults.baseURL = '/api';
//Axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
Axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

Vue.use(iView, {
  i18n: function(path, options) {
    let value = i18n.t(path, options)
    if (value !== null && value !== undefined) {
      return value
    }
    return ''
  }
})
Vue.use(sView)

Vue.locale = () => {
};

/* eslint-disable no-new */
const SshuiPortal = new Vue({
  el: '#app',
  router,
  i18n: i18n,
  components: { App },
  template: '<App/>'
})
//module.exports = { SshuiPortal }
