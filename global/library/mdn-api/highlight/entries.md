---
title: "Highlight: entries() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/highlight/entries/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Highlight: entries() method

The **`entries()`** method of the `Highlight` interface returns a new Iterator object that contains an array of `[range, range]` for each `AbstractRange` object in the `Highlight` object, in insertion order.

`Highlight` is a `Set`-like object, so this is similar to using `Set.entries()`.

## Syntax

```js
entries()
```

### Parameters

None.

### Return value

A new iterator object that contains an array of `[range, range]` for each `AbstractRange` object in the given `Highlight`, in insertion order.

## Examples

The code snippet below shows how to create a new highlight with two ranges, and then log the ranges by using the iterator returned by the `entries()` method:

```js
const text = new Text("Time is an illusion. Lunchtime doubly so.");

const range1 = document.createRange();
range1.setStart(text, 0);
range1.setEnd(text, 4);

const range2 = document.createRange();
range2.setStart(text, 21);
range2.setEnd(text, 30);

const myHighlight = new Highlight();
myHighlight.add(range1);
myHighlight.add(range2);

const iter = myHighlight.entries();

console.log(iter.next().value); // [Range, Range]
console.log(iter.next().value); // [Range, Range]
```

The following code example shows how to iterate over the ranges in a highlight by using a `for...of` loop:

```js
const text = new Text("Time is an illusion. Lunchtime doubly so.");

const range1 = document.createRange();
range1.setStart(text, 0);
range1.setEnd(text, 4);

const range2 = document.createRange();
range2.setStart(text, 21);
range2.setEnd(text, 30);

const highlight = new Highlight();
highlight.add(range1);
highlight.add(range2);

for (const [range] of highlight.entries()) {
  console.log(range.toString());
  // Time
  // Lunchtime
}
```

## See also

- `The CSS Custom Highlight API`
- CSS Custom Highlight API: The Future of Highlighting Text Ranges on the Web
