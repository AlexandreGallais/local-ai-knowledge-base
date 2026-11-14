---
title: "`padding` CSS property"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/properties/padding/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `padding` CSS property

The **`padding`** CSS shorthand property sets the padding area on all four sides of an element at once.

```css
padding: 1em;
```

```css
padding: 10% 0;
```

```css
padding: 10px 50px 20px;
```

```css
padding: 10px 50px 30px 0;
```

```css
padding: 0;
```

```html
<section id="default-example">
  <div class="transition-all" id="example-element">
    <div class="box">
      Far out in the uncharted backwaters of the unfashionable end of the
      western spiral arm of the Galaxy lies a small unregarded yellow sun.
    </div>
  </div>
</section>
```

```css
#example-element {
  border: 10px solid #ffc129;
  overflow: hidden;
  text-align: left;
}

.box {
  border: dashed 1px;
}
```

An element's padding area is the space between its content and its border.

> **Note:**
> Padding creates extra space within an element. In contrast, `margin` creates extra space _around_ an element.

## Constituent properties

This property is a shorthand for the following CSS properties:

- `padding-top`
- `padding-right`
- `padding-bottom`
- `padding-left`

## Syntax

```css
/* Apply to all four sides */
padding: 1em;

/* top and bottom | left and right */
padding: 5% 10%;

/* top | left and right | bottom */
padding: 1em 2em 2em;

/* top | right | bottom | left */
padding: 5px 1em 0 2em;

/* Global values */
padding: inherit;
padding: initial;
padding: revert;
padding: revert-layer;
padding: unset;
```

The `padding` property may be specified using one, two, three, or four values. Each value is a `<length>` or a `<percentage>`. Negative values are invalid.

- When **one** value is specified, it applies the same padding to **all four sides**.
- When **two** values are specified, the first padding applies to the **top and bottom**, the second to the **left and right**.
- When **three** values are specified, the first padding applies to the **top**, the second to the **right and left**, the third to the **bottom**.
- When **four** values are specified, the paddings apply to the **top**, **right**, **bottom**, and **left** in that order (clockwise).

### Values

- `<length>`
    The size of the padding as a fixed value.
- `<percentage>`
    The size of the padding as a percentage, relative to the inline size (_width_ in a horizontal language, defined by `writing-mode`) of the containing block.

## Examples

### Setting padding with pixels

#### HTML

```html
<h4>This element has moderate padding.</h4>
<h3>The padding is huge in this element!</h3>
```

#### CSS

```css
h4 {
  background-color: lime;
  padding: 20px 50px;
}

h3 {
  background-color: cyan;
  padding: 110px 50px 50px 110px;
}
```

#### Result

### Setting padding with pixels and percentages

```css
padding: 5%; /* All sides: 5% padding */

padding: 10px; /* All sides: 10px padding */

padding: 10px 20px; /* top and bottom: 10px padding */
/* left and right: 20px padding */

padding: 10px 3% 20px; /* top:            10px padding */
/* left and right: 3% padding   */
/* bottom:         20px padding */

padding: 1em 3px 30px 5px; /* top:    1em padding  */
/* right:  3px padding  */
/* bottom: 30px padding */
/* left:   5px padding  */
```

## See also

- `padding-top`, `padding-right`, `padding-bottom`, and `padding-left`
- `padding-block-start`, `padding-block-end`, `padding-inline-start`, and `padding-inline-end`
- `padding-block` and `padding-inline` shorthands
- Introduction to the CSS box model guide
- CSS box model module
