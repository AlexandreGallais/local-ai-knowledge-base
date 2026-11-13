---
title: "ScrollTimeline: axis property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/scrolltimeline/axis/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# ScrollTimeline: axis property

The **`axis`** read-only property of the
`ScrollTimeline` interface returns an enumerated value representing the scroll axis that is driving the progress of the timeline.

## Value

An enumerated value. Possible values are:

- `"block"`
    The scrollbar on the block axis of the scroll container, which is the axis in the direction perpendicular to the flow of text within a line. For horizontal writing modes, such as standard English, this is the same as `"y"`, while for vertical writing modes, it is the same as `"x"`.
- `"inline"`
    The scrollbar on the inline axis of the scroll container, which is the axis in the direction parallel to the flow of text in a line. For horizontal writing modes, this is the same as `"x"`, while for vertical writing modes, this is the same as `"y"`.
- `"y"`
    The scrollbar on the vertical axis of the scroll container.
- `"x"`
    The scrollbar on the horizontal axis of the scroll container.

## Examples

See the main `ScrollTimeline` page for an example.

## See also

- `ScrollTimeline`
- `AnimationTimeline`, `ViewTimeline`
- Web Animations API
- CSS scroll-driven animations
