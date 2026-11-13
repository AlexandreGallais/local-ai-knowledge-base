---
title: "Vi (part 4 of 6)"
tool: "vitest"
version: "5.1"
source: "https://github.com/vitest-dev/vitest/blob/7a3844954d8753fc0d5bed76a96ffd3a21716c22/docs/api/vi.md"
commit: "7a3844954d8753fc0d5bed76a96ffd3a21716c22"
license: "MIT"
---

# Vi (part 4 of 6)

## Mocking Functions and Objects

This section describes how to work with method mocks and replace environmental and global variables.

### vi.fn

```ts
function fn(fn?: Procedure | Constructable): Mock
```

Creates a spy on a function, but can also be initiated without one. Every time a function is invoked, it stores its call arguments, returns, and instances. Additionally, you can manipulate its behavior with methods.
If no function is given, mock will return `undefined` when invoked.

```ts
const getApples = vi.fn(() => 0)

getApples()

expect(getApples).toHaveBeenCalled()
expect(getApples).toHaveReturnedWith(0)

getApples.mockReturnValueOnce(5)

const res = getApples()
expect(res).toBe(5)
expect(getApples).toHaveNthReturnedWith(2, 5)
```

You can also pass down a class to `vi.fn`:

```ts
const Cart = vi.fn(class {
  get() {
    return 0
  }
})

const cart = new Cart()
expect(Cart).toHaveBeenCalled()
expect(cart.get()).toBe(0)
```

Instances keep the prototype chain of the implementation class, so its prototype methods are available on instances, and `instanceof` checks against the implementation class pass. See Mocking Classes for details.

### vi.mockObject <Version>3.2.0</Version>

```ts
function mockObject<T>(value: T, options?: MockOptions): MaybeMockedDeep<T>
```

Deeply mocks properties and methods of a given object in the same way as `vi.mock()` mocks module exports. See automocking for the detail.

```ts
const original = {
  simple: () => 'value',
  nested: {
    method: () => 'real'
  },
  prop: 'foo',
}

const mocked = vi.mockObject(original)
expect(mocked.simple()).toBe(undefined)
expect(mocked.nested.method()).toBe(undefined)
expect(mocked.prop).toBe('foo')

mocked.simple.mockReturnValue('mocked')
mocked.nested.method.mockReturnValue('mocked nested')

expect(mocked.simple()).toBe('mocked')
expect(mocked.nested.method()).toBe('mocked nested')
```

Just like `vi.mock()`, you can pass `{ spy: true }` as a second argument to keep function implementations:

```ts
const spied = vi.mockObject(original, { spy: true })
expect(spied.simple()).toBe('value')
expect(spied.simple).toHaveBeenCalled()
expect(spied.simple.mock.results[0]).toEqual({ type: 'return', value: 'value' })
```

**Warning:**
With `spy: true`, `vi.mockObject` doesn't copy objects. It returns the same `original` object and replaces its methods, including the methods of nested objects and class prototypes, with spies in place.

### vi.isMockFunction

```ts
function isMockFunction(fn: unknown): asserts fn is Mock
```

Checks that a given parameter is a mock function. If you are using TypeScript, it will also narrow down its type.

### vi.clearAllMocks

```ts
function clearAllMocks(): Vitest
```

Calls `.mockClear()` on all spies.
This will clear mock history without affecting mock implementations.

### vi.resetAllMocks

```ts
function resetAllMocks(): Vitest
```

Calls `.mockReset()` on all spies.
This will clear mock history and reset each mock's implementation.

### vi.restoreAllMocks

```ts
function restoreAllMocks(): Vitest
```

This restores all original implementations on spies created with `vi.spyOn`.

After the mock was restored, you can spy on it again.

**Warning:**
This method also does not affect mocks created during automocking.

Note that unlike `mock.mockRestore`, `vi.restoreAllMocks` will not clear mock history or reset the mock implementation

### vi.spyOn

```ts
function spyOn<T, K extends keyof T>(
  object: T,
  key: K,
  accessor?: 'get' | 'set'
): Mock<T[K]>
```

Creates a spy on a method or getter/setter of an object similar to `vi.fn()`. It returns a mock function.

```ts
let apples = 0
const cart = {
  getApples: () => 42,
}

const spy = vi.spyOn(cart, 'getApples').mockImplementation(() => apples)
apples = 1

expect(cart.getApples()).toBe(1)

expect(spy).toHaveBeenCalled()
expect(spy).toHaveReturnedWith(1)
```

If the spying method is a class definition, the mock implementations have to use the `function` or the `class` keyword:

```ts
const cart = {
  Apples: class Apples {
    getApples() {
      return 42
    }
  }
}

const spy = vi.spyOn(cart, 'Apples')
  .mockImplementation(() => ({ getApples: () => 0 })) // [!code --]
  // with a function keyword
  .mockImplementation(function () {
    this.getApples = () => 0
  })
  // with a custom class
  .mockImplementation(class MockApples {
    getApples() {
      return 0
    }
  })
```

