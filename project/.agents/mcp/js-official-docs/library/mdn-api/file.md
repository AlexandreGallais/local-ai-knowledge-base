---
title: "File"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/file/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# File

The **`File`** interface provides information about files and allows JavaScript in a web page to access their content.

`File` objects are generally retrieved from a `FileList` object returned as a result of a user selecting files using the `` element, or from a drag and drop operation's `DataTransfer` object.

A `File` object is a specific kind of `Blob`, and can be used in any context that a Blob can. In particular, the following APIs accept both `Blob`s and `File` objects:

- `FileReader`
- `URL.createObjectURL()`
- `Window.createImageBitmap()` and `WorkerGlobalScope.createImageBitmap()`
- the `body` option to `fetch()`
- `XMLHttpRequest.send()`

See Using files from web applications for more information and examples.

## Constructor

- `File()`
    Returns a newly constructed `File`.

## Instance properties

_The `File` interface also inherits properties from the `Blob` interface._

- `File.lastModified` (read-only)
    Returns the last modified time of the file, in millisecond since the UNIX epoch (January 1st, 1970 at Midnight).
- `File.lastModifiedDate` (deprecated) (read-only) (non-standard)
    Returns the last modified `Date` of the file referenced by the `File` object.
- `File.name` (read-only)
    Returns the name of the file referenced by the `File` object.
- `File.webkitRelativePath` (read-only)
    Returns the path the URL of the `File` is relative to.

## Instance methods

_The `File` interface also inherits methods from the `Blob` interface._

## See also

- Using files from web applications
- `FileReader`
