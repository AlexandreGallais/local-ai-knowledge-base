---
title: "IntersectionObserverEntry: time property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/intersectionobserverentry/time/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# IntersectionObserverEntry: time property

The **`time`** read-only property of the `IntersectionObserverEntry` interface is a `DOMHighResTimeStamp` that indicates the time at which the intersection change occurred relative to the time at which the document was created.

## Value

A `DOMHighResTimeStamp` which indicates the time at which the `target` element experienced the
intersection change described by the `IntersectionObserverEntry`.
The time is specified in milliseconds since the creation of the containing document.

## Examples

See Timing element visibility with the Intersection Observer API for a complete example which uses the `time` property to track how long elements are visible to the user.
