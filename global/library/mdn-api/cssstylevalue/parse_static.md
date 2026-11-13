---
title: "CSSStyleValue: parse() static method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/cssstylevalue/parse_static/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# CSSStyleValue: parse() static method

The **`parse()`** static method of the `CSSStyleValue` interface sets a specific CSS property to the specified values and returns the first value as a `CSSStyleValue` object.

> **Note:**
> This method cannot be called in `Worker` or `Worklet` contexts.
> The rest of the `CSSStyleValue` interface remains available in workers and worklets.

## Syntax

```js
CSSStyleValue.parse(property, cssText)
```

### Parameters

- `property`
    A CSS property to set.
- `cssText`
    A comma-separated string containing one or more values to apply to the provided
    property.

### Return value

A `CSSStyleValue` object containing the first supplied value.

## Examples

### Basic usage

The code below parses a set of declarations for the `transform` property.
The second code block shows the structure of the returned object as it would be rendered in a developer tools console.

```js
const css = CSSStyleValue.parse(
  "transform",
  "translate3d(10px,10px,0) scale(0.5)",
);
```

```plain
CSSTransformValue {0: CSSTranslate, 1: CSSScale, length: 2, is2D: false}
```

## See also

- `CSSStyleValue.parseAll()`

- Using the CSS Typed OM
- CSS Typed Object Model API
