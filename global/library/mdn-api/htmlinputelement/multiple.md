---
title: "HTMLInputElement: multiple property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/htmlinputelement/multiple/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HTMLInputElement: multiple property

The **`HTMLInputElement.multiple`** property indicates if an input can have more than one value. Firefox currently only supports `multiple` for ``.

## Value

A boolean value.

## Examples

```html
<input id="my-file-input" type="file" multiple />
```

```js
let fileInput = document.getElementById("my-file-input");

if (fileInput.multiple) {
  // Loop fileInput.files
  for (const file of fileInput.files) {
    // Perform action on one file
  }
  // Only one file available
} else {
  let [file] = fileInput.files;
}
```

## See also

- FileList
- Bug 523771 - Support \
