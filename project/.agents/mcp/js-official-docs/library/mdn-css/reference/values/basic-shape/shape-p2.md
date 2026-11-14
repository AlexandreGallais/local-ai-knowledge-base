---
title: "`shape()` CSS function (part 2 of 2)"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/values/basic-shape/shape/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `shape()` CSS function (part 2 of 2)

## Examples

### Using `shape()` to define a path

This example demonstrates how the `shape()` function can be used in the `offset-path` property to define the shape of the path an element can follow.

The first shape, `shape1`, follows a cubic Bézier curved path defined by the `curve to` command. Next, the `close` command draws a straight line from the curve's end point back to the initial point defined in the `from` command. Finally, `shape1` moves to its new position at `0px 150px` and then proceeds along a horizontal line.

The second shape, `shape2`, initially follows a horizontal line, then moves back to its starting position at `50px 90px`. Next, it follows a vertical line before closing the path back to the initial point.

Both shapes start with their original colors and gradually transition to `hotpink` by the end of the `move` animation, reverting to their initial color as the animation restarts. This cyclic color change provides you a visual cue about the animation's progression and restart.

```html
<div class="container">
  Using <code>&lt;curve-command&gt;</code>
  <div class="shape shape1">>></div>
</div>

<div class="container">
  Using <code>&lt;move-command&gt;</code> and
  <code>&lt;hvline-command&gt;</code>
  <div class="shape shape2">>></div>
</div>
```

```css
body {
  align-items: center;
  justify-content: center;
  display: flex;
}

.container {
  position: relative;
  display: inline-block;
  width: 250px;
  height: 250px;
  border: 2px dotted green;
  margin: 20px;
}

@supports not (offset-path: shape(from 0 0, move to 0 0)) {
  body::after {
    content: "Your browser doesn't support the `shape()` function yet.";
    background-color: wheat;
    display: block;
    text-align: center;
    padding: 1rem 0;
  }
}
```

```css
.shape {
  width: 50px;
  height: 50px;
  background: #2bc4a2;
  position: absolute;
  text-align: center;
  line-height: 50px;
  animation: move 6s infinite linear;
}

.shape1 {
  offset-path: shape(
    from 30% 60px,
    curve to 180px 180px with 90px 190px,
    close,
    move by 0px 150px,
    hline by 40%
  );
}

.shape2 {
  offset-path: shape(
    from 50px 90px,
    hline to 8em,
    move to 50px 90px,
    vline by 20%,
    close
  );
}

@keyframes move {
  0% {
    offset-distance: 0%;
  }
  100% {
    offset-distance: 100%;
    background-color: hotpink;
  }
}
```

#### Result

### Using `shape()` to define the visible part of an element

This example demonstrates how the `shape()` function can be used in the `clip-path` property to create different shapes for the clipping region. The first shape (`shape1`) uses a triangle defined by straight lines. The second shape (`shape2`) includes curves and smooth transitions; it also illustrates the use of the `<move-command>` after the `close` command, which adds a rectangular shape to the clipping region.

```html
<div class="container">
  <div class="shape shape1"></div>
</div>

<div class="container">
  <div class="shape shape2"></div>
</div>
```

```css
body {
  align-items: center;
  justify-content: center;
  display: flex;
}

.container {
  position: relative;
  display: inline-block;
  width: 200px;
  height: 200px;
  margin: 20px;
  background-color: lightgray;
}

@supports not (clip-path: shape(from 0 0, move to 0 0)) {
  body::after {
    content: "Your browser doesn't support the `shape()` function yet.";
    background-color: wheat;
    display: block;
    text-align: center;
    padding: 1rem 0;
  }
}
```

```css
.shape {
  width: 100%;
  height: 100%;
  background: #2bc4a2;
  position: absolute;
  text-align: center;
  line-height: 50px;
}

/* Triangular clipping region */
.shape1 {
  clip-path: shape(from 0% 0%, line to 100% 0%, line to 50% 100%, close);
}

/* A Heart clipping region using curve and arc transitions
   and a box using hline and vline transitions */
.shape2 {
  clip-path: shape(
    from 20px 70px,
    arc to 100px 70px of 1% cw,
    arc to 180px 70px of 1% cw,
    curve to 100px 190px with 180px 130px,
    curve to 20px 70px with 20px 130px,
    close,
    move to 150px 150px,
    hline by 40px,
    vline by 40px,
    hline by -40px,
    close
  );
}
```

#### Result

### Using `shape()` to draw curves with relative control points

Like previous examples, this example also uses `clip-path` to create different shapes for the clipping regions of the elements. The shapes are specified using a combination of `<curve-command>` and `<smooth-command>`, and the control points are specified using `<relative-control-point>` values.

The first shape (`shape1`) draws two cubic Bézier curves.

- The first curve starts from the center of the left edge of the box and is drawn to a point `200px` along the x-axis — the center of the box's right edge. It uses one control point relative to the start of the curve and one control point relative to the origin (top-left of the box).
- The second curve starts from the center right of the box and is drawn `-200px` along the x-axis — the center of the box's left edge. It uses one control point relative to the origin and one control point relative to the start of the curve.

```html
<div class="container">
  <div id="shape1"></div>
  <div id="shape2"></div>
  <div id="shape3"></div>
</div>
```

```css
.container {
  display: flex;
  justify-content: center;
  gap: 20px;
}

@supports not (
  clip-path: shape(
      from center left,
      curve by 200px 0 with 50% -50% from start / 50% 0 from origin,
      curve by -200px 0 with 50% 100% from origin / -50% 50% from start,
      close
    )
) {
  body::after {
    content: "Your browser doesn't support `shape()` relative control points.";
    background-color: wheat;
    display: block;
    text-align: center;
    padding: 1rem 0;
  }
}
```

```css
#shape1 {
  width: 200px;
  height: 200px;
  background: green;
  clip-path: shape(
    from center left,
    curve by 200px 0 with 50% -50% from start / 50% 0 from origin,
    curve by -200px 0 with 50% 100% from origin / -50% 50% from start,
    close
  );
}
```

The second shape (`shape2`) draws one quadratic Bézier curve and one cubic Bézier curve.

- The first curve starts from the center of the left edge of the box and is drawn to an absolute point `200px` from the origin along the x-axis and `100px` from the origin along the y-axis. It uses one control point relative to the start of the curve.
- The second curve starts from the previous curve's end point and is drawn to the center left of the box. It uses one control point relative to the start of the curve and one control point relative to the end.

```css
#shape2 {
  width: 200px;
  height: 200px;
  background: purple;
  clip-path: shape(
    from center left,
    curve to 200px 100px with 50% -80% from start,
    curve to center left with 0% 70% from start / 20% 0% from end,
    close
  );
}
```

The third shape (`shape3`) draws one quadratic Bézier curve and one cubic Bézier curve using a `smooth` command.

- The first curve starts from the center of the left edge of the box and is drawn to a point `200px` along the x-axis. It uses one control point relative to the start of the curve.
- The second curve starts from the previous curve's end point and is drawn to the center of the box. It uses one control point relative to the start of the curve (the last control point of the previous curve) and one control point relative to the origin.

```css
#shape3 {
  width: 200px;
  height: 200px;
  background: orangered;
  clip-path: shape(
    from center left,
    curve by 200px 0px with 50% -80% from start,
    smooth to center with 50% 100% from origin,
    close
  );
}
```

#### Result

## See also

- `border-shape`
- `clip-path`
- `offset-path`
- CSS shapes module
- Overview of shapes guide
- Basic <example-value> guide
