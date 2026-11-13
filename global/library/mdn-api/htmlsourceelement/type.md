---
title: "HTMLSourceElement: type property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/htmlsourceelement/type/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HTMLSourceElement: type property

The **`type`** property of the `HTMLSourceElement` interface is a string representing the MIME type of the media resource.

It reflects the `type` attribute of the `` element.

## Value

A string.

## Examples

```html
<video>
  <source
    id="el"
    src="large.webp"
    type="video/webp"
    media="screen and (width >= 600px)" />
</video>
```

```js
const el = document.getElementById("el");
console.log(el.type); // Output: "video/webp"
```

## See also

- `HTMLSourceElement.src`
- `HTMLSourceElement.srcset`
- `HTMLSourceElement.media`
- `HTMLSourceElement.sizes`
- ``
- ``
- `<audio>`
- ``
- Media types found on the web
- Important MIME types for web developers
- Media Capabilities API
