---
title: "`inset-inline-start` CSS property"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/properties/inset-inline-start/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `inset-inline-start` CSS property

The **`inset-inline-start`** CSS property defines the logical inline start inset of an element, which maps to a physical offset depending on the element's writing mode, directionality, and text orientation. It corresponds to the `top`, `right`, `bottom`, or `left` property depending on the values defined for `writing-mode`, `direction`, and `text-orientation`.

This inset property has no effect on non-positioned elements.

```css
writing-mode: horizontal-tb;
```

```css
writing-mode: vertical-rl;
```

```css
writing-mode: horizontal-tb;
direction: rtl;
```

```css
writing-mode: vertical-lr;
```

```html
<section id="default-example">
  <div class="example-container" id="example-element">
    <div id="abspos">
      I am absolutely positioned with inset-inline-start: 50px
    </div>
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
#example-element {
  border: 0.75em solid;
  padding: 0.75em;
  position: relative;
  width: 100%;
  min-height: 200px;
  unicode-bidi: bidi-override;
}

#abspos {
  background-color: yellow;
  color: black;
  border: 3px solid red;
  position: absolute;
  inset-inline-start: 50px;
  inline-size: 140px;
  min-block-size: 80px;
}
```

## Syntax

```css
/* <length> values */
inset-inline-start: 3px;
inset-inline-start: 2.4em;
inset-inline-start: calc(anchor(--my-anchor 50%) + 10px);
inset-inline-start: anchor-size(width);

/* <percentage>s of the width or height of the containing block */
inset-inline-start: 10%;

/* Keyword value */
inset-inline-start: auto;

/* Global values */
inset-inline-start: inherit;
inset-inline-start: initial;
inset-inline-start: revert;
inset-inline-start: revert-layer;
inset-inline-start: unset;
```

The shorthand for `inset-inline-start` and `inset-inline-end` is `inset-inline`.

### Values

The `inset-inline-start` property takes the same values as the `top` property.

## Examples

### Setting inline start offset

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
  inset-inline-start: 20px;
  background-color: #c8c800;
}
```

#### Result

## See also

- The properties which defines other insets: `inset-block-start`, `inset-block-end`, and `inset-inline-end`
- The mapped physical properties: `top`, `right`, `bottom`, and `left`
- `writing-mode`, `direction`, `text-orientation`
