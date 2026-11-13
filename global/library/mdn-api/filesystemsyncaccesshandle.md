---
title: "FileSystemSyncAccessHandle"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/filesystemsyncaccesshandle/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# FileSystemSyncAccessHandle

The **`FileSystemSyncAccessHandle`** interface of the `File System API` represents a synchronous handle to a file system entry.

This class is only accessible inside dedicated Web Workers (so that its methods do not block execution on the main thread) for files within the origin private file system, which is not visible to end-users.

As a result, its methods are not subject to the same security checks as methods running on files within the user-visible file system, and so are much more performant. This makes them suitable for significant, large-scale file updates such as SQLite database modifications.

The interface is accessed through the `FileSystemFileHandle.createSyncAccessHandle()` method.

> **Note:**
> In earlier versions of the spec, `close()`, `flush()`, `getSize()`, and `truncate()` were wrongly specified as asynchronous methods, and older versions of some browsers implement them in this way. However, all current browsers that support these methods implement them as synchronous methods.

## Instance properties

None.

## Instance methods

- `close()`
    Closes an open synchronous file handle, disabling any further operations on it and releasing the exclusive lock previously put on the file associated with the file handle.
- `flush()`
    Persists any changes made to the file associated with the handle via the `write()` method to disk.
- `getSize()`
    Returns the size of the file associated with the handle in bytes.
- `read()`
    Reads the content of the file associated with the handle into a specified buffer, optionally at a given offset.
- `truncate()`
    Resizes the file associated with the handle to a specified number of bytes.
- `write()`
    Writes the content of a specified buffer to the file associated with the handle, optionally at a given offset.

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

## See also

- File System API
- The File System Access API: simplifying access to local files
