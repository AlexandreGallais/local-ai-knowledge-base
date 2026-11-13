---
title: "`polygon()` CSS function"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/values/basic-shape/polygon/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `polygon()` CSS function

The **`polygon()`** CSS function is one of the `basic-shape` data types. It's used to draw a polygon by providing one or more pairs of coordinates, each of which represents a vertex of the shape.

```css
clip-path: polygon(
  0% 20%,
  60% 20%,
  60% 0%,
  100% 50%,
  60% 100%,
  60% 80%,
  0% 80%
);
```

```css
clip-path: polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%);
```

```html
<section class="default-example" id="default-example">
  <div class="transition-all" id="example-element"></div>
</section>
```

```css
#default-example {
  background: #ffee99;
}

#example-element {
  background: linear-gradient(to bottom right, #ff5522, #0055ff);
  width: 100%;
  height: 100%;
}
```

## Syntax

```css
/* Coordinate list */
polygon(50% 2.4%, 34.5% 33.8%, 0% 38.8%, 25% 63.1%, 19.1% 97.6%)
polygon(0px 0px, 200px 100px, 0px 200px)
polygon(0% 0px, 100% 100px, 0px 100%)
polygon(0 0, 50% 1rem, 100% 2vw, calc(100% - 20px) 100%, 0 100%)

/* Coordinate list with fill-rule and/or round value */
polygon(nonzero, 0% 0%, 50% 50%, 0% 100%)
polygon(round 20px, 0% 0%, 50% 50%, 0% 100%)
polygon(evenodd round 2em, 0% 0%, 50% 50%, 0% 100%)
```

### Parameters

The `polygon()` function accepts an optional first parameter containing values that modify the polygon's appearance — a `fill-rule` keyword, the `round` keyword followed by a `length` value, or both. The first parameter's components are separated by spaces. The other parameters are space-separated x/y coordinate pairs of `length-percentage` values.

- `<fill-rule>` (optional)
    A keyword equal to `nonzero` (the default) or `evenodd`, which specifies the algorithm used to fill the polygon shape.
- `round <length>` (optional)
    The `round` keyword specifies that the polygon should have rounded corners, and the accompanying `length` value specifies the radius of those corners.
- `length-percentage`
    Each vertex, or point, of the polygon is represented by a space-separated pair of `<length-percentage>` values defining the x/y coordinates of the vertex relative to the shape's reference box.

### Return value

A `basic-shape` value.

## Description

You can create almost any shape with the `polygon()` function by specifying the x/y coordinates of its vertices, or points, as comma-separated pairs of `length-percentage` values:

<code>polygon(x1 y1, x2 y2, x3 y3, x4 y4, xn yn)</code>

Although only a single point is required to create a valid `polygon()` function value, at least 3 points are required to create a shape (a triangle). There is no upper limit on the number of points that can be specified. The shape is drawn through the specified points in the order they appear in the function, with a final line automatically being drawn between the last and first points to close the shape.

We could define the coordinates of a triangle shape like this:

| axis | point 1 | point 2 | point 3 |
| ---- | ------- | ------- | ------- |
| x    | 0%      | 100%    | 100%    |
| y    | 0%      | 0%      | 100%    |

We can apply those coordinates to the CSS `clip-path` property in a `polygon()` function as follows:

```css
clip-path: polygon(0% 0%, 100% 0%, 100% 100%);
```

This creates a triangle shape that covers half the area of its parent container by specifying the coordinates of three of its four corners: top-left (`0% 0%`), top-right (`100% 0%`), and bottom-right (`100% 100%`). If we assume a 200x200px container with a green background:

```html
<div class="box"></div>
```

```css
.box {
  width: 200px;
  height: 200px;
  background-color: green;
  clip-path: polygon(0% 0%, 100% 0%, 100% 100%);
}
```

### The effect of point order

The order in which you define the points can result in different shapes. For example, the following two `clip-path` declarations both use a `polygon()` function with X/Y coordinate pairs for the container's four corners, but in a different order.

