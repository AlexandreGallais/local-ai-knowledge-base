---
title: "`<td>` HTML table data cell element"
tool: "mdn-html"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/html/reference/elements/td/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `<td>` HTML table data cell element

The **` | `** HTML element defines a cell of a table that contains data and may be used as a child of the `` element.

```html
<table>
  <caption>
    Alien football stars
  </caption>
  <thead>
    <tr>
      <th scope="col">Player</th>
      <th scope="col">Gloobles</th>
      <th scope="col">Za'taak</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">TR-7</th>
      <td>7</td>
      <td>4,569</td>
    </tr>
    <tr>
      <th scope="row">Khiresh Odo</th>
      <td>7</td>
      <td>7,223</td>
    </tr>
    <tr>
      <th scope="row">Mia Oolong</th>
      <td>9</td>
      <td>6,219</td>
    </tr>
  </tbody>
</table>
```

```css
th,
td {
  border: 1px solid rgb(160 160 160);
  padding: 8px 10px;
}

th[scope="col"] {
  background-color: #505050;
  color: white;
}

th[scope="row"] {
  background-color: #d6ecd4;
}

td {
  text-align: center;
}

tr:nth-of-type(even) {
  background-color: #eeeeee;
}

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
}
```

## Attributes

This element includes the global attributes.

- `colspan`
    Contains a non-negative integer value that indicates how many columns the data cell spans or extends. The default value is `1`. Values higher than `1000` are clipped to `1000`.
- `headers`
    Contains a list of space-separated strings, each corresponding to the `id` attribute of the ` | ` elements that provide headings for this table cell.
- `rowspan`
    Contains a non-negative integer value that indicates for how many rows the data cell spans or extends. The default value is `1`; if its value is set to `0`, it extends until the end of the table grouping section (``, ``, ``, even if implicitly defined), that the cell belongs to. Values higher than `65534` are clipped to `65534`.

### Deprecated attributes

The following attributes are deprecated and should not be used. They are documented below for reference when updating existing code and for historical interest only.

- `abbr` (deprecated)
    Contains a short abbreviated description of the data cell's content. Some user-agents, such as speech readers, may present this description before the content itself. Put the abbreviated content inside the cell and place the (longer) description in the `title` attribute, as this attribute is deprecated. Or, preferably, include the content within the data cell, and use CSS to visually clip overflowing text.

- `align` (deprecated)
    Specifies the horizontal alignment of the data cell. The possible enumerated values are `left`, `center`, `right`, `justify`, and `char`. When supported, the `char` value aligns the textual content on the character defined in the `char` attribute and the offset defined by the `charoff` attribute. Use the `text-align` CSS property instead, as this attribute is deprecated.

- `axis` (deprecated)
    Contains a list of space-separated strings, each corresponding to the `id` attribute of a group of cells that the data cell applies to.

- `bgcolor` (deprecated)
    Defines the background color of the data cell. The value is an HTML color; either a 6-digit hexadecimal RGB code, prefixed by a `#`, or a color keyword. Other CSS `<color>` values are not supported. Use the `background-color` CSS property instead, as this attribute is deprecated.

- `char` (deprecated)
    Does nothing. It was originally intended to specify the alignment of the content to a character of the data cell. Typical values for this include a period (`.`) when attempting to align numbers or monetary values. If `align` is not set to `char`, this attribute is ignored.

- `charoff` (deprecated)
    Does nothing. It was originally intended to specify the number of characters to offset the data cell content from the alignment character specified by the `char` attribute.

- `height` (deprecated)
    Defines a recommended data cell height. Use the `height` CSS property instead, as this attribute is deprecated.

- `scope` (deprecated)
    Defines the cells that the header (defined in the ` | `) element relates to. The possible enumerated values are `row`, `col`, `rowgroup`, and `colgroup`. Only use this attribute with the ` | ` element to define the row or column for which it is a header, as this attribute is deprecated for the ` | ` element.

- `valign` (deprecated)
    Specifies the vertical alignment of the data cell. The possible enumerated values are `baseline`, `bottom`, `middle`, and `top`. Use the `vertical-align` CSS property instead, as this attribute is deprecated.

- `width` (deprecated)
    Defines a recommended data cell width. Use the `width` CSS property instead, as this attribute is deprecated.

## Usage notes

- The ` | ` may only be used within a `` element.
- When using the `colspan` and `rowspan` attributes to span data cells across multiple columns and rows, cells without these attributes defined (with a default value of `1`) are automatically fitted into free available spaces in the table structure that span 1x1 cells, as illustrated in the following figure:

  > **Note:**
  > These attributes must not be used to overlap cells.

## Examples

See `` for a complete table example introducing common standards and best practices.

### Basic data cells

This example uses ` | ` elements along with other table-related elements to introduce a basic table with data about the phonetic alphabet.

#### HTML

Some table rows (`` elements) contain both header cells (` | ` elements) and data cell ` | ` elements. The ` | ` element that is the first child of each row forms the first column of the table, with each ` | ` providing the row header for the data cells within that row. Each corresponding ` | ` element contains data aligned with its respective column header and row header cell.

> **Note:**
> Normally, a table head group with column headers would be implemented to make it easier to understand the information in the columns. The `` and `` elements would be used to group such rows of headers and data into the respective table head and body sections. This is not implemented in this example to focus on the data cells and reduce the complexity of this example.

```html
<table>
  <tr>
    <th scope="row">A</th>
    <td>Alfa</td>
    <td>AL fah</td>
  </tr>
  <tr>
    <th scope="row">B</th>
    <td>Bravo</td>
    <td>BRAH voh</td>
  </tr>
  <tr>
    <th scope="row">C</th>
    <td>Charlie</td>
    <td>CHAR lee</td>
  </tr>
  <tr>
    <th scope="row">D</th>
    <td>Delta</td>
    <td>DELL tah</td>
  </tr>
</table>
```

