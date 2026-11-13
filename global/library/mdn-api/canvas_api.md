---
title: "Canvas API"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/canvas_api/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Canvas API

The **Canvas API** provides a means for drawing graphics via JavaScript and the HTML `<canvas>` element. Among other things, it can be used for animation, game graphics, data visualization, photo manipulation, and real-time video processing.

The Canvas API largely focuses on 2D graphics. The WebGL API, which also uses the `<canvas>` element, draws hardware-accelerated 2D and 3D graphics.

## Accessibility concerns

The `<canvas>` element is just a bitmap and does not provide information about any drawn objects. Text written on canvas can cause legibility issues with users relying on screen magnification. The pixels within a canvas element do not scale and can become blurry with magnification. This is because they are not a vector but letter-shaped collection of pixels. When zooming in on it, the pixels become bigger.

Canvas content is not exposed to accessibility tools like semantic HTML is. In general, you should use canvases like images and avoid using them to render significant content without accessible backing markup.

## Basic <example-value>

This simple example draws a green rectangle onto a canvas.

### HTML

```html
<canvas id="canvas"></canvas>
```

### JavaScript

The `Document.getElementById()` method gets a reference to the HTML `<canvas>` element. Next, the `HTMLCanvasElement.getContext()` method gets that element's context—the thing onto which the drawing will be rendered.

The actual drawing is done using the `CanvasRenderingContext2D` interface. The `fillStyle` property makes the rectangle green. The `fillRect()` method places its top-left corner at (10, 10), and gives it a size of 150 units wide by 100 tall.

```js
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

ctx.fillStyle = "green";
ctx.fillRect(10, 10, 150, 100);
```

## Reference

- `HTMLCanvasElement`
- `CanvasRenderingContext2D`
- `CanvasGradient`
- `CanvasPattern`
- `ImageBitmap`
- `ImageData`
- `TextMetrics`
- `OffscreenCanvas`
- `Path2D` (experimental)
- `ImageBitmapRenderingContext` (experimental)

> **Note:**
> The interfaces related to the `WebGLRenderingContext` are referenced under WebGL.

> **Note:**
> `OffscreenCanvas` is also available in web workers.

`CanvasCaptureMediaStreamTrack` is a related interface.

## Guides and tutorials

- Canvas tutorial
    A comprehensive tutorial covering both the basic usage of the Canvas API and its advanced features.
- HTML5 Canvas Deep Dive
    A hands-on, book-length introduction to the Canvas API and WebGL.
- Canvas Handbook
    A handy reference for the Canvas API.
- Manipulating video using canvas
    Combining `` and `<canvas>` to manipulate video data in real time.

## Libraries

The Canvas API is extremely powerful, but not always simple to use. The libraries listed below can make the creation of canvas-based projects faster and easier.

- EaselJS is an open-source canvas library that makes creating games, generative art, and other highly graphical experiences easy.
- Fabric.js is an open-source canvas library with SVG parsing capabilities.
- heatmap.js is an open-source library for creating canvas-based data heat maps.
- JavaScript InfoVis Toolkit creates interactive data visualizations.
- Konva.js is a 2D canvas library for desktop and mobile applications.
- p5.js has a full set of canvas drawing functionality for artists, designers, educators, and beginners.
- Phaser is a fast, free and fun open source framework for Canvas and WebGL powered browser games.
- Pts.js is a library for creative coding and visualization in canvas and SVG.
- Rekapi is an animation key-framing API for Canvas.
- Scrawl-canvas is an open-source JavaScript library for creating and manipulating 2D canvas elements.
- The ZIM framework provides conveniences, components, and controls for coding creativity on the canvas — includes accessibility and hundreds of colorful tutorials.
- Sprig is a beginner-friendly, open-source, tile-based game development library that uses Canvas.

> **Note:**
> See the WebGL API for 2D and 3D libraries that use WebGL.

## See also

- WebGL
