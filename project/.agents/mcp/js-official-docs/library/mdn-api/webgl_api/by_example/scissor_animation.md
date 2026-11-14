---
title: "Scissor animation"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/webgl_api/by_example/scissor_animation/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Scissor animation

A simple WebGL example in which we have some animation fun using scissoring and clearing operations.

## Animation with scissoring

In this example, we are animating squares using `scissor()` and `clear()`. We again establish an animation loop using timers. Note that this time it is the position of the square (the scissoring area) that is updated every frame (we set frame rate to roughly one every 17ms, or roughly 60fps – frames per second).

In contrast, the color of the square (set with `clearColor`) is only updated when a new square is created. This is a nice demonstration of WebGL as a state machine. For each square, we set its color once, and then update only its position every frame. The clear color state of WebGL remains at the set value, until we change it again when a new square is created.

```html
<p>
  WebGL animation by clearing the drawing buffer with solid color and applying
  scissor test.
</p>
<button id="animation-onoff">
  Press here to <strong>[verb goes here]</strong> the animation.
</button>
```

```html
<canvas>Your browser does not seem to support canvases.</canvas>
```

```css
body {
  text-align: center;
}
canvas {
  display: block;
  width: 280px;
  height: 210px;
  margin: auto;
  padding: 0;
  border: none;
  background-color: black;
}
button {
  display: block;
  font-size: inherit;
  margin: auto;
  padding: 0.6em;
}
```

```js
const canvas = document.querySelector("canvas");

// Variables to hold the WebGL context, and the color and
// position of animated squares.
const gl = getRenderingContext();
let color = getRandomColor();
// Unlike the browser window, vertical position in WebGL is
// measured from bottom to top. In here we set the initial
// position of the square to be at the top left corner of the
// drawing buffer.
let position = [0, gl.drawingBufferHeight];

gl.enable(gl.SCISSOR_TEST);
gl.clearColor(color[0], color[1], color[2], 1.0);

const button = document.querySelector("button");
let timer;

function getRenderingContext() {
  canvas.width = canvas.clientWidth;
  canvas.height = canvas.clientHeight;
  const gl = canvas.getContext("webgl");
  gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
  gl.clearColor(0.0, 0.0, 0.0, 1.0);
  gl.clear(gl.COLOR_BUFFER_BIT);
  return gl;
}

function startAnimation(evt) {
  button.removeEventListener(evt.type, startAnimation);
  button.addEventListener("click", stopAnimation);
  document.querySelector("strong").textContent = "stop";
  timer = setInterval(drawAnimation, 17);
  drawAnimation();
}

function stopAnimation(evt) {
  button.removeEventListener(evt.type, stopAnimation);
  button.addEventListener("click", startAnimation);
  document.querySelector("strong").textContent = "start";
  clearInterval(timer);
}

stopAnimation({ type: "click" });

// Variables to hold the size and velocity of the square.
const size = [60, 60];
let velocity = 3.0;
function drawAnimation() {
  gl.scissor(position[0], position[1], size[0], size[1]);
  gl.clear(gl.COLOR_BUFFER_BIT);
  // Every frame the vertical position of the square is
  // decreased, to create the illusion of movement.
  position[1] -= velocity;
  // When the square hits the bottom of the drawing buffer,
  // we override it with new square of different color and
  // velocity.
  if (position[1] < 0) {
    // Horizontal position chosen randomly, and vertical
    // position at the top of the drawing buffer.
    position = [
      Math.random() * (gl.drawingBufferWidth - size[0]),
      gl.drawingBufferHeight,
    ];
    // Random velocity between 1.0 and 7.0
    velocity = 1.0 + 6.0 * Math.random();
    color = getRandomColor();
    gl.clearColor(color[0], color[1], color[2], 1.0);
  }
}

function getRandomColor() {
  return [Math.random(), Math.random(), Math.random()];
}
```

The source code of this example is also available on GitHub.
