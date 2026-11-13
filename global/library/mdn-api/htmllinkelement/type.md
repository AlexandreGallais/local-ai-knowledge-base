---
title: "HTMLLinkElement: type property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/htmllinkelement/type/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HTMLLinkElement: type property

The **`type`** property of the `HTMLLinkElement` interface is a string that reflects the MIME type of the linked resource.

It reflects the `type` attribute of the `<link>` element.

## Value

A string, which must be a valid MIME type string.

## Examples

```html
<link
  id="el"
  rel="apple-touch-icon"
  sizes="114x114"
  href="apple-icon-114.png"
  type="image/png" />
```

```js
const el = document.getElementById("el");
console.log(el.type); // Output: "image/png"
```
