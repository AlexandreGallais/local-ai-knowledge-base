---
title: "`border-inline-end-color` CSS property"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/properties/border-inline-end-color/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `border-inline-end-color` CSS property

The **`border-inline-end-color`** CSS property defines the color of the logical inline-end border of an element, which maps to a physical border color depending on the element's writing mode, directionality, and text orientation. It corresponds to the `border-top-color`, `border-right-color`, `border-bottom-color`, or `border-left-color` property depending on the values defined for `writing-mode`, `direction`, and `text-orientation`.

```css
border-inline-end-color: red;
writing-mode: horizontal-tb;
```

```css
border-inline-end-color: #32a1ce;
writing-mode: vertical-rl;
```

```css
border-inline-end-color: rgb(170 50 220 / 0.6);
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
border-inline-end-color: rebeccapurple;
border-inline-end-color: #663399;

/* Global values */
border-inline-end-color: inherit;
border-inline-end-color: initial;
border-inline-end-color: revert;
border-inline-end-color: revert-layer;
border-inline-end-color: unset;
```

Related properties are `border-block-start-color`, `border-block-end-color`, and `border-inline-start-color`, which define the other border colors of the element.

### Values

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
  writing-mode: vertical-lr;
  border: 10px solid blue;
  border-inline-end-color: red;
}
```

## See also

- CSS Logical Properties and Values
- This property maps to one of the physical border properties: `border-top-color`, `border-right-color`, `border-bottom-color`, or `border-left-color`.
- `writing-mode`, `direction`, `text-orientation`
