---
title: "SVGSVGElement: pauseAnimations() method"
tool: "mdn-svg"
version: "2026-11"
source: "https://github.com/mdn/content/blob/aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d/files/en-us/web/api/svgsvgelement/pauseanimations/index.md"
commit: "aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d"
license: "CC-BY-SA-2.5"
---

# SVGSVGElement: pauseAnimations() method

The `pauseAnimations()` method of the `SVGSVGElement` interface suspends (i.e., pauses) all currently running animations that are defined within the SVG document fragment corresponding to this `` element, causing the animation clock corresponding to this document fragment to stand still until it is unpaused.

## Syntax

```js
pauseAnimations()
```

### Parameters

None.

### Return value

None (`undefined`).

## Examples

### Pausing Animations

```html
<svg id="exampleSVG" width="200" height="100">
  <circle cx="50" cy="50" r="30" fill="blue">
    <animate
      attributeName="cx"
      from="50"
      to="150"
      dur="2s"
      repeatCount="indefinite" />
  </circle>
</svg>

<button id="pauseBtn">Pause Animations</button>
<pre id="status"></pre>
```

```js
const svgElement = document.getElementById("exampleSVG");
const pauseButton = document.getElementById("pauseBtn");
const statusDisplay = document.getElementById("status");

pauseButton.addEventListener("click", () => {
  svgElement.pauseAnimations();
  statusDisplay.textContent = "Animations paused.";
});
```

## See also

- `SVGSVGElement.unpauseAnimations()`
