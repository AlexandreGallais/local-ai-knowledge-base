---
title: "HTMLScriptElement: async property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/htmlscriptelement/async/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HTMLScriptElement: async property

The **`async`** property of the `HTMLScriptElement` interface is a boolean value that controls how the script should be executed. For classic scripts, if the `async` property is set to `true`, the external script will be fetched in parallel to parsing and evaluated as soon as it is available. For module scripts, if the `async` property is set to `true`, the script and all their dependencies will be fetched in parallel to parsing and evaluated as soon as they are available.

It reflects the `async` attribute of the `<script>` element.

## Value

A boolean.

## Examples

```html
<script id="el" src="/example.js" async></script>
```

```js
const el = document.getElementById("el");
console.log(el.async); // Output: true
```

## See also

- `HTMLScriptElement.defer`
