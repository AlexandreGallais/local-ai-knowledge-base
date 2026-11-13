---
title: "Atomics.store()"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/atomics/store/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Atomics.store()

The **`Atomics.store()`** static method stores a given value at a given position in the array and returns that value. This atomic operation guarantees that the write is tear-free, and that all atomic writes are sequentially consistent.

Note that unlike many other `Atomic` methods, `store()` returns the new value instead of the old value. To get the old value, use `Atomics.exchange()` instead.

## Syntax

```js
Atomics.store(typedArray, index, value)
```

### Parameters

- `typedArray`
    An integer typed array. One of `Int8Array`, `Uint8Array`, `Int16Array`, `Uint16Array`, `Int32Array`, `Uint32Array`, `BigInt64Array`, or `BigUint64Array`.
- `index`
    The position in the `typedArray` to store a `value` in.
- `value`
    The number to store.

### Return value

The value that has been stored.

### Exceptions

- `TypeError`
    Thrown if `typedArray` is not one of the allowed integer types.
- `RangeError`
    Thrown if `index` is out of bounds in the `typedArray`.

## Examples

Note that these examples cannot be run directly from the console or an arbitrary web page, because `SharedArrayBuffer` is not defined unless its security requirements are met.

### Using Atomics.store()

```js
// Create a SharedArrayBuffer with a size in bytes
const sab = new SharedArrayBuffer(1024);
const ta = new Uint8Array(sab);

console.log(Atomics.store(ta, 0, 12)); // 12, the new/current value
console.log(Atomics.load(ta, 0)); // 12, the new/current value
```

## See also

- `Atomics`
- `Atomics.load()`
- `Atomics.exchange()`
