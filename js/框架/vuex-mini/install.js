export default function (Vue) {
  _Vue = vue;
  Vue.mixin({
    beforeCreate() {
      if (this.$options.Store) {
        this.$store = this.$options.store;
      } else {
        this.$store = this.$parent && this.$parent.$store;
      }
    },
  });
}
