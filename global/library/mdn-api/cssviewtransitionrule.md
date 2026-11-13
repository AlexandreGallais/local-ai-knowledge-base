---
title: "CSSViewTransitionRule"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/cssviewtransitionrule/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# CSSViewTransitionRule

The **`CSSViewTransitionRule`** interface represents a CSS `@view-transition` at-rule.

## Instance properties

_Inherits properties from its ancestor, `CSSRule`._

- `navigation` (read-only)
    Returns the `@view-transition` at-rule's `navigation` descriptor value.
- `types` (read-only)
    Returns an array containing the `@view-transition` at-rule's `types` descriptor values.

## Instance methods

_Inherits methods from its ancestor, `CSSRule`._

## Examples

### Basic usage

A stylesheet includes a `@view-transition` at-rule, with `navigation` and `types` descriptors set:

```css
@view-transition {
  navigation: auto;
  types: slide rotate;
}
```

In script, we grab a reference to the `@view-transition` at-rule using `document.styleSheets[0].cssRules`, then log the corresponding `CSSViewTransitionRule` object and its `navigation` and `types` properties to the console. The `types` property returns an array containing the values set for the `types` descriptor.

```js
let myRule = document.styleSheets[0].cssRules;
console.log(myRule[0]); // a CSSViewTransitionRule representing the @view-transition at-rule
console.log(myRule[0].navigation); // "auto"
console.log(myRule[0].types); // ["slide", "rotate"]
```

## See also

- `@view-transition`
- View Transition API
