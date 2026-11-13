---
title: "FileSystemEntry"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/filesystementry/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# FileSystemEntry

The **`FileSystemEntry`** interface of the File and Directory Entries API represents a single entry in a file system. The entry can be a file or a directory (directories are represented by the `FileSystemDirectoryEntry` interface). It includes methods for working with files—including copying, moving, removing, and reading files—as well as information about a file it points to—including the file name and its path from the root to the entry.

## Instance properties

_This interface provides the following properties._

- `filesystem` (read-only)
    A `FileSystem` object representing the file system in which the entry is located.
- `fullPath` (read-only)
    A string which provides the full, absolute path from the file system's root to the entry; it can also be thought of as a path which is relative to the root directory, prepended with a "/" character.
- `isDirectory` (read-only)
    A boolean value which is `true` if the entry represents a directory; otherwise, it's `false`.
- `isFile` (read-only)
    A Boolean which is `true` if the entry represents a file. If it's not a file, this value is `false`.
- `name` (read-only)
    A string containing the name of the entry (the final part of the path, after the last "/" character).

## Instance methods

_This interface defines the following methods._

- `copyTo()` (deprecated) (non-standard)
    Copies the file or directory to a new location on the file system.
- `getMetadata()` (deprecated) (non-standard)
    Obtains metadata about the file, such as its modification date and size.
- `getParent()`
    Returns a `FileSystemDirectoryEntry` representing the entry's parent directory.
- `moveTo()` (deprecated) (non-standard)
    Moves the file or directory to a new location on the file system, or renames the file or directory.
- `remove()` (deprecated) (non-standard)
    Removes the specified file or directory. You can only remove directories which are empty.
- `toURL()` (deprecated) (non-standard)
    Creates and returns a URL which identifies the entry. This URL uses the URL scheme `"filesystem:"`.

## Description

You don't create `FileSystemEntry` objects directly. Instead, you will receive an object based on this interface through other APIs. This interface serves as a base class for the `FileSystemFileEntry` and `FileSystemDirectoryEntry` interfaces, which provide features specific to file system entries representing files and directories, respectively.

The `FileSystemEntry` interface includes methods that you would expect for manipulating files and directories, but it also includes a convenient method for obtaining the URL of the entry: `toURL()`. It also introduces a new URL scheme: `filesystem:`.

You can use the `filesystem:` scheme on Google Chrome to see all the files and folders that are stored in the origin of your app. Just use `filesystem:` scheme for the root directory of the origin of the app. For example, if your app is in `http://www.example.com`, open `filesystem:http://www.example.com/temporary/` in a tab. Chrome shows a read-only list of all the files and folders stored the origin of your app.

## Examples

To see an example of how `toURL()` works, see the method description. The snippet below shows you how you can remove a file by name.

```js
// Taking care of the browser-specific prefixes.
window.requestFileSystem =
  window.requestFileSystem || window.webkitRequestFileSystem;

// …

// Opening a file system with temporary storage
window.requestFileSystem(
  TEMPORARY,
  1024 * 1024 /* 1MB */,
  (fs) => {
    fs.root.getFile(
      "log.txt",
      {},
      (fileEntry) => {
        fileEntry.remove(() => {
          console.log("File removed.");
        }, onError);
      },
      onError,
    );
  },
  onError,
);
```

## See also

- File and Directory Entries API
- `FileSystemFileEntry` and `FileSystemDirectoryEntry` are based on `FileSystemEntry`.
