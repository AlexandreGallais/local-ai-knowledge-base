---
title: "TextMetrics: actualBoundingBoxDescent property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/textmetrics/actualboundingboxdescent/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# TextMetrics: actualBoundingBoxDescent property

The read-only `actualBoundingBoxDescent` property of the `TextMetrics` interface is a `double` giving the distance from the horizontal line indicated by the `CanvasRenderingContext2D.textBaseline` attribute to the bottom of the bounding rectangle used to render the text, in CSS pixels.

## Examples

```js
const canvas = document.createElement("canvas");
const ctx = canvas.getContext("2d");
const text = ctx.measureText("foo"); // returns TextMetrics object

text.actualBoundingBoxDescent; // 0;
```

## See also

- `TextMetrics`
