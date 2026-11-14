---
title: "FileSystemFileEntry: createWriter() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/filesystemfileentry/createwriter/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# FileSystemFileEntry: createWriter() method

The `FileSystemFileEntry` interface's method
**`createWriter()`** returns a `FileWriter` object
which can be used to write data into the file represented by the directory entry.

## Syntax

```js
createWriter(successCallback)
createWriter(successCallback, errorCallback)
```

### Parameters

- `successCallback`
    A callback function which is called when the `FileWriter` has been
    created successfully; the `FileWriter` is passed into the callback as the
    only parameter.
- `errorCallback` (optional)
    If provided, this must be a method which is called when an error occurs while trying
    to create the `FileWriter`. This callback receives as input a
    `DOMException` object describing the error.

### Return value

None (`undefined`).

## Examples

This example establishes a method, `writeToFileEntry()`, which outputs a
text string to the file corresponding to the passed-in directory entry.

```js
function writeToFileEntry(entry, text) {
  entry.createWriter(
    (fileWriter) => {
      let data = Blob([text], { type: "text/plain" });

      fileWriter.write(data);
    },
    (error) => {
      /* do whatever to handle the error */
    },
  );
}
```

The success callback for the `createWriter()` call takes the text which was
passed in and creates a new `Blob` object of type `text/plain`
that contains the passed text. This blob is then output to the `FileWriter`
object to be written to the file.

## Specifications

This feature is not part of any specification anymore. It is no longer on track to become a standard.

## See also

- File and Directory Entries API
