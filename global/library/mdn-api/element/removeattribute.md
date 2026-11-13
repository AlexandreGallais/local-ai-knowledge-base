---
title: "Element: removeAttribute() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/element/removeattribute/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Element: removeAttribute() method

The `Element` method
**`removeAttribute()`** removes the attribute with the
specified name from the element.

## Syntax

```js
removeAttribute(attrName)
```

### Parameters

- `attrName`
    A string specifying the name of the attribute to remove from the
    element. If the specified attribute does not exist, `removeAttribute()`
    returns without generating an error.

### Return value

None (`undefined`).

## Usage notes

You should use `removeAttribute()` instead of setting the attribute value to `null` either directly or using `setAttribute()`.
Many attributes will not behave as expected if you set them to `null`.

## Examples

```js
// Given: <div id="div1" disabled width="200px">
document.getElementById("div1").removeAttribute("disabled");
// Now: <div id="div1" width="200px">
```

## See also

- `Element.hasAttribute()`
- `Element.getAttribute()`
- `Element.setAttribute()`
- `Element.toggleAttribute()`
