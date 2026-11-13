---
title: "InteractionContentfulPaint: paintTime property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/interactioncontentfulpaint/painttime/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# InteractionContentfulPaint: paintTime property

The **`paintTime`** read-only property of the `InteractionContentfulPaint` interface returns the `timestamp` of when the rendering phase ended and the paint phase started.

The `paintTime` is broadly interoperable: The value should be the same across different implementations.

## Value

A `DOMHighResTimeStamp`.

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
