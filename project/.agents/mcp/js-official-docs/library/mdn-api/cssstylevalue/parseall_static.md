---
title: "CSSStyleValue: parseAll() static method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/cssstylevalue/parseall_static/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# CSSStyleValue: parseAll() static method

The **`parseAll()`** static method of the `CSSStyleValue` interface sets all occurrences of a specific CSS property to the specified value and returns an array of `CSSStyleValue` objects, each containing one of the supplied values.

> **Note:**
> This method cannot be called in `Worker` or `Worklet` contexts.
> The rest of the `CSSStyleValue` interface remains available in workers and worklets.

## Syntax

```js
CSSStyleValue.parseAll(property, value)
```

### Parameters

- `property`
    A CSS property to set.
- `value`
    A comma-separated string containing one or more values that apply to the provided property.

### Return value

An array of `CSSStyleValue` objects, each containing one of the supplied
values.

## See also

- `CSSStyleValue.parse()`
- Using the CSS Typed OM
- CSS Typed Object Model API
