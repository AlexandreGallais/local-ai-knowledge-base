---
title: "FileReader: readyState property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/filereader/readystate/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# FileReader: readyState property

The **`readyState`** read-only property of the `FileReader` interface provides the current state of the reading operation.
This will be one of the states: `EMPTY`, `LOADING`, or `DONE`.

## Value

A number which is one of the three possible state constants defined on the `FileReader` interface:

- `FileReader.EMPTY` (0)
    Reader has been created, but none of the read methods have been called yet.
- `FileReader.LOADING` (1)
    A read method has been called. A `File` or `Blob` is being read, and no error has occurred yet.
- `FileReader.DONE` (2)
    The read operation is complete. This could mean that: the entire `File` or `Blob` has been read into memory, a file read error occurred, or `abort()` was called and the read was canceled.

## Examples

```js
const reader = new FileReader();
console.log("EMPTY", reader.readyState); // readyState will be 0

reader.readAsText(blob);
console.log("LOADING", reader.readyState); // readyState will be 1

reader.onloadend = () => {
  console.log("DONE", reader.readyState); // readyState will be 2
};
```

## See also

- `Blob`
