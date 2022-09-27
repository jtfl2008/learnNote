export function createRoute(record, location) {
  let res = [];
  if (record) {
    while (record) {
      res.unshift(record);
      record = record.parent;
    }
  }
  return {
    ...location,
    matched: res,
  };
}

function runQueue(queue, interator, cb) {
  function next(index) {
    if (index >= queue.length) {
      return cb();
    } else {
      let hook = queue[index];
      interator(hook, () => next(index + 1));
    }
  }
  next(0);
}
export default class History {
  constructor(router) {
    this.router = router;
    this.current = createRoute(null, {
      path: '/',
    });
    this.cb = null;
  }
  transitionTo(location, onComplete) {
    let route = this.router.match(location);
    if (
      location === route.path &&
      route.matched.length === this.getCurrentLocation.matched.length
    )
      return;
    let queue = [].concat(this.router.beforeHooks);
    let interator = (hook, next) => {
      hook(route, this.current, () => {
        next();
      });
    };
    runQueue(queue, interator, () => {
      this.updateRoute(route);
      onComplete && onComplete();
    });
  }
  listen(cb) {
    this.cb = cb;
  }
  updateRoute(route) {
    this.current = route;
    // 更新current后 更新_route属性
    this.cb && this.cb(route);
  }
}
