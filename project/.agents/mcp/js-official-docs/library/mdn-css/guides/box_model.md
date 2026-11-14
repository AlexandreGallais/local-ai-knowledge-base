---
title: "CSS box model"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/guides/box_model/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# CSS box model

The **CSS box model** module defines the `margin` and `padding` properties, which along with the height, width and border properties, make up the CSS box model.

Every visible element on a webpage is a box laid out according to the visual formatting model. CSS properties define their size, position, and stacking level, with the box model properties (and others) defining the extrinsic size of each box, and the space around them.

Each box has a rectangular content area, inside which any text, images, and other content is displayed. The content may be surrounded by padding, a border, and a margin, on one or more sides. The padding is around the content, the border is around the padding, and the margin sits outside the border. The box model describes how these features — the content, padding, border, and margin — work together to create a box as displayed by CSS.

The CSS box model module defines physical (or "page relative") properties such as `margin-top` and `padding-top`. Flow-relative properties such as `margin-block-start` and `margin-inline-start` (which relate to text direction) are defined in Logical Properties and Values. The box model module is extended by the CSS box sizing module, which introduces the intrinsic size value and enables defining aspect ratio for elements that are auto-sized in at least one dimension.

## Reference

### Properties

- `margin` shorthand
- `margin-bottom`
- `margin-left`
- `margin-right`
- `margin-top`
- `margin-trim`
- `padding` shorthand
- `padding-bottom`
- `padding-left`
- `padding-right`
- `padding-top`

### Data types

- `box-edge`
  - `<visual-box>`
  - `<layout-box>`
  - `<paint-box>`
  - `<coord-box>`
  - `<geometry-box>`

## Guides

- Introduction to the CSS box model
    Explains one of the fundamental concepts of CSS: the box model. This model defines how CSS lays out elements, including their content, padding, border, and margin areas.

- Mastering margin collapsing
    Sometimes, two adjacent margins are collapsed into one. This article describes the rules that govern when and why this happens, and how to control it.

- Visual formatting model
    Explains the visual formatting model.

## Related concepts

- CSS backgrounds and borders module
  - `border-width` shorthand
  - `border-bottom-width`
  - `border-left-width`
  - `border-right-width`
  - `border-top-width`
- CSS logical properties module
  - `block-size`
  - `inline-size`
  - `max-block-size`
  - `max-inline-size`
  - `min-block-size`
  - `min-inline-size`
  - `margin-block`
  - `margin-block-end`
  - `margin-block-start`
  - `margin-inline`
  - `margin-inline-end`
  - `margin-inline-start`
  - `padding-block`
  - `padding-block-end`
  - `padding-block-start`
  - `padding-inline`
  - `padding-inline-end`
  - `padding-inline-start`
  - `border-block`
  - `border-block-end`
  - `border-block-end-width`
  - `border-block-start`
  - `border-block-start-width`
  - `border-block-style`
  - `border-block-width`
  - `border-inline`
  - `border-inline-end`
  - `border-inline-end-width`
  - `border-inline-start`
  - `border-inline-start-width`
  - `border-inline-width`
- CSS box sizing module
  - `aspect-ratio`
  - `box-sizing`
  - `contain-intrinsic-block-size`
  - `contain-intrinsic-height`
  - `contain-intrinsic-inline-size`
  - `contain-intrinsic-size`
  - `contain-intrinsic-width`
  - `height`
  - `max-height`
  - `max-width`
  - `min-height`
  - `min-width`
  - `width`
- CSS overflow module
  - `overflow` shorthand
  - `overflow-block`
  - `overflow-clip-margin`
  - `overflow-inline`
  - `overflow-x`
  - `overflow-y`
  - `text-overflow`

## See also

- CSS display module
- CSS flex layout module
- CSS grid layout module
- CSS table module
- CSS positioned layout module
- CSS fragmentation module
- Understanding aspect ratios
