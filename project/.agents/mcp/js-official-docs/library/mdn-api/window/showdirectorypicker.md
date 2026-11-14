---
title: "Window: showDirectoryPicker() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/window/showdirectorypicker/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Window: showDirectoryPicker() method

The **`showDirectoryPicker()`** method of the
`Window` interface displays a directory picker which allows the user to
select a directory.

## Syntax

```js
showDirectoryPicker()
showDirectoryPicker(options)
```

### Parameters

- `options` (optional)
    An object containing options, which are as follows:
    - `id` (optional)
        By specifying an ID, the browser can remember different directories for different
        IDs. If the same ID is used for another picker, the picker opens in the same
        directory.
    - `mode` (optional)
        A string that defaults to `"read"` for read-only access or `"readwrite"` for read
        and write access to the directory.
    - `startIn` (optional)
        A `FileSystemHandle` or a well-known directory (`"desktop"`, `"documents"`,
        `"downloads"`, `"music"`, `"pictures"`, or `"videos"`) to open the dialog in.

### Return value

A `Promise` whose fulfillment handler receives a `FileSystemDirectoryHandle` object.

### Exceptions

- `AbortError` `DOMException`
    Thrown if the user dismisses the prompt without making a selection,
    or if the user agent deems the selected directory to be too sensitive or dangerous,
    or if the `PermissionStatus.state` for the selected directory is not `"granted"` in the specified `mode`.
- `SecurityError` `DOMException`
    Thrown if the call was blocked by the same-origin policy or it was not called via a user interaction such as a button press.

## Security

Transient user activation is required. The user has to interact with the page or a UI element in order for this feature to work.

## Examples

This asynchronous function shows a directory picker and returns a
`FileSystemDirectoryHandle` once selected.

```js
async function getDir() {
  const dirHandle = await window.showDirectoryPicker();

  // run code for dirHandle
}
```

## See also

- File System API
- The File System Access API: simplifying access to local files
