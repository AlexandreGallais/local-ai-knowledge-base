---
title: "Content-Security-Policy: prefetch-src directive"
tool: "mdn-http"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/http/reference/headers/content-security-policy/prefetch-src/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Content-Security-Policy: prefetch-src directive

The HTTP `Content-Security-Policy` (CSP)
**`prefetch-src`** directive specifies valid resources that may
be prefetched or prerendered.

       | CSP version
       | 3

       | Directive type
       | Fetch directive

       |  fallback
       |
        Yes. If this directive is absent, the user agent will look for the
        `default-src` directive.

## Syntax

```http
Content-Security-Policy: prefetch-src 'none';
Content-Security-Policy: prefetch-src <source-expression-list>;
```

This directive may have one of the following values:

- `'none'`
    No resources of this type may be loaded. The single quotes are mandatory.
- ``
    A space-separated list of _source expression_ values. Resources of this type may be loaded if they match any of the given source expressions. For this directive, the following source expression values are applicable:
    - `<host-source>`
    - `<scheme-source>`
    - `'self'`

## Example

### Prefetch resources do not match header

Given a page with the following Content Security Policy:

```http
Content-Security-Policy: prefetch-src https://example.com/
```

Fetches for the following code will return network errors, as the URLs provided do not
match `prefetch-src`'s source list:

```html
<link rel="prefetch" href="https://example.org/" />
<link rel="prerender" href="https://example.org/" />
```

## See also

- `Content-Security-Policy`
