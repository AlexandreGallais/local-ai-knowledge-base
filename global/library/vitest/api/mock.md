---
title: "Mocks (part 1 of 2)"
tool: "vitest"
version: "5.1"
source: "https://github.com/vitest-dev/vitest/blob/7a3844954d8753fc0d5bed76a96ffd3a21716c22/docs/api/mock.md"
commit: "7a3844954d8753fc0d5bed76a96ffd3a21716c22"
license: "MIT"
---

# Mocks

You can create a mock function or a class to track its execution with the `vi.fn` method. If you want to track a property on an already created object, you can use the `vi.spyOn` method:

```js
import { vi } from 'vitest'

const fn = vi.fn()
fn('hello world')
fn.mock.calls[0] === ['hello world']

const market = {
  getApples: () => 100
}

const getApplesSpy = vi.spyOn(market, 'getApples')
market.getApples()
getApplesSpy.mock.calls.length === 1
```

You should use mock assertions (e.g., `toHaveBeenCalled`) on `expect` to assert mock results. This API reference describes available properties and methods to manipulate mock behavior.

**IMPORTANT**
Vitest spies inherit implementation's `length` property when initialized, but it doesn't override it if the implementation was changed later:

::: code-group

```ts
const fn = vi.fn((arg1) => {})
fn.length // == 1

fn.mockImplementation(() => {})
fn.length // == 1
```

```ts
const example = {
  fn(arg1, arg2) {
    // ...
  }
}

const fn = vi.spyOn(example, 'fn')
fn.length // == 2

fn.mockImplementation(() => {})
fn.length // == 2
```

**Tip:**
The custom function implementation in the types below is marked with a generic `<T>`.

