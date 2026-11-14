---
title: "Basic shapes with shape-outside (part 2 of 2)"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/guides/shapes/using_shape-outside/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Basic shapes with shape-outside (part 2 of 2)

## polygon()

The `polygon()` function is more complex, enabling the creation of multiple-sided polygon shapes. This shape accepts three or more pairs of values (a polygon must at least draw a triangle). Each space-separated pair of values is separated with a comma and represents the coordinates of a single vertex drawn relative to the reference box. Each pair of coordinates defines an edge of the polygon, with the final edge defined by the first and last set of coordinates.

The example below creates a shape for text to follow using the `polygon()` function. Try changing the coordinate values to see how the shape changes.

```html
<div class="box">
  <div class="shape"></div>
  <p>
    One November night in the year 1782, so the story runs, two brothers sat
    over their winter fire in the little French town of Annonay, watching the
    grey smoke-wreaths from the hearth curl up the wide chimney. Their names
    were Stephen and Joseph Montgolfier, they were papermakers by trade, and
    were noted as possessing thoughtful minds and a deep interest in all
    scientific knowledge and new discovery. Before that night—a memorable night,
    as it was to prove—hundreds of millions of people had watched the rising
    smoke-wreaths of their fires without drawing any special inspiration from
    the fact.
  </p>
</div>
```

```css
body {
  font: 1.2em sans-serif;
}

.shape {
  float: left;
  shape-outside: polygon(
    0px 0px,
    0px 189px,
    100.48% 94.71%,
    200px 120px,
    80.67% 37.17%
  );
  width: 200px;
  height: 200px;
}
```

To create even more complex shapes, you can define the outline of any shape with the `path()` or `shape()` functions.

The `inset()`, `circle()`, `ellipse()`, and `polygon()` are inspectable and editable using the Firefox Developer Tools Shape Inspector. The screenshot below shows the shape highlighted in the tool.

Another resource is Clippy, a tool for creating shapes with examples using the CSS `clip-path` property, which uses the same basic shape functions and values as the `shape-outside` property.
