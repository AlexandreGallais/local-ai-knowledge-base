---
title: "FileSystemSyncAccessHandle: truncate() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/filesystemsyncaccesshandle/truncate/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# FileSystemSyncAccessHandle: truncate() method

The **`truncate()`** method of the
`FileSystemSyncAccessHandle` interface resizes the file associated with the handle to a specified number of bytes.

> **Note:**
> In earlier versions of the spec, `close()`, `flush()`, `getSize()`, and `truncate()` were wrongly specified as asynchronous methods, and older versions of some browsers implement them in this way. However, all current browsers that support these methods implement them as synchronous methods.

## Syntax

```js
truncate(newSize)
```

### Parameters

- `newSize`
    The number of bytes to resize the file to.

### Return value

None (`undefined`).

### Exceptions

- `InvalidStateError` `DOMException`
    Thrown if the associated access handle is already closed, or if the modification of the file's binary data otherwise fails.
- `QuotaExceededError`
    Thrown if the `newSize` is larger than the original size of the file, and exceeds the browser's storage quota.
- `TypeError`
    Thrown if the underlying file system does not support setting the file size to the new size.

## Examples

```js
async function truncateFile() {
  // Get handle to draft file
  const root = await navigator.storage.getDirectory();
  const draftHandle = await root.getFileHandle("draft.txt", { create: true });
  // Get sync access handle
  const accessHandle = await draftHandle.createSyncAccessHandle();

  // Truncate the file to 0 bytes
  accessHandle.truncate(0);

  // Persist changes to disk.
  accessHandle.flush();

  // Always close FileSystemSyncAccessHandle if done.
  accessHandle.close();
}
```

## See also

- File System API
- The File System Access API: simplifying access to local files
