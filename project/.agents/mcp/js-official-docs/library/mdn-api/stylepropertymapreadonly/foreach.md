---
title: "StylePropertyMapReadOnly: forEach() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/stylepropertymapreadonly/foreach/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# StylePropertyMapReadOnly: forEach() method

The **`StylePropertyMapReadOnly.forEach()`** method executes a provided function once for each element of `StylePropertyMapReadOnly`.

## Syntax

```js
forEach(callbackFn)
forEach(callbackFn, thisArg)
```

### Parameters

- `callbackFn`
    The function to execute for each element, taking three arguments:
    - `currentValue`
        The value of the current element being processed.
    - `index` (optional)
        The index of the current element being processed.
    - `array` (optional)
        The StylePropertyMapReadOnly that `forEach()` is being called on.

- `thisArg` (optional)
    Value to use as **`this`** (i.e., the reference
    `Object`) when executing `callback`.

### Return value

None (`undefined`).

## Examples

### Basic usage

The following code is an example of using `forEach()` on a retrieved `Element.computedStyleMap()`.

```js
// get a button element
const buttonEl = document.querySelector(".example");

// we can retrieve all computed styles with `computedStyleMap`
const allComputedStyles = buttonEl.computedStyleMap();

// forEach will allow us to run code over each prop/val pair
allComputedStyles.forEach((elem, index, arr) => {
  // code to run for each pair
});
```
