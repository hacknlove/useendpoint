const { useState, useEffect } = require('react')
const isDifferent = require('isdifferent')
const fetchHelper = require('@hacknlove/fetchhelper')

/**
 * Fetch a url periodically and update the value if changes
 * @param {array [url, options]} fethParameters parameter for call the fetch function
 * @package {*} first, first value, before real fetch is done
 * @param {function} interval, the interval between fetches
 */
function useEndpoint (fethParameters, first, interval = 3000) {
  const [value, set] = useState(() => {
    setTimeout(refresh, 0)
    return [first, undefined]
  })
  var cancelled = false

  async function refresh () {
    const response = await fetchHelper(fethParameters)
    if (cancelled) {
      return
    }
    if (isDifferent(value, response)) {
      return set(response)
    }
  }

  useEffect(() => {
    return () => {
      cancelled = true
    }
  }, [])

  useEffect(() => {
    var i = setInterval(() => {
      refresh()
    }, interval)
    return () => {
      clearInterval(i)
    }
  }, [value])

  return [value[0], refresh, value[1]]
}

module.exports = useEndpoint
