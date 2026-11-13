---
title: "TypedArray.prototype.findLast()"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/typedarray/findlast/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# TypedArray.prototype.findLast()

The **`findLast()`** method of `TypedArray` instances iterates the typed array in reverse order and returns the value of the first element that satisfies the provided testing function. If no elements satisfy the testing function, `undefined` is returned. This method has the same algorithm as `Array.prototype.findLast()`.

```js
function isNegative(element /*, index, array */) {
  return element < 0;
}

const int8 = new Int8Array([10, 0, -10, 20, -30, 40, 50]);

console.log(int8.findLast(isNegative));
// Expected output: -30
```

## Syntax

```js
findLast(callbackFn)
findLast(callbackFn, thisArg)
```

### Parameters

- `callbackFn`
    A function to execute for each element in the typed array. It should return a truthy value to indicate a matching element has been found, and a falsy value otherwise. The function is called with the following arguments:
    - `element`
        The current element being processed in the typed array.
    - `index`
        The index of the current element being processed in the typed array.
    - `array`
        The typed array `findLast()` was called upon.
- `thisArg` (optional)
    A value to use as `this` when executing `callbackFn`. See iterative methods.

### Return value

The last (highest-index) element in the typed array that satisfies the provided testing function; `undefined` if no matching element is found.

## Description

See `Array.prototype.findLast()` for more details. This method is not generic and can only be called on typed array instances.

## Examples

### Find the last prime number in a typed array

The following example returns the last element in the typed array that is a prime number, or `undefined` if there is no prime number.

```js
function isPrime(n) {
  if (n < 2) {
    return false;
  }
  if (n % 2 === 0) {
    return n === 2;
  }
  for (let factor = 3; factor * factor <= n; factor += 2) {
    if (n % factor === 0) {
      return false;
    }
  }
  return true;
}

let uint8 = new Uint8Array([4, 6, 8, 12]);
console.log(uint8.findLast(isPrime)); // undefined (no primes in array)
uint8 = new Uint8Array([4, 5, 7, 8, 9, 11, 12]);
console.log(uint8.findLast(isPrime)); // 11
```

> **Note:**
> The `isPrime()` implementation is for demonstration only. For a real-world application, you would want to use a heavily memoized algorithm such as the Sieve of Eratosthenes to avoid repeated calculations.

## See also

- Polyfill of `TypedArray.prototype.findLast` in `core-js`
- JavaScript typed arrays guide
- `TypedArray`
- `TypedArray.prototype.find()`
- `TypedArray.prototype.findIndex()`
- `TypedArray.prototype.findLastIndex()`
- `TypedArray.prototype.includes()`
- `TypedArray.prototype.filter()`
- `TypedArray.prototype.every()`
- `TypedArray.prototype.some()`
- `Array.prototype.findLast()`
