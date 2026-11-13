---
title: "Atomics.xor()"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/atomics/xor/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Atomics.xor()

The **`Atomics.xor()`** static method computes a bitwise XOR with a given value at a given position in the array, and returns the old value at that position. This atomic operation guarantees that no other write happens until the modified value is written back.

## Syntax

```js
Atomics.xor(typedArray, index, value)
```

### Parameters

- `typedArray`
    An integer typed array. One of `Int8Array`, `Uint8Array`, `Int16Array`, `Uint16Array`, `Int32Array`, `Uint32Array`, `BigInt64Array`, or `BigUint64Array`.
- `index`
    The position in the `typedArray` to compute the bitwise XOR.
- `value`
    The number to compute the bitwise XOR with.

### Return value

The old value at the given position (`typedArray[index]`).

### Exceptions

- `TypeError`
    Thrown if `typedArray` is not one of the allowed integer types.
- `RangeError`
    Thrown if `index` is out of bounds in the `typedArray`.

## Description

The bitwise XOR operation yields 1, if `a` and `b` are different. The truth table for the XOR operation is:

| `a` | `b` | `a ^ b` |
| --- | --- | ------- |
| 0   | 0   | 0       |
| 0   | 1   | 1       |
| 1   | 0   | 1       |
| 1   | 1   | 0       |

For example, a bitwise XOR of `5 ^ 1` results in `0100` which is 4 in decimal.

```plain
5  0101
1  0001
   ----
4  0100
```

## Examples

Note that these examples cannot be run directly from the console or an arbitrary web page, because `SharedArrayBuffer` is not defined unless its security requirements are met.

### Using Atomics.xor()

```js
// Create a SharedArrayBuffer with a size in bytes
const sab = new SharedArrayBuffer(1024);
// Create a view and set the value of the 0 index
const ta = new Uint8Array(sab);
ta[0] = 7;

// 7 (0111) XOR 2 (0010) = 5 (0101)
console.log(Atomics.xor(ta, 0, 2)); // 7, the old value
console.log(Atomics.load(ta, 0)); // 5, the new/current value
```

## See also

- `Atomics`
- `Atomics.and()`
- `Atomics.or()`
