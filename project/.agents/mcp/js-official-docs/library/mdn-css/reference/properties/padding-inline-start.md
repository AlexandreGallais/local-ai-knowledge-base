---
title: "`padding-inline-start` CSS property"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/properties/padding-inline-start/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `padding-inline-start` CSS property

The **`padding-inline-start`** CSS property defines the logical inline start padding of an element, which maps to a physical padding depending on the element's writing mode, directionality, and text orientation.

```css
padding-inline-start: 20px;
writing-mode: horizontal-tb;
```

```css
padding-inline-start: 20px;
writing-mode: vertical-rl;
```

```css
padding-inline-start: 5em;
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
padding-inline-start: 10px; /* An absolute length */
padding-inline-start: 1em; /* A length relative to the text size */

/* <percentage> value */
padding-inline-start: 5%; /* A padding relative to the block container's width */

/* Global values */
padding-inline-start: inherit;
padding-inline-start: initial;
padding-inline-start: revert;
padding-inline-start: revert-layer;
padding-inline-start: unset;
```

### Values

- `<length>`
    The size of the padding as a fixed value. Must be non-negative.
- `<percentage>`
    The size of the padding as a percentage, relative to the inline size (_width_ in a horizontal language, defined by `writing-mode`) of the containing block. Must be non-negative.

## Description

The `padding-inline-start` property takes the same values as physical properties such as `padding-top`. However, it can be equivalent to `padding-left`, `padding-right`, `padding-top`, or `padding-bottom` depending on the values set for `writing-mode`, `direction`, and `text-orientation`.

It relates to `padding-block-start`, `padding-block-end`, and `padding-inline-end`, which define the other padding values of the element.

## Examples

### Setting inline start padding for vertical text

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
  padding-inline-start: 20px;
  background-color: #c8c800;
}
```

#### Result

## See also

- CSS Logical Properties and Values
- The mapped physical properties: `padding-top`, `padding-right`, `padding-bottom`, and `padding-left`
- `writing-mode`, `direction`, `text-orientation`
