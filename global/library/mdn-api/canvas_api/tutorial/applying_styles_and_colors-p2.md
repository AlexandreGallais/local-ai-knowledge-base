---
title: "Applying styles and colors (part 2 of 3)"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/canvas_api/tutorial/applying_styles_and_colors/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Applying styles and colors (part 2 of 3)

## Line styles

There are several properties which allow us to style lines.

- `lineWidth = value`
    Sets the width of lines drawn in the future.
- `lineCap = type`
    Sets the appearance of the ends of lines.
- `lineJoin = type`
    Sets the appearance of the "corners" where lines meet.
- `miterLimit = value`
    Establishes a limit on the miter when two lines join at a sharp angle, to let you control how thick the junction becomes.
- `getLineDash()`
    Returns the current line dash pattern array containing an even number of non-negative numbers.
- `setLineDash(segments)`
    Sets the current line dash pattern.
- `lineDashOffset = value`
    Specifies where to start a dash array on a line.

You'll get a better understanding of what these do by looking at the examples below.

### A `lineWidth` example

This property sets the current line thickness. Values must be positive numbers. By default this value is set to 1.0 units.

The line width is the thickness of the stroke centered on the given path. In other words, the area that's drawn extends to half the line width on either side of the path. Because canvas coordinates do not directly reference pixels, special care must be taken to obtain crisp horizontal and vertical lines.

In the example below, 10 straight lines are drawn with increasing line widths. The line on the far left is 1.0 units wide. However, the leftmost and all other odd-integer-width thickness lines do not appear crisp, because of the path's positioning.

```js
function draw() {
  const ctx = document.getElementById("my-canvas").getContext("2d");
  for (let i = 0; i < 10; i++) {
    ctx.lineWidth = 1 + i;
    ctx.beginPath();
    ctx.moveTo(5 + i * 14, 5);
    ctx.lineTo(5 + i * 14, 140);
    ctx.stroke();
  }
}
```

```html
<canvas id="my-canvas" width="150" height="150" role="presentation"></canvas>
```

```js
draw();
```

> **Note:**
> If you are wondering about the lines appearing gray near the edge instead of black, check the Seeing blurry edges? section in the previous chapter.

### A `lineCap` example

The `lineCap` property determines how the end points of every line are drawn. There are three possible values for this property and those are: `butt`, `round` and `square`. By default this property is set to `butt`:

- `butt`
    The ends of lines are squared off at the endpoints.
- `round`
    The ends of lines are rounded.
- `square`
    The ends of lines are squared off by adding a box with an equal width and half the height of the line's thickness.

Only start and final endpoints of a path are affected: if a path is closed with `closePath()`, there's no start and final endpoint; instead, all endpoints in the path are connected to their attached previous and next segment using the current setting of the `lineJoin` style.

In this example, we'll draw three lines, each with a different value for the `lineCap` property. I also added two guides to see the exact differences between the three. Each of these lines starts and ends exactly on these guides.

The line on the left uses the default `butt` option. You'll notice that it's drawn completely flush with the guides. The second is set to use the `round` option. This adds a semicircle to the end that has a radius half the width of the line. The line on the right uses the `square` option. This adds a box with an equal width and half the height of the line thickness.

```js
function draw() {
  const ctx = document.getElementById("my-canvas").getContext("2d");

  // Draw guides
  ctx.strokeStyle = "#0099ff";
  ctx.beginPath();
  ctx.moveTo(10, 10);
  ctx.lineTo(140, 10);
  ctx.moveTo(10, 140);
  ctx.lineTo(140, 140);
  ctx.stroke();

  // Draw lines
  ctx.strokeStyle = "black";
  ["butt", "round", "square"].forEach((lineCap, i) => {
    ctx.lineWidth = 15;
    ctx.lineCap = lineCap;
    ctx.beginPath();
    ctx.moveTo(25 + i * 50, 10);
    ctx.lineTo(25 + i * 50, 140);
    ctx.stroke();
  });
}
```

```html
<canvas id="my-canvas" width="150" height="150" role="presentation"></canvas>
```

```js
draw();
```

### A `lineJoin` example

The `lineJoin` property determines how two connecting segments (of lines, arcs or curves) with non-zero lengths in a shape are joined together (degenerate segments with zero lengths, whose specified endpoints and control points are exactly at the same position, are skipped).

There are three possible values for this property: `round`, `bevel` and `miter`. By default this property is set to `miter`. Note that the `lineJoin` setting has no effect if the two connected segments have the same direction, because no joining area will be added in this case:

- `round`
    Rounds off the corners of a shape by filling an additional sector of disc centered at the common endpoint of connected segments. The radius for these rounded corners is equal to half the line width.
- `bevel`
    Fills an additional triangular area between the common endpoint of connected segments, and the separate outside rectangular corners of each segment.
- `miter`
    Connected segments are joined by extending their outside edges to connect at a single point, with the effect of filling an additional lozenge-shaped area. This setting is affected by the `miterLimit` property which is explained below.

The example below draws three different paths, demonstrating each of these three `lineJoin` property settings; the output is shown above.

