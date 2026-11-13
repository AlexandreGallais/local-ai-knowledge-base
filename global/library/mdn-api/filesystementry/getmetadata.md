---
title: "FileSystemEntry: getMetadata() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/filesystementry/getmetadata/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# FileSystemEntry: getMetadata() method

The `FileSystemEntry` interface's method
**`getMetadata()`** obtains a
`Metadata` object with information about the file system entry, such as
its modification date and time and its size.

## Syntax

```js
getMetadata(successCallback)
getMetadata(successCallback, errorCallback)
```

### Parameters

- `successCallback`
    A function which is called when the copy operation is successfully completed.
    Receives a single input parameter: a `Metadata` object with information
    about the file.
- `errorCallback` (optional)
    An optional callback which is executed if an error occurs while looking up the
    metadata. There's a single parameter: a `DOMException` describing what went
    wrong.

### Return value

None (`undefined`).

### Exceptions

- `DOMException.NOT_FOUND_ERR`
    The `FileSystemEntry` refers to an item which doesn't exist.
- `DOMException.SECURITY_ERR`
    Security restrictions prohibit obtaining the requested metadata.

## Examples

This example checks the size of a log file in a temporary folder and, if it exceeds a
megabyte, moves it into a different directory.

```js
workingDirectory.getFile(
  "tmp/log.txt",
  {},
  (fileEntry) => {
    fileEntry.getMetadata((metadata) => {
      if (metadata.size > 1048576) {
        workingDirectory.getDirectory(
          "log",
          {},
          (dirEntry) => {
            fileEntry.moveTo(dirEntry);
          },
          handleError,
        );
      }
    });
  },
  handleError,
);
```

## See also

- File and Directory Entries API
