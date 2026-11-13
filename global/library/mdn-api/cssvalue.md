---
title: "CSSValue"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/cssvalue/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# CSSValue

The **`CSSValue`** interface represents the current computed value of a CSS property.

> **Note:**
> This interface was part of an attempt to create a typed CSS Object Model. This attempt has been abandoned, and most browsers do
> not implement it.
>
> To achieve your purpose, you can use:
>
> - the untyped CSS Object Model, widely supported, or
> - the modern CSS Typed Object Model API, less supported and considered experimental.

## Instance properties

- `CSSValue.cssText` (deprecated) (non-standard)
    A string representing the current value.
- `CSSValue.cssValueType` (read-only) (deprecated) (non-standard)
    An `unsigned short` representing a code defining the type of the value. Possible values are:

    | Constant              | Description                                                                                                                                                                                              |
    | --------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
    | `CSS_CUSTOM`          | The value is a custom value.                                                                                                                                                                             |
    | `CSS_INHERIT`         | The value is inherited and the `cssText` contains `"inherit"`.                                                                                                                                           |
    | `CSS_PRIMITIVE_VALUE` | The value is a primitive value and an instance of the `CSSPrimitiveValue` interface can be obtained by using binding-specific casting methods on this instance of the `CSSValue` interface. |
    | `CSS_VALUE_LIST`      | The value is a `CSSValue` list and an instance of the `CSSValueList` interface can be obtained by using binding-specific casting methods on this instance of the `CSSValue` interface.      |

## Specifications

This feature was originally defined in the DOM Style Level 2 specification, but has been dropped from any
standardization effort since then.

It has been superseded by a modern, but incompatible, CSS Typed Object Model API that is now on the standard track.

## See also

- `CSSPrimitiveValue`
- `CSSValueList`
