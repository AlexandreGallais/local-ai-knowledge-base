---
title: "AnimationTimeline"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/animationtimeline/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# AnimationTimeline

The `AnimationTimeline` interface of the Web Animations API represents the timeline of an animation. This interface exists to define timeline features, inherited by other timeline types:

- `DocumentTimeline`
- `ScrollTimeline`
- `ViewTimeline`

## Instance properties

- `currentTime` (read-only)
    Returns the time value in milliseconds for this timeline or `null` if this timeline is inactive.
- `duration` (read-only)
    Returns the maximum value for this timeline or `null`.

## See also

- `DocumentTimeline`, `ScrollTimeline`, `ViewTimeline`
- `Document.timeline`
- Web Animations API
- CSS scroll-driven animations
