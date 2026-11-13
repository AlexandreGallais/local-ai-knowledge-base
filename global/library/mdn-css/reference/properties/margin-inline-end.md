---
title: "`margin-inline-end` CSS property"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/properties/margin-inline-end/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `margin-inline-end` CSS property

The **`margin-inline-end`** CSS property defines the logical inline end margin of an element, which maps to a physical margin depending on the element's writing mode, directionality, and text orientation. In other words, it corresponds to the `margin-top`, `margin-right`, `margin-bottom` or `margin-left` property depending on the values defined for `writing-mode`, `direction`, and `text-orientation`.

```css
margin-inline-end: 20px;
writing-mode: horizontal-tb;
```

```css
margin-inline-end: 20px;
writing-mode: vertical-rl;
```

```css
margin-inline-end: 20%;
writing-mode: horizontal-tb;
direction: rtl;
```

```html
<section id="default-example">
  <div id="container">
    <div class="col">One</div>
    <div class="col transition-all" id="example-element">Two</div>
    <div class="col">Three</div>
  </div>
</section>
```

```css
#container {
  width: 300px;
  height: 200px;
  display: flex;
  align-content: flex-start;
  justify-content: flex-start;
}

.col {
  width: 33.33%;
  border: solid #ce7777 10px;
  background-color: #2b3a55;
  color: white;
  flex-shrink: 0;
}

#example-element {
  border: solid 10px #ffbf00;
  background-color: #2b3a55;
  unicode-bidi: bidi-override;
}
```

## Syntax

```css
/* <length> values */
margin-inline-end: 10px; /* An absolute length */
margin-inline-end: 1em; /* relative to the text size */
margin-inline-end: 5%; /* relative to the nearest block container's width */
margin-inline-end: anchor-size(height);
margin-inline-end: calc(anchor-size(--my-anchor self-inline, 25px) / 5);

/* Keyword value */
margin-inline-end: auto;

/* Global values */
margin-inline-end: inherit;
margin-inline-end: initial;
margin-inline-end: revert;
margin-inline-end: revert-layer;
margin-inline-end: unset;
```

It relates to `margin-block-start`, `margin-block-end`, and `margin-inline-start`, which define the other margins of the element.

### Values

The `margin-inline-end` property takes the same values as the `margin-top` property.

## Examples

### Setting inline end margin

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
  margin-inline-end: 20px;
  background-color: #c8c800;
}
```

#### Result

## See also

- CSS Logical Properties and Values
- `margin-inline-start`
- The mapped physical properties: `margin-top`, `margin-right`, `margin-bottom`, and `margin-left`
- `writing-mode`, `direction`, `text-orientation`
