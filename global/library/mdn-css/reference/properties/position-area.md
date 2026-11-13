---
title: "`position-area` CSS property (part 1 of 2)"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/properties/position-area/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `position-area` CSS property

The **`position-area`** CSS property enables an anchor-positioned element to be positioned relative to the edges of its associated anchor element by placing the positioned element on one or more tiles of an implicit 3x3 grid, where the anchoring element is the center cell.

`position-area` provides a convenient alternative to tethering and positioning an element relative to its anchor via inset properties and the `anchor()` function. The grid-based concept solves the common use-case of positioning the edges of the positioned element's containing block relative to the edges of its default anchor element.

If an element does not have a default anchor element, or is not an absolutely-positioned element, this property has no effect.

> **Note:**
> This property was originally named and supported in Chromium browsers as `inset-area`, with the same property values. Both property names will be supported for a short while, for backwards compatibility purposes.

## Syntax

```css
/* Default value */
position-area: none;

/* Two <position-area> keywords defining a single specific tile */
position-area: top left;
position-area: start end;
position-area: block-start center;
position-area: inline-start block-end;
position-area: x-start y-end;
position-area: center self-y-end;

/* Two <position-area> keywords spanning two tiles */
position-area: top span-left;
position-area: center span-start;
position-area: inline-start span-block-end;
position-area: y-start span-x-end;

/* Two <position-area> keywords spanning three tiles */
position-area: top span-all;
position-area: block-end span-all;
position-area: self-x-start span-all;

/* One <position-area> keyword with an implicit second <position-area> keyword  */
position-area: top; /* equiv: top span-all */
position-area: inline-start; /* equiv: inline-start span-all */
position-area: center; /* equiv: center center */
position-area: span-all; /* equiv: span-all span-all */
position-area: end; /* equiv: end end */

/* Global values */
position-area: inherit;
position-area: initial;
position-area: revert;
position-area: revert-layer;
position-area: unset;
```

### Values

The property value is two `<position-area>` keyterms, or the keyword `none`. If only one `<position-area>` keyterm is provided, the second keyterm is implied.

- `<position-area>`
    Specifies the area of the position area grid on which to place selected positioned elements.

- `none`
    No position area is set.

## Description

The `position-area` property provides an alternative to the `anchor()` function for positioning elements relative to anchors. `position-area` works on the concept of a 3x3 grid of tiles, called the **position-area grid**, with the anchor element being the center tile:

The grid tiles are broken up into rows and columns:

- The three rows are represented by the physical values `top`, `center`, and `bottom`. They also have logical equivalents such as `block-start`, `center`, and `block-end`, and coordinate equivalents — `y-start`, `center`, and `y-end`.
- The three columns are represented by the physical values `left`, `center`, and `right`. They also have logical equivalents such as `inline-start`, `center`, and `inline-end`, and coordinate equivalents — `x-start`, `center`, and `x-end`.

The dimensions of the center tile are defined by the containing block of the anchor element, while the dimensions of the grid's outer edge are defined by the positioned element's containing block.

The `<position-area>` value is composed of one or two keywords, which define the region of the grid the positioned element should be placed inside. To be exact, the containing block of the positioned element is set to the grid area.

For example:

- You can specify a row value and a column value to place the positioned element in a single, specific grid square — for example, `top left` (logical equivalent `start start`) or `bottom center` (logical equivalent `end center`) will place the positioned element in the top-right or bottom-center square.
- You can specify a row or column value plus a `span-*` value to span two or three cells. The first value specifies the row or column to place the positioned element in, placing it initially in the center, and the other one specifies the other tiles of that row or column to span. For example:
  - `top span-left` causes the positioned element to be placed in the center of the top row, and span across the center and left tiles of that row.
  - `block-end span-inline-end` causes the positioned element to be placed in the center of the block end row, and span across the center and inline end tiles of that row.
  - `bottom span-all` and `y-end span-all` cause the positioned element to be placed in the center of the bottom row, and span across three cells, in this case the left, center, and right tiles of the bottom row.

For detailed information on anchor features, usage, and the `position-area` property, see the CSS anchor positioning module and the Using CSS anchor positioning guide, specifically the section on setting a `position-area`.

### Adjusted default behavior

When a `<position-area>` value is set on a positioned element, some of its properties will have their default behavior adjusted to provide a good default alignment.

#### Self-alignment property `normal` value

The `normal` value of the self-alignment properties, including `align-items`, `align-self`, `justify-items`, and `justify-self`, behaves as either `start`, `end`, or `anchor-center`. Which value a self-alignment property defaults to depends on the positioning of the element:

- If the `position-area` value specifies the center region in an axis, the default alignment in that axis is `anchor-center`.
- Otherwise, the behavior is the opposite of the region specified by the `position-area` property. For example, if the `position-area` value specifies the start region of its axis, the default alignment in that axis is `end`.

For example, if the `writing-mode` is set to `horizontal-tb`, `position-area: top span-x-start` causes the positioned element to be placed in the center of the top row, and span across the center and start tiles of that row. In this case, the self-alignment properties will default to `align-self: end` and `justify-self: anchor-center`.

#### inset properties and values

When an anchor-positioned element is positioned using the `position-area` property, any inset properties set, such as `top` or `inset-inline-end`, specify offsets from the position-area. Some other property values, like `max-block-size: 100%`, will also be relative to the position-area. Any inset properties set or defaulting to `auto` will behave as if their value was set to `0`.

### An aside on positioned element width

If the positioned element does not have a specific size set on it, its size will default to its intrinsic size, but it will also be affected by the size of the position-area grid.

If the positioned element is placed in a single top-center, bottom-center, or center-center cell, its block size will be the same as the anchor's containing block size, growing up, down, or in both directions respectively. The positioned element will align with the specified grid square but adopt the same width as the anchor element. However, it won't allow its content to overflow — its minimum `width` will be its `min-content` (as defined by the width of its longest word).

If the positioned element is placed in any other single grid square (say with `position-area: top left`) or is set to span two or more grid squares (for example using `position-area: bottom span-all`), it will align with the specified grid area but behave as if it has a `width` of `max-content` set on it. It is being sized according to its containing block size, which is the size imposed on it when it was set to `position: fixed`. It will stretch as wide as the text content, although it may also be constrained by the edge of the `<body>`.

### Using `position-area` to position popovers

When using `position-area` to position popovers, be aware that the used value of `auto` inset and `margin` properties resolves to `0` on any element that has a `position-area` value set other than `none`. This means that the default styles for popovers will not conflict with the position you are trying to set via `position-area`.

This is not the case with the `anchor()` function — see Using `anchor()` to position popovers.
