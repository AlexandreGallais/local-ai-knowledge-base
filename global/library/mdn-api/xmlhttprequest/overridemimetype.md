---
title: "XMLHttpRequest: overrideMimeType() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/xmlhttprequest/overridemimetype/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# XMLHttpRequest: overrideMimeType() method

The `XMLHttpRequest` method
**`overrideMimeType()`** specifies a MIME type other than the
one provided by the server to be used instead when interpreting the data being
transferred in a request.

This may be used, for example, to force a stream to
be treated and parsed as `"text/xml"`, even if the server does not report it
as such. This method must be called before calling `send()`.

## Syntax

```js
overrideMimeType(mimeType)
```

### Parameters

- `mimeType`
    A string specifying the MIME type to use instead of the one
    specified by the server. If the server doesn't specify a type,
    `XMLHttpRequest` assumes `"text/xml"`.

### Return value

None (`undefined`).

## Examples

This example specifies a MIME type of `"text/plain"`, overriding the
server's stated type for the data being received.

> **Note:**
> If the server doesn't provide a
> `Content-Type`
> header, `XMLHttpRequest` assumes that the MIME type is
> `"text/xml"`. If the content isn't valid XML, an "XML Parsing Error: not
> well-formed" error occurs. You can avoid this by calling
> `overrideMimeType()` to specify a different type.

```js
// Interpret the received data as plain text

req = new XMLHttpRequest();
req.overrideMimeType("text/plain");
req.addEventListener("load", callback);
req.open("get", url);
req.send();
```

## See also

- Using XMLHttpRequest
- `XMLHttpRequest.responseType`
