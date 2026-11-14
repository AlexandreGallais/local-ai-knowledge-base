---
title: "Content-Security-Policy: connect-src directive"
tool: "mdn-http"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/http/reference/headers/content-security-policy/connect-src/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Content-Security-Policy: connect-src directive

The HTTP `Content-Security-Policy` (CSP)
**`connect-src`** directive restricts the URLs which can be
loaded using script interfaces. The following APIs are controlled by this directive:

- The `ping` attribute in `` elements
- `fetch()`
- `fetchLater()` (experimental)
- `XMLHttpRequest`
- `WebSocket`
- `EventSource`
- `Navigator.sendBeacon()`

> **Note:**
> `connect-src 'self'` does not resolve to websocket
> schemes in all browsers, more info in this issue.

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
Content-Security-Policy: connect-src 'none';
Content-Security-Policy: connect-src <source-expression-list>;
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
Content-Security-Policy: connect-src https://example.com/
```

The following connections are blocked and won't load:

```html
<a ping="https://not-example.com" href="/">Link</a>
<script>
  const response = fetch("https://not-example.com/");

  const xhr = new XMLHttpRequest();
  xhr.open("GET", "https://not-example.com/");
  xhr.send();

  const ws = new WebSocket("wss://not-example.com/");

  const es = new EventSource("https://not-example.com/");

  navigator.sendBeacon("https://not-example.com/", {/* … */});
</script>
```

## See also

- `Content-Security-Policy`
- `` `ping`
- `fetch()`
- `XMLHttpRequest`
- `WebSocket`
- `EventSource`
