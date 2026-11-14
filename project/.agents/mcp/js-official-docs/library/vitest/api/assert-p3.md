---
title: "assert (part 3 of 4)"
tool: "vitest"
version: "5.1"
source: "https://github.com/vitest-dev/vitest/blob/7a3844954d8753fc0d5bed76a96ffd3a21716c22/docs/api/assert.md"
commit: "7a3844954d8753fc0d5bed76a96ffd3a21716c22"
license: "MIT"
---

# assert (part 3 of 4)

## hasAnyKeys

- **Type:** `<T>(object: T, keys: Array<Object | string> | { [key: <example-value>]: any }, message?: string) => void`

Asserts that `object` has at least one of the `keys` provided. You can also provide a single object instead of a keys array and its keys will be used as the expected set of keys.

```ts
import { assert, test } from 'vitest'

test('assert.hasAnyKeys', () => {
  assert.hasAnyKeys({ foo: 1, bar: 2, baz: 3 }, ['foo', 'iDontExist', 'baz'])
  assert.hasAnyKeys({ foo: 1, bar: 2, baz: 3 }, { foo: 30, iDontExist: 99, baz: 1337 })
  assert.hasAnyKeys(new Map([[{ foo: 1 }, 'bar'], ['key', 'value']]), [{ foo: 1 }, 'key'])
  assert.hasAnyKeys(new Set([{ foo: 'bar' }, 'anotherKey']), [{ foo: 'bar' }, 'anotherKey'])
})
```

## hasAllKeys

- **Type:** `<T>(object: T, keys: Array<Object | string> | { [key: <example-value>]: any }, message?: string) => void`

Asserts that `object` has all and only all of the `keys` provided. You can also provide a single object instead of a keys array and its keys will be used as the expected set of keys.

```ts
import { assert, test } from 'vitest'

test('assert.hasAllKeys', () => {
  assert.hasAllKeys({ foo: 1, bar: 2, baz: 3 }, ['foo', 'bar', 'baz'])
  assert.hasAllKeys({ foo: 1, bar: 2, baz: 3 }, { foo: 30, bar: 99, baz: 1337 })
  assert.hasAllKeys(new Map([[{ foo: 1 }, 'bar'], ['key', 'value']]), [{ foo: 1 }, 'key'])
  assert.hasAllKeys(new Set([{ foo: 'bar' }, 'anotherKey'], [{ foo: 'bar' }, 'anotherKey']))
})
```

## containsAllKeys

- **Type:** `<T>(object: T, keys: Array<Object | string> | { [key: <example-value>]: any }, message?: string) => void`

Asserts that `object` has all of the `keys` provided but may have more keys not listed. You can also provide a single object instead of a keys array and its keys will be used as the expected set of keys.

```ts
import { assert, test } from 'vitest'

test('assert.containsAllKeys', () => {
  assert.containsAllKeys({ foo: 1, bar: 2, baz: 3 }, ['foo', 'baz'])
  assert.containsAllKeys({ foo: 1, bar: 2, baz: 3 }, ['foo', 'bar', 'baz'])
  assert.containsAllKeys({ foo: 1, bar: 2, baz: 3 }, { foo: 30, baz: 1337 })
  assert.containsAllKeys({ foo: 1, bar: 2, baz: 3 }, { foo: 30, bar: 99, baz: 1337 })
  assert.containsAllKeys(new Map([[{ foo: 1 }, 'bar'], ['key', 'value']]), [{ foo: 1 }])
  assert.containsAllKeys(new Map([[{ foo: 1 }, 'bar'], ['key', 'value']]), [{ foo: 1 }, 'key'])
  assert.containsAllKeys(new Set([{ foo: 'bar' }, 'anotherKey'], [{ foo: 'bar' }]))
  assert.containsAllKeys(new Set([{ foo: 'bar' }, 'anotherKey'], [{ foo: 'bar' }, 'anotherKey']))
})
```

## doesNotHaveAnyKeys

- **Type:** `<T>(object: T, keys: Array<Object | string> | { [key: <example-value>]: any }, message?: string) => void`

Asserts that `object` has none of the `keys` provided. You can also provide a single object instead of a keys array and its keys will be used as the expected set of keys.

```ts
import { assert, test } from 'vitest'

test('assert.doesNotHaveAnyKeys', () => {
  assert.doesNotHaveAnyKeys({ foo: 1, bar: 2, baz: 3 }, ['one', 'two', 'example'])
  assert.doesNotHaveAnyKeys({ foo: 1, bar: 2, baz: 3 }, { one: 1, two: 2, example: 'foo' })
  assert.doesNotHaveAnyKeys(new Map([[{ foo: 1 }, 'bar'], ['key', 'value']]), [{ one: 'two' }, 'example'])
  assert.doesNotHaveAnyKeys(new Set([{ foo: 'bar' }, 'anotherKey'], [{ one: 'two' }, 'example']))
})
```

