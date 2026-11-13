---
title: "HTMLTableColElement: vAlign property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/htmltablecolelement/valign/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HTMLTableColElement: vAlign property

The **`vAlign`** property of the `HTMLTableColElement` interface is a string indicating how to vertically align text in a table `` column element.

> **Note:**
> This property is deprecated, and CSS should be used to align text vertically in a column. Use the CSS `vertical-align` property, which takes precedence, to vertically align text in each column cell instead.
>
> As ` | ` are not children of ``, you can't set it directly on a `` element, you need to select the cells of the column using a `td:nth-child(n)` or similar (`n` is the column number).

## Value

The possible values are: `"top"`, `"middle"`, `"bottom"`, or `"baseline"`

- `top`
    Align the text to the top of the column. Use `vertical-align: top` instead.
- `center`
    Vertically center the text in the column. Synonym of `middle`. Use `vertical-align: middle` instead.
- `middle`
    Vertically center the text in the column. Use `vertical-align: middle` instead.
- `bottom`
    Align the text to the bottom of the column. Use `vertical-align: bottom` instead.
- `baseline`
    Similar to `top`, but align the baseline of the text as close to the top so no part of the character is outside of the cell.

## Examples

Use CSS `vertical-align`. As ` | ` elements of a column are not children of ``, you can't set it directly on a ``, you need to select the cells using a `td:nth-child(n)` or similar (`n` is the column number).

An example is available on the `:nth-child()` page.

## See also

- `vertical-align`
- `:nth-child()`
- Learn: Styling tables
