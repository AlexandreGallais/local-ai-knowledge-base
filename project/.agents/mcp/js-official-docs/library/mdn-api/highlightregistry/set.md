---
title: "HighlightRegistry: set() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/highlightregistry/set/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HighlightRegistry: set() method

The **`set()`** method of the `HighlightRegistry` interface adds or updates a `Highlight` object in the registry with the specified name.

`HighlightRegistry` is a `Map`-like object, so this is similar to using `Map.set()`.

## Syntax

```js
set(name, highlight)
```

### Parameters

- `name`
    The name of the `Highlight` object to add or update. The name must be a `String`.
- `highlight`
    The `Highlight` object to add or update. This must be a `Highlight` interface instance.

### Return value

The `HighlightRegistry` object.

## Examples

### Using set()

```js
const fooHighlight = new Highlight();
CSS.highlights.set("foo", fooHighlight);
```

### Using set() with chaining

Since the `set()` method returns the registry, you can chain the method call like below:

```js
const fooHighlight = new Highlight();
const barHighlight = new Highlight();
const bazHighlight = new Highlight();

CSS.highlights
  .set("foo", fooHighlight)
  .set("bar", barHighlight)
  .set("baz", bazHighlight);
```

## See also

- `The CSS Custom Highlight API`
- CSS custom highlight API module
- CSS Custom Highlight API: The Future of Highlighting Text Ranges on the Web
