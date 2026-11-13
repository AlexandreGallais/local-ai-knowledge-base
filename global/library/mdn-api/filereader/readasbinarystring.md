---
title: "FileReader: readAsBinaryString() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/filereader/readasbinarystring/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# FileReader: readAsBinaryString() method

> **Note:**
> This method is deprecated in favor of `readAsArrayBuffer()`.

The **`readAsBinaryString()`** method of the `FileReader` interface is used to start reading the contents of the
specified `Blob` or `File`. When the read operation is
finished, the `readyState` property becomes
`DONE`, and the `loadend` event is triggered. At that time, the
`result` property contains the raw binary data from
the file.

Note that this method was once removed from the File API specification, but
re-introduced for backward compatibility.
Using `FileReader.readAsArrayBuffer()` is recommended.

## Syntax

```js
readAsBinaryString(blob)
```

### Parameters

- `blob`
    The `Blob` or `File` from which to read.

### Return value

None (`undefined`).

## Examples

```js
const canvas = document.createElement("canvas");
const height = 200;
const width = 200;

canvas.width = width;
canvas.height = height;

const ctx = canvas.getContext("2d");

ctx.strokeStyle = "#009900";
ctx.beginPath();
ctx.arc(width / 2, height / 2, width / 2 - width / 10, 0, Math.PI * 2);
ctx.stroke();

canvas.toBlob((blob) => {
  const reader = new FileReader();

  reader.onload = () => {
    console.log(reader.result);
  };

  reader.readAsBinaryString(blob);
});
```

## See also

- `FileReader`
