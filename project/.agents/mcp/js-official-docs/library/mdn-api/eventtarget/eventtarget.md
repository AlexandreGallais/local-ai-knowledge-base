---
title: "EventTarget: EventTarget() constructor"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/eventtarget/eventtarget/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# EventTarget: EventTarget() constructor

The **`EventTarget()`** constructor creates a new `EventTarget` object instance.

> **Note:**
> It is fairly rare to explicitly call this constructor. Most of the time, this constructor is used inside the constructor of an object extending the `EventTarget` interface, using the `super` keyword.

## Syntax

```js
new EventTarget()
```

### Parameters

None.

### Return value

A new instance of the `EventTarget` object.

## Examples

### Implementing a counter

This example implements a `Counter` class, with `increment()` and `decrement()` methods. It fires a custom `"valuechange"` event when either of these methods is called.

#### HTML

```html
<button id="dec" aria-label="Decrement">-</button>
<span id="currentValue">0</span>
<button id="inc" aria-label="Increment">+</button>
```

#### JavaScript

```js
class Counter extends EventTarget {
  constructor(initialValue = 0) {
    super();
    this.value = initialValue;
  }

  #emitChangeEvent() {
    this.dispatchEvent(new CustomEvent("valuechange", { detail: this.value }));
  }

  increment() {
    this.value++;
    this.#emitChangeEvent();
  }

  decrement() {
    this.value--;
    this.#emitChangeEvent();
  }
}

const initialValue = 0;
const counter = new Counter(initialValue);
document.querySelector("#currentValue").innerText = initialValue;

counter.addEventListener("valuechange", (event) => {
  document.querySelector("#currentValue").innerText = event.detail;
});

document.querySelector("#inc").addEventListener("click", () => {
  counter.increment();
});

document.querySelector("#dec").addEventListener("click", () => {
  counter.decrement();
});
```

#### Result

## See also

- `EventTarget`
