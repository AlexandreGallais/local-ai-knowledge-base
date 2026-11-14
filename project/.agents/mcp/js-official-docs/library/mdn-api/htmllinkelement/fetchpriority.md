---
title: "HTMLLinkElement: fetchPriority property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/htmllinkelement/fetchpriority/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HTMLLinkElement: fetchPriority property

The **`fetchPriority`** property of the `HTMLLinkElement` interface represents a hint to the browser indicating how it should prioritize fetching a particular resource relative to other resources of the same type.
It reflects the `<link>` element's `fetchpriority` content attribute.

## Value

A string. For the permitted values, see the HTML `fetchpriority` attribute.

## Examples

```js
const preloadLink = document.createElement("link");
preloadLink.href = "my-image.jpg";
preloadLink.rel = "preload";
preloadLink.as = "image";
preloadLink.fetchPriority = "high";
document.head.appendChild(preloadLink);
```

## See also

- `HTMLImageElement.fetchPriority`
- `HTMLScriptElement.fetchPriority`
- HTTP `Link` header
- Optimize resource loading with the Fetch Priority API for information about how this API affects priorities on Chrome.
