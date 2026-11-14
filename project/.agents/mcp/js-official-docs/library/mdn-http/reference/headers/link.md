---
title: "Link header"
tool: "mdn-http"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/http/reference/headers/link/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Link header

The HTTP **`Link`** header provides a means for serializing one or more links in HTTP headers.
This allows the server to point a client to another resource containing metadata about the requested resource.
This header has the same semantics as the HTML `<link>` element.
One benefit of using the `Link` header is that the browser can start preconnecting or preloading resources before the HTML itself is fetched and processed.

In practice, most `rel` link types don't have an effect when used with the HTTP header.
For example, the `icon` relation only works in HTML, and `stylesheet` does not work reliably across browsers (only in Firefox).
The only relations that work reliably are `preconnect` and `preload`, which can be combined with `103 Early Hints`.

       | Header type
       |
        Response header, Request header

       | Forbidden request header
       | No

       |
        CORS-safelisted response header

       | No

## Syntax

```http
Link: <uri-reference>; param1=value1; param2="value2"
```

- `<uri-reference>`
    The URI reference, must be enclosed between `<` and `>` and percent-encoded.

### Parameters

The link header contains parameters, which are separated with `;` and are equivalent to attributes of the `<link>` element.
Values can be both quoted or unquoted based on field value component rules, so `x=y` is equivalent to `x="y"`.

## Examples

### Enclose URLs in angle brackets

The URI (absolute or relative) must be enclosed between `<` and `>`:

```http
Link: <https://example.com>; rel="preconnect"
```

```http
Link: https://bad.example; rel="preconnect"
```

### Encoding URLs

The URI (absolute or relative) must percent-encode character codes greater than 255:

```http
Link: <https://example.com/%E8%8B%97%E6%9D%A1>; rel="preconnect"
```

```http
Link: <https://example.com/苗条>; rel="preconnect"
```

### Specifying multiple links

You can specify multiple links separated by commas, for example:

```http
Link: <https://one.example.com>; rel="preconnect", <https://two.example.com>; rel="preconnect", <https://three.example.com>; rel="preconnect"
```

### Pagination through links

The `Link` header can provide pagination information to a client, which is commonly used to access resources programmatically:

```http
Link: <https://api.example.com/issues?page=2>; rel="prev", <https://api.example.com/issues?page=4>; rel="next", <https://api.example.com/issues?page=10>; rel="last", <https://api.example.com/issues?page=1>; rel="first"
```

In this case, `rel="prev"` and `rel="next"` show link relations for previous and next pages, and there are `rel="last"` and `rel="first"` parameters providing first and last pages of search results.

### Controlling fetch priority

Even when using `preload` to fetch a resource as early as possible, different types of content will be fetched earlier or later based on the browser's internal prioritization.
The `fetchpriority` attribute can be used to hint to the browser that a particular resource will have a greater or lesser relative impact on user experience than other resources of the same type.

For example, the header below might be used to preload `style.css` with a higher priority than other stylesheets:

```http
Link: </style.css>; rel=preload; as=style; fetchpriority="high"
```

Note that both the internal prioritization for fetching resources and the effect of the `fetchpriority` directive are browser-dependent.
The `fetchpriority` directive should be used sparingly, and only in cases where a browser cannot infer that a particular resource should be treated with a different priority.

## See also

- `103 Early Hints`
- `<link>`
- Link Relations IANA registry
- Optimize resource loading with the Fetch Priority API for information about how this API affects priorities on Chrome.
