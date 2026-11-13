---
title: "PointerEvent: height property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/pointerevent/height/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# PointerEvent: height property

The **`height`** read-only property of the
`PointerEvent` interface represents the height of the pointer's contact
geometry, along the y-axis (in CSS pixels). Depending on the source of the pointer
device (for example a finger), for a given pointer, each event may produce a different
value.

If the input hardware cannot report the contact geometry to the browser, the height
defaults to `1`.

## Value

The height of the event's contact area (in CSS pixels).

## Examples

An example of this property is included in the PointerEvent.width example.
