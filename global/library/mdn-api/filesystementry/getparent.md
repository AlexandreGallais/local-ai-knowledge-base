---
title: "FileSystemEntry: getParent() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/filesystementry/getparent/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# FileSystemEntry: getParent() method

The `FileSystemEntry` interface's method
**`getParent()`** obtains a
`FileSystemDirectoryEntry`.

## Syntax

```js
getParent(successCallback, errorCallback)
getParent(successCallback)
```

### Parameters

- `successCallback`
    A function which is called when the parent directory entry has been retrieved. The
    callback receives a single input parameter: a `FileSystemDirectoryEntry`
    object representing the parent directory. The parent of the root directory is
    considered to be the root directory, itself, so be sure to watch for that.
- `errorCallback` (optional)
    An optional callback which is executed if an error occurs. There's a single
    parameter: a `DOMException` describing what went wrong.

### Return value

None (`undefined`).

### Exceptions

- `DOMException.INVALID_STATE_ERR`
    The operation failed because the file system's state doesn't permit it. This can
    happen, for example, if the file system's cached state differs from the actual state
    of the file system.
- `DOMException.NOT_FOUND_ERR`
    The specified path could not be found.
- `DOMException.SECURITY_ERR`
    Security restrictions prohibit obtaining the parent directory's information.

## Examples

This example renames the file specified by the variable `fileEntry` to
`"newname.html"`.

```js
fileEntry.getParent(
  (parent) => {
    fileEntry.moveTo(parent, "newname.html", (updatedEntry) => {
      console.log(`File ${fileEntry.name} renamed to newname.html.`);
    });
  },
  (error) => {
    console.error(
      `An error occurred: Unable to rename ${fileEntry.name} to newname.html.`,
    );
  },
);
```

This is accomplished by first obtaining a `FileSystemDirectoryEntry`
object representing the directory the file is currently located in. Then
`moveTo()` is used to rename the file within that
directory.

## Using promises

Currently, there isn't a `Promise`-based version of this method. You can,
however, create a simple helper function to adapt it, like this:

```js
function getParentPromise(entry) {
  return new Promise((resolve, reject) => {
    entry.getParent(resolve, reject);
  });
}
```

A similar approach can be taken elsewhere in the File and Directory Entries API.

## See also

- File and Directory Entries API
