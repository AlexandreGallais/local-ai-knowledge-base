---
title: "FileSystemObserver: observe() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/filesystemobserver/observe/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# FileSystemObserver: observe() method

The **`observe()`** method of the
`FileSystemObserver` interface asks the observer to start observing changes to a given file or directory.

## Syntax

```js
observe(handle)
observe(handle, options)
```

### Parameters

- `handle`
    The handle of the file system entry representing the file or directory to observe.
    - For the user-observable file system, this can be a `FileSystemFileHandle` or a `FileSystemDirectoryHandle`.
    - For the Origin Private File System (OPFS), it can be a `FileSystemFileHandle`, a `FileSystemDirectoryHandle`, or a `FileSystemSyncAccessHandle`.

- `options` (optional)
    An object specifying options for the `observe()` call. This can contain the following properties:
    - `recursive`
        A boolean specifying whether you want to observe changes to a directory recursively. If set to `true`, changes are observed in the directory itself and all contained subdirectories and files. If set to `false`, changes are only observed in the directory itself and directly contained files (that is, files in subdirectories are excluded). Defaults to `false`.

        This property has no effect if `handle` represents a file.

### Return value

A `Promise` that resolves to `undefined`.

### Exceptions

- `NotFoundError` `DOMException`
    Thrown if the file or directory represented by `handle` could not be found.

## Examples

### Observe a file or directory

Assuming a `FileSystemObserver` instance is available, you can start observing changes to a file system entry by calling `observe()`.

You can observe a file or directory in the user-observable file system or the Origin Private File System (OPFS) by passing a `FileSystemFileHandle` or `FileSystemDirectoryHandle` to `observe()`. Instances of these objects can be returned, for example, when asking the user to select a file or directory using `Window.showSaveFilePicker()` or `Window.showDirectoryPicker()`:

```js
// Observe a file
async function observeFile() {
  const fileHandle = await window.showSaveFilePicker();

  await observer.observe(fileHandle);
}

// Observe a directory
async function observeDirectory() {
  const directoryHandle = await window.showDirectoryPicker();

  await observer.observe(directoryHandle);
}
```

You can also observe changes to the OPFS by passing a `FileSystemSyncAccessHandle` to `observe()`:

```js
// Observe an OPFS file system entry
async function observeOPFSFile() {
  const root = await navigator.storage.getDirectory();
  const draftHandle = await root.getFileHandle("draft.txt", { create: true });
  const syncHandle = await draftHandle.createSyncAccessHandle();

  await observer.observe(syncHandle);
}
```

### Observe a directory recursively

To observe a directory recursively, call `observe()` with the `recursive` option set to `true`:

```js
// Observe a directory recursively
async function observeDirectory() {
  const directoryHandle = await window.showDirectoryPicker();

  await observer.observe(directoryHandle, { recursive: true });
}
```

## Specifications

Not currently part of a specification. See https://github.com/whatwg/fs/pull/165 for the relevant specification PR.

## See also

- File System API
- The File System Observer API origin trial on developer.chrome.com (2024)
