---
title: "At-rules"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/guides/syntax/at-rules/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# At-rules

**At-rules** are CSS statements that instruct CSS how to behave. They begin with an at-sign, `@` (U+0040 COMMERCIAL AT), followed by an identifier. They include everything from the at-keyword up to the next semicolon, `;` (U+003B SEMICOLON), or the next CSS block, whichever comes first.

At-rules are used to group and structure style rules and other at-rules, declare style information not directly associated with selected content, and manage syntactic constructs such as imports and namespaces keyword mappings.

## Syntax

The at-rule is defined in the CSS syntax module, with different at-rules being defined in their respective modules. They generally take one of two forms depending on the specific rule and its purpose: statement at-rules and block at-rules, which can contain nested qualified rules, at-rules, or declarations.

### Statement at-rules

```css
/* General structure */
@identifier (RULE);

/* Example: tells browser to use UTF-8 character set */
@charset "utf-8";
```

Statement at-rules end in a semicolon. There are several statement at-rules, designated by their identifiers, each with a different syntax:

- `@charset`
    An algorithm (has the syntactic form of an at-rule, but isn't a definition) that determines the fallback character set used by the style sheet (CSS Syntax).
- `@import`
    Tells the CSS engine to include an external style sheet (CSS cascading and inheritance).
- `@layer`
    Defines the order of precedence in case of multiple cascade layers (CSS cascading and inheritance). Also used as a block at-rule to define a layer's styles.
- `@namespace`
    Defines a default namespace for a style sheet or a namespace prefix that a selector only matches if the namespace and other selector components match (CSS namespaces).

### Block at-rules

```css
@identifier (RULE) {
}
```

Block at-rules end in a `{}`-block that contain nested rules, other at-rules, or property or descriptor declarations.

- `@counter-style`
    Define custom counter styles and extend predefined list styles (CSS counter styles).
- `@container`
    A conditional group rule that applies its content if the container meets the `<container-condition>`s (CSS containment).
- `@font-face`
    Defines font resource locations, both local and external, along with the style characteristics for when those resources are used with a declared `font-family` (CSS fonts).
- `@font-feature-values` (plus `@swash`, `@ornaments`, `@annotation`, `@stylistic`, `@styleset` and `@character-variant`)
    Controls font display per font-family by defining font-specific alternates, or custom names, to feature indexes in `font-variant-alternates` in OpenType (CSS fonts).
- `@keyframes` (and the `@-webkit-keyframes` alias)
    Define a named animation by describing defining CSS styles for intermediate steps (or keyframes) in the animation sequence (CSS animations).
- `@layer`
    Creates a named cascade layer with the CSS rules for that layer inside (CSS cascading and inheritance). Also used as a statement at-rule to define the order of precedence in case of multiple cascade layers
- `@media`
    A conditional group rule that applies its content if the device meets the criteria of the condition defined using a _media query_ (CSS conditional rules).
- `@page`
    Specifies aspects of a page to be printed, such as its dimensions, orientation, and margins (CSS paged media).
- `@position-try`
    Defines custom position options which can be used to define fallback positioning and alignment options for anchor-positioned elements (CSS anchor positioning).
- `@property`
    Defines a CSS custom property, allowing for property type checking and constraining, setting default values, and defining whether a custom property can inherit values or not (CSS custom properties for cascading variables).
- `@scope`
    Defines a scope in which to apply them to selected elements and the styles to apply to the elements in that scope (CSS cascading and inheritance).
- `@starting-style`
    Define the starting property values for an element to transition from when the element receives its first style update, such as when transitioning from `display: none` (CSS transitions).
- `@supports`
    A conditional group rule applies its content if the browser supports the CSS features of the given condition (CSS conditional rules).
- `@view-transition`
    Opts the current document into a view transition, and the destination document as well in the case of cross-document navigation transitions.

## See also

- CSS at-rules
- CSS at-rule functions
- Nesting at-rules
- CSS statements
- CSSRule interface
- CSS conditional rules module
- CSS syntax module
- Specificity
- Inheritance
