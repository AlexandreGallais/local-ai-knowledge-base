---
title: "Content-Security-Policy: base-uri directive"
tool: "mdn-http"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/http/reference/headers/content-security-policy/base-uri/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Content-Security-Policy: base-uri directive

The HTTP `Content-Security-Policy` **`base-uri`** directive restricts the URLs which can be used in a document's `<base>` element. If this value is absent, then any URI is allowed. If this directive is absent, the user agent will use the value in the `<base>` element.

       | CSP version
       | 2

       | Directive type
       | Document directive

       |  fallback
       | No. Not setting this allows any URL.

## Syntax

```http
Content-Security-Policy: base-uri 'none';
Content-Security-Policy: base-uri <source-expression-list>;
```

This directive may have one of the following values:

- `'none'`
    No base URI may be set using a `<base>` element. The single quotes are mandatory.
- ``
    A space-separated list of _source expression_ values. A `<base>` element may set a base URI if its value matches any of the given source expressions. For this directive, the following source expression values are applicable:
    - `<host-source>`
    - `<scheme-source>`
    - `'self'`

## Examples

### Meta tag configuration

```html
<meta http-equiv="Content-Security-Policy" content="base-uri 'self'" />
```

### Apache configuration

```apacheconf
<IfModule mod_headers.c>
Header set Content-Security-Policy "base-uri 'self'";
</IfModule>
```

### Nginx configuration

```nginx
add_header Content-Security-Policy "base-uri 'self';"
```

### Violation case

Since your domain isn't `example.com`, a `<base>` element with its `href` set to `https://example.com` will result in a CSP violation.

```html
<meta http-equiv="Content-Security-Policy" content="base-uri 'self'" />
<base href="https://example.com/" />

<!--
// Error: Refused to set the document's base URI to 'https://example.com/'
// because it violates the following Content Security Policy
// directive: "base-uri 'self'"
-->
```

## See also

- `Content-Security-Policy`
- `<base>`
- `Node.baseURI`
