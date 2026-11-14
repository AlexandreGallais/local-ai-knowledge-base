---
title: "FileReaderSync: FileReaderSync() constructor"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/filereadersync/filereadersync/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# FileReaderSync: FileReaderSync() constructor

The **`FileReaderSync()`** constructor creates a new `FileReaderSync`.

## Syntax

```js
new FileReaderSync()
```

### Parameters

None.

## Examples

The following code snippet shows creation of a `FileReaderSync` object using the `FileReaderSync()` constructor and subsequent usage of the object:

```js
function readFile(blob) {
  const reader = new FileReaderSync();
  postMessage(reader.readAsDataURL(blob));
}
```

> **Note:**
> This snippet must be used inside a `Worker`, as synchronous interfaces can't be used on the main thread.
