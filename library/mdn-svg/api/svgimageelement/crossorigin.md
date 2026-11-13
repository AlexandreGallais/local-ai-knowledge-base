---
title: "SVGImageElement: crossOrigin property"
tool: "mdn-svg"
version: "2026-11"
source: "https://github.com/mdn/content/blob/aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d/files/en-us/web/api/svgimageelement/crossorigin/index.md"
commit: "aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d"
license: "CC-BY-SA-2.5"
---

# SVGImageElement: crossOrigin property

The **`crossOrigin`** property of the `SVGImageElement` interface is a string which specifies the Cross-Origin Resource Sharing (CORS) setting to use when retrieving the image. It reflects the `crossorigin` content attribute of the given `<image>` element.

## Value

A string which specifies the CORS mode used when fetching the image resource. Valid values are `"anonymous"` or `"use-credentials"`. If the `crossOrigin` property is set to any other value, it is the same as specifying `"anonymous"`.

## See also

- `HTMLImageElement.crossOrigin`
- `HTMLMediaElement.crossOrigin`
