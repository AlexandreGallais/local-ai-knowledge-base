---
title: "DelegatedInkTrailPresenter"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/delegatedinktrailpresenter/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# DelegatedInkTrailPresenter

The **`DelegatedInkTrailPresenter`** interface of the Ink API provides the ability to instruct the OS-level compositor to render ink strokes between pointer event dispatches.

## Instance properties

- `expectedImprovement` (deprecated) (non-standard) (read-only)
    Returns a value, in milliseconds, indicating the latency improvement that can be expected using this presenter.
- `presentationArea` (experimental) (read-only)
    Returns the `Element` inside which rendering of ink strokes is confined.

## Instance methods

- `updateInkTrailStartPoint()` (experimental)
    Passes the `PointerEvent` that was used as the last rendering point for the current frame, allowing the OS-level compositor to render a delegated ink trail ahead of the next pointer event being dispatched.

## Example

In this example, we draw a trail onto a 2D canvas. Near the start of the code, we call `Ink.requestPresenter()`, passing it the canvas as the presentation area for it to take care of and storing the promise it returns in the `presenter` variable.

Later on, in the `pointermove` event listener, the new position of the trailhead is drawn onto the canvas each time the event fires. In addition, the `DelegatedInkTrailPresenter` object returned when the `presenter` promise fulfills has its `updateInkTrailStartPoint()` method invoked; this is passed:

- The last trusted pointer event representing the rendering point for the current frame.
- A `style` object containing color and diameter settings.

The result is that a delegated ink trail is drawn ahead of the default browser rendering on the app's behalf, in the specified style, until the next time it receives a `pointermove` event.

```js
const ctx = canvas.getContext("2d");
let presenter = navigator.ink.requestPresenter({ presentationArea: canvas });
let moveCnt = 0;
let style = { color: "rgb(0 0 255 / 100%)", diameter: 10 };

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

canvas.addEventListener("pointermove", (evt) => {
  const pointSize = 10;
  ctx.fillStyle = "black";
  ctx.fillRect(evt.pageX, evt.pageY, pointSize, pointSize);
  if (moveCnt === 50) {
    let r = getRandomInt(0, 255);
    let g = getRandomInt(0, 255);
    let b = getRandomInt(0, 255);
    style = {
      color: `rgb(${r} ${g} ${b} / 100%)`,
      diameter: 10,
    };
    moveCnt = 0;
    document.getElementById("div").style.backgroundColor =
      `rgb(${r} ${g} ${b} / 100%)`;
  }
  moveCnt += 1;
  presenter.then((v) => {
    v.updateInkTrailStartPoint(evt, style);
  });
});

window.addEventListener("pointerdown", (evt) => {
  evt.pointerId;
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
});

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
```

> **Note:**
> See this example running live — Delegated ink trail.
