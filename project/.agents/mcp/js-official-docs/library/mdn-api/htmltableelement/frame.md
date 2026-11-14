---
title: "HTMLTableElement: frame property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/htmltableelement/frame/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HTMLTableElement: frame property

The `HTMLTableElement` interface's **`frame`**
property is a string that indicates which of the table's exterior borders should be
drawn.

## Value

One of the following:

- `void`
    No sides. This is the default.
- `"above"`
    Top side
- `"below"`
    Bottom side
- `"hsides"`
    Top and bottom only
- `"vsides"`
    Right and left sides only
- `"lhs"`
    Left-hand side only
- `"rhs"`
    Right-hand side only
- `"box"`
    All four sides
- `"border"`
    All four sides

## Examples

```js
// Set the frame of TableA to 'border'
const t = document.getElementById("TableA");
t.frame = "border";
t.border = "2px";
```
