---
title: "Content-Security-Policy: script-src-elem directive"
tool: "mdn-http"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/http/reference/headers/content-security-policy/script-src-elem/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Content-Security-Policy: script-src-elem directive

The HTTP `Content-Security-Policy` (CSP) **`script-src-elem`** directive specifies valid sources for JavaScript `<script>` elements.

This directive only specifies valid sources in `<script>` elements (both script requests and blocks).
It does not apply to other JavaScript sources that can trigger script execution, such as inline script event handlers (`onclick`), script execution methods gated on the "unsafe-eval" check, and XSLT stylesheets.
(Valid sources can be specified for all JavaScript script sources using , or just for inline script handlers using .)

       | CSP version
       | 3

       | Directive type
       | Fetch directive

       |  fallback
       |
        Yes.
        If this directive is absent, the user agent will look for the  directive, and if both of them are absent, fall back to `default-src` directive.

## Syntax

```http
Content-Security-Policy: script-src-elem 'none';
Content-Security-Policy: script-src-elem <source-expression-list>;
```

This directive may have one of the following values:

- `'none'`
    No resources of this type may be loaded. The single quotes are mandatory.
- ``
    A space-separated list of _source expression_ values. Resources of this type may be loaded if they match any of the given source expressions. For this directive, any of the source expression values listed in Fetch directive syntax are applicable, with the exception of `'unsafe-hashes'`.

`script-src-elem` can be used in conjunction with :

```http
Content-Security-Policy: script-src <source>;
Content-Security-Policy: script-src-elem <source>;
```

## Examples

### Violation case

Given this CSP header:

```http
Content-Security-Policy: script-src-elem https://example.com/
```

…the following script is blocked and won't be loaded or executed:

```html
<script src="https://not-example.com/js/library.js"></script>
```

## See also

- `Content-Security-Policy`
- `<script>`
-
-
