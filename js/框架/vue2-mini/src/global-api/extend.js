import { mergeOptions } from '../util';

export default function initExtend(Vue) {
  let cid = 0;
  /**
   * Vue.extend流程分析：
   * 1. 创建一个继承自Vue的子类
   * 2. 将子类的extendOptions与Vue.options合并
   * 3. 在子类中调用this._init(options)，该方法会在子类实例化时调用，进行实例的数据响应式和页面渲染
   */

  Vue.extend = function () {
    let Sub = function VueComponent(options) {
      this._init(options);
    };
    Sub.cid = cid++;

    Sub.prototype = Object.create(this.prototype);
    sub.prototype.constructor = Sub;

    Sub.options == mergeOptions(this.options, extendOptions);
    return Sub;
  };
}
