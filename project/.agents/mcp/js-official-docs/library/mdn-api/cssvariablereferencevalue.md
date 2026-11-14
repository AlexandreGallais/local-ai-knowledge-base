---
title: "CSSVariableReferenceValue"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/cssvariablereferencevalue/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# CSSVariableReferenceValue

The **`CSSVariableReferenceValue`** interface of the CSS Typed Object Model API allows you to create a custom name for a built-in CSS value. This object functionality is sometimes called a "CSS variable" and serves the same purpose as the `var()` function. The custom name must begin with two dashes.

## Constructor

- `CSSVariableReferenceValue()`
    Creates a new `CSSVariableReferenceValue` object.

## Instance properties

- `CSSVariableReferenceValue.variable`
    Returns the custom name passed to the constructor.
- `CSSVariableReferenceValue.fallback` (read-only)
    Returns the built-in CSS value for the custom name.

## Instance methods

None.
