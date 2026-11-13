---
title: "`<meta http-equiv>` HTML attribute"
tool: "mdn-html"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/html/reference/elements/meta/http-equiv/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `<meta http-equiv>` HTML attribute

The **`http-equiv`** attribute of the `<meta>` element allows you to provide processing instructions for the browser as if the response that returned the document included certain HTTP headers.
The metadata is _document-level metadata_ that applies to the whole page.

When a `<meta>` element has an `http-equiv` attribute, a `content` attribute defines the corresponding `http-equiv` value.
For example, the following `<meta>` tag tells the browser to refresh the page after 5 minutes:

```html
<meta http-equiv="Refresh" content="300" />
```

## Value

Only a subset of the HTTP headers are supported as `http-equiv` values.
These include:

- `content-language` (deprecated)
    Sets a default language for the document used by assistive technologies or styling by the browser.
    Similar to the `Content-Language` HTTP header.
    Use the `lang` attribute instead.
- `content-type`
    Declares the document's media type (MIME type) and character encoding.
    The `content` attribute must be `"text/html; charset=utf-8"` if specified.
    This is equivalent to a `<meta>` element with the `charset` attribute specified and carries the same restriction on placement within the document.
    Can only be used in documents served with a `text/html` media type — not in documents served with an XML (`application/xml` or `application/xhtml+xml`) type.
    See the `Content-Type` HTTP header.
- `content-security-policy`
    Allows page authors to define a content security policy (CSP) for the current page, typically to specify allowed origins and script endpoints to guard against cross-site scripting attacks.
    See the `Content-Security-Policy` HTTP header.
- `default-style`
    Sets the name of the default CSS style sheet set.
- `refresh`
    Equivalent to the `Refresh` HTTP header.
    This instruction specifies:
    - The number of seconds until the page should be reloaded if the `content` attribute is a non-negative integer.
    - The number of seconds until the page should redirect to another URL if the `content` attribute is a non-negative integer followed by `;url=` and a valid URL.

    The timer starts when the page is _completely loaded_, which is after the `load` and `pageshow` events have both fired.
    See Accessibility concerns for more information.

- `set-cookie` (deprecated)
    Sets a cookie for the document.
    Browsers now ignore this pragma; use the `Set-Cookie` HTTP response header or `document.cookie` instead.
- `x-ua-compatible` (deprecated)
    Used by legacy versions of the now-retired Microsoft Internet Explorer so that it more closely followed specified behavior.
    If specified, the `content` attribute must have the value `"IE=edge"`.
    User agents now ignore this pragma.
    The name derives from the `X-UA-Compatible` HTTP header.

> **Warning:**
> Some browsers process additional headers that are not listed above.
> Since unrecognized headers or invalid values are ignored, this can lead to inconsistent behavior across browser implementations.
> In particular, **Do not set other security headers** using `<meta http-equiv=`, as this can lead to a false sense of security!

## Accessibility concerns

Pages set with a `http-equiv="Refresh"` value run the risk of having the refresh interval being too short.
People navigating with the aid of assistive technology such as a screen reader may be unable to read through and understand the page's content before being automatically redirected.
Abrupt, unannounced page updates may also be disorienting for people experiencing low vision conditions.

- MDN Understanding WCAG, Guideline 2.2 explanations
- MDN Understanding WCAG, Guideline 3.2 explanations
- Understanding Success Criterion 2.2.1 | W3C Understanding WCAG 2.0
- Understanding Success Criterion 2.2.4 | W3C Understanding WCAG 2.0
- Understanding Success Criterion 3.2.5 | W3C Understanding WCAG 2.0

## Examples

### Disable unsafe inline code and only allow HTTPS resources

This HTML `<meta>` element sets the default CSP to only allow resource loading (images, fonts, scripts, etc.) over HTTPS.
Because the `unsafe-inline` and `unsafe-eval` directives are not set, inline scripts will be blocked:

```html
<meta http-equiv="Content-Security-Policy" content="default-src https:" />
```

The same restrictions can be applied using the HTTP `Content-Security-Policy` header:

```http
Content-Security-Policy: default-src https:
```

### Setting a page redirect

The following example uses `http-equiv="refresh"` to direct the browser to perform a redirect.
The `content="3;url=https://www.mozilla.org"` attribute will redirect page to `https://www.mozilla.org` after 3 seconds:

```html
<meta http-equiv="refresh" content="3;url=https://www.mozilla.org" />
```

## See also

- `<meta name="referrer">`
- Metadata: the `<meta>` element
- Preventing attacks using `<meta>` httparchive.org (2022)
