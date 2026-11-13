---
title: "InteractionContentfulPaint: presentationTime property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/interactioncontentfulpaint/presentationtime/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# InteractionContentfulPaint: presentationTime property

The **`presentationTime`** read-only property of the `InteractionContentfulPaint` interface returns the `timestamp` of when the painted pixels were actually drawn on the screen.

The `presentationTime` is optional — some browsers may always return `0` or not expose the value at all. The value is also implementation-dependent — it may differ across browsers that choose to expose it.

## Value

A `DOMHighResTimeStamp` or `null` if the value is not exposed.

## Examples

This example uses a `PerformanceObserver` to log new `interaction-contentful-paint` performance entries as they are recorded in the browser's performance timeline. The `buffered` option is used to access entries from before the observer creation.

```js
const observer = new PerformanceObserver((list) => {
  for (const entry of list.getEntries()) {
    console.log(
      "Interaction Contentful Paint:",
      entry.startTime,
      entry.paintTime,
    );
  }
});
observer.observe({ type: "interaction-contentful-paint", buffered: true });
```

## See also

- `LargestContentfulPaint.presentationTime`
