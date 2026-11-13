---
title: "Applying styles and colors (part 3 of 3)"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/canvas_api/tutorial/applying_styles_and_colors/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Applying styles and colors (part 3 of 3)

## Gradients

Just like any normal drawing program, we can fill and stroke shapes using linear, radial and conic gradients. We create a `CanvasGradient` object by using one of the following methods. We can then assign this object to the `fillStyle` or `strokeStyle` properties.

- `createLinearGradient(x1, y1, x2, y2)`
    Creates a linear gradient object with a starting point of (`x1`, `y1`) and an end point of (`x2`, `y2`).
- `createRadialGradient(x1, y1, r1, x2, y2, r2)`
    Creates a radial gradient. The parameters represent two circles, one with its center at (`x1`, `y1`) and a radius of `r1`, and the other with its center at (`x2`, `y2`) with a radius of `r2`.
- `createConicGradient(angle, x, y)`
    Creates a conic gradient object with a starting angle of `angle` in radians, at the position (`x`, `y`).

For example:

```js
const lineargradient = ctx.createLinearGradient(0, 0, 150, 150);
const radialgradient = ctx.createRadialGradient(75, 75, 0, 75, 75, 100);
```

Once we've created a `CanvasGradient` object we can assign colors to it by using the `addColorStop()` method.

- `gradient.addColorStop(position, color)`
    Creates a new color stop on the `gradient` object. The `position` is a number between 0.0 and 1.0 and defines the relative position of the color in the gradient, and the `color` argument must be a string representing a CSS `<color>`, indicating the color the gradient should reach at that offset into the transition.

You can add as many color stops to a gradient as you need. Below is a very simple linear gradient from white to black.

```js
const lineargradient = ctx.createLinearGradient(0, 0, 150, 150);
lineargradient.addColorStop(0, "white");
lineargradient.addColorStop(1, "black");
```

### A `createLinearGradient` example

In this example, we'll create two different gradients. As you can see here, both the `strokeStyle` and `fillStyle` properties can accept a `canvasGradient` object as valid input.

```js
function draw() {
  const ctx = document.getElementById("my-canvas").getContext("2d");

  // Create gradients
  const linGrad = ctx.createLinearGradient(0, 0, 0, 150);
  linGrad.addColorStop(0, "#00ABEB");
  linGrad.addColorStop(0.5, "white");
  linGrad.addColorStop(0.5, "#26C000");
  linGrad.addColorStop(1, "white");

  const linGrad2 = ctx.createLinearGradient(0, 50, 0, 95);
  linGrad2.addColorStop(0.5, "black");
  linGrad2.addColorStop(1, "transparent");

  // assign gradients to fill and stroke styles
  ctx.fillStyle = linGrad;
  ctx.strokeStyle = linGrad2;

  // draw shapes
  ctx.fillRect(10, 10, 130, 130);
  ctx.strokeRect(50, 50, 50, 50);
}
```

```html
<canvas id="my-canvas" width="150" height="150" role="presentation"></canvas>
```

```js
draw();
```

The first is a background gradient. As you can see, we assigned two colors at the same position. You do this to make very sharp color transitions—in this case from white to green. Normally, it doesn't matter in what order you define the color stops, but in this special case, it does significantly. If you keep the assignments in the order you want them to appear, this won't be a problem.

In the second gradient, we didn't assign the starting color (at position 0.0) since it wasn't strictly necessary, because it will automatically assume the color of the next color stop. Therefore, assigning the black color at position 0.5 automatically makes the gradient, from the start to this stop, black.

### A `createRadialGradient` example

In this example, we'll define four different radial gradients. Because we have control over the start and closing points of the gradient, we can achieve more complex effects than we would normally have in the "classic" radial gradients we see in, for instance, Photoshop (that is, a gradient with a single center point where the gradient expands outward in a circular shape).

