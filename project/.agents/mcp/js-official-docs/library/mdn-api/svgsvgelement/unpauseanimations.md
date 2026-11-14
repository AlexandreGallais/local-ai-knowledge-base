---
title: "SVGSVGElement: unpauseAnimations() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/svgsvgelement/unpauseanimations/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# SVGSVGElement: unpauseAnimations() method

The `unpauseAnimations()` method of the `SVGSVGElement` interface resumes (i.e., unpauses) currently running animations that are defined within the SVG document fragment, causing the animation clock to continue from the time at which it was suspended.

## Syntax

```js
unpauseAnimations()
```

### Parameters

None.

### Return value

None (`undefined`).

## Examples

### Unpausing Animations

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
<button id="resumeBtn">Resume Animations</button>
<pre id="status"></pre>
```

```js
const svgElement = document.getElementById("exampleSVG");
const pauseButton = document.getElementById("pauseBtn");
const resumeButton = document.getElementById("resumeBtn");
const statusDisplay = document.getElementById("status");

pauseButton.addEventListener("click", () => {
  svgElement.pauseAnimations();
  statusDisplay.textContent = "Animations paused.";
});

resumeButton.addEventListener("click", () => {
  svgElement.unpauseAnimations();
  statusDisplay.textContent = "Animations resumed.";
});
```

## See also

- `SVGSVGElement.pauseAnimations()`
