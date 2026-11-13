---
title: "Observable: Observable() constructor"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/observable/observable/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Observable: Observable() constructor

The **`Observable()`** constructor creates a new `Observable` object whose values and lifecycle are controlled by a callback.

## Syntax

```js
new Observable(callback)
```

### Parameters

- `callback`
    A function that starts producing values when a subscription starts. Its return value is ignored. The function is called with the following argument:
    - `subscriber`
        A `Subscriber` used to send values with `next()`, signal completion or an error with `complete()` or `error()`, and register cleanup with `addTeardown()`.

### Return value

A new `Observable` object.

## Description

The constructor does not call `callback` immediately. It runs synchronously when the first observer subscribes. Additional observers share the same `Subscriber` until it becomes inactive. A later subscription starts the callback again with a new subscriber. See Creating an observable for the subscription lifecycle.

> **Note:**
> This shared-subscription behavior may change. A proposal to give each observer its own `Subscriber` would make each subscription start a separate execution instead of reusing an active subscription.

If `callback` throws an exception, it is passed to `subscriber.error()`. An async callback's returned promise is ignored, so its rejection is not handled automatically. Handle asynchronous errors explicitly and forward them with `subscriber.error()` while the subscriber is active.

## Examples

### Observing element size

This example reports a resizable panel's dimensions using a custom observable backed by `ResizeObserver`. Clicking Stop unsubscribes and disconnects the observer. Click Restart to observe the panel again. See Observing element size for a more detailed explanation.

```html
<div id="panel">Drag the corner to resize.</div>
<p></p>
<button>Stop</button>
<button id="restart" disabled>Restart</button>
```

```css
#panel {
  width: 200px;
  height: 100px;
  resize: both;
  overflow: auto;
  border: 1px solid;
}
```

```js
const panel = document.querySelector("#panel");
const output = document.querySelector("p");
const btn = document.querySelector("button");

const sizes = new Observable((subscriber) => {
  const observer = new ResizeObserver(([entry]) => {
    subscriber.next(entry.contentRect);
  });
  observer.observe(panel);
  subscriber.addTeardown(() => observer.disconnect());
});

const restart = document.querySelector("#restart");

function start() {
  restart.disabled = true;
  sizes.takeUntil(btn.when("click")).subscribe({
    next({ width, height }) {
      output.textContent = `${Math.round(width)} × ${Math.round(height)} pixels`;
    },
    complete() {
      restart.disabled = false;
    },
  });
}

restart.when("click").subscribe(start);
start();
```

## See also

- Creating custom observables
- Observable explainer
