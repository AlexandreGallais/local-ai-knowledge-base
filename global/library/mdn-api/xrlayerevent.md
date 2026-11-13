---
title: "XRLayerEvent"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/xrlayerevent/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# XRLayerEvent

The **`XRLayerEvent`** interface of the WebXR Device API is the event type for events related to a change of state of an `XRLayer` object. These events occur, for example, when the layer needs to be redrawn.

## Constructor

- `XRLayerEvent()` (experimental)
    Creates and returns a new `XRLayerEvent` object.

## Instance properties

_In addition to properties inherited from its parent interface, `Event`, `XRLayerEvent` provides the following:_

- `layer` (read-only) (experimental)
    The `XRLayer` which generated the event.

## Instance methods

_While `XRSessionEvent` defines no methods, it inherits methods from its parent interface, `Event`._

## Event types

_The following events are represented using the `XRLayerEvent` interface, and are permitted values for its `type` parameter._

### `redraw` event

The `redraw` event is tent to the layer object when the underlying resources of the layer are lost or when the XR Compositor can no longer reproject the layer. If this event is sent, authors should redraw the content of the layer in the next XR animation frame. It is available on the following layer objects:

- `XRQuadLayer`: `redraw`
- `XRCylinderLayer`: `redraw`
- `XREquirectLayer`: `redraw`
- `XRCubeLayer`: `redraw`

## See also

- `XRCompositionLayer.needsRedraw`
