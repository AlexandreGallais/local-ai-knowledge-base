---
title: "HTMLAllCollection"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/htmlallcollection/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HTMLAllCollection

The **`HTMLAllCollection`** interface represents a collection of _all_ of the document's elements, accessible by index (like an array) and by the element's `id`. It is returned by the `document.all` property.

`HTMLAllCollection` has a very similar shape to `HTMLCollection`, but there are many subtle behavior differences — for example, `HTMLAllCollection` can be called as a function, and its `item()` method can be called with a string representing an element's `id` or `name` attribute.

## Instance properties

- `HTMLAllCollection.length` (read-only) (deprecated)
    Returns the number of items in the collection.

## Instance methods

- `HTMLAllCollection.item()` (deprecated)
    Returns the element located at the specified offset into the collection, or the element with the specified value for its `id` or `name` attribute. Returns `null` if no element is found.
- `HTMLAllCollection.namedItem()` (deprecated)
    Returns the first element in the collection whose `id` or `name` attribute match the given string name, or `null` if no element matches.

## Usage in JavaScript

### Indexed access

In addition to the methods above, elements in an `HTMLAllCollection` can be accessed by integer indices and string property names. The HTML `id` attribute may contain `:` and `.` as valid characters, which would necessitate using bracket notation for property access. `collection[i]` is equivalent to `collection.item(i)`, where `i` can be an integer, a string containing an integer, or a string representing an `id`.

### Calling as a function

An `HTMLAllCollection` object is callable. When it's called with no arguments or with `undefined`, it returns `null`. Otherwise, it returns the same value as the `item()` method when given the same arguments.

### Special type conversion behavior

For historical reasons, `document.all` is an object that in the following ways behaves like `undefined`:

- It is loosely equal to `undefined` and `null`.
- It is falsy in boolean contexts.
- Its `typeof` is `"undefined"`.

These special behaviors ensure that code like:

```js
if (document.all) {
  // Assume that we are in IE; provide special logic
}
// Assume that we are in a modern browser
```

Will continue to provide modern behavior even if the code is run in a browser that implements `document.all` for compatibility reasons.

However, in all other contexts, `document.all` remains an object. For example:

- It is not strictly equal to either `undefined` or `null`.
- When used on the left-hand side of the nullish coalescing operator (`??`) or the optional chaining operator (`?.`), it will not cause the expression to short-circuit.

## See also

- `HTMLCollection`
