---
title: "CSSNamespaceRule"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/cssnamespacerule/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# CSSNamespaceRule

The **`CSSNamespaceRule`** interface describes an object representing a single CSS `@namespace` at-rule.

## Instance properties

_Inherits properties from its ancestor `CSSRule`._

- `CSSNamespaceRule.namespaceURI` (read-only)
    Returns a string containing the text of the URI of the given namespace.
- `CSSNamespaceRule.prefix` (read-only)
    Returns a string with the name of the prefix associated to this namespace. If there is no such prefix, returns an empty string.

## Instance methods

_Inherits methods from its ancestor `CSSRule`._

## Examples

The stylesheet includes a namespace as the only rule. Therefore the first `CSSRule` returned will be a `CSSNamespaceRule`.

```css
@namespace url("http://www.w3.org/1999/xhtml");
```

```js
const myRules = document.styleSheets[0].cssRules;
console.log(myRules[0]); // A CSSNamespaceRule
```
