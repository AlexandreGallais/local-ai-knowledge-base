---
title: "`border-block-end` CSS property"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/properties/border-block-end/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `border-block-end` CSS property

The **`border-block-end`** CSS shorthand property sets the individual logical block-end border property values in a single place in the style sheet.

```css
border-block-end: solid;
writing-mode: horizontal-tb;
```

```css
border-block-end: dashed red;
writing-mode: vertical-rl;
```

```css
border-block-end: 1rem solid;
writing-mode: horizontal-tb;
```

```css
border-block-end: thick double #32a1ce;
writing-mode: vertical-lr;
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

- `border-block-end-color`
- `border-block-end-style`
- `border-block-end-width`

## Syntax

```css
border-block-end: 1px;
border-block-end: 2px dotted;
border-block-end: medium dashed blue;

/* Global values */
border-block-end: inherit;
border-block-end: initial;
border-block-end: revert;
border-block-end: revert-layer;
border-block-end: unset;
```

`border-block-end` can be used to set the values for one or more of `border-block-end-width`, `border-block-end-style`, and `border-block-end-color`. The physical border to which it maps depends on the element's writing mode, directionality, and text orientation. It corresponds to the `border-top`, `border-right`, `border-bottom`, or `border-left` property depending on the values defined for `writing-mode`, `direction`, and `text-orientation`.

Related properties are `border-block-start`, `border-inline-start`, and `border-inline-end`, which define the other borders of the element.

### Values

The `border-block-end` is specified with one or more of the following, in any order:

- `<line-width>`
    The width of the border. See `border-width`.
- `<line-style>`
    The line style of the border. See `border-style`.
- `<color>`
    The color of the border.

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
  border-block-end: 5px dashed blue;
}
```

#### Results

## See also

- CSS Logical Properties and Values
- This property maps to one of the physical border properties: `border-top`, `border-right`, `border-bottom`, or `border-left`.
- `writing-mode`, `direction`, `text-orientation`
