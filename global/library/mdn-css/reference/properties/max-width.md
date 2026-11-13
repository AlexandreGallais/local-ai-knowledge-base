---
title: "`max-width` CSS property"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/properties/max-width/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `max-width` CSS property

The **`max-width`** CSS property sets the maximum width of an element. It prevents the used value of the `width` property from becoming larger than the value specified by `max-width`.

`max-width` overrides `width`, but `min-width` overrides `max-width`.

```css
max-width: 150px;
```

```css
max-width: 20em;
```

```css
max-width: 75%;
```

```css
max-width: 20ch;
```

```html
<section class="default-example" id="default-example">
  <div class="transition-all" id="example-element">
    Change the maximum width.
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
max-width: 3.5em;
max-width: anchor-size(--my-anchor inline, 245px);
max-width: calc(anchor-size(width) + 4em);

/* <percentage> value */
max-width: 75%;

/* Keyword values */
max-width: none;
max-width: max-content;
max-width: min-content;
max-width: fit-content;
max-width: fit-content(20em);
max-width: stretch;

/* Global values */
max-width: inherit;
max-width: initial;
max-width: revert;
max-width: revert-layer;
max-width: unset;
```

### Values

- `<length>`
    Defines the `max-width` as an absolute value.
- `<percentage>`
    Defines the `max-width` as a percentage of the containing block's width.
- `none`
    No limit on the size of the box.
- `max-content`
    The intrinsic preferred `max-width`.
- `min-content`
    The intrinsic minimum `max-width`.
- `fit-content`
    Use the available space, but not more than max-content, i.e., `min(max-content, max(min-content, stretch))`.
- `fit-content(<length-percentage>)`
    Uses the `fit-content` formula with the available space replaced by the specified argument, i.e., `min(max-content, max(min-content, argument))`.
- `stretch`
    Limits the maximum width of the element's margin box to the width of its containing block. It attempts to make the margin box fill the available space in the containing block, so in a way behaving similar to `100%` but applying the resulting size to the margin box rather than the box determined by box-sizing.

    > **Note:**
    > To check aliases used by browsers for the `stretch` value and its implementation status, see the Browser compatibility section.

## Accessibility

Ensure that elements set with a `max-width` are not truncated and/or do not obscure other content when the page is zoomed to increase text size.

- MDN Understanding WCAG, Guideline 1.4 explanations
- Understanding Success Criterion 1.4.4 | W3C Understanding WCAG 2.0

## Examples

### Setting max width in pixels

In this example, the "child" will be either 150 pixels wide or the width of the "parent," whichever is smaller.

#### HTML

```html
<div id="parent">
  <div id="child">
    Fusce pulvinar vestibulum eros, sed luctus ex lobortis quis.
  </div>
</div>
```

#### CSS

```css
#parent {
  background: lightblue;
  width: 300px;
}

#child {
  background: gold;
  width: 100%;
  max-width: 150px;
}
```

#### Result

## See also

- `min-width`
- `width`
- `max-inline-size`
- `max-block-size`
- `box-sizing`
- Introduction to the CSS box model guide
- CSS box model module
