---
title: "Sec-Fetch-Storage-Access header"
tool: "mdn-http"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/http/reference/headers/sec-fetch-storage-access/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Sec-Fetch-Storage-Access header

The HTTP **`Sec-Fetch-Storage-Access`** fetch metadata request header provides the "storage access status" for the current fetch context.

The status can indicate that permission to access unpartitioned third-party cookies:

- Is not granted.
- Has been granted but not activated for the current request context.
- Has been granted for the current request content, and the cookies have been sent with the request.

Supporting browsers must include this header on cross-site requests when the request credential mode is `include`.
The header should not be sent with same-site requests (since those requests cannot involve cross-site cookies), or if the request's credentials mode is "omit".
The requested resource must also have a potentially trustworthy origin.

If a storage access permission has been granted but not activated, a server can respond with `Activate-Storage-Access` to request activation of the permission for the context.
For more information see Storage access headers in the Storage Access API overview.

       | Header type
       | Fetch Metadata Request Header

       | Forbidden request header
       | Yes (`Sec-` prefix)

       |
        CORS-safelisted request header

       | No

## Syntax

```http
Sec-Fetch-Storage-Access: none
Sec-Fetch-Storage-Access: inactive
Sec-Fetch-Storage-Access: active
```

## Directives

A value indicating the storage access status for the current fetch context.
The following values are allowed (servers should ignore other values):

- `none`
    The context does not have the `storage-access` permission or access to unpartitioned cookies.
- `inactive`
    The context has the `storage-access` permission, but has not opted into using it (and does not have unpartitioned cookie access through other means).
    If this value is set, then the `Origin` request header should also be set.
- `active`
    The context has unpartitioned cookie access.
    If this value is set, then the `Origin` request header should also be set.

## Examples

See Examples in `Activate-Storage-Access`.

## See also

- `Activate-Storage-Access`
- Storage access headers in _Storage Access API_
- Storage access header sequences in _Storage Access API_
- Using the Storage Access API
- Fetch Metadata Request Headers playground (secmetadata.appspot.com)
