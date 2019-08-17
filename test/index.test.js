import test from 'ava'
import React from 'react'
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import useendpoint from '../index'

const http = require('http')

Enzyme.configure({ adapter: new Adapter() })

function Test (props) {
  const { callback, url } = props
  const response = useendpoint(url)
  callback(response)

  return (
    <div>
      Hola
    </div>
  )
}


test.cb('useendpoint returns and array with 3 elements', t=> {
  function callback (params) {
    t.is(params.length, 3)
    t.end()
  }

  shallow(<Test callback={callback} url="http://ihopethisurldoesnotexists.notexists"/>)
})

test.cb('first element of response is an object', t=> {
  function callback (params) {
    t.is(params[0], 'culo')
    t.end()
  }

  shallow(<Test callback={callback} url="http://ihopethisurldoesnotexists.notexists"/>)

})
