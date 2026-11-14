---
title: "HTMLLinkElement: media property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/htmllinkelement/media/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HTMLLinkElement: media property

The **`media`** property of the `HTMLLinkElement` interface is a string representing a list of one or more media formats to which the resource applies.

It reflects the `media` attribute of the `<link>` element.

## Value

A string.

## Examples

```html
<link
  id="el"
  href="https://cdn.jsdelivr.net/npm/user@example.com/dist/css/bootstrap.min.css"
  rel="stylesheet"
  media="screen and (width >= 600px)"
  crossorigin="anonymous" />
```

```js
const el = document.getElementById("el");
console.log(el.media); // Output: "screen and (width >= 600px)"
```
