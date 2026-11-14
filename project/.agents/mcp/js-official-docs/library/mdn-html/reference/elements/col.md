---
title: "`<col>` HTML table column element"
tool: "mdn-html"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/html/reference/elements/col/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `<col>` HTML table column element

The **``** HTML element defines one or more columns in a column group represented by its parent `` element. The `` element is only valid as a child of a `` element that has no `span` attribute defined.

```html
<table>
  <caption>
    Superheros and sidekicks
  </caption>
  <colgroup>
    <col />
    <col span="2" class="batman" />
    <col span="2" class="flash" />
  </colgroup>
  <thead>
    <tr>
      <td></td>
      <th scope="col">Batman</th>
      <th scope="col">Robin</th>
      <th scope="col">The Flash</th>
      <th scope="col">Kid Flash</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">Skill</th>
      <td>Smarts, strong</td>
      <td>Dex, acrobat</td>
      <td>Super speed</td>
      <td>Super speed</td>
    </tr>
  </tbody>
</table>
```

```css
.batman {
  background-color: #d7d9f2;
}

.flash {
  background-color: #ffe8d4;
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
  padding: 8px 6px;
}

td {
  text-align: center;
}
```

## Attributes

This element includes the global attributes.

- `span`
    Specifies the number of consecutive columns the `` element spans. The value must be a positive integer greater than zero. If not present, its default value is `1`.

### Deprecated attributes

The following attributes are deprecated and should not be used. They are documented below for reference when updating existing code and for historical interest only.

- `align` (deprecated)
    Specifies the horizontal alignment of each column cell. The possible enumerated values are `left`, `center`, `right`, `justify`, and `char`. When supported, the `char` value aligns the textual content on the character defined in the `char` attribute and on offset defined by the `charoff` attribute. Note that this attribute overrides the specified `align` of its `` parent element. Use the `text-align` CSS property on the ` | ` and ` | ` elements instead, as this attribute is deprecated.

    > **Note:**
    > Setting `text-align` on the `` element has no effect as `` has no descendants, and therefore no elements inherit from it.
    >
    > If the table does not use a `colspan` attribute, use the `td:nth-of-type(an+b)` CSS selector. Set `a` to zero and `b` to the position of the column in the table, e.g., `td:nth-of-type(2) { text-align: right; }` to right-align the second column cells.
    >
    > If the table does use a `colspan` attribute, the effect can be achieved by combining adequate CSS attribute selectors like `[colspan=n]`, though this is not trivial.

- `bgcolor` (deprecated)
    Defines the background color of each column cell. The value is an HTML color; either a 6-digit hexadecimal RGB code, prefixed by a `#`, or a color keyword. Other CSS `<color>` values are not supported. Use the `background-color` CSS property instead, as this attribute is deprecated.

- `char` (deprecated)
    Does nothing. It was originally intended to specify the alignment of the content to a character of each column cell. Typical values for this include a period (`.`) when attempting to align numbers or monetary values. If `align` is not set to `char`, this attribute is ignored, though it will still override the specified `char` of its `` parent element.

- `charoff` (deprecated)
    Does nothing. It was originally intended to specify the number of characters to offset the column cell content from the alignment character specified by the `char` attribute.

- `valign` (deprecated)
    Specifies the vertical alignment of each column cell. The possible enumerated values are `baseline`, `bottom`, `middle`, and `top`. Note that this attribute overrides the specified `valign` of its `` parent element. Use the `vertical-align` CSS property on the ` | ` and ` | ` elements instead, as this attribute is deprecated.

    > **Note:**
    > Setting `vertical-align` on the `` element has no effect as `` has no descendants, and therefore no elements inherit from it.
    >
    > If the table does not use a `colspan` attribute, use the `td:nth-of-type(an+b)` CSS selector. Set `a` to zero and `b` to the position of the column in the table, e.g., `td:nth-of-type(2) { vertical-align: middle; }` to center the second column cells vertically.
    >
    > If the table does use a `colspan` attribute, the effect can be achieved by combining adequate CSS attribute selectors like `[colspan=n]`, though this is not trivial.

