---
title: "FileReaderSync"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/filereadersync/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# FileReaderSync

The **`FileReaderSync`** interface allows you to read `File` or `Blob` objects synchronously. This interface is only available in workers as it enables synchronous I/O that could potentially block.

## Constructor

- `FileReaderSync()`
    Returns a new `FileReaderSync` object.

## Instance properties

This interface does not have any properties.

## Instance methods

- `FileReaderSync.readAsArrayBuffer()`
    This method converts a specified `Blob` or a `File` into an `ArrayBuffer` representing the input data as a binary string.
- `FileReaderSync.readAsBinaryString()` (deprecated)
    This method converts a specified `Blob` or a `File` into a string representing the input data as a binary string. This method is deprecated, consider using `readAsArrayBuffer()` instead.
- `FileReaderSync.readAsText()`
    This method converts a specified `Blob` or a `File` into a string representing the input data as a text string. The optional **`encoding`** parameter indicates the encoding to be used (e.g., iso-8859-1 or UTF-8). If not present, the method will apply a detection algorithm for it.
- `FileReaderSync.readAsDataURL()`
    This method converts a specified `Blob` or a `File` into a string representing the input data as a data URL.

## See also

- `FileReader`
- `Blob`
- `File`
