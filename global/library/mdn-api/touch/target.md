---
title: "Touch: target property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/touch/target/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Touch: target property

The read-only **`target`** property of the `Touch` interface returns the (`EventTarget`) on which the touch contact started when it was first placed on the surface, even if the touch point has since moved outside the interactive area of that element or even been removed from the document. Note that if the target element is removed from the document, events will still be targeted at it, and hence won't necessarily bubble up to the window or document anymore. If there is any risk of an element being removed while it is being touched, the best practice is to attach the touch listeners directly to the target.

## Value

The `EventTarget` the `Touch` object applies to.

## Examples

This example illustrates how to access the `Touch` object's `Touch.target` property. The `Touch.target` property is an `Element` (`EventTarget`) on which a touch point is started when contact is first placed on the surface.

In following simple code snippet, we assume the user initiates one or more touch contacts on the `source` element. When the `touchstart` event handler for this element is invoked, each touch point's `Touch.target` property is accessed via the event's `TouchEvent.targetTouches` list.

```js
// Register a touchmove listener for the 'source' element
const src = document.getElementById("source");

src.addEventListener("touchstart", (e) => {
  // Iterate through the touch points that were activated
  // for this element.
  for (let i = 0; i < e.targetTouches.length; i++) {
    console.log(`touchpoint[${i}].target = ${e.targetTouches[i].target}`);
  }
});
```
