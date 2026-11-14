---
title: "CSSScopeRule"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/cssscoperule/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# CSSScopeRule

The **`CSSScopeRule`** interface of the CSS Object Model represents a CSS `@scope` at-rule.

## Instance properties

_Inherits properties from its ancestors `CSSGroupingRule` and `CSSRule`._

- `end` (read-only)
    Returns a string containing the value of the `@scope` at-rule's scope limit.
- `start` (read-only)
    Returns a string containing the value of the `@scope` at-rule's scope root.

## Instance methods

_Inherits methods from its ancestors `CSSGroupingRule` and `CSSRule`._

## Examples

### Accessing @scope information in JavaScript

Assuming the following is the only stylesheet attached to a document:

```css
@scope (.outer) to (.inner) {
  :scope {
    background: yellow;
  }
}
```

The following JavaScript could be used to access information about the contained `@scope` block:

```js
const scopeBlock = document.styleSheets[0].cssRules[0];

console.log(scopeBlock.start); // Returns ".outer"
console.log(scopeBlock.end); // Returns ".inner"
```

## See also

- `@scope`
- `:scope`
