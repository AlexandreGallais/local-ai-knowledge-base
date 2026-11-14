---
title: "Observable: take() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/observable/take/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Observable: take() method

The **`take()`** method of the `Observable` interface returns a new observable that emits the given number of values from the start of the source observable and then completes.

## Syntax

```js
take(amount)
```

### Parameters

- `amount`
    The number of values to take from the start of the source observable. It should be an unsigned integer.

### Return value

A new `Observable`. When subscribed to, it emits values from the source observable until `amount` values have been emitted or the source completes, whichever comes first. Once the limit is reached, it completes and unsubscribes from the source.

## Description

Like other observable-returning operators, this method is lazy: calling it creates a new observable without subscribing to the source. Processing starts when the returned observable is subscribed to.

If `amount` is `0`, the returned observable completes immediately when subscribed to, without subscribing to the source. Errors from the source are forwarded until the returned observable completes.

## Examples

### Using take()

This example counts the first five button clicks. On the fifth click, the count is replaced by a completion message, and subsequent clicks are ignored. Click Restart after the stream ends to try again.

```html
<button>Click me</button>
<p>Click count: 0</p>
<button id="restart" disabled>Restart</button>
```

```js
const btn = document.querySelector("button");
const para = document.querySelector("p");

let countValue = 0;

function increment() {
  countValue++;
  para.textContent = `Click count: ${countValue}`;
}

const restart = document.querySelector("#restart");

function start() {
  restart.disabled = true;
  countValue = 0;
  para.textContent = "Click count: 0";
  btn
    .when("click")
    .take(5)
    .subscribe({
      next: increment,
      complete() {
        restart.disabled = false;
        para.textContent = `Count finished!`;
      },
    });
}

restart.when("click").subscribe(start);
start();
```

## See also

- `Observable.drop()`
- Using observables
- Observable explainer
