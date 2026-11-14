---
title: "`offset` CSS property"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/properties/offset/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `offset` CSS property

The **`offset`** CSS shorthand property sets all the properties required for animating an element along a defined path. The offset properties together help to define an _offset transform_, a transform that aligns a point in an element (offset-anchor) to an _offset position_ (offset-position) on a path (offset-path) at various points along the path (offset-distance) and optionally rotates the element (offset-rotate) to follow the direction of the path.

> **Note:**
> Early versions of the spec called this property `motion`.

```css
offset: path("M 20 60 L 120 60 L 70 10 L 20 60") 0% auto 90deg;
```

```css
offset: path(
    "M 20 210 L 74 210 L 118 140 \
 L 62 140 L 20 210"
  )
  20% auto;
```

```html
<section class="default-example" id="default-example">
  <div class="wrapper">
    <div id="example-element"></div>
  </div>
  <button id="playback" type="button">Play</button>
</section>
```

```css
#example-element {
  width: 24px;
  height: 24px;
  background: #2bc4a2;
  clip-path: polygon(0% 0%, 70% 0%, 100% 50%, 70% 100%, 0% 100%, 30% 50%);
  animation: distance 3000ms infinite normal ease-in-out;
  animation-play-state: paused;
}

#example-element.running {
  animation-play-state: running;
}

.wrapper {
  height: 220px;
  width: 200px;
  background:
    url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 150 140" width="200" height="140"><path d="M 0 60 L 100 60 L 50 10 L 0 60" fill="none" stroke="lightgrey" stroke-width="2" stroke-dasharray="4.5"/></svg>')
      no-repeat,
    url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -140 150 230" width="200" height="230"><path d="M 0 70 L 56 70 L 98 0 L 42 0 L 0 70" fill="none" stroke="lightgrey" stroke-width="2" stroke-dasharray="4.5"/></svg>');
}

@keyframes distance {
  to {
    offset-distance: 100%;
  }
}

#playback {
  position: absolute;
  top: 0;
  left: 0;
  font-size: 1em;
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

## Constituent properties

This property is a shorthand for the following CSS properties:

- `offset-anchor`
- `offset-distance`
- `offset-path`
- `offset-position`
- `offset-rotate`

## Syntax

```css
/* Offset position */
offset: auto;
offset: 10px 30px;
offset: none;

/* Offset path */
offset: ray(45deg closest-side);
offset: path("M 100 100 L 300 100 L 200 300 z");
offset: url("arc.svg");

/* Offset path with distance and/or rotation */
offset: url("circle.svg") 100px;
offset: url("circle.svg") 40%;
offset: url("circle.svg") 30deg;
offset: url("circle.svg") 50px 20deg;

/* Including offset anchor */
offset: ray(45deg closest-side) / 40px 20px;
offset: url("arc.svg") 2cm / 0.5cm 3cm;
offset: url("arc.svg") 30deg / 50px 100px;

/* Global values */
offset: inherit;
offset: initial;
offset: revert;
offset: revert-layer;
offset: unset;
```

## Examples

### Animating an element along a path

#### HTML

```html
<div id="offsetElement"></div>
```

#### CSS

```css
@keyframes move {
  from {
    offset-distance: 0%;
  }

  to {
    offset-distance: 100%;
  }
}

#offsetElement {
  width: 50px;
  height: 50px;
  background-color: blue;
  offset: path("M 100 100 L 300 100 L 200 300 z") auto;
  animation: move 3s linear infinite;
}
```

#### Result

## See also

- `offset-anchor`
- `offset-distance`
- `offset-path`
- `offset-position`
- `offset-rotate`
