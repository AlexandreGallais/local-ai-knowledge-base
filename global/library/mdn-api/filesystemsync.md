---
title: "FileSystemSync"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/filesystemsync/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# FileSystemSync

In the File and Directory Entries API, a `FileSystemSync` object represents a file system. It has two properties.

> **Warning:**
> This interface is deprecated and is no more on the standard track.
> _Do not use it anymore._ Use the File System API instead.

## Instance properties

- `name` (read-only) (non-standard) (deprecated)
    A string that represents the name of the file system. The name must be unique across the list of exposed file systems.
- `root` (read-only) (non-standard) (deprecated)
    A `DirectoryEntry` that is the root directory of the file system.

## Description

The `FileSystemSync` object is your gateway to the entire API and you will use it a lot. So once you have a reference, cache the object in a global variable or class property.

## Specifications

This feature is not part of any specification anymore. It is no longer on track to become a standard.

## See also

- File and Directory Entries API
