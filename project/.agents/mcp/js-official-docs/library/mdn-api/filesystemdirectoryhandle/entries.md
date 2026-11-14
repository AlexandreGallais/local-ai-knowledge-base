---
title: "FileSystemDirectoryHandle: entries() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/filesystemdirectoryhandle/entries/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# FileSystemDirectoryHandle: entries() method

The **`entries()`** method of the
`FileSystemDirectoryHandle` interface returns a new asynchronous iterator
for the iteration of the key-value pairs of the entries within the `FileSystemDirectoryHandle`
on which this method is called. The key-value pairs are
in the form of an array like `[key, value]`.

## Syntax

```js
entries()
```

### Parameters

None.

### Return value

A new asynchronous iterator containing the key-value pairs of each entry within the `FileSystemDirectoryHandle`.

### Exceptions

- `NotAllowedError` `DOMException`
    Thrown if the `PermissionStatus.state` for the handle is not `'granted'` in `read` mode.
- `NotFoundError` `DOMException`
    Thrown if the current entry is not found.

## Examples

Use the `for await...of` loop can simplify the iteration process.

```js
const dirHandle = await window.showDirectoryPicker();

for await (const [key, value] of dirHandle.entries()) {
  console.log({ key, value });
}
```

## See also

- File System API
- The File System Access API: simplifying access to local files
