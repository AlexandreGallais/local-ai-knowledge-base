---
title: "TouchEvent: altKey property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/touchevent/altkey/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# TouchEvent: altKey property

The read-only **`altKey`** property of the `TouchEvent` interface returns a boolean value indicating whether or not the `alt` (Alternate) key is enabled when the touch event is created. If the `alt` key is enabled, the attribute's value is `true`. Otherwise, it is `false`.

This property is (read-only).

## Value

A boolean value that is `true` if the `alt` key is enabled for this event; and `false` if the `alt` is not enabled.

## Examples

This example illustrates how to access the `TouchEvent` key <example-value> properties: `TouchEvent.altKey`, `TouchEvent.ctrlKey`, `TouchEvent.metaKey` and `TouchEvent.shiftKey`.

In following code snippet, the `touchstart` event handler logs the state of the event's modifier keys.

```js
someElement.addEventListener("touchstart", (e) => {
  // Log the state of this event's modifier keys
  console.log(`altKey = ${e.altKey}`);
  console.log(`ctrlKey = ${e.ctrlKey}`);
  console.log(`metaKey = ${e.metaKey}`);
  console.log(`shiftKey = ${e.shiftKey}`);
});
```
