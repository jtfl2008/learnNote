let { SyncHook } = require('tapable');
class Complier {
  constructor(options) {
    this.options = options;
    this.modules = [];
    this.hooks = {
      run: new SyncHook(),
      done: new SyncHook(),
    };
  }

  run() {
    this.hooks.run.call();
    let entry = path.join(this.options.context, this.options.entry);
    this.buildModule(entry, true);
    const outputPath = path.resolve(this.root, this.options.output.path);
    const filePath = path.resolve(outputPath, this.options.output.filename);
    this.mkdirp(outputPath, filePath);
  }
  buildModule(modulePath, isEntry) {
    const source = this.getSource(modulePath);
    modulePath =
      './' + path.relative(this.root, modulePath).replace(/\\/g, '/');
    let { sourceCode, dependencies } = this.parse(source, modulePath);
    this.modules[modulePath] = JSON.stringify(sourceCode);
    dependencies.forEach((d) => {
      this.buildModule(path.join(this.root, d));
    });
  }
  getSource(modulePath) {
    let content = fs.readFileSync(modulePath, 'utf-8');
    const rules = this.options.modules.rules;
    for (let rule of rules) {
      let { test, use } = rule;
      if (test.test(modulePath)) {
        let length = use.length - 1;
        function loopLoader() {
          let { loader, options } = use[length--];
          let loaderFunc = require(loader);
          content = loaderFunc(content, options);
          if (length > 0) {
            loopLoader();
          }
        }
        if (length >= 0) {
          loopLoader();
        }
      }
    }
    return content;
  }
  parse(source, moduleName) {
    let dependencies = [];
    let dirName = path.dirname(moduleName);
    let requirePlugin = {
      visitor: {
        // 替换源码中的require为__webpack_require__
        CallExpression(p) {
          let node = p.node;
          if (node.callee.name === 'require') {
            node.callee.name = '__webpack_require__';
            // 路径替换
            let modulePath = node.arguments[0].value;
            modulePath =
              './' + path.join(dirname, modulePath).replace(/\\/g, '/');
            node.arguments = [t.stringLiteral(modulePath)];
            dependencies.push(modulePath);
          }
        },
      },
    };
    let result = babel.transform(source, {
      plugins: [requirePlugin],
    });
    return {
      sourceCode: result.code,
      dependencies,
    };
  }
  mkdirp(outputPath, filePath) {
    let { modules, entryPath } = this;
    if (!fs.existsSync(outputPath)) {
      fs.mkdirSync(outputPath);
    }
    ejs
      .renderFile(path.join(__dirname, 'Template.ejs'), { modules, entryPath })
      .then((code) => {
        fs.writeFileSync(filePath, code);
      });
  }
}
