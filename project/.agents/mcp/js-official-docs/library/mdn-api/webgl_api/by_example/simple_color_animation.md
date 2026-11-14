---
title: "Simple color animation"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/webgl_api/by_example/simple_color_animation/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Simple color animation

A very basic color animation created using WebGL, performed by clearing the drawing buffer with a different random color every second.

## Color animation with clear

This example provides an illustration of color animation with WebGL, as well as user interaction. The user can start, stop and restart the animation by clicking the button.

This time we put the WebGL function calls within a timer event handler. A click event handler additionally enables the basic user interaction of starting and stopping the animation. The timer and the timer handler function establish the animation loop, a set of drawing commands that are executed at a regular period (typically, every frame; in this case, once per second).

```html
<p>A simple WebGL program that shows color animation.</p>
<p>You can click the button below to toggle the color animation on or off.</p>
<canvas id="canvas-view">
  Your browser does not seem to support HTML canvas.
</canvas>
<button id="animation-onoff">
  Press here to
  <strong>[verb goes here]</strong>
  the animation
</button>
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
  display: inline-block;
  font-size: inherit;
  margin: auto;
  padding: 0.6em;
}
```

```js
// A variable to hold a timer that drives the animation.
let timer;

// Click event handlers.
const button = document.querySelector("#animation-onoff");
const verb = document.querySelector("strong");
const canvas = document.getElementById("canvas-view");
function startAnimation(evt) {
  button.removeEventListener(evt.type, startAnimation);
  button.addEventListener("click", stopAnimation);
  verb.textContent = "stop";
  // Setup animation loop by redrawing every second.
  timer = setInterval(drawAnimation, 1000);
  // Give immediate feedback to user after clicking, by
  // drawing one animation frame.
  drawAnimation();
}
function stopAnimation(evt) {
  button.removeEventListener(evt.type, stopAnimation);
  button.addEventListener("click", startAnimation);
  verb.textContent = "start";
  // Stop animation by clearing the timer.
  clearInterval(timer);
}
// Call stopAnimation() once to set up the initial event
// handlers for canvas and button.
stopAnimation({ type: "click" });

const gl = canvas.getContext("webgl");
gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
function drawAnimation() {
  // Get a random color value using a helper function.
  const color = getRandomColor();
  // Set the WebGLRenderingContext clear color to the
  // random color.
  gl.clearColor(color[0], color[1], color[2], 1.0);
  // Clear the context with the newly set color.
  gl.clear(gl.COLOR_BUFFER_BIT);
}

// Random color helper function.
function getRandomColor() {
  return [Math.random(), Math.random(), Math.random()];
}
```

The source code of this example is also available on GitHub.
