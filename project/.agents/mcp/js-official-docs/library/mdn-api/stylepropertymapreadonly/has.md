---
title: "StylePropertyMapReadOnly: has() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/stylepropertymapreadonly/has/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# StylePropertyMapReadOnly: has() method

The **`has()`** method of the `StylePropertyMapReadOnly` interface indicates whether the specified property is in the `StylePropertyMapReadOnly` object.

## Syntax

```js
has(property)
```

### Parameters

- `property`
    The name of a property.

### Return value

A boolean value.

## Examples

### Basic usage

Here we use the `has()` method to see if the `padding-top` property is present within the button elements style attribute.

```js
// get the button element
const buttonEl = document.querySelector(".example");

// find what's in the style attribute with attributeStyleMap and has()
const hasPadTop = buttonEl.attributeStyleMap.has("padding-top");

console.log(hasPadTop); // logs true if padding-top is present in style attribute
```
