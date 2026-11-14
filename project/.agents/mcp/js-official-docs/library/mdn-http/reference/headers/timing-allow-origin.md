---
title: "Timing-Allow-Origin header"
tool: "mdn-http"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/http/reference/headers/timing-allow-origin/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Timing-Allow-Origin header

The HTTP **`Timing-Allow-Origin`** response header specifies origins that are allowed to see values of attributes retrieved via features of the Resource Timing API that are otherwise restricted for cross-origin resources.
Without it, the browser reports these values as zero, an empty string, or an empty array.
For the list of affected properties, see Cross-origin restrictions in the `PerformanceResourceTiming` reference.

The browser checks this header on cross-origin responses: same-origin resources expose full timing information without it.

This header is independent of CORS.
Passing the CORS check doesn't grant access to detailed timing information.
Conversely, `Timing-Allow-Origin` doesn't expose properties that describe the response itself, such as its body size, content type, or status code.

       | Header type
       | Response header

## Syntax

```http
Timing-Allow-Origin: *
Timing-Allow-Origin: <origin>, …, <originN>
```

## Directives

- `*` (wildcard)
    Any origin may see timing resources.
- `<origin>`
    Specifies a URI that may see the timing resources. You can specify multiple origins, separated by commas.

## Examples

### Using Timing-Allow-Origin

To allow any resource to see timing resources:

```http
Timing-Allow-Origin: *
```

To allow `https://developer.mozilla.org` to see timing resources, you can specify:

```http
Timing-Allow-Origin: https://developer.mozilla.org
```

## See also

- `PerformanceResourceTiming`
- Resource Timing API
- `Server-Timing` header
- `Vary` header
