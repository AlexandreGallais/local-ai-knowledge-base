---
title: "EventTarget: when() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/eventtarget/when/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# EventTarget: when() method

The **`when()`** method of the `EventTarget` interface returns an `Observable` object representing a stream of events fired on the event target it is called on.

You can call `subscribe()` on the resulting observable to subscribe to the event stream.

The returned observable uses an event listener in the background, the same as listeners created by `EventTarget.addEventListener()`. This listener's creation, sharing among observers, and removal follow the same lifecycle as the `Subscriber` object for a custom observable.

> **Note:**
> This shared-subscription behavior may change. A proposal to give each observer its own `Subscriber` would make each subscription start a separate execution instead of reusing an active subscription.

## Syntax

```js
when(type)
when(type, options)
```

### Parameters

- `type`
    A case-sensitive string representing the event type to listen for.
- `options` (optional)
    An object that specifies characteristics about the event listener. The available options are:
    - `capture` (optional)
        A boolean value indicating that events of the specified type will be dispatched to the listener registered in the background before being dispatched to any `EventTarget` beneath it in the DOM tree. If not specified, defaults to `false`.
    - `passive` (optional)
        A boolean value that, if `true`, indicates that callbacks processing the events will never call `preventDefault()`. If a passive listener calls `preventDefault()`, nothing will happen and a console warning may be generated.

        If this option is not specified, it defaults to the same value as for `addEventListener()`. See Using passive listeners to learn more.

### Return value

An `Observable`.

## Examples

### Using when()

This example is a simple click counter app.

#### HTML

The markup contains a `` element to click, and a `` element to display the number of clicks.

```html
<button>Click me</button>
<p>Click count: 0</p>
```

#### JavaScript

We call `when("click")` on the `btn`, which obtains an observable for the `click` event stream. We then chain a `subscribe()` call onto the observable to subscribe the `increment()` function to the observable, so it is called each time the button is clicked.

```js
const btn = document.querySelector("button");
const para = document.querySelector("p");

let countValue = 0;

function increment() {
  countValue++;
  para.textContent = `Click count: ${countValue}`;
}

btn.when("click").subscribe(increment);
```

> **Note:**
> For this particular example, `.when("click").subscribe(increment)` and `.addEventListener("click", increment)` are almost exactly equivalent. However, using `when()` allows you to compose event streams using observables. The Using observables guide has more examples.

#### Result

The rendered result is as follows:

Try clicking the button to see the click count increment.

## See also

- Using observables
- `EventTarget.addEventListener()`
- Observable explainer
