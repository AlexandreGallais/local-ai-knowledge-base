---
title: "HighlightRegistry: entries() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/highlightregistry/entries/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HighlightRegistry: entries() method

The **`entries()`** method of the `HighlightRegistry` interface returns a new Iterator object that contains the `[name, highlight]` pairs for each element in the `HighlightRegistry` object, in insertion order.

`HighlightRegistry` is a `Map`-like object, so this is similar to using `Map.entries()`.

## Syntax

```js
entries()
```

### Parameters

None.

### Return value

A new iterator object that contains an array of `[name, highlight]` for each `Highlight` object in the `HighlightRegistry`, in insertion order.

## Examples

The code snippet below creates and registers two new highlights, and then logs the highlights and their names by using the iterator returned by the `entries()` method:

```js
const myHighlight1 = new Highlight();
const myHighlight2 = new Highlight();

CSS.highlights.set("first-highlight", myHighlight1);
CSS.highlights.set("second-highlight", myHighlight2);

const iter = CSS.highlights.entries();

console.log(iter.next().value); // ['first-highlight', Highlight]
console.log(iter.next().value); // ['second-highlight', Highlight]
```

The following code example shows how to iterate over the highlights in the registry by using a `for...of` loop:

```js
const myHighlight1 = new Highlight();
const myHighlight2 = new Highlight();

CSS.highlights.set("first-highlight", myHighlight1);
CSS.highlights.set("second-highlight", myHighlight2);

for (const [name, highlight] of CSS.highlights.entries()) {
  console.log(`Highlight ${name}`, highlight);
}
```

## See also

- `The CSS Custom Highlight API`
- CSS Custom Highlight API: The Future of Highlighting Text Ranges on the Web
