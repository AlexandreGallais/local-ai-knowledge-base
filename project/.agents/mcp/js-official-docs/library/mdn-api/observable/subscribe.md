---
title: "Observable: subscribe() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/observable/subscribe/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Observable: subscribe() method

The **`subscribe()`** method of the `Observable` interface subscribes to the observable, receiving its values, errors, and completion through observer callbacks.

## Syntax

```js
subscribe()
subscribe(observer)
subscribe(observer, options)
```

### Parameters

- `observer` (optional)
    An object containing any of the following callback functions:
    - `next` (optional)
        A function called with each value emitted by the observable.
    - `error` (optional)
        A function called with the error when the observable errors. If omitted, the error is reported to the global object.
    - `complete` (optional)
        A function called without arguments when the observable completes. Unsubscribing does not call this callback.

    Alternatively, `observer` can be a function, which is equivalent to passing an object with that function as its `next` callback. All callback return values are ignored.

- `options` (optional)
    An options object containing the following properties:
    - `signal` (optional)
        An `AbortSignal` that can be used to unsubscribe this observer. If the signal is already aborted, the observer receives no notifications. See Unsubscribing from an observable.

### Return value

None (`undefined`).

## Description

Calling `subscribe()` starts a subscription immediately. Values may be delivered synchronously, before `subscribe()` returns. Multiple observers share the observable's active `Subscriber`; unsubscribing one observer does not unsubscribe the others.

> **Note:**
> This shared-subscription behavior may change. A proposal to give each observer its own `Subscriber` would make each subscription start a separate execution instead of reusing an active subscription.

The observer's callbacks receive notifications from the producer. They do not define or replace the producer's `Subscriber` methods. An error or completion ends the subscription, so the observer receives no subsequent values.

If an observer callback throws an exception, it is reported to the global object without ending the subscription or calling the observer's `error` callback. Returned promises are not awaited, and their rejections are not handled by `subscribe()`.

## Examples

### Receiving values and completion

This example displays the coordinates of the first three button clicks, then a completion message. The observer's `next` callback handles each value, and its `complete` callback handles the end of the stream. Click Restart to try again after completion.

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
    .subscribe({
      next(event) {
        output.textContent = `${event.clientX},${event.clientY}`;
      },
      complete() {
        restart.disabled = false;
        output.textContent += " — Complete.";
      },
    });
}

restart.when("click").subscribe(start);
start();
```

### Unsubscribing

This example displays mouse coordinates until the Stop button is clicked. Aborting removes the observer without calling a completion callback. Click Restart to subscribe again.

```html
<button>Stop</button>
<p>Move the mouse</p>
<button id="restart" disabled>Restart</button>
```

```js
const btn = document.querySelector("button");
const output = document.querySelector("p");
const restart = document.querySelector("#restart");

function start() {
  restart.disabled = true;
  output.textContent = "Move the mouse";
  const controller = new AbortController();

  document.body.when("mousemove").subscribe(
    (event) => {
      output.textContent = `${event.clientX},${event.clientY}`;
    },
    { signal: controller.signal },
  );

  btn
    .when("click")
    .take(1)
    .subscribe(() => {
      controller.abort();
      output.textContent += " — Stopped";
      restart.disabled = false;
    });
}

restart.when("click").subscribe(start);
start();
```

## See also

- Using observables
- Observable explainer
