---
title: "CSSValueList"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/cssvaluelist/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# CSSValueList

The **`CSSValueList`** interface derives from the `CSSValue` interface and provides the abstraction of an ordered collection of CSS values.

> **Note:**
> This interface was part of an attempt to create a typed CSS Object Model. This attempt has been abandoned, and most browsers do
> not implement it.
>
> To achieve your purpose, you can use:
>
> - the untyped CSS Object Model, widely supported, or
> - the modern CSS Typed Object Model API, less supported and considered experimental.

Some properties allow an empty list in their syntax. In that case, these properties take the `none` identifier. So, an empty list means that the property has the value `none`.

The items in the `CSSValueList` are accessible via an integral index, starting from 0.

## Instance properties

_Inherits properties from its parent, `CSSValue`_.

- `CSSValueList.length` (read-only) (deprecated) (non-standard)
    An `unsigned long` representing the number of `CSSValues` in the list.

## Instance methods

- `CSSValueList.item()` (deprecated) (non-standard)
    This method is used to retrieve a `CSSValue` by ordinal index. The order in this collection represents the order of the values in the CSS style property. If index is greater than or equal to the number of values in the list, this returns `null`.

## Specifications

This feature was originally defined in the DOM Style Level 2 specification, but has been dropped from any
standardization effort since then.

It has been superseded by a modern, but incompatible, CSS Typed Object Model API that is now on the standard track.

## See also

- `CSSPrimitiveValue`
- `CSSValue`
