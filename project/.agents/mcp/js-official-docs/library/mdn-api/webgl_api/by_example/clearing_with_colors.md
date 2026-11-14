---
title: "Clearing with colors"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/webgl_api/by_example/clearing_with_colors/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Clearing with colors

An example showing how to clear a WebGL rendering context to a solid color.

## Clearing the WebGL context with a solid color

The simplest graphical WebGL program. Set up the `rendering context` and then just clear it solid green. Note that CSS sets the background color of the canvas to black, so when the canvas turns green we know that WebGL's magic has worked.

In addition, you may notice that clearing the drawing buffer with a solid color is a two-stage process. First, we set the clear color to green, using the method `clearColor()`. This only changes some internal state of WebGL, but does not draw anything yet. Next, we actually do the drawing by calling the `clear()` method. This is typical of how drawing is done with WebGL. There is only a handful of methods for actual drawing (`clear()` is one of them). All other methods are for setting and querying WebGL state variables (such as the clear color).

There are many "dials" and "switches" that affect drawing with WebGL. The clear color is just the first of many you will get to know. This is why WebGL/OpenGL is often called a _state machine_. By tweaking those "dials" and "switches" you can modify the internal state of the WebGL machine, which in turn changes how input (in this case, a clear command) translates into output (in this case, all pixels are set to green).

Finally, we note that color in WebGL is usually in RGBA format, that is four numerical components for red, green, blue and alpha (opacity). Therefore, `clearColor()` takes four arguments.

```html
<p>A very simple WebGL program that shows some color.</p>
<!-- Text within a canvas element is displayed
    only if canvas is not supported. -->
<canvas>Your browser does not seem to support HTML canvas.</canvas>
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
```

```js
// References to the document elements.
const paragraph = document.querySelector("p");
const canvas = document.querySelector("canvas");

// Getting the WebGL rendering context.
const gl = canvas.getContext("webgl");

paragraph.textContent = "Congratulations! Your browser supports WebGL.";
gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
// Set the clear color to darkish green.
gl.clearColor(0.0, 0.5, 0.0, 1.0);
// Clear the context with the newly set color. This is
// the function call that actually does the drawing.
gl.clear(gl.COLOR_BUFFER_BIT);
```

The source code of this example is also available on GitHub.
