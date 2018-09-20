import Vue from 'vue';
import Locales from './locale';
import iviewZhCN from 'iview/src/locale/lang/zh-CN';
import iviewEnUS from 'iview/src/locale/lang/en-US';
import iviewZhTW from 'iview/src/locale/lang/zh-TW';

import elementEn from 'element-ui/lib/locale/lang/en'
import elementZhCN from 'element-ui/lib/locale/lang/zh-CN'
import elementZhTW from 'element-ui/lib/locale/lang/zh-TW'

import zhCN from './lang/zh-CN'
import enUS from './lang/en-US'
import zhTW from './lang/zh-TW'
// 自动设置语言
const navLang = navigator.language;
const localLang = (navLang === 'zh-CN' || navLang === 'en-US') ? navLang : false;
const lang = window.localStorage.lang || localLang || 'zh-CN';

Vue.config.lang = lang;

// 多语言配置
const locales = Locales;
const i18ns = {
  'zh-CN': Object.assign(iviewZhCN,iviewZhCN,zhCN),
  'en-US': Object.assign(iviewEnUS,iviewEnUS, enUS),
  'zh-TW': Object.assign(iviewZhTW,iviewZhTW, zhTW)
};

export default i18ns
