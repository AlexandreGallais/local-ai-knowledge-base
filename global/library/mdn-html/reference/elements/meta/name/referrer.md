---
title: "`<meta name=\"referrer\">` HTML attribute value"
tool: "mdn-html"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/html/reference/elements/meta/name/referrer/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `<meta name="referrer">` HTML attribute value

The **`referrer`** value for the `name` attribute of the `<meta>` element controls the HTTP `Referer` header of requests sent from the document.
If specified, you define the referrer using a `content` attribute in the `<meta>` element as a keyword value.

For example, the following `<meta>` element sends the origin of the document as the referrer:

```html
<meta name="referrer" content="origin" />
```

> **Warning:**
> Dynamically inserting `<meta name="referrer">` (with `document.write()` or `appendChild()`) makes the referrer behavior unpredictable.
> When several conflicting policies are defined, the `no-referrer` policy is applied.

## Usage notes

A `<meta name="referrer">` element has the following additional attributes:

- `content`
    Sets the document referrer. You must define this attribute.
    Accepts one of the following values:
    - `no-referrer`
        Does not send an HTTP `Referer` header.
    - `origin`
        Sends the origin of the document.
    - `no-referrer-when-downgrade`
        Sends the full URL when the destination is at least as secure as the current page (HTTP(S)→HTTPS), but sends no referrer when it's less secure (HTTPS→HTTP). This is the default behavior.
    - `origin-when-cross-origin`
        Sends the full URL (stripped of parameters) for same-origin requests, but only sends the origin for other cases.
    - `same-origin`
        Sends the full URL (stripped of parameters) for same-origin requests. Cross-origin requests will contain no referrer header.
    - `strict-origin`
        Sends the origin when the destination is at least as secure as the current page (HTTP(S)→HTTPS), but sends no referrer when it's less secure (HTTPS→HTTP).
    - `strict-origin-when-cross-origin`
        Sends the full URL (stripped of parameters) for same-origin requests. Sends the origin when the destination is at least as secure as the current page (HTTP(S)→HTTPS). Otherwise, sends no referrer.
    - `unsafe-URL`
        Sends the full URL (stripped of parameters) for same-origin or cross-origin requests.

## Examples

### Removing a referrer from requests

The following `<meta>` element specifies that the document shouldn't send a `Referer` header with HTTP requests from the document:

```html
<meta name="referrer" content="no-referrer" />
```

## See also

- HTTP `Referer` header
