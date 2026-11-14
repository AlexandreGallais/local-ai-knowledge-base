---
title: "`inset-block` CSS property"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/properties/inset-block/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `inset-block` CSS property

The **`inset-block`** CSS shorthand property defines the logical block start and end offsets of an element, which maps to physical offsets depending on the element's writing mode, directionality, and text orientation. It corresponds to the `top` and `bottom`, or `right` and `left` properties depending on the values defined for `writing-mode`, `direction`, and `text-orientation`.

This inset property has no effect on non-positioned elements.

```css
inset-block: 10px 20px;
writing-mode: horizontal-tb;
```

```css
inset-block: 20px 40px;
writing-mode: vertical-rl;
```

```css
inset-block: 5% 20%;
writing-mode: horizontal-tb;
```

```css
inset-block: 1rem auto;
writing-mode: vertical-lr;
```

```html
<section id="default-example">
  <div class="example-container">
    <div id="example-element">I am absolutely positioned.</div>
    <p>
      As much mud in the streets as if the waters had but newly retired from the
      face of the earth, and it would not be wonderful to meet a Megalosaurus,
      forty feet long or so, waddling like an elephantine lizard up Holborn
      Hill.
    </p>
  </div>
</section>
```

```css
.example-container {
  border: 0.75em solid #ad1457;
  padding: 0.75em;
  text-align: left;
  position: relative;
  width: 100%;
  min-height: 200px;
}

#example-element {
  background-color: #07136c;
  border: 6px solid #ffa000;
  color: white;
  position: absolute;
  inset: 0;
}
```

## Constituent properties

This property is a shorthand for the following CSS properties:

- `inset-block-end`
- `inset-block-start`

## Syntax

```css
/* <length> values */
inset-block: 3px 10px;
inset-block: 2.4em 3em;
inset-block: 10px; /* value applied to start and end */
inset-block: auto anchor(start);
inset-block: 10em anchor-size(--my-anchor height, 10%);

/* <percentage>s of the width or height of the containing block */
inset-block: 10% 5%;

/* Keyword value */
inset-block: auto;

/* Global values */
inset-block: inherit;
inset-block: initial;
inset-block: revert;
inset-block: revert-layer;
inset-block: unset;
```

### Values

The `inset-block` property takes the same values as the `top` property.

## Examples

### Setting block start and end offsets

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
  position: relative;
  inset-block: 20px 50px;
  background-color: #c8c800;
}
```

#### Result

## See also

- The mapped physical properties: `top`, `right`, `bottom`, and `left`
- The mapped physical shortcut: `inset`
- The mapped inline shortcut: `inset-inline`
- `writing-mode`, `direction`, `text-orientation`
