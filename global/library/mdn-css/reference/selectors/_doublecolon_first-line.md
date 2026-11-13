---
title: "`::first-line` CSS pseudo-element"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/selectors/_doublecolon_first-line/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `::first-line` CSS pseudo-element

The **`::first-line`** CSS pseudo-element applies styles to the first line of a block container.

```css
p::first-line {
  font-size: 1.2rem;
  font-weight: bold;
  text-decoration: underline;
}
```

```html
<p>
  In warm ocean waters around the world, you may see a strange sight: A fish
  leaping from the water and soaring dozens of meters before returning to the
  ocean's depths. Early Mediterranean sailors thought these flying fish returned
  to the shore at night to sleep, and therefore called this family of marine
  fish Exocoetidae.
</p>
```

The effects of `::first-line` are limited by the length and content of the first line of text in the element. The length of the first line depends on many factors, including the width of the element, the width of the document, and the font size of the text. `::first-line` has no effect when the first child of the element, which would be the first part of the first line, is an inline block-level element, such as an inline table.

> **Note:**
> Selectors Level 3 introduced the double-colon notation (`::`) to distinguish pseudo-elements from the single-colon (`:`) pseudo-classes. Browsers accept both `::first-line` and `:first-line`, which was introduced in CSS2.

For the purposes of CSS `background`, the `::first-line` pseudo-element is like an inline-level element meaning that in a left-justified first line, the background may not extend all the way to the right margin.

## Allowable properties

Only a small subset of CSS properties can be used with the `::first-line` pseudo-element:

- All font-related properties: `font`, `font-kerning`, `font-style`, `font-variant`, `font-variant-numeric`, `font-variant-position`, `font-variant-east-asian`, `font-variant-caps`, `font-variant-alternates`, `font-variant-ligatures`, `font-synthesis`, `font-feature-settings`, `font-language-override`, `font-weight`, `font-size`, `font-size-adjust`, `font-stretch`, and `font-family`
- All background-related properties: `background-color`, `background-clip`, `background-image`, `background-origin`, `background-position`, `background-repeat`, `background-size`, `background-attachment`, and `background-blend-mode`
- The `color` property
- `word-spacing`, `letter-spacing`, `text-decoration`, `text-transform`, and `line-height`
- `text-shadow`, `text-decoration`, `text-decoration-color`, `text-decoration-line`, `text-decoration-style`, and `vertical-align`.

## Syntax

```css
::first-line {
  /* ... */
}
```

## Examples

### Styling first line of a paragraph

#### HTML

```html
<p>
  Styles will only be applied to the first line of this paragraph. After that,
  all text will be styled like normal. See what I mean?
</p>

<span>
  The first line of this text will not receive special styling because it is not
  a block-level element.
</span>
```

#### CSS

```css
* {
  font-size: 20px;
  font-family: sans-serif;
}
```

```css
::first-line {
  color: blue;
  font-weight: bold;

  /* WARNING: DO NOT USE THESE */
  /* Many properties are invalid in ::first-line pseudo-elements */
  margin-left: 20px;
  text-indent: 20px;
}
```

### Styling the first line of an SVG text element

In this example, we style the first line of an SVG `<text>` element using the `::first-line` pseudo-element.

> **Note:**
> At time of writing this feature has limited support.

#### HTML

```html
<svg viewBox="0 0 320 150">
  <text y="20">Here is an English paragraph
that is broken into multiple lines
in the source code so that it can
be more easily read and edited
in a text editor.
  </text>
</svg>
```

#### CSS

In order to make the SVG `<text>` element wrap to multiple lines, we use the `white-space` CSS property. We then select the first line using the `::first-line` pseudo-element.

```css
text {
  font-size: 20px;
  font-family: sans-serif;
}
```

```css
text {
  white-space: break-spaces;
}

text::first-line {
  fill: blue;
  font-weight: bold;
}
```

#### Result

## See also

- `::first-letter`
- `white-space`
