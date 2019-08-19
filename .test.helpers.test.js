import test from 'ava'
import { defunction, choose, fetchs } from './test.helpers'
const fetchHelper = require('@hacknlove/fetchhelper')

test('defunction return value if value is not a function', t => {
  t.deepEqual(defunction({ bre: 'zctx' }), { bre: 'zctx' })
})

test('defunction return value() if value is a function', t => {
  t.deepEqual(defunction(() => ({ ws: 'n' })), { ws: 'n' })
})

test('choose rejects if fetch is undefined', t => {
  choose(
    t.fail,
    t.pass,
    undefined
  )
})

test('choose rejects if fetch is {error: ...}', t => {
  choose(
    t.fail,
    (reject) => {
      t.is(reject, 'wer')
    },
    {
      error: 'wer'
    }
  )
})

test('choose resolve {ok: false, ...} if fetch is {reject: ...}', t => {
  choose(
    (resolve) => {
      t.is(resolve.ok, false)
      t.deepEqual(resolve.json(), { rty: 'fghj' })
    },
    t.fail,
    {
      reject: { rty: 'fghj' }
    }
  )
})

test('choose resolve {ok: true, ...} if fetch is {...}', t => {
  choose(
    (resolve) => {
      t.is(resolve.ok, true)
      t.deepEqual(resolve.json(), { rerty: 'fiughj' })
    },
    t.fail,
    { rerty: 'fiughj' }
  )
})

test.only('fetchs increments by 1 each time fetchHelper.fetch is called', async t => {
  fetchs(['a', 'b', 'c', 'd', 'e', 'f'])

  t.is(fetchs.i, 0)
  t.is((await fetchHelper.fetch()).json(), 'a')
  t.is(fetchs.i, 1)
  t.is((await fetchHelper.fetch()).json(), 'b')
  t.is(fetchs.i, 2)
  t.is((await fetchHelper.fetch()).json(), 'c')
  t.is(fetchs.i, 3)
  t.is((await fetchHelper.fetch()).json(), 'd')
  t.is(fetchs.i, 4)
  t.is((await fetchHelper.fetch()).json(), 'e')
  t.is(fetchs.i, 5)
  t.is((await fetchHelper.fetch()).json(), 'f')
  t.is(fetchs.i, 6)
})
