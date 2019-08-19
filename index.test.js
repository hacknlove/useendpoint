
import test from 'ava'
import { fetchs } from './test.helpers'
import { renderHook } from '@testing-library/react-hooks'
const useendpoint = require('./index')

test.serial('primer valor es first', async t => {
  fetchs('1'.repeat(100).split(''))

  const {
    result
  } = renderHook(() => useendpoint('url', 0, 50))
  t.is(result.current[0], 0)
})

test.serial.skip('llama a fetch', async t => {
  fetchs([
    2,
    3,
    4
  ])

  t.is(fetchs.i, 0)
  const {
    result,
    waitForNextUpdate
  } = renderHook(() => useendpoint('url', 1, 100))
  t.is(fetchs.i, 0)
  t.is(result.current[0], 1)
  await waitForNextUpdate()
  t.is(fetchs.i, 1)
  console.log(fetchs.i)
  t.is(result.current[0], 2)
  console.log(fetchs.i)
  await waitForNextUpdate()
  console.log(fetchs.i)
  t.is(result.current[0], 3)
  console.log(fetchs.i)
  await waitForNextUpdate()
  console.log(fetchs.i)
  t.is(result.current[0], 4)
})

// test.serial('le pasa a fetch los parámetros', async t => {
//   fetchs([
//     2,
//     (url, options) => {
//       return [url, options]
//     },
//     4
//   ])

//   const {
//     result,
//     waitForNextUpdate
//   } = renderHook(() => useendpoint(['url', { options: true }], 1, 50))

//   t.is(result.current[0], 1)
//   await waitForNextUpdate()
//   t.is(result.current[0], 2)
//   await waitForNextUpdate()
//   t.deepEqual(result.current[0], ['url', { options: true }])
//   await waitForNextUpdate()
//   t.is(result.current[0], 4)
// })
