---
title: "TouchEvent: touches property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/touchevent/touches/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# TouchEvent: touches property

**`touches`** is a read-only `TouchList` listing
all the `Touch` objects for touch points that are currently in contact
with the touch surface, regardless of whether or not they've changed or what their
target element was at `touchstart` time.

You can think of it as how many separate fingers are able to be identified as touching
the screen.

> **Note:**
> Touches inside the array are not necessarily ordered by order of occurrences (the
> i-th element in the array being the i-th touch that happened). You cannot assume a specific order. To determine the order of occurrences of the touches, use the `touch` object IDs.

## Value

A `TouchList` listing all the `Touch` objects for touch points that are still in contact with the touch surface, regardless of whether or not they've changed or what their target element was at `touchstart`
time.

## Examples

This example illustrates the `TouchEvent` object's
`TouchEvent.touches` property. The `TouchEvent.touches`
property is a `TouchList` object and containing a list of
`Touch` objects for every point of contact currently touching the surface.

In following code snippet, the `touchstart` event handler checks the length
of the `TouchEvent.touches` list to determine the number of touch points
that were activated and then invokes different handlers depending on the number of touch
points.

```js
someElement.addEventListener("touchstart", (e) => {
  // Invoke the appropriate handler depending on the
  // number of touch points.
  switch (e.touches.length) {
    case 1:
      handle_one_touch(e);
      break;
    case 2:
      handle_two_touches(e);
      break;
    case 3:
      handle_three_touches(e);
      break;
    default:
      console.log("Not supported");
      break;
  }
});
```
