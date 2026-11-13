---
title: "Metadata: size property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/metadata/size/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Metadata: size property

The read-only **`size`** property of
the `Metadata` interface specifies the size, in bytes, of the referenced
file or other file system object on disk.

## Value

A number indicating the size of the file in bytes.

## Examples

This example checks the size of a log file and removes it if it's larger than a
megabyte.

```js
workingDirectory.getFile(
  "log/important.log",
  {},
  (fileEntry) => {
    fileEntry.getMetadata((metadata) => {
      if (metadata.size > 1048576) {
        fileEntry.remove(() => {
          /* log file removed; do something clever here */
        });
      }
    });
  },
  handleError,
);
```

## Specifications

This feature has been removed from all specification and is not in the process of being standardized.

## See also

- File and Directory Entries API
- `Metadata`
- `FileSystemEntry.getMetadata()`
- `FileSystemFileEntry`
