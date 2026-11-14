---
title: "Content-Security-Policy: worker-src directive"
tool: "mdn-http"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/http/reference/headers/content-security-policy/worker-src/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Content-Security-Policy: worker-src directive

The HTTP `Content-Security-Policy` (CSP)
**`worker-src`** directive specifies valid sources for
`Worker`, `SharedWorker`, or `ServiceWorker`
scripts.

       | CSP version
       | 3

       | Directive type
       | Fetch directive

       | Fallback
       |

          If this directive is absent, the user agent will first look for the
           directive, then the
           directive, then finally for the
           directive, when governing worker
          execution.

## Syntax

```http
Content-Security-Policy: worker-src 'none';
Content-Security-Policy: worker-src <source-expression-list>;
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
Content-Security-Policy: worker-src https://example.com/
```

`Worker`, `SharedWorker`, `ServiceWorker` are
blocked and won't load:

```html
<script>
  let blockedWorker = new Worker("data:text/javascript,…");
  blockedWorker = new SharedWorker("https://not-example.com/");
  navigator.serviceWorker.register("https://not-example.com/sw.js");
</script>
```

## See also

- `Content-Security-Policy`
- CSP for Web Workers
- `Worker`, `SharedWorker`, `ServiceWorker`
