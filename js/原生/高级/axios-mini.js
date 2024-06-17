// https://github.com/wzf1997/blog/blob/main/myAxios/axios.js
export default class Axios {
  constructor(config) {
    this.defaults = config;
    this.interceptors = {
      request: new InterceptorManage(),
      response: new InterceptorManage(),
    };
  }
  request(config) {
    if (typeof config === 'string') {
      config = arguments[1] || {};
      config.url = arguments[0];
    } else {
      config = config || {};
    }

    if (config.method) {
      config.method = config.method.toLowerCase();
    } else {
      config.method = 'get';
    }

    let chain = [dispatchRequest, undefined];

    this.interceptors.request.forEach((item) => {
      chain.unshift(item.fulfilled, item.rejected);
    });
    this.interceptors.response.forEach((item) => {
      chain.push(item.fulfilled, item.rejected);
    });

    let promise = Promise.resolve(config);
    while (chain.length) {
      promise = promise.then(chain.shift(), chain.shift());
    }
    return promise;
  }
}

class InterceptorManage {
  constructor() {
    this.handlers = [];
  }

  use(fulfilled, rejected) {
    this.handlers.push({
      fulfilled,
      rejected,
    });
    return this.handlers.length - 1;
  }
  eject(id) {
    if (this.handlers[id]) {
      this.handlers[id] = null;
    }
  }
  forEach(fn) {
    this.handlers.forEach((item) => {
      if (!item) return;
      fn(item);
    });
  }
}

function dispatchRequest(config) {
  return new Promise((resolve, reject) => {
    let xhr = new XMLHttpRequest();
    xhr.open(config.method, config.url);
    xhr.onreadystatechange = function () {
      if (xhr.status === 200) {
        resolve();
      } else {
        reject();
      }
    };
    xhr.send();

    if (config.cancelToken) {
      config.cancelToken.promise.then(
        (onCanceled = (cancel) => {
          if (!xhr) {
            return;
          }
          xhr.abort();
          reject(cancel);
          xhr = null;
        }),
      );
    }
  })
    .then((res) => {
      return res;
    })
    .catch((error) => {
      return Promise.reject(error);
    });
}

export class cancelToken {
  constructor(exactor) {
    if (typeof exactor !== 'function') return;
    let resolvePromise = () => {};
    this.promise = new Promise((resolve) => {
      resolvePromise = resolve;
    });
    this.reason = undefined;

    let cancel = (message) => {
      if (this.reason) return;
      this.reason = 'cancel' + message;
    };
    exactor(cancel);
  }
  static source() {
    let cancel = () => {};
    let token = new cancelToken(
      (exactor = (c) => {
        cancel = c;
      }),
    );
    return {
      token,
      cancel,
    };
  }
}
