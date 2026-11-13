---
title: "HTMLTableElement: cellSpacing property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/htmltableelement/cellspacing/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HTMLTableElement: cellSpacing property

While you should instead use the CSS
`border-spacing` property, the obsolete `HTMLTableElement`
interface's **`cellSpacing`** property represents the spacing
around the individual ` | ` and ` | ` elements
representing a table's cells. Any two cells are separated by the sum of the
`cellSpacing` of each of the two cells.

## Value

A string which is either a number of pixels (such as `"10"`) or a percentage value (like `"10%"`).

When set to the `null` value, that `null` value is converted to the empty string (`""`), so `elt.cellSpacing = null` is equivalent to `elt.cellSpacing = ""`.

## Examples

This example sets cell spacing for a given table to 10 pixels.

```js
const t = document.getElementById("TableA");
t.cellSpacing = "10";
```
