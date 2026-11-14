---
title: "FileSystemEntry: toURL() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/filesystementry/tourl/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# FileSystemEntry: toURL() method

The `FileSystemEntry` interface's method
**`toURL()`** creates and
returns a string containing a URL which can be used to identify the file system entry.
This is done by exposing a new URL scheme—`filesystem:`—that can be used as
the value of `src` and `href` attributes.

## Syntax

```js
toURL()
toURL(mimeType)
```

### Parameters

- `mimeType` (optional)
    An optional string specifying the MIME type to use when interpreting the file. This
    can be used to help deal with files whose types aren't recognized automatically by the
    user agent. If this parameter is omitted, the user agent uses its standard algorithms
    to identify the file.

### Return value

A string containing a URL that can then be used as a document
reference in HTML content, or an empty string if the URL can't be generated (such as if
the file system implementation doesn't support `toURL()`).

## Examples

If you have a `FileSystemFileEntry` corresponding to an image file in a
file system available to your website or app, you can call `toURL()` to get
its URL for use in HTML. If your site is located at
`http://my-awesome-website.woot`, and you have a temporary file system that
contains an image file named `awesome-sauce.jpg`, the URL returned by
`toURL()` might be (depending on the browser's implementation) something like
`"filesystem:http://my-awesome-website.woot/temporary/awesome-sauce.jpg"`.

Code that makes use of this might look like this:

```js
const img = document.createElement("img");
img.src = imageFileEntry.toURL();
img.alt = "";
document.body.appendChild(img);
```

Assuming the scenario mentioned before the code, the result would be HTML that looks
like this being appended to the end of the document:

```html
<img
  src="filesystem:http://my-awesome-website.woot/temporary/awesome-sauce.jpg"
  alt="" />
```

## See also

- File and Directory Entries API
- `FileSystemDirectoryEntry.removeRecursively()`
