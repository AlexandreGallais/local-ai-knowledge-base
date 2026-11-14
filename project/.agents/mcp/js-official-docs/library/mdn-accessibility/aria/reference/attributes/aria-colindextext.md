---
title: "ARIA: aria-colindextext attribute"
tool: "mdn-accessibility"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/accessibility/aria/reference/attributes/aria-colindextext/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# ARIA: aria-colindextext attribute

The `aria-colindextext` attribute defines a human-readable text alternative of the numeric `aria-colindex`.

## Description

When you have a very large table or when you purposefully want to display just a section of a table, not all columns may be present in the DOM. When this happens, we use the `aria-colcount` with an integer value to define how many columns the table (or grid) would have if all the columns were present and add the `aria-colindex` property on each column to provide information on the column index within that larger table.

In the following HTML snippet, our table has 8 columns, but we are only displaying 4. The "city" column is the fifth column of our larger table, as defined by `aria-colindex="5"`.

```html
<table aria-colcount="8">
  <thead>
    <tr>
      <th aria-colindex="1" scope="col">First name</th>
      <th aria-colindex="2" scope="col">Last name</th>
      <th aria-colindex="5" scope="col">City</th>
      <th aria-colindex="7" scope="col">Zip</th>
    </tr>
  </thead>
  …
</table>
```

This table is not very complex. Had this been a 100+ column spreadsheet or a grid without column headers, such as a chess board, the provided or calculated value of `aria-colindex` might not be meaningful or may not reflect the displayed index. When this is the case, `aria-colindextext` can be included. The value is a string that is a human-readable text alternative to the numeric `aria-colindex`.

```html
<table aria-colcount="128">
  <thead>
    <tr>
      <th aria-colindex="1" aria-colindextext="NYSE stock symbol" scope="col">
        NYSE
      </th>
      <th
        aria-colindex="110"
        aria-colindextext="Value at start of 2021"
        scope="col">
        01/21
      </th>
      <th
        aria-colindex="122"
        aria-colindextext="Value at start of 2022"
        scope="col">
        01/22
      </th>
      <th aria-colindex="124" scope="col">Recommendation</th>
    </tr>
  </thead>
  …
</table>
```

In the above example, the table has 128 columns of which only 4 columns are shown. The `aria-colindextext` is used in three columns to provide human-readable text alternatives. By including `aria-colindextext="Value at start of 2021"`, assistive technologies can announce "Value at start of 2021" instead of "Column 110".

Only use `aria-colindextext` when the provided or calculated value of `aria-colindex` is not meaningful or does not reflect the displayed index. Whenever you include `aria-colindextext`, also keep the `aria-colindex` as some assistive technologies rely on the numeric column index for the purpose of keeping track of the user's position and in providing alternative table navigation.

> **Note:**
> While `aria-colindex` can be added to a row when all the columns present are contiguous as sequential values can be deduced, `aria-colindextext` is NOT a supported property of `row`.

See related `aria-rowindextext`.

## Values

- `<string>`
    The human-readable text alternative of the numeric `aria-colindex`

## Associated interfaces

- `Element.ariaColIndexText`
    The `ariaColIndexText` property, part of the `Element` interface, reflects the value of the `aria-colindextext` attribute.
- `ElementInternals.ariaColIndexText`
    The `ariaColIndexText` property, part of the `ElementInternals` interface, reflects the value of the `aria-colindextext` attribute.

## Associated roles

Used in roles:

- `cell`

Inherits into roles:

- `columnheader`
- `rowheader`

## See also

- `Element.ariaColIndexText`
- `aria-colindex`
- `aria-rowindextext`
- `aria-colcount`
- `cell` role
- `columnheader` role
- `rowheader` role
