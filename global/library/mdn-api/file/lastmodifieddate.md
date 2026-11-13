---
title: "File: lastModifiedDate property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/file/lastmodifieddate/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# File: lastModifiedDate property

The **`lastModifiedDate`** read-only property of the `File` interface returns the last modified date of the file. Files without a known last modified date return the current date.

## Value

A `Date` object indicating the date and time at which the file was last modified. The timestamp returned by `someFile.lastModifiedDate.getTime()` inherits the value and precision of `File.lastModified`, without introducing additional inaccuracy.

## Examples

```js
// fileInput is a HTMLInputElement: <input type="file" multiple id="my-file-input">
const fileInput = document.getElementById("my-file-input");

for (const file of fileInput.files) {
  console.log(
    `${file.name} has a last modified date of ${file.lastModifiedDate}`,
  );
}
```

## Specifications

_Though present in early draft of the File API spec, this property has been removed from it and is now non-standard. Use `File.lastModified` instead._

## See also

- `File`
