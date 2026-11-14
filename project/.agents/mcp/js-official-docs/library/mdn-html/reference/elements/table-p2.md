---
title: "`<table>` HTML table element (part 2 of 3)"
tool: "mdn-html"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/html/reference/elements/table/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `<table>` HTML table element (part 2 of 3)

## Examples

The examples below include tables of progressively increasing complexity. See also our beginner's Styling tables guide for table styling information including common, useful techniques.

Since the structure of a `` involves the use of several table-related HTML elements along with various associated attributes, the following examples are intended to provide a simplified explanation that covers the basics and common standards. Additional and more detailed information can be found on the corresponding linked pages.

These table examples demonstrate how to create an accessible table that is structured with HTML and styled with CSS.

Because of how HTML tables are structured, the markup can quickly grow. For this reason, it is important to clearly define the table's purpose and final appearance to create the appropriate structure. A logical structure developed with semantic markup is not only easier to style, but enables useful and accessible tables that can be understood and navigated by everyone, including search engines and users of assistive technologies.

The first example is basic, with subsequent examples growing in complexity. First, we will develop a very basic HTML table structure for the table. The first two examples contain no table section groups such as a defined head, body, or foot, and involve no cell spanning or explicitly defined cell relationships. Not even a caption is provided. As we work through the examples, they will be progressively enhanced to include all the table features that a complex data table should possess.

### Basic table

This example includes a _very_ basic table with three rows and two columns. To demonstrate default browser table styles, no CSS has been included in this example.

#### HTML

The table rows are defined with `` elements, and the columns are defined with table header and data cells within them. The first row contains the header cells (` | ` elements) that serve as column headers for the data cells (` | ` elements). Each element (` | ` or ` | `) per row is in its respective column—that is, the first element of a row is in the first column, and the second element of that row is in the second column.

```html
<table>
  <tr>
    <th>Name</th>
    <th>Age</th>
  </tr>
  <tr>
    <td>Maria Sanchez</td>
    <td>28</td>
  </tr>
  <tr>
    <td>Michael Johnson</td>
    <td>34</td>
  </tr>
</table>
```

#### Result

There is no custom CSS or user stylesheet applied to this table. The styling results purely from the user-agent stylesheet.

### Expanded table with header cells

This example extends the basic table, extending the content and adding basic CSS styles.

#### HTML

The table comprises four rows (`` elements) now, with four columns each. The first row is a row of header cells (The first row contains only ` | ` elements). Subsequent rows include a header column (` | ` elements as the first child elements of each row) and three data columns (` | ` elements). As table sectioning elements are not used, the browser automatically defines the content group structure, i.e., all rows are wrapped within the body of the table of an implicit `` element.

```html
<table>
  <tr>
    <th>Name</th>
    <th>ID</th>
    <th>Member Since</th>
    <th>Balance</th>
  </tr>
  <tr>
    <th>Margaret Nguyen</th>
    <td>427311</td>
    <td><time datetime="2010-06-03">June 3, 2010</time></td>
    <td>0.00</td>
  </tr>
  <tr>
    <th>Edvard Galinski</th>
    <td>533175</td>
    <td><time datetime="2011-01-13">January 13, 2011</time></td>
    <td>37.00</td>
  </tr>
  <tr>
    <th>Hoshi Nakamura</th>
    <td>601942</td>
    <td><time datetime="2012-07-23">July 23, 2012</time></td>
    <td>15.00</td>
  </tr>
</table>
```

#### CSS

With CSS, we provide the basic <example-value> to create lines around the components of the table to make the data structure clearer. The CSS adds a solid border around the `` and around each of the table's cells, including those specified with both ` | ` and ` | ` elements, demarcating every header and data cells.

```css
table {
  border: 2px solid rgb(140 140 140);
}

th,
td {
  border: 1px solid rgb(160 160 160);
}
```

#### Result

### Specifying table cell relations

Before moving on to extend the table in more advanced ways, it's advisable to improve accessibility by defining relationships between the header and data cells (` | ` and ` | ` elements).

#### HTML

This is accomplished by introducing the `scope` attribute on the ` | ` elements and setting the values to the corresponding `col` (column) or `row` value.

