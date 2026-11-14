---
title: "Content-Security-Policy: frame-src directive"
tool: "mdn-http"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/http/reference/headers/content-security-policy/frame-src/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Content-Security-Policy: frame-src directive

The HTTP `Content-Security-Policy` (CSP)
**`frame-src`** directive specifies valid sources for nested
browsing contexts loading using elements such as `<frame>` and
``.

> **Note:**
> **`frame-src`** allows you to specify where iframes in a page may be loaded from.
> This differs from **`frame-ancestors`**, which allows you to specify what parent source may embed a page.

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
Content-Security-Policy: frame-src 'none';
Content-Security-Policy: frame-src <source-expression-list>;
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
Content-Security-Policy: frame-src https://example.com/
```

The following `` is blocked and won't load:

```html
<iframe src="https://not-example.com/"></iframe>
```

## See also

- `Content-Security-Policy`
- `<frame>` and ``
-
