---
title: "`inset` CSS property"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/properties/inset/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `inset` CSS property

The **`inset`** CSS shorthand property corresponds to the `top`, `right`, `bottom`, and/or `left` properties. It has the same multi-value syntax of the `margin` shorthand.

This inset properties, including `inset`, have no effect on non-positioned elements.

While part of the CSS logical properties and values module, it does not define _logical_ offsets. It defines _physical_ offsets, regardless of the element's writing mode, directionality, and text orientation.

```css
inset: 1em;
```

```css
inset: 5% 0;
```

```css
inset: 2em 50px 20px;
```

```css
inset: 10px 30% 20px 0;
```

```css
inset: 0;
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

- `top`
- `right`
- `bottom`
- `left`

## Syntax

```css
/* <length> values */
inset: 10px; /* value applied to all edges */
inset: 4px 8px; /* top/bottom left/right */
inset: 5px 15px 10px; /* top left/right bottom */
inset: 2.4em 3em 3em 3em; /* top right bottom left */
inset: calc(anchor(50%) + 10px) anchor(self-start) auto auto;
inset: anchor-size(block) calc(anchor(50%) + 10px) auto
  calc(anchor-size(width) / 4);

/* <percentage>s of the width (left/right) or height (top/bottom) of the containing block */
inset: 10% 5% 5% 5%;

/* Keyword value */
inset: auto;

/* Global values */
inset: inherit;
inset: initial;
inset: revert;
inset: revert-layer;
inset: unset;
```

### Values

The `inset` property takes the same values as the `top` property.

## Examples

### Setting offsets for an element

#### HTML

```html
<div>
  <span class="exampleText">Example text</span>
</div>
```

#### CSS

```css
div {
  background-color: yellow;
  width: 150px;
  height: 120px;
  position: relative;
}

.exampleText {
  writing-mode: sideways-rl;
  position: absolute;
  inset: 20px 40px 30px 10px;
  background-color: #c8c800;
}
```

#### Result

## See also

- `top`, `right`, `bottom`, and `left`
- `inset-block` and `inset-inline`
- `position`
- CSS positioned layout module
- CSS logical properties and values
