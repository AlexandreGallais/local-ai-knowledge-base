---
title: "CSS shapes"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/guides/shapes/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# CSS shapes

The **CSS shapes** module describes geometric shapes. It also defines CSS properties that can use the shapes to control the geometry of an element's float area; this area can then be applied to exclusions, or specify an element's content area.

The specification defines several ways to create shapes. Content can be wrapped around or within a shape rather than following the default rectangle shape of the element's box.

Shapes define geometries that can be used as CSS values. This module provides functions for creating ellipses, polygons, and arbitrary geometries. Other CSS modules can make use of shapes defined in this specification, including CSS motion path and CSS masking.

## CSS shapes in action

The example below shows an image that has been floated left, and the `shape-outside` property applied with a value of `circle(50%)`. This creates a circle shape, and the content wrapping the float now wraps around that shape. This changes the length of the wrapping text's line boxes. You can click "Play" to edit the code in the MDN Playground.

```html
<div class="box">
  <img
    alt="A hot air balloon"
    src="https://mdn.github.io/shared-assets/images/examples/round-balloon.png" />
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
  font: 1.2em / 1.5 sans-serif;
}
img {
  float: left;
  shape-outside: circle(50%);
}
```

## Reference

### Properties

- `shape-image-threshold`
- `shape-margin`
- `shape-outside`

The CSS shapes module also introduces the `shape-inside` and `shape-padding` properties. Currently, no browsers support these features.

### Data types

- `basic-shape`

### Functions

- `circle()`
- `ellipse()`
- `inset()`
- `path()`
- `polygon()`
- `rect()`
- `shape()`
- `xywh()`

### Terms

- Reference box

## Guides

- Overview of shapes
    Defining basic <example-value> with the `shape-margin` and `clip-path` properties, and debugging basic <example-value> with
    Developer Tools.

- Shapes from box values
    Using `border-radius` curvatures and CSS box model values to create shapes.

- Basic <example-value> with `shape-outside`
    Creating rectangles, circles, ellipses, and polygons with CSS shapes, the reference box, and the `shape-outside` property.

- Shapes from images
    Creating shapes from semi-transparent image files and CSS Gradients.

## Related concepts

CSS motion path module

- `offset`
- `offset-anchor`
- `offset-distance`
- `offset-path`
- `offset-position`
- `offset-rotate`
- `ray` function

CSS masking module

- `clip`
- `clip-path`
- `clip-rule`
- `mask`
- `mask-origin`
- `mask-position`

CSS backgrounds and borders module

- `border-radius` shorthand

CSS borders and box decorations module

- `border-shape`

CSS box model module

- `box-edge` data type

## See also

- Shape generator
- CSS Shapes resources
- CSS Shapes 101 via alistapart.com (2014)
- Creating non-rectangular layouts with CSS Shapes via sarasoueidan.com (2013)
- How to use CSS Shapes in your web design via tutsplus.com (2016)
- Edit CSS shapes with the shape path editor via mozilla.org (2018) (Video)
