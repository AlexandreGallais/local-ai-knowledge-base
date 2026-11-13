---
title: "File: File() constructor"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/file/file/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# File: File() constructor

The **`File()`** constructor creates a new `File`
object instance.

## Syntax

```js
new File(fileBits, fileName)
new File(fileBits, fileName, options)
```

### Parameters

- `fileBits`
    An iterable
    object such as an `Array`, having `ArrayBuffer`s,
    `TypedArray`s, `DataView`s, `Blob`s, strings,
    or a mix of any of such elements, that will be put inside the `File`.
    Note that strings here are encoded as UTF-8, unlike the usual JavaScript UTF-16 strings.
- `fileName`
    A string representing the file name or the path to the file.
- `options` (optional)
    An options object containing optional attributes for the file. Available options are
    as follows:
    - `type` (optional)
        A string representing the MIME type of the
        content that will be put into the file. Defaults to a value of `""`.
    - `endings` (optional)
        How to interpret newline characters (`\n`) within the contents, if
        the data is text. The default value, `transparent`, copies newline
        characters into the blob without changing them. To convert newlines to the host
        system's native convention, specify the value `native`.
    - `lastModified` (optional)
        A number representing the number of milliseconds
        between the Unix time epoch and when the file was last modified. Defaults to a
        value of `Date.now()`.

## Examples

```js
const file = new File(["foo"], "foo.txt", {
  type: "text/plain",
});
```

## See also

- `FileReader`
- `Blob`
