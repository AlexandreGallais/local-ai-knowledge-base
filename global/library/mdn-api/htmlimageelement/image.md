---
title: "HTMLImageElement: Image() constructor"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/htmlimageelement/image/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HTMLImageElement: Image() constructor

The **`Image()`**
constructor creates a new `HTMLImageElement` instance. It is functionally
equivalent to `document.createElement('img')`.

> **Note:**
> This function should not be confused with the CSS `image()` function.

## Syntax

```js
new Image()
new Image(width)
new Image(width, height)
```

### Parameters

- `width` (optional)
    The width of the image (i.e., the value for the `width`
    attribute).
- `height` (optional)
    The height of the image (i.e., the value for the `height`
    attribute).

## Usage note

The entire bitmap is loaded regardless of the sizes specified in the constructor. The
size specified in the constructor is reflected through the properties
`HTMLImageElement.width` and `HTMLImageElement.height` of the
resulting instance. The intrinsic width and height of the image in CSS pixels are
reflected through the properties `HTMLImageElement.naturalWidth` and
`HTMLImageElement.naturalHeight`. If no size is specified in the
constructor both pairs of properties have the same values.

## Examples

```js
const myImage = new Image(100, 200);
myImage.src = "picture.jpg";
document.body.appendChild(myImage);
```

This would be the equivalent of defining the following HTML tag inside the
`<body>`:

```html
<img width="100" height="200" src="picture.jpg" />
```
