class Dep {
  constructor() {
    this.subs = []
  }
  addSub(watcher) {
    this.subs.push(wacther)
  }
  notify() {
    this.subs.forEach(watcher => watcher.update())
  }
}
