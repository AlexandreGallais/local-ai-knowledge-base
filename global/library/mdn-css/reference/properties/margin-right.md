---
title: "`margin-right` CSS property"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/properties/margin-right/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `margin-right` CSS property

The **`margin-right`** CSS property sets the margin area on the right side of an element. A positive value places it farther from its neighbors, while a negative value places it closer.

The vertical margins of two adjacent boxes may fuse. This is called _margin collapsing_.

```css
margin-right: 1em;
```

```css
margin-right: 10%;
```

```css
margin-right: 10px;
```

```css
margin-right: 0;
```

```html
<section id="default-example">
  <div id="container">
    <div class="col"></div>
    <div class="col transition-all" id="example-element"></div>
    <div class="col"></div>
  </div>
</section>
```

```css
#container {
  width: 300px;
  height: 200px;
  display: flex;
  align-content: flex-start;
  justify-content: flex-start;
}

.col {
  width: 33.33%;
  border: solid #5b6dcd 10px;
  background-color: rgb(229 232 252 / 0.6);
  flex-shrink: 0;
}

#example-element {
  border: solid 10px #ffc129;
  background-color: rgb(255 244 219 / 0.6);
}
```

## Syntax

```css
/* <length> values */
margin-right: 20px; /* An absolute length */
margin-right: 1em; /* relative to the text size */
margin-right: 5%; /* relative to the nearest block container's width */
margin-right: anchor-size(self-block);
margin-right: calc(anchor-size(--my-anchor height, 20px) / 4);

/* Keyword value */
margin-right: auto;

/* Global values */
margin-right: inherit;
margin-right: initial;
margin-right: revert;
margin-right: revert-layer;
margin-right: unset;
```

The `margin-right` property is specified as the keyword `auto`, or a `<length>`, or a `<percentage>`. Its value can be positive, zero, or negative.

### Values

- `<length>`
    The size of the margin as a fixed value.
    - For _anchor-positioned elements_, the `anchor-size()` function resolves to a `<length>` value relative to the associated _anchor element_'s width or height (see Setting element margin based on anchor size).

- `<percentage>`
    The size of the margin as a percentage, relative to the inline size (_width_ in a horizontal language, defined by `writing-mode`) of the containing block.
- `auto`
    The right margin receives a share of the unused horizontal space, as determined mainly by the layout mode that is used. If the values of `margin-left` and `margin-right` are both `auto`, the calculated space is evenly distributed. This table summarizes the different cases:

           | Value of `display`
           | Value of `float`
           | Value of `position`
           | Computed value of `auto`
           | Comment

           |
            `inline`, `inline-block`,
            `inline-table`

           | any
           | `static` or `relative`
           | `0`
           | Inline layout mode

           |
            `block`, `inline`, `inline-block`,
            `block`, `table`, `inline-table`,
            `list-item`, `table-caption`

           | any
           | `static` or `relative`
           |
            `0`, except if both `margin-left` and
            `margin-right` are set to `auto`. In this case, it
            is set to the value centering the element inside its parent.

           | Block layout mode

           |
            `block`, `inline`, `inline-block`,
            `block`, `table`, `inline-table`,
            `list-item`, `table-caption`

           | `left` or `right`
           | `static` or `relative`
           | `0`
           | Block layout mode (floating element)

           |
            any `table-*`, except `table-caption`

           | any
           | any
           | `0`
           |
            Internal `table-*` elements don't have margins, use
            `border-spacing` instead

           |
            any, except `flex`, <code>inline-flex</code
            >, or `table-*`

           | any
           |
            `fixed` or `absolute`

           |
            `0`, except if both `margin-left` and
            `margin-right` are set to `auto`. In this case, it
            is set to the value centering the border area inside the available
            `width`, if fixed.

           | Absolutely positioned layout mode

           | `flex`, `inline-flex`
           | any
           | any
           |
            `0`, except if there is any positive horizontal free space.
            In this case, it is evenly distributed to all horizontal
            `auto` margins.

           | Flexbox layout mode

## Examples

### Setting right margin using pixels and percentages

```css
.content {
  margin-right: 5%;
}
.side-box {
  margin-right: 10px;
}
.logo {
  margin-right: -5px;
}
```

## See also

- `margin-top`, `margin-bottom`, and `margin-left`
- `margin` shorthand
- `margin-block-start`, `margin-block-end`, `margin-inline-start`, and `margin-inline-end`
- `margin-block` and `margin-inline` shorthands
- CSS box model module
