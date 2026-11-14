---
title: "Scripting SVG with JavaScript"
tool: "mdn-svg"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/svg/guides/scripting/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Scripting SVG with JavaScript

SVG elements are part of the DOM, so the DOM APIs you might already be using with HTML, such as `querySelector()`, `addEventListener()`, and `setAttribute()`, work on SVG too. This guide covers the parts that are specific to SVG:

- Where scripts in an SVG run, and where they don't.
- Creating SVG elements from script, which needs the SVG namespace.
- The SVG-specific parts of event handling and styling.
- Scripting an SVG document that is embedded in an HTML page.
- SVG DOM interfaces that have no HTML equivalent.

## Where scripts run

How you script an SVG depends on how it got onto the page:

- **Inline SVG in an HTML document.** The SVG elements are nodes in the HTML document, so the page's own scripts can query and modify them directly. This is the simplest case and the one used throughout this guide.
- **A standalone SVG document.** An SVG file can carry its own scripts in the SVG `<script>` element. Those scripts run when the file is loaded as a document: opened directly, or embedded with `<object>`, ``, or ``.
- **SVG used as an image.** When an SVG is referenced by ``, the SVG `<image>` element, or a CSS property such as `background-image`, it is rendered in a secure, non-interactive mode: its scripts never run and its links can't be activated. See SVG as an image.

Wherever the script lives, the same DOM APIs are available. Here an SVG `<script>` element finds a circle and adds a listener to it:

```html
<svg
  viewBox="0 0 100 100"
  width="100"
  height="100"
  xmlns="http://www.w3.org/2000/svg">
  <circle id="dot" cx="50" cy="50" r="40" fill="steelblue" />
  <script>
    let colorIndex = 0;
    document.getElementById("dot").addEventListener("click", (event) => {
      colorIndex = (colorIndex + 1) % 2;
      event.target.setAttribute(
        "fill",
        ["steelblue", "lightskyblue"][colorIndex],
      );
    });
  </script>
</svg>
```

Click the circle to run the script:

> **Note:**
> The example above is inline in an HTML document. The same markup saved as a standalone `.svg` file is parsed as XML, where a `<` or `&` in script text ends up being parsed as markup. Escape those characters, or wrap the script in a `<![CDATA[ … ]]>` section.

## Creating SVG elements

SVG elements live in the SVG namespace, `http://www.w3.org/2000/svg`. The `Document.createElement()` method never creates elements in this namespace, so SVG elements must be created with `Document.createElementNS()`.

This example starts with an empty `` element, so everything it draws comes from the script:

```html
<svg
  viewBox="0 0 100 100"
  width="100"
  height="100"
  xmlns="http://www.w3.org/2000/svg"></svg>
```

The script creates a circle in the SVG namespace, sets its geometry, and appends it:

```js
const svgNS = "http://www.w3.org/2000/svg";
const circle = document.createElementNS(svgNS, "circle");
circle.setAttribute("cx", 50);
circle.setAttribute("cy", 50);
circle.setAttribute("r", 40);
circle.setAttribute("fill", "steelblue");
document.querySelector("svg").append(circle);
```

The result is a circle the markup never mentioned:

Using `document.createElement("circle")` here creates an unknown HTML element that happens to be named `circle`: it will be inserted into the tree but render nothing, leaving the graphic as empty as its markup.

Attributes don't need the same treatment. Apart from a few legacy ones such as the deprecated `xlink:href`, SVG attributes are not namespaced, so plain `Element.setAttribute()` suffices. `Element.setAttributeNS()` with a `null` namespace does the same thing more verbosely.

Read the XML namespaces guide for a more in-depth analysis.

## Handling events

SVG and HTML elements share the same event model, so event handling in SVG is the same as in HTML. Attach listeners with `addEventListener()`. Events bubble up through the SVG tree, so you can put a single listener on the root `` element and identify the shape that was clicked from `event.target`.

Call `Event.preventDefault()` to suppress a browser default that gets in the way: for example, the text selection that happens while dragging a shape, or the navigation that follows a click on a shape wrapped in an `` element you want to handle in script.

## Converting pointer coordinates to user units

Pointer events report coordinates in CSS pixels relative to the viewport, but the shapes are positioned in the user coordinate system set up by `viewBox`. The two differ by the SVG's position on the page, and by a scale factor whenever the SVG isn't displayed at exactly the size of its `viewBox`.

This example makes the scale factor visible. The `viewBox` is 100 by 50 user units displayed at 400 by 200 CSS pixels, so one user unit is four CSS pixels along both dimensions. The markup has a background rectangle, a marker for the script to move, and an `<output>` for the numbers:

