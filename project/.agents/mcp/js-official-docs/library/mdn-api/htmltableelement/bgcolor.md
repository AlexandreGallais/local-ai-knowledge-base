---
title: "HTMLTableElement: bgColor property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/htmltableelement/bgcolor/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HTMLTableElement: bgColor property

The **`bgcolor`** property of the `HTMLTableElement` represents the
background color of the table.

> **Note:**
> Do not use this attribute anymore. Instead, use the CSS `background-color` property by modifying the element's `style` attribute or using a style rule.

## Value

A string representing a color value.

When set to the `null` value, that `null` value is converted to the empty string (`""`), so `elt.bgColor = null` is equivalent to `elt.bgColor = ""`.

## Examples

```js
// Set table background color to lightblue
const t = document.getElementById("TableA");
t.bgColor = "lightblue";
```

## See also

- `background-color`
