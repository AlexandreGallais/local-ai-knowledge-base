---
title: "CSS containment"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/guides/containment/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# CSS containment

The **CSS containment** module defines containment and container queries.

Containment enables the isolation of page subtrees from the rest of the DOM. The browser can then improve performance by optimizing the rendering of these independent parts.

Container queries are similar to dimension media queries, except that the queries are based on the dimensions of a specific container element defined as a containment context, rather than on the dimensions of the viewport. Container queries enable querying a container's size, properties, property values, or even just its assigned `container-name` to conditionally apply CSS styles. When applying these conditional styles, you can use container query length units, which specify lengths relative to the dimensions of the query container. Additional properties are defined to enable establishing a specific element as a query container and giving it a specific name.

## Reference

### Properties

- `contain`
- `content-visibility`

### Events

- `contentvisibilityautostatechange`

### Interfaces

- `ContentVisibilityAutoStateChangeEvent`
  - `skipped` property
- `CSSContainerRule`
  - `CSSContainerRule.containerName`
  - `CSSContainerRule.containerQuery`

## Guides

- CSS container queries
    A guide to using container queries with `@container`, including naming containment contexts.

- Using CSS containment
    Describes the basic aims of CSS containment and how to leverage `contain` and `content-visibility` for a better user experience.

- Using container size and style queries
    A guide to writing container size and style queries with `@container`, including style queries for custom properties, query syntax and names, and nesting container queries.

## Related concepts

- Layout and the containing block
- Block formatting context

- CSS conditional rules module
  - `@container` at-rule
  - `container` property
  - `container-name` property
  - `container-type` property

- CSS media queries module
  - `@media` at-rule
  - CSS logical operators (`not`, `or`, and `and`)

- CSS transitions module
  - `@starting-style` at-rule
  - `transition-behavior` property

- CSS box sizing module
  - `aspect-ratio` property
  - `contain-intrinsic-size` shorthand property
  - `contain-intrinsic-inline-size` property
  - `contain-intrinsic-block-size` property
  - `contain-intrinsic-width` property
  - `contain-intrinsic-height` property

- CSS counter styles module
  - Using CSS counters guide

- CSS nesting module
  - CSS nesting at-rules guide

## See also

- Using feature queries
- Using CSS media queries
- Understanding aspect ratios
- `@supports` at-rule
