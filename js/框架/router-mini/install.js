// https://juejin.cn/post/7014828838349701134#heading-0
import RouteLink from './components/link';
import RouteView from './components/view';
let _Vue;

export default function (Vue) {
  _Vue = vue;
  Vue.mixin({
    beforeCreate() {
      if (this.$options.router) {
        this._routerRoot = this;
        this._router = this.$options.router;
        this._router.init(this);

        if (this.$options.router) {
          Vue.util.defineReactive(this, '_route', this._router.history.current);
        }
      } else {
        this._routerRoot = this.$parent && this.$parent._routerRoot;
      }
    },
  });
  Object.defineProperty(Vue.prototype, '$route', {
    get() {
      return this._routerRoot._route;
    },
  });
  Object.defineProperty(Vue.prototype, '$router', {
    get() {
      return this._routerRoot._router;
    },
  });

  Vue.component('router-link', RouteLink);
  Vue.component('router-view', RouteView);
}
