---
title: "Drawing shapes with canvas (part 1 of 3)"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/canvas_api/tutorial/drawing_shapes/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Drawing shapes with canvas

Now that we have set up our canvas environment, we can get into the details of how to draw on the canvas. By the end of this article, you will have learned how to draw rectangles, triangles, lines, arcs and curves, providing familiarity with some of the basic shapes. Working with paths is essential when drawing objects onto the canvas and we will see how that can be done.

## The grid

Before we can start drawing, we need to talk about the canvas grid or **coordinate space**. Our HTML skeleton from the previous page had a canvas element 150 pixels wide and 150 pixels high.

Normally 1 unit in the grid corresponds to 1 pixel on the canvas. The origin of this grid is positioned in the _top left_ corner at coordinate (0,0). All elements are placed relative to this origin. So the position of the top left corner of the blue square becomes x pixels from the left and y pixels from the top, at coordinate (x,y). Later in this tutorial we'll see how we can translate the origin to a different position, rotate the grid and even scale it, but for now we'll stick to the default.

## Drawing rectangles

Unlike SVG, `<canvas>` only supports two primitive shapes: rectangles and paths (lists of points connected by lines). All other shapes must be created by combining one or more paths. Luckily, we have an assortment of path drawing functions which make it possible to compose very complex shapes.

First let's look at the rectangle. There are three functions that draw rectangles on the canvas:

- `fillRect(x, y, width, height)`
    Draws a filled rectangle.
- `strokeRect(x, y, width, height)`
    Draws a rectangular outline.
- `clearRect(x, y, width, height)`
    Clears the specified rectangular area, making it fully transparent.

Each of these three functions takes the same parameters. `x` and `y` specify the position on the canvas (relative to the origin) of the top-left corner of the rectangle. `width` and `height` provide the rectangle's size.

Below is the `draw()` function from the previous page, but now it is making use of these three functions.

### Rectangular shape example

```html
<canvas id="my-canvas" width="150" height="150"></canvas>
```

```js
function draw() {
  const canvas = document.getElementById("my-canvas");
  const ctx = canvas.getContext("2d");

  ctx.fillRect(25, 25, 100, 100);
  ctx.clearRect(45, 45, 60, 60);
  ctx.strokeRect(50, 50, 50, 50);
}
```

```js
draw();
```

This example's output is shown below.

