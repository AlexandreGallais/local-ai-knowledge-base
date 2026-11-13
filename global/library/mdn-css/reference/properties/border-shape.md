---
title: "`border-shape` CSS property (part 1 of 2)"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/properties/border-shape/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `border-shape` CSS property

The **`border-shape`** CSS property defines an element's border shape using `basic-shape` values.

## Syntax

```css
/* Keyword value */
border-shape: none;

/* Single <basic-shape> value */
border-shape: circle(50%);
border-shape: rect(10px 460px 130px 20px round 20px);
border-shape: shape(
  from 5% 0.5rem,
  arc to 80px 1pt of 10% ccw large rotate 25deg
);

/* Two <basic-shape> values */
border-shape: circle(50%) ellipse(40% 30%);
border-shape: polygon(0% 0%, 0% 100%, 100% 0%)
  polygon(10% 10%, 10% 70%, 70% 10%);

/* <basic-shape> and <geometry-box> values */
border-shape: circle(50%) border-box ellipse(40% 30%) view-box;
border-shape: rect(5px 198px 189px 0px round 20px) view-box circle(50%);
border-shape: path(
    "M 35,95 C 35,50 60,15 100,20 C 120,5 160,5 180,22 C 200,5 250,5 270,22 C 295,5 340,5 360,22 C 395,10 440,35 440,75 C 455,90 450,120 430,128 C 400,145 360,145 330,130 C 300,145 260,145 230,130 C 200,145 160,145 130,130 C 80,142 35,120 35,95 Z"
  )
  view-box;

/* Global values */
border-shape: inherit;
border-shape: initial;
border-shape: revert;
border-shape: revert-layer;
border-shape: unset;
```

The `border-shape` property may be specified using the keyword `none`, or one or two space-separated shape definitions, each consisting of a `<basic-shape>` value or a `<basic-shape>` value and a `<geometry-box>` value.

### Values

- `none`
    Specifies that no border shape is defined. This is the initial value.
- `basic-shape`
    Defines the shape of the border using one of the `<basic-shape>` functions.
- `<geometry-box>` (optional)
    Defines the reference box relative to which the border shape is drawn. If not included, the shape's reference geometry box defaults to:
    - `half-border-box` if a single basic shape is specified, which means that any defined border is drawn on top of the shape path, with the path going down its center.
    - `border-box` for the first (outer) shape and `padding-box` for the second (inner) shape if two basic <example-value> are specified. The border then occupies the area between the two shapes.

## Description

The `border-shape` property can be applied to elements to create precisely-shaped containers such as speech bubbles, as shown here, or abstract tooltip designs, without having to use workarounds.

```html
<img src="https://mdn.github.io/shared-assets/images/examples/leopard.jpg" />
<p>I am a leopard</p>
```

```css
html {
  height: 100%;
}

body {
  margin: 0;
  height: inherit;
  display: flex;
  justify-content: center;
  align-items: center;
}

img {
  display: block;
  width: 300px;
  anchor-name: --leopard;
  position: relative;
  top: 45px;
}

p {
  font-family: "Helvetica", "Arial";
  font-size: 1.3rem;
  padding: 15px 0;
  margin: 0 0 -30px -110px;
  background-color: chartreuse;
  border: 7px solid rgb(50 50 50);
  box-shadow: 5px 5px 10px rgb(0 0 0 / 0.75);

  width: 250px;
  height: 100px;
  border-shape: shape(
      from 50.08% 0%,
      curve to 97.71% 25.55% with 72.95% 0%/93.9% 8.76%,
      curve to 97.71% 62.04% with 100.76% 37.96%/100.76% 49.64%,
      curve to 50.08% 83.94% with 93.9% 75.18%/72.95% 83.94%,
      curve to 23.41% 82.48% with 36.75% 83.94%/27.22% 83.21%,
      curve to 17.7% 100% with 21.51% 87.59%/19.22% 94.16%,
      curve to 11.98% 82.48% with 16.17% 94.16%/13.89% 87.59%,
      curve to 1.31% 62.04% with 13.5% 81.75%/3.98% 76.64%,
      curve to 2.45% 25.55% with -0.59% 49.64%/-0.59% 37.96%,
      curve to 50.08% 0% with 6.26% 8.76%/27.22% 0%,
      close
    )
    content-box;

  text-align: center;
  line-height: 4;

  position: absolute;
  position-anchor: --leopard;
  bottom: anchor(top);
  left: anchor(right);
}
```

Note how the applied `border-shape` plays well with the `border` and `box-shadow` defined on the element — they follow the shape of the border.

### Supported shape functions

You can define an element's `border-shape` (including that of an inline or pseudo-element) using one of the `basic-shape` functions. These functions include:

- `inset()`, `rect()`, and `xywh()`: Provide different ways to define basic <example-value> shapes.
- `circle()`: Defines circle shapes.
- `ellipse()`: Defines ellipse shapes.
- `path()`: Defines any kind of shape using SVG path string syntax. SVG path syntax has limitations — it can use only pixel values and the path has to be defined as a single string, so custom properties can't be included via `var()`. You are advised to use `shape()` instead.
- `polygon()`: Defines any kind of polygon via pairs of vertex coordinates. If your desired shape includes smooth curves, you are advised to use `shape()`.
- `shape()`: Defines any kind of shape. The syntax of `shape()` is more CSS-compatible than that of `path()` and solves its shortcomings.

