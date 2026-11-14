---
title: "FileSystemEntry: fullPath property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/filesystementry/fullpath/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# FileSystemEntry: fullPath property

The read-only **`fullPath`** property
of the `FileSystemEntry` interface returns a string
specifying the full, absolute path from the file system's root to the file represented
by the entry.

This can also be thought of as a path which is relative to the root directory, with a
"/" prepended to it to make it absolute.

## Value

A string indicating the entry's full path.

## Examples

This example shows a function which is called with a file system; it then gets a
`FileSystemFileEntry` for a file named `data.json` and returns
its full path.

```js
function gotFileSystem(fs) {
  let path = "";

  fs.root.getFile(
    "data.json",
    { create: true, exclusive: true },
    (entry) => {
      path = fullPath;
    },
    handleError(error),
  );

  return path;
}
```

Obviously, this is somewhat contrived, since we know that the file's full path is
`"/data.json"`, having just looked it up ourselves, but the concept holds up
for scenarios in which you don't know it.

## See also

- File and Directory Entries API
- `FileSystemEntry`