```js
function draw() {
  const ctx = document.getElementById("my-canvas").getContext("2d");

  // Create gradients
  const radGrad = ctx.createRadialGradient(45, 45, 10, 52, 50, 30);
  radGrad.addColorStop(0, "#A7D30C");
  radGrad.addColorStop(0.9, "#019F62");
  radGrad.addColorStop(1, "transparent");

  const radGrad2 = ctx.createRadialGradient(105, 105, 20, 112, 120, 50);
  radGrad2.addColorStop(0, "#FF5F98");
  radGrad2.addColorStop(0.75, "#FF0188");
  radGrad2.addColorStop(1, "transparent");

  const radGrad3 = ctx.createRadialGradient(95, 15, 15, 102, 20, 40);
  radGrad3.addColorStop(0, "#00C9FF");
  radGrad3.addColorStop(0.8, "#00B5E2");
  radGrad3.addColorStop(1, "transparent");

  const radGrad4 = ctx.createRadialGradient(0, 150, 50, 0, 140, 90);
  radGrad4.addColorStop(0, "#F4F201");
  radGrad4.addColorStop(0.8, "#E4C700");
  radGrad4.addColorStop(1, "transparent");

  // draw shapes
  ctx.fillStyle = radGrad4;
  ctx.fillRect(0, 0, 150, 150);
  ctx.fillStyle = radGrad3;
  ctx.fillRect(0, 0, 150, 150);
  ctx.fillStyle = radGrad2;
  ctx.fillRect(0, 0, 150, 150);
  ctx.fillStyle = radGrad;
  ctx.fillRect(0, 0, 150, 150);
}
```

```html
<canvas id="my-canvas" width="150" height="150" role="presentation"></canvas>
```

```js
draw();
```

In this case, we've offset the starting point slightly from the end point to achieve a spherical 3D effect. It's best to try to avoid letting the inside and outside circles overlap because this results in strange effects which are hard to predict.

The last color stop in each of the four gradients uses a fully transparent color. If you want to have a nice transition from this to the previous color stop, both colors should be equal. This isn't very obvious from the code because it uses two different CSS color methods as a demonstration, but in the first gradient `#019F62 = rgb(1 159 98 / 100%)`.

### A `createConicGradient` example

In this example, we'll define two different conic gradients. A conic gradient differs from a radial gradient as, instead of creating circles, it circles around a point.

```js
function draw() {
  const ctx = document.getElementById("my-canvas").getContext("2d");

  // Create gradients
  const conicGrad1 = ctx.createConicGradient(2, 62, 75);
  conicGrad1.addColorStop(0, "#A7D30C");
  conicGrad1.addColorStop(1, "white");

  const conicGrad2 = ctx.createConicGradient(0, 187, 75);
  // we multiply our values by Math.PI/180 to convert degrees to radians
  conicGrad2.addColorStop(0, "black");
  conicGrad2.addColorStop(0.25, "black");
  conicGrad2.addColorStop(0.25, "white");
  conicGrad2.addColorStop(0.5, "white");
  conicGrad2.addColorStop(0.5, "black");
  conicGrad2.addColorStop(0.75, "black");
  conicGrad2.addColorStop(0.75, "white");
  conicGrad2.addColorStop(1, "white");

  // draw shapes
  ctx.fillStyle = conicGrad1;
  ctx.fillRect(12, 25, 100, 100);
  ctx.fillStyle = conicGrad2;
  ctx.fillRect(137, 25, 100, 100);
}
```

```html
<canvas id="my-canvas" width="250" height="150" role="presentation"
  >A conic gradient</canvas
>
```

```js
draw();
```

The first gradient is positioned in the center of the first rectangle and moves a green color stop at the start, to a white one at the end. The angle starts at 2 radians, which is noticeable because of the beginning/end line pointing south east.

The second gradient is also positioned at the center of the second rectangle. This one has multiple color stops, alternating from black to white at each quarter of the rotation. This gives us the checkered effect.

## Patterns

In one of the examples on the previous page, we used a series of loops to create a pattern of images. There is, however, a much simpler method: the `createPattern()` method.

- `createPattern(image, type)`
    Creates and returns a new canvas pattern object. `image` is the source of the image (that is, an `HTMLImageElement`, a `SVGImageElement`, another `HTMLCanvasElement` or an `OffscreenCanvas`, an `HTMLVideoElement` or a `VideoFrame`, or an `ImageBitmap`). `type` is a string indicating how to use the image.

The type specifies how to use the image in order to create the pattern, and must be one of the following string values:

- `repeat`
    Tiles the image in both vertical and horizontal directions.
