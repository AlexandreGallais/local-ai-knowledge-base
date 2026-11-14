---
title: "TouchEvent: changedTouches property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/touchevent/changedtouches/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# TouchEvent: changedTouches property

The **`changedTouches`** read-only property is a `TouchList` whose touch points (`Touch` objects) varies depending on the event type, as follows:

- For the `touchstart` event, it is a list of the touch points that became active with the current event.
- For the `touchmove` event, it is a list of the touch points that have changed since the last event.
- For the `touchend` and `touchcancel` events, it is a list of the touch points that have been removed from the surface (that is, the set of touch points corresponding to fingers no longer touching the surface).

## Value

A `TouchList` whose `Touch` objects include all the touch points that contributed to this touch event.

## Examples

This example illustrates the `TouchEvent` object's `TouchEvent.changedTouches` property. The `TouchEvent.changedTouches` property is a `TouchList` object that contains one `Touch` object for each touch point which contributed to the event.

In following code snippet, the `touchmove` event handler iterates through the `changedTouches` list and prints the identifier of each touch point that changed since the last event.

```js
someElement.addEventListener("touchmove", (e) => {
  // Iterate through the list of touch points that changed
  // since the last event and print each touch point's identifier.
  for (let i = 0; i < e.changedTouches.length; i++) {
    console.log(
      `changedTouches[${i}].identifier = ${e.changedTouches[i].identifier}`,
    );
  }
});
```