The `fillRect()` function draws a large black square 100 pixels on each side. The `clearRect()` function then erases a 60x60 pixel square from the center, and then `strokeRect()` is called to create a rectangular outline 50x50 pixels within the cleared square (_conceptually_ 50x50; in reality it's 52x52, as the next section will explain).

In upcoming pages we'll see two alternative methods for `clearRect()`, and we'll also see how to change the color and stroke style of the rendered shapes.

Unlike the path functions we'll see in the next section, all three rectangle functions draw immediately to the canvas.

## Seeing blurry edges?

In the rectangle example above, and in all the examples to come, you may notice that the shapes' edges may appear blurrier than the equivalent shapes drawn with SVG or CSS. This is not because the canvas API is incapable of drawing sharp edges, but rather because of the way the canvas grid maps to the actual pixels on the screen, and also, in certain cases, because of how the browser scales the canvas. If the above example is not apparent enough, let's enlarge the canvas using CSS:

```html
<canvas id="canvas" width="15" height="15"></canvas>
```

```css
#canvas {
  width: 300px;
  height: 300px;
}
```

```js
function draw() {
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");
  ctx.strokeRect(2, 2, 10, 10);
  ctx.fillRect(7, 7, 1, 1);
}
```

```js
draw();
```

In this example, we create our canvas really small (15x15), but then use CSS to scale it up to 300x300 pixels. As a result, each canvas pixel is now represented by a 20x20 block of CSS pixels. We draw a stroked rectangle from (2,2) to (12,12) and a filled rectangle from (7,7) to (8,8). It appears _really_ blurry. This is because by default, when the browser scales raster images, it uses a smoothing algorithm to interpolate the extra pixels. This is great for photographs or canvas graphics with curly edges, but not so great for straight-edged shapes. To fix this, we can set `image-rendering` to `pixelated`:

```css
#canvas {
  image-rendering: pixelated;
}
```

Now, when the browser scales the canvas, it preserves the pixelation of the original as much as possible.

> **Note:**
> `image-rendering: pixelated` is not without its problems as a crisp-edge-preservation technique. When CSS pixels don't align with device pixels (if the `devicePixelRatio` is not an integer), certain pixels may be drawn larger than others, resulting in a non-uniform appearance. This is not an easy problem to solve, however, because it is impossible to fill device pixels precisely when the CSS pixels cannot accurately map to them.

But now another issue becomes apparent, one that you can actually also observe in the original rectangle example: the stroked rectangle is not only 2 pixels wide instead of 1, but also appears gray rather than the default black. This is because of how the coordinates are interpreted as shape boundaries.

If you look at the grid diagram above again, you can see that coordinates like `2` or `12` do not identify a pixel, but rather the edge between two pixels. In the images below, the grid represents the canvas coordinate grid. The squares between grid lines are actual on-screen pixels. In the first grid image below, a rectangle from (2,1) to (5,5) is filled. The entire area between them (light red) falls on pixel boundaries, so the resulting filled rectangle will have crisp edges.

If you consider a path from (3,1) to (3,5) with a line thickness of `1.0`, you end up with the situation in the second image. The actual area to be filled (dark blue) only extends halfway into the pixels on either side of the path. An approximation of this has to be rendered, which means that those pixels being only partially shaded, and results in the entire area (the light blue and dark blue) being filled in with a color only half as dark as the actual stroke color. This is what happens with the `1.0` width line in the `strokeRect()` call in the rectangle example above.

To fix this, you have to be very precise in your path creation. Knowing that a `1.0` width line will extend half a unit to either side of the path, creating the path from _centers_ of pixels results in the situation in the third image—the `1.0` line width ends up completely and precisely filling a single pixel vertical line.

> **Note:**
> Be aware that in our vertical line example, the Y position still referenced an integer grid line position—if it hadn't, we would see pixels with half coverage at the endpoints.

So this is why we said earlier that the `strokeRect(50, 50, 50, 50)` call in the rectangle example was _conceptually_ 50x50, but in reality it is 52x52. The actual filled region for the outline starts at (49.5, 49.5) and ends at (100.5, 100.5), and because of the partially filled pixels, the actually filled area is from (49,49) to (101,101), which is 52x52, and the edges are 2-pixel wide. To get a solid 1-pixel wide outline that is exactly 50x50, you would need to _shrink_ the rectangle by the thickness of the outline (1px), and move it by half the thickness (0.5px):

```js
function draw() {
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");
  ctx.strokeRect(2.5, 2.5, 9, 9);
  ctx.fillRect(7, 7, 1, 1);
}
```

For even-width lines, each half ends up being an integer number of pixels, so you want a path that is between pixels (that is, (3,1) to (3,5)), instead of down the middle of pixels.

While slightly painful when initially working with scalable 2D graphics, paying attention to the pixel grid and the position of paths ensures that your drawings will look correct regardless of scaling or any other transformations involved. A 1.0-width vertical line drawn at the correct position will become a crisp 2-pixel line when scaled up by 2, and will appear at the correct position.

This phenomenon of partially filled pixels also extends to shapes that don't align to the pixel grid. For example, consider a rotated rectangle (you'll learn about drawing it in the next section). To see what it's like with and without `image-rendering: pixelated`, we have two canvases side by side, and a third one drawn at full scale, with grid lines:

```html
<canvas id="canvas1" width="12" height="12"></canvas>
<canvas id="canvas2" width="12" height="12"></canvas>
<canvas id="canvas3" width="240" height="240"></canvas>
```

```css
html,
body {
  width: 800px;
  overflow-x: scroll;
}

@media (width < 500px) {
  html,
  body {
    width: 300px;
  }
}

#canvas1,
#canvas2 {
  width: 240px;
  height: 240px;
}
#canvas2 {
  image-rendering: pixelated;
}
```

```js
function draw(canvasId) {
  const canvas = document.getElementById(canvasId);
  const ctx = canvas.getContext("2d");
  ctx.beginPath();
  ctx.moveTo(3, 2);
  ctx.lineTo(9, 4.5);
  ctx.lineTo(6.5, 10.5);
  ctx.lineTo(0.5, 8);
  ctx.closePath();
  ctx.fill();
}

function drawFullScale() {
  const canvas = document.getElementById("canvas3");
  const ctx = canvas.getContext("2d");
  ctx.beginPath();
  ctx.moveTo(60, 40);
  ctx.lineTo(180, 90);
  ctx.lineTo(130, 210);
  ctx.lineTo(10, 160);
  ctx.closePath();
  ctx.fill();
  ctx.strokeStyle = "lightgray";
  for (let i = 0; i < 16; i++) {
    ctx.moveTo(i * 20, 0);
    ctx.lineTo(i * 20, 300);
    ctx.moveTo(0, i * 20);
    ctx.lineTo(300, i * 20);
    ctx.stroke();
  }
}
```

```js
draw("canvas1");
draw("canvas2");
drawFullScale();
```

If scaling _up_ an image makes it appear blurrier than intended, then scaling _down_ an image would make it appear _sharper_. For example, if you want a canvas to appear as 300x150 pixels on the screen, you can create it as 600x300 pixels and then use CSS to scale it down. This is especially useful on high-DPI screens (such as Apple's Retina displays) where a CSS pixel is represented by multiple screen pixels, so if you faithfully paint a 300x150 pixel canvas, it will not have the same pixel resolution as other elements on the page.
