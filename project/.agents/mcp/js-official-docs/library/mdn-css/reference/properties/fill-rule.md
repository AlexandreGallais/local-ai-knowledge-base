---
title: "`fill-rule` CSS property"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/properties/fill-rule/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `fill-rule` CSS property

The **`fill-rule`** CSS property defines the rule used to determine which parts of the SVG shape's canvas are included inside a shape to be filled. If present, it overrides the element's `fill-rule` attribute.

The `fill-rule` clarifies which areas of a shape should be considered "inside" the shape. It provides two values you can set to tell the browser how the inside of a shape should be determined. For shapes that don't have intersecting paths, like a circle, the bounds of what is inside a shape to be filled are intuitively clear. With complex shapes that include intersecting paths (such as a Venn diagram) or paths enclosing other paths (such as a donut), the interpretation of which sections of the shape are "inside" the shape and should be filled by the `fill` property, may not be obvious.

> **Note:**
> The `fill-rule` property only applies to ``, `<polygon>`, `<polyline>`, `<text>`, `<textPath>`, and `<tspan>` elements nested in an ``. It doesn't apply to other SVG, HTML, or pseudo-elements.

## Syntax

```css
/* Keyword values */
fill-rule: evenodd;
fill-rule: nonzero;

/* Global values */
fill-rule: inherit;
fill-rule: initial;
fill-rule: revert;
fill-rule: revert-layer;
fill-rule: unset;
```

### Values

This property is specified as one of the following keyword values:

- `nonzero`
    For every point in the shape, a ray is drawn in a random direction to beyond the shape's outer edges. Each ray is examined to determine the places where the ray crosses the shape. Starting with a count of zero, add one each time a path segment crosses the ray from left to right and subtract one each time a path segment crosses the ray from right to left. After counting the crossings, if the result is zero then the point is outside the path. Otherwise, it is inside.

- `evenodd`
    For every point in the fill rule's box, a ray is drawn in a random direction. The number of path segments from the given shape that the ray crosses are counted. If this number is odd, the point is inside; if even, the point is outside. Zero is taken to be even.

## Examples

### Defining the fill rules for SVG elements

This example demonstrates how a `fill-rule` is declared, the effect of the property, and how the CSS `fill-rule` property takes precedence over the `fill-rule` attribute.

#### HTML

We define an SVG with two complex shapes defined using the SVG `<polygon>` and `` elements. The polygon has the SVG `fill-rule` attribute set to `evenodd` and the star-shaped path is set to `nonzero`, which is the default. To make the lines visible, we set the outline to `red` using the SVG `stroke` attribute (we could have alternatively used the `stroke` property).

```html
<p>Original SVG</p>
```

```html
<svg viewBox="0 0 220 120" xmlns="http://www.w3.org/2000/svg">
  <polygon
    points="180,10 150,100 220,40 140,40 210,100"
    stroke="red"
    fill-rule="evenodd" />
  <path
    d="M 10,5 l 90,0 -80,80 0,-60 80,80 -90,0 z"
    stroke="red"
    fill-rule="nonzero" />
</svg>
```

```html
<p><code>fill-rule: nonzero;</code></p>
<svg viewBox="0 0 220 120" xmlns="http://www.w3.org/2000/svg">
  <polygon
    points="180,10 150,100 220,40 140,40 210,100"
    stroke="red"
    fill-rule="evenodd" />
  <path
    d="M 10,5 l 90,0 -80,80 0,-60 80,80 -90,0 z"
    stroke="red"
    fill-rule="nonzero" />
</svg>
<p><code>fill-rule: evenodd;</code></p>
<svg viewBox="0 0 220 120" xmlns="http://www.w3.org/2000/svg">
  <polygon
    points="180,10 150,100 220,40 140,40 210,100"
    stroke="red"
    fill-rule="evenodd" />
  <path
    d="M 10,5 l 90,0 -80,80 0,-60 80,80 -90,0 z"
    stroke="red"
    fill-rule="nonzero" />
</svg>
```

The above SVG is repeated three times; we've only shown one copy for the sake of brevity.

#### CSS

The shapes nested in the first SVG have no CSS applied. We set the shapes inside the second SVG to use the `nonzero` value. The third SVG has all its nested shapes set to `evenodd`.

```css
svg {
  border: 1px solid;
  height: calc(33vh - 2.5em);
  margin-bottom: 10px;
}
p {
  margin: 0;
}
```

```css
svg:nth-of-type(2) > * {
  fill-rule: nonzero;
}
svg:nth-of-type(3) > * {
  fill-rule: evenodd;
}
```

#### Results

With the `nonzero` value for `fill-rule`, the "inside" of the shape is the entire shape. The `evenodd` value defines some space as empty. The first image renders the `fill-rule` included as an attribute. Declaring the `fill-rule` in the CSS overrides the attribute values in the second and third images.

## See also

- SVG `fill-rule` attribute
- Presentation properties: `fill-rule`, `clip-rule`, `color-interpolation-filters`, `fill-opacity`, `fill`, `marker-end`, `marker-mid`, `marker-start`, `shape-rendering`, `stop-color`, `stop-opacity`, `stroke`, `stroke-dasharray`, `stroke-dashoffset`, `stroke-linecap`, `stroke-linejoin`, `stroke-miterlimit`, `stroke-opacity`, `stroke-width`, `text-anchor`, and `vector-effect`
- `opacity`
- `background-color`
- `<color>`
- `basic-shape` data type
