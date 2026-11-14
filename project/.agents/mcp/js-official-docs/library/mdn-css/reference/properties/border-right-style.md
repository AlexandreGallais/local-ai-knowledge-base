---
title: "`border-right-style` CSS property"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/properties/border-right-style/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `border-right-style` CSS property

The **`border-right-style`** CSS property sets the line style of an element's right `border`.

> **Note:**
> The specification doesn't define how borders of different styles connect in the corners.

```css
border-right-style: none;
```

```css
border-right-style: dotted;
```

```css
border-right-style: dashed;
```

```css
border-right-style: solid;
```

```css
border-right-style: groove;
```

```css
border-right-style: inset;
```

```html
<section id="default-example">
  <div class="transition-all" id="example-element">
    This is a box with a border around it.
  </div>
</section>
```

```css
#example-element {
  background-color: #eeeeee;
  color: black;
  border: 0.75em solid;
  padding: 0.75em;
  width: 80%;
  height: 100px;
}

body {
  background-color: white;
}
```

## Syntax

```css
/* Keyword values */
border-right-style: none;
border-right-style: hidden;
border-right-style: dotted;
border-right-style: dashed;
border-right-style: solid;
border-right-style: double;
border-right-style: groove;
border-right-style: ridge;
border-right-style: inset;
border-right-style: outset;

/* Global values */
border-right-style: inherit;
border-right-style: initial;
border-right-style: revert;
border-right-style: revert-layer;
border-right-style: unset;
```

The `border-right-style` property is specified as a single `line-style` keyword value.

## Examples

### Border styles

#### HTML

```html
<table>
  <tbody>
    <tr>
      <td class="b1">none</td>
      <td class="b2">hidden</td>
      <td class="b3">dotted</td>
      <td class="b4">dashed</td>
    </tr>
    <tr>
      <td class="b5">solid</td>
      <td class="b6">double</td>
      <td class="b7">groove</td>
      <td class="b8">ridge</td>
    </tr>
    <tr>
      <td class="b9">inset</td>
      <td class="b10">outset</td>
    </tr>
  </tbody>
</table>
```

#### CSS

```css
/* Define look of the table */
table {
  border-width: 2px;
  background-color: #52e385;
}
tr,
td {
  padding: 3px;
}

/* border-right-style example classes */
.b1 {
  border-right-style: none;
}
.b2 {
  border-right-style: hidden;
}
.b3 {
  border-right-style: dotted;
}
.b4 {
  border-right-style: dashed;
}
.b5 {
  border-right-style: solid;
}
.b6 {
  border-right-style: double;
}
.b7 {
  border-right-style: groove;
}
.b8 {
  border-right-style: ridge;
}
.b9 {
  border-right-style: inset;
}
.b10 {
  border-right-style: outset;
}
```

#### Result

## See also

- The other style-related border properties: `border-bottom-style`, `border-left-style`, `border-top-style`, and `border-style`.
- The other right-border-related properties: `border-right`, `border-right-color`, and `border-right-width`.
