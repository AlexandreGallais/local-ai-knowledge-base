---
title: "StylePropertyMapReadOnly: entries() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/stylepropertymapreadonly/entries/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# StylePropertyMapReadOnly: entries() method

The **`StylePropertyMapReadOnly.entries()`** method returns an array of a given object's own enumerable property `[key, value]` pairs, in the same order as that provided by a `for...in` loop (the difference being that a for-in loop enumerates properties in the prototype chain as well).

## Syntax

```js
entries()
```

### Parameters

None.

### Return value

An array of the given `StylePropertyMapReadOnly` object's own enumerable property `[key, value]` pairs.

## Examples

### Basic usage

The following code shows an example of using `StylePropertyMapReadOnly.entries()` method on an elements computed styles.

```js
// grab a DOM element
const buttonEl = document.querySelector("button");

// we can retrieve all computed styles with `computedStyleMap`
const allComputedStyles = buttonEl.computedStyleMap();

// entries returns an iterable of the items
const iterableStyles = allComputedStyles.entries();

// returns a two item array with align-content as the first item and CSSStyleValue as the second
console.log(iterableStyles.next().value);
```
