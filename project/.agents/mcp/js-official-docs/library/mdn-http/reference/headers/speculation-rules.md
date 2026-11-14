---
title: "Speculation-Rules header"
tool: "mdn-http"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/http/reference/headers/speculation-rules/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Speculation-Rules header

The HTTP **`Speculation-Rules`** response header provides one or more URLs pointing to text resources containing speculation rule JSON definitions. When the response is an HTML document, these rules will be added to the document's speculation rule set. See the Speculation Rules API for more information.

The resource file containing the speculation rules JSON can have any valid name and extension, but it will be requested with a `destination` type of `speculationrules`, and must be served with an `application/speculationrules+json` MIME type.

> **Note:**
> This mechanism provides an alternative to specifying the JSON definition inside an inline `<script type="speculationrules">` element. Specifying an HTTP header is useful in cases where developers are not able to directly modify the document itself.

       | Header type
       | Response header

## Syntax

```http
Speculation-Rules: <url-list>
```

## Directives

- `<url-list>`
    A comma-separated list of URLs pointing to text resources containing speculation rule JSON definitions. The JSON contained in the text files must follow the same rules as that contained inside inline `<script type="speculationrules">` elements. See Speculation rules JSON representation for the syntax reference.

## Examples

### Speculation-Rules field with a single file

The following response contains one file reference:

```http
Speculation-Rules: "/rules/prefetch.json"
```

### Speculation-Rules field with multiple files

The following response contains multiple file reference as a comma-separated list:

```http
Speculation-Rules: "/rules/prefetch.json","/rules/prerender.json"
```

> **Note:**
> The URL values must be contained in quotes.

## See also

- Speculation Rules API
- `<script type="speculationrules">`
