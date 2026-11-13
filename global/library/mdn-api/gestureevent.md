---
title: "GestureEvent"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/gestureevent/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# GestureEvent

The **`GestureEvent`** is a proprietary interface specific to WebKit which gives information regarding multi-touch gestures. Events using this interface include `gesturestart`, `gesturechange`, and `gestureend`.

## Instance properties

_This interface also inherits properties of its parents, `UIEvent` and `Event`._

- `GestureEvent.rotation` (read-only) (non-standard)
    Change in rotation (in degrees) since the event's beginning. Positive values indicate clockwise rotation; negative values indicate counterclockwise rotation. Initial value: `0.0`.
- `GestureEvent.scale` (read-only) (non-standard)
    Distance between two digits since the event's beginning. Expressed as a floating-point multiple of the initial distance between the digits at the beginning of the gesture. Values below 1.0 indicate an inward pinch (zoom out). Values above 1.0 indicate an outward unpinch (zoom in). Initial value: `1.0`.

## Instance methods

_This interface also inherits methods of its parents, `UIEvent` and `Event`._

- `GestureEvent.initGestureEvent()` (non-standard)
    Initializes the value of a `GestureEvent`. If the event has already been dispatched, this method does nothing.

## Gesture event types

- `gesturestart`
- `gesturechange`
- `gestureend`

## Specifications

_Not part of any specification._ Apple has a description at the Safari Developer Library.
