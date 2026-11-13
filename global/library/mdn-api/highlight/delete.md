---
title: "Highlight: delete() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/highlight/delete/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Highlight: delete() method

The **`delete()`** method of the `Highlight` interface removes a specified `AbstractRange` object from a `Highlight` object.

`Highlight` is a `Set`-like object, so this is similar to using `Set.delete()`.

## Syntax

```js
delete(range)
```

### Parameters

- `range`
    The `AbstractRange` object to remove from the `Highlight`.

### Return value

Returns `true` if `range` was already in `Highlight`; otherwise `false`.

## Examples

The code snippet below shows how to create a new highlight with two ranges, and then delete one of them:

```js
const range1 = new Range();
const range2 = new Range();

const highlight = new Highlight(range1, range2);
console.log(highlight.size); // 2

highlight.delete(range1);
console.log(highlight.size); // 1
```

## See also

- `The CSS Custom Highlight API`
- CSS Custom Highlight API: The Future of Highlighting Text Ranges on the Web
