---
title: "CSS fragmentation"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/guides/fragmentation/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# CSS fragmentation

The **CSS fragmentation** module defines how content is displayed when it is broken (fragmented) and flows across multiple pages, regions, or columns. This module defines features for pagination, breaking variable fragment size and orientation, widows and orphans.

This module explains how content breaks across fragmentation containers and how such breaks can be controlled by the author. The generic term for breaking content across containers is _fragmentation_. Fragmentation occurs when an inline box wraps onto multiple lines. This can happen when using layout features such as CSS multi-column layout: For example, when a block spans more than one column inside a column layout container, or spans a page break when printed. Each piece of the rendering for the element is called a _fragment_.

When content is physically printed or displayed as a print preview, there are page breaks. In this paged media, as opposed to continuous media, document content can be split between one or more pages, or fragments. To avoid awkward breaks, such as halfway through a line of text or with a lone word on its own page, browsers can move content that would otherwise fall across the page break in a process is called _pagination_.

## Reference

### Properties

- `box-decoration-break`
- `break-after`
- `break-before`
- `break-inside`
- `orphans`
- `widows`

### Glossary terms

- Fragmentainer

## Guides

- Handling content breaks in multi-column layout
    Introduction to the fragmentation specification and how to control where column content breaks.

## Related concepts

- `overflow`
- `height`, `max-height`, and `block-size` CSS properties
- `width`, `max-width`, and `inline-size` CSS properties
- Block formatting context

CSS paged media module

- `page`
- `@page`

CSS display module

- Principal box term
- Block formatting context guide

## See also

- `horizontal-viewport-segments` and `vertical-viewport-segments` `@media` descriptors
- Viewport Segments API
- CSS multi-column layout module
