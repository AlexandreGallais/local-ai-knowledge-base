---
title: "FileSystemDirectoryHandle: keys() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/filesystemdirectoryhandle/keys/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# FileSystemDirectoryHandle: keys() method

The **`keys()`** method of the
`FileSystemDirectoryHandle` interface returns a new asynchronous iterator
for the iteration of the key of the entries within the `FileSystemDirectoryHandle`
on which this method is called.

## Syntax

```js
keys()
```

### Parameters

None.

### Return value

A new asynchronous iterator containing the keys of each entry within the `FileSystemDirectoryHandle`.

### Exceptions

- `NotAllowedError` `DOMException`
    Thrown if the `PermissionStatus.state` for the handle is not `'granted'` in `read` mode.
- `NotFoundError` `DOMException`
    Thrown if the current entry is not found.

## Examples

Use the `for await...of` loop can simplify the iteration process.

```js
const dirHandle = await window.showDirectoryPicker();

for await (const key of dirHandle.keys()) {
  console.log(key);
}
```

## See also

- File System API
- The File System Access API: simplifying access to local files
