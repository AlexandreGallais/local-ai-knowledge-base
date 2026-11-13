---
title: "`border-block-start-width` CSS property"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/properties/border-block-start-width/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `border-block-start-width` CSS property

The **`border-block-start-width`** CSS property defines the width of the logical block-start border of an element, which maps to a physical border width depending on the element's writing mode, directionality, and text orientation. It corresponds to the `border-top-width`, `border-right-width`, `border-bottom-width`, or `border-left-width` property depending on the values defined for `writing-mode`, `direction`, and `text-orientation`.

```css
border-block-start-width: thick;
writing-mode: horizontal-tb;
```

```css
border-block-start-width: thick;
writing-mode: vertical-rl;
```

```css
border-block-start-width: 4px;
writing-mode: horizontal-tb;
```

```css
border-block-start-width: 4px;
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
  background-color: palegreen;
  color: black;
  border: 0 solid crimson;
  padding: 0.75em;
  width: 80%;
  height: 100px;
  unicode-bidi: bidi-override;
}
```

## Syntax

```css
/* <'line-width'> values */
border-block-start-width: 5px;
border-block-start-width: thick;

/* Global values */
border-block-start-width: inherit;
border-block-start-width: initial;
border-block-start-width: revert;
border-block-start-width: revert-layer;
border-block-start-width: unset;
```

Related properties are `border-block-end-width`, `border-inline-start-width`, and `border-inline-end-width`, which define the other border widths of the element.

### Values

- `<line-width>`
    Defines the width of the border, either as an explicit non-negative `<length>` or the keywords: `thin`, `medium`, or `thick`. The default is `medium`.

## Examples

### Border width with vertical text

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
  border: 1px solid blue;
  border-block-start-width: 5px;
}
```

#### Results

## See also

- CSS Logical Properties and Values
- This property maps to one of the physical border properties: `border-top-width`, `border-right-width`, `border-bottom-width`, and `border-left-width`
- `writing-mode`, `direction`, `text-orientation`
