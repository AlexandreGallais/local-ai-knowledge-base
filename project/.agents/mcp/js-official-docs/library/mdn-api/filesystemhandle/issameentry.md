---
title: "FileSystemHandle: isSameEntry() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/filesystemhandle/issameentry/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# FileSystemHandle: isSameEntry() method

The **`isSameEntry()`** method of the
`FileSystemHandle` interface compares two `handles` to see if the associated entries (either a file or directory) match.

## Syntax

```js
isSameEntry(fileSystemHandle)
```

### Parameters

- `FileSystemHandle`
    The `FileSystemHandle` to match against the handle on which the method is
    invoked.

### Return value

A Promise that fulfills with a `Boolean`.

## Examples

The following function compares a single entry with an array of entries, and returns a
`Promise` that fulfills with a new array with any matching entries removed.

```js
async function removeMatches(fileEntry, entriesArr) {
  const newArr = [];
  for (const entry of entriesArr) {
    if (!(await fileEntry.isSameEntry(entry))) {
      newArr.push(entry);
    }
  }
  return newArr;
}
```

## See also

- File System API
- The File System Access API: simplifying access to local files
