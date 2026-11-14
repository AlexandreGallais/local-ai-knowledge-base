---
title: "WeakMap.prototype.getOrInsertComputed()"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/weakmap/getorinsertcomputed/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# WeakMap.prototype.getOrInsertComputed()

The **`getOrInsertComputed()`** method of `WeakMap` instances returns the value corresponding to the specified key in this `WeakMap`. If the key is not present, it inserts a new entry with the key and a default value computed from a given callback, and returns the inserted value.

Use this method instead of `WeakMap.prototype.getOrInsert()` when the default value is expensive to compute, and you want to avoid computing it unless it's actually needed.

```js
const alan = { name: "Alan" };
const map = new WeakMap([[alan, 35]]);
const defaultCreator = (obj) => `${obj.name}'s age is unknown`;

console.log(map.getOrInsertComputed(alan, defaultCreator));
// Expected output: 35

const brett = { name: "Brett" };
console.log(map.getOrInsertComputed(brett, defaultCreator));
// Expected output: "Brett's age is unknown"
```

## Syntax

```js
getOrInsertComputed(key, callback)
```

### Parameters

- `key`
    The key of the element to return from the `Map` object. Must be either an object or a non-registered symbol. Object keys are compared by reference, not by value.
- `callback`
    A function that returns the value to insert and return if the key is not already present in the `Map` object. The function is called with the following argument:
    - `key`
        The same key that was passed to `getOrInsertComputed()`.

### Return value

The value associated with the specified key in the `WeakMap` object. If the key can't be found, the result of `callback(key)` is inserted and returned.

### Exceptions

- `TypeError`
    Thrown in one of the following cases:
    - `key` is not an object or a non-registered symbol.
    - `callback` isn't callable.

## Examples

### Caching

Caching involves building a mapping from the parameter of an expensive function to its return value, so that future calls with the same parameter can return the cached value instead of recomputing it. When no cached value exists, it needs to be computed and inserted into the cache.

We use a `WeakMap` here instead of a `Map`, so that the cached argument values do not prevent them from being garbage-collected if they are no longer needed elsewhere in the program. If your cached function takes non-object arguments, you can use a `Map` instead.

```js
// Any expensive function you want to cache
function computeExpensiveValue(requestOptions) {
  // Imagine expensive computation, like fetching data or complex calculations
  console.log(`Fetching from ${requestOptions.url}`);
  return new Response("Fake response");
}

// A higher-order function that adds caching to any function
function withCache(fn) {
  const cache = new WeakMap();
  return (param) => cache.getOrInsertComputed(param, fn);
}

const computeWithCache = withCache(computeExpensiveValue);
const options = { url: "https://example.com/a", method: "GET" };
const value1 = computeWithCache(options); // Logs "Fetching from https://example.com/a"
const value2 = computeWithCache(options); // No log
```

## See also

- Polyfill of `WeakMap.prototype.getOrInsertComputed` in `core-js`
- es-shims polyfill of `WeakMap.prototype.getOrInsertComputed`
- `WeakMap`
- `WeakMap.prototype.get()`
- `WeakMap.prototype.set()`
- `WeakMap.prototype.has()`
- `WeakMap.prototype.getOrInsert()`
