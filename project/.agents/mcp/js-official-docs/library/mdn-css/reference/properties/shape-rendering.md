---
title: "`shape-rendering` CSS property"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/properties/shape-rendering/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `shape-rendering` CSS property

The **`shape-rendering`** CSS property provides hints to the renderer about what tradeoffs to make when rendering shapes like paths, circles, or rectangles.
It only has an effect on the `<circle>`, `<ellipse>`, `<line>`, ``, `<polygon>`, `<polyline>`, and `<rect>` elements. If explicitly declared, the value of the CSS property overrides the any values of the element's `shape-rendering` attribute.

## Syntax

```css
shape-rendering: auto;
shape-rendering: crispEdges;
shape-rendering: geometricPrecision;
shape-rendering: optimizeSpeed;

/* Global values */
shape-rendering: inherit;
shape-rendering: initial;
shape-rendering: revert;
shape-rendering: revert-layer;
shape-rendering: unset;
```

### Values

The `length` and `percentage` values denote the horizontal center of the circle or ellipse.

- `auto`
    This value directs the user agents to make tradeoffs in order to balance speed, edge crispness, and geometric precision, with geometric precision given more importance than speed and edge crispness.
- `crispEdges`
    This value directs the user agent to emphasize edge contrast over geometric precision or rendering speed. The final rendering is likely to skip techniques such as anti-aliasing. It may also adjust line positions and line widths in order to align edges with device pixels.
- `geometricPrecision`
    This value directs the user agent to emphasize geometric precision over speed or crisp edges. The final rendering may involve techniques such as anti-aliasing.
- `optimizeSpeed`
    This value directs the user agent to emphasize rendering speed over geometric precision or edge crispness. The final rendering is likely to skip techniques such as anti-aliasing.

## Example

To show the different renderings, we create a set of four ellipses of equal size and shape.

```html
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 120">
  <ellipse cx="50" cy="60" rx="40" ry="60" />
  <ellipse cx="150" cy="60" rx="40" ry="60" />
  <ellipse cx="250" cy="60" rx="40" ry="60" />
  <ellipse cx="350" cy="60" rx="40" ry="60" />
</svg>
```

We then apply the four values of `shape-rendering`, one per ellipse.

```css
ellipse:nth-of-type(1) {
  shape-rendering: crispEdges;
}
ellipse:nth-of-type(2) {
  shape-rendering: geometricPrecision;
}
ellipse:nth-of-type(3) {
  shape-rendering: optimizeSpeed;
}
ellipse:nth-of-type(4) {
  shape-rendering: auto;
}
```

The resulting SVG is shown here. The first and third ellipses (counting from left to right) are more likely to show jagged edges, whereas the second should have a smoother appearance. The fourth and last ellipse's appearance will be dictated by the specific tradeoffs made by the user agent you use to view the example.

## See also

- SVG `shape-rendering` attribute
