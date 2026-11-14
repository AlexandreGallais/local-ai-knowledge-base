---
title: "DocumentTimeline"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/documenttimeline/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# DocumentTimeline

The **`DocumentTimeline`** interface of the Web Animations API represents animation timelines, including the default document timeline (accessed via `Document.timeline`).

## Constructor

- `DocumentTimeline()`
    Creates a new `DocumentTimeline` object associated with the active document of the current browsing context.

## Instance properties

_This interface inherits its property from its parent, `AnimationTimeline`._

- `AnimationTimeline.currentTime` (read-only)
    Returns the time value in milliseconds for this timeline or `null` if it is inactive.

## See also

- Web Animations API
- `AnimationTimeline`
- `AnimationTimeline.currentTime`
- `Document.timeline`
- `DocumentTimeline()`
