---
title: "`border-color` CSS property"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/properties/border-color/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `border-color` CSS property

The **`border-color`** CSS shorthand property sets the color of an element's border.

```css
border-color: red;
```

```css
border-color: red #32a1ce;
```

```css
border-color: red rgb(170 50 220 / 0.6) green;
```

```css
border-color: red yellow green hsl(60 90% 50% / 0.8);
```

```css
border-color: red yellow green transparent;
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
  background-color: #eeeeee;
  color: black;
  border: 0.75em solid;
  padding: 0.75em;
  width: 80%;
  height: 100px;
}
```

## Constituent properties

This property is a shorthand for the following CSS properties:

- `border-bottom-color`
- `border-left-color`
- `border-right-color`
- `border-top-color`

## Syntax

```css
/* <color> values */
border-color: red;

/* top and bottom | left and right */
border-color: red #f015ca;

/* top | left and right | bottom */
border-color: red rgb(240 30 50 / 70%) green;

/* top | right | bottom | left */
border-color: red yellow green blue;

/* Global values */
border-color: inherit;
border-color: initial;
border-color: revert;
border-color: revert-layer;
border-color: unset;
```

The `border-color` property may be specified using one, two, three, or four values.

- When **one** value is specified, it applies the same color to **all four sides**.
- When **two** values are specified, the first color applies to the **top and bottom**, the second to the **left and right**.
- When **three** values are specified, the first color applies to the **top**, the second to the **left and right**, the third to the **bottom**.
- When **four** values are specified, the colors apply to the **top**, **right**, **bottom**, and **left** in that order (clockwise).

### Values

- `<color>`
    Defines the color of the border.

## Description

Each side can be set individually using `border-top-color`, `border-right-color`, `border-bottom-color`, and `border-left-color`; or using the writing mode-aware `border-block-start-color`, `border-block-end-color`, `border-inline-start-color`, and `border-inline-end-color`.

You can find out more information about border colors in Applying colors to HTML elements.

## Examples

### Complete border-color usage

#### HTML

```html
<div id="justone">
  <p><code>border-color: red;</code> is equivalent to</p>
  <ul>
    <li><code>border-top-color: red;</code></li>
    <li><code>border-right-color: red;</code></li>
    <li><code>border-bottom-color: red;</code></li>
    <li><code>border-left-color: red;</code></li>
  </ul>
</div>
<div id="horzvert">
  <p><code>border-color: gold red;</code> is equivalent to</p>
  <ul>
    <li><code>border-top-color: gold;</code></li>
    <li><code>border-right-color: red;</code></li>
    <li><code>border-bottom-color: gold;</code></li>
    <li><code>border-left-color: red;</code></li>
  </ul>
</div>
<div id="topvertbott">
  <p><code>border-color: red cyan gold;</code> is equivalent to</p>
  <ul>
    <li><code>border-top-color: red;</code></li>
    <li><code>border-right-color: cyan;</code></li>
    <li><code>border-bottom-color: gold;</code></li>
    <li><code>border-left-color: cyan;</code></li>
  </ul>
</div>
<div id="trbl">
  <p><code>border-color: red cyan black gold;</code> is equivalent to</p>
  <ul>
    <li><code>border-top-color: red;</code></li>
    <li><code>border-right-color: cyan;</code></li>
    <li><code>border-bottom-color: black;</code></li>
    <li><code>border-left-color: gold;</code></li>
  </ul>
</div>
```

#### CSS

```css
#justone {
  border-color: red;
}

#horzvert {
  border-color: gold red;
}

#topvertbott {
  border-color: red cyan gold;
}

#trbl {
  border-color: red cyan black gold;
}

/* Set width and style for all divs */
div {
  border: solid 0.3em;
  width: auto;
  margin: 0.5em;
  padding: 0.5em;
}

ul {
  margin: 0;
  list-style: none;
}
```

#### Result

## See also

- Border-color related CSS properties: `border`, `border-top-color`, `border-right-color`, `border-bottom-color`, `border-left-color`,
- Other border-related CSS properties: `border-width`, `border-style`
- The `<color>` data type
- Other color-related properties: `color`, `background-color`, `outline-color`, `text-decoration-color`, `text-emphasis-color`, `text-shadow`, `caret-color`, and `column-rule-color`
- Applying color to HTML elements using CSS
