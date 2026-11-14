---
title: "`offset-anchor` CSS property"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/properties/offset-anchor/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `offset-anchor` CSS property

The **`offset-anchor`** CSS property specifies the point inside the box of an element traveling along an `offset-path` that is actually moving along the path.

```css
offset-anchor: auto;
```

```css
offset-anchor: right top;
```

```css
offset-anchor: left bottom;
```

```css
offset-anchor: 20% 80%;
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
  offset-path: path("M 0,20 L 200,20");
  animation: distance 3000ms infinite alternate ease-in-out;
  width: 40px;
  height: 40px;
  background: cyan;
  animation-play-state: paused;
}

#example-element.running {
  animation-play-state: running;
}

.wrapper {
  background-image: linear-gradient(
    to bottom,
    transparent,
    transparent 49%,
    black 50%,
    black 51%,
    transparent 52%
  );
  border: 1px solid #cccccc;
  width: 90%;
}

@keyframes distance {
  0% {
    offset-distance: 0%;
  }
  100% {
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

## Syntax

```css
/* Keyword values */
offset-anchor: top;
offset-anchor: bottom;
offset-anchor: left;
offset-anchor: right;
offset-anchor: center;
offset-anchor: auto;

/* <percentage> values */
offset-anchor: 25% 75%;

/* <length> values */
offset-anchor: 0 0;
offset-anchor: 1cm 2cm;
offset-anchor: 10ch 8em;

/* Edge offsets values */
offset-anchor: bottom 10px right 20px;
offset-anchor: right 3em bottom 10px;

/* Global values */
offset-anchor: inherit;
offset-anchor: initial;
offset-anchor: revert;
offset-anchor: revert-layer;
offset-anchor: unset;
```

### Values

- `auto`
    `offset-anchor` is given the same value as the element's `transform-origin`, unless `offset-path` is `none`, in which case it takes its value from `offset-position`.
- `<position>`
    A `<position>` defines an x/y coordinate, to place an item relative to the edges of an element's box. It can be defined using one to four values. For more specifics, see the `<position>` and `background-position` reference pages. Note that the 3-value position syntax does not work for any usage of `<position>`, except for in `background(-position)`.

## Examples

### Setting various offset-anchor values

In the following example, we have three `` elements nested in `` elements. Each `` is given the same `offset-path` (a horizontal line 200 pixels long) and animated to move along it. The three are then given different `background-color` and `offset-anchor` values.

Each `` has been styled with a linear gradient to give it a horizontal line running through its center, to give you a visual display of where the ``'s offset paths are running.

This allows you to see what effect the different `offset-anchor` values have — the first one, `auto`, causes the ``'s center point to move along the path. The other two cause the ``'s top-right and bottom-left points to move along the path, respectively.

#### HTML

```html
<section>
  <div class="offset-anchor1"></div>
</section>
<section>
  <div class="offset-anchor2"></div>
</section>
<section>
  <div class="offset-anchor3"></div>
</section>
```

#### CSS

```css
div {
  offset-path: path("M 0,20 L 200,20");
  animation: move 3000ms infinite alternate ease-in-out;
  width: 40px;
  height: 40px;
}

section {
  background-image: linear-gradient(
    to bottom,
    transparent,
    transparent 49%,
    black 50%,
    black 51%,
    transparent 52%
  );
  border: 1px solid #cccccc;
  margin-bottom: 10px;
}

.offset-anchor1 {
  offset-anchor: auto;
  background: cyan;
}

.offset-anchor2 {
  offset-anchor: right top;
  background: purple;
}

.offset-anchor3 {
  offset-anchor: left bottom;
  background: magenta;
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

#### Result

## See also

- `offset`
- `offset-distance`
- `offset-rotate`
- SVG ``
