---
title: "FileSystemDirectoryEntry"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/filesystemdirectoryentry/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# FileSystemDirectoryEntry

The **`FileSystemDirectoryEntry`** interface of the File and Directory Entries API represents a directory in a file system. It provides methods which make it possible to access and manipulate the files in a directory, as well as to access the entries within the directory.

## Instance properties

_This interface has no properties of its own, but inherits properties from its parent interface, `FileSystemEntry`._

## Instance methods

_This interface inherits methods from its parent interface, `FileSystemEntry`._

- `createReader()`
    Creates a `FileSystemDirectoryReader` object which can be used to read the entries in this directory.
- `getDirectory()`
    Returns a `FileSystemDirectoryEntry` object representing a directory located at a given path, relative to the directory on which the method is called.
- `getFile()`
    Returns a `FileSystemFileEntry` object representing a file located within the directory's hierarchy, given a path relative to the directory on which the method is called.
- `removeRecursively()` (deprecated) (non-standard)
    Removes the directory as well as all of its content, hierarchically iterating over its entire subtree of descendant files and directories.

## Description

You can create a new directory by calling `getDirectory()`. If you want to create subdirectories, create each child directory in sequence. If you try creating a directory using a full path that includes parent directories that do not exist yet, an error is returned. So create the hierarchy by recursively adding a new path after creating the parent directory.

## Examples

In the following code snippet, we create a directory called "Documents."

```js
// Taking care of the browser-specific prefixes.
window.requestFileSystem =
  window.requestFileSystem || window.webkitRequestFileSystem;
window.directoryEntry = window.directoryEntry || window.webkitDirectoryEntry;

// …

function onFs(fs) {
  fs.root.getDirectory(
    "Documents",
    { create: true },
    (directoryEntry) => {
      // directoryEntry.isFile === false
      // directoryEntry.isDirectory === true
      // directoryEntry.name === 'Documents'
      // directoryEntry.fullPath === '/Documents'
    },
    onError,
  );
}

// Opening a file system with temporary storage
window.requestFileSystem(TEMPORARY, 1024 * 1024 /* 1MB */, onFs, onError);
```

## See also

- File and Directory Entries API
- `FileSystemDirectoryReader`
- `FileSystemEntry`
- `FileSystemFileEntry`
