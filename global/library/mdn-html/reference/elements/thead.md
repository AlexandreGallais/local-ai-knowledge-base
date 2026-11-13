---
title: "`<thead>` HTML table head element"
tool: "mdn-html"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/html/reference/elements/thead/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `<thead>` HTML table head element

The **``** HTML element encapsulates a set of table rows (`` elements), indicating that they comprise the head of a table with information about the table's columns. This is usually in the form of column headers (` | ` elements).

```html
<table>
  <caption>
    Council budget (in £) 2018
  </caption>
  <thead>
    <tr>
      <th scope="col">Items</th>
      <th scope="col">Expenditure</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">Donuts</th>
      <td>3,000</td>
    </tr>
    <tr>
      <th scope="row">Stationery</th>
      <td>18,000</td>
    </tr>
  </tbody>
  <tfoot>
    <tr>
      <th scope="row">Totals</th>
      <td>21,000</td>
    </tr>
  </tfoot>
</table>
```

```css
thead,
tfoot {
  background-color: #2c5e77;
  color: white;
}

tbody {
  background-color: #e4f0f5;
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

th,
td {
  border: 1px solid rgb(160 160 160);
  padding: 8px 10px;
}

td {
  text-align: center;
}
```

## Attributes

This element includes the global attributes.

### Deprecated attributes

The following attributes are deprecated and should not be used. They are documented below for reference when updating existing code and for historical interest only.

- `align` (deprecated)
    Specifies the horizontal alignment of each head cell. The possible enumerated values are `left`, `center`, `right`, `justify`, and `char`. When supported, the `char` value aligns the textual content on the character defined in the `char` attribute and the offset defined by the `charoff` attribute. Use the `text-align` CSS property instead, as this attribute is deprecated.

- `bgcolor` (deprecated) (non-standard)
    Defines the background color of each head cell. The value is an HTML color; either a 6-digit hexadecimal RGB code, prefixed by a `#`, or a color keyword. Other CSS `<color>` values are not supported. Use the `background-color` CSS property instead, as this attribute is deprecated.

- `char` (deprecated)
    Does nothing. It was originally intended to specify the alignment of the content to a character of each head cell. If `align` is not set to `char`, this attribute is ignored.

- `charoff` (deprecated)
    Does nothing. It was originally intended to specify the number of characters to offset the head cell content from the alignment character specified by the `char` attribute.

- `valign` (deprecated)
    Specifies the vertical alignment of each head cell. The possible enumerated values are `baseline`, `bottom`, `middle`, and `top`. Use the `vertical-align` CSS property instead, as this attribute is deprecated.

## Usage notes

- The `` is placed after any `` and `` elements, but before any ``, ``, and `` elements.
- Along with its related `` and `` elements, the `` element provides useful semantic information and can be used when rendering for either screen or print. Specifying such table content groups also provides valuable contextual information for assistive technologies, including screen readers and search engines.
- When printing a document, in the case of a multipage table, the table head usually specifies information that remains the same on each page.

## Examples

See `` for a complete table example introducing common standards and best practices.

### Basic head structure

This example demonstrates a table divided into a head section with column headers and a body section with the table's main data.

#### HTML

The `` and `` elements are used to structure the table rows into semantic sections. The `` element represents the head section of the table, which contains a row (``) of column headers cells (` | `).

```html
<table>
  <thead>
    <tr>
      <th>Student ID</th>
      <th>Name</th>
      <th>Major</th>
      <th>Credits</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>3741255</td>
      <td>Jones, Martha</td>
      <td>Computer Science</td>
      <td>240</td>
    </tr>
    <tr>
      <td>3971244</td>
      <td>Nim, Victor</td>
      <td>Russian Literature</td>
      <td>220</td>
    </tr>
    <tr>
      <td>4100332</td>
      <td>Petrov, Alexandra</td>
      <td>Astrophysics</td>
      <td>260</td>
    </tr>
  </tbody>
</table>
```

#### CSS

Some basic CSS is used to style and highlight the table head so that the headings of the columns stand out from the data in the table body.

```css
thead {
  border-bottom: 2px solid rgb(160 160 160);
  text-align: center;
  background-color: #2c5e77;
  color: white;
}

tbody {
  background-color: #e4f0f5;
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

th,
td {
  border: 1px solid rgb(160 160 160);
  padding: 8px 10px;
}

tbody > tr > td:last-of-type {
  text-align: center;
}
```

#### Result

### Multiple head rows

This example demonstrates a table head section with two rows.

#### HTML

We extend the markup the table from the basic <example-value> in this example by including two table rows (``) within the `` element creating a multi-row table head. We included an additional column, splitting the student names into first and last names.

```html
<table>
  <thead>
    <tr>
      <th rowspan="2">Student ID</th>
      <th colspan="2">Student</th>
      <th rowspan="2">Major</th>
      <th rowspan="2">Credits</th>
    </tr>
    <tr>
      <th>First name</th>
      <th>Last name</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>3741255</td>
      <td>Martha</td>
      <td>Jones</td>
      <td>Computer Science</td>
      <td>240</td>
    </tr>
    <tr>
      <td>3971244</td>
      <td>Victor</td>
      <td>Nim</td>
      <td>Russian Literature</td>
      <td>220</td>
    </tr>
    <tr>
      <td>4100332</td>
      <td>Alexandra</td>
      <td>Petrov</td>
      <td>Astrophysics</td>
      <td>260</td>
    </tr>
  </tbody>
</table>
```

#### Cell spanning

In order to associate and line up the header cells with the correct columns and rows, the `colspan` and `rowspan` attributes are used on the ` | ` elements. The values set in these attributes specify how many cells each header cell (` | `) spans. Due to the way these attributes are set, the two second-row header cells are lined up with the columns they head. These each span one row and one column as the default values for the `colspan` and `rowspan` attributes are both `1`.

The column and row spanning demonstrated by this example are illustrated in the following figure:

#### CSS

The CSS is unchanged from the previous example.

```css
thead {
  border-bottom: 2px solid rgb(160 160 160);
  background-color: #2c5e77;
  color: white;
}

table {
  border-collapse: collapse;
  border: 2px solid rgb(140 140 140);
  font-family: sans-serif;
  font-size: 0.8rem;
  letter-spacing: 1px;
}

tbody {
  background-color: #e4f0f5;
}

th,
td {
  border: 1px solid rgb(160 160 160);
  padding: 8px 10px;
}

tbody > tr > td:last-of-type {
  text-align: center;
}
```

#### Result

## Technical summary

       |
        Content categories

       | None.

       | Permitted content
       | Zero or more `` elements.

       | Tag omission
       |
        The start tag is mandatory. The end tag may be omitted if the
        `<thead>` element is immediately followed by a
        `` or ``
        element.

       | Permitted parents
       |
        A `` element. The
        `<thead>` must appear after any
        `` and
        `` elements, even implicitly defined,
        but before any ``,
        ``, and ``
        elements.

       | Implicit ARIA role
       |
        <code
          >rowgroup</code
        >

       | Permitted ARIA roles
       | Any

       | DOM interface
       | `HTMLTableSectionElement`

## See also

- Learn: HTML table basics
- ``, ``, ``, ``, ``, ` | `, ``, ` | `, ``: Other table-related elements
- `background-color`: CSS property to set the background color of each head cell
- `border`: CSS property to control borders of head cells
- `text-align`: CSS property to horizontally align each head cell content
- `vertical-align`: CSS property to vertically align each head cell content
