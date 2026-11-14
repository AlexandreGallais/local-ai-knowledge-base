---
title: "Clearing by clicking"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/webgl_api/by_example/clearing_by_clicking/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Clearing by clicking

This example demonstrates how to combine user interaction with WebGL graphics operations by clearing the rendering context with a random color when the user clicks.

## Clearing the rendering context with random colors

This example provides an illustration of how to combine WebGL and user interaction. Every time the user clicks the canvas or the button, the canvas is cleared with a new randomly chosen color.

Note how we embed the WebGL function calls inside the event handler function.

```html
<p>
  A very simple WebGL program that still shows some color and user interaction.
</p>
<p>
  You can repeatedly click the empty canvas or the button below to change color.
</p>
<canvas id="canvas-view">
  Your browser does not seem to support HTML canvas.
</canvas>
<button id="color-switcher">Press here to switch color</button>
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
// Adding the same click event handler to both canvas and
// button.
const canvas = document.querySelector("#canvas-view");
const button = document.querySelector("#color-switcher");
canvas.addEventListener("click", switchColor);
button.addEventListener("click", switchColor);

// A variable to hold the WebGLRenderingContext.
const gl = canvas.getContext("webgl");
gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);

// The click event handler.
function switchColor() {
  // Get a random color value using a helper function.
  const color = getRandomColor();
  // Set the clear color to the random color.
  gl.clearColor(color[0], color[1], color[2], 1.0);
  // Clear the context with the newly set color. This is
  // the function call that actually does the drawing.
  gl.clear(gl.COLOR_BUFFER_BIT);
}

// Random color helper function.
function getRandomColor() {
  return [Math.random(), Math.random(), Math.random()];
}
```

The source code of this example is also available on GitHub.
