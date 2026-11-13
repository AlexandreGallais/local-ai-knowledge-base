---
title: "Highlight: add() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/highlight/add/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Highlight: add() method

The **`add()`** method of the `Highlight` interface adds a new `AbstractRange` object to a highlight, to be styled using the `CSS Custom Highlight API`.

`Highlight` is a `Set`-like object, so this is similar to using `Set.add()`.

## Syntax

```js
add(range)
```

### Parameters

- `range`
    An `AbstractRange` object to add to the `Highlight`.

### Return value

The `Highlight` object, with the added range.

## Examples

The code snippet below shows how to add two ranges to a new highlight object:

```js
const highlight = new Highlight();

const range1 = new Range();
const range2 = new Range();

highlight.add(range1).add(range2);

console.log(highlight.size); // 2
```

## See also

- `The CSS Custom Highlight API`
- CSS Custom Highlight API: The Future of Highlighting Text Ranges on the Web
