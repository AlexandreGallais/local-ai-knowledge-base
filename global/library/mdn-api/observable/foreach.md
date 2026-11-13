---
title: "Observable: forEach() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/observable/foreach/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Observable: forEach() method

The **`forEach()`** method of the `Observable` interface returns a promise that fulfills with `undefined` when the source observable completes, after executing a callback for each emitted value.

## Syntax

```js
forEach(callback)
forEach(callback, options)
```

### Parameters

- `callback`
    A function to execute for each value emitted by the source observable. Its return value is ignored. The function is called with the following arguments:
    - `value`
        The current value being processed.
    - `index`
        The index of the current value being processed, starting from `0`.
- `options` (optional)
    An options object containing the following properties:
    - `signal` (optional)
        An `AbortSignal` that can be used to cancel the operation. Aborting the signal unsubscribes from the source and rejects the promise with the signal's `reason`. If the signal is already aborted, the promise rejects without subscribing to the source.

### Return value

A `Promise` that fulfills with `undefined` when the source observable completes.

If the source errors or `callback` throws an exception, the promise rejects with that error. If the operation is aborted, the promise rejects with the abort reason.

## Description

Like other promise-returning operators, this method subscribes to the source immediately when called. It does not require a separate call to `subscribe()`.

`forEach()` calls `callback` once for each source value. If the source never completes, the promise remains pending unless the operation errors or is aborted.

The return value of `callback` is ignored. Returned promises are not awaited, and their rejections are not handled by `forEach()`. To wait for asynchronous work for each value, use `flatMap()` to return a promise from the mapper.

If `callback` throws an exception, the operation unsubscribes from the source.

## Examples

### Using forEach()

This example displays the coordinates of each of the first three button clicks, then adds a completion message. Click Restart after the stream ends to try again.

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
    .forEach((event, index) => {
      output.textContent = `Click ${index + 1}: ${event.clientX},${event.clientY}`;
    })
    .then(() => {
      restart.disabled = false;
      output.textContent += " — Count complete.";
    });
}

restart.when("click").subscribe(start);
start();
```

## See also

- `Observable.find()`
- `Observable.map()`
- `Observable.filter()`
- `Observable.every()`
- `Observable.some()`
- Using observables
- Observable explainer
