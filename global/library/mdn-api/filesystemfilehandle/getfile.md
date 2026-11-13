---
title: "FileSystemFileHandle: getFile() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/filesystemfilehandle/getfile/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# FileSystemFileHandle: getFile() method

The **`getFile()`** method of the
`FileSystemFileHandle` interface returns a `Promise` which resolves to a
`File` object representing the state on disk of the entry represented by the handle.

If the file on disk changes or is removed after this method is called, the returned
`File` object will likely be no longer readable.

## Syntax

```js
getFile()
```

### Parameters

None.

### Return value

A `Promise` which resolves to a `File` object.

### Exceptions

- `NotAllowedError` `DOMException`
    Thrown if the `PermissionStatus.state` is not `granted` in `read` mode.
- `NotFoundError` `DOMException`
    Thrown if current entry is not found.

## Examples

The following asynchronous function presents a file picker and once a file is chosen,
uses the `getFile()` method to retrieve the contents.

```js
async function getTheFile() {
  // open file picker
  const [fileHandle] = await window.showOpenFilePicker(pickerOpts);

  // get file contents
  const fileData = await fileHandle.getFile();
}
```

## See also

- File System API
- The File System Access API: simplifying access to local files