**Class Support {#class-support}**
The `mockReturnValue`, `mockReturnValueOnce`, `mockResolvedValue`, `mockResolvedValueOnce`, `mockRejectedValue` and `mockRejectedValueOnce` methods cannot be used when the mock is called with the `new` keyword. Class constructors have unintuitive behaviour regarding the return value:

```ts
const CorrectDogClass = vi.fn(class {
  constructor(public name: string) {}
})

const IncorrectDogClass = vi.fn(class {
  constructor(public name: string) {
    return { name }
  }
})

const Marti = new CorrectDogClass('Marti')
const Newt = new IncorrectDogClass('Newt')

Marti instanceof CorrectDogClass // ✅ true
Newt instanceof IncorrectDogClass // ❌ false!
```

Even though the shapes are the same, the _return value_ from the constructor is assigned to `Newt`, which is a plain object, not an instance of a mock. Vitest guards you against this behaviour in these methods (but not in `mockImplementation`!) and throws an error instead.

If you need to mock constructed instance of a class, consider using the `class` syntax with `mockImplementation` instead:

```ts
mock.mockReturnValue({ hello: () => 'world' }) // [!code --]
mock.mockImplementation(class { hello = () => 'world' }) // [!code ++]
```

If you need to test the behaviour where this is a valid use case, you can use `mockImplementation` with a `constructor`:

```ts
mock.mockImplementation(class {
  constructor(name: string) {
    return { name }
  }
})
```

## getMockImplementation

```ts
function getMockImplementation(): T | undefined
```

Returns the current mock implementation if there is one. If an implementation was queued with `mockImplementationOnce`, it returns the first queued implementation instead.

If the mock was created with `vi.fn`, it will use the provided method as the mock implementation.

If the mock was created with `vi.spyOn`, it will return `undefined` unless a custom implementation is provided.

## getMockName

```ts
function getMockName(): string
```

Use it to return the name assigned to the mock with the `.mockName(name)` method. By default, `vi.fn()` mocks will return `'vi.fn()'`, while spies created with `vi.spyOn` will keep the original name.

## mockClear

```ts
function mockClear(): Mock<T>
```

Clears all information about every call. After calling it, all properties on `.mock` will return to their initial state. This method does not reset implementations. It is useful for cleaning up mocks between different assertions.

```ts
const person = {
  greet: (name: string) => `Hello ${name}`,
}
const spy = vi.spyOn(person, 'greet').mockImplementation(() => 'mocked')
expect(person.greet('Alice')).toBe('mocked')
expect(spy.mock.calls).toEqual([['Alice']])

// clear call history but keep mock implementation
spy.mockClear()
expect(spy.mock.calls).toEqual([])
expect(person.greet('Bob')).toBe('mocked')
expect(spy.mock.calls).toEqual([['Bob']])
```

To automatically call this method before each test, enable the `clearMocks` setting in the configuration.

## mockName

```ts
function mockName(name: string): Mock<T>
```

Sets the internal mock name. This is useful for identifying the mock when an assertion fails.

## mockImplementation

```ts
function mockImplementation(fn: T): Mock<T>
```

Accepts a function to be used as the mock implementation. TypeScript expects the arguments and return type to match those of the original function.

```ts
const mockFn = vi.fn().mockImplementation((apples: number) => apples + 1)
// or: vi.fn(apples => apples + 1);

const NelliesBucket = mockFn(0)
const BobsBucket = mockFn(1)

NelliesBucket === 1 // true
BobsBucket === 2 // true

mockFn.mock.calls[0][0] === 0 // true
mockFn.mock.calls[1][0] === 1 // true
```

If the implementation is a class, the mock's `prototype` is re-pointed to the implementation's prototype, so constructed instances see its prototype methods and pass `instanceof` checks against it. See Mocking Classes for details.

## mockImplementationOnce

```ts
function mockImplementationOnce(fn: T): Mock<T>
```

Accepts a function to be used as the mock implementation. TypeScript expects the arguments and return type to match those of the original function. This method can be chained to produce different results for multiple function calls.

```ts
const myMockFn = vi
  .fn()
  .mockImplementationOnce(() => true) // 1st call
  .mockImplementationOnce(() => false) // 2nd call

myMockFn() // 1st call: true
myMockFn() // 2nd call: false
```

When the mocked function runs out of implementations, it will invoke the default implementation set with `vi.fn(() => defaultValue)` or `.mockImplementation(() => defaultValue)` if they were called:

```ts
const myMockFn = vi
  .fn(() => 'default')
  .mockImplementationOnce(() => 'first call')
  .mockImplementationOnce(() => 'second call')

// 'first call', 'second call', 'default', 'default'
console.log(myMockFn(), myMockFn(), myMockFn(), myMockFn())
```

## withImplementation

```ts
function withImplementation(
  fn: T,
  cb: () => void
): Mock<T>
function withImplementation(
  fn: T,
  cb: () => Promise<void>
): Promise<Mock<T>>
```

Overrides the original mock implementation temporarily while the callback is being executed.

```js
const myMockFn = vi.fn(() => 'original')

myMockFn.withImplementation(() => 'temp', () => {
  myMockFn() // 'temp'
})

myMockFn() // 'original'
```

Can be used with an asynchronous callback. The method has to be awaited to use the original implementation afterward.

```ts
test('async callback', async () => {
  const myMockFn = vi.fn(() => 'original')

  // We await this call since the callback is async
  await myMockFn.withImplementation(
    () => 'temp',
    async () => {
      myMockFn() // 'temp'
    },
  )

  myMockFn() // 'original'
})
```

Note that this method takes precedence over the `mockImplementationOnce`.

## mockRejectedValue

```ts
function mockRejectedValue(value: unknown): Mock<T>
```

Accepts an error that will be rejected when an async function is called.

```ts
const asyncMock = vi.fn().mockRejectedValue(new Error('Async error'))

await asyncMock() // throws Error<'Async error'>
```

## mockRejectedValueOnce

```ts
function mockRejectedValueOnce(value: unknown): Mock<T>
```

Accepts a value that will be rejected during the next function call. If chained, each consecutive call will reject the specified value.

```ts
const asyncMock = vi
  .fn()
  .mockResolvedValueOnce('first call')
  .mockRejectedValueOnce(new Error('Async error'))

await asyncMock() // 'first call'
await asyncMock() // throws Error<'Async error'>
```

## mockReset

```ts
function mockReset(): Mock<T>
```

Does what `mockClear` does and resets the mock implementation. This also resets all "once" implementations.

Note that resetting a mock from `vi.fn()` will set the implementation to an empty function that returns `undefined`.
Resetting a mock from `vi.fn(impl)` will reset the implementation to `impl`.

The mock's `prototype` chain follows along: it reverts to the original class for `vi.fn(impl)` and `vi.spyOn()`, and to a plain object for `vi.fn()`, so instances constructed after the reset no longer pass `instanceof` checks against a previously set class implementation.

This is useful when you want to reset a mock to its original state.

```ts
const person = {
  greet: (name: string) => `Hello ${name}`,
}
const spy = vi.spyOn(person, 'greet').mockImplementation(() => 'mocked')
expect(person.greet('Alice')).toBe('mocked')
expect(spy.mock.calls).toEqual([['Alice']])

// clear call history and reset implementation, but method is still spied
spy.mockReset()
expect(spy.mock.calls).toEqual([])
expect(person.greet).toBe(spy)
expect(person.greet('Bob')).toBe('Hello Bob')
expect(spy.mock.calls).toEqual([['Bob']])
```

To automatically call this method before each test, enable the `mockReset` setting in the configuration.

## mockRestore

```ts
function mockRestore(): void
```

Does what `mockReset` does and restores the original descriptors of spied-on objects, if the mock was created with `vi.spyOn`.

`mockRestore` on a `vi.fn()` mock is identical to `mockReset`.

```ts
const person = {
  greet: (name: string) => `Hello ${name}`,
}
const spy = vi.spyOn(person, 'greet').mockImplementation(() => 'mocked')
expect(person.greet('Alice')).toBe('mocked')
expect(spy.mock.calls).toEqual([['Alice']])

// clear call history and restore spied object method
spy.mockRestore()
expect(spy.mock.calls).toEqual([])
expect(person.greet).not.toBe(spy)
expect(person.greet('Bob')).toBe('Hello Bob')
expect(spy.mock.calls).toEqual([])
```

To automatically call this method before each test, enable the `restoreMocks` setting in the configuration.

## mockResolvedValue

```ts
function mockResolvedValue(value: Awaited<ReturnType<T>>): Mock<T>
```

Accepts a value that will be resolved when the async function is called. TypeScript will only accept values that match the return type of the original function.

```ts
const asyncMock = vi.fn().mockResolvedValue(42)

await asyncMock() // 42
```

## mockResolvedValueOnce

```ts
function mockResolvedValueOnce(value: Awaited<ReturnType<T>>): Mock<T>
```

Accepts a value that will be resolved during the next function call. TypeScript will only accept values that match the return type of the original function. If chained, each consecutive call will resolve the specified value.

```ts
const asyncMock = vi
  .fn()
  .mockResolvedValue('default')
  .mockResolvedValueOnce('first call')
  .mockResolvedValueOnce('second call')

await asyncMock() // first call
await asyncMock() // second call
await asyncMock() // default
await asyncMock() // default
```

## mockReturnThis

```ts
function mockReturnThis(): Mock<T>
```

Use this if you need to return the `this` context from the method without invoking the actual implementation. This is a shorthand for:

```ts
spy.mockImplementation(function () {
  return this
})
```

## mockReturnValue

```ts
function mockReturnValue(value: ReturnType<T>): Mock<T>
```

Accepts a value that will be returned whenever the mock function is called. TypeScript will only accept values that match the return type of the original function.

```ts
const mock = vi.fn()
mock.mockReturnValue(42)
mock() // 42
mock.mockReturnValue(43)
mock() // 43
```

## mockReturnValueOnce

```ts
function mockReturnValueOnce(value: ReturnType<T>): Mock<T>
```

Accepts a value that will be returned during the next function call. TypeScript will only accept values that match the return type of the original function. If chained, each consecutive call will return the specified value.

When the mocked function runs out of implementations, it will invoke the default implementation set with `vi.fn(() => defaultValue)` or `.mockImplementation(() => defaultValue)` if they were called:

```ts
const myMockFn = vi
  .fn()
  .mockReturnValue('default')
  .mockReturnValueOnce('first call')
  .mockReturnValueOnce('second call')

// 'first call', 'second call', 'default', 'default'
console.log(myMockFn(), myMockFn(), myMockFn(), myMockFn())
```

## mockThrow <Version>4.1.0</Version> {#mockthrow}

```ts
function mockThrow(value: unknown): Mock<T>
```

Accepts a value that will be thrown whenever the mock function is called.

```ts
const myMockFn = vi.fn()
myMockFn.mockThrow(new Error('error message'))
myMockFn() // throws Error<'error message'>
```

## mockThrowOnce <Version>4.1.0</Version> {#mockthrowonce}

```ts
function mockThrowOnce(value: unknown): Mock<T>
```

Accepts a value that will be thrown during the next function call. If chained, every consecutive call will throw the specified value.

```ts
const myMockFn = vi
  .fn()
  .mockReturnValue('default')
  .mockThrowOnce(new Error('first call error'))
  .mockThrowOnce('second call error')

expect(() => myMockFn()).toThrow('first call error')
expect(() => myMockFn()).toThrow('second call error')
expect(myMockFn()).toEqual('default')
```

## mock.calls

```ts
const calls: Parameters<T>[]
```

This is an array containing all arguments for each call. One item of the array is the arguments of that call.

```js
const fn = vi.fn()

fn('arg1', 'arg2')
fn('arg3')

fn.mock.calls === [
  ['arg1', 'arg2'], // first call
  ['arg3'], // second call
]
```

**Objects are Stored by Reference**
Note that Vitest always stores objects by reference in all properties of the `mock` state. This means that if the properties were changed by your code, then some assertions like `.toHaveBeenCalledWith` will not pass:

```ts
const argument = {
  value: 0,
}
const fn = vi.fn()
fn(argument) // { value: 0 }

argument.value = 10

expect(fn).toHaveBeenCalledWith({ value: 0 }) // [!code --]

// The equality check is done against the original argument,
// but its property was changed between the call and assertion
expect(fn).toHaveBeenCalledWith({ value: 10 }) // [!code ++]
```

In this case you can clone the argument yourself:

```ts
const calledArguments = []
const fn = vi.fn((arg) => {
  calledArguments.push(structuredClone(arg))
})

expect(calledArguments[0]).toEqual({ value: 0 })
```

## mock.lastCall

```ts
const lastCall: Parameters<T> | undefined
```

This contains the arguments of the last call. If the mock wasn't called, it will return `undefined`.
