---
title: "HTMLImageElement: loading property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/htmlimageelement/loading/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HTMLImageElement: loading property

The **`loading`** property of the `HTMLImageElement` interface provides a hint to the browser on how to handle the loading of the image which is currently outside the window's visual viewport. This helps to optimize the loading of the document's contents by postponing loading the image until it's expected to be needed, rather than immediately during the initial page load. It reflects the `` element's `loading` content attribute.

## Value

A string whose value is one of `eager` or `lazy`. For their meanings, see the HTML `` reference.

## Examples

### Basic usage

The `addImageToList()` function shown below adds a photo thumbnail to a list of items, using lazy-loading to avoid loading the image from the network until it's actually needed.

```js
function addImageToList(url) {
  const list = document.querySelector("div.photo-list");

  const newItem = document.createElement("div");
  newItem.className = "photo-item";

  const newImg = document.createElement("img");
  newImg.loading = "lazy";
  newImg.width = 320;
  newImg.height = 240;
  newImg.src = url;

  newItem.appendChild(newImg);
  list.appendChild(newItem);
}
```

## See also

- The `` element
- Web performance in the MDN Learning Area
- Lazy loading in the MDN web performance guide
