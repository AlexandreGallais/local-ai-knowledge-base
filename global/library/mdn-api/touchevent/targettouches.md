---
title: "TouchEvent: targetTouches property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/touchevent/targettouches/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# TouchEvent: targetTouches property

The **`targetTouches`** read-only property is a `TouchList` listing all the `Touch` objects for touch points that are still in contact with the touch surface **and** whose `touchstart` event occurred inside the same target `element` as the current target element.

## Value

A `TouchList` listing all the `Touch` objects for touch points that are still in contact with the touch surface **and** whose `touchstart` event occurred inside the same target `element` as the current target element.

## Examples

This example illustrates the `TouchEvent` object's `TouchEvent.targetTouches` property. The `TouchEvent.targetTouches` property is a `TouchList` object that includes those TPs that are currently touching the surface _and_ started on the element that is the target of the current event. As such, the `targetTouches` list is a strict subset of the `touches` list.

In following code snippet, the function compares the length of the `touches` list to the length of the `targetTouches` list and returns `true` if the lengths are the same and returns `false` otherwise.

```js
function touchesInTarget(ev) {
  // Return true if all of the touches are within the target element;
  // otherwise return false.
  return ev.touches.length === ev.targetTouches.length;
}
```
