---
title: "URL: createObjectURL() static method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/url/createobjecturl_static/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# URL: createObjectURL() static method

The **`createObjectURL()`** static method of the `URL` interface
creates a string containing a blob URL pointing to the object given in the parameter.

For more information, see blob URLs.

To release an object URL, call `revokeObjectURL()`.

> **Note:**
> This feature is _not_ available in Service Workers due to its
> potential to create memory leaks.

## Syntax

```js
URL.createObjectURL(object)
```

### Parameters

- `object`
    A `Blob` (such as a `File`) or `MediaSource` object to
    create an object URL for.

### Return value

A string containing an object URL that can be used to reference the
contents of the specified source `object`.

## Examples

See Using object URLs to display images.

## See also

- Blob URLs
- Using files from web applications
- Using object URLs to display images
- `URL.revokeObjectURL()`
- `HTMLMediaElement.srcObject`
- `FileReader.readAsDataURL()`
