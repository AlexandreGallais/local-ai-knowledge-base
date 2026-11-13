---
title: "FileSystemFileHandle"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/filesystemfilehandle/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# FileSystemFileHandle

The **`FileSystemFileHandle`** interface of the `File System API` represents a handle to a file system entry. The interface is accessed through the `window.showOpenFilePicker()` method.

Note that read and write operations depend on file-access permissions that do not persist after a page refresh if no other tabs for that origin remain open. The `queryPermission` method of the `FileSystemHandle` interface can be used to verify permission state before accessing a file.

## Instance properties

_Inherits properties from its parent, `FileSystemHandle`._

## Instance methods

_Inherits methods from its parent, `FileSystemHandle`._

- `getFile()`
    Returns a `Promise` which resolves to a `File` object
    representing the state on disk of the entry represented by the handle.
- `createSyncAccessHandle()`
    Returns a `Promise` which resolves to a `FileSystemSyncAccessHandle` object
    that can be used to synchronously read from and write to a file. The synchronous nature of this method brings performance advantages,
    but it is only usable inside dedicated Web Workers.
- `createWritable()`
    Returns a `Promise` which resolves to a newly created `FileSystemWritableFileStream`
    object that can be used to write to a file.

## Examples

### Reading a File

The following asynchronous function presents a file picker and once a file is chosen, uses the `getFile()` method to retrieve the contents.

```js
async function getTheFile() {
  const pickerOpts = {
    types: [
      {
        description: "Images",
        accept: {
          "image/*": [".png", ".gif", ".jpeg", ".jpg"],
        },
      },
    ],
    excludeAcceptAllOption: true,
    multiple: false,
  };

  // open file picker
  const [fileHandle] = await window.showOpenFilePicker(pickerOpts);
  // get file contents
  const fileData = await fileHandle.getFile();
  return fileData;
}
```

### Writing a File

The following asynchronous function writes the given contents to the file handle, and thus to disk.

```js
async function writeFile(fileHandle, contents) {
  // Create a FileSystemWritableFileStream to write to.
  const writable = await fileHandle.createWritable();

  // Write the contents of the file to the stream.
  await writable.write(contents);

  // Close the file and write the contents to disk.
  await writable.close();
}
```

### Synchronously reading and writing a file

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
