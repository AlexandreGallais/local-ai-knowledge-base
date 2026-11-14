---
title: "CSS syntax"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/guides/syntax/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# CSS syntax

The **CSS syntax** module describes, in general terms, the structure and syntax of cascading stylesheets, or CSS. It defines CSS as the language for describing the rendering of structured documents (such as HTML and XML), on the web and elsewhere.

This module doesn't define any properties, data types, functions, or at-rules. Rather, it elaborates on how all of these features should be defined and how user agents should parse CSS.

## Reference

### At-rules and descriptors

- none

> **Note:**
> The module explicitly states that `@charset` is not an actual at-rule, but rather an unrecognized legacy rule that should be omitted when a stylesheet is grammar-checked. The only valid `@charset` usage is at the very beginning of a stylesheet, where it is interpreted as a special byte sequence stripped before processing the content.

### Key <example-value>

- At-rules
- character escaping
- CSS comments
- CSS declaration
- CSS declaration block
- CSS function
- Invalid
- Style rule

### Glossary terms

- CSS descriptor
- Parse
- Style sheet
- Whitespace

## Guides

- Introduction to CSS syntax: declarations, rulesets, and statements
    Explains the overall CSS syntax and how declarations, declaration blocks, rulesets, and statements form the style rules.

- Value definition syntax
    Explains the formal grammar for defining valid values for CSS properties and functions, along with semantic constraints. A guide for understanding CSS component value types, combinators, and multipliers.

- CSS error handling
    Overview of how browsers handle invalid CSS.

- Learn CSS first steps: CSS syntax
    Introductory guide to CSS, including an introduction to CSS syntax.

## Related concepts

CSS selectors module:

- CSS specificity

CSS cascading and inheritance module:

- `@import` at-rule
- `important` flag
- Initial values
- Computed values
- Used values
- Actual values
- CSS inheritance
- CSS property

CSS custom properties for cascading variables module:

- custom property (`--*`)
- `var` function

CSS conditional rules module:

- `@media` at-rule
- `@supports` at-rule

CSS Object Model (CSSOM) API:

- `cssText` property
- `insertRule(rule)` method
- `replace(text)` method

WHATWG specification:

- `<style>` element
- `<link>` element
- `class` attribute
- `rel` attribute

## See also

- CSS at-rule functions
- CSS selectors module
- CSS values and units module
