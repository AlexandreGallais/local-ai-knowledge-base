---
title: "HighlightRegistry: values() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/highlightregistry/values/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HighlightRegistry: values() method

The **`values()`** method of the `HighlightRegistry` interface returns a new Iterator object that contains the values for each `Highlight` object in the `HighlightRegistry` object in insertion order.

`HighlightRegistry` is a `Map`-like object, so this is similar to using `Map.values()`.

## Syntax

```js
values()
```

### Parameters

None.

### Return value

A new iterator object containing each `Highlight` object in the registry, in insertion order.

## Examples

The following code snippet shows how to create and register three `Highlight` objects, and use the iterator returned by the `values()` method to log the highlights:

```js
const fooHighlight = new Highlight();
const barHighlight = new Highlight();
const bazHighlight = new Highlight();

CSS.highlights.set("foo", fooHighlight);
CSS.highlights.set("bar", barHighlight);
CSS.highlights.set("baz", bazHighlight);

const iter = CSS.highlights.values();

console.log(iter.next().value); // Highlight
console.log(iter.next().value); // Highlight
console.log(iter.next().value); // Highlight
```

The following code example shows how to iterate over the highlights in the registry by using a `for...of` loop:

```js
const fooHighlight = new Highlight();
const barHighlight = new Highlight();
const bazHighlight = new Highlight();

CSS.highlights.set("foo", fooHighlight);
CSS.highlights.set("bar", barHighlight);
CSS.highlights.set("baz", bazHighlight);

for (const highlight of CSS.highlights.values()) {
  console.log(highlight); // Highlight
}
```

## See also

- `The CSS Custom Highlight API`
- CSS Custom Highlight API: The Future of Highlighting Text Ranges on the Web
