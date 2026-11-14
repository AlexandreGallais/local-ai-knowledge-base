---
title: "InteractionContentfulPaint: interactionId property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/interactioncontentfulpaint/interactionid/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# InteractionContentfulPaint: interactionId property

The **`interactionId`** read-only property of the `InteractionContentfulPaint` interface returns the `interactionId` of the `PerformanceEventTiming` entry representing the interaction that resulted in the paint.

## Value

An integer matching the `interactionId` of the interaction that resulted in the paint.

## Examples

### Logging the `interactionId` of `InteractionContentfulPaint`

This example uses a `PerformanceObserver` to log new `interaction-contentful-paint` performance entries as they are recorded in the browser's performance timeline. The `buffered` option is used to access entries from before the observer creation.

```js
const observer = new PerformanceObserver((list) => {
  for (const entry of list.getEntries()) {
    console.log(
      "Interaction Contentful Paint:",
      entry.startTime,
      entry.interactionId,
    );
  }
});
observer.observe({ type: "interaction-contentful-paint", buffered: true });
```
