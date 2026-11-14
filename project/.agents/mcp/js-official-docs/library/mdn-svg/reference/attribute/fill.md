---
title: "fill"
tool: "mdn-svg"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/svg/reference/attribute/fill/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# fill

The **`fill`** attribute has two different meanings. For shapes and text it's a presentation attribute that defines the color (_or any SVG paint servers like gradients or patterns_) used to paint the element; for animation it defines the final state of the animation.

> **Note:**
> When used as a presentation attribute, `fill` also has a CSS property counterpart: `fill`. When both are specified, the CSS property takes priority.

The SVG presentational `fill` attribute and the CSS `fill` property can be used with the following SVG elements:

- `<circle>`
- `<ellipse>`
- ``
- `<polygon>`
- `<polyline>`
- `<rect>`
- `<text>`
- `<textPath>`
- `<tspan>`

The SVG `fill` attribute can be used to define the final animation state with the following SVG elements:

- `<animate>`
- `<animateMotion>`
- `<animateTransform>`
- `<set>`.

## animate

For `<animate>`, `fill` defines the final state of the animation.

       | Value
       |
        `freeze` (Keep the state of the last animation frame) | `remove` (Keep the state of the first animation frame)

       | Default value
       | `remove`

       | Animatable
       | No

## animateMotion

For `<animateMotion>`, `fill` defines the final state of the animation.

       | Value
       |
        `freeze` (Keep the state of the last animation frame) | `remove` (Keep the state of the first animation frame)

       | Default value
       | `remove`

       | Animatable
       | No

## animateTransform

For `<animateTransform>`, `fill` defines the final state of the animation.

       | Value
       |
        `freeze` (Keep the state of the last animation frame) | `remove` (Keep the state of the first animation frame)

       | Default value
       | `remove`

       | Animatable
       | No

## circle

For `<circle>`, `fill` is a presentation attribute that defines the color of the circle.

       | Value
       |
        &#x3C;paint>

       | Default value
       | `black`

       | Animatable
       | Yes

## ellipse

For `<ellipse>`, `fill` is a presentation attribute that defines the color of the ellipse.

       | Value
       |
        &#x3C;paint>

       | Default value
       | `black`

       | Animatable
       | Yes

## path

For ``, `fill` is a presentation attribute that defines the color of the interior of the shape. (_The interior is defined by the `fill-rule` attribute or `fill-rule` property._)

       | Value
       |
        &#x3C;paint>

       | Default value
       | `black`

       | Animatable
       | Yes

## polygon

For `<polygon>`, `fill` is a presentation attribute that defines the color of the interior of the shape. (_The interior is defined by the `fill-rule` attribute or `fill-rule` property._)

       | Value
       |
        &#x3C;paint>

       | Default value
       | `black`

       | Animatable
       | Yes

## polyline

For `<polyline>`, `fill` is a presentation attribute that defines the color of the interior of the shape. (_The interior is defined by the `fill-rule` attribute or `fill-rule` property._)

       | Value
       |
        &#x3C;paint>

       | Default value
       | `black`

       | Animatable
       | Yes

## rect

For `<rect>`, `fill` is a presentation attribute that defines the color of the rectangle.

       | Value
       |
        &#x3C;paint>

       | Default value
       | `black`

       | Animatable
       | Yes

## set

For `<set>`, `fill` defines the final state of the animation.

       | Value
       |
        `freeze` (Keep the state of the last animation frame) | `remove` (Keep the state of the first animation frame)

       | Default value
       | `remove`

       | Animatable
       | No

## text

For `<text>`, `fill` is a presentation attribute that defines the color of the text.

       | Value
       |
        &#x3C;paint>

       | Default value
       | `black`

       | Animatable
       | Yes

## textPath

For `<textPath>`, `fill` is a presentation attribute that defines the color of the text.

       | Value
       |
        &#x3C;paint>

       | Default value
       | `black`

       | Animatable
       | Yes

## tspan

For `<tspan>`, `fill` is a presentation attribute that defines the color of the text.

       | Value
       |
        &#x3C;paint>

       | Default value
       | `black`

       | Animatable
       | Yes

## Examples

### Basic color and gradient fills, and animation

```css
html,
body,
svg {
  height: 100%;
}
```

```html
<svg viewBox="0 0 300 100" xmlns="http://www.w3.org/2000/svg">
  <!-- Basic color fill -->
  <circle cx="50" cy="50" r="40" fill="pink" />

  <!-- Fill circle with a gradient -->
  <defs>
    <radialGradient id="myGradient">
      <stop offset="0%" stop-color="pink" />
      <stop offset="100%" stop-color="black" />
    </radialGradient>
  </defs>

  <circle cx="150" cy="50" r="40" fill="url(#myGradient)" />

  <!--
  Keeping the final state of an animated circle
  which is a circle with a radius of 40.
  -->
  <circle cx="250" cy="50" r="20">
    <animate
      attributeType="XML"
      attributeName="r"
      from="0"
      to="40"
      dur="5s"
      fill="freeze" />
  </circle>
</svg>
```

### `context-fill` example

In this example, we define three shapes using `` elements, each with a different `stroke` and `fill` color set on them. We also define a `<circle>` element as a marker via the `<marker>` element. Each shape has the marker applied via the `marker` CSS property.

The `<circle>` has `stroke="context-stroke"` and `fill="context-fill"` set on it. Because it is being set as a marker in the context of the shapes, these attributes cause it to inherit the `fill` and `stroke` set on the `` element in each case.

```html
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 90">
  <style>
    path {
      stroke-width: 2px;
      marker: url("#circle");
    }
  </style>
  <path d="M 10 44.64 L 30 10 L 70 10 L 90 44.64 L 70 79.28 L 30 79.28 Z"
        stroke="red" fill="orange" />
  <path d="M 100 44.64 L 80 10 L 120 10 L 140 44.64 L 120 79.28 L 80 79.28 Z"
        stroke="green" fill="lightgreen" />
  <path d="M 150 44.64 L 130 10 L 170 10 L 190 44.64 L 170 79.28 L 130 79.28 Z"
        stroke="blue" fill="lightblue" />
  <marker id="circle" markerWidth="12" markerHeight="12"
          refX="6" refY="6" markerUnits="userSpaceOnUse">
    <circle cx="6" cy="6" r="3" stroke-width="2"
            stroke="context-stroke" fill="context-fill"  />
  </marker>
</svg>
```

The output is as follows:

> **Note:**
> Elements can also use `context-stroke` and `context-fill` to inherit `stroke` and `fill` values when they are referenced by `<use>` elements.

## See also

- CSS `fill` property
