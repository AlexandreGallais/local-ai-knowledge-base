---
title: "`min-width` CSS property"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/properties/min-width/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `min-width` CSS property

The **`min-width`** CSS property sets the minimum width of an element. It prevents the used value of the `width` property from becoming smaller than the value specified for `min-width`.

The element's width is set to the value of `min-width` whenever `min-width` is larger than `max-width` or `width`.

```css
min-width: 150px;
```

```css
min-width: 20em;
```

```css
min-width: 75%;
```

```css
min-width: 40ch;
```

```html
<section class="default-example" id="default-example">
  <div class="transition-all" id="example-element">
    Change the minimum width.
  </div>
</section>
```

```css
#example-element {
  display: flex;
  flex-direction: column;
  background-color: #5b6dcd;
  height: 80%;
  justify-content: center;
  color: white;
}
```

## Syntax

```css
/* <length> value */
min-width: 3.5em;
min-width: anchor-size(width);
min-width: anchor-size(--my-anchor self-inline, 200%);

/* <percentage> value */
min-width: 10%;

/* Keyword values */
min-width: max-content;
min-width: min-content;
min-width: fit-content;
min-width: fit-content(20em);
min-width: stretch;

/* Global values */
min-width: inherit;
min-width: initial;
min-width: revert;
min-width: revert-layer;
min-width: unset;
```

### Values

- `<length>`
    Defines the `min-width` as an absolute value.
- `<percentage>`
    Defines the `min-width` as a percentage of the containing block's width.
- `auto`
    The default value. The source of the automatic value for the specified element depends on its display value. For block boxes, inline boxes, inline blocks, and all table layout boxes `auto` resolves to `0`.

    For flex items and grid items, the minimum width value is either the specified suggested size, such as the value of the `width` property, the transferred size, calculated if the element has an `aspect-ratio` set and the height is a definite size, otherwise, the `min-content` size is used. If the flex or grid item is a scroll container, or if a grid item spans more than one flexible column track, the automatic minimum size is `0`.

- `max-content`
    The intrinsic preferred `min-width`.
- `min-content`
    The intrinsic minimum `min-width`.
- `fit-content`
    Use the available space, but not more than `max-content`, i.e., `min(max-content, max(min-content, stretch))`.
- `fit-content(<length-percentage>)`
    Uses the `fit-content` formula with the available space replaced by the specified argument, i.e., `min(max-content, max(min-content, argument))`.
- `stretch`
    Limits the minimum width of the element's margin box to the width of its containing block. It attempts to make the margin box fill the available space in the containing block, so in a way behaving similar to `100%` but applying the resulting size to the margin box rather than the box determined by box-sizing.

    > **Note:**
    > To check aliases used by browsers for the `stretch` value and its implementation status, see the Browser compatibility section.

## Examples

### Setting minimum element width

```css
table {
  min-width: 75%;
}

form {
  min-width: 0;
}
```

## See also

- `max-width`
- `width`
- `min-inline-size`
- `min-block-size`
- `box-sizing`
- Introduction to the CSS box model guide
- CSS box model module
