---
title: "`<meta>` HTML metadata element"
tool: "mdn-html"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/html/reference/elements/meta/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `<meta>` HTML metadata element

The **`<meta>`** HTML element represents metadata that cannot be represented by other meta-related elements, such as `<base>`, `<link>`, `<script>`, `<style>`, or `<title>`.

The type of metadata provided by the `<meta>` element can be one of the following:

- If the `name` attribute is set, the `<meta>` element provides _document-level metadata_ that applies to the whole page.
- If the `http-equiv` attribute is set, the `<meta>` element acts as a _pragma directive_ to simulate directives that could otherwise be given by an HTTP header.
- If the `charset` attribute is set, the `<meta>` element is a _charset declaration_, giving the character encoding in which the document is encoded.
- If the `itemprop` attribute is set, the `<meta>` element provides _user-defined metadata_.

## Attributes

This element includes the global attributes.

> **Note:**
> The `name` attribute has a specific meaning for the `<meta>` element.
> The `itemprop` attribute must not be set on a `<meta>` element that includes a `name`, `http-equiv`, or `charset` attribute.

- `charset`
    This attribute declares the document's character encoding. If the attribute is present, its value must be an ASCII case-insensitive match for the string `"utf-8"`, because UTF-8 is the only valid encoding for HTML5 documents. `<meta>` elements which declare a character encoding must be located entirely within the first 1024 bytes of the document.
- `content`
    This attribute contains the value for the `http-equiv` or `name` attribute, depending on which is used.
- `http-equiv`
    Defines a pragma directive, which are instructions for the browser for processing the document.
    The attribute's name is short for `http-equivalent` because the allowed values are names of equivalent HTTP headers.
- `media`
    The `media` attribute defines which media the theme color defined in the `content` attribute should be applied to.
    Its value is a media query, which defaults to `all` if the attribute is missing.
    This attribute is only relevant when the element's `name` attribute is set to `theme-color`.
    Otherwise, it has no effect, and should not be included.
- `name`
    The `name` and `content` attributes can be used together to provide document metadata in terms of name-value pairs, with the `name` attribute giving the metadata name, and the `content` attribute giving the value.

## Examples

### Setting a meta description

The following `<meta>` tag provides a `description` as metadata for the web page:

```html
<meta
  name="description"
  content="The HTML reference describes all elements and attributes of HTML, including global attributes that apply to all elements." />
```

### Setting a page redirect

The following example uses `http-equiv="refresh"` to direct the browser to perform a redirect.
The `content="3;url=https://www.mozilla.org"` attribute will redirect page to `https://www.mozilla.org` after 3 seconds:

```html
<meta http-equiv="refresh" content="3;url=https://www.mozilla.org" />
```

## Technical summary

       |
        Content categories

       |
        Metadata content. If the `itemprop` attribute is present:
        flow content,
        phrasing content.

       | Permitted content
       | None; it is a void element.

       | Tag omission
       | Must have a start tag and must not have an end tag.

       | Permitted parents
       |

            `&#x3C;meta charset>`,
            `&#x3C;meta http-equiv>`: a
            `<head>` element. If the
            `http-equiv` is not an
            encoding declaration, it can also be inside a
            `<noscript>` element, itself inside a
            `&#x3C;head>` element.

            `&#x3C;meta name>`: any element that accepts
            metadata content.

            `&#x3C;meta itemprop>`: any element that accepts
            metadata content
            or
            flow content.

       | Implicit ARIA role
       |
        No corresponding role

       | Permitted ARIA roles
       | No `role` permitted

       | DOM interface
       | `HTMLMetaElement`

## See also

- Standard metadata names
- Learn: `<meta>`
