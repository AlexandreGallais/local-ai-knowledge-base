---
title: "TextMetrics: emHeightAscent property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/textmetrics/emheightascent/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# TextMetrics: emHeightAscent property

The read-only `emHeightAscent` property of the `TextMetrics` interface returns the distance from the horizontal line indicated by the `CanvasRenderingContext2D.textBaseline` property to the top of the _em_ square in the line box, in CSS pixels.

## Value

A number, in CSS pixels.

## Examples

```js
const canvas = document.createElement("canvas");
const ctx = canvas.getContext("2d");
const text = ctx.measureText("foo"); // returns TextMetrics object

text.emHeightAscent; // 7.59765625;
```

## See also

- `TextMetrics`
