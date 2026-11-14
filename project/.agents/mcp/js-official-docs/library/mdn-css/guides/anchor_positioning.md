---
title: "CSS anchor positioning"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/guides/anchor_positioning/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# CSS anchor positioning

The **CSS anchor positioning** module defines features that allow you to tether elements together. Certain elements are defined as **anchor elements**; **anchor-positioned elements** can then have their size and position set based on the size and location of the anchor elements to which they are bound.

In addition, the specification provides CSS-only mechanisms to:

- Specify a set of alternative positions for an anchored element; when the default rendering position causes it to overflow its containing block and/or be rendered offscreen, the browser will try rendering the anchored element in the alternative positions instead.
- Declare conditions under which anchor-positioned elements should be hidden, in situations where it is not appropriate to tether them to anchor elements.

## Reference

### Properties

- `anchor-scope`
- `anchor-name`
- `position-anchor`
- `position-area`
- `position-try-fallbacks`
- `position-try-order`
- `position-try` shorthand
- `position-visibility`

### At-rules and descriptors

- `@position-try`

### Functions

- `anchor()`
- `anchor-size()`

### Data types and values

- `anchor-center`
- `<anchor-side>`
- `<anchor-size>`
- `<position-area>`
- `<try-size>`
- `<try-tactic>`

### HTML attributes

- `anchor` (non-standard)

### Interfaces

- `CSSPositionTryDescriptors`
- `CSSPositionTryRule`
- `HTMLElement.anchorElement` (non-standard)

## Guides

- Using CSS anchor positioning
    An introductory guide to fundamental anchor positioning concepts, including associating, positioning, and sizing elements relative to their anchor.

- Fallback options and conditional hiding for overflow
    A guide to the mechanisms CSS anchor positioning provides to prevent anchor-positioned elements from overflowing their containing elements or the viewport, including position try fallback options and conditionally hiding elements.

- Using anchored container queries
    Explains how to use anchored container queries to conditionally apply styles to anchor-positioned elements depending on what position try fallback options are active on them.

## Related concepts

- CSS logical properties and values module:
  - `inset-block-start`
  - `inset-block-end`
  - `inset-inline-start`
  - `inset-inline-end`
  - `inset-block`
  - `inset-inline`
  - `inset` shorthand
  - `inline-size`
  - `min-block-size`
  - `min-inline-size`
  - `block-size`
  - `max-block-size`
  - `max-inline-size`
  - `margin-block`
  - `margin-block-end`
  - `margin-block-start`
  - `margin-inline`
  - `margin-inline-end`
  - `margin-inline-start`
  - Inset properties glossary term
- CSS positioned layout module:
  - `top`
  - `left`
  - `bottom`
  - `right`
- CSS box model module:
  - `width`
  - `height`
  - `min-width`
  - `min-height`
  - `max-width`
  - `max-height`
  - `margin`
  - `margin-bottom`
  - `margin-left`
  - `margin-right`
  - `margin-top`
- CSS box alignment module:
  - `align-items`
  - `align-self`
  - `justify-items`
  - `justify-self`
  - `place-items`
  - `place-self`

## See also

- CSS scroll anchoring module
- Learn: CSS positioning
- CSS logical properties and values module
- Learn: Sizing items in CSS
