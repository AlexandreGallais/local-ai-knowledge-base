---
title: "`offset-path` CSS property"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/properties/offset-path/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `offset-path` CSS property

The **`offset-path`** CSS property specifies a path for an element to follow and determines the element's positioning within the path's parent container or the SVG coordinate system. The path is a line, a curve, or a geometrical shape along which the element gets positioned or moves.

The `offset-path` property is used in combination with the `offset-distance`, `offset-rotate`, and `offset-anchor` properties to control the position and orientation of the element along a path.

```css
offset-path: path("M-70,-40 C-70,70 70,70 70,-40");
```

```css
offset-path: path("M0,0 L60,70 L-60,30z");
```

```html
<section class="default-example" id="default-example">
  <div class="transition-all" id="example-element"></div>
  <button id="playback" type="button">Play</button>
</section>
```

```css
#example-element {
  width: 24px;
  height: 24px;
  background: #2bc4a2;
  animation: distance 8000ms infinite linear;
  animation-play-state: paused;
  clip-path: polygon(0% 0%, 70% 0%, 100% 50%, 70% 100%, 0% 100%, 30% 50%);
}

#example-element.running {
  animation-play-state: running;
}

#playback {
  position: absolute;
  top: 0;
  left: 0;
  font-size: 1em;
}

@keyframes distance {
  0% {
    offset-distance: 0%;
  }
  100% {
    offset-distance: 100%;
  }
}

#default-example {
  position: relative;
}
```

```js
const example = document.getElementById("example-element");
const button = document.getElementById("playback");

button.addEventListener("click", () => {
  if (example.classList.contains("running")) {
    example.classList.remove("running");
    button.textContent = "Play";
  } else {
    example.classList.add("running");
    button.textContent = "Pause";
  }
});
```

## Syntax

```css
/* Default */
offset-path: none;

/* Line segment */
offset-path: ray(45deg closest-side contain);
offset-path: ray(contain 150deg at center center);
offset-path: ray(45deg);

/* URL */
offset-path: url("#my-circle");

/* Basic shape */
offset-path: circle(50% at 25% 25%);
offset-path: ellipse(50% 50% at 25% 25%);
offset-path: inset(50% 50% 50% 50%);
offset-path: polygon(30% 0%, 70% 0%, 100% 50%, 30% 100%, 0% 70%, 0% 30%);
offset-path: path("M 0,200 Q 200,200 260,80 Q 290,20 400,0 Q 300,100 400,200");
offset-path: rect(5px 5px 160px 145px round 20%);
offset-path: xywh(0 5px 100% 75% round 15% 0);

/* Coordinate box */
offset-path: content-box;
offset-path: padding-box;
offset-path: border-box;
offset-path: fill-box;
offset-path: stroke-box;
offset-path: view-box;

/* Global values */
offset-path: inherit;
offset-path: initial;
offset-path: revert;
offset-path: revert-layer;
offset-path: unset;
```

### Values

The `offset-path` property takes as its value an `<offset-path>` value, a `<coord-box>` value, or both, or the `none` keyword. The `<offset-path>` value is a `ray()` function, a `<url>` value, or a `basic-shape` value.

- `none`
    Specifies that the element does not follow any offset path. The `none` value is equivalent to the element not having any offset transform. The element's movement in this case is determined by its default position properties, such as `top` and `left`, instead of an offset path. This is the default value.

