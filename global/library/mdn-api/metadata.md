---
title: "Metadata"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/metadata/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Metadata

The **`Metadata`** interface contains information about a file system entry. This metadata includes the file's size and modification date and time.

> **Note:**
> This interface isn't available through the global scope; instead, you obtain a `Metadata` object describing a `FileSystemEntry` using the method `FileSystemEntry.getMetadata()`.

## Instance properties

- `modificationTime` (read-only) (experimental) (non-standard)
    A `Date` object indicating the date and time the entry was modified.
- `size` (read-only) (experimental) (non-standard)
    A 64-bit unsigned integer indicating the size of the entry in bytes.

## Specifications

This feature has been removed from all specification and is not in the process of being standardized.

## See also

- File and Directory Entries API
- `FileSystemEntry`
- `FileSystemFileEntry` and `FileSystemDirectoryEntry`
