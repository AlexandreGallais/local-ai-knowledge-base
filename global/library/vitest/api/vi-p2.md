---
title: "Vi (part 2 of 6)"
tool: "vitest"
version: "5.1"
source: "https://github.com/vitest-dev/vitest/blob/7a3844954d8753fc0d5bed76a96ffd3a21716c22/docs/api/vi.md"
commit: "7a3844954d8753fc0d5bed76a96ffd3a21716c22"
license: "MIT"
---

# Vi (part 2 of 6)

## Mock Modules

This section describes the API that you can use when mocking a module. Beware that Vitest doesn't support mocking modules imported using `require()`.

### vi.mock

```ts
interface MockOptions {
  spy?: boolean
}

interface MockFactory<T> {
  (importOriginal: () => T): unknown
}

function mock(
  path: string,
  factory?: MockOptions | MockFactory<unknown>
): void
function mock<T>(
  module: Promise<T>,
  factory?: MockOptions | MockFactory<T>
): void
```

Substitutes all imported modules from provided `path` with another module. You can use configured Vite aliases inside a path. The call to `vi.mock` is hoisted, so it doesn't matter where you call it. It will always be executed before all imports. If you need to reference some variables outside of its scope, you can define them inside `vi.hoisted` and reference them inside `vi.mock`.

It is recommended to use `vi.mock` or `vi.hoisted` only inside test files. If Vite's module runner is disabled, they will not be hoisted. This is a performance optimisation to avoid ready unnecessary files.

**Warning:**
`vi.mock` works only for modules that were imported with the `import` keyword. It doesn't work with `require`.

In order to hoist `vi.mock`, Vitest statically analyzes your files. It indicates that `vi` that was not directly imported from the `vitest` package (for example, from some utility file) cannot be used. Use `vi.mock` with `vi` imported from `vitest`, or enable `globals` config option.

Vitest will not mock modules that were imported inside a setup file because they are cached by the time a test file is running. You can call `vi.resetModules()` inside `vi.hoisted` to clear all module caches before running a test file.

If the `factory` function is defined, all imports will return its result. Vitest calls factory only once and caches results for all subsequent imports until `vi.unmock` or `vi.doUnmock` is called.

Unlike in `jest`, the factory can be asynchronous. You can use `vi.importActual` or a helper with the factory passed in as the first argument, and get the original module inside.

You can also provide an object with a `spy` property instead of a factory function. If `spy` is `true`, then Vitest will automock the module as usual, but it won't override the implementation of exports. This is useful if you just want to assert that the exported method was called correctly by another method.

```ts
import { calculator } from './src/calculator.ts'

vi.mock('./src/calculator.ts', { spy: true })

// calls the original implementation,
// but allows asserting the behaviour later
const result = calculator(1, 2)

expect(result).toBe(3)
expect(calculator).toHaveBeenCalledWith(1, 2)
expect(calculator).toHaveReturnedWith(3)
```

Vitest also supports a module promise instead of a string in the `vi.mock` and `vi.doMock` methods for better IDE support. When the file is moved, the path will be updated, and `importOriginal` inherits the type automatically. Using this signature will also enforce factory return type to be compatible with the original module (keeping exports optional).

```ts
// @filename: ./path/to/module.js
export declare function total(...numbers: number[]): number
// @filename: test.js
import { vi } from 'vitest'
// ---cut---
vi.mock(import('./path/to/module.js'), async (importOriginal) => {
  const mod = await importOriginal() // type is inferred
  //    ^?
  return {
    ...mod,
    // replace some exports
    total: vi.fn(),
  }
})
```

Under the hood, Vitest still operates on a string and not a module object.

If you are using TypeScript with `paths` aliases configured in `tsconfig.json` however, the compiler won't be able to correctly resolve import types.
In order to make it work, make sure to replace all aliased imports, with their corresponding relative paths.
Eg. use `import('./path/to/module.js')` instead of `import('@/module')`.

**Warning:**
`vi.mock` is hoisted (in other words, _moved_) to **top of the file**. It means that whenever you write it (be it inside `beforeEach` or `test`), it will actually be called before that.

This also means that you cannot use any variables inside the factory that are defined outside the factory.

If you need to use variables inside the factory, try `vi.doMock`. It works the same way but isn't hoisted. Beware that it only mocks subsequent imports.

You can also reference variables defined by `vi.hoisted` method if it was declared before `vi.mock`:

```ts
import { namedExport } from './path/to/module.js'

const mocks = vi.hoisted(() => {
  return {
    namedExport: vi.fn(),
  }
})

vi.mock('./path/to/module.js', () => {
  return {
    namedExport: mocks.namedExport,
  }
})

vi.mocked(namedExport).mockReturnValue(100)

expect(namedExport()).toBe(100)
expect(namedExport).toBe(mocks.namedExport)
```

