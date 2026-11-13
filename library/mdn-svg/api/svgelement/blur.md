---
title: "SVGElement: blur() method"
tool: "mdn-svg"
version: "2026-11"
source: "https://github.com/mdn/content/blob/aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d/files/en-us/web/api/svgelement/blur/index.md"
commit: "aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d"
license: "CC-BY-SA-2.5"
---

# SVGElement: blur() method

The **`SVGElement.blur()`** method removes keyboard focus from the current SVG element.

## Syntax

```js
blur()
```

### Parameters

None.

### Return value

None (`undefined`).

## Examples

### Remove focus from an SVG circle element

#### HTML

```html
<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200">
  <circle id="myCircle" cx="100" cy="100" r="50" tabindex="0" fill="blue" />
  <button id="focusButton">Focus the circle</button>
  <button id="blurButton">Blur the circle</button>
</svg>
```

#### JavaScript

```js
const circle = document.getElementById("myCircle");
const focusButton = document.getElementById("focusButton");
const blurButton = document.getElementById("blurButton");

// Focus the circle when the "Focus" button is clicked
focusButton.addEventListener("click", () => {
  circle.focus();
});

// Blur the circle when the "Blur" button is clicked
blurButton.addEventListener("click", () => {
  circle.blur();
});
```

## See also

- `SVGElement.focus` makes the element the current keyboard focus.
- `HTMLElement.blur` a similar method for HTML elements.
