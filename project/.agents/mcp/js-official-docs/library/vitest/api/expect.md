---
title: "expect (part 1 of 5)"
tool: "vitest"
version: "5.1"
source: "https://github.com/vitest-dev/vitest/blob/7a3844954d8753fc0d5bed76a96ffd3a21716c22/docs/api/expect.md"
commit: "7a3844954d8753fc0d5bed76a96ffd3a21716c22"
license: "MIT"
---

# expect

The following types are used in the type signatures below

```ts
type Awaitable<T> = T | PromiseLike<T>
```

`expect` is used to create assertions. In this context `assertions` are functions that can be called to assert a statement. Vitest provides `chai` assertions by default and also `Jest` compatible assertions built on top of `chai`. Since Vitest 4.1, for spy/mock testing, Vitest also provides Chai-style assertions (e.g., `expect(spy).to.have.been.called()`) alongside Jest-style assertions (e.g., `expect(spy).toHaveBeenCalled()`). Unlike `Jest`, Vitest supports a message as the second argument - if the assertion fails, the error message will be equal to it.

```ts
export interface ExpectStatic
  extends Chai.ExpectStatic,
  Matchers<any>,
  AsymmetricMatchersContaining {
  <T>(actual: T, message?: string): Assertion<void, T>
  extend: (expects: MatchersObject) => void
  anything: () => any
  any: (constructor: unknown) => any
  getState: () => MatcherState
  setState: (state: Partial<MatcherState>) => void
  not: AsymmetricMatchersContaining
}
```

For example, this code asserts that an `input` value is equal to `2`. If it's not, the assertion will throw an error, and the test will fail.

```ts
import { expect } from 'vitest'

const input = Math.sqrt(4)

expect(input).to.equal(2) // chai API
expect(input).toBe(2) // jest API
```

Technically this example doesn't use `test` function, so in the console you will see Node.js error instead of Vitest output. To learn more about `test`, please read Test API Reference.

Also, `expect` can be used statically to access matcher functions, described later, and more.

**Warning:**
`expect` has no effect on testing types, if the expression doesn't have a type error. If you want to use Vitest as type checker, use `expectTypeOf` or `assertType`.

## assert

- **Type:** `Chai.AssertStatic`

Vitest reexports chai's `assert` API as `expect.assert` for convenience. You can see the supported methods on the Assert API page.

This is especially useful if you need to narrow down the type, since `expect.to*` methods do not support that:

```ts
interface Cat {
  __type: 'Cat'
  mew(): void
}
interface Dog {
  __type: 'Dog'
  bark(): void
}
type Animal = Cat | Dog

const animal: Animal = { __type: 'Dog', bark: () => {} }

expect.assert(animal.__type === 'Dog')
// does not show a type error!
expect(animal.bark()).toBeUndefined()
```

**Tip:**
Note that `expect.assert` also supports other type-narrowing methods (like `assert.isDefined`, `assert.exists` and so on).

## soft

- **Type:** `ExpectStatic & (actual: any) => Assertions`

`expect.soft` functions similarly to `expect`, but instead of terminating the test execution upon a failed assertion, it continues running and marks the failure as a test failure. All errors encountered during the test will be displayed until the test is completed.

```ts
import { expect, test } from 'vitest'

test('expect.soft test', () => {
  expect.soft(1 + 1).toBe(3) // mark the test as fail and continue
  expect.soft(1 + 2).toBe(4) // mark the test as fail and continue
})
// reporter will report both errors at the end of the run
```

It can also be used with `expect`. if `expect` assertion fails, the test will be terminated and all errors will be displayed.

```ts
import { expect, test } from 'vitest'

test('expect.soft test', () => {
  expect.soft(1 + 1).toBe(3) // mark the test as fail and continue
  expect(1 + 2).toBe(4) // failed and terminate the test, all previous errors will be output
  expect.soft(1 + 3).toBe(5) // do not run
})
```

