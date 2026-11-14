---
title: "SVGImageElement: decode() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/svgimageelement/decode/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# SVGImageElement: decode() method

The **`decode()`** method of the
`SVGImageElement` interface initiates asynchronous decoding of an image,
returning a `Promise` that resolves once the image is decoded and it is safe to append
it to the DOM.

## Syntax

```js
decode()
```

### Parameters

None.

### Return value

A `Promise` that fulfills with `undefined` once the image data is ready to be used, for example by appending it to the DOM, replacing an existing image, and so forth.

### Exceptions

None.

## Examples

In the below example, you'll likely get an empty image shown on the page as the image is downloaded:

```js
const SVG_NS = "http://www.w3.org/2000/svg";
const svg = document.querySelector("svg");

const img = document.createElementNS(SVG_NS, "image");
img.src = "img/logo.svg";
svg.appendChild(img);
```

Using `decode()` will delay inserting the image into the DOM until it is fully downloaded and decoded, thereby avoiding the empty image problem:

```js
const SVG_NS = "http://www.w3.org/2000/svg";
const svg = document.querySelector("svg");

async function getImage() {
  const img = document.createElementNS(SVG_NS, "image");
  img.src = "img/logo.svg";
  await img.decode();
  svg.appendChild(img);
  const text = document.createElementNS(SVG_NS, "text");
  text.textContent = "Image is fully loaded!";
  svg.appendChild(text);
}
```

This is particularly useful if you're dynamically swapping an existing image for a new one, and also prevents unrelated paints outside of this code from being held up while the image is decoding.

## See also

- `HTMLImageElement.decode()`: The same thing, but for HTML `` elements
- What does the image decoding attribute actually do? on tunetheweb.com (2023)
