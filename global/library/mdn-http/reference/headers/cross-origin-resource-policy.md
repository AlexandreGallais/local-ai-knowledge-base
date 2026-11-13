---
title: "Cross-Origin-Resource-Policy (CORP) header"
tool: "mdn-http"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/http/reference/headers/cross-origin-resource-policy/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Cross-Origin-Resource-Policy (CORP) header

The HTTP **`Cross-Origin-Resource-Policy`** response header (CORP) indicates that the browser should block `no-cors` cross-origin or cross-site requests to the given resource.

It specifies resource owner's policy for what sites/origins should be allowed to load this resource.

       | Header type
       | Response header

## Syntax

```http
Cross-Origin-Resource-Policy: same-site | same-origin | cross-origin
```

### Directives

- `same-site`
    Resources can only be loaded from the same site.

- `same-origin`
    Resources can only be loaded from the same origin.

- `cross-origin`
    Resources can be loaded by any other origin/website.

## Examples

For more examples, see https://resourcepolicy.fyi/.

### Disallowing cross-origin no-cors requests

The `Cross-Origin-Resource-Policy` header below will cause compatible user agents to disallow cross-origin no-cors requests:

```http
Cross-Origin-Resource-Policy: same-origin
```

## See also

- Cross-Origin Resource Policy (CORP) explainer
- Consider deploying Cross-Origin Resource Policy
- `Cross-Origin-Embedder-Policy`
- `Access-Control-Allow-Origin`
