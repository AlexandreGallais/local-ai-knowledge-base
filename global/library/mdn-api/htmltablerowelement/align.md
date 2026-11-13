---
title: "HTMLTableRowElement: align property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/htmltablerowelement/align/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HTMLTableRowElement: align property

The **`align`** property of the `HTMLTableRowElement` interface is a string indicating how to horizontally align text in the `` table row. Individual cells can override it.

> **Note:**
> This property is deprecated, and CSS should be used to align text horizontally in a cell. Use the CSS `text-align` property, which takes precedence, to horizontally align text in a row instead.

## Value

The possible values are:

- `left`
    Align the text to the left. Use `text-align: left` instead.
- `right`
    Align the text to the right. Use `text-align: right` instead.
- `center`
    Center the text in the cell. Use `text-align: center` instead.
- `justify`
    Spread the text across the cell. Use `text-align: justify` instead.
- `char`
    Never fully supported, align text to a specified character. Use `text-align: <string>`, where the string is a single character, when supported.

## Examples

Use CSS `text-align` instead. An example is available on the `text-align` page.

## See also

- `text-align`
- Learn: Styling tables
