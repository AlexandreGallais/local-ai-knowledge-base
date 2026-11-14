---
title: "CSSGroupingRule: deleteRule() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/cssgroupingrule/deleterule/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# CSSGroupingRule: deleteRule() method

The **`deleteRule()`** method of the
`CSSGroupingRule` interface removes a CSS rule from a list of child CSS
rules.

## Syntax

```js
deleteRule(index)
```

### Parameters

- `index`
    The index of the rule to delete.

### Return value

None (`undefined`).

### Exceptions

- `IndexSizeError` `DOMException`
    Thrown if _index_ is greater than or equal to the number of child CSS
    rules.
- `InvalidStateError` `DOMException`
    Thrown if the rule being removed is an `@namespace` at-rule, and the list of child CSS rules contains anything other than `@import` at-rules and `@namespace` at-rules.

## Examples

```js
let myRules = document.styleSheets[0].cssRules;
myRules[0].deleteRule(2); /* deletes the rule at index 2 */
```
