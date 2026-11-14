---
title: "WindowControlsOverlay: geometrychange event"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/windowcontrolsoverlay/geometrychange_event/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# WindowControlsOverlay: geometrychange event

The `geometrychange` event is fired when the position, size, or visibility of a Progressive Web App's title bar area changes.

This only applies to Progressive Web Apps installed on desktop operating systems and use the Window Controls Overlay API.

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

A `WindowControlsOverlayGeometryChangeEvent`. Inherits from `Event`.

## Examples

Using `addEventListener()`:

```js
navigator.windowControlsOverlay.addEventListener("geometrychange", (event) => {
  const { x, y, width, height } = event.titlebarAreaRect;
  console.log(
    `The titlebar area coordinates are x:${x}, y:${y}, width:${width}, height:${height}`,
  );
});
```

Using the `ongeometrychange` event handler property (but note that this replaces other event listeners added using `ongeometrychange`, if any):

```js
navigator.windowControlsOverlay.ongeometrychange = (event) => {
  const { x, y, width, height } = event.titlebarAreaRect;
  console.log(
    `The titlebar area coordinates are x:${x}, y:${y}, width:${width}, height:${height}`,
  );
};
```
