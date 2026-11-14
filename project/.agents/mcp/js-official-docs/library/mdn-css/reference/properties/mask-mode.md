---
title: "`mask-mode` CSS property"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/properties/mask-mode/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `mask-mode` CSS property

The **`mask-mode`** CSS property is set on the element being masked. It sets whether the mask reference defined by the `mask-image` is treated as a luminance or alpha mask.

## Syntax

```css
/* Keyword values */
mask-mode: alpha;
mask-mode: luminance;
mask-mode: match-source;

/* Multiple values */
mask-mode: alpha, match-source;

/* Global values */
mask-mode: inherit;
mask-mode: initial;
mask-mode: revert;
mask-mode: revert-layer;
mask-mode: unset;
```

### Values

The `mask-mode` property can take multiple comma-separated `<masking-mode>` keyword values, including:

- `alpha`
    Indicates that the alpha (transparency) values of the mask image should be used.

- `luminance`
    Indicates that the luminance (brightness) values of the mask image should be used.

- `match-source`
    Indicates that the type of mask is determined by the source. This is the default property value.
    - If the `mask-image` references an SVG `<mask>`, its `mask-type` property value is used, or its `mask-type` attribute, if present. If neither is explicitly set, this value defaults to `luminance`.
    - If the mask image source is an `image` or a `gradient`, the `alpha` values of the mask image are used.

## Description

A mask transfers its transparency, and depending on the mask type, its luminance, to the element it is masking.
If the mask is of type `image`, by default the alpha values of the mask image determine the visibility of each part of the masked element: where the mask is opaque, the corresponding part of the masked element is visible; where the mask is translucent, the element is as well, with those areas of the element being hidden. This is the default behavior for `<image>` masks when the `mask-mode` property is set to or defaults to `match-source`, and it is always the case when the `mask-mode` is explicitly set to `alpha`.

### Understanding luminance

In the case of `luminance` masks, the visibility of the masked element depends on both the opacity of the mask and the lightness of the color of the opaque areas. White (100% luminance) opaque areas (alpha = 1) will be masked and visible, and black areas (0% luminance) transparent (alpha = 0) will be clipped. Areas with colors in between white and black and with partial opacity will be partially masked, reflecting the luminance and alpha transparency of each color making up the mask.

The opacity of a `luminance` mask is determined by the `R`, `G`, `B`, and `A` values of an `rgb()` color using the formula:

`((0.2125 * R) + (0.7154 * G) + (0.0721 * B)) * A`

For example, the color `green` is `#008000` or `rgb(0% 50% 0% / 1)`. In a `luminance` mask, any area masked by a solid `green` mask will be `35.77%` opaque. If the `mask-mode` for this mask is set to `alpha`, since `green` is a fully opaque color, the masked area will be `100%` opaque.

### Multiple values

Each `mask-mode` value is a comma-separated list of values. When multiple values are present, each value corresponds to a mask layer in the same position in the `mask-image` property. The values define whether the associated mask images are treated as a `luminance` or an `alpha` mask.

### Understanding `match-source`

In the case of `match-source`, whether `luminance` or `alpha` is used depends on the mask mode of the mask source. If the `mask-image` property values is a reference to an SVG `<mask>` element, the `<mask>` element's `mask-type` property value is used. If there is no CSS `mask-type` property set on the `<mask>` element, the value of the `<mask>` element's `mask-type` attribute is used, if present and supported. If neither is explicitly set, this value defaults to `luminance`; but only in the case of the `<mask>` element as the mask source. Otherwise, as noted before, if the mask image source is an `image`, rather than an SVG `<mask>`, the `alpha` values of the mask layer image is used.

## Examples

### Usage and values

This example demonstrates the basic usage and different values of the `mask-mode` property.

#### HTML

We include three `` elements, so we can demonstrate the three enumerated `mask-mode` keyword values.

```html
<div class="alpha">ALPHA</div>
<div class="luminance">LUMINANCE</div>
<div class="matchSource">MATCH-SOURCE</div>
```

#### CSS

Each `` is provided with the same background and masking image. The only difference between each `` is the value of the `mask-mode` property:

```css
div {
  background: blue linear-gradient(red, blue);
  mask-image: url("https://mdn.github.io/shared-assets/images/examples/mdn.svg");
}

.alpha {
  mask-mode: alpha;
}

.luminance {
  mask-mode: luminance;
}

.matchSource {
  mask-mode: match-source;
}
```

```css
div {
  width: 227px;
  height: 200px;
  float: left;
  text-align: center;
  line-height: 65px;
  color: white;
  text-shadow: 1px 1px 2px black;
  font-family: sans-serif;
}
```

#### Results

Because the mask source is an `<image>` and not an SVG `<mask>`, the `match-source` value resolves to `alpha`.

## See also

- `mask-type`
- `mask-image`
- `mask` shorthand
- Introduction to CSS masking
- CSS `mask` properties
- Declaring multiple masks
- CSS masking module