If you provide an arrow function, you will get `<anonymous> is not a constructor` error when the mock is called.

With a class implementation, instances keep the prototype chain of that class: prototype methods like `getApples` are available on instances, and `instanceof` checks against the implementation class pass. See Mocking Classes for details.

**Tip:**
In environments that support Explicit Resource Management, you can use `using` instead of `const` to automatically call `mockRestore` on any mocked function when the containing block is exited. This is especially useful for spied methods:

```ts
it('calls console.log', () => {
  using spy = vi.spyOn(console, 'log').mockImplementation(() => {})
  debug('message')
  expect(spy).toHaveBeenCalled()
})
// console.log is restored here
```

**Tip:**
You can call `vi.restoreAllMocks` inside `afterEach` (or enable `test.restoreMocks`) to restore all methods to their original implementations after every test. This will restore the original object descriptor, so you won't be able to change method's implementation anymore, unless you spy again:

```ts
const cart = {
  getApples: () => 42,
}

const spy = vi.spyOn(cart, 'getApples').mockReturnValue(10)

console.log(cart.getApples()) // 10
vi.restoreAllMocks()
console.log(cart.getApples()) // 42
spy.mockReturnValue(10)
console.log(cart.getApples()) // still 42!
```

**Tip:**
It is not possible to spy on exported methods in Browser Mode. Instead, you can spy on every exported method by calling `vi.mock("./file-path.js", { spy: true })`. This will mock every export but keep its implementation intact, allowing you to assert if the method was called correctly.

```ts
import { calculator } from './src/calculator.ts'

vi.mock('./src/calculator.ts', { spy: true })

calculator(1, 2)

expect(calculator).toHaveBeenCalledWith(1, 2)
expect(calculator).toHaveReturned(3)
```

And while it is possible to spy on exports in `jsdom` or other Node.js environments, this might change in the future.

### vi.stubEnv {#vi-stubenv}

```ts
function stubEnv<T extends string>(
  name: T,
  value: T extends 'PROD' | 'DEV' | 'SSR' ? boolean : string | undefined
): Vitest
```

Changes the value of environmental variable on `process.env` and `import.meta.env`. You can restore its value by calling `vi.unstubAllEnvs`.

```ts
import { vi } from 'vitest'

// `process.env.NODE_ENV` and `import.meta.env.NODE_ENV`
// are "development" before calling "vi.stubEnv"

vi.stubEnv('NODE_ENV', 'production')

process.env.NODE_ENV === 'production'
import.meta.env.NODE_ENV === 'production'

vi.stubEnv('NODE_ENV', undefined)

process.env.NODE_ENV === undefined
import.meta.env.NODE_ENV === undefined

// doesn't change other envs
import.meta.env.MODE === 'development'
```

**Tip:**
You can also change the value by simply assigning it, but you won't be able to use `vi.unstubAllEnvs` to restore previous value:

```ts
import.meta.env.MODE = 'test'
```

### vi.unstubAllEnvs {#vi-unstuballenvs}

```ts
function unstubAllEnvs(): Vitest
```

Restores all `import.meta.env` and `process.env` values that were changed with `vi.stubEnv`. When it's called for the first time, Vitest remembers the original value and will store it, until `unstubAllEnvs` is called again.

```ts
import { vi } from 'vitest'

// `process.env.NODE_ENV` and `import.meta.env.NODE_ENV`
// are "development" before calling stubEnv

vi.stubEnv('NODE_ENV', 'production')

process.env.NODE_ENV === 'production'
import.meta.env.NODE_ENV === 'production'

vi.stubEnv('NODE_ENV', 'staging')

process.env.NODE_ENV === 'staging'
import.meta.env.NODE_ENV === 'staging'

vi.unstubAllEnvs()

// restores to the value that were stored before the first "stubEnv" call
process.env.NODE_ENV === 'development'
import.meta.env.NODE_ENV === 'development'
```

### vi.stubGlobal

```ts
function stubGlobal(
  name: string | number | symbol,
  value: unknown
): Vitest
```

Changes the value of global variable. You can restore its original value by calling `vi.unstubAllGlobals`.

```ts
import { vi } from 'vitest'

// `innerWidth` is "0" before calling stubGlobal

vi.stubGlobal('innerWidth', 100)

innerWidth === 100
globalThis.innerWidth === 100
// if you are using jsdom or happy-dom
window.innerWidth === 100
```

**Tip:**
You can also change the value by simply assigning it to `globalThis` or `window` (if you are using `jsdom` or `happy-dom` environment), but you won't be able to use `vi.unstubAllGlobals` to restore original value:

```ts
globalThis.innerWidth = 100
// if you are using jsdom or happy-dom
window.innerWidth = 100
```

### vi.unstubAllGlobals {#vi-unstuballglobals}

```ts
function unstubAllGlobals(): Vitest
```

Restores all global values on `globalThis`/`global` (and `window`/`top`/`self`/`parent`, if you are using `jsdom` or `happy-dom` environment) that were changed with `vi.stubGlobal`. When it's called for the first time, Vitest remembers the original value and will store it, until `unstubAllGlobals` is called again.

