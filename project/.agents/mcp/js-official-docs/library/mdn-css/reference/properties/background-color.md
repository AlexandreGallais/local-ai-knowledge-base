---
title: "`background-color` CSS property"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/properties/background-color/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `background-color` CSS property

The **`background-color`** CSS property sets the background color of an element.

```css
background-color: brown;
```

```css
background-color: #74992e;
```

```css
background-color: rgb(255 255 128);
```

```css
background-color: rgb(255 255 128 / 0.5);
```

```css
background-color: hsl(50 33% 25%);
```

```css
background-color: hsl(50 33% 25% / 0.75);
```

```html
<section id="default-example">
  <div class="transition-all" id="example-element"></div>
</section>
```

```css
#example-element {
  min-width: 100%;
  min-height: 100%;
  padding: 10%;
}
```

## Syntax

```css
/* Keyword values */
background-color: red;
background-color: indigo;

/* Hexadecimal value */
background-color: #bbff00; /* Fully opaque */
background-color: #bf0; /* Fully opaque shorthand */
background-color: #11ffee00; /* Fully transparent */
background-color: #1fe0; /* Fully transparent shorthand */
background-color: #11ffeeff; /* Fully opaque */
background-color: #1fef; /* Fully opaque shorthand */

/* RGB value */
background-color: rgb(255 255 128); /* Fully opaque */
background-color: rgb(117 190 218 / 50%); /* 50% transparent */

/* HSL value */
background-color: hsl(50 33% 25%); /* Fully opaque */
background-color: hsl(50 33% 25% / 75%); /* 75% opaque, i.e. 25% transparent */

/* Special keyword values */
background-color: currentColor;
background-color: transparent;

/* Global values */
background-color: inherit;
background-color: initial;
background-color: revert;
background-color: revert-layer;
background-color: unset;
```

### Values

This property is specified as one `<color>` value:

- `<color>`
    The uniform color of the background. It is rendered behind any `background-image` that is specified, although the color will still be visible through any transparency in the image.

## Description

The `background-color` property sets the background color of an element box. The color is drawn behind any background images. By default, the background color is painted within the border-box, meaning it's painted behind the border, ending at the outer edge of the border-box.

Clipping of the `background-color` paint area is controlled via the `background-clip` property. If multiple background images are set, the background color's clipping is determined by the value of the `background-clip` associated with the bottom-most background image.

## Accessibility

It is important to ensure that the contrast ratio between the background color and the color of the text placed over it is high enough that people experiencing low vision conditions will be able to read the content of the page. A high contrast ratio also improves content accessibility for glossy-screened mobile device users when in a bright environment, such as sunlight.

Color contrast ratio is determined by comparing the luminance of the text and background color values. In order to meet current Web Content Accessibility Guidelines (WCAG), a ratio of 4.5:1 is required for text content and 3:1 for larger text such as headings. Large text is defined as 18.66px and bold or larger, or 24px or larger.

- Understanding WCAG: Perceivable Guideline 1.4.3
- Understanding color contrast
- Understanding color contrast
- WebAIM: Color Contrast Checker
- Understanding Success Criterion 1.4.3 | W3C Understanding WCAG 2.0

## Examples

### Basic <example-value>

This example demonstrates applying `background-color` to HTML `` elements using different CSS `<color>` values.

#### HTML

```html
<p class="example-one">Lorem ipsum dolor sit amet, consectetuer</p>

<p class="example-two">Lorem ipsum dolor sit amet, consectetuer</p>

<p class="example-three">Lorem ipsum dolor sit amet, consectetuer</p>
```

#### CSS

Each paragraph is set to a different background color, including explicitly setting the default `transparent`, an `rgb()` color function, and a `hex-color`. We also set the `color` property to ensure enough contrast between the text and its background.

```css
.example-one {
  background-color: transparent;
}

.example-two {
  background-color: rgb(153 102 153);
  color: rgb(255 255 204);
}

.example-three {
  background-color: #777799;
  color: white;
}
```

#### Result

### Colorized tables

This example demonstrates the use of `background-color` on HTML `` elements, including `` rows and ` | ` cells. It also demonstrates how background colors are painted behind any borders.

#### HTML

```html
<table>
  <tbody>
    <tr id="r1">
      <td id="c11">11</td>
      <td id="c12">12</td>
      <td id="c13">13</td>
    </tr>
    <tr id="r2">
      <td id="c21">21</td>
      <td id="c22">22</td>
      <td id="c23">23</td>
    </tr>
    <tr id="r3">
      <td id="c31">31</td>
      <td id="c32">32</td>
      <td id="c33">33</td>
    </tr>
  </tbody>
</table>
```

#### CSS

We use CSS to set different `named-color` values. We also set a large dashed border on the table and every cell to demonstrate how the `background-color` is painted to the outer edge of the border-box.

```css
table {
  border-collapse: collapse;
  border: dashed black 5px;
  width: 250px;
  height: 150px;
}
td {
  border: dashed 5px black;
}
#r1 {
  background-color: lightblue;
}
#c12 {
  background-color: cyan;
}
#r2 {
  background-color: grey;
}
#r3 {
  background-color: olive;
}
```

#### Result

## See also

- `background-clip`
- Multiple backgrounds
- The `<color>` data type
- Other color-related properties: `color`, `border-color`, `outline-color`, `text-decoration-color`, `text-emphasis-color`, `text-shadow`, `caret-color`, and `column-rule-color`
