---
title: "FontFace: descentOverride property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/fontface/descentoverride/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# FontFace: descentOverride property

The **`descentOverride`** property of the `FontFace` interface returns and sets the value of the `@font-face/descent-override` descriptor.
The possible values are `normal`, indicating that the metric used should be obtained from the font file, or a percentage.

## Value

A string.

## Examples

```js
let fontFace = new FontFace(
  "Roboto",
  'url("https://fonts.example.com/roboto.woff2")',
  { descentOverride: "90%" },
);
console.log(fontFace.descentOverride); // 90%
fontFace.descentOverride = "normal";
console.log(fontFace.descentOverride); // 'normal'
```
