---
title: "`column-wrap` CSS property (part 1 of 2)"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/properties/column-wrap/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `column-wrap` CSS property

The **`column-wrap`** CSS property specifies the wrapping behavior of overflow columns in a CSS multi-column layout.

## Syntax

```css
/* Keyword values */
column-wrap: auto;
column-wrap: nowrap;
column-wrap: wrap;

/* Global values */
column-wrap: inherit;
column-wrap: initial;
column-wrap: revert;
column-wrap: revert-layer;
column-wrap: unset;
```

### Values

This property is specified as one of the following keyword values:

- `auto`
    The initial value. If the content container's `column-height` is set to a `<length>`, `auto` resolves to `wrap`, otherwise it resolves to `nowrap`.
- `nowrap`
    Columns overflow in the inline direction.
- `wrap`
    Overflow columns are placed in a new row in the block direction.

## Description

The `column-wrap` property can be used to set the columns of a CSS multi-column layout to wrap onto a new row when they start to overflow the column width. This is useful for creating more readable layouts when using the `column-count` or `column-width` property to set multiple columns.

Without `column-wrap`, excess columns will overflow to the side, and readers will have to scroll in the inline direction to read all the content. The `column-height` property, along with `column-wrap`, allows you to set a specific height for the columns and wrap them onto a new row of columns when the container edge is reached.

The default value of `column-wrap` is `auto`, which resolves to `wrap` when `column-height` is set to a `<length>` value; `wrap` allows the fixed-height columns to wrap onto multiple rows. When `column-height` is equal to `auto`, `column-wrap: auto` resolves to `nowrap`, allowing the columns to overflow horizontally if a fixed container height is set.

As a result of this default behavior, generally you don't need to explicitly set the `column-wrap` property.