- `repeat-x`
    Tiles the image horizontally but not vertically.
- `repeat-y`
    Tiles the image vertically but not horizontally.
- `no-repeat`
    Doesn't tile the image. It's used only once.

We use this method to create a `CanvasPattern` object which is very similar to the gradient methods we've seen above. Once we've created a pattern, we can assign it to the `fillStyle` or `strokeStyle` properties. For example:

```js
const img = new Image();
img.src = "some-image.png";
const pattern = ctx.createPattern(img, "repeat");
```

> **Note:**
> Like with the `drawImage()` method, you must make sure the image you use is loaded before calling this method or the pattern may be drawn incorrectly.

### A `createPattern` example

In this last example, we'll create a pattern to assign to the `fillStyle` property. The only thing worth noting is the use of the image's `onload` handler. This is to make sure the image is loaded before it is assigned to the pattern.

```js
function draw() {
  const ctx = document.getElementById("my-canvas").getContext("2d");

  // create new image object to use as pattern
  const img = new Image();
  img.src = "canvas_create_pattern.png";
  img.onload = () => {
    // create pattern
    const pattern = ctx.createPattern(img, "repeat");
    ctx.fillStyle = pattern;
    ctx.fillRect(0, 0, 150, 150);
  };
}
```

```html
<canvas id="my-canvas" width="150" height="150" role="presentation"></canvas>
```

```js
draw();
```

## Shadows

Using shadows involves just four properties:

- `shadowOffsetX = float`
    Indicates the horizontal distance the shadow should extend from the object. This value isn't affected by the transformation matrix. The default is 0.
- `shadowOffsetY = float`
    Indicates the vertical distance the shadow should extend from the object. This value isn't affected by the transformation matrix. The default is 0.
- `shadowBlur = float`
    Indicates the size of the blurring effect; this value doesn't correspond to a number of pixels and is not affected by the current transformation matrix. The default value is 0.
- `shadowColor = color`
    A standard CSS color value indicating the color of the shadow effect; by default, it is fully-transparent black.

The properties `shadowOffsetX` and `shadowOffsetY` indicate how far the shadow should extend from the object in the X and Y directions; these values aren't affected by the current transformation matrix. Use negative values to cause the shadow to extend up or to the left, and positive values to cause the shadow to extend down or to the right. These are both 0 by default.

The `shadowBlur` property indicates the size of the blurring effect; this value doesn't correspond to a number of pixels and is not affected by the current transformation matrix. The default value is 0.

The `shadowColor` property is a standard CSS color value indicating the color of the shadow effect; by default, it is fully-transparent black.

> **Note:**
> Shadows are only drawn for `source-over` compositing operations.

### A shadowed text example

This example draws a text string with a shadowing effect.

```js
function draw() {
  const ctx = document.getElementById("my-canvas").getContext("2d");

  ctx.shadowOffsetX = 2;
  ctx.shadowOffsetY = 2;
  ctx.shadowBlur = 2;
  ctx.shadowColor = "rgb(0 0 0 / 50%)";

  ctx.font = "20px Times New Roman";
  ctx.fillStyle = "Black";
  ctx.fillText("Sample String", 5, 30);
}
```

```html
<canvas id="my-canvas" width="150" height="80" role="presentation"></canvas>
```

```js
draw();
```

We will look at the `font` property and `fillText` method in the next chapter about drawing text.

## Canvas fill rules

When using `fill` (or `clip` and `isPointInPath`) you can optionally provide a fill rule algorithm by which to determine if a point is inside or outside a path and thus if it gets filled or not. This is useful when a path intersects itself or is nested.

Two values are possible:

- `nonzero`
    The non-zero winding rule, which is the default rule.
- `evenodd`
    The even-odd winding rule.

In this example we are using the `evenodd` rule.

```js
function draw() {
  const ctx = document.getElementById("my-canvas").getContext("2d");
  ctx.beginPath();
  ctx.arc(50, 50, 30, 0, Math.PI * 2, true);
  ctx.arc(50, 50, 15, 0, Math.PI * 2, true);
  ctx.fill("evenodd");
}
```

```html
<canvas id="my-canvas" width="100" height="100" role="presentation"></canvas>
```

```js
draw();
```
