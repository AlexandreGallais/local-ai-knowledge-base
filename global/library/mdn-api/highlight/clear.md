---
title: "Highlight: clear() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/highlight/clear/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Highlight: clear() method

The **`clear()`** method of the `Highlight` interface removes all the `AbstractRange` objects from a `Highlight` object.

`Highlight` is a `Set`-like object, so this is similar to using `Set.clear()`.

## Syntax

```js
clear()
```

### Parameters

None.

### Return value

None (`undefined`).

## Examples

The code snippet below shows how to create a new highlight with two ranges, and then clear it:

```js
const highlight = new Highlight(range1, range2);
console.log(highlight.size); // 2

highlight.clear();
console.log(highlight.size); // 0
```

## See also

- `The CSS Custom Highlight API`
- CSS Custom Highlight API: The Future of Highlighting Text Ranges on the Web
