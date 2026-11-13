---
title: "HTMLStyleElement: sheet property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/htmlstyleelement/sheet/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HTMLStyleElement: sheet property

The read-only **`sheet`** property of the `HTMLStyleElement` interface
contains the stylesheet associated with that element.

## Value

A `CSSStyleSheet` object, or `null` if none is associated with the element.

## Examples

Suppose the `<head>` contains the following:

```html
<style id="inline-style">
  p {
    color: blue;
  }
</style>
```

The `sheet` property of the associated `HTMLStyleElement` object will return the `CSSStyleSheet` object describing it.

```js
const style = document.getElementById("inline-style");
console.log(style.sheet.cssRules[0].cssText); // 'p { color: blue; }'
```
