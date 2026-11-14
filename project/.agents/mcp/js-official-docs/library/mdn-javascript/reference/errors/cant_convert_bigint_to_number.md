---
title: "TypeError: can't convert BigInt to number"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/errors/cant_convert_bigint_to_number/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# TypeError: can't convert BigInt to number

The JavaScript exception "can't convert BigInt to number" occurs when an arithmetic operation involves a mix of `BigInt` and `Number` values.

## Message

```plain
TypeError: Cannot convert a BigInt value to a number (V8-based)
TypeError: Cannot mix BigInt and other types, use explicit conversions (V8-based)
TypeError: BigInts have no unsigned right shift, use >> instead (V8-based)
TypeError: can't convert BigInt to number (Firefox)
TypeError: Conversion from 'BigInt' to 'number' is not allowed. (Safari)
TypeError: Invalid mix of BigInt and other type in addition/multiplication/…. (Safari)
TypeError: BigInt does not support >>> operator (Safari)
```

## Error type

`TypeError`.

## What went wrong?

The two sides of an arithmetic operator must both be BigInts or both not. If an operation involves a mix of BigInts and numbers, it's ambiguous whether the result should be a BigInt or number, since there may be loss of precision in both cases.

The error also happens when a BigInt is implicitly converted to a number via the number coercion process. For example, if a BigInt is passed to a built-in method that expects a number.

The error can also happen if the unsigned right shift operator (`>>>`) is used between two BigInts. In Firefox, the message is the same: "can't convert BigInt to number".

## Examples

### Mixing numbers and BigInts in operations

```js
const sum = 1n + 1;
// TypeError: can't convert BigInt to number
```

Instead, explicitly coerce one side to a BigInt or number.

```js
const sum = 1n + BigInt(1);
const sum2 = Number(1n) + 1;
```

### Using unsigned right shift on BigInts

```js
const a = 4n >>> 2n;
// TypeError: can't convert BigInt to number
```

Use normal right shift instead.

```js
const a = 4n >> 2n;
```

## See also

- `BigInt`
