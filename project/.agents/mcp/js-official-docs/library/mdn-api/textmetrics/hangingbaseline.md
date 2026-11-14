---
title: "TextMetrics: hangingBaseline property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/textmetrics/hangingbaseline/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# TextMetrics: hangingBaseline property

The read-only `hangingBaseline` property of the `TextMetrics` interface is a `double` giving the distance from the horizontal line indicated by the `CanvasRenderingContext2D.textBaseline` property to the hanging baseline of the line box, in CSS pixels.

## Examples

```js
const canvas = document.createElement("canvas");
const ctx = canvas.getContext("2d");
const text = ctx.measureText("foo"); // returns TextMetrics object

text.hangingBaseline; // 6.078125;
```

## See also

- `TextMetrics`
