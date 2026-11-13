---
title: "Content-Security-Policy: manifest-src directive"
tool: "mdn-http"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/http/reference/headers/content-security-policy/manifest-src/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Content-Security-Policy: manifest-src directive

The HTTP
`Content-Security-Policy` **`manifest-src`**
directive specifies which manifest can be applied
to the resource.

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
Content-Security-Policy: manifest-src 'none';
Content-Security-Policy: manifest-src <source-expression-list>;
```

This directive may have one of the following values:

- `'none'`
    No resources of this type may be loaded. The single quotes are mandatory.
- ``
    A space-separated list of _source expression_ values. Resources of this type may be loaded if they match any of the given source expressions. For this directive, the following source expression values are applicable:
    - `<host-source>`
    - `<scheme-source>`
    - `'self'`

## Examples

### Violation cases

Given this CSP header:

```http
Content-Security-Policy: manifest-src https://example.com/
```

The following `<link>` is blocked and won't load:

```html
<link rel="manifest" href="https://not-example.com/manifest" />
```

## See also

- `Content-Security-Policy`
- Web app manifest
- `<link>`
