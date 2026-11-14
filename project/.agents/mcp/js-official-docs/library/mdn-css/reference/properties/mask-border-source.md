---
title: "`mask-border-source` CSS property"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/properties/mask-border-source/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `mask-border-source` CSS property

The **`mask-border-source`** CSS property sets the source image used to create an element's mask border.

The `mask-border-slice` property is used to divide the source image into regions, which are then dynamically applied to the final mask border.

## Syntax

```css
/* Keyword value */
mask-border-source: none;

/* <image> values */
mask-border-source: url("image.jpg");
mask-border-source: linear-gradient(to top, red, yellow);

/* Global values */
mask-border-source: inherit;
mask-border-source: initial;
mask-border-source: revert;
mask-border-source: revert-layer;
mask-border-source: unset;
```

### Values

- `none`
    No mask border is used.
- `image`
    Image reference to use for the mask border.

## Examples

### Basic usage

This property doesn't appear to be supported anywhere yet. When it eventually starts to be supported, it will serve to define the source of the border mask.

```css
mask-border-source: url("image.jpg");
```

Chromium-based browsers support an outdated version of this property — `mask-box-image-source` — with a prefix:

```css
-webkit-mask-box-image-source: url("image.jpg");
```

> **Note:**
> The `mask-border` page features a working example (using the out-of-date prefixed border mask properties supported in Chromium), so you can get an idea of the effect.

## See also

- `mask-border`
- `mask-border-mode`
- `mask-border-outset`
- `mask-border-repeat`
- `mask-border-width`
