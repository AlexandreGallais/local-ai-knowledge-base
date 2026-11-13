---
title: "`border-left-width` CSS property"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/properties/border-left-width/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `border-left-width` CSS property

The **`border-left-width`** CSS property sets the width of the left border of an element.

```css
border-left-width: thick;
```

```css
border-left-width: 2em;
```

```css
border-left-width: 4px;
```

```css
border-left-width: 2ex;
```

```css
border-left-width: 0;
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
border-left-width: thin;
border-left-width: medium;
border-left-width: thick;

/* <length> values */
border-left-width: 10em;
border-left-width: 3vmax;
border-left-width: 6px;

/* Global keywords */
border-left-width: inherit;
border-left-width: initial;
border-left-width: revert;
border-left-width: revert-layer;
border-left-width: unset;
```

### Values

- `<line-width>`
    Defines the width of the border, either as an explicit non-negative `<length>` or the keywords: `thin`, `medium`, or `thick`. The default is `medium`.

## Examples

### Comparing border widths

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
  border-left-width: thick;
}
div:nth-child(2) {
  border-left-width: 2em;
}
```

#### Result

## See also

- The other border-width-related CSS properties: `border-top-width`, `border-right-width`, `border-bottom-width`, and `border-width`.
- The other border-left-related CSS properties: `border`, `border-left`, `border-left-style`, and `border-left-color`.
