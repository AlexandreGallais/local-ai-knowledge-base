---
title: "CSSValueList: item() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/cssvaluelist/item/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# CSSValueList: item() method

The **`item()`** method of the `CSSValueList`
interface is used to retrieve a `CSSValue` by ordinal index.

The order in this collection represents the order of the values in the CSS style
property. If the index is greater than or equal to the number of values in the list,
this method returns `null`.

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
item(index)
```

### Parameters

- `index`
    An `unsigned long` representing the index of the CSS value within the
    collection.

### Return value

A `CSSValue` object at the `index` position in the
`CSSValueList`, or `null` if that is not a valid index.

## Specifications

This feature was originally defined in the DOM Style Level 2 specification, but has been dropped from any
standardization effort since then.

It has been superseded by a modern, but incompatible, CSS Typed Object Model API that is now on the standard track.
