---
title: "`text-underline-offset` CSS property"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/properties/text-underline-offset/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `text-underline-offset` CSS property

The **`text-underline-offset`** CSS property sets the offset distance of an underline text decoration line (applied using `text-decoration`) from its original position.

`text-underline-offset` is not part of the `text-decoration` shorthand. While an element can have multiple `text-decoration` lines, `text-underline-offset` only impacts underlining, and **not** other possible line decoration options such as `overline` or `line-through`.

```css
text-underline-offset: auto;
```

```css
text-underline-offset: 8px;
```

```css
text-underline-offset: -0.5rem;
```

```html
<section id="default-example">
  <p id="example-element">And after all we are only ordinary</p>
</section>
```

```css
p {
  font: 1.5em sans-serif;
  text-decoration-line: underline;
  text-decoration-color: red;
}
```

## Syntax

```css
/* Single keyword */
text-underline-offset: auto;

/* length */
text-underline-offset: 0.1em;
text-underline-offset: 3px;

/* percentage */
text-underline-offset: 20%;

/* Global values */
text-underline-offset: inherit;
text-underline-offset: initial;
text-underline-offset: revert;
text-underline-offset: revert-layer;
text-underline-offset: unset;
```

### Values

This property is specified as one of the following values:

- `auto`
    The browser chooses the appropriate offset for underlines.
- `<length>`
    Specifies the offset of underlines as a `length`, overriding the font file suggestion and the browser default. It is recommended to use `em` units so the offset scales with the font size.
- `<percentage>`
    Specifies the offset of underlines as a `percentage` of **1 em** in the element's font. A percentage inherits as a relative value, and so therefore scales with changes in the font. For a given application of this property, the offset is constant across the whole box that the underline is applied to, even if there are child elements with different font sizes or vertical alignment.

## Examples

### Demonstration of text-underline-offset

```html
<p class="one-line">Here's some text with an offset wavy red underline!</p>
<br />
<p class="two-lines">
  This text has lines both above and below it. Only the bottom one is offset.
</p>
```

```css
p {
  text-decoration: underline wavy red;
  text-underline-offset: 1em;
}

.two-lines {
  text-decoration-color: purple;
  text-decoration-line: underline overline;
}
```

## See also

- `text-decoration`
- `text-decoration-thickness`
