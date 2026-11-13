---
title: "Mocks (part 2 of 2)"
tool: "vitest"
version: "5.1"
source: "https://github.com/vitest-dev/vitest/blob/7a3844954d8753fc0d5bed76a96ffd3a21716c22/docs/api/mock.md"
commit: "7a3844954d8753fc0d5bed76a96ffd3a21716c22"
license: "MIT"
---

# Mocks (part 2 of 2)

## mock.results

```ts
interface MockResultReturn<T> {
  type: 'return'
  /**
   * The value that was returned from the function.
   * If the function returned a Promise, then this will be the Promise, not its resolved value.
   */
  value: T
}

interface MockResultIncomplete {
  type: 'incomplete'
  value: undefined
}

interface MockResultThrow {
  type: 'throw'
  /**
   * An error that was thrown during function execution.
   */
  value: any
}

type MockResult<T>
  = | MockResultReturn<T>
    | MockResultThrow
    | MockResultIncomplete

const results: MockResult<ReturnType<T>>[]
```

This is an array containing all values that were `returned` from the function. One item of the array is an object with properties `type` and `value`. Available types are:

- `'return'` - function returned without throwing.
- `'throw'` - function threw a value.
- `'incomplete'` - the function did not finish running yet.

The `value` property contains the returned value or thrown error. If the function returned a `Promise`, then `result` will always be `'return'` even if the promise was rejected.

```js
const fn = vi.fn()
  .mockReturnValueOnce('result')
  .mockImplementationOnce(() => { throw new Error('thrown error') })

const result = fn() // returned 'result'

try {
  fn() // threw Error
}
catch {}

fn.mock.results === [
  // first result
  {
    type: 'return',
    value: 'result',
  },
  // last result
  {
    type: 'throw',
    value: Error,
  },
]
```

## mock.settledResults

```ts
interface MockSettledResultIncomplete {
  type: 'incomplete'
  value: undefined
}

interface MockSettledResultFulfilled<T> {
  type: 'fulfilled'
  value: T
}

interface MockSettledResultRejected {
  type: 'rejected'
  value: any
}

export type MockSettledResult<T>
  = | MockSettledResultFulfilled<T>
    | MockSettledResultRejected
    | MockSettledResultIncomplete

const settledResults: MockSettledResult<Awaited<ReturnType<T>>>[]
```

An array containing all values that were resolved or rejected by the function.

If the function returned non-promise values, the `value` will be kept as is, but the `type` will still say `fulfilled` or `rejected`.

Until the value is resolved or rejected, the `settledResult` type will be `incomplete`.

```js
const fn = vi.fn().mockResolvedValueOnce('result')

const result = fn()

fn.mock.settledResults === [
  {
    type: 'incomplete',
    value: undefined,
  },
]

await result

fn.mock.settledResults === [
  {
    type: 'fulfilled',
    value: 'result',
  },
]
```

## mock.invocationCallOrder

```ts
const invocationCallOrder: number[]
```

This property returns the order of the mock function's execution. It is an array of numbers that are shared between all defined mocks.

```js
const fn1 = vi.fn()
const fn2 = vi.fn()

fn1()
fn2()
fn1()

fn1.mock.invocationCallOrder === [1, 3]
fn2.mock.invocationCallOrder === [2]
```

## mock.contexts

```ts
type MockProcedureContext<T> = T extends new (...args: any[]) => any
  ? InstanceType<T>
  : ThisParameterType<T>

const contexts: MockProcedureContext<T>[]
```

This property is an array of `this` values used during each call to the mock function. If the mock was called with the `new` keyword, the value is the same as in `mock.instances`.

```js
const fn = vi.fn()
const context = {}

fn.apply(context)
fn.call(context)

fn.mock.contexts[0] === context
fn.mock.contexts[1] === context
```

## mock.instances

```ts
const instances: MockProcedureContext<T>[]
```

This property is an array with one value for each call to the mock function. If the mock was called with the `new` keyword, the value is the object that `new` returned, or `undefined` if the constructor threw an error. Otherwise, the value is the context (`this`) of the call, the same as in `mock.contexts`.

```js
const MyClass = vi.fn()
const context = {}

const a = new MyClass()
MyClass.call(context)

MyClass.mock.instances[0] === a
MyClass.mock.instances[1] === context
```

If the implementation returns an object from the constructor, `mock.instances` stores that object:

```js
const Spy = vi.fn(function () {
  return { method: vi.fn() }
})
const a = new Spy()

Spy.mock.instances[0] === a
Spy.mock.results[0].value === a
```
