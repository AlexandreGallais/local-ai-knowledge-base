---
title: "Permissions-Policy: attribution-reporting directive"
tool: "mdn-http"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/http/reference/headers/permissions-policy/attribution-reporting/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Permissions-Policy: attribution-reporting directive

The HTTP `Permissions-Policy` header `attribution-reporting` directive controls whether the current document is allowed to use the Attribution Reporting API.

Specifically, where a defined policy blocks the use of this feature:

- Background `attributionsrc` requests won't be made.
- The `XMLHttpRequest.setAttributionReporting()` method will throw an exception when called.
- The `attributionReporting` option, when included on a `fetch()` call, will cause it to throw an exception.
- Registration headers (`Attribution-Reporting-Register-Source` and `Attribution-Reporting-Register-Trigger`) in HTTP responses on associated documents will be ignored.

## Syntax

```http
Permissions-Policy: attribution-reporting=<allowlist>;
```

- `<allowlist>`
    A list of origins for which permission is granted to use the feature. See `Permissions-Policy` > Syntax for more details.

## Default policy

The default allowlist for `attribution-reporting` is `*`.

## See also

- `Permissions-Policy` header
- Permissions Policy
- Attribution Reporting API
