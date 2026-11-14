---
title: "IntersectionObserver: delay property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/intersectionobserver/delay/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# IntersectionObserver: delay property

The **`delay`** read-only property of the `IntersectionObserver` interface indicates the minimum delay between notifications from this observer.

The delay is used to limit the rate at which notifications should be provided when tracking visibility, as this is a computationally intensive operation.
The recommendation when tracking visibility is that you set the delay to the largest tolerable value.

## Value

A positive number in milliseconds.

The value is set using the `option.delay` argument to the `IntersectionObserver()` constructor.
The value is clamped to 100 or greater if `trackVisibility` is `true`, but otherwise defaults to 0.

## See also

- Timing element visibility with the Intersection Observer API
