---
title: "HTMLTableSectionElement"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/htmltablesectionelement/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HTMLTableSectionElement

The **`HTMLTableSectionElement`** interface provides special properties and methods (beyond the `HTMLElement` interface it also has available to it by inheritance) for manipulating the layout and presentation of sections, that is headers, footers and bodies (``, ``, and ``, respectively) in an HTML table.

## Instance properties

_Inherits properties from its parent, `HTMLElement`._

- `HTMLTableSectionElement.align` (deprecated)
    A string containing an enumerated value reflecting the `align` attribute. It indicates the alignment of the element's contents with respect to the surrounding context. The possible values are `"left"`, `"right"`, and `"center"`.
- `HTMLTableSectionElement.rows` (read-only)
    Returns a live `HTMLCollection` containing the rows in the section. The `HTMLCollection` is live and is automatically updated when rows are added or removed.
- `HTMLTableSectionElement.ch` (deprecated)
    A string containing one single character. This character is the one to align all the cells of a column on. It reflects the `char` and defaults to the decimal points associated with the language, e.g., `'.'` for English, or `','` for French. This property was optional and was not very well supported.
- `HTMLTableSectionElement.chOff` (deprecated)
    A string containing an integer indicating how many characters must be left at the right (for left-to-right scripts; or at the left for right-to-left scripts) of the character defined by `HTMLTableRowElement.ch`. This property was optional and was not very well supported.
- `HTMLTableSectionElement.vAlign` (deprecated)
    A string representing an enumerated value indicating how the content of the cell must be vertically aligned. It reflects the `valign` attribute and can have one of the following values: `"top"`, `"middle"`, `"bottom"`, or `"baseline"`.

## Instance methods

_Inherits methods from its parent, `HTMLElement`_.

- `HTMLTableSectionElement.deleteRow()`
    Removes the row, corresponding to the `index` given in parameter, in the section. If the `index` value is `-1` the last row is removed; if it smaller than `-1` or greater than the number of rows in the collection, a `DOMException` with the value `IndexSizeError` is raised.
- `HTMLTableSectionElement.insertRow()`
    Returns an `HTMLTableRowElement` representing a new row of the section. It inserts it in the rows collection immediately before the `` element at the given `index` position. If the `index` is `-1`, the new row is appended to the collection. If the `index` is smaller than `-1` or greater than the number of rows in the collection, a `DOMException` with the value `IndexSizeError` is raised.

## See also

- The HTML elements implementing this interface: ``, ``, and ``.
