---
title: "TextMetrics: actualBoundingBoxLeft property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/textmetrics/actualboundingboxleft/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# TextMetrics: actualBoundingBoxLeft property

The read-only `actualBoundingBoxLeft` property of the `TextMetrics` interface is a `double` giving the distance parallel to the baseline from the alignment point given by the `CanvasRenderingContext2D.textAlign` property to the left side of the bounding rectangle of the given text, in CSS pixels; positive numbers indicating a distance going left from the given alignment point.

## Examples

```js
const canvas = document.createElement("canvas");
const ctx = canvas.getContext("2d");
const text = ctx.measureText("foo"); // returns TextMetrics object

text.actualBoundingBoxLeft; // 0;
```

## See also

- `TextMetrics`
