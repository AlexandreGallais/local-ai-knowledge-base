---
title: "StylePropertyMap: delete() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/stylepropertymap/delete/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# StylePropertyMap: delete() method

The **`delete()`** method of the `StylePropertyMap` interface removes the CSS declaration using the given property.

## Syntax

```js
delete(property)
```

### Parameters

- `property`
    An identifier indicating the stylistic feature (e.g., font, width, background color) to remove.

### Return value

None (`undefined`).

## Examples

### Basic usage

The following example removes the `background-image` property from the element's style attribute.

```js
// get the button element
const buttonEl = document.querySelector("button");

// remove background-image from style attribute
buttonEl.attributeStyleMap.delete("background-image");
```
