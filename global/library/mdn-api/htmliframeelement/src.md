---
title: "HTMLIFrameElement: src property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/htmliframeelement/src/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HTMLIFrameElement: src property

The **`HTMLIFrameElement.src`**
A string that reflects the `src` HTML attribute, containing the address of the content to be embedded.

Note that programmatically removing an ``'s src attribute (e.g., via `Element.removeAttribute()`) causes `about:blank` to be loaded in the frame.

## Example

```js
const iframe = document.createElement("iframe");
iframe.src = "/";
const body = document.querySelector("body");
body.appendChild(iframe); // Fetch the image using the complete URL as the referrer
```

## See also

- `HTMLEmbedElement.src`
- `HTMLImageElement.src`
- `HTMLMediaElement.src`
- `HTMLScriptElement.src`
- `HTMLTrackElement.src`
