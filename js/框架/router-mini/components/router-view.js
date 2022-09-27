export default {
  functional: true,
  render(h, { parent, data }) {
    let route = parent.$route;
    let depth = 0;
    data.routeView = true;
    while (parent) {
      if (parent.$vnode && parent.$vnode.data.routerView) {
        depth++;
      }
    }
    let record = route.matched[depth];
    if (!record) return h();
    return h(record.component, data);
  },
};
