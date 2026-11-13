---
title: "`border-inline-end` CSS property"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/properties/border-inline-end/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `border-inline-end` CSS property

The **`border-inline-end`** CSS shorthand property sets the individual logical inline-end border property values in a single place in the style sheet.

```css
border-inline-end: solid;
writing-mode: horizontal-tb;
```

```css
border-inline-end: dashed red;
writing-mode: vertical-rl;
```

```css
border-inline-end: 1rem solid;
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

- `border-inline-end-color`
- `border-inline-end-style`
- `border-inline-end-width`

## Syntax

```css
border-inline-end: 1px;
border-inline-end: 2px dashed;
border-inline-end: medium dashed blue;

/* Global values */
border-inline-end: inherit;
border-inline-end: initial;
border-inline-end: revert;
border-inline-end: revert-layer;
border-inline-end: unset;
```

The physical border to which `border-inline-end` maps depends on the element's writing mode, directionality, and text orientation. It corresponds to the `border-top`, `border-right`, `border-bottom`, or `border-left` property depending on the values defined for `writing-mode`, `direction`, and `text-orientation`.

Related properties are `border-block-start`, `border-block-end`, and `border-inline-start`, which define the other borders of the element.

### Values

The `border-inline-end` is specified with one or more of the following, in any order:

- `<line-width>`
    The width of the border. See `border-width`.
- `<line-style>`
    The line style of the border. See `border-style`.
- `<color>`
    The color of the border.

## Examples

### HTML

```html
<div>
  <p class="exampleText">Example text</p>
</div>
```

### CSS

```css
div {
  background-color: yellow;
  width: 120px;
  height: 120px;
}

.exampleText {
  writing-mode: vertical-rl;
  border-inline-end: 5px dashed blue;
}
```

## See also

- CSS Logical Properties and Values
- This property maps to one of the physical border properties: `border-top`, `border-right`, `border-bottom`, or `border-left`.
- `writing-mode`, `direction`, `text-orientation`
