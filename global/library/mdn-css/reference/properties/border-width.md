---
title: "`border-width` CSS property"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/properties/border-width/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `border-width` CSS property

The **`border-width`** CSS shorthand property sets the width of an element's border.

```css
border-width: thick;
```

```css
border-width: 1em;
```

```css
border-width: 4px 1.25em;
```

```css
border-width: 2ex 1.25ex 0.5ex;
```

```css
border-width: 0 4px 8px 12px;
```

```html
<section class="default-example" id="default-example">
  <div class="transition-all" id="example-element">
    This is a box with a border around it.
  </div>
</section>
```

```css
#example-element {
  background-color: palegreen;
  color: black;
  border: 0 solid crimson;
  padding: 0.75em;
  width: 80%;
  height: 100px;
}
```

## Constituent properties

This property is a shorthand for the following CSS properties:

- `border-bottom-width`
- `border-left-width`
- `border-right-width`
- `border-top-width`

## Syntax

```css
/* Keyword values */
border-width: thin;
border-width: medium;
border-width: thick;

/* <length> values */
border-width: 4px;
border-width: 1.2rem;

/* top and bottom | left and right */
border-width: 2px 1.5em;

/* top | left and right | bottom */
border-width: 1px 2em 1.5cm;

/* top | right | bottom | left */
border-width: 1px 2em 0 4rem;

/* Global values */
border-width: inherit;
border-width: initial;
border-width: revert;
border-width: revert-layer;
border-width: unset;
```

The `border-width` property may be specified using one, two, three, or four values.

- When **one** value is specified, it applies the same width to **all four sides**.
- When **two** values are specified, the first width applies to the **top and bottom**, the second to the **left and right**.
- When **three** values are specified, the first width applies to the **top**, the second to the **left and right**, the third to the **bottom**.
- When **four** values are specified, the widths apply to the **top**, **right**, **bottom**, and **left** in that order (clockwise).

### Values

- `<line-width>`
    Defines the width of the border, either as an explicit non-negative `<length>` or the keywords: `thin`, `medium`, or `thick`. The default is `medium`.

## Examples

### A mix of values and lengths

#### HTML

```html
<p id="one-value">one value: 6px wide border on all 4 sides</p>
<p id="two-values">
  two different values: 2px wide top and bottom border, 10px wide right and left
  border
</p>
<p id="three-values">
  three different values: 0.3em top, 9px bottom, and zero width right and left
</p>
<p id="four-values">
  four different values: "thin" top, "medium" right, "thick" bottom, and 1em
  left
</p>
```

#### CSS

```css
#one-value {
  border: ridge #cccccc;
  border-width: 6px;
}
#two-values {
  border: solid red;
  border-width: 2px 10px;
}
#three-values {
  border: dotted orange;
  border-width: 0.3em 0 9px;
}
#four-values {
  border: solid lightgreen;
  border-width: thin medium thick 1em;
}
p {
  width: auto;
  margin: 0.25em;
  padding: 0.25em;
}
```

#### Result

## See also

- The border-related shorthand properties: `border`, `border-style`, `border-color`
- The border-width-related properties: `border-bottom-width`, `border-left-width`, `border-right-width`, `border-top-width`
