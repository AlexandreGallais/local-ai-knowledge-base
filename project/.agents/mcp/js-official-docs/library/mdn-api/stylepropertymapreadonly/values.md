---
title: "StylePropertyMapReadOnly: values() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/stylepropertymapreadonly/values/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# StylePropertyMapReadOnly: values() method

The **`StylePropertyMapReadOnly.values()`** method returns a new _array iterator_ containing the values for each index in the `StylePropertyMapReadOnly` object.

## Syntax

```js
values()
```

### Parameters

None.

### Return value

A new `Array`.

## Examples

### Basic usage

In this example, we use the `values()` method to access the values within the `Element.computedStyleMap()`.

```js
// get a button element
const buttonEl = document.querySelector("button");

// we can retrieve all computed styles with `computedStyleMap`
const allComputedStyles = buttonEl.computedStyleMap();

// values returns an iterable list of the CSS values
const vals = allComputedStyles.values();
console.log(vals.next().value); // returns a CSSStyleValue
```
