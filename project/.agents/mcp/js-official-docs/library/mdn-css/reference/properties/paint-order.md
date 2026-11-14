---
title: "`paint-order` CSS property"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/properties/paint-order/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `paint-order` CSS property

The **`paint-order`** CSS property lets you control the order in which the fill and stroke (and painting markers) of text content and shapes are drawn.

## Syntax

```css
/* Normal */
paint-order: normal;

/* Single values */
paint-order: stroke; /* draw the stroke first, then fill and markers */
paint-order: markers; /* draw the markers first, then fill and stroke */

/* Multiple values */
paint-order: stroke fill; /* draw the stroke first, then the fill, then the markers */
paint-order: markers stroke fill; /* draw markers, then stroke, then fill */

/* Global values */
paint-order: inherit;
paint-order: initial;
paint-order: revert;
paint-order: revert-layer;
paint-order: unset;
```

If no value is specified, the default paint order is `fill`, `stroke`, `markers`.

When one value is specified, that one is painted first, followed by the other two in their default order relative to one another. When two values are specified, they will be painted in the order they are specified in, followed by the unspecified one.

> **Note:**
> In the case of this property, markers are only appropriate when drawing SVG shapes involving the use of the `marker-*` properties (e.g., `marker-start`) and `<marker>` element. They do not apply to HTML text, so in that case, you can only determine the order of `stroke` and `fill`.

### Values

- `normal`
    Paint the different items in normal paint order.
- `stroke`,
  `fill`,
  `markers`
    Specify some or all of these values in the order you want them to be painted in.

## Examples

### Reversing the paint order of stroke and fill

#### SVG

```html
<svg xmlns="http://www.w3.org/2000/svg" width="400" height="200">
  <text x="10" y="75">stroke in front</text>
  <text x="10" y="150" class="stroke-behind">stroke behind</text>
</svg>
```

#### CSS

```css
text {
  font-family: sans-serif;
  font-size: 50px;
  font-weight: bold;
  fill: black;
  stroke: red;
  stroke-width: 4px;
}

.stroke-behind {
  paint-order: stroke fill;
}
```

#### Result

### Reversing the paint order of stroke and fill using HTML

To control the fill and stroke order in HTML, you can use the `-webkit-text-stroke-color` and `-webkit-text-stroke-width` CSS properties.

#### HTML

```html
<div>stroke in front</div>
<div class="stroke-behind">stroke behind</div>
```

#### CSS

```css
div {
  font-family: sans-serif;
  font-size: 50px;
  font-weight: bold;
  fill: black;
  padding-top: 10px;
  padding-bottom: 10px;
  -webkit-text-stroke-color: red;
  -webkit-text-stroke-width: 4px;
}

.stroke-behind {
  paint-order: stroke fill;
}
```

#### Result

## See also

- CSS Tricks: paint-order
