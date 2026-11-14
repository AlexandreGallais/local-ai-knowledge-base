---
title: "HTMLCanvasElement: toDataURL() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/htmlcanvaselement/todataurl/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HTMLCanvasElement: toDataURL() method

The **`HTMLCanvasElement.toDataURL()`** method returns a data URL containing a representation of the image in the format specified by the `type` parameter.

The desired file format and image quality may be specified.
If the file format is not specified, or if the given format is not supported, then the data will be exported as `image/png`.
In other words, if the returned value starts with `data:image/png` for any other requested `type`, then that format is not supported.

Browsers are required to support `image/png`; many will support additional formats including `image/jpeg` and `image/webp`.

The created image data will have a resolution of 96dpi for file formats that support encoding resolution metadata.

> **Warning:**
> `toDataURL()` encodes the whole image in an in-memory string. For larger images, this can have performance implications, and may even overflow browsers' URL length limit when assigned to `HTMLImageElement.src`. You should generally prefer `toBlob()` instead, in combination with `URL.createObjectURL()`.

## Syntax

```js
toDataURL()
toDataURL(type)
toDataURL(type, quality)
```

### Parameters

- `type` (optional)
    A string indicating the image format.
    The default type is `image/png`; this image format will be also used if the specified type is not supported.
- `quality` (optional)
    A `Number` between `0` and `1` indicating the image quality to be used when creating images using file formats that support lossy compression (such as `image/jpeg` or `image/webp`).
    A user agent will use its default quality value if this option is not specified, or if the number is outside the allowed range.

### Return value

A string containing the requested data URL.

If the height or width of the canvas is `0` or larger than the maximum canvas size, the string `"data:,"` is returned.

### Exceptions

- `SecurityError` `DOMException`
    The canvas's bitmap is not origin clean;
    at least some of its contents have or may have been loaded from a site other than the one from which the document itself was loaded.

## Examples

Given this `<canvas>` element:

```html
<canvas id="canvas" width="5" height="5"></canvas>
```

You can get a data-URL of the canvas with the following lines:

```js
const canvas = document.getElementById("canvas");
const dataURL = canvas.toDataURL();
console.log(dataURL);
// "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNby
// blAAAADElEQVQImWNgoBMAAABpAAFEI8ARAAAAAElFTkSuQmCC"
```

### Setting image quality with jpegs

```js
const fullQuality = canvas.toDataURL("image/jpeg", 1.0);
// data:image/jpeg;base64,/9j/4AAQSkZJRgABAQ…9oADAMBAAIRAxEAPwD/AD/6AP/Z"
const mediumQuality = canvas.toDataURL("image/jpeg", 0.5);
const lowQuality = canvas.toDataURL("image/jpeg", 0.1);
```

### Example: Dynamically change images

You can use this technique in coordination with mouse events in order to dynamically change images (gray-scale vs. color in this example):

#### HTML

```html
<img class="grayscale" src="myPicture.png" alt="Description of my picture" />
```

#### JavaScript

```js
function showColorImg() {
  this.style.display = "none";
  this.nextSibling.style.display = "inline";
}

function showGrayImg() {
  this.previousSibling.style.display = "inline";
  this.style.display = "none";
}

function removeColors() {
  const images = document.getElementsByClassName("grayscale");
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  for (const colorImg of images) {
    const width = colorImg.offsetWidth;
    const height = colorImg.offsetHeight;
    canvas.width = width;
    canvas.height = height;
    ctx.drawImage(colorImg, 0, 0);
    const imgData = ctx.getImageData(0, 0, width, height);
    const pix = imgData.data;
    const pixLen = pix.length;
    for (let pixel = 0; pixel < pixLen; pixel += 4) {
      pix[pixel + 2] =
        pix[pixel + 1] =
        pix[pixel] =
          (pix[pixel] + pix[pixel + 1] + pix[pixel + 2]) / 3;
    }
    ctx.putImageData(imgData, 0, 0);
    const grayImg = new Image();
    grayImg.src = canvas.toDataURL();
    grayImg.onmouseover = showColorImg;
    colorImg.onmouseout = showGrayImg;
    ctx.clearRect(0, 0, width, height);
    colorImg.style.display = "none";
    colorImg.parentNode.insertBefore(grayImg, colorImg);
  }
}

removeColors();
```

## See also

- Data URLs in the HTTP reference.
