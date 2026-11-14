---
title: "`padding-inline-end` CSS property"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/properties/padding-inline-end/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `padding-inline-end` CSS property

The **`padding-inline-end`** CSS property defines the logical inline end padding of an element, which maps to a physical padding depending on the element's writing mode, directionality, and text orientation.

```css
padding-inline-end: 20px;
writing-mode: horizontal-tb;
```

```css
padding-inline-end: 20px;
writing-mode: vertical-rl;
```

```css
padding-inline-end: 5em;
writing-mode: horizontal-tb;
direction: rtl;
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
  unicode-bidi: bidi-override;
}
```

## Syntax

```css
/* <length> values */
padding-inline-end: 10px; /* An absolute length */
padding-inline-end: 1em; /* A length relative to the text size */

/* <percentage> value */
padding-inline-end: 5%; /* A padding relative to the block container's width */

/* Global values */
padding-inline-end: inherit;
padding-inline-end: initial;
padding-inline-end: revert;
padding-inline-end: revert-layer;
padding-inline-end: unset;
```

### Values

- `<length>`
    The size of the padding as a fixed value. Must be non-negative.
- `<percentage>`
    The size of the padding as a percentage, relative to the inline-size (_width_ in a horizontal language) of the containing block. Must be non-negative.

## Description

The `padding-inline-end` property takes the same values as physical padding properties such as `padding-top`. However, it can be equivalent to `padding-right`, `padding-left`, `padding-top`, or `padding-bottom` depending on the values set for `writing-mode`, `direction`, and `text-orientation`.

It relates to `padding-block-start`, `padding-block-end`, and `padding-inline-start`, which define the other padding values of the element.

## Examples

### Setting inline end padding for vertical text

#### HTML

```html
<div>
  <p class="exampleText">Example text</p>
</div>
```

#### CSS

```css
div {
  background-color: yellow;
  width: 120px;
  height: 120px;
}

.exampleText {
  writing-mode: vertical-lr;
  padding-inline-end: 20px;
  background-color: #c8c800;
}
```

#### Result

## See also

- CSS Logical Properties and Values
- The mapped physical properties: `padding-top`, `padding-right`, `padding-bottom`, and `padding-left`
- `writing-mode`, `direction`, `text-orientation`