## doesNotHaveAllKeys

- **Type:** `<T>(object: T, keys: Array<Object | string> | { [key: <example-value>]: any }, message?: string) => void`

Asserts that `object` does not have at least one of the `keys` provided. You can also provide a single object instead of a keys array and its keys will be used as the expected set of keys.

```ts
import { assert, test } from 'vitest'

test('assert.hasAnyKeys', () => {
  assert.doesNotHaveAnyKeys({ foo: 1, bar: 2, baz: 3 }, ['one', 'two', 'example'])
  assert.doesNotHaveAnyKeys({ foo: 1, bar: 2, baz: 3 }, { one: 1, two: 2, example: 'foo' })
  assert.doesNotHaveAnyKeys(new Map([[{ foo: 1 }, 'bar'], ['key', 'value']]), [{ one: 'two' }, 'example'])
  assert.doesNotHaveAnyKeys(new Set([{ foo: 'bar' }, 'anotherKey']), [{ one: 'two' }, 'example'])
})
```

## hasAnyDeepKeys

- **Type:** `<T>(object: T, keys: Array<Object | string> | { [key: <example-value>]: any }, message?: string) => void`

Asserts that `object` has at least one of the `keys` provided. Since Sets and Maps can have objects as keys you can use this assertion to perform a deep comparison. You can also provide a single object instead of a keys array and its keys will be used as the expected set of keys.

```ts
import { assert, test } from 'vitest'

test('assert.hasAnyDeepKeys', () => {
  assert.hasAnyDeepKeys(new Map([[{ one: 'one' }, 'valueOne'], [1, 2]]), { one: 'one' })
  assert.hasAnyDeepKeys(new Map([[{ one: 'one' }, 'valueOne'], [1, 2]]), [{ one: 'one' }, { two: 'two' }])
  assert.hasAnyDeepKeys(new Map([[{ one: 'one' }, 'valueOne'], [{ two: 'two' }, 'valueTwo']]), [{ one: 'one' }, { two: 'two' }])
  assert.hasAnyDeepKeys(new Set([{ one: 'one' }, { two: 'two' }]), { one: 'one' })
  assert.hasAnyDeepKeys(new Set([{ one: 'one' }, { two: 'two' }]), [{ one: 'one' }, { three: 'three' }])
  assert.hasAnyDeepKeys(new Set([{ one: 'one' }, { two: 'two' }]), [{ one: 'one' }, { two: 'two' }])
})
```

## hasAllDeepKeys

- **Type:** `<T>(object: T, keys: Array<Object | string> | { [key: <example-value>]: any }, message?: string) => void`

Asserts that `object` has all and only all of the `keys` provided. Since Sets and Maps can have objects as keys you can use this assertion to perform a deep comparison. You can also provide a single object instead of a keys array and its keys will be used as the expected set of keys.

```ts
import { assert, test } from 'vitest'

test('assert.hasAnyDeepKeys', () => {
  assert.hasAllDeepKeys(new Map([[{ one: 'one' }, 'valueOne']]), { one: 'one' })
  assert.hasAllDeepKeys(new Map([[{ one: 'one' }, 'valueOne'], [{ two: 'two' }, 'valueTwo']]), [{ one: 'one' }, { two: 'two' }])
  assert.hasAllDeepKeys(new Set([{ one: 'one' }]), { one: 'one' })
  assert.hasAllDeepKeys(new Set([{ one: 'one' }, { two: 'two' }]), [{ one: 'one' }, { two: 'two' }])
})
```

## containsAllDeepKeys

- **Type:** `<T>(object: T, keys: Array<Object | string> | { [key: <example-value>]: any }, message?: string) => void`

Asserts that `object` contains all of the `keys` provided. Since Sets and Maps can have objects as keys you can use this assertion to perform a deep comparison. You can also provide a single object instead of a keys array and its keys will be used as the expected set of keys.

```ts
import { assert, test } from 'vitest'

test('assert.containsAllDeepKeys', () => {
  assert.containsAllDeepKeys(new Map([[{ one: 'one' }, 'valueOne'], [1, 2]]), { one: 'one' })
  assert.containsAllDeepKeys(new Map([[{ one: 'one' }, 'valueOne'], [{ two: 'two' }, 'valueTwo']]), [{ one: 'one' }, { two: 'two' }])
  assert.containsAllDeepKeys(new Set([{ one: 'one' }, { two: 'two' }]), { one: 'one' })
  assert.containsAllDeepKeys(new Set([{ one: 'one' }, { two: 'two' }]), [{ one: 'one' }, { two: 'two' }])
})
```

