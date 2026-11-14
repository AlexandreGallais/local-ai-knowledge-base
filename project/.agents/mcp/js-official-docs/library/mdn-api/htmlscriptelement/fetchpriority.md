---
title: "HTMLScriptElement: fetchPriority property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/htmlscriptelement/fetchpriority/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HTMLScriptElement: fetchPriority property

The **`fetchPriority`** property of the `HTMLScriptElement` interface represents a hint to the browser indicating how it should prioritize fetching an external script relative to other external scripts.
It reflects the `<script>` element's `fetchpriority` content attribute.

## Value

A string. For the permitted values, see the HTML `fetchpriority` attribute.

## Examples

```html
<script id="el" type="module" src="main.js" fetchpriority="high"></script>
```

```js
const el = document.getElementById("el");
console.log(el.fetchPriority); // Output: "high"
```

## See also

- `HTMLImageElement.fetchPriority`
- `HTMLLinkElement.fetchPriority`
- HTTP `Link` header
- Optimize resource loading with the Fetch Priority API for information about how this API affects priorities on Chrome.
