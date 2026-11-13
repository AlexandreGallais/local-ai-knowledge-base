---
title: "Atomics.isLockFree()"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/atomics/islockfree/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Atomics.isLockFree()

The **`Atomics.isLockFree()`** static method is used to determine whether the `Atomics` methods use locks or atomic hardware operations when applied to typed arrays with the given element byte size. It is intended as an optimization primitive, so that high-performance algorithms can determine whether to use locks or atomic operations in critical sections. If an atomic primitive is not lock-free, it is often more efficient for an algorithm to provide its own locking.

```js
console.log(Atomics.isLockFree(3));
// 3 is not one of the BYTES_PER_ELEMENT values
// Expected output: false

console.log(Atomics.isLockFree(4));
// 4 is one of the BYTES_PER_ELEMENT values
// Expected output: true
```

## Syntax

```js
Atomics.isLockFree(size)
```

### Parameters

- `size`
    The size in bytes to check.

### Return value

A `true` or `false` value indicating whether the operation is lock free.

- Always `true` if `size` is 4, because all known platforms support 4-byte atomic operations.
- Always `false` if the given size is not one of the `BYTES_PER_ELEMENT` property of integer TypedArray types.

## Examples

### Using Atomics.isLockFree()

```js
Atomics.isLockFree(1); // true (platform-dependent)
Atomics.isLockFree(2); // true (platform-dependent)
Atomics.isLockFree(3); // false
Atomics.isLockFree(4); // true
Atomics.isLockFree(5); // false
Atomics.isLockFree(6); // false
Atomics.isLockFree(7); // false
Atomics.isLockFree(8); // true (platform-dependent)
```

## See also

- `Atomics`
