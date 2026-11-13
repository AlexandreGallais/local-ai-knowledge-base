---
title: "Content-Security-Policy: media-src directive"
tool: "mdn-http"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/http/reference/headers/content-security-policy/media-src/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Content-Security-Policy: media-src directive

The HTTP `Content-Security-Policy` (CSP)
**`media-src`** directive specifies valid sources for loading
media using the `<audio>` and `` elements.

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
Content-Security-Policy: media-src 'none';
Content-Security-Policy: media-src <source-expression-list>;
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
Content-Security-Policy: media-src https://example.com/
```

The following `<audio>`, `` and
`<track>` elements are blocked and won't load:

```html
<audio src="https://not-example.com/audio"></audio>

<video src="https://not-example.com/video">
  <track kind="subtitles" src="https://not-example.com/subtitles" />
</video>
```

## See also

- `Content-Security-Policy`
- `<audio>`, `` and `<track>`
