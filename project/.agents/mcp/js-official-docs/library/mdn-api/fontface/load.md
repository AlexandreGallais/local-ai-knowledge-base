---
title: "FontFace: load() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/fontface/load/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# FontFace: load() method

The **`load()`** method of the `FontFace` interface requests and loads a font whose `source` was specified as a URL. It returns a `Promise` that resolves with the current `FontFace` object.

If the `source` for the font face was specified as binary data, or the font `status` property of the font face is anything other than `unloaded`, then this method does nothing.

## Syntax

```js
load()
```

### Parameters

None.

### Return value

A `Promise` that resolves with a reference to the current `FontFace` object when the font loads or rejects with a `NetworkError` `DOMException` if the loading process fails.

### Exceptions

- `NetworkError` `DOMException`
    Indicates that the attempt to load the font failed.

## Examples

This simple example loads a font and uses it to display some text in a canvas element (with an id of `js-canvas`).

```html
<canvas id="js-canvas"></canvas>
```

```js
const canvas = document.getElementById("js-canvas");

// load the "Bitter" font from Google Fonts
const fontFile = new FontFace(
  "FontFamily Style Bitter",
  'url("https://mdn.github.io/shared-assets/fonts/bitter/Bitter-Regular.woff2")',
);
document.fonts.add(fontFile);

fontFile.load().then(
  () => {
    // font loaded successfully!
    canvas.width = 650;
    canvas.height = 100;
    const ctx = canvas.getContext("2d");

    ctx.font = '36px "FontFamily Style Bitter"';
    ctx.fillText("Bitter font loaded", 20, 50);
  },
  (err) => {
    console.error(err);
  },
);
```