**Warning:**
If you are mocking a module with default export, you will need to provide a `default` key <example-value> the returned factory function object. This is an ES module-specific caveat; therefore, `jest` documentation may differ as `jest` uses CommonJS modules. For example,

```ts
vi.mock('./path/to/module.js', () => {
  return {
    default: { myDefaultKey: vi.fn() },
    namedExport: vi.fn(),
    // etc...
  }
})
```

If the factory is not provided, Vitest looks for a file with the same name in a `__mocks__` folder and uses it instead of the original module:

- If the path is a package name, like `axios` or `@company/utils/format`, Vitest looks in the `__mocks__` folder in the root of the project (default is `process.cwd()`) for a file with this path and any extension, for example, `__mocks__/@company/utils/format.ts`. This also applies to a package that is linked from outside of `node_modules`, like a workspace package in a monorepo.
- If the module resolves to a file outside of `node_modules`, Vitest looks in the `__mocks__` folder next to that file for a file with the same name and extension, for example, `src/__mocks__/increment.js` for `src/increment.js`. For a package name, Vitest does this only if the root `__mocks__` folder doesn't have the file.

Vitest treats files in other `deps.moduleDirectories` the same as files in `node_modules`.

For example, you have this file structure:

```
- __mocks__
  - @company
    - utils.js
  - axios.js
- src
  - __mocks__
    - increment.js
  - increment.js
- tests
  - increment.test.js
```

If you call `vi.mock` in a test file without a factory or options provided, it will find a file in the `__mocks__` folder to use as a module:

```ts
import { vi } from 'vitest'

// axios is a default export from `__mocks__/axios.js`
import axios from 'axios'

// format is a named export from `__mocks__/@company/utils.js`,
// even if `@company/utils` is a workspace package
import { format } from '@company/utils'

// increment is a named export from `src/__mocks__/increment.js`
import { increment } from '../src/increment.js'

vi.mock('axios')
vi.mock('@company/utils')
vi.mock('../src/increment.js')

axios.get(`/apples/${format(increment(1))}`)
```

**Warning:**
Beware that if you don't call `vi.mock`, modules **are not** mocked automatically. To replicate Jest's automocking behaviour, you can call `vi.mock` for each required module inside `setupFiles`.

If there is no `__mocks__` folder or a factory provided, Vitest will import the original module and auto-mock all its exports. For the rules applied, see algorithm.

### vi.doMock

```ts
function doMock(
  path: string,
  factory?: MockOptions | MockFactory<unknown>
): Disposable
function doMock<T>(
  module: Promise<T>,
  factory?: MockOptions | MockFactory<T>
): Disposable
```

The same as `vi.mock`, but it's not hoisted to the top of the file, so you can reference variables in the global file scope. The next dynamic import of the module will be mocked.

**Warning:**
This will not mock modules that were imported before this was called. Don't forget that all static imports in ESM are always hoisted, so putting this before static import will not force it to be called before the import:

```ts
vi.doMock('./increment.js') // this will be called _after_ the import statement

import { increment } from './increment.js'
```

```ts
export function increment(number) {
  return number + 1
}
```

```ts
import { beforeEach, test } from 'vitest'
import { increment } from './increment.js'

// the module is not mocked, because vi.doMock is not called yet
increment(1) === 2

let mockedIncrement = 100

beforeEach(() => {
  // you can access variables inside a factory
  vi.doMock('./increment.js', () => ({ increment: () => ++mockedIncrement }))
})

test('importing the next module imports mocked one', async () => {
  // original import WAS NOT MOCKED, because vi.doMock is evaluated AFTER imports
  expect(increment(1)).toBe(2)
  const { increment: mockedIncrement } = await import('./increment.js')
  // new dynamic import returns mocked module
  expect(mockedIncrement(1)).toBe(101)
  expect(mockedIncrement(1)).toBe(102)
  expect(mockedIncrement(1)).toBe(103)
})
```

**Tip:**
In environments that support Explicit Resource Management, you can use `using` on the value returned from `vi.doMock()` to automatically call `vi.doUnmock()` on the mocked module when the containing block is exited. This is especially useful when mocking a dynamically imported module for a single test case.

```ts
it('uses a mocked version of my-module', () => {
  using _mockDisposable = vi.doMock('my-module')

  const myModule = await import('my-module') // mocked

  // my-module is restored here
})

it('uses the normal version of my-module again', () => {
  const myModule = await import('my-module') // not mocked
})
```

