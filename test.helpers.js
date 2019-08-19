const fetchHelper = require('@hacknlove/fetchhelper')

function defunction (fetch, url, options) {
  if (typeof fetch === 'function') {
    return fetch(url, options)
  }
  return fetch
}

function choose (resolve, reject, fetch, url, options) {
  if (fetch === undefined) {
    return reject(new Error(`no more fetchs: ${(new Date()).toISOString()}`))
  }
  if (typeof fetch === 'function') {
    return choose(resolve, reject, fetch(url, options), url, options)
  }
  if (fetch.error) {
    return reject(defunction(fetch.error, url, options))
  }
  if (fetch.reject) {
    return resolve({
      ok: false,
      json () {
        return defunction(fetch.reject, url, options)
      }
    })
  }

  return resolve({
    ok: true,
    json () {
      return defunction(fetch, url, options)
    }
  })
}

export function fetchs (array, t) {
  fetchs.i = 0
  fetchHelper.fetch = (url, options) => {
    var fetch = array[fetchs.i++]
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        choose(resolve, reject, fetch, url, options)
      }, 50)
    })
  }
}

export { choose, defunction }
