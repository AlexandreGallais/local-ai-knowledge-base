---
title: "`column-height` CSS property (part 1 of 3)"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/properties/column-height/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `column-height` CSS property

The **`column-height`** CSS property specifies the height of the columns in a CSS multi-column layout.

## Syntax

```css
/* Keyword value */
column-height: auto;

/* <length> value */
column-height: 300px;
column-height: 25em;
column-height: 70vh;

/* Global values */
column-height: inherit;
column-height: initial;
column-height: revert;
column-height: revert-layer;
column-height: unset;
```

### Values

This property is specified as a single value from the following list:

- `auto`
    The initial value. If the content container has a set height, the content columns will grow to that height, overflowing to the side if the content doesn't fit inside the container. If the content container does not have a set height, the content will be equally distributed between the columns generated inside the container.
- `<length>`
    The height of the columns. Must be non-negative.

## Description

The `column-height` property sets the height of the columns in a multi-column layout. This is useful for constraining the column height for readability when setting multiple columns using the `column-count` or `column-width` property.

Without `column-height`, if the height of the multi-col content exceeds the viewport height, readers will need to scroll down to the end of a column and then back up to the top of the next column. One possible fix would be to set a fixed height on the content container, however, excess columns will then overflow to the side, and readers will have to scroll in the inline direction to read all the content.

The `column-height` property, along with `column-wrap`, allows you to set a specific height for the columns and wrap them onto a new row of columns when the container edge is reached.

The default value of `column-wrap` is `auto`, which resolves to `wrap` when `column-height` is set to a `<length>` value; `wrap` allows the fixed-height columns to wrap onto multiple rows. When `column-height` is equal to `auto`, `column-wrap: auto` resolves to `nowrap`, allowing the columns to overflow horizontally if a fixed container height is set. As a result of this default behavior, generally you don't need to explicitly set the `column-wrap` property.

The `column-height` property, along with the `column-count` and `column-width` properties, can also be set by using the `columns` shorthand.
