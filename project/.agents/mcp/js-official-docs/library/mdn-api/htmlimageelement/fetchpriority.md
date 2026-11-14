---
title: "HTMLImageElement: fetchPriority property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/htmlimageelement/fetchpriority/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HTMLImageElement: fetchPriority property

The **`fetchPriority`** property of the `HTMLImageElement` interface represents a hint to the browser indicating how it should prioritize fetching a particular image relative to other images. It reflects the `` element's `fetchpriority` content attribute.

## Value

A string whose value is one of `high`, `low`, or `auto`. For their meanings, see the HTML `fetchpriority` attribute.

## Examples

```js
const img = new Image();
img.fetchPriority = "high";
img.src = "img/logo.png";
```

## See also

- `HTMLLinkElement.fetchPriority`
- `HTMLScriptElement.fetchPriority`
- HTTP `Link` header
- Optimize resource loading with the Fetch Priority API for information about how this API affects priorities on Chrome.
