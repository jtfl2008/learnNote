import { initMixin } from './init';
import { lifecycleMixin } from './lifecycle';
import { renderMixin } from './render';
import { initGlobalApi } from './global-api/index';

function Vue(options) {
  this._init(options);
}

initMixin(Vue);
lifecycleMixin(Vue);
renderMixin(Vue);
stateMixin(Vue);
initGlobalApi(Vue);

export default vue;
