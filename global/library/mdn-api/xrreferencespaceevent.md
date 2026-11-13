---
title: "XRReferenceSpaceEvent"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/xrreferencespaceevent/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# XRReferenceSpaceEvent

The WebXR Device API interface **`XRReferenceSpaceEvent`** represents an event sent to an `XRReferenceSpace`. Currently, the only event that uses this type is the `reset` event.

## Constructor

- `XRReferenceSpaceEvent()`
    Returns a new `XRReferenceSpaceEvent` with the specified type and configuration.

## Instance properties

_In addition to inheriting the properties available on the parent interface, `Event`, `XRReferenceSpaceEvent` objects include the following properties:_

- `referenceSpace` (read-only)
    An `XRReferenceSpace` indicating the reference space that generated the event.
- `transform` (read-only)
    An `XRRigidTransform` object indicating the position and orientation of the specified `referenceSpace`'s native origin after the event, defined relative to the coordinate system before the event.

## Instance methods

_While `XRReferenceSpaceEvent` does not define any methods, it inherits the methods of its parent interface, `Event`._

## Event types

- `reset`
    The `reset` event is sent to a reference space when its native origin is changed due to a discontinuity, recalibration, or device reset. This is an opportunity for your app to update any stored transforms, position/orientation information, or the like—or to dump any cached values based on the reference's space's origin so you can recompute them as needed.