## doesNotHaveAnyDeepKeys

- **Type:** `<T>(object: T, keys: Array<Object | string> | { [key: <example-value>]: any }, message?: string) => void`

Asserts that `object` has none of the `keys` provided. Since Sets and Maps can have objects as keys you can use this assertion to perform a deep comparison. You can also provide a single object instead of a keys array and its keys will be used as the expected set of keys.

```ts
import { assert, test } from 'vitest'

test('assert.doesNotHaveAnyDeepKeys', () => {
  assert.doesNotHaveAnyDeepKeys(new Map([[{ one: 'one' }, 'valueOne'], [1, 2]]), { thisDoesNot: 'exist' })
  assert.doesNotHaveAnyDeepKeys(new Map([[{ one: 'one' }, 'valueOne'], [{ two: 'two' }, 'valueTwo']]), [{ twenty: 'twenty' }, { fifty: 'fifty' }])
  assert.doesNotHaveAnyDeepKeys(new Set([{ one: 'one' }, { two: 'two' }]), { twenty: 'twenty' })
  assert.doesNotHaveAnyDeepKeys(new Set([{ one: 'one' }, { two: 'two' }]), [{ twenty: 'twenty' }, { fifty: 'fifty' }])
})
```

## doesNotHaveAllDeepKeys

- **Type:** `<T>(object: T, keys: Array<Object | string> | { [key: <example-value>]: any }, message?: string) => void`

Asserts that `object` does not have at least one of the `keys` provided. Since Sets and Maps can have objects as keys you can use this assertion to perform a deep comparison. You can also provide a single object instead of a keys array and its keys will be used as the expected set of keys.

```ts
import { assert, test } from 'vitest'

test('assert.doesNotHaveAllDeepKeys', () => {
  assert.doesNotHaveAllDeepKeys(new Map([[{ one: 'one' }, 'valueOne'], [1, 2]]), { thisDoesNot: 'exist' })
  assert.doesNotHaveAllDeepKeys(new Map([[{ one: 'one' }, 'valueOne'], [{ two: 'two' }, 'valueTwo']]), [{ twenty: 'twenty' }, { one: 'one' }])
  assert.doesNotHaveAllDeepKeys(new Set([{ one: 'one' }, { two: 'two' }]), { twenty: 'twenty' })
  assert.doesNotHaveAllDeepKeys(new Set([{ one: 'one' }, { two: 'two' }]), [{ one: 'one' }, { fifty: 'fifty' }])
})
```

## throws

- **Type:**
  - `(fn: () => void, errMsgMatcher?: RegExp | string, ignored?: any, message?: string) => void`
  - `(fn: () => void, errorLike?: ErrorConstructor | Error | null, errMsgMatcher?: RegExp | string | null, message?: string) => void`
- **Alias:**
  - `throw`
  - `Throw`

If `errorLike` is an Error constructor, asserts that `fn` will throw an error that is an instance of `errorLike`. If errorLike is an Error instance, asserts that the error thrown is the same instance as `errorLike`. If `errMsgMatcher` is provided, it also asserts that the error thrown will have a message matching `errMsgMatcher`.

```ts
import { assert, test } from 'vitest'

test('assert.throws', () => {
  assert.throws(fn, 'Error thrown must have this msg')
  assert.throws(fn, /Error thrown must have a msg that matches this/)
  assert.throws(fn, ReferenceError)
  assert.throws(fn, errorInstance)
  assert.throws(fn, ReferenceError, 'Error thrown must be a ReferenceError and have this msg')
  assert.throws(fn, errorInstance, 'Error thrown must be the same errorInstance and have this msg')
  assert.throws(fn, ReferenceError, /Error thrown must be a ReferenceError and match this/)
  assert.throws(fn, errorInstance, /Error thrown must be the same errorInstance and match this/)
})
```

## doesNotThrow

- **Type:** `(fn: () => void, errMsgMatcher?: RegExp | string, ignored?: any, message?: string) => void`
- **Type:** `(fn: () => void, errorLike?: ErrorConstructor | Error | null, errMsgMatcher?: RegExp | string | null, message?: string) => void`

