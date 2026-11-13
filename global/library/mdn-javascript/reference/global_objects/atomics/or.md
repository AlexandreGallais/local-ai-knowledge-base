---
title: "Atomics.or()"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/atomics/or/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Atomics.or()

The **`Atomics.or()`** static method computes a bitwise OR with a given value at a given position in the array, and returns the old value at that position. This atomic operation guarantees that no other write happens until the modified value is written back.

## Syntax

```js
Atomics.or(typedArray, index, value)
```

### Parameters

- `typedArray`
    An integer typed array. One of `Int8Array`, `Uint8Array`, `Int16Array`, `Uint16Array`, `Int32Array`, `Uint32Array`, `BigInt64Array`, or `BigUint64Array`.
- `index`
    The position in the `typedArray` to compute the bitwise OR.
- `value`
    The number to compute the bitwise OR with.

### Return value

The old value at the given position (`typedArray[index]`).

### Exceptions

- `TypeError`
    Thrown if `typedArray` is not one of the allowed integer types.
- `RangeError`
    Thrown if `index` is out of bounds in the `typedArray`.

## Description

The bitwise OR operation yields 1, if either `a` or `b` is 1. The truth table for the OR operation is:

| `a` | `b` | `a \| b` |
| --- | --- | -------- |
| 0   | 0   | 0        |
| 0   | 1   | 1        |
| 1   | 0   | 1        |
| 1   | 1   | 1        |

For example, a bitwise OR of `5 | 1` results in `0101` which is 5 in decimal.

```plain
5  0101
1  0001
   ----
5  0101
```

## Examples

Note that these examples cannot be run directly from the console or an arbitrary web page, because `SharedArrayBuffer` is not defined unless its security requirements are met.

### Using Atomics.or()

```js
// Create a SharedArrayBuffer with a size in bytes
const sab = new SharedArrayBuffer(1024);
// Create a view and set the value of the 0 index
const ta = new Uint8Array(sab);
ta[0] = 7;

// 7 (0111) OR 10 (1010) = 15 (1111)
console.log(Atomics.or(ta, 0, 10)); // 7, the old value
console.log(Atomics.load(ta, 0)); // 15, the new/current value
```

## See also

- `Atomics`
- `Atomics.and()`
- `Atomics.xor()`