#### CSS

Some basic CSS is used to style the table and its cells. CSS attribute selectors and the `:nth-of-type` pseudo-class are used to alternate the appearance of the cells to make the information in the table easier to understand and identify.

```css
td,
th {
  border: 1px solid rgb(160 160 160);
  padding: 8px 10px;
}

tr:nth-of-type(odd) td {
  background-color: #eeeeee;
}

tr th[scope="row"] {
  background-color: #d6ecd4;
}
```

```css
table {
  border-collapse: collapse;
  border: 2px solid rgb(140 140 140);
  font-family: sans-serif;
  font-size: 0.8rem;
  letter-spacing: 1px;
}
```

#### Result

### Column and row spanning

This example extends and enhances the basic table from the previous example by adding an additional "ABC" cell.

#### HTML

An additional data cell (` | ` element) is introduced within the first row (`` element). This creates a fourth column in the table.

Using the `rowspan` attribute, the "ABC" cell is spanned across the first three rows of the table. The last data cells of the subsequent rows each span two columns. This is done using the `colspan` attribute, aligning them correctly within the table structure. Note that an additional row (`` element) is added to the table to illustrate this.

```html
<table>
  <tr>
    <th scope="row">A</th>
    <td>Alfa</td>
    <td>AL fah</td>
    <td rowspan="3">ABC</td>
  </tr>
  <tr>
    <th scope="row">B</th>
    <td>Bravo</td>
    <td>BRAH voh</td>
  </tr>
  <tr>
    <th scope="row">C</th>
    <td>Charlie</td>
    <td>CHAR lee</td>
  </tr>
  <tr>
    <th scope="row">D</th>
    <td>Delta</td>
    <td colspan="2">DELL tah</td>
  </tr>
  <tr>
    <th scope="row">E</th>
    <td>Echo</td>
    <td colspan="2">ECK oh</td>
  </tr>
</table>
```

#### CSS

The `:first-of-type` and `:last-of-type` pseudo-classes are used in the CSS to select and style the added "ABC" data cell.

```css
tr:first-of-type td:last-of-type {
  width: 60px;
  background-color: #505050;
  color: white;
  font-weight: bold;
  text-align: center;
}

td,
th {
  border: 1px solid rgb(160 160 160);
  padding: 8px 10px;
}

tr:nth-of-type(odd) td {
  background-color: #eeeeee;
}

tr th[scope="row"] {
  background-color: #d6ecd4;
}
```

```css
table {
  border-collapse: collapse;
  border: 2px solid rgb(140 140 140);
  font-family: sans-serif;
  font-size: 0.8rem;
  letter-spacing: 1px;
}
```

#### Result

### Associate data cells with header cells

For more complex relationships between data cells (` | ` elements) and header cells (` | ` elements), using ` | ` elements with the `scope` attribute alone may not be sufficient for assistive technologies, especially screen readers.

#### HTML

To improve the accessibility of the previous example and to allow screen readers, for example, to speak the headers associated with each data cell, the `headers` attribute can be introduced along with `id` attributes. Each row header cell (` | ` element) associated with the "ABC" data cell, i.e., the letters "A", "B", and "C", is given a unique identifier with the `id` attribute. The "ABC" data cell (` | ` element) then uses these `id` values in a space-separated list for the `headers` attribute.

> **Note:**
> It's recommended to use more descriptive and useful values for the `id` attribute. Each `id` in a document must be unique to that document. In this example, the `id` values are single characters to maintain focus on the concept of the `headers` attribute.

```html
<table>
  <tr>
    <th id="a" scope="row">A</th>
    <td>Alfa</td>
    <td>AL fah</td>
    <td headers="a b c" rowspan="3">ABC</td>
  </tr>
  <tr>
    <th id="b" scope="row">B</th>
    <td>Bravo</td>
    <td>BRAH voh</td>
  </tr>
  <tr>
    <th id="c" scope="row">C</th>
    <td>Charlie</td>
    <td>CHAR lee</td>
  </tr>
  <tr>
    <th scope="row">D</th>
    <td>Delta</td>
    <td colspan="2">DELL tah</td>
  </tr>
  <tr>
    <th scope="row">E</th>
    <td>Echo</td>
    <td colspan="2">ECK oh</td>
  </tr>
</table>
```

#### Result

While the visual result is unchanged from the previous example table, each data cell (` | `) is now explicitly associated with its row header cell (` | `).

## Technical summary

       |
        Content categories

       | Sectioning root.

       | Permitted content
       |
        Flow content.

       | Tag omission
       |
        The start tag is mandatory.The end tag may be omitted, if it is
        immediately followed by a ` | ` or
        `<td>` element or if there are no more data in its
        parent element.

       | Permitted parents
       | A `` element.

       | Implicit ARIA role
       |
        <code
          >cell</code
        >
        if a descendant of a `` element, or <code
          >gridcell</code
        >
        if a descendant of an element with <code
          >grid</code
        > role

       | Permitted ARIA roles
       | Any

       | DOM interface
       | `HTMLTableCellElement`

## See also

- Learn: HTML table basics
- ``, ``, ``, ``, ``, ``, ` | `, ``, ``: Other table-related elements
- `background-color`: CSS property to set the background color of each data cell
- `border`: CSS property to control borders of data cells
- `height`: CSS property to control the recommended data cell height
- `text-align`: CSS property to horizontally align each data cell content
- `vertical-align`: CSS property to vertically align each data cell content
- `width`: CSS property to control the recommended data cell width
- `:nth-of-type`, `:first-of-type`, `:last-of-type`: CSS pseudo-classes to select the desired data cells
