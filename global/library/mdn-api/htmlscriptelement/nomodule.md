---
title: "HTMLScriptElement: noModule property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/htmlscriptelement/nomodule/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HTMLScriptElement: noModule property

The **`noModule`** property of the `HTMLScriptElement` interface is a boolean value that indicates whether the script should be executed in browsers that support ES modules. Practically, this can be used to serve fallback scripts to older browsers that do not support JavaScript modules.

It reflects the `nomodule` attribute of the `<script>` element.

## Value

A boolean, `true` means that the script should not be executed in browsers that support ES modules, `false` otherwise.

## Examples

```html
<script id="el" nomodule>
  // If the browser supports JavaScript modules, the following script will not be executed.
  console.log("The browser does not support JavaScript modules");
</script>
```

```js
const el = document.getElementById("el");
console.log(el.noModule); // Output: true
```
