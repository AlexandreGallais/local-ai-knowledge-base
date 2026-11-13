---
title: "`horizontal-viewport-segments` CSS media feature"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/at-rules/@media/horizontal-viewport-segments/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `horizontal-viewport-segments` CSS media feature

The **`horizontal-viewport-segments`** CSS media feature detects whether the device has a specified number of viewport segments laid out horizontally (side by side).

Related to the Viewport Segments API, the `vertical-viewport-segments` feature can be used to create responsive designs that work well on multi-viewport devices — devices with a display that is divided into logically separate viewport segments, such as foldable or hinged devices.

## Syntax

The `horizontal-viewport-segments` feature is specified as an `integer` value of `1` or greater, representing the number of horizontal viewport segments the device has.

- The value will be `1` for:
  - A non-foldable device (for example, a standard single-screen smartphone or tablet)
  - A foldable device that is either unfolded or closed (in the `continuous` device posture).
  - A two-screen hinged device or a foldable device that is currently folded and is oriented vertically so the segments are on top of each other.
- The value will be `2` for a two-screen hinged device or a foldable device that is currently folded (in the `folded` device posture) and is oriented horizontally so the segments are side by side.
- The value may be greater than `2` for foldable devices with more than one fold.

## Examples

### Basic `horizontal-viewport-segments` usage

In this snippet we use a `horizontal-viewport-segments` media query to handle the case of foldable devices where the segments are side-by-side.

We set the left container to have a width equal to the left segment width (`env(viewport-segment-width 0 0)`), and the right container to have a width equal to the right segment width (`env(viewport-segment-width 1 0)`).

To calculate how much width the fold takes up in between the two, we subtract the left edge offset of the right container from the right edge offset of the left container (`calc(env(viewport-segment-left 1 0) - env(viewport-segment-right 0 0));`).

```css
.wrapper {
  height: 100%;
  display: flex;
}

@media (horizontal-viewport-segments: 2) {
  .wrapper {
    flex-direction: row;
  }

  .list-view {
    width: env(viewport-segment-width 0 0);
  }

  .fold {
    width: calc(
      env(viewport-segment-left 1 0) - env(viewport-segment-right 0 0)
    );
    background-color: black;
    height: 100%;
  }

  .detail-view {
    width: env(viewport-segment-width 1 0);
  }
}
```

See our Viewport segment API demo for a full working demo (source code). Also check out Using the Viewport Segments API for a full demo explanation.

## See also

- `vertical-viewport-segments` `@media` feature
- Viewport Segments API
- Origin trial for Foldable APIs via developer.chrome.com (2024)
