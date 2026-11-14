---
title: "HTMLInputElement: files property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/htmlinputelement/files/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HTMLInputElement: files property

The **`HTMLInputElement.files`** property allows you to access the `FileList` selected with the `` element.

## Value

A `FileList` object listing the selected files, if any, or `null` if the **`HTMLInputElement`** is not of `type="file"`.

## Examples

The example below shows how you can access the **`HTMLInputElement.files`** property and log the name, date modified, size, and type of each file selected by the user.

### HTML

```html
<input id="files" type="file" multiple />
```

### JavaScript

Note that **`HTMLInputElement.files`** still returns an instance of `FileList` even if no files are
selected.
Therefore it's safe to iterate through it with `for...of` without checking if any files are selected.

```js
const fileInput = document.getElementById("files");

console.log(fileInput.files instanceof FileList); // true even if empty

for (const file of fileInput.files) {
  console.log(file.name); // prints file name
  let fileDate = new Date(file.lastModified);
  console.log(fileDate.toLocaleDateString()); // prints legible date
  console.log(
    file.size < 1000 ? file.size : `${Math.round(file.size / 1000)}KB`,
  );
  console.log(file.type); // prints MIME type
}
```

## See also

- `DataTransfer.files`
