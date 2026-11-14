---
title: "`padding-bottom` CSS property"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/properties/padding-bottom/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `padding-bottom` CSS property

The **`padding-bottom`** CSS property sets the height of the padding area on the bottom of an element.

```css
padding-bottom: 1em;
```

```css
padding-bottom: 10%;
```

```css
padding-bottom: 20px;
```

```css
padding-bottom: 1ch;
```

```css
padding-bottom: 0;
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
padding-bottom: 0.5em;
padding-bottom: 0;
padding-bottom: 2cm;

/* <percentage> value */
padding-bottom: 10%;

/* Global values */
padding-bottom: inherit;
padding-bottom: initial;
padding-bottom: revert;
padding-bottom: revert-layer;
padding-bottom: unset;
```

The `padding-bottom` property is specified as a single value chosen from the list below. Unlike margins, negative values are not allowed for padding.

### Values

- `<length>`
    The size of the padding as a fixed value. Must be non-negative.
- `<percentage>`
    The size of the padding as a percentage, relative to the inline size (_width_ in a horizontal language, defined by `writing-mode`) of the containing block. Must be non-negative.

## Examples

### Setting padding bottom with pixels and percentages

```css
.content {
  padding-bottom: 5%;
}
.side-box {
  padding-bottom: 10px;
}
```

## See also

- `padding-top`, `padding-right`, and `padding-left`
- `padding` shorthand
- `padding-block-start`, `padding-block-end`, `padding-inline-start`, and `padding-inline-end`
- `padding-block` and `padding-inline` shorthands
- Introduction to the CSS box model guide
- CSS box model module
