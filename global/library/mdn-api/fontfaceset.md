---
title: "FontFaceSet"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/fontfaceset/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# FontFaceSet

The **`FontFaceSet`** interface of the CSS Font Loading API manages the loading of font-faces and querying of their download status.

A `FontFaceSet` instance is a `Set`-like object that can hold an ordered set of `FontFace` objects.

This property is available as `Document.fonts`, or `self.fonts` in web workers.

## Instance properties

- `FontFaceSet.status` (read-only)
    Indicates the font-face's loading status. It will be one of `'loading'` or `'loaded'`.
- `FontFaceSet.ready` (read-only)
    `Promise` which resolves once font loading and layout operations have completed.
- `FontFaceSet.size` (read-only)
    Returns the number of values in the `FontFaceSet`.

## Instance methods

- `FontFaceSet.add()`
    Adds a font to the font set.
- `FontFaceSet.check()`
    A boolean value that indicates whether a font is loaded, but doesn't initiate a load when it isn't.
- `FontFaceSet.clear()`
    Removes all manually-added fonts from the font set. CSS-connected fonts are unaffected.
- `FontFaceSet.delete()`
    Removes a manually-added font from the font set. CSS-connected fonts are unaffected.
- `FontFaceSet.entries()`
    Returns a new iterator with the values for each element in the `FontFaceSet` in insertion order.
- `FontFaceSet.forEach()`
    Executes a provided function for each value in the `FontFaceSet` object.
- `FontFaceSet.has()`
    Returns a `Boolean` asserting whether an element is present with the given value.
- `FontFaceSet.keys()`
    An alias for `FontFaceSet.values()`.
- `FontFaceSet.load()`
    Returns a `Promise` which resolves to a list of font-faces for a requested font.
- `FontFaceSet.values()`
    Returns a new iterator object that yields the values for each element in the `FontFaceSet` object in insertion order.

## Events

- `loading`
    Fires when a font-face set has started loading.
- `loadingdone`
    Fires when a font face set has finished loading.
- `loadingerror`
    Fires when an error occurred while loading a font-face set.
