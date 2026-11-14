---
title: "`fill` CSS property"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/properties/fill/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `fill` CSS property

The **`fill`** CSS property defines how SVG text content and the interior canvas of SVG shapes are filled or painted. If present, it overrides the element's `fill` attribute.

The areas inside the outline of the SVG shape or text are painted. What is "inside" a shape may not always be clear. The paths defining a shape may overlap. The areas considered "inside" these complex shapes are clarified by the `fill-rule` property or attribute.

If subpaths are open, `fill` closes the path before painting, as if a "closepath" command were included connecting the last point of the subpath with the first point of the subpath. In other words, `fill` applies to open subpaths within `path` elements (i.e., subpaths without a closepath command) and `polyline` elements.

> **Note:**
> The `fill` property only applies to `<circle>`, `<ellipse>`, ``, `<polygon>`, `<polyline>`, `<rect>`, `<text>`, `<textPath>`, and `<tspan>` elements nested in an ``. It doesn't apply to other SVG, HTML, or pseudo-elements.

## Syntax

```css
/* Keyword values */
fill: none;
fill: context-fill;
fill: context-stroke;

/* <color> values */
fill: red;
fill: hsl(120deg 75% 25% / 60%);

/* <url> values */
fill: url("#gradientElementID");
fill: url("star.png");

/* <url> with fallback */
fill: url("#gradientElementID") blue;
fill: url("star.png") none;

/* Global values */
fill: inherit;
fill: initial;
fill: revert;
fill: revert-layer;
fill: unset;
```

### Values

This property is specified as a single value from the following list or as two values when using `<url>`:

- `none`
    No `fill` is painted; the areas inside the stroke, if any, are transparent.

- `context-fill`
    Uses the paint value of `fill` from a context element.

- `context-stroke`
    Uses the paint value of `stroke` from a context element.

- `<color>`
    The color of the fill as any valid CSS `<color>` value.

- `<url>`
    A URL reference to an SVG paint server element, such as a `<linearGradient>`, `<radialGradient>`, or `<pattern>`. The resource reference can optionally be followed by a `<color>` or `none`, which will be used as a fallback if the referenced paint server doesn't resolve.

## Examples

### Defining fill values for SVG elements

This example demonstrates how a `fill` is declared, the effect of the property, and how the CSS `fill` property takes precedence over the `fill` attribute.

#### HTML

We have an SVG with two complex shapes defined using the SVG `<polygon>` and `` elements. Both have the `fill` attribute set to the default `black`. We add a dark gray stroke of `#666666` using the SVG `stroke` attribute but could have used the `stroke` property.

```html
<svg viewBox="0 0 220 120" xmlns="http://www.w3.org/2000/svg">
  <path
    d="M 10,5 l 90,0 -80,80 0,-60 80,80 -90,0 z"
    stroke="#666666"
    fill="black" />
  <polygon
    points="180,10 150,100 220,40 140,40 210,100"
    stroke="#666666"
    fill="black" />
</svg>
```

#### CSS

We set `fill` values on the shapes in the SVG.

```css
svg {
  border: 1px solid;
  height: calc(100vh - 20px);
  margin-bottom: 10px;
}
```

```css
path {
  fill: red;
}
polygon {
  fill: hsl(0deg 100% 50% / 60%);
}
```

#### Results

The CSS `fill` property value overrides the SVG `fill` attribute value, resulting in both shapes being filled with a red color; the polygon's red is translucent.

### Using fill keyword values

This example demonstrates using keyword values for `fill`.

#### HTML

We include three `` elements and a `<marker>` element that adds a `<circle>` to every path point. We set the circle marker to be black with a gray fill with the SVG `stroke` and `fill` attributes.

```html
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 90">
  <path d="M 10 44.64 L 30 10 L 70 10 L 90 44.64 L 70 79.28 L 30 79.28 Z" />
  <path d="M 100 44.64 L 80 10 L 120 10 L 140 44.64 L 120 79.28 L 80 79.28 Z" />
  <path
    d="M 150 44.64 L 130 10 L 170 10 L 190 44.64 L 170 79.28 L 130 79.28 Z" />
  <marker
    id="circle"
    markerWidth="12"
    markerHeight="12"
    refX="6"
    refY="6"
    markerUnits="userSpaceOnUse">
    <circle cx="6" cy="6" r="3" stroke-width="2" stroke="black" fill="grey" />
  </marker>
</svg>
```

#### CSS

We set different `stroke` and `fill` colors on each path. The first path, the one with a red border, has its `fill` set to `none`. We set the circle marker's stroke and fill to the same color as the stroke of the element they're marking, using the `context-stroke` value.

```css
svg {
  border: 1px solid;
  height: calc(100vh - 20px);
  margin-bottom: 10px;
}
```

```css
path {
  stroke-width: 2px;
  marker: url("#circle");
}
path:nth-of-type(1) {
  stroke: red;
  fill: none;
}
path:nth-of-type(2) {
  stroke: green;
  fill: lightgreen;
}
path:nth-of-type(3) {
  stroke: blue;
  fill: lightblue;
}
circle {
  stroke: context-stroke;
  fill: context-stroke;
}
```

#### Results

Note how the first path has a transparent background because the `fill` is `none`, overriding the default `fill` of `black`. The circles are filled with the color of the stroke. If you change the value to `context-fill`, the circles will be transparent, `lightgreen` and `lightblue` instead of `red`, `green`, and `blue`.

### Fills and fallbacks

This example demonstrates how to include a `url()` value with a fallback as a `fill` value.

#### HTML

We have an SVG containing two `<polygon>` stars and a `<linearGradient>` that goes from green to gold to red.

```html
<svg viewBox="0 0 220 120" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="myGradient">
      <stop offset="5%" stop-color="green" />
      <stop offset="50%" stop-color="gold" />
      <stop offset="95%" stop-color="red" />
    </linearGradient>
  </defs>
  <polygon points="80,10 50,100 120,40 40,40 110,100" />
  <polygon points="180,10 150,100 220,40 140,40 210,100" />
</svg>
```

#### CSS

We set `fill` values on the polygons in the SVG, providing a `url()` value and a fallback.

```css
svg {
  border: 1px solid;
  height: calc(100vh - 20px);
  margin-bottom: 10px;
}
```

```css
polygon:first-of-type {
  fill: url("#myGradient") magenta;
}
polygon:last-of-type {
  fill: url("#MISSINGIMAGE") magenta;
}
```

#### Results

The first star has a gradient as a background. The second star uses the fallback value, as the element referenced in the `url()` does not exist.

## See also

- SVG `fill` attribute
- Presentation properties: `fill`, `clip-rule`, `color-interpolation-filters`, `fill-opacity`, `fill-rule`, `marker-end`, `marker-mid`, `marker-start`, `shape-rendering`, `stop-color`, `stop-opacity`, `stroke`, `stroke-dasharray`, `stroke-dashoffset`, `stroke-linecap`, `stroke-linejoin`, `stroke-miterlimit`, `stroke-opacity`, `stroke-width`, `text-anchor`, and `vector-effect`
- `opacity`
- `background-color`
- `<color>`
- `basic-shape` data type
