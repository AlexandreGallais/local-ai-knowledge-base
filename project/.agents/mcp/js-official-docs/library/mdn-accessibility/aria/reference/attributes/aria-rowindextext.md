---
title: "ARIA: aria-rowindextext attribute"
tool: "mdn-accessibility"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/accessibility/aria/reference/attributes/aria-rowindextext/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# ARIA: aria-rowindextext attribute

The `aria-rowindextext` attribute defines a human-readable text alternative of `aria-rowindex`.

## Description

When you have a very long table or when you purposefully want to display just a section of a table, not all rows may be present in the DOM. When this happens, we use the `aria-rowcount` with an integer value to define how many rows the table (or grid) would have if all the rows were present and add the `aria-rowindex` property on each row and spanning cell to provide information on the row index within that larger table. When the value of `aria-rowindex` is not meaningful or does not reflect the displayed index, we can also add the `aria-rowindextext` to provide a human-readable text alternative to the `aria-rowindex` integer value.

The `aria-rowindextext` should only be included **in addition to**, not as a replacement of, the `aria-rowindex`. Some assistive technologies use the numeric row index for the purpose of keeping track of the user's position or providing alternative table navigation. The `aria-rowindextext` is useful if that integer value isn't meaningful or does not reflect the displayed index, such as a game of Chess or Battleship.

The `aria-rowindextext` is added to each `` or to elements with the `row` role. It can also be addition to cells or owned elements of each row.

## Values

- `<string>`
  - The human-readable text alternative of the numeric `aria-rowindex`

## Associated interfaces

- `Element.ariaRowIndexText`
    The `ariaRowIndexText` property, part of the `Element` interface, reflects the value of the `aria-rowindextext` attribute.
- `ElementInternals.ariaRowIndexText`
    The `ariaRowIndexText` property, part of the `ElementInternals` interface, reflects the value of the `aria-rowindextext` attribute.

## Associated roles

Used in roles:

- `cell`
- `row`

Inherited into roles:

- `columnheader`
- `gridcell`
- `rowheader`

## See also

- `aria-rowindex`
- `aria-rowcount`
- `aria-rowspan`
- `aria-colindextext`
- `aria-colindex`
