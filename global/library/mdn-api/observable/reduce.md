---
title: "Observable: reduce() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/observable/reduce/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Observable: reduce() method

The **`reduce()`** method of the `Observable` interface returns a promise that fulfills with a single value obtained by combining the source observable's values using a reducer function.

## Syntax

```js
reduce(reducer)
reduce(reducer, initialValue)
reduce(reducer, initialValue, options)
```

### Parameters

- `reducer`
    A function that combines source values into an accumulator. Its return value becomes the `accumulator` argument on the next call. The function is called with the following arguments:
    - `accumulator`
        The value returned by the previous call to `reducer`. On the first call, it is `initialValue` if supplied, or the first source value otherwise.
    - `value`
        The current value being processed. On the first call, it is the first source value if `initialValue` is supplied, or the second source value otherwise.
    - `index`
        The index of the current value being processed. On the first call, it is `0` if `initialValue` is supplied, or `1` otherwise.
- `initialValue` (optional)
    The initial value of the accumulator. If omitted, the first source value is used, and the reducer starts with the second source value. Supplying `undefined` explicitly counts as providing an initial value.
- `options` (optional)
    An options object containing the following properties:
    - `signal` (optional)
        An `AbortSignal` that can be used to cancel the operation. Aborting the signal unsubscribes from the source and rejects the promise with the signal's `reason`. If the signal is already aborted, the promise rejects without subscribing to the source.

### Return value

A `Promise` that resolves to the final accumulator when the source completes. If the source completes without emitting any values, the promise resolves to `initialValue` if supplied, or rejects with a `TypeError` otherwise.

If the source errors or `reducer` throws an exception, the promise rejects with that error. If the operation is aborted, the promise rejects with the abort reason.

## Description

Like other promise-returning operators, this method subscribes to the source immediately when called. It does not require a separate call to `subscribe()`.

If `initialValue` is supplied, `reducer` is called for each source value, starting at index `0`. Otherwise, the first source value initializes the accumulator, and `reducer` starts with the second value at index `1`. If the source emits only one value and no initial value is supplied, the promise resolves to that value without calling `reducer`.

The return value of `reducer` is passed to the next call as-is, without awaiting it. If the final accumulator is a promise, the returned promise adopts its eventual state. If the source never completes, the promise remains pending unless the operation errors or is aborted.

If `reducer` throws an exception, the operation unsubscribes from the source.

## Examples

### Using reduce()

This example counts the first five button clicks with an accumulator, then displays the total when the stream completes. Click Restart after the stream ends to try again.

```html
<button>Click me</button>
<p>Waiting for clicks</p>
<button id="restart" disabled>Restart</button>
```

```js
const btn = document.querySelector("button");
const output = document.querySelector("p");

const restart = document.querySelector("#restart");

function start() {
  restart.disabled = true;
  output.textContent = "Waiting for clicks";
  btn
    .when("click")
    .take(5)
    .reduce((count) => count + 1, 0)
    .then((result) => {
      restart.disabled = false;
      output.textContent = `Total clicks: ${result}`;
    });
}

restart.when("click").subscribe(start);
start();
```

## See also

- `Observable.map()`
- `Observable.flatMap()`
- Using observables
- Observable explainer
