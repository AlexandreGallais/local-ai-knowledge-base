---
title: "Observable: toArray() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/observable/toarray/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Observable: toArray() method

The **`toArray()`** method of the `Observable` interface returns a promise that fulfills with a new array containing the source observable's values in the order they were emitted.

## Syntax

```js
toArray()
toArray(options)
```

### Parameters

- `options` (optional)
    An options object containing the following properties:
    - `signal` (optional)
        An `AbortSignal` that can be used to cancel the operation. Aborting the signal unsubscribes from the source and rejects the promise with the signal's `reason`. If the signal is already aborted, the promise rejects without subscribing to the source.

### Return value

A `Promise` that fulfills with a new `Array` containing all source values in emission order when the source completes. If the source completes without emitting any values, the promise fulfills with an empty array.

If the source errors, the promise rejects with that error. If the operation is aborted, the promise rejects with the abort reason.

## Description

Like other promise-returning operators, this method subscribes to the source immediately when called. It does not require a separate call to `subscribe()`.

`toArray()` stores each source value until the source completes. If the source never completes, the promise remains pending unless the operation errors or is aborted, and the array continues to grow as values arrive. Use `take()` or `takeUntil()` to limit the stream when necessary.

Source values are stored as-is. If a value is a promise, the array contains that promise object rather than its fulfillment value.

## Examples

### Using toArray()

This example collects the coordinates of the first three button clicks and displays them as an array in click order. Click Restart after the stream ends to try again.

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
    .take(3)
    .map((event) => ({ x: event.clientX, y: event.clientY }))
    .toArray()
    .then((result) => {
      restart.disabled = false;
      output.textContent = JSON.stringify(result);
    });
}

restart.when("click").subscribe(start);
start();
```

## See also

- Using observables
- Observable explainer