### vi.mocked

```ts
function mocked<T>(
  object: T,
  deep?: boolean
): MaybeMockedDeep<T>
function mocked<T>(
  object: T,
  options?: { partial?: boolean; deep?: boolean }
): MaybePartiallyMockedDeep<T>
```

Type helper for TypeScript. Just returns the object that was passed.

When `partial` is `true` it will expect a `Partial<T>` as a return value. By default, this will only make TypeScript believe that the first level values are mocked. You can pass down `{ deep: true }` as a second argument to tell TypeScript that the whole object is mocked, if it actually is. You can pass down `{ partial: true, deep: true }` to make nested objects also partial recursively.

```ts
export function add(x: number, y: number): number {
  return x + y
}

export function fetchSomething(): Promise<Response> {
  return fetch('https://vitest.dev/')
}

export function getUser(): { name: string; address: { city: string; zip: string } } {
  return { name: 'John', address: { city: 'New York', zip: '10001' } }
}
```

```ts
import * as example from './example'

vi.mock('./example')

test('1 + 1 equals 10', async () => {
  vi.mocked(example.add).mockReturnValue(10)
  expect(example.add(1, 1)).toBe(10)
})

test('mock return value with only partially correct typing', async () => {
  vi.mocked(example.fetchSomething).mockResolvedValue(new Response('hello'))
  vi.mocked(example.fetchSomething, { partial: true }).mockResolvedValue({ ok: false })
  // vi.mocked(example.someFn).mockResolvedValue({ ok: false }) // this is a type error
})

test('mock return value with deep partial typing', async () => {
  vi.mocked(example.getUser, { partial: true, deep: true }).mockReturnValue({
    address: { city: 'Los Angeles' },
  })
  expect(example.getUser().address.city).toBe('Los Angeles')
})
```

### vi.importActual

```ts
function importActual<T>(path: string): Promise<T>
```

Imports module, bypassing all checks if it should be mocked. Can be useful if you want to mock module partially.

```ts
vi.mock('./example.js', async () => {
  const originalModule = await vi.importActual('./example.js')

  return { ...originalModule, get: vi.fn() }
})
```

### vi.importMock

```ts
function importMock<T>(path: string): Promise<MaybeMockedDeep<T>>
```

Imports a module with all of its properties (including nested properties) mocked. Follows the same rules that `vi.mock` does. For the rules applied, see algorithm.

### vi.unmock

```ts
function unmock(path: string | Promise<Module>): void
```

Removes module from the mocked registry. All calls to import will return the original module even if it was mocked before. This call is hoisted to the top of the file, so it will only unmock modules that were defined in `setupFiles`, for example.

### vi.doUnmock

```ts
function doUnmock(path: string | Promise<Module>): void
```

The same as `vi.unmock`, but is not hoisted to the top of the file. The next import of the module will import the original module instead of the mock. This will not unmock previously imported modules.

```ts
export function increment(number) {
  return number + 1
}
```

```ts
import { increment } from './increment.js'

// increment is already mocked, because vi.mock is hoisted
increment(1) === 100

// this is hoisted, and factory is called before the import on line 1
vi.mock('./increment.js', () => ({ increment: () => 100 }))

// all calls are mocked, and `increment` always returns 100
increment(1) === 100
increment(30) === 100

// this is not hoisted, so other import will return unmocked module
vi.doUnmock('./increment.js')

// this STILL returns 100, because `vi.doUnmock` doesn't reevaluate a module
increment(1) === 100
increment(30) === 100

// the next import is unmocked, now `increment` is the original function that returns count + 1
const { increment: unmockedIncrement } = await import('./increment.js')

unmockedIncrement(1) === 2
unmockedIncrement(30) === 31
```

### vi.resetModules

```ts
function resetModules(): Vitest
```

Resets modules registry by clearing the cache of all modules. This allows modules to be reevaluated when reimported. Top-level imports cannot be re-evaluated. Might be useful to isolate modules where local state conflicts between tests.

```ts
import { vi } from 'vitest'

import { data } from './data.js' // Will not get reevaluated beforeEach test

beforeEach(() => {
  vi.resetModules()
})

test('change state', async () => {
  const mod = await import('./some/path.js') // Will get reevaluated
  mod.changeLocalState('new value')
  expect(mod.getLocalState()).toBe('new value')
})

test('module has old state', async () => {
  const mod = await import('./some/path.js') // Will get reevaluated
  expect(mod.getLocalState()).toBe('old value')
})
```

**Warning:**
Does not reset mocks registry. To clear mocks registry, use `vi.unmock` or `vi.doUnmock`.
