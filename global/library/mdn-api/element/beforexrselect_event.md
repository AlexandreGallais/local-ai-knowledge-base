---
title: "Element: beforexrselect event"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/element/beforexrselect_event/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Element: beforexrselect event

The **`beforexrselect`** event is fired before WebXR select events (`select`, `selectstart`, `selectend`) are dispatched. It can be used to suppress XR world input events while the user is interacting with a DOM overlay UI.

This event bubbles, is cancelable and is composed.

## Syntax

Use the event name in `addEventListener()`:

```js
addEventListener("beforexrselect", (event) => { })
```

Alternatively, assign to the event handler property of the interface:

```js
onbeforexrselect = (event) => { }
```

## Event type

An `XRSessionEvent`. Inherits from `Event`.

## Event availability

The **`beforexrselect`** event is a global event and available to the following interfaces:

- `Window`
- `Document`
- `HTMLElement`
- `SVGElement`
- `MathMLElement`

## Examples

To suppress WebXR select events (`select`, `selectstart`, `selectend`), an application can listen for the `beforexrselect` event. The event bubbles, so a call to `preventDefault()` on the DOM overlay element will prevent any WebXR select events within this container allowing interaction with the DOM element and avoiding duplicate event input to the XR world.

```js
document
  .getElementById("xr-overlay")
  .addEventListener("beforexrselect", (ev) => ev.preventDefault());
```

## See also

- `select` event
- `selectstart` event
- `selectend` event
- `:xr-overlay` pseudo-class
