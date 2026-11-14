---
title: "`border-bottom-width` CSS property"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/properties/border-bottom-width/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `border-bottom-width` CSS property

The **`border-bottom-width`** CSS property sets the width of the bottom border of an element.

```css
border-bottom-width: thick;
```

```css
border-bottom-width: 2em;
```

```css
border-bottom-width: 4px;
```

```css
border-bottom-width: 2ex;
```

```css
border-bottom-width: 0;
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

## Syntax

```css
/* Keyword values */
border-bottom-width: thin;
border-bottom-width: medium;
border-bottom-width: thick;

/* <length> values */
border-bottom-width: 10em;
border-bottom-width: 3vmax;
border-bottom-width: 6px;

/* Global keywords */
border-bottom-width: inherit;
border-bottom-width: initial;
border-bottom-width: revert;
border-bottom-width: revert-layer;
border-bottom-width: unset;
```

### Values

- `<line-width>`
    Defines the width of the border, either as an explicit non-negative `<length>` or the keywords: `thin`, `medium`, or `thick`. The default is `medium`.

## Examples

### Comparing bottom border widths

#### HTML

```html
<div>Element 1</div>
<div>Element 2</div>
```

#### CSS

```css
div {
  border: 1px solid red;
  margin: 1em 0;
}

div:nth-child(1) {
  border-bottom-width: thick;
}
div:nth-child(2) {
  border-bottom-width: 2em;
}
```

#### Result

## See also

- The other border-width-related CSS properties: `border-left-width`, `border-right-width`, `border-top-width`, and `border-width`.
- The other border-bottom-related CSS properties: `border`, `border-bottom`, `border-bottom-style`, and `border-bottom-color`.
