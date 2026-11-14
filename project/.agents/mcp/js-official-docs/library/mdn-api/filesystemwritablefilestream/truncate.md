---
title: "FileSystemWritableFileStream: truncate() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/filesystemwritablefilestream/truncate/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# FileSystemWritableFileStream: truncate() method

The **`truncate()`** method of the `FileSystemWritableFileStream` interface resizes the file associated with the stream to the specified size in bytes.

If the size specified is larger than the current file size the file is padded with `0x00` bytes.

The file cursor is also updated when `truncate()` is called.
If the offset is smaller than the size, it remains unchanged.
If the offset is larger than size, the offset is set to that size.
This ensures that subsequent writes do not error.

No changes are written to the actual file on disk until the stream has been closed.
Changes are typically written to a temporary file instead.

## Syntax

```js
truncate(size)
```

### Parameters

- `size`
    A number specifying the number of bytes to resize the stream to.

### Return value

A `Promise` that returns `undefined`.

### Exceptions

- `NotAllowedError` `DOMException`
    Thrown if `PermissionStatus.state` is not `granted`.
- `QuotaExceededError`
    Thrown if the new size of the file is larger than the original size of the file, and exceeds the browser's storage quota.
- `TypeError`
    Thrown if `size` is not a number or not defined.

## Examples

The following asynchronous function opens the 'Save File' picker, which returns a `FileSystemFileHandle` once a file is selected. From this, a writable stream is created using the `FileSystemFileHandle.createWritable()` method.

Next, we write to the stream:

1. A text string is written to the stream.
2. The `truncate()` method is used to resize the file to 8 bytes.
3. A second text string is written to the start of the stream, overwriting the first write.

The stream is then closed.

```js
async function saveFile() {
  try {
    // create a new handle
    const newHandle = await window.showSaveFilePicker();

    // create a FileSystemWritableFileStream to write to
    const writableStream = await newHandle.createWritable();

    // write our file
    await writableStream.write("This is my first file content");
    await writableStream.truncate(8);
    await writableStream.write("my second file content");

    // close the file and write the contents to disk.
    await writableStream.close();
  } catch (err) {
    console.error(err.name, err.message);
  }
}
```

If you run the above function and then open the resulting file created on disk, you should see the text "This is my second file content".

## See also

- File System API
- The File System Access API: simplifying access to local files
