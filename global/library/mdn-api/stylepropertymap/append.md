---
title: "StylePropertyMap: append() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/stylepropertymap/append/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# StylePropertyMap: append() method

The **`append()`** method of the `StylePropertyMap` interface adds one or more values to the end of a list-valued CSS property's value list.

A list-valued CSS property is one whose value is a comma-separated list of terms, such as `background-image` or `animation`.

## Syntax

```js
append(property)
append(property, value1)
append(property, value1, value2)
append(property, value1, value2, /* …, */ valueN)
```

### Parameters

- `property`
    An identifier indicating the stylistic feature (e.g., font, width, background color) to add.
- `value1`, …, `valueN`
    One or more values to add to the end of `property`'s value list, in the order given.

### Return value

None (`undefined`).

### Exceptions

- `TypeError`
    Thrown if:
    - `property` is not a valid CSS list-valued property.
    - Any of `value1`, …, `valueN` is already associated with a different property (for example, a value read from one property's entry in a `StylePropertyMap`, then passed to `append()` for another property).
    - Any of `value1`, …, `valueN` is a `CSSUnparsedValue` or `CSSVariableReferenceValue` object.
    - `property`'s current value contains a `var` reference.

## Examples

### Basic usage

This example shows an extra background image value being added to the `background-image` property of the element, using `HTMLElement.attributeStyleMap`.

```js
// get the button element
const buttonEl = document.querySelector("button");

// append another value to the background-image property set on the attribute
buttonEl.attributeStyleMap.append(
  "background-image",
  "linear-gradient(180deg, blue, black)",
);
```
