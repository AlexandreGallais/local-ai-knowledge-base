---
title: "SVGSVGElement: currentScale property"
tool: "mdn-svg"
version: "2026-11"
source: "https://github.com/mdn/content/blob/aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d/files/en-us/web/api/svgsvgelement/currentscale/index.md"
commit: "aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d"
license: "CC-BY-SA-2.5"
---

# SVGSVGElement: currentScale property

The **`currentScale`** property of the `SVGSVGElement` interface reflects the current scale factor relative to the initial view to take into account user magnification and panning operations on the outermost `` element.

DOM attributes `currentScale` and `currentTranslate` are equivalent to the 2×3 matrix `[a b c d e f] = [currentScale 0 0 currentScale currentTranslate.x currentTranslate.y]`. If "magnification" is enabled (i.e., `zoomAndPan="magnify"`), then the effect is as if an extra transformation were placed at the outermost level on the SVG document fragment (i.e., outside the outermost `` element).

If the `` element is not at the outermost level, then `currentScale` is always `1` and setting it has no effect.

## Value

A float.

## See also

- `SVGSVGElement.currentTranslate`
