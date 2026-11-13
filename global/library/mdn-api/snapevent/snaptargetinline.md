---
title: "SnapEvent: snapTargetInline property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/snapevent/snaptargetinline/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# SnapEvent: snapTargetInline property

The **`snapTargetInline`** read-only property of the
`SnapEvent` interface returns a reference to the element snapped to in the inline direction when the event fired.

Specifically:

- In the case of the `scrollsnapchanging` event, this refers to a pending inline-direction snap target (i.e., it will be selected when the current scroll gesture ends).
- In the case of the `scrollsnapchange` event, this refers to a newly-selected inline-direction snap target.

The property values available on `SnapEvent` correspond directly to the value of the `scroll-snap-type` CSS property set on the scroll container. `snapTargetInline` only returns an element reference if the snap axis is specified as `inline` (or a physical axis value that equates to `inline` in the current writing mode) or `both`.

## Value

A `Node` representing the snapped element, or `null` if scroll snapping only occurs in the block direction so no element is snapped to in the inline direction.

If the snapped element was a pseudo-element, the returned `Node` will be the owning element of that pseudo-element.

## Examples

See the main `SnapEvent` page for brief examples, and our Using scroll snap events guide for full examples and explanation.

## See also

- `scrollsnapchanging` event
- `scrollsnapchange` event
- CSS scroll snap module
- Scroll Snap Events on developer.chrome.com (2024)
