---
title: "CSSStyleDeclaration: getPropertyCSSValue() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/cssstyledeclaration/getpropertycssvalue/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# CSSStyleDeclaration: getPropertyCSSValue() method

The **CSSStyleDeclaration.getPropertyCSSValue()**
method interface returns a `CSSValue` containing the CSS value for a
property. Note that it returns `null` if the property name is a
shorthand property.

> **Note:**
> This interface was part of an attempt to create a typed CSS Object Model. This attempt has been abandoned, and most browsers do
> not implement it.
>
> To achieve your purpose, you can use:
>
> - `CSSStyleDeclaration.getPropertyValue()` of the untyped CSS Object Model, widely supported, or
> - `Element.computedStyleMap()` of the modern CSS Typed Object Model API, less supported and considered experimental.

## Syntax

```js
getPropertyCSSValue(property)
```

### Parameters

- `property`
    A string representing the property name to be retrieved.

### Return value

A `CSSValue` containing the CSS value for a property. If none exists, returns `null`.

## Examples

The following JavaScript code gets an object containing the computed RGB values of
the `color` CSS property:

```js
const style = window.getComputedStyle(elem, null);
const rgbObj = style.getPropertyCSSValue("color").getRGBColorValue();
```

## Specifications

This feature was originally defined in the DOM Style Level 2 specification, but has been dropped from any
standardization effort since then.

It has been superseded by a modern, but incompatible, CSS Typed Object Model API that is now on the standard track.
