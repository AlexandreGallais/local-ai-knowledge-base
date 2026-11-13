---
title: "FileSystemDirectoryHandle"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/filesystemdirectoryhandle/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# FileSystemDirectoryHandle

The **`FileSystemDirectoryHandle`** interface of the `File System API` provides a handle to a file system directory.

The interface can be accessed via the `window.showDirectoryPicker()`, `StorageManager.getDirectory()`, `DataTransferItem.getAsFileSystemHandle()`, and `FileSystemDirectoryHandle.getDirectoryHandle()` methods.

## Instance properties

_Inherits properties from its parent, `FileSystemHandle`._

## Instance methods

_Inherits methods from its parent, `FileSystemHandle`._

Regular methods:

- `FileSystemDirectoryHandle.getDirectoryHandle()`
    Returns a `Promise` fulfilled with a `FileSystemDirectoryHandle` for a subdirectory with the specified name within the directory handle on which the method is called.
- `FileSystemDirectoryHandle.getFileHandle()`
    Returns a `Promise` fulfilled with a `FileSystemFileHandle` for a file with the specified name, within the directory the method is called.
- `FileSystemDirectoryHandle.removeEntry()`
    Attempts to asynchronously remove an entry if the directory handle contains a file or directory called the name specified.
- `FileSystemDirectoryHandle.resolve()`
    Returns a `Promise` fulfilled with an `Array` of directory names from the parent handle to the specified child entry, with the name of the child entry as the last array item.

Asynchronous iterator methods:

- `FileSystemDirectoryHandle.entries()`
    Returns a new _async iterator_ of a given object's own enumerable property `[key, value]` pairs.
- `FileSystemDirectoryHandle.keys()`
    Returns a new _async iterator_ containing the keys for each item in `FileSystemDirectoryHandle`.
- `FileSystemDirectoryHandle.values()`
    Returns a new _async iterator_ containing the values for each index in the `FileSystemDirectoryHandle` object.
- `FileSystemDirectoryHandleSymbol.asyncIterator`
    Returns a new _async iterator_ of a given object's own enumerable property `[key, value]` pairs.

## Examples

### Return directory handle

The following example returns a directory handle with the specified name; if the directory does not already exist it is created.

```js
const dirName = "directoryToGetName";

// assuming we have a directory handle: 'currentDirHandle'
const subDir = await currentDirHandle.getDirectoryHandle(dirName, {
  create: true,
});
```

### Return file path

The following asynchronous function uses `resolve()` to find the path to a chosen file, relative to a specified directory handle.

```js
async function returnPathDirectories(directoryHandle) {
  // Get a file handle by showing a file picker:
  const handle = await self.showOpenFilePicker();
  if (!handle) {
    // User canceled, or otherwise failed to open a file.
    return;
  }

  // Check if handle exists inside our directory handle
  const relativePaths = await directoryHandle.resolve(handle);

  if (relativePaths === null) {
    // Not inside directory handle
  } else {
    // relativePath is an array of names, giving the relative path

    for (const name of relativePaths) {
      // log each entry
      console.log(name);
    }
  }
}
```

### Return handles for all files in a directory

The following example scans recursively through a directory to return `FileSystemFileHandle` objects for each file in that directory:

```js
async function* getFilesRecursively(entry) {
  if (entry.kind === "file") {
    const file = await entry.getFile();
    if (file !== null) {
      file.relativePath = getRelativePath(entry);
      yield file;
    }
  } else if (entry.kind === "directory") {
    for await (const handle of entry.values()) {
      yield* getFilesRecursively(handle);
    }
  }
}
for await (const fileHandle of getFilesRecursively(directoryHandle)) {
  console.log(fileHandle);
}
```

## See also

- File System API
- The File System Access API: simplifying access to local files
