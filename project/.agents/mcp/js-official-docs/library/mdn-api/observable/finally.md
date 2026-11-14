---
title: "Observable: finally() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/observable/finally/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Observable: finally() method

The **`finally()`** method of the `Observable` interface returns a new observable that mirrors the source observable and calls a callback when its subscription ends.

## Syntax

```js
finally(callback)
```

### Parameters

- `callback`
    A function to execute when the subscription ends through completion, an error, or all observers unsubscribing. The function is called without arguments. Its return value is ignored.

### Return value

A new `Observable`. When subscribed to, it emits the source observable's values and forwards its completion or error, running `callback` when the subscription ends.

## Description

Like other observable-returning operators, this method is lazy: calling it creates a new observable without subscribing to the source. Processing starts when the returned observable is subscribed to.

The callback is registered as a teardown on the returned observable's `Subscriber`. It runs synchronously before the observers' completion or error callbacks, and also runs if all observers unsubscribe. For details on teardown behavior, see `Subscriber.addTeardown()`.

> **Note:**
> This shared-subscription behavior may change. A proposal to give each observer its own `Subscriber` would make each subscription start a separate execution instead of reusing an active subscription.

If `callback` throws an exception, it is reported to the global object without changing the stream's completion or error. A returned promise is not awaited, and its rejection is not handled by `finally()`.

## Examples

### Using finally()

This example displays mouse coordinates until the Stop button is clicked. The `finally()` callback adds a message when coordinate reporting ends. Click Restart after the stream ends to try again.

```html
<button>Stop</button>
<p>Move the mouse</p>
<button id="restart" disabled>Restart</button>
```

```css
html {
  height: 100%;
}

body {
  box-sizing: border-box;
  min-height: 100%;
  margin: 0;
  padding: 8px;
}
```

```js
const btn = document.querySelector("button");
const output = document.querySelector("p");

const restart = document.querySelector("#restart");

function start() {
  restart.disabled = true;
  output.textContent = "Move the mouse";
  document.body
    .when("mousemove")
    .takeUntil(btn.when("click"))
    .finally(() => {
      restart.disabled = false;
      output.textContent += " — Reporting stopped.";
    })
    .subscribe((event) => {
      output.textContent = `${event.clientX},${event.clientY}`;
    });
}

restart.when("click").subscribe(start);
start();
```

## See also

- `Observable.catch()`
- `Subscriber.addTeardown()`
- Using observables
- Observable explainer
