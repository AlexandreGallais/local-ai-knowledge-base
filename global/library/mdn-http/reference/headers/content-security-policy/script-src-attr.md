---
title: "Content-Security-Policy: script-src-attr directive"
tool: "mdn-http"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/http/reference/headers/content-security-policy/script-src-attr/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Content-Security-Policy: script-src-attr directive

The HTTP `Content-Security-Policy` (CSP) **`script-src-attr`** directive specifies valid sources for JavaScript inline event handlers.

This directive only specifies valid sources for inline script event handlers like `onclick`.
It does not apply to other JavaScript sources that can trigger script execution, such as URLs loaded directly into `<script>` elements and XSLT stylesheets.
(Valid sources can be specified for all JavaScript script sources using , or just for `<script>` elements using .)

       | CSP version
       | 3

       | Directive type
       | Fetch directive

       |  fallback
       |
        Yes.
        If this directive is absent, the user agent will look for the  directive, and if both of them are absent, fallback to `default-src` directive.

## Syntax

```http
Content-Security-Policy: script-src-attr 'none';
Content-Security-Policy: script-src-attr <source-expression-list>;
```

This directive may have one of the following values:

- `'none'`
    No resources of this type may be loaded. The single quotes are mandatory.
- ``
    A space-separated list of _source expression_ values. Resources of this type may be loaded if they match any of the given source expressions. For this directive, the following source expression values are applicable:
    - `'unsafe-hashes'`
    - `'unsafe-inline'`
    - `'report-sample'`

`script-src-attr` can be used in conjunction with , and will override that directive for checks on inline handlers:

```http
Content-Security-Policy: script-src <source>;
Content-Security-Policy: script-src-attr <source>;
```

## Examples

### Violation case

Given this CSP header:

```http
Content-Security-Policy: script-src-attr 'none'
```

…the following inline event handler is blocked and won't be loaded or executed:

```html
<button id="btn" onclick="doSomething()">Click me</button>
```

Note that generally you should replace inline event handlers with `addEventListener` calls:

```js
document.getElementById("btn").addEventListener("click", doSomething);
```

## See also

- `Content-Security-Policy`
- `<script>`
-
-
