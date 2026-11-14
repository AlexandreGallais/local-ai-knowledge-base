---
title: "CSSRuleList: item() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/cssrulelist/item/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# CSSRuleList: item() method

The **`item()`** method of the `CSSRuleList` interface returns the `CSSRule` object at the specified `index` or `null` if the specified `index` doesn't exist.

## Syntax

```js
item(index)
```

### Parameters

- `index`
    An integer.

### Return value

A `CSSRule`.

## Examples

In the following example, we assume that the `myRules` list has three items only.

```js
let myRules = document.styleSheets[0].cssRules;
console.log(myRules.item(0)); // Logs the first CSSRule item from this list

// Accessing non-existing items using this method will return null instead of undefined
console.log(myRules.item(5)); // null
console.log(myRules[5]); // undefined
```
