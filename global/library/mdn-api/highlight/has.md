---
title: "Highlight: has() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/highlight/has/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Highlight: has() method

The **`has()`** method of the `Highlight` interface returns a boolean indicating whether an `AbstractRange` object exists in a `Highlight` object or not.

`Highlight` is a `Set`-like object, so this is similar to using `Set.has()`.

## Syntax

```js
has(range)
```

### Parameters

- `range`
    The `AbstractRange` object to test for presence in the `Highlight` object.

### Return value

Returns `true` if the specified range exists in the `Highlight` object; otherwise `false`.

## Examples

The code snippet below creates two ranges, and a highlight object that contains one of them. The code then uses the `has()` method to check whether each range exists in the highlight:

```js
const range1 = new Range();
const range2 = new Range();
const myHighlight = new Highlight(range1);

myHighlight.has(range1); // true
myHighlight.has(range2); // false
```

## See also

- `The CSS Custom Highlight API`
- CSS Custom Highlight API: The Future of Highlighting Text Ranges on the Web
