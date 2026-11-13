---
title: "HTMLInputElement: webkitdirectory property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/htmlinputelement/webkitdirectory/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HTMLInputElement: webkitdirectory property

The **`webkitdirectory`** property of the `HTMLInputElement` interface reflects the `webkitdirectory` HTML attribute, which indicates that `` elements can only select directories instead of files.

When a directory is selected, the directory and its entire hierarchy of contents are included in the set of selected items.
The selected file system entries can be obtained using the `webkitEntries` property.

> **Note:**
> This property is called `webkitdirectory` in the specification due to its origins as a Google Chrome-specific API.

## Value

A Boolean; `true` if the `` element should allow picking only directories or `false` if only files should be selectable.

## Description

Setting `webkitdirectory` to `true` causes the input element to offer directories for the user to select instead of files.
After the user chooses a directory, each `File` object in the returned `files` has its `File.webkitRelativePath` property set to a path relative to the selected ancestor directory.
For example, consider this file system:

```plain
PhotoAlbums
├── Birthdays
│   ├── Jamie's 1st birthday
│   │   ├── PIC1000.jpg
│   │   └── PIC1044.jpg
│   └── Don's 40th birthday
│       ├── PIC2343.jpg
│       └── PIC2356.jpg
└── Vacations
    └── Mars
        ├── PIC5556.jpg
        ├── PIC5684.jpg
        └── PIC5712.jpg
```

If the user chooses the `PhotoAlbums` directory, the list reported by files will contain `File` objects for every file.
The entry for `PIC2343.jpg` will have a `webkitRelativePath` of `PhotoAlbums/Birthdays/Don's 40th birthday/PIC2343.jpg`.
This makes it possible to determine the selected directory's hierarchy even though the `FileList` is flat.

> **Note:**
> The behavior of `webkitRelativePath` is different in _Chromium < 72_.
> See this bug for further details.

## Examples

In this example, a directory picker is presented which lets the user choose one or more directories.
When the `change` event occurs, a list of all files contained within the selected directory hierarchies is created and displayed.

### HTML

```html
<input type="file" id="file-picker" name="fileList" webkitdirectory multiple />
<ul id="listing"></ul>
```

### JavaScript

```js
document.getElementById("file-picker").addEventListener("change", (event) => {
  let output = document.getElementById("listing");
  for (const file of event.target.files) {
    let item = document.createElement("li");
    item.textContent = file.webkitRelativePath;
    output.appendChild(item);
  }
});
```

## See also

- File and Directory Entries API
- `HTMLInputElement.webkitEntries`
- `File.webkitRelativePath`
