import { token } from './auth'

export const ENDPOINT = "http://localhost:5000";

export const get = (path, opts = {}) => {
  return makeRequest(path, opts)
}

export const post = (path, data, opts) => {
  return makeRequest(path, {
    method: "POST",
    params: JSON.stringify(data),
    headers: { "Content-Type": "application/json" }
  })
}

export const put = (path, data, opts) => {
  return makeRequest(path, {
    method: "PUT",
    params: JSON.stringify(data),
    headers: { "Content-Type": "application/json" }
  })
}

export const patch = (path, data, opts) => {
  return makeRequest(path, {
    method: "PATCH",
    params: JSON.stringify(data),
    headers: { "Content-Type": "application/json" }
  })
}

export const destroy = (path, opts) => {
  return makeRequest(path, { method: "DELETE" })
}

export const makeRequest = (path, opts) => {
  let url = `${ENDPOINT}${path}`
  let method = opts.method || "GET"

  opts.headers = opts.headers || {}
  opts.headers["Accept"] = "application/json"
  if (token) { opts.headers["Authorization"] = `Bearer ${token}` }

  return new Promise(function (resolve, reject) {
    var xhr = new XMLHttpRequest();
    xhr.open(method, url);
    xhr.onload = function () {
      if (this.status >= 200 && this.status < 300) {
        resolve(JSON.parse(xhr.response));
      } else {
        reject({
          status: this.status,
          statusText: xhr.statusText
        });
      }
    };
    xhr.onerror = function () {
      reject({
        status: this.status,
        statusText: xhr.statusText
      });
    };
    if (opts.headers) {
      Object.keys(opts.headers).forEach(function (key) {
        xhr.setRequestHeader(key, opts.headers[key]);
      });
    }
    var params = opts.params;
    // We'll need to stringify if we've been given an object
    // If we have a string, this is skipped.
    if (params && typeof params === 'object') {
      params = Object.keys(params).map(function (key) {
        return encodeURIComponent(key) + '=' + encodeURIComponent(params[key]);
      }).join('&');
    }
    xhr.send(params);
  });
}
