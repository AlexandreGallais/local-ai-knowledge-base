---
title: "FileSystemSyncAccessHandle: write() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/filesystemsyncaccesshandle/write/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# FileSystemSyncAccessHandle: write() method

The **`write()`** method of the
`FileSystemSyncAccessHandle` interface writes the content of a specified buffer to the file associated with the handle, optionally at a given offset.

Files within the origin private file system are not visible to end-users, therefore are not subject to the same security checks as methods running on files within the user-visible file system. As a result, writes performed using `FileSystemSyncAccessHandle.write()` are much more performant. This makes them suitable for significant, large-scale file updates such as SQLite database modifications.

## Syntax

```js
write(buffer, options)
```

### Parameters

- `buffer`
    An `ArrayBuffer` or `ArrayBufferView` (such as a `DataView`) representing the buffer to be written to the file.
- `options` (optional)
    An options object containing the following properties:
    - `at`
        A number representing the offset in bytes from the start of the file that the buffer should be written at.

> **Note:**
> You cannot directly manipulate the contents of an `ArrayBuffer`. Instead, you create a typed array object like an `Int8Array` or a `DataView` object, which represents the buffer in a specific format, and use that to read and write the contents of the buffer.

### Return value

A number representing the number of bytes written to the file.

### Exceptions

- `InvalidStateError` `DOMException`
    Thrown if the associated access handle is already closed, or if the modification of the file's binary data completely fails.
- `QuotaExceededError`
    Thrown if the increased data capacity exceeds the browser's storage quota.
- `TypeError`
    Thrown if the underlying file system does not support writing the file from the specified file offset.

## Examples

The following asynchronous event handler function is contained inside a Web Worker. On receiving a message from the main thread it:

- Creates a synchronous file access handle.
- Gets the size of the file and creates an `ArrayBuffer` to contain it.
- Reads the file contents into the buffer.
- Encodes the message and writes it to the end of the file.
- Persists the changes to disk and closes the access handle.

```js
onmessage = async (e) => {
  // Retrieve message sent to work from main script
  const message = e.data;

  // Get handle to draft file
  const root = await navigator.storage.getDirectory();
  const draftHandle = await root.getFileHandle("draft.txt", { create: true });
  // Get sync access handle
  const accessHandle = await draftHandle.createSyncAccessHandle();

  // Get size of the file.
  const fileSize = accessHandle.getSize();
  // Read file content to a buffer.
  const buffer = new DataView(new ArrayBuffer(fileSize));
  const readBuffer = accessHandle.read(buffer, { at: 0 });

  // Write the message to the end of the file.
  const encoder = new TextEncoder();
  const encodedMessage = encoder.encode(message);
  const writeBuffer = accessHandle.write(encodedMessage, { at: readBuffer });

  // Persist changes to disk.
  accessHandle.flush();

  // Always close FileSystemSyncAccessHandle if done.
  accessHandle.close();
};
```

> **Note:**
> In earlier versions of the spec, `close()`, `flush()`, `getSize()`, and `truncate()` were wrongly specified as asynchronous methods, and older versions of some browsers implement them in this way. However, all current browsers that support these methods implement them as synchronous methods.

## See also

- File System API
- The File System Access API: simplifying access to local files
