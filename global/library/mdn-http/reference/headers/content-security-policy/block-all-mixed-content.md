---
title: "Content-Security-Policy: block-all-mixed-content directive"
tool: "mdn-http"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/http/reference/headers/content-security-policy/block-all-mixed-content/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Content-Security-Policy: block-all-mixed-content directive

> **Warning:**
> This directive is marked as obsolete in the specification.
> This directive was previously used to prevent "optionally blockable" mixed content from being fetched insecurely and displayed.
> Content that isn't blocked is now always upgraded to a secure connection, so this directive is not needed.

The HTTP `Content-Security-Policy` (CSP) **`block-all-mixed-content`** directive prevents loading any assets over HTTP when the page uses HTTPS.

All mixed content resource requests are blocked, including both blockable and upgradable mixed content.
This also applies to `` documents, ensuring the entire page is mixed content-free.

> **Note:**
> The  directive is evaluated before `block-all-mixed-content`.
> If the former is set, the latter does nothing, so set one directive or the other – not both, unless you want to force HTTPS on older browsers that do not force it after a redirect to HTTP.

## Syntax

```http
Content-Security-Policy: block-all-mixed-content;
```

## Examples

```http
Content-Security-Policy: block-all-mixed-content;

<meta http-equiv="Content-Security-Policy" content="block-all-mixed-content">
```

To disallow http assets on a more granular level, you can also set individual directives to `https:`.
For example, to disallow insecure HTTP images:

```http
Content-Security-Policy: img-src https:
```

## See also

- `Content-Security-Policy`
-
- Mixed content
