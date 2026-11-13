---
title: "FileSystemWritableFileStream"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/filesystemwritablefilestream/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# FileSystemWritableFileStream

The **`FileSystemWritableFileStream`** interface of the `File System API` is a `WritableStream` object with additional convenience methods, which operates on a single file on disk. The interface is accessed through the `FileSystemFileHandle.createWritable()` method.

## Instance properties

_Inherits properties from its parent, `WritableStream`._

## Instance methods

_Inherits methods from its parent, `WritableStream`._

- `FileSystemWritableFileStream.write()`
    Writes content into the file the method is called on, at the current file cursor offset.
- `FileSystemWritableFileStream.seek()`
    Updates the current file cursor offset to the position (in bytes) specified.
- `FileSystemWritableFileStream.truncate()`
    Resizes the file associated with the stream to be the specified size in bytes.

## Examples

The following asynchronous function opens the 'Save File' picker, which returns a `FileSystemFileHandle` once a file is selected. From this, a writable stream is created using the `FileSystemFileHandle.createWritable()` method.

A text string is then written to the stream, which is subsequently closed.

```js
async function saveFile() {
  // create a new handle
  const newHandle = await window.showSaveFilePicker();

  // create a FileSystemWritableFileStream to write to
  const writableStream = await newHandle.createWritable();

  // write our file
  await writableStream.write("This is my file content");

  // close the file and write the contents to disk.
  await writableStream.close();
}
```

The following examples show different options that can be passed into the `write()` method.

```js
// just pass in the data (no options)
writableStream.write(data);

// writes the data to the stream from the determined position
writableStream.write({ type: "write", position, data });

// updates the current file cursor offset to the position specified
writableStream.write({ type: "seek", position });

// resizes the file to be size bytes long
writableStream.write({ type: "truncate", size });
```

## See also

- File System API
- The File System Access API: simplifying access to local files
