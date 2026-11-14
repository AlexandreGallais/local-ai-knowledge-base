---
title: "HighlightRegistry: clear() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/highlightregistry/clear/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HighlightRegistry: clear() method

The **`clear()`** method of the `HighlightRegistry` interface removes all the `Highlight` objects registered in the `HighlightRegistry`.

`HighlightRegistry` is a `Map`-like object, so this is similar to using `Map.clear()`.

## Syntax

```js
clear()
```

### Parameters

None.

### Return value

None (`undefined`).

## Examples

The code snippet below registers two highlight objects in the registry and then clears the registry:

```js
const customHighlight1 = new Highlight(range1, range2);
const customHighlight2 = new Highlight(range3, range4, range5);

CSS.highlights.set("custom-highlight-1", customHighlight1);
CSS.highlights.set("custom-highlight-2", customHighlight2);

console.log(CSS.highlights.size); // 2

CSS.highlights.clear();
console.log(CSS.highlights.size); // 0
```

## See also

- `The CSS Custom Highlight API`
- CSS Custom Highlight API: The Future of Highlighting Text Ranges on the Web
