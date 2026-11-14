---
title: "`padding-block` CSS property"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/properties/padding-block/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `padding-block` CSS property

The **`padding-block`** CSS shorthand property defines the logical block start and end padding of an element, which maps to physical padding properties depending on the element's writing mode, directionality, and text orientation.

```css
padding-block: 10px 20px;
writing-mode: horizontal-tb;
```

```css
padding-block: 20px 40px;
writing-mode: vertical-rl;
```

```css
padding-block: 5% 10%;
writing-mode: horizontal-tb;
```

```css
padding-block: 2em 4em;
writing-mode: vertical-lr;
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

## Constituent properties

This property is a shorthand for the following CSS properties:

- `padding-block-start`
- `padding-block-end`

## Syntax

```css
/* <length> values */
padding-block: 10px 20px; /* An absolute length */
padding-block: 1em 2em; /* relative to the text size */
padding-block: 10px; /* sets both start and end values */

/* <percentage> values */
padding-block: 5% 2%; /* relative to the nearest block container's width */

/* Global values */
padding-block: inherit;
padding-block: initial;
padding-block: revert;
padding-block: revert-layer;
padding-block: unset;
```

The `padding-block` property may be specified with one or two values. If one value is given, it is used as the value for both `padding-block-start` and `padding-block-end`. If two values are given, the first is used for `padding-block-start` and the second for `padding-block-end`.

### Values

The `padding-block` property takes the same values as the `padding-top` property.

## Description

The padding values specified by `padding-block` can be equivalent to the `padding-top` and `padding-bottom` properties or the `padding-right` and `padding-left` properties, depending on the values defined for `writing-mode`, `direction`, and `text-orientation`.

## Examples

### Setting block padding for vertical text

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
  writing-mode: vertical-rl;
  padding-block: 20px 40px;
  background-color: #c8c800;
}
```

#### Result

## See also

- CSS Logical Properties and Values
- The mapped physical properties: `padding-top`, `padding-right`, `padding-bottom`, and `padding-left`
- `writing-mode`, `direction`, `text-orientation`
