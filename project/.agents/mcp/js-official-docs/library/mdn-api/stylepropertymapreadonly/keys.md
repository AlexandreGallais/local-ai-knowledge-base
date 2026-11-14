---
title: "StylePropertyMapReadOnly: keys() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/stylepropertymapreadonly/keys/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# StylePropertyMapReadOnly: keys() method

The **`StylePropertyMapReadOnly.keys()`** method returns a new _array iterator_ containing the keys for each item in `StylePropertyMapReadOnly`.

## Syntax

```js
keys()
```

### Parameters

None.

### Return value

A new `Array`.

## Examples

### Basic usage

In this example, we use the `keys()` method to access the properties within the `Element.computedStyleMap()`.

```js
// get a button element
const buttonEl = document.querySelector("button");

// we can retrieve all computed styles with `computedStyleMap`
const allComputedStyles = buttonEl.computedStyleMap();

// keys returns an iterable list of properties
const props = allComputedStyles.keys();
console.log(props.next().value); // returns align-content
```
