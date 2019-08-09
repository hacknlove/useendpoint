# useendpoint

## Install
```
npm i @hacknlove/useendpoint
```

## Example
```javascript
import React from 'react'
import ReactDOM from 'react-dom'
import useendpoint from '@hacknlove/useendpoint'

function Example () {
  const [user, refresh, error] = useendpoint('https://jsonplaceholder.typicode.com/users/1', {}, 5000)

  if (!user || !user.name) {
    return null
  }
  return (
    <h1>Hello {user.name}</h1>
  )
}

ReactDOM.render(
  <Example/>,
  document.querySelector('#root')
)
```

## API

### `useendpoint(fetchOptions, first, interval)`


#### Parameters
* `fetchOptions` are the parameters that you want to pass to fetch. It could be just `url`, or an array with `[url, options]`
* `first` the initial value, until fetch is completed.
* `interval` miliseconds between fetchs

**warning** The interval starts again every component refresh

#### Return
Return `[value, refresh, error]`

* `value` The current value returned by fetch
* `refresh` function that force the fetch
* `error` The error returned by fetch, in that case.
