---
title: "CSS cascading and inheritance"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/guides/cascade/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# CSS cascading and inheritance

The **CSS cascading and inheritance** module defines the rules for assigning values to properties by way of cascading and inheritance. This module specifies the rules for finding the specified value for all properties on all elements.

One of the fundamental design principles of CSS is cascading of rules. It allows several style sheets to influence the presentation of a document. CSS property-value declarations define how a document is rendered. Multiple declarations may set different values for the same element and property combination, but only one value can be applied to any CSS property. The CSS cascade module defines how these conflicts are resolved.

The opposite also occurs. Sometimes there are no declarations defining the value of a property. The CSS cascade module defines how these missing values should be set via inheritance or from the property's initial value.

> **Note:**
> The rules for finding the specified values in the page context and its margin boxes are described in the CSS page module.

## Reference

### Properties

- `all`

### At-rules and descriptors

- `@import`
- `@layer`

### Keywords

- `initial`
- `inherit`
- `revert`
- `revert-layer`
- `unset`
- `!important` flag

### Interfaces

- `CSSLayerBlockRule`
- `CSSGroupingRule`
- `CSSLayerStatementRule`
- `CSSRule`

### Glossary terms and definitions

- Actual value
- Anonymous layer
- Author origin
- Cascade
- Computed value
- Initial value
- Named layer
- Resolved value
- Shorthand properties
- Specificity
- Specified value
- style origin
- Used value
- User origin
- User-agent origin

## Guides

- Introducing the CSS Cascade
    Guide to the cascade algorithm that defines how user agents combine property values originating from different sources.

- CSS inheritance
    A guide to CSS inheritance.

- Learn: Handling conflicts
    The most fundamental concepts of CSS — the cascade, specificity, and inheritance — which control how CSS is applied to HTML and how conflicts are resolved.

- Learn: Cascade layers
    Introduction to cascade layers, a more advanced feature that builds on the fundamental concepts of the CSS cascade and CSS specificity.

## Related concepts

- Element-attached styles
- Inline styles and the cascade
- Conditional rules for @imports
- Value definition syntax

## See also

- CSS selectors module
- CSS pseudo-elements module
- CSS paged media module
- CSS conditional rules module
- CSS nesting module
- Shorthand properties
