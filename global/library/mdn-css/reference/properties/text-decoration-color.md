---
title: "`text-decoration-color` CSS property"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/properties/text-decoration-color/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `text-decoration-color` CSS property

The **`text-decoration-color`** CSS property sets the color of decorations added to text by `text-decoration-line`.

The color applies to decorations, such as underlines, overlines, strikethroughs, and wavy lines like those used to mark misspellings, in the scope of the property's value.

CSS does not provide a direct mechanism for specifying a unique color for each line type. This effect can nevertheless be achieved by nesting elements, applying a different line type to each element (with the `text-decoration-line` property), and specifying the line color (with `text-decoration-color`) on a per-element basis.

```css
text-decoration-color: red;
```

```css
text-decoration-color: #21ff21;
```

```css
text-decoration-color: rgb(255 90 255);
```

```css
text-decoration-color: hsl(70 100% 40%);
```

```css
text-decoration-color: currentColor;
```

```html
<section id="default-example">
  <p>
    I'd far rather be
    <span class="transition-all" id="example-element">happy than right</span>
    any day.
  </p>
</section>
```

```css
p {
  font: 1.5em sans-serif;
}

#example-element {
  text-decoration-line: underline;
}
```

## Syntax

```css
/* <color> values */
text-decoration-color: currentColor;
text-decoration-color: red;
text-decoration-color: #00ff00;
text-decoration-color: rgb(255 128 128 / 50%);
text-decoration-color: transparent;

/* Global values */
text-decoration-color: inherit;
text-decoration-color: initial;
text-decoration-color: revert;
text-decoration-color: revert-layer;
text-decoration-color: unset;
```

### Values

This property is specified as one `<color>` value:

- `<color>`
    The color of the line decoration.

## Accessibility

It is important to ensure that the contrast ratio between the color of the text, the background the text is placed over, and the text decoration line is high enough that people experiencing low vision conditions will be able to read the content of the page. Color contrast ratio is determined by comparing the luminosity of the text and background color values.

Color alone should not be used to convey meaning. For example, change of text and text-decoration-color alone is not enough to indicate a link has focus.

- WebAIM: Color Contrast Checker
- MDN Understanding WCAG, Guideline 1.4 explanations
- Understanding Success Criterion 1.4.3 | W3C Understanding WCAG 2.0

## Examples

### Basic <example-value>

```html
<p>
  This paragraph has <s>some erroneous text</s> inside it that I want to call
  attention to.
</p>
```

```css
p {
  text-decoration-line: underline;
  text-decoration-color: cyan;
}

s {
  text-decoration-line: line-through;
  text-decoration-color: red;
  text-decoration-style: wavy;
}
```

## See also

- When setting multiple line-decoration properties at once, it may be more convenient to use the `text-decoration` shorthand property instead.
- The `<color>` data type
- Other color-related properties: `background-color`, `border-color`, `outline-color`, `text-emphasis-color`, `text-shadow`, `caret-color`, and `column-rule-color`
