---
title: "FileSystemDirectoryReader"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/filesystemdirectoryreader/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# FileSystemDirectoryReader

The `FileSystemDirectoryReader` interface of the File and Directory Entries API lets you access the `FileSystemFileEntry`-based objects (generally `FileSystemFileEntry` or `FileSystemDirectoryEntry`) representing each entry in a directory.

## Instance methods

- `readEntries()`
    Returns an array containing some number of the directory's entries. Each item in the array is an object based on `FileSystemEntry`—typically either `FileSystemFileEntry` or `FileSystemDirectoryEntry`.

## See also

- File and Directory Entries API
- `FileSystemDirectoryEntry`
- `FileSystem`
