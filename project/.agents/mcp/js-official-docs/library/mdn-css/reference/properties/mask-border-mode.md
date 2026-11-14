---
title: "`mask-border-mode` CSS property"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/properties/mask-border-mode/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `mask-border-mode` CSS property

The **`mask-border-mode`** CSS property specifies the blending mode used in a mask border.

## Syntax

```css
/* Keyword values */
mask-border-mode: luminance;
mask-border-mode: alpha;

/* Global values */
mask-border-mode: inherit;
mask-border-mode: initial;
mask-border-mode: revert;
mask-border-mode: revert-layer;
mask-border-mode: unset;
```

### Values

This property is specified as one of the following keyword values:

- `luminance`
    The luminance values of the mask border image are used as the mask values.
- `alpha`
    The alpha values of the mask border image are used as the mask values.

## Browser compatibility

Currently, no browsers support this feature.

## See also

- `mask-mode`
- `mask-type`
- Alpha transparency versus luminance
- `mask-border` shorthand
- `mask-border-outset`
- `mask-border-repeat`
- `mask-border-source`
- `mask-border-width`
- `mask-mode`
- CSS masking module
