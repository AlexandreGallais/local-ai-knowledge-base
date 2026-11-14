---
title: "CSSStyleValue: toString() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/cssstylevalue/tostring/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# CSSStyleValue: toString() method

The **`toString()`** method of the `CSSStyleValue` interface is a stringifier that returns the value formatted as a string of standard CSS text.

## Syntax

```js
toString()
```

### Parameters

None.

### Return value

A string.

## Description

The exact serialization of the object to a string depends on how the `CSSStyleValue` object was obtained:

- If the object was created by parsing a CSS string, such as with `CSSStyleValue.parse()`, the method returns the original string that was parsed.
- If the object was constructed directly, such as with a `CSS` factory function or a subclass constructor, the returned string is generated according to serialization rules specific to that subclass.
- If the object was read from the CSSOM, such as with `Element.computedStyleMap()` or `HTMLElement.attributeStyleMap`, the returned string follows the CSSOM serialization rules.

For more information about serialization rules see When and how values are serialized in _CSS value serialization_.

## Examples

### Basic usage

```js
// Parsed from a string: returns the original string
const length1 = CSSStyleValue.parse("42.0px");
length1.toString(); // "42.0px"

// Constructed directly with a CSS factory function: subclass-specific serialization
const length2 = CSS.px(42.0);
length2.toString(); // "42px"

// Read from the CSSOM: follows CSSOM serialization rules
const element = document.createElement("div");
element.style.width = "42.0px";
const length3 = element.attributeStyleMap.get("width");
length3.toString(); // "42px"
```

## See also

- Using the CSS Typed OM
- `CSSStyleValue.parse()`
- `CSSStyleValue.parseAll()`
