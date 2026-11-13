---
title: "SVG animation with SMIL"
tool: "mdn-svg"
version: "2026-11"
source: "https://github.com/mdn/content/blob/aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d/files/en-us/web/svg/guides/svg_animation_with_smil/index.md"
commit: "aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d"
license: "CC-BY-SA-2.5"
---

# SVG animation with SMIL

Synchronized Multimedia Integration Language (SMIL) is an XML-based language for writing interactive multimedia presentations.
Authors can use SMIL syntax in other XML-based languages to define the timing and layout of elements for animation.

SMIL allows you to:

- animate the numeric attributes of an element (x, y, etc.)
- animate transform attributes (translation, rotate, etc.)
- animate color attributes
- follow a motion path

The following sections show how to use SMIL in SVG for these four use cases.

## Animating attributes of an element

The following example animates the `cx` attribute of a circle. To do so, we add an `<animate>` element inside the `<circle>` element. The important attributes for `<animate>` are:

- `attributeName`
    The name of the attribute to animate.
- `from`
    The initial value of the attribute.
- `to`
    The final value.
- `dur`
    The duration of the animation (for example, write '5s' for 5 seconds).

If you want to animate more attributes inside the same element, you can add more `<animate>` elements.

```html
<svg width="300" height="100">
  <title>Attribute Animation with SMIL</title>
  <rect x="0" y="0" width="300" height="100" stroke="black" stroke-width="1" />
  <circle cx="0" cy="50" r="15" fill="blue" stroke="black" stroke-width="1">
    <animate
      attributeName="cx"
      from="0"
      to="500"
      dur="5s"
      repeatCount="indefinite" />
  </circle>
</svg>
```

## Animating the transform attributes

The `<animateTransform>` element let you animate transform attributes. This element is necessary because we are not animating a single attribute like x which is a number. Rotation attributes look like this: `rotate(theta, x, y)`, where `theta` is the angle in degrees, and `x` and `y` are absolute positions. In the example below, we animate the center of the rotation and the angle.

```html
<svg width="300" height="100">
  <title>SVG SMIL Animate with transform</title>
  <rect x="0" y="0" width="300" height="100" stroke="black" stroke-width="1" />
  <rect
    x="0"
    y="50"
    width="15"
    height="34"
    fill="blue"
    stroke="black"
    stroke-width="1">
    <animateTransform
      attributeName="transform"
      begin="0s"
      dur="20s"
      type="rotate"
      from="0 60 60"
      to="360 100 60"
      repeatCount="indefinite" />
  </rect>
</svg>
```

## Animation following a path

The `<animateMotion>` element lets you animate an element position and rotation according to a path. The path is defined the same way as in ``. You can set the attribute to define whether the object rotates following the tangent of the path.

### Example 1: Linear motion

In this example, a blue circle bounces between the left and right edges of a black box, over and over again, indefinitely. The animation here is handled by the `<animateMotion>` element. In this case, we're establishing a path consisting of a **MoveTo** command to define the starting point for the animation, then the **Horizontal-line** command to move the circle 300 pixels to the right, followed by the **Z command**, which closes the path, establishing a loop back to the beginning. By setting the value of the **repeatCount** attribute to `indefinite`, we indicate that the animation should loop forever, as long as the SVG image exists.

```html
<svg xmlns="http://www.w3.org/2000/svg" width="300" height="100">
  <title>SVG SMIL Animate with Path</title>
  <rect x="0" y="0" width="300" height="100" stroke="black" stroke-width="1" />
  <circle cx="0" cy="50" r="15" fill="blue" stroke="black" stroke-width="1">
    <animateMotion path="M 0 0 H 300 Z" dur="3s" repeatCount="indefinite" />
  </circle>
</svg>
```

View live sample

### Example 2: Curved motion

Same example as before with a curved path and following the direction of the path.

```html
<svg width="300" height="100">
  <title>SVG SMIL Animate with Path</title>
  <rect x="0" y="0" width="300" height="100" stroke="black" stroke-width="1" />
  <rect
    x="0"
    y="0"
    width="20"
    height="20"
    fill="blue"
    stroke="black"
    stroke-width="1">
    <animateMotion
      path="M 250,80 H 50 Q 30,80 30,50 Q 30,20 50,20 H 250 Q 280,20,280,50 Q 280,80,250,80Z"
      dur="3s"
      repeatCount="indefinite"
      rotate="auto" />
  </rect>
</svg>
```

## See also

- SVG
- SVG Animation Specification
- SMIL Specification
