---
title: "File: name property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/file/name/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# File: name property

The **`name`** read-only property of the `File` interface returns the name of the file represented by a `File` object. For security
reasons, the path is excluded from this property.

## Value

A string, containing the name of the file without path, such as "My Resume.rtf".

## Examples

### HTML

```html
<input type="file" id="file-picker" multiple />
<div>
  <p>List of selected files:</p>
  <ul id="output"></ul>
</div>
```

### JavaScript

```js
const output = document.getElementById("output");
const filePicker = document.getElementById("file-picker");

filePicker.addEventListener("change", (event) => {
  const files = event.target.files;
  output.textContent = "";

  for (const file of files) {
    const li = document.createElement("li");
    li.textContent = file.name;
    output.appendChild(li);
  }
});
```

## See also

- Using files from web applications
