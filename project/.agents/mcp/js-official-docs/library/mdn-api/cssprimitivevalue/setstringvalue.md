---
title: "CSSPrimitiveValue: setStringValue() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/cssprimitivevalue/setstringvalue/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# CSSPrimitiveValue: setStringValue() method

The **`setStringValue()`** method of the
`CSSPrimitiveValue` interface is used to set a string value. If the
property attached to this value can't accept the specified unit or the string value, the
value will be unchanged and a `DOMException` will be raised.

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
setStringValue(stringType, stringValue)
```

### Parameters

- `stringType`
    An `unsigned short` representing the type of the value. Possible values
    are:

    | Constant     | Description                                             |
    | ------------ | ------------------------------------------------------- |
    | `CSS_ATTR`   | The value is an `attr()` function. |
    | `CSS_IDENT`  | The value is an identifier.                             |
    | `CSS_STRING` | The value is a `<string>`.           |
    | `CSS_URI`    | The value is a `<url>`. |

- `stringValue`
    A string representing the new string value.

### Return value

None (`undefined`).

### Exceptions

- `InvalidAccessError` `DOMException`
    Thrown if the CSS value doesn't contain a string value
    or if the string value can't be converted into the specified unit.
- `NoModificationAllowedError` `DOMException`
    Thrown if the property is read-only.

## Specifications

This feature was originally defined in the DOM Style Level 2 specification, but has been dropped from any
standardization effort since then.

It has been superseded by a modern, but incompatible, CSS Typed Object Model API that is now on the standard track.
