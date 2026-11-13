---
title: "Introduction to CSS clipping (part 1 of 2)"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/guides/masking/clipping/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Introduction to CSS clipping

CSS clipping enables you to define visible portions of an element while hiding other parts, effectively "clipping" its content within a specific shape or area. With clipping, elements aren't limited to being rendered as rectangles and can be designed in visually engaging ways. This guide explores the `clip-path` property along with some examples.

## CSS clipping

Clipping is a CSS technique used to clip (hide) sections of an element, displaying only the area of the element located within a developer-defined path. Clips areas are created by vector paths; anything in the path is visible while areas outside the path are hidden.

### The `clip-path` property

The `clip-path` property applies clipping. The value it accepts is a vector path defining the area of the element that should remain visible. The path can be defined using boxes, a reference to an SVG `<clipPath>`, or CSS shapes and paths. In the following example, we clip a blue square ``, creating a diamond, using the `polygon()` function as the clipping path:

```html
<div class="diamond"></div>
```

```css
.diamond {
  height: 200px;
  width: 200px;
  background-color: blue;

  clip-path: polygon(0 50%, 50% 100%, 100% 50%, 50% 0);
}
```

With the `clip-path` property, you can make complex shapes by clipping an element to a `<basic-shape>` or to an SVG source. You can animate and transition `clip-path` shapes if the declared states have the same number of vector points.

### Values of the `clip-path` property

To visually clip an element, the `clip-path` property is set to either a `<geometry-box>`, a `url` to a `<clipPath>` clip source, or a `basic-shape` created with shape function.

### Geometry boxes

The `clip-path` hides everything outside of the clipped region. The most basic <example-value> is done via a geometry box. You can clip an element based on its margin, border, padding, or content. The effects of these visual box values can be achieved via other CSS properties, such as setting the `border-color` to transparent and the `background-origin` to the desired visual box. We're looking at these values mostly because these values are used in conjunction with the shape functions, which we'll look at later, to define the origin of the shape clip path.

Understanding the reference box used by CSS shapes is important when using `clip-path`, especially with basic <example-value>, as the reference box defines a shape's coordinate system.

#### Visual box values

This live example demonstrates the `clip-path` property's different visual box values on an element, while comparing it to the CSS `background-origin` property. We've applied a `border`, a `background-color`, a `background-image`, and `padding` to the ``. Select a radio button to update the `--value` to a different `<geometry-box>` value, which updates the `background-origin` and the `clip-path` resolved values.

```css
body {
  display: flex;
  flex-flow: row wrap;
  place-content: center;
}
blockquote {
  float: left;
  font-size: 1.2rem;
}
q {
  color: white;
  font-family: sans-serif;
  display: block;
  margin-bottom: 0.5em;
}
p {
  margin: 0;
  line-height: 1.6;
}

body {
  --value: initial;
}
body:has([value="border-box"]:checked) {
  --value: border-box;
}
body:has([value="padding-box"]:checked) {
  --value: padding-box;
}
body:has([value="content-box"]:checked) {
  --value: content-box;
}
body:has([type="checkbox"]:checked) blockquote {
  border-radius: 70px;
}
```

```css
blockquote {
  width: 210px;
  padding: 20px;
  margin: 20px;
  border: 20px dashed #dedede;
  background-color: #ededed;
  background-image: linear-gradient(rebeccapurple, magenta);
  background-repeat: no-repeat;
}

.clippath {
  background-origin: var(--value);
  clip-path: var(--value);
}

.box-model {
  background-origin: var(--value);
}
```

```html
<blockquote class="clippath">
  <q
    >I've learned that people will forget what you said, people will forget what
    you did, but people will never forget how you made them feel.</q
  >
  <cite>&mdash; Maya Angelou</cite>
</blockquote>
<blockquote class="box-model">
  <q
    >I've learned that people will forget what you said, people will forget what
    you did, but people will never forget how you made them feel.</q
  >
  <cite>&mdash; Maya Angelou</cite>
</blockquote>

<fieldset>
  <legend>Select the geometry box value:</legend>
  <p>
    <label
      ><input type="radio" name="gb" value="border-box" /> border-box</label
    >
  </p>
  <p>
    <label
      ><input type="radio" name="gb" value="padding-box" /> padding-box</label
    >
  </p>
  <p>
    <label
      ><input type="radio" name="gb" value="content-box" /> content-box</label
    >
  </p>
  <p>
    <label
      ><input type="radio" name="gb" value="initial" checked /> initial</label
    >
  </p>
</fieldset>
<p>
  <label><input type="checkbox" /> Change the border radius</label>
</p>
```

When a `<geometry>` box is specified in combination with a `<basic-shape>`, the value defines the reference box for the basic shape. If specified by itself, it causes the edges of the specified box, including any corner shaping (such as a `border-radius`), to be the clipping path.

#### Shape origin

