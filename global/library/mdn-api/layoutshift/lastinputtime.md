---
title: "LayoutShift: lastInputTime property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/layoutshift/lastinputtime/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# LayoutShift: lastInputTime property

The **`lastInputTime`** read-only property of the `LayoutShift` interface returns the time of the most recent excluding input or `0` if no excluding input has occurred.

Layout shifts are only bad if the user wasn't expecting them. Layout shift metrics like CLS exclude shifts that occurred soon after certain user interactions. These interactions are called _excluding inputs_. Excluding inputs are:

- Any events which signal a user's active interaction with the document: (`mousedown`, `keydown`, and `pointerdown`)
- Any events which directly changes the size of the viewport.
- `change` events.

The `mousemove` and `pointermove` events are **not** excluding inputs.

## Value

A `DOMHighResTimeStamp` indicating the most recent excluding input time or `0` if no excluding input has occurred.

## Examples

### Logging last input times

Log excluding input times if excluding input has occurred.

```js
const observer = new PerformanceObserver((list) => {
  list.getEntries().forEach((entry) => {
    if (entry.lastInputTime) {
      console.log(entry.lastInputTime);
    }
  });
});

observer.observe({ type: "layout-shift", buffered: true });
```

## See also

- `LayoutShift.hadRecentInput`
