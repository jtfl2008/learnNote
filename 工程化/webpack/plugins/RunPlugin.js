export default class RunPlugin {
  apply(compiler) {
    compiler.hooks.run.tap('RunPlugin', () => {});
  }
}
