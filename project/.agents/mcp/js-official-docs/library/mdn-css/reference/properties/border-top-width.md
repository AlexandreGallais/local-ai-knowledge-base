---
title: "`border-top-width` CSS property"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/properties/border-top-width/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `border-top-width` CSS property

The **`border-top-width`** CSS property sets the width of the top border of an element.

```css
border-top-width: thick;
```

```css
border-top-width: 2em;
```

```css
border-top-width: 4px;
```

```css
border-top-width: 2ex;
```

```css
border-top-width: 0;
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
border-top-width: thin;
border-top-width: medium;
border-top-width: thick;

/* <length> values */
border-top-width: 10em;
border-top-width: 3vmax;
border-top-width: 6px;

/* Global keywords */
border-top-width: inherit;
border-top-width: initial;
border-top-width: revert;
border-top-width: revert-layer;
border-top-width: unset;
```

### Values

- `<line-width>`
    Defines the width of the border, either as an explicit non-negative `<length>` or the keywords: `thin`, `medium`, or `thick`. The default is `medium`.

## Examples

### HTML

```html
<div>Element 1</div>
<div>Element 2</div>
```

### CSS

```css
div {
  border: 1px solid red;
  margin: 1em 0;
}

div:nth-child(1) {
  border-top-width: thick;
}
div:nth-child(2) {
  border-top-width: 2em;
}
```

## See also

- The other border-width-related CSS properties: `border-left-width`, `border-right-width`, `border-bottom-width`, and `border-width`.
- The other border-top-related CSS properties: `border`, `border-top`, `border-top-style`, and `border-top-color`.
