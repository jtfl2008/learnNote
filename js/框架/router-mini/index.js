// https://juejin.cn/post/7104862572385402917
// https://www.jianshu.com/p/8d6163823b52
import install from './install';
import createMatcher from './create-matcher';
import HashHistory from './history/hash';
export default class VueRouter {
  constructor(options) {
    this.matcher = createMatcher(options.routes || []);
    this.history = new HashHistory();
    this.beforeHooks = [];
  }
  match(location) {
    return this.matcher.match(location);
  }
  beforeEach(fn) {
    this.beforeHooks.push(fn);
  }
  init(app) {
    let history = this.history;
    let setupHashListener = () => {
      history.setupListener();
    };
    history.transitionTo(this.getCurrentLocation(), setupHashListener);
    history.listen((route) => {
      app._route = route;
    });
  }
}
VueRouter.install = install;