```html
<svg
  id="grid"
  viewBox="0 0 100 50"
  width="400"
  height="200"
  xmlns="http://www.w3.org/2000/svg">
  <rect width="100" height="50" fill="whitesmoke" />
  <circle id="marker" cx="-10" cy="-10" r="3" fill="crimson" />
</svg>
<output id="readout">Move the pointer over the graphic.</output>
```

The marker starts outside the `viewBox`, so it isn't visible until the pointer moves.

```css
svg {
  border: 1px solid gray;
}

output {
  display: block;
  margin-top: 0.5rem;
  font-family: monospace;
}
```

The `SVGGraphicsElement.getScreenCTM()` method returns a _screen coordinate transformation matrix_ (screen CTM), which, when applied to a `DOMPoint` in the user coordinate space, gives the same point in client coordinate space (confusingly, not screen coordinate space). Here, we already have the event coordinates in the client coordinate space, so to do the reverse transformation, we apply the _inverse_ of the screen CTM to the point using `DOMPointReadOnly.matrixTransform()`.

```js
const svg = document.getElementById("grid");
const marker = document.getElementById("marker");
const readout = document.getElementById("readout");

function toUserSpace(svg, event) {
  const point = new DOMPoint(event.clientX, event.clientY);
  return point.matrixTransform(svg.getScreenCTM().inverse());
}

svg.addEventListener("pointermove", (event) => {
  const { x, y } = toUserSpace(svg, event);
  marker.setAttribute("cx", x);
  marker.setAttribute("cy", y);
  readout.textContent = `client: ${Math.round(event.clientX)}, ${Math.round(event.clientY)}; user: ${x.toFixed(1)}, ${y.toFixed(1)}`;
});
```

Compare the two coordinate pairs as you move the pointer:

Using `getScreenCTM()` is much more robust than doing the same scaling and shifting yourself, because it automatically updates if the SVG element's size or position on the screen changes.

## Adding and removing elements according to click position

This example puts the pieces together: one listener on the root `` element adds a circle where you click, or removes the circle you clicked on.

The markup is an empty SVG with a background rectangle, which gives the clicks something to land on:

```html
<svg
  id="diagram"
  viewBox="0 0 300 150"
  width="300"
  height="150"
  xmlns="http://www.w3.org/2000/svg">
  <rect width="300" height="150" fill="whitesmoke" />
</svg>
```

```css
circle {
  cursor: pointer;
}
```

The click listener checks what was clicked: a circle is removed, and a click anywhere else creates a new circle at the pointer position, converted to user units by the same `toUserSpace()` function:

```js
const svgNS = "http://www.w3.org/2000/svg";
const diagram = document.getElementById("diagram");

function toUserSpace(svg, event) {
  const point = new DOMPoint(event.clientX, event.clientY);
  return point.matrixTransform(svg.getScreenCTM().inverse());
}

diagram.addEventListener("click", (event) => {
  if (event.target.localName === "circle") {
    event.target.remove();
    return;
  }

  const { x, y } = toUserSpace(diagram, event);
  const circle = document.createElementNS(svgNS, "circle");
  circle.setAttribute("cx", x);
  circle.setAttribute("cy", y);
  circle.setAttribute("r", 12);
  circle.setAttribute("fill", "steelblue");
  diagram.append(circle);
});
```

Because the click listener is on the root `` element, it sees clicks on every shape inside it, and `event.target` says which one. The comparison uses `localName`, which is the element's name without any namespace prefix, so it also matches in a standalone SVG file that writes its elements as ``.

Click the SVG to add a circle, or click a circle to remove it:

## Styling from script

There are two ways to style SVG elements: with presentation attributes and with CSS. Both can be scripted.

To apply styles using presentation attributes, set the attribute using general DOM methods:

```js
circle.setAttribute("fill-opacity", 0.5);
```

To apply styles using CSS, use techniques you are already familiar with from HTML, such as using the CSSOM like `SVGElement.style`:

```js
circle.style.fillOpacity = 0.5;
```

Presentation attributes are treated as author-origin declarations with a specificity of zero, inserted at the start of the author style sheet, so any rule in a style sheet overrides them. On the other hand, inline styles set with `element.style` take precedence over normal style sheet declarations.

This example starts with two identical circles:

```html
<svg
  viewBox="0 0 220 100"
  width="220"
  height="100"
  xmlns="http://www.w3.org/2000/svg">
  <circle id="left" cx="50" cy="50" r="40" fill="steelblue" />
  <circle id="right" cx="160" cy="50" r="40" fill="steelblue" />
</svg>
<button id="apply">Apply styles</button>
<button id="reset">Reset styles</button>
```

The style sheet defines a `selected` class for the script to apply:

```css
.selected {
  stroke: crimson;
  stroke-width: 4;
}
```

