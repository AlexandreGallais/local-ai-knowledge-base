---
title: "`margin-block-start` CSS property"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/properties/margin-block-start/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `margin-block-start` CSS property

The **`margin-block-start`** CSS property defines the logical block start margin of an element, which maps to a physical margin depending on the element's writing mode, directionality, and text orientation.

```css
margin-block-start: 20px;
writing-mode: horizontal-tb;
```

```css
margin-block-start: 20px;
writing-mode: vertical-rl;
```

```css
margin-block-start: 20%;
writing-mode: horizontal-tb;
```

```css
margin-block-start: auto;
writing-mode: vertical-lr;
```

```html
<section id="default-example">
  <div id="container">
    <div class="row">One</div>
    <div class="row transition-all" id="example-element">Two</div>
    <div class="row">Three</div>
  </div>
</section>
```

```css
#container {
  width: 300px;
  height: 200px;
  display: flex;
  align-content: flex-start;
  flex-direction: column;
  justify-content: flex-start;
}

.row {
  height: 33.33%;
  display: inline-block;
  border: solid #ce7777 10px;
  background-color: #2b3a55;
  color: white;
  flex-shrink: 0;
}

#example-element {
  border: solid 10px #ffbf00;
  background-color: #2b3a55;
}
```

## Syntax

```css
/* <length> values */
margin-block-start: 10px; /* An absolute length */
margin-block-start: 1em; /* relative to the text size */
margin-block-start: 5%; /* relative to the nearest block container's width */
margin-block-start: anchor-size(width);
margin-block-start: calc(anchor-size(--my-anchor block, 20px) / 3);

/* Keyword value */
margin-block-start: auto;

/* Global values */
margin-block-start: inherit;
margin-block-start: initial;
margin-block-start: revert;
margin-block-start: revert-layer;
margin-block-start: unset;
```

It corresponds to the `margin-top`, `margin-right`, `margin-bottom`, or `margin-left` property depending on the values defined for `writing-mode`, `direction`, and `text-orientation`.

It relates to `margin-block-end`, `margin-inline-start`, and `margin-inline-end`, which define the other margins of the element.

### Values

The `margin-block-start` property takes the same values as the `margin-top` property.

## Examples

### Setting block start margin

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
  margin-block-start: 20px;
  background-color: #c8c800;
}
```

#### Result

## See also

- CSS Logical Properties and Values
- The mapped physical properties: `margin-top`, `margin-right`, `margin-bottom`, and `margin-left`
- `writing-mode`, `direction`, `text-orientation`
