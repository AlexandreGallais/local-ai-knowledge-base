---
title: "HighlightRegistry: delete() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/highlightregistry/delete/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HighlightRegistry: delete() method

The **`delete()`** method of the `HighlightRegistry` interface removes the named `Highlight` object from the `HighlightRegistry`.

`HighlightRegistry` is a `Map`-like object, so this is similar to using `Map.delete()`.

## Syntax

```js
delete(customHighlightName)
```

### Parameters

- `customHighlightName`
    The name, as a `String`, of the `Highlight` object to remove from the `HighlightRegistry`.

### Return value

Returns `true` if a `Highlight` object under the provided name was in the `HighlightRegistry`; otherwise `false`.

## Examples

The following code sample registers a highlight in the registry, and then deletes it:

```js
const myHighlight = new Highlight(range1, range2);

CSS.highlights.set("my-highlight", myHighlight);

CSS.highlights.delete("foo"); // false
CSS.highlights.delete("my-highlight"); // true
```

## See also

- `The CSS Custom Highlight API`
- CSS Custom Highlight API: The Future of Highlighting Text Ranges on the Web
