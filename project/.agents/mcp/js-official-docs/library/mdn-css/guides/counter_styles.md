---
title: "CSS counter styles"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/guides/counter_styles/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# CSS counter styles

The **CSS counter styles** module lets you define your own counter styles to manage the appearance of markers in lists and counters in generated content. It also enables you to extend native browser list styles with your own customizations.

While we think of counters as numbers, they are actually strings with components that can be incremented. The counter styles module defines the `@counter-style` rule with ten descriptors, which enable developers to precisely define how counters are converted into strings. This module enables defining which characters to use for the counter bullets, the prefix to put before the counter and postfix that comes after, along with how to handle negative values. The descriptors can also set a range to limit the values a counter style can handle, while also providing fallback styles for when the counter value falls outside the defined range or otherwise can't render the counter value. The module also enables defining how the counter is read out loud by speech synthesizers.

## Reference

### Properties

No properties are defined in this module

### Functions

- `symbols()`

### Data types

- `<counter-style-name>`
- `<symbol>`
- `<symbols-type>`

### At-rules and descriptors

- `@counter-style`
  - `system`
  - `symbols`
  - `additive-symbols`
  - `negative`
  - `prefix`
  - `suffix`
  - `range`
  - `pad`
  - `speak-as`
  - `fallback`

### Interfaces

- `CSSCounterStyleRule` interface

## Guides

- Using CSS counters
    Describes how to use counters to number any HTML element or to perform complex counting.

## Related concepts

CSS lists and counters module:

- `counter-increment` property
- `counter-reset` property
- `counter-set` property
- `list-style-type` property
- `list-style` shorthand property
- `counter()` function
- `counters()` function

CSS pseudo-elements module:

- `::after` pseudo-element
- `::before` pseudo-element
- `::marker` pseudo-element

CSS generated content module:

- `content` property

## See also

- CSS lists and counters module
- CSS pseudo-elements module
- CSS generated content module
- Ready-made counter styles via W3C (2023)
