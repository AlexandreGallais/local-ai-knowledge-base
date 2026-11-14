---
title: "Number() constructor"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/number/number/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Number() constructor

The **`Number()`** constructor creates `Number` objects. When called as a function, it returns primitive values of type Number.

## Syntax

```js
new Number(value)
Number(value)
```

> **Note:**
> `Number()` can be called with or without `new`, but with different effects. See Return value.

### Parameters

- `value`
    The numeric value of the object being created.

### Return value

When `Number()` is called as a function (without `new`), it returns `value` coerced to a number primitive. Specially, BigInts values are converted to numbers instead of throwing. If `value` is absent, it becomes `0`.

When `Number()` is called as a constructor (with `new`), it uses the coercion process above and returns a wrapping `Number` object, which is **not** a primitive.

> **Warning:**
> You should rarely find yourself using `Number` as a constructor.

## Examples

### Creating Number objects

```js
const a = new Number("123"); // a === 123 is false
const b = Number("123"); // b === 123 is true
a instanceof Number; // is true
b instanceof Number; // is false
typeof a; // "object"
typeof b; // "number"
```

### Using Number() to convert a BigInt to a number

`Number()` is the only case where a BigInt can be converted to a number without throwing, because it's very explicit.

```js
+1n; // TypeError: Cannot convert a BigInt value to a number
0 + 1n; // TypeError: Cannot mix BigInt and other types, use explicit conversions
```

```js
Number(1n); // 1
```

Note that this may result in loss of precision, if the BigInt is too large to be safely represented.

```js
BigInt(Number(2n ** 54n + 1n)) === 2n ** 54n + 1n; // false
```

## See also

- Polyfill of modern `Number` behavior (with support binary and octal literals) in `core-js`
- `NaN`
- `Math`
- `BigInt`
