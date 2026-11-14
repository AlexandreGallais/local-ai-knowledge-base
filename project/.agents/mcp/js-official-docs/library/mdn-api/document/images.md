---
title: "Document: images property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/document/images/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Document: images property

The **`images`** read-only property of the `Document` interface returns a collection of the images in the current HTML document.

## Value

An `HTMLCollection` providing a live list of all of the images contained in the current document.
Each entry in the collection is an `HTMLImageElement` representing a single image element.

## Usage notes

You can use either JavaScript array notation or the `item()` method on the returned collection to access the items in the collection.
The following are equivalent:

```js
firstImage = imageCollection.item(0);

firstImage = imageCollection[0];
```

## Examples

This example looks through the list of images and finds those named `"banner.gif"`.

```js
for (const image of document.images) {
  if (image.src === "banner.gif") {
    console.log("Found the banner");
  }
}
```