```html
<table>
  <tr>
    <th scope="col">Name</th>
    <th scope="col">ID</th>
    <th scope="col">Member Since</th>
    <th scope="col">Balance</th>
  </tr>
  <tr>
    <th scope="row">Margaret Nguyen</th>
    <td>427311</td>
    <td><time datetime="2010-06-03">June 3, 2010</time></td>
    <td>0.00</td>
  </tr>
  <tr>
    <th scope="row">Edvard Galinski</th>
    <td>533175</td>
    <td><time datetime="2011-01-13">January 13, 2011</time></td>
    <td>37.00</td>
  </tr>
  <tr>
    <th scope="row">Hoshi Nakamura</th>
    <td>601942</td>
    <td><time datetime="2012-07-23">July 23, 2012</time></td>
    <td>15.00</td>
  </tr>
</table>
```

The CSS and visual result are unchanged—the adaptation provides valuable contextual information for assistive technologies such as screen readers to help identify which cells the headers relate to.

> **Note:**
> If the table structure is even more complex, the (additional) use of the `headers` attribute on the ` | ` and ` | ` elements may improve accessibility and help assistive technologies identify the relationships between cells; see Complicated tables.

### Explicitly specifying table section groups

In addition to improving accessibility by specifying cell relations, the semantics of the table can be improved by introducing table section groups.

#### HTML

Since the first row (`` element) contains only column header cells and provides the header for the rest of the table's contents, it can be enclosed in the `` element to explicitly specify that row as the head section of the table. Moreover, what is automatically accomplished by the browser can also be defined explicitly—the body section of the table, which contains the main data of the table, is specified by enclosing the corresponding rows in the `` element. The explicit use of the `` element helps the browser to create the intended table structure, avoiding unwanted results.

```html
<table>
  <thead>
    <tr>
      <th scope="col">Name</th>
      <th scope="col">ID</th>
      <th scope="col">Member Since</th>
      <th scope="col">Balance</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">Margaret Nguyen</th>
      <td>427311</td>
      <td><time datetime="2010-06-03">June 3, 2010</time></td>
      <td>0.00</td>
    </tr>
    <tr>
      <th scope="row">Edvard Galinski</th>
      <td>533175</td>
      <td><time datetime="2011-01-13">January 13, 2011</time></td>
      <td>37.00</td>
    </tr>
    <tr>
      <th scope="row">Hoshi Nakamura</th>
      <td>601942</td>
      <td><time datetime="2012-07-23">July 23, 2012</time></td>
      <td>15.00</td>
    </tr>
  </tbody>
</table>
```

Once again, the CSS and visual result are unchanged—specifying such table section groups provides valuable contextual information for assistive technologies, including screen readers and search engines, as well as for styling in the CSS, which will be shown in a later example.

### Column and row spanning

In this example, we extend the table even more by adding a column and introducing a multi-row head section.

#### HTML

Building on the table created so far, a new column for a "Membership End Date" is added in each body row with the ` | ` element. An additional row (`` element) is also added within the head section (`` element) to introduce a "Membership Dates" header as a heading for the "Joined" and "Canceled" columns.

The creation of the second header row involves adding `colspan` and `rowspan` attributes to the ` | ` elements to allocate the header cells to the correct columns and rows.

```html
<table>
  <thead>
    <tr>
      <th scope="col" rowspan="2">Name</th>
      <th scope="col" rowspan="2">ID</th>
      <th scope="col" colspan="2">Membership Dates</th>
      <th scope="col" rowspan="2">Balance</th>
    </tr>
    <tr>
      <th scope="col">Joined</th>
      <th scope="col">Canceled</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">Margaret Nguyen</th>
      <td>427311</td>
      <td><time datetime="2010-06-03">June 3, 2010</time></td>
      <td>n/a</td>
      <td>0.00</td>
    </tr>
    <tr>
      <th scope="row">Edvard Galinski</th>
      <td>533175</td>
      <td><time datetime="2011-01-13">January 13, 2011</time></td>
      <td><time datetime="2017-04-08">April 8, 2017</time></td>
      <td>37.00</td>
    </tr>
    <tr>
      <th scope="row">Hoshi Nakamura</th>
      <td>601942</td>
      <td><time datetime="2012-07-23">July 23, 2012</time></td>
      <td>n/a</td>
      <td>15.00</td>
    </tr>
  </tbody>
</table>
```

```css
table {
  border: 2px solid rgb(140 140 140);
}

th,
td {
  border: 1px solid rgb(160 160 160);
}
```

#### Result

The head section now has two rows, one with the headers (` | ` elements) "Name", "ID", "Membership Dates", and "Balance", and a "Membership Dates" header with two subheaders that are in a second row: "Joined" and "Canceled". This is accomplished by:

