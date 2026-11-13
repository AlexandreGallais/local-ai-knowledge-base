---
title: "CSS shadow parts"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/guides/shadow_parts/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# CSS shadow parts

The **CSS shadow parts** module defines the `::part()` pseudo-element that can be set on a shadow host. Using this pseudo-element, you can enable shadow hosts to expose the selected element in the shadow tree to the outside page for styling purposes.

By default, elements in a shadow tree can be styled only within their respective shadow roots. The CSS shadow parts module enables including a `part` attribute on `<template>` descendants that make up the custom element, exposing the shadow tree node to external styling via the `::part()` pseudo-element.

## Reference

### Selectors

- `::part()`

### HTML attributes

- `part`
- `exportparts`

### Definitions

- Shadow tree

## Guides

- CSS pseudo-elements
    Alphabetical list of pseudo-elements defined by all the CSS specifications and WebVTT

- Web components
    Overview of the different APIs that enable creating reusable custom elements or web components.

## Related concepts

- HTML `<template>` element
- HTML `<slot>` element
- `Element.part` property
- `Element.shadowRoot` property
- `Element.attachShadow()` method
- `ShadowRoot` interface
- CSS scoping module
  - `:host`
  - `:host()`
  - `:host-context()`
  - `::slotted`

## See also

- CSS pseudo elements module
- CSS selectors module
- Using shadow DOM
- Templates: Styling outside of the current scope on web.dev (2023)
