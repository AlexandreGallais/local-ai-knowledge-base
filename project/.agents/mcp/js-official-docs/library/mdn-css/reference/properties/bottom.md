---
title: "`bottom` CSS property"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/properties/bottom/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `bottom` CSS property

The **`bottom`** CSS property participates in setting the vertical position of a positioned element. This inset property has no effect on non-positioned elements.

```css
bottom: 0;
```

```css
bottom: 4em;
```

```css
bottom: 10%;
```

```css
bottom: 20px;
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

## Syntax

```css
/* <length> values */
bottom: 3px;
bottom: 2.4em;
bottom: calc(anchor(--my-anchor 50%) + 5px);
bottom: anchor-size(width);

/* <percentage>s of the height of the containing block */
bottom: 10%;

/* Keyword value */
bottom: auto;

/* Global values */
bottom: inherit;
bottom: initial;
bottom: revert;
bottom: revert-layer;
bottom: unset;
```

### Values

- `<length>`
    A negative, null, or positive `<length>`:
    - for _absolutely positioned elements_, it represents the distance to the bottom edge of the containing block.
    - for _relatively positioned elements_, it represents the distance that the element is moved above its normal position.
    - for _anchor-positioned elements_, the `anchor()` function resolves to a `<length>` value relative to the position of the associated _anchor element_'s top or bottom edge (see Using inset properties with `anchor()` function values), and the `anchor-size()` function resolves to a `<length>` value relative to the associated anchor element's width or height (see Setting element position based on anchor size).

- `<percentage>`
    A `<percentage>` of the containing block's height.
- `auto`
    Specifies that:
    - for _absolutely positioned elements_, the position of the element is based on the `top` property, while `height: auto` is treated as a height based on the content; or if `top` is also `auto`, the element is positioned where it should vertically be positioned if it were a static element.
    - for _relatively positioned elements_, the distance of the element from its normal position is based on the `top` property; or if `top` is also `auto`, the element is not moved vertically at all.

## Description

The effect of `bottom` depends on how the element is positioned (i.e., the value of the `position` property):

- When `position` is set to `absolute` or `fixed`, the `bottom` property specifies the distance between the outer edge of the element's bottom margin and the outer edge of the containing block's bottom padding, or, in the case of anchor positioned elements when the `anchor()` function is used within the value, relative to the position of the specified `<anchor-side>` edge. The `bottom` property is compatible with the `top`, `bottom`, `start`, `end`, `self-start`, `self-end`, `center`, and `<percentage>` values.
- When `position` is set to `relative`, the `bottom` property specifies the distance the element's bottom edge is moved above its normal position.
- When `position` is set to `sticky`, the `bottom` property is used to compute the sticky-constraint rectangle.
- When `position` is set to `static`, the `bottom` property has _no effect_.

When both `top` and `bottom` are specified, `position` is set to `absolute` or `fixed`, _and_ `height` is unspecified (either `auto` or `100%`) both the `top` and `bottom` distances are respected. In all other situations, if `height` is constrained in any way or `position` is set to `relative`, the `top` property takes precedence and the `bottom` property is ignored.

## Examples

### Absolute and fixed positioning

This example demonstrates the difference in behavior of the `bottom` property, when `position` is `absolute` versus `fixed`.

#### HTML

```html
<p>
  This<br />is<br />some<br />tall,<br />tall,<br />tall,<br />tall,<br />tall<br />content.
</p>
<div class="fixed"><p>Fixed</p></div>
<div class="absolute"><p>Absolute</p></div>
```

#### CSS

```css
p {
  font-size: 30px;
  line-height: 2em;
}

div {
  width: 48%;
  text-align: center;
  background: rgb(55 55 55 / 20%);
  border: 1px solid blue;
}

.absolute {
  position: absolute;
  bottom: 0;
  left: 0;
}

.fixed {
  position: fixed;
  bottom: 0;
  right: 0;
}
```

#### Result

## See also

- `top`, `left`, and `right`
- `inset` shorthand
- `inset-block-start`, `inset-block-end`, `inset-inline-start`, and `inset-inline-end`
- `inset-block` and `inset-inline` shorthands
- `position`
- CSS positioned layout module