**Warning:**
`expect.soft` can only be used inside the `test` function.

## poll

```ts
interface ExpectPoll extends ExpectStatic {
  (actual: (options: { signal: AbortSignal }) => T, options?: { interval?: number; timeout?: number; message?: string }): Promise<Assertions<Awaited<T>>>
}
```

`expect.poll` reruns the _assertion_ until it is succeeded. You can configure how often Vitest retries and how long it waits by setting `interval` and `timeout` options. The `timeout` applies to the whole polling operation, including pending callback and async matcher execution.

The callback receives an `AbortSignal` that is aborted when the poll timeout is reached.

If an error is thrown inside the `expect.poll` callback, Vitest will retry again until the timeout runs out.

The `message` option describes what the poll waits for. If the poll fails, Vitest adds the message to the start of the error. The message also names the step in the trace timeline.

```ts
await expect.poll(() => queue.count(), { message: 'queue drained' }).toBe(0)
// AssertionError: queue drained: expected 3 to be 0 // Object.is equality
```

If `vi.useFakeTimers` is used, `expect.poll` automatically calls `vi.advanceTimersByTime(interval)` after every failed attempt. See Automatic Advancing for details.

```ts
import { expect, test } from 'vitest'

test('element exists', async () => {
  asyncInjectElement()

  await expect.poll(() => document.querySelector('.element')).toBeTruthy()
})
```

**Warning:**
`expect.poll` makes every assertion asynchronous, so you need to await it. Since Vitest 3, if you forget to await it, the test will fail with a warning to do so.

`expect.poll` doesn't work with several matchers:

- Snapshot matchers are not supported because they will always succeed. If your condition is flaky, consider using `vi.waitFor` instead to resolve it first:

```ts
import { expect, vi } from 'vitest'

const flakyValue = await vi.waitFor(() => getFlakyValue())
expect(flakyValue).toMatchSnapshot()
```

- `.resolves` and `.rejects` are not supported. `expect.poll` already awaits the condition if it's asynchronous.
- `toThrow` and its aliases are not supported because the `expect.poll` condition is always resolved before the matcher gets the value

## not

Using `not` will negate the assertion. For example, this code asserts that an `input` value is not equal to `2`. If it's equal, the assertion will throw an error, and the test will fail.

```ts
import { expect, test } from 'vitest'

const input = Math.sqrt(16)

expect(input).not.to.equal(2) // chai API
expect(input).not.toBe(2) // jest API
```

## toBe

- **Type:** `(value: any) => Awaitable<void>`

`toBe` can be used to assert if primitives are equal or that objects share the same reference. It is equivalent of calling `expect(Object.is(3, 3)).toBe(true)`. If the objects are not the same, but you want to check if their structures are identical, you can use `toEqual`.

For example, the code below checks if the trader has 13 apples.

```ts
import { expect, test } from 'vitest'

const stock = {
  type: 'apples',
  count: 13,
}

test('stock has 13 apples', () => {
  expect(stock.type).toBe('apples')
  expect(stock.count).toBe(13)
})

test('stocks are the same', () => {
  const refStock = stock // same reference

  expect(stock).toBe(refStock)
})
```

Try not to use `toBe` with floating-point numbers. Since JavaScript rounds them, `0.1 + 0.2` is not strictly `0.3`. To reliably assert floating-point numbers, use `toBeCloseTo` assertion.

## toBeCloseTo

- **Type:** `(value: number, numDigits?: number) => Awaitable<void>`

Use `toBeCloseTo` to compare floating-point numbers. The optional `numDigits` argument limits the number of digits to check _after_ the decimal point. The default for `numDigits` is 2. For example:

```ts
import { expect, test } from 'vitest'

test.fails('decimals are not equal in javascript', () => {
  expect(0.2 + 0.1).toBe(0.3) // 0.2 + 0.1 is 0.30000000000000004
})

test('decimals are rounded to 5 after the point', () => {
  // 0.2 + 0.1 is 0.30000 | "000000000004" removed
  expect(0.2 + 0.1).toBeCloseTo(0.3, 5)
  // nothing from 0.30000000000000004 is removed
  expect(0.2 + 0.1).not.toBeCloseTo(0.3, 50)
})
```

## toBeDefined

- **Type:** `() => Awaitable<void>`

`toBeDefined` asserts that the value is not equal to `undefined`. Useful use case would be to check if function _returned_ anything.

```ts
import { expect, test } from 'vitest'

function getApples() {
  return 3
}

test('function returned something', () => {
  expect(getApples()).toBeDefined()
})
```

## toBeUndefined

- **Type:** `() => Awaitable<void>`

Opposite of `toBeDefined`, `toBeUndefined` asserts that the value _is_ equal to `undefined`. Useful use case would be to check if function hasn't _returned_ anything.

```ts
import { expect, test } from 'vitest'

function getApplesFromStock(stock: string) {
  if (stock === 'Bill') {
    return 13
  }
}

test('mary doesn\'t have a stock', () => {
  expect(getApplesFromStock('Mary')).toBeUndefined()
})
```

## toBeTruthy

- **Type:** `() => Awaitable<void>`

`toBeTruthy` asserts that the value is true when converted to boolean. Useful if you don't care for the value, but just want to know it can be converted to `true`.

For example, having this code you don't care for the return value of `stocks.getInfo` - it maybe a complex object, a string, or anything else. The code will still work.

```ts
import { Stocks } from './stocks.js'

const stocks = new Stocks()
stocks.sync('Bill')
if (stocks.getInfo('Bill')) {
  stocks.sell('apples', 'Bill')
}
```

So if you want to test that `stocks.getInfo` will be truthy, you could write:

```ts
import { expect, test } from 'vitest'
import { Stocks } from './stocks.js'

const stocks = new Stocks()

test('if we know Bill stock, sell apples to him', () => {
  stocks.sync('Bill')
  expect(stocks.getInfo('Bill')).toBeTruthy()
})
```

Everything in JavaScript is truthy, except `false`, `null`, `undefined`, `NaN`, `0`, `-0`, `0n`, `""` and `document.all`.

## toBeFalsy

- **Type:** `() => Awaitable<void>`

`toBeFalsy` asserts that the value is false when converted to boolean. Useful if you don't care for the value, but just want to know if it can be converted to `false`.

For example, having this code you don't care for the return value of `stocks.stockFailed` - it may return any falsy value, but the code will still work.

```ts
import { Stocks } from './stocks.js'

const stocks = new Stocks()
stocks.sync('Bill')
if (!stocks.stockFailed('Bill')) {
  stocks.sell('apples', 'Bill')
}
```

So if you want to test that `stocks.stockFailed` will be falsy, you could write:

```ts
import { expect, test } from 'vitest'
import { Stocks } from './stocks.js'

const stocks = new Stocks()

test('if Bill stock hasn\'t failed, sell apples to him', () => {
  stocks.syncStocks('Bill')
  expect(stocks.stockFailed('Bill')).toBeFalsy()
})
```

Everything in JavaScript is truthy, except `false`, `null`, `undefined`, `NaN`, `0`, `-0`, `0n`, `""` and `document.all`.

## toBeNull

- **Type:** `() => Awaitable<void>`

`toBeNull` simply asserts if something is `null`. Alias for `.toBe(null)`.

```ts
import { expect, test } from 'vitest'

function apples() {
  return null
}

test('we don\'t have apples', () => {
  expect(apples()).toBeNull()
})
```

## toBeNullable

- **Type:** `() => Awaitable<void>`

`toBeNullable` simply asserts if something is nullable (`null` or `undefined`).

```ts
import { expect, test } from 'vitest'

function apples() {
  return null
}

function bananas() {
  return undefined
}

test('we don\'t have apples', () => {
  expect(apples()).toBeNullable()
})

test('we don\'t have bananas', () => {
  expect(bananas()).toBeNullable()
})
```