If `errorLike` is an Error constructor, asserts that `fn` will not throw an error that is an instance of `errorLike`. If errorLike is an Error instance, asserts that the error thrown is not the same instance as `errorLike`. If `errMsgMatcher` is provided, it also asserts that the error thrown will not have a message matching `errMsgMatcher`.

```ts
import { assert, test } from 'vitest'

test('assert.doesNotThrow', () => {
  assert.doesNotThrow(fn, 'Any Error thrown must not have this message')
  assert.doesNotThrow(fn, /Any Error thrown must not match this/)
  assert.doesNotThrow(fn, Error)
  assert.doesNotThrow(fn, errorInstance)
  assert.doesNotThrow(fn, Error, 'Error must not have this message')
  assert.doesNotThrow(fn, errorInstance, 'Error must not have this message')
  assert.doesNotThrow(fn, Error, /Error must not match this/)
  assert.doesNotThrow(fn, errorInstance, /Error must not match this/)
})
```

## operator

- **Type:** `(val1: OperatorComparable, operator: Operator, val2: OperatorComparable, message?: string) => void`

Compare `val1` and `val2` using `operator`.

```ts
import { assert, test } from 'vitest'

test('assert.operator', () => {
  assert.operator(1, '<', 2, 'everything is ok')
})
```

## closeTo

- **Type:** `(actual: number, expected: number, delta: number, message?: string) => void`
- **Alias:** `approximately`

Asserts that the `actual` is equal `expected`, to within a +/- `delta` range.

```ts
import { assert, test } from 'vitest'

test('assert.closeTo', () => {
  assert.closeTo(1.5, 1, 0.5, 'numbers are close')
})
```

## sameMembers

- **Type:** `<T>(set1: T[], set2: T[], message?: string) => void`

Asserts that `set1` and `set2` have the same members in any order. Uses a strict equality check (===).

```ts
import { assert, test } from 'vitest'

test('assert.sameMembers', () => {
  assert.sameMembers([1, 2, 3], [2, 1, 3], 'same members')
})
```

## notSameMembers

- **Type:** `<T>(set1: T[], set2: T[], message?: string) => void`

Asserts that `set1` and `set2` don't have the same members in any order. Uses a strict equality check (===).

```ts
import { assert, test } from 'vitest'

test('assert.sameMembers', () => {
  assert.notSameMembers([1, 2, 3], [5, 1, 3], 'not same members')
})
```

## sameDeepMembers

- **Type:** `<T>(set1: T[], set2: T[], message?: string) => void`

Asserts that `set1` and `set2` have the same members in any order. Uses a deep equality check.

```ts
import { assert, test } from 'vitest'

test('assert.sameDeepMembers', () => {
  assert.sameDeepMembers([{ a: 1 }, { b: 2 }, { c: 3 }], [{ b: 2 }, { a: 1 }, { c: 3 }], 'same deep members')
})
```

## notSameDeepMembers

- **Type:** `<T>(set1: T[], set2: T[], message?: string) => void`

Asserts that `set1` and `set2` don’t have the same members in any order. Uses a deep equality check.

```ts
import { assert, test } from 'vitest'

test('assert.sameDeepMembers', () => {
  assert.sameDeepMembers([{ a: 1 }, { b: 2 }, { c: 3 }], [{ b: 2 }, { a: 1 }, { c: 3 }], 'same deep members')
})
```

## sameOrderedMembers

- **Type:** `<T>(set1: T[], set2: T[], message?: string) => void`

Asserts that `set1` and `set2` have the same members in the same order. Uses a strict equality check (===).

```ts
import { assert, test } from 'vitest'

test('assert.sameOrderedMembers', () => {
  assert.sameOrderedMembers([1, 2, 3], [1, 2, 3], 'same ordered members')
})
```

## notSameOrderedMembers

- **Type:** `<T>(set1: T[], set2: T[], message?: string) => void`

Asserts that `set1` and `set2` have the same members in the same order. Uses a strict equality check (===).

```ts
import { assert, test } from 'vitest'

test('assert.notSameOrderedMembers', () => {
  assert.notSameOrderedMembers([1, 2, 3], [2, 1, 3], 'not same ordered members')
})
```

## sameDeepOrderedMembers

- **Type:** `<T>(set1: T[], set2: T[], message?: string) => void`

Asserts that `set1` and `set2` have the same members in the same order. Uses a deep equality check.

```ts
import { assert, test } from 'vitest'

test('assert.sameDeepOrderedMembers', () => {
  assert.sameDeepOrderedMembers([{ a: 1 }, { b: 2 }, { c: 3 }], [{ a: 1 }, { b: 2 }, { c: 3 }], 'same deep ordered members')
})
```
