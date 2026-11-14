---
title: "FileSystemDirectoryHandle: removeEntry() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/filesystemdirectoryhandle/removeentry/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# FileSystemDirectoryHandle: removeEntry() method

The **`removeEntry()`** method of the
`FileSystemDirectoryHandle` interface attempts to remove an entry if the
directory handle contains a file or directory called the name specified.

## Syntax

```js
removeEntry(name)
removeEntry(name, options)
```

### Parameters

- `name`
    A string representing the `FileSystemHandle.name` of
    the entry you wish to remove.
- `options` (optional)
    An optional object containing options, which are as follows:
    - `recursive` (optional)
        A boolean value, which defaults to `false`. When set to `true` entries will be removed recursively.

### Return value

A `Promise` which resolves with `undefined`.

### Exceptions

- `TypeError`
    Thrown if the name is not a valid string or contains characters not allowed on the file system.
- `NotAllowedError` `DOMException`
    Thrown if the `PermissionStatus.state` for the handle is not `'granted'` in `readwrite` mode.
- `InvalidModificationError` `DOMException`
    Thrown if `recursive` is set to false and the entry to be removed has children.
- `NotFoundError` `DOMException`
    Thrown if the current entry is not found or if the entry of the specific name is not found or matched.

## Examples

The following example removes an entry within the directory handle.

```js
const entryName = "entryToRemove";

// assuming we have a directory handle: 'currentDirHandle'
currentDirHandle.removeEntry(entryName).then(() => {
  // code to run if removing was successful
});
```

## See also

- File System API
- The File System Access API: simplifying access to local files
