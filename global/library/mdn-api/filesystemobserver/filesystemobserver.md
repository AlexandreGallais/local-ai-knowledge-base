---
title: "FileSystemObserver: FileSystemObserver() constructor"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/filesystemobserver/filesystemobserver/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# FileSystemObserver: FileSystemObserver() constructor

The **`FileSystemObserver()`** constructor creates a new `FileSystemObserver` object instance.

## Syntax

```js
new FileSystemObserver(callback)
```

### Parameters

- `callback`
    A user-defined callback function that will be called when the observer has observed a change in the file system entry it has been asked to observe (via `FileSystemObserver.observe()`). The callback function will be passed the following two parameters:
    - `records`
        An array of `FileSystemChangeRecord` objects that contain details of all the observed changes.
    - `observer`
        A reference to the current `FileSystemObserver` object, which is made available in case, for example, you want to stop observations after the current records have been received using the `FileSystemObserver.disconnect()` method.

### Return value

A new `FileSystemObserver` object.

## Examples

> **Note:**
> For a complete working example, check out File System Observer Demo (source code).

### Initializing a `FileSystemObserver`

Before you can start observing file or directory changes, you need to initialize a `FileSystemObserver` to handle the observations:

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

## Specifications

Not currently part of a specification. See https://github.com/whatwg/fs/pull/165 for the relevant specification PR.

## See also

- File System API
- The File System Observer API origin trial on developer.chrome.com (2024)
