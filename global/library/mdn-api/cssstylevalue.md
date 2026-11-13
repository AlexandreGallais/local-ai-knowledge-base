---
title: "CSSStyleValue"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/cssstylevalue/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# CSSStyleValue

The **`CSSStyleValue`** interface of the CSS Typed Object Model API is the base class of all CSS values accessible through the Typed OM API.
An instance of this class may be used anywhere a string is expected.

## Static methods

- `CSSStyleValue.parse()`
    Sets a specific CSS property to the specified values and returns the first value as a `CSSStyleValue` object.
- `CSSStyleValue.parseAll()`
    Sets all occurrences of a specific CSS property to the specified value and returns an array of `CSSStyleValue` objects, each containing one of the supplied values.

## Instance methods

- `CSSStyleValue.toString()`
    A stringifier that returns the value formatted as a string of standard CSS text.

## Interfaces based on CSSStyleValue

- `CSSImageValue`
- `CSSKeywordValue`
- `CSSNumericValue`
- `CSSPositionValue`
- `CSSTransformValue`
- `CSSUnparsedValue`
