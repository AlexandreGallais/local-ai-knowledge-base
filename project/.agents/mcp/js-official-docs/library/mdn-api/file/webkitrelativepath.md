---
title: "File: webkitRelativePath property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/file/webkitrelativepath/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# File: webkitRelativePath property

The **`webkitRelativePath`** read-only property of the `File` interface
contains a string which specifies the file's path relative to the
directory selected by the user in an `` element with its
`webkitdirectory` attribute set.

## Value

A string containing the path of the file relative to the ancestor
directory the user selected.

## Example

In this example, a directory picker is presented which lets the user choose one or more
directories. When the `change` event occurs, a list of all files contained
within the selected directory hierarchies is generated and displayed.

### HTML

```html
<input type="file" id="file-picker" name="fileList" webkitdirectory multiple />
<output id="output"></output>
```

```css
output {
  display: block;
  white-space: pre-wrap;
}
```

### JavaScript

```js
const output = document.getElementById("output");
const filePicker = document.getElementById("file-picker");

filePicker.addEventListener("change", (event) => {
  const files = event.target.files;

  for (const file of files) {
    output.textContent += `${file.webkitRelativePath}\n`;
  }
});
```

## See also

- File and Directory Entries API
- `HTMLInputElement.webkitEntries`
- `HTMLInputElement.webkitdirectory`
