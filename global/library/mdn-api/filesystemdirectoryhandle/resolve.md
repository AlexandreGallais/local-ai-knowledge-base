---
title: "FileSystemDirectoryHandle: resolve() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/filesystemdirectoryhandle/resolve/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# FileSystemDirectoryHandle: resolve() method

The **`resolve()`** method of the
`FileSystemDirectoryHandle` interface returns an `Array` of
directory names from the parent handle to the specified child entry, with the name of
the child entry as the last array item.

## Syntax

```js
resolve(possibleDescendant)
```

### Parameters

- `possibleDescendant`
    The `FileSystemHandle` from which to return the relative path.

### Return value

A `Promise` which resolves with an `Array` of
strings, or `null` if `possibleDescendant` is not a descendant of this `FileSystemDirectoryHandle`.

### Exceptions

No exceptions are thrown.

## Examples

The following asynchronous function uses `resolve()` to find the path to a
chosen file, relative to a specified directory handle.

```js
async function returnPathDirectories(directoryHandle) {
  // Get a file handle by showing a file picker:
  const [handle] = await self.showOpenFilePicker();
  if (!handle) {
    // User canceled, or otherwise failed to open a file.
    return;
  }

  // Check if handle exists inside our directory handle
  const relativePaths = await directoryHandle.resolve(handle);

  if (relativePaths === null) {
    // Not inside directory handle
  } else {
    // relativePath is an array of names, giving the relative path
    for (const name of relativePaths) {
      // log each entry
      console.log(name);
    }
  }
}
```

## See also

- File System API
- The File System Access API: simplifying access to local files
