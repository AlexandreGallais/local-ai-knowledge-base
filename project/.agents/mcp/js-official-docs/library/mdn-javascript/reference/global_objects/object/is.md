---
title: "Object.is()"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/object/is/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Object.is()

The **`Object.is()`** static method determines whether two values are the same value.

```js
console.log(Object.is("1", 1));
// Expected output: false

console.log(Object.is(NaN, NaN));
// Expected output: true

console.log(Object.is(-0, 0));
// Expected output: false

const obj = {};
console.log(Object.is(obj, {}));
// Expected output: false
```

## Syntax

```js
Object.is(value1, value2)
```

### Parameters

- `value1`
    The first value to compare.
- `value2`
    The second value to compare.

### Return value

A boolean indicating whether or not the two arguments are the same value.

## Description

`Object.is()` determines whether two values are the same value. Two values are the same if one of the following holds:

- both `undefined`
- both `null`
- both `true` or both `false`
- both strings of the same length with the same characters in the same order
- both the same object (meaning both values reference the same object in memory)
- both BigInts with the same numeric value
- both symbols that reference the same symbol value
- both numbers and
  - both `+0`
  - both `-0`
  - both `NaN`
  - or both non-zero, not `NaN`, and have the same value

`Object.is()` is not equivalent to the `==` operator. The `==` operator applies various coercions to both sides (if they are not the same type) before testing for equality (resulting in such behavior as `"" == false` being `true`), but `Object.is()` doesn't coerce either value.

`Object.is()` is also _not_ equivalent to the `===` operator. The only difference between `Object.is()` and `===` is in their treatment of signed zeros and `NaN` values. The `===` operator (and the `==` operator) treats the number values `-0` and `+0` as equal, but treats `NaN` as not equal to each other.

## Examples

### Using Object.is()

```js
// Case 1: Evaluation result is the same as using ===
Object.is(25, 25); // true
Object.is("foo", "foo"); // true
Object.is("foo", "bar"); // false
Object.is(null, null); // true
Object.is(undefined, undefined); // true
Object.is(window, window); // true
Object.is([], []); // false
const foo = { a: 1 };
const bar = { a: 1 };
const sameFoo = foo;
Object.is(foo, foo); // true
Object.is(foo, bar); // false
Object.is(foo, sameFoo); // true

// Case 2: Signed zero
Object.is(0, -0); // false
Object.is(+0, -0); // false
Object.is(-0, -0); // true

// Case 3: NaN
Object.is(NaN, 0 / 0); // true
Object.is(NaN, Number.NaN); // true
```

## See also

- Polyfill of `Object.is` in `core-js`
- es-shims polyfill of `Object.is`
- Equality comparisons and sameness
