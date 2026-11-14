---
title: "CSS box alignment"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/guides/box_alignment/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# CSS box alignment

The **CSS box alignment** module specifies CSS features relating to the alignment of boxes within their containers. It defines the alignment of the various CSS box layout models including block layout, table layout, flexible box layout (flexbox), and grid layout, creating a consistent alignment method across all of CSS.

The module details alignment terminology, enabling alignment properties to be used in multiple layout modules, rather than limited to a particular layout method.

Alignment is linked to writing modes in that when we align an item we do not consider whether we are aligning it to the physical dimensions of top, right, bottom, and left. Instead, we describe alignment in terms of the start and end of the particular dimension we are working with. This ensures that alignment works in the same way whichever writing mode the document has.

The alignment of text and inline-level content is defined in CSS text module and CSS inline module, respectively.

## Reference

### CSS Properties

- `align-content`
- `align-items`
- `align-self`
- `justify-content`
- `justify-items`
- `justify-self`
- `place-content`
- `place-items`
- `place-self`

### Data types

- `baseline-position`
- `content-distribution`
- `content-position`
- `overflow-position`
- `self-position`

### Terms and definitions

- Alignment container
- Alignment subject
- Baseline alignment
- Distributed alignment
- Fallback alignment
- Positional alignment

## Guides

- Box alignment overview
    Overview of the general concepts found in the CSS box alignment module.

- Box alignment in flexbox
    How box alignment works in the context of flexbox.

- Box alignment in CSS grid layout
    How box alignment works in the context of grid layout.

- Box alignment in multiple-column layout
    How box alignment works in the context of multi-column layout.

- Box alignment for block, absolutely positioned and table layout
    How box alignment works in the context of block layout, including floated, positioned, and table elements.

## Related concepts

- `alignment-baseline`
- `dominant-baseline`
- `scroll-snap-align`
- SVG `dominant-baseline` attribute
- Cross axis
- Main axis

CSS gaps module

- `column-gap`
- `gap`
- `row-gap`

## See also

- Basic <example-value> of flexbox
- Aligning items in a flex container
- Box alignment in grid layout
- CSS display module
- CSS flexible box layout module
- CSS grid layout module
