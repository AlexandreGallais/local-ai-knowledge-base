---
title: "Set() constructor"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/set/set/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Set() constructor

The **`Set()`** constructor creates `Set` objects.

```js
const set = new Set([1, 2, 3, 4, 5]);

console.log(set.has(1));
// Expected output: true

console.log(set.has(5));
// Expected output: true

console.log(set.has(6));
// Expected output: false
```

## Syntax

```js
new Set()
new Set(iterable)
```

> **Note:**
> `Set()` can only be constructed with `new`. Attempting to call it without `new` throws a `TypeError`.

### Parameters

- `iterable` (optional)
    If an iterable object (such as an array) is passed, all of its elements will be added to the new `Set`. If you don't specify this parameter, or its value is `null` or `undefined`, the new `Set` is empty.

### Return value

A new `Set` object.

## Examples

### Using the `Set` object

```js
const mySet = new Set();

mySet.add(1); // Set [ 1 ]
mySet.add(5); // Set [ 1, 5 ]
mySet.add(5); // Set [ 1, 5 ]
mySet.add("some text"); // Set [ 1, 5, 'some text' ]
const o = { a: 1, b: 2 };
mySet.add(o);
```

## See also

- Polyfill of `Set` in `core-js`
- es-shims polyfill of `Set`
- `Set`
