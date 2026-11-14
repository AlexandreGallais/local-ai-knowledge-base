---
title: "MimeTypeArray"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/mimetypearray/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# MimeTypeArray

The **`MimeTypeArray`** interface returns an array of `MimeType` instances, each of which contains information about a supported browser plugins. This object is returned by the deprecated `Navigator.mimeTypes` property.

This interface was an attempt to create an unmodifiable list and only continues to be supported to not break code that's already using it. Modern APIs represent list structures using types based on JavaScript arrays, thus making many array methods available, and at the same time imposing additional semantics on their usage (such as making their items read-only).

## Instance properties

- `MimeTypeArray.length` (read-only) (deprecated)
    The number of items in the array.

## Instance methods

- `MimeTypeArray.item()` (deprecated)
    Returns the `MimeType` object with the specified index.
- `MimeTypeArray.namedItem()` (deprecated)
    Returns the `MimeType` object with the specified name.

## Example

The following example tests whether a plugin is available for the 'application/pdf' mime type and if so, logs its description.

```js
const mimeTypes = navigator.mimeTypes;
const pdf = mimeTypes.namedItem("application/pdf");

if (pdf) {
  console.log(pdf.description);
}
```
