---
title: "HTMLScriptElement: type property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/htmlscriptelement/type/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HTMLScriptElement: type property

The **`type`** property of the `HTMLScriptElement` interface is a string that reflects the type of the script.

It reflects the `type` attribute of the `<script>` element.

## Value

A string. The value of this property can be one of the following:

- **Attribute is not set (default), an empty string, or a JavaScript MIME type**
    Indicates that the script is a "classic script", containing JavaScript code.
- `module`
    This value causes the code to be treated as a JavaScript module.
- `importmap`
    This value indicates that the body of the element contains an import map.
- `speculationrules` (experimental)
    This value indicates that the body of the element contains speculation rules.
- **Any other value**
    The embedded content is treated as a data block, and won't be processed by the browser.

For more information, please refer to the `type` attribute of the `<script>` element.

## Examples

```html
<script id="el" type="module"></script>
```

```js
const el = document.getElementById("el");
console.log(el.type); // Output: "module"
```
