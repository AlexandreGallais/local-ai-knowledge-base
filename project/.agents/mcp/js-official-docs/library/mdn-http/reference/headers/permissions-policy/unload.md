---
title: "Permissions-Policy: unload directive"
tool: "mdn-http"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/http/reference/headers/permissions-policy/unload/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Permissions-Policy: unload directive

The HTTP `Permissions-Policy` header `unload` directive controls whether the current document is allowed to run `unload` event handlers.

Where a defined policy disallows use of this feature, `unload` event handlers registered in the document will not run.

`unload` handlers are unreliable and prevent pages from being stored in the back/forward cache (bfcache). Blocking them lets a page stay eligible for the bfcache, even if third-party scripts in the page add `unload` handlers. See the usage notes for the `unload` event for alternatives.

## Syntax

```http
Permissions-Policy: unload=<allowlist>;
```

- `<allowlist>`
    A list of origins for which permission is granted to use the feature. See `Permissions-Policy` > Syntax for more details.

## Default policy

In Chrome, the default allowlist for `unload` is `()`, which means that `unload` handlers do not run unless a document opts in. Chrome originally used a default allowlist of `*`, and changed it gradually.

## Examples

### Blocking unload handlers

A site wants to make sure that no `unload` handlers run in its pages or in any of their embedded iframes, so that the pages remain eligible for the bfcache. It can do so by delivering the following HTTP response header:

```http
Permissions-Policy: unload=()
```

### Allowing unload handlers

A site that still depends on `unload` handlers can allow them to run in its top-level pages by delivering the following HTTP response header:

```http
Permissions-Policy: unload=self
```

To also allow `unload` handlers in a cross-origin iframe whose origin is `https://example.com`, the embedding page must include that origin in its allowlist:

```http
Permissions-Policy: unload=(self "https://example.com")
```

It must also include an `<allow>` attribute on the `` element:

```html
<iframe src="https://example.com/embed" allow="unload"></iframe>
```

The document loaded in the iframe must also allow `unload` handlers, using its own `Permissions-Policy: unload=self` response header.

## See also

- `Permissions-Policy` header
- Permissions Policy
- `unload` event
- Deprecating the unload event on developer.chrome.com
