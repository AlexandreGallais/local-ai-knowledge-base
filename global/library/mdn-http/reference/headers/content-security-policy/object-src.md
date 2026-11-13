---
title: "Content-Security-Policy: object-src directive"
tool: "mdn-http"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/http/reference/headers/content-security-policy/object-src/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Content-Security-Policy: object-src directive

The HTTP `Content-Security-Policy`
**`object-src`** directive specifies valid sources for the
`<object>` and `` elements.

> **Note:**
> Elements controlled by `object-src` are perhaps coincidentally
> considered legacy HTML elements and aren't receiving new standardized features (such as
> the security attributes `sandbox` or `allow` for
> ``). Therefore it is recommended to restrict
> this fetch-directive (e.g., explicitly set `object-src 'none'` if possible).

       | CSP version
       | 1

       | Directive type
       | Fetch directive

       |  fallback
       |
        Yes. If this directive is absent, the user agent will look for the
        `default-src` directive.

## Syntax

```http
Content-Security-Policy: object-src 'none';
Content-Security-Policy: object-src <source-expression-list>;
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
Content-Security-Policy: object-src https://example.com/
```

The following `<object>` and `` elements are blocked and won't load:

```html
<embed src="https://not-example.com/flash" />
<object data="https://not-example.com/plugin"></object>
```

## See also

- `Content-Security-Policy`
- `<object>` and ``
