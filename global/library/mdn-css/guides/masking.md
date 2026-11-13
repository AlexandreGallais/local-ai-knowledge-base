---
title: "CSS masking"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/guides/masking/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# CSS masking

The **CSS masking** module defines masking and clipping, two different graphical operations that are used to partially or fully hide portions of visual elements.

**Clipping** involves defining a closed vector path, shape, or polygon as a **clipping path**. Everything inside the clipping path region remains visible while everything outside is hidden, or "clipped out". The `clip-path` property specifies a `basic-shape` or references an SVG `<clipPath>` element to be used as a clipping path.

CSS **masking** properties are used to apply a mask to an element or its border. A graphical object is then painted onto the background or border, completely or partially masking out parts of the element or its border, depending on the opacity or luminance of the mask.

The image used as the mask is specified by the `mask-image` or `mask-border-source` properties. The specified mask can be an `image`, a `gradient`, or an SVG `<mask>` element. The mask can be sized and positioned similarly to background and border images.

Clipping and masking in CSS behaves the same way as it does with SVG: First, the element is styled without filter effects, masking, clipping, and opacity. Then, any effects are applied to the element in the following order: filter effects, clipping, masking, and opacity.

While masking provides more control and options, clipping can perform better if a basic shape is all that's required — they are easier to interpolate.

## Reference

### Properties

- `clip` (deprecated)
- `clip-path`
- `clip-rule`
- `mask` shorthand
- `mask-clip`
- `mask-composite`
- `mask-image`
- `mask-mode`
- `mask-origin`
- `mask-position`
- `mask-repeat`
- `mask-size`
- `mask-type`
- `mask-border` shorthand
- `mask-border-outset`
- `mask-border-repeat`
- `mask-border-slice`
- `mask-border-source`
- `mask-border-width`
- `mask-border-mode`

### Data types

- `<geometry-box>`

### Functions

- `rect()` function

### Interfaces

- `SVGClipPathElement`
- `SVGMaskElement`
  - `SVGMaskElement.maskContentUnits`

## Guides

- Introduction to CSS clipping
    Introduction to clipping in CSS, including the `clip-path` property with examples.

- Introduction to CSS masking
    Introduction to masking in CSS, the various mask image types, and the effects of luminance and alpha-transparency in masking.

- Declaring multiple masks
    Introduction to mask layers and how to declare multiple mask images.

- CSS mask properties
    An exploration of CSS masking and the `mask` shorthand component properties, with explanations and examples.

## Related concepts

- `<coord-box>`
- `image`
- `<position>`
- `<url>`

- CSS backgrounds and borders module
  - `background` shorthand
  - `background-origin`
  - `background-position`
  - `background-repeat`
  - `background-size`
  - `border-image` shorthand
  - `border-image-repeat`
  - `border-image-slice`
  - `border-image-source`
  - `border-image-width`
  - `<repeat-style>` data type

- CSS shapes module
  - `basic-shape` data type
  - `polygon()` function
  - `<shape-box>` data type

## See also

- `background-clip`
- CSS filter effects module
- SVG tutorial: clipping and masking
- `CanvasRenderingContext2D.clip()`
- `WebGLRenderingContext.colorMask()`
- PWA icon masking
