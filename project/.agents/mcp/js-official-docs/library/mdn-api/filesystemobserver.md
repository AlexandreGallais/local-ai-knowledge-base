---
title: "FileSystemObserver"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/filesystemobserver/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# FileSystemObserver

The **`FileSystemObserver`** interface of the `File System API` provides a mechanism to observe changes to the user-observable file system and the Origin Private File System (OPFS). This means web applications don't have to poll the file system to find changes in the files or folder structure, which can be time-consuming and wasteful.

## Constructor

- `FileSystemObserver()` (experimental) (non-standard)
    Creates a new `FileSystemObserver` object instance.

## Instance methods

- `disconnect()` (experimental) (non-standard)
    Stop observing the filesystem.
- `observe()` (experimental) (non-standard)
    Start observing changes to a given file or directory.

## Examples

> **Note:**
> For a complete working example, check out File System Observer Demo (source code).

### Initialize a `FileSystemObserver`

Before you can start observing file or directory changes, you need to initialize a `FileSystemObserver` to handle the observations. This is done using the `FileSystemObserver()` constructor, which takes a callback function as an argument:

```js
const observer = new FileSystemObserver(callback);
```

The callback function body can be specified to return and process file change observations in any way you want:

```js
const callback = (records, observer) => {
  for (const record of records) {
    console.log("Change detected:", record);
    const reportContent = `Change observed to ${record.changedHandle.kind} ${record.changedHandle.name}. Type: ${record.type}.`;
    sendReport(reportContent); // Some kind of user-defined reporting function
  }

  observer.disconnect();
};
```

### Observe a file or directory

Once a `FileSystemObserver` instance is available, you can start observing changes to a file system entry by calling the `FileSystemObserver.observe()` method.

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

### Stop observing the file system

When you want to stop observing changes to the file system entry, you can call `FileSystemObserver.disconnect()`:

```js
observer.disconnect();
```

## Specifications

Not currently part of a specification. See https://github.com/whatwg/fs/pull/165 for the relevant specification PR.

## See also

- File System API
- The File System Observer API origin trial on developer.chrome.com (2024)
