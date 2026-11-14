---
title: "`margin` CSS property"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/properties/margin/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `margin` CSS property

The **`margin`** CSS shorthand property sets the margin area on all four sides of an element.

```css
margin: 1em;
```

```css
margin: 5% 0;
```

```css
margin: 10px 50px 20px;
```

```css
margin: 10px 50px 20px 0;
```

```css
margin: 0;
```

```html
<section id="default-example">
  <div id="container">
    <div class="row"></div>
    <div class="row transition-all" id="example-element"></div>
    <div class="row"></div>
  </div>
</section>
```

```css
#container {
  width: 300px;
  height: 200px;
  display: flex;
  align-content: flex-start;
  flex-direction: column;
  justify-content: flex-start;
}

.row {
  height: 33.33%;
  display: inline-block;
  border: solid #ce7777 10px;
  background-color: #2b3a55;
  flex-shrink: 0;
}

#example-element {
  border: solid 10px #ffbf00;
  background-color: #2b3a55;
}
```

## Constituent properties

This property is a shorthand for the following CSS properties:

- `margin-top`
- `margin-right`
- `margin-bottom`
- `margin-left`

## Syntax

```css
/* apply to all four sides */
margin: 1em;
margin: -3px;

/* top and bottom | left and right */
margin: 5% auto;

/* top | left and right | bottom */
margin: 1em auto 2em;

/* top | right | bottom | left */
margin: 2px 1em 0 auto;

/* anchor-size() values */
margin: 5% anchor-size(width);
margin: calc(anchor-size(width) / 4) 1em 0
  anchor-size(--my-anchor self-inline, 50px);

/* Keyword value */
margin: auto;

/* Global values */
margin: inherit;
margin: initial;
margin: revert;
margin: revert-layer;
margin: unset;
```

The `margin` property may be specified using one, two, three, or four values. Each value is a `<length>`, a `<percentage>`, or the keyword `auto`. Negative values draw the element closer to its neighbors than it would be by default.

- When **one** value is specified, it applies the same margin to **all four sides**.
- When **two** values are specified, the first margin applies to the **top and bottom**, the second to the **left and right**.
- When **three** values are specified, the first margin applies to the **top**, the second to the **right and left**, the third to the **bottom**.
- When **four** values are specified, the margins apply to the **top**, **right**, **bottom**, and **left** in that order (clockwise).

### Values

- `length`
    The size of the margin as a fixed value.
    - For _anchor-positioned elements_, the `anchor-size()` function resolves to a `<length>` value relative to the associated _anchor element_'s width or height (see Setting element margin based on anchor size).

- `percentage`
    The size of the margin as a percentage, relative to the inline size (_width_ in a horizontal language, defined by `writing-mode`) of the containing block.
- `auto`
    The browser selects a suitable margin to use. For example, in certain cases this value can be used to center an element.

## Description

This property can be used to set a margin on all four sides of an element. Margins create extra space _around_ an element, unlike `padding`, which creates extra space _within_ an element.

The top and bottom margins have no effect on _non-replaced_ inline elements, such as `` or `<code>`.

### Horizontal centering

You can horizontally center an element within its parent by setting `margin: 0 auto;`.

A more common method to center an element horizontally is by setting `display: flex;` and `justify-content: center;` on a container, which centers its flex item children.

### Margin collapsing

Elements' top and bottom margins are sometimes collapsed into a single margin that is equal to the larger of the two margins. See Mastering margin collapsing for more information.

## Examples

### Basic <example-value>

#### HTML

```html
<div class="center">This element is centered.</div>

<div class="outside">This element is positioned outside of its container.</div>
```

#### CSS

```css
.center {
  margin: auto;
  background: lime;
  width: 66%;
}

.outside {
  margin: 3rem 0 0 -3rem;
  background: cyan;
  width: 66%;
}
```

### More examples

```css
margin: 5%; /* All sides: 5% margin */

margin: 10px; /* All sides: 10px margin */

margin: 1.6em 20px; /* top and bottom: 1.6em margin */
/* left and right: 20px margin */

margin: 10px 3% -1em; /* top:            10px margin */
/* left and right: 3% margin   */
/* bottom:         -1em margin */

margin: 10px 3px 30px 5px; /* top:    10px margin */
/* right:  3px margin  */
/* bottom: 30px margin */
/* left:   5px margin  */

margin: 2em auto; /* top and bottom: 2em margin   */
/* Box is horizontally centered */

margin: auto; /* top and bottom: 0 margin     */
/* Box is horizontally centered */
```

## See also

- `margin-top`, `margin-right`, `margin-bottom`, and `margin-left`
- `margin-block-start`, `margin-block-end`, `margin-inline-start`, and `margin-inline-end`
- `margin-block` and `margin-inline` shorthands
- Mastering margin collapsing
- Introduction to the CSS box model guide
- CSS box model module
