---
title: "`mask-clip` CSS property"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/properties/mask-clip/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `mask-clip` CSS property

The **`mask-clip`** CSS property determines the area which is affected by a mask. The painted content of an element must be restricted to this area.

## Syntax

```css
/* <coord-box> values */
mask-clip: content-box;
mask-clip: padding-box;
mask-clip: border-box;
mask-clip: fill-box;
mask-clip: stroke-box;
mask-clip: view-box;

/* Keyword value */
mask-clip: no-clip;

/* Multiple values */
mask-clip: padding-box, no-clip;
mask-clip: view-box, fill-box, border-box;

/* Global values */
mask-clip: inherit;
mask-clip: initial;
mask-clip: revert;
mask-clip: revert-layer;
mask-clip: unset;
```

### Values

The property accepts a comma-separated list of keyword values. Each value is a `<coord-box>` or `no-clip`:

- `content-box`
    The painted content is clipped to the content box.
- `padding-box`
    The painted content is clipped to the padding box.
- `border-box`
    The painted content is clipped to the border box.
- `fill-box`
    The painted content is clipped to the object bounding box.
- `stroke-box`
    The painted content is clipped to the stroke bounding box.
- `view-box`
    Uses the nearest SVG viewport as reference box. If a `viewBox` attribute is specified for the element creating the SVG viewport, the reference box is positioned at the origin of the coordinate system established by the `viewBox` attribute and the dimension of the reference box is set to the width and height values of the `viewBox` attribute.
- `no-clip`
    The painted content is not clipped.
- `border`
    This keyword behaves the same as `border-box`.
- `padding`
    This keyword behaves the same as `padding-box`.
- `content`
    This keyword behaves the same as `content-box`.
- `text`
    This keyword clips the mask image to the text of the element.

## Description

The `mask-clip` property defines the area of the element that is affected by the applied mask.

For mask layer images that do not reference an SVG `<mask>` element, the `mask-clip` property defines the mask painting area, or the area affected by the mask. The painted content of the element will be restricted to this area.

The `mask-clip` property has no effect on a mask layer image that references a `<mask>` element. The `<mask>` element's `x`, `y`, `width`, `height`, and `maskUnits` attributes determine the mask painting area when the source of the `mask-image` is a `<mask>`.

An element can have multiple mask layers applied. The number of layers is determined by the number of comma-separated values in the `mask-image` property value (even if a value is `none`). Each `mask-clip` value in the comma-separated list of values is matched up with the `mask-image` values, in order. If the number of values in the two properties differs, any excess values of `mask-clip` are not used, or, if `mask-clip` has fewer values than `mask-image`, the `mask-clip` values are repeated.

## Examples

### Clipping a mask to the border box

This examples demonstrates three `mask-clip` values.

#### HTML

We include three elements, each with a different `<coord-box>` value as a class name.

```html
<div class="border-box"></div>
<div class="padding-box"></div>
<div class="content-box"></div>
```

#### CSS

The CSS defines the element to have a background, border, padding, and margin, along with a mask image, with each `` having a different `<coord-box>`. We generated content with the name of the class, moving that text up 10px to prevent it from being masked out of view.

```css
div {
  width: 100px;
  height: 100px;
  background-color: #8cffa0;
  margin: 10px;
  border: 20px solid #8ca0ff;
  padding: 20px;
  mask-image: url("https://mdn.github.io/shared-assets/images/examples/mdn.svg");
  mask-size: 100% 100%;
}
.content-box {
  mask-clip: content-box;
}
.border-box {
  mask-clip: border-box;
}
.padding-box {
  mask-clip: padding-box;
}
div::before {
  content: attr(class);
  position: relative;
  top: -10px;
}
```

```css
body {
  display: flex;
  flex-flow: row wrap;
}
```

#### Results

## See also

- `mask` shorthand
- `mask-image`
- `mask-origin`
- `mask-position`
- `mask-repeat`
- `mask-size`
- `mask-border`
- `clip-path`
- `background-clip`
- Introduction to CSS clipping
- Introduction to CSS masking
- CSS `mask` properties
- Declaring multiple masks
- CSS masking module
