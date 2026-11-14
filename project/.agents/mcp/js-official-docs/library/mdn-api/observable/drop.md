---
title: "Observable: drop() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/observable/drop/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Observable: drop() method

The **`drop()`** method of the `Observable` interface returns a new observable that skips the given number of values at the start of the source observable.

## Syntax

```js
drop(amount)
```

### Parameters

- `amount`
    The number of values to drop from the start of the source observable. It should be an unsigned integer.

### Return value

A new `Observable`. When subscribed to, it skips the first `amount` values emitted by the source observable, then emits the remaining values. If the source completes before emitting `amount` values, the returned observable completes without emitting any values.

## Description

Like other observable-returning operators, this method is lazy: calling it creates a new observable without subscribing to the source. Processing starts when the returned observable is subscribed to.

If `amount` is `0`, all source values are forwarded. Errors from the source are forwarded even while values are being skipped.

## Examples

### Using drop()

This example ignores the first three button clicks, then displays a count of subsequent clicks.

```html
<button>Click me</button>
<p>Click count: 0</p>
```

```js
const btn = document.querySelector("button");
const para = document.querySelector("p");

let countValue = 0;

function increment() {
  countValue++;
  para.textContent = `Click count: ${countValue}`;
}

btn.when("click").drop(3).subscribe(increment);
```

## See also

- `Observable.take()`
- Using observables
- Observable explainer
