---
title: "StylePropertyMapReadOnly: size property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/stylepropertymapreadonly/size/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# StylePropertyMapReadOnly: size property

The **`size`** read-only property of the `StylePropertyMapReadOnly` interface returns a positive integer containing the size of the `StylePropertyMapReadOnly` object.

## Value

A positive integer.

## Examples

### Basic usage

Here we use the size property to return the total entries within the button elements `computedStyleMap`.

```js
// grab our element
const buttonEl = document.querySelector("button");

// we can retrieve all computed styles with `computedStyleMap`
const allComputedStyles = buttonEl.computedStyleMap();

// use size to get the total styles within the map
const amountStyles = allComputedStyles.size;
console.log(amountStyles); // logs 338
```
