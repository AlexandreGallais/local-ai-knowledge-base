---
title: "`border-block` CSS property"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/properties/border-block/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `border-block` CSS property

The **`border-block`** CSS shorthand property sets the individual logical block border property values in a single place in the style sheet.

```css
border-block: solid;
writing-mode: horizontal-tb;
```

```css
border-block: dashed red;
writing-mode: vertical-rl;
```

```css
border-block: 1rem solid;
writing-mode: horizontal-tb;
direction: rtl;
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
  background-color: #eeeeee;
  color: darkmagenta;
  padding: 0.75em;
  width: 80%;
  height: 100px;
  unicode-bidi: bidi-override;
}
```

## Constituent properties

This property is a shorthand for the following CSS properties:

- `border-block-color`
- `border-block-style`
- `border-block-width`

## Syntax

```css
border-block: 1px;
border-block: 2px dotted;
border-block: medium dashed blue;

/* Global values */
border-block: inherit;
border-block: initial;
border-block: revert;
border-block: revert-layer;
border-block: unset;
```

### Values

The `border-block` is specified with one or more of the following, in any order:

- `<line-width>`
    The width of the border. See `border-width`.
- `<line-style>`
    The line style of the border. See `border-style`.
- `<color>`
    The color of the border.

## Description

`border-block` can be used to set the values for one or more of `border-block-width`, `border-block-style`, and `border-block-color` setting both the start and end in the block dimension at once. The physical borders to which it maps depends on the element's writing mode, directionality, and text orientation. It corresponds to the `border-top` and `border-bottom` or `border-right`, and `border-left` properties depending on the values defined for `writing-mode`, `direction`, and `text-orientation`.

The borders in the other dimension can be set with `border-inline`, which sets `border-inline-start`, and `border-inline-end`.

## Examples

### Border with vertical text

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
  border-block: 5px dashed blue;
}
```

#### Results

## See also

- CSS Logical Properties and Values
- This property maps to one of the physical border properties: `border-top`, `border-right`, `border-bottom`, or `border-left`.
- `writing-mode`, `direction`, `text-orientation`
