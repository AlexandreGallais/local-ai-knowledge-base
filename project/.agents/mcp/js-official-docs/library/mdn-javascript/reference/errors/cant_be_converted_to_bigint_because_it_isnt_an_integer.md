---
title: "RangeError: x can't be converted to BigInt because it isn't an integer"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/errors/cant_be_converted_to_bigint_because_it_isnt_an_integer/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# RangeError: x can't be converted to BigInt because it isn't an integer

The JavaScript exception "x can't be converted to BigInt because it isn't an integer" occurs when the `BigInt()` function is used on a number that isn't an integer.

## Message

```plain
RangeError: The number 1.5 cannot be converted to a BigInt because it is not an integer (V8-based & Firefox)
RangeError: Not an integer (Safari)
```

## Error type

`RangeError`.

## What went wrong?

When using the `BigInt()` function to convert a number to a BigInt, the number must be an integer (such that `Number.isInteger` returns true).

## Examples

### Invalid cases

```js
const a = BigInt(1.5);
// RangeError: The number 1.5 cannot be converted to a BigInt because it is not an integer
const b = BigInt(NaN);
// RangeError: NaN cannot be converted to a BigInt because it is not an integer
```

### Valid cases

```js
const a = BigInt(1);
```

## See also

- `BigInt()` constructor
- `Number.isInteger()`
