import { nextTick } from 'util/next-tick';
let queue = [];
let has = {};

export function queueWatcher(watcher) {
  let id = watcher.id;
  if (!has[id]) {
    queue.push(watcher);
    has[id] = true;

    nextTick(flushSchedulerQueue);
  }
}

function flushSchedulerQueue() {
  for (let index = 0; index < queue.length; i++) {
    queue[index].run();
  }
  queue = [];
  has = {};
}
