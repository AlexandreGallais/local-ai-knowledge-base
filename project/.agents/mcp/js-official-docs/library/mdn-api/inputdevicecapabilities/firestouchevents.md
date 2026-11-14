---
title: "InputDeviceCapabilities: firesTouchEvents property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/inputdevicecapabilities/firestouchevents/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# InputDeviceCapabilities: firesTouchEvents property

The **`firesTouchEvents`** read-only property of the `InputDeviceCapabilities` interface returns a boolean value that indicates whether the device dispatches touch events.

You can use this property to detect mouse events that represent an action that may
already have been handled by touch event handlers. This doesn't necessarily mean the
device is a touch screen. For example, stylus and mouse devices typically generate
touch events on mobile browsers.

## Value

A `Boolean`

## Example

```js
myButton.addEventListener("mousedown", (e) => {
  if (!e.sourceCapabilities.firesTouchEvents) myButton.classList.add("pressed");
});
```
