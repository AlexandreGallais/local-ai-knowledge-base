---
title: "`top` CSS property"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/properties/top/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `top` CSS property

The **`top`** CSS property sets the vertical position of a positioned element. This inset property has no effect on non-positioned elements.

```css
top: 0;
```

```css
top: 4em;
```

```css
top: 10%;
```

```css
top: 20px;
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
  border: 0.75em solid;
  padding: 0.75em;
  text-align: left;
  position: relative;
  width: 100%;
  min-height: 200px;
}

#example-element {
  background-color: #264653;
  border: 4px solid #ffb500;
  color: white;
  position: absolute;
  width: 140px;
  height: 60px;
}
```

The effect of `top` depends on how the element is positioned (i.e., the value of the `position` property):

- When `position` is set to `absolute` or `fixed`, the `top` property specifies the distance between the element's outer margin of the top edge and the inner border of the top edge of its containing block, or, in the case of anchor positioned elements when the `anchor()` function is used within the value, relative to the specified `<anchor-side>` edge. The `top` property is compatible with the `top`, `bottom`, `start`, `end`, `self-start`, `self-end`, `center`, and `<percentage>` values.
- When `position` is set to `relative`, the `top` property specifies the distance the element's top edge is moved below its normal position.
- When `position` is set to `sticky`, the `top` property is used to compute the sticky-constraint rectangle.
- When `position` is set to `static`, the `top` property has _no effect_.

When both `top` and `bottom` values are specified, there are three different cases:

- If `position` is set to `absolute` or `fixed` and `height` is unspecified (either `auto` or `100%`), both the `top` and `bottom` values are respected.
- If `position` is set to `relative` or `height` is constrained, the `top` property takes precedence and the `bottom` property is ignored.
- If `position` is set to `sticky`, both `top` and `bottom` values are considered. This means that a sticky element can potentially move up and down within its containing block based on the values of these two properties as long as the element's position box remains contained within its containing block.

## Syntax

```css
/* <length> values */
top: 3px;
top: 2.4em;
top: anchor(bottom);
top: anchor-size(--my-anchor self-block, 10%);

/* <percentage>s of the height of the containing block */
top: 10%;

/* Keyword value */
top: auto;

/* Global values */
top: inherit;
top: initial;
top: revert;
top: revert-layer;
top: unset;
```

### Values

- `<length>`
    A negative, null, or positive `<length>`:
    - for _absolutely positioned elements_, it represents the distance to the top edge of the containing block.
    - for _anchor-positioned elements_, the `anchor()` function resolves to a `<length>` value relative to the position of the associated _anchor element_'s top or bottom edge (see Using inset properties with `anchor()` function values), and the `anchor-size()` function resolves to a `<length>` value relative to the associated anchor element's width or height (see Setting element position based on anchor size).
    - for _relatively positioned elements_, it represents the distance that the element is moved below its normal position.

- `<percentage>`
    A `<percentage>` of the containing block's height.
- `auto`
    Specifies that:
    - for _absolutely positioned elements_, the position of the element is based on the `bottom` property, while `height: auto` is treated as a height based on the content; or if `bottom` is also `auto`, the element is positioned where it should vertically be positioned if it were a static element.
    - for _relatively positioned elements_, the distance of the element from its normal position is based on the `bottom` property; or if `bottom` is also `auto`, the element is not moved vertically at all.

## Examples

### A positioned element set 10% from the top

```css
body {
  background: beige;
}

div {
  position: absolute;
  top: 10%;
  right: 40%;
  bottom: 20%;
  left: 15%;
  background: gold;
  border: 1px solid blue;
}
```

```html
<div>The size of this content is determined by the position of its edges.</div>
```

## See also

- `bottom`, `left`, and `right`
- `inset` shorthand
- `inset-block-start`, `inset-block-end`, `inset-inline-start`, and `inset-inline-end`
- `inset-block` and `inset-inline` shorthands
- `position`
- CSS positioned layout module