- The first row's "Name", "ID", and "Balance" header cells span both table header rows by using the `rowspan` attribute, making them each two rows tall.
- The first row's "Membership Dates" header cell spans two columns using the `colspan` attribute, causing it to be two columns wide.
- The second row contains only the two header cells "Joined" and "Canceled" because the other three columns are merged with the cells in the first row that span two rows. The two header cells are correctly positioned under the "Membership Dates" header.

### Table caption and column summary

It's a common and advisable practice to provide a summary for the table's content, allowing users to quickly determine the table's relevance. Furthermore, the "Balance" column is summarized by displaying the sum of the balances of the individual members.

#### HTML

A table summary is added by using a table caption (`` element) as the first child element of the ``. The caption provides the accessible name or accessible description for the table.

Lastly, a table foot section (`` element) is added below the body, with a row that summarizes the "Balance" column by displaying a sum. The elements and attributes introduced earlier are applied.

```html
<table>
  <caption>
    Status of the club members 2021
  </caption>
  <thead>
    <tr>
      <th scope="col" rowspan="2">Name</th>
      <th scope="col" rowspan="2">ID</th>
      <th scope="col" colspan="2">Membership Dates</th>
      <th scope="col" rowspan="2">Balance</th>
    </tr>
    <tr>
      <th scope="col">Joined</th>
      <th scope="col">Canceled</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">Margaret Nguyen</th>
      <td>427311</td>
      <td><time datetime="2010-06-03">June 3, 2010</time></td>
      <td>n/a</td>
      <td>0.00</td>
    </tr>
    <tr>
      <th scope="row">Edvard Galinski</th>
      <td>533175</td>
      <td><time datetime="2011-01-13">January 13, 2011</time></td>
      <td><time datetime="2017-04-08">April 8, 2017</time></td>
      <td>37.00</td>
    </tr>
    <tr>
      <th scope="row">Hoshi Nakamura</th>
      <td>601942</td>
      <td><time datetime="2012-07-23">July 23, 2012</time></td>
      <td>n/a</td>
      <td>15.00</td>
    </tr>
  </tbody>
  <tfoot>
    <tr>
      <th scope="row" colspan="4">Total balance</th>
      <td>52.00</td>
    </tr>
  </tfoot>
</table>
```

```css
table {
  border: 2px solid rgb(140 140 140);
}

th,
td {
  border: 1px solid rgb(160 160 160);
}
```

#### Result

### Basic table styling

Let's apply a basic style to the table to adjust the typeface and add a `background-color` to the head and foot rows. The HTML is unchanged this time, so let's dive right into the CSS.

```html
<table>
  <caption>
    Status of the club members 2021
  </caption>
  <thead>
    <tr>
      <th scope="col" rowspan="2">Name</th>
      <th scope="col" rowspan="2">ID</th>
      <th scope="col" colspan="2">Membership Dates</th>
      <th scope="col" rowspan="2">Balance</th>
    </tr>
    <tr>
      <th scope="col">Joined</th>
      <th scope="col">Canceled</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">Margaret Nguyen</th>
      <td>427311</td>
      <td><time datetime="2010-06-03">June 3, 2010</time></td>
      <td>n/a</td>
      <td>0.00</td>
    </tr>
    <tr>
      <th scope="row">Edvard Galinski</th>
      <td>533175</td>
      <td><time datetime="2011-01-13">January 13, 2011</time></td>
      <td><time datetime="2017-04-08">April 8, 2017</time></td>
      <td>37.00</td>
    </tr>
    <tr>
      <th scope="row">Hoshi Nakamura</th>
      <td>601942</td>
      <td><time datetime="2012-07-23">July 23, 2012</time></td>
      <td>n/a</td>
      <td>15.00</td>
    </tr>
  </tbody>
  <tfoot>
    <tr>
      <th scope="row" colspan="4">Total balance</th>
      <td>52.00</td>
    </tr>
  </tfoot>
</table>
```

#### CSS

While a `font` property is added to the `` element here to set a more visually appealing typeface (or an abominable sans-serif typeface, depending on your personal opinion), the interesting part is the second style, where the `` elements located within the `` and `` are styled adding a light blue `background-color`. This is a way to quickly apply a background color to all the cells in specific sections simultaneously.

```css
table {
  border: 2px solid rgb(140 140 140);
  font:
    16px "Open Sans",
    "Helvetica",
    "Arial",
    sans-serif;
}

thead > tr,
tfoot > tr {
  background-color: rgb(228 240 245);
}

th,
td {
  border: 1px solid rgb(160 160 160);
}
```

#### Result
