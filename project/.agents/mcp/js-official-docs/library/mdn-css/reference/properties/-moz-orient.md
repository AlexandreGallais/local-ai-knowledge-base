---
title: "`-moz-orient` CSS property"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/properties/-moz-orient/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `-moz-orient` CSS property

The **`-moz-orient`** CSS property specifies the orientation of the element to which it's applied.

## Syntax

```css
-moz-orient: inline;

/* Global values */
-moz-orient: inherit;
-moz-orient: initial;
-moz-orient: revert;
-moz-orient: revert-layer;
-moz-orient: unset;
```

### Values

This property is specified as one of the following keyword values:

- `inline`
    The element is rendered in the same direction as the axis of the text: horizontally for horizontal writing modes, vertically for vertical writing modes.
- `block`
    The element is rendered orthogonally to the axis of the text: vertically for horizontal writing modes, horizontal for vertical writing modes.
- `horizontal`
    The element is rendered horizontally.
- `vertical`
    The element is rendered vertically.

## Examples

### HTML

```html
<p>The following progress meter is horizontal (the default):</p>
<progress max="100" value="75"></progress>

<p>The following progress meter is vertical:</p>
<progress class="vert" max="100" value="75"></progress>
```

### CSS

```css
.vert {
  -moz-orient: vertical;
  width: 16px;
  height: 150px;
}
```

## Specifications

Not part of any standard. Though submitted to the W3C, with positive initial feedback, this property is not yet part of any specification; currently, this is a Mozilla-specific extension (that is, `-moz-orient`).

## See also

- `box-orient`