```css
clip-path: polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%);
clip-path: polygon(0% 0%, 100% 0%, 0% 100%, 100% 100%);
```

```html
<div class="box"></div>
<div class="box box2"></div>
```

```css
body {
  display: flex;
  gap: 20px;
}

.box {
  width: 200px;
  height: 200px;
  background-color: purple;
  clip-path: polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%);
}

.box2 {
  clip-path: polygon(0% 0%, 100% 0%, 0% 100%, 100% 100%);
}
```

The first function draws a square, while the second draws an hourglass shape.

### Specifying polygon modifiers

The `polygon()` function accepts an optional first parameter modifying the rendering of the resulting shape. The parameter value can include either or both of the following, separated by spaces:

- A `<fill-rule>` keyword equal to `nonzero` (the default) or `evenodd`, which specifies the algorithm used to fill the polygon shape. This only has an effect when the lines drawn between coordinate values overlap.
- The `round` keyword followed by a `length` value. This specifies that the polygon should have rounded corners, with the `<length>` value specifying the radius of those corners.

For example, we could expand upon the previous triangle example and add rounded corners:

```css
clip-path: polygon(round 20px, 0% 0%, 100% 0%, 100% 100%);
```

```html
<div class="box"></div>
```

```css
.box {
  width: 200px;
  height: 200px;
  background-color: green;
  clip-path: polygon(round 20px, 0% 0%, 100% 0%, 100% 100%);
}
```

This results in the same triangle shape, but with `20px` radius rounded corners:

> **Note:**
> In each case, the corner radius is clamped to ensure it is never larger than half of any line segment length. The maximum corner radius is clamped to the smaller of `tan(corner-angle/2) * (segment-length / 2)` evaluated against both line segments forming the corner. The specification contains further details for those interested.

## Examples

### Create a triangle

In this example, a triangle is formed by defining the coordinates of its three points.

#### HTML

```html
<div class="triangle"></div>
```

#### CSS

```css
.triangle {
  width: 400px;
  height: 400px;
  background-color: magenta;
  clip-path: polygon(100% 0%, 50% 50%, 100% 100%);
}
```

#### Result

The coordinates for the triangle are the top-right corner (`100% 0%`), the center point (`50% 50%`), and the bottom-right corner (`100% 100%`) of the container.

### Create a rounded star

In this example, we create a star shape and use the `round` keyword to round its corners.

#### HTML

```html
<div class="star"></div>
```

#### CSS

```css
.star {
  width: 400px;
  height: 400px;
  background-color: hotpink;
  clip-path: polygon(
    round 20px,
    50% 5%,
    60.85% 27.48%,
    85.22% 21.99%,
    74.38% 44.44%,
    93.88% 60.01%,
    69.57% 65.56%,
    69.53% 90.55%,
    50% 75%,
    30.47% 90.55%,
    30.43% 65.56%,
    6.12% 60.01%,
    25.62% 44.44%,
    14.78% 21.99%,
    39.15% 27.48%
  );
}
```

```css
@supports not (clip-path: polygon(round 20px, 0% 0%, 100% 0%, 100% 100%)) {
  body::before {
    font-family: sans-serif;
    content: "Your browser does not support the polygon() function's round keyword.";
    background-color: wheat;
    padding: 1rem 0;
    text-align: center;

    z-index: 1;
    position: fixed;
    inset: 40% 0 auto;
  }
}
```

#### Result

### Setting a polygon for shape-outside

In this example a shape is created for text to follow using the `shape-outside` property.

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
.box {
  width: 250px;
}

.shape {
  float: left;
  shape-outside: polygon(
    0 5%,
    15% 12%,
    30% 15%,
    40% 26%,
    45% 35%,
    45% 45%,
    40% 55%,
    10% 90%,
    10% 98%,
    8% 100%,
    0 100%
  );
  width: 300px;
  height: 320px;
}

p {
  font-size: 0.9rem;
}
```

## See also

- Properties that use this data type: `border-shape`, `clip-path`, `shape-outside`
- Guide to Basic <example-value>
