---
title: "TextMetrics: fontBoundingBoxDescent property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/textmetrics/fontboundingboxdescent/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# TextMetrics: fontBoundingBoxDescent property

The read-only `fontBoundingBoxDescent` property of the `TextMetrics` interface returns the distance from the horizontal line indicated by the `CanvasRenderingContext2D.textBaseline` attribute to the bottom of the bounding rectangle of all the fonts used to render the text, in CSS pixels.

## Value

A number, in CSS pixels.

## Examples

The code below shows how you can get the `fontBoundingBoxDescent` for text in a particular font.

```js
const canvas = document.createElement("canvas");
const ctx = canvas.getContext("2d");

ctx.font = "25px serif";
const text = "Foo";

const textMetrics = ctx.measureText(text); // returns TextMetrics object
const descentCssPixels = textMetrics.fontBoundingBoxDescent;
```

```html
<p id="log"></p>
```

```js
const log = document.getElementById("log");
log.innerText = `fontBoundingBoxDescent: ${descentCssPixels}`;
```

The descent in CSS pixels for the text "Foo" in a 25px serif font is shown below.

## See also

- `TextMetrics.fontBoundingBoxAscent`
- `TextMetrics`
