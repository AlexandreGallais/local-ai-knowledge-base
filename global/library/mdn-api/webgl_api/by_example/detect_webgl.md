---
title: "Detect WebGL"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/webgl_api/by_example/detect_webgl/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Detect WebGL

This example demonstrates how to detect a WebGL rendering context and reports the result to the user.

## Feature-detecting WebGL

In this first example we are going to check whether the browser supports WebGL. To that end we will try to obtain the `WebGL rendering context` from a `canvas` element. The `WebGL rendering context` is an interface, through which you can set and query the state of the graphics machine, send data to the WebGL, and execute draw commands.

Saving the state of the graphics machine within a single context interface is not unique to WebGL. This is also done in other graphics API, such as the `canvas 2D rendering context`. However, the properties and variables you can tweak are different for each API.

```html
<p>[ Here would go the result of WebGL feature detection ]</p>
<button>Press here to detect WebGLRenderingContext</button>
```

```css
body {
  text-align: center;
}
button {
  display: block;
  font-size: inherit;
  margin: auto;
  padding: 0.6em;
}
```

```js
const paragraph = document.querySelector("p");
const button = document.querySelector("button");

// Adding click event handler to button.
button.addEventListener("click", detectWebGLContext);
function detectWebGLContext() {
  // Create canvas element. The canvas is not added to the
  // document itself, so it is never displayed in the
  // browser window.
  const canvas = document.createElement("canvas");

  // Get WebGLRenderingContext from canvas element.
  const gl = canvas.getContext("webgl");

  // Report the result.
  paragraph.textContent =
    gl instanceof WebGLRenderingContext
      ? "Congratulations! Your browser supports WebGL."
      : "Failed. Your browser or device may not support WebGL.";
}
```

The source code of this example is also available on GitHub.
