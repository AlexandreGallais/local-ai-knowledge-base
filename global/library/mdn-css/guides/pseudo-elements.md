---
title: "CSS pseudo-elements"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/guides/pseudo-elements/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# CSS pseudo-elements

The **CSS pseudo-element** module defines abstract elements that are not directly present in the document tree. These abstract elements, called pseudo-elements, represent portions of the render tree that can be selected and styled. Pseudo-elements are used to create abstractions about the document tree beyond those provided by the document tree.

> **Note:**
> This page introduces a CSS module. To find an exhaustive list of all pseudo-elements defined by CSS specifications, see the pseudo-elements reference page.

Pseudo-elements are prefixed with a double colon (`::`). You add pseudo-elements to selectors (as in `p::first-line`) to target and style these faux elements.

Pseudo-elements enable targeting entities not included in HTML and sections of content that cannot be targeted otherwise without adding extra markup. Consider the placeholder of an `` element. This is an abstract element and not a distinct node in the document tree. You can select this placeholder by using the `::placeholder` pseudo-element. As another example, the `::selection` pseudo-element matches the content currently highlighted by a user, allowing you to style what is matched as the user interacts with the content and changes the selection. Similarly, the `::first-line` pseudo-element targets the first line of an element, updating automatically if the character count of the first line changes, without having to query the element's line length.

## Reference

### Selectors

- `::after`
- `::before`
- `::file-selector-button`
- `::first-letter`
- `::first-line`
- `::grammar-error`
- `::highlight()`
- `::marker`
- `::placeholder`
- `::search-text`
- `::selection`
- `::spelling-error`
- `::target-text`

The specification also defines the `::details-content` pseudo-element and the `::postfix` and `::prefix` sub-pseudo elements. These are not yet supported by any browser. The `::highlight()` pseudo-element is included within this module, but most details are provided in the CSS custom highlight API.

### Interfaces

- `CSSPseudoElement` interface
  - `CSSPseudoElement.element` property
  - `CSSPseudoElement.parent` property
  - `CSSPseudoElement.type` property
  - `pseudo()` method

### Terms

- Pseudo-element glossary term

## Guides

- CSS pseudo-elements
    Alphabetical list of pseudo-elements defined by all the CSS specifications and WebVTT.

- Learn: Pseudo-classes and pseudo-elements
    Part of CSS building blocks section on selectors. This article defines what a pseudo-element is and how it can be combined with pseudo-classes and be used for generating content with `::before` and `::after` pseudo-elements.

- How to create fancy boxes using pseudo-elements
    Example of styling generated content using `::before` and `::after` pseudo-elements for visual effects.

## Related concepts

- `::backdrop`

- Web Video Text Tracks Format (WebVTT) cues:
  - `::cue`
  - `::cue()`

- CSS multi-column layout module
  - `::column`

- CSS overflow module
  - `::scroll-button()`
  - `::scroll-marker`
  - `::scroll-marker-group`
  - `:target-current`

- CSS scoping module
  - `:host`
  - `:host()`
  - `:host-context()`
  - `::slotted()`

- CSS shadow parts module
  - `::part`

- CSS view transitions module
  - `::view-transition` (experimental)
  - `::view-transition-image-pair()` (experimental)
  - `::view-transition-group()` (experimental)
  - `::view-transition-new()` (experimental)
  - `::view-transition-old()` (experimental)

- CSS selectors
  - Attribute selectors
  - Combinators
  - Class selectors
  - ID selectors
  - Type selectors
  - Pseudo-classes
  - Universal selectors

- `placeholder` attribute of the `` element
- `:placeholder-shown` selector

- CSS generated content
  - `content` property
  - `quotes` property

- Text fragments

- `AnimationEvent.pseudoElement` property
- `KeyframeEffect.pseudoElement` property
- `TransitionEvent.pseudoElement` property

## See also

- List of pseudo-elements
- Specificity
- CSS selectors module
- CSS shadow-parts module
- CSS generated content module
- CSS positioned layout module
- CSS custom highlight API
