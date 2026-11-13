---
title: "CSS font loading"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/guides/font_loading/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# CSS font loading

The **CSS font loading** module describes events and interfaces used for dynamically loading font resources.

## Reference

### Interfaces

- `fontFace` interface
  - `FontFace()` constructor
  - `fontFace.family` property
  - `fontFace.style` property
  - `fontFace.weight` property
  - `fontFace.stretch` property
  - `fontFace.unicodeRange` property
  - `fontFace.variant` property
  - `fontFace.featureSettings` property
  - `fontFace.variationSettings` property
  - `fontFace.display` property
  - `fontFace.ascentOverride` property
  - `fontFace.descentOverride` property
  - `fontFace.lineGapOverride` property
  - `fontFace.sizeAdjust` property
  - `fontFace.load()` method (returns a promise)
- `fontFaceSet` interface
- `fontFaceSetLoadEvent` event

## Guides

- CSS font loading API
    Overview of the CSS Font Loading API, which provide events and interfaces for dynamically loading font resources.

## Related concepts

- CSS `@font-face` at-rule
- CSS `@font-feature-values` at-rule
- `CSSFontFaceRule` interface
- Document `fonts` property (returns the `FontFaceSet` object instance)
- WorkerGlobalScope `fonts` property (returns the `FontFaceSet` object instance)
- JavaScript `Promise` object

## See also

- CSS fonts module
