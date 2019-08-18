const { useState, useEffect } = require('react')
const isDifferent = require('isdifferent')
const fetchHelper = require('@hacknlove/fetchhelper')
/**
 * Does the fetch and sets the new value if isDifferent
 * @param {array [url, options]} fethParameters parameter for call the fetch function
 * @param {*} value current value
 * @param {function} set function to set the new value
 */
async function checkEndPoint (fethParameters, value, set) {
  const response = await fetchHelper(fethParameters)
  if (isDifferent(value, response)) {
    set(value)
    return true
  }
}

/**
 * Fetch a url periodically and update the value if changes
 * @param {array [url, options]} fethParameters parameter for call the fetch function
 * @param {*} first First value
 * @param {function} interval, the interval between fetches
 */
function useEndpoint (fethParameters, first, interval = 3000) {
  const [value, set] = useState([first, undefined])

  useState(() => {
    if (!checkEndPoint(fethParameters, value, set)) {
      set
    }
  })

  function refresh () {
    checkEndPoint(fethParameters, value, set)
  }

  useEffect(() => {
    var i = setInterval(refresh, interval)
    return () => clearInterval(i)
  }, [value])

  return [value[0], refresh, value[1]]
}

module.exports = useEndpoint
