---
title: "XRLayerEvent: XRLayerEvent() constructor"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/xrlayerevent/xrlayerevent/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# XRLayerEvent: XRLayerEvent() constructor

The **`XRLayerEvent`** constructor creates and returns a new `XRLayerEvent` object. These events relate to a change of state of an `XRLayer` object.

## Syntax

```js
new XRLayerEvent(type, options)
```

### Parameters

- `type`
    A string with the name of the event.
    It is case-sensitive and browsers always set it to `redraw`.
- `options`
    An object that, _in addition of the properties defined in `Event()`_, can have the following properties:
    - `layer`
        The `XRLayer` to which the event is to be delivered.

### Return value

A new `XRLayer` object representing an object of the
specified type and configured as described by the `eventInitDict` parameter.

## Examples

### Creating a new `XRLayerEvent`

In this example, a new `redraw` event is created for an `XRQuadLayer`.

```js
const redrawEvent = new XRLayerEvent("redraw", {
  layer: quadLayer,
});

quadLayer.dispatchEvent();
```

## See also

- `XRLayer`
- `EventTarget.dispatchEvent()`
