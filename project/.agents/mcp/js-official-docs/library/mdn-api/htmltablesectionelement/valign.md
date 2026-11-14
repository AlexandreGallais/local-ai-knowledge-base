---
title: "HTMLTableSectionElement: vAlign property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/htmltablesectionelement/valign/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HTMLTableSectionElement: vAlign property

The **`vAlign`** property of the `HTMLTableSectionElement` interface is a string indicating how to vertically align text in a ``, `` or `` table section. Individual rows and cells can override it.

> **Note:**
> This property is deprecated. Use the CSS `vertical-align` property to horizontally align text in section cells instead.

## Value

The possible values are: `"top"`, `"middle"`, `"bottom"`, or `"baseline"`

- `top`
    Align the text to the top of the cell. Use `vertical-align: top` instead.
- `center`
    Vertically center the text in the cell. Synonym of `middle`. Use `vertical-align: middle` instead.
- `middle`
    Vertically center the text in the cell. Use `vertical-align: middle` instead.
- `bottom`
    Align the text to the bottom of the cell. Use `vertical-align: bottom` instead.
- `baseline`
    Similar to `top`, but align the baseline of the text as close to the top so no part of the character is outside of the cell.

## Examples

Use CSS `vertical-align` instead, which takes precedence, as demonstrated in the vertical alignment table cells example.

## See also

- `vertical-align`
- Learn: Styling tables
