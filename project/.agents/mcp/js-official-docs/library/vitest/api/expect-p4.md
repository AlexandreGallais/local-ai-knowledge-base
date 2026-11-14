---
title: "expect (part 4 of 5)"
tool: "vitest"
version: "5.1"
source: "https://github.com/vitest-dev/vitest/blob/7a3844954d8753fc0d5bed76a96ffd3a21716c22/docs/api/expect.md"
commit: "7a3844954d8753fc0d5bed76a96ffd3a21716c22"
license: "MIT"
---

# expect (part 4 of 5)

## calledOnceWith <Version>4.1.0</Version> {#calledoncewith}

- **Type:** `(...args: any[]) => void`

Chai-style assertion that checks if a spy was called exactly once with specific arguments. This is equivalent to `toHaveBeenCalledExactlyOnceWith(...args)`.

```ts
import { expect, test, vi } from 'vitest'

test('spy called once with arguments', () => {
  const spy = vi.fn()

  spy('apple', 10)

  expect(spy).to.have.been.calledOnceWith('apple', 10)
})
```

## calledTwice <Version>4.1.0</Version> {#calledtwice}

- **Type:** `Assertion` (property, not a method)

Chai-style assertion that checks if a spy was called exactly twice. This is equivalent to `toHaveBeenCalledTimes(2)`.

**Tip:**
This is a property assertion following sinon-chai conventions. Access it without parentheses: `expect(spy).to.have.been.calledTwice`

```ts
import { expect, test, vi } from 'vitest'

test('spy called twice', () => {
  const spy = vi.fn()

  spy()
  spy()

  expect(spy).to.have.been.calledTwice
})
```

## calledThrice <Version>4.1.0</Version> {#calledthrice}

- **Type:** `Assertion` (property, not a method)

Chai-style assertion that checks if a spy was called exactly three times. This is equivalent to `toHaveBeenCalledTimes(3)`.

**Tip:**
This is a property assertion following sinon-chai conventions. Access it without parentheses: `expect(spy).to.have.been.calledThrice`

```ts
import { expect, test, vi } from 'vitest'

test('spy called thrice', () => {
  const spy = vi.fn()

  spy()
  spy()
  spy()

  expect(spy).to.have.been.calledThrice
})
```

## lastCalledWith

- **Type:** `(...args: any[]) => void`

Chai-style assertion that checks if the last call to a spy was made with specific arguments. This is equivalent to `toHaveBeenLastCalledWith(...args)`.

```ts
import { expect, test, vi } from 'vitest'

test('spy last called with', () => {
  const spy = vi.fn()

  spy('apple', 10)
  spy('banana', 20)

  expect(spy).to.have.been.lastCalledWith('banana', 20)
})
```

## nthCalledWith

- **Type:** `(n: number, ...args: any[]) => void`

Chai-style assertion that checks if the nth call to a spy was made with specific arguments. This is equivalent to `toHaveBeenNthCalledWith(n, ...args)`.

```ts
import { expect, test, vi } from 'vitest'

test('spy nth called with', () => {
  const spy = vi.fn()

  spy('apple', 10)
  spy('banana', 20)
  spy('cherry', 30)

  expect(spy).to.have.been.nthCalledWith(2, 'banana', 20)
})
```

## returned <Version>4.1.0</Version> {#returned}

- **Type:** `(value: any) => void`

Chai-style assertion that checks if a spy returned a specific value at least once. This is equivalent to `toHaveReturnedWith(value)`.

```ts
import { expect, test, vi } from 'vitest'

test('spy returned', () => {
  const spy = vi.fn(() => 'value')

  spy()

  expect(spy).to.have.returned('value')
})
```

## returnedWith <Version>4.1.0</Version> {#returnedwith}

- **Type:** `(value: any) => void`

Chai-style assertion that checks if a spy returned a specific value at least once. This is equivalent to `toHaveReturnedWith(value)`.

```ts
import { expect, test, vi } from 'vitest'

test('spy returned with value', () => {
  const spy = vi.fn()
    .mockReturnValueOnce('apple')
    .mockReturnValueOnce('banana')

  spy()
  spy()

  expect(spy).to.have.returnedWith('apple')
  expect(spy).to.have.returnedWith('banana')
})
```

## returnedTimes <Version>4.1.0</Version> {#returnedtimes}

- **Type:** `(count: number) => void`

Chai-style assertion that checks if a spy returned successfully a specific number of times. This is equivalent to `toHaveReturnedTimes(count)`.

```ts
import { expect, test, vi } from 'vitest'

test('spy returned times', () => {
  const spy = vi.fn(() => 'result')

  spy()
  spy()
  spy()

  expect(spy).to.have.returnedTimes(3)
})
```

## lastReturnedWith

- **Type:** `(value: any) => void`

Chai-style assertion that checks if the last return value of a spy matches the expected value. This is equivalent to `toHaveLastReturnedWith(value)`.

```ts
import { expect, test, vi } from 'vitest'

test('spy last returned with', () => {
  const spy = vi.fn()
    .mockReturnValueOnce('apple')
    .mockReturnValueOnce('banana')

  spy()
  spy()

  expect(spy).to.have.lastReturnedWith('banana')
})
```

