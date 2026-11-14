---
title: "SVGScriptElement"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/svgscriptelement/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# SVGScriptElement

The **`SVGScriptElement`** interface corresponds to the SVG `<script>` element.

## Instance properties

- `SVGScriptElement.async`
    A boolean reflecting the `async` attribute of the given `<script>` element. It indicates whether the script should be executed asynchronously.
- `SVGScriptElement.crossOrigin`
    A string reflecting the `crossorigin` attribute of the given `<script>` element. It is a CORS settings attribute.
- `SVGScriptElement.defer` (experimental)
    A boolean reflecting the `defer` attribute of the given `<script>` element. It indicates whether the script should be executed after the document has been parsed.
- `SVGScriptElement.href` (read-only)
    An `SVGAnimatedString` corresponding to the `href` or `xlink:href` (deprecated) attribute of the given `<script>` element.
- `SVGScriptElement.type`
    A string corresponding to the `type` attribute of the given `<script>` element.

## Instance methods

_This interface doesn't implement any specific methods, but inherits methods from its parent interface, `SVGElement`._

## See also

- `HTMLScriptElement`
