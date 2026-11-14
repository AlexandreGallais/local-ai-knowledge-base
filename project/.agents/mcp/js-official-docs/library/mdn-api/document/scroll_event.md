---
title: "Document: scroll event"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/document/scroll_event/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Document: scroll event

The **`scroll`** event fires when the document view has been scrolled.
To detect when scrolling has completed, see the `scrollend` event of `Document`.
For element scrolling, see `scroll` event of `Element`.

## Syntax

Use the event name in `addEventListener()`:

```js
addEventListener("scroll", (event) => { })
```

Alternatively, assign to the event handler property of the interface:

```js
onscroll = (event) => { }
```

## Event type

A generic `Event`.

## Examples

### Scroll event throttling

Since `scroll` events can fire at a high rate, the event handler shouldn't execute computationally expensive operations such as DOM modifications. If you notice a jank while fast scrolling, you should consider throttling the event.

Note that you may see code that throttles the `scroll` event handler using `requestAnimationFrame()`. This is _useless_ because animation frame callbacks are fired at the same rate as `scroll` event handlers. Instead, you must measure the timeout yourself, such as by using `setTimeout()`.

```js
let lastKnownScrollPosition = 0;
let ticking = false;

function doSomething(scrollPos) {
  // Do something with the scroll position
}

document.addEventListener("scroll", (event) => {
  lastKnownScrollPosition = window.scrollY;

  if (!ticking) {
    // Throttle the event to "do something" every 20ms
    setTimeout(() => {
      doSomething(lastKnownScrollPosition);
      ticking = false;
    }, 20);

    ticking = true;
  }
});
```

Alternatively, consider using `IntersectionObserver` instead, which allows threshold-based listening.

## See also

- Document: `scrollend` event
- Element: `scroll` event
- Element: `scrollend` event