- `<offset-path>`
    A `ray()` function, a `<url>` value, or a `<basic-shape>` value that specifies the geometrical offset path. If omitted, the path shape for the `<coord-box>` value is `inset(0 round X)`, where `X` is the value of `border-radius` of the element that establishes the containing block.
    - `ray()`
        Defines a line starting at a set position, of a set length, and extending at the specified angle. The `ray()` function accepts up to four parameters – an `angle`, an optional size value, the optional keyword `contain`, and an optional `at <position>`.

    - `<url>`
        Specifies the ID of an SVG shape element. The path is the shape of the SVG `<circle>`, `<ellipse>`, `<line>`, ``, `<polygon>`, `<polyline>`, or `<rect>` element referenced by its `id` in the `url()` function. If the URL does not reference a shape element or is otherwise invalid, the resolved value for the offset path is `path("M0,0")` (which is a valid `<basic-shape>` value).

    - `basic-shape`
        Specifies the offset path as the equivalent path of a CSS basic shape function, such as `circle()`, `ellipse()`, `inset()`, `path()`, `polygon()`, `rect()`, or `xywh()`. For example, if the `<basic_shape>` is an `ellipse()` function, then the path is the outline of the ellipse, starting at the rightmost point of the ellipse, proceeding clockwise through a full rotation. For `ellipse()` and `circle()`, which accept the `at <position>` parameter, if the `<position>` is omitted, the position defaults to `center` unless the element has an `offset-position` specified. In this case, the `offset-position` value is used for the `at <position>` parameter. More complex shapes can be defined using the `shape()` function.

- `<coord-box>`
    Specifies the size information of the reference box containing the path. The reference box is derived from the element that establishes the containing block for this element. This parameter is optional. If not specified, the default value is `border-box` in CSS contexts. In SVG contexts, the value is treated as `view-box`. If `ray()` or `<basic-shape>` is used to define the offset path, the `<coord-box>` value provides the reference box for the ray or the `<basic-shape>`, respectively. If `<url>` is used to define the offset path, the `<coord-box>` value provides the viewport and user coordinate system for the shape element, with the origin (`0 0`) at the top left corner and size being `1px`.

## Description

The `offset-path` property defines a path an animated element can follow. An offset path is either a specified path with one or multiple sub-paths or the geometry of a not-styled basic shape. The element's exact position on the offset path is determined by the `offset-distance` property. Each shape or path must define an initial position for the computed value of `0` for `offset-distance` and an initial direction which specifies the rotation of the object to the initial position.

Early versions of the spec called this property `motion-path`. It was changed to `offset-path` because the property describes static positions, not motion.

## Examples

### Creating an offset-path using box-edge positioning

This example demonstrates using various `<coord-box>` values in the `offset-path` property.

```html
<div class="box blueBox"></div>
<div class="box redBox"></div>
<div class="box greenBox"></div>
```

```css
body {
  width: 300px;
  height: 200px;
  border-radius: 50px;
  border: dashed aqua;
  border-width: 25px;
  padding: 25px;
  margin: 50px;
}
```

```css
.box {
  width: 40px;
  height: 20px;
  animation: move 8000ms infinite ease-in-out;
}

.blueBox {
  background-color: blue;
  offset-path: border-box;
  offset-distance: 5%;
}

.greenBox {
  background-color: green;
  offset-path: padding-box;
  offset-distance: 8%;
}

.redBox {
  background-color: red;
  offset-path: content-box;
  offset-distance: 12%;
}

@keyframes move {
  0%,
  20% {
    offset-distance: 0%;
  }
  80%,
  100% {
    offset-distance: 100%;
  }
}
```

In this example, the margin, border, and padding have been purposely given large values to demonstrate the placement of the blue, green, and red rectangles on their respective `<coord-box>` edges: border-box, padding-box, and content-box.

#### Result

### Creating an offset-path using path()

In this example, the `` element creates a house with a chimney and also defines two halves of a scissor. The house and chimney are composed of rectangles and polygons, and the scissor halves are represented by two distinct path elements. In the CSS code, the `offset-path` property is used to specify a path to follow for the two scissor halves. This CSS-defined path is identical to the one represented by the `` element in the SVG, which is the outline of the house including the chimney.

