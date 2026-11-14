---
title: "CSS box sizing"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/guides/box_sizing/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# CSS box sizing

The **CSS box sizing** module enables you to specify how elements fit their content or fit into a particular layout context. It defines sizing, minimum sizing, and maximum sizing properties, and also extends the CSS sizing properties with keywords that represent content-based intrinsic size and context-based extrinsic size.

Elements can either be extrinsically or intrinsically sized. The CSS box model defines page-relative properties to explicitly, or "extrinsically" set an element's size, including `width`, `height`, `padding`, and `margin` properties (along with `border` properties defined in the CSS backgrounds and borders module). This CSS box sizing module extends the CSS box model module to enable an element to be sized intrinsically — setting element size based on the size of its content.

The sizing values introduced in this module allow elements with size containment to take explicit intrinsic sizes, as if their in-flow content's width and height match the specified explicit intrinsic size, rather than being sized as if they were empty.

This module also introduced the ability to define an aspect ratio for an element's box, meaning the browser can automatically adjust an element's dimensions to maintain a specified aspect ratio as long as one of the dimensions is automatically sized.

The logical properties and values module expanded the properties available in the box model and box sizing modules to include writing-mode-relative equivalents of the corresponding physical box model and intrinsic box sizing properties.

## Reference

### Properties

- `aspect-ratio`
- `box-sizing`
- `contain-intrinsic-block-size`
- `contain-intrinsic-height`
- `contain-intrinsic-inline-size`
- `contain-intrinsic-size`
- `contain-intrinsic-width`
- `frame-sizing`
- `height`
- `max-height`
- `max-width`
- `min-height`
- `min-width`
- `width`

The CSS box sizing module also introduces the `min-intrinsic-sizing` property. Currently, no browsers support this feature.

### Data types and values

- `ratio` data type
- `min-content` value
- `max-content` value
- `fit-content` value

### Functions

- `fit-content()`

### Glossary terms

- Intrinsic size
- Extrinsic size

## Guides

- Understanding aspect ratios
    Learn about the `aspect-ratio` property, discuss aspect ratios for replaced and non-replaced elements, and examine some common aspect ratio use cases.

- Introduction to the CSS box model
    Explains one of the fundamental concepts of CSS: the box model. This model defines how CSS lays out elements, including their content, padding, border, and margin areas.

- Mastering margin collapsing
    Sometimes, two adjacent margins are collapsed into one. This article describes the rules that govern when and why this happens, and how to control it.

- Visual formatting model
    Explains the visual formatting model.

- Controlling ratios of flex items along the main axis
    Explains intrinsic sizing as a precursor to understanding how to control the size and flexibility of flex items along the main axis using `flex-grow`, `flex-shrink`, and `flex-basis`.

## Related concepts

- CSS logical properties module
  - `min-inline-size`
  - `block-size`
  - `inline-size`
  - `max-block-size`
  - `max-inline-size`
  - `min-block-size`
  - `min-inline-size`
  - `margin-block`
  - `margin-inline`
  - `padding-block`
  - `padding-inline`
  - `border-block`
  - `border-inline`
  - `contain-intrinsic-block-size`
  - `contain-intrinsic-inline-size`
  - `overflow-block`
  - `overflow-inline`
  - `overscroll-behavior-block`
  - `overscroll-behavior-inline`
- CSS box model module
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
- CSS backgrounds and borders module
  - `border` shorthand
  - `border-width` shorthand
  - `border-bottom-width`
  - `border-left-width`
  - `border-right-width`
  - `border-top-width`
- CSS overflow module
  - `overflow` shorthand
  - `overflow-block`
  - `overflow-clip-margin`
  - `overflow-inline`
  - `overflow-x`
  - `overflow-y`
  - `text-overflow`
- CSS grid layout module
  - `grid`
  - `grid-auto-columns`
  - `grid-auto-rows`
  - `grid-template-columns`
  - `grid-template-rows`
  - `repeat`
  - `minmax` function
- CSS flexible box layout module
  - `flex-basis`
  - `flex`

## See also

- CSS display module
- CSS flex layout module
- CSS grid layout module
- CSS positioned layout module
- CSS fragmentation module
