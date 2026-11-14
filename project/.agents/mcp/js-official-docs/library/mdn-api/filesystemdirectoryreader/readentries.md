---
title: "FileSystemDirectoryReader: readEntries() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/filesystemdirectoryreader/readentries/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# FileSystemDirectoryReader: readEntries() method

The `FileSystemDirectoryReader` interface's **`readEntries()`** method retrieves the directory entries
within the directory being read and delivers them in an array to a provided callback function.

The objects in the array are all based upon `FileSystemEntry`.
Generally, they are either `FileSystemFileEntry` objects, which represent standard files, or `FileSystemDirectoryEntry` objects, which represent directories.

## Syntax

```js
readEntries(successCallback)
readEntries(successCallback, errorCallback)
```

### Parameters

- `successCallback`
    A function which is called when the directory's contents have been retrieved. The
    function receives a single input parameter: an array of file system entry objects,
    each based on `FileSystemEntry`. Generally, they are either
    `FileSystemFileEntry` objects, which represent standard files, or
    `FileSystemDirectoryEntry` objects, which represent directories. If there
    are no files left, or you've already called `readEntries()` on this
    `FileSystemDirectoryReader`, the array is empty.
- `errorCallback` (optional)
    A callback function which is called if an error occurs while reading from the
    directory. It receives one input parameter: a `DOMException` object
    describing the error which occurred.

### Return value

None (`undefined`).

## Examples

See `DataTransferItem.webkitGetAsEntry()` for example code that uses this method.

## Browser compatibility

In Chromium-based browsers, `readEntries()` will only return the first 100 `FileSystemEntry` instances. In order to obtain all of the
instances, `readEntries()` must be called multiple times.

## See also

- File and Directory Entries API
- `FileSystemDirectoryEntry`
- `FileSystem`
