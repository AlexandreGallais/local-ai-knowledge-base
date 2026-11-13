---
title: "Element: mousemove event"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/element/mousemove_event/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Element: mousemove event

The `mousemove` event is fired at an element when a pointing device (usually a mouse) is moved while the cursor's hotspot is inside it.

These events happen whether or not any mouse buttons are pressed. They can fire at a very high rate, depends on how fast the user moves the mouse, how fast the machine is, what other tasks and processes are happening, etc.

## Syntax

Use the event name in `addEventListener()`:

```js
addEventListener("mousemove", (event) => { })
```

Alternatively, assign to the event handler property of the interface:

```js
onmousemove = (event) => { }
```

## Event type

A `MouseEvent`. Inherits from `UIEvent` and `Event`.

## Examples

The following example uses the `mousedown`, `mousemove`, and `mouseup` events to allow the user to draw on an HTML canvas. Its functionality is simple: the thickness of the line is set to 1, and the color is always black.

When the page loads, constants `myPics` and `context` are created to store a reference to the canvas and the 2d context we will use to draw.

Drawing begins when the `mousedown` event fires. First we store the x and y coordinates of the mouse pointer in the variables `x` and `y`, and then set `isDrawing` to true.

As the mouse moves over the page, the `mousemove` event fires. If `isDrawing` is true, the event handler calls the `drawLine` function to draw a line from the stored `x` and `y` values to the current location.

When the `drawLine()` function returns, we adjust the coordinates and then save them in `x` and `y`.

The `mouseup` event draws the final line segment, sets `x` and `y` to `0`, and stops further drawing by setting `isDrawing` to `false`.

### HTML

```html
<h1>Drawing with mouse events</h1>
<canvas id="myPics" width="560" height="360"></canvas>
```

### CSS

```css
canvas {
  border: 1px solid black;
  width: 560px;
  height: 360px;
}
```

### JavaScript

```js
// When true, moving the mouse draws on the canvas
let isDrawing = false;
let x = 0;
let y = 0;

const myPics = document.getElementById("myPics");
const context = myPics.getContext("2d");

// event.offsetX, event.offsetY gives the (x,y) offset from the edge of the canvas.

// Add the event listeners for mousedown, mousemove, and mouseup
myPics.addEventListener("mousedown", (e) => {
  x = e.offsetX;
  y = e.offsetY;
  isDrawing = true;
});

myPics.addEventListener("mousemove", (e) => {
  if (isDrawing) {
    drawLine(context, x, y, e.offsetX, e.offsetY);
    x = e.offsetX;
    y = e.offsetY;
  }
});

window.addEventListener("mouseup", (e) => {
  if (isDrawing) {
    drawLine(context, x, y, e.offsetX, e.offsetY);
    x = 0;
    y = 0;
    isDrawing = false;
  }
});

function drawLine(context, x1, y1, x2, y2) {
  context.beginPath();
  context.strokeStyle = "black";
  context.lineWidth = 1;
  context.moveTo(x1, y1);
  context.lineTo(x2, y2);
  context.stroke();
  context.closePath();
}
```

## See also

- Learn: Introduction to events
- `mousedown`
- `mouseup`
- `click`
- `dblclick`
- `mouseover`
- `mouseout`
- `mouseenter`
- `mouseleave`
- `contextmenu`
- `pointermove`
