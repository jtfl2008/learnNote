import initMixin from './mixin';
import initExtend from './extend';
import { ASSETS_TYPE } from './const';
import initAssetRegisters from './assets';

export function initGlobalApi(Vue) {
  Vue.option = {};
  initMixin(Vue);
  // 初始化Vue.options.components、Vue.options.directives、Vue.options.filters设为空对象
  ASSETS_TYPE.forEach((type) => {
    Vue.option[type + 's'] = {};
  });
  // Vue.options会与组件的options合并，所以无论创建多少子类，都可以通过实例的options._base找到Vue
  Vue.options._base = Vue;
  // 注册extend方法
  initExtend(Vue);
  // 注册Vue.component()、Vue.filter()、Vue.directive()方法
  initAssetRegisters(Vue);
}