```ts
import { vi } from 'vitest'

const Mock = vi.fn()

// IntersectionObserver is "undefined" before calling "stubGlobal"

vi.stubGlobal('IntersectionObserver', Mock)

IntersectionObserver === Mock
global.IntersectionObserver === Mock
globalThis.IntersectionObserver === Mock
// if you are using jsdom or happy-dom
window.IntersectionObserver === Mock

vi.unstubAllGlobals()

globalThis.IntersectionObserver === undefined
'IntersectionObserver' in globalThis === false
// throws ReferenceError, because it's not defined
IntersectionObserver === undefined
```

### vi.when <Version>5.0.0</Version> {#vi-when}

```ts
interface WhenOptions {
  onUnmatched?: 'throw' | 'passthrough' | ((...args: unknown[]) => unknown)
}

interface BehaviorOptions {
  times?: number
}

function when(spy: Mock, options?: WhenOptions): When
```

Defines per-argument behaviors on a spy, replacing its implementation for the duration of the `when` chain.

Call `.calledWith(...args)` on the returned object to specify which call arguments to match, then chain one or more `then*` methods to declare what the spy should return, throw, or resolve when invoked with those arguments. Arguments are matched with the same deep equality as `toEqual` and support asymmetric matchers such as `expect.any()`.

```ts
const spy = vi.fn()

vi.when(spy)
  .calledWith(1)
  .thenReturn('one')
  .calledWith(2)
  .thenReturn('two')

expect(spy(1)).toBe('one')
expect(spy(2)).toBe('two')
```

Available `then*` methods:

| Method                         | Description                                |
| ------------------------------ | ------------------------------------------ |
| `thenReturn(value, options?)`  | Returns `value`.                           |
| `thenReturnOnce(value)`        | Returns `value` once, then falls back.     |
| `thenThrow(error, options?)`   | Throws `error`.                            |
| `thenThrowOnce(error)`         | Throws `error` once, then falls back.      |
| `thenResolve(value, options?)` | Returns a resolved `Promise` with `value`. |
| `thenResolveOnce(value)`       | Resolves once, then falls back.            |
| `thenReject(error, options?)`  | Returns a rejected `Promise` with `error`. |
| `thenRejectOnce(error)`        | Rejects once, then falls back.             |

The optional `times` option limits how many times a behavior applies before being exhausted. Behaviors registered for the same arguments are consumed last-in-first-out: the most recently registered behavior is tried first, and once exhausted, earlier ones act as fallbacks.

```ts
const spy = vi.fn<(key: <example-value>) => string>()

vi.when(spy)
  .calledWith('theme')
  .thenReturn('light') // fallback, applies indefinitely
  .thenReturn('dark', { times: 2 }) // applied first for the next 2 calls

expect(spy('theme')).toBe('dark')
expect(spy('theme')).toBe('dark')
expect(spy('theme')).toBe('light') // falls back
```

When called with arguments that match no registered behavior, the spy falls through to its original implementation by default. Use the `onUnmatched` option to change this:

- `'passthrough'` (**default**): delegates to the spy's original implementation
- `'throw'`: throws an error listing the unmatched arguments
- a function: called with the unmatched arguments; its return value is used

```ts
const spy = vi.fn<(id: number) => string>()

vi.when(spy, { onUnmatched: 'throw' })
  .calledWith(1)
  .thenReturn('Alice')

expect(spy(1)).toBe('Alice')
expect(() => spy(99)).toThrow() // no behavior defined for 99
```

The `When` object returned by `vi.when` supports the `toHaveBeenExhausted` assertion, which passes once every registered behavior has been consumed.

```ts
const spy = vi.fn()
const w = vi.when(spy)
  .calledWith(1)
  .thenReturnOnce('once')
  .calledWith(2)
  .thenReturn('always')

expect(w).not.toHaveBeenExhausted()

spy(1) // consumes the `thenReturnOnce` behavior
spy(2) // satisfies `thenReturn` (called at least once)

expect(w).toHaveBeenExhausted()
```

**Tip:**
In environments that support Explicit Resource Management, you can use `using` instead of `const` to automatically restore the spy's original implementation when the containing block exits:

```ts
const spy = vi.fn(() => 'original')

{
  using w = vi.when(spy)
    .calledWith('hello')
    .thenReturn('mocked')

  expect(spy('hello')).toBe('mocked')
} // ← spy's original implementation is restored here

expect(spy('hello')).toBe('original')
```

### vi.isWhenChain <Version>5.0.0</Version> {#vi-iswhenchain}

```ts
function isWhenChain(input: object): input is When
```

Returns `true` if the given value is a `When` chain created by `vi.when`. If you are using TypeScript, it will also narrow down its type.

```ts
const spy = vi.fn()
const w = vi.when(spy).calledWith(1).thenReturn(0)

expect(vi.isWhenChain(w)).toBe(true)
expect(vi.isWhenChain(spy)).toBe(false)
```
