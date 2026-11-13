---
title: "`border-block-color` CSS property"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/properties/border-block-color/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `border-block-color` CSS property

The **`border-block-color`** CSS property defines the color of the logical block borders of an element, which maps to a physical border color depending on the element's writing mode, directionality, and text orientation. It corresponds to the `border-top-color` and `border-bottom-color`, or `border-right-color` and `border-left-color` property depending on the values defined for `writing-mode`, `direction`, and `text-orientation`.

The border color in the other dimension can be set with `border-inline-color` which sets `border-inline-start-color`, and `border-inline-end-color`.

```css
border-block-color: red;
writing-mode: horizontal-tb;
```

```css
border-block-color: #32a1ce;
writing-mode: vertical-rl;
```

```css
border-block-color: rgb(170 50 220 / 0.6);
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
border-block-color: yellow;
border-block-color: #f5f6f7;

/* Global values */
border-block-color: inherit;
border-block-color: initial;
border-block-color: revert;
border-block-color: revert-layer;
border-block-color: unset;
```

### Values

This property is specified as one `<color>` value:

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
  writing-mode: vertical-lr;
  border: 10px solid blue;
  border-block-color: red;
}
```

#### Results

## See also

- CSS Logical Properties and Values
- This property maps to the physical border properties: `border-top-color`, `border-right-color`, `border-bottom-color`, or `border-left-color`.
- `writing-mode`, `direction`, `text-orientation`
