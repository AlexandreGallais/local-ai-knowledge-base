---
title: "StylePropertyMap: clear() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/stylepropertymap/clear/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# StylePropertyMap: clear() method

The **`clear()`** method of the `StylePropertyMap` interface removes all declarations in the `StylePropertyMap`.

## Syntax

```js
clear()
```

### Parameters

None.

### Return value

None (`undefined`).

## Examples

### Basic usage

The following example removes all styles within the elements style attribute.

```js
// get the button element
const buttonEl = document.querySelector(".example");

// remove all styles from the style attribute
buttonEl.attributeStyleMap.clear();
```
