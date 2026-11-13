---
title: "expect (part 2 of 5)"
tool: "vitest"
version: "5.1"
source: "https://github.com/vitest-dev/vitest/blob/7a3844954d8753fc0d5bed76a96ffd3a21716c22/docs/api/expect.md"
commit: "7a3844954d8753fc0d5bed76a96ffd3a21716c22"
license: "MIT"
---

# expect (part 2 of 5)

## toBeLessThanOrEqual

- **Type:** `(n: number | bigint) => Awaitable<void>`

`toBeLessThanOrEqual` asserts if actual value is less than received one or equal to it.

```ts
import { expect, test } from 'vitest'
import { getApples } from './stocks.js'

test('have 11 apples or less', () => {
  expect(getApples()).toBeLessThanOrEqual(11)
})
```

## toEqual

- **Type:** `(received: any) => Awaitable<void>`

`toEqual` asserts if actual value is equal to received one or has the same structure, if it is an object (compares them recursively). You can see the difference between `toEqual` and `toBe` in this example:

```ts
import { expect, test } from 'vitest'

const stockBill = {
  type: 'apples',
  count: 13,
}

const stockMary = {
  type: 'apples',
  count: 13,
}

test('stocks have the same properties', () => {
  expect(stockBill).toEqual(stockMary)
})

test('stocks are not the same', () => {
  expect(stockBill).not.toBe(stockMary)
})
```

**Warning:**
For `Error` objects, non-enumerable properties such as `name`, `message`, `cause` and `AggregateError.errors` are also compared. For `Error.cause`, the comparison is done asymmetrically:

```ts
// success
expect(new Error('hi', { cause: 'x' })).toEqual(new Error('hi'))

// fail
expect(new Error('hi')).toEqual(new Error('hi', { cause: 'x' }))
```

To test if something was thrown, use `toThrow` assertion.

## toStrictEqual

- **Type:** `(received: any) => Awaitable<void>`

`toStrictEqual` asserts if the actual value is equal to the received one or has the same structure if it is an object (compares them recursively), and of the same type.

Differences from `.toEqual`:

- Keys with `undefined` properties are checked. e.g. `{a: undefined, b: 2}` does not match `{b: 2}` when using `.toStrictEqual`.
- Array sparseness is checked. e.g. `[, 1]` does not match `[undefined, 1]` when using `.toStrictEqual`.
- Object types are checked to be equal. e.g. A class instance with fields `a` and `b` will not equal a literal object with fields `a` and `b`.

```ts
import { expect, test } from 'vitest'

class Stock {
  constructor(type) {
    this.type = type
  }
}

test('structurally the same, but semantically different', () => {
  expect(new Stock('apples')).toEqual({ type: 'apples' })
  expect(new Stock('apples')).not.toStrictEqual({ type: 'apples' })
})
```

## toContain

- **Type:** `(received: string) => Awaitable<void>`

`toContain` asserts if the actual value is in an array. `toContain` can also check whether a string is a substring of another string. If you are running tests in a browser-like environment, this assertion can also check if class is contained in a `classList`, or an element is inside another one.

```ts
import { expect, test } from 'vitest'
import { getAllFruits } from './stocks.js'

test('the fruit list contains orange', () => {
  expect(getAllFruits()).toContain('orange')
})

test('pineapple contains apple', () => {
  expect('pineapple').toContain('apple')
})

test('the element contains a class and is contained', () => {
  const element = document.querySelector('#el')
  // element has a class
  expect(element.classList).toContain('flex')
  // element is inside another one
  expect(document.querySelector('#wrapper')).toContain(element)
})
```

## toContainEqual

- **Type:** `(received: any) => Awaitable<void>`

`toContainEqual` asserts if an item with a specific structure and values is contained in an array.
It works like `toEqual` inside for each element.

```ts
import { expect, test } from 'vitest'
import { getFruitStock } from './stocks.js'

test('apple available', () => {
  expect(getFruitStock()).toContainEqual({ fruit: 'apple', count: 5 })
})
```

## toHaveLength

- **Type:** `(received: number) => Awaitable<void>`

`toHaveLength` asserts if an object has a `.length` property and it is set to a certain numeric value.

```ts
import { expect, test } from 'vitest'

test('toHaveLength', () => {
  expect('abc').toHaveLength(3)
  expect([1, 2, 3]).toHaveLength(3)

  expect('').not.toHaveLength(3) // doesn't have .length of 3
  expect({ length: 3 }).toHaveLength(3)
})
```

## toHaveProperty

- **Type:** `(key: any, received?: any) => Awaitable<void>`

`toHaveProperty` asserts if a property at provided reference `key` exists for an object.

You can provide an optional value argument also known as deep equality, like the `toEqual` matcher to compare the received property value.

