---
title: "CSS selectors"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/guides/selectors/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# CSS selectors

The **CSS selectors** module defines the patterns to select elements to which a set of CSS rules are then applied along with their specificity. The CSS selectors module provides us with more than 60 selectors and five combinators. Other modules provide additional pseudo-class selectors and pseudo-elements.

> **Note:**
> This page introduces a CSS module. To find an exhaustive list of all selectors defined by CSS specifications, see the selectors reference page.

In CSS, selectors are patterns used to match, or select, the elements you want to style. Selectors are also used in JavaScript to enable selecting the DOM nodes to return as a `NodeList`.

Selectors, whether used in CSS or JavaScript, enable targeting HTML elements based on their type, attributes, current states, and even position in the DOM. Combinators allow you to be more precise when selecting elements by enabling selecting elements based on their relationship to other elements.

## Reference

### Combinators and separators

- `+` (Next-sibling combinator)
- `>` (Child combinator)
- `~` (Subsequent sibling combinator)
- " " (Descendant combinator)
- `|` (Namespace separator)
- `,` (Selector list)

The CSS selectors module also introduces the column combinator (`||`). Currently, no browsers support this feature.

### Selectors

- `:active`
- `:any-link`
- `:autofill`
- `:buffering`
- `:checked`
- `:default`
- `:defined`
- `:dir()`
- `:disabled`
- `:empty`
- `:enabled`
- `:first-child`
- `:first-of-type`
- `:focus`
- `:focus-visible`
- `:focus-within`
- `:fullscreen`
- `:future`
- `:has()`
- `:hover`
- `:in-range`
- `:indeterminate`
- `:interest-source`
- `:interest-target`
- `:invalid`
- `:is()`
- `:lang()`
- `:last-child`
- `:last-of-type`
- `:link`
- `:matches()` (obsolete legacy selector alias for `:is()`)
- `:modal`
- `:muted`
- `:not()`
- `:nth-child()`
- `:nth-of-type()`
- `:nth-last-child()`
- `:nth-last-of-type()`
- `:only-child`
- `:only-of-type`
- `:open`
- `:optional`
- `:out-of-range`
- `:past`
- `:paused`
- `:picture-in-picture`
- `:placeholder-shown`
- `:playing`
- `:popover-open`
- `:read-only`
- `:read-write`
- `:required`
- `:root`
- `:scope`
- `:seeking`
- `:stalled`
- `:target`
- `:user-invalid`
- `:user-valid`
- `:valid`
- `:visited`
- `:volume-locked`
- `:where()`
- `:-webkit-` pseudo-classes
- Attribute selectors
- Class selector
- ID selectors
- Type selectors
- Universal selectors

The CSS selectors module also introduces the `:blank`, `:current`, and `:local-link` pseudo-classes. Currently, no browsers support these features.

## Terms

- Pseudo-class glossary term
- Functional pseudo-classes
- Combinators
- Simple selector
- Compound selector
- Complex selector
- Relative selector
- Specificity

## Guides

- CSS selectors and combinators
    Overview of the different types of simple selectors and various combinators defined in the CSS selectors and the CSS pseudo modules.

- CSS selector structure
    Explanation of the structure of CSS selectors and the terminologies introduced in the CSS selectors module, ranging from "simple selector" to "forgiving relative selector list".

- Pseudo classes
    Lists the pseudo-classes, selectors that allow the selection of elements based on state information that is not contained in the document tree, defined in the various CSS modules and HTML.

- Using the `:target` pseudo-class in selectors
    Learn how to use the `:target` pseudo-class to style the target element a URL's fragment identifier.

- Privacy and the `:visited` selector
    Explores the style limitations set on the `:visited` class for user privacy.

- CSS building blocks: CSS selectors
    Introduction to basic CSS selectors, including tutorials on Type, class, and ID selectors, Attribute selectors, Pseudo-classes and pseudo-elements, and Combinators.

- Learn: UI pseudo-classes
    Learn the different UI pseudo-classes available for styling forms in different states.

- Selection and traversal on the DOM tree
    The selectors API enables using selectors in JavaScript to retrieve element nodes from the DOM.

## Related concepts

- `state()` pseudo-class
- `:xr-overlay` pseudo-class
- CSS nesting module
  - `&` nesting selector
- CSS scoping module
  - `:host` pseudo-class
  - `:host()` pseudo-class
  - `:host-context()` pseudo-class
  - `:has-slotted` pseudo-class
  - `::slotted` pseudo-element

- CSS overflow module
  - `::scroll-button()`
  - `::scroll-marker`
  - `::scroll-marker-group`
  - `:target-current`

- CSS multi-column layout module
  - `::column`

- CSS paged media module
  - `:left` pseudo-class
  - `:right` pseudo-class
  - `:first` pseudo-class
  - `:blank` pseudo-class

- CSS pseudo-element module (representing entities not included in HTML)
  - `::after`
  - `::before`
  - `::file-selector-button`
  - `::first-letter`
  - `::first-line`
  - `::grammar-error`
  - `::marker`
  - `::placeholder`
  - `::selection`
  - `::spelling-error`
  - `::target-text`

- CSS shadow parts module
  - `::part` pseudo-element

- CSS positioned layout module
  - `::backdrop`

- Other pseudo-elements
  - `::cue`

- CSS animations
  - `<keyframe-selector>`

- `@namespace` at-rule

- `!important`
- Specificity
- Cascade

- `Document.querySelector` method
- `Document.querySelectorAll` method
- `NodeList.forEach()` method

## See also

- CSS pseudo-element module
- CSS cascading and inheritance module
- CSS nesting module
- Using shadow DOM
