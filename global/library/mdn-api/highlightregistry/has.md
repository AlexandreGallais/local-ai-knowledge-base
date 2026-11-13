---
title: "HighlightRegistry: has() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/highlightregistry/has/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HighlightRegistry: has() method

The **`has()`** method of the `HighlightRegistry` interface returns a boolean indicating whether or not a `Highlight` object with the specified name exists in the registry.

`HighlightRegistry` is a `Map`-like object, so this is similar to using `Map.has()`.

## Syntax

```js
has(name)
```

### Parameters

- `name`
    The name of the `Highlight` object to test for presence in the registry.

### Return value

Returns `true` if a highlight with the specified name exists in the registry; otherwise `false`.

## Examples

```js
const fooHighlight = new Highlight();
CSS.highlights.set("foo", fooHighlight);

myHighlight.has("foo"); // true
myHighlight.has("bar"); // false
```

## See also

- `The CSS Custom Highlight API`
- CSS Custom Highlight API: The Future of Highlighting Text Ranges on the Web
