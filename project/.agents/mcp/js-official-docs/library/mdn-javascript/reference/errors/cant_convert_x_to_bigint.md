---
title: "TypeError: can't convert x to BigInt"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/errors/cant_convert_x_to_bigint/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# TypeError: can't convert x to BigInt

The JavaScript exception "x can't be converted to BigInt" occurs when attempting to convert a `Symbol`, `null`, or `undefined` value to a `BigInt`, or if an operation expecting a BigInt parameter receives a number.

## Message

```plain
TypeError: Cannot convert null to a BigInt (V8-based)
TypeError: can't convert null to BigInt (Firefox)
TypeError: Invalid argument type in ToBigInt operation (Safari)
```

## Error type

`TypeError`.

## What went wrong?

When using the `BigInt()` function to convert a value to a BigInt, the value would first be converted to a primitive. Then, if it's not one of BigInt, string, number, and boolean, the error is thrown.

Some operations, like `BigInt.asIntN`, require the parameter to be a BigInt. Passing in a number in this case will also throw this error.

## Examples

### Using BigInt() on invalid values

```js
const a = BigInt(null);
// TypeError: can't convert null to BigInt
const b = BigInt(undefined);
// TypeError: can't convert undefined to BigInt
const c = BigInt(Symbol("1"));
// TypeError: can't convert Symbol("1") to BigInt
```

```js
const a = BigInt(1);
const b = BigInt(true);
const c = BigInt("1");
const d = BigInt(Symbol("1").description);
```

> **Note:**
> Simply coercing the value to a string or number using `String()` or `Number()` before passing it to `BigInt()` is usually not sufficient to avoid all errors. If the string is not a valid integer number string, a SyntaxError is thrown; if the number is not an integer (most notably, `NaN`), a RangeError is thrown. If the range of input is unknown, properly validate it before using `BigInt()`.

### Passing a number to a function expecting a BigInt

```js
const a = BigInt.asIntN(4, 8);
// TypeError: can't convert 8 to BigInt
const b = new BigInt64Array(3).fill(3);
// TypeError: can't convert 3 to BigInt
```

```js
const a = BigInt.asIntN(4, 8n);
const b = new BigInt64Array(3).fill(3n);
```

## See also

- `BigInt()` constructor
