---
title: "`text-align` CSS property"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/properties/text-align/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `text-align` CSS property

The **`text-align`** CSS property sets the horizontal alignment of the inline-level content inside a block element or table-cell box. This means it works like `vertical-align` but in the horizontal direction.

```css
text-align: start;
```

```css
text-align: end;
```

```css
text-align: center;
```

```css
text-align: justify;
```

```html
<section id="default-example">
  <div id="example-element">
    <p>
      Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
      tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
      veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
      commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
      velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
      cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
      est laborum.
    </p>
  </div>
</section>
```

```css
section {
  font-size: 1.5em;
}

#default-example > div {
  width: 250px;
}
```

## Syntax

```css
/* Keyword values */
text-align: start;
text-align: end;
text-align: left;
text-align: right;
text-align: center;
text-align: justify;
text-align: match-parent;

/* Block alignment values (Non-standard syntax) */
text-align: -moz-center;
text-align: -webkit-center;

/* Global values */
text-align: inherit;
text-align: initial;
text-align: revert;
text-align: revert-layer;
text-align: unset;
```

### Values

This property is specified as one of the following keyword values:

- `start`
    The same as `left` if direction is left-to-right and `right` if direction is right-to-left.
- `end`
    The same as `right` if direction is left-to-right and `left` if direction is right-to-left.
- `left`
    The inline contents are aligned to the left edge of the line box.
- `right`
    The inline contents are aligned to the right edge of the line box.
- `center`
    The inline contents are centered within the line box.
- `justify`
    The inline contents are justified. Spaces out the content to line up its left and right edges to the left and right edges of the line box, except for the last line.
- `match-parent`
    Similar to `inherit`, but the values `start` and `end` are calculated according to the parent's `direction` and are replaced by the appropriate `left` or `right` value.

## Accessibility

The inconsistent spacing between words created by justified text can be problematic for people with cognitive concerns such as Dyslexia.

- MDN Understanding WCAG, Guideline 1.4 explanations
- Understanding Success Criterion 1.4.8 | Understanding WCAG 2.0

## Examples

### Start alignment

#### HTML

```html
<p class="example">
  Integer elementum massa at nulla placerat varius. Suspendisse in libero risus,
  in interdum massa. Vestibulum ac leo vitae metus faucibus gravida ac in neque.
  Nullam est eros, suscipit sed dictum quis, accumsan a ligula.
</p>
```

#### CSS

```css
.example {
  text-align: start;
  border: solid;
}
```

#### Result

### Centered text

#### HTML

```html
<p class="example">
  Integer elementum massa at nulla placerat varius. Suspendisse in libero risus,
  in interdum massa. Vestibulum ac leo vitae metus faucibus gravida ac in neque.
  Nullam est eros, suscipit sed dictum quis, accumsan a ligula.
</p>
```

#### CSS

```css
.example {
  text-align: center;
  border: solid;
}
```

#### Result

### Example using "justify"

#### HTML

```html
<p class="example">
  Integer elementum massa at nulla placerat varius. Suspendisse in libero risus,
  in interdum massa. Vestibulum ac leo vitae metus faucibus gravida ac in neque.
  Nullam est eros, suscipit sed dictum quis, accumsan a ligula.
</p>
```

#### CSS

```css
.example {
  text-align: justify;
  border: solid;
}
```

#### Result

### Table alignment

This example demonstrates the use of `text-align` on `` elements:

- The `` is set to right-aligned.
- The first two ` | ` elements inherit the left alignment from the `text-align: left` set on the ``, while the third is set to right-aligned.
- Inside the `` element, the first row is set to right-aligned, the second is set to center-aligned, and the third uses the default (left) alignment.
- Within each row, some cells (c12, c31) are set to override the alignment of the row.

#### HTML

```html
<table>
  <caption>
    Example table
  </caption>
  <thead>
    <tr>
      <th>Col 1</th>
      <th>Col 2</th>
      <th class="right">Col 3</th>
    </tr>
  </thead>
  <tbody>
    <tr class="right">
      <td>11</td>
      <td class="center">12</td>
      <td>13</td>
    </tr>
    <tr class="center">
      <td>21</td>
      <td>22</td>
      <td>23</td>
    </tr>
    <tr id="r3">
      <td class="right">31</td>
      <td>32</td>
      <td>33</td>
    </tr>
  </tbody>
</table>
```

#### CSS

```css
table {
  border-collapse: collapse;
  border: solid black 1px;
  width: 250px;
  height: 150px;
}

thead {
  text-align: left;
}

td,
th {
  border: solid 1px black;
}

.center {
  text-align: center;
}

.right,
caption {
  text-align: right;
}
```

#### Result

## See also

- `margin: auto`, `margin-left: auto`, `vertical-align`
