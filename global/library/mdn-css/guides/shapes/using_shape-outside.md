---
title: "Basic shapes with shape-outside (part 1 of 2)"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/guides/shapes/using_shape-outside/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Basic shapes with shape-outside

CSS shapes can be defined using the `basic-shape` type. In this guide, we discuss creating rectangles, circles, ellipses, and polygons with the `shape-outside` property. These are features defined in the CSS shapes module.

Before looking at shapes, it is worth understanding two pieces of information that go together to make these shapes possible:

- The `<basic-shape>` type
- The reference box

## The \<basic-shape> type

The `basic-shape` type is used as the value for all of our basic shapes. This type is a functional notation: the function parentheses contain arguments used to describe the shape.

The accepted arguments vary depending on the shape you are creating. We will cover these in the examples below.

## The reference box

Understanding the reference box used by CSS shapes is important when using basic <example-value>, as it defines each shape's coordinate system. You have already met the reference box in the guide on creating shapes from box values, which directly uses the reference box to create the shape.

The screenshot below shows the Firefox Shapes Inspector displaying the reference box of a circle created using `shape-outside: circle(50%)`. The element has 20 pixels of padding, border, and margin applied. The Shapes Inspector highlights these reference boxes.

The default reference box for a basic shape is the `margin-box`. You can see in the screenshot that the shape is defined relative to that part of the Box Model.

While the default reference box is `margin-box`, this can be modified. To set a different box as the reference box, include the desired box value after your basic shape definition.

These two declarations are the same:

```css
shape-outside: circle(50%);
shape-outside: circle(50%) margin-box;
```

For your shape to use a different reference box, include a different `box-edge` value, for example, to use the border as a reference box for our circle, set:

```css
.shape {
  shape-outside: circle(50%) border-box;
}
```

Shapes created that extend past the margin box will have the shape clipped to the margin box. The following basic <example-value> demonstrate this.

## inset()

The `inset()` function defines a rectangle. This may not seem very useful as floating an item, without shapes, will give you a rectangular shape around it. However, the `inset()` type enables the definition of offsets, thus pulling the wrapping text around the reduced-size rectangle, over parts of the floated element.

The `inset()` function takes up to four side offset values, plus an optional `round` keyword, followed by a `border-radius` value. The below CSS creates a rectangular shape inset from the reference box of the floated element 20 pixels from the top and bottom and 10 pixels from the left and right, with a `border-radius` value of 10 pixels.

```css
.shape {
  float: left;
  shape-outside: inset(20px 10px 20px 10px round 10px);
}
```

The offset values use the same rules as the `margin` shorthand. Four space-separated values define the top, right, bottom, and left offsets — in that order. You can also set more than one offset at once:

- If there is only one value, it applies to all sides.
- If there are two values, the top and bottom offsets are set to the first value and the right and left offsets are set to the second.
- If there are three values, the top is set to the first value, the left and right are set to the second, and the bottom is set to the third.

The above rules can therefore also be written as:

```css
.shape {
  float: left;
  shape-outside: inset(20px 10px round 10px);
}
```

In the example below we have an `inset()` shape used to pull content over the floated element. Change the offset values to see how the shape changes.

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
  width: 150px;
  height: 100px;
  shape-outside: inset(20px 50px 10px 0 round 50px);
  background-color: rebeccapurple;
  border: 2px solid black;
  border-radius: 10px;
  margin: 20px;
  padding: 20px;
}
```

You can also add a box value as an alternative reference box. In the example below, try changing the reference box from `margin-box` to `border-box`, `padding-box`, or `content-box` to see how the reference box used as the starting point changes before offsets are calculated.

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
  width: 150px;
  height: 100px;
  shape-outside: inset(20px 50px 10px 0 round 50px) margin-box;
  background-color: rebeccapurple;
  border: 2px solid black;
  border-radius: 10px;
  margin: 20px;
  padding: 20px;
}
```

You can also create rectangles based on distances from the top and left edges of the reference box with the `rect()` function, or by width and height with the `xywh()` function; both of these also support optional rounded corners.

## circle()

The `circle()` value for `shape-outside` can accept two possible arguments: a `<shape-radius>` defining the size and the `<position>` defining its location.

The `circle()` and `ellipse()` `shape-outside` values both accept `<shape-radius>` as an argument. This can be a `length`, a `percentage`, or one of the keywords `closest-side` or `farthest-side`.

The `closest-side` keyword value uses the length from the center of the shape to the closest side of the reference box to create the radius length. The `farthest-side` keyword value uses the length from the center of the shape to the farthest side of the reference box.

The second argument is a `position`, which accepts a one- or two-keyword `<position>` value, to indicate the position of the center of the circle. This is specified the same way as `background-position`; if one or both values are omitted, the values default to `center`.

To create a circle, we include a single radius value, optionally followed by the keyword **at** followed by a position value. This example has a circle applied to an `` with a `width` and `height` of `210px` and a `margin` of `20px`. This gives a total width for the reference box of `250px`. The `50%` value for the `<shape-radius>` means the radius is `125px`. The position value is set to `30%`, which is `30%` from the left and at the default vertical `center`.

```html
<div class="box">
  <img
    alt="An orange hot air balloon as seen from below"
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
  font: 1.2em sans-serif;
}

img {
  float: left;
  shape-outside: circle(50% at 30%);
  margin: 20px;
}
```

Play with increasing or decreasing the size of the circle by changing the size of the radius, moving the circle around with the position value, or setting a reference box as we did for `inset()`.

The below example combines generated content with a `circle()` function that uses the keywords `top left` for position. This creates a quarter circle shape in the top left corner of the page for text to flow around.

```html
<div class="box">
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

.box::before {
  content: "";
  float: left;
  width: 250px;
  height: 250px;
  shape-outside: circle(50% at top left);
}
```

### The shape will be clipped by the margin box

As noted in reference boxes above, the `margin-box` will clip the shape. You can see this by moving the center of our circle towards the content by setting the position to `60%`. The center of the circle will be nearer to the content and the circle will extend past the margin-box. This means that the extension becomes clipped and squared off.

```css
img {
  float: left;
  shape-outside: circle(50% at 60%);
}
```

## ellipse()

An ellipse is a squashed circle. As such, the `ellipse()` function acts in a very similar way to `circle()` except that we have to specify two radii, `x` and `y`, in that order.

These may then be followed by one or two `<position>` values, as with `circle()`, to define the location of the center of the ellipse. In the example below, we have an ellipse with an `x` radius of `40%`, a `y` radius of `50%` and the `<position>` set to `left`. This means that the center of the ellipse is at the center of the left edge of the reference box. This creates a half ellipse shape around which the text will wrap. You can change these values to see how the ellipse changes.

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
  shape-outside: ellipse(40% 50% at left);
  margin: 20px;
  width: 100px;
  height: 200px;
}
```

The keyword values of `closest-side` and `farthest-side` are useful in creating a quick ellipse based on the size of the floated element reference box.

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
  shape-outside: ellipse(closest-side farthest-side at 30%);
  margin: 20px;
  width: 100px;
  height: 140px;
}
```
