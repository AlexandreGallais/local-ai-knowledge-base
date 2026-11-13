---
title: "SVGSVGElement: currentTranslate property"
tool: "mdn-svg"
version: "2026-11"
source: "https://github.com/mdn/content/blob/aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d/files/en-us/web/api/svgsvgelement/currenttranslate/index.md"
commit: "aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d"
license: "CC-BY-SA-2.5"
---

# SVGSVGElement: currentTranslate property

The **`currentTranslate`** read-only property of the `SVGSVGElement` interface reflects the translation factor that takes into account user "magnification" corresponding to an outermost `` element.

If the `` element is not at the outermost level, then `currentTranslate` is always `{ x: 0, y: 0 }` and is read-only. Otherwise, it is writable.

## Value

A `DOMPointReadOnly`.

## See also

- `SVGSVGElement.currentScale`
- `DOMPointReadOnly`
