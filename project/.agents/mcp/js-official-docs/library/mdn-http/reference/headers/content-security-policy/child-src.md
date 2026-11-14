---
title: "Content-Security-Policy: child-src directive"
tool: "mdn-http"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/http/reference/headers/content-security-policy/child-src/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Content-Security-Policy: child-src directive

The HTTP `Content-Security-Policy` (CSP)
**`child-src`** directive defines the valid sources for web workers and nested browsing
contexts loaded using elements such as `<frame>` and
``. For workers, non-compliant requests are treated as fatal
network errors by the user agent.

       | CSP version
       | 2

       | Directive type
       | Fetch directive

       |  fallback
       |
        Yes. If this directive is absent, the user agent will look for the
        `default-src` directive.

## Syntax

```http
Content-Security-Policy: child-src 'none';
Content-Security-Policy: child-src <source-expression-list>;
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
Content-Security-Policy: child-src https://example.com/
```

This `` and worker are blocked and won't load:

```html
<iframe src="https://not-example.com"></iframe>

<script>
  const blockedWorker = new Worker("data:text/javascript,…");
</script>
```

## See also

- `Content-Security-Policy`
- `<frame>` and ``
- `Worker`, `SharedWorker`, `ServiceWorker`