- `width` (deprecated)
    Specifies a default width for each column. In addition to the standard pixel and percentage values, this attribute can take the special form `0*`, which means that the width of each column spanned should be the minimum width necessary to hold the column's contents. Relative widths such as `5*` can also be used. Note that this attribute overrides the specified `width` of its `` parent element. Use the `width` CSS property instead, as this attribute is deprecated.

## Usage notes

- The `` element is used within a `` element that doesn't have a `span` attribute.
- The `` elements do not structurally group columns together. This is the role of the `` element.
- Only a limited number of CSS properties affect ``:
  - `background` : The various `background` properties will set the background for cells within the column. As the column background color is painted on top of the table and column groups (``), but behind background colors applied to the row groups (``, ``, and ``), the rows (``), and the individual cells (` | ` and ` | `), backgrounds applied to table columns are only visible if every layer painted on top of them has a transparent background.
  - `border`: The various `border` properties apply, but only if the `` has `border-collapse: collapse` set.
  - `visibility`: The value `collapse` for a column results in all cells of that column not being rendered, and cells spanning into other columns being clipped. The space these columns would have occupied is removed. However, the size of other columns is still calculated as though the cells in the collapsed column(s) are present. Other values for `visibility` have no effect.
  - `width`: The `width` property defines a minimum width for the column, as if `min-width` were set.

## Example

See `` for a complete table example introducing common standards and best practices.

This example demonstrates an eight-column table divided into three `` elements.

### HTML

A `` element provides structures to a basic table, creating a single implicit column group. Three `` elements are included within the ``, creating three stylable columns. The `span` attribute specifies the number of table columns each `` should span (defaulting to `1` when omitted), enabling attributes to be shared across the columns in each ``.

```html
<table>
  <caption>
    Personal weekly activities
  </caption>
  <colgroup>
    <col />
    <col span="5" class="weekdays" />
    <col span="2" class="weekend" />
  </colgroup>
  <thead>
    <tr>
      <th>Period</th>
      <th>Mon</th>
      <th>Tue</th>
      <th>Wed</th>
      <th>Thu</th>
      <th>Fri</th>
      <th>Sat</th>
      <th>Sun</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>a.m.</th>
      <td>Clean room</td>
      <td>Football training</td>
      <td>Dance Course</td>
      <td>History Class</td>
      <td>Buy drinks</td>
      <td>Study hour</td>
      <td>Free time</td>
    </tr>
    <tr>
      <th>p.m.</th>
      <td>Yoga</td>
      <td>Chess Club</td>
      <td>Meet friends</td>
      <td>Gymnastics</td>
      <td>Birthday party</td>
      <td>Fishing trip</td>
      <td>Free time</td>
    </tr>
  </tbody>
</table>
```

### CSS

We use CSS, instead of deprecated HTML attributes, to provide a background color to the columns and align the cell content:

```css
table {
  border-collapse: collapse;
  border: 2px solid rgb(140 140 140);
}

caption {
  caption-side: bottom;
  padding: 10px;
}

th,
td {
  border: 1px solid rgb(160 160 160);
  padding: 8px 6px;
  text-align: center;
}

.weekdays {
  background-color: #d7d9f2;
}

.weekend {
  background-color: #ffe8d4;
}
```

```css
table {
  font-family: sans-serif;
  font-size: 0.8rem;
  letter-spacing: 1px;
}
```

#### Result

## Technical summary

       |
        Content categories

       | None.

       | Permitted content
       | None; it is a void element.

       | Tag omission
       | Must have a start tag and must not have an end tag.

       | Permitted parents
       |
        `` only, though it can be implicitly
        defined as its start tag is not mandatory. The
        `` must not have a
        `span` attribute.

       | Implicit ARIA role
       |
        No corresponding role

       | Permitted ARIA roles
       | No `role` permitted

       | DOM interface
       | `HTMLTableColElement`

## See also

- ``, ``, ``, ``, ` | `, ``, ` | `, ``, ``: Other table-related elements
- `background-color`: CSS property to set the background color of each column cell
- `border`: CSS property to control borders of column cells
- `text-align`: CSS property to horizontally align each column cell content
- `vertical-align`: CSS property to vertically align each column cell content
- `visibility`: CSS property to hide cells of a column
- `width`: CSS property to control the default width for each column
- `:nth-of-type`, `:first-of-type`, `:last-of-type`: CSS pseudo-classes to select the desired column cells
