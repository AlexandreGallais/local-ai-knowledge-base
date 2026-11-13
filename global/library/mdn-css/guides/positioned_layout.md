---
title: "CSS positioned layout"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/guides/positioned_layout/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# CSS positioned layout

The **CSS positioned layout** module defines the coordinate-based positioning and offsetting schemes available in CSS and the properties used to position and stack elements on a web page. The module is best known for defining the basic <example-value> methods, including relative positioning, sticky positioning, absolute positioning, and fixed positioning. It also defines how positioned elements are painted and layered, clarifying stacking behavior and visual order.

The positioned layout module defines the physical, logical, and shorthand inset properties. The logical properties enable developing with internationalization and responsiveness in mind.

Like all CSS modules, this module impacts and is impacted by other modules. This module describes how positioning interacts with other layout modules such as CSS flexible box layout and CSS Grid layout. Other modules, such as CSS anchor positioning, build upon this module to enable positioning elements relative to other elements and layers.

## Reference

### Properties

- `bottom`
- `inset`
- `inset-block`
- `inset-block-end`
- `inset-block-start`
- `inset-inline`
- `inset-inline-end`
- `inset-inline-start`
- `left`
- `overlay`
- `position`
- `right`
- `top`

### Selectors

- `::backdrop`

### Glossary terms and definitions

- Block direction
- Containing block
- Flow relative values
- Inline direction
- Inset properties
- Positioning context
- Relative position
- Stacking context
- Static positioning
- Top layer

## Guides

- Understanding z-index
    Presents the notion of stacking context and explains how z-ordering works, with several examples.
- Stacking without the `z-index` property
    The stacking rules that apply when `z-index` is not used.
- Stacking floating elements
    How floating elements are handled with stacking.
- Using `z-index`
    How to use `z-index` to change default stacking.
- Stacking context
    CSS stacking context, the CSS features that create new stacking contexts, and nested stacking contexts.
- Learn: positioning
    The different position values and how to use them.

## Related concepts

- `float`
- `clear`
- `transition-property`
- `transition-behavior`
- Popover API
- `<dialog>` element

- CSS anchor positioning module
  - `position-anchor`
  - `position-area`
  - `position-try-fallbacks`
  - `position-try-order`
  - `position-try` shorthand
  - `position-visibility`

- CSS transforms module
  - `transform`
  - `transform-origin`
  - `translate`

## See also

- Other CSS `*-position` properties:
  - `background-position`
  - `background-position`
  - `background-position`
  - `font-synthesis-position`
  - `font-variant-position`
  - `list-style-position`
  - `mask-position`
  - `object-position`
  - `offset-position`
  - `ruby-position`
  - `text-emphasis-position`
  - `text-underline-position`
- Position-related data types
  - `baseline-position`
  - `content-position`
  - `overflow-position`
  - `self-position`
- CSS Scroll Snap module
  - Snap positions
