---
title: "HTMLIFrameElement: name property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/htmliframeelement/name/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HTMLIFrameElement: name property

The **`name`** property of the `HTMLIFrameElement` interface is a string value that reflects the `name` attribute of the `` element, indicating the specific name of the `` element.

## Value

A string.

## Examples

```html
<iframe id="el" name="example"></iframe>
```

```js
const el = document.getElementById("el");
console.log(el.name); // Output: "example"
```