```js
function draw() {
  const ctx = document.getElementById("my-canvas").getContext("2d");
  ctx.lineWidth = 10;
  ["round", "bevel", "miter"].forEach((lineJoin, i) => {
    ctx.lineJoin = lineJoin;
    ctx.beginPath();
    ctx.moveTo(-5, 5 + i * 40);
    ctx.lineTo(35, 45 + i * 40);
    ctx.lineTo(75, 5 + i * 40);
    ctx.lineTo(115, 45 + i * 40);
    ctx.lineTo(155, 5 + i * 40);
    ctx.stroke();
  });
}
```

```html
<canvas id="my-canvas" width="150" height="150" role="presentation"></canvas>
```

```js
draw();
```

### A demo of the `miterLimit` property

As you've seen in the previous example, when joining two lines with the `miter` option, the outside edges of the two joining lines are extended up to the point where they meet. For lines which are at large angles with each other, this point is not far from the inside connection point. However, as the angles between each line decrease, the distance (miter length) between these points increases exponentially.

The `miterLimit` property determines how far the outside connection point can be placed from the inside connection point. If two lines exceed this value, a bevel join gets drawn instead. Note that the maximum miter length is the product of the line width measured in the current coordinate system, by the value of this `miterLimit` property (whose default value is 10.0 in the HTML `<canvas>`), so the `miterLimit` can be set independently from the current display scale or any affine transforms of paths: it only influences the effectively rendered shape of line edges.

More exactly, the miter limit is the maximum allowed ratio of the extension length (in the HTML canvas, it is measured between the outside corner of the joined edges of the line and the common endpoint of connecting segments specified in the path) to half the line width. It can equivalently be defined as the maximum allowed ratio of the distance between the inside and outside points of junction of edges, to the total line width. It is then equal to the cosecant of half the minimum inner angle of connecting segments below which no miter join will be rendered, but only a bevel join:

- `miterLimit` = **max** `miterLength` / `lineWidth` = 1 / **sin** ( **min** _θ_ / 2 )
- The default miter limit of 10.0 will strip all miters for sharp angles below about 11 degrees.
- A miter limit equal to √2 ≈ 1.4142136 (rounded up) will strip miters for all acute angles, keeping miter joins only for obtuse or right angles.
- A miter limit equal to 1.0 is valid but will disable all miters.
- Values below 1.0 are invalid for the miter limit.

Here's a little demo in which you can set `miterLimit` dynamically and see how this affects the shapes on the canvas. The blue lines show where the start and endpoints for each of the lines in the zig-zag pattern are.

If you specify a `miterLimit` value below 4.2 in this demo, none of the visible corners will join with a miter extension, but only with a small bevel near the blue lines; with a `miterLimit` above 10, most corners in this demo should join with a miter far away from the blue lines, and whose height is decreasing between corners from left to right because they connect with growing angles; with intermediate values, the corners on the left side will only join with a bevel near the blue lines, and the corners on the right side with a miter extension (also with a decreasing height).

```js
function draw() {
  const ctx = document.getElementById("my-canvas").getContext("2d");

  // Clear canvas
  ctx.clearRect(0, 0, 150, 150);

  // Draw guides
  ctx.strokeStyle = "#0099ff";
  ctx.lineWidth = 2;
  ctx.strokeRect(-5, 50, 160, 50);

  // Set line styles
  ctx.strokeStyle = "black";
  ctx.lineWidth = 10;

  // check input
  if (document.getElementById("miterLimit").checkValidity()) {
    ctx.miterLimit = parseFloat(document.getElementById("miterLimit").value);
  }

  // Draw lines
  ctx.beginPath();
  ctx.moveTo(0, 100);
  for (let i = 0; i < 24; i++) {
    const dy = i % 2 === 0 ? 25 : -25;
    ctx.lineTo(i ** 1.5 * 2, 75 + dy);
  }
  ctx.stroke();
  return false;
}
```

```html
<canvas id="my-canvas" width="150" height="150" role="presentation"></canvas>
<div>
  Change the <code>miterLimit</code> by entering a new value below and clicking
  the redraw button.<br /><br />
  <label for="miterLimit">Miter limit</label>
  <input type="number" id="miterLimit" min="1" />
  <button id="redraw">Redraw</button>
</div>
```

```css
body {
  display: flex;
}
```

```js
document.getElementById("miterLimit").value = document
  .getElementById("my-canvas")
  .getContext("2d").miterLimit;
draw();

const redraw = document.getElementById("redraw");
redraw.addEventListener("click", draw);
```

### Using line dashes

The `setLineDash` method and the `lineDashOffset` property specify the dash pattern for lines. The `setLineDash` method accepts a list of numbers that specifies distances to alternately draw a line and a gap and the `lineDashOffset` property sets an offset where to start the pattern.

In this example we are creating a marching ants effect. It is an animation technique often found in selection tools of computer graphics programs. It helps the user to distinguish the selection border from the image background by animating the border. In a later part of this tutorial, you can learn how to do this and other basic animations.

```html
<canvas id="my-canvas" width="111" height="111" role="presentation"></canvas>
```

```js
const canvas = document.getElementById("my-canvas");
const ctx = canvas.getContext("2d");
let offset = 0;

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.setLineDash([4, 2]);
  ctx.lineDashOffset = -offset;
  ctx.strokeRect(10, 10, 100, 100);
}

function march() {
  offset++;
  if (offset > 5) {
    offset = 0;
  }
  draw();
  setTimeout(march, 20);
}

march();
```
