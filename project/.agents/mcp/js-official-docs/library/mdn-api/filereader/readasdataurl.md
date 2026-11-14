---
title: "FileReader: readAsDataURL() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/filereader/readasdataurl/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# FileReader: readAsDataURL() method

The **`readAsDataURL()`** method of the `FileReader` interface is used to read the contents of the specified
`Blob` or `File`. When the read operation is finished, the
`readyState` property becomes `DONE`, and the
`loadend` event is triggered. At that time, the
`result` attribute contains the data as a data: URL representing the
file's data as a base64 encoded string.

> **Note:**
> The blob's `result` cannot be
> directly decoded as Base64 without first removing the Data-URL declaration preceding
> the Base64-encoded data. To retrieve only the Base64 encoded string, first
> remove `data:*/*;base64,` from the result.

## Syntax

```js
readAsDataURL(blob)
```

### Parameters

- `blob`
    The `Blob` or `File` from which to read.

### Return value

None (`undefined`).

## Examples

### Reading a single file

#### HTML

```html
<input type="file" /><br />
<img src="" height="200" alt="Image preview" />
```

#### JavaScript

```js
const preview = document.querySelector("img");
const fileInput = document.querySelector("input[type=file]");

fileInput.addEventListener("change", previewFile);

function previewFile() {
  const file = fileInput.files[0];
  const reader = new FileReader();

  reader.addEventListener("load", () => {
    // convert image file to base64 string
    preview.src = reader.result;
  });

  if (file) {
    reader.readAsDataURL(file);
  }
}
```

#### Result

### Reading multiple files

#### HTML

```html
<input id="browse" type="file" multiple />
<div id="preview"></div>
```

#### JavaScript

```js
function previewFiles() {
  const preview = document.querySelector("#preview");
  const files = document.querySelector("input[type=file]").files;

  function readAndPreview(file) {
    // Make sure `file.name` matches our extensions criteria
    if (/\.(?:jpe?g|png|gif)$/i.test(file.name)) {
      const reader = new FileReader();

      reader.addEventListener("load", () => {
        const image = new Image();
        image.height = 100;
        image.title = file.name;
        image.src = reader.result;
        preview.appendChild(image);
      });

      reader.readAsDataURL(file);
    }
  }

  if (files) {
    Array.prototype.forEach.call(files, readAndPreview);
  }
}

const picker = document.querySelector("#browse");
picker.addEventListener("change", previewFiles);
```

#### Result

## See also

- `FileReader`
- `URL.createObjectURL()`
