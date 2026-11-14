---
title: "SVGSVGElement: currentScale property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/svgsvgelement/currentscale/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
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
