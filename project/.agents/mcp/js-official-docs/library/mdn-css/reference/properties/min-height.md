---
title: "`min-height` CSS property"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/properties/min-height/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `min-height` CSS property

The **`min-height`** CSS property sets the minimum height of an element. It prevents the used value of the `height` property from becoming smaller than the value specified for `min-height`.

The element's height is set to the value of `min-height` whenever `min-height` is larger than `max-height` or `height`.

```css
min-height: 150px;
```

```css
min-height: 7em;
```

```css
min-height: 75%;
```

```css
min-height: 10px;
```

```html
<section class="default-example" id="default-example">
  <div class="transition-all" id="example-element">
    This is a box where you can change the minimum height. <br />If there is
    more content than the minimum the box will grow to the height needed by the
    content.
  </div>
</section>
```

```css
#example-element {
  display: flex;
  flex-direction: column;
  background-color: #5b6dcd;
  justify-content: center;
  color: white;
}
```

## Syntax

```css
/* <length> value */
min-height: 3.5em;
min-height: anchor-size(height);
min-height: anchor-size(--my-anchor block, 200px);

/* <percentage> value */
min-height: 10%;

/* Keyword values */
min-height: max-content;
min-height: min-content;
min-height: fit-content;
min-height: fit-content(20em);
min-height: stretch;

/* Global values */
min-height: inherit;
min-height: initial;
min-height: revert;
min-height: revert-layer;
min-height: unset;
```

### Values

- `<length>`
    Defines the `min-height` as an absolute value.
- `<percentage>`
    Defines the `min-height` as a percentage of the containing block's height.
- `auto`
    The browser will calculate and select a `min-height` for the specified element.
- `max-content`
    The intrinsic preferred `min-height`.
- `min-content`
    The intrinsic minimum `min-height`.
- `fit-content`
    Use the available space, but not more than max-content, i.e., `min(max-content, max(min-content, stretch))`.
- `fit-content(<length-percentage>)`
    Uses the `fit-content` formula with the available space replaced by the specified argument, i.e., `min(max-content, max(min-content, argument))`.
- `stretch`
    Limits the minimum height of the element's margin box to the height of its containing block. It attempts to make the margin box fill the available space in the containing block, so in a way behaving similar to `100%` but applying the resulting size to the margin box rather than the box determined by box-sizing.

    > **Note:**
    > To check aliases used by browsers for the `stretch` value and its implementation status, see the Browser compatibility section.

## Examples

### Setting min-height

```css
table {
  min-height: 75%;
}

form {
  min-height: 0;
}
```

## See also

- `max-height`
- `height`
- `min-inline-size`
- `min-block-size`
- `box-sizing`
- Introduction to the CSS box model guide
- CSS box model module
