---
title: "Content-Security-Policy: form-action directive"
tool: "mdn-http"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/http/reference/headers/content-security-policy/form-action/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Content-Security-Policy: form-action directive

The HTTP `Content-Security-Policy` (CSP) **`form-action`** directive restricts the URLs which can be used as the target of form submissions from a given context.

> **Warning:**
> Whether `form-action` should block redirects after a form submission is debated and browser implementations of this aspect are inconsistent (e.g., Firefox 57 doesn't block the redirects whereas Chrome 63 does).

       | CSP version
       | 2

       | Directive type
       | Navigation directive

       |  fallback
       | No. Not setting this allows anything.

## Syntax

```http
Content-Security-Policy: form-action 'none';
Content-Security-Policy: form-action <source-expression-list>;
```

This directive may have one of the following values:

- `'none'`
    No form submissions may be made. The single quotes are mandatory.
- ``
    A space-separated list of _source expression_ values. Form submissions may be made to URLs that match any of the given source expressions. For this directive, the following source expression values are applicable:
    - `<host-source>`
    - `<scheme-source>`
    - `'self'`

## Examples

### Meta tag configuration

```html
<meta http-equiv="Content-Security-Policy" content="form-action 'none'" />
```

### Apache configuration

```apacheconf
<IfModule mod_headers.c>
  Header set Content-Security-Policy "form-action 'none';"
</IfModule>
```

### Nginx configuration

```nginx
add_header Content-Security-Policy "form-action 'none';"
```

### Violation case

Using a `<form>` element with an action set to inline JavaScript will result in a CSP violation.

```html
<meta http-equiv="Content-Security-Policy" content="form-action 'none'" />

<form action="javascript:alert('Foo')" id="form1" method="post">
  <input type="text" name="fieldName" value="fieldValue" />
  <input type="submit" id="submit" value="submit" />
</form>

<!--
// Error: Refused to send form data because it violates the following
// Content Security Policy directive: "form-action 'none'".
-->
```

## See also

- `Content-Security-Policy`
- `<form>`
