---
title: "HTMLIFrameElement: allowFullscreen property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/htmliframeelement/allowfullscreen/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HTMLIFrameElement: allowFullscreen property

The **`allowFullscreen`** property of the `HTMLIFrameElement` interface is a boolean value that reflects the `allowfullscreen` attribute of the `` element, indicating whether to allow the iframe's contents to use `requestFullscreen()`.

> **Note:**
> This property is considered a legacy property. Use `allow="fullscreen"` and `HTMLIFrameElement.allow` instead.

## Value

A boolean value.

## Examples

```html
<iframe id="el" allowfullscreen></iframe>
```

```js
const el = document.getElementById("el");
console.log(el.allowFullscreen); // Output: true
```

## See also

- Fullscreen API
- `Element.requestFullscreen()`
- Permissions Policy
- `fullscreen` Permissions Policy directive
