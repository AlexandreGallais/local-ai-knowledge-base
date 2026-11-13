---
title: "DataTransferItem: getAsFileSystemHandle() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/datatransferitem/getasfilesystemhandle/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# DataTransferItem: getAsFileSystemHandle() method

The **`getAsFileSystemHandle()`** method of the `DataTransferItem` interface returns a `Promise` that fulfills with a `FileSystemFileHandle` if the dragged item is a file, or fulfills with a `FileSystemDirectoryHandle` if the dragged item is a directory.

During a drag operation, this method can only read data in the handlers for the `dragstart` and `drop` events, because those are the only times the drag data store is readable. Calling it from any other drag event returns a promise that fulfills with `null`. The method must be called synchronously within the event handler, although its promise can be awaited later. See Reading the drag data store for details.

## Syntax

```js
getAsFileSystemHandle()
```

### Parameters

None.

### Return value

A `Promise`.

If the item's `kind` property is `"file"`, and this item is accessed in the `dragstart` or `drop` event handlers, then the returned promise is fulfilled with a `FileSystemFileHandle` if the dragged item is a file or a `FileSystemDirectoryHandle` if the dragged item is a directory.

Otherwise, the promise fulfills with `null`.

### Exceptions

None.

## Examples

This example uses the `getAsFileSystemHandle()` method to return
`file handles` for dropped items.

> **Note:**
> Because `getAsFileSystemHandle()` can only retrieve the entry handle in the same tick as the `drop` event handler, there must be no `await` before it. This is why we synchronously invoke `getAsFileSystemHandle()` for all items first, and then wait for their results concurrently.

```js
elem.addEventListener("dragover", (e) => {
  // Prevent navigation.
  e.preventDefault();
});
elem.addEventListener("drop", async (e) => {
  // Prevent navigation.
  e.preventDefault();
  const handlesPromises = [...e.dataTransfer.items]
    // kind will be 'file' for file/directory entries.
    .filter((x) => x.kind === "file")
    .map((x) => x.getAsFileSystemHandle());
  const handles = await Promise.all(handlesPromises);

  // Process all of the items.
  for (const handle of handles) {
    if (handle.kind === "file") {
      // run code for if handle is a file
    } else if (handle.kind === "directory") {
      // run code for is handle is a directory
    }
  }
});
```

## See also

- File System API
- The File System Access API: simplifying access to local files
