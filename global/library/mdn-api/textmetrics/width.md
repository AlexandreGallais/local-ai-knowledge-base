---
title: "TextMetrics: width property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/textmetrics/width/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# TextMetrics: width property

The read-only **`width`** property of the `TextMetrics` interface contains the text's advance width (the width of that inline box) in CSS pixels.

## Examples

Start with this `<canvas>` element:

```html
<canvas id="canvas"></canvas>
```

You can get a `TextMetrics` object using the following code:

```js
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let text = ctx.measureText("foo"); // TextMetrics object
text.width; // 16;
```

## See also

- `TextMetrics`
