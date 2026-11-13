---
title: "`max-height` CSS property"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/properties/max-height/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `max-height` CSS property

The **`max-height`** CSS property sets the maximum height of an element. It prevents the used value of the `height` property from becoming larger than the value specified for `max-height`.

`max-height` overrides `height`, but `min-height` overrides `max-height`.

```css
max-height: 150px;
```

```css
max-height: 7em;
```

```css
max-height: 75%;
```

```css
max-height: 10px;
```

```html
<section class="default-example" id="default-example">
  <div class="transition-all" id="example-element">
    This is a box where you can change the maximum height. <br />This will limit
    how tall the box can be, potentially causing an overflow.
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
max-height: 3.5em;
max-height: anchor-size(height);
max-height: calc(anchor-size(--my-anchor self-block, 250px) + 2em);

/* <percentage> value */
max-height: 75%;

/* Keyword values */
max-height: none;
max-height: max-content;
max-height: min-content;
max-height: fit-content;
max-height: fit-content(20em);
max-height: stretch;

/* Global values */
max-height: inherit;
max-height: initial;
max-height: revert;
max-height: revert-layer;
max-height: unset;
```

### Values

- `<length>`
    Defines the `max-height` as an absolute value.
- `<percentage>`
    Defines the `max-height` as a percentage of the containing block's height.
- `none`
    No limit on the size of the box.
- `max-content`
    The intrinsic preferred `max-height`.
- `min-content`
    The intrinsic minimum `max-height`.
- `fit-content`
    Use the available space, but not more than max-content, i.e., `min(max-content, max(min-content, stretch))`.
- `fit-content(<length-percentage>)`
    Uses the `fit-content` formula with the available space replaced by the specified argument, i.e., `min(max-content, max(min-content, argument))`.
- `stretch`
    Limits the maximum height of the element's margin box to the height of its containing block. It attempts to make the margin box fill the available space in the containing block, so in a way behaving similar to `100%` but applying the resulting size to the margin box rather than the box determined by box-sizing.

    > **Note:**
    > To check aliases used by browsers for the `stretch` value and its implementation status, see the Browser compatibility section.

## Accessibility

Ensure that elements set with a `max-height` are not truncated and/or do not obscure other content when the page is zoomed to increase text size.

- MDN Understanding WCAG, Guideline 1.4 explanations
- Understanding Success Criterion 1.4.4 | W3C Understanding WCAG 2.0

## Examples

### Setting max-height using percentage and keyword values

```css
table {
  max-height: 75%;
}

form {
  max-height: none;
}
```

## See also

- `min-height`
- `height`
- `max-inline-size`
- `max-block-size`
- `box-sizing`
- Introduction to the CSS box model guide
- CSS box model module
