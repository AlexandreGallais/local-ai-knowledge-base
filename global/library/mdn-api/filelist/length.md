---
title: "FileList: length property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/filelist/length/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# FileList: length property

The **`length`** read-only property of the `FileList` interface returns the number of files in the `FileList`.

## Value

A number indicating the number of files in the list.

## Examples

### Printing the number of files selected

In this example, we use `length` to find the number of items in the `FileList`.

#### HTML

```html
<input type="file" multiple />
<div class="output"></div>
```

#### JavaScript

```js
const fileInput = document.querySelector("input[type=file]");
const output = document.querySelector(".output");

fileInput.addEventListener("change", () => {
  const fileList = fileInput.files;
  output.textContent = `You've selected: ${fileList.length} file(s)`;
});
```

#### Result
