---
title: "Server header"
tool: "mdn-http"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/http/reference/headers/server/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Server header

The HTTP **`Server`** response header describes the software used by the origin server that handled the request and generated a response.

The benefits of advertising the server type and version via this header are that it helps with analytics and identifying how widespread specific interoperability issues are.
Historically, clients have used the server version information to avoid known limitations, such as inconsistent support for range requests in specific software versions.

> **Warning:**
> The presence of this header in responses, especially when it contains fine-grained implementation details about server software, may make known vulnerabilities easier to detect.

Too much detail in the `Server` header is not advised for response latency and the security reason mentioned above.
It's debatable whether obscuring the information in this header provides much benefit because fingerprinting server software is possible via other means.
In general, a more robust approach to server security is to ensure software is regularly updated or patched against known vulnerabilities instead.

       | Header type
       | Response header

## Syntax

```http
Server: <product>
```

## Directives

- `<product>`
    A name of the software or the product that handled the request.
    Usually in a format similar to `User-Agent`.

## Examples

```http
Server: Apache/2.4.1 (Unix)
```

## See also

- `Allow`
- HTTP Observatory
- Prevent information disclosure via HTTP headers - OWASP Secure Headers Project
