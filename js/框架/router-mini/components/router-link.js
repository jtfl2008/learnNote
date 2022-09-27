export default {
  props: {
    to: {
      type: String,
      required: true,
    },
    tag: {
      type: String,
    },
  },
  render(h) {
    let tag = this.tag || 'a';
    let handle = () => {
      this.$router.push(this.to);
    };
    return <tag onClick={handle}> {this.$slot.default} </tag>;
  },
};
