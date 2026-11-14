---
title: "CSS view transitions"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/guides/view_transitions/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# CSS view transitions

The **CSS view transitions** module defines the behavior of the View Transition API, which allows developers to create animated transitions between different states within a document and across documents. This module also defines the CSS properties and pseudo-elements for styling these transitions.

## Reference

### Properties

- `view-transition-class`
- `view-transition-name`
- `view-transition-scope`

### At-rules and descriptors

- `@view-transition`
  - `navigation` descriptor

### Selectors and pseudo-elements

- `:active-view-transition`
- `:active-view-transition-type()`
- `::view-transition`
- `::view-transition-image-pair()`
- `::view-transition-group()`
- `::view-transition-new()`
- `::view-transition-old()`

### Interfaces

- `CSSViewTransitionRule`
- `ViewTransition`
  - `ViewTransition.skipTransition()` method
  - `ViewTransition.updateCallbackDone`
  - `ViewTransition.ready`
  - `ViewTransition.finished`
  - `ViewTransition.transitionRoot`
- `Document.startViewTransition()` method
- `Document.activeViewTransition`
- `Element.startViewTransition()` method
- `Element.activeViewTransition`

## Guides

- Using the View Transition API
    Explains how to create view transitions and customize transition animations, including manipulating active view transitions.
- Using view transition types
    Shows how to use types along with same-document view transitions and cross-document view transitions.
- Using element-scoped view transitions
    Covers how element-scoped view transitions work, and how to use them.

## Related concepts

- `pagereveal` event
- `pageswap` event
- `Document.visibilityState`

- CSS animations module
  - `animation`
  - `@keyframes`
  - `CSSKeyframesRule`
  - `CSSStyleRule`
  - Web animations API

- CSS transforms module
  - `transform`
  - `transform-function`

## See also

- Pseudo-elements
- Functional pseudo-classes
- Learn: Pseudo-classes and pseudo-elements
