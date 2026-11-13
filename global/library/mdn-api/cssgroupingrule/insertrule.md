---
title: "CSSGroupingRule: insertRule() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/cssgroupingrule/insertrule/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# CSSGroupingRule: insertRule() method

The **`insertRule()`** method of the
`CSSGroupingRule` interface adds a new CSS rule to a list of CSS rules.

## Syntax

```js
insertRule(rule)
insertRule(rule, index)
```

### Parameters

- `rule`
    A string
- `index` (optional)
    An optional index at which to insert the rule; defaults to 0.

### Return value

The index of the new rule.

### Exceptions

- `IndexSizeError` `DOMException`
    Thrown if _index_ is greater than the number of child CSS rules.
- `HierarchyRequestError` `DOMException`
    Thrown if `rule` cannot be inserted at the specified index due to some CSS constraint.
- `HierarchyRequestError` `DOMException`
    Thrown if the `rule` is a valid statement but not a nested statement.

## Examples

```js
let myRules = document.styleSheets[0].cssRules;
myRules[0].insertRule(
  "html {background-color: blue;}",
  0,
); /* inserts a rule for the HTML element at position 0 */
```
