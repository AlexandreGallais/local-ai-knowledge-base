---
title: "`border-block-start` CSS property"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/properties/border-block-start/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `border-block-start` CSS property

The **`border-block-start`** CSS shorthand property sets the individual logical block-start border property values in a single place in the style sheet.

```css
border-block-start: solid;
writing-mode: horizontal-tb;
```

```css
border-block-start: dashed red;
writing-mode: vertical-rl;
```

```css
border-block-start: 1rem solid;
writing-mode: horizontal-tb;
```

```css
border-block-start: thick double #32a1ce;
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

- `border-block-start-color`
- `border-block-start-style`
- `border-block-start-width`

## Syntax

```css
border-block-start: 1px;
border-block-start: 2px dotted;
border-block-start: medium dashed blue;

/* Global values */
border-block-start: inherit;
border-block-start: initial;
border-block-start: revert;
border-block-start: revert-layer;
border-block-start: unset;
```

`border-block-start` can be used to set the values for one or more of `border-block-start-width`, `border-block-start-style`, and `border-block-start-color`. The physical border to which it maps depends on the element's writing mode, directionality, and text orientation. It corresponds to the `border-top`, `border-right`, `border-bottom`, or `border-left` property depending on the values defined for `writing-mode`, `direction`, and `text-orientation`.

Related properties are `border-block-end`, `border-inline-start`, and `border-inline-end`, which define the other borders of the element.

### Values

The `border-block-start` is specified with one or more of the following, in any order:

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
  border-block-start: 5px dashed blue;
}
```

## See also

- CSS Logical Properties and Values
- This property maps to one of the physical border properties: `border-top`, `border-right`, `border-bottom`, or `border-left`.
- `writing-mode`, `direction`, `text-orientation`
