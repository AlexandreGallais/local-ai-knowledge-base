---
title: "`<position>` CSS type"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/values/position_value/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `<position>` CSS type

The **`<position>`** CSS data type denotes a two-dimensional coordinate used to set a location relative to an element box. It is used in the `background-position`, `object-position`, `mask-position` `offset-position`, `offset-anchor` and `transform-origin` properties.

> **Note:**
> The final position described by the `<position>` value does not need to be inside the element's box.

## Syntax

The `<position>` data type is specified with one or two keywords, with optional offsets.

The keyword values are `center`, `top`, `right`, `bottom`, and `left`. Each keyword represents either an edge of the element's box or the center line between two edges. Depending on the context, `center` represents either the center between the left and right edges, or the center between the top and bottom edges.

If specified, an offset can be either a relative `<percentage>` value or an absolute `<length>` value. Positive values are offset towards the right or the bottom, whichever is appropriate. Negative values are offset in the opposite directions.

If only a single offset value is specified, it defines the x-coordinate, with the value for the other axis defaulting to `center`.

```css
/* 1-value syntax */
keyword                  /* Either the horizontal or vertical position; the other axis defaults to center */
value                    /* The position on the x-axis; the y-axis defaults to 50% */

/* 2-value syntax */
keyword keyword          /* A keyword for each direction (the order is irrelevant) */
keyword value            /* A keyword for horizontal position, value for vertical position */
value keyword            /* A value for horizontal position, keyword for vertical position */
value value              /* A value for each direction (horizontal then vertical) */

/* 4-value syntax */
keyword value keyword value /* Each value is an offset from the keyword that precedes it */
```

> **Note:**
> The `background-position` property also accepts a three-value syntax. This is not allowed in other properties that use `<position>`.

## Interpolation

When animated, a point's abscissa and ordinate values are interpolated independently. However, because the speed of the interpolation is determined by a single easing function for both coordinates, the point will move in a straight line.

## Examples

### Valid positions

```plain
center
left
center top

right 8.5%
bottom 12vmin right -6px

10% 20%
8rem 14px
```

### Invalid positions

```plain
left right
bottom top
10px 15px 20px 15px
```

## See also

- CSS values and units module
- Learn: CSS Values and units
- `background-position`
- `radial-gradient()`
- `conic-gradient()`