You can also include an optional `<geometry-box>` keyword after each `<basic-shape>` value to specify the reference box relative to which the shapes should be drawn.

### Stroke and fill modes

The `border-shape` property has the following two modes:

- If a single `<basic-shape>` is provided in the value, that shape defines the shape of the element's border, with the defined border styles drawn as a stroke around the shape, as shown in the previous example. This is known as **stroke mode**.
- If two `<basic-shape>`s are provided in the value, the first shape defines the outer boundary of the border, the second shape defines the inner boundary of the border, and any defined border color fills the area between the two boundaries. This is known as **fill mode**.

> **Note:**
> Avoid defining a shape for the inner boundary that's larger than the outer boundary. If you do this, the border area does not render properly; you might end up with no border fill rendered or one shape rendered behind the other.

### Effect on layout and rendering

The `border-shape` property creates a purely visual effect — the element's layout is still computed using the underlying rectangular box definition, and the content flow is not affected.

The element's content and background are clipped by the `border-shape` property (the inner shape in fill mode). When the specified `border-shape` is the same size or smaller than the content/background, you won't need to adjust the reference box, unless you want to create some kind of offset effect. However, when the specified `border-shape` is larger than the content/background, you will see gaps between the edge of the background and the shape(s). In such cases, you may need to use a different reference box to fix the display (see Handling border-shapes larger than the element's background for more information).

### Limitations on border styles applied to border shapes

Not all border styles are applied to elements with a `border-shape` property set. The following list explains how each property is affected:

- `border-color`: This property is applied. However, when multiple element borders have different colors applied, the browser chooses the first edge with a border color, in the following order:

  - Block start edge
  - Inline start edge
  - Block end edge
  - Inline end edge

  The browser then applies that edge's border color to the entire rendered `border-shape`.

- `border-image`: Not applied.
- `border-style`: Not applied. All borders are rendered with a `solid` style.
- `border-width`: In stroke mode, `border-width` is applied directly to the rendered `border-shape`. When multiple edges have different border widths, the browser selects a width to apply to the entire border using the same process as described for `border-color`.

  In fill mode, the border area is defined by the difference between the areas of the outer and inner shapes; therefore, `border-width` doesn't have any direct effect on the width of the rendered border. However, it does have an indirect effect — it still affects the size of the reference boxes the shapes are drawn relative to (unless you set their `<geometry-box>` to `content-box` or `padding-box`). You therefore still need to be mindful of the `border-width` set on the underlying element while using fill mode.

As an example, if an element has the following declarations applied:

```css
border-shape: rect(5px 198px 189px 0px round 20px);
border-bottom: 30px dashed blue;
border-left: 40px dotted hotpink;
border-right: 50px double yellow;
```

The rendered box will have a rectangular border with rounded corners. The border style will be `solid` because other styles are ignored. The border width and color will be `40px` and `hotpink`, respectively – this is because the `border-left` property applies styles to the inline start edge (assuming that the page has a horizontal `writing-mode`), which is the first edge with border styles; this gets chosen by the browser per the priority list described earlier.

### Interaction with `border-radius` and `corner-shape`

The `border-radius` and `corner-shape` properties are incompatible with `border-shape`. When a `border-shape` is set on an element, any set `border-radius` is ignored, therefore `corner-shape` will also have no effect. The `border-shape` and `border-radius`/`corner-shape` properties have different effects, and are used separately.

If you want to use shaped corners in a `border-shape`, you will have to draw them directly as part of the shape.

### `border-shape` versus `clip-path`

The `clip-path` property takes values similar to `border-shape` and produces similar effects. Both properties can be used to change the shape of an element and therefore the element's hit area, altering the boundary inside which `:hover` effects and pointer-related events activate.

However, there is a fundamental difference in how the two properties work:

- `clip-path` hides the area of the element that sits outside the region defined by the provided shape.
- `border-shape` changes the visual rendering of the element so that it sits inside the region defined by the provided shape.

This means `border-shape` clips the element's content while still letting the `overflow` property control its display, whereas `clip-path` hides the element's content altogether, so overflow control is not possible.

More significantly, properties such as `box-shadow` and `outline` do not follow the shape created by `clip-path` — it chops off the outside of the element, meaning that such effects are truncated in an ugly fashion or removed altogether. The `border-shape` property, on the other hand, creates a differently-shaped border that is neatly followed by such effects.

### Handling border-shapes larger than the element's background

As mentioned earlier, one issue with `border-shape` is that when you define a shape that is larger than the element's content/background, you can end up with a gap between the background and the border.

The recommended approach to fixing this is to set the reference `<geometry-box>` to `content-box`. and then use `padding` to fill in the gaps between the content and the border. For example:

```css
border-shape: shape(
    from 0% 0%,
    hline to 33%,
    arc by 33% 0% of 16% 20% small cw,
    hline to 100%,
    line to 100% 33%,
    arc by 0% 33% of 20% 16% small cw,
    line to 100% 100%,
    hline to 66%,
    arc by -33% 0% of 16% 20% small ccw,
    hline to 0%,
    line to 0% 66%,
    arc by 0% -33% of 20% 16% small ccw,
    close
  )
  content-box;
padding: 24px;
```

This way, the `padding` will be set outside the shape, causing it to get smaller, and forcing the background to fill up the parts of the shape extending outside the content area. You can see this technique in action in our irregular jigsaw piece navigation menu example.
