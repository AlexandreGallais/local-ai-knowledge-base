---
title: "DOMTokenList: toString() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/domtokenlist/tostring/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# DOMTokenList: toString() method

The **`toString()`** stringifier method of the `DOMTokenList` interface returns the values of the token list serialized as a string. The return value is a space-separated list of tokens equal to the `DOMTokenList.value` property.

## Syntax

```js
toString()
```

### Parameters

None.

### Return value

A string.

## Examples

```js
const element = document.createElement("div");
const classes = element.classList;

element.className = "shop empty-cart";
classes.add("logged-in", "dark-mode");

console.log(classes.toString());
// "shop empty-cart logged-in dark-mode"
```

## See also

- `Element.classList`
- `DOMTokenList.add()`
