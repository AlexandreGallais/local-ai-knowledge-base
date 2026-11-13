---
title: "Atomics.waitAsync()"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/atomics/waitasync/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Atomics.waitAsync()

The **`Atomics.waitAsync()`** static method verifies that a shared memory location contains a given value, immediately returning an object with the `value` property containing the string `"not-equal"` if the memory location does not match the given value, or `"timed-out"` if the timeout was set to zero. Otherwise the method returns an object where the `value` property is a `Promise` that fulfills with either `"ok"` when `Atomics.notify()` is called, or `"timed-out"` if the timeout expires.

`Atomics.waitAsync()` and `Atomics.notify()` are used together to enable thread synchronization based on a value in shared memory. A thread can proceed immediately if the synchronization value has changed, or it can wait for notification from another thread when it reaches the synchronization point.

This method only works with an `Int32Array` or `BigInt64Array` that views a `SharedArrayBuffer`. It is non-blocking and, unlike `Atomics.wait()`, can be used on the main thread. Because it does not block the whole thread, you still need to be careful not to access the shared memory before the promise settles.

## Syntax

```js
Atomics.waitAsync(typedArray, index, value)
Atomics.waitAsync(typedArray, index, value, timeout)
```

### Parameters

- `typedArray`
    An `Int32Array` or `BigInt64Array` that views a `SharedArrayBuffer`.
- `index`
    The position in the `typedArray` to wait on.
- `value`
    The expected value to test.
- `timeout` (optional)
    Time to wait in milliseconds. `NaN` (and values that get converted to `NaN`, such as `undefined`) becomes `Infinity`. Negative values become `0`.

### Return value

An `Object` with the following properties:

- `async`
    A boolean indicating whether the `value` property is a `Promise` or not.
- `value`
    If `async` is `false`, it will be a string which is either `"not-equal"` or `"timed-out"` (only when the `timeout` parameter is `0`). If `async` is `true`, it will be a `Promise` which is fulfilled with a string value, either `"ok"` or `"timed-out"`. The promise is never rejected.

### Exceptions

- `TypeError`
    Thrown if `typedArray` is not an `Int32Array` or `BigInt64Array` that views a `SharedArrayBuffer`.
- `RangeError`
    Thrown if `index` is out of bounds in the `typedArray`.

## Examples

Note that these examples cannot be run directly from the console or an arbitrary web page, because `SharedArrayBuffer` is not defined unless its security requirements are met.

### Using Atomics.waitAsync()

Given a shared `Int32Array`:

```js
// Create a SharedArrayBuffer with a size in bytes
const sab = new SharedArrayBuffer(1024);
const int32 = new Int32Array(sab);
```

A reading thread is sleeping and waiting on location 0 which is expected to be 0.
The `result.value` will be a promise.

```js
const result = Atomics.waitAsync(int32, 0, 0, 1000);
// { async: true, value: Promise {<pending>} }
```

In the reading thread or in another thread, the memory location 0 is called and the promise can be resolved with `"ok"`.

```js
Atomics.notify(int32, 0);
// { async: true, value: Promise {<fulfilled>: 'ok'} }
```

If it isn't resolving to `"ok"`, the value in the shared memory location wasn't the expected (the `value` would be `"not-equal"` instead of a promise) or the timeout was reached (the promise will resolve to `"time-out"`).

## See also

- `Atomics`
- `Atomics.wait()`
- `Atomics.notify()`
