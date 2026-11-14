---
title: "ViewTimeline: ViewTimeline() constructor"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/viewtimeline/viewtimeline/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# ViewTimeline: ViewTimeline() constructor

The **`ViewTimeline()`** constructor creates a new `ViewTimeline` object instance.

## Syntax

```js
new ViewTimeline(options)
```

### Parameters

- `options`
    An object that can contain the following properties:
    - `subject`
        A reference to an `Element` representing the subject element whose visibility within its nearest ancestor scrollable element (scroller) will drive the progress of the timeline.
    - `axis` (optional)
        An enumerated value representing the scroll axis that will drive the progress of the timeline. Possible values are:
        - `"block"`: The scrollbar on the block axis of the scroll container, which is the axis in the direction perpendicular to the flow of text within a line. For horizontal writing modes, such as standard English, this is the same as `"y"`, while for vertical writing modes, it is the same as `"x"`.
        - `"inline"`: The scrollbar on the inline axis of the scroll container, which is the axis in the direction parallel to the flow of text in a line. For horizontal writing modes, this is the same as `"x"`, while for vertical writing modes, this is the same as `"y"`.
        - `"y"`: The scrollbar on the vertical axis of the scroll container.
        - `"x"`: The scrollbar on the horizontal axis of the scroll container.

        If omitted, `axis` defaults to `"block"`.

    - `inset` (optional)
        A value or array of values representing an adjustment to the position of the scrollport (see Scroll container for more details) in which the subject is deemed to be visible. Possible values are:
        - `"auto"`: The default box position is used.
        - A string: If a string is specified, it can consist of one or two values equal to `auto` or a CSS `length-percentage` value. To put it another way, the string should be a valid `view-timeline-inset` value.
        - An array of one or two values, which can be `"auto"` or a suitable `CSSNumericValue` representing an absolute length or percentage offset.
          For example `CSS.px(20)` or `CSS.percent(10)` are allowed, but numeric values like `CSS.em(2)` that define relative units are not permitted.

          If an array is provided, the first value represents the start inset (which affects the `ViewTimeline.endOffset` value) and the second value represents the end inset (which affects the `ViewTimeline.startOffset` value).
          If the array has only one value, it is duplicated.

        The default value is `auto`.

### Return value

A new `ViewTimeline` object instance.

### Exceptions

- `TypeError`
    Thrown if `inset` is an array with zero or more than two values, if an array value is a keyword other than `"auto"`, or if a `CSSNumericValue` array value does not resolve to an absolute length or percentage, such as when a relative unit like `em` or `vh` is used.

## Examples

See the main `ViewTimeline` page for an example.

## See also

- Web Animations API
- CSS scroll-driven animations
- `ViewTimeline`
- `AnimationTimeline`, `ScrollTimeline`
