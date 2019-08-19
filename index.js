const { useState, useEffect } = require('react')
const isDifferent = require('isdifferent')
const fetchHelper = require('@hacknlove/fetchhelper')
/**
 * Does the fetch and sets the new value if isDifferent
 * @param {array [url, options]} fethParameters parameter for call the fetch function
 * @param {*} value current value
 * @param {function} set function to set the new value
 */

function checkEndPoint (fethParameters, value, set) {
  return fetchHelper(fethParameters).then(response => {
    if (isDifferent(value, response)) {
      set(response)
      return true
    }
  }).catch(error => {
    throw error
  })
}

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

  function refresh () {
    checkEndPoint(fethParameters, value, set)
  }

  useEffect(() => {
    var i = setInterval(refresh, interval)

    return () => {
      clearInterval(i)
    }
  }, [value])

  return [value[0], refresh, value[1]]
}

module.exports = useEndpoint