## nthReturnedWith

- **Type:** `(n: number, value: any) => void`

Chai-style assertion that checks if the nth return value of a spy matches the expected value. This is equivalent to `toHaveNthReturnedWith(n, value)`.

```ts
import { expect, test, vi } from 'vitest'

test('spy nth returned with', () => {
  const spy = vi.fn()
    .mockReturnValueOnce('apple')
    .mockReturnValueOnce('banana')
    .mockReturnValueOnce('cherry')

  spy()
  spy()
  spy()

  expect(spy).to.have.nthReturnedWith(2, 'banana')
})
```

## calledBefore <Version>4.1.0</Version> {#calledbefore}

- **Type:** `(mock: MockInstance, failIfNoFirstInvocation?: boolean) => void`

Chai-style assertion that checks if a spy was called before another spy. This is equivalent to `toHaveBeenCalledBefore(mock, failIfNoFirstInvocation)`.

```ts
import { expect, test, vi } from 'vitest'

test('spy called before another', () => {
  const spy1 = vi.fn()
  const spy2 = vi.fn()

  spy1()
  spy2()

  expect(spy1).to.have.been.calledBefore(spy2)
})
```

## calledAfter <Version>4.1.0</Version> {#calledafter}

- **Type:** `(mock: MockInstance, failIfNoFirstInvocation?: boolean) => void`

Chai-style assertion that checks if a spy was called after another spy. This is equivalent to `toHaveBeenCalledAfter(mock, failIfNoFirstInvocation)`.

```ts
import { expect, test, vi } from 'vitest'

test('spy called after another', () => {
  const spy1 = vi.fn()
  const spy2 = vi.fn()

  spy1()
  spy2()

  expect(spy2).to.have.been.calledAfter(spy1)
})
```

**Migration Guide**
For a complete guide on migrating from Mocha+Chai+Sinon to Vitest, see the Migration Guide.

## toSatisfy

- **Type:** `(predicate: (value: any) => boolean) => Awaitable<void>`

This assertion checks if a value satisfies a certain predicate.

```ts
import { describe, expect, it } from 'vitest'

const isOdd = (value: number) => value % 2 !== 0

describe('toSatisfy()', () => {
  it('pass with 0', () => {
    expect(1).toSatisfy(isOdd)
  })

  it('pass with negation', () => {
    expect(2).not.toSatisfy(isOdd)
  })
})
```

## resolves

- **Type:** `Promisify<Assertions>`

`resolves` is intended to remove boilerplate when asserting asynchronous code. Use it to unwrap value from the pending promise and assert its value with usual assertions. If the promise rejects, the assertion will fail.

It returns the same `Assertions` object, but all matchers now return `Promise`, so you would need to `await` it. Also works with `chai` assertions.

For example, if you have a function, that makes an API call and returns some data, you may use this code to assert its return value:

```ts
import { expect, test } from 'vitest'

async function buyApples() {
  return fetch('/buy/apples').then(r => r.json())
}

test('buyApples returns new stock id', async () => {
  // toEqual returns a promise now, so you HAVE to await it
  await expect(buyApples()).resolves.toEqual({ id: 1 }) // jest API
  await expect(buyApples()).resolves.to.equal({ id: 1 }) // chai API
})
```

**Warning:**
If the assertion is not awaited, the test will be marked as "failed" at the end of the test.

## rejects

- **Type:** `Promisify<Assertions>`

`rejects` is intended to remove boilerplate when asserting asynchronous code. Use it to unwrap reason why the promise was rejected, and assert its value with usual assertions. If the promise successfully resolves, the assertion will fail.

It returns the same `Assertions` object, but all matchers now return `Promise`, so you would need to `await` it. Also works with `chai` assertions.

For example, if you have a function that fails when you call it, you may use this code to assert the reason:

```ts
import { expect, test } from 'vitest'

async function buyApples(id) {
  if (!id) {
    throw new Error('no id')
  }
}

test('buyApples throws an error when no id provided', async () => {
  // toThrow returns a promise now, so you HAVE to await it
  await expect(buyApples()).rejects.toThrow('no id')
})
```

**Warning:**
If the assertion is not awaited, the test will be marked as "failed" at the end of the test.

## expect.assertions

- **Type:** `(count: number) => void`

After the test has passed or failed verify that a certain number of assertions was called during a test. A useful case would be to check if an asynchronous code was called.

For example, if we have a function that asynchronously calls two matchers, we can assert that they were actually called.

```ts
import { expect, test } from 'vitest'

async function doAsync(...cbs) {
  await Promise.all(
    cbs.map((cb, index) => cb({ index })),
  )
}

test('all assertions are called', async () => {
  expect.assertions(2)
  function callback1(data) {
    expect(data).toBeTruthy()
  }
  function callback2(data) {
    expect(data).toBeTruthy()
  }

  await doAsync(callback1, callback2)
})
```

**Warning:**
When using `assertions` with async concurrent tests, `expect` from the local Test Context must be used to ensure the right test is detected.

