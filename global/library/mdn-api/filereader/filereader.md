---
title: "FileReader: FileReader() constructor"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/filereader/filereader/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# FileReader: FileReader() constructor

The **`FileReader()`** constructor creates a new `FileReader`.

For details about how to use `FileReader`, see Using files from web applications.

## Syntax

```js
new FileReader()
```

### Parameters

None.

## Examples

The following code snippet shows creation of a `FileReader` object using the `FileReader()` constructor and subsequent usage of the object:

```js
function printFile(file) {
  const reader = new FileReader();
  reader.onload = (evt) => {
    console.log(evt.target.result);
  };
  reader.readAsText(file);
}
```

## See also

- Using files from web applications
