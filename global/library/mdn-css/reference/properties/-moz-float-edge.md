---
title: "`-moz-float-edge` CSS property"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/properties/-moz-float-edge/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `-moz-float-edge` CSS property

The non-standard **`-moz-float-edge`** CSS property specifies whether the height and width properties of the element include the margin, border, or padding thickness.

## Syntax

```css
/* Keyword values */
-moz-float-edge: content-box;
-moz-float-edge: margin-box;

/* Global values */
-moz-float-edge: inherit;
-moz-float-edge: initial;
-moz-float-edge: revert;
-moz-float-edge: revert-layer;
-moz-float-edge: unset;
```

### Values

This property is specified as one of the following keyword values:

- `content-box`
    The height and width properties include the content, but not the padding, border or margin.
- `margin-box`
    The height and width properties include the content, padding, border and margin.

## Examples

### HTML

```html
<div class="box">
  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
</div>
```

### CSS

```css
.box {
  display: block;
  height: 5px;
  margin: 0.5em auto;
  color: gray;
  -moz-float-edge: margin-box;
  box-sizing: border-box;
}
```

## Specifications

Not part of any standard.

## See also

- Firefox bug 432891
