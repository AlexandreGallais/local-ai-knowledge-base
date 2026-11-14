---
title: "`vertical-align` CSS property"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/properties/vertical-align/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `vertical-align` CSS property

The **`vertical-align`** CSS shorthand property sets the vertical alignment of an inline, inline-block, or table-cell box.

## Constituent properties

This property is a shorthand for the following CSS properties:

- `alignment-baseline`
- `baseline-source`
- `baseline-shift`

```css
vertical-align: baseline;
```

```css
vertical-align: top;
```

```css
vertical-align: middle;
```

```css
vertical-align: bottom;
```

```css
vertical-align: sub;
```

```css
vertical-align: text-top;
```

```html
<section class="default-example" id="default-example">
  <p>
    Align the star:
    <img id="example-element" src="/shared-assets/images/examples/star2.png" />
  </p>
</section>
```

```css
#default-example > p {
  line-height: 3em;
  font-family: monospace;
  font-size: 1.2em;
  text-decoration: underline overline;
}
```

The `vertical-align` property can be used in two contexts:

- To vertically align an inline-level element's box inside its containing line box. For example, it could be used to vertically position an image in a line of text.
- To vertically align the content of a cell in a table.

Use this shorthand (`vertical-align`) instead of its corresponding longhand properties, unless you need to cascade them independently or (on SVG elements) to support legacy SVG implementations.

Note that `vertical-align` only applies to inline, inline-block and table-cell elements: you can't use it to vertically align block-level elements.

## Syntax

```css
/* Keyword values */
vertical-align: baseline;
vertical-align: sub;
vertical-align: super;
vertical-align: text-top;
vertical-align: text-bottom;
vertical-align: middle;
vertical-align: top;
vertical-align: bottom;

/* <length> values */
vertical-align: 10em;
vertical-align: 4px;

/* <percentage> values */
vertical-align: 20%;

/* Global values */
vertical-align: inherit;
vertical-align: initial;
vertical-align: revert;
vertical-align: revert-layer;
vertical-align: unset;
```

The `vertical-align` property is specified as one of the values listed below.

### Values for inline elements

#### Parent-relative values

These values vertically align the element relative to its parent element:

- `baseline`
    Aligns the baseline of the element with the baseline of its parent. The baseline of some replaced elements, like `<textarea>`, is not specified by the HTML specification, meaning that their behavior with this keyword may vary between browsers.
- `sub`
    Aligns the baseline of the element with the subscript-baseline of its parent.
- `super`
    Aligns the baseline of the element with the superscript-baseline of its parent.
- `text-top`
    Aligns the top of the element with the top of the parent element's font.
- `text-bottom`
    Aligns the bottom of the element with the bottom of the parent element's font.
- `middle`
    Aligns the middle of the element with the baseline plus half the x-height of the parent.
- `<length>`
    Aligns the baseline of the element to the given length above the baseline of its parent. A negative value is allowed.
- `<percentage>`
    Aligns the baseline of the element to the given percentage above the baseline of its parent, with the value being a percentage of the `line-height` property. A negative value is allowed.

#### Line-relative values

The following values vertically align the element relative to the entire line:

- `top`
    Aligns the top of the element and its descendants with the top of the entire line.
- `bottom`
    Aligns the bottom of the element and its descendants with the bottom of the entire line.

For elements that do not have a baseline, the bottom margin edge is used instead.

### Values for table cells

- `baseline` (and `sub`, `super`, `text-top`, `text-bottom`, `<length>`, and `<percentage>`)
    Aligns the baseline of the cell with the baseline of all other cells in the row that are baseline-aligned.
- `top`
    Aligns the top padding edge of the cell with the top of the row.
- `middle`
    Centers the padding box of the cell within the row.
- `bottom`
    Aligns the bottom padding edge of the cell with the bottom of the row.

Negative values are allowed.

## Examples

### Basic <example-value>

#### HTML

```html
<div>
  An <img src="frame_image.svg" alt="link" width="32" height="32" /> image with
  a default alignment.
</div>
<div>
  An
  <img class="top" src="frame_image.svg" alt="link" width="32" height="32" />
  image with a text-top alignment.
</div>
<div>
  An
  <img class="bottom" src="frame_image.svg" alt="link" width="32" height="32" />
  image with a text-bottom alignment.
</div>
<div>
  An
  <img class="middle" src="frame_image.svg" alt="link" width="32" height="32" />
  image with a middle alignment.
</div>
```

#### CSS

```css
img.top {
  vertical-align: text-top;
}
img.bottom {
  vertical-align: text-bottom;
}
img.middle {
  vertical-align: middle;
}
```

#### Result

### Vertical alignment in a line box

#### HTML

```html
<p>
top:         <img style="vertical-align: top" src="star.png" alt="star"/>
middle:      <img style="vertical-align: middle" src="star.png" alt="star"/>
bottom:      <img style="vertical-align: bottom" src="star.png" alt="star"/>
super:       <img style="vertical-align: super" src="star.png" alt="star"/>
sub:         <img style="vertical-align: sub" src="star.png" alt="star"/>
</p>

<p>
text-top:    <img style="vertical-align: text-top" src="star.png" alt="star"/>
text-bottom: <img style="vertical-align: text-bottom" src="star.png" alt="star"/>
0.2em:       <img style="vertical-align: 0.2em" src="star.png" alt="star"/>
-1em:        <img style="vertical-align: -1em" src="star.png" alt="star"/>
20%:         <img style="vertical-align: 20%" src="star.png" alt="star"/>
-100%:       <img style="vertical-align: -100%" src="star.png" alt="star"/>
</p>
```

```css
#* {
  box-sizing: border-box;
}

img {
  margin-right: 0.5em;
}

p {
  height: 3em;
  padding: 0 0.5em;
  font-family: monospace;
  text-decoration: underline overline;
  margin-left: auto;
  margin-right: auto;
  width: 80%;
}
```

#### Result

### Vertical alignment in a table cell

In this example, we have a table with a single row containing six cells. The row sets `vertical-align` to `bottom` as the default value.

- The first four cells each set their own `vertical-align` values, and these override the row's value.
- The fifth cell does not set any `vertical-align` value, so inherits the row's value.

The sixth cell is only used to ensure that the cells are tall enough to see the effect.

#### HTML

```html
<table>
  <tbody>
    <tr class="bottom">
      <td class="baseline">baseline</td>
      <td class="top">top</td>
      <td class="middle">middle</td>
      <td>bottom</td>
      <td>Row's style</td>
      <td>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
        pretium felis eu sem mattis vulputate.
      </td>
    </tr>
  </tbody>
</table>
```

#### CSS

```css
table {
  margin-left: auto;
  margin-right: auto;
  width: 80%;
}

table,
th,
td {
  border: 1px solid black;
}

td {
  padding: 0.5em;
  font-family: monospace;
}

.bottom {
  vertical-align: bottom;
}

.baseline {
  vertical-align: baseline;
}

.top {
  vertical-align: top;
}

.middle {
  vertical-align: middle;
}
```

#### Result

## See also

- Typical use cases of flexbox, section "Center item"
- `line-height`, `text-align`, `margin`
- Understanding `vertical-align`, or "How (Not) To Vertically Center Content"
- Vertical-Align: All You Need To Know
