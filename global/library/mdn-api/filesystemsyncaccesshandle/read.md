---
title: "FileSystemSyncAccessHandle: read() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/filesystemsyncaccesshandle/read/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# FileSystemSyncAccessHandle: read() method

The **`read()`** method of the
`FileSystemSyncAccessHandle` interface reads the content of the file associated with the handle into a specified buffer, optionally at a given offset.

## Syntax

```js
read(buffer, options)
```

### Parameters

- `buffer`
    An `ArrayBuffer` or `ArrayBufferView` (such as a `DataView`) representing the buffer that the file content should be read into. Note that you cannot directly manipulate the contents of an `ArrayBuffer`. Instead, you create one of the typed array objects like an `Int8Array` or a `DataView` object which represents the buffer in a specific format, and use that to read and write the contents of the buffer.
- `options` (optional)
    An options object containing the following properties:
    - `at`
        A number representing the offset in bytes that the file should be read from.

### Return value

A number representing the number of bytes read from the file.

### Exceptions

- `InvalidStateError` `DOMException`
    Thrown if the associated access handle is already closed.
- `TypeError`
    Thrown if the underlying file system does not support reading the file from the specified file offset.

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
