---
title: "HTMLImageElement: alt property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/htmlimageelement/alt/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HTMLImageElement: alt property

The **`alt`** property of the `HTMLImageElement` interface provides fallback (alternate) text to display when the image specified by the `` element is not displayed, whether because of an error, because the user has disabled the loading of images, or because the image hasn't finished loading yet. It reflects the `` element's `alt` content attribute.

There are important accessibility implications of providing appropriate alt text, and the requirements may differ based on the purpose of the image. See the HTML `` reference for more information.

## Value

A string.

## Examples

### Setting the alt attribute

```js
const img = new Image();
img.src = "example.png";
img.alt = "An example picture";
```
