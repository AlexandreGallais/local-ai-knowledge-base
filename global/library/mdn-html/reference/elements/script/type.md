---
title: "`<script type>` HTML attribute"
tool: "mdn-html"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/html/reference/elements/script/type/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `<script type>` HTML attribute

The **`type`** attribute of the `<script>` element indicates the _type_ of script represented by the element: a classic script, an import map, a JavaScript module, speculation rules, or a data block.

## Value

The value of this attribute indicates the type of data represented by the script, and will be one of the following:

- **Attribute is not set (default), an empty string, or a JavaScript MIME type**
    Indicates that the script is a "classic script", containing JavaScript code.
    Authors are encouraged to omit the attribute if the script refers to JavaScript code rather than specify a MIME type.
    JavaScript MIME types are listed in the IANA media types specification.
- `importmap`
    This value indicates that the body of the element contains an import map.
    The import map is a JSON object that developers can use to control how the browser resolves module specifiers when importing JavaScript modules.
- `module`
    This value causes the code to be treated as a JavaScript module.
    The processing of the script contents is deferred.
    The `charset` and `defer` attributes have no effect.
    For information on using `module`, see our JavaScript modules guide.
    Unlike classic scripts, module scripts require the use of the CORS protocol for cross-origin fetching.
- `speculationrules` (experimental)
    This value indicates that the body of the element contains speculation rules.
    Speculation rules take the form of a JSON object that determine what resources should be prefetched or prerendered by the browser. This is part of the `Speculation Rules API`.
- **Any other value**
    The embedded content is treated as a data block, and won't be processed by the browser.
    Developers must use a valid MIME type that is not a JavaScript MIME type to denote data blocks.
    All of the other attributes will be ignored, including the `src` attribute.

> **Note:**
> In earlier browsers, the type identified the scripting language of the embedded or imported (via the `src` attribute) code.
