---
title: "HTMLImageElement: referrerPolicy property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/htmlimageelement/referrerpolicy/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HTMLImageElement: referrerPolicy property

The **`referrerPolicy`** property of the `HTMLImageElement` interface defines which referrer is sent when fetching the resource. It reflects the `` element's `referrerpolicy` content attribute.

## Value

A string whose value is one of `no-referrer`, `no-referrer-when-downgrade`, `origin`, `origin-when-cross-origin`, `same-origin`, `strict-origin`, `strict-origin-when-cross-origin`, or `unsafe-url`. For their meanings, see the HTML `` reference.

## Examples

```js
const img = new Image();
img.src = "img/logo.png";
img.referrerPolicy = "origin";

const div = document.getElementById("divAround");
div.appendChild(img); // Fetch the image using the origin as the referrer
```

## See also

- `HTMLAnchorElement.referrerPolicy`
- `HTMLAreaElement.referrerPolicy`
- `HTMLIFrameElement.referrerPolicy`
