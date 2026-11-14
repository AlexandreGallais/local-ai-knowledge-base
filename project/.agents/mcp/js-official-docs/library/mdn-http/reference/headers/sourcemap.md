---
title: "SourceMap header"
tool: "mdn-http"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/http/reference/headers/sourcemap/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# SourceMap header

The HTTP **`SourceMap`** response header provides the location of a source map for the resource.

The HTTP `SourceMap` header has precedence over a source annotation (`sourceMappingURL=path-to-map.js.map`), and if both are present, the header URL is used to resolve the source map file.

       | Header type
       | Response header

## Syntax

```http
SourceMap: <url>
X-SourceMap: <url> (deprecated)
```

### Directives

- `<url>`
    A relative (to the request URL) or absolute URL pointing to a source map file.

## Examples

### Linking to a source map using the `SourceMap` header

The following response contains an absolute path in the `SourceMap` header.

```http
HTTP/1.1 200 OK
Content-Type: text/javascript
SourceMap: /path/to/file.js.map

<optimized-javascript>
```

Developer tools use the source map to reconstruct the original source from the optimized JavaScript returned in the response, allowing developers to debug the original code rather than the format that has been optimized for sending.

## See also

- Source map
- Firefox Developer Tools: using a source map
- What are source maps? on web.dev (2023)