```html
<svg
  xmlns="http://www.w3.org/2000/svg"
  width="700"
  height="450"
  viewBox="350 0 1400 900">
  <title>House and Scissors</title>
  <rect x="595" y="423" width="610" height="377" fill="blue" />
  <polygon points="506,423 900,190 1294,423" fill="yellow" />
  <polygon points="993,245 993,190 1086,190 1086,300" fill="red" />
  <path
    id="house"
    d="M900,190 L993,245 V201 A11,11 0 0,1 1004,190 H1075 A11,11 0 0,1 1086,201 V300 L1294,423 H1216 A11,11 0 0,0 1205,434 V789 A11,11 0 0,1 1194,800 H606 A11,11 0 0,1 595,789 V434 A11,11 0 0,0 584,423 H506 L900,190"
    fill="none"
    stroke="black"
    stroke-width="13"
    stroke-linejoin="round"
    stroke-linecap="round" />
  <path
    id="first-scissor-half"
    class="scissor-half"
    d="M30,0 H-10 A10,10 0 0,0 -20,10 A20,20 0 1,1 -40,-10 H20 A10,10 0 0,1 30,0 M-40,20 A10,10 1 0,0 -40,0 A10,10 1 0,0 -40,20 M0,0" />
  <path
    id="second-scissor-half"
    class="scissor-half"
    d="M30,0 H-10 A10,10 0 0,1 -20,-10 A20,20 0 1,0 -40,10 H20 A10,10 0 0,0 30,0 M-40,-20 A10,10 1 0,0 -40,0 A10,10 1 0,0 -40,-20 M0,0" />
</svg>
```

```css
.scissor-half {
  offset-path: path(
    "M900,190 L993,245 V201 A11,11 0 0,1 1004,190 H1075 A11,11 0 0,1 1086,201 V300 L1294,423 H1216 A11,11 0 0,0 1205,434 V789 A11,11 0 0,1 1194,800 H606 A11,11 0 0,1 595,789 V434 A11,11 0 0,0 584,423 H506 L900,190"
  );
  transform: translate(0px, 0px);
  fill: green;
  stroke: black;
  stroke-width: 5px;
  stroke-linejoin: round;
  stroke-linecap: round;
  fill-rule: evenodd;
  offset-anchor: 0 0;
}

#first-scissor-half {
  animation:
    move 12s linear infinite,
    rotate-left 1s infinite;
}
#second-scissor-half {
  animation:
    move 12s linear infinite,
    rotate-right 1s infinite;
}

@keyframes move {
  from {
    offset-distance: 0%;
  }
  to {
    offset-distance: 100%;
  }
}

@keyframes rotate-left {
  0% {
    offset-rotate: auto 0deg;
  }
  50% {
    offset-rotate: auto -45deg;
  }
  100% {
    offset-rotate: auto 0deg;
  }
}

@keyframes rotate-right {
  0% {
    offset-rotate: auto 0deg;
  }
  50% {
    offset-rotate: auto 45deg;
  }
  100% {
    offset-rotate: auto 0deg;
  }
}
```

#### Result

Without the `offset-path` property, the two halves of the scissors would default to the top-left corner of the canvas. However, by using `offset-path`, the two scissor halves are aligned with the starting point of the SVG path, allowing them to move along it.

### Creating an offset-path using url()

This example illustrates how to refer to an SVG shape to define the shape of the path that an element can follow. The green circle (defined by `.target`) follows the path of a rectangle, which is defined by passing the SVG shape's ID (`svgRect`) to the `offset-path` property by using `url()`.

The SVG rectangle that defines the path shape is shown here only to visually demonstrate that the green circle is indeed following the path defined by this rectangle.

```html
<div class="outer">
  <div class="target"></div>
</div>
<svg width="400" height="200" xmlns="http://www.w3.org/2000/svg">
  <rect id="svgRect" x="50" y="50" width="200" height="100" />
</svg>
```

```css
.outer {
  position: absolute;
}
```

