---
title: "Blob: Blob() constructor"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/blob/blob/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Blob: Blob() constructor

The **`Blob()`** constructor returns a
new `Blob` object. The content of the blob consists of the concatenation
of the values given in the parameter `blobParts`.

## Syntax

```js
new Blob(blobParts)
new Blob(blobParts, options)
```

### Parameters

- `blobParts` (optional)
    An iterable
    object such as an `Array`, having `ArrayBuffer`s,
    `TypedArray`s, `DataView`s, `Blob`s, strings,
    or a mix of any of such elements, that will be put inside the `Blob`.
    Strings should be well-formed Unicode, and lone surrogates are sanitized using the same algorithm as `String.prototype.toWellFormed()`.
    The resulting string is encoded as UTF-8.

- `options` (optional)
    An object which may specify any of the following properties:
    - `type` (optional)
        The MIME type of the data that will be stored into the blob. The
        default value is the empty string, (`""`).
    - `endings` (optional)
        How to interpret newline characters (`\n`) within the contents, if
        the data is text. The default value, `transparent`, copies newline
        characters into the blob without changing them. To convert newlines to the host
        system's native convention, specify the value `native`.

### Return value

A new `Blob` object containing the specified data.

## Examples

```js
const blobParts = ['<q id="a"><span id="b">hey!</span></q>']; // an array consisting of a single string
const blob = new Blob(blobParts, { type: "text/html" }); // the blob
```