```ts
import { expect, test } from 'vitest'

const invoice = {
  'isActive': true,
  'P.O': '12345',
  'customer': {
    first_name: 'John',
    last_name: 'Doe',
    location: 'China',
  },
  'total_amount': 5000,
  'items': [
    {
      type: 'apples',
      quantity: 10,
    },
    {
      type: 'oranges',
      quantity: 5,
    },
  ],
}

test('John Doe Invoice', () => {
  expect(invoice).toHaveProperty('isActive') // assert that the key <example-value>
  expect(invoice).toHaveProperty('total_amount', 5000) // assert that the key <example-value> and the value is equal

  expect(invoice).not.toHaveProperty('account') // assert that this key does not exist

  // Deep referencing using dot notation
  expect(invoice).toHaveProperty('customer.first_name')
  expect(invoice).toHaveProperty('customer.last_name', 'Doe')
  expect(invoice).not.toHaveProperty('customer.location', 'India')

  // Deep referencing using an array containing the key
  expect(invoice).toHaveProperty('items[0].type', 'apples')
  expect(invoice).toHaveProperty('items.0.type', 'apples') // dot notation also works

  // Deep referencing using an array containing the keyPath
  expect(invoice).toHaveProperty(['items', 0, 'type'], 'apples')
  expect(invoice).toHaveProperty(['items', '0', 'type'], 'apples') // string notation also works

  // Wrap your key in an array to avoid the key from being parsed as a deep reference
  expect(invoice).toHaveProperty(['P.O'], '12345')

  // Deep equality of object property
  expect(invoice).toHaveProperty('items[0]', { type: 'apples', quantity: 10 })
})
```

## toMatch

- **Type:** `(received: string | regexp) => Awaitable<void>`

`toMatch` asserts if a string matches a regular expression or a string.

```ts
import { expect, test } from 'vitest'

test('top fruits', () => {
  expect('top fruits include apple, orange and grape').toMatch(/apple/)
  expect('applefruits').toMatch('fruit') // toMatch also accepts a string
})
```

## toMatchObject

- **Type:** `(received: object | array) => Awaitable<void>`

`toMatchObject` asserts if an object matches a subset of the properties of an object.

You can also pass an array of objects. This is useful if you want to check that two arrays match in their number and order of elements, as opposed to `arrayContaining`, which allows for extra elements in the received array.

```ts
import { expect, test } from 'vitest'

const johnInvoice = {
  isActive: true,
  customer: {
    first_name: 'John',
    last_name: 'Doe',
    location: 'China',
  },
  total_amount: 5000,
  items: [
    {
      type: 'apples',
      quantity: 10,
    },
    {
      type: 'oranges',
      quantity: 5,
    },
  ],
}

const johnDetails = {
  customer: {
    first_name: 'John',
    last_name: 'Doe',
    location: 'China',
  },
}

test('invoice has john personal details', () => {
  expect(johnInvoice).toMatchObject(johnDetails)
})

test('the number of elements must match exactly', () => {
  // Assert that an array of object matches
  expect([{ foo: 'bar' }, { baz: 1 }]).toMatchObject([
    { foo: 'bar' },
    { baz: 1 },
  ])
})
```

## toThrow

- **Type:** `(expected?: any) => Awaitable<void>`

- **Alias:** `toThrowError` <Deprecated />

`toThrow` asserts if a function throws an error when it is called.

You can provide an optional argument to test that a specific error is thrown:

- `RegExp`: error message matches the pattern
- `string`: error message includes the substring
- any other value: compare with thrown value using deep equality (similar to `toEqual`)

**Tip:**
You must wrap the code in a function, otherwise the error will not be caught, and test will fail.

This does not apply for async calls as rejects correctly unwraps the promise:

```ts
test('expect rejects toThrow', async ({ expect }) => {
  const promise = Promise.reject(new Error('Test'))
  await expect(promise).rejects.toThrow()
})
```

For example, if we want to test that `getFruitStock('pineapples')` throws, we could write:

```ts
import { expect, test } from 'vitest'

function getFruitStock(type: string) {
  if (type === 'pineapples') {
    throw new Error('Pineapples are not in stock')
  }

  // Do some other stuff
}

test('throws on pineapples', () => {
  // Test that the error message says "stock" somewhere: these are equivalent
  expect(() => getFruitStock('pineapples')).toThrow(/stock/)
  expect(() => getFruitStock('pineapples')).toThrow('stock')

  // Test the exact error message
  expect(() => getFruitStock('pineapples')).toThrow(
    /^Pineapples are not in stock$/,
  )

  expect(() => getFruitStock('pineapples')).toThrow(
    new Error('Pineapples are not in stock'),
  )
  expect(() => getFruitStock('pineapples')).toThrow(expect.objectContaining({
    message: 'Pineapples are not in stock',
  }))
})
```

**Tip:**
To test async functions, use in combination with rejects.

```js
function getAsyncFruitStock() {
  return Promise.reject(new Error('empty'))
}

test('throws on pineapples', async () => {
  await expect(() => getAsyncFruitStock()).rejects.toThrow('empty')
})
```

**Tip:**
You can also test non-Error values that are thrown:

