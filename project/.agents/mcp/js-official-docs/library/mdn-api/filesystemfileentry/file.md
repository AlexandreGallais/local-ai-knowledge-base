---
title: "FileSystemFileEntry: file() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/filesystemfileentry/file/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# FileSystemFileEntry: file() method

The `FileSystemFileEntry` interface's method
**`file()`** returns a
`File` object which can be used to read data from the file represented by
the directory entry.

## Syntax

```js
file(successCallback)
file(successCallback, errorCallback)
```

### Parameters

- `successCallback`
    A callback function which is called when the `File` has been created
    successfully; the `File` is passed into the callback as the only parameter.
- `errorCallback` (optional)
    If provided, this must be a method which is called when an error occurs while trying
    to create the `File`. This callback receives as input a
    `DOMException` object describing the error.

### Return value

None (`undefined`).

## Examples

This example establishes a method, `readFile()`, reads a text file and calls
a specified callback function with the received text (in a string)
once the read is completed. If an error occurs, a specified (optional) error callback is
called.

```js
function readFile(entry, successCallback, errorCallback) {
  entry.file((file) => {
    let reader = new FileReader();

    reader.onload = () => {
      successCallback(reader.result);
    };

    reader.onerror = () => {
      errorCallback(reader.error);
    };

    reader.readAsText(file);
  }, errorCallback);
}
```

This function calls `file()`, specifying as its success callback a method
which proceeds to use a `FileReader` to read the file as text. The
FileReader's `load` event handler is set up to deliver the loaded string to
the `successCallback` specified when the `readFile()` method was
called; similarly, its `error` handler is set up to call the
`errorCallback` specified.

## See also

- File and Directory Entries API