The previous example may make you think that the `<geometry-box>` values are useless, as you can use `background-origin` instead. And you can. But when clipping using basic <example-value>, the `<geometry-box>`, when included along with a `<basic-shape>` as the `clip-path` value, defines the reference box for, or origin of, that shape. We can combine the two previous examples to demonstrate this.

```html
<blockquote class="clippath">
  <q
    >I've learned that people will forget what you said, people will forget what
    you did, but people will never forget how you made them feel.</q
  >
  <cite>&mdash; Maya Angelou</cite>
</blockquote>
<fieldset>
  <legend>Select the origin of the clip path shape:</legend>
  <p>
    <label
      ><input type="radio" name="gb" value="border-box" checked />
      border-box</label
    >
  </p>
  <p>
    <label
      ><input type="radio" name="gb" value="padding-box" /> padding-box</label
    >
  </p>
  <p>
    <label
      ><input type="radio" name="gb" value="content-box" /> content-box</label
    >
  </p>
</fieldset>
```

```css
blockquote {
  width: 210px;
  padding: 20px;
  margin: 20px;
  border: 20px dashed #dedede;
  background-color: #ededed;
  background-image: linear-gradient(rebeccapurple, magenta);
  background-repeat: no-repeat;
  background-origin: border-box;
  clip-path: var(--value) polygon(0 50%, 50% 100%, 100% 50%, 50% 0);
}
```

```css
blockquote {
  font-size: 1.2rem;
}
q {
  color: white;
  font-family: sans-serif;
  display: block;
  margin-bottom: 0.5em;
}
p {
  margin: 0;
  line-height: 1.6;
}

body {
  --value: "";
}
body:has([value="border-box"]:checked) {
  --value: border-box;
}
body:has([value="padding-box"]:checked) {
  --value: padding-box;
}
body:has([value="content-box"]:checked) {
  --value: content-box;
}
```

For another example, see `clip-path` shapes and geometry boxes.

Even values like `clip-path: margin-box` can be useful. In addition to creative visuals made by placing the clip-path's edge at the margin-box edge, any computed value for `clip-path`, other than `none`, results in the creation of a new stacking context the same way that CSS `opacity` does for values other than `1`.

## Clipping to basic <example-value>

The `clip-path` property's support of `basic-shape` values provides a powerful way to shape elements. The various shape function enable defining precise clipping regions, effectively sculpting elements into unique forms. The basic shape functions, include:

- `circle()`
- `ellipse()`
- `inset()`
- `path()`
- `polygon()`
- `rect()`
- `shape()`
- `xywh()`

The size and position of these shapes are defined by the `<geometry-box>` value, which defaults to border-box being used as the reference box if the `clip-path` value includes a shape without the `<geometry-box>` component value.

Some of these functions appear to only provide basic <example-value> clipping options. They may appear to replicate effects you can create with `border-radius`, but if you toggled the `border-radius` property in the previous example, you may have noticed the power of CSS clipping. Shapes provide even more control. For example, `inset()` enables clipping a rectangle with precise margins. The real power and control comes with `path()`, `shape()`, and even `polygon()`, which allows for custom multi-point shapes.

### Creating polygons

With `polygon()`, by defining pairs of coordinates, each of which represents a vertex of the shape. you can create intricate forms like stars or abstract figures. The coordinates define vector points connected by straight lines.

Here we use the `polygon()` function to create a star:

```html
<div class="star"></div>
```

```css
.star {
  width: 200px;
  height: 200px;
  background: linear-gradient(rebeccapurple, magenta) blue;
  clip-path: polygon(
    50% 0%,
    61% 35%,
    100% 35%,
    68% 57%,
    79% 91%,
    50% 70%,
    21% 91%,
    32% 57%,
    0% 35%,
    39% 35%,
    50% 0%
  );
}
```

### Animation

Clipped shapes can be animated and transitioned by declaring the same number of vector points for the different states.

```html
<div class="star"></div>
```

```css
.star {
  width: 200px;
  height: 200px;
  background: linear-gradient(rebeccapurple, magenta) blue;
  clip-path: polygon(
    50% 0%,
    61% 35%,
    100% 35%,
    68% 57%,
    79% 91%,
    50% 70%,
    21% 91%,
    32% 57%,
    0% 35%,
    39% 35%,
    50% 0%
  );
}
```

```css
@keyframes morphStar {
  from {
    clip-path: polygon(
      50% 0%,
      61% 35%,
      100% 35%,
      68% 57%,
      79% 91%,
      50% 70%,
      21% 91%,
      32% 57%,
      0% 35%,
      39% 35%,
      50% 0%
    );
  }
  to {
    clip-path: polygon(
      50% 10%,
      65% 30%,
      90% 20%,
      75% 60%,
      85% 95%,
      50% 80%,
      15% 95%,
      25% 60%,
      10% 20%,
      35% 30%,
      50% 10%
    );
  }
}

.star {
  animation: morphStar alternate 3s infinite ease-in-out;
}
```

### The `path()` function

The `path()` function enables drawing shapes using SVG commands. The function accepts the equivalent of the SVG `d` attribute as the function's parameter.