## toBeNaN

- **Type:** `() => Awaitable<void>`

`toBeNaN` simply asserts if something is `NaN`. Alias for `.toBe(NaN)`.

```ts
import { expect, test } from 'vitest'

let i = 0

function getApplesCount() {
  i++
  return i > 1 ? Number.NaN : i
}

test('getApplesCount has some unusual side effects...', () => {
  expect(getApplesCount()).not.toBeNaN()
  expect(getApplesCount()).toBeNaN()
})
```

## toBeOneOf

- **Type:** `(sample: Array<any> | Set<any>) => any`

`toBeOneOf` asserts if a value matches any of the values in the provided array or set. Values are compared with the same deep equality as `toEqual`.

**EXPERIMENTAL**
Providing a `Set` is an experimental feature and may change in a future release.

```ts
import { expect, test } from 'vitest'

test('fruit is one of the allowed values', () => {
  expect(fruit).toBeOneOf(['apple', 'banana', 'orange'])
})
```

The asymmetric matcher is particularly useful when testing optional properties that could be either `null` or `undefined`:

```ts
test('optional properties can be null or undefined', () => {
  const user = {
    firstName: 'John',
    middleName: undefined,
    lastName: 'Doe'
  }

  expect(user).toEqual({
    firstName: expect.any(String),
    middleName: expect.toBeOneOf([expect.any(String), undefined]),
    lastName: expect.any(String),
  })
})
```

**Tip:**
You can use `expect.not` with this matcher to ensure a value does NOT match any of the provided options.

## toBeTypeOf

- **Type:** `(c: 'bigint' | 'boolean' | 'function' | 'number' | 'object' | 'string' | 'symbol' | 'undefined') => Awaitable<void>`

`toBeTypeOf` asserts if an actual value is of type of received type.

```ts
import { expect, test } from 'vitest'

const actual = 'stock'

test('stock is type of string', () => {
  expect(actual).toBeTypeOf('string')
})
```

**Warning:**
`toBeTypeOf` uses the native `typeof` operator under the hood with all its quirks, most notably that the value `null` has type `object`.

```ts
test('toBeTypeOf cannot check for null or array', () => {
  expect(null).toBeTypeOf('object')
  expect([]).toBeTypeOf('object')
})
```

## toBeInstanceOf

- **Type:** `(c: any) => Awaitable<void>`

`toBeInstanceOf` asserts if an actual value is instance of received class.

```ts
import { expect, test } from 'vitest'
import { Stocks } from './stocks.js'

const stocks = new Stocks()

test('stocks are instance of Stocks', () => {
  expect(stocks).toBeInstanceOf(Stocks)
})
```

## toBeGreaterThan

- **Type:** `(n: number | bigint) => Awaitable<void>`

`toBeGreaterThan` asserts if actual value is greater than received one. Equal values will fail the test.

```ts
import { expect, test } from 'vitest'
import { getApples } from './stocks.js'

test('have more then 10 apples', () => {
  expect(getApples()).toBeGreaterThan(10)
})
```

## toBeGreaterThanOrEqual

- **Type:** `(n: number | bigint) => Awaitable<void>`

`toBeGreaterThanOrEqual` asserts if actual value is greater than received one or equal to it.

```ts
import { expect, test } from 'vitest'
import { getApples } from './stocks.js'

test('have 11 apples or more', () => {
  expect(getApples()).toBeGreaterThanOrEqual(11)
})
```

## toBeLessThan

- **Type:** `(n: number | bigint) => Awaitable<void>`

`toBeLessThan` asserts if actual value is less than received one. Equal values will fail the test.

```ts
import { expect, test } from 'vitest'
import { getApples } from './stocks.js'

test('have less then 20 apples', () => {
  expect(getApples()).toBeLessThan(20)
})
```
