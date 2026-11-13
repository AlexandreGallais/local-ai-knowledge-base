---
title: "FileSystemDirectoryEntry: createReader() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/filesystemdirectoryentry/createreader/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# FileSystemDirectoryEntry: createReader() method

The `FileSystemDirectoryEntry` interface's method
**`createReader()`** returns a
`FileSystemDirectoryReader` object which can be used to read the entries in
the directory.

## Syntax

```js
createReader()
```

### Parameters

None.

### Return value

A `FileSystemDirectoryReader` object which can be used to read the
directory's entries.

## Examples

This example creates an async function called `readDirectory()`, which fetches all of
the entries in the specified `FileSystemDirectoryEntry` and returns them in
an array.

```js
async function readDirectory(directory) {
  const dirReader = directory.createReader();
  const entries = [];

  while (true) {
    const results = await new Promise((resolve, reject) => {
      dirReader.readEntries(resolve, reject);
    });

    if (!results.length) {
      break;
    }

    for (const entry of results) {
      entries.push(entry);
    }
  }

  return entries;
}
```

This works by calling `readEntries()` repetitively to get all the entries in the directory, concatenating each batch to the array. When it returns an empty array, all entries have been read, and the loop ends.

## See also

- File and Directory Entries API
- `FileSystemDirectoryReader`
- `FileSystemDirectoryEntry`
- `FileSystemFileEntry`
- `FileSystemEntry`
