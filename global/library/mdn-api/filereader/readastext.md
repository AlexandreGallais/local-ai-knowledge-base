---
title: "FileReader: readAsText() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/filereader/readastext/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# FileReader: readAsText() method

The **`readAsText()`** method of the `FileReader` interface is used to read the contents of the specified `Blob` or `File`.
When the read operation is complete, the `readyState` property is changed to `DONE`,
the `loadend` event is triggered, and the `result` property contains the contents of the file as a text string.

> **Note:**
> The `Blob.text()` method is a newer promise-based API to read a file as text.

> **Note:**
> This method loads the entire file's content into memory and is not suitable for large files. Prefer `readAsArrayBuffer()` for large files.

## Syntax

```js
readAsText(blob)
readAsText(blob, encoding)
```

### Parameters

- `blob`
    The `Blob` or `File` from which to read.
- `encoding` (optional)
    A string specifying the encoding to use for the returned data. By default, UTF-8 is assumed if this parameter is not specified.

### Return value

None (`undefined`).

## Examples

### HTML

```html
<input type="file" /><br />
<p class="content"></p>
```

### JavaScript

```js
const content = document.querySelector(".content");
const fileInput = document.querySelector("input[type=file]");

fileInput.addEventListener("change", previewFile);

function previewFile() {
  const file = fileInput.files[0];
  const reader = new FileReader();

  reader.addEventListener("load", () => {
    // this will then display a text file
    content.innerText = reader.result;
  });

  if (file) {
    reader.readAsText(file);
  }
}
```

## See also

- `FileReader`
