---
title: "Ink API"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/ink_api/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Ink API

The Ink API allows browsers to directly make use of available OS-level compositors when drawing pen strokes in an inking app feature, thereby reducing latency and increasing performance.

## Concepts and usage

Inking on the web refers to app features that involve using pointer events to draw a smooth pen stroke — for example, a drawing app or document signing feature.

Pointers events are usually sent first to the browser process, which then forwards these events to the JavaScript event loop to execute the associated handler functions and render the result in the app. The time delay between the start and finish of this process can be significant, resulting in latency between the user initiating drawing (for example, with a stylus or mouse), and the stroke showing up on the screen.

The Ink API significantly reduces this latency by allowing browsers to bypass the JavaScript event loop entirely. Where possible, browsers will pass such rendering instructions directly to OS-level compositors. If the underlying operating system does not have a specialized OS-level compositor to use for this purpose, browsers will use their own optimized rendering code. This is not as powerful as a compositor, but it still confers some improvements.

> **Note:**
> Compositors are part of the rendering machinery that draws the UI to the screen in a browser or operating system. See Inside look at modern web browser (part 3) for some interesting insights into how a compositor functions inside a web browser.

The entry point is the `Navigator.ink` property, which returns an `Ink` object for the current document. The `Ink.requestPresenter()` method returns a `Promise` that fulfills with a `DelegatedInkTrailPresenter` object instance. This instructs the OS-level compositor to render ink strokes between pointer event dispatches in the next available frame in each case.

## Interfaces

- `Ink` (experimental)
    Provides access to `DelegatedInkTrailPresenter` objects for the application to use to render the strokes.
- `DelegatedInkTrailPresenter` (experimental)
    Instructs the OS-level compositor to render ink strokes between pointer event dispatches.

### Extensions to other interfaces

- `Navigator.ink` (read-only) (experimental)
    Returns an `Ink` object for the current document.

## Examples

### Drawing an ink trail

In this example, we draw a trail onto a 2D canvas. Near the start of the code, we call `Ink.requestPresenter()`, passing it the canvas as the presentation area for it to take care of and storing the promise it returns in the `presenter` variable.

Later on, in the `pointermove` event listener, the new position of the trailhead is drawn onto the canvas each time the event fires. In addition, the `DelegatedInkTrailPresenter` object returned when the `presenter` promise fulfills has its `updateInkTrailStartPoint()` method invoked; this is passed:

- The last trusted pointer event representing the rendering point for the current frame.
- A `style` object containing color and diameter settings.

The result is that a delegated ink trail is drawn ahead of the default browser rendering on the app's behalf, in the specified style, until the next time it receives a `pointermove` event.

#### HTML

```html
<canvas id="my-canvas"></canvas>
<div id="div">Delegated ink trail should match the color of this div.</div>
```

#### CSS

```css
div {
  background-color: lime;
  position: fixed;
  top: 1rem;
  left: 1rem;
}
```

#### JavaScript

```js
const canvas = document.getElementById("my-canvas");
const ctx = canvas.getContext("2d");
const presenter = navigator.ink.requestPresenter({ presentationArea: canvas });
let moveCnt = 0;
let style = { color: "lime", diameter: 10 };

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

canvas.addEventListener("pointermove", async (evt) => {
  const pointSize = 10;
  ctx.fillStyle = style.color;
  ctx.fillRect(evt.pageX, evt.pageY, pointSize, pointSize);
  if (moveCnt === 20) {
    const r = getRandomInt(0, 255);
    const g = getRandomInt(0, 255);
    const b = getRandomInt(0, 255);

    style = { color: `rgb(${r} ${g} ${b} / 100%)`, diameter: 10 };
    moveCnt = 0;
    document.getElementById("div").style.backgroundColor =
      `rgb(${r} ${g} ${b} / 60%)`;
  }
  moveCnt += 1;
  (await presenter).updateInkTrailStartPoint(evt, style);
});

window.addEventListener("pointerdown", () => {
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
});

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
```

#### Result
