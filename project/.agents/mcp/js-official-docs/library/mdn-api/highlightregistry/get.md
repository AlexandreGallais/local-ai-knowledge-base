---
title: "HighlightRegistry: get() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/highlightregistry/get/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HighlightRegistry: get() method

The **`get()`** method of the `HighlightRegistry` interface returns the named `Highlight` object from the registry.

`HighlightRegistry` is a `Map`-like object, so this is similar to using `Map.get()`.

## Syntax

```js
get(name)
```

### Parameters

- `name`
    The name of the `Highlight` object to return from the registry. The name must be a `String`.

### Return value

The `Highlight` object associated with the specified name, or `undefined` if the name can't be found in the `HighlightRegistry`.

## Examples

The following code sample demonstrates how to create a new `Highlight`, add it to the registry, and retrieve it by its name using the `get()` method:

```js
const fooHighlight = new Highlight();
CSS.highlights.set("foo", fooHighlight);

console.log(CSS.highlights.get("foo")); // Returns the fooHighlight object.
```

## See also

- `The CSS Custom Highlight API`
- CSS Custom Highlight API: The Future of Highlighting Text Ranges on the Web
