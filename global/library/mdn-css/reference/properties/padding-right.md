---
title: "`padding-right` CSS property"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/properties/padding-right/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `padding-right` CSS property

The **`padding-right`** CSS property sets the width of the padding area on the right of an element.

```css
padding-right: 1.5em;
```

```css
padding-right: 10%;
```

```css
padding-right: 20px;
```

```css
padding-right: 1ch;
```

```css
padding-right: 0;
```

```html
<section id="default-example">
  <div class="transition-all" id="example-element">
    <div class="box">
      Far out in the uncharted backwaters of the unfashionable end of the
      western spiral arm of the Galaxy lies a small unregarded yellow sun.
    </div>
  </div>
</section>
```

```css
#example-element {
  border: 10px solid #ffc129;
  overflow: hidden;
  text-align: left;
}

.box {
  border: dashed 1px;
}
```

An element's padding area is the space between its content and its border.

> **Note:**
> The `padding` property can be used to set paddings on all four sides of an element with a single declaration.

## Syntax

```css
/* <length> values */
padding-right: 0.5em;
padding-right: 0;
padding-right: 2cm;

/* <percentage> value */
padding-right: 10%;

/* Global values */
padding-right: inherit;
padding-right: initial;
padding-right: revert;
padding-right: revert-layer;
padding-right: unset;
```

The `padding-right` property is specified as a single value chosen from the list below. Unlike margins, negative values are not allowed for padding.

### Values

- `<length>`
    The size of the padding as a fixed value. Must be non-negative.
- `<percentage>`
    The size of the padding as a percentage, relative to the inline size (_width_ in a horizontal language, defined by `writing-mode`) of the containing block. Must be non-negative.

## Examples

### Setting right padding using pixels and percentages

```css
.content {
  padding-right: 5%;
}
.side-box {
  padding-right: 10px;
}
```

## See also

- `padding-top`, `padding-bottom`, and `padding-left`
- `padding` shorthand
- `padding-block-start`, `padding-block-end`, `padding-inline-start`, and `padding-inline-end`
- `padding-block` and `padding-inline` shorthands
- Introduction to the CSS box model guide
- CSS box model module
