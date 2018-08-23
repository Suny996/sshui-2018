import Vue from 'vue';
import Locales from './locale';
import iviewZhCN from 'iview/src/locale/lang/zh-CN';
import iviewEnUS from 'iview/src/locale/lang/en-US';
import iviewZhTW from 'iview/src/locale/lang/zh-TW';
import coreZhCN from "sshui-core/src/locale/lang/zh-CN";
import coreEnUS from "sshui-core/src/locale/lang/en-US";
import coreZhTW from "sshui-core/src/locale/lang/zh-TW";
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
  'zh-CN': Object.assign(iviewZhCN, coreZhCN, zhCN),
  'en-US': Object.assign(iviewEnUS, coreEnUS, enUS),
  'zh-TW': Object.assign(iviewZhTW, coreZhTW, zhTW)
};

export default i18ns
