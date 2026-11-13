---
title: "SVGStyleElement: type property"
tool: "mdn-svg"
version: "2026-11"
source: "https://github.com/mdn/content/blob/aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d/files/en-us/web/api/svgstyleelement/type/index.md"
commit: "aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d"
license: "CC-BY-SA-2.5"
---

# SVGStyleElement: type property

The **`SVGStyleElement.type`** property returns the type of the current style.
The value reflects the associated SVG `<style>` element's `type` attribute.

Authors should not use this property or rely on the value.

## Value

The permitted values are an empty string or a case-insensitive match for "text/css".

## Exceptions

SVG 1.1 defined that a `DOMException` is raised with code `NO_MODIFICATION_ALLOWED_ERR` on an attempt to change the value of a read-only attribute.
This restriction was removed in SVG 2.

## See also

- `HTMLStyleElement.type`
