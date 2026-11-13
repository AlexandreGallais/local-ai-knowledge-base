---
title: "Blob: type property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/blob/type/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Blob: type property

The **`type`** read-only property of the `Blob` interface returns the MIME type of the file.

> **Note:**
> Based on the current implementation, browsers won't actually read the bytestream of a file to determine its media type.
> It is assumed based on the file extension; a PNG image file renamed to .txt would give "_text/plain_" and not "_image/png_". Moreover, `blob.type` is generally reliable only for common file types like images, HTML documents, audio and video.
> Uncommon file extensions would return an empty string.
> Client configuration (for instance, the Windows Registry) may result in unexpected values even for common types. **Developers are advised not to rely on this property as a sole validation scheme.**

## Value

A string containing the file's MIME type, or an empty string if the
type could not be determined.

## Examples

This example asks the user to select a number of files, then checks each file to make
sure it's one of a given set of image file types.

### HTML

```html
<input type="file" id="input" multiple />
<output id="output">Choose image files…</output>
```

```css
output {
  display: block;
  margin-top: 16px;
}
```

### JavaScript

```js
// Our application only allows GIF, PNG, and JPEG images
const allowedFileTypes = ["image/png", "image/jpeg", "image/gif"];

const input = document.getElementById("input");
const output = document.getElementById("output");

input.addEventListener("change", (event) => {
  const files = event.target.files;

  if (files.length === 0) {
    output.innerText = "Choose image files…";
    return;
  }

  const allAllowed = Array.from(files).every((file) =>
    allowedFileTypes.includes(file.type),
  );
  output.innerText = allAllowed
    ? "All files clear!"
    : "Please choose image files only.";
});
```

## See also

- `Blob`
- Using files from web applications
