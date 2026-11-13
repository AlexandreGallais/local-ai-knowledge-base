---
title: "`border-inline` CSS property"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/properties/border-inline/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `border-inline` CSS property

The **`border-inline`** CSS shorthand property sets the individual logical inline border property values in a single place in the style sheet.

```css
border-inline: solid;
writing-mode: horizontal-tb;
```

```css
border-inline: dashed red;
writing-mode: vertical-rl;
```

```css
border-inline: 1rem solid;
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

- `border-inline-color`
- `border-inline-style`
- `border-inline-width`

## Syntax

```css
border-inline: 1px;
border-inline: 2px dotted;
border-inline: medium dashed blue;

/* Global values */
border-inline: inherit;
border-inline: initial;
border-inline: revert;
border-inline: revert-layer;
border-inline: unset;
```

### Values

The `border-inline` is specified with one or more of the following, in any order:

- `<line-width>`
    The width of the border. See `border-width`.
- `<line-style>`
    The line style of the border. See `border-style`.
- `<color>`
    The color of the border.

## Description

The physical borders to which `border-inline` maps depends on the element's writing mode, directionality, and text orientation. It corresponds to the `border-top` and `border-bottom` or `border-right`, and `border-left` properties, depending on the values defined for `writing-mode`, `direction`, and `text-orientation`.

The borders in the other dimension can be set with `border-block`, which sets `border-block-start`, and `border-block-end`.

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
  border-inline: 5px dashed blue;
}
```

#### Results

## See also

- CSS Logical Properties and Values
- This property maps to one of the physical border properties: `border-top`, `border-right`, `border-bottom`, or `border-left`.
- `writing-mode`, `direction`, `text-orientation`
