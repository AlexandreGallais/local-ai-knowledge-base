---
title: "HighlightRegistry: keys() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/highlightregistry/keys/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HighlightRegistry: keys() method

The **`keys()`** method of the `HighlightRegistry` interface returns a new Iterator object that contains the keys for each `Highlight` object in the `HighlightRegistry` object in insertion order.

`HighlightRegistry` is a `Map`-like object, so this is similar to using `Map.keys()`.

## Syntax

```js
keys()
```

### Parameters

None.

### Return value

A new iterator object containing the names of each `Highlight` object in the registry, in insertion order.

## Examples

The following code snippet shows how to create and register three `Highlight` objects, and use the iterator returned by the `keys()` method to log their names:

```js
const fooHighlight = new Highlight();
const barHighlight = new Highlight();
const bazHighlight = new Highlight();

CSS.highlights.set("foo", fooHighlight);
CSS.highlights.set("bar", barHighlight);
CSS.highlights.set("baz", bazHighlight);

const iter = CSS.highlights.keys();

console.log(iter.next().value); // "foo"
console.log(iter.next().value); // "bar"
console.log(iter.next().value); // "baz"
```

The following code example shows how to iterate over the highlights in the registry by using a `for...of` loop:

```js
const fooHighlight = new Highlight();
const barHighlight = new Highlight();
const bazHighlight = new Highlight();

CSS.highlights.set("foo", fooHighlight);
CSS.highlights.set("bar", barHighlight);
CSS.highlights.set("baz", bazHighlight);

for (const name of CSS.highlights.keys()) {
  console.log(name);
}
```

## See also

- `The CSS Custom Highlight API`
- CSS Custom Highlight API: The Future of Highlighting Text Ranges on the Web