```css
.target {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: green;
  offset-path: url("#svgRect");
  offset-anchor: auto;
  animation: move 5s linear infinite;
}

#svgRect {
  fill: antiquewhite;
  stroke: black;
  stroke-width: 2;
}

@keyframes move {
  0% {
    offset-distance: 0%;
  }
  100% {
    offset-distance: 100%;
  }
}
```

### Different shapes

This example involves different `basic-shape` values: `circle()`, `ellipse()`, `inset()`, `polygon()`.

```html
<div class="container">
  <div class="mover mover-path">path()</div>
  <div class="mover mover-circle">circle()</div>
  <div class="mover mover-ellipse">ellipse()</div>
  <div class="mover mover-inset">inset()</div>
  <div class="mover mover-polygon">polygon()</div>
</div>
```

```css
.container {
  border: 1px solid black;
  width: 80vw;
  height: 80vh;
  position: relative;
  left: 10vw;
  top: 10vh;
}

.mover {
  width: 100px;
  height: 80px;
  border-radius: 50%;
  line-height: 80px;
  text-indent: 10px;
  background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' id='e644da42-a34e-4ceb-a89a-89a4eb6dcc51' data-name='Layer 1' viewBox='0 0 71.08 54.62'%3E%3Ctitle%3Epointer-hand%3C/title%3E%3Cpath d='M43.56,49.35a5.24,5.24,0,0,0-1.27-3.43,5.26,5.26,0,0,0,1.86-9,5.26,5.26,0,0,0-.5-9.53L66.12,27c2.28-.07,5-1.57,5-4.58a5.06,5.06,0,0,0-4.58-4.83L34.08,17c3.48-2.89,6.26-6.55,6.73-11.08C41.45-.14,36.07-1.15,35,1.09,32,7.11,23,12.75,17.42,15.52,8.64,19.08,0,19.77,0,34.56,0,42.7,2.7,47.94,9.42,51c5.51,2.52,13.71,3.59,25.36,3.59H38.3A5.27,5.27,0,0,0,43.56,49.35Z'/%3E%3C/svg%3E")
    no-repeat;
  background-size: cover;
  color: white;
  animation: move 10s linear infinite;
  font-family: monospace;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  transform-origin: center center;
}
.mover-path {
  top: 50px;
  motion-path: path(
    "M18.45,58.46s52.87-70.07,101.25-.75,101.75-6.23,101.75-6.23S246.38,5.59,165.33,9.08s-15,71.57-94.51,74.56S18.45,58.46,18.45,58.46Z"
  );
  offset-path: path(
    "M18.45,58.46s52.87-70.07,101.25-.75,101.75-6.23,101.75-6.23S246.38,5.59,165.33,9.08s-15,71.57-94.51,74.56S18.45,58.46,18.45,58.46Z"
  );
}
.mover-circle {
  top: 150px;
  offset-path: circle(100px at 50px 50px);
  motion-path: circle(100px at 50px 50px);
}
.mover-ellipse {
  top: 250px;
  offset-path: ellipse(25% 40% at 50% 50%);
  motion-path: ellipse(25% 40% at 50% 50%);
}
.mover-inset {
  top: 350px;
  offset-path: inset(5% 20% 15% 10%);
  motion-path: inset(5% 20% 15% 10%);
}
.mover-polygon {
  top: 450px;
  offset-path: polygon(
    30% 0%,
    70% 0%,
    100% 30%,
    100% 70%,
    70% 100%,
    30% 100%,
    0% 70%,
    0% 30%
  );
  motion-path: polygon(
    30% 0%,
    70% 0%,
    100% 30%,
    100% 70%,
    70% 100%,
    30% 100%,
    0% 70%,
    0% 30%
  );
}

@keyframes move {
  100% {
    motion-offset: 100%;
    offset-distance: 100%;
  }
}
```

## See also

- `offset`
- `offset-distance`
- `offset-rotate`
- SVG paths tutorial
- `path()`
