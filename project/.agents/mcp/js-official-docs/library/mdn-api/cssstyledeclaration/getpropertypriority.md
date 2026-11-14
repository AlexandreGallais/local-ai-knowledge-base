---
title: "CSSStyleDeclaration: getPropertyPriority() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/cssstyledeclaration/getpropertypriority/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# CSSStyleDeclaration: getPropertyPriority() method

The **CSSStyleDeclaration.getPropertyPriority()** method interface returns
a string that provides all explicitly set priorities on the CSS
property.

## Syntax

```js
getPropertyPriority(property)
```

### Parameters

- `property`
    A string representing the property name to be checked.

### Return value

A string that represents the priority (e.g., `"important"`) if one exists.
If none exists, returns the empty string.

## Examples

The following JavaScript code checks whether `margin` is marked as important
in a CSS selector rule:

```js
const declaration = document.styleSheets[0].cssRules[0].style;
const isImportant = declaration.getPropertyPriority("margin") === "important";
```
