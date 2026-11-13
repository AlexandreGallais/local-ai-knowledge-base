---
title: "`<axis>` CSS type"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/values/axis/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `<axis>` CSS type

The **`<axis>`** enumerated data type specifies the scrolling direction of the scroll container controlling a scroll timeline.

The `<axis>` keyword values are used in the following CSS functions and properties:

- `scroll-timeline-axis`
- `scroll-timeline` shorthand
- `scroll()`
- `view-timeline-axis`
- `view-timeline` shorthand
- `view()`

## Syntax

Valid `<axis>` values:

- `block`
    The block axis of the scroller element, which is the axis in the direction perpendicular to the flow of text within a line. For horizontal writing modes, such as standard English, this is the same as `y`, while for vertical writing modes, it is the same as `x`.
- `inline`
    The inline axis of the scroller element, which is the axis in the direction parallel to the flow of text in a line. For horizontal writing modes, this is the same as `x`, while for vertical writing modes, this is the same as `y`.
- `x`
    The horizontal axis of the scroller element.
- `y`
    The vertical axis of the scroller element.

## See also

- `animation-timeline`
- Scroll-driven animation timelines guide
- CSS scroll-driven animations module
