---
title: "assert (part 1 of 4)"
tool: "vitest"
version: "5.1"
source: "https://github.com/vitest-dev/vitest/blob/7a3844954d8753fc0d5bed76a96ffd3a21716c22/docs/api/assert.md"
commit: "7a3844954d8753fc0d5bed76a96ffd3a21716c22"
license: "MIT"
---

# assert

Vitest reexports the `assert` method from `chai` for verifying invariants.

**In-Source Testing {#in-source-testing}**
When using assertion functions such as `assert` from `import.meta.vitest` in in-source tests, TypeScript reports error `TS2775` because they must be called via an explicitly annotated name. Annotate the variable with `Chai.Assert` or call it directly:

::: code-group

```ts
if (import.meta.vitest) {
  const { test, assert } = import.meta.vitest // [!code --]
  const { test } = import.meta.vitest // [!code ++]
  const assert: Chai.Assert = import.meta.vitest.assert // [!code ++]

  test('assert', () => {
    assert('foo' !== 'bar', 'foo should not be equal to bar')
  })
}
```

```ts
if (import.meta.vitest) {
  const { test, assert } = import.meta.vitest // [!code --]
  const { test } = import.meta.vitest // [!code ++]

  test('assert', () => {
    assert('foo' !== 'bar', 'foo should not be equal to bar') // [!code --]
    import.meta.vitest!.assert('foo' !== 'bar', 'foo should not be equal to bar') // [!code ++]
  })
}
```

## assert

- **Type:** `(expression: any, message?: string) => asserts expression`

Assert that the given `expression` is truthy, otherwise the assertion fails.

```ts
import { assert, test } from 'vitest'

test('assert', () => {
  assert('foo' !== 'bar', 'foo should not be equal to bar')
})
```

## fail

- **Type:**
  - `(message?: string) => never`
  - `<T>(actual: T, expected: T, message?: string, operator?: string) => never`

Force an assertion failure.

```ts
import { assert, test } from 'vitest'

test('assert.fail', () => {
  assert.fail('error message on failure')
  assert.fail('foo', 'bar', 'foo is not bar', '===')
})
```

## isOk

- **Type:** `<T>(value: T, message?: string) => asserts value`
- **Alias:** `ok`

Assert that the given `value` is truthy.

```ts
import { assert, test } from 'vitest'

test('assert.isOk', () => {
  assert.isOk('foo', 'every truthy is ok')
  assert.isOk(false, 'this will fail since false is not truthy')
})
```

## isNotOk

- **Type:** `<T>(value: T, message?: string) => void`
- **Alias:** `notOk`

Assert that the given `value` is falsy.

```ts
import { assert, test } from 'vitest'

test('assert.isNotOk', () => {
  assert.isNotOk('foo', 'this will fail, every truthy is not ok')
  assert.isNotOk(false, 'this will pass since false is falsy')
})
```

## equal

- **Type:** `<T>(actual: T, expected: T, message?: string) => void`

Asserts non-strict equality (==) of `actual` and `expected`.

```ts
import { assert, test } from 'vitest'

test('assert.equal', () => {
  assert.equal(Math.sqrt(4), '2')
})
```

## notEqual

- **Type:** `<T>(actual: T, expected: T, message?: string) => void`

Asserts non-strict inequality (!=) of `actual` and `expected`.

```ts
import { assert, test } from 'vitest'

test('assert.equal', () => {
  assert.notEqual(Math.sqrt(4), 3)
})
```

## strictEqual

- **Type:** `<T>(actual: T, expected: T, message?: string) => void`

Asserts strict equality (===) of `actual` and `expected`.

```ts
import { assert, test } from 'vitest'

test('assert.strictEqual', () => {
  assert.strictEqual(Math.sqrt(4), 2)
})
```

## deepEqual

- **Type:** `<T>(actual: T, expected: T, message?: string) => void`

Asserts that `actual` is deeply equal to `expected`.

```ts
import { assert, test } from 'vitest'

test('assert.deepEqual', () => {
  assert.deepEqual({ color: 'green' }, { color: 'green' })
})
```

## notDeepEqual

- **Type:** `<T>(actual: T, expected: T, message?: string) => void`

Assert that `actual` is not deeply equal to `expected`.

```ts
import { assert, test } from 'vitest'

test('assert.notDeepEqual', () => {
  assert.notDeepEqual({ color: 'green' }, { color: 'red' })
})
```

## isAbove

- **Type:** `(valueToCheck: number, valueToBeAbove: number, message?: string) => void`

Assert that `valueToCheck` is strictly greater than (>) `valueToBeAbove`.

```ts
import { assert, test } from 'vitest'

test('assert.isAbove', () => {
  assert.isAbove(5, 2, '5 is strictly greater than 2')
})
```

## isAtLeast

- **Type:** `(valueToCheck: number, valueToBeAtLeast: number, message?: string) => void`

Assert that `valueToCheck` is greater than or equal to (>=) `valueToBeAtLeast`.

```ts
import { assert, test } from 'vitest'

test('assert.isAtLeast', () => {
  assert.isAtLeast(5, 2, '5 is greater or equal to 2')
  assert.isAtLeast(3, 3, '3 is greater or equal to 3')
})
```

## isBelow

- **Type:** `(valueToCheck: number, valueToBeBelow: number, message?: string) => void`

Asserts `valueToCheck` is strictly less than (<) `valueToBeBelow`.

```ts
import { assert, test } from 'vitest'

test('assert.isBelow', () => {
  assert.isBelow(3, 6, '3 is strictly less than 6')
})
```

## isAtMost

- **Type:** `(valueToCheck: number, valueToBeAtMost: number, message?: string) => void`

Asserts `valueToCheck` is less than or equal to (<=) `valueToBeAtMost`.

```ts
import { assert, test } from 'vitest'

test('assert.isAtMost', () => {
  assert.isAtMost(3, 6, '3 is less than or equal to 6')
  assert.isAtMost(4, 4, '4 is less than or equal to 4')
})
```

## isTrue

- **Type:** `<T>(value: T, message?: string) => asserts value is true`

Asserts that `value` is true.

```ts
import { assert, test } from 'vitest'

const testPassed = true

test('assert.isTrue', () => {
  assert.isTrue(testPassed)
})
```

## isNotTrue

- **Type:** `<T>(value: T, message?: string) => asserts value is Exclude<T, true>`

Asserts that `value` is not true.

```ts
import { assert, test } from 'vitest'

const testPassed = 'ok'

test('assert.isNotTrue', () => {
  assert.isNotTrue(testPassed)
})
```

## isFalse

- **Type:** `<T>(value: T, message?: string) => asserts value is false`

Asserts that `value` is false.

```ts
import { assert, test } from 'vitest'

const testPassed = false

test('assert.isFalse', () => {
  assert.isFalse(testPassed)
})
```

## isNotFalse

- **Type:** `<T>(value: T, message?: string) => asserts value is Exclude<T, false>`

Asserts that `value` is not false.

```ts
import { assert, test } from 'vitest'

const testPassed = 'no'

test('assert.isNotFalse', () => {
  assert.isNotFalse(testPassed)
})
```

## isNull

- **Type:** `<T>(value: T, message?: string) => asserts value is null`

Asserts that `value` is null.

```ts
import { assert, test } from 'vitest'

const error = null

test('assert.isNull', () => {
  assert.isNull(error, 'error is null')
})
```

## isNotNull

- **Type:** `<T>(value: T, message?: string) => asserts value is Exclude<T, null>`

Asserts that `value` is not null.

```ts
import { assert, test } from 'vitest'

const error = { message: 'error was occurred' }

test('assert.isNotNull', () => {
  assert.isNotNull(error, 'error is not null but object')
})
```

## isNaN

- **Type:** `<T>(value: T, message?: string) => void`

Asserts that `value` is NaN.

```ts
import { assert, test } from 'vitest'

const calculation = 1 * 'vitest'

test('assert.isNaN', () => {
  assert.isNaN(calculation, '1 * "vitest" is NaN')
})
```

## isNotNaN

- **Type:** `<T>(value: T, message?: string) => void`

Asserts that `value` is not NaN.

```ts
import { assert, test } from 'vitest'

const calculation = 1 * 2

test('assert.isNotNaN', () => {
  assert.isNotNaN(calculation, '1 * 2 is Not NaN but 2')
})
```

## exists

- **Type:** `<T>(value: T, message?: string) => asserts value is NonNullable<T>`

Asserts that `value` is neither null nor undefined.

```ts
import { assert, test } from 'vitest'

const name = 'foo'

test('assert.exists', () => {
  assert.exists(name, 'foo is neither null nor undefined')
})
```

## notExists

- **Type:** `<T>(value: T, message?: string) => asserts value is null | undefined`

Asserts that `value` is either null nor undefined.

```ts
import { assert, test } from 'vitest'

const foo = null
const bar = undefined

test('assert.notExists', () => {
  assert.notExists(foo, 'foo is null so not exist')
  assert.notExists(bar, 'bar is undefined so not exist')
})
```

## isUndefined

- **Type:** `<T>(value: T, message?: string) => asserts value is undefined`

Asserts that `value` is undefined.

```ts
import { assert, test } from 'vitest'

const name = undefined

test('assert.isUndefined', () => {
  assert.isUndefined(name, 'name is undefined')
})
```

## isDefined

- **Type:** `<T>(value: T, message?: string) => asserts value is Exclude<T, undefined>`

Asserts that `value` is not undefined.

```ts
import { assert, test } from 'vitest'

const name = 'foo'

test('assert.isDefined', () => {
  assert.isDefined(name, 'name is not undefined')
})
```

## isFunction

- **Type:** `<T>(value: T, message?: string) => void`
- **Alias:** `isCallable`
  Asserts that `value` is a function.

```ts
import { assert, test } from 'vitest'

function name() { return 'foo' };

test('assert.isFunction', () => {
  assert.isFunction(name, 'name is function')
})
```

## isNotFunction

- **Type:** `<T>(value: T, message?: string) => void`
- **Alias:** `isNotCallable`

Asserts that `value` is not a function.

```ts
import { assert, test } from 'vitest'

const name = 'foo'

test('assert.isNotFunction', () => {
  assert.isNotFunction(name, 'name is not function but string')
})
```

## isObject

- **Type:** `<T>(value: T, message?: string) => void`

Asserts that `value` is an object of type Object (as revealed by Object.prototype.toString). The assertion does not match subclassed objects.

```ts
import { assert, test } from 'vitest'

const someThing = { color: 'red', shape: 'circle' }

test('assert.isObject', () => {
  assert.isObject(someThing, 'someThing is object')
})
```

## isNotObject

- **Type:** `<T>(value: T, message?: string) => void`

Asserts that `value` is not an object of type Object (as revealed by Object.prototype.toString). The assertion does not match subclassed objects.

```ts
import { assert, test } from 'vitest'

const someThing = 'redCircle'

test('assert.isNotObject', () => {
  assert.isNotObject(someThing, 'someThing is not object but string')
})
```

## isArray

- **Type:** `<T>(value: T, message?: string) => void`

Asserts that `value` is an array.

```ts
import { assert, test } from 'vitest'

const color = ['red', 'green', 'yellow']

test('assert.isArray', () => {
  assert.isArray(color, 'color is array')
})
```

## isNotArray

- **Type:** `<T>(value: T, message?: string) => void`

Asserts that `value` is not an array.

```ts
import { assert, test } from 'vitest'

const color = 'red'

test('assert.isNotArray', () => {
  assert.isNotArray(color, 'color is not array but string')
})
```

## isString

- **Type:** `<T>(value: T, message?: string) => void`

Asserts that `value` is a string.

```ts
import { assert, test } from 'vitest'

const color = 'red'

test('assert.isString', () => {
  assert.isString(color, 'color is string')
})
```

## isNotString

- **Type:** `<T>(value: T, message?: string) => void`

Asserts that `value` is not a string.

```ts
import { assert, test } from 'vitest'

const color = ['red', 'green', 'yellow']

test('assert.isNotString', () => {
  assert.isNotString(color, 'color is not string but array')
})
```

## isNumber

- **Type:** `<T>(value: T, message?: string) => void`

Asserts that `value` is a number.

```ts
import { assert, test } from 'vitest'

const colors = 3

test('assert.isNumber', () => {
  assert.isNumber(colors, 'colors is number')
})
```

## isNotNumber

- **Type:** `<T>(value: T, message?: string) => void`

Asserts that `value` is not a number.

```ts
import { assert, test } from 'vitest'

const colors = '3 colors'

test('assert.isNotNumber', () => {
  assert.isNotNumber(colors, 'colors is not number but strings')
})
```

## isFinite

- **Type:** `<T>(value: T, message?: string) => void`

Asserts that `value` is a finite number (not NaN, Infinity).

```ts
import { assert, test } from 'vitest'

const colors = 3

test('assert.isFinite', () => {
  assert.isFinite(colors, 'colors is number not NaN or Infinity')
})
```

## isBoolean

- **Type:** `<T>(value: T, message?: string) => void`

Asserts that `value` is a boolean.

```ts
import { assert, test } from 'vitest'

const isReady = true

test('assert.isBoolean', () => {
  assert.isBoolean(isReady, 'isReady is a boolean')
})
```

## isNotBoolean

- **Type:** `<T>(value: T, message?: string) => void`

Asserts that `value` is not a boolean.

```ts
import { assert, test } from 'vitest'

const isReady = 'sure'

test('assert.isBoolean', () => {
  assert.isBoolean(isReady, 'isReady is not a boolean but string')
})
```

## typeOf

- **Type:** `<T>(value: T, name: string, message?: string) => void`

Asserts that `value`’s type is `name`, as determined by Object.prototype.toString.

```ts
import { assert, test } from 'vitest'

test('assert.typeOf', () => {
  assert.typeOf({ color: 'red' }, 'object', 'we have an object')
  assert.typeOf(['red', 'green'], 'array', 'we have an array')
  assert.typeOf('red', 'string', 'we have a string')
  assert.typeOf(/red/, 'regexp', 'we have a regular expression')
  assert.typeOf(null, 'null', 'we have a null')
  assert.typeOf(undefined, 'undefined', 'we have an undefined')
})
```

## notTypeOf

- **Type:** `<T>(value: T, name: string, message?: string) => void`

Asserts that `value`’s type is not `name`, as determined by Object.prototype.toString.

```ts
import { assert, test } from 'vitest'

test('assert.notTypeOf', () => {
  assert.notTypeOf('red', 'number', '"red" is not a number')
})
```

## instanceOf

- **Type:** `<T>(value: T, constructor: Function, message?: string) => asserts value is T`

Asserts that `value` is an instance of `constructor`.

```ts
import { assert, test } from 'vitest'

function Person(name) { this.name = name }
const foo = new Person('foo')

class Tea {
  constructor(name) {
    this.name = name
  }
}
const coffee = new Tea('coffee')

test('assert.instanceOf', () => {
  assert.instanceOf(foo, Person, 'foo is an instance of Person')
  assert.instanceOf(coffee, Tea, 'coffee is an instance of Tea')
})
```

## notInstanceOf

- **Type:** `<T>(value: T, constructor: Function, message?: string) => asserts value is Exclude<T, U>`

Asserts that `value` is not an instance of `constructor`.

```ts
import { assert, test } from 'vitest'

function Person(name) { this.name = name }
const foo = new Person('foo')

class Tea {
  constructor(name) {
    this.name = name
  }
}
const coffee = new Tea('coffee')

test('assert.instanceOf', () => {
  assert.instanceOf(foo, Tea, 'foo is not an instance of Tea')
})
```
