---
title: "FileSystem"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/filesystem/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# FileSystem

The File and Directory Entries API interface **`FileSystem`** is used to represent a file system. These objects can be obtained from the `filesystem` property on any file system entry. Some browsers offer additional APIs to create and manage file systems, such as Chrome's `requestFileSystem()` method.

This interface will not grant you access to the users' filesystem. Instead, you will have a "virtual drive" within the browser sandbox if you want to gain access to the users' file system, you need to invoke the user, for example by installing a Chrome extension. The relevant Chrome API can be found in the Chrome developer docs.

## Instance properties

- `FileSystem.name` (read-only)
    A string representing the file system's name. This name is unique among the entire list of exposed file systems.
- `FileSystem.root` (read-only)
    A `FileSystemDirectoryEntry` object which represents the file system's root directory. Through this object, you can gain access to all files and directories in the file system.

## Description

There are two ways to get access to a `FileSystem` object:

1. You can directly ask for one representing a sandboxed file system created just for your web app directly by calling `window.requestFileSystem()`. If that call is successful, it executes a callback handler, which receives as a parameter a `FileSystem` object describing the file system.
2. You can get it from a file system entry object, through its `filesystem` property.

## See also

- File and Directory Entries API
- `FileSystemEntry`, `FileSystemFileEntry`, and `FileSystemDirectoryEntry`
