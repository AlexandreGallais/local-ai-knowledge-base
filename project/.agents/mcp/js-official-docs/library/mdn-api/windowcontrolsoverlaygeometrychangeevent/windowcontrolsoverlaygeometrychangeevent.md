---
title: "WindowControlsOverlayGeometryChangeEvent: WindowControlsOverlayGeometryChangeEvent() constructor"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/windowcontrolsoverlaygeometrychangeevent/windowcontrolsoverlaygeometrychangeevent/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# WindowControlsOverlayGeometryChangeEvent: WindowControlsOverlayGeometryChangeEvent() constructor

The **`WindowControlsOverlayGeometryChangeEvent()`** constructor returns a new `WindowControlsOverlayGeometryChangeEvent` object, representing the current geometry of a desktop Progressive Web App's title bar area.

## Syntax

```js
new WindowControlsOverlayGeometryChangeEvent(type, options)
```

### Parameters

_The `WindowControlsOverlayGeometryChangeEvent()` constructor also inherits arguments from
`Event()`._

- `type`
    A string indicating the event type. It is case-sensitive and browsers set it to `geometrychange`.
- `options`
    An object with the following properties:
    - `visible` (optional)
        A boolean flag that's true when the `titlebarAreaRect` object's values are not 0. Its default value is `false`.
    - `titlebarAreaRect`
        A `DOMRect` representing the position and size of the title bar area.

## See also

- The `WindowControlsOverlayGeometryChangeEvent` interface it belongs to.
