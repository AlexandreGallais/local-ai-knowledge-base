---
title: "Document: timeline property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/document/timeline/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Document: timeline property

The `timeline` readonly property of the `Document` interface represents the default timeline of the current document. This timeline is a special instance of `DocumentTimeline`.

This timeline is unique to each `document` and persists for the lifetime of the `document` including calls to `Document.open()`.

This timeline expresses the time in milliseconds since `Performance.timeOrigin`.
Prior to the time origin, the timeline is inactive, and its `currentTime` is `null`.

> **Note:**
> A document timeline that is associated with a non-active document (a `Document` not associated with a `Window`, ``, or `<frame>`) is also considered to be inactive.

## Value

A `DocumentTimeline` object.

## See also

- Web Animations API
- `AnimationTimeline`
- `AnimationTimeline.currentTime`
- `DocumentTimeline`
