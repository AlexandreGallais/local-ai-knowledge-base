---
title: "ScrollTimeline: ScrollTimeline() constructor"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/scrolltimeline/scrolltimeline/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# ScrollTimeline: ScrollTimeline() constructor

The **`ScrollTimeline()`** constructor creates a new `ScrollTimeline` object instance.

## Syntax

```js
new ScrollTimeline(options)
```

### Parameters

- `options`
    An object that can contain the following properties:
    - `source`
        A reference to an `Element` representing the scrollable element (_scroller_) whose scroll position will drive the progress of the timeline.
    - `axis` (optional)
        An enumerated value representing the scroll axis that will drive the progress of the timeline. Possible values are:
        - `"block"`: The scrollbar on the block axis of the scroll container, which is the axis in the direction perpendicular to the flow of text within a line. For horizontal writing modes, such as standard English, this is the same as `"y"`, while for vertical writing modes, it is the same as `"x"`.
        - `"inline"`: The scrollbar on the inline axis of the scroll container, which is the axis in the direction parallel to the flow of text in a line. For horizontal writing modes, this is the same as `"x"`, while for vertical writing modes, this is the same as `"y"`.
        - `"y"`: The scrollbar on the vertical axis of the scroll container.
        - `"x"`: The scrollbar on the horizontal axis of the scroll container.

        If omitted, `axis` defaults to `"block"`.

### Return value

A new `ScrollTimeline` object instance.

## Examples

See the main `ScrollTimeline` page for an example.

## See also

- Web Animations API
- CSS scroll-driven animations
- `ScrollTimeline`
- `AnimationTimeline`, `ViewTimeline`
