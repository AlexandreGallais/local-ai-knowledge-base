---
title: "`-webkit-mask-box-image` CSS property"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/properties/-webkit-mask-box-image/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `-webkit-mask-box-image` CSS property

The non-standard prefixed **`-webkit-mask-box-image`** CSS shorthand property sets the mask image for an element's border box.

> **Note:**
> This property is not standard and is not on any standards track. Consider using the `mask-border` property instead.

## Constituent properties

This property is a shorthand for the following CSS properties:

- `-webkit-mask-border-source`
- `-webkit-mask-border-outset`
- `-webkit-mask-border-repeat`

The values includes the `<image>` to be used as the mask border, and optionally four border outset values and up to two border repeat styles.

## Syntax

```css
/* default */
-webkit-mask-box-image: none;

/* image */
-webkit-mask-box-image: url("image.png");

/* image edge-offset */
-webkit-mask-box-image: url("image.png") 10 20 20 10;
-webkit-mask-box-image: url("image.png") 10px 20px 20px 10px;

/* image repeat-style */
-webkit-mask-box-image: url("image.png") space repeat;

/* image edge-offset repeat-style */
-webkit-mask-box-image: url("image.png") 10px 20px 20px 10px space repeat;

/* Global values */
-webkit-mask-box-image: inherit;
-webkit-mask-box-image: initial;
-webkit-mask-box-image: revert;
-webkit-mask-box-image: revert-layer;
-webkit-mask-box-image: unset;
```

### Values

- `image`
    The location of the image resource to be used as a mask image, `gradient`, or other `image` value.
- `none`
    Used to specify that a border box is to have no mask image.
- `length`
    The size of the mask image's offset. See `<length>` for possible units.
- `percentage`
    The mask image's offset has a percentage value relative to the border box's corresponding dimension (width or height).
- `number`
    The size of the mask image's offset in pixels.
- `repeat`
    The mask image is repeated as many times as is necessary to span the border box. May include a partial image if the mask image does not divide evenly into the border box.
- `stretch`
    The mask image is stretched to contain the border box exactly.
- `round`
    The mask image is stretched somewhat and repeated such that there is no partial mask image at the end of the border box.
- `space`
    The mask image is repeated as many times as possible without stretching. There is no partial mask image at the end of the border box.

The outset values, or edge offsets, define the distances from the top, right, bottom, and left edges of the image, in that order. The values can be set as `length`, `number`, or `percentage`, with numbers interpreted as pixel lengths.

Border repeat styles, when included, are interpreted in the order of `<repeat-x> <repeat-y>`. If only one value is declared, the value is the same for both axes. While similar to `background-repeat`, the `cover` and `contain` values are not supported.

## Formal definition

- Initial value: `none`
- Applies to: all elements
- Inherited: no
- Computed value: as specified

## Examples

### Setting an image

```css
.example-one {
  -webkit-mask-box-image: url("mask.png");
}
```

### Offsetting and filling an image

```css
.example-two {
  -webkit-mask-box-image: url("logo.png") 100px 100px 0px 0px round round;
}
```

## Specifications

Not part of any standard.

## See also

- CSS `mask-border` property
- CSS `border-image` property
- Safari CSS reference: `-webkit-mask-box-image`
