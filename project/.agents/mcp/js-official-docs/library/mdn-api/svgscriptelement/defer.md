---
title: "SVGScriptElement: defer property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/svgscriptelement/defer/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# SVGScriptElement: defer property

The **`defer`** property of the `SVGScriptElement` interface is a boolean value that controls how the script should be executed. For classic scripts, if the `defer` property is set to `true`, the external script will be executed after the document has been parsed, but before firing the `DOMContentLoaded` event. For module scripts, the `defer` property has no effect.

It reflects the `defer` attribute of the `<script>` element.

## Value

A boolean.

## Examples

### Accessing the `defer` property

```html
<svg xmlns="http://www.w3.org/2000/svg" width="400" height="200">
  <script id="myScript" href="script.js" defer></script>
</svg>
```

```js
const scriptElement = document.getElementById("myScript");
console.log(scriptElement.defer); // Output: true
```

## See also

- `SVGScriptElement.async`
- `HTMLScriptElement.defer`
