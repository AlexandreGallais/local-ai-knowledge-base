---
title: "StylePropertyMap: set() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/stylepropertymap/set/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# StylePropertyMap: set() method

The **`set()`** method of the `StylePropertyMap` interface changes the CSS declaration using the given property.

## Syntax

```js
set(property)
set(property, value1)
set(property, value1, value2)
set(property, value1, value2, /* …, */ valueN)
```

### Parameters

- `property`
    An identifier indicating the stylistic feature (e.g., font, width, background color) to change.
- `value1`, …, `valueN`
    The value(s) the given property should have.

### Return value

None (`undefined`).

## Examples

### Basic usage

This example sets the specified value for the `padding-top` property within the element's style attribute.

```js
// get the button element
const buttonEl = document.querySelector("button");

// set padding-top on button style attribute
buttonEl.attributeStyleMap.set("padding-top", CSS.px(10));
```
