---
title: "HTMLScriptElement: defer property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/htmlscriptelement/defer/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HTMLScriptElement: defer property

The **`defer`** property of the `HTMLScriptElement` interface is a boolean value that controls how the script should be executed. For classic scripts, if the `defer` property is set to `true`, the external script will be executed after the document has been parsed, but before firing `DOMContentLoaded` event. For module scripts, the `defer` property has no effect.

It reflects the `defer` attribute of the `<script>` element.

## Value

A boolean.

## Examples

```html
<script id="el" src="/example.js" defer></script>
```

```js
const el = document.getElementById("el");
console.log(el.defer); // Output: true
```

## See also

- `HTMLScriptElement.async`
