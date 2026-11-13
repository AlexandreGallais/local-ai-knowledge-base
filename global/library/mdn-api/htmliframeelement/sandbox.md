---
title: "HTMLIFrameElement: sandbox property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/htmliframeelement/sandbox/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HTMLIFrameElement: sandbox property

The read-only **`sandbox`** property of the `HTMLIFrameElement` returns a live `DOMTokenList` object indicating extra restrictions on the behavior of the nested content. It reflects the `` element's `sandbox` content attribute.

## Value

A live `DOMTokenList` object.

Although the `sandbox` property itself is read-only in the sense that you can't replace the `DOMTokenList` object, you can still assign to the `sandbox` property directly, which is equivalent to assigning to its `value` property. You can also modify the `DOMTokenList` object using the `add()`, `remove()`, `replace()`, and `toggle()` methods.

## Examples

```html
<iframe
  id="el"
  title="example"
  src="https://example.com"
  sandbox="allow-same-origin allow-scripts"></iframe>
```

```js
const el = document.getElementById("el");
console.log(Array.from(el.sandbox)); // Output: ["allow-same-origin", "allow-scripts"]

el.sandbox = "";
console.log(Array.from(el.sandbox)); // Output: []
```
