---
title: "StylePropertyMapReadOnly: getAll() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/stylepropertymapreadonly/getall/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# StylePropertyMapReadOnly: getAll() method

The **`getAll()`** method of the `StylePropertyMapReadOnly` interface returns an array of `CSSStyleValue` objects containing the values for the provided property.

## Syntax

```js
getAll(property)
```

### Parameters

- `property`
    The name of the property to retrieve all values of.

### Return value

An array of `CSSStyleValue` objects.

## Examples

### Basic usage

The following example uses `getAll()` with the `background-image` property.
An `Array` is returned, which contains an item for each background image declared.

```js
// get a button element
const buttonEl = document.querySelector("button");

// we can retrieve all computed styles with `computedStyleMap`
const allComputedStyles = buttonEl.computedStyleMap();

// use getAll() with the background image property
const allBkImages = allComputedStyles.getAll("background-image");
console.log(allBkImages); // logs an array with each background image as an item
```
