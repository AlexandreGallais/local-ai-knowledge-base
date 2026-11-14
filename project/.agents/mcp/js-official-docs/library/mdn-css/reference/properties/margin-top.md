---
title: "`margin-top` CSS property"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/properties/margin-top/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `margin-top` CSS property

The **`margin-top`** CSS property sets the margin area on the top of an element. A positive value places it farther from its neighbors, while a negative value places it closer.

This property has no effect on _non-replaced_ inline elements, such as `` or `<code>`.

```css
margin-top: 1em;
```

```css
margin-top: 10%;
```

```css
margin-top: 10px;
```

```css
margin-top: 0;
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

## Syntax

```css
/* <length> values */
margin-top: 10px; /* An absolute length */
margin-top: 1em; /* relative to the text size */
margin-top: 5%; /* relative to the nearest block container's width */
margin-top: anchor-size(height);
margin-top: calc(anchor-size(--my-anchor self-inline, 25px) / 4);

/* Keyword value */
margin-top: auto;

/* Global values */
margin-top: inherit;
margin-top: initial;
margin-top: revert;
margin-top: revert-layer;
margin-top: unset;
```

The `margin-top` property is specified as the keyword `auto`, or a `<length>`, or a `<percentage>`. Its value can be positive, zero, or negative.

### Values

- `<length>`
    The size of the margin as a fixed value.
    - For _anchor-positioned elements_, the `anchor-size()` function resolves to a `<length>` value relative to the associated _anchor element_'s width or height (see Setting element margin based on anchor size).

- `<percentage>`
    The size of the margin as a percentage, relative to the inline size (_width_ in a horizontal language, defined by `writing-mode`) of the containing block.
- `auto`
    The browser selects a suitable value to use. See `margin`.

## Examples

### Setting positive and negative top margins

```css
.content {
  margin-top: 5%;
}
.side-box {
  margin-top: 10px;
}
.logo {
  margin-top: -5px;
}
#footer {
  margin-top: 1em;
}
```

## See also

- `margin-right`, `margin-bottom`, and `margin-left`
- `margin` shorthand
- `margin-block-start`, `margin-block-end`, `margin-inline-start`, and `margin-inline-end`
- `margin-block` and `margin-inline` shorthands
- CSS box model module
