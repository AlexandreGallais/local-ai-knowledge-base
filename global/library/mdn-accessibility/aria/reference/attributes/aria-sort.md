---
title: "ARIA: aria-sort attribute"
tool: "mdn-accessibility"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/accessibility/aria/reference/attributes/aria-sort/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# ARIA: aria-sort attribute

The `aria-sort` attribute indicates if items in a table or grid are sorted in ascending or descending order.

## Description

If a grid or table provides sort functionality, the `aria-sort` attribute should be set to either `ascending` or `descending` (or `other`) on the header cell element for the sorted column or row.

The `aria-sort` attribute is only set on the currently sorted column or row. Set `aria-sort="ascending"` to indicate the data cells in the column or row are sorted in ascending order. If the sort order is reversed, toggle the value to `aria-sort="descending"`. When a different column or row becomes sorted, the single `aria-sort` attribute is moved to the header cell for the newly sorted column or row with the appropriate value for the sort order.

The `aria-sort` attribute should only be added to a single table or grid header at a time. The attribute is set to inform assistive technology users which column or row is sorted. It doesn't have any impact on the actual sort order.

## Examples

This table loads with the last name column sorted in ascending order.

```html
<table>
  <caption>
    Steering Committee Members
  </caption>
  <thead>
    <tr>
      <th>
        <button>First Name</button>
      </th>
      <th aria-sort="ascending">
        <button>Last Name</button>
      </th>
      <th>
        <button>Company</button>
      </th>
      <th>Email</th>
    </tr>
  </thead>
  <tbody>
    …
  </tbody>
</table>
```

If a user clicks on the _Last Name_ button, `aria-pressed="true"` would be added to the `` element and the `aria-sort` value would be toggled to `"descending"` with JavaScript. If the user clicks on a different header button, the `aria-sort` would be removed from the _Last Name_ header to be placed on the clicked button's ` | ` parent.

We provided instructions in the caption for assistive technology who may not see the down arrows that we would add with CSS targeting the `th[aria-sort="ascending"]` and `th[aria-sort="descending"]` selectors.

## Values

- `ascending`
    Items are sorted in ascending order by this column.
- `descending`
    Items are sorted in descending order by this column.
- `none` (default)
    There is no defined sort applied to the column.
- `other`
    A sorting algorithm other than ascending or descending has been applied.

## Associated interfaces

- `Element.ariaSort`
    The `ariaSort` property, part of the `Element` interface, reflects the value of the `aria-sort` attribute.
- `ElementInternals.ariaSort`
    The `ariaSort` property, part of the `ElementInternals` interface, reflects the value of the `aria-sort` attribute.

## Associated roles

Used in roles:

- `columnheader`
- `rowheader`

## See also

- Sortable table example - ARIA Authoring Practices Guide (APG)
- `aria-pressed`
- The ` | ` element
