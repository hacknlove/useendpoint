import test from 'ava'
import React from 'react'
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

const fetchHelper = require('@hacknlove/fetchhelper')
const useendpoint = require('./index')
Enzyme.configure({ adapter: new Adapter() })

function Test (props) {
  const { callback, fethParameters, first, interval } = props
  const response = useendpoint(fethParameters, first, interval)
  callback && callback(response)

  return (
    <div>
      Hola
    </div>
  )
}

function callbacks (array) {
  var i = 0

  return (response) => {
    console.log(i)
    console.log(array)
    console.log(array[i])
    array[i](response)
    i+=1
  }
}

test.cb('useendpoint pass the parameters to fecth', t=> {
  const url = 'url'
  const options = {
    foo: 'bar'
  }
  fetchHelper.fetch = (u, o) => {
    t.is(u, url)
    t.deepEqual(options, o)
    t.end()
    return Promise.reject(true)
  }

  shallow(<Test fethParameters={[url, options]}/>)
})

test.cb('first time response [first, function, undefined]', t=> {

  var callback = callbacks([
    function callback (response) {
      t.is(response.length, 3)
      t.is(response[0], 'foo')
      t.is(typeof response[1], 'function')
      t.is(response[2], undefined)
      t.end()
    }
  ])

  fetchHelper.fetch = (u, o) => {
    t.is(u, 'url')
    t.deepEqual(undefined, o)
    return Promise.reject({error: true})
  }

  shallow(<Test callback={callback} fethParameters="url" first="foo"/>)
})


test.cb.skip('first element of response is an object', t=> {

  var callbacks = [
    function callback (response) {
      t.is(response[0], 'foo')
      t.is(typeof response[1], 'function')
      t.is(response[2], undefined)
      t.end()
    },
    function callback (response) {
      t.is(response[0], null)
      t.is(typeof response[1], 'function')
      t.is(response[2], {error: true})
      t.end()
    }
  ]

  var i = 0

  function callback (response) {
    callbacks[i++](response)
  }

  fetchHelper.fetch = (u, o) => {
    t.is(u, 'url')
    t.deepEqual(undefined, o)
    return Promise.reject({error: true})
  }


  shallow(<Test callback={callback} fethParameters="url" first="foo"/>)
})
