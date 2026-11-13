---
title: "HTMLTableCellElement: bgColor property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/htmltablecellelement/bgcolor/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HTMLTableCellElement: bgColor property

The **`HTMLTableCellElement.bgColor`** property is used to set the background color of a cell or get the value of the obsolete `bgColor` attribute, if present.

> **Note:**
> This property is deprecated and CSS should be used to set the background color. Use the `background-color` property instead.

## Value

One of the following value types can be used:

- a named color, like `red` or `blue`
- a hex code, like `#0000dd` or `#00d`

> **Note:**
> The values accepted here are a limited subset of the CSS color values. Only `named-color` and 3- or 6-digit `hex-color` (with no alpha-channel). While all HTML color values are valid in CSS, this is not true in the other direction.

## Examples

Use CSS `background-color` instead. An example of using `background-color` with HTML table elements is available on the `background-color` page.

## See also

- `HTMLTableRowElement.bgColor`
