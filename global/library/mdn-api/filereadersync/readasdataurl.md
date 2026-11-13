---
title: "FileReaderSync: readAsDataURL() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/filereadersync/readasdataurl/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# FileReaderSync: readAsDataURL() method

The **`readAsDataURL()`** method of the `FileReaderSync` interface allows you to read `File` or `Blob` objects in a synchronous way into a string representing a data URL. This interface is only available in workers as it enables synchronous I/O that could potentially block.

## Syntax

```js
readAsDataURL(blob)
```

### Parameters

- `blob`
    The `File` or `Blob` to read.

### Return value

A string representing the input data as a data URL.

### Exceptions

The following exceptions can be raised by this method:

- `NotFoundError` `DOMException`
    Thrown if the resource represented by the DOM `File` or `Blob` cannot be found, e.g., because it has been erased.
- `SecurityError` `DOMException`
    Thrown if one of the following problematic situation is detected:
    - the resource has been modified by a third party;
    - too many read operations are performed simultaneously;
    - the file pointed by the resource is unsafe for a use from the Web (like it is a system file).
- `NotReadableError` `DOMException`
    Thrown if the resource cannot be read due to a permission problem, like a concurrent lock.
- `EncodingError` `DOMException`
    Thrown if the resource is a data URL and exceed the limit length defined by each browser.

## See also

- File and Directory Entries API
- `File`
- `FileReaderSync`
- `FileReader`
- `Blob`
