---
title: "HTMLInputElement: webkitEntries property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/htmlinputelement/webkitentries/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HTMLInputElement: webkitEntries property

The read-only **`webkitEntries`**
property of the `HTMLInputElement` interface contains an array of file
system entries (as objects based on `FileSystemEntry`) representing files
and/or directories selected by the user using an `` element of
type `file`, but only if that selection was made using drag-and-drop:
selecting a file in the dialog will leave the property empty.

The array can only contain directories if the
`webkitdirectory` property is
`true`. This means the `` element was configured to
let the user choose directories.

> **Note:**
> This property is called `webkitEntries` in the specification due to its
> origins as a Google Chrome-specific API. It's likely to be renamed someday.

## Value

An array of objects based on `FileSystemEntry`, each representing one file
which is selected in the `` element. More specifically, files are
represented by `FileSystemFileEntry` objects, and, if they're allowed,
directories are represented by `FileSystemDirectoryEntry` objects.

## Examples

This example shows how to create a file selection `` element
and process the selected files.

### HTML

```html
<input id="files" type="file" multiple />
```

### JavaScript

```js
document.getElementById("files").addEventListener("change", (event) => {
  event.target.webkitEntries.forEach((entry) => {
    /* do stuff with the entry */
  });
});
```

Each time a `change` event occurs, this code iterates over the selected
files, obtaining their `FileSystemEntry`-based objects and acting on them.

## See also

- File and Directory Entries API
- `HTMLInputElement`
- `FileSystemEntry`
- `FileSystem`
