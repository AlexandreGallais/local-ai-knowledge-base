---
title: "Canvas size and WebGL"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/webgl_api/by_example/canvas_size_and_webgl/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Canvas size and WebGL

This WebGL example explores the effect of setting (or not setting) the canvas size to its element size in CSS pixels, as it appears in the browser window.

## Effect of canvas size on rendering with WebGL

With `scissor()` and `clear()` we can demonstrate how the WebGL drawing buffer is affected by the size of the canvas.

The size of the first canvas is set to the styled `Element` size, determined by CSS. This is done by assigning the `width` and `height` properties of the canvas to the values of the `clientWidth` and `clientHeight` properties, respectively.

In contrast, no such assignment is done for the second canvas. The internal `width` and `height` properties of the canvas remain at default values, which are different than the actual size of the canvas `Element` in the browser window.

The effect is clearly visible when using `scissor()` and `clear()` to draw a square in the center of the canvas, by specifying its position and size in pixels. In the first canvas, we get the desired result. In the second, the square has the wrong shape, size, and position.

```html
<p>Compare the two canvases.</p>
<canvas>Your browser does not seem to support HTML canvas.</canvas>
<canvas>Your browser does not seem to support HTML canvas.</canvas>
```

```css
body {
  text-align: center;
}
canvas {
  display: inline-block;
  width: 120px;
  height: 80px;
  margin: auto;
  padding: 0;
  border: none;
  background-color: black;
}
```

```js
const [firstCanvas, secondCanvas] = document.getElementsByTagName("canvas");
firstCanvas.width = firstCanvas.clientWidth;
firstCanvas.height = firstCanvas.clientHeight;
[firstCanvas, secondCanvas].forEach((canvas) => {
  const gl = canvas.getContext("webgl");
  gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
  gl.enable(gl.SCISSOR_TEST);
  gl.scissor(30, 10, 60, 60);
  gl.clearColor(1.0, 1.0, 0.0, 1.0);
  gl.clear(gl.COLOR_BUFFER_BIT);
});
```

The source code of this example is also available on GitHub.
