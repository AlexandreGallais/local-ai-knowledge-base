---
title: "`color` CSS property"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/properties/color/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `color` CSS property

The **`color`** CSS property sets the foreground color value of an element's text and text decorations, and sets the `currentColor` value. `currentColor` may be used as an indirect value on _other_ properties and is the default for other color properties, such as `border-color`.

For an overview of using color in HTML, see Applying color to HTML elements using CSS.

```css
color: rebeccapurple;
```

```css
color: #00a400;
```

```css
color: rgb(214 122 127);
```

```css
color: hsl(30deg 82% 43%);
```

```css
color: hsl(237deg 74% 33% / 61%);
```

```css
color: hwb(152deg 0% 58% / 70%);
```

```html
<section id="default-example">
  <div class="example-container">
    <p id="example-element">
      London. Michaelmas term lately over, and the Lord Chancellor sitting in
      Lincoln's Inn Hall. Implacable November weather.
    </p>
  </div>
</section>
```

```css
#example-element {
  font-size: 1.5em;
}

.example-container {
  background-color: white;
  padding: 10px;
}
```

## Syntax

```css
/* Keyword value */
color: currentColor;

/* <named-color> values */
color: red;
color: orange;
color: tan;
color: rebeccapurple;

/* <hex-color> values */
color: #090;
color: #009900;
color: #090a;
color: #009900aa;

/* <rgb()> values and legacy <rgba()> values*/
color: rgb(34, 12, 64);
color: rgb(34, 12, 64, 0.6);
color: rgba(34, 12, 64, 0.6);
color: rgb(34 12 64 / 0.6);
color: rgba(34 12 64 / 0.6);
color: rgb(34.6 12 64 / 60%);
color: rgba(34.6 12 64 / 60%);

/* <hsl()> values and legacy <hsla()> values */
color: hsl(30, 100%, 50%);
color: hsl(30, 100%, 50%, 0.6);
color: hsla(30, 100%, 50%, 0.6);
color: hsl(30 100% 50% / 0.6);
color: hsla(30 100% 50% / 0.6);
color: hsl(30.2 100% 50% / 60%);
color: hsla(30.2 100% 50% / 60%);

/* <hwb()> values */
color: hwb(90 10% 10%);
color: hwb(90 10% 10% / 0.5);
color: hwb(90deg 10% 10%);
color: hwb(1.5708rad 60% 0%);
color: hwb(0.25turn 0% 40% / 50%);

/* Global values */
color: inherit;
color: initial;
color: revert;
color: revert-layer;
color: unset;
```

### Values

This property is specified as a single value from the following list:

- `<color>`
    Sets the color of the textual and decorative parts of the element.
- `currentColor`
    Sets the color to the element's `color` property value. However, if set as the value of `color`, `currentColor` is treated as `inherit`.

## Accessibility

It is important to ensure that the contrast ratio between the color of the text and the background the text is placed over is high enough that people experiencing low vision conditions will be able to read the content of the page.

Color contrast ratio is determined by comparing the luminosity of the text and background color values. In order to meet current Web Content Accessibility Guidelines (WCAG), a ratio of 4.5:1 is required for text content and 3:1 for larger text such as headings. Large text is defined as 18.66px and bold or larger, or 24px or larger.

- WebAIM: Color Contrast Checker
- MDN Understanding WCAG, Guideline 1.4 explanations
- Understanding Success Criterion 1.4.3 | W3C Understanding WCAG 2.0

## Examples

### Making text red

The following are all ways to make a paragraph's text red:

```css
p {
  color: red;
}
p {
  color: #f00;
}
p {
  color: #ff0000;
}
p {
  color: rgb(255 0 0);
}
p {
  color: rgb(100% 0% 0%);
}
p {
  color: hsl(0 100% 50%);
}

/* 50% translucent */
p {
  color: #ff000080;
}
p {
  color: rgb(255 0 0 / 50%);
}
p {
  color: hsl(0 100% 50% / 50%);
}
```

## See also

- The `<color>` data type
- Other color-related properties: `background-color`, `border-color`, `outline-color`, `text-decoration-color`, `text-emphasis-color`, `text-shadow`, `caret-color`, `column-rule-color`, and `print-color-adjust`
- SVG `color` attribute
- `color_value/color` function
- Applying color to HTML elements using CSS
- WCAG: color contrast
