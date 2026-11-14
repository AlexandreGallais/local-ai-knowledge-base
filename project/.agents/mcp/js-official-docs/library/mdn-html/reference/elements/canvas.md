---
title: "`<canvas>` HTML graphics canvas element"
tool: "mdn-html"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/html/reference/elements/canvas/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `<canvas>` HTML graphics canvas element

Use the **HTML `<canvas>` element** with either the canvas scripting API or the WebGL API to draw graphics and animations.

## Attributes

This element's attributes include the global attributes.

- `height`
    The height of the coordinate space in CSS pixels. Defaults to 150.
- `moz-opaque` (non-standard) (deprecated)
    Lets the canvas know whether translucency will be a factor. If the canvas knows there's no translucency, painting performance can be optimized. This is only supported by Mozilla-based browsers; use the standardized `canvas.getContext('2d', { alpha: false })` instead.
- `width`
    The width of the coordinate space in CSS pixels. Defaults to 300.

## Usage notes

### Alternative content

You should provide alternate content inside the `<canvas>` block. That content will be rendered both on older browsers that don't support canvas and in browsers with JavaScript disabled.

### Closing `</canvas>` tag

Unlike the `` element, the `<canvas>` element **requires** the closing tag (`</canvas>`).

### Sizing the canvas using CSS versus HTML

The displayed size of the canvas can be changed using CSS, but if you do this the image is scaled during rendering to fit the styled size, which can make the final graphics rendering end up being distorted.

It is better to specify your canvas dimensions by setting the `width` and `height` attributes directly on the `<canvas>` elements, either directly in the HTML or by using JavaScript.

### Maximum canvas size

The exact maximum size of a `<canvas>` element depends on the browser and environment. While in most cases the maximum dimensions exceed 10,000 x 10,000 pixels, notably iOS devices limit the canvas size to only 4,096 x 4,096 pixels. See canvas size limits in different browsers and devices.

> **Note:**
> Exceeding the maximum dimensions or area renders the canvas unusable — drawing commands will not work.

### Using an offscreen canvas

A canvas can be rendered using the `OffscreenCanvas` API where the document and canvas are decoupled.
The benefit is that a worker thread can handle canvas rendering and the main thread of your web application is not blocked by canvas operations.
By parallelizing work, other UI elements of your web application will remain responsive even if you are running complex graphics on an offscreen canvas.
For more information, see the `OffscreenCanvas` API documentation.

## Accessibility

### Alternative content

The `<canvas>` element on its own is just a bitmap and does not provide information about any drawn objects. Canvas content is not exposed to accessibility tools as semantic HTML is. In general, you should avoid using canvas in an accessible website or app. The following guides can help to make it more accessible.

- Canvas accessibility use cases
- Canvas element accessibility issues
- Best practices for interactive canvas elements

## Examples

### HTML

This code snippet adds a canvas element to your HTML document. A fallback text is provided if a browser is unable to read or render the canvas.

```html
<canvas width="120" height="120">
  An alternative text describing what your canvas displays.
</canvas>
```

### JavaScript

Then in the JavaScript code, call `HTMLCanvasElement.getContext()` to get a drawing context and start drawing onto the canvas:

```js
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
ctx.fillStyle = "green";
// Add a rectangle at (10, 10) with size 100x100 pixels
ctx.fillRect(10, 10, 100, 100);
```

## Technical summary

       |
        Content categories

       |
        Flow content,
        phrasing content,
        embedded content, palpable content.

       | Permitted content
       |
        Transparent but with no
        interactive content
        descendants except for `` elements,
        `` elements,
        `` elements whose
        `type` attribute is
        `checkbox`, `radio`, or `button`.

       | Tag omission
       | None, both the starting and ending tag are mandatory.

       | Permitted parents
       |
        Any element that accepts
        phrasing content.

       | Implicit ARIA role
       |
        No corresponding role

       | Permitted ARIA roles
       | Any

       | DOM interface
       | `HTMLCanvasElement`

## See also

- Canvas API
- Canvas tutorial
- OffscreenCanvas
- Canvas cheat sheet (2009)
- Canvas cheat sheet (pdf) (2015)
- Safari HTML canvas guide via Apple (2013)
- `CanvasRenderingContext2D` 2D drawing context for a canvas element via Apple.com
- WebGL API
- ``
- SVG
- HTML video and audio
