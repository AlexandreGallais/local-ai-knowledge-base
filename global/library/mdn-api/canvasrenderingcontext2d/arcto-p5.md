---
title: "CanvasRenderingContext2D: arcTo() method (part 5 of 5)"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/canvasrenderingcontext2d/arcto/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# CanvasRenderingContext2D: arcTo() method (part 5 of 5)

```js
  ),
  new TextInput(
    "value-P0y",
    null,
    state.canvasSize.y,
    () => state.controlPoints[0].y,
    (value) => (state.controlPoints[0].y = value),
  ),
  new TextInput(
    "value-P1x",
    null,
    state.canvasSize.x,
    () => state.controlPoints[1].x,
    (value) => (state.controlPoints[1].x = value),
  ),
  new TextInput(
    "value-P1y",
    null,
    state.canvasSize.y,
    () => state.controlPoints[1].y,
    (value) => (state.controlPoints[1].y = value),
  ),
  new TextInput(
    "value-P2x",
    null,
    state.canvasSize.x,
    () => state.controlPoints[2].x,
    (value) => (state.controlPoints[2].x = value),
  ),
  new TextInput(
    "value-P2y",
    null,
    state.canvasSize.y,
    () => state.controlPoints[2].y,
    (value) => (state.controlPoints[2].y = value),
  ),
];

/* Finds index and distance delta of first point in an array that is
 * closest to the specified point or returns index of -1 if none */
function hitTestPoints(pointAt, points, hitDistance) {
  const n = points.length;
  const delta = Math2D.vector();
  for (let i = 0; i < n; i++) {
    Math2D.subtract(delta, pointAt, points[i]);
    if (Math2D.L2(delta) <= hitDistance) {
      return [i, delta];
    }
  }
  return [-1]; // no hit
}

/* Move the active point, which must exist when called, to
 * its new point based on the cursor location and the offset of
 * the cursor to the center of the point */
function moveActivePointAndUpdate(pointCursor) {
  let pointAdjusted = Math2D.point();
  Math2D.subtract(pointAdjusted, pointCursor, state.mouseDelta);

  /* Adjust location to keep point on canvas */
  if (pointAdjusted.x < 0) {
    pointAdjusted.x = 0;
  } else if (pointAdjusted.x >= state.canvasSize.x) {
    pointAdjusted.x = state.canvasSize.x;
  }
  if (pointAdjusted.y < 0) {
    pointAdjusted.y = 0;
  } else if (pointAdjusted.y >= state.canvasSize.y) {
    pointAdjusted.y = state.canvasSize.y;
  }

  /* Set point */
  const index = state.pointActiveIndex;
  const pt = state.controlPoints[index];
  let isPointChanged = false;
  let indexTextInput = 1 + 2 * index;
  if (pt.x !== pointAdjusted.x) {
    isPointChanged = true;
    pt.x = pointAdjusted.x;
    textInputs[indexTextInput].elementText.textContent = pointAdjusted.x;
  }
  if (pt.y !== pointAdjusted.y) {
    isPointChanged = true;
    pt.y = pointAdjusted.y;
    textInputs[indexTextInput + 1].elementText.textContent = pointAdjusted.y;
  }

  if (isPointChanged) {
    // Update results if x or y changed
    updateResults();
  }
}

/* Handle a mouse move for either a mousemove event or mouseenter */
function doMouseMove(pointCursor, rBtnDown) {
  /* Test for active move. If so, move accordingly based on the
   * cursor position. The right button down flag handles the case
   * where the cursor leaves the canvas with the right button down
   * and enters with it up (not moving) or down (moving). It
   * also helps to handle unreliable delivery of mouse events. */
  if (state.pointActiveIndex >= 0 && state.pointActiveMoving && rBtnDown) {
    /* A point was moving and is moving more */
    moveActivePointAndUpdate(pointCursor);
    return;
  }

  /* If there is not an active move with the right button down,
   * update active state based on hit testing. Mouse events have
   * been found to not be reliably delivered sometimes, particularly
   * with Chrome, so the programming must handle this issue */
  state.pointActiveMoving = false; // not moving

  const [pointHitIndex, testDelta] = hitTestPoints(
    pointCursor,
    state.controlPoints,
    state.hitDistance,
  );
  state.pointActiveIndex = pointHitIndex;
  canvas.style.cursor = pointHitIndex < 0 ? "auto" : "pointer";
}

/* Allow arrow key <example-value> on the point labels to move the point in
 * x and y directions */
function addPointArrowMove(indexPoint) {
  const elem = document.getElementById(`value-P${indexPoint}`);
  let indexTextInput = 2 * indexPoint + 1;
  elem.addEventListener("keydown", (evt) => {
    let valueNew;
    let indexActive = indexTextInput;
    switch (evt.code) {
      case "ArrowLeft": // left arrow -- dec x by 1
        valueNew = textInputs[indexActive].getStateValue() - 1;
        evt.preventDefault();
        break;
      case "ArrowUp": // up arrow -- dec y by 1
        valueNew = textInputs[++indexActive].getStateValue() - 1;
        evt.preventDefault();
        break;
      case "ArrowRight": // right arrow -- inc x by 1
        valueNew = textInputs[indexActive].getStateValue() + 1;
        evt.preventDefault();
        break;
      case "ArrowDown": // down arrow -- inc y by 1
        valueNew = textInputs[++indexActive].getStateValue() + 1;
        evt.preventDefault();
        break;
      default: // ignore all others
        return;
    }

    textInputs[indexActive].updateFull(valueNew); // do update
  });
}

function addPointArrowMoves() {
  [0, 1, 2].forEach((value) => addPointArrowMove(value));
}

/* Radius slider update */
const controlR = document.getElementById("radius-slider");
controlR.value = state.radius; // match initial value with state
controlR.max = state.radiusMax;
controlR.addEventListener("input", (evt) => {
  textInputs[0].elementText.textContent = controlR.value;
  state.radius = controlR.value;
  updateResults();
});

/* Allow arrow keystrokes to alter point location */
addPointArrowMoves();

/* Initialize the text inputs from the associated state values */
textInputs.forEach((ti) => (ti.elementText.textContent = ti.getStateValue()));

/* Mouse may move a moving point, move over and hover an unhovered
 * point, move across a hovered point, or move on other parts of
 * the canvas */
canvas.addEventListener("mousemove", (evt) =>
  doMouseMove(Math2D.point(evt.offsetX, evt.offsetY), (evt.buttons & 1) === 1),
);

/* Left mouse press on hovered point transitions to a moving point */
canvas.addEventListener("mousedown", (evt) => {
  if (evt.button !== 0) {
    // ignore all but left clicks
    return;
  }

  const [pointHitIndex, testDelta] = hitTestPoints(
    Math2D.point(evt.offsetX, evt.offsetY),
    state.controlPoints,
    state.hitDistance,
  );
  if (pointHitIndex < 0) {
    // cursor over no point
    return; // nothing to do
  }

  /* Cursor over (hovered) point */
  state.pointActiveMoving = true; // point now moving
  canvas.style.cursor = "move"; // Set to moving cursor
  state.mouseDelta = testDelta; // dist of cursor from point center
});

/* Left mouse release if moving point transitions to a hovering point */
canvas.addEventListener("mouseup", (evt) => {
  if (evt.button !== 0) {
    // ignore all but left clicks
    return;
  }

  /* If there was a moving point, it transitions to a hovering
   * point */
  if (state.pointActiveMoving) {
    state.pointActiveMoving = false; // point now hovering
    canvas.style.cursor = "pointer";
  }
});

/* Handle case that mouse reenters canvas with point moving.
 * If left button down on entry, continue move; otherwise stop
 * move. May also need to adjust hovering state */
canvas.addEventListener("mouseenter", (evt) =>
  doMouseMove(Math2D.point(evt.offsetX, evt.offsetY), (evt.buttons & 1) === 1),
);

drawCanvas(); // Draw initial canvas
ConstructionPoints.print(state.T1, state.T2, state.C); // output pts
```

