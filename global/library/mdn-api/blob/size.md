---
title: "Blob: size property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/blob/size/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Blob: size property

The **`size`** read-only property of the `Blob` interface returns
the size of the `Blob` or `File` in bytes.

## Value

The number of bytes of data contained within the `Blob` (or
`Blob`-based object, such as a `File`).

## Examples

This example uses an `` element of type `file` to ask
the user for a group of files, then iterates over those files outputting their names and
lengths in bytes.

### HTML

```html
<input type="file" id="input" multiple />
<output id="output">Choose files…</output>
```

```css
output {
  display: block;
  margin-top: 16px;
}
```

### JavaScript

```js
const input = document.getElementById("input");
const output = document.getElementById("output");

input.addEventListener("change", (event) => {
  output.innerText = "";

  for (const file of event.target.files) {
    output.innerText += `${file.name} has a size of ${file.size} bytes.\n`;
  }
});
```

## See also

- `Blob`
- Using files from web applications
