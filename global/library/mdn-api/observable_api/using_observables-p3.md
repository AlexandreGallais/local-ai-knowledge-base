---
title: "Using observables (part 3 of 3)"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/observable_api/using_observables/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Using observables (part 3 of 3)

## Example: canvas drawing

In this example we create a basic `<canvas>`-based drawing app, which brings together the APIs we have seen so far to demonstrate how observables help you declaratively implement complex event handling logic.

### HTML

The markup includes a `<canvas>` element to draw onto, and a `<form>` containing two `` controls to allow the user to choose a new pen size and color (a range slider and a color picker, respectively). We also include an `<output>` element to display the current range value.

```html
<canvas></canvas>
<form>
  <div>
    <label for="size">Choose pen size:</label>
    <input id="size" type="range" min="1" max="40" value="10" />
    <output for="size">10</output>
  </div>
  <div>
    <label for="color">Choose pen color:</label>
    <input id="color" type="color" />
  </div>
</form>
```

### CSS

In the CSS, we make the `<body>` element span the full width and height of the page. We also make the `<form>` sit on top of the `<canvas>`, and use inset properties to make it stick to the top, left, and right of the `<body>`.

The rest of the CSS isn't important to the understanding of the overall example, so we won't explain it here, but we've included it all below so you can see it.

```css
* {
  box-sizing: border-box;
}

html {
  font-family: "Helvetica", "Arial";
  height: 100%;
}

body {
  margin: 0;
  height: inherit;
  overflow: hidden;
}

form {
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  padding: 10px;
  background: rgb(218 112 214 / 0.85);
  box-shadow: 0 1px 3px black;
}

form > div {
  display: flex;
  align-items: center;
}

form > div:first-child {
  margin-bottom: 10px;
}

form label {
  width: 140px;
}

form input {
  width: 100px;
}
```

### JavaScript

In our script, we first grab references to our `<canvas>`, `<form>`, ``, and `<output>` elements:

```js
const canvas = document.querySelector("canvas");
const form = document.querySelector("form");
const sizeInput = document.querySelector("[type='range']");
const sizeOutput = document.querySelector("output");
const colorInput = document.querySelector("[type='color']");
```

Next, we synchronize the canvas's `width` and `height` to the `clientWidth`/`clientHeight` of the `<body>`. This is implemented in the `sizeCanvas()` function. It is called when the app starts and whenever the window resizes, using `when("resize").subscribe(sizeCanvas)` (which has the same effect as `addEventListener("resize", sizeCanvas)`). Setting the canvas dimensions also clears the drawing.

```js
function sizeCanvas() {
  canvas.width = document.body.clientWidth;
  canvas.height = document.body.clientHeight;
}

sizeCanvas();

window.when("resize").subscribe(sizeCanvas);
```

Next, we define the variables and functions we need to draw on our `<canvas>`. First, we grab a reference to the `<canvas>` 2D rendering context, and store initial values for the pen size and color in `penSize` and `penColor`, respectively. The `updatePenSize()` function sets `penSize` to the range slider's `valueAsNumber` and displays its value in the `<output>` element. The `updatePenColor()` function sets `penColor` to the color picker's `value`. These functions handle the `input` event on the range slider and the `change` event on the color picker, respectively.

```js
const ctx = canvas.getContext("2d");
let penSize = 10;
let penColor = "black";

function updatePenSize() {
  penSize = sizeInput.valueAsNumber;
  sizeOutput.textContent = sizeInput.value;
}

function updatePenColor() {
  penColor = colorInput.value;
}

sizeInput.when("input").subscribe(updatePenSize);
colorInput.when("change").subscribe(updatePenColor);
```

Now on to our main `draw()` function. Here, we hide the `<form>` so we can see the whole `<canvas>` when we start to draw. We then set the canvas context's `fillStyle` to the `penColor`, start drawing a path using `beginPath()`, draw a single circle of the specified `penSize` at the event object's `x` and `y` coordinates (more on those later) using `arc()`, and render the drawing on the canvas using `fill()`. This (along with the observable code you'll see later) draws a circle at the current mouse coordinates every time the mouse moves.

```js
function draw(e) {
  form.style.display = "none";

  ctx.fillStyle = penColor;
  ctx.beginPath();
  ctx.arc(
    e.x - canvas.offsetLeft,
    e.y - canvas.offsetTop,
    penSize,
    0,
    2 * Math.PI,
  );
  ctx.fill();
}
```

The last function we define is `finishDraw()`, which shows the `<form>` again when the drawing is finished.

```js
function finishDraw() {
  form.style.display = "block";
}
```

Finally, we create an observable for `mousedown` events on the `<canvas>`. For each press of the primary mouse button, `Observable.flatMap()` subscribes to a stream of `mousemove` events that ends when the button is released. We listen for `mouseup` on the `document` object so drawing also stops if the mouse is released outside the canvas. We then use `Observable.map()` to extract the mouse coordinates and `subscribe()` to pass them to `draw()`.

```js
canvas
  .when("mousedown")
  .filter((e) => e.button === 0)
  .flatMap(() => {
    const mouseUp = document
      .when("mouseup")
      .filter((e) => e.button === 0)
      .finally(finishDraw);
    return canvas.when("mousemove").takeUntil(mouseUp);
  })
  .map((e) => ({ x: e.clientX, y: e.clientY }))
  .subscribe(draw);
```

The pipeline processes a `mousedown → mousemove… → mouseup` sequence:

1. Each primary-button `mousedown` event passes the filter and triggers the `flatMap()` callback.
2. The callback returns `canvas.when("mousemove").takeUntil(mouseUp)`. Subscribing to this inner observable starts listening for mouse movements and for the button release.
3. Each mouse movement on the canvas passes through `flatMap()` to `map()`, which extracts its coordinates, and then to `draw()`.
4. When the primary button is released, `Observable.takeUntil()` completes the inner observable and unsubscribes from both event streams. The `Observable.finally()` callback runs during cleanup and calls `finishDraw()` to show the form again.
5. The outer `mousedown` subscription remains active, so the next press starts a new drawing sequence.

The final effect is that we react to `mousemove` events (just like our first example on this page!) but we only start listening when `mousedown` fires and stop listening when `mouseup` fires. With the help of `Observable`, we have successfully composed three parallel event streams into a single, coherent sequence.

### Result

The example renders like this:

## See also

- Creating custom observables
- Observable explainer
