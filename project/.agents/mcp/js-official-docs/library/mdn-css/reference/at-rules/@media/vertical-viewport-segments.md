---
title: "`vertical-viewport-segments` CSS media feature"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/at-rules/@media/vertical-viewport-segments/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `vertical-viewport-segments` CSS media feature

The **`vertical-viewport-segments`** CSS media feature detects whether the device has a specified number of viewport segments laid out vertically (top to bottom).

Related to the Viewport Segments API, the `vertical-viewport-segments` feature can be used to create responsive designs that work well on multi-viewport devices — devices with a display that is divided into logically separate viewport segments, such as foldable or hinged devices.

## Syntax

The `vertical-viewport-segments` feature is specified as an `integer` value of `1` or greater, representing the number of vertical viewport segments the device has.

- The value will be `1` for:
  - A non-foldable device (for example, a standard single-screen smartphone or tablet).
  - A foldable device that is either unfolded or closed (in the `continuous` device posture).
  - A two-screen hinged device or a foldable device that is currently folded and is oriented horizontally so the segments are side by side.
- The value will be `2` for a two-screen hinged device or a foldable device that is currently folded (in the `folded` device posture) and is oriented vertically so the segments are on top of one another.
- The value may be greater than `2` for foldable devices with more than one fold.

## Examples

### Basic `vertical-viewport-segments` usage

In this snippet we use a `vertical-viewport-segments` media query to handle the case of foldable devices where the segments are top-to-bottom.

We set the top container to have a height equal to the top segment height (`env(viewport-segment-height 0 0)`), and the bottom container to have a height equal to the bottom segment height (`env(viewport-segment-height 0 1)`).

To calculate how much height the fold takes up in between the two, we subtract the bottom edge offset of the top container from the top edge offset of the bottom container (`calc(env(viewport-segment-top 0 1) - env(viewport-segment-bottom 0 0));`).

```css
.wrapper {
  height: 100%;
  display: flex;
}

@media (vertical-viewport-segments: 2) {
  .wrapper {
    flex-direction: column;
  }

  .list-view {
    height: env(viewport-segment-height 0 0);
  }

  .fold {
    width: 100%;
    height: calc(
      env(viewport-segment-top 0 1) - env(viewport-segment-bottom 0 0)
    );
    background-color: black;
  }

  .detail-view {
    height: env(viewport-segment-height 0 1);
  }
}
```

See our Viewport segment API demo for a full working demo (source code). Also check out Using the Viewport Segments API for a full demo explanation.

## See also

- `horizontal-viewport-segments` `@media` feature
- Viewport Segments API
- Origin trial for Foldable APIs via developer.chrome.com (2024)