## expect.hasAssertions

- **Type:** `() => void`

After the test has passed or failed verify that at least one assertion was called during a test. A useful case would be to check if an asynchronous code was called.

For example, if you have a code that calls a callback, we can make an assertion inside a callback, but the test will always pass if we don't check if an assertion was called.

```ts
import { expect, test } from 'vitest'
import { db } from './db.js'

const cbs = []

function onSelect(cb) {
  cbs.push(cb)
}

// after selecting from db, we call all callbacks
function select(id) {
  return db.select({ id }).then((data) => {
    return Promise.all(
      cbs.map(cb => cb(data)),
    )
  })
}

test('callback was called', async () => {
  expect.hasAssertions()
  onSelect((data) => {
    // should be called on select
    expect(data).toBeTruthy()
  })
  // if not awaited, test will fail
  // if you don't have expect.hasAssertions(), test will pass
  await select(3)
})
```

## expect.unreachable

- **Type:** `(message?: string) => never`

This method is used to assert that a line should never be reached.

For example, if we want to test that `build()` throws due to receiving directories having no `src` folder, and also handle each error separately, we could do this:

```ts
import { expect, test } from 'vitest'

async function build(dir) {
  if (dir.includes('no-src')) {
    throw new Error(`${dir}/src does not exist`)
  }
}

const errorDirs = [
  'no-src-folder',
  // ...
]

test.each(errorDirs)('build fails with "%s"', async (dir) => {
  try {
    await build(dir)
    expect.unreachable('Should not pass build')
  }
  catch (err: any) {
    expect(err).toBeInstanceOf(Error)
    expect(err.stack).toContain('build')

    switch (dir) {
      case 'no-src-folder':
        expect(err.message).toBe(`${dir}/src does not exist`)
        break
      default:
        // to exhaust all error tests
        expect.unreachable('All error test must be handled')
        break
    }
  }
})
```

## expect.fail

- **Type:** `(message?: string) => never`

Explicitly forces a test failure with an optional custom message.

For example, you can use it inside a `try/catch` block to ensure an error was thrown:

```ts
import { expect, test } from 'vitest'

test('fails when error is not thrown', async () => {
  try {
    await performAction()
    expect.fail('Expected performAction to throw an error')
  }
  catch (error) {
    expect(error).toBeInstanceOf(CustomError)
  }
})
```

## expect.anything

- **Type:** `() => any`

This asymmetric matcher matches anything except `null` or `undefined`. Useful if you just want to be sure that a property exists with any value that's not either `null` or `undefined`.

```ts
import { expect, test } from 'vitest'

test('object has "apples" key', () => {
  expect({ apples: 22 }).toEqual({ apples: expect.anything() })
})
```

## expect.any

- **Type:** `(constructor: unknown) => any`

This asymmetric matcher, when used with an equality check, will return `true` only if the value is an instance of a specified constructor. Useful, if you have a value that is generated each time, and you only want to know that it exists with a proper type.

```ts
import { expect, test } from 'vitest'
import { generateId } from './generators.js'

test('"id" is a number', () => {
  expect({ id: generateId() }).toEqual({ id: expect.any(Number) })
})
```

## expect.closeTo {#expect-closeto}

- **Type:** `(expected: any, precision?: number) => any`

`expect.closeTo` is useful when comparing floating point numbers in object properties or array item. If you need to compare a number, please use `.toBeCloseTo` instead.

The optional `precision` argument limits the number of digits to check **after** the decimal point. For the default value `2`, the test criterion is `Math.abs(expected - received) < 0.005 (that is, 10 ** -2 / 2)`.

For example, this test passes with a precision of 5 digits:

```js
test('compare float in object properties', () => {
  expect({
    title: '0.1 + 0.2',
    sum: 0.1 + 0.2,
  }).toEqual({
    title: '0.1 + 0.2',
    sum: expect.closeTo(0.3, 5),
  })
})
```

## expect.arrayContaining

- **Type:** `<T>(expected: T[]) => any`

When used with an equality check, this asymmetric matcher will return `true` if the value is an array and contains specified items.

```ts
import { expect, test } from 'vitest'

test('basket includes fuji', () => {
  const basket = {
    varieties: [
      'Empire',
      'Fuji',
      'Gala',
    ],
    count: 3
  }
  expect(basket).toEqual({
    count: 3,
    varieties: expect.arrayContaining(['Fuji'])
  })
})
```

**Tip:**
You can use `expect.not` with this matcher to negate the expected value.

## expect.objectContaining

- **Type:** `(expected: any) => any`

When used with an equality check, this asymmetric matcher will return `true` if the value has a similar shape.

```ts
import { expect, test } from 'vitest'

test('basket has empire apples', () => {
  const basket = {
    varieties: [
      {
        name: 'Empire',
        count: 1,
      }
    ],
  }
  expect(basket).toEqual({
    varieties: [
      expect.objectContaining({ name: 'Empire' }),
    ]
  })
})
```

**Tip:**
You can use `expect.not` with this matcher to negate the expected value.
