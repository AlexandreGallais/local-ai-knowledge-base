---
title: "FontFace: ascentOverride property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/fontface/ascentoverride/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# FontFace: ascentOverride property

The **`ascentOverride`** property of the `FontFace` interface returns and sets the ascent metric for the font, the height above the baseline that CSS uses to lay out line boxes in an inline formatting context.

This property is equivalent to the `@font-face/ascent-override` descriptor of `@font-face`.

## Value

A string. The possible values are `normal`, indicating that the metric used should be obtained from the font file, or a percentage.

This property accepts the same values as the `@font-face/ascent-override` descriptor.

## Examples

```js
let fontFace = new FontFace(
  "Roboto",
  'url("https://fonts.example.com/roboto.woff2")',
  { ascentOverride: "90%" },
);
console.log(fontFace.ascentOverride); // 90%
fontFace.ascentOverride = "normal";
console.log(fontFace.ascentOverride); // 'normal'
```