Both circles are made translucent through the `style` property, in two equivalent ways: the camel-cased property name, and `CSSStyleDeclaration.setProperty()` with the hyphenated name. `setProperty()` takes an optional third parameter for the `!important` priority, which you can leave out.

The right-hand circle also gets a class added with `classList`, which lets the style sheet do the rest:

```js
const left = document.getElementById("left");
const right = document.getElementById("right");

document.getElementById("apply").addEventListener("click", () => {
  left.style.fillOpacity = "0.5";
  right.style.setProperty("fill-opacity", "0.5");
  right.classList.add("selected");
});
document.getElementById("reset").addEventListener("click", () => {
  left.style.removeProperty("fill-opacity");
  right.style.removeProperty("fill-opacity");
  right.classList.remove("selected");
});
```

Both circles end up equally translucent, and only the right-hand one gets the outline:

## Scripting an embedded SVG document

An SVG embedded with `<object>`, ``, or `` is a separate document with its own DOM:

```html
<iframe id="chart" src="chart.svg" width="300" height="150"></iframe>
```

To script that document from the containing page, get its `Document`, either from `contentDocument` (`HTMLIFrameElement.contentDocument` or `HTMLObjectElement.contentDocument`) or by calling `getSVGDocument()`. All three elements provide `getSVGDocument()`, which returns `null` if the element isn't displaying an SVG document. Wait for the frame's `load` event, or the document won't be there yet:

```js
const frame = document.getElementById("chart");

frame.addEventListener("load", () => {
  const svgDocument = frame.contentDocument;
  const bar = svgDocument.getElementById("bar-1");
  bar.setAttribute("fill", "steelblue");
});
```

This only works if the SVG file is same-origin with the containing page; otherwise `contentDocument` is `null`.

Going the other way, a script inside the embedded SVG can reach the containing page through `window.parent` (or `window.top` for the outermost document), again subject to the same-origin restriction. `Window.postMessage()` is the more robust choice, and the only option across origins.

> **Note:**
> You may find documentation referring to an `SVGDocument` interface. Prior to SVG 2, SVG documents were represented using that interface. However, SVG documents are now represented using the `XMLDocument` interface instead.

## Geometry and animated values in the SVG DOM

Some SVG interfaces expose geometry and animation values that have no HTML equivalent:

- `SVGGraphicsElement.getBBox()` returns the tight bounding box of an element in user units, ignoring strokes, filters, and any transforms applied to the element. This differs from `Element.getBoundingClientRect()`, which reports rendered CSS pixels and does account for transforms.
- `SVGGeometryElement.getTotalLength()` and `SVGGeometryElement.getPointAtLength()` measure a path and find a point at a given distance along it, which is how line-drawing animations are built.
- Geometric attributes are also reflected as animated values, so `circle.r.baseVal.value` reads the radius as a number from an `SVGAnimatedLength` object, while `circle.getAttribute("r")` returns the attribute string.

This example measures a curve with those APIs. The markup holds the path, plus an empty rectangle and circle for the script to position:

```html
<svg
  viewBox="0 0 200 100"
  width="400"
  height="200"
  xmlns="http://www.w3.org/2000/svg">
  <path
    id="track"
    d="M 20 80 C 60 10, 140 10, 180 80"
    fill="none"
    stroke="steelblue"
    stroke-width="4" />
  <rect id="box" fill="none" stroke="crimson" stroke-dasharray="4 4" />
  <circle id="dot" r="5" fill="crimson" />
</svg>
<output id="readout"></output>
```

```css
output {
  display: block;
  margin-top: 0.5rem;
  font-family: monospace;
}
```

The script draws the path's bounding box, puts the dot at the halfway point along the path, and reads the dot's radius as a number:

```js
const track = document.getElementById("track");
const box = document.getElementById("box");
const dot = document.getElementById("dot");

const bbox = track.getBBox();
box.setAttribute("x", bbox.x);
box.setAttribute("y", bbox.y);
box.setAttribute("width", bbox.width);
box.setAttribute("height", bbox.height);

const length = track.getTotalLength();
const middle = track.getPointAtLength(length / 2);
dot.setAttribute("cx", middle.x);
dot.setAttribute("cy", middle.y);

document.getElementById("readout").textContent =
  `path length: ${length.toFixed(1)} user units, dot radius: ${dot.r.baseVal.value}`;
```

The box, the dot, and the numbers all come from the measurements:

The dashed box encloses the path itself rather than its stroke, because `getBBox()` ignores stroke width: you can see bits of the stroke protruding outside the rectangle wherever they intersect.

## See also

- `<script>`
- `SVGElement`
- SVG animation with SMIL
- SVG as an image
- SVG in HTML introduction
- Introduction to events
