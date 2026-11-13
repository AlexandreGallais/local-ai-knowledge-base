---
title: "Content-Security-Policy: style-src-attr directive"
tool: "mdn-http"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/http/reference/headers/content-security-policy/style-src-attr/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Content-Security-Policy: style-src-attr directive

The HTTP `Content-Security-Policy` (CSP) **`style-src-attr`** directive specifies valid sources for inline styles applied to individual DOM elements.

The directive does not set valid sources for `<style>` elements and `<link>` elements with `rel="stylesheet"`.
These are set using  (and valid sources for all styles may be set with ).

       | CSP version
       | 3

       | Directive type
       | Fetch directive

       |  fallback
       |

          Yes.
          If this directive is absent, the user agent will look for the  directive, and if both of them are absent, fallback to `default-src` directive.

## Syntax

```http
Content-Security-Policy: style-src-attr 'none';
Content-Security-Policy: style-src-attr <source-expression-list>;
```

This directive may have one of the following values:

- `'none'`
    No resources of this type may be loaded. The single quotes are mandatory.
- ``
    A space-separated list of _source expression_ values. Resources of this type may be loaded if they match any of the given source expressions. For this directive, the following source expression values are applicable:
    - `'unsafe-hashes'`
    - `'unsafe-inline'`
    - `'report-sample'`

`style-src-attr` can be used in conjunction with :

```http
Content-Security-Policy: style-src <source>;
Content-Security-Policy: style-src-attr <source>;
```

## Examples

### Violation cases

Given this CSP header:

```http
Content-Security-Policy: style-src-attr 'none'
```

…the inline style applied to the element below will not be applied:

```html
<div style="display: inline">Foo</div>
```

The policy would also block any styles applied in JavaScript by setting the `style` attribute directly, or by setting `cssText`:

```js
document.querySelector("div").setAttribute("style", "display: inline");
document.querySelector("div").style.cssText = "display: inline";
```

Style properties that are set directly on the element's `style` property will not be blocked, allowing users to safely manipulate styles via JavaScript:

```js
document.querySelector("div").style.display = "inline";
```

Note that using JavaScript might independently be blocked using the  CSP directive.

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
