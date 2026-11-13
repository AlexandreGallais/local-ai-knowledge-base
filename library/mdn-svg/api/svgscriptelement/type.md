---
title: "SVGScriptElement: type property"
tool: "mdn-svg"
version: "2026-11"
source: "https://github.com/mdn/content/blob/aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d/files/en-us/web/api/svgscriptelement/type/index.md"
commit: "aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d"
license: "CC-BY-SA-2.5"
---

# SVGScriptElement: type property

The **`type`** property of the `SVGScriptElement` interface reflects the `type` attribute of the given `<script>` element.

## Value

A string.

## Examples

### Accessing the `type` property

```html
<svg xmlns="http://www.w3.org/2000/svg" width="400" height="200">
  <script id="myScript" href="script.js" type="text/javascript"></script>
</svg>
```

```js
const scriptElement = document.getElementById("myScript");

// Access the type property
console.log(scriptElement.type); // Output: "text/javascript"
```
