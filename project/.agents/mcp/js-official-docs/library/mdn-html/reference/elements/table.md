---
title: "`<table>` HTML table element (part 1 of 3)"
tool: "mdn-html"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/html/reference/elements/table/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `<table>` HTML table element

The **``** HTML element represents tabular data—that is, information presented in a two-dimensional table comprised of rows and columns of cells containing data.

```html
<table>
  <caption>
    Front-end web developer course 2021
  </caption>
  <thead>
    <tr>
      <th scope="col">Person</th>
      <th scope="col">Most interest in</th>
      <th scope="col">Age</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">Chris</th>
      <td>HTML tables</td>
      <td>22</td>
    </tr>
    <tr>
      <th scope="row">Dennis</th>
      <td>Web accessibility</td>
      <td>45</td>
    </tr>
    <tr>
      <th scope="row">Sarah</th>
      <td>JavaScript frameworks</td>
      <td>29</td>
    </tr>
    <tr>
      <th scope="row">Karen</th>
      <td>Web performance</td>
      <td>36</td>
    </tr>
  </tbody>
  <tfoot>
    <tr>
      <th scope="row" colspan="2">Average age</th>
      <td>33</td>
    </tr>
  </tfoot>
</table>
```

```css
table {
  border-collapse: collapse;
  border: 2px solid rgb(140 140 140);
  font-family: sans-serif;
  font-size: 0.8rem;
  letter-spacing: 1px;
}

caption {
  caption-side: bottom;
  padding: 10px;
  font-weight: bold;
}

thead,
tfoot {
  background-color: rgb(228 240 245);
}

th,
td {
  border: 1px solid rgb(160 160 160);
  padding: 8px 10px;
}

td:last-of-type {
  text-align: center;
}

tbody > tr:nth-of-type(even) {
  background-color: rgb(237 238 242);
}

tfoot th {
  text-align: right;
}

tfoot td {
  font-weight: bold;
}
```

## Attributes

This element includes the global attributes.

### Deprecated attributes

The following attributes are deprecated and should not be used. They are documented below for reference when updating existing code and for historical interest only.

- `align` (deprecated)
    Specifies the horizontal alignment of the table within its parent element. The possible enumerated values are `left`, `center`, and `right`. Use the `margin-inline-start` and `margin-inline-end` CSS properties instead, as this attribute is deprecated.

- `bgcolor` (deprecated)
    Defines the background color of the table. The value is an HTML color; either a 6-digit hexadecimal RGB code, prefixed by a `#`, or a color keyword. Other CSS `<color>` values are not supported. Use the `background-color` CSS property instead, as this attribute is deprecated.

- `border` (deprecated)
    Defines, as a non-negative integer value (in pixels), the size of the frame surrounding the table. If set to `0`, the `frame` attribute is set to void. Use the `border` CSS property instead, as this attribute is deprecated.

- `cellpadding` (deprecated)
    Defines the space between the content of a cell and its border. This attribute is obsolete: instead of using it, apply the `padding` CSS property to the ` | ` and ` | ` elements.

- `cellspacing` (deprecated)
    Defines the size of the space between two cells. This attribute is obsolete: instead of using it, set the `border-spacing` CSS property on the `` element. Note that this has no effect if the `` element's `border-collapse` CSS property is set to `collapse`.

- `frame` (deprecated)
    Defines which side of the frame surrounding the table must be displayed. The possible enumerated values are `void`, `above`, `below`, `hsides`, `vsides`, `lhs`, `rhs`, `box` and `border`. Use the `border-style` and `border-width` CSS properties instead, as this attribute is deprecated.

- `rules` (deprecated)
    Defines where rules (borders) are displayed in the table. The possible enumerated values are `none` (default value), `groups` (``, ``, and `` elements), `rows` (horizontal lines), `cols` (vertical lines), and `all` (border around every cell). Use the `border` CSS property on the appropriate table-related elements, as well as on the `` itself, instead, as this attribute is deprecated.

- `summary` (deprecated)
    Defines an alternative text that summarizes the content of the table. Use the `` element instead, as this attribute is deprecated.

- `width` (deprecated)
    Specifies the width of the table. Use the `width` CSS property instead, as this attribute is deprecated.

    > **Note:**
    > While no HTML specification includes `height` as a `` attribute, some browsers support a non-standard interpretation of `height`. The unitless value sets a minimum absolute height in pixels. If set as a percent value, the minimum table height will be relative to the parent container's height. Use the `min-height` CSS property instead, as this attribute is deprecated.

## Visual layout of table contents

Following elements are part of the table structure:

- ``
- ``
- ``
- ``
- ` | `
- ``
- ``
- ` | `
- ``

The `` box establishes a table formatting context. Elements inside the `` generate rectangular boxes. Each box occupies a number of table cells according to the following rules:

1. The row boxes fill the table in the source code order from top to bottom. Each row box occupies one row of cells.
2. A row group box occupies one or more row boxes.
3. Column boxes are placed next to each other in source code order. Depending on the value of the `dir` attribute, the columns are laid in left-to-right or right-to-left direction. A column box occupies one or more columns of table cells.
4. A column group box occupies one or more column boxes.
5. A cell box may span over multiple rows and columns. User agents trim cells to fit in the available number of rows and columns.

Table cells do have padding. Boxes that make up a table do not have margins.

### Table layers and transparency

For styling purpose the table elements may be thought of as being put on six superimposed layers:

The background set on an element in one layer will be visible only if the layers above it have transparent background. A missing cell is rendered as if an anonymous table-cell box occupied that place.

## Accessibility

### Captions

By supplying a `` element whose value clearly and concisely describes the table's purpose, it helps the people decide if they need to check the rest of the table content or skip over it.

This helps people navigating with the aid of assistive technology such as a screen reader, people experiencing low vision conditions, and people with cognitive concerns.

- MDN Adding a caption to your table with \
- Caption & Summary • Tables • W3C WAI Web Accessibility Tutorials

### Scoping rows and columns

The `scope` attribute on header cells (` | ` elements) is redundant in simple contexts, because scope is inferred. However, some assistive technologies may fail to draw correct inferences, so specifying header scope may improve user experiences. In complex tables, `scope` can be specified to provide necessary information about the cells related to a header.

- MDN table accessibility guide
- Tables with two headers • Tables • W3C WAI Web Accessibility Tutorials
- Tables with irregular headers • Tables • W3C WAI Web Accessibility Tutorials
- H63: Using the scope attribute to associate header cells and data cells in data tables | W3C Techniques for WCAG 2.0

### Complicated tables

Assistive technologies such as screen readers may have difficulty parsing tables that are so complex that header cells can't be associated in a strictly horizontal or vertical way. This is typically indicated by the presence of the `colspan` and `rowspan` attributes.

Ideally, consider alternate ways to present the table's content, including breaking it apart into a collection of smaller, related tables that don't have to rely on using the `colspan` and `rowspan` attributes. In addition to helping people who use assistive technology understand the table's content, this may also benefit people with cognitive concerns who may have difficulty understanding the associations the table layout is describing.

If the table cannot be broken apart, use a combination of the `id` and `headers` attributes to programmatically associate each table cell with the header(s) (` | ` elements) the cell is associated with.

- MDN table accessibility guide
- Tables with multi-level headers • Tables • W3C WAI Web Accessibility Tutorials
- H43: Using id and headers attributes to associate data cells with header cells in data tables | Techniques for W3C WCAG 2.0
