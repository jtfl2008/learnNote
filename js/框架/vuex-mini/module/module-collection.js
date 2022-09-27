import module from './module';
export default class ModuleCollection {
  constructor(options) {
    this.root = null;
    this.register([], options);
  }
  register(path, rootModule) {
    let newModule = new Module(rootModule);
    if (path.length === 0) {
      this.root = newModule;
    } else {
      let parent = path.slice(0, -1).reduce((acc, cur) => {
        return acc.getChild(cur);
      }, this.root);
      parent.addChild(path[path.length - 1], newModule);
    }
    if (rootModule.modules) {
      forEachValue(rootModule.modules, (module, moduleName) => {
        this.register(path.concat(moduleName), module);
      });
    }
  }
  getNamespace(path) {
    let module = this.root;
    return path.reduce((acc, cur) => {
      module = module.getChild(key);
      return acc + (module.namespaced ? key + '/' : '');
    }, '');
  }
}