```ts
test('throws non-Error values', () => {
  expect(() => { throw 42 }).toThrow(42)
  expect(() => { throw { message: 'error' } }).toThrow({ message: 'error' })
})
```

**Unhandled Rejections with Fake Timers**
When using fake timers, an async function that rejects _during_ a `vi.advanceTimersByTimeAsync` call will trigger an unhandled rejection — even if you later assert it with `.rejects.toThrow()`. This happens because the error is thrown before the `expect` chain has a chance to catch it.

```ts
async function foo() {
  await new Promise(resolve => setTimeout(resolve, 100))
  throw new Error('boom')
}

test('rejects', async () => {
  const result = foo()

  await vi.advanceTimersByTimeAsync(100)

  // The assertion passes, but the error was already "unhandled" during advanceTimersByTimeAsync
  await expect(result).rejects.toThrow()
})
```

To avoid this, prefer `vi.setTimerTickMode('nextTimerAsync')` so that timers tick automatically as promises settle, without needing a manual advance:

```ts
beforeEach(() => {
  vi.useFakeTimers()
  vi.setTimerTickMode('nextTimerAsync')
})

test('rejects', async () => {
  // No advanceTimersByTimeAsync needed — the error is caught by rejects.toThrow()
  await expect(foo()).rejects.toThrow('boom')
})
```

Alternatively, set up the `.rejects.toThrow()` assertion _before_ advancing timers so the rejection is handled immediately:

```ts
test('rejects', async () => {
  const result = foo()
  const assertion = expect(result).rejects.toThrow('boom')

  await vi.advanceTimersByTimeAsync(100)
  await assertion
})
```

## toMatchSnapshot

- **Type:** `<T>(shape?: Partial<T> | string, hint?: string) => void`

This ensures that a value matches the most recent snapshot.

You can provide an optional `hint` string argument that is appended to the test name. Although Vitest always appends a number at the end of a snapshot name, short descriptive hints might be more useful than numbers to differentiate multiple snapshots in a single it or test block. Vitest sorts snapshots by name in the corresponding `.snap` file.

**Tip:**
When a snapshot mismatches and causes the test to fail, if the mismatch is expected, you can press `u` key to update the snapshot once. Or you can pass `-u` or `--update` CLI options to make Vitest always update the tests.

```ts
import { expect, test } from 'vitest'

test('matches snapshot', () => {
  const data = { foo: new Set(['bar', 'snapshot']) }
  expect(data).toMatchSnapshot()
})
```

You can also provide a shape of an object, if you are testing just a shape of an object, and don't need it to be 100% compatible:

```ts
import { expect, test } from 'vitest'

test('matches snapshot', () => {
  const data = { foo: new Set(['bar', 'snapshot']) }
  expect(data).toMatchSnapshot({ foo: expect.any(Set) })
})
```

## toMatchInlineSnapshot

- **Type:** `<T>(shape?: Partial<T> | string, snapshot?: string, hint?: string) => void`

This ensures that a value matches the most recent snapshot.

Vitest adds and updates the inlineSnapshot string argument to the matcher in the test file (instead of an external `.snap` file).

```ts
import { expect, test } from 'vitest'

test('matches inline snapshot', () => {
  const data = { foo: new Set(['bar', 'snapshot']) }
  // Vitest will update following content when updating the snapshot
  expect(data).toMatchInlineSnapshot(`
    {
      "foo": Set {
        "bar",
        "snapshot",
      },
    }
  `)
})
```

You can also provide a shape of an object, if you are testing just a shape of an object, and don't need it to be 100% compatible:

```ts
import { expect, test } from 'vitest'

test('matches snapshot', () => {
  const data = { foo: new Set(['bar', 'snapshot']) }
  expect(data).toMatchInlineSnapshot(
    { foo: expect.any(Set) },
    `
    {
      "foo": Any<Set>,
    }
  `
  )
})
```

## toMatchFileSnapshot {#tomatchfilesnapshot}

- **Type:** `<T>(filepath: string, hint?: string) => Promise<void>`

Compare or update the snapshot with the content of a file explicitly specified (instead of the `.snap` file).

```ts
import { expect, it } from 'vitest'

it('render basic', async () => {
  const result = renderHTML(h('div', { class: 'foo' }))
  await expect(result).toMatchFileSnapshot('./test/basic.output.html')
})
```

Note that since file system operation is async, you need to use `await` with `toMatchFileSnapshot()`. If `await` is not used, Vitest treats it like `expect.soft`, meaning the code after the statement will continue to run even if the snapshot mismatches. After the test finishes, Vitest will check the snapshot and fail if there is a mismatch.

## toThrowErrorMatchingSnapshot

- **Type:** `(hint?: string) => void`

The same as `toMatchSnapshot`, but expects the same value as `toThrow`.

## toThrowErrorMatchingInlineSnapshot

- **Type:** `(snapshot?: string, hint?: string) => void`

The same as `toMatchInlineSnapshot`, but expects the same value as `toThrow`.
