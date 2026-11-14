---
title: "Getting started with WebGL"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/webgl_api/tutorial/getting_started_with_webgl/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Getting started with WebGL

WebGL enables web content to use an API based on OpenGL ES 2.0 to perform 2D and 3D rendering in an HTML `canvas` in browsers that support it without the use of plug-ins.

WebGL programs consist of control code written in JavaScript and shader code (GLSL) that is executed on a computer's Graphics Processing Unit (GPU). WebGL elements can be mixed with other HTML elements and composited with other parts of the page or page background.

This article will introduce you to the basics of using WebGL. It's assumed that you already have an understanding of the mathematics involved in 3D graphics, and this article doesn't pretend to try to teach you 3D graphics concepts itself.

The code examples in this tutorial can also be found in the webgl-examples folder on GitHub.

It's worth noting here that this series of articles introduces WebGL itself; however, there are a number of frameworks available that encapsulate WebGL's capabilities, making it easier to build 3D applications and games, such as THREE.js and BABYLON.js.

## Preparing to render in 3D

First, create two new files:

- "index.html"
- "webgl-demo.js"

The "index.html" file should contain the following:

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>WebGL Demo</title>
    <script src="webgl-demo.js" type="module"></script>
  </head>

  <body>
    <canvas id="gl-canvas" width="640" height="480"></canvas>
  </body>
</html>
```

Note that this declares a canvas that our sample will draw into.

### Preparing the WebGL context

Add the following code to the "webgl-demo.js" file:

```js
main();

//
// start here
//
function main() {
  const canvas = document.querySelector("#gl-canvas");
  // Initialize the GL context
  const gl = canvas.getContext("webgl");

  // Only continue if WebGL is available and working
  if (gl === null) {
    alert(
      "Unable to initialize WebGL. Your browser or machine may not support it.",
    );
    return;
  }

  // Set clear color to black, fully opaque
  gl.clearColor(0.0, 0.0, 0.0, 1.0);
  // Clear the color buffer with specified clear color
  gl.clear(gl.COLOR_BUFFER_BIT);
}
```

The `main()` function is called when our script is loaded. Its purpose is to set up the WebGL context and start rendering content.

The first thing we do here is obtain a reference to the canvas, assigning it to a variable named `canvas`.

Once we have the canvas, we try to get a `WebGLRenderingContext` for it by calling `getContext()` and passing it the string `"webgl"`. If the browser does not support WebGL, `getContext()` will return `null` in which case we display a message to the user and exit.

If the context is successfully initialized, the variable `gl` is our reference to it. In this case, we set the clear color to black, and clear the context to that color (redrawing the canvas with the background color).

At this point, you have enough code that the WebGL context should successfully initialize, and you should wind up with a big black, empty box, ready and waiting to receive content.

View the complete code | Open this demo on a new page

## See also

- WebGL Fundamentals
- An intro to modern OpenGL: A series of nice articles about OpenGL written by Joe Groff, providing a clear introduction to OpenGL from its history to the important graphics pipeline concept, and also includes some examples to demonstrate how OpenGL works. If you have no idea what OpenGL is, this is a good place to start.
