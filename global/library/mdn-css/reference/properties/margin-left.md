---
title: "`margin-left` CSS property"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/properties/margin-left/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `margin-left` CSS property

The **`margin-left`** CSS property sets the margin area on the left side of an element. A positive value places it farther from its neighbors, while a negative value places it closer.

```css
margin-left: 1em;
```

```css
margin-left: 10%;
```

```css
margin-left: 10px;
```

```css
margin-left: 0;
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

The vertical margins of two adjacent boxes may fuse. This is called _margin collapsing_.

In the rare cases where width is overconstrained (i.e., when all of `width`, `margin-left`, `border`, `padding`, the content area, and `margin-right` are defined), `margin-left` is ignored, and will have the same calculated value as if the `auto` value was specified.

## Syntax

```css
/* <length> values */
margin-left: 10px; /* An absolute length */
margin-left: 1em; /* relative to the text size */
margin-left: 5%; /* relative to the nearest block container's width */
margin-left: anchor-size(self-inline);
margin-left: calc(anchor-size(--my-anchor width, 20px) / 4);

/* Keyword value */
margin-left: auto;

/* Global values */
margin-left: inherit;
margin-left: initial;
margin-left: revert;
margin-left: revert-layer;
margin-left: unset;
```

The `margin-left` property is specified as the keyword `auto`, or a `<length>`, or a `<percentage>`. Its value can be positive, zero, or negative.

### Values

- `<length>`
    The size of the margin as a fixed value.
    - For _anchor-positioned elements_, the `anchor-size()` function resolves to a `<length>` value relative to the associated _anchor element_'s width or height (see Setting element margin based on anchor size).

- `<percentage>`
    The size of the margin as a percentage, relative to the inline size (_width_ in a horizontal language, defined by `writing-mode`) of the containing block.
- `auto`
    The left margin receives a share of the unused horizontal space, as determined mainly by the layout mode that is used. If the values of `margin-left` and `margin-right` are both `auto`, the calculated space is evenly distributed. This table summarizes the different cases:

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

### Setting margin-left as a percentage

Percentage values for `margin-left` are relative to the container's inline size.

#### HTML

```html
<p>
  A large rose-tree stood near the entrance of the garden: the roses growing on
  it were white, but there were three gardeners at it, busily painting them red.
</p>
<p class="example">
  Alice thought this a very curious thing, and she went nearer to watch them,
  and just as she came up to them she heard one of them say, "Look out now,
  Five! Don't go splashing paint over me like that!"
</p>
<p>
  "I couldn't help it," said Five, in a sulky tone; "Seven jogged my elbow."
</p>
```

#### CSS

```css
.example {
  margin-left: 50%;
}
```

#### Result

## See also

- `margin-top`, `margin-right`, and `margin-bottom`
- `margin` shorthand
- `margin-block-start`, `margin-block-end`, `margin-inline-start`, and `margin-inline-end`
- `margin-block` and `margin-inline` shorthands
- CSS box model module
