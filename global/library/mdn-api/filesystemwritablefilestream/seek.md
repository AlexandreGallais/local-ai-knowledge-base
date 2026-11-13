---
title: "FileSystemWritableFileStream: seek() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/filesystemwritablefilestream/seek/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# FileSystemWritableFileStream: seek() method

The **`seek()`** method of the `FileSystemWritableFileStream` interface updates the current file cursor offset to the position (in bytes) specified when calling the method.

## Syntax

```js
seek(position)
```

### Parameters

- `position`
    A number specifying the byte position from the beginning of the file.

### Return value

A `Promise` that returns `undefined`.

### Exceptions

- `NotAllowedError` `DOMException`
    Thrown if `PermissionStatus.state` is not `granted`.
- `TypeError`
    Thrown if `position` is not a number or not defined.

## Examples

The following asynchronous function opens the 'Save File' picker, which returns a `FileSystemFileHandle` once a file is selected. From this, a writable stream is created using the `FileSystemFileHandle.createWritable()` method.

Next, we write to the stream:

1. A text string is written to the stream.
2. The `seek()` method is used to put the cursor at the start of the stream.
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
    await writableStream.write("My first file content");
    await writableStream.seek(0);
    await writableStream.write("My second file content");

    // close the file and write the contents to disk.
    await writableStream.close();
  } catch (err) {
    console.error(err.name, err.message);
  }
}
```

If you run the above function and then open the resulting file created on disk, you should see the text "My second file content".

## See also

- File System API
- The File System Access API: simplifying access to local files
