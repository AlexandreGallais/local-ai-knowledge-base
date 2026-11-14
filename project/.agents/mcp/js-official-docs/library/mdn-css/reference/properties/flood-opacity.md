---
title: "`flood-opacity` CSS property"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/properties/flood-opacity/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `flood-opacity` CSS property

The **`flood-opacity`** CSS property defines the opacity of the current filter primitive subregion in `<feFlood>` and `<feDropShadow>` elements within a `<filter>`. If present, it overrides the element's `flood-opacity` attribute.

The property value impacts the `flood-color`'s alpha channel; it can increase the transparency of a `flood-color` but cannot make the color defined by the `flood-color` property more opaque.

> **Note:**
> The `flood-opacity` property only applies to `<feFlood>` and `<feDropShadow>` elements nested in an ``. It doesn't apply to other SVG, HTML, or pseudo-elements.

## Syntax

```css
/* numeric and percentage values */
flood-opacity: 0.2;
flood-opacity: 20%;

/* Global values */
flood-opacity: inherit;
flood-opacity: initial;
flood-opacity: revert;
flood-opacity: revert-layer;
flood-opacity: unset;
```

### Values

The `<opacity-value>` is a `number` or `percentage` denoting the opacity of the SVG gradient `<flood>` element.

- `number`
    A numeric value between `0` and `1`, inclusive.

- `percentage`
    A percentage value between `0%` and `100%`, inclusive.

With `0` or `0%` set, the flood is fully transparent. With `1` or `100%` set, the element is the full opacity of the `flood-color` value, which may or may not be partially opaque.

## Examples

### Defining the flood opacity of a filter

This example demonstrates the basic use case of `flood-opacity`, and how the CSS `flood-opacity` property takes precedence over the `flood-opacity` attribute.

#### HTML

We have an SVG with a few `<filter>` elements, each with a `<feFlood>` child. The `<feFlood>` define the filters as `seagreen`, with the first being declared by its `flood-opacity` attribute as fully opaque and the second being fully transparent. We included two `<rect>` elements, each with a filter attribute.

```html
<svg viewBox="0 0 420 120" xmlns="http://www.w3.org/2000/svg">
  <filter id="flood1">
    <feFlood flood-color="seagreen" flood-opacity="1" />
  </filter>
  <filter id="flood2">
    <feFlood flood-color="seagreen" flood-opacity="0" />
  </filter>

  <rect id="r1" filter="url(#flood1)" />
  <rect id="r2" filter="url(#flood2)" />
</svg>
```

#### CSS

We define the `height`, `width`, `x`, and `y`,positioning of our rectangles with CSS, and include a repeating linear gradient as a `background-image` on the SVG so the opacity of the flood-color is more apparent:

```css
svg {
  background-image: repeating-linear-gradient(
    45deg,
    transparent 0 9px,
    #cccccc 0px 10px
  );
}
rect {
  width: 100px;
  height: 100px;
  x: 10px;
  y: 10px;
}
#r2 {
  x: 150px;
}
```

We then apply different flood opacity values to the `<feFlood>` elements using the CSS `flood-opacity`: property:

```css
#flood1 feFlood {
  flood-opacity: 0.5;
}
#flood2 feFlood {
  flood-opacity: 90%;
}
```

#### Results

The attributes defined the first square as fully opaque and the second as fully transparent, but these values were overridden by the CSS `flood-opacity` values. The seagreen filters are 50% and 90% opaque, respectively.

## See also

- `flood-color`
- `fill`
- `stop-opacity`
- `stroke-opacity`
- `opacity`
- `box-shadow`
- `text-shadow`
- `filter-function`, including `opacity()`
- SVG `flood-opacity` attribute
