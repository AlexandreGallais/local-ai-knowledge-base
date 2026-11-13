---
title: "SVGGraphicsElement"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/svggraphicselement/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# SVGGraphicsElement

The **`SVGGraphicsElement`** interface represents SVG elements whose primary purpose is to directly render graphics into a group.

## Instance properties

_This interface also inherits properties from its parent, `SVGElement`._

- `SVGGraphicsElement.requiredExtensions` (read-only)
    An `SVGStringList` reflecting the `requiredExtensions` attribute of the given element.
- `SVGGraphicsElement.systemLanguage` (read-only)
    An `SVGStringList` reflecting the `systemLanguage` attribute of the given element.
- `SVGGraphicsElement.transform` (read-only)
    An `SVGAnimatedTransformList` reflecting the computed value of the `transform` property and its corresponding `transform` attribute of the given element.

## Instance methods

_This interface also inherits methods from its parent, `SVGElement`._

- `SVGGraphicsElement.getBBox()`
    Returns a `DOMRect` representing the computed bounding box of the current element.
- `SVGGraphicsElement.getCTM()`
    Returns a `DOMMatrix` representing the matrix that transforms the current element's coordinate system to its SVG viewport's coordinate system.
- `SVGGraphicsElement.getScreenCTM()`
    Returns a `DOMMatrix` representing the matrix that transforms the current element's coordinate system to the coordinate system of the SVG viewport for the SVG document fragment.
