---
title: "Content-Security-Policy: fenced-frame-src directive"
tool: "mdn-http"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/http/reference/headers/content-security-policy/fenced-frame-src/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Content-Security-Policy: fenced-frame-src directive

The HTTP `Content-Security-Policy` (CSP)
**`fenced-frame-src`** directive specifies valid sources for nested browsing contexts loaded into `<fencedframe>` elements.

       | CSP version
       | 1

       | Directive type
       | Fetch directive

       | Fallback
       |
        If this directive is absent, the user agent will look for the
         directive (which falls back to the
         directive).

## Syntax

```http
Content-Security-Policy: fenced-frame-src <source-expression-list>;
```

- ``
    A space-separated list of _source expression_ values. Resources of this type may be loaded if they match any of the given source expressions. For this directive, the following source expression values are applicable:
    - The `<host-source>` value `"https:"`
    - The `<scheme-source>` value `"https:"`
    - The string `"*"`

## Examples

### Violation cases

Given this CSP header:

```http
Content-Security-Policy: fenced-frame-src https://example.com/
```

The following sources will not load in a fenced frame:

- `https://not-example.com/` (domain doesn't match)
- `https://example.org/` (TLD doesn't match)

## See also

- Fenced Frame API
- `<fencedframe>`
- `Content-Security-Policy`
