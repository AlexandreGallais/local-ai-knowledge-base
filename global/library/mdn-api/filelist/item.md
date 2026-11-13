---
title: "FileList: item() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/filelist/item/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# FileList: item() method

The **`item()`** method of the `FileList` interface returns a `File` object representing the file at the specified index in the file list.

## Syntax

```js
item(index)
```

### Parameters

- `index`
    The zero-based index of the file to retrieve from the list.

### Return value

A `File` object representing the requested file.

## Examples

### Printing the name of a file

In this example, we use `item()` to select the first item in the `FileList`.

#### HTML

```html
<input type="file" />
<div class="output"></div>
```

#### JavaScript

```js
const fileInput = document.querySelector("input[type=file]");
const output = document.querySelector(".output");

fileInput.addEventListener("change", () => {
  const fileList = fileInput.files;
  if (fileList.length > 0) {
    const file = fileList.item(0);
    output.textContent = `You selected: ${file.name}`;
  }
});
```

#### Result
