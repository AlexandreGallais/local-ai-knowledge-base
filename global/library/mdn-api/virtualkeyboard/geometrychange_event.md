---
title: "VirtualKeyboard: geometrychange event"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/virtualkeyboard/geometrychange_event/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# VirtualKeyboard: geometrychange event

The **`geometrychange`** event of the `VirtualKeyboard`
interface fires when the on-screen virtual keyboard is toggled between shown and hidden states.

The `geometrychange` event is useful to detect when the virtual keyboard appears and disappears, so you can adjust the layout as appropriate. This is necessary when using the `Virtual Keyboard API` to disable the browser's default automatic resizing of the viewport when the virtual keyboard is shown and hidden.

## Syntax

Use the event name in `addEventListener()`:

```js
addEventListener("geometrychange", (event) => { })
```

Alternatively, assign to the event handler property of the interface:

```js
ongeometrychange = (event) => { }
```

## Event type

A generic `Event`.

## Examples

The following code snippet uses the `geometrychange` event to detect when the virtual keyboard geometry changes, and then accesses the `boundingRect` property to query the size and position of the virtual keyboard:

```js
if ("virtualKeyboard" in navigator) {
  navigator.virtualKeyboard.overlaysContent = true;

  navigator.virtualKeyboard.addEventListener("geometrychange", (event) => {
    const { x, y, width, height } = event.target.boundingRect;
  });
}
```

## See also

- `The VirtualKeyboard API`
- Full control with the VirtualKeyboard API