### Animating `arcTo()` drawing

For this example, you can play around with the arc radius to see how
the path changes. The path is drawn from the starting point _p0_ using `arcTo()` with control points
_p1_ and _p2_ and a radius that varies from 0 to the maximum radius selected with the slider.
Then a `lineTo()` call completes the path to _p2_.

#### HTML

```html
<div>
  <label for="radius">Radius: </label>
  <input name="radius" type="range" id="radius" min="0" max="100" value="50" />
  <label for="radius" id="radius-output">50</label>
</div>
<canvas id="canvas"></canvas>
```

#### JavaScript

```js
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const controlOut = document.getElementById("radius-output");
const control = document.getElementById("radius");
let radius = control.value; // match with init control value
control.oninput = () => {
  controlOut.textContent = radius = control.value;
};

const p1 = { x: 100, y: 100 };
const p2 = { x: 150, y: 50 };
const p3 = { x: 200, y: 100 };

function labelPoint(p, offset, i = 0) {
  const { x, y } = offset;
  ctx.beginPath();
  ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillText(`${i}:(${p.x}, ${p.y})`, p.x + x, p.y + y);
}

function drawPoints(points) {
  points.forEach((p, i) => {
    labelPoint(p, { x: 0, y: -20 }, `p${i}`);
  });
}

// Draw arc
function drawArc([p0, p1, p2], r) {
  ctx.beginPath();
  ctx.moveTo(p0.x, p0.y);
  ctx.arcTo(p1.x, p1.y, p2.x, p2.y, r);
  ctx.lineTo(p2.x, p2.y);
  ctx.stroke();
}

function loop(t) {
  const angle = (t / 1000) % (2 * Math.PI);
  const rr = Math.abs(Math.cos(angle) * radius);

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  drawArc([p1, p2, p3], rr);
  drawPoints([p1, p2, p3]);
  requestAnimationFrame(loop);
}

loop(0);
```

#### Result

## See also

- The interface defining this method: `CanvasRenderingContext2D`
