---
title: "CSSStyleDeclaration: removeProperty() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/cssstyledeclaration/removeproperty/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# CSSStyleDeclaration: removeProperty() method

The **`CSSStyleDeclaration.removeProperty()`** method interface
removes a property from a CSS style declaration object.

## Syntax

```js
removeProperty(property)
```

### Parameters

- `property`
    A string representing the property name to be removed. Multi-word property names are hyphenated (kebab-case) and not camel-cased.

### Return value

A string equal to the value of the CSS property before it was removed.

### Exceptions

- `NoModificationAllowedError` `DOMException`
    Thrown when the property or declaration block is read-only.

## Examples

The following JavaScript code removes the `background-color` CSS property
from a selector rule:

```js
const declaration = document.styleSheets[0].rules[0].style;
const oldValue = declaration.removeProperty("background-color");
```
