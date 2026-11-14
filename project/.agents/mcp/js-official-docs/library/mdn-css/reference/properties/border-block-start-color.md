---
title: "`border-block-start-color` CSS property"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/properties/border-block-start-color/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `border-block-start-color` CSS property

The **`border-block-start-color`** CSS property defines the color of the logical block-start border of an element, which maps to a physical border color depending on the element's writing mode, directionality, and text orientation. It corresponds to the `border-top-color`, `border-right-color`, `border-bottom-color`, or `border-left-color` property depending on the values defined for `writing-mode`, `direction`, and `text-orientation`.

```css
border-block-start-color: red;
writing-mode: horizontal-tb;
```

```css
border-block-start-color: #32a1ce;
writing-mode: vertical-rl;
```

```css
border-block-start-color: rgb(170 50 220 / 0.6);
writing-mode: horizontal-tb;
```

```css
border-block-start-color: hsl(60 90% 50% / 0.8);
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
  color: black;
  border: 0.75em solid;
  padding: 0.75em;
  width: 80%;
  height: 100px;
  unicode-bidi: bidi-override;
}
```

## Syntax

```css
border-block-start-color: blue;
border-block-start-color: #4c5d21;

/* Global values */
border-block-start-color: inherit;
border-block-start-color: initial;
border-block-start-color: revert;
border-block-start-color: revert-layer;
border-block-start-color: unset;
```

Related properties are `border-block-end-color`, `border-inline-start-color`, and `border-inline-end-color`, which define the other border colors of the element.

### Values

- `<color>`
    The color of the border.

## Examples

### Border color with vertical text

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
  border: 10px solid blue;
  border-block-start-color: red;
}
```

#### Results

## See also

- CSS Logical Properties and Values
- This property maps to one of the physical border properties: `border-top-color`, `border-right-color`, `border-bottom-color`, or `border-left-color`.
- `writing-mode`, `direction`, `text-orientation`
