---
title: "`right` CSS property"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/properties/right/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `right` CSS property

The **`right`** CSS property participates in specifying the horizontal position of a positioned element. This inset property has no effect on non-positioned elements.

```css
right: 0;
```

```css
right: 4em;
```

```css
right: 10%;
```

```css
right: 20px;
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
right: 3px;
right: 2.4em;
right: anchor(--my-anchor 50%);
right: anchor-size(--my-anchor height, 65px);

/* <percentage>s of the width of the containing block */
right: 10%;

/* Keyword value */
right: auto;

/* Global values */
right: inherit;
right: initial;
right: revert;
right: revert-layer;
right: unset;
```

### Values

- `<length>`
    A negative, null, or positive `<length>`:
    - for _absolutely positioned elements_, it represents the distance to the right edge of the containing block.
    - for _anchor-positioned elements_, the `anchor()` function resolves to a `<length>` value relative to the position of the associated _anchor element_'s left or right edge (see Using inset properties with `anchor()` function values), and the `anchor-size()` function resolves to a `<length>` value relative to the associated anchor element's width or height (see Setting element position based on anchor size).
    - for _relatively positioned elements_, it represents the distance that the element is moved to the left of its normal position.

- `<percentage>`
    A `<percentage>` of the containing block's width.
- `auto`
    Specifies that:
    - for _absolutely positioned elements_, the position of the element is based on the `left` property, while `width: auto` is treated as a width based on the content; or if `left` is also `auto`, the element is positioned where it should horizontally be positioned if it were a static element.
    - for _relatively positioned elements_, the distance of the element from its normal position is based on the `left` property; or if `left` is also `auto`, the element is not moved horizontally at all.

## Description

The effect of `right` depends on how the element is positioned (i.e., the value of the `position` property):

- When `position` is set to `absolute` or `fixed`, the `right` property specifies the distance between the element's outer margin of right edge and the inner border of the right edge of its containing block. If the positioned element has an associated _anchor element_, and the property value includes an `anchor()` function, `right` positions the right edge of the positioned element relative to the specified `<anchor-side>` edge. The `right` property is compatible with the `left`, `right`, `start`, `end`, `self-start`, `self-end`, `center`, and `<percentage>` values.
- When `position` is set to `relative`, the `right` property specifies the distance the element's right edge is moved to the left from its normal position.
- When `position` is set to `sticky`, the `right` property is used to compute the sticky-constraint rectangle.
- When `position` is set to `static`, the `right` property has _no effect_.

When both `left` and `right` are defined, if not prevented from doing so by other properties, the element will stretch to satisfy both. If the element cannot stretch to satisfy both — for example, if a `width` is declared — the position of the element is _over-constrained_. When this is the case, the `left` value has precedence when the container is left-to-right; the `right` value has precedence when the container is right-to-left.

## Examples

### Absolute and relative positioning using right

#### HTML

```html
<div id="relative">Relatively positioned</div>
<div id="absolute">Absolutely positioned</div>
```

#### CSS

```css
#relative {
  width: 100px;
  height: 100px;
  background-color: #ffc7e4;
  position: relative;
  top: 20px;
  left: 20px;
}

#absolute {
  width: 100px;
  height: 100px;
  background-color: #ffd7c2;
  position: absolute;
  bottom: 10px;
  right: 20px;
}
```

#### Result

### Declaring both left and right

When both `left` and `right` are declared, the element will stretch to meet both, unless other constraints prevent it from doing so. If the element will not stretch or shrink to meet both. When the position of the element is _overspecified_, the precedence is based on the container's direction: The `left` will take precedence if the container's direction is left-to-right. The `right` will take precedence if the container's direction is right-to-left.

#### HTML

```html
<div id="parent">
  Parent
  <div id="noWidth">No width</div>
  <div id="width">width: 100px</div>
</div>
```

#### CSS

```css
div {
  outline: 1px solid #cccccc;
}
#parent {
  width: 200px;
  height: 200px;
  background-color: #ffc7e4;
  position: relative;
}
/* declare both a left and a right */
#width,
#noWidth {
  background-color: #c2ffd7;
  position: absolute;
  left: 0;
  right: 0;
}
/* declare a width */
#width {
  width: 100px;
  top: 60px;
}
```

#### Result

## See also

- `top`, `bottom`, and `left`
- `inset` shorthand
- `inset-block-start`, `inset-block-end`, `inset-inline-start`, and `inset-inline-end`
- `inset-block` and `inset-inline` shorthands
- `position`
- CSS positioned layout module
