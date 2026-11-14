---
title: "FileReaderSync: readAsText() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/filereadersync/readastext/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# FileReaderSync: readAsText() method

The **`readAsText()`** method of the `FileReaderSync` interface allows you to read `File` or `Blob` objects in a synchronous way into a string. This interface is only available in workers as it enables synchronous I/O that could potentially block.

## Syntax

```js
readAsText(blob)
readAsText(blob, encoding)
```

### Parameters

- `blob`
    The `File` or `Blob` to read.
- `encoding` (optional)
    The optional parameter specifies encoding to be used (e.g., `iso-8859-1` or `UTF-8`). If not present, the method will apply a detection algorithm for it.

### Return value

A string representing the input data.

### Exceptions

The following exceptions can be raised by this method:

- `NotFoundError` `DOMException`
    Thrown if the resource represented by the DOM `File` or `Blob` cannot be found, e.g., because it has been erased.
- `SecurityError` `DOMException`
    Thrown if one of the following problematic situation is detected:
    - the resource has been modified by a third party;
    - too many read are performed simultaneously;
    - the file pointed by the resource is unsafe for a use from the Web (like it is a system file).
- `NotReadableError` `DOMException`
    Thrown if the resource cannot be read due to a permission problem, like a concurrent lock.
- `EncodingError` `DOMException`
    Thrown if the resource is a data URL and exceed the limit length defined by each browser.

## See also

- File API
- `File`
- `FileReaderSync`
- `FileReader`
- `Blob`
