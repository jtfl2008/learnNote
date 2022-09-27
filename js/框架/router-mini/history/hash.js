import History from './base';
function ensureSlash() {
  if (window.location.hash) return;
  window.location.hash = '/';
}
function getHash() {
  return window.location.hash.slice(1);
}
export default class HashHistory extends History {
  constructor(router) {
    super(router);
    ensureSlash();
  }

  getCurrentLocation() {
    return getHash();
  }
  setupListener() {
    window.addEventListener('hashchange', () => {
      this.transitionTo(getHash());
    });
  }
}
