
import test from 'ava'
import { fetchs } from './test.helpers'
import { renderHook } from '@testing-library/react-hooks'
const useendpoint = require('./index')

test.afterEach.always.cb(t => {
  t.context.unmount()
  setTimeout(t.end, 500)
})

test.serial('primer valor es first', async t => {
  fetchs('1'.repeat(100).split(''))

  const {
    result,
    unmount
  } = renderHook(() => useendpoint('url', 0, 500))
  t.context.unmount = unmount

  t.is(result.current[0], 0)
})

test.serial('llama a fetch', async t => {
  fetchs([
    2,
    3,
    4
  ])

  t.is(fetchs.i, 0)
  const {
    result,
    waitForNextUpdate,
    unmount
  } = renderHook(() => useendpoint('url', 1, 500))
  t.context.unmount = unmount

  t.is(fetchs.i, 0)
  t.is(result.current[0], 1)
  await waitForNextUpdate()
  t.is(fetchs.i, 1)
  t.is(result.current[0], 2)
  await waitForNextUpdate()
  t.is(result.current[0], 3)
  await waitForNextUpdate()
  t.is(result.current[0], 4)
})

test.serial('le pasa a fetch los parámetros', async t => {
  fetchs([
    (url, options) => {
      return [url, options]
    },
    (url, options) => {
      return [options, url]
    },
    4
  ])

  const {
    result,
    waitForNextUpdate,
    unmount
  } = renderHook(() => useendpoint(['url', { options: true }], 1, 500))
  t.context.unmount = unmount

  t.is(result.current[0], 1)
  await waitForNextUpdate()
  t.deepEqual(result.current[0], ['url', { options: true }])
  await waitForNextUpdate()
  t.deepEqual(result.current[0], [{ options: true }, 'url'])
})

test.serial('si fetch devuelve lo mismo, no recarga', async t => {
  fetchs([
    1,
    1,
    1,
    1,
    1,
    2
  ])

  const {
    result,
    waitForNextUpdate,
    unmount
  } = renderHook(() => useendpoint(['url', { options: true }], 1, 500))
  t.context.unmount = unmount

  t.is(result.current[0], 1)
  await waitForNextUpdate()
  t.is(result.current[0], 2)
  t.is(fetchs.i, 6)
})

test.serial('si se llama a refresh, recarga', async t => {
  t.timeout(1000)
  fetchs([
    1,
    2,
    3,
    4,
    5,
    6
  ])

  const {
    result,
    waitForNextUpdate,
    unmount
  } = renderHook(() => useendpoint(['url', { options: true }], 1, 60000))
  t.context.unmount = unmount
  t.is(result.current[0], 1)
  result.current[1]()
  await waitForNextUpdate()
  t.is(result.current[0], 2)
  t.is(fetchs.i, 2)
})
