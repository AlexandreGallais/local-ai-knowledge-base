---
title: "`-webkit-mask-composite` CSS property"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/properties/-webkit-mask-composite/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `-webkit-mask-composite` CSS property

The **`-webkit-mask-composite`** property specifies the manner in which multiple mask images applied to the same element are composited with one another. Mask images are composited in the opposite order that they are declared with the `-webkit-mask-image` property.

> **Note:**
> There is a standardized `mask-composite` property covering parts of this non-standard property using different keywords.

## Syntax

```css
/* Keyword values */
-webkit-mask-composite: clear;
-webkit-mask-composite: copy;
-webkit-mask-composite: source-over;
-webkit-mask-composite: source-in;
-webkit-mask-composite: source-out;
-webkit-mask-composite: source-atop;
-webkit-mask-composite: destination-over;
-webkit-mask-composite: destination-in;
-webkit-mask-composite: destination-out;
-webkit-mask-composite: destination-atop;
-webkit-mask-composite: xor;

/* Global values */
-webkit-mask-composite: inherit;
-webkit-mask-composite: initial;
-webkit-mask-composite: revert;
-webkit-mask-composite: revert-layer;
-webkit-mask-composite: unset;
```

### Values

This property is specified as one of the following keyword values:

- `clear`
    Overlapping pixels in the source mask image and the destination mask image are cleared.
- `copy`
    The source mask image replaces the destination mask image.
- `source-over`
    The source mask image is rendered over the destination mask image.
- `source-in`
    Overlapping pixels in the source mask image and the destination mask image are replaced by the pixels of the source mask image; all other pixels are cleared.
- `source-out`
    Overlapping pixels in the source mask image and the destination mask image are cleared; all remaining pixels of the source mask image are rendered.
- `source-atop`
    The pixels of the destination mask image are rendered. The pixels of the source mask image are rendered only if they overlap a nontransparent portion of the destination mask image. This causes the source mask image to have no effect.
- `destination-over`
    The destination mask image is rendered over the source mask image.
- `destination-in`
    Overlapping pixels in the source mask image and the destination mask image remain the pixels of the destination mask image; all other pixels are cleared.
- `destination-out`
    Overlapping pixels in the source mask image and the destination mask image are cleared; all remaining pixels of the source mask image are rendered.
- `destination-atop`
    The pixels of the source mask image are rendered. The pixels of the destination mask image are rendered only if they overlap a nontransparent portion of the destination mask image. This causes the destination mask image to have no effect.
- `xor`
    Overlapping pixels in the source mask image and the destination mask image become fully transparent if they are both fully opaque.

## Examples

### Compositing with XOR

```css
.example {
  -webkit-mask-image: url("mask1.png"), url("mask2.png");
  -webkit-mask-composite: xor, source-over;
}
```

## Specifications

Not part of any standard. This property is specified as `mask-composite` using different values.

## See also

- `mask-composite`
