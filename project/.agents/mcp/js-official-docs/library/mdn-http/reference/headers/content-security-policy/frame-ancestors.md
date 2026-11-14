---
title: "Content-Security-Policy: frame-ancestors directive"
tool: "mdn-http"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/http/reference/headers/content-security-policy/frame-ancestors/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Content-Security-Policy: frame-ancestors directive

The HTTP `Content-Security-Policy` (CSP) **`frame-ancestors`** directive specifies valid parents that may embed a page using `<frame>`, ``, `<object>`, or ``.

Setting this directive to `'none'` is similar to `X-Frame-Options: deny` (which is also supported in older browsers).

> **Note:**
> **`frame-ancestors`** allows you to specify what parent source may embed a page.
> This differs from **`frame-src`**, which allows you to specify where iframes in a page may be loaded from.

> **Note:**
> The **`frame-ancestors`** directive checks each ancestor. If any ancestor doesn't match, the load is canceled. Therefore all ancestors should be allowed by the **`frame-ancestors`** directive of leaf frames when using nested frames.

       | CSP version
       | 2

       | Directive type
       | Navigation directive

       |  fallback
       | No. Not setting this allows anything.

       |
        This directive is not supported in the `<meta>`
        element.

## Syntax

```http
Content-Security-Policy: frame-ancestors 'none';
Content-Security-Policy: frame-ancestors <source-expression-list>;
```

This directive may have one of the following values:

- `'none'`
    This resource may not be embedded. The single quotes are mandatory.
- ``
    A space-separated list of _source expression_ values. This resource may be embedded if the embedder matches any of the given source expressions. For this directive, the following source expression values are applicable:
    - `<host-source>`
    - `<scheme-source>`
    - `'self'`

> **Note:**
> The `frame-ancestors` directive's syntax is similar to the source list syntax accepted by other directives (e.g., ), but it does not fall back to the `default-src` setting. A policy that declares `default-src 'none'` still allows the resource to be embedded by anyone.

## Examples

```http
Content-Security-Policy: frame-ancestors 'none';

Content-Security-Policy: frame-ancestors 'self' https://www.example.org;

Content-Security-Policy: frame-ancestors 'self' https://example.org https://example.com https://store.example.com;
```

## See also

- `Content-Security-Policy`
- `X-Frame-Options`
-  CSP
