---
title: "Drawing shapes with canvas (part 3 of 3)"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/canvas_api/tutorial/drawing_shapes/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Drawing shapes with canvas (part 3 of 3)

### Making combinations

So far, each example on this page has used only one type of path function per shape. However, there's no limitation to the number or types of paths you can use to create a shape. So in this final example, let's combine all of the path functions to make a set of very famous game characters.

```html
<canvas id="my-canvas" width="200" height="185"></canvas>
```

```js
function draw() {
  const canvas = document.getElementById("my-canvas");
  const ctx = canvas.getContext("2d");

  roundedRect(ctx, 12, 12, 184, 168, 15);
  roundedRect(ctx, 19, 19, 170, 154, 9);
  roundedRect(ctx, 53, 53, 49, 33, 10);
  roundedRect(ctx, 53, 119, 49, 16, 6);
  roundedRect(ctx, 135, 53, 49, 33, 10);
  roundedRect(ctx, 135, 119, 25, 49, 10);

  ctx.beginPath();
  ctx.arc(37, 37, 13, Math.PI / 7, -Math.PI / 7, false);
  ctx.lineTo(31, 37);
  ctx.fill();

  for (let i = 0; i < 8; i++) {
    ctx.fillRect(51 + i * 16, 35, 4, 4);
  }

  for (let i = 0; i < 6; i++) {
    ctx.fillRect(115, 51 + i * 16, 4, 4);
  }

  for (let i = 0; i < 8; i++) {
    ctx.fillRect(51 + i * 16, 99, 4, 4);
  }

  ctx.beginPath();
  ctx.moveTo(83, 116);
  ctx.lineTo(83, 102);
  ctx.bezierCurveTo(83, 94, 89, 88, 97, 88);
  ctx.bezierCurveTo(105, 88, 111, 94, 111, 102);
  ctx.lineTo(111, 116);
  ctx.lineTo(106.333, 111.333);
  ctx.lineTo(101.666, 116);
  ctx.lineTo(97, 111.333);
  ctx.lineTo(92.333, 116);
  ctx.lineTo(87.666, 111.333);
  ctx.lineTo(83, 116);
  ctx.fill();

  ctx.fillStyle = "white";
  ctx.beginPath();
  ctx.moveTo(91, 96);
  ctx.bezierCurveTo(88, 96, 87, 99, 87, 101);
  ctx.bezierCurveTo(87, 103, 88, 106, 91, 106);
  ctx.bezierCurveTo(94, 106, 95, 103, 95, 101);
  ctx.bezierCurveTo(95, 99, 94, 96, 91, 96);
  ctx.moveTo(103, 96);
  ctx.bezierCurveTo(100, 96, 99, 99, 99, 101);
  ctx.bezierCurveTo(99, 103, 100, 106, 103, 106);
  ctx.bezierCurveTo(106, 106, 107, 103, 107, 101);
  ctx.bezierCurveTo(107, 99, 106, 96, 103, 96);
  ctx.fill();

  ctx.fillStyle = "black";
  ctx.beginPath();
  ctx.arc(101, 102, 2, 0, Math.PI * 2, true);
  ctx.fill();

  ctx.beginPath();
  ctx.arc(89, 102, 2, 0, Math.PI * 2, true);
  ctx.fill();
}

// A utility function to draw a rectangle with rounded corners.

function roundedRect(ctx, x, y, width, height, radius) {
  ctx.beginPath();
  ctx.moveTo(x, y + radius);
  ctx.arcTo(x, y + height, x + radius, y + height, radius);
  ctx.arcTo(x + width, y + height, x + width, y + height - radius, radius);
  ctx.arcTo(x + width, y, x + width - radius, y, radius);
  ctx.arcTo(x, y, x, y + radius, radius);
  ctx.stroke();
}
```

```js
draw();
```

The resulting image looks like this:

We won't go over this in detail, since it's actually surprisingly simple. The most important things to note are the use of the `fillStyle` property on the drawing context, and the use of a utility function (in this case `roundedRect()`). Using utility functions for bits of drawing you do often can be very helpful and reduce the amount of code you need, as well as its complexity.

We'll take another look at `fillStyle`, in more detail, later in this tutorial. Here, all we're doing is using it to change the fill color for paths from the default color of black to white, and then back again.

### Shapes with holes

To draw a shape with a hole in it, we need to draw the hole in different clock directions as we draw the outer shape. We either draw the outer shape clockwise and the inner shape counterclockwise or the outer shape counterclockwise and the inner shape clockwise.

```html
<canvas id="my-canvas" width="150" height="150"></canvas>
```

```js
function draw() {
  const canvas = document.getElementById("my-canvas");
  const ctx = canvas.getContext("2d");

  ctx.beginPath();

  // Outer shape clockwise ⟳
  ctx.moveTo(0, 0);
  ctx.lineTo(150, 0);
  ctx.lineTo(75, 129.9);

  // Inner shape counterclockwise ↺
  ctx.moveTo(75, 20);
  ctx.lineTo(50, 60);
  ctx.lineTo(100, 60);

  ctx.fill();
}
```

```js
draw();
```

In the example above, the outer triangle goes clockwise (move to the top-left corner, then draw a line to the top-right corner, and finish at the bottom) and the inner triangle goes counterclockwise (move to the top, then line to the bottom-left corner, and finish at the bottom-right).

## Path2D objects

As we have seen in the last example, there can be a series of paths and drawing commands to draw objects onto your canvas. To simplify the code and to improve performance, the `Path2D` object, available in recent versions of browsers, lets you cache or record these drawing commands. You are able to play back your paths quickly.
Let's see how we can construct a `Path2D` object:

- `Path2D()`
    The **`Path2D()`** constructor returns a newly instantiated `Path2D` object, optionally with another path as an argument (creates a copy), or optionally with a string consisting of SVG path data.

```js
new Path2D(); // empty path object
new Path2D(path); // copy from another Path2D object
new Path2D(d); // path from SVG path data
```

All path methods like `moveTo`, `rect`, `arc` or `quadraticCurveTo`, etc., which we got to know above, are available on `Path2D` objects.

The `Path2D` API also adds a way to combine paths using the `addPath` method. This can be useful when you want to build objects from several components, for example.

- `Path2D.addPath(path [, transform])`
    Adds a path to the current path with an optional transformation matrix.

### Path2D example

In this example, we are creating a rectangle and a circle. Both are stored as a `Path2D` object, so that they are available for later usage. With the new `Path2D` API, several methods got updated to optionally accept a `Path2D` object to use instead of the current path. Here, `stroke` and `fill` are used with a path argument to draw both objects onto the canvas, for example.

```html
<canvas id="my-canvas" width="130" height="100"></canvas>
```

```js
function draw() {
  const canvas = document.getElementById("my-canvas");
  const ctx = canvas.getContext("2d");

  const rectangle = new Path2D();
  rectangle.rect(10, 10, 50, 50);

  const circle = new Path2D();
  circle.arc(100, 35, 25, 0, 2 * Math.PI);

  ctx.stroke(rectangle);
  ctx.fill(circle);
}
```

```js
draw();
```

### Using SVG paths

Another powerful feature of the new canvas `Path2D` API is using SVG path data to initialize paths on your canvas. This might allow you to pass <example-value> path data and re-use them in both, SVG and canvas.

The path will move to point (`M10 10`) and then move horizontally 80 points to the right (`h 80`), then 80 points down (`v 80`), then 80 points to the left (`h -80`), and then back to the start (`z`). You can see this example on the `Path2D` constructor page.

```js
const p = new Path2D("M10 10 h 80 v 80 h -80 Z");
```
