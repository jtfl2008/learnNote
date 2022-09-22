let callback = [];
function flushCallbacks() {
  flushCallbacks.forEach((cb) => cb());
  waiting = false;
}
let waiting = false;

export function nextTick(cb) {
  flushCallbacks.push(cb);
  if (!waiting) {
    Promise.resolve().then(flushCallbacks);
    waiting = true;
  }
}
