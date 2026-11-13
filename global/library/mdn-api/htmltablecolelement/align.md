---
title: "HTMLTableColElement: align property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/htmltablecolelement/align/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HTMLTableColElement: align property

The **`align`** property of the `HTMLTableColElement` interface is a string indicating how to horizontally align text in a table `` column element.

> **Note:**
> This property is deprecated, and CSS should be used to align text horizontally in a column. Use the CSS `text-align` property, which takes precedence, to horizontally align text in a column instead.
>
> As ` | ` are not children of ``, you can't set it directly on a `` element, you need to select the cells of the column using a `td:nth-last-child(n)` or similar (`n` is the column number, counting from the end).

## Value

The possible values are:

- `left`
    Align the text to the left. Use `text-align: left` applied directly to the ` | ` or ` | ` instead.
- `right`
    Align the text to the right. Use `text-align: right` applied directly to the ` | ` or ` | ` instead.
- `center`
    Center the text in the cell. Use `text-align: center` instead.

## Examples

Use CSS `text-align` on the ` | ` and ` | ` elements. As ` | ` elements of a column are not children of ``, setting the `align` attribute in HTML or `text-align` property in CSS on a `` element will have no effect. Instead, select the cells of a column using a `:is(td, tr):nth-child(n)`, where `n` is the column number, or similar.

An example is available on the `:nth-child()` page.

## See also

- `text-align`
- `:nth-child()`
- `:nth-last-child()`
- Learn: Styling tables
