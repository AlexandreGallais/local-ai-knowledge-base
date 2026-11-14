---
title: "HTMLEmbedElement: src property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/htmlembedelement/src/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HTMLEmbedElement: src property

The **`src`** property of the `HTMLEmbedElement` interface returns a string that indicates the URL of the resource being embedded.

It reflects the `src` attribute of the `` element.

## Value

A string.

## Examples

```html
<embed
  id="el"
  type="video/quicktime"
  src="movie.mov"
  width="640"
  height="480"
  title="Title of my video" />
```

```js
const el = document.getElementById("el");
console.log(el.src); // Output: "movie.mov"
```
