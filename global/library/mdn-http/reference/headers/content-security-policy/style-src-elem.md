---
title: "Content-Security-Policy: style-src-elem directive"
tool: "mdn-http"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/http/reference/headers/content-security-policy/style-src-elem/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Content-Security-Policy: style-src-elem directive

The HTTP `Content-Security-Policy` (CSP) **`style-src-elem`** directive specifies valid sources for stylesheet `<style>` elements and `<link>` elements with `rel="stylesheet"`.

The directive does not set valid sources for inline style attributes; these are set using  (and valid sources for all styles may be set with ).

       | CSP version
       | 3

       | Directive type
       | Fetch directive

       |  fallback
       |

          Yes.
          If this directive is absent, the user agent will look for the  directive, and if both of them are absent, fall back to `default-src` directive.

## Syntax

```http
Content-Security-Policy: style-src-elem 'none';
Content-Security-Policy: style-src-elem <source-expression-list>;
```

This directive may have one of the following values:

- `'none'`
    No resources of this type may be loaded. The single quotes are mandatory.
- ``
    A space-separated list of _source expression_ values. Resources of this type may be loaded if they match any of the given source expressions. For this directive, the same source expression values are applicable as for `style-src`, with the exception of `'unsafe-hashes'`.

`style-src-elem` can be used in conjunction with :

```http
Content-Security-Policy: style-src <source>;
Content-Security-Policy: style-src-elem <source>;
```

## Examples

### Violation cases

Given this CSP header:

```http
Content-Security-Policy: style-src-elem https://example.com/
```

…the following stylesheets are blocked and won't load:

```html
<link href="https://not-example.com/styles/main.css" rel="stylesheet" />

<style>
  #inline-style {
    background: red;
  }
</style>

<style>
  @import "https://not-example.com/styles/print.css" print;
</style>
```

…as well as styles loaded using the `Link` header:

```http
Link: <https://not-example.com/styles/stylesheet.css>;rel=stylesheet
```

## See also

- `Content-Security-Policy`
-
-
- `Link` header
- `<style>`, `<link>`
- `@import`
- `CSSStyleSheet.insertRule()`
- `CSSGroupingRule.insertRule()`
- `CSSStyleDeclaration.cssText`
