---
title: "CSS lists and counters"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/guides/lists/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# CSS lists and counters

The **CSS lists and counters** module enables styling and positioning of list item bullets and manipulating their values with a combination of strings, counters, and other features.

A list item's marker, whether a bullet symbol or ordinal counter, is its defining feature. List items are not limited to `` elements nested within `` or `` elements. Rather, list items are any element with `display: list-item` set.

This module defines CSS features to set and reset a list's counters, set which counter-styles or symbols to use as its markers, and position those markers. It also provides developers with the ability to create customized markers.

## Reference

### Properties

- `counter-increment`
- `counter-reset`
- `counter-set`
- `list-style-image`
- `list-style-type`
- `list-style-position`
- `list-style` shorthand

There is also a `marker-side` property, which is yet to be fully defined or implemented.

### Pseudo-elements

- `::marker`

### Functions

- `counter`
- `counters`

### Data types

- `<counter>`
- `<counter-name>`
- `<counter-style>`

## Guides

- Consistent list indentation
    Explains how to achieve consistent list indentation across different browsers.

- Using CSS Counters
    Explains how to use the CSS counter properties to control list counters.

## Related concepts

- CSS counter styles
  - `@counter-style` at-rule
  - `<counter-style-name>` data type
  - `<symbol>` data type
  - `symbols()` function

- `` `start`, `reversed`, and `type` attributes
- `` `type` attribute
- `` `type` and `value` attributes

## See also

- CSS counter styles module
- CSS pseudo-elements module
- CSS generated content module
