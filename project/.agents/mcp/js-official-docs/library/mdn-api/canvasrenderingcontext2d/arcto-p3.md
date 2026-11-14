---
title: "CanvasRenderingContext2D: arcTo() method (part 3 of 5)"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/canvasrenderingcontext2d/arcto/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# CanvasRenderingContext2D: arcTo() method (part 3 of 5)

### Constructing an arcTo() path

The demo shows the semi-infinite lines and circle with center _C_ tangent
to the lines at T1 and T2 used to
determine the path rendered by `arcTo()`.

Note that `arcTo` will create a straight line from P0
to P1 when all points are in a line. Additionally,
nothing is drawn by `arcTo` if P0 and
P1 have the same coordinates.

Besides being able to set the arc radius with the slider, the initial point
P0 and control points P1 and
P2 can be moved by dragging them with the mouse with the
left button down. The numeric values can also be edited, and the arrow keys
can be used to change an underlined element that is in focus.

```html
<div>
  <label for="arc-radius">arc radius <em>r</em></label>
  <input name="arc-radius" type="range" id="radius-slider" min="0" />
  <label
    for="arc-radius"
    id="value-r"
    class="input"
    contenteditable="true"></label>
</div>
<div>
  <span id="value-P0" class="input" tabindex="0">
    <em>P<sub>0</sub></em>
  </span>
  = (<span id="value-P0x" class="input" contenteditable="true"></span>,
  <span id="value-P0y" class="input" contenteditable="true"></span>)
  &nbsp;&nbsp;
  <span id="value-P1" class="input" tabindex="0">
    <em>P<sub>1</sub></em>
  </span>
  = (<span id="value-P1x" class="input" contenteditable="true"></span>,
  <span id="value-P1y" class="input" contenteditable="true"></span>)
  &nbsp;&nbsp;
  <span id="value-P2" class="input" tabindex="0">
    <em>P<sub>2</sub></em>
  </span>
  = (<span id="value-P2x" class="input" contenteditable="true"></span>,
  <span id="value-P2y" class="input" contenteditable="true"></span>)
</div>
<canvas id="canvas"></canvas>
<div>
  <em>T<sub>1</sub></em> = <span id="value-T1"></span>
</div>
<div>
  <em>T<sub>2</sub></em> = <span id="value-T2"></span>
</div>
<div><em>C</em> = <span id="value-C"></span></div>
```

```css
label {
  margin: 10px;
}
.input {
  color: blue;
  text-decoration: underline;
}
#canvas {
  border: 1px solid black;
}
```
