---
title: "SVGScriptElement: async property"
tool: "mdn-svg"
version: "2026-11"
source: "https://github.com/mdn/content/blob/aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d/files/en-us/web/api/svgscriptelement/async/index.md"
commit: "aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d"
license: "CC-BY-SA-2.5"
---

# SVGScriptElement: async property

The **`async`** property of the `SVGScriptElement` interface is a boolean value that controls how the script should be executed. For classic scripts, if the `async` property is set to `true`, the external script will be fetched in parallel to parsing and evaluated as soon as it is available. For module scripts, if the `async` property is set to `true`, the script and all its dependencies will be fetched in parallel to parsing and evaluated as soon as they are available.

It reflects the `async` attribute of the `<script>` element.

## Value

A boolean.

## Examples

### Accessing the `async` property

```html
<svg xmlns="http://www.w3.org/2000/svg" width="400" height="200">
  <script id="myScript" href="script.js" async></script>
</svg>
```

```js
const scriptElement = document.getElementById("myScript");
console.log(scriptElement.async); // Output: true
```

## See also

- `SVGScriptElement.defer`
- `HTMLScriptElement.async`
