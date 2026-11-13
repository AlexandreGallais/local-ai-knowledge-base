---
title: "HTMLTableElement: cellPadding property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/htmltableelement/cellpadding/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HTMLTableElement: cellPadding property

The **`HTMLTableElement.cellPadding`** property represents the
padding around the individual cells of the table.

## Value

A string representing pixels (e.g., `"10"`) or a percentage value (e.g., `"10%"`).

When set to the `null` value, that `null` value is converted to the empty string (`""`), so `elt.cellPadding = null` is equivalent to `elt.cellPadding = ""`.

## Examples

```js
// Set cell padding to 10 pixels
let t = document.getElementById("TableA");
t.cellPadding = "10";
```
