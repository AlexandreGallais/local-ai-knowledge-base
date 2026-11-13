---
title: "Metadata: modificationTime property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/metadata/modificationtime/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Metadata: modificationTime property

The read-only **`modificationTime`**
property of the `Metadata` interface is a `Date` object which
specifies the date and time the file system entry (or the data referenced by the
entry) was last modified. A file system entry is considered to have been
modified if the metadata or the contents of the referenced file (or directory, or
whatever other kind of file system entry might exist on the platform in use) has
changed.

## Value

A `Date` timestamp indicating when the file system entry was last changed.

## Examples

This example tries to get a particular working file at `tmp/work-file.json`.
Once that file has been found, its metadata is obtained and the file's modification
timestamp year is compared to the current year. If it was last modified in a year at
least five prior to the current year, the file is removed and a new one is created.

```js
workingDirectory.getFile(
  "tmp/work-file.json",
  { create: true },
  (fileEntry) => {
    fileEntry.getMetadata((metadata) => {
      if (
        new Date().getFullYear() - metadata.modificationTime.getFullYear() >=
        5
      ) {
        fileEntry.remove(() => {
          workingDirectory.getFile(
            "tmp/work-file.json",
            { create: true },
            (newEntry) => {
              fileEntry = newEntry;
            },
          );
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
