---
title: "URL: revokeObjectURL() static method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/url/revokeobjecturl_static/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# URL: revokeObjectURL() static method

The **`revokeObjectURL()`** static method of the `URL` interface
releases an existing object URL which was previously created by calling
`URL.createObjectURL()`.

For more information, see blob URLs.

Call this method when you've finished
using an object URL to let the browser know not to keep the reference to the file any
longer.

If the `objectURL` argument passed is not a currently-active object URL — for example if it is an invalid URL, non-object URL, or is already revoked — then calling this method does nothing.

> **Note:**
> This method is _not_ available in Service Workers, due to
> issues with the `Blob` interface's life cycle and the potential for leaks.

## Syntax

```js
URL.revokeObjectURL(objectURL)
```

### Parameters

- `objectURL`
    A string representing an object URL that was previously created by
    calling `createObjectURL()`.

### Return value

None (`undefined`).

## Examples

See Using object URLs to display images.

## See also

- Blob URLs
- Using files from web applications
- Using object URLs to display images
- `URL.createObjectURL()`
