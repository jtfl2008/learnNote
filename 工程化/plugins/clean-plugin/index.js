class clean {
  apply(compiler) {
    const fs = compiler.outputFileSystem;
    compiler.hooks.emit.tagAsync('clean', (compilation, callback) => {
      const outputPath = compiler.options.output.path;
      const err = this.removeFiles(fs, outputPath);
      callback(err);
    });
  }

  removeFiles(fs, path) {
    try {
      const files = fs.readdirSync(path);
      files.forEach((file) => {
        const fileStat = fs.statSync(filePath);
        if (fileStat.isDirectory()) {
          this.removeFiles(fs, filePath);
        } else {
          fs.unlinkSync(filePath);
        }
      });
    } catch (e) {
      return e;
    }
  }
}
module.exports = clean;
