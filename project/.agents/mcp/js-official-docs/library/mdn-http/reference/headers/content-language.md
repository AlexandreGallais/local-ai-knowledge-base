---
title: "Content-Language header"
tool: "mdn-http"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/http/reference/headers/content-language/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Content-Language header

The HTTP **`Content-Language`** representation header is used to describe the language(s) intended for the audience, so users can differentiate it according to their own preferred language.

For example, `Content-Language: de-DE` indicates that the document is intended for German language speakers. The document may be written in English, not German, as part of a language course for German speakers. To indicate the language the document is **written in**, use the `lang` attribute instead.

If no `Content-Language` is specified, the default is that the content is intended for all language audiences. Multiple language tags are also possible, as well as applying the `Content-Language` header to various media types and not only to textual documents.

       | Header type
       | Representation header

       | Forbidden request header
       | No

       |
        CORS-safelisted response header

       | Yes

       |
        CORS-safelisted request header

       |
        Yes*

\* Values can only be `0-9`, `A-Z`, `a-z`, a space, or the characters `*,-.;=`.

## Syntax

```http
Content-Language: de-DE
Content-Language: en-US
Content-Language: de-DE, en-CA
```

## Directives

- `language-tag`
    Multiple language tags are separated by a comma. Each language tag is a sequence of one or more case-insensitive subtags, each separated by a hyphen character (`-`). In most cases, a language tag consists of a primary language subtag that identifies a broad family of related languages (e.g., `en` = English) and is optionally followed by a series of subtags that refine or narrow that language's range (e.g., `en-CA` = the variety of English as communicated in Canada).

> **Note:**
> Languages are specified using BCP 47 language tags, which rely on the ISO 639 standard (quite often the ISO 639-1 code list) for language codes to be used.

## Examples

### Indicating the language a document is written in

The global `lang` attribute is used on HTML elements to indicate the language of an entire HTML document or parts of it.

```html
<html lang="de">
  …
</html>
```

Do **not** use this meta element to state the document language, as shown below:

```html
<meta http-equiv="content-language" content="de" />
```

### Indicating a target audience for a resource

The `Content-Language` header is used to specify the **page's intended audience** and can indicate that this is more than one language.

```http
Content-Language: de, en
```

## See also

- `Accept-Language`
- HTTP headers, meta elements and language information
- HTML `lang` attribute
