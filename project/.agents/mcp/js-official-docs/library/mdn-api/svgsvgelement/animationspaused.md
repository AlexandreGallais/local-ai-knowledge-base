---
title: "SVGSVGElement: animationsPaused() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/svgsvgelement/animationspaused/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# SVGSVGElement: animationsPaused() method

The `animationsPaused()` method of the `SVGSVGElement` interface checks whether the animations in the SVG document fragment are currently paused.

## Syntax

```js
animationsPaused()
```

### Parameters

None.

### Return value

A boolean. `true` if this SVG document fragment is in a paused state.

## Examples

### Checking if Animations are Paused

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

<button id="pauseBtn">Pause/Resume Animations</button>
<pre id="status"></pre>
```

```js
const svgElement = document.getElementById("exampleSVG");
const pauseButton = document.getElementById("pauseBtn");
const statusDisplay = document.getElementById("status");

function updateStatus() {
  const isPaused = svgElement.animationsPaused();
  statusDisplay.textContent = `Animations paused: ${isPaused}`;
}

pauseButton.addEventListener("click", () => {
  if (svgElement.animationsPaused()) {
    svgElement.unpauseAnimations();
  } else {
    svgElement.pauseAnimations();
  }
  updateStatus();
});

// Initialize the status display
updateStatus();
```

## See also

- `SVGSVGElement.pauseAnimations()`
- `SVGSVGElement.unpauseAnimations()`
