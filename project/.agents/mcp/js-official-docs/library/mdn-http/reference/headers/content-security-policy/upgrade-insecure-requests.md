---
title: "Content-Security-Policy: upgrade-insecure-requests directive"
tool: "mdn-http"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/http/reference/headers/content-security-policy/upgrade-insecure-requests/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Content-Security-Policy: upgrade-insecure-requests directive

The HTTP `Content-Security-Policy` (CSP)
**`upgrade-insecure-requests`** directive instructs user
agents to treat all of a site's insecure URLs (those served over HTTP) as though they
have been replaced with secure URLs (those served over HTTPS). This directive is
intended for websites with large numbers of insecure legacy URLs that need to be
rewritten.

The `upgrade-insecure-requests` directive will not ensure that users
visiting your site via links on third-party sites will be upgraded to HTTPS for the
top-level navigation and thus does not replace the
`Strict-Transport-Security` (HSTS) header, which
should still be set with an appropriate `max-age` to ensure that users are
not subject to SSL stripping attacks.

## Syntax

```http
Content-Security-Policy: upgrade-insecure-requests;
```

## Examples

### Using the HTTP header

```http
Content-Security-Policy: upgrade-insecure-requests;
```

### Using the HTML meta element

```html
<meta
  http-equiv="Content-Security-Policy"
  content="upgrade-insecure-requests" />
```

With the above header set on a domain example.com that wants to migrate from HTTP to
HTTPS, non-navigational insecure resource requests are automatically upgraded
(first-party as well as third-party requests).

```html
<img src="http://example.com/image.png" />
<img src="http://not-example.com/image.png" />
```

These URLs will be rewritten before the request is made, meaning that no insecure
requests will hit the network. Note that, if the requested resource is not actually
available via HTTPS, the request will fail without any fallback to HTTP.

```html
<img src="https://example.com/image.png" />
<img src="https://not-example.com/image.png" />
```

Navigational upgrades to third-party resources brings a significantly higher potential
for breakage, these are not upgraded:

```html
<a href="https://example.com/">Home</a>
<a href="http://not-example.com/">Home</a>
```

### Finding insecure requests

With the help of the `Content-Security-Policy-Report-Only` header and
the  directive, you can set-up an enforced policy and a reported
policy like this:

```http
Content-Security-Policy: upgrade-insecure-requests; default-src https:
Content-Security-Policy-Report-Only: default-src https:; report-uri /endpoint
```

That way, you still upgrade insecure requests on your secure site, but only the
monitoring policy is violated and reports insecure resources to your endpoint.

## See also

- `Content-Security-Policy`
- `Upgrade-Insecure-Requests` header
- `Strict-Transport-Security` (HSTS) header
- Mixed content
