---
title: "TextMetrics: emHeightDescent property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/textmetrics/emheightdescent/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# TextMetrics: emHeightDescent property

The read-only `emHeightDescent` property of the `TextMetrics` interface returns the distance from the horizontal line indicated by the `CanvasRenderingContext2D.textBaseline` property to the bottom of the _em_ square in the line box, in CSS pixels.

## Value

A number, in CSS pixels.

## Examples

```js
const canvas = document.createElement("canvas");
const ctx = canvas.getContext("2d");
const text = ctx.measureText("foo"); // returns TextMetrics object

text.emHeightDescent; // -2.40234375;
```

## See also

- `TextMetrics`
