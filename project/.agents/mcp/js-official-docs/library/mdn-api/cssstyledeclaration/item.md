---
title: "CSSStyleDeclaration: item() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/cssstyledeclaration/item/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# CSSStyleDeclaration: item() method

The `CSSStyleDeclaration.item()`
method interface returns a CSS property name from a `CSSStyleDeclaration`
by index.

This method doesn't throw exceptions as long as you provide
arguments; the empty string is returned if the index is out of range and a
`TypeError` is thrown if no argument is provided.

## Syntax

```js
item(index)
```

### Parameters

- `index`
    The index of the node to be fetched. The index is zero-based.

### Return value

A string that is the name of the CSS property at the specified index.

JavaScript has a special simpler syntax for obtaining an item from a NodeList by index:

```js
const propertyName = style[index];
```

### Exceptions

- `TypeError`
    Thrown if no argument is provided.

## Examples

```js
const style = document.getElementById("div1").style;
const propertyName = style.item(1); // or style[1] - returns the second style listed
```
