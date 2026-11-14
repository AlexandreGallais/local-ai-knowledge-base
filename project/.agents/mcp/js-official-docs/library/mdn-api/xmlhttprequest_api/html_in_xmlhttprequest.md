---
title: "HTML in XMLHttpRequest"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/xmlhttprequest_api/html_in_xmlhttprequest/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HTML in XMLHttpRequest

The W3C `XMLHttpRequest` specification adds HTML parsing support to `XMLHttpRequest`, which originally supported only XML parsing. This feature allows Web apps to obtain an HTML resource as a parsed DOM using `XMLHttpRequest`.

To get an overview of how to use `XMLHttpRequest` in general, see Using XMLHttpRequest.

## Limitations

To discourage the synchronous use of `XMLHttpRequest`, HTML support is not available in the synchronous mode. Also, HTML support is only available if the `responseType` property has been set to `"document"`. This limitation avoids wasting time parsing HTML uselessly when legacy code uses `XMLHttpRequest` in the default mode to retrieve `responseText` for `text/html` resources. Also, this limitation avoids problems with legacy code that assumes that `responseXML` is `null` for HTTP error pages (which often have a `text/html` response body).

## Usage

Retrieving an HTML resource as a DOM using `XMLHttpRequest` works just like retrieving an XML resource as a DOM using `XMLHttpRequest`, except you can't use the synchronous mode and you have to explicitly request a document by assigning the string `"document"` to the `responseType` property of the `XMLHttpRequest` object after calling `open()` but before calling `send()`.

```js
const xhr = new XMLHttpRequest();
xhr.onload = () => {
  console.log(xhr.responseXML.title);
};
xhr.open("GET", "file.html");
xhr.responseType = "document";
xhr.send();
```

## Character encoding

If the character encoding is declared in the HTTP `Content-Type` header, that character encoding is used. Failing that, if there is a byte order mark, the encoding indicated by the byte order mark is used. Failing that, if there is a `<meta>` element that declares the encoding within the first 1024 bytes of the file, that encoding is used. Otherwise, the file is decoded as UTF-8.

## See also

- `XMLHttpRequest`
- Using XMLHttpRequest
