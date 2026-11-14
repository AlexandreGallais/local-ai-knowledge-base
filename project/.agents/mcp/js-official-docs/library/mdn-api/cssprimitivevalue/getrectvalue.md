---
title: "CSSPrimitiveValue: getRectValue() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/cssprimitivevalue/getrectvalue/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# CSSPrimitiveValue: getRectValue() method

The **`getRectValue()`** method of the
`CSSPrimitiveValue` interface is used to get a rect value. If this CSS
value doesn't contain a rect value, a `DOMException` is raised.
Modification to the corresponding style property can be achieved using the
`Rect` interface.

> **Note:**
> This method was part of an attempt to create a typed CSS Object Model. This attempt has been abandoned, and most browsers do
> not implement it.
>
> To achieve your purpose, you can use:
>
> - the untyped CSS Object Model, widely supported, or
> - the modern CSS Typed Object Model API, less supported and considered experimental.

## Syntax

```js
getRectValue()
```

### Parameters

None.

### Return value

A `Rect` object representing the rect value.

### Exceptions

| **Type**       | **Description**                                                                                                  |
| -------------- | ---------------------------------------------------------------------------------------------------------------- |
| `DOMException` | An `INVALID_ACCESS_ERR` is raised if the CSS value doesn't contain a Rect value. (i.e., this is not `CSS_RECT`). |

## Examples

```js
const cs = window.getComputedStyle(document.getElementById("clippedDiv"));
const cssValue = cs.getPropertyCSSValue("clip");
console.log(cssValue.getRectValue());
```

## Specifications

This feature was originally defined in the DOM Style Level 2 specification, but has been dropped from any
standardization effort since then.

It has been superseded by a modern, but incompatible, CSS Typed Object Model API that is now on the standard track.