The star from the previous example can be created using `path()`:

```html
<div class="star"></div>
```

```css
.star {
  width: 200px;
  height: 200px;
  background: linear-gradient(rebeccapurple, magenta) blue;
  clip-path: path(
    "M100,0 L122,70 L200,70 L136,114 L158,182 L100,140 L42,182 L64,114 L0,70 L78,70 L100,0 Z"
  );
}
```

### Curved lines

With `path()`, we are not limited to straight lines. In this example, we use the `path()` function to create a heart:

```html
<div class="heart"></div>
```

```css
.heart {
  width: 200px;
  height: 200px;
  background: linear-gradient(rebeccapurple, magenta) blue;
  clip-path: path(
    "M20,70 A40,40,0,0,1,100,70 A40,40,0,0,1,180,70 Q180,130,100,190 Q20,130,20,70 Z"
  );
}
```

### SVG as source

Instead of passing an SVG `d` attribute string as the `path()` function argument, the value of the `clip-path` property can reference the SVG `<clipPath>` element directly.

```html
<div class="heart"></div>
<svg height="0" width="0">
  <clipPath id="heart">
    <path
      d="M20,70 A40,40,0,0,1,100,70 A40,40,0,0,1,180,70 Q180,130,100,190 Q20,130,20,70 Z" />
  </clipPath>
</svg>
```

The `id` of the `<clipPath>` is the parameter of the `url()` function.

```css
.heart {
  width: 200px;
  height: 200px;
  background: linear-gradient(rebeccapurple, magenta) blue;
  clip-path: url("#heart");
}
```

### Shape function

The SVG path syntax is not the most intuitive. For this reason, CSS also offers a `shape()` function. The `shape()` function also takes path drawing directive, but with a syntax that is more human readable. We can recreate the heart with more declarative CSS:

```css
.heart {
  clip-path: shape(
    from 20px 70px,
    arc to 100px 70px of 1% cw,
    arc to 180px 70px of 1% cw,
    curve to 100px 190px with 180px 130px,
    curve to 20px 70px with 20px 130px
  );
}
```

The `shape()` function is more robust in that it accepts CSS values and units (`path()` is limited to coordinates), including using CSS math functions like `calc()`. By using variables, we can create shapes (and boxes) of many different sizes:

```css
:root {
  --m: 10;
}
.heart {
  width: calc(20px * var(--m));
  height: calc(20px * var(--m));
  display: inline-block;
  background: linear-gradient(rebeccapurple, magenta) blue;
  clip-path: border-box
    shape(
      from calc(2px * var(--m)) calc(7px * var(--m)),
      arc to calc(10px * var(--m)) calc(7px * var(--m)) of 1% cw,
      arc to calc(18px * var(--m)) calc(7px * var(--m)) of 1% cw,
      curve to calc(10px * var(--m)) calc(19px * var(--m)) with
        calc(18px * var(--m)) calc(13px * var(--m)),
      curve to calc(2px * var(--m)) calc(7px * var(--m)) with
        calc(2px * var(--m)) calc(13px * var(--m))
    );
}
.small {
  --m: 4;
}

.medium {
  --m: 8;
}

.large {
  --m: 12;
}
```

```html
<div class="heart small"></div>
<div class="heart medium"></div>
<div class="heart large"></div>
```

### Wrapping text around your clipped shapes

Clipped elements are still rectangular boxed. Clipping means your element doesn't look like a box; but it is still a box. To wrap inline content around the non-rectangular (or rectangular) shapes you define, use the `shape-outside` property. By default, inline content wraps around its margin box; `shape-outside` provides a way to customize this wrapping, making it possible to wrap text around the elements you've clipped, following the clip path you replicated rather than the element's rectangular box.

The content includes two elements to be clipped and the content that will be shaped around them.

```html
<div class="leftTriangle"></div>
<div class="rightTriangle"></div>
<blockquote>
  <q>
    I've learned that people will forget what you said, people will forget what
    you did, but people will never forget how you made them feel.</q
  >
  <cite>&mdash; Maya Angelou</cite>
</blockquote>
```

```css
:root {
  --m: 10;
  font-size: calc(3px * var(--m));
}
div {
  width: calc(0.75em * var(--m));
  height: calc(0.75em * var(--m));
  display: inline-block;
  background: linear-gradient(rebeccapurple, magenta) blue;
}
cite {
  display: block;
  text-align: right;
}
```

In addition to applying the same shape for both the `clip-shape` and `shape-outside` properties, the clipped element has to be floated so that the clipped element is on the same line as the content.

```css
.leftTriangle {
  clip-path: polygon(0 0, 0 100%, 100% 0);
  shape-outside: polygon(0 0, 0 100%, 100% 0);
  float: left;
}
.rightTriangle {
  clip-path: polygon(100% 0, 100% 100%, 0 100%);
  shape-outside: polygon(100% 0, 100% 100%, 0 100%);
  float: right;
}
```
