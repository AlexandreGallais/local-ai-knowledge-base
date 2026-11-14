---
title: "`image-resolution` CSS property"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/properties/image-resolution/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `image-resolution` CSS property

The **`image-resolution`** CSS property specifies the intrinsic resolution of all raster images used in or on the element. It affects content images such as replaced elements and generated content, and decorative images such as `background-image` images.

The image resolution is defined as the number of image pixels per unit length, e.g., pixels per inch. By default, CSS assumes a resolution of one image pixel per CSS px unit; however, the `image-resolution` property allows a different resolution to be specified.

## Syntax

```css
image-resolution: from-image;
image-resolution: 300dpi;
image-resolution: from-image 300dpi;
image-resolution: 300dpi snap;

/* Global values */
image-resolution: inherit;
image-resolution: initial;
image-resolution: revert;
image-resolution: revert-layer;
image-resolution: unset;
```

### Values

This property is specified as one or more space-separated values from the following list:

- `resolution`
    Specifies the intrinsic resolution explicitly.
- `from-image`
    Uses the intrinsic resolution as specified by the image format. If the image does not specify its own resolution, the explicitly specified resolution is used (if given), else it defaults to `1dppx` (1 image pixel per CSS px unit).
- `snap`
    If the `snap` keyword is provided, the computed resolution is the specified resolution rounded to the nearest value that would map one image pixel to an integer number of device pixels. If the resolution is taken from the image, then the used intrinsic resolution is the image's native resolution similarly adjusted.

> **Note:**
> As vector formats such as SVG do not have an intrinsic resolution, this property has no effect on vector images.

## Examples

### Setting a high dpi for print

When printing the document, use a higher resolution.

```css
@media print {
  .my-image {
    image-resolution: 300dpi;
  }
}
```

### Use image resolution with fallback

Uses the resolution from the image. If the image does not have a resolution, use 300dpi rather than the default 1dppx.

```css
.my-image {
  image-resolution: from-image 300dpi;
}
```

## Browser compatibility

Currently, no browsers support this feature.

## See also

- Other image-related CSS properties: `object-fit`, `object-position`, `image-orientation`, `image-rendering`.
- Chromium bug: 1086473.
