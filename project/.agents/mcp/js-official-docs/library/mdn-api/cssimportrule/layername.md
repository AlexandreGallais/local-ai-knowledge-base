---
title: "CSSImportRule: layerName property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/cssimportrule/layername/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# CSSImportRule: layerName property

The read-only **`layerName`** property of the `CSSImportRule` interface returns the name of the cascade layer created by the `@import` at-rule.

If the created layer is anonymous, the string is empty (`""`), if no layer has been
created, it is the `null` object.

## Value

A string, that can be empty, or the `null` object.

## Examples

The document's single stylesheet contains three `@import` rules. The first declaration imports a stylesheet into a named layer. The second declaration imports a stylesheet into an anonymous layer. The third declaration imports a stylesheet without a layer declaration.

The `layerName` property returns the name of the layer associated with the imported
stylesheet.

```css
@import "style1.css" layer(layer-1);
@import "style2.css" layer;
@import "style3.css";
```

```js
const myRules = document.styleSheets[0].cssRules;
console.log(myRules[0].layerName); // returns `"layer-1"`
console.log(myRules[1].layerName); // returns `""` (an anonymous layer)
console.log(myRules[2].layerName); // returns `null`
```

## See also

- Learning area : Cascade layers
- `@import` and `@layer`
