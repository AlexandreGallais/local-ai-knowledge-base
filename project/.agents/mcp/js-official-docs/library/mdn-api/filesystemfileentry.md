---
title: "FileSystemFileEntry"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/filesystemfileentry/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# FileSystemFileEntry

The **`FileSystemFileEntry`** interface of the File and Directory Entries API represents a file in a file system. It offers properties describing the file's attributes, as well as the `file()` method, which creates a `File` object that can be used to read the file.

## Instance properties

_Inherits the properties of its parent interface, `FileSystemEntry`, but has no properties unique to this interface._

## Instance methods

- `createWriter()` (deprecated) (non-standard)
    Returns a `FileWriter` object which can be used to write data into the file represented by the directory entry.
- `file()`
    Creates a new `File` object which can be used to read the file.

## See also

- File and Directory Entries API
