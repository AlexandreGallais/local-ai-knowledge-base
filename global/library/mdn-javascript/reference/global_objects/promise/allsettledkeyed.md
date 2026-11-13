---
title: "Promise.allSettledKeyed()"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/promise/allsettledkeyed/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Promise.allSettledKeyed()

The **`Promise.allSettledKeyed()`** static method is like `Promise.allSettled()`, except that instead of using arrays/iterables as input/output, it uses objects. It takes an object where each own key is associated with a promise, and returns a single `Promise`. This returned promise fulfills when all of the input's promises settle, with an object of the same keys mapped to objects that describe the outcome of the corresponding promise.

Compared to `Promise.allSettled()`, `Promise.allSettledKeyed()` allows you to associate results with semantically meaningful keys, instead of arbitrary array ordering which can be difficult to maintain.

## Syntax

```js
Promise.allSettledKeyed(object)
```

### Parameters

- `object`
    An object. All of its own enumerable properties, whether the key is a string or a symbol, should have `Promise` values. These values are awaited, so other thenables are also resolved, while non-thenables are returned as-is.

### Return value

A `Promise` that is:

- **Already fulfilled**, if the `object` passed has no own enumerable properties.
- **Asynchronously fulfilled**, when all promises in the given `object` have settled (either fulfilled or rejected). The fulfillment value is an object, with the same keys in the same order as the given `object`, and each property's value being an object describing the outcome of the corresponding promise in `object`, regardless of completion order. Each outcome object has the following properties:
  - `status`
      A string, either `"fulfilled"` or `"rejected"`, indicating the eventual state of the promise.
  - `value`
      Only present if `status` is `"fulfilled"`. The value that the promise was fulfilled with.
  - `reason`
      Only present if `status` is `"rejected"`. The reason that the promise was rejected with.

  If the `object` passed is non-empty but contains no pending promises, the returned promise is still asynchronously (instead of synchronously) fulfilled.

## Description

The `Promise.allSettledKeyed()` method is one of the promise concurrency methods. It performs the same kind of task as `Promise.allSettled()`. `Promise.allSettledKeyed()` is preferred when you don't already have an array of promises and/or you are immediately destructuring the results; see `Promise.allKeyed()` for more description.

## Examples

### Using Promise.allSettledKeyed()

The `Promise.allSettledKeyed()` method takes an object and processes all of its own enumerable properties.

```js
function delayed(value, timeout) {
  return new Promise((res) => setTimeout(() => res(value), timeout));
}

const sym = Symbol("example");

const promises = {
  a: delayed("a", 500),
  // Symbol properties are processed
  [sym]: delayed("symbol", 300),
  // Nested properties are not processed; this whole object is treated as
  // an already-resolved value and returned as-is
  nested: {
    b: delayed("b", 100),
  },
};

const result = await Promise.allSettledKeyed(promises);
console.log(result);
// {
//   a: { status: "fulfilled", value: "a" },
//   [sym]: { status: "fulfilled", value: "symbol" },
//   nested: { status: "fulfilled", value: { b: <Promise> } },
// }
```

For more examples related to concurrency behavior common to `Promise.allSettled()` and `Promise.allSettledKeyed()`, see `Promise.allSettled()`.

## See also

- Polyfill of `Promise.allSettledKeyed` in `core-js`
- es-shims polyfill of `Promise.allSettledKeyed`
- `Promise`
- `Promise.allKeyed()`
- `Promise.allSettled()`
