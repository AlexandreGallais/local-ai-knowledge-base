---
title: "Promise.try()"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/promise/try/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Promise.try()

The **`Promise.try()`** static method takes a callback of any kind (returns or throws, synchronously or asynchronously) and resolves its result to a `Promise`.

## Syntax

```js
Promise.try(func)
Promise.try(func, arg1)
Promise.try(func, arg1, arg2)
Promise.try(func, arg1, arg2, /* …, */ argN)
```

### Parameters

- `func`
    A function that is called synchronously with the arguments provided (`arg1`, `arg2`, …, `argN`). It can do anything—either return a value, throw an error, or return a promise.
- `arg1`, `arg2`, …, `argN`
    Arguments to pass to `func`.

### Return value

A `Promise` that is:

- Already fulfilled, if `func` synchronously returns a value.
- Already rejected, if `func` synchronously throws an error.
- Asynchronously fulfilled or rejected, if `func` returns a promise. The returned value is resolved to a promise, which means built-in `Promise` objects are returned as-is.

## Description

You may have an API that takes a callback. The callback may be synchronous or asynchronous. You want to handle everything uniformly by wrapping the result in a promise. The most straightforward way might be `Promise.resolve(func())`. The problem is that if `func()` synchronously throws an error, this error would not be caught and turned into a rejected promise.

You can wrap this expression in `try...catch`:

```js
let result;
try {
  result = Promise.resolve(func());
} catch (error) {
  result = Promise.reject(error);
}
```

The problem is that `try...catch` is not an expression, so you can't directly use it in expression positions like passing it to other functions.

Therefore, when lifting a function call result into a promise, fulfilled or rejected, people more commonly do this:

```js
new Promise((resolve) => resolve(func()));
```

For the built-in `Promise()` constructor, errors thrown from the executor are automatically caught and turned into rejections, so this also prevents synchronous errors. The problem is that it unconditionally creates a new `Promise` object, which is unnecessary if `func()` already returns a `Promise`. `Promise.resolve()`, on the other hand, is smart enough to prevent that extra promise wrapping.

`Promise.try()` is almost exactly equivalent to the `try...catch` approach, except that it's shorter and can be used as an expression:

```js
Promise.try(func);
```

Note that `Promise.try()` is _not_ equivalent to this, despite being highly similar:

```js
Promise.resolve().then(func);
```

The difference is that the callback passed to `then()` is always called asynchronously, while the executor of the `Promise()` constructor is called synchronously. `Promise.try` also calls the function synchronously, and resolves the promise immediately if possible.

`Promise.try()`, combined with `catch()` and `finally()`, can be used to handle both synchronous and asynchronous errors in a single chain, and make promise error handling appear almost like synchronous error handling.

Like `setTimeout()`, `Promise.try()` accepts extra arguments that are passed to the callback. This means instead of doing this:

```js
Promise.try(() => func(arg1, arg2));
```

You can do this:

```js
Promise.try(func, arg1, arg2);
```

Which are equivalent, but the latter avoids creating an extra closure and is more efficient.

`Promise.try()` is generic and supports subclassing, which means it can be called on subclasses of `Promise`, and the result will contain a promise of the subclass type. To do so, the subclass's constructor must implement the same signature as the `Promise()` constructor — accepting a single `executor` function that can be called with the `resolve` and `reject` callbacks as parameters.

## Examples

### Using Promise.try()

The following example takes a callback, "lifts" it into a promise, handles the result, and does some error handling:

```js
function doSomething(action) {
  return Promise.try(action)
    .then((result) => console.log(result))
    .catch((error) => console.error(error))
    .finally(() => console.log("Done"));
}

doSomething(() => "Sync result");

doSomething(() => {
  throw new Error("Sync error");
});

doSomething(async () => "Async result");

doSomething(async () => {
  throw new Error("Async error");
});
```

In async/await, the same code would look like this:

```js
async function doSomething(action) {
  try {
    const result = await action();
    console.log(result);
  } catch (error) {
    console.error(error);
  } finally {
    console.log("Done");
  }
}
```

### Calling try() on a non-Promise constructor

`Promise.try()` is a generic method. It can be called on any constructor that implements the same signature as the `Promise()` constructor.

The following is a slightly more faithful approximation of the actual `Promise.try()` (although it should still not be used as a polyfill):

```js
Promise.try = function (func, ...args) {
  let result;
  try {
    result = func(...args);
  } catch (error) {
    return Promise.reject.call(this, error);
  }
  return Promise.resolve.call(this, result);
};
```

`Promise.try()` delegates to `Promise.resolve()` and `Promise.reject()` to create the return value, and both of these functions are generic.

For example, we can call it on a constructor that passes `console.log` as the `resolve` and `reject` functions to `executor`:

```js
class NotPromise {
  constructor(executor) {
    // The "resolve" and "reject" functions behave nothing like the native
    // promise's, but Promise.try() just calls resolve
    executor(
      (value) => console.log("Resolved", value),
      (reason) => console.log("Rejected", reason),
    );
  }

  static try = Promise.try;
}

const p = NotPromise.try(() => "hello");
// Logs: Resolved hello
// p is a NotPromise instance

const p2 = NotPromise.try(() => {
  throw new Error("oops");
});
// Logs: Rejected Error: oops
// p2 is a NotPromise instance
```

## See also

- Polyfill of `Promise.try` in `core-js`
- es-shims polyfill of `Promise.try`
- Using promises guide
- `Promise`
- `Promise()` constructor
