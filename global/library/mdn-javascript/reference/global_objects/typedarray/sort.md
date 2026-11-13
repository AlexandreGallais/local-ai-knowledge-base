---
title: "TypedArray.prototype.sort()"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/typedarray/sort/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# TypedArray.prototype.sort()

The **`sort()`** method of `TypedArray` instances sorts the elements of a typed array _in place_ and returns the reference to the same typed array, now sorted. This method has the same algorithm as `Array.prototype.sort()`, except that it sorts the values numerically instead of as strings by default.

```js
const uint8 = new Uint8Array([40, 10, 50, 20, 30]);
uint8.sort();

console.log(uint8);
// Expected output: Uint8Array [10, 20, 30, 40, 50]
```

## Syntax

```js
sort()
sort(compareFn)
```

### Parameters

- `compareFn` (optional)
    A function that determines the order of the elements. The function is called with the following arguments:
    - `a`
        The first element for comparison.
    - `b`
        The second element for comparison.

    It should return a number where:
    - A negative value indicates that `a` should come before `b`.
    - A positive value indicates that `a` should come after `b`.
    - Zero or `NaN` indicates that `a` and `b` are considered equal.

    To memorize this, remember that `(a, b) => a - b` sorts numbers in ascending order.

    If omitted, the typed array elements are sorted according to numeric value.

### Return value

The reference to the original typed array, now sorted. Note that the typed array is sorted _in place_, and no copy is made.

## Description

See `Array.prototype.sort()` for more details. This method is not generic and can only be called on typed array instances.

## Examples

### Using sort()

For more examples, see also the `Array.prototype.sort()` method.

```js
let numbers = new Uint8Array([40, 1, 5, 200]);
numbers.sort();
// Uint8Array [ 1, 5, 40, 200 ]
// Unlike plain Arrays, a compare function is not required
// to sort the numbers numerically.

// Regular Arrays require a compare function to sort numerically:
numbers = [40, 1, 5, 200];
numbers.sort();
// [1, 200, 40, 5]

numbers.sort((a, b) => a - b); // compare numbers
// [ 1, 5, 40, 200 ]
```

## See also

- Polyfill of `TypedArray.prototype.sort` with modern behavior like stable sort in `core-js`
- JavaScript typed arrays guide
- `TypedArray`
- `TypedArray.prototype.reverse()`
- `TypedArray.prototype.toSorted()`
- `Array.prototype.sort()`
