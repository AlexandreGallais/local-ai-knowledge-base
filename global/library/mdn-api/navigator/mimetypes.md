---
title: "Navigator: mimeTypes property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/navigator/mimetypes/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Navigator: mimeTypes property

The **`mimeTypes`** read-only property of the `Navigator` interface returns a `MimeTypeArray` object, which contains a list of `MimeType` objects representing the MIME types recognized and supported by the browser.
The array can be queried for information about the enabled plugin that is used to handle a file of the specified type.
Named properties of the returned object are not enumerable (except in very old browser versions).

Recent versions of the specification hard-code the returned set of MIME types.
If PDF files can be displayed inline then `application/pdf` and `text/pdf` are listed.
Otherwise an empty list is returned.

> **Note:**
> Use `Navigator.pdfViewerEnabled` to determine if inline viewing of PDF files is supported. Do not infer it from this property.

Legacy browser versions do not hard-code the list returned by the property, and might return other MIME types.

## Value

A `MimeTypeArray` object which has a `length` property as well as `item(index)` and `namedItem(name)` methods.

If PDF inline viewing is supported this has entries for MIME types `application/pdf` and `text/pdf`.
Otherwise an empty `MimeTypeArray` is returned.
The description and file suffixes supported by enabled plugins are hard coded to `'pdf'` and `'Portable Document Format'`, respectively.

## Examples

The code below tests whether PDF files can be viewed inline, and then prints the description of the plugin and the file suffixes it supports.

```js
if ("application/pdf" in navigator.mimeTypes) {
  // browser supports inline viewing of PDF files.

  const { description, suffixes } = navigator.mimeTypes["application/pdf"];
  console.log(`Description: ${description}, Suffix: ${suffixes}`);
  // expected output: Description: Portable Document Format, Suffix: pdf
}
```

Note that while the above code tests for `application/pdf` you could equally well check `text/pdf`. (Either both or neither MIME type will be true.)
In addition, on current browsers you don't actually need to get the plugin description and suffixes, because this information is also hard-coded.
