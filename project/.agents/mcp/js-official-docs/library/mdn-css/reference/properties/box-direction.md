---
title: "`box-direction` CSS property"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/properties/box-direction/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `box-direction` CSS property

> **Warning:**
> This is a property of the original CSS flexible box layout Module draft, and has been replaced by a newer standard. The `-moz-box-direction` will only be used for XUL while the previous standard `box-direction` has been replaced by `flex-direction`. See flexbox for information about the current standard.

The **`box-direction`** CSS property specifies whether a box lays out its contents normally (from the top or left edge), or in reverse (from the bottom or right edge).

## Syntax

```css
/* Keyword values */
box-direction: normal;
box-direction: reverse;

/* Global values */
box-direction: inherit;
box-direction: initial;
box-direction: revert;
box-direction: revert-layer;
box-direction: unset;
```

### Values

This property is specified as one of the following keyword values:

- `normal`
    The box lays out its contents from the start (the left or top edge).
- `reverse`
    The box lays out its contents from the end (the right or bottom edge).

## Notes

The edge of the box designated the _start_ for layout purposes depends on the box's orientation:

- For horizontal elements, the _start_ is the top edge.
- For vertical elements, the _start_ is the left edge.

The edge opposite to the start is designated the _end_.

If the direction is set using the element's `dir` attribute, then the style is ignored.

## Examples

### Setting box direction

```css
.example {
  /* bottom-to-top layout */
  -moz-box-direction: reverse; /* Mozilla */
  -webkit-box-direction: reverse; /* WebKit */
  box-direction: reverse; /* As specified */
}
```

## Specifications

Not part of any standard.

## See also

- `box-orient`
- `box-pack`
- `box-align`
- `flex-direction`
