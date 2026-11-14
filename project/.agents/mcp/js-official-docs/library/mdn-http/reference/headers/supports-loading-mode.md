---
title: "Supports-Loading-Mode header"
tool: "mdn-http"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/http/reference/headers/supports-loading-mode/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Supports-Loading-Mode header

The HTTP **`Supports-Loading-Mode`** response header allows a response to opt-in to being loaded in a novel, higher-risk context that it would otherwise fail to be loaded in.

       | Header type
       | Response header

       |
        CORS-safelisted response header

       | No

## Syntax

```http
Supports-Loading-Mode: <client-hint-headers>
```

## Directives

The `Supports-Loading-Mode` header value is a list of one or more tokens, which can include the following values:

- `credentialed-prerender` (experimental)
    Indicates that a destination origin opts in to loading documents via cross-origin, same-site prerendering.
- `fenced-frame` (experimental)
    The response can be loaded inside a fenced frame. Without this explicit opt-in, all navigations inside of a fenced frame will fail.

## Examples

```http
Supports-Loading-Mode: fenced-frame
```

## See also

- Fenced Frame API
- Speculation Rules API
- Speculative loading
- Prerender pages in Chrome for instant page navigations on developer.chrome.com
