---
title: "Window: showSaveFilePicker() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/window/showsavefilepicker/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Window: showSaveFilePicker() method

The **`showSaveFilePicker()`** method of the
`Window` interface shows a file picker that allows a user to save a file.
Either by selecting an existing file, or entering a name for a new file.

## Syntax

```js
showSaveFilePicker()
showSaveFilePicker(options)
```

### Parameters

- `options` (optional)
    An object containing options, which are as follows:
    - `excludeAcceptAllOption` (optional)
        A boolean value that defaults to
        `false`. By default, the picker should include an option to not apply
        any file type filters (instigated with the type option below). Setting this option
        to `true` means that option is _not_ available.
    - `id` (optional)
        By specifying an ID, the browser can remember different directories for different
        IDs. If the same ID is used for another picker, the picker opens in the same
        directory.
    - `startIn` (optional)
        A `FileSystemHandle` or a well-known directory (`"desktop"`, `"documents"`,
        `"downloads"`, `"music"`, `"pictures"`, or `"videos"`) to open the dialog in.
    - `suggestedName` (optional)
        A `String`. The suggested file name.
    - `types` (optional)
        An `Array` of allowed file types to save. Each
        item is an object with the following options:
        - `description` (optional)
            An optional description of the category of files
            types allowed. Defaults to an empty string.
        - `accept`
            An `Object` with the keys set to the MIME type and the values an `Array` of file extensions (see below
            for an example).

### Return value

A `Promise` whose fulfillment handler receives a `FileSystemFileHandle` object.

### Exceptions

- `AbortError` `DOMException`
    Thrown if the user dismisses the file picker without selecting or inputting a file,
    or if the user agent deems any selected files too sensitive or dangerous.
- `SecurityError` `DOMException`
    Thrown if the call was blocked by the same-origin policy or it was not called via a user interaction such as a button press.
- `TypeError`
    Thrown if accept types can't be processed, which may happen if:
    - Any key <example-value> of the `accept` options of any item in `types` options can't parse a valid MIME type.
    - Any value string(s) of the `accept` options of any item in `types` options is invalid, for example, if it does not start with `.` and if end with `.`, or if it contains any invalid code points and its length is more than 16.
    - The `types` options is empty and the `excludeAcceptAllOption` options is `true`.

## Security

Transient user activation is required. The user has to interact with the page or a UI element in order for this feature to work.

## Examples

The following function shows a file picker, with text files highlighted for selection.

```js
async function getNewFileHandle() {
  const opts = {
    types: [
      {
        description: "Text file",
        accept: { "text/plain": [".txt"] },
      },
    ],
  };
  return await window.showSaveFilePicker(opts);
}
```

## See also

- File System API
- The File System Access API: simplifying access to local files
